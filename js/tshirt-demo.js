import * as THREE from '../assets/vendor/three.module.js';
import {makeShirt,loadTshirt,makeWoodMaterial,metalMaterial,addStudioReflections} from './tshirt-model.js';

const $=s=>document.querySelector(s),mount=$('#scene');
const embedded=document.documentElement.classList.contains('tshirt-embedded');
let frameVisible=true;
const items=[
 {name:'黑色 T 恤',model:'tee',color:'#252628',ink:'#e9e7df'},
 {name:'白色 T 恤',model:'tee',color:'#eeeef0',ink:'#34383e'},
 {name:'灰色长袖',model:'sweatshirt',color:'#81848a',ink:'#e9e7df'},
 {name:'藏蓝 T 恤',model:'tee',color:'#263249',ink:'#e9e7df'},
 {name:'白色 T 恤',model:'tee',color:'#eeeef0',ink:'#34383e'},
 {name:'藏蓝连帽卫衣',model:'apricot',color:'#263249',ink:'#e9e7df'},
 {name:'灰色 T 恤',model:'tee',color:'#81848a',ink:'#e9e7df'},
 {name:'黑色 T 恤',model:'tee',color:'#252628',ink:'#e9e7df'},
 {name:'白色运动长袖',model:'geff',color:'#eeeef0',ink:'#34383e'},
 {name:'藏蓝 T 恤',model:'tee',color:'#263249',ink:'#e9e7df'},
 {name:'灰色宽松连帽卫衣',model:'patched',color:'#81848a',ink:'#e9e7df'},
 {name:'白色 T 恤',model:'tee',color:'#eeeef0',ink:'#34383e'},
 {name:'黑色 T 恤',model:'tee',color:'#252628',ink:'#e9e7df'}
];
items.forEach(item=>{item.sizeW=.88+Math.random()*.17;item.sizeH=item.model==='tee'?.88+Math.random()*.20:.94+Math.random()*.08;});
const rackStep=.72;
let renderer;
try{renderer=new THREE.WebGLRenderer({antialias:true,alpha:false,powerPreference:'high-performance'});}catch(e){$('#loading').textContent='当前浏览器无法打开三维画面。请开启硬件加速后重试。';throw e;}
renderer.setPixelRatio(Math.min(devicePixelRatio,1.7));renderer.setClearColor('#080808');renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.25;renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;mount.append(renderer.domElement);
const scene=new THREE.Scene(),camera=new THREE.OrthographicCamera(-6,6,4,-4,.1,50);camera.position.set(0,1.0,14);camera.lookAt(0,.35,0);
scene.add(new THREE.HemisphereLight('#cad7e3','#14100b',.19));
const light=new THREE.DirectionalLight('#fff5e5',.28);light.position.set(-3,5,12);scene.add(light);
const fill=new THREE.DirectionalLight('#b8cbdf',.14);fill.position.set(6,1,4);scene.add(fill);addStudioReflections(renderer,scene);
const stage=new THREE.Group();stage.position.y=.38;scene.add(stage);
const wall=new THREE.Mesh(new THREE.PlaneGeometry(50,25),new THREE.MeshBasicMaterial({color:'#080808',toneMapped:false}));wall.position.z=-.86;scene.add(wall);
const floor=new THREE.Mesh(new THREE.PlaneGeometry(40,20),new THREE.MeshStandardMaterial({color:'#161614',roughness:.8,metalness:.15,envMapIntensity:.06}));floor.rotation.x=-Math.PI/2;floor.position.set(0,-2.1,3);floor.receiveShadow=true;scene.add(floor);
const spotlight=new THREE.SpotLight('#edf3ff',0,15,.50,1,2);spotlight.castShadow=true;spotlight.shadow.mapSize.set(512,512);spotlight.shadow.radius=5;spotlight.shadow.bias=-.00025;spotlight.shadow.normalBias=.009;scene.add(spotlight,spotlight.target);
const lamp=new THREE.Group();scene.add(lamp);
const lampBody=new THREE.Mesh(new THREE.CylinderGeometry(.095,.105,.18,32),new THREE.MeshStandardMaterial({color:'#111315',metalness:.65,roughness:.50,envMapIntensity:.12}));lamp.add(lampBody);lamp.scale.setScalar(.52);
const lampLens=new THREE.Mesh(new THREE.CircleGeometry(.079,32),new THREE.MeshBasicMaterial({color:'#a9b9ca'}));lampLens.rotation.x=-Math.PI/2;lampLens.position.y=.096;lamp.add(lampLens);
const lampFoot=new THREE.Mesh(new THREE.CylinderGeometry(.12,.12,.027,28),new THREE.MeshStandardMaterial({color:'#131518',metalness:.65,roughness:.50,envMapIntensity:.12}));lampFoot.position.y=-.205;lamp.add(lampFoot);
let lampX=0,lampPower=0;
const beamMaterial=new THREE.ShaderMaterial({
 uniforms:{strength:{value:0},tint:{value:new THREE.Color('#bdcadd')}},transparent:true,depthWrite:false,depthTest:true,blending:THREE.AdditiveBlending,
 vertexShader:'varying vec2 vUv; void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}',
 fragmentShader:`varying vec2 vUv;uniform float strength;uniform vec3 tint;
 float grain(vec2 p){return fract(sin(dot(p,vec2(12.9898,78.233)))*43758.5453);}
 void main(){float y=vUv.y;float x=abs(vUv.x-.5);float spread=.022+y*.43;
 float softEdge=exp(-pow(x/spread,2.0)*3.6);
 float vertical=(1.0-y*.78)*(1.0-smoothstep(.68,1.0,y))*smoothstep(.0,.022,y);
 float dust=.72+.28*grain(gl_FragCoord.xy);
 gl_FragColor=vec4(tint,softEdge*vertical*dust*strength);}`
});
const beam=new THREE.Mesh(new THREE.PlaneGeometry(4.0,5.2),beamMaterial);beam.position.z=-.52;scene.add(beam);
const glowMaterial=new THREE.ShaderMaterial({uniforms:{strength:{value:0}},transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,
 vertexShader:'varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}',
 fragmentShader:'varying vec2 vUv;uniform float strength;void main(){float d=length((vUv-.5)*vec2(1.,1.9));gl_FragColor=vec4(.80,.87,1.,exp(-d*d*32.)*strength);}'
});
const glow=new THREE.Mesh(new THREE.PlaneGeometry(.5,.28),glowMaterial);scene.add(glow);
const rodWood=makeWoodMaterial(true);rodWood.map=rodWood.map.clone();rodWood.map.center.set(.5,.5);rodWood.map.rotation=Math.PI/2;rodWood.map.needsUpdate=true;rodWood.bumpMap=rodWood.map;
const rod=new THREE.Mesh(new THREE.CylinderGeometry(.052,.052,10.3,48),rodWood);rod.rotation.z=Math.PI/2;rod.position.y=1.72;rod.castShadow=true;stage.add(rod);
const mounts=[];for(const x of [-5.12,5.12]){
 const finish=metalMaterial.clone();finish.color.set('#c2bab0');finish.roughness=.20;finish.envMapIntensity=1.1;
 const profile=[[0,-.13],[.050,-.13],[.063,-.122],[.068,-.108],[.068,.108],[.063,.122],[.050,.13],[0,.13]].map(p=>new THREE.Vector2(...p));
 const collar=new THREE.Mesh(new THREE.LatheGeometry(profile,48),finish);collar.rotation.z=Math.PI/2;collar.position.set(x,1.72,0);collar.castShadow=true;stage.add(collar);mounts.push(collar);
 for(const dx of [-.085,.085]){const trim=new THREE.Mesh(new THREE.TorusGeometry(.068,.002,6,48),finish.clone());trim.rotation.y=Math.PI/2;trim.position.set(x+dx,1.72,0);stage.add(trim);mounts.push(trim);}
 const base=new THREE.Mesh(new THREE.CylinderGeometry(.09,.09,.035,40),finish.clone());base.rotation.x=Math.PI/2;base.position.set(x,1.72,-.18);stage.add(base);mounts.push(base);
 const stem=new THREE.Mesh(new THREE.CylinderGeometry(.026,.026,.14,24),finish.clone());stem.rotation.x=Math.PI/2;stem.position.set(x,1.72,-.09);stage.add(stem);mounts.push(stem);
}
try{await loadTshirt();}catch(error){$('#loading').textContent='T 恤模型未能载入，请刷新重试。';throw error;}
const shirts=items.map((item,i)=>{const s=makeShirt(item,i);s.position.x=(i-(items.length-1)/2)*rackStep;s.rotation.y=1.24;stage.add(s);return s;});
const states=shirts.map((s,i)=>({x:s.position.x,y:0,z:0,angle:1.24,scale:1,sway:0,clothVelocity:0,velocity:0,index:i}));
let hover=-1,selected=-1,detailMix=0,targetMix=0,scroll=0,scrollTarget=0,drag=null,rotation=0,rotationTarget=0,mouseX=0,last=0,raf=0,ready=false;
const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches,ray=new THREE.Raycaster(),pointer=new THREE.Vector2();
const buttons=items.map((item,i)=>{const b=document.createElement('button');b.textContent=String(i+1).padStart(2,'0');b.setAttribute('aria-label',`查看 ${item.name}`);b.onclick=()=>open(i);b.onfocus=()=>{if(selected<0)setHover(i)};$('#items').append(b);return b;});
function caption(i){$('#counter').textContent=i<0?'':`${String(i+1).padStart(2,'0')} / ${items.length}`;$('#title').textContent=i<0?'挑一件，看看。':items[i].name;buttons.forEach((b,n)=>b.setAttribute('aria-current',String(n===i)));}
function setHover(i){if(i===hover)return;hover=i;caption(i);$('#experiment').dataset.focus=String(i);wake();}
function open(i){selected=(i+items.length)%items.length;targetMix=1;hover=selected;rotationTarget=0;$('#close').hidden=true;$('#home').hidden=true;$('.detail-nav').hidden=false;$('#instruction').textContent='按住拖动转动 · 左右切换 · 点击空白或按 Esc 收回';mount.style.touchAction='none';caption(selected);$('#experiment').dataset.view='detail';wake();}
function close(){selected=-1;targetMix=0;hover=-1;rotationTarget=0;$('#close').hidden=true;$('#home').hidden=false;$('.detail-nav').hidden=true;$('#instruction').textContent=innerWidth<700?'轻点展开 · 再点查看 · 左右滑动衣架':'鼠标经过展开 · 点击单件查看';mount.style.touchAction='pan-y';$('#experiment').dataset.view='rack';mount.focus({preventScroll:true});caption(-1);wake();}
$('#close').onclick=close;$('#prev').onclick=()=>open(selected-1);$('#next').onclick=()=>open(selected+1);$('#reset').onclick=()=>{close();scrollTarget=0;wake()};
function resize(){const w=mount.clientWidth,h=mount.clientHeight,aspect=w/h;const worldH=aspect<1?6.7:Math.max(6.6,12.4/aspect);camera.left=-worldH*aspect/2;camera.right=worldH*aspect/2;camera.top=worldH/2;camera.bottom=-worldH/2;camera.updateProjectionMatrix();renderer.setSize(w,h);scrollTarget=Math.max(-maxScroll(),Math.min(maxScroll(),scrollTarget));wake();}
function maxScroll(){return Math.max(0,5.15-(camera.right-camera.left)/2+.55);}
function hit(e){const rect=mount.getBoundingClientRect();pointer.set((e.clientX-rect.left)/rect.width*2-1,-(e.clientY-rect.top)/rect.height*2+1);ray.setFromCamera(pointer,camera);const hits=ray.intersectObjects(shirts.filter(s=>s.visible&&(selected<0||s.userData.index===selected)),true);for(const h of hits){let o=h.object;while(o&&!Number.isInteger(o.userData.index))o=o.parent;if(o)return o.userData.index;}return -1;}
mount.addEventListener('pointermove',e=>{mouseX=(e.clientX/mount.clientWidth-.5)*2;if(drag){const dx=e.clientX-drag.x,dy=e.clientY-drag.y;drag.moved=Math.hypot(dx,dy)>6;if(selected>=0)rotationTarget=THREE.MathUtils.clamp(drag.rotation+dx/mount.clientWidth*5,-2.7,2.7);else if(drag.moved){scrollTarget=THREE.MathUtils.clamp(drag.scroll+dx/mount.clientWidth*(camera.right-camera.left),-maxScroll(),maxScroll());hover=-1;}wake();return;}if(e.pointerType!=='touch'&&selected<0){const i=hit(e);setHover(i);mount.style.cursor=i<0?'grab':'pointer';wake();}});
mount.addEventListener('pointerleave',()=>{if(!drag&&selected<0){setHover(-1);mount.style.cursor=''}});
mount.addEventListener('pointerdown',e=>{if(e.button!==0)return;drag={x:e.clientX,y:e.clientY,rotation:rotationTarget,scroll:scrollTarget,index:hit(e),moved:false};mount.setPointerCapture(e.pointerId);mount.classList.add('is-dragging');wake();});
mount.addEventListener('pointerup',e=>{const d=drag;drag=null;mount.classList.remove('is-dragging');if(!d)return;if(!d.moved&&selected>=0&&d.index<0){close();return;}if(!d.moved&&selected<0&&d.index>=0){if(e.pointerType==='touch'&&hover!==d.index)setHover(d.index);else open(d.index);}rotationTarget=0;wake();});
mount.addEventListener('pointercancel',()=>{drag=null;rotationTarget=0;mount.classList.remove('is-dragging');wake()});
mount.addEventListener('wheel',e=>{
 if(e.ctrlKey)return;
 if(embedded&&!e.shiftKey&&Math.abs(e.deltaY)>=Math.abs(e.deltaX)){
  e.preventDefault();const unit=e.deltaMode===1?16:e.deltaMode===2?mount.clientHeight:1;
  window.parent.postMessage({type:'tshirt-page-scroll',delta:e.deltaY*unit},location.origin);return;
 }
 if(selected>=0||maxScroll()===0)return;
 const amount=Math.abs(e.deltaX)>Math.abs(e.deltaY)?e.deltaX:e.deltaY;if(!amount)return;
 e.preventDefault();scrollTarget=THREE.MathUtils.clamp(scrollTarget-amount*.008,-maxScroll(),maxScroll());wake();
},{passive:false});
document.addEventListener('keydown',e=>{if(e.key==='Escape')close();if(e.key==='ArrowLeft'||e.key==='ArrowRight'){if(selected>=0){e.preventDefault();open(selected+(e.key==='ArrowLeft'?-1:1));}else if(e.target===mount){e.preventDefault();setHover(((hover<0?4:hover)+(e.key==='ArrowLeft'?-1:1)+items.length)%items.length);}}if(e.key==='Enter'&&e.target===mount&&hover>=0)open(hover);});
document.addEventListener('click',e=>{if(selected>=0&&!e.target.closest('button,a,#scene'))close();});
function wake(){if(!raf&&!document.hidden&&frameVisible)raf=requestAnimationFrame(render);}
function render(time){raf=0;const dt=Math.min(.04,(time-(last||time-16))/1000);last=time;const ease=reduced?1:1-Math.exp(-dt*8.5);detailMix+=(targetMix-detailMix)*ease;scroll+=(scrollTarget-scroll)*ease;rotation+=(rotationTarget-rotation)*ease;
 const active=selected>=0?selected:hover;let moving=Math.abs(detailMix-targetMix)+Math.abs(scrollTarget-scroll)+Math.abs(rotationTarget-rotation)>.0005;
 $('#experiment').dataset.model=active<0?'none':items[active].model;$('#experiment').dataset.garments=String(items.length);
 shirts.forEach((shirt,i)=>{
  const state=states[i],distance=active<0?0:i-active;const gap=active<0?0:Math.sign(distance)*(active>=0?Math.max(.60,shirts[active].userData.garmentWidth*.27):.60);const baseX=(i-(items.length-1)/2)*rackStep+gap+scroll;
  const focused=i===active;const detail=selected===i;const mix=detailMix;
  const tx=THREE.MathUtils.lerp(baseX,detail?0:baseX*1.3+Math.sign(distance)*1.8,mix),ty=THREE.MathUtils.lerp(0,detail?.25:0,mix),tz=THREE.MathUtils.lerp(0,detail?2.2:-1,mix);
  const angle=detail?rotation:focused?mouseX*.055:(1.24+Math.sin(i*1.9)*.065);
  const detailScale=Math.min(mount.clientWidth<700?Math.max(.70,Math.min(1.28,(camera.right-camera.left)*.78/shirt.userData.garmentWidth)):1.38,2.10/Math.abs(shirt.userData.minY));
  const scale=THREE.MathUtils.lerp(1,detail?detailScale:.85,mix);
  const change=angle-state.angle;state.velocity+=(change*48-state.velocity*11)*dt;state.angle+=state.velocity*dt;if(reduced){state.angle=angle;state.velocity=0;}
  const pull=THREE.MathUtils.clamp((tx-state.x)*.14+state.velocity*.023,-.19,.19);
  state.clothVelocity+=((pull-state.sway)*44-state.clothVelocity*6.8)*dt;state.sway=THREE.MathUtils.clamp(state.sway+state.clothVelocity*dt,-.18,.18);
  state.x+=(tx-state.x)*ease;state.y+=(ty-state.y)*ease;state.z+=(tz-state.z)*ease;state.scale+=(scale-state.scale)*ease;
  if(reduced){state.sway=0;state.clothVelocity=0;}
  shirt.position.set(state.x,state.y,state.z);shirt.rotation.set(0,state.angle,0);shirt.scale.setScalar(state.scale);shirt.userData.hook.rotation.y=-state.angle-.65;shirt.userData.uniforms.sway.value=state.sway;shirt.userData.uniforms.twist.value=state.velocity;shirt.userData.uniforms.time.value=time*.001;shirt.visible=!(!detail&&mix>.999);
  shirt.traverse(o=>{if(o.isMesh){o.material.transparent=mix>.01&&!detail;o.material.opacity=detail?1:1-mix*.93;}});
  shirt.userData.cloth.children.forEach(m=>m.material.envMapIntensity+=( (focused?.28:.065)-m.material.envMapIntensity )*ease);
  moving||=Math.abs(tx-state.x)+Math.abs(change)+Math.abs(state.velocity)+Math.abs(scale-state.scale)+Math.abs(state.sway)+Math.abs(state.clothVelocity)>.001;
 });
 rod.material.transparent=true;rod.material.opacity=1-detailMix;mounts.forEach(m=>{m.visible=detailMix<.999;m.material.transparent=true;m.material.opacity=1-detailMix});rod.visible=detailMix<.999;
 const lightingX=active>=0?states[active].x:mouseX*(camera.right-camera.left)/2;
 const power=active>=0?(selected>=0?26:42):1;
 lampX+=(lightingX-lampX)*ease;lampPower+=(power-lampPower)*ease;
 lamp.position.set(lampX,-1.97,selected>=0?5.0:3.6);const aimed=new THREE.Vector3(lightingX,.22+stage.position.y,selected>=0?2.2:0);
 lamp.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),aimed.clone().sub(lamp.position).normalize());spotlight.position.copy(lamp.position);spotlight.target.position.copy(aimed);spotlight.intensity=lampPower;
 beam.position.set(lampX,.57,-.52);beamMaterial.uniforms.strength.value=Math.min(1,lampPower/42)*.13;
 glow.position.set(lampX,-1.94,selected>=0?5.02:3.62);glow.quaternion.copy(camera.quaternion);glowMaterial.uniforms.strength.value=Math.min(1,lampPower/42)*.28;
 $('#experiment').dataset.light=active>=0?'focused':'dim';moving||=Math.abs(lightingX-lampX)+Math.abs(power-lampPower)>.01;
 renderer.render(scene,camera);$('#experiment').dataset.motion=moving?'moving':'settled';if(!ready){ready=true;$('#loading').hidden=true;$('#experiment').dataset.ready='true';if(embedded)window.parent.postMessage({type:'tshirt-ready'},location.origin);}
 if(moving||drag)wake();
}
if(embedded)window.addEventListener('message',event=>{
 if(event.origin!==location.origin||event.source!==window.parent||event.data?.type!=='tshirt-visibility')return;
 frameVisible=event.data.visible===true;$('#experiment').dataset.paused=String(!frameVisible);
 if(!frameVisible){cancelAnimationFrame(raf);raf=0;drag=null;rotationTarget=0;mount.classList.remove('is-dragging');if(selected<0)setHover(-1);}
 else{last=0;wake();}
});
addEventListener('resize',resize);new ResizeObserver(resize).observe(mount);document.addEventListener('visibilitychange',()=>{if(document.hidden){cancelAnimationFrame(raf);raf=0}else{last=0;wake()}});renderer.domElement.addEventListener('webglcontextlost',e=>{e.preventDefault();$('#loading').hidden=false;$('#loading').textContent='三维画面暂时中断，请刷新恢复。'});
resize();caption(-1);$('#instruction').textContent=innerWidth<700?'轻点展开 · 再点查看 · 左右滑动衣架':'鼠标经过展开 · 点击单件查看';
