// Spatial streaming adapted from the user's Long Nose Dog chunk/corridor approach.
// No imports from that project: its files remain untouched.
export const CHUNK=6;
export const SEED=731904;
export function hash(seed,n){let x=(seed^Math.imul(n,0x45d9f3b))>>>0;x=Math.imul(x^(x>>>16),0x45d9f3b);x=Math.imul(x^(x>>>16),0x45d9f3b);return((x^(x>>>16))>>>0)/4294967296;}
function rng(seed){let n=0;return()=>hash(seed,++n);}
function node(seed,k,lane){if(k===0&&lane===0)return{x:0,y:0,d:0};return{x:(hash(seed^(lane+1)*17011,k*31+17)-.5)*5.2,y:(hash(seed^(lane+1)*9301,k*43+71)-.5)*3.8,d:k*CHUNK};}
export function passage(seed,d,lane=0){const k=Math.floor(d/CHUNK),u=(d-k*CHUNK)/CHUNK,t=u*u*(3-2*u),a=node(seed,k,lane),b=node(seed,k+1,lane);return{x:a.x+(b.x-a.x)*t,y:a.y+(b.y-a.y)*t,d};}
export function segmentDistance(p,a,b){const dx=b.x-a.x,dy=b.y-a.y,dz=b.d-a.d,t=Math.max(0,Math.min(1,((p.x-a.x)*dx+(p.y-a.y)*dy+(p.d-a.d)*dz)/(dx*dx+dy*dy+dz*dz||1)));return Math.hypot(p.x-a.x-t*dx,p.y-a.y-t*dy,p.d-a.d-t*dz);}
export function makeChunk(seed,id){
  const random=rng((seed^Math.imul(id,7919))>>>0),items=[],segments=[];
  for(let lane=0;lane<4;lane++)for(let k=id-1;k<=id+1;k++)for(let j=0;j<8;j++)segments.push([passage(seed,(k+j/8)*CHUNK,lane),passage(seed,(k+(j+1)/8)*CHUNK,lane)]);
  for(let lane=0;lane<3;lane++)segments.push([passage(seed,(id+.5)*CHUNK,lane),passage(seed,(id+.5)*CHUNK,lane+1)]);
  for(let layer=0;layer<3;layer++)for(let row=0;row<9;row++)for(let col=0;col<9;col++){
    const o={x:-5.1+col*1.275+(random()-.5)*.32,y:-5.1+row*1.275+(random()-.5)*.32,d:id*CHUNK+(layer+.5)*2+(random()-.5)*.30,r:.72+random()*.24,ry:random()*6.28,rz:random()*6.28};
    if(Math.hypot(o.x,o.y)>6.4||segments.some(([a,b])=>segmentDistance(o,a,b)<o.r+.64))continue;
    items.push(o);
  }
  const d=id*CHUNK+4.8,p=passage(seed,d),angle=hash(seed,id*127+3)*Math.PI*2;
  return{id,items,note:{id:String(id),x:p.x+Math.cos(angle)*.34,y:p.y+Math.sin(angle)*.34,d}};
}
export class FoldPool{
  constructor(seed=SEED){this.seed=seed;this.chunks=new Map();this.revision=0;}
  update(depth){const base=Math.floor(depth/CHUNK);let changed=false;for(const id of this.chunks.keys())if(id<base-1||id>base+5){this.chunks.delete(id);changed=true;}for(let id=base-1;id<=base+5;id++)if(!this.chunks.has(id)){this.chunks.set(id,makeChunk(this.seed,id));changed=true;}if(changed)this.revision++;return changed;}
  get items(){return [...this.chunks.values()].flatMap(c=>c.items);}
  get notes(){return [...this.chunks.values()].filter(c=>c.id>=0).map(c=>c.note);}
}
