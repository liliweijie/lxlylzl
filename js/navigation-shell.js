(function(){
  'use strict';
  var header=document.querySelector('.space-header'),rail=document.querySelector('.peek-rail');
  if(window.parent!==window)return;
  if(header){
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
  }
  const phoneLayout=matchMedia('(max-width:700px), (max-height:500px) and (pointer:coarse)');
  const logo=header?.querySelector('.space-logo');
  const links=document.querySelector('.space-links');
  if(links){
    links.id='site-navigation';
    links.addEventListener('click',event=>{
      if(event.target.closest('a[aria-current="page"]'))event.preventDefault();
    });
  }
  if(!rail||!window.lxNavigation)return;
  const nav=window.lxNavigation;
  {
    const ticket=rail.querySelector('.peek-rail__ticket');
    [['rail-from',nav.pages[nav.current].en],['rail-join','TO'],['rail-to',nav.pages[(nav.current+1)%nav.pages.length].en],['rail-signature','MADE BY LIWEIJIE'],['rail-instruction','往左拖动 切换下页']].forEach(function(pair){var el=document.createElement('span');el.className=pair[0];el.textContent=pair[1];ticket.appendChild(el)});
    var signature=rail.querySelector('.rail-signature');signature.textContent='';var signatureArt=document.createElement('img');signatureArt.src='assets/rail-signature.svg';signatureArt.alt='MADE BY LIWEIJIE';signature.appendChild(signatureArt);
    var loading=document.createElement('span');loading.className='rail-loading';var loadingArt=document.createElement('img');loadingArt.src='assets/rail-loading.svg';loadingArt.alt='载入像素中…';loading.appendChild(loadingArt);ticket.appendChild(loading);
    var name=rail.querySelector('.peek-rail__name');new MutationObserver(function(){var text=name.textContent;rail.querySelector('.rail-to').textContent=text.split('·').pop().trim()}).observe(name,{childList:true,subtree:true,characterData:true});
  }
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  const toggle=document.createElement('button');
  toggle.type='button';
  toggle.className='motion-menu-toggle';
  toggle.innerHTML='<span class="menu-lines" aria-hidden="true"><i></i><i></i></span><span>目录</span>';
  const drawer=document.createElement('dialog');
  drawer.id='motion-directory';
  drawer.className='motion-directory';
  drawer.setAttribute('aria-label','网站目录');
  drawer.innerHTML='<header><span>lXlYlZl / DIRECTORY</span><button type="button" class="directory-close" aria-label="关闭目录">关闭 ×</button></header><nav aria-label="页面目录"></nav>';
  const directory=drawer.querySelector('nav');
  let opener;
  for(const [index,{path,en,cn}] of nav.pages.entries()){
    const link=document.createElement('a');
    link.href=path;
    link.innerHTML='<small>'+String(index+1).padStart(2,'0')+'</small><strong>'+en+'</strong><span>'+cn+'</span>';
    if(index===nav.current)link.setAttribute('aria-current','page');
    link.addEventListener('click',event=>{
      if(event.metaKey||event.ctrlKey||event.shiftKey||event.altKey)return;
      event.preventDefault();
      closeDirectory();
      if(index!==nav.current)nav.links[index].click();
    });
    directory.append(link);
  }
  document.body.append(toggle,drawer);
  function setDirectoryAttributes(button){
    button.setAttribute('aria-controls',drawer.id);
    button.setAttribute('aria-haspopup','dialog');
    button.setAttribute('aria-expanded','false');
  }
  function syncPhoneLayout(){
    if(drawer.open)closeDirectory();
    if(!logo)return;
    if(phoneLayout.matches){
      logo.setAttribute('role','button');
      logo.setAttribute('aria-label','打开目录，向下拖动可到下一页');
      setDirectoryAttributes(logo);
    }else{
      for(const name of ['role','aria-controls','aria-haspopup','aria-expanded'])logo.removeAttribute(name);
      logo.setAttribute('aria-label','返回首页');
    }
  }
  function openDirectory(button){
    if(drawer.open||rail.classList.contains('rail-cover'))return;
    opener=button;
    drawer.showModal();
    opener.setAttribute('aria-expanded','true');
    if(window.gsap&&!reduced.matches){
      gsap.fromTo(drawer,{x:'100%'},{x:0,duration:.65,ease:'power4.out',overwrite:true});
      gsap.fromTo(directory.querySelectorAll('a'),{y:45,opacity:0,rotate:-3},{y:0,opacity:1,rotate:0,duration:.7,stagger:.07,delay:.12,ease:'power3.out',overwrite:true});
    }
  }
  function closeDirectory(){
    if(!drawer.open)return;
    opener?.setAttribute('aria-expanded','false');
    drawer.close();
  }
  setDirectoryAttributes(toggle);
  toggle.addEventListener('click',()=>openDirectory(toggle));
  rail.addEventListener('open-directory',()=>openDirectory(rail));
  logo?.addEventListener('click',event=>{
    if(!phoneLayout.matches||event.defaultPrevented||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey)return;
    event.preventDefault();
    openDirectory(logo);
  });
  logo?.addEventListener('keydown',event=>{
    if(phoneLayout.matches&&event.key===' '){event.preventDefault();openDirectory(logo);}
  });
  drawer.querySelector('.directory-close').addEventListener('click',closeDirectory);
  drawer.addEventListener('cancel',event=>{event.preventDefault();closeDirectory()});
  drawer.addEventListener('click',event=>{
    if(event.target!==drawer)return;
    const r=drawer.getBoundingClientRect();
    if(event.clientX<r.left||event.clientY<r.top||event.clientX>r.right||event.clientY>r.bottom)closeDirectory();
  });
  drawer.addEventListener('close',()=>{
    if(drawer.open)return;
    if(!rail.classList.contains('rail-cover')){
      (opener||toggle).focus({preventScroll:true});
    }
  });
  phoneLayout.addEventListener('change',syncPhoneLayout);
  window.addEventListener('pageshow',event=>{if(event.persisted)closeDirectory()});
  syncPhoneLayout();
})();
