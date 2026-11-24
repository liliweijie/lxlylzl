export const catalog = [
  {id:'tee', name:'短袖', price:59, description:'经典圆领短袖，适合正面大图印花。'},
  {id:'crew', name:'卫衣', price:79, description:'圆领长袖款，前后衣面均可定制。'},
  {id:'zip', name:'拉链卫衣', price:99, description:'前襟带拉链，可印左胸小标和帽檐小标。'},
  {id:'hoodie', name:'戴帽卫衣', price:99, description:'连帽套头款，前侧保留袋鼠口袋。'},
];

export const designSizes=['XS','S','M','L','XL','2XL','3XL'];
export const validQuantity=value=>Number.isSafeInteger(value)&&value>0?value:0;

const yuan=new Intl.NumberFormat('zh-CN',{maximumFractionDigits:2});
export const formatYuan=amount=>'¥'+yuan.format(amount);
export const garmentPrice=id=>catalog.find(garment=>garment.id===id)?.price;

const black=['黑色','#151515'];
const white=['白色','#f1f1f1'];
const gray=['灰色','#aab0ad'];
const blue=['蓝色','#2865b7'];
const green=['绿色','#4d834f'];
const yellow=['黄色','#e9b934'];
const red=['红色','#c6343c'];
const navy=['藏青色','#243354'];
const teal=['青绿色','#218981'];

const palettes={
  tee:[black,white,gray,blue,green,yellow,red],
  crew:[black,white,gray,navy,red],
  hoodie:[black,white,yellow,green,blue,red],
  zip:[black,gray,red,teal]
};

export function garmentPalette(garment){
  return Object.hasOwn(palettes,garment)?palettes[garment]:palettes.tee;
}

export function defaultGarmentColor(garment){
  return (garment==='zip'?black:white)[1];
}

// Saved designs can still reference the former raglan cut.
export const garmentNames = {...Object.fromEntries(catalog.map(({id,name})=>[id,name])),raglan:'插肩短袖'};

export const zoneNames={
  front:'正面大图',
  chest:'左胸小标',
  back:'背面大图',
  backMark:'背面小标',
  sleeve:'袖侧小标',
  brim:'帽檐小标'
};
export const hasPrintableBrim=garment=>garment==='zip'||garment==='hoodie';
export function canPrintZone(garment,zone){
  return Object.hasOwn(zoneNames,zone)
    && (zone!=='front'||garment!=='zip')
    && (zone!=='brim'||hasPrintableBrim(garment));
}
