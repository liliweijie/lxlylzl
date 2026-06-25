/* ===== 3D Cards for Works Page ===== */
/* Z-axis follows mouse position */

var worksCards = [];
var worksView, worksStage;
var worksScrollX = 0, worksTargetScrollX = 0;
var worksHoveredIdx = -1;
var worksViewWidth = 0, worksViewCenter = 0;
var worksMouseX = -1;  // 鼠标在 view 内的 X 位置，-1 表示未知
var worksAnimFrame = null;
var worksInitialized = false;
var worksWheelHandler = null;

// 全局鼠标跟踪：在 works-3d.js 加载时就开始记录鼠标位置
var _globalMouseX = -1, _globalMouseY = -1;
document.addEventListener('mousemove', function(e) {
  _globalMouseX = e.clientX;
  _globalMouseY = e.clientY;
});

var WORKS_NUM = 20;
var WORKS_BASE_GAP = 170;
var WORKS_MAX_Z = 100;
var WORKS_MIN_Z = -150;
var WORKS_FOCUS_RANGE = 1400;
var WORKS_FISHEYE = 0.25;

var WORKS_CARDS_DATA = [
  {title:"品牌视觉", info:"Logo / VI / 品牌手册", footer:"案例"},
  {title:"包装设计", info:"结构 / 标签 / 品牌应用", footer:"案例"},
  {title:"电商视觉", info:"详情页 / 主图 / 营销素材", footer:"案例"},
  {title:"插画设计", info:"社媒配图 / 商业插画", footer:"画廊"},
  {title:"画册设计", info:"企业宣传册 / 产品手册", footer:"画廊"},
  {title:"社交媒体", info:"公众号 / 小红书 / IG", footer:"案例"},
  {title:"IP形象", info:"角色设定 / 延展应用", footer:"案例"},
  {title:"字体设计", info:"品牌定制字体 / 排版", footer:"样张"},
  {title:"展览视觉", info:"展会 / 活动 / 空间视觉", footer:"案例"},
  {title:"文创设计", info:"周边产品 / 礼盒设计", footer:"画廊"},
  {title:"餐饮品牌", info:"菜单 / 空间 / 视觉系统", footer:"案例"},
  {title:"时尚视觉", info:"服饰 / 配饰 / 视觉策划", footer:"案例"},
  {title:"教育品牌", info:"培训机构 / 学校视觉", footer:"案例"},
  {title:"科技品牌", info:"SaaS / APP / 官网视觉", footer:"案例"},
  {title:"医疗健康", info:"诊所 / 健康品牌视觉", footer:"案例"},
  {title:"公益设计", info:"NGO / 活动 / 传播物料", footer:"案例"},
  {title:"动态设计", info:"短片 / 动效 / 演示", footer:"Showreel"},
  {title:"空间导视", info:"标识 / 环境图形设计", footer:"案例"},
  {title:"书籍装帧", info:"封面 / 排版 / 印刷品", footer:"画廊"},
  {title:"品牌升级", info:"重塑 / 焕新 / 视觉迭代", footer:"案例"}
];

