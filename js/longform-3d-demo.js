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
  // Two complete sequences extend the loop without changing the source artwork.
  works=works.concat(works);
  var archive=document.querySelector('.archive'),deck=document.getElementById('deck'),indexEl=document.getElementById('deckIndex');
  // Navigation stays outside the visual crop so its buttons remain usable.
  archive.appendChild(indexEl);
  var reader=document.getElementById('reader'),viewport=document.getElementById('phoneViewport'),phoneDoc=document.getElementById('phoneDocument');
  var activeNo=document.getElementById('activeNo'),totalNo=document.getElementById('totalNo'),readerNo=document.getElementById('readerNo'),readerTitle=document.getElementById('readerTitle'),readerType=document.getElementById('readerType');
  var progressBar=document.getElementById('progressBar'),progressText=document.getElementById('progressText');
  var focused=0,selected=-1,drag=null,hovered=-1;
  var phone=document.querySelector('.phone-shell');
  var reduced=matchMedia('(prefers-reduced-motion:reduce)').matches;
  var pointer=null,tiltX=0,tiltY=0;
  function syncIndex(){var active=hovered>=0?hovered:(selected>=0?selected:focused);activeNo.textContent=String(active+1).padStart(2,'0');dots.forEach(function(dot,i){dot.classList.toggle('is-active',i===active);dot.setAttribute('aria-current',i===active?'true':'false')});}
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
    var card=document.createElement('article');card.className='long-card';card.dataset.index=index;card.style.setProperty('--tone',item.tone);card.innerHTML='<div class="card-document">'+markup(item,index)+'</div>';card.setAttribute('aria-label','打开 '+item.title);card.tabIndex=0;
    card.addEventListener('pointerenter',function(e){if(!drag&&e.pointerType!=='touch')hoverCard(index)});
    card.addEventListener('focus',function(){hoverCard(index)});
    card.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();open(index)}});deck.appendChild(card);
    var button=document.createElement('button');button.type='button';button.textContent=String(index+1).padStart(2,'0');button.setAttribute('aria-label','定位 '+item.title);button.addEventListener('click',function(){focus(index)});indexEl.appendChild(button);
  });
  var cards=[].slice.call(deck.children),dots=[].slice.call(indexEl.children);
  var position=4.5,targetPosition=4.5,previousTime=0;
  var lifts=works.map(function(){return 0});
  var spreads=works.map(function(){return 0});
  var hoverStrength=works.map(function(){return 0});
  function wrap(value){return ((value%works.length)+works.length)%works.length;}
  function offsetFor(index){return wrap(index-position+works.length/2)-works.length/2;}
  var arcFocus=0;
  // One quarter-ellipse cubic, mirrored around the pointer-controlled apex.
  function arcAt(x,radius,height){
    var side=x<0?-1:1,q=Math.min(1,Math.abs(x)/radius),lo=0,hi=1,t=0,k=.5522847498;
    for(var n=0;n<12;n++){t=(lo+hi)/2;var u=1-t,bx=3*u*u*t*k+3*u*t*t+t*t*t;if(bx<q)lo=t;else hi=t;}
    var u=1-t,y=3*u*t*t*(1-k)+t*t*t;
    var dx=3*u*u*k+6*u*t*(1-k),dy=6*u*t*(1-k)+3*t*t*k;
    return {y:y*height,slope:side*dy*height/Math.max(.001,dx*radius),distance:q};
  }
  function animate(time){
    var dt=Math.min(50,time-(previousTime||time-16));previousTime=time;
    var ease=reduced?1:1-Math.exp(-dt/130);position+=(targetPosition-position)*ease;
    if(pointer&&!drag&&Math.abs(targetPosition-position)>.02)hoverCard(hitCard(pointer.x,pointer.y));
    var tx=0,ty=0;if(pointer&&hovered>=0){var bounds=cards[hovered].getBoundingClientRect();tx=Math.max(-1,Math.min(1,(pointer.y-bounds.top)/bounds.height*2-1))*-5;ty=Math.max(-1,Math.min(1,(pointer.x-bounds.left)/bounds.width*2-1))*9;}
    tiltX+=(tx-tiltX)*ease;tiltY+=(ty-tiltY)*ease;
    var spacing=innerWidth<=720?86:Math.max(92,innerWidth*.075);
    var deckBounds=deck.getBoundingClientRect();
    var inside=pointer&&pointer.y>=deckBounds.top&&pointer.y<=deckBounds.bottom&&selected<0;
    var desiredFocus=inside?Math.max(-innerWidth*.44,Math.min(innerWidth*.44,pointer.x-(deckBounds.left+deckBounds.width/2))):0;
    arcFocus+=(desiredFocus-arcFocus)*(reduced?1:1-Math.exp(-dt/260));
    deck.dataset.arcFocus=arcFocus.toFixed(1);
    cards.forEach(function(card,i){
      var offset=offsetFor(i);var distance=Math.abs(offset);
      hoverStrength[i]+=((i===hovered?1:0)-hoverStrength[i])*ease;
      lifts[i]+=((i===selected?1:0)-lifts[i])*ease;
      var hot=hoverStrength[i],lift=lifts[i];
      var spread=hovered<0||i===hovered?0:Math.sign(offset-offsetFor(hovered))*14;
      spreads[i]+=(spread-spreads[i])*ease;
      var localX=offset*spacing+spreads[i];
      var arc=arcAt(localX-arcFocus,Math.max(420,innerWidth*.85),innerHeight*.24);
      // Preserve the live gallery's unified three-quarter perspective.
      var angle=(-42+Math.tanh(((localX-arcFocus)/spacing)*.5)*14)*(1-lift)*(1-hot*.85);
      var depth=40-arc.distance*180+lift*90;
      card.style.transform='translateX(calc(-50% + '+localX+'px)) translateY('+arc.y+'px) translateZ('+depth+'px) rotateX('+(!reduced?tiltX*hot:0)+'deg) rotateY('+(angle+(!reduced?tiltY*hot:0))+'deg) scale('+(1+hot*.025+lift*.03)+')';
      var baseLight=.96-arc.distance*.42;
      card.style.filter='brightness('+(baseLight+(1.12-baseLight)*hot+lift*.15)+')';
      card.style.opacity=String(Math.max(hot,Math.min(1,Math.max(0,(10-distance)*2))));
      card.style.zIndex=String(i===selected?100:i===hovered?90:50-Math.round(distance*5));
    });
    if(!document.hidden)requestAnimationFrame(animate);
  }
  document.addEventListener('visibilitychange',function(){if(!document.hidden){previousTime=0;requestAnimationFrame(animate)}});
  requestAnimationFrame(animate);
  function focus(index){
    focused=wrap(index);targetPosition+=wrap(focused-targetPosition+works.length/2)-works.length/2;activeNo.textContent=String(focused+1).padStart(2,'0');
    cards.forEach(function(card,i){var offset=i-focused,wrapped=offset;if(offset>works.length/2)wrapped-=works.length;if(offset<-works.length/2)wrapped+=works.length;card.style.setProperty('--offset',wrapped);card.style.setProperty('--distance',Math.abs(wrapped));card.style.zIndex=String(30-Math.abs(wrapped));card.classList.toggle('is-focused',i===focused);card.classList.toggle('is-selected',i===selected)});
    dots.forEach(function(dot,i){dot.classList.toggle('is-focused',i===focused);dot.classList.toggle('is-selected',i===selected)});
    syncIndex();
  }
  function open(index){
    if(window.parent!==window)window.parent.postMessage({type:'longform-open'},location.origin);
    selected=index;cards.forEach(function(card,i){card.classList.toggle('is-selected',i===index)});var item=works[index];phoneDoc.innerHTML=markup(item,index,true);readerNo.textContent=String(index+1).padStart(2,'0')+' / '+String(works.length).padStart(2,'0');readerTitle.textContent=item.title;readerType.textContent=item.segments?'长图设计':item.type+' · '+item.year;viewport.scrollTop=0;updateProgress();archive.classList.add('has-selection');reader.setAttribute('aria-hidden','false');window.setTimeout(function(){if(selected>=0)viewport.focus({preventScroll:true})},650);
  }
  function close(){selected=-1;archive.classList.remove('has-selection');reader.setAttribute('aria-hidden','true');focus(focused)}
  function step(dir){var next=((selected<0?focused:selected)+dir+works.length)%works.length;selected<0?focus(next):open(next)}
  function updateProgress(){var max=viewport.scrollHeight-viewport.clientHeight;var value=max>0?Math.round(viewport.scrollTop/max*100):0;progressBar.style.height=value+'%';progressText.textContent=String(value).padStart(2,'0')+'%'}
  document.getElementById('readerClose').addEventListener('click',close);document.getElementById('prevWork').addEventListener('click',function(){step(-1)});document.getElementById('nextWork').addEventListener('click',function(){step(1)});viewport.addEventListener('scroll',updateProgress,{passive:true});
  deck.addEventListener('wheel',function(e){if(selected>=0)return;e.preventDefault();var delta=Math.abs(e.deltaX)>Math.abs(e.deltaY)?e.deltaX:e.deltaY;targetPosition+=delta*.003;focused=wrap(Math.round(targetPosition));syncIndex()},{passive:false});
  deck.addEventListener('contextmenu',function(e){e.preventDefault()});
  deck.addEventListener('pointerdown',function(e){if(e.button!==0&&e.button!==2)return;var hit=hitCard(e.clientX,e.clientY);drag={x:e.clientX,y:e.clientY,start:targetPosition,moved:false,card:hit,button:e.button};deck.setPointerCapture(e.pointerId)});
  deck.addEventListener('pointermove',function(e){if(!drag||drag.phone)return;var delta=e.clientX-drag.x;if(Math.abs(delta)>12){drag.moved=true;targetPosition=drag.start-delta/130;focused=wrap(Math.round(targetPosition));syncIndex()}});
  deck.addEventListener('pointerup',function(e){var released=drag;if(drag&&deck.hasPointerCapture(e.pointerId))deck.releasePointerCapture(e.pointerId);drag=null;if(released&&released.button===0&&!released.moved&&released.card>=0)open(released.card)});
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
  focus(4);position=4;
})();
