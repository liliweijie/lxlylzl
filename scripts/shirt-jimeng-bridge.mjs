import {execFile} from 'node:child_process';
import {randomBytes,randomUUID,timingSafeEqual} from 'node:crypto';
import {createServer} from 'node:http';
import {mkdir,mkdtemp,readFile,rm,writeFile} from 'node:fs/promises';
import {homedir,tmpdir} from 'node:os';
import {join} from 'node:path';
import {promisify} from 'node:util';

const port=47125;
const host='127.0.0.1';
const origin='http://'+host+':'+port;
const site='https://lxlylzl.xyz';
const allowedSites=[site];
const devOrigin=process.env.SHIRT_JIMENG_DEV_ORIGIN;
if(devOrigin&&/^http:\/\/127\.0\.0\.1:\d{1,5}$/.test(devOrigin)) allowedSites.push(devOrigin);
const model='seedream_5.0_lite';
const modelName='Seedream 5.0 Lite';
const cliName=process.env.SHIRT_JIMENG_CLI||'dreamina-canvas';
const stateDir=join(homedir(),'.local','state','shirt-jimeng');
const reference=process.env.SHIRT_JIMENG_REFERENCE||decodeURIComponent(
  new URL('../shirt-studio/references/graffiti-styleboard.png',import.meta.url).pathname
);
const graphicReference=process.env.SHIRT_JIMENG_GRAPHIC_REFERENCE||decodeURIComponent(
  new URL('../shirt-studio/references/graffiti-marks.png',import.meta.url).pathname
);
const key=randomBytes(32).toString('hex');
const jobs=new Map();
const exec=promisify(execFile);
const zones={front:'正胸',chest:'左胸',back:'背面',sleeve:'袖子'};
let canvasRequest;
let busy=false;

class BridgeError extends Error{
  constructor(message,code){super(message);this.code=code;}
}
async function cli(args,timeout=48000){
  const result=await exec(cliName,['--profile','default','--non-interactive','--format','json',...args],{timeout,maxBuffer:2*1024*1024})
    .catch(error=>error);
  let reply;
  try{reply=JSON.parse(result.stdout);}
  catch{throw new BridgeError('即梦 CLI 没有返回有效结果，请查看即梦画布。');}
  if(!reply.ok) throw new BridgeError('即梦 CLI 返回错误（'+(reply.error?.code??'未知')+'）。',reply.error?.code);
  return reply.data;
}

async function saveState(info){
  const file=join(stateDir,'canvas.json');
  await writeFile(file,JSON.stringify(info),{mode:0o600});
}
async function openCanvas(){
  await mkdir(stateDir,{recursive:true,mode:0o700});
  let info={};
  try{info=JSON.parse(await readFile(join(stateDir,'canvas.json'),'utf8'));}
  catch(error){if(error.code!=='ENOENT') throw new BridgeError('无法读取本机的即梦画布设置。');}
  if(!info.projectId){
    const data=await cli(['canvas','create','Shirt 印花创作','--project-id',randomUUID()]);
    info={projectId:data.project.projectId,webUrl:data.project.webUrl};
    await saveState(info);
  }
  for(const [field,file,name] of [
    ['referenceId',reference,'Shirt 原创涂鸦参考'],
    ['graphicReferenceId',graphicReference,'Shirt 无文字涂鸦参考']
  ]){
    if(info[field]) continue;
    const data=await cli(['resource','upload','--project-id',info.projectId,'--file',file,
      '--resource-id',randomUUID(),'--type','image','--name',name]);
    info[field]=data.resourceId;
    await saveState(info);
  }
  return info;
}
function canvas(){
  return canvasRequest??=openCanvas().catch(error=>{canvasRequest=undefined;throw error;});
}

