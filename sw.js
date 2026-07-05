/*
 * Service Worker：把应用外壳全部缓存下来，实现「首访之后彻底离线可用」。
 * 缓存名带版本号；改动内容时提升 CACHE 版本，旧缓存会在 activate 时清掉，
 * 保证纠错后的卡片能推到老用户（解决「一条错解释被永久焊死」的问题）。
 */
var CACHE = "crux-v1";
var SHELL = [
  "./",
  "./index.html",
  "./cards.js",
  "./manifest.webmanifest",
  "./icon.svg"
];

self.addEventListener("install", function (e) {
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE).then(function (c) {
      return c.addAll(SHELL);
    })
  );
});

self.addEventListener("activate", function (e) {
  e.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(
        keys.map(function (k) {
          if (k !== CACHE) {
            return caches.delete(k);
          }
          return null;
        })
      );
    }).then(function () {
      return self.clients.claim();
    })
  );
});

// 外壳资源走「缓存优先」：离线也能开；在线时后台顺手更新缓存
self.addEventListener("fetch", function (e) {
  if (e.request.method !== "GET") {
    return;
  }
  e.respondWith(
    caches.match(e.request).then(function (hit) {
      var fetchPromise = fetch(e.request).then(function (resp) {
        if (resp && resp.status === 200 && resp.type === "basic") {
          var copy = resp.clone();
          caches.open(CACHE).then(function (c) { c.put(e.request, copy); });
        }
        return resp;
      }).catch(function () {
        return hit;
      });
      return hit || fetchPromise;
    })
  );
});
