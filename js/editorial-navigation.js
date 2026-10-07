(function(){
  'use strict';
  var frames=[['首页','HOME'],['作品','WORKS'],['关于','ABOUT'],['碎碎念','NOTES'],['联系','CONTACT']];
  var next=(Number(document.body.dataset.page||0)+1)%frames.length;
  if(!document.querySelector('.peek-rail')){var rail=document.createElement('div');rail.className='peek-rail';rail.setAttribute('aria-hidden','true');rail.innerHTML='<div class="peek-rail__wash"><span></span></div><div class="peek-rail__ticket"><span class="peek-rail__no"></span><span class="peek-rail__name"></span><span class="peek-rail__barcode"></span><span class="peek-rail__pct">20%</span></div>';document.body.appendChild(rail);}
  var railName=document.querySelector('.peek-rail__name');if(railName)railName.textContent=frames[next].join(' · ');
  var railWash=document.querySelector('.peek-rail__wash span');if(railWash)railWash.textContent=frames[next].join(' ');
  var railNo=document.querySelector('.peek-rail__no');if(railNo)railNo.textContent=String(next+1).padStart(2,'0')+'/05';
  var loop=document.querySelector('.rewind__loop');if(loop)loop.textContent='01 首页 · 02 作品 · 03 关于 · 04 碎碎念 · 05 联系';
  var gate=document.createElement('script');gate.src='js/rail-gate.js?v=4';document.body.appendChild(gate);
  if(!document.querySelector('link[href="css/navigation-shell.css"]')){var shellStyle=document.createElement('link');shellStyle.rel='stylesheet';shellStyle.href='css/navigation-shell.css';document.head.appendChild(shellStyle);}
  var shellScript=document.createElement('script');shellScript.src='js/navigation-shell.js?v=4';document.body.appendChild(shellScript);
  if(!document.querySelector('link[href="css/site-motion.css"]')){var motionStyle=document.createElement('link');motionStyle.rel='stylesheet';motionStyle.href='css/site-motion.css?v=5';document.head.appendChild(motionStyle);}
  var motionFiles=['assets/vendor/gsap.min.js','assets/vendor/ScrollTrigger.min.js','js/site-motion.js?v=5'];
  function loadMotion(index){if(index>=motionFiles.length){window.dispatchEvent(new Event("motion-libraries-ready"));return;}var script=document.createElement('script');script.src=motionFiles[index];script.onload=function(){loadMotion(index+1)};script.onerror=function(){if(index<2)loadMotion(2)};document.body.appendChild(script)}
  loadMotion(0);
  var playScript=document.createElement('script');playScript.src='js/play-world.js?v=5';document.body.appendChild(playScript);
  if(!document.getElementById('stage')||document.querySelector('.ring-home'))return;
  var wireScript=document.createElement('script');wireScript.src='js/wireframe-type.js';document.body.appendChild(wireScript);
})();
