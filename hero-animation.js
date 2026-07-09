/* ============================================
   HERO FILE CARDS — 首页文件卡片交互
   开屏动画（Loading 覆盖层）已移除：页面直接显示内容，
   文件卡片加载即呈现于左侧堆叠位，点击可散落 / 再次点击聚拢。
   ============================================ */

(function() {
  'use strict';

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

  var filesContainer = null;
  var hintEl = null;
  var fileEls = [];
  var scatterPositions = [];
  var isScattered = false;

  // 创建文件卡片
  function createFileCards() {
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

  // 将卡片摆放到左侧堆叠位（无开屏延迟）
  function layoutStacked() {
    for (var i = 0; i < fileEls.length; i++) {
      var el = fileEls[i];
      var pos = STACKED_POSITIONS[i];
      el.classList.remove('scattered');
      el.style.left = pos.left;
      el.style.top = pos.top;
      el.style.transform = 'rotate(' + pos.rotate + 'deg) scale(1)';
      el.style.zIndex = pos.zIndex;
      el.style.opacity = '1';
    }
  }

  function showHint() {
    if (!hintEl) return;
    hintEl.style.display = '';
    hintEl.style.opacity = '0';
    requestAnimationFrame(function() {
      hintEl.style.transition = 'opacity 0.5s ease';
      hintEl.style.opacity = '1';
    });
  }

  function hideHint() {
    if (hintEl) hintEl.style.display = 'none';
  }

  // 散落
  function doScatter() {
    isScattered = true;
    hideHint();
    for (var i = 0; i < fileEls.length; i++) {
      (function(idx, el) {
        var target = scatterPositions[idx];
        el.classList.add('scattered');
        el.style.left = target.left;
        el.style.top = target.top;
        el.style.transform =
          'rotate(' + target.rotate + 'deg) scale(' + target.scale + ')';
        el.style.zIndex = Math.floor(10 + Math.random() * 20);
      })(i, fileEls[i]);
    }
  }

  // 聚拢回堆叠位
  function doGather() {
    isScattered = false;
    for (var i = 0; i < fileEls.length; i++) {
      (function(idx, el) {
        el.classList.remove('scattered');
        var pos = STACKED_POSITIONS[idx];
        el.style.left = pos.left;
        el.style.top = pos.top;
        el.style.transform = 'rotate(' + pos.rotate + 'deg) scale(1)';
        el.style.zIndex = pos.zIndex;
      })(i, fileEls[i]);
    }
    showHint();
  }

  function handleStageClick() {
    if (isScattered) doGather();
    else doScatter();
  }

  // 主初始化
  function init() {
    filesContainer = document.getElementById('heroFiles');
    hintEl = document.getElementById('heroHint');

    if (!filesContainer || !hintEl) {
      console.warn('[hero] 缺少必要的 DOM 元素');
      return;
    }

    scatterPositions = generateScatterPositions(FILE_DEFS.length);
    createFileCards();
    layoutStacked();
    showHint();

    filesContainer.addEventListener('click', handleStageClick);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