async function readBody(req){
  const chunks=[];
  let size=0;
  for await(const chunk of req){
    size+=chunk.length;
    if(size>4096) throw new BridgeError('印花描述太长。');
    chunks.push(chunk);
  }
  return JSON.parse(Buffer.concat(chunks));
}
function equalKey(value){
  if(typeof value!=='string'||!/^[0-9a-f]{64}$/.test(value)) return false;
  return timingSafeEqual(Buffer.from(value),Buffer.from(key));
}
function send(res,status,body,contentType='application/json; charset=utf-8'){
  res.writeHead(status,{'Content-Type':contentType,'Cache-Control':'no-store',
    'Cross-Origin-Resource-Policy':'same-origin','X-Content-Type-Options':'nosniff'});
  res.end(typeof body==='object'&&!Buffer.isBuffer(body)?JSON.stringify(body):body);
}
function draftPrompt({description,zone,lockedText,useReference,matte}){
  const safe=description.replaceAll('{{','\\{{');
  const parts=[
    lockedText?'画纯图形插画。画面中严禁任何文字、数字、签名或看起来像字母的形状。与字体有关的描述只作为笔触、线条和颜色的提示。':'',
    '为衣服'+zones[zone]+'设计单个印花图形，主体居中，四周留白。'+safe,
    useReference?'仅借鉴参考图的涂鸦笔触、描边、喷漆颗粒或贴纸层次。只画用户描述的主体，不复刻参考图文字。':'',
    lockedText?'图形里不得出现任何字母、文字或数字，后续会独立排入准确文字。':'',
    '输出平面的独立印花插画，不画模特、衣服、墙面或样机。整张图背景用统一的纯色 '+matte+'，背景无纹理、渐变或阴影，主体避开这个底色。'
  ];
  return parts.filter(Boolean).join('\n');
}
async function quote(data){
  const description=typeof data?.description==='string'?data.description.trim():'';
  const zone=data?.zone;
  if(!description||[...description].length>600||!Object.hasOwn(zones,zone)) throw new BridgeError('请填写印花描述并选择位置。');
  const now=Date.now();
  for(const [id,job] of jobs){if(now-job.created>600000&&job.phase!=='running') jobs.delete(id);}
  const current=await canvas();
  const useReference=data.useReference===true;
  const matte=/洋红|品红|玫红|fuchsia|magenta/i.test(description)?'#00ff00':'#ff00ff';
  const args=['node','create','image','--project-id',current.projectId,'--mode',useReference?'i2i':'t2i',
    '--model',model,'--resolution','2K','--ratio','1:1','--count','1','--title','Shirt 印花',
    '--prompt',draftPrompt({description,zone,lockedText:data.lockedText===true,useReference,matte})];
  if(useReference) args.push('--ref','res:'+(data.lockedText===true?current.graphicReferenceId:current.referenceId));
  const {node}=await cli(args);
  const priced=await cli(['node','quote','--project-id',current.projectId,'--node-id',node.nodeId]);
  const credits=priced.totalMaxCredits;
  if(priced.confirmable!==true||!Number.isSafeInteger(credits)||credits<0) throw new BridgeError('即梦暂时无法确认本次积分，请稍后再试。');
  const job={id:randomUUID(),submitId:randomUUID(),nodeId:node.nodeId,projectId:current.projectId,webUrl:current.webUrl,
    credits,matte,created:now,phase:'quoted'};
  jobs.set(job.id,job);
  return {id:job.id,credits,matte,webUrl:current.webUrl,model:modelName};
}
function imageType(bytes){
  if(bytes.length>15*1024*1024) throw new BridgeError('即梦图片超过 15 MB，请从画布下载。');
  if(bytes.subarray(0,8).equals(Buffer.from([137,80,78,71,13,10,26,10]))) return 'image/png';
  if(bytes[0]===255&&bytes[1]===216&&bytes[2]===255) return 'image/jpeg';
  if(bytes.toString('ascii',0,4)==='RIFF'&&bytes.toString('ascii',8,12)==='WEBP') return 'image/webp';
  throw new BridgeError('即梦图片格式暂时无法导入。');
}
async function generate(data){
  const job=jobs.get(data?.id);
  if(!job||job.phase!=='quoted'||Date.now()-job.created>600000||data.credits!==job.credits){
    throw new BridgeError('此报价已失效，请重新获取报价。');
  }
  job.phase='authorizing';
  const args=['--project-id',job.projectId,'--node-id',job.nodeId];
  const approval=await cli(['node','confirm',...args,'--credit-ceiling',String(job.credits)]);
  if(!approval.creditConfirmationToken) throw new BridgeError('即梦没有返回本次积分确认。');
  job.phase='running';
  let failedToSubmit=false;
  try{
    await cli(['node','run',...args,'--submit-id',job.submitId,'--credit-token',approval.creditConfirmationToken]);
  }catch{
    failedToSubmit=true;
  }
  let finished;
  try{
    finished=await cli(['operation','wait',job.submitId,'--project-id',job.projectId,'--timeout','3m','--interval','4s'],200000);
  }catch{
    throw new BridgeError(failedToSubmit?'尚无法确认任务是否已提交，请在即梦画布查看。':'即梦仍在处理，请在画布查看进度。');
  }finally{
    job.phase='closed';
  }
  const resource=finished.resources?.find(item=>item.resourceId&&/^(success|succeeded|completed)$/i.test(item.state??''));
  if(!resource) throw new BridgeError('即梦没有返回可用图片，请在画布查看任务状态。');
  const directory=await mkdtemp(join(tmpdir(),'shirt-jimeng-result-'));
  try{
    const path=join(directory,'artwork');
    await cli(['resource','download',resource.resourceId,'--project-id',job.projectId,'--output',path],90000);
    const bytes=await readFile(path);
    return {bytes,type:imageType(bytes)};
  }finally{
    await rm(directory,{recursive:true,force:true});
  }
}

