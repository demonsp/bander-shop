// ─────────────────────────────────────────────────────────────
//  مسیریاب هش‌محور با بارگذاری تنبل نماها
// ─────────────────────────────────────────────────────────────
import { qs, scrollTop, applyDyn } from './lib/dom.mjs';
import { t } from './i18n.mjs';
import { S } from './state.mjs';
import { toastError, toast, loadingBar } from './ui.mjs';

const V = () => qs('#viewInner');

// ── جدول مسیرها ─────────────────────────────────────────────
// pattern: رشته با :param · load: تابع بارگذاری تنبل · guard: auth|admin|perm
export const routes = [
  { pattern: '/', load: () => import('./views/home.mjs'), title: () => t('nav.home') },
  { pattern: '/products', load: () => import('./views/catalog.mjs'), title: () => t('catalog.title') },
  { pattern: '/category/:id', load: () => import('./views/catalog.mjs'), title: () => t('catalog.title') },
  { pattern: '/product/:id', load: () => import('./views/product.mjs'), title: (c) => c.params.id },
  { pattern: '/search/image', load: () => import('./views/search-image.mjs'), title: () => t('search.imageTitle'), guard: 'feature:imageSearch' },
  { pattern: '/cart', load: () => import('./views/cart.mjs'), title: () => t('cart.title') },
  { pattern: '/checkout', load: () => import('./views/checkout.mjs'), title: () => t('checkout.title') },
  { pattern: '/checkout/done/:id', load: () => import('./views/checkout-done.mjs'), title: () => t('checkout.successTitle') },
  { pattern: '/pay/:id', load: () => import('./views/pay.mjs'), title: () => t('common.payment') },
  { pattern: '/compare', load: () => import('./views/compare.mjs'), title: () => t('compare.title'), guard: 'feature:compare' },
  { pattern: '/lottery', load: () => import('./views/lottery.mjs'), title: () => t('lot.title') },
  { pattern: '/price-check', load: () => import('./views/price-check.mjs'), title: () => t('priceCheck.title'), guard: 'feature:priceCheckDevice' },

  { pattern: '/auth', load: () => import('./views/auth.mjs'), title: () => t('auth.title') },
  { pattern: '/auth/:mode', load: () => import('./views/auth.mjs'), title: () => t('auth.title') },

  { pattern: '/account', load: () => import('./views/account.mjs'), title: () => t('acc.title'), guard: 'auth' },
  { pattern: '/account/:section', load: () => import('./views/account.mjs'), title: () => t('acc.title'), guard: 'auth' },
  { pattern: '/account/orders/:id', load: () => import('./views/order-detail.mjs'), title: () => t('acc.trackOrder'), guard: 'auth' },
  { pattern: '/account/tickets/:id', load: () => import('./views/ticket-detail.mjs'), title: () => t('common.ticket'), guard: 'auth' },

  { pattern: '/stats', load: () => import('./views/stats.mjs'), title: () => t('nav.stats'), guard: 'feature:publicStats' },
  { pattern: '/pages/:key', load: () => import('./views/page.mjs'), title: (c) => c.params.key },

  { pattern: '/admin', load: () => import('./views/admin/index.mjs'), title: () => t('adm.title'), guard: 'admin' },
  { pattern: '/admin/:section', load: () => import('./views/admin/index.mjs'), title: () => t('adm.title'), guard: 'admin' },
  { pattern: '/admin/:section/:id', load: () => import('./views/admin/index.mjs'), title: () => t('adm.title'), guard: 'admin' },
];

const notFound = { pattern: '/404', load: () => import('./views/not-found.mjs'), title: () => t('err.notFound') };

