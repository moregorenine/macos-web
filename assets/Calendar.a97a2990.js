import{a4 as t,a5 as e,a6 as n,S as s,i as a,s as l,V as r,k as o,W as c,a as i,X as u,n as d,d as f,Y as h,q as m,r as g,l as v,v as p,o as y,a7 as $,a1 as M,y as w,M as q,Z as b,a0 as k,a8 as D,a9 as x,f as T,m as F,w as I,g as L,t as N,c as Y,b as B,j,x as C}from"./index.6e55d6ba.js";function H(s,a){t(2,arguments);var l=e(s),r=n(a);if(isNaN(r))return new Date(NaN);if(!r)return l;var o=l.getDate(),c=new Date(l.getTime());return c.setMonth(l.getMonth()+r+1,0),o>=c.getDate()?c:(l.setFullYear(c.getFullYear(),c.getMonth(),o),l)}function S(t){let e,n=[{viewBox:"0 0 24 24"},{width:"1.2em"},{height:"1.2em"},t[0]],s={};for(let a=0;a<n.length;a+=1)s=r(s,n[a]);return{c(){e=o("svg"),c(e,s)},m(t,n){i(t,e,n),e.innerHTML='<path fill="currentColor" d="M14.71 6.71a.996.996 0 0 0-1.41 0L8.71 11.3a.996.996 0 0 0 0 1.41l4.59 4.59a.996.996 0 1 0 1.41-1.41L10.83 12l3.88-3.88c.39-.39.38-1.03 0-1.41"/>'},p(t,[a]){c(e,s=u(n,[{viewBox:"0 0 24 24"},{width:"1.2em"},{height:"1.2em"},1&a&&t[0]]))},i:d,o:d,d(t){t&&f(e)}}}function P(t,e,n){return t.$$set=t=>{n(0,e=r(r({},e),h(t)))},[e=h(e)]}class W extends s{constructor(t){super(),a(this,t,P,S,l,{})}}function V(t){let e,n=[{viewBox:"0 0 24 24"},{width:"1.2em"},{height:"1.2em"},t[0]],s={};for(let a=0;a<n.length;a+=1)s=r(s,n[a]);return{c(){e=o("svg"),c(e,s)},m(t,n){i(t,e,n),e.innerHTML='<path fill="currentColor" d="M9.29 6.71a.996.996 0 0 0 0 1.41L13.17 12l-3.88 3.88a.996.996 0 1 0 1.41 1.41l4.59-4.59a.996.996 0 0 0 0-1.41L10.7 6.7c-.38-.38-1.02-.38-1.41.01"/>'},p(t,[a]){c(e,s=u(n,[{viewBox:"0 0 24 24"},{width:"1.2em"},{height:"1.2em"},1&a&&t[0]]))},i:d,o:d,d(t){t&&f(e)}}}function X(t,e,n){return t.$$set=t=>{n(0,e=r(r({},e),h(t)))},[e=h(e)]}class Z extends s{constructor(t){super(),a(this,t,X,V,l,{})}}const z=[31,28,31,30,31,30,31,31,30,31,30,31],A=[31,29,31,30,31,30,31,31,30,31,30,31],E=["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],G=42;function J(t,e){const n=[];for(let s=t+1;s<=e;s++)n.push(s);return n}function K(n){const s=function(n){return t(1,arguments),e(n).getMonth()}(n),a=s-1<0?11:s-1,l=(r=function(n){return t(1,arguments),e(n).getFullYear()}(n),r%4==0&&r%100!=0||r%400==0?A:z);var r;const o=function(n){return t(1,arguments),e(n).getDay()}(function(n){t(1,arguments);var s=e(n);return s.setDate(1),s.setHours(0,0,0,0),s}(n)),c=0===o?6:o-1,i=G-l[s]-c;return{daysInPrevMonth:J(l[a]-c,l[a]),daysInThisMonth:J(0,l[s]),daysInNextMonth:J(0,i)}}function O(t,e,n){const s=t.slice();return s[8]=e[n],s}function Q(t,e,n){const s=t.slice();return s[8]=e[n],s}function R(t,e,n){const s=t.slice();return s[8]=e[n],s}function U(t,e,n){const s=t.slice();return s[15]=e[n],s[17]=n,s}function _(t){let e,n,s=t[15]+"";return{c(){e=m("div"),n=b(s),v(e,"class","weekday svelte-1dqp42b"),p(e,"weekend",[5,6].includes(t[17]))},m(t,s){i(t,e,s),y(e,n)},p:d,d(t){t&&f(e)}}}function tt(t,e){let n,s,a,l=e[8]+"";return{key:t,first:null,c(){n=m("div"),s=m("div"),a=b(l),v(s,"class","date-number svelte-1dqp42b"),p(s,"this-month",!1),v(n,"class","day svelte-1dqp42b"),p(n,"today",e[4](e[8],!1)),this.first=n},m(t,e){i(t,n,e),y(n,s),y(s,a)},p(t,s){e=t,4&s&&l!==(l=e[8]+"")&&k(a,l),20&s&&p(n,"today",e[4](e[8],!1))},d(t){t&&f(n)}}}function et(t,e){let n,s,a,l=e[8]+"";return{key:t,first:null,c(){n=m("div"),s=m("div"),a=b(l),v(s,"class","date-number svelte-1dqp42b"),p(s,"this-month",!0),v(n,"class","day svelte-1dqp42b"),p(n,"today",e[4](e[8],!0)),this.first=n},m(t,e){i(t,n,e),y(n,s),y(s,a)},p(t,s){e=t,2&s&&l!==(l=e[8]+"")&&k(a,l),18&s&&p(n,"today",e[4](e[8],!0))},d(t){t&&f(n)}}}function nt(t,e){let n,s,a,l,r=e[8]+"";return{key:t,first:null,c(){n=m("div"),s=m("div"),a=b(r),l=g(),v(s,"class","date-number svelte-1dqp42b"),p(s,"this-month",!1),v(n,"class","day svelte-1dqp42b"),p(n,"today",e[4](e[8],!1)),this.first=n},m(t,e){i(t,n,e),y(n,s),y(s,a),y(n,l)},p(t,s){e=t,1&s&&r!==(r=e[8]+"")&&k(a,r),17&s&&p(n,"today",e[4](e[8],!1))},d(t){t&&f(n)}}}function st(t){let e,n,s,a,l=[],r=new Map,o=[],c=new Map,u=[],h=new Map,w=E,q=[];for(let i=0;i<w.length;i+=1)q[i]=_(U(t,w,i));let b=t[2];const k=t=>t[5](t[8]);for(let i=0;i<b.length;i+=1){let e=R(t,b,i),n=k(e);r.set(n,l[i]=tt(n,e))}let x=t[1];const T=t=>t[5](t[8]);for(let i=0;i<x.length;i+=1){let e=Q(t,x,i),n=T(e);c.set(n,o[i]=et(n,e))}let F=t[0];const I=t=>t[5](t[8]);for(let i=0;i<F.length;i+=1){let e=O(t,F,i),n=I(e);h.set(n,u[i]=nt(n,e))}return{c(){e=m("div");for(let t=0;t<q.length;t+=1)q[t].c();n=g();for(let t=0;t<l.length;t+=1)l[t].c();s=g();for(let t=0;t<o.length;t+=1)o[t].c();a=g();for(let t=0;t<u.length;t+=1)u[t].c();v(e,"class","container svelte-1dqp42b"),p(e,"dark","dark"===t[3].scheme)},m(t,r){i(t,e,r);for(let n=0;n<q.length;n+=1)q[n]&&q[n].m(e,null);y(e,n);for(let n=0;n<l.length;n+=1)l[n]&&l[n].m(e,null);y(e,s);for(let n=0;n<o.length;n+=1)o[n]&&o[n].m(e,null);y(e,a);for(let n=0;n<u.length;n+=1)u[n]&&u[n].m(e,null)},p(t,[n]){20&n&&(b=t[2],l=$(l,n,k,1,t,b,r,e,D,tt,s,R)),18&n&&(x=t[1],o=$(o,n,T,1,t,x,c,e,D,et,a,Q)),17&n&&(F=t[0],u=$(u,n,I,1,t,F,h,e,D,nt,null,O)),8&n&&p(e,"dark","dark"===t[3].scheme)},i:d,o:d,d(t){t&&f(e),M(q,t);for(let e=0;e<l.length;e+=1)l[e].d();for(let e=0;e<o.length;e+=1)o[e].d();for(let e=0;e<u.length;e+=1)u[e].d()}}}function at(t,e,n){let s,a,l,r;w(t,q,(t=>n(3,r=t)));let{selectedDate:o}=e;const c=new Date;return t.$$set=t=>{"selectedDate"in t&&n(6,o=t.selectedDate)},t.$$.update=()=>{64&t.$$.dirty&&n(2,({daysInPrevMonth:s,daysInThisMonth:a,daysInNextMonth:l}=K(o)),s,(n(1,a),n(6,o)),(n(0,l),n(6,o)))},[l,a,s,r,function(t,e){return o.getFullYear()===c.getFullYear()&&e&&o.getMonth()===c.getMonth()&&t===c.getDate()},function(t){return[t,o.getMonth()].join("-")},o]}class lt extends s{constructor(t){super(),a(this,t,at,st,l,{selectedDate:6})}}function rt(t){let e;return{c(){e=m("div")},m(t,n){i(t,e,n)},p:d,i:d,o:d,d(t){t&&f(e)}}}function ot(t){let e;return{c(){e=m("div")},m(t,n){i(t,e,n)},p:d,i:d,o:d,d(t){t&&f(e)}}}function ct(t){let e,n;return e=new lt({props:{selectedDate:t[1]}}),{c(){T(e.$$.fragment)},m(t,s){F(e,t,s),n=!0},p(t,n){const s={};2&n&&(s.selectedDate=t[1]),e.$set(s)},i(t){n||(B(e.$$.fragment,t),n=!0)},o(t){N(e.$$.fragment,t),n=!1},d(t){j(e,t)}}}function it(t){let e;return{c(){e=m("div")},m(t,n){i(t,e,n)},p:d,i:d,o:d,d(t){t&&f(e)}}}function ut(t){let e,n,s,a,l,r,o,c,u,d,h,$,M,w,q,D,H,S,P,V,X,z,A,E,G,J,K=x(t[1],"MMMM")+"",O=x(t[1],"yyyy")+"";q=new W({}),V=new Z({});const Q=[it,ct,ot,rt],R=[];function U(t,e){return"year"===t[0]?0:"month"===t[0]?1:"week"===t[0]?2:3}return z=U(t),A=R[z]=Q[z](t),{c(){e=m("section"),n=m("header"),s=g(),a=m("section"),l=m("div"),r=m("div"),o=m("span"),c=b(K),u=g(),d=m("span"),h=b(O),$=g(),M=m("div"),w=m("button"),T(q.$$.fragment),D=g(),H=m("button"),H.textContent="Today",S=g(),P=m("button"),T(V.$$.fragment),X=g(),A.c(),v(n,"class","app-window-drag-handle titlebar svelte-qnsf2h"),v(o,"class","month svelte-qnsf2h"),v(d,"class","year svelte-qnsf2h"),v(w,"class","svelte-qnsf2h"),v(H,"class","svelte-qnsf2h"),v(P,"class","svelte-qnsf2h"),v(M,"class","control-buttons svelte-qnsf2h"),v(l,"class","calendar-header svelte-qnsf2h"),v(a,"class","main-area svelte-qnsf2h"),v(e,"class","container svelte-qnsf2h"),p(e,"dark","dark"===t[2].scheme)},m(f,m){i(f,e,m),y(e,n),y(e,s),y(e,a),y(a,l),y(l,r),y(r,o),y(o,c),y(r,u),y(r,d),y(d,h),y(l,$),y(l,M),y(M,w),F(q,w,null),y(M,D),y(M,H),y(M,S),y(M,P),F(V,P,null),y(a,X),R[z].m(a,null),E=!0,G||(J=[I(w,"click",t[4]),I(H,"click",t[3]),I(P,"click",t[5])],G=!0)},p(t,[n]){(!E||2&n)&&K!==(K=x(t[1],"MMMM")+"")&&k(c,K),(!E||2&n)&&O!==(O=x(t[1],"yyyy")+"")&&k(h,O);let s=z;z=U(t),z===s?R[z].p(t,n):(L(),N(R[s],1,1,(()=>{R[s]=null})),Y(),A=R[z],A?A.p(t,n):(A=R[z]=Q[z](t),A.c()),B(A,1),A.m(a,null)),(!E||4&n)&&p(e,"dark","dark"===t[2].scheme)},i(t){E||(B(q.$$.fragment,t),B(V.$$.fragment,t),B(A),E=!0)},o(t){N(q.$$.fragment,t),N(V.$$.fragment,t),N(A),E=!1},d(t){t&&f(e),j(q),j(V),R[z].d(),G=!1,C(J)}}}function dt(t,e,n){let s;w(t,q,(t=>n(2,s=t)));let{view:a="month"}=e,l=new Date;return t.$$set=t=>{"view"in t&&n(0,a=t.view)},[a,l,s,function(){n(1,l=new Date)},function(){n(1,l=H(l,-1))},function(){n(1,l=H(l,1))}]}class ft extends s{constructor(t){super(),a(this,t,dt,ut,l,{view:0})}}export{ft as default};
