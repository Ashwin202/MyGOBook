const cacheName = 'v1.8'; // Update the cache version number

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(cacheName).then(cache => {
            return cache.addAll([
                '/',
                '/app/public/index.html',
                '/app/public/assets/css/main.css',
                '/app/public/assets/js/main.js',
                '/app/public/assets/images/goofy72x72.png',
                '/app/public/assets/images/goofy128x128.png',
                '/app/public/assets/images/goofy144x144.png',
                '/app/public/assets/images/goofy192x192.png',
                '/app/public/assets/images/goofy512x512.png'
            ]).then(() => self.skipWaiting()); // Activate new service worker immediately
        })
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(oldCacheName => {
                    if (oldCacheName !== cacheName) {
                        return caches.delete(oldCacheName);
                    }
                })
            );
        }).then(() => self.clients.claim())
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request).catch(() => {
                // Handle fetch errors here
                return new Response('Offline page goes here');
            });
        })
    );
});
