const CACHE="foursight-v2";
const SHELL=[
"./","./index.html","./style.css","./manifest.json",
"./js/app.js","./js/config.js","./js/state.js","./js/ui.js",
"./js/camera.js","./js/classifier.js","./js/predictor.js",
"./js/serial.js","./js/pwa.js"
];
self.addEventListener("install",e=>{
 e.waitUntil(caches.open(CACHE).then(c=>c.addAll(SHELL)).then(()=>self.skipWaiting()));
});
self.addEventListener("activate",e=>{
 e.waitUntil(caches.keys().then(keys=>Promise.all(keys.map(k=>k!==CACHE&&caches.delete(k)))).then(()=>self.clients.claim()));
});
self.addEventListener("fetch",e=>{
 if(e.request.method!=="GET")return;
 e.respondWith(
   caches.match(e.request).then(r=>r||fetch(e.request).then(resp=>{
      const copy=resp.clone();
      caches.open(CACHE).then(c=>c.put(e.request,copy));
      return resp;
   }))
 );
});
