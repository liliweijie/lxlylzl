module.exports = async (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-admin-user, x-admin-pass');

  if (req.method === 'OPTIONS') return res.status(204).end();

  const GIST_ID = process.env.GIST_ID;
  const GH_TOKEN = process.env.GITHUB_TOKEN;
  const KEY = 'content';
  const PAGES = ['index', 'works', 'about', 'notes'];

  // ===== 默认内容（首次部署做种子，保证页面不会变空） =====
  const DEFAULT_CONTENT = {
    index: {
      hero: {
        eyebrow: '',
        title: '',
        subtitle: '',
        intro: '',
        socials: []
      }
    },
    works: {
      projects: [
        { title: 'Central on Air', client: 'Central on Air', desc: 'Amplifying the Local Music Scene', tags: ['Design', 'Dev', 'Branding'], colorDark: '#2d1b69', colorLight: '#e8dff5' },
        { title: 'Patch System', client: 'Patch System', desc: 'Clinic marketing made easy', tags: ['Design', 'Dev'], colorDark: '#1a3a2a', colorLight: '#d8ede0' },
        { title: 'Unis Footwear', client: 'Unis Footwear', desc: 'Turning trash into treasure 3D printing Sneakers', tags: ['Design', 'Dev'], colorDark: '#3d2b1a', colorLight: '#f0e0d0' },
        { title: 'HŌM', client: 'HŌM', desc: 'Connecting people to the planet through food', tags: ['Design', 'Dev', 'Branding', 'Packaging'], colorDark: '#1a2e1a', colorLight: '#d4e8d4' },
        { title: 'ZaZa', client: 'ZaZa', desc: 'Culturally empowered Streetwear out of Sydney', tags: ['Design', 'Branding'], colorDark: '#3a1a2a', colorLight: '#f0d8e0' },
        { title: 'Radical Face', client: 'Radical Face', desc: 'A modern take on a fairytale', tags: ['Design', 'Dev'], colorDark: '#0d1f2d', colorLight: '#d4dff0' },
        { title: 'Overmind AI', client: 'Overmind', desc: 'Getting you from question to conclusion faster', tags: ['Design', 'Branding'], colorDark: '#0a1628', colorLight: '#d0d8e8' },
        { title: 'Lens', client: 'Lens', desc: 'Digital editorial covering the business of creativity', tags: ['Design', 'Branding'], colorDark: '#1a1a2a', colorLight: '#e0e0e8' },
        { title: 'Brews & Grooves', client: 'Brews & Grooves', desc: 'Human-kinds greatest combo', tags: ['Design', 'Branding'], colorDark: '#2d1a0d', colorLight: '#f0e0d4' },
        { title: 'Animus', client: 'Animus', desc: 'A small & mighty video agency', tags: ['Design', 'Dev', 'Branding'], colorDark: '#1a2d1a', colorLight: '#d8e8d8' },
        { title: 'RhythmInfluence', client: 'RhythmInfluence', desc: 'Empowering the voices that define modern culture', tags: ['Design', 'Dev', 'Branding'], colorDark: '#2a1a3d', colorLight: '#e8dff5' },
        { title: 'Canvas Agency', client: 'Canvas Agency', desc: 'A coven of passionate, imaginative humans', tags: ['Design', 'Dev'], colorDark: '#0d2d2d', colorLight: '#d4e8e8' },
        { title: 'Lightswitch Video', client: 'Lightswitch Video', desc: 'From pre-roll to broadcast, you are covered', tags: ['Design', 'Dev', 'Branding'], colorDark: '#2d2d0d', colorLight: '#f0ecd0' },
        { title: 'Blank Round', client: 'Blank Round', desc: 'Culturally empowered Streetwear', tags: ['Design', 'Branding'], colorDark: '#1d1d2d', colorLight: '#e0e0f0' }
      ]
    },
    about: {
      bio: [],
      skills: [],
      contact: []
    },
    notes: {
      heading: '碎碎念',
      subtitle: '一些随手写下的碎片。'
    }
  };

  const ALLOWED = PAGES;
  function pageOf() {
    const p = (req.query && req.query.page) || '';
    return ALLOWED.indexOf(p) >= 0 ? p : null;
  }

  // ---- 兼容多种 Upstash / Vercel Redis 注入的变量名 ----
  function findUpstash() {
    const prefixes = ['KV', 'STORAGE', 'REDIS'];
    for (const p of prefixes) {
      const url = process.env[p + '_REST_API_URL'];
      const token = process.env[p + '_REST_API_TOKEN'];
      if (url && token) return { url: url, token: token };
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

  // ---- 后台管理鉴权（账号 + 密码） ----
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
    const ADMIN_USER = process.env.ADMIN_USER;
    const ADMIN_PASS = process.env.ADMIN_PASS;
    const c = getAdminCreds(req);
    return c.user === ADMIN_USER && c.pass === ADMIN_PASS;
  }

  // 登录探测：GET ?probe=1
  if (req.method === 'GET' && req.query && req.query.probe === '1') {
    if (!isAdmin(req)) return res.status(401).json({ error: 'unauthorized' });
    return res.json({ ok: true });
  }

  // 仓储：读取/写入整份 content 对象
  function makeStore(readFn, writeFn) {
    return {
      read: readFn,
      write: writeFn,
      // 读取指定页（缺则种子）
      async page(p) {
        const all = await readFn();
        if (!all || typeof all !== 'object') return JSON.parse(JSON.stringify(DEFAULT_CONTENT[p]));
        if (!all[p]) {
          all[p] = JSON.parse(JSON.stringify(DEFAULT_CONTENT[p]));
          await writeFn(all);
        }
        return all[p];
      },
      // 写入指定页
      async setPage(p, val) {
        const all = (await readFn()) || {};
        all[p] = val;
        await writeFn(all);
        return all[p];
      }
    };
  }

  // ---- GET 公开读取 ----
  async function handleGet(store) {
    const p = pageOf();
    if (p) return res.json(await store.page(p));
    // 无 page 参数：返回整份（公开部分）
    const all = await store.read();
    if (!all || typeof all !== 'object') return res.json(JSON.parse(JSON.stringify(DEFAULT_CONTENT)));
    // 确保所有页都存在
    let changed = false;
    for (const k of ALLOWED) {
      if (!all[k]) { all[k] = JSON.parse(JSON.stringify(DEFAULT_CONTENT[k])); changed = true; }
    }
    if (changed) await store.write(all);
    return res.json(all);
  }

  // ---- PATCH / PUT 后台更新指定页 ----
  async function handleUpdate(store) {
    if (!isAdmin(req)) return res.status(401).json({ error: 'unauthorized' });
    const p = pageOf();
    if (!p) return res.status(400).json({ error: 'missing_page' });
    const body = await getBody();
    if (!body || typeof body !== 'object') return res.status(400).json({ error: 'empty' });
    const saved = await store.setPage(p, body);
    return res.json(saved);
  }

  // ---- 优先：Vercel KV（Upstash） ----
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
    const store = makeStore(
      async function () {
        const raw = await kv(['LRANGE', KEY, '0', '-1']);
        if (raw && raw[0]) { try { return JSON.parse(raw[0]); } catch (e) { return null; } }
        return null;
      },
      async function (obj) {
        await kv(['DEL', KEY]);
        await kv(['RPUSH', KEY, JSON.stringify(obj)]);
      }
    );
    try {
      if (req.method === 'GET') return await handleGet(store);
      if (req.method === 'PATCH' || req.method === 'PUT') return await handleUpdate(store);
      return res.status(405).json({ error: 'method_not_allowed' });
    } catch (e) {
      return res.status(500).json({ error: String((e && e.message) ? e.message : e) });
    }
  }

  // ---- 其次：Vercel Redis（TCP，ioredis，REDIS_URL） ----
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
    const store = makeStore(
      async function () {
        const raw = await r.lrange(KEY, '0', '-1');
        if (raw && raw[0]) { try { return JSON.parse(raw[0]); } catch (e) { return null; } }
        return null;
      },
      async function (obj) {
        await r.multi().del(KEY).rpush(KEY, JSON.stringify(obj)).exec();
      }
    );
    try {
      if (req.method === 'GET') return await handleGet(store);
      if (req.method === 'PATCH' || req.method === 'PUT') return await handleUpdate(store);
      return res.status(405).json({ error: 'method_not_allowed' });
    } catch (e) {
      return res.status(500).json({ error: String((e && e.message) ? e.message : e) });
    }
  }

  // ---- 其次：GitHub Gist（免费，数据自管；用 content.json 避免与 notes.json 冲突） ----
  if (GIST_ID && GH_TOKEN) {
    const headers = {
      Authorization: 'token ' + GH_TOKEN,
      Accept: 'application/vnd.github+json',
      'User-Agent': 'lxlylzl-content'
    };
    async function readGist() {
      const r = await fetch('https://api.github.com/gists/' + GIST_ID, { headers });
      if (!r.ok) throw new Error('gist GET ' + r.status);
      const j = await r.json();
      const raw = (j.files && j.files['content.json']) ? j.files['content.json'].content : 'null';
      try { return JSON.parse(raw); } catch (e) { return null; }
    }
    async function writeGist(obj) {
      const r = await fetch('https://api.github.com/gists/' + GIST_ID, {
        method: 'PATCH',
        headers: Object.assign({}, headers, { 'Content-Type': 'application/json' }),
        body: JSON.stringify({ files: { 'content.json': { content: JSON.stringify(obj, null, 2) } } })
      });
      if (!r.ok) throw new Error('gist PATCH ' + r.status);
    }
    const store = makeStore(readGist, writeGist);
    try {
      if (req.method === 'GET') return await handleGet(store);
      if (req.method === 'PATCH' || req.method === 'PUT') return await handleUpdate(store);
      return res.status(405).json({ error: 'method_not_allowed' });
    } catch (e) {
      return res.status(500).json({ error: String((e && e.message) ? e.message : e) });
    }
  }

  // ---- 兜底：内存（仅演示，不持久） ----
  const store = makeStore(
    async function () { return global.__content || null; },
    async function (obj) { global.__content = obj; }
  );
  try {
    if (req.method === 'GET') return await handleGet(store);
    if (req.method === 'PATCH' || req.method === 'PUT') return await handleUpdate(store);
    return res.status(405).json({ error: 'method_not_allowed' });
  } catch (e) {
    return res.status(500).json({ error: String((e && e.message) ? e.message : e) });
  }
};
