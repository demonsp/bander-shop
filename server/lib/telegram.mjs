// ─────────────────────────────────────────────────────────────
//  بات پشتیبانی تلگرام — حالت وب‌هوک (اولویت) با فال‌بک long-polling
//  توکن در تنظیمات ادمین: settings.telegram.token
//  دستورات: /start /help /status <کد سفارش> /products <جستجو> /contact
//  سایر پیام‌ها → صندوق ورودی پنل ادمین + پاسخ خودکار
//  چرا وب‌هوک؟ هر poller سرگردان (نمونهٔ قدیمی/سرویس دیگر) با 409 کل
//  long-polling را قفل می‌کرد؛ وب‌هوک یعنی تلگرام خودش پیام را به ما می‌دهد.
// ─────────────────────────────────────────────────────────────
import crypto from 'node:crypto';
import { db, logAudit } from './db.mjs';

const CANON = 'https://yassaei-electronics.onrender.com';
export const TG_WEBHOOK_PATH = '/api/tg/webhook';
export const tgSecret = (token) => crypto.createHash('sha256').update(String(token || '')).digest('hex').slice(0, 24);
let webhookState = { url: '', ok: false, err: '' };
export const tgWebhookState = () => ({ ...webhookState });

const API = (token) => `https://api.telegram.org/bot${token}`;
let polling = false;
let currentToken = '';
// فقط «یک» حلقهٔ poll مجاز است: شناسهٔ نسل (generation) جلوی ping-pong دو حلقه
// (که با خاموش/روشن شدن بات ساخته می‌شد و با 409 یکدیگر را می‌زدند) را می‌گیرد.
let loopSeq = 0;
let activeLoop = 0;

export function telegramEnabled() {
  const tg = db.raw.settings?.telegram;
  return !!(tg?.enabled && tg?.token);
}

