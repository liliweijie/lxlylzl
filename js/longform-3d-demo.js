(function(){
  'use strict';
  var works=[
    {title:'TEA SEASON',type:'SOCIAL LONGFORM',year:'2025',tone:'#b8d868',images:['assets/work-demo-tea.png','assets/work-zaza.webp']},
    {title:'RADICAL FACE',type:'EDITORIAL PAGE',year:'2025',tone:'#da533b',images:['assets/work-radical-face.webp','assets/work-lens.webp']},
    {title:'OVERMIND AI',type:'PRODUCT STORY',year:'2025',tone:'#727eff',images:['assets/work-overmind-ai.webp','assets/work-patch-system.webp']},
    {title:'UNIS FOOTWEAR',type:'CAMPAIGN PAGE',year:'2024',tone:'#d9d5ca',images:['assets/work-unis-footwear.webp','assets/work-hom.webp']},
    {title:'CENTRAL ON AIR',type:'CULTURE EDITORIAL',year:'2024',tone:'#55a9c7',images:['assets/work-central-on-air.webp','assets/work-radical-face.webp']},
    {title:'PATCH SYSTEM',type:'VISUAL SYSTEM',year:'2024',tone:'#ea5b38',images:['assets/work-patch-system.webp','assets/work-overmind-ai.webp']},
    {title:'LENS STUDY',type:'IMAGE ARCHIVE',year:'2023',tone:'#9a8d71',images:['assets/work-lens.webp','assets/work-zaza.webp']},
    {title:'HOUSE OF MOTION',type:'MOTION NOTES',year:'2023',tone:'#d7c46e',images:['assets/work-hom.webp','assets/work-unis-footwear.webp']},
    {title:'ZAZA OBJECTS',type:'OBJECT EDITORIAL',year:'2023',tone:'#e18bb0',images:['assets/work-zaza.webp','assets/work-central-on-air.webp']},
    {title:'FIELD NOTES',type:'EXPERIMENTAL PAGE',year:'2022',tone:'#728879',images:['assets/work-radical-face.webp','assets/work-demo-tea.png']}
  ];
  works=window.LONGFORM_WORKS||works;
  // Index each original artwork once; wrap() keeps the gallery continuous.
  var archive=document.querySelector('.archive'),deck=document.getElementById('deck'),indexEl=document.getElementById('deckIndex');
  // Navigation stays outside the visual crop so its buttons remain usable.
  archive.appendChild(indexEl);
  var reader=document.getElementById('reader'),viewport=document.getElementById('phoneViewport'),phoneDoc=document.getElementById('phoneDocument');
  var activeNo=document.getElementById('activeNo'),totalNo=document.getElementById('totalNo'),readerNo=document.getElementById('readerNo'),readerTitle=document.getElementById('readerTitle'),readerType=document.getElementById('readerType');
  var progressBar=document.getElementById('progressBar'),progressText=document.getElementById('progressText');
  var focused=0,selected=-1,drag=null,hovered=-1,momentum=0;
  var phone=document.querySelector('.phone-shell');
  var reduced=matchMedia('(prefers-reduced-motion:reduce)').matches;
  var pointer=null,tiltX=0,tiltY=0;
  var playing=!reduced, expanded=false, layout={mix:0,entrance:reduced?1:0}, lastReported=-1;
  if(window.gsap&&!reduced)gsap.to(layout,{entrance:1,duration:1.5,delay:.15,ease:"power3.out"});
  else layout.entrance=1;
  function reportState(){if(window.parent!==window){var i=selected>=0?selected:focused;window.parent.postMessage({type:'longform-state',index:i,total:works.length,title:works[i].title,playing:playing,expanded:expanded},location.origin)}}
  function syncIndex(){reportState();var active=hovered>=0?hovered:(selected>=0?selected:focused);activeNo.textContent=String(active+1).padStart(2,'0');dots.forEach(function(dot,i){dot.classList.toggle('is-active',i===active);dot.setAttribute('aria-current',i===active?'true':'false')});}
  function hoverCard(index){if(hovered===index)return;hovered=index;cards.forEach(function(card,i){card.classList.toggle('is-hovered',i===index)});syncIndex();}
  function hitCard(x,y){
    var element=document.elementFromPoint(x,y),hit=element&&element.closest('.long-card');
    if(hit)return Number(hit.dataset.index);
    if(element&&!element.closest('.deck-zone'))return -1;
    if(hovered>=0){var r=cards[hovered].getBoundingClientRect();if(x>=r.left-12&&x<=r.right+12&&y>=r.top-10&&y<=r.bottom+10)return hovered;}
    /* Negative-Z sheets can hit the deck's plane instead of the sheet itself. */
    var best=-1,score=Infinity;
    cards.forEach(function(card,i){var r=card.getBoundingClientRect();if(Number(card.style.opacity)<.2)return;if(x>=r.left-5&&x<=r.right+5&&y>=r.top&&y<=r.bottom){var d=Math.abs(x-(r.left+r.width/2));if(d<score){score=d;best=i}}});
    if(best>=0)return best;
    return -1;
  }
  totalNo.textContent=String(works.length).padStart(2,'0');

  function markup(item,index,reading){
    if(item.segments){return reading?item.segments.map(function(segment,i){return '<img class="longform-segment" src="'+segment.src+'" width="'+segment.width+'" height="'+segment.height+'" loading="'+(i?'lazy':'eager')+'" decoding="async" alt="'+item.title+' · '+(i+1)+'">'}).join(''):'<img class="longform-preview" src="'+item.preview+'" alt="'+item.title+'" draggable="false">';}
    return '<div class="doc-hero"><img src="'+item.images[0]+'" alt=""><span class="doc-code">ARCHIVE '+String(index+1).padStart(2,'0')+' · '+item.year+'</span><strong class="doc-title">'+item.title+'</strong></div>'+
      '<div class="doc-copy"><small>'+item.type+' / LXLYLZL</small><h3>一段关于视觉、节奏与页面叙事的长图实验。</h3><p>将主视觉、信息层级与连续画面组织在同一条纵向时间线上，让内容在滚动中逐步展开。</p></div>'+
      '<div class="doc-image"><img src="'+item.images[1]+'" alt=""></div><div class="doc-caption"><span>VISUAL DIRECTION</span><span>01—04</span></div>'+
      '<div class="doc-image is-tall"><img src="'+item.images[0]+'" alt=""></div><div class="doc-caption"><span>SELECTED DETAILS</span><span>05—09</span></div>'+
      '<div class="doc-copy"><small>END OF DOCUMENT</small><h3>'+item.title+'</h3><p>完整项目将在正式作品档案中呈现。</p></div>';
  }
  works.forEach(function(item,index){
    var card=document.createElement('article');card.className='long-card';card.dataset.index=index;card.style.setProperty('--tone',item.tone);card.innerHTML='<div class="card-document">'+markup(item,index)+'</div>';card.setAttribute('aria-label','打开 '+item.title);card.tabIndex=0;card.setAttribute('role','button');
    card.addEventListener('pointerenter',function(e){if(!drag&&e.pointerType!=='touch')hoverCard(index)});
    card.addEventListener('focus',function(){hoverCard(index)});
    card.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();open(index)}});deck.appendChild(card);
    var button=document.createElement('button');button.type='button';button.textContent=String(index+1).padStart(2,'0');button.setAttribute('aria-label','定位 '+item.title);button.addEventListener('click',function(){focus(index)});indexEl.appendChild(button);
  });
  var cards=[].slice.call(deck.children),dots=[].slice.call(indexEl.children);
  var position=0,targetPosition=0,previousTime=0,frameVisible=true,animationFrame=0;
  function wakeDeck(){if(!animationFrame&&frameVisible&&!document.hidden){previousTime=0;animationFrame=requestAnimationFrame(animate)}}
  var order=works.map(function(_,i){return i}),metrics={};
  function measureDeck(){metrics.rect=deck.getBoundingClientRect();metrics.w=cards[0].offsetWidth;metrics.h=cards[0].offsetHeight}
  new ResizeObserver(measureDeck).observe(deck);measureDeck();
  var lifts=works.map(function(){return 0});
  var spreads=works.map(function(){return 0});
  var hoverStrength=works.map(function(){return 0});
  function wrap(value){return ((value%works.length)+works.length)%works.length;}
  function offsetFor(index){return wrap(index-position+works.length/2)-works.length/2;}
  function animate(time){animationFrame=0;
    var dt=Math.min(40,time-(previousTime||time-16));previousTime=time;
    if(!drag&&selected<0&&!expanded&&Math.abs(momentum)>.03){
      targetPosition+=momentum*dt/1000;momentum*=Math.exp(-dt/420);
      var movingIndex=wrap(Math.round(targetPosition));if(movingIndex!==focused){focused=movingIndex;syncIndex()}
      if(Math.abs(momentum)<.08){momentum=0;focus(Math.round(targetPosition))}
    }
    deck.dataset.motion=Math.abs(momentum)>.03?'coasting':drag?'dragging':playing?'orbit':'still';
    if(playing&&!drag&&selected<0&&!expanded&&!document.hidden){
      targetPosition+=dt*.00022;
      var next=wrap(Math.round(targetPosition));
      if(next!==focused){focused=next;syncIndex()}
    }
    var ease=reduced?1:1-Math.exp(-dt/150);position+=(targetPosition-position)*ease;
    var rect=metrics.rect,cardW=metrics.w,cardH=metrics.h;
    var spacing=Math.min(250,rect.width*.245),cols=rect.width<520?4:rect.width<900?5:7,rows=Math.ceil(works.length/cols);
    var sx=rect.width/cols,sy=rect.height/rows,gridScale=Math.min((sx-12)/cardW,(sy-14)/cardH);
    cards.forEach(function(card,i){
      var offset=offsetFor(i),distance=Math.abs(offset),hot=i===hovered?1:0;
      hoverStrength[i]+=(hot-hoverStrength[i])*ease;hot=hoverStrength[i];
      var x=offset*spacing, y=Math.min(distance,4)*22, z=-distance*135;
      var angle=Math.max(-64,Math.min(64,offset*-38)),scale=Math.max(.45,1-distance*.1);
      var slot=wrap(order.indexOf(i)-focused),gx=(slot%cols+.5)*sx-rect.width/2,gy=(Math.floor(slot/cols)+.5)*sy-rect.height/2;
      var m=layout.mix,e=layout.entrance;
      x=x*(1-m)+gx*m;y=y*(1-m)+gy*m;
      z=z*(1-m);angle=angle*(1-m);scale=scale*(1-m)+gridScale*m;
      y+=(1-e)*(120+distance*30);
      var tilt=drag?Math.max(-8,Math.min(8,(targetPosition-position)*4)):0;
      card.style.transform='translate3d(calc(-50% + '+x+'px),calc(-50% + '+y+'px),'+z+'px) rotateY('+angle+'deg) rotateZ('+(tilt*(1-m))+'deg) scale('+scale+')';
      card.style.filter='brightness('+(m+(1-m)*Math.max(.45,1-distance*.18)+hot*.12)+')';
      card.style.opacity=String(e*(m+(1-m)*Math.max(0,Math.min(1,4-distance))));
      card.style.zIndex=String(60-Math.round(distance*8));
      card.style.pointerEvents=distance<4||m>.8?'auto':'none';
    });
    if(!document.hidden&&frameVisible)animationFrame=requestAnimationFrame(animate);
  }
  function stopOrbit(){momentum=0;if(playing){playing=false;reportState()}}
  function setLayout(){
    expanded=!expanded;stopOrbit();archive.classList.toggle('is-spread',expanded);
    if(window.gsap&&!reduced)gsap.to(layout,{mix:expanded?1:0,duration:1.1,ease:'power3.inOut',overwrite:true});
    else layout.mix=expanded?1:0;
    reportState();
  }
  document.addEventListener('visibilitychange',function(){if(document.hidden){cancelAnimationFrame(animationFrame);animationFrame=0}else wakeDeck()});
  wakeDeck();
  function focus(index){
    momentum=0;
    focused=wrap(index);targetPosition+=wrap(focused-targetPosition+works.length/2)-works.length/2;activeNo.textContent=String(focused+1).padStart(2,'0');
    cards.forEach(function(card,i){var offset=i-focused,wrapped=offset;if(offset>works.length/2)wrapped-=works.length;if(offset<-works.length/2)wrapped+=works.length;card.style.setProperty('--offset',wrapped);card.style.setProperty('--distance',Math.abs(wrapped));card.style.zIndex=String(30-Math.abs(wrapped));card.classList.toggle('is-focused',i===focused);card.classList.toggle('is-selected',i===selected)});
    dots.forEach(function(dot,i){dot.classList.toggle('is-focused',i===focused);dot.classList.toggle('is-selected',i===selected)});
    syncIndex();
  }
  function open(index){
    stopOrbit();
    if(window.parent!==window)window.parent.postMessage({type:'longform-open'},location.origin);
    selected=index;cards.forEach(function(card,i){card.classList.toggle('is-selected',i===index)});var item=works[index];phoneDoc.innerHTML=markup(item,index,true);readerNo.textContent=String(index+1).padStart(2,'0')+' / '+String(works.length).padStart(2,'0');readerTitle.textContent=item.title;readerType.textContent=item.segments?'长图设计':item.type+' · '+item.year;viewport.scrollTop=0;updateProgress();archive.classList.add('has-selection');reader.setAttribute('aria-hidden','false');reportState();window.setTimeout(function(){if(selected>=0)viewport.focus({preventScroll:true})},650);
  }
  function close(){var old=selected;selected=-1;archive.classList.remove('has-selection');reader.setAttribute('aria-hidden','true');focus(focused);if(old>=0)cards[old].focus({preventScroll:true})}
  function step(dir){stopOrbit();var next=((selected<0?focused:selected)+dir+works.length)%works.length;selected<0?focus(next):open(next)}
  function updateProgress(){var max=viewport.scrollHeight-viewport.clientHeight;var value=max>0?Math.round(viewport.scrollTop/max*100):0;progressBar.style.height=value+'%';progressText.textContent=String(value).padStart(2,'0')+'%'}
  document.getElementById('readerClose').addEventListener('click',close);document.getElementById('prevWork').addEventListener('click',function(){step(-1)});document.getElementById('nextWork').addEventListener('click',function(){step(1)});viewport.addEventListener('scroll',updateProgress,{passive:true});
  deck.addEventListener('wheel',function(e){if(selected>=0)return;stopOrbit();e.preventDefault();var delta=Math.abs(e.deltaX)>Math.abs(e.deltaY)?e.deltaX:e.deltaY;targetPosition+=delta*.003;focused=wrap(Math.round(targetPosition));syncIndex()},{passive:false});
  deck.addEventListener('contextmenu',function(e){e.preventDefault()});
  deck.addEventListener('pointerdown',function(e){if(e.button!==0&&e.button!==2)return;stopOrbit();var hit=hitCard(e.clientX,e.clientY);hoverCard(-1);drag={x:e.clientX,y:e.clientY,start:targetPosition,moved:false,card:hit,button:e.button,lastX:e.clientX,lastTime:performance.now(),velocity:0};deck.setPointerCapture(e.pointerId)});
  deck.addEventListener('pointermove',function(e){if(!drag||drag.phone)return;var delta=e.clientX-drag.x,now=performance.now(),dt=Math.max(8,now-drag.lastTime);drag.velocity=drag.velocity*.35-(e.clientX-drag.lastX)/130/dt*1000*.65;drag.lastX=e.clientX;drag.lastTime=now;if(Math.abs(delta)>12){drag.moved=true;targetPosition=drag.start-delta/130;focused=wrap(Math.round(targetPosition));syncIndex()}});
  deck.addEventListener('pointerup',function(e){var released=drag;if(drag&&deck.hasPointerCapture(e.pointerId))deck.releasePointerCapture(e.pointerId);drag=null;if(released&&released.moved){momentum=reduced||expanded||performance.now()-released.lastTime>120?0:Math.max(-7,Math.min(7,released.velocity));if(Math.abs(momentum)<.08)focus(Math.round(targetPosition));}if(released&&released.button===0&&!released.moved&&released.card>=0)open(released.card)});
  document.addEventListener('pointerdown',function(e){if(selected<0||reader.contains(e.target)||e.target.closest('.space-header,.peek-rail'))return;close();e.preventDefault();e.stopPropagation()},true);
  viewport.addEventListener('pointerdown',function(e){if(e.button!==0||e.pointerType==='touch')return;drag={phone:true,y:e.clientY,scroll:viewport.scrollTop};viewport.classList.add('is-dragging');viewport.setPointerCapture(e.pointerId)});
  viewport.addEventListener('pointermove',function(e){if(!drag||!drag.phone)return;viewport.scrollTop=drag.scroll+(drag.y-e.clientY)});
  viewport.addEventListener('pointerup',function(e){if(drag&&drag.phone&&viewport.hasPointerCapture(e.pointerId))viewport.releasePointerCapture(e.pointerId);viewport.classList.remove('is-dragging');drag=null});
  document.addEventListener('keydown',function(e){if(e.key==='Escape'&&selected>=0)close();else if(e.key==='ArrowRight')step(1);else if(e.key==='ArrowLeft')step(-1)});
  document.addEventListener('pointermove',function(e){if(e.pointerType==='touch')return;pointer={x:e.clientX,y:e.clientY};if(!drag)hoverCard(hitCard(e.clientX,e.clientY))});
  document.documentElement.addEventListener('pointerleave',function(){pointer=null;hoverCard(-1)});
  deck.addEventListener('pointercancel',function(){drag=null});
  viewport.addEventListener('pointercancel',function(){drag=null;viewport.classList.remove('is-dragging')});
  document.addEventListener('pointermove',function(e){if(reduced||e.pointerType==='touch'||selected<0)return;var x=(e.clientX/innerWidth-.5)*24,y=(e.clientY/innerHeight-.5)*-20;phone.style.setProperty('--phone-y',x+'deg');phone.style.setProperty('--phone-x',y+'deg')});
  if(window.parent!==window)document.addEventListener('wheel',function(e){if(e.defaultPrevented||e.target.closest('.phone-viewport'))return;e.preventDefault();window.parent.postMessage({type:'longform-scroll',delta:e.deltaY},location.origin)},{passive:false});
  document.documentElement.addEventListener('pointerleave',function(){phone.style.setProperty('--phone-y','0deg');phone.style.setProperty('--phone-x','0deg')});
  window.addEventListener('message',function(e){
    if(e.origin!==location.origin||e.source!==window.parent||e.data?.type!=='longform-control')return;
    if(e.data.action==='visibility'){frameVisible=e.data.visible;if(!frameVisible){cancelAnimationFrame(animationFrame);animationFrame=0}else wakeDeck();}
    else if(e.data.action==='prev')step(-1);
    else if(e.data.action==='next')step(1);
    else if(e.data.action==='read'){focus(Math.round(targetPosition));open(focused);}
    else if(e.data.action==='state')reportState();
    else if(e.data.action==='play'){var resume=!playing&&!reduced;if(resume&&expanded)setLayout();playing=resume;reportState();}
    else if(e.data.action==='layout')setLayout();
    else if(e.data.action==='shuffle'){
      if(!expanded)setLayout();stopOrbit();
      for(var n=order.length-1;n>0;n--){var k=Math.floor(Math.random()*(n+1)),v=order[n];order[n]=order[k];order[k]=v}
      deck.dataset.shuffle=String(Number(deck.dataset.shuffle||0)+1);
      if(window.gsap&&!reduced)gsap.fromTo(layout,{entrance:.05},{entrance:1,duration:1.2,ease:'power3.out',overwrite:'auto'});
      reportState();
    }
  });
  focus(0);position=0;
})();
