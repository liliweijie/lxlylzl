var xt=(n,e,t)=>()=>{if(t)throw t[0];try{return n&&(e=n(n=0)),e}catch(i){throw t=[i],i}};var Jf=(n,e)=>()=>{try{return e||n((e={exports:{}}).exports,e),e.exports}catch(t){throw e=0,t}};function Zf(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function $f(n){return ArrayBuffer.isView(n)&&!(n instanceof DataView)}function er(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function Vu(){let n=er("canvas");return n.style.display="block",n}function tr(...n){let e="THREE."+n.shift();bs?bs("log",e,...n):console.log(e,...n)}function Hu(n){let e=n[0];if(typeof e=="string"&&e.startsWith("TSL:")){let t=n[1];t&&t.isStackTrace?n[0]+=" "+t.getLocation():n[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return n}function Ne(...n){n=Hu(n);let e="THREE."+n.shift();if(bs)bs("warn",e,...n);else{let t=n[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...n)}}function Ue(...n){n=Hu(n);let e="THREE."+n.shift();if(bs)bs("error",e,...n);else{let t=n[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...n)}}function Ks(...n){let e=n.join(" ");e in Uh||(Uh[e]=!0,Ne(...n))}function Wu(n,e,t){return new Promise(function(i,s){function r(){switch(n.clientWaitSync(e,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:s();break;case n.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:i()}}setTimeout(r,t)})}function Ai(){let n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Wt[n&255]+Wt[n>>8&255]+Wt[n>>16&255]+Wt[n>>24&255]+"-"+Wt[e&255]+Wt[e>>8&255]+"-"+Wt[e>>16&15|64]+Wt[e>>24&255]+"-"+Wt[t&63|128]+Wt[t>>8&255]+"-"+Wt[t>>16&255]+Wt[t>>24&255]+Wt[i&255]+Wt[i>>8&255]+Wt[i>>16&255]+Wt[i>>24&255]).toLowerCase()}function ze(n,e,t){return Math.max(e,Math.min(t,n))}function gl(n,e){return(n%e+e)%e}function Qf(n,e,t,i,s){return i+(n-e)*(s-i)/(t-e)}function ep(n,e,t){return n!==e?(t-n)/(e-n):0}function Js(n,e,t){return(1-t)*n+t*e}function tp(n,e,t,i){return Js(n,e,1-Math.exp(-t*i))}function np(n,e=1){return e-Math.abs(gl(n,e*2)-e)}function ip(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*(3-2*n))}function sp(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*n*(n*(n*6-15)+10))}function rp(n,e){return n+Math.floor(Math.random()*(e-n+1))}function ap(n,e){return n+Math.random()*(e-n)}function op(n){return n*(.5-Math.random())}function cp(n){n!==void 0&&(Fh=n);let e=Fh+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function lp(n){return n*Ys}function hp(n){return n*Bi}function up(n){return n>0&&Number.isInteger(n)&&2**Math.round(Math.log2(n))===n}function dp(n){return Math.pow(2,Math.ceil(Math.log(n)/Math.LN2))}function bl(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function fp(n,e,t,i,s){let r=Math.cos,a=Math.sin,o=r(t/2),l=a(t/2),c=r((e+i)/2),h=a((e+i)/2),f=r((e-i)/2),d=a((e-i)/2),p=r((i-e)/2),g=a((i-e)/2);switch(s){case"XYX":n.set(o*h,l*f,l*d,o*c);break;case"YZY":n.set(l*d,o*h,l*f,o*c);break;case"ZXZ":n.set(l*f,l*d,o*h,o*c);break;case"XZX":n.set(o*h,l*g,l*p,o*c);break;case"YXY":n.set(l*p,o*h,l*g,o*c);break;case"ZYZ":n.set(l*g,l*p,o*h,o*c);break;default:Ne("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function Co(n){switch(n.constructor){case Uint32Array:return 4294967295;case Uint16Array:return 65535;case Uint8Array:case Uint8ClampedArray:return 255;case Int32Array:return 2147483647;case Int16Array:return 32767;case Int8Array:return 127;default:return}}function _l(n,e){if(e.constructor===Float32Array)return n;let t=Co(e);if(t===void 0)throw new Error("THREE.MathUtils: Invalid component type.");return Math.max(n/t,-1)}function xl(n,e){if(e.constructor===Float32Array)return n;let t=Co(e);if(t===void 0)throw new Error("THREE.MathUtils: Invalid component type.");return Math.round(n*t)}function pp(){let n={enabled:!0,workingColorSpace:$s,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===et&&(s.r=$n(s.r),s.g=$n(s.g),s.b=$n(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===et&&(s.r=fs(s.r),s.g=fs(s.g),s.b=fs(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===si?Qs:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[a].fromXYZ).multiply(this.spaces[r].toXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[$s]:{primaries:e,whitePoint:i,transfer:Qs,toXYZ:Bh,fromXYZ:kh,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Xt},outputColorSpaceConfig:{drawingBufferColorSpace:Xt}},[Xt]:{primaries:e,whitePoint:i,transfer:et,toXYZ:Bh,fromXYZ:kh,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Xt}}}),n}function $n(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function fs(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}function pc(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?ya.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(Ne("Texture: Unable to serialize Texture."),{})}function bc(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}function Ec(n,e,t,i,s){for(let r=0,a=n.length-3;r<=a;r+=3){Ui.fromArray(n,r);let o=s.x*Math.abs(Ui.x)+s.y*Math.abs(Ui.y)+s.z*Math.abs(Ui.z),l=e.dot(Ui),c=t.dot(Ui),h=i.dot(Ui);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}function Kh(n){return n.buffer._uuid===void 0&&(n.buffer._uuid=Ai()),n.byteOffset===0&&n.byteLength===n.buffer.byteLength?n.buffer._uuid:n.buffer._uuid+":"+n.byteOffset+":"+n.byteLength}function Pp(n,e,t,i,s,r,a,o){let l;if(e.side===on?l=i.intersectTriangle(a,r,s,!0,o):l=i.intersectTriangle(s,r,a,e.side===Ei,o),l===null)return null;ia.copy(o),ia.applyMatrix4(n.matrixWorld);let c=t.ray.origin.distanceTo(ia);return c<t.near||c>t.far?null:{distance:c,point:ia.clone(),object:n}}function sa(n,e,t,i,s,r,a,o,l,c){n.getVertexPosition(o,Qr),n.getVertexPosition(l,ea),n.getVertexPosition(c,ta);let h=Pp(n,e,t,i,Qr,ea,ta,Zh);if(h){let f=new N;mi.getBarycoord(Zh,Qr,ea,ta,f),s&&(h.uv=mi.getInterpolatedAttribute(s,o,l,c,f,new De)),r&&(h.uv1=mi.getInterpolatedAttribute(r,o,l,c,f,new De)),a&&(h.normal=mi.getInterpolatedAttribute(a,o,l,c,f,new N),h.normal.dot(i.direction)>0&&h.normal.multiplyScalar(-1));let d={a:o,b:l,c,normal:new N,materialIndex:0};mi.getNormal(Qr,ea,ta,d.normal),h.face=d,h.barycoord=f}return h}function Qh(n,e,t){let i=`${n.x},${n.y},${n.z}-${e.x},${e.y},${e.z}`,s=`${e.x},${e.y},${e.z}-${n.x},${n.y},${n.z}`;return t.has(i)===!0||t.has(s)===!0?!1:(t.add(i),t.add(s),!0)}function ji(n){let e={};for(let t in n){e[t]={};for(let i in n[t]){let s=n[t][i];if(eu(s))s.isRenderTargetTexture?(Ne("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=s.clone();else if(Array.isArray(s))if(eu(s[0])){let r=[];for(let a=0,o=s.length;a<o;a++)r[a]=s[a].clone();e[t][i]=r}else e[t][i]=s.slice();else e[t][i]=s}}return e}function Yt(n){let e={};for(let t=0;t<n.length;t++){let i=ji(n[t]);for(let s in i)e[s]=i[s]}return e}function eu(n){return n&&(n.isColor||n.isMatrix3||n.isMatrix4||n.isVector2||n.isVector3||n.isVector4||n.isTexture||n.isQuaternion)}function Ip(n){let e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function vl(n){let e=n.getRenderTarget();return e===null?n.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Ke.workingColorSpace}function cs(n,e){return!n||n.constructor===e?n:typeof e.BYTES_PER_ELEMENT=="number"?new e(n):Array.prototype.slice.call(n)}function aa(n){return n!==void 0&&n.inTangents!==void 0&&n.outTangents!==void 0}function ju(n,e,t,i,s){let r=1-n;return r*r*r*e+3*r*r*n*t+3*r*n*n*i+n*n*n*s}function Up(n,e,t,i,s){let r=1-n;return 3*r*r*(t-e)+6*r*n*(i-t)+3*n*n*(s-i)}function Fp(n,e,t,i,s){let r=(n-e)/(s-e);for(let a=0;a<8;a++){let o=ju(r,e,t,i,s)-n;if(Math.abs(o)<1e-10)break;let l=Up(r,e,t,i,s);if(Math.abs(l)<1e-10)break;r=Math.max(0,Math.min(1,r-o/l))}return r}function tu(n,e){for(let t=0,i=n.length;t!==i;t+=2)n[t]+=e}function nu(n,e){for(let t=0,i=n.length;t!==i;t+=2)n[t]*=e}function cu(n,e){return n.distance-e.distance}function zc(n,e,t,i){let s=!0;if(n.layers.test(e.layers)&&n.raycast(e,t)===!1&&(s=!1),s===!0&&i===!0){let r=n.children;for(let a=0,o=r.length;a<o;a++)zc(r[a],e,t,!0)}}function Ml(n,e,t,i){let s=jp(i);switch(t){case al:return n*e;case cl:return n*e/s.components*s.byteLength;case ja:return n*e/s.components*s.byteLength;case Ti:return n*e*2/s.components*s.byteLength;case Ka:return n*e*2/s.components*s.byteLength;case ol:return n*e*3/s.components*s.byteLength;case Nn:return n*e*4/s.components*s.byteLength;case Ya:return n*e*4/s.components*s.byteLength;case Mr:case wr:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case Er:case Tr:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Za:case Qa:return Math.max(n,16)*Math.max(e,8)/4;case Ja:case $a:return Math.max(n,8)*Math.max(e,8)/2;case eo:case to:case io:case so:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case no:case Ar:case ro:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case ao:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case oo:return Math.floor((n+4)/5)*Math.floor((e+3)/4)*16;case co:return Math.floor((n+4)/5)*Math.floor((e+4)/5)*16;case lo:return Math.floor((n+5)/6)*Math.floor((e+4)/5)*16;case ho:return Math.floor((n+5)/6)*Math.floor((e+5)/6)*16;case uo:return Math.floor((n+7)/8)*Math.floor((e+4)/5)*16;case fo:return Math.floor((n+7)/8)*Math.floor((e+5)/6)*16;case po:return Math.floor((n+7)/8)*Math.floor((e+7)/8)*16;case mo:return Math.floor((n+9)/10)*Math.floor((e+4)/5)*16;case go:return Math.floor((n+9)/10)*Math.floor((e+5)/6)*16;case bo:return Math.floor((n+9)/10)*Math.floor((e+7)/8)*16;case _o:return Math.floor((n+9)/10)*Math.floor((e+9)/10)*16;case xo:return Math.floor((n+11)/12)*Math.floor((e+9)/10)*16;case vo:return Math.floor((n+11)/12)*Math.floor((e+11)/12)*16;case yo:case So:case Mo:return Math.ceil(n/4)*Math.ceil(e/4)*16;case wo:case Eo:return Math.ceil(n/4)*Math.ceil(e/4)*8;case Cr:case To:return Math.ceil(n/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function jp(n){switch(n){case hn:case nl:return{byteLength:1,components:1};case Rs:case il:case Dn:return{byteLength:2,components:1};case qa:case Xa:return{byteLength:2,components:4};case Ln:case Wa:case In:return{byteLength:4,components:1};case sl:case rl:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${n}.`)}var Mi,wi,hu,Vc,uu,vr,du,Ts,Ei,on,bn,Hi,As,Hc,Wc,qc,fu,Wi,pu,mu,gu,bu,_u,xu,vu,yu,Xc,jc,Su,Mu,wu,Eu,Tu,Au,Cu,Ru,Pu,da,fa,pa,ps,ms,ma,ga,ba,Kc,Lu,Iu,kn,Yc,Jc,Zc,yr,$c,Qc,el,tl,qi,Cs,Ga,Va,_a,On,xa,Rt,Du,Sr,nn,Ha,ni,hn,nl,il,Rs,Wa,Ln,In,Dn,qa,Xa,Xi,sl,rl,al,ol,Nn,Qn,ii,cl,ja,Ti,Ka,Ya,Mr,wr,Er,Tr,Ja,Za,$a,Qa,eo,to,no,io,so,Ar,ro,ao,oo,co,lo,ho,uo,fo,po,mo,go,bo,_o,xo,vo,yo,So,Mo,wo,Eo,Cr,To,Zs,va,ha,Dc,Nc,Uc,Fc,Nu,Ao,Uu,si,Xt,$s,Qs,et,ua,ll,hl,Fu,Ou,Bu,ku,ul,zu,Gu,dl,fl,pl,ml,yn,gs,Uh,bs,qu,Rn,Wt,Fh,Ys,Bi,Kt,De,pn,N,dc,Oh,Be,fc,Bh,kh,Ke,$i,ya,mp,_s,gp,mc,sn,Ze,Sa,mn,nr,Ma,it,Qi,En,bp,_p,hi,Hr,dn,zh,Gh,ei,xs,xp,Vh,es,jn,Wr,Ws,vp,yp,Hh,Wh,qh,Xh,Sp,ts,gc,Pt,Cn,Mp,vs,Xu,ui,qr,qe,qt,ir,Tn,Kn,_c,Yn,ns,is,jh,xc,vc,yc,Sc,Mc,wc,mi,rn,Jn,An,Xr,ss,rs,as,di,fi,Ni,qs,jr,Kr,Ui,vt,Yr,wp,gt,sr,rr,yt,Ep,Xs,Tc,Bn,Tp,vn,Ac,os,fn,js,Ct,an,wa,en,Pn,Cc,Ap,Cp,tn,Rp,gi,Zn,Rc,Jr,Zr,ki,zi,Yh,Fi,$r,Jh,Qr,ea,ta,Pc,na,Zh,ia,St,Ea,Oi,Lp,ra,bi,$h,Ta,ar,or,ti,cr,lr,ys,hr,ur,Rr,Dp,Np,Sn,Aa,Gi,Ca,Ra,_i,Pa,La,Ia,Da,gn,xi,Na,Ua,Fa,dr,vi,Oa,Ba,Ku,ka,Ss,fr,Lc,iu,su,pr,oa,ca,Fn,mr,pi,ru,au,jt,Oc,gr,Vi,Bc,Ms,br,ls,hs,ws,za,yl,Op,Sl,Bp,kp,zp,Gp,Vp,Hp,Wp,kc,lt,Xx,yi,ou,Es,Si,Gc,lu,la,us,ds,Ic,qp,Xp,_r,xr,wl=xt(()=>{/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */Mi={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},wi={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},hu=0,Vc=1,uu=2,vr=1,du=2,Ts=3,Ei=0,on=1,bn=2,Hi=0,As=1,Hc=2,Wc=3,qc=4,fu=5,Wi=100,pu=101,mu=102,gu=103,bu=104,_u=200,xu=201,vu=202,yu=203,Xc=204,jc=205,Su=206,Mu=207,wu=208,Eu=209,Tu=210,Au=211,Cu=212,Ru=213,Pu=214,da=0,fa=1,pa=2,ps=3,ms=4,ma=5,ga=6,ba=7,Kc=0,Lu=1,Iu=2,kn=0,Yc=1,Jc=2,Zc=3,yr=4,$c=5,Qc=6,el=7,tl=300,qi=301,Cs=302,Ga=303,Va=304,_a=1e3,On=1001,xa=1002,Rt=1003,Du=1004,Sr=1005,nn=1006,Ha=1007,ni=1008,hn=1009,nl=1010,il=1011,Rs=1012,Wa=1013,Ln=1014,In=1015,Dn=1016,qa=1017,Xa=1018,Xi=1020,sl=35902,rl=35899,al=1021,ol=1022,Nn=1023,Qn=1026,ii=1027,cl=1028,ja=1029,Ti=1030,Ka=1031,Ya=1033,Mr=33776,wr=33777,Er=33778,Tr=33779,Ja=35840,Za=35841,$a=35842,Qa=35843,eo=36196,to=37492,no=37496,io=37488,so=37489,Ar=37490,ro=37491,ao=37808,oo=37809,co=37810,lo=37811,ho=37812,uo=37813,fo=37814,po=37815,mo=37816,go=37817,bo=37818,_o=37819,xo=37820,vo=37821,yo=36492,So=36494,Mo=36495,wo=36283,Eo=36284,Cr=36285,To=36286,Zs=2300,va=2301,ha=2302,Dc=2303,Nc=2400,Uc=2401,Fc=2402,Nu=3200,Ao=0,Uu=1,si="",Xt="srgb",$s="srgb-linear",Qs="linear",et="srgb",ua=7680,ll=7681,hl=514,Fu=519,Ou=512,Bu=513,ku=514,ul=515,zu=516,Gu=517,dl=518,fl=519,pl=35044,ml="300 es",yn=2e3,gs=2001;Uh={},bs=null;qu={[da]:da,[pa]:ga,[ms]:ms,[ps]:ma,[fa]:fa,[ga]:pa,[ba]:ba,[ma]:ps},Rn=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){let i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){let i=this._listeners;if(i===void 0)return;let s=i[e];if(s!==void 0){let r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let i=t[e.type];if(i!==void 0){e.target=this;let s=i.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,e);e.target=null}}},Wt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Fh=1234567,Ys=Math.PI/180,Bi=180/Math.PI;Kt={DEG2RAD:Ys,RAD2DEG:Bi,generateUUID:Ai,clamp:ze,euclideanModulo:gl,mapLinear:Qf,inverseLerp:ep,lerp:Js,damp:tp,pingpong:np,smoothstep:ip,smootherstep:sp,randInt:rp,randFloat:ap,randFloatSpread:op,seededRandom:cp,degToRad:lp,radToDeg:hp,isPowerOfTwo:up,ceilPowerOfTwo:dp,floorPowerOfTwo:bl,setQuaternionFromProperEuler:fp,normalize:xl,denormalize:_l},De=class{static{this.prototype.isVector2=!0}constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,i=this.y,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6],this.y=s[1]*t+s[4]*i+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=ze(this.x,e.x,t.x),this.y=ze(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=ze(this.x,e,t),this.y=ze(this.y,e,t),this}clampLength(e,t){let i=this.length();return this.divideScalar(i||1).multiplyScalar(ze(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let i=this.dot(e)/t;return Math.acos(ze(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let i=Math.cos(t),s=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*i-a*s+e.x,this.y=r*s+a*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},pn=class{constructor(e=0,t=0,i=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=s}static slerpFlat(e,t,i,s,r,a,o){let l=i[s+0],c=i[s+1],h=i[s+2],f=i[s+3],d=r[a+0],p=r[a+1],g=r[a+2],S=r[a+3];if(f!==S||l!==d||c!==p||h!==g){let m=l*d+c*p+h*g+f*S;m<0&&(d=-d,p=-p,g=-g,S=-S,m=-m);let u=1-o;if(m<.9995){let v=Math.acos(m),E=Math.sin(v);u=Math.sin(u*v)/E,o=Math.sin(o*v)/E,l=l*u+d*o,c=c*u+p*o,h=h*u+g*o,f=f*u+S*o}else{l=l*u+d*o,c=c*u+p*o,h=h*u+g*o,f=f*u+S*o;let v=1/Math.sqrt(l*l+c*c+h*h+f*f);l*=v,c*=v,h*=v,f*=v}}e[t]=l,e[t+1]=c,e[t+2]=h,e[t+3]=f}static multiplyQuaternionsFlat(e,t,i,s,r,a){let o=i[s],l=i[s+1],c=i[s+2],h=i[s+3],f=r[a],d=r[a+1],p=r[a+2],g=r[a+3];return e[t]=o*g+h*f+l*p-c*d,e[t+1]=l*g+h*d+c*f-o*p,e[t+2]=c*g+h*p+o*d-l*f,e[t+3]=h*g-o*f-l*d-c*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,s){return this._x=e,this._y=t,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let i=e._x,s=e._y,r=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(i/2),h=o(s/2),f=o(r/2),d=l(i/2),p=l(s/2),g=l(r/2);switch(a){case"XYZ":this._x=d*h*f+c*p*g,this._y=c*p*f-d*h*g,this._z=c*h*g+d*p*f,this._w=c*h*f-d*p*g;break;case"YXZ":this._x=d*h*f+c*p*g,this._y=c*p*f-d*h*g,this._z=c*h*g-d*p*f,this._w=c*h*f+d*p*g;break;case"ZXY":this._x=d*h*f-c*p*g,this._y=c*p*f+d*h*g,this._z=c*h*g+d*p*f,this._w=c*h*f-d*p*g;break;case"ZYX":this._x=d*h*f-c*p*g,this._y=c*p*f+d*h*g,this._z=c*h*g-d*p*f,this._w=c*h*f+d*p*g;break;case"YZX":this._x=d*h*f+c*p*g,this._y=c*p*f+d*h*g,this._z=c*h*g-d*p*f,this._w=c*h*f-d*p*g;break;case"XZY":this._x=d*h*f-c*p*g,this._y=c*p*f-d*h*g,this._z=c*h*g+d*p*f,this._w=c*h*f+d*p*g;break;default:Ne("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let i=t/2,s=Math.sin(i);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,i=t[0],s=t[4],r=t[8],a=t[1],o=t[5],l=t[9],c=t[2],h=t[6],f=t[10],d=i+o+f;if(d>0){let p=.5/Math.sqrt(d+1);this._w=.25/p,this._x=(h-l)*p,this._y=(r-c)*p,this._z=(a-s)*p}else if(i>o&&i>f){let p=2*Math.sqrt(1+i-o-f);this._w=(h-l)/p,this._x=.25*p,this._y=(s+a)/p,this._z=(r+c)/p}else if(o>f){let p=2*Math.sqrt(1+o-i-f);this._w=(r-c)/p,this._x=(s+a)/p,this._y=.25*p,this._z=(l+h)/p}else{let p=2*Math.sqrt(1+f-i-o);this._w=(a-s)/p,this._x=(r+c)/p,this._y=(l+h)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(ze(this.dot(e),-1,1)))}rotateTowards(e,t){let i=this.angleTo(e);if(i===0)return this;let s=Math.min(1,t/i);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let i=e._x,s=e._y,r=e._z,a=e._w,o=t._x,l=t._y,c=t._z,h=t._w;return this._x=i*h+a*o+s*c-r*l,this._y=s*h+a*l+r*o-i*c,this._z=r*h+a*c+i*l-s*o,this._w=a*h-i*o-s*l-r*c,this._onChangeCallback(),this}slerp(e,t){let i=e._x,s=e._y,r=e._z,a=e._w,o=this.dot(e);o<0&&(i=-i,s=-s,r=-r,a=-a,o=-o);let l=1-t;if(o<.9995){let c=Math.acos(o),h=Math.sin(c);l=Math.sin(l*c)/h,t=Math.sin(t*c)/h,this._x=this._x*l+i*t,this._y=this._y*l+s*t,this._z=this._z*l+r*t,this._w=this._w*l+a*t,this._onChangeCallback()}else this._x=this._x*l+i*t,this._y=this._y*l+s*t,this._z=this._z*l+r*t,this._w=this._w*l+a*t,this.normalize();return this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),s=Math.sqrt(1-i),r=Math.sqrt(i);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},N=class{static{this.prototype.isVector3=!0}constructor(e=0,t=0,i=0){this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Oh.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Oh.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,i=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6]*s,this.y=r[1]*t+r[4]*i+r[7]*s,this.z=r[2]*t+r[5]*i+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,i=this.y,s=this.z,r=e.elements,a=1/(r[3]*t+r[7]*i+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*i+r[8]*s+r[12])*a,this.y=(r[1]*t+r[5]*i+r[9]*s+r[13])*a,this.z=(r[2]*t+r[6]*i+r[10]*s+r[14])*a,this}applyQuaternion(e){let t=this.x,i=this.y,s=this.z,r=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*s-o*i),h=2*(o*t-r*s),f=2*(r*i-a*t);return this.x=t+l*c+a*f-o*h,this.y=i+l*h+o*c-r*f,this.z=s+l*f+r*h-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,i=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*i+r[8]*s,this.y=r[1]*t+r[5]*i+r[9]*s,this.z=r[2]*t+r[6]*i+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=ze(this.x,e.x,t.x),this.y=ze(this.y,e.y,t.y),this.z=ze(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=ze(this.x,e,t),this.y=ze(this.y,e,t),this.z=ze(this.z,e,t),this}clampLength(e,t){let i=this.length();return this.divideScalar(i||1).multiplyScalar(ze(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let i=e.x,s=e.y,r=e.z,a=t.x,o=t.y,l=t.z;return this.x=s*l-r*o,this.y=r*a-i*l,this.z=i*o-s*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return dc.copy(this).projectOnVector(e),this.sub(dc)}reflect(e){return this.sub(dc.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let i=this.dot(e)/t;return Math.acos(ze(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,i=this.y-e.y,s=this.z-e.z;return t*t+i*i+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){let s=Math.sin(t)*e;return this.x=s*Math.sin(i),this.y=Math.cos(t)*e,this.z=s*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},dc=new N,Oh=new pn,Be=class{static{this.prototype.isMatrix3=!0}constructor(e,t,i,s,r,a,o,l,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,s,r,a,o,l,c)}set(e,t,i,s,r,a,o,l,c){let h=this.elements;return h[0]=e,h[1]=s,h[2]=o,h[3]=t,h[4]=r,h[5]=l,h[6]=i,h[7]=a,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let i=e.elements,s=t.elements,r=this.elements,a=i[0],o=i[3],l=i[6],c=i[1],h=i[4],f=i[7],d=i[2],p=i[5],g=i[8],S=s[0],m=s[3],u=s[6],v=s[1],E=s[4],y=s[7],A=s[2],T=s[5],b=s[8];return r[0]=a*S+o*v+l*A,r[3]=a*m+o*E+l*T,r[6]=a*u+o*y+l*b,r[1]=c*S+h*v+f*A,r[4]=c*m+h*E+f*T,r[7]=c*u+h*y+f*b,r[2]=d*S+p*v+g*A,r[5]=d*m+p*E+g*T,r[8]=d*u+p*y+g*b,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8];return t*a*h-t*o*c-i*r*h+i*o*l+s*r*c-s*a*l}invert(){let e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8],f=h*a-o*c,d=o*l-h*r,p=c*r-a*l,g=t*f+i*d+s*p;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);let S=1/g;return e[0]=f*S,e[1]=(s*c-h*i)*S,e[2]=(o*i-s*a)*S,e[3]=d*S,e[4]=(h*t-s*l)*S,e[5]=(s*r-o*t)*S,e[6]=p*S,e[7]=(i*l-c*t)*S,e[8]=(a*t-i*r)*S,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,s,r,a,o){let l=Math.cos(r),c=Math.sin(r);return this.set(i*l,i*c,-i*(l*a+c*o)+a+e,-s*c,s*l,-s*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return Ks("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(fc.makeScale(e,t)),this}rotate(e){return Ks("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(fc.makeRotation(-e)),this}translate(e,t){return Ks("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(fc.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,i=e.elements;for(let s=0;s<9;s++)if(t[s]!==i[s])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){let i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}},fc=new Be,Bh=new Be().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),kh=new Be().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);Ke=pp();ya=class{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{$i===void 0&&($i=er("canvas")),$i.width=e.width,$i.height=e.height;let s=$i.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),i=$i}return i.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=er("canvas");t.width=e.width,t.height=e.height;let i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);let s=i.getImageData(0,0,e.width,e.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=$n(r[a]/255)*255;return i.putImageData(s,0,0),t}else if(e.data){let t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor($n(t[i]/255)*255):t[i]=$n(t[i]);return{data:t,width:e.width,height:e.height}}else return Ne("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},mp=0,_s=class{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:mp++}),this.uuid=Ai(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width||0,t.height||0,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(pc(s[a].image)):r.push(pc(s[a]))}else r=pc(s);i.url=r}return t||(e.images[this.uuid]=i),i}};gp=0,mc=new N,sn=class n extends Rn{constructor(e=n.DEFAULT_IMAGE,t=n.DEFAULT_MAPPING,i=On,s=On,r=nn,a=ni,o=Nn,l=hn,c=n.DEFAULT_ANISOTROPY,h=si){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:gp++}),this.uuid=Ai(),this.name="",this.source=new _s(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new De(0,0),this.repeat=new De(1,1),this.center=new De(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Be,this.generateMipmaps=!0,this.mipmapsAutoUpdate=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.isPMREMTexture=!1,this.normalized=!1}get width(){return this.source.getSize(mc).x}get height(){return this.source.getSize(mc).y}get depth(){return this.source.getSize(mc).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.mipmapsAutoUpdate=e.mipmapsAutoUpdate,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isPMREMTexture=e.isPMREMTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let i=e[t];if(i===void 0){Ne(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let s=this[t];if(s===void 0){Ne(`Texture.setValues(): property '${t}' does not exist.`);continue}s&&i&&s.isVector2&&i.isVector2||s&&i&&s.isVector3&&i.isVector3||s&&i&&s.isMatrix3&&i.isMatrix3?s.copy(i):this[t]=i}}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,mipmapsAutoUpdate:this.mipmapsAutoUpdate,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==tl)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case _a:e.x=e.x-Math.floor(e.x);break;case On:e.x=e.x<0?0:1;break;case xa:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case _a:e.y=e.y-Math.floor(e.y);break;case On:e.y=e.y<0?0:1;break;case xa:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};sn.DEFAULT_IMAGE=null;sn.DEFAULT_MAPPING=tl;sn.DEFAULT_ANISOTROPY=1;Ze=class{static{this.prototype.isVector4=!0}constructor(e=0,t=0,i=0,s=1){this.x=e,this.y=t,this.z=i,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,s){return this.x=e,this.y=t,this.z=i,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,i=this.y,s=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*i+a[8]*s+a[12]*r,this.y=a[1]*t+a[5]*i+a[9]*s+a[13]*r,this.z=a[2]*t+a[6]*i+a[10]*s+a[14]*r,this.w=a[3]*t+a[7]*i+a[11]*s+a[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,s,r,l=e.elements,c=l[0],h=l[4],f=l[8],d=l[1],p=l[5],g=l[9],S=l[2],m=l[6],u=l[10];if(Math.abs(h-d)<.01&&Math.abs(f-S)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+d)<.1&&Math.abs(f+S)<.1&&Math.abs(g+m)<.1&&Math.abs(c+p+u-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let E=(c+1)/2,y=(p+1)/2,A=(u+1)/2,T=(h+d)/4,b=(f+S)/4,w=(g+m)/4;return E>y&&E>A?E<.01?(i=0,s=.707106781,r=.707106781):(i=Math.sqrt(E),s=T/i,r=b/i):y>A?y<.01?(i=.707106781,s=0,r=.707106781):(s=Math.sqrt(y),i=T/s,r=w/s):A<.01?(i=.707106781,s=.707106781,r=0):(r=Math.sqrt(A),i=b/r,s=w/r),this.set(i,s,r,t),this}let v=Math.sqrt((m-g)*(m-g)+(f-S)*(f-S)+(d-h)*(d-h));return Math.abs(v)<.001&&(v=1),this.x=(m-g)/v,this.y=(f-S)/v,this.z=(d-h)/v,this.w=Math.acos((c+p+u-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=ze(this.x,e.x,t.x),this.y=ze(this.y,e.y,t.y),this.z=ze(this.z,e.z,t.z),this.w=ze(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=ze(this.x,e,t),this.y=ze(this.y,e,t),this.z=ze(this.z,e,t),this.w=ze(this.w,e,t),this}clampLength(e,t){let i=this.length();return this.divideScalar(i||1).multiplyScalar(ze(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},Sa=class extends Rn{constructor(e=1,t=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:nn,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},i),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=i.depth,this.scissor=new Ze(0,0,e,t),this.scissorTest=!1,this.viewport=new Ze(0,0,e,t),this.textures=[];let s=i.count;for(let r=0;r<s;r++)this.textures[r]=new sn({width:e,height:t,depth:i.depth}),this.textures[r].isRenderTargetTexture=!0,this.textures[r].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveColorBuffer=i.resolveColorBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.storeMultisampledColorBuffer=i.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=i.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=i.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview,this.useArrayDepthTexture=i.useArrayDepthTexture}_setTextureOptions(e={}){let t={minFilter:nn,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.mipmapsAutoUpdate!==void 0&&(t.mipmapsAutoUpdate=e.mipmapsAutoUpdate),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=i,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,i=e.textures.length;t<i;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let s=Object.assign({},e.textures[t].image);this.textures[t].source=new _s(s)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null)if(e.depthTexture.renderTarget===e){let t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture;else this.depthTexture=null;return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},mn=class extends Sa{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}},nr=class extends sn{constructor(e=null,t=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:s},this.magFilter=Rt,this.minFilter=Rt,this.wrapR=On,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}},Ma=class extends sn{constructor(e=null,t=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:s},this.magFilter=Rt,this.minFilter=Rt,this.wrapR=On,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}},it=class n{static{this.prototype.isMatrix4=!0}constructor(e,t,i,s,r,a,o,l,c,h,f,d,p,g,S,m){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,s,r,a,o,l,c,h,f,d,p,g,S,m)}set(e,t,i,s,r,a,o,l,c,h,f,d,p,g,S,m){let u=this.elements;return u[0]=e,u[4]=t,u[8]=i,u[12]=s,u[1]=r,u[5]=a,u[9]=o,u[13]=l,u[2]=c,u[6]=h,u[10]=f,u[14]=d,u[3]=p,u[7]=g,u[11]=S,u[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new n().fromArray(this.elements)}copy(e){let t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){let t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),i.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();let t=this.elements,i=e.elements,s=1/Qi.setFromMatrixColumn(e,0).length(),r=1/Qi.setFromMatrixColumn(e,1).length(),a=1/Qi.setFromMatrixColumn(e,2).length();return t[0]=i[0]*s,t[1]=i[1]*s,t[2]=i[2]*s,t[3]=0,t[4]=i[4]*r,t[5]=i[5]*r,t[6]=i[6]*r,t[7]=0,t[8]=i[8]*a,t[9]=i[9]*a,t[10]=i[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,i=e.x,s=e.y,r=e.z,a=Math.cos(i),o=Math.sin(i),l=Math.cos(s),c=Math.sin(s),h=Math.cos(r),f=Math.sin(r);if(e.order==="XYZ"){let d=a*h,p=a*f,g=o*h,S=o*f;t[0]=l*h,t[4]=-l*f,t[8]=c,t[1]=p+g*c,t[5]=d-S*c,t[9]=-o*l,t[2]=S-d*c,t[6]=g+p*c,t[10]=a*l}else if(e.order==="YXZ"){let d=l*h,p=l*f,g=c*h,S=c*f;t[0]=d+S*o,t[4]=g*o-p,t[8]=a*c,t[1]=a*f,t[5]=a*h,t[9]=-o,t[2]=p*o-g,t[6]=S+d*o,t[10]=a*l}else if(e.order==="ZXY"){let d=l*h,p=l*f,g=c*h,S=c*f;t[0]=d-S*o,t[4]=-a*f,t[8]=g+p*o,t[1]=p+g*o,t[5]=a*h,t[9]=S-d*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){let d=a*h,p=a*f,g=o*h,S=o*f;t[0]=l*h,t[4]=g*c-p,t[8]=d*c+S,t[1]=l*f,t[5]=S*c+d,t[9]=p*c-g,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){let d=a*l,p=a*c,g=o*l,S=o*c;t[0]=l*h,t[4]=S-d*f,t[8]=g*f+p,t[1]=f,t[5]=a*h,t[9]=-o*h,t[2]=-c*h,t[6]=p*f+g,t[10]=d-S*f}else if(e.order==="XZY"){let d=a*l,p=a*c,g=o*l,S=o*c;t[0]=l*h,t[4]=-f,t[8]=c*h,t[1]=d*f+S,t[5]=a*h,t[9]=p*f-g,t[2]=g*f-p,t[6]=o*h,t[10]=S*f+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(bp,e,_p)}lookAt(e,t,i){let s=this.elements;return dn.subVectors(e,t),dn.lengthSq()===0&&(dn.z=1),dn.normalize(),hi.crossVectors(i,dn),hi.lengthSq()===0&&(Math.abs(i.z)===1?dn.x+=1e-4:dn.z+=1e-4,dn.normalize(),hi.crossVectors(i,dn)),hi.normalize(),Hr.crossVectors(dn,hi),s[0]=hi.x,s[4]=Hr.x,s[8]=dn.x,s[1]=hi.y,s[5]=Hr.y,s[9]=dn.y,s[2]=hi.z,s[6]=Hr.z,s[10]=dn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let i=e.elements,s=t.elements,r=this.elements,a=i[0],o=i[4],l=i[8],c=i[12],h=i[1],f=i[5],d=i[9],p=i[13],g=i[2],S=i[6],m=i[10],u=i[14],v=i[3],E=i[7],y=i[11],A=i[15],T=s[0],b=s[4],w=s[8],F=s[12],P=s[1],I=s[5],k=s[9],W=s[13],R=s[2],H=s[6],j=s[10],z=s[14],ie=s[3],q=s[7],ee=s[11],ne=s[15];return r[0]=a*T+o*P+l*R+c*ie,r[4]=a*b+o*I+l*H+c*q,r[8]=a*w+o*k+l*j+c*ee,r[12]=a*F+o*W+l*z+c*ne,r[1]=h*T+f*P+d*R+p*ie,r[5]=h*b+f*I+d*H+p*q,r[9]=h*w+f*k+d*j+p*ee,r[13]=h*F+f*W+d*z+p*ne,r[2]=g*T+S*P+m*R+u*ie,r[6]=g*b+S*I+m*H+u*q,r[10]=g*w+S*k+m*j+u*ee,r[14]=g*F+S*W+m*z+u*ne,r[3]=v*T+E*P+y*R+A*ie,r[7]=v*b+E*I+y*H+A*q,r[11]=v*w+E*k+y*j+A*ee,r[15]=v*F+E*W+y*z+A*ne,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],i=e[4],s=e[8],r=e[12],a=e[1],o=e[5],l=e[9],c=e[13],h=e[2],f=e[6],d=e[10],p=e[14],g=e[3],S=e[7],m=e[11],u=e[15],v=l*p-c*d,E=o*p-c*f,y=o*d-l*f,A=a*p-c*h,T=a*d-l*h,b=a*f-o*h;return t*(S*v-m*E+u*y)-i*(g*v-m*A+u*T)+s*(g*E-S*A+u*b)-r*(g*y-S*T+m*b)}determinantAffine(){let e=this.elements,t=e[0],i=e[4],s=e[8],r=e[1],a=e[5],o=e[9],l=e[2],c=e[6],h=e[10];return t*(a*h-o*c)-i*(r*h-o*l)+s*(r*c-a*l)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){let s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=i),this}invert(){let e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8],f=e[9],d=e[10],p=e[11],g=e[12],S=e[13],m=e[14],u=e[15],v=t*o-i*a,E=t*l-s*a,y=t*c-r*a,A=i*l-s*o,T=i*c-r*o,b=s*c-r*l,w=h*S-f*g,F=h*m-d*g,P=h*u-p*g,I=f*m-d*S,k=f*u-p*S,W=d*u-p*m,R=v*W-E*k+y*I+A*P-T*F+b*w;if(R===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let H=1/R;return e[0]=(o*W-l*k+c*I)*H,e[1]=(s*k-i*W-r*I)*H,e[2]=(S*b-m*T+u*A)*H,e[3]=(d*T-f*b-p*A)*H,e[4]=(l*P-a*W-c*F)*H,e[5]=(t*W-s*P+r*F)*H,e[6]=(m*y-g*b-u*E)*H,e[7]=(h*b-d*y+p*E)*H,e[8]=(a*k-o*P+c*w)*H,e[9]=(i*P-t*k-r*w)*H,e[10]=(g*T-S*y+u*v)*H,e[11]=(f*y-h*T-p*v)*H,e[12]=(o*F-a*I-l*w)*H,e[13]=(t*I-i*F+s*w)*H,e[14]=(S*E-g*A-m*v)*H,e[15]=(h*A-f*E+d*v)*H,this}scale(e){let t=this.elements,i=e.x,s=e.y,r=e.z;return t[0]*=i,t[4]*=s,t[8]*=r,t[1]*=i,t[5]*=s,t[9]*=r,t[2]*=i,t[6]*=s,t[10]*=r,t[3]*=i,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,s))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let i=Math.cos(t),s=Math.sin(t),r=1-i,a=e.x,o=e.y,l=e.z,c=r*a,h=r*o;return this.set(c*a+i,c*o-s*l,c*l+s*o,0,c*o+s*l,h*o+i,h*l-s*a,0,c*l-s*o,h*l+s*a,r*l*l+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,s,r,a){return this.set(1,i,r,0,e,1,a,0,t,s,1,0,0,0,0,1),this}compose(e,t,i){let s=this.elements,r=t._x,a=t._y,o=t._z,l=t._w,c=r+r,h=a+a,f=o+o,d=r*c,p=r*h,g=r*f,S=a*h,m=a*f,u=o*f,v=l*c,E=l*h,y=l*f,A=i.x,T=i.y,b=i.z;return s[0]=(1-(S+u))*A,s[1]=(p+y)*A,s[2]=(g-E)*A,s[3]=0,s[4]=(p-y)*T,s[5]=(1-(d+u))*T,s[6]=(m+v)*T,s[7]=0,s[8]=(g+E)*b,s[9]=(m-v)*b,s[10]=(1-(d+S))*b,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,i){let s=this.elements;e.x=s[12],e.y=s[13],e.z=s[14];let r=this.determinantAffine();if(r===0)return i.set(1,1,1),t.identity(),this;let a=Qi.set(s[0],s[1],s[2]).length(),o=Qi.set(s[4],s[5],s[6]).length(),l=Qi.set(s[8],s[9],s[10]).length();r<0&&(a=-a),En.copy(this);let c=1/a,h=1/o,f=1/l;return En.elements[0]*=c,En.elements[1]*=c,En.elements[2]*=c,En.elements[4]*=h,En.elements[5]*=h,En.elements[6]*=h,En.elements[8]*=f,En.elements[9]*=f,En.elements[10]*=f,t.setFromRotationMatrix(En),i.x=a,i.y=o,i.z=l,this}makePerspective(e,t,i,s,r,a,o=yn,l=!1){let c=this.elements,h=2*r/(t-e),f=2*r/(i-s),d=(t+e)/(t-e),p=(i+s)/(i-s),g,S;if(l)g=r/(a-r),S=a*r/(a-r);else if(o===yn)g=-(a+r)/(a-r),S=-2*a*r/(a-r);else if(o===gs)g=-a/(a-r),S=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=f,c[9]=p,c[13]=0,c[2]=0,c[6]=0,c[10]=g,c[14]=S,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,i,s,r,a,o=yn,l=!1){let c=this.elements,h=2/(t-e),f=2/(i-s),d=-(t+e)/(t-e),p=-(i+s)/(i-s),g,S;if(l)g=1/(a-r),S=a/(a-r);else if(o===yn)g=-2/(a-r),S=-(a+r)/(a-r);else if(o===gs)g=-1/(a-r),S=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=0,c[12]=d,c[1]=0,c[5]=f,c[9]=0,c[13]=p,c[2]=0,c[6]=0,c[10]=g,c[14]=S,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,i=e.elements;for(let s=0;s<16;s++)if(t[s]!==i[s])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){let i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}},Qi=new N,En=new it,bp=new N(0,0,0),_p=new N(1,1,1),hi=new N,Hr=new N,dn=new N,zh=new it,Gh=new pn,ei=class n{constructor(e=0,t=0,i=0,s=n.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,s=this._order){return this._x=e,this._y=t,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){let s=e.elements,r=s[0],a=s[4],o=s[8],l=s[1],c=s[5],h=s[9],f=s[2],d=s[6],p=s[10];switch(t){case"XYZ":this._y=Math.asin(ze(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,p),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-ze(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,p),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-f,r),this._z=0);break;case"ZXY":this._x=Math.asin(ze(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-f,p),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-ze(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(d,p),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(ze(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-f,r)):(this._x=0,this._y=Math.atan2(o,p));break;case"XZY":this._z=Math.asin(-ze(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,p),this._y=0);break;default:Ne("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return zh.makeRotationFromQuaternion(e),this.setFromRotationMatrix(zh,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Gh.setFromEuler(this),this.setFromQuaternion(Gh,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};ei.DEFAULT_ORDER="XYZ";xs=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},xp=0,Vh=new N,es=new pn,jn=new it,Wr=new N,Ws=new N,vp=new N,yp=new pn,Hh=new N(1,0,0),Wh=new N(0,1,0),qh=new N(0,0,1),Xh={type:"added"},Sp={type:"removed"},ts={type:"childadded",child:null},gc={type:"childremoved",child:null},Pt=class n extends Rn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:xp++}),this.uuid=Ai(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=n.DEFAULT_UP.clone();let e=new N,t=new ei,i=new pn,s=new N(1,1,1);function r(){i.setFromEuler(t,!1)}function a(){t.setFromQuaternion(i,void 0,!1)}t._onChange(r),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new it},normalMatrix:{value:new Be}}),this.matrix=new it,this.matrixWorld=new it,this.matrixAutoUpdate=n.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=n.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new xs,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale),this.pivot!==null&&this.position.copy(this.pivot).applyMatrix4(this.matrix).sub(this.pivot)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return es.setFromAxisAngle(e,t),this.quaternion.multiply(es),this}rotateOnWorldAxis(e,t){return es.setFromAxisAngle(e,t),this.quaternion.premultiply(es),this}rotateX(e){return this.rotateOnAxis(Hh,e)}rotateY(e){return this.rotateOnAxis(Wh,e)}rotateZ(e){return this.rotateOnAxis(qh,e)}translateOnAxis(e,t){return Vh.copy(e).applyQuaternion(this.quaternion),this.position.add(Vh.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Hh,e)}translateY(e){return this.translateOnAxis(Wh,e)}translateZ(e){return this.translateOnAxis(qh,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(jn.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?Wr.copy(e):Wr.set(e,t,i);let s=this.parent;this.updateWorldMatrix(!0,!1),Ws.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?jn.lookAt(Ws,Wr,this.up):jn.lookAt(Wr,Ws,this.up),this.quaternion.setFromRotationMatrix(jn),s&&(jn.extractRotation(s.matrixWorld),es.setFromRotationMatrix(jn),this.quaternion.premultiply(es.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(Ue("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Xh),ts.child=e,this.dispatchEvent(ts),ts.child=null):Ue("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Sp),gc.child=e,this.dispatchEvent(gc),gc.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),jn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),jn.multiply(e.parent.matrixWorld)),e.applyMatrix4(jn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Xh),ts.child=e,this.dispatchEvent(ts),ts.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,s=this.children.length;i<s;i++){let a=this.children[i].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);let s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ws,e,vp),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ws,yp,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){return!0}traverse(e){e(this);let t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let e=this.pivot;if(e!==null){let t=e.x,i=e.y,s=e.z,r=this.matrix.elements;r[12]+=t-r[0]*t-r[4]*i-r[8]*s,r[13]+=i-r[1]*t-r[5]*i-r[9]*s,r[14]+=s-r[2]*t-r[6]*i-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].updateMatrixWorld(e)}updateWorldMatrix(e,t,i=!1){let s=this.parent;if(e===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||i)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,i=!0),t===!0){let r=this.children;for(let a=0,o=r.length;a<o;a++)r[a].updateWorldMatrix(!1,!0,i)}}toJSON(e){let t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,s.name=this.name,s.castShadow=this.castShadow,s.receiveShadow=this.receiveShadow,s.visible=this.visible,s.frustumCulled=this.frustumCulled,s.renderOrder=this.renderOrder,s.static=this.static,s.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){let f=l[c];r(e.shapes,f)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(e.materials,this.material[l]));s.material=o}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){let l=this.animations[o];s.animations.push(r(e.animations,l))}}if(t){let o=a(e.geometries),l=a(e.materials),c=a(e.textures),h=a(e.images),f=a(e.shapes),d=a(e.skeletons),p=a(e.animations),g=a(e.nodes);o.length>0&&(i.geometries=o),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),h.length>0&&(i.images=h),f.length>0&&(i.shapes=f),d.length>0&&(i.skeletons=d),p.length>0&&(i.animations=p),g.length>0&&(i.nodes=g)}return i.object=s,i;function a(o){let l=[];for(let c in o){let h=o[c];delete h.metadata,l.push(h)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){let s=e.children[i];this.add(s.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}};Pt.DEFAULT_UP=new N(0,1,0);Pt.DEFAULT_MATRIX_AUTO_UPDATE=!0;Pt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;Cn=class extends Pt{constructor(){super(),this.isGroup=!0,this.type="Group"}},Mp={type:"move"},vs=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Cn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Cn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new N,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new N),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Cn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new N,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new N,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let s=null,r=null,a=null,o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(let S of e.hand.values()){let m=t.getJointPose(S,i),u=this._getHandJoint(c,S);m!==null&&(u.matrix.fromArray(m.transform.matrix),u.matrix.decompose(u.position,u.quaternion,u.scale),u.matrixWorldNeedsUpdate=!0,u.jointRadius=m.radius),u.visible=m!==null}let h=c.joints["index-finger-tip"],f=c.joints["thumb-tip"],d=h.position.distanceTo(f.position),p=.02,g=.005;c.inputState.pinching&&d>p+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&d<=p-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,i),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.quaternion,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:e,target:this})));o!==null&&(s=t.getPose(e.targetRaySpace,i),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.quaternion,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Mp)))}return o!==null&&(o.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let i=new Cn;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}},Xu={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ui={h:0,s:0,l:0},qr={h:0,s:0,l:0};qe=class{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){let s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Xt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Ke.colorSpaceToWorking(this,t),this}setRGB(e,t,i,s=Ke.workingColorSpace){return this.r=e,this.g=t,this.b=i,Ke.colorSpaceToWorking(this,s),this}setHSL(e,t,i,s=Ke.workingColorSpace){if(e=gl(e,1),t=ze(t,0,1),i=ze(i,0,1),t===0)this.r=this.g=this.b=i;else{let r=i<=.5?i*(1+t):i+t-i*t,a=2*i-r;this.r=bc(a,r,e+1/3),this.g=bc(a,r,e),this.b=bc(a,r,e-1/3)}return Ke.colorSpaceToWorking(this,s),this}setStyle(e,t=Xt){function i(r){r!==void 0&&parseFloat(r)<1&&Ne("Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r,a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(100,parseFloat(r[1]))/100,Math.min(100,parseFloat(r[2]))/100,Math.min(100,parseFloat(r[3]))/100,t);break;case"hsl":case"hsla":if(r=/^\s*([+-]?(?:\d+(?:\.\d+)?|\.\d+))\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:Ne("Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){let r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);Ne("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Xt){let i=Xu[e.toLowerCase()];return i!==void 0?this.setHex(i,t):Ne("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=$n(e.r),this.g=$n(e.g),this.b=$n(e.b),this}copyLinearToSRGB(e){return this.r=fs(e.r),this.g=fs(e.g),this.b=fs(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Xt){return Ke.workingToColorSpace(qt.copy(this),e),Math.round(ze(qt.r*255,0,255))*65536+Math.round(ze(qt.g*255,0,255))*256+Math.round(ze(qt.b*255,0,255))}getHexString(e=Xt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Ke.workingColorSpace){Ke.workingToColorSpace(qt.copy(this),t);let i=qt.r,s=qt.g,r=qt.b,a=Math.max(i,s,r),o=Math.min(i,s,r),l,c,h=(o+a)/2;if(o===a)l=0,c=0;else{let f=a-o;switch(c=h<=.5?f/(a+o):f/(2-a-o),a){case i:l=(s-r)/f+(s<r?6:0);break;case s:l=(r-i)/f+2;break;case r:l=(i-s)/f+4;break}l/=6}return e.h=l,e.s=c,e.l=h,e}getRGB(e,t=Ke.workingColorSpace){return Ke.workingToColorSpace(qt.copy(this),t),e.r=qt.r,e.g=qt.g,e.b=qt.b,e}getStyle(e=Xt){Ke.workingToColorSpace(qt.copy(this),e);let t=qt.r,i=qt.g,s=qt.b;return e!==Xt?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(e,t,i){return this.getHSL(ui),this.setHSL(ui.h+e,ui.s+t,ui.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(ui),e.getHSL(qr);let i=Js(ui.h,qr.h,t),s=Js(ui.s,qr.s,t),r=Js(ui.l,qr.l,t);return this.setHSL(i,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,i=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*i+r[6]*s,this.g=r[1]*t+r[4]*i+r[7]*s,this.b=r[2]*t+r[5]*i+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},qt=new qe;qe.NAMES=Xu;ir=class extends Pt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new ei,this.environmentIntensity=1,this.environmentRotation=new ei,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),this.background=e.background!==null?e.background.clone():null,this.environment=e.environment!==null?e.environment.clone():null,this.fog=e.fog!==null?e.fog.clone():null,this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),this.overrideMaterial=e.overrideMaterial!==null?e.overrideMaterial.clone():null,this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}},Tn=new N,Kn=new N,_c=new N,Yn=new N,ns=new N,is=new N,jh=new N,xc=new N,vc=new N,yc=new N,Sc=new Ze,Mc=new Ze,wc=new Ze,mi=class n{constructor(e=new N,t=new N,i=new N){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,s){s.subVectors(i,t),Tn.subVectors(e,t),s.cross(Tn);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,i,s,r){Tn.subVectors(s,t),Kn.subVectors(i,t),_c.subVectors(e,t);let a=Tn.dot(Tn),o=Tn.dot(Kn),l=Tn.dot(_c),c=Kn.dot(Kn),h=Kn.dot(_c),f=a*c-o*o;if(f===0)return r.set(0,0,0),null;let d=1/f,p=(c*l-o*h)*d,g=(a*h-o*l)*d;return r.set(1-p-g,g,p)}static containsPoint(e,t,i,s){return this.getBarycoord(e,t,i,s,Yn)===null?!1:Yn.x>=0&&Yn.y>=0&&Yn.x+Yn.y<=1}static getInterpolation(e,t,i,s,r,a,o,l){return this.getBarycoord(e,t,i,s,Yn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,Yn.x),l.addScaledVector(a,Yn.y),l.addScaledVector(o,Yn.z),l)}static getInterpolatedAttribute(e,t,i,s,r,a){return Sc.setScalar(0),Mc.setScalar(0),wc.setScalar(0),Sc.fromBufferAttribute(e,t),Mc.fromBufferAttribute(e,i),wc.fromBufferAttribute(e,s),a.setScalar(0),a.addScaledVector(Sc,r.x),a.addScaledVector(Mc,r.y),a.addScaledVector(wc,r.z),a}static isFrontFacing(e,t,i,s){return Tn.subVectors(i,t),Kn.subVectors(e,t),Tn.cross(Kn).dot(s)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,s){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,i,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Tn.subVectors(this.c,this.b),Kn.subVectors(this.a,this.b),Tn.cross(Kn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return n.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return n.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,s,r){return n.getInterpolation(e,this.a,this.b,this.c,t,i,s,r)}containsPoint(e){return n.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return n.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let i=this.a,s=this.b,r=this.c,a,o;ns.subVectors(s,i),is.subVectors(r,i),xc.subVectors(e,i);let l=ns.dot(xc),c=is.dot(xc);if(l<=0&&c<=0)return t.copy(i);vc.subVectors(e,s);let h=ns.dot(vc),f=is.dot(vc);if(h>=0&&f<=h)return t.copy(s);let d=l*f-h*c;if(d<=0&&l>=0&&h<=0&&l-h>0)return a=l/(l-h),t.copy(i).addScaledVector(ns,a);yc.subVectors(e,r);let p=ns.dot(yc),g=is.dot(yc);if(g>=0&&p<=g)return t.copy(r);let S=p*c-l*g;if(S<=0&&c>=0&&g<=0)return o=c/(c-g),t.copy(i).addScaledVector(is,o);let m=h*g-p*f;if(m<=0&&f-h>=0&&p-g>=0)return jh.subVectors(r,s),o=(f-h)/(f-h+(p-g)),t.copy(s).addScaledVector(jh,o);let u=1/(m+S+d);return a=S*u,o=d*u,t.copy(i).addScaledVector(ns,a).addScaledVector(is,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},rn=class{constructor(e=new N(1/0,1/0,1/0),t=new N(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(An.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(An.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let i=An.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let i=e.geometry;if(i!==void 0){let r=i.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0&&e.isBatchedMesh!==!0)for(let a=0,o=r.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,An):An.fromBufferAttribute(r,a),An.applyMatrix4(e.matrixWorld),this.expandByPoint(An);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Xr.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Xr.copy(i.boundingBox)),Xr.applyMatrix4(e.matrixWorld),this.union(Xr)}let s=e.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,An),An.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(qs),jr.subVectors(this.max,qs),ss.subVectors(e.a,qs),rs.subVectors(e.b,qs),as.subVectors(e.c,qs),di.subVectors(rs,ss),fi.subVectors(as,rs),Ni.subVectors(ss,as);let t=[0,-di.z,di.y,0,-fi.z,fi.y,0,-Ni.z,Ni.y,di.z,0,-di.x,fi.z,0,-fi.x,Ni.z,0,-Ni.x,-di.y,di.x,0,-fi.y,fi.x,0,-Ni.y,Ni.x,0];return!Ec(t,ss,rs,as,jr)||(t=[1,0,0,0,1,0,0,0,1],!Ec(t,ss,rs,as,jr))?!1:(Kr.crossVectors(di,fi),t=[Kr.x,Kr.y,Kr.z],Ec(t,ss,rs,as,jr))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,An).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(An).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Jn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Jn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Jn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Jn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Jn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Jn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Jn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Jn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Jn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},Jn=[new N,new N,new N,new N,new N,new N,new N,new N],An=new N,Xr=new rn,ss=new N,rs=new N,as=new N,di=new N,fi=new N,Ni=new N,qs=new N,jr=new N,Kr=new N,Ui=new N;vt=new N,Yr=new De,wp=0,gt=class extends Rn{constructor(e,t,i=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:wp++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=pl,this.updateRanges=[],this.gpuType=In,this.version=0,this._normalizationScale=e!==void 0?Co(e):void 0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this._normalizationScale=e._normalizationScale,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[i+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)Yr.fromBufferAttribute(this,t),Yr.applyMatrix3(e),this.setXY(t,Yr.x,Yr.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)vt.fromBufferAttribute(this,t),vt.applyMatrix3(e),this.setXYZ(t,vt.x,vt.y,vt.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)vt.fromBufferAttribute(this,t),vt.applyMatrix4(e),this.setXYZ(t,vt.x,vt.y,vt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)vt.fromBufferAttribute(this,t),vt.applyNormalMatrix(e),this.setXYZ(t,vt.x,vt.y,vt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)vt.fromBufferAttribute(this,t),vt.transformDirection(e),this.setXYZ(t,vt.x,vt.y,vt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=this._denormalize(i)),i}setComponent(e,t,i){return this.normalized&&(i=this._normalize(i)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=this._denormalize(t)),t}setX(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=this._denormalize(t)),t}setY(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=this._denormalize(t)),t}setZ(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=this._denormalize(t)),t}setW(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=this._normalize(t),i=this._normalize(i)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,s){return e*=this.itemSize,this.normalized&&(t=this._normalize(t),i=this._normalize(i),s=this._normalize(s)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=s,this}setXYZW(e,t,i,s,r){return e*=this.itemSize,this.normalized&&(t=this._normalize(t),i=this._normalize(i),s=this._normalize(s),r=this._normalize(r)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:"dispose"})}_denormalize(e){let t=this._normalizationScale;return t!==void 0?Math.max(e/t,-1):_l(e,this.array)}_normalize(e){let t=this._normalizationScale;return t!==void 0?Math.round(e*t):xl(e,this.array)}},sr=class extends gt{constructor(e,t,i){super(new Uint16Array(e),t,i)}},rr=class extends gt{constructor(e,t,i){super(new Uint32Array(e),t,i)}},yt=class extends gt{constructor(e,t,i){super(new Float32Array(e),t,i)}},Ep=new rn,Xs=new N,Tc=new N,Bn=class{constructor(e=new N,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let i=this.center;t!==void 0?i.copy(t):Ep.setFromPoints(e).getCenter(i);let s=0;for(let r=0,a=e.length;r<a;r++)s=Math.max(s,i.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Xs.subVectors(e,this.center);let t=Xs.lengthSq();if(t>this.radius*this.radius){let i=Math.sqrt(t),s=(i-this.radius)*.5;this.center.addScaledVector(Xs,s/i),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Tc.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Xs.copy(e.center).add(Tc)),this.expandByPoint(Xs.copy(e.center).sub(Tc))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},Tp=0,vn=new it,Ac=new Pt,os=new N,fn=new rn,js=new rn,Ct=new N,an=class n extends Rn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Tp++}),this.uuid=Ai(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Zf(e)?rr:sr)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let i=this.attributes.normal;if(i!==void 0){let r=new Be().getNormalMatrix(e);i.applyNormalMatrix(r),i.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return vn.makeRotationFromQuaternion(e),this.applyMatrix4(vn),this}rotateX(e){return vn.makeRotationX(e),this.applyMatrix4(vn),this}rotateY(e){return vn.makeRotationY(e),this.applyMatrix4(vn),this}rotateZ(e){return vn.makeRotationZ(e),this.applyMatrix4(vn),this}translate(e,t,i){return vn.makeTranslation(e,t,i),this.applyMatrix4(vn),this}scale(e,t,i){return vn.makeScale(e,t,i),this.applyMatrix4(vn),this}lookAt(e){return Ac.lookAt(e),Ac.updateMatrix(),this.applyMatrix4(Ac.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(os).negate(),this.translate(os.x,os.y,os.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let i=[];for(let s=0,r=e.length;s<r;s++){let a=e[s];i.push(a.x,a.y,a.z||0)}this.setAttribute("position",new yt(i,3))}else{let i=Math.min(e.length,t.count);for(let s=0;s<i;s++){let r=e[s];t.setXYZ(s,r.x,r.y,r.z||0)}e.length>t.count&&Ne("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new rn);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Ue("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new N(-1/0,-1/0,-1/0),new N(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,s=t.length;i<s;i++){let r=t[i];fn.setFromBufferAttribute(r),this.morphTargetsRelative?(Ct.addVectors(this.boundingBox.min,fn.min),this.boundingBox.expandByPoint(Ct),Ct.addVectors(this.boundingBox.max,fn.max),this.boundingBox.expandByPoint(Ct)):(this.boundingBox.expandByPoint(fn.min),this.boundingBox.expandByPoint(fn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Ue('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Bn);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Ue("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new N,1/0);return}if(e){let i=this.boundingSphere.center;if(fn.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){let o=t[r];js.setFromBufferAttribute(o),this.morphTargetsRelative?(Ct.addVectors(fn.min,js.min),fn.expandByPoint(Ct),Ct.addVectors(fn.max,js.max),fn.expandByPoint(Ct)):(fn.expandByPoint(js.min),fn.expandByPoint(js.max))}fn.getCenter(i);let s=0;for(let r=0,a=e.count;r<a;r++)Ct.fromBufferAttribute(e,r),s=Math.max(s,i.distanceToSquared(Ct));if(t)for(let r=0,a=t.length;r<a;r++){let o=t[r],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)Ct.fromBufferAttribute(o,c),l&&(os.fromBufferAttribute(e,c),Ct.add(os)),s=Math.max(s,i.distanceToSquared(Ct))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&Ue('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){Ue("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let i=t.position,s=t.normal,r=t.uv,a=this.getAttribute("tangent");(a===void 0||a.count!==i.count)&&(a=new gt(new Float32Array(4*i.count),4),this.setAttribute("tangent",a));let o=[],l=[],c=new Uint8Array(i.count);for(let F=0;F<i.count;F++)o[F]=new N,l[F]=new N;let h=new N,f=new N,d=new N,p=new De,g=new De,S=new De,m=new N,u=new N;function v(F,P,I){c[F]=c[P]=c[I]=1,h.fromBufferAttribute(i,F),f.fromBufferAttribute(i,P),d.fromBufferAttribute(i,I),p.fromBufferAttribute(r,F),g.fromBufferAttribute(r,P),S.fromBufferAttribute(r,I),f.sub(h),d.sub(h),g.sub(p),S.sub(p);let k=1/(g.x*S.y-S.x*g.y);isFinite(k)&&(m.copy(f).multiplyScalar(S.y).addScaledVector(d,-g.y).multiplyScalar(k),u.copy(d).multiplyScalar(g.x).addScaledVector(f,-S.x).multiplyScalar(k),o[F].add(m),o[P].add(m),o[I].add(m),l[F].add(u),l[P].add(u),l[I].add(u))}let E=this.groups;E.length===0&&(E=[{start:0,count:e.count}]);for(let F=0,P=E.length;F<P;++F){let I=E[F],k=I.start,W=I.count;for(let R=k,H=k+W;R<H;R+=3)v(e.getX(R+0),e.getX(R+1),e.getX(R+2))}let y=new N,A=new N,T=new N,b=new N;function w(F){T.fromBufferAttribute(s,F),b.copy(T);let P=o[F];y.copy(P),y.sub(T.multiplyScalar(T.dot(P))).normalize(),A.crossVectors(b,P);let k=A.dot(l[F])<0?-1:1;a.setXYZW(F,y.x,y.y,y.z,k)}for(let F=0,P=i.count;F<P;++F)c[F]&&w(F);this._transformed=!0}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0||i.count!==t.count)i=new gt(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let d=0,p=i.count;d<p;d++)i.setXYZ(d,0,0,0);let s=new N,r=new N,a=new N,o=new N,l=new N,c=new N,h=new N,f=new N;if(e)for(let d=0,p=e.count;d<p;d+=3){let g=e.getX(d+0),S=e.getX(d+1),m=e.getX(d+2);s.fromBufferAttribute(t,g),r.fromBufferAttribute(t,S),a.fromBufferAttribute(t,m),h.subVectors(a,r),f.subVectors(s,r),h.cross(f),o.fromBufferAttribute(i,g),l.fromBufferAttribute(i,S),c.fromBufferAttribute(i,m),o.add(h),l.add(h),c.add(h),i.setXYZ(g,o.x,o.y,o.z),i.setXYZ(S,l.x,l.y,l.z),i.setXYZ(m,c.x,c.y,c.z)}else for(let d=0,p=t.count;d<p;d+=3)s.fromBufferAttribute(t,d+0),r.fromBufferAttribute(t,d+1),a.fromBufferAttribute(t,d+2),h.subVectors(a,r),f.subVectors(s,r),h.cross(f),i.setXYZ(d+0,h.x,h.y,h.z),i.setXYZ(d+1,h.x,h.y,h.z),i.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)Ct.fromBufferAttribute(e,t),Ct.normalize(),e.setXYZ(t,Ct.x,Ct.y,Ct.z)}toNonIndexed(){function e(o,l){let c=o.array,h=o.itemSize,f=o.normalized,d=new c.constructor(l.length*h),p=0,g=0;for(let S=0,m=l.length;S<m;S++){o.isInterleavedBufferAttribute?p=l[S]*o.data.stride+o.offset:p=l[S]*h;for(let u=0;u<h;u++)d[g++]=c[p++]}return new gt(d,h,f)}if(this.index===null)return Ne("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new n,i=this.index.array,s=this.attributes;for(let o in s){let l=s[o],c=e(l,i);t.setAttribute(o,c)}let r=this.morphAttributes;for(let o in r){let l=[],c=r[o];for(let h=0,f=c.length;h<f;h++){let d=c[h],p=e(d,i);l.push(p)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,l=a.length;o<l;o++){let c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){let e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let i=this.attributes;for(let l in i){let c=i[l];e.data.attributes[l]=c.toJSON(e.data)}let s={},r=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],h=[];for(let f=0,d=c.length;f<d;f++){let p=c[f];h.push(p.toJSON(e.data))}h.length>0&&(s[l]=h,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let i=e.index;i!==null&&this.setIndex(i.clone());let s=e.attributes;for(let c in s){let h=s[c];this.setAttribute(c,h.clone(t))}let r=e.morphAttributes;for(let c in r){let h=[],f=r[c];for(let d=0,p=f.length;d<p;d++)h.push(f[d].clone(t));this.morphAttributes[c]=h}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let c=0,h=a.length;c<h;c++){let f=a[c];this.addGroup(f.start,f.count,f.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}},wa=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=pl,this.updateRanges=[],this.version=0,this.uuid=Ai()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,i){e*=this.stride,i*=t.stride;for(let s=0,r=this.stride;s<r;s++)this.array[e+s]=t.array[i+s];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={});let t=Kh(this.array);e.arrayBuffers[t]===void 0&&(e.arrayBuffers[t]=this.array.slice(0).buffer);let i=new this.array.constructor(e.arrayBuffers[t]),s=new this.constructor(i,this.stride);return s.setUsage(this.usage),s}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){e.arrayBuffers===void 0&&(e.arrayBuffers={});let t=Kh(this.array);e.arrayBuffers[t]===void 0&&(e.arrayBuffers[t]=Array.from(new Uint32Array(this.array.slice(0).buffer)));let i={uuid:this.uuid,buffer:t,type:this.array.constructor.name,stride:this.stride};return i.usage=this.usage,i}};en=new N,Pn=class n{constructor(e,t,i,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=i,this.normalized=s,this._normalizationScale=e!==void 0?Co(e.array):void 0}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,i=this.data.count;t<i;t++)en.fromBufferAttribute(this,t),en.applyMatrix4(e),this.setXYZ(t,en.x,en.y,en.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)en.fromBufferAttribute(this,t),en.applyNormalMatrix(e),this.setXYZ(t,en.x,en.y,en.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)en.fromBufferAttribute(this,t),en.transformDirection(e),this.setXYZ(t,en.x,en.y,en.z);return this}getComponent(e,t){let i=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(i=this._denormalize(i)),i}setComponent(e,t,i){return this.normalized&&(i=this._normalize(i)),this.data.array[e*this.data.stride+this.offset+t]=i,this}setX(e,t){return this.normalized&&(t=this._normalize(t)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=this._normalize(t)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=this._normalize(t)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=this._normalize(t)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=this._denormalize(t)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=this._denormalize(t)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=this._denormalize(t)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=this._denormalize(t)),t}setXY(e,t,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=this._normalize(t),i=this._normalize(i)),this.data.array[e+0]=t,this.data.array[e+1]=i,this}setXYZ(e,t,i,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=this._normalize(t),i=this._normalize(i),s=this._normalize(s)),this.data.array[e+0]=t,this.data.array[e+1]=i,this.data.array[e+2]=s,this}setXYZW(e,t,i,s,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=this._normalize(t),i=this._normalize(i),s=this._normalize(s),r=this._normalize(r)),this.data.array[e+0]=t,this.data.array[e+1]=i,this.data.array[e+2]=s,this.data.array[e+3]=r,this}clone(e){if(e===void 0){tr("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let i=0;i<this.count;i++){let s=i*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return new gt(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new n(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){tr("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let i=0;i<this.count;i++){let s=i*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}_denormalize(e){let t=this._normalizationScale;return t!==void 0?Math.max(e/t,-1):_l(e,this.data.array)}_normalize(e){let t=this._normalizationScale;return t!==void 0?Math.round(e*t):xl(e,this.data.array)}},Cc=new N,Ap=new N,Cp=new Be,tn=class{constructor(e=new N(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,s){return this.normal.set(e,t,i),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){let s=Cc.subVectors(i,t).cross(Ap.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,i=!0){let s=e.delta(Cc),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let a=-(e.start.dot(this.normal)+this.constant)/r;return i===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(s,a)}intersectsLine(e){let t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let i=t||Cp.getNormalMatrix(e),s=this.coplanarPoint(Cc).applyMatrix4(e),r=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}},Rp=0,gi=class extends Rn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Rp++}),this.uuid=Ai(),this.name="",this.type="Material",this.blending=As,this.side=Ei,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Xc,this.blendDst=jc,this.blendEquation=Wi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new qe(0,0,0),this.blendAlpha=0,this.depthFunc=ps,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Fu,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ua,this.stencilZFail=ua,this.stencilZPass=ua,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let i=e[t];if(i===void 0){Ne(`Material: parameter '${t}' has value of undefined.`);continue}let s=this[t];if(s===void 0){Ne(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector2&&i&&i.isVector2||s&&s.isEuler&&i&&i.isEuler||s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[t]=i}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,i.blending=this.blending,i.side=this.side,i.shadowSide=this.shadowSide,i.vertexColors=this.vertexColors,i.opacity=this.opacity,i.transparent=this.transparent,i.blendSrc=this.blendSrc,i.blendDst=this.blendDst,i.blendEquation=this.blendEquation,i.blendSrcAlpha=this.blendSrcAlpha,i.blendDstAlpha=this.blendDstAlpha,i.blendEquationAlpha=this.blendEquationAlpha,i.blendColor=this.blendColor.getHex(),i.blendAlpha=this.blendAlpha,i.depthFunc=this.depthFunc,i.depthTest=this.depthTest,i.depthWrite=this.depthWrite,i.colorWrite=this.colorWrite,i.clipIntersection=this.clipIntersection,i.clipShadows=this.clipShadows,i.stencilWriteMask=this.stencilWriteMask,i.stencilFunc=this.stencilFunc,i.stencilRef=this.stencilRef,i.stencilFuncMask=this.stencilFuncMask,i.stencilFail=this.stencilFail,i.stencilZFail=this.stencilZFail,i.stencilZPass=this.stencilZPass,i.stencilWrite=this.stencilWrite,i.polygonOffset=this.polygonOffset,i.polygonOffsetFactor=this.polygonOffsetFactor,i.polygonOffsetUnits=this.polygonOffsetUnits,i.dithering=this.dithering,i.alphaTest=this.alphaTest,i.alphaHash=this.alphaHash,i.alphaToCoverage=this.alphaToCoverage,i.premultipliedAlpha=this.premultipliedAlpha,i.forceSinglePass=this.forceSinglePass,i.allowOverride=this.allowOverride,i.visible=this.visible,i.toneMapped=this.toneMapped,i.name=this.name,this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.diffuseRoughness!==void 0&&(i.diffuseRoughness=this.diffuseRoughness),this.diffuseRoughnessMap&&this.diffuseRoughnessMap.isTexture&&(i.diffuseRoughnessMap=this.diffuseRoughnessMap.toJSON(e).uuid),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(i.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessMinimum!==void 0&&(i.iridescenceThicknessMinimum=this.iridescenceThicknessMinimum),this.iridescenceThicknessMaximum!==void 0&&(i.iridescenceThicknessMaximum=this.iridescenceThicknessMaximum),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(i.clippingPlanes=this.clippingPlanes.map(r=>r.toJSON())),this.rotation!==void 0&&(i.rotation=this.rotation),this.depthPacking!==void 0&&(i.depthPacking=this.depthPacking),this.linewidth!==void 0&&(i.linewidth=this.linewidth),this.linecap!==void 0&&(i.linecap=this.linecap),this.linejoin!==void 0&&(i.linejoin=this.linejoin),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.wireframe!==void 0&&(i.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(i.flatShading=this.flatShading),this.fog!==void 0&&(i.fog=this.fog),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(r){let a=[];for(let o in r){let l=r[o];delete l.metadata,a.push(l)}return a}if(t){let r=s(e.textures),a=s(e.images);r.length>0&&(i.textures=r),a.length>0&&(i.images=a)}return i}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new qe().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.diffuseRoughness!==void 0&&(this.diffuseRoughness=e.diffuseRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessMinimum!==void 0&&(this.iridescenceThicknessMinimum=e.iridescenceThicknessMinimum),e.iridescenceThicknessMaximum!==void 0&&(this.iridescenceThicknessMaximum=e.iridescenceThicknessMaximum),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessMinimum=e.iridescenceThicknessRange[0],this.iridescenceThicknessMaximum=e.iridescenceThicknessRange[1]),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(i=>new tn().fromJSON(i))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let i=e.normalScale;Array.isArray(i)===!1&&(i=[i,i]),this.normalScale=new De().fromArray(i)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new De().fromArray(e.clearcoatNormalScale)),e.diffuseRoughnessMap!==void 0&&(this.diffuseRoughnessMap=t[e.diffuseRoughnessMap]||null),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,i=null;if(t!==null){let s=t.length;i=new Array(s);for(let r=0;r!==s;++r)i[r]=t[r].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}},Zn=new N,Rc=new N,Jr=new N,Zr=new N,ki=class{constructor(e=new N,t=new N(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Zn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=Zn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Zn.copy(this.origin).addScaledVector(this.direction,t),Zn.distanceToSquared(e))}distanceSqToSegment(e,t,i,s){Rc.copy(e).add(t).multiplyScalar(.5),Jr.copy(t).sub(e).normalize(),Zr.copy(this.origin).sub(Rc);let r=e.distanceTo(t)*.5,a=-this.direction.dot(Jr),o=Zr.dot(this.direction),l=-Zr.dot(Jr),c=Zr.lengthSq(),h=Math.abs(1-a*a),f,d,p,g;if(h>0)if(f=a*l-o,d=a*o-l,g=r*h,f>=0)if(d>=-g)if(d<=g){let S=1/h;f*=S,d*=S,p=f*(f+a*d+2*o)+d*(a*f+d+2*l)+c}else d=r,f=Math.max(0,-(a*d+o)),p=-f*f+d*(d+2*l)+c;else d=-r,f=Math.max(0,-(a*d+o)),p=-f*f+d*(d+2*l)+c;else d<=-g?(f=Math.max(0,-(-a*r+o)),d=f>0?-r:Math.min(Math.max(-r,-l),r),p=-f*f+d*(d+2*l)+c):d<=g?(f=0,d=Math.min(Math.max(-r,-l),r),p=d*(d+2*l)+c):(f=Math.max(0,-(a*r+o)),d=f>0?r:Math.min(Math.max(-r,-l),r),p=-f*f+d*(d+2*l)+c);else d=a>0?-r:r,f=Math.max(0,-(a*d+o)),p=-f*f+d*(d+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,f),s&&s.copy(Rc).addScaledVector(Jr,d),p}intersectSphere(e,t){if(e.radius<0)return null;Zn.subVectors(e.center,this.origin);let i=Zn.dot(this.direction),s=Zn.dot(Zn)-i*i,r=e.radius*e.radius;if(s>r)return null;let a=Math.sqrt(r-s),o=i-a,l=i+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){let i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,s,r,a,o,l,c=1/this.direction.x,h=1/this.direction.y,f=1/this.direction.z,d=this.origin;return c>=0?(i=(e.min.x-d.x)*c,s=(e.max.x-d.x)*c):(i=(e.max.x-d.x)*c,s=(e.min.x-d.x)*c),h>=0?(r=(e.min.y-d.y)*h,a=(e.max.y-d.y)*h):(r=(e.max.y-d.y)*h,a=(e.min.y-d.y)*h),i>a||r>s||((r>i||isNaN(i))&&(i=r),(a<s||isNaN(s))&&(s=a),f>=0?(o=(e.min.z-d.z)*f,l=(e.max.z-d.z)*f):(o=(e.max.z-d.z)*f,l=(e.min.z-d.z)*f),i>l||o>s)||((o>i||i!==i)&&(i=o),(l<s||s!==s)&&(s=l),s<0)?null:this.at(i>=0?i:s,t)}intersectsBox(e){return this.intersectBox(e,Zn)!==null}intersectTriangle(e,t,i,s,r){let a=this.origin,o=this.direction,l=o.x,c=o.y,h=o.z,f=e.x-a.x,d=e.y-a.y,p=e.z-a.z,g=t.x-a.x,S=t.y-a.y,m=t.z-a.z,u=i.x-a.x,v=i.y-a.y,E=i.z-a.z,y=Math.abs(l),A=Math.abs(c),T=Math.abs(h),b,w,F,P,I,k,W,R,H,j,z,ie;if(y>=A&&y>=T?(F=l,k=f,H=g,ie=u,l>=0?(b=c,w=h,P=d,I=p,W=S,R=m,j=v,z=E):(b=h,w=c,P=p,I=d,W=m,R=S,j=E,z=v)):A>=T?(F=c,k=d,H=S,ie=v,c>=0?(b=h,w=l,P=p,I=f,W=m,R=g,j=E,z=u):(b=l,w=h,P=f,I=p,W=g,R=m,j=u,z=E)):(F=h,k=p,H=m,ie=E,h>=0?(b=l,w=c,P=f,I=d,W=g,R=S,j=u,z=v):(b=c,w=l,P=d,I=f,W=S,R=g,j=v,z=u)),F===0)return null;let q=b/F,ee=w/F,ne=1/F,Te=P-q*k,Fe=I-ee*k,Y=W-q*H,be=R-ee*H,_e=j-q*ie,Re=z-ee*ie,ge=_e*be-Re*Y,Oe=Te*Re-Fe*_e,dt=Y*Fe-be*Te;if(s){if(ge<0||Oe<0||dt<0)return null}else if((ge<0||Oe<0||dt<0)&&(ge>0||Oe>0||dt>0))return null;let Ie=ge+Oe+dt;if(Ie===0)return null;let Je=ne*(ge*k+Oe*H+dt*ie);return(Ie>0?Je<0:Je>0)?null:this.at(Je/Ie,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},zi=class extends gi{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new qe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ei,this.combine=Kc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},Yh=new it,Fi=new ki,$r=new Bn,Jh=new N,Qr=new N,ea=new N,ta=new N,Pc=new N,na=new N,Zh=new N,ia=new N,St=class extends Pt{constructor(e=new an,t=new zi){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0?this.morphTargetInfluences=e.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,e.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){let s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){let i=this.geometry,s=i.attributes.position,r=i.morphAttributes.position,a=i.morphTargetsRelative;t.fromBufferAttribute(s,e);let o=this.morphTargetInfluences;if(r&&o){na.set(0,0,0);for(let l=0,c=r.length;l<c;l++){let h=o[l],f=r[l];h!==0&&(Pc.fromBufferAttribute(f,e),a?na.addScaledVector(Pc,h):na.addScaledVector(Pc.sub(t),h))}t.add(na)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let i=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),$r.copy(i.boundingSphere),$r.applyMatrix4(r),Fi.copy(e.ray).recast(e.near),!($r.containsPoint(Fi.origin)===!1&&(Fi.intersectSphere($r,Jh)===null||Fi.origin.distanceToSquared(Jh)>(e.far-e.near)**2))&&(Yh.copy(r).invert(),Fi.copy(e.ray).applyMatrix4(Yh),!(i.boundingBox!==null&&Fi.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,Fi)))}_computeIntersections(e,t,i){let s,r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,f=r.attributes.normal,d=r.groups,p=r.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,S=d.length;g<S;g++){let m=d[g],u=a[m.materialIndex],v=Math.max(m.start,p.start),E=Math.min(o.count,Math.min(m.start+m.count,p.start+p.count));for(let y=v,A=E;y<A;y+=3){let T=o.getX(y),b=o.getX(y+1),w=o.getX(y+2);s=sa(this,u,e,i,c,h,f,T,b,w),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{let g=Math.max(0,p.start),S=Math.min(o.count,p.start+p.count);for(let m=g,u=S;m<u;m+=3){let v=o.getX(m),E=o.getX(m+1),y=o.getX(m+2);s=sa(this,a,e,i,c,h,f,v,E,y),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}else if(l!==void 0)if(Array.isArray(a))for(let g=0,S=d.length;g<S;g++){let m=d[g],u=a[m.materialIndex],v=Math.max(m.start,p.start),E=Math.min(l.count,Math.min(m.start+m.count,p.start+p.count));for(let y=v,A=E;y<A;y+=3){let T=y,b=y+1,w=y+2;s=sa(this,u,e,i,c,h,f,T,b,w),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{let g=Math.max(0,p.start),S=Math.min(l.count,p.start+p.count);for(let m=g,u=S;m<u;m+=3){let v=m,E=m+1,y=m+2;s=sa(this,a,e,i,c,h,f,v,E,y),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}}};Ea=class extends sn{constructor(e=null,t=1,i=1,s,r,a,o,l,c=Rt,h=Rt,f,d){super(null,a,o,l,c,h,s,r,f,d),this.isDataTexture=!0,this.image={data:e,width:t,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},Oi=new Bn,Lp=new De(.5,.5),ra=new N,bi=class{constructor(e=new tn,t=new tn,i=new tn,s=new tn,r=new tn,a=new tn){this.planes=[e,t,i,s,r,a]}set(e,t,i,s,r,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(i),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(e){let t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=yn,i=!1){let s=this.planes,r=e.elements,a=r[0],o=r[1],l=r[2],c=r[3],h=r[4],f=r[5],d=r[6],p=r[7],g=r[8],S=r[9],m=r[10],u=r[11],v=r[12],E=r[13],y=r[14],A=r[15];if(s[0].setComponents(c-a,p-h,u-g,A-v).normalize(),s[1].setComponents(c+a,p+h,u+g,A+v).normalize(),s[2].setComponents(c+o,p+f,u+S,A+E).normalize(),s[3].setComponents(c-o,p-f,u-S,A-E).normalize(),i)s[4].setComponents(l,d,m,y).normalize(),s[5].setComponents(c-l,p-d,u-m,A-y).normalize();else if(s[4].setComponents(c-l,p-d,u-m,A-y).normalize(),t===yn)s[5].setComponents(c+l,p+d,u+m,A+y).normalize();else if(t===gs)s[5].setComponents(l,d,m,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Oi.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Oi.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Oi)}intersectsSprite(e){Oi.center.set(0,0,0);let t=Lp.distanceTo(e.center);return Oi.radius=.7071067811865476+t,Oi.applyMatrix4(e.matrixWorld),this.intersectsSphere(Oi)}intersectsSphere(e){let t=this.planes,i=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(i)<s)return!1;return!0}intersectsBox(e){let t=this.planes;for(let i=0;i<6;i++){let s=t[i];if(ra.x=s.normal.x>0?e.max.x:e.min.x,ra.y=s.normal.y>0?e.max.y:e.min.y,ra.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(ra)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}},$h=new it,Ta=class n{constructor(){this.coordinateSystem=yn,this._frustums=[],this._count=0}setFromArrayCamera(e){let t=e.cameras,i=this._frustums;for(let s=0;s<t.length;s++){let r=t[s];$h.multiplyMatrices(r.projectionMatrix,r.matrixWorldInverse),i[s]===void 0&&(i[s]=new bi),i[s].setFromProjectionMatrix($h,r.coordinateSystem,r.reversedDepth)}return this._count=t.length,this}getFrustum(e){return this._frustums[e]}intersectsObject(e){let t=this._frustums;for(let i=0;i<this._count;i++)if(t[i].intersectsObject(e))return!0;return!1}intersectsSprite(e){let t=this._frustums;for(let i=0;i<this._count;i++)if(t[i].intersectsSprite(e))return!0;return!1}intersectsSphere(e){let t=this._frustums;for(let i=0;i<this._count;i++)if(t[i].intersectsSphere(e))return!0;return!1}intersectsBox(e){let t=this._frustums;for(let i=0;i<this._count;i++)if(t[i].intersectsBox(e))return!0;return!1}containsPoint(e){let t=this._frustums;for(let i=0;i<this._count;i++)if(t[i].containsPoint(e))return!0;return!1}copy(e){this.coordinateSystem=e.coordinateSystem;let t=this._frustums,i=e._frustums;for(let s=0;s<e._count;s++)t[s]===void 0&&(t[s]=new bi),t[s].copy(i[s]);return this._count=e._count,this}clone(){return new n().copy(this)}},ar=class extends sn{constructor(e=[],t=qi,i,s,r,a,o,l,c,h){super(e,t,i,s,r,a,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},or=class extends sn{constructor(e,t,i,s,r,a,o,l,c){super(e,t,i,s,r,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}},ti=class extends sn{constructor(e,t,i=Ln,s,r,a,o=Rt,l=Rt,c,h=Qn,f=1){if(h!==Qn&&h!==ii)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let d={width:e,height:t,depth:f};super(d,s,r,a,o,l,h,i,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new _s(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}},cr=class extends ti{constructor(e,t=Ln,i=qi,s,r,a=Rt,o=Rt,l,c=Qn){let h={width:e,height:e,depth:1},f=[h,h,h,h,h,h];super(e,e,t,i,s,r,a,o,l,c),this.image=f,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}},lr=class extends sn{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},ys=class n extends an{constructor(e=1,t=1,i=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:s,heightSegments:r,depthSegments:a};let o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);let l=[],c=[],h=[],f=[],d=0,p=0;g("z","y","x",-1,-1,i,t,e,a,r,0),g("z","y","x",1,-1,i,t,-e,a,r,1),g("x","z","y",1,1,e,i,t,s,a,2),g("x","z","y",1,-1,e,i,-t,s,a,3),g("x","y","z",1,-1,e,t,i,s,r,4),g("x","y","z",-1,-1,e,t,-i,s,r,5),this.setIndex(l),this.setAttribute("position",new yt(c,3)),this.setAttribute("normal",new yt(h,3)),this.setAttribute("uv",new yt(f,2));function g(S,m,u,v,E,y,A,T,b,w,F){let P=y/b,I=A/w,k=y/2,W=A/2,R=T/2,H=b+1,j=w+1,z=0,ie=0,q=new N;for(let ee=0;ee<j;ee++){let ne=ee*I-W;for(let Te=0;Te<H;Te++){let Fe=Te*P-k;q[S]=Fe*v,q[m]=ne*E,q[u]=R,c.push(q.x,q.y,q.z),q[S]=0,q[m]=0,q[u]=T>0?1:-1,h.push(q.x,q.y,q.z),f.push(Te/b),f.push(1-ee/w),z+=1}}for(let ee=0;ee<w;ee++)for(let ne=0;ne<b;ne++){let Te=d+ne+H*ee,Fe=d+ne+H*(ee+1),Y=d+(ne+1)+H*(ee+1),be=d+(ne+1)+H*ee;l.push(Te,Fe,be),l.push(Fe,Y,be),ie+=6}o.addGroup(p,ie,F),p+=ie,d+=z}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}},hr=class n extends an{constructor(e=1,t=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:s};let r=e/2,a=t/2,o=Math.floor(i),l=Math.floor(s),c=o+1,h=l+1,f=e/o,d=t/l,p=[],g=[],S=[],m=[];for(let u=0;u<h;u++){let v=u*d-a;for(let E=0;E<c;E++){let y=E*f-r;g.push(y,-v,0),S.push(0,0,1),m.push(E/o),m.push(1-u/l)}}for(let u=0;u<l;u++)for(let v=0;v<o;v++){let E=v+c*u,y=v+c*(u+1),A=v+1+c*(u+1),T=v+1+c*u;p.push(E,y,T),p.push(y,A,T)}this.setIndex(p),this.setAttribute("position",new yt(g,3)),this.setAttribute("normal",new yt(S,3)),this.setAttribute("uv",new yt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.width,e.height,e.widthSegments,e.heightSegments)}},ur=class extends an{constructor(e=null){if(super(),this.type="WireframeGeometry",this.parameters={geometry:e},e!==null){let t=[],i=new Set,s=new N,r=new N;if(e.index!==null){let a=e.attributes.position,o=e.index,l=e.groups;l.length===0&&(l=[{start:0,count:o.count,materialIndex:0}]);for(let c=0,h=l.length;c<h;++c){let f=l[c],d=f.start,p=f.count;for(let g=d,S=d+p;g<S;g+=3)for(let m=0;m<3;m++){let u=o.getX(g+m),v=o.getX(g+(m+1)%3);s.fromBufferAttribute(a,u),r.fromBufferAttribute(a,v),Qh(s,r,i)===!0&&(t.push(s.x,s.y,s.z),t.push(r.x,r.y,r.z))}}}else{let a=e.attributes.position;for(let o=0,l=a.count/3;o<l;o++)for(let c=0;c<3;c++){let h=3*o+c,f=3*o+(c+1)%3;s.fromBufferAttribute(a,h),r.fromBufferAttribute(a,f),Qh(s,r,i)===!0&&(t.push(s.x,s.y,s.z),t.push(r.x,r.y,r.z))}}this.setAttribute("position",new yt(t,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}};Rr={clone:ji,merge:Yt},Dp=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Np=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Sn=class extends gi{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Dp,this.fragmentShader=Np,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=ji(e.uniforms),this.uniformsGroups=Ip(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let s in this.uniforms){let a=this.uniforms[s].value;a&&a.isTexture?t.uniforms[s]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[s]={type:"m4",value:a.toArray()}:t.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let i={};for(let s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(let i in e.uniforms){let s=e.uniforms[i];switch(this.uniforms[i]={},s.type){case"t":this.uniforms[i].value=t[s.value]||null;break;case"c":this.uniforms[i].value=new qe().setHex(s.value);break;case"v2":this.uniforms[i].value=new De().fromArray(s.value);break;case"v3":this.uniforms[i].value=new N().fromArray(s.value);break;case"v4":this.uniforms[i].value=new Ze().fromArray(s.value);break;case"m3":this.uniforms[i].value=new Be().fromArray(s.value);break;case"m4":this.uniforms[i].value=new it().fromArray(s.value);break;default:this.uniforms[i].value=s.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(let i in e.extensions)this.extensions[i]=e.extensions[i];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}},Aa=class extends Sn{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}},Gi=class extends gi{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new qe(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new qe(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Ao,this.normalScale=new De(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ei,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},Ca=class extends gi{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Nu,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},Ra=class extends gi{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};_i=class{constructor(e,t,i,s){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new t.constructor(i),this.sampleValues=t,this.valueSize=i,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,i=this._cachedIndex,s=t[i],r=t[i-1];n:{e:{let a;t:{i:if(!(e<s)){for(let o=i+2;;){if(s===void 0){if(e<r)break i;return i=t.length,this._cachedIndex=i,this.copySampleValue_(i-1)}if(i===o)break;if(r=s,s=t[++i],e<s)break e}a=t.length;break t}if(!(e>=r)){let o=t[1];e<o&&(i=2,r=o);for(let l=i-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===l)break;if(s=r,r=t[--i-1],e>=r)break e}a=i,i=0;break t}break n}for(;i<a;){let o=i+a>>>1;e<t[o]?a=o:i=o+1}if(s=t[i],r=t[i-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return i=t.length,this._cachedIndex=i,this.copySampleValue_(i-1)}this._cachedIndex=i,this.intervalChanged_(i,r,s)}return this.interpolate_(i,r,e,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,i=this.sampleValues,s=this.valueSize,r=e*s;for(let a=0;a!==s;++a)t[a]=i[r+a];return t}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},Pa=class extends _i{constructor(e,t,i,s){super(e,t,i,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Nc,endingEnd:Nc}}intervalChanged_(e,t,i){let s=this.parameterPositions,r=e-2,a=e+1,o=s[r],l=s[a];if(o===void 0)switch(this.getSettings_().endingStart){case Uc:r=e,o=2*t-i;break;case Fc:r=s.length-2,o=t+s[r]-s[r+1];break;default:r=e,o=i}if(l===void 0)switch(this.getSettings_().endingEnd){case Uc:a=e,l=2*i-t;break;case Fc:a=1,l=i+s[1]-s[0];break;default:a=e-1,l=t}let c=(i-t)*.5,h=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(l-i),this._offsetPrev=r*h,this._offsetNext=a*h}interpolate_(e,t,i,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,h=this._offsetPrev,f=this._offsetNext,d=this._weightPrev,p=this._weightNext,g=(i-t)/(s-t),S=g*g,m=S*g,u=-d*m+2*d*S-d*g,v=(1+d)*m+(-1.5-2*d)*S+(-.5+d)*g+1,E=(-1-p)*m+(1.5+p)*S+.5*g,y=p*m-p*S;for(let A=0;A!==o;++A)r[A]=u*a[h+A]+v*a[c+A]+E*a[l+A]+y*a[f+A];return r}},La=class extends _i{constructor(e,t,i,s){super(e,t,i,s)}interpolate_(e,t,i,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,h=(i-t)/(s-t),f=1-h;for(let d=0;d!==o;++d)r[d]=a[c+d]*f+a[l+d]*h;return r}},Ia=class extends _i{constructor(e,t,i,s){super(e,t,i,s)}interpolate_(e){return this.copySampleValue_(e-1)}},Da=class extends _i{interpolate_(e,t,i,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,h=this.inTangents,f=this.outTangents;if(!h||!f){let g=(i-t)/(s-t),S=1-g;for(let m=0;m!==o;++m)r[m]=a[c+m]*S+a[l+m]*g;return r}let d=o*2,p=e-1;for(let g=0;g!==o;++g){let S=a[c+g],m=a[l+g],u=p*d+g*2,v=f[u],E=f[u+1],y=e*d+g*2,A=h[y],T=h[y+1],b=Fp(i,t,v,A,s);r[g]=ju(b,S,E,T,m)}return r}};gn=class{constructor(e,t,i,s){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=cs(t,this.TimeBufferType),this.values=cs(i,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,i;if(t.toJSON!==this.toJSON)i=t.toJSON(e);else{i={name:e.name,times:cs(e.times,Array),values:cs(e.values,Array)};let s=e.getInterpolation();s!==e.DefaultInterpolation&&(i.interpolation=s),aa(e.settings)&&(i.settings={inTangents:cs(e.settings.inTangents,Array),outTangents:cs(e.settings.outTangents,Array)})}return i.type=e.ValueTypeName,i}InterpolantFactoryMethodDiscrete(e){return new Ia(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new La(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new Pa(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new Da(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.inTangents=this.settings.inTangents,t.outTangents=this.settings.outTangents),t}setInterpolation(e){let t;switch(e){case Zs:t=this.InterpolantFactoryMethodDiscrete;break;case va:t=this.InterpolantFactoryMethodLinear;break;case ha:t=this.InterpolantFactoryMethodSmooth;break;case Dc:t=this.InterpolantFactoryMethodBezier;break}if(t===void 0){let i="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(i);return Ne("KeyframeTrack:",i),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Zs;case this.InterpolantFactoryMethodLinear:return va;case this.InterpolantFactoryMethodSmooth:return ha;case this.InterpolantFactoryMethodBezier:return Dc}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let i=0,s=t.length;i!==s;++i)t[i]+=e;aa(this.settings)&&(tu(this.settings.inTangents,e),tu(this.settings.outTangents,e))}return this}scale(e){if(e!==1){let t=this.times;for(let i=0,s=t.length;i!==s;++i)t[i]*=e;aa(this.settings)&&(nu(this.settings.inTangents,e),nu(this.settings.outTangents,e))}return this}trim(e,t){let i=this.times,s=i.length,r=0,a=s-1;for(;r!==s&&i[r]<e;)++r;for(;a!==-1&&i[a]>t;)--a;if(++a,r!==0||a!==s){r>=a&&(a=Math.max(a,1),r=a-1);let o=this.getValueSize();this.times=i.slice(r,a),this.values=this.values.slice(r*o,a*o)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(Ue("KeyframeTrack: Invalid value size in track.",this),e=!1);let i=this.times,s=this.values,r=i.length;r===0&&(Ue("KeyframeTrack: Track is empty.",this),e=!1);let a=null;for(let o=0;o!==r;o++){let l=i[o];if(typeof l=="number"&&isNaN(l)){Ue("KeyframeTrack: Time is not a valid number.",this,o,l),e=!1;break}if(a!==null&&a>l){Ue("KeyframeTrack: Out of order keys.",this,o,l,a),e=!1;break}a=l}if(s!==void 0&&$f(s))for(let o=0,l=s.length;o!==l;++o){let c=s[o];if(isNaN(c)){Ue("KeyframeTrack: Value is not a valid number.",this,o,c),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),i=this.getValueSize(),s=this.getInterpolation()===ha,r=e.length-1,a=1;for(let o=1;o<r;++o){let l=!1,c=e[o],h=e[o+1];if(c!==h&&(o!==1||c!==e[0]))if(s)l=!0;else{let f=o*i,d=f-i,p=f+i;for(let g=0;g!==i;++g){let S=t[f+g];if(S!==t[d+g]||S!==t[p+g]){l=!0;break}}}if(l){if(o!==a){e[a]=e[o];let f=o*i,d=a*i;for(let p=0;p!==i;++p)t[d+p]=t[f+p]}++a}}if(r>0){e[a]=e[r];for(let o=r*i,l=a*i,c=0;c!==i;++c)t[l+c]=t[o+c];++a}return a!==e.length?(this.times=e.slice(0,a),this.values=t.slice(0,a*i)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),i=this.constructor,s=new i(this.name,e,t);return s.createInterpolant=this.createInterpolant,aa(this.settings)&&(s.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),s}};gn.prototype.ValueTypeName="";gn.prototype.TimeBufferType=Float32Array;gn.prototype.ValueBufferType=Float32Array;gn.prototype.DefaultInterpolation=va;xi=class extends gn{constructor(e,t,i){super(e,t,i)}};xi.prototype.ValueTypeName="bool";xi.prototype.ValueBufferType=Array;xi.prototype.DefaultInterpolation=Zs;xi.prototype.InterpolantFactoryMethodLinear=void 0;xi.prototype.InterpolantFactoryMethodSmooth=void 0;Na=class extends gn{constructor(e,t,i,s){super(e,t,i,s)}};Na.prototype.ValueTypeName="color";Ua=class extends gn{constructor(e,t,i,s){super(e,t,i,s)}};Ua.prototype.ValueTypeName="number";Fa=class extends _i{constructor(e,t,i,s){super(e,t,i,s)}interpolate_(e,t,i,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=(i-t)/(s-t),c=e*o;for(let h=c+o;c!==h;c+=4)pn.slerpFlat(r,0,a,c-o,a,c,l);return r}},dr=class extends gn{constructor(e,t,i,s){super(e,t,i,s)}InterpolantFactoryMethodLinear(e){return new Fa(this.times,this.values,this.getValueSize(),e)}};dr.prototype.ValueTypeName="quaternion";dr.prototype.InterpolantFactoryMethodSmooth=void 0;vi=class extends gn{constructor(e,t,i){super(e,t,i)}};vi.prototype.ValueTypeName="string";vi.prototype.ValueBufferType=Array;vi.prototype.DefaultInterpolation=Zs;vi.prototype.InterpolantFactoryMethodLinear=void 0;vi.prototype.InterpolantFactoryMethodSmooth=void 0;Oa=class extends gn{constructor(e,t,i,s){super(e,t,i,s)}};Oa.prototype.ValueTypeName="vector";Ba=class{constructor(e,t,i){let s=this,r=!1,a=0,o=0,l,c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=i,this._abortController=null,this.itemStart=function(h){o++,r===!1&&s.onStart!==void 0&&s.onStart(h,a,o),r=!0},this.itemEnd=function(h){a++,s.onProgress!==void 0&&s.onProgress(h,a,o),a===o&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(h){s.onError!==void 0&&s.onError(h)},this.resolveURL=function(h){return h=h.normalize("NFC"),l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,f){return c.push(h,f),this},this.removeHandler=function(h){let f=c.indexOf(h);return f!==-1&&c.splice(f,2),this},this.getHandler=function(h){for(let f=0,d=c.length;f<d;f+=2){let p=c[f],g=c[f+1];if(p.global&&(p.lastIndex=0),p.test(h))return g}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},Ku=new Ba,ka=class{constructor(e){this.manager=e!==void 0?e:Ku,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},this.priority="auto",this.cache="default",typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(e,t){let i=this;return new Promise(function(s,r){i.load(e,s,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}setPriority(e){return this.priority=e,this}setCache(e){return this.cache=e,this}abort(){return this}};ka.DEFAULT_MATERIAL_NAME="__DEFAULT";Ss=class extends Pt{static registerNode(e){this.prototype._lightNode=e}constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new qe(e),this.intensity=t}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}},fr=class extends Ss{constructor(e,t,i){super(e,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Pt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new qe(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){let t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}},Lc=new it,iu=new N,su=new N,pr=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new De(512,512),this.mapType=hn,this.map=null,this.mapPass=null,this.matrix=new it,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new bi,this._frameExtents=new De(1,1),this._viewportCount=1,this._viewports=[new Ze(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera;iu.setFromMatrixPosition(e.matrixWorld),t.position.copy(iu),su.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(su),t.updateMatrixWorld(),this._updateMatrix(t,this.matrix,this._frustum)}_updateMatrix(e,t,i,s){Lc.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),i.setFromProjectionMatrix(Lc,e.coordinateSystem,e.reversedDepth);let r=this._frameExtents,a=s?s.z/r.x:1,o=s?s.w/r.y:1,l=s?s.x/r.x:0,c=s?s.y/r.y:0;e.coordinateSystem===gs||e.reversedDepth?t.set(.5*a,0,0,.5*a+l,0,.5*o,0,.5*o+c,0,0,1,0,0,0,0,1):t.set(.5*a,0,0,.5*a+l,0,.5*o,0,.5*o+c,0,0,.5,.5,0,0,0,1),t.multiply(Lc)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.mapType=e.mapType,this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return e.intensity=this.intensity,e.bias=this.bias,e.normalBias=this.normalBias,e.radius=this.radius,e.blurSamples=this.blurSamples,e.mapSize=this.mapSize.toArray(),e.mapType=this.mapType,e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},oa=new N,ca=new pn,Fn=new N,mr=class extends Pt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new it,this.projectionMatrix=new it,this.projectionMatrixInverse=new it,this.coordinateSystem=yn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(oa,ca,Fn),Fn.x===1&&Fn.y===1&&Fn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(oa,ca,Fn.set(1,1,1)).invert()}updateWorldMatrix(e,t,i=!1){super.updateWorldMatrix(e,t,i),this.matrixWorld.decompose(oa,ca,Fn),Fn.x===1&&Fn.y===1&&Fn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(oa,ca,Fn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},pi=new N,ru=new De,au=new De,jt=class extends mr{constructor(e=50,t=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=Bi*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(Ys*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Bi*2*Math.atan(Math.tan(Ys*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){pi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(pi.x,pi.y).multiplyScalar(-e/pi.z),pi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(pi.x,pi.y).multiplyScalar(-e/pi.z)}getViewSize(e,t){return this.getViewBounds(e,ru,au),t.subVectors(au,ru)}setViewOffset(e,t,i,s,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(Ys*.5*this.fov)/this.zoom,i=2*t,s=this.aspect*i,r=-.5*s,a=this.view;if(this.view!==null&&this.view.enabled){let l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*s/l,t-=a.offsetY*i/c,s*=a.width/l,i*=a.height/c}let o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},Oc=class extends pr{constructor(){super(new jt(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(e){let t=this.camera,i=Bi*2*e.angle*this.focus,s=this.mapSize.width/this.mapSize.height*this.aspect,r=e.distance||t.far;(i!==t.fov||s!==t.aspect||r!==t.far)&&(t.fov=i,t.aspect=s,t.far=r,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this.aspect=e.aspect,this}toJSON(){let e=super.toJSON();return e.focus=this.focus,e.aspect=this.aspect,e}},gr=class extends Ss{constructor(e,t,i=0,s=Math.PI/3,r=0,a=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(Pt.DEFAULT_UP),this.updateMatrix(),this.target=new Pt,this.distance=i,this.angle=s,this.penumbra=r,this.decay=a,this.map=null,this.shadow=new Oc}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.map=e.map,this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.distance=this.distance,t.object.angle=this.angle,t.object.decay=this.decay,t.object.penumbra=this.penumbra,t.object.target=this.target.uuid,this.map&&this.map.isTexture&&(t.object.map=this.map.toJSON(e).uuid),t.object.shadow=this.shadow.toJSON(),t}},Vi=class extends mr{constructor(e=-1,t=1,i=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=i-e,a=i+e,o=s+t,l=s-t;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},Bc=class extends pr{constructor(){super(new Vi(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Ms=class extends Ss{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Pt.DEFAULT_UP),this.updateMatrix(),this.target=new Pt,this.shadow=new Bc}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}},br=class extends an{constructor(){super(),this.isInstancedBufferGeometry=!0,this.type="InstancedBufferGeometry",this.instanceCount=1/0}copy(e){return super.copy(e),this.instanceCount=e.instanceCount,this}toJSON(){let e=super.toJSON();return e.instanceCount=this.instanceCount,e.isInstancedBufferGeometry=!0,e}},ls=-90,hs=1,ws=class extends Pt{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new jt(ls,hs,e,t);s.layers=this.layers,this.add(s);let r=new jt(ls,hs,e,t);r.layers=this.layers,this.add(r);let a=new jt(ls,hs,e,t);a.layers=this.layers,this.add(a);let o=new jt(ls,hs,e,t);o.layers=this.layers,this.add(o);let l=new jt(ls,hs,e,t);l.layers=this.layers,this.add(l);let c=new jt(ls,hs,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[i,s,r,a,o,l]=t;for(let c of t)this.remove(c);if(e===yn)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===gs)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[r,a,o,l,c,h]=this.children,f=e.getRenderTarget(),d=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;let S=i.texture.mipmapsAutoUpdate;i.texture.mipmapsAutoUpdate=!1;let m=!1;e.isWebGLRenderer===!0?m=e.state.buffers.depth.getReversed():m=e.reversedDepthBuffer,e.setRenderTarget(i,0,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,r),e.setRenderTarget(i,1,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(i,2,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(i,3,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(i,4,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),i.texture.mipmapsAutoUpdate=S,e.setRenderTarget(i,5,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,h),e.setRenderTarget(f,d,p),e.xr.enabled=g,i.texture.needsPMREMUpdate=!0}},za=class extends jt{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e,this.perCameraFrustumCulled=!1}},yl="\\[\\]\\.:\\/",Op=new RegExp("["+yl+"]","g"),Sl="[^"+yl+"]",Bp="[^"+yl.replace("\\.","")+"]",kp=/((?:WC+[\/:])*)/.source.replace("WC",Sl),zp=/(WCOD+)?/.source.replace("WCOD",Bp),Gp=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Sl),Vp=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Sl),Hp=new RegExp("^"+kp+zp+Gp+Vp+"$"),Wp=["material","materials","bones","map"],kc=class{constructor(e,t,i){let s=i||lt.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,s)}getValue(e,t){this.bind();let i=this._targetGroup.nCachedObjects_,s=this._bindings[i];s!==void 0&&s.getValue(e,t)}setValue(e,t){let i=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=i.length;s!==r;++s)i[s].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,i=e.length;t!==i;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,i=e.length;t!==i;++t)e[t].unbind()}},lt=class n{constructor(e,t,i){this.path=t,this.parsedPath=i||n.parseTrackName(t),this.node=n.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,i){return e&&e.isAnimationObjectGroup?new n.Composite(e,t,i):new n(e,t,i)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(Op,"")}static parseTrackName(e){let t=Hp.exec(e);if(t===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+e);let i={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},s=i.nodeName&&i.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=i.nodeName.substring(s+1);Wp.indexOf(r)!==-1&&(i.nodeName=i.nodeName.substring(0,s),i.objectName=r)}if(i.propertyName===null||i.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+e);return i}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let i=e.skeleton.getBoneByName(t);if(i!==void 0)return i}if(e.children){let i=function(r){for(let a=0;a<r.length;a++){let o=r[a];if(o.name===t||o.uuid===t)return o;let l=i(o.children);if(l)return l}return null},s=i(e.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)e[t++]=i[s]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,i=t.objectName,s=t.propertyName,r=t.propertyIndex;if(e||(e=n.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){Ne("PropertyBinding: No target node found for track: "+this.path+".");return}if(i){let c=t.objectIndex;switch(i){case"materials":if(!e.material){Ue("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){Ue("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){Ue("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===c){c=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){Ue("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){Ue("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[i]===void 0){Ue("PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[i]}if(c!==void 0){if(e[c]===void 0){Ue("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}let a=e[s];if(a===void 0){let c=t.nodeName;Ue("PropertyBinding: Trying to update property for track: "+c+"."+s+" but it wasn't found.",e);return}let o=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?o=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!e.geometry){Ue("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){Ue("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=r}else a.fromArray!==void 0&&a.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(l=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=s;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};lt.Composite=kc;lt.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};lt.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};lt.prototype.GetterByBindingType=[lt.prototype._getValue_direct,lt.prototype._getValue_array,lt.prototype._getValue_arrayElement,lt.prototype._getValue_toArray];lt.prototype.SetterByBindingTypeAndVersioning=[[lt.prototype._setValue_direct,lt.prototype._setValue_direct_setNeedsUpdate,lt.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[lt.prototype._setValue_array,lt.prototype._setValue_array_setNeedsUpdate,lt.prototype._setValue_array_setMatrixWorldNeedsUpdate],[lt.prototype._setValue_arrayElement,lt.prototype._setValue_arrayElement_setNeedsUpdate,lt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[lt.prototype._setValue_fromArray,lt.prototype._setValue_fromArray_setNeedsUpdate,lt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];Xx=new Float32Array(1),yi=class extends wa{constructor(e,t,i=1){super(e,t),this.isInstancedInterleavedBuffer=!0,this.meshPerAttribute=i}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}clone(e){let t=super.clone(e);return t.meshPerAttribute=this.meshPerAttribute,t}toJSON(e){let t=super.toJSON(e);return t.isInstancedInterleavedBuffer=!0,t.meshPerAttribute=this.meshPerAttribute,t}},ou=new it,Es=class{constructor(e,t,i=0,s=1/0){this.ray=new ki(e,t),this.near=i,this.far=s,this.camera=null,this.layers=new xs,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,t.projectionMatrix.elements[14]).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):Ue("Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return ou.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(ou),this}intersectObject(e,t=!0,i=[]){return zc(e,this,i,t),i.sort(cu),i}intersectObjects(e,t=!0,i=[]){for(let s=0,r=e.length;s<r;s++)zc(e[s],this,i,t);return i.sort(cu),i}};Si=class{constructor(e=1,t=0,i=0){this.radius=e,this.phi=t,this.theta=i}set(e,t,i){return this.radius=e,this.phi=t,this.theta=i,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=ze(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,i){return this.radius=Math.sqrt(e*e+t*t+i*i),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,i),this.phi=Math.acos(ze(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}},Gc=class{static{this.prototype.isMatrix2=!0}constructor(e,t,i,s){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,i,s)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let i=0;i<4;i++)this.elements[i]=e[i+t];return this}set(e,t,i,s){let r=this.elements;return r[0]=e,r[2]=t,r[1]=i,r[3]=s,this}},lu=new N,la=new N,us=new N,ds=new N,Ic=new N,qp=new N,Xp=new N,_r=class{constructor(e=new N,t=new N){this.start=e,this.end=t}set(e,t){return this.start.copy(e),this.end.copy(t),this}copy(e){return this.start.copy(e.start),this.end.copy(e.end),this}getCenter(e){return e.addVectors(this.start,this.end).multiplyScalar(.5)}delta(e){return e.subVectors(this.end,this.start)}distanceSq(){return this.start.distanceToSquared(this.end)}distance(){return this.start.distanceTo(this.end)}at(e,t){return this.delta(t).multiplyScalar(e).add(this.start)}closestPointToPointParameter(e,t){lu.subVectors(e,this.start),la.subVectors(this.end,this.start);let i=la.dot(la);if(i===0)return 0;let r=la.dot(lu)/i;return t&&(r=ze(r,0,1)),r}closestPointToPoint(e,t,i){let s=this.closestPointToPointParameter(e,t);return this.delta(i).multiplyScalar(s).add(this.start)}distanceSqToLine3(e,t=qp,i=Xp){let s=10000000000000001e-32,r,a,o=this.start,l=e.start,c=this.end,h=e.end;us.subVectors(c,o),ds.subVectors(h,l),Ic.subVectors(o,l);let f=us.dot(us),d=ds.dot(ds),p=ds.dot(Ic);if(f<=s&&d<=s)return t.copy(o),i.copy(l),t.distanceToSquared(i);if(f<=s)r=0,a=p/d,a=ze(a,0,1);else{let g=us.dot(Ic);if(d<=s)a=0,r=ze(-g/f,0,1);else{let S=us.dot(ds),m=f*d-S*S;m!==0?r=ze((S*p-g*d)/m,0,1):r=0,a=(S*r+p)/d,a<0?(a=0,r=ze(-g/f,0,1)):a>1&&(a=1,r=ze((S-g)/f,0,1))}}return t.copy(o).addScaledVector(us,r),i.copy(l).addScaledVector(ds,a),t.distanceToSquared(i)}applyMatrix4(e){return this.start.applyMatrix4(e),this.end.applyMatrix4(e),this}equals(e){return e.start.equals(this.start)&&e.end.equals(this.end)}clone(){return new this.constructor().copy(this)}},xr=class extends Rn{constructor(e,t=null){super(),this.object=e,this.domElement=t,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(e){this.domElement!==null&&this.disconnect(),this.domElement=e}disconnect(){}dispose(){}update(){}};typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"187"}}));typeof window<"u"&&(window.__THREE__?Ne("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="187")});function gd(){let n=null,e=!1,t=null,i=null;function s(r,a){i=n.requestAnimationFrame(s),t(r,a)}return{start:function(){e!==!0&&t!==null&&n!==null&&(i=n.requestAnimationFrame(s),e=!0)},stop:function(){n!==null&&n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){n=r}}}function Yp(n){let e=new WeakMap;function t(o,l){let c=o.array,h=o.usage,f=c.byteLength,d=n.createBuffer();n.bindBuffer(l,d),n.bufferData(l,c,h),o.onUploadCallback();let p;if(c instanceof Float32Array)p=n.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)p=n.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?p=n.HALF_FLOAT:p=n.UNSIGNED_SHORT;else if(c instanceof Int16Array)p=n.SHORT;else if(c instanceof Uint32Array)p=n.UNSIGNED_INT;else if(c instanceof Int32Array)p=n.INT;else if(c instanceof Int8Array)p=n.BYTE;else if(c instanceof Uint8Array)p=n.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)p=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:d,type:p,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:f}}function i(o,l,c){let h=l.array,f=l.updateRanges;if(n.bindBuffer(c,o),f.length===0)n.bufferSubData(c,0,h);else{f.sort((p,g)=>p.start-g.start);let d=0;for(let p=1;p<f.length;p++){let g=f[d],S=f[p];S.start<=g.start+g.count+1?g.count=Math.max(g.count,S.start+S.count-g.start):(++d,f[d]=S)}f.length=d+1;for(let p=0,g=f.length;p<g;p++){let S=f[p];n.bufferSubData(c,S.start*h.BYTES_PER_ELEMENT,h,S.start,S.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);let l=e.get(o);l&&(n.deleteBuffer(l.buffer),e.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){let h=e.get(o);(!h||h.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}let c=e.get(o);if(c===void 0)e.set(o,t(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,o,l),c.version=o.version}}return{get:s,remove:r,update:a}}function P0(n,e,t,i,s,r){let a=new qe(0),o=s===!0?0:1,l,c,h=null,f=0,d=null;function p(v){let E=v.isScene===!0?v.background:null;if(E&&E.isTexture){let y=v.backgroundBlurriness>0;E=e.get(E,y)}return E}function g(v){let E=!1,y=p(v);y===null?m(a,o):y&&y.isColor&&(m(y,1),E=!0);let A=n.xr.getEnvironmentBlendMode();A==="additive"?t.buffers.color.setClear(0,0,0,1,r):A==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,r),(n.autoClear||E)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function S(v,E){let y=p(E);y&&y.isCubeTexture?(c===void 0&&(c=new St(new ys(1,1,1),new Sn({name:"BackgroundCubeMaterial",uniforms:ji(cn.backgroundCube.uniforms),vertexShader:cn.backgroundCube.vertexShader,fragmentShader:cn.backgroundCube.fragmentShader,side:on,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(A,T,b){this.matrixWorld.copyPosition(b.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(c)),c.material.uniforms.envMap.value=y,c.material.uniforms.backgroundBlurriness.value=E.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(R0.makeRotationFromEuler(E.backgroundRotation)).transpose(),y.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(bd),c.material.toneMapped=Ke.getTransfer(y.colorSpace)!==et,(h!==y||f!==y.version||d!==n.toneMapping)&&(c.material.needsUpdate=!0,h=y,f=y.version,d=n.toneMapping),c.layers.enableAll(),v.unshift(c,c.geometry,c.material,0,0,null)):y&&y.isTexture&&(l===void 0&&(l=new St(new hr(2,2),new Sn({name:"BackgroundMaterial",uniforms:ji(cn.background.uniforms),vertexShader:cn.background.vertexShader,fragmentShader:cn.background.fragmentShader,side:Ei,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=y,l.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,l.material.toneMapped=Ke.getTransfer(y.colorSpace)!==et,y.matrixAutoUpdate===!0&&y.updateMatrix(),l.material.uniforms.uvTransform.value.copy(y.matrix),(h!==y||f!==y.version||d!==n.toneMapping)&&(l.material.needsUpdate=!0,h=y,f=y.version,d=n.toneMapping),l.layers.enableAll(),v.unshift(l,l.geometry,l.material,0,0,null))}function m(v,E){v.getRGB(Ro,vl(n)),t.buffers.color.setClear(Ro.r,Ro.g,Ro.b,E,r)}function u(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(v,E=1){a.set(v),o=E,m(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(v){o=v,m(a,o)},render:g,addToRenderList:S,dispose:u}}function L0(n,e){let t=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},s=d(null),r=s,a=!1;function o(I,k,W,R,H){let j=!1,z=f(I,R,W,k);r!==z&&(r=z,c(r.object)),j=p(I,R,W,H),j&&g(I,R,W,H),H!==null&&e.update(H,n.ELEMENT_ARRAY_BUFFER),(j||a)&&(a=!1,y(I,k,W,R),H!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get(H).buffer))}function l(){return n.createVertexArray()}function c(I){return n.bindVertexArray(I)}function h(I){return n.deleteVertexArray(I)}function f(I,k,W,R){let H=R.wireframe===!0,j=i[k.id];j===void 0&&(j={},i[k.id]=j);let z=I.isInstancedMesh===!0?I.id:0,ie=j[z];ie===void 0&&(ie={},j[z]=ie);let q=ie[W.id];q===void 0&&(q={},ie[W.id]=q);let ee=q[H];return ee===void 0&&(ee=d(l()),q[H]=ee),ee}function d(I){let k=[],W=[],R=[];for(let H=0;H<t;H++)k[H]=0,W[H]=0,R[H]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:k,enabledAttributes:W,attributeDivisors:R,object:I,attributes:{},index:null}}function p(I,k,W,R){let H=r.attributes,j=k.attributes,z=0,ie=W.getAttributes();for(let q in ie)if(ie[q].location>=0){let ne=H[q],Te=j[q];if(Te===void 0&&(q==="instanceMatrix"&&I.instanceMatrix&&(Te=I.instanceMatrix),q==="instanceColor"&&I.instanceColor&&(Te=I.instanceColor)),ne===void 0||ne.attribute!==Te||Te&&ne.data!==Te.data)return!0;z++}return r.attributesNum!==z||r.index!==R}function g(I,k,W,R){let H={},j=k.attributes,z=0,ie=W.getAttributes();for(let q in ie)if(ie[q].location>=0){let ne=j[q];ne===void 0&&(q==="instanceMatrix"&&I.instanceMatrix&&(ne=I.instanceMatrix),q==="instanceColor"&&I.instanceColor&&(ne=I.instanceColor));let Te={};Te.attribute=ne,ne&&ne.data&&(Te.data=ne.data),H[q]=Te,z++}r.attributes=H,r.attributesNum=z,r.index=R}function S(){let I=r.newAttributes;for(let k=0,W=I.length;k<W;k++)I[k]=0}function m(I){u(I,0)}function u(I,k){let W=r.newAttributes,R=r.enabledAttributes,H=r.attributeDivisors;W[I]=1,R[I]===0&&(n.enableVertexAttribArray(I),R[I]=1),H[I]!==k&&(n.vertexAttribDivisor(I,k),H[I]=k)}function v(){let I=r.newAttributes,k=r.enabledAttributes;for(let W=0,R=k.length;W<R;W++)k[W]!==I[W]&&(n.disableVertexAttribArray(W),k[W]=0)}function E(I,k,W,R,H,j,z){z===!0?n.vertexAttribIPointer(I,k,W,H,j):n.vertexAttribPointer(I,k,W,R,H,j)}function y(I,k,W,R){S();let H=R.attributes,j=W.getAttributes(),z=k.defaultAttributeValues;for(let ie in j){let q=j[ie];if(q.location>=0){let ee=H[ie];if(ee===void 0&&(ie==="instanceMatrix"&&I.instanceMatrix&&(ee=I.instanceMatrix),ie==="instanceColor"&&I.instanceColor&&(ee=I.instanceColor)),ee!==void 0){let ne=ee.normalized,Te=ee.itemSize,Fe=e.get(ee);if(Fe===void 0)continue;let Y=Fe.buffer,be=Fe.type,_e=Fe.bytesPerElement,Re=be===n.INT||be===n.UNSIGNED_INT||ee.gpuType===Wa;if(ee.isInterleavedBufferAttribute){let ge=ee.data,Oe=ge.isInterleavedBuffer===!0?ge.stride:ge.itemSize,dt=ee.offset;if(ge.isInstancedInterleavedBuffer||ge.isInstancedBufferAttribute){for(let Ie=0;Ie<q.locationSize;Ie++)u(q.location+Ie,ge.meshPerAttribute);I.isInstancedMesh!==!0&&R._maxInstanceCount===void 0&&(R._maxInstanceCount=ge.meshPerAttribute*ge.count)}else for(let Ie=0;Ie<q.locationSize;Ie++)m(q.location+Ie);n.bindBuffer(n.ARRAY_BUFFER,Y);for(let Ie=0;Ie<q.locationSize;Ie++)E(q.location+Ie,Te/q.locationSize,be,ne,Oe*_e,(dt+Te/q.locationSize*Ie)*_e,Re)}else{if(ee.isInstancedBufferAttribute){for(let ge=0;ge<q.locationSize;ge++)u(q.location+ge,ee.meshPerAttribute);I.isInstancedMesh!==!0&&R._maxInstanceCount===void 0&&(R._maxInstanceCount=ee.meshPerAttribute*ee.count)}else for(let ge=0;ge<q.locationSize;ge++)m(q.location+ge);n.bindBuffer(n.ARRAY_BUFFER,Y);for(let ge=0;ge<q.locationSize;ge++)E(q.location+ge,Te/q.locationSize,be,ne,Te*_e,Te/q.locationSize*ge*_e,Re)}}else if(z!==void 0){let ne=z[ie];if(ne!==void 0)switch(ne.length){case 2:n.vertexAttrib2fv(q.location,ne);break;case 3:n.vertexAttrib3fv(q.location,ne);break;case 4:n.vertexAttrib4fv(q.location,ne);break;default:n.vertexAttrib1fv(q.location,ne)}}}}v()}function A(){F();for(let I in i){let k=i[I];for(let W in k){let R=k[W];for(let H in R){let j=R[H];for(let z in j)h(j[z].object),delete j[z];delete R[H]}}delete i[I]}}function T(I){if(i[I.id]===void 0)return;let k=i[I.id];for(let W in k){let R=k[W];for(let H in R){let j=R[H];for(let z in j)h(j[z].object),delete j[z];delete R[H]}}delete i[I.id]}function b(I){for(let k in i){let W=i[k];for(let R in W){let H=W[R];if(H[I.id]===void 0)continue;let j=H[I.id];for(let z in j)h(j[z].object),delete j[z];delete H[I.id]}}}function w(I){for(let k in i){let W=i[k],R=I.isInstancedMesh===!0?I.id:0,H=W[R];if(H!==void 0){for(let j in H){let z=H[j];for(let ie in z)h(z[ie].object),delete z[ie];delete H[j]}delete W[R],Object.keys(W).length===0&&delete i[k]}}}function F(){P(),a=!0,r!==s&&(r=s,c(r.object))}function P(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:F,resetDefaultState:P,dispose:A,releaseStatesOfGeometry:T,releaseStatesOfObject:w,releaseStatesOfProgram:b,initAttributes:S,enableAttribute:m,disableUnusedAttributes:v}}function I0(n,e,t){let i;function s(l){i=l}function r(l,c){n.drawArrays(i,l,c),t.update(c,i,1)}function a(l,c,h){h!==0&&(n.drawArraysInstanced(i,l,c,h),t.update(c,i,h))}function o(l,c,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,l,0,c,0,h);let d=0;for(let p=0;p<h;p++)d+=c[p];t.update(d,i,1)}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o}function D0(n,e,t,i){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){let b=e.get("EXT_texture_filter_anisotropic");s=n.getParameter(b.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(b){return!(b!==Nn&&i.convert(b)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(b){let w=b===Dn&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(b!==hn&&b!==In&&!w&&i.convert(b)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE))}function l(b){if(b==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";b="mediump"}return b==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp",h=l(c);h!==c&&(Ne("WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);let f=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),d=t.logarithmicDepthBuffer===!0&&f===!1;t.reversedDepthBuffer===!0&&f===!1&&Ne("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer."),t.logarithmicDepthBuffer===!0&&f===!0&&Ne("WebGLRenderer: Logarithmic depth buffer is ignored when reversed depth buffer is enabled.");let p=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),g=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),S=n.getParameter(n.MAX_TEXTURE_SIZE),m=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),u=n.getParameter(n.MAX_VERTEX_ATTRIBS),v=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),E=n.getParameter(n.MAX_VARYING_VECTORS),y=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),A=n.getParameter(n.MAX_SAMPLES),T=n.getParameter(n.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:d,reversedDepthBuffer:f,maxTextures:p,maxVertexTextures:g,maxTextureSize:S,maxCubemapSize:m,maxAttributes:u,maxVertexUniforms:v,maxVaryings:E,maxFragmentUniforms:y,maxSamples:A,samples:T}}function N0(n){let e=this,t=null,i=0,s=!1,r=!1,a=new tn,o=new Be,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(f,d){let p=f.length!==0||d||i!==0||s;return s=d,i=f.length,p},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(f,d){t=h(f,d,0)},this.setState=function(f,d,p){let g=f.clippingPlanes,S=f.clipIntersection,m=f.clipShadows,u=n.get(f);if(!s||g===null||g.length===0||r&&!m)r?h(null):c();else{let v=r?0:i,E=v*4,y=u.clippingState||null;l.value=y,y=h(g,d,E,p);for(let A=0;A!==E;++A)y[A]=t[A];u.clippingState=y,this.numIntersection=S?this.numPlanes:0,this.numPlanes+=v}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function h(f,d,p,g){let S=f!==null?f.length:0,m=null;if(S!==0){if(m=l.value,g!==!0||m===null){let u=p+S*4,v=d.matrixWorldInverse;o.getNormalMatrix(v),(m===null||m.length<u)&&(m=new Float32Array(u));for(let E=0,y=p;E!==S;++E,y+=4)a.copy(f[E]).applyMatrix4(v,o),a.normal.toArray(m,y),m[y+3]=a.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=S,e.numIntersection=0,m}}function Ju(n,e,t){return new Ir(n,{minFilter:ni,generateMipmaps:e,type:Dn,colorSpace:$s,depthBuffer:t})}function Dr(n,e,t){return new Sn({name:n,uniforms:e,vertexShader:He.cube_vert,fragmentShader:t,side:on,blending:Hi,depthTest:!1,depthWrite:!1})}function z0(){return Dr("PMREMGGXConvolution",{envMap:{value:null},roughness:{value:0},lodBias:{value:0}},`

		#define GGX_SAMPLES ${_d}u

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float roughness;
		uniform float lodBias;

		#include <common>

		// Van der Corput radical inverse
		float radicalInverse_VdC( uint bits ) {

			bits = ( bits << 16u ) | ( bits >> 16u );
			bits = ( ( bits & 0x55555555u ) << 1u ) | ( ( bits & 0xAAAAAAAAu ) >> 1u );
			bits = ( ( bits & 0x33333333u ) << 2u ) | ( ( bits & 0xCCCCCCCCu ) >> 2u );
			bits = ( ( bits & 0x0F0F0F0Fu ) << 4u ) | ( ( bits & 0xF0F0F0F0u ) >> 4u );
			bits = ( ( bits & 0x00FF00FFu ) << 8u ) | ( ( bits & 0xFF00FF00u ) >> 8u );
			return float( bits ) * 2.3283064365386963e-10; // / 0x100000000

		}

		// Hammersley sequence
		vec2 hammersley( uint i, uint N ) {

			return vec2( float( i ) / float( N ), radicalInverse_VdC( i ) );

		}

		void main() {

			vec3 N = normalize( vWorldDirection );

			// For very low roughness, just sample the environment directly
			if ( roughness < 0.001 ) {

				gl_FragColor = vec4( textureLod( envMap, N, 0.0 ).rgb, 1.0 );
				return;

			}

			float alpha = roughness * roughness;
			float alpha2 = alpha * alpha;

			// Tangent space basis for VNDF sampling
			vec3 up = abs( N.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
			vec3 tangent = normalize( cross( up, N ) );
			vec3 bitangent = cross( N, tangent );

			vec3 prefilteredColor = vec3( 0.0 );
			float totalWeight = 0.0;

			for ( uint i = 0u; i < GGX_SAMPLES; i ++ ) {

				vec2 Xi = hammersley( i, GGX_SAMPLES );

				// With V = N, sample the reflected direction directly.
				float invQ = 1.0 / ( 1.0 - Xi.x + alpha2 * Xi.x );
				float NdotL = ( 1.0 - Xi.x - alpha2 * Xi.x ) * invQ;

				if ( NdotL > 0.0 ) {

					float phi = 2.0 * PI * Xi.y;
					float sinTheta = 2.0 * alpha * sqrt( Xi.x * ( 1.0 - Xi.x ) ) * invQ;
					vec3 L = N * NdotL + ( tangent * cos( phi ) + bitangent * sin( phi ) ) * sinTheta;

					// Match the source mip to the sample's solid angle. The terms
					// independent of the sample are precomputed in lodBias.
					float d = alpha2 * invQ;
					float lod = max( log2( d ) + lodBias, 0.0 );

					// Weight by NdotL for the split-sum approximation
					prefilteredColor += textureLod( envMap, L, lod ).rgb * NdotL;
					totalWeight += NdotL;

				}

			}

			gl_FragColor = vec4( prefilteredColor / totalWeight, 1.0 );

		}
	`)}function G0(){return Dr("PMREMGGXIntegration",{envMap:{value:null},roughness:{value:0},sourceLod:{value:0},sourceSize:{value:xd}},`

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float roughness;
		uniform float sourceLod;
		uniform int sourceSize;

		void main() {

			vec3 N = normalize( vWorldDirection );

			float alpha = roughness * roughness;
			float alpha2 = alpha * alpha;

			float texelSize = 2.0 / float( sourceSize );

			vec3 prefilteredColor = vec3( 0.0 );
			float totalWeight = 0.0;

			// Pair opposite texels: only the one in N's hemisphere contributes.
			for ( int face = 0; face < 3; face ++ ) {

				for ( int y = 0; y < sourceSize; y ++ ) {

					for ( int x = 0; x < sourceSize; x ++ ) {

						vec2 uv = ( vec2( x, y ) + 0.5 ) * texelSize - 1.0;
						vec3 texelDirection = face == 0 ? vec3( 1.0, uv ) : ( face == 1 ? vec3( uv.x, 1.0, uv.y ) : vec3( uv, 1.0 ) );

						float invDistance = inversesqrt( 1.0 + dot( uv, uv ) );
						float NdotL = dot( N, texelDirection );
						texelDirection *= NdotL < 0.0 ? - 1.0 : 1.0;
						NdotL = abs( NdotL ) * invDistance;

						// With V = N, NdotH squared is ( 1 + NdotL ) / 2. Common factors
						// in the GGX distribution and texel solid angle cancel when normalized.
						float d = 1.0 + alpha2 + ( alpha2 - 1.0 ) * NdotL;
						float weight = NdotL * invDistance * invDistance * invDistance / ( d * d );

						prefilteredColor += textureLod( envMap, texelDirection, sourceLod ).rgb * weight;
						totalWeight += weight;

					}

				}

			}

			gl_FragColor = vec4( prefilteredColor / totalWeight, 1.0 );

		}
	`)}function V0(){return Dr("PMREMSphericalGaussianBlur",{envMap:{value:null},sigma:{value:0}},`

		#define SAMPLES ${F0}
		#define GOLDEN_ANGLE 2.39996322973

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float sigma;

		#include <common>

		void main() {

			vec3 outputDirection = normalize( vWorldDirection );

			vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
			vec3 tangent = normalize( cross( up, outputDirection ) );
			vec3 bitangent = cross( outputDirection, tangent );

			// Truncate the kernel at three standard deviations or at the antipode.
			float thetaMax = min( 3.0 * sigma, PI );
			float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

			vec3 accumColor = vec3( 0.0 );
			float accumWeight = 0.0;

			for ( int i = 0; i < SAMPLES; i ++ ) {

				// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
				float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
				float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
				float phi = float( i ) * GOLDEN_ANGLE;

				vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
				vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

				// Correct the planar sample density to solid angle.
				float weight = sin( theta ) / theta;

				accumColor += weight * textureLod( envMap, sampleDirection, 0.0 ).rgb;
				accumWeight += weight;

			}

			gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

		}
	`)}function Zu(){return Dr("PMREMEquirectangularToCubemap",{envMap:{value:null}},`

		varying vec3 vWorldDirection;

		uniform sampler2D envMap;

		#include <common>

		void main() {

			// Average four subpixel samples to preserve small, bright features.
			vec3 direction = normalize( vWorldDirection );
			vec3 dx = dFdx( direction ) * 0.25;
			vec3 dy = dFdy( direction ) * 0.25;

			vec3 color = textureLod( envMap, equirectUv( normalize( direction - dx - dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction + dx - dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction - dx + dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction + dx + dy ) ), 0.0 ).rgb;
			gl_FragColor = vec4( color * 0.25, 1.0 );

		}
	`)}function $u(){return Dr("PMREMCubemapToCubemap",{envMap:{value:null},flipEnvMap:{value:-1}},`

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float flipEnvMap;

		void main() {

			gl_FragColor = vec4( textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) ).rgb, 1.0 );

		}
	`)}function H0(n){let e=new WeakMap,t=new WeakMap,i=null;function s(d,p=!1){return d==null?null:p?a(d):r(d)}function r(d){if(d&&d.isTexture){let p=d.mapping;if(p===Ga||p===Va)if(e.has(d)){let g=e.get(d).texture;return o(g,d.mapping)}else{let g=d.image;if(g&&g.height>0){let S=new Ir(g.height);return S.fromEquirectangularTexture(n,d),e.set(d,S),d.addEventListener("dispose",c),o(S.texture,d.mapping)}else return null}}return d}function a(d){if(d&&d.isTexture&&d.isPMREMTexture!==!0){let p=d.mapping,g=p===Ga||p===Va,S=p===qi||p===Cs;if(g||S){let m=t.get(d),u=m!==void 0?m.texture.pmremVersion:0;if(d.isRenderTargetTexture&&d.pmremVersion!==u)return i===null&&(i=new Lo(n)),m=g?i.fromEquirectangular(d,m):i.fromCubemap(d,m),m.texture.pmremVersion=d.pmremVersion,t.set(d,m),m.texture;if(m!==void 0)return m.texture;{let v=d.image;return g&&v&&v.height>0||S&&v&&l(v)?(i===null&&(i=new Lo(n)),m=g?i.fromEquirectangular(d):i.fromCubemap(d),m.texture.pmremVersion=d.pmremVersion,t.set(d,m),d.addEventListener("dispose",h),m.texture):null}}}return d}function o(d,p){return p===Ga?d.mapping=qi:p===Va&&(d.mapping=Cs),d}function l(d){let p=0,g=6;for(let S=0;S<g;S++)d[S]!==void 0&&p++;return p===g}function c(d){let p=d.target;p.removeEventListener("dispose",c);let g=e.get(p);g!==void 0&&(e.delete(p),g.dispose())}function h(d){let p=d.target;p.removeEventListener("dispose",h);let g=t.get(p);g!==void 0&&(t.delete(p),g.dispose())}function f(){e=new WeakMap,t=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:s,dispose:f}}function W0(n){let e={};function t(i){if(e[i]!==void 0)return e[i];let s=n.getExtension(i);return e[i]=s,s}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){let s=t(i);return s===null&&Ks("WebGLRenderer: "+i+" extension not supported."),s}}}function q0(n,e,t,i){let s={},r=new WeakMap,a=new FinalizationRegistry(g=>delete s[g]);function o(g){l(g.target)}function l(g){g.index!==null&&e.remove(g.index);for(let m in g.attributes)e.remove(g.attributes[m]);g.removeEventListener("dispose",o),delete s[g.id],a.unregister(g);let S=r.get(g);S&&(e.remove(S),r.delete(g)),i.releaseStatesOfGeometry(g),g.isInstancedBufferGeometry===!0&&delete g._maxInstanceCount,t.memory.geometries--}function c(g,S){return s[S.id]!==void 0||(S.addEventListener("dispose",o),s[S.id]=new WeakRef(S),a.register(S,S.id,S),t.memory.geometries++),S}function h(g){let S=g.attributes;for(let m in S)e.update(S[m],n.ARRAY_BUFFER)}function f(g){let S=g.index,m=g.attributes.position,u=0;if(m===void 0)return;let v=S!==null?S.array.length:m.array.length/3-1,E=m.count>=65535?rr:sr,y=new E(Math.ceil(v/3)*6,1),A=y.array;if(S!==null){let b=S.array;u=S.version;for(let w=0,F=0;w<v;w+=3){let P=b[w+0],I=b[w+1],k=b[w+2];A[F++]=P,A[F++]=I,A[F++]=I,A[F++]=k,A[F++]=k,A[F++]=P}}else{u=m.version;for(let b=0,w=0;b<v;b+=3){let F=b+0,P=b+1,I=b+2;A[w++]=F,A[w++]=P,A[w++]=P,A[w++]=I,A[w++]=I,A[w++]=F}}y.version=u;let T=r.get(g);T&&e.remove(T),r.set(g,y)}function d(g){let S=r.get(g);if(S){let m=g.index;m!==null&&S.version<m.version&&f(g)}else f(g);return r.get(g)}function p(){for(let g in s){let S=s[g].deref();S!==void 0&&l(S)}}return{get:c,update:h,getWireframeAttribute:d,dispose:p}}function X0(n,e,t){let i;function s(f){i=f}let r,a;function o(f){r=f.type,a=f.bytesPerElement}function l(f,d){n.drawElements(i,d,r,f*a),t.update(d,i,1)}function c(f,d,p){p!==0&&(n.drawElementsInstanced(i,d,r,f*a,p),t.update(d,i,p))}function h(f,d,p){if(p===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,d,0,r,f,0,p);let S=0;for(let m=0;m<p;m++)S+=d[m];t.update(S,i,1)}this.setMode=s,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=h}function j0(n){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,a,o){switch(t.calls++,a){case n.TRIANGLES:t.triangles+=o*(r/3);break;case n.LINES:t.lines+=o*(r/2);break;case n.LINE_STRIP:t.lines+=o*(r-1);break;case n.LINE_LOOP:t.lines+=o*r;break;case n.POINTS:t.points+=o*r;break;default:Ue("WebGLInfo: Unknown draw mode:",a);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:i}}function K0(n,e,t){let i=new WeakMap,s=new Ze;function r(a,o,l){let c=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,f=h!==void 0?h.length:0,d=i.get(o);if(d===void 0||d.count!==f){let F=function(){b.dispose(),i.delete(o),o.removeEventListener("dispose",F)};d!==void 0&&d.texture.dispose();let p=o.morphAttributes.position!==void 0,g=o.morphAttributes.normal!==void 0,S=o.morphAttributes.color!==void 0,m=o.morphAttributes.position||[],u=o.morphAttributes.normal||[],v=o.morphAttributes.color||[],E=0;p===!0&&(E=1),g===!0&&(E=2),S===!0&&(E=3);let y=o.attributes.position.count*E,A=1;y>e.maxTextureSize&&(A=Math.ceil(y/e.maxTextureSize),y=e.maxTextureSize);let T=new Float32Array(y*A*4*f),b=new nr(T,y,A,f);b.type=In,b.needsUpdate=!0;let w=E*4;for(let P=0;P<f;P++){let I=m[P],k=u[P],W=v[P],R=y*A*4*P;for(let H=0;H<I.count;H++){let j=H*w;p===!0&&(s.fromBufferAttribute(I,H),T[R+j+0]=s.x,T[R+j+1]=s.y,T[R+j+2]=s.z,T[R+j+3]=0),g===!0&&(s.fromBufferAttribute(k,H),T[R+j+4]=s.x,T[R+j+5]=s.y,T[R+j+6]=s.z,T[R+j+7]=0),S===!0&&(s.fromBufferAttribute(W,H),T[R+j+8]=s.x,T[R+j+9]=s.y,T[R+j+10]=s.z,T[R+j+11]=W.itemSize===4?s.w:1)}}d={count:f,texture:b,size:new De(y,A)},i.set(o,d),o.addEventListener("dispose",F)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(n,"morphTexture",a.morphTexture,t);else{let p=0;for(let S=0;S<c.length;S++)p+=c[S];let g=o.morphTargetsRelative?1:1-p;l.getUniforms().setValue(n,"morphTargetBaseInfluence",g),l.getUniforms().setValue(n,"morphTargetInfluences",c)}l.getUniforms().setValue(n,"morphTargetsTexture",d.texture,t),l.getUniforms().setValue(n,"morphTargetsTextureSize",d.size)}return{update:r}}function Y0(n,e,t,i,s){let r=new WeakMap;function a(c){let h=s.render.frame,f=c.geometry,d=e.get(c,f);if(r.get(d)!==h&&(e.update(d),r.set(d,h)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),r.get(c)!==h&&(t.update(c.instanceMatrix,n.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,n.ARRAY_BUFFER),r.set(c,h))),c.isSkinnedMesh){let p=c.skeleton;r.get(p)!==h&&(p.update(),r.set(p,h))}return d}function o(){r=new WeakMap}function l(c){let h=c.target;h.removeEventListener("dispose",l),i.releaseStatesOfObject(h),t.remove(h.instanceMatrix),h.instanceColor!==null&&t.remove(h.instanceColor)}return{update:a,dispose:o}}function Z0(n,e,t,i,s,r){let a=new mn(e,t,{type:n,depthBuffer:s,stencilBuffer:r,samples:i?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),o=null,l=null,c=null,h=new an;h.setAttribute("position",new yt([-1,3,0,-1,-1,0,3,-1,0],3)),h.setAttribute("uv",new yt([0,2,0,0,2,0],2));let f=new Aa({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),d=new St(h,f),p=new Vi(-1,1,1,-1,0,1),g=null,S=null,m=!1,u,v=null,E=[],y=!1;this.setSize=function(A,T){a.setSize(A,T),o!==null&&o.setSize(A,T),l!==null&&l.setSize(A,T);for(let b=0;b<E.length;b++){let w=E[b];w.setSize&&w.setSize(A,T)}},this.setEffects=function(A){E=A,y=E.length>0&&E[0].isRenderPass===!0;let T=a.width,b=a.height;E.length>0&&o===null&&(o=new mn(T,b,{type:Dn,depthBuffer:!1,stencilBuffer:!1}),l=new mn(T,b,{type:Dn,depthBuffer:!1,stencilBuffer:!1}));let w=s===!0&&E.some(F=>F.needsDepthTexture===!0);w!==(a.depthTexture!==null)&&(w===!0&&c===null&&(c=new ti(T,b),r===!0&&(c.format=ii,c.type=Xi)),a.dispose(),a.depthTexture=w?c:null,a.resolveDepthBuffer=w,a.storeMultisampledDepthBuffer=w);for(let F=0;F<E.length;F++){let P=E[F];P.setSize&&P.setSize(T,b),w&&P.needsDepthTexture===!0&&P.setDepthTexture&&P.setDepthTexture(c)}},this.begin=function(A,T){if(m||A.toneMapping===kn&&E.length===0)return!1;if(v=T,T!==null){let b=T.width,w=T.height;(a.width!==b||a.height!==w)&&this.setSize(b,w)}return y===!1&&A.setRenderTarget(a),u=A.toneMapping,A.toneMapping=kn,!0},this.hasRenderPass=function(){return y},this.end=function(A,T){A.toneMapping=u,m=!0;let b=a,w=o;for(let F=0;F<E.length;F++){let P=E[F];P.enabled!==!1&&(P.render(A,w,b,T),P.needsSwap!==!1&&(b=w,w=w===o?l:o))}if(g!==A.outputColorSpace||S!==A.toneMapping){g=A.outputColorSpace,S=A.toneMapping,f.defines={},Ke.getTransfer(g)===et&&(f.defines.SRGB_TRANSFER="");let F=J0[S];F&&(f.defines[F]=""),f.needsUpdate=!0}f.uniforms.tDiffuse.value=b.texture,A.setRenderTarget(v),A.render(d,p),v=null,m=!1},this.isCompositing=function(){return m},this.dispose=function(){a.dispose(),o!==null&&o.dispose(),l!==null&&l.dispose(),h.dispose(),f.dispose()}}function Ls(n,e,t){let i=n[0];if(i<=0||i>0)return n;let s=e*t,r=Qu[s];if(r===void 0&&(r=new Float32Array(s),Qu[s]=r),e!==0){i.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,n[a].toArray(r,o)}return r}function Mt(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function wt(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function Do(n,e){let t=ed[e];t===void 0&&(t=new Int32Array(e),ed[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function $0(n,e){let t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function Q0(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Mt(t,e))return;n.uniform2fv(this.addr,e),wt(t,e)}}function eb(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Mt(t,e))return;n.uniform3fv(this.addr,e),wt(t,e)}}function tb(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Mt(t,e))return;n.uniform4fv(this.addr,e),wt(t,e)}}function nb(n,e){let t=this.cache,i=e.elements;if(i===void 0){if(Mt(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),wt(t,e)}else{if(Mt(t,i))return;id.set(i),n.uniformMatrix2fv(this.addr,!1,id),wt(t,i)}}function ib(n,e){let t=this.cache,i=e.elements;if(i===void 0){if(Mt(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),wt(t,e)}else{if(Mt(t,i))return;nd.set(i),n.uniformMatrix3fv(this.addr,!1,nd),wt(t,i)}}function sb(n,e){let t=this.cache,i=e.elements;if(i===void 0){if(Mt(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),wt(t,e)}else{if(Mt(t,i))return;td.set(i),n.uniformMatrix4fv(this.addr,!1,td),wt(t,i)}}function rb(n,e){let t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function ab(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Mt(t,e))return;n.uniform2iv(this.addr,e),wt(t,e)}}function ob(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Mt(t,e))return;n.uniform3iv(this.addr,e),wt(t,e)}}function cb(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Mt(t,e))return;n.uniform4iv(this.addr,e),wt(t,e)}}function lb(n,e){let t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function hb(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Mt(t,e))return;n.uniform2uiv(this.addr,e),wt(t,e)}}function ub(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Mt(t,e))return;n.uniform3uiv(this.addr,e),wt(t,e)}}function db(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Mt(t,e))return;n.uniform4uiv(this.addr,e),wt(t,e)}}function No(n){return n.version===0&&(n.compareFunction=fl,n.needsUpdate=!0),n}function fb(n,e,t){let i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s);let r;this.type===n.SAMPLER_2D_SHADOW?r=No(yd):r=vd,t.setTexture2D(e||r,s)}function pb(n,e,t){let i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture3D(e||wd,s)}function mb(n,e,t){let i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s);let r;this.type===n.SAMPLER_CUBE_SHADOW?r=No(Sd):r=Ed,t.setTextureCube(e||r,s)}function gb(n,e,t){let i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture2DArray(e||Md,s)}function bb(n){switch(n){case 5126:return $0;case 35664:return Q0;case 35665:return eb;case 35666:return tb;case 35674:return nb;case 35675:return ib;case 35676:return sb;case 5124:case 35670:return rb;case 35667:case 35671:return ab;case 35668:case 35672:return ob;case 35669:case 35673:return cb;case 5125:return lb;case 36294:return hb;case 36295:return ub;case 36296:return db;case 35678:case 36198:case 36298:case 36306:case 35682:return fb;case 35679:case 36299:case 36307:return pb;case 35680:case 36300:case 36308:case 36293:return mb;case 36289:case 36303:case 36311:case 36292:return gb}}function _b(n,e){n.uniform1fv(this.addr,e)}function xb(n,e){let t=Ls(e,this.size,2);n.uniform2fv(this.addr,t)}function vb(n,e){let t=Ls(e,this.size,3);n.uniform3fv(this.addr,t)}function yb(n,e){let t=Ls(e,this.size,4);n.uniform4fv(this.addr,t)}function Sb(n,e){let t=Ls(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function Mb(n,e){let t=Ls(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function wb(n,e){let t=Ls(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function Eb(n,e){n.uniform1iv(this.addr,e)}function Tb(n,e){n.uniform2iv(this.addr,e)}function Ab(n,e){n.uniform3iv(this.addr,e)}function Cb(n,e){n.uniform4iv(this.addr,e)}function Rb(n,e){n.uniform1uiv(this.addr,e)}function Pb(n,e){n.uniform2uiv(this.addr,e)}function Lb(n,e){n.uniform3uiv(this.addr,e)}function Ib(n,e){n.uniform4uiv(this.addr,e)}function Db(n,e,t){let i=this.cache,s=e.length,r=Do(t,s);Mt(i,r)||(n.uniform1iv(this.addr,r),wt(i,r));let a;this.type===n.SAMPLER_2D_SHADOW?a=No(yd):a=vd;for(let o=0;o!==s;++o)t.setTexture2D(e[o]||a,r[o])}function Nb(n,e,t){let i=this.cache,s=e.length,r=Do(t,s);Mt(i,r)||(n.uniform1iv(this.addr,r),wt(i,r));for(let a=0;a!==s;++a)t.setTexture3D(e[a]||wd,r[a])}function Ub(n,e,t){let i=this.cache,s=e.length,r=Do(t,s);Mt(i,r)||(n.uniform1iv(this.addr,r),wt(i,r));let a;this.type===n.SAMPLER_CUBE_SHADOW?a=No(Sd):a=Ed;for(let o=0;o!==s;++o)t.setTextureCube(e[o]||a,r[o])}function Fb(n,e,t){let i=this.cache,s=e.length,r=Do(t,s);Mt(i,r)||(n.uniform1iv(this.addr,r),wt(i,r));for(let a=0;a!==s;++a)t.setTexture2DArray(e[a]||Md,r[a])}function Ob(n){switch(n){case 5126:return _b;case 35664:return xb;case 35665:return vb;case 35666:return yb;case 35674:return Sb;case 35675:return Mb;case 35676:return wb;case 5124:case 35670:return Eb;case 35667:case 35671:return Tb;case 35668:case 35672:return Ab;case 35669:case 35673:return Cb;case 5125:return Rb;case 36294:return Pb;case 36295:return Lb;case 36296:return Ib;case 35678:case 36198:case 36298:case 36306:case 35682:return Db;case 35679:case 36299:case 36307:return Nb;case 35680:case 36300:case 36308:case 36293:return Ub;case 36289:case 36303:case 36311:case 36292:return Fb}}function sd(n,e){n.seq.push(e),n.map[e.id]=e}function Bb(n,e,t){let i=n.name,s=i.length;for(El.lastIndex=0;;){let r=El.exec(i),a=El.lastIndex,o=r[1],l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===s){sd(t,c===void 0?new Al(o,n,e):new Cl(o,n,e));break}else{let f=t.map[o];f===void 0&&(f=new Rl(o),sd(t,f)),t=f}}}function rd(n,e,t){let i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}function Gb(n,e){let t=n.split(`
`),i=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=s;a<r;a++){let o=a+1;i.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return i.join(`
`)}function Vb(n){Ke._getMatrix(ad,Ke.workingColorSpace,n);let e=`mat3( ${ad.elements.map(t=>t.toFixed(4))} )`;switch(Ke.getTransfer(n)){case Qs:return[e,"LinearTransferOETF"];case et:return[e,"sRGBTransferOETF"];default:return Ne("WebGLProgram: Unsupported color space: ",n),[e,"LinearTransferOETF"]}}function od(n,e,t){let i=n.getShaderParameter(e,n.COMPILE_STATUS),r=(n.getShaderInfoLog(e)||"").trim();if(i&&r==="")return"";let a=/ERROR: 0:(\d+)/.exec(r);if(a){let o=parseInt(a[1]);return t.toUpperCase()+`

`+r+`

`+Gb(n.getShaderSource(e),o)}else return r}function Hb(n,e){let t=Vb(e);return[`vec4 ${n}( vec4 value ) {`,`	return ${t[1]}( vec4( ${t[0]} * value.rgb, value.a ) );`,"}"].join(`
`)}function qb(n,e){let t=Wb[e];return t===void 0?(Ne("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+n+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}function Xb(){Ke.getLuminanceCoefficients(Po);let n=Po.x.toFixed(4),e=Po.y.toFixed(4),t=Po.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function jb(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Lr).join(`
`)}function Kb(n){let e=[];for(let t in n){let i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function Yb(n,e){let t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){let r=n.getActiveAttrib(e,s),a=r.name,o=1;r.type===n.FLOAT_MAT2&&(o=2),r.type===n.FLOAT_MAT3&&(o=3),r.type===n.FLOAT_MAT4&&(o=4),t[a]={type:r.type,location:n.getAttribLocation(e,a),locationSize:o}}return t}function Lr(n){return n!==""}function cd(n,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_SUN_LIGHTS/g,e.numSunLights).replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,e.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows).replace(/NUM_LIGHT_PROBE_GRIDS/g,e.numLightProbeGrids)}function ld(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}function Pl(n){return n.replace(Jb,Zb)}function Zb(n,e){let t=He[e];if(t===void 0)throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">");return Pl(t)}function hd(n){return n.replace($b,Qb)}function Qb(n,e,t,i){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function ud(n){let e=`precision ${n.precision} float;
	precision ${n.precision} int;
	precision ${n.precision} sampler2D;
	precision ${n.precision} samplerCube;
	precision ${n.precision} sampler3D;
	precision ${n.precision} sampler2DArray;
	precision ${n.precision} sampler2DShadow;
	precision ${n.precision} samplerCubeShadow;
	precision ${n.precision} sampler2DArrayShadow;
	precision ${n.precision} isampler2D;
	precision ${n.precision} isampler3D;
	precision ${n.precision} isamplerCube;
	precision ${n.precision} isampler2DArray;
	precision ${n.precision} usampler2D;
	precision ${n.precision} usampler3D;
	precision ${n.precision} usamplerCube;
	precision ${n.precision} usampler2DArray;
	`;return n.precision==="highp"?e+=`
#define HIGH_PRECISION`:n.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function t_(n){return e_[n.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}function i_(n){return n.envMap===!1?"ENVMAP_MODE_REFLECTION":n_[n.envMapMode]||"ENVMAP_MODE_REFLECTION"}function r_(n){return n.envMap===!1?"ENVMAP_BLENDING_NONE":s_[n.combine]||"ENVMAP_BLENDING_NONE"}function a_(n,e,t,i){let s=n.getContext(),r=t.defines,a=t.vertexShader,o=t.fragmentShader,l=t_(t),c=t.envMapPMREM===!0?"ENVMAP_TYPE_PMREM":"ENVMAP_TYPE_CUBE",h=i_(t),f=r_(t),d=jb(t),p=Kb(r),g=s.createProgram(),S,m,u=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(S=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p].filter(Lr).join(`
`),S.length>0&&(S+=`
`),m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p].filter(Lr).join(`
`),m.length>0&&(m+=`
`)):(S=[ud(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.diffuseRoughnessMap?"#define USE_DIFFUSE_ROUGHNESSMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.diffuseRoughnessMapUv?"#define DIFFUSE_ROUGHNESSMAP_UV "+t.diffuseRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Lr).join(`
`),m=[ud(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+h:"",t.envMap?"#define "+f:"",t.envMapPMREM?"#define ENVMAP_MAX_LOD "+t.envMapMaxLod+".0":"",t.envMapPMREM?"#define ENVMAP_SIZE "+t.envMapSize+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.diffuseRoughness?"#define USE_DIFFUSE_ROUGHNESS":"",t.diffuseRoughnessMap?"#define USE_DIFFUSE_ROUGHNESSMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.retroreflection?"#define USE_RETROREFLECTION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==kn?"#define TONE_MAPPING":"",t.toneMapping!==kn?He.tonemapping_pars_fragment:"",t.toneMapping!==kn?qb("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",He.colorspace_pars_fragment,Hb("linearToOutputTexel",t.outputColorSpace),Xb(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Lr).join(`
`)),a=Pl(a),a=cd(a,t),a=ld(a,t),o=Pl(o),o=cd(o,t),o=ld(o,t),a=hd(a),o=hd(o),t.isRawShaderMaterial!==!0&&(u=`#version 300 es
`,S=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+S,m=["#define varying in",t.glslVersion===ml?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===ml?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);let v=u+S+a,E=u+m+o,y=rd(s,s.VERTEX_SHADER,v),A=rd(s,s.FRAGMENT_SHADER,E);s.attachShader(g,y),s.attachShader(g,A),t.index0AttributeName!==void 0?s.bindAttribLocation(g,0,t.index0AttributeName):t.hasPositionAttribute===!0&&s.bindAttribLocation(g,0,"position"),s.linkProgram(g);function T(P){if(n.debug.checkShaderErrors){let I=s.getProgramInfoLog(g)||"",k=s.getShaderInfoLog(y)||"",W=s.getShaderInfoLog(A)||"",R=I.trim(),H=k.trim(),j=W.trim(),z=!0,ie=!0;if(s.getProgramParameter(g,s.LINK_STATUS)===!1)if(z=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(s,g,y,A);else{let q=od(s,y,"vertex"),ee=od(s,A,"fragment");Ue("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(g,s.VALIDATE_STATUS)+`

Material Name: `+P.name+`
Material Type: `+P.type+`

Program Info Log: `+R+`
`+q+`
`+ee)}else R!==""?Ne("WebGLProgram: Program Info Log:",R):(H===""||j==="")&&(ie=!1);ie&&(P.diagnostics={runnable:z,programLog:R,vertexShader:{log:H,prefix:S},fragmentShader:{log:j,prefix:m}})}s.deleteShader(y),s.deleteShader(A),b=new Ps(s,g),w=Yb(s,g)}let b;this.getUniforms=function(){return b===void 0&&T(this),b};let w;this.getAttributes=function(){return w===void 0&&T(this),w};let F=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return F===!1&&(F=s.getProgramParameter(g,kb)),F},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(g),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=zb++,this.cacheKey=e,this.usedTimes=1,this.program=g,this.vertexShader=y,this.fragmentShader=A,this}function c_(n){return n===Ti||n===Ar||n===Cr}function l_(n,e,t,i,s,r){let a=new xs,o=new Ll,l=new Set,c=[],h=new Map,f=i.logarithmicDepthBuffer,d={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function p(b){return l.add(b),b===0?"uv":`uv${b}`}function g(b,w,F,P,I,k){let W=P.fog,R=I.geometry,H=b.isMeshStandardMaterial||b.isMeshLambertMaterial||b.isMeshPhongMaterial?P.environment:null,j=b.isMeshStandardMaterial||b.isMeshLambertMaterial&&!b.envMap||b.isMeshPhongMaterial&&!b.envMap,z=e.get(b.envMap||H,j),ie=d[b.type],q=i.precision;b.precision!==null&&(q=i.getMaxPrecision(b.precision),q!==b.precision&&Ne("WebGLProgram.getParameters:",b.precision,"not supported, using",q,"instead."));let ee=R.morphAttributes.position||R.morphAttributes.normal||R.morphAttributes.color,ne=ee!==void 0?ee.length:0,Te=0;R.morphAttributes.position!==void 0&&(Te=1),R.morphAttributes.normal!==void 0&&(Te=2),R.morphAttributes.color!==void 0&&(Te=3);let Fe,Y,be,_e;if(ie){let xe=cn[ie];Fe=xe.vertexShader,Y=xe.fragmentShader}else{Fe=b.vertexShader,Y=b.fragmentShader;let xe=o.getVertexShaderStage(b),nt=o.getFragmentShaderStage(b);o.update(b,xe,nt),be=xe.id,_e=nt.id}let Re=n.getRenderTarget(),ge=n.state.buffers.depth.getReversed(),Oe=I.isInstancedMesh===!0,dt=I.isBatchedMesh===!0,Ie=!!b.map,Je=!!b.matcap,tt=!!z,We=tt&&z.isPMREMTexture===!0,ft=!!b.aoMap,mt=!!b.lightMap,kt=!!b.bumpMap&&b.wireframe===!1,ct=!!b.normalMap,Dt=!!b.displacementMap,st=!!b.emissiveMap,Zt=!!b.metalnessMap,zt=!!b.roughnessMap,$t=b.anisotropy>0,D=b.clearcoat>0,Gt=b.diffuseRoughness>0,at=b.dispersion>0,Q=b.retroreflectivity>0,G=b.iridescence>0,ue=b.sheen>0,de=b.transmission>0,ve=$t&&!!b.anisotropyMap,M=D&&!!b.clearcoatMap,_=D&&!!b.clearcoatNormalMap,U=D&&!!b.clearcoatRoughnessMap,te=Gt&&!!b.diffuseRoughnessMap,Z=G&&!!b.iridescenceMap,re=G&&!!b.iridescenceThicknessMap,oe=ue&&!!b.sheenColorMap,K=ue&&!!b.sheenRoughnessMap,J=!!b.specularMap,ce=!!b.specularColorMap,C=!!b.specularIntensityMap,$=de&&!!b.transmissionMap,X=de&&!!b.thicknessMap,le=!!b.gradientMap,ae=!!b.alphaMap,he=b.alphaTest>0,Pe=!!b.alphaHash,Ve=!!b.extensions,se=kn;b.toneMapped&&(Re===null||Re.isXRRenderTarget===!0)&&(se=n.toneMapping);let Le=We?z.isCompressedCubeTexture?z.image[0].mipmaps:z.mipmaps:null,Ge={shaderID:ie,shaderType:b.type,shaderName:b.name,vertexShader:Fe,fragmentShader:Y,defines:b.defines,customVertexShaderID:be,customFragmentShaderID:_e,isRawShaderMaterial:b.isRawShaderMaterial===!0,glslVersion:b.glslVersion,precision:q,batching:dt,batchingColor:dt&&I._colorsTexture!==null,instancing:Oe,instancingColor:Oe&&I.instanceColor!==null,instancingMorph:Oe&&I.morphTexture!==null,outputColorSpace:Re===null?n.outputColorSpace:Re.isXRRenderTarget===!0?Re.texture.colorSpace:Ke.workingColorSpace,alphaToCoverage:!!b.alphaToCoverage,map:Ie,matcap:Je,envMap:tt,envMapMode:tt&&z.mapping,envMapPMREM:We,envMapMaxLod:We?Le.length-1:null,envMapSize:We?Le[0].width:null,aoMap:ft,lightMap:mt,bumpMap:kt,normalMap:ct,displacementMap:Dt,emissiveMap:st,normalMapObjectSpace:ct&&b.normalMapType===Uu,normalMapTangentSpace:ct&&b.normalMapType===Ao,packedNormalMap:ct&&b.normalMapType===Ao&&c_(b.normalMap.format),metalnessMap:Zt,roughnessMap:zt,anisotropy:$t,anisotropyMap:ve,clearcoat:D,clearcoatMap:M,clearcoatNormalMap:_,clearcoatRoughnessMap:U,diffuseRoughness:Gt,diffuseRoughnessMap:te,dispersion:at,retroreflection:Q,iridescence:G,iridescenceMap:Z,iridescenceThicknessMap:re,sheen:ue,sheenColorMap:oe,sheenRoughnessMap:K,specularMap:J,specularColorMap:ce,specularIntensityMap:C,transmission:de,transmissionMap:$,thicknessMap:X,gradientMap:le,opaque:b.transparent===!1&&b.blending===As&&b.alphaToCoverage===!1,alphaMap:ae,alphaTest:he,alphaHash:Pe,combine:b.combine,mapUv:Ie&&p(b.map.channel),aoMapUv:ft&&p(b.aoMap.channel),lightMapUv:mt&&p(b.lightMap.channel),bumpMapUv:kt&&p(b.bumpMap.channel),normalMapUv:ct&&p(b.normalMap.channel),displacementMapUv:Dt&&p(b.displacementMap.channel),emissiveMapUv:st&&p(b.emissiveMap.channel),metalnessMapUv:Zt&&p(b.metalnessMap.channel),roughnessMapUv:zt&&p(b.roughnessMap.channel),anisotropyMapUv:ve&&p(b.anisotropyMap.channel),clearcoatMapUv:M&&p(b.clearcoatMap.channel),clearcoatNormalMapUv:_&&p(b.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:U&&p(b.clearcoatRoughnessMap.channel),diffuseRoughnessMapUv:te&&p(b.diffuseRoughnessMap.channel),iridescenceMapUv:Z&&p(b.iridescenceMap.channel),iridescenceThicknessMapUv:re&&p(b.iridescenceThicknessMap.channel),sheenColorMapUv:oe&&p(b.sheenColorMap.channel),sheenRoughnessMapUv:K&&p(b.sheenRoughnessMap.channel),specularMapUv:J&&p(b.specularMap.channel),specularColorMapUv:ce&&p(b.specularColorMap.channel),specularIntensityMapUv:C&&p(b.specularIntensityMap.channel),transmissionMapUv:$&&p(b.transmissionMap.channel),thicknessMapUv:X&&p(b.thicknessMap.channel),alphaMapUv:ae&&p(b.alphaMap.channel),vertexTangents:!!R.attributes.tangent&&(ct||$t),vertexNormals:!!R.attributes.normal,vertexColors:b.vertexColors,vertexAlphas:b.vertexColors===!0&&!!R.attributes.color&&R.attributes.color.itemSize===4,pointsUvs:I.isPoints===!0&&!!R.attributes.uv&&(Ie||ae),fog:!!W,useFog:b.fog===!0,fogExp2:!!W&&W.isFogExp2,flatShading:b.wireframe===!1&&(b.flatShading===!0||R.attributes.normal===void 0&&ct===!1&&(b.isMeshLambertMaterial||b.isMeshPhongMaterial||b.isMeshStandardMaterial||b.isMeshPhysicalMaterial)),sizeAttenuation:b.sizeAttenuation===!0,logarithmicDepthBuffer:f,reversedDepthBuffer:ge,skinning:I.isSkinnedMesh===!0,hasPositionAttribute:R.attributes.position!==void 0,morphTargets:R.morphAttributes.position!==void 0,morphNormals:R.morphAttributes.normal!==void 0,morphColors:R.morphAttributes.color!==void 0,morphTargetsCount:ne,morphTextureStride:Te,numSunLights:w.sun.length,numDirLights:w.directional.length,numPointLights:w.point.length,numSpotLights:w.spot.length,numSpotLightMaps:w.spotLightMap.length,numRectAreaLights:w.rectArea.length,numHemiLights:w.hemi.length,numSunLightShadows:w.sunShadowMap.length,numDirLightShadows:w.directionalShadowMap.length,numPointLightShadows:w.pointShadowMap.length,numSpotLightShadows:w.spotShadowMap.length,numSpotLightShadowsWithMaps:w.numSpotLightShadowsWithMaps,numLightProbes:w.numLightProbes,numLightProbeGrids:k.filter(xe=>xe.texture!==null).length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:b.dithering,shadowMapEnabled:n.shadowMap.enabled&&F.length>0,shadowMapType:n.shadowMap.type,toneMapping:se,decodeVideoTexture:Ie&&b.map.isVideoTexture===!0&&Ke.getTransfer(b.map.colorSpace)===et,decodeVideoTextureEmissive:st&&b.emissiveMap.isVideoTexture===!0&&Ke.getTransfer(b.emissiveMap.colorSpace)===et,premultipliedAlpha:b.premultipliedAlpha,doubleSided:b.side===bn,flipSided:b.side===on,useDepthPacking:b.depthPacking>=0,depthPacking:b.depthPacking||0,index0AttributeName:b.index0AttributeName,extensionClipCullDistance:Ve&&b.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Ve&&b.extensions.multiDraw===!0||dt)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:b.customProgramCacheKey()};return Ge.vertexUv1s=l.has(1),Ge.vertexUv2s=l.has(2),Ge.vertexUv3s=l.has(3),l.clear(),Ge}function S(b){let w=[];if(b.shaderID?w.push(b.shaderID):(w.push(b.customVertexShaderID),w.push(b.customFragmentShaderID)),b.defines!==void 0)for(let F in b.defines)w.push(F),w.push(b.defines[F]);return b.isRawShaderMaterial===!1&&(m(w,b),u(w,b),w.push(n.outputColorSpace)),w.push(b.customProgramCacheKey),w.join()}function m(b,w){b.push(w.precision),b.push(w.outputColorSpace),b.push(w.envMapMode),b.push(w.envMapPMREM),b.push(w.envMapMaxLod),b.push(w.envMapSize),b.push(w.mapUv),b.push(w.alphaMapUv),b.push(w.lightMapUv),b.push(w.aoMapUv),b.push(w.bumpMapUv),b.push(w.normalMapUv),b.push(w.displacementMapUv),b.push(w.emissiveMapUv),b.push(w.metalnessMapUv),b.push(w.roughnessMapUv),b.push(w.anisotropyMapUv),b.push(w.clearcoatMapUv),b.push(w.clearcoatNormalMapUv),b.push(w.clearcoatRoughnessMapUv),b.push(w.diffuseRoughnessMapUv),b.push(w.iridescenceMapUv),b.push(w.iridescenceThicknessMapUv),b.push(w.sheenColorMapUv),b.push(w.sheenRoughnessMapUv),b.push(w.specularMapUv),b.push(w.specularColorMapUv),b.push(w.specularIntensityMapUv),b.push(w.transmissionMapUv),b.push(w.thicknessMapUv),b.push(w.combine),b.push(w.fogExp2),b.push(w.sizeAttenuation),b.push(w.morphTargetsCount),b.push(w.numSunLights),b.push(w.numDirLights),b.push(w.numPointLights),b.push(w.numSpotLights),b.push(w.numSpotLightMaps),b.push(w.numHemiLights),b.push(w.numRectAreaLights),b.push(w.numSunLightShadows),b.push(w.numDirLightShadows),b.push(w.numPointLightShadows),b.push(w.numSpotLightShadows),b.push(w.numSpotLightShadowsWithMaps),b.push(w.numLightProbes),b.push(w.numLightProbeGrids),b.push(w.shadowMapType),b.push(w.toneMapping),b.push(w.numClippingPlanes),b.push(w.numClipIntersection),b.push(w.depthPacking)}function u(b,w){a.disableAll(),w.instancing&&a.enable(0),w.instancingColor&&a.enable(1),w.instancingMorph&&a.enable(2),w.matcap&&a.enable(3),w.envMap&&a.enable(4),w.normalMapObjectSpace&&a.enable(5),w.normalMapTangentSpace&&a.enable(6),w.clearcoat&&a.enable(7),w.iridescence&&a.enable(8),w.alphaTest&&a.enable(9),w.vertexColors&&a.enable(10),w.vertexAlphas&&a.enable(11),w.vertexUv1s&&a.enable(12),w.vertexUv2s&&a.enable(13),w.vertexUv3s&&a.enable(14),w.vertexTangents&&a.enable(15),w.anisotropy&&a.enable(16),w.alphaHash&&a.enable(17),w.batching&&a.enable(18),w.dispersion&&a.enable(19),w.retroreflection&&a.enable(24),w.diffuseRoughness&&a.enable(25),w.batchingColor&&a.enable(20),w.gradientMap&&a.enable(21),w.packedNormalMap&&a.enable(22),w.vertexNormals&&a.enable(23),b.push(a.mask),a.disableAll(),w.fog&&a.enable(0),w.useFog&&a.enable(1),w.flatShading&&a.enable(2),w.logarithmicDepthBuffer&&a.enable(3),w.reversedDepthBuffer&&a.enable(4),w.skinning&&a.enable(5),w.morphTargets&&a.enable(6),w.morphNormals&&a.enable(7),w.morphColors&&a.enable(8),w.premultipliedAlpha&&a.enable(9),w.shadowMapEnabled&&a.enable(10),w.doubleSided&&a.enable(11),w.flipSided&&a.enable(12),w.useDepthPacking&&a.enable(13),w.dithering&&a.enable(14),w.transmission&&a.enable(15),w.sheen&&a.enable(16),w.opaque&&a.enable(17),w.pointsUvs&&a.enable(18),w.decodeVideoTexture&&a.enable(19),w.decodeVideoTextureEmissive&&a.enable(20),w.alphaToCoverage&&a.enable(21),w.numLightProbeGrids>0&&a.enable(22),w.hasPositionAttribute&&a.enable(23),b.push(a.mask)}function v(b){let w=d[b.type],F;if(w){let P=cn[w];F=Rr.clone(P.uniforms)}else F=b.uniforms;return F}function E(b,w){let F=h.get(w);return F!==void 0?++F.usedTimes:(F=new a_(n,w,b,s),c.push(F),h.set(w,F)),F}function y(b){if(--b.usedTimes===0){let w=c.indexOf(b);c[w]=c[c.length-1],c.pop(),h.delete(b.cacheKey),b.destroy()}}function A(b){o.remove(b)}function T(){o.dispose()}return{getParameters:g,getProgramCacheKey:S,getUniforms:v,acquireProgram:E,releaseProgram:y,releaseShaderCache:A,programs:c,dispose:T}}function h_(){let n=new WeakMap;function e(a){return n.has(a)}function t(a){let o=n.get(a);return o===void 0&&(o={},n.set(a,o)),o}function i(a){n.delete(a)}function s(a,o,l){n.get(a)[o]=l}function r(){n=new WeakMap}return{has:e,get:t,remove:i,update:s,dispose:r}}function u_(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.materialVariant!==e.materialVariant?n.materialVariant-e.materialVariant:n.z!==e.z?n.z-e.z:n.id-e.id}function dd(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function fd(){let n=[],e=0,t=[],i=[],s=[];function r(){e=0,t.length=0,i.length=0,s.length=0}function a(d){let p=0;return d.isInstancedMesh&&(p+=2),d.isSkinnedMesh&&(p+=1),p}function o(d,p,g,S,m,u){let v=n[e];return v===void 0?(v={id:d.id,object:d,geometry:p,material:g,materialVariant:a(d),groupOrder:S,renderOrder:d.renderOrder,z:m,group:u},n[e]=v):(v.id=d.id,v.object=d,v.geometry=p,v.material=g,v.materialVariant=a(d),v.groupOrder=S,v.renderOrder=d.renderOrder,v.z=m,v.group=u),e++,v}function l(d,p,g,S,m,u,v){v.reversedDepth===!0&&(m=-m);let E=o(d,p,g,S,m,u);g.transmission>0?i.push(E):g.transparent===!0?s.push(E):t.push(E)}function c(d,p,g,S,m,u){let v=o(d,p,g,S,m,u);g.transmission>0?i.unshift(v):g.transparent===!0?s.unshift(v):t.unshift(v)}function h(d,p){t.length>1&&t.sort(d||u_),i.length>1&&i.sort(p||dd),s.length>1&&s.sort(p||dd)}function f(){for(let d=e,p=n.length;d<p;d++){let g=n[d];if(g.id===null)break;g.id=null,g.object=null,g.geometry=null,g.material=null,g.group=null}}return{opaque:t,transmissive:i,transparent:s,init:r,push:l,unshift:c,finish:f,sort:h}}function d_(){let n=new WeakMap;function e(i,s){let r=n.get(i),a;return r===void 0?(a=new fd,n.set(i,[a])):s>=r.length?(a=new fd,r.push(a)):a=r[s],a}function t(){n=new WeakMap}return{get:e,dispose:t}}function f_(){let n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={direction:new N,color:new qe};break;case"SpotLight":t={position:new N,direction:new N,color:new qe,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new N,color:new qe,distance:0,decay:0};break;case"HemisphereLight":t={direction:new N,skyColor:new qe,groundColor:new qe};break;case"RectAreaLight":t={color:new qe,position:new N,halfWidth:new N,halfHeight:new N};break}return n[e.id]=t,t}}}function p_(){let n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new De};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new De};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new De,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}function g_(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function b_(n){let e=new f_,t=p_(),i={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new N);let s=new N,r=new it,a=new it;function o(c){let h=0,f=0,d=0;for(let k=0;k<9;k++)i.probe[k].set(0,0,0);let p=0,g=0,S=0,m=0,u=0,v=0,E=0,y=0,A=0,T=0,b=0,w=0,F=0,P=0;c.sort(g_);for(let k=0,W=c.length;k<W;k++){let R=c[k],H=R.color,j=R.intensity,z=R.distance,ie=null;if(R.shadow&&R.shadow.map&&(R.shadow.map.texture.format===Ti?ie=R.shadow.map.texture:ie=R.shadow.map.depthTexture||R.shadow.map.texture),R.isAmbientLight)h+=H.r*j,f+=H.g*j,d+=H.b*j;else if(R.isLightProbe){for(let q=0;q<9;q++)i.probe[q].addScaledVector(R.sh.coefficients[q],j);P++}else if(R.isSunLight){let q=e.get(R);if(q.color.copy(R.color).multiplyScalar(R.intensity),R.castShadow){let ee=R.shadow,ne=t.get(R);ne.shadowIntensity=ee.intensity,ne.shadowBias=ee.bias,ne.shadowNormalBias=ee.normalBias,ne.shadowRadius=ee.radius,ne.shadowMapSize.copy(ee.mapSize).multiply(ee.getFrameExtents()),i.sunShadow[g]=ne,i.sunShadowMap[g]=ie;let Te=ee.getViewportCount();for(let Fe=0;Fe<Te;Fe++)i.sunShadowMatrix[S+Fe]=ee.getMatrix(Fe),i.sunShadowCascade[S+Fe]=ee._cascadeData[Fe];S+=Te,g++}i.sun[p]=q,p++}else if(R.isDirectionalLight){let q=e.get(R);if(q.color.copy(R.color).multiplyScalar(R.intensity),R.castShadow){let ee=R.shadow,ne=t.get(R);ne.shadowIntensity=ee.intensity,ne.shadowBias=ee.bias,ne.shadowNormalBias=ee.normalBias,ne.shadowRadius=ee.radius,ne.shadowMapSize=ee.mapSize,i.directionalShadow[m]=ne,i.directionalShadowMap[m]=ie,i.directionalShadowMatrix[m]=R.shadow.matrix,A++}i.directional[m]=q,m++}else if(R.isSpotLight){let q=e.get(R);q.position.setFromMatrixPosition(R.matrixWorld),q.color.copy(H).multiplyScalar(j),q.distance=z,q.coneCos=Math.cos(R.angle),q.penumbraCos=Math.cos(R.angle*(1-R.penumbra)),q.decay=R.decay,i.spot[v]=q;let ee=R.shadow;if(R.map&&(i.spotLightMap[w]=R.map,w++,ee.updateMatrices(R),R.castShadow&&F++),i.spotLightMatrix[v]=ee.matrix,R.castShadow){let ne=t.get(R);ne.shadowIntensity=ee.intensity,ne.shadowBias=ee.bias,ne.shadowNormalBias=ee.normalBias,ne.shadowRadius=ee.radius,ne.shadowMapSize=ee.mapSize,i.spotShadow[v]=ne,i.spotShadowMap[v]=ie,b++}v++}else if(R.isRectAreaLight){let q=e.get(R);q.color.copy(H).multiplyScalar(j),q.halfWidth.set(R.width*.5,0,0),q.halfHeight.set(0,R.height*.5,0),i.rectArea[E]=q,E++}else if(R.isPointLight){let q=e.get(R);if(q.color.copy(R.color).multiplyScalar(R.intensity),q.distance=R.distance,q.decay=R.decay,R.castShadow){let ee=R.shadow,ne=t.get(R);ne.shadowIntensity=ee.intensity,ne.shadowBias=ee.bias,ne.shadowNormalBias=ee.normalBias,ne.shadowRadius=ee.radius,ne.shadowMapSize=ee.mapSize,ne.shadowCameraNear=ee.camera.near,ne.shadowCameraFar=ee.camera.far,i.pointShadow[u]=ne,i.pointShadowMap[u]=ie,i.pointShadowMatrix[u]=R.shadow.matrix,T++}i.point[u]=q,u++}else if(R.isHemisphereLight){let q=e.get(R);q.skyColor.copy(R.color).multiplyScalar(j),q.groundColor.copy(R.groundColor).multiplyScalar(j),i.hemi[y]=q,y++}}E>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=me.LTC_FLOAT_1,i.rectAreaLTC2=me.LTC_FLOAT_2):(i.rectAreaLTC1=me.LTC_HALF_1,i.rectAreaLTC2=me.LTC_HALF_2)),i.ambient[0]=h,i.ambient[1]=f,i.ambient[2]=d;let I=i.hash;(I.sunLength!==p||I.directionalLength!==m||I.pointLength!==u||I.spotLength!==v||I.rectAreaLength!==E||I.hemiLength!==y||I.numSunShadows!==g||I.numDirectionalShadows!==A||I.numPointShadows!==T||I.numSpotShadows!==b||I.numSpotMaps!==w||I.numLightProbes!==P)&&(i.sun.length=p,i.directional.length=m,i.spot.length=v,i.rectArea.length=E,i.point.length=u,i.hemi.length=y,i.sunShadow.length=g,i.sunShadowMap.length=g,i.sunShadowMatrix.length=S,i.sunShadowCascade.length=S,i.directionalShadow.length=A,i.directionalShadowMap.length=A,i.directionalShadowMatrix.length=A,i.pointShadow.length=T,i.pointShadowMap.length=T,i.pointShadowMatrix.length=T,i.spotShadow.length=b,i.spotShadowMap.length=b,i.spotLightMatrix.length=b+w-F,i.spotLightMap.length=w,i.numSpotLightShadowsWithMaps=F,i.numLightProbes=P,I.sunLength=p,I.directionalLength=m,I.pointLength=u,I.spotLength=v,I.rectAreaLength=E,I.hemiLength=y,I.numSunShadows=g,I.numDirectionalShadows=A,I.numPointShadows=T,I.numSpotShadows=b,I.numSpotMaps=w,I.numLightProbes=P,i.version=m_++)}function l(c,h){let f=0,d=0,p=0,g=0,S=0,m=0,u=h.matrixWorldInverse;for(let v=0,E=c.length;v<E;v++){let y=c[v];if(y.isSunLight){let A=i.sun[f];A.direction.setFromMatrixPosition(y.matrixWorld),A.direction.transformDirection(u),f++}else if(y.isDirectionalLight){let A=i.directional[d];A.direction.setFromMatrixPosition(y.matrixWorld),s.setFromMatrixPosition(y.target.matrixWorld),A.direction.sub(s),A.direction.transformDirection(u),d++}else if(y.isSpotLight){let A=i.spot[g];A.position.setFromMatrixPosition(y.matrixWorld),A.position.applyMatrix4(u),A.direction.setFromMatrixPosition(y.matrixWorld),s.setFromMatrixPosition(y.target.matrixWorld),A.direction.sub(s),A.direction.transformDirection(u),g++}else if(y.isRectAreaLight){let A=i.rectArea[S];A.position.setFromMatrixPosition(y.matrixWorld),A.position.applyMatrix4(u),a.identity(),r.copy(y.matrixWorld),r.premultiply(u),a.extractRotation(r),A.halfWidth.set(y.width*.5,0,0),A.halfHeight.set(0,y.height*.5,0),A.halfWidth.applyMatrix4(a),A.halfHeight.applyMatrix4(a),S++}else if(y.isPointLight){let A=i.point[p];A.position.setFromMatrixPosition(y.matrixWorld),A.position.applyMatrix4(u),p++}else if(y.isHemisphereLight){let A=i.hemi[m];A.direction.setFromMatrixPosition(y.matrixWorld),A.direction.transformDirection(u),m++}}}return{setup:o,setupView:l,state:i}}function pd(n){let e=new b_(n),t=[],i=[],s=[];function r(f){h.camera=f,t.length=0,i.length=0,s.length=0}function a(f){f.isLightProbeGrid?s.push(f):t.push(f)}function o(f){i.push(f)}function l(){e.setup(t),s.sort((f,d)=>f.priority-d.priority||f.id-d.id)}function c(f){e.setupView(t,f)}let h={lightsArray:t,shadowsArray:i,lightProbeGridArray:s,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:h,setupLights:l,setupLightsView:c,pushLight:a,pushShadow:o}}function __(n){let e=new WeakMap;function t(s,r=0){let a=e.get(s),o;return a===void 0?(o=new pd(n),e.set(s,[o])):r>=a.length?(o=new pd(n),a.push(o)):o=a[r],o}function i(){e=new WeakMap}return{get:t,dispose:i}}function M_(n,e,t){let i=new bi,s=new De,r=new De,a=new Ze,o=new Ca,l=new Ra,c={},h=t.maxTextureSize,f={[Ei]:on,[on]:Ei,[bn]:bn},d=new Sn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new De},radius:{value:4}},vertexShader:x_,fragmentShader:v_}),p=d.clone();p.defines.HORIZONTAL_PASS=1;let g=new an;g.setAttribute("position",new gt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let S=new St(g,d),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=vr;let u=this.type;this.render=function(T,b,w){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||T.length===0)return;this.type===du&&(Ne("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=vr);let F=n.getRenderTarget(),P=n.getActiveCubeFace(),I=n.getActiveMipmapLevel(),k=n.state;k.setBlending(Hi),k.buffers.depth.getReversed()===!0?k.buffers.color.setClear(0,0,0,0):k.buffers.color.setClear(1,1,1,1),k.buffers.depth.setTest(!0),k.setScissorTest(!1);let W=u!==this.type;W&&b.traverse(function(R){R.material&&(Array.isArray(R.material)?R.material.forEach(H=>H.needsUpdate=!0):R.material.needsUpdate=!0)});for(let R=0,H=T.length;R<H;R++){let j=T[R],z=j.shadow;if(z===void 0){Ne("WebGLShadowMap:",j,"has no shadow.");continue}if(z.autoUpdate===!1&&z.needsUpdate===!1)continue;s.copy(z.mapSize);let ie=z.getFrameExtents();s.multiply(ie),r.copy(z.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/ie.x),s.x=r.x*ie.x,z.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/ie.y),s.y=r.y*ie.y,z.mapSize.y=r.y));let q=n.state.buffers.depth.getReversed();if(z.camera._reversedDepth=q,z.map===null||W===!0){if(z.map!==null&&(z.map.depthTexture!==null&&(z.map.depthTexture.dispose(),z.map.depthTexture=null),z.map.dispose()),this.type===Ts){if(j.isPointLight){Ne("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}z.map=new mn(s.x,s.y,{format:Ti,type:Dn,minFilter:nn,magFilter:nn,generateMipmaps:!1}),z.map.texture.name=j.name+".shadowMap",z.map.depthTexture=new ti(s.x,s.y,In),z.map.depthTexture.name=j.name+".shadowMapDepth",z.map.depthTexture.format=Qn,z.map.depthTexture.compareFunction=null,z.map.depthTexture.minFilter=Rt,z.map.depthTexture.magFilter=Rt}else j.isPointLight?(z.map=new Ir(s.x),z.map.depthTexture=new cr(s.x,Ln)):(z.map=new mn(s.x,s.y),z.map.depthTexture=new ti(s.x,s.y,Ln)),z.map.depthTexture.name=j.name+".shadowMap",z.map.depthTexture.format=Qn,this.type===vr?(z.map.depthTexture.compareFunction=q?dl:ul,z.map.depthTexture.minFilter=nn,z.map.depthTexture.magFilter=nn):(z.map.depthTexture.compareFunction=null,z.map.depthTexture.minFilter=Rt,z.map.depthTexture.magFilter=Rt);z.camera.updateProjectionMatrix()}z.map.isWebGLCubeRenderTarget!==!0&&(z.map.width!==s.x||z.map.height!==s.y)&&z.map.setSize(s.x,s.y);let ee=z.map.isWebGLCubeRenderTarget?6:z.getViewportCount();j.isPointLight!==!0&&z.updateMatrices(j,w);let ne=(z.camera.layers.mask&4294967294)!==0?z.camera.layers:w.layers;for(let Te=0;Te<ee;Te++){let Fe=z.getCamera(Te);if(j.isPointLight){let Y=z.camera,be=z.matrix,_e=j.distance||Y.far;_e!==Y.far&&(Y.far=_e,Y.updateProjectionMatrix()),Pr.setFromMatrixPosition(j.matrixWorld),Y.position.copy(Pr),Tl.copy(Y.position),Tl.add(y_[Te]),Y.up.copy(S_[Te]),Y.lookAt(Tl),Y.updateMatrixWorld(),be.makeTranslation(-Pr.x,-Pr.y,-Pr.z),md.multiplyMatrices(Y.projectionMatrix,Y.matrixWorldInverse),z._frustum.setFromProjectionMatrix(md,Y.coordinateSystem,Y.reversedDepth)}if(z.map.isWebGLCubeRenderTarget)n.setRenderTarget(z.map,Te),n.clear();else{Te===0&&(n.setRenderTarget(z.map),n.clear());let Y=z.getViewport(Te);a.set(r.x*Y.x,r.y*Y.y,r.x*Y.z,r.y*Y.w),k.viewport(a)}i=z.getFrustum(Te),y(b,w,Fe,j,ne,this.type)}z.isPointLightShadow!==!0&&this.type===Ts&&v(z,w),z.needsUpdate=!1}u=this.type,m.needsUpdate=!1,n.setRenderTarget(F,P,I)};function v(T,b){let w=e.update(S);d.defines.VSM_SAMPLES!==T.blurSamples&&(d.defines.VSM_SAMPLES=T.blurSamples,p.defines.VSM_SAMPLES=T.blurSamples,d.needsUpdate=!0,p.needsUpdate=!0),T.mapPass===null?T.mapPass=new mn(s.x,s.y,{format:Ti,type:Dn}):(T.mapPass.width!==T.map.width||T.mapPass.height!==T.map.height)&&T.mapPass.setSize(T.map.width,T.map.height),d.uniforms.shadow_pass.value=T.map.depthTexture,d.uniforms.resolution.value.set(T.map.width,T.map.height),d.uniforms.radius.value=T.radius,n.setRenderTarget(T.mapPass),n.clear(),n.renderBufferDirect(b,null,w,d,S,null),p.uniforms.shadow_pass.value=T.mapPass.texture,p.uniforms.resolution.value.set(T.map.width,T.map.height),p.uniforms.radius.value=T.radius,n.setRenderTarget(T.map),n.clear(),n.renderBufferDirect(b,null,w,p,S,null)}function E(T,b,w,F){let P=null,I=w.isPointLight===!0?T.customDistanceMaterial:T.customDepthMaterial;if(I!==void 0)P=I;else if(P=w.isPointLight===!0?l:o,n.localClippingEnabled&&b.clipShadows===!0&&Array.isArray(b.clippingPlanes)&&b.clippingPlanes.length!==0||b.displacementMap&&b.displacementScale!==0||b.alphaMap&&b.alphaTest>0||b.map&&b.alphaTest>0||b.alphaToCoverage===!0){let k=P.uuid,W=b.uuid,R=c[k];R===void 0&&(R={},c[k]=R);let H=R[W];H===void 0&&(H=P.clone(),R[W]=H,b.addEventListener("dispose",A)),P=H}if(P.visible=b.visible,P.wireframe=b.wireframe,F===Ts?P.side=b.shadowSide!==null?b.shadowSide:b.side:P.side=b.shadowSide!==null?b.shadowSide:f[b.side],P.alphaMap=b.alphaMap,P.alphaTest=b.alphaToCoverage===!0?.5:b.alphaTest,P.map=b.map,P.clipShadows=b.clipShadows,P.clippingPlanes=b.clippingPlanes,P.clipIntersection=b.clipIntersection,P.displacementMap=b.displacementMap,P.displacementScale=b.displacementScale,P.displacementBias=b.displacementBias,P.wireframeLinewidth=b.wireframeLinewidth,P.linewidth=b.linewidth,w.isPointLight===!0&&P.isMeshDistanceMaterial===!0){let k=n.properties.get(P);k.light=w}return P}function y(T,b,w,F,P,I){if(T.visible===!1)return;if(T.layers.test(P)&&(T.isMesh||T.isLine||T.isPoints)&&(T.castShadow||T.receiveShadow&&I===Ts)&&(!T.frustumCulled||T.intersectsFrustum(i))){T.modelViewMatrix.multiplyMatrices(w.matrixWorldInverse,T.matrixWorld);let R=e.update(T),H=T.material;if(Array.isArray(H)){let j=R.groups;for(let z=0,ie=j.length;z<ie;z++){let q=j[z],ee=H[q.materialIndex];if(ee&&ee.visible){let ne=E(T,ee,F,I);T.onBeforeShadow(n,T,b,w,R,ne,q),n.renderBufferDirect(w,null,R,ne,T,q),T.onAfterShadow(n,T,b,w,R,ne,q)}}}else if(H.visible){let j=E(T,H,F,I);T.onBeforeShadow(n,T,b,w,R,j,null),n.renderBufferDirect(w,null,R,j,T,null),T.onAfterShadow(n,T,b,w,R,j,null)}}let W=T.children;for(let R=0,H=W.length;R<H;R++)y(W[R],b,w,F,P,I)}function A(T){T.target.removeEventListener("dispose",A);for(let w in c){let F=c[w],P=T.target.uuid;P in F&&(F[P].dispose(),delete F[P])}}}function w_(n,e){function t(){let C=!1,$=new Ze,X=null,le=new Ze(0,0,0,0);return{setMask:function(ae){X!==ae&&!C&&(n.colorMask(ae,ae,ae,ae),X=ae)},setLocked:function(ae){C=ae},setClear:function(ae,he,Pe,Ve,se){se===!0&&(ae*=Ve,he*=Ve,Pe*=Ve),$.set(ae,he,Pe,Ve),le.equals($)===!1&&(n.clearColor(ae,he,Pe,Ve),le.copy($))},reset:function(){C=!1,X=null,le.set(-1,0,0,0)}}}function i(){let C=!1,$=!1,X=null,le=null,ae=null;return{setReversed:function(he){if($!==he){let Pe=e.get("EXT_clip_control");he?Pe.clipControlEXT(Pe.LOWER_LEFT_EXT,Pe.ZERO_TO_ONE_EXT):Pe.clipControlEXT(Pe.LOWER_LEFT_EXT,Pe.NEGATIVE_ONE_TO_ONE_EXT),$=he;let Ve=ae;ae=null,this.setClear(Ve)}},getReversed:function(){return $},setTest:function(he){he?ge(n.DEPTH_TEST):Oe(n.DEPTH_TEST)},setMask:function(he){X!==he&&!C&&(n.depthMask(he),X=he)},setFunc:function(he){if($&&(he=qu[he]),le!==he){switch(he){case da:n.depthFunc(n.NEVER);break;case fa:n.depthFunc(n.ALWAYS);break;case pa:n.depthFunc(n.LESS);break;case ps:n.depthFunc(n.LEQUAL);break;case ms:n.depthFunc(n.EQUAL);break;case ma:n.depthFunc(n.GEQUAL);break;case ga:n.depthFunc(n.GREATER);break;case ba:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}le=he}},setLocked:function(he){C=he},setClear:function(he){ae!==he&&(ae=he,$&&(he=1-he),n.clearDepth(he))},reset:function(){C=!1,X=null,le=null,ae=null,$=!1}}}function s(){let C=!1,$=null,X=null,le=null,ae=null,he=null,Pe=null,Ve=null,se=null;return{setTest:function(Le){C||(Le?ge(n.STENCIL_TEST):Oe(n.STENCIL_TEST))},setMask:function(Le){$!==Le&&!C&&(n.stencilMask(Le),$=Le)},setFunc:function(Le,Ge,xe){(X!==Le||le!==Ge||ae!==xe)&&(n.stencilFunc(Le,Ge,xe),X=Le,le=Ge,ae=xe)},setOp:function(Le,Ge,xe){(he!==Le||Pe!==Ge||Ve!==xe)&&(n.stencilOp(Le,Ge,xe),he=Le,Pe=Ge,Ve=xe)},setLocked:function(Le){C=Le},setClear:function(Le){se!==Le&&(n.clearStencil(Le),se=Le)},reset:function(){C=!1,$=null,X=null,le=null,ae=null,he=null,Pe=null,Ve=null,se=null}}}let r=new t,a=new i,o=new s,l={},c=new WeakMap,h={},f={},d={},p=new WeakMap,g=[],S=null,m=!1,u=null,v=null,E=null,y=null,A=null,T=null,b=null,w=new qe(0,0,0),F=0,P=!1,I=null,k=null,W=null,R=null,H=null,j=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS),z=!1,ie=0,q=n.getParameter(n.VERSION);q.indexOf("WebGL")!==-1?(ie=parseFloat(/^WebGL (\d)/.exec(q)[1]),z=ie>=1):q.indexOf("OpenGL ES")!==-1&&(ie=parseFloat(/^OpenGL ES (\d)/.exec(q)[1]),z=ie>=2);let ee=null,ne={},Te=n.getParameter(n.SCISSOR_BOX),Fe=n.getParameter(n.VIEWPORT),Y=new Ze().fromArray(Te),be=new Ze().fromArray(Fe);function _e(C,$,X,le){let ae=new Uint8Array(4),he=n.createTexture();n.bindTexture(C,he),n.texParameteri(C,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(C,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let Pe=0;Pe<X;Pe++)C===n.TEXTURE_3D||C===n.TEXTURE_2D_ARRAY?n.texImage3D($,0,n.RGBA,1,1,le,0,n.RGBA,n.UNSIGNED_BYTE,ae):n.texImage2D($+Pe,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,ae);return he}let Re={};Re[n.TEXTURE_2D]=_e(n.TEXTURE_2D,n.TEXTURE_2D,1),Re[n.TEXTURE_CUBE_MAP]=_e(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),Re[n.TEXTURE_2D_ARRAY]=_e(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),Re[n.TEXTURE_3D]=_e(n.TEXTURE_3D,n.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),ge(n.DEPTH_TEST),a.setFunc(ps),kt(!1),ct(Vc),ge(n.CULL_FACE),ft(Hi);function ge(C){h[C]!==!0&&(n.enable(C),h[C]=!0)}function Oe(C){h[C]!==!1&&(n.disable(C),h[C]=!1)}function dt(C,$){return d[C]!==$?(n.bindFramebuffer(C,$),d[C]=$,C===n.DRAW_FRAMEBUFFER&&(d[n.FRAMEBUFFER]=$),C===n.FRAMEBUFFER&&(d[n.DRAW_FRAMEBUFFER]=$),!0):!1}function Ie(C,$){let X=g,le=!1;if(C){X=p.get($),X===void 0&&(X=[],p.set($,X));let ae=C.textures;if(X.length!==ae.length||X[0]!==n.COLOR_ATTACHMENT0){for(let he=0,Pe=ae.length;he<Pe;he++)X[he]=n.COLOR_ATTACHMENT0+he;X.length=ae.length,le=!0}}else X[0]!==n.BACK&&(X[0]=n.BACK,le=!0);le&&n.drawBuffers(X)}function Je(C){return S!==C?(n.useProgram(C),S=C,!0):!1}let tt={[Wi]:n.FUNC_ADD,[pu]:n.FUNC_SUBTRACT,[mu]:n.FUNC_REVERSE_SUBTRACT};tt[gu]=n.MIN,tt[bu]=n.MAX;let We={[_u]:n.ZERO,[xu]:n.ONE,[vu]:n.SRC_COLOR,[Xc]:n.SRC_ALPHA,[Tu]:n.SRC_ALPHA_SATURATE,[wu]:n.DST_COLOR,[Su]:n.DST_ALPHA,[yu]:n.ONE_MINUS_SRC_COLOR,[jc]:n.ONE_MINUS_SRC_ALPHA,[Eu]:n.ONE_MINUS_DST_COLOR,[Mu]:n.ONE_MINUS_DST_ALPHA,[Au]:n.CONSTANT_COLOR,[Cu]:n.ONE_MINUS_CONSTANT_COLOR,[Ru]:n.CONSTANT_ALPHA,[Pu]:n.ONE_MINUS_CONSTANT_ALPHA};function ft(C,$,X,le,ae,he,Pe,Ve,se,Le){if(C===Hi){m===!0&&(Oe(n.BLEND),m=!1);return}if(m===!1&&(ge(n.BLEND),m=!0),C!==fu){if(C!==u||Le!==P){if((v!==Wi||A!==Wi)&&(n.blendEquation(n.FUNC_ADD),v=Wi,A=Wi),Le)switch(C){case As:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Hc:n.blendFunc(n.ONE,n.ONE);break;case Wc:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case qc:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:Ue("WebGLState: Invalid blending: ",C);break}else switch(C){case As:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Hc:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case Wc:Ue("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case qc:Ue("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Ue("WebGLState: Invalid blending: ",C);break}E=null,y=null,T=null,b=null,w.set(0,0,0),F=0,u=C,P=Le}return}ae=ae||$,he=he||X,Pe=Pe||le,($!==v||ae!==A)&&(n.blendEquationSeparate(tt[$],tt[ae]),v=$,A=ae),(X!==E||le!==y||he!==T||Pe!==b)&&(n.blendFuncSeparate(We[X],We[le],We[he],We[Pe]),E=X,y=le,T=he,b=Pe),(Ve.equals(w)===!1||se!==F)&&(n.blendColor(Ve.r,Ve.g,Ve.b,se),w.copy(Ve),F=se),u=C,P=!1}function mt(C,$){C.side===bn?Oe(n.CULL_FACE):ge(n.CULL_FACE);let X=C.side===on;$&&(X=!X),kt(X),C.blending===As&&C.transparent===!1?ft(Hi):ft(C.blending,C.blendEquation,C.blendSrc,C.blendDst,C.blendEquationAlpha,C.blendSrcAlpha,C.blendDstAlpha,C.blendColor,C.blendAlpha,C.premultipliedAlpha),a.setFunc(C.depthFunc),a.setTest(C.depthTest),a.setMask(C.depthWrite),r.setMask(C.colorWrite);let le=C.stencilWrite;o.setTest(le),le&&(o.setMask(C.stencilWriteMask),o.setFunc(C.stencilFunc,C.stencilRef,C.stencilFuncMask),o.setOp(C.stencilFail,C.stencilZFail,C.stencilZPass)),st(C.polygonOffset,C.polygonOffsetFactor,C.polygonOffsetUnits),C.alphaToCoverage===!0?ge(n.SAMPLE_ALPHA_TO_COVERAGE):Oe(n.SAMPLE_ALPHA_TO_COVERAGE)}function kt(C){I!==C&&(C?n.frontFace(n.CW):n.frontFace(n.CCW),I=C)}function ct(C){C!==hu?(ge(n.CULL_FACE),C!==k&&(C===Vc?n.cullFace(n.BACK):C===uu?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):Oe(n.CULL_FACE),k=C}function Dt(C){C!==W&&(z&&n.lineWidth(C),W=C)}function st(C,$,X){C?(ge(n.POLYGON_OFFSET_FILL),(R!==$||H!==X)&&(R=$,H=X,a.getReversed()&&($=-$,X=-X),n.polygonOffset($,X))):Oe(n.POLYGON_OFFSET_FILL)}function Zt(C){C?ge(n.SCISSOR_TEST):Oe(n.SCISSOR_TEST)}function zt(C){C===void 0&&(C=n.TEXTURE0+j-1),ee!==C&&(n.activeTexture(C),ee=C)}function $t(C,$,X){X===void 0&&(ee===null?X=n.TEXTURE0+j-1:X=ee);let le=ne[X];le===void 0&&(le={type:void 0,texture:void 0},ne[X]=le),(le.type!==C||le.texture!==$)&&(ee!==X&&(n.activeTexture(X),ee=X),n.bindTexture(C,$||Re[C]),le.type=C,le.texture=$)}function D(){let C=ne[ee];C!==void 0&&C.type!==void 0&&(n.bindTexture(C.type,null),C.type=void 0,C.texture=void 0)}function Gt(){try{n.compressedTexImage2D(...arguments)}catch(C){Ue("WebGLState:",C)}}function at(){try{n.compressedTexImage3D(...arguments)}catch(C){Ue("WebGLState:",C)}}function Q(){try{n.texSubImage2D(...arguments)}catch(C){Ue("WebGLState:",C)}}function G(){try{n.texSubImage3D(...arguments)}catch(C){Ue("WebGLState:",C)}}function ue(){try{n.compressedTexSubImage2D(...arguments)}catch(C){Ue("WebGLState:",C)}}function de(){try{n.compressedTexSubImage3D(...arguments)}catch(C){Ue("WebGLState:",C)}}function ve(){try{n.texStorage2D(...arguments)}catch(C){Ue("WebGLState:",C)}}function M(){try{n.texStorage3D(...arguments)}catch(C){Ue("WebGLState:",C)}}function _(){try{n.texImage2D(...arguments)}catch(C){Ue("WebGLState:",C)}}function U(){try{n.texImage3D(...arguments)}catch(C){Ue("WebGLState:",C)}}function te(C){return f[C]!==void 0?f[C]:n.getParameter(C)}function Z(C,$){f[C]!==$&&(n.pixelStorei(C,$),f[C]=$)}function re(C){Y.equals(C)===!1&&(n.scissor(C.x,C.y,C.z,C.w),Y.copy(C))}function oe(C){be.equals(C)===!1&&(n.viewport(C.x,C.y,C.z,C.w),be.copy(C))}function K(C,$){let X=c.get($);X===void 0&&(X=new WeakMap,c.set($,X));let le=X.get(C);le===void 0&&(le=n.getUniformBlockIndex($,C.name),n.uniformBlockBinding($,le,le),X.set(C,le))}function J(C,$,X){let ae=c.get($).get(C);l[ae]!==X&&(n.bindBufferBase(n.UNIFORM_BUFFER,ae,X),l[ae]=X)}function ce(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),a.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),n.pixelStorei(n.PACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,!1),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,n.BROWSER_DEFAULT_WEBGL),n.pixelStorei(n.PACK_ROW_LENGTH,0),n.pixelStorei(n.PACK_SKIP_PIXELS,0),n.pixelStorei(n.PACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_ROW_LENGTH,0),n.pixelStorei(n.UNPACK_IMAGE_HEIGHT,0),n.pixelStorei(n.UNPACK_SKIP_PIXELS,0),n.pixelStorei(n.UNPACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_SKIP_IMAGES,0),h={},f={},ee=null,ne={},d={},l={},p=new WeakMap,g=[],S=null,m=!1,u=null,v=null,E=null,y=null,A=null,T=null,b=null,w=new qe(0,0,0),F=0,P=!1,I=null,k=null,W=null,R=null,H=null,Y.set(0,0,n.canvas.width,n.canvas.height),be.set(0,0,n.canvas.width,n.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:ge,disable:Oe,bindFramebuffer:dt,drawBuffers:Ie,useProgram:Je,setBlending:ft,setMaterial:mt,setFlipSided:kt,setCullFace:ct,setLineWidth:Dt,setPolygonOffset:st,setScissorTest:Zt,activeTexture:zt,bindTexture:$t,unbindTexture:D,compressedTexImage2D:Gt,compressedTexImage3D:at,texImage2D:_,texImage3D:U,pixelStorei:Z,getParameter:te,updateUBOMapping:K,uniformBlockBinding:J,texStorage2D:ve,texStorage3D:M,texSubImage2D:Q,texSubImage3D:G,compressedTexSubImage2D:ue,compressedTexSubImage3D:de,scissor:re,viewport:oe,reset:ce}}function E_(n,e,t,i,s,r,a){let o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new De,h=new WeakMap,f=new Set,d,p=new WeakMap,g=new Set,S=new FinalizationRegistry(M=>g.delete(M)),m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function u(M,_){return m?new OffscreenCanvas(M,_):er("canvas")}function v(M,_,U){let te=1,Z=ve(M);if((Z.width>U||Z.height>U)&&(te=U/Math.max(Z.width,Z.height)),te<1)if(typeof HTMLImageElement<"u"&&M instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&M instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&M instanceof ImageBitmap||typeof VideoFrame<"u"&&M instanceof VideoFrame){let re=Math.floor(te*Z.width),oe=Math.floor(te*Z.height);d===void 0&&(d=u(re,oe));let K=_?u(re,oe):d;return K.width=re,K.height=oe,K.getContext("2d").drawImage(M,0,0,re,oe),Ne("WebGLRenderer: Texture has been resized from ("+Z.width+"x"+Z.height+") to ("+re+"x"+oe+")."),K}else return"data"in M&&Ne("WebGLRenderer: Image in DataTexture is too big ("+Z.width+"x"+Z.height+")."),M;return M}function E(M){return M.generateMipmaps}function y(M){n.generateMipmap(M)}function A(M){return M.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:M.isWebGL3DRenderTarget?n.TEXTURE_3D:M.isWebGLArrayRenderTarget||M.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function T(M,_,U,te,Z,re=!1){if(M!==null){if(n[M]!==void 0)return n[M];Ne("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+M+"'")}let oe;te&&(oe=e.get("EXT_texture_norm16"),oe||Ne("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let K=_;if(_===n.RED&&(U===n.FLOAT&&(K=n.R32F),U===n.HALF_FLOAT&&(K=n.R16F),U===n.UNSIGNED_BYTE&&(K=n.R8),U===n.UNSIGNED_SHORT&&oe&&(K=oe.R16_EXT),U===n.SHORT&&oe&&(K=oe.R16_SNORM_EXT)),_===n.RED_INTEGER&&(U===n.UNSIGNED_BYTE&&(K=n.R8UI),U===n.UNSIGNED_SHORT&&(K=n.R16UI),U===n.UNSIGNED_INT&&(K=n.R32UI),U===n.BYTE&&(K=n.R8I),U===n.SHORT&&(K=n.R16I),U===n.INT&&(K=n.R32I)),_===n.RG&&(U===n.FLOAT&&(K=n.RG32F),U===n.HALF_FLOAT&&(K=n.RG16F),U===n.UNSIGNED_BYTE&&(K=n.RG8),U===n.UNSIGNED_SHORT&&oe&&(K=oe.RG16_EXT),U===n.SHORT&&oe&&(K=oe.RG16_SNORM_EXT)),_===n.RG_INTEGER&&(U===n.UNSIGNED_BYTE&&(K=n.RG8UI),U===n.UNSIGNED_SHORT&&(K=n.RG16UI),U===n.UNSIGNED_INT&&(K=n.RG32UI),U===n.BYTE&&(K=n.RG8I),U===n.SHORT&&(K=n.RG16I),U===n.INT&&(K=n.RG32I)),_===n.RGB_INTEGER&&(U===n.UNSIGNED_BYTE&&(K=n.RGB8UI),U===n.UNSIGNED_SHORT&&(K=n.RGB16UI),U===n.UNSIGNED_INT&&(K=n.RGB32UI),U===n.BYTE&&(K=n.RGB8I),U===n.SHORT&&(K=n.RGB16I),U===n.INT&&(K=n.RGB32I)),_===n.RGBA_INTEGER&&(U===n.UNSIGNED_BYTE&&(K=n.RGBA8UI),U===n.UNSIGNED_SHORT&&(K=n.RGBA16UI),U===n.UNSIGNED_INT&&(K=n.RGBA32UI),U===n.BYTE&&(K=n.RGBA8I),U===n.SHORT&&(K=n.RGBA16I),U===n.INT&&(K=n.RGBA32I)),_===n.RGB&&(U===n.UNSIGNED_SHORT&&oe&&(K=oe.RGB16_EXT),U===n.SHORT&&oe&&(K=oe.RGB16_SNORM_EXT),U===n.UNSIGNED_INT_5_9_9_9_REV&&(K=n.RGB9_E5),U===n.UNSIGNED_INT_10F_11F_11F_REV&&(K=n.R11F_G11F_B10F)),_===n.RGBA){let J=re?Qs:Ke.getTransfer(Z);U===n.FLOAT&&(K=n.RGBA32F),U===n.HALF_FLOAT&&(K=n.RGBA16F),U===n.UNSIGNED_BYTE&&(K=J===et?n.SRGB8_ALPHA8:n.RGBA8),U===n.UNSIGNED_SHORT&&oe&&(K=oe.RGBA16_EXT),U===n.SHORT&&oe&&(K=oe.RGBA16_SNORM_EXT),U===n.UNSIGNED_SHORT_4_4_4_4&&(K=n.RGBA4),U===n.UNSIGNED_SHORT_5_5_5_1&&(K=n.RGB5_A1)}return(K===n.R16F||K===n.R32F||K===n.RG16F||K===n.RG32F||K===n.RGBA16F||K===n.RGBA32F)&&e.get("EXT_color_buffer_float"),K}function b(M,_){let U;return M?_===null||_===Ln||_===Xi?U=n.DEPTH24_STENCIL8:_===In?U=n.DEPTH32F_STENCIL8:_===Rs&&(U=n.DEPTH24_STENCIL8,Ne("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):_===null||_===Ln||_===Xi?U=n.DEPTH_COMPONENT24:_===In?U=n.DEPTH_COMPONENT32F:_===Rs&&(U=n.DEPTH_COMPONENT16),U}function w(M,_){return E(M)===!0||M.isFramebufferTexture&&M.minFilter!==Rt&&M.minFilter!==nn?Math.log2(Math.max(_.width,_.height))+1:M.mipmaps.length>0?M.mipmaps.length:M.isCompressedTexture&&Array.isArray(M.image)?_.mipmaps.length:1}function F(M){let _=new WeakRef(M);i.get(M).__ref=_,g.add(_),S.register(M,_,_)}function P(M){let _=i.get(M).__ref;_!==void 0&&(g.delete(_),S.unregister(_))}function I(M){W(M.target)}function k(M){R(M.target)}function W(M){M.removeEventListener("dispose",I),P(M),j(M),M.isVideoTexture&&h.delete(M),M.isHTMLTexture&&f.delete(M)}function R(M){M.removeEventListener("dispose",k),P(M),ie(M)}function H(){for(let M of g){let _=M.deref();_!==void 0&&(_.isRenderTarget===!0?R(_):W(_))}g.clear(),f.clear()}function j(M){let _=i.get(M);if(_.__webglInit===void 0)return;let U=M.source,te=p.get(U);if(te){let Z=te[_.__cacheKey];Z.usedTimes--,Z.usedTimes===0&&z(M),Object.keys(te).length===0&&p.delete(U)}i.remove(M)}function z(M){let _=i.get(M);n.deleteTexture(_.__webglTexture);let U=M.source,te=p.get(U);delete te[_.__cacheKey],a.memory.textures--}function ie(M){let _=i.get(M);_.__depthDisposeCallback&&_.__depthDisposeCallback();let U=M.depthTexture;if(U&&U.renderTarget===M&&W(U),M.isWebGLCubeRenderTarget)for(let Z=0;Z<6;Z++){if(Array.isArray(_.__webglFramebuffer[Z]))for(let re=0;re<_.__webglFramebuffer[Z].length;re++)n.deleteFramebuffer(_.__webglFramebuffer[Z][re]);else n.deleteFramebuffer(_.__webglFramebuffer[Z]);_.__webglDepthbuffer&&n.deleteRenderbuffer(_.__webglDepthbuffer[Z])}else{if(Array.isArray(_.__webglFramebuffer))for(let Z=0;Z<_.__webglFramebuffer.length;Z++)n.deleteFramebuffer(_.__webglFramebuffer[Z]);else n.deleteFramebuffer(_.__webglFramebuffer);if(_.__webglDepthbuffer&&n.deleteRenderbuffer(_.__webglDepthbuffer),_.__webglMultisampledFramebuffer&&n.deleteFramebuffer(_.__webglMultisampledFramebuffer),_.__webglColorRenderbuffer)for(let Z=0;Z<_.__webglColorRenderbuffer.length;Z++)_.__webglColorRenderbuffer[Z]&&n.deleteRenderbuffer(_.__webglColorRenderbuffer[Z]);_.__webglDepthRenderbuffer&&n.deleteRenderbuffer(_.__webglDepthRenderbuffer)}let te=M.textures;for(let Z=0,re=te.length;Z<re;Z++){let oe=i.get(te[Z]);oe.__webglTexture&&(n.deleteTexture(oe.__webglTexture),a.memory.textures--),i.remove(te[Z])}i.remove(M)}let q=0;function ee(){q=0}function ne(){return q}function Te(M){q=M}function Fe(){let M=q;return M>=s.maxTextures&&Ne("WebGLTextures: Trying to use "+(M+1)+" texture units while this GPU supports only "+s.maxTextures),q+=1,M}function Y(M){let _=[];return _.push(M.wrapS),_.push(M.wrapT),_.push(M.wrapR||0),_.push(M.magFilter),_.push(M.minFilter),_.push(M.anisotropy),_.push(M.internalFormat),_.push(M.format),_.push(M.type),_.push(M.generateMipmaps),_.push(M.mipmapsAutoUpdate),_.push(M.premultiplyAlpha),_.push(M.flipY),_.push(M.unpackAlignment),_.push(M.colorSpace),_.join()}function be(M,_){let U=i.get(M);if(M.isVideoTexture&&ue(M),M.isRenderTargetTexture===!1&&M.isExternalTexture!==!0&&M.version>0&&U.__version!==M.version){let te=M.image;if(te===null)Ne("WebGLRenderer: Texture marked for update but no image data found.");else if(te.complete===!1)Ne("WebGLRenderer: Texture marked for update but image is incomplete");else{mt(U,M,_);return}}else M.isExternalTexture&&(U.__webglTexture=M.sourceTexture?M.sourceTexture:null);t.bindTexture(n.TEXTURE_2D,U.__webglTexture,n.TEXTURE0+_)}function _e(M,_){let U=i.get(M);if(M.isRenderTargetTexture===!1&&M.version>0&&U.__version!==M.version){mt(U,M,_);return}else M.isExternalTexture&&(U.__webglTexture=M.sourceTexture?M.sourceTexture:null);t.bindTexture(n.TEXTURE_2D_ARRAY,U.__webglTexture,n.TEXTURE0+_)}function Re(M,_){let U=i.get(M);if(M.isRenderTargetTexture===!1&&M.version>0&&U.__version!==M.version){mt(U,M,_);return}t.bindTexture(n.TEXTURE_3D,U.__webglTexture,n.TEXTURE0+_)}function ge(M,_){let U=i.get(M);if(M.version>0&&U.__version!==M.version){kt(U,M,_);return}t.bindTexture(n.TEXTURE_CUBE_MAP,U.__webglTexture,n.TEXTURE0+_)}let Oe={[_a]:n.REPEAT,[On]:n.CLAMP_TO_EDGE,[xa]:n.MIRRORED_REPEAT},dt={[Rt]:n.NEAREST,[Du]:n.NEAREST_MIPMAP_NEAREST,[Sr]:n.NEAREST_MIPMAP_LINEAR,[nn]:n.LINEAR,[Ha]:n.LINEAR_MIPMAP_NEAREST,[ni]:n.LINEAR_MIPMAP_LINEAR},Ie={[Ou]:n.NEVER,[fl]:n.ALWAYS,[Bu]:n.LESS,[ul]:n.LEQUAL,[ku]:n.EQUAL,[dl]:n.GEQUAL,[zu]:n.GREATER,[Gu]:n.NOTEQUAL};function Je(M,_){if(_.type===In&&e.has("OES_texture_float_linear")===!1&&(_.magFilter===nn||_.magFilter===Ha||_.magFilter===Sr||_.magFilter===ni||_.minFilter===nn||_.minFilter===Ha||_.minFilter===Sr||_.minFilter===ni)&&Ne("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(M,n.TEXTURE_WRAP_S,Oe[_.wrapS]),n.texParameteri(M,n.TEXTURE_WRAP_T,Oe[_.wrapT]),(M===n.TEXTURE_3D||M===n.TEXTURE_2D_ARRAY)&&n.texParameteri(M,n.TEXTURE_WRAP_R,Oe[_.wrapR]),n.texParameteri(M,n.TEXTURE_MAG_FILTER,dt[_.magFilter]),n.texParameteri(M,n.TEXTURE_MIN_FILTER,dt[_.minFilter]),_.compareFunction&&(n.texParameteri(M,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(M,n.TEXTURE_COMPARE_FUNC,Ie[_.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(_.magFilter===Rt||_.minFilter!==Sr&&_.minFilter!==ni||_.type===In&&e.has("OES_texture_float_linear")===!1)return;if(_.anisotropy>1||i.get(_).__currentAnisotropy){let U=e.get("EXT_texture_filter_anisotropic");n.texParameterf(M,U.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(_.anisotropy,s.getMaxAnisotropy())),i.get(_).__currentAnisotropy=_.anisotropy}}}function tt(M,_){let U=!1;M.__webglInit===void 0&&(M.__webglInit=!0,_.addEventListener("dispose",I),F(_));let te=_.source,Z=p.get(te);Z===void 0&&(Z={},p.set(te,Z));let re=Y(_);if(re!==M.__cacheKey){Z[re]===void 0&&(Z[re]={texture:n.createTexture(),usedTimes:0},a.memory.textures++,U=!0),Z[re].usedTimes++;let oe=Z[M.__cacheKey];oe!==void 0&&(Z[M.__cacheKey].usedTimes--,oe.usedTimes===0&&z(_)),M.__cacheKey=re,M.__webglTexture=Z[re].texture}return U}function We(M,_,U){return Math.floor(Math.floor(M/U)/_)}function ft(M,_,U,te){let re=M.updateRanges;if(re.length===0)t.texSubImage2D(n.TEXTURE_2D,0,0,0,_.width,_.height,U,te,_.data);else{re.sort((C,$)=>C.start-$.start);let oe=0;for(let C=1;C<re.length;C++){let $=re[oe],X=re[C],le=$.start+$.count,ae=We(X.start,_.width,4),he=We($.start,_.width,4);X.start<=le+1&&ae===he&&We(X.start+X.count-1,_.width,4)===ae?$.count=Math.max($.count,X.start+X.count-$.start):(++oe,re[oe]=X)}re.length=oe+1;let K=t.getParameter(n.UNPACK_ROW_LENGTH),J=t.getParameter(n.UNPACK_SKIP_PIXELS),ce=t.getParameter(n.UNPACK_SKIP_ROWS);t.pixelStorei(n.UNPACK_ROW_LENGTH,_.width);for(let C=0,$=re.length;C<$;C++){let X=re[C],le=Math.floor(X.start/4),ae=Math.ceil(X.count/4),he=le%_.width,Pe=Math.floor(le/_.width),Ve=ae,se=1;t.pixelStorei(n.UNPACK_SKIP_PIXELS,he),t.pixelStorei(n.UNPACK_SKIP_ROWS,Pe),t.texSubImage2D(n.TEXTURE_2D,0,he,Pe,Ve,se,U,te,_.data)}M.clearUpdateRanges(),t.pixelStorei(n.UNPACK_ROW_LENGTH,K),t.pixelStorei(n.UNPACK_SKIP_PIXELS,J),t.pixelStorei(n.UNPACK_SKIP_ROWS,ce)}}function mt(M,_,U){let te=n.TEXTURE_2D;(_.isDataArrayTexture||_.isCompressedArrayTexture)&&(te=n.TEXTURE_2D_ARRAY),_.isData3DTexture&&(te=n.TEXTURE_3D);let Z=tt(M,_),re=_.source;t.bindTexture(te,M.__webglTexture,n.TEXTURE0+U);let oe=i.get(re);if(re.version!==oe.__version||Z===!0){if(t.activeTexture(n.TEXTURE0+U),(typeof ImageBitmap<"u"&&_.image instanceof ImageBitmap)===!1){let se=Ke.getPrimaries(Ke.workingColorSpace),Le=_.colorSpace===si?null:Ke.getPrimaries(_.colorSpace),Ge=_.colorSpace===si||se===Le?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,_.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ge)}t.pixelStorei(n.UNPACK_ALIGNMENT,_.unpackAlignment);let J=v(_.image,!1,s.maxTextureSize);J=de(_,J);let ce=r.convert(_.format,_.colorSpace),C=r.convert(_.type),$=T(_.internalFormat,ce,C,_.normalized,_.colorSpace,_.isVideoTexture);Je(te,_);let X,le=_.mipmaps,ae=_.isVideoTexture!==!0,he=oe.__version===void 0||Z===!0,Pe=re.dataReady,Ve=w(_,J);if(_.isDepthTexture)$=b(_.format===ii,_.type),he&&(ae?t.texStorage2D(n.TEXTURE_2D,1,$,J.width,J.height):t.texImage2D(n.TEXTURE_2D,0,$,J.width,J.height,0,ce,C,null));else if(_.isDataTexture)if(le.length>0){ae&&he&&t.texStorage2D(n.TEXTURE_2D,Ve,$,le[0].width,le[0].height);for(let se=0,Le=le.length;se<Le;se++)X=le[se],ae?Pe&&t.texSubImage2D(n.TEXTURE_2D,se,0,0,X.width,X.height,ce,C,X.data):t.texImage2D(n.TEXTURE_2D,se,$,X.width,X.height,0,ce,C,X.data);_.generateMipmaps=!1}else ae?(he&&t.texStorage2D(n.TEXTURE_2D,Ve,$,J.width,J.height),Pe&&ft(_,J,ce,C)):t.texImage2D(n.TEXTURE_2D,0,$,J.width,J.height,0,ce,C,J.data);else if(_.isCompressedTexture)if(_.isCompressedArrayTexture){ae&&he&&t.texStorage3D(n.TEXTURE_2D_ARRAY,Ve,$,le[0].width,le[0].height,J.depth);for(let se=0,Le=le.length;se<Le;se++)if(X=le[se],_.format!==Nn)if(ce!==null)if(ae){if(Pe)if(_.layerUpdates.size>0){let Ge=Ml(X.width,X.height,_.format,_.type);for(let xe of _.layerUpdates){let nt=X.data.subarray(xe*Ge/X.data.BYTES_PER_ELEMENT,(xe+1)*Ge/X.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,se,0,0,xe,X.width,X.height,1,ce,nt)}}else t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,se,0,0,0,X.width,X.height,J.depth,ce,X.data)}else t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,se,$,X.width,X.height,J.depth,0,X.data,0,0);else Ne("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else ae?Pe&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,se,0,0,0,X.width,X.height,J.depth,ce,C,X.data):t.texImage3D(n.TEXTURE_2D_ARRAY,se,$,X.width,X.height,J.depth,0,ce,C,X.data);_.layerUpdates.size>0&&_.clearLayerUpdates()}else{ae&&he&&t.texStorage2D(n.TEXTURE_2D,Ve,$,le[0].width,le[0].height);for(let se=0,Le=le.length;se<Le;se++)X=le[se],_.format!==Nn?ce!==null?ae?Pe&&t.compressedTexSubImage2D(n.TEXTURE_2D,se,0,0,X.width,X.height,ce,X.data):t.compressedTexImage2D(n.TEXTURE_2D,se,$,X.width,X.height,0,X.data):Ne("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):ae?Pe&&t.texSubImage2D(n.TEXTURE_2D,se,0,0,X.width,X.height,ce,C,X.data):t.texImage2D(n.TEXTURE_2D,se,$,X.width,X.height,0,ce,C,X.data)}else if(_.isDataArrayTexture)if(ae){if(he&&t.texStorage3D(n.TEXTURE_2D_ARRAY,Ve,$,J.width,J.height,J.depth),Pe)if(_.layerUpdates.size>0){let se=Ml(J.width,J.height,_.format,_.type);for(let Le of _.layerUpdates){let Ge=J.data.subarray(Le*se/J.data.BYTES_PER_ELEMENT,(Le+1)*se/J.data.BYTES_PER_ELEMENT);t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,Le,J.width,J.height,1,ce,C,Ge)}_.clearLayerUpdates()}else t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,J.width,J.height,J.depth,ce,C,J.data)}else t.texImage3D(n.TEXTURE_2D_ARRAY,0,$,J.width,J.height,J.depth,0,ce,C,J.data);else if(_.isData3DTexture)ae?(he&&t.texStorage3D(n.TEXTURE_3D,Ve,$,J.width,J.height,J.depth),Pe&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,J.width,J.height,J.depth,ce,C,J.data)):t.texImage3D(n.TEXTURE_3D,0,$,J.width,J.height,J.depth,0,ce,C,J.data);else if(_.isFramebufferTexture){if(he)if(ae)t.texStorage2D(n.TEXTURE_2D,Ve,$,J.width,J.height);else{let se=J.width,Le=J.height;for(let Ge=0;Ge<Ve;Ge++)t.texImage2D(n.TEXTURE_2D,Ge,$,se,Le,0,ce,C,null),se>>=1,Le>>=1}}else if(_.isHTMLTexture){if("texElementImage2D"in n){let se=n.canvas;if(se.hasAttribute("layoutsubtree")||se.setAttribute("layoutsubtree","true"),J.parentNode!==se){se.appendChild(J),f.add(_),se.onpaint=Le=>{let Ge=Le.changedElements;for(let xe of f)Ge.includes(xe.image)&&(xe.needsUpdate=!0)},se.requestPaint();return}if(n.texElementImage2D.length===3)n.texElementImage2D(n.TEXTURE_2D,n.RGBA8,J);else{let Ge=n.RGBA,xe=n.RGBA,nt=n.UNSIGNED_BYTE;n.texElementImage2D(n.TEXTURE_2D,0,Ge,xe,nt,J)}n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MIN_FILTER,n.LINEAR),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE)}}else if(le.length>0){if(ae&&he){let se=ve(le[0]);t.texStorage2D(n.TEXTURE_2D,Ve,$,se.width,se.height)}for(let se=0,Le=le.length;se<Le;se++)X=le[se],ae?Pe&&t.texSubImage2D(n.TEXTURE_2D,se,0,0,ce,C,X):t.texImage2D(n.TEXTURE_2D,se,$,ce,C,X);_.generateMipmaps=!1}else if(ae){if(he){let se=ve(J);t.texStorage2D(n.TEXTURE_2D,Ve,$,se.width,se.height)}Pe&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,ce,C,J)}else t.texImage2D(n.TEXTURE_2D,0,$,ce,C,J);E(_)&&_.mipmapsAutoUpdate===!0&&y(te),oe.__version=re.version,_.onUpdate&&_.onUpdate(_)}M.__version=_.version}function kt(M,_,U){if(_.image.length!==6)return;let te=tt(M,_),Z=_.source;t.bindTexture(n.TEXTURE_CUBE_MAP,M.__webglTexture,n.TEXTURE0+U);let re=i.get(Z);if(Z.version!==re.__version||te===!0){t.activeTexture(n.TEXTURE0+U);let oe=Ke.getPrimaries(Ke.workingColorSpace),K=_.colorSpace===si?null:Ke.getPrimaries(_.colorSpace),J=_.colorSpace===si||oe===K?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,_.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),t.pixelStorei(n.UNPACK_ALIGNMENT,_.unpackAlignment),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,J);let ce=_.isCompressedTexture||_.image[0].isCompressedTexture,C=_.image[0]&&_.image[0].isDataTexture,$=[];for(let xe=0;xe<6;xe++)!ce&&!C?$[xe]=v(_.image[xe],!0,s.maxCubemapSize):$[xe]=C?_.image[xe].image:_.image[xe],$[xe]=de(_,$[xe]);let X=$[0],le=r.convert(_.format,_.colorSpace),ae=r.convert(_.type),he=T(_.internalFormat,le,ae,_.normalized,_.colorSpace),Pe=_.isVideoTexture!==!0,Ve=re.__version===void 0||te===!0,se=Z.dataReady,Le=w(_,X);Je(n.TEXTURE_CUBE_MAP,_);let Ge;if(_.isDepthTexture){if(he=b(_.format===ii,_.type),Ve)if(Pe)t.texStorage2D(n.TEXTURE_CUBE_MAP,1,he,X.width,X.height);else for(let xe=0;xe<6;xe++)t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+xe,0,he,X.width,X.height,0,le,ae,null)}else if(ce){Pe&&Ve&&t.texStorage2D(n.TEXTURE_CUBE_MAP,Le,he,X.width,X.height);for(let xe=0;xe<6;xe++){Ge=$[xe].mipmaps;for(let nt=0;nt<Ge.length;nt++){let Tt=Ge[nt];_.format!==Nn?le!==null?Pe?se&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+xe,nt,0,0,Tt.width,Tt.height,le,Tt.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+xe,nt,he,Tt.width,Tt.height,0,Tt.data):Ne("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Pe?se&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+xe,nt,0,0,Tt.width,Tt.height,le,ae,Tt.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+xe,nt,he,Tt.width,Tt.height,0,le,ae,Tt.data)}}}else{if(Ge=_.mipmaps,Pe&&Ve){Ge.length>0&&Le++;let xe=ve($[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,Le,he,xe.width,xe.height)}for(let xe=0;xe<6;xe++)if(C){Pe?se&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+xe,0,0,0,$[xe].width,$[xe].height,le,ae,$[xe].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+xe,0,he,$[xe].width,$[xe].height,0,le,ae,$[xe].data);for(let nt=0;nt<Ge.length;nt++){let ci=Ge[nt].image[xe].image;Pe?se&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+xe,nt+1,0,0,ci.width,ci.height,le,ae,ci.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+xe,nt+1,he,ci.width,ci.height,0,le,ae,ci.data)}}else{Pe?se&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+xe,0,0,0,le,ae,$[xe]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+xe,0,he,le,ae,$[xe]);for(let nt=0;nt<Ge.length;nt++){let Tt=Ge[nt];Pe?se&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+xe,nt+1,0,0,le,ae,Tt.image[xe]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+xe,nt+1,he,le,ae,Tt.image[xe])}}}E(_)&&_.mipmapsAutoUpdate===!0&&y(n.TEXTURE_CUBE_MAP),re.__version=Z.version,_.onUpdate&&_.onUpdate(_)}M.__version=_.version}function ct(M,_,U,te,Z,re){let oe=r.convert(U.format,U.colorSpace),K=r.convert(U.type),J=T(U.internalFormat,oe,K,U.normalized,U.colorSpace),ce=i.get(_),C=i.get(U);if(C.__renderTarget=_,!ce.__hasExternalTextures){let $=Math.max(1,_.width>>re),X=Math.max(1,_.height>>re);Z===n.TEXTURE_3D||Z===n.TEXTURE_2D_ARRAY?t.texImage3D(Z,re,J,$,X,_.depth,0,oe,K,null):t.texImage2D(Z,re,J,$,X,0,oe,K,null)}t.bindFramebuffer(n.FRAMEBUFFER,M),G(_)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,te,Z,C.__webglTexture,0,Q(_)):(Z===n.TEXTURE_2D||Z>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&Z<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,te,Z,C.__webglTexture,re),t.bindFramebuffer(n.FRAMEBUFFER,null)}function Dt(M,_,U){if(n.bindRenderbuffer(n.RENDERBUFFER,M),_.depthBuffer){let te=_.depthTexture,Z=te&&te.isDepthTexture?te.type:null,re=b(_.stencilBuffer,Z),oe=_.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;G(_)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Q(_),re,_.width,_.height):U?n.renderbufferStorageMultisample(n.RENDERBUFFER,Q(_),re,_.width,_.height):n.renderbufferStorage(n.RENDERBUFFER,re,_.width,_.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,oe,n.RENDERBUFFER,M)}else{let te=_.textures;for(let Z=0;Z<te.length;Z++){let re=te[Z],oe=r.convert(re.format,re.colorSpace),K=r.convert(re.type),J=T(re.internalFormat,oe,K,re.normalized,re.colorSpace);G(_)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Q(_),J,_.width,_.height):U?n.renderbufferStorageMultisample(n.RENDERBUFFER,Q(_),J,_.width,_.height):n.renderbufferStorage(n.RENDERBUFFER,J,_.width,_.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function st(M,_,U){let te=_.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(n.FRAMEBUFFER,M),!(_.depthTexture&&_.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let Z=i.get(_.depthTexture);Z.__renderTarget=_;let re=te?_.depthTexture.image[0]:_.depthTexture.image;(!Z.__webglTexture||re.width!==_.width||re.height!==_.height)&&(re.width=_.width,re.height=_.height,_.depthTexture.needsUpdate=!0),te?ge(_.depthTexture,0):be(_.depthTexture,0);let oe=Z.__webglTexture,K=Q(_),J=te?n.TEXTURE_CUBE_MAP_POSITIVE_X+U:n.TEXTURE_2D,ce=_.depthTexture.format===ii?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;if(_.depthTexture.format===Qn)G(_)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,ce,J,oe,0,K):n.framebufferTexture2D(n.FRAMEBUFFER,ce,J,oe,0);else if(_.depthTexture.format===ii)G(_)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,ce,J,oe,0,K):n.framebufferTexture2D(n.FRAMEBUFFER,ce,J,oe,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function Zt(M){let _=i.get(M),U=M.isWebGLCubeRenderTarget===!0;if(_.__boundDepthTexture!==M.depthTexture){let te=M.depthTexture;if(_.__depthDisposeCallback&&_.__depthDisposeCallback(),te){let Z=()=>{delete _.__boundDepthTexture,delete _.__depthDisposeCallback,te.removeEventListener("dispose",Z)};te.addEventListener("dispose",Z),_.__depthDisposeCallback=Z}_.__boundDepthTexture=te}if(M.depthTexture&&!_.__autoAllocateDepthBuffer)if(U)for(let te=0;te<6;te++)st(_.__webglFramebuffer[te],M,te);else M.texture.mipmaps.length>0?st(_.__webglFramebuffer[0],M,0):st(_.__webglFramebuffer,M,0);else if(U){_.__webglDepthbuffer=[];for(let te=0;te<6;te++)if(t.bindFramebuffer(n.FRAMEBUFFER,_.__webglFramebuffer[te]),_.__webglDepthbuffer[te]===void 0)_.__webglDepthbuffer[te]=n.createRenderbuffer(),Dt(_.__webglDepthbuffer[te],M,!1);else{let Z=M.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,re=_.__webglDepthbuffer[te];n.bindRenderbuffer(n.RENDERBUFFER,re),n.framebufferRenderbuffer(n.FRAMEBUFFER,Z,n.RENDERBUFFER,re)}}else if(M.texture.mipmaps.length>0?t.bindFramebuffer(n.FRAMEBUFFER,_.__webglFramebuffer[0]):t.bindFramebuffer(n.FRAMEBUFFER,_.__webglFramebuffer),_.__webglDepthbuffer===void 0)_.__webglDepthbuffer=n.createRenderbuffer(),Dt(_.__webglDepthbuffer,M,!1);else{let Z=M.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,re=_.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,re),n.framebufferRenderbuffer(n.FRAMEBUFFER,Z,n.RENDERBUFFER,re)}t.bindFramebuffer(n.FRAMEBUFFER,null)}function zt(M,_,U){let te=i.get(M);_!==void 0&&ct(te.__webglFramebuffer,M,M.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),U!==void 0&&Zt(M)}function $t(M){let _=M.texture,U=i.get(M),te=i.get(_);M.addEventListener("dispose",k),F(M);let Z=M.textures,re=M.isWebGLCubeRenderTarget===!0,oe=Z.length>1;if(oe||(te.__webglTexture===void 0&&(te.__webglTexture=n.createTexture()),te.__version=_.version,a.memory.textures++),re){U.__webglFramebuffer=[];for(let K=0;K<6;K++)if(_.mipmaps.length>0){U.__webglFramebuffer[K]=[];for(let J=0;J<_.mipmaps.length;J++)U.__webglFramebuffer[K][J]=n.createFramebuffer()}else U.__webglFramebuffer[K]=n.createFramebuffer()}else{if(_.mipmaps.length>0){U.__webglFramebuffer=[];for(let K=0;K<_.mipmaps.length;K++)U.__webglFramebuffer[K]=n.createFramebuffer()}else U.__webglFramebuffer=n.createFramebuffer();if(oe)for(let K=0,J=Z.length;K<J;K++){let ce=i.get(Z[K]);ce.__webglTexture===void 0&&(ce.__webglTexture=n.createTexture(),a.memory.textures++)}if(M.samples>0&&G(M)===!1){U.__webglMultisampledFramebuffer=n.createFramebuffer(),U.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,U.__webglMultisampledFramebuffer);for(let K=0;K<Z.length;K++){let J=Z[K];U.__webglColorRenderbuffer[K]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,U.__webglColorRenderbuffer[K]);let ce=r.convert(J.format,J.colorSpace),C=r.convert(J.type),$=T(J.internalFormat,ce,C,J.normalized,J.colorSpace,M.isXRRenderTarget===!0),X=Q(M);n.renderbufferStorageMultisample(n.RENDERBUFFER,X,$,M.width,M.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+K,n.RENDERBUFFER,U.__webglColorRenderbuffer[K])}n.bindRenderbuffer(n.RENDERBUFFER,null),M.depthBuffer&&(U.__webglDepthRenderbuffer=n.createRenderbuffer(),Dt(U.__webglDepthRenderbuffer,M,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(re){t.bindTexture(n.TEXTURE_CUBE_MAP,te.__webglTexture),Je(n.TEXTURE_CUBE_MAP,_);for(let K=0;K<6;K++)if(_.mipmaps.length>0)for(let J=0;J<_.mipmaps.length;J++)ct(U.__webglFramebuffer[K][J],M,_,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+K,J);else ct(U.__webglFramebuffer[K],M,_,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+K,0);E(_)?y(n.TEXTURE_CUBE_MAP):_.mipmaps.length>0&&n.texParameteri(n.TEXTURE_CUBE_MAP,n.TEXTURE_MAX_LEVEL,_.mipmaps.length-1),t.unbindTexture()}else if(oe){for(let K=0,J=Z.length;K<J;K++){let ce=Z[K],C=i.get(ce),$=n.TEXTURE_2D;(M.isWebGL3DRenderTarget||M.isWebGLArrayRenderTarget)&&($=M.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture($,C.__webglTexture),Je($,ce),ct(U.__webglFramebuffer,M,ce,n.COLOR_ATTACHMENT0+K,$,0),E(ce)&&y($)}t.unbindTexture()}else{let K=n.TEXTURE_2D;if((M.isWebGL3DRenderTarget||M.isWebGLArrayRenderTarget)&&(K=M.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(K,te.__webglTexture),Je(K,_),_.mipmaps.length>0)for(let J=0;J<_.mipmaps.length;J++)ct(U.__webglFramebuffer[J],M,_,n.COLOR_ATTACHMENT0,K,J);else ct(U.__webglFramebuffer,M,_,n.COLOR_ATTACHMENT0,K,0);E(_)?y(K):_.mipmaps.length>0&&n.texParameteri(K,n.TEXTURE_MAX_LEVEL,_.mipmaps.length-1),t.unbindTexture()}M.depthBuffer&&Zt(M)}function D(M){let _=M.textures;for(let U=0,te=_.length;U<te;U++){let Z=_[U];if(E(Z)&&Z.mipmapsAutoUpdate===!0){let re=A(M),oe=i.get(Z).__webglTexture;t.bindTexture(re,oe),y(re),t.unbindTexture()}}}let Gt=[];function at(M){if(M.samples>0){if(G(M)===!1){let _=M.textures,U=M.width,te=M.height,Z=n.COLOR_BUFFER_BIT,re=M.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,oe=i.get(M),K=_.length>1;if(K)for(let ce=0;ce<_.length;ce++)t.bindFramebuffer(n.FRAMEBUFFER,oe.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ce,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,oe.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+ce,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,oe.__webglMultisampledFramebuffer),M.texture.mipmaps.length>0?t.bindFramebuffer(n.DRAW_FRAMEBUFFER,oe.__webglFramebuffer[0]):t.bindFramebuffer(n.DRAW_FRAMEBUFFER,oe.__webglFramebuffer);for(let ce=0;ce<_.length;ce++){if(M.resolveDepthBuffer&&(M.depthBuffer&&(Z|=n.DEPTH_BUFFER_BIT),M.stencilBuffer&&M.resolveStencilBuffer&&(Z|=n.STENCIL_BUFFER_BIT)),K){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,oe.__webglColorRenderbuffer[ce]);let C=i.get(_[ce]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,C,0)}n.blitFramebuffer(0,0,U,te,0,0,U,te,Z,n.NEAREST),l===!0&&(Gt.length=0,Gt.push(n.COLOR_ATTACHMENT0+ce),M.depthBuffer&&M.storeMultisampledDepthBuffer===!1&&Gt.push(re),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,Gt))}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),K)for(let ce=0;ce<_.length;ce++){t.bindFramebuffer(n.FRAMEBUFFER,oe.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ce,n.RENDERBUFFER,oe.__webglColorRenderbuffer[ce]);let C=i.get(_[ce]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,oe.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+ce,n.TEXTURE_2D,C,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,oe.__webglMultisampledFramebuffer)}else if(M.depthBuffer&&M.storeMultisampledDepthBuffer===!1&&l){let _=M.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[_])}}}function Q(M){return Math.min(s.maxSamples,M.samples)}function G(M){let _=i.get(M);return M.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&_.__useRenderToTexture!==!1}function ue(M){let _=a.render.frame;h.get(M)!==_&&(h.set(M,_),M.update())}function de(M,_){let U=M.colorSpace,te=M.format,Z=M.type;return M.isCompressedTexture===!0||M.isVideoTexture===!0||U!==$s&&U!==si&&(Ke.getTransfer(U)===et?(te!==Nn||Z!==hn)&&Ne("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Ue("WebGLTextures: Unsupported texture color space:",U)),_}function ve(M){return typeof HTMLImageElement<"u"&&M instanceof HTMLImageElement?(c.width=M.naturalWidth||M.width,c.height=M.naturalHeight||M.height):typeof VideoFrame<"u"&&M instanceof VideoFrame?(c.width=M.displayWidth,c.height=M.displayHeight):(c.width=M.width,c.height=M.height),c}this.allocateTextureUnit=Fe,this.resetTextureUnits=ee,this.getTextureUnits=ne,this.setTextureUnits=Te,this.setTexture2D=be,this.setTexture2DArray=_e,this.setTexture3D=Re,this.setTextureCube=ge,this.rebindTextures=zt,this.setupRenderTarget=$t,this.updateRenderTargetMipmap=D,this.updateMultisampleRenderTarget=at,this.setupDepthRenderbuffer=Zt,this.setupFrameBufferTexture=ct,this.useMultisampledRTT=G,this.dispose=H}function T_(n,e){function t(i,s=si){let r,a=Ke.getTransfer(s);if(i===hn)return n.UNSIGNED_BYTE;if(i===qa)return n.UNSIGNED_SHORT_4_4_4_4;if(i===Xa)return n.UNSIGNED_SHORT_5_5_5_1;if(i===sl)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===rl)return n.UNSIGNED_INT_10F_11F_11F_REV;if(i===nl)return n.BYTE;if(i===il)return n.SHORT;if(i===Rs)return n.UNSIGNED_SHORT;if(i===Wa)return n.INT;if(i===Ln)return n.UNSIGNED_INT;if(i===In)return n.FLOAT;if(i===Dn)return n.HALF_FLOAT;if(i===al)return n.ALPHA;if(i===ol)return n.RGB;if(i===Nn)return n.RGBA;if(i===Qn)return n.DEPTH_COMPONENT;if(i===ii)return n.DEPTH_STENCIL;if(i===cl)return n.RED;if(i===ja)return n.RED_INTEGER;if(i===Ti)return n.RG;if(i===Ka)return n.RG_INTEGER;if(i===Ya)return n.RGBA_INTEGER;if(i===Mr||i===wr||i===Er||i===Tr)if(a===et)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(i===Mr)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===wr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===Er)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Tr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(i===Mr)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===wr)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===Er)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Tr)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===Ja||i===Za||i===$a||i===Qa)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(i===Ja)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===Za)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===$a)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Qa)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===eo||i===to||i===no||i===io||i===so||i===Ar||i===ro)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(i===eo||i===to)return a===et?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(i===no)return a===et?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(i===io)return r.COMPRESSED_R11_EAC;if(i===so)return r.COMPRESSED_SIGNED_R11_EAC;if(i===Ar)return r.COMPRESSED_RG11_EAC;if(i===ro)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===ao||i===oo||i===co||i===lo||i===ho||i===uo||i===fo||i===po||i===mo||i===go||i===bo||i===_o||i===xo||i===vo)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(i===ao)return a===et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===oo)return a===et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===co)return a===et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===lo)return a===et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===ho)return a===et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===uo)return a===et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===fo)return a===et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===po)return a===et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===mo)return a===et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===go)return a===et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===bo)return a===et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===_o)return a===et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===xo)return a===et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===vo)return a===et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===yo||i===So||i===Mo)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(i===yo)return a===et?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===So)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Mo)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===wo||i===Eo||i===Cr||i===To)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(i===wo)return r.COMPRESSED_RED_RGTC1_EXT;if(i===Eo)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Cr)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===To)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===Xi?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:t}}function P_(n,e){function t(m,u){m.matrixAutoUpdate===!0&&m.updateMatrix(),u.value.copy(m.matrix)}function i(m,u){u.color.getRGB(m.fogColor.value,vl(n)),u.isFog?(m.fogNear.value=u.near,m.fogFar.value=u.far):u.isFogExp2&&(m.fogDensity.value=u.density)}function s(m,u,v,E,y){u.isNodeMaterial?u.uniformsNeedUpdate=!1:u.isMeshBasicMaterial?r(m,u):u.isMeshLambertMaterial?(r(m,u),u.envMap&&(m.envMapIntensity.value=u.envMapIntensity)):u.isMeshToonMaterial?(r(m,u),f(m,u)):u.isMeshPhongMaterial?(r(m,u),h(m,u),u.envMap&&(m.envMapIntensity.value=u.envMapIntensity)):u.isMeshStandardMaterial?(r(m,u),d(m,u),u.isMeshPhysicalMaterial&&p(m,u,y)):u.isMeshMatcapMaterial?(r(m,u),g(m,u)):u.isMeshDepthMaterial?r(m,u):u.isMeshDistanceMaterial?(r(m,u),S(m,u)):u.isMeshNormalMaterial?r(m,u):u.isLineBasicMaterial?(a(m,u),u.isLineDashedMaterial&&o(m,u)):u.isPointsMaterial?l(m,u,v,E):u.isSpriteMaterial?c(m,u):u.isShadowMaterial?(m.color.value.copy(u.color),m.opacity.value=u.opacity):u.isShaderMaterial&&(u.uniformsNeedUpdate=!1)}function r(m,u){m.opacity.value=u.opacity,u.color&&m.diffuse.value.copy(u.color),u.emissive&&m.emissive.value.copy(u.emissive).multiplyScalar(u.emissiveIntensity),u.map&&(m.map.value=u.map,t(u.map,m.mapTransform)),u.alphaMap&&(m.alphaMap.value=u.alphaMap,t(u.alphaMap,m.alphaMapTransform)),u.bumpMap&&(m.bumpMap.value=u.bumpMap,t(u.bumpMap,m.bumpMapTransform),m.bumpScale.value=u.bumpScale,u.side===on&&(m.bumpScale.value*=-1)),u.normalMap&&(m.normalMap.value=u.normalMap,t(u.normalMap,m.normalMapTransform),m.normalScale.value.copy(u.normalScale),u.side===on&&m.normalScale.value.negate()),u.displacementMap&&(m.displacementMap.value=u.displacementMap,t(u.displacementMap,m.displacementMapTransform),m.displacementScale.value=u.displacementScale,m.displacementBias.value=u.displacementBias),u.emissiveMap&&(m.emissiveMap.value=u.emissiveMap,t(u.emissiveMap,m.emissiveMapTransform)),u.specularMap&&(m.specularMap.value=u.specularMap,t(u.specularMap,m.specularMapTransform)),u.alphaTest>0&&(m.alphaTest.value=u.alphaTest);let v=e.get(u),E=v.envMap,y=v.envMapRotation;E&&(m.envMap.value=E,m.envMapRotation.value.setFromMatrix4(R_.makeRotationFromEuler(y)).transpose(),E.isCubeTexture&&E.isRenderTargetTexture===!1&&m.envMapRotation.value.premultiply(Td),m.reflectivity.value=u.reflectivity,m.ior.value=u.ior,m.refractionRatio.value=u.refractionRatio),u.lightMap&&(m.lightMap.value=u.lightMap,m.lightMapIntensity.value=u.lightMapIntensity,t(u.lightMap,m.lightMapTransform)),u.aoMap&&(m.aoMap.value=u.aoMap,m.aoMapIntensity.value=u.aoMapIntensity,t(u.aoMap,m.aoMapTransform))}function a(m,u){m.diffuse.value.copy(u.color),m.opacity.value=u.opacity,u.map&&(m.map.value=u.map,t(u.map,m.mapTransform))}function o(m,u){m.dashSize.value=u.dashSize,m.totalSize.value=u.dashSize+u.gapSize,m.scale.value=u.scale}function l(m,u,v,E){m.diffuse.value.copy(u.color),m.opacity.value=u.opacity,m.size.value=u.size*v,m.scale.value=E*.5,u.map&&(m.map.value=u.map,t(u.map,m.uvTransform)),u.alphaMap&&(m.alphaMap.value=u.alphaMap,t(u.alphaMap,m.alphaMapTransform)),u.alphaTest>0&&(m.alphaTest.value=u.alphaTest)}function c(m,u){m.diffuse.value.copy(u.color),m.opacity.value=u.opacity,m.rotation.value=u.rotation,u.map&&(m.map.value=u.map,t(u.map,m.mapTransform)),u.alphaMap&&(m.alphaMap.value=u.alphaMap,t(u.alphaMap,m.alphaMapTransform)),u.alphaTest>0&&(m.alphaTest.value=u.alphaTest)}function h(m,u){m.specular.value.copy(u.specular),m.shininess.value=Math.max(u.shininess,1e-4)}function f(m,u){u.gradientMap&&(m.gradientMap.value=u.gradientMap)}function d(m,u){m.metalness.value=u.metalness,u.metalnessMap&&(m.metalnessMap.value=u.metalnessMap,t(u.metalnessMap,m.metalnessMapTransform)),m.roughness.value=u.roughness,u.roughnessMap&&(m.roughnessMap.value=u.roughnessMap,t(u.roughnessMap,m.roughnessMapTransform)),u.envMap&&(m.envMapIntensity.value=u.envMapIntensity)}function p(m,u,v){m.ior.value=u.ior,u.diffuseRoughness>0&&(m.diffuseRoughness.value=u.diffuseRoughness,u.diffuseRoughnessMap&&(m.diffuseRoughnessMap.value=u.diffuseRoughnessMap,t(u.diffuseRoughnessMap,m.diffuseRoughnessMapTransform))),u.sheen>0&&(m.sheenColor.value.copy(u.sheenColor).multiplyScalar(u.sheen),m.sheenRoughness.value=u.sheenRoughness,u.sheenColorMap&&(m.sheenColorMap.value=u.sheenColorMap,t(u.sheenColorMap,m.sheenColorMapTransform)),u.sheenRoughnessMap&&(m.sheenRoughnessMap.value=u.sheenRoughnessMap,t(u.sheenRoughnessMap,m.sheenRoughnessMapTransform))),u.clearcoat>0&&(m.clearcoat.value=u.clearcoat,m.clearcoatRoughness.value=u.clearcoatRoughness,u.clearcoatMap&&(m.clearcoatMap.value=u.clearcoatMap,t(u.clearcoatMap,m.clearcoatMapTransform)),u.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=u.clearcoatRoughnessMap,t(u.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),u.clearcoatNormalMap&&(m.clearcoatNormalMap.value=u.clearcoatNormalMap,t(u.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(u.clearcoatNormalScale),u.side===on&&m.clearcoatNormalScale.value.negate())),u.dispersion>0&&(m.dispersion.value=u.dispersion),u.retroreflectivity>0&&(m.retroreflectivity.value=u.retroreflectivity),u.iridescence>0&&(m.iridescence.value=u.iridescence,m.iridescenceIOR.value=u.iridescenceIOR,m.iridescenceThicknessMinimum.value=u.iridescenceThicknessMinimum,m.iridescenceThicknessMaximum.value=u.iridescenceThicknessMaximum,u.iridescenceMap&&(m.iridescenceMap.value=u.iridescenceMap,t(u.iridescenceMap,m.iridescenceMapTransform)),u.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=u.iridescenceThicknessMap,t(u.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),u.transmission>0&&(m.transmission.value=u.transmission,m.transmissionSamplerMap.value=v.texture,m.transmissionSamplerSize.value.set(v.width,v.height),u.transmissionMap&&(m.transmissionMap.value=u.transmissionMap,t(u.transmissionMap,m.transmissionMapTransform)),m.thickness.value=u.thickness,u.thicknessMap&&(m.thicknessMap.value=u.thicknessMap,t(u.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=u.attenuationDistance,m.attenuationColor.value.copy(u.attenuationColor)),u.anisotropy>0&&(m.anisotropyVector.value.set(u.anisotropy*Math.cos(u.anisotropyRotation),u.anisotropy*Math.sin(u.anisotropyRotation)),u.anisotropyMap&&(m.anisotropyMap.value=u.anisotropyMap,t(u.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=u.specularIntensity,m.specularColor.value.copy(u.specularColor),u.specularColorMap&&(m.specularColorMap.value=u.specularColorMap,t(u.specularColorMap,m.specularColorMapTransform)),u.specularIntensityMap&&(m.specularIntensityMap.value=u.specularIntensityMap,t(u.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,u){u.matcap&&(m.matcap.value=u.matcap)}function S(m,u){let v=e.get(u).light;m.referencePosition.value.setFromMatrixPosition(v.matrixWorld),m.nearDistance.value=v.shadow.camera.near,m.farDistance.value=v.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function L_(n,e,t,i){let s={},r={};function a(v,E){let y=E.program;i.uniformBlockBinding(v,y,s[v.id])}function o(v,E){let y=s[v.id];y===void 0&&(g(v),y=l(v),s[v.id]=y,v.addEventListener("dispose",m));let A=E.program;i.updateUBOMapping(v,A);let T=e.render.frame;r[v.id]!==T&&(c(v),r[v.id]=T)}function l(v){let E=n.createBuffer(),y=v.__size,A=v.usage;return n.bindBuffer(n.UNIFORM_BUFFER,E),n.bufferData(n.UNIFORM_BUFFER,y,A),n.bindBuffer(n.UNIFORM_BUFFER,null),E}function c(v){let E=s[v.id],y=v.uniforms,A=v.__cache;n.bindBuffer(n.UNIFORM_BUFFER,E);for(let T=0,b=y.length;T<b;T++){let w=y[T];if(Array.isArray(w))for(let F=0,P=w.length;F<P;F++)h(w[F],T,F,A);else h(w,T,0,A)}n.bindBuffer(n.UNIFORM_BUFFER,null)}function h(v,E,y,A){if(d(v,E,y,A)===!0){let T=v.__offset,b=v.value;if(Array.isArray(b)){let w=0;for(let F=0;F<b.length;F++){let P=b[F],I=S(P,!0);f(P,v.__data,w),w+=I.storage/Float32Array.BYTES_PER_ELEMENT}}else f(b,v.__data,0);n.bufferSubData(n.UNIFORM_BUFFER,T,v.__data)}}function f(v,E,y){typeof v=="number"||typeof v=="boolean"?E[y]=v:v.isMatrix3?(E[y]=v.elements[0],E[y+1]=v.elements[1],E[y+2]=v.elements[2],E[y+3]=0,E[y+4]=v.elements[3],E[y+5]=v.elements[4],E[y+6]=v.elements[5],E[y+7]=0,E[y+8]=v.elements[6],E[y+9]=v.elements[7],E[y+10]=v.elements[8],E[y+11]=0):ArrayBuffer.isView(v)?E.set(v.subarray(0,E.length-y),y):v.toArray(E,y)}function d(v,E,y,A){let T=v.value,b=E+"_"+y;if(Array.isArray(T)){A[b]===void 0&&(A[b]=[]);let w=A[b],F=!1;for(let P=0;P<T.length;P++)p(T[P],w,P)===!0&&(F=!0);return F}return p(T,A,b)}function p(v,E,y){if(E[y]===void 0)return typeof v=="number"||typeof v=="boolean"?E[y]=v:ArrayBuffer.isView(v)?E[y]=v.slice():E[y]=v.clone(),!0;{let A=E[y];if(typeof v=="number"||typeof v=="boolean"){if(A!==v)return E[y]=v,!0}else{if(ArrayBuffer.isView(v))return!0;if(A.equals(v)===!1)return A.copy(v),!0}}return!1}function g(v){let E=v.uniforms,y=0,A=16;for(let b=0,w=E.length;b<w;b++){let F=Array.isArray(E[b])?E[b]:[E[b]];for(let P=0,I=F.length;P<I;P++){let k=F[P],W=Array.isArray(k.value)?k.value:[k.value],R=Array.isArray(E[b])||Array.isArray(k.value),H=y;for(let z=0,ie=W.length;z<ie;z++){let q=W[z],ee=S(q,R),ne=y%A,Te=ne%ee.boundary,Fe=ne+Te;y+=Te,Fe!==0&&A-Fe<ee.storage&&(y+=A-Fe),z===0&&(H=y),y+=ee.storage}let j=k.type==="int"?Int32Array:k.type==="uint"?Uint32Array:Float32Array;k.__data=new j((y-H)/Float32Array.BYTES_PER_ELEMENT),k.__offset=H}}let T=y%A;return T>0&&(y+=A-T),v.__size=y,v.__cache={},this}function S(v,E){let y={boundary:0,storage:0};return typeof v=="number"||typeof v=="boolean"?(y.boundary=4,y.storage=4):v.isVector2?(y.boundary=8,y.storage=8):v.isVector3||v.isColor?(y.boundary=16,y.storage=12):v.isVector4?(y.boundary=16,y.storage=16):v.isMatrix3?(y.boundary=16,y.storage=48):v.isMatrix4?(y.boundary=16,y.storage=64):v.isTexture?Ne("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(v)?(y.boundary=16,y.storage=v.byteLength):Ne("WebGLRenderer: Unsupported uniform value type.",v),E===!0&&(y.boundary=16,y.storage=Math.ceil(y.storage/16)*16),y}function m(v){let E=v.target;E.removeEventListener("dispose",m),n.deleteBuffer(s[E.id]),delete s[E.id],delete r[E.id]}function u(){for(let v in s)n.deleteBuffer(s[v]);s={},r={}}return{bind:a,update:o,dispose:u}}function D_(){return zn===null&&(zn=new Ea(I_,16,16,Ti,Dn),zn.name="DFG_LUT",zn.minFilter=nn,zn.magFilter=nn,zn.wrapS=On,zn.wrapT=On,zn.generateMipmaps=!1,zn.needsUpdate=!0),zn}var Jp,Zp,$p,Qp,em,tm,nm,im,sm,rm,am,om,cm,lm,hm,um,dm,fm,pm,mm,gm,bm,_m,xm,vm,ym,Sm,Mm,wm,Em,Tm,Am,Cm,Rm,Pm,Lm,Im,Dm,Nm,Um,Fm,Om,Bm,km,zm,Gm,Vm,Hm,Wm,qm,Xm,jm,Km,Ym,Jm,Zm,$m,Qm,eg,tg,ng,ig,sg,rg,ag,og,cg,lg,hg,ug,dg,fg,pg,mg,gg,bg,_g,xg,vg,yg,Sg,Mg,wg,Eg,Tg,Ag,Cg,Rg,Pg,Lg,Ig,Dg,Ng,Ug,Fg,Og,Bg,kg,zg,Gg,Vg,Hg,Wg,qg,Xg,jg,Kg,Yg,Jg,Zg,$g,Qg,e0,t0,n0,i0,s0,r0,a0,o0,c0,l0,h0,u0,d0,f0,p0,m0,g0,b0,_0,x0,v0,y0,S0,M0,w0,E0,T0,A0,C0,He,me,cn,Ro,R0,bd,Ir,Yu,U0,F0,_d,xd,O0,B0,k0,Lo,J0,vd,yd,Sd,Md,wd,Ed,Qu,ed,td,nd,id,Al,Cl,Rl,El,Ps,kb,zb,ad,Wb,Po,Jb,$b,e_,n_,s_,o_,Ll,Il,m_,x_,v_,y_,S_,md,Pr,Tl,A_,C_,Dl,Nl,R_,Td,I_,zn,Io,Is=xt(()=>{wl();wl();/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */Jp=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Zp=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,$p=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Qp=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,em=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,tm=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,nm=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,im=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,sm=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,rm=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,am=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,om=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,cm=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,lm=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,hm=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,um=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,dm=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,fm=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,pm=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,mm=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,gm=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,bm=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,_m=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,xm=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,vm=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,ym=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Sm=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Mm=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,wm=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Em="gl_FragColor = linearToOutputTexel( gl_FragColor );",Tm=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Am=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,Cm=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	uniform samplerCube envMap;
	#ifdef ENVMAP_TYPE_PMREM
		float roughnessToMip( const in float roughness ) {
			float r = clamp( roughness, 0.0, 1.0 );
			return ENVMAP_MAX_LOD * r * ( 2.0 - r );
		}
	#endif
#endif`,Rm=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Pm=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Lm=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Im=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Dm=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Nm=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Um=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Fm=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Om=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Bm=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,km=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,zm=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,Gm=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_PMREM
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureLod( envMap, envMapRotation * worldNormal, ENVMAP_MAX_LOD );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_PMREM
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureLod( envMap, envMapRotation * reflectVec, roughnessToMip( roughness ) );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_PMREM
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureLod( envMap, envMapRotation * retroVec, roughnessToMip( roughness ) );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_PMREM
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_PMREM
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,Vm=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Hm=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Wm=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,qm=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Xm=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.045 );
material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef USE_DIFFUSE_ROUGHNESS
	float diffuseRoughnessFactor = diffuseRoughness;
	#ifdef USE_DIFFUSE_ROUGHNESSMAP
		diffuseRoughnessFactor *= texture2D( diffuseRoughnessMap, vDiffuseRoughnessMapUv ).r;
	#endif
	material.diffuseRoughness = saturate( diffuseRoughnessFactor );
#endif
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.045 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,jm=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_DIFFUSE_ROUGHNESS
		float diffuseRoughness;
	#endif
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
#ifdef USE_DIFFUSE_ROUGHNESS
	const float EON_EPSILON = 1e-7;
	float FON_DirectionalAlbedo( const in float mu, const in float roughness, const in float A ) {
		float muComp = 1.0 - mu;
		float gOverPi = muComp * ( 0.0571085289 + muComp * ( 0.491881867 + muComp * ( - 0.332181442 + muComp * 0.0714429953 ) ) );
		return A * ( 1.0 + roughness * gOverPi );
	}
	vec3 BRDF_EON( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 diffuseColor, const in float roughness ) {
		vec3 rho = saturate( diffuseColor );
		if ( roughness <= EON_EPSILON ) return BRDF_Lambert( rho );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float s = dot( lightDir, viewDir ) - dotNL * dotNV;
		float sOverT = ( s > 0.0 ) ? s / max( max( dotNL, dotNV ), EON_EPSILON ) : s;
		float A = 1.0 / ( 1.0 + ( 0.5 - 2.0 / ( 3.0 * PI ) ) * roughness );
		vec3 singleScatter = rho * RECIPROCAL_PI * A * ( 1.0 + roughness * sOverT );
		float averageAlbedo = A * ( 1.0 + ( 2.0 / 3.0 - 28.0 / ( 15.0 * PI ) ) * roughness );
		float albedoV = FON_DirectionalAlbedo( dotNV, roughness, A );
		float albedoL = FON_DirectionalAlbedo( dotNL, roughness, A );
		vec3 rhoMultiScatter = rho * rho * averageAlbedo / max( vec3( EON_EPSILON ), vec3( 1.0 ) - rho * ( 1.0 - averageAlbedo ) );
		vec3 multiScatter = rhoMultiScatter * RECIPROCAL_PI
			* max( EON_EPSILON, 1.0 - albedoV )
			* max( EON_EPSILON, 1.0 - albedoL )
			/ max( EON_EPSILON, 1.0 - averageAlbedo );
		return singleScatter + multiScatter;
	}
	vec3 EON_DirectionalAlbedo( const in vec3 diffuseColor, const in float roughness, const in float dotNV ) {
		vec3 rho = saturate( diffuseColor );
		if ( roughness <= EON_EPSILON ) return rho;
		float A = 1.0 / ( 1.0 + ( 0.5 - 2.0 / ( 3.0 * PI ) ) * roughness );
		float directionalAlbedo = FON_DirectionalAlbedo( dotNV, roughness, A );
		float averageAlbedo = A * ( 1.0 + ( 2.0 / 3.0 - 28.0 / ( 15.0 * PI ) ) * roughness );
		vec3 rhoMultiScatter = rho * rho * averageAlbedo / max( vec3( EON_EPSILON ), vec3( 1.0 ) - rho * ( 1.0 - averageAlbedo ) );
		return rho * directionalAlbedo + rhoMultiScatter * ( 1.0 - directionalAlbedo );
	}
#endif
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = max( material.clearcoatRoughness, 0.045 );
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = max( material.roughness, 0.045 );
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float alphaT = max( material.alphaT, alpha );
		float V = V_GGX_SmithCorrelated_Anisotropic( alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	#ifdef USE_DIFFUSE_ROUGHNESS
		vec3 diffuseBRDF = BRDF_EON( directLight.direction, geometryViewDir, geometryNormal, material.diffuseColor, material.diffuseRoughness ) * ( 1.0 - material.metalness );
	#else
		vec3 diffuseBRDF = BRDF_Lambert( material.diffuseContribution );
	#endif
	reflectedLight.directDiffuse += irradiance * diffuseBRDF * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	#ifdef USE_DIFFUSE_ROUGHNESS
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		vec3 diffuseAlbedo = EON_DirectionalAlbedo( material.diffuseColor, material.diffuseRoughness, dotNV ) * ( 1.0 - material.metalness );
		vec3 diffuse = irradiance * RECIPROCAL_PI * diffuseAlbedo * ( 1.0 - singleScattering - multiScattering );
	#else
		vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#endif
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	#ifdef USE_DIFFUSE_ROUGHNESS
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		vec3 diffuse = EON_DirectionalAlbedo( material.diffuseColor, material.diffuseRoughness, dotNV ) * ( 1.0 - material.metalness ) * ( 1.0 - totalScatteringDielectric );
	#else
		vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	#endif
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Km=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_LIGHT_PROBE_GRIDS > 0
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		int probeGrid = - 1;
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_LIGHT_PROBE_GRIDS; i ++ ) {
			if ( isInsideLightProbeGrid( probeWorldPos, probeWorldNormal, probesMin[ i ], probesMax[ i ], probesResolution[ i ] ) ) probeGrid = UNROLLED_LOOP_INDEX;
		}
		#pragma unroll_loop_end
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_LIGHT_PROBE_GRIDS; i ++ ) {
			if ( probeGrid == UNROLLED_LOOP_INDEX ) irradiance += getLightProbeGridIrradiance( probesSH[ i ], probesMin[ i ], probesMax[ i ], probesResolution[ i ], probeWorldPos, probeWorldNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Ym=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_PMREM )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Jm=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Zm=`#if NUM_LIGHT_PROBE_GRIDS > 0
uniform highp sampler3D probesSH[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesMin[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesMax[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesResolution[ NUM_LIGHT_PROBE_GRIDS ];
bool isInsideLightProbeGrid( vec3 worldPos, vec3 worldNormal, vec3 probesMin, vec3 probesMax, vec3 probesResolution ) {
	vec3 spacing = ( probesMax - probesMin ) / probesResolution;
	vec3 samplePos = worldPos + worldNormal * spacing * 0.5;
	vec3 margin = spacing * 0.01;
	return all( greaterThanEqual( samplePos, probesMin - margin ) ) && all( lessThanEqual( samplePos, probesMax + margin ) );
}
vec3 getLightProbeGridIrradiance( highp sampler3D probesSH, vec3 probesMin, vec3 probesMax, vec3 probesResolution, vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 probeSpacing = gridRange / res;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.5 / res, 1.0 - 0.5 / res );
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,$m=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Qm=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,eg=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,tg=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,ng=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,ig=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,sg=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,rg=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,ag=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,og=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,cg=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,lg=`#if defined( USE_MORPHCOLORS )
	#if defined( USE_COLOR_ALPHA )
		vColor *= morphTargetBaseInfluence;
	#elif defined( USE_COLOR )
		vColor.rgb *= morphTargetBaseInfluence;
	#endif
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor.rgb += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,hg=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,ug=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,dg=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,fg=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,pg=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,mg=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,gg=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,bg=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,_g=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,xg=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,vg=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,yg=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Sg=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Mg=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,wg=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,Eg=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Tg=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Ag=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Cg=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Rg=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Pg=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Lg=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				vec2 radius = shadowRadius * texelSize;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float lightDistance = length( lightToPosition );
			float depthRange = shadowCameraFar - shadowCameraNear;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float depthA = - shadowCameraNear / depthRange - shadowBias;
				float depthB = shadowCameraNear * shadowCameraFar / ( depthRange * lightDistance );
			#else
				float depthA = shadowCameraFar / depthRange + shadowBias;
				float depthB = - shadowCameraNear * shadowCameraFar / ( depthRange * lightDistance );
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			shadow = 0.0;
			for ( int i = 0; i < 5; i ++ ) {
				vec2 offset = vogelDiskSample( i, 5, phi );
				vec3 direction = bd3D + ( tangent * offset.x + bitangent * offset.y ) * texelSize;
				vec3 absDirection = abs( direction );
				float dp = depthA + depthB / max( max( absDirection.x, absDirection.y ), absDirection.z );
				shadow += texture( shadowMap, vec4( direction, dp ) );
			}
			shadow *= 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,Ig=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Dg=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Ng=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Ug=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Fg=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Og=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Bg=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,kg=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,zg=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Gg=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Vg=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Hg=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Wg=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,qg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	varying vec2 vDiffuseRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Xg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	uniform mat3 diffuseRoughnessMapTransform;
	varying vec2 vDiffuseRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,jg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	vDiffuseRoughnessMapUv = ( diffuseRoughnessMapTransform * vec3( DIFFUSE_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Kg=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,Yg=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Jg=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Zg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,$g=`uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <envmap_common_pars_fragment>
void main() {
	#ifdef ENVMAP_TYPE_PMREM
		vec4 texColor = textureLod( envMap, backgroundRotation * vWorldDirection, roughnessToMip( backgroundBlurriness ) );
	#else
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Qg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,e0=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,t0=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,n0=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,i0=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,s0=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,r0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,a0=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,o0=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,c0=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,l0=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,h0=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,u0=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,d0=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,f0=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,p0=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,m0=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,g0=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,b0=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,_0=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,x0=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,v0=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DIFFUSE_ROUGHNESS
	uniform float diffuseRoughness;
	#ifdef USE_DIFFUSE_ROUGHNESSMAP
		uniform sampler2D diffuseRoughnessMap;
	#endif
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,y0=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,S0=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,M0=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,w0=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,E0=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,T0=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,A0=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,C0=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,He={alphahash_fragment:Jp,alphahash_pars_fragment:Zp,alphamap_fragment:$p,alphamap_pars_fragment:Qp,alphatest_fragment:em,alphatest_pars_fragment:tm,aomap_fragment:nm,aomap_pars_fragment:im,batching_pars_vertex:sm,batching_vertex:rm,begin_vertex:am,beginnormal_vertex:om,bsdfs:cm,iridescence_fragment:lm,bumpmap_pars_fragment:hm,clipping_planes_fragment:um,clipping_planes_pars_fragment:dm,clipping_planes_pars_vertex:fm,clipping_planes_vertex:pm,color_fragment:mm,color_pars_fragment:gm,color_pars_vertex:bm,color_vertex:_m,common:xm,defaultnormal_vertex:vm,displacementmap_pars_vertex:ym,displacementmap_vertex:Sm,emissivemap_fragment:Mm,emissivemap_pars_fragment:wm,colorspace_fragment:Em,colorspace_pars_fragment:Tm,envmap_fragment:Am,envmap_common_pars_fragment:Cm,envmap_pars_fragment:Rm,envmap_pars_vertex:Pm,envmap_physical_pars_fragment:Gm,envmap_vertex:Lm,fog_vertex:Im,fog_pars_vertex:Dm,fog_fragment:Nm,fog_pars_fragment:Um,gradientmap_pars_fragment:Fm,lightmap_pars_fragment:Om,lights_lambert_fragment:Bm,lights_lambert_pars_fragment:km,lights_pars_begin:zm,lights_toon_fragment:Vm,lights_toon_pars_fragment:Hm,lights_phong_fragment:Wm,lights_phong_pars_fragment:qm,lights_physical_fragment:Xm,lights_physical_pars_fragment:jm,lights_fragment_begin:Km,lights_fragment_maps:Ym,lights_fragment_end:Jm,lightprobes_pars_fragment:Zm,logdepthbuf_fragment:$m,logdepthbuf_pars_fragment:Qm,logdepthbuf_pars_vertex:eg,logdepthbuf_vertex:tg,map_fragment:ng,map_pars_fragment:ig,map_particle_fragment:sg,map_particle_pars_fragment:rg,metalnessmap_fragment:ag,metalnessmap_pars_fragment:og,morphinstance_vertex:cg,morphcolor_vertex:lg,morphnormal_vertex:hg,morphtarget_pars_vertex:ug,morphtarget_vertex:dg,normal_fragment_begin:fg,normal_fragment_maps:pg,normal_pars_fragment:mg,normal_pars_vertex:gg,normal_vertex:bg,normalmap_pars_fragment:_g,clearcoat_normal_fragment_begin:xg,clearcoat_normal_fragment_maps:vg,clearcoat_pars_fragment:yg,iridescence_pars_fragment:Sg,opaque_fragment:Mg,packing:wg,premultiplied_alpha_fragment:Eg,project_vertex:Tg,dithering_fragment:Ag,dithering_pars_fragment:Cg,roughnessmap_fragment:Rg,roughnessmap_pars_fragment:Pg,shadowmap_pars_fragment:Lg,shadowmap_pars_vertex:Ig,shadowmap_vertex:Dg,shadowmask_pars_fragment:Ng,skinbase_vertex:Ug,skinning_pars_vertex:Fg,skinning_vertex:Og,skinnormal_vertex:Bg,specularmap_fragment:kg,specularmap_pars_fragment:zg,tonemapping_fragment:Gg,tonemapping_pars_fragment:Vg,transmission_fragment:Hg,transmission_pars_fragment:Wg,uv_pars_fragment:qg,uv_pars_vertex:Xg,uv_vertex:jg,worldpos_vertex:Kg,background_vert:Yg,background_frag:Jg,backgroundCube_vert:Zg,backgroundCube_frag:$g,cube_vert:Qg,cube_frag:e0,depth_vert:t0,depth_frag:n0,distance_vert:i0,distance_frag:s0,equirect_vert:r0,equirect_frag:a0,linedashed_vert:o0,linedashed_frag:c0,meshbasic_vert:l0,meshbasic_frag:h0,meshlambert_vert:u0,meshlambert_frag:d0,meshmatcap_vert:f0,meshmatcap_frag:p0,meshnormal_vert:m0,meshnormal_frag:g0,meshphong_vert:b0,meshphong_frag:_0,meshphysical_vert:x0,meshphysical_frag:v0,meshtoon_vert:y0,meshtoon_frag:S0,points_vert:M0,points_frag:w0,shadow_vert:E0,shadow_frag:T0,sprite_vert:A0,sprite_frag:C0},me={common:{diffuse:{value:new qe(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Be},alphaMap:{value:null},alphaMapTransform:{value:new Be},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Be}},envmap:{envMap:{value:null},envMapRotation:{value:new Be},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Be}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Be}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Be},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Be},normalScale:{value:new De(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Be},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Be}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Be}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Be}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new qe(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:[]},probesMin:{value:[]},probesMax:{value:[]},probesResolution:{value:[]}},points:{diffuse:{value:new qe(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Be},alphaTest:{value:0},uvTransform:{value:new Be}},sprite:{diffuse:{value:new qe(16777215)},opacity:{value:1},center:{value:new De(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Be},alphaMap:{value:null},alphaMapTransform:{value:new Be},alphaTest:{value:0}}},cn={basic:{uniforms:Yt([me.common,me.specularmap,me.envmap,me.aomap,me.lightmap,me.fog]),vertexShader:He.meshbasic_vert,fragmentShader:He.meshbasic_frag},lambert:{uniforms:Yt([me.common,me.specularmap,me.envmap,me.aomap,me.lightmap,me.emissivemap,me.bumpmap,me.normalmap,me.displacementmap,me.fog,me.lights,{emissive:{value:new qe(0)},envMapIntensity:{value:1}}]),vertexShader:He.meshlambert_vert,fragmentShader:He.meshlambert_frag},phong:{uniforms:Yt([me.common,me.specularmap,me.envmap,me.aomap,me.lightmap,me.emissivemap,me.bumpmap,me.normalmap,me.displacementmap,me.fog,me.lights,{emissive:{value:new qe(0)},specular:{value:new qe(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:He.meshphong_vert,fragmentShader:He.meshphong_frag},standard:{uniforms:Yt([me.common,me.envmap,me.aomap,me.lightmap,me.emissivemap,me.bumpmap,me.normalmap,me.displacementmap,me.roughnessmap,me.metalnessmap,me.fog,me.lights,{emissive:{value:new qe(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:He.meshphysical_vert,fragmentShader:He.meshphysical_frag},toon:{uniforms:Yt([me.common,me.aomap,me.lightmap,me.emissivemap,me.bumpmap,me.normalmap,me.displacementmap,me.gradientmap,me.fog,me.lights,{emissive:{value:new qe(0)}}]),vertexShader:He.meshtoon_vert,fragmentShader:He.meshtoon_frag},matcap:{uniforms:Yt([me.common,me.bumpmap,me.normalmap,me.displacementmap,me.fog,{matcap:{value:null}}]),vertexShader:He.meshmatcap_vert,fragmentShader:He.meshmatcap_frag},points:{uniforms:Yt([me.points,me.fog]),vertexShader:He.points_vert,fragmentShader:He.points_frag},dashed:{uniforms:Yt([me.common,me.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:He.linedashed_vert,fragmentShader:He.linedashed_frag},depth:{uniforms:Yt([me.common,me.displacementmap]),vertexShader:He.depth_vert,fragmentShader:He.depth_frag},normal:{uniforms:Yt([me.common,me.bumpmap,me.normalmap,me.displacementmap,{opacity:{value:1}}]),vertexShader:He.meshnormal_vert,fragmentShader:He.meshnormal_frag},sprite:{uniforms:Yt([me.sprite,me.fog]),vertexShader:He.sprite_vert,fragmentShader:He.sprite_frag},background:{uniforms:{uvTransform:{value:new Be},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:He.background_vert,fragmentShader:He.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Be}},vertexShader:He.backgroundCube_vert,fragmentShader:He.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:He.cube_vert,fragmentShader:He.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:He.equirect_vert,fragmentShader:He.equirect_frag},distance:{uniforms:Yt([me.common,me.displacementmap,{referencePosition:{value:new N},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:He.distance_vert,fragmentShader:He.distance_frag},shadow:{uniforms:Yt([me.lights,me.fog,{color:{value:new qe(0)},opacity:{value:1}}]),vertexShader:He.shadow_vert,fragmentShader:He.shadow_frag}};cn.physical={uniforms:Yt([cn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Be},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Be},clearcoatNormalScale:{value:new De(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Be},diffuseRoughness:{value:0},diffuseRoughnessMap:{value:null},diffuseRoughnessMapTransform:{value:new Be},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Be},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Be},sheen:{value:0},sheenColor:{value:new qe(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Be},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Be},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Be},transmissionSamplerSize:{value:new De},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Be},attenuationDistance:{value:0},attenuationColor:{value:new qe(0)},specularColor:{value:new qe(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Be},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Be},anisotropyVector:{value:new De},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Be}}]),vertexShader:He.meshphysical_vert,fragmentShader:He.meshphysical_frag};Ro={r:0,b:0,g:0},R0=new it,bd=new Be;bd.set(-1,0,0,0,1,0,0,0,1);Ir=class extends mn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let i={width:e,height:e,depth:1},s=[i,i,i,i,i,i];this.texture=new ar(s),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new ys(5,5,5),r=new Sn({name:"CubemapFromEquirect",uniforms:ji(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:on,blending:Hi});r.uniforms.tEquirect.value=t;let a=new St(s,r),o=t.minFilter;return t.minFilter===ni&&(t.minFilter=nn),new ws(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,i=!0,s=!0){let r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,i,s);e.setRenderTarget(r)}},Yu=256,U0=3,F0=20,_d=256,xd=16,O0=3,B0=new N,k0=new qe,Lo=class n{constructor(e){this._renderer=e,this._cubeSize=0,this._sourceTarget=null,this._cubeCamera=new ws(1,10,null),this._boxMesh=new St(new ys(5,5,5),null),this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null,this._integrationMaterial=null}fromScene(e,t=0,i=.1,s=100,r={}){let{size:a=256,position:o=B0}=r,l=this._renderer;this._setSize(a);let c=this._allocateTarget(),h=this._getSourceTarget(!0);t>0&&(h.texture.mipmapsAutoUpdate=!1);let f=l.autoClear,d=l.autoClearColor,p=l.autoClearDepth,g=l.autoClearStencil,S=e.background;l.autoClear=!0,l.autoClearColor=!0,l.autoClearDepth=!0,l.autoClearStencil=!0,S===null&&(e.background=l.getClearColor(k0));let m=new ws(i,s,h);return m.position.copy(o),m.update(l,e),l.autoClear=f,l.autoClearColor=d,l.autoClearDepth=p,l.autoClearStencil=g,e.background=S,t>0&&(h.texture.mipmapsAutoUpdate=!0,this._blur(c,t)),this._applyPMREM(c),c}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=$u(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Zu(),this._compileMaterial(this._equirectMaterial))}dispose(){this._sourceTarget!==null&&this._sourceTarget.dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._integrationMaterial!==null&&this._integrationMaterial.dispose(),this._boxMesh.geometry.dispose()}static lodToRoughness(e,t){return t>0?1-Math.sqrt(1-e/t):0}_setSize(e){this._cubeSize=Math.max(Yu,bl(e))}_fromTexture(e,t){e.mapping===qi||e.mapping===Cs?this._setSize(e.image.length===0?Yu:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4);let i=t||this._allocateTarget();return this._textureToCubemap(e),this._applyPMREM(i),i}_allocateTarget(){let e=this._cubeSize,t=Ju(e,!1,!1),i=Math.log2(e)-U0;for(let s=0;s<=i;s++)t.texture.mipmaps.push({width:e>>s,height:e>>s});return t.texture.name="PMREM",t.texture.isPMREMTexture=!0,t}_getSourceTarget(e=!1){let t=this._cubeSize,i=this._sourceTarget;return(i===null||i.width!==t||e&&i.depthBuffer===!1)&&(i!==null&&i.dispose(),this._sourceTarget=Ju(t,!0,e)),this._sourceTarget}_compileMaterial(e){this._boxMesh.material=e,this._renderer.compile(this._boxMesh,this._cubeCamera.children[0])}_renderCube(e,t,i){let s=this._boxMesh,r=this._cubeCamera;s.material=i,r.renderTarget=e,r.activeMipmapLevel=t;let a=e.width>>t;e.viewport.set(0,0,a,a),r.update(this._renderer,s),e.viewport.set(0,0,e.width,e.height)}_textureToCubemap(e){let t;e.mapping===qi||e.mapping===Cs?(this._cubemapMaterial===null&&(this._cubemapMaterial=$u()),t=this._cubemapMaterial,t.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):(this._equirectMaterial===null&&(this._equirectMaterial=Zu()),t=this._equirectMaterial),t.uniforms.envMap.value=e,this._renderCube(this._getSourceTarget(),0,t)}_applyPMREM(e){this._ggxMaterial===null&&(this._ggxMaterial=z0(),this._integrationMaterial=G0());let t=this._cubeSize,i=e.texture.mipmaps.length-1,s=this._ggxMaterial.uniforms;s.envMap.value=this._sourceTarget.texture;let r=this._integrationMaterial.uniforms;r.envMap.value=this._sourceTarget.texture,r.sourceLod.value=Math.log2(t/xd);for(let a=0;a<=i;a++){let o=n.lodToRoughness(a,i);if(a>i-O0)r.roughness.value=o,this._renderCube(e,a,this._integrationMaterial);else{let l=o>0?Math.log2(t)+.5*Math.log2(6/(_d*Math.pow(o,4)))+.5:0;s.roughness.value=o,s.lodBias.value=l,this._renderCube(e,a,this._ggxMaterial)}}}_blur(e,t){this._blurMaterial===null&&(this._blurMaterial=V0());let i=this._blurMaterial,s=i.uniforms,r=this._sourceTarget;s.sigma.value=Math.min(t,Math.PI)/Math.SQRT2,s.envMap.value=r.texture,this._renderCube(e,0,i),s.envMap.value=e.texture,this._renderCube(r,0,i)}};J0={[Yc]:"LINEAR_TONE_MAPPING",[Jc]:"REINHARD_TONE_MAPPING",[Zc]:"CINEON_TONE_MAPPING",[yr]:"ACES_FILMIC_TONE_MAPPING",[Qc]:"AGX_TONE_MAPPING",[el]:"NEUTRAL_TONE_MAPPING",[$c]:"CUSTOM_TONE_MAPPING"};vd=new sn,yd=new ti(1,1),Sd=new cr(1),Md=new nr,wd=new Ma,Ed=new ar,Qu=[],ed=[],td=new Float32Array(16),nd=new Float32Array(9),id=new Float32Array(4);Al=class{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=bb(t.type)}},Cl=class{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Ob(t.type)}},Rl=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){let s=this.seq;for(let r=0,a=s.length;r!==a;++r){let o=s[r];o.setValue(e,t[o.id],i)}}},El=/(\w+)(\])?(\[|\.)?/g;Ps=class{constructor(e,t){this.seq=[],this.map={};let i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<i;++a){let o=e.getActiveUniform(t,a),l=e.getUniformLocation(t,o.name);Bb(o,l,this)}let s=[],r=[];for(let a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?s.push(a):r.push(a);s.length>0&&(this.seq=s.concat(r))}setValue(e,t,i,s){let r=this.map[t];r!==void 0&&r.setValue(e,i,s)}setOptional(e,t,i){let s=t[i];s!==void 0&&this.setValue(e,i,s)}static upload(e,t,i,s){for(let r=0,a=t.length;r!==a;++r){let o=t[r],l=i[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,s)}}static seqWithValue(e,t){let i=[];for(let s=0,r=e.length;s!==r;++s){let a=e[s];a.id in t&&i.push(a)}return i}};kb=37297,zb=0;ad=new Be;Wb={[Yc]:"Linear",[Jc]:"Reinhard",[Zc]:"Cineon",[yr]:"ACESFilmic",[Qc]:"AgX",[el]:"Neutral",[$c]:"Custom"};Po=new N;Jb=/^[ \t]*#include +<([\w\d./]+)>/gm;$b=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;e_={[vr]:"SHADOWMAP_TYPE_PCF",[Ts]:"SHADOWMAP_TYPE_VSM"};n_={[Cs]:"ENVMAP_MODE_REFRACTION"};s_={[Kc]:"ENVMAP_BLENDING_MULTIPLY",[Lu]:"ENVMAP_BLENDING_MIX",[Iu]:"ENVMAP_BLENDING_ADD"};o_=0,Ll=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,i){let s=this._getShaderCacheForMaterial(e);return s.has(t)===!1&&(s.add(t),t.usedTimes++),s.has(i)===!1&&(s.add(i),i.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){let t=this.shaderCache,i=t.get(e);return i===void 0&&(i=new Il(e),t.set(e,i)),i}},Il=class{constructor(e){this.id=o_++,this.code=e,this.usedTimes=0}};m_=0;x_=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,v_=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,y_=[new N(1,0,0),new N(-1,0,0),new N(0,1,0),new N(0,-1,0),new N(0,0,1),new N(0,0,-1)],S_=[new N(0,-1,0),new N(0,-1,0),new N(0,0,1),new N(0,0,-1),new N(0,-1,0),new N(0,-1,0)],md=new it,Pr=new N,Tl=new N;A_=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,C_=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,Dl=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let i=new lr(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,i=new Sn({vertexShader:A_,fragmentShader:C_,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new St(new hr(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Nl=class extends Rn{constructor(e,t){super();let i=this,s=null,r=1,a=null,o="local-floor",l=1,c=null,h=null,f=null,d=null,p=null,g=null,S=typeof XRWebGLBinding<"u",m=new Dl,u={},v=t.getContextAttributes(),E=null,y=null,A=[],T=[],b=new De,w=null,F=null,P=new jt;P.viewport=new Ze;let I=new jt;I.viewport=new Ze;let k=[P,I],W=new za,R=null,H=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Y){let be=A[Y];return be===void 0&&(be=new vs,A[Y]=be),be.getTargetRaySpace()},this.getControllerGrip=function(Y){let be=A[Y];return be===void 0&&(be=new vs,A[Y]=be),be.getGripSpace()},this.getHand=function(Y){let be=A[Y];return be===void 0&&(be=new vs,A[Y]=be),be.getHandSpace()};function j(Y){let be=T.indexOf(Y.inputSource);if(be===-1)return;let _e=A[be];_e!==void 0&&(_e.update(Y.inputSource,Y.frame,c||a),_e.dispatchEvent({type:Y.type,data:Y.inputSource}))}function z(){s.removeEventListener("select",j),s.removeEventListener("selectstart",j),s.removeEventListener("selectend",j),s.removeEventListener("squeeze",j),s.removeEventListener("squeezestart",j),s.removeEventListener("squeezeend",j),s.removeEventListener("end",z),s.removeEventListener("inputsourceschange",ie);for(let Y=0;Y<A.length;Y++){let be=T[Y];be!==null&&(T[Y]=null,A[Y].disconnect(be))}R=null,H=null,m.reset();for(let Y in u)delete u[Y];if(e.setRenderTarget(E),p=null,d=null,f=null,s=null,y=null,Fe.stop(),i.isPresenting=!1,e.setPixelRatio(w),e.setSize(b.width,b.height,!1),F!==null){let Y=F.camera;Y.fov=F.fov,Y.zoom=F.zoom,Y.updateProjectionMatrix(),F=null}i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Y){r=Y,i.isPresenting===!0&&Ne("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Y){o=Y,i.isPresenting===!0&&Ne("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(Y){c=Y},this.getBaseLayer=function(){return d!==null?d:p},this.getBinding=function(){return f===null&&S&&(f=new XRWebGLBinding(s,t)),f},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(Y){if(s=Y,s!==null){if(E=e.getRenderTarget(),s.addEventListener("select",j),s.addEventListener("selectstart",j),s.addEventListener("selectend",j),s.addEventListener("squeeze",j),s.addEventListener("squeezestart",j),s.addEventListener("squeezeend",j),s.addEventListener("end",z),s.addEventListener("inputsourceschange",ie),v.xrCompatible!==!0&&await t.makeXRCompatible(),w=e.getPixelRatio(),e.getSize(b),S&&"createProjectionLayer"in XRWebGLBinding.prototype){let _e=null,Re=null,ge=null;v.depth&&(ge=v.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,_e=v.stencil?ii:Qn,Re=v.stencil?Xi:Ln);let Oe={colorFormat:t.RGBA8,depthFormat:ge,scaleFactor:r};f=this.getBinding(),d=f.createProjectionLayer(Oe),s.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),y=new mn(d.textureWidth,d.textureHeight,{format:Nn,type:hn,depthTexture:new ti(d.textureWidth,d.textureHeight,Re,void 0,void 0,void 0,void 0,void 0,void 0,_e),stencilBuffer:v.stencil,colorSpace:e.outputColorSpace,samples:v.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1,storeMultisampledDepthBuffer:d.ignoreDepthValues===!1,storeMultisampledStencilBuffer:d.ignoreDepthValues===!1})}else{let _e={antialias:v.antialias,alpha:!0,depth:v.depth,stencil:v.stencil,framebufferScaleFactor:r};p=new XRWebGLLayer(s,t,_e),s.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),y=new mn(p.framebufferWidth,p.framebufferHeight,{format:Nn,type:hn,colorSpace:e.outputColorSpace,stencilBuffer:v.stencil,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1,storeMultisampledDepthBuffer:p.ignoreDepthValues===!1,storeMultisampledStencilBuffer:p.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await s.requestReferenceSpace(o),Fe.setContext(s),Fe.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function ie(Y){for(let be=0;be<Y.removed.length;be++){let _e=Y.removed[be],Re=T.indexOf(_e);Re>=0&&(T[Re]=null,A[Re].disconnect(_e))}for(let be=0;be<Y.added.length;be++){let _e=Y.added[be],Re=T.indexOf(_e);if(Re===-1){for(let Oe=0;Oe<A.length;Oe++)if(Oe>=T.length){T.push(_e),Re=Oe;break}else if(T[Oe]===null){T[Oe]=_e,Re=Oe;break}if(Re===-1)break}let ge=A[Re];ge&&ge.connect(_e)}}function q(Y,be){be===null?Y.matrixWorld.copy(Y.matrix):Y.matrixWorld.multiplyMatrices(be.matrixWorld,Y.matrix),Y.matrixWorldInverse.copy(Y.matrixWorld).invert()}this.updateCamera=function(Y){if(s===null)return;let be=Y.near,_e=Y.far;m.texture!==null&&(m.depthNear>0&&(be=m.depthNear),m.depthFar>0&&(_e=m.depthFar)),W.near=I.near=P.near=be,W.far=I.far=P.far=_e,(R!==W.near||H!==W.far)&&(s.updateRenderState({depthNear:W.near,depthFar:W.far}),R=W.near,H=W.far),W.layers.mask=Y.layers.mask|6,P.layers.mask=W.layers.mask&-5,I.layers.mask=W.layers.mask&-3;let Re=Y.parent,ge=W.cameras;q(W,Re);for(let Oe=0;Oe<ge.length;Oe++)q(ge[Oe],Re);W.projectionMatrix.copy(P.projectionMatrix),W.projectionMatrixInverse.copy(P.projectionMatrixInverse),F===null&&Y.isPerspectiveCamera&&(F={camera:Y,fov:Y.fov,zoom:Y.zoom}),ee(Y,W,Re)};function ee(Y,be,_e){_e===null?Y.matrix.copy(be.matrixWorld):(Y.matrix.copy(_e.matrixWorld),Y.matrix.invert(),Y.matrix.multiply(be.matrixWorld)),Y.matrix.decompose(Y.position,Y.quaternion,Y.scale),Y.updateMatrixWorld(!0),Y.projectionMatrix.copy(be.projectionMatrix),Y.projectionMatrixInverse.copy(be.projectionMatrixInverse),Y.isPerspectiveCamera&&(Y.fov=Bi*2*Math.atan(1/Y.projectionMatrix.elements[5]),Y.zoom=1)}this.getCamera=function(){return W},this.getFoveation=function(){if(!(d===null&&p===null))return l},this.setFoveation=function(Y){l=Y,d!==null&&(d.fixedFoveation=Y),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=Y)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(W)},this.getCameraTexture=function(Y){return u[Y]};let ne=null;function Te(Y,be){if(h=be.getViewerPose(c||a),g=be,h!==null){let _e=h.views;p!==null&&(e.setRenderTargetFramebuffer(y,p.framebuffer),e.setRenderTarget(y));let Re=!1;_e.length!==W.cameras.length&&(W.cameras.length=0,Re=!0);for(let Ie=0;Ie<_e.length;Ie++){let Je=_e[Ie],tt=null;if(p!==null)tt=p.getViewport(Je);else{let ft=f.getViewSubImage(d,Je);tt=ft.viewport,Ie===0&&(e.setRenderTargetTextures(y,ft.colorTexture,ft.depthStencilTexture),e.setRenderTarget(y))}let We=k[Ie];We===void 0&&(We=new jt,We.layers.enable(Ie),We.viewport=new Ze,k[Ie]=We),We.matrix.fromArray(Je.transform.matrix),We.matrix.decompose(We.position,We.quaternion,We.scale),We.projectionMatrix.fromArray(Je.projectionMatrix),We.projectionMatrixInverse.copy(We.projectionMatrix).invert(),We.viewport.set(tt.x,tt.y,tt.width,tt.height),Ie===0&&(W.matrix.copy(We.matrix),W.matrix.decompose(W.position,W.quaternion,W.scale)),Re===!0&&W.cameras.push(We)}let ge=s.enabledFeatures;if(ge&&ge.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&S){f=i.getBinding();let Ie=f.getDepthInformation(_e[0]);Ie&&Ie.isValid&&Ie.texture&&m.init(Ie,s.renderState)}if(ge&&ge.includes("camera-access")&&S){e.state.unbindTexture(),f=i.getBinding();for(let Ie=0;Ie<_e.length;Ie++){let Je=_e[Ie].camera;if(Je){let tt=u[Je];tt||(tt=new lr,u[Je]=tt);let We=f.getCameraImage(Je);tt.sourceTexture=We}}}}for(let _e=0;_e<A.length;_e++){let Re=T[_e],ge=A[_e];Re!==null&&ge!==void 0&&ge.update(Re,be,c||a)}ne&&ne(Y,be),be.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:be}),g=null}let Fe=new gd;Fe.setAnimationLoop(Te),this.setAnimationLoop=function(Y){ne=Y},this.dispose=function(){}}},R_=new it,Td=new Be;Td.set(-1,0,0,0,1,0,0,0,1);I_=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),zn=null;Io=class{constructor(e={}){let{canvas:t=Vu(),context:i=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:f=!1,reversedDepthBuffer:d=!1,outputBufferType:p=hn}=e;this.isWebGLRenderer=!0;let g;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");g=i.getContextAttributes().alpha}else g=a;let S=p,m=new Set([Ya,Ka,ja]),u=new Set([hn,Ln,Rs,Xi,qa,Xa]),v=new Uint32Array(4),E=new Int32Array(4),y={textures:[],min:[],max:[],resolution:[]},A=null,T=null,b=[],w=[],F=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=kn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let P=this,I=!1,k=null,W=null,R=null,H=null;this._outputColorSpace=Xt;let j=0,z=0,ie=null,q=-1,ee=null,ne=new Ze,Te=new Ze,Fe=null,Y=new qe(0),be=0,_e=t.width,Re=t.height,ge=1,Oe=null,dt=null,Ie=new Ze(0,0,_e,Re),Je=new Ze(0,0,_e,Re),tt=!1,We=new bi,ft=new Ta,mt=!1,kt=!1,ct=new it,Dt=new N,st=new Ze,Zt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},zt=!1;function $t(){return ie===null?ge:1}let D=i;function Gt(x,L){return t.getContext(x,L)}let at,Q,G,ue,de,ve,M,_,U,te,Z,re,oe,K,J,ce,C,$,X,le,ae,he,Pe;try{let x={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:f};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${"187"}`),t.addEventListener("webglcontextlost",Le,!1),t.addEventListener("webglcontextrestored",Ge,!1),t.addEventListener("webglcontextcreationerror",xe,!1),D===null){let L="webgl2";if(D=Gt(L,x),D===null)throw Gt(L)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}Ve()}catch(x){throw t.removeEventListener("webglcontextlost",Le,!1),t.removeEventListener("webglcontextrestored",Ge,!1),t.removeEventListener("webglcontextcreationerror",xe,!1),Ue("WebGLRenderer: "+x.message),x}function Ve(){at=new W0(D),at.init(),ae=new T_(D,at),Q=new D0(D,at,e,ae),G=new w_(D,at),Q.reversedDepthBuffer&&d&&G.buffers.depth.setReversed(!0),W=D.createFramebuffer(),R=D.createFramebuffer(),H=D.createFramebuffer(),ue=new j0(D),de=new h_,ve=new E_(D,at,G,de,Q,ae,ue),M=new H0(P),_=new Yp(D),he=new L0(D,_),U=new q0(D,_,ue,he),te=new Y0(D,U,_,he,ue),$=new K0(D,Q,ve),J=new N0(de),Z=new l_(P,M,at,Q,he,J),re=new P_(P,de),oe=new d_,K=new __(at),C=new P0(P,M,G,te,g,l),ce=new M_(P,te,Q),Pe=new L_(D,ue,Q,G),X=new I0(D,at,ue),le=new X0(D,at,ue),ue.programs=Z.programs,P.capabilities=Q,P.extensions=at,P.properties=de,P.renderLists=oe,P.shadowMap=ce,P.state=G,P.info=ue}S!==hn&&(F=new Z0(S,t.width,t.height,o,s,r));let se=new Nl(P,D);this.xr=se,this.getContext=function(){return D},this.getContextAttributes=function(){return D.getContextAttributes()},this.forceContextLoss=function(){let x=at.get("WEBGL_lose_context");x&&x.loseContext()},this.forceContextRestore=function(){let x=at.get("WEBGL_lose_context");x&&x.restoreContext()},this.getPixelRatio=function(){return ge},this.setPixelRatio=function(x){x!==void 0&&(ge=x,this.setSize(_e,Re,!1))},this.getSize=function(x){return x.set(_e,Re)},this.setSize=function(x,L,V=!0){if(se.isPresenting){Ne("WebGLRenderer: Can't change size while VR device is presenting.");return}_e=x,Re=L,t.width=Math.floor(x*ge),t.height=Math.floor(L*ge),V===!0&&(t.style.width=x+"px",t.style.height=L+"px"),F!==null&&F.setSize(t.width,t.height),this.setViewport(0,0,x,L)},this.getDrawingBufferSize=function(x){return x.set(_e*ge,Re*ge).floor()},this.setDrawingBufferSize=function(x,L,V){_e=x,Re=L,ge=V,t.width=Math.floor(x*V),t.height=Math.floor(L*V),this.setViewport(0,0,x,L)},this.setEffects=function(x){if(S===hn){Ue("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(x){for(let L=0;L<x.length;L++)if(x[L].isOutputPass===!0){Ne("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}F.setEffects(x||[])},this.getCurrentViewport=function(x){return x.copy(ne)},this.getViewport=function(x){return x.copy(Ie)},this.setViewport=function(x,L,V,O){x.isVector4?Ie.set(x.x,x.y,x.z,x.w):Ie.set(x,L,V,O),G.viewport(ne.copy(Ie).multiplyScalar($t()).round())},this.getScissor=function(x){return x.copy(Je)},this.setScissor=function(x,L,V,O){x.isVector4?Je.set(x.x,x.y,x.z,x.w):Je.set(x,L,V,O),G.scissor(Te.copy(Je).multiplyScalar($t()).round())},this.getScissorTest=function(){return tt},this.setScissorTest=function(x){G.setScissorTest(tt=x)},this.setOpaqueSort=function(x){Oe=x},this.setTransparentSort=function(x){dt=x},this.getClearColor=function(x){return x.copy(C.getClearColor())},this.setClearColor=function(){C.setClearColor(...arguments)},this.getClearAlpha=function(){return C.getClearAlpha()},this.setClearAlpha=function(){C.setClearAlpha(...arguments)},this.clear=function(x=!0,L=!0,V=!0){let O=0;if(x){let B=!1;if(ie!==null){let pe=ie.texture.format;B=m.has(pe)}if(B){let pe=ie.texture.type,Se=u.has(pe),fe=C.getClearColor(),ye=C.getClearAlpha(),Ae=fe.r,ke=fe.g,Xe=fe.b;Se?(v[0]=Ae,v[1]=ke,v[2]=Xe,v[3]=ye,D.clearBufferuiv(D.COLOR,0,v)):(E[0]=Ae,E[1]=ke,E[2]=Xe,E[3]=ye,D.clearBufferiv(D.COLOR,0,E))}else O|=D.COLOR_BUFFER_BIT}L&&(O|=D.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),V&&(O|=D.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),O!==0&&D.clear(O)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(x){x.setRenderer(this),k=x},this.dispose=function(){t.removeEventListener("webglcontextlost",Le,!1),t.removeEventListener("webglcontextrestored",Ge,!1),t.removeEventListener("webglcontextcreationerror",xe,!1),C.dispose(),oe.dispose(),K.dispose(),ve.dispose(),de.dispose(),M.dispose(),te.dispose(),U.dispose(),he.dispose(),Pe.dispose(),Z.dispose(),se.dispose(),se.removeEventListener("sessionstart",Eh),se.removeEventListener("sessionend",Th),Li.stop()};function Le(x){x.preventDefault(),tr("WebGLRenderer: Context Lost."),I=!0}function Ge(){tr("WebGLRenderer: Context Restored."),I=!1;let x=ue.autoReset,L=ce.enabled,V=ce.autoUpdate,O=ce.needsUpdate,B=ce.type;Ve(),ue.autoReset=x,ce.enabled=L,ce.autoUpdate=V,ce.needsUpdate=O,ce.type=B}function xe(x){Ue("WebGLRenderer: A WebGL context could not be created. Reason: ",x.statusMessage)}function nt(x){let L=x.target;L.removeEventListener("dispose",nt),Tt(L)}function Tt(x){ci(x),de.remove(x)}function ci(x){let L=de.get(x).programs;L!==void 0&&(L.forEach(function(V){Z.releaseProgram(V)}),x.isShaderMaterial&&Z.releaseShaderCache(x))}this.renderBufferDirect=function(x,L,V,O,B,pe){L===null&&(L=Zt);let Se=B.isMesh&&B.matrixWorld.determinantAffine()<0,fe=jf(x,L,V,O,B);G.setMaterial(O,Se);let ye=V.index,Ae=1;if(O.wireframe===!0){if(ye=U.getWireframeAttribute(V),ye===void 0)return;Ae=2}let ke=V.drawRange,Xe=V.attributes.position,Me=ke.start*Ae,je=(ke.start+ke.count)*Ae;pe!==null&&(Me=Math.max(Me,pe.start*Ae),je=Math.min(je,(pe.start+pe.count)*Ae)),ye!==null?(Me=Math.max(Me,0),je=Math.min(je,ye.count)):Xe!=null&&(Me=Math.max(Me,0),je=Math.min(je,Xe.count));let _t=je-Me;if(_t<0||_t===1/0)return;he.setup(B,O,fe,V,ye);let ot,rt=X;if(ye!==null&&(ot=_.get(ye),rt=le,rt.setIndex(ot)),B.isMesh)O.wireframe===!0?(G.setLineWidth(O.wireframeLinewidth*$t()),rt.setMode(D.LINES)):rt.setMode(D.TRIANGLES);else if(B.isLine){let Vt=O.linewidth;Vt===void 0&&(Vt=1),G.setLineWidth(Vt*$t()),B.isLineSegments?rt.setMode(D.LINES):B.isLineLoop?rt.setMode(D.LINE_LOOP):rt.setMode(D.LINE_STRIP)}else B.isPoints?rt.setMode(D.POINTS):B.isSprite&&rt.setMode(D.TRIANGLES);if(B.isBatchedMesh)if(at.get("WEBGL_multi_draw"))rt.renderMultiDraw(B._multiDrawStarts,B._multiDrawCounts,B._multiDrawCount);else{let Vt=B._multiDrawStarts,we=B._multiDrawCounts,Qt=B._multiDrawCount,$e=ye?_.get(ye).bytesPerElement:1,Ii=de.get(O).currentProgram.getUniforms();for(let Ht=0;Ht<Qt;Ht++)Ii.setValue(D,"_gl_DrawID",Ht),rt.render(Vt[Ht]/$e,we[Ht])}else if(B.isInstancedMesh)rt.renderInstances(Me,_t,B.count);else if(V.isInstancedBufferGeometry){let Vt=V._maxInstanceCount!==void 0?V._maxInstanceCount:1/0,we=Math.min(V.instanceCount,Vt);rt.renderInstances(Me,_t,we)}else rt.render(Me,_t)};function wh(x,L,V,O){k!==null&&x.isNodeMaterial&&k.setObject(O,x),mt===!0&&J.setState(x,V,!1),x.transparent===!0&&x.side===bn&&x.forceSinglePass===!1?(x.side=on,x.needsUpdate=!0,Hs(x,L,O),x.side=Ei,x.needsUpdate=!0,Hs(x,L,O),x.side=bn):Hs(x,L,O)}this.compile=function(x,L,V=null){V===null&&(V=x),k!==null&&k.renderStart(x,L,V),T=K.get(V),T.init(L),w.push(T),V.traverseVisible(function(B){B.isLight&&B.layers.test(L.layers)&&(T.pushLight(B),B.castShadow&&T.pushShadow(B))}),x!==V&&x.traverseVisible(function(B){B.isLight&&B.layers.test(L.layers)&&(T.pushLight(B),B.castShadow&&T.pushShadow(B))}),T.setupLights(),k!==null&&k.updateLights(T.state.lightsArray),kt=this.localClippingEnabled,mt=J.init(this.clippingPlanes,kt),mt===!0&&J.setGlobalState(this.clippingPlanes,L),k!==null&&ce.render(T.state.shadowsArray,V,L);let O=new Set;return x.traverse(function(B){if(!(B.isMesh||B.isPoints||B.isLine||B.isSprite))return;let pe=B.material;if(pe)if(Array.isArray(pe))for(let Se=0;Se<pe.length;Se++){let fe=pe[Se];wh(fe,V,L,B),O.add(fe)}else wh(pe,V,L,B),O.add(pe)}),T=w.pop(),k!==null&&k.renderEnd(),O},this.compileAsync=function(x,L,V=null){let O=this.compile(x,L,V);return new Promise(B=>{function pe(){if(O.forEach(function(Se){let ye=de.get(Se).currentProgram;(ye===void 0||ye.isReady())&&O.delete(Se)}),O.size===0){B(x);return}setTimeout(pe,10)}at.get("KHR_parallel_shader_compile")!==null?pe():setTimeout(pe,10)})};let hc=null;function qf(x){hc&&hc(x)}function Eh(){Li.stop()}function Th(){Li.start()}let Li=new gd;Li.setAnimationLoop(qf),typeof self<"u"&&Li.setContext(self),this.setAnimationLoop=function(x){hc=x,se.setAnimationLoop(x),x===null?Li.stop():Li.start()},se.addEventListener("sessionstart",Eh),se.addEventListener("sessionend",Th),this.render=function(x,L){if(L!==void 0&&L.isCamera!==!0){Ue("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(I===!0)return;k!==null&&k.renderStart(x,L);let V=se.enabled===!0&&se.isPresenting===!0,O=F!==null&&(ie===null||V)&&F.begin(P,ie);if(x.matrixWorldAutoUpdate===!0&&x.updateMatrixWorld(),L.parent===null&&L.matrixWorldAutoUpdate===!0&&L.updateMatrixWorld(),se.enabled===!0&&se.isPresenting===!0&&(F===null||F.isCompositing()===!1)&&(se.cameraAutoUpdate===!0&&se.updateCamera(L),L=se.getCamera()),x.isScene===!0&&x.onBeforeRender(P,x,L,ie),T=K.get(x,w.length),T.init(L),T.state.textureUnits=ve.getTextureUnits(),w.push(T),ct.multiplyMatrices(L.projectionMatrix,L.matrixWorldInverse),L.isArrayCamera?ft.setFromArrayCamera(L):We.setFromProjectionMatrix(ct,yn,L.reversedDepth),kt=this.localClippingEnabled,mt=J.init(this.clippingPlanes,kt),A=oe.get(x,b.length),A.init(),b.push(A),this.info.render.frame++,se.enabled===!0&&se.isPresenting===!0){let Se=P.xr.getDepthSensingMesh();Se!==null&&uc(Se,L,-1/0,P.sortObjects)}uc(x,L,0,P.sortObjects),A.finish(),k!==null&&k.updateLights(T.state.lightsArray),P.sortObjects===!0&&A.sort(Oe,dt),zt=se.enabled===!1||se.isPresenting===!1||se.hasDepthSensing()===!1,zt&&C.addToRenderList(A,x),this.info.autoReset===!0&&this.info.reset(),mt===!0&&J.beginShadows();let B=T.state.shadowsArray;if(ce.render(B,x,L),mt===!0&&J.endShadows(),(O&&F.hasRenderPass())===!1){let Se=A.opaque,fe=A.transmissive;if(T.setupLights(),L.isArrayCamera){let ye=L.cameras;if(fe.length>0)for(let Ae=0,ke=ye.length;Ae<ke;Ae++){let Xe=ye[Ae];Ch(Se,fe,x,Xe)}zt&&C.render(x);for(let Ae=0,ke=ye.length;Ae<ke;Ae++){let Xe=ye[Ae];Ah(A,x,Xe,Xe.viewport)}}else fe.length>0&&Ch(Se,fe,x,L),zt&&C.render(x),Ah(A,x,L)}ie!==null&&z===0&&(ve.updateMultisampleRenderTarget(ie),ve.updateRenderTargetMipmap(ie)),O&&F.end(P),x.isScene===!0&&x.onAfterRender(P,x,L),he.resetDefaultState(),q=-1,ee=null,w.pop(),w.length>0?(T=w[w.length-1],ve.setTextureUnits(T.state.textureUnits),mt===!0&&J.setGlobalState(P.clippingPlanes,T.state.camera)):T=null,b.pop(),b.length>0?A=b[b.length-1]:A=null,k!==null&&k.renderEnd()};function uc(x,L,V,O){if(x.visible===!1)return;if(x.layers.test(L.layers)){if(x.isGroup)V=x.renderOrder;else if(x.isLOD)x.autoUpdate===!0&&x.update(L);else if(x.isLight)T.pushLight(x),x.castShadow&&T.pushShadow(x);else if(x.isSprite){let Se=L.isArrayCamera?ft:We;if(!x.frustumCulled||x.intersectsFrustum(Se)){O&&st.setFromMatrixPosition(x.matrixWorld).applyMatrix4(ct);let fe=te.update(x),ye=x.material;ye.visible&&A.push(x,fe,ye,V,st.z,null,L)}}else if(x.isMesh||x.isLine||x.isPoints){let Se=L.isArrayCamera?ft:We;if(!x.frustumCulled||x.intersectsFrustum(Se)){let fe=te.update(x),ye=x.material;if(O&&(x.boundingSphere!==void 0?(x.boundingSphere===null&&x.computeBoundingSphere(),st.copy(x.boundingSphere.center)):(fe.boundingSphere===null&&fe.computeBoundingSphere(),st.copy(fe.boundingSphere.center)),st.applyMatrix4(x.matrixWorld).applyMatrix4(ct)),Array.isArray(ye)){let Ae=fe.groups;for(let ke=0,Xe=Ae.length;ke<Xe;ke++){let Me=Ae[ke],je=ye[Me.materialIndex];je&&je.visible&&A.push(x,fe,je,V,st.z,Me,L)}}else ye.visible&&A.push(x,fe,ye,V,st.z,null,L)}}}let pe=x.children;for(let Se=0,fe=pe.length;Se<fe;Se++)uc(pe[Se],L,V,O)}function Ah(x,L,V,O){let{opaque:B,transmissive:pe,transparent:Se}=x;T.setupLightsView(V),mt===!0&&J.setGlobalState(P.clippingPlanes,V),O&&G.viewport(ne.copy(O)),B.length>0&&Gr(B,L,V),pe.length>0&&Gr(pe,L,V),Se.length>0&&Gr(Se,L,V),G.buffers.depth.setTest(!0),G.buffers.depth.setMask(!0),G.buffers.color.setMask(!0),G.setPolygonOffset(!1)}function Ch(x,L,V,O){if((V.isScene===!0?V.overrideMaterial:null)!==null)return;if(T.state.transmissionRenderTarget[O.id]===void 0){let Me=at.has("EXT_color_buffer_half_float")||at.has("EXT_color_buffer_float");T.state.transmissionRenderTarget[O.id]=new mn(1,1,{generateMipmaps:!0,type:Me?Dn:hn,minFilter:ni,samples:Math.max(4,Q.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:Ke.workingColorSpace})}let pe=T.state.transmissionRenderTarget[O.id],Se=O.viewport||ne;pe.setSize(Se.z*P.transmissionResolutionScale,Se.w*P.transmissionResolutionScale);let fe=P.getRenderTarget(),ye=P.getActiveCubeFace(),Ae=P.getActiveMipmapLevel();P.setRenderTarget(pe),P.getClearColor(Y),be=P.getClearAlpha(),be<1&&P.setClearColor(16777215,.5),P.clear(),zt&&C.render(V);let ke=P.toneMapping;P.toneMapping=kn;let Xe=O.viewport;if(O.viewport!==void 0&&(O.viewport=void 0),T.setupLightsView(O),mt===!0&&J.setGlobalState(P.clippingPlanes,O),Gr(x,V,O),ve.updateMultisampleRenderTarget(pe),ve.updateRenderTargetMipmap(pe),at.has("WEBGL_multisampled_render_to_texture")===!1){let Me=!1;for(let je=0,_t=L.length;je<_t;je++){let ot=L[je],{object:rt,geometry:Vt,material:we,group:Qt}=ot;if(we.side===bn&&rt.layers.test(O.layers)){let $e=we.side;we.side=on,we.needsUpdate=!0,Rh(rt,V,O,Vt,we,Qt),we.side=$e,we.needsUpdate=!0,Me=!0}}Me===!0&&(ve.updateMultisampleRenderTarget(pe),ve.updateRenderTargetMipmap(pe))}P.setRenderTarget(fe,ye,Ae),P.setClearColor(Y,be),Xe!==void 0&&(O.viewport=Xe),P.toneMapping=ke}function Gr(x,L,V){let O=L.isScene===!0?L.overrideMaterial:null;for(let B=0,pe=x.length;B<pe;B++){let Se=x[B],{object:fe,geometry:ye,group:Ae}=Se,ke=Se.material;ke.allowOverride===!0&&O!==null&&(ke=O),fe.layers.test(V.layers)&&Rh(fe,L,V,ye,ke,Ae)}}function Rh(x,L,V,O,B,pe){k!==null&&B.isNodeMaterial&&k.setObject(x,B),x.onBeforeRender(P,L,V,O,B,pe),x.modelViewMatrix.multiplyMatrices(V.matrixWorldInverse,x.matrixWorld),x.normalMatrix.getNormalMatrix(x.modelViewMatrix),B.onBeforeRender(P,L,V,O,x,pe),B.transparent===!0&&B.side===bn&&B.forceSinglePass===!1?(B.side=on,B.needsUpdate=!0,P.renderBufferDirect(V,L,O,B,x,pe),B.side=Ei,B.needsUpdate=!0,P.renderBufferDirect(V,L,O,B,x,pe),B.side=bn):P.renderBufferDirect(V,L,O,B,x,pe),x.onAfterRender(P,L,V,O,B,pe)}function Ph(x){let L=0;for(let V of x)V.texture!==null&&L++;return L}function Hs(x,L,V){L.isScene!==!0&&(L=Zt);let O=de.get(x),B=T.state.lights,pe=T.state.shadowsArray,Se=B.state.version,fe=Z.getParameters(x,B.state,pe,L,V,T.state.lightProbeGridArray),ye=Z.getProgramCacheKey(fe),Ae=O.programs;O.environment=x.isMeshStandardMaterial||x.isMeshLambertMaterial||x.isMeshPhongMaterial?L.environment:null,O.fog=L.fog;let ke=x.isMeshStandardMaterial||x.isMeshLambertMaterial&&!x.envMap||x.isMeshPhongMaterial&&!x.envMap;O.envMap=M.get(x.envMap||O.environment,ke),O.envMapRotation=O.environment!==null&&x.envMap===null?L.environmentRotation:x.envMapRotation,Ae===void 0&&(x.addEventListener("dispose",nt),Ae=new Map,O.programs=Ae,O.programVariants=new Map);let Xe=Ae.get(ye);if(Xe!==void 0){if(O.currentProgram===Xe&&O.lightsStateVersion===Se)return Ih(x,fe),Xe}else fe.uniforms=Z.getUniforms(x),k!==null&&x.isNodeMaterial&&k.build(x,V,fe),x.onBeforeCompile(fe,P),Xe=Z.acquireProgram(fe,ye),Ae.set(ye,Xe),O.uniforms=fe.uniforms;let Me=O.uniforms;return(!x.isShaderMaterial&&!x.isRawShaderMaterial||x.clipping===!0)&&(Me.clippingPlanes=J.uniform),Ih(x,fe),O.needsLights=Yf(x),O.lightsStateVersion=Se,O.needsLights&&(Me.ambientLightColor.value=B.state.ambient,Me.lightProbe.value=B.state.probe,Me.sunLights.value=B.state.sun,Me.sunLightShadows.value=B.state.sunShadow,Me.directionalLights.value=B.state.directional,Me.directionalLightShadows.value=B.state.directionalShadow,Me.spotLights.value=B.state.spot,Me.spotLightShadows.value=B.state.spotShadow,Me.rectAreaLights.value=B.state.rectArea,Me.ltc_1.value=B.state.rectAreaLTC1,Me.ltc_2.value=B.state.rectAreaLTC2,Me.pointLights.value=B.state.point,Me.pointLightShadows.value=B.state.pointShadow,Me.hemisphereLights.value=B.state.hemi,Me.sunShadowMatrix.value=B.state.sunShadowMatrix,Me.sunShadowCascade.value=B.state.sunShadowCascade,Me.directionalShadowMatrix.value=B.state.directionalShadowMatrix,Me.spotLightMatrix.value=B.state.spotLightMatrix,Me.spotLightMap.value=B.state.spotLightMap,Me.pointShadowMatrix.value=B.state.pointShadowMatrix),O.numLightProbeGrids=Ph(T.state.lightProbeGridArray),O.currentProgram=Xe,O.uniformsList=null,Xe}function Xf(x,L,V,O,B){let pe=de.get(x),Se=pe.currentProgram.id+","+O+","+B,fe=pe.programVariants.get(Se);return fe===void 0?(fe=Hs(x,L,V),pe.programVariants.set(Se,fe)):(pe.currentProgram=fe,pe.uniformsList=null,pe.outputColorSpace=O,pe.toneMapping=B),fe}function Lh(x){if(x.uniformsList===null){let L=x.currentProgram.getUniforms();x.uniformsList=Ps.seqWithValue(L.seq,x.uniforms)}return x.uniformsList}function Ih(x,L){let V=de.get(x);V.outputColorSpace=L.outputColorSpace,V.batching=L.batching,V.batchingColor=L.batchingColor,V.instancing=L.instancing,V.instancingColor=L.instancingColor,V.instancingMorph=L.instancingMorph,V.skinning=L.skinning,V.morphTargets=L.morphTargets,V.morphNormals=L.morphNormals,V.morphColors=L.morphColors,V.morphTargetsCount=L.morphTargetsCount,V.numClippingPlanes=L.numClippingPlanes,V.numIntersection=L.numClipIntersection,V.vertexAlphas=L.vertexAlphas,V.vertexTangents=L.vertexTangents,V.toneMapping=L.toneMapping}function jf(x,L,V,O,B){L.isScene!==!0&&(L=Zt),ve.resetTextureUnits();let pe=L.fog,Se=O.isMeshStandardMaterial||O.isMeshLambertMaterial||O.isMeshPhongMaterial?L.environment:null,fe=ie===null?P.outputColorSpace:ie.isXRRenderTarget===!0?ie.texture.colorSpace:Ke.workingColorSpace,ye=O.isMeshStandardMaterial||O.isMeshLambertMaterial&&!O.envMap||O.isMeshPhongMaterial&&!O.envMap,Ae=M.get(O.envMap||Se,ye),ke=O.vertexColors===!0&&!!V.attributes.color&&V.attributes.color.itemSize===4,Xe=!!V.attributes.tangent&&(!!O.normalMap||O.anisotropy>0),Me=!!V.morphAttributes.position,je=!!V.morphAttributes.normal,_t=!!V.morphAttributes.color,ot=kn;O.toneMapped&&(ie===null||ie.isXRRenderTarget===!0)&&(ot=P.toneMapping);let rt=V.morphAttributes.position||V.morphAttributes.normal||V.morphAttributes.color,Vt=rt!==void 0?rt.length:0,we=de.get(O),Qt=T.state.lights;if(mt===!0&&(kt===!0||x!==ee)){let ut=x===ee&&O.id===q;J.setState(O,x,ut)}let $e=!1,Ii=!1;O.version===we.__version?we.needsLights&&we.lightsStateVersion!==Qt.state.version||B.isBatchedMesh&&we.batching===!1||!B.isBatchedMesh&&we.batching===!0||B.isBatchedMesh&&we.batchingColor===!0&&B._colorsTexture===null||B.isBatchedMesh&&we.batchingColor===!1&&B._colorsTexture!==null||B.isInstancedMesh&&we.instancing===!1||!B.isInstancedMesh&&we.instancing===!0||B.isSkinnedMesh&&we.skinning===!1||!B.isSkinnedMesh&&we.skinning===!0||B.isInstancedMesh&&we.instancingColor===!0&&B.instanceColor===null||B.isInstancedMesh&&we.instancingColor===!1&&B.instanceColor!==null||B.isInstancedMesh&&we.instancingMorph===!0&&B.morphTexture===null||B.isInstancedMesh&&we.instancingMorph===!1&&B.morphTexture!==null||we.envMap!==Ae||O.fog===!0&&we.fog!==pe||we.numClippingPlanes!==void 0&&(we.numClippingPlanes!==J.numPlanes||we.numIntersection!==J.numIntersection)||we.vertexAlphas!==ke||we.vertexTangents!==Xe||we.morphTargets!==Me||we.morphNormals!==je||we.morphColors!==_t||we.morphTargetsCount!==Vt||we.numLightProbeGrids!==Ph(T.state.lightProbeGridArray)?$e=!0:(we.outputColorSpace!==fe||we.toneMapping!==ot)&&(Ii=!0):($e=!0,we.__version=O.version);let Ht=we.currentProgram;($e===!0||Ii===!0)&&(Ht=Ii===!0?Xf(O,L,B,fe,ot):Hs(O,L,B),k&&O.isNodeMaterial&&k.onUpdateProgram(O,Ht,we));let Vr=!1,li=!1,Di=!1,Ye=Ht.getUniforms(),Nt=we.uniforms;if(G.useProgram(Ht.program)&&(Vr=!0,li=!0,Di=!0),O.id!==q&&(q=O.id,li=!0),Vr||ee!==x){G.buffers.depth.getReversed()&&x.reversedDepth!==!0&&(x._reversedDepth=!0,x.updateProjectionMatrix()),Ye.setValue(D,"projectionMatrix",x.projectionMatrix),Ye.setValue(D,"viewMatrix",x.matrixWorldInverse);let At=Ye.map.cameraPosition;At!==void 0&&At.setValue(D,Dt.setFromMatrixPosition(x.matrixWorld)),Q.logarithmicDepthBuffer&&Ye.setValue(D,"logDepthBufFC",2/(Math.log(x.far+1)/Math.LN2)),(O.isMeshPhongMaterial||O.isMeshToonMaterial||O.isMeshLambertMaterial||O.isMeshBasicMaterial||O.isMeshStandardMaterial||O.isShaderMaterial)&&Ye.setValue(D,"isOrthographic",x.isOrthographicCamera===!0),ee!==x&&(ee=x,li=!0,Di=!0)}if(we.needsLights&&(Qt.state.sunShadowMap.length>0&&Ye.setValue(D,"sunShadowMap",Qt.state.sunShadowMap,ve),Qt.state.directionalShadowMap.length>0&&Ye.setValue(D,"directionalShadowMap",Qt.state.directionalShadowMap,ve),Qt.state.spotShadowMap.length>0&&Ye.setValue(D,"spotShadowMap",Qt.state.spotShadowMap,ve),Qt.state.pointShadowMap.length>0&&Ye.setValue(D,"pointShadowMap",Qt.state.pointShadowMap,ve)),B.isSkinnedMesh){Ye.setOptional(D,B,"bindMatrix"),Ye.setOptional(D,B,"bindMatrixInverse");let ut=B.skeleton;ut&&(ut.boneTexture===null&&ut.computeBoneTexture(),Ye.setValue(D,"boneTexture",ut.boneTexture,ve))}B.isBatchedMesh&&(Ye.setOptional(D,B,"batchingTexture"),Ye.setValue(D,"batchingTexture",B._matricesTexture,ve),Ye.setOptional(D,B,"batchingIdTexture"),Ye.setValue(D,"batchingIdTexture",B._indirectTexture,ve),Ye.setOptional(D,B,"batchingColorTexture"),B._colorsTexture!==null&&Ye.setValue(D,"batchingColorTexture",B._colorsTexture,ve));let wn=V.morphAttributes;if((wn.position!==void 0||wn.normal!==void 0||wn.color!==void 0)&&$.update(B,V,Ht),(li||we.receiveShadow!==B.receiveShadow)&&(we.receiveShadow=B.receiveShadow,Ye.setValue(D,"receiveShadow",B.receiveShadow)),(O.isMeshStandardMaterial||O.isMeshLambertMaterial||O.isMeshPhongMaterial)&&O.envMap===null&&L.environment!==null&&(Nt.envMapIntensity.value=L.environmentIntensity),Nt.dfgLUT!==void 0&&(Nt.dfgLUT.value=D_()),li){if(Ye.setValue(D,"toneMappingExposure",P.toneMappingExposure),we.needsLights&&Kf(Nt,Di),pe&&O.fog===!0&&re.refreshFogUniforms(Nt,pe),re.refreshMaterialUniforms(Nt,O,ge,Re,T.state.transmissionRenderTarget[x.id]),we.needsLights&&we.numLightProbeGrids>0){let ut=y,At=0;for(let Xn of T.state.lightProbeGridArray)Xn.texture!==null&&(ut.textures[At]=Xn.texture,ut.min[At]=Xn.boundingBox.min,ut.max[At]=Xn.boundingBox.max,ut.resolution[At]=Xn.resolution,At++);for(let Xn in ut)ut[Xn].length=At;Nt.probesSH.value=ut.textures,Nt.probesMin.value=ut.min,Nt.probesMax.value=ut.max,Nt.probesResolution.value=ut.resolution}Ps.upload(D,Lh(we),Nt,ve)}if(O.isShaderMaterial&&O.uniformsNeedUpdate===!0&&(Ps.upload(D,Lh(we),Nt,ve),O.uniformsNeedUpdate=!1),O.isSpriteMaterial&&Ye.setValue(D,"center",B.center),Ye.setValue(D,"modelViewMatrix",B.modelViewMatrix),Ye.setValue(D,"normalMatrix",B.normalMatrix),Ye.setValue(D,"modelMatrix",B.matrixWorld),O.uniformsGroups!==void 0){let ut=O.uniformsGroups;for(let At=0,Xn=ut.length;At<Xn;At++){let Nh=ut[At];Pe.update(Nh,Ht),Pe.bind(Nh,Ht)}}return Ht}function Kf(x,L){x.ambientLightColor.needsUpdate=L,x.lightProbe.needsUpdate=L,x.sunLights.needsUpdate=L,x.sunLightShadows.needsUpdate=L,x.directionalLights.needsUpdate=L,x.directionalLightShadows.needsUpdate=L,x.pointLights.needsUpdate=L,x.pointLightShadows.needsUpdate=L,x.spotLights.needsUpdate=L,x.spotLightShadows.needsUpdate=L,x.rectAreaLights.needsUpdate=L,x.hemisphereLights.needsUpdate=L}function Yf(x){return x.isMeshLambertMaterial||x.isMeshToonMaterial||x.isMeshPhongMaterial||x.isMeshStandardMaterial||x.isShadowMaterial||x.isShaderMaterial&&x.lights===!0}this.getActiveCubeFace=function(){return j},this.getActiveMipmapLevel=function(){return z},this.getRenderTarget=function(){return ie},this.setRenderTargetTextures=function(x,L,V){let O=de.get(x);O.__autoAllocateDepthBuffer=x.resolveDepthBuffer===!1,O.__autoAllocateDepthBuffer===!1&&(O.__useRenderToTexture=!1),de.get(x.texture).__webglTexture=L,de.get(x.depthTexture).__webglTexture=O.__autoAllocateDepthBuffer?void 0:V,O.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(x,L){let V=de.get(x);V.__webglFramebuffer=L,V.__useDefaultFramebuffer=L===void 0},this.setRenderTarget=function(x,L=0,V=0){ie=x,j=L,z=V;let O=null,B=!1,pe=!1;if(x){let fe=de.get(x);if(fe.__useDefaultFramebuffer!==void 0){G.bindFramebuffer(D.FRAMEBUFFER,fe.__webglFramebuffer),ne.copy(x.viewport),Te.copy(x.scissor),Fe=x.scissorTest,G.viewport(ne),G.scissor(Te),G.setScissorTest(Fe),q=-1;return}else if(fe.__webglFramebuffer===void 0)ve.setupRenderTarget(x);else if(fe.__hasExternalTextures)ve.rebindTextures(x,de.get(x.texture).__webglTexture,de.get(x.depthTexture).__webglTexture);else if(x.depthBuffer){let ke=x.depthTexture;if(fe.__boundDepthTexture!==ke){if(ke!==null&&de.has(ke)&&(x.width!==ke.image.width||x.height!==ke.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");ve.setupDepthRenderbuffer(x)}}let ye=x.texture;(ye.isData3DTexture||ye.isDataArrayTexture||ye.isCompressedArrayTexture)&&(pe=!0);let Ae=de.get(x).__webglFramebuffer;x.isWebGLCubeRenderTarget?(Array.isArray(Ae[L])?O=Ae[L][V]:O=Ae[L],B=!0):x.samples>0&&ve.useMultisampledRTT(x)===!1?O=de.get(x).__webglMultisampledFramebuffer:Array.isArray(Ae)?O=Ae[V]:O=Ae,ne.copy(x.viewport),Te.copy(x.scissor),Fe=x.scissorTest}else ne.copy(Ie).multiplyScalar(ge).floor(),Te.copy(Je).multiplyScalar(ge).floor(),Fe=tt;if(V!==0&&(O=W),G.bindFramebuffer(D.FRAMEBUFFER,O)&&G.drawBuffers(x,O),G.viewport(ne),G.scissor(Te),G.setScissorTest(Fe),B){let fe=de.get(x.texture);D.framebufferTexture2D(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_CUBE_MAP_POSITIVE_X+L,fe.__webglTexture,V)}else if(pe){let fe=L;for(let ye=0;ye<x.textures.length;ye++){let Ae=de.get(x.textures[ye]);D.framebufferTextureLayer(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0+ye,Ae.__webglTexture,V,fe)}}else if(x!==null&&V!==0){let fe=de.get(x.texture);D.framebufferTexture2D(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,fe.__webglTexture,V)}q=-1};function Dh(x){let L=de.get(x);return(L.__readFormat!==x.format||L.__readType!==x.type)&&(L.__readFormat=x.format,L.__readType=x.type,L.__formatReadable=Q.textureFormatReadable(x.format),L.__typeReadable=Q.textureTypeReadable(x.type)),L}this.readRenderTargetPixels=function(x,L,V,O,B,pe,Se,fe=0){if(!(x&&x.isWebGLRenderTarget)){Ue("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let ye=de.get(x).__webglFramebuffer;if(x.isWebGLCubeRenderTarget&&Se!==void 0&&(ye=ye[Se],Array.isArray(ye)&&(ye=ye[0])),ye){G.bindFramebuffer(D.FRAMEBUFFER,ye);try{let Ae=x.textures[fe],ke=Ae.format,Xe=Ae.type;x.textures.length>1&&D.readBuffer(D.COLOR_ATTACHMENT0+fe);let Me=Dh(Ae);if(Me.__formatReadable===!1){Ue("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(Me.__typeReadable===!1){Ue("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}L>=0&&L<=x.width-O&&V>=0&&V<=x.height-B&&D.readPixels(L,V,O,B,ae.convert(ke),ae.convert(Xe),pe)}finally{let Ae=ie!==null?de.get(ie).__webglFramebuffer:null;G.bindFramebuffer(D.FRAMEBUFFER,Ae)}}},this.readRenderTargetPixelsAsync=async function(x,L,V,O,B,pe,Se,fe=0){if(!(x&&x.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let ye=de.get(x).__webglFramebuffer;if(x.isWebGLCubeRenderTarget&&Se!==void 0&&(ye=ye[Se],Array.isArray(ye)&&(ye=ye[0])),ye)if(L>=0&&L<=x.width-O&&V>=0&&V<=x.height-B){G.bindFramebuffer(D.FRAMEBUFFER,ye);let Ae=x.textures[fe],ke=Ae.format,Xe=Ae.type;x.textures.length>1&&D.readBuffer(D.COLOR_ATTACHMENT0+fe);let Me=Dh(Ae);if(Me.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Me.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let je=D.createBuffer();D.bindBuffer(D.PIXEL_PACK_BUFFER,je),D.bufferData(D.PIXEL_PACK_BUFFER,pe.byteLength,D.STREAM_READ),D.readPixels(L,V,O,B,ae.convert(ke),ae.convert(Xe),0),D.bindBuffer(D.PIXEL_PACK_BUFFER,null);let _t=ie!==null?de.get(ie).__webglFramebuffer:null;G.bindFramebuffer(D.FRAMEBUFFER,_t);let ot=D.fenceSync(D.SYNC_GPU_COMMANDS_COMPLETE,0);return D.flush(),await Wu(D,ot,4),D.bindBuffer(D.PIXEL_PACK_BUFFER,je),D.getBufferSubData(D.PIXEL_PACK_BUFFER,0,pe),D.bindBuffer(D.PIXEL_PACK_BUFFER,null),D.deleteBuffer(je),D.deleteSync(ot),pe}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(x,L=null,V=0){let O=Math.pow(2,-V),B=Math.floor(x.image.width*O),pe=Math.floor(x.image.height*O),Se=L!==null?L.x:0,fe=L!==null?L.y:0;ve.setTexture2D(x,0),D.copyTexSubImage2D(D.TEXTURE_2D,V,0,0,Se,fe,B,pe),G.unbindTexture()},this.copyTextureToTexture=function(x,L,V=null,O=null,B=0,pe=0){let Se,fe,ye,Ae,ke,Xe,Me,je,_t,ot=x.isCompressedTexture?x.mipmaps[pe]:x.image;if(V!==null)Se=V.max.x-V.min.x,fe=V.max.y-V.min.y,ye=V.isBox3?V.max.z-V.min.z:1,Ae=V.min.x,ke=V.min.y,Xe=V.isBox3?V.min.z:0;else{let Ye=Math.pow(2,-B);Se=Math.floor(ot.width*Ye),fe=Math.floor(ot.height*Ye),x.isDataArrayTexture?ye=ot.depth:x.isData3DTexture?ye=Math.floor(ot.depth*Ye):ye=1,Ae=0,ke=0,Xe=0}O!==null?(Me=O.x,je=O.y,_t=O.z):(Me=0,je=0,_t=0);let rt=ae.convert(L.format),Vt=ae.convert(L.type),we;L.isData3DTexture?(ve.setTexture3D(L,0),we=D.TEXTURE_3D):L.isDataArrayTexture||L.isCompressedArrayTexture?(ve.setTexture2DArray(L,0),we=D.TEXTURE_2D_ARRAY):(ve.setTexture2D(L,0),we=D.TEXTURE_2D),G.activeTexture(D.TEXTURE0),G.pixelStorei(D.UNPACK_FLIP_Y_WEBGL,L.flipY),G.pixelStorei(D.UNPACK_PREMULTIPLY_ALPHA_WEBGL,L.premultiplyAlpha),G.pixelStorei(D.UNPACK_ALIGNMENT,L.unpackAlignment);let Qt=G.getParameter(D.UNPACK_ROW_LENGTH),$e=G.getParameter(D.UNPACK_IMAGE_HEIGHT),Ii=G.getParameter(D.UNPACK_SKIP_PIXELS),Ht=G.getParameter(D.UNPACK_SKIP_ROWS),Vr=G.getParameter(D.UNPACK_SKIP_IMAGES);G.pixelStorei(D.UNPACK_ROW_LENGTH,ot.width),G.pixelStorei(D.UNPACK_IMAGE_HEIGHT,ot.height),G.pixelStorei(D.UNPACK_SKIP_PIXELS,Ae),G.pixelStorei(D.UNPACK_SKIP_ROWS,ke),G.pixelStorei(D.UNPACK_SKIP_IMAGES,Xe);let li=x.isDataArrayTexture||x.isData3DTexture,Di=L.isDataArrayTexture||L.isData3DTexture;if(x.isDepthTexture){let Ye=de.get(x),Nt=de.get(L),wn=de.get(Ye.__renderTarget),ut=de.get(Nt.__renderTarget);G.bindFramebuffer(D.READ_FRAMEBUFFER,wn.__webglFramebuffer),G.bindFramebuffer(D.DRAW_FRAMEBUFFER,ut.__webglFramebuffer);for(let At=0;At<ye;At++)li&&(D.framebufferTextureLayer(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,de.get(x).__webglTexture,B,Xe+At),D.framebufferTextureLayer(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,de.get(L).__webglTexture,pe,_t+At)),D.blitFramebuffer(Ae,ke,Ae+Se,ke+fe,Me,je,Me+Se,je+fe,D.DEPTH_BUFFER_BIT,D.NEAREST);G.bindFramebuffer(D.READ_FRAMEBUFFER,null),G.bindFramebuffer(D.DRAW_FRAMEBUFFER,null)}else if(B!==0||x.isRenderTargetTexture||de.has(x)){let Ye=de.get(x),Nt=de.get(L);G.bindFramebuffer(D.READ_FRAMEBUFFER,R),G.bindFramebuffer(D.DRAW_FRAMEBUFFER,H);for(let wn=0;wn<ye;wn++)li?D.framebufferTextureLayer(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,Ye.__webglTexture,B,Xe+wn):D.framebufferTexture2D(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,Ye.__webglTexture,B),Di?D.framebufferTextureLayer(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,Nt.__webglTexture,pe,_t+wn):D.framebufferTexture2D(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,Nt.__webglTexture,pe),B!==0?D.blitFramebuffer(Ae,ke,Ae+Se,ke+fe,Me,je,Me+Se,je+fe,D.COLOR_BUFFER_BIT,D.NEAREST):Di?D.copyTexSubImage3D(we,pe,Me,je,_t+wn,Ae,ke,Se,fe):D.copyTexSubImage2D(we,pe,Me,je,Ae,ke,Se,fe);G.bindFramebuffer(D.READ_FRAMEBUFFER,null),G.bindFramebuffer(D.DRAW_FRAMEBUFFER,null)}else Di?x.isDataTexture||x.isData3DTexture?D.texSubImage3D(we,pe,Me,je,_t,Se,fe,ye,rt,Vt,ot.data):L.isCompressedArrayTexture?D.compressedTexSubImage3D(we,pe,Me,je,_t,Se,fe,ye,rt,ot.data):D.texSubImage3D(we,pe,Me,je,_t,Se,fe,ye,rt,Vt,ot):x.isDataTexture?D.texSubImage2D(D.TEXTURE_2D,pe,Me,je,Se,fe,rt,Vt,ot.data):x.isCompressedTexture?D.compressedTexSubImage2D(D.TEXTURE_2D,pe,Me,je,ot.width,ot.height,rt,ot.data):D.texSubImage2D(D.TEXTURE_2D,pe,Me,je,Se,fe,rt,Vt,ot);G.pixelStorei(D.UNPACK_ROW_LENGTH,Qt),G.pixelStorei(D.UNPACK_IMAGE_HEIGHT,$e),G.pixelStorei(D.UNPACK_SKIP_PIXELS,Ii),G.pixelStorei(D.UNPACK_SKIP_ROWS,Ht),G.pixelStorei(D.UNPACK_SKIP_IMAGES,Vr),pe===0&&L.generateMipmaps===!0&&L.mipmapsAutoUpdate===!0&&D.generateMipmap(we),G.unbindTexture()},this.initRenderTarget=function(x){de.get(x).__webglFramebuffer===void 0&&ve.setupRenderTarget(x)},this.initTexture=function(x){x.isCubeTexture?ve.setTextureCube(x,0):x.isData3DTexture?ve.setTexture3D(x,0):x.isDataArrayTexture||x.isCompressedArrayTexture?ve.setTexture2DArray(x,0):ve.setTexture2D(x,0),G.unbindTexture()},this.resetState=function(){j=0,z=0,ie=null,G.reset(),he.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return yn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=Ke._getDrawingBufferColorSpace(e),t.unpackColorSpace=Ke._getUnpackColorSpace()}}});function F_(n){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(n.pointerId),this.domElement.ownerDocument.addEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(n)&&(this._addPointer(n),n.pointerType==="touch"?this._onTouchStart(n):this._onMouseDown(n),this._cursorStyle==="grab"&&(this.domElement.style.cursor="grabbing")))}function O_(n){this.enabled!==!1&&(n.pointerType==="touch"?this._onTouchMove(n):this._onMouseMove(n))}function B_(n){switch(this._removePointer(n),this._pointers.length){case 0:this.domElement.releasePointerCapture(n.pointerId),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(Rd),this.state=Qe.NONE,this._cursorStyle==="grab"&&(this.domElement.style.cursor="grab");break;case 1:let e=this._pointers[0],t=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:t.x,pageY:t.y});break}}function k_(n){let e;switch(n.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case Mi.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(n),this.state=Qe.DOLLY;break;case Mi.ROTATE:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=Qe.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=Qe.ROTATE}break;case Mi.PAN:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=Qe.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=Qe.PAN}break;default:this.state=Qe.NONE}this.state!==Qe.NONE&&this.dispatchEvent(Fl)}function z_(n){switch(this.state){case Qe.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(n);break;case Qe.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(n);break;case Qe.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(n);break}}function G_(n){this.enabled===!1||this.enableZoom===!1||this.state!==Qe.NONE||(n.preventDefault(),this.dispatchEvent(Fl),this._handleMouseWheel(this._customWheelEvent(n)),this.dispatchEvent(Rd))}function V_(n){this.enabled!==!1&&this._handleKeyDown(n)}function H_(n){switch(this._trackPointer(n),this._pointers.length){case 1:switch(this.touches.ONE){case wi.ROTATE:if(this.enableRotate===!1){this.state=Qe.NONE;break}this._handleTouchStartRotate(n),this.state=Qe.TOUCH_ROTATE;break;case wi.PAN:if(this.enablePan===!1){this.state=Qe.NONE;break}this._handleTouchStartPan(n),this.state=Qe.TOUCH_PAN;break;default:this.state=Qe.NONE}break;case 2:switch(this.touches.TWO){case wi.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(n),this.state=Qe.TOUCH_DOLLY_PAN;break;case wi.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(n),this.state=Qe.TOUCH_DOLLY_ROTATE;break;default:this.state=Qe.NONE}break;default:this.state=Qe.NONE}this.state!==Qe.NONE&&this.dispatchEvent(Fl)}function W_(n){switch(this._trackPointer(n),this.state){case Qe.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(n),this.update();break;case Qe.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(n),this.update();break;case Qe.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(n),this.update();break;case Qe.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(n),this.update();break;default:this.state=Qe.NONE}}function q_(n){this.enabled!==!1&&n.preventDefault()}function X_(n){n.key==="Control"&&(this._controlActive=!0,this.domElement.ownerDocument.addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function j_(n){n.key==="Control"&&(this._controlActive=!1,this.domElement.ownerDocument.removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}var Ad,Fl,Rd,Uo,Cd,U_,Et,un,Qe,Ul,Fo,Pd=xt(()=>{Is();Ad={type:"change"},Fl={type:"start"},Rd={type:"end"},Uo=new ki,Cd=new tn,U_=Math.cos(70*Kt.DEG2RAD),Et=new N,un=2*Math.PI,Qe={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Ul=1e-6,Fo=class extends xr{constructor(e,t=null){super(e,t),this.state=Qe.NONE,this.target=new N,this.cursor=new N,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Mi.ROTATE,MIDDLE:Mi.DOLLY,RIGHT:Mi.PAN},this.touches={ONE:wi.ROTATE,TWO:wi.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._cursorStyle="auto",this._domElementKeyEvents=null,this._lastPosition=new N,this._lastQuaternion=new pn,this._lastTargetPosition=new N,this._quat=new pn().setFromUnitVectors(e.up,new N(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new Si,this._sphericalDelta=new Si,this._scale=1,this._panOffset=new N,this._rotateStart=new De,this._rotateEnd=new De,this._rotateDelta=new De,this._panStart=new De,this._panEnd=new De,this._panDelta=new De,this._dollyStart=new De,this._dollyEnd=new De,this._dollyDelta=new De,this._dollyDirection=new N,this._mouse=new De,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=O_.bind(this),this._onPointerDown=F_.bind(this),this._onPointerUp=B_.bind(this),this._onContextMenu=q_.bind(this),this._onMouseWheel=G_.bind(this),this._onKeyDown=V_.bind(this),this._onTouchStart=H_.bind(this),this._onTouchMove=W_.bind(this),this._onMouseDown=k_.bind(this),this._onMouseMove=z_.bind(this),this._interceptControlDown=X_.bind(this),this._interceptControlUp=j_.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}set cursorStyle(e){this._cursorStyle=e,e==="grab"?this.domElement.style.cursor="grab":this.domElement.style.cursor="auto"}get cursorStyle(){return this._cursorStyle}connect(e){super.connect(e),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.ownerDocument.addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.state=Qe.NONE,this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.ownerDocument.removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.ownerDocument.removeEventListener("keyup",this._interceptControlUp,{capture:!0}),this._controlActive=!1,this._pointers.length=0,this._pointerPositions={},this.domElement.style.touchAction="",this.domElement.style.cursor="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(Ad),this.update(),this.state=Qe.NONE}pan(e,t){this._pan(e,t),this.update()}dollyIn(e){this._dollyIn(e),this.update()}dollyOut(e){this._dollyOut(e),this.update()}rotateLeft(e){this._rotateLeft(e),this.update()}rotateUp(e){this._rotateUp(e),this.update()}update(e=null){let t=this.object.position;Et.copy(t).sub(this.target),Et.applyQuaternion(this._quat),this._spherical.setFromVector3(Et),this.autoRotate&&this.state===Qe.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let i=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(i)&&isFinite(s)&&(i<-Math.PI?i+=un:i>Math.PI&&(i-=un),s<-Math.PI?s+=un:s>Math.PI&&(s-=un),i<=s?this._spherical.theta=Math.max(i,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(i+s)/2?Math.max(i,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{let a=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=a!=this._spherical.radius}if(Et.setFromSpherical(this._spherical),Et.applyQuaternion(this._quatInverse),t.copy(this.target).add(Et),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let a=null;if(this.object.isPerspectiveCamera){let o=Et.length();a=this._clampDistance(o*this._scale);let l=o-a;this.object.position.addScaledVector(this._dollyDirection,l),this.object.updateMatrixWorld(),r=!!l}else if(this.object.isOrthographicCamera){let o=new N(this._mouse.x,this._mouse.y,0);o.unproject(this.object);let l=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=l!==this.object.zoom;let c=new N(this._mouse.x,this._mouse.y,0);c.unproject(this.object),this.object.position.sub(c).add(o),this.object.updateMatrixWorld(),a=Et.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;a!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(a).add(this.object.position):(Uo.origin.copy(this.object.position),Uo.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(Uo.direction))<U_?this.object.lookAt(this.target):(Cd.setFromNormalAndCoplanarPoint(this.object.up,this.target),Uo.intersectPlane(Cd,this.target))))}else if(this.object.isOrthographicCamera){let a=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),a!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>Ul||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Ul||this._lastTargetPosition.distanceToSquared(this.target)>Ul?(this.dispatchEvent(Ad),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?un/60*this.autoRotateSpeed*e:un/60/60*this.autoRotateSpeed}_getZoomScale(e){let t=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*t)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,t){Et.setFromMatrixColumn(t,0),Et.multiplyScalar(-e),this._panOffset.add(Et)}_panUp(e,t){this.screenSpacePanning===!0?Et.setFromMatrixColumn(t,1):(Et.setFromMatrixColumn(t,0),Et.crossVectors(this.object.up,Et)),Et.multiplyScalar(e),this._panOffset.add(Et)}_pan(e,t){let i=this.domElement;if(this.object.isPerspectiveCamera){let s=this.object.position;Et.copy(s).sub(this.target);let r=Et.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*r/i.clientHeight,this.object.matrix),this._panUp(2*t*r/i.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/i.clientWidth,this.object.matrix),this._panUp(t*(this.object.top-this.object.bottom)/this.object.zoom/i.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,t){if(!this.zoomToCursor)return;this._performCursorZoom=!0;let i=this.domElement.getBoundingClientRect(),s=e-i.left,r=t-i.top,a=i.width,o=i.height;this._mouse.x=s/a*2-1,this._mouse.y=-(r/o)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientY),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let t=this.domElement;this._rotateLeft(un*this._rotateDelta.x/t.clientHeight),this._rotateUp(un*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.zoomToCursor&&(this._performCursorZoom=!0,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let t=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(un*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),t=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(-un*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),t=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(un*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),t=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(-un*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),t=!0;break}t&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),i=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._rotateStart.set(i,s)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),i=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._panStart.set(i,s)}}_handleTouchStartDolly(e){let t=this._getSecondPointerPosition(e),i=e.pageX-t.x,s=e.pageY-t.y,r=Math.sqrt(i*i+s*s);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{let i=this._getSecondPointerPosition(e),s=.5*(e.pageX+i.x),r=.5*(e.pageY+i.y);this._rotateEnd.set(s,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let t=this.domElement;this._rotateLeft(un*this._rotateDelta.x/t.clientHeight),this._rotateUp(un*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),i=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._panEnd.set(i,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){let t=this._getSecondPointerPosition(e),i=e.pageX-t.x,s=e.pageY-t.y,r=Math.sqrt(i*i+s*s);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);let a=(e.pageX+t.x)*.5,o=(e.pageY+t.y)*.5;this._updateZoomParameters(a,o)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId){this._pointers.splice(t,1);return}}_isTrackingPointer(e){for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId)return!0;return!1}_trackPointer(e){let t=this._pointerPositions[e.pointerId];t===void 0&&(t=new De,this._pointerPositions[e.pointerId]=t),t.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){let t=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[t]}_customWheelEvent(e){let t=e.deltaMode,i={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(t){case 1:i.deltaY*=16;break;case 2:i.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(i.deltaY*=10),i}}});var Ds,Ol=xt(()=>{Is();me.line={worldUnits:{value:1},linewidth:{value:1},resolution:{value:new De},dashOffset:{value:0},dashScale:{value:1},dashSize:{value:1},gapSize:{value:1}};cn.line={uniforms:Rr.merge([me.common,me.fog,me.line]),vertexShader:`
		#include <common>
		#include <color_pars_vertex>
		#include <fog_pars_vertex>
		#include <logdepthbuf_pars_vertex>
		#include <clipping_planes_pars_vertex>

		uniform float linewidth;
		uniform vec2 resolution;

		attribute vec3 instanceStart;
		attribute vec3 instanceEnd;

		attribute vec3 instanceColorStart;
		attribute vec3 instanceColorEnd;

		#ifdef WORLD_UNITS

			varying vec4 worldPos;
			varying vec3 worldStart;
			varying vec3 worldEnd;

			#ifdef USE_DASH

				varying vec2 vUv;

			#endif

		#else

			varying vec2 vUv;

		#endif

		#ifdef USE_DASH

			uniform float dashScale;
			attribute float instanceDistanceStart;
			attribute float instanceDistanceEnd;
			varying float vLineDistance;

		#endif

		float trimSegmentAlpha( const in vec4 start, const in vec4 end ) {

			// compute the interpolation factor needed to trim the segment so it terminates
			// between the camera plane and the near plane

			// conservative estimate of the near plane
			float a = projectionMatrix[ 2 ][ 2 ]; // 3nd entry in 3th column
			float b = projectionMatrix[ 3 ][ 2 ]; // 3nd entry in 4th column

			// we need different nearEstimate formula for reversed and default depth buffer
			// a is positive with a reversed depth buffer so it can be used for controlling the code flow
			float nearEstimate = ( a > 0.0 ) ? ( - b / ( a + 1.0 ) ) : ( - 0.5 * b / a );

			return ( nearEstimate - start.z ) / ( end.z - start.z );

		}

		void main() {

			#ifdef USE_COLOR

				vColor.xyz = ( position.y < 0.5 ) ? instanceColorStart : instanceColorEnd;

			#endif

			float aspect = resolution.x / resolution.y;

			// camera space
			vec4 start = modelViewMatrix * vec4( instanceStart, 1.0 );
			vec4 end = modelViewMatrix * vec4( instanceEnd, 1.0 );

			#ifdef USE_DASH

				float lineDistanceStart = dashScale * instanceDistanceStart;
				float lineDistanceEnd = dashScale * instanceDistanceEnd;

			#endif

			#ifdef WORLD_UNITS

				worldStart = start.xyz;
				worldEnd = end.xyz;

			#else

				vUv = uv;

			#endif

			// special case for perspective projection, and segments that terminate either in, or behind, the camera plane
			// clearly the gpu firmware has a way of addressing this issue when projecting into ndc space
			// but we need to perform ndc-space calculations in the shader, so we must address this issue directly
			// perhaps there is a more elegant solution -- WestLangley

			bool perspective = ( projectionMatrix[ 2 ][ 3 ] == - 1.0 ); // 4th entry in the 3rd column

			if ( perspective ) {

				if ( start.z < 0.0 && end.z >= 0.0 ) {

					float alpha = trimSegmentAlpha( start, end );
					end.xyz = mix( start.xyz, end.xyz, alpha );

					#ifdef USE_DASH

						lineDistanceEnd = mix( lineDistanceStart, lineDistanceEnd, alpha );

					#endif

				} else if ( end.z < 0.0 && start.z >= 0.0 ) {

					float alpha = trimSegmentAlpha( end, start );
					start.xyz = mix( end.xyz, start.xyz, alpha );

					#ifdef USE_DASH

						lineDistanceStart = mix( lineDistanceEnd, lineDistanceStart, alpha );

					#endif

				}

			}

			#ifdef USE_DASH

				vLineDistance = ( position.y < 0.5 ) ? lineDistanceStart : lineDistanceEnd;
				vUv = uv;

			#endif

			// clip space
			vec4 clipStart = projectionMatrix * start;
			vec4 clipEnd = projectionMatrix * end;

			// ndc space
			vec3 ndcStart = clipStart.xyz / clipStart.w;
			vec3 ndcEnd = clipEnd.xyz / clipEnd.w;

			// direction
			vec2 dir = ndcEnd.xy - ndcStart.xy;

			// account for clip-space aspect ratio
			dir.x *= aspect;
			dir = normalize( dir );

			#ifdef WORLD_UNITS

				vec3 worldDir = normalize( end.xyz - start.xyz );
				vec3 tmpFwd = perspective ? normalize( mix( start.xyz, end.xyz, 0.5 ) ) : vec3( 0.0, 0.0, - 1.0 );
				vec3 worldUp = normalize( cross( worldDir, tmpFwd ) );
				vec3 worldFwd = cross( worldDir, worldUp );
				worldPos = position.y < 0.5 ? start: end;

				// height offset
				float hw = linewidth * 0.5;
				worldPos.xyz += position.x < 0.0 ? hw * worldUp : - hw * worldUp;

				// don't extend the line if we're rendering dashes because we
				// won't be rendering the endcaps
				#ifndef USE_DASH

					// cap extension
					worldPos.xyz += position.y < 0.5 ? - hw * worldDir : hw * worldDir;

					// add width to the box
					worldPos.xyz += worldFwd * hw;

					// endcaps
					if ( position.y > 1.0 || position.y < 0.0 ) {

						worldPos.xyz -= worldFwd * 2.0 * hw;

					}

				#endif

				// project the worldpos
				vec4 clip = projectionMatrix * worldPos;

				// shift the depth of the projected points so the line
				// segments overlap neatly
				vec3 clipPose = ( position.y < 0.5 ) ? ndcStart : ndcEnd;

				// only shift the depth of vertices in front of the camera (#35137)
				if ( clip.w > 0.0 ) clip.z = clipPose.z * clip.w;

			#else

				vec2 offset = vec2( dir.y, - dir.x );
				// undo aspect ratio adjustment
				dir.x /= aspect;
				offset.x /= aspect;

				// sign flip
				if ( position.x < 0.0 ) offset *= - 1.0;

				// endcaps
				if ( position.y < 0.0 ) {

					offset += - dir;

				} else if ( position.y > 1.0 ) {

					offset += dir;

				}

				// adjust for linewidth
				offset *= linewidth;

				// adjust for clip-space to screen-space conversion // maybe resolution should be based on viewport ...
				offset /= resolution.y;

				// select end
				vec4 clip = ( position.y < 0.5 ) ? clipStart : clipEnd;

				// back to clip space
				offset *= clip.w;

				clip.xy += offset;

			#endif

			gl_Position = clip;

			vec4 mvPosition = ( position.y < 0.5 ) ? start : end; // this is an approximation

			#include <logdepthbuf_vertex>
			#include <clipping_planes_vertex>
			#include <fog_vertex>

		}
		`,fragmentShader:`
		uniform vec3 diffuse;
		uniform float opacity;
		uniform float linewidth;

		#ifdef USE_DASH

			uniform float dashOffset;
			uniform float dashSize;
			uniform float gapSize;

		#endif

		varying float vLineDistance;

		#ifdef WORLD_UNITS

			varying vec4 worldPos;
			varying vec3 worldStart;
			varying vec3 worldEnd;

			#ifdef USE_DASH

				varying vec2 vUv;

			#endif

		#else

			varying vec2 vUv;

		#endif

		#include <common>
		#include <color_pars_fragment>
		#include <fog_pars_fragment>
		#include <logdepthbuf_pars_fragment>
		#include <clipping_planes_pars_fragment>

		vec2 closestLineToLine(vec3 p1, vec3 p2, vec3 p3, vec3 p4) {

			float mua;
			float mub;

			vec3 p13 = p1 - p3;
			vec3 p43 = p4 - p3;

			vec3 p21 = p2 - p1;

			float d1343 = dot( p13, p43 );
			float d4321 = dot( p43, p21 );
			float d1321 = dot( p13, p21 );
			float d4343 = dot( p43, p43 );
			float d2121 = dot( p21, p21 );

			float denom = d2121 * d4343 - d4321 * d4321;

			float numer = d1343 * d4321 - d1321 * d4343;

			mua = numer / denom;
			mua = clamp( mua, 0.0, 1.0 );
			mub = ( d1343 + d4321 * ( mua ) ) / d4343;
			mub = clamp( mub, 0.0, 1.0 );

			return vec2( mua, mub );

		}

		void main() {

			float alpha = opacity;
			vec4 diffuseColor = vec4( diffuse, alpha );

			#include <clipping_planes_fragment>

			#ifdef USE_DASH

				if ( vUv.y < - 1.0 || vUv.y > 1.0 ) discard; // discard endcaps

				if ( mod( vLineDistance + dashOffset, dashSize + gapSize ) > dashSize ) discard; // todo - FIX

			#endif

			#ifdef WORLD_UNITS

				float len;

				if ( isOrthographic ) {

					// View rays are parallel to the z axis so the distance reduces to camera-space XY
					vec2 lineDir = worldEnd.xy - worldStart.xy;
					float t = clamp( dot( worldPos.xy - worldStart.xy, lineDir ) / dot( lineDir, lineDir ), 0.0, 1.0 );
					len = length( worldStart.xy + lineDir * t - worldPos.xy );

				} else {

					// Find the closest points on the view ray and the line segment
					vec3 rayEnd = normalize( worldPos.xyz ) * 1e5;
					vec3 lineDir = worldEnd - worldStart;
					vec2 params = closestLineToLine( worldStart, worldEnd, vec3( 0.0, 0.0, 0.0 ), rayEnd );

					vec3 p1 = worldStart + lineDir * params.x;
					vec3 p2 = rayEnd * params.y;
					vec3 delta = p1 - p2;
					len = length( delta );

				}

				float norm = len / linewidth;

				#ifndef USE_DASH

					#ifdef USE_ALPHA_TO_COVERAGE

						float dnorm = fwidth( norm );
						alpha = 1.0 - smoothstep( 0.5 - dnorm, 0.5 + dnorm, norm );

					#else

						if ( norm > 0.5 ) {

							discard;

						}

					#endif

				#endif

			#else

				#ifdef USE_ALPHA_TO_COVERAGE

					// artifacts appear on some hardware if a derivative is taken within a conditional
					float a = vUv.x;
					float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
					float len2 = a * a + b * b;
					float dlen = fwidth( len2 );

					if ( abs( vUv.y ) > 1.0 ) {

						alpha = 1.0 - smoothstep( 1.0 - dlen, 1.0 + dlen, len2 );

					}

				#else

					if ( abs( vUv.y ) > 1.0 ) {

						float a = vUv.x;
						float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
						float len2 = a * a + b * b;

						if ( len2 > 1.0 ) discard;

					}

				#endif

			#endif

			#include <logdepthbuf_fragment>
			#include <color_fragment>

			gl_FragColor = vec4( diffuseColor.rgb, alpha );

			#include <tonemapping_fragment>
			#include <colorspace_fragment>
			#include <fog_fragment>
			#include <premultiplied_alpha_fragment>

		}
		`};Ds=class extends Sn{constructor(e){super({type:"LineMaterial",uniforms:Rr.clone(cn.line.uniforms),vertexShader:cn.line.vertexShader,fragmentShader:cn.line.fragmentShader,clipping:!0}),this.isLineMaterial=!0,this.setValues(e)}get color(){return this.uniforms.diffuse.value}set color(e){this.uniforms.diffuse.value=e}get worldUnits(){return"WORLD_UNITS"in this.defines}set worldUnits(e){e===!0!==this.worldUnits&&(this.needsUpdate=!0),e===!0?this.defines.WORLD_UNITS="":delete this.defines.WORLD_UNITS}get linewidth(){return this.uniforms.linewidth.value}set linewidth(e){this.uniforms.linewidth&&(this.uniforms.linewidth.value=e)}get dashed(){return"USE_DASH"in this.defines}set dashed(e){e===!0!==this.dashed&&(this.needsUpdate=!0),e===!0?this.defines.USE_DASH="":delete this.defines.USE_DASH}get dashScale(){return this.uniforms.dashScale.value}set dashScale(e){this.uniforms.dashScale.value=e}get dashSize(){return this.uniforms.dashSize.value}set dashSize(e){this.uniforms.dashSize.value=e}get dashOffset(){return this.uniforms.dashOffset.value}set dashOffset(e){this.uniforms.dashOffset.value=e}get gapSize(){return this.uniforms.gapSize.value}set gapSize(e){this.uniforms.gapSize.value=e}get opacity(){return this.uniforms.opacity.value}set opacity(e){this.uniforms&&(this.uniforms.opacity.value=e)}get resolution(){return this.uniforms.resolution.value}set resolution(e){this.uniforms.resolution.value.copy(e)}get alphaToCoverage(){return"USE_ALPHA_TO_COVERAGE"in this.defines}set alphaToCoverage(e){this.defines&&(e===!0!==this.alphaToCoverage&&(this.needsUpdate=!0),e===!0?this.defines.USE_ALPHA_TO_COVERAGE="":delete this.defines.USE_ALPHA_TO_COVERAGE)}}});var Ld,Oo,Ns,Bl=xt(()=>{Is();Ld=new rn,Oo=new N,Ns=class extends br{constructor(){super(),this.isLineSegmentsGeometry=!0,this.type="LineSegmentsGeometry";let e=[-1,2,0,1,2,0,-1,1,0,1,1,0,-1,0,0,1,0,0,-1,-1,0,1,-1,0],t=[-1,2,1,2,-1,1,1,1,-1,-1,1,-1,-1,-2,1,-2],i=[0,2,1,2,3,1,2,4,3,4,5,3,4,6,5,6,7,5];this.setIndex(i),this.setAttribute("position",new yt(e,3)),this.setAttribute("uv",new yt(t,2))}applyMatrix4(e){let t=this.attributes.instanceStart,i=this.attributes.instanceEnd;return t!==void 0&&(t.applyMatrix4(e),i.applyMatrix4(e),t.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}setPositions(e){let t;e instanceof Float32Array?t=e:Array.isArray(e)&&(t=new Float32Array(e));let i=new yi(t,6,1);return this.setAttribute("instanceStart",new Pn(i,3,0)),this.setAttribute("instanceEnd",new Pn(i,3,3)),this.instanceCount=this.attributes.instanceStart.count,this.computeBoundingBox(),this.computeBoundingSphere(),this}setColors(e){let t;e instanceof Float32Array?t=e:Array.isArray(e)&&(t=new Float32Array(e));let i=new yi(t,6,1);return this.setAttribute("instanceColorStart",new Pn(i,3,0)),this.setAttribute("instanceColorEnd",new Pn(i,3,3)),this}fromWireframeGeometry(e){return this.setPositions(e.attributes.position.array),this}fromEdgesGeometry(e){return this.setPositions(e.attributes.position.array),this}fromMesh(e){return this.fromWireframeGeometry(new ur(e.geometry)),this}fromLineSegments(e){let t=e.geometry;return this.setPositions(t.attributes.position.array),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new rn);let e=this.attributes.instanceStart,t=this.attributes.instanceEnd;e!==void 0&&t!==void 0&&(this.boundingBox.setFromBufferAttribute(e),Ld.setFromBufferAttribute(t),this.boundingBox.union(Ld))}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Bn),this.boundingBox===null&&this.computeBoundingBox();let e=this.attributes.instanceStart,t=this.attributes.instanceEnd;if(e!==void 0&&t!==void 0){let i=this.boundingSphere.center;this.boundingBox.getCenter(i);let s=0;for(let r=0,a=e.count;r<a;r++)Oo.fromBufferAttribute(e,r),s=Math.max(s,i.distanceToSquared(Oo)),Oo.fromBufferAttribute(t,r),s=Math.max(s,i.distanceToSquared(Oo));this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error("THREE.LineSegmentsGeometry.computeBoundingSphere(): Computed radius is NaN. The instanced position data is likely to have NaN values.",this)}}toJSON(){}}});function Ud(n,e,t){return Vn.set(0,0,-e,1).applyMatrix4(n.projectionMatrix),Vn.multiplyScalar(1/Vn.w),Vn.x=Ki/t.width,Vn.y=Ki/t.height,Vn.applyMatrix4(n.projectionMatrixInverse),Vn.multiplyScalar(1/Vn.w),Math.abs(Math.max(Vn.x,Vn.y))}function K_(n,e){let t=n.matrixWorld,i=n.geometry,s=i.attributes.instanceStart,r=i.attributes.instanceEnd,a=Math.min(i.instanceCount,s.count);for(let o=0,l=a;o<l;o++){Ot.start.fromBufferAttribute(s,o),Ot.end.fromBufferAttribute(r,o),Ot.applyMatrix4(t);let c=new N,h=new N;Hn.distanceSqToSegment(Ot.start,Ot.end,h,c),h.distanceTo(c)<Ki*.5&&e.push({point:h,pointOnLine:c,distance:Hn.origin.distanceTo(h),object:n,face:null,faceIndex:o,uv:null,uv1:null})}}function Y_(n,e,t){let i=e.projectionMatrix,r=n.material.resolution,a=n.matrixWorld,o=n.geometry,l=o.attributes.instanceStart,c=o.attributes.instanceEnd,h=Math.min(o.instanceCount,l.count),f=-e.near;Hn.at(1,Gn),Gn.w=1,Gn.applyMatrix4(e.matrixWorldInverse),Gn.applyMatrix4(i),Gn.multiplyScalar(1/Gn.w),Gn.x*=r.x/2,Gn.y*=r.y/2,Gn.z=0,zl.copy(Gn),Gl.multiplyMatrices(e.matrixWorldInverse,a);for(let d=0,p=h;d<p;d++){if(Ut.fromBufferAttribute(l,d),Ft.fromBufferAttribute(c,d),Ut.w=1,Ft.w=1,Ut.applyMatrix4(Gl),Ft.applyMatrix4(Gl),Ut.z>f&&Ft.z>f)continue;if(Ut.z>f){let E=Ut.z-Ft.z,y=(Ut.z-f)/E;Ut.lerp(Ft,y)}else if(Ft.z>f){let E=Ft.z-Ut.z,y=(Ft.z-f)/E;Ft.lerp(Ut,y)}Ut.applyMatrix4(i),Ft.applyMatrix4(i),Ut.multiplyScalar(1/Ut.w),Ft.multiplyScalar(1/Ft.w),Ut.x*=r.x/2,Ut.y*=r.y/2,Ft.x*=r.x/2,Ft.y*=r.y/2,Ot.start.copy(Ut),Ot.start.z=0,Ot.end.copy(Ft),Ot.end.z=0;let S=Ot.closestPointToPointParameter(zl,!0);Ot.at(S,Nd);let m=Kt.lerp(Ut.z,Ft.z,S),u=m>=-1&&m<=1,v=zl.distanceTo(Nd)<Ki*.5;if(u&&v){Ot.start.fromBufferAttribute(l,d),Ot.end.fromBufferAttribute(c,d),Ot.start.applyMatrix4(a),Ot.end.applyMatrix4(a);let E=new N,y=new N;Hn.distanceSqToSegment(Ot.start,Ot.end,y,E),t.push({point:y,pointOnLine:E,distance:Hn.origin.distanceTo(y),object:n,face:null,faceIndex:d,uv:null,uv1:null})}}}var kl,Id,Dd,Ut,Ft,Gn,zl,Gl,Ot,Nd,Bo,ko,Vn,Hn,Ki,zo,Fd=xt(()=>{Is();Bl();Ol();kl=new Ze,Id=new N,Dd=new N,Ut=new Ze,Ft=new Ze,Gn=new Ze,zl=new N,Gl=new it,Ot=new _r,Nd=new N,Bo=new rn,ko=new Bn,Vn=new Ze;zo=class extends St{constructor(e=new Ns,t=new Ds({color:Math.random()*16777215})){super(e,t),this.isLineSegments2=!0,this.type="LineSegments2"}computeLineDistances(){let e=this.geometry,t=e.attributes.instanceStart,i=e.attributes.instanceEnd,s=new Float32Array(2*t.count);for(let a=0,o=0,l=t.count;a<l;a++,o+=2)Id.fromBufferAttribute(t,a),Dd.fromBufferAttribute(i,a),s[o]=o===0?0:s[o-1],s[o+1]=s[o]+Id.distanceTo(Dd);let r=new yi(s,2,1);return e.setAttribute("instanceDistanceStart",new Pn(r,1,0)),e.setAttribute("instanceDistanceEnd",new Pn(r,1,1)),this}raycast(e,t){let i=this.material.worldUnits,s=e.camera;if(s===null&&!i&&console.error('LineSegments2: "Raycaster.camera" needs to be set in order to raycast against LineSegments2 while worldUnits is set to false.'),i===!1&&(this.material.resolution.x===0||this.material.resolution.y===0))return;let r=e.params.Line2!==void 0&&e.params.Line2.threshold||0;Hn=e.ray;let a=this.matrixWorld,o=this.geometry,l=this.material;Ki=l.linewidth+r,o.boundingSphere===null&&o.computeBoundingSphere(),ko.copy(o.boundingSphere).applyMatrix4(a);let c;if(i)c=Ki*.5;else{let f=Math.max(s.near,ko.distanceToPoint(Hn.origin));c=Ud(s,f,l.resolution)}if(ko.radius+=c,Hn.intersectsSphere(ko)===!1)return;o.boundingBox===null&&o.computeBoundingBox(),Bo.copy(o.boundingBox).applyMatrix4(a);let h;if(i)h=Ki*.5;else{let f=Math.max(s.near,Bo.distanceToPoint(Hn.origin));h=Ud(s,f,l.resolution)}Bo.expandByScalar(h),Hn.intersectsBox(Bo)!==!1&&(i?K_(this,t):Y_(this,s,t))}onBeforeRender(e){let t=this.material.uniforms;t&&t.resolution&&(e.getViewport(kl),this.material.uniforms.resolution.value.set(kl.z,kl.w))}}});var Go,Od=xt(()=>{Go={parts:{tee:"./outfit-tee-98ad16781ae6.json",raglan:"./outfit-raglan-fcda95b85a53.json",zip:"./outfit-zip-f46d5ba17b93.json",hoodie:"./outfit-hoodie-3089abcedfd0.json",crew:"./outfit-crew-db36efc461f9.json"},bodies:{male:"./rig-male-d3569229ec2d.json",female:"./rig-female-ee5df4fc1760.json"},fits:{male:{tee:"./fit-male-tee-4dd59101588e.json",raglan:"./fit-male-raglan-a98670db7941.json",zip:"./fit-male-zip-821808f585d6.json",hoodie:"./fit-male-hoodie-390e3e636150.json",crew:"./fit-male-crew-61843239c607.json"},female:{tee:"./fit-female-tee-4709f0211d75.json",raglan:"./fit-female-raglan-dbd4e99cce5a.json",zip:"./fit-female-zip-fcc8be7351ee.json",hoodie:"./fit-female-hoodie-8617ec534690.json",crew:"./fit-female-crew-a39ad0fca36c.json"}}}});var Vo,Bd=xt(()=>{Vo=(function(){var n="b9H79Tebbbe8Fv9Gbb9Gvuuuuueu9Giuuub9Geueu9Giuuueuixkbeeeddddillviebeoweuecj:Gdkr;Neqo9TW9T9VV95dbH9F9F939H79T9F9J9H229F9Jt9VV7bb8A9TW79O9V9Wt9F9KW9J9V9KW9wWVtW949c919M9MWVbeY9TW79O9V9Wt9F9KW9J9V9KW69U9KW949c919M9MWVbdE9TW79O9V9Wt9F9KW9J9V9KW69U9KW949tWG91W9U9JWbiL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9p9JtblK9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9r919HtbvL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWVT949WboY9TW79O9V9Wt9F9KW9J9V9KWS9P2tWVJ9V29VVbrl79IV9Rbwq;X8:kdbk:kYi5ud9:du8Jjjjjbcjq9Rgv8Kjjjjbc9:hodnalTmbcuhoaiRbbgrc;WeGc:Ge9hmbarcsGgwce0mbc9:hoalcufadcd4cbawEgDadfgrcKcaawEgqaraq0Egk6mbaicefhxcj;abad9Uc;WFbGcjdadca0EhmaialfgPar9Rgoadfhsavaoadz:jjjjbgzceVhHcbhOdndninaeaO9nmeaPax9RaD6mdamaeaO9RaOamfgoae6EgAcsfglc9WGhCaAcethXaxaDfhiaOaeaoaeao6E9RhQalcl4cifcd4hLazcjdfaAfhKcbhYabaOad2fg8AhEaHh3incbh5dnawTmbaxaYcd4fRbbh5kcbh8Eazcjdfhqinaih8Fdndndndna5a8Ecet4ciGgoc9:fPdebdkaPa8F9RaA6mrazcjdfa8EaA2fa8FaAz:jjjjb8Aa8FaAfhixdkazcjdfa8EaA2fcbaAz:kjjjb8Aa8FhixekaPa8F9RaL6mva8FaLfhidnaCTmbaPai9RcK6mbaocdtc:q:G:cjbfcj:G:cjbawEhaczhrcbhlinargoc9Wfghaqfhrdndndndndndnaaa8Fahco4fRbbalcoG4ciGcdtfydbPDbedvivvvlvkar9cb83bwar9cb83bbxlkarcbaiRbdai8Xbb9c:c:qj:bw9:9c:q;c1:I1e:d9c:b:c:e1z9:gg9cjjjjjz:dg8J9qE86bbaqaofgrcGfcbaicdfa8J9c8N1:NfghRbbag9cjjjjjw:dg8J9qE86bbarcVfcbaha8J9c8M1:NfghRbbag9cjjjjjl:dg8J9qE86bbarc7fcbaha8J9c8L1:NfghRbbag9cjjjjjd:dg8J9qE86bbarctfcbaha8J9c8K1:NfghRbbag9cjjjjje:dg8J9qE86bbarc91fcbaha8J9c8J1:NfghRbbag9cjjjj;ab:dg8J9qE86bbarc4fcbaha8J9cg1:NfghRbbag9cjjjja:dg8J9qE86bbarc93fcbaha8J9ch1:NfghRbbag9cjjjjz:dgg9qE86bbarc94fcbahag9ca1:NfghRbbai8Xbe9c:c:qj:bw9:9c:q;c1:I1e:d9c:b:c:e1z9:gg9cjjjjjz:dg8J9qE86bbarc95fcbaha8J9c8N1:NfgiRbbag9cjjjjjw:dg8J9qE86bbarc96fcbaia8J9c8M1:NfgiRbbag9cjjjjjl:dg8J9qE86bbarc97fcbaia8J9c8L1:NfgiRbbag9cjjjjjd:dg8J9qE86bbarc98fcbaia8J9c8K1:NfgiRbbag9cjjjjje:dg8J9qE86bbarc99fcbaia8J9c8J1:NfgiRbbag9cjjjj;ab:dg8J9qE86bbarc9:fcbaia8J9cg1:NfgiRbbag9cjjjja:dg8J9qE86bbarcufcbaia8J9ch1:NfgiRbbag9cjjjjz:dgg9qE86bbaiag9ca1:NfhixikaraiRblaiRbbghco4g8Ka8KciSg8KE86bbaqaofgrcGfaiclfa8Kfg8KRbbahcl4ciGg8La8LciSg8LE86bbarcVfa8Ka8Lfg8KRbbahcd4ciGg8La8LciSg8LE86bbarc7fa8Ka8Lfg8KRbbahciGghahciSghE86bbarctfa8Kahfg8KRbbaiRbeghco4g8La8LciSg8LE86bbarc91fa8Ka8Lfg8KRbbahcl4ciGg8La8LciSg8LE86bbarc4fa8Ka8Lfg8KRbbahcd4ciGg8La8LciSg8LE86bbarc93fa8Ka8Lfg8KRbbahciGghahciSghE86bbarc94fa8Kahfg8KRbbaiRbdghco4g8La8LciSg8LE86bbarc95fa8Ka8Lfg8KRbbahcl4ciGg8La8LciSg8LE86bbarc96fa8Ka8Lfg8KRbbahcd4ciGg8La8LciSg8LE86bbarc97fa8Ka8Lfg8KRbbahciGghahciSghE86bbarc98fa8KahfghRbbaiRbigico4g8Ka8KciSg8KE86bbarc99faha8KfghRbbaicl4ciGg8Ka8KciSg8KE86bbarc9:faha8KfghRbbaicd4ciGg8Ka8KciSg8KE86bbarcufaha8KfgrRbbaiciGgiaiciSgiE86bbaraifhixdkaraiRbwaiRbbghcl4g8Ka8KcsSg8KE86bbaqaofgrcGfaicwfa8Kfg8KRbbahcsGghahcsSghE86bbarcVfa8KahfghRbbaiRbeg8Kcl4g8La8LcsSg8LE86bbarc7faha8LfghRbba8KcsGg8Ka8KcsSg8KE86bbarctfaha8KfghRbbaiRbdg8Kcl4g8La8LcsSg8LE86bbarc91faha8LfghRbba8KcsGg8Ka8KcsSg8KE86bbarc4faha8KfghRbbaiRbig8Kcl4g8La8LcsSg8LE86bbarc93faha8LfghRbba8KcsGg8Ka8KcsSg8KE86bbarc94faha8KfghRbbaiRblg8Kcl4g8La8LcsSg8LE86bbarc95faha8LfghRbba8KcsGg8Ka8KcsSg8KE86bbarc96faha8KfghRbbaiRbvg8Kcl4g8La8LcsSg8LE86bbarc97faha8LfghRbba8KcsGg8Ka8KcsSg8KE86bbarc98faha8KfghRbbaiRbog8Kcl4g8La8LcsSg8LE86bbarc99faha8LfghRbba8KcsGg8Ka8KcsSg8KE86bbarc9:faha8KfghRbbaiRbrgicl4g8Ka8KcsSg8KE86bbarcufaha8KfgrRbbaicsGgiaicsSgiE86bbaraifhixekarai8Pbw83bwarai8Pbb83bbaiczfhikdnaoaC9pmbalcdfhlaoczfhraPai9RcL0mekkaoaC6moaimexokaCmva8FTmvkaqaAfhqa8Ecefg8Ecl9hmbkdndndndnawTmbasaYcd4fRbbgociGPlbedrbkaATmdazaYfh8Fazcjdfhhcbh8EaEhaina8FRbbhraahocbhlinaoahalfRbbgqce4cbaqceG9R7arfgr86bbaoadfhoaAalcefgl9hmbkaacefhaa8Fcefh8FahaAfhha8Ecefg8Ecl9hmbxikkaATmeazaYfhaazcjdfhhcbhoceh8EaKh8FinaEaofhlaa8Vbbhrcbhoinala8FaofRbbcwtahaofRbbgqVc;:FiGce4cbaqceG9R7arfgr87bbaladfhlaQaocefgofmbka8FaXfh8FcdhoaacdfhaahaXfhha8EceGhlcbh8EalmbxdkkaATmbaocl4h8EazaYfRbbhqcwhoa3hlinalRbbaotaqVhqalcefhlaocwfgoca9hmbkcbhhaEh8FaKhainazcjdfahfRbbhrcwhoaahlinalRbbaotarVhralaAfhlaocwfgoca9hmbkara8E94aq7hqcbhoa8Fhlinalaqao486bbalcefhlaocwfgoca9hmbka8Fadfh8FaacefhaahcefghaA9hmbkkaEclfhEa3clfh3aYclfgYad6mbkaza8AaAcufad2fadz:jjjjb8AaAaOfhOaihxaimbkc9:hoxdkcbc99aPax9RakSEhoxekc9:hokavcjqf8Kjjjjbaok:bsesu8Jjjjjbc;ae9Rgv8Kjjjjbc9:hodnalaeci9UgrcHf6mbcuhoaiRbbgwc;WeGc;Ge9hmbawcsGgwce0mbavc;abfcFecjez:kjjjb8Aav9cu83iUav9cu83i8Wav9cu83iyav9cu83iaav9cu83iKav9cu83izav9cu83iwav9cu83ibaialfc9WfhDaicefgiarfhqdndnaeci9pmbaqhexekcmcsawceSEhkcbhxcbhmaqhecbhlcbhoindndnaiRbbgrc;Ve0mbavc;abfaoarcu7gPcl4fcsGcitfgwydlhsawydbhzdndnarcsGgwak9pmbavalaPfcsGcdtfydbaxawEhraxawTgHfhxxekdnaeaD9nmbc9:hoxokdndnawcsSmbcehHamawcetfcWfhrxekaecefhrae8SbbgwcFeGhPdndnawcu9mmbarhexekaecvfheaPcFbGhPcrhwdninar8SbbgHcFbGawtaPVhPaHcu9kmearcefhrawcrfgwc8J9hmbxdkkarcefhekcehHaPce4cbaPceG9R7amfhrkarhmkavc;abfaocitfgwarBdbawasBdlavalcdtfarBdbavc;abfaocefcsGcitfgwazBdbawarBdlaocdfhoaHalfhldnadcd9hmbabar87elabas87edabaz87ebabcofhbxdkabarBdwabasBdlabazBdbabcxfhbxekdnarcpe0mbavalaDarcsGfRbbgwcl4gP9RcsGcdtfydbaxcefgsaPEhravalaw9RcsGcdtfydbasaPTgzfgsawcsGgPEhwaPThPdndnadcd9hmbabaw87elabar87edabax87ebcohHxekabawBdwabarBdlabaxBdbcxhHkavalcdtfaxBdbavc;abfaocitfgOarBdbaOaxBdlavalcefglcsGcdtfarBdbavc;abfaocefcsGcitfgOawBdbaOarBdlavalazfglcsGcdtfawBdbavc;abfaocdfcsGcitfgraxBdbarawBdlaocifhoabaHfhbalaPfhlasaPfhxxekdnaeaD9nmbc9:hoxlkaxcbaeRbbgwEgHarc;:eSgrfhsawcsGhOdndnawcl4gAmbascefhzxekashzavalaA9RcsGcdtfydbhskdndnaOmbazcefhxxekazhxavalaw9RcsGcdtfydbhzkdndnarTmbaecefhrxekaecdfhrae8SbegPcFeGhwdnaPcu9kmbaecofhHawcFbGhwcrhedninar8SbbgPcFbGaetawVhwaPcu9kmearcefhraecrfgec8J9hmbkaHhrxekarcefhrkawce4cbawceG9R7amfgmhHkdndnaAcsSmbarhwxekarcefhwar8SbbgecFeGhPdnaecu9kmbarcvfhsaPcFbGhPcrhedninaw8SbbgrcFbGaetaPVhParcu9kmeawcefhwaecrfgec8J9hmbkashwxekawcefhwkaPce4cbaPceG9R7amfgmhskdndnaOcsSmbawhexekawcefheaw8SbbgrcFeGhPdnarcu9kmbawcvfhzaPcFbGhPcrhrdninae8SbbgwcFbGartaPVhPawcu9kmeaecefhearcrfgrc8J9hmbkazhexekaecefhekaPce4cbaPceG9R7amfgmhzkdndnadcd9hmbabaz87elabas87edabaH87ebcohrxekabazBdwabasBdlabaHBdbcxhrkavc;abfaocitfgwasBdbawaHBdlavalcdtfaHBdbavc;abfaocefcsGcitfgwazBdbawasBdlavalcefglcsGcdtfasBdbavc;abfaocdfcsGcitfgwaHBdbawazBdlavalaATaAcsSVfglcsGcdtfazBdbalaOTaOcsSVfhlaocifhoabarfhbkaocsGhoalcsGhlaicefgiaq6mbkkcbc99aeaDSEhokavc;aef8Kjjjjbaok:clevu8Jjjjjbcz9Rhvdnalaecvf9pmbc9:skdnaiRbbc;:eGc;qeSmbcuskav9cb83iwaicefhoaialfc98fhrdnaeTmbdnadcdSmbcbhwindnaoar6mbc9:skaocefhlao8SbbgicFeGhddndnaicu9mmbalhoxekaocvfhoadcFbGhdcrhidninal8SbbgDcFbGaitadVhdaDcu9kmealcefhlaicrfgic8J9hmbxdkkalcefhokabawcdtfadc8Etc8F91adcd47avcwfadceGcdtVglydbfgiBdbalaiBdbawcefgwae9hmbxdkkcbhwindnaoar6mbc9:skaocefhlao8SbbgicFeGhddndnaicu9mmbalhoxekaocvfhoadcFbGhdcrhidninal8SbbgDcFbGaitadVhdaDcu9kmealcefhlaicrfgic8J9hmbxdkkalcefhokabawcetfadc8Etc8F91adcd47avcwfadceGcdtVglydbfgi87ebalaiBdbawcefgwae9hmbkkcbc99aoarSEk:Lvoeue99dud99eud99dndnadcl9hmbaeTmeindndnabcdfgd8Sbb:Yab8Sbbgi:Ygl:l:tabcefgv8Sbbgo:Ygr:l:tgwJbb;:9cawawNJbbbbawawJbbbb9GgDEgq:mgkaqaicb9iEalMgwawNakaqaocb9iEarMgqaqNMM:r:vglNJbbbZJbbb:;aDEMgr:lJbbb9p9DTmbar:Ohixekcjjjj94hikadai86bbdndnaqalNJbbbZJbbb:;aqJbbbb9GEMgq:lJbbb9p9DTmbaq:Ohdxekcjjjj94hdkavad86bbdndnawalNJbbbZJbbb:;awJbbbb9GEMgw:lJbbb9p9DTmbaw:Ohdxekcjjjj94hdkabad86bbabclfhbaecufgembxdkkaeTmbindndnabclfgd8Ueb:Yab8Uebgi:Ygl:l:tabcdfgv8Uebgo:Ygr:l:tgwJb;:FSawawNJbbbbawawJbbbb9GgDEgq:mgkaqaicb9iEalMgwawNakaqaocb9iEarMgqaqNMM:r:vglNJbbbZJbbb:;aDEMgr:lJbbb9p9DTmbar:Ohixekcjjjj94hikadai87ebdndnaqalNJbbbZJbbb:;aqJbbbb9GEMgq:lJbbb9p9DTmbaq:Ohdxekcjjjj94hdkavad87ebdndnawalNJbbbZJbbb:;awJbbbb9GEMgw:lJbbb9p9DTmbaw:Ohdxekcjjjj94hdkabad87ebabcwfhbaecufgembkkk:4ioiue99dud99dud99dnaeTmbcbhiabhlindndnal8Uebgv:YgoJ:ji:1Salcof8UebgrciVgw:Y:vgDNJbbbZJbbb:;avcu9kEMgq:lJbbb9p9DTmbaq:Ohkxekcjjjj94hkkalclf8Uebhvalcdf8UebhxalarcefciGcetfak87ebdndnax:YgqaDNJbbbZJbbb:;axcu9kEMgm:lJbbb9p9DTmbam:Ohxxekcjjjj94hxkabaiarciGgkfcd7cetfax87ebdndnav:YgmaDNJbbbZJbbb:;avcu9kEMgP:lJbbb9p9DTmbaP:Ohvxekcjjjj94hvkalarcufciGcetfav87ebdndnawaw2:ZgPaPMaoaoN:taqaqN:tamamN:tgoJbbbbaoJbbbb9GE:raDNJbbbZMgD:lJbbb9p9DTmbaD:Ohrxekcjjjj94hrkalakcetfar87ebalcwfhlaiclfhiaecufgembkkk9mbdnadcd4ae2gdTmbinababydbgecwtcw91:Yaece91cjjj98Gcjjj;8if::NUdbabclfhbadcufgdmbkkk:Tvirud99eudndnadcl9hmbaeTmeindndnabRbbgiabcefgl8Sbbgvabcdfgo8Sbbgrf9R:YJbbuJabcifgwRbbgdce4adVgDcd4aDVgDcl4aDVgD:Z:vgqNJbbbZMgk:lJbbb9p9DTmbak:Ohxxekcjjjj94hxkaoax86bbdndnaraif:YaqNJbbbZMgk:lJbbb9p9DTmbak:Ohoxekcjjjj94hokalao86bbdndnavaifar9R:YaqNJbbbZMgk:lJbbb9p9DTmbak:Ohixekcjjjj94hikabai86bbdndnaDadcetGadceGV:ZaqNJbbbZMgq:lJbbb9p9DTmbaq:Ohdxekcjjjj94hdkawad86bbabclfhbaecufgembxdkkaeTmbindndnab8Vebgiabcdfgl8Uebgvabclfgo8Uebgrf9R:YJbFu9habcofgw8Vebgdce4adVgDcd4aDVgDcl4aDVgDcw4aDVgD:Z:vgqNJbbbZMgk:lJbbb9p9DTmbak:Ohxxekcjjjj94hxkaoax87ebdndnaraif:YaqNJbbbZMgk:lJbbb9p9DTmbak:Ohoxekcjjjj94hokalao87ebdndnavaifar9R:YaqNJbbbZMgk:lJbbb9p9DTmbak:Ohixekcjjjj94hikabai87ebdndnaDadcetGadceGV:ZaqNJbbbZMgq:lJbbb9p9DTmbaq:Ohdxekcjjjj94hdkawad87ebabcwfhbaecufgembkkk9teiucbcbyd:K:G:cjbgeabcifc98GfgbBd:K:G:cjbdndnabZbcztgd9nmbcuhiabad9RcFFifcz4nbcuSmekaehikaik;LeeeudndnaeabVciGTmbabhixekdndnadcz9pmbabhixekabhiinaiaeydbBdbaiclfaeclfydbBdbaicwfaecwfydbBdbaicxfaecxfydbBdbaeczfheaiczfhiadc9Wfgdcs0mbkkadcl6mbinaiaeydbBdbaeclfheaiclfhiadc98fgdci0mbkkdnadTmbinaiaeRbb86bbaicefhiaecefheadcufgdmbkkabk;aeedudndnabciGTmbabhixekaecFeGc:b:c:ew2hldndnadcz9pmbabhixekabhiinaialBdbaicxfalBdbaicwfalBdbaiclfalBdbaiczfhiadc9Wfgdcs0mbkkadcl6mbinaialBdbaiclfhiadc98fgdci0mbkkdnadTmbinaiae86bbaicefhiadcufgdmbkkabkk83dbcj:Gdk8Kbbbbdbbblbbbwbbbbbbbebbbdbbblbbbwbbbbc:K:Gdkl8W:qbb",e="b9H79TebbbeKl9Gbb9Gvuuuuueu9Giuuub9Geueuixkbbebeeddddilve9Weeeviebeoweuecj:Gdkr;Neqo9TW9T9VV95dbH9F9F939H79T9F9J9H229F9Jt9VV7bb8A9TW79O9V9Wt9F9KW9J9V9KW9wWVtW949c919M9MWVbdY9TW79O9V9Wt9F9KW9J9V9KW69U9KW949c919M9MWVblE9TW79O9V9Wt9F9KW9J9V9KW69U9KW949tWG91W9U9JWbvL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9p9JtboK9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9r919HtbrL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWVT949WbwY9TW79O9V9Wt9F9KW9J9V9KWS9P2tWVJ9V29VVbDl79IV9Rbqq:I9Dklbzik94evu8Jjjjjbcz9Rhbcbheincbhdcbhiinabcwfadfaicjuaead4ceGglE86bbaialfhiadcefgdcw9hmbkaeai86b:q:W:cjbaecitab8Piw83i:q:G:cjbaecefgecjd9hmbkk:SBlEud97dur978Jjjjjbcj;kb9Rgv8Kjjjjbc9:hodnalTmbcuhoaiRbbgrc;WeGc:Ge9hmbarcsGgwce0mbc9:hoalcufadcd4cbawEgDadfgrcKcaawEgqaraq0Egk6mbaialfgxar9RhodnadTgmmbavaoad;8qbbkaicefhPcj;abad9Uc;WFbGcjdadca0EhsdndndnadTmbaoadfhzcbhHinaeaH9nmdaxaP9RaD6miabaHad2fgOavcjdfasaeaH9RaHasfae6EgAaAcsfgoc9WGgCSEhXaPaDfhQaocl4cifcd4hLavcj;cbfaCcetfhKavcj;cbfaCci2fhYavcj;cbfaCfh8AcbhEaoc;ab6h3incbh5dnawTmbaPaEcd4fRbbh5kcbh8Eavcj;cbfh8Findndndndna5a8Ecet4ciGgoc9:fPdebdkaxaQ9RaC6mwdnaCTmbavcj;cbfa8EaC2faQaC;8qbbkaQaAfhQxdkaCTmeavcj;cbfa8EaC2fcbaC;8kbxekaxaQ9RaL6moaoclVcbawEhraQaLfhocbhidna3mbaxao9Rc;Gb6mbcbhlina8FalfhidndndndndndnaQalco4fRbbgqciGarfPDbedibledibkaipxbbbbbbbbbbbbbbbbpklbxlkaiaopbblaopbbbgaclp:meaapmbzeHdOiAlCvXoQrLgacdp:meaapmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9oghpxiiiiiiiiiiiiiiiip8Jgap5b9cjF;8;4;W;G;ab9:9cU1:Nggcitpbi:q:G:cjbagRb:q:W:cjbggpsaap5e9cjF;8;4;W;G;ab9:9cU1:Ng8Jcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPahaap9spklbagaoclffa8JRb:q:W:cjbfhoxikaiaopbbwaopbbbgaclp:meaapmbzeHdOiAlCvXoQrLpxssssssssssssssssp9oghpxssssssssssssssssp8Jgap5b9cjF;8;4;W;G;ab9:9cU1:Nggcitpbi:q:G:cjbagRb:q:W:cjbggpsaap5e9cjF;8;4;W;G;ab9:9cU1:Ng8Jcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPahaap9spklbagaocwffa8JRb:q:W:cjbfhoxdkaiaopbbbpklbaoczfhoxekaiaopbbdaoRbbggcitpbi:q:G:cjbagRb:q:W:cjbggpsaoRbeg8Jcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPpklbagaocdffa8JRb:q:W:cjbfhokdndndndndndnaqcd4ciGarfPDbedibledibkaiczfpxbbbbbbbbbbbbbbbbpklbxlkaiczfaopbblaopbbbgaclp:meaapmbzeHdOiAlCvXoQrLgacdp:meaapmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9oghpxiiiiiiiiiiiiiiiip8Jgap5b9cjF;8;4;W;G;ab9:9cU1:Nggcitpbi:q:G:cjbagRb:q:W:cjbggpsaap5e9cjF;8;4;W;G;ab9:9cU1:Ng8Jcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPahaap9spklbagaoclffa8JRb:q:W:cjbfhoxikaiczfaopbbwaopbbbgaclp:meaapmbzeHdOiAlCvXoQrLpxssssssssssssssssp9oghpxssssssssssssssssp8Jgap5b9cjF;8;4;W;G;ab9:9cU1:Nggcitpbi:q:G:cjbagRb:q:W:cjbggpsaap5e9cjF;8;4;W;G;ab9:9cU1:Ng8Jcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPahaap9spklbagaocwffa8JRb:q:W:cjbfhoxdkaiczfaopbbbpklbaoczfhoxekaiczfaopbbdaoRbbggcitpbi:q:G:cjbagRb:q:W:cjbggpsaoRbeg8Jcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPpklbagaocdffa8JRb:q:W:cjbfhokdndndndndndnaqcl4ciGarfPDbedibledibkaicafpxbbbbbbbbbbbbbbbbpklbxlkaicafaopbblaopbbbgaclp:meaapmbzeHdOiAlCvXoQrLgacdp:meaapmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9oghpxiiiiiiiiiiiiiiiip8Jgap5b9cjF;8;4;W;G;ab9:9cU1:Nggcitpbi:q:G:cjbagRb:q:W:cjbggpsaap5e9cjF;8;4;W;G;ab9:9cU1:Ng8Jcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPahaap9spklbagaoclffa8JRb:q:W:cjbfhoxikaicafaopbbwaopbbbgaclp:meaapmbzeHdOiAlCvXoQrLpxssssssssssssssssp9oghpxssssssssssssssssp8Jgap5b9cjF;8;4;W;G;ab9:9cU1:Nggcitpbi:q:G:cjbagRb:q:W:cjbggpsaap5e9cjF;8;4;W;G;ab9:9cU1:Ng8Jcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPahaap9spklbagaocwffa8JRb:q:W:cjbfhoxdkaicafaopbbbpklbaoczfhoxekaicafaopbbdaoRbbggcitpbi:q:G:cjbagRb:q:W:cjbggpsaoRbeg8Jcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPpklbagaocdffa8JRb:q:W:cjbfhokdndndndndndnaqco4arfPDbedibledibkaic8Wfpxbbbbbbbbbbbbbbbbpklbxlkaic8Wfaopbblaopbbbgaclp:meaapmbzeHdOiAlCvXoQrLgacdp:meaapmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9oghpxiiiiiiiiiiiiiiiip8Jgap5b9cjF;8;4;W;G;ab9:9cU1:Ngicitpbi:q:G:cjbaiRb:q:W:cjbgipsaap5e9cjF;8;4;W;G;ab9:9cU1:Ngqcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPahaap9spklbaiaoclffaqRb:q:W:cjbfhoxikaic8Wfaopbbwaopbbbgaclp:meaapmbzeHdOiAlCvXoQrLpxssssssssssssssssp9oghpxssssssssssssssssp8Jgap5b9cjF;8;4;W;G;ab9:9cU1:Ngicitpbi:q:G:cjbaiRb:q:W:cjbgipsaap5e9cjF;8;4;W;G;ab9:9cU1:Ngqcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPahaap9spklbaiaocwffaqRb:q:W:cjbfhoxdkaic8Wfaopbbbpklbaoczfhoxekaic8WfaopbbdaoRbbgicitpbi:q:G:cjbaiRb:q:W:cjbgipsaoRbegqcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPpklbaiaocdffaqRb:q:W:cjbfhokalc;abfhialcjefaC0meaihlaxao9Rc;Fb0mbkkdnaiaC9pmbaici4hlinaxao9RcK6mwa8FaifhqdndndndndndnaQaico4fRbbalcoG4ciGarfPDbedibledibkaqpxbbbbbbbbbbbbbbbbpkbbxlkaqaopbblaopbbbgaclp:meaapmbzeHdOiAlCvXoQrLgacdp:meaapmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9oghpxiiiiiiiiiiiiiiiip8Jgap5b9cjF;8;4;W;G;ab9:9cU1:Nggcitpbi:q:G:cjbagRb:q:W:cjbggpsaap5e9cjF;8;4;W;G;ab9:9cU1:Ng8Jcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPahaap9spkbbagaoclffa8JRb:q:W:cjbfhoxikaqaopbbwaopbbbgaclp:meaapmbzeHdOiAlCvXoQrLpxssssssssssssssssp9oghpxssssssssssssssssp8Jgap5b9cjF;8;4;W;G;ab9:9cU1:Nggcitpbi:q:G:cjbagRb:q:W:cjbggpsaap5e9cjF;8;4;W;G;ab9:9cU1:Ng8Jcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPahaap9spkbbagaocwffa8JRb:q:W:cjbfhoxdkaqaopbbbpkbbaoczfhoxekaqaopbbdaoRbbggcitpbi:q:G:cjbagRb:q:W:cjbggpsaoRbeg8Jcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPpkbbagaocdffa8JRb:q:W:cjbfhokalcdfhlaiczfgiaC6mbkkaohQaoTmoka8FaCfh8Fa8Ecefg8Ecl9hmbkdndndndnawTmbazaEcd4fRbbglciGPlbedwbkaCTmdaXaEfhlavaEfpbdbh8Kcbhoinalavcj;cbfaofpblbg8La8Aaofpblbg8MpmbzeHdOiAlCvXoQrLg8NaKaofpblbgyaYaofpblbg8PpmbzeHdOiAlCvXoQrLgIpmbezHdiOAlvCXorQLgacep9Taapxeeeeeeeeeeeeeeeeghp9op9Hp9rgaa8Kp9Ug8Kp9Abbbaladfgla8Kaaaapmlvorlvorlvorlvorp9Ug8Kp9Abbbaladfgla8KaaaapmwDqkwDqkwDqkwDqkp9Ug8Kp9Abbbaladfgla8KaaaapmxmPsxmPsxmPsxmPsp9Ug8Kp9Abbbaladfgla8Ka8NaIpmwDKYqk8AExm35Ps8E8Fgacep9Taaahp9op9Hp9rgap9Ug8Kp9Abbbaladfgla8Kaaaapmlvorlvorlvorlvorp9Ug8Kp9Abbbaladfgla8KaaaapmwDqkwDqkwDqkwDqkp9Ug8Kp9Abbbaladfgla8KaaaapmxmPsxmPsxmPsxmPsp9Ug8Kp9Abbbaladfgla8Ka8La8MpmwKDYq8AkEx3m5P8Es8Fg8Laya8PpmwKDYq8AkEx3m5P8Es8Fg8MpmbezHdiOAlvCXorQLgacep9Taaahp9op9Hp9rgap9Ug8Kp9Abbbaladfgla8Kaaaapmlvorlvorlvorlvorp9Ug8Kp9Abbbaladfgla8KaaaapmwDqkwDqkwDqkwDqkp9Ug8Kp9Abbbaladfgla8KaaaapmxmPsxmPsxmPsxmPsp9Ug8Kp9Abbbaladfgla8Ka8La8MpmwDKYqk8AExm35Ps8E8Fgacep9Taaahp9op9Hp9rgap9Ughp9Abbbaladfglahaaaapmlvorlvorlvorlvorp9Ughp9AbbbaladfglahaaaapmwDqkwDqkwDqkwDqkp9Ughp9AbbbaladfglahaaaapmxmPsxmPsxmPsxmPsp9Ug8Kp9AbbbaladfhlaoczfgoaC6mbxikkaCTmeaXaEfhlavaEfpbdbh8Kcbhoinalavcj;cbfaofpblbg8La8Aaofpblbg8MpmbzeHdOiAlCvXoQrLg8NaKaofpblbgyaYaofpblbg8PpmbzeHdOiAlCvXoQrLgIpmbezHdiOAlvCXorQLgacep:neaapxebebebebebebebebghp9op:bep9rgaa8Kp:oeg8Kp9Abbbaladfgla8Kaaaapmlvorlvorlvorlvorp:oeg8Kp9Abbbaladfgla8KaaaapmwDqkwDqkwDqkwDqkp:oeg8Kp9Abbbaladfgla8KaaaapmxmPsxmPsxmPsxmPsp:oeg8Kp9Abbbaladfgla8Ka8NaIpmwDKYqk8AExm35Ps8E8Fgacep:neaaahp9op:bep9rgap:oeg8Kp9Abbbaladfgla8Kaaaapmlvorlvorlvorlvorp:oeg8Kp9Abbbaladfgla8KaaaapmwDqkwDqkwDqkwDqkp:oeg8Kp9Abbbaladfgla8KaaaapmxmPsxmPsxmPsxmPsp:oeg8Kp9Abbbaladfgla8Ka8La8MpmwKDYq8AkEx3m5P8Es8Fg8Laya8PpmwKDYq8AkEx3m5P8Es8Fg8MpmbezHdiOAlvCXorQLgacep:neaaahp9op:bep9rgap:oeg8Kp9Abbbaladfgla8Kaaaapmlvorlvorlvorlvorp:oeg8Kp9Abbbaladfgla8KaaaapmwDqkwDqkwDqkwDqkp:oeg8Kp9Abbbaladfgla8KaaaapmxmPsxmPsxmPsxmPsp:oeg8Kp9Abbbaladfgla8Ka8La8MpmwDKYqk8AExm35Ps8E8Fgacep:neaaahp9op:bep9rgap:oeghp9Abbbaladfglahaaaapmlvorlvorlvorlvorp:oeghp9AbbbaladfglahaaaapmwDqkwDqkwDqkwDqkp:oeghp9AbbbaladfglahaaaapmxmPsxmPsxmPsxmPsp:oeg8Kp9AbbbaladfhlaoczfgoaC6mbxdkkaCTmbaXaEfhrcbhocbalcl4gl9Rc8FGhiavaEfpbdbhhinaravcj;cbfaofpblbg8Ka8Aaofpblbg8LpmbzeHdOiAlCvXoQrLg8MaKaofpblbg8NaYaofpblbgypmbzeHdOiAlCvXoQrLg8PpmbezHdiOAlvCXorQLgaaip:Reaaalp:Tep9qgaahp9rghp9Abbbaradfgrahaaaapmlvorlvorlvorlvorp9rghp9AbbbaradfgrahaaaapmwDqkwDqkwDqkwDqkp9rghp9AbbbaradfgrahaaaapmxmPsxmPsxmPsxmPsp9rghp9Abbbaradfgraha8Ma8PpmwDKYqk8AExm35Ps8E8Fgaaip:Reaaalp:Tep9qgap9rghp9Abbbaradfgrahaaaapmlvorlvorlvorlvorp9rghp9AbbbaradfgrahaaaapmwDqkwDqkwDqkwDqkp9rghp9AbbbaradfgrahaaaapmxmPsxmPsxmPsxmPsp9rghp9Abbbaradfgraha8Ka8LpmwKDYq8AkEx3m5P8Es8Fg8Ka8NaypmwKDYq8AkEx3m5P8Es8Fg8LpmbezHdiOAlvCXorQLgaaip:Reaaalp:Tep9qgap9rghp9Abbbaradfgrahaaaapmlvorlvorlvorlvorp9rghp9AbbbaradfgrahaaaapmwDqkwDqkwDqkwDqkp9rghp9AbbbaradfgrahaaaapmxmPsxmPsxmPsxmPsp9rghp9Abbbaradfgraha8Ka8LpmwDKYqk8AExm35Ps8E8Fgaaip:Reaaalp:Tep9qgap9rghp9Abbbaradfgrahaaaapmlvorlvorlvorlvorp9rghp9AbbbaradfgrahaaaapmwDqkwDqkwDqkwDqkp9rghp9AbbbaradfgrahaaaapmxmPsxmPsxmPsxmPsp9rghp9AbbbaradfhraoczfgoaC6mbkkaEclfgEad6mbkdnaXavcjdf9hmbaAad2goTmbaOavcjdfao;8qbbkdnammbavaXaAcufad2fad;8qbbkaAaHfhHc9:hoaQhPaQmbxlkkaeTmbaDalfhrcbhocuhlinaralaD9RglfaD6mdasaeao9Raoasfae6Eaofgoae6mbkaial9RhPkcbc99axaP9RakSEhoxekc9:hokavcj;kbf8Kjjjjbaokwbz:bjjjbkpPesu8Jjjjjbc;ae9Rgv8Kjjjjbc9:hodnalaeci9UgrcHf6mbcuhoaiRbbgwc;WeGc;Ge9hmbawcsGgwce0mbavc;abfcFecje;8kbav9cu83iUav9cu83i8Wav9cu83iyav9cu83iaav9cu83iKav9cu83izav9cu83iwav9cu83ibaialfc9WfhDaicefgiarfhqdndnaeci9pmbaqhexekcmcsawceSEhkcbhxcbhmaqhecbhlcbhoindndnaiRbbgrc;Ve0mbavc;abfaoarcu7gPcl4fcsGcitfgwydlhsawydbhzdndnarcsGgwak9pmbavalaPfcsGcdtfydbaxawEhraxawTgHfhxxekdnaeaD9nmbc9:hoxokdndnawcsSmbcehHamawcetfcWfhrxekaecefhrae8SbbgwcFeGhPdndnawcu9mmbarhexekaecvfheaPcFbGhPcrhwdninar8SbbgHcFbGawtaPVhPaHcu9kmearcefhrawcrfgwc8J9hmbxdkkarcefhekcehHaPce4cbaPceG9R7amfhrkarhmkavc;abfaocitfgwarBdbawasBdlavalcdtfarBdbavc;abfaocefcsGcitfgwazBdbawarBdlaocdfhoaHalfhldnadcd9hmbabar87elabas87edabaz87ebabcofhbxdkabarBdwabasBdlabazBdbabcxfhbxekdnarcpe0mbavalaDarcsGfRbbgwcl4gP9RcsGcdtfydbaxcefgsaPEhravalaw9RcsGcdtfydbasaPTgzfgsawcsGgPEhwaPThPdndnadcd9hmbabaw87elabar87edabax87ebcohHxekabawBdwabarBdlabaxBdbcxhHkavalcdtfaxBdbavc;abfaocitfgOarBdbaOaxBdlavalcefglcsGcdtfarBdbavc;abfaocefcsGcitfgOawBdbaOarBdlavalazfglcsGcdtfawBdbavc;abfaocdfcsGcitfgraxBdbarawBdlaocifhoabaHfhbalaPfhlasaPfhxxekdnaeaD9nmbc9:hoxlkaxcbaeRbbgwEgHarc;:eSgrfhsawcsGhOdndnawcl4gAmbascefhzxekashzavalaA9RcsGcdtfydbhskdndnaOmbazcefhxxekazhxavalaw9RcsGcdtfydbhzkdndnarTmbaecefhrxekaecdfhrae8SbegPcFeGhwdnaPcu9kmbaecofhHawcFbGhwcrhedninar8SbbgPcFbGaetawVhwaPcu9kmearcefhraecrfgec8J9hmbkaHhrxekarcefhrkawce4cbawceG9R7amfgmhHkdndnaAcsSmbarhwxekarcefhwar8SbbgecFeGhPdnaecu9kmbarcvfhsaPcFbGhPcrhedninaw8SbbgrcFbGaetaPVhParcu9kmeawcefhwaecrfgec8J9hmbkashwxekawcefhwkaPce4cbaPceG9R7amfgmhskdndnaOcsSmbawhexekawcefheaw8SbbgrcFeGhPdnarcu9kmbawcvfhzaPcFbGhPcrhrdninae8SbbgwcFbGartaPVhPawcu9kmeaecefhearcrfgrc8J9hmbkazhexekaecefhekaPce4cbaPceG9R7amfgmhzkdndnadcd9hmbabaz87elabas87edabaH87ebcohrxekabazBdwabasBdlabaHBdbcxhrkavc;abfaocitfgwasBdbawaHBdlavalcdtfaHBdbavc;abfaocefcsGcitfgwazBdbawasBdlavalcefglcsGcdtfasBdbavc;abfaocdfcsGcitfgwaHBdbawazBdlavalaATaAcsSVfglcsGcdtfazBdbalaOTaOcsSVfhlaocifhoabarfhbkaocsGhoalcsGhlaicefgiaq6mbkkcbc99aeaDSEhokavc;aef8Kjjjjbaok:clevu8Jjjjjbcz9Rhvdnalaecvf9pmbc9:skdnaiRbbc;:eGc;qeSmbcuskav9cb83iwaicefhoaialfc98fhrdnaeTmbdnadcdSmbcbhwindnaoar6mbc9:skaocefhlao8SbbgicFeGhddndnaicu9mmbalhoxekaocvfhoadcFbGhdcrhidninal8SbbgDcFbGaitadVhdaDcu9kmealcefhlaicrfgic8J9hmbxdkkalcefhokabawcdtfadc8Etc8F91adcd47avcwfadceGcdtVglydbfgiBdbalaiBdbawcefgwae9hmbxdkkcbhwindnaoar6mbc9:skaocefhlao8SbbgicFeGhddndnaicu9mmbalhoxekaocvfhoadcFbGhdcrhidninal8SbbgDcFbGaitadVhdaDcu9kmealcefhlaicrfgic8J9hmbxdkkalcefhokabawcetfadc8Etc8F91adcd47avcwfadceGcdtVglydbfgi87ebalaiBdbawcefgwae9hmbkkcbc99aoarSEk;Toio97eue97aec98Ghedndnadcl9hmbaeTmecbhdinababpbbbgicKp:RecKp:Sep;6eglaicwp:RecKp:Sep;6ealp;Geaiczp:RecKp:Sep;6egvp;Gep;Kep;Legopxbbbbbbbbbbbbbbbbp:2egralpxbbbjbbbjbbbjbbbjgwp9op9rp;Keglpxbb;:9cbb;:9cbb;:9cbb;:9calalp;Meaoaop;Meavaravawp9op9rp;Keglalp;Mep;Kep;Kep;Jep;Negvp;Mepxbbn0bbn0bbn0bbn0grp;KepxFbbbFbbbFbbbFbbbp9oaipxbbbFbbbFbbbFbbbFp9op9qalavp;Mearp;Kecwp:RepxbFbbbFbbbFbbbFbbp9op9qaoavp;Mearp;Keczp:RepxbbFbbbFbbbFbbbFbp9op9qpkbbabczfhbadclfgdae6mbxdkkaeTmbcbhdinabczfgDaDpbbbgipxbbbbbbFFbbbbbbFFgwp9oabpbbbgoaipmbediwDqkzHOAKY8AEgvczp:Reczp:Sep;6eglaoaipmlvorxmPsCXQL358E8FpxFubbFubbFubbFubbp9op;6eavczp:Sep;6egvp;Gealp;Gep;Kep;Legipxbbbbbbbbbbbbbbbbp:2egralpxbbbjbbbjbbbjbbbjgqp9op9rp;Keglpxb;:FSb;:FSb;:FSb;:FSalalp;Meaiaip;Meavaravaqp9op9rp;Keglalp;Mep;Kep;Kep;Jep;Negvp;Mepxbbn0bbn0bbn0bbn0grp;KepxFFbbFFbbFFbbFFbbp9oaiavp;Mearp;Keczp:Rep9qgialavp;Mearp;KepxFFbbFFbbFFbbFFbbp9oglpmwDKYqk8AExm35Ps8E8Fp9qpkbbabaoawp9oaialpmbezHdiOAlvCXorQLp9qpkbbabcafhbadclfgdae6mbkkk;2ileue97euo97dnaec98GgiTmbcbheinabcKfpx:ji:1S:ji:1S:ji:1S:ji:1SabpbbbglabczfgvpbbbgopmlvorxmPsCXQL358E8Fgrczp:Segwpxibbbibbbibbbibbbp9qp;6egDp;NegqaDaDp;MegDaDp;KealaopmbediwDqkzHOAKY8AEgDczp:Reczp:Sep;6eglalp;MeaDczp:Sep;6egoaop;Mearczp:Reczp:Sep;6egrarp;Mep;Kep;Kep;Lepxbbbbbbbbbbbbbbbbp:4ep;Jep;Mepxbbn0bbn0bbn0bbn0gDp;KepxFFbbFFbbFFbbFFbbgkp9oaqaop;MeaDp;Keczp:Rep9qgoaqalp;MeaDp;Keakp9oaqarp;MeaDp;Keczp:Rep9qgDpmwDKYqk8AExm35Ps8E8Fglp5eawclp:RegqpEi:T:j83ibavalp5baqpEd:T:j83ibabcwfaoaDpmbezHdiOAlvCXorQLgDp5eaqpEe:T:j83ibabaDp5baqpEb:T:j83ibabcafhbaeclfgeai6mbkkkuee97dnadcd4ae2c98GgeTmbcbhdinababpbbbgicwp:Recwp:Sep;6eaicep:SepxbbjFbbjFbbjFbbjFp9opxbbjZbbjZbbjZbbjZp:Uep;Mepkbbabczfhbadclfgdae6mbkkk:Sodw97euaec98Ghedndnadcl9hmbaeTmecbhdinabpxbbuJbbuJbbuJbbuJabpbbbgicKp:TeglaicYp:Tep9qgvcdp:Teavp9qgvclp:Teavp9qgop;6ep;Negvaicwp:RecKp:SegraipxFbbbFbbbFbbbFbbbgwp9ogDp:Uep;6ep;Mepxbbn0bbn0bbn0bbn0gqp;Kecwp:RepxbFbbbFbbbFbbbFbbp9oavaDarp:Xeaiczp:RecKp:Segip:Uep;6ep;Meaqp;Keawp9op9qavaDaraip:Uep:Xep;6ep;Meaqp;Keczp:RepxbbFbbbFbbbFbbbFbp9op9qavaoalcep:Rep9oalpxebbbebbbebbbebbbp9op9qp;6ep;Meaqp;KecKp:Rep9qpkbbabczfhbadclfgdae6mbxdkkaeTmbcbhdinabczfgkpxbFu9hbFu9hbFu9hbFu9habpbbbglakpbbbgrpmlvorxmPsCXQL358E8Fgvczp:TegqavcHp:Tep9qgicdp:Teaip9qgiclp:Teaip9qgicwp:Teaip9qgop;6ep;NegialarpmbediwDqkzHOAKY8AEgDpxFFbbFFbbFFbbFFbbglp9ograDczp:Segwp:Ueavczp:Reczp:SegDp:Xep;6ep;Mepxbbn0bbn0bbn0bbn0gvp;Kealp9oaiarawaDp:Uep:Xep;6ep;Meavp;Keczp:Rep9qgwaiaoaqcep:Rep9oaqpxebbbebbbebbbebbbp9op9qp;6ep;Meavp;Keczp:ReaiaDarp:Uep;6ep;Meavp;Kealp9op9qgipmwDKYqk8AExm35Ps8E8FpkbbabawaipmbezHdiOAlvCXorQLpkbbabcafhbadclfgdae6mbkkk9teiucbcbydj:G:cjbgeabcifc98GfgbBdj:G:cjbdndnabZbcztgd9nmbcuhiabad9RcFFifcz4nbcuSmekaehikaikkxebcj:Gdklz:zbb",t=new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,3,2,0,0,5,3,1,0,1,12,1,0,10,22,2,12,0,65,0,65,0,65,0,252,10,0,0,11,7,0,65,0,253,15,26,11]),i=new Uint8Array([32,0,65,2,1,106,34,33,3,128,11,4,13,64,6,253,10,7,15,116,127,5,8,12,40,16,19,54,20,9,27,255,113,17,42,67,24,23,146,148,18,14,22,45,70,69,56,114,101,21,25,63,75,136,108,28,118,29,73,115]);if(typeof WebAssembly!="object")return{supported:!1};var s=WebAssembly.validate(t)?o(e):o(n),r,a=WebAssembly.instantiate(s,{}).then(function(u){r=u.instance,r.exports.__wasm_call_ctors()});function o(u){for(var v=new Uint8Array(u.length),E=0;E<u.length;++E){var y=u.charCodeAt(E);v[E]=y>96?y-97:y>64?y-39:y+4}for(var A=0,E=0;E<u.length;++E)v[A++]=v[E]<60?i[v[E]]:(v[E]-60)*64+v[++E];return v.buffer.slice(0,A)}function l(u,v,E,y,A,T,b){var w=u.exports.sbrk,F=y+3&-4,P=w(F*A),I=w(T.length),k=new Uint8Array(u.exports.memory.buffer);k.set(T,I);var W=v(P,y,A,I,T.length);if(W==0&&b&&b(P,F,A),E.set(k.subarray(P,P+y*A)),w(P-w(0)),W!=0)throw new Error("Malformed buffer data: "+W)}var c={NONE:"",OCTAHEDRAL:"meshopt_decodeFilterOct",QUATERNION:"meshopt_decodeFilterQuat",EXPONENTIAL:"meshopt_decodeFilterExp",COLOR:"meshopt_decodeFilterColor"},h={ATTRIBUTES:"meshopt_decodeVertexBuffer",TRIANGLES:"meshopt_decodeIndexBuffer",INDICES:"meshopt_decodeIndexSequence"},f=[],d=0;function p(u){var v={object:new Worker(u),pending:0,requests:{}};return v.object.onmessage=function(E){var y=E.data;v.pending-=y.count,v.requests[y.id][y.action](y.value),delete v.requests[y.id]},v}function g(u){for(var v="self.ready = WebAssembly.instantiate(new Uint8Array(["+new Uint8Array(s)+"]), {}).then(function(result) { result.instance.exports.__wasm_call_ctors(); return result.instance; });self.onmessage = "+m.name+";"+l.toString()+m.toString(),E=new Blob([v],{type:"text/javascript"}),y=URL.createObjectURL(E),A=f.length;A<u;++A)f[A]=p(y);for(var A=u;A<f.length;++A)f[A].object.postMessage({});f.length=u,URL.revokeObjectURL(y)}function S(u,v,E,y,A){for(var T=f[0],b=1;b<f.length;++b)f[b].pending<T.pending&&(T=f[b]);return new Promise(function(w,F){var P=new Uint8Array(E),I=++d;T.pending+=u,T.requests[I]={resolve:w,reject:F},T.object.postMessage({id:I,count:u,size:v,source:P,mode:y,filter:A},[P.buffer])})}function m(u){var v=u.data;self.ready.then(function(E){if(!v.id)return self.close();try{var y=new Uint8Array(v.count*v.size);l(E,E.exports[v.mode],y,v.count,v.size,v.source,E.exports[v.filter]),self.postMessage({id:v.id,count:v.count,action:"resolve",value:y},[y.buffer])}catch(A){self.postMessage({id:v.id,count:v.count,action:"reject",value:A})}})}return{ready:a,supported:!0,useWorkers:function(u){g(u)},decodeVertexBuffer:function(u,v,E,y,A){l(r,r.exports.meshopt_decodeVertexBuffer,u,v,E,y,r.exports[c[A]])},decodeIndexBuffer:function(u,v,E,y){l(r,r.exports.meshopt_decodeIndexBuffer,u,v,E,y)},decodeIndexSequence:function(u,v,E,y){l(r,r.exports.meshopt_decodeIndexSequence,u,v,E,y)},decodeGltfBuffer:function(u,v,E,y,A,T){l(r,r.exports[h[A]],u,v,E,y,r.exports[c[T]])},decodeGltfBufferAsync:function(u,v,E,y,A){return f.length>0?S(u,v,E,h[y],c[A]):a.then(function(){var T=new Uint8Array(u*v);return l(r,r.exports[h[y]],T,u,v,E,r.exports[c[A]]),T})}}})()});function Z_(n){return Uint8Array.fromBase64?.(n)??Uint8Array.from(atob(n),e=>e.charCodeAt(0))}function kd(n){for(let[e,t]of Object.entries(n))if(Array.isArray(t)){let[i,s,r,a]=t,o=r?s:Math.ceil(s/4)*4,l=new Uint8Array(i*o),c=Z_(a);if(r?Vo.decodeIndexSequence(l,i,o,c):Vo.decodeVertexBuffer(l,i,o,c),s===o)n[e]=l;else{let h=new Uint8Array(i*s);for(let f=0,d=0;f<l.length;f+=o)for(let p=0;p<s;p++)h[d++]=l[f+p];n[e]=h}}else t&&typeof t=="object"&&kd(t);return n}function Vl(n){return Ho.has(n)||Ho.set(n,fetch(new URL(n,import.meta.url)).then(async e=>{if(!e.ok)throw new Error("Model request failed: "+e.status);let t=await e.json();return await Vo.ready,kd(t)}).catch(e=>{throw Ho.delete(n),e})),Ho.get(n)}async function ql(n,e){let[t,i,s]=await Promise.all([Vl(Go.bodies[e]),Vl(Go.parts[n]),Vl(Go.fits[e][n])]),r=Us[e]??={...t,fit:{},poses:{},hands:{}};r.fit[n]=s.mask,r.poses[n]=s.pose,r.hands[n]=s.hands,Object.assign(Hl,i),Object.assign(Wl[e]??={},s.parts)}var Hl,Us,Wl,Ho,Xl=xt(()=>{Od();Bd();Hl=Object.create(null),Us=Object.create(null),Wl=Object.create(null),Ho=new Map});var Wo,Nr,qo=xt(()=>{Wo=[{id:"tee",name:"\u77ED\u8896",category:"\u77ED\u8896\u7CFB\u5217",description:"\u7ECF\u5178\u5706\u9886\u77ED\u8896\uFF0C\u9002\u5408\u5927\u9762\u79EF\u6B63\u80F8\u5370\u82B1\u3002"},{id:"crew",name:"\u536B\u8863",category:"\u536B\u8863\u7CFB\u5217",description:"\u5706\u9886\u957F\u8896\u6B3E\uFF0C\u524D\u540E\u8863\u9762\u5747\u53EF\u5B9A\u5236\u3002"},{id:"zip",name:"\u62C9\u94FE\u536B\u8863",category:"\u536B\u8863\u7CFB\u5217",description:"\u524D\u895F\u5E26\u62C9\u94FE\uFF0C\u6B63\u80F8\u5370\u82B1\u4F1A\u4E3A\u62C9\u94FE\u7559\u7A7A\u3002"},{id:"hoodie",name:"\u6234\u5E3D\u536B\u8863",category:"\u536B\u8863\u7CFB\u5217",description:"\u8FDE\u5E3D\u5957\u5934\u6B3E\uFF0C\u524D\u4FA7\u4FDD\u7559\u888B\u9F20\u53E3\u888B\u3002"}],Nr={...Object.fromEntries(Wo.map(({id:n,name:e})=>[n,e])),raglan:"\u63D2\u80A9\u77ED\u8896"}});function Xd(n,{lit:e=!0}={}){let t=new an,i=new Int16Array(Ci(n.p)),s=Float32Array.from(i,a=>a/12e3);t.setAttribute("position",new gt(s,3)),n.uv&&t.setAttribute("uv",new gt(new Float32Array(Ci(n.uv)),2));let r=n.large?Uint32Array:Uint16Array;if(t.setIndex(new gt(new r(Ci(n.i)),1)),!e)return t;if(n.shade){let a=new Uint8Array(Ci(n.shade)),o=new Uint8Array(a.length*3);for(let l=0;l<a.length;l++)o.fill(a[l],l*3,l*3+3);t.setAttribute("color",new gt(o,3,!0))}if(n.n){let a=Float32Array.from(new Int8Array(Ci(n.n)),o=>o/127);t.setAttribute("normal",new gt(a,3))}else{t.computeVertexNormals();let a=t.getAttribute("normal"),o=new Map;for(let l=0;l<a.count;l++){let c=String(i[l*3])+","+i[l*3+1]+","+i[l*3+2];o.has(c)||o.set(c,[]),o.get(c).push(l)}for(let l of o.values()){if(l.length<2)continue;let c=Lt(0,0,0);for(let h of l)c.x+=a.getX(h),c.y+=a.getY(h),c.z+=a.getZ(h);c.normalize();for(let h of l)a.setXYZ(h,c.x,c.y,c.z)}}return t}function jl(n,e,t=!0){let i=new St(Xd(n),e);return i.castShadow=t,i.receiveShadow=!1,i}function Q_(n){let e={};return(t,i)=>{if(!e[t]){let p=Us[t],g=new St(Xd(p,{lit:!1}),Xo),S=g.geometry.getIndex().array,m=g.clone();m.material=Hd,m.renderOrder=0,g.renderOrder=1;let u=new an,v=new St(u,Zl),E=new St(u,Wd);E.renderOrder=0,v.renderOrder=1,e[t]={mesh:g,depth:m,hand:v,handPrepass:E,raw:S,indices:new Map,positions:new Map([["neutral",g.geometry.getAttribute("position")]])},n.add(m,g,E,v)}for(let[p,g]of Object.entries(e))g.mesh.visible=g.depth.visible=p===t,g.hand.visible=g.handPrepass.visible=!1;let{mesh:s,hand:r,handPrepass:a,raw:o,indices:l,positions:c}=e[t],h=Us[t].poses?.[i];if(h&&!c.has(i)){let p=new Int16Array(Ci(h));c.set(i,new gt(Float32Array.from(p,g=>g/12e3),3))}let f=c.get(i)??c.get("neutral");if(s.geometry.setAttribute("position",f),s.geometry.computeBoundingSphere(),!l.has(i)){let p=Us[t].fit[i],g=new Set(p?new Uint32Array(Ci(p)):[]),S=Us[t].hands?.[i],m=S?new Uint32Array(Ci(S)):[],u=new o.constructor(m.length*3);m.forEach((y,A)=>u.set(o.subarray(y*3,y*3+3),A*3)),m.forEach(y=>g.add(y));let v=new o.constructor(o.length-g.size*3),E=0;for(let y=0;y<o.length;y+=3)g.has(y/3)||(v[E++]=o[y],v[E++]=o[y+1],v[E++]=o[y+2]);l.set(i,{body:new gt(v,1),hands:new gt(u,1)})}let d=l.get(i);s.geometry.setIndex(d.body),d.hands.count&&(r.geometry.setAttribute("position",f),r.geometry.setIndex(d.hands),r.geometry.computeBoundingSphere(),r.visible=a.visible=!0)}}function tx(n,e,t,i,s,r){if(!n.matrixWorld.equals(ex))return n;let{position:a,normal:o}=n.geometry.attributes,{array:l}=a,{array:c}=n.geometry.index,h=[],f=(p,g,S,m,u)=>p<m&&g<m&&S<m||p>u&&g>u&&S>u;for(let p=0;p<c.length;p+=3){let g=c[p]*3,S=c[p+1]*3,m=c[p+2]*3;f(l[g+e],l[S+e],l[m+e],t,i)||f(l[g+1],l[S+1],l[m+1],s,r)||h.push(c[p],c[p+1],c[p+2])}let d=new an;return d.setAttribute("position",a),d.setAttribute("normal",o),d.setIndex(new gt(new c.constructor(h),1)),new St(d,n.material)}function jd(n,e,t,i){let s=Fs[t],r=Yl(t),a=r.clone().negate(),o=new Es,l=s.y;t==="sleeve"&&e==="raglan"&&(l-=.075),t==="sleeve"&&!$_.has(e)&&(l-=.143),t==="front"&&e==="hoodie"&&(l+=.038),t==="back"&&e==="hoodie"&&(l=.103);let c=jo(e,t),h=e==="hoodie"?-.146:s.x,f=t==="sleeve"?2:0,d=t==="sleeve"?h:t==="back"?-s.x:s.x,p=tx(n,f,d-s.w/2,d+s.w/2,l-c/2,l+c/2);return(g,S)=>{let m=s.x+(g-.5)*s.w,u=l+(S-.5)*c,v=t==="sleeve"?Lt(2,u,h-(g-.5)*s.w):Lt(t==="back"?-m:m,u,2*r.z);return o.set(v,a),o.intersectObject(p,!1).find(({point:A,normal:T})=>T?.dot(r)>.14&&(t!=="sleeve"||A.x>.295))?.point.addScaledVector(r,i)}}function nx(n,e,t,i){let s=jd(n,e,t,.0035),r=30,a=30,o=[],l=[],c=[],h=[];for(let p=0;p<=a;p++)for(let g=0;g<=r;g++){let S=g/r,m=p/a,u=s(S,m);h.push(!!u),o.push(u?.x??0,u?.y??0,u?.z??0),l.push(S,m)}function f(p,g,S){if(!h[p]||!h[g]||!h[S])return;let m=.075,u=[p,g,S].map(v=>Lt(o[v*3],o[v*3+1],o[v*3+2]));u[0].distanceTo(u[1])>m||u[0].distanceTo(u[2])>m||u[1].distanceTo(u[2])>m||c.push(p,g,S)}for(let p=0;p<a;p++)for(let g=0;g<r;g++){let S=p*(r+1)+g,m=S+1,u=S+r+1,v=u+1;f(S,m,u),f(m,v,u)}let d=new an;return d.setAttribute("position",new yt(o,3)),d.setAttribute("uv",new yt(l,2)),d.setIndex(c),d.computeVertexNormals(),new St(d,i)}function ix(n,e,t,i){let s=jd(n,e,t,.006),r=Fs[t].w,a=jo(e,t),o=e==="zip"&&t==="front"?[[0,Kl[0]],[Kl[1],1]]:[[0,1]],l=[];for(let[f,d]of o){let p=[[f,0],[d,0],[d,1],[f,1],[f,0]],g=s(...p[0]);for(let S=0;S<4;S++){let[m,u]=p[S],[v,E]=p[S+1],y=Math.max(5,Math.ceil((S%2===0?r*(d-f):a)/.04));for(let A=1;A<=y;A++){let T=A/y,b=s(Kt.lerp(m,v,T),Kt.lerp(u,E,T));g&&b&&g.distanceTo(b)<.075&&l.push(g.x,g.y,g.z,b.x,b.y,b.z),g=b}}}if(!l.length)return null;let c=new Ns().setPositions(l),h=new zo(c,i);return h.computeLineDistances(),h.renderOrder=4,h}function rx(n,e="#f1f1f1",t="male"){let i=new Cn,s=qd[n];s.vertexColors=!!zd[n].shade;let r=a=>({...zd[a],...Wl[t][a]});return s.color.set(e),i.add(jl(r(n),s)),n==="zip"&&i.add(jl(r("zipTape"),Kd),jl(r("zipHardware"),sx)),i}function Yd(n,{openEditor:e,closeEditor:t,selectPrint:i,movePrint:s,openPrintEditor:r}){let a=new Io({antialias:!0,alpha:!0,stencil:!0});a.setPixelRatio(Math.min(window.devicePixelRatio,2)),a.setClearColor("#010101",0),a.outputColorSpace=Xt,a.toneMapping=yr,a.toneMappingExposure=1.12,a.domElement.setAttribute("aria-label","\u53EF\u65CB\u8F6C\u7684 3D \u670D\u88C5"),n.append(a.domElement);let o=new ir,l=new jt(34,1,.1,25),c=new Fo(l,n);c.minDistance=.7,c.maxDistance=15,c.minPolarAngle=.08,c.maxPolarAngle=Math.PI-.08,c.rotateSpeed=.72,c.panSpeed=.86,c.zoomSpeed=.84;let h=new Cn;o.add(h);let f=new fr("#ffffff","#747474",1.54),d=new gr("#fff9f4",65,0,.42,.64,2),p=new Ms("#f5f7ff",.9);p.position.set(2,1,4);let g=new Ms("#ffffff",1.24);g.position.set(2,3,-3),o.add(f,d,d.target,p,g);let S=new Cn;h.add(S);let m=Q_(S),u=matchMedia("(prefers-reduced-motion: reduce)"),v=new Ds({color:"#ff57a0",linewidth:2.75,dashed:!0,dashSize:.024,gapSize:.016,transparent:!0,depthWrite:!1,toneMapped:!1}),E=new Map,y,A,T="tee",b,w,F=0,P,I,k,W=!1,R=!1,H,j=0,z=0,ie=n.parentElement,q=Lt(0,.335,0),ee=1450,ne=2450,Te=Lt(-3.7,2.7,1.7),Fe=Lt(-3,3,4.1),Y=Object.fromEntries(Object.keys(ri).map(Q=>{let G=document.createElement("canvas");G.width=G.height=768;let ue=new or(G);ue.colorSpace=Xt,ue.anisotropy=Math.min(8,a.capabilities.getMaxAnisotropy());let de=new Gi({map:ue,transparent:!0,alphaTest:.025,depthWrite:!1,roughness:.94,side:bn}),ve=G.getContext("2d",{willReadFrequently:!0});return[Q,{canvas:G,ctx:ve,texture:ue,mat:de,mesh:null}]}));function be(Q){F=0;let G=k===void 0||u.matches?1:Math.min(1,(Q-k)/ee),ue=Kt.smoothstep(G,.06,.96),de=1-(1-G)**3;if(f.intensity=.13+.96*ue,d.intensity=7+56*ue,d.position.copy(Te).lerp(Fe,de).add(q),d.target.position.copy(q),p.intensity=.16+.52*ue,g.intensity=.18+.96*ue,a.toneMappingExposure=.64+.5*ue,R){let ve=Kt.smoothstep((Q-k)/ne,0,1),M=Kt.lerp(-.27,.13,ve),_=Kt.lerp(.105,.039,ve);ge(Lt(Math.sin(M),_,Math.cos(M)),Re()),R=ve<1}Xo.color.set(document.documentElement.dataset.theme==="dark"?"#f1f1f1":"#010101"),Zl.color.copy(Xo.color),a.render(o,l),(G<1||R)&&_e()}function _e(){F||(F=requestAnimationFrame(be))}c.addEventListener("change",_e),c.addEventListener("start",()=>{R=!1}),u.addEventListener("change",Q=>{Q.matches&&(R=!1),_e()}),new MutationObserver(_e).observe(document.documentElement,{attributes:!0,attributeFilter:["data-theme"]});function Re(){if(!w)return 3.35;let Q=w.getSize(new N),G=Math.max(.25,l.aspect),ue=Math.tan(Kt.degToRad(l.fov*.5)),de=Q.y*.68/ue,ve=Math.max(Q.x,Q.z)*.64/(ue*G);return Math.max(2.76,de,ve)+Q.z*.47}function ge(Q,G){c.target.copy(q),l.position.copy(c.target).addScaledVector(Q.normalize(),G),c.update()}function Oe(){if(W||!b)return;let Q=l.position.clone().sub(c.target);H=Re(),ge(Q.lengthSq()>.01?Q:Lt(.36,.11,3),H)}function dt(){W=!1,R=!1,H=Re(),ge(Lt(.36,.11,3),H),_e()}function Ie(){let{width:Q,height:G}=n.getBoundingClientRect();if(!Q||!G)return;let{clientWidth:ue,clientHeight:de}=ie;if((ue!==j||de!==z)&&(a.setSize(ue,de,!1),j=ue,z=de),l.aspect=Q/G,l.updateProjectionMatrix(),W&&H){let ve=Re(),M=l.position.clone().sub(c.target);l.position.copy(c.target).addScaledVector(M,ve/H),H=ve,c.update()}else Oe();F&&cancelAnimationFrame(F),be(performance.now())}let Je=new ResizeObserver(Ie);Je.observe(ie),Je.observe(n);function tt(Q,G,ue="male"){D(),ft(),E.clear(),n.classList.remove("print-hover"),T=Q,m(ue,T);let de=!b;b&&(h.remove(b),b.traverse(ve=>ve.geometry?.dispose())),b=rx(T,G,ue),h.add(b),b.updateWorldMatrix(!0,!0),w=new rn().setFromObject(b),w.getCenter(q);for(let ve of Object.values(Y))ve.mesh=null;de?(k=performance.now(),dt(),R=!u.matches,R&&ge(Lt(-.27,.105,1),H)):Oe(),_e()}function We(Q){qd[T].color.set(Q),_e()}function ft(){clearTimeout(A),y&&(y.visible=!1,y=null,_e())}function mt(Q){if(!b||!Object.hasOwn(Fs,Q))return;if(ft(),!E.has(Q)){let _=ix(b.children[0],T,Q,v);if(!_)return;E.set(Q,_),b.add(_)}let G=E.get(Q),ue=185,de=5;if(y=G,G.visible=!0,_e(),u.matches){A=setTimeout(ft,ue*(de*2-1));return}let ve=0;function M(){if(ve++,ve===de*2-1){ft();return}G.visible=ve%2===0,_e(),A=setTimeout(M,ue)}A=setTimeout(M,ue)}function kt(Q,G){let ue=Y[Q];if(!ue.mesh){if(!G?.image)return;ue.mesh=nx(b.children[0],T,Q,ue.mat),ue.mesh.renderOrder=Q==="chest"?3:2,b.add(ue.mesh)}let{canvas:de,ctx:ve,texture:M,mesh:_}=ue,U=de.width;if(ve.clearRect(0,0,U,U),_.visible=!!G?.image,_.visible){let{image:te,scale:Z,x:re,y:oe}=G,K=te.naturalWidth||te.width,J=te.naturalHeight||te.height,ce=Fs[Q].w/jo(T,Q),C=Math.min(U*.82/(K/ce),U*.82/J)*Z,$=K/ce*C,X=J*C;if(ve.drawImage(te,U*(.5+re/100)-$/2,U*(.5+oe/100)-X/2,$,X),T==="zip"&&Q==="front"){let[le,ae]=Kl;ve.clearRect(U*le,0,U*(ae-le),U)}}_.visible||n.classList.remove("print-hover"),M.needsUpdate=!0,_e()}function ct(Q){R=!1;let G=W?Math.max(c.getDistance(),.7):Re();ge(Lt(-Math.sin(Q),.029,Math.cos(Q)),G)}let Dt=new Es,st=new Set,Zt=["chest","front","back","sleeve"];function zt({clientX:Q,clientY:G}){let ue=n.getBoundingClientRect();l.updateMatrixWorld(),h.updateMatrixWorld(!0),Dt.setFromCamera(new De(2*(Q-ue.left)/ue.width-1,1-2*(G-ue.top)/ue.height),l)}function $t(Q){if(!b||!Zt.some(ue=>Y[ue].mesh?.visible))return null;zt(Q);let G;for(let ue of Zt){let{canvas:de,ctx:ve,mesh:M,mat:_}=Y[ue];if(!M?.visible||Dt.ray.direction.dot(Yl(ue))>=0)continue;let U=Dt.intersectObject(M,!1)[0];if(!U?.uv)continue;let te=de.width,Z=Kt.clamp(Math.floor(U.uv.x*te),0,te-1),re=Kt.clamp(Math.floor((1-U.uv.y)*te),0,te-1);if(!(ve.getImageData(Z,re,1,1).data[3]/255<_.alphaTest)&&(G??=Dt.intersectObject(b.children[0],!1)[0]?.distance??1/0,U.distance<=G+.001))return{zone:ue,point:U.point}}return null}function D(){if(!I)return;let{id:Q}=I;I=null,c.enabled=!0,n.classList.remove("print-dragging"),n.hasPointerCapture(Q)&&n.releasePointerCapture(Q)}n.addEventListener("pointerdown",Q=>{if(I){Q.stopImmediatePropagation();return}if(st.size||Q.button!==0||!Q.isPrimary)return;let G=$t(Q);if(!G)return;let ue=i(G.zone);if(!ue)return;Q.stopImmediatePropagation(),R=!1,c.enabled=!1;let de=Yl(G.zone);I={id:Q.pointerId,zone:G.zone,position:ue,point:G.point,clientX:Q.clientX,clientY:Q.clientY,moved:!1,plane:new tn().setFromNormalAndCoplanarPoint(de,G.point),across:Lt(0,1,0).cross(de)},n.setPointerCapture(Q.pointerId),n.classList.add("print-dragging")},!0),n.addEventListener("pointermove",Q=>{if(I?.id===Q.pointerId){let G=I;if(!G.moved&&Math.hypot(Q.clientX-G.clientX,Q.clientY-G.clientY)<4)return;G.moved=!0,zt(Q);let ue=Dt.ray.intersectPlane(G.plane,new N);if(!ue)return;let de=ue.sub(G.point);s(G.zone,{x:G.position.x+100*de.dot(G.across)/Fs[G.zone].w,y:G.position.y-100*de.y/jo(T,G.zone)})}else!I&&!st.size&&Q.pointerType==="mouse"&&n.classList.toggle("print-hover",!!$t(Q))});for(let Q of["pointerup","pointercancel","lostpointercapture"])n.addEventListener(Q,G=>{if(I?.id!==G.pointerId)return;G.stopImmediatePropagation();let ue=Q==="pointerup"&&!I.moved;D(),n.classList.remove("print-hover"),ue&&r()},!0);n.addEventListener("pointerleave",()=>n.classList.remove("print-hover")),n.addEventListener("pointerdown",Q=>{n.classList.remove("print-hover"),st.add(Q.pointerId),st.size===1&&Q.button===0?P={id:Q.pointerId,x:Q.clientX,y:Q.clientY}:P=null,n.classList.add("dragging")}),n.addEventListener("pointermove",Q=>{P?.id===Q.pointerId&&Math.hypot(Q.clientX-P.x,Q.clientY-P.y)>5&&(P=null,W=!0)});function Gt(Q){let G=Q.type==="pointerup"&&P?.id===Q.pointerId;if(st.delete(Q.pointerId),P?.id===Q.pointerId&&(P=null),st.size||n.classList.remove("dragging"),!G||!b)return;zt(Q);let ue=M=>M.visible&&Dt.intersectObject(M,!1).length>0,de=b.children.some(M=>!M.material.transparent&&ue(M)),ve=!de&&S.children.some(M=>M.material.colorWrite&&ue(M));de||ve?e():t()}n.addEventListener("pointerup",Gt),n.addEventListener("pointercancel",Gt),n.addEventListener("lostpointercapture",Q=>{queueMicrotask(()=>Gt(Q))}),n.addEventListener("wheel",()=>{I||(W=!0)},{passive:!0}),n.addEventListener("pointermove",Q=>{st.size&&(Q.buttons&6||st.size>1)&&(W=!0)}),n.addEventListener("keydown",Q=>{if(Q.key==="Enter"||Q.key===" "){Q.preventDefault(),R=!1,e();return}let G={ArrowLeft:[-.16,0],ArrowRight:[.16,0],ArrowUp:[0,-.13],ArrowDown:[0,.13]}[Q.key];if(G){Q.preventDefault(),W=!0,R=!1;let ue=new Si().setFromVector3(l.position.clone().sub(c.target));ue.theta+=G[0],ue.phi=Kt.clamp(ue.phi+G[1],c.minPolarAngle,c.maxPolarAngle),l.position.copy(c.target).add(new N().setFromSpherical(ue)),c.update()}["+","=","-"].includes(Q.key)&&(Q.preventDefault(),W=!0,R=!1,Q.key==="-"?c.dollyOut(.89):c.dollyIn(.89),c.update())});function at(Q){let G=w.getSize(new N),ue=Math.max(G.x,G.y,G.z)*.62,de=new Vi(-ue,ue,ue,-ue,.1,20),ve={back:Lt(-.23,.13,-1),sleeve:Lt(1,.13,.2)}[Q]??Lt(.25,.12,1);de.position.copy(q).addScaledVector(ve.normalize(),4),de.lookAt(q);let M=a.domElement,_=a.getViewport(new Ze),U=Math.min(_.z,_.w),te=a.getPixelRatio(),Z=document.createElement("canvas");Z.width=Z.height=384,S.visible=!1;let re=y?.visible;y&&(y.visible=!1);try{a.setViewport(0,0,U,U),a.render(o,de);let oe=Math.floor(U*te);Z.getContext("2d").drawImage(M,0,M.height-oe,oe,oe,0,0,384,384)}finally{y&&(y.visible=re),S.visible=!0,a.setViewport(_),a.render(o,l)}return Z}return Ie(),{setGarment:tt,setColor:We,updateZone:kt,view:ct,designPreview:at,flashPrintZone:mt}}var Lt,$_,zd,ri,Gd,Vd,Jl,Xo,Hd,Zl,Wd,qd,Ci,Fs,Kl,jo,Yl,ex,Kd,sx,Jd=xt(()=>{Is();Pd();Ol();Fd();Bl();Xl();qo();qo();Lt=(n,e,t)=>new N(n,e,t),$_=new Set(["tee","raglan"]),zd=Hl,ri={front:"\u6B63\u80F8",chest:"\u5DE6\u80F8",back:"\u80CC\u9762",sleeve:"\u8896\u5B50"},Gd=(n,e=.86)=>new Gi({color:n,roughness:e}),Vd={stencilWrite:!0,stencilFunc:hl,stencilRef:0},Jl={stencilWrite:!0,stencilRef:1,stencilZPass:ll},Xo=new zi({...Vd,color:"#010101",transparent:!0,opacity:.15,depthWrite:!1,depthFunc:ms,toneMapped:!1}),Hd=new zi({...Vd,colorWrite:!1,transparent:!0,depthWrite:!0}),Zl=Xo.clone();Zl.stencilWrite=!1;Wd=Hd.clone();Wd.stencilWrite=!1;qd=Object.fromEntries(Object.keys(Nr).map(n=>{let e=Gd("#ffffff",.92);return e.side=bn,e.setValues(Jl),[n,e]})),Ci=n=>typeof n=="string"?(Uint8Array.fromBase64?.(n)??Uint8Array.from(atob(n),e=>e.charCodeAt(0))).buffer:n.buffer;Fs={front:{x:0,y:.47,w:.515,h:.52},chest:{x:.153,y:.646,w:.137,h:.146},back:{x:0,y:.41,w:.54,h:.58},sleeve:{x:-.078,y:.702,w:.155,h:.132}},Kl=[.465,.535],jo=(n,e)=>n==="hoodie"&&e==="back"?.444:Fs[e].h,Yl=n=>n==="sleeve"?Lt(1,0,0):Lt(0,0,n==="back"?-1:1),ex=new it;Kd=Gd("#403e3c",.85),sx=new Gi({color:"#898682",metalness:.51,roughness:.34,...Jl});Kd.setValues(Jl)});function $d(n,e=""){return'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 72" fill="none" stroke="currentColor" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round" '+e+">"+ax[n].map(t=>'<path d="'+t+'"/>').join("")+"</svg>"}var $l,Zd,Ql,ax,Qd=xt(()=>{$l="M11 21C15 24 17 34 17 46V64H47V46C47 34 49 24 53 21M5 64H11C13 59 15 51 17 45M59 64H53C51 59 49 51 47 45M5 64V67Q5 68 6 68H10Q11 68 11 67V64M53 64V67Q53 68 54 68H58Q59 68 59 67V64M17 64V67Q17 69 19 69H45Q47 69 47 67V64",Zd="M5 64C3 46 6 30 11 21C15 15 49 15 53 21C58 30 61 46 59 64",Ql="M24 17C26 21 29 23 32 23C35 23 38 21 40 17",ax={tee:["M12 21C16 15 48 15 52 21L60 38Q60 39 59 40L48 45L47 42V65Q47 67 45 67H19Q17 67 17 65V42L16 45L5 40Q4 39 4 38Z","M12 21C15 23 17 31 17 42M52 21C49 23 47 31 47 42",Ql],crew:[Zd,$l,Ql],zip:[Zd,$l,Ql,"M32 23V69M29 50H24C23 55 22 57 19.5 57.5V60H29ZM35 50H40C41 55 42 57 44.5 57.5V60H35Z"],hoodie:["M5 64C3 46 6 30 11 21Q13 18 17 17C13 9 20 3 32 3C44 3 51 9 47 17Q51 18 53 21C58 30 61 46 59 64",$l,"M32 24C27 24 19 18 19 13C19 8 24 6.5 32 6.5C40 6.5 45 8 45 13C45 18 37 24 32 24ZM27 23V34M37 23V38M27 46H37Q37.5 52 42 53V60H22V53Q26.5 52 27 46Z"]}});function ht(n,e,t){n.fillStyle=e,n.fill(new Path2D(t))}function pt(n,e,t,i){n.strokeStyle=e,n.lineWidth=t,n.lineCap="round",n.lineJoin="round",n.stroke(new Path2D(i))}function Bt(n,e,t,i,s){n.fillStyle=e,n.beginPath(),n.arc(t,i,s,0,Math.PI*2),n.fill()}function ef(n,e,t,i,s,r,a="Georgia,serif"){n.textAlign="center",n.fillStyle=e,n.font=`900 ${r}px ${a}`,n.fillText(t,i,s)}function ox(n){let e="#19362f",t="#619181",i="#e67855",s="#f7e5ae";Bt(n,e,450,410,303),Bt(n,s,450,410,286),Bt(n,e,450,410,264),n.save(),n.clip(new Path2D("M 450 152 A 258 258 0 1 0 450 668 A 258 258 0 1 0 450 152"));let r=["M 127 427 C 203 440 248 349 308 353 C 384 358 367 488 461 486 C 529 484 543 398 612 401 C 676 403 693 454 783 411","M 136 473 C 222 482 245 391 310 396 C 357 400 356 477 398 507 C 447 541 502 522 534 488 C 564 457 587 443 617 445 C 671 446 702 493 779 460","M 152 524 C 220 527 263 430 310 441 C 340 448 341 518 388 544 C 440 573 496 560 540 526 C 572 501 588 488 619 488 C 677 488 713 541 760 508","M 173 578 C 231 567 271 483 307 485 C 324 486 337 542 378 579 C 419 617 494 598 550 564 C 577 546 598 525 630 534 C 673 546 707 578 751 559","M 210 621 C 259 589 283 530 305 532 C 327 534 325 602 388 622 C 456 643 501 625 552 603 C 590 587 608 565 641 581 C 664 593 694 624 723 606","M 236 665 C 273 634 292 577 306 583 C 330 593 340 670 423 675 C 498 680 549 661 594 632 C 622 614 641 622 677 653"];for(let a of r)pt(n,t,9,a);n.restore(),ht(n,s,"M 450 183 L 482 373 L 595 410 L 481 445 L 450 593 L 417 444 L 304 410 L 416 373 Z"),ht(n,i,"M 450 187 L 477 377 L 450 414 L 423 377 Z"),ht(n,t,"M 451 414 L 477 444 L 450 584 L 424 444 Z"),Bt(n,e,450,410,22),ht(n,i,"M 450 59 L 472 114 L 450 139 L 428 114 Z"),ht(n,i,"M 811 410 L 756 432 L 731 410 L 756 388 Z M 89 410 L 144 388 L 169 410 L 144 432 Z"),ht(n,i,"M 450 761 L 428 706 L 450 681 L 472 706 Z")}function cx(n){let e="#30252a",t="#fff0c1",i="#e88650",s="#c84f4b",r="#40656c";ht(n,e,"M 196 711 L 196 352 C 196 204 309 98 450 98 C 591 98 704 204 704 352 L 704 711 Q 704 728 687 728 L 213 728 Q 196 728 196 711 Z");let a="M 216 706 L 216 353 C 216 220 317 119 450 119 C 583 119 684 220 684 353 L 684 706 Z";ht(n,t,a),n.save(),n.clip(new Path2D(a)),Bt(n,i,492,304,116),pt(n,t,7,"M 365 330 H 624 M 375 354 H 615 M 393 377 H 590"),ht(n,s,"M 177 503 L 271 444 L 325 435 L 352 396 L 435 396 L 461 425 L 518 433 L 564 467 L 649 442 L 716 485 L 720 570 L 178 570 Z"),ht(n,i,"M 182 527 L 353 453 L 453 441 L 540 482 L 676 471 L 716 515 L 717 589 L 179 589 Z"),ht(n,e,"M 167 594 C 279 523 376 534 446 582 C 527 638 633 561 733 551 L 733 731 L 167 731 Z"),pt(n,r,13,"M 226 679 C 330 608 388 612 455 652 C 499 676 562 675 621 648 M 344 708 C 399 674 440 690 490 704"),n.restore(),pt(n,e,27,"M 306 614 V 466 M 306 542 H 274 Q 252 542 252 517 V 479 M 306 567 H 331 Q 354 567 354 543 V 514"),pt(n,t,5,"M 303 474 V 558 M 258 482 V 511 M 347 519 V 543"),ht(n,r,"M 619 547 L 629 581 L 666 591 L 629 599 L 619 636 L 609 600 L 574 591 L 610 582 Z")}function lx(n){let e="#35243e",t="#8c6a9d",i="#e28b90",s="#f3c670",r="#fff0ce",a=[["M 443 427 C 371 270 259 153 122 156 C 81 157 80 225 107 294 C 132 359 177 429 246 456 C 290 473 352 464 427 445 Z",t],["M 433 428 C 366 411 254 411 207 466 C 174 504 185 578 231 609 C 274 638 341 621 393 555 C 419 519 425 480 444 451 Z",i],["M 414 420 C 329 313 231 207 125 175 C 127 246 158 312 221 361 C 278 405 352 413 414 420 Z",e],["M 416 462 C 348 477 243 472 212 521 C 239 570 293 583 341 550 C 376 525 393 498 416 462 Z",e]];for(let o of[!1,!0]){n.save(),o&&(n.translate(900,0),n.scale(-1,1));for(let[l,c]of a)ht(n,c,l);pt(n,r,7,"M 391 407 C 329 367 232 316 171 221 M 413 455 C 361 465 300 509 247 546"),pt(n,s,8,"M 186 316 Q 226 340 259 339 M 256 484 Q 285 477 312 492"),Bt(n,s,281,383,28),Bt(n,e,281,383,13),Bt(n,r,246,365,9),Bt(n,r,317,396,7),Bt(n,s,298,549,17),pt(n,e,9,"M 444 402 Q 424 365 405 347"),Bt(n,e,402,344,8),n.restore()}ht(n,e,"M 450 372 C 471 377 479 401 474 452 C 469 511 458 557 450 582 C 442 557 431 511 426 452 C 421 401 429 377 450 372 Z"),pt(n,s,7,"M 447 417 Q 463 419 472 411 M 443 449 Q 458 451 471 443 M 442 479 Q 455 481 467 474 M 449 300 V 280 M 449 652 V 680"),ht(n,s,"M 450 189 L 465 225 L 500 241 L 464 252 L 450 286 L 436 251 L 400 241 L 436 226 Z M 450 592 L 459 613 L 482 621 L 460 630 L 450 650 L 441 630 L 419 621 L 441 613 Z")}function hx(n){let e="#25493d",t="#72986c",i="#c8404d",s="#ed706a",r="#f7d98f",a="#532f37";pt(n,e,16,"M 436 705 C 442 587 403 464 340 405 M 472 696 C 468 501 488 411 545 299 M 461 703 C 483 618 521 537 615 480 M 438 699 C 406 596 366 526 278 539"),ht(n,t,"M 436 631 C 364 625 327 594 314 558 C 380 548 428 576 436 631 Z M 477 594 C 495 543 530 521 580 520 C 572 578 531 605 477 594 Z M 463 518 C 423 471 424 433 441 402 C 478 430 492 478 463 518 Z M 498 439 C 526 392 563 376 602 382 C 590 429 543 451 498 439 Z"),pt(n,e,5,"M 326 565 L 420 615 M 563 532 L 492 585 M 443 423 Q 449 451 460 494 M 583 394 L 514 430");for(let[o,l,c,h]of[[340,324,.89,-.16],[552,237,1,.19],[623,445,.69,.15]]){n.save(),n.translate(o,l),n.rotate(h),n.scale(c,c),ht(n,i,"M 0 100 C -64 121 -128 66 -123 6 C -126 -44 -85 -89 -38 -63 C -6 -116 64 -108 84 -54 C 137 -54 147 15 116 60 C 90 105 32 119 0 100 Z"),ht(n,s,"M 0 91 C -54 72 -74 27 -54 -2 C -40 -34 -7 -39 10 -17 C 41 -64 109 -54 112 -11 C 122 36 58 64 0 91 Z"),ht(n,r,"M -35 25 Q -22 4 5 2 Q 38 4 53 26 Q 35 54 1 51 Q -26 49 -35 25 Z"),Bt(n,a,5,27,19);for(let[f,d]of[[-23,19],[-14,42],[29,45],[40,22],[19,8]])Bt(n,a,f,d,4);n.restore()}ht(n,i,"M 277 548 Q 218 548 215 503 Q 257 478 281 513 Q 296 532 277 548 Z"),pt(n,r,11,"M 413 658 Q 449 678 482 660 M 423 678 Q 447 688 482 677")}function ux(n){let e="#253e54",t="#468d8a",i="#f7dead",s="#df7252";pt(n,t,10,"M 170 386 C 172 230 302 123 453 141 M 730 435 C 728 590 598 697 447 679 M 210 609 Q 240 643 279 665 M 690 211 Q 660 177 621 155"),Bt(n,t,161,441,11),Bt(n,t,739,379,11);for(let r of[!1,!0]){n.save(),r&&(n.translate(900,820),n.rotate(Math.PI));let a=r?s:e,o=r?i:t;ht(n,a,"M 376 236 C 454 180 568 194 627 262 C 689 336 633 438 548 468 C 483 490 425 479 417 442 C 410 415 446 394 491 375 C 554 348 558 308 520 284 C 487 263 444 267 404 301 C 410 275 409 261 376 236 Z"),ht(n,a,"M 408 256 C 346 250 277 239 246 183 C 290 201 306 167 328 145 C 337 185 367 209 408 256 Z M 403 284 C 327 288 304 324 270 354 C 328 349 373 330 403 284 Z"),ht(n,a,"M 561 299 C 581 272 594 252 623 244 Q 625 268 601 310 Z M 566 363 C 589 360 624 371 638 405 Q 598 406 551 395 Z"),pt(n,o,10,"M 432 248 C 503 224 580 247 604 302 C 641 375 519 422 490 432"),pt(n,o,7,"M 462 270 q 26 17 52 2 M 509 274 q 25 24 57 18 M 544 298 q 16 21 56 28 M 556 328 q 9 20 29 27 M 526 366 q 21 13 27 29"),Bt(n,i,448,441,10),Bt(n,e,448,441,4),n.restore()}}function dx(n){let e="#273c52",t="#c64f42",i="#f6dfae",s="#79a099";ef(n,e,"HIGH ROUTE",450,180,100),pt(n,t,12,"M 214 205 H 686"),n.save(),n.translate(453,432),n.rotate(-.48),pt(n,e,54,"M -115 -45 L -115 105 C -115 167 -63 202 0 202 C 63 202 115 157 115 106 L 115 8 C 115 -30 80 -55 39 -55 C 13 -55 -14 -46 -38 -28 L -115 21"),pt(n,i,13,"M -115 33 L -115 106 C -115 165 -64 196 0 196 C 63 196 112 151 112 106 L 112 12"),pt(n,t,50,"M -115 -45 L -115 23"),pt(n,i,6,"M -126 -40 V -8 M -116 -40 V -7 M -106 -40 V -8"),pt(n,s,17,"M 115 51 C 161 70 171 103 161 137 C 148 180 191 210 232 192"),pt(n,i,4,"M 121 56 C 164 78 164 109 157 134"),n.restore(),ht(n,t,"M 222 395 L 236 433 L 273 447 L 237 461 L 222 499 L 209 462 L 172 447 L 208 433 Z M 683 313 L 693 337 L 716 345 L 692 354 L 683 377 L 675 354 L 651 345 L 675 336 Z"),ef(n,e,"ON BELAY",450,739,44,"monospace")}var tf,nf=xt(()=>{tf={compass:{label:"\u7B49\u9AD8\u7EBF\u7F57\u76D8",name:"\u7B49\u9AD8\u7EBF\u7F57\u76D8",draw:ox},desert:{label:"\u6C99\u6F20\u62F1\u7A97",name:"\u6C99\u6F20\u62F1\u7A97",draw:cx},moth:{label:"\u66AE\u5149\u98DE\u86FE",name:"\u66AE\u5149\u98DE\u86FE",draw:lx},poppy:{label:"\u65F7\u91CE\u865E\u7F8E\u4EBA",name:"\u65F7\u91CE\u865E\u7F8E\u4EBA",draw:hx},koi:{label:"\u53CC\u9CA4\u56DE\u6E38",name:"\u53CC\u9CA4\u56DE\u6E38",draw:ux},belay:{label:"\u6500\u5CA9\u4FF1\u4E50\u90E8",name:"HIGH ROUTE \xB7 \u6500\u5CA9\u4FF1\u4E50\u90E8",draw:dx}}});function It(n,e,t,i="nonzero"){n.fillStyle=t,n.fill(new Path2D(e),i)}function Ri(n,e,t,i){n.strokeStyle=t,n.lineWidth=i,n.lineCap="round",n.lineJoin="round",n.stroke(new Path2D(e))}function Os(n,e,t,i,s){n.beginPath(),n.arc(e,t,i,0,2*Math.PI),n.fillStyle=s,n.fill()}function Ko(n,e,t,i,s,r,a){n.font=`850 ${s}px system-ui,sans-serif`,n.textAlign="center",n.fillStyle=r,n.fillText(e,t,i,a)}var sf,rf=xt(()=>{sf={"night-cat":{label:"\u591C\u884C\u732B\u6807",name:"\u591C\u884C\u732B\u6807",draw(n){let e="#271e35",t="#e9639b",i="#fbebcd",s="M193 414 154 339 165 122 316 250 Q450 207 584 250 L735 122 746 339 707 414 731 473 667 513 664 566 527 645 450 691 373 645 236 566 233 513 169 473 Z";It(n,s,e),Ri(n,s,t,17),It(n,"M190 311 198 192 288 270 242 291 Z M710 311 702 192 612 270 658 291 Z",t),It(n,"M243 373 Q303 343 390 422 Q305 435 243 373 Z M657 373 Q597 343 510 422 Q595 435 657 373 Z",i),It(n,"M312 376 325 395 319 418 308 401 Z M588 376 575 395 581 418 592 401 Z",e),It(n,"M470 404 422 474 488 468 425 617 446 513 393 518 450 404 Z",t),Ri(n,"M199 532 263 527 M215 570 279 557 M701 532 637 527 M685 570 621 557",i,12),It(n,"M99 275 111 299 135 311 111 323 99 347 87 323 63 311 87 299 Z M801 275 813 299 837 311 813 323 801 347 789 323 765 311 789 299 Z",t)}},"turn-nine":{label:"\u4E5D\u53F7\u5F2F\u9053",name:"\u4E5D\u53F7\u5F2F\u9053",draw(n){let e="#242c62",t="#e34633",i="#fff0d7";n.save(),n.translate(450,410),n.rotate(-.1),n.translate(-450,-410),It(n,"M100 283 H270 L235 322 H76 Z M117 352 H237 L202 391 H90 Z M157 421 H225 L187 461 H133 Z",t),It(n,"M328 126 H693 L779 219 717 434 505 656 H299 L492 437 H301 L254 376 291 223 Z M405 241 379 344 H600 L630 241 Z",e,"evenodd"),It(n,"M654 163 H704 L750 220 701 383 584 507 679 371 721 226 Z",t),It(n,"M331 531 H426 L363 605 H284 Z",i),Ko(n,"TURN NINE",527,723,68,t,499),n.restore()}},"side-a":{label:"\u7235\u58EB\u9ED1\u80F6",name:"\u7235\u58EB\u9ED1\u80F6",draw(n){let e="#242845",t="#e27838",i="#29717d",s="#f1d8ab";It(n,"M151 453 312 170 712 194 688 601 430 707 100 649 Z",t),It(n,"M534 200 742 168 791 487 680 571 Z",i),Os(n,422,408,259,e),n.strokeStyle=s,n.lineWidth=6;for(let r of[114,144,177,210,236])n.beginPath(),n.arc(422,408,r,.66,1.35),n.stroke(),n.beginPath(),n.arc(422,408,r,3.8,4.49),n.stroke();Os(n,422,408,91,s),Ri(n,"M363 404 H481 M370 430 H474",t,11),Os(n,422,408,15,e),Ri(n,"M721 305 752 257 M750 339 804 327 M722 373 756 410",e,16),Ko(n,"SIDE A",692,664,64,e,205)}},"check-bloom":{label:"\u68CB\u683C\u82B1\u6735",name:"\u68CB\u683C\u82B1\u6735",draw(n){let e="#29243d",t="#e49cb2",i="#f4b547",s=new Path2D;for(let r=0;r<=160;r++){let a=r*Math.PI/80,o=252+57*Math.cos(a*8),l=450+Math.cos(a)*o,c=407+Math.sin(a)*o;r===0?s.moveTo(l,c):s.lineTo(l,c)}s.closePath(),n.save(),n.clip(s),n.fillStyle=t,n.fillRect(130,88,640,640),n.fillStyle=e;for(let r=0;r<9;r++)for(let a=0;a<9;a++)(r+a)%2===0&&n.fillRect(126+a*72,83+r*72,72,72);n.restore(),n.strokeStyle=e,n.lineWidth=15,n.stroke(s),Os(n,450,407,135,e),Os(n,450,407,120,i),Ri(n,"M410 375 V403 M490 375 V403 M400 443 Q450 490 500 443",e,15)}},"no-signal":{label:"\u5931\u53BB\u8BAF\u53F7",name:"\u5931\u53BB\u8BAF\u53F7",draw(n){let e="#23242c",t="#d4e451",i="#fff4da";It(n,"M124 230 199 145 H769 L806 190 V549 L711 664 H146 L94 611 V306 Z",e),Ri(n,"M139 298 V247 L223 173 H739 L773 208 V528 L692 630 H164 L125 590",t,12),It(n,"M162 258 H276 L240 291 H162 Z M586 580 H712 L676 611 H550 Z",t),Ko(n,"NO",456,412,205,i,470),Ko(n,"SIGNAL",450,537,137,i,565),Ri(n,"M191 550 H584",t,10),Ri(n,"M201 566 H487",t,6),It(n,"M690 259 H727 V332 H690 Z M659 293 H758 V315 H659 Z M683 379 H733 V404 H683 Z",t)}},gridworks:{label:"\u7F51\u683C\u5DE5\u574A",name:"\u7F51\u683C\u5DE5\u574A",draw(n){let e="#1e5260",t="#3b9a86",i="#ee8365";n.save(),n.translate(450,412);for(let s=0;s<4;s++)It(n,"M-49 -348 H112 L236 -224 111 -99 57 -152 127 -222 75 -275 H-49 Z",e),It(n,"M-114 -318 H-63 V-250 H63 L88 -224 35 -171 H-114 Z",t),n.rotate(Math.PI/2);n.restore(),It(n,"M450 283 580 412 450 541 320 412 Z M450 365 402 412 450 459 498 412 Z",i,"evenodd"),Os(n,450,412,20,e)}}}});function eh(n,e=900){let t=Yo[n],i=document.createElement("canvas");i.width=e,i.height=Math.round(e*820/900);let s=i.getContext("2d");return s.scale(i.width/900,i.height/820),t.draw?t.draw(s):fx(s,n,t),i}function fx(n,e,t){let i=1709,s=()=>(i=Math.imul(i,1664525)+1013904223>>>0,i/4294967296),[r,a,o]=t.colors;function l(h,f){n.fillStyle=f,n.beginPath(),h.forEach(([d,p],g)=>g?n.lineTo(d,p):n.moveTo(d,p)),n.closePath(),n.fill()}function c(h,f,d,p){n.fillStyle=p,n.beginPath(),n.arc(h,f,d,0,Math.PI*2),n.fill()}if(n.textAlign="center",n.fillStyle=r,n.font="900 108px Georgia, serif",n.fillText(t.title,450,124,840),e==="summit"){c(473,365,189,a),l([[24,581],[143,463],[220,484],[308,382],[397,487],[500,342],[546,309],[613,420],[652,399],[745,509],[780,486],[876,562],[876,731],[24,731]],r),l([[191,553],[308,382],[397,487],[367,470],[331,454],[313,477],[324,418],[274,469]],"#efdfbf"),l([[395,538],[500,342],[546,309],[613,420],[652,399],[745,509],[677,463],[605,449],[573,407],[572,454],[532,373],[504,417],[522,415],[480,482],[487,444]],"#efdfbf"),l([[40,685],[164,548],[286,606],[382,553],[500,607],[668,502],[751,567],[876,610],[876,731],[24,731]],o);for(let h=0;h<46;h++){let f=27+s()*838,d=656+s()*73,p=42+s()*115;l([[f-13,d],[f-7,d-21],[f-12,d-23],[f-6,d-38],[f-8,d-42],[f,d-p],[f+9,d-42],[f+6,d-39],[f+12,d-23],[f+7,d-19],[f+13,d]],r)}}else if(e==="orbit"){c(450,443,230,a),c(450,443,194,r),c(408,408,145,o),c(464,368,151,r),n.strokeStyle=a,n.lineWidth=16,n.beginPath(),n.ellipse(450,446,344,91,-.43,0,Math.PI*2),n.stroke();for(let h=0;h<32;h++)c(65+s()*770,185+s()*498,2+s()*7,h%2?o:a)}else{c(509,370,194,a);for(let h=0;h<7;h++){n.beginPath();for(let f=24;f<=876;f+=4){let d=450+h*35+(35-h*2)*Math.sin(f/116+h*.37)+10*Math.cos(f/58+h*.32);f===24?n.moveTo(f,d):n.lineTo(f,d)}n.strokeStyle=h%2?o:r,n.lineWidth=17+h*.65,n.stroke()}}n.font="700 28px monospace",n.fillStyle=r,n.fillText(t.caption,450,785,840),n.globalCompositeOperation="destination-out",n.fillStyle="rgba(0,0,0,.23)";for(let h=0;h<16e3;h++)n.fillRect(s()*900,s()*820,s()*3,s()*3)}var Yo,af=xt(()=>{nf();rf();Yo={summit:{label:"\u5C71\u91CE\u65E5\u843D",name:"WEEKEND CLUB \xB7 \u5C71\u91CE\u65E5\u843D",title:"WEEKEND CLUB",caption:"TRAILS \u2022 EST. 1987",colors:["#323b32","#c25f49","#697167"]},orbit:{label:"\u592A\u7A7A\u8F68\u9053",name:"AFTER HOURS \xB7 \u8F68\u9053",title:"AFTER HOURS",caption:"FREQUENCY / 028",colors:["#282f47","#a28aca","#ebae7e"]},coast:{label:"\u6F6E\u6C50\u6D77\u5CB8",name:"TIDAL CLUB \xB7 \u6D77\u5CB8",title:"TIDAL CLUB",caption:"PACIFIC / 039",colors:["#214454","#d48550","#548893"]},...tf,...sf}});function th(n,e=""){let t=n.trim(),i=e.trim(),s="",r=!!i;if(i)s=i;else{let l=t.match(_x),c=t.match(px),h=t.match(gx),f=t.match(bx);l?(i=l[1],s=l[0],r=!0):c&&(mx.test(t)||c[0]===t)?(i=c[1],s=c[0]):h?(i=h[2].includes("\u5B57\u6BCD")?h[1].replace(/\s+/gu,""):h[1],s=h[0]):f&&(i=f[1]??f[2],s=f[0])}if(!i)return null;let a=(r?i.split(/[\n\r，,、；;]+/u):[i]).map(l=>l.trim()).filter(Boolean);if(!a.length)return null;if(a.length>48)return{error:"\u4E00\u5F20\u5370\u82B1\u6700\u591A\u6392 48 \u4E2A\u540D\u5B57\uFF0C\u8BF7\u5206\u6210\u4E24\u7EC4\u3002"};if(a.some(l=>[...l].length>48))return{error:"\u6BCF\u4E2A\u540D\u5B57\u6700\u591A 48 \u4E2A\u5B57\u7B26\u3002"};let o=t.replace(s,"").trim();return{lines:a,direction:o,mode:xx.test(o)?"graphic-with-lettering":"lettering"}}var px,mx,gx,bx,_x,xx,of=xt(()=>{px=/[「『“"]([^」』”"\n]+)[」』”"]/u,mx=/文字|字母|字样|字标|词语|姓名|名字|人名|名单|艺术字|字体|排版|(?:写|印|加|刻|标)(?:着|上|在|出)|写成|拼成/u,gx=/([A-Za-z0-9][A-Za-z0-9_.-]*(?:[ \t]+[A-Za-z0-9]){0,12})\s*(?:这\s*)?[一二两三四五六七八九十\d]+\s*(?:个\s*)?(英文字母|字母|汉字|字)(?=$|[\s，。,.、；;）)]|并|再|配|和|加|的|来|做|组|拼|排|写|用|设|印|变)/u,bx=/(?:写上|写出|印上|印出|画出|加上|刻上|排成)\s*([A-Za-z0-9][A-Za-z0-9_.-]*)(?=$|[\s，。,.、；;]|的|三|两|字)|([A-Za-z0-9][A-Za-z0-9_.-]*)\s*(?:艺术字|字标|字样|字体)/u,_x=/(?:名单|姓名|人名|名字)(?:如下|为)?\s*[:：]\s*([^。！？!?]+)/u,xx=/插画|图形|图标|剪影|徽章|盾牌|吉祥物|小图|边框|配图|(?:背景|周围|四周)(?:有|加|画|是)|绘制|配上|搭配|猫|狗|鲤|鲸|龙|虎|狮|花朵|花卉|山脉|月亮|太阳|星星|火焰|闪电|波浪|猫头鹰|(?:illustration|mascot|badge|cat|tiger|mountain|flower|lightning)\b/iu});function Jo(){return Mx??=document.fonts.load('24px "Sedgwick Ave"',"lwj").catch(()=>[])}function ff(n=1,e=1){let t=document.createElement("canvas");return t.width=n,t.height=e,t}function hf(n){let e=n.slice(1).match(/../g).map(t=>{let i=parseInt(t,16)/255;return i<=.04045?i/12.92:((i+.055)/1.055)**2.4});return .2126*e[0]+.7152*e[1]+.0722*e[2]}function Yi(n,e){let t=hf(n),i=hf(e);return(Math.max(t,i)+.05)/(Math.min(t,i)+.05)}function Ji(n){return typeof n=="string"&&/^#[0-9a-f]{6}$/i.test(n)}function wx(n,e,t){let i=Ji(e)?e:"#f1f1f1",s="#101014",r="#fafafa",a=Yi(s,i)>Yi(r,i)?s:r,o=[n?.color,n?.accent].find(c=>Ji(c)&&Yi(c,i)>=4.5)??a,l=t&&Ji(n?.accent)&&Yi(n.accent,o)>=2&&Yi(n.accent,i)>=3?n.accent:null;return{fill:o,accent:l}}function Ex(n,e){let t=e<=5?1:e<=16?2:e<=30?3:4,i=Object.hasOwn(lf,n)?lf[n]:t;return Math.min(e,i)}function uf(n,e,t){let i=0,s=0,r=0;for(let a of e){let o=n.measureText(a);i=Math.max(i,o.width,2*o.actualBoundingBoxLeft,2*o.actualBoundingBoxRight),s=Math.max(s,o.actualBoundingBoxAscent),r=Math.max(r,o.actualBoundingBoxDescent)}return{width:i,ascent:s,descent:r,height:Math.max(s+r,t*.8)}}function Tx(n){let e=n.match(/#[\da-f]{6}\b/i);if(e)return e[0];let t=n.match(/珊瑚红|海军蓝|深蓝|荧光绿|薄荷绿|(?:蓝|粉|紫|橙|黑|白|红|黄|绿)(?=色)/u);return Sx[t?.[0]]}function Ax(n,e,t,i,s,r,a,o,l,c){let h=Yi("#11111b",o)>Yi("#fff4de",o)?"#11111b":"#fff4de",f=s*r.depth;n.strokeStyle=h,n.lineWidth=s*(r.stroke+.04),n.strokeText(e,t+f*.58,i+f),f>s*.032&&(n.strokeStyle=Ji(c)?c:r.edge,n.lineWidth=s*r.stroke,n.strokeText(e,t+f*.58,i+f*.73)),n.strokeStyle=h,n.lineWidth=s*(r.stroke+.027),n.strokeText(e,t,i),n.strokeStyle=l==="sticker"?r.flash:r.edge,n.lineWidth=s*r.stroke*.71,n.strokeText(e,t,i),n.fillStyle=a,n.fillText(e,t,i)}function Cx(n,{width:e,height:t},i,s,r){let a=Ji(r)?r:s.fill;if(n.strokeStyle=a,n.fillStyle=a,n.lineCap="round",n.lineWidth=Math.max(3,t*.016),i==="spray"||i==="drip"){for(let o=0;o<24;o++){let l=o%2===0,c=(l?.08:.92)*e+Math.sin(o*5.23)*e*.043,h=(l?.75:.24)*t+Math.cos(o*3.55)*t*.086;n.globalAlpha=.24+o%5*.105,n.beginPath(),n.arc(c,h,.8+o%4*.75,0,Math.PI*2),n.fill()}n.globalAlpha=1}if(i==="marker"||i==="drip"){let o=t*.91;n.beginPath(),n.moveTo(e*.22,o+t*.022),n.quadraticCurveTo(e*.58,o-t*.05,e*.8,o),n.stroke()}}function Rx({lines:n,layout:e,style:t,garmentColor:i,direction:s}){let r=ff(),a=r.getContext("2d"),o=t?.font,c=yx.find(([,j])=>j.test(s))?.[0]??(Object.hasOwn(cf,t?.treatment)?t.treatment:"bubble"),h=n.length<=4&&!/极简|正楷|朴素|简洁纯文字/u.test(s),f=cf[c],d=h?vx:Object.hasOwn(nh,o)?nh[o]:nh.sans,p=h||t?.weight===400?400:700,g=Ex(e,n.length),S=Math.ceil(n.length/g),m=h?68:Bs,u=(df-2*m-ih*(g-1))/g,v=n.length===1?270:g===1?138:g===2?108:84,E=1.45;a.textAlign="center",a.font=`${p} 100px ${d}`;let y=uf(a,n,100),A=(S-1)*100*E+y.height,T=Math.max(1,Math.floor(Math.min(v,u*100/(y.width+8.5),1260*100/A))),b=`${p} ${T}px ${d}`;a.font=b;let w=uf(a,n,T),F=Math.ceil(w.width+T*.085),P=w.height+(S-1)*T*E;r.width=F*g+ih*(g-1)+2*m,r.height=Math.ceil(P+2*m),a.font=b,a.textAlign="center",a.textBaseline="alphabetic",a.lineJoin="round";let{fill:I,accent:k}=wx(t,i,n.length<=5);k&&(a.strokeStyle=k,a.lineWidth=Math.max(1,Math.min(6,T*.025))),a.fillStyle=I;let W=Ji(i)?i:"#f1f1f1",R=Tx(s)??(Ji(t?.color)?t.color:f.fill);h&&n.length===1&&Cx(a,r,c,f,t?.accent);let H=m+(w.height+w.ascent-w.descent)/2;for(let j=0;j<n.length;j++){let z=Math.floor(j/g),ie=j%g,q=Math.min(g,n.length-z*g),ee=r.width/2+(ie-(q-1)/2)*(F+ih),ne=H+z*T*E;h?Ax(a,n[j],ee,ne,T,f,R,W,c,t?.accent):(k&&a.strokeText(n[j],ee,ne),a.fillText(n[j],ee,ne))}return r}function Px(n){let{width:e,height:t}=n,{data:i}=n.getContext("2d").getImageData(0,0,e,t),s=e,r=-1,a=t,o=-1;for(let l=0;l<t;l++)for(let c=0;c<e;c++)i[(l*e+c)*4+3]<12||(s=Math.min(s,c),r=Math.max(r,c),a=Math.min(a,l),o=Math.max(o,l));return r<s?null:{x:s,y:a,w:r-s+1,h:o-a+1}}function sh({lines:n,layout:e="auto",style:t,garmentColor:i,graphic:s,direction:r=""}){if(!Array.isArray(n)||!n.length||n.length>48||!n.every(p=>typeof p=="string"&&p.trim()))throw new Error("Invalid lettering");let a=Rx({lines:n,layout:e,style:t,garmentColor:i,direction:r});if(!s)return a;let o=Px(s);if(!o)return a;let l=Math.min((df-2*Bs)/o.w,520/o.h),c=Math.round(o.w*l),h=Math.round(o.h*l),f=ff(Math.max(a.width,c+2*Bs),Bs+h+a.height),d=f.getContext("2d");return d.drawImage(s,o.x,o.y,o.w,o.h,(f.width-c)/2,Bs,c,h),d.drawImage(a,(f.width-a.width)/2,Bs+h),f}var nh,vx,cf,yx,Sx,Mx,lf,df,Bs,ih,pf=xt(()=>{nh={sans:'Verdana, "PingFang SC", "Microsoft YaHei", sans-serif',serif:'Georgia, "Songti SC", SimSun, serif',mono:'Menlo, Consolas, "PingFang SC", "Microsoft YaHei", monospace'},vx='"Sedgwick Ave", "Kaiti SC", STKaiti, KaiTi, cursive',cf={bubble:{fill:"#f7754e",edge:"#14163a",flash:"#fff1ca",depth:.065,stroke:.127},marker:{fill:"#245cf0",edge:"#14235a",flash:"#fbe9cc",depth:.02,stroke:.043},spray:{fill:"#b7ed34",edge:"#131319",flash:"#fff2c2",depth:.045,stroke:.099},sticker:{fill:"#7af1bb",edge:"#22204c",flash:"#dec1ff",depth:.077,stroke:.113},drip:{fill:"#c87ff1",edge:"#281238",flash:"#ffe8b0",depth:.057,stroke:.097}},yx=[["bubble",/泡泡|气泡|圆鼓|bubble/i],["marker",/马克笔|签名|手写|宽笔|marker|tag\b/i],["spray",/喷漆|喷罐|喷绘|喷笔|喷溅|stencil|spray/i],["sticker",/贴纸|镭射|贴标|sticker|y2k/i],["drip",/滴漆|滴墨|滴落|drip/i]],Sx={\u73CA\u745A\u7EA2:"#fa684d",\u6DF1\u84DD:"#142657",\u6D77\u519B\u84DD:"#142657",\u84DD:"#245cf0",\u8367\u5149\u7EFF:"#b7ed34",\u8584\u8377\u7EFF:"#7af1bb",\u7C89:"#ff78b3",\u7D2B:"#c87ff1",\u6A59:"#fb7837",\u9ED1:"#161520",\u767D:"#fafafa",\u7EA2:"#ee493b",\u9EC4:"#ffcf4a",\u7EFF:"#54cd6a"};lf={stack:1,two:2,three:3},df=1200,Bs=42,ih=36});function mf(n){return Number.isFinite(n)&&n>=0&&n<=1024}function oh(n){if(!Array.isArray(n?.layers)||!n.layers.length||n.layers.length>32)throw new Error("Invalid vector artwork");let e=document.createElement("canvas");e.width=e.height=1024;let t=e.getContext("2d",{willReadFrequently:!0});t.lineCap="round",t.lineJoin="round",t.textAlign="center";for(let s of n.layers)if(s){if(s.type==="path"&&typeof s.d=="string"&&s.d.length<=2500&&Lx.test(s.d)){let r=s.d.match(/[-+]?(?:\d*\.\d+|\d+\.?)/g)??[];if(r.length>500||r.some(o=>Math.abs(Number(o))>4096))continue;let a=new Path2D(s.d);rh.test(s.fill)&&(t.fillStyle=s.fill,t.fill(a,"evenodd")),rh.test(s.stroke)&&(t.strokeStyle=s.stroke,t.lineWidth=Number.isFinite(s.strokeWidth)?Math.max(1,Math.min(s.strokeWidth,96)):10,t.stroke(a))}else if(s.type==="text"&&typeof s.text=="string"&&rh.test(s.fill)&&mf(s.x)&&mf(s.y)&&Number.isFinite(s.size)&&s.size>=12&&s.size<=300){let r=Object.hasOwn(ah,s.font)?ah[s.font]:ah.sans;t.font=`${s.weight===700?700:400} ${s.size}px ${r}`,t.fillStyle=s.fill,t.fillText(s.text.slice(0,48),s.x,s.y,960)}}let i=t.getImageData(0,0,e.width,e.height).data;for(let s=3;s<i.length;s+=4)if(i[s]>8)return e;throw new Error("Empty vector artwork")}var rh,Lx,ah,gf=xt(()=>{rh=/^#[\da-f]{6}$/i,Lx=/^[\s,\d.+\-MLHVCSQTAZmlhvcsqtaz]+$/,ah={sans:"system-ui,sans-serif",serif:"Georgia,serif",mono:"monospace"}});function bf(n){let e,t=!1,i,s=new Map;function r(a){t=a,n(a)}return window.addEventListener("message",a=>{if(!e||a.source!==e||a.origin!==ch||a.data?.bridge!==lh)return;let{type:o,id:l,data:c,error:h}=a.data;if(o==="connected"){r(!0);return}if(o!=="reply"||!s.has(l))return;let f=s.get(l);s.delete(l),clearTimeout(f.timer),h?f.reject(new Error(h)):f.resolve(c)}),{get connected(){return t&&!!e&&!e.closed},open(){if(e=window.open(ch+"/",lh,"popup,width=470,height=430"),!e)throw new Error("\u6D4F\u89C8\u5668\u62E6\u622A\u4E86\u8FDE\u63A5\u7A97\u53E3\uFF0C\u8BF7\u5141\u8BB8 Shirt \u6253\u5F00\u5F39\u7A97\u3002");r(!1),clearInterval(i),i=setInterval(()=>{if(e.closed){clearInterval(i),r(!1);for(let a of s.values())clearTimeout(a.timer),a.reject(new Error("\u672C\u673A\u8FDE\u63A5\u7A97\u53E3\u5DF2\u5173\u95ED\u3002\u5DF2\u63D0\u4EA4\u7684\u4EFB\u52A1\u53EF\u5728\u5373\u68A6\u753B\u5E03\u67E5\u770B\u3002"));s.clear()}},1e3)},request(a,o){return this.connected?new Promise((l,c)=>{let h=crypto.randomUUID(),f=setTimeout(()=>{s.delete(h),c(new Error("\u7B49\u5F85\u5373\u68A6\u8D85\u65F6\uFF0C\u8BF7\u5728\u753B\u5E03\u67E5\u770B\u8FDB\u5EA6\u3002"))},a==="generate"?36e4:11e4);s.set(h,{resolve:l,reject:c,timer:f}),e.postMessage({bridge:lh,action:a,id:h,data:o},ch)}):Promise.reject(new Error("\u8BF7\u5148\u8FDE\u63A5\u672C\u673A\u7684\u5373\u68A6\u3002"))}}}async function _f(n,e){let t=await createImageBitmap(n),i=document.createElement("canvas"),s=Math.min(1,1400/Math.max(t.width,t.height));i.width=Math.round(t.width*s),i.height=Math.round(t.height*s);let r=i.getContext("2d",{willReadFrequently:!0});r.drawImage(t,0,0,i.width,i.height),t.close();let a=Ix(r,i.width,i.height,e);return{art:i,cleared:a}}function Ix(n,e,t,i){let s=n.getImageData(0,0,e,t),{data:r}=s,a=i==="#00ff00",o=new Set;for(let u=0;u<e;u++)o.add(u),o.add(u+(t-1)*e);for(let u=0;u<t;u++)o.add(u*e),o.add((u+1)*e-1);let l=[...o].filter(u=>{let v=u*4,[E,y,A,T]=r.subarray(v,v+4);return T===255&&(a?y>150&&y-Math.max(E,A)>65:E>155&&E-y>90&&A-y>55)});if(l.length<o.size*.7)return[...o].some(u=>r[u*4+3]<128);let[c,h,f]=[0,1,2].map(u=>{let v=l.map(E=>r[E*4+u]).sort((E,y)=>E-y);return v[Math.floor(v.length/2)]});function d(u){let v=u*4;return r[v+3]===255&&Math.abs(r[v]-c)+Math.abs(r[v+1]-h)+Math.abs(r[v+2]-f)<90}let p=new Int32Array(e*t),g=0,S=0;function m(u){d(u)&&(r[u*4+3]=0,p[S++]=u)}for(l.forEach(m);g<S;){let u=p[g++];u%e>0&&m(u-1),u%e<e-1&&m(u+1),u>=e&&m(u-e),u+e<p.length&&m(u+e)}return n.putImageData(s,0,0),!0}var ch,lh,xf=xt(()=>{ch="http://127.0.0.1:47125",lh="shirt-jimeng"});function Dx(){return hh??=new Promise((n,e)=>{let t=indexedDB.open("print-lab-designs",1);t.onupgradeneeded=()=>{t.result.createObjectStore("designs",{keyPath:"id",autoIncrement:!0}),t.result.createObjectStore("cards",{keyPath:"id"})},t.onerror=()=>e(t.error),t.onsuccess=()=>{let i=t.result;i.onversionchange=()=>{i.close(),hh=void 0},n(i)}}).catch(n=>{throw hh=void 0,n})}async function yf(n,e,t){let i=await Dx();return new Promise((s,r)=>{let a=i.transaction(n,e),o=t(a);a.oncomplete=()=>s(o.result),a.onabort=()=>r(a.error??new Error("Design storage was aborted."))})}function Sf(n,e){return yf(["designs","cards"],"readwrite",t=>{let i=t.objectStore("designs").add(n);return i.onsuccess=()=>{let{garment:s,fit:r,createdAt:a,quantities:o,submitted:l}=n;t.objectStore("cards").add({id:i.result,garment:s,fit:r,createdAt:a,preview:e,quantities:o,submitted:l===!0})},i})}function Mf(n){return yf(["designs"],"readonly",e=>e.objectStore("designs").get(n))}var hh,vf,wf=xt(()=>{vf=["XS","S","M","L","XL","2XL","3XL"]});var Wx=Jf(()=>{Jd();qo();Qd();Xl();af();of();pf();gf();xf();wf();var Ce=n=>document.getElementById(n),Nx={arrow:'<path d="M6 18 18 6M8 6h10v10"/>',close:'<path d="m6 6 12 12M18 6 6 18"/>',trash:'<path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13M10 10v7m4-7v7"/>',upload:'<path d="M12 16V4m-5 5 5-5 5 5M4 15v5h16v-5"/>',spark:'<path d="m12 2 2.4 7.6L22 12l-7.6 2.4L12 22l-2.4-7.6L2 12l7.6-2.4L12 2Z"/>'};document.querySelectorAll("[data-icon]").forEach(n=>{n.innerHTML='<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">'+Nx[n.dataset.icon]+"</svg>"});var Lf=[["\u7EAF\u767D","#f1f1f1"],["\u71D5\u9EA6","#c9b79a"],["\u96FE\u7070","#aab0ad"],["\u70AD\u9ED1","#272625"],["\u6DF1\u6D77\u84DD","#2d3a59"],["\u82D4\u7EFF","#5b6647"],["\u7816\u7EA2","#9d5148"]],ln=Ce("editor"),ic=Ce("editor-body"),sc=Ce("viewport"),ai=[...Ce("editor-tabs").querySelectorAll('[role="tab"]')],ec=sc.closest(".studio"),If=new URLSearchParams(location.search),Df=If.get("garment"),Ef=If.get("design"),Ux=Wo.some(({id:n})=>n===Df),Nf="male";try{localStorage.getItem("print-lab-fit")==="female"&&(Nf="female")}catch{}var Ee={garment:Ux?Df:"tee",color:Lf[0][1],fit:Nf,zone:"front",patterns:{},versions:{}},Uf={front:0,chest:-.24,back:Math.PI,sleeve:-Math.PI/2},Jt,Tf,Zo,Wn,$o,tc=Ce("save-design"),bh=Ce("start-customization"),Qo=!1;function nc(n){let e=n.valueAsNumber;return Number.isSafeInteger(e)&&e>0?e:0}var _h=vf.map(n=>{let e=document.createElement("div");e.className="size-option";let t=document.createElement("span");t.textContent=n;let i=document.createElement("div");i.className="quantity-stepper";let s=document.createElement("input");s.type="number",s.min="0",s.step="1",s.inputMode="numeric",s.value="0",s.dataset.size=n,s.setAttribute("aria-label",n+" \u6570\u91CF");function r(o,l){let c=document.createElement("button");return c.type="button",c.textContent=l,c.setAttribute("aria-label",n+(o>0?" \u52A0\u4E00\u4EF6":" \u51CF\u4E00\u4EF6")),c.addEventListener("click",()=>{s.value=String(Math.max(0,nc(s)+o)),oi()}),c}let a=r(-1,"\u2212");return s.addEventListener("input",oi),s.addEventListener("change",()=>{s.value=String(nc(s)),oi()}),i.append(a,s,r(1,"+")),e.append(t,i),Ce("size-options").append(e),{size:n,input:s,decrease:a}});function oi(){let n=0;for(let{input:e,decrease:t}of _h){let i=nc(e);t.disabled=i===0,n+=i}Ce("quantity-total").textContent=n?n+" \u4EF6":"",tc.disabled=!Jt||Qo||!!Wn,bh.disabled=tc.disabled||n===0}oi();function qn(n){Ce("notice").textContent=n,clearTimeout(Tf),Tf=setTimeout(()=>Ce("notice").textContent="",3600)}function rc(n){for(let e of ai){let t=e.id===n;e.setAttribute("aria-selected",String(t)),e.tabIndex=t?0:-1,Ce(e.getAttribute("aria-controls")).hidden=!t}ic.scrollTop=0}for(let n of ai)n.addEventListener("click",()=>rc(n.id));Ce("editor-tabs").addEventListener("keydown",n=>{let e=ai.indexOf(n.target);if(e===-1)return;let t;switch(n.key){case"ArrowLeft":t=(e+ai.length-1)%ai.length;break;case"ArrowRight":t=(e+1)%ai.length;break;case"Home":t=0;break;case"End":t=ai.length-1;break;default:return}n.preventDefault(),rc(ai[t].id),ai[t].focus()});function fh(n="clothes-tab"){ln.classList.contains("is-visible")||($o=void 0,rc(n),ln.open||(Zo=document.activeElement,ln.show()),ec.style.setProperty("--editor-height",ln.offsetHeight+"px"),ln.classList.add("is-visible"),ec.classList.add("editor-active"),Ce("close").focus({preventScroll:!0}))}function Fx(){xh(!1),fh("print-tab"),rc("print-tab"),Ce("print-tab").focus({preventScroll:!0})}async function ac(){if(!ln.classList.contains("is-visible"))return;ln.classList.remove("is-visible"),ec.classList.remove("editor-active");let n=ln.getAnimations(),e=Promise.allSettled(n.map(t=>t.finished));$o=e,await e,$o===e&&($o=void 0,ln.close(),Zo instanceof HTMLElement&&Zo!==document.body?Zo.focus({preventScroll:!0}):sc.focus({preventScroll:!0}))}new ResizeObserver(()=>{ln.open&&ec.style.setProperty("--editor-height",ln.offsetHeight+"px")}).observe(ln);Ce("close").addEventListener("click",ac);var Af=Ce("stage");Af.addEventListener("click",n=>{n.target===Af&&ac()});document.addEventListener("keydown",n=>{n.key==="Escape"&&ln.open&&ac()});function oc(n,e,t,i,s){for(let[r,a]of e){let o=document.createElement("button");o.type="button",o.dataset[t]=r,o.setAttribute("aria-pressed","false"),o.addEventListener("click",()=>i(r)),s(o,r,a),Ce(n).append(o)}}function Gs(n,e,t){Ce(n).querySelectorAll("button[data-"+e+"]").forEach(i=>{i.setAttribute("aria-pressed",String(i.dataset[e]===t))})}oc("garments",Wo.map(({id:n,name:e})=>[n,e]),"garment",n=>Ff(n),(n,e,t)=>{n.innerHTML=$d(e,'aria-hidden="true"')+"<span>"+t+"</span>"});oc("colors",Lf.map(([n,e])=>[e,n]),"color",n=>{Ee.color=n,Jt?.setColor(n),Gs("colors","color",n)},(n,e,t)=>{n.style.setProperty("--swatch",e),n.setAttribute("aria-label",t),n.title=t});oc("zones",Object.entries(ri),"zone",n=>{Bf(n),ic.scrollTop=0,Jt?.view(Uf[n]),Jt?.flashPrintZone(n)},(n,e,t)=>n.textContent=t);document.querySelector('[data-source="samples"]').addEventListener("click",()=>{let n=Object.entries(Yo).map(([e,{label:t}])=>[e,t]);oc("sample-list",n,"sample",e=>{Or(Ee.zone,eh(e),Yo[e].name,"\u56FE\u7247\u5E93")},(e,t,i)=>{let s=eh(t,240);s.setAttribute("aria-hidden","true"),e.removeAttribute("aria-pressed"),e.setAttribute("aria-label",i),e.title=i,e.append(s)})},{once:!0});for(let n of document.querySelectorAll("[data-fit]"))n.addEventListener("click",()=>{let e=n.dataset.fit;e!==(Wn?.fit??Ee.fit)&&Ff(void 0,e)});function Ur(n){Ce("scene-loading").hidden=!n,sc.setAttribute("aria-busy",String(n))}async function Ff(n,e){if(!Jt)return;let t={garment:n??Wn?.garment??Ee.garment,fit:e??Wn?.fit??Ee.fit};Wn=t,oi(),Ur(!0);try{if(await ql(t.garment,t.fit),Wn!==t)return;let i=t.fit!==Ee.fit;if(Of(t.garment,t.fit),i)try{localStorage.setItem("print-lab-fit",t.fit)}catch{}}catch{Wn===t&&qn("\u670D\u88C5\u52A0\u8F7D\u5931\u8D25\uFF0C\u8BF7\u518D\u70B9\u4E00\u6B21\u91CD\u8BD5\u3002")}finally{Wn===t&&(Wn=void 0,Ur(!1),oi())}}function Of(n,e){Jt.setGarment(n,Ee.color,e),Ee.garment=n,Ee.fit=e,Gs("fit-options","fit",e),Gs("garments","garment",n);for(let t of Object.keys(ri))Jt.updateZone(t,Ee.patterns[t])}function Bf(n){Ee.zone!==n&&(Ee.zone=n,xn(),Gs("zones","zone",n),cc())}function Ox(n){let e=Ee.patterns[n];if(e)return Bf(n),{x:e.x,y:e.y}}function Bx(n,e){let t=Ee.patterns[n];if(!t)return;let i=!1;for(let s of kx){let r=s.dataset.edit;s.value=Math.round(e[r]);let a=Number(s.value);i||=t[r]!==a,t[r]=a,vh(s)}i&&Jt.updateZone(n,t)}var ks=Ce("art-sources"),uh=Ce("art-details"),zs=Ce("change-art");function xh(n){let e=!!Ee.patterns[Ee.zone],t=document.activeElement;if(ks.hidden=e&&!n,uh.hidden=!e||n,zs.hidden=!e,zs.setAttribute("aria-expanded",String(!ks.hidden)),zs.textContent=n?"\u8FD4\u56DE\u56FE\u6848\u8C03\u6574":"\u66F4\u6362\u56FE\u6848",Ce("add-art-title").textContent=e?"\u66F4\u6362\u56FE\u6848":"\u6DFB\u52A0\u56FE\u6848",!(Ce("print-panel").hidden||!ln.open)){if(ks.hidden&&ks.contains(t))zs.focus({preventScroll:!0});else if(uh.hidden&&uh.contains(t)){let i=ks.querySelector('[aria-pressed="true"]');(e?zs:i).focus({preventScroll:!0})}}}zs.addEventListener("click",()=>xh(ks.hidden));function cc(){let n=Ee.patterns[Ee.zone];if(xh(!1),!n){Ce("art-thumb").replaceChildren();return}Ce("art-thumb").replaceChildren(n.image),Ce("art-name").textContent=n.name,Ce("art-name").title=n.name;let{image:e}=n;Ce("art-meta").textContent=(e.naturalWidth||e.width)+" \xD7 "+(e.naturalHeight||e.height)+" \xB7 "+n.source;for(let t of yh)t.value=t.dataset.edit==="scale"?Math.round(n.scale*100):n[t.dataset.edit],vh(t)}function Or(n,e,t,i,s){Ee.versions[n]=(Ee.versions[n]||0)+1,Ee.patterns[n]={image:e,name:t,source:i,pixels:s,scale:1,x:0,y:0},Jt?.updateZone(n,Ee.patterns[n]),n===Ee.zone&&(cc(),ln.open&&!Ce("print-panel").hidden&&(ic.scrollTop=0))}function vh(n){n.nextElementSibling.value=n.value+"%"}var yh=[...Ce("sliders").querySelectorAll("input")],kx=yh.filter(n=>n.dataset.edit!=="scale");for(let n of yh)n.addEventListener("input",()=>{let e=Ee.patterns[Ee.zone];e&&(e[n.dataset.edit]=Number(n.value)/(n.dataset.edit==="scale"?100:1),vh(n),Jt?.updateZone(Ee.zone,e))});Ce("delete").addEventListener("click",()=>{Ee.versions[Ee.zone]=(Ee.versions[Ee.zone]||0)+1,delete Ee.patterns[Ee.zone],Jt?.updateZone(Ee.zone,null),cc(),ic.scrollTop=0});var Cf=[...document.querySelectorAll("[data-source]")];for(let n of Cf)n.addEventListener("click",()=>{Cf.forEach(e=>{e.setAttribute("aria-pressed",String(e===n)),Ce(e.dataset.source).hidden=e!==n}),n.dataset.source==="generate"&&(Jo(),Mn()||Vf())});async function kf(n){if(!n)return;if(!["image/png","image/jpeg","image/webp"].includes(n.type)||n.size>15*1024*1024){qn("\u8BF7\u9009\u62E9\u4E0D\u8D85\u8FC7 15 MB \u7684 PNG\u3001JPG \u6216 WEBP \u56FE\u7247\u3002");return}let e=Ee.zone,t=(Ee.versions[e]||0)+1;Ee.versions[e]=t;let i=URL.createObjectURL(n);try{let s=new Image;if(s.src=i,await s.decode(),Ee.versions[e]!==t)return;Or(e,s,n.name,"\u672C\u5730\u4E0A\u4F20",n),qn("\u5DF2\u5E94\u7528\u56FE\u7247\u5230"+ri[e]+"\u3002")}catch{qn("\u65E0\u6CD5\u8BFB\u53D6\u8FD9\u5F20\u56FE\u7247\u3002")}finally{URL.revokeObjectURL(i)}}Ce("file").addEventListener("change",n=>{kf(n.target.files[0]),n.target.value=""});var Rf=Ce("upload").querySelector("label");for(let n of["dragover","dragleave","drop"])Rf.addEventListener(n,e=>{e.preventDefault(),Rf.classList.toggle("active",n==="dragover"),n==="drop"&&kf(e.dataTransfer.files[0])});var zf="/api/shirt-print",ph=Ce("generate-submit"),bt=Ce("ai-status"),Br=Ce("prompt"),lc=Ce("locked-text"),mh=ph.querySelector("span"),kr=Ce("ai-provider"),Sh=Ce("jimeng-reference"),Mh=Ce("lettering-layout"),zx=Ce("jimeng-quote"),gh=Ce("jimeng-connect"),Vs=!1,Fr=!1,Zi=!1,_n=!1,Un,Mn=()=>kr.value==="jimeng",Pi=bf(n=>{n||(Un=void 0),Mn()&&!_n&&(bt.textContent=n?"\u5373\u68A6\u5DF2\u8FDE\u63A5\u3002":""),xn()});location.protocol==="file:"&&(kr.value="deepseek",kr.options[0].disabled=!0);function Gf(){Ce("jimeng-tools").hidden=!Mn(),Ce("jimeng-help").hidden=!Mn(),xn()}kr.addEventListener("change",()=>{Un=void 0,bt.textContent="",Gf(),Mn()||Vf()});gh.addEventListener("click",()=>{try{Pi.open(),bt.textContent="\u8BF7\u5728\u65B0\u7A97\u53E3\u786E\u8BA4\u8FDE\u63A5\u3002"}catch(n){bt.textContent=n.message}});function xn(){let n=th(Br.value,lc.value),e=n?.lines?.length??0,t=Ce("lettering-preview");n?.error?t.textContent=n.error:e===1?t.textContent="\u6309\u539F\u6587\u5370\u4E0A\u300C"+n.lines[0]+"\u300D":e>1?t.textContent="\u5DF2\u9501\u5B9A "+e+" \u4E2A\u540D\u5B57"+(e>5&&["chest","sleeve"].includes(Ee.zone)?"\uFF0C\u5EFA\u8BAE\u653E\u5728\u80CC\u9762\u3002":"\u3002"):t.textContent="";let i=Un&&Un.signature===zr();if(zx.hidden=!Mn()||!i,Ce("jimeng-submit").disabled=_n||!Pi.connected||!!Un?.submitted,kr.disabled=_n||Zi,gh.disabled=_n||Pi.connected,gh.textContent=Pi.connected?"\u5373\u68A6\u5DF2\u8FDE\u63A5":"\u8FDE\u63A5\u672C\u673A\u5373\u68A6",Mn()){ph.disabled=_n||!Pi.connected||!!n?.error||i&&!Un.submitted,mh.textContent=_n?"\u5373\u68A6\u5904\u7406\u4E2D\u2026":"\u67E5\u770B\u5373\u68A6\u62A5\u4EF7";return}let s=n?.mode==="lettering";ph.disabled=Zi||Fr||!!n?.error||!Vs&&!s,Zi||(mh.textContent=!Vs&&s?"\u6392\u7248\u5E76\u5370\u4E0A\u8863\u670D":"\u751F\u6210\u5E76\u5370\u4E0A\u8863\u670D")}for(let n of[Br,lc,Mh,Sh])n.addEventListener("input",xn);function zr(){return JSON.stringify([Ee.zone,Ee.color,lc.value,Br.value,Mh.value,Sh.checked,Ee.versions[Ee.zone]||0])}function dh(n,e=""){Vs=n,Mn()||(bt.textContent=e),xn()}async function Vf(){if(!(Vs||Fr||Zi)){if(location.protocol==="file:"){dh(!1,"\u79BB\u7EBF\u7248\u652F\u6301\u672C\u5730\u6587\u5B57\u6392\u7248\u3002");return}Fr=!0,xn(),Mn()||(bt.textContent="\u6B63\u5728\u68C0\u67E5\u77E2\u91CF\u670D\u52A1\u2026");try{let n=await fetch(zf,{cache:"no-store",signal:AbortSignal.timeout(8e3)});if(!n.ok)throw new Error("AI status unavailable");let{available:e}=await n.json();dh(e===!0,e===!0?"":"DeepSeek \u5C1A\u672A\u914D\u7F6E\u3002\u53EF\u5728\u300C\u6587\u5B57\u4E0E\u6392\u7248\u300D\u4E2D\u8F93\u5165\u6587\u5B57\u3002")}catch{dh(!1,"\u6682\u65F6\u65E0\u6CD5\u8FDE\u63A5 DeepSeek\u3002\u53EF\u4F7F\u7528\u672C\u5730\u6587\u5B57\u6392\u7248\u3002")}finally{Fr=!1,xn()}}}async function Gx(n){let e=await fetch(zf,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(n),signal:AbortSignal.timeout(36e3)}),t=await e.json();return e.ok?t:{error:t.error||"\u56FE\u6848\u751F\u6210\u5931\u8D25\uFF0C\u8BF7\u91CD\u8BD5\u3002"}}async function Vx(n,e){if(_n||!Pi.connected)return;let t=Ee.zone,i=Ee.color,s=Mh.value,r=zr();Un=void 0,_n=!0,bt.textContent="\u6B63\u5728\u83B7\u53D6\u5373\u68A6\u62A5\u4EF7\u2026",xn();try{let a=e?e.direction||"\u7B14\u89E6\u9C9C\u660E\u7684\u539F\u521B\u55B7\u6F06\u6D82\u9E26\u88C5\u9970\uFF0C\u7559\u51FA\u6E05\u6670\u7684\u6587\u5B57\u7A7A\u95F4":n,o=await Pi.request("quote",{description:a,zone:t,lockedText:!!e,useReference:Sh.checked});if(r!==zr()){bt.textContent="\u5370\u82B1\u9009\u9879\u5DF2\u4FEE\u6539\uFF0C\u8BF7\u91CD\u65B0\u83B7\u53D6\u62A5\u4EF7\u3002";return}Un={...o,zone:t,garmentColor:i,layout:s,signature:r,locked:e},Ce("jimeng-price").textContent=ri[t]+" \xB7 1 \u5F20 \xB7 \u6700\u591A "+o.credits+" \u79EF\u5206",Ce("jimeng-submit").textContent=o.credits===0?"\u786E\u8BA4\u514D\u8D39\u751F\u6210":"\u786E\u8BA4\u751F\u6210 \xB7 \u6700\u591A "+o.credits+" \u79EF\u5206",Ce("jimeng-canvas").href=o.webUrl,bt.textContent=""}catch(a){bt.textContent=a.message}finally{_n=!1,xn()}}Ce("jimeng-submit").addEventListener("click",async()=>{let n=Un;if(!n||n.submitted||!Mn()||_n||n.signature!==zr())return;let{id:e,credits:t,zone:i,matte:s,locked:r,layout:a,garmentColor:o,model:l}=n,c=(Ee.versions[i]||0)+1;Ee.versions[i]=c,n.signature=zr(),n.submitted=!0,_n=!0,bt.textContent="\u5373\u68A6\u6B63\u5728\u751F\u6210\u56FE\u6848\uFF0C\u53EF\u5728\u753B\u5E03\u67E5\u770B\u8FDB\u5EA6\u3002",xn();try{let h=r?Jo():null,f=await Pi.request("generate",{id:e,credits:t});if(!(f instanceof Blob)||!f.type.startsWith("image/"))throw new Error("\u5373\u68A6\u6CA1\u6709\u8FD4\u56DE\u53EF\u7528\u56FE\u7247\u3002");let{art:d,cleared:p}=await _f(f,s);if(h&&await h,Ee.versions[i]!==c){bt.textContent="\u8BE5\u4F4D\u7F6E\u5DF2\u6709\u65B0\u7684\u4FEE\u6539\uFF0C\u751F\u6210\u7ED3\u679C\u53EF\u5728\u5373\u68A6\u753B\u5E03\u67E5\u770B\u3002";return}let g=r?sh({lines:r.lines,layout:a,garmentColor:o,graphic:d,direction:r.direction}):d,S=r?r.lines.length===1?r.lines[0]:"\u540D\u5355 \xB7 "+r.lines.length+" \u4EBA":"\u5373\u68A6\u5370\u82B1";Or(i,g,S,"\u5373\u68A6 \xB7 "+l),qn("\u5DF2\u5C06\u5373\u68A6\u56FE\u6848\u5370\u5230"+ri[i]+"\u3002"+(p?"":"\u5373\u68A6\u539F\u56FE\u7684\u80CC\u666F\u5DF2\u4FDD\u7559\u3002")),bt.textContent="",Un=void 0}catch(h){bt.textContent=h.message}finally{_n=!1,Un===n&&(Ce("jimeng-submit").textContent="\u91CD\u65B0\u62A5\u4EF7\u540E\u53EF\u751F\u6210"),xn()}});Gf();Ce("generate").addEventListener("submit",async n=>{if(n.preventDefault(),Zi||_n||!Mn()&&Fr)return;let e=Br.value.trim(),t=th(e,lc.value);if(t?.error){bt.textContent=t.error;return}let i=t?.mode==="lettering";if(!t&&!e){bt.textContent="\u8BF7\u63CF\u8FF0\u60F3\u8981\u7684\u5370\u82B1\u56FE\u6848\u3002",Br.focus();return}if(Mn()){await Vx(e,t);return}if(!Vs&&!i)return;let s=Ee.zone,r=(Ee.versions[s]||0)+1,a=Ee.color,o=Ce("lettering-layout").value,l=t?Jo():null;Ee.versions[s]=r,Zi=!0,xn(),mh.textContent="\u6B63\u5728\u751F\u6210\u2026",bt.textContent=i?"\u6B63\u5728\u4E3A\u6307\u5B9A\u6587\u5B57\u6392\u7248\u3002":"DeepSeek \u6B63\u5728\u7ED8\u5236\u56FE\u6848\u3002";try{let c={};if(Vs){let h=t?t.direction||"\u5E72\u51C0\u6E05\u6670\u7684\u670D\u88C5\u5370\u82B1\u6392\u7248":e;try{c=await Gx({prompt:h,color:a,zone:s,...t?{mode:t.mode}:{}})}catch(f){if(!i)throw f}}if(c.error&&!i){bt.textContent=c.error;return}if(l&&await l,Ee.versions[s]!==r){bt.textContent="\u8BE5\u4F4D\u7F6E\u5DF2\u6709\u65B0\u7684\u4FEE\u6539\u3002";return}if(t){let h=i?null:oh({layers:c.art?.layers?.filter(g=>g?.type==="path")}),f=sh({lines:t.lines,layout:o,style:c.letteringStyle,garmentColor:a,graphic:h,direction:t.direction}),d=t.lines.length===1?t.lines[0]:"\u540D\u5355 \xB7 "+t.lines.length+" \u4EBA",p=!!h||!!c.letteringStyle;Or(s,f,d,p?"DeepSeek \xB7 \u6587\u5B57\u9501\u5B9A":"\u672C\u5730\u6587\u5B57\u6392\u7248"),qn("\u5DF2\u6309\u539F\u6587\u6392\u7248\u5E76\u5E94\u7528\u5230"+ri[s]+"\u3002")}else{let h=oh(c.art),f=typeof c.art.title=="string"?c.art.title.trim().slice(0,35):"";Or(s,h,f||"AI \u77E2\u91CF\u5370\u82B1","DeepSeek"),qn("\u5DF2\u5C06\u77E2\u91CF\u56FE\u6848\u5E94\u7528\u5230"+ri[s]+"\u3002")}bt.textContent=""}catch{bt.textContent="\u56FE\u6848\u751F\u6210\u5931\u8D25\uFF0C\u8BF7\u8C03\u6574\u63CF\u8FF0\u540E\u91CD\u8BD5\u3002"}finally{Zi=!1,xn()}});function Pf(n,e,t){return new Promise((i,s)=>n.toBlob(r=>{r?i(r):s(new Error("Could not capture the design."))},e,t))}async function Hf(n){if(!Jt||Wn||Qo)return;let e=Object.fromEntries(_h.flatMap(({size:s,input:r})=>{let a=nc(r);return a?[[s,a]]:[]}));if(n&&!Object.keys(e).length)return;let t=n?bh:tc,i=t.textContent;Qo=!0,oi(),t.textContent=n?"\u6B63\u5728\u521B\u5EFA\u2026":"\u4FDD\u5B58\u4E2D\u2026";try{let{garment:s,color:r,fit:a,zone:o,patterns:l}=Ee,c=l[o]?o:Object.keys(l)[0]??"front",h=Pf(Jt.designPreview(c),"image/webp",.87),f=Promise.all(Object.entries(l).map(async([g,{image:S,pixels:m,...u}])=>[g,{...u,pixels:m??await Pf(S,"image/png")}])),[d,p]=await Promise.all([h,f]);await Sf({garment:s,color:r,fit:a,zone:o,createdAt:Date.now(),patterns:Object.fromEntries(p),quantities:e,submitted:n},d),n?location.assign(Ce("my-customizations").href):qn("\u5DF2\u4FDD\u5B58\u5728\u6B64\u6D4F\u89C8\u5668\uFF0C\u53EF\u5728\u300C\u6211\u7684\u5B9A\u5236\u300D\u4E2D\u7EE7\u7EED\u7F16\u8F91\u3002")}catch(s){qn(s.name==="QuotaExceededError"?"\u6D4F\u89C8\u5668\u5B58\u50A8\u7A7A\u95F4\u4E0D\u8DB3\uFF0C\u8BBE\u8BA1\u672A\u4FDD\u5B58\u3002":"\u4FDD\u5B58\u5931\u8D25\uFF0C\u8BF7\u68C0\u67E5\u6D4F\u89C8\u5668\u5B58\u50A8\u8BBE\u7F6E\u540E\u91CD\u8BD5\u3002")}finally{Qo=!1,t.textContent=i,oi()}}tc.addEventListener("click",()=>Hf(!1));bh.addEventListener("click",()=>Hf(!0));async function Hx(n){let e=await Mf(n);if(!e||!Object.hasOwn(Nr,e.garment))return!1;let t=await Promise.all(Object.entries(e.patterns).map(async([o,l])=>{let c=URL.createObjectURL(l.pixels);try{let h=new Image;return h.src=c,await h.decode(),[o,{...l,image:h}]}finally{URL.revokeObjectURL(c)}})),{garment:i,color:s,fit:r,zone:a}=e;Object.assign(Ee,{garment:i,color:s,fit:r,zone:a,patterns:Object.fromEntries(t)});for(let{size:o,input:l}of _h){let c=e.quantities?.[o];l.value=String(Number.isSafeInteger(c)&&c>0?c:0)}return!0}async function Wf(){Ur(!0),Ce("scene-retry").hidden=!0;let n=!1;if(Ef!==null){try{let e=Number(Ef);n=Number.isSafeInteger(e)&&e>0&&await Hx(e)}catch{}n||qn("\u6B64\u6D4F\u89C8\u5668\u4E2D\u627E\u4E0D\u5230\u8FD9\u4EFD\u8BBE\u8BA1\u3002")}try{await ql(Ee.garment,Ee.fit)}catch{Ur(!1),Ce("scene-retry").hidden=!1;return}try{Jt=Yd(sc,{openEditor:fh,closeEditor:ac,selectPrint:Ox,movePrint:Bx,openPrintEditor:Fx}),Of(Ee.garment,Ee.fit),oi()}catch(e){console.error(e),Ce("scene-error").hidden=!1}finally{Ur(!1)}Gs("colors","color",Ee.color),Gs("zones","zone",Ee.zone),cc(),n&&Jt&&(fh(Ee.patterns[Ee.zone]?"print-tab":"clothes-tab"),Jt.view(Uf[Ee.zone]))}Ce("scene-retry").querySelector("button").addEventListener("click",Wf);Wf()});export default Wx();
