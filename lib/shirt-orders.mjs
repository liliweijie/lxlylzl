import {createHash,createHmac,timingSafeEqual} from 'node:crypto';
import * as blob from '@vercel/blob';
import {canPrintZone,designSizes,garmentNames,validQuantity} from './shirt-catalog.mjs';
import {formatCents,quoteDesign} from './shirt-pricing.mjs';

const MiB=1024*1024;
export const orderIdPattern=/^[a-f0-9]{32}$/;
export const orderPrefix='shirt/orders/';
const previewMime={png:'image/png',jpg:'image/jpeg',jpeg:'image/jpeg',webp:'image/webp'};
const sourceExtensions=new Set([...Object.keys(previewMime),'psd','psb','ai','pdf','svg']);
const limitBuckets=new Map();

export class OrderError extends Error {
  constructor(status,message){super(message);this.status=status;}
}
export function response(body,status=200,headers={}){
  return Response.json(body,{status,headers:{'Cache-Control':'private, no-store','X-Content-Type-Options':'nosniff',...headers}});
}
export function failure(error){
  if(error instanceof OrderError) return response({error:error.message},error.status);
  console.error('Shirt order service failed:',error?.name??'Error');
  return response({error:'订单服务暂时不可用，请稍后重试。'},503);
}
export function sameOrigin(request){
  const origin=request.headers.get('origin');
  return origin===new URL(request.url).origin&&(!request.headers.has('sec-fetch-site')||request.headers.get('sec-fetch-site')==='same-origin');
}
export function nativeClient(request){
  const origin=request.headers.get('origin');
  return request.headers.get('x-shirt-client')==='wechat-miniprogram'
    && (!origin||origin==='https://servicewechat.com')
    && !request.headers.has('sec-fetch-site');
}
export async function readBody(request,{allowNative=false}={}){
  if(!sameOrigin(request)&&!(allowNative&&nativeClient(request))) throw new OrderError(403,'请从 Shirt 页面发起请求。');
  if(!/^application\/json(?:\s*;|$)/i.test(request.headers.get('content-type')??'')) throw new OrderError(415,'请提交有效的表单。');
  const limit=24_000;
  if(Number(request.headers.get('content-length'))>limit) throw new OrderError(413,'表单内容过长。');
  const reader=request.body?.getReader();
  if(!reader) throw new OrderError(400,'表单为空。');
  try{
    let length=0;
    const chunks=[];
    while(true){
      const {value,done}=await reader.read();
      if(done) break;
      length+=value.length;
      if(length>limit){void reader.cancel().catch(()=>{});throw new OrderError(413,'表单内容过长。');}
      chunks.push(value);
    }
    return JSON.parse(Buffer.concat(chunks).toString('utf8'));
  }catch(error){
    if(error instanceof OrderError) throw error;
    throw new OrderError(400,'无法读取表单。');
  }finally{reader.releaseLock();}
}
export function throttle(request,group,limit,minutes){
  const ip=request.headers.get('x-vercel-forwarded-for')?.split(',')[0].trim().slice(0,64)||'local';
  const key=group+':'+ip;
  const now=Date.now();
  if(limitBuckets.size>=1500){
    for(const [id,bucket] of limitBuckets) if(bucket.expires<=now)limitBuckets.delete(id);
    if(limitBuckets.size>=1500&&!limitBuckets.has(key)) throw new OrderError(429,'请求过于频繁，请稍后重试。');
  }
  let bucket=limitBuckets.get(key);
  if(!bucket||bucket.expires<=now){bucket={count:0,expires:now+minutes*60_000};limitBuckets.set(key,bucket);}
  if(++bucket.count>limit) throw new OrderError(429,'请求过于频繁，请稍后重试。');
}
export function digest(value){return createHash('sha256').update(JSON.stringify(value)).digest('base64url');}
export function safeEqual(a,b){
  const hash=value=>createHash('sha256').update(String(value??'')).digest();
  return timingSafeEqual(hash(a),hash(b));
}
function signature(secret,purpose,encoded){return createHmac('sha256',secret).update(purpose+'.'+encoded).digest('base64url');}
export function sign(secret,purpose,data){
  const encoded=Buffer.from(JSON.stringify(data)).toString('base64url');
  return encoded+'.'+signature(secret,purpose,encoded);
}
export function verify(secret,purpose,token){
  if(typeof token!=='string'||token.length>1200||!/^[-_\w]+\.[-_\w]+$/.test(token)) return null;
  const [encoded,proof]=token.split('.');
  if(!safeEqual(proof,signature(secret,purpose,encoded))) return null;
  try{
    const payload=JSON.parse(Buffer.from(encoded,'base64url').toString());
    return Number.isSafeInteger(payload?.expires)&&payload.expires>Date.now()?payload:null;
  }catch{return null;}
}
function text(value,max){
  if(typeof value!=='string') return '';
  const clean=value.replace(/[\u0000-\u001f\u007f]/g,' ').trim();
  return clean.length<=max?clean:'';
}
function readShipping(input){
  const name=text(input?.name,64),phone=text(input?.phone,32);
  const region=text(input?.region,120),address=text(input?.address,240),notes=text(input?.notes,400);
  if(!name||!region||!address||!/^\+?[\d ()-]+$/.test(phone)||!/^\d{7,15}$/.test(phone.replace(/\D/g,''))){
    throw new OrderError(400,'请填写有效的收件人、电话、地区与详细地址。');
  }
  return {name,phone,region,address,notes};
}
function readFiles(input,printZones){
  if(!Array.isArray(input)||input.length>13) throw new OrderError(400,'附件列表有误，请重新打开结算页。');
  const slots=new Set();
  const accepted=input.map(entry=>{
    const slot=entry?.slot;
    const main=slot==='preview';
    const kind=typeof slot==='string'?slot.match(/^(\w+)-(source|preview)$/):null;
    if((!main&&(!kind||!printZones.includes(kind[1])))||slots.has(slot)) throw new OrderError(400,'附件的印花位置有误。');
    slots.add(slot);
    const name=text(entry.name,120).replace(/[/\\]/g,'_');
    const extension=name.match(/\.([a-z0-9]+)$/i)?.[1].toLowerCase();
    const source=kind?.[2]==='source';
    const mime=source?'application/octet-stream':previewMime[extension];
    const size=entry.size;
    if(!name||!mime||!sourceExtensions.has(extension)||!Number.isSafeInteger(size)||size<1||size>(source?15:20)*MiB){
      throw new OrderError(400,'有附件的格式或大小不符合提交要求。');
    }
    return {slot,name,extension,size,mime,source};
  });
  if(printZones.some(zone=>!slots.has(zone+'-source'))) throw new OrderError(400,'有印花缺少图案文件，请重新保存定制。');
  return accepted.sort((a,b)=>a.slot.localeCompare(b.slot));
}
export function readOrder(input){
  if(typeof input?.id!=='string'||!orderIdPattern.test(input.id)) throw new OrderError(400,'订单标识无效。');
  const garment=input?.garment;
  if(typeof garment!=='string'||!Object.hasOwn(garmentNames,garment)||typeof input.color!=='string'||!/^#[\da-f]{6}$/i.test(input.color)) throw new OrderError(400,'服装款式或颜色有误。');
  if(!Array.isArray(input.zones)||input.zones.some(zone=>typeof zone!=='string'||!canPrintZone(garment,zone))){
    throw new OrderError(400,'印花位置有误。');
  }
  const quantities=Object.fromEntries(designSizes.map(size=>[size,validQuantity(input.quantities?.[size])]).filter(([,count])=>count));
  const quote=quoteDesign(garment,quantities,input.zones);
  if(!quote.count) throw new OrderError(400,'请先选择尺码和数量。');
  const adjustments=Object.fromEntries(quote.zones.map(zone=>{
    const given=input.adjustments?.[zone];
    const value=(v,min,max,fallback)=>Number.isFinite(v)&&v>=min&&v<=max?v:fallback;
    return [zone,{scale:value(given?.scale,.25,2,1),x:value(given?.x,-50,50,0),y:value(given?.y,-50,50,0)}];
  }));
  return {id:input.id,garment,color:input.color.toLowerCase(),quantities,zones:quote.zones,adjustments,
    shipping:readShipping(input.shipping),files:readFiles(input.files,quote.zones),
    quote:{count:quote.count.toString(),total:formatCents(quote.total),apparel:formatCents(quote.apparel),printing:formatCents(quote.printing),discount:quote.discount??null}};
}
export function filePath(id,file){return 'shirt/files/'+id+'/'+file.slot+'.'+file.extension;}
export const displayId=id=>'SH-'+id.slice(0,12).toUpperCase();

export function orderStorage(sdk=blob){
  const storeId=process.env.SHIRT_BLOB_STORE_ID?.trim();
  const token=process.env.SHIRT_BLOB_READ_WRITE_TOKEN?.trim();
  if(!storeId&&!token) throw new OrderError(503,'订单存储尚未配置。');
  const connection=token?{token}:{storeId};
  const privateStore={access:'private',...connection};
  async function read(id){
    const receipt=await sdk.get(orderPrefix+id+'.json',{...privateStore,useCache:false});
    if(!receipt) return null;
    if(receipt.statusCode!==200) throw new Error('Order record unavailable');
    return new Response(receipt.stream).json();
  }
  async function fileInfo(id,file){
    try{return await sdk.head(filePath(id,file),connection);}
    catch(error){if(error instanceof blob.BlobNotFoundError) return null;throw error;}
  }
  return {
    read,fileInfo,
    list(cursor){return sdk.list({...connection,prefix:orderPrefix,limit:24,...(cursor?{cursor}:{})});},
    async put(order){
      await sdk.put(orderPrefix+order.id+'.json',JSON.stringify(order),{...privateStore,contentType:'application/json',allowOverwrite:false});
    },
    async uploadUrl(id,file,validUntil){
      const pathname=filePath(id,file), allowedContentTypes=[file.mime],maximumSizeInBytes=file.size;
      const delegated=await sdk.issueSignedToken({...connection,pathname,operations:['put'],validUntil,allowedContentTypes,maximumSizeInBytes});
      return (await sdk.presignUrl(delegated,{operation:'put',access:'private',pathname,allowedContentTypes,maximumSizeInBytes,allowOverwrite:false,addRandomSuffix:false})).presignedUrl;
    },
    file(id,entry){return sdk.get(filePath(id,entry),privateStore);}
  };
}
