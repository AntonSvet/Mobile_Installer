if(!self.define){let e,s={};const n=(n,i)=>(n=new URL(n+".js",i).href,s[n]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=s,document.head.appendChild(e)}else e=n,importScripts(n),s()})).then((()=>{let e=s[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(i,r)=>{const l=e||("document"in self?document.currentScript.src:"")||location.href;if(s[l])return;let o={};const t=e=>n(e,l),u={module:{uri:l},exports:o,require:t};s[l]=Promise.all(i.map((e=>u[e]||t(e)))).then((e=>(r(...e),o)))}}define(["./workbox-5ffe50d4"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"512x512.png",revision:"c2d04dbfaef8009726a4a6364eb776d4"},{url:"assets/3431--0RgVz4A.png",revision:null},{url:"assets/5130-CnXNu8Ng.png",revision:null},{url:"assets/5230-uXZ1Ve-f.png",revision:null},{url:"assets/5830-B10w0Qi6.png",revision:null},{url:"assets/6270-B9TxF8p8.png",revision:null},{url:"assets/elestaLogo-BqXCN27C.png",revision:null},{url:"assets/index-BOR4CxZ5.css",revision:null},{url:"assets/index-CVetKrbJ.js",revision:null},{url:"assets/s_fonom_2084-Ra2ePGm0.png",revision:null},{url:"index.html",revision:"f240c8ed9d46d2cf04fe741b315744ac"},{url:"manifest.json",revision:"725ed7c14ce05b465c064a26f663d85c"},{url:"registerSW.js",revision:"165fd11b58579bdfdd32fabdb886c91e"},{url:"512x512.png",revision:"c2d04dbfaef8009726a4a6364eb776d4"},{url:"manifest.webmanifest",revision:"d1cba3bbeb41c4acca679d97bf2d3ec7"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
