// Project the garment bounds, including shader-driven cloth motion.
export function garmentRadius(profile,angle,scale,twist=0,sway=0,depthScale=1){
 const w=profile.halfWidth,d=profile.halfDepth;
 const a=Math.cos(angle),b=Math.sin(angle)*depthScale;
 const projection=Math.hypot(a,b),effectiveAngle=Math.atan2(b,a);
 const extent=a=>Math.abs(Math.cos(a))*w+Math.abs(Math.sin(a))*d;
 const lo=effectiveAngle-Math.abs(twist),hi=effectiveAngle+Math.abs(twist),peak=Math.atan2(d,w);
 let radius=Math.max(extent(lo),extent(hi),extent(effectiveAngle));
 for(let k=Math.floor(lo/Math.PI)-1;k<=Math.ceil(hi/Math.PI)+1;k++){
  for(const a of [k*Math.PI+peak,k*Math.PI-peak])if(a>=lo&&a<=hi)radius=Math.max(radius,extent(a));
 }
 return (radius*projection+Math.abs(a*sway)+.025)*scale;
}

// Preserve ordering and open enough space on both sides of the focused item.
export function separateRow(positions,radii,pivot,gap=.14){
 const result=positions.slice();
 for(let i=pivot-1;i>=0;i--)result[i]=Math.min(result[i],result[i+1]-radii[i]-radii[i+1]-gap);
 for(let i=pivot+1;i<result.length;i++)result[i]=Math.max(result[i],result[i-1]+radii[i-1]+radii[i]+gap);
 return result;
}

export const cycleIndex=(index,count)=>((index%count)+count)%count;
export const carouselCenter=(scroll,step,count)=>Math.round((count-1)/2-scroll/step);
export function carouselSlots(center,count){
 const first=center-Math.floor(count/2);
 return Array.from({length:count},(_,i)=>({slot:first+i,id:cycleIndex(first+i,count)}));
}
export function nearestSlot(id,center,count){return id+Math.round((center-id)/count)*count;}

export function positionCompactRow(shown,states,pivot,{offset,ease,active,dragging,depthScale}){
 const ids=shown.map(shirt=>shirt.userData.index);
 const radii=shown.map(shirt=>{const s=states[shirt.userData.index];return garmentRadius(shirt.userData,s.angle,s.scale,s.velocity*.22,s.sway,depthScale);});
 const positions=separateRow(ids.map(i=>states[i].x),radii,pivot,.16);
 const left=positions[0]-radii[0],right=positions.at(-1)+radii.at(-1);
 const shift=active>=0&&!dragging?-(left+right)/2:0;
 offset+=(shift-offset)*ease;
 let minGap=Infinity;
 shown.forEach((shirt,n)=>{states[ids[n]].x=positions[n];shirt.position.x=positions[n]+offset;if(n)minGap=Math.min(minGap,positions[n]-positions[n-1]-radii[n]-radii[n-1]);});
 const necks=shown.map(shirt=>shirt.position.y+shirt.userData.collarY*shirt.scale.y);
 return {offset,minGap,collarSpread:Math.max(...necks)-Math.min(...necks),moving:Math.abs(shift-offset)>.001};
}
