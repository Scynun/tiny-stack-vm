import{readdirSync as A,readFileSync as B,writeFileSync as C,mkdirSync as D}from"fs";
function run(p,q){
const n=p.length,S=new Int32Array(256),T=new Int32Array(64),M=new Int32Array(256),o=new Uint8Array(1<<16);
let s=0,c=0,l=0,i=0,x=0,t=0;
const e=v=>({o:o.slice(0,l),c:v});
for(;;){
if(t==1e6)return e(10);
if(x<0|x>=n)return e(9);
const op=p[x++];
switch(op){
case 0:return e(0);
case 1:if(x>=n)return e(9);if(s>255)return e(3);S[s++]=(p[x++]<<24)>>24;break;
case 2:if(x+3>=n)return e(9);if(s>255)return e(3);S[s++]=p[x]|p[x+1]<<8|p[x+2]<<16|p[x+3]<<24;x+=4;break;
case 3:if(!s)return e(2);s--;break;
case 4:if(!s)return e(2);if(s>255)return e(3);S[s]=S[s-1];s++;break;
case 5:if(s<2)return e(2);[S[s-1],S[s-2]]=[S[s-2],S[s-1]];break;
case 6:if(s<2)return e(2);if(s>255)return e(3);S[s]=S[s-2];s++;break;
case 7:if(s<3)return e(2);[S[s-3],S[s-2],S[s-1]]=[S[s-2],S[s-1],S[s-3]];break;
case 16:case 17:case 18:case 19:case 20:case 21:case 22:case 24:case 25:case 26:case 28:case 29:case 30:case 32:case 33:case 34:{
if(s<2)return e(2);const b=S[s-1],a=S[s-2];let r;
if(!b&&op>18&&op<23)return e(4);
if(op==16)r=a+b|0;else if(op==17)r=a-b|0;else if(op==18)r=Math.imul(a,b);
else if(op==19)r=a/b|0;else if(op==20)r=a%b|0;
else if(op==21)r=Math.floor((a>>>0)/(b>>>0))|0;else if(op==22)r=(a>>>0)%(b>>>0)|0;
else if(op==24)r=a&b;else if(op==25)r=a|b;else if(op==26)r=a^b;
else if(op==28)r=a<<(b&31);else if(op==29)r=a>>(b&31);else if(op==30)r=a>>>(b&31)|0;
else if(op==32)r=a==b?1:0;else if(op==33)r=a<b?1:0;else r=a>>>0<b>>>0?1:0;
S[s-2]=r;s--;break;}
case 23:if(!s)return e(2);S[s-1]=-S[s-1]|0;break;
case 27:if(!s)return e(2);S[s-1]=~S[s-1];break;
case 48:if(x+1>=n)return e(9);x+=2+((p[x]|p[x+1]<<8)<<16>>16);break;
case 49:case 50:{
if(x+1>=n)return e(9);if(!s)return e(2);
const v=S[--s],r=(p[x]|p[x+1]<<8)<<16>>16;x+=2;if(v==0==(op==49))x+=r;break;}
case 51:if(x+1>=n)return e(9);if(c==64)return e(7);T[c++]=x+2;x=p[x]|p[x+1]<<8;break;
case 52:if(!c)return e(8);x=T[--c];break;
case 64:if(!s)return e(2);if(S[s-1]<0|S[s-1]>255)return e(6);S[s-1]=M[S[s-1]];break;
case 65:if(s<2)return e(2);if(S[s-1]<0|S[s-1]>255)return e(6);M[S[s-1]]=S[s-2];s-=2;break;
case 80:{if(!s)return e(2);const v=S[s-1]+"";if(l+v.length>1<<16)return e(11);s--;for(const k of v)o[l++]=k.charCodeAt();break;}
case 81:if(!s)return e(2);if(l>65535)return e(11);o[l++]=S[--s]&255;break;
case 82:if(s>255)return e(3);S[s++]=i<q.length?q[i++]:-1;break;
case 83:if(!s)return e(2);return e(S[--s]&255);
default:return e(5);
}
t++;
}
}
const{MAKEFUN_INPUT_DIR:I="/input",MAKEFUN_OUTPUT_DIR:O="/output"}=process.env;
for(const d of A(I)){const u=I+"/"+d,v=O+"/"+d,r=run(B(u+"/program.bin"),B(u+"/input.bin"));D(v,{recursive:true});C(v+"/stdout.bin",r.o);C(v+"/exit.txt",r.c+"\n");}
