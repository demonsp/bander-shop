// ─────────────────────────────────────────────────────────────
//  بندر موبایل · سرور اصلی
//  اجرای بدون هیچ وابستگی خارجی:  node server/main.mjs
// ─────────────────────────────────────────────────────────────
import http from 'node:http';
import path from 'node:path';
import { db, load, logAudit, DATA_DIR, ROOT } from './lib/db.mjs';
import { Router } from './lib/router.mjs';
import {
  getQuery, parseCookie, readJsonBody, securityHeaders, sendJson, serveStatic,
  setCookie, clearCookie, clientIp, PUBLIC_DIR,
} from './lib/http.mjs';
import { HttpError, makeRateLimiter, randomToken, uid, nowISO } from './lib/util.mjs';
import { findSession, touchSession, checkCsrf, hasPerm, requirePerm, issueCsrf, destroySession } from './lib/auth.mjs';
import { heartbeatAll, publicStats, pushNotification } from './lib/helpers.mjs';
import { registerCatalog } from './api-catalog.mjs';
import { registerAuth, mePayload, SESSION_COOKIE, CSRF_COOKIE } from './api-auth.mjs';
import { registerShop } from './api-shop.mjs';
import { registerAdmin } from './api-admin.mjs';
import { buildSeed } from './seed.mjs';
import { DEFAULT_SETTINGS, DEFAULT_PAGES } from './defaults.mjs';
import fs from 'node:fs';

const PORT = Number(process.env.PORT || 3000);
const HOST = process.env.HOST || '0.0.0.0';
const limiter = makeRateLimiter();
// ضریب محدودسازی نرخ (برای محیط تست قابل افزایش است)
const RATE_SCALE = Math.max(0.1, Number(process.env.BM_RATE_SCALE || 1));

const router = new Router();
registerCatalog(router);
registerAuth(router);
registerShop(router);
registerAdmin(router);

// ── مسیرهای ویژه ────────────────────────────────────────────
router.get('/healthz', async (ctx) => sendJson(ctx.res, 200, { ok: true, uptime: process.uptime(), time: nowISO() }));

// ── حالت خواب / بیداری فروشگاه (کلید خاموش و روشن) ──────────
// وقتی فروشگاه «خواب» است، هیچ عملیات خریدی انجام نمی‌شود ولی پنل
// مدیر و ورود کاربران باز می‌ماند تا بتوانی دوباره روشنش کنی.
const SLEEP_ALLOW = ['/api/system/wake', '/api/system/status'];
const sleepAllowed = (path) =>
  SLEEP_ALLOW.includes(path) || path.startsWith('/api/auth/') || path.startsWith('/api/admin/') || path.startsWith('/api/me');

router.get('/api/system/status', async (ctx) => {
  const m = ctx.state.meta || {};
  sendJson(ctx.res, 200, {
    ok: true, sleeping: !!m.sleeping, since: m.sleepSince || null, by: m.sleepBy || '',
    uptime: Math.round(process.uptime()), time: nowISO(),
  });
});

router.post('/api/system/sleep', async (ctx) => {
  ctx.requirePerm('settings.edit');
  const minutes = Number(ctx.body?.minutes) || 0;
  await db.tx((st) => {
    st.meta = { ...(st.meta || {}), sleeping: true, sleepSince: nowISO(), sleepBy: ctx.user.username, autoWakeAt: minutes > 0 ? new Date(Date.now() + minutes * 60000).toISOString() : null };
    logAudit(ctx.user, 'system.sleep', minutes ? `${minutes}m` : '', {});
  });
  sendJson(ctx.res, 200, { ok: true, sleeping: true, autoWakeAt: ctx.state.meta?.autoWakeAt || null });
});

