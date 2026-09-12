// ─────────────────────────────────────────────────────────────
//  API پنل مدیریت: محصولات، سفارش‌ها، کاربران، تنظیمات، تبلیغات،
//  بارکد، جست‌وجوی تصویر، گزارش رویدادها و آمار
// ─────────────────────────────────────────────────────────────
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { ROOT } from './lib/db.mjs';
import { db, logAudit, publicProduct, adminProduct, pushNotification, broadcast, publicStats, dayKey, publicNotification } from './lib/helpers.mjs';
import { V, badRequest, conflict, forbidden, notFound, nowISO, uid, HttpError, normalizeText } from './lib/util.mjs';
import { sendJson } from './lib/http.mjs';
import { invalidateSearchIndex, publicCategory, publicReview } from './api-catalog.mjs';
import { publicOrder, restoreStock } from './api-shop.mjs';
import { PERMISSIONS, hashPassword, generateTotpSecret, destroyUserSessions } from './lib/auth.mjs';
import { ean13 } from './seed.mjs';
import { listBackups, createBackup, restoreBackup, readBackup } from './lib/backup.mjs';
import { tgBroadcast, tgSend, telegramEnabled, tgWebhookState } from './lib/telegram.mjs';
import { sendMail, mailConfigured } from './lib/mail.mjs';
import { sendSms, smsConfigured } from './lib/sms.mjs';
import { productSvg, writeProductImages } from './art.mjs';
import { ORDER_STATUSES } from './defaults.mjs';

const UPLOAD_DIR = path.join(ROOT, 'public', 'uploads');
const IMG_HOSTS = ['upload.wikimedia.org', 'api.openverse.org', 'openverse.org', 'commons.wikimedia.org', 'live.staticflickr.com', 'cdn.openverse.org'];

