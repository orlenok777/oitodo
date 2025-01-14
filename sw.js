const CACHE_NAME = 'todo-vue-cache-v1';
const urlsToCache = [
  './',
  './index.html',
  // Если подключаете внешние файлы стилей или скрипты, добавьте их сюда:
  'https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Открыт кэш');
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Возвращаем ответ из кэша, если найден, иначе – запрашиваем в сети
      return response || fetch(event.request);
    })
  );
});

// (Опционально) Обработчик активации Service Worker для удаления старых кэшей
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
