module.exports = async (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');

  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;
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

  // ---- 未绑定 KV 时的内存兜底（仅本地预览用，不持久） ----
  if (!url || !token) {
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
  }

  // ---- Upstash REST（Vercel KV） ----
  async function kv(cmd) {
    const r = await fetch(url, {
      method: 'POST',
      headers: { Authorization: 'Bearer ' + token },
      body: JSON.stringify([cmd])
    });
    const j = await r.json();
    if (j.error) throw new Error(j.error);
    return j.result;
  }

  try {
    if (req.method === 'GET') {
      const raw = await kv(['LRANGE', KEY, '0', '-1']); // 旧 -> 新
      const list = (raw || [])
        .map(function (s) { try { return JSON.parse(s); } catch (e) { return null; } })
        .filter(Boolean)
        .reverse(); // 新 -> 旧
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
};
