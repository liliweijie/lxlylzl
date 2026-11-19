(function () {
  'use strict';

  var rail = document.querySelector('.peek-rail');
  if (!rail || !window.lxNavigation) return;

  var nav = window.lxNavigation;
  var pages = nav.pages;
  var page = nav.current;
  var targetIndex = (page + 1) % pages.length;
  var target = pages[targetIndex].path;
  var pressed = null;
  var committing = false;
  var spring=null,pullState={size:0};
  var wheelTarget = 0, wheelAmount = 0, wheelFrame = 0, wheelArmedAt = null;
  var reduced=matchMedia("(prefers-reduced-motion: reduce)");
  var preview=document.createElement("div");preview.className="rail-pull-preview";preview.setAttribute("aria-hidden","true");preview.innerHTML='<small>CONTINUE TO</small><h2></h2><p class="pull-action">继续拉动</p><div class="pull-track"><i></i></div>';rail.append(preview);
  var phoneLayout = matchMedia('(max-width:700px), (max-height:500px) and (pointer:coarse)');
  var logo = document.querySelector('.space-logo');
  var header = logo?.closest('.space-header');
  var logoDragged = false;
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
    var item = pages[index];
    target = href || item.path;
    preview.querySelector('h2').textContent=item.en;
    if (railName) railName.textContent = item.cn + ' · ' + item.en;
    if (washLabel) washLabel.textContent = item.cn + ' ' + item.en;
    if (railNo) railNo.textContent = String(index + 1).padStart(2, '0') + '/' + String(pages.length).padStart(2, '0');
    rail.setAttribute('aria-label', '前往' + item.cn + ' · ' + item.en + (phoneLayout.matches ? '。向下拖动 Logo 进入。' : '。在侧栏内按住向左拖动，或在页面底部继续滚动，或按回车进入。'));
    tip.textContent = phoneLayout.matches ? '' : '轻轻左拖，即刻切页 ←';
  }

  function reset() {
    if(spring){spring.kill();spring=null;}
    if (committing) return;
    cancelAnimationFrame(wheelFrame);
    wheelFrame = 0; wheelTarget = 0; wheelAmount = 0; wheelArmedAt = null;
    var previous = pressed;
    pressed = null;
    if (previous && previous.surface.hasPointerCapture(previous.id)) previous.surface.releasePointerCapture(previous.id);
    rail.classList.remove('rail-dragging', 'rail-expanded', 'rail-wheel');
    delete rail.dataset.wheelProgress;
    rail.style.removeProperty('--drag-width');
    rail.style.removeProperty('--drag-height');
    header?.classList.remove('is-logo-pulling');
    header?.style.removeProperty('--logo-pull');
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
    if (document.querySelector('dialog[open],.work-overlay.is-open,.rewind-overlay.is-open')) return true;
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
    var extent = innerWidth;
    rail.classList.add('rail-dragging', 'rail-wheel');
    rail.classList.remove('rail-expanded', 'is-pull-ready');
    rail.style.setProperty('--drag-width', (10 + (extent - 10) * wheelAmount) + 'px');
    rail.dataset.wheelProgress = String(Math.round(wheelAmount * 100));
    preview.querySelector('.pull-action').textContent = '继续滚动，进入' + pages[targetIndex].cn + ' · ' + Math.round(wheelAmount * 100) + '%';
    preview.querySelector('.pull-track i').style.transform = 'scaleX(' + wheelAmount + ')';
    if (progress) progress.textContent = Math.round(wheelAmount * 100) + '%';
    if (wheelAmount === 1) { commit(); return; }
    if (wheelAmount !== wheelTarget) wheelFrame = requestAnimationFrame(renderWheel);
  }

  window.addEventListener('wheel', function (event) {
    if (phoneLayout.matches || committing || pressed || wheelBlocked(event) || Math.abs(event.deltaX) > Math.abs(event.deltaY)) return;
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

  function updateLogoPull(amount) {
    if(!header)return;
    header.classList.add('is-logo-pulling');
    header.style.setProperty('--logo-pull',Math.max(0,Math.min(1,amount)));
  }

  function springBack(vertical,from,idle,threshold) {
    if(!window.gsap||reduced.matches){reset();return;}
    pressed=null;rail.classList.remove('is-pull-ready');preview.querySelector('.pull-action').textContent='松开，回到这里';
    pullState.size=from;
    spring=gsap.to(pullState,{
      size:idle,duration:.8,ease:'elastic.out(1,.5)',
      onUpdate:function(){
        rail.style.setProperty(vertical?'--drag-height':'--drag-width',Math.max(idle,pullState.size)+'px');
        if(vertical)updateLogoPull((pullState.size-idle)/threshold);
      },
      onComplete:reset
    });
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
    nav.links.forEach(function(link,index){
      if(index===targetIndex)link.setAttribute('aria-current','page');
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
      var index = nav.links.indexOf(link);
      if (link === logo) {
        if (phoneLayout.matches) return;
        index = 0;
      }
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
  function beginPull(event, surface, vertical) {
    if (committing || event.button !== 0 || event.isPrimary === false) return;
    if (wheelArmedAt !== null || wheelAmount || spring) reset();
    if (vertical) logoDragged = false;
    var size = vertical ? surface.closest('.space-header').getBoundingClientRect().height : rail.getBoundingClientRect().width;
    var threshold = vertical ? Math.min(132,Math.max(76,innerHeight*.13)) : Math.min(180,Math.max(100,innerWidth*.16));
    pressed = {id:event.pointerId,surface:surface,vertical:vertical,x:event.clientX,y:event.clientY,along:0,across:0,size:size,threshold:threshold};
    surface.setPointerCapture(event.pointerId);
  }
  function movePull(event) {
    if (!pressed || event.pointerId !== pressed.id) return;
    var x=event.clientX-pressed.x,y=event.clientY-pressed.y;
    pressed.along=Math.max(0,pressed.vertical?y:-x);
    pressed.across=Math.abs(pressed.vertical?x:y);
    if(pressed.vertical&&Math.hypot(x,y)>8)logoDragged=true;
    if(!pressed.vertical&&pressed.across>24&&pressed.across>pressed.along){reset();return;}
    if(!rail.classList.contains('rail-dragging')&&(pressed.along<8||pressed.along<pressed.across))return;
    rail.classList.add('rail-dragging');
    var amount = Math.min(1,pressed.along/pressed.threshold);
    if(pressed.vertical)updateLogoPull(amount);
    var ready=amount>=1&&pressed.along>pressed.across*1.5;
    rail.classList.toggle('is-pull-ready',ready);
    preview.querySelector('.pull-action').textContent=ready?'松手进入 '+pages[targetIndex].cn:'再拉一点 · '+Math.round(amount*100)+'%';
    preview.querySelector('.pull-track i').style.transform='scaleX('+amount+')';
    var extent=pressed.vertical?innerHeight:innerWidth;
    rail.style.setProperty(pressed.vertical?'--drag-height':'--drag-width',Math.min(extent,pressed.size+pressed.along)+'px');
    if (progress) progress.textContent = Math.round(amount * 100) + '%';
    if (wash) wash.style.opacity = amount;
  }
  function finishPull(event) {
    if (!pressed || event.pointerId !== pressed.id) return;
    var pull=pressed;
    var go = pull.along >= pull.threshold && pull.along > pull.across * 1.5;
    pressed = null;
    if (pull.surface.hasPointerCapture(event.pointerId)) pull.surface.releasePointerCapture(event.pointerId);
    if (go || (!pull.vertical&&pull.along<5&&pull.across<12)) commit();
    else if (rail.classList.contains('rail-dragging')) {
      var bounds=rail.getBoundingClientRect();
      springBack(pull.vertical,pull.vertical?bounds.height:bounds.width,pull.vertical?pull.size:56,pull.threshold);
    } else reset();
  }
  for(const surface of [rail,logo]){
    if(!surface)continue;
    surface.addEventListener('pointerdown',event=>{
      const vertical=surface===logo;
      if(vertical===phoneLayout.matches)beginPull(event,surface,vertical);
    });
    surface.addEventListener('pointermove',movePull);
    surface.addEventListener('pointerup',finishPull);
    surface.addEventListener('pointercancel',reset);
    surface.addEventListener('lostpointercapture',()=>{if(pressed&&!committing)reset()});
  }
  logo?.addEventListener('click',event=>{
    if(!phoneLayout.matches||event.detail===0||(!logoDragged&&!committing))return;
    event.preventDefault();
    event.stopImmediatePropagation();
  },true);
  document.addEventListener('pointerdown', function (event) {
    if (!committing && !rail.contains(event.target) && !(phoneLayout.matches&&logo?.contains(event.target))) reset();
  });
  window.addEventListener('blur', function () { if (!committing) reset(); });
  window.addEventListener('resize', function () { if (!committing) reset(); });
  window.addEventListener('pageshow', function (event) {
    if (!event.persisted) return;
    committing = false;
    rail.classList.remove('rail-cover');
    selectTarget((page + 1) % pages.length);
    reset();
    nav.links.forEach(function(link,index){
      if(index===page)link.setAttribute('aria-current','page');
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
