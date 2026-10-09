(function(){
 'use strict';
 const frame=document.getElementById('clothingShowcase');
 if(!frame)return;
 const section=frame.closest('.clothing-chapter');
 let visible=false,loaded=false;
 // Resolve the section link after the homepage's fonts and pinned layout settle.
 if(location.hash==='#clothing'){
  let visitorMoved=false;
  for(const type of ['wheel','touchstart','pointerdown','keydown'])window.addEventListener(type,()=>{visitorMoved=true;},{once:true,passive:true});
  window.addEventListener('load',()=>document.fonts.ready.then(()=>requestAnimationFrame(()=>requestAnimationFrame(()=>{
   if(!visitorMoved)section.scrollIntoView({block:'start',behavior:'instant'});
  }))),{once:true});
 }
 function tellVisibility(){if(loaded)frame.contentWindow.postMessage({type:'tshirt-visibility',visible:visible&&!document.hidden},location.origin);}
 // Load the models only when the visitor approaches the third screen.
 const preload=new IntersectionObserver(entries=>{
  if(!entries[0].isIntersecting)return;
  frame.src=frame.dataset.src;preload.disconnect();
 },{rootMargin:'450px'});
 preload.observe(section);
 new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;tellVisibility();}).observe(frame);
 frame.addEventListener('load',()=>{loaded=true;tellVisibility();});
 document.addEventListener('visibilitychange',tellVisibility);
 window.addEventListener('message',event=>{
  if(event.origin!==location.origin||event.source!==frame.contentWindow)return;
  const data=event.data;
  if(data?.type==='tshirt-ready'){
   section.dataset.ready='true';section.querySelector('.clothing-loading').hidden=true;tellVisibility();
  }
  if(data?.type==='tshirt-page-scroll'&&visible&&Number.isFinite(data.delta)){
   window.scrollBy({top:Math.max(-2000,Math.min(2000,data.delta)),behavior:'instant'});
  }
 });
})();
