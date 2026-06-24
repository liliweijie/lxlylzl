/* ===== 3D Cards for Works Page — clean rewrite ===== */
/*  coordinate system (simple):
 *    stage holds all cards, positioned via transform
 *    stagePos = 0  →  card0 at left viewport edge
 *    stagePos > 0  →  stage moved left → cards appear to move RIGHT
 *    wheel down (deltaY > 0) → stagePos += delta → cards move RIGHT  ✅
 */

var _wCards = [];
var _wView, _wStage;
var _wPos = 0, _wTarget = 0;      // stagePos, positive = rightward movement
var _wHovered = -1;
var _wMouseX = 0;
var _wViewW = 0;
var _wCenter = 0;
var _wRAF = null;
var _wActive = false;
var _wWheelFn = null, _wMoveFn = null, _wLeaveFn = null;

var W_NUM  = 20;
var W_W    = 260;   // card width
var W_GAP  = 340;   // px between card centers
var W_MAX  = 0;    // computed at init

var W_MAX_Z = 150;
var W_MIN_Z = -250;
var W_FOCUS = 650;
var W_FISH  = 0.20;

var W_DATA = [
  {t:"品牌视觉",  i:"Logo / VI / 品牌手册",             f:"案例"},
  {t:"包装设计",  i:"结构 / 标签 / 品牌应用",           f:"案例"},
  {t:"电商视觉",  i:"详情页 / 主图 / 营销素材",       f:"案例"},
  {t:"插画设计",  i:"社媒配图 / 商业插画",             f:"画廊"},
  {t:"画册设计",  i:"企业宣传册 / 产品手册",           f:"画廊"},
  {t:"社交媒体",  i:"公众号 / 小红书 / IG",              f:"案例"},
  {t:"IP形象",    i:"角色设定 / 延展应用",               f:"案例"},
  {t:"字体设计",  i:"品牌定制字体 / 排版",               f:"样张"},
  {t:"展览视觉",  i:"展会 / 活动 / 空间视觉",           f:"案例"},
  {t:"文创设计",  i:"周边产品 / 礼盒设计",               f:"画廊"},
  {t:"餐饮品牌",  i:"菜单 / 空间 / 视觉系统",           f:"案例"},
  {t:"时尚视觉",  i:"服饰 / 配饰 / 视觉策划",           f:"案例"},
  {t:"教育品牌",  i:"培训机构 / 学校视觉",               f:"案例"},
  {t:"科技品牌",  i:"SaaS / APP / 官网视觉",             f:"案例"},
  {t:"医疗健康",  i:"诊所 / 健康品牌视觉",               f:"案例"},
  {t:"公益设计",  i:"NGO / 活动 / 传播物料",            f:"案例"},
  {t:"动态设计",  i:"短片 / 动效 / 演示",               f:"Showreel"},
  {t:"空间导视",  i:"标识 / 环境图形设计",               f:"案例"},
  {t:"书籍装帧",  i:"封面 / 排版 / 印刷品",             f:"画廊"},
  {t:"品牌升级",  i:"重塑 / 焕新 / 视觉迭代",           f:"案例"}
];

/* ---- helpers ---- */
function _wGetThemes() {
  var light = document.documentElement.getAttribute('data-theme') === 'light';
  if (light) return [
    '#e8e4dc','#d4cfc7','#c9c4b8','#d8d3ca','#c5c0b5',
    '#b8b3a8','#ddd8ce','#cec9be','#bfbaae','#d1ccbf',
    '#e2ddd4','#d8d2c5','#cdc7b8','#c3bdb0','#e5e0d6',
    '#dadbce','#cfcbc0','#c4bfb2','#dad5ca','#d0cbc0'
  ];
  return [
    '#2c2c3e','#3a3a4e','#4a4a5e','#1e2d3d','#2a3a4a',
    '#3a4a5a','#3e3a2e','#4a3a2e','#2e3a3a','#3a4a4a',
    '#4a2e2e','#5a3a2e','#2e2e3a','#3a3a4a','#4a4a5e',
    '#2e3a2e','#3a4a3a','#4a5a4a','#3a2e3a','#4a3a4a'
  ];
}

