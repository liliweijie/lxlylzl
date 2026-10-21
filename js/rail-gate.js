(function () {
  'use strict';

  var rail = document.querySelector('.peek-rail');
  if (!rail) return;

  var routes = ['index.html', 'works.html', 'about.html', 'notes.html', 'contact.html'];
  var labels = [['首页', 'HOME'], ['作品', 'WORK'], ['关于', 'ABOUT'], ['碎碎念', 'NOTES'], ['联系', 'CONTACT']];
  var page = Number(document.body.dataset.page || 0);
  var targetIndex = (page + 1) % routes.length;
  var target = routes[targetIndex];
  var pressed = null;
  var committing = false;
  var spring=null,pullState={size:0};
  var wheelTarget = 0, wheelAmount = 0, wheelFrame = 0, wheelArmedAt = null;
  var reduced=matchMedia("(prefers-reduced-motion: reduce)");
  var preview=document.createElement("div");preview.className="rail-pull-preview";preview.setAttribute("aria-hidden","true");preview.innerHTML='<small>CONTINUE TO</small><h2></h2><p class="pull-action">继续拉动</p><div class="pull-track"><i></i></div>';rail.append(preview);
  var phoneLayout = matchMedia('(max-width:700px), (max-height:500px) and (pointer:coarse)');
  var progress = rail.querySelector('.peek-rail__pct');
  var wash = rail.querySelector('.peek-rail__wash');
  var washLabel = wash && wash.querySelector('span');
  var railName = rail.querySelector('.peek-rail__name');
  var railNo = rail.querySelector('.peek-rail__no');

  rail.removeAttribute('aria-hidden');
  rail.setAttribute('role', 'link');
  rail.tabIndex = 0;

  var tip = document.createElement('span');
  tip.className = 'peek-rail__tip';
  tip.textContent = '轻轻左拖，即刻切页 ←';
  rail.appendChild(tip);

  function selectTarget(index, href) {
    targetIndex = index;
    target = href || routes[index];
    var label = labels[index];
    preview.querySelector('h2').textContent=label[1];
    if (railName) railName.textContent = label[0] + ' · ' + label[1];
    if (washLabel) washLabel.textContent = label[0] + ' ' + label[1];
    if (railNo) railNo.textContent = String(index + 1).padStart(2, '0') + '/05';
    rail.setAttribute('aria-label', '前往' + label[0] + ' · ' + label[1] + (phoneLayout.matches ? '。轻点底栏，自动向上切换，或按回车进入。' : '。在侧栏内按住向左拖动，或在页面底部继续滚动，或按回车进入。'));
    tip.textContent = phoneLayout.matches ? '' : '轻轻左拖，即刻切页 ←';
  }

  function reset() {
    if(spring){spring.kill();spring=null;}
    if (committing) return;
    cancelAnimationFrame(wheelFrame);
    wheelFrame = 0; wheelTarget = 0; wheelAmount = 0; wheelArmedAt = null;
    pressed = null;
    rail.classList.remove('rail-dragging', 'rail-expanded', 'rail-wheel');
    delete rail.dataset.wheelProgress;
    rail.style.removeProperty('--drag-width');
    rail.style.removeProperty('--drag-height');
    rail.classList.remove('is-pull-ready');preview.querySelector('.pull-track i').style.transform='scaleX(0)';
    if (progress) progress.textContent = '0%';
    if (wash) wash.style.opacity = 0;
  }

  // The rail owns both manual pulls and bottom-of-document wheel navigation.
  // Wheel events already consumed by a carousel/editor must never change pages.
  function atBottom() {
    var doc = document.scrollingElement || document.documentElement;
    return Math.max(0, doc.scrollHeight - doc.clientHeight - doc.scrollTop) <= 6;
  }

  function wheelBlocked(event) {
    if (event.defaultPrevented || event.ctrlKey || event.metaKey || event.altKey || event.shiftKey) return true;
    if (document.querySelector('dialog[open],.work-overlay.is-open,.rewind-overlay.is-open,.space-header.is-menu-open')) return true;
    if (getComputedStyle(document.body).overflowY === 'hidden' || getComputedStyle(document.documentElement).overflowY === 'hidden') return true;
    var node = event.target instanceof Element ? event.target : null;
    if (node && node.closest('input,textarea,select,[contenteditable]:not([contenteditable="false"]),.space-header,[data-wheel-navigation="off"]')) return true;
    for (; node && node !== document.body && node !== document.documentElement; node = node.parentElement) {
      var style = getComputedStyle(node);
      if (/(auto|scroll|overlay)/.test(style.overflowY) && node.scrollHeight > node.clientHeight + 2) return true;
      if (/(auto|scroll|overlay)/.test(style.overflowX) && node.scrollWidth > node.clientWidth + 2) return true;
    }
    return false;
  }

  function renderWheel() {
    wheelFrame = 0;
    if (committing) return;
    if (!atBottom()) { reset(); return; }
    wheelAmount = reduced.matches ? wheelTarget : wheelAmount + (wheelTarget - wheelAmount) * .2;
    if (Math.abs(wheelTarget - wheelAmount) < .001) wheelAmount = wheelTarget;
    if (wheelTarget === 0 && wheelAmount === 0) { reset(); return; }
    var vertical = phoneLayout.matches, extent = vertical ? innerHeight : innerWidth;
    rail.classList.add('rail-dragging', 'rail-wheel');
    rail.classList.remove('rail-expanded', 'is-pull-ready');
    rail.style.setProperty(vertical ? '--drag-height' : '--drag-width', (10 + (extent - 10) * wheelAmount) + 'px');
    rail.dataset.wheelProgress = String(Math.round(wheelAmount * 100));
    preview.querySelector('.pull-action').textContent = '继续滚动，进入' + labels[targetIndex][0] + ' · ' + Math.round(wheelAmount * 100) + '%';
    preview.querySelector('.pull-track i').style.transform = 'scaleX(' + wheelAmount + ')';
    if (progress) progress.textContent = Math.round(wheelAmount * 100) + '%';
    if (wheelAmount === 1) { commit(); return; }
    if (wheelAmount !== wheelTarget) wheelFrame = requestAnimationFrame(renderWheel);
  }

  window.addEventListener('wheel', function (event) {
    if (committing || pressed || wheelBlocked(event) || Math.abs(event.deltaX) > Math.abs(event.deltaY)) return;
    if (!atBottom()) { if (wheelArmedAt !== null || wheelAmount) reset(); return; }
    var delta = event.deltaY * (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? innerHeight : 1);
    if (!Number.isFinite(delta) || Math.abs(delta) < .5) return;
    if (!wheelTarget && !wheelAmount && delta < 0) { wheelArmedAt = null; return; }
    // Let the last page-scroll gesture settle. One large wheel event cannot skip a page.
    if (wheelArmedAt === null) { wheelArmedAt = performance.now(); return; }
    if (performance.now() - wheelArmedAt < 180) return;
    event.preventDefault();
    if (spring) { spring.kill(); spring = null; }
    var distance = Math.max(1000, Math.min(1600, innerWidth * .95));
    wheelTarget = Math.max(0, Math.min(1, wheelTarget + Math.max(-120, Math.min(120, delta)) / distance));
    if (!wheelFrame) wheelFrame = requestAnimationFrame(renderWheel);
  }, { passive: false });
  window.addEventListener('scroll', function () {
    if (!committing && !atBottom() && (wheelArmedAt !== null || wheelAmount)) reset();
  }, { passive: true });

  function springBack(vertical,from) {
    if(!window.gsap||reduced.matches){reset();return;}
    pressed=null;rail.classList.remove('is-pull-ready');preview.querySelector('.pull-action').textContent='松开，回到这里';
    pullState.size=from;
    spring=gsap.to(pullState,{size:vertical?52:56,duration:.8,ease:'elastic.out(1,.5)',onUpdate:function(){rail.style.setProperty(vertical?'--drag-height':'--drag-width',Math.max(vertical?52:56,pullState.size)+'px')},onComplete:reset});
  }
  function commit(href, index) {
    if (committing) return;
    if (typeof index === 'number') selectTarget(index, href);
    else if (href) target = href;
    if(spring){spring.kill();spring=null;}
    cancelAnimationFrame(wheelFrame); wheelFrame = 0;
    preview.querySelector('.pull-action').textContent='走，继续逛';
    committing = true;
    pressed = null;
    rail.classList.remove('rail-dragging', 'rail-expanded');
    rail.classList.add('rail-cover');
    document.querySelectorAll('.space-links a').forEach(function(link){
      if(new URL(link.href,location.href).pathname.split('/').pop()===routes[targetIndex])link.setAttribute('aria-current','page');
      else link.removeAttribute('aria-current');
    });
    if (progress) progress.textContent = '100%';
    try { sessionStorage.setItem('lx:nav', JSON.stringify({ dir: 1, rail: true, ts: Date.now() })); } catch (e) {}
    window.setTimeout(function () { location.assign(target); }, matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 430);
  }

  /* Top navigation uses the same right-rail wipe as the manual next-page gesture. */
  document.querySelectorAll('.space-links a, .space-logo').forEach(function (link) {
    link.addEventListener('click', function (event) {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      if (link.target === '_blank' || link.hasAttribute('download')) return;
      var url = new URL(link.href, location.href);
      if (url.origin !== location.origin) return;
      var filename = url.pathname.split('/').pop() || 'index.html';
      var index = routes.indexOf(filename);
      if (index < 0 || index === page) return;
      event.preventDefault();
      commit(url.href, index);
    });
  });

  rail.addEventListener('pointerenter', function (event) {
    if (event.pointerType !== 'touch' && !committing) rail.classList.add('rail-expanded');
  });
  rail.addEventListener('pointerleave', function () {
    if (!pressed && !committing) rail.classList.remove('rail-expanded');
  });
  rail.addEventListener('pointerdown', function (event) {
    if (committing || event.button !== 0 || event.isPrimary === false) return;
    if (wheelArmedAt !== null || wheelAmount) reset();
    if(spring){spring.kill();spring=null;}
    if (event.pointerType === 'touch') rail.classList.add('rail-expanded');
    pressed = { id: event.pointerId, x: event.clientX, y: event.clientY, dx: 0, dy: 0, vertical:phoneLayout.matches, height:rail.getBoundingClientRect().height, width: rail.getBoundingClientRect().width, threshold:Math.min(180,Math.max(100,(phoneLayout.matches?innerHeight:innerWidth)*.16)) };
    rail.setPointerCapture(event.pointerId);
  });
  rail.addEventListener('pointermove', function (event) {
    if (!pressed || event.pointerId !== pressed.id) return;
    if(pressed.vertical)return; // Phone uses a tap-triggered wipe, never a pull preview.
    pressed.dx = Math.max(0, pressed.vertical ? pressed.y-event.clientY : pressed.x-event.clientX);
    pressed.dy = Math.abs(pressed.vertical ? event.clientX-pressed.x : event.clientY-pressed.y);
    if (pressed.dy > 24 && pressed.dy > pressed.dx) { reset(); return; }
    if (pressed.dx < 5) return;
    rail.classList.add('rail-dragging');
    var amount = Math.min(1,pressed.dx/pressed.threshold);
    rail.classList.toggle('is-pull-ready',amount>=1);
    preview.querySelector('.pull-action').textContent=amount>=1?'松手进入 '+labels[targetIndex][0]:'再拉一点 · '+Math.round(amount*100)+'%';
    preview.querySelector('.pull-track i').style.transform='scaleX('+amount+')';
    rail.style.setProperty('--drag-width', Math.min(innerWidth, pressed.width + pressed.dx) + 'px');
    if(pressed.vertical)rail.style.setProperty('--drag-height', Math.max(64,pressed.height + pressed.dx) + 'px');
    if (progress) progress.textContent = Math.round(amount * 100) + '%';
    if (wash) wash.style.opacity = amount;
  });
  rail.addEventListener('pointerup', function (event) {
    if (!pressed || event.pointerId !== pressed.id) return;
    if(pressed.vertical){
      var tapDistance=Math.hypot(event.clientX-pressed.x,event.clientY-pressed.y);
      pressed=null;
      if(rail.hasPointerCapture(event.pointerId))rail.releasePointerCapture(event.pointerId);
      if(tapDistance<=14)commit();else reset();
      return;
    }
    var pressedDistance=pressed.dx,crossDistance=pressed.dy;
    var go = pressed.dx >= pressed.threshold && pressed.dx > pressed.dy * 1.5;
    pressed = null;
    if (rail.hasPointerCapture(event.pointerId)) rail.releasePointerCapture(event.pointerId);
    if (go || (pressedDistance < 5 && crossDistance < 12)) commit();
    else springBack(phoneLayout.matches,phoneLayout.matches?rail.getBoundingClientRect().height:rail.getBoundingClientRect().width);
  });
  document.addEventListener('pointerdown', function (event) {
    if (!committing && !rail.contains(event.target)) reset();
  });
  rail.addEventListener('pointercancel', reset);
  rail.addEventListener('lostpointercapture', function () { if (pressed && !committing) reset(); });
  window.addEventListener('blur', function () { if (!committing) reset(); });
  window.addEventListener('resize', function () { if (!committing) reset(); });
  window.addEventListener('pageshow', function () {
    committing = false;
    rail.classList.remove('rail-cover');
    selectTarget((page + 1) % routes.length);
    reset();
    document.querySelectorAll('.space-links a').forEach(function(link){
      if(new URL(link.href,location.href).pathname.split('/').pop()===routes[page])link.setAttribute('aria-current','page');
      else link.removeAttribute('aria-current');
    });
  });
  phoneLayout.addEventListener('change',function(){if(!committing){reset();selectTarget(targetIndex)}});
  rail.addEventListener('keydown', function (event) {
    if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); commit(); }
    else if (event.key === 'Escape') reset();
  });
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && !committing && (wheelArmedAt !== null || wheelAmount)) reset();
  });

  selectTarget(targetIndex);
  reset();
})();
