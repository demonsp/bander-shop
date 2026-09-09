// اجرای واقعی render() برای همهٔ بخش‌های پنل مدیر با دادهٔ زندهٔ سرور
const BASE = 'http://127.0.0.1:3000';
const noop = () => {};
class FakeEl {
  constructor(tag = 'div') { this.tagName = String(tag).toUpperCase(); this.children = []; this.dataset = {}; this.attributes = {}; this.value = ''; this.checked = false; this.hidden = false; this.disabled = false;
    this.style = { setProperty: noop, width: '' };
    this.classList = { add: noop, remove: noop, contains: () => false, toggle: noop };
    this.scrollTop = 0; this.scrollHeight = 0; this.textContent = ''; }
  appendChild(c) { this.children.push(c); return c; } insertBefore(n) { return n; }
  addEventListener() {} removeEventListener() {} setAttribute(k, v) { this.attributes[k] = v; } getAttribute(k) { return this.attributes[k] ?? null; }
  removeAttribute() {} remove() {} focus() {} scrollIntoView() {} reset() {} click() {}
  querySelector() { return null; } querySelectorAll() { return []; } closest() { return null; }
  get firstElementChild() { return null; } get parentNode() { return null; }
  get innerHTML() { return this._html || ''; } set innerHTML(v) { this._html = v; }
  getContext() { return { drawImage: noop, getImageData: () => ({ data: new Uint8ClampedArray(4096) }), fillRect: noop, save: noop, restore: noop, translate: noop, clearRect: noop }; }
  getBoundingClientRect() { return { top: 0, left: 0, width: 100, height: 40, right: 100, bottom: 40 }; }
}
const docEl = new FakeEl('html');
globalThis.window = globalThis;
globalThis.document = {
  createElement: (t) => new FakeEl(t), createElementNS: (ns, t) => new FakeEl(t), createTextNode: (t) => ({ text: t }),
  getElementById: () => new FakeEl('div'), querySelector: () => null, querySelectorAll: () => [],
  documentElement: docEl, body: new FakeEl('body'), head: new FakeEl('head'), cookie: '',
  addEventListener: noop, removeEventListener: noop, title: '', hidden: false, readyState: 'complete',
};
globalThis.location = { hash: '#/admin', href: BASE + '/', origin: BASE, pathname: '/', search: '', host: '127.0.0.1:3000', replace() {}, assign() {} };
globalThis.history = { pushState: noop, replaceState: noop, back: noop };
globalThis.navigator = { userAgent: 'node-harness', language: 'fa-IR', clipboard: { writeText: async () => {} }, serviceWorker: null, onLine: true, geolocation: null };
globalThis.localStorage = { getItem: () => null, setItem: noop, removeItem: noop, key: () => null, length: 0 };
globalThis.sessionStorage = { getItem: () => null, setItem: noop, removeItem: noop };
globalThis.matchMedia = () => ({ matches: false, media: '', addEventListener: noop, removeEventListener: noop, addListener: noop });
globalThis.requestAnimationFrame = (fn) => setTimeout(() => fn(Date.now()), 0);
globalThis.cancelAnimationFrame = noop;
globalThis.IntersectionObserver = class { observe() {} unobserve() {} disconnect() {} };
globalThis.MutationObserver = class { observe() {} disconnect() {} };
globalThis.ResizeObserver = class { observe() {} disconnect() {} };
globalThis.Image = class { set src(v) { setTimeout(() => this.onerror?.(), 0); } };
globalThis.addEventListener = noop; globalThis.removeEventListener = noop;
globalThis.getComputedStyle = () => ({ getPropertyValue: () => '' });
globalThis.innerWidth = 1360; globalThis.innerHeight = 900; globalThis.devicePixelRatio = 1;
globalThis.print = noop; globalThis.scrollTo = noop; globalThis.alert = noop;

// ── نشست مدیر روی سرور زنده ─────────────────────────────────
const jar = new Map();
const store = (res) => { for (const c of res.headers.getSetCookie?.() || []) { const [kv] = c.split(';'); const i = kv.indexOf('='); jar.set(kv.slice(0, i).trim(), kv.slice(i + 1).trim()); } };
const cookieHeader = () => [...jar].map(([k, v]) => `${k}=${v}`).join('; ');
const realFetch = globalThis.fetch;
await (await realFetch(BASE + '/api/bootstrap')).headers.getSetCookie?.().forEach?.(() => {});
{ const r = await realFetch(BASE + '/api/bootstrap'); store(r); }
{ const r = await realFetch(BASE + '/api/auth/login', { method: 'POST', headers: { 'Content-Type': 'application/json', 'X-CSRF-Token': jar.get('bm_csrf') || '', Cookie: cookieHeader() }, body: JSON.stringify({ identifier: 'admin', password: 'Bander@1404' }) }); store(r); const j = await r.json(); if (j.me?.role !== 'owner') { console.log('login failed', JSON.stringify(j).slice(0, 200)); process.exit(1); } }
document.cookie = `bm_csrf=${jar.get('bm_csrf') || ''}`;

