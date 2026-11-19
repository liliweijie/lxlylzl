(function(){
  'use strict';
  var links=Array.from(document.querySelectorAll('.space-links a'));
  if(!links.length)return;
  var labels={HOME:'首页',WORK:'作品',SHIRT:'文化衫定制',ABOUT:'关于',NOTES:'碎碎念',CONTACT:'联系'};
  var pages=links.map(function(link){
    var en=link.textContent.trim();
    return {path:link.getAttribute('href'),cn:labels[en],en:en};
  });
  var current=Math.max(0,links.findIndex(function(link){return link.getAttribute('aria-current')==='page'}));
  var next=(current+1)%pages.length;
  window.lxNavigation={links:links,pages:pages,current:current};
  if(!document.querySelector('.peek-rail')){var rail=document.createElement('div');rail.className='peek-rail';rail.setAttribute('aria-hidden','true');rail.innerHTML='<div class="peek-rail__wash"><span></span></div><div class="peek-rail__ticket"><span class="peek-rail__no"></span><span class="peek-rail__name"></span><span class="peek-rail__barcode"></span><span class="peek-rail__pct">20%</span></div>';document.body.appendChild(rail);}
  var railName=document.querySelector('.peek-rail__name');if(railName)railName.textContent=pages[next].cn+' · '+pages[next].en;
  var railWash=document.querySelector('.peek-rail__wash span');if(railWash)railWash.textContent=pages[next].cn+' '+pages[next].en;
  var railNo=document.querySelector('.peek-rail__no');if(railNo)railNo.textContent=String(next+1).padStart(2,'0')+'/'+String(pages.length).padStart(2,'0');
  var loop=document.querySelector('.rewind__loop');if(loop)loop.textContent=pages.map(function(page,index){return String(index+1).padStart(2,'0')+' '+page.cn}).join(' · ');
  var gate=document.createElement('script');gate.src='js/rail-gate.js?v=10';document.body.appendChild(gate);
  var wheelStyle=document.createElement('link');wheelStyle.rel='stylesheet';wheelStyle.href='css/rail-wheel.css?v=1';document.head.appendChild(wheelStyle);
  if(!document.querySelector('link[href*="css/navigation-shell.css"]')){var shellStyle=document.createElement('link');shellStyle.rel='stylesheet';shellStyle.href='css/navigation-shell.css?v=4';document.head.appendChild(shellStyle);}
  var shellScript=document.createElement('script');shellScript.src='js/navigation-shell.js?v=7';document.body.appendChild(shellScript);
  if(!document.querySelector('link[href*="css/site-motion.css"]')){var motionStyle=document.createElement('link');motionStyle.rel='stylesheet';motionStyle.href='css/site-motion.css?v=7';document.head.appendChild(motionStyle);}
  var motionFiles=['assets/vendor/gsap.min.js','assets/vendor/ScrollTrigger.min.js','js/site-motion.js?v=8'];
  function loadMotion(index){if(index>=motionFiles.length){window.dispatchEvent(new Event("motion-libraries-ready"));return;}var script=document.createElement('script');script.src=motionFiles[index];script.onload=function(){loadMotion(index+1)};script.onerror=function(){if(index<2)loadMotion(2)};document.body.appendChild(script)}
  loadMotion(0);
  var playScript=document.createElement('script');playScript.src='js/play-world.js?v=5';document.body.appendChild(playScript);
  if(!document.getElementById('stage')||document.querySelector('.ring-home'))return;
  var wireScript=document.createElement('script');wireScript.src='js/wireframe-type.js';document.body.appendChild(wireScript);
})();