// ── تجزیهٔ هش ───────────────────────────────────────────────
export function parseHash(hash = location.hash) {
  let raw = String(hash || '').replace(/^#/, '');
  if (!raw || raw === '/') return { path: '/', query: new URLSearchParams(), hashStr: '' };
  let hashStr = '';
  const hi = raw.indexOf('#');
  if (hi >= 0) { hashStr = raw.slice(hi + 1); raw = raw.slice(0, hi); }
  const qi = raw.indexOf('?');
  const query = new URLSearchParams(qi >= 0 ? raw.slice(qi + 1) : '');
  let path = qi >= 0 ? raw.slice(0, qi) : raw;
  if (!path.startsWith('/')) path = `/${path}`;
  path = path.replace(/\/{2,}/g, '/');
  if (path.length > 1 && path.endsWith('/')) path = path.slice(0, -1);
  return { path, query, hashStr };
}

function matchRoute(path) {
  const segs = path.split('/').filter((x) => x !== '');
  for (const r of routes) {
    const ps = r.pattern.split('/').filter((x) => x !== '');
    if (ps.length !== segs.length) continue;
    const params = {};
    let ok = true;
    for (let i = 0; i < ps.length; i++) {
      if (ps[i].startsWith(':')) params[ps[i].slice(1)] = decodeURIComponent(segs[i]);
      else if (ps[i] !== segs[i]) { ok = false; break; }
    }
    if (ok) return { route: r, params };
  }
  return { route: notFound, params: {} };
}

// ── نگهبان‌ها ───────────────────────────────────────────────
function checkGuard(guard, ctx) {
  if (!guard) return null;
  if (guard === 'auth') {
    if (!S.me) {
      const next = encodeURIComponent(ctx.full);
      toast(t('err.loginRequired'));
      return `#/auth?next=${next}`;
    }
    return null;
  }
  if (guard === 'admin') {
    if (!S.me?.isAdmin) {
      toastError(t('err.forbidden'));
      return '#/';
    }
    return null;
  }
  if (guard.startsWith('perm:')) {
    const p = guard.slice(5);
    const { can } = ctx.helpers;
    if (!can(p)) { toastError(t('adm.noPermission')); return '#/admin'; }
    return null;
  }
  if (guard.startsWith('feature:')) {
    const f = guard.slice(8);
    if (S.settings?.features?.[f] === false) { toast(t('err.notFound')); return '#/'; }
    return null;
  }
  return null;
}

// ── رندر ────────────────────────────────────────────────────
let token = 0;
let currentCtx = null;
let currentCleanup = null;

export const currentRoute = () => currentCtx;

export async function render(ctx) {
  const view = V();
  if (!view) return;
  const my = ++token;
  if (currentCleanup) { try { currentCleanup(); } catch { /* noop */ } currentCleanup = null; }

  loadingBar(true);
  view.innerHTML = ctx.skeleton || '<div class="sk sk-card"></div>';

  let mod = null;
  try { mod = await ctx.route.load(); }
  catch (e) {
    console.error('[router] load failed', e);
    if (my !== token) return;
    view.innerHTML = `<div class="empty"><h4>${t('err.generic')}</h4><p>${t('err.network')}</p></div>`;
    loadingBar(false);
    return;
  }
  if (my !== token) return;

  let html = '';
  try {
    html = await mod.render(ctx);
  } catch (e) {
    console.error('[router] render failed', e);
    html = `<div class="empty"><h4>${t('err.generic')}</h4><p>${String(e?.message || e)}</p></div>`;
  }
  if (my !== token) return;
  view.innerHTML = html;
  applyDyn(view);
  setTimeout(() => import('./main.mjs').then(m => m.maybeConsent && m.maybeConsent()), 300);

  // عنوان صفحه
  try {
    const base = S.settings?.store?.[ctx.lang === 'en' ? 'nameEn' : 'name'] || 'گرین اپل';
    const tt = typeof mod.title === 'function' ? mod.title(ctx) : (mod.title || ctx.route.title?.(ctx) || '');
    document.title = tt ? `${tt} · ${base}` : base;
  } catch { /* noop */ }

  // قلاب پس‌ازرندر
  try {
    if (typeof mod.mount === 'function') {
      const c = mod.mount(view, ctx);
      if (typeof c === 'function') currentCleanup = c;
    }
  } catch (e) { console.error('[router] mount failed', e); }

  if (my !== token) return;
  loadingBar(false);
  document.dispatchEvent(new CustomEvent('view:rendered', { detail: ctx }));
  markActiveNav(ctx);
  if (!ctx.keepScroll) { window.scrollTo(0, 0); setTimeout(() => window.scrollTo(0, 0), 50); }
  try { view.closest('#view')?.focus({ preventScroll: true }); } catch { /* noop */ }
}

function markActiveNav(ctx) {
  const path = ctx.path;
  const isDeals = path === '/products' && ctx.query.get('discount') === '1';
  const isNew = path === '/products' && ctx.query.get('sort') === 'newest';
  
  document.querySelectorAll('.nav-link[data-nav-key]').forEach((a) => {
    let active = false;
    if (a.dataset.navKey === '/deals') {
      active = isDeals;
    } else if (a.dataset.navKey === '/new') {
      active = isNew;
    } else if (a.dataset.navKey === '/products') {
      active = path === '/products' && !isDeals && !isNew;
    } else {
      active = a.dataset.navKey === path || (a.dataset.navKey !== '/' && path.startsWith(a.dataset.navKey));
    }
    a.classList.toggle('active', active);
  });
  document.querySelectorAll('.mobile-nav a[data-mn]').forEach((a) => {
    const key = a.dataset.mn;
    const on = (key === 'home' && path === '/')
      || (key === 'cats' && (path.startsWith('/products') || path.startsWith('/category') || path.startsWith('/product')))
      || (key === 'search' && path.startsWith('/search'))
      || (key === 'cart' && path.startsWith('/cart'))
      || (key === 'me' && (path.startsWith('/account') || path.startsWith('/auth')));
    a.classList.toggle('active', on);
  });
}

// ── ناوبری ──────────────────────────────────────────────────
export function navigate(to, { replace = false, keepScroll = false } = {}) {
  const target = String(to || '#/');
  const hash = target.startsWith('#') ? target : `#${target}`;
  if (location.hash === hash) { start({ keepScroll }); return; }
  if (replace) history.replaceState(null, '', hash);
  else location.hash = hash;
  if (replace) start({ keepScroll });
}

export function href(path, query) {
  const q = query instanceof URLSearchParams ? query : new URLSearchParams(query || {});
  const s = q.toString();
  return `#${path.startsWith('/') ? path : `/${path}`}${s ? `?${s}` : ''}`;
}

export function start(opts = {}) {
  const { path, query, hashStr } = parseHash();
  const { route, params } = matchRoute(path);
  const full = `${path}${query.toString() ? `?${query}` : ''}`;
  const ctx = {
    path, params, query, hashStr, full, route,
    lang: document.documentElement.getAttribute('data-lang') || 'fa',
    keepScroll: !!opts.keepScroll,
    skeleton: route.skeleton || '',
    helpers: {},
  };
  currentCtx = ctx;
  const redirect = checkGuard(route.guard, ctx);
  if (redirect) {
    if (redirect !== location.hash) { location.replace(redirect); return; }
    return;
  }
  render(ctx);
}

export function initRouter() {
  window.addEventListener('hashchange', () => start());
  start();
}

/** بازخوانی نمای فعلی */
export function refresh(keepScroll = false) {
  start({ keepScroll });
}
