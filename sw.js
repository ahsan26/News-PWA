self.addEventListener("install", event => {
    console.log("[Service Worker] Installed", event);
});

self.addEventListener("activate", event => {
    console.log("[Serice Worker] is Activated", event);
});

self.addEventListener("fetch", event => {
    console.log("App trying to fetch", event);
    event.respondWith(fetch(event.request));
})