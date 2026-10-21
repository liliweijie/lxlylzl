import {BrainDepthScene} from './brain-depth-scene.js';
const stage=document.querySelector('#brain-stage'),mount=document.querySelector('#brain-canvas'),loading=document.querySelector('#brain-loading'),dialog=document.querySelector('#thought-dialog');
const small=matchMedia('(max-width:700px)'),reduced=matchMedia('(prefers-reduced-motion:reduce)'),list=document.querySelector('#thought-list'),status=document.querySelector('#thought-status');
const storageKey='lx:brain-depth-demo:v2',topics=['灵感','实验','随想','未完成','留白'],records=new Map(),views=new Map();
let scene,selected=null,hovered=null,depth=0,target=0,clock=0,last=0,raf=0,paused=reduced.matches,touch=null,mouse={x:0,y:0};
try{const saved=JSON.parse(localStorage.getItem(storageKey)||'[]');if(Array.isArray(saved))for(const r of saved)if(r&&/^\d+$/.test(r.id)&&typeof r.title==='string'&&typeof r.content==='string')records.set(r.id,{id:r.id,title:r.title.slice(0,80),content:r.content.slice(0,4000),saved:true});}catch{}
function record(id){if(!records.has(id))records.set(id,{id,title:'',content:'',saved:false});return records.get(id);}
function topic(id){return topics[Number(id)%topics.length];}
function openThought(id){if(dialog.open)return;selected=id;const r=record(id);document.querySelector('#thought-number').textContent=String(Number(id)+1).padStart(3,'0')+' / '+topic(id);document.querySelector('#thought-title').value=r.title;document.querySelector('#thought-content').value=r.content;status.textContent=r.saved?'已保存在当前浏览器':'这个神经元，还没有留下想法';dialog.showModal();}
document.querySelector('#thought-close').onclick=()=>dialog.close();
dialog.addEventListener('close',()=>{views.get(selected)?.focus({preventScroll:true});selected=null;});
dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});
document.querySelector('#thought-form').addEventListener('input',()=>status.textContent='编辑中 · 点击保存后保留');
document.querySelector('#thought-form').addEventListener('submit',e=>{e.preventDefault();if(selected===null)return;const r=record(selected);r.title=document.querySelector('#thought-title').value.trim();r.content=document.querySelector('#thought-content').value;r.saved=true;try{localStorage.setItem(storageKey,JSON.stringify([...records.values()].filter(r=>r.saved)));status.textContent='已保存在当前浏览器';views.get(selected)?.classList.add('is-saved');}catch{r.saved=false;status.textContent='浏览器未允许保存，请先复制内容';}});
function syncButtons(notes){const ids=new Set(notes.map(n=>n.id));for(const [id,b]of views)if(!ids.has(id)){b.remove();views.delete(id);if(!records.get(id)?.saved)records.delete(id);}
  for(const n of notes){let b=views.get(n.id);if(!b){b=document.createElement('button');b.type='button';b.className='neuron';b.dataset.neuron=n.id;b.innerHTML='<span class="neuron-dot" aria-hidden="true"></span><span class="neuron-title"><em></em><span></span></span>';b.querySelector('em').textContent=String(Number(n.id)+1).padStart(3,'0');b.querySelector('.neuron-title>span').textContent=topic(n.id);b.setAttribute('aria-label','打开第'+(Number(n.id)+1)+'个神经元，书写'+topic(n.id));b.classList.toggle('is-saved',!!records.get(n.id)?.saved);b.onclick=()=>openThought(n.id);b.onpointerenter=b.onfocus=()=>hovered=n.id;b.onpointerleave=b.onblur=()=>hovered=null;list.append(b);views.set(n.id,b);}b.style.left=n.x+'px';b.style.top=n.y+'px';b.classList.toggle('is-visible',n.visible);}
}
function blocked(e){return document.querySelector('dialog[open],.space-header.is-menu-open')||e.target.closest('input,textarea,select,[contenteditable="true"],.space-header,.peek-rail,.motion-menu-toggle');}
function advance(amount){target=Math.max(0,target+amount);wake();}
window.addEventListener('wheel',e=>{if(blocked(e)||e.ctrlKey||e.metaKey||e.altKey||e.shiftKey||Math.abs(e.deltaX)>Math.abs(e.deltaY))return;e.preventDefault();const unit=e.deltaMode===1?16:e.deltaMode===2?innerHeight:1;advance(Math.max(-700,Math.min(700,e.deltaY*unit))*.0045);},{passive:false});
mount.addEventListener('pointerdown',e=>{if(e.pointerType==='touch'){touch={id:e.pointerId,y:e.clientY};mount.setPointerCapture(e.pointerId);}});
mount.addEventListener('pointermove',e=>{if(touch&&e.pointerId===touch.id){advance((touch.y-e.clientY)*.013);touch.y=e.clientY;}});for(const name of ['pointerup','pointercancel','lostpointercapture'])mount.addEventListener(name,()=>touch=null);
window.addEventListener('pointermove',e=>{if(e.pointerType!=='touch'){mouse.x=(e.clientX/innerWidth-.5)*2;mouse.y=(e.clientY/innerHeight-.5)*2;}});
document.documentElement.addEventListener('pointerleave',()=>mouse={x:0,y:0});
function home(){if(dialog.open)return;depth=target=0;touch=null;wake();}
document.querySelector('#brain-reset').onclick=home;
window.addEventListener('keydown',e=>{if(blocked(e)||e.target.closest('button,a')||e.ctrlKey||e.metaKey||e.altKey)return;const amount={ArrowDown:.75,ArrowUp:-.75,PageDown:3,PageUp:-3,' ':2}[e.key];if(amount!==undefined){e.preventDefault();advance(amount);}else if(e.key==='Home'){e.preventDefault();home();}});
list.addEventListener('focus',()=>{if(target<5)advance(7-target);});
const depthInput=document.querySelector('#brain-depth');
function jumpToDepth(){const value=Number(depthInput.value);if(depthInput.value.trim()!==''&&Number.isFinite(value)&&value>=0&&value<=1e9){depth=target=value;touch=null;wake();}depthInput.value=depth.toFixed(1);}
depthInput.addEventListener('focus',()=>depthInput.select());
depthInput.addEventListener('blur',jumpToDepth);
depthInput.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();depthInput.blur();}else if(e.key==='Escape'){e.preventDefault();depthInput.value=depth.toFixed(1);depthInput.blur();}});
reduced.addEventListener('change',()=>{paused=reduced.matches;wake();});
try{scene=new BrainDepthScene(mount,small.matches);loading.hidden=true;stage.dataset.ready='true';}catch(error){stage.classList.add('is-fallback');stage.dataset.ready='fallback';loading.textContent='未能开启 3D，仍可点选节点书写。';syncButtons(Array.from({length:5},(_,i)=>({id:String(i),x:0,y:0,visible:true})));}
window.addEventListener('resize',()=>scene?.resize());
function frame(now){raf=0;if(document.hidden)return;raf=requestAnimationFrame(frame);const dt=Math.min(.05,(now-(last||now))/1000);last=now;
  if(!dialog.open){if(!paused)clock+=dt;depth=reduced.matches?target:depth+(target-depth)*(1-Math.exp(-dt*6));if(Math.abs(depth-target)<.0005)depth=target;}
  if(scene){const {notes}=scene.update(depth,clock,reduced.matches?{x:0,y:0}:mouse,hovered);syncButtons(notes);}
  stage.dataset.phase=depth<2?'brain':depth<5?'entering':'inside';stage.dataset.depth=depth.toFixed(2);if(document.activeElement!==depthInput)depthInput.value=depth.toFixed(1);
}
function wake(){if(!raf&&!document.hidden){last=0;raf=requestAnimationFrame(frame);}}
document.addEventListener('visibilitychange',()=>{if(document.hidden){cancelAnimationFrame(raf);raf=0;}else wake();});
window.__brainDepth={snapshot:()=>({...scene?.snapshot(),target,phase:stage.dataset.phase,visibleNotes:[...views].filter(([,b])=>b.classList.contains('is-visible')).map(([id])=>id),paused,editorOpen:dialog.open})};wake();
