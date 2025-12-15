const CACHE_NAME = 'mini-apps-v2';
const OFFLINE_URL = 'index.html'; // relative path for GitHub Pages

const FILES_TO_CACHE = [
  "index.html",
  "style.css",
  "js/main.js",
  "js/todo.js",
  "js/weather.js",
  "js/calculator.js",
  "icons/icon-192.png",
  "icons/icon-512.png",
  "favicon/favicon-96x96.png",
  "favicon/favicon.svg",
  "favicon/favicon.ico",
  "favicon/apple-touch-icon.png"
];


self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(FILES_TO_CACHE))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.map(key => key !== CACHE_NAME ? caches.delete(key) : null)
    ))
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
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

  event.respondWith(
    caches.match(event.request).then(resp => {
      return resp || fetch(event.request)
        .then(fetchResp => {
          return caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, fetchResp.clone());
            return fetchResp;
          });
        })
        .catch(() => caches.match(OFFLINE_URL));
    })
  );
});
