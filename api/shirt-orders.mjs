import {OrderError,digest,displayId,failure,orderStorage,readBody,readOrder,response,sign,throttle,verify} from '../lib/shirt-orders.mjs';

function receipt(order){return {id:order.id,number:displayId(order.id),total:order.quote.total};}
function alreadySubmitted(record,hash){
  if(record.hash!==hash) throw new OrderError(409,'这份订单已经提交。请刷新结算页创建新订单。');
  return response(receipt(record));
}
function matchesFile(meta,file){return meta&&meta.size===file.size&&meta.contentType===file.mime;}

export function createOrdersApi(storage=orderStorage){
  return {async fetch(request){
    if(request.method!=='POST') return response({error:'请从定制结算页提交订单。'},405,{Allow:'POST'});
    try{
      const secret=process.env.SHIRT_SIGNING_KEY;
      if(!secret) throw new OrderError(503,'订单服务尚未配置。');
      const body=await readBody(request,{allowNative:true});
      if(body?.action!=='prepare'&&body?.action!=='commit') throw new OrderError(400,'提交方式有误。');
      const order=readOrder(body.order);
      const hash=digest(order);
      const files=storage();
      if(body.action==='prepare'){
        throttle(request,'shirt-prepare',15,10);
        const previous=await files.read(order.id);
        if(previous) return alreadySubmitted(previous,hash);
        const expires=Date.now()+20*60_000;
        const uploads=await Promise.all(order.files.map(async entry=>{
          const stored=await files.fileInfo(order.id,entry);
          if(stored&&!matchesFile(stored,entry)) throw new OrderError(409,'附件与本次定制不一致，请重新打开结算页。');
          return {slot:entry.slot,url:stored?null:await files.uploadUrl(order.id,entry,expires)};
        }));
        return response({uploads,ticket:sign(secret,'submit',{id:order.id,hash,expires})});
      }
      const ticket=verify(secret,'submit',body.ticket);
      if(ticket?.id!==order.id||ticket?.hash!==hash) throw new OrderError(400,'提交已过期，请重新点击提交定制。');
      throttle(request,'shirt-commit',24,10);
      const previous=await files.read(order.id);
      if(previous) return alreadySubmitted(previous,hash);
      const confirmed=await Promise.all(order.files.map(async entry=>matchesFile(await files.fileInfo(order.id,entry),entry)));
      if(confirmed.some(valid=>!valid)) throw new OrderError(409,'还有附件未上传完成，请重试提交。');
      const record={...order,hash,createdAt:new Date().toISOString()};
      try{await files.put(record);}
      catch(error){
        const saved=await files.read(order.id);
        if(saved) return alreadySubmitted(saved,hash);
        throw error;
      }
      return response(receipt(record),201);
    }catch(error){return failure(error);}
  }};
}
export default createOrdersApi();
