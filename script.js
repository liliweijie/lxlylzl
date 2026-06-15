/* ===========================================
   LXLYLZL — Two-Framework UI (Ponytail-optimized)
   =========================================== */

(function () {
  'use strict';

  // Ponytail: removed 120-line canvas particle animation.
  // Decorative only; replaced with static CSS gradient background.

  // ========== DOM REFS ==========
  const mainContent   = document.getElementById('mainContent');
  const mainInner    = mainContent.querySelector('.main__inner');
  const sidebarNav   = document.getElementById('iconSidebar');
  const scrollProgress = document.getElementById('scrollProgress');
  const pageDots     = document.getElementById('pageDots');
  const scrollHint   = document.getElementById('scrollHint');
  const horizontalFw = document.getElementById('horizontalFramework');
  const verticalFw   = document.getElementById('verticalFramework');
  const pages         = document.querySelectorAll('.page');

  const PAGE_COUNT = 4;
  let currentPage = 0;
  let inVerticalFramework = false;

  // ========== LAYOUT WIDTHS ==========
  function updateLayoutWidths() {
    const pageWidth = mainContent.clientWidth;
    mainInner.style.width = (pageWidth * PAGE_COUNT) + 'px';
    pages.forEach(p => { p.style.width = pageWidth + 'px'; });
  }
  updateLayoutWidths();
  window.addEventListener('resize', () => {
    updateLayoutWidths();
    mainContent.scrollLeft = currentPage * mainContent.clientWidth;
  });

  // ========== HORIZONTAL SCROLL (Framework 1) ==========
  let scrollAnimRAF = null;

  mainContent.addEventListener('wheel', (e) => {
    if (inVerticalFramework) return;

    const isLastPage = currentPage >= PAGE_COUNT - 1;

    // Transition to Framework 2: on last page + scroll down
    if (isLastPage && e.deltaY > 0) {
      e.preventDefault();
      enterVerticalFramework();
      return;
    }

    // Normal horizontal scroll
    e.preventDefault();
    mainContent.scrollLeft += e.deltaY * 1.0;
  }, { passive: false });

  // Touch support (horizontal framework only)
  let touchStartX = 0, touchStartY = 0;
  mainContent.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
  }, { passive: true });
  mainContent.addEventListener('touchend', (e) => {
    if (inVerticalFramework) return;
    const dx = touchStartX - e.changedTouches[0].clientX;
    const dy = Math.abs(touchStartY - e.changedTouches[0].clientY);
    if (Math.abs(dx) > 50 && dy < 60) {
      const next = currentPage + (dx > 0 ? 1 : -1);
      if (next >= PAGE_COUNT) { enterVerticalFramework(); return; }
      scrollToPage(next);
    }
  }, { passive: true });

  // ========== VERTICAL SCROLL (Framework 2) ==========
  verticalFw.addEventListener('wheel', (e) => {
    if (!inVerticalFramework) return;

    // At top of vertical framework and scrolling up → back to horizontal
    if (verticalFw.scrollTop <= 0 && e.deltaY < 0) {
      e.preventDefault();
      exitVerticalFramework();
    }
  }, { passive: false });

  // Touch support for vertical framework
  let vfTouchStartY = 0;
  verticalFw.addEventListener('touchstart', (e) => {
    vfTouchStartY = e.touches[0].clientY;
  }, { passive: true });
  verticalFw.addEventListener('touchend', (e) => {
    if (!inVerticalFramework) return;
    const dy = vfTouchStartY - e.changedTouches[0].clientY;
    // Swipe up = scroll down (normal), swipe down at top = go back
    if (dy < -50 && verticalFw.scrollTop <= 0) {
      exitVerticalFramework();
    }
  }, { passive: true });

  // ========== FRAMEWORK TRANSITION ==========
  function enterVerticalFramework() {
    if (inVerticalFramework) return;
    inVerticalFramework = true;

    horizontalFw.classList.add('is-exiting');
    verticalFw.classList.add('is-visible');
    verticalFw.scrollTop = 0;

    // Fade out horizontal UI elements
    pageDots.style.opacity = '0';
    pageDots.style.pointerEvents = 'none';
    scrollProgress.style.opacity = '0';
  }

  function exitVerticalFramework() {
    if (!inVerticalFramework) return;
    inVerticalFramework = false;

    horizontalFw.classList.remove('is-exiting');
    verticalFw.classList.remove('is-visible');

    // Restore horizontal UI elements
    pageDots.style.opacity = '';
    pageDots.style.pointerEvents = '';
    scrollProgress.style.opacity = '';
  }

  // ========== SCROLL PROGRESS ==========
  mainContent.addEventListener('scroll', () => {
    if (inVerticalFramework) return;
    updateScrollProgress();
    updateActivePage();
  });

  function updateScrollProgress() {
    const maxScroll = mainContent.scrollWidth - mainContent.clientWidth;
    const progress = maxScroll > 0 ? mainContent.scrollLeft / maxScroll : 0;
    scrollProgress.style.transform = `scaleX(${progress})`;
  }

  function updateActivePage() {
    const pageWidth = mainContent.clientWidth;
    const newPage = Math.floor((mainContent.scrollLeft + pageWidth / 2) / pageWidth);
    if (newPage !== currentPage && newPage >= 0 && newPage < PAGE_COUNT) {
      currentPage = newPage;
      updateNavState();
      updateDotsState();
      toggleScrollHint();
    }
  }

  function updateNavState() {
    sidebarNav.querySelectorAll('.icon-sidebar__item').forEach((item, i) => {
      item.classList.toggle('icon-sidebar__item--active', i === currentPage);
    });
  }

  function updateDotsState() {
    pageDots.querySelectorAll('.page-dots__dot').forEach((dot, i) => {
      dot.classList.toggle('page-dots__dot--active', i === currentPage);
    });
  }

  // ========== SCROLL TO PAGE ==========
  function scrollToPage(pageIndex) {
    if (pageIndex < 0 || pageIndex >= PAGE_COUNT) return;

    if (scrollAnimRAF) cancelAnimationFrame(scrollAnimRAF);

    currentPage = pageIndex;
    const target = pageIndex * mainContent.clientWidth;
    const start = mainContent.scrollLeft;
    const dist = target - start;
    const duration = 650;
    const startTime = performance.now();

    function easeOutCubic(t) { return 1 - Math.pow(1 - t, 3); }

    function step(now) {
      const elapsed = now - startTime;
      const t = Math.min(elapsed / duration, 1);
      mainContent.scrollLeft = start + dist * easeOutCubic(t);
      if (t < 1) {
        scrollAnimRAF = requestAnimationFrame(step);
      } else {
        scrollAnimRAF = null;
      }
    }
    scrollAnimRAF = requestAnimationFrame(step);

    updateNavState();
    updateDotsState();
    toggleScrollHint();
  }

  // ========== SCROLL HINT ==========
  function toggleScrollHint() {
    if (!scrollHint) return;
    if (currentPage === 0) {
      scrollHint.style.opacity = '1';
      scrollHint.style.pointerEvents = 'auto';
    } else {
      scrollHint.style.opacity = '0';
      scrollHint.style.pointerEvents = 'none';
    }
  }

  // ========== NAV CLICKS ==========
  document.getElementById('sidebarNav').addEventListener('click', (e) => {
    const item = e.target.closest('.icon-sidebar__item');
    if (!item) return;
    const p = parseInt(item.dataset.page, 10);
    if (!isNaN(p)) scrollToPage(p);
  });

  pageDots.addEventListener('click', (e) => {
    const dot = e.target.closest('.page-dots__dot');
    if (!dot) return;
    scrollToPage(parseInt(dot.dataset.page, 10));
  });

  document.querySelectorAll('[data-page]').forEach(el => {
    el.addEventListener('click', () => {
      const p = parseInt(el.dataset.page, 10);
      if (!isNaN(p)) scrollToPage(p);
    });
  });

  // ========== KEYBOARD ==========
  document.addEventListener('keydown', (e) => {
    if (inVerticalFramework) {
      if (e.key === 'Escape') exitVerticalFramework();
      return;
    }
    if (e.key === 'ArrowRight') scrollToPage(currentPage + 1);
    if (e.key === 'ArrowLeft')  scrollToPage(currentPage - 1);
  });

  // ========== PAGE VISIBILITY (stagger fade-in) ==========
  // Ponytail: simplified from IntersectionObserver to CSS-only animation
  pages.forEach((p, i) => {
    p.style.animationDelay = `${i * 0.1}s`;
    p.classList.add('is-visible');
  });

  // ========== INIT ==========
  updateScrollProgress();
  updateNavState();
  updateDotsState();
  setTimeout(() => pages[0].classList.add('is-visible'), 1300);

})();
