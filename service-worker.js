"use strict";var precacheConfig=[["client.c994aa7b.js","dad1be3392081b78f5f621f54c1920b8"],["icon_128x128.a91f3d4157c510f28a8ce7b1a61148ce.png","a91f3d4157c510f28a8ce7b1a61148ce"],["icon_192x192.df37aff37f76f8cae147f826ecf04bdf.png","df37aff37f76f8cae147f826ecf04bdf"],["icon_256x256.09981498241806b1c1b42ad75142e944.png","09981498241806b1c1b42ad75142e944"],["icon_384x384.508797dc29d45eeec835289585be25bf.png","508797dc29d45eeec835289585be25bf"],["icon_512x512.c4147fc645b72dfb88bcd715c46f9b66.png","c4147fc645b72dfb88bcd715c46f9b66"],["icon_96x96.502af68542a890f9d853a2caebc973b3.png","502af68542a890f9d853a2caebc973b3"],["index.html","b1a1615cd907d2b17bed1c2581d4fefd"],["manifest.48140e924c9c5b088845a7f4313cc021.json","48140e924c9c5b088845a7f4313cc021"]],cacheName="sw-precache-v3-shipment-creator-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,n){var t=new URL(e);return"/"===t.pathname.slice(-1)&&(t.pathname+=n),t.toString()},cleanResponse=function(e){return e.redirected?("body"in e?Promise.resolve(e.body):e.blob()).then(function(n){return new Response(n,{headers:e.headers,status:e.status,statusText:e.statusText})}):Promise.resolve(e)},createCacheKey=function(e,n,t,r){var a=new URL(e);return r&&a.pathname.match(r)||(a.search+=(a.search?"&":"")+encodeURIComponent(n)+"="+encodeURIComponent(t)),a.toString()},isPathWhitelisted=function(e,n){if(0===e.length)return!0;var t=new URL(n).pathname;return e.some(function(e){return t.match(e)})},stripIgnoredUrlParameters=function(e,n){var t=new URL(e);return t.hash="",t.search=t.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(e){return n.every(function(n){return!n.test(e[0])})}).map(function(e){return e.join("=")}).join("&"),t.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var n=e[0],t=e[1],r=new URL(n,self.location),a=createCacheKey(r,hashParamName,t,!1);return[r.toString(),a]}));function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(e){return setOfCachedUrls(e).then(function(n){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(t){if(!n.has(t)){var r=new Request(t,{credentials:"same-origin"});return fetch(r).then(function(n){if(!n.ok)throw new Error("Request for "+t+" returned a response with status "+n.status);return cleanResponse(n).then(function(n){return e.put(t,n)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var n=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(e){return e.keys().then(function(t){return Promise.all(t.map(function(t){if(!n.has(t.url))return e.delete(t)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(e){if("GET"===e.request.method){var n,t=stripIgnoredUrlParameters(e.request.url,ignoreUrlParametersMatching);(n=urlsToCacheKeys.has(t))||(t=addDirectoryIndex(t,"index.html"),n=urlsToCacheKeys.has(t));!n&&"navigate"===e.request.mode&&isPathWhitelisted([],e.request.url)&&(t=new URL("https://oscar60310.github.io/shipment-creator",self.location).toString(),n=urlsToCacheKeys.has(t)),n&&e.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(t)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(n){return console.warn('Couldn\'t serve response for "%s" from cache: %O',e.request.url,n),fetch(e.request)}))}});