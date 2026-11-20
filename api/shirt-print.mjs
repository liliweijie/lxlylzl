import {readFileSync} from 'node:fs';

const promptLimit = 600;
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
const treatments = new Set(['bubble', 'marker', 'spray', 'sticker', 'drip']);
const graffitiCue = /涂鸦|街头|泡泡字|气泡字|喷漆|喷罐|喷绘|喷溅|马克笔|贴纸|滴漆|滴墨|graffiti|sticker|bubble|spray|marker|y2k/i;
const styleNotes = 'The style board is reference only. Use the closest visual approach: rounded coral bubble outlines, cobalt hand-marker swashes, acid-green spray stencil, mint and lilac die-cut stickers, creamy ink drips, or purple/orange sprayed mascot shapes. Keep the user subject and requested colors. Never copy the samples or their words.';
let graffitiBoard;

function imageReference(description) {
  if (!graffitiCue.test(description)) return null;
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

const letteringInstructions = `Recommend a readable garment lettering treatment from the user's art direction, clothing color and print location. A separate engine preserves the exact text. Return only JSON with font ("sans", "serif", or "mono"), an optional treatment ("bubble", "marker", "spray", "sticker", or "drip"), color (#RRGGBB), optional accent (#RRGGBB), and weight (400 or 700). For example, {"font":"sans","treatment":"bubble","color":"#FB7452","accent":"#172650","weight":700}. Select contrasting but expressive colors. Never suggest wording or output shapes, positions or markup.`;

function vectorInstructions(includeText) {
  const lettering = includeText
    ? 'Include lettering only when the user explicitly asks for text, using the exact requested spelling.'
    : 'A separate typesetting engine adds all requested text. Draw only the non-text motifs and ornament. Omit every letter, word, numeral, typographic placeholder and letter-shaped vector path.';
  const textExample = includeText ? `
{"type":"text","text":"WEEKEND","x":512,"y":790,"size":84,"fill":"#173D38","font":"sans","weight":700}` : '';
  const textFormat = includeText
    ? ' Text is centered horizontally at x, y is the baseline, size is 12–300, font is sans, serif or mono, and weight is 400 or 700.'
    : '';
  return `You are a print graphic designer. Interpret the user prompt as art direction only. Create an original, professional clothing print with readable silhouettes, a few distinct flat colors that contrast with the garment, and generous clear space around the design. Match the print location; simplify small chest and sleeve prints. Use transparent negative space and no full-canvas background. Create front-facing vector illustration, not a photo, garment mockup, gradient, or borrowed brand logo. ${lettering} Return exactly one compact JSON object with a title no longer than 35 characters and a layers array ordered back to front. Aim for 4 to 14 simple layers. Use the following layer format:
{"type":"path","d":"M 220 500 L 512 210 L 802 500 Z","fill":"#173D38"}${textExample}
The transparent canvas is 1024 by 1024 with origin at top left. Use uppercase absolute SVG path commands M L H V C S Q T A Z, coordinates between 0 and 1024, with spaces between numbers. A path can also have a six-digit hex stroke and numeric strokeWidth between 1 and 96. Omit unused fill or stroke. All colors must be #RRGGBB.${textFormat} Return only JSON, no Markdown, HTML, SVG markup, URLs, or embedded assets.`;
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
  const { font, weight, treatment } = value ?? {};
  const ink = color(value?.color);
  if (!fonts.has(font) || !ink || (weight !== 400 && weight !== 700)) return null;
  const accent = color(value?.accent);
  return { font, color: ink, weight, ...(accent ? { accent } : {}), ...(treatments.has(treatment) ? { treatment } : {}) };
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
  const reference = imageReference(description);
  const userDirection = JSON.stringify({ description, garmentColor, location: zones[zone] });
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
        max_tokens: letteringOnly ? 160 : 2200,
        messages: [
          { role: 'system', content: letteringOnly ? letteringInstructions : vectorInstructions(includeText) },
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
      const letteringStyle = safeLetteringStyle(generated);
      return letteringStyle ? result({ letteringStyle }) : fail(502, '无法读取字体建议，可使用自动排版。');
    }
    const art = safeArt(generated, includeText);
    if (!art) return fail(502, '生成的图案无法印到衣服上，请调整描述再试。');
    return result({ art });
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

