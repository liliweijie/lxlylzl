import {canPrintZone,designSizes,formatYuan,garmentPrice,validQuantity,zoneNames} from './shirt-catalog.mjs';

const quantityTiers=[
  {minimum:100n,percent:80,label:'8 折'},
  {minimum:30n,percent:90,label:'9 折'},
  {minimum:15n,percent:95,label:'95 折'}
];

export function quoteDesign(garment,quantities,printZones){
  const sizes=designSizes.flatMap(size=>{
    const quantity=validQuantity(quantities?.[size]);
    return quantity?[[size,quantity]]:[];
  });
  const count=sizes.reduce((total,[,quantity])=>total+BigInt(quantity),0n);
  const zones=Object.keys(zoneNames).filter(zone=>canPrintZone(garment,zone)&&printZones.includes(zone));
  const printPrice=zones.reduce((total,zone)=>total+(zone==='front'||zone==='back'?10:3),0);
  const unitPrice=garmentPrice(garment);
  const tier=quantityTiers.find(({minimum})=>count>=minimum);
  // Yuan multiplied by a percentage gives cents, so every subtotal stays exact.
  const apparel=unitPrice===undefined?null:BigInt(unitPrice*(tier?.percent??100))*count;
  const printing=BigInt(printPrice*100)*count;
  return {sizes,count,zones,unitPrice,discount:tier?.label,apparel,printing,total:apparel===null?null:apparel+printing};
}

export function formatCents(amount){
  if(amount===null) return '待确认';
  const cents=amount%100n;
  const yuan=formatYuan(amount/100n);
  return cents?yuan+'.'+String(cents).padStart(2,'0'):yuan;
}
