// ══════════════════════════════════════════
//  Planner · Service Worker
//  Estrategia: Cache-first + fallback a red
//  Actualiza la caché en cada nueva versión
// ══════════════════════════════════════════

const CACHE_NAME = 'planner-v2';

const ASSETS = [
  './',
  './index.html',
  './output.css',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './fonts/outfit-latin.woff2',
  './fonts/outfit-latin-ext.woff2',
  './fonts/space-mono-400-latin.woff2',
  './fonts/space-mono-700-latin.woff2',
];

// ── INSTALL: precachear assets esenciales ──
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      // Cachear lo que se pueda, ignorar errores en recursos externos
      return Promise.allSettled(
        ASSETS.map(url => cache.add(url).catch(() => {}))
      );
    }).then(() => self.skipWaiting())
  );
});

// ── ACTIVATE: limpiar cachés viejas ──
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      )
    ).then(() => self.clients.claim())
  );
});

// ── FETCH: cache-first, fallback a red ──
self.addEventListener('fetch', event => {
  // Solo interceptar GET
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;

      return fetch(event.request)
        .then(response => {
          // Cachear respuestas válidas (no opacas de CDN externo por seguridad)
          if (
            response &&
            response.status === 200 &&
            response.type === 'basic'
          ) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
          }
          return response;
        })
        .catch(() => {
          // Sin red y sin caché: devolver el index como fallback
          if (event.request.destination === 'document') {
            return caches.match('./index.html');
          }
        });
    })
  );
});