export async function tgSend(chatId, text) {
  const tg = db.raw.settings?.telegram;
  if (!tg?.token) throw new Error('telegram token missing');
  const r = await fetch(`${API(tg.token)}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text, parse_mode: 'HTML' }),
  });
  const j = await r.json().catch(() => ({}));
  if (!r.ok || !j.ok) throw new Error(j?.description || 'telegram send failed');
  return j;
}

export async function tgBroadcast(text) {
  const subs = db.raw.telegramSubs || {};
  let ok = 0; let fail = 0;
  for (const chatId of Object.keys(subs)) {
    try { await tgSend(chatId, text); ok++; } catch { fail++; }
  }
  return { ok, fail, total: Object.keys(subs).length };
}

// پاسخ‌ها با parse_mode HTML فرستاده می‌شوند؛ پس هر_fragment_ ساخته‌شده از
// ورودی کاربر باید escape شود وگرنه تلگرام send را با 400 رد می‌کند (= بی‌پاسخی)
const escT = (x) => String(x ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// پیگیری سفارش؛ بدون کد → راهنمای استفاده
function answerStatus(code) {
  const c = String(code || '').trim();
  if (!c) return 'برای پیگیری سفارش، کد سفارش را همین‌جا بفرست.\nمثال: /status BM-123456\nکد سفارش را در «حساب من → سفارش‌ها» یا پیامک تأیید سفارش پیدا می‌کنی.';
  const st = db.raw;
  const o = (st.orders || []).find((x) => x.code === c || x.code === `BM-${c}` || x.code === c.replace(/^bm-/i, '').toUpperCase());
  if (!o) return `سفارشی با کد «${escT(c)}» پیدا نشد. 😕\nکد صحیح شبیه BM-123456 است؛ آن را از «حساب من → سفارش‌ها» کپی کن و دوباره بفرست:\n/status BM-123456`;
  const fa = { pending_payment: 'در انتظار پرداخت', paid: 'پرداخت‌شده', processing: 'در حال آماده‌سازی', sent: 'ارسال‌شده', delivered: 'تحویل‌شده', cancelled: 'لغوشده', refunded: 'مرجوع‌شده' };
  const next = {
    pending_payment: 'هنوز پرداخت نشده؛ از «حساب من → سفارش‌ها» می‌توانی پرداختش کنی.',
    paid: 'سفارش تو در صف آماده‌سازی است.',
    processing: 'داریم بسته‌بندی می‌کنیم؛ به‌زودی ارسال می‌شود.',
    sent: 'سفارش تحویل پست شده؛ کد رهگیری برایت پیامک می‌شود.',
    delivered: 'به سلامت رسید؛ نوش جان! 🍏',
    cancelled: 'این سفارش لغو شده؛ اگر اشتباه است پیام بده.',
    refunded: 'مرجوع شد؛ مبلغ به کیف پولت برگشت.',
  };
  const note = next[o.status] ? `\n${next[o.status]}` : '';
  return `📦 سفارش ${o.code}\nوضعیت: «${fa[o.status] || o.status}»${note}\nمجموع: ${Number(o.total || 0).toLocaleString('fa-IR')} تومان`;
}

// جستجوی کالا؛ بدون عبارت → چند نمونه + راهنما
function answerProducts(q) {
  const st = db.raw;
  const s = String(q || '').trim().toLowerCase();
  const all = (st.products || []).filter((p) => p.active !== false);
  const items = all.filter((p) => (!s || `${p.name} ${p.nameEn || ''} ${p.brandName || ''} ${p.brandNameEn || ''} ${(p.tags || []).join(' ')}`.toLowerCase().includes(s))).slice(0, 5);
  if (!items.length) return `کالایی مطابق «${escT(q)}» پیدا نشد. 🙁\nعبارت کوتاه‌تر یا نام برند را امتحان کن؛ مثال:\n/products baseus\nلیست چند کالا: /products`;
  const head = s ? `🔍 نتیجه جستجوی «${escT(q)}»:` : '🛍 چند کالای موجود فروشگاه:';
  const tail = '\n\nبرای جستجوی دقیق‌تر: /products عبارت\nمثال: /products کابل';
  return `${head}\n${items.map((p) => `• ${p.name} — ${Number(p.price).toLocaleString('fa-IR')} تومان`).join('\n')}${s ? '' : tail}`;
}

export async function handleUpdate(up) {
  const msg = up.message;
  if (!msg) return;
  const chatId = String(msg.chat?.id || '');
  const name = [msg.chat?.first_name, msg.chat?.last_name].filter(Boolean).join(' ') || 'کاربر تلگرام';
  const text = String(msg.text || '').trim();
  const st = db.raw;
  st.telegramSubs = st.telegramSubs || {};
  let reply = '';
  if (text === '/start') {
    st.telegramSubs[chatId] = name;
    reply = st.settings?.telegram?.welcome || 'سلام! من ربات پشتیبانی یاسایی هستم. /help را ببین.';
  } else if (text === '/help') {
    reply = '🍏 راهنمای ربات یاسایی:\n\n۱) /status کدسفارش — پیگیری وضعیت سفارش\nمثال: /status BM-123456\n\n۲) /products عبارت — جستجو در کالاها\nمثال: /products کابل\n\n۳) /contact — تلفن و آدرس فروشگاه\n\n۴) هر پیام متنی دیگر = پیام به پشتیبانی انسانی؛\nپاسخ‌ش را همین‌جا می‌گیری.\n\nاشتباه زدی؟ ایرادی ندارد؛ همین راهنما را دوباره بخواه: /help';
  } else if (text.startsWith('/status')) {
    reply = answerStatus(text.slice(7));
  } else if (text.startsWith('/products')) {
    reply = answerProducts(text.slice(9));
  } else if (text === '/contact') {
    const s = st.settings?.store || {};
    reply = `📞 تلفن: ${s.phone || ''}\n📱 موبایل/واتساپ: ${s.phone2 || ''}\n📍 آدرس: ${s.address || ''}\n🕘 ساعت کاری: ${(s.workingHours || []).map((w) => `${w.fa || w.day} ${w.time || ''}`).join(' · ')}`;
  } else if (text.startsWith('/')) {
    // دستور ناشناخته → به‌جای سکوت، راهنمایی کن
    reply = `دستور «${escT(text.split(/\s/)[0])}» را نمی‌شناسم. 🤖\nنگران نباش؛ این‌ها را دارم:\n/status کدسفارش — پیگیری سفارش\n/products عبارت — جستجوی کالا\n/contact — راه‌های تماس\n/help — راهنمای کامل`;
  } else if (text) {
    st.telegramInbox = st.telegramInbox || [];
    st.telegramInbox.unshift({ id: `tg${up.update_id}`, chatId, name, text, at: new Date().toISOString(), replied: false });
    if (st.telegramInbox.length > 300) st.telegramInbox.length = 300;
    reply = 'پیامت ثبت شد؛ پشتیبانی یاسایی به‌زودی در همین چت پاسخ می‌دهد. 🍏\n(اگر دنبال سفارش یا کالا بودی: /status کدسفارش یا /products عبارت)';
  }
  if (reply && chatId) {
    try { await tgSend(chatId, String(reply)); }
    catch (e) {
      // ثبت خطا برای diagnos از پنل ادمین؛ سکوت مطلق ممنوع
      st.meta = { ...(st.meta || {}), tgLastError: `${new Date().toISOString()} send→${chatId}: ${e?.message || e}` };
    }
  }
}

async function pollOnce(token) {
  const st = db.raw;
  const off = st.meta?.tgOffset || 0;
  const r = await fetch(`${API(token)}/getUpdates?timeout=20&offset=${off}`, { signal: AbortSignal.timeout(25000) });
  const j = await r.json().catch(() => null);
  if (!j?.ok) throw new Error(j?.description || 'getUpdates failed');
  st.meta = { ...(st.meta || {}), tgLastPoll: new Date().toISOString(), tgLastError: '' };
  for (const up of j.result || []) {
    st.meta = { ...(st.meta || {}), tgOffset: up.update_id + 1 };
    await handleUpdate(up).catch((e) => {
      st.meta = { ...(st.meta || {}), tgLastError: `${new Date().toISOString()} handle: ${e?.message || e}` };
    });
  }
}

// برای تست واحد (tools/tests) — بدون اثر جانبی
export const tgInternals = { answerStatus, answerProducts };

// ثبت وب‌هوک روی آدرس کانال اصلی؛_secret_ در هدر X-Telegram-Bot-Api-Secret-Token
async function ensureWebhook(token) {
  const url = `${CANON}${TG_WEBHOOK_PATH}`;
  if (webhookState.ok && webhookState.url === url) return true;
  const r = await fetch(`${API(token)}/setWebhook`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url, allowed_updates: ['message'], secret_token: tgSecret(token) }),
  });
  const j = await r.json().catch(() => null);
  if (r.ok && j?.ok) { webhookState = { url, ok: true, err: '' }; return true; }
  webhookState = { url, ok: false, err: j?.description || 'setWebhook failed' };
  return false;
}

/** حلقهٔ long-poll؛ هر ۲۰ ثانیه وضعیت تنظیمات بازبررسی می‌شود */
export function startTelegramBot() {
  setInterval(async () => {
    const tg = db.raw.settings?.telegram;
    // BM_TG=off → بات غیرفعال (برای اجرای لوکالی هم‌زمان با نسخهٔ زنده تا پاسخ دوبله نشود)
    // سرویس «-legacy» هرگز poll نمی‌کند: دو poller روی یک توکن = 409 تلگرام و سکوت بات
    const svc = String(process.env.RENDER_SERVICE_NAME || '');
    const want = !!(tg?.enabled && tg?.token) && process.env.BM_TG !== 'off' && !/-legacy$/i.test(svc) && !/^bander-mobile$/i.test(svc);
    if (!want) { polling = false; currentToken = ''; activeLoop++; /* حلقهٔ قبلی می‌میرد */ return; }
    // اولویت با وب‌هوک است؛ فقط اگر ثبت وب‌هوک شکست خورد به polling برمی‌گردیم
    const wok = await ensureWebhook(tg.token).catch(() => false);
    if (wok) { polling = false; currentToken = tg.token; activeLoop++; return; }
    if (polling && currentToken === tg.token) return;
    polling = true; currentToken = tg.token;
    const id = ++loopSeq;
    activeLoop = id;
    (async function loop() {
      while (polling && activeLoop === id && db.raw.settings?.telegram?.token === currentToken) {
        try { await pollOnce(currentToken); }
        catch (e) {
          // خطای poll (مثلاً 409 تداخل دو poller) ثبت شود تا در پنل دیده شود
          db.raw.meta = { ...(db.raw.meta || {}), tgLastError: `${new Date().toISOString()} poll: ${e?.message || e}` };
          await new Promise((r) => setTimeout(r, 8000));
        }
      }
    })();
  }, 20000).unref?.();
}
