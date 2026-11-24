'use strict';
const $=id=>document.getElementById(id);
const endpoint='/api/shirt-admin';
const garments={tee:'短袖',crew:'卫衣',zip:'拉链卫衣',hoodie:'戴帽卫衣',raglan:'插肩短袖'};
const locations={front:'正面大图',chest:'左胸小标',back:'背面大图',backMark:'背面小标',sleeve:'袖侧小标',brim:'帽檐小标'};
const dateFormat=new Intl.DateTimeFormat('zh-CN',{dateStyle:'medium',timeStyle:'short',timeZone:'Asia/Shanghai'});
let cursors=[''],pageIndex=0,nextCursor=null,revision=0;
function element(tag,content,className){
  const node=document.createElement(tag);
  if(content!==undefined) node.textContent=content;
  if(className) node.className=className;
  return node;
}
async function request(suffix='',payload){
  const result=await fetch(endpoint+suffix,payload?{
    method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)
  }:{cache:'no-store'});
  const data=await result.json();
  if(!result.ok){const error=new Error(data.error||'请求失败，请重试。');error.status=result.status;throw error;}
  return data;
}
function showLogin(message=''){
  revision++;
  $('orders').replaceChildren();
  $('workspace').hidden=true;
  $('logout').hidden=true;
  $('login').hidden=false;
  $('login-status').textContent=message;
}
function fileUrl(order,slot){return endpoint+'?'+new URLSearchParams({action:'file',id:order.id,slot});}
function artwork(order){
  const container=element('div',undefined,'assets');
  const add=(title,preview,source)=>{
    if(!preview&&!source) return;
    const figure=element('figure',undefined,'asset');
    if(preview){
      const img=new Image(140,108);
      img.alt=title;
      img.loading='lazy';
      img.src=fileUrl(order,preview.slot);
      figure.append(img);
    }
    figure.append(element('figcaption',title));
    if(source){
      const link=element('a','下载 · '+source.name,'file-link');
      link.href=fileUrl(order,source.slot);
      link.download=source.name;
      figure.append(link);
    }
    container.append(figure);
  };
  add('服装预览',order.files.find(file=>file.slot==='preview'));
  for(const zone of order.zones){
    add(locations[zone]??zone,order.files.find(file=>file.slot===zone+'-preview'),order.files.find(file=>file.slot===zone+'-source'));
  }
  return container;
}
function render(order){
  const card=element('li',undefined,'order');
  const details=element('details');
  const headline=element('summary');
  const row=element('span',undefined,'order-summary');
  const date=dateFormat.format(new Date(order.createdAt));
  row.append(element('strong',order.number),element('span',date+' · '+(garments[order.garment]??'服装')+' · '+order.quote.count+' 件'),element('b',order.quote.total));
  headline.append(row);
  details.append(headline);
  details.addEventListener('toggle',()=>{
    if(!details.open||details.childElementCount>1) return;
    const body=element('div',undefined,'order-details');
    const recipient=element('section');
    const {name,phone,region,address,notes}=order.shipping;
    recipient.append(element('h3','收件信息'),element('p',name+' · '+phone),element('p',region+' '+address));
    if(notes) recipient.append(element('p','备注 '+notes));
    const spec=element('section');
    spec.append(element('h3','定制明细'),element('p',order.color.toUpperCase()+' · '+Object.entries(order.quantities).map(([size,count])=>size+' × '+count).join('、')),
      element('p','服装 '+order.quote.apparel+' · 印花 '+order.quote.printing+(order.quote.discount?' · '+order.quote.discount:'')),element('span','待人工确认','order-status'));
    for(const zone of order.zones){
      const {scale,x,y}=order.adjustments[zone];
      spec.append(element('p',locations[zone]+' · 缩放 '+Math.round(scale*100)+'% · 横向 '+x+'% · 纵向 '+y+'%'));
    }
    const assetPanel=element('section',undefined,'order-assets');
    assetPanel.append(element('h3','印花与源文件'),artwork(order));
    body.append(recipient,spec);
    if(order.files.length) body.append(assetPanel);
    details.append(body);
  });
  card.append(details);
  return card;
}
async function loadOrders(){
  const current=++revision;
  $('orders-status').textContent='正在读取订单…';
  try{
    const data=await request(cursors[pageIndex]?'?'+new URLSearchParams({cursor:cursors[pageIndex]}):'');
    if(current!==revision) return;
    $('login').hidden=true;
    $('workspace').hidden=false;
    $('logout').hidden=false;
    $('orders').replaceChildren(...data.orders.map(render));
    nextCursor=data.nextCursor;
    $('pager').hidden=!nextCursor&&pageIndex===0;
    $('previous').disabled=pageIndex===0;
    $('next').disabled=!nextCursor;
    $('orders-status').textContent=data.orders.length?'':'暂时还没有提交的定制订单。';
  }catch(error){
    if(current!==revision) return;
    if(error.status===401){showLogin();return;}
    if($('workspace').hidden) showLogin(error.message);
    else $('orders-status').textContent=error.message;
  }
}
$('login-form').addEventListener('submit',async event=>{
  event.preventDefault();
  const form=event.currentTarget,button=form.querySelector('button');
  button.disabled=true;
  $('login-status').textContent='正在登录…';
  try{
    await request('',{action:'login',...Object.fromEntries(new FormData(form))});
    form.reset();
    cursors=[''];pageIndex=0;
    await loadOrders();
  }catch(error){$('login-status').textContent=error.message;}
  finally{button.disabled=false;}
});
$('logout').addEventListener('click',async()=>{
  try{await request('',{action:'logout'});showLogin();}
  catch(error){$('orders-status').textContent=error.message;}
});
$('refresh-orders').addEventListener('click',()=>{cursors=[''];pageIndex=0;loadOrders();});
$('previous').addEventListener('click',()=>{if(pageIndex){pageIndex--;loadOrders();}});
$('next').addEventListener('click',()=>{if(nextCursor){cursors[++pageIndex]=nextCursor;loadOrders();}});
loadOrders();
