(()=>{
 'use strict';
 const reduce=matchMedia('(prefers-reduced-motion:reduce)');
 const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
 const room=document.querySelector('.toy-room');
 // Measurements only change on resize; the physics loop writes transforms.
 if(room){
  let width=0,height=0,visible=false,raf=0,last=0,gravity=true,arranged=false;
  const status=document.querySelector('#toy-status');
  const toys=[...room.querySelectorAll('.toy')].map((el,i)=>({el,i,x:0,y:0,vx:0,vy:0,angle:(i-2)*10,spin:0,w:0,h:0,held:false}));
  function paint(t){t.el.style.transform=`translate3d(${t.x}px,${t.y}px,0) rotate(${t.angle}deg)`}
  function measure(){width=room.clientWidth;height=room.clientHeight-18;toys.forEach((t,i)=>{t.w=t.el.offsetWidth;t.h=t.el.offsetHeight;t.x=clamp(width*(.12+(i%3)*.32)-t.w/2,0,width-t.w);t.y=clamp(height*(i<3?.25:.65)-t.h/2,0,height-t.h);paint(t)});last=0;wake()}
  function arrange(){arranged=true;toys.forEach((t,i)=>{t.x=clamp(width*(.16+(i%3)*.33)-t.w/2,0,width-t.w);t.y=clamp(height*(i<3?.27:.7)-t.h/2,0,height-t.h);t.vx=t.vy=t.spin=0;t.angle=0;if(window.gsap&&!reduce.matches)gsap.to(t.el,{duration:.7,transform:`translate3d(${t.x}px,${t.y}px,0) rotate(0deg)`,ease:'power3.out'});else paint(t)});status.textContent='秩序恢复了。再拖动一次，继续玩。'}
  function kick(t){arranged=false;const targets=t?[t]:toys;targets.forEach((o,i)=>{window.gsap?.killTweensOf(o.el);o.vx=(i%2?1:-1)*(160+Math.random()*240);o.vy=-250-Math.random()*260;o.spin=(Math.random()-.5)*160});status.textContent='一次意外，新的排列。';wake()}
  function wake(){if(!raf&&visible&&!document.hidden&&!reduce.matches)raf=requestAnimationFrame(step)}
  function step(now){raf=0;const dt=Math.min(.032,(now-(last||now-16))/1000);last=now;
   if(!arranged){toys.forEach(t=>{if(t.held)return;t.vy+=gravity?760*dt:0;const friction=Math.exp(-dt*(gravity?.5:1.6));t.vx*=friction;t.vy*=gravity?1:friction;t.spin*=Math.exp(-dt*1.4);t.x+=t.vx*dt;t.y+=t.vy*dt;t.angle+=t.spin*dt;
    if(t.x<0||t.x>width-t.w){t.x=clamp(t.x,0,width-t.w);t.vx*=-.68;t.spin*=-.6}
    if(t.y<0||t.y>height-t.h){t.y=clamp(t.y,0,height-t.h);t.vy*=-.56;if(Math.abs(t.vy)<24)t.vy=0;t.vx*=.86}
   });
   for(let i=0;i<toys.length;i++)for(let j=i+1;j<toys.length;j++){const a=toys[i],b=toys[j],dx=b.x+b.w/2-a.x-a.w/2,dy=b.y+b.h/2-a.y-a.h/2,r=(Math.min(a.w,a.h)+Math.min(b.w,b.h))*.42,d=Math.hypot(dx,dy);if(d<r&&d>.01){const nx=dx/d,ny=dy/d,push=(r-d)/2;if(!a.held){a.x-=nx*push;a.y-=ny*push}if(!b.held){b.x+=nx*push;b.y+=ny*push}const v=(b.vx-a.vx)*nx+(b.vy-a.vy)*ny;if(v<0){const impulse=-v*.72;if(!a.held){a.vx-=nx*impulse;a.vy-=ny*impulse}if(!b.held){b.vx+=nx*impulse;b.vy+=ny*impulse}}}}
   toys.forEach(t=>{t.x=clamp(t.x,0,width-t.w);t.y=clamp(t.y,0,height-t.h);paint(t)});
   }wake();
  }
  toys.forEach(t=>{let drag=null;t.el.onpointerdown=e=>{if(e.button!==0)return;window.gsap?.killTweensOf(t.el);arranged=false;t.held=true;t.vx=t.vy=0;drag={x:e.clientX,y:e.clientY,ox:t.x,oy:t.y,lx:e.clientX,ly:e.clientY,time:performance.now()};t.el.setPointerCapture(e.pointerId);t.el.style.zIndex='10'};
   t.el.onpointermove=e=>{if(!drag)return;const now=performance.now(),dt=Math.max(8,now-drag.time)/1000;t.x=clamp(drag.ox+e.clientX-drag.x,0,width-t.w);t.y=clamp(drag.oy+e.clientY-drag.y,0,height-t.h);t.vx=clamp((e.clientX-drag.lx)/dt,-1100,1100);t.vy=clamp((e.clientY-drag.ly)/dt,-1100,1100);t.angle+=(e.clientX-drag.lx)*.12;drag.lx=e.clientX;drag.ly=e.clientY;drag.time=now;paint(t)};
   const end=e=>{if(!drag)return;if(performance.now()-drag.time>100||reduce.matches)t.vx=t.vy=0;t.spin=t.vx*.12;t.held=false;drag=null;t.el.style.zIndex='';if(t.el.hasPointerCapture(e.pointerId))t.el.releasePointerCapture(e.pointerId);wake()};t.el.onpointerup=end;t.el.onpointercancel=end;
   t.el.onkeydown=e=>{const d={ArrowLeft:[-20,0],ArrowRight:[20,0],ArrowUp:[0,-20],ArrowDown:[0,20]}[e.key];if(d){e.preventDefault();arranged=true;t.x=clamp(t.x+d[0],0,width-t.w);t.y=clamp(t.y+d[1],0,height-t.h);paint(t)}else if(e.key==='Enter'||e.key===' '){e.preventDefault();if(reduce.matches){t.angle+=45;paint(t)}else kick(t)}};
  });
  document.querySelectorAll('[data-toy-action]').forEach(b=>b.onclick=()=>{if(b.dataset.toyAction==='arrange')arrange();else if(b.dataset.toyAction==='gravity'){gravity=!gravity;b.setAttribute('aria-pressed',String(gravity));b.textContent=gravity?'重力：开 ↓':'重力：关 ↗';status.textContent=gravity?'松手后，图形会落下来。':'没有重力，轻轻推开它们。';arranged=false;wake()}else if(reduce.matches){toys.forEach(t=>{t.angle+=45;paint(t)})}else kick()});
  new ResizeObserver(measure).observe(room);new IntersectionObserver(([e])=>{visible=e.isIntersecting;if(!visible){cancelAnimationFrame(raf);raf=0}else{last=0;wake()}},{rootMargin:'100px'}).observe(room);
  document.addEventListener('visibilitychange',()=>{if(document.hidden){cancelAnimationFrame(raf);raf=0}else{last=0;wake()}});reduce.addEventListener('change',()=>{if(reduce.matches){cancelAnimationFrame(raf);raf=0;arrange()}else wake()});
 }
 const arena=document.querySelector('.type-arena');
 if(arena){const letters=[...arena.querySelectorAll('.type-piece')].map(el=>({el,x:0,y:0,r:0}));let w=0,h=0;
  function paint(t,animated=false){const transform=`translate3d(${t.x}px,${t.y}px,0) rotate(${t.r}deg)`;if(animated&&window.gsap&&!reduce.matches)gsap.to(t.el,{transform,duration:.9,ease:'elastic.out(1,.6)',overwrite:true});else t.el.style.transform=transform}
  function reset(){letters.forEach((t,i)=>{t.x=(w/4)*i+(w/4-t.el.offsetWidth)/2;t.y=(h-t.el.offsetHeight)/2;t.r=0;paint(t,true)})}
  new ResizeObserver(()=>{w=arena.clientWidth;h=arena.clientHeight;reset()}).observe(arena);
  document.querySelector('[data-type-action=reset]').onclick=reset;
  document.querySelector('[data-type-action=scatter]').onclick=()=>letters.forEach((t,i)=>{t.x=clamp((i+.5)*w/4-t.el.offsetWidth/2+(Math.random()-.5)*w*.18,0,w-t.el.offsetWidth);t.y=Math.random()*(h-t.el.offsetHeight);t.r=(Math.random()-.5)*65;paint(t,true)});
  letters.forEach(t=>{let drag=null;t.el.onpointerdown=e=>{if(e.button!==0)return;window.gsap?.killTweensOf(t.el);drag={x:e.clientX,y:e.clientY,ox:t.x,oy:t.y};t.el.setPointerCapture(e.pointerId);t.el.style.zIndex='3'};t.el.onpointermove=e=>{if(!drag)return;t.x=clamp(drag.ox+e.clientX-drag.x,0,w-t.el.offsetWidth);t.y=clamp(drag.oy+e.clientY-drag.y,0,h-t.el.offsetHeight);t.r=clamp((e.clientX-drag.x)*.12,-25,25);paint(t)};const end=e=>{drag=null;t.el.style.zIndex='';if(t.el.hasPointerCapture(e.pointerId))t.el.releasePointerCapture(e.pointerId)};t.el.onpointerup=end;t.el.onpointercancel=end;t.el.onkeydown=e=>{const d={ArrowLeft:[-15,0],ArrowRight:[15,0],ArrowUp:[0,-15],ArrowDown:[0,15]}[e.key];if(d){e.preventDefault();t.x=clamp(t.x+d[0],0,w-t.el.offsetWidth);t.y=clamp(t.y+d[1],0,h-t.el.offsetHeight);paint(t)}}});
 }
 // Existing copy stays intact; the capabilities become an explicit accordion.
 document.querySelectorAll('.cap').forEach((cap,i)=>{const heading=cap.querySelector('h3,h2');const body=cap.querySelector('.cap__body');if(!heading||!body)return;const b=document.createElement('button');b.className='cap-play-toggle';b.type='button';b.textContent=heading.textContent;b.setAttribute('aria-expanded','true');body.id='cap-detail-'+i;b.setAttribute('aria-controls',body.id);const detail=document.createElement('div');detail.id=body.id;body.removeAttribute('id');[...body.children].filter(el=>el!==heading).forEach(el=>detail.append(el));body.append(detail);heading.replaceChildren(b);b.onclick=()=>{const open=b.getAttribute('aria-expanded')!=='true';b.setAttribute('aria-expanded',String(open));detail.hidden=!open;if(open&&window.gsap&&!reduce.matches)gsap.fromTo(detail,{y:24,opacity:0},{y:0,opacity:1,duration:.5})}});
 const orbit=document.querySelector('.contact-orbit');if(orbit){orbit.removeAttribute('aria-hidden');const b=document.createElement('button');b.className='contact-spinner';b.type='button';b.setAttribute('aria-label','转动星形');b.textContent=orbit.textContent;orbit.replaceChildren(b);let rotation=-12;b.onclick=()=>{rotation+=270;if(window.gsap&&!reduce.matches)gsap.to(orbit,{rotation,duration:1.5,ease:'elastic.out(1,.5)'});else orbit.style.transform=`rotate(${rotation}deg)`};}
 function motion(){if(!window.gsap||!window.ScrollTrigger)return;gsap.registerPlugin(ScrollTrigger);gsap.matchMedia().add('(prefers-reduced-motion:no-preference)',()=>{
  document.querySelectorAll('.lab-heading h2,.type-intro h2,.film-heading h2,.human-end h2').forEach(el=>gsap.from(el,{y:70,rotation:3,opacity:0,duration:1,ease:'power3.out',scrollTrigger:{trigger:el,start:'top 90%',once:true}}));
  gsap.matchMedia().add('(min-width:701px)',()=>{const film=document.querySelector('.film-chapter'),track=document.querySelector('.film-track'),win=document.querySelector('.film-window');if(!film)return;const distance=()=>Math.max(0,track.scrollWidth-win.clientWidth);const tl=gsap.timeline({scrollTrigger:{trigger:film,start:'top 40px',end:()=>'+='+distance(),pin:true,scrub:.6,invalidateOnRefresh:true}});tl.to(track,{x:()=>-distance(),ease:'none'},0).to('.film-progress span',{scaleX:1,ease:'none'},0);});
  document.querySelectorAll('.film-card').forEach((el,i)=>gsap.from(el,{y:80,rotate:i%2?5:-5,duration:1,scrollTrigger:{trigger:'.film-chapter',start:'top 90%',once:true},delay:i*.1}));
  document.fonts.ready.then(()=>ScrollTrigger.refresh());
 });}
 if(window.gsap&&window.ScrollTrigger)motion();else window.addEventListener('motion-libraries-ready',motion,{once:true});
})();