function _wFisheye(x) {
  var a = Math.abs(x);
  if (a > W_FOCUS) return x;
  var t = 1 - a / W_FOCUS;
  return x * (1 + W_FISH * t * t);
}

/* ---- init ---- */
function initWorks3D() {
  if (_wActive) return;
  _wView  = document.querySelector('.works-3d-view');
  _wStage = document.querySelector('.works-3d-stage');
  if (!_wView || !_wStage) return;
  if (_wView.offsetWidth < 10) { setTimeout(initWorks3D, 200); return; }

  _wViewW = _wView.offsetWidth;
  _wCenter = _wViewW / 2;
  _wMouseX = 80;           // start near left edge
  _wPos     = 0;
  _wTarget  = 0;
  _wActive  = true;
  window._worksPageActive = true;

  W_MAX = Math.max(W_NUM * W_GAP - _wViewW * 0.7, 2000);

  // build cards
  var themes = _wGetThemes();
  for (var i = 0; i < W_NUM; i++) {
    var bg = themes[i % themes.length];
    var d  = W_DATA[i];
    var el = document.createElement('div');
    el.className = 'card-3d';
    el.dataset.idx = i;
    el.style.background = bg;
    el.style.color      = '#f0ece4';
    if (document.documentElement.getAttribute('data-theme') === 'light') el.style.color = '#1a1a2e';
    el.innerHTML =
      '<div class="card-inner">' +
        '<span class="card-label">' + bg.toUpperCase() + '</span>' +
        '<div class="card-title-area"><span class="card-title">' + d.t + '</span></div>' +
        '<div class="card-num">' + (i + 1) + '</div>' +
        '<div class="card-line"></div>' +
        '<span class="card-info">' + d.i + '</span>' +
        '<span class="card-footer">' + d.f + '</span>' +
      '</div>';
    _wStage.appendChild(el);

    (function(idx) {
      el.addEventListener('mouseenter', function() { _wHovered = idx; });
      el.addEventListener('mouseleave', function() { _wHovered = -1; });
      el.addEventListener('click', function(e) { e.stopPropagation(); _wOpenPopup(idx); });
    })(i);

    _wCards.push(el);
  }

  // ---- wheel ----
  _wWheelFn = function(e) {
    if (!_wActive) return;
    e.preventDefault(); e.stopPropagation(); e.stopImmediatePropagation();

    // If already at left edge AND user scrolls up → go to previous page
    if (_wTarget <= 0 && e.deltaY < 0) {
      if (window.scrollToPage && window.getCurrentPage) {
        window.scrollToPage(window.getCurrentPage() - 1);
      }
      return;
    }

    // If already at right edge AND user scrolls down → exit animation then next page
    if (_wTarget >= W_MAX && e.deltaY > 0) {
      _wPlayExit(function() {
        if (window.scrollToPage && window.getCurrentPage) {
          window.scrollToPage(window.getCurrentPage() + 1);
        }
      });
      return;
    }

    // Normal card scrolling
    _wTarget += e.deltaY * 2.0;
    if (_wTarget < 0)     _wTarget = 0;
    if (_wTarget > W_MAX) _wTarget = W_MAX;
  };
  _wView.addEventListener('wheel', _wWheelFn, { passive: false });

  _wMoveFn = function(e) {
    var r = _wView.getBoundingClientRect();
    _wMouseX = e.clientX - r.left;
  };
  _wView.addEventListener('mousemove', _wMoveFn);

  _wLeaveFn = function() { _wMouseX = _wCenter; };
  _wView.addEventListener('mouseleave', _wLeaveFn);

  // popup overlay
  if (!document.querySelector('.works-popup-overlay')) {
    var ov = document.createElement('div');
    ov.className = 'works-popup-overlay';
    ov.style.cssText = 'position:fixed;inset:0;z-index:500;background:rgba(0,0,0,0.92);opacity:0;visibility:hidden;transition:opacity 0.45s ease;pointer-events:none;cursor:pointer;';
    ov.innerHTML =
      '<div class="works-popup-panel" style="position:absolute;top:0;left:0;width:55%;height:100%;background:var(--bg-primary);transform:translateX(-105%);transition:transform 0.52s cubic-bezier(0.22,1,0.36,1);display:flex;flex-direction:column;overflow-y:auto;border-right:1px solid rgba(255,255,255,0.06);cursor:default;">' +
        '<div style="padding:48px 52px 28px;display:flex;align-items:flex-start;justify-content:space-between;">' +
          '<div><div style="font-size:0.72rem;color:var(--text-secondary);letter-spacing:0.08em;text-transform:uppercase;margin-bottom:8px;">案例详情</div></div>' +
          '<button class="works-popup-close" style="width:40px;height:40px;border:1px solid rgba(255,255,255,0.1);background:transparent;color:var(--text-secondary);cursor:pointer;font-size:1.1rem;display:flex;align-items:center;justify-content:center;transition:all 0.2s;border-radius:6px;">✕</button>' +
        '</div>' +
        '<div style="padding:0 52px 60px;flex:1;">' +
          '<h1 style="font-size:2.4rem;font-weight:900;letter-spacing:-0.03em;margin-bottom:16px;"></h1>' +
          '<p style="font-size:0.92rem;line-height:1.75;color:var(--text-secondary);margin-bottom:18px;"></p>' +
          '<div class="works-popup-preview" style="width:100%;aspect-ratio:16/10;border-radius:8px;margin:28px 0;display:flex;align-items:center;justify-content:center;font-size:1.2rem;font-weight:800;letter-spacing:0.04em;"></div>' +
          '<p style="font-size:0.82rem;line-height:1.7;color:var(--text-secondary);">这里是案例的详细描述。可以在此添加项目背景、设计过程、技术细节等内容。</p>' +
        '</div>' +
      '</div>';
    document.body.appendChild(ov);
    ov.addEventListener('click', function(e) { if (e.target === ov) _wClosePopup(); });
    ov.querySelector('.works-popup-close').addEventListener('click', _wClosePopup);
    ov.querySelector('.works-popup-panel').addEventListener('click', function(e) { e.stopPropagation(); });
  }

  _wRAF = requestAnimationFrame(_wRender);
  console.log('[works-3d] init ok, W_MAX=' + W_MAX);
}

