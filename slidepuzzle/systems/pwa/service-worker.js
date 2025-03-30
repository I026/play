const CACHE_NAME = "cache-v1";
const OFFLINE_PAGE = "../../sort/index.html";
const resources = [
    "../../sort/index.html",
    "../css/block.css",
    "../js/slide.js",
    "../imgs/arrow.svg",
    "../imgs/continue.svg",
    "../imgs/favicon.ico",
    "../imgs/hand.svg",
    "../imgs/icon.png",
    "../imgs/ng.svg",
    "../imgs/option.svg",
    "../imgs/retry.svg",
    "../imgs/timer_flame.svg",
    "../imgs/timer_hands.svg",
    "../imgs/trashBoxBase.svg",
    "../imgs/trashBoxLid.svg",
    "../fonts/Outfit-VariableFont_wght.ttf",
    OFFLINE_PAGE
];

// インストール時にキャッシュを追加
self.addEventListener("install", function (event) {
    console.log("Service Worker installing...");
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return Promise.all(
                resources.map((resource) =>
                    fetch(resource)
                        .then((response) => {
                            if (!response.ok) throw new Error("Failed to fetch " + resource);
                            return cache.put(resource, response);
                        })
                        .catch((error) => console.error("Failed to cache:", resource, error))
                )
            );
        })
    );
});

// フェッチ時のキャッシュ対応
self.addEventListener("fetch", function (event) {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return (
                response ||
                fetch(event.request)
                    .then((res) => {
                        if (!res || !res.ok) return res;
                        return caches.open(CACHE_NAME).then((cache) => {
                            if (event.request.method === "GET") {
                                cache.put(event.request, res.clone());
                            }
                            return res;
                        });
                    })
                    .catch(() => caches.match(OFFLINE_PAGE))
            );
        })
    );
});

// 古いキャッシュを削除
self.addEventListener("activate", function (event) {
    console.log("Activating new Service Worker...");
    event.waitUntil(
        caches.keys().then((keyList) => {
            return Promise.all(
                keyList
                    .filter((key) => key !== CACHE_NAME)
                    .map((key) => caches.delete(key))
            );
        })
    );
    return self.clients.claim();
});