module.exports = async (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');

  const KV_URL = process.env.KV_REST_API_URL;
  const KV_TOKEN = process.env.KV_REST_API_TOKEN;
  const GIST_ID = process.env.GIST_ID;
  const GH_TOKEN = process.env.GITHUB_TOKEN;
  const KEY = 'notes';

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

  // ---- 优先：Vercel KV（Upstash） ----
  if (KV_URL && KV_TOKEN) {
    async function kv(cmd) {
      const r = await fetch(KV_URL, {
        method: 'POST',
        headers: { Authorization: 'Bearer ' + KV_TOKEN },
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
        const note = { id: Date.now(), name: name || '匿名', content: content, ts: Date.now() };
        await kv(['RPUSH', KEY, JSON.stringify(note)]);
        return res.json(note);
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
