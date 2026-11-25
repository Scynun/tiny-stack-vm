import{readdirSync as A,readFileSync as B,writeFileSync as C,mkdirSync as D}from"fs"
function run(p,q,I=Int32Array,n=p.length,S=new I(256),T=new I(64),M=new I(256),o=Buffer.alloc(1<<16),s=0,c=0,l=0,i=0,x=0,t=0,k,a,b,A,B,e=v=>{throw v},U=m=>s<m&&e(2),g=()=>p[x]|p[x+1]<<8<<16>>16){
try{
for(;t<1e6;t++){
x>>>0>=n&&e(9);
k=p[x++];
if(k>15&k<35&(k%4!=3|k<23)){U(2);b=S[s-1],a=S[s-2],A=a>>>0,B=b>>>0;!b&&k-19>>>0<4&&e(4);S[--s-1]=[a+b,a-b,Math.imul(a,b),a/b,a%b,A/B,A%B,0,a&b,a|b,a^b,0,a<<b,a>>b,a>>>b,0,a==b,a<b,A<B][k-16]}
else switch(k){
case 0:e(0)
case 1:x>=n&&e(9);s>>8&&e(3);S[s++]=p[x++]<<24>>24;break
case 2:x+3>=n&&e(9);s>>8&&e(3);S[s++]=p[x++]|p[x++]<<8|p[x++]<<16|p[x++]<<24;break
case 3:U(1);s--;break
case 4:U(1);s>>8&&e(3);S[s++]=S[s-2];break
case 5:U(2);[S[s-1],S[s-2]]=[S[s-2],S[s-1]];break
case 6:U(2);s>>8&&e(3);S[s++]=S[s-3];break
case 7:U(3);[S[s-3],S[s-2],S[s-1]]=[S[s-2],S[s-1],S[s-3]];break
case 23:case 27:U(1);S[s-1]=~S[s-1]+(k<27);break
case 48:x+1>=n&&e(9);x+=2+g();break
case 49:case 50:x+1>=n&&e(9);U(1);x+=2+(k+!S[--s]+1)%2*g();break
case 51:x+1>=n&&e(9);c>>6&&e(7);T[c++]=x+2,x=g()&65535;break
case 52:!c&&e(8);x=T[--c];break
case 64:U(1);k=S[s-1];k>>>8&&e(6);S[s-1]=M[k];break
case 65:U(2);k=S[s-1];k>>>8&&e(6);s-=2,M[k]=S[s];break
case 80:U(1);k=S[--s]+"";l+k.length-1>>16&&e(11);l+=o.write(k,l);break
case 81:U(1);l>>16&&e(11);o[l++]=S[--s]&255;break
case 82:s>>8&&e(3);S[s++]=q[i++]??-1;break
case 83:U(1);e(S[--s]&255)
default:e(5)
}
}
e(10)
}catch(v){return{o:o.slice(0,l),c:v|0}}
}
const{MAKEFUN_INPUT_DIR:I="/input",MAKEFUN_OUTPUT_DIR:O="/output"}=process.env;
A(I).forEach(d=>{const u=I+"/"+d,v=O+"/"+d,r=run(B(u+"/program.bin"),B(u+"/input.bin"));D(v,{recursive:!0}),C(v+"/stdout.bin",r.o),C(v+"/exit.txt",r.c+"")})
