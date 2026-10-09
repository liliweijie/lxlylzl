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
