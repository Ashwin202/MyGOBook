const cacheName = 'v2.7'; // Update the cache version number

// List of resources to cache initially
const initialResources = [
    './',
    // '/app/public/index.html',
    // '/app/public/assets/css/main.css',
    // '/app/public/assets/js/main.js',
    // '/app/public/assets/images/goofy72x72.png',
    // '/app/public/assets/images/goofy128x128.png',
    // '/app/public/assets/images/goofy144x144.png',
    // '/app/public/assets/images/goofy192x192.png',
    // '/app/public/assets/images/goofy512x512.png'
];

// Install event - cache initial resources
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(cacheName).then(cache => {
            return cache.addAll(initialResources).then(() => self.skipWaiting()); // Activate new service worker immediately
        })
    );
});

// Activate event - delete old caches
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

// Fetch event - serve from cache, fetch from network, and cache dynamically
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            if (response) {
                return response; // Serve from cache
            }
            return fetch(event.request).then(networkResponse => {
                return caches.open(cacheName).then(cache => {
                    cache.put(event.request, networkResponse.clone()); // Cache the new resource
                    return networkResponse;
                });
            }).catch(() => {
                // Handle fetch errors here
                if (event.request.mode === 'navigate') {
                    return caches.match('/app/public/index.html'); // Serve a fallback offline page
                }
                return new Response('Offline page goes here');
            });
        })
    );
});
