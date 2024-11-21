import{S as t,i as n,s as e,e as o,a as r,g as l,t as a,c,b as i,d as s,h as u,_ as d,u as f,n as p,f as h,m,j as g,k as $,l as b,o as w,p as k,q as v,r as y,v as x,w as D,x as E,y as _,z as A,A as I,B as C,C as M,D as L,E as S,F as B,G as N,H as R,I as H,J as P,K as T,L as j,M as z,N as O,O as V,P as q,Q as W,R as X}from"./index.41716813.js";function Y(t,n,e,o){var r,l=null==(r=o)||"number"==typeof r||"boolean"==typeof r?o:e(o),a=n.get(l);return void 0===a&&(a=t.call(this,o),n.set(l,a)),a}function F(t,n,e){var o=Array.prototype.slice.call(arguments,3),r=e(o),l=n.get(r);return void 0===l&&(l=t.apply(this,o),n.set(r,l)),l}const J=JSON.stringify;function U(){this.cache=Object.create(null)}U.prototype.has=function(t){return t in this.cache},U.prototype.get=function(t){return this.cache[t]},U.prototype.set=function(t,n){this.cache[t]=n};const G=(t,n={})=>{var e,o;let{bounds:r,axis:l="both",gpuAcceleration:a=!0,applyUserSelectHack:c=!0,disabled:i=!1,ignoreMultitouch:s=!1,grid:u,position:d,cancel:f,handle:p,defaultClass:h="neodrag",defaultClassDragging:m="neodrag-dragging",defaultClassDragged:g="neodrag-dragged",defaultPosition:$={x:0,y:0},onDragStart:b,onDrag:w,onDragEnd:k}=n;const v=new Promise(requestAnimationFrame);let y,x,D=!1,E=0,_=0,A=0,I=0,C=0,M=0,{x:L,y:S}=d?{x:null!=(e=null==d?void 0:d.x)?e:0,y:null!=(o=null==d?void 0:d.y)?o:0}:$;et(L,S,t,a);let B,N,R,H,P="",T=!!d;const j=document.body.style,z=t.classList,O=(n,e)=>{const o={offsetX:E,offsetY:_,domRect:t.getBoundingClientRect()};t.dispatchEvent(new CustomEvent(n,{detail:o})),null==e||e(o)},V=addEventListener;V("touchstart",W,!1),V("touchend",X,!1),V("touchmove",Y,!1),V("mousedown",W,!1),V("mouseup",X,!1),V("mousemove",Y,!1),t.style.touchAction="none";const q=()=>{let n=t.offsetWidth/N.width;return isNaN(n)&&(n=1),n};function W(n){if(i)return;if(s&&"touchstart"===n.type&&n.touches.length>1)return;if(z.add(h),R=function(t,n){if(!t)return n;if(t instanceof HTMLElement||Array.isArray(t))return t;const e=n.querySelectorAll(t);if(null===e)throw new Error("Selector passed for `handle` option should be child of the element on which the action is applied");return Array.from(e.values())}(p,t),H=function(t,n){if(!t)return;if(t instanceof HTMLElement||Array.isArray(t))return t;const e=n.querySelectorAll(t);if(null===e)throw new Error("Selector passed for `cancel` option should be child of the element on which the action is applied");return Array.from(e.values())}(f,t),y=/(both|x)/.test(l),x=/(both|y)/.test(l),void 0!==r&&(B=function(t,n){if(t instanceof HTMLElement)return t.getBoundingClientRect();if("object"==typeof t){const{top:n=0,left:e=0,right:o=0,bottom:r=0}=t;return{top:n,right:window.innerWidth-o,bottom:window.innerHeight-r,left:e}}if("parent"===t)return n.parentNode.getBoundingClientRect();const e=document.querySelector(t);if(null===e)throw new Error("The selector provided for bound doesn't exists in the document.");return e.getBoundingClientRect()}(r,t)),N=t.getBoundingClientRect(),Z(p)&&Z(f)&&p===f)throw new Error("`handle` selector can't be same as `cancel` selector");if(nt(H,R))throw new Error("Element being dragged can't be a child of the element on which `cancel` is applied");if((R instanceof HTMLElement?R.contains(n.target):R.some((t=>t.contains(n.target))))&&!nt(H,n.target)&&(D=!0),!D)return;c&&(P=j.userSelect,j.userSelect="none"),O("neodrag:start",b);const{clientX:e,clientY:o}=K(n)?n.touches[0]:n,a=q();y&&(A=e-L/a),x&&(I=o-S/a),B&&(C=e-N.left,M=o-N.top)}function X(){D&&(z.remove(m),z.add(g),c&&(j.userSelect=P),O("neodrag:end",k),y&&(A=E),y&&(I=_),D=!1)}function Y(n){if(!D)return;z.add(m),n.preventDefault(),N=t.getBoundingClientRect();const{clientX:e,clientY:o}=K(n)?n.touches[0]:n;let r=e,l=o;const c=q();if(B){const t={left:B.left+C,top:B.top+M,right:B.right+C-N.width,bottom:B.bottom+M-N.height};r=Q(r,t.left,t.right),l=Q(l,t.top,t.bottom)}if(Array.isArray(u)){let[t,n]=u;if(isNaN(+t)||t<0)throw new Error("1st argument of `grid` must be a valid positive number");if(isNaN(+n)||n<0)throw new Error("2nd argument of `grid` must be a valid positive number");let e=r-A,o=l-I;[e,o]=tt([t/c,n/c],e,o),r=A+e,l=I+o}y&&(E=Math.round((r-A)*c)),x&&(_=Math.round((l-I)*c)),L=E,S=_,O("neodrag",w),v.then((()=>et(E,_,t,a)))}return{destroy:()=>{const t=removeEventListener;t("touchstart",W,!1),t("touchend",X,!1),t("touchmove",Y,!1),t("mousedown",W,!1),t("mouseup",X,!1),t("mousemove",Y,!1)},update:n=>{var e,o,d,$,b,w,k,y,x,D,A;l=n.axis||"both",i=null!=(e=n.disabled)&&e,s=null!=(o=n.ignoreMultitouch)&&o,p=n.handle,r=n.bounds,f=n.cancel,c=null==(d=n.applyUserSelectHack)||d,u=n.grid,a=null==($=n.gpuAcceleration)||$;const I=z.contains(g);z.remove(h,g),h=null!=(b=n.defaultClass)?b:"neodrag",m=null!=(w=n.defaultClassDragging)?w:"neodrag-dragging",g=null!=(k=n.defaultClassDragged)?k:"neodrag-dragged",z.add(h),I&&z.add(g),T&&(L=E=null!=(x=null==(y=n.position)?void 0:y.x)?x:E,S=_=null!=(A=null==(D=n.position)?void 0:D.y)?A:_,v.then((()=>et(E,_,t,a))))}}},K=t=>{var n;return!!(null==(n=t.touches)?void 0:n.length)},Q=(t,n,e)=>Math.min(Math.max(t,n),e),Z=t=>"string"==typeof t,tt=(null!=void 0?undefined:function(t,n){return e=t,o=this,r=1===t.length?Y:F,l=n.cache.create(),a=n.serializer,r.bind(o,e,l,a);var e,o,r,l,a})((([t,n],e,o)=>{const r=(t,n)=>Math.ceil(t/n)*n;return[r(e,t),r(o,n)]}),{cache:null!=void 0?undefined:{create:function(){return new U}},serializer:null!=void 0?undefined:J});function nt(t,n){const e=n instanceof HTMLElement?[n]:n;return t instanceof HTMLElement?e.some((n=>t.contains(n))):!!Array.isArray(t)&&t.some((t=>e.some((n=>t.contains(n)))))}function et(t,n,e,o){e.style.transform=o?`translate3d(${+t}px, ${+n}px, 0)`:`translate(${+t}px, ${+n}px)`}function ot(t,n){return t>n&&([t,n]=[n,t]),t+Math.floor((n-t)*Math.random())}function rt(t){t[8]=t[3].default}function lt(t){t[4]=t[3].default}function at(t){let n,e,l={ctx:t,current:null,token:null,hasCatch:!1,pending:ht,then:pt,catch:ft,value:3,blocks:[,,,]};return u(d((()=>import("./AppStore.e2297216.js")),["assets/AppStore.e2297216.js","assets/AppStore.9aa68d2c.css","assets/index.41716813.js","assets/index.5152ce7f.css"]),l),{c(){n=o(),l.block.c()},m(t,o){r(t,n,o),l.block.m(t,l.anchor=o),l.mount=()=>n.parentNode,l.anchor=n,e=!0},p(n,e){f(l,t=n,e)},i(t){e||(i(l.block),e=!0)},o(t){for(let n=0;n<3;n+=1){const t=l.blocks[n];a(t)}e=!1},d(t){t&&s(n),l.block.d(t),l.token=null,l=null}}}function ct(t){let n,e,l={ctx:t,current:null,token:null,hasCatch:!1,pending:$t,then:gt,catch:mt,value:3,blocks:[,,,]};return u(d((()=>import("./PurusProfile.8b1b09bb.js")),["assets/PurusProfile.8b1b09bb.js","assets/PurusProfile.8ad18b07.css","assets/index.41716813.js","assets/index.5152ce7f.css"]),l),{c(){n=o(),l.block.c()},m(t,o){r(t,n,o),l.block.m(t,l.anchor=o),l.mount=()=>n.parentNode,l.anchor=n,e=!0},p(n,e){t=n},i(t){e||(i(l.block),e=!0)},o(t){for(let n=0;n<3;n+=1){const t=l.blocks[n];a(t)}e=!1},d(t){t&&s(n),l.block.d(t),l.token=null,l=null}}}function it(t){let n,e,l={ctx:t,current:null,token:null,hasCatch:!1,pending:kt,then:wt,catch:bt,value:3,blocks:[,,,]};return u(d((()=>import("./WallpaperSelectorApp.9d694860.js")),["assets/WallpaperSelectorApp.9d694860.js","assets/WallpaperSelectorApp.2749f7e0.css","assets/index.41716813.js","assets/index.5152ce7f.css"]),l),{c(){n=o(),l.block.c()},m(t,o){r(t,n,o),l.block.m(t,l.anchor=o),l.mount=()=>n.parentNode,l.anchor=n,e=!0},p(n,e){t=n},i(t){e||(i(l.block),e=!0)},o(t){for(let n=0;n<3;n+=1){const t=l.blocks[n];a(t)}e=!1},d(t){t&&s(n),l.block.d(t),l.token=null,l=null}}}function st(t){let n,e,l={ctx:t,current:null,token:null,hasCatch:!1,pending:xt,then:yt,catch:vt,value:3,blocks:[,,,]};return u(d((()=>import("./Calculator.0dc3a4f9.js")),["assets/Calculator.0dc3a4f9.js","assets/Calculator.5a14b67a.css","assets/index.41716813.js","assets/index.5152ce7f.css"]),l),{c(){n=o(),l.block.c()},m(t,o){r(t,n,o),l.block.m(t,l.anchor=o),l.mount=()=>n.parentNode,l.anchor=n,e=!0},p(n,e){t=n},i(t){e||(i(l.block),e=!0)},o(t){for(let n=0;n<3;n+=1){const t=l.blocks[n];a(t)}e=!1},d(t){t&&s(n),l.block.d(t),l.token=null,l=null}}}function ut(t){let n,e,l={ctx:t,current:null,token:null,hasCatch:!1,pending:_t,then:Et,catch:Dt,value:3,blocks:[,,,]};return u(d((()=>import("./VSCode.af423f65.js")),["assets/VSCode.af423f65.js","assets/VSCode.13c26945.css","assets/index.41716813.js","assets/index.5152ce7f.css"]),l),{c(){n=o(),l.block.c()},m(t,o){r(t,n,o),l.block.m(t,l.anchor=o),l.mount=()=>n.parentNode,l.anchor=n,e=!0},p(n,e){f(l,t=n,e)},i(t){e||(i(l.block),e=!0)},o(t){for(let n=0;n<3;n+=1){const t=l.blocks[n];a(t)}e=!1},d(t){t&&s(n),l.block.d(t),l.token=null,l=null}}}function dt(t){let n,e,l={ctx:t,current:null,token:null,hasCatch:!1,pending:Ct,then:It,catch:At,value:3,blocks:[,,,]};return u(d((()=>import("./Calendar.34209816.js")),["assets/Calendar.34209816.js","assets/Calendar.e592e301.css","assets/index.41716813.js","assets/index.5152ce7f.css"]),l),{c(){n=o(),l.block.c()},m(t,o){r(t,n,o),l.block.m(t,l.anchor=o),l.mount=()=>n.parentNode,l.anchor=n,e=!0},p(n,e){t=n},i(t){e||(i(l.block),e=!0)},o(t){for(let n=0;n<3;n+=1){const t=l.blocks[n];a(t)}e=!1},d(t){t&&s(n),l.block.d(t),l.token=null,l=null}}}function ft(t){return{c:p,m:p,p:p,i:p,o:p,d:p}}function pt(t){let n,e;return rt(t),n=new t[8]({props:{appID:t[0]}}),{c(){h(n.$$.fragment)},m(t,o){m(n,t,o),e=!0},p(t,e){rt(t);const o={};1&e&&(o.appID=t[0]),n.$set(o)},i(t){e||(i(n.$$.fragment,t),e=!0)},o(t){a(n.$$.fragment,t),e=!1},d(t){g(n,t)}}}function ht(t){return{c:p,m:p,p:p,i:p,o:p,d:p}}function mt(t){return{c:p,m:p,i:p,o:p,d:p}}function gt(t){let n,e;return function(t){t[7]=t[3].default}(t),n=new t[7]({}),{c(){h(n.$$.fragment)},m(t,o){m(n,t,o),e=!0},i(t){e||(i(n.$$.fragment,t),e=!0)},o(t){a(n.$$.fragment,t),e=!1},d(t){g(n,t)}}}function $t(t){return{c:p,m:p,i:p,o:p,d:p}}function bt(t){return{c:p,m:p,i:p,o:p,d:p}}function wt(t){let n,e;return function(t){t[6]=t[3].default}(t),n=new t[6]({}),{c(){h(n.$$.fragment)},m(t,o){m(n,t,o),e=!0},i(t){e||(i(n.$$.fragment,t),e=!0)},o(t){a(n.$$.fragment,t),e=!1},d(t){g(n,t)}}}function kt(t){return{c:p,m:p,i:p,o:p,d:p}}function vt(t){return{c:p,m:p,i:p,o:p,d:p}}function yt(t){let n,e;return function(t){t[5]=t[3].default}(t),n=new t[5]({}),{c(){h(n.$$.fragment)},m(t,o){m(n,t,o),e=!0},i(t){e||(i(n.$$.fragment,t),e=!0)},o(t){a(n.$$.fragment,t),e=!1},d(t){g(n,t)}}}function xt(t){return{c:p,m:p,i:p,o:p,d:p}}function Dt(t){return{c:p,m:p,p:p,i:p,o:p,d:p}}function Et(t){let n,e;return lt(t),n=new t[4]({props:{isBeingDragged:t[1]}}),{c(){h(n.$$.fragment)},m(t,o){m(n,t,o),e=!0},p(t,e){lt(t);const o={};2&e&&(o.isBeingDragged=t[1]),n.$set(o)},i(t){e||(i(n.$$.fragment,t),e=!0)},o(t){a(n.$$.fragment,t),e=!1},d(t){g(n,t)}}}function _t(t){return{c:p,m:p,p:p,i:p,o:p,d:p}}function At(t){return{c:p,m:p,i:p,o:p,d:p}}function It(t){let n,e;return function(t){t[2]=t[3].default}(t),n=new t[2]({}),{c(){h(n.$$.fragment)},m(t,o){m(n,t,o),e=!0},i(t){e||(i(n.$$.fragment,t),e=!0)},o(t){a(n.$$.fragment,t),e=!1},d(t){g(n,t)}}}function Ct(t){return{c:p,m:p,i:p,o:p,d:p}}function Mt(t){let n,e,u,d;const f=[dt,ut,st,it,ct,at],p=[];function h(t,n){return"calendar"===t[0]?0:"vscode"===t[0]?1:"calculator"===t[0]?2:"wallpapers"===t[0]?3:"purus-twitter"===t[0]?4:5}return n=h(t),e=p[n]=f[n](t),{c(){e.c(),u=o()},m(t,e){p[n].m(t,e),r(t,u,e),d=!0},p(t,[o]){let r=n;n=h(t),n===r?p[n].p(t,o):(l(),a(p[r],1,1,(()=>{p[r]=null})),c(),e=p[n],e?e.p(t,o):(e=p[n]=f[n](t),e.c()),i(e,1),e.m(u.parentNode,u))},i(t){d||(i(e),d=!0)},o(t){a(e),d=!1},d(t){p[n].d(t),t&&s(u)}}}function Lt(t,n,e){let{appID:o}=n,{isBeingDragged:r}=n;return t.$$set=t=>{"appID"in t&&e(0,o=t.appID),"isBeingDragged"in t&&e(1,r=t.isBeingDragged)},[o,r]}class St extends t{constructor(t){super(),n(this,t,Lt,Mt,e,{appID:0,isBeingDragged:1})}}function Bt(t){let n,e;return{c(){n=$("svg"),e=$("path"),b(e,"stroke","#000"),b(e,"stroke-width","1.2"),b(e,"stroke-linecap","round"),b(e,"d","M1.182 5.99L5.99 1.182m0 4.95L1.182 1.323"),b(n,"width","7"),b(n,"height","7"),b(n,"fill","none"),b(n,"xmlns","http://www.w3.org/2000/svg")},m(t,o){r(t,n,o),w(n,e)},p:p,i:p,o:p,d(t){t&&s(n)}}}class Nt extends t{constructor(t){super(),n(this,t,null,Bt,e,{})}}function Rt(t){let n,e,o;return{c(){n=$("svg"),e=$("circle"),o=$("path"),b(e,"cx","6.44"),b(e,"cy","6.44"),b(e,"r","6.44"),b(e,"fill","none"),b(o,"d","M6.5,3.34V9.66M9.66,6.5H3.34"),b(o,"fill","none"),b(o,"stroke","black"),b(o,"stroke-linecap","round"),b(o,"strok-linejoin","round"),b(o,"stroke-width","1.5"),b(n,"xmlns","http://www.w3.org/2000/svg"),b(n,"viewBox","0 0 12.88 12.88")},m(t,l){r(t,n,l),w(n,e),w(n,o)},p:p,i:p,o:p,d(t){t&&s(n)}}}class Ht extends t{constructor(t){super(),n(this,t,null,Rt,e,{})}}function Pt(t){let n,e,o;return{c(){n=$("svg"),e=$("path"),o=$("circle"),b(e,"d","M4.871 3.553L9.37 8.098V3.553H4.871zm3.134 5.769L3.506 4.777v4.545h4.499z"),b(o,"cx",6.438),b(o,"cy",6.438),b(o,"r",6.438),b(o,"fill","none"),b(n,"viewBox","0 0 13 13"),b(n,"xmlns","http://www.w3.org/2000/svg"),b(n,"fill-rule","evenodd"),b(n,"clip-rule","evenodd"),b(n,"stroke-linejoin","round"),b(n,"stroke-miterlimit","2")},m(t,l){r(t,n,l),w(n,e),w(n,o)},p:p,i:p,o:p,d(t){t&&s(n)}}}class Tt extends t{constructor(t){super(),n(this,t,null,Pt,e,{})}}function jt(t){let n,e;return n=new Tt({}),{c(){h(n.$$.fragment)},m(t,o){m(n,t,o),e=!0},i(t){e||(i(n.$$.fragment,t),e=!0)},o(t){a(n.$$.fragment,t),e=!1},d(t){g(n,t)}}}function zt(t){let n,e;return n=new Ht({}),{c(){h(n.$$.fragment)},m(t,o){m(n,t,o),e=!0},i(t){e||(i(n.$$.fragment,t),e=!0)},o(t){a(n.$$.fragment,t),e=!1},d(t){g(n,t)}}}function Ot(t){let n,e,u,d;const f=[zt,jt],p=[];function h(t,n){return t[0]?0:1}return n=h(t),e=p[n]=f[n](t),{c(){e.c(),u=o()},m(t,e){p[n].m(t,e),r(t,u,e),d=!0},p(t,[o]){let r=n;n=h(t),n!==r&&(l(),a(p[r],1,1,(()=>{p[r]=null})),c(),e=p[n],e||(e=p[n]=f[n](t),e.c()),i(e,1),e.m(u.parentNode,u))},i(t){d||(i(e),d=!0)},o(t){a(e),d=!1},d(t){p[n].d(t),t&&s(u)}}}function Vt(t,n,e){let{expandable:o}=n;return t.$$set=t=>{"expandable"in t&&e(0,o=t.expandable)},[o]}class qt extends t{constructor(t){super(),n(this,t,Vt,Ot,e,{expandable:0})}}function Wt(t){let n,e;return{c(){n=$("svg"),e=$("path"),b(e,"stroke","#000"),b(e,"stroke-width",2),b(e,"stroke-linecap","round"),b(e,"d","M.61.703h5.8"),b(n,"width",6),b(n,"height",1),b(n,"fill","none"),b(n,"xmlns","http://www.w3.org/2000/svg")},m(t,o){r(t,n,o),w(n,e)},p:p,i:p,o:p,d(t){t&&s(n)}}}class Xt extends t{constructor(t){super(),n(this,t,null,Wt,e,{})}}function Yt(t){let n,e,o,l,c,u,d,f,p,$,_,A;return o=new Nt({}),u=new Xt({}),p=new qt({props:{expandable:k[t[0]].expandable}}),{c(){n=v("div"),e=v("button"),h(o.$$.fragment),l=y(),c=v("button"),h(u.$$.fragment),d=y(),f=v("button"),h(p.$$.fragment),b(e,"class","close-light svelte-ds4wcb"),b(c,"class","minimize-light svelte-ds4wcb"),b(f,"class","stretch-light svelte-ds4wcb"),b(n,"class","container svelte-ds4wcb"),x(n,"unfocused",t[1]!==t[0])},m(a,i){r(a,n,i),w(n,e),m(o,e,null),w(n,l),w(n,c),m(u,c,null),w(n,d),w(n,f),m(p,f,null),$=!0,_||(A=[D(e,"click",t[2]),D(f,"click",t[3])],_=!0)},p(t,[e]){const o={};1&e&&(o.expandable=k[t[0]].expandable),p.$set(o),(!$||3&e)&&x(n,"unfocused",t[1]!==t[0])},i(t){$||(i(o.$$.fragment,t),i(u.$$.fragment,t),i(p.$$.fragment,t),$=!0)},o(t){a(o.$$.fragment,t),a(u.$$.fragment,t),a(p.$$.fragment,t),$=!1},d(t){t&&s(n),g(o),g(u),g(p),_=!1,E(A)}}}function Ft(t,n,e){let o;_(t,A,(t=>e(1,o=t)));let{appID:r}=n;const l=I();return t.$$set=t=>{"appID"in t&&e(0,r=t.appID)},[r,o,function(){l("close-app")},function(){l("maximize-click")}]}class Jt extends t{constructor(t){super(),n(this,t,Ft,Yt,e,{appID:0})}}function Ut(t){let n,e,o,l,c,u,d,f,p,$,k,_=+t[8]/t[9]+"rem",A=+t[7]/t[9]+"rem";return o=new Jt({props:{appID:t[0]}}),o.$on("maximize-click",t[13]),o.$on("close-app",t[14]),u=new St({props:{appID:t[0],isBeingDragged:t[4]}}),{c(){n=v("section"),e=v("div"),h(o.$$.fragment),c=y(),h(u.$$.fragment),b(e,"class",l="tl-container "+t[0]+" svelte-1i00edk"),b(n,"class","container svelte-1i00edk"),b(n,"tabindex","-1"),x(n,"dark","dark"===t[6].scheme),x(n,"active",t[1]===t[0]),C(n,"width",_),C(n,"height",A),C(n,"z-index",t[5][t[0]])},m(l,a){r(l,n,a),w(n,e),m(o,e,null),w(n,c),m(u,n,null),t[18](n),p=!0,$||(k=[M(L.call(null,e,"window-traffic-lights")),M(d=G.call(null,n,{defaultPosition:t[10],handle:".app-window-drag-handle",bounds:{bottom:-6e3,top:27.2,left:-6e3,right:-6e3},disabled:!t[2],gpuAcceleration:!1,onDragStart:t[15],onDragEnd:t[16]})),D(n,"click",t[11]),D(n,"keydown",Gt)],$=!0)},p(t,[r]){const a={};1&r&&(a.appID=t[0]),o.$set(a),(!p||1&r&&l!==(l="tl-container "+t[0]+" svelte-1i00edk"))&&b(e,"class",l);const c={};1&r&&(c.appID=t[0]),16&r&&(c.isBeingDragged=t[4]),u.$set(c),d&&S(d.update)&&4&r&&d.update.call(null,{defaultPosition:t[10],handle:".app-window-drag-handle",bounds:{bottom:-6e3,top:27.2,left:-6e3,right:-6e3},disabled:!t[2],gpuAcceleration:!1,onDragStart:t[15],onDragEnd:t[16]}),(!p||64&r)&&x(n,"dark","dark"===t[6].scheme),(!p||3&r)&&x(n,"active",t[1]===t[0]),33&r&&C(n,"z-index",t[5][t[0]])},i(t){p||(i(o.$$.fragment,t),i(u.$$.fragment,t),f&&f.end(1),p=!0)},o(e){a(o.$$.fragment,e),a(u.$$.fragment,e),f=B(n,t[12],{}),p=!1},d(e){e&&s(n),g(o),g(u),t[18](null),e&&f&&f.end(),$=!1,E(k)}}}const Gt=()=>{};function Kt(t,n,e){let o,r,l,a,c,i,s,u;_(t,N,(t=>e(4,o=t))),_(t,R,(t=>e(21,r=t))),_(t,H,(t=>e(22,l=t))),_(t,P,(t=>e(23,a=t))),_(t,A,(t=>e(1,c=t))),_(t,T,(t=>e(17,i=t))),_(t,j,(t=>e(5,s=t))),_(t,z,(t=>e(6,u=t)));let d,f,{appID:p}=n,h=!0,m=!1;const{height:g,width:$}=k[p],b=1.2*+g>=window.innerHeight?24:16,w=ot(-600,600),v=ot(-100,100);let y={x:(document.body.clientWidth/2+w)/2,y:(100+v)/2};function x(){V(A,c=p,c)}return O((()=>null==f?void 0:f.focus())),t.$$set=t=>{"appID"in t&&e(0,p=t.appID)},t.$$.update=()=>{131075&t.$$.dirty&&c===p&&V(j,s[p]=i,s)},[p,c,h,f,o,s,u,g,$,b,y,x,function(t,{duration:n=(a?0:300)}={}){const e=getComputedStyle(t).transform;return{duration:n,easing:q,css:t=>`opacity: ${t}; transform: ${e} scale(${t})`}},async function(){a||e(3,f.style.transition="height 0.3s ease, width 0.3s ease, transform 0.3s ease",f),m?(e(2,h=!0),e(3,f.style.transform=d,f),e(3,f.style.width=+$/b+"rem",f),e(3,f.style.height=+g/b+"rem",f)):(e(2,h=!1),d=f.style.transform,e(3,f.style.transform="translate(0px, 0px)",f),e(3,f.style.width="100%",f),e(3,f.style.height="calc(100vh - 1.7rem)",f)),m=!m,V(R,r[p]=m,r),await W(300),a||e(3,f.style.transition="",f)},function(){V(H,l[p]=!1,l),V(R,r[p]=!1,r)},function(){x(),V(N,o=!0,o)},function(){V(N,o=!1,o)},i,function(t){X[t?"unshift":"push"]((()=>{f=t,e(3,f)}))}]}class Qt extends t{constructor(t){super(),n(this,t,Kt,Ut,e,{appID:0})}}export{Qt as default};