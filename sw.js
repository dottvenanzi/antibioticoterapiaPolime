// Network-first: con connessione carica sempre la versione più recente; offline usa la copia salvata.
const CACHE = "amspolime-v27";
const ASSETS = ["./", "./index.html", "./manifest.webmanifest", "./icon-180.png", "./icon-192.png", "./icon-512.png", "./algoritmo-diagnostico-endocarditi.svg", "./algoritmo-terapeutico-endocarditi.svg", "./alg-pneumo-1.webp", "./alg-pneumo-2.webp", "./alg-ivu-1.webp", "./alg-ivu-2.webp", "./alg-sk-1.webp", "./alg-sk-2.webp", "./alg-pd-1.webp", "./alg-pd-2.webp", "./alg-oa-1.webp", "./alg-oa-2.webp", "./alg-gi-1.webp", "./alg-gi-2.webp", "./alg-se-1.webp", "./alg-se-2.webp", "./alg-cns-1.webp", "./alg-cns-2.webp", "./alg-fn-1.webp", "./alg-fn-2.webp", "./alg-ist-1.webp", "./alg-ist-2.webp", "./alg-tc-1.webp", "./alg-tc-2.webp", "./alg-ab-1.webp", "./alg-ab-2.webp", "./alg-ca-1.webp", "./alg-ca-2.webp", "./alg-co-1.webp", "./alg-co-2.webp"];
self.addEventListener("install", (e) => { e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS.map((u) => new Request(u, { cache: "reload" })))).then(() => self.skipWaiting())); });
self.addEventListener("activate", (e) => { e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET") return;
  e.respondWith(
    (e.request.mode === "navigate" ? fetch(e.request.url, { cache: "no-store" }) : fetch(e.request, { cache: "no-store" }))
      .then((res) => { const cp = res.clone(); caches.open(CACHE).then((c) => c.put(e.request, cp)); return res; })
      .catch(() => caches.match(e.request, { ignoreSearch: true }).then((r) => r || caches.match("./index.html")))
  );
});
