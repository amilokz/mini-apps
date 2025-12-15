const CACHE_NAME = 'mini-apps-v1';
const OFFLINE_URL = '/index.html';
const FILES_TO_CACHE = [
  '/',
  '/index.html',
  '/style.css',
  '/js/main.js',
  '/js/todo.js',
  '/js/weather.js',
  '/js/calculator.js',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
  'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css',
  'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(FILES_TO_CACHE))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.map(key => key !== CACHE_NAME ? caches.delete(key) : null)
    ))
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  if (e.request.url.includes('openweathermap.org/img/wn/')) {
    e.respondWith(
      caches.open('weather-icons').then(cache => 
        cache.match(e.request).then(resp => 
          resp || fetch(e.request).then(f => { cache.put(e.request, f.clone()); return f; })
        )
      )
    );
    return;
  }

  e.respondWith(
    caches.match(e.request).then(resp => resp || fetch(e.request))
      .catch(() => caches.match(OFFLINE_URL))
  );
});
