// ─────────────────────────────────────────────────────────────
//  ابزارهای عمومی سمت سرور  ·  Yassaei Electronics
// ─────────────────────────────────────────────────────────────
import crypto from 'node:crypto';

export const nowISO = () => new Date().toISOString();
export const nowMs = () => Date.now();

export function uid(prefix = '') {
  const r = crypto.randomBytes(9).toString('base64url');
  return prefix ? `${prefix}_${r}` : r;
}

export function randomToken(bytes = 32) {
  return crypto.randomBytes(bytes).toString('base64url');
}

export function safeEqual(a, b) {
  const ba = Buffer.from(String(a ?? ''));
  const bb = Buffer.from(String(b ?? ''));
  if (ba.length !== bb.length) return false;
  return crypto.timingSafeEqual(ba, bb);
}

// ── اعداد فارسی/عربی → لاتین ────────────────────────────────
const FA_DIGITS = '۰۱۲۳۴۵۶۷۸۹';
const AR_DIGITS = '٠١٢٣٤٥٦٧٨٩';
export function toLatinDigits(s) {
  return String(s ?? '').replace(/[۰-۹]/g, (d) => FA_DIGITS.indexOf(d))
    .replace(/[٠-٩]/g, (d) => AR_DIGITS.indexOf(d));
}
export function toFaDigits(s) {
  return String(s ?? '').replace(/[0-9]/g, (d) => FA_DIGITS[+d]);
}

