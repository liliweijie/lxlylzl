/* ============================================
       LXLYLZL — Simplified Scroll Logic + Theme Toggle
       ============================================ */

    (function () {
      "use strict";

      // ========== THEME ==========
      var htmlEl   = document.documentElement;
      var themeBtn = document.querySelector(".icon-sidebar__bottom .icon-sidebar__item");

      function applyTheme(theme) {
        htmlEl.setAttribute("data-theme", theme);
        localStorage.setItem("lxlylzl-theme", theme);
        updateThemeIcon(theme);
      }

      function updateThemeIcon(theme) {
        if (!themeBtn) return;
        var isLight = theme === "light";
        themeBtn.innerHTML = isLight
          ? "<svg class=\"icon-sidebar__icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\"><path d=\"M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 21 12.79z\"/></svg>"
          : "<svg class=\"icon-sidebar__icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\"><circle cx=\"12\" cy=\"12\" r=\"5\"/><path d=\"M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42\"/></svg>";
      }

      // Init theme
      (function initTheme() {
        var saved = localStorage.getItem("lxlylzl-theme");
        if (saved) {
          applyTheme(saved);
        } else if (window.matchMedia("(prefers-color-scheme: light)").matches) {
          applyTheme("light");
        } else {
          applyTheme("dark");
        }
      })();

      if (themeBtn) {
        themeBtn.addEventListener("click", function () {
          var current = htmlEl.getAttribute("data-theme");
          applyTheme(current === "light" ? "dark" : "light");
        });
      }

      // ========== DOM REFS ==========
      var mainContent   = document.getElementById("mainContent");
      var mainInner    = mainContent ? mainContent.querySelector(".main__inner") : null;
      var sidebarNav   = document.getElementById("iconSidebar");
      var horizontalFw = document.getElementById("appContainer");
      var verticalFw   = document.getElementById("verticalFramework");
      var pages         = document.querySelectorAll(".page");

      if (!mainContent || !verticalFw) return;

      var PAGE_COUNT = 5;
      var currentPage = 0;
      var inVerticalFramework = false;

      // ========== LAYOUT WIDTHS ==========
      function updateLayoutWidths() {
        var pageWidth = mainContent.clientWidth;
        if (mainInner) mainInner.style.width = (pageWidth * PAGE_COUNT) + "px";
        pages.forEach(function (p) { p.style.width = pageWidth + "px"; });
      }
      updateLayoutWidths();
      window.addEventListener("resize", function () {
        updateLayoutWidths();
        mainContent.scrollLeft = currentPage * mainContent.clientWidth;
      });

      // ========== TRACK CURRENT PAGE FROM SCROLL ==========
      function updateCurrentPageFromScroll() {
        if (inVerticalFramework) return;
        var newPage = Math.round(mainContent.scrollLeft / mainContent.clientWidth);
        var clamped = Math.max(0, Math.min(PAGE_COUNT - 1, newPage));
        if (clamped !== currentPage) {
          currentPage = clamped;
          updateNavState();
        }
      }
      mainContent.addEventListener("scroll", updateCurrentPageFromScroll);

      // ========== HORIZONTAL SCROLL (wheel on document to catch all events) ==========
      var scrollCooldown = false;
      var SCROLL_DEBOUNCE_MS = 800;

      // Use document with capture to intercept ALL wheel events
      document.addEventListener("wheel", function (e) {
        // ---------- WORKS PAGE: delegate to works-3d.js ----------
        // If current page is the works page (index 1), let works-3d handle wheel
        var mc = document.getElementById('mainContent');
        if (mc) {
          var idx = Math.round(mc.scrollLeft / mc.clientWidth);
          if (idx === 1) {
            // On works page — prevent script.js from hijacking the wheel
            // If works-3d isn't initialized yet, init it now
            if (window.initWorks3D && !window._worksPageActive) {
              window.initWorks3D();
            }
            return;
          }
        }

        // Ignore if vertical framework is active
        if (inVerticalFramework) return;

        // Ignore if the event target is inside the vertical framework
        if (verticalFw && verticalFw.contains(e.target)) return;

        // Ignore if vertical framework is visible (user is scrolling inside it)
        if (verticalFw && verticalFw.classList.contains("is-visible")) return;

        if (scrollCooldown) return;

        // Determine scroll direction
        // deltaY < 0 → wheel up   → previous page
        // deltaY > 0 → wheel down → next page
        // deltaX < 0 → swipe left  → previous page
        // deltaX > 0 → swipe right → next page
        var primaryDelta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;

        // Check if we are at the very end of horizontal scroll
        var maxScroll = mainContent.scrollWidth - mainContent.clientWidth;
        var atEnd = mainContent.scrollLeft >= maxScroll - 2;

        // On last page + scroll down/right + at end => enter vertical framework
        if (atEnd && primaryDelta > 0) {
          e.preventDefault();
          enterVerticalFramework();
          return;
        }

        // On first page + scroll up/left => ignore
        if (currentPage === 0 && primaryDelta < 0) return;

        // Snap to next/previous page
        e.preventDefault();
        scrollCooldown = true;
        if (primaryDelta > 0) {
          scrollToPage(currentPage + 1);
        } else {
          scrollToPage(currentPage - 1);
        }
        setTimeout(function () { scrollCooldown = false; }, SCROLL_DEBOUNCE_MS);
      }, { passive: false, capture: true });

      // ========== VERTICAL SCROLL ==========
      verticalFw.addEventListener("wheel", function (e) {
        if (!inVerticalFramework) return;
        if (verticalFw.scrollTop <= 0 && e.deltaY < 0) {
          e.preventDefault();
          exitVerticalFramework();
        }
      }, { passive: false });

      // ========== FRAMEWORK TRANSITION ==========
      function enterVerticalFramework() {
        if (inVerticalFramework) return;
        inVerticalFramework = true;
        if (horizontalFw) {
          horizontalFw.style.opacity = "0";
          horizontalFw.style.pointerEvents = "none";
        }
        verticalFw.classList.add("is-visible");
        verticalFw.scrollTop = 0;
      }

      function exitVerticalFramework() {
        if (!inVerticalFramework) return;
        inVerticalFramework = false;
        if (horizontalFw) {
          horizontalFw.style.opacity = "";
          horizontalFw.style.pointerEvents = "";
        }
        verticalFw.classList.remove("is-visible");
      }

      // ========== SCROLL TO PAGE ==========
      function scrollToPage(pageIndex) {
        if (pageIndex < 0 || pageIndex >= PAGE_COUNT) return;
        currentPage = pageIndex;
        var target  = pageIndex * mainContent.clientWidth;
        var start   = mainContent.scrollLeft;
        var dist    = target - start;
        var duration = 650;
        var startTime = performance.now();

        function easeOutCubic(t) { return 1 - Math.pow(1 - t, 3); }

        function step(now) {
          var elapsed = now - startTime;
          var t       = Math.min(elapsed / duration, 1);
          mainContent.scrollLeft = start + dist * easeOutCubic(t);
          if (t < 1) {
            requestAnimationFrame(step);
          }
        }
        requestAnimationFrame(step);
        updateNavState();
      }

      // ========== NAV CLICKS ==========
      if (sidebarNav) {
        sidebarNav.addEventListener("click", function (e) {
          var item = e.target.closest(".icon-sidebar__item");
          if (!item) return;
          var p = Number(item.dataset.page);
          if (Number.isInteger(p) && p >= 0) scrollToPage(p);
        });
      }

      document.querySelectorAll("[data-page]").forEach(function (el) {
        el.addEventListener("click", function () {
          var p = Number(el.dataset.page);
          if (Number.isInteger(p) && p >= 0) scrollToPage(p);
        });
      });

      // ========== TOUCH SWIPE SUPPORT ==========
      var touchStartX = 0;
      var touchStartY = 0;
      var touchInProgress = false;

      document.addEventListener("touchstart", function (e) {
        if (inVerticalFramework) return;
        if (verticalFw && verticalFw.contains(e.target)) return;
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
        touchInProgress = true;
      }, { passive: true });

      document.addEventListener("touchend", function (e) {
        if (!touchInProgress) return;
        touchInProgress = false;
        if (inVerticalFramework) return;

        var endX = e.changedTouches[0].clientX;
        var endY = e.changedTouches[0].clientY;
        var diffX = touchStartX - endX;
        var diffY = touchStartY - endY;

        // Only handle horizontal swipes
        if (Math.abs(diffX) < Math.abs(diffY)) return;

        var maxScroll = mainContent.scrollWidth - mainContent.clientWidth;
        var atEnd = mainContent.scrollLeft >= maxScroll - 2;

        if (atEnd && diffX > 50) {
          enterVerticalFramework();
          return;
        }

        if (currentPage === 0 && diffX < -50) return;

        if (Math.abs(diffX) > 50) {
          if (diffX > 0) {
            scrollToPage(currentPage + 1);
          } else {
            scrollToPage(currentPage - 1);
          }
        }
      }, { passive: true });

      // ========== KEYBOARD ==========
      document.addEventListener("keydown", function (e) {
        if (inVerticalFramework) {
          if (e.key === "Escape") exitVerticalFramework();
          return;
        }
        if (e.key === "ArrowRight") scrollToPage(currentPage + 1);
        if (e.key === "ArrowLeft")  scrollToPage(currentPage - 1);
      });

      // ========== PAGE VISIBILITY ==========
      pages.forEach(function (p, i) {
        p.style.animationDelay = (i * 0.1) + "s";
        p.classList.add("is-visible");
      });

      // ========== INIT ==========
      function updateNavState() {
        if (!sidebarNav) return;
        sidebarNav.querySelectorAll(".icon-sidebar__item").forEach(function (item, i) {
          item.classList.toggle("icon-sidebar__item--active", i === currentPage);
        });
      }

      updateNavState();
      setTimeout(function () {
        if (pages.length > 0) pages[0].classList.add("is-visible");
      }, 1300);

    })();

    /* ===== 3D Cards for Works Page ===== */
    (function(){
      const NUM = 20;
      const BASE_GAP = 150;
      const MAX_Z = 150;
      const MIN_Z = -600;
      const FOCUS_RANGE = 900;
      const FISHEYE = 0.25;

      const CARDS = [
        {title:"Design System", info:"Design Tokens / Visual Identity", footer:"Case Study"},
        {title:"Brand Identity", info:"Logo / Guideline / Collateral", footer:"Case Study"},
        {title:"Motion Design", info:"After Effects / Principle / Rive", footer:"Showreel"},
        {title:"UI/UX Design", info:"Figma / Sketch / Prototype", footer:"Case Study"},
        {title:"Illustration", info:"Editorial / Commercial / Personal", footer:"Gallery"},
        {title:"Type Design", info:"Latin / CJK / Variable Font", footer:"Specimen"},
        {title:"3D & Render", info:"Blender / Cinema4D / Redshift", footer:"Gallery"},
        {title:"Photography", info:"Portrait / Still Life / Documentary", footer:"Portfolio"},
        {title:"Creative Coding", info:"p5.js / Three.js / Shader", footer:"Experiments"},
        {title:"Product Design", info:"Strategy / Research / Delivery", footer:"Case Study"},
        {title:"Web Development", info:"React / Vue / Next.js", footer:"Case Study"},
        {title:"Mobile App", info:"iOS / Android / React Native", footer:"Case Study"},
        {title:"Data Visualization", info:"D3.js / Chart.js / Processing", footer:"Gallery"},
        {title:"Game Design", info:"Unity / Unreal / Godot", footer:"Showreel"},
        {title:"Sound Design", info:"Ableton / Pro Tools / Logic Pro", footer:"Portfolio"},
        {title:"Video Editing", info:"Premiere / DaVinci / Final Cut", footer:"Showreel"},
        {title:"Print Design", info:"InDesign / Layout / Editorial", footer:"Gallery"},
        {title:"Packaging", info:"Structural / Label / Branding", footer:"Case Study"},
        {title:"Wayfinding", info:"Signage / Environmental Design", footer:"Case Study"},
        {title:"AR/VR Design", info:"WebXR / Unity / Meta Quest", footer:"Experiments"}
      ];

      const DARK_THEMES = [
        {bg:"#2c2c3e",fg:"#f0ece4"},{bg:"#3a3a4e",fg:"#f0ece4"},{bg:"#4a4a5e",fg:"#f0ece4"},
        {bg:"#1e2d3d",fg:"#f0ece4"},{bg:"#2a3a4a",fg:"#f0ece4"},{bg:"#3a4a5a",fg:"#f0ece4"},
        {bg:"#3e3a2e",fg:"#f0ece4"},{bg:"#4a3a2e",fg:"#f0ece4"},{bg:"#2e3a3a",fg:"#f0ece4"},
        {bg:"#3a4a4a",fg:"#f0ece4"},{bg:"#4a2e2e",fg:"#f0ece4"},{bg:"#5a3a2e",fg:"#f0ece4"},
        {bg:"#2e2e3a",fg:"#f0ece4"},{bg:"#3a3a4a",fg:"#f0ece4"},{bg:"#4a4a5a",fg:"#f0ece4"},
        {bg:"#2e3a2e",fg:"#f0ece4"},{bg:"#3a4a3a",fg:"#f0ece4"},{bg:"#4a5a4a",fg:"#f0ece4"},
        {bg:"#3a2e3a",fg:"#f0ece4"},{bg:"#4a3a4a",fg:"#f0ece4"}
      ];
      const LIGHT_THEMES = [
        {bg:"#e8e4dc",fg:"#1a1a2e"},{bg:"#d4cfc7",fg:"#1a1a2e"},{bg:"#c9c4b8",fg:"#1a1a2e"},
        {bg:"#d8d3ca",fg:"#1a1a2e"},{bg:"#c5c0b5",fg:"#1a1a2e"},{bg:"#b8b3a8",fg:"#1a1a2e"},
        {bg:"#ddd8ce",fg:"#1a1a2e"},{bg:"#cec9be",fg:"#1a1a2e"},{bg:"#bfbaae",fg:"#1a1a2e"},
        {bg:"#d1ccbf",fg:"#1a1a2e"},{bg:"#e2ddd4",fg:"#1a1a2e"},{bg:"#d8d2c5",fg:"#1a1a2e"},
        {bg:"#cdc7b8",fg:"#1a1a2e"},{bg:"#c3bdb0",fg:"#1a1a2e"},{bg:"#e5e0d6",fg:"#1a1a2e"},
        {bg:"#dadbce",fg:"#1a1a2e"},{bg:"#cfcbc0",fg:"#1a1a2e"},{bg:"#c4bfb2",fg:"#1a1a2e"},
        {bg:"#dad5ca",fg:"#1a1a2e"},{bg:"#d0cbc0",fg:"#1a1a2e"}
      ];

      function getWorksThemes() {
        const isLight = document.documentElement.getAttribute('data-theme') === 'light';
        return isLight ? LIGHT_THEMES : DARK_THEMES;
      }

      var worksCards = [];
      var worksView, worksStage;
      var worksScrollX = 0, worksTargetScrollX = 0;
      var worksHoveredIdx = -1;
      var worksMouseX = 0;
      var worksViewWidth = 0, worksViewCenter = 0;
      var worksAnimFrame = null;
      var worksInitialized = false;

      function initWorks3D() {
        if (worksInitialized) return;
        worksView = document.querySelector('.works-3d-view');
        worksStage = document.querySelector('.works-3d-stage');
        if (!worksView || !worksStage) return;

        worksViewWidth = worksView.offsetWidth;
        worksViewCenter = worksViewWidth / 2;
        worksMouseX = worksViewCenter;
        worksInitialized = true;

        for (var i = 0; i < NUM; i++) {
          var themes = getWorksThemes();
          var theme = themes[i % themes.length];
          var cardData = CARDS[i];
          var el = document.createElement('div');
          el.className = 'card-3d';
          el.dataset.idx = i;
          el.style.cssText = 'position:absolute;top:50%;width:150px;height:1050px;border-radius:5px;cursor:pointer;backface-visibility:hidden;-webkit-backface-visibility:hidden;display:flex;flex-direction:column;align-items:center;justify-content:flex-start;padding:18px 10px;transform-style:preserve-3d;transition:filter 0.35s ease, box-shadow 0.35s ease, transform 0.35s ease;background:' + theme.bg + ';color:' + theme.fg;
          el.innerHTML = '<div style="width:100%;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:space-between;"><span style="font-size:7px;font-weight:600;opacity:0.55;letter-spacing:0.08em;text-transform:uppercase;align-self:flex-start;">' + theme.bg.toUpperCase() + '</span><div style="flex:1;display:flex;align-items:center;justify-content:center;"><span style="font-size:9px;font-weight:800;letter-spacing:0.12em;writing-mode:vertical-rl;text-orientation:mixed;transform:rotate(180deg);">' + cardData.title + '</span></div><div style="font-size:38px;font-weight:900;line-height:1;margin:14px 0 10px;">' + (i+1) + '</div><div style="width:100%;height:1px;margin:8px 0;opacity:0.15;background:currentColor;"></div><span style="font-size:7px;font-weight:700;opacity:0.35;letter-spacing:0.06em;">' + cardData.info + '</span><span style="font-size:7px;font-weight:800;letter-spacing:0.08em;margin-top:auto;">' + cardData.footer + '</span></div>';
          worksStage.appendChild(el);

          (function(idx) {
            el.addEventListener('mouseenter', function() { worksHoveredIdx = idx; });
            el.addEventListener('mouseleave', function() { worksHoveredIdx = -1; });
            el.addEventListener('click', function() { openWorksPopup(idx); });
          })(i);

          worksCards.push({el: el, idx: i});
        }

        worksView.addEventListener('wheel', function(e) {
          e.preventDefault(); e.stopPropagation();
          worksTargetScrollX += e.deltaY * 3.5;
        }, {passive: false});

        worksView.addEventListener('mousemove', function(e) {
          var rect = worksView.getBoundingClientRect();
          worksMouseX = e.clientX - rect.left;
        });
        worksView.addEventListener('mouseleave', function() { worksMouseX = worksViewCenter; });

        // Create popup
        if (!document.querySelector('.works-popup-overlay')) {
          var overlay = document.createElement('div');
          overlay.className = 'works-popup-overlay';
          overlay.style.cssText = 'position:fixed;inset:0;z-index:500;background:rgba(0,0,0,0.92);opacity:0;visibility:hidden;transition:opacity 0.45s ease;pointer-events:none;';
          overlay.innerHTML = '<div class="works-popup-panel" style="position:absolute;top:0;right:0;width:60%;height:100%;background:var(--bg-primary);transform:translateX(100%);transition:transform 0.5s cubic-bezier(0.22,1,0.36,1);display:flex;flex-direction:column;overflow-y:auto;border-left:1px solid rgba(255,255,255,0.06);"><div style="padding:48px 52px 28px;display:flex;align-items:flex-start;justify-content:space-between;"><div><div style="font-size:0.72rem;color:var(--text-secondary);letter-spacing:0.08em;text-transform:uppercase;margin-bottom:8px;">Case Study</div></div><button class="works-popup-close" style="width:40px;height:40px;border:1px solid rgba(255,255,255,0.1);background:transparent;color:var(--text-secondary);cursor:pointer;font-size:1.1rem;display:flex;align-items:center;justify-content:center;transition:all 0.2s;border-radius:6px;">✕</button></div><div style="padding:0 52px 60px;flex:1;"><h1 style="font-size:2.4rem;font-weight:900;letter-spacing:-0.03em;margin-bottom:16px;"></h1><p style="font-size:0.92rem;line-height:1.75;color:var(--text-secondary);margin-bottom:18px;"></p><div class="works-popup-preview" style="width:100%;aspect-ratio:16/10;border-radius:8px;margin:28px 0;display:flex;align-items:center;justify-content:center;font-size:1.2rem;font-weight:800;letter-spacing:0.04em;"></div><p style="font-size:0.82rem;line-height:1.7;color:var(--text-secondary);">这里是案例的详细描述。可以在此添加项目背景、设计过程、技术细节等内容。</p></div></div>';
          document.body.appendChild(overlay);

          overlay.addEventListener('click', function(e) { if (e.target === this) closeWorksPopup(); });
          overlay.querySelector('.works-popup-close').addEventListener('click', closeWorksPopup);
        }

        worksAnimFrame = requestAnimationFrame(updateWorks3D);
      }

      function fisheye(x) {
        var absX = Math.abs(x);
        if (absX > FOCUS_RANGE) return x;
        var t = 1 - absX / FOCUS_RANGE;
        var boost = 1 + FISHEYE * t * t;
        return x * boost;
      }

      function updateWorks3D() {
        worksScrollX += (worksTargetScrollX - worksScrollX) * 0.05;
        var maxScroll = (NUM - 1) * BASE_GAP * 4;
        if (worksScrollX > maxScroll) worksScrollX = maxScroll;
        if (worksScrollX < -maxScroll) worksScrollX = -maxScroll;

        var positions = [];
        for (var i = 0; i < NUM; i++) {
          var logicalX = (i - (NUM - 1) / 2) * BASE_GAP + worksScrollX;
          var visualX = fisheye(logicalX);
          var screenX = worksViewCenter + visualX;
          var dist = Math.abs(screenX - worksMouseX);
          var z = MIN_Z;
          if (dist < FOCUS_RANGE) {
            var t = 1 - dist / FOCUS_RANGE;
            z = MIN_Z + (MAX_Z - MIN_Z) * Math.pow(t, 1.3);
          }
          positions.push({visualX: visualX, z: z, screenX: screenX});
        }

        var closestIdx = 0, closestDist = Infinity;
        for (var i = 0; i < NUM; i++) {
          var d = Math.abs(positions[i].screenX - worksMouseX);
          if (d < closestDist) { closestDist = d; closestIdx = i; }
        }

        for (var i = 0; i < NUM; i++) {
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
        var cardData = CARDS[idx];
        var overlay = document.querySelector('.works-popup-overlay');
        var panel = overlay.querySelector('.works-popup-panel');
        panel.querySelector('h1').textContent = cardData.title;
        panel.querySelector('p').textContent = cardData.info;
        var preview = panel.querySelector('.works-popup-preview');
        preview.style.background = theme.bg;
        preview.style.color = theme.fg;
        preview.textContent = cardData.title + ' — Preview';
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

      // Hook into page transition
      var origScrollToPage = window.scrollToPage;
      window.scrollToPage = function(idx) {
        if (origScrollToPage) origScrollToPage(idx);
        if (idx === 1) {
          setTimeout(initWorks3D, 600);
        } else {
          if (worksAnimFrame) { cancelAnimationFrame(worksAnimFrame); worksAnimFrame = null; }
          worksInitialized = false;
          if (worksStage) { worksStage.innerHTML = ''; worksCards = []; }
        }
      };

      // Check on load
      document.addEventListener('DOMContentLoaded', function() {
        setTimeout(function() {
          var worksPage = document.getElementById('page1');
          if (worksPage && worksPage.classList.contains('active')) {
            initWorks3D();
          }
        }, 1500);
      });
    })();
