// sw.js

const CACHE_NAME = 'tienda-online-cache-v1';
// Lista de archivos que componen el "App Shell" y que queremos cachear.
const urlsToCache = [
  '/', // La página principal (index.html)
  '/index.html',
  '/manifest.webmanifest',
  // Aquí deberías añadir tus archivos JS y CSS principales.
  // Las herramientas como Vite generan nombres con hashes, lo cual complica el cacheo manual.
  // Por ahora, nos enfocaremos en lo básico para que sea instalable y funcione.
  // También tus iconos principales:
  '/assets/icons/icon-192x192.png',
  '/assets/icons/icon-512x512.png'
];

// Evento 'install': Se dispara cuando el Service Worker se instala por primera vez.
self.addEventListener('install', (event) => {
  console.log('[SW] Instalando Service Worker...');
  // Esperamos a que la promesa de abrir la caché y añadir los archivos se complete.
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[SW] Abriendo caché y guardando el App Shell');
        return cache.addAll(urlsToCache);
      })
  );
});

// Evento 'fetch': Se dispara cada vez que la aplicación hace una petición de red.
self.addEventListener('fetch', (event) => {
  // Estrategia: Cache-First (Primero busca en caché, si no, va a la red)
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Si encontramos una respuesta en la caché, la devolvemos.
        return response || fetch(event.request);
      })
  );
});
