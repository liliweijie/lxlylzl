(function () {
  'use strict';
  const reduced = matchMedia('(prefers-reduced-motion:reduce)');
  const frame = document.querySelector('#longformShowcase');
  if (frame) {
    const controls = document.querySelectorAll('[data-archive-action]');
    let frameVisible=true;const tellVisibility=()=>frame.contentWindow.postMessage({type:'longform-control',action:'visibility',visible:frameVisible},location.origin);
    new IntersectionObserver(([e])=>{frameVisible=e.isIntersecting;tellVisibility()}).observe(frame);frame.addEventListener('load',tellVisibility);
    controls.forEach(b => b.disabled = true);
    function ready(data) {
      document.querySelector('#archiveCount').textContent = String(data.index + 1).padStart(2, '0') + ' / ' + data.total;
      const title=document.querySelector('#archiveTitle');
      if(title.textContent!==data.title){title.textContent=data.title;if(window.gsap&&!reduced.matches)gsap.fromTo(title,{y:12,opacity:0},{y:0,opacity:1,duration:.4,overwrite:true})}
      const play=document.querySelector('[data-archive-action="play"]'),layout=document.querySelector('[data-archive-action="layout"]');
      if(play){play.textContent=data.playing?'暂停环绕':'自动环绕';play.setAttribute('aria-pressed',String(data.playing))}
      if(layout){layout.textContent=data.expanded?'收拢档案':'展开档案';layout.setAttribute('aria-pressed',String(data.expanded))}
      controls.forEach(b => b.disabled = false);
    }
    window.addEventListener('message', e => {
      if (e.origin !== location.origin || e.source !== frame.contentWindow) return;
      if (e.data?.type === 'longform-state') ready(e.data);
    });
    frame.addEventListener('load', () => frame.contentWindow.postMessage({type:'longform-control',action:'state'}, location.origin));
    frame.contentWindow.postMessage({type:'longform-control',action:'state'}, location.origin);
    controls.forEach(b => b.addEventListener('click', () => frame.contentWindow.postMessage({type:'longform-control',action:b.dataset.archiveAction}, location.origin)));
  }
  const trail = document.createElement('div');
  trail.className = 'motion-trail'; trail.textContent = 'OPEN'; trail.hidden = true; trail.setAttribute('aria-hidden', 'true');
  document.body.append(trail);
  document.addEventListener('pointermove', e => {
    const card = e.target.closest('.work-card');
    trail.hidden = !card || reduced.matches || e.pointerType !== 'mouse';
    if (!trail.hidden) trail.style.transform = `translate(${e.clientX + 16}px,${e.clientY + 16}px)`;
  });
  document.addEventListener('pointerleave', () => trail.hidden = true);
  // Touch-first directory. The existing rail still handles page transitions.
  const rail=document.querySelector('.peek-rail'),header=document.querySelector('.space-header');
  if(rail&&header){
    const toggle=document.createElement('button');toggle.type='button';toggle.className='motion-menu-toggle';toggle.innerHTML='<span class="menu-lines" aria-hidden="true"><i></i><i></i></span><span>目录</span>';toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-controls','motion-directory');
    const drawer=document.createElement('dialog');drawer.id='motion-directory';drawer.className='motion-directory';drawer.setAttribute('aria-label','网站目录');
    drawer.innerHTML='<header><span>lXlYlZl / DIRECTORY</span><button type="button" class="directory-close" aria-label="关闭目录">关闭 ×</button></header><nav aria-label="页面目录"></nav><p>选一页，继续逛。</p>';
    const destinations=[['index.html','HOME','首页'],['works.html','WORK','作品'],['about.html','ABOUT','关于'],['notes.html','NOTES','碎碎念'],['contact.html','CONTACT','联系']];
    destinations.forEach(([href,en,cn],i)=>{const a=document.createElement('a');a.href=href;a.innerHTML='<small>'+String(i+1).padStart(2,'0')+'</small><strong>'+en+'</strong><span>'+cn+'</span>';if(Number(document.body.dataset.page||0)===i)a.setAttribute('aria-current','page');drawer.querySelector('nav').append(a);a.onclick=e=>{const link=header.querySelector('.space-links a[href="'+href+'"]');if(link){e.preventDefault();closeMenu();link.click()}}});
    document.body.append(toggle,drawer);
    function closeMenu(){if(!drawer.open)return;toggle.setAttribute('aria-expanded','false');drawer.close();toggle.focus({preventScroll:true})}
    toggle.onclick=()=>{drawer.showModal();toggle.setAttribute('aria-expanded','true');if(window.gsap&&!reduced.matches){gsap.fromTo(drawer,{x:'100%'},{x:0,duration:.65,ease:'power4.out'});gsap.fromTo(drawer.querySelectorAll('nav a'),{y:45,opacity:0,rotate:-3},{y:0,opacity:1,rotate:0,duration:.7,stagger:.07,delay:.12,ease:'power3.out'})}};
    drawer.querySelector('.directory-close').onclick=closeMenu;
    drawer.addEventListener('click',e=>{if(e.target===drawer){const r=drawer.getBoundingClientRect();if(e.clientX<r.left||e.clientY<r.top||e.clientX>r.right||e.clientY>r.bottom)closeMenu()}});
    drawer.addEventListener('close',()=>{toggle.setAttribute('aria-expanded','false');toggle.focus({preventScroll:true})});
  }
  if (!window.gsap || !window.ScrollTrigger) return;
  gsap.registerPlugin(ScrollTrigger);
  gsap.matchMedia().add('(prefers-reduced-motion: no-preference)', () => {
    // Home's existing WebGL stage is deliberately outside these selectors.
    const sections = document.querySelectorAll('.works-stage__heading,.notes-head,.about-hero__grid,.contact-main,.playground .editorial-intro');
    sections.forEach(section => gsap.from(section, {opacity:0,y:28,duration:.8,ease:'power3.out',scrollTrigger:{trigger:section,start:'top 92%',once:true}}));
    const mounted = new WeakSet();
    function mountCovers() {
      document.querySelectorAll('.work-card__cover').forEach(cover => {
        if (mounted.has(cover)) return;
        mounted.add(cover);
        const card=cover.closest('.work-card');
        if(card)gsap.from(card,{y:100,rotate:card.matches(':nth-child(even)')?4:-4,opacity:.3,ease:'none',scrollTrigger:{trigger:card,start:'top 100%',end:'top 65%',scrub:.5}});
        gsap.fromTo(cover,{scale:.92},{scale:1,ease:'none',scrollTrigger:{trigger:cover,start:'top 95%',end:'top 35%',scrub:.45}});
      });
      ScrollTrigger.refresh();
    }
    mountCovers();
    const grid = document.querySelector('.works-grid__cols');
    const observer = grid && new MutationObserver(mountCovers);
    if (observer) observer.observe(grid,{childList:true,subtree:true});
    const heading = document.querySelector('.works-stage__heading');
    if(heading){
      gsap.from(heading.querySelectorAll('h1 span,h1 i'),{yPercent:110,rotate:6,opacity:0,duration:1.2,stagger:.12,ease:'power4.out'});
      gsap.from('.archive-modes,.works-stage__controls',{y:20,opacity:0,duration:.8,delay:.55,stagger:.1});
    }
    const notesTitle=document.querySelector('.notes-head h1');
    if(notesTitle)gsap.from(notesTitle,{x:-70,rotate:-4,duration:1.1,ease:'elastic.out(1,.65)'});

    if (heading) gsap.to(heading,{y:-16,opacity:.45,ease:'none',scrollTrigger:{trigger:'.works-stage',start:'top top',end:'bottom 25%',scrub:.5}});
    document.querySelectorAll('.about-copy p,.about-hero__paras p').forEach(p => gsap.fromTo(p,{opacity:.3},{opacity:1,ease:'none',scrollTrigger:{trigger:p,start:'top 90%',end:'top 50%',scrub:true}}));
    document.fonts.ready.then(() => ScrollTrigger.refresh());
    return () => observer?.disconnect();
  });
})();
