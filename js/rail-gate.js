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
    if (railName) railName.textContent = label[0] + ' · ' + label[1];
    if (washLabel) washLabel.textContent = label[0] + ' ' + label[1];
    if (railNo) railNo.textContent = String(index + 1).padStart(2, '0') + '/05';
    rail.setAttribute('aria-label', '前往' + label[0] + ' · ' + label[1] + (phoneLayout.matches ? '。在底栏内向上拉动，或按回车进入。' : '。在侧栏内按住向左拖动，或按回车进入。'));
    tip.textContent = phoneLayout.matches ? '向上拉动，即刻切页 ↑' : '轻轻左拖，即刻切页 ←';
  }

  function reset() {
    if (committing) return;
    pressed = null;
    rail.classList.remove('rail-dragging', 'rail-expanded');
    rail.style.removeProperty('--drag-width');
    rail.style.removeProperty('--drag-height');
    if (progress) progress.textContent = '0%';
    if (wash) wash.style.opacity = 0;
  }

  function commit(href, index) {
    if (committing) return;
    if (typeof index === 'number') selectTarget(index, href);
    else if (href) target = href;
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
    if (event.pointerType === 'touch') rail.classList.add('rail-expanded');
    pressed = { id: event.pointerId, x: event.clientX, y: event.clientY, dx: 0, dy: 0, vertical:phoneLayout.matches, height:rail.getBoundingClientRect().height, width: rail.getBoundingClientRect().width, threshold: event.pointerType === 'touch' ? 40 : 24 };
    rail.setPointerCapture(event.pointerId);
  });
  rail.addEventListener('pointermove', function (event) {
    if (!pressed || event.pointerId !== pressed.id) return;
    pressed.dx = Math.max(0, pressed.vertical ? pressed.y-event.clientY : pressed.x-event.clientX);
    pressed.dy = Math.abs(pressed.vertical ? event.clientX-pressed.x : event.clientY-pressed.y);
    if (pressed.dy > 24 && pressed.dy > pressed.dx) { reset(); return; }
    if (pressed.dx < 5) return;
    if (pressed.dx >= pressed.threshold && pressed.dx > pressed.dy * 1.5) {
      var id = pressed.id;
      commit();
      if (rail.hasPointerCapture(id)) rail.releasePointerCapture(id);
      return;
    }
    rail.classList.add('rail-dragging');
    var amount = Math.min(.95, pressed.dx / pressed.threshold * .85);
    rail.style.setProperty('--drag-width', Math.min(innerWidth, pressed.width + pressed.dx) + 'px');
    if(pressed.vertical)rail.style.setProperty('--drag-height', Math.max(64,pressed.height + pressed.dx) + 'px');
    if (progress) progress.textContent = Math.round(amount * 100) + '%';
    if (wash) wash.style.opacity = amount;
  });
  rail.addEventListener('pointerup', function (event) {
    if (!pressed || event.pointerId !== pressed.id) return;
    var go = pressed.dx >= pressed.threshold && pressed.dx > pressed.dy * 1.5;
    pressed = null;
    if (rail.hasPointerCapture(event.pointerId)) rail.releasePointerCapture(event.pointerId);
    if (go) commit();
    else if (event.pointerType === 'touch' && matchMedia('(max-width:700px), (max-height:500px) and (pointer:coarse)').matches) {
      rail.classList.remove('rail-dragging');
      rail.style.removeProperty('--drag-width');
      rail.style.removeProperty('--drag-height');
      rail.classList.add('rail-expanded');
    } else reset();
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

  selectTarget(targetIndex);
  reset();
})();