/* ---- exit animation: cards drift LEFT then transition ---- */
function _wPlayExit(cb) {
  var start = Date.now();
  var dur  = 550;
  (function step() {
    var t = Math.min((Date.now() - start) / dur, 1);
    var ease = 1 - Math.pow(1 - t, 3);
    for (var i = 0; i < _wCards.length; i++) {
      var el = _wCards[i];
      // cards drift left (negative X shift proportional to index)
      var shift = -ease * (_wViewW * 0.6 + i * 25);
      el.style.transform += ' translateX(' + shift + 'px)';
      el.style.opacity = (1 - ease * 1.2) + '';
    }
    if (t < 1) { requestAnimationFrame(step); }
    else { cb(); }
  })();
}

/* ---- destroy ---- */
function destroyWorks3D() {
  if (_wRAF) { cancelAnimationFrame(_wRAF); _wRAF = null; }
  _wActive = false;
  window._worksPageActive = false;
  _wCards = [];
  _wPos = 0; _wTarget = 0;

  if (_wView) {
    if (_wWheelFn) _wView.removeEventListener('wheel', _wWheelFn);
    if (_wMoveFn)  _wView.removeEventListener('mousemove', _wMoveFn);
    if (_wLeaveFn) _wView.removeEventListener('mouseleave', _wLeaveFn);
  }
  _wWheelFn = null; _wMoveFn = null; _wLeaveFn = null; _wView = null;
  if (_wStage) _wStage.innerHTML = '';
  console.log('[works-3d] destroyed');
}

