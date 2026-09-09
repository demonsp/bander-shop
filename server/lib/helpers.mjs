// ─────────────────────────────────────────────────────────────
//  هلپرهای مشترک: اعلان‌ها، SSE، سریال‌سازی، آمار
// ─────────────────────────────────────────────────────────────
import crypto from 'node:crypto';
import { nowISO, uid } from './util.mjs';
import { db, logAudit } from './db.mjs';
import { ORDER_STATUSES } from '../defaults.mjs';

// ── SSE (اعلان‌های زنده) ────────────────────────────────────
const clients = new Map();   // key: userId or 'anon:<sessionId>' → Set<res>

export function sseAdd(key, res) {
  if (!clients.has(key)) clients.set(key, new Set());
  clients.get(key).add(res);
  res.on('close', () => {
    const set = clients.get(key);
    if (set) { set.delete(res); if (!set.size) clients.delete(key); }
  });
}
export function sseSend(key, event, data) {
  const set = clients.get(key);
  if (!set || !set.size) return 0;
  const payload = `event: ${event}\ndata: ${JSON.stringify(data ?? {})}\n\n`;
  let n = 0;
  for (const res of set) { try { res.write(payload); n++; } catch { /* noop */ } }
  return n;
}
export function broadcast(userId, event, data) {
  let n = 0;
  if (userId) n += sseSend(String(userId), event, data);
  n += sseSend('all', event, data);
  return n;
}
export function heartbeatAll() {
  for (const [key, set] of clients) for (const res of set) { try { res.write(': ping\n\n'); } catch { /* noop */ } }
  return clients.size;
}

// ── اعلان‌ها ────────────────────────────────────────────────
export function pushNotification(state, { userId = null, type = 'info', title, titleEn = '', body = '', bodyEn = '', link = '', level = 'info' }) {
  const n = {
    id: uid('nt'), userId, type, level,
    title: String(title || '').slice(0, 200),
    titleEn: String(titleEn || '').slice(0, 200),
    body: String(body || '').slice(0, 800),
    bodyEn: String(bodyEn || '').slice(0, 800),
    link: String(link || '').slice(0, 300),
    read: false, createdAt: nowISO(),
  };
  state.notifications.unshift(n);
  if (state.notifications.length > 2000) state.notifications.length = 2000;
  if (userId) broadcast(userId, 'notification', publicNotification(n));
  else broadcast(null, 'announcement', publicNotification(n));
  return n;
}
export const publicNotification = (n) => ({
  id: n.id, type: n.type, level: n.level, title: n.title, titleEn: n.titleEn,
  body: n.body, bodyEn: n.bodyEn, link: n.link, read: !!n.read, createdAt: n.createdAt,
});

// ── کانال ارسال پیامک/ایمیل (در حالت دمو، کد در outbox ثبت می‌شود) ──
export function deliver(state, { channel, target, code = '', subject = '', body = '', purpose = '' }) {
  const rec = {
    id: uid('msg'), at: nowISO(), channel, target, purpose,
    subject, body: body.slice(0, 1200), code,
    provider: 'demo',
  };
  state.outbox = state.outbox || [];
  state.outbox.unshift(rec);
  if (state.outbox.length > 200) state.outbox.length = 200;
  if (channel === 'sms') console.log(`[sms→${target}] ${body.replace(/\n/g, ' ')}`);
  else console.log(`[email→${target}] ${subject}`);
  return rec;
}

// ── سریال‌سازی محصول ────────────────────────────────────────
export function publicProduct(p, { full = false, categories = [], brands = [] } = {}) {
  const cat = categories.find((c) => c.id === p.categoryId) || null;
  const brand = brands.find((b) => b.id === p.brandId) || null;
  const out = {
    id: p.id, sku: p.sku, name: p.name, nameEn: p.nameEn,
    categoryId: p.categoryId, categoryName: cat?.name || '', categoryNameEn: cat?.nameEn || '',
    brandId: p.brandId, brandName: brand?.name || p.brandName || '', brandNameEn: brand?.nameEn || p.brandNameEn || '',
    price: p.price, oldPrice: p.oldPrice || 0,
    discountPct: p.oldPrice && p.oldPrice > p.price ? Math.round((1 - p.price / p.oldPrice) * 100) : 0,
    stock: Math.max(0, (p.stock || 0) - (p.reserved || 0)),
    inStock: Math.max(0, (p.stock || 0) - (p.reserved || 0)) > 0,
    images: p.images || [], videos: p.videos || [], glyph: p.glyph || 'misc',
    authenticity: p.authenticity || 'generic',
    warrantyMonths: p.warrantyMonths || 0,
    ratingAvg: p.ratingAvg || 0, ratingCount: p.ratingCount || 0,
    tags: p.tags || [], featured: !!p.featured, active: p.active !== false,
    sold: p.sold || 0, views: p.views || 0,
  };
  if (full) {
    Object.assign(out, {
      barcode: p.barcode || '', specs: p.specs || {},
      description: p.description || '', descriptionEn: p.descriptionEn || '',
      weight: p.weight || 0, cost: undefined, createdAt: p.createdAt, updatedAt: p.updatedAt,
    });
    delete out.cost;
  }
  return out;
}