globalThis.fetch = async (input, init = {}) => {
  let url = typeof input === 'string' ? input : input.url;
  if (url.startsWith('/')) url = BASE + url;
  const headers = new Headers(init.headers || {});
  headers.set('Cookie', cookieHeader());
  if (!['GET', 'HEAD'].includes((init.method || 'GET').toUpperCase())) headers.set('X-CSRF-Token', jar.get('bm_csrf') || '');
  const res = await realFetch(url, { ...init, headers });
  store(res);
  return res;
};

const state = await import('/home/user/public/js/state.mjs');
await state.boot();
console.log('bootstrap ok — role:', state.S.me?.role, '| perms:', Object.keys(state.S.me?.permissions || {}).length, '| products:', state.S.stats?.products);

const CASES = [
  ['dashboard', 'views/admin/dashboard.mjs', { section: '' }],
  ['products', 'views/admin/products.mjs', { section: 'products' }],
  ['orders', 'views/admin/orders.mjs', { section: 'orders' }],
  ['categories', 'views/admin/catalog.mjs', { section: 'categories' }],
  ['reviews', 'views/admin/reviews.mjs', { section: 'reviews' }],
  ['tickets', 'views/admin/tickets.mjs', { section: 'tickets' }],
  ['support', 'views/admin/tickets.mjs', { section: 'support' }],
  ['feedback', 'views/admin/feedback.mjs', { section: 'feedback' }],
  ['users', 'views/admin/users.mjs', { section: 'users' }],
  ['coupons', 'views/admin/marketing.mjs', { section: 'coupons' }],
  ['ads', 'views/admin/marketing.mjs', { section: 'ads' }],
  ['notifications', 'views/admin/marketing.mjs', { section: 'notifications' }],
  ['settings/store', 'views/admin/settings.mjs', { section: 'settings', id: 'store' }],
  ['settings/shipping', 'views/admin/settings.mjs', { section: 'settings', id: 'shipping' }],
  ['settings/plus', 'views/admin/settings.mjs', { section: 'settings', id: 'plus' }],
  ['settings/orders', 'views/admin/settings.mjs', { section: 'settings', id: 'orders' }],
  ['settings/auth', 'views/admin/settings.mjs', { section: 'settings', id: 'auth' }],
  ['settings/seo', 'views/admin/settings.mjs', { section: 'settings', id: 'seo' }],
  ['settings/currency', 'views/admin/settings.mjs', { section: 'settings', id: 'currency' }],
  ['settings/contact', 'views/admin/settings.mjs', { section: 'settings', id: 'contact' }],
  ['theme/theme', 'views/admin/settings.mjs', { section: 'theme', id: 'theme' }],
  ['theme/ui', 'views/admin/settings.mjs', { section: 'theme', id: 'ui' }],
  ['features', 'views/admin/settings.mjs', { section: 'features', id: 'features' }],
  ['pages', 'views/admin/pages.mjs', { section: 'pages' }],
  ['pages/about', 'views/admin/pages.mjs', { section: 'pages', id: 'about' }],
  ['pages/guide', 'views/admin/pages.mjs', { section: 'pages', id: 'guide' }],
  ['pages/service', 'views/admin/pages.mjs', { section: 'pages', id: 'service' }],
  ['pages/faq', 'views/admin/pages.mjs', { section: 'pages', id: 'faq' }],
  ['pages/terms', 'views/admin/pages.mjs', { section: 'pages', id: 'terms' }],
  ['pages/privacy', 'views/admin/pages.mjs', { section: 'pages', id: 'privacy' }],
  ['pages/insurance', 'views/admin/pages.mjs', { section: 'pages', id: 'insurance' }],
  ['pages/ticketRules', 'views/admin/pages.mjs', { section: 'pages', id: 'ticketRules' }],
  ['pages/bugReport', 'views/admin/pages.mjs', { section: 'pages', id: 'bugReport' }],
  ['pages/contact', 'views/admin/pages.mjs', { section: 'pages', id: 'contact' }],
  ['barcode', 'views/admin/devices.mjs', { section: 'barcode' }],
  ['imageSearch', 'views/admin/devices.mjs', { section: 'imageSearch' }],
  ['audit', 'views/admin/insights.mjs', { section: 'audit' }],
  ['stats', 'views/admin/insights.mjs', { section: 'stats' }],
  ['data', 'views/admin/insights.mjs', { section: 'data' }],
];

