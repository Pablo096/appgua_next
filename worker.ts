import { precacheAndRoute,createHandlerBoundToURL } from "workbox-precaching";
import {registerRoute,NavigationRoute} from "workbox-routing";
import {NetworkOnly,NetworkFirst,StaleWhileRevalidate, CacheFirst} from "workbox-strategies";

declare const self: ServiceWorkerGlobalScope;
// Precarga la app
precacheAndRoute(self.__WB_MANIFEST);

registerRoute(
    ({ request }) => {
        console.log(request.url);
        return true;
    },
    new CacheFirst({cacheName: 'api-response'}),"GET"
); 

/*registerRoute(
/.(?:js|css|webp|png|svg)$/,
new StaleWhileRevalidate(), "GET"
);

registerRoute(
/^https?._/,
new StaleWhileRevalidate(),"GET"
);
registerRoute(
/^http?._/,
new StaleWhileRevalidate(),"GET"
); */

/*const CACHE_STATIC_NAME = 'static-v1';
const CACHE_DYNAMIC_NAME = 'dynamic-v1';

self.addEventListener('install', e => {
    const cachePromStatic =  caches.open(CACHE_STATIC_NAME)
         .then( cache => {
            return cache.addAll([
                 '/',
                 '/index.html'
             ]);
         });
 
     e.waitUntil( cachePromStatic );
 });


self.addEventListener("fetch", e => {
    const respuesta = caches.match( e.request )
    .then( resp => {
        
        if ( resp ) return resp;
        
            console.log("No existe", e.request.url)
            // Si no existe el archivo, tenemos que salir a la web
            return fetch( e.request )
                .then( newResp => {
                    // Se guarda en el cache
                    caches.open(CACHE_DYNAMIC_NAME)
                        .then( cache => {
                            cache.put( e.request, newResp);
                        });
                    return newResp.clone();
                })
            });
    e.respondWith(respuesta);
}); */