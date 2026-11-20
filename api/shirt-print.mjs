import {readFileSync} from 'node:fs';
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
const zones = { front: 'full front chest', chest: 'small left chest', back: 'back', sleeve: 'small sleeve' };
const pathArity = { M: 2, L: 2, H: 1, V: 1, C: 6, S: 4, Q: 4, T: 2, A: 7, Z: 0 };
const pathCharacters = /^[MLHVCSQTAZ0-9.,\s-]+$/;
const pathTokens = /[MLHVCSQTAZ]|-?(?:\d+(?:\.\d*)?|\.\d+)/g;
const colorPattern = /^#[\da-f]{6}$/i;
const fonts = new Set(['sans', 'serif', 'mono']);
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


function vectorInstructions(includeText) {
  const lettering = includeText
    ? 'Add a text layer only when the description explicitly asks to print words. Preserve their spelling, case and language. A signature, slogan or brand from the example is never part of the print.'
    : 'The browser will compose the exact requested text with your image. Draw the supporting motif at a scale that can sit beside or above the lettering. Omit lettering, numerals and text-shaped paths.';
  const textExample = includeText ? `
{"type":"text","text":"WEEKEND","x":512,"y":790,"size":84,"fill":"#173D38","font":"sans","weight":700}` : '';
  const textFormat = includeText
    ? ' Text is centered horizontally at x, y is the baseline, size is 12–300, font is sans, serif or mono, weight is 400 or 700.'
    : '';
  const output = includeText
    ? 'Return a JSON object with title and layers.'
    : 'Return a JSON object with title, layers and letteringStyle.';
  return `You design original vector art for apparel. Input is JSON with description, garmentColor and location. The customer can describe the idea in everyday language, such as “一只戴耳机的猫” or “复古的山峰徽章”. Resolve the design within this request.

Read in this order:
1. Keep the main subject, its stated action, requested colors and style. Treat 背面、袖子、左胸、正胸 as placement directions. Use a style reference for line quality, shape and palette treatment. The reference supplies no extra subjects or words.
2. Infer the missing visual decisions. Pick one viewpoint, a confident silhouette and a small palette that reads against garmentColor. If the user has specified just a subject, make a bold, clear illustration with one small supporting element where it helps. For example, headphones must be visible on the cat's head; a retro version can use broad ink outlines and two warm spot colors. For a mountain badge, make the peaks the central silhouette and use small accents that support it. Use the user's choices when stated.
3. Fit the composition to location. A small left chest or sleeve uses one compact, simple motif with thicker strokes and few details. A full chest can support a larger central motif. A back print can use a larger, balanced composition with space around it. Give the artwork an edge with generous transparent margins.
4. Use flat printable ink, clean paths and transparent negative space. The output is only the design artwork. Keep each element visible within the canvas. Do not include mockups, gradients, photos, watermarks or a rectangular background.

${lettering}
${output} title is at most 35 characters. layers has 1–32 entries ordered back to front. Use only the entries needed for a readable design. Example:
{"type":"path","d":"M 220 500 L 512 210 L 802 500 Z","fill":"#173D38"}${textExample}
Use the 1024-by-1024 transparent canvas and absolute uppercase M L H V C S Q T A Z path commands. Separate numbers with spaces. Each path starts with M followed by coordinates, uses coordinates from 0 to 1024, and stays under 1800 characters. Arc flags must be 0 or 1. A path may have fill, stroke, or both. StrokeWidth, when present, is between 1 and 96. Use only #RRGGBB colors.${textFormat}
Return valid compact JSON only.`;
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

function safePath(value) {
  if (typeof value !== 'string' || value.length > 1800 || !pathCharacters.test(value)) return null;
  const tokens = value.match(pathTokens) ?? [];
  if (tokens[0] !== 'M' || tokens.length < 5) return null;
  let index = 0;
  let coordinates = 0;
  while (index < tokens.length) {
    const command = tokens[index++];
    const arity = pathArity[command];
    if (arity === undefined) return null;
    if (arity === 0) continue;

    do {
      coordinates += arity;
      if (index + arity > tokens.length || coordinates > 500) return null;
      for (let offset = 0; offset < arity; offset++) {
        const number = Number(tokens[index + offset]);
        if (command === 'A' && offset === 2) {
          if (!inRange(number, -360, 360)) return null;
        } else if (command === 'A' && (offset === 3 || offset === 4)) {
          if (number !== 0 && number !== 1) return null;
          tokens[index + offset] = String(number);
        } else if (!inRange(number, 0, 1024)) {
          return null;
        }
      }
      index += arity;
    } while (index < tokens.length && !Object.hasOwn(pathArity, tokens[index]));
  }
  const path = tokens.join(' ');
  return path.length <= 2500 ? path : null;
}

function safeLayer(layer) {
  if (!layer || typeof layer !== 'object') return null;
  const fill = color(layer.fill);
  if (layer.type === 'path') {
    const d = safePath(layer.d);
    const stroke = color(layer.stroke);
    if (!d || (!fill && !stroke)) return null;
    const resultLayer = { type: 'path', d };
    if (fill) resultLayer.fill = fill;
    if (stroke) {
      resultLayer.stroke = stroke;
      resultLayer.strokeWidth = inRange(layer.strokeWidth, 1, 96) ? layer.strokeWidth : 10;
    }
    return resultLayer;
  }
  if (layer.type !== 'text' || !fill) return null;
  const text = cleanText(layer.text, 48);
  const { x, y, size, font, weight } = layer;
  if (!text || !inRange(x, 0, 1024) || !inRange(y, 0, 1024) || !inRange(size, 12, 300)) return null;
  if (!fonts.has(font) || (weight !== 400 && weight !== 700)) return null;
  return { type: 'text', text, x, y, size, fill, font, weight };
}

function safeArt(value, includeText) {
  if (!Array.isArray(value?.layers) || value.layers.length < 1 || value.layers.length > 32) return null;
  const layers = includeText ? value.layers : value.layers.filter(layer => layer?.type !== 'text');
  if (!layers.length) return null;
  const sanitized = layers.map(safeLayer);
  if (sanitized.includes(null)) return null;
  return { title: cleanText(value.title, 35) ?? 'AI 图案', layers: sanitized };
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
  if (!key) return fail(503, '图案生成服务尚未配置。');
  const wait = retryAfter(request);
  if (wait) return fail(429, '生成请求太频繁，请稍后再试。', { 'Retry-After': String(wait) });

  const letteringOnly = mode === 'lettering';
  const includeText = mode !== 'graphic-with-lettering';
  const lineCount = Number.isInteger(input.lineCount) && inRange(input.lineCount, 1, maxLetteringLines) ? input.lineCount : 1;
  const expressiveLettering = mode && lineCount <= 4 && !/极简|朴素|正楷|minimal/i.test(description);
  const reference = imageReference(description, expressiveLettering);
  const userDirection = JSON.stringify({ description, garmentColor, location: zones[zone], ...(mode ? { lineCount } : {}) });
  const contentParts = reference ? [
    { type: 'text', text: userDirection + '\n' + styleNotes },
    { type: 'image_url', image_url: { url: reference, detail: 'low' } }
  ] : userDirection;
  const deadline = AbortSignal.timeout(waitMs);
  try {
    const upstream = await fetch('https://api.deepseek.com/chat/completions', {
      method: 'POST',
      headers: { Authorization: 'Bearer ' + key, 'Content-Type': 'application/json' },
      signal: deadline,
      body: JSON.stringify({
        model: 'deepseek-flash',
        thinking: { type: 'disabled' },
        response_format: { type: 'json_object' },
        max_tokens: letteringOnly ? 360 : includeText ? 2200 : 2550,
        messages: [
          { role: 'system', content: letteringOnly
            ? letteringArtDirection + '\nReturn a JSON object with a single property named letteringStyle.'
            : vectorInstructions(includeText) + (includeText ? '' :
              '\nUse the following direction to fill the letteringStyle property; keep title and layers at the top level.\n' + letteringArtDirection) },
          { role: 'user', content: contentParts }
        ]
      })
    });
    if (!upstream.ok) {
      void upstream.body?.cancel().catch(() => {});
      console.warn('Shirt print provider HTTP status', upstream.status);
      return upstream.status === 429 ? fail(429, '图案生成服务正忙，请稍后再试。') : fail(503, '图案生成服务暂不可用，请稍后再试。');
    }

    const completion = await readJson(upstream, responseLimit);
    const choice = completion?.choices?.[0];
    const content = choice?.message?.content;
    if (choice?.finish_reason === 'content_filter') return fail(422, '这段描述无法生成图案，请换一种描述。');
    if (choice?.finish_reason === 'length') return fail(422, '图案细节太多，请简化描述再试。');
    if (typeof content !== 'string' || !content.trim()) return fail(502, '没有生成图案，请换一种描述再试。');
    const generated = JSON.parse(content);
    if (letteringOnly) {
      const letteringStyle = safeLetteringStyle(generated?.letteringStyle ?? generated);
      return letteringStyle ? result({ letteringStyle }) : fail(502, '无法读取字体建议，可使用自动排版。');
    }
    const art = safeArt(generated, includeText);
    if (!art) return fail(502, '生成的图案无法印到衣服上，请调整描述再试。');
    const letteringStyle = includeText ? null : safeLetteringStyle(generated.letteringStyle);
    return result(letteringStyle ? { art, letteringStyle } : { art });
  } catch (error) {
    if (deadline.aborted) return fail(504, '图案生成超时，请稍后再试。');
    if (error instanceof SyntaxError || error instanceof RangeError) {
      return fail(502, '生成的图案格式有误，请调整描述再试。');
    }
    console.warn('Shirt print provider connection failed');
    return fail(503, '图案生成服务暂不可用，请稍后再试。');
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

