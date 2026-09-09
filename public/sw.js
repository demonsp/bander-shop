/* سرویس‌ورکر بندر موبایل — پوستهٔ آفلاین + کش هوشمند */
const VERSION = 'bm-v11';
const SHELL = `${VERSION}-shell`;
const RUNTIME = `${VERSION}-runtime`;
const DATA = `${VERSION}-data`;

const PRECACHE = [
  '/',
  '/index.html',
  '/css/app.css',
  '/manifest.webmanifest',
  '/js/main.mjs',
  '/js/i18n.mjs',
  '/js/state.mjs',
  '/js/ui.mjs',
  '/js/router.mjs',
  '/js/actions.mjs',
  '/js/components.mjs',
  '/js/chat.mjs',
  '/js/map.mjs',
  '/js/lib/dom.mjs',
  '/js/lib/api.mjs',
  '/js/lib/vision.mjs',
  '/assets/img/favicon.svg',
  '/assets/img/icon-192.png',
  '/assets/img/icon-512.png',
  '/assets/img/icon-maskable-512.png',
  '/assets/img/hero-port.svg',
  '/assets/fonts/Vazirmatn-Regular.woff2',
  '/assets/fonts/Vazirmatn-Medium.woff2',
  '/assets/fonts/Vazirmatn-Bold.woff2',
  '/assets/fonts/Vazirmatn-ExtraBold.woff2',
];

self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(SHELL);
    await Promise.allSettled(PRECACHE.map((u) => cache.add(new Request(u, { cache: 'reload' }))));
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter((k) => k !== SHELL && k !== RUNTIME && k !== DATA).map((k) => caches.delete(k)));
    await self.clients.claim();
  })());
});

const isNav = (req) => req.mode === 'navigate';
const sameOrigin = (url) => url.origin === self.location.origin;

async function putSafe(cache, req, res) {
  try {
    if (res && res.ok && req.method === 'GET') await cache.put(req, res.clone());
  } catch { /* quota */ }
}

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (!sameOrigin(url)) return;

  // ناوبری SPA: شبکه اول، در آفلاین پوستهٔ کش‌شده
  if (isNav(req)) {
    event.respondWith((async () => {
      const cache = await caches.open(SHELL);
      try {
        const res = await fetch(req);
        if (res.ok) await putSafe(cache, new Request('/index.html'), res);
        return res;
      } catch {
        const hit = await cache.match('/index.html') || await cache.match('/');
        return hit || new Response('<!doctype html><meta charset="utf-8"><title>آفلاین</title><p style="font-family:Tahoma;padding:24px">اتصال اینترنت برقرار نیست.</p>', { status: 503, headers: { 'Content-Type': 'text/html; charset=utf-8' } });
      }
    })());
    return;
  }

  // داده‌های API: شبکه اول + کش کوتاه‌مدت برای خواندن آفلاین
  if (url.pathname.startsWith('/api/')) {
    event.respondWith((async () => {
      const cache = await caches.open(DATA);
      try {
        const res = await fetch(req);
        if (res.ok && (url.pathname === '/api/bootstrap' || url.pathname.startsWith('/api/products') || url.pathname.startsWith('/api/pages/') || url.pathname === '/api/stats/public')) {
          await putSafe(cache, req, res);
        }
        return res;
      } catch {
        const hit = await cache.match(req);
        if (hit) {
          const head = new Headers(hit.headers);
          head.set('X-Offline', '1');
          return new Response(hit.body, { status: hit.status, headers: head });
        }
        return Response.error();
      }
    })());
    return;
  }

  // فایل‌های استاتیک: کش اول + به‌روزرسانی در پس‌زمینه
  if (url.pathname.startsWith('/assets/') || url.pathname.startsWith('/css/') || url.pathname.startsWith('/js/') || url.pathname === '/manifest.webmanifest') {
    event.respondWith((async () => {
      const cache = await caches.open(RUNTIME);
      const hit = await cache.match(req);
      const network = fetch(req).then((res) => { putSafe(cache, req, res); return res; }).catch(() => null);
      if (hit) return hit;
      const res = await network;
      if (res) return res;
      const shell = await caches.open(SHELL);
      return (await shell.match(req)) || Response.error();
    })());
    return;
  }
});

self.addEventListener('message', (event) => {
  const d = event.data || {};
  if (d.type === 'SKIP_WAITING') self.skipWaiting();
  if (d.type === 'CLEAN') {
    caches.delete(DATA);
  }
});
