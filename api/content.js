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
  const READABLE = PAGES.concat(['site']);

  // ===== 默认内容（首次部署做种子，与前台四页静态 HTML 完整对应） =====
  const DEFAULT_CONTENT = {
    site: {
      brand: 'liweijie',
      email: 'hello@lxlylzl.xyz',
      wechat: 'lxlylzl',
      social: '小红书 / 微博 / Instagram: @lxlylzl',
      availability: '2026 Q1 档期开放中'
    },
    index: {
      hero: {
        strip: ['⊙ LIWEIJIE', 'PORTFOLIO', 'DESIGNER ⊙'],
        letters: 'LXYZI',
        seals: ['1993', '2026'],
        tagline: "✳ BE DIFFERENT AROUND IT · LET'S START AND WORK TOGETHER ©2026 ✳",
        words: ['DESIGN', 'AI', 'FUTURE'],
        bottom: ['㉚ BE DIFFERENT AROUND IT ㉖', 'FUTIAN SZ', 'DES / DEV / BRAND']
      },
      position: {
        kicker: 'POSITION / 000',
        text: '独立设计师 & 创意开发者 · 深圳福田。连接品牌视觉、网站体验、创意前端与 AI 工作流——从一张海报到一个完整的站,一个人也能是一支小队。'
      },
      manifesto: {
        rows: [
          [{ t: '我不做“安全”的' }, { t: '设计。' }],
          [{ t: '每一个像素' }, { t: '都应该有' }, { t: '立场', red: true }],
          [{ t: '每一次点击' }, { t: '都值得' }, { t: '回应。', red: true }]
        ],
        kicker: 'MANIFESTO / 001 — 独立设计师 & 创意开发者,深圳·福田'
      },
      services: {
        kicker: 'SERVICES / 002',
        title: '我能帮你做什么',
        lead: '从一张海报到一个完整的站,一个人也能是一支小队。',
        rows: [
          { no: '01', cn: '品牌视觉', en: 'Branding', price: '¥8k 起', subject: '项目咨询:品牌视觉 BRANDING', desc: 'Logo、VI、字体与色彩系统。让品牌一眼被记住。' },
          { no: '02', cn: '网站 / 产品体验', en: 'Web & Product', price: '¥12k 起', subject: '项目咨询:网站/产品体验 WEB & PRODUCT', desc: '官网 / 作品集 / 产品页。拒绝模板,每站一张脸。' },
          { no: '03', cn: '创意前端', en: 'Creative Dev', price: '¥15k 起', subject: '项目咨询:创意前端 CREATIVE DEV', desc: 'React / GSAP / Three.js,把动效做到能落地。' },
          { no: '04', cn: 'AI 工作流', en: 'AI Workflow', price: '聊聊看', subject: '项目咨询:AI 工作流 AI WORKFLOW', desc: 'AI 辅助视觉生成与快速原型,把三周的活压到三天。' }
        ]
      },
      selected: {
        kicker: 'SELECTED / 003',
        title: '精选作品',
        meta: '06 / 14 PROJECTS · 点击任意作品直达作品页 →',
        items: [
          { title: 'Central on Air', tags: '+ DESIGN + BRANDING', cover: 'assets/work-central-on-air.webp', target: 'central-on-air' },
          { title: 'Patch System', tags: '+ GENERATIVE + DEV', cover: 'assets/work-patch-system.webp', target: 'patch-system' },
          { title: 'Unis Footwear', tags: '+ BRANDING + POSTER', cover: 'assets/work-unis-footwear.webp', target: 'unis-footwear' },
          { title: 'HŌM', tags: '+ BRANDING + EDITORIAL', cover: 'assets/work-hom.webp', target: 'hom' },
          { title: 'ZaZa', tags: '+ BRANDING + ILLUSTRATION', cover: 'assets/work-zaza.webp', target: 'zaza' },
          { title: 'Radical Face', tags: '+ MUSIC + ARTWORK', cover: 'assets/work-radical-face.webp', target: 'radical-face' }
        ],
        more: { top: 'FULL ARCHIVE', big: '+ 8 MORE', zh: '查看全部作品', bot: 'NEXT FRAME · 02 WORKS' }
      },
      process: {
        title: '合作流程',
        kicker: 'PROCESS / 004 · 一般 2–6 周',
        steps: [
          { no: '01', title: '聊聊', en: 'Talk', desc: '30 分钟语音或文字,讲清楚你要什么、卡在哪。' },
          { no: '02', title: '提案', en: 'Proposal', desc: '3 天内给方向稿 + 排期 + 报价,不合适直接说。' },
          { no: '03', title: '创作', en: 'Create', desc: '每 3–4 天同步一次进度,过程透明可打断。' },
          { no: '04', title: '交付 & 陪跑', en: 'Deliver', desc: '源文件全交,上线后再陪跑 2 周。' }
        ]
      },
      availability: {
        kicker: 'AVAILABILITY / 005',
        title: '有项目想聊聊?',
        badge: '2026 Q1 档期开放中',
        desc: '品牌 / 网站 / 开发,或只是一张海报——发需求到邮箱,24h 内回复。',
        email: 'hello@lxlylzl.xyz',
        wechat: 'lxlylzl',
        no: 'NO. 20260101'
      },
      marquee: "BE DIFFERENT AROUND IT ✳ LET'S WORK TOGETHER ✳ DESIGN × AI × FUTURE ✳",
      footer: '©2026 liweijie · MADE IN FUTIAN SZ'
    },
    works: {
      head: {
        kicker: 'ARCHIVE / 02',
        cn: '作品',
        en: 'WORKS',
        side: 'TOTAL 14 · 2022—2026 · DES/DEV/BRAND/PKG'
      },
      filters: ['设计', '开发', '品牌', '包装'],
      projects: [
        { id: 'central-on-air', title: 'Central on Air', tags: '+ DESIGN + BRANDING', year: '2026', role: '设计 & 开发', deliverables: '品牌系统 · 官网', desc: '一档深夜电台的视觉与网站:把“正在播出”做成一种颜色。', cats: '设计 开发 品牌', cover: 'assets/work-central-on-air.webp', ratio: 'r45' },
        { id: 'patch-system', title: 'Patch System', tags: '+ GENERATIVE + DEV', year: '2025', role: '创意开发', deliverables: '生成系统 · 视觉工具', desc: '一套会自己拼贴的红黑像素系统:每一次刷新,都是一张新海报。', cats: '设计 开发', cover: 'assets/work-patch-system.webp', ratio: 'r34' },
        { id: 'unis-footwear', title: 'Unis Footwear', tags: '+ BRANDING + POSTER', year: '2025', role: '设计 & 开发', deliverables: '电商网站 · 产品视觉', desc: '一双跑鞋的电商实验:包豪斯构成,加上一条顺滑的购买路径。', cats: '开发 品牌', cover: 'assets/work-unis-footwear.webp', ratio: 'r45' },
        { id: 'hom', title: 'HŌM', tags: '+ BRANDING + EDITORIAL', year: '2024', role: '品牌设计', deliverables: '品牌识别 · 包装系统', desc: '一个家居品牌的安静表达:衬线、圆,和纸的触感。', cats: '品牌 包装', cover: 'assets/work-hom.webp', ratio: 'r34' },
        { id: 'zaza', title: 'ZaZa', tags: '+ BRANDING + ILLUSTRATION', year: '2024', role: '品牌设计', deliverables: '品牌识别 · 菜单系统', desc: '一家餐厅的视觉:红椒、撕纸与手写字的热闹。', cats: '品牌 设计', cover: 'assets/work-zaza.webp', ratio: 'r45' },
        { id: 'radical-face', title: 'Radical Face', tags: '+ MUSIC + ARTWORK', year: '2024', role: '视觉设计', deliverables: '专辑封面 · 动态视觉', desc: '一张专辑的视觉:半调网点与故障条纹里的一张侧脸。', cats: '设计 品牌', cover: 'assets/work-radical-face.webp', ratio: 'r34' },
        { id: 'overmind-ai', title: 'Overmind AI', tags: '+ WEB + MOTION', year: '2025', role: '设计 & 开发', deliverables: '官网 · 动效', desc: '一家 AI 公司的官网:神经网络的光,克制地亮着。', cats: '开发 设计', cover: 'assets/work-overmind-ai.webp', ratio: 'r45' },
        { id: 'lens', title: 'Lens · Issue 02', tags: '+ EDITORIAL + PHOTO', year: '2025', role: '设计 & 前端', deliverables: '编辑网站 · 视觉系统', desc: '一本摄影集的线上版本:取景框、对焦十字与大量留白。', cats: '设计 开发', cover: 'assets/work-lens.webp', ratio: 'r34' },
        { id: 'brews-grooves', title: 'Brews & Grooves', tags: '+ BRANDING + MUSIC', year: '2023', role: '视觉设计', deliverables: '活动主视觉 · 周边', desc: '一场啤酒与唱片的活动:声音和泡沫的颜色。', cats: '设计 品牌', ratio: 'r45', ph: { a: '#2b2b30', b: '#45454c' } },
        { id: 'animus', title: 'Animus', tags: '+ EXPERIMENTAL + 3D', year: '2023', role: '艺术指导', deliverables: '艺术指导 · 3D 视觉', desc: '一次关于“内在形象”的 3D 实验:形状先于意义出现。', cats: '设计', ratio: 'r34', ph: { a: '#3a1d1b', b: '#5c2420' } },
        { id: 'rhythm-influence', title: 'RhythmInfluence', tags: '+ WEB + CAMPAIGN', year: '2023', role: '品牌设计', deliverables: '品牌识别', desc: '一个音乐营销品牌的识别系统:把节奏做成可以复制的版式。', cats: '品牌', ratio: 'r45', ph: { a: '#1d2530', b: '#2f4152' } },
        { id: 'canvas-agency', title: 'Canvas Agency', tags: '+ WEB + IDENTITY', year: '2023', role: '设计 & 开发', deliverables: '官网', desc: '一家创意机构的官网:把作品集本身做成一件作品。', cats: '开发 设计', ratio: 'r34', ph: { a: '#2e2a1d', b: '#4a4430' } },
        { id: 'lightswitch-video', title: 'Lightswitch Video', tags: '+ MOTION + TOOL', year: '2023', role: '动效设计', deliverables: '片头动效 · 工具', desc: '一个视频工作室的片头:开关之间,灯亮了。', cats: '设计 开发', ratio: 'r45', ph: { a: '#241d2e', b: '#3a2f4a' } },
        { id: 'blank-round', title: 'Blank Round', tags: '+ EXPERIMENTAL + TYPE', year: '2022', role: '实验', deliverables: '字体实验 · 海报', desc: '一次字体与圆圈的空白练习,也是一切的起点。', cats: '设计', ratio: 'r34', ph: { a: '#1d2e28', b: '#2f4a40' } }
      ],
      end: {
        kicker: 'END OF ARCHIVE · 14/14',
        title: '下一个项目, 是你的吗?',
        cta: '聊聊你的项目 →',
        no: 'NO. 0214-END',
        email: 'hello@lxlylzl.xyz',
        wechat: 'lxlylzl'
      },
      marquee: "BE DIFFERENT AROUND IT ✳ LET'S WORK TOGETHER ✳ DESIGN × AI × FUTURE ✳",
      footer: '©2026 liweijie · MADE IN FUTIAN SZ'
    },
    about: {
      portrait: {
        id: 'ID. 1993-LWJ',
        img: 'assets/portrait-liweijie.webp',
        alt: '李伟杰肖像 — 工作台前,红色氛围灯勾边',
        caption: 'LI WEIJIE · b.1993 · FUTIAN, SHENZHEN'
      },
      kicker: 'ABOUT / 03',
      title: { pre: '你好,我是', name: '李伟杰', post: '。' },
      paras: [
        '独立设计师 & 创意开发者,base 深圳福田。',
        '做品牌视觉出身,后来自己学会了写代码——所以现在从我手里出去的东西,设计稿即成品:海报、VI、网站、动效,一个人闭环。',
        '相信三件事:不确定唯一,争议和多元解读;好看和好用不该是选择题;小团队 + AI 工作流,可以做出超规格的东西。'
      ],
      status: { open: 'OPEN FOR PROJECTS — 2026 Q1', tags: 'DES / DEV / BRAND' },
      capsTitle: '能做什么',
      caps: [
        { key: 'A — DESIGN', title: '设计', items: ['品牌识别 / VI 系统', '海报与编辑排版', '包装', '字体与色彩系统'] },
        { key: 'B — DEV', title: '开发', items: ['React / Next 站点', 'GSAP / Framer Motion 动效', 'Three.js / WebGL 实验', '性能与可访问性'] },
        { key: 'C — FLOW', title: '工作流', items: ['Figma → 代码直达', 'AI 辅助视觉生成', '3–4 天一次进度同步', '源文件全量交付'] }
      ],
      tools: '常用工具:Figma · Photoshop · Blender · VS Code · Cursor',
      timelineTitle: '这些年',
      timeline: [
        { year: '1993', text: '生于广东。' },
        { year: '2016', text: '入行,广告公司做品牌视觉。' },
        { year: '2019', text: '开始独立接单,第一个客户是朋友的面馆。' },
        { year: '2022', text: '自学前端,把设计稿亲手写成代码。' },
        { year: '2026', text: '这个站上线,继续开放合作。' }
      ],
      contact: {
        kicker: 'CONTACT / TAIL',
        title: '聊聊你的项目',
        lead: '有需求直接发,没需求也可以先认识一下。',
        no: 'NO. CONTACT-01',
        email: 'hello@lxlylzl.xyz',
        wechat: 'lxlylzl',
        social: '小红书 / 微博 / Instagram: @lxlylzl',
        hint: '24H 内回复'
      },
      marquee: "BE DIFFERENT AROUND IT ✳ LET'S WORK TOGETHER ✳ DESIGN × AI × FUTURE ✳",
      footer: '©2026 liweijie · MADE IN FUTIAN SZ'
    },
    notes: {
      heading: {
        kicker: 'NOTES / 04',
        title: '碎碎念',
        sub: '一些随手写下的碎片。',
        anon: '公开留言 · 匿名 · 请友善 ✳'
      },
      notice: '公开留言会保存到服务器;匿名,请友善。',
      seeds: [
        { text: 'ai 盛行之后,大片平面设计师沦为美工', ts: '07.12', mine: true },
        { text: 'ai 在让人类变蠢～或者说 ai 在让人类两极分化…', ts: '07.15', mine: true },
        { text: '2026.07.17 - 碎碎念!上线!', ts: '07.17', mine: true },
        { text: '不确定唯一,争议和多元解读。', ts: '07.20', mine: true },
        { text: '这个过渡好丝滑,怎么做到的?', ts: '07.21' },
        { text: '从首页滑过来的那一刻我惊了', ts: '07.22' },
        { text: '档期票的设计偷了(不是', ts: '07.23' }
      ],
      rewind: {
        title: '倒带回首页',
        en: 'REWIND TO 01',
        loop: '01 首页 · 02 作品 · 03 关于 · 04 碎碎念 —— 一条胶片,循环播放'
      },
      footer: '©2026 liweijie · MADE IN FUTIAN SZ'
    }
  };

  function clone(v) { return JSON.parse(JSON.stringify(v)); }
  function isObj(v) { return v !== null && typeof v === 'object' && !Array.isArray(v); }
  // 深合并:旧存储缺的新字段自动补默认(数组以存储为准,不合并)
  function fillDefaults(obj, def) {
    var changed = false;
    if (!isObj(obj) || !isObj(def)) return changed;
    for (var k in def) {
      if (!(k in obj)) {
        obj[k] = clone(def[k]);
        changed = true;
      } else if (isObj(def[k]) && isObj(obj[k])) {
        if (fillDefaults(obj[k], def[k])) changed = true;
      }
    }
    return changed;
  }

  // 旧版 works.projects(schema:{title,client,desc,tags,colorDark...})一次性迁移到新卡片 schema。
  // 按 title 匹配新默认项,保留旧的 title/tags/desc;匹配不到则生成 id 并归到“设计”。
  function slug(s) {
    return String(s || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  }
  function migrateLegacy(all) {
    if (!isObj(all) || !isObj(all.works) || !Array.isArray(all.works.projects)) return false;
    var legacy = all.works.projects.some(function (p) { return p && (!p.id || !p.cats); });
    if (!legacy) return false;
    var defs = DEFAULT_CONTENT.works.projects;
    all.works.projects = all.works.projects.map(function (p, i) {
      p = isObj(p) ? p : {};
      var def = null;
      for (var di = 0; di < defs.length; di++) if (defs[di].title === p.title) { def = defs[di]; break; }
      var item = clone(def || defs[i] || {});
      if (!item.id) item.id = (slug(p.title) || ('work-' + (i + 1)));
      if (typeof p.title === 'string' && p.title) item.title = p.title;
      if (typeof p.tags === 'string' && p.tags) item.tags = p.tags;
      if (typeof p.desc === 'string' && p.desc) item.desc = p.desc;
      if (!item.cats) item.cats = '设计';
      if (!item.year) item.year = '2026';
      return item;
    });
    return true;
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
    const h = req.headers || {};
    const b = (req.body && typeof req.body === 'object' && !Array.isArray(req.body)) ? req.body : {};
    return {
      user: (b.user || (h['x-admin-user'] || '')).toString(),
      pass: (b.pass || (h['x-admin-pass'] || '')).toString()
    };
  }
  function isAdmin(req) {
    const ADMIN_USER = process.env.ADMIN_USER;
    const ADMIN_PASS = process.env.ADMIN_PASS;
    const c = getAdminCreds(req);
    return Boolean(ADMIN_USER) && Boolean(ADMIN_PASS) && c.user === ADMIN_USER && c.pass === ADMIN_PASS;
  }

  // 登录探测：GET ?probe=1
  if (req.method === 'GET' && req.query && req.query.probe === '1') {
    if (!isAdmin(req)) return res.status(401).json({ error: 'unauthorized' });
    return res.json({ ok: true });
  }

  // 页参数:GET 允许四页 + site(只读);PATCH/PUT 只允许四页
  function pageOf() {
    const p = (req.query && req.query.page) || '';
    return READABLE.indexOf(p) >= 0 ? p : null;
  }

  // 恢复默认:GET ?page=X&defaults=1 直接返回种子(公开,本来就是前台可见文案)
  if (req.method === 'GET' && req.query && req.query.defaults === '1') {
    const p = pageOf();
    if (!p) return res.status(400).json({ error: 'missing_page' });
    return res.json(clone(DEFAULT_CONTENT[p]));
  }

  // 仓储：读取/写入整份 content 对象
  function makeStore(readFn, writeFn) {
    return {
      read: readFn,
      write: writeFn,
      // 读取整份(缺页/缺字段自动补种子并写回)
      async all() {
        let all = await readFn();
        if (!isObj(all)) {
          all = clone(DEFAULT_CONTENT);
          await writeFn(all);
          return all;
        }
        let changed = false;
        for (const k of READABLE) {
          if (!all[k]) {
            all[k] = clone(DEFAULT_CONTENT[k]);
            changed = true;
          } else if (fillDefaults(all[k], DEFAULT_CONTENT[k])) {
            changed = true;
          }
        }
        if (migrateLegacy(all)) changed = true;
        if (changed) await writeFn(all);
        return all;
      },
      // 读取指定页（缺则种子,缺字段深合并补默认）
      async page(p) {
        const all = await this.all();
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
    // 无 page 参数：返回整份（含 site 元信息）
    return res.json(await store.all());
  }

  // ---- PATCH / PUT 后台更新指定页（site 只读,不可写） ----
  async function handleUpdate(store) {
    if (!isAdmin(req)) return res.status(401).json({ error: 'unauthorized' });
    const p = pageOf();
    if (!p || PAGES.indexOf(p) < 0) return res.status(400).json({ error: 'missing_page' });
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
