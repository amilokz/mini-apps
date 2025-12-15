const CACHE_NAME = 'mini-apps-v2';
const OFFLINE_URL = '/index.html';

// Files to cache
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

// Install event: cache everything
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(FILES_TO_CACHE))
      .then(() => self.skipWaiting())
  );
});

// Activate event: clean old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.map(key => key !== CACHE_NAME ? caches.delete(key) : null)
    ))
  );
  self.clients.claim();
});

// Fetch event: cache-first strategy
self.addEventListener('fetch', event => {

  // Weather icons caching
  if (event.request.url.includes('openweathermap.org/img/wn/')) {
    event.respondWith(
      caches.open('weather-icons').then(cache => 
        cache.match(event.request).then(resp => 
          resp || fetch(event.request).then(fetched => {
            cache.put(event.request, fetched.clone());
            return fetched;
          })
        )
      )
    );
    return;
  }

  // General files
  event.respondWith(
    caches.match(event.request).then(resp => {
      return resp || fetch(event.request)
        .then(fetchResp => {
          // Cache fetched files dynamically
          return caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, fetchResp.clone());
            return fetchResp;
          });
        })
        .catch(() => caches.match(OFFLINE_URL));
    })
  );
});
