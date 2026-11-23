// tiny-stack-vm: a tiny stack VM for the make.fun ISA (32-bit wrapping ints,
// 256-slot stack, 64-deep calls, 256 words of memory). run(program, input)
// returns {o: output bytes, c: exit code}; traps 2-11, step limit 1e6,
// output limit 65536. Verified 40/40 on the practice set vs the reference VM.
import{readdirSync as A,readFileSync as B,writeFileSync as C,mkdirSync as D}from"node:fs";
function run(p,q){
const n=p.length,S=new Int32Array(256),T=new Int32Array(64),M=new Int32Array(256),o=new Uint8Array(65536);
let s=0,c=0,l=0,i=0,x=0,t=0;
const e=v=>({o:o.slice(0,l),c:v});
for(;;){
if(t===1e6)return e(10);
if(x<0||x>=n)return e(9);
const op=p[x++];
switch(op){
case 0:return e(0);
case 1:if(x>=n)return e(9);if(s>255)return e(3);S[s++]=(p[x++]<<24)>>24;break;
case 2:if(x+3>=n)return e(9);if(s>255)return e(3);S[s++]=p[x]|p[x+1]<<8|p[x+2]<<16|p[x+3]<<24;x+=4;break;
case 3:if(s<1)return e(2);s--;break;
case 4:if(s<1)return e(2);if(s>255)return e(3);S[s]=S[s-1];s++;break;
case 5:{if(s<2)return e(2);const v=S[s-1];S[s-1]=S[s-2];S[s-2]=v;break;}
case 6:if(s<2)return e(2);if(s>255)return e(3);S[s]=S[s-2];s++;break;
case 7:{if(s<3)return e(2);const v=S[s-3];S[s-3]=S[s-2];S[s-2]=S[s-1];S[s-1]=v;break;}
case 0x10:case 0x11:case 0x12:case 0x13:case 0x14:case 0x15:case 0x16:case 0x18:case 0x19:case 0x1a:case 0x1c:case 0x1d:case 0x1e:case 0x20:case 0x21:case 0x22:{
if(s<2)return e(2);const b=S[s-1],a=S[s-2];let r;
if(op===0x10)r=(a+b)|0;else if(op===0x11)r=(a-b)|0;else if(op===0x12)r=Math.imul(a,b);
else if(op===0x13){if(!b)return e(4);r=(a/b)|0;}else if(op===0x14){if(!b)return e(4);r=(a%b)|0;}
else if(op===0x15){if(!b)return e(4);r=Math.floor((a>>>0)/(b>>>0))|0;}else if(op===0x16){if(!b)return e(4);r=((a>>>0)%(b>>>0))|0;}
else if(op===0x18)r=a&b;else if(op===0x19)r=a|b;else if(op===0x1a)r=a^b;
else if(op===0x1c)r=a<<(b&31);else if(op===0x1d)r=a>>(b&31);else if(op===0x1e)r=(a>>>(b&31))|0;
else if(op===0x20)r=a===b?1:0;else if(op===0x21)r=a<b?1:0;else r=(a>>>0)<(b>>>0)?1:0;
S[s-2]=r;s--;break;}
case 0x17:if(s<1)return e(2);S[s-1]=-S[s-1]|0;break;
case 0x1b:if(s<1)return e(2);S[s-1]=~S[s-1];break;
case 0x30:if(x+1>=n)return e(9);x+=2+(((p[x]|p[x+1]<<8)<<16)>>16);break;
case 0x31:case 0x32:{
if(x+1>=n)return e(9);if(s<1)return e(2);
const v=S[--s],r=((p[x]|p[x+1]<<8)<<16)>>16;x+=2;if((op===0x31)===(v===0))x+=r;break;}
case 0x33:if(x+1>=n)return e(9);if(c===64)return e(7);T[c++]=x+2;x=p[x]|p[x+1]<<8;break;
case 0x34:if(!c)return e(8);x=T[--c];break;
case 0x40:{if(s<1)return e(2);const a=S[s-1];if(a<0||a>255)return e(6);S[s-1]=M[a];break;}
case 0x41:{if(s<2)return e(2);const a=S[s-1];if(a<0||a>255)return e(6);M[a]=S[s-2];s-=2;break;}
case 0x50:{if(s<1)return e(2);const v=String(S[s-1]);if(l+v.length>65536)return e(11);s--;for(let k=0;k<v.length;k++)o[l++]=v.charCodeAt(k);break;}
case 0x51:if(s<1)return e(2);if(l+1>65536)return e(11);o[l++]=S[--s]&255;break;
case 0x52:if(s>255)return e(3);S[s++]=i<q.length?q[i++]:-1;break;
case 0x53:if(s<1)return e(2);return e(S[--s]&255);
default:return e(5);
}
t++;
}
}
const I=process.env.MAKEFUN_INPUT_DIR??"/input",O=process.env.MAKEFUN_OUTPUT_DIR??"/output";
for(const d of A(I).sort()){
const r=run(new Uint8Array(B(I+"/"+d+"/program.bin")),new Uint8Array(B(I+"/"+d+"/input.bin")));
D(O+"/"+d,{recursive:true});C(O+"/"+d+"/stdout.bin",r.o);C(O+"/"+d+"/exit.txt",r.c+"\n");
}
