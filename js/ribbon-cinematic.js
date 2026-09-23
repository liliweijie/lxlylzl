import * as THREE from '../assets/vendor/three.module.js';
const SCROLL_SCREENS=2.3;
const mount=document.querySelector('.viewport'),status=document.querySelector('.loading');
let renderer;
try{renderer=new THREE.WebGLRenderer({antialias:true,alpha:false,powerPreference:'high-performance'});}
catch(error){status.classList.add('load-error');status.textContent='当前浏览器未能开启 3D 加速，请使用支持 WebGL 的浏览器打开此 Demo。';throw error;}
renderer.setPixelRatio(Math.min(devicePixelRatio,2));renderer.setClearColor(0x080808);renderer.outputColorSpace=THREE.SRGBColorSpace;mount.append(renderer.domElement);
const scene=new THREE.Scene(),camera=new THREE.PerspectiveCamera(48,1,.04,120),world=new THREE.Group(),ring=new THREE.Group();scene.add(world);world.add(ring);
const slider=document.querySelector('#scrub'),heading=document.querySelector('#heading'),hint=document.querySelector('#hint'),caption=document.querySelector('.caption');
const reduced=matchMedia('(prefers-reduced-motion:reduce)').matches;
let target=0,current=0,last=0,mouse={x:0,y:0},tilt={x:0,y:0};
function canvas(w,h){const c=document.createElement('canvas');c.width=w;c.height=h;return c;}
function texture(c){const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;t.anisotropy=Math.min(8,renderer.capabilities.getMaxAnisotropy());return t;}
const R=3,HEIGHT=1.65,NAME_ARC=2.36;
// A single, zero-thickness cylindrical ribbon: name arc + complementary artwork arc.
const outlines={l:[[0,0],[.32,0],[.32,1.65],[0,1.65]],X:[[0,0],[.34,0],[.6,.55],[.86,0],[1.2,0],[.8,.84],[1.18,1.65],[.84,1.65],[.6,1.13],[.36,1.65],[.02,1.65],[.4,.84]],Y:[[.43,0],[.77,0],[.77,.65],[1.2,1.65],[.84,1.65],[.6,1.02],[.36,1.65],[0,1.65],[.43,.65]],Z:[[0,0],[1.15,0],[1.15,.32],[.43,.32],[1.15,1.35],[1.15,1.65],[0,1.65],[0,1.33],[.72,1.33],[0,.3]]};
const letters='lXlYlZl',widths=[.32,1.2,.32,1.2,.32,1.15,.32],total=widths.reduce((a,b)=>a+b,0)+.14*6;let offset=-total/2;
const nameCanvas=canvas(4096,1024),nc=nameCanvas.getContext('2d');nc.fillStyle='#080808';nc.fillRect(0,0,4096,1024);nc.fillStyle='#f3f2ec';
for(let i=0;i<letters.length;i++){nc.beginPath();outlines[letters[i]].forEach(([x,y],j)=>{const px=70+(x+offset+total/2)/total*3956,py=994-y/HEIGHT*964;j?nc.lineTo(px,py):nc.moveTo(px,py)});nc.closePath();nc.fill();nc.lineWidth=12;nc.strokeStyle="#f3f2ec";nc.stroke();offset+=widths[i]+.14;}
ring.add(new THREE.Mesh(new THREE.CylinderGeometry(R,R,HEIGHT,192,1,true,-NAME_ARC/2,NAME_ARC),new THREE.MeshBasicMaterial({map:texture(nameCanvas),side:THREE.DoubleSide})));
const atlas=canvas(4096,1024),ac=atlas.getContext('2d');ac.fillStyle='#151515';ac.fillRect(0,0,4096,1024);
const atlasTexture=texture(atlas),insideTexture=texture(atlas);insideTexture.wrapS=THREE.RepeatWrapping;insideTexture.repeat.x=-1;
const outerMaterial=new THREE.MeshBasicMaterial({map:atlasTexture,side:THREE.FrontSide}),innerMaterial=new THREE.MeshBasicMaterial({map:insideTexture,side:THREE.BackSide});
ring.add(new THREE.Mesh(new THREE.CylinderGeometry(R,R,HEIGHT,192,1,true,NAME_ARC/2+.055,Math.PI*2-NAME_ARC-.11),outerMaterial));
ring.add(new THREE.Mesh(new THREE.CylinderGeometry(R,R,HEIGHT,256,1,true,NAME_ARC/2+.055,Math.PI*2-NAME_ARC-.11),innerMaterial));
const paths=['01','02','03'];
Promise.all(paths.map((n,i)=>new Promise(resolve=>{const im=new Image();im.onload=()=>{const count=12,cell=atlas.width/count;for(let j=i;j<count;j+=3)ac.drawImage(im,0,0,im.width,im.height,j*cell,0,cell,atlas.height);resolve(true)};im.onerror=()=>resolve(false);im.src=`assets/ring-posters/${n}.jpg`}))).then(results=>{atlasTexture.needsUpdate=true;insideTexture.needsUpdate=true;status.textContent=results.every(Boolean)?'':'部分作品未能加载，刷新可重试。';document.body.dataset.ready='true'});
const titles=['名字的背面，是作品。','一个名字，一个完整的世界。','绕过名字，看见作品。','走进作品里面。','回到名字，重新认识。'];
const hints=['按住拖动，改变倾斜角度。向下滚动开始。','前景是 lXlYlZl，后景是你的作品。','第一圈：镜头推进，作品铺满上方。','第二圈：作品占满视野，保留曲面透视。','一轮回到起点，继续滚动进入下一屏。'];
const smooth=t=>t*t*(3-2*t),mix=THREE.MathUtils.lerp;
function sample(p){const at=Math.min(3,Math.floor(p*4)),u=smooth(p*4-at),aspect=innerWidth/innerHeight;
 const distance=Math.max(6.9,3.7/(Math.tan(24*Math.PI/180)*aspect));
 const poses=[
  {cam:[0,.05,distance],look:[0,0,0],rotation:0,fov:48},
  {cam:[0,4.5,distance],look:[0,0,0],rotation:0,fov:48},
  {cam:[0,-.7,-1],look:[0,-.7,-3],rotation:Math.PI*2,fov:90},
  {cam:[0,0,-2.1],look:[0,0,-3],rotation:Math.PI*4,fov:70},
  {cam:[0,.05,distance],look:[0,0,0],rotation:Math.PI*6,fov:48}
 ];const a=poses[at],b=poses[at+1];return {cam:a.cam.map((v,i)=>mix(v,b.cam[i],u)),look:a.look.map((v,i)=>mix(v,b.look[i],u)),rotation:mix(a.rotation,b.rotation,u),fov:mix(a.fov,b.fov,u)};
}
function resize(){renderer.setSize(innerWidth,innerHeight);camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();readScroll();}
function readScroll(){target=Math.max(0,Math.min(1,scrollY/(SCROLL_SCREENS*innerHeight)));}
function go(p){scrollTo({top:p*SCROLL_SCREENS*innerHeight,behavior:'instant'});target=p;}
document.querySelectorAll('[data-p]').forEach(b=>b.onclick=()=>go(Number(b.dataset.p)));slider.oninput=()=>go(Number(slider.value)/1000);
addEventListener('scroll',readScroll,{passive:true});addEventListener('resize',resize);
addEventListener('pointermove',e=>{if(e.pointerType==='touch')return;mouse={x:(e.clientX/innerWidth-.5)*2,y:(e.clientY/innerHeight-.5)*2}});
document.documentElement.addEventListener('pointerleave',()=>mouse={x:0,y:0});
let drag=null,dragX=0,dragY=0,shift={x:0,y:0};
mount.addEventListener('pointerdown',e=>{if(e.button!==0||e.pointerType==='touch')return;drag={x:e.clientX,y:e.clientY,rx:dragX,ry:dragY};mount.setPointerCapture(e.pointerId);mount.classList.add('dragging')});
mount.addEventListener('pointermove',e=>{if(!drag)return;dragX=THREE.MathUtils.clamp(drag.rx+(e.clientY-drag.y)/innerHeight*.9,-.22,.22);dragY=THREE.MathUtils.clamp(drag.ry+(e.clientX-drag.x)/innerWidth*.9,-.3,.3);shift.x=THREE.MathUtils.clamp((e.clientX-drag.x)/innerWidth*.4,-.12,.12);shift.y=THREE.MathUtils.clamp(-(e.clientY-drag.y)/innerHeight*.3,-.09,.09)});
function release(){drag=null;mount.classList.remove('dragging')}
mount.addEventListener('pointerup',release);mount.addEventListener('pointercancel',release);mount.addEventListener('lostpointercapture',release);
let raf;
function render(time){const dt=Math.min(50,time-(last||time-16));last=time;const ease=reduced?1:1-Math.exp(-dt/160);current+=(target-current)*ease;
 const p=current,s=sample(p),endWeight=Math.max(0,1-Math.min(p,1-p)*8);
 if(!drag){dragX*=1-ease*.12;dragY*=1-ease*.12;shift.x*=1-ease*.12;shift.y*=1-ease*.12}
 tilt.x+=((mouse.y*.055+dragX)*endWeight-tilt.x)*ease;tilt.y+=((mouse.x*.085+dragY)*endWeight-tilt.y)*ease;
 world.position.set(shift.x*endWeight,shift.y*endWeight,0);
 world.rotation.set(reduced?0:tilt.x,reduced?0:tilt.y,0);ring.rotation.y=s.rotation;
 camera.position.set(...s.cam);camera.lookAt(new THREE.Vector3(...s.look));camera.fov=s.fov;camera.updateProjectionMatrix();
 const stage=Math.round(p*4);heading.textContent=titles[stage];hint.textContent=hints[stage];slider.value=Math.round(p*1000);
 document.querySelectorAll('[data-p]').forEach(b=>b.setAttribute('aria-pressed',String(Math.round(Number(b.dataset.p)*4)===stage)));
 caption.style.bottom=p>.15&&p<.34?'82%':p>.38&&p<.83?'25%':innerWidth<650?'160px':'95px';
 // Keep artworks present during dragging, including the opening/closing pose.
 outerMaterial.color.setScalar(1);innerMaterial.color.setScalar(1);
 const exit=Math.max(0,Math.min(1,(scrollY-SCROLL_SCREENS*innerHeight)/innerHeight));for(const el of [mount,caption,document.querySelector('.controls'),document.querySelector('.scroll-mark')]){el.style.translate=`0 ${-exit*innerHeight}px`;el.style.opacity=String(1-exit);el.style.pointerEvents=exit>.95?'none':''}
 document.body.dataset.drag=drag?'active':'idle';document.body.dataset.exit=exit.toFixed(2);
 renderer.render(scene,camera);document.body.dataset.stage=String(stage+1);raf=requestAnimationFrame(render);
}
document.addEventListener('visibilitychange',()=>{if(document.hidden)cancelAnimationFrame(raf);else{last=0;raf=requestAnimationFrame(render)}});
renderer.domElement.addEventListener('webglcontextlost',e=>{e.preventDefault();cancelAnimationFrame(raf);status.textContent='3D 画面暂时中断，请刷新页面恢复。'});
resize();raf=requestAnimationFrame(render);