export function adminProduct(p) {
  return {
    ...publicProduct(p, { full: true }),
    stock: p.stock || 0, reserved: p.reserved || 0, available: Math.max(0, (p.stock || 0) - (p.reserved || 0)),
    cost: p.cost || 0, profit: (p.price || 0) - (p.cost || 0),
    barcode: p.barcode || '',
  };
}

export const statusInfo = (id) => ORDER_STATUSES.find((s) => s.id === id) || { id, fa: id, en: id, color: '#888' };

// ── آمار ────────────────────────────────────────────────────
export function dayKey(d = new Date()) { return d.toISOString().slice(0, 10); }

export function recordVisit(state, sessionId, ip) {
  const k = dayKey();
  const sk = crypto.createHash('sha1').update(`${sessionId}|${ip}`).digest('hex').slice(0, 16);
  const prevDay = state.visitSessions?.[sk];
  state.visits[k] = state.visits[k] || { visits: 0, unique: 0, orders: 0 };
  state.visits[k].visits++;
  if (prevDay !== k) {
    state.visits[k].unique++;
    state.visitSessions[sk] = k;
  }
  if (Object.keys(state.visitSessions).length > 5000) {
    const today = k;
    for (const [kk, v] of Object.entries(state.visitSessions)) if (v !== today) delete state.visitSessions[kk];
  }
}

export function publicStats(state) {
  const today = dayKey();
  const v = state.visits[today] || { visits: 0, unique: 0, orders: 0 };
  const totalVisits = Object.values(state.visits).reduce((a, b) => a + (b.visits || 0), 0);
  const ordersToday = state.orders.filter((o) => o.createdAt.slice(0, 10) === today).length;
  const active = state.products.filter((p) => p.active !== false);
  const delivered = state.orders.filter((o) => o.status === 'delivered').length;
  const pending = state.orders.filter((o) => ['pending_payment', 'pending_review', 'confirmed', 'preparing'].includes(o.status)).length;
  const settings = state.settings;
  return {
    products: active.length,
    categories: state.categories.filter((c) => c.active !== false).length,
    brands: state.brands.filter((b) => b.active !== false).length,
    ordersToday: ordersToday + (v.orders || 0) * 0,
    ordersTotal: (state.stats?.ordersTotal || 0),
    visitsToday: v.visits || 0,
    uniqueToday: v.unique || 0,
    visitsTotal: totalVisits + (state.stats?.visitsBase || 0),
    pendingOrders: pending,
    deliveredOrders: delivered + (state.stats?.deliveredBase || 0),
    customers: state.users.filter((u) => u.role === 'user' && u.status !== 'blocked').length + (state.stats?.customersBase || 128),
    plusMembers: state.users.filter((u) => u.plus?.active && new Date(u.plus.until || 0) > new Date()).length,
    outOfStock: active.filter((p) => Math.max(0, (p.stock || 0) - (p.reserved || 0)) === 0).length,
    years: new Date().getFullYear() - (settings?.store?.established ? settings.store.established + 621 : 2017),
    updatedAt: nowISO(),
  };
}

export function orderTimelinePush(order, status, note, by) {
  order.timeline = order.timeline || [];
  order.timeline.push({ status, at: nowISO(), note: note || '', by: by || 'سامانه' });
  order.status = status;
  order.updatedAt = nowISO();
}

// ── هش/امضا برای جستجوی تصویری ─────────────────────────────
export function hamming(a, b) {
  if (typeof a !== 'string' || typeof b !== 'string' || a.length !== b.length) return 64;
  let d = 0;
  for (let i = 0; i < a.length; i++) {
    let x = parseInt(a[i], 16) ^ parseInt(b[i], 16);
    while (x) { d += x & 1; x >>= 1; }
  }
  return d;
}
export function histDistance(a, b) {
  if (!Array.isArray(a) || !Array.isArray(b) || a.length !== b.length) return 1;
  let d = 0;
  for (let i = 0; i < a.length; i++) d += Math.abs((a[i] || 0) - (b[i] || 0));
  return d / 2;
}

export function makeOrderCode(state) {
  const d = new Date();
  const ymd = `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, '0')}${String(d.getDate()).padStart(2, '0')}`;
  const seq = String(state.orders.length + 1).padStart(4, '0');
  let code = `BM-${ymd}-${seq}`;
  while (state.orders.some((o) => o.code === code)) {
    code = `BM-${ymd}-${seq}${Math.floor(Math.random() * 9) + 1}`;
  }
  return code;
}

export { logAudit, db, uid, nowISO };