let pass = 0, fail = 0;
const cache = new Map();
for (const [name, mod, params] of CASES) {
  try {
    if (!cache.has(mod)) cache.set(mod, await import('/home/user/public/js/' + mod));
    const m = cache.get(mod);
    const out = await m.render({ params, query: new URLSearchParams(), path: '/admin/' + (params.section || '') });
    const s = typeof out === 'string' ? out : (out?.html ?? String(out ?? ''));
    const problems = [];
    if (!s || s.length < 40) problems.push('output too short (' + s.length + ')');
    if (s.includes('[object Object]')) problems.push('contains [object Object]');
    if (/undefined|NaN/.test(s.replace(/data-[^=]*="[^"]*"/g, ''))) {
      const m2 = s.match(/.{0,40}(undefined|NaN).{0,30}/);
      problems.push('contains undefined/NaN: …' + (m2 ? m2[0] : '') + '…');
    }
    if (s.includes('err.generic') || s.includes('common.noData</')) problems.push('untranslated key leaked');
    if (problems.length) { fail++; console.log('✘', name, '→', problems.join(' | ')); }
    else { pass++; console.log('✔', name, `(${s.length} chars)`); }
    if (typeof m.mount === 'function') {
      const root = new FakeEl('div');
      m.mount(root, { params });
    }
  } catch (err) {
    fail++; console.log('✘', name, '→ EXCEPTION:', err.message.split('\n').slice(0, 3).join(' / '));
  }
}

// جزئیات یک سفارش و یک کاربر و یک تیکت
try {
  const orders = await (await fetch('/api/admin/orders?page=1')).json();
  const oid = orders.items?.[0]?.id;
  const m = cache.get('views/admin/orders.mjs');
  if (oid && m) {
    const out = await m.render({ params: { section: 'orders', id: oid }, query: new URLSearchParams() });
    const s = typeof out === 'string' ? out : String(out ?? '');
    const bad = /undefined|NaN/.test(s);
    console.log(bad ? '✘ order detail → undefined/NaN present' : `✔ order detail (${s.length} chars)`);
    bad ? fail++ : pass++;
  }
} catch (err) { fail++; console.log('✘ order detail →', err.message.split('\n')[0]); }

try {
  const users = await (await fetch('/api/admin/users')).json();
  const uid = users.items?.find((u) => u.role === 'staff')?.id || users.items?.[0]?.id;
  const m = cache.get('views/admin/users.mjs');
  if (uid && m) {
    const out = await m.render({ params: { section: 'users', id: uid }, query: new URLSearchParams() });
    const s = typeof out === 'string' ? out : String(out ?? '');
    const bad = /undefined|NaN/.test(s);
    console.log(bad ? '✘ user detail → undefined/NaN present' : `✔ user detail (${s.length} chars)`);
    bad ? fail++ : pass++;
  }
} catch (err) { fail++; console.log('✘ user detail →', err.message.split('\n')[0]); }

try {
  const tks = await (await fetch('/api/admin/tickets')).json();
  const tid = tks.items?.[0]?.id;
  const m = cache.get('views/admin/tickets.mjs');
  if (tid && m) {
    const out = await m.render({ params: { section: 'tickets', id: tid }, query: new URLSearchParams() });
    const s = typeof out === 'string' ? out : String(out ?? '');
    const bad = /undefined|NaN/.test(s);
    console.log(bad ? '✘ ticket detail → undefined/NaN present' : `✔ ticket detail (${s.length} chars)`);
    bad ? fail++ : pass++;
  }
} catch (err) { fail++; console.log('✘ ticket detail →', err.message.split('\n')[0]); }

// محصول: فرم ویرایش
try {
  const prods = await (await fetch('/api/admin/products?page=1')).json();
  const pid = prods.items?.[0]?.id;
  const m = cache.get('views/admin/products.mjs');
  if (pid && m) {
    const out = await m.render({ params: { section: 'products', id: pid }, query: new URLSearchParams() });
    const s = typeof out === 'string' ? out : String(out ?? '');
    const bad = /undefined|NaN/.test(s);
    console.log(bad ? '✘ product editor → undefined/NaN present' : `✔ product editor (${s.length} chars)`);
    bad ? fail++ : pass++;
  }
} catch (err) { fail++; console.log('✘ product editor →', err.message.split('\n')[0]); }

console.log(`\n═══ render harness: ${pass} موفق · ${fail} ناموفق ═══`);
process.exit(fail ? 1 : 0);
