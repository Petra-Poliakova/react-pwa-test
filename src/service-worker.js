/* eslint-disable no-restricted-globals */

import { clientsClaim } from "workbox-core";
import { ExpirationPlugin } from "workbox-expiration";
import { precacheAndRoute, createHandlerBoundToURL } from "workbox-precaching";
import { registerRoute } from "workbox-routing";
import { StaleWhileRevalidate } from "workbox-strategies";
import { CacheableResponsePlugin } from "workbox-cacheable-response";
import { CacheFirst } from "workbox-strategies";

clientsClaim();

precacheAndRoute(self.__WB_MANIFEST);

const fileExtensionRegexp = new RegExp("/[^/?]+\\.[^/]+$");
registerRoute(({ request, url }) => {
  if (request.mode !== "navigate") {
    return false;
  }

  if (url.pathname.startsWith("/_")) {
    return false;
  }

  if (url.pathname.match(fileExtensionRegexp)) {
    return false;
  }

  return true;
}, createHandlerBoundToURL(process.env.PUBLIC_URL + "/index.html"));

registerRoute(
  ({ url }) =>
    url.origin === self.location.origin && url.pathname.endsWith(".png"),
  new StaleWhileRevalidate({
    cacheName: "images-logo",
    plugins: [new ExpirationPlugin({ maxEntries: 50 })],
  })
);

registerRoute(
  ({ request }) => request.destination === "image",
  new CacheFirst({
    cacheName: "images-cache",
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      new ExpirationPlugin({
        maxAgeSeconds: 7 * 24 * 60 * 60,
        maxEntries: 10,
      }),
    ],
  })
);

// Add your custom route here
registerRoute( "https://jsonplaceholder.typicode.com/posts",
  new StaleWhileRevalidate({
    cacheName: "comments-cache-v3",
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      new ExpirationPlugin({ maxEntries: 10 }), // Will cache a maximum of 100 requests.
    ],
  })
);
registerRoute( "https://users-comments-1e926-default-rtdb.europe-west1.firebasedatabase.app/comments.json",
  new StaleWhileRevalidate({
    cacheName: "commentsFB-cache-v1",
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      new ExpirationPlugin({ maxEntries: 10 }), // Will cache a maximum of 100 requests.
    ],
  })
);

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});


//https://github.com/leomeneguzzi/react-pwa-offline-storage/blob/master/src/App.tsx
//https://github.com/okbrown/okb-react-pwa/tree/master

// Any other custom service worker logic can go here.
 //var CACHE_STATIC_NAME = "static-v1";
 //var CACHE_DYNAMIC_NAME = "dynamic-v1";

// self.addEventListener("install", (event) => {
//   console.log("[Service Worker] Installing Service Worker ...", event);
//   event.waitUntil(
//     caches.open(CACHE_STATIC_NAME).then((cache) => {
//       console.log("[Service Worker] Precaching App Shell");
//       cache.addAll(["/", "/src/app.js"]);
//     })
//   );
// });

// self.addEventListener("activate", (event) => {
//   console.log("[Service Worker] Activating Service Worker ....", event);
//   caches.waitUntil(
//     caches.keys().then((keyList) => {
//       return Promise.all(
//         keyList.map((key) => {
//           if (key !== CACHE_STATIC_NAME && key !== CACHE_DYNAMIC_NAME) {
//             console.log("[Service Worker] Removing old cache.", key);
//             return caches.delete(key);
//           }
//         })
//       );
//     })
//   );
//   return self.clients.claim();
// });

// self.addEventListener("fetch", (event) => {
//   event.respondWith(
//     caches.match(event.request).then((cachedResponse) => {
//       const networkFetch = fetch(event.request)
//         .then((response) => {
//           // update the cache with a clone of the network response
//           const responseClone = response.clone();
//           caches.open(CACHE_DYNAMIC_NAME).then((cache) => {
//             cache.put(event.request.url, responseClone);
//           });
//           return response;
//         })
//         .catch((error) => {
//           console.error("ServiceWorker fetch failed: ", error);
//         });
//       // prioritize cached response over network
//       return cachedResponse || networkFetch;
//     })
//   );
// });
