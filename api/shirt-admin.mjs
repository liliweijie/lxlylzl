import {randomUUID} from 'node:crypto';
import {OrderError,displayId,failure,nativeClient,orderIdPattern,orderPrefix,orderStorage,readBody,response,safeEqual,sign,throttle,verify} from '../lib/shirt-orders.mjs';

const cookieName='__Secure-shirt-admin';
const maxAge=8*60*60;
const nativeMaxAge=30*60;
const cookie=(value,age)=>cookieName+'='+value+'; Path=/api/shirt-admin; HttpOnly; Secure; SameSite=Strict; Max-Age='+age;
function session(request,secret){
  const value=request.headers.get('cookie')?.split(';').map(part=>part.trim()).find(part=>part.startsWith(cookieName+'='));
  return verify(secret,'admin',value?.slice(cookieName.length+1));
}
function publicRecord(record){
  const {id,garment,color,quantities,zones,adjustments,shipping,files,quote,createdAt}=record;
  return {id,number:displayId(id),garment,color,quantities,zones,adjustments,shipping,files,quote,createdAt};
}
function attachmentName(name){return encodeURIComponent(name).replace(/['()*]/g,char=>'%'+char.charCodeAt(0).toString(16).toUpperCase());}

export function createAdminApi(storage=orderStorage){
  return {async fetch(request){
    try{
      const user=process.env.ADMIN_USER;
      const pass=process.env.ADMIN_PASS;
      const secret=process.env.SHIRT_SIGNING_KEY;
      if(!user||!pass||!secret) throw new OrderError(503,'管理员登录尚未配置。');
      const native=nativeClient(request);
      if(request.method==='POST'){
        const body=await readBody(request,{allowNative:true});
        if(body?.action==='logout') return native?response({authenticated:false}):response({authenticated:false},200,{'Set-Cookie':cookie('',0)});
        if(body?.action!=='login') throw new OrderError(400,'登录请求无效。');
        throttle(request,'shirt-admin-login',10,15);
        const validUser=safeEqual(body.username,user);
        const validPassword=safeEqual(body.password,pass);
        if(!validUser||!validPassword) throw new OrderError(401,'账号或密码错误。');
        if(native){
          const token=sign(secret,'mini-admin',{scope:'shirt-orders',nonce:randomUUID(),expires:Date.now()+nativeMaxAge*1000});
          return response({authenticated:true,token});
        }
        const token=sign(secret,'admin',{scope:'shirt-orders',nonce:randomUUID(),expires:Date.now()+maxAge*1000});
        return response({authenticated:true},200,{'Set-Cookie':cookie(token,maxAge)});
      }
      if(request.method!=='GET') return response({error:'请求方式不支持。'},405,{Allow:'GET, POST'});
      const claims=native
        ? verify(secret,'mini-admin',request.headers.get('authorization')?.match(/^Bearer (.+)$/)?.[1])
        : session(request,secret);
      if(claims?.scope!=='shirt-orders') throw new OrderError(401,'请先登录后台。');
      const query=new URL(request.url).searchParams;
      const files=storage();
      if(query.get('action')==='file'){
        const id=query.get('id'),slot=query.get('slot');
        if(!orderIdPattern.test(id??'')) throw new OrderError(404,'找不到附件。');
        const entry=(await files.read(id))?.files.find(file=>file.slot===slot);
        if(!entry) throw new OrderError(404,'找不到附件。');
        const result=await files.file(id,entry);
        if(result?.statusCode!==200) throw new OrderError(404,'附件暂不可用。');
        const inline=!entry.source;
        return new Response(result.stream,{headers:{
          'Content-Type':inline?entry.mime:'application/octet-stream',
          'Content-Disposition':(inline?'inline':'attachment')+"; filename*=UTF-8''"+attachmentName(entry.name),
          'Cache-Control':'private, no-store','X-Content-Type-Options':'nosniff',
          'Content-Security-Policy':"default-src 'none'; sandbox"
        }});
      }
      const cursor=query.get('cursor')??'';
      if(cursor.length>600) throw new OrderError(400,'页码无效。');
      const page=await files.list(cursor);
      const ids=page.blobs.map(item=>item.pathname.slice(orderPrefix.length,-5)).filter(id=>orderIdPattern.test(id));
      const orders=(await Promise.all(ids.map(id=>files.read(id)))).filter(Boolean)
        .sort((a,b)=>b.createdAt.localeCompare(a.createdAt)).map(publicRecord);
      return response({orders,nextCursor:page.hasMore?page.cursor:null});
    }catch(error){return failure(error);}
  }};
}
export default createAdminApi();