function getWorksThemes() {
  var isLight = document.documentElement.getAttribute('data-theme') === 'light';
  if (isLight) {
    return [
      {bg:'#e8e4dc',fg:'#1a1a2e'},{bg:'#d4cfc7',fg:'#1a1a2e'},{bg:'#c9c4b8',fg:'#1a1a2e'},
      {bg:'#d8d3ca',fg:'#1a1a2e'},{bg:'#c5c0b5',fg:'#1a1a2e'},{bg:'#b8b3a8',fg:'#1a1a2e'},
      {bg:'#ddd8ce',fg:'#1a1a2e'},{bg:'#cec9be',fg:'#1a1a2e'},{bg:'#bfbaae',fg:'#1a1a2e'},
      {bg:'#d1ccbf',fg:'#1a1a2e'},{bg:'#e2ddd4',fg:'#1a1a2e'},{bg:'#d8d2c5',fg:'#1a1a2e'},
      {bg:'#cdc7b8',fg:'#1a1a2e'},{bg:'#c3bdb0',fg:'#1a1a2e'},{bg:'#e5e0d6',fg:'#1a1a2e'},
      {bg:'#dadbce',fg:'#1a1a2e'},{bg:'#cfcbc0',fg:'#1a1a2e'},{bg:'#c4bfb2',fg:'#1a1a2e'},
      {bg:'#dad5ca',fg:'#1a1a2e'},{bg:'#d0cbc0',fg:'#1a1a2e'}
    ];
  }
  return [
    {bg:'#2c2c3e',fg:'#f0ece4'},{bg:'#3a3a4e',fg:'#f0ece4'},{bg:'#4a4a5e',fg:'#f0ece4'},
    {bg:'#1e2d3d',fg:'#f0ece4'},{bg:'#2a3a4a',fg:'#f0ece4'},{bg:'#3a4a5a',fg:'#f0ece4'},
    {bg:'#3e3a2e',fg:'#f0ece4'},{bg:'#4a3a2e',fg:'#f0ece4'},{bg:'#2e3a3a',fg:'#f0ece4'},
    {bg:'#3a4a4a',fg:'#f0ece4'},{bg:'#4a2e2e',fg:'#f0ece4'},{bg:'#5a3a2e',fg:'#f0ece4'},
    {bg:'#2e2e3a',fg:'#f0ece4'},{bg:'#3a3a4a',fg:'#f0ece4'},{bg:'#4a4a5e',fg:'#f0ece4'},
    {bg:'#2e3a2e',fg:'#f0ece4'},{bg:'#3a4a3a',fg:'#f0ece4'},{bg:'#4a5a4a',fg:'#f0ece4'},
    {bg:'#3a2e3a',fg:'#f0ece4'},{bg:'#4a3a4a',fg:'#f0ece4'}
  ];
}

function initWorks3D() {
  if (worksInitialized) return;
  worksView = document.querySelector('.works-3d-view');
  worksStage = document.querySelector('.works-3d-stage');
  if (!worksView || !worksStage) return;

  if (worksView.offsetWidth < 10 || worksView.offsetHeight < 10) {
    setTimeout(initWorks3D, 200);
    return;
  }

  worksViewWidth = worksView.offsetWidth;
  worksViewCenter = worksViewWidth / 2;
  // 用全局鼠标位置计算初始焦点，鼠标在视图外则用中心点
  if (_globalMouseX >= 0) {
    var rect = worksView.getBoundingClientRect();
    var mx = _globalMouseX - rect.left;
    worksMouseX = (mx >= 0 && mx <= worksViewWidth) ? mx : worksViewCenter;
  } else {
    worksMouseX = worksViewCenter;
  }
  // 初始位置直接设为目标值，避免入场动画
  worksScrollX = 300;
  worksTargetScrollX = 300;
  worksInitialized = true;

  var themes = getWorksThemes();
  for (var i = 0; i < WORKS_NUM; i++) {
    var theme = themes[i % themes.length];
    var cardData = WORKS_CARDS_DATA[i];
    var el = document.createElement('div');
    el.className = 'card-3d';
    el.dataset.idx = i;
    el.style.background = theme.bg;
    el.style.color = theme.fg;
    el.innerHTML =
      '<div class="card-inner">' +
        '<span class="card-label">' + theme.bg.toUpperCase() + '</span>' +
        '<div class="card-title-area"><span class="card-title">' + cardData.title + '</span></div>' +
        '<div class="card-num">' + (i+1) + '</div>' +
        '<div class="card-line"></div>' +
        '<span class="card-info">' + cardData.info + '</span>' +
        '<span class="card-footer">' + cardData.footer + '</span>' +
      '</div>';
    worksStage.appendChild(el);

    (function(idx) {
      el.addEventListener('mouseenter', function() { worksHoveredIdx = idx; });
      el.addEventListener('mouseleave', function() { worksHoveredIdx = -1; });
      el.addEventListener('click', function(e) {
        e.stopPropagation();
        openWorksPopup(idx);
      });
    })(i);

    worksCards.push({el: el, idx: i});
  }

  worksWheelHandler = function(e) {
    if (!worksInitialized) return;
    var halfSpread = (WORKS_NUM - 1) * WORKS_BASE_GAP / 2;
    var maxScroll = Math.max(halfSpread, worksViewWidth * 0.45);
    var atRightEdge = worksTargetScrollX <= -maxScroll + 2;
    var atLeftEdge  = worksTargetScrollX >=  maxScroll - 2;
    var scrollingDown = e.deltaY > 0;
    var scrollingUp   = e.deltaY < 0;

    if ((atRightEdge && scrollingDown) || (atLeftEdge && scrollingUp)) {
      e.preventDefault();
      e.stopPropagation();
      if (window.scrollToPage && window.getCurrentPage) {
        var cp = window.getCurrentPage();
        window.scrollToPage(scrollingDown ? cp + 1 : cp - 1);
      }
      return;
    }

    e.preventDefault();
    e.stopPropagation();
    worksTargetScrollX -= e.deltaY * 2;
  };
  worksView.addEventListener('wheel', worksWheelHandler, {passive: false});

  // 鼠标跟踪：用于 Z 轴焦点
  worksView.addEventListener('mousemove', function(e) {
    var rect = worksView.getBoundingClientRect();
    worksMouseX = e.clientX - rect.left;
    _globalMouseX = e.clientX;  // 同步更新全局位置
    _globalMouseY = e.clientY;
  });
  // 鼠标离开时不强制回中心，保持最后位置
  worksView.addEventListener('mouseleave', function() {
    // 可选：缓慢回到中心，现在保持原位
  });

  if (!document.querySelector('.works-popup-overlay')) {
    var overlay = document.createElement('div');
    overlay.className = 'works-popup-overlay';
    overlay.style.cssText = 'position:fixed;inset:0;z-index:500;background:rgba(0,0,0,0.92);opacity:0;visibility:hidden;transition:opacity 0.45s ease;pointer-events:none;';
    overlay.innerHTML =
      '<div class="works-popup-panel" style="position:absolute;top:0;right:0;width:60%;height:100%;background:var(--bg-primary);transform:translateX(100%);transition:transform 0.5s cubic-bezier(0.22,1,0.36,1);display:flex;flex-direction:column;overflow-y:auto;border-left:1px solid rgba(255,255,255,0.06);">' +
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
    document.body.appendChild(overlay);
    overlay.addEventListener('click', function(e) { if (e.target === overlay) closeWorksPopup(); });
    overlay.querySelector('.works-popup-close').addEventListener('click', closeWorksPopup);
  }

  worksAnimFrame = requestAnimationFrame(updateWorks3D);
}

