import{S as s,i as a,s as e,q as t,r as n,l as r,T as i,B as o,a as l,o as c,n as p,d,y as m,J as f,U as g,N as h,Q as w,O as u}from"./index.6e24e90f.js";function $(s){let a,e,m,f,g,h,w,u,$,b;return{c(){a=t("section"),e=t("header"),m=n(),f=t("section"),g=t("img"),w=n(),u=t("br"),$=n(),b=t("h1"),b.innerHTML='Nothing here yet <img style="height: 1em; width: auto; transform: translateY(0.1em);" src="/macos-web/emojis/wink.png" alt="Wink Emoji" class="svelte-otd61t"/>',r(e,"class","titlebar app-window-drag-handle svelte-otd61t"),i(g.src,h="/macos-web/app-icons/"+s[0]+"/256.webp")||r(g,"src",h),r(g,"alt","Placeholder App"),r(g,"class","svelte-otd61t"),o(g,"transform",s[1]),o(b,"display","flex"),o(b,"align-items","center"),o(b,"gap","0.5rem"),r(f,"class","main-area svelte-otd61t"),r(a,"class","container svelte-otd61t")},m(s,t){l(s,a,t),c(a,e),c(a,m),c(a,f),c(f,g),c(f,w),c(f,u),c(f,$),c(f,b)},p(s,[a]){1&a&&!i(g.src,h="/macos-web/app-icons/"+s[0]+"/256.webp")&&r(g,"src",h),2&a&&o(g,"transform",s[1])},i:p,o:p,d(s){s&&d(a)}}}function b(s,a,e){let t,n,r;m(s,f,(s=>e(4,r=s)));let{appID:i}=a;const o=g(0,{damping:.28,stiffness:.1});return m(s,o,(s=>e(3,n=s))),h((async()=>{await w(100),u(o,n=1,n)})),s.$$set=s=>{"appID"in s&&e(0,i=s.appID)},s.$$.update=()=>{24&s.$$.dirty&&e(1,t=r?"initial":`rotate(${180*(n+1)}deg) scale(${n}) translateZ(0px)`)},[i,t,o,n,r]}class y extends s{constructor(s){super(),a(this,s,b,$,e,{appID:0})}}export{y as default};