function ssrfSafe(urlStr) {
  let u;
  try { u = new URL(urlStr); } catch { return null; }
  if (!['http:', 'https:'].includes(u.protocol)) return null;
  const host = u.hostname.toLowerCase();
  if (!IMG_HOSTS.some((h) => host === h || host.endsWith('.' + h))) return null;
  if (/^(127\.|10\.|192\.168\.|172\.(1[6-9]|2\d|3[01])\.|0\.|169\.254\.|\[?::1)/.test(host)) return null;
  if (host === 'localhost' || host.endsWith('.local') || host.endsWith('.internal')) return null;
  return u;
}

function lotteryEntries(st, l) {
  const ids = new Set((l.manual || []));
  if (l.entryMode === 'orders') {
    for (const o of st.orders || []) {
      if (o.status === 'cancelled') continue;
      if (o.createdAt >= l.createdAt && (!l.endsAt || o.createdAt <= l.endsAt)) ids.add(o.userId);
    }
  }
  return [...ids].filter((id) => {
    const u = st.users.find(x => x.id === id);
    // KYC REQUIRED for lotteries
    return u && u.kycStatus === 'approved';
  });
}

export function registerAdmin(router) {
  const A = (m, p, perm, h, opts) => router.add(m, p, async (ctx) => {
    ctx.requireUser();
    if (perm) ctx.requirePerm(perm);
    return h(ctx);
  }, opts);

  // ── داشبورد ─────────────────────────────────────────────
  A('GET', '/api/admin/overview', 'dashboard.view', async (ctx) => {
    const st = ctx.state;
    const today = dayKey();
    const ordersToday = st.orders.filter((o) => o.createdAt.slice(0, 10) === today);
    const revenue = st.orders.filter((o) => ['delivered', 'shipped', 'preparing', 'confirmed', 'ready_pickup'].includes(o.status));
    const pending = st.orders.filter((o) => ['pending_payment', 'pending_review'].includes(o.status));
    const lowStock = st.products.filter((p) => p.active !== false && Math.max(0, (p.stock || 0) - (p.reserved || 0)) <= 2);
    const awaiting = {
      reviews: st.reviews.filter((r) => r.status === 'pending').length,
      tickets: st.tickets.filter((t) => t.status === 'open').length,
      orders: pending.length,
      feedback: st.feedback.filter((f) => f.status === 'new').length,
      support: st.supportMessages.filter((m) => m.from === 'user' && !m.readByStaff).length,
    };
    const last14 = [];
    for (let i = 13; i >= 0; i--) {
      const d = new Date(Date.now() - i * 86400000).toISOString().slice(0, 10);
      const v = st.visits[d] || { visits: 0, unique: 0, orders: 0 };
      const oCount = st.orders.filter((o) => o.createdAt.slice(0, 10) === d).length;
      const oSum = st.orders.filter((o) => o.createdAt.slice(0, 10) === d).reduce((a, b) => a + b.total, 0);
      last14.push({ date: d, visits: v.visits || 0, unique: v.unique || 0, orders: oCount || v.orders || 0, revenue: oSum });
    }
    const topSelling = [...st.products].sort((a, b) => (b.sold || 0) - (a.sold || 0)).slice(0, 6)
      .map((p) => ({ id: p.id, name: p.name, sold: p.sold || 0, stock: p.stock || 0, price: p.price, image: p.images?.[0] }));
    sendJson(ctx.res, 200, {
      ok: true,
      stats: publicStats(st),
      today: { orders: ordersToday.length, revenue: ordersToday.reduce((a, b) => a + b.total, 0), visits: st.visits[today]?.visits || 0 },
      totals: { orders: st.orders.length, revenue: revenue.reduce((a, b) => a + b.total, 0), users: st.users.filter((u) => u.role === 'user').length, products: st.products.length },
      awaiting, chart: last14, lowStock: lowStock.slice(0, 12).map((p) => publicProduct(p, { categories: st.categories, brands: st.brands })),
      topSelling,
      recentAudit: (st.audit || []).slice(0, 10),
      storage: { sizeKb: Math.round((fs.existsSync(path.join(ROOT, 'data', 'db.json')) ? fs.statSync(path.join(ROOT, 'data', 'db.json')).size : 0) / 1024) },
    });
  });

  A('GET', '/api/admin/reports/lower-price', 'feedback.manage', async (ctx) => {
    const reports = ctx.state.lowerPriceReports || [];
    sendJson(ctx.res, 200, { ok: true, items: reports.map(r => {
      const p = ctx.state.products.find(x => x.id === r.productId);
      return { ...r, productName: p ? p.name : '?' };
    }).sort((a,b) => b.createdAt.localeCompare(a.createdAt)) });
  });

  // ── محصولات ─────────────────────────────────────────────
  A('GET', '/api/admin/products', 'products.view', async (ctx) => {
    const st = ctx.state;
    const q = normalizeText(ctx.query.get('q') || '');
    const cat = ctx.query.get('cat') || '';
    const brand = ctx.query.get('brand') || '';
    const status = ctx.query.get('status') || '';
    const page = Math.max(1, Number(ctx.query.get('page')) || 1);
    const limit = Math.min(200, Math.max(10, Number(ctx.query.get('limit')) || 30));
    let list = st.products.slice();
    if (q) list = list.filter((p) => normalizeText(`${p.name} ${p.nameEn} ${p.sku} ${p.barcode} ${(p.tags || []).join(' ')}`).includes(q));
    if (cat) list = list.filter((p) => p.categoryId === cat);
    if (brand) list = list.filter((p) => p.brandId === brand);
    if (status === 'active') list = list.filter((p) => p.active !== false);
    if (status === 'inactive') list = list.filter((p) => p.active === false);
    if (status === 'out') list = list.filter((p) => Math.max(0, (p.stock || 0) - (p.reserved || 0)) === 0);
    if (status === 'low') list = list.filter((p) => { const a = Math.max(0, (p.stock || 0) - (p.reserved || 0)); return a > 0 && a <= 3; });
    list.sort((a, b) => String(b.updatedAt || b.createdAt).localeCompare(String(a.updatedAt || a.createdAt)));
    const total = list.length;
    const items = list.slice((page - 1) * limit, page * limit).map(adminProduct);
    sendJson(ctx.res, 200, { ok: true, items, total, page, pages: Math.max(1, Math.ceil(total / limit)) });
  });

  A('GET', '/api/admin/products/:id', 'products.view', async (ctx) => {
    const p = ctx.state.products.find((x) => x.id === ctx.params.id);
    if (!p) throw notFound('product_not_found', 'کالا یافت نشد.');
    sendJson(ctx.res, 200, { ok: true, product: adminProduct(p), specs: p.specs || {} });
  });

  function readProductPayload(body, existing = null) {
    const out = {};
    if (body.name !== undefined) out.name = V.str(body.name, { min: 2, max: 140, field: 'نام کالا' });
    if (body.nameEn !== undefined) out.nameEn = V.optStr(body.nameEn, { max: 160, field: 'نام انگلیسی' });
    if (body.categoryId !== undefined) out.categoryId = V.id(body.categoryId, 'دسته');
    if (body.brandId !== undefined) out.brandId = V.id(body.brandId, 'برند');
    if (body.sku !== undefined) out.sku = V.optStr(body.sku, { max: 32, field: 'کد کالا' }).toUpperCase();
    if (body.barcode !== undefined) {
      const b = V.optStr(body.barcode, { max: 32, field: 'بارکد' }).replace(/\D/g, '');
      if (b && !/^\d{8,14}$/.test(b)) throw badRequest('invalid_barcode', 'بارکد باید ۸ تا ۱۴ رقم باشد.');
      out.barcode = b;
    }
    if (body.price !== undefined) out.price = V.int(body.price, { min: 0, max: 9_999_999_999, field: 'قیمت' });
    if (body.oldPrice !== undefined) out.oldPrice = V.int(body.oldPrice, { min: 0, max: 9_999_999_999, field: 'قیمت قبل از تخفیف', def: 0 });
    if (body.cost !== undefined) out.cost = V.int(body.cost, { min: 0, max: 9_999_999_999, field: 'قیمت خرید', def: 0 });
    if (body.stock !== undefined) out.stock = V.int(body.stock, { min: 0, max: 100000, field: 'موجودی' });
    if (body.weight !== undefined) out.weight = V.int(body.weight, { min: 0, max: 100000, field: 'وزن', def: 0 });
    if (body.authenticity !== undefined) out.authenticity = V.oneOf(body.authenticity, ['original', 'highcopy', 'generic'], 'authenticity', 'generic');
    if (body.warrantyMonths !== undefined) out.warrantyMonths = V.int(body.warrantyMonths, { min: 0, max: 120, field: 'گارانتی', def: 0 });
    if (body.description !== undefined) out.description = V.optStr(body.description, { max: 6000, field: 'توضیحات' });
    if (body.descriptionEn !== undefined) out.descriptionEn = V.optStr(body.descriptionEn, { max: 6000, field: 'توضیحات انگلیسی' });
    if (body.tags !== undefined) out.tags = V.arr(body.tags, { max: 20, field: 'برچسب‌ها' }).map((t) => V.str(t, { min: 1, max: 30, field: 'برچسب' }));
    if (body.sourcePriceUrl !== undefined) out.sourcePriceUrl = V.optStr(body.sourcePriceUrl, { max: 500, field: 'لینک منبع قیمت' });
    if (body.specs !== undefined) {
      const specs = {};
      const src = body.specs;
      if (Array.isArray(src)) {
        for (const row of src.slice(0, 40)) {
          const k = V.optStr(row?.key, { max: 40, field: 'نام مشخصه' });
          const v = V.optStr(row?.value, { max: 120, field: 'مقدار' });
          if (k) specs[k] = v;
        }
      } else if (src && typeof src === 'object') {
        for (const [k, v] of Object.entries(src).slice(0, 40)) {
          const kk = V.optStr(k, { max: 40, field: 'نام مشخصه' });
          if (kk) specs[kk] = V.optStr(String(v ?? ''), { max: 120, field: 'مقدار' });
        }
      }
      out.specs = specs;
    }
    if (body.images !== undefined) {
      out.images = V.arr(body.images, { max: 8, field: 'تصاویر' })
        .map((x) => V.optStr(x, { max: 300, field: 'تصویر' }))
        .filter((x) => x.startsWith('/assets/') || x.startsWith('/uploads/'));
      if (!out.images.length && !existing) out.images = [];
    }
    if (body.videos !== undefined) {
      out.videos = V.arr(body.videos, { max: 4, field: 'ویدیوها' })
        .map((x) => V.optStr(x, { max: 300, field: 'ویدیو' }))
        .filter((x) => x.startsWith('/assets/') || x.startsWith('/uploads/') || x.startsWith('https://'));
    }
    if (body.featured !== undefined) out.featured = V.bool(body.featured);
    if (body.active !== undefined) out.active = V.bool(body.active);
    if (body.glyph !== undefined) out.glyph = V.optStr(body.glyph, { max: 20, field: 'glyph' });
    return out;
  }

  A('POST', '/api/admin/products', 'products.create', async (ctx) => {
    const payload = readProductPayload(ctx.body);
    if (!payload.name) throw badRequest('name_required', 'نام کالا الزامی است.');
    if (payload.price === undefined) throw badRequest('price_required', 'قیمت الزامی است.');
    const created = await db.tx((st) => {
      const id = `p${String(st.products.length + 1).padStart(3, '0')}_${uid().slice(0, 4)}`;
      if (payload.categoryId && !st.categories.some((c) => c.id === payload.categoryId)) throw badRequest('invalid_category', 'دستهٔ انتخابی وجود ندارد.');
      if (payload.brandId && !st.brands.some((b) => b.id === payload.brandId)) throw badRequest('invalid_brand', 'برند انتخابی وجود ندارد.');
      const sku = payload.sku || `BM-${String(2000 + st.products.length)}`;
      if (st.products.some((p) => p.sku === sku)) throw conflict('sku_taken', 'این کد کالا قبلاً ثبت شده است.');
      let barcode = payload.barcode || ean13(`201${crypto.randomInt(100000000, 999999999)}`);
      while (st.products.some((p) => p.barcode === barcode)) barcode = ean13(`201${crypto.randomInt(100000000, 999999999)}`);
      const cat = st.categories.find((c) => c.id === payload.categoryId);
      const brand = st.brands.find((b) => b.id === payload.brandId);
      const p = {
        id, sku, barcode,
        name: payload.name, nameEn: payload.nameEn || '',
        categoryId: payload.categoryId || (cat?.id ?? st.categories[0]?.id ?? ''),
        brandId: payload.brandId || 'no_name',
        brandName: brand?.name || 'متفرقه', brandNameEn: brand?.nameEn || 'Generic',
        glyph: payload.glyph || cat?.glyph || 'misc',
        price: payload.price, oldPrice: payload.oldPrice || 0, cost: payload.cost || 0,
        stock: payload.stock ?? 0, reserved: 0,
        authenticity: payload.authenticity || 'generic', warrantyMonths: payload.warrantyMonths || 0,
        images: payload.images?.length ? payload.images : [`/assets/img/products/${id}.svg`],
        specs: payload.specs || {}, description: payload.description || '', descriptionEn: payload.descriptionEn || '',
        tags: payload.tags || [], featured: !!payload.featured, active: payload.active !== false,
        weight: payload.weight || 150, views: 0, sold: 0, ratingAvg: 0, ratingCount: 0,
        createdAt: nowISO(), updatedAt: nowISO(),
      };
      if (!payload.images?.length) {
        // تولید تصویر پیش‌فرض
        const file = path.join(ROOT, 'public', 'assets', 'img', 'products', `${id}.svg`);
        fs.mkdirSync(path.dirname(file), { recursive: true });
        fs.writeFileSync(file, productSvg({ ...p, brandEn: p.brandNameEn }, { glyph: p.glyph }), 'utf8');
      }
      st.products.unshift(p);
      logAudit(ctx.user, 'product.create', `${p.sku}:${p.name}`, { price: p.price, stock: p.stock });
      return p;
    });
    invalidateSearchIndex();
    sendJson(ctx.res, 200, { ok: true, product: adminProduct(created) });
  });

  A('PATCH', '/api/admin/products/:id', null, async (ctx) => {
    const id = V.id(ctx.params.id, 'شناسه');
    const priceOnly = Object.keys(ctx.body).every((k) => ['price', 'oldPrice', 'stock', 'active', 'featured'].includes(k));
    if (priceOnly) {
      if (ctx.body.price !== undefined || ctx.body.oldPrice !== undefined) ctx.requirePerm('products.price');
      if (ctx.body.stock !== undefined) ctx.requirePerm('products.stock');
    } else {
      ctx.requirePerm('products.edit');
    }
    const payload = readProductPayload(ctx.body, true);
    const updated = await db.tx((st) => {
      const p = st.products.find((x) => x.id === id);
      if (!p) throw notFound('product_not_found', 'کالا یافت نشد.');
      const oldStock = p.stock || 0;
      if (payload.categoryId && !st.categories.some((c) => c.id === payload.categoryId)) throw badRequest('invalid_category', 'دسته وجود ندارد.');
      if (payload.brandId && !st.brands.some((b) => b.id === payload.brandId)) throw badRequest('invalid_brand', 'برند وجود ندارد.');
      if (payload.sku && st.products.some((x) => x.sku === payload.sku && x.id !== id)) throw conflict('sku_taken', 'این کد کالا قبلاً ثبت شده است.');
      if (payload.barcode && st.products.some((x) => x.barcode === payload.barcode && x.id !== id)) throw conflict('barcode_taken', 'این بارکد برای کالای دیگری ثبت شده است.');
      Object.assign(p, payload);
      if (payload.brandId) {
        const b = st.brands.find((x) => x.id === payload.brandId);
        p.brandName = b?.name || p.brandName; p.brandNameEn = b?.nameEn || p.brandNameEn;
      }
      p.updatedAt = nowISO();
      logAudit(ctx.user, 'product.update', `${p.sku}:${p.name}`, { fields: Object.keys(payload).join(',') });
      // اگر موجودی زیاد شد → اعلان به کسانی که «خبرم کن» زده‌اند
      if ((p.stock || 0) > oldStock && oldStock - (p.reserved || 0) <= 0) {
        const alerts = (st.priceAlerts || []).filter((a) => a.productId === p.id);
        for (const a of alerts) {
          pushNotification(st, {
            userId: a.userId, type: 'restock', level: 'success',
            title: 'کالا موجود شد!', body: `«${p.name}» دوباره موجود شد. برای از دست ندادن، زودتر سفارش بده.`,
            link: `#/product/${p.id}`,
          });
        }
        st.priceAlerts = (st.priceAlerts || []).filter((a) => a.productId !== p.id);
      }
      if ((p.stock || 0) <= 0) {
        pushNotification(st, { userId: null, type: 'admin_alert', level: 'warning', title: 'کالا ناموجود شد', body: `موجودی «${p.name}» صفر شد.`, link: '#/admin/products?q=' + encodeURIComponent(p.name) });
      }
      return p;
    });
    invalidateSearchIndex();
    sendJson(ctx.res, 200, { ok: true, product: adminProduct(updated) });
  });

  A('DELETE', '/api/admin/products/:id', 'products.delete', async (ctx) => {
    const id = V.id(ctx.params.id, 'شناسه');
    await db.tx((st) => {
      const p = st.products.find((x) => x.id === id);
      if (!p) throw notFound('product_not_found', 'کالا یافت نشد.');
      const inOrders = st.orders.some((o) => ['pending_payment', 'pending_review', 'confirmed', 'preparing', 'shipped'].includes(o.status) && o.items.some((i) => i.productId === id));
      if (inOrders) {
        p.active = false;
        logAudit(ctx.user, 'product.deactivate', `${p.sku}:${p.name}`, { reason: 'open orders' });
        throw new HttpError(200, 'deactivated', 'این کالا در سفارش‌های باز وجود دارد، بنابراین فقط غیرفعال شد (حذف نشد).');
      }
      st.products = st.products.filter((x) => x.id !== id);
      st.reviews = st.reviews.filter((r) => r.productId !== id);
      for (const u of st.users) { u.wishlist = (u.wishlist || []).filter((x) => x !== id); u.compare = (u.compare || []).filter((x) => x !== id); }
      st.priceAlerts = (st.priceAlerts || []).filter((a) => a.productId !== id);
      delete st.imageHashes[id];
      const file = path.join(ROOT, 'public', 'assets', 'img', 'products', `${id}.svg`);
      fs.promises.unlink(file).catch(() => {});
      logAudit(ctx.user, 'product.delete', `${p.sku}:${p.name}`, {});
    });
    invalidateSearchIndex();
    sendJson(ctx.res, 200, { ok: true });
  });

  // ── جست‌وجوی خودکار تصویر کالا ─────────────────────────
  A('POST', '/api/admin/find-image', 'products.create', async (ctx) => {
    const query = V.str(ctx.body?.query, { min: 2, max: 120, field: 'نام کالا' });
    const lang = V.oneOf(ctx.body?.lang, ['fa', 'en'], 'lang', 'fa');
    ctx.rateLimit(`findimg:${ctx.ip}`, 20, 10 * 60 * 1000);
    const q = lang === 'fa' ? query : query;
    const results = [];
    // ۱) Openverse
    try {
      const url = `https://api.openverse.org/v1/images/?q=${encodeURIComponent(q)}&page_size=8&license_type=all&mature=false`;
      const res = await fetchWithTimeout(url, 9000);
      if (res?.results) {
        for (const r of res.results.slice(0, 8)) {
          if (!r.url) continue;
          results.push({
            url: r.url, thumbnail: r.thumbnail || r.url, title: (r.title || '').slice(0, 120),
            license: `${r.license || ''} ${r.license_version || ''}`.trim(), source: r.source || 'openverse',
            creator: r.creator || '', foreignUrl: r.foreign_landing_url || '',
          });
        }
      }
    } catch (e) { console.warn('[find-image] openverse failed:', e.message); }
    // ۲) Wikimedia Commons
    if (results.length < 4) {
      try {
        const url = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(q)}&gsrnamespace=6&gsrlimit=8&prop=imageinfo&iiprop=url|mime|size&iiurlwidth=400&format=json`;
        const res = await fetchWithTimeout(url, 9000);
        const pages = res?.query?.pages || {};
        for (const p of Object.values(pages)) {
          const ii = p.imageinfo?.[0];
          if (!ii || !/^image\/(jpeg|png|webp|gif)/.test(ii.mime || '')) continue;
          results.push({ url: ii.url, thumbnail: ii.thumburl || ii.url, title: (p.title || '').replace(/^File:/, '').slice(0, 120), license: 'Wikimedia Commons', source: 'wikimedia', creator: '', foreignUrl: ii.descriptionurl || '' });
        }
      } catch (e) { console.warn('[find-image] wikimedia failed:', e.message); }
    }
    sendJson(ctx.res, 200, { ok: true, query, count: results.length, items: results.slice(0, 12) });
  });

  A('POST', '/api/admin/fetch-image', 'products.create', async (ctx) => {
    const urlStr = V.str(ctx.body?.url, { min: 8, max: 500, field: 'نشانی تصویر' });
    const u = ssrfSafe(urlStr);
    if (!u) throw badRequest('blocked_url', 'این نشانی برای بارگذاری مجاز نیست (فقط منابع تصویر شناخته‌شده).');
    ctx.rateLimit(`fetchimg:${ctx.ip}`, 30, 10 * 60 * 1000);
    const res = await fetchWithTimeout(u.toString(), 12000, { raw: true });
    if (!res || !res.ok) throw badRequest('fetch_failed', 'دریافت تصویر ناموفق بود.');
    const buf = Buffer.from(await res.arrayBuffer());
    if (buf.length > 6 * 1024 * 1024) throw badRequest('too_large', 'حجم تصویر بیش از ۶ مگابایت است.');
    const magicOk = (buf[0] === 0xff && buf[1] === 0xd8) || (buf[0] === 0x89 && buf[1] === 0x50) || (buf.slice(0, 4).toString('latin1') === 'RIFF') || (buf.slice(0, 3).toString('latin1') === 'GIF');
    if (!magicOk) throw badRequest('invalid_type', 'فایل تصویر معتبر نیست.');
    const ext = (buf[0] === 0xff && buf[1] === 0xd8) ? 'jpg' : (buf[0] === 0x89 ? 'png' : (buf.slice(0, 4).toString('latin1') === 'RIFF' ? 'webp' : 'gif'));
    fs.mkdirSync(UPLOAD_DIR, { recursive: true });
    const name = `${Date.now().toString(36)}-${crypto.randomBytes(6).toString('hex')}.${ext}`;
    await fs.promises.writeFile(path.join(UPLOAD_DIR, name), buf);
    logAudit(ctx.user, 'product.image.fetch', name, { from: u.hostname, bytes: buf.length });
    sendJson(ctx.res, 200, { ok: true, url: `/uploads/${name}`, bytes: buf.length });
  });

  // نمایش بندانگشتی تصویر منابع آزاد از طریق سرور (سازگار با CSP سخت‌گیرانه)
  A('GET', '/api/admin/image-thumb', 'products.create', async (ctx) => {
    const urlStr = String(ctx.query.get('url') || '');
    const u = ssrfSafe(urlStr);
    if (!u) throw badRequest('blocked_url', 'این نشانی مجاز نیست.');
    ctx.rateLimit(`thumb:${ctx.ip}`, 180, 10 * 60 * 1000);
    const res = await fetchWithTimeout(u.toString(), 10000, { raw: true });
    if (!res || !res.ok) throw badRequest('fetch_failed', 'دریافت بندانگشتی ناموفق بود.');
    const buf = Buffer.from(await res.arrayBuffer());
    if (buf.length > 3 * 1024 * 1024) throw badRequest('too_large', 'حجم تصویر بیش از ۳ مگابایت است.');
    const isJpg = buf[0] === 0xff && buf[1] === 0xd8;
    const isPng = buf[0] === 0x89 && buf[1] === 0x50;
    const isWebp = buf.slice(0, 4).toString('latin1') === 'RIFF';
    const isGif = buf.slice(0, 3).toString('latin1') === 'GIF';
    if (!isJpg && !isPng && !isWebp && !isGif) throw badRequest('invalid_type', 'فایل تصویر معتبر نیست.');
    const type = isJpg ? 'image/jpeg' : isPng ? 'image/png' : isWebp ? 'image/webp' : 'image/gif';
    ctx.res.writeHead(200, {
      'Content-Type': type,
      'Content-Length': String(buf.length),
      'Cache-Control': 'private, max-age=900',
      'X-Content-Type-Options': 'nosniff',
    });
    ctx.res.end(buf);
  });

  // ── دسته‌ها و برندها ────────────────────────────────────
  A('GET', '/api/admin/categories', 'categories.manage', async (ctx) => {
    const cc = {}; const bc = {};
    for (const p of ctx.state.products) {
      if (p.categoryId) cc[p.categoryId] = (cc[p.categoryId] || 0) + 1;
      if (p.brandId) bc[p.brandId] = (bc[p.brandId] || 0) + 1;
    }
    sendJson(ctx.res, 200, {
      ok: true,
      items: ctx.state.categories.map((c) => ({ ...c, productCount: cc[c.id] || 0 })),
      brands: ctx.state.brands.map((b) => ({ ...b, productCount: bc[b.id] || 0 })),
    });
  });
  A('POST', '/api/admin/categories', 'categories.manage', async (ctx) => {
    const c = {
      id: V.optStr(ctx.body?.id, { max: 32, field: 'شناسه' }).toLowerCase().replace(/[^a-z0-9_-]/g, '') || uid('cat'),
      name: V.str(ctx.body?.name, { min: 1, max: 40, field: 'نام دسته' }),
      nameEn: V.optStr(ctx.body?.nameEn, { max: 60, field: 'نام انگلیسی' }),
      glyph: V.optStr(ctx.body?.glyph, { max: 20, field: 'آیکون' }) || 'misc',
      parentId: V.optStr(ctx.body?.parentId, { max: 32, field: 'دستهٔ والد' }) || null,
      order: V.int(ctx.body?.order, { min: 0, max: 999, field: 'ترتیب', def: 99 }),
      description: V.optStr(ctx.body?.description, { max: 500, field: 'توضیحات' }),
      descriptionEn: V.optStr(ctx.body?.descriptionEn, { max: 500, field: 'توضیحات انگلیسی' }),
      active: V.bool(ctx.body?.active, true), createdAt: nowISO(),
    };
    await db.tx((st) => {
      if (st.categories.some((x) => x.id === c.id)) throw conflict('exists', 'این شناسه قبلاً استفاده شده است.');
      if (c.parentId && !st.categories.some((x) => x.id === c.parentId)) throw badRequest('invalid_parent', 'دستهٔ والد وجود ندارد.');
      st.categories.push(c);
      logAudit(ctx.user, 'category.create', c.id, { name: c.name });
    });
    invalidateSearchIndex();
    sendJson(ctx.res, 200, { ok: true, category: c });
  });
  A('PATCH', '/api/admin/categories/:id', 'categories.manage', async (ctx) => {
    const id = V.id(ctx.params.id, 'شناسه');
    const out = await db.tx((st) => {
      const c = st.categories.find((x) => x.id === id);
      if (!c) throw notFound('not_found', 'دسته یافت نشد.');
      if (ctx.body.name !== undefined) c.name = V.str(ctx.body.name, { min: 1, max: 40, field: 'نام دسته' });
      if (ctx.body.nameEn !== undefined) c.nameEn = V.optStr(ctx.body.nameEn, { max: 60, field: 'نام انگلیسی' });
      if (ctx.body.glyph !== undefined) c.glyph = V.optStr(ctx.body.glyph, { max: 20, field: 'آیکون' });
      if (ctx.body.parentId !== undefined) c.parentId = V.optStr(ctx.body.parentId, { max: 32, field: 'والد' }) || null;
      if (ctx.body.order !== undefined) c.order = V.int(ctx.body.order, { min: 0, max: 999, field: 'ترتیب', def: c.order });
      if (ctx.body.active !== undefined) c.active = V.bool(ctx.body.active);
      if (ctx.body.description !== undefined) c.description = V.optStr(ctx.body.description, { max: 500, field: 'توضیحات' });
      if (c.parentId === c.id) throw badRequest('invalid_parent', 'دسته نمی‌تواند والد خودش باشد.');
      logAudit(ctx.user, 'category.update', c.id, {});
      return c;
    });
    invalidateSearchIndex();
    sendJson(ctx.res, 200, { ok: true, category: out });
  });
  A('DELETE', '/api/admin/categories/:id', 'categories.manage', async (ctx) => {
    const id = V.id(ctx.params.id, 'شناسه');
    await db.tx((st) => {
      const used = st.products.filter((p) => p.categoryId === id).length;
      if (used) throw conflict('in_use', `این دسته ${used} کالا دارد؛ ابتدا آن‌ها را منتقل کن.`);
      st.categories = st.categories.filter((c) => c.id !== id);
      for (const c of st.categories) if (c.parentId === id) c.parentId = null;
      logAudit(ctx.user, 'category.delete', id, {});
    });
    invalidateSearchIndex();
    sendJson(ctx.res, 200, { ok: true });
  });

  A('POST', '/api/admin/brands', 'categories.manage', async (ctx) => {
    const b = {
      id: V.optStr(ctx.body?.id, { max: 32, field: 'شناسه' }).toLowerCase().replace(/[^a-z0-9_-]/g, '') || uid('br'),
      name: V.str(ctx.body?.name, { min: 1, max: 40, field: 'نام برند' }),
      nameEn: V.optStr(ctx.body?.nameEn, { max: 60, field: 'نام انگلیسی' }),
      country: V.optStr(ctx.body?.country, { max: 30, field: 'کشور' }),
      active: V.bool(ctx.body?.active, true), createdAt: nowISO(),
    };
    await db.tx((st) => {
      if (st.brands.some((x) => x.id === b.id || x.name === b.name)) throw conflict('exists', 'این برند قبلاً ثبت شده است.');
      st.brands.push(b);
      logAudit(ctx.user, 'brand.create', b.id, { name: b.name });
    });
    invalidateSearchIndex();
    sendJson(ctx.res, 200, { ok: true, brand: b });
  });
  A('PATCH', '/api/admin/brands/:id', 'categories.manage', async (ctx) => {
    const id = V.id(ctx.params.id, 'شناسه');
    const out = await db.tx((st) => {
      const b = st.brands.find((x) => x.id === id);
      if (!b) throw notFound('not_found', 'برند یافت نشد.');
      if (ctx.body.name !== undefined) b.name = V.str(ctx.body.name, { min: 1, max: 40, field: 'نام برند' });
      if (ctx.body.nameEn !== undefined) b.nameEn = V.optStr(ctx.body.nameEn, { max: 60, field: 'نام انگلیسی' });
      if (ctx.body.active !== undefined) b.active = V.bool(ctx.body.active);
      logAudit(ctx.user, 'brand.update', id, {});
      return b;
    });
    invalidateSearchIndex();
    sendJson(ctx.res, 200, { ok: true, brand: out });
  });
  A('DELETE', '/api/admin/brands/:id', 'categories.manage', async (ctx) => {
    const id = V.id(ctx.params.id, 'شناسه');
    await db.tx((st) => {
      const used = st.products.filter((p) => p.brandId === id).length;
      if (used) throw conflict('in_use', `این برند ${used} کالا دارد.`);
      st.brands = st.brands.filter((b) => b.id !== id);
      logAudit(ctx.user, 'brand.delete', id, {});
    });
    invalidateSearchIndex();
    sendJson(ctx.res, 200, { ok: true });
  });

  // ── سفارش‌ها ────────────────────────────────────────────
  A('GET', '/api/admin/orders', 'orders.view', async (ctx) => {
    const st = ctx.state;
    const q = normalizeText(ctx.query.get('q') || '');
    const status = ctx.query.get('status') || '';
    const delivery = ctx.query.get('delivery') || '';
    const page = Math.max(1, Number(ctx.query.get('page')) || 1);
    const limit = Math.min(200, Math.max(10, Number(ctx.query.get('limit')) || 25));
    let list = st.orders.slice();
    if (q) list = list.filter((o) => normalizeText(`${o.code} ${o.userName} ${o.userPhone} ${o.items.map((i) => i.name).join(' ')}`).includes(q));
    if (status) list = list.filter((o) => o.status === status);
    if (delivery) list = list.filter((o) => o.delivery === delivery);
    const total = list.length;
    const items = list.slice((page - 1) * limit, page * limit).map((o) => publicOrder(o, { full: true }));
    sendJson(ctx.res, 200, { ok: true, items, total, page, pages: Math.max(1, Math.ceil(total / limit)), statuses: ORDER_STATUSES });
  });

  A('PATCH', '/api/admin/orders/:id', 'orders.manage', async (ctx) => {
    const id = V.id(ctx.params.id, 'شناسهٔ سفارش');
    const status = ctx.body?.status ? V.oneOf(ctx.body.status, ORDER_STATUSES.map((s) => s.id), 'status') : null;
    const note = V.optStr(ctx.body?.note, { max: 400, field: 'یادداشت' });
    const tracking = V.optStr(ctx.body?.tracking, { max: 60, field: 'کد رهگیری' });
    const out = await db.tx((st) => {
      const o = st.orders.find((x) => x.id === id);
      if (!o) throw notFound('order_not_found', 'سفارش یافت نشد.');
      if (tracking) { o.payment.tracking = tracking; o.tracking = tracking; }
      if (note) o.adminNote = note;
      if (status && status !== o.status) {
        const terminal = ['cancelled', 'refunded', 'returned'];
        if (terminal.includes(o.status)) {
          throw badRequest('terminal_state', 'این سفارش لغو یا مرجوع شده است و وضعیت آن قابل تغییر نیست.');
        }
        if (o.status === 'delivered' && status !== 'returned') {
          throw badRequest('terminal_state', 'سفارش تحویل‌شده فقط می‌تواند به وضعیت مرجوعی تغییر کند.');
        }
        o.status = status;
        o.updatedAt = nowISO();
        o.timeline.push({ status, at: nowISO(), note: note || statusInfoText(status), by: ctx.user.name });
        if (['cancelled', 'refunded', 'returned'].includes(status)) {
          if (status === 'cancelled' || status === 'refunded') {
            import('./api-shop.mjs').then(m => m.safeCancelOrder(st, o, note || statusInfoText(status), ctx.user.name));
          } else {
             // Returned logic
             import('./api-shop.mjs').then(m => m.safeCancelOrder(st, o, note || statusInfoText(status), ctx.user.name));
             o.status = 'returned';
             o.timeline[o.timeline.length - 1].status = 'returned';
          }
          invalidateSearchIndex();
        }
        if (status === 'delivered') {
          // If the order wasn't paid via simulated gateway or wallet at checkout, 
          // (like COD), and it's delivered, we can count it as revenue.
          if (o.payment?.status !== 'paid') {
            o.payment.status = 'paid';
            o.payment.paidAt = nowISO();
            st.stats.ordersTotal = (st.stats.ordersTotal || 0) + 1;
            st.stats.revenueTotal = (st.stats.revenueTotal || 0) + o.total;
          }
        }
        logAudit(ctx.user, 'order.status', o.code, { from: o.timeline[o.timeline.length - 2]?.status, to: status });
        pushNotification(st, {
          userId: o.userId, type: 'order', level: 'info',
          title: `وضعیت سفارش ${o.code} تغییر کرد`, body: statusInfoText(status) + (tracking ? ` — کد رهگیری: ${tracking}` : ''),
          link: `#/account/orders/${o.id}`,
        });
      }
      return o;
    });
    sendJson(ctx.res, 200, { ok: true, order: publicOrder(out, { full: true }) });
  });

  // ── نظرات ───────────────────────────────────────────────
  A('GET', '/api/admin/reviews', 'reviews.moderate', async (ctx) => {
    const st = ctx.state;
    const status = ctx.query.get('status') || '';
    const type = ctx.query.get('type') || '';
    let list = st.reviews.slice();
    if (status) list = list.filter((r) => r.status === status);
    if (type) list = list.filter((r) => r.type === type);
    list.sort((a, b) => (a.status === 'pending' ? -1 : 1) - (b.status === 'pending' ? -1 : 1) || String(b.createdAt).localeCompare(String(a.createdAt)));
    sendJson(ctx.res, 200, {
      ok: true,
      items: list.slice(0, 200).map((r) => ({
        ...publicReview(r), userId: r.userId,
        productImage: st.products.find((p) => p.id === r.productId)?.images?.[0] || '',
        productName: st.products.find((p) => p.id === r.productId)?.name || r.productName || '',
      })),
      counts: {
        pending: st.reviews.filter((r) => r.status === 'pending').length,
        approved: st.reviews.filter((r) => r.status === 'approved').length,
        rejected: st.reviews.filter((r) => r.status === 'rejected').length,
      },
    });
  });

  A('PATCH', '/api/admin/reviews/:id', null, async (ctx) => {
    const id = V.id(ctx.params.id, 'شناسه');
    const status = ctx.body?.status ? V.oneOf(ctx.body.status, ['pending', 'approved', 'rejected'], 'status') : null;
    if (status) ctx.requirePerm('reviews.moderate');
    const reply = ctx.body?.reply !== undefined ? V.optStr(ctx.body.reply, { max: 1200, field: 'پاسخ' }) : undefined;
    if (reply !== undefined) ctx.requirePerm('reviews.reply');
    const out = await db.tx((st) => {
      const r = st.reviews.find((x) => x.id === id);
      if (!r) throw notFound('not_found', 'نظر یافت نشد.');
      if (status && status !== r.status) {
        r.status = status;
        r.moderatedAt = nowISO();
        r.moderatedBy = ctx.user.name;
        // Recalculate rating whether it was approved or un-approved
        recalcRating(st, r.productId);
        pushNotification(st, {
          userId: r.userId, type: 'review', level: status === 'approved' ? 'success' : 'warning',
          title: status === 'approved' ? 'نظر شما منتشر شد' : (status === 'rejected' ? 'نظر شما تأیید نشد' : 'نظر شما در حال بررسی است'),
          body: `دربارهٔ «${r.productName}»`, link: `#/product/${r.productId}`,
        });
        logAudit(ctx.user, 'review.moderate', id, { status });
      }
      if (reply !== undefined) {
        r.reply = reply;
        r.replyAt = reply ? nowISO() : null;
        if (reply) {
          pushNotification(st, { userId: r.userId, type: 'review', level: 'info', title: 'پاسخ فروشگاه به نظر شما', body: reply.slice(0, 140), link: `#/product/${r.productId}` });
          logAudit(ctx.user, 'review.reply', id, {});
        }
      }
      return r;
    });
    sendJson(ctx.res, 200, { ok: true, review: publicReview(out) });
  });

  A('DELETE', '/api/admin/reviews/:id', 'reviews.moderate', async (ctx) => {
    const id = V.id(ctx.params.id, 'شناسه');
    await db.tx((st) => {
      const r = st.reviews.find((x) => x.id === id);
      if (!r) throw notFound('not_found', 'نظر یافت نشد.');
      st.reviews = st.reviews.filter((x) => x.id !== id);
      recalcRating(st, r.productId);
      logAudit(ctx.user, 'review.delete', id, { product: r.productId });
    });
    sendJson(ctx.res, 200, { ok: true });
  });

  // ── تیکت‌ها (ادمین) ─────────────────────────────────────
  A('GET', '/api/admin/tickets', 'tickets.manage', async (ctx) => {
    const st = ctx.state;
    const status = ctx.query.get('status') || '';
    let list = st.tickets.slice();
    if (status) list = list.filter((t) => t.status === status);
    list.sort((a, b) => {
      const pr = { critical: 0, high: 1, normal: 2, low: 3 };
      return (pr[a.priority] ?? 9) - (pr[b.priority] ?? 9) || String(b.updatedAt).localeCompare(String(a.updatedAt));
    });
    sendJson(ctx.res, 200, {
      ok: true,
      items: list.slice(0, 200).map((t) => ({
        id: t.id, code: t.code, subject: t.subject, category: t.category, priority: t.priority,
        status: t.status, userName: t.userName, userPhone: t.userPhone, messageCount: t.messages.length,
        lastMessage: t.messages[t.messages.length - 1]?.body?.slice(0, 120) || '',
        createdAt: t.createdAt, updatedAt: t.updatedAt,
        unread: t.messages.some((m) => m.from === 'user' && (!t.readBy || !t.readBy['staff'])),
      })),
      counts: { open: st.tickets.filter((t) => t.status === 'open').length, closed: st.tickets.filter((t) => t.status === 'closed').length },
    });
  });

  A('GET', '/api/admin/tickets/:id', 'tickets.manage', async (ctx) => {
    const t = ctx.state.tickets.find((x) => x.id === ctx.params.id);
    if (!t) throw notFound('not_found', 'تیکت یافت نشد.');
    await db.tx((st) => {
      const tt = st.tickets.find((x) => x.id === t.id);
      tt.readBy = tt.readBy || {}; tt.readBy.staff = nowISO();
    });
    const u = ctx.state.users.find((x) => x.id === t.userId);
    sendJson(ctx.res, 200, {
      ok: true,
      ticket: { ...t, user: u ? { id: u.id, name: u.name, phone: u.phone, email: u.email, plus: !!u.plus?.active, orders: ctx.state.orders.filter((o) => o.userId === u.id).length } : null },
    });
  });

  A('PATCH', '/api/admin/tickets/:id', 'tickets.manage', async (ctx) => {
    const id = V.id(ctx.params.id, 'شناسه');
    const body = ctx.body?.body !== undefined ? V.str(ctx.body.body, { min: 1, max: 4000, field: 'پاسخ' }) : null;
    const status = ctx.body?.status ? V.oneOf(ctx.body.status, ['open', 'answered', 'closed'], 'status') : null;
    const priority = ctx.body?.priority ? V.oneOf(ctx.body.priority, ['critical', 'high', 'normal', 'low'], 'priority') : null;
    const out = await db.tx((st) => {
      const t = st.tickets.find((x) => x.id === id);
      if (!t) throw notFound('not_found', 'تیکت یافت نشد.');
      if (priority) t.priority = priority;
      if (body) {
        t.messages.push({ from: 'staff', userId: ctx.user.id, name: ctx.user.name, body, at: nowISO() });
        t.status = status || 'answered';
        pushNotification(st, { userId: t.userId, type: 'ticket', level: 'success', title: `پاسخ تیکت ${t.code}`, body: body.slice(0, 140), link: `#/account/tickets/${t.id}` });
      }
      if (status) t.status = status;
      t.updatedAt = nowISO();
      logAudit(ctx.user, 'ticket.update', t.code, { status: t.status });
      return t;
    });
    sendJson(ctx.res, 200, { ok: true, ticket: out });
  });

  // ── چت پشتیبانی (ادمین) ─────────────────────────────────
  A('GET', '/api/admin/support', 'tickets.manage', async (ctx) => {
    const st = ctx.state;
    const threads = new Map();
    for (const m of st.supportMessages) {
      if (!threads.has(m.userId)) threads.set(m.userId, []);
      threads.get(m.userId).push(m);
    }
    const items = [...threads.entries()].map(([userId, msgs]) => {
      const u = st.users.find((x) => x.id === userId);
      return {
        userId, userName: u?.name || msgs[0].userName || 'کاربر',
        last: msgs[msgs.length - 1], count: msgs.length,
        unread: msgs.filter((m) => m.from === 'user' && !m.readByStaff).length,
        messages: msgs.slice(-40),
      };
    }).sort((a, b) => String(b.last.at).localeCompare(String(a.last.at)));
    sendJson(ctx.res, 200, { ok: true, items });
  });

  A('POST', '/api/admin/support/:userId', 'tickets.manage', async (ctx) => {
    const userId = V.id(ctx.params.userId, 'شناسهٔ کاربر');
    const body = V.str(ctx.body?.body, { min: 1, max: 1000, field: 'پیام' });
    let uObj = null;
    const msg = await db.tx((st) => {
      const u = st.users.find((x) => x.id === userId);
      if (!u) throw notFound('not_found', 'کاربر یافت نشد.');
      uObj = u;
      const m = { id: uid('chat'), userId, userName: u.name, from: 'staff', staffName: ctx.user.name, body, at: nowISO() };
      st.supportMessages.push(m);
      for (const x of st.supportMessages) if (x.userId === userId && x.from === 'user') x.readByStaff = true;
      pushNotification(st, { userId, type: 'support', level: 'info', title: 'پاسخ پشتیبانی', body: body.slice(0, 120), link: '#/account/support' });
      broadcast(userId, 'support', { userId, id: m.id, at: m.at });
      return m;
    });
    
    notifyReply(uObj, body).catch(()=>{});
    
    sendJson(ctx.res, 200, { ok: true, message: msg });
  });

  // ── پیشنهاد/شکایت/گزارش خطا ─────────────────────────────
  A('GET', '/api/admin/feedback', 'feedback.manage', async (ctx) => {
    const st = ctx.state;
    const type = ctx.query.get('type') || '';
    let list = st.feedback.slice();
    if (type) list = list.filter((f) => f.type === type);
    sendJson(ctx.res, 200, {
      ok: true, items: list.slice(0, 200),
      counts: { new: st.feedback.filter((f) => f.status === 'new').length, total: st.feedback.length },
    });
  });

  A('PATCH', '/api/admin/feedback/:id', 'feedback.manage', async (ctx) => {
    const id = V.id(ctx.params.id, 'شناسه');
    const status = ctx.body?.status ? V.oneOf(ctx.body.status, ['new', 'seen', 'in_progress', 'done', 'rejected'], 'status') : null;
    const answer = ctx.body?.answer !== undefined ? V.optStr(ctx.body.answer, { max: 1500, field: 'پاسخ' }) : null;
    const out = await db.tx((st) => {
      const f = st.feedback.find((x) => x.id === id);
      if (!f) throw notFound('not_found', 'مورد یافت نشد.');
      if (status) f.status = status;
      if (answer !== null) f.answer = answer;
      f.updatedAt = nowISO();
      if (f.userId && (answer || status)) {
        pushNotification(st, {
          userId: f.userId, type: 'feedback', level: 'info',
          title: `پاسخ به ${f.type === 'bug' ? 'گزارش خطا' : (f.type === 'complaint' ? 'شکایت' : 'پیشنهاد')} شما`,
          body: answer || 'مورد بررسی و بسته شد.', link: '#/account/feedback',
        });
      }
      logAudit(ctx.user, 'feedback.update', id, { status });
      return f;
    });
    sendJson(ctx.res, 200, { ok: true, item: out });
  });

  // ── کاربران ─────────────────────────────────────────────
  A('GET', '/api/admin/users', 'users.view', async (ctx) => {
    const st = ctx.state;
    const q = normalizeText(ctx.query.get('q') || '');
    let list = st.users.slice();
    if (q) list = list.filter((u) => normalizeText(`${u.name} ${u.username} ${u.phone} ${u.email}`).includes(q));
    const role = ctx.query.get('role');
    if (role) list = list.filter((u) => u.role === role);
    sendJson(ctx.res, 200, {
      ok: true,
      items: list.slice(0, 300).map((u) => ({
        id: u.id, username: u.username, name: u.name, phone: u.phone, email: u.email, role: u.role,
        status: u.status, permissions: u.permissions || {}, wallet: u.wallet?.balance || 0,
        plus: !!u.plus?.active && new Date(u.plus.until || 0) > new Date(), plusUntil: u.plus?.until || null,
        points: u.points || 0, twoFA: !!u.twoFA?.enabled, kycStatus: u.kycStatus || 'none', kycMessage: u.kycMessage || '', kycDocs: u.kycDocs || null,
        orders: st.orders.filter((o) => o.userId === u.id).length,
        spent: st.orders.filter((o) => o.userId === u.id && o.payment?.status === 'paid').reduce((a, b) => a + b.total, 0),
        createdAt: u.createdAt, lastLoginAt: u.lastLoginAt, loginCount: u.loginCount || 0,
        lastIp: u.lastIp || '', lastAgent: u.lastAgent || null, addresses: (u.addresses || []).length,
        banned: (st.bans || []).some((b) => (b.type === 'phone' && b.value === String(u.phone || '').toLowerCase()) || (b.type === 'email' && b.value === String(u.email || '').toLowerCase()) || (b.type === 'username' && b.value === String(u.username || '').toLowerCase())),
      })),
      permissions: PERMISSIONS,
    });
  });

  A('PATCH', '/api/admin/users/:id', null, async (ctx) => {
    const id = V.id(ctx.params.id, 'شناسهٔ کاربر');
    // If not adjusting wallet, plus, or permissions, require users.manage
    if (ctx.body?.status !== undefined || ctx.body?.resetPassword !== undefined || ctx.body?.kycStatus !== undefined) {
      ctx.requirePerm('users.manage');
    }
    const out = await db.tx((st) => {
      const u = st.users.find((x) => x.id === id);
      if (!u) throw notFound('not_found', 'کاربر یافت نشد.');
      if (u.role === 'owner' && ctx.user.id !== u.id && ctx.body?.role) throw forbidden('owner_protected', 'نقش مالک قابل تغییر نیست.');
      if (ctx.body?.role !== undefined) {
        ctx.requirePerm('users.permissions');
        const role = V.oneOf(ctx.body.role, ['user', 'staff', 'owner'], 'role');
        if (role === 'owner' && ctx.user.role !== 'owner') throw forbidden('forbidden', 'فقط مالک می‌تواند نقش مالک بدهد.');
        u.role = role;
      }
      if (ctx.body?.permissions !== undefined) {
        ctx.requirePerm('users.permissions');
        const perms = {};
        for (const p of PERMISSIONS) perms[p.key] = V.bool(ctx.body.permissions?.[p.key], false);
        u.permissions = perms;
      }
      if (ctx.body?.status !== undefined) {
        u.status = V.oneOf(ctx.body.status, ['active', 'blocked'], 'status');
        if (u.status === 'blocked') destroyUserSessions(st, u.id);
      }
      if (ctx.body?.walletAdjust !== undefined) {
        ctx.requirePerm('wallet.manage');
        const amount = V.int(ctx.body.walletAdjust, { min: -50000000, max: 50000000, field: 'مبلغ' });
        const reason = V.str(ctx.body?.walletReason || 'تنظیم توسط مدیر', { min: 2, max: 120, field: 'دلیل' });
        u.wallet = u.wallet || { balance: 0, transactions: [] };
        if (u.wallet.balance + amount < 0) throw badRequest('insufficient', 'موجودی کیف پول کافی نیست.');
        u.wallet.balance += amount;
        u.wallet.transactions.unshift({ id: uid('tx'), at: nowISO(), type: amount >= 0 ? 'adjust_in' : 'adjust_out', amount, status: 'done', note: reason, ref: `ADM-${ctx.user.username}` });
      }
      if (ctx.body?.plusDays !== undefined) {
        ctx.requirePerm('plus.manage');
        const days = V.int(ctx.body.plusDays, { min: -365, max: 365, field: 'روز' });
        const base = u.plus?.active && new Date(u.plus.until) > new Date() ? new Date(u.plus.until) : new Date();
        if (days <= 0 && days !== -365) { u.plus = { active: false, startedAt: null, until: null }; }
        else { u.plus = { active: true, startedAt: u.plus?.startedAt || nowISO(), until: new Date(base.getTime() + days * 86400000).toISOString(), grantedBy: ctx.user.username }; }
      }
      if (ctx.body?.resetPassword !== undefined) {
        ctx.requirePerm('users.manage');
        const pass = V.password(ctx.body.resetPassword);
        u.passwordHash = hashPassword(pass);
        u.mustChangePassword = true;
        destroyUserSessions(st, u.id);
      }
      if (ctx.body?.points !== undefined) u.points = V.int(ctx.body.points, { min: 0, max: 1000000, field: 'امتیاز' });
      if (ctx.body?.kycStatus !== undefined) {
        ctx.requirePerm('users.manage');
        u.kycStatus = V.oneOf(ctx.body.kycStatus, ['none', 'pending', 'approved', 'rejected'], 'kycStatus');
        if (ctx.body?.kycMessage !== undefined) u.kycMessage = String(ctx.body.kycMessage).slice(0, 300);
      }
      logAudit(ctx.user, 'user.admin.update', u.username, { fields: Object.keys(ctx.body).join(',') });
      pushNotification(st, { userId: u.id, type: 'account', level: 'info', title: 'تغییر در حساب کاربری', body: 'اطلاعات حساب شما توسط تیم فروشگاه به‌روزرسانی شد.', link: '#/account/profile' });
      return u;
    });
    sendJson(ctx.res, 200, { ok: true, user: { id: out.id, username: out.username, role: out.role, status: out.status, permissions: out.permissions, wallet: out.wallet?.balance, plus: out.plus } });
  });

  // ── کوپن‌ها ──────────────────────────────────────────────
  A('GET', '/api/admin/coupons', 'coupons.manage', async (ctx) => sendJson(ctx.res, 200, { ok: true, items: ctx.state.coupons }));
  A('POST', '/api/admin/coupons', 'coupons.manage', async (ctx) => {
    const c = {
      id: uid('cp'),
      code: V.str(ctx.body?.code, { min: 3, max: 24, field: 'کد' }).toUpperCase().replace(/[^A-Z0-9_-]/g, ''),
      type: V.oneOf(ctx.body?.type, ['percent', 'amount'], 'type', 'percent'),
      value: V.int(ctx.body?.value, { min: 1, max: 100000000, field: 'مقدار' }),
      maxDiscount: V.int(ctx.body?.maxDiscount, { min: 0, max: 100000000, field: 'سقف تخفیف', def: 0 }),
      minOrder: V.int(ctx.body?.minOrder, { min: 0, max: 100000000, field: 'حداقل سفارش', def: 0 }),
      usageLimit: V.int(ctx.body?.usageLimit, { min: 1, max: 100000, field: 'سقف استفاده', def: 100 }),
      perUser: V.int(ctx.body?.perUser, { min: 1, max: 100, field: 'سقف هر کاربر', def: 1 }),
      active: V.bool(ctx.body?.active, true),
      startAt: V.date(ctx.body?.startAt, 'تاریخ شروع') || nowISO(),
      endAt: V.date(ctx.body?.endAt, 'تاریخ پایان') || new Date(Date.now() + 30 * 86400000).toISOString(),
      note: V.optStr(ctx.body?.note, { max: 120, field: 'توضیحات' }),
      used: 0, createdAt: nowISO(),
    };
    if (c.type === 'percent' && c.value > 90) throw badRequest('invalid_value', 'درصد تخفیف نمی‌تواند بیشتر از ۹۰ باشد.');
    await db.tx((st) => {
      if (st.coupons.some((x) => x.code === c.code)) throw conflict('exists', 'این کد قبلاً ثبت شده است.');
      st.coupons.push(c);
      logAudit(ctx.user, 'coupon.create', c.code, { type: c.type, value: c.value });
    });
    sendJson(ctx.res, 200, { ok: true, coupon: c });
  });
  A('PATCH', '/api/admin/coupons/:id', 'coupons.manage', async (ctx) => {
    const id = V.id(ctx.params.id, 'شناسه');
    const out = await db.tx((st) => {
      const c = st.coupons.find((x) => x.id === id);
      if (!c) throw notFound('not_found', 'کوپن یافت نشد.');
      for (const k of ['type', 'value', 'maxDiscount', 'minOrder', 'usageLimit', 'perUser', 'active', 'startAt', 'endAt', 'note']) {
        if (ctx.body[k] === undefined) continue;
        if (k === 'active') c.active = V.bool(ctx.body.active);
        else if (['value', 'maxDiscount', 'minOrder', 'usageLimit', 'perUser'].includes(k)) c[k] = V.int(ctx.body[k], { min: 0, max: 100000000, field: k });
        else if (['startAt', 'endAt'].includes(k)) c[k] = V.date(ctx.body[k], k);
        else if (k === 'type') c.type = V.oneOf(ctx.body.type, ['percent', 'amount'], 'type');
        else c[k] = V.optStr(ctx.body[k], { max: 120, field: k });
      }
      logAudit(ctx.user, 'coupon.update', c.code, {});
      return c;
    });
    sendJson(ctx.res, 200, { ok: true, coupon: out });
  });
  A('DELETE', '/api/admin/coupons/:id', 'coupons.manage', async (ctx) => {
    const id = V.id(ctx.params.id, 'شناسه');
    await db.tx((st) => { st.coupons = st.coupons.filter((c) => c.id !== id); logAudit(ctx.user, 'coupon.delete', id, {}); });
    sendJson(ctx.res, 200, { ok: true });
  });

  // ── تبلیغات ─────────────────────────────────────────────
  A('GET', '/api/admin/ads', 'ads.manage', async (ctx) => sendJson(ctx.res, 200, { ok: true, items: ctx.state.ads, slots: AD_SLOTS }));
  A('POST', '/api/admin/ads', 'ads.manage', async (ctx) => {
    const a = {
      id: uid('ad'),
      slot: V.oneOf(ctx.body?.slot, AD_SLOTS.map((s) => s.id), 'slot'),
      title: V.str(ctx.body?.title, { min: 2, max: 80, field: 'عنوان' }),
      titleEn: V.optStr(ctx.body?.titleEn, { max: 80, field: 'عنوان انگلیسی' }),
      text: V.optStr(ctx.body?.text, { max: 240, field: 'متن' }),
      textEn: V.optStr(ctx.body?.textEn, { max: 240, field: 'متن انگلیسی' }),
      link: V.optStr(ctx.body?.link, { max: 200, field: 'لینک' }),
      cta: V.optStr(ctx.body?.cta, { max: 40, field: 'دکمه' }),
      ctaEn: V.optStr(ctx.body?.ctaEn, { max: 40, field: 'دکمه انگلیسی' }),
      image: V.optStr(ctx.body?.image, { max: 300, field: 'تصویر' }),
      active: V.bool(ctx.body?.active, true),
      startAt: V.date(ctx.body?.startAt, 'شروع') || nowISO(),
      endAt: V.date(ctx.body?.endAt, 'پایان') || new Date(Date.now() + 30 * 86400000).toISOString(),
      clicks: 0, views: 0, createdAt: nowISO(),
    };
    if (a.link && !/^(#|\/|https?:\/\/)/.test(a.link)) throw badRequest('invalid_link', 'لینک باید با # یا / یا http شروع شود.');
    const out = await db.tx((st) => { st.ads.push(a); logAudit(ctx.user, 'ad.create', a.title, { slot: a.slot }); return a; });
    sendJson(ctx.res, 200, { ok: true, ad: out });
  });
  A('PATCH', '/api/admin/ads/:id', 'ads.manage', async (ctx) => {
    const id = V.id(ctx.params.id, 'شناسه');
    const out = await db.tx((st) => {
      const a = st.ads.find((x) => x.id === id);
      if (!a) throw notFound('not_found', 'تبلیغ یافت نشد.');
      for (const k of ['slot', 'title', 'titleEn', 'text', 'textEn', 'link', 'cta', 'ctaEn', 'image', 'active', 'startAt', 'endAt']) {
        if (ctx.body[k] === undefined) continue;
        if (k === 'active') a.active = V.bool(ctx.body.active);
        else if (k === 'slot') a.slot = V.oneOf(ctx.body.slot, AD_SLOTS.map((s) => s.id), 'slot');
        else if (['startAt', 'endAt'].includes(k)) a[k] = V.date(ctx.body[k], k);
        else a[k] = V.optStr(ctx.body[k], { max: 300, field: k });
      }
      logAudit(ctx.user, 'ad.update', id, {});
      return a;
    });
    sendJson(ctx.res, 200, { ok: true, ad: out });
  });
  A('DELETE', '/api/admin/ads/:id', 'ads.manage', async (ctx) => {
    const id = V.id(ctx.params.id, 'شناسه');
    await db.tx((st) => { st.ads = st.ads.filter((a) => a.id !== id); logAudit(ctx.user, 'ad.delete', id, {}); });
    sendJson(ctx.res, 200, { ok: true });
  });

  // ── اعلان همگانی ────────────────────────────────────────
  A('POST', '/api/admin/notifications', 'notifications.send', async (ctx) => {
    const userId = V.optStr(ctx.body?.userId, { max: 40, field: 'کاربر' }) || null;
    const title = V.str(ctx.body?.title, { min: 3, max: 120, field: 'عنوان' });
    const titleEn = V.optStr(ctx.body?.titleEn, { max: 120, field: 'عنوان انگلیسی' });
    const body = V.optStr(ctx.body?.body, { max: 600, field: 'متن' });
    const bodyEn = V.optStr(ctx.body?.bodyEn, { max: 600, field: 'متن انگلیسی' });
    const link = V.optStr(ctx.body?.link, { max: 200, field: 'لینک' });
    const level = V.oneOf(ctx.body?.level, ['info', 'success', 'warning', 'error'], 'level', 'info');
    const type = V.oneOf(ctx.body?.type, ['announcement', 'news', 'offer', 'system'], 'type', 'announcement');
    if (link && !/^(#|\/|https?:\/\/)/.test(link)) throw badRequest('invalid_link', 'لینک معتبر نیست.');
    const channels = Array.isArray(ctx.body?.channels) && ctx.body.channels.length
      ? ctx.body.channels.filter((c) => ['site', 'telegram', 'email', 'sms'].includes(c))
      : ['site'];
    let rec = null;
    if (channels.includes('site')) {
      rec = await db.tx((st) => {
        if (userId && !st.users.some((u) => u.id === userId)) throw notFound('not_found', 'کاربر یافت نشد.');
        return pushNotification(st, { userId, type, level, title, titleEn, body, bodyEn, link });
      });
    }
    const results = {};
    const textMsg = `${title}\n${body || ''}`.trim();
    if (channels.includes('telegram')) {
      if (telegramEnabled()) { try { results.telegram = await tgBroadcast(textMsg); } catch (e) { results.telegram = { error: String(e.message) }; } }
      else results.telegram = { error: 'disabled' };
    }
    const targets = await db.read((st) => {
      const list = userId ? st.users.filter((u) => u.id === userId) : st.users.filter((u) => u.role === 'user');
      return list.slice(0, 300).map((u) => ({ email: u.email || '', phone: u.phone || '' }));
    });
    if (channels.includes('email')) {
      if (!mailConfigured()) results.email = { error: 'not_configured' };
      else {
        let okc = 0; let fail = 0;
        for (const t of targets.filter((x) => x.email)) { try { await sendMail({ to: t.email, subject: title, body: textMsg }); okc++; } catch { fail++; } }
        results.email = { ok: okc, fail };
      }
    }
    if (channels.includes('sms')) {
      if (!smsConfigured()) results.sms = { error: 'not_configured' };
      else {
        let okc = 0; let fail = 0;
        for (const t of targets.filter((x) => x.phone)) { try { await sendSms(t.phone, textMsg); okc++; } catch { fail++; } }
        results.sms = { ok: okc, fail };
      }
    }
    await db.tx((st) => {
      st.outbox = st.outbox || [];
      st.outbox.unshift({ id: uid('obx'), at: nowISO(), by: ctx.user.username, title, channels, results });
      if (st.outbox.length > 120) st.outbox.length = 120;
      logAudit(ctx.user, 'notification.send', title, { userId: userId || 'all', channels: channels.join(',') });
    });
    sendJson(ctx.res, 200, { ok: true, notification: rec ? publicNotification(rec) : null, results });
  });

  A('GET', '/api/admin/notifications', 'notifications.send', async (ctx) => {
    sendJson(ctx.res, 200, { ok: true, items: ctx.state.notifications.slice(0, 100), outbox: (ctx.state.outbox || []).slice(0, 60) });
  });

  // ── تنظیمات ─────────────────────────────────────────────
  A('GET', '/api/admin/settings', 'settings.edit', async (ctx) => {
    sendJson(ctx.res, 200, { ok: true, settings: ctx.state.settings, permissions: PERMISSIONS, adSlots: AD_SLOTS });
  });

  A('PATCH', '/api/admin/settings/:section', 'settings.edit', async (ctx) => {
    const section = V.oneOf(ctx.params.section, ['store', 'theme', 'ui', 'features', 'shipping', 'plus', 'orders', 'seo', 'currency', 'auth', 'contact', 'partners', 'security'], 'section');
    if (['theme', 'ui'].includes(section)) ctx.requirePerm('theme.edit');
    const patch = ctx.body?.value && typeof ctx.body.value === 'object' ? ctx.body.value : ctx.body;
    const out = await db.tx((st) => {
      st.settings[section] = st.settings[section] || {};
      const sanitized = sanitizeSection(section, patch, st.settings[section]);
      st.settings[section] = { ...st.settings[section], ...sanitized };
      logAudit(ctx.user, `settings.${section}.update`, section, { fields: Object.keys(sanitized).join(',') });
      return st.settings[section];
    });
    sendJson(ctx.res, 200, { ok: true, section, value: out });
  });

  A('GET', '/api/admin/pages', 'pages.edit', async (ctx) => sendJson(ctx.res, 200, { ok: true, pages: ctx.state.pages }));
  A('PATCH', '/api/admin/pages/:key', 'pages.edit', async (ctx) => {
    const key = V.oneOf(ctx.params.key, ['about', 'guide', 'service', 'faq', 'terms', 'privacy', 'insurance', 'ticketRules', 'bugReport', 'contact', 'installments'], 'key');
    const out = await db.tx((st) => {
      const patch = ctx.body?.value && typeof ctx.body.value === 'object' ? ctx.body.value : {};
      if (Array.isArray(st.pages[key]) || key === 'faq') {
        // صفحهٔ سؤالات متداول یک آرایه است: {cat,q,qEn,a,aEn}
        const items = Array.isArray(patch.faq) ? patch.faq : (Array.isArray(patch.items) ? patch.items : st.pages[key]);
        st.pages[key] = items.slice(0, 120).map((x, i) => {
          const prev = st.pages[key]?.[i] || {};
          const str = (v, m) => (typeof v === 'string' ? v.slice(0, m) : undefined);
          return {
            cat: (str(x?.cat, 24) ?? prev.cat ?? 'general').replace(/[^a-z_]/gi, ''),
            q: str(x?.q, 300) ?? prev.q ?? '', qEn: str(x?.qEn, 300) ?? prev.qEn ?? '',
            a: str(x?.a, 4000) ?? prev.a ?? '', aEn: str(x?.aEn, 4000) ?? prev.aEn ?? '',
          };
        }).filter((x) => x.q || x.a);
      } else {
        st.pages[key] = st.pages[key] || {};
        st.pages[key] = mergePage(st.pages[key], patch);
      }
      logAudit(ctx.user, 'pages.update', key, {});
      return st.pages[key];
    });
    sendJson(ctx.res, 200, { ok: true, key, page: out });
  });

  // ── گزارش رویدادها ──────────────────────────────────────
  // ── پشتیبان‌گیری و دامپ کامل ──
  A('GET', '/api/admin/backups', 'settings.edit', async (ctx) => {
    sendJson(ctx.res, 200, { ok: true, items: listBackups(), everyHours: 12, keep: 14 });
  });
  A('POST', '/api/admin/backups', 'settings.edit', async (ctx) => {
    const meta = createBackup(ctx.user, 'manual');
    sendJson(ctx.res, 200, { ok: true, backup: meta });
  });
  A('POST', '/api/admin/backups/restore', 'settings.edit', async (ctx) => {
    const id = V.optStr(ctx.body?.id, { max: 60, field: 'نسخه' });
    const r = restoreBackup(id, ctx.user);
    if (!r) throw notFound('backup_not_found', 'نسخهٔ پشتیبان پیدا نشد.');
    sendJson(ctx.res, 200, r);
  });
  A('GET', '/api/admin/backups/:id/download', 'settings.edit', async (ctx) => {
    const snap = readBackup(ctx.params.id);
    if (!snap) throw notFound('backup_not_found', 'نسخهٔ پشتیبان پیدا نشد.');
    const buf = Buffer.from(JSON.stringify(snap, null, 2), 'utf8');
    ctx.res.writeHead(200, {
      'Content-Type': 'application/json; charset=utf-8',
      'Content-Disposition': `attachment; filename="yassaei-backup-${String(ctx.params.id).replace(/[^a-zA-Z0-9-]/g, '')}.json"`,
      'Content-Length': String(buf.length),
    });
    ctx.res.end(buf);
  });
  A('GET', '/api/admin/dump', 'settings.edit', async (ctx) => {
    const st = db.raw;
    const payload = { exportedAt: nowISO(), store: st.settings?.store?.name || 'Yassaei Electronics', db: st };
    const buf = Buffer.from(JSON.stringify(payload, null, 2), 'utf8');
    ctx.res.writeHead(200, {
      'Content-Type': 'application/json; charset=utf-8',
      'Content-Disposition': 'attachment; filename="yassaei-full-dump.json"',
      'Content-Length': String(buf.length),
    });
    ctx.res.end(buf);
  });

  // ── مسدودسازی (بن/آن‌بن) ──
  A('GET', '/api/admin/bans', 'users.view', async (ctx) => {
    sendJson(ctx.res, 200, { ok: true, items: ctx.state.bans || [] });
  });
  A('POST', '/api/admin/bans', 'users.manage', async (ctx) => {
    const type = V.oneOf(ctx.body?.type, ['ip', 'phone', 'email', 'username'], 'type');
    const value = V.str(ctx.body?.value, { min: 3, max: 120, field: 'مقدار' }).trim().toLowerCase();
    const reason = V.optStr(ctx.body?.reason, { max: 200, field: 'دلیل' });
    const minutes = V.int(ctx.body?.minutes, { min: 0, max: 525600, field: 'دقیقه', def: 0 });
    const exists = await db.read((st) => (st.bans || []).some((b) => b.type === type && b.value === value && (!b.until || new Date(b.until).getTime() > Date.now())));
    if (exists) throw conflict('exists', 'این مقدار قبلاً مسدود شده است.');
    const rec = await db.tx((st) => {
      const b = { id: uid('ban'), type, value, reason, at: nowISO(), by: ctx.user.username, until: minutes > 0 ? new Date(Date.now() + minutes * 60000).toISOString() : null };
      st.bans = st.bans || [];
      st.bans.unshift(b);
      logAudit(ctx.user, 'ban.add', `${type}:${value}`, { reason, minutes });
      return b;
    });
    sendJson(ctx.res, 200, { ok: true, ban: rec });
  });
  A('DELETE', '/api/admin/bans/:id', 'users.manage', async (ctx) => {
    await db.tx((st) => {
      const b = (st.bans || []).find((x) => x.id === ctx.params.id);
      if (!b) throw notFound('not_found', 'موردی یافت نشد.');
      st.bans = st.bans.filter((x) => x.id !== ctx.params.id);
      logAudit(ctx.user, 'ban.remove', `${b.type}:${b.value}`, {});
    });
    sendJson(ctx.res, 200, { ok: true });
  });

  // ── بازدیدکنندگان ──
  A('GET', '/api/admin/visitors', 'users.view', async (ctx) => {
    const q = String(ctx.query.get('q') || '').trim().toLowerCase();
    let list = ctx.state.visitors || [];
    if (q) list = list.filter((v) => `${v.ip} ${v.os} ${v.device} ${v.browser} ${v.path} ${v.userId || ''}`.toLowerCase().includes(q));
    sendJson(ctx.res, 200, { ok: true, items: list.slice(0, 400), total: (ctx.state.visitors || []).length });
  });

  // ── بات تلگرام ──
  A('GET', '/api/admin/telegram', 'settings.edit', async (ctx) => {
    const tg = ctx.state.settings?.telegram || {};
    const meta = ctx.state.meta || {};
    sendJson(ctx.res, 200, {
      ok: true, enabled: !!tg.enabled, tokenSet: !!tg.token, welcome: tg.welcome || '',
      inbox: (ctx.state.telegramInbox || []).slice(0, 60), subs: Object.keys(ctx.state.telegramSubs || {}).length,
      lastPoll: meta.tgLastPoll || '', lastError: meta.tgLastError || '',
      webhook: tgWebhookState(),
    });
  });
  A('POST', '/api/admin/telegram', 'settings.edit', async (ctx) => {
    await db.tx((st) => {
      st.settings.telegram = st.settings.telegram || {};
      if (ctx.body?.enabled !== undefined) st.settings.telegram.enabled = V.bool(ctx.body.enabled);
      if (ctx.body?.token !== undefined) st.settings.telegram.token = V.optStr(ctx.body.token, { max: 80, field: 'توکن' }).trim();
      if (ctx.body?.welcome !== undefined) st.settings.telegram.welcome = V.optStr(ctx.body.welcome, { max: 400, field: 'خوش‌آمد' });
      logAudit(ctx.user, 'telegram.settings', '', {});
    });
    sendJson(ctx.res, 200, { ok: true });
  });
  A('POST', '/api/admin/telegram/reply', 'settings.edit', async (ctx) => {
    const chatId = V.str(ctx.body?.chatId, { min: 1, max: 40, field: 'چت' });
    const text = V.str(ctx.body?.text, { min: 1, max: 800, field: 'متن' });
    try { await tgSend(chatId, text); } catch (e) { throw badRequest('tg_fail', `ارسال ناموفق: ${e.message}`); }
    await db.tx((st) => {
      const item = (st.telegramInbox || []).find((x) => x.chatId === String(chatId));
      if (item) item.replied = true;
      logAudit(ctx.user, 'telegram.reply', String(chatId), {});
    });
    sendJson(ctx.res, 200, { ok: true });
  });
  A('POST', '/api/admin/telegram/test', 'settings.edit', async (ctx) => {
    const chatId = V.str(ctx.body?.chatId, { min: 1, max: 40, field: 'چت' });
    try { await tgSend(chatId, 'ping', {}); } catch (e) { throw badRequest('tg_fail', `اتصال ناموفق: ${e.message}`); }
    sendJson(ctx.res, 200, { ok: true });
  });

  // ── قرعه‌کشی ──
  A('GET', '/api/admin/lotteries', 'settings.edit', async (ctx) => {
    const st = ctx.state;
    const items = (st.lotteries || []).map((l) => ({ ...l, entries: lotteryEntries(st, l).length }));
    sendJson(ctx.res, 200, { ok: true, items });
  });
  A('POST', '/api/admin/lotteries', 'settings.edit', async (ctx) => {
    const title = V.str(ctx.body?.title, { min: 3, max: 120, field: 'عنوان' });
    const prize = V.str(ctx.body?.prize, { min: 2, max: 200, field: 'جایزه' });
    const endsAt = V.str(ctx.body?.endsAt, { min: 4, max: 40, field: 'پایان' });
    const winnersCount = Math.max(1, Math.min(50, Number(ctx.body?.winnersCount || 1)));
    const entryMode = V.oneOf(ctx.body?.entryMode, ['orders', 'manual'], 'entryMode', 'orders');
    const rec = await db.tx((st) => {
      const l = { id: uid('lot'), title, prize, endsAt, winnersCount, entryMode, status: 'active', winners: [], manual: [], createdAt: nowISO(), by: ctx.user.username };
      st.lotteries = st.lotteries || [];
      st.lotteries.unshift(l);
      logAudit(ctx.user, 'lottery.create', title, {});
      return l;
    });
    sendJson(ctx.res, 200, { ok: true, lottery: rec });
  });
  A('POST', '/api/admin/lotteries/:id/run', 'settings.edit', async (ctx) => {
    const out = await db.tx((st) => {
      const l = (st.lotteries || []).find((x) => x.id === ctx.params.id);
      if (!l) throw notFound('not_found', 'قرعه‌کشی یافت نشد.');
      if (l.status === 'drawn') throw conflict('drawn', 'قبلاً قرعه‌کشی شده است.');
      const pool = lotteryEntries(st, l);
      if (!pool.length) throw badRequest('no_entries', 'شرکت‌کننده‌ای وجود ندارد.');
      const winners = [];
      let copy = [...pool];
      for (let i = 0; i < l.winnersCount && copy.length > 0; i++) {
        const idx = Math.floor(Math.random() * copy.length);
        const winnerId = copy[idx];
        winners.push(winnerId);
        // Remove all entries of the same winner so they don't win multiple times
        copy = copy.filter(id => id !== winnerId);
      }
      l.winners = winners.map((uidv) => ({ userId: uidv, name: st.users.find((u) => u.id === uidv)?.name || uidv, at: nowISO() }));
      l.status = 'drawn';
      for (const w of l.winners) pushNotification(st, { userId: w.userId, type: 'announcement', level: 'success', title: `تبریک! برندهٔ قرعه‌کشی ${l.title} شدی`, body: `جایزه: ${l.prize}` });
      logAudit(ctx.user, 'lottery.run', l.title, { winners: l.winners.length });
      return l;
    });
    sendJson(ctx.res, 200, { ok: true, lottery: out });
  });
  A('POST', '/api/admin/lotteries/:id/close', 'settings.edit', async (ctx) => {
    await db.tx((st) => {
      const l = (st.lotteries || []).find((x) => x.id === ctx.params.id);
      if (!l) throw notFound('not_found', 'قرعه‌کشی یافت نشد.');
      l.status = 'closed';
      logAudit(ctx.user, 'lottery.close', l.title, {});
    });
    sendJson(ctx.res, 200, { ok: true });
  });

  A('GET', '/api/admin/audit', 'audit.view', async (ctx) => {
    const st = ctx.state;
    const q = normalizeText(ctx.query.get('q') || '');
    const action = ctx.query.get('action') || '';
    let list = (st.audit || []).slice();
    if (action) list = list.filter((l) => l.action.startsWith(action));
    if (q) list = list.filter((l) => normalizeText(`${l.action} ${l.actorName} ${l.target} ${JSON.stringify(l.meta)}`).includes(q));
    const page = Math.max(1, Number(ctx.query.get('page')) || 1);
    const limit = Math.min(200, Number(ctx.query.get('limit')) || 50);
    sendJson(ctx.res, 200, { ok: true, items: list.slice((page - 1) * limit, page * limit), total: list.length, page, pages: Math.max(1, Math.ceil(list.length / limit)) });
  });

  // ── آمار و گزارش‌گیری ───────────────────────────────────
  A('GET', '/api/admin/stats', 'stats.view', async (ctx) => {
    const st = ctx.state;
    const days = Math.min(90, Math.max(7, Number(ctx.query.get('days')) || 30));
    const series = [];
    for (let i = days - 1; i >= 0; i--) {
      const d = new Date(Date.now() - i * 86400000).toISOString().slice(0, 10);
      const v = st.visits[d] || { visits: 0, unique: 0 };
      const orders = st.orders.filter((o) => o.createdAt.slice(0, 10) === d);
      series.push({
        date: d, visits: v.visits || 0, unique: v.unique || 0,
        orders: orders.length, revenue: orders.filter((o) => o.payment?.status === 'paid').reduce((a, b) => a + b.total, 0),
      });
    }
    const byCat = {};
    for (const p of st.products) {
      const c = st.categories.find((x) => x.id === p.categoryId);
      const key = c?.name || 'نامشخص';
      byCat[key] = byCat[key] || { products: 0, sold: 0, revenue: 0, stock: 0 };
      byCat[key].products++;
      byCat[key].sold += p.sold || 0;
      byCat[key].stock += p.stock || 0;
      byCat[key].revenue += (p.sold || 0) * p.price;
    }
    const byBrand = {};
    for (const p of st.products) {
      const b = st.brands.find((x) => x.id === p.brandId);
      const key = b?.name || 'نامشخص';
      byBrand[key] = (byBrand[key] || 0) + (p.sold || 0);
    }
    const stockValue = st.products.reduce((a, p) => a + (p.stock || 0) * (p.cost || 0), 0);
    const missedSearches = Object.entries(st.missedSearches || {})
      .map(([q, data]) => ({ q, count: data.count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 50);

    sendJson(ctx.res, 200, {
      ok: true, series, byCat, byBrand, missedSearches,
      summary: {
        orders: st.orders.length,
        revenue: st.orders.filter((o) => o.payment?.status === 'paid').reduce((a, b) => a + b.total, 0),
        users: st.users.filter((u) => u.role === 'user').length,
        products: st.products.length,
        stockValue,
        avgOrder: st.orders.length ? Math.round(st.orders.reduce((a, b) => a + b.total, 0) / st.orders.length) : 0,
      },
      visits: st.visits,
    });
  });

  // ── بارکد و برچسب ───────────────────────────────────────
  A('GET', '/api/admin/barcode', 'barcode.print', async (ctx) => {
    const st = ctx.state;
    const q = normalizeText(ctx.query.get('q') || '');
    let list = st.products.slice();
    if (q) list = list.filter((p) => normalizeText(`${p.name} ${p.sku} ${p.barcode}`).includes(q));
    sendJson(ctx.res, 200, {
      ok: true,
      items: list.slice(0, 300).map((p) => ({
        id: p.id, sku: p.sku, barcode: p.barcode, name: p.name, price: p.price,
        oldPrice: p.oldPrice || 0, stock: p.stock || 0, brand: p.brandName, image: p.images?.[0] || '',
      })),
      labelSizes: LABEL_SIZES,
    });
  });

  A('POST', '/api/admin/barcode/generate', 'barcode.print', async (ctx) => {
    const count = V.int(ctx.body?.count, { min: 1, max: 50, field: 'تعداد', def: 1 });
    const productId = V.optStr(ctx.body?.productId, { max: 40, field: 'کالا' });
    const out = await db.tx((st) => {
      const codes = [];
      for (let i = 0; i < count; i++) {
        let code = ean13(`202${crypto.randomInt(100000000, 999999999)}`);
        let guard = 0;
        while (st.products.some((p) => p.barcode === code) && guard++ < 20) code = ean13(`202${crypto.randomInt(100000000, 999999999)}`);
        codes.push(code);
      }
      if (productId) {
        const p = st.products.find((x) => x.id === productId);
        if (!p) throw notFound('product_not_found', 'کالا یافت نشد.');
        p.barcode = codes[0];
        p.updatedAt = nowISO();
        logAudit(ctx.user, 'barcode.assign', `${p.sku}:${codes[0]}`, {});
      }
      return codes;
    });
    invalidateSearchIndex();
    sendJson(ctx.res, 200, { ok: true, codes: out });
  });

  A('POST', '/api/admin/barcode/scan-log', 'barcode.scan', async (ctx) => {
    const code = V.str(ctx.body?.code, { min: 4, max: 40, field: 'بارکد' });
    const p = ctx.state.products.find((x) => x.barcode === code || x.sku === code || x.id === code);
    logAudit(ctx.user, 'barcode.scan', code, { found: !!p, product: p?.name || '' });
    if (!p) return sendJson(ctx.res, 404, { ok: false, code: 'not_found', found: false, message: 'کالایی با این بارکد پیدا نشد.' });
    sendJson(ctx.res, 200, { ok: true, found: true, product: adminProduct(p) });
  });

  // ── جست‌وجوی تصویری: ایندکس هش تصاویر ───────────────────
  A('POST', '/api/admin/image-index', 'imagesearch.index', async (ctx) => {
    const entries = V.arr(ctx.body?.entries, { max: 300, field: 'entries' });
    const out = await db.tx((st) => {
      st.imageHashes = st.imageHashes || {};
      let n = 0;
      for (const e of entries) {
        const pid = V.optStr(e?.productId, { max: 40, field: 'productId' });
        const dhash = V.optStr(e?.dhash, { max: 16, field: 'dhash' });
        if (!pid || !dhash || !st.products.some((p) => p.id === pid)) continue;
        st.imageHashes[pid] = { dhash: dhash.slice(0, 16), hist: Array.isArray(e.hist) ? e.hist.slice(0, 64).map((x) => Number(x) || 0) : [], at: nowISO() };
        n++;
      }
      logAudit(ctx.user, 'imagesearch.index', `${n} items`, {});
      return { indexed: n, total: Object.keys(st.imageHashes).length };
    });
    sendJson(ctx.res, 200, { ok: true, ...out });
  });

  A('GET', '/api/admin/image-index', 'imagesearch.index', async (ctx) => {
    sendJson(ctx.res, 200, {
      ok: true,
      indexed: Object.keys(ctx.state.imageHashes || {}).length,
      products: ctx.state.products.filter((p) => p.active !== false).map((p) => ({ id: p.id, name: p.name, image: p.images?.[0] || '', indexed: !!(ctx.state.imageHashes || {})[p.id] })),
    });
  });

  // ── خروجی و پشتیبان ─────────────────────────────────────
  A('GET', '/api/admin/export/:kind', 'data.export', async (ctx) => {
    const st = ctx.state;
    const kind = V.oneOf(ctx.params.kind, ['products', 'orders', 'users', 'reviews', 'tickets', 'audit', 'all'], 'kind');
    const data = {
      products: () => st.products.map((p) => ({ id: p.id, sku: p.sku, barcode: p.barcode, name: p.name, nameEn: p.nameEn, category: st.categories.find((c) => c.id === p.categoryId)?.name || '', brand: st.brands.find((b) => b.id === p.brandId)?.name || '', price: p.price, oldPrice: p.oldPrice, cost: p.cost, stock: p.stock, sold: p.sold, active: p.active })),
      orders: () => st.orders.map((o) => ({ code: o.code, date: o.createdAt, user: o.userName, phone: o.userPhone, items: o.items.map((i) => `${i.name} ×${i.qty}`).join(' | '), subtotal: o.subtotal, shipping: o.shipping, insurance: o.insuranceFee, total: o.total, status: o.status, delivery: o.delivery, payment: o.payment?.method })),
      users: () => st.users.map((u) => ({ id: u.id, username: u.username, name: u.name, phone: u.phone, email: u.email, role: u.role, wallet: u.wallet?.balance || 0, plus: !!u.plus?.active, points: u.points, createdAt: u.createdAt, lastLoginAt: u.lastLoginAt })),
      reviews: () => st.reviews.map((r) => ({ id: r.id, product: r.productName, user: r.userName, type: r.type, rating: r.rating, title: r.title, body: r.body, status: r.status, createdAt: r.createdAt })),
      tickets: () => st.tickets.map((t) => ({ code: t.code, user: t.userName, subject: t.subject, category: t.category, priority: t.priority, status: t.status, messages: t.messages.length, createdAt: t.createdAt })),
      audit: () => (st.audit || []).slice(0, 2000),
      all: () => ({ exportedAt: nowISO(), settings: st.settings, categories: st.categories, brands: st.brands, products: st.products, orders: st.orders, users: st.users.map(({ passwordHash, ...u }) => u), reviews: st.reviews, tickets: st.tickets, coupons: st.coupons, ads: st.ads, pages: st.pages, feedback: st.feedback, visits: st.visits }),
    };
    const payload = data[kind]();
    logAudit(ctx.user, 'data.export', kind, {});
    if (ctx.query.get('format') === 'csv') {
      const csv = toCsv(payload);
      ctx.res.writeHead(200, {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="bander-${kind}-${dayKey()}.csv"`,
        'Cache-Control': 'no-store',
      });
      ctx.res.end('\uFEFF' + csv);
      return;
    }
    ctx.res.writeHead(200, {
      'Content-Type': 'application/json; charset=utf-8',
      'Content-Disposition': `attachment; filename="bander-${kind}-${dayKey()}.json"`,
      'Cache-Control': 'no-store',
    });
    ctx.res.end(JSON.stringify(payload, null, 2));
  });

  A('POST', '/api/admin/backup', 'settings.edit', async (ctx) => {
    if (ctx.user.role !== 'owner') throw forbidden('forbidden', 'فقط مالک می‌تواند پشتیبان بگیرد.');
    const file = path.join(ROOT, 'data', `backup-${dayKey()}-${Date.now().toString(36)}.json`);
    await db.flush(true);
    await fs.promises.copyFile(path.join(ROOT, 'data', 'db.json'), file);
    logAudit(ctx.user, 'backup.create', path.basename(file), {});
    sendJson(ctx.res, 200, { ok: true, file: path.basename(file), sizeKb: Math.round(fs.statSync(file).size / 1024) });
  });

  // ── پاک‌سازی دوره‌ای (دستی هم قابل اجراست) ─────────────
  A('POST', '/api/admin/maintenance/cleanup', 'settings.edit', async (ctx) => {
    const out = await db.tx((st) => {
      const cutoff = Date.now() - 90 * 86400000;
      const before = (st.audit || []).length;
      st.audit = (st.audit || []).filter((l) => new Date(l.at).getTime() > cutoff);
      st.otps = st.otps.filter((o) => new Date(o.expiresAt).getTime() > Date.now() - 86400000);
      const sessBefore = (st.sessions || []).length;
      st.sessions = (st.sessions || []).filter((s) => new Date(s.expiresAt).getTime() > Date.now());
      logAudit(ctx.user, 'maintenance.cleanup', '', { audit: before - (st.audit || []).length, sessions: sessBefore - (st.sessions || []).length });
      return { auditRemoved: before - (st.audit || []).length, sessionsRemoved: sessBefore - (st.sessions || []).length };
    });
    sendJson(ctx.res, 200, { ok: true, ...out });
  });
}

export const AD_SLOTS = [
  { id: 'home_hero', fa: 'بنر اصلی صفحهٔ نخست', en: 'Home hero banner' },
  { id: 'home_strip', fa: 'نوار میانی صفحهٔ نخست', en: 'Home middle strip' },
  { id: 'sidebar', fa: 'ستون کناری', en: 'Sidebar' },
  { id: 'product_page', fa: 'صفحهٔ محصول', en: 'Product page' },
  { id: 'cart', fa: 'سبد خرید', en: 'Cart' },
  { id: 'footer', fa: 'پانویس', en: 'Footer' },
  { id: 'ticker', fa: 'نوار متحرک بالای سایت', en: 'Top ticker' },
];

export const LABEL_SIZES = [
  { id: '40x25', fa: '۴۰×۲۵ میلی‌متر', w: 40, h: 25 },
  { id: '50x30', fa: '۵۰×۳۰ میلی‌متر', w: 50, h: 30 },
  { id: '60x40', fa: '۶۰×۴۰ میلی‌متر', w: 60, h: 40 },
  { id: '70x50', fa: '۷۰×۵۰ میلی‌متر', w: 70, h: 50 },
  { id: 'a6', fa: 'A6 (۱۰۵×۱۴۸ میلی‌متر)', w: 105, h: 148 },
];

function sanitizeSection(section, patch, current) {
  const out = {};
  const s = (k, min, max, def) => {
    if (patch[k] !== undefined) out[k] = V.optStr(patch[k], { max, field: k }) || def;
  };
  const i = (k, min, max, def) => {
    if (patch[k] !== undefined) out[k] = V.int(patch[k], { min, max, field: k, def });
  };
  const b = (k, def) => { if (patch[k] !== undefined) out[k] = V.bool(patch[k], def); };
  const n = (k, min, max, def) => { if (patch[k] !== undefined) out[k] = V.num(patch[k], { min, max, field: k, def }); };

  switch (section) {
    case 'store':
      s('name', 2, 60); s('nameEn', 2, 60); s('tagline', 0, 120); s('taglineEn', 0, 160);
      s('phone', 0, 20); s('phone2', 0, 20); s('whatsapp', 0, 20); s('email', 0, 120);
      s('address', 0, 300); s('addressEn', 0, 300); s('city', 0, 40); s('cityEn', 0, 40);
      s('description', 0, 600); s('descriptionEn', 0, 600); s('enamad', 0, 40);
      i('established', 1300, 1500);
      if (patch.mapCoords) {
        out.mapCoords = { lat: V.num(patch.mapCoords.lat, { min: -90, max: 90, field: 'lat' }), lng: V.num(patch.mapCoords.lng, { min: -180, max: 180, field: 'lng' }) };
      }
      if (patch.socials) {
        out.socials = {};
        for (const k of ['instagram', 'telegram', 'eitaa', 'whatsapp', 'website']) {
          const v = V.optStr(patch.socials[k], { max: 120, field: k }).trim();
          // فقط http/https (و برای واتساپ رقم): جلوگیری از javascript:/data:
          if (v && k === 'whatsapp') { if (!/^\d{6,20}$/.test(v)) throw new HttpError(400, 'bad_request', `فیلد «${k}» باید شماره باشد`); }
          else if (v && !/^https?:\/\//i.test(v)) throw new HttpError(400, 'bad_request', `لینک «${k}» باید با http:// یا https:// شروع شود`);
          out.socials[k] = v;
        }
      }
      if (patch.workingHours && Array.isArray(patch.workingHours)) {
        out.workingHours = patch.workingHours.slice(0, 7).map((h) => ({
          fa: V.optStr(h?.fa, { max: 40, field: 'روز' }), en: V.optStr(h?.en, { max: 40, field: 'day' }),
          time: V.optStr(h?.time, { max: 40, field: 'ساعت' }), timeEn: V.optStr(h?.timeEn, { max: 40, field: 'time' }),
        }));
      }
      break;
    case 'theme':
      if (patch.accent !== undefined) {
        const c = String(patch.accent).trim();
        if (!/^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(c)) throw badRequest('invalid_color', 'رنگ باید با فرمت #RRGGBB باشد.');
        out.accent = c.toLowerCase();
      }
      b('portTheme', true); b('animations', true);
      if (patch.variant !== undefined) out.variant = V.oneOf(patch.variant, ['classic', 'fresh'], 'variant');
      if (patch.mode !== undefined) out.mode = V.oneOf(patch.mode, ['dark', 'light'], 'mode');
      if (patch.theme !== undefined) out.theme = V.optStr(patch.theme, { max: 30, field: 'تم' });
      if (patch.bgStyle !== undefined) out.bgStyle = V.oneOf(patch.bgStyle, ['waves', 'grid', 'plain'], 'bgStyle');
      if (patch.density !== undefined) out.density = V.oneOf(patch.density, ['compact', 'normal', 'comfy'], 'density');
      if (patch.contrast !== undefined) out.contrast = V.oneOf(patch.contrast, ['normal', 'high'], 'contrast');
      i('radius', 0, 32, current.radius ?? 16);
      break;
    case 'ui':
      if (patch.searchPosition !== undefined) out.searchPosition = V.oneOf(patch.searchPosition, ['start', 'center', 'end'], 'searchPosition');
      if (patch.headerLayout !== undefined) out.headerLayout = V.oneOf(patch.headerLayout, ['logoStart', 'split', 'centered'], 'headerLayout');
      if (patch.navStyle !== undefined) out.navStyle = V.oneOf(patch.navStyle, ['pills', 'underline'], 'navStyle');
      if (patch.cardStyle !== undefined) out.cardStyle = V.oneOf(patch.cardStyle, ['grid', 'list'], 'cardStyle');
      b('stickyHeader', true); b('showTicker', true); b('quickView', true); b('floatingChat', true); b('showBreadcrumbs', true);
      i('tickerSpeed', 10, 90, current.tickerSpeed ?? 30);
      if (patch.tickerItems !== undefined) {
        out.tickerItems = V.arr(patch.tickerItems, { max: 8, field: 'ticker' })
          .map((t) => ({ text: V.optStr(t?.text, { max: 120, field: 'متن' }), textEn: V.optStr(t?.textEn, { max: 120, field: 'text' }), link: V.optStr(t?.link, { max: 200, field: 'لینک' }) }))
          .filter((t) => t.text || t.textEn);
      }
      if (patch.columns) {
        out.columns = {
          mobile: V.int(patch.columns.mobile, { min: 1, max: 3, field: 'mobile', def: 2 }),
          tablet: V.int(patch.columns.tablet, { min: 2, max: 5, field: 'tablet', def: 3 }),
          desktop: V.int(patch.columns.desktop, { min: 3, max: 6, field: 'desktop', def: 4 }),
          wide: V.int(patch.columns.wide, { min: 3, max: 8, field: 'wide', def: 5 }),
        };
      }
      if (patch.productCardInfo !== undefined) out.productCardInfo = V.arr(patch.productCardInfo, { max: 6, field: 'card info' }).map((x) => V.oneOf(x, ['brand', 'stock', 'rating', 'warranty', 'sold'], 'info')).slice(0, 6);
      break;
    case 'features':
      for (const k of Object.keys(current)) b(k, current[k]);
      if (patch && typeof patch === 'object') for (const [k, v] of Object.entries(patch)) {
        if (/^[a-zA-Z]{2,30}$/.test(k)) out[k] = V.bool(v, false);
      }
      break;
    case 'partners': {
      const arr = Array.isArray(patch?.items) ? patch.items : (Array.isArray(patch) ? patch : []);
      out.items = arr.slice(0, 40).map((x) => ({ fa: String(x?.fa || '').slice(0, 60), en: String(x?.en || '').slice(0, 60) })).filter((x) => x.fa || x.en);
      break;
    }
    case 'shipping':
      i('courierBase', 0, 10000000); i('freeOver', 0, 100000000);
      n('insuranceRatePct', 0, 20); i('insuranceMin', 0, 10000000);
      b('pickupEnabled', true); b('courierEnabled', true); b('expressEnabled', false);
      i('expressFee', 0, 10000000); i('handlingHours', 1, 720);
      if (patch.zones && Array.isArray(patch.zones)) {
        out.zones = patch.zones.slice(0, 8).map((z) => ({
          id: V.oneOf(z?.id, ['city', 'province', 'country', 'island'], 'zone', 'country'),
          name: V.optStr(z?.name, { max: 40, field: 'نام منطقه' }), nameEn: V.optStr(z?.nameEn, { max: 40, field: 'name' }),
          fee: V.int(z?.fee, { min: 0, max: 10000000, field: 'هزینه', def: 0 }),
          eta: V.optStr(z?.eta, { max: 40, field: 'زمان' }),
        }));
      }
      break;
    case 'plus':
      b('enabled', true); i('price', 0, 100000000); i('durationDays', 1, 365);
      n('discountPct', 0, 30); i('freeShippingMin', 0, 100000000);
      b('autoInsurance', true); b('prioritySupport', true); n('expressDiscountPct', 0, 100);
      if (patch.perks && Array.isArray(patch.perks)) {
        out.perks = patch.perks.slice(0, 12).map((p, idx) => ({
          id: V.optStr(p?.id, { max: 20, field: 'id' }) || `perk${idx}`,
          fa: V.optStr(p?.fa, { max: 120, field: 'مزیت' }), en: V.optStr(p?.en, { max: 120, field: 'perk' }),
        })).filter((p) => p.fa || p.en);
      }
      break;
    case 'orders':
      i('minOrder', 0, 100000000); b('walletEnabled', true); b('codEnabled', true); b('gatewayEnabled', true);
      if (patch.gatewayMode !== undefined) out.gatewayMode = V.oneOf(patch.gatewayMode, ['demo', 'live'], 'gatewayMode');
      i('autoCancelHours', 1, 720); i('stockReserveMinutes', 0, 1440); b('refundToWallet', true);
      break;
    case 'seo':
      s('title', 0, 120); s('description', 0, 300); s('keywords', 0, 300);
      break;
    case 'currency':
      s('code', 2, 8); s('label', 1, 12); s('labelEn', 1, 12);
      break;
    case 'auth':
      if (patch.otpMode !== undefined) out.otpMode = V.oneOf(patch.otpMode, ['demo', 'live'], 'otpMode');
      b('allowRegistration', true); b('requirePhone', false); b('force2faStaff', false);
      i('sessionDays', 1, 90);
      break;
    case 'contact':
      s('supportNote', 0, 200); s('supportNoteEn', 0, 200);
      break;
    case 'security':
      b('queueEnabled', true);
      i('maxConcurrent', 5, 5000); i('triggerRps', 5, 2000); i('passTtlMin', 5, 240); i('pollSec', 2, 20);
      i('floodBanPerMin', 500, 100000); i('floodBanMin', 1, 1440);
      break;
    default:
      break;
  }
  return out;
}

function mergePage(page, patch) {
  // فقط رشته‌ها و آرایه‌های مجاز؛ بدون اجرای HTML
  const clean = (v) => (typeof v === 'string' ? v.slice(0, 20000) : undefined);
  const out = { ...page };
  if (patch.hero && typeof patch.hero === 'object') {
    out.hero = { ...out.hero, title: clean(patch.hero.title) ?? out.hero?.title, titleEn: clean(patch.hero.titleEn) ?? out.hero?.titleEn, subtitle: clean(patch.hero.subtitle) ?? out.hero?.subtitle, subtitleEn: clean(patch.hero.subtitleEn) ?? out.hero?.subtitleEn };
  }
  if (patch.intro !== undefined) out.intro = clean(patch.intro) ?? out.intro;
  if (patch.introEn !== undefined) out.introEn = clean(patch.introEn) ?? out.introEn;
  if (patch.body !== undefined) out.body = clean(patch.body) ?? out.body;
  if (patch.bodyEn !== undefined) out.bodyEn = clean(patch.bodyEn) ?? out.bodyEn;
  if (patch.notice !== undefined) out.notice = clean(patch.notice) ?? out.notice;
  if (Array.isArray(patch.sections)) {
    out.sections = patch.sections.slice(0, 40).map((s, i) => ({
      title: clean(s?.title) ?? out.sections?.[i]?.title ?? '',
      titleEn: clean(s?.titleEn) ?? out.sections?.[i]?.titleEn ?? '',
      body: clean(s?.body), bodyEn: clean(s?.bodyEn),
      list: Array.isArray(s?.list) ? s.list.slice(0, 40).map((x) => (typeof x === 'string' ? x.slice(0, 600) : { icon: clean(x?.icon) || 'check', fa: clean(x?.fa) || '', en: clean(x?.en) || '' })) : undefined,
      listEn: Array.isArray(s?.listEn) ? s.listEn.slice(0, 40).map((x) => String(x).slice(0, 600)) : undefined,
    }));
  }
  if (Array.isArray(patch.rules)) out.rules = patch.rules.slice(0, 60).map((x) => String(x).slice(0, 800));
  if (Array.isArray(patch.rulesEn)) out.rulesEn = patch.rulesEn.slice(0, 60).map((x) => String(x).slice(0, 800));
  if (Array.isArray(patch.tips)) out.tips = patch.tips.slice(0, 30).map((x) => (typeof x === 'string' ? { fa: String(x).slice(0, 500) } : { fa: clean(x?.fa) || '', en: clean(x?.en) || '' }));
  if (Array.isArray(patch.steps)) out.steps = patch.steps.slice(0, 20).map((x) => ({ title: clean(x?.title) || '', titleEn: clean(x?.titleEn) || '', body: clean(x?.body) || '', bodyEn: clean(x?.bodyEn) || '' }));
  if (Array.isArray(patch.items)) out.items = patch.items.slice(0, 30).map((x) => ({ icon: clean(x?.icon) || 'check', title: clean(x?.title) || '', titleEn: clean(x?.titleEn) || '', body: clean(x?.body) || '', bodyEn: clean(x?.bodyEn) || '' }));
  if (Array.isArray(patch.faq)) out.faq = undefined; // سؤالات متداول در ریشه ذخیره می‌شود
  if (Array.isArray(patch.hints)) out.hints = patch.hints.slice(0, 20).map((x) => String(x).slice(0, 300));
  if (Array.isArray(patch.hintsEn)) out.hintsEn = patch.hintsEn.slice(0, 20).map((x) => String(x).slice(0, 300));
  if (patch.noticeEn !== undefined) out.noticeEn = clean(patch.noticeEn) ?? out.noticeEn;
  if (Array.isArray(patch.stats)) {
    out.stats = patch.stats.slice(0, 12).map((x, i) => ({
      fa: clean(x?.fa) ?? out.stats?.[i]?.fa ?? '', en: clean(x?.en) ?? out.stats?.[i]?.en ?? '',
      key: (clean(x?.key) ?? out.stats?.[i]?.key ?? '').replace(/[^a-z_]/gi, ''),
    }));
  }
  return out;
}

function recalcRating(st, productId) {
  const rs = st.reviews.filter((r) => r.productId === productId && r.type === 'review' && r.status === 'approved' && r.rating > 0);
  const p = st.products.find((x) => x.id === productId);
  if (!p) return;
  p.ratingCount = rs.length;
  p.ratingAvg = rs.length ? Math.round((rs.reduce((a, b) => a + b.rating, 0) / rs.length) * 10) / 10 : 0;
}

function statusInfoText(status) {
  const s = ORDER_STATUSES.find((x) => x.id === status);
  return s ? s.fa : status;
}

function toCsv(rows) {
  if (!Array.isArray(rows) || !rows.length) return '';
  const keys = [...new Set(rows.flatMap((r) => Object.keys(r || {})))];
  const esc = (v) => {
    if (v === null || v === undefined) return '';
    if (typeof v === 'object') v = JSON.stringify(v);
    const s = String(v).replace(/"/g, '""');
    return /[",\n]/.test(s) ? `"${s}"` : s;
  };
  return [keys.join(','), ...rows.map((r) => keys.map((k) => esc(r?.[k])).join(','))].join('\n');
}

async function fetchWithTimeout(url, ms, { raw = false } = {}) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), ms);
  try {
    const res = await fetch(url, { signal: ctrl.signal, headers: { 'User-Agent': 'BanderMobileStore/1.0 (image lookup)', Accept: raw ? '*/*' : 'application/json' } });
    if (raw) return res;
    if (!res.ok) return null;
    return await res.json();
  } catch (err) {
    if (!raw) return null;
    throw new HttpError(502, 'upstream_error', 'سرویس تصویر در دسترس نیست (اتصال اینترنت را بررسی کنید).');
  } finally {
    clearTimeout(timer);
  }
}