function destroyWorks3D() {
  if (worksAnimFrame) { cancelAnimationFrame(worksAnimFrame); worksAnimFrame = null; }
  worksInitialized = false;
  worksCards = [];
  worksScrollX = 0; worksTargetScrollX = 0;

  if (worksView) {
    if (worksWheelHandler) worksView.removeEventListener('wheel', worksWheelHandler);
  }
  worksWheelHandler = null;
  worksView = null;

  if (worksStage) { worksStage.innerHTML = ''; }
}

function worksFisheye(x) {
  var absX = Math.abs(x);
  if (absX > WORKS_FOCUS_RANGE) return x;
  var t = 1 - absX / WORKS_FOCUS_RANGE;
  var boost = 1 + WORKS_FISHEYE * t * t;
  return x * boost;
}

function updateWorks3D() {
  if (!worksInitialized) return;
  worksScrollX += (worksTargetScrollX - worksScrollX) * 0.05;
  var halfSpread = (WORKS_NUM - 1) * WORKS_BASE_GAP / 2;
  var maxScroll = Math.max(halfSpread, worksViewWidth * 0.45);
  if (worksScrollX > maxScroll) worksScrollX = maxScroll;
  if (worksScrollX < -maxScroll) worksScrollX = -maxScroll;
  if (worksTargetScrollX > maxScroll) worksTargetScrollX = maxScroll;
  if (worksTargetScrollX < -maxScroll) worksTargetScrollX = -maxScroll;

  // Z 轴焦点跟随鼠标位置
  var focusX = worksMouseX;

  var positions = [];
  for (var i = 0; i < WORKS_NUM; i++) {
    var logicalX = (i - (WORKS_NUM - 1) / 2) * WORKS_BASE_GAP + worksScrollX;
    var visualX = worksFisheye(logicalX);
    var screenX = worksViewCenter + visualX;
    var dist = Math.abs(screenX - focusX);
    var z = WORKS_MIN_Z;
    if (dist < WORKS_FOCUS_RANGE) {
      var t = 1 - dist / WORKS_FOCUS_RANGE;
      z = WORKS_MIN_Z + (WORKS_MAX_Z - WORKS_MIN_Z) * Math.pow(t, 1.3);
    }
    positions.push({visualX: visualX, z: z, screenX: screenX});
  }

  var closestIdx = 0, closestDist = Infinity;
  for (var i = 0; i < WORKS_NUM; i++) {
    var d = Math.abs(positions[i].screenX - focusX);
    if (d < closestDist) { closestDist = d; closestIdx = i; }
  }

  for (var i = 0; i < WORKS_NUM; i++) {
    var el = worksCards[i].el;
    var pos = positions[i];
    var tz = pos.z;
    if (parseInt(el.dataset.idx) === worksHoveredIdx) tz += 30;
    el.style.transform = 'translateX(' + pos.visualX + 'px) translateY(-50%) translateZ(' + tz + 'px)';
    el.style.zIndex = Math.round(-tz + 1000);
    if (i === closestIdx) {
      el.style.boxShadow = '-4px 2px 20px rgba(0,0,0,0.3)';
    } else {
      el.style.boxShadow = '0 1px 8px rgba(0,0,0,0.12)';
    }
  }

  worksAnimFrame = requestAnimationFrame(updateWorks3D);
}

