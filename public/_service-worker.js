
// To clear cache on devices, always increase APP_VER number after making changes.

//import { getEventDates } from "../helpers/rest";
importScripts("/sw-rest.js");

// The app will serve fresh content right away or after 2-3 refreshes (open / close)
var APP_NAME = 'LyveCity';
var APP_VER = '1.4.0';
var CACHE_NAME = APP_NAME + '-' + APP_VER;

// Files required to make this app work offline.
// Add all files you want to view offline below.
// Leave REQUIRED_FILES = [] to disable offline.
var REQUIRED_FILES = [
	// HTML Files
	'/index.js',
	//'explore/events.js',
	// Styles
	'/styles/style.css',
	'/styles/bootstrap.css',
	// Scripts
	//'scripts/custom.js',
	//'scripts/bootstrap.min.js',
	// Plugins
	//'/plugins/before-after/before-after.css',
	//'/plugins/charts/charts.js',
	//'/plugins/charts/charts-call-graphs.js',
	//'/plugins/countdown/countdown.js',
	//'/plugins/filterizr/filterizr.js',
	//'/plugins/filterizr/filterizr.css',
	//'/plugins/before-after/before-after.js',
	//'/plugins/filterizr/filterizr-call.js',
	//'/plugins/galleryViews/gallery-views.js',
	//'/plugins/glightbox/glightbox.js',
	//'/plugins/glightbox/glightbox.css',
	//'/plugins/glightbox/glightbox-call.js',
	// Fonts
	'/fonts/css/fontawesome-all.min.css',
	'/fonts/webfonts/fa-brands-400.woff2',
	'/fonts/webfonts/fa-regular-400.woff2',
	'/fonts/webfonts/fa-solid-900.woff2',
	// Images
	'/images/empty.png',
];

// Service Worker Diagnostic. Set true to get console logs.
var APP_DIAG = true;

//Service Worker Function Below.
self.addEventListener('install', function(event) {
	event.waitUntil(
		caches.open(CACHE_NAME)
		.then(function(cache) {
			//Adding files to cache
			return cache.addAll(REQUIRED_FILES);
		}).catch(function(error) {
			//Output error if file locations are incorrect
			if(APP_DIAG){console.log('Service Worker Cache: Error Check REQUIRED_FILES array in _service-worker.js - files are missing or path to files is incorrectly written -  ' + error);}
		})
		.then(function() {
			//Install SW if everything is ok
			return self.skipWaiting();
		})
		.then(function(){
			if(APP_DIAG){console.log('Service Worker: Cache is OK');}
		})
	);
	if(APP_DIAG){console.log('Service Worker: Installed');}
});

const unCacheables = ['jwt-auth/v1', 'api/auth/', '_next/data/', 'api/auth/session','m-api/v1/event-dates','m-api/v1/visit', '/buddyboss/v1', 'jet-reviews-api/v1','user-actions/v1']

self.addEventListener('fetch', function(event) {
	/* event.respondWith(
		(async () => {
		  const requestURL = new URL(event.request.url);
		  var unCachList = new RegExp(unCacheables.join("|"), 'gi');
		  return fetch(event.request);
		})(),
	  ); */
	var unCachList = new RegExp(unCacheables.join("|"), 'gi');

	event.respondWith(
		(async () => {
			//Just fetch fresh data everywhere
			if(event.request.url.includes('gravatar')){
				const requestURL = new URL(event.request.url);
				var req = new Request(requestURL.searchParams.get('d'), {
                    method: event.request.method,
                    headers: event.request.headers
                });
				return fetch(req);
			}else{
			return fetch(event.request);
			}
		  
		  if(unCachList.test(event.request.url)){
			//console.log('unCachList', event.request.url);
			//let reqRes = fetch(event.request);
			return fetch(event.request);
			/* if(reqRes){
				let refined = await reqRes.json();
				const {success, message} = refined;
				if(message == 'Expired token'){
					console.log('Token Expired')
				}
				return reqRes;
			} */
		  }else{
			if(event.request.url.includes('gravatar')){
				const requestURL = new URL(event.request.url);
				var req = new Request(requestURL.searchParams.get('d'), {
                    method: event.request.method,
                    headers: event.request.headers
                });
				return fetch(req);
			}else{
				const cache = await caches.open(CACHE_NAME);
				const cachedResponse = await cache.match(event.request);
			
				if (cachedResponse) {
					// If we found a match in the cache, return it, but also
					// update the entry in the cache in the background.
					//event.waitUntil(cache.add(event.request));
					//return cachedResponse;
					const fetchedResponse = fetch(event.request).then((networkResponse) => {
						cache.put(event.request, networkResponse.clone());
						return networkResponse;
					  });
			  
					  return cachedResponse || fetchedResponse;
				}
			
				// If we didn't find a match in the cache, use the network.
				return fetch(event.request)
				.then((res) => {
					// response may be used only once
					// we need to save clone to put one copy in cache
					// and serve second one
					let responseClone = res.clone();

					cache.put(event.request, responseClone);
					return res;
				})
			}
		  }
		  
		})(),
	  );
	//if(APP_DIAG){console.log('Service Worker: Fetching '+APP_NAME+'-'+APP_VER+' files from Cache');}
});

self.addEventListener('activate', function(event) {
	event.waitUntil(self.clients.claim());
	event.waitUntil(
		//Check cache number, clear all assets and re-add if cache number changed
		caches.keys().then(cacheNames => {
			return Promise.all(
				cacheNames
					.filter(cacheName => (cacheName.startsWith(APP_NAME + "-")))
					.filter(cacheName => (cacheName !== CACHE_NAME))
					.map(cacheName => caches.delete(cacheName))
			);
		})
	);
	if(APP_DIAG){console.log('Service Worker: Activated')}
});

addEventListener("message", async (event) => {
	// event is an ExtendableMessageEvent object
	let swResponse = {}, swRespObj = {};
    const messageObj = event.data;
	const controller = new AbortController();
	const {signal} = controller;
	//console.log(`The client sent me a message xx :`, event.data);
	const {type} = messageObj;

	if(type == 'auth'){
		const {loginData} = messageObj;
        
		 let authResponse = await authenticate(loginData, signal);
		 if(authResponse){
			 //controller.abort();
			 swResponse.authResponse = authResponse; 
			 swResponse.loginData = loginData
		 }

	}

	if(type == 'listingState'){
		const {listingId, reviewsPage, subTypes} = messageObj;

		if(subTypes?.length > 0){
			if(subTypes.includes('dates')){
				let eDates = await getEventDates({event_id: listingId, f_key : 'event-date', upcoming_instances : 5}, signal);
				if(eDates){
					//controller.abort();
					swResponse.eventDates = eDates; 
				}
			}

			if(subTypes.includes('reviews')){
				let eReviews = await fetchListingReviews({ source_id : listingId, page : reviewsPage ?? 0 }, signal);
				if(eReviews){
					//controller.abort();
					swResponse.reviews  = eReviews; 
				}
			}
		}
		swRespObj.listingId = listingId;
	}
	swRespObj.swResponse = swResponse;
	event.source.postMessage({type, ...swRespObj});
});