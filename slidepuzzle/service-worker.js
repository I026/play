self.addEventListener("fetch", (event) => {
    console.log(event);
});

// バージョン
const CACHE_VERSION = "1";
const DISP_VERSION = "D1";

// キャッシュ対象ディレクトリ
const resources = [
    "/align_the_numbers",
    "/medias"
];

// キャッシュ追加
self.addEventListener("install", function (event) {
    console.log("ServiceWorkerInstall");
    event.waitUntil(
        caches.open(CACHE_VERSION)
        .then(function (cache) {
            console.log("cache.addAll");
            cache.addAll(resources);
        })
    );
});
// キャッシュ表示
self.addEventListener("fetch", function (event) {
    console.log("ServiceWorkerFetch");
    event.respondWith(
    // キャッシュが存在するか確認
    caches.match(event.request)
        .then(function (response) {
        if (response) {
            return response;
        } else {
            // キャッシュがないならキャッシュを追加
            return fetch(event.request)
            .then(function (res) {
                return caches.open(DISP_VERSION)
                .then(function (cache) {
                    console.log("cache.put");
                    cache.put(event.request.url, res.clone());
                    return res;
                });
            })
            .catch(function () {
                // 何もしない
            });
        }
        })
  );
});
// 古いキャッシュ削除
self.addEventListener("activate", function (event) {
    console.log("activateServiceWorker");
    event.waitUntil(
    caches.keys()
        .then(function (keyList) {
        return Promise.all(keyList.map(function (key) {
            if (key !== CACHE_VERSION && key !== DISP_VERSION) {
            console.log("cache.delete");
            return caches.delete(key);
            }
        }));
        })
    );
    return self.clients.claim();
});
