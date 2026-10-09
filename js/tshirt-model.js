import * as THREE from '../assets/vendor/three.module.js';
import {GLTFLoader} from '../assets/vendor/tshirt/GLTFLoader.js';
const templates=new Map();let logo;
const modelFiles={tee:'tshirt-web.glb',sweatshirt:'sweatshirt-web.glb',apricot:'apricot-hoodie-web.glb',geff:'geff-sweatshirt-web.glb',patched:'patched-hoodie-web.glb'};
export async function loadTshirt(){
 await Promise.all(Object.entries(modelFiles).map(async([key,file])=>{
  const gltf=await new GLTFLoader().loadAsync('assets/tshirt/'+file),source=gltf.scene,geometries=[];source.updateMatrixWorld(true);
  source.traverse(o=>{if(o.isMesh){const g=o.geometry.clone();g.applyMatrix4(o.matrixWorld);
   const p=g.attributes.position;for(let i=0;i<p.count;i++){const y=p.getY(i),weight=1-THREE.MathUtils.smoothstep(y,-1.35,1.06);p.setZ(i,p.getZ(i)*(key==='tee'?.46:.92));p.setY(i,y-weight*weight*(key==='tee'?.22:.11));p.setX(i,p.getX(i)*(1-weight*.05));}
   p.needsUpdate=true;g.computeVertexNormals();g.computeBoundingBox();g.computeBoundingSphere();geometries.push(g);}});templates.set(key,geometries);
 }));
 logo=await new Promise(resolve=>{const image=new Image();image.onload=()=>resolve(image);image.onerror=()=>resolve(null);image.src='assets/space-mark.svg';});
}
function tube(points,radius,material){return new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points.map(p=>new THREE.Vector3(...p))),64,radius,12,false),material);}
function woodTexture(dark=false){
 const c=document.createElement('canvas');c.width=1024;c.height=256;const ctx=c.getContext('2d'),image=ctx.createImageData(1024,256);
 for(let y=0;y<256;y++)for(let x=0;x<1024;x++){
  const warp=y+5*Math.sin(x*.009)+2*Math.sin(x*.037+y*.005);
  const rings=Math.sin(warp*.44+Math.sin(warp*.085)*2)+.45*Math.sin(warp*1.7+x*.008);
  const pore=Math.sin(x*1.17+y*21.4)*Math.sin(y*3.27+x*.46);
  const v=rings*7+pore*3,at=(y*1024+x)*4,base=dark?[123,103,62]:[174,151,108];
  image.data[at]=base[0]+v;image.data[at+1]=base[1]+v*.83;image.data[at+2]=base[2]+v*.65;image.data[at+3]=255;
 }
 ctx.putImageData(image,0,0);const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;t.wrapS=t.wrapT=THREE.RepeatWrapping;t.anisotropy=8;return t;
}
const peach=woodTexture(true),hangerGrain=woodTexture();
export function makeWoodMaterial(dark=false){return new THREE.MeshPhysicalMaterial({map:dark?peach:hangerGrain,roughness:dark?.33:.48,metalness:0,clearcoat:dark?.35:.16,clearcoatRoughness:.32,bumpMap:dark?peach:hangerGrain,bumpScale:.004});}
export const metalMaterial=new THREE.MeshPhysicalMaterial({color:'#b9bdbe',metalness:1,roughness:.22,clearcoat:.3});
function makeHanger(width=1,model='tee'){
 const isLong=model!=='tee',isSweatshirt=model==='sweatshirt';
 // The narrow, raised collar needs a smaller hanger than the other long sleeves.
 const shoulderScale=isSweatshirt?.50:isLong?.60:1;
 const verticalScale=isSweatshirt?.72:isLong?.82:1;
 const depthScale=isSweatshirt?.45:isLong?.55:1;
 const collarInset=isSweatshirt?.18:isLong?.135:.09;
 const hangerTop=1.34-collarInset;
 const group=new THREE.Group(),s=new THREE.Shape();
 s.moveTo(-.09,1.34);s.lineTo(.09,1.34);s.bezierCurveTo(.095,1.15,.16,1.09,.30,1.01);s.lineTo(.52,.855);s.quadraticCurveTo(.57,.815,.54,.78);s.lineTo(.50,.76);s.lineTo(.16,.985);s.quadraticCurveTo(0,1.095,-.16,.985);s.lineTo(-.50,.76);s.lineTo(-.54,.78);s.quadraticCurveTo(-.57,.815,-.52,.855);s.lineTo(-.30,1.01);s.bezierCurveTo(-.16,1.09,-.095,1.15,-.09,1.34);
 const g=new THREE.ExtrudeGeometry(s,{depth:.065,bevelEnabled:true,bevelSegments:4,steps:1,bevelSize:.014,bevelThickness:.016,curveSegments:24});g.translate(0,0,-.0325);
 const wood=new THREE.Mesh(g,makeWoodMaterial());wood.scale.set(width*shoulderScale,verticalScale,depthScale);wood.position.set(0,1.34*(1-verticalScale)-collarInset,isLong?0:-.025);wood.castShadow=true;wood.receiveShadow=true;group.add(wood);
 const hook=tube([[0,isSweatshirt?hangerTop-.01:isLong?1.195:1.24,0],[0,1.43,0],[0,1.54,0],[0,1.63,.105],[0,1.72,.133],[0,1.83,.08],[0,1.853,-.025],[0,1.80,-.12],[0,1.73,-.133]],.009,metalMaterial.clone());group.add(hook);group.userData.hook=hook;
 return group;
}
function graphicTexture(item,index){
 const c=document.createElement('canvas');c.width=c.height=1024;const ctx=c.getContext('2d');ctx.fillStyle=item.ink;ctx.strokeStyle=item.ink;ctx.textAlign='center';
 const variant=(index*7+3)%5;
 if(variant===0){ctx.font='italic bold 130px Georgia';ctx.fillText('Stay',512,340);ctx.fillText('curious.',512,480);ctx.font='25px monospace';ctx.fillText('LXLYLZL / KEEP EXPLORING',512,550);}
 if(variant===1){ctx.font='900 160px Arial';ctx.fillText('XYZ',512,450);ctx.lineWidth=5;ctx.strokeRect(205,245,614,270);ctx.font='24px monospace';ctx.fillText('SPACE FOR IDEAS',512,565);}
 if(variant===2){ctx.lineWidth=7;for(let i=0;i<9;i++){ctx.beginPath();ctx.ellipse(512,375,48+i*23,35+i*13,-.28,0,Math.PI*2);ctx.stroke();}ctx.font='28px monospace';ctx.fillText('A LITTLE OUT OF ORDER',512,610);}
 if(variant===3){if(logo){ctx.drawImage(logo,335,200,354,354);ctx.globalCompositeOperation='source-in';ctx.fillRect(0,0,1024,1024);ctx.globalCompositeOperation='source-over';}ctx.font='bold 50px Arial';ctx.fillText('lXlYlZl',512,650);}
 if(variant===4){ctx.font='italic bold 110px Georgia';ctx.fillText('Made',512,330);ctx.fillText('to play.',512,465);ctx.font='24px monospace';ctx.fillText('FORM IS A PLAYTHING',512,535);}
 const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;t.anisotropy=8;return t;
}
function cottonMaterial(item,index,uniforms){
 const color=item.color;
 const material=new THREE.MeshPhysicalMaterial({color,roughness:.94,metalness:0,envMapIntensity:.065,sheen:.35,sheenColor:new THREE.Color(color).lerp(new THREE.Color('#eae6dc'),.3),sheenRoughness:.9,side:THREE.DoubleSide});
 material.onBeforeCompile=shader=>{
  shader.uniforms.clothSway=uniforms.sway;shader.uniforms.clothTwist=uniforms.twist;shader.uniforms.clothTime=uniforms.time;shader.uniforms.chestGraphic={value:graphicTexture(item,index)};
  shader.vertexShader='varying vec3 vClothPosition; uniform float clothSway; uniform float clothTwist; uniform float clothTime;\n'+shader.vertexShader.replace('#include <begin_vertex>',`#include <begin_vertex>
   vClothPosition=position;
   float hangingWeight = 1.0-smoothstep(-1.35,1.06,position.y);
   float lowerWeight = hangingWeight * hangingWeight;
   transformed.x += clothSway * lowerWeight;
   transformed.y -= abs(clothSway) * 0.055 * hangingWeight;
   float clothTurn = clothTwist * lowerWeight * .22;
   transformed.xz = mat2(cos(clothTurn),-sin(clothTurn),sin(clothTurn),cos(clothTurn)) * transformed.xz;
   transformed.z += sin(position.y*5.0 + position.x*4.0 + clothTime*2.0) * abs(clothSway) * .085 * lowerWeight;
  `);
  shader.fragmentShader='varying vec3 vClothPosition; uniform sampler2D chestGraphic;\n'+shader.fragmentShader.replace('#include <color_fragment>',`#include <color_fragment>
   vec2 graphicUV=vec2(vClothPosition.x/1.6+.5,(vClothPosition.y+.85)/1.6);
   if(graphicUV.x>0.0 && graphicUV.x<1.0 && graphicUV.y>0.0 && graphicUV.y<1.0 && vClothPosition.z>0.005){vec4 ink=texture2D(chestGraphic,graphicUV);diffuseColor.rgb=mix(diffuseColor.rgb,ink.rgb,ink.a);}
  `).replace('#include <roughnessmap_fragment>','#include <roughnessmap_fragment>\nroughnessFactor = clamp(roughnessFactor + sin(gl_FragCoord.x*1.3)*sin(gl_FragCoord.y*1.3)*.018,.0,1.0);');
 };
 material.customProgramCacheKey=()=> 'lxl-cotton-v2';return material;
}
export function makeShirt(item,index){
 const root=new THREE.Group();root.userData.index=index;root.userData.uniforms={sway:{value:0},twist:{value:0},time:{value:0}};
 const cloth=new THREE.Group();root.userData.cloth=cloth;root.add(cloth);
 const mat=cottonMaterial(item,index,root.userData.uniforms);
 const width=item.sizeW||1,height=item.sizeH||1;
 for(const source of templates.get(item.model||'tee')){const geometry=source.clone(),p=geometry.attributes.position;
  for(let i=0;i<p.count;i++){
   const x=p.getX(i),y=p.getY(i);
   p.setX(i,x*width);p.setY(i,1.06+(y-1.06)*height+(item.model==='tee'?0:.11));p.setZ(i,p.getZ(i)*width);
  }
  p.needsUpdate=true;geometry.computeVertexNormals();geometry.computeBoundingBox();geometry.computeBoundingSphere();
  const m=new THREE.Mesh(geometry,mat);m.castShadow=true;m.receiveShadow=true;m.userData.index=index;cloth.add(m);
 }
 const bounds=new THREE.Box3().setFromObject(cloth);root.userData.garmentWidth=bounds.max.x-bounds.min.x;root.userData.minY=bounds.min.y;root.userData.garmentTop=bounds.max.y;
 const hanger=makeHanger(width,item.model||'tee');root.add(hanger);root.userData.hook=hanger.userData.hook;return root;
}
export function addStudioReflections(renderer,scene){
 const studio=new THREE.Scene();studio.background=new THREE.Color('#9da2a0');
 const panel=(w,h,pos,rotation,color)=>{const m=new THREE.Mesh(new THREE.PlaneGeometry(w,h),new THREE.MeshBasicMaterial({color,side:THREE.DoubleSide}));m.position.set(...pos);m.rotation.set(...rotation);studio.add(m);};
 panel(6,10,[-4,2,3],[0,.5,0],'#fffaf1');panel(3,8,[4,1,2],[0,-.4,0],'#e5edf5');panel(10,3,[0,5,0],[Math.PI/2,0,0],'#ffffff');panel(2,10,[0,0,-5],[0,0,0],'#343a36');
 const pmrem=new THREE.PMREMGenerator(renderer);scene.environment=pmrem.fromScene(studio,.03).texture;pmrem.dispose();
}
