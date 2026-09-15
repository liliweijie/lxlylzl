(function(){
 'use strict';
 var rail=document.querySelector('.peek-rail');if(!rail)return;
 var routes=['index.html','works.html','about.html','notes.html','contact.html'];
 var page=Number(document.body.dataset.page||0),target=routes[(page+1)%routes.length];
 var pressed=null,committing=false,progress=rail.querySelector('.peek-rail__pct'),wash=rail.querySelector('.peek-rail__wash');
 rail.removeAttribute('aria-hidden');rail.setAttribute('role','link');rail.tabIndex=0;rail.setAttribute('aria-label','下一页：'+rail.querySelector('.peek-rail__name').textContent+'。在侧栏内按住向左拖动，或按回车进入。');
 var tip=document.createElement('span');tip.className='peek-rail__tip';tip.textContent='轻轻左拖，即刻切页 ←';rail.appendChild(tip);
 function reset(){pressed=null;rail.classList.remove('rail-dragging','rail-expanded');rail.style.removeProperty('--drag-width');progress.textContent='0%';wash.style.opacity=0;}
 function commit(){if(committing)return;committing=true;pressed=null;rail.classList.remove('rail-dragging');rail.classList.add('rail-cover');progress.textContent='100%';try{sessionStorage.setItem('lx:nav',JSON.stringify({dir:1,ts:Date.now()}));}catch(e){}setTimeout(function(){location.assign(target);},matchMedia('(prefers-reduced-motion:reduce)').matches?0:430);}
 rail.addEventListener('pointerenter',function(e){if(e.pointerType!=='touch'&&!committing)rail.classList.add('rail-expanded');});
 rail.addEventListener('pointerleave',function(){if(!pressed&&!committing)rail.classList.remove('rail-expanded');});
 rail.addEventListener('pointerdown',function(e){if(committing||e.button!==0||e.isPrimary===false)return;pressed={id:e.pointerId,x:e.clientX,y:e.clientY,dx:0,dy:0,width:rail.getBoundingClientRect().width,threshold:e.pointerType==='touch'?40:24};rail.setPointerCapture(e.pointerId);});
 rail.addEventListener('pointermove',function(e){if(!pressed||e.pointerId!==pressed.id)return;pressed.dx=Math.max(0,pressed.x-e.clientX);pressed.dy=Math.abs(e.clientY-pressed.y);if(pressed.dy>24&&pressed.dy>pressed.dx){reset();return;}if(pressed.dx<5)return;if(pressed.dx>=pressed.threshold&&pressed.dx>pressed.dy*1.5){var id=pressed.id;commit();if(rail.hasPointerCapture(id))rail.releasePointerCapture(id);return;}rail.classList.add('rail-dragging');var p=Math.min(.95,pressed.dx/pressed.threshold*.85);rail.style.setProperty('--drag-width',Math.min(innerWidth,pressed.width+pressed.dx)+'px');progress.textContent=Math.round(p*100)+'%';wash.style.opacity=p;});
 rail.addEventListener('pointerup',function(e){if(!pressed||e.pointerId!==pressed.id)return;var go=pressed.dx>=pressed.threshold&&pressed.dx>pressed.dy*1.5;pressed=null;if(rail.hasPointerCapture(e.pointerId))rail.releasePointerCapture(e.pointerId);if(go)commit();else reset();});
 rail.addEventListener('pointercancel',reset);rail.addEventListener('lostpointercapture',function(){if(pressed&&!committing)reset();});window.addEventListener('blur',function(){if(!committing)reset();});window.addEventListener('resize',function(){if(!committing)reset();});window.addEventListener('pageshow',function(){committing=false;rail.classList.remove('rail-cover');reset();});rail.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();commit();}else if(e.key==='Escape')reset();});reset();
})();
