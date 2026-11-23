import {readFileSync} from 'node:fs';
import {findShirtSvgs} from '../lib/shirt-svg-search.mjs';
import {
  letteringArrangements, letteringArtDirection, letteringOrnaments, letteringTreatments
} from '../skills/shirt-lettering-art/references/direction.mjs';

const promptLimit = 600;
const maxLetteringLines = 50;
const requestLimit = 4096;
const responseLimit = 65536;
const waitMs = 30000;
const requestWindowMs = 60000;
const maxRequests = 3;
const maxRateBuckets = 512;
const rateBuckets = new Map();
const zones = {
  front: 'large artwork across the front',
  chest: 'small left-chest mark',
  back: 'large artwork on the back',
  backMark: 'small upper-back mark below the collar or hood',
  sleeve: 'small outer-sleeve mark',
  brim: 'small hood-brim mark on a shallow horizontal strip'
};
const colorPattern = /^#[\da-f]{6}$/i;
const graffitiCue = /涂鸦|街头|泡泡字|气泡字|喷漆|喷罐|喷绘|喷溅|马克笔|贴纸|滴漆|滴墨|graffiti|sticker|bubble|spray|marker|y2k/i;
const styleNotes = 'The style board is reference only. Use the closest visual approach: rounded coral bubble outlines, cobalt hand-marker swashes, acid-green spray stencil, mint and lilac die-cut stickers, creamy ink drips, or purple/orange sprayed mascot shapes. Keep the user subject and requested colors. Never copy the samples or their words.';
let graffitiBoard;

function imageReference(description, expressiveLettering) {
  if (!expressiveLettering && !graffitiCue.test(description)) return null;
  if (graffitiBoard === undefined) {
    try {
      const bytes = readFileSync(new URL('../shirt-studio/references/graffiti-styleboard.png', import.meta.url));
      graffitiBoard = 'data:image/png;base64,' + bytes.toString('base64');
    } catch {
      graffitiBoard = null;
    }
  }
  return graffitiBoard;
}


function result(body, status = 200, headers = {}) {
  return Response.json(body, {
    status,
    headers: { 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff', ...headers }
  });
}

function fail(status, error, headers) {
  return result({ error }, status, headers);
}

function cleanText(value, maxLength) {
  if (typeof value !== 'string') return null;
  const text = value.trim();
  return text && [...text].length <= maxLength && !/[\u0000-\u001f\u007f]/.test(text) ? text : null;
}

function color(value) {
  return typeof value === 'string' && colorPattern.test(value) ? value.toUpperCase() : null;
}

function inRange(value, min, max) {
  return Number.isFinite(value) && value >= min && value <= max;
}

async function readJson(message, maxBytes) {
  const declaredBytes = Number(message.headers.get('content-length'));
  if (declaredBytes > maxBytes) throw new RangeError('JSON body too large');
  if (!message.body) throw new SyntaxError('JSON body required');
  const reader = message.body.getReader();
  const decoder = new TextDecoder('utf-8', { fatal: true });
  let bytes = 0;
  let source = '';
  try {
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      bytes += value.byteLength;
      if (bytes > maxBytes) {
        void reader.cancel().catch(() => {});
        throw new RangeError('JSON body too large');
      }
      source += decoder.decode(value, { stream: true });
    }
    return JSON.parse(source + decoder.decode());
  } finally {
    reader.releaseLock();
  }
}

function safeLetteringStyle(value) {
  const { font, weight, treatment, arrangement, ornament, composition } = value ?? {};
  const ink = color(value?.color);
  if (!fonts.has(font) || !ink || (weight !== 400 && weight !== 700)) return null;
  const accent = color(value?.accent);
  return {
    font, color: ink, weight,
    ...(accent ? { accent } : {}),
    ...(letteringTreatments.includes(treatment) ? { treatment } : {}),
    ...(letteringArrangements.includes(arrangement) ? { arrangement } : {}),
    ...(letteringOrnaments.includes(ornament) ? { ornament } : {}),
    ...(['stack', 'side'].includes(composition) ? { composition } : {})
  };
}

function allowOrigin(request) {
  const origin = request.headers.get('origin');
  const fetchSite = request.headers.get('sec-fetch-site');
  return (!origin || origin === new URL(request.url).origin) &&
    (!fetchSite || fetchSite === 'same-origin' || fetchSite === 'none');
}

function retryAfter(request) {
  // Scope bursts per warm instance and Vercel's forwarded client IP.
  const client = request.headers.get('x-vercel-forwarded-for')?.slice(0, 80) || 'local';
  const now = Date.now();
  const bucket = rateBuckets.get(client);
  if (bucket && bucket.until > now) {
    if (bucket.count >= maxRequests) return Math.ceil((bucket.until - now) / 1000);
    bucket.count++;
    return 0;
  }
  if (rateBuckets.size >= maxRateBuckets) {
    for (const [key, item] of rateBuckets) {
      if (item.until <= now) rateBuckets.delete(key);
    }
    if (rateBuckets.size >= maxRateBuckets) return 60;
  }
  rateBuckets.set(client, { count: 1, until: now + requestWindowMs });
  return 0;
}

