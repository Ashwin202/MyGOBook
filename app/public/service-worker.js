self.addEventListener('install', event => {
    event.waitUntil(
      caches.open('static-cache').then(cache => {
        return cache.addAll([
          '/',
          '/index.html',
          '/assets/css/styles.css',
          '/assets/js/main.js',
          '/assets/images/goofy72x72.png',
          '/assets/images/goofy128x128.png',
          '/assets/images/goofy144x144.png',
          '/assets/images/goofy192x192.png',
          '/assets/images/goofy512x512.png'
          
        ]);
      })
    );
  });
  
  self.addEventListener('fetch', event => {
    event.respondWith(
      caches.match(event.request).then(response => {
        return response || fetch(event.request);
      })
    );
  });
  