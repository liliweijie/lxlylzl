(function(){
 'use strict';
 const section=document.getElementById('logo-end');
 if(!section)return;
 const art=document.getElementById('logoEndArt'),button=document.getElementById('logoEndPause'),status=document.getElementById('logoEndStatus');
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 let svg,visible=false,pausedByUser=false,loading=false;
 function sync(){
  const running=!!svg&&visible&&!document.hidden&&!pausedByUser&&!reduced.matches;
  if(svg)for(const animation of svg.getAnimations({subtree:true}))running?animation.play():animation.pause();
  section.dataset.playing=String(running);
  button.hidden=reduced.matches||section.dataset.error==='true';
  button.textContent=pausedByUser?'播放动效':'暂停动效';
  button.setAttribute('aria-pressed',String(pausedByUser));
 }
 async function load(){
  if(loading||svg)return;
  loading=true;
  try{
   const response=await fetch('assets/logo-motion.svg?v=9');
   if(!response.ok)throw new Error('Logo could not be loaded');
   const parsed=new DOMParser().parseFromString(await response.text(),'image/svg+xml');
   if(parsed.querySelector('parsererror'))throw new Error('Invalid logo SVG');
   svg=document.importNode(parsed.documentElement,true);
   art.replaceChildren(svg);art.setAttribute('aria-busy','false');
   status.textContent='动态标志已载入';section.dataset.ready='true';button.disabled=false;sync();
  }catch(error){
   section.dataset.error='true';art.setAttribute('aria-busy','false');button.hidden=true;
   status.textContent='动效暂未载入，正在显示静态标志。';
   console.warn('Homepage logo:',error.message);
  }
 }
 const preload=new IntersectionObserver(([entry])=>{if(entry.isIntersecting){load();preload.disconnect();}},{rootMargin:'500px'});
 preload.observe(section);
 new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;sync();},{threshold:.2}).observe(section);
 button.onclick=()=>{pausedByUser=!pausedByUser;sync();};
 document.addEventListener('visibilitychange',sync);reduced.addEventListener('change',sync);
 if(location.hash==='#logo-end'){
  let moved=false;
  for(const event of ['wheel','touchstart','pointerdown','keydown'])window.addEventListener(event,()=>{moved=true;},{once:true,passive:true});
  window.addEventListener('load',()=>document.fonts.ready.then(()=>requestAnimationFrame(()=>requestAnimationFrame(()=>{
   if(!moved)window.scrollTo({top:section.getBoundingClientRect().top+window.scrollY,behavior:'instant'});
  }))),{once:true});
 }
})();