function openWorksPopup(idx) {
  var themes = getWorksThemes();
  var theme = themes[idx % themes.length];
  var cardData = WORKS_CARDS_DATA[idx];
  var overlay = document.querySelector('.works-popup-overlay');
  var panel = overlay.querySelector('.works-popup-panel');
  panel.querySelector('h1').textContent = cardData.title;
  panel.querySelector('p').textContent = cardData.info;
  var preview = panel.querySelector('.works-popup-preview');
  preview.dataset.idx = idx;
  preview.style.background = theme.bg;
  preview.style.color = theme.fg;
  preview.textContent = cardData.title + ' — 预览';
  overlay.style.opacity = '1';
  overlay.style.visibility = 'visible';
  overlay.style.pointerEvents = 'auto';
  panel.style.transform = 'translateX(0)';
}

function closeWorksPopup() {
  var overlay = document.querySelector('.works-popup-overlay');
  if (overlay) {
    overlay.style.opacity = '0';
    overlay.style.visibility = 'hidden';
    overlay.style.pointerEvents = 'none';
    overlay.querySelector('.works-popup-panel').style.transform = 'translateX(100%)';
  }
}

// ===== Auto init/destroy =====
(function() {
  function check() {
    var cp = window.getCurrentPage ? window.getCurrentPage() : -1;
    if (cp === 1 && !worksInitialized) {
      initWorks3D();
    } else if (cp !== 1 && worksInitialized) {
      destroyWorks3D();
    }
    setTimeout(check, 300);
  }

  if (document.readyState === 'complete') check();
  else window.addEventListener('load', check);
})();

// 明暗模式切换时同步颜色
function updateWorks3DTheme() {
  if (!worksInitialized) return;
  var themes = getWorksThemes();
  for (var i = 0; i < worksCards.length; i++) {
    var theme = themes[i % themes.length];
    var el = worksCards[i].el;
    el.style.background = theme.bg;
    el.style.color = theme.fg;
    var label = el.querySelector('.card-label');
    if (label) label.textContent = theme.bg.toUpperCase();
  }
  var overlay = document.querySelector('.works-popup-overlay');
  if (overlay && overlay.style.visibility === 'visible') {
    var preview = overlay.querySelector('.works-popup-preview');
    if (preview) {
      var idx = parseInt(preview.dataset.idx || '0');
      var t = themes[idx % themes.length];
      preview.style.background = t.bg;
      preview.style.color = t.fg;
    }
  }
}
window.updateWorks3DTheme = updateWorks3DTheme;
window.initWorks3D = initWorks3D;
window.destroyWorks3D = destroyWorks3D;
