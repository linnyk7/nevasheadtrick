
// Service Worker básico para permitir a instalação do PWA
self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('fetch', (event) => {
  // Necessário para que o navegador considere o app instalável
  event.respondWith(fetch(event.request));
});
