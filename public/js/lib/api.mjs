// ─────────────────────────────────────────────────────────────
//  کلاینت API — مدیریت CSRF، خطاها، تلاش مجدد و حالت آفلاین
// ─────────────────────────────────────────────────────────────
export class ApiError extends Error {
  constructor(status, code, message, details) {
    super(message || code || 'error');
    this.status = status; this.code = code; this.details = details;
  }
}

function getCookie(name) {
  const m = document.cookie.match(new RegExp('(?:^|; )' + name.replace(/[.$?*|{}()[\]\\/+^]/g, '\\$&') + '=([^;]*)'));
  return m ? decodeURIComponent(m[1]) : '';
}

const EN_MESSAGES = {
  login_required: 'Please sign in to continue.',
  store_asleep: 'The store is temporarily turned off.',
  unauthorized: 'Authentication failed.',
  forbidden: 'You do not have access to this section.',
  csrf_failed: 'Security token expired. Please refresh the page.',
  too_many_requests: 'Too many requests. Please wait a moment.',
  not_found: 'Not found.',
  product_not_found: 'Product not found.',
  order_not_found: 'Order not found.',
  invalid_credentials: 'Incorrect username or password.',
  invalid_code: 'The verification code is not valid.',
  invalid_phone: 'Invalid mobile number.',
  invalid_email: 'Invalid email address.',
  weak_password: 'Password is too weak. Use upper/lower case letters, digits and symbols.',
  stock_limit: 'Not enough stock for this quantity.',
  empty_cart: 'Your cart is empty.',
  insufficient_balance: 'Wallet balance is not enough.',
  account_exists: 'This account already exists.',
  username_taken: 'This username is taken.',
  phone_taken: 'This phone number is already registered.',
  email_taken: 'This email is already registered.',
  terms_required: 'You must accept the terms and conditions.',
  rules_required: 'You must accept the ticket rules.',
  address_required: 'Please add a shipping address first.',
  already_submitted: 'You have already submitted this.',
  payload_too_large: 'The uploaded data is too large.',
  invalid_type: 'Only image files are allowed.',
  server_error: 'Internal server error. Please try again.',
  product_unavailable: 'One of the items in your cart is no longer available.',
  cannot_cancel: 'This order cannot be cancelled in its current state.',
  account_blocked: 'This account is blocked. Please contact support.',
  disabled: 'This feature is currently disabled.',
};

let busy = 0;
const listeners = new Set();
export function onLoading(fn) { listeners.add(fn); return () => listeners.delete(fn); }
function setLoading(v) {
  busy = Math.max(0, busy + (v ? 1 : -1));
  for (const fn of listeners) { try { fn(busy > 0); } catch { /* noop */ } }
}

async function request(method, path, body, opts = {}) {
  if (!navigator.onLine && method !== 'GET') {
    throw new ApiError(0, 'offline', 'اتصال اینترنت برقرار نیست. لطفاً شبکه را بررسی کن.', 'You are offline.');
  }
  setLoading(true);
  const headers = { ...(opts.headers || {}) };
  if (body !== undefined && body !== null) headers['Content-Type'] = 'application/json';
  if (method !== 'GET') {
    const csrf = getCookie('bm_csrf');
    if (csrf) headers['X-CSRF-Token'] = csrf;
  }
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), opts.timeout || 25000);
  try {
    const res = await fetch(path, {
      method, headers, signal: ctrl.signal, credentials: 'same-origin',
      body: body === undefined || body === null ? undefined : JSON.stringify(body),
    });
    let data = null;
    const text = await res.text();
    if (text) { try { data = JSON.parse(text); } catch { data = { raw: text.slice(0, 300) }; } }
    if (res.status === 403 && data?.code === 'csrf_failed' && !opts._retried) {
      // دریافت توکن تازه و یک بار تلاش مجدد
      await fetch('/api/bootstrap', { credentials: 'same-origin' }).catch(() => {});
      return request(method, path, body, { ...opts, _retried: true });
    }
    if (!res.ok || data?.ok === false) {
      const code = data?.code || 'error';
      throw new ApiError(res.status || 500, code, data?.message || EN_MESSAGES[code] || 'خطا', EN_MESSAGES[code]);
    }
    return data;
  } catch (err) {
    if (err instanceof ApiError) throw err;
    if (err?.name === 'AbortError') throw new ApiError(408, 'timeout', 'زمان درخواست به پایان رسید. دوباره تلاش کن.', 'Request timed out.');
    throw new ApiError(0, 'network', 'ارتباط با سرور برقرار نشد. اتصال اینترنت را بررسی کن.', 'Network error.');
  } finally {
    clearTimeout(timer);
    setLoading(false);
  }
}

/** ساخت نشانی با کوئری‌استرینگ؛ مقادیر خالی نادیده گرفته می‌شوند */
export const withQuery = (path, params) => {
  const u = new URLSearchParams();
  for (const [k, v] of Object.entries(params || {})) {
    if (v === undefined || v === null || v === '') continue;
    u.set(k, String(v));
  }
  const s = u.toString();
  return s ? `${path}${path.includes('?') ? '&' : '?'}${s}` : path;
};

export const api = {
  url: withQuery,
  get: (p, o) => request('GET', p, undefined, o),
  post: (p, b, o) => request('POST', p, b ?? {}, o),
  patch: (p, b, o) => request('PATCH', p, b ?? {}, o),
  del: (p, b, o) => request('DELETE', p, b, o),
  put: (p, b, o) => request('PUT', p, b ?? {}, o),
  upload: (dataUrl) => request('POST', '/api/upload', { data: dataUrl }, { timeout: 60000 }),
};

export function errorMessage(err) {
  if (!(err instanceof ApiError)) return String(err?.message || err || 'خطا');
  return err.message;
}
export function errorEn(err) {
  return err?.details || EN_MESSAGES[err?.code] || err?.message || 'Error';
}
export { getCookie };