/* ---- render loop ---- */
function _wRender() {
  if (!_wActive) return;

  // smooth lerp
  _wPos += (_wTarget - _wPos) * 0.10;
  if (Math.abs(_wPos - _wTarget) < 0.5) _wPos = _wTarget;

  // clamp
  if (_wPos < 0)     _wPos = 0;
  if (_wPos > W_MAX) _wPos = W_MAX;

  // update stage transform:
  //   _wPos = 0 → stage at start (card0 at left viewport edge)
  //   stage moves left as _wPos increases → cards appear to move right
  _wStage.style.transform = 'translateX(' + (-_wPos) + 'px) translateY(-50%)';

  // position each card within the stage
  for (var i = 0; i < W_NUM; i++) {
    var el = _wCards[i];
    // card's x position within the stage (horizontal layout)
    var cardStageX = i * W_GAP;
    // how far is this card from the current viewport left edge?
    var viewLeft = _wPos;
    var relX = cardStageX - viewLeft;            // positive = to the right of viewport left edge
    var screenX = 80 + relX;                    // 80px left margin

    // fish-eye depth based on mouse distance
    var fv  = _wFisheye(relX - _wMouseX + 80);
    var dist = Math.abs(screenX - _wMouseX);
    var z = W_MIN_Z;
    if (dist < W_FOCUS) {
      var t = 1 - dist / W_FOCUS;
      z = W_MIN_Z + (W_MAX_Z - W_MIN_Z) * Math.pow(t, 1.3);
    }
    if (i === _wHovered) z += 35;

    // skip off-screen cards
    if (screenX < -300 || screenX > _wViewW + 300) {
      el.style.opacity = '0';
      el.style.pointerEvents = 'none';
      continue;
    }
    el.style.opacity = '1';
    el.style.pointerEvents = '';
    el.style.width = W_W + 'px';
    el.style.zIndex = Math.round(-z + 1000);

    // final transform: position card on screen + depth
    el.style.transform =
      'translateX(' + screenX + 'px)' +
      ' translateY(-50%)' +
      ' translateZ(' + z + 'px)';

    if (dist < W_FOCUS * 0.4) {
      el.style.boxShadow = '-4px 2px 20px rgba(0,0,0,0.3)';
    } else {
      el.style.boxShadow = '0 1px 8px rgba(0,0,0,0.12)';
    }
  }

  _wRAF = requestAnimationFrame(_wRender);
}

/* ---- popup ---- */
function _wOpenPopup(idx) {
  var themes = _wGetThemes();
  var bg = themes[idx % themes.length];
  var d  = W_DATA[idx];
  var ov = document.querySelector('.works-popup-overlay');
  var pn = ov.querySelector('.works-popup-panel');
  pn.querySelector('h1').textContent = d.t;
  pn.querySelector('p').textContent  = d.i;
  var prev = pn.querySelector('.works-popup-preview');
  prev.style.background = bg;
  prev.style.color      = '#f0ece4';
  if (document.documentElement.getAttribute('data-theme') === 'light') prev.style.color = '#1a1a2e';
  prev.textContent      = d.t + ' — 预览';
  ov.style.opacity       = '1';
  ov.style.visibility    = 'visible';
  ov.style.pointerEvents = 'auto';
  pn.style.transform     = 'translateX(0)';
}

function _wClosePopup() {
  var ov = document.querySelector('.works-popup-overlay');
  if (!ov) return;
  ov.style.opacity       = '0';
  ov.style.visibility    = 'hidden';
  ov.style.pointerEvents = 'none';
  ov.querySelector('.works-popup-panel').style.transform = 'translateX(-105%)';
}

/* ---- auto init/destroy ---- */
(function() {
  var main = null;
  function check() {
    var mc = main || (main = document.getElementById('mainContent'));
    if (!mc) { setTimeout(check, 300); return; }
    var vw = mc.clientWidth;
    if (!vw) { setTimeout(check, 300); return; }
    var idx = Math.round(mc.scrollLeft / vw);
    var vis = (idx === 1);
    if (vis && !_wActive) initWorks3D();
    else if (!vis && _wActive) destroyWorks3D();
    setTimeout(check, 300);
  }
  if (document.readyState === 'complete') check();
  else window.addEventListener('load', check);
})();

window.initWorks3D   = initWorks3D;
window.destroyWorks3D = destroyWorks3D;
