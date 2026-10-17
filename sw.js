const C='de-v2',F=['./','index.html','manifest.json','icon-192.png','icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(F)));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))));self.clients.claim()});
self.addEventListener('fetch',e=>{const u=new URL(e.request.url);if(e.request.method!=='GET'||u.origin!==location.origin)return;
e.respondWith(fetch(e.request).then(r=>{const cp=r.clone();caches.open(C).then(c=>c.put(e.request,cp));return r}).catch(()=>caches.match(e.request)))});
// إشعارات الرسائل
self.addEventListener('push',e=>{let d={};try{d=e.data?e.data.json():{}}catch(x){}
e.waitUntil(self.clients.matchAll({type:'window',includeUncontrolled:true}).then(l=>{
if(!d.force&&l.some(c=>c.visibilityState==='visible'))return;
return self.registration.showNotification(d.title||'ألماني',{body:d.body||'',icon:'icon-192.png',badge:'icon-192.png',tag:'de-msg',renotify:true,data:{url:d.url||'./'}})}))});
self.addEventListener('notificationclick',e=>{e.notification.close();
e.waitUntil(self.clients.matchAll({type:'window',includeUncontrolled:true}).then(l=>{for(const c of l){if('focus' in c)return c.focus()}return self.clients.openWindow((e.notification.data&&e.notification.data.url)||'./')}))});
