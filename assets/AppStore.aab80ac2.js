import{S as s,i as a,s as t,q as e,r as n,l as r,T as i,B as o,a as l,o as c,n as p,d,y as m,J as f,U as g,N as h,Q as u,O as w}from"./index.219de795.js";function $(s){let a,t,m,f,g,h,u,w,$,b;return{c(){a=e("section"),t=e("header"),m=n(),f=e("section"),g=e("img"),u=n(),w=e("br"),$=n(),b=e("h1"),b.innerHTML='Nothing here yet <img style="height: 1em; width: auto; transform: translateY(0.1em);" src="/emojis/wink.png" alt="Wink Emoji" class="svelte-otd61t"/>',r(t,"class","titlebar app-window-drag-handle svelte-otd61t"),i(g.src,h="/macos-web/app-icons/"+s[0]+"/256.webp")||r(g,"src",h),r(g,"alt","Placeholder App"),r(g,"class","svelte-otd61t"),o(g,"transform",s[1]),o(b,"display","flex"),o(b,"align-items","center"),o(b,"gap","0.5rem"),r(f,"class","main-area svelte-otd61t"),r(a,"class","container svelte-otd61t")},m(s,e){l(s,a,e),c(a,t),c(a,m),c(a,f),c(f,g),c(f,u),c(f,w),c(f,$),c(f,b)},p(s,[a]){1&a&&!i(g.src,h="/macos-web/app-icons/"+s[0]+"/256.webp")&&r(g,"src",h),2&a&&o(g,"transform",s[1])},i:p,o:p,d(s){s&&d(a)}}}function b(s,a,t){let e,n,r;m(s,f,(s=>t(4,r=s)));let{appID:i}=a;const o=g(0,{damping:.28,stiffness:.1});return m(s,o,(s=>t(3,n=s))),h((async()=>{await u(100),w(o,n=1,n)})),s.$$set=s=>{"appID"in s&&t(0,i=s.appID)},s.$$.update=()=>{24&s.$$.dirty&&t(1,e=r?"initial":`rotate(${180*(n+1)}deg) scale(${n}) translateZ(0px)`)},[i,e,o,n,r]}class y extends s{constructor(s){super(),a(this,s,b,$,t,{appID:0})}}export{y as default};
