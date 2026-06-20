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
