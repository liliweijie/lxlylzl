// 作品 HTML 上传与托管路由
//   POST /api/work        (鉴权)  body: { html }  -> 存进 KV，返回 { id }
//   GET  /api/work?id=X           ->  以 text/html 返回该 html（公开，供 iframe 内嵌）
// 存储复用 content.js 的多后端抽象（KV/Upstash、Redis、Gist、内存兜底），存原始字符串。

module.exports = async (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-admin-user, x-admin-pass');
  if (req.method === 'OPTIONS') return res.status(204).end();

  const GIST_ID = process.env.GIST_ID;
  const GH_TOKEN = process.env.GITHUB_TOKEN;
  const WKEY = 'work'; // 完整 key = work:<id>

  function findUpstash() {
    const prefixes = ['KV', 'STORAGE', 'REDIS'];
    for (const p of prefixes) {
      const url = process.env[p + '_REST_API_URL'];
      const token = process.env[p + '_REST_API_TOKEN'];
      if (url && token) return { url, token };
    }
    if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
      return { url: process.env.UPSTASH_REDIS_REST_URL, token: process.env.UPSTASH_REDIS_REST_TOKEN };
    }
    return null;
  }
  const UP = findUpstash();

  async function getBody() {
    if (req.body && typeof req.body === 'object') return req.body;
    if (req.body && typeof req.body === 'string') {
      try { return JSON.parse(req.body); } catch (e) { return {}; }
    }
    return await new Promise((resolve) => {
      let data = '';
      req.on('data', (c) => { data += c; });
      req.on('end', () => {
        try { resolve(data ? JSON.parse(data) : {}); } catch (e) { resolve({}); }
      });
    });
  }

  function getAdminCreds(req) {
    const q = req.query || {};
    const h = req.headers || {};
    const b = (req.body && typeof req.body === 'object' && !Array.isArray(req.body)) ? req.body : {};
    return {
      user: (q.user || b.user || (h['x-admin-user'] || '')).toString(),
      pass: (q.pass || b.pass || (h['x-admin-pass'] || '')).toString()
    };
  }
  function isAdmin(req) {
    const ADMIN_USER = process.env.ADMIN_USER || 'liweijie';
    const ADMIN_PASS = process.env.ADMIN_PASS || 'lwjjack0123';
    const c = getAdminCreds(req);
    return c.user === ADMIN_USER && c.pass === ADMIN_PASS;
  }

  function genId() {
    try { return require('crypto').randomBytes(6).toString('hex'); }
    catch (e) { return Date.now().toString(36) + Math.random().toString(36).slice(2, 8); }
  }

  // ---- GET 公开读取（返回原始 html） ----
  async function handleGet(store) {
    const id = (req.query && req.query.id) || '';
    if (!id) return res.status(400).json({ error: 'missing_id' });
    const raw = await store.get(WKEY + ':' + id);
    if (raw == null) return res.status(404).json({ error: 'not_found' });
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Cache-Control', 'public, max-age=3600');
    res.statusCode = 200;
    return res.end(raw);
  }

  // ---- POST 鉴权上传 ----
  async function handlePost(store) {
    if (!isAdmin(req)) return res.status(401).json({ error: 'unauthorized' });
    const body = await getBody();
    if (!body || typeof body.html !== 'string' || !body.html.trim()) {
      return res.status(400).json({ error: 'missing_html' });
    }
    const id = genId();
    await store.set(WKEY + ':' + id, body.html);
    return res.json({ id });
  }

  // ---- 优先：Vercel KV / Upstash（GET/SET 原始字符串） ----
  if (UP) {
    async function kv(cmd) {
      const r = await fetch(UP.url, {
        method: 'POST',
        headers: { Authorization: 'Bearer ' + UP.token },
        body: JSON.stringify([cmd])
      });
      const j = await r.json();
      if (j.error) throw new Error(j.error);
      return j.result;
    }
    const store = {
      async get(key) { const v = await kv(['GET', key]); return v == null ? null : String(v); },
      async set(key, val) { await kv(['SET', key, val]); }
    };
    try {
      if (req.method === 'GET') return await handleGet(store);
      if (req.method === 'POST') return await handlePost(store);
      return res.status(405).json({ error: 'method_not_allowed' });
    } catch (e) {
      return res.status(500).json({ error: String((e && e.message) ? e.message : e) });
    }
  }

  // ---- 其次：Vercel Redis（TCP） ----
  if (process.env.REDIS_URL) {
    function getRedis() {
      if (global.__redisClient) return global.__redisClient;
      const Redis = require('ioredis');
      let url = process.env.REDIS_URL;
      if (/upstash\.io/i.test(url) && url.indexOf('redis://') === 0) {
        url = 'rediss://' + url.slice('redis://'.length);
      }
      const c = new Redis(url, { maxRetriesPerRequest: 2, enableOfflineQueue: true });
      global.__redisClient = c;
      return c;
    }
    const r = getRedis();
    const store = {
      async get(key) { const v = await r.get(key); return v == null ? null : String(v); },
      async set(key, val) { await r.set(key, val); }
    };
    try {
      if (req.method === 'GET') return await handleGet(store);
      if (req.method === 'POST') return await handlePost(store);
      return res.status(405).json({ error: 'method_not_allowed' });
    } catch (e) {
      return res.status(500).json({ error: String((e && e.message) ? e.message : e) });
    }
  }

  // ---- 其次：GitHub Gist（每个作品存为 work_<id>.html 文件） ----
  if (GIST_ID && GH_TOKEN) {
    const headers = {
      Authorization: 'token ' + GH_TOKEN,
      Accept: 'application/vnd.github+json',
      'User-Agent': 'lxlylzl-work'
    };
    function fname(id) { return 'work_' + id + '.html'; }
    async function readGist() {
      const r = await fetch('https://api.github.com/gists/' + GIST_ID, { headers });
      if (!r.ok) throw new Error('gist GET ' + r.status);
      return await r.json();
    }
    const store = {
      async get(key) {
        const j = await readGist();
        const f = j.files && j.files[fname(key.split(':')[1])];
        return f ? f.content : null;
      },
      async set(key, val) {
        const id = key.split(':')[1];
        const r = await fetch('https://api.github.com/gists/' + GIST_ID, {
          method: 'PATCH',
          headers: Object.assign({}, headers, { 'Content-Type': 'application/json' }),
          body: JSON.stringify({ files: { [fname(id)]: { content: val } } })
        });
        if (!r.ok) throw new Error('gist PATCH ' + r.status);
      }
    };
    try {
      if (req.method === 'GET') return await handleGet(store);
      if (req.method === 'POST') return await handlePost(store);
      return res.status(405).json({ error: 'method_not_allowed' });
    } catch (e) {
      return res.status(500).json({ error: String((e && e.message) ? e.message : e) });
    }
  }

  // ---- 兜底：内存（仅本地演示，重启即失） ----
  const mem = (global.__works = global.__works || {});
  const store = {
    async get(key) { return key in mem ? mem[key] : null; },
    async set(key, val) { mem[key] = val; }
  };
  try {
    if (req.method === 'GET') return await handleGet(store);
    if (req.method === 'POST') return await handlePost(store);
    return res.status(405).json({ error: 'method_not_allowed' });
  } catch (e) {
    return res.status(500).json({ error: String((e && e.message) ? e.message : e) });
  }
};
