// custom-sw.js

self.addEventListener('fetch', (event) => {
    event.respondWith(
      fetch(event.request)
        .catch(() => {
          // Si no hay conexión, responde con offline.html desde la caché
          return caches.match('/offline.html');
        })
    );
  });
  