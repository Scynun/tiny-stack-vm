import{readdirSync as A,readFileSync as B,writeFileSync as C,mkdirSync as D}from"fs";
function run(p,q){
const n=p.length,S=new Int32Array(256),T=new Int32Array(64),M=new Int32Array(256),o=Buffer.alloc(1<<16);
let s=0,c=0,l=0,i=0,x=0,t=0,k;
const e=v=>{throw v},U=m=>{if(s<m)e(2)},g=()=>(p[x]|p[x+1]<<8)<<16>>16;
try{
for(;t<1e6;t++){
if(x>>>0>=n)e(9);
const op=p[x++];
if(op>15&op<35&op!=23&op!=27&op!=31){U(2);const b=S[s-1],a=S[s-2];if(!b&&op>18&op<23)e(4);S[s-2]=[a+b,a-b,Math.imul(a,b),a/b,a%b,(a>>>0)/(b>>>0),(a>>>0)%(b>>>0),0,a&b,a|b,a^b,0,a<<(b&31),a>>(b&31),a>>>(b&31),0,a==b,a<b,a>>>0<b>>>0][op-16],s--;}
else switch(op){
case 0:e(0);
case 1:if(x>=n)e(9);if(s>>8)e(3);S[s++]=p[x++]<<24>>24;break;
case 2:if(x+3>=n)e(9);if(s>>8)e(3);S[s++]=p[x]|p[x+1]<<8|p[x+2]<<16|p[x+3]<<24,x+=4;break;
case 3:U(1);s--;break;
case 4:U(1);if(s>>8)e(3);S[s++]=S[s-2];break;
case 5:U(2);[S[s-1],S[s-2]]=[S[s-2],S[s-1]];break;
case 6:U(2);if(s>>8)e(3);S[s++]=S[s-3];break;
case 7:U(3);[S[s-3],S[s-2],S[s-1]]=[S[s-2],S[s-1],S[s-3]];break;
case 23:case 27:U(1);S[s-1]=-S[s-1]-(op>23);break;
case 48:if(x+1>=n)e(9);x+=2+g();break;
case 49:case 50:if(x+1>=n)e(9);U(1);const w=S[--s],r=g();x+=2+(op==49?!w:!!w)*r;break;
case 51:if(x+1>=n)e(9);if(c>>6)e(7);T[c++]=x+2,x=p[x]|p[x+1]<<8;break;
case 52:if(!c)e(8);x=T[--c];break;
case 64:U(1);k=S[s-1];if(k>>>8)e(6);S[s-1]=M[k];break;
case 65:U(2);k=S[s-1];if(k>>>8)e(6);M[k]=S[s-2],s-=2;break;
case 80:U(1);const v=S[--s]+"";if(l+v.length>1<<16)e(11);o.set(Buffer.from(v),l),l+=v.length;break;
case 81:U(1);if(l>>16)e(11);o[l++]=S[--s]&255;break;
case 82:if(s>>8)e(3);S[s++]=q[i++]??-1;break;
case 83:U(1);e(S[--s]&255);
default:e(5);
}
}
e(10);
}catch(v){return{o:o.slice(0,l),c:v|0}}
}
const{MAKEFUN_INPUT_DIR:I="/input",MAKEFUN_OUTPUT_DIR:O="/output"}=process.env;
for(const d of A(I)){const u=I+"/"+d,v=O+"/"+d,r=run(B(u+"/program.bin"),B(u+"/input.bin"));D(v,{recursive:true}),C(v+"/stdout.bin",r.o),C(v+"/exit.txt",r.c+"");}
