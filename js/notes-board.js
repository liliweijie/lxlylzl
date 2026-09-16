(function () {
  'use strict';
  const COLORS=['#ed5945','#d6b867','#8ba98c','#7e9fbd','#b092b9','#aaa79f'];
  const KEY='lx:notes:interactive:v1', COLOR_KEY='lx:notes:colors:v1';
  const read=(key,fallback)=>{try{return JSON.parse(localStorage.getItem(key))||fallback;}catch{return fallback;}};
  const save=(key,value)=>{try{localStorage.setItem(key,JSON.stringify(value));}catch{}};
  const seedId=text=>'seed-'+Array.from(text).reduce((h,c)=>Math.imul(h^c.charCodeAt(0),16777619)>>>0,2166136261).toString(16);
  const date=ts=>new Date(ts||Date.now()).toLocaleDateString('zh-CN',{month:'2-digit',day:'2-digit'});
  const clamp=(n,min,max)=>Math.min(Math.max(min,max),Math.max(min,n));
  async function api(body){const response=await fetch('/api/notes',{method:body?'POST':'GET',headers:body?{'Content-Type':'application/json'}:undefined,body:body?JSON.stringify(body):undefined,signal:AbortSignal.timeout(8000)});if(!response.ok)throw new Error('request failed');return response.json();}
  window.LxNotes={async init(seeds){
    const board=document.querySelector('.frag-board'),input=document.querySelector('.notes-input input'),send=document.querySelector('.notes-input__send');
    if(!board)return;
    board.setAttribute('aria-live','off');board.setAttribute('data-no-dolly','');
    const local=read(KEY,[]),colors=read(COLOR_KEY,{});let remote=false,items=[],active=null,newColor=COLORS[0],posting=false;
    const reduced=matchMedia('(prefers-reduced-motion: reduce)');
    const tools=document.createElement('div');tools.className='notes-tools';
    const hint=document.createElement('span');hint.textContent='拖动卡片 · 双击回复';tools.append(hint);board.parentElement.prepend(tools);
    const status=document.createElement('p');status.className='notes-status';status.setAttribute('role','status');document.querySelector('.notes-input').append(status);
    const dialog=document.createElement('dialog');dialog.className='note-dialog';dialog.setAttribute('data-no-dolly','');dialog.setAttribute('aria-labelledby','note-dialog-title');
    dialog.innerHTML='<header><h2 id="note-dialog-title">接着聊</h2><button class="note-close" type="button" aria-label="关闭回复">×</button></header><p class="note-original"></p><div class="dialog-colors"></div><p class="color-help">标签颜色保存在此设备</p><ul class="note-replies"></ul><form><textarea aria-label="回复内容" placeholder="写下你的回复…" maxlength="500" required></textarea><button class="note-submit" type="submit">发送回复</button><p class="note-dialog-status" role="status"></p></form>';
    document.body.append(dialog);
    function palette(value,onChange){const group=document.createElement('div');group.className='note-colors';group.setAttribute('role','group');group.setAttribute('aria-label','选择标签颜色');COLORS.forEach((color,i)=>{const b=document.createElement('button');b.type='button';b.className='note-swatch';b.style.setProperty('--swatch',color);b.setAttribute('aria-label',['赤陶','暖黄','苔绿','灰蓝','淡紫','灰白'][i]);b.setAttribute('aria-pressed',String(value===color));b.onclick=()=>{group.querySelectorAll('button').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));onChange(color)};group.append(b)});return group}
    const composeColors=document.createElement('div');composeColors.className='notes-tools';composeColors.append('标签颜色',palette(newColor,c=>newColor=c));document.querySelector('.notes-input__box').after(composeColors);
    function paintReplies(){const list=dialog.querySelector('.note-replies');list.replaceChildren();(active.note.replies||[]).forEach(reply=>{const li=document.createElement('li'),small=document.createElement('small');li.textContent=reply.content;small.textContent=(reply.name||'匿名')+' · '+date(reply.ts);li.append(small);list.append(li)});active.count.textContent='回复 '+(active.note.replies||[]).length;}
    function open(item){active=item;dialog.querySelector('.note-original').textContent=item.note.content;dialog.style.setProperty('--note-color',item.color);dialog.querySelector('.dialog-colors').replaceChildren(palette(item.color,c=>{item.color=c;item.el.style.setProperty('--note-color',c);dialog.style.setProperty('--note-color',c);colors[item.note.id]=c;save(COLOR_KEY,colors)}));dialog.querySelector('textarea').value='';dialog.querySelector('.note-dialog-status').textContent=remote?'回复会公开显示':'本地预览：回复保存在当前浏览器';paintReplies();dialog.showModal();}
    dialog.querySelector('.note-close').onclick=()=>dialog.close();dialog.addEventListener('close',()=>{active?.el.focus({preventScroll:true});active=null});
    function add(note){
      const el=document.createElement('div');el.className='frag'+(note.mine?' mine':'');el.tabIndex=0;el.setAttribute('role','group');el.setAttribute('aria-label',note.content+'，双击或回车回复');
      const inner=document.createElement('div');inner.className='frag__float';if(note.mine){const me=document.createElement('p');me.className='me';me.textContent='✳ ME';inner.append(me)}
      const text=document.createElement('p');text.className='txt';text.textContent=note.content;
      const meta=document.createElement('div');meta.className='frag-meta';const count=document.createElement('button');count.type='button';count.className='frag-open';count.textContent='回复 '+(note.replies||[]).length;
      const ts=document.createElement('span');ts.className='ts';ts.textContent=note.displayDate||date(note.ts);meta.append(count,ts);inner.append(text,meta);el.append(inner);board.append(el);
      const item={note,el,count,color:COLORS.includes(colors[note.id])?colors[note.id]:COLORS.includes(note.color)?note.color:COLORS[0],x:0,y:0,vx:(Math.random()<.5?-1:1)*(12+Math.random()*12),vy:(Math.random()<.5?-1:1)*(10+Math.random()*10),turn:2+Math.random()*4,hover:false,drag:null};
      item.x=Math.random()*Math.max(0,board.clientWidth-el.offsetWidth);item.y=Math.random()*Math.max(0,board.clientHeight-el.offsetHeight);el.style.setProperty('--note-color',item.color);items.push(item);position(item);
      count.onclick=()=>open(item);el.ondblclick=()=>open(item);el.onkeydown=e=>{if(e.target===el&&(e.key==='Enter'||e.key===' ')){e.preventDefault();e.stopPropagation();open(item)}};
      el.onpointerleave=()=>item.readUntil=0;
      el.onpointerdown=e=>{if(e.button!==0||e.target.closest('button'))return;e.stopPropagation();item.drag={id:e.pointerId,x:e.clientX,y:e.clientY,ox:item.x,oy:item.y,tx:item.x,ty:item.y,moved:false};item.vx=0;item.vy=0;el.setPointerCapture(e.pointerId)};
      el.onpointermove=e=>{const d=item.drag;if(!d){if(e.pointerType==='mouse'&&performance.now()>(item.releaseUntil||0))item.readUntil=performance.now()+1200;return}e.stopPropagation();const dx=e.clientX-d.x,dy=e.clientY-d.y;if(Math.hypot(dx,dy)>5)d.moved=true;if(d.moved){el.classList.add('is-dragging');d.tx=clamp(d.ox+dx,2,board.clientWidth-el.offsetWidth-2);d.ty=clamp(d.oy+dy,2,board.clientHeight-el.offsetHeight-2);if(reduced.matches){item.x=d.tx;item.y=d.ty;position(item)}}};
      const release=e=>{if(!item.drag)return;e.stopPropagation();const moved=item.drag.moved;item.drag=null;item.readUntil=0;item.releaseUntil=performance.now()+1400;el.classList.remove('is-dragging');if(el.hasPointerCapture(e.pointerId))el.releasePointerCapture(e.pointerId);if(moved)el.blur()};el.onpointerup=release;el.onpointercancel=release;el.onlostpointercapture=()=>{item.drag=null;item.readUntil=0;el.classList.remove('is-dragging')};
    }
    function position(item){item.x=clamp(item.x,2,board.clientWidth-item.el.offsetWidth-2);item.y=clamp(item.y,2,board.clientHeight-item.el.offsetHeight-2);item.el.style.transform=`translate3d(${item.x}px,${item.y}px,0)`}
    let last=performance.now(),visible=true;
    new IntersectionObserver(entries=>visible=entries[0].isIntersecting).observe(board);
    new ResizeObserver(()=>items.forEach(position)).observe(board);
    function frame(now){
      const dt=Math.min((now-last)/1000,.032);last=now;
      if(visible&&!document.hidden&&!reduced.matches&&!dialog.open)items.forEach(item=>{
        if(item.drag){
          if(!item.drag.moved)return;
          // A damped spring follows the pointer instead of snapping to it.
          item.vx+=(180*(item.drag.tx-item.x)-18*item.vx)*dt;
          item.vy+=(180*(item.drag.ty-item.y)-18*item.vy)*dt;
        }else{
          if(now<(item.readUntil||0))return;
          let speed=Math.hypot(item.vx,item.vy);
          if(speed<.1){item.vx=18;item.vy=12;speed=Math.hypot(item.vx,item.vy)}
          // Keep release momentum, then ease back to a nonzero cruising speed.
          const target=24+(Math.min(speed,700)-24)*Math.exp(-1.8*dt);
          item.vx*=target/speed;item.vy*=target/speed;
          item.turn-=dt;
          if(item.turn<0){const angle=(Math.random()-.5)*1.3,cos=Math.cos(angle),sin=Math.sin(angle),vx=item.vx;item.vx=vx*cos-item.vy*sin;item.vy=vx*sin+item.vy*cos;item.turn=2+Math.random()*4}
        }
        item.x+=item.vx*dt;item.y+=item.vy*dt;
        const maxX=Math.max(2,board.clientWidth-item.el.offsetWidth-2),maxY=Math.max(2,board.clientHeight-item.el.offsetHeight-2);
        // Only reflect outward velocity, so a clamped card never toggles in place.
        if(item.x<2){item.x=2;item.vx=Math.abs(item.vx)*.72}
        else if(item.x>maxX){item.x=maxX;item.vx=-Math.abs(item.vx)*.72}
        if(item.y<2){item.y=2;item.vy=Math.abs(item.vy)*.72}
        else if(item.y>maxY){item.y=maxY;item.vy=-Math.abs(item.vy)*.72}
        position(item);
      });
      requestAnimationFrame(frame);
    }requestAnimationFrame(frame);
    const normalized=seeds.map(s=>({id:seedId(s.text),content:s.text,displayDate:s.ts,mine:s.mine,color:s.color,replies:[]}));
    let data;
    try{data=await api();if(!Array.isArray(data))throw new Error();remote=true;}catch{data=local;status.textContent='本地预览：留言与回复仅保存在当前浏览器';}
    board.replaceChildren();normalized.forEach(seed=>{const stored=data.find(n=>n.seedKey===seed.id);if(stored)seed.replies=stored.replies||[];add(seed)});data.filter(n=>!n.seedKey&&typeof n.content==='string').forEach(add);
    if(!remote){const old=read('lx:notes:messages',[]);old.forEach((n,i)=>{const id='legacy-'+i;if(!local.some(x=>x.id===id)){const migrated={id,content:n.text,displayDate:n.ts,replies:[]};local.push(migrated);add(migrated)}});save(KEY,local)}
    async function post(){const content=input.value.trim();if(!content||posting)return;posting=true;send.disabled=true;try{let note={id:Date.now(),content,color:newColor,ts:Date.now(),replies:[]};if(remote)note=await api(note);else{local.push(note);save(KEY,local)}add(note);input.value='';status.textContent=remote?'留言已发布':'已保存在当前浏览器';}catch{status.textContent='发布失败，请重试，输入内容已保留';}finally{posting=false;send.disabled=false}}
    send.addEventListener('click',post);input.addEventListener('keydown',e=>{if(e.key==='Enter'&&!e.isComposing){e.preventDefault();e.stopPropagation();post()}});
    dialog.querySelector('form').onsubmit=async e=>{e.preventDefault();const item=active,textarea=dialog.querySelector('textarea'),content=textarea.value.trim(),button=dialog.querySelector('.note-submit'),message=dialog.querySelector('.note-dialog-status');if(!content||button.disabled)return;button.disabled=true;try{if(remote){const result=await api({content,parentId:item.note.id,parentContent:item.note.content});item.note.replies=result.replies||[];}else{const seed=String(item.note.id).startsWith('seed-');let stored=local.find(n=>seed?n.seedKey===item.note.id:n.id===item.note.id);if(!stored){stored={id:Date.now(),seedKey:item.note.id,content:item.note.content,replies:[]};local.push(stored)}stored.replies=stored.replies||[];stored.replies.push({id:Date.now(),content,ts:Date.now(),name:'匿名'});item.note.replies=stored.replies;save(KEY,local)}item.count.textContent='回复 '+item.note.replies.length;if(active===item){paintReplies();textarea.value='';message.textContent=remote?'回复已发布':'回复已保存在当前浏览器'}}catch{message.textContent='回复失败，请重试，内容已保留'}finally{button.disabled=false}};
  }};
})();
