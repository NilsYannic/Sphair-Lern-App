// Offline-Unterstützung: App-Dateien zwischenspeichern
const CACHE = 'sphair-coach-v10';
const FILES = [
  './', 'index.html', 'css/style.css', 'manifest.webmanifest',
  'js/store.js', 'js/content.js', 'js/checklists.js', 'js/schule.js', 'js/kontrollfragen.js', 'js/lernplan.js', 'js/heft.js', 'js/trainers.js', 'js/coach.js', 'js/multitask.js', 'js/app.js', 'js/vendor/anthropic-sdk.mjs',
  'icons/icon.svg', 'icons/icon-180.png', 'icons/icon-192.png', 'icons/icon-512.png',
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(FILES)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// Zuerst Netzwerk (damit Updates sofort ankommen), sonst Cache
self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url);
  if (e.request.method !== 'GET' || url.origin !== location.origin) return;
  e.respondWith(
    fetch(e.request)
      .then((res) => {
        const copy = res.clone();
        caches.open(CACHE).then((c) => c.put(e.request, copy));
        return res;
      })
      .catch(() => caches.match(e.request, { ignoreSearch: true }).then((r) => r || caches.match('index.html')))
  );
});
