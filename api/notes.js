module.exports = async (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  // 完整 CORS 头：允许跨域（含自定义鉴权头），否则浏览器预检 OPTIONS 失败 -> 前端报"网络错误"
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, PATCH, PUT, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-admin-user, x-admin-pass');

  // 处理浏览器跨域预检（OPTIONS），必须 2xx 且带上面的 CORS 头
  if (req.method === 'OPTIONS') return res.status(204).end();

  const GIST_ID = process.env.GIST_ID;
  const GH_TOKEN = process.env.GITHUB_TOKEN;
  const KEY = 'notes';

  // 兼容多种 Upstash / Vercel Redis 注入的变量名
  // （KV 默认注入 KV_REST_API_URL；Redis 用自定义前缀如 STORAGE 注入 STORAGE_REST_API_URL）
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

  // ---- 读取请求体（兼容 Vercel 已解析 / 原始流） ----
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
  // 默认 liweijie / lwjjack0123；可用 Vercel 环境变量 ADMIN_USER / ADMIN_PASS 覆盖
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
  // 通用后台管理逻辑（删除单条 / 编辑单条 / 清空全部），传入仓储读写函数
  async function handleAdmin(req, res, store) {
    if (!isAdmin(req)) return res.status(401).json({ error: 'unauthorized' });
    const body = await getBody();
    // 清空全部留言
    if ((req.query && req.query.all === '1') || (body && body.all)) {
      await store.clear();
      return res.json({ ok: true, deletedAll: true });
    }
    const id = Number((req.query && req.query.id) || (body && body.id));
    if (!id) return res.status(400).json({ error: 'missing_id' });
    const list = await store.all();
    const idx = list.findIndex(function (o) { return o.id === id; });
    if (idx < 0) return res.status(404).json({ error: 'not_found' });
    if (req.method === 'DELETE') {
      list.splice(idx, 1);
      await store.save(list);
      return res.json({ ok: true, deleted: id });
    }
    // PATCH / PUT：编辑内容
    const newContent = (body.content || '').toString().trim().slice(0, 500);
    if (!newContent) return res.status(400).json({ error: 'empty' });
    list[idx].content = newContent;
    list[idx].edited = true;
    await store.save(list);
    return res.json(list[idx]);
  }

  // 登录探测：GET ?probe=1 校验账号密码（凭 query 或 header），不依赖具体存储后端
  if (req.method === 'GET' && req.query && req.query.probe === '1') {
    if (!isAdmin(req)) return res.status(401).json({ error: 'unauthorized' });
    return res.json({ ok: true });
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
    try {
      if (req.method === 'GET') {
        const raw = await kv(['LRANGE', KEY, '0', '-1']);
        const list = (raw || []).map(function (s) { try { return JSON.parse(s); } catch (e) { return null; } }).filter(Boolean).reverse();
        return res.json(list);
      }
      if (req.method === 'POST') {
        const body = await getBody();
        const content = (body.content || '').toString().trim().slice(0, 500);
        if (!content) return res.status(400).json({ error: 'empty' });
        const name = (body.name || '').toString().trim().slice(0, 20);
        // 回复某条留言（嵌套 replies）
        if (body.parentId) {
          const raw = await kv(['LRANGE', KEY, '0', '-1']);
          const list = (raw || []).map(function (s) { try { return JSON.parse(s); } catch (e) { return null; } }).filter(Boolean);
          const target = list.find(function (o) { return o.id === body.parentId; });
          if (!target) return res.status(404).json({ error: 'not_found' });
          target.replies = target.replies || [];
          target.replies.push({ id: Date.now(), name: name || '匿名', content: content, ts: Date.now() });
          await kv(['DEL', KEY]);
          await kv(['RPUSH', KEY].concat(list.map(function (o) { return JSON.stringify(o); })));
          return res.json(target);
        }
        const note = { id: Date.now(), name: name || '匿名', content: content, ts: Date.now(), replies: [] };
        await kv(['RPUSH', KEY, JSON.stringify(note)]);
        return res.json(note);
      }
      if (req.method === 'DELETE' || req.method === 'PATCH' || req.method === 'PUT') {
        return handleAdmin(req, res, {
          clear: function () { return kv(['DEL', KEY]); },
          all: function () {
            return kv(['LRANGE', KEY, '0', '-1']).then(function (raw) {
              return (raw || []).map(function (s) { try { return JSON.parse(s); } catch (e) { return null; } }).filter(Boolean);
            });
          },
          save: function (list) {
            return kv(['DEL', KEY]).then(function () {
              if (!list.length) return null;
              return kv(['RPUSH', KEY].concat(list.map(function (o) { return JSON.stringify(o); })));
            });
          }
        });
      }
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
      // Upstash 强制 TLS：redis:// -> rediss://
      if (/upstash\.io/i.test(url) && url.indexOf('redis://') === 0) {
        url = 'rediss://' + url.slice('redis://'.length);
      }
      const c = new Redis(url, { maxRetriesPerRequest: 2, enableOfflineQueue: true });
      global.__redisClient = c;
      return c;
    }
    try {
      const r = getRedis();
      if (req.method === 'GET') {
        const raw = await r.lrange(KEY, '0', '-1');
        const list = (raw || []).map(function (s) { try { return JSON.parse(s); } catch (e) { return null; } }).filter(Boolean).reverse();
        return res.json(list);
      }
      if (req.method === 'POST') {
        const body = await getBody();
        const content = (body.content || '').toString().trim().slice(0, 500);
        if (!content) return res.status(400).json({ error: 'empty' });
        const name = (body.name || '').toString().trim().slice(0, 20);
        // 回复某条留言（嵌套 replies）
        if (body.parentId) {
          const raw = await r.lrange(KEY, '0', '-1');
          const list = (raw || []).map(function (s) { try { return JSON.parse(s); } catch (e) { return null; } }).filter(Boolean);
          const target = list.find(function (o) { return o.id === body.parentId; });
          if (!target) return res.status(404).json({ error: 'not_found' });
          target.replies = target.replies || [];
          target.replies.push({ id: Date.now(), name: name || '匿名', content: content, ts: Date.now() });
          await r.multi().del(KEY).rpush(KEY, ...list.map(function (o) { return JSON.stringify(o); })).exec();
          return res.json(target);
        }
        const note = { id: Date.now(), name: name || '匿名', content: content, ts: Date.now(), replies: [] };
        await r.rpush(KEY, JSON.stringify(note));
        return res.json(note);
      }
      // ---- 后台管理：删除 / 编辑单条 / 清空全部（需账号+密码，前端 /admin.html 用） ----
      if (req.method === 'DELETE' || req.method === 'PATCH' || req.method === 'PUT') {
        return handleAdmin(req, res, {
          clear: function () { return r.del(KEY); },
          all: function () {
            return r.lrange(KEY, '0', '-1').then(function (raw) {
              return (raw || []).map(function (s) { try { return JSON.parse(s); } catch (e) { return null; } }).filter(Boolean);
            });
          },
          save: function (list) {
            if (!list.length) return r.del(KEY);
            return r.multi().del(KEY).rpush(KEY, ...list.map(function (o) { return JSON.stringify(o); })).exec();
          }
        });
      }
      return res.status(405).json({ error: 'method_not_allowed' });
    } catch (e) {
      return res.status(500).json({ error: String((e && e.message) ? e.message : e) });
    }
  }

  // ---- 其次：GitHub Gist（免费，数据自管） ----
  if (GIST_ID && GH_TOKEN) {
    const headers = {
      Authorization: 'token ' + GH_TOKEN,
      Accept: 'application/vnd.github+json',
      'User-Agent': 'lxlylzl-notes'
    };
    async function readGist() {
      const r = await fetch('https://api.github.com/gists/' + GIST_ID, { headers });
      if (!r.ok) throw new Error('gist GET ' + r.status);
      const j = await r.json();
      const raw = (j.files && j.files['notes.json']) ? j.files['notes.json'].content : '[]';
      try { return JSON.parse(raw) || []; } catch (e) { return []; }
    }
    async function writeGist(arr) {
      const r = await fetch('https://api.github.com/gists/' + GIST_ID, {
        method: 'PATCH',
        headers: Object.assign({}, headers, { 'Content-Type': 'application/json' }),
        body: JSON.stringify({ files: { 'notes.json': { content: JSON.stringify(arr, null, 2) } } })
      });
      if (!r.ok) throw new Error('gist PATCH ' + r.status);
    }
    try {
      if (req.method === 'GET') {
        const list = (await readGist()).reverse(); // 新 -> 旧（我们 push 到末尾）
        return res.json(list);
      }
      if (req.method === 'POST') {
        const body = await getBody();
        const content = (body.content || '').toString().trim().slice(0, 500);
        if (!content) return res.status(400).json({ error: 'empty' });
        const name = (body.name || '').toString().trim().slice(0, 20);
        const note = { id: Date.now(), name: name || '匿名', content: content, ts: Date.now() };
        const arr = await readGist();
        arr.push(note);
        await writeGist(arr);
        return res.json(note);
      }
      if (req.method === 'DELETE' || req.method === 'PATCH' || req.method === 'PUT') {
        return handleAdmin(req, res, {
          clear: function () { return writeGist([]); },
          all: function () { return readGist(); },
          save: function (list) { return writeGist(list); }
        });
      }
      return res.status(405).json({ error: 'method_not_allowed' });
    } catch (e) {
      return res.status(500).json({ error: String((e && e.message) ? e.message : e) });
    }
  }

  // ---- 兜底：内存（仅演示，不持久） ----
  if (req.method === 'GET') return res.json(global.__notes || []);
  if (req.method === 'POST') {
    const body = await getBody();
    const content = (body.content || '').toString().trim().slice(0, 500);
    if (!content) return res.status(400).json({ error: 'empty' });
    const note = {
      id: Date.now(),
      name: (body.name || '').toString().trim().slice(0, 20) || '匿名',
      content: content,
      ts: Date.now()
    };
    global.__notes = [note, ...(global.__notes || [])];
    return res.json(note);
  }
  return res.status(405).json({ error: 'method_not_allowed' });
};
