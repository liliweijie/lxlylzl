(function(){
  'use strict';
  var home='index.html';
  var emblemStyle=document.createElement('link');emblemStyle.rel='stylesheet';emblemStyle.href='css/emblem-system.css';
  if(!document.querySelector('link[href="css/space-system.css"]')){var style=document.createElement('link');style.rel='stylesheet';style.href='css/space-system.css';document.head.appendChild(style);}
  var routes=[['index.html','HOME'],['works.html','WORK'],['about.html','ABOUT'],['notes.html','NOTES'],['contact.html','CONTACT']];
  document.head.appendChild(emblemStyle);
  var responsiveStyle=document.createElement('link');responsiveStyle.rel='stylesheet';responsiveStyle.href='css/responsive-system.css';document.head.appendChild(responsiveStyle);
  var page=Number(document.body.dataset.page||0);
  var spatialStyle=document.createElement('link');spatialStyle.rel='stylesheet';spatialStyle.href='css/spatial-type.css';document.head.appendChild(spatialStyle);
  var favicon=document.querySelector('link[rel="icon"]');if(favicon)favicon.href='assets/space-mark-small.svg';
  var oldHeader=document.querySelector('header.topbar,header.nav');
  if(oldHeader){
    var mode=document.getElementById('mode');
    var header=document.createElement('header');header.className='space-header';
    header.innerHTML='<a class="space-logo" href="'+home+'" aria-label="lxlylzl 首页"><img src="assets/space-mark.svg" alt=""><span><b>lxlylzl</b><small>SPACE FOR IDEAS</small></span></a><nav class="space-links" aria-label="主要导航">'+routes.map(function(r,i){return '<a href="'+r[0]+'"'+(i===page?' aria-current="page"':'')+'>'+r[1]+'</a>';}).join('')+'</nav><div class="space-meta"><span>'+String(page+1).padStart(2,'0')+' / 05</span></div>';
    if(mode){var controls=document.querySelector('.bottom-actions');if(controls)controls.prepend(mode);}
    oldHeader.remove();document.body.prepend(header);
  }
  document.querySelectorAll('a[href="offgrid-demo.html"]').forEach(function(a){a.href=home;});
  var logo=document.querySelector('.nav__logo');if(logo)logo.textContent='✳ LXLYLZL / STUDIO';
  var nav=document.querySelector('.nav__pills');if(nav&&!nav.querySelector('a[href="contact.html"]')){var link=document.createElement('a');link.href='contact.html';link.className='nav__pill';link.textContent='联系';nav.appendChild(link);}
  document.querySelectorAll('.primary-nav a').forEach(function(a){if(a.textContent.trim()==='CONTACT')a.href='contact.html';});
  var meta=document.querySelector('.nav__meta');if(meta){var counter=meta.querySelector('span');if(counter)counter.textContent=String(Number(document.body.dataset.page)+1).padStart(2,'0')+'/05';}
  var frames=[['首页','HOME'],['作品','WORKS'],['关于','ABOUT'],['碎碎念','NOTES'],['联系','CONTACT']];
  var next=(Number(document.body.dataset.page||0)+1)%frames.length;
  if(!document.querySelector('.peek-rail')){var rail=document.createElement('div');rail.className='peek-rail';rail.setAttribute('aria-hidden','true');rail.innerHTML='<div class="peek-rail__wash"><span></span></div><div class="peek-rail__ticket"><span class="peek-rail__no"></span><span class="peek-rail__name"></span><span class="peek-rail__barcode"></span><span class="peek-rail__pct">20%</span></div>';document.body.appendChild(rail);}
  var railName=document.querySelector('.peek-rail__name');if(railName)railName.textContent=frames[next].join(' · ');
  var railWash=document.querySelector('.peek-rail__wash span');if(railWash)railWash.textContent=frames[next].join(' ');
  var railNo=document.querySelector('.peek-rail__no');if(railNo)railNo.textContent=String(next+1).padStart(2,'0')+'/05';
  var loop=document.querySelector('.rewind__loop');if(loop)loop.textContent='01 首页 · 02 作品 · 03 关于 · 04 碎碎念 · 05 联系';
  var hint=document.createElement('span');hint.className='editorial-swipe-hint';hint.textContent='← 拖动空白处，进入下一页';document.body.appendChild(hint);
  if(!document.getElementById('stage'))return;
  var start=null,dragged=false;
  var stage=document.getElementById('stage');
  var homeRail=document.querySelector('.peek-rail');
  function railProgress(p){var narrow=matchMedia('(max-width:700px)').matches;var idle=narrow?28:40;homeRail.style.width=(idle+p*(innerWidth-idle-8))+'px';homeRail.classList.toggle('is-pulling',p>0);homeRail.querySelector('.peek-rail__pct').textContent=Math.round(20+80*p)+'%';homeRail.querySelector('.peek-rail__wash').style.opacity=p;}
  function clearDrag(){start=null;dragged=false;stage.style.translate='';railProgress(0);}
  document.querySelectorAll('.letter').forEach(function(letter){
    var volume=document.createElement('span');volume.className='glyph-volume';volume.setAttribute('aria-hidden','true');
    for(var depth=-18;depth<=0;depth+=2){var layer=document.createElement('span');layer.className='glyph-layer'+(depth===0?' glyph-front':'');layer.style.setProperty('--depth',depth+'px');layer.textContent=letter.dataset.letter;volume.appendChild(layer);}
    Array.from(letter.childNodes).forEach(function(n){if(n.nodeType===3)n.remove();});letter.prepend(volume);letter.setAttribute('aria-label',letter.dataset.letter);
  });
  var tiltFrame=0,tiltX=0,tiltY=0;
  window.addEventListener('pointermove',function(e){if(e.pointerType==='touch'||matchMedia('(prefers-reduced-motion:reduce)').matches)return;tiltX=-9-(e.clientY/innerHeight-.5)*10;tiltY=-13+(e.clientX/innerWidth-.5)*18;if(!tiltFrame)tiltFrame=requestAnimationFrame(function(){document.querySelectorAll('.letter').forEach(function(l){l.style.setProperty('--tilt-x',tiltX+'deg');l.style.setProperty('--tilt-y',tiltY+'deg');});tiltFrame=0;});});
  window.addEventListener('pointerdown',function(e){
    if(e.pointerType==='touch'||e.button!==0||e.isPrimary===false||e.target.closest('a,button,input,textarea,select,.letter,[contenteditable],[data-no-dolly]'))return;
    if(window.getSelection()&&window.getSelection().toString())return;
    start={x:e.clientX,y:e.clientY};dragged=false;
  });
  window.addEventListener('pointermove',function(e){if(!start)return;var dx=e.clientX-start.x,dy=e.clientY-start.y;if(Math.abs(dx)>16&&Math.abs(dx)>Math.abs(dy)*1.5){dragged=true;stage.style.translate=Math.max(-85,Math.min(85,dx*.18))+'px 0';railProgress(dx<0?Math.min(1,-dx/280):0);}});
  window.addEventListener('pointerup',function(e){if(!start)return;var dx=e.clientX-start.x,dy=e.clientY-start.y;var navigate=dragged&&Math.abs(dx)>120&&Math.abs(dx)>Math.abs(dy)*1.5;clearDrag();if(navigate){try{sessionStorage.setItem('lx:nav',JSON.stringify({dir:dx<0?1:-1,ts:Date.now()}));}catch(err){}location.href=dx<0?'works.html':'contact.html';}});
  window.addEventListener('pointercancel',clearDrag);
  window.addEventListener('blur',clearDrag);
})();
