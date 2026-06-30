/* Service worker de l'Atelier de Fractales.
   Stratégie : « cache d'abord » pour un lancement instantané et hors-ligne.
   Pensez à incrémenter la version à chaque mise à jour des fichiers. */
const CACHE = "fractales-v1";
const ASSETS = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./icon-192.png",
  "./icon-512.png",
  "./icon-maskable-512.png",
  "./apple-touch-icon.png"
];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE).then((c) => c.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  e.respondWith(
    caches.match(req).then((hit) => {
      if (hit) return hit;
      return fetch(req).then((res) => {
        const copy = res.clone();
        caches.open(CACHE).then((c) => {
          try { if (new URL(req.url).origin === location.origin) c.put(req, copy); } catch (_) {}
        });
        return res;
      }).catch(() => caches.match("./index.html"));
    })
  );
});
