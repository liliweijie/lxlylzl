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
  var phoneLayout=matchMedia('(max-width:700px), (max-height:500px) and (pointer:coarse)');
  var logo=header.querySelector('.space-logo'),links=header.querySelector('.space-links');
  links.id='site-navigation';
  function menu(open){
    header.classList.toggle('is-menu-open',open&&phoneLayout.matches);
    if(phoneLayout.matches)logo.setAttribute('aria-expanded',String(open));
  }
  function syncPhoneLayout(){
    menu(false);
    if(phoneLayout.matches){logo.setAttribute('role','button');logo.setAttribute('aria-controls',links.id);logo.setAttribute('aria-label','展开或收起导航');logo.setAttribute('aria-expanded','false')}
    else{logo.removeAttribute('role');logo.removeAttribute('aria-controls');logo.removeAttribute('aria-expanded');logo.setAttribute('aria-label','返回首页')}
    var instruction=rail&&rail.querySelector('.rail-instruction');
    if(instruction)instruction.textContent=phoneLayout.matches?'向上拉动 ↑ 切换下页':'往左拖动 切换下页';
  }
  logo.addEventListener('click',function(e){
    if(!phoneLayout.matches||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey)return;
    e.preventDefault();e.stopImmediatePropagation();
    if(!rail||!rail.classList.contains('rail-cover'))menu(!header.classList.contains('is-menu-open'));
  },true);
  logo.addEventListener('keydown',function(e){if(phoneLayout.matches&&e.key===' '){e.preventDefault();logo.click()}});
  document.addEventListener('pointerdown',function(e){if(!header.contains(e.target))menu(false)});
  header.addEventListener('focusout',function(e){if(!header.contains(e.relatedTarget))menu(false)});
  header.addEventListener('keydown',function(e){if(e.key==='Escape'){menu(false);logo.focus()}});
  links.addEventListener('click',function(e){var link=e.target.closest('a');if(link&&(new URL(link.href,location.href).pathname.split('/').pop()||'index.html')===(location.pathname.split('/').pop()||'index.html')){e.preventDefault();menu(false)}});
  phoneLayout.addEventListener('change',syncPhoneLayout);
  window.addEventListener('pageshow',function(){menu(false)});
  if(rail){var names=['HOME','WORK','ABOUT','NOTES','CONTACT'],page=Number(document.body.dataset.page||0),ticket=rail.querySelector('.peek-rail__ticket');
    [['rail-from',names[page]],['rail-join','TO'],['rail-to',names[(page+1)%5]],['rail-signature','MADE BY LIWEIJIE'],['rail-instruction','往左拖动 切换下页']].forEach(function(pair){var el=document.createElement('span');el.className=pair[0];el.textContent=pair[1];ticket.appendChild(el)});
    var signature=rail.querySelector('.rail-signature');signature.textContent='';var signatureArt=document.createElement('img');signatureArt.src='assets/rail-signature.svg';signatureArt.alt='MADE BY LIWEIJIE';signature.appendChild(signatureArt);
    var loading=document.createElement('span');loading.className='rail-loading';var loadingArt=document.createElement('img');loadingArt.src='assets/rail-loading.svg';loadingArt.alt='载入像素中…';loading.appendChild(loadingArt);ticket.appendChild(loading);
    var name=rail.querySelector('.peek-rail__name');new MutationObserver(function(){var text=name.textContent;rail.querySelector('.rail-to').textContent=text.split('·').pop().trim()}).observe(name,{childList:true,subtree:true,characterData:true});
  }
  syncPhoneLayout();
})();
