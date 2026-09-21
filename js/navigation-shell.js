(function(){
  'use strict';
  var header=document.querySelector('.space-header'),rail=document.querySelector('.peek-rail');
  if(!header||window.parent!==window)return;
  var root=document.documentElement,hover=false,progress=0,timer;
  var layer=document.createElement('div');layer.className='page-glass';layer.setAttribute('aria-hidden','true');document.body.appendChild(layer);
  var button=document.createElement('button');button.className='glass-toggle';button.type='button';
  (header.querySelector('.space-meta')||header).appendChild(button);
  function surface(mode){root.dataset.surface='dark';document.body.classList.remove('light');button.classList.toggle('is-dark-button',mode==='glass');button.textContent=mode==='glass'?'Dark':'Glass';button.setAttribute('aria-label',mode==='glass'?'切换按钮为 Glass':'切换按钮为 Dark');button.setAttribute('aria-pressed',String(mode==='glass'));}
  try{surface(localStorage.getItem('lx:surface')==='glass'?'glass':'dark')}catch(e){surface('dark')}
  button.addEventListener('click',function(){var mode=button.classList.contains('is-dark-button')?'dark':'glass';surface(mode);try{localStorage.setItem('lx:surface',mode)}catch(e){}});
  function update(){var value=hover?0:progress;root.style.setProperty('--nav-collapse',value);header.classList.toggle('is-compact',value>.5)}
  function compact(){progress=1;update()}
  function schedule(){clearTimeout(timer);timer=setTimeout(compact,2200)}
  header.addEventListener('pointerenter',function(){hover=true;clearTimeout(timer);update()});header.addEventListener('pointerleave',function(){hover=false;compact()});
  header.addEventListener('focusin',function(){hover=true;update()});header.addEventListener('focusout',function(e){if(!header.contains(e.relatedTarget)){hover=false;compact()}});
  window.addEventListener('scroll',function(){progress=Math.min(1,window.scrollY/180);update()},{passive:true});
  window.addEventListener('wheel',function(e){if(!hover&&e.deltaY>0){progress=Math.min(1,progress+e.deltaY/300);update()}},{passive:true});
  schedule();window.addEventListener('pageshow',function(){progress=0;update();schedule()});
  if(rail){var names=['HOME','WORK','ABOUT','NOTES','CONTACT'],page=Number(document.body.dataset.page||0),ticket=rail.querySelector('.peek-rail__ticket');
    [['rail-from',names[page]],['rail-join','TO'],['rail-to',names[(page+1)%5]],['rail-signature','MADE BY LIWEIJIE'],['rail-instruction','往左拖动 切换下页']].forEach(function(pair){var el=document.createElement('span');el.className=pair[0];el.textContent=pair[1];ticket.appendChild(el)});
    var name=rail.querySelector('.peek-rail__name');new MutationObserver(function(){var text=name.textContent;rail.querySelector('.rail-to').textContent=text.split('·').pop().trim()}).observe(name,{childList:true,subtree:true,characterData:true});
  }
})();
