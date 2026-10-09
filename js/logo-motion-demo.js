const $=selector=>document.querySelector(selector);
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
const poses=[0,1,2,3,4,5,6,7,8,9,9,10,10,10,10,9,9,8,7,6,5,4,3,2,1,0,0,0,0,0];
let timeline,svg;
function setPaused(paused){
  timeline.paused(paused);
  $('#toggle').textContent=paused?'播放':'暂停';
  $('#toggle').setAttribute('aria-pressed',String(paused));
  $('#motion-state').textContent=paused?'已暂停 · 点击播放或重播':'9.5 秒循环 · 首帧 +10 帧，尾帧 +15 帧';
  $('#canvas').dataset.playing=String(!paused);
}
function syncState(){
  const step=Math.min(94,Math.floor((timeline.time()+1e-7)*10)),reference=Math.max(0,Math.min(69,step-10));
  $('#frame').value=String(step);
  $('#canvas').dataset.frame=String(step);
  $('#canvas').dataset.phase=reference<9?'转动镂空':reference<17?'构造线':reference<30?'还原':reference<41?'字标展开':reference<50?'组合停留':reference<58?'加粗切换':'粗字标定格';
}
function restart(){timeline.restart();setPaused(false);syncState();}
async function init(){
  try{
    const response=await fetch('assets/logo-motion.svg?v=9');
    if(!response.ok)throw new Error('标志文件载入失败');
    const documentSvg=new DOMParser().parseFromString(await response.text(),'image/svg+xml');
    if(documentSvg.querySelector('parsererror'))throw new Error('标志文件格式有误');
    svg=document.importNode(documentSvg.documentElement,true);
    svg.classList.add('controlled');$('#logo-host').append(svg);
    const q=selector=>svg.querySelector(selector),frames=[...svg.querySelectorAll('.logo-frame')];
    timeline=gsap.timeline({repeat:-1,paused:true,onUpdate:syncState});
    timeline.set(q('#mark-run'),{opacity:1},0).set(q('#lockup'),{opacity:0,x:287},0)
      .set(q('#lockup-symbol'),{opacity:1},0).set(q('#normal-word'),{opacity:1,x:0},0)
      .set(q('#bold-word'),{opacity:0},0).set(q('#reveal-mask'),{attr:{width:0}},0);
    poses.forEach((pose,index)=>{const at=index===0?0:index*.1+1;timeline.set(frames,{opacity:0},at).set(frames[pose],{opacity:1},at);});
    timeline.set(q('#mark-run'),{opacity:0},4).set(q('#lockup'),{opacity:1},4)
      .to(q('#lockup'),{x:0,duration:1.1,ease:'power2.inOut'},4)
      .to(q('#reveal-mask'),{attr:{width:546},duration:1.1,ease:'power2.inOut'},4)
      .to(q('#lockup-symbol'),{opacity:0,duration:.4,ease:'power1.inOut'},6)
      .to(q('#normal-word'),{x:-165.5,duration:.4,ease:'power2.out'},6)
      .to(q('#normal-word'),{opacity:0,duration:.4},6.4)
      .to(q('#bold-word'),{opacity:1,duration:.4},6.4)
      .to({}, {duration:1.6},7.9);
    timeline.seek(0);syncState();
    $('#load-state').hidden=true;$('#canvas').setAttribute('aria-busy','false');$('#canvas').dataset.ready='true';
    ['#toggle','#restart','#logo-replay','#frame'].forEach(selector=>$(selector).disabled=false);
    setPaused(reduced.matches);
    $('#toggle').onclick=()=>setPaused(!timeline.paused());
    $('#restart').onclick=restart;$('#logo-replay').onclick=restart;
    $('#frame').oninput=event=>{const step=Number(event.target.value);timeline.seek(step*.1+.001,false);setPaused(true);syncState();};
    reduced.addEventListener('change',event=>{if(event.matches){timeline.seek(0,false);setPaused(true);}});
  }catch(error){
    $('#load-state').textContent='无法载入动画，请刷新或直接下载下方 SVG。';
    $('#canvas').setAttribute('aria-busy','false');console.error(error);
  }
}
$('#theme').onchange=event=>document.body.dataset.theme=event.target.value;
document.addEventListener('visibilitychange',()=>{if(!timeline)return;if(document.hidden)timeline.pause();else if($('#canvas').dataset.playing==='true')timeline.play();});
init();
