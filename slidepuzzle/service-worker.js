const CACHE_NAME = "cache-v1";
const resources = [
    "/align_the_numbers",
    "/medias"
];

// インストール時にキャッシュを追加
self.addEventListener("install", function (event) {
    console.log("Service Worker installing...");
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then((cache) => {
            console.log("Adding resources to cache");
            return cache.addAll(resources);
        })
        .catch((error) => {
            console.error("Failed to cache resources:", error);
        })
    );
});

// フェッチ時のキャッシュ対応
self.addEventListener("fetch", function (event) {
    console.log("Fetching:", event.request.url);
    event.respondWith(
        caches.match(event.request)
        .then((response) => {
            if (response) {
                return response;
            }
            return fetch(event.request)
            .then((res) => {
                return caches.open(CACHE_NAME)
                .then((cache) => {
                    if (event.request.method === "GET") {
                        console.log("Caching new resource:", event.request.url);
                        cache.put(event.request, res.clone());
                    }
                    return res;
                });
            })
            .catch(() => {
                console.warn("Fetch failed and no cache available.");
            });
        })
    );
});

// 古いキャッシュを削除
self.addEventListener("activate", function (event) {
    console.log("Activating new Service Worker...");
    event.waitUntil(
        caches.keys().then((keyList) => {
            return Promise.all(
                keyList.map((key) => {
                    if (key !== CACHE_NAME) {
                        console.log("Deleting old cache:", key);
                        return caches.delete(key);
                    }
                })
            );
        })
    );
    return self.clients.claim();
});