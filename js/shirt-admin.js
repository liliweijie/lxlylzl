'use strict';
(function(){
const endpoint='/api/shirt-admin';
const garments={tee:'短袖',crew:'卫衣',zip:'拉链卫衣',hoodie:'戴帽卫衣',raglan:'插肩短袖'};
const locations={front:'正面大图',chest:'左胸小标',back:'背面大图',backMark:'背面小标',sleeve:'袖侧小标',brim:'帽檐小标'};
const dateFormat=new Intl.DateTimeFormat('zh-CN',{dateStyle:'medium',timeStyle:'short',timeZone:'Asia/Shanghai'});
function element(tag,content,className){
  const node=document.createElement(tag);
  if(content!==undefined) node.textContent=content;
  if(className) node.className=className;
  return node;
}
async function request(suffix='',payload){
  const result=await fetch(endpoint+suffix,payload?{
    method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload),
    keepalive:payload.action==='logout'
  }:{cache:'no-store'});
  const data=await result.json().catch(()=>null);
  if(!result.ok||!data){const error=new Error(data?.error||'请求失败，请重试。');error.status=result.status;throw error;}
  return data;
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
      const link=element('a','下载 · '+source.name,'btn file-link');
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
function createShirtOrdersPanel(panel,getCredentials,onAuthLost){
  const list=panel.querySelector('#orders');
  const status=panel.querySelector('#orders-status');
  const pager=panel.querySelector('#pager');
  const refresh=panel.querySelector('#refresh-orders');
  const previous=panel.querySelector('#previous-order-page');
  const next=panel.querySelector('#next-order-page');
  let cursors=[''],pageIndex=0,revision=0;
  let loaded=false,loading=false,sessionChange=Promise.resolve();

  // A pending login must finish before logout can clear its cookie.
  function changeSession(action){
    const operation=sessionChange.then(action);
    sessionChange=operation.catch(()=>{});
    return operation;
  }

  async function readOrders(suffix,current){
    await sessionChange;
    if(current!==revision) return;
    try{
      return await request(suffix);
    }catch(error){
      if(error.status!==401||current!==revision) throw error;
      await changeSession(()=>{
        const credentials=getCredentials();
        if(current!==revision||!credentials) throw error;
        return request('',{action:'login',username:credentials.u,password:credentials.p});
      });
      if(current!==revision) throw error;
      return request(suffix);
    }
  }

  function updateControls(){
    refresh.disabled=loading;
    previous.disabled=loading||pageIndex===0;
    next.disabled=loading||!cursors[pageIndex+1];
    pager.hidden=pageIndex===0&&!cursors[pageIndex+1];
  }

  async function loadOrders(index){
    if(loading) return;
    const current=++revision;
    loading=true;
    status.classList.remove('bad');
    status.textContent='正在读取订单…';
    updateControls();
    const cursor=cursors[index];
    try{
      const data=await readOrders(cursor?'?'+new URLSearchParams({cursor}):'',current);
      if(current!==revision) return;
      const orders=data.orders.map(render);
      list.replaceChildren(...orders);
      pageIndex=index;
      cursors.length=index+1;
      if(data.nextCursor) cursors.push(data.nextCursor);
      loaded=true;
      status.textContent=orders.length?'':'暂时还没有提交的定制订单。';
    }catch(error){
      if(current!==revision) return;
      if(error.status===401) onAuthLost();
      else{
        status.classList.add('bad');
        status.textContent=error.message;
      }
    }finally{
      if(current===revision){
        loading=false;
        updateControls();
      }
    }
  }

  refresh.addEventListener('click',()=>loadOrders(0));
  previous.addEventListener('click',()=>loadOrders(pageIndex-1));
  next.addEventListener('click',()=>loadOrders(pageIndex+1));
  return {
    activate(){if(!loaded) loadOrders(0);},
    logout(){
      revision++;
      loaded=false;
      loading=false;
      cursors=[''];
      pageIndex=0;
      list.replaceChildren();
      status.textContent='';
      updateControls();
      return changeSession(()=>request('',{action:'logout'}));
    }
  };
}
window.createShirtOrdersPanel=createShirtOrdersPanel;
})();
