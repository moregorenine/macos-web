if(!self.define){let e,s={};const i=(i,a)=>(i=new URL(i+".js",a).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(a,r)=>{const c=e||("document"in self?document.currentScript.src:"")||location.href;if(s[c])return;let n={};const o=e=>i(e,c),l={module:{uri:c},exports:n,require:o};s[c]=Promise.all(a.map((e=>l[e]||o(e)))).then((e=>(r(...e),n)))}}define(["./workbox-cfca65bb"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"assets/AppStore.7f234ab9.js",revision:null},{url:"assets/AppStore.9aa68d2c.css",revision:null},{url:"assets/Calculator.5a14b67a.css",revision:null},{url:"assets/Calculator.7afa04b7.js",revision:null},{url:"assets/Calendar.e592e301.css",revision:null},{url:"assets/Calendar.f238bd4f.js",revision:null},{url:"assets/index.5152ce7f.css",revision:null},{url:"assets/index.9589d4ae.js",revision:null},{url:"assets/latin-ext-300.081d5fa9.css",revision:null},{url:"assets/latin-ext-400.670d007a.css",revision:null},{url:"assets/latin-ext-500.90471e2e.css",revision:null},{url:"assets/latin-ext-600.ac423e2a.css",revision:null},{url:"assets/PurusProfile.007e9848.js",revision:null},{url:"assets/PurusProfile.8ad18b07.css",revision:null},{url:"assets/VSCode.13c26945.css",revision:null},{url:"assets/VSCode.a9ea2cf8.js",revision:null},{url:"assets/WallpaperSelectorApp.2749f7e0.css",revision:null},{url:"assets/WallpaperSelectorApp.31eb1c8b.js",revision:null},{url:"assets/Window.0047856d.css",revision:null},{url:"assets/Window.b15f60be.js",revision:null},{url:"assets/workbox-window.prod.es5.fb541039.js",revision:null},{url:"google7cdade01e9ae4685.html",revision:"b0e9ee7ab83d994b57dbc69a6698aa3c"},{url:"index.html",revision:"985796124a626e805fa7e2f7e5449506"},{url:"robots.txt",revision:"61c27d2cd39a713f7829422c3d9edcc7"},{url:"app-icons/finder/32.png",revision:"2fb1eb1436e800697bdbfc9a9aeef4d4"},{url:"cover-image.png",revision:"c6820bee0a99a8539730c18f784a03fb"},{url:"app-icons/finder/128.png",revision:"73215bca0bed1a7d44257f9f25387d41"},{url:"app-icons/finder/192.png",revision:"df6f4acd5578bc692684f7dd24317e55"},{url:"app-icons/finder/256.png",revision:"6128bbc66c3e74c39acba3230a7e1355"},{url:"app-icons/finder/512.png",revision:"e240c0bc5e8e9cefe4017daa4ba56393"},{url:"cursors/busy.webp",revision:"a5392d7612acd3be2f1952e05a2204c2"},{url:"cursors/link-select.svg",revision:"8d38b74f17f1bd68bb2d01361c9cbb48"},{url:"cursors/normal-select.svg",revision:"07d56961424c4631da8b5c9759e522d0"},{url:"cursors/text-select.svg",revision:"1f891e133089c7d9836b102a900bcd9f"},{url:"cursors/working-in-background.webp",revision:"488164427d7520fa6e5e20ebe1d9a8b2"},{url:"purus-profile/puru.webp",revision:"2198c9c567ceb399bde586b340eb9a3d"},{url:"sounds/mac-startup-sound.mp3",revision:"8322c02924a4015dd46c57ff0cbb7a2c"},{url:"app-icons/appstore/128.webp",revision:"f3a7877ae5116f62c12c832243f2bd33"},{url:"app-icons/appstore/256.webp",revision:"45c408f207611ffdcd6430c79a47fad4"},{url:"app-icons/calculator/128.webp",revision:"b64ae2adef55d43b9813e08b51800f12"},{url:"app-icons/calculator/256.webp",revision:"e8cafc3b81b471d26d4143a916cf5424"},{url:"app-icons/calendar/128.webp",revision:"c9954f8995b6b4d2ab76dd5c884bae46"},{url:"app-icons/calendar/256.webp",revision:"4585a739a1a8287ce8551fb606f88f17"},{url:"app-icons/devutils/256.webp",revision:"2a5c9cfc2b1faeca342047ed151cd689"},{url:"app-icons/facetime/128.webp",revision:"13dd255264f7769cc920e39434beab22"},{url:"app-icons/facetime/256.webp",revision:"89564884d8ed417728fb1eae29d15996"},{url:"app-icons/finder/128.webp",revision:"c3988f1944deaaccb8d06ec86d92be21"},{url:"app-icons/finder/256.webp",revision:"c13d4d93852d91433696dd6bb86756d1"},{url:"app-icons/folder/256.webp",revision:"d72df395ca6157b7bbc3d264d4ec78c5"},{url:"app-icons/mail/128.webp",revision:"6bddba38eacf35741c805539637f40ef"},{url:"app-icons/mail/256.webp",revision:"c6c68048c8ccfc31c5a84a2473f24645"},{url:"app-icons/messages/128.webp",revision:"86939f534072b7e94154961dc0360d29"},{url:"app-icons/messages/256.webp",revision:"4948d3da2dd95fe597b6a73a0b1eda70"},{url:"app-icons/photos/128.webp",revision:"5a54fa305a7715f741ffe0c1eae0a75d"},{url:"app-icons/photos/256.webp",revision:"82ae64a41960485f764d55c695d21a91"},{url:"app-icons/purus-twitter/128.webp",revision:"877506b16918fdb8f583f56d9891172c"},{url:"app-icons/purus-twitter/256.webp",revision:"89d8dc4e5b268cd65dded54035e743d1"},{url:"app-icons/safari/128.webp",revision:"fde8ee84bea8296e3139bd452fd46c2a"},{url:"app-icons/safari/256.webp",revision:"dcad5cf166840e529ea7b1db27a3bc69"},{url:"app-icons/system-preferences/128.webp",revision:"1a4624efc5d116c9c6b1db7c27302391"},{url:"app-icons/system-preferences/256.webp",revision:"c93d775a0a0ff2ffa6ef0bc3bb3da588"},{url:"app-icons/ukraine/256.webp",revision:"e04921aeae10dfa5caedbdd9c66a0c9d"},{url:"app-icons/vercel/256.webp",revision:"dfd2b4ec33c07adb761517f0290357af"},{url:"app-icons/vscode/128.webp",revision:"58e57b67cabab0acf02e1923b9e5a727"},{url:"app-icons/vscode/256.webp",revision:"170761d33418581b54c697083714a880"},{url:"app-icons/wallpapers/256.webp",revision:"8834447c7fe0b16df889e7dfcbff7608"},{url:"app-icons/view-source/128.webp",revision:"6524f4e574dd47281e5725d0e8224699"},{url:"app-icons/view-source/256.webp",revision:"524dacb76149af43b75c318299b25861"},{url:"manifest.webmanifest",revision:"3bada720fb93b62cd9fb00364867bc4e"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html"))),e.registerRoute(/^https:\/\/fonts\.googleapis\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-cache",plugins:[new e.ExpirationPlugin({maxEntries:10,maxAgeSeconds:31536e3}),new e.CacheableResponsePlugin({statuses:[0,200]})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.gstatic\.com\/.*/i,new e.CacheFirst({cacheName:"gstatic-fonts-cache",plugins:[new e.ExpirationPlugin({maxEntries:10,maxAgeSeconds:31536e3}),new e.CacheableResponsePlugin({statuses:[0,200]})]}),"GET")}));
