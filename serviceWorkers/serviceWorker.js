const version = "0.1.0";
const cacheName = `manoj.io-${version}`;
self.addEventListener('install', e => {
  const timeStamp = Date.now();
  e.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll([
          `/`,
          `/home`,
          `/git`,
          `/medium`,
          `/locations`,
          `/fetchBio`,
          `/images/background.jpg`,
          `/images/blog.png`,
          `/images/backgroundquotes.jpg`,
          `/images/blog.png`,
          `/images/contact.jpg`,
          `/images/coffee-projects-menu.jpg`,
          `/images/logo.svg`,
          `/images/Hobby.jpg`,
          `/images/book-business-coffee.jpg`,
          `/images/projects.jpg`,
          `/images/self.jpg`,
          `/images/self-camping.jpg`,
          `/images/talks.jpg`,
          `/resume_pdf.pdf`
        ])
        .then(() => self.skipWaiting());
    })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
event.respondWith(
  caches.open(cacheName)
  .then(cache => cache.match(event.request, {
    ignoreSearch: true
  }))
  .then(response => {
    return response || fetch(event.request);
  }).catch(err => {
    console.log(err);
  })
);
});