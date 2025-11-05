// sw.js

const CACHE_NAME = 'app-cache-v1';

// ✅ Extensiones típicas del build de Vite
const ASSET_REGEX = /\.(css|js|woff2?|json|png|jpg|jpeg|svg|webp|ico)$/;

// ✅ Caché al instalar
self.addEventListener('install', (event) => {
  self.skipWaiting();
});

// ✅ Activación inmediata
self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim());
});

// ✅ Estrategia híbrida:
// - Para navegación React SPA → network-first con fallback
// - Para assets (CSS/JS/IMG generados por Vite) → cache-first
self.addEventListener('fetch', (event) => {
  const req = event.request;
  const url = new URL(req.url);

  // ✅ 1. Si es navegación (React, rutas de SPA)
  if (req.mode === 'navigate') {
    return event.respondWith(
      fetch(req).catch(() => caches.match('/index.html'))
    );
  }

  // ✅ 2. Si es asset del build (main-xxxx.js, style-xxxx.css, imágenes, etc.)
  if (ASSET_REGEX.test(url.pathname)) {
    return event.respondWith(
      caches.match(req).then(cacheRes => {
        return cacheRes || fetch(req).then(networkRes => {
          return caches.open(CACHE_NAME).then(cache => {
            cache.put(req, networkRes.clone());
            return networkRes;
          });
        });
      })
    );
  }

  // ✅ 3. Para cualquier otro recurso → network-first con fallback caché
  event.respondWith(
    fetch(req).catch(() => caches.match(req))
  );
});
