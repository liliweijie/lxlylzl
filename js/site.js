/* ==========================================================================
   liweijie — static MPA runtime (no dependencies, no build step)
   Port of the React DollyProvider / NextPeekRail / PullIndicator behavior to
   plain multi-page navigation with Cross-Document View Transitions.
   ========================================================================== */
(function () {
  'use strict';

  /* ---------- frames (the 4-frame film loop) ---------- */
  var FRAMES = [
    { path: 'index.html', cn: '首页', en: 'HOME' },
    { path: 'works.html', cn: '作品', en: 'WORKS' },
    { path: 'about.html', cn: '关于', en: 'ABOUT' },
    { path: 'notes.html', cn: '碎碎念', en: 'NOTES' },
  ];
  var PAGE = parseInt(document.body.getAttribute('data-page') || '0', 10) || 0;
  var NEXT = FRAMES[(PAGE + 1) % 4];
  var PREV = FRAMES[(PAGE + 3) % 4];

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var coarse = window.matchMedia('(pointer: coarse)').matches;
  if (!reduced) document.documentElement.classList.add('js-motion');

  var NAV_KEY = 'lx:nav';
  var WORK_KEY = 'dolly:work-target';
  var CMS_TIMEOUT = 1500; // CMS fetch 超时:超时后保留静态 HTML 回退

  /* transition lock + trigger suppression (work overlay / rewind) */
  var locked = false;
  var suppressed = false;

  function setNavFlag(dir) {
    try {
      sessionStorage.setItem(NAV_KEY, JSON.stringify({ dir: dir, ts: Date.now() }));
    } catch (e) { /* ignore */ }
  }

  function lock(ms) {
    locked = true;
    window.setTimeout(function () { locked = false; }, ms || 1100);
  }

  function goTo(i) {
    var t = ((i % 4) + 4) % 4;
    if (t === PAGE || locked) return;
    var fwd = (t - PAGE + 4) % 4;
    var dir = fwd <= 2 ? 1 : -1;
    lock();
    setNavFlag(dir);
    window.location.href = FRAMES[t].path;
  }
  function goNext() { goTo(PAGE + 1); }
  function goPrev() { goTo(PAGE - 1); }

  /* ---------- incoming navigation: VT or fade/slide fallback ---------- */
  (function incoming() {
    var navDir = document.documentElement.getAttribute('data-nav-dir');
    var flag = null;
    try {
      flag = JSON.parse(sessionStorage.getItem(NAV_KEY) || 'null');
    } catch (e) { /* ignore */ }
    // consume the flag so plain refreshes / external entries never animate
    try { sessionStorage.removeItem(NAV_KEY); } catch (e) { /* ignore */ }
    if (!flag || Date.now() - flag.ts >= 8000) {
      document.documentElement.removeAttribute('data-nav-dir');
      return;
    }
    if (!navDir) document.documentElement.setAttribute('data-nav-dir', String(flag.dir));

    // If the browser ran a cross-document view transition, pagereveal carries
    // it — nothing else to do (CSS styles ::view-transition-* via data-nav-dir).
    var vtRan = false;
    window.addEventListener('pagereveal', function (e) {
      if (e.viewTransition) vtRan = true;
    });
    // pagereveal fires before first rAF; decide the fallback after it had its chance
    window.requestAnimationFrame(function () {
      window.requestAnimationFrame(function () {
        if (!vtRan && !reduced) {
          document.documentElement.classList.add('fallback-enter');
          window.setTimeout(function () {
            document.documentElement.classList.remove('fallback-enter');
          }, 900);
        }
      });
    });
    // bfcache restore: strip any leftover state
    window.addEventListener('pageshow', function (e) {
      if (e.persisted) document.documentElement.classList.remove('fallback-enter');
    });
  })();

  /* ---------- nav pill / internal .html links: hand direction over ---------- */
  function frameIndexOfHref(href) {
    if (!href) return -1;
    var base = href.split('#')[0].split('?')[0];
    var name = base.substring(base.lastIndexOf('/') + 1);
    if (name === '' || name === '/') name = 'index.html';
    for (var i = 0; i < FRAMES.length; i++) if (FRAMES[i].path === name) return i;
    return -1;
  }
  document.addEventListener('click', function (e) {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    var a = e.target && e.target.closest ? e.target.closest('a[href]') : null;
    if (!a || a.target === '_blank' || a.hasAttribute('download')) return;
    var href = a.getAttribute('href');
    if (/^(mailto:|tel:|https?:|javascript:)/i.test(href)) return;
    var to = frameIndexOfHref(href);
    if (to === -1 || to === PAGE) return;
    var fwd = (to - PAGE + 4) % 4;
    setNavFlag(fwd <= 2 ? 1 : -1);
    // default navigation proceeds — relative .html link, no SPA fallback needed
    var work = a.getAttribute('data-work-target');
    if (work) {
      try { sessionStorage.setItem(WORK_KEY, work); } catch (err) { /* ignore */ }
    }
  });

  /* ---------- barcode generator (mulberry32, design.md §7) ---------- */
  function mulberry32(seed) {
    var a = seed >>> 0;
    return function () {
      a |= 0; a = (a + 0x6d2b79f5) | 0;
      var t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  function renderBarcodes() {
    var nodes = document.querySelectorAll('[data-barcode]');
    for (var n = 0; n < nodes.length; n++) {
      var el = nodes[n];
      var parts = (el.getAttribute('data-barcode') || '').split(',');
      var seed = parseInt(parts[0] || '7', 10);
      var bars = parseInt(parts[1] || '48', 10);
      var height = parseInt(parts[2] || '40', 10);
      var label = parts[3] || el.getAttribute('data-barcode-label') || '';
      var rng = mulberry32(seed);
      var x = 0;
      var rects = '';
      var widths = [2, 2, 3, 3, 4, 6];
      for (var i = 0; i < bars; i++) {
        var w = widths[Math.floor(rng() * 6)];
        if (rng() < 0.72) {
          rects += '<rect x="' + x + '" y="0" width="' + w + '" height="' + height + '" fill="currentColor"/>';
        }
        x += w + 2 + Math.floor(rng() * 3);
      }
      el.classList.add('barcode');
      el.innerHTML =
        '<svg width="' + x + '" height="' + height + '" viewBox="0 0 ' + x + ' ' + height + '" aria-hidden="true">' + rects + '</svg>' +
        (label ? '<span class="barcode__label">' + label + '</span>' : '');
    }
  }

  /* ---------- shared pull-charge state ---------- */
  var rail = document.querySelector('.peek-rail');
  var railPct = rail ? rail.querySelector('.peek-rail__pct') : null;
  var railWash = rail ? rail.querySelector('.peek-rail__wash') : null;
  var indicator = document.querySelector('.pull-indicator');
  var indRing = indicator ? indicator.querySelector('.pull-indicator__ring') : null;
  var indLabel = indicator ? indicator.querySelector('.pull-indicator__label') : null;
  var indPct = indicator ? indicator.querySelector('.pull-indicator__pct') : null;
  var peek = document.querySelector('.pull-peek');
  var peekPct = peek ? peek.querySelector('.pull-peek__pct') : null;
  var RING_C = 2 * Math.PI * 11;
  var IDLE_W = 56;
  var RIGHT_OFFSET = 12;

  var pullProgress = 0; // 0..1
  var pullDir = 0; // 1 next, -1 prev, 0 idle

  function chargeTo(p, dir) {
    pullProgress = p;
    pullDir = p > 0 ? dir : 0;
    var pullingNext = pullDir === 1 && p > 0;
    var pullingPrev = pullDir === -1 && p > 0;

    if (rail) {
      var charge = pullingNext ? 0.2 + 0.8 * p : 0.2;
      var width = IDLE_W + ((charge - 0.2) / 0.8) * (window.innerWidth - RIGHT_OFFSET - IDLE_W);
      rail.style.width = width + 'px';
      rail.classList.toggle('is-pulling', pullingNext);
      if (railPct) railPct.textContent = Math.round(charge * 100) + '%';
      if (railWash) {
        railWash.style.opacity = pullingNext ? Math.min(1, Math.max(0, (p - 0.35) / 0.4)) : 0;
      }
    }
    if (peek) {
      var pw = pullingPrev ? Math.max(p * 18, 4) : 0;
      peek.style.width = pw + 'vw';
      peek.classList.toggle('is-visible', pullingPrev && p > 0.02);
      if (peekPct) peekPct.textContent = Math.round(p * 100) + '%';
    }
    if (indicator) {
      if (indRing) indRing.style.strokeDashoffset = String(RING_C * (1 - p));
      if (indPct) indPct.textContent = Math.round(p * 100) + '%';
      var backward = pullDir === -1;
      var target = backward ? PREV : NEXT;
      if (indLabel) {
        indLabel.textContent = coarse
          ? (backward ? '继续下拉 · 回到' + target.cn + ' ↓' : '继续上滑 · 进入' + target.cn + ' ↑')
          : (backward ? '继续上滑 · 回到' + target.cn + ' ←' : '继续下滑 · 进入' + target.cn + ' →');
      }
      updateIndicatorVisibility();
    }
  }

  var canPull = true;
  var nearTail = false;
  function measure() {
    var doc = document.documentElement;
    canPull = doc.scrollHeight > window.innerHeight + 16;
    nearTail = doc.scrollHeight - (window.scrollY + window.innerHeight) < 200;
    if (rail) rail.classList.toggle('is-idle-short', !canPull);
    updateIndicatorVisibility();
  }
  function updateIndicatorVisibility() {
    if (!indicator) return;
    var visible = canPull && (nearTail || pullProgress > 0.02);
    indicator.classList.toggle('is-visible', visible);
  }
  window.addEventListener('scroll', measure, { passive: true });
  window.addEventListener('resize', measure);
  if (window.ResizeObserver) {
    new ResizeObserver(measure).observe(document.body);
  }

  /* ---------- trigger 1: wheel overscroll pull (genuine edges only) ---------- */
  if (!reduced) {
    var W_THRESHOLD = 320;
    var wCharge = 0;
    var wEdge = 0;
    window.addEventListener('wheel', function (e) {
      if (locked || suppressed || e.ctrlKey) return;
      var doc = document.documentElement;
      if (doc.scrollHeight <= window.innerHeight + 16) return;
      var atBottom = window.innerHeight + window.scrollY >= doc.scrollHeight - 8;
      var atTop = window.scrollY <= 2;
      if (e.deltaY > 0 && atBottom) {
        wEdge = 1;
        wCharge = Math.min(W_THRESHOLD, wCharge + e.deltaY);
      } else if (e.deltaY < 0 && atTop) {
        wEdge = -1;
        wCharge = Math.min(W_THRESHOLD, wCharge - e.deltaY);
      } else {
        // not at the matching edge (or rolling back): decay, never navigate
        wCharge = Math.max(0, wCharge - Math.abs(e.deltaY) * 1.5);
        if (wCharge === 0) wEdge = 0;
      }
      var p = Math.min(1, wCharge / W_THRESHOLD);
      chargeTo(p, wEdge);
      if (p >= 1) {
        var dir = wEdge;
        wCharge = 0; wEdge = 0;
        chargeTo(0, 0);
        if (dir === 1) goNext();
        else if (dir === -1) goPrev();
      }
    }, { passive: true });
  }

  /* ---------- trigger 2: mouse/pen horizontal drag (touch excluded — the
     browser owns touch gestures; audit B3) ---------- */
  if (!reduced) {
    var sx = 0, sy = 0, dragging = false, dragActive = false;
    var dragReset = function () {
      if (dragging && dragActive) chargeTo(0, 0);
      dragging = false;
      dragActive = false;
    };
    window.addEventListener('pointerdown', function (e) {
      if (locked || suppressed || e.button !== 0) return;
      if (e.pointerType === 'touch') return;
      if (e.isPrimary === false) return;
      var el = e.target;
      if (el && el.closest && el.closest('a, button, input, textarea, select, label, [role="button"], [data-no-dolly]')) return;
      if (window.getSelection() && window.getSelection().toString()) return;
      sx = e.clientX; sy = e.clientY;
      dragging = true; dragActive = false;
    });
    window.addEventListener('pointermove', function (e) {
      if (!dragging || locked || suppressed || e.isPrimary === false) return;
      var dx = e.clientX - sx;
      var dy = e.clientY - sy;
      if (!dragActive && Math.abs(dx) > 12 && Math.abs(dx) > Math.abs(dy)) dragActive = true;
      if (dragActive) chargeTo(Math.min(1, Math.abs(dx) / 280), dx < 0 ? 1 : -1);
    });
    window.addEventListener('pointerup', function (e) {
      if (!dragging) return;
      dragging = false;
      if (dragActive) {
        var dx = e.clientX - sx;
        chargeTo(0, 0);
        dragActive = false;
        if (dx < -120) goNext();
        else if (dx > 120) goPrev();
      }
    });
    window.addEventListener('pointercancel', dragReset);
    window.addEventListener('lostpointercapture', dragReset);
  }

  /* ---------- trigger 5: touch overscroll pull (coarse pointers, passive,
     overscroll-behavior contains native pull-to-refresh instead of
     hijacking with preventDefault) ---------- */
  if (!reduced && coarse) {
    var T_DAMPING = 0.6;
    var T_THRESHOLD = 320;
    var root = document.documentElement;
    var prevOverscroll = root.style.overscrollBehaviorY;
    root.style.overscrollBehaviorY = 'contain';
    var tStartY = 0, tEdge = 0, tTracking = false, tCharge = 0;

    var edgeNow = function () {
      var doc = document.documentElement;
      if (window.innerHeight + window.scrollY >= doc.scrollHeight - 8) return 1;
      if (window.scrollY <= 2) return -1;
      return 0;
    };
    var tReset = function () {
      tTracking = false; tEdge = 0;
      if (tCharge > 0) { tCharge = 0; chargeTo(0, 0); }
    };
    window.addEventListener('touchstart', function (e) {
      tReset();
      if (locked || suppressed) return;
      if (e.touches.length !== 1) return;
      var el = e.target;
      if (el && el.closest && el.closest('a, button, input, textarea, select, label, [role="button"], [contenteditable], [data-no-dolly]')) return;
      var doc = document.documentElement;
      if (doc.scrollHeight <= window.innerHeight + 16) return;
      var at = edgeNow();
      if (at === 0) return;
      tStartY = e.touches[0].clientY;
      tEdge = at;
      tTracking = true;
    }, { passive: true });
    window.addEventListener('touchmove', function (e) {
      if (!tTracking) return;
      if (locked || suppressed || e.touches.length !== 1) { tReset(); return; }
      if (edgeNow() !== tEdge) { tReset(); return; } // browser owns this gesture
      var dy = e.touches[0].clientY - tStartY;
      var raw = tEdge === 1 ? -dy : dy;
      tCharge = Math.max(0, raw * T_DAMPING);
      var p = Math.min(1, tCharge / T_THRESHOLD);
      chargeTo(p, tEdge);
      if (p >= 1) {
        var dir = tEdge;
        tReset();
        if (dir === 1) goNext(); else goPrev();
      }
    }, { passive: true });
    window.addEventListener('touchend', tReset, { passive: true });
    window.addEventListener('touchcancel', tReset, { passive: true });
    window.addEventListener('pagehide', function () {
      root.style.overscrollBehaviorY = prevOverscroll;
    });
  }

  /* ---------- trigger 4: keyboard (edges only for ↑/↓/PgUp/PgDn; audit B12) ---------- */
  window.addEventListener('keydown', function (e) {
    if (e.repeat || locked || suppressed) return;
    var el = e.target;
    if (el && (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.tagName === 'SELECT' || el.isContentEditable)) return;
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    var doc = document.documentElement;
    var atBottom = window.innerHeight + window.scrollY >= doc.scrollHeight - 8;
    var atTop = window.scrollY <= 2;
    if (e.key === 'ArrowRight' || ((e.key === 'ArrowDown' || e.key === 'PageDown') && atBottom)) {
      e.preventDefault();
      goNext();
    } else if (e.key === 'ArrowLeft' || ((e.key === 'ArrowUp' || e.key === 'PageUp') && atTop)) {
      e.preventDefault();
      goPrev();
    } else if (e.key >= '1' && e.key <= '4') {
      goTo(Number(e.key) - 1);
    }
  });

  /* ---------- navbar: scrolled state + theme toggle ---------- */
  var nav = document.querySelector('.nav');
  function onScrollNav() {
    if (nav) nav.classList.toggle('is-scrolled', window.scrollY > 40);
  }
  window.addEventListener('scroll', onScrollNav, { passive: true });
  onScrollNav();

  var themeBtn = document.querySelector('.nav__theme');
  if (themeBtn) {
    themeBtn.addEventListener('click', function () {
      var light = document.documentElement.classList.toggle('light');
      try { localStorage.setItem('lx:theme', light ? 'light' : 'dark'); } catch (e) { /* ignore */ }
    });
  }

  /* ---------- ink cursor (pointer:fine) ---------- */
  if (!reduced && window.matchMedia('(pointer: fine)').matches) {
    var dot = document.createElement('div');
    var ring = document.createElement('div');
    dot.className = 'ink-cursor__dot';
    ring.className = 'ink-cursor__ring';
    dot.setAttribute('aria-hidden', 'true');
    ring.setAttribute('aria-hidden', 'true');
    document.body.appendChild(dot);
    document.body.appendChild(ring);
    document.documentElement.classList.add('has-cursor');
    var mx = -100, my = -100, rx = -100, ry = -100, cursorOn = false;
    window.addEventListener('pointermove', function (e) {
      if (e.pointerType === 'touch') return;
      mx = e.clientX; my = e.clientY; cursorOn = true;
    }, { passive: true });
    document.addEventListener('pointerover', function (e) {
      var el = e.target;
      var hoverable = el && el.closest && el.closest('a, button, [role="button"], .work-card, .wcard');
      ring.classList.toggle('is-hover', !!hoverable);
    });
    (function cursorLoop() {
      rx += (mx - rx) * 0.15;
      ry += (my - ry) * 0.15;
      dot.style.transform = 'translate(' + (mx - 5) + 'px,' + (my - 5) + 'px)';
      var half = ring.classList.contains('is-hover') ? 28 : 14;
      ring.style.transform = 'translate(' + (rx - half) + 'px,' + (ry - half) + 'px)';
      window.requestAnimationFrame(cursorLoop);
    })();
  }

  /* ---------- reveal on scroll ---------- */
  if (!reduced && 'IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add('in');
          io.unobserve(en.target);
        }
      });
    }, { rootMargin: '0px 0px -12% 0px' });
    var rvNodes = document.querySelectorAll('.rv, .rv-line, .manifesto');
    for (var r = 0; r < rvNodes.length; r++) io.observe(rvNodes[r]);
  } else {
    var all = document.querySelectorAll('.rv, .rv-line, .manifesto');
    for (var r2 = 0; r2 < all.length; r2++) all[r2].classList.add('in');
  }

  /* ---------- home: works-rail progress + hero particles ---------- */
  var wrailTrack = document.querySelector('.wrail__track');
  var wrailBar = document.querySelector('.wrail__bar');
  if (wrailTrack && wrailBar) {
    var onRailScroll = function () {
      var max = wrailTrack.scrollWidth - wrailTrack.clientWidth;
      wrailBar.style.transform = 'scaleX(' + (max > 0 ? wrailTrack.scrollLeft / max : 1) + ')';
    };
    wrailTrack.addEventListener('scroll', onRailScroll, { passive: true });
    onRailScroll();
  }

  var heroCanvas = document.querySelector('.hero__red canvas');
  if (heroCanvas && !reduced) {
    try {
      var ctx = heroCanvas.getContext('2d');
      var dpr = Math.min(window.devicePixelRatio || 1, 2);
      var parts = [];
      var N = 42;
      var resize = function () {
        var box = heroCanvas.parentElement.getBoundingClientRect();
        heroCanvas.width = Math.max(1, box.width * dpr);
        heroCanvas.height = Math.max(1, box.height * dpr);
      };
      resize();
      window.addEventListener('resize', resize);
      for (var pi = 0; pi < N; pi++) {
        parts.push({
          x: Math.random(), y: Math.random(),
          vx: (Math.random() - 0.5) * 0.0011, vy: (Math.random() - 0.5) * 0.0011,
          s: 1.5 + Math.random() * 4,
          o: 0.25 + Math.random() * 0.6,
        });
      }
      var heroVisible = true;
      document.addEventListener('visibilitychange', function () {
        heroVisible = document.visibilityState === 'visible';
      });
      (function particleLoop() {
        window.requestAnimationFrame(particleLoop);
        if (!heroVisible || !ctx) return;
        var W = heroCanvas.width, H = heroCanvas.height;
        ctx.clearRect(0, 0, W, H);
        for (var i = 0; i < N; i++) {
          var p = parts[i];
          p.x = (p.x + p.vx + 1) % 1;
          p.y = (p.y + p.vy + 1) % 1;
          ctx.globalAlpha = p.o;
          ctx.fillStyle = i % 5 === 0 ? '#f4f1ea' : '#a91e14';
          ctx.fillRect(p.x * W, p.y * H, p.s * dpr, p.s * dpr);
        }
        ctx.globalAlpha = 1;
      })();
    } catch (e) { /* canvas unavailable — gradient block still shows */ }
  }

  /* ========================================================================
     works page: filters (same-document view transition) + detail overlay +
     homepage handoff (scroll-park + red locating flash)
     ======================================================================== */
  function initWorksPage() {
    var filterBtns = document.querySelectorAll('.filter-btn');
    var cards = Array.prototype.slice.call(document.querySelectorAll('.work-card'));

    function applyFilter(key) {
      for (var i = 0; i < filterBtns.length; i++) {
        filterBtns[i].setAttribute('aria-pressed', filterBtns[i].getAttribute('data-filter') === key ? 'true' : 'false');
      }
      for (var j = 0; j < cards.length; j++) {
        var cats = (cards[j].getAttribute('data-cats') || '').split(' ');
        var show = key === 'all' || cats.indexOf(key) !== -1;
        cards[j].style.display = show ? '' : 'none';
      }
    }
    function setFilter(key) {
      if (!reduced && document.startViewTransition) {
        document.startViewTransition(function () { applyFilter(key); });
      } else {
        applyFilter(key);
      }
    }
    for (var fb = 0; fb < filterBtns.length; fb++) {
      filterBtns[fb].addEventListener('click', function () {
        setFilter(this.getAttribute('data-filter'));
      });
    }

    /* --- detail overlay --- */
    var overlay = document.querySelector('.work-overlay');
    if (overlay) {
      var ovCover = overlay.querySelector('.work-overlay__cover');
      var ovNo = overlay.querySelector('.work-overlay__no');
      var ovTitle = overlay.querySelector('.work-overlay__title');
      var ovTags = overlay.querySelector('.work-overlay__tags');
      var ovDl = overlay.querySelector('.work-overlay__dl');
      var ovDesc = overlay.querySelector('.work-overlay__desc');
      var ovCount = overlay.querySelector('.work-overlay__nav .count');
      var total = cards.length;
      var current = -1;

      function fillOverlay(card) {
        var vid = card.querySelector('video');
        var img = card.querySelector('img');
        var ph = card.querySelector('.cover-ph');
        ovCover.textContent = '';
        if (vid) {
          var v = document.createElement('video');
          v.src = vid.currentSrc || vid.src;
          if (vid.poster) v.poster = vid.poster;
          v.controls = true;
          v.loop = true;
          v.muted = true;
          v.playsInline = true;
          v.setAttribute('playsinline', '');
          if (!reduced) v.autoplay = true;
          ovCover.appendChild(v);
        } else if (img) {
          var c = document.createElement('img');
          c.src = img.currentSrc || img.src;
          c.alt = img.alt;
          c.width = 960; c.height = 1200;
          ovCover.appendChild(c);
        } else if (ph) {
          var p = ph.cloneNode(true);
          ovCover.appendChild(p);
        }
        var idx = cards.indexOf(card);
        var num = String(idx + 1).padStart(2, '0');
        var tot = String(total).padStart(2, '0');
        ovNo.textContent = 'WORK ' + num + ' / ' + tot;
        ovCount.textContent = num + ' / ' + tot;
        ovTitle.textContent = card.getAttribute('data-title') || '';
        ovTags.innerHTML = '';
        (card.getAttribute('data-tags') || '').split('+').forEach(function (t) {
          t = t.trim();
          if (!t) return;
          var s = document.createElement('span');
          s.textContent = t;
          ovTags.appendChild(s);
        });
        // DOM 构建(不拼 innerHTML):data-* 可能来自后台 JSON,一律按纯文本处理
        ovDl.textContent = '';
        [['ROLE:', 'data-role'], ['YEAR:', 'data-year'], ['DELIVERABLES:', 'data-deliverables']].forEach(function (pair) {
          var row = document.createElement('div');
          var dt = document.createElement('dt');
          dt.textContent = pair[0];
          var dd = document.createElement('dd');
          dd.textContent = card.getAttribute(pair[1]) || '';
          row.appendChild(dt);
          row.appendChild(dd);
          ovDl.appendChild(row);
        });
        ovDesc.textContent = card.getAttribute('data-desc') || '';
      }
      function openOverlay(card) {
        current = cards.indexOf(card);
        fillOverlay(card);
        overlay.classList.add('is-open');
        document.body.style.overflow = 'hidden';
        suppressed = true; // keep dolly triggers quiet behind the overlay
        var closeBtn = overlay.querySelector('.work-overlay__close');
        if (closeBtn) closeBtn.focus();
      }
      function closeOverlay() {
        overlay.classList.remove('is-open');
        document.body.style.overflow = '';
        suppressed = false;
        current = -1;
        ovCover.textContent = ''; // 停掉并释放详情浮层里的视频
      }
      function stepOverlay(d) {
        if (current === -1) return;
        current = (current + d + total) % total;
        fillOverlay(cards[current]);
      }
      cards.forEach(function (card) {
        card.addEventListener('click', function () { openOverlay(card); });
      });
      overlay.querySelector('.work-overlay__close').addEventListener('click', closeOverlay);
      overlay.querySelector('.work-overlay__backdrop').addEventListener('click', closeOverlay);
      // audit B7: clicks on empty surround (the scroll container itself) close
      overlay.querySelector('.work-overlay__scroll').addEventListener('click', function (e) {
        if (e.target === e.currentTarget) closeOverlay();
      });
      overlay.querySelector('[data-nav="-1"]').addEventListener('click', function () { stepOverlay(-1); });
      overlay.querySelector('[data-nav="1"]').addEventListener('click', function () { stepOverlay(1); });
      // capture phase: Esc closes, ←/→ navigate, swallow dolly keys
      window.addEventListener('keydown', function (e) {
        if (current === -1) return;
        if (e.key === 'Escape') { e.stopPropagation(); closeOverlay(); }
        else if (e.key === 'ArrowRight') { e.stopPropagation(); e.preventDefault(); stepOverlay(1); }
        else if (e.key === 'ArrowLeft') { e.stopPropagation(); e.preventDefault(); stepOverlay(-1); }
        else if (['ArrowDown', 'ArrowUp', 'PageDown', 'PageUp', '1', '2', '3', '4'].indexOf(e.key) !== -1) {
          e.stopPropagation();
        }
      }, true);
    }

    /* --- homepage handoff: sessionStorage target → scroll-park + flash --- */
    var handoff = null;
    try {
      handoff = sessionStorage.getItem(WORK_KEY);
      if (handoff) sessionStorage.removeItem(WORK_KEY);
    } catch (e) { /* ignore */ }
    if (handoff) {
      var target = document.querySelector('[data-work-id="' + handoff + '"]');
      if (target) {
        var cancelled = false;
        var run = function () {
          var imgs = Array.prototype.slice.call(document.querySelectorAll('.work-card img'));
          var waits = imgs.map(function (img) {
            return img.complete ? Promise.resolve() : img.decode().catch(function () { });
          });
          if (document.fonts && document.fonts.ready) waits.push(document.fonts.ready);
          Promise.race([
            Promise.allSettled(waits),
            new Promise(function (r) { window.setTimeout(r, 2500); }),
          ]).then(function () {
            if (cancelled) return;
            window.requestAnimationFrame(function () {
              window.requestAnimationFrame(function () {
                if (cancelled) return;
                var top = target.getBoundingClientRect().top + window.scrollY - window.innerHeight / 3;
                window.scrollTo({ top: Math.max(0, top), behavior: reduced ? 'auto' : 'smooth' });
                window.setTimeout(function () {
                  if (cancelled) return;
                  target.classList.add('flash');
                  window.setTimeout(function () { target.classList.remove('flash'); }, 1200);
                }, reduced ? 100 : 1000);
              });
            });
          });
        };
        run();
        window.addEventListener('pagehide', function () { cancelled = true; });
      }
    }
  }

  // 作品页:先拉后台内容渲染卡片/筛选(失败或超时保留静态 HTML),
  // 渲染完成后再初始化 filters / overlay / homepage handoff
  if (PAGE === 1) {
    cmsFetch('works', function (d) {
      if (d && typeof d === 'object') applyWorksData(d);
      initWorksPage();
    });
  }

  /* ========================================================================
     about page: wechat copy + toast
     ======================================================================== */
  if (PAGE === 2) {
    var wechatBtn = document.querySelector('[data-copy-wechat]');
    var toast = document.querySelector('.toast');
    if (wechatBtn && toast) {
      var toastTimer = 0;
      wechatBtn.addEventListener('click', function () {
        try {
          var wx = wechatBtn.getAttribute('data-wechat') || 'lxlylzl';
          if (navigator.clipboard) navigator.clipboard.writeText(wx).catch(function () { });
        } catch (e) { /* ignore */ }
        toast.classList.add('is-on');
        window.clearTimeout(toastTimer);
        toastTimer = window.setTimeout(function () { toast.classList.remove('is-on'); }, 2000);
      });
    }
  }

  /* ========================================================================
     notes page: floating fragments (localStorage demo) + REWIND
     ======================================================================== */
  if (PAGE === 3) {
    var STORAGE_KEY = 'lx:notes:messages';
    var DEFAULT_SEEDS = [
      { text: 'ai 盛行之后,大片平面设计师沦为美工', ts: '07.12', mine: true },
      { text: 'ai 在让人类变蠢～或者说 ai 在让人类两极分化…', ts: '07.15', mine: true },
      { text: '2026.07.17 - 碎碎念!上线!', ts: '07.17', mine: true },
      { text: '不确定唯一,争议和多元解读。', ts: '07.20', mine: true },
      { text: '这个过渡好丝滑,怎么做到的?', ts: '07.21' },
      { text: '从首页滑过来的那一刻我惊了', ts: '07.22' },
      { text: '档期票的设计偷了(不是', ts: '07.23' },
    ];
    var SLOTS = [
      [4, 6], [30, 4], [58, 8], [80, 5],
      [9, 30], [40, 26], [68, 30], [84, 38],
      [3, 56], [26, 62], [55, 55], [78, 60],
      [14, 82], [46, 80], [72, 82], [88, 12],
    ];
    var board = document.querySelector('.frag-board');
    var input = document.querySelector('.notes-input__box input');
    var sendBtn = document.querySelector('.notes-input__send');

    function rand(min, max) { return min + Math.random() * (max - min); }
    function stamp(d) {
      return String(d.getMonth() + 1).padStart(2, '0') + '.' + String(d.getDate()).padStart(2, '0');
    }
    // audit B8: never fewer slots than fragments — cycle with jitter
    function takeSlots(n) {
      var pool = SLOTS.slice();
      for (var i = pool.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var t = pool[i]; pool[i] = pool[j]; pool[j] = t;
      }
      var clamp = function (v, max) { return Math.min(max, Math.max(0, v)); };
      while (pool.length < n) {
        var s = SLOTS[pool.length % SLOTS.length];
        pool.push([clamp(s[0] + rand(-4, 4), 90), clamp(s[1] + rand(-4, 4), 86)]);
      }
      return pool.slice(0, n);
    }
    function loadGuests() {
      try {
        var raw = localStorage.getItem(STORAGE_KEY);
        if (raw) {
          var arr = JSON.parse(raw);
          if (Array.isArray(arr)) return arr.filter(function (m) { return m && typeof m.text === 'string'; });
        }
      } catch (e) { /* ignore */ }
      return [];
    }
    function saveGuests(guests) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(guests.slice(-40)));
      } catch (e) { /* ignore */ }
    }
    function makeFrag(seed, slot, fresh) {
      var el = document.createElement('div');
      el.className = 'frag' + (seed.mine ? ' mine' : '') + (fresh ? ' fresh' : '');
      el.style.left = slot[0] + '%';
      el.style.top = slot[1] + '%';
      var drift = document.createElement('div');
      drift.className = 'frag__drift';
      drift.style.setProperty('--dur', rand(5, 9).toFixed(2) + 's');
      drift.style.setProperty('--dx', rand(6, 10).toFixed(1) + 'px');
      drift.style.setProperty('--dy', rand(9, 14).toFixed(1) + 'px');
      var inner = document.createElement('div');
      inner.className = 'frag__float';
      inner.style.setProperty('--rot', rand(-2, 2).toFixed(1) + 'deg');
      if (seed.mine) {
        var me = document.createElement('p');
        me.className = 'me';
        me.textContent = '✳ ME';
        inner.appendChild(me);
      }
      var txt = document.createElement('p');
      txt.className = 'txt';
      txt.textContent = seed.text;
      var ts = document.createElement('p');
      ts.className = 'ts';
      ts.textContent = seed.ts;
      inner.appendChild(txt);
      inner.appendChild(ts);
      drift.appendChild(inner);
      el.appendChild(drift);
      return el;
    }

    function renderBoard(seeds, guests) {
      if (!board) return;
      board.textContent = '';
      var all = seeds.concat(guests);
      var slots = takeSlots(all.length);
      all.forEach(function (s, i) {
        board.appendChild(makeFrag(s, slots[i], false));
      });
    }
    function appendFresh(msg) {
      if (!board) return;
      var slot = SLOTS[Math.floor(Math.random() * SLOTS.length)];
      board.appendChild(makeFrag(msg, [slot[0] + rand(-3, 3), slot[1] + rand(-3, 3)], true));
    }
    function readInput() {
      if (!input) return '';
      return input.value.trim().slice(0, 80);
    }
    function bindPost(post) {
      if (sendBtn) sendBtn.addEventListener('click', post);
      if (input) {
        input.addEventListener('keydown', function (e) {
          if (e.key === 'Enter') { e.stopPropagation(); post(); }
        });
      }
    }

    // 公开留言:优先 GET /api/notes,发布 POST /api/notes;
    // API 失败(超时/非 2xx)时回退到 localStorage demo 行为
    function initNotesBoard(seeds) {
      fetchWithTimeout('/api/notes', CMS_TIMEOUT, function (list) {
        if (list && Array.isArray(list)) {
          var apiGuests = list.map(function (n) {
            if (!n || typeof n.content !== 'string') return null;
            return { text: n.content, ts: n.ts ? stamp(new Date(Number(n.ts))) : '', mine: false };
          }).filter(Boolean);
          renderBoard(seeds, apiGuests);
          bindPost(function () {
            var text = readInput();
            if (!text) return;
            fetch('/api/notes', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ content: text })
            }).then(function (r) {
              if (!r.ok) throw new Error('http_' + r.status);
              return r.json();
            }).then(function () {
              appendFresh({ text: text, ts: stamp(new Date()) });
              if (input) { input.value = ''; input.focus(); }
            }).catch(function () {
              if (input) input.setAttribute('placeholder', '发布失败,请稍后再试');
            });
          });
          return;
        }
        // ---- 回退:localStorage demo ----
        var guests = loadGuests();
        renderBoard(seeds, guests);
        bindPost(function () {
          var text = readInput();
          if (!text) return;
          var msg = { text: text, ts: stamp(new Date()) };
          guests.push(msg);
          saveGuests(guests);
          appendFresh(msg);
          if (input) { input.value = ''; input.focus(); }
        });
      });
    }

    /* REWIND easter egg: 04→01 counter flash, then back to index.html */
    var rewindBtn = document.querySelector('.rewind__btn');
    var rewindOverlay = document.querySelector('.rewind-overlay');
    if (rewindBtn && rewindOverlay) {
      var counter = rewindOverlay.querySelector('.rewind-overlay__counter');
      var rewinding = false;
      rewindBtn.addEventListener('click', function () {
        if (rewinding) return;
        rewinding = true;
        suppressed = true;
        if (reduced) {
          setNavFlag(-1);
          window.location.href = 'index.html';
          return;
        }
        rewindOverlay.classList.add('is-on');
        var steps = ['04', '03', '02', '01'];
        var step = 0;
        counter.textContent = steps[0];
        var iv = window.setInterval(function () {
          step = Math.min(step + 1, steps.length - 1);
          counter.textContent = steps[step];
        }, 300);
        window.setTimeout(function () {
          window.clearInterval(iv);
          setNavFlag(-1);
          window.location.href = 'index.html';
        }, 1200);
      });
    }

    // 后台内容:heading/seeds/notice/REWIND 文案(失败或超时保留静态 HTML),
    // 然后初始化留言板
    cmsFetch('notes', function (d) {
      var seeds = DEFAULT_SEEDS;
      if (d && typeof d === 'object') {
        applyNotes(d);
        if (Array.isArray(d.seeds)) {
          var clean = d.seeds.filter(function (s) { return s && typeof s.text === 'string'; });
          if (clean.length) seeds = clean;
        }
      }
      initNotesBoard(seeds);
    });
  }

  /* ========================================================================
     home page: service row → preselect CTA subject + jump to the ticket
     ======================================================================== */
  if (PAGE === 0) {
    var ctaMail = document.getElementById('cta-mail');
    var rows = document.querySelectorAll('.service-row[data-service-subject]');
    for (var sr = 0; sr < rows.length; sr++) {
      rows[sr].addEventListener('click', function () {
        var subject = this.getAttribute('data-service-subject');
        if (ctaMail && subject) {
          var current = ctaMail.getAttribute('href') || 'mailto:hello@lxlylzl.xyz';
          var email = current.replace(/^mailto:/i, '').split('?')[0] || 'hello@lxlylzl.xyz';
          ctaMail.setAttribute('href', 'mailto:' + email + '?subject=' + encodeURIComponent(subject));
        }
        var target = document.getElementById('availability');
        if (target) target.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
      });
    }
  }

  /* ========================================================================
     CMS loader:启动时 fetch /api/content?page=<当前页>(1.5s 超时),
     成功后把内容应用到当前页;失败/超时保留静态 HTML。
     安全:所有动态文本一律 textContent / setAttribute,禁止 innerHTML 注入。
     ======================================================================== */
  function isArr(v) { return Array.isArray(v); }
  function qs(sel, root) { return (root || document).querySelector(sel); }
  function qsa(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
  function setText(el, v) { if (el && typeof v === 'string') el.textContent = v; }

  function fetchWithTimeout(url, ms, cb) {
    var done = false;
    function finish(v) {
      if (done) return;
      done = true;
      cb(v);
    }
    var timer = window.setTimeout(function () { finish(null); }, ms);
    try {
      fetch(url).then(function (r) {
        if (!r.ok) throw new Error('http_' + r.status);
        return r.json();
      }).then(function (d) {
        window.clearTimeout(timer);
        finish(d);
      }).catch(function () {
        window.clearTimeout(timer);
        finish(null);
      });
    } catch (e) {
      window.clearTimeout(timer);
      finish(null);
    }
  }
  function cmsFetch(page, cb) {
    fetchWithTimeout('/api/content?page=' + encodeURIComponent(page), CMS_TIMEOUT, cb);
  }

  var cmsFooterApplied = false;
  function applyMarqueeFooter(d) {
    if (typeof d.marquee === 'string' && d.marquee) {
      var txt = d.marquee + ' ' + d.marquee + ' ';
      qsa('.marquee__seg').forEach(function (s) { s.textContent = txt; });
    }
    if (typeof d.footer === 'string' && d.footer) {
      cmsFooterApplied = true;
      qsa('.footer-copy').forEach(function (f) { f.textContent = d.footer; });
    }
  }

  // 品牌:site.brand 应用到导航 logo 与 footer(页面内容自带 footer 时以页面为准)
  function applySite(s) {
    if (!s || typeof s !== 'object') return;
    var brand = typeof s.brand === 'string' && s.brand ? s.brand : '';
    if (!brand) return;
    qsa('.nav__logo').forEach(function (l) { l.textContent = '✳ ' + brand; });
    if (!cmsFooterApplied) {
      qsa('.footer-copy').forEach(function (f) { f.textContent = '©2026 ' + brand + ' · MADE IN FUTIAN SZ'; });
    }
  }

  function applyIndex(d) {
    var h = d.hero || {};
    if (isArr(h.strip)) {
      var stripSpans = qsa('.hero__strip > span').filter(function (s) {
        return !s.classList.contains('arrow-line');
      });
      stripSpans.forEach(function (s, i) {
        if (typeof h.strip[i] === 'string') s.textContent = h.strip[i];
      });
    }
    if (typeof h.letters === 'string' && h.letters) {
      qsa('.hero__title .ltr').forEach(function (l, i) {
        if (h.letters.charAt(i)) l.textContent = h.letters.charAt(i);
      });
    }
    if (isArr(h.seals)) {
      qsa('.hero__seal').forEach(function (s, i) {
        if (typeof h.seals[i] === 'string') s.textContent = h.seals[i];
      });
    }
    setText(qs('.hero__barline .tagline'), h.tagline);
    if (isArr(h.words)) {
      qsa('.hero__words .w').forEach(function (w, i) {
        if (typeof h.words[i] === 'string') w.textContent = h.words[i];
      });
    }
    if (isArr(h.bottom)) {
      qsa('.hero__bottombar > span').forEach(function (s, i) {
        if (typeof h.bottom[i] === 'string') s.textContent = h.bottom[i];
      });
    }

    var pos = d.position || {};
    setText(qs('[data-cms="pos-kicker"]'), pos.kicker);
    setText(qs('[data-cms="pos-text"]'), pos.text);

    var mf = d.manifesto || {};
    if (isArr(mf.rows) && mf.rows.length) {
      var mt = qs('.manifesto__text');
      if (mt) {
        mt.textContent = '';
        var delay = 0;
        mf.rows.forEach(function (row, ri) {
          if (ri > 0) mt.appendChild(document.createElement('br'));
          (isArr(row) ? row : []).forEach(function (cell) {
            var sp = document.createElement('span');
            sp.className = 'mw' + (cell && cell.red ? ' red' : '');
            sp.style.transitionDelay = delay + 'ms';
            delay += 80;
            sp.textContent = cell && typeof cell.t === 'string' ? cell.t : '';
            mt.appendChild(sp);
          });
        });
      }
    }
    setText(qs('.manifesto .kicker'), mf.kicker);

    var sv = d.services || {};
    var firstRow = qs('.service-row');
    var svcSection = firstRow && firstRow.closest ? firstRow.closest('section') : null;
    if (svcSection) {
      setText(qs('.section-head .kicker', svcSection), sv.kicker);
      setText(qs('.section-head .h2', svcSection), sv.title);
      setText(qs('.section-head .lead', svcSection), sv.lead);
      if (isArr(sv.rows)) {
        qsa('.service-row', svcSection).forEach(function (row, i) {
          var r = sv.rows[i];
          if (!r) return;
          setText(qs('.service-row__no', row), r.no);
          setText(qs('.service-row__cn', row), r.cn);
          setText(qs('.service-row__en', row), r.en);
          setText(qs('.service-row__price', row), r.price);
          if (typeof r.subject === 'string') row.setAttribute('data-service-subject', r.subject);
          setText(qs('.service-row__desc span', row), r.desc);
        });
      }
    }

    var sel = d.selected || {};
    var wrail = qs('.wrail');
    if (wrail) {
      var kicks = qsa('.section-head .kicker', wrail);
      if (kicks[0]) setText(kicks[0], sel.kicker);
      if (kicks[1]) setText(kicks[1], sel.meta);
      setText(qs('.section-head .h2', wrail), sel.title);
      var track = qs('.wrail__track', wrail);
      if (track && isArr(sel.items) && sel.items.length) {
        track.textContent = '';
        sel.items.forEach(function (it, i) {
          it = it || {};
          var a = document.createElement('a');
          a.className = 'wcard';
          a.setAttribute('href', 'works.html');
          if (it.target) a.setAttribute('data-work-target', String(it.target));
          var cover = document.createElement('span');
          cover.className = 'wcard__cover';
          if (it.cover) {
            var img = document.createElement('img');
            img.src = String(it.cover);
            img.alt = String(it.title || '') + ' — 项目封面';
            img.width = 960;
            img.height = 1200;
            img.loading = 'lazy';
            img.decoding = 'async';
            cover.appendChild(img);
          }
          var meta = document.createElement('span');
          meta.className = 'wcard__meta';
          var no = document.createElement('span');
          no.className = 'wcard__no';
          no.textContent = String(i + 1).padStart(2, '0');
          var tt = document.createElement('span');
          tt.className = 'wcard__title';
          tt.textContent = String(it.title || '');
          var tg = document.createElement('span');
          tg.className = 'wcard__tags';
          tg.textContent = String(it.tags || '');
          meta.appendChild(no); meta.appendChild(tt); meta.appendChild(tg);
          a.appendChild(cover); a.appendChild(meta);
          track.appendChild(a);
        });
        var more = sel.more || {};
        var ma = document.createElement('a');
        ma.className = 'wrail__more';
        ma.setAttribute('href', 'works.html');
        var mTop = document.createElement('span');
        mTop.className = 'top';
        mTop.textContent = more.top || 'FULL ARCHIVE';
        var mMid = document.createElement('span');
        var mBig = document.createElement('span');
        mBig.className = 'big';
        mBig.textContent = more.big || '';
        var mZh = document.createElement('span');
        mZh.className = 'zh';
        mZh.appendChild(document.createTextNode((more.zh || '查看全部作品') + ' '));
        var mArrow = document.createElement('i');
        mArrow.textContent = '→';
        mZh.appendChild(mArrow);
        mMid.appendChild(mBig); mMid.appendChild(mZh);
        var mBot = document.createElement('span');
        mBot.className = 'bot';
        mBot.textContent = more.bot || '';
        ma.appendChild(mTop); ma.appendChild(mMid); ma.appendChild(mBot);
        track.appendChild(ma);
      }
    }

    var pr = d.process || {};
    var grid = qs('.process-grid');
    if (grid) {
      var psec = grid.closest ? grid.closest('section') : null;
      if (psec) {
        setText(qs('.section-head .h2', psec), pr.title);
        setText(qs('.section-head .kicker', psec), pr.kicker);
      }
      if (isArr(pr.steps)) {
        qsa('.pstep', grid).forEach(function (step, i) {
          var s = pr.steps[i];
          if (!s) return;
          setText(qs('.ticket__no', step), s.no);
          var t = qs('.pstep__title', step);
          if (t && typeof s.title === 'string') {
            t.textContent = s.title;
            if (s.en) {
              var em = document.createElement('em');
              em.textContent = s.en;
              t.appendChild(em);
            }
          }
          setText(qs('.pstep__desc', step), s.desc);
        });
      }
    }

    var av = d.availability || {};
    var tf = qs('#availability');
    if (tf) {
      setText(qs('.tf-upper .kicker', tf), av.kicker);
      setText(qs('.tf-upper .h2', tf), av.title);
      var badge = qs('.tf-badge', tf);
      if (badge && typeof av.badge === 'string') {
        var dotEl = qs('.blink-dot', badge);
        badge.textContent = '';
        if (dotEl) badge.appendChild(dotEl);
        badge.appendChild(document.createTextNode(av.badge));
      }
      setText(qs('.tf-desc', tf), av.desc);
      var mail = qs('.tf-mail', tf);
      if (mail && typeof av.email === 'string' && av.email) {
        mail.textContent = av.email;
        mail.setAttribute('href', 'mailto:' + av.email);
      }
      if (typeof av.wechat === 'string' && av.wechat) setText(qs('.tf-wechat', tf), 'WECHAT: ' + av.wechat);
      setText(qs('.ticket__no', tf), av.no);
    }
    applyMarqueeFooter(d);
  }

  function applyWorksData(d) {
    var hd = d.head || {};
    var headSec = qs('.works-head');
    var projects = isArr(d.projects)
      ? d.projects.filter(function (p) { return p && typeof p === 'object'; })
      : null;
    if (headSec) {
      setText(qs('.works-head__row .kicker', headSec), hd.kicker);
      setText(qs('.works-head__title .cn', headSec), hd.cn);
      setText(qs('.works-head__title .en', headSec), hd.en);
      setText(qs('.works-head__side', headSec), typeof hd.side === 'string'
        ? hd.side
        : (projects ? 'TOTAL ' + projects.length + ' · 2022—2026 · DES/DEV/BRAND/PKG' : undefined));
    }
    if (projects && projects.length) {
      var cols = qs('.works-grid__cols');
      if (cols) {
        cols.textContent = '';
        cols.classList.add('works-grid__cols--flow');
        var autoSizes = ['m', 'l', 's', 'm', 'xl', 's', 'l', 'm', 's', 'l', 'm', 'xl', 's', 'm'];
        projects.forEach(function (p, i) {
          if (!p || typeof p !== 'object') return;
          var videoUrl = typeof p.video === 'string' ? p.video.trim() : '';
          var hasVideo = videoUrl.length > 4;
          var size = ['s', 'm', 'l', 'xl'].indexOf(p.size) >= 0
            ? p.size
            : (hasVideo ? (i % 3 === 0 ? 'xl' : 'l') : autoSizes[i % autoSizes.length]);
          var shift = i % 5 === 1 ? ' flow-card--shift-a' : (i % 5 === 3 ? ' flow-card--shift-b' : (i % 5 === 4 ? ' flow-card--shift-c' : ''));
          var btn = document.createElement('button');
          btn.className = 'work-card flow-card flow-card--' + size + shift + (hasVideo ? ' work-card--video flow-card--video' : '');
          btn.type = 'button';
          btn.setAttribute('data-work-id', String(p.id || ('work-' + (i + 1))));
          btn.setAttribute('data-cats', String(p.cats || ''));
          btn.setAttribute('data-title', String(p.title || ''));
          btn.setAttribute('data-tags', String(p.tags || ''));
          btn.setAttribute('data-year', String(p.year || ''));
          btn.setAttribute('data-role', String(p.role || ''));
          btn.setAttribute('data-deliverables', String(p.deliverables || ''));
          btn.setAttribute('data-desc', String(p.desc || ''));
          if (hasVideo) {
            btn.setAttribute('data-video', videoUrl);
            if (p.poster) btn.setAttribute('data-poster', String(p.poster));
          }
          var cover = document.createElement('span');
          cover.className = 'work-card__cover flow-cover';
          if (hasVideo) {
            var vid = document.createElement('video');
            vid.src = videoUrl;
            var poster = p.poster || p.cover || '';
            if (poster) vid.poster = String(poster);
            vid.muted = true;
            vid.loop = true;
            vid.playsInline = true;
            vid.setAttribute('playsinline', '');
            vid.preload = 'metadata';
            vid.setAttribute('data-flow-video', '1');
            cover.appendChild(vid);
            var badge = document.createElement('span');
            badge.className = 'flow-card__badge';
            badge.textContent = 'VIDEO ▶';
            cover.appendChild(badge);
          } else if (p.cover) {
            var img = document.createElement('img');
            img.src = String(p.cover);
            img.alt = String(p.title || '') + ' — 项目封面';
            img.width = 960;
            img.height = 1200;
            img.loading = 'lazy';
            img.decoding = 'async';
            cover.appendChild(img);
          } else {
            var ph = document.createElement('span');
            ph.className = 'cover-ph';
            var pa = p.ph && typeof p.ph.a === 'string' ? p.ph.a : '#2b2b30';
            var pb = p.ph && typeof p.ph.b === 'string' ? p.ph.b : '#45454c';
            ph.setAttribute('style', '--ph-a:' + pa + ';--ph-b:' + pb);
            var big = document.createElement('span');
            big.className = 'big';
            big.textContent = String(i + 1).padStart(2, '0');
            var lbl = document.createElement('span');
            lbl.className = 'lbl';
            lbl.textContent = 'PROJECT / 待发布';
            ph.appendChild(big); ph.appendChild(lbl);
            cover.appendChild(ph);
          }
          var idx = document.createElement('span');
          idx.className = 'flow-card__index';
          idx.textContent = String(i + 1).padStart(2, '0');
          cover.appendChild(idx);
          var meta = document.createElement('span');
          meta.className = 'wcard__meta';
          var no = document.createElement('span');
          no.className = 'wcard__no';
          no.textContent = String(i + 1).padStart(2, '0');
          var tt = document.createElement('span');
          tt.className = 'wcard__title';
          tt.textContent = String(p.title || '');
          var tg = document.createElement('span');
          tg.className = 'wcard__tags';
          var cats = String(p.cats || '').split(' ').filter(Boolean).join('/');
          tg.textContent = (p.year ? String(p.year) + ' · ' : '') + cats + (hasVideo ? ' · VIDEO' : '');
          meta.appendChild(no); meta.appendChild(tt); meta.appendChild(tg);
          btn.appendChild(cover); btn.appendChild(meta);
          cols.appendChild(btn);
        });
        if (!reduced && !coarse) {
          var flowVids = cols.querySelectorAll('video[data-flow-video]');
          for (var fv = 0; fv < flowVids.length; fv++) {
            (function (v) {
              var card = v.closest('.flow-card');
              if (!card) return;
              card.addEventListener('mouseenter', function () { var pr = v.play(); if (pr && pr.catch) pr.catch(function () { }); });
              card.addEventListener('mouseleave', function () { v.pause(); });
              card.addEventListener('focus', function () { var pr = v.play(); if (pr && pr.catch) pr.catch(function () { }); });
              card.addEventListener('blur', function () { v.pause(); });
            })(flowVids[fv]);
          }
        }
      }
      // filters:数量按 projects 自动重算
      var filters = isArr(d.filters) ? d.filters : ['设计', '开发', '品牌', '包装'];
      var fwrap = qs('.filters');
      if (fwrap) {
        fwrap.textContent = '';
        var mk = function (key, label) {
          var b = document.createElement('button');
          b.className = 'filter-btn';
          b.type = 'button';
          b.setAttribute('data-filter', key);
          b.setAttribute('aria-pressed', key === 'all' ? 'true' : 'false');
          b.textContent = label;
          fwrap.appendChild(b);
        };
        mk('all', '全部 ' + projects.length);
        filters.forEach(function (f) {
          if (typeof f !== 'string' || !f) return;
          var c = projects.filter(function (p) {
            return String(p.cats || '').split(' ').indexOf(f) !== -1;
          }).length;
          mk(f, f + ' ' + c);
        });
      }
    }
    var end = d.end || {};
    var tf = qs('#availability');
    if (tf) {
      setText(qs('.tf-upper .kicker', tf), end.kicker);
      setText(qs('.tf-upper .h2', tf), end.title);
      setText(qs('.btn-wipe span', tf), end.cta);
      var mail = qs('.tf-mail', tf);
      if (mail && typeof end.email === 'string' && end.email) {
        var oldHref = mail.getAttribute('href') || '';
        var query = oldHref.indexOf('?') >= 0 ? oldHref.slice(oldHref.indexOf('?')) : '';
        mail.textContent = end.email;
        mail.setAttribute('href', 'mailto:' + end.email + query);
      }
      if (typeof end.wechat === 'string' && end.wechat) setText(qs('.tf-wechat', tf), 'WECHAT: ' + end.wechat);
      setText(qs('.ticket__no', tf), end.no);
    }
    applyMarqueeFooter(d);
  }

  function applyAbout(d) {
    var pf = d.portrait || {};
    setText(qs('.about-hero__id'), pf.id);
    var pimg = qs('.about-hero__portrait img');
    if (pimg && typeof pf.img === 'string' && pf.img) {
      pimg.src = pf.img;
      if (typeof pf.alt === 'string') pimg.alt = pf.alt;
    }
    setText(qs('.about-hero__caption'), pf.caption);
    var bio = qs('.about-hero__bio');
    if (bio) setText(qs('.kicker', bio), d.kicker);
    var t = d.title || {};
    var h1 = qs('.about-hero__title');
    if (h1 && (typeof t.pre === 'string' || typeof t.name === 'string' || typeof t.post === 'string')) {
      h1.textContent = '';
      h1.appendChild(document.createTextNode(t.pre || ''));
      var red = document.createElement('span');
      red.className = 'red';
      red.textContent = t.name || '';
      h1.appendChild(red);
      h1.appendChild(document.createTextNode(t.post || ''));
    }
    if (isArr(d.paras) && d.paras.length) {
      var box = qs('.about-hero__paras');
      if (box) {
        box.textContent = '';
        d.paras.forEach(function (p, i) {
          if (typeof p !== 'string') return;
          var el = document.createElement('p');
          el.className = 'rv in';
          el.style.transitionDelay = ((i + 1) * 100) + 'ms';
          el.textContent = p;
          box.appendChild(el);
        });
      }
    }
    var st = d.status || {};
    var open = qs('.about-hero__status .open');
    if (open && typeof st.open === 'string') {
      var odot = qs('.blink-dot', open);
      open.textContent = '';
      if (odot) open.appendChild(odot);
      open.appendChild(document.createTextNode(st.open));
    }
    setText(qs('.about-hero__status .tags'), st.tags);

    var capGrid = qs('.caps-grid');
    var capSec = capGrid && capGrid.closest ? capGrid.closest('section') : null;
    if (capSec) setText(qs('.h2', capSec), d.capsTitle);
    if (isArr(d.caps)) {
      qsa('.caps-grid .cap').forEach(function (cap, i) {
        var c = d.caps[i];
        if (!c) return;
        setText(qs('.kicker', cap), c.key);
        setText(qs('h3', cap), c.title);
        if (isArr(c.items)) {
          var ul = qs('ul', cap);
          if (ul) {
            ul.textContent = '';
            c.items.forEach(function (it, j) {
              if (typeof it !== 'string') return;
              var li = document.createElement('li');
              var idx = document.createElement('span');
              idx.className = 'idx';
              idx.textContent = String(j + 1).padStart(2, '0');
              li.appendChild(idx);
              li.appendChild(document.createTextNode(it));
              ul.appendChild(li);
            });
          }
        }
      });
    }
    setText(qs('.caps-tools'), d.tools);

    var tlSec = qs('.timeline');
    if (tlSec) setText(qs('.h2', tlSec), d.timelineTitle);
    if (isArr(d.timeline) && d.timeline.length) {
      ['.timeline__h', '.timeline__v'].forEach(function (sel2) {
        var wrap = qs(sel2);
        if (!wrap) return;
        qsa('.tl-node', wrap).forEach(function (n) { n.remove(); });
        d.timeline.forEach(function (node, i) {
          if (!node) return;
          var div = document.createElement('div');
          div.className = 'tl-node rv in';
          if (i > 0) div.style.transitionDelay = (i * 120) + 'ms';
          var dot = document.createElement('span');
          dot.className = 'dot';
          dot.setAttribute('aria-hidden', 'true');
          var y = document.createElement('p');
          y.className = 'year';
          y.textContent = String(node.year || '');
          var x = document.createElement('p');
          x.className = 'txt';
          x.textContent = String(node.text || '');
          div.appendChild(dot); div.appendChild(y); div.appendChild(x);
          wrap.appendChild(div);
        });
      });
    }

    var ct = d.contact || {};
    var rows = qs('.contact-rows');
    var ticket = rows && rows.closest ? rows.closest('.ticket') : null;
    if (ticket) {
      setText(qs('.tf-upper .kicker', ticket), ct.kicker);
      setText(qs('.tf-upper .h2', ticket), ct.title);
      setText(qs('.tf-upper .lead', ticket), ct.lead);
      setText(qs('.ticket__no', ticket), ct.no);
      setText(qs('.contact-stub .hint', ticket), ct.hint);
    }
    if (rows) {
      var mailRow = qs('a.contact-row', rows);
      if (mailRow && typeof ct.email === 'string' && ct.email) {
        mailRow.setAttribute('href', 'mailto:' + ct.email);
        setText(qs('.val', mailRow), ct.email);
      }
      var wxRow = qs('[data-copy-wechat]', rows);
      if (wxRow && typeof ct.wechat === 'string' && ct.wechat) {
        wxRow.setAttribute('data-wechat', ct.wechat);
        setText(qs('.val', wxRow), ct.wechat);
      }
      var socRow = qs('div.contact-row', rows);
      if (socRow) setText(qs('.val', socRow), ct.social);
    }
    applyMarqueeFooter(d);
  }

  function applyNotes(d) {
    var hd = d.heading || {};
    var nh = qs('.notes-head');
    if (nh) {
      setText(qs('.kicker', nh), hd.kicker);
      setText(qs('h1', nh), hd.title);
      setText(qs('.sub', nh), hd.sub);
      var anon = qs('.anon', nh);
      if (anon && typeof hd.anon === 'string') {
        var m = /^(.*?)(✳)?$/.exec(hd.anon);
        anon.textContent = '';
        anon.appendChild(document.createTextNode(m && m[1] ? m[1] : hd.anon));
        if (m && m[2]) {
          var r = document.createElement('span');
          r.className = 'red';
          r.textContent = '✳';
          anon.appendChild(r);
        }
      }
    }
    setText(qs('.notes-input__notice'), d.notice);
    var rw = d.rewind || {};
    var rt = qs('.rewind__title');
    if (rt && (typeof rw.title === 'string' || typeof rw.en === 'string')) {
      rt.textContent = '';
      rt.appendChild(document.createTextNode((rw.title || '') + ' '));
      var en = document.createElement('span');
      en.className = 'en';
      en.textContent = rw.en || '';
      rt.appendChild(en);
    }
    setText(qs('.rewind__loop'), rw.loop);
    applyMarqueeFooter(d);
  }

  // 首页 / 关于页:绑定保持不动,仅异步替换文案(textContent-only)
  if (PAGE === 0) {
    cmsFetch('index', function (d) { if (d && typeof d === 'object') applyIndex(d); });
  }
  if (PAGE === 2) {
    cmsFetch('about', function (d) { if (d && typeof d === 'object') applyAbout(d); });
  }
  // 品牌元信息:应用到所有页(导航 logo / footer)
  cmsFetch('site', applySite);

  /* ---------- boot ---------- */
  renderBarcodes();
  measure();
  chargeTo(0, 0);
})();
