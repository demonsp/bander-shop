// ─────────────────────────────────────────────────────────────
//  لایهٔ داده: ذخیره‌ساز JSON با نوشتن اتمیک و قفل تراکنش
//  • تمام تغییرات حساس (موجودی، سفارش، کیف پول) داخل db.tx() اجرا می‌شوند
//    تا هیچ شرط رقابتی (race condition) رخ ندهد.
// ─────────────────────────────────────────────────────────────
import fs from 'node:fs';
import fsp from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { nowISO, uid } from './util.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const ROOT = path.resolve(__dirname, '..', '..');
export const DATA_DIR = path.join(ROOT, 'data');
const DB_FILE = path.join(DATA_DIR, 'db.json');
const TMP_FILE = path.join(DATA_DIR, 'db.tmp.json');
const BAK_FILE = path.join(DATA_DIR, 'db.backup.json');

export const EMPTY = () => ({
  version: 1,
  createdAt: nowISO(),
  settings: {},
  categories: [],
  brands: [],
  products: [],
  users: [],
  sessions: [],
  otps: [],
  carts: [],
  orders: [],
  reviews: [],
  tickets: [],
  notifications: [],
  supportMessages: [],
  feedback: [],
  coupons: [],
  ads: [],
  pages: {},
  audit: [],
  priceAlerts: [],
  visits: {},       // { 'YYYY-MM-DD': count }
  visitSessions: {},// { sessionIdHash: 'YYYY-MM-DD' } برای بازدید یکتا
  stats: { ordersTotal: 0, revenueTotal: 0 },
  imageHashes: {},  // productId -> {dhash, hist}
  bans: [],         // {id,type:'ip'|'phone'|'email'|'username',value,reason,at,by}
  visitors: [],     // رکورد بازدیدکنندگان (جدیدترین اول)
  lotteries: [],    // قرعه‌کشی‌ها
  telegramInbox: [],// پیام‌های بات تلگرام
  telegramSubs: {}, // chatId -> name
});

let state = EMPTY();
let saveTimer = null;
let saving = Promise.resolve();
let dirty = false;
let backupCounter = 0;

function ensureDirs() {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  fs.mkdirSync(path.join(ROOT, 'public', 'uploads'), { recursive: true });
}

export async function load(seedFn) {
  ensureDirs();
  try {
    const raw = await fsp.readFile(DB_FILE, 'utf8');
    const parsed = JSON.parse(raw);
    const base = EMPTY();
    state = { ...base, ...parsed };
    // اطمینان از وجود کلیدهای جدید پس از ارتقا
    for (const k of Object.keys(base)) {
      if (state[k] === undefined) state[k] = base[k];
      else if (typeof base[k] === 'object' && !Array.isArray(base[k]) && base[k] !== null) {
        state[k] = { ...base[k], ...state[k] };
      }
    }
  } catch (err) {
    if (err.code !== 'ENOENT') {
      // فایل خراب → تلاش برای بازیابی از نسخهٔ پشتیبان
      console.error('[db] db.json unreadable:', err.message);
      try {
        const bak = JSON.parse(await fsp.readFile(BAK_FILE, 'utf8'));
        state = { ...EMPTY(), ...bak };
        console.warn('[db] restored from backup');
      } catch {
        // لایهٔ دوم خودترمیمی: تازه‌ترین اسنپ‌شات معتبر در پوشهٔ backups/
        let restored = false;
        try {
          const dir = path.join(DATA_DIR, 'backups');
          const files = fs.readdirSync(dir)
            .filter((f) => f.endsWith('.json'))
            .map((f) => ({ f, t: fs.statSync(path.join(dir, f)).mtimeMs }))
            .sort((a, b) => b.t - a.t);
          for (const { f } of files.slice(0, 5)) {
            try {
              const bk = JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8'));
              if (bk && Array.isArray(bk.products)) { state = { ...EMPTY(), ...bk }; console.warn('[db] restored from snapshot:', f); restored = true; break; }
            } catch { /* اسنپ‌شات بعدی را امتحان کن */ }
          }
        } catch { /* پوشهٔ پشتیبان در دسترس نیست */ }
        if (!restored) { console.warn('[db] starting fresh (no valid backup)'); state = EMPTY(); }
      }
    }
    if (typeof seedFn === 'function') await seedFn(state);
  }
  state.settings = state.settings || {};
  await flush(true);
  return state;
}

export const db = {
  get raw() { return state; },
  s: () => state.settings,
  /** صف نوشتن: همهٔ تراکنش‌ها سریال اجرا می‌شوند (بدون race) */
  tx(fn) {
    const run = saving.then(async () => {
      const result = await fn(state);
      dirty = true;
      scheduleSave();
      return result;
    });
    // زنجیره را حتی در صورت خطا ادامه بده
    saving = run.then(() => {}, () => {});
    return run;
  },
  /** خواندن بدون قفل (برای GETها) */
  read(fn) { return fn(state); },
  markDirty() { dirty = true; scheduleSave(); },
  async flush(force = false) { return flush(force); },
  newId: uid,
};

function scheduleSave() {
  if (saveTimer) return;
  saveTimer = setTimeout(() => { saveTimer = null; flush().catch(() => {}); }, 250);
}

let writing = false;
let pendingWrite = false;

async function flush(force = false) {
  if (!force && !dirty) return;
  if (writing) { pendingWrite = true; return; }
  writing = true;
  try {
    dirty = false;
    const snapshot = JSON.stringify(state);
    // پشتیبان‌گیری دوره‌ای
    if (++backupCounter % 40 === 0) {
      await fsp.copyFile(DB_FILE, BAK_FILE).catch(() => {});
    }
    await fsp.writeFile(TMP_FILE, snapshot, 'utf8');
    await fsp.rename(TMP_FILE, DB_FILE);   // اتمیک
  } catch (err) {
    dirty = true;
    console.error('[db] write failed:', err.message);
  } finally {
    writing = false;
    if (pendingWrite || dirty) {
      pendingWrite = false;
      setTimeout(() => flush().catch(() => {}), 300);
    }
  }
}

process.on('SIGINT', () => { flush(true).finally(() => process.exit(0)); });
process.on('SIGTERM', () => { flush(true).finally(() => process.exit(0)); });

// ── توابع کمکی جستجو در مجموعه‌ها ───────────────────────────
export const byId = (arr, id) => arr.find((x) => x.id === id) || null;
export const indexById = (arr) => { const m = new Map(); for (const x of arr) m.set(x.id, x); return m; };

export function logAudit(actor, action, target, meta = {}) {
  state.audit.unshift({
    id: uid('log'),
    at: nowISO(),
    actorId: actor?.id || null,
    actorName: actor?.username || actor?.name || 'مهمان',
    actorRole: actor?.role || 'guest',
    action,
    target: target || '',
    meta: sanitizeMeta(meta),
  });
  if (state.audit.length > 12000) state.audit.length = 12000;
}

function sanitizeMeta(meta) {
  const out = {};
  for (const [k, v] of Object.entries(meta || {})) {
    if (typeof v === 'string') out[k] = v.slice(0, 300);
    else if (typeof v === 'number' || typeof v === 'boolean' || v === null) out[k] = v;
    else {
      try { out[k] = JSON.stringify(v).slice(0, 500); } catch { out[k] = '[unserializable]'; }
    }
  }
  return out;
}
