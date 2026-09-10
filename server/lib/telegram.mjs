// ─────────────────────────────────────────────────────────────
//  بات پشتیبانی تلگرام — long-polling بدون وابستگی بیرونی
//  توکن در تنظیمات ادمین: settings.telegram.token
//  دستورات: /start /help /status <کد سفارش> /products <جستجو> /contact
//  سایر پیام‌ها → صندوق ورودی پنل ادمین + پاسخ خودکار
// ─────────────────────────────────────────────────────────────
import { db, logAudit } from './db.mjs';

const API = (token) => `https://api.telegram.org/bot${token}`;
let polling = false;
let currentToken = '';

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

function answerStatus(code) {
  const st = db.raw;
  const o = (st.orders || []).find((x) => x.code === String(code || '').trim());
  if (!o) return 'سفارشی با این کد پیدا نشد. کد را مثل BM-123456 بفرست.', false;
  const u = st.users.find((x) => x.id === o.userId);
  const fa = { paid: 'پرداخت‌شده', processing: 'در حال آماده‌سازی', sent: 'ارسال‌شده', delivered: 'تحویل‌شده', cancelled: 'لغوشده' };
  return `سفارش ${o.code}: وضعیت «${fa[o.status] || o.status}» — مجموع ${Number(o.total || 0).toLocaleString('fa-IR')} تومان`, true;
}

function answerProducts(q) {
  const st = db.raw;
  const s = String(q || '').trim().toLowerCase();
  const items = (st.products || []).filter((p) => p.active !== false && (!s || `${p.name} ${p.nameEn || ''}`.toLowerCase().includes(s))).slice(0, 3);
  if (!items.length) return 'کالایی پیدا نشد.', false;
  return items.map((p) => `• ${p.name} — ${Number(p.price).toLocaleString('fa-IR')} تومان`).join('\n'), true;
}

async function handleUpdate(up) {
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
    reply = st.settings?.telegram?.welcome || 'سلام! من ربات پشتیبانی گرین اپل هستم. /help را ببین.';
  } else if (text === '/help') {
    reply = 'دستورات:\n/status کدسفارش — پیگیری سفارش\n/products عبارت — جستجوی کالا\n/contact — راه‌های تماس\nهر پیام دیگر را به پشتیبانی انسانی می‌رسانم.';
  } else if (text.startsWith('/status')) {
    reply = answerStatus(text.slice(7));
  } else if (text.startsWith('/products')) {
    reply = answerProducts(text.slice(9));
  } else if (text === '/contact') {
    const s = st.settings?.store || {};
    reply = `تماس: ${s.phone || ''} — ${s.address || ''}`;
  } else if (text) {
    st.telegramInbox = st.telegramInbox || [];
    st.telegramInbox.unshift({ id: `tg${up.update_id}`, chatId, name, text, at: new Date().toISOString(), replied: false });
    if (st.telegramInbox.length > 300) st.telegramInbox.length = 300;
    reply = 'پیامت ثبت شد؛ پشتیبانی گرین اپل به‌زودی در همین چت پاسخ می‌دهد.';
  }
  if (reply && chatId) { try { await tgSend(chatId, reply); } catch { /* noop */ } }
}

async function pollOnce(token) {
  const st = db.raw;
  const off = st.meta?.tgOffset || 0;
  const r = await fetch(`${API(token)}/getUpdates?timeout=20&offset=${off}`, { signal: AbortSignal.timeout(25000) });
  const j = await r.json().catch(() => null);
  if (!j?.ok) throw new Error(j?.description || 'getUpdates failed');
  for (const up of j.result || []) {
    st.meta = { ...(st.meta || {}), tgOffset: up.update_id + 1 };
    await handleUpdate(up).catch(() => {});
  }
}

/** حلقهٔ long-poll؛ هر ۲۰ ثانیه وضعیت تنظیمات بازبررسی می‌شود */
export function startTelegramBot() {
  setInterval(async () => {
    const tg = db.raw.settings?.telegram;
    // BM_TG=off → بات غیرفعال (برای اجرای لوکالی هم‌زمان با نسخهٔ زنده تا پاسخ دوبله نشود)
    const want = !!(tg?.enabled && tg?.token) && process.env.BM_TG !== 'off';
    if (!want) { polling = false; currentToken = ''; return; }
    if (polling && currentToken === tg.token) return;
    polling = true; currentToken = tg.token;
    (async function loop() {
      while (polling && db.raw.settings?.telegram?.token === currentToken) {
        try { await pollOnce(currentToken); }
        catch { await new Promise((r) => setTimeout(r, 5000)); }
      }
    })();
  }, 20000).unref?.();
}