function parseArtworkObject(content) {
  if (typeof content !== 'string' || !content.trim()) return null;
  const trimmed = content.trim();
  const fenced = trimmed.match(/^```(?:json)?\s*([\s\S]+?)\s*```$/i);
  try {
    const value = JSON.parse(fenced?.[1] ?? trimmed);
    return value && typeof value === 'object' && !Array.isArray(value) ? value : null;
  } catch {
    return null;
  }
}

async function generateArt(request, key) {
  if (!/^application\/json(?:\s*;|$)/i.test(request.headers.get('content-type') ?? '')) {
    return fail(415, '请使用 JSON 提交印花描述。');
  }
  let input;
  try {
    input = await readJson(request, requestLimit);
  } catch (error) {
    return error instanceof RangeError ? fail(413, '印花描述太长。') : fail(400, '无法读取印花描述。');
  }
  const prompt = typeof input?.prompt === 'string' ? input.prompt.replace(/\s+/g, ' ') : null;
  const description = cleanText(prompt, promptLimit);
  const garmentColor = color(input?.color);
  const zone = input?.zone;
  const mode = input?.mode;
  if (!description || !garmentColor || typeof zone !== 'string' || !Object.hasOwn(zones, zone)) {
    return fail(400, '请填写 1–600 字的图案描述，并选择有效的衣服颜色和印花位置。');
  }
  if (mode !== undefined && mode !== 'lettering' && mode !== 'graphic-with-lettering') {
    return fail(400, '请选择有效的印花生成方式。');
  }
  if (!key) return fail(503, 'AI 定制服务尚未配置。');
  const wait = retryAfter(request);
  if (wait) return fail(429, '定制请求太频繁，请稍后再试。', { 'Retry-After': String(wait) });

  const deadline = AbortSignal.timeout(waitMs);
  try {
    if (mode !== 'lettering') {
      const count = input.candidateCount === 4 ? 4 : 1;
      const { assets, terms } = await findShirtSvgs({ key, description, garmentColor, location: zones[zone], signal: deadline, count });
      if (assets.length) return count === 4 ? result({ assets, terms }) : result({ asset: { ...assets[0], terms } });
      if (deadline.aborted) return fail(504, '找图超时，请稍后再试。');
      return fail(404, '没有找到贴合描述的可用 SVG。请试试更简短的主体或风格词。');
    }

    const lineCount = Number.isInteger(input.lineCount) && inRange(input.lineCount, 1, maxLetteringLines) ? input.lineCount : 1;
    const expressive = lineCount <= 4 && !/极简|朴素|正楷|minimal/i.test(description);
    const reference = imageReference(description, expressive);
    const userDirection = JSON.stringify({ description, garmentColor, location: zones[zone], lineCount });
    const content = reference ? [
      { type: 'text', text: userDirection + '\n' + styleNotes },
      { type: 'image_url', image_url: { url: reference, detail: 'low' } }
    ] : userDirection;
    const upstream = await fetch('https://api.deepseek.com/chat/completions', {
      method: 'POST',
      headers: { Authorization: 'Bearer ' + key, 'Content-Type': 'application/json' },
      signal: deadline,
      body: JSON.stringify({
        model: 'deepseek-flash',
        thinking: { type: 'disabled' },
        response_format: { type: 'json_object' },
        max_tokens: 360,
        messages: [
          { role: 'system', content: letteringArtDirection + '\nReturn a JSON object with a single property named letteringStyle.' },
          { role: 'user', content }
        ]
      })
    });
    if (!upstream.ok) {
      void upstream.body?.cancel().catch(() => {});
      return fail(upstream.status === 429 ? 429 : 503, '文字样式服务暂不可用，可使用自动排版。');
    }
    const completion = await readJson(upstream, responseLimit);
    const choice = completion?.choices?.[0];
    const generated = choice?.finish_reason === 'length' ? null : parseArtworkObject(choice?.message?.content);
    const letteringStyle = safeLetteringStyle(generated?.letteringStyle ?? generated);
    return letteringStyle ? result({ letteringStyle }) : fail(502, '无法读取文字样式，可使用自动排版。');
  } catch {
    if (deadline.aborted) return fail(504, 'AI 定制超时，请稍后再试。');
    console.warn('Shirt customization provider unavailable');
    return fail(503, 'AI 定制服务暂不可用，请稍后再试。');
  }
}

export default {
  fetch(request) {
    if (request.method !== 'GET' && request.method !== 'POST') {
      return fail(405, '不支持此请求方式。', { Allow: 'GET, POST' });
    }
    if (!allowOrigin(request)) return fail(403, '请从服装定制页面发起请求。');
    const key = process.env.DEEPSEEK_API_KEY?.trim();
    return request.method === 'GET' ? result({ available: Boolean(key) }) : generateArt(request, key);
  }
};