router.post('/api/system/wake', async (ctx) => {
  ctx.requirePerm('settings.edit');
  await db.tx((st) => {
    st.meta = { ...(st.meta || {}), sleeping: false, sleepSince: null, autoWakeAt: null, wokeAt: nowISO(), wokeBy: ctx.user.username };
    logAudit(ctx.user, 'system.wake', '', {});
  });
  pushNotification(ctx.state, { type: 'system', level: 'success', title: 'فروشگاه روشن شد', body: 'خرید دوباره فعال است.', link: '#/' });
  sendJson(ctx.res, 200, { ok: true, sleeping: false });
});

router.get('/robots.txt', async (ctx) => {
  ctx.res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'public, max-age=3600' });
  ctx.res.end(`User-agent: *\nAllow: /\nDisallow: /api/\nDisallow: /admin\nDisallow: /account\nSitemap: /sitemap.xml\n`);
});

router.get('/sitemap.xml', async (ctx) => {
  const st = ctx.state;
  const base = `${ctx.proto}://${ctx.host}`;
  const urls = [
    '', 'products', 'pages/about', 'pages/guide', 'pages/service', 'pages/faq',
    'pages/terms', 'pages/privacy', 'pages/insurance', 'pages/contact', 'stats', 'search',
    ...st.products.filter((p) => p.active !== false).map((p) => `product/${p.id}`),
    ...st.categories.filter((c) => c.active !== false).map((c) => `products?cat=${c.id}`),
  ];
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((u) => `  <url><loc>${base}/#/${u}</loc><changefreq>weekly</changefreq></url>`).join('\n')}\n</urlset>`;
  ctx.res.writeHead(200, { 'Content-Type': 'application/xml; charset=utf-8', 'Cache-Control': 'public, max-age=3600' });
  ctx.res.end(xml);
});

// ── راه‌اندازی ──────────────────────────────────────────────
async function ensureSeed(state) {
  if (state.seeded) return state;
  buildSeed(state);
  return state;
}

function normalizeSettings(state) {
  // اطمینان از وجود همهٔ کلیدهای تنظیمات (پس از ارتقا یا ویرایش دستی)
  const s = state.settings || {};
  const d = DEFAULT_SETTINGS;
  for (const section of Object.keys(d)) {
    if (!s[section] || typeof s[section] !== 'object') s[section] = structuredClone(d[section]);
    else {
      for (const k of Object.keys(d[section])) if (s[section][k] === undefined) s[section][k] = structuredClone(d[section][k]);
    }
  }
  if (!s.auth) s.auth = { otpMode: 'demo', allowRegistration: true, requirePhone: false, force2faStaff: false, sessionDays: 14 };
  state.settings = s;
  for (const k of Object.keys(DEFAULT_PAGES)) if (!state.pages?.[k]) state.pages[k] = structuredClone(DEFAULT_PAGES[k]);
  return state;
}

const server = http.createServer(async (req, res) => {
  const started = process.hrtime.bigint();
  res.req = req;
  const url = req.url || '/';
  const pathname = decodeURI(url.split('?')[0]);
  const method = req.method || 'GET';
  const ip = clientIp(req);
  const ua = String(req.headers['user-agent'] || '').slice(0, 200);
  const cookies = parseCookie(req.headers.cookie || '');
  const xff = String(req.headers['x-forwarded-proto'] || '').toLowerCase();
  const proto = xff === 'https' ? 'https' : 'http';
  const host = String(req.headers.host || `localhost:${PORT}`).slice(0, 200);

  // هدرهای امنیتی روی همهٔ پاسخ‌ها
  for (const [k, v] of Object.entries(securityHeaders(req))) res.setHeader(k, v);
  if (proto === 'https') res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');

  const respond = (status, code, message, details) => {
    if (res.writableEnded) return;
    sendJson(res, status, { ok: false, code, message: message || 'خطا', details });
  };

  try {
    // محافظت در برابر متدهای نامعتبر و مسیرهای عجیب
    if (!['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'HEAD', 'OPTIONS'].includes(method)) {
      return respond(405, 'method_not_allowed', 'متد پشتیبانی نمی‌شود.');
    }
    if (method === 'OPTIONS') { res.writeHead(204, { Allow: 'GET,POST,PATCH,DELETE,OPTIONS' }); return res.end(); }
    if (/\.\./.test(pathname) || /[\x00-\x1f]/.test(pathname)) return respond(400, 'bad_path', 'مسیر نامعتبر است.');

    // محدودسازی نرخ کلی — فایل‌های استاتیک شمرده نمی‌شوند (موج نصب سرویس‌ورکر)
    const isStatic = pathname.startsWith('/assets/') || pathname.startsWith('/js/') || pathname.startsWith('/css/') || pathname === '/sw.js' || pathname === '/manifest.webmanifest';
    if (!isStatic) {
      const rl = limiter.hit(`global:${ip}`, Math.round(1800 * RATE_SCALE), 60 * 1000);
      if (!rl.ok) {
        res.setHeader('Retry-After', String(rl.retryAfter));
        return respond(429, 'too_many_requests', 'تعداد درخواست‌ها زیاد است. کمی صبر کن.');
      }
      res.setHeader('X-RateLimit-Remaining', String(rl.remaining ?? ''));
    }

    const state = db.raw;
    const isApi = pathname.startsWith('/api/');

    // CSRF برای درخواست‌های تغییردهنده
    if (isApi && !['GET', 'HEAD', 'OPTIONS'].includes(method) && !checkCsrf(req, cookies, method)) {
      logAudit(null, 'security.csrf.reject', pathname, { ip });
      return respond(403, 'csrf_failed', 'توکن امنیتی درخواست نامعتبر است. صفحه را تازه کن و دوباره تلاش کن.');
    }

    // نشست کاربر
    const token = cookies[SESSION_COOKIE] || '';
    const session = token ? findSession(state, token) : null;
    const user = session ? state.users.find((u) => u.id === session.userId) || null : null;
    if (session && user && (user.status === 'blocked' || user.status === 'deleted')) {
      db.tx((st) => destroySession(st, token));
    }
    const activeUser = user && user.status !== 'blocked' && user.status !== 'deleted' ? user : null;

    const ctx = {
      req, res, method, path: pathname, query: getQuery(url), cookies, ip, ua, host, proto,
      secure: proto === 'https',
      state,
      user: activeUser,
      session: session && activeUser ? session : null,
      params: {},
      body: {},
      rateLimit(key, limit, windowMs) {
        const r = limiter.hit(key, Math.max(1, Math.round(limit * RATE_SCALE)), windowMs);
        if (!r.ok) {
          res.setHeader('Retry-After', String(r.retryAfter));
          throw new HttpError(429, 'too_many_requests', `محدودیت درخواست: ${r.retryAfter} ثانیه دیگر دوباره تلاش کن.`);
        }
        return r;
      },
      requireUser() {
        if (!activeUser) throw new HttpError(401, 'login_required', 'برای این کار باید وارد حساب کاربری شوی.');
        return activeUser;
      },
      requirePerm(key) {
        this.requireUser();
        requirePerm(activeUser, key);
        return true;
      },
      mePayload() { return mePayload(state, activeUser); },
    };

    // خواندن بدنه
    if (!['GET', 'HEAD'].includes(method) && isApi) {
      const ct = String(req.headers['content-type'] || '');
      if (ct.includes('application/json') || !ct) ctx.body = await readJsonBody(req);
      else return respond(415, 'unsupported_media', 'فقط JSON پشتیبانی می‌شود.');
    }

    // کوکی مهمان (برای سبد خرید)
    if (!cookies['bm_guest']) {
      const gid = randomToken(12);
      setCookie(res, 'bm_guest', gid, { httpOnly: false, sameSite: 'Lax', secure: ctx.secure, maxAge: 60 * 60 * 24 * 60 });
      cookies['bm_guest'] = gid;
      ctx.cookies['bm_guest'] = gid;
    }
    // کوکی CSRF (برای همهٔ بازدیدکنندگان، شامل مهمان‌ها)
    if (!cookies[CSRF_COOKIE]) {
      const csrf = issueCsrf();
      setCookie(res, CSRF_COOKIE, csrf, { httpOnly: false, sameSite: 'Lax', secure: ctx.secure, maxAge: 60 * 60 * 24 * 14 });
      cookies[CSRF_COOKIE] = csrf;
      ctx.cookies[CSRF_COOKIE] = csrf;
      res.setHeader('X-CSRF-Token', csrf);
    }
    if (session && activeUser && Date.now() - new Date(session.lastSeenAt).getTime() > 60000) {
      db.tx((st) => { const s = st.sessions.find((x) => x.id === session.id); if (s) touchSession(st, s); });
    }

    // بیداری خودکار (اگر مدیر زمان‌بندی کرده باشد)
    if (state.meta?.sleeping && state.meta?.autoWakeAt && new Date(state.meta.autoWakeAt) <= new Date()) {
      await db.tx((st) => { st.meta = { ...(st.meta || {}), sleeping: false, sleepSince: null, autoWakeAt: null, wokeAt: nowISO(), wokeBy: 'auto' }; });
    }
    // فروشگاه خواب است: فقط مشاهده، ورود و کارهای مدیریتی مجاز است
    if (state.meta?.sleeping && isApi && !['GET', 'HEAD', 'OPTIONS'].includes(method) && !sleepAllowed(pathname)) {
      return respond(503, 'store_asleep', 'فروشگاه موقتاً خاموش است. مدیر می‌تواند از پنل مدیریت آن را روشن کند.');
    }

    // مسیریابی (API و مسیرهای ویژه)
    {
      const m = router.match(method, pathname);
      if (m && !m.methodNotAllowed) {
        ctx.params = m.params;
        await m.route.handler(ctx);
        return;
      }
      if (isApi) {
        if (m?.methodNotAllowed) return respond(405, 'method_not_allowed', 'متد مجاز نیست.');
        return respond(404, 'api_not_found', 'این مسیر API وجود ندارد.');
      }
    }

    // فایل استاتیک
    const served = await serveStatic(req, res, url);
    if (served) return;

    // SPA fallback
    if (method === 'GET' || method === 'HEAD') {
      const indexHtml = path.join(PUBLIC_DIR, 'index.html');
      if (fs.existsSync(indexHtml)) {
        const buf = fs.readFileSync(indexHtml);
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8', 'Content-Length': buf.length, 'Cache-Control': 'no-cache' });
        return res.end(method === 'HEAD' ? undefined : buf);
      }
    }
    return respond(404, 'not_found', 'صفحه یافت نشد.');
  } catch (err) {
    const status = err instanceof HttpError ? err.status : 500;
    if (status >= 500) {
      console.error(`[error] ${method} ${pathname}`, err);
      try {
        const st = db.raw;
        st.audit?.unshift({ id: uid('log'), at: nowISO(), actorId: null, actorName: 'سامانه', actorRole: 'system', action: 'error.unhandled', target: `${method} ${pathname}`.slice(0, 200), meta: { message: String(err?.message || err).slice(0, 300), ip } });
        db.markDirty();
      } catch { /* noop */ }
    }
    respond(status, err?.code || 'server_error', status >= 500 ? 'خطای داخلی سرور. لطفاً دوباره تلاش کن.' : err.message, err?.details);
  } finally {
    const ms = Number(process.hrtime.bigint() - started) / 1e6;
    if (ms > 1200 && !pathname.startsWith('/api/events')) console.warn(`[slow] ${method} ${pathname} ${ms.toFixed(0)}ms`);
  }
});

server.headersTimeout = 30_000;
server.requestTimeout = 60_000;
server.keepAliveTimeout = 15_000;

// ── کارهای پس‌زمینه ────────────────────────────────────────
setInterval(() => limiter.sweep(), 5 * 60 * 1000).unref?.();
setInterval(() => { heartbeatAll(); }, 25_000).unref?.();

// لغو خودکار سفارش‌های پرداخت‌نشده + آزادسازی موجودی
setInterval(async () => {
  try {
    await db.tx((st) => {
      const hours = Number(st.settings.orders?.autoCancelHours || 72);
      const cutoff = Date.now() - hours * 3600_000;
      let n = 0;
      for (const o of st.orders) {
        if (o.status !== 'pending_payment') continue;
        if (new Date(o.createdAt).getTime() > cutoff) continue;
        o.status = 'cancelled';
        o.updatedAt = nowISO();
        o.timeline.push({ status: 'cancelled', at: nowISO(), note: `لغو خودکار به دلیل عدم پرداخت پس از ${hours} ساعت`, by: 'سامانه' });
        for (const it of o.items || []) {
          const p = st.products.find((x) => x.id === it.productId);
          if (p) { p.stock = (p.stock || 0) + it.qty; p.sold = Math.max(0, (p.sold || 0) - it.qty); }
        }
        n++;
      }
      if (n) logAudit(null, 'job.autocancel', `${n} orders`, {});
    });
  } catch (err) { console.error('[job] autocancel failed:', err.message); }
}, 10 * 60 * 1000).unref?.();

// پاک‌سازی دوره‌ای لاگ‌ها و نشست‌ها
setInterval(async () => {
  try {
    await db.tx((st) => {
      const cutoff = Date.now() - 90 * 86400000;
      st.audit = st.audit.filter((l) => new Date(l.at).getTime() > cutoff);
      st.sessions = st.sessions.filter((s) => new Date(s.expiresAt).getTime() > Date.now());
      st.otps = (st.otps || []).filter((o) => new Date(o.expiresAt).getTime() > Date.now() - 86400000);
      if (st.outbox && st.outbox.length > 200) st.outbox.length = 200;
    });
  } catch (err) { console.error('[job] cleanup failed:', err.message); }
}, 6 * 3600_000).unref?.();

// ── شروع ───────────────────────────────────────────────────
(async () => {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  fs.mkdirSync(path.join(PUBLIC_DIR, 'uploads'), { recursive: true });
  await load(ensureSeed);
  normalizeSettings(db.raw);
  db.markDirty();
  server.listen(PORT, HOST, () => {
    const st = db.raw;
    const owner = st.users.find((u) => u.role === 'owner');
    console.log('');
    console.log('  ╭──────────────────────────────────────────────╮');
    console.log('  │   بندر موبایل · Bander Mobile Store           │');
    console.log('  ╰──────────────────────────────────────────────╯');
    console.log(`  ➜ آدرس:      http://${HOST === '0.0.0.0' ? 'localhost' : HOST}:${PORT}`);
    console.log(`  ➜ محصولات:   ${st.products.length}  ·  دسته‌ها: ${st.categories.length}  ·  برندها: ${st.brands.length}`);
    console.log(`  ➜ آمار عمومی: ${JSON.stringify(publicStats(st)).slice(0, 90)}...`);
    if (owner) {
      console.log('');
      console.log('  ورود مدیر:');
      console.log(`    نام کاربری : ${owner.username}`);
      console.log(`    رمز عبور   : ${owner.mustChangePassword ? 'Bander@1404  (پس از ورود باید تغییر کند)' : '(تغییر یافته)'}`);
      console.log('  ورود کارمند: staff / Staff@1404');
      console.log('  کاربران نمونه: maryam | reza | sina  — رمز: Demo@1404');
    }
    console.log('');
  });
})().catch((err) => {
  console.error('fatal:', err);
  process.exit(1);
});

process.on('unhandledRejection', (e) => console.error('[unhandledRejection]', e));
process.on('uncaughtException', (e) => { console.error('[uncaughtException]', e); });