// ── نرمال‌سازی متن برای جستجو ───────────────────────────────
export function normalizeText(s) {
  return toLatinDigits(String(s ?? ''))
    .replace(/[\u200c\u200d\u200e\u200f]/g, ' ')      // نیم‌فاصله و کنترل‌ها
    .replace(/[يى]/g, 'ی')
    .replace(/ك/g, 'ک')
    .replace(/ة/g, 'ه')
    .replace(/ؤ/g, 'و')
    .replace(/[إأآ]/g, 'ا')
    .replace(/[ً-ْ]/g, '')                              // اعراب
    .replace(/[\u0640]/g, '')                           // کشیده
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

// حذف صداهای کوتاه برای جستجوی fuzzy فارسی
export function phoneticKey(s) {
  return normalizeText(s)
    .replace(/(و|ا|ی|ه|ع|ح|خ|غ|ق)/g, '')
    .replace(/(ا|آ)/g, '')
    .replace(/\s+/g, '');
}

// فاصلهٔ لونشتاین (محدود) برای پیشنهاد «منظورتان این بود؟»
export function levenshtein(a, b, max = 4) {
  a = String(a || ''); b = String(b || '');
  if (Math.abs(a.length - b.length) > max) return max + 1;
  const prev = new Array(b.length + 1);
  for (let j = 0; j <= b.length; j++) prev[j] = j;
  for (let i = 1; i <= a.length; i++) {
    let last = prev[0]; prev[0] = i;
    let rowMin = i;
    for (let j = 1; j <= b.length; j++) {
      const tmp = prev[j];
      prev[j] = Math.min(prev[j] + 1, prev[j - 1] + 1, last + (a[i - 1] === b[j - 1] ? 0 : 1));
      last = tmp;
      if (prev[j] < rowMin) rowMin = prev[j];
    }
    if (rowMin > max) return max + 1;
  }
  return prev[b.length];
}

// ── اعتبارسنجی ورودی‌ها ────────────────────────────────────
export class HttpError extends Error {
  constructor(status, code, message, details) {
    super(message || code);
    this.status = status;
    this.code = code;
    this.details = details;
  }
}
export const badRequest = (code, msg, d) => new HttpError(400, code, msg, d);
export const unauthorized = (code = 'unauthorized', msg) => new HttpError(401, code, msg);
export const forbidden = (code = 'forbidden', msg) => new HttpError(403, code, msg);
export const notFound = (code = 'not_found', msg) => new HttpError(404, code, msg);
export const conflict = (code, msg) => new HttpError(409, code, msg);
export const tooMany = (msg) => new HttpError(429, 'too_many_requests', msg);

const RE_USERNAME = /^[a-zA-Z0-9_.]{3,24}$/;
const RE_PHONE = /^09\d{9}$/;
const RE_EMAIL = /^[^\s@]{1,64}@[^\s@]{1,255}\.[^\s@]{2,24}$/;
const RE_POSTAL = /^\d{10}$/;

export const V = {
  str(v, { min = 0, max = 4000, field = 'field', trim = true, allowEmpty = false } = {}) {
    if (v === undefined || v === null) {
      if (allowEmpty) return '';
      throw badRequest('invalid_field', `«${field}» الزامی است.`);
    }
    if (typeof v !== 'string' && typeof v !== 'number') throw badRequest('invalid_field', `«${field}» معتبر نیست.`);
    let s = toLatinDigits(v);
    if (trim) s = s.trim();
    // حذف کاراکترهای کنترلی
    s = s.replace(/[\u0000-\u0008\u000b-\u001f\u007f]/g, '');
    if (s.length < min) throw badRequest('too_short', `«${field}» باید حداقل ${min} نویسه باشد.`);
    if (s.length > max) throw badRequest('too_long', `«${field}» باید حداکثر ${max} نویسه باشد.`);
    if (!allowEmpty && s.length === 0) throw badRequest('invalid_field', `«${field}» الزامی است.`);
    return s;
  },
  optStr(v, o) {
    if (v === undefined || v === null || v === '') return '';
    return V.str(v, { ...o, allowEmpty: true });
  },
  int(v, { min = -1e15, max = 1e15, field = 'field', def } = {}) {
    if (v === undefined || v === null || v === '') {
      if (def !== undefined) return def;
      throw badRequest('invalid_field', `«${field}» الزامی است.`);
    }
    const s = toLatinDigits(v).toString().trim();
    if (!/^-?\d+$/.test(s)) throw badRequest('invalid_number', `«${field}» باید عدد صحیح باشد.`);
    const n = Number(s);
    if (!Number.isSafeInteger(n)) throw badRequest('invalid_number', `«${field}» خارج از محدوده است.`);
    if (n < min || n > max) throw badRequest('out_of_range', `«${field}» باید بین ${min} و ${max} باشد.`);
    return n;
  },
  num(v, { min = -1e15, max = 1e15, field = 'field', def } = {}) {
    if (v === undefined || v === null || v === '') {
      if (def !== undefined) return def;
      throw badRequest('invalid_field', `«${field}» الزامی است.`);
    }
    const n = Number(toLatinDigits(v).toString().trim());
    if (!Number.isFinite(n)) throw badRequest('invalid_number', `«${field}» باید عدد باشد.`);
    if (n < min || n > max) throw badRequest('out_of_range', `«${field}» خارج از محدوده است.`);
    return n;
  },
  bool(v, def = false) {
    if (v === undefined || v === null || v === '') return def;
    if (typeof v === 'boolean') return v;
    const s = toLatinDigits(v).toString().trim().toLowerCase();
    if (['1', 'true', 'yes', 'on', 'بله'].includes(s)) return true;
    if (['0', 'false', 'no', 'off', 'خیر'].includes(s)) return false;
    return def;
  },
  oneOf(v, list, field = 'field', def) {
    if ((v === undefined || v === null || v === '') && def !== undefined) return def;
    const s = toLatinDigits(v).toString().trim();
    if (!list.includes(s)) throw badRequest('invalid_value', `مقدار «${field}» معتبر نیست.`);
    return s;
  },
  username(v, field = 'نام کاربری') {
    const s = V.str(v, { min: 3, max: 24, field });
    if (!RE_USERNAME.test(s)) throw badRequest('invalid_username', 'نام کاربری فقط شامل حروف انگلیسی، عدد، نقطه و _ باشد (۳ تا ۲۴ نویسه).');
    return s.toLowerCase();
  },
  phone(v, field = 'شماره موبایل') {
    let s = toLatinDigits(v).toString().trim().replace(/[\s()-]/g, '');
    if (s.startsWith('+98')) s = '0' + s.slice(3);
    else if (s.startsWith('98') && s.length === 12) s = '0' + s.slice(2);
    else if (s.startsWith('9') && s.length === 10) s = '0' + s;
    if (!RE_PHONE.test(s)) throw badRequest('invalid_phone', 'شماره موبایل معتبر نیست (نمونه: 09121234567).');
    return s;
  },
  email(v, field = 'ایمیل') {
    const s = V.str(v, { min: 5, max: 254, field }).toLowerCase();
    if (!RE_EMAIL.test(s)) throw badRequest('invalid_email', 'ایمیل معتبر نیست.');
    return s;
  },
  password(v, field = 'رمز عبور') {
    const s = String(v ?? '');
    if (s.length < 8) throw badRequest('weak_password', 'رمز عبور باید حداقل ۸ نویسه باشد.');
    if (s.length > 128) throw badRequest('too_long', 'رمز عبور خیلی طولانی است.');
    let score = 0;
    if (/[a-z]/.test(s)) score++;
    if (/[A-Z]/.test(s)) score++;
    if (/\d/.test(s)) score++;
    if (/[^\w\s]/.test(s)) score++;
    if (score < 3) throw badRequest('weak_password', 'رمز عبور باید ترکیبی از حروف کوچک، حروف بزرگ، عدد و نماد باشد.');
    if (/^(\d)\1+$/.test(s)) throw badRequest('weak_password', 'رمز عبور تکراری معتبر نیست.');
    return s;
  },
  postal(v, field = 'کد پستی') {
    const s = toLatinDigits(v).toString().trim().replace(/[\s-]/g, '');
    if (!RE_POSTAL.test(s)) throw badRequest('invalid_postal', 'کد پستی باید ۱۰ رقم باشد.');
    return s;
  },
  id(v, field = 'شناسه') {
    const s = V.str(v, { min: 1, max: 64, field });
    if (!/^[A-Za-z0-9_-]+$/.test(s)) throw badRequest('invalid_id', `«${field}» معتبر نیست.`);
    return s;
  },
  arr(v, { max = 100, field = 'list' } = {}) {
    if (v === undefined || v === null) return [];
    if (!Array.isArray(v)) throw badRequest('invalid_field', `«${field}» باید آرایه باشد.`);
    if (v.length > max) throw badRequest('too_long', `«${field}» حداکثر ${max} مورد.`);
    return v;
  },
  date(v, field = 'تاریخ') {
    const s = V.optStr(v, { max: 40, field });
    if (!s) return '';
    const d = new Date(s);
    if (Number.isNaN(d.getTime())) throw badRequest('invalid_date', `«${field}» معتبر نیست.`);
    return d.toISOString();
  },
};

// پول: همه‌جا عدد صحیح ریال/تومان بدون اعشار
export const money = (n) => Math.max(0, Math.round(Number(n) || 0));

export function clamp(n, min, max) { return Math.min(max, Math.max(min, n)); }

export function pick(obj, keys) {
  const out = {};
  for (const k of keys) if (obj && Object.prototype.hasOwnProperty.call(obj, k)) out[k] = obj[k];
  return out;
}

export function sha256(s) { return crypto.createHash('sha256').update(String(s)).digest('hex'); }

// محدودسازی نرخ ساده (پنجرهٔ لغزان) — در حافظه
export function makeRateLimiter() {
  const buckets = new Map();
  return {
    hit(key, limit, windowMs) {
      const t = Date.now();
      let b = buckets.get(key);
      if (!b) { b = []; buckets.set(key, b); }
      while (b.length && b[0] < t - windowMs) b.shift();
      if (b.length >= limit) return { ok: false, retryAfter: Math.ceil((b[0] + windowMs - t) / 1000) };
      b.push(t);
      return { ok: true, remaining: limit - b.length };
    },
    reset(key) { buckets.delete(key); },
    sweep() {
      const t = Date.now();
      for (const [k, b] of buckets) {
        while (b.length && b[0] < t - 3_600_000) b.shift();
        if (!b.length) buckets.delete(k);
      }
    },
  };
}

export function parseCookie(header = '') {
  const out = Object.create(null);
  for (const part of String(header).split(';')) {
    const i = part.indexOf('=');
    if (i < 1) continue;
    const k = part.slice(0, i).trim();
    if (!k) continue;
    try { out[k] = decodeURIComponent(part.slice(i + 1).trim()); } catch { out[k] = part.slice(i + 1).trim(); }
  }
  return out;
}

export function clientIp(req) {
  const xff = req.headers['x-forwarded-for'];
  if (typeof xff === 'string' && xff.length) return xff.split(',')[0].trim().slice(0, 64);
  return (req.socket?.remoteAddress || '0.0.0.0').slice(0, 64);
}

export function sleep(ms) { return new Promise((r) => setTimeout(r, ms)); }

export function titleCase(s) {
  return String(s || '').replace(/\w\S*/g, (t) => t[0].toUpperCase() + t.slice(1).toLowerCase());
}

/** برچسب بیلد جاری — برای نمایش در پنل ادمین و status */
export const BUILD = 'ys-v7';