const clientScript=`
const trusted=${JSON.stringify(allowedSites)};
const secret=document.querySelector('meta[name=shirt-bridge-key]').content;
const status=document.querySelector('#status');
let connected=false;
const connect=document.querySelector('#connect');
const openerWindow=window.opener;
function send(origin,payload){openerWindow?.postMessage({bridge:'shirt-jimeng',...payload},origin);}
async function call(action,data){
  const res=await fetch('/rpc',{method:'POST',headers:{'Content-Type':'application/json','X-Shirt-Key':secret},body:JSON.stringify({action,data})});
  if(res.ok&&res.headers.get('content-type')?.startsWith('image/')) return res.blob();
  const value=await res.json();
  if(!res.ok) throw new Error(value.error||'即梦操作失败。');
  return value;
}
if(!openerWindow){connect.disabled=true;status.textContent='请从 Shirt 的 AI 面板打开这个窗口。';}
connect.addEventListener('click',async()=>{
  connect.disabled=true;
  status.textContent='正在检查即梦登录…';
  try{
    const data=await call('status');
    connected=true;
    status.textContent='即梦已连接。回到 Shirt 继续，生成期间请保留这个窗口。';
    for(const origin of trusted) send(origin,{type:'connected',data});
  }catch(error){status.textContent=error.message;connect.disabled=false;}
});
window.addEventListener('message',async event=>{
  const m=event.data;
  if(!connected||event.source!==openerWindow||!trusted.includes(event.origin)||
    m?.bridge!=='shirt-jimeng'||typeof m.id!=='string'||!['quote','generate'].includes(m.action)) return;
  try{send(event.origin,{type:'reply',id:m.id,data:await call(m.action,m.data)});}
  catch(error){send(event.origin,{type:'reply',id:m.id,error:error.message});}
});
`;
const html=`<!doctype html><html lang="zh-CN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="shirt-bridge-key" content="${key}"><title>连接即梦 · Shirt</title><style>body{margin:0;background:#202020;color:#f1f1f1;font:16px/1.6 system-ui,sans-serif;display:grid;place-items:center;min-height:100vh}main{width:min(340px,calc(100% - 36px));padding:20px}h1{margin:0;font-size:25px}button{border:0;border-radius:5px;padding:10px 19px;background:#ff1111;color:#010101;font:inherit;font-weight:700;cursor:pointer}button:disabled{opacity:.6;cursor:default}</style></head><body><main><h1>连接即梦</h1><p id="status" role="status">允许 Shirt 在这台 Mac 上使用已登录的即梦 CLI。生成请求会在 Shirt 中先显示积分报价。</p><button type="button" id="connect">连接到 Shirt</button></main><script src="/client.js" defer></script></body></html>`;

createServer(async(req,res)=>{
  if(req.headers.host!==host+':'+port){send(res,403,{error:'本机地址无效。'});return;}
  if(req.method==='GET'&&req.url==='/'){
    res.setHeader('Content-Security-Policy',"default-src 'none'; connect-src 'self'; script-src 'self'; style-src 'unsafe-inline'; frame-ancestors 'none'; base-uri 'none'");
    send(res,200,html,'text/html; charset=utf-8');return;
  }
  if(req.method==='GET'&&req.url==='/client.js'){send(res,200,clientScript,'text/javascript; charset=utf-8');return;}
  if(req.method!=='POST'||req.url!=='/rpc'){send(res,404,{error:'找不到操作。'});return;}
  if(req.headers.origin!==origin||!equalKey(req.headers['x-shirt-key'])){send(res,403,{error:'请通过本机连接窗口使用。'});return;}
  try{
    const {action,data}=await readBody(req);
    if(action==='status'){
      const auth=await cli(['auth','status']);
      if(!auth.loggedIn) throw new BridgeError('请先在终端运行 dreamina-canvas auth login。');
      return send(res,200,{model:modelName});
    }
    if(!['quote','generate'].includes(action)) throw new BridgeError('操作无效。');
    if(busy) return send(res,409,{error:'本机即梦正在处理另一项操作。'});
    busy=true;
    try{
      if(action==='quote') return send(res,200,await quote(data));
      const result=await generate(data);
      return send(res,200,result.bytes,result.type);
    }finally{
      busy=false;
    }
  }catch(error){
    send(res,400,{error:error instanceof BridgeError?error.message:'即梦连接无法读取本次操作。'});
  }
}).listen(port,host,()=>console.log('Shirt 即梦连接已启动 · '+origin));
