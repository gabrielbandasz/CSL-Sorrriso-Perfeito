const CACHE_NAME = "sorriso-perfeito-v1";

const urlsToCache = [
  "./",
  "./index.html",
  "./styles/style.css",
  "./scripts/script.js",
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});