const { handleUpload } = require('@vercel/blob/client');

const MAX_UPLOAD_BYTES = 500 * 1024 * 1024; // 500MB:够放作品视频,同时避免无限大文件
const ALLOWED_CONTENT_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
  'image/svg+xml',
  'video/mp4',
  'video/webm',
  'video/quicktime'
];
const ALLOWED_EXTENSIONS = ['jpg', 'jpeg', 'png', 'webp', 'gif', 'svg', 'mp4', 'webm', 'mov', 'm4v'];

function sendJson(res, status, data) {
  res.status(status).setHeader('Content-Type', 'application/json; charset=utf-8');
  res.send(JSON.stringify(data));
}

function isAdmin(req) {
  const ADMIN_USER = process.env.ADMIN_USER;
  const ADMIN_PASS = process.env.ADMIN_PASS;
  const h = req.headers || {};
  return Boolean(ADMIN_USER) && Boolean(ADMIN_PASS)
    && String(h['x-admin-user'] || '') === ADMIN_USER
    && String(h['x-admin-pass'] || '') === ADMIN_PASS;
}

function blobConfigured() {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}

function assertPathname(pathname) {
  if (typeof pathname !== 'string' || !pathname) throw new Error('invalid pathname');
  if (pathname.length > 180) throw new Error('pathname too long');
  if (!pathname.startsWith('uploads/1993/')) throw new Error('pathname must stay under uploads/1993/');
  if (pathname.indexOf('..') !== -1 || pathname.indexOf('\\') !== -1) throw new Error('invalid pathname');
  if (pathname !== pathname.trim()) throw new Error('invalid pathname');
  const clean = pathname.split('?')[0].split('#')[0].toLowerCase();
  const ext = clean.substring(clean.lastIndexOf('.') + 1);
  if (ALLOWED_EXTENSIONS.indexOf(ext) === -1) throw new Error('unsupported file extension');
}

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-admin-user, x-admin-pass');

  if (req.method === 'OPTIONS') return res.status(204).end();

  if (!isAdmin(req)) return sendJson(res, 401, { error: 'unauthorized' });

  if (!blobConfigured()) {
    return sendJson(res, 503, {
      error: 'blob_not_configured',
      message: '还没有配置 Vercel Blob。请在 Vercel 项目连接 Blob Storage,或添加 BLOB_READ_WRITE_TOKEN 后 Redeploy。'
    });
  }

  if (req.method === 'GET') {
    return sendJson(res, 200, { ok: true, configured: true, maxBytes: MAX_UPLOAD_BYTES });
  }

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'GET, POST, OPTIONS');
    return sendJson(res, 405, { error: 'method_not_allowed' });
  }

  try {
    const jsonResponse = await handleUpload({
      body: req.body,
      request: req,
      onBeforeGenerateToken: async function (pathname, clientPayload, multipart) {
        // handleUpload 的官方安全要求:签发 token 前必须再次鉴权。
        if (!isAdmin(req)) throw new Error('unauthorized');
        assertPathname(pathname);

        var kind = 'media';
        try {
          var payload = clientPayload ? JSON.parse(clientPayload) : {};
          if (payload && (payload.kind === 'image' || payload.kind === 'video')) kind = payload.kind;
        } catch (e) { /* clientPayload 不可信,解析失败仅按普通媒体处理 */ }

        return {
          allowedContentTypes: ALLOWED_CONTENT_TYPES,
          maximumSizeInBytes: MAX_UPLOAD_BYTES,
          addRandomSuffix: true,
          cacheControlMaxAge: 31536000,
          tokenPayload: JSON.stringify({ kind: kind, multipart: Boolean(multipart) })
        };
      }
      // 不启用 onUploadCompleted:后台直接拿 upload() 返回的 blob.url 回填表单,
      // 也避免 Vercel 完成回调因无后台登录头被误判为未授权。
    });
    return sendJson(res, 200, jsonResponse);
  } catch (error) {
    return sendJson(res, 400, { error: (error && error.message) ? error.message : 'upload_failed' });
  }
};
