// sw.js

const CACHE_NAME = 'tienda-online-cache-v4'; // Incrementa la versión para forzar la actualización
const urlsToCache = [
  './', // Cachear la página principal (index.html)
];

// Instalación: El SW se instala pero no cachea nada de antemano.
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
      .then(() => self.skipWaiting()) // Activa el nuevo SW inmediatamente.
  );
  console.log('[SW] Service Worker instalado (v4)');
});

// Activación: Limpia cachés antiguas.
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            console.log('[SW] Limpiando caché antigua:', cache);
            return caches.delete(cache);
          }
        })
      );
    }).then(() => self.clients.claim()) // ✅ CORRECCIÓN: Usa self.clients para tomar control.
  );
});

// Fetch: Estrategia Network-First con fallback a caché.
self.addEventListener('fetch', event => {
  const { request } = event;

  // Para navegación, siempre intenta la red primero.
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request).catch(() => caches.match('./'))
    );
    return;
  }

  // Para otros recursos (assets), usa Stale-While-Revalidate.
  event.respondWith(
    caches.open(CACHE_NAME).then(cache => {
      return cache.match(request).then(cachedResponse => {
        const fetchPromise = fetch(request).then(networkResponse => {
          cache.put(request, networkResponse.clone());
          return networkResponse;
        });
        return cachedResponse || fetchPromise;
      });
    })
  );
});
