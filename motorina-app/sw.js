/* Service worker: aplicația funcționează și fără internet. */
const VERSION = 'dieselog-v1';
const SHELL = [
  './', 'index.html', 'styles.css', 'fonts.css', 'app.js', 'manifest.webmanifest',
  'icons/icon.svg', 'icons/icon-192.png', 'icons/icon-512.png', 'icons/icon-maskable-512.png', 'icons/apple-touch-icon.png',
  'fonts/Manrope-400-800-latin.woff2', 'fonts/Manrope-400-800-latin-ext.woff2',
  'fonts/JetBrainsMono-500-latin.woff2', 'fonts/JetBrainsMono-500-latin-ext.woff2',
  'fonts/JetBrainsMono-700-latin.woff2', 'fonts/JetBrainsMono-700-latin-ext.woff2',
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(VERSION).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k)))).then(() => self.clients.claim())
  );
});

// Rețea întâi pentru pagină/cod (primești mereu ultima versiune), cache ca rezervă offline.
self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;
  const isFont = req.url.includes('/fonts/') || req.url.includes('/icons/');
  e.respondWith(
    isFont
      ? caches.match(req).then((hit) => hit || fetch(req))
      : fetch(req)
          .then((res) => { const copy = res.clone(); caches.open(VERSION).then((c) => c.put(req, copy)); return res; })
          .catch(() => caches.match(req, { ignoreSearch: true }).then((hit) => hit || caches.match('index.html')))
  );
});
