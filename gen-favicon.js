const fs = require('fs');

// 轻量 PNG 生成器（纯 Node.js，无外部依赖）
function createPNG(width, height, rgba) {
  const signature = Buffer.from([137,80,78,71,13,10,26,10]);
  function crc32(buf) {
    let crc = 0xFFFFFFFF;
    for (let i = 0; i < buf.length; i++) {
      crc ^= buf[i];
      for (let j = 0; j < 8; j++) crc = (crc >>> 1) ^ (crc & 1 ? 0xEDB88320 : 0);
    }
    return (crc ^ 0xFFFFFFFF) >>> 0;
  }
  function chunk(type, data) {
    const len = Buffer.alloc(4); len.writeUInt32BE(data.length);
    const t = Buffer.from(type);
    const crcData = Buffer.concat([t, data]);
    const c = Buffer.alloc(4); c.writeUInt32BE(crc32(crcData));
    return Buffer.concat([len, t, data, c]);
  }
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0); ihdr.writeUInt32BE(height, 4);
  ihdr[8]=8; ihdr[9]=6; ihdr[10]=0; ihdr[11]=0; ihdr[12]=0;
  const raw = [];
  for (let y=0;y<height;y++) {
    raw.push(0);
    for (let x=0;x<width;x++) {
      const i=(y*width+x)*4;
      raw.push(rgba[i],rgba[i+1],rgba[i+2],rgba[i+3]);
    }
  }
  const compressed = require('zlib').deflateSync(Buffer.from(raw));
  return Buffer.concat([signature,chunk('IHDR',ihdr),chunk('IDAT',compressed),chunk('IEND',Buffer.alloc(0))]);
}

// 在 offscreen 画布上绘制 logo（32x32）
function drawLogo(color) {
  const W=64, H=64; // 先画 64 再缩小，更平滑
  const px = new Uint8Array(W*H*4).fill(0);

  function setPx(x,y,r,g,b,a) {
    if(x<0||x>=W||y<0||y>=H) return;
    const i=(y*W+x)*4;
    const sa=a/255, da=px[i+3]/255;
    const oa=sa+da*(1-sa);
    if(oa>0) {
      px[i]=Math.round((r*sa+px[i]*da*(1-sa))/oa);
      px[i+1]=Math.round((g*sa+px[i+1]*da*(1-sa))/oa);
      px[i+2]=Math.round((b*sa+px[i+2]*da*(1-sa))/oa);
      px[i+3]=Math.round(oa*255);
    }
  }

  function drawCircle(cx,cy,r,R,G,B) {
    for(let y=0;y<H;y++) for(let x=0;x<W;x++) {
      const d=Math.sqrt((x-cx)**2+(y-cy)**2);
      if(d>=r-1.5&&d<=r+1) {
        const a=Math.max(0,Math.min(255,Math.round(255*(1.5-Math.abs(d-r))));
        setPx(x,y,R,G,B,a);
      } else if(d<r-1.5) setPx(x,y,R,G,B,255);
    }
  }

  function drawLine(x1,y1,x2,y2,R,G,B) {
    const steps=Math.max(Math.abs(x2-x1),Math.abs(y2-y1),1)*3;
    for(let s=0;s<=steps;s++) {
      const t=s/steps;
      const px=Math.round(x1+(x2-x1)*t), py=Math.round(y1+(y2-y1)*t);
      for(let dx=-1;dx<=1;dx++) for(let dy=-1;dy<=1;dy++) setPx(px+dx,py+dy,R,G,B,255);
    }
  }

  const s=W/140;
  drawCircle(110*s,30*s,30*s,...color);
  drawCircle(110*s,110*s,30*s,...color);
  drawCircle(30*s,30*s,30*s,...color);
  drawCircle(30*s,110*s,30*s,...color);

  // 中间形状（用线段近似 path）
  const pts=[[116.74,59.24],[90.16,65.36],[65.36,90.16],[59.24,116.74],[65.36,143.31],[30,143.31],[30,110],[53.74,110],[59.24,83.42],[83.42,59.24],[116.74,53.74],[143.31,30],[143.31,59.24]];
  for(let i=0;i<pts.length;i++) {
    const [x1,y1]=[pts[i][0]*s, pts[i][1]*s];
    const [x2,y2]=[pts[(i+1)%pts.length][0]*s, pts[(i+1)%pts.length][1]*s];
    drawLine(x1,y1,x2,y2,...color);
  }

  // 缩小到 32x32（最近邻）
  const out=new Uint8Array(32*32*4).fill(0);
  for(let y=0;y<32;y++) for(let x=0;x<32;x++) {
    const sx=Math.round(x*W/32), sy=Math.round(y*H/32);
    const si=(sy*W+sx)*4, di=(y*32+x)*4;
    out[di]=px[si]; out[di+1]=px[si+1]; out[di+2]=px[si+2]; out[di+3]=px[si+3];
  }
  return out;
}

// 生成深色版（用于明亮背景标签）和浅色版（用于深色背景标签）
const darkLogo = drawLogo([26,26,46]);   // #1a1a2e
const lightLogo = drawLogo([240,236,228]); // #f0ece4

// 写入两个尺寸：16x16 和 32x32，合成一个 ICO
// ICO 格式：header(6) + entry(16) + PNG data
function makeICO(rgba32, rgba16) {
  // 16x16 也用 PNG 格式存在 ICO 里
  const png32 = createPNG(32,32,rgba32);
  const png16 = createPNG(16,16,rgba16||rgba32); // fallback：从32缩小

  // 手动缩小到 16x16
  function downscale(src32) {
    const out16=new Uint8Array(16*16*4).fill(0);
    for(let y=0;y<16;y++) for(let x=0;x<16;x++) {
      let r=0,g=0,b=0,a=0,c=0;
      for(let dy=0;dy<2;dy++) for(let dx=0;dx<2;dx++) {
        const sx=x*2+dx, sy=y*2+dy;
        const i=(sy*32+sx)*4;
        r+=src32[i]; g+=src32[i+1]; b+=src32[i+2]; a+=src32[i+3]; c++;
      }
      const i=(y*16+x)*4;
      out16[i]=Math.round(r/c); out16[i+1]=Math.round(g/c);
      out16[i+2]=Math.round(b/c); out16[i+3]=Math.round(a/c);
    }
    return out16;
  }
  const rgba16a = downscale(rgba32);
  const png16b = createPNG(16,16,rgba16a);

  // ICO header
  const header=Buffer.alloc(6); header[0]=0; header[1]=0; header[2]=1; header[3]=0; header[4]=2; header[5]=0;
  // entry for 32x32
  const e32=Buffer.alloc(16); e32[0]=32; e32[1]=32; e32[2]=0; e32[3]=0; e32[4]=1; e32[5]=32; e32[6]=0;
  e32.writeUInt32LE(png32.length,8); e32.writeUInt32LE(6+16,12);
  // entry for 16x16
  const e16=Buffer.alloc(16); e16[0]=16; e16[1]=16; e16[2]=0; e16[3]=0; e16[4]=1; e16[5]=32; e16[6]=0;
  e16.writeUInt32LE(png16b.length,8); e16.writeUInt32LE(6+16+png32.length,12);

  return Buffer.concat([header,e32,e16,png32,png16b]);
}

// 用 png32 作为 32x32 png 文件（直接用作 favicon.png）
const png32file = createPNG(32,32,darkLogo);
fs.writeFileSync('favicon.png', png32file);
console.log('favicon.png written');
