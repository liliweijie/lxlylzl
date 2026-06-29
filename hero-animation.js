/* ============================================
   HERO ANIMATION — 首页炫酷文件动画
   流程：开屏 Loading (Logo出现→放大→消失) → 淡出 → 文件飞入 → 点击散落
   ============================================ */

(function() {
  'use strict';

  var PHASE = { IDLE: 0, LOADING: 1, FLYIN: 2, SCATTERED: 3 };
  var currentPhase = PHASE.IDLE;

  var FILE_DEFS = [
    {
      type: 'black',
      html:
        '<div class="hf-title">LX</div>' +
        '<div class="hf-subtitle">Design</div>' +
        '<div class="hf-sticker hf-sticker--top-right">H</div>' +
        '<div class="hf-sticker hf-sticker--arrow">&rarr;</div>' +
        '<div class="hf-label">Studio</div>'
    },
    {
      type: 'white',
      html:
        '<div class="hf-line hf-line--long"></div>' +
        '<div class="hf-line hf-line--medium"></div>' +
        '<div class="hf-line hf-line--short"></div>' +
        '<div class="hf-line hf-line--medium"></div>' +
        '<div class="hf-line hf-line--short"></div>' +
        '<div class="hf-badge">Monotype</div>'
    },
    {
      type: 'dark-card',
      html:
        '<div class="hf-circle">05</div>' +
        '<div class="hf-grid">' +
          '<div class="hero-file--dark-cell"></div><div class="hero-file--dark-cell"></div>' +
          '<div class="hero-file--dark-cell"></div><div class="hero-file--dark-cell"></div>' +
          '<div class="hero-file--dark-cell"></div><div class="hero-file--dark-cell"></div>' +
        '</div>'
    },
    {
      type: 'blue-folder',
      html: '<div class="hf-tab"><span>Gallery</span><span>&#x2197;</span></div>'
    },
    {
      type: 'note',
      html: 'Idea &nbsp; <br/>Concept<br/><div class="hf-scribble"></div>'
    }
  ];

  var STACKED_POSITIONS = [
    { left: '8%', top: '12%', rotate: -4, zIndex: 5 },
    { left: '2%', top: '6%', rotate: -7, zIndex: 1 },
    { left: '14%', top: '28%', rotate: 6, zIndex: 4 },
    { left: '-1%', top: '42%', rotate: -2, zIndex: 2 },
    { left: '18%', top: '52%', rotate: 8, zIndex: 3 }
  ];

  function generateScatterPositions(count) {
    var positions = [];
    for (var i = 0; i < count; i++) {
      positions.push({
        left: (8 + Math.random() * 72) + '%',
        top: (8 + Math.random() * 72) + '%',
        rotate: (Math.random() - 0.5) * 24,
        scale: 0.85 + Math.random() * 0.25
      });
    }
    return positions;
  }

  var loadingOverlay = null;
  var filesContainer = null;
  var hintEl = null;
  var fileEls = [];
  var scatterPositions = [];
  var loadingTimer = null;

  // 获取当前主题
  function getTheme() {
    return document.documentElement.getAttribute('data-theme') || 'dark';
  }

  // 初始化开屏 Loading
  function initLoading() {
    loadingOverlay = document.getElementById('heroLoadingOverlay');
    if (!loadingOverlay) return;

    var theme = getTheme();
    loadingOverlay.className = 'hero-loading-overlay ' + theme;
    loadingOverlay.style.opacity = '1';
    loadingOverlay.style.display = 'flex';

    currentPhase = PHASE.LOADING;

    // Logo 动画完成后（3.5s），淡出 Loading 覆盖层
    loadingTimer = setTimeout(function() {
      if (currentPhase === PHASE.LOADING) {
        fadeOutLoading();
      }
    }, 3800); // 3.5s 动画 + 0.3s 缓冲
  }

  // 淡出 Loading 覆盖层
  function fadeOutLoading() {
    if (!loadingOverlay) return;

    loadingOverlay.classList.add('fade-out');

    // 淡出动画完成后（1.2s），隐藏覆盖层并显示页面内容
    setTimeout(function() {
      loadingOverlay.classList.add('hidden');
      // 显示页面内容
      document.body.classList.add('hero-loaded');
      startFlyIn();
    }, 100);
  }

  // 初始化文件动画
  function init() {
    filesContainer = document.getElementById('heroFiles');
    hintEl = document.getElementById('heroHint');

    if (!filesContainer || !hintEl) {
      console.warn('[hero] 缺少必要的 DOM 元素');
      return;
    }

    scatterPositions = generateScatterPositions(FILE_DEFS.length);
    createFileCards();

    // 点击事件
    filesContainer.addEventListener('click', handleStageClick);
  }

  // 创建文件卡片
  function createFileCards() {
    // 先清空
    filesContainer.innerHTML = '';
    fileEls = [];

    for (var i = 0; i < FILE_DEFS.length; i++) {
      var def = FILE_DEFS[i];
      var el = document.createElement('div');
      el.className = 'hero-file hero-file--' + def.type;
      el.innerHTML = def.html;
      el.style.opacity = '0';
      el.dataset.index = i;
      filesContainer.appendChild(el);
      fileEls.push(el);
    }
  }

  // 文件飞入左侧堆叠
  function startFlyIn() {
    currentPhase = PHASE.FLYIN;

    // 依次飞入，有错落感
    for (var i = 0; i < fileEls.length; i++) {
      (function(idx, el) {
        var pos = STACKED_POSITIONS[idx];

        el.style.left = '-30%';
        el.style.top = pos.top;
        el.style.transform = 'rotate(' + (pos.rotate - 15) + 'deg) scale(0.6)';
        el.style.zIndex = pos.zIndex;
        el.style.opacity = '0';

        setTimeout(function() {
          el.classList.add('flying-in');
          el.style.left = pos.left;
          el.style.top = pos.top;
          el.style.transform = 'rotate(' + pos.rotate + 'deg) scale(1)';
          el.style.opacity = '1';
        }, idx * 120);

      })(i, fileEls[i]);
    }

    // 飞入完成后显示点击提示
    setTimeout(function() {
      if (currentPhase === PHASE.FLYIN) {
        hintEl.style.display = '';
        hintEl.style.opacity = '0';
        requestAnimationFrame(function() {
          hintEl.style.transition = 'opacity 0.5s ease';
          hintEl.style.opacity = '1';
        });
      }
    }, FILE_DEFS.length * 120 + 700);
  }

  // 点击散落
  function handleStageClick(e) {
    if (currentPhase !== PHASE.FLYIN && currentPhase !== PHASE.SCATTERED) return;

    if (currentPhase === PHASE.SCATTERED) {
      gatherThenScatter();
      return;
    }

    doScatter();
  }

  function doScatter() {
    currentPhase = PHASE.SCATTERED;
    hintEl.style.display = 'none';

    for (var i = 0; i < fileEls.length; i++) {
      (function(idx, el) {
        el.classList.remove('flying-in');
        el.classList.add('scattered');
        void el.offsetHeight;

        var target = scatterPositions[idx];
        el.style.left = target.left;
        el.style.top = target.top;
        el.style.transform =
          'rotate(' + target.rotate + 'deg) scale(' + target.scale + ')';
        el.style.zIndex = Math.floor(10 + Math.random() * 20);
      })(i, fileEls[i]);
    }
  }

  function gatherThenScatter() {
    for (var i = 0; i < fileEls.length; i++) {
      (function(idx, el) {
        el.classList.remove('scattered');
        el.classList.add('flying-in');
        void el.offsetHeight;

        var pos = STACKED_POSITIONS[idx];
        el.style.left = pos.left;
        el.style.top = pos.top;
        el.style.transform = 'rotate(' + pos.rotate + 'deg) scale(1)';
        el.style.zIndex = pos.zIndex;
      })(i, fileEls[i]);
    }

    scatterPositions = generateScatterPositions(fileEls.length);
    setTimeout(doScatter, 750);
  }

  // 主初始化
  function init() {
    loadingOverlay = document.getElementById('heroLoadingOverlay');
    filesContainer = document.getElementById('heroFiles');
    hintEl = document.getElementById('heroHint');

    if (!filesContainer || !hintEl) {
      console.warn('[hero] 缺少必要的 DOM 元素');
      return;
    }

    // 已经在 HTML 中通过 inline script 设置了主题类
    // 这里只需要确保 Loading 状态正确
    currentPhase = PHASE.LOADING;

    // Logo 动画完成后（0.8s），触发淡出
    loadingTimer = setTimeout(function() {
      if (currentPhase === PHASE.LOADING) {
        fadeOutLoading();
      }
    }, 1100); // 0.8s 动画 + 0.3s 缓冲

    // 初始化文件动画
    scatterPositions = generateScatterPositions(FILE_DEFS.length);
    createFileCards();

    // 点击事件
    filesContainer.addEventListener('click', handleStageClick);
  }

  // 页面加载时立即初始化
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
