(function(){
  'use strict';
  var home='index.html';
  var emblemStyle=document.createElement('link');emblemStyle.rel='stylesheet';emblemStyle.href='css/emblem-system.css';
  if(!document.querySelector('link[href="css/space-system.css"]')){var style=document.createElement('link');style.rel='stylesheet';style.href='css/space-system.css';document.head.appendChild(style);}
  var routes=[['index.html','HOME'],['works.html','WORK'],['about.html','ABOUT'],['notes.html','NOTES'],['contact.html','CONTACT']];
  document.head.appendChild(emblemStyle);
  var responsiveStyle=document.createElement('link');responsiveStyle.rel='stylesheet';responsiveStyle.href='css/responsive-system.css';document.head.appendChild(responsiveStyle);
  var page=Number(document.body.dataset.page||0);
  var wireStyle=document.createElement('link');wireStyle.rel='stylesheet';wireStyle.href='css/wireframe-system.css';
  var spatialStyle=document.createElement('link');spatialStyle.rel='stylesheet';spatialStyle.href='css/spatial-type.css';document.head.appendChild(spatialStyle);
  document.head.appendChild(wireStyle);
  var favicon=document.querySelector('link[rel="icon"]');if(favicon)favicon.href='assets/space-mark-small.svg';
  var oldHeader=document.querySelector('header.topbar,header.nav');
  if(oldHeader){
    var mode=document.getElementById('mode');
    var header=document.createElement('header');header.className='space-header';
    header.innerHTML='<a class="space-logo" href="'+home+'" aria-label="lxlylzl 首页"><img src="assets/space-mark.svg" alt=""><span><b>lxlylzl</b><small>SPACE FOR IDEAS</small></span></a><nav class="space-links" aria-label="主要导航">'+routes.map(function(r,i){return '<a href="'+r[0]+'"'+(i===page?' aria-current="page"':'')+'>'+r[1]+'</a>';}).join('')+'</nav><div class="space-meta"><span>'+String(page+1).padStart(2,'0')+' / 05</span></div>';
    if(mode){var controls=document.querySelector('.bottom-actions');if(controls)controls.prepend(mode);}
    oldHeader.remove();document.body.prepend(header);
    header.querySelector('.space-logo b').textContent='lXlYlZl';
  }
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
  var gateStyle=document.createElement('link');gateStyle.rel='stylesheet';gateStyle.href='css/rail-gate.css';document.head.appendChild(gateStyle);
  var gate=document.createElement('script');gate.src='js/rail-gate.js';document.body.appendChild(gate);
  if(!document.getElementById('stage'))return;
  var wireScript=document.createElement('script');wireScript.src='js/wireframe-type.js';document.body.appendChild(wireScript);
})();
