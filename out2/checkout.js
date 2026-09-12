var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __esm = (fn, res, err) => function __init() {
  if (err) throw err[0];
  try {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  } catch (e) {
    throw err = [e], e;
  }
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// public/js/lib/dom.mjs
var dom_exports = {};
__export(dom_exports, {
  applyDyn: () => applyDyn,
  byId: () => byId,
  catIcon: () => catIcon,
  copyText: () => copyText,
  countdown: () => countdown,
  debounce: () => debounce,
  el: () => el,
  esc: () => esc,
  faDigits: () => faDigits,
  fileToDataURL: () => fileToDataURL,
  fmtDate: () => fmtDate,
  fmtDay: () => fmtDay,
  fmtMoney: () => fmtMoney,
  fmtMoneyPlain: () => fmtMoneyPlain,
  fmtNum: () => fmtNum,
  fmtTel: () => fmtTel,
  html: () => html,
  icon: () => icon,
  latinDigits: () => latinDigits,
  linkify: () => linkify,
  locale: () => locale,
  pct: () => pct,
  qs: () => qs,
  qsa: () => qsa,
  raw: () => raw,
  safeHref: () => safeHref,
  scrollTop: () => scrollTop,
  setLocale: () => setLocale,
  stars: () => stars,
  throttle: () => throttle,
  timeAgo: () => timeAgo
});
function trusted(str) {
  return S1 + stripMarks(String(str ?? "")) + S2;
}
function esc(v) {
  if (v === null || v === void 0 || v === false) return trusted("");
  if (typeof v === "object" && v !== null && v[RAW] !== void 0) return v[RAW];
  const s = String(v);
  if (s.includes(S1) || s.includes(S2)) return stripMarks(s);
  return trusted(s.replace(/[&<>"'`]/g, (c) => ESC_MAP[c]));
}
function html(strings, ...vals) {
  let out = strings[0];
  for (let i = 0; i < vals.length; i++) {
    const v = vals[i];
    if (Array.isArray(v)) out += v.map((x) => esc(x)).join("");
    else out += esc(v);
    out += strings[i + 1];
  }
  return trusted(out);
}
function el(tag, attrs = {}, children = []) {
  const node = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (v === null || v === void 0 || v === false) continue;
    if (k === "class") node.className = v;
    else if (k === "text") node.textContent = v;
    else if (k.startsWith("on") && typeof v === "function") node.addEventListener(k.slice(2).toLowerCase(), v);
    else if (k === "style" && typeof v === "object") Object.assign(node.style, v);
    else node.setAttribute(k, v);
  }
  for (const c of [].concat(children)) {
    if (c === null || c === void 0 || c === false) continue;
    node.appendChild(typeof c === "string" ? document.createTextNode(c) : c);
  }
  return node;
}
function icon(name, cls = "") {
  return raw(`<svg class="ic ${cls}" viewBox="0 0 24 24" aria-hidden="true"><use href="#i-${name}"/></svg>`);
}
function faDigits(s) {
  return String(s).replace(/[0-9]/g, (d) => FA_DIGITS[+d]);
}
function latinDigits(s) {
  return String(s).replace(/[۰-۹]/g, (d) => FA_DIGITS.indexOf(d)).replace(/[٠-٩]/g, (d) => "\u0660\u0661\u0662\u0663\u0664\u0665\u0666\u0667\u0668\u0669".indexOf(d));
}
function setLocale(l) {
  LOCALE = l === "en" ? "en" : "fa";
}
function fmtNum(n) {
  const v = Number(n) || 0;
  const s = new Intl.NumberFormat(LOCALE === "fa" ? "fa-IR" : "en-US").format(v);
  return s;
}
function safeHref(u) {
  const s = String(u || "").trim();
  return /^https?:\/\//i.test(s) ? s : "";
}
function fmtTel(v) {
  const s = String(v ?? "").trim();
  if (!s) return "";
  if (LOCALE === "fa") return s.replace(/\d/g, (x) => FA_DIGITS[+x]);
  return s;
}
function fmtMoney(n, { withUnit = true } = {}) {
  const v = Math.round(Number(n) || 0);
  const s = new Intl.NumberFormat(LOCALE === "fa" ? "fa-IR" : "en-US").format(v);
  if (!withUnit) return s;
  return raw(`${s} <span class="pc-cur">${LOCALE === "fa" ? "\u062A\u0648\u0645\u0627\u0646" : "Toman"}</span>`);
}
function fmtMoneyPlain(n) {
  return new Intl.NumberFormat(LOCALE === "fa" ? "fa-IR" : "en-US").format(Math.round(Number(n) || 0));
}
function fmtDate(iso, { time = true, short = false } = {}) {
  if (!iso) return "\u2014";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "\u2014";
  try {
    const opt = { calendar: LOCALE === "fa" ? "persian" : "gregory" };
    if (short) return d.toLocaleDateString(LOCALE === "fa" ? "fa-IR" : "en-GB", { year: "numeric", month: "short", day: "numeric", ...opt });
    const date = d.toLocaleDateString(LOCALE === "fa" ? "fa-IR" : "en-GB", { year: "numeric", month: "long", day: "numeric", ...opt });
    if (!time) return date;
    const t2 = d.toLocaleTimeString(LOCALE === "fa" ? "fa-IR" : "en-GB", { hour: "2-digit", minute: "2-digit" });
    return `${date} \xB7 ${t2}`;
  } catch {
    return d.toISOString().slice(0, 16).replace("T", " ");
  }
}
function fmtDay(iso) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "\u2014";
  try {
    return d.toLocaleDateString(LOCALE === "fa" ? "fa-IR" : "en-GB", { year: "numeric", month: "short", day: "numeric", calendar: LOCALE === "fa" ? "persian" : "gregory" });
  } catch {
    return iso.slice(0, 10);
  }
}
function timeAgo(iso) {
  const t2 = new Date(iso).getTime();
  if (Number.isNaN(t2)) return "\u2014";
  const s = Math.max(1, Math.floor((Date.now() - t2) / 1e3));
  const f = (n, unit) => {
    try {
      return new Intl.RelativeTimeFormat(LOCALE === "fa" ? "fa" : "en", { numeric: "auto" }).format(-n, unit);
    } catch {
      return `${n} ${unit}`;
    }
  };
  if (s < 60) return f(s, "second");
  if (s < 3600) return f(Math.floor(s / 60), "minute");
  if (s < 86400) return f(Math.floor(s / 3600), "hour");
  if (s < 2592e3) return f(Math.floor(s / 86400), "day");
  if (s < 31536e3) return f(Math.floor(s / 2592e3), "month");
  return f(Math.floor(s / 31536e3), "year");
}
function countdown(iso) {
  const diff = new Date(iso).getTime() - Date.now();
  if (Number.isNaN(diff)) return "";
  if (diff <= 0) return LOCALE === "fa" ? "\u067E\u0627\u06CC\u0627\u0646 \u06CC\u0627\u0641\u062A" : "Expired";
  const d = Math.floor(diff / 864e5);
  const h = Math.floor(diff % 864e5 / 36e5);
  const m = Math.floor(diff % 36e5 / 6e4);
  const s = Math.floor(diff % 6e4 / 1e3);
  if (d > 0) return LOCALE === "fa" ? `${faDigits(d)} \u0631\u0648\u0632 \u0648 ${faDigits(h)} \u0633\u0627\u0639\u062A` : `${d}d ${h}h`;
  const pad = (x) => String(x).padStart(2, "0");
  const t2 = `${pad(h)}:${pad(m)}:${pad(s)}`;
  return LOCALE === "fa" ? faDigits(t2) : t2;
}
function stars(rating, size = "") {
  const r = Math.round(Number(rating) || 0);
  let out = '<span class="pc-stars">';
  for (let i = 1; i <= 5; i++) out += `<svg class="ic ${i <= r ? "" : "off"} ${size}" aria-hidden="true"><use href="#i-star"/></svg>`;
  return raw(out + "</span>");
}
function pct(n) {
  return `${fmtNum(Math.round(Number(n) || 0))}\u066A`;
}
function linkify(text) {
  const safe = esc(text);
  return raw(safe.replace(/(https?:\/\/[^\s<]+)/g, (m) => `<a href="${m}" target="_blank" rel="noopener noreferrer nofollow">${m}</a>`));
}
function debounce(fn, ms = 260) {
  let t2;
  return (...a) => {
    clearTimeout(t2);
    t2 = setTimeout(() => fn(...a), ms);
  };
}
function throttle(fn, ms = 200) {
  let last = 0;
  let timer = null;
  return (...a) => {
    const now = Date.now();
    const left = ms - (now - last);
    if (left <= 0) {
      last = now;
      fn(...a);
    } else {
      clearTimeout(timer);
      timer = setTimeout(() => {
        last = Date.now();
        fn(...a);
      }, left);
    }
  };
}
function fileToDataURL(file) {
  return new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(String(r.result));
    r.onerror = () => reject(new Error("read-failed"));
    r.readAsDataURL(file);
  });
}
function copyText(text) {
  if (navigator.clipboard?.writeText) return navigator.clipboard.writeText(text);
  return new Promise((resolve, reject) => {
    try {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      resolve();
    } catch (e) {
      reject(e);
    }
  });
}
function applyDyn(root = document) {
  root.querySelectorAll("[data-w]").forEach((n) => {
    n.style.width = n.dataset.w;
  });
  root.querySelectorAll("[data-h]").forEach((n) => {
    n.style.height = n.dataset.h;
  });
  root.querySelectorAll("[data-maxw]").forEach((n) => {
    n.style.maxWidth = n.dataset.maxw;
  });
}
function scrollTop(smooth = true) {
  window.scrollTo({ top: 0, behavior: smooth ? "smooth" : "auto" });
}
var RAW, S1, S2, stripMarks, raw, ESC_MAP, qs, qsa, byId, GLYPH_ICON, catIcon, FA_DIGITS, LOCALE, locale;
var init_dom = __esm({
  "public/js/lib/dom.mjs"() {
    RAW = /* @__PURE__ */ Symbol("raw");
    S1 = "";
    S2 = "";
    stripMarks = (s) => s.replace(/[\u0001\u0002]/g, "");
    try {
      if (typeof Element !== "undefined") {
        const d = Object.getOwnPropertyDescriptor(Element.prototype, "innerHTML");
        if (d && d.set && d.configurable !== false) {
          Object.defineProperty(Element.prototype, "innerHTML", {
            configurable: true,
            enumerable: d.enumerable,
            get() {
              return d.get.call(this);
            },
            set(v) {
              d.set.call(this, typeof v === "string" && (v.includes(S1) || v.includes(S2)) ? stripMarks(v) : v);
            }
          });
        }
        const ia = Element.prototype.insertAdjacentHTML;
        if (ia) Element.prototype.insertAdjacentHTML = function(pos, v) {
          return ia.call(this, pos, typeof v === "string" && (v.includes(S1) || v.includes(S2)) ? stripMarks(v) : v);
        };
      }
    } catch {
    }
    raw = (s) => trusted(s);
    ESC_MAP = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;", "`": "&#96;" };
    qs = (sel, root = document) => root.querySelector(sel);
    qsa = (sel, root = document) => [...root.querySelectorAll(sel)];
    byId = (id) => document.getElementById(id);
    GLYPH_ICON = {
      cable: "cable",
      adapter: "plug",
      case: "shield",
      glass: "layers",
      powerbank: "battery",
      battery: "battery",
      dongle: "plug",
      speaker: "speaker",
      audio: "headset",
      wearable: "watch",
      content: "camera",
      gaming: "zap",
      car: "truck",
      light: "light",
      mics: "mic",
      misc: "box",
      watch: "watch",
      phone: "phone"
    };
    catIcon = (glyph) => GLYPH_ICON[glyph] || "box";
    FA_DIGITS = ["\u06F0", "\u06F1", "\u06F2", "\u06F3", "\u06F4", "\u06F5", "\u06F6", "\u06F7", "\u06F8", "\u06F9"];
    LOCALE = "fa";
    locale = () => LOCALE;
  }
});

// public/js/i18n.mjs
function setLang(l) {
  LANG = l === "en" ? "en" : "fa";
  document.documentElement.lang = LANG;
  document.documentElement.dir = LANG === "fa" ? "rtl" : "ltr";
}
function t(key, params) {
  const dict = DICTS[LANG] || fa;
  let s = dict[key];
  if (s === void 0) {
    s = fa[key];
    if (s === void 0) {
      if (!missing.has(key)) {
        missing.add(key);
        if (location.hostname === "localhost" || location.hostname === "127.0.0.1") console.warn("[i18n] missing key:", key);
      }
      s = key;
    }
  }
  if (params) for (const [k, v] of Object.entries(params)) s = s.replace(new RegExp(`\\{${k}\\}`, "g"), String(v));
  return s;
}
function applyI18n(root = document) {
  root.querySelectorAll("[data-i18n]").forEach((n) => {
    n.textContent = t(n.dataset.i18n);
  });
  root.querySelectorAll("[data-i18n-placeholder]").forEach((n) => {
    n.setAttribute("placeholder", t(n.dataset.i18nPlaceholder));
  });
  root.querySelectorAll("[data-i18n-title]").forEach((n) => {
    n.setAttribute("title", t(n.dataset.i18nTitle));
    n.setAttribute("aria-label", t(n.dataset.i18nTitle));
  });
  root.querySelectorAll("[data-i18n-html]").forEach((n) => {
    n.innerHTML = t(n.dataset.i18nHtml);
  });
}
var fa, en, DICTS, LANG, missing, lang, isFa2;
var init_i18n = __esm({
  "public/js/i18n.mjs"() {
    fa = {
      "app.name": "\u06AF\u0631\u06CC\u0646 \u0627\u067E\u0644",
      "app.tagline": "\u0644\u0648\u0627\u0632\u0645 \u062C\u0627\u0646\u0628\u06CC \u0645\u0648\u0628\u0627\u06CC\u0644 \u0648 \u06AF\u062C\u062A",
      "common.loading": "\u062F\u0631 \u062D\u0627\u0644 \u0628\u0627\u0631\u06AF\u0630\u0627\u0631\u06CC\u2026",
      "common.save": "\u0630\u062E\u06CC\u0631\u0647",
      "common.saving": "\u062F\u0631 \u062D\u0627\u0644 \u0630\u062E\u06CC\u0631\u0647\u2026",
      "common.cancel": "\u0627\u0646\u0635\u0631\u0627\u0641",
      "common.close": "\u0628\u0633\u062A\u0646",
      "common.confirm": "\u062A\u0623\u06CC\u06CC\u062F",
      "common.delete": "\u062D\u0630\u0641",
      "common.edit": "\u0648\u06CC\u0631\u0627\u06CC\u0634",
      "common.add": "\u0627\u0641\u0632\u0648\u062F\u0646",
      "common.create": "\u0627\u06CC\u062C\u0627\u062F",
      "common.update": "\u0628\u0647\u200C\u0631\u0648\u0632\u0631\u0633\u0627\u0646\u06CC",
      "common.search": "\u062C\u0633\u062A\u200C\u0648\u062C\u0648",
      "common.filter": "\u0641\u06CC\u0644\u062A\u0631",
      "common.filters": "\u0641\u06CC\u0644\u062A\u0631\u0647\u0627",
      "common.sort": "\u0645\u0631\u062A\u0628\u200C\u0633\u0627\u0632\u06CC",
      "common.all": "\u0647\u0645\u0647",
      "common.none": "\u0647\u06CC\u0686",
      "common.more": "\u0628\u06CC\u0634\u062A\u0631",
      "common.less": "\u06A9\u0645\u062A\u0631",
      "common.showAll": "\u0645\u0634\u0627\u0647\u062F\u0647\u200C\u06CC \u0647\u0645\u0647",
      "common.back": "\u0628\u0627\u0632\u06AF\u0634\u062A",
      "common.next": "\u0627\u062F\u0627\u0645\u0647",
      "common.prev": "\u0642\u0628\u0644\u06CC",
      "common.yes": "\u0628\u0644\u0647",
      "common.no": "\u062E\u06CC\u0631",
      "common.optional": "\u0627\u062E\u062A\u06CC\u0627\u0631\u06CC",
      "common.required": "\u0627\u0644\u0632\u0627\u0645\u06CC",
      "common.copy": "\u06A9\u067E\u06CC",
      "common.copied": "\u06A9\u067E\u06CC \u0634\u062F",
      "common.share": "\u0627\u0634\u062A\u0631\u0627\u06A9\u200C\u06AF\u0630\u0627\u0631\u06CC",
      "common.download": "\u062F\u0627\u0646\u0644\u0648\u062F",
      "common.upload": "\u0628\u0627\u0631\u06AF\u0630\u0627\u0631\u06CC",
      "common.print": "\u0686\u0627\u067E",
      "common.refresh": "\u062A\u0627\u0632\u0647\u200C\u0633\u0627\u0632\u06CC",
      "common.retry": "\u062A\u0644\u0627\u0634 \u062F\u0648\u0628\u0627\u0631\u0647",
      "common.send": "\u0627\u0631\u0633\u0627\u0644",
      "common.sent": "\u0627\u0631\u0633\u0627\u0644 \u0634\u062F",
      "common.submit": "\u062B\u0628\u062A",
      "common.reply": "\u067E\u0627\u0633\u062E",
      "common.view": "\u0645\u0634\u0627\u0647\u062F\u0647",
      "common.details": "\u062C\u0632\u0626\u06CC\u0627\u062A",
      "common.status": "\u0648\u0636\u0639\u06CC\u062A",
      "common.date": "\u062A\u0627\u0631\u06CC\u062E",
      "common.time": "\u0633\u0627\u0639\u062A",
      "common.amount": "\u0645\u0628\u0644\u063A",
      "common.count": "\u062A\u0639\u062F\u0627\u062F",
      "common.total": "\u0645\u062C\u0645\u0648\u0639",
      "common.price": "\u0642\u06CC\u0645\u062A",
      "common.stock": "\u0645\u0648\u062C\u0648\u062F\u06CC",
      "common.available": "\u0645\u0648\u062C\u0648\u062F",
      "common.unavailable": "\u0646\u0627\u0645\u0648\u062C\u0648\u062F",
      "common.inStock": "\u0645\u0648\u062C\u0648\u062F \u062F\u0631 \u0627\u0646\u0628\u0627\u0631",
      "common.lowStock": "\u06A9\u0645\u062A\u0631 \u0627\u0632 \u06F3 \u0639\u062F\u062F \u0628\u0627\u0642\u06CC \u0645\u0627\u0646\u062F\u0647",
      "common.notifyMe": "\u0645\u0648\u062C\u0648\u062F \u0634\u062F \u062E\u0628\u0631\u0645 \u06A9\u0646",
      "common.notified": "\u0628\u0647 \u0645\u062D\u0636 \u0645\u0648\u062C\u0648\u062F \u0634\u062F\u0646 \u062E\u0628\u0631\u062A \u0645\u06CC\u200C\u06A9\u0646\u06CC\u0645",
      "common.category": "\u062F\u0633\u062A\u0647\u200C\u0628\u0646\u062F\u06CC",
      "common.brand": "\u0628\u0631\u0646\u062F",
      "common.product": "\u06A9\u0627\u0644\u0627",
      "common.products": "\u0645\u062D\u0635\u0648\u0644\u0627\u062A",
      "common.order": "\u0633\u0641\u0627\u0631\u0634",
      "common.orders": "\u0633\u0641\u0627\u0631\u0634\u200C\u0647\u0627",
      "common.user": "\u06A9\u0627\u0631\u0628\u0631",
      "common.users": "\u06A9\u0627\u0631\u0628\u0631\u0627\u0646",
      "common.result": "\u0646\u062A\u06CC\u062C\u0647",
      "common.results": "\u0646\u062A\u06CC\u062C\u0647",
      "common.noResult": "\u0646\u062A\u06CC\u062C\u0647\u200C\u0627\u06CC \u067E\u06CC\u062F\u0627 \u0646\u0634\u062F",
      "common.error": "\u062E\u0637\u0627",
      "common.success": "\u0627\u0646\u062C\u0627\u0645 \u0634\u062F",
      "common.warning": "\u062A\u0648\u062C\u0647",
      "common.note": "\u06CC\u0627\u062F\u062F\u0627\u0634\u062A",
      "common.notes": "\u062A\u0648\u0636\u06CC\u062D\u0627\u062A",
      "common.description": "\u062A\u0648\u0636\u06CC\u062D\u0627\u062A",
      "common.specs": "\u0645\u0634\u062E\u0635\u0627\u062A \u0641\u0646\u06CC",
      "common.actions": "\u0639\u0645\u0644\u06CC\u0627\u062A",
      "common.active": "\u0641\u0639\u0627\u0644",
      "common.inactive": "\u063A\u06CC\u0631\u0641\u0639\u0627\u0644",
      "common.enabled": "\u0631\u0648\u0634\u0646",
      "common.disabled": "\u062E\u0627\u0645\u0648\u0634",
      "common.on": "\u0631\u0648\u0634\u0646",
      "common.off": "\u062E\u0627\u0645\u0648\u0634",
      "common.from": "\u0627\u0632",
      "common.to": "\u062A\u0627",
      "common.and": "\u0648",
      "common.or": "\u06CC\u0627",
      "common.today": "\u0627\u0645\u0631\u0648\u0632",
      "common.yesterday": "\u062F\u06CC\u0631\u0648\u0632",
      "common.toman": "\u062A\u0648\u0645\u0627\u0646",
      "common.rial": "\u0631\u06CC\u0627\u0644",
      "common.page": "\u0635\u0641\u062D\u0647",
      "common.of": "\u0627\u0632",
      "common.items": "\u0642\u0644\u0645",
      "common.new": "\u062C\u062F\u06CC\u062F",
      "common.old": "\u0642\u062F\u06CC\u0645\u06CC",
      "common.apply": "\u0627\u0639\u0645\u0627\u0644",
      "common.reset": "\u0628\u0627\u0632\u0646\u0634\u0627\u0646\u06CC",
      "common.clear": "\u067E\u0627\u06A9 \u06A9\u0631\u062F\u0646",
      "common.select": "\u0627\u0646\u062A\u062E\u0627\u0628 \u06A9\u0646\u06CC\u062F",
      "common.title": "\u0639\u0646\u0648\u0627\u0646",
      "common.body": "\u0645\u062A\u0646",
      "common.type": "\u0646\u0648\u0639",
      "common.priority": "\u0627\u0648\u0644\u0648\u06CC\u062A",
      "common.answer": "\u067E\u0627\u0633\u062E",
      "common.message": "\u067E\u06CC\u0627\u0645",
      "common.messages": "\u067E\u06CC\u0627\u0645\u200C\u0647\u0627",
      "common.attach": "\u067E\u06CC\u0648\u0633\u062A",
      "common.image": "\u062A\u0635\u0648\u06CC\u0631",
      "common.images": "\u062A\u0635\u0627\u0648\u06CC\u0631",
      "common.phone": "\u0634\u0645\u0627\u0631\u0647 \u0645\u0648\u0628\u0627\u06CC\u0644",
      "common.email": "\u0627\u06CC\u0645\u06CC\u0644",
      "common.address": "\u0622\u062F\u0631\u0633",
      "common.city": "\u0634\u0647\u0631",
      "common.province": "\u0627\u0633\u062A\u0627\u0646",
      "common.postal": "\u06A9\u062F \u067E\u0633\u062A\u06CC",
      "common.name": "\u0646\u0627\u0645",
      "common.fullName": "\u0646\u0627\u0645 \u0648 \u0646\u0627\u0645 \u062E\u0627\u0646\u0648\u0627\u062F\u06AF\u06CC",
      "common.username": "\u0646\u0627\u0645 \u06A9\u0627\u0631\u0628\u0631\u06CC",
      "common.password": "\u0631\u0645\u0632 \u0639\u0628\u0648\u0631",
      "common.passwordConfirm": "\u062A\u06A9\u0631\u0627\u0631 \u0631\u0645\u0632 \u0639\u0628\u0648\u0631",
      "common.login": "\u0648\u0631\u0648\u062F",
      "common.logout": "\u062E\u0631\u0648\u062C",
      "common.register": "\u062B\u0628\u062A\u200C\u0646\u0627\u0645",
      "common.guest": "\u0645\u0647\u0645\u0627\u0646",
      "common.admin": "\u0645\u062F\u06CC\u0631",
      "common.settings": "\u062A\u0646\u0638\u06CC\u0645\u0627\u062A",
      "common.help": "\u0631\u0627\u0647\u0646\u0645\u0627",
      "common.home": "\u062E\u0627\u0646\u0647",
      "common.skip": "\u0631\u062F \u0634\u062F\u0646",
      "common.done": "\u0627\u0646\u062C\u0627\u0645 \u0634\u062F",
      "common.pending": "\u062F\u0631 \u0627\u0646\u062A\u0638\u0627\u0631",
      "common.approved": "\u062A\u0623\u06CC\u06CC\u062F \u0634\u062F\u0647",
      "common.rejected": "\u0631\u062F \u0634\u062F\u0647",
      "common.open": "\u0628\u0627\u0632",
      "common.closed": "\u0628\u0633\u062A\u0647",
      "common.all2": "\u0647\u0645\u0647\u200C\u06CC \u0645\u0648\u0627\u0631\u062F",
      "common.never": "\u0647\u0631\u06AF\u0632",
      "common.empty": "\u062E\u0627\u0644\u06CC",
      "common.secure": "\u0627\u0645\u0646",
      "common.free": "\u0631\u0627\u06CC\u06AF\u0627\u0646",
      "common.unit": "\u0639\u062F\u062F",
      "common.day": "\u0631\u0648\u0632",
      "common.hour": "\u0633\u0627\u0639\u062A",
      "common.minute": "\u062F\u0642\u06CC\u0642\u0647",
      "common.second": "\u062B\u0627\u0646\u06CC\u0647",
      "common.percent": "\u062F\u0631\u0635\u062F",
      "common.discount": "\u062A\u062E\u0641\u06CC\u0641",
      "common.discountCode": "\u06A9\u062F \u062A\u062E\u0641\u06CC\u0641",
      "common.shipping": "\u0647\u0632\u06CC\u0646\u0647\u200C\u06CC \u0627\u0631\u0633\u0627\u0644",
      "common.insurance": "\u0628\u06CC\u0645\u0647\u200C\u06CC \u0645\u0631\u0633\u0648\u0644\u0647",
      "common.subtotal": "\u062C\u0645\u0639 \u06A9\u0627\u0644\u0627\u0647\u0627",
      "common.payable": "\u0645\u0628\u0644\u063A \u0642\u0627\u0628\u0644 \u067E\u0631\u062F\u0627\u062E\u062A",
      "common.payment": "\u067E\u0631\u062F\u0627\u062E\u062A",
      "common.cart": "\u0633\u0628\u062F \u062E\u0631\u06CC\u062F",
      "common.wishlist": "\u0644\u06CC\u0633\u062A \u0645\u0646",
      "common.compare": "\u0645\u0642\u0627\u06CC\u0633\u0647",
      "common.profile": "\u067E\u0631\u0648\u0641\u0627\u06CC\u0644",
      "common.wallet": "\u06A9\u06CC\u0641 \u067E\u0648\u0644",
      "common.balance": "\u0645\u0648\u062C\u0648\u062F\u06CC",
      "common.transactions": "\u062A\u0631\u0627\u06A9\u0646\u0634\u200C\u0647\u0627",
      "common.deposit": "\u0634\u0627\u0631\u0698 \u06A9\u06CC\u0641 \u067E\u0648\u0644",
      "common.points": "\u0627\u0645\u062A\u06CC\u0627\u0632",
      "common.ticket": "\u062A\u06CC\u06A9\u062A",
      "common.tickets": "\u062A\u06CC\u06A9\u062A\u200C\u0647\u0627",
      "common.support": "\u067E\u0634\u062A\u06CC\u0628\u0627\u0646\u06CC",
      "common.review": "\u0646\u0638\u0631",
      "common.reviews": "\u0646\u0638\u0631\u0627\u062A",
      "common.question": "\u0633\u0624\u0627\u0644",
      "common.questions": "\u0633\u0624\u0627\u0644\u0627\u062A \u06A9\u0627\u0631\u0628\u0631\u0627\u0646",
      "common.rating": "\u0627\u0645\u062A\u06CC\u0627\u0632",
      "common.notification": "\u0627\u0639\u0644\u0627\u0646",
      "common.notifications": "\u0627\u0639\u0644\u0627\u0646\u200C\u0647\u0627",
      "common.security": "\u0627\u0645\u0646\u06CC\u062A",
      "common.history": "\u062A\u0627\u0631\u06CC\u062E\u0686\u0647",
      "common.report": "\u06AF\u0632\u0627\u0631\u0634",
      "common.bug": "\u06AF\u0632\u0627\u0631\u0634 \u062E\u0637\u0627",
      "common.suggestion": "\u067E\u06CC\u0634\u0646\u0647\u0627\u062F",
      "common.complaint": "\u0634\u06A9\u0627\u06CC\u062A",
      "common.law": "\u0642\u0648\u0627\u0646\u06CC\u0646 \u0648 \u0645\u0642\u0631\u0631\u0627\u062A",
      "common.privacy": "\u062D\u0631\u06CC\u0645 \u062E\u0635\u0648\u0635\u06CC",
      "common.about": "\u062F\u0631\u0628\u0627\u0631\u0647\u200C\u06CC \u0645\u0627",
      "common.contact": "\u062A\u0645\u0627\u0633 \u0628\u0627 \u0645\u0627",
      "common.faq": "\u0633\u0624\u0627\u0644\u0627\u062A \u0645\u062A\u062F\u0627\u0648\u0644",
      "common.guide": "\u0631\u0627\u0647\u0646\u0645\u0627\u06CC \u062E\u0631\u06CC\u062F",
      "common.services": "\u062E\u062F\u0645\u0627\u062A \u0645\u0634\u062A\u0631\u06CC\u0627\u0646",
      "common.stats": "\u0622\u0645\u0627\u0631 \u0641\u0631\u0648\u0634\u06AF\u0627\u0647",
      "common.searchProducts": "\u062C\u0633\u062A\u200C\u0648\u062C\u0648\u06CC \u06A9\u0627\u0644\u0627\u2026",
      "common.noData": "\u0645\u0648\u0631\u062F\u06CC \u0628\u0631\u0627\u06CC \u0646\u0645\u0627\u06CC\u0634 \u0648\u062C\u0648\u062F \u0646\u062F\u0627\u0631\u062F",
      "common.tryAgain": "\u062F\u0648\u0628\u0627\u0631\u0647 \u062A\u0644\u0627\u0634 \u06A9\u0646",
      "common.showMore": "\u0646\u0645\u0627\u06CC\u0634 \u0628\u06CC\u0634\u062A\u0631",
      "common.perPage": "\u062F\u0631 \u0647\u0631 \u0635\u0641\u062D\u0647",
      "skip": "\u067E\u0631\u0634 \u0628\u0647 \u0645\u062D\u062A\u0648\u0627\u06CC \u0627\u0635\u0644\u06CC",
      "boot.loading": "\u062F\u0631 \u062D\u0627\u0644 \u0628\u0627\u0631\u06AF\u0630\u0627\u0631\u06CC \u06AF\u0631\u06CC\u0646 \u0627\u067E\u0644\u2026",
      "boot.waking": "\u0633\u0631\u0648\u0631 \u0627\u0628\u0631\u06CC \u062F\u0631 \u062D\u0627\u0644 \u0628\u06CC\u062F\u0627\u0631\u0634\u062F\u0646 \u0627\u0633\u062A\u061B \u0686\u0646\u062F \u062B\u0627\u0646\u06CC\u0647\u0654 \u062F\u06CC\u06AF\u0631 \u062E\u0648\u062F\u06A9\u0627\u0631 \u062F\u0648\u0628\u0627\u0631\u0647 \u062A\u0644\u0627\u0634 \u0645\u06CC\u200C\u06A9\u0646\u06CC\u0645\u2026",
      "boot.failed": "\u0641\u0631\u0648\u0634\u06AF\u0627\u0647 \u062F\u0631 \u062F\u0633\u062A\u0631\u0633 \u0646\u06CC\u0633\u062A\u061B \u0633\u0631\u0648\u0631 \u0627\u0628\u0631\u06CC \u062E\u0648\u0627\u0628\u06CC\u062F\u0647 \u06CC\u0627 \u0634\u0628\u06A9\u0647 \u0642\u0637\u0639 \u0627\u0633\u062A.",
      "update.available": "\u0646\u0633\u062E\u0647\u0654 \u062C\u062F\u06CC\u062F \u0633\u0627\u06CC\u062A \u0622\u0645\u0627\u062F\u0647 \u0627\u0633\u062A\u061B \u0628\u0631\u0627\u06CC \u062F\u06CC\u062F\u0646 \u062A\u063A\u06CC\u06CC\u0631\u0627\u062A \u062F\u06A9\u0645\u0647 \u0631\u0627 \u0628\u0632\u0646.",
      "update.reload": "\u062A\u0627\u0632\u0647\u200C\u0633\u0627\u0632\u06CC \u0635\u0641\u062D\u0647",
      "boot.failedHint": "\u062F\u06A9\u0645\u0647\u0654 \xAB\u062A\u0644\u0627\u0634 \u062F\u0648\u0628\u0627\u0631\u0647\xBB \u0631\u0627 \u0628\u0632\u0646\u061B \u0627\u06AF\u0631 \u0628\u0627\u0632 \u0647\u0645 \u0646\u06CC\u0627\u0645\u062F\u060C \u0641\u0627\u06CC\u0644 \xAB\u0628\u06CC\u062F\u0627\u0631\u0633\u0627\u0632\xBB \u0631\u0627 \u0627\u0632 \u06AF\u0648\u0634\u06CC/\u06A9\u0627\u0645\u067E\u06CC\u0648\u062A\u0631\u062A \u0628\u0627\u0632 \u06A9\u0646 \u062A\u0627 \u0633\u0631\u0648\u0631 \u0631\u0627 \u0628\u06CC\u062F\u0627\u0631 \u06A9\u0646\u062F.",
      "topbar.fastSend": "\u0627\u0631\u0633\u0627\u0644 \u0627\u0632 \u0628\u0646\u062F\u0631 \u0628\u0648\u0634\u0647\u0631 \u0628\u0647 \u0633\u0631\u0627\u0633\u0631 \u0627\u06CC\u0631\u0627\u0646",
      "nav.home": "\u062E\u0627\u0646\u0647",
      "nav.products": "\u0647\u0645\u0647\u200C\u06CC \u0645\u062D\u0635\u0648\u0644\u0627\u062A",
      "nav.deals": "\u062A\u062E\u0641\u06CC\u0641\u200C\u0647\u0627",
      "nav.new": "\u062C\u062F\u06CC\u062F\u062A\u0631\u06CC\u0646\u200C\u0647\u0627",
      "nav.stats": "\u0622\u0645\u0627\u0631 \u0632\u0646\u062F\u0647",
      "nav.about": "\u062F\u0631\u0628\u0627\u0631\u0647\u200C\u06CC \u0645\u0627",
      "nav.contact": "\u062A\u0645\u0627\u0633 \u0628\u0627 \u0645\u0627",
      "nav.login": "\u0648\u0631\u0648\u062F",
      "nav.register": "\u062B\u0628\u062A\u200C\u0646\u0627\u0645",
      "nav.cart": "\u0633\u0628\u062F \u062E\u0631\u06CC\u062F",
      "nav.wishlist": "\u0644\u06CC\u0633\u062A \u0645\u0646",
      "nav.notifications": "\u0627\u0639\u0644\u0627\u0646\u200C\u0647\u0627",
      "nav.menu": "\u0645\u0646\u0648",
      "nav.account": "\u062D\u0633\u0627\u0628 \u06A9\u0627\u0631\u0628\u0631\u06CC",
      "nav.admin": "\u067E\u0646\u0644 \u0645\u062F\u06CC\u0631\u06CC\u062A",
      "nav.allCategories": "\u0647\u0645\u0647\u200C\u06CC \u062F\u0633\u062A\u0647\u200C\u0647\u0627",
      "theme.toggle": "\u062A\u063A\u06CC\u06CC\u0631 \u067E\u0648\u0633\u062A\u0647 (\u0631\u0648\u0634\u0646/\u062A\u0627\u0631\u06CC\u06A9)",
      "theme.dark": "\u062D\u0627\u0644\u062A \u062A\u0627\u0631\u06CC\u06A9",
      "theme.light": "\u062D\u0627\u0644\u062A \u0631\u0648\u0634\u0646",
      "theme.auto": "\u0647\u0645\u0627\u0647\u0646\u06AF \u0628\u0627 \u0633\u06CC\u0633\u062A\u0645",
      "search.placeholder": "\u062C\u0633\u062A\u200C\u0648\u062C\u0648\u06CC \u06A9\u0627\u0644\u0627\u060C \u0628\u0631\u0646\u062F \u06CC\u0627 \u062F\u0633\u062A\u0647\u2026",
      "search.go": "\u062C\u0633\u062A\u200C\u0648\u062C\u0648",
      "search.voice": "\u062C\u0633\u062A\u200C\u0648\u062C\u0648\u06CC \u0635\u0648\u062A\u06CC",
      "search.byImage": "\u062C\u0633\u062A\u200C\u0648\u062C\u0648 \u0628\u0627 \u0639\u06A9\u0633",
      "search.listening": "\u062F\u0631 \u062D\u0627\u0644 \u06AF\u0648\u0634 \u062F\u0627\u062F\u0646\u2026 \u062D\u0631\u0641 \u0628\u0632\u0646",
      "search.noVoice": "\u0645\u0631\u0648\u0631\u06AF\u0631 \u0634\u0645\u0627 \u0627\u0632 \u062C\u0633\u062A\u200C\u0648\u062C\u0648\u06CC \u0635\u0648\u062A\u06CC \u067E\u0634\u062A\u06CC\u0628\u0627\u0646\u06CC \u0646\u0645\u06CC\u200C\u06A9\u0646\u062F.",
      "search.micDenied": "\u062F\u0633\u062A\u0631\u0633\u06CC \u0645\u06CC\u06A9\u0631\u0648\u0641\u0646 \u0628\u0633\u062A\u0647 \u0627\u0633\u062A. \u0627\u0632 \u062A\u0646\u0638\u06CC\u0645\u0627\u062A \u0645\u0631\u0648\u0631\u06AF\u0631\u060C \u0627\u062C\u0627\u0632\u0647\u0654 \u0645\u06CC\u06A9\u0631\u0648\u0641\u0646 \u0631\u0627 \u0628\u0631\u0627\u06CC \u0633\u0627\u06CC\u062A \u0641\u0639\u0627\u0644 \u06A9\u0646.",
      "search.voiceNetwork": "\u0633\u0631\u0648\u06CC\u0633 \u062A\u0634\u062E\u06CC\u0635 \u06AF\u0641\u062A\u0627\u0631 \u062F\u0631 \u062F\u0633\u062A\u0631\u0633 \u0646\u06CC\u0633\u062A\u061B \u0627\u06CC\u0646\u062A\u0631\u0646\u062A \u06CC\u0627 \u0641\u06CC\u0644\u062A\u0631\u0634\u06A9\u0646 \u0631\u0627 \u0628\u0631\u0631\u0633\u06CC \u06A9\u0646.",
      "search.noSpeech": "\u0686\u06CC\u0632\u06CC \u0646\u0634\u0646\u06CC\u062F\u0645\u061B \u062F\u0648\u0628\u0627\u0631\u0647 \u062A\u0644\u0627\u0634 \u06A9\u0646 \u0648 \u0634\u0645\u0631\u062F\u0647 \u062D\u0631\u0641 \u0628\u0632\u0646.",
      "search.noMic": "\u0645\u06CC\u06A9\u0631\u0648\u0641\u0646\u06CC \u0631\u0648\u06CC \u0627\u06CC\u0646 \u062F\u0633\u062A\u06AF\u0627\u0647 \u067E\u06CC\u062F\u0627 \u0646\u0634\u062F.",
      "pwd.show": "\u0646\u0645\u0627\u06CC\u0634 \u0631\u0645\u0632 \u0639\u0628\u0648\u0631",
      "pwd.hide": "\u067E\u0646\u0647\u0627\u0646 \u06A9\u0631\u062F\u0646 \u0631\u0645\u0632 \u0639\u0628\u0648\u0631",
      "search.suggestions": "\u067E\u06CC\u0634\u0646\u0647\u0627\u062F\u0647\u0627",
      "search.trending": "\u067E\u0631\u062C\u0633\u062A\u200C\u0648\u062C\u0648\u0647\u0627",
      "search.recent": "\u062C\u0633\u062A\u200C\u0648\u062C\u0648\u0647\u0627\u06CC \u0627\u062E\u06CC\u0631 \u0634\u0645\u0627",
      "search.resultsFor": "\u0646\u062A\u0627\u06CC\u062C \u062C\u0633\u062A\u200C\u0648\u062C\u0648 \u0628\u0631\u0627\u06CC",
      "search.inProducts": "\u062F\u0631 \u0645\u062D\u0635\u0648\u0644\u0627\u062A",
      "search.inCategories": "\u062F\u0633\u062A\u0647\u200C\u0647\u0627",
      "search.inBrands": "\u0628\u0631\u0646\u062F\u0647\u0627",
      "search.inPages": "\u0635\u0641\u062D\u0647\u200C\u0647\u0627",
      "search.didYouMean": "\u0645\u0646\u0638\u0648\u0631\u062A \u0627\u06CC\u0646 \u0628\u0648\u062F\u061F",
      "search.noResultTitle": "\u0686\u06CC\u0632\u06CC \u067E\u06CC\u062F\u0627 \u0646\u06A9\u0631\u062F\u06CC\u0645",
      "search.noResultText": "\u0639\u0628\u0627\u0631\u062A \u062F\u06CC\u06AF\u0631\u06CC \u0631\u0627 \u0627\u0645\u062A\u062D\u0627\u0646 \u06A9\u0646 \u06CC\u0627 \u0627\u0632 \u0641\u06CC\u0644\u062A\u0631\u0647\u0627 \u0627\u0633\u062A\u0641\u0627\u062F\u0647 \u06A9\u0646. \u0627\u06AF\u0631 \u06A9\u0627\u0644\u0627\u06CC \u062E\u0627\u0635\u06CC \u0645\u06CC\u200C\u062E\u0648\u0627\u0647\u06CC\u060C \u0628\u0627 \u067E\u0634\u062A\u06CC\u0628\u0627\u0646\u06CC \u0628\u06AF\u0648 \u062A\u0627 \u0628\u0631\u0627\u06CC\u062A \u062A\u0647\u06CC\u0647 \u06A9\u0646\u06CC\u0645.",
      "search.imageTitle": "\u062C\u0633\u062A\u200C\u0648\u062C\u0648 \u0628\u0627 \u0639\u06A9\u0633",
      "search.imageText": "\u0639\u06A9\u0633 \u06A9\u0627\u0644\u0627 \u0631\u0627 \u0628\u0627\u0631\u06AF\u0630\u0627\u0631\u06CC \u06A9\u0646 \u062A\u0627 \u0645\u0634\u0627\u0628\u0647 \u0622\u0646 \u0631\u0627 \u062F\u0631 \u0641\u0631\u0648\u0634\u06AF\u0627\u0647 \u067E\u06CC\u062F\u0627 \u06A9\u0646\u06CC\u0645.",
      "search.imageHint": "\u0641\u0631\u0645\u062A JPG \u06CC\u0627 PNG\u060C \u062D\u062F\u0627\u06A9\u062B\u0631 \u06F4 \u0645\u06AF\u0627\u0628\u0627\u06CC\u062A",
      "search.imageIndexing": "\u062F\u0631 \u062D\u0627\u0644 \u0622\u0645\u0627\u062F\u0647\u200C\u0633\u0627\u0632\u06CC \u0645\u0648\u062A\u0648\u0631 \u062C\u0633\u062A\u200C\u0648\u062C\u0648\u06CC \u062A\u0635\u0648\u06CC\u0631\u06CC\u2026",
      "search.imageNoIndex": "\u062A\u0635\u0627\u0648\u06CC\u0631 \u0645\u062D\u0635\u0648\u0644\u0627\u062A \u0647\u0646\u0648\u0632 \u0627\u06CC\u0646\u062F\u06A9\u0633 \u0646\u0634\u062F\u0647\u200C\u0627\u0646\u062F. \u0645\u062F\u06CC\u0631 \u0633\u0627\u06CC\u062A \u0627\u0632 \u067E\u0646\u0644 \u0645\u062F\u06CC\u0631\u06CC\u062A \u2190 \u062C\u0633\u062A\u200C\u0648\u062C\u0648\u06CC \u062A\u0635\u0648\u06CC\u0631\u06CC \u0645\u06CC\u200C\u062A\u0648\u0627\u0646\u062F \u0627\u06CC\u0646\u062F\u06A9\u0633 \u0631\u0627 \u0628\u0633\u0627\u0632\u062F.",
      "search.imageNoMatch": "\u06A9\u0627\u0644\u0627\u06CC \u0645\u0634\u0627\u0628\u0647\u06CC \u0628\u0627 \u0627\u06CC\u0646 \u0639\u06A9\u0633 \u067E\u06CC\u062F\u0627 \u0646\u0634\u062F. \u0645\u06CC\u200C\u062A\u0648\u0627\u0646\u06CC \u0646\u0627\u0645 \u06A9\u0627\u0644\u0627 \u0631\u0627 \u062C\u0633\u062A\u200C\u0648\u062C\u0648 \u06A9\u0646\u06CC.",
      "search.dropHere": "\u0639\u06A9\u0633 \u0631\u0627 \u0627\u06CC\u0646\u062C\u0627 \u0631\u0647\u0627 \u06A9\u0646",
      "search.pickFile": "\u0627\u0646\u062A\u062E\u0627\u0628 \u0639\u06A9\u0633",
      "search.takePhoto": "\u06AF\u0631\u0641\u062A\u0646 \u0639\u06A9\u0633 \u0628\u0627 \u062F\u0648\u0631\u0628\u06CC\u0646",
      "mnav.home": "\u062E\u0627\u0646\u0647",
      "mnav.products": "\u062F\u0633\u062A\u0647\u200C\u0647\u0627",
      "mnav.search": "\u062C\u0633\u062A\u200C\u0648\u062C\u0648",
      "mnav.cart": "\u0633\u0628\u062F",
      "mnav.me": "\u062D\u0633\u0627\u0628 \u0645\u0646",
      "footer.shopping": "\u062E\u0631\u06CC\u062F",
      "footer.allProducts": "\u0647\u0645\u0647\u200C\u06CC \u0645\u062D\u0635\u0648\u0644\u0627\u062A",
      "footer.deals": "\u062A\u062E\u0641\u06CC\u0641\u200C\u0647\u0627 \u0648 \u067E\u06CC\u0634\u0646\u0647\u0627\u062F\u0647\u0627",
      "footer.inStock": "\u06A9\u0627\u0644\u0627\u0647\u0627\u06CC \u0645\u0648\u062C\u0648\u062F",
      "footer.searchByImage": "\u062C\u0633\u062A\u200C\u0648\u062C\u0648\u06CC \u062A\u0635\u0648\u06CC\u0631\u06CC",
      "footer.myList": "\u0644\u06CC\u0633\u062A \u0645\u0646",
      "footer.stats": "\u0622\u0645\u0627\u0631 \u0641\u0631\u0648\u0634\u06AF\u0627\u0647",
      "footer.services": "\u062E\u062F\u0645\u0627\u062A \u0645\u0634\u062A\u0631\u06CC\u0627\u0646",
      "footer.guide": "\u0631\u0627\u0647\u0646\u0645\u0627\u06CC \u062E\u0631\u06CC\u062F",
      "footer.service": "\u062E\u062F\u0645\u0627\u062A \u0645\u0634\u062A\u0631\u06CC\u0627\u0646",
      "footer.faq": "\u0633\u0624\u0627\u0644\u0627\u062A \u0645\u062A\u062F\u0627\u0648\u0644",
      "footer.insurance": "\u0628\u06CC\u0645\u0647\u200C\u06CC \u0645\u0631\u0633\u0648\u0644\u0647",
      "footer.plus": "\u0627\u0634\u062A\u0631\u0627\u06A9 \u067E\u0644\u0627\u0633",
      "footer.tickets": "\u062A\u06CC\u06A9\u062A \u067E\u0634\u062A\u06CC\u0628\u0627\u0646\u06CC",
      "footer.about": "\u062F\u0631\u0628\u0627\u0631\u0647 \u0648 \u0642\u0648\u0627\u0646\u06CC\u0646",
      "footer.aboutUs": "\u062F\u0631\u0628\u0627\u0631\u0647\u200C\u06CC \u0645\u0627",
      "footer.terms": "\u0642\u0648\u0627\u0646\u06CC\u0646 \u0648 \u0645\u0642\u0631\u0631\u0627\u062A",
      "footer.privacy": "\u062D\u0631\u06CC\u0645 \u062E\u0635\u0648\u0635\u06CC",
      "footer.bug": "\u06AF\u0632\u0627\u0631\u0634 \u062E\u0637\u0627",
      "footer.contact": "\u062A\u0645\u0627\u0633 \u0628\u0627 \u0645\u0627",
      "footer.suggest": "\u067E\u06CC\u0634\u0646\u0647\u0627\u062F\u0647\u0627 \u0648 \u0634\u06A9\u0627\u06CC\u0627\u062A",
      "footer.contactUs": "\u0631\u0627\u0647\u200C\u0647\u0627\u06CC \u0627\u0631\u062A\u0628\u0627\u0637\u06CC",
      "footer.install": "\u0646\u0635\u0628 \u0627\u067E\u0644\u06CC\u06A9\u06CC\u0634\u0646",
      "footer.support": "\u067E\u0634\u062A\u06CC\u0628\u0627\u0646\u06CC \u0622\u0646\u0644\u0627\u06CC\u0646",
      "footer.rights": "\u0647\u0645\u0647\u200C\u06CC \u062D\u0642\u0648\u0642 \u0645\u062D\u0641\u0648\u0638 \u0627\u0633\u062A.",
      "footer.workingHours": "\u0633\u0627\u0639\u062A \u06A9\u0627\u0631\u06CC",
      "home.heroKicker": "\u0627\u0632 \u0628\u0646\u062F\u0631 \u0628\u0648\u0634\u0647\u0631\u060C \u0628\u0627 \u0636\u0645\u0627\u0646\u062A \u0627\u0635\u0627\u0644\u062A",
      "home.heroTitle": "\u0644\u0648\u0627\u0632\u0645 \u062C\u0627\u0646\u0628\u06CC \u0645\u0648\u0628\u0627\u06CC\u0644 \u0648 \u06AF\u062C\u062A\u060C \u0628\u0627 \u0642\u06CC\u0645\u062A \u0628\u0646\u062F\u0631\u06CC",
      "home.heroText": "\u06A9\u0627\u0628\u0644\u060C \u0634\u0627\u0631\u0698\u0631\u060C \u0642\u0627\u0628 \u0648 \u06AF\u0644\u0633 \u0622\u06CC\u0641\u0648\u0646 \u0648 \u0633\u0627\u0645\u0633\u0648\u0646\u06AF\u060C \u067E\u0627\u0648\u0631\u0628\u0627\u0646\u06A9\u060C \u0647\u0646\u062F\u0632\u0641\u0631\u06CC\u060C \u0627\u0633\u067E\u06CC\u06A9\u0631\u060C \u0633\u0627\u0639\u062A \u0648 \u0639\u06CC\u0646\u06A9 \u0647\u0648\u0634\u0645\u0646\u062F \u0648 \u0647\u0631 \u0686\u06CC\u0632\u06CC \u06A9\u0647 \u0628\u0631\u0627\u06CC \u06AF\u0648\u0634\u06CC \u0648 \u062A\u0648\u0644\u06CC\u062F \u0645\u062D\u062A\u0648\u0627 \u0644\u0627\u0632\u0645 \u062F\u0627\u0631\u06CC \u2014 \u0647\u0645\u0647 \u062F\u0631 \u06CC\u06A9 \u0645\u063A\u0627\u0632\u0647\u200C\u06CC \u06A9\u0648\u0686\u06A9 \u06A9\u0646\u0627\u0631 \u062E\u0644\u06CC\u062C \u0641\u0627\u0631\u0633.",
      "home.ctaShop": "\u0634\u0631\u0648\u0639 \u062E\u0631\u06CC\u062F",
      "home.ctaDeals": "\u062A\u062E\u0641\u06CC\u0641\u200C\u0647\u0627\u06CC \u0627\u0645\u0631\u0648\u0632",
      "home.point1": "\u0636\u0645\u0627\u0646\u062A \u0627\u0635\u0627\u0644\u062A \u06A9\u0627\u0644\u0627",
      "home.point2": "\u06F7 \u0631\u0648\u0632 \u0645\u0647\u0644\u062A \u0627\u0646\u0635\u0631\u0627\u0641",
      "home.point3": "\u0627\u0631\u0633\u0627\u0644 \u0628\u0647 \u0633\u0631\u0627\u0633\u0631 \u0627\u06CC\u0631\u0627\u0646",
      "home.point4": "\u062A\u062D\u0648\u06CC\u0644 \u062D\u0636\u0648\u0631\u06CC \u0631\u0627\u06CC\u06AF\u0627\u0646",
      "home.point5": "\u062A\u0636\u0645\u06CC\u0646 \u0628\u0647\u062A\u0631\u06CC\u0646 \u0642\u06CC\u0645\u062A",
      "home.categories": "\u062F\u0633\u062A\u0647\u200C\u0628\u0646\u062F\u06CC\u200C\u0647\u0627",
      "home.categoriesSub": "\u0627\u0632 \u06A9\u0627\u0628\u0644 \u0648 \u0642\u0627\u0628 \u062A\u0627 \u06AF\u062C\u062A\u200C\u0647\u0627\u06CC \u067E\u0648\u0634\u06CC\u062F\u0646\u06CC",
      "home.featured": "\u067E\u06CC\u0634\u0646\u0647\u0627\u062F \u0648\u06CC\u0698\u0647",
      "home.featuredSub": "\u06A9\u0627\u0644\u0627\u0647\u0627\u06CC\u06CC \u06A9\u0647 \u062E\u0648\u062F\u0645\u0627\u0646 \u0627\u0633\u062A\u0641\u0627\u062F\u0647 \u0645\u06CC\u200C\u06A9\u0646\u06CC\u0645 \u0648 \u067E\u06CC\u0634\u0646\u0647\u0627\u062F \u0645\u06CC\u200C\u062F\u0647\u06CC\u0645",
      "home.bestSellers": "\u067E\u0631\u0641\u0631\u0648\u0634\u200C\u062A\u0631\u06CC\u0646\u200C\u0647\u0627",
      "home.bestSellersSub": "\u0627\u0646\u062A\u062E\u0627\u0628 \u0645\u0634\u062A\u0631\u06CC\u0627\u0646 \u06AF\u0631\u06CC\u0646 \u0627\u067E\u0644",
      "home.newArrivals": "\u062A\u0627\u0632\u0647\u200C\u0647\u0627\u06CC \u0641\u0631\u0648\u0634\u06AF\u0627\u0647",
      "home.newArrivalsSub": "\u0622\u062E\u0631\u06CC\u0646 \u06A9\u0627\u0644\u0627\u0647\u0627\u06CC\u06CC \u06A9\u0647 \u0628\u0647 \u0642\u0641\u0633\u0647 \u0627\u0636\u0627\u0641\u0647 \u0634\u062F\u0647",
      "home.deals": "\u062A\u062E\u0641\u06CC\u0641\u200C\u0647\u0627\u06CC \u0641\u0639\u0627\u0644",
      "home.dealsSub": "\u0641\u0631\u0635\u062A \u0645\u062D\u062F\u0648\u062F \u0628\u0627 \u0642\u06CC\u0645\u062A \u0628\u0647\u062A\u0631",
      "home.brands": "\u0628\u0631\u0646\u062F\u0647\u0627\u06CC \u0645\u0648\u062C\u0648\u062F",
      "home.whyUs": "\u0686\u0631\u0627 \u06AF\u0631\u06CC\u0646 \u0627\u067E\u0644\u061F",
      "home.whyUsSub": "\u0686\u06CC\u0632\u0647\u0627\u06CC\u06CC \u06A9\u0647 \u0645\u0627 \u0631\u0627 \u0627\u0632 \u0628\u0642\u06CC\u0647 \u062C\u062F\u0627 \u0645\u06CC\u200C\u06A9\u0646\u062F",
      "home.reviews": "\u0646\u0638\u0631 \u0645\u0634\u062A\u0631\u06CC\u0627\u0646",
      "home.reviewsSub": "\u062A\u062C\u0631\u0628\u0647\u200C\u06CC \u0648\u0627\u0642\u0639\u06CC \u062E\u0631\u06CC\u062F\u0627\u0631\u0627\u0646",
      "home.visitStore": "\u0628\u0627\u0632\u062F\u06CC\u062F \u0627\u0632 \u0641\u0631\u0648\u0634\u06AF\u0627\u0647",
      "home.visitStoreText": "\u06A9\u0646\u0627\u0631 \u0627\u0633\u06A9\u0644\u0647\u200C\u06CC \u0628\u0648\u0634\u0647\u0631\u060C \u067E\u0627\u0633\u0627\u0698 \u0645\u0631\u0648\u0627\u0631\u06CC\u062F \u062E\u0644\u06CC\u062C \u2014 \u0646\u0635\u0628 \u0631\u0627\u06CC\u06AF\u0627\u0646 \u06AF\u0644\u0633 \u0648 \u0645\u0634\u0627\u0648\u0631\u0647\u200C\u06CC \u062D\u0636\u0648\u0631\u06CC",
      "home.openMap": "\u062F\u06CC\u062F\u0646 \u06A9\u0631\u0648\u06A9\u06CC \u0648 \u0646\u0642\u0634\u0647",
      "home.statsTitle": "\u0641\u0631\u0648\u0634\u06AF\u0627\u0647 \u062F\u0631 \u06CC\u06A9 \u0646\u06AF\u0627\u0647",
      "home.plusTitle": "\u0627\u0634\u062A\u0631\u0627\u06A9 \u067E\u0644\u0627\u0633 \u06AF\u0631\u06CC\u0646 \u0627\u067E\u0644",
      "home.plusText": "\u0628\u0627 \u067E\u0631\u062F\u0627\u062E\u062A \u0645\u0627\u0647\u0627\u0646\u0647\u060C \u0627\u0631\u0633\u0627\u0644 \u0647\u0645\u0647\u200C\u06CC \u0633\u0641\u0627\u0631\u0634\u200C\u0647\u0627 \u0631\u0627\u06CC\u06AF\u0627\u0646\u060C \u0645\u0631\u0633\u0648\u0644\u0647\u200C\u0647\u0627 \u062E\u0648\u062F\u06A9\u0627\u0631 \u0628\u06CC\u0645\u0647 \u0648 \u06F3\u066A \u062A\u062E\u0641\u06CC\u0641 \u062F\u0627\u0626\u0645\u06CC \u0645\u06CC\u200C\u06AF\u06CC\u0631\u06CC.",
      "home.plusCta": "\u062F\u06CC\u062F\u0646 \u0645\u0632\u0627\u06CC\u0627\u06CC \u067E\u0644\u0627\u0633",
      "home.appTitle": "\u0627\u067E\u0644\u06CC\u06A9\u06CC\u0634\u0646 \u06AF\u0631\u06CC\u0646 \u0627\u067E\u0644",
      "home.appText": "\u0647\u0645\u06CC\u0646 \u0633\u0627\u06CC\u062A \u06CC\u06A9 \u0627\u067E\u0644\u06CC\u06A9\u06CC\u0634\u0646 \u0646\u0635\u0628\u200C\u0634\u062F\u0646\u06CC (PWA) \u0627\u0633\u062A: \u0631\u0648\u06CC \u0627\u0646\u062F\u0631\u0648\u06CC\u062F\u060C \u0622\u06CC\u0641\u0648\u0646\u060C \u0648\u06CC\u0646\u062F\u0648\u0632\u060C \u0645\u06A9 \u0648 \u0644\u06CC\u0646\u0648\u06A9\u0633 \u0646\u0635\u0628 \u0645\u06CC\u200C\u0634\u0648\u062F \u0648 \u0628\u0647\u200C\u0635\u0648\u0631\u062A \u0622\u0641\u0644\u0627\u06CC\u0646 \u0647\u0645 \u06A9\u0627\u0631 \u0645\u06CC\u200C\u06A9\u0646\u062F.",
      "home.installCta": "\u0646\u0635\u0628 \u0631\u0648\u06CC \u062F\u0633\u062A\u06AF\u0627\u0647 \u0645\u0646",
      "home.appInstalled": "\u0627\u067E\u0644\u06CC\u06A9\u06CC\u0634\u0646 \u0646\u0635\u0628 \u0634\u062F\u0647 \u0627\u0633\u062A",
      "home.liveStats": "\u0622\u0645\u0627\u0631 \u0632\u0646\u062F\u0647\u200C\u06CC \u0641\u0631\u0648\u0634\u06AF\u0627\u0647",
      "home.newsletter": "\u0627\u0632 \u062A\u062E\u0641\u06CC\u0641\u200C\u0647\u0627 \u0628\u0627\u062E\u0628\u0631 \u0634\u0648",
      "home.newsletterText": "\u0634\u0645\u0627\u0631\u0647\u200C\u06CC \u0645\u0648\u0628\u0627\u06CC\u0644\u062A \u0631\u0627 \u0628\u062F\u0647 \u062A\u0627 \u0641\u0642\u0637 \u0628\u0631\u0627\u06CC \u062A\u062E\u0641\u06CC\u0641\u200C\u0647\u0627\u06CC \u0645\u0647\u0645 \u0648 \u0645\u0648\u062C\u0648\u062F \u0634\u062F\u0646 \u06A9\u0627\u0644\u0627\u0647\u0627\u06CC \u0644\u06CC\u0633\u062A\u062A \u067E\u06CC\u0627\u0645 \u0628\u0641\u0631\u0633\u062A\u06CC\u0645.",
      "home.subscribe": "\u0639\u0636\u0648\u06CC\u062A",
      "stats.products": "\u06A9\u0627\u0644\u0627\u06CC \u0641\u0639\u0627\u0644",
      "stats.ordersTotal": "\u06A9\u0644 \u0633\u0641\u0627\u0631\u0634\u200C\u0647\u0627",
      "stats.ordersToday": "\u0633\u0641\u0627\u0631\u0634 \u0627\u0645\u0631\u0648\u0632",
      "stats.visitsToday": "\u0628\u0627\u0632\u062F\u06CC\u062F \u0627\u0645\u0631\u0648\u0632",
      "stats.visitsTotal": "\u06A9\u0644 \u0628\u0627\u0632\u062F\u06CC\u062F\u0647\u0627",
      "stats.pendingOrders": "\u0633\u0641\u0627\u0631\u0634 \u062F\u0631 \u062D\u0627\u0644 \u0628\u0631\u0631\u0633\u06CC",
      "stats.delivered": "\u062A\u062D\u0648\u06CC\u0644 \u0645\u0648\u0641\u0642",
      "stats.customers": "\u0645\u0634\u062A\u0631\u06CC \u062B\u0628\u062A\u200C\u0646\u0627\u0645\u200C\u0634\u062F\u0647",
      "stats.plusMembers": "\u0639\u0636\u0648 \u067E\u0644\u0627\u0633",
      "stats.categories": "\u062F\u0633\u062A\u0647\u200C\u0628\u0646\u062F\u06CC",
      "stats.brands": "\u0628\u0631\u0646\u062F",
      "stats.outOfStock": "\u06A9\u0627\u0644\u0627\u06CC \u0646\u0627\u0645\u0648\u062C\u0648\u062F",
      "stats.years": "\u0633\u0627\u0644 \u0641\u0639\u0627\u0644\u06CC\u062A",
      "stats.title": "\u0622\u0645\u0627\u0631 \u0639\u0645\u0648\u0645\u06CC \u0641\u0631\u0648\u0634\u06AF\u0627\u0647",
      "stats.sub": "\u0627\u06CC\u0646 \u0622\u0645\u0627\u0631 \u0628\u0647\u200C\u0635\u0648\u0631\u062A \u0632\u0646\u062F\u0647 \u0627\u0632 \u062F\u0627\u062F\u0647\u200C\u0647\u0627\u06CC \u0648\u0627\u0642\u0639\u06CC \u0633\u0627\u06CC\u062A \u06AF\u0631\u0641\u062A\u0647 \u0645\u06CC\u200C\u0634\u0648\u062F.",
      "stats.chartTitle": "\u0628\u0627\u0632\u062F\u06CC\u062F \u06F1\u06F4 \u0631\u0648\u0632 \u0627\u062E\u06CC\u0631",
      "stats.topProducts": "\u067E\u0631\u0641\u0631\u0648\u0634\u200C\u062A\u0631\u06CC\u0646 \u06A9\u0627\u0644\u0627\u0647\u0627",
      "stats.transparency": "\u0634\u0641\u0627\u0641\u06CC\u062A \u0628\u0631\u0627\u06CC \u0645\u0634\u062A\u0631\u06CC",
      "stats.transparencyText": "\u0645\u0627 \u0645\u0648\u062C\u0648\u062F\u06CC \u0648 \u0642\u06CC\u0645\u062A \u0648\u0627\u0642\u0639\u06CC \u0631\u0627 \u0646\u0645\u0627\u06CC\u0634 \u0645\u06CC\u200C\u062F\u0647\u06CC\u0645 \u0648 \u0622\u0645\u0627\u0631 \u0641\u0631\u0648\u0634\u06AF\u0627\u0647 \u0631\u0627 \u0647\u0645 \u067E\u0646\u0647\u0627\u0646 \u0646\u0645\u06CC\u200C\u06A9\u0646\u06CC\u0645.",
      "catalog.title": "\u0645\u062D\u0635\u0648\u0644\u0627\u062A",
      "catalog.filters": "\u0641\u06CC\u0644\u062A\u0631\u0647\u0627",
      "catalog.showFilters": "\u0646\u0645\u0627\u06CC\u0634 \u0641\u06CC\u0644\u062A\u0631\u0647\u0627",
      "catalog.hideFilters": "\u0628\u0633\u062A\u0646 \u0641\u06CC\u0644\u062A\u0631\u0647\u0627",
      "catalog.sort.relevant": "\u0645\u0631\u062A\u0628\u0637\u200C\u062A\u0631\u06CC\u0646",
      "catalog.sort.newest": "\u062C\u062F\u06CC\u062F\u062A\u0631\u06CC\u0646",
      "catalog.sort.oldest": "\u0642\u062F\u06CC\u0645\u06CC\u200C\u062A\u0631\u06CC\u0646",
      "catalog.sort.cheapest": "\u0627\u0631\u0632\u0627\u0646\u200C\u062A\u0631\u06CC\u0646",
      "catalog.sort.dearest": "\u06AF\u0631\u0627\u0646\u200C\u062A\u0631\u06CC\u0646",
      "catalog.sort.popular": "\u067E\u0631\u0641\u0631\u0648\u0634\u200C\u062A\u0631\u06CC\u0646",
      "catalog.sort.rating": "\u0628\u06CC\u0634\u062A\u0631\u06CC\u0646 \u0627\u0645\u062A\u06CC\u0627\u0632",
      "catalog.sort.discount": "\u0628\u06CC\u0634\u062A\u0631\u06CC\u0646 \u062A\u062E\u0641\u06CC\u0641",
      "catalog.sort.name": "\u062D\u0631\u0648\u0641 \u0627\u0644\u0641\u0628\u0627",
      "catalog.f.category": "\u062F\u0633\u062A\u0647\u200C\u0628\u0646\u062F\u06CC",
      "catalog.f.brand": "\u0628\u0631\u0646\u062F",
      "catalog.f.price": "\u0645\u062D\u062F\u0648\u062F\u0647\u200C\u06CC \u0642\u06CC\u0645\u062A",
      "catalog.f.availability": "\u0645\u0648\u062C\u0648\u062F\u06CC",
      "catalog.f.inStock": "\u0641\u0642\u0637 \u06A9\u0627\u0644\u0627\u0647\u0627\u06CC \u0645\u0648\u062C\u0648\u062F",
      "catalog.f.discountOnly": "\u0641\u0642\u0637 \u062A\u062E\u0641\u06CC\u0641\u200C\u062F\u0627\u0631",
      "catalog.f.rating": "\u062D\u062F\u0627\u0642\u0644 \u0627\u0645\u062A\u06CC\u0627\u0632",
      "catalog.f.authenticity": "\u0627\u0635\u0627\u0644\u062A \u06A9\u0627\u0644\u0627",
      "catalog.f.clear": "\u062D\u0630\u0641 \u0647\u0645\u0647\u200C\u06CC \u0641\u06CC\u0644\u062A\u0631\u0647\u0627",
      "catalog.count": "\u06A9\u0627\u0644\u0627",
      "catalog.viewGrid": "\u0646\u0645\u0627\u06CC\u0634 \u0634\u0628\u06A9\u0647\u200C\u0627\u06CC",
      "catalog.viewList": "\u0646\u0645\u0627\u06CC\u0634 \u0641\u0647\u0631\u0633\u062A\u06CC",
      "auth.original": "\u0627\u0635\u0644 (\u0627\u0648\u0631\u062C\u06CC\u0646\u0627\u0644)",
      "auth.highcopy": "\u0647\u0627\u06CC\u200C\u06A9\u067E\u06CC \u062F\u0631\u062C\u0647 \u06CC\u06A9",
      "auth.generic": "\u0645\u062A\u0641\u0631\u0642\u0647",
      "card.addToCart": "\u0627\u0641\u0632\u0648\u062F\u0646 \u0628\u0647 \u0633\u0628\u062F",
      "card.added": "\u0628\u0647 \u0633\u0628\u062F \u0627\u0636\u0627\u0641\u0647 \u0634\u062F",
      "card.quickView": "\u0645\u0634\u0627\u0647\u062F\u0647\u200C\u06CC \u0633\u0631\u06CC\u0639",
      "card.wishlistAdd": "\u0627\u0641\u0632\u0648\u062F\u0646 \u0628\u0647 \u0644\u06CC\u0633\u062A \u0645\u0646",
      "card.wishlistRemove": "\u062D\u0630\u0641 \u0627\u0632 \u0644\u06CC\u0633\u062A \u0645\u0646",
      "card.compareAdd": "\u0627\u0641\u0632\u0648\u062F\u0646 \u0628\u0647 \u0645\u0642\u0627\u06CC\u0633\u0647",
      "card.outOfStock": "\u0646\u0627\u0645\u0648\u062C\u0648\u062F",
      "card.soldOut": "\u062A\u0645\u0627\u0645 \u0634\u062F",
      "pdp.addToCart": "\u0627\u0641\u0632\u0648\u062F\u0646 \u0628\u0647 \u0633\u0628\u062F \u062E\u0631\u06CC\u062F",
      "pdp.buyNow": "\u062E\u0631\u06CC\u062F \u0641\u0648\u0631\u06CC",
      "pdp.pickup": "\u062A\u062D\u0648\u06CC\u0644 \u062D\u0636\u0648\u0631\u06CC \u0631\u0627\u06CC\u06AF\u0627\u0646 \u062F\u0631 \u0645\u063A\u0627\u0632\u0647",
      "pdp.warranty": "\u06AF\u0627\u0631\u0627\u0646\u062A\u06CC",
      "pdp.warrantyMonths": "{n} \u0645\u0627\u0647 \u06AF\u0627\u0631\u0627\u0646\u062A\u06CC \u062A\u0639\u0648\u06CC\u0636 \u0641\u0631\u0648\u0634\u06AF\u0627\u0647",
      "pdp.noWarranty": "\u0628\u062F\u0648\u0646 \u06AF\u0627\u0631\u0627\u0646\u062A\u06CC",
      "pdp.sku": "\u06A9\u062F \u06A9\u0627\u0644\u0627",
      "pdp.barcode": "\u0628\u0627\u0631\u06A9\u062F",
      "pdp.weight": "\u0648\u0632\u0646",
      "pdp.gram": "\u06AF\u0631\u0645",
      "pdp.zoomIn": "\u0628\u0632\u0631\u06AF\u200C\u0646\u0645\u0627\u06CC\u06CC",
      "pdp.zoomOut": "\u06A9\u0648\u0686\u06A9\u200C\u0646\u0645\u0627\u06CC\u06CC",
      "pdp.zoomReset": "\u0627\u0646\u062F\u0627\u0632\u0647\u0654 \u0627\u0635\u0644\u06CC",
      "pdp.zoomHint": "\u0630\u0631\u0647\u200C\u0628\u06CC\u0646: \u0645\u0648\u0633 \u0631\u0627 \u0631\u0648\u06CC \u062A\u0635\u0648\u06CC\u0631 \u0628\u0628\u0631\u061B \u0628\u0632\u0631\u06AF\u200C\u0646\u0645\u0627\u06CC\u06CC \u06A9\u0627\u0645\u0644: \u06A9\u0644\u06CC\u06A9 \u06CC\u0627 \u062F\u0648\u0636\u0631\u0628\u0647",
      "pdp.video": "\u0648\u06CC\u062F\u06CC\u0648",
      "pdp.share": "\u0627\u0634\u062A\u0631\u0627\u06A9\u200C\u06AF\u0630\u0627\u0631\u06CC",
      "pdp.specs": "\u0645\u0634\u062E\u0635\u0627\u062A \u0641\u0646\u06CC",
      "pdp.description": "\u062A\u0648\u0636\u06CC\u062D\u0627\u062A",
      "pdp.reviews": "\u0646\u0638\u0631\u0627\u062A \u0648 \u0627\u0645\u062A\u06CC\u0627\u0632\u0647\u0627",
      "pdp.questions": "\u0633\u0624\u0627\u0644\u0627\u062A \u06A9\u0627\u0631\u0628\u0631\u0627\u0646",
      "pdp.related": "\u06A9\u0627\u0644\u0627\u0647\u0627\u06CC \u0645\u0634\u0627\u0628\u0647",
      "pdp.compatibility": "\u0633\u0627\u0632\u06AF\u0627\u0631\u06CC",
      "pdp.writeReview": "\u062B\u0628\u062A \u0646\u0638\u0631 \u0648 \u0627\u0645\u062A\u06CC\u0627\u0632",
      "pdp.askQuestion": "\u067E\u0631\u0633\u06CC\u062F\u0646 \u0633\u0624\u0627\u0644",
      "pdp.loginToReview": "\u0628\u0631\u0627\u06CC \u062B\u0628\u062A \u0646\u0638\u0631 \u0648\u0627\u0631\u062F \u062D\u0633\u0627\u0628 \u06A9\u0627\u0631\u0628\u0631\u06CC \u0634\u0648.",
      "pdp.reviewSubmitted": "\u0646\u0638\u0631 \u0634\u0645\u0627 \u062B\u0628\u062A \u0634\u062F \u0648 \u067E\u0633 \u0627\u0632 \u062A\u0623\u06CC\u06CC\u062F \u0645\u062F\u06CC\u0631 \u0646\u0645\u0627\u06CC\u0634 \u062F\u0627\u062F\u0647 \u0645\u06CC\u200C\u0634\u0648\u062F.",
      "pdp.reviewPending": "\u0646\u0638\u0631 \u0634\u0645\u0627 \u067E\u0633 \u0627\u0632 \u062A\u0623\u06CC\u06CC\u062F \u0645\u062F\u06CC\u0631 \u0646\u0645\u0627\u06CC\u0634 \u062F\u0627\u062F\u0647 \u0645\u06CC\u200C\u0634\u0648\u062F.",
      "pdp.questionSubmitted": "\u0633\u0624\u0627\u0644 \u0634\u0645\u0627 \u062B\u0628\u062A \u0634\u062F\u061B \u067E\u0633 \u0627\u0632 \u062A\u0623\u06CC\u06CC\u062F\u060C \u0645\u062F\u06CC\u0631 \u0628\u0647 \u0622\u0646 \u067E\u0627\u0633\u062E \u0645\u06CC\u200C\u062F\u0647\u062F.",
      "pdp.buyerBadge": "\u062E\u0631\u06CC\u062F\u0627\u0631 \u0627\u06CC\u0646 \u06A9\u0627\u0644\u0627",
      "pdp.visitorBadge": "\u0628\u0627\u0632\u062F\u06CC\u062F\u06A9\u0646\u0646\u062F\u0647",
      "pdp.helpful": "\u0645\u0641\u06CC\u062F \u0628\u0648\u062F",
      "pdp.storeReply": "\u067E\u0627\u0633\u062E \u0641\u0631\u0648\u0634\u06AF\u0627\u0647",
      "pdp.noReviews": "\u0647\u0646\u0648\u0632 \u0646\u0638\u0631\u06CC \u062B\u0628\u062A \u0646\u0634\u062F\u0647. \u0627\u0648\u0644\u06CC\u0646 \u0646\u0641\u0631 \u0628\u0627\u0634!",
      "pdp.noQuestions": "\u0633\u0624\u0627\u0644\u06CC \u062B\u0628\u062A \u0646\u0634\u062F\u0647. \u0627\u06AF\u0631 \u0633\u0624\u0627\u0644\u06CC \u062F\u0627\u0631\u06CC \u0628\u067E\u0631\u0633.",
      "pdp.yourRating": "\u0627\u0645\u062A\u06CC\u0627\u0632 \u0634\u0645\u0627",
      "pdp.viewed": "\u0628\u0627\u0632\u062F\u06CC\u062F",
      "pdp.sold": "\u0641\u0631\u0648\u0634 \u0631\u0641\u062A\u0647",
      "pdp.off": "\u062A\u062E\u0641\u06CC\u0641",
      "pdp.save": "\u0633\u0648\u062F \u0634\u0645\u0627",
      "pdp.lastPrice": "\u0642\u06CC\u0645\u062A \u0642\u0628\u0644\u06CC",
      "pdp.stockCount": "\u0645\u0648\u062C\u0648\u062F\u06CC: {n} \u0639\u062F\u062F",
      "pdp.fastSend": "\u0627\u0631\u0633\u0627\u0644 \u0633\u0631\u06CC\u0639 \u0627\u0632 \u0628\u0648\u0634\u0647\u0631",
      "pdp.installment": "\u067E\u0631\u062F\u0627\u062E\u062A \u062F\u0631 \u0645\u062D\u0644 \u0628\u0631\u0627\u06CC \u0633\u0641\u0627\u0631\u0634\u200C\u0647\u0627\u06CC \u0648\u0627\u062C\u062F \u0634\u0631\u0627\u06CC\u0637",
      "cart.title": "\u0633\u0628\u062F \u062E\u0631\u06CC\u062F",
      "cart.empty": "\u0633\u0628\u062F \u062E\u0631\u06CC\u062F \u062E\u0627\u0644\u06CC \u0627\u0633\u062A",
      "cart.emptyText": "\u0647\u0646\u0648\u0632 \u06A9\u0627\u0644\u0627\u06CC\u06CC \u0627\u0646\u062A\u062E\u0627\u0628 \u0646\u06A9\u0631\u062F\u0647\u200C\u0627\u06CC. \u0627\u0632 \u062F\u0633\u062A\u0647\u200C\u0628\u0646\u062F\u06CC\u200C\u0647\u0627 \u06CC\u0627 \u062C\u0633\u062A\u200C\u0648\u062C\u0648 \u0634\u0631\u0648\u0639 \u06A9\u0646.",
      "cart.goShopping": "\u0628\u0631\u06CC\u0645 \u0633\u0631\u0627\u063A \u062E\u0631\u06CC\u062F",
      "cart.item": "\u06A9\u0627\u0644\u0627",
      "cart.qty": "\u062A\u0639\u062F\u0627\u062F",
      "cart.remove": "\u062D\u0630\u0641",
      "cart.clear": "\u062E\u0627\u0644\u06CC \u06A9\u0631\u062F\u0646 \u0633\u0628\u062F",
      "cart.clearConfirm": "\u0647\u0645\u0647\u200C\u06CC \u06A9\u0627\u0644\u0627\u0647\u0627\u06CC \u0633\u0628\u062F \u062D\u0630\u0641 \u0634\u0648\u0646\u062F\u061F",
      "cart.summary": "\u062E\u0644\u0627\u0635\u0647\u200C\u06CC \u0633\u0641\u0627\u0631\u0634",
      "cart.continue": "\u0627\u062F\u0627\u0645\u0647\u200C\u06CC \u0641\u0631\u0622\u06CC\u0646\u062F \u062E\u0631\u06CC\u062F",
      "cart.freeShipHint": "\u0627\u06AF\u0631 {amount} \u062A\u0648\u0645\u0627\u0646 \u062F\u06CC\u06AF\u0631 \u062E\u0631\u06CC\u062F \u06A9\u0646\u06CC\u060C \u0627\u0631\u0633\u0627\u0644 \u0631\u0627\u06CC\u06AF\u0627\u0646 \u0645\u06CC\u200C\u0634\u0648\u062F.",
      "cart.freeShipDone": "\u0627\u0631\u0633\u0627\u0644 \u0627\u06CC\u0646 \u0633\u0641\u0627\u0631\u0634 \u0631\u0627\u06CC\u06AF\u0627\u0646 \u0627\u0633\u062A!",
      "cart.couponApplied": "\u06A9\u062F \u062A\u062E\u0641\u06CC\u0641 \u0627\u0639\u0645\u0627\u0644 \u0634\u062F",
      "cart.couponPlaceholder": "\u06A9\u062F \u062A\u062E\u0641\u06CC\u0641 \u062F\u0627\u0631\u06CC\u061F \u0648\u0627\u0631\u062F \u06A9\u0646",
      "cart.applyCoupon": "\u0627\u0639\u0645\u0627\u0644 \u06A9\u062F",
      "cart.removeCoupon": "\u062D\u0630\u0641 \u06A9\u062F",
      "cart.updated": "\u0633\u0628\u062F \u0628\u0647\u200C\u0631\u0648\u0632\u0631\u0633\u0627\u0646\u06CC \u0634\u062F",
      "checkout.title": "\u062A\u06A9\u0645\u06CC\u0644 \u0633\u0641\u0627\u0631\u0634",
      "checkout.step1": "\u062A\u062D\u0648\u06CC\u0644",
      "checkout.step2": "\u067E\u0631\u062F\u0627\u062E\u062A",
      "checkout.step3": "\u062A\u0623\u06CC\u06CC\u062F",
      "checkout.delivery": "\u0631\u0648\u0634 \u062A\u062D\u0648\u06CC\u0644",
      "checkout.pickup": "\u062A\u062D\u0648\u06CC\u0644 \u062D\u0636\u0648\u0631\u06CC \u0627\u0632 \u0645\u063A\u0627\u0632\u0647",
      "checkout.pickupDesc": "\u0631\u0627\u06CC\u06AF\u0627\u0646 \u2014 \u067E\u0633 \u0627\u0632 \u062A\u0623\u06CC\u06CC\u062F\u060C \u0627\u0639\u0644\u0627\u0646 \u0622\u0645\u0627\u062F\u0647\u200C\u0633\u0627\u0632\u06CC \u0645\u06CC\u200C\u06AF\u06CC\u0631\u06CC \u0648 \u062D\u0636\u0648\u0631\u06CC \u062A\u062D\u0648\u06CC\u0644 \u0645\u06CC\u200C\u06AF\u06CC\u0631\u06CC.",
      "checkout.courier": "\u0627\u0631\u0633\u0627\u0644 \u0628\u0627 \u067E\u06CC\u06A9 / \u067E\u0633\u062A",
      "checkout.courierDesc": "\u0627\u0631\u0633\u0627\u0644 \u0628\u0647 \u0622\u062F\u0631\u0633 \u062B\u0628\u062A\u200C\u0634\u062F\u0647 \u0628\u0627 \u0627\u0645\u06A9\u0627\u0646 \u0628\u06CC\u0645\u0647\u200C\u06CC \u0645\u0631\u0633\u0648\u0644\u0647.",
      "checkout.zone": "\u0645\u0646\u0637\u0642\u0647\u200C\u06CC \u0627\u0631\u0633\u0627\u0644",
      "checkout.express": "\u0627\u0631\u0633\u0627\u0644 \u0641\u0648\u0631\u06CC (\u0647\u0645\u0627\u0646 \u0631\u0648\u0632)",
      "checkout.insuranceOpt": "\u0628\u06CC\u0645\u0647\u200C\u06CC \u0645\u0631\u0633\u0648\u0644\u0647",
      "checkout.insuranceDesc": "\u062F\u0631 \u0635\u0648\u0631\u062A \u0622\u0633\u06CC\u0628 \u06CC\u0627 \u0645\u0641\u0642\u0648\u062F\u06CC \u062F\u0631 \u0645\u0633\u06CC\u0631\u060C \u0645\u0639\u0627\u062F\u0644 \u0627\u0631\u0632\u0634 \u06A9\u0627\u0644\u0627 \u062C\u0628\u0631\u0627\u0646 \u0645\u06CC\u200C\u0634\u0648\u062F.",
      "checkout.insuranceAuto": "\u0628\u0631\u0627\u06CC \u0627\u0639\u0636\u0627\u06CC \u067E\u0644\u0627\u0633 \u0628\u0647\u200C\u0635\u0648\u0631\u062A \u062E\u0648\u062F\u06A9\u0627\u0631 \u0648 \u0631\u0627\u06CC\u06AF\u0627\u0646 \u0627\u0639\u0645\u0627\u0644 \u0634\u062F.",
      "checkout.address": "\u0622\u062F\u0631\u0633 \u0627\u0631\u0633\u0627\u0644",
      "checkout.addAddress": "\u0627\u0641\u0632\u0648\u062F\u0646 \u0622\u062F\u0631\u0633 \u062C\u062F\u06CC\u062F",
      "checkout.noAddress": "\u0628\u0631\u0627\u06CC \u0627\u0631\u0633\u0627\u0644 \u067E\u0633\u062A\u06CC \u0628\u0627\u06CC\u062F \u062D\u062F\u0627\u0642\u0644 \u06CC\u06A9 \u0622\u062F\u0631\u0633 \u062B\u0628\u062A \u06A9\u0646\u06CC.",
      "checkout.paymentMethod": "\u0631\u0648\u0634 \u067E\u0631\u062F\u0627\u062E\u062A",
      "checkout.useWallet": "\u067E\u0631\u062F\u0627\u062E\u062A \u0627\u0632 \u06A9\u06CC\u0641 \u067E\u0648\u0644",
      "checkout.walletBalance": "\u0645\u0648\u062C\u0648\u062F\u06CC \u06A9\u06CC\u0641 \u067E\u0648\u0644: {amount} \u062A\u0648\u0645\u0627\u0646",
      "checkout.note": "\u062A\u0648\u0636\u06CC\u062D\u0627\u062A \u0633\u0641\u0627\u0631\u0634 (\u0627\u062E\u062A\u06CC\u0627\u0631\u06CC)",
      "checkout.notePlaceholder": "\u0645\u062B\u0644\u0627\u064B: \u0644\u0637\u0641\u0627\u064B \u0642\u0628\u0644 \u0627\u0632 \u0627\u0631\u0633\u0627\u0644 \u062A\u0645\u0627\u0633 \u0628\u06AF\u06CC\u0631\u06CC\u062F.",
      "checkout.acceptTerms": "\u0642\u0648\u0627\u0646\u06CC\u0646 \u0648 \u0645\u0642\u0631\u0631\u0627\u062A \u0648 \u062D\u0631\u06CC\u0645 \u062E\u0635\u0648\u0635\u06CC \u0631\u0627 \u062E\u0648\u0627\u0646\u062F\u0647\u200C\u0627\u0645 \u0648 \u0645\u06CC\u200C\u067E\u0630\u06CC\u0631\u0645.",
      "checkout.placeOrder": "\u062B\u0628\u062A \u0648 \u067E\u0631\u062F\u0627\u062E\u062A \u0633\u0641\u0627\u0631\u0634",
      "checkout.placing": "\u062F\u0631 \u062D\u0627\u0644 \u062B\u0628\u062A \u0633\u0641\u0627\u0631\u0634\u2026",
      "checkout.loginRequired": "\u0628\u0631\u0627\u06CC \u062A\u06A9\u0645\u06CC\u0644 \u062E\u0631\u06CC\u062F \u0648\u0627\u0631\u062F \u062D\u0633\u0627\u0628 \u06A9\u0627\u0631\u0628\u0631\u06CC \u0634\u0648.",
      "checkout.successTitle": "\u0633\u0641\u0627\u0631\u0634 \u062B\u0628\u062A \u0634\u062F",
      "checkout.successText": "\u06A9\u062F \u0633\u0641\u0627\u0631\u0634 \u062A\u0648 {code} \u0627\u0633\u062A. \u0648\u0636\u0639\u06CC\u062A \u0631\u0627 \u0627\u0632 \u0628\u062E\u0634 \xAB\u0633\u0641\u0627\u0631\u0634\u200C\u0647\u0627\u06CC \u0645\u0646\xBB \u067E\u06CC\u06AF\u06CC\u0631\u06CC \u06A9\u0646.",
      "checkout.payNow": "\u067E\u0631\u062F\u0627\u062E\u062A \u0622\u0646\u0644\u0627\u06CC\u0646",
      "checkout.payLater": "\u0628\u0639\u062F\u0627\u064B \u067E\u0631\u062F\u0627\u062E\u062A \u0645\u06CC\u200C\u06A9\u0646\u0645",
      "checkout.gatewayDemo": "\u062F\u0631\u06AF\u0627\u0647 \u062F\u0631 \u062D\u0627\u0644\u062A \u0622\u0632\u0645\u0627\u06CC\u0634\u06CC \u0627\u0633\u062A\u061B \u0647\u06CC\u0686 \u0645\u0628\u0644\u063A\u06CC \u0648\u0627\u0642\u0639\u0627\u064B \u06A9\u0633\u0631 \u0646\u0645\u06CC\u200C\u0634\u0648\u062F.",
      "checkout.paymentSuccess": "\u067E\u0631\u062F\u0627\u062E\u062A \u0645\u0648\u0641\u0642 \u0628\u0648\u062F",
      "checkout.paymentFailed": "\u067E\u0631\u062F\u0627\u062E\u062A \u0646\u0627\u0645\u0648\u0641\u0642 \u0628\u0648\u062F",
      "checkout.simulateSuccess": "\u067E\u0631\u062F\u0627\u062E\u062A \u0645\u0648\u0641\u0642 (\u0634\u0628\u06CC\u0647\u200C\u0633\u0627\u0632\u06CC \u062F\u0631\u06AF\u0627\u0647)",
      "checkout.simulateFail": "\u0644\u063A\u0648 \u067E\u0631\u062F\u0627\u062E\u062A",
      "checkout.concurrencyNote": "\u0645\u0648\u062C\u0648\u062F\u06CC \u062F\u0631 \u0644\u062D\u0638\u0647\u200C\u06CC \u062B\u0628\u062A \u0633\u0641\u0627\u0631\u0634 \u0642\u0641\u0644 \u0645\u06CC\u200C\u0634\u0648\u062F\u061B \u0627\u06AF\u0631 \u06A9\u0627\u0644\u0627\u06CC\u06CC \u0647\u0645\u200C\u0632\u0645\u0627\u0646 \u062A\u0645\u0627\u0645 \u0634\u0648\u062F\u060C \u0628\u0647 \u062A\u0648 \u0627\u0637\u0644\u0627\u0639 \u0645\u06CC\u200C\u062F\u0647\u06CC\u0645 \u0648 \u0648\u062C\u0647 \u0628\u0627\u0632 \u0645\u06CC\u200C\u06AF\u0631\u062F\u062F.",
      "checkout.pickupReady": "\u0632\u0645\u0627\u0646 \u0622\u0645\u0627\u062F\u0647\u200C\u0633\u0627\u0632\u06CC: \u062D\u062F\u0648\u062F {h} \u0633\u0627\u0639\u062A \u06A9\u0627\u0631\u06CC",
      "auth.title": "\u0648\u0631\u0648\u062F \u06CC\u0627 \u062B\u0628\u062A\u200C\u0646\u0627\u0645",
      "auth.loginTitle": "\u0648\u0631\u0648\u062F \u0628\u0647 \u062D\u0633\u0627\u0628 \u06A9\u0627\u0631\u0628\u0631\u06CC",
      "auth.registerTitle": "\u0633\u0627\u062E\u062A \u062D\u0633\u0627\u0628 \u06A9\u0627\u0631\u0628\u0631\u06CC",
      "auth.methodPassword": "\u0646\u0627\u0645 \u06A9\u0627\u0631\u0628\u0631\u06CC \u0648 \u0631\u0645\u0632",
      "auth.methodPhone": "\u0634\u0645\u0627\u0631\u0647 \u0645\u0648\u0628\u0627\u06CC\u0644",
      "auth.methodEmail": "\u0627\u06CC\u0645\u06CC\u0644",
      "auth.identifier": "\u0646\u0627\u0645 \u06A9\u0627\u0631\u0628\u0631\u06CC\u060C \u0645\u0648\u0628\u0627\u06CC\u0644 \u06CC\u0627 \u0627\u06CC\u0645\u06CC\u0644",
      "auth.remember": "\u0645\u0631\u0627 \u0628\u0647 \u062E\u0627\u0637\u0631 \u0628\u0633\u067E\u0627\u0631",
      "auth.forgot": "\u0641\u0631\u0627\u0645\u0648\u0634\u06CC \u0631\u0645\u0632 \u0639\u0628\u0648\u0631",
      "auth.noAccount": "\u062D\u0633\u0627\u0628 \u06A9\u0627\u0631\u0628\u0631\u06CC \u0646\u062F\u0627\u0631\u06CC\u061F",
      "auth.haveAccount": "\u0642\u0628\u0644\u0627\u064B \u062B\u0628\u062A\u200C\u0646\u0627\u0645 \u06A9\u0631\u062F\u0647\u200C\u0627\u06CC\u061F",
      "auth.sendCode": "\u0627\u0631\u0633\u0627\u0644 \u06A9\u062F \u062A\u0623\u06CC\u06CC\u062F",
      "auth.codeSent": "\u06A9\u062F \u062A\u0623\u06CC\u06CC\u062F \u0627\u0631\u0633\u0627\u0644 \u0634\u062F",
      "auth.codeSentTo": "\u06A9\u062F \u06F6 \u0631\u0642\u0645\u06CC \u0628\u0647 {target} \u0627\u0631\u0633\u0627\u0644 \u0634\u062F.",
      "auth.enterCode": "\u06A9\u062F \u062A\u0623\u06CC\u06CC\u062F \u0631\u0627 \u0648\u0627\u0631\u062F \u06A9\u0646",
      "auth.otpCode": "\u06A9\u062F \u062A\u0623\u06CC\u06CC\u062F",
      "auth.resend": "\u0627\u0631\u0633\u0627\u0644 \u062F\u0648\u0628\u0627\u0631\u0647\u200C\u06CC \u06A9\u062F",
      "auth.resendIn": "\u0627\u0631\u0633\u0627\u0644 \u062F\u0648\u0628\u0627\u0631\u0647 \u062A\u0627 {s} \u062B\u0627\u0646\u06CC\u0647",
      "auth.demoCode": "\u062D\u0627\u0644\u062A \u0622\u0632\u0645\u0627\u06CC\u0634\u06CC: \u06A9\u062F \u062A\u0623\u06CC\u06CC\u062F {code}",
      "auth.2faTitle": "\u0648\u0631\u0648\u062F \u062F\u0648\u0645\u0631\u062D\u0644\u0647\u200C\u0627\u06CC",
      "auth.2faText": "\u06A9\u062F \u06F6 \u0631\u0642\u0645\u06CC \u0627\u0632 \u0627\u067E \u0627\u062D\u0631\u0627\u0632 \u0647\u0648\u06CC\u062A\u060C \u067E\u06CC\u0627\u0645\u06A9 \u06CC\u0627 \u0627\u06CC\u0645\u06CC\u0644 \u0631\u0627 \u0648\u0627\u0631\u062F \u06A9\u0646.",
      "auth.2faTotp": "\u0627\u067E \u0627\u062D\u0631\u0627\u0632 \u0647\u0648\u06CC\u062A",
      "auth.2faSms": "\u06A9\u062F \u067E\u06CC\u0627\u0645\u06A9\u06CC",
      "auth.2faEmail": "\u06A9\u062F \u0627\u06CC\u0645\u06CC\u0644\u06CC",
      "auth.2faBackup": "\u06A9\u062F \u067E\u0634\u062A\u06CC\u0628\u0627\u0646",
      "auth.2faVerify": "\u062A\u0623\u06CC\u06CC\u062F \u0648 \u0648\u0631\u0648\u062F",
      "auth.acceptTerms": "\u0642\u0648\u0627\u0646\u06CC\u0646 \u0648 \u0645\u0642\u0631\u0631\u0627\u062A \u0648 \u062D\u0631\u06CC\u0645 \u062E\u0635\u0648\u0635\u06CC \u0631\u0627 \u0645\u06CC\u200C\u067E\u0630\u06CC\u0631\u0645.",
      "auth.referral": "\u06A9\u062F \u0645\u0639\u0631\u0641 (\u0627\u062E\u062A\u06CC\u0627\u0631\u06CC)",
      "auth.registerDone": "\u062D\u0633\u0627\u0628 \u06A9\u0627\u0631\u0628\u0631\u06CC \u0633\u0627\u062E\u062A\u0647 \u0634\u062F. \u062E\u0648\u0634 \u0622\u0645\u062F\u06CC!",
      "auth.loginDone": "\u062E\u0648\u0634 \u0622\u0645\u062F\u06CC",
      "auth.logoutDone": "\u0628\u0627 \u0645\u0648\u0641\u0642\u06CC\u062A \u062E\u0627\u0631\u062C \u0634\u062F\u06CC",
      "auth.recoveryTitle": "\u0628\u0627\u0632\u06CC\u0627\u0628\u06CC \u0631\u0645\u0632 \u0639\u0628\u0648\u0631",
      "auth.recoveryText": "\u0634\u0645\u0627\u0631\u0647\u200C\u06CC \u0645\u0648\u0628\u0627\u06CC\u0644 \u06CC\u0627 \u0627\u06CC\u0645\u06CC\u0644 \u062B\u0628\u062A\u200C\u0634\u062F\u0647 \u0631\u0627 \u0648\u0627\u0631\u062F \u06A9\u0646 \u062A\u0627 \u06A9\u062F \u0628\u0627\u0632\u06CC\u0627\u0628\u06CC \u0628\u0641\u0631\u0633\u062A\u06CC\u0645.",
      "auth.newPassword": "\u0631\u0645\u0632 \u0639\u0628\u0648\u0631 \u062C\u062F\u06CC\u062F",
      "auth.resetDone": "\u0631\u0645\u0632 \u0639\u0628\u0648\u0631 \u0628\u0627 \u0645\u0648\u0641\u0642\u06CC\u062A \u062A\u063A\u06CC\u06CC\u0631 \u06A9\u0631\u062F",
      "auth.passwordRules": "\u062D\u062F\u0627\u0642\u0644 \u06F8 \u0646\u0648\u06CC\u0633\u0647 \u0634\u0627\u0645\u0644 \u062D\u0631\u0648\u0641 \u06A9\u0648\u0686\u06A9\u060C \u062D\u0631\u0648\u0641 \u0628\u0632\u0631\u06AF\u060C \u0639\u062F\u062F \u0648 \u0646\u0645\u0627\u062F",
      "auth.orContinue": "\u06CC\u0627",
      "auth.guestCheckout": "\u0627\u062F\u0627\u0645\u0647\u200C\u06CC \u062E\u0631\u06CC\u062F \u0628\u062F\u0648\u0646 \u062D\u0633\u0627\u0628 \u06A9\u0627\u0631\u0628\u0631\u06CC",
      "acc.title": "\u062D\u0633\u0627\u0628 \u06A9\u0627\u0631\u0628\u0631\u06CC",
      "acc.dashboard": "\u062F\u0627\u0634\u0628\u0648\u0631\u062F \u0645\u0646",
      "acc.badges": "\u0627\u0641\u062A\u062E\u0627\u0631\u0627\u062A \u0645\u0646",
      "badge.got": "\u062F\u0631\u06CC\u0627\u0641\u062A\u200C\u0634\u062F\u0647",
      "badge.locked": "\u0647\u0646\u0648\u0632 \u0642\u0641\u0644",
      "badge.first-buy": "\u0646\u062E\u0633\u062A\u06CC\u0646 \u062E\u0631\u06CC\u062F",
      "badge.first-buy.d": "\u0627\u0648\u0644\u06CC\u0646 \u0633\u0641\u0627\u0631\u0634 \u0645\u0648\u0641\u0642 \u0631\u0627 \u062B\u0628\u062A \u06A9\u0631\u062F\u0647\u200C\u0627\u06CC\u062F.",
      "badge.silver-buyer": "\u062E\u0631\u06CC\u062F\u0627\u0631 \u0646\u0642\u0631\u0647\u200C\u0627\u06CC",
      "badge.silver-buyer.d": "\u06F5 \u062E\u0631\u06CC\u062F \u0645\u0648\u0641\u0642\u061B \u0627\u0639\u062A\u0628\u0627\u0631 \u0634\u0645\u0627 \u0646\u0632\u062F \u06AF\u0631\u06CC\u0646 \u0627\u067E\u0644.",
      "badge.gold-buyer": "\u062E\u0631\u06CC\u062F\u0627\u0631 \u0637\u0644\u0627\u06CC\u06CC",
      "badge.gold-buyer.d": "\u06F1\u06F5 \u062E\u0631\u06CC\u062F \u0645\u0648\u0641\u0642\u061B \u0645\u0634\u062A\u0631\u06CC \u0648\u06CC\u0698\u0647\u0654 \u06AF\u0631\u06CC\u0646 \u0627\u067E\u0644.",
      "badge.big-spender": "\u062E\u0648\u0634\u200C\u062D\u0633\u0627\u0628",
      "badge.big-spender.d": "\u0645\u062C\u0645\u0648\u0639 \u062E\u0631\u06CC\u062F \u0628\u0627\u0644\u0627\u06CC \u06F5\u06F0 \u0645\u06CC\u0644\u06CC\u0648\u0646 \u062A\u0648\u0645\u0627\u0646.",
      "badge.early-bird": "\u067E\u06CC\u0634\u06AF\u0627\u0645",
      "badge.early-bird.d": "\u062C\u0632\u0648 \u06F1\u06F0\u06F0 \u06A9\u0627\u0631\u0628\u0631 \u0646\u062E\u0633\u062A \u06AF\u0631\u06CC\u0646 \u0627\u067E\u0644 \u0628\u0648\u062F\u0647\u200C\u0627\u06CC\u062F.",
      "badge.veteran": "\u0647\u0645\u0631\u0627\u0647 \u06A9\u0647\u0646\u0647\u200C\u06A9\u0627\u0631",
      "badge.veteran.d": "\u0628\u06CC\u0634 \u0627\u0632 \u06CC\u06A9 \u0633\u0627\u0644 \u0647\u0645\u0631\u0627\u0647 \u0645\u0627 \u0647\u0633\u062A\u06CC\u062F.",
      "badge.reviewer": "\u0646\u0642\u062F\u0646\u0648\u06CC\u0633",
      "badge.reviewer.d": "\u06F3 \u062B\u0628\u062A \u062A\u062C\u0631\u0628\u0647\u0654 \u062E\u0631\u06CC\u062F\u061B \u06A9\u0645\u06A9 \u0628\u0647 \u0627\u0646\u062A\u062E\u0627\u0628 \u0628\u0642\u06CC\u0647.",
      "badge.plus-member": "\u0639\u0636\u0648 \u067E\u0644\u0627\u0633",
      "badge.plus-member.d": "\u0627\u0634\u062A\u0631\u0627\u06A9 \u067E\u0644\u0627\u0633 \u0641\u0639\u0627\u0644 \u062F\u0627\u0631\u06CC\u062F.",
      "badge.wallet-user": "\u06A9\u06CC\u0641\u200C\u067E\u0648\u0644\u06CC",
      "badge.wallet-user.d": "\u0627\u0632 \u06A9\u06CC\u0641 \u067E\u0648\u0644 \u06AF\u0631\u06CC\u0646 \u0627\u067E\u0644 \u0627\u0633\u062A\u0641\u0627\u062F\u0647 \u06A9\u0631\u062F\u0647\u200C\u0627\u06CC\u062F.",
      "badge.supporter": "\u067E\u06CC\u06AF\u06CC\u0631",
      "badge.supporter.d": "\u0627\u0648\u0644\u06CC\u0646 \u062A\u06CC\u06A9\u062A \u067E\u0634\u062A\u06CC\u0628\u0627\u0646\u06CC \u0631\u0627 \u062B\u0628\u062A \u06A9\u0631\u062F\u0647\u200C\u0627\u06CC\u062F.",
      "acc.orders": "\u0633\u0641\u0627\u0631\u0634\u200C\u0647\u0627\u06CC \u0645\u0646",
      "acc.wishlist": "\u0644\u06CC\u0633\u062A \u0645\u0646",
      "acc.wallet": "\u06A9\u06CC\u0641 \u067E\u0648\u0644",
      "acc.plus": "\u0627\u0634\u062A\u0631\u0627\u06A9 \u067E\u0644\u0627\u0633",
      "acc.addresses": "\u0622\u062F\u0631\u0633\u200C\u0647\u0627",
      "acc.notifications": "\u0627\u0639\u0644\u0627\u0646\u200C\u0647\u0627",
      "acc.tickets": "\u062A\u06CC\u06A9\u062A\u200C\u0647\u0627\u06CC \u0645\u0646",
      "acc.support": "\u0686\u062A \u067E\u0634\u062A\u06CC\u0628\u0627\u0646\u06CC",
      "acc.reviews": "\u0646\u0638\u0631\u0627\u062A \u0645\u0646",
      "acc.feedback": "\u067E\u06CC\u0634\u0646\u0647\u0627\u062F\u0647\u0627 \u0648 \u0634\u06A9\u0627\u06CC\u0627\u062A",
      "acc.profile": "\u0645\u0634\u062E\u0635\u0627\u062A \u067E\u0631\u0648\u0641\u0627\u06CC\u0644",
      "acc.security": "\u0627\u0645\u0646\u06CC\u062A \u062D\u0633\u0627\u0628",
      "acc.sessions": "\u0646\u0634\u0633\u062A\u200C\u0647\u0627\u06CC \u0641\u0639\u0627\u0644",
      "acc.prefs": "\u062A\u0631\u062C\u06CC\u062D\u0627\u062A \u0646\u0645\u0627\u06CC\u0634",
      "acc.data": "\u062F\u0627\u062F\u0647\u200C\u0647\u0627\u06CC \u0645\u0646",
      "acc.hello": "\u0633\u0644\u0627\u0645 {name}",
      "acc.memberSince": "\u0639\u0636\u0648 \u0627\u0632 {date}",
      "acc.noOrders": "\u0647\u0646\u0648\u0632 \u0633\u0641\u0627\u0631\u0634\u06CC \u062B\u0628\u062A \u0646\u06A9\u0631\u062F\u0647\u200C\u0627\u06CC",
      "acc.noOrdersText": "\u0627\u0648\u0644\u06CC\u0646 \u062E\u0631\u06CC\u062F\u062A \u0631\u0627 \u0628\u0627 \u062A\u062E\u0641\u06CC\u0641 \u062E\u0648\u0634\u200C\u0622\u0645\u062F\u06AF\u0648\u06CC\u06CC WELCOME10 \u0627\u0646\u062C\u0627\u0645 \u0628\u062F\u0647.",
      "acc.orderCode": "\u06A9\u062F \u0633\u0641\u0627\u0631\u0634",
      "acc.orderDate": "\u062A\u0627\u0631\u06CC\u062E \u0633\u0641\u0627\u0631\u0634",
      "acc.orderItems": "\u0627\u0642\u0644\u0627\u0645",
      "acc.orderTotal": "\u0645\u0628\u0644\u063A \u06A9\u0644",
      "acc.trackOrder": "\u067E\u06CC\u06AF\u06CC\u0631\u06CC \u0633\u0641\u0627\u0631\u0634",
      "acc.cancelOrder": "\u0644\u063A\u0648 \u0633\u0641\u0627\u0631\u0634",
      "acc.cancelConfirm": "\u0627\u06CC\u0646 \u0633\u0641\u0627\u0631\u0634 \u0644\u063A\u0648 \u0634\u0648\u062F\u061F \u0645\u0628\u0644\u063A \u067E\u0631\u062F\u0627\u062E\u062A\u06CC \u0628\u0647 \u06A9\u06CC\u0641 \u067E\u0648\u0644 \u0628\u0631\u0645\u06CC\u200C\u06AF\u0631\u062F\u062F.",
      "acc.cancelReason": "\u062F\u0644\u06CC\u0644 \u0644\u063A\u0648 (\u0627\u062E\u062A\u06CC\u0627\u0631\u06CC)",
      "acc.orderCancelled": "\u0633\u0641\u0627\u0631\u0634 \u0644\u063A\u0648 \u0634\u062F",
      "acc.reorder": "\u062E\u0631\u06CC\u062F \u062F\u0648\u0628\u0627\u0631\u0647",
      "acc.invoice": "\u0641\u0627\u06A9\u062A\u0648\u0631",
      "acc.printInvoice": "\u0686\u0627\u067E \u0641\u0627\u06A9\u062A\u0648\u0631",
      "acc.timeline": "\u0631\u0648\u0646\u062F \u0633\u0641\u0627\u0631\u0634",
      "acc.walletEmpty": "\u062A\u0631\u0627\u06A9\u0646\u0634\u06CC \u062B\u0628\u062A \u0646\u0634\u062F\u0647 \u0627\u0633\u062A",
      "acc.walletDeposit": "\u0634\u0627\u0631\u0698 \u06A9\u06CC\u0641 \u067E\u0648\u0644",
      "acc.walletAmount": "\u0645\u0628\u0644\u063A \u0634\u0627\u0631\u0698 (\u062A\u0648\u0645\u0627\u0646)",
      "acc.walletDeposited": "\u06A9\u06CC\u0641 \u067E\u0648\u0644 \u0634\u0627\u0631\u0698 \u0634\u062F",
      "acc.walletNote": "\u0645\u0648\u062C\u0648\u062F\u06CC \u06A9\u06CC\u0641 \u067E\u0648\u0644 \u0641\u0642\u0637 \u0628\u0631\u0627\u06CC \u062E\u0631\u06CC\u062F \u0627\u0632 \u0647\u0645\u06CC\u0646 \u0641\u0631\u0648\u0634\u06AF\u0627\u0647 \u0627\u0633\u062A \u0648 \u0633\u0648\u062F \u06CC\u0627 \u06A9\u0627\u0631\u0645\u0632\u062F\u06CC \u0628\u0647 \u0622\u0646 \u062A\u0639\u0644\u0642 \u0646\u0645\u06CC\u200C\u06AF\u06CC\u0631\u062F.",
      "acc.tx.deposit": "\u0634\u0627\u0631\u0698",
      "acc.tx.purchase": "\u062E\u0631\u06CC\u062F",
      "acc.tx.refund": "\u0628\u0627\u0632\u06AF\u0634\u062A \u0648\u062C\u0647",
      "acc.tx.adjust_in": "\u0627\u0641\u0632\u0627\u06CC\u0634 \u062A\u0648\u0633\u0637 \u0645\u062F\u06CC\u0631",
      "acc.tx.adjust_out": "\u06A9\u0633\u0631 \u062A\u0648\u0633\u0637 \u0645\u062F\u06CC\u0631",
      "acc.plusInactive": "\u0627\u0634\u062A\u0631\u0627\u06A9 \u067E\u0644\u0627\u0633 \u0646\u062F\u0627\u0631\u06CC",
      "acc.plusActive": "\u067E\u0644\u0627\u0633 \u0641\u0639\u0627\u0644 \u062A\u0627 {date}",
      "acc.plusSubscribe": "\u062E\u0631\u06CC\u062F \u0627\u0634\u062A\u0631\u0627\u06A9 \u067E\u0644\u0627\u0633",
      "acc.plusRenew": "\u062A\u0645\u062F\u06CC\u062F \u0627\u0634\u062A\u0631\u0627\u06A9",
      "acc.plusPrice": "{price} \u062A\u0648\u0645\u0627\u0646 \u0628\u0631\u0627\u06CC {days} \u0631\u0648\u0632",
      "acc.plusPerks": "\u0645\u0632\u0627\u06CC\u0627\u06CC \u0627\u0634\u062A\u0631\u0627\u06A9 \u067E\u0644\u0627\u0633",
      "acc.plusSubscribed": "\u0627\u0634\u062A\u0631\u0627\u06A9 \u067E\u0644\u0627\u0633 \u0641\u0639\u0627\u0644 \u0634\u062F",
      "acc.plusPayWallet": "\u067E\u0631\u062F\u0627\u062E\u062A \u0627\u0632 \u06A9\u06CC\u0641 \u067E\u0648\u0644",
      "acc.plusPayGateway": "\u067E\u0631\u062F\u0627\u062E\u062A \u0622\u0646\u0644\u0627\u06CC\u0646",
      "acc.addAddress": "\u0627\u0641\u0632\u0648\u062F\u0646 \u0622\u062F\u0631\u0633",
      "acc.editAddress": "\u0648\u06CC\u0631\u0627\u06CC\u0634 \u0622\u062F\u0631\u0633",
      "acc.addrTitle": "\u0639\u0646\u0648\u0627\u0646 (\u0645\u062B\u0644\u0627\u064B \u062E\u0627\u0646\u0647\u060C \u0645\u062D\u0644 \u06A9\u0627\u0631)",
      "acc.addrReceiver": "\u0646\u0627\u0645 \u06AF\u06CC\u0631\u0646\u062F\u0647",
      "acc.addrPhone": "\u0634\u0645\u0627\u0631\u0647\u200C\u06CC \u062A\u0645\u0627\u0633 \u06AF\u06CC\u0631\u0646\u062F\u0647",
      "acc.addrStreet": "\u0622\u062F\u0631\u0633 \u06A9\u0627\u0645\u0644 \u067E\u0633\u062A\u06CC",
      "acc.addrDefault": "\u0622\u062F\u0631\u0633 \u067E\u06CC\u0634\u200C\u0641\u0631\u0636",
      "acc.addrNote": "\u062A\u0648\u0636\u06CC\u062D\u0627\u062A \u0628\u0631\u0627\u06CC \u067E\u06CC\u06A9",
      "acc.addrSaved": "\u0622\u062F\u0631\u0633 \u0630\u062E\u06CC\u0631\u0647 \u0634\u062F",
      "acc.addrDeleted": "\u0622\u062F\u0631\u0633 \u062D\u0630\u0641 \u0634\u062F",
      "acc.noAddress": "\u0622\u062F\u0631\u0633\u06CC \u062B\u0628\u062A \u0646\u0634\u062F\u0647 \u0627\u0633\u062A",
      "acc.wishlistEmpty": "\u0644\u06CC\u0633\u062A \u0645\u0646 \u062E\u0627\u0644\u06CC \u0627\u0633\u062A",
      "acc.wishlistEmptyText": "\u0631\u0648\u06CC \u0622\u06CC\u06A9\u0648\u0646 \u0642\u0644\u0628 \u0647\u0631 \u06A9\u0627\u0644\u0627 \u0628\u0632\u0646 \u062A\u0627 \u0627\u06CC\u0646\u062C\u0627 \u0630\u062E\u06CC\u0631\u0647 \u0634\u0648\u062F.",
      "acc.notifEmpty": "\u0627\u0639\u0644\u0627\u0646\u06CC \u0646\u062F\u0627\u0631\u06CC",
      "acc.markAllRead": "\u0647\u0645\u0647 \u062E\u0648\u0627\u0646\u062F\u0647 \u0634\u062F",
      "acc.ticketNew": "\u062A\u06CC\u06A9\u062A \u062C\u062F\u06CC\u062F",
      "acc.ticketSubject": "\u0645\u0648\u0636\u0648\u0639",
      "acc.ticketCategory": "\u062F\u0633\u062A\u0647\u200C\u06CC \u062F\u0631\u062E\u0648\u0627\u0633\u062A",
      "acc.ticketPriority": "\u0627\u0648\u0644\u0648\u06CC\u062A",
      "acc.ticketBody": "\u0634\u0631\u062D \u062F\u0631\u062E\u0648\u0627\u0633\u062A",
      "form.rulesRequired": "\u067E\u0630\u06CC\u0631\u0634 \u0642\u0648\u0627\u0646\u06CC\u0646 \u062A\u06CC\u06A9\u062A \u0644\u0627\u0632\u0645 \u0627\u0633\u062A.",
      "form.termsRequired": "\u067E\u0630\u06CC\u0631\u0634 \u0642\u0648\u0627\u0646\u06CC\u0646 \u0648 \u0645\u0642\u0631\u0631\u0627\u062A \u0644\u0627\u0632\u0645 \u0627\u0633\u062A.",
      "page.statsTitle": "\u0622\u0645\u0627\u0631 \u0632\u0646\u062F\u0647\u200C\u06CC \u0641\u0631\u0648\u0634\u06AF\u0627\u0647",
      "page.aboutCta": "\u0628\u06CC\u0627 \u0628\u0628\u06CC\u0646 \u0686\u0647 \u0686\u06CC\u0632\u0647\u0627\u06CC\u06CC \u0628\u0631\u0627\u06CC\u062A \u062F\u0627\u0631\u06CC\u0645",
      "page.stepsTitle": "\u0645\u0631\u0627\u062D\u0644 \u062E\u0631\u06CC\u062F",
      "page.tipsTitle": "\u0646\u06A9\u062A\u0647\u200C\u0647\u0627\u06CC \u062E\u0631\u06CC\u062F",
      "page.hintsTitle": "\u0628\u0631\u0627\u06CC \u06AF\u0632\u0627\u0631\u0634\u06CC \u062F\u0642\u06CC\u0642\u200C\u062A\u0631",
      "page.bugTitle": "\u06AF\u0632\u0627\u0631\u0634 \u062E\u0637\u0627",
      "page.rulesTitle": "\u0642\u0648\u0627\u0646\u06CC\u0646",
      "faq.all": "\u0647\u0645\u0647\u200C\u06CC \u0645\u0648\u0636\u0648\u0639\u0627\u062A",
      "faq.search": "\u062C\u0633\u062A\u200C\u0648\u062C\u0648 \u062F\u0631 \u0633\u0624\u0627\u0644\u0627\u062A\u2026",
      "faq.results": "{n} \u0633\u0624\u0627\u0644",
      "faq.notFound": "\u0633\u0624\u0627\u0644\u06CC \u0628\u0627 \u0627\u06CC\u0646 \u0639\u0628\u0627\u0631\u062A \u067E\u06CC\u062F\u0627 \u0646\u0634\u062F.",
      "faq.askText": "\u0627\u0632 \u067E\u0634\u062A\u06CC\u0628\u0627\u0646\u06CC \u0622\u0646\u0644\u0627\u06CC\u0646 \u0628\u067E\u0631\u0633 \u06CC\u0627 \u062A\u06CC\u06A9\u062A \u0628\u0632\u0646.",
      "faq.cat.orders": "\u0633\u0641\u0627\u0631\u0634 \u0648 \u067E\u06CC\u06AF\u06CC\u0631\u06CC",
      "faq.cat.shipping": "\u0627\u0631\u0633\u0627\u0644 \u0648 \u062A\u062D\u0648\u06CC\u0644",
      "faq.cat.returns": "\u0645\u0631\u062C\u0648\u0639\u06CC \u0648 \u0628\u0627\u0632\u06AF\u0634\u062A \u0648\u062C\u0647",
      "faq.cat.product": "\u06A9\u0627\u0644\u0627 \u0648 \u0627\u0635\u0627\u0644\u062A",
      "faq.cat.account": "\u062D\u0633\u0627\u0628 \u06A9\u0627\u0631\u0628\u0631\u06CC",
      "faq.cat.security": "\u0627\u0645\u0646\u06CC\u062A \u0648 \u067E\u0631\u062F\u0627\u062E\u062A",
      "faq.cat.store": "\u0641\u0631\u0648\u0634\u06AF\u0627\u0647 \u0648 \u062A\u0645\u0627\u0633",
      "faq.cat.other": "\u0633\u0627\u06CC\u0631",
      "acc.ticketCloseConfirm": "\u062A\u06CC\u06A9\u062A \u0628\u0633\u062A\u0647 \u0634\u0648\u062F\u061F \u0628\u0639\u062F\u0627\u064B \u0628\u0627 \u0627\u0631\u0633\u0627\u0644 \u067E\u06CC\u0627\u0645 \u0645\u06CC\u200C\u062A\u0648\u0627\u0646\u06CC \u0628\u0627\u0632\u0634 \u06AF\u0631\u062F\u0627\u0646\u06CC.",
      "acc.ticketClosedNote": "\u0627\u06CC\u0646 \u062A\u06CC\u06A9\u062A \u0628\u0633\u062A\u0647 \u0634\u062F\u0647 \u0627\u0633\u062A. \u0627\u0631\u0633\u0627\u0644 \u067E\u06CC\u0627\u0645 \u062C\u062F\u06CC\u062F\u060C \u0622\u0646 \u0631\u0627 \u062F\u0648\u0628\u0627\u0631\u0647 \u0628\u0627\u0632 \u0645\u06CC\u200C\u06A9\u0646\u062F.",
      "acc.ticketBodyShort": "\u067E\u06CC\u0627\u0645 \u062E\u06CC\u0644\u06CC \u06A9\u0648\u062A\u0627\u0647 \u0627\u0633\u062A.",
      "acc.attachHint": "\u062A\u0627 \u06F4 \u062A\u0635\u0648\u06CC\u0631\u060C \u0647\u0631 \u06A9\u062F\u0627\u0645 \u06A9\u0645\u062A\u0631 \u0627\u0632 \u06F4 \u0645\u06AF\u0627\u0628\u0627\u06CC\u062A.",
      "err.tooLarge": "\u062D\u062C\u0645 \u0641\u0627\u06CC\u0644 \u0628\u06CC\u0634\u062A\u0631 \u0627\u0632 \u06F4 \u0645\u06AF\u0627\u0628\u0627\u06CC\u062A \u0627\u0633\u062A.",
      "acc.ticketRules": "\u0642\u0648\u0627\u0646\u06CC\u0646 \u062A\u06CC\u06A9\u062A \u0631\u0627 \u062E\u0648\u0627\u0646\u062F\u0647\u200C\u0627\u0645 \u0648 \u0645\u06CC\u200C\u067E\u0630\u06CC\u0631\u0645.",
      "acc.ticketViewRules": "\u0645\u0634\u0627\u0647\u062F\u0647\u200C\u06CC \u0642\u0648\u0627\u0646\u06CC\u0646 \u062A\u06CC\u06A9\u062A",
      "acc.ticketCreated": "\u062A\u06CC\u06A9\u062A \u062B\u0628\u062A \u0634\u062F. \u06A9\u062F \u067E\u06CC\u06AF\u06CC\u0631\u06CC: {code}",
      "acc.ticketWrite": "\u067E\u0627\u0633\u062E \u062E\u0648\u062F \u0631\u0627 \u0628\u0646\u0648\u06CC\u0633\u2026",
      "acc.ticketClose": "\u0628\u0633\u062A\u0646 \u062A\u06CC\u06A9\u062A",
      "acc.ticketReopen": "\u0628\u0627\u0632\u06AF\u0634\u0627\u06CC\u06CC",
      "acc.ticketSla": "\u0632\u0645\u0627\u0646 \u067E\u0627\u0633\u062E\u200C\u06AF\u0648\u06CC\u06CC \u062A\u0642\u0631\u06CC\u0628\u06CC: {h} \u0633\u0627\u0639\u062A",
      "acc.noTickets": "\u062A\u06CC\u06A9\u062A\u06CC \u062B\u0628\u062A \u0646\u06A9\u0631\u062F\u0647\u200C\u0627\u06CC",
      "acc.chatTitle": "\u067E\u0634\u062A\u06CC\u0628\u0627\u0646\u06CC \u0622\u0646\u0644\u0627\u06CC\u0646",
      "acc.chatPlaceholder": "\u067E\u06CC\u0627\u0645 \u062E\u0648\u062F \u0631\u0627 \u0628\u0646\u0648\u06CC\u0633\u2026",
      "acc.chatWelcome": "\u0633\u0644\u0627\u0645! \u0633\u0624\u0627\u0644 \u06CC\u0627 \u0645\u0634\u06A9\u0644\u06CC \u062F\u0627\u0631\u06CC\u061F \u0647\u0645\u06CC\u0646\u200C\u062C\u0627 \u0628\u0646\u0648\u06CC\u0633 \u062A\u0627 \u067E\u0627\u0633\u062E \u062F\u0647\u06CC\u0645.",
      "acc.chatOffline": "\u0627\u0644\u0627\u0646 \u062E\u0627\u0631\u062C \u0627\u0632 \u0633\u0627\u0639\u062A \u06A9\u0627\u0631\u06CC \u0647\u0633\u062A\u06CC\u0645\u061B \u067E\u06CC\u0627\u0645 \u0628\u06AF\u0630\u0627\u0631 \u062A\u0627 \u0627\u0648\u0644 \u0648\u0642\u062A \u067E\u0627\u0633\u062E \u062F\u0647\u06CC\u0645\u060C \u06CC\u0627 \u062A\u06CC\u06A9\u062A \u0628\u0632\u0646.",
      "acc.chatOpenTicket": "\u062B\u0628\u062A \u062A\u06CC\u06A9\u062A",
      "acc.reviewEmpty": "\u0646\u0638\u0631 \u06CC\u0627 \u0633\u0624\u0627\u0644\u06CC \u062B\u0628\u062A \u0646\u06A9\u0631\u062F\u0647\u200C\u0627\u06CC",
      "acc.feedbackNew": "\u0627\u0631\u0633\u0627\u0644 \u067E\u06CC\u0634\u0646\u0647\u0627\u062F\u060C \u0634\u06A9\u0627\u06CC\u062A \u06CC\u0627 \u06AF\u0632\u0627\u0631\u0634 \u062E\u0637\u0627",
      "acc.feedbackType": "\u0646\u0648\u0639 \u067E\u06CC\u0627\u0645",
      "acc.feedbackContact": "\u0631\u0627\u0647 \u0627\u0631\u062A\u0628\u0627\u0637\u06CC (\u0627\u06CC\u0645\u06CC\u0644 \u06CC\u0627 \u0645\u0648\u0628\u0627\u06CC\u0644)",
      "acc.feedbackContactHint": "\u062F\u0631 \u0635\u0648\u0631\u062A \u062B\u0628\u062A\u060C \u0646\u062A\u06CC\u062C\u0647 \u0631\u0627 \u0628\u0647 \u0627\u0637\u0644\u0627\u0639 \u062A\u0648 \u0645\u06CC\u200C\u0631\u0633\u0627\u0646\u06CC\u0645.",
      "acc.feedbackSent": "\u067E\u06CC\u0627\u0645 \u062A\u0648 \u062B\u0628\u062A \u0634\u062F. \u0645\u0645\u0646\u0648\u0646 \u06A9\u0647 \u0628\u0647 \u0628\u0647\u062A\u0631 \u0634\u062F\u0646 \u0633\u0627\u06CC\u062A \u06A9\u0645\u06A9 \u0645\u06CC\u200C\u06A9\u0646\u06CC.",
      "acc.noFeedback": "\u067E\u06CC\u0627\u0645\u06CC \u0627\u0631\u0633\u0627\u0644 \u0646\u06A9\u0631\u062F\u0647\u200C\u0627\u06CC",
      "acc.profileSaved": "\u067E\u0631\u0648\u0641\u0627\u06CC\u0644 \u0630\u062E\u06CC\u0631\u0647 \u0634\u062F",
      "acc.passwordChange": "\u062A\u063A\u06CC\u06CC\u0631 \u0631\u0645\u0632 \u0639\u0628\u0648\u0631",
      "acc.currentPassword": "\u0631\u0645\u0632 \u0639\u0628\u0648\u0631 \u0641\u0639\u0644\u06CC",
      "acc.newPassword2": "\u0631\u0645\u0632 \u0639\u0628\u0648\u0631 \u062C\u062F\u06CC\u062F",
      "acc.passwordChanged": "\u0631\u0645\u0632 \u0639\u0628\u0648\u0631 \u062A\u063A\u06CC\u06CC\u0631 \u06A9\u0631\u062F",
      "acc.2faSection": "\u0648\u0631\u0648\u062F \u062F\u0648\u0645\u0631\u062D\u0644\u0647\u200C\u0627\u06CC (2FA)",
      "acc.2faOff": "\u063A\u06CC\u0631\u0641\u0639\u0627\u0644 \u2014 \u0628\u0631\u0627\u06CC \u0627\u0645\u0646\u06CC\u062A \u0628\u06CC\u0634\u062A\u0631 \u0631\u0648\u0634\u0646\u0634 \u06A9\u0646.",
      "acc.2faOn": "\u0641\u0639\u0627\u0644",
      "acc.2faEnable": "\u0641\u0639\u0627\u0644\u200C\u0633\u0627\u0632\u06CC \u0648\u0631\u0648\u062F \u062F\u0648\u0645\u0631\u062D\u0644\u0647\u200C\u0627\u06CC",
      "acc.2faDisable": "\u063A\u06CC\u0631\u0641\u0639\u0627\u0644\u200C\u0633\u0627\u0632\u06CC",
      "acc.2faScan": "\u0627\u06CC\u0646 \u06A9\u062F QR \u0631\u0627 \u0628\u0627 \u0627\u067E \u0627\u062D\u0631\u0627\u0632 \u0647\u0648\u06CC\u062A (\u0645\u062B\u0644 Google Authenticator) \u0627\u0633\u06A9\u0646 \u06A9\u0646 \u06CC\u0627 \u06A9\u0644\u06CC\u062F \u0631\u0627 \u062F\u0633\u062A\u06CC \u0648\u0627\u0631\u062F \u06A9\u0646.",
      "acc.2faKey": "\u06A9\u0644\u06CC\u062F \u062F\u0633\u062A\u06CC",
      "acc.2faEnterCode": "\u06A9\u062F \u06F6 \u0631\u0642\u0645\u06CC \u0627\u067E \u0631\u0627 \u0648\u0627\u0631\u062F \u06A9\u0646 \u062A\u0627 \u0641\u0639\u0627\u0644 \u0634\u0648\u062F",
      "acc.2faEnabled": "\u0648\u0631\u0648\u062F \u062F\u0648\u0645\u0631\u062D\u0644\u0647\u200C\u0627\u06CC \u0641\u0639\u0627\u0644 \u0634\u062F",
      "acc.2faDisabled": "\u0648\u0631\u0648\u062F \u062F\u0648\u0645\u0631\u062D\u0644\u0647\u200C\u0627\u06CC \u063A\u06CC\u0631\u0641\u0639\u0627\u0644 \u0634\u062F",
      "acc.2faBackup": "\u06A9\u062F\u0647\u0627\u06CC \u067E\u0634\u062A\u06CC\u0628\u0627\u0646 (\u0646\u06AF\u0647\u0634\u0627\u0646 \u062F\u0627\u0631)",
      "acc.2faBackupHint": "\u0627\u06AF\u0631 \u062F\u0633\u062A\u0631\u0633\u06CC \u0628\u0647 \u0627\u067E \u0631\u0627 \u0627\u0632 \u062F\u0633\u062A \u062F\u0627\u062F\u06CC\u060C \u0628\u0627 \u0627\u06CC\u0646 \u06A9\u062F\u0647\u0627 \u0648\u0627\u0631\u062F \u0634\u0648. \u0647\u0631 \u06A9\u062F \u0641\u0642\u0637 \u06CC\u06A9\u200C\u0628\u0627\u0631 \u0645\u0635\u0631\u0641 \u0627\u0633\u062A.",
      "acc.2faMethods": "\u0631\u0648\u0634\u200C\u0647\u0627\u06CC \u062A\u0623\u06CC\u06CC\u062F",
      "acc.sessionsText": "\u062F\u0633\u062A\u06AF\u0627\u0647\u200C\u0647\u0627\u06CC\u06CC \u06A9\u0647 \u0627\u06A9\u0646\u0648\u0646 \u0628\u0647 \u062D\u0633\u0627\u0628 \u062A\u0648 \u0648\u0627\u0631\u062F \u0647\u0633\u062A\u0646\u062F.",
      "acc.revokeAll": "\u062E\u0631\u0648\u062C \u0627\u0632 \u0647\u0645\u0647\u200C\u06CC \u062F\u0633\u062A\u06AF\u0627\u0647\u200C\u0647\u0627",
      "acc.revokeDone": "\u0646\u0634\u0633\u062A\u200C\u0647\u0627 \u0628\u0633\u062A\u0647 \u0634\u062F\u0646\u062F",
      "acc.current": "\u0647\u0645\u06CC\u0646 \u062F\u0633\u062A\u06AF\u0627\u0647",
      "acc.prefsText": "\u0627\u06CC\u0646 \u062A\u0646\u0638\u06CC\u0645\u0627\u062A \u0641\u0642\u0637 \u0631\u0648\u06CC \u0647\u0645\u06CC\u0646 \u062F\u0633\u062A\u06AF\u0627\u0647 \u0627\u0639\u0645\u0627\u0644 \u0645\u06CC\u200C\u0634\u0648\u062F.",
      "acc.prefTheme": "\u067E\u0648\u0633\u062A\u0647",
      "acc.prefLang": "\u0632\u0628\u0627\u0646",
      "acc.prefDensity": "\u062A\u0631\u0627\u06A9\u0645 \u0646\u0645\u0627\u06CC\u0634",
      "acc.prefMotion": "\u0627\u0646\u06CC\u0645\u06CC\u0634\u0646\u200C\u0647\u0627",
      "acc.prefNotif": "\u0627\u0639\u0644\u0627\u0646\u200C\u0647\u0627",
      "acc.notifMarketing": "\u062A\u062E\u0641\u06CC\u0641\u200C\u0647\u0627 \u0648 \u067E\u06CC\u0634\u0646\u0647\u0627\u062F\u0647\u0627",
      "acc.notifOrders": "\u0648\u0636\u0639\u06CC\u062A \u0633\u0641\u0627\u0631\u0634\u200C\u0647\u0627",
      "acc.notifRestock": "\u0645\u0648\u062C\u0648\u062F \u0634\u062F\u0646 \u06A9\u0627\u0644\u0627\u0647\u0627\u06CC \u0644\u06CC\u0633\u062A \u0645\u0646",
      "acc.notifSupport": "\u067E\u0634\u062A\u06CC\u0628\u0627\u0646\u06CC \u0648 \u067E\u0627\u0633\u062E \u062A\u06CC\u06A9\u062A\u200C\u0647\u0627",
      "acc.exportData": "\u062F\u0631\u06CC\u0627\u0641\u062A \u062F\u0627\u062F\u0647\u200C\u0647\u0627\u06CC \u0645\u0646",
      "acc.exportHint": "\u0647\u0645\u0647\u200C\u06CC \u0627\u0637\u0644\u0627\u0639\u0627\u062A \u062D\u0633\u0627\u0628\u060C \u0633\u0641\u0627\u0631\u0634\u200C\u0647\u0627\u060C \u0646\u0638\u0631\u0627\u062A \u0648 \u062A\u06CC\u06A9\u062A\u200C\u0647\u0627 \u0631\u0627 \u0628\u0647\u200C\u0635\u0648\u0631\u062A JSON \u062F\u0627\u0646\u0644\u0648\u062F \u06A9\u0646.",
      "acc.deleteAccount": "\u062D\u0630\u0641 \u062D\u0633\u0627\u0628 \u06A9\u0627\u0631\u0628\u0631\u06CC",
      "acc.deleteWarn": "\u0628\u0627 \u062D\u0630\u0641 \u062D\u0633\u0627\u0628\u060C \u062F\u0627\u062F\u0647\u200C\u0647\u0627\u06CC \u0634\u062E\u0635\u06CC \u067E\u0627\u06A9 \u0645\u06CC\u200C\u0634\u0648\u062F\u061B \u0633\u0648\u0627\u0628\u062F \u0645\u0627\u0644\u06CC \u0633\u0641\u0627\u0631\u0634\u200C\u0647\u0627 \u0637\u0628\u0642 \u0642\u0627\u0646\u0648\u0646 \u0646\u06AF\u0647 \u062F\u0627\u0634\u062A\u0647 \u0645\u06CC\u200C\u0634\u0648\u062F.",
      "acc.deleteConfirm": "\u0628\u0631\u0627\u06CC \u062D\u0630\u0641 \u062D\u0633\u0627\u0628\u060C \u0631\u0645\u0632 \u0639\u0628\u0648\u0631 \u0631\u0627 \u0648\u0627\u0631\u062F \u06A9\u0646",
      "acc.pointsText": "\u0628\u0647 \u0627\u0632\u0627\u06CC \u0647\u0631 \u06F1\u06F0\u06F0\u066C\u06F0\u06F0\u06F0 \u062A\u0648\u0645\u0627\u0646 \u062E\u0631\u06CC\u062F\u060C \u06F1 \u0627\u0645\u062A\u06CC\u0627\u0632 \u0645\u06CC\u200C\u06AF\u06CC\u0631\u06CC.",
      "acc.referralCode": "\u06A9\u062F \u0645\u0639\u0631\u0641 \u062A\u0648",
      "acc.referralText": "\u0627\u06CC\u0646 \u06A9\u062F \u0631\u0627 \u0628\u0647 \u0627\u0634\u062A\u0631\u0627\u06A9 \u0628\u06AF\u0630\u0627\u0631\u061B \u0647\u0631 \u062F\u0648 \u06F5\u06F0 \u0627\u0645\u062A\u06CC\u0627\u0632 \u0645\u06CC\u200C\u06AF\u06CC\u0631\u06CC\u062F.",
      "chat.title": "\u067E\u0634\u062A\u06CC\u0628\u0627\u0646\u06CC \u0622\u0646\u0644\u0627\u06CC\u0646 \u06AF\u0631\u06CC\u0646 \u0627\u067E\u0644",
      "chat.online": "\u0645\u0639\u0645\u0648\u0644\u0627\u064B \u062F\u0631 \u0686\u0646\u062F \u062F\u0642\u06CC\u0642\u0647 \u067E\u0627\u0633\u062E \u0645\u06CC\u200C\u062F\u0647\u06CC\u0645",
      "chat.open": "\u0634\u0631\u0648\u0639 \u06AF\u0641\u062A\u200C\u0648\u06AF\u0648",
      "chat.minimize": "\u0628\u0633\u062A\u0646",
      "chat.loginFirst": "\u0628\u0631\u0627\u06CC \u06AF\u0641\u062A\u200C\u0648\u06AF\u0648 \u0628\u0627 \u067E\u0634\u062A\u06CC\u0628\u0627\u0646\u06CC \u0648\u0627\u0631\u062F \u062D\u0633\u0627\u0628 \u0634\u0648.",
      "chat.sent": "\u067E\u06CC\u0627\u0645 \u0627\u0631\u0633\u0627\u0644 \u0634\u062F",
      "chat.typing": "\u067E\u0634\u062A\u06CC\u0628\u0627\u0646\u06CC \u062F\u0631 \u062D\u0627\u0644 \u0646\u0648\u0634\u062A\u0646\u2026",
      "chat.quick": "\u0633\u0624\u0627\u0644\u0627\u062A \u067E\u0631\u062A\u06A9\u0631\u0627\u0631",
      "notif.new": "\u0627\u0639\u0644\u0627\u0646 \u062C\u062F\u06CC\u062F",
      "notif.markRead": "\u062E\u0648\u0627\u0646\u062F\u0647 \u0634\u062F",
      "notif.viewAll": "\u0645\u0634\u0627\u0647\u062F\u0647\u200C\u06CC \u0647\u0645\u0647\u200C\u06CC \u0627\u0639\u0644\u0627\u0646\u200C\u0647\u0627",
      "notif.empty": "\u0627\u0639\u0644\u0627\u0646\u06CC \u0646\u062F\u0627\u0631\u06CC",
      "notif.type.announcement": "\u0627\u0637\u0644\u0627\u0639\u06CC\u0647",
      "notif.type.order": "\u0633\u0641\u0627\u0631\u0634",
      "notif.type.restock": "\u0645\u0648\u062C\u0648\u062F \u0634\u062F\u0646 \u06A9\u0627\u0644\u0627",
      "notif.type.ticket": "\u062A\u06CC\u06A9\u062A",
      "notif.type.support": "\u067E\u0634\u062A\u06CC\u0628\u0627\u0646\u06CC",
      "notif.type.review": "\u0646\u0638\u0631",
      "notif.type.plus": "\u0627\u0634\u062A\u0631\u0627\u06A9 \u067E\u0644\u0627\u0633",
      "notif.type.wallet": "\u06A9\u06CC\u0641 \u067E\u0648\u0644",
      "notif.type.account": "\u062D\u0633\u0627\u0628 \u06A9\u0627\u0631\u0628\u0631\u06CC",
      "notif.type.feedback": "\u0628\u0627\u0632\u062E\u0648\u0631\u062F",
      "notif.type.admin_alert": "\u0647\u0634\u062F\u0627\u0631 \u0645\u062F\u06CC\u0631",
      "notif.type.news": "\u062E\u0628\u0631",
      "notif.type.offer": "\u067E\u06CC\u0634\u0646\u0647\u0627\u062F \u0648\u06CC\u0698\u0647",
      "notif.type.system": "\u0633\u0627\u0645\u0627\u0646\u0647",
      "notif.type.info": "\u0627\u0637\u0644\u0627\u0639\u200C\u0631\u0633\u0627\u0646\u06CC",
      "notif.type.welcome": "\u062E\u0648\u0634\u200C\u0622\u0645\u062F\u06AF\u0648\u06CC\u06CC",
      "consent.title": "\u0628\u0647 \u06AF\u0631\u06CC\u0646 \u0627\u067E\u0644 \u062E\u0648\u0634 \u0622\u0645\u062F\u06CC",
      "consent.text": "\u0644\u0637\u0641\u0627\u064B \u067E\u06CC\u0634 \u0627\u0632 \u0627\u062F\u0627\u0645\u0647\u060C \u0645\u0648\u0627\u0631\u062F \u0632\u06CC\u0631 \u0631\u0627 \u0628\u062E\u0648\u0627\u0646 \u0648 \u0628\u067E\u0630\u06CC\u0631. \u0645\u0627 \u0627\u0632 \u062D\u0627\u0641\u0638\u0647\u200C\u06CC \u0645\u0631\u0648\u0631\u06AF\u0631 \u0628\u0631\u0627\u06CC \u0628\u0647\u062A\u0631 \u06A9\u0631\u062F\u0646 \u062A\u062C\u0631\u0628\u0647\u200C\u06CC \u062E\u0631\u06CC\u062F \u0627\u0633\u062A\u0641\u0627\u062F\u0647 \u0645\u06CC\u200C\u06A9\u0646\u06CC\u0645 \u0648 \u0637\u0628\u0642 \u062D\u0631\u06CC\u0645 \u062E\u0635\u0648\u0635\u06CC\u060C \u0645\u0631\u0627\u0642\u0628 \u062F\u0627\u062F\u0647\u200C\u0647\u0627\u06CC \u0634\u062E\u0635\u06CC \u062A\u0648 \u0647\u0633\u062A\u06CC\u0645.",
      "consent.terms": "\u0642\u0648\u0627\u0646\u06CC\u0646 \u0648 \u0645\u0642\u0631\u0631\u0627\u062A \u0631\u0627 \u062E\u0648\u0627\u0646\u062F\u0647\u200C\u0627\u0645 \u0648 \u0645\u06CC\u200C\u067E\u0630\u06CC\u0631\u0645.",
      "consent.privacy": "\u062D\u0631\u06CC\u0645 \u062E\u0635\u0648\u0635\u06CC \u0631\u0627 \u0645\u06CC\u200C\u067E\u0630\u06CC\u0631\u0645.",
      "consent.marketing": "\u062F\u0648\u0633\u062A \u062F\u0627\u0631\u0645 \u0627\u0632 \u062A\u062E\u0641\u06CC\u0641\u200C\u0647\u0627 \u0648 \u06A9\u0627\u0644\u0627\u0647\u0627\u06CC \u062C\u062F\u06CC\u062F \u0628\u0627\u062E\u0628\u0631 \u0634\u0648\u0645 (\u0627\u062E\u062A\u06CC\u0627\u0631\u06CC).",
      "consent.accept": "\u0645\u06CC\u200C\u067E\u0630\u06CC\u0631\u0645 \u0648 \u0648\u0627\u0631\u062F \u0633\u0627\u06CC\u062A \u0645\u06CC\u200C\u0634\u0648\u0645",
      "consent.readTerms": "\u062E\u0648\u0627\u0646\u062F\u0646 \u0642\u0648\u0627\u0646\u06CC\u0646",
      "consent.readPrivacy": "\u062E\u0648\u0627\u0646\u062F\u0646 \u062D\u0631\u06CC\u0645 \u062E\u0635\u0648\u0635\u06CC",
      "consent.thanks": "\u0645\u0645\u0646\u0648\u0646! \u067E\u0630\u06CC\u0631\u0634 \u062A\u0648 \u062B\u0628\u062A \u0634\u062F.",
      "consent.manage": "\u0645\u062F\u06CC\u0631\u06CC\u062A \u062A\u0648\u0627\u0641\u0642 \u06A9\u0648\u06A9\u06CC \u0648 \u062D\u0631\u06CC\u0645 \u062E\u0635\u0648\u0635\u06CC",
      "social.instagram": "\u0627\u06CC\u0646\u0633\u062A\u0627\u06AF\u0631\u0627\u0645",
      "home.partnersTitle": "\u0628\u0631\u0646\u062F\u0647\u0627\u06CC\u06CC \u06A9\u0647 \u0628\u0627 \u0622\u0646\u200C\u0647\u0627 \u06A9\u0627\u0631 \u0645\u06CC\u200C\u06A9\u0646\u06CC\u0645",
      "stats.title": "\u0622\u0645\u0627\u0631 \u0632\u0646\u062F\u0647\u0654 \u0641\u0631\u0648\u0634\u06AF\u0627\u0647",
      "stats.subtitle": "\u0639\u062F\u062F\u0647\u0627\u06CC \u0648\u0627\u0642\u0639\u06CC \u0641\u0631\u0648\u0634\u06AF\u0627\u0647\u060C \u0628\u0647\u200C\u0631\u0648\u0632 \u0648 \u0628\u062F\u0648\u0646 \u067E\u0631\u062F\u0647.",
      "stats.chartTitle": "\u0628\u0627\u0632\u062F\u06CC\u062F \u06F1\u06F4 \u0631\u0648\u0632 \u0627\u062E\u06CC\u0631",
      "stats.chartHint": "\u0627\u0631\u062A\u0641\u0627\u0639 \u0647\u0631 \u0633\u062A\u0648\u0646 \u06CC\u0639\u0646\u06CC \u062A\u0639\u062F\u0627\u062F \u0628\u0627\u0632\u062F\u06CC\u062F \u0647\u0645\u0627\u0646 \u0631\u0648\u0632.",
      "stats.topTitle": "\u067E\u0631\u0641\u0631\u0648\u0634\u200C\u0647\u0627\u06CC \u0627\u062E\u06CC\u0631",
      "adm.sPartners": "\u0628\u0631\u0646\u062F\u0647\u0627 \u0648 \u0634\u0631\u06A9\u0627",
      "adm.ptFa": "\u0646\u0627\u0645 \u0641\u0627\u0631\u0633\u06CC",
      "adm.ptEn": "Name (EN)",
      "adm.ptAdd": "\u0627\u0641\u0632\u0648\u062F\u0646 \u0628\u0631\u0646\u062F",
      "adm.ptHint": "\u0627\u06CC\u0646 \u0646\u0627\u0645\u200C\u0647\u0627 \u0628\u0647\u200C\u0635\u0648\u0631\u062A \u0646\u0648\u0627\u0631 \u0645\u062A\u062D\u0631\u06A9 \u062F\u0631 \u0635\u0641\u062D\u0647\u0654 \u0627\u0635\u0644\u06CC \u0646\u0645\u0627\u06CC\u0634 \u062F\u0627\u062F\u0647 \u0645\u06CC\u200C\u0634\u0648\u0646\u062F\u061B \u062A\u0631\u062A\u06CC\u0628 \u0631\u0627 \u062E\u0648\u062F\u062A \u0628\u0686\u06CC\u0646.",
      "feat.partners": "\u0646\u0648\u0627\u0631 \u0628\u0631\u0646\u062F\u0647\u0627\u06CC \u0647\u0645\u06A9\u0627\u0631",
      "auth.pwdLater": "\u0628\u0639\u062F\u0627\u064B \u062A\u063A\u06CC\u06CC\u0631 \u0645\u06CC\u200C\u062F\u0647\u0645",
      "auth.pwdLaterToast": "\u0628\u0627\u0634\u0647\u061B \u0647\u0631 \u0648\u0642\u062A \u062E\u0648\u0627\u0633\u062A\u06CC \u0627\u0632 \xAB\u062D\u0633\u0627\u0628 \u0645\u0646 \u2192 \u062A\u063A\u06CC\u06CC\u0631 \u0631\u0645\u0632 \u0639\u0628\u0648\u0631\xBB \u0627\u0646\u062C\u0627\u0645\u0634 \u0628\u062F\u0647.",
      "social.telegram": "\u062A\u0644\u06AF\u0631\u0627\u0645",
      "social.eitaa": "\u0627\u06CC\u062A\u0627",
      "social.whatsapp": "\u0648\u0627\u062A\u0633\u0627\u067E",
      "consent.rejectOptional": "\u067E\u0630\u06CC\u0631\u0634 \u0641\u0642\u0637 \u0645\u0648\u0627\u0631\u062F \u0636\u0631\u0648\u0631\u06CC",
      "consent.ttlNote": "\u0627\u0646\u062A\u062E\u0627\u0628 \u062A\u0648 \u062A\u0627 \u06F1\u06F8\u06F0 \u0631\u0648\u0632 \u0645\u0639\u062A\u0628\u0631 \u0627\u0633\u062A \u0648 \u067E\u0633 \u0627\u0632 \u0622\u0646 \u062F\u0648\u0628\u0627\u0631\u0647 \u067E\u0631\u0633\u06CC\u062F\u0647 \u0645\u06CC\u200C\u0634\u0648\u062F.",
      "contact.title": "\u062A\u0645\u0627\u0633 \u0628\u0627 \u0645\u0627",
      "contact.mapTitle": "\u06A9\u0631\u0648\u06A9\u06CC \u0645\u062D\u0644 \u0641\u0631\u0648\u0634\u06AF\u0627\u0647",
      "contact.mapHint": "\u0628\u0631\u0627\u06CC \u0628\u0627\u0632 \u0634\u062F\u0646 \u062F\u0631 \u0628\u0631\u0646\u0627\u0645\u0647\u200C\u06CC \u0646\u0642\u0634\u0647 \u06A9\u0644\u06CC\u06A9 \u06A9\u0646",
      "contact.mapAsk": "\u06A9\u062F\u0627\u0645 \u0646\u0642\u0634\u0647 \u0628\u0627\u0632 \u0634\u0648\u062F\u061F",
      "contact.mapPermission": "\u0627\u06AF\u0631 \u0627\u062C\u0627\u0632\u0647\u200C\u06CC \u0645\u0648\u0642\u0639\u06CC\u062A \u0628\u062F\u0647\u06CC\u060C \u0645\u0633\u06CC\u0631 \u062D\u0631\u06A9\u062A \u0627\u0632 \u062C\u0627\u06CC \u0641\u0639\u0644\u06CC\u200C\u0627\u062A \u062A\u0627 \u0645\u063A\u0627\u0632\u0647 \u0631\u0627 \u0646\u0634\u0627\u0646 \u0645\u06CC\u200C\u062F\u0647\u06CC\u0645.",
      "contact.allowLocation": "\u0627\u062C\u0627\u0632\u0647\u200C\u06CC \u062F\u0633\u062A\u0631\u0633\u06CC \u0628\u0647 \u0645\u0648\u0642\u0639\u06CC\u062A",
      "contact.denyLocation": "\u0627\u062F\u0627\u0645\u0647 \u0628\u062F\u0648\u0646 \u0645\u0648\u0642\u0639\u06CC\u062A",
      "contact.openMaps": "\u0628\u0627\u0632 \u06A9\u0631\u062F\u0646 \u062F\u0631 \u0646\u0642\u0634\u0647",
      "contact.copyAddress": "\u06A9\u067E\u06CC \u0622\u062F\u0631\u0633",
      "contact.hours": "\u0633\u0627\u0639\u062A \u06A9\u0627\u0631\u06CC",
      "contact.phone": "\u062A\u0644\u0641\u0646 \u0641\u0631\u0648\u0634\u06AF\u0627\u0647",
      "contact.mobile": "\u0645\u0648\u0628\u0627\u06CC\u0644 \u0648 \u0648\u0627\u062A\u0633\u0627\u067E",
      "contact.emailUs": "\u0627\u06CC\u0645\u06CC\u0644",
      "contact.addressUs": "\u0622\u062F\u0631\u0633",
      "contact.callNow": "\u062A\u0645\u0627\u0633 \u0628\u06AF\u06CC\u0631",
      "contact.whatsapp": "\u067E\u06CC\u0627\u0645 \u062F\u0631 \u0648\u0627\u062A\u0633\u0627\u067E",
      "contact.locationOn": "\u0645\u0648\u0642\u0639\u06CC\u062A \u062A\u0642\u0631\u06CC\u0628\u06CC \u062A\u0648 \u067E\u06CC\u062F\u0627 \u0634\u062F",
      "contact.locationDenied": "\u062F\u0633\u062A\u0631\u0633\u06CC \u0628\u0647 \u0645\u0648\u0642\u0639\u06CC\u062A \u062F\u0627\u062F\u0647 \u0646\u0634\u062F\u061B \u0646\u0642\u0634\u0647 \u0628\u062F\u0648\u0646 \u0645\u0628\u062F\u0623 \u0628\u0627\u0632 \u0645\u06CC\u200C\u0634\u0648\u062F.",
      "contact.formTitle": "\u0627\u0631\u0633\u0627\u0644 \u067E\u06CC\u0627\u0645 \u0633\u0631\u06CC\u0639",
      "contact.formText": "\u062A\u0645\u0627\u0633 \u06AF\u0631\u0641\u062A\u0646 \u0631\u0627 \u062F\u0648\u0633\u062A \u0646\u062F\u0627\u0631\u06CC\u061F \u067E\u06CC\u0627\u0645 \u0628\u06AF\u0630\u0627\u0631 \u06CC\u0627 \u062A\u06CC\u06A9\u062A \u0628\u0632\u0646.",
      "contact.neshan": "\u0646\u0634\u0627\u0646",
      "contact.balad": "\u0628\u0644\u062F",
      "contact.google": "\u06AF\u0648\u06AF\u0644 \u0645\u067E",
      "contact.osm": "\u0627\u0648\u067E\u0646\u200C\u0627\u0633\u062A\u0631\u06CC\u062A\u200C\u0645\u067E",
      "contact.tgBotTitle": "\u0631\u0628\u0627\u062A \u067E\u0634\u062A\u06CC\u0628\u0627\u0646\u06CC \u062A\u0644\u06AF\u0631\u0627\u0645",
      "contact.tgBotText": "\u067E\u06CC\u06AF\u06CC\u0631\u06CC \u0633\u0641\u0627\u0631\u0634\u060C \u062C\u0633\u062A\u062C\u0648\u06CC \u06A9\u0627\u0644\u0627 \u0648 \u06AF\u0641\u062A\u200C\u0648\u06AF\u0648 \u0628\u0627 \u067E\u0634\u062A\u06CC\u0628\u0627\u0646\u06CC \u2014 \u0634\u0628\u0627\u0646\u0647\u200C\u0631\u0648\u0632 \u062F\u0631 \u062A\u0644\u06AF\u0631\u0627\u0645. \u06A9\u0627\u0641\u06CC \u0627\u0633\u062A /start \u0628\u0632\u0646\u06CC.",
      "contact.tgBotBtn": "\u0628\u0627\u0632 \u06A9\u0631\u062F\u0646 \u0631\u0628\u0627\u062A \u062F\u0631 \u062A\u0644\u06AF\u0631\u0627\u0645",
      "compare.title": "\u0645\u0642\u0627\u06CC\u0633\u0647\u200C\u06CC \u06A9\u0627\u0644\u0627\u0647\u0627",
      "compare.empty": "\u06A9\u0627\u0644\u0627\u06CC\u06CC \u0628\u0631\u0627\u06CC \u0645\u0642\u0627\u06CC\u0633\u0647 \u0627\u0646\u062A\u062E\u0627\u0628 \u0646\u0634\u062F\u0647",
      "compare.emptyText": "\u0627\u0632 \u062F\u06A9\u0645\u0647\u200C\u06CC \u0645\u0642\u0627\u06CC\u0633\u0647 \u0631\u0648\u06CC \u06A9\u0627\u0631\u062A \u06A9\u0627\u0644\u0627 \u0627\u0633\u062A\u0641\u0627\u062F\u0647 \u06A9\u0646 (\u062A\u0627 \u06F4 \u06A9\u0627\u0644\u0627).",
      "compare.add": "\u0627\u0641\u0632\u0648\u062F\u0646 \u0628\u0647 \u0645\u0642\u0627\u06CC\u0633\u0647",
      "compare.remove": "\u062D\u0630\u0641",
      "priceCheck.title": "\u0627\u0633\u062A\u0639\u0644\u0627\u0645 \u0642\u06CC\u0645\u062A \u0628\u0627 \u0628\u0627\u0631\u06A9\u062F",
      "priceCheck.sub": "\u0628\u0627\u0631\u06A9\u062F \u0631\u0627 \u0628\u0627 \u062F\u0633\u062A\u06AF\u0627\u0647 \u0627\u0633\u06A9\u0646 \u06A9\u0646 \u06CC\u0627 \u062F\u0633\u062A\u06CC \u0648\u0627\u0631\u062F \u06A9\u0646.",
      "priceCheck.input": "\u0628\u0627\u0631\u06A9\u062F \u06CC\u0627 \u06A9\u062F \u06A9\u0627\u0644\u0627",
      "priceCheck.scanCamera": "\u0627\u0633\u06A9\u0646 \u0628\u0627 \u062F\u0648\u0631\u0628\u06CC\u0646",
      "priceCheck.stopCamera": "\u062A\u0648\u0642\u0641 \u062F\u0648\u0631\u0628\u06CC\u0646",
      "priceCheck.waiting": "\u062F\u0631 \u0627\u0646\u062A\u0638\u0627\u0631 \u0627\u0633\u06A9\u0646\u2026",
      "priceCheck.notFound": "\u06A9\u0627\u0644\u0627\u06CC\u06CC \u0628\u0627 \u0627\u06CC\u0646 \u0628\u0627\u0631\u06A9\u062F \u067E\u06CC\u062F\u0627 \u0646\u0634\u062F",
      "priceCheck.found": "\u06A9\u0627\u0644\u0627 \u067E\u06CC\u062F\u0627 \u0634\u062F",
      "priceCheck.cameraUnsupported": "\u062F\u0648\u0631\u0628\u06CC\u0646 \u062F\u0631 \u062F\u0633\u062A\u0631\u0633 \u0646\u06CC\u0633\u062A. \u0627\u0632 \u062F\u0633\u062A\u06AF\u0627\u0647 \u0628\u0627\u0631\u06A9\u062F\u062E\u0648\u0627\u0646 \u06CC\u0627 \u0648\u0631\u0648\u062F \u062F\u0633\u062A\u06CC \u0627\u0633\u062A\u0641\u0627\u062F\u0647 \u06A9\u0646.",
      "priceCheck.cameraDenied": "\u062F\u0633\u062A\u0631\u0633\u06CC \u0628\u0647 \u062F\u0648\u0631\u0628\u06CC\u0646 \u062F\u0627\u062F\u0647 \u0646\u0634\u062F.",
      "priceCheck.deviceMode": "\u062D\u0627\u0644\u062A \u06A9\u06CC\u0648\u0633\u06A9 (\u062A\u0645\u0627\u0645\u200C\u0635\u0641\u062D\u0647)",
      "priceCheck.lastScan": "\u0622\u062E\u0631\u06CC\u0646 \u0627\u0633\u06A9\u0646",
      "priceCheck.fullscreen": "\u062A\u0645\u0627\u0645\u200C\u0635\u0641\u062D\u0647",
      "err.generic": "\u0645\u0634\u06A9\u0644\u06CC \u067E\u06CC\u0634 \u0622\u0645\u062F. \u062F\u0648\u0628\u0627\u0631\u0647 \u062A\u0644\u0627\u0634 \u06A9\u0646.",
      "err.network": "\u0627\u062A\u0635\u0627\u0644 \u0628\u0647 \u0633\u0631\u0648\u0631 \u0628\u0631\u0642\u0631\u0627\u0631 \u0646\u0634\u062F.",
      "err.notFound": "\u0635\u0641\u062D\u0647 \u067E\u06CC\u062F\u0627 \u0646\u0634\u062F",
      "err.notFoundText": "\u0645\u0645\u06A9\u0646 \u0627\u0633\u062A \u0646\u0634\u0627\u0646\u06CC \u0627\u0634\u062A\u0628\u0627\u0647 \u0628\u0627\u0634\u062F \u06CC\u0627 \u0635\u0641\u062D\u0647 \u062D\u0630\u0641 \u0634\u062F\u0647 \u0628\u0627\u0634\u062F.",
      "err.goHome": "\u0628\u0631\u0648 \u0628\u0647 \u0635\u0641\u062D\u0647\u200C\u06CC \u0627\u0635\u0644\u06CC",
      "err.offline": "\u0622\u0641\u0644\u0627\u06CC\u0646 \u0647\u0633\u062A\u06CC. \u062F\u0627\u062F\u0647\u200C\u0647\u0627\u06CC \u0630\u062E\u06CC\u0631\u0647\u200C\u0634\u062F\u0647 \u0646\u0645\u0627\u06CC\u0634 \u062F\u0627\u062F\u0647 \u0645\u06CC\u200C\u0634\u0648\u062F.",
      "err.online": "\u062F\u0648\u0628\u0627\u0631\u0647 \u0622\u0646\u0644\u0627\u06CC\u0646 \u0634\u062F\u06CC",
      "err.loginRequired": "\u0628\u0631\u0627\u06CC \u062F\u06CC\u062F\u0646 \u0627\u06CC\u0646 \u0628\u062E\u0634 \u0628\u0627\u06CC\u062F \u0648\u0627\u0631\u062F \u062D\u0633\u0627\u0628 \u0634\u0648\u06CC.",
      "err.forbidden": "\u0628\u0647 \u0627\u06CC\u0646 \u0628\u062E\u0634 \u062F\u0633\u062A\u0631\u0633\u06CC \u0646\u062F\u0627\u0631\u06CC.",
      "adm.title": "\u067E\u0646\u0644 \u0645\u062F\u06CC\u0631\u06CC\u062A",
      "adm.dashboard": "\u062F\u0627\u0634\u0628\u0648\u0631\u062F",
      "adm.products": "\u06A9\u0627\u0644\u0627\u0647\u0627",
      "adm.productNew": "\u0627\u0641\u0632\u0648\u062F\u0646 \u06A9\u0627\u0644\u0627",
      "adm.productEdit": "\u0648\u06CC\u0631\u0627\u06CC\u0634 \u06A9\u0627\u0644\u0627",
      "adm.categories": "\u062F\u0633\u062A\u0647\u200C\u0647\u0627 \u0648 \u0628\u0631\u0646\u062F\u0647\u0627",
      "adm.orders": "\u0633\u0641\u0627\u0631\u0634\u200C\u0647\u0627",
      "adm.reviews": "\u0646\u0638\u0631\u0627\u062A \u0648 \u0633\u0624\u0627\u0644\u0627\u062A",
      "adm.tickets": "\u062A\u06CC\u06A9\u062A\u200C\u0647\u0627",
      "adm.supportChat": "\u0686\u062A \u067E\u0634\u062A\u06CC\u0628\u0627\u0646\u06CC",
      "adm.feedback": "\u0628\u0627\u0632\u062E\u0648\u0631\u062F\u0647\u0627 \u0648 \u062E\u0637\u0627\u0647\u0627",
      "adm.users": "\u06A9\u0627\u0631\u0628\u0631\u0627\u0646 \u0648 \u062F\u0633\u062A\u0631\u0633\u06CC\u200C\u0647\u0627",
      "adm.wallet": "\u06A9\u06CC\u0641 \u067E\u0648\u0644 \u06A9\u0627\u0631\u0628\u0631\u0627\u0646",
      "adm.coupons": "\u06A9\u062F\u0647\u0627\u06CC \u062A\u062E\u0641\u06CC\u0641",
      "adm.ads": "\u062A\u0628\u0644\u06CC\u063A\u0627\u062A",
      "adm.notifications": "\u0627\u0639\u0644\u0627\u0646\u200C\u0647\u0627",
      "adm.settings": "\u062A\u0646\u0638\u06CC\u0645\u0627\u062A \u0641\u0631\u0648\u0634\u06AF\u0627\u0647",
      "adm.theme": "\u067E\u0648\u0633\u062A\u0647 \u0648 \u0686\u06CC\u062F\u0645\u0627\u0646",
      "adm.features": "\u0627\u0645\u06A9\u0627\u0646\u0627\u062A",
      "adm.shipping": "\u0627\u0631\u0633\u0627\u0644 \u0648 \u0628\u06CC\u0645\u0647",
      "adm.plus": "\u0627\u0634\u062A\u0631\u0627\u06A9 \u067E\u0644\u0627\u0633",
      "adm.pages": "\u0645\u062D\u062A\u0648\u0627\u06CC \u0635\u0641\u062D\u0647\u200C\u0647\u0627",
      "adm.barcode": "\u0628\u0627\u0631\u06A9\u062F \u0648 \u0628\u0631\u0686\u0633\u0628",
      "adm.imageSearch": "\u062C\u0633\u062A\u200C\u0648\u062C\u0648\u06CC \u062A\u0635\u0648\u06CC\u0631\u06CC",
      "adm.audit": "\u06AF\u0632\u0627\u0631\u0634 \u0631\u0648\u06CC\u062F\u0627\u062F\u0647\u0627",
      "adm.stats": "\u0622\u0645\u0627\u0631",
      "adm.export": "\u062E\u0631\u0648\u062C\u06CC \u0648 \u067E\u0634\u062A\u06CC\u0628\u0627\u0646",
      "adm.maintenance": "\u0646\u06AF\u0647\u062F\u0627\u0631\u06CC",
      "adm.backToSite": "\u0628\u0627\u0632\u06AF\u0634\u062A \u0628\u0647 \u0633\u0627\u06CC\u062A",
      "adm.kpi.ordersToday": "\u0633\u0641\u0627\u0631\u0634 \u0627\u0645\u0631\u0648\u0632",
      "adm.kpi.visits": "\u0628\u0627\u0632\u062F\u06CC\u062F \u0627\u0645\u0631\u0648\u0632",
      "adm.kpi.pending": "\u062F\u0631 \u0627\u0646\u062A\u0638\u0627\u0631 \u0628\u0631\u0631\u0633\u06CC",
      "adm.kpi.revenueTotal": "\u062F\u0631\u0622\u0645\u062F \u06A9\u0644",
      "adm.kpi.users": "\u06A9\u0627\u0631\u0628\u0631\u0627\u0646",
      "adm.kpi.products": "\u06A9\u0627\u0644\u0627\u0647\u0627",
      "adm.kpi.lowStock": "\u0645\u0648\u062C\u0648\u062F\u06CC \u06A9\u0645",
      "adm.awaiting": "\u06A9\u0627\u0631\u0647\u0627\u06CC \u062F\u0631 \u0627\u0646\u062A\u0638\u0627\u0631 \u0627\u0642\u062F\u0627\u0645",
      "adm.awaiting.reviews": "\u0646\u0638\u0631\u0627\u062A \u062F\u0631 \u0627\u0646\u062A\u0638\u0627\u0631 \u062A\u0623\u06CC\u06CC\u062F",
      "adm.awaiting.tickets": "\u062A\u06CC\u06A9\u062A\u200C\u0647\u0627\u06CC \u0628\u0627\u0632",
      "adm.awaiting.orders": "\u0633\u0641\u0627\u0631\u0634\u200C\u0647\u0627\u06CC \u062F\u0631 \u0627\u0646\u062A\u0638\u0627\u0631",
      "adm.awaiting.feedback": "\u0628\u0627\u0632\u062E\u0648\u0631\u062F \u062C\u062F\u06CC\u062F",
      "adm.awaiting.chat": "\u067E\u06CC\u0627\u0645 \u062E\u0648\u0627\u0646\u062F\u0647\u200C\u0646\u0634\u062F\u0647\u200C\u06CC \u0686\u062A",
      "adm.chart": "\u0631\u0648\u0646\u062F \u06F1\u06F4 \u0631\u0648\u0632 \u0627\u062E\u06CC\u0631",
      "adm.topSelling": "\u067E\u0631\u0641\u0631\u0648\u0634\u200C\u062A\u0631\u06CC\u0646\u200C\u0647\u0627",
      "adm.lowStockList": "\u06A9\u0627\u0644\u0627\u0647\u0627\u06CC \u0628\u0627 \u0645\u0648\u062C\u0648\u062F\u06CC \u06A9\u0645",
      "adm.recentAudit": "\u0622\u062E\u0631\u06CC\u0646 \u0631\u0648\u06CC\u062F\u0627\u062F\u0647\u0627",
      "adm.storage": "\u062D\u062C\u0645 \u062F\u0627\u062F\u0647\u200C\u0647\u0627",
      "adm.pName": "\u0646\u0627\u0645 \u06A9\u0627\u0644\u0627",
      "adm.pNameEn": "\u0646\u0627\u0645 \u0627\u0646\u06AF\u0644\u06CC\u0633\u06CC",
      "adm.pCat": "\u062F\u0633\u062A\u0647\u200C\u0628\u0646\u062F\u06CC",
      "adm.pBrand": "\u0628\u0631\u0646\u062F",
      "adm.pPrice": "\u0642\u06CC\u0645\u062A (\u062A\u0648\u0645\u0627\u0646)",
      "adm.pOldPrice": "\u0642\u06CC\u0645\u062A \u0642\u0628\u0644 \u0627\u0632 \u062A\u062E\u0641\u06CC\u0641",
      "adm.pCost": "\u0642\u06CC\u0645\u062A \u062E\u0631\u06CC\u062F",
      "adm.pStock": "\u0645\u0648\u062C\u0648\u062F\u06CC",
      "adm.pSku": "\u06A9\u062F \u06A9\u0627\u0644\u0627",
      "adm.pBarcode": "\u0628\u0627\u0631\u06A9\u062F",
      "adm.pWeight": "\u0648\u0632\u0646 (\u06AF\u0631\u0645)",
      "adm.pWarranty": "\u06AF\u0627\u0631\u0627\u0646\u062A\u06CC (\u0645\u0627\u0647)",
      "adm.pAuth": "\u0627\u0635\u0627\u0644\u062A \u06A9\u0627\u0644\u0627",
      "adm.pTags": "\u0628\u0631\u0686\u0633\u0628\u200C\u0647\u0627 (\u0628\u0627 Enter \u062C\u062F\u0627 \u06A9\u0646)",
      "adm.pSpecs": "\u0645\u0634\u062E\u0635\u0627\u062A \u0641\u0646\u06CC",
      "adm.pSpecKey": "\u0646\u0627\u0645 \u0645\u0634\u062E\u0635\u0647",
      "adm.pSpecVal": "\u0645\u0642\u062F\u0627\u0631",
      "adm.pAddSpec": "\u0627\u0641\u0632\u0648\u062F\u0646 \u0645\u0634\u062E\u0635\u0647",
      "adm.pVideos": "\u0648\u06CC\u062F\u06CC\u0648\u0647\u0627\u06CC \u0645\u062D\u0635\u0648\u0644 (\u0647\u0631 \u062E\u0637 \u06CC\u06A9 \u0646\u0634\u0627\u0646\u06CC https \u06CC\u0627 /uploads)",
      "adm.pVideosHint": "\u0648\u06CC\u062F\u06CC\u0648\u0647\u0627 \u062F\u0631 \u06AF\u0627\u0644\u0631\u06CC \u0645\u062D\u0635\u0648\u0644 \u0648 \u0644\u0627\u06CC\u062A\u200C\u0628\u0627\u06A9\u0633 \u067E\u062E\u0634 \u0645\u06CC\u200C\u0634\u0648\u0646\u062F.",
      "adm.pImages": "\u062A\u0635\u0627\u0648\u06CC\u0631",
      "adm.pFindImage": "\u062C\u0633\u062A\u200C\u0648\u062C\u0648\u06CC \u062E\u0648\u062F\u06A9\u0627\u0631 \u062A\u0635\u0648\u06CC\u0631",
      "adm.pFindImageHint": "\u0645\u0646\u0627\u0628\u0639 \u0622\u0632\u0627\u062F \u062A\u0635\u0648\u06CC\u0631 (\u0648\u06CC\u06A9\u06CC\u200C\u0645\u062F\u06CC\u0627/\u0627\u0648\u067E\u0646\u200C\u0648\u0631\u0633) \u0631\u0627 \u0628\u0631\u0627\u06CC \u0627\u06CC\u0646 \u06A9\u0627\u0644\u0627 \u062C\u0633\u062A\u200C\u0648\u062C\u0648 \u0645\u06CC\u200C\u06A9\u0646\u06CC\u0645. \u06CC\u06A9\u06CC \u0631\u0627 \u0627\u0646\u062A\u062E\u0627\u0628 \u0648 \u062A\u0623\u06CC\u06CC\u062F \u06A9\u0646.",
      "adm.pFindSearching": "\u062F\u0631 \u062D\u0627\u0644 \u062C\u0633\u062A\u200C\u0648\u062C\u0648\u06CC \u062A\u0635\u0648\u06CC\u0631\u2026",
      "adm.pFindEmpty": "\u062A\u0635\u0648\u06CC\u0631\u06CC \u067E\u06CC\u062F\u0627 \u0646\u0634\u062F. \u0645\u06CC\u200C\u062A\u0648\u0627\u0646\u06CC \u0639\u06A9\u0633 \u062E\u0648\u062F\u062A \u0631\u0627 \u0628\u0627\u0631\u06AF\u0630\u0627\u0631\u06CC \u06A9\u0646\u06CC.",
      "adm.pUpload": "\u0628\u0627\u0631\u06AF\u0630\u0627\u0631\u06CC \u0639\u06A9\u0633",
      "adm.pUseImage": "\u0627\u0633\u062A\u0641\u0627\u062F\u0647 \u0627\u0632 \u0627\u06CC\u0646 \u062A\u0635\u0648\u06CC\u0631",
      "adm.pDefaultImage": "\u0628\u0627\u0632\u06AF\u0631\u062F\u0627\u0646\u062F\u0646 \u062A\u0635\u0648\u06CC\u0631 \u067E\u06CC\u0634\u200C\u0641\u0631\u0636",
      "adm.pFeatured": "\u0646\u0645\u0627\u06CC\u0634 \u062F\u0631 \u067E\u06CC\u0634\u0646\u0647\u0627\u062F \u0648\u06CC\u0698\u0647",
      "adm.pActive": "\u0641\u0639\u0627\u0644 (\u062F\u0631 \u0633\u0627\u06CC\u062A \u062F\u06CC\u062F\u0647 \u0634\u0648\u062F)",
      "adm.pSaved": "\u06A9\u0627\u0644\u0627 \u0630\u062E\u06CC\u0631\u0647 \u0634\u062F",
      "adm.pCreated": "\u06A9\u0627\u0644\u0627 \u0627\u06CC\u062C\u0627\u062F \u0634\u062F",
      "adm.pDeleted": "\u06A9\u0627\u0644\u0627 \u062D\u0630\u0641 \u0634\u062F",
      "adm.pDeleteConfirm": "\u0627\u06CC\u0646 \u06A9\u0627\u0644\u0627 \u0628\u0631\u0627\u06CC \u0647\u0645\u06CC\u0634\u0647 \u062D\u0630\u0641 \u0634\u0648\u062F\u061F",
      "adm.pQuickEdit": "\u0648\u06CC\u0631\u0627\u06CC\u0634 \u0633\u0631\u06CC\u0639",
      "adm.pBulkPrice": "\u062A\u063A\u06CC\u06CC\u0631 \u06AF\u0631\u0648\u0647\u06CC \u0642\u06CC\u0645\u062A",
      "adm.catName": "\u0646\u0627\u0645 \u062F\u0633\u062A\u0647",
      "adm.catParent": "\u062F\u0633\u062A\u0647\u200C\u06CC \u0648\u0627\u0644\u062F",
      "adm.catGlyph": "\u0622\u06CC\u06A9\u0648\u0646",
      "adm.catOrder": "\u062A\u0631\u062A\u06CC\u0628 \u0646\u0645\u0627\u06CC\u0634",
      "adm.catNoParent": "\u0628\u062F\u0648\u0646 \u0648\u0627\u0644\u062F (\u0633\u0637\u062D \u0627\u0635\u0644\u06CC)",
      "adm.brandName": "\u0646\u0627\u0645 \u0628\u0631\u0646\u062F",
      "adm.brandNameEn": "\u0646\u0627\u0645 \u0627\u0646\u06AF\u0644\u06CC\u0633\u06CC \u0628\u0631\u0646\u062F",
      "adm.oStatus": "\u062A\u063A\u06CC\u06CC\u0631 \u0648\u0636\u0639\u06CC\u062A",
      "adm.oTracking": "\u06A9\u062F \u0631\u0647\u06AF\u06CC\u0631\u06CC",
      "adm.oNote": "\u06CC\u0627\u062F\u062F\u0627\u0634\u062A \u062F\u0627\u062E\u0644\u06CC",
      "adm.oCustomer": "\u0645\u0634\u062A\u0631\u06CC",
      "adm.oDelivery": "\u062A\u062D\u0648\u06CC\u0644",
      "adm.oPayment": "\u067E\u0631\u062F\u0627\u062E\u062A",
      "adm.oSaved": "\u0633\u0641\u0627\u0631\u0634 \u0628\u0647\u200C\u0631\u0648\u0632\u0631\u0633\u0627\u0646\u06CC \u0634\u062F",
      "adm.rApprove": "\u062A\u0623\u06CC\u06CC\u062F \u0648 \u0627\u0646\u062A\u0634\u0627\u0631",
      "adm.rReject": "\u0631\u062F \u06A9\u0631\u062F\u0646",
      "adm.rReply": "\u067E\u0627\u0633\u062E",
      "adm.rReplySaved": "\u067E\u0627\u0633\u062E \u0630\u062E\u06CC\u0631\u0647 \u0634\u062F",
      "adm.rModerated": "\u0648\u0636\u0639\u06CC\u062A \u0646\u0638\u0631 \u0628\u0647\u200C\u0631\u0648\u0632\u0631\u0633\u0627\u0646\u06CC \u0634\u062F",
      "adm.rFilter": "\u0641\u06CC\u0644\u062A\u0631",
      "adm.uRole": "\u0646\u0642\u0634",
      "adm.uPerms": "\u062F\u0633\u062A\u0631\u0633\u06CC\u200C\u0647\u0627",
      "adm.uPermsHint": "\u0647\u0631 \u062F\u0633\u062A\u0631\u0633\u06CC \u0631\u0627 \u062C\u062F\u0627\u06AF\u0627\u0646\u0647 \u0631\u0648\u0634\u0646 \u06CC\u0627 \u062E\u0627\u0645\u0648\u0634 \u06A9\u0646. \u062A\u063A\u06CC\u06CC\u0631\u0647\u0627 \u0641\u0648\u0631\u0627\u064B \u0627\u0639\u0645\u0627\u0644 \u0645\u06CC\u200C\u0634\u0648\u062F.",
      "adm.uAll": "\u0641\u0639\u0627\u0644\u200C\u0633\u0627\u0632\u06CC \u0647\u0645\u0647",
      "adm.uNone": "\u063A\u06CC\u0631\u0641\u0639\u0627\u0644\u200C\u0633\u0627\u0632\u06CC \u0647\u0645\u0647",
      "adm.uWalletAdjust": "\u062A\u0646\u0638\u06CC\u0645 \u0645\u0648\u062C\u0648\u062F\u06CC \u06A9\u06CC\u0641 \u067E\u0648\u0644",
      "adm.uWalletReason": "\u062F\u0644\u06CC\u0644",
      "adm.uPlusDays": "\u0631\u0648\u0632\u0647\u0627\u06CC \u0627\u0634\u062A\u0631\u0627\u06A9 \u067E\u0644\u0627\u0633",
      "adm.uResetPass": "\u0628\u0627\u0632\u0646\u0634\u0627\u0646\u06CC \u0631\u0645\u0632 \u0639\u0628\u0648\u0631",
      "adm.uStatus": "\u0648\u0636\u0639\u06CC\u062A \u062D\u0633\u0627\u0628",
      "adm.uBlocked": "\u0645\u0633\u062F\u0648\u062F",
      "adm.uSaved": "\u062A\u063A\u06CC\u06CC\u0631\u0627\u062A \u06A9\u0627\u0631\u0628\u0631 \u0630\u062E\u06CC\u0631\u0647 \u0634\u062F",
      "adm.uMakeStaff": "\u06A9\u0627\u0631\u0645\u0646\u062F \u06A9\u0631\u062F\u0646",
      "adm.cCode": "\u06A9\u062F",
      "adm.cType": "\u0646\u0648\u0639 \u062A\u062E\u0641\u06CC\u0641",
      "adm.cValue": "\u0645\u0642\u062F\u0627\u0631",
      "adm.cMax": "\u0633\u0642\u0641 \u062A\u062E\u0641\u06CC\u0641",
      "adm.cMin": "\u062D\u062F\u0627\u0642\u0644 \u0645\u0628\u0644\u063A \u0633\u0641\u0627\u0631\u0634",
      "adm.cLimit": "\u0633\u0642\u0641 \u0627\u0633\u062A\u0641\u0627\u062F\u0647\u200C\u06CC \u06A9\u0644",
      "adm.cPerUser": "\u0633\u0642\u0641 \u0647\u0631 \u06A9\u0627\u0631\u0628\u0631",
      "adm.cStart": "\u0634\u0631\u0648\u0639",
      "adm.cEnd": "\u067E\u0627\u06CC\u0627\u0646",
      "adm.cUsed": "\u0627\u0633\u062A\u0641\u0627\u062F\u0647\u200C\u0634\u062F\u0647",
      "adm.aSlot": "\u0645\u062D\u0644 \u0646\u0645\u0627\u06CC\u0634",
      "adm.aTitle": "\u0639\u0646\u0648\u0627\u0646",
      "adm.aText": "\u0645\u062A\u0646",
      "adm.aLink": "\u0644\u06CC\u0646\u06A9 \u0645\u0642\u0635\u062F",
      "adm.aCta": "\u0645\u062A\u0646 \u062F\u06A9\u0645\u0647",
      "adm.aActive": "\u0646\u0645\u0627\u06CC\u0634 \u062F\u0627\u062F\u0647 \u0634\u0648\u062F",
      "adm.nTitle": "\u0639\u0646\u0648\u0627\u0646 \u0627\u0639\u0644\u0627\u0646",
      "adm.nBody": "\u0645\u062A\u0646 \u0627\u0639\u0644\u0627\u0646",
      "adm.nTarget": "\u06AF\u06CC\u0631\u0646\u062F\u0647",
      "adm.nAll": "\u0647\u0645\u0647\u200C\u06CC \u06A9\u0627\u0631\u0628\u0631\u0627\u0646",
      "adm.nOne": "\u06CC\u06A9 \u06A9\u0627\u0631\u0628\u0631 \u0645\u0634\u062E\u0635",
      "adm.nLevel": "\u0633\u0637\u062D",
      "adm.nSent": "\u0627\u0639\u0644\u0627\u0646 \u0627\u0631\u0633\u0627\u0644 \u0634\u062F",
      "adm.nOutbox": "\u0635\u0646\u062F\u0648\u0642 \u062E\u0631\u0648\u062C\u06CC \u067E\u06CC\u0627\u0645\u06A9 \u0648 \u0627\u06CC\u0645\u06CC\u0644 (\u062D\u0627\u0644\u062A \u0622\u0632\u0645\u0627\u06CC\u0634\u06CC)",
      "adm.sStore": "\u0627\u0637\u0644\u0627\u0639\u0627\u062A \u0641\u0631\u0648\u0634\u06AF\u0627\u0647",
      "adm.sTheme": "\u067E\u0648\u0633\u062A\u0647",
      "adm.sUi": "\u0686\u06CC\u062F\u0645\u0627\u0646 \u0631\u0627\u0628\u0637",
      "adm.mailsms": "\u0627\u06CC\u0645\u06CC\u0644 \u0648 \u067E\u06CC\u0627\u0645\u06A9",
      "adm.mailCfg": "\u0633\u0631\u0648\u0631 \u0627\u06CC\u0645\u06CC\u0644 (SMTP)",
      "adm.mailEnabled": "\u0627\u0631\u0633\u0627\u0644 \u0627\u06CC\u0645\u06CC\u0644 \u0641\u0639\u0627\u0644",
      "adm.mailFrom": "\u0622\u062F\u0631\u0633 \u0641\u0631\u0633\u062A\u0646\u062F\u0647",
      "adm.smsCfg": "\u067E\u0646\u0644 \u067E\u06CC\u0627\u0645\u06A9 (\u06A9\u0627\u0648\u0647\u200C\u0646\u06AF\u0627\u0631)",
      "adm.smsEnabled": "\u0627\u0631\u0633\u0627\u0644 \u067E\u06CC\u0627\u0645\u06A9 \u0641\u0639\u0627\u0644",
      "adm.smsKey": "\u06A9\u0644\u06CC\u062F API",
      "adm.smsSender": "\u0634\u0645\u0627\u0631\u0647\u0654 \u0641\u0631\u0633\u062A\u0646\u062F\u0647",
      "adm.console": "\u06A9\u0646\u0633\u0648\u0644 \u0633\u0627\u0645\u0627\u0646\u0647",
      "adm.consoleHint": "\u0631\u06CC\u0633\u062A\u0627\u0631\u062A \u0633\u0631\u0648\u0631 \u0686\u0646\u062F \u062B\u0627\u0646\u06CC\u0647 \u0637\u0648\u0644 \u0645\u06CC\u200C\u06A9\u0634\u062F\u061B \u0635\u0641\u062D\u0647 \u062E\u0648\u062F\u06A9\u0627\u0631 \u062A\u0627\u0632\u0647 \u0645\u06CC\u200C\u0634\u0648\u062F. \u0631\u06CC\u0633\u062A\u200C\u0647\u0627 \u063A\u06CC\u0631\u0642\u0627\u0628\u0644 \u0628\u0627\u0632\u06AF\u0634\u062A\u200C\u0627\u0646\u062F.",
      "adm.sysRestart": "\u0631\u06CC\u0633\u062A\u0627\u0631\u062A \u0633\u0631\u0648\u0631",
      "adm.sysRestartWarn": "\u0633\u0631\u0648\u0631 \u0647\u0645\u06CC\u0646 \u062D\u0627\u0644\u0627 \u0631\u06CC\u0633\u062A\u0627\u0631\u062A \u0634\u0648\u062F\u061F \u06A9\u0627\u0631\u0628\u0631\u0627\u0646 \u0686\u0646\u062F \u062B\u0627\u0646\u06CC\u0647 \u0642\u0637\u0639 \u0645\u06CC\u200C\u0634\u0648\u0646\u062F.",
      "adm.sysRestarting": "\u062F\u0631 \u062D\u0627\u0644 \u0631\u06CC\u0633\u062A\u0627\u0631\u062A\u2026 \u0635\u0641\u062D\u0647 \u062A\u0627 \u0644\u062D\u0638\u0627\u062A\u06CC \u062F\u06CC\u06AF\u0631 \u062A\u0627\u0632\u0647 \u0645\u06CC\u200C\u0634\u0648\u062F.",
      "adm.sysResetLabel": "\u0631\u06CC\u0633\u062A \u0628\u062E\u0634\u200C\u0647\u0627 (\u063A\u06CC\u0631\u0642\u0627\u0628\u0644 \u0628\u0627\u0632\u06AF\u0634\u062A):",
      "adm.sysReset.audit": "\u0644\u0627\u06AF \u0645\u0645\u06CC\u0632\u06CC",
      "adm.sysReset.carts": "\u0633\u0628\u062F\u0647\u0627\u06CC \u0645\u0647\u0645\u0627\u0646",
      "adm.sysReset.visits": "\u0634\u0645\u0627\u0631 \u0628\u0627\u0632\u062F\u06CC\u062F\u0647\u0627",
      "adm.sysReset.visitors": "\u0628\u0627\u0632\u062F\u06CC\u062F\u06A9\u0646\u0646\u062F\u06AF\u0627\u0646",
      "adm.secTitle": "\u067E\u062F\u0627\u0641\u0646\u062F \u0648 \u0635\u0641 \u0648\u0631\u0648\u062F",
      "adm.secQueueEnabled": "\u0635\u0641\u200C\u0628\u0646\u062F\u06CC \u0647\u0646\u06AF\u0627\u0645 \u0634\u0644\u0648\u063A\u06CC",
      "adm.secQueueDesc": "\u0648\u0642\u062A\u06CC \u0628\u0627\u0631 \u0633\u0627\u06CC\u062A \u0627\u0632 \u062D\u062F \u0628\u06AF\u0630\u0631\u062F\u060C \u0628\u0627\u0632\u062F\u06CC\u062F\u06A9\u0646\u0646\u062F\u06AF\u0627\u0646 \u0646\u0627\u0634\u0646\u0627\u0633 \u062F\u0627\u0646\u0647\u200C\u062F\u0627\u0646\u0647 \u0627\u0632 \u0635\u0641 \u0648\u0627\u0631\u062F \u0645\u06CC\u200C\u0634\u0648\u0646\u062F \u062A\u0627 \u0633\u0627\u06CC\u062A \u0628\u0631\u0627\u06CC \u0647\u0645\u0647 \u0628\u062F\u0648\u0646 \u062E\u0637\u0627 \u0628\u0645\u0627\u0646\u062F.",
      "adm.secMaxConc": "\u0633\u0642\u0641 \u062F\u0631\u062E\u0648\u0627\u0633\u062A \u0647\u0645\u0632\u0645\u0627\u0646",
      "adm.secTriggerRps": "\u0622\u0633\u062A\u0627\u0646\u0647\u0654 \u062F\u0631\u062E\u0648\u0627\u0633\u062A \u062F\u0631 \u062B\u0627\u0646\u06CC\u0647",
      "adm.secPassTtl": "\u0627\u0639\u062A\u0628\u0627\u0631 \u06AF\u0630\u0631\u0646\u0627\u0645\u0647\u0654 \u0648\u0631\u0648\u062F (\u062F\u0642\u06CC\u0642\u0647)",
      "adm.secPoll": "\u0641\u0627\u0635\u0644\u0647\u0654 \u0628\u0631\u0631\u0633\u06CC \u0646\u0648\u0628\u062A (\u062B\u0627\u0646\u06CC\u0647)",
      "adm.secFloodBan": "\u0622\u0633\u062A\u0627\u0646\u0647\u0654 \u0645\u0633\u062F\u0648\u062F\u0633\u0627\u0632\u06CC \u062E\u0648\u062F\u06A9\u0627\u0631 (\u062F\u0631\u062E\u0648\u0627\u0633\u062A \u062F\u0631 \u062F\u0642\u06CC\u0642\u0647)",
      "adm.secFloodMin": "\u0645\u062F\u062A \u0645\u0633\u062F\u0648\u062F\u0633\u0627\u0632\u06CC \u062E\u0648\u062F\u06A9\u0627\u0631 (\u062F\u0642\u06CC\u0642\u0647)",
      "adm.secSaved": "\u062A\u0646\u0638\u06CC\u0645\u0627\u062A \u067E\u062F\u0627\u0641\u0646\u062F \u0630\u062E\u06CC\u0631\u0647 \u0634\u062F.",
      "adm.secInflight": "\u062F\u0631\u062E\u0648\u0627\u0633\u062A \u0641\u0639\u0627\u0644",
      "adm.secRps": "\u062F\u0631\u062E\u0648\u0627\u0633\u062A/\u062B\u0627\u0646\u06CC\u0647",
      "adm.secQueued": "\u062F\u0631 \u0635\u0641",
      "adm.secAutoBans": "\u0645\u0633\u062F\u0648\u062F \u062E\u0648\u062F\u06A9\u0627\u0631 \u0641\u0639\u0627\u0644",
      "adm.secTop": "\u067E\u0631\u062D\u0631\u0641\u200C\u062A\u0631\u06CC\u0646 IP\u0647\u0627 (\u062F\u0642\u06CC\u0642\u0647\u0654 \u0627\u062E\u06CC\u0631)",
      "adm.secPerMin": "\u062F\u0631\u062E\u0648\u0627\u0633\u062A/\u062F\u0642\u06CC\u0642\u0647",
      "adm.secTopEmpty": "\u062A\u0631\u0627\u0641\u06CC\u06A9 \u063A\u06CC\u0631\u0639\u0627\u062F\u06CC \u062B\u0628\u062A \u0646\u0634\u062F\u0647 \u0627\u0633\u062A.",
      "adm.secBusy": "\u0634\u0644\u0648\u063A \u2014 \u0635\u0641 \u0641\u0639\u0627\u0644",
      "adm.secNormal": "\u0648\u0636\u0639\u06CC\u062A \u0639\u0627\u062F\u06CC",
      "adm.banMinutes": "\u0645\u062F\u062A (\u062F\u0642\u06CC\u0642\u0647\u060C \u06F0 = \u062F\u0627\u0626\u0645)",
      "adm.banUntil": "\u062A\u0627",
      "adm.banAuto": "\u062E\u0648\u062F\u06A9\u0627\u0631",
      "adm.resetAudit": "\u067E\u0627\u06A9\u200C\u06A9\u0631\u062F\u0646 \u0644\u0627\u06AF\u200C\u0647\u0627",
      "adm.resetCarts": "\u062E\u0627\u0644\u06CC\u200C\u06A9\u0631\u062F\u0646 \u0633\u0628\u062F\u0647\u0627\u06CC \u0645\u0647\u0645\u0627\u0646",
      "adm.resetVisitors": "\u067E\u0627\u06A9\u200C\u06A9\u0631\u062F\u0646 \u0628\u0627\u0632\u062F\u06CC\u062F\u06A9\u0646\u0646\u062F\u06AF\u0627\u0646",
      "adm.resetDone": "\u0631\u06CC\u0633\u062A \u0627\u0646\u062C\u0627\u0645 \u0634\u062F.",
      "adm.resetWarn.audit": "\u0647\u0645\u0647\u0654 \u0644\u0627\u06AF\u200C\u0647\u0627\u06CC \u0645\u0645\u06CC\u0632\u06CC \u067E\u0627\u06A9 \u0634\u0648\u0646\u062F\u061F",
      "adm.resetWarn.carts": "\u0633\u0628\u062F\u0647\u0627\u06CC \u062E\u0631\u06CC\u062F \u06A9\u0627\u0631\u0628\u0631\u0627\u0646 \u0645\u0647\u0645\u0627\u0646 \u062E\u0627\u0644\u06CC \u0634\u0648\u062F\u061F",
      "adm.resetWarn.visitors": "\u0641\u0647\u0631\u0633\u062A \u0628\u0627\u0632\u062F\u06CC\u062F\u06A9\u0646\u0646\u062F\u06AF\u0627\u0646 \u067E\u0627\u06A9 \u0634\u0648\u062F\u061F",
      "adm.resetWarn.visits": "\u0634\u0645\u0627\u0631\u0646\u062F\u0647\u200C\u0647\u0627\u06CC \u0628\u0627\u0632\u062F\u06CC\u062F \u0635\u0641\u0631 \u0634\u0648\u0646\u062F\u061F",
      "adm.visitors": "\u0628\u0627\u0632\u062F\u06CC\u062F\u06A9\u0646\u0646\u062F\u06AF\u0627\u0646",
      "adm.uDevice": "\u062F\u0633\u062A\u06AF\u0627\u0647 / IP",
      "adm.uBrowser": "\u0645\u0631\u0648\u0631\u06AF\u0631",
      "adm.uRegion": "\u0645\u0646\u0637\u0642\u0647 / \u0632\u0645\u0627\u0646",
      "adm.uPath": "\u0645\u0633\u06CC\u0631",
      "adm.guest": "\u0645\u0647\u0645\u0627\u0646",
      "adm.bans": "\u0645\u0633\u062F\u0648\u062F\u0633\u0627\u0632\u06CC (\u0628\u0646/\u0622\u0646\u200C\u0628\u0646)",
      "adm.banType": "\u0646\u0648\u0639",
      "adm.banValue": "\u0645\u0642\u062F\u0627\u0631 (IP / \u0634\u0645\u0627\u0631\u0647 / \u0627\u06CC\u0645\u06CC\u0644 / \u0646\u0627\u0645 \u06A9\u0627\u0631\u0628\u0631\u06CC)",
      "adm.banReason": "\u062F\u0644\u06CC\u0644",
      "adm.ban": "\u0645\u0633\u062F\u0648\u062F \u06A9\u0646",
      "adm.unban": "\u0631\u0641\u0639 \u0645\u0633\u062F\u0648\u062F\u06CC",
      "adm.banned": "\u0645\u0633\u062F\u0648\u062F",
      "adm.banDone": "\u0645\u0633\u062F\u0648\u062F \u0634\u062F.",
      "adm.unbanDone": "\u0645\u0633\u062F\u0648\u062F\u06CC \u0631\u0641\u0639 \u0634\u062F.",
      "adm.bansEmpty": "\u0641\u0639\u0644\u0627\u064B \u06A9\u0633\u06CC \u0645\u0633\u062F\u0648\u062F \u0646\u06CC\u0633\u062A.",
      "adm.banByAdmin": "\u062A\u0648\u0633\u0637 \u0645\u062F\u06CC\u0631",
      "adm.channels": "\u06A9\u0627\u0646\u0627\u0644\u200C\u0647\u0627\u06CC \u0627\u0631\u0633\u0627\u0644",
      "adm.chSite": "\u0627\u0639\u0644\u0627\u0646 \u062F\u0627\u062E\u0644 \u0633\u0627\u06CC\u062A",
      "adm.chTelegram": "\u0628\u0627\u062A \u062A\u0644\u06AF\u0631\u0627\u0645",
      "adm.chEmail": "\u0627\u06CC\u0645\u06CC\u0644",
      "adm.chSms": "\u067E\u06CC\u0627\u0645\u06A9",
      "adm.channelsHint": "\u0627\u06CC\u0645\u06CC\u0644/\u067E\u06CC\u0627\u0645\u06A9 \u0646\u06CC\u0627\u0632 \u0628\u0647 \u062A\u0646\u0638\u06CC\u0645\u0627\u062A \u067E\u0627\u06CC\u06CC\u0646 \u0647\u0645\u06CC\u0646 \u0628\u062E\u0634 \u062F\u0627\u0631\u0646\u062F\u061B \u0628\u062F\u0648\u0646 \u062A\u0646\u0638\u06CC\u0645\u060C \u0641\u0642\u0637 \u06A9\u0627\u0646\u0627\u0644\u200C\u0647\u0627\u06CC \u0622\u0645\u0627\u062F\u0647 \u0627\u0631\u0633\u0627\u0644 \u0645\u06CC\u200C\u0634\u0648\u0646\u062F.",
      "adm.telegram": "\u0628\u0627\u062A \u062A\u0644\u06AF\u0631\u0627\u0645",
      "adm.tgHint": "\u062A\u0648\u06A9\u0646 \u0631\u0627 \u0627\u0632 BotFather \u062A\u0644\u06AF\u0631\u0627\u0645 \u0628\u06AF\u06CC\u0631 \u0648 \u0627\u06CC\u0646\u062C\u0627 \u0628\u06AF\u0630\u0627\u0631\u061B \u0628\u0627\u062A \u0631\u0648\u06CC \u0633\u0631\u0648\u0631 \u0641\u0631\u0648\u0634\u06AF\u0627\u0647 \u0645\u06CC\u200C\u0686\u0631\u062E\u062F \u0648 \u0627\u0632 \u0647\u0645\u06CC\u0646 \u067E\u0646\u0644 \u0645\u062F\u06CC\u0631\u06CC\u062A \u0645\u06CC\u200C\u0634\u0648\u062F.",
      "adm.tgEnabled": "\u0628\u0627\u062A \u0631\u0648\u0634\u0646",
      "adm.tgToken": "\u062A\u0648\u06A9\u0646 \u0628\u0627\u062A",
      "adm.tgTokenHint": "\u0645\u062B\u0644 123456:ABC-\u2026",
      "adm.tgWelcome": "\u067E\u06CC\u0627\u0645 \u062E\u0648\u0634\u200C\u0622\u0645\u062F /start",
      "adm.tgTest": "\u0627\u0631\u0633\u0627\u0644 \u0622\u0632\u0645\u0627\u06CC\u0634\u06CC",
      "adm.tgInbox": "\u0635\u0646\u062F\u0648\u0642 \u067E\u06CC\u0627\u0645\u200C\u0647\u0627",
      "adm.tgSubs": "\u0639\u0636\u0648\u0647\u0627",
      "adm.tgReplyPh": "\u067E\u0627\u0633\u062E \u0628\u0647 \u0627\u06CC\u0646 \u06A9\u0627\u0631\u0628\u0631\u2026",
      "adm.tgInboxEmpty": "\u067E\u06CC\u0627\u0645\u06CC \u0646\u0631\u0633\u06CC\u062F\u0647 \u0627\u0633\u062A.",
      "adm.lottery": "\u0642\u0631\u0639\u0647\u200C\u06A9\u0634\u06CC",
      "adm.lotteryNew": "\u0642\u0631\u0639\u0647\u200C\u06A9\u0634\u06CC \u062C\u062F\u06CC\u062F",
      "adm.lotPrize": "\u062C\u0627\u06CC\u0632\u0647",
      "adm.lotEnds": "\u067E\u0627\u06CC\u0627\u0646",
      "adm.lotWinners": "\u062A\u0639\u062F\u0627\u062F \u0628\u0631\u0646\u062F\u0647",
      "adm.lotWinnersList": "\u0628\u0631\u0646\u062F\u0647\u200C\u0647\u0627",
      "adm.lotMode": "\u0631\u0648\u0634 \u0634\u0631\u06A9\u062A",
      "adm.lotModeOrders": "\u062E\u0648\u062F\u06A9\u0627\u0631 \u0627\u0632 \u0633\u0641\u0627\u0631\u0634\u200C\u0647\u0627",
      "adm.lotModeManual": "\u062F\u06A9\u0645\u0647\u0654 \u0634\u0631\u06A9\u062A \u062F\u0633\u062A\u06CC",
      "adm.lotEntries": "\u0634\u0631\u06A9\u062A\u200C\u06A9\u0646\u0646\u062F\u06AF\u0627\u0646",
      "adm.lotRun": "\u0642\u0631\u0639\u0647\u200C\u06A9\u0634\u06CC \u06A9\u0646",
      "adm.lotRunWarn": "\u0628\u0631\u0646\u062F\u0647\u200C\u0647\u0627 \u0647\u0645\u06CC\u0646 \u062D\u0627\u0644\u0627 \u0628\u0647\u200C\u0635\u0648\u0631\u062A \u062A\u0635\u0627\u062F\u0641\u06CC \u0627\u0646\u062A\u062E\u0627\u0628 \u0648 \u0645\u0637\u0644\u0639 \u0645\u06CC\u200C\u0634\u0648\u0646\u062F. \u0627\u062F\u0627\u0645\u0647 \u0645\u06CC\u200C\u062F\u0647\u06CC\u061F",
      "adm.lotDone": "\u0642\u0631\u0639\u0647\u200C\u06A9\u0634\u06CC \u0627\u0646\u062C\u0627\u0645 \u0634\u062F",
      "adm.lotClose": "\u0628\u0633\u062A\u0646",
      "adm.lotClosed": "\u0642\u0631\u0639\u0647\u200C\u06A9\u0634\u06CC \u0628\u0633\u062A\u0647 \u0634\u062F.",
      "adm.lotEmpty": "\u0647\u0646\u0648\u0632 \u0642\u0631\u0639\u0647\u200C\u06A9\u0634\u06CC\u200C\u0627\u06CC \u0646\u0633\u0627\u062E\u062A\u0647\u200C\u0627\u06CC.",
      "lot.title": "\u0642\u0631\u0639\u0647\u200C\u06A9\u0634\u06CC \u06AF\u0631\u06CC\u0646 \u0627\u067E\u0644",
      "lot.nav": "\u0642\u0631\u0639\u0647\u200C\u06A9\u0634\u06CC",
      "lot.soon": "\u0628\u0647\u200C\u0632\u0648\u062F\u06CC \u0627\u0636\u0627\u0641\u0647 \u062E\u0648\u0627\u0647\u062F \u0634\u062F\u061B \u0645\u0646\u062A\u0638\u0631 \u062E\u0628\u0631\u0647\u0627\u06CC \u062E\u0648\u0628 \u0628\u0627\u0634!",
      "lot.done": "\u0642\u0631\u0639\u0647\u200C\u06A9\u0634\u06CC\u200C\u0647\u0627\u06CC \u06AF\u0630\u0634\u062A\u0647",
      "lot.winners": "\u0628\u0631\u0646\u062F\u0647\u200C\u0647\u0627",
      "lot.active": "\u0641\u0639\u0627\u0644",
      "lot.prize": "\u062C\u0627\u06CC\u0632\u0647",
      "lot.ends": "\u067E\u0627\u06CC\u0627\u0646",
      "lot.entries": "\u0634\u0631\u06A9\u062A\u200C\u06A9\u0646\u0646\u062F\u06AF\u0627\u0646",
      "lot.joined": "\u062F\u0631 \u0627\u06CC\u0646 \u0642\u0631\u0639\u0647\u200C\u06A9\u0634\u06CC \u0634\u0631\u06A9\u062A \u06A9\u0631\u062F\u0647\u200C\u0627\u06CC.",
      "lot.join": "\u0634\u0631\u06A9\u062A \u062F\u0631 \u0642\u0631\u0639\u0647\u200C\u06A9\u0634\u06CC",
      "lot.joinDone": "\u0634\u0631\u06A9\u062A\u062A \u062B\u0628\u062A \u0634\u062F\u061B \u0628\u0647 \u0627\u0645\u06CC\u062F \u0628\u0631\u062F!",
      "lot.autoEntry": "\u0647\u0631 \u062E\u0631\u06CC\u062F \u0645\u0639\u062A\u0628\u0631 \u062F\u0631 \u0628\u0627\u0632\u0647\u0654 \u0642\u0631\u0639\u0647\u200C\u06A9\u0634\u06CC\u060C \u062E\u0648\u062F\u06A9\u0627\u0631 \u06CC\u06A9 \u0634\u0631\u06A9\u062A \u0627\u0633\u062A.",
      "contact.phone3": "\u0634\u0645\u0627\u0631\u0647\u0654 \u0633\u0648\u0645",
      "adm.sBackups": "\u067E\u0634\u062A\u06CC\u0628\u0627\u0646\u200C\u06AF\u06CC\u0631\u06CC \u0648 \u062F\u0627\u0645\u067E",
      "adm.backupNow": "\u067E\u0634\u062A\u06CC\u0628\u0627\u0646 \u0647\u0645\u06CC\u0646 \u062D\u0627\u0644\u0627",
      "adm.backupsHint": "\u0647\u0631 {hours} \u0633\u0627\u0639\u062A \u06CC\u06A9\u200C\u0628\u0627\u0631 \u062E\u0648\u062F\u06A9\u0627\u0631 \u0646\u0633\u062E\u0647\u0654 \u06A9\u0627\u0645\u0644 \u06AF\u0631\u0641\u062A\u0647 \u0648 {keep} \u0646\u0633\u062E\u0647\u0654 \u0622\u062E\u0631 \u0646\u06AF\u0647 \u062F\u0627\u0634\u062A\u0647 \u0645\u06CC\u200C\u0634\u0648\u062F.",
      "adm.backupsEmpty": "\u0647\u0646\u0648\u0632 \u0646\u0633\u062E\u0647\u200C\u0627\u06CC \u0633\u0627\u062E\u062A\u0647 \u0646\u0634\u062F\u0647\u061B \u062F\u06A9\u0645\u0647\u0654 \xAB\u067E\u0634\u062A\u06CC\u0628\u0627\u0646 \u0647\u0645\u06CC\u0646 \u062D\u0627\u0644\u0627\xBB \u0631\u0627 \u0628\u0632\u0646.",
      "adm.backupSize": "\u062D\u062C\u0645",
      "adm.backupRestore": "\u0628\u0627\u0632\u06AF\u0631\u062F\u0627\u0646\u06CC",
      "adm.backupRestoreWarn": "\u0647\u0645\u0647\u0654 \u062F\u0627\u062F\u0647\u200C\u0647\u0627\u06CC \u0641\u0639\u0644\u06CC \u0628\u0627 \u0627\u06CC\u0646 \u0646\u0633\u062E\u0647 \u062C\u0627\u06CC\u06AF\u0632\u06CC\u0646 \u0645\u06CC\u200C\u0634\u0648\u062F. \u0645\u0637\u0645\u0626\u0646\u06CC\u061F",
      "adm.backupDone": "\u0646\u0633\u062E\u0647\u0654 \u067E\u0634\u062A\u06CC\u0628\u0627\u0646 \u0633\u0627\u062E\u062A\u0647 \u0634\u062F.",
      "adm.backupRestored": "\u0628\u0627\u0632\u06AF\u0631\u062F\u0627\u0646\u06CC \u0627\u0646\u062C\u0627\u0645 \u0634\u062F\u061B \u0635\u0641\u062D\u0647 \u062A\u0627\u0632\u0647 \u0645\u06CC\u200C\u0634\u0648\u062F.",
      "adm.dumpFull": "\u062F\u0627\u0645\u067E \u06A9\u0627\u0645\u0644 \u0633\u0627\u06CC\u062A",
      "adm.sFeatures": "\u0627\u0645\u06A9\u0627\u0646\u0627\u062A",
      "adm.sShipping": "\u0627\u0631\u0633\u0627\u0644",
      "adm.sPlus": "\u067E\u0644\u0627\u0633",
      "adm.sOrders": "\u0633\u0641\u0627\u0631\u0634 \u0648 \u067E\u0631\u062F\u0627\u062E\u062A",
      "adm.sSeo": "\u0633\u0626\u0648",
      "adm.sAuth": "\u0627\u062D\u0631\u0627\u0632 \u0647\u0648\u06CC\u062A",
      "adm.sSaved": "\u062A\u0646\u0638\u06CC\u0645\u0627\u062A \u0630\u062E\u06CC\u0631\u0647 \u0634\u062F",
      "adm.tAccent": "\u0631\u0646\u06AF \u0627\u0635\u0644\u06CC",
      "adm.tVariant": "\u067E\u0648\u0633\u062A\u0647\u0654 \u0638\u0627\u0647\u0631\u06CC",
      "adm.tVariantHint": "\u0627\u06AF\u0631 \u067E\u0648\u0633\u062A\u0647\u0654 \u062A\u0627\u0632\u0647 \u0631\u0627 \u062F\u0648\u0633\u062A \u0646\u062F\u0627\u0634\u062A\u06CC\u062F\u060C \xAB\u06A9\u0644\u0627\u0633\u06CC\u06A9\xBB \u062F\u0642\u06CC\u0642\u0627\u064B \u0647\u0645\u0627\u0646 \u062A\u0645 \u0642\u0628\u0644\u06CC \u0627\u0633\u062A.",
      "hdr.refresh": "\u062A\u0627\u0632\u0647\u200C\u0633\u0627\u0632\u06CC \u0635\u0641\u062D\u0647",
      "adm.errTitle": "\u062E\u0637\u0627\u0647\u0627\u06CC \u0632\u0646\u062F\u0647\u0654 \u06A9\u0644\u0627\u06CC\u0646\u062A",
      "adm.errEmpty": "\u0647\u06CC\u0686 \u062E\u0637\u0627\u06CC \u06A9\u0644\u0627\u06CC\u0646\u062A\u06CC \u062B\u0628\u062A \u0646\u0634\u062F\u0647 \u2014 \u0633\u0627\u06CC\u062A \u0633\u0627\u0644\u0645 \u0627\u0633\u062A.",
      "adm.tVariant": "Visual skin",
      "adm.tVariantHint": "If you do not like the fresh skin, \u201CClassic\u201D is exactly the previous theme.",
      "hdr.refresh": "Refresh page",
      "adm.errTitle": "Live client errors",
      "adm.errEmpty": "No client errors recorded \u2014 the site is healthy.",
      "adm.tPort": "\u067E\u0648\u0633\u062A\u0647\u200C\u06CC \u0628\u0646\u062F\u0631\u06CC (\u0645\u0648\u062C\u060C \u0644\u0646\u062C \u0648 \u0646\u062E\u0644 \u062F\u0631 \u067E\u0633\u200C\u0632\u0645\u06CC\u0646\u0647)",
      "adm.tPortHint": "\u0628\u0631\u0627\u06CC \u067E\u0633\u200C\u0632\u0645\u06CC\u0646\u0647\u200C\u06CC \u0633\u0627\u062F\u0647 \u0648 \u062E\u0646\u062B\u06CC\u060C \u062E\u0627\u0645\u0648\u0634\u0634 \u06A9\u0646.",
      "adm.tMode": "\u067E\u0648\u0633\u062A\u0647\u200C\u06CC \u067E\u06CC\u0634\u200C\u0641\u0631\u0636",
      "adm.tRadius": "\u06AF\u0631\u062F\u06CC \u06AF\u0648\u0634\u0647\u200C\u0647\u0627",
      "adm.tDensity": "\u062A\u0631\u0627\u06A9\u0645",
      "adm.tBg": "\u0633\u0628\u06A9 \u067E\u0633\u200C\u0632\u0645\u06CC\u0646\u0647",
      "adm.tContrast": "\u06A9\u0646\u062A\u0631\u0627\u0633\u062A",
      "adm.tAnim": "\u0627\u0646\u06CC\u0645\u06CC\u0634\u0646\u200C\u0647\u0627",
      "adm.uSearchPos": "\u0645\u062D\u0644 \u06A9\u0627\u062F\u0631 \u062C\u0633\u062A\u200C\u0648\u062C\u0648",
      "adm.uHeader": "\u0686\u06CC\u062F\u0645\u0627\u0646 \u0633\u0631\u0628\u0631\u06AF",
      "adm.uNav": "\u0633\u0628\u06A9 \u0645\u0646\u0648",
      "adm.uCards": "\u0633\u0628\u06A9 \u06A9\u0627\u0631\u062A \u06A9\u0627\u0644\u0627",
      "adm.uSticky": "\u0633\u0631\u0628\u0631\u06AF \u0686\u0633\u0628\u0627\u0646",
      "adm.uTicker": "\u0646\u0648\u0627\u0631 \u062E\u0628\u0631\u06CC \u0628\u0627\u0644\u0627",
      "adm.uTickerItems": "\u0645\u062A\u0646\u200C\u0647\u0627\u06CC \u0646\u0648\u0627\u0631 \u062E\u0628\u0631\u06CC",
      "adm.uTickerSpeed": "\u0633\u0631\u0639\u062A \u0646\u0648\u0627\u0631 \u062E\u0628\u0631\u06CC",
      "adm.uQuick": "\u0645\u0634\u0627\u0647\u062F\u0647\u200C\u06CC \u0633\u0631\u06CC\u0639 \u06A9\u0627\u0644\u0627",
      "adm.uChat": "\u062F\u06A9\u0645\u0647\u200C\u06CC \u0634\u0646\u0627\u0648\u0631 \u067E\u0634\u062A\u06CC\u0628\u0627\u0646\u06CC",
      "adm.uCrumb": "\u0646\u0645\u0627\u06CC\u0634 \u0645\u0633\u06CC\u0631 \u0635\u0641\u062D\u0647",
      "adm.uCols": "\u0633\u062A\u0648\u0646\u200C\u0647\u0627\u06CC \u06A9\u0627\u0644\u0627",
      "adm.uColsMobile": "\u0645\u0648\u0628\u0627\u06CC\u0644",
      "adm.uColsTablet": "\u062A\u0628\u0644\u062A",
      "adm.uColsDesktop": "\u062F\u0633\u06A9\u062A\u0627\u067E",
      "adm.uColsWide": "\u0635\u0641\u062D\u0647\u200C\u06CC \u0639\u0631\u06CC\u0636",
      "adm.uCardInfo": "\u0627\u0637\u0644\u0627\u0639\u0627\u062A \u0631\u0648\u06CC \u06A9\u0627\u0631\u062A \u06A9\u0627\u0644\u0627",
      "adm.uPosStart": "\u0631\u0627\u0633\u062A (\u0622\u063A\u0627\u0632)",
      "adm.uPosCenter": "\u0648\u0633\u0637",
      "adm.uPosEnd": "\u0686\u067E (\u067E\u0627\u06CC\u0627\u0646)",
      "adm.uLayoutLogoStart": "\u0644\u0648\u06AF\u0648 \u062F\u0631 \u0622\u063A\u0627\u0632",
      "adm.uLayoutSplit": "\u0644\u0648\u06AF\u0648 \u0622\u063A\u0627\u0632 / \u062C\u0633\u062A\u200C\u0648\u062C\u0648 \u0648\u0633\u0637 / \u06A9\u0646\u0634\u200C\u0647\u0627 \u067E\u0627\u06CC\u0627\u0646",
      "adm.uLayoutCentered": "\u0644\u0648\u06AF\u0648 \u062F\u0631 \u0648\u0633\u0637",
      "adm.fHint": "\u0647\u0631 \u0627\u0645\u06A9\u0627\u0646\u06CC \u0631\u0627 \u06A9\u0647 \u0644\u0627\u0632\u0645 \u0646\u062F\u0627\u0631\u06CC \u062E\u0627\u0645\u0648\u0634 \u06A9\u0646\u061B \u0628\u062E\u0634 \u0645\u0631\u0628\u0648\u0637\u0647 \u0627\u0632 \u0633\u0627\u06CC\u062A \u0648 \u067E\u0646\u0644 \u062D\u0630\u0641 \u0645\u06CC\u200C\u0634\u0648\u062F.",
      "adm.bLabel": "\u0686\u0627\u067E \u0628\u0631\u0686\u0633\u0628",
      "adm.bSelect": "\u0627\u0646\u062A\u062E\u0627\u0628 \u06A9\u0627\u0644\u0627\u0647\u0627",
      "adm.bSize": "\u0627\u0646\u062F\u0627\u0632\u0647\u200C\u06CC \u0628\u0631\u0686\u0633\u0628",
      "adm.bCopies": "\u062A\u0639\u062F\u0627\u062F \u0646\u0633\u062E\u0647 \u0628\u0631\u0627\u06CC \u0647\u0631 \u06A9\u0627\u0644\u0627",
      "adm.bShowName": "\u0646\u0627\u0645 \u06A9\u0627\u0644\u0627",
      "adm.bShowPrice": "\u0642\u06CC\u0645\u062A",
      "adm.bShowBrand": "\u0628\u0631\u0646\u062F",
      "adm.bShowSku": "\u06A9\u062F \u06A9\u0627\u0644\u0627",
      "adm.bShowQr": "\u06A9\u062F QR \u0635\u0641\u062D\u0647\u200C\u06CC \u06A9\u0627\u0644\u0627",
      "adm.bType": "\u0646\u0648\u0639 \u0628\u0627\u0631\u06A9\u062F",
      "adm.bPrint": "\u0686\u0627\u067E \u0628\u0631\u0686\u0633\u0628\u200C\u0647\u0627",
      "adm.bGenerate": "\u0633\u0627\u062E\u062A \u0628\u0627\u0631\u06A9\u062F \u062C\u062F\u06CC\u062F",
      "adm.igPack": "\u0628\u0633\u062A\u0647\u0654 \u067E\u0633\u062A \u0627\u06CC\u0646\u0633\u062A\u0627\u06AF\u0631\u0627\u0645",
      "adm.igCap": "\u0645\u062A\u0646 \u067E\u0633\u062A (\u0642\u0627\u0628\u0644 \u0648\u06CC\u0631\u0627\u06CC\u0634 \u0642\u0628\u0644 \u0627\u0632 \u06A9\u067E\u06CC)",
      "adm.igTags": "\u0647\u0634\u062A\u06AF\u200C\u0647\u0627",
      "adm.igImgHint": "\u062A\u0635\u0648\u06CC\u0631 \u067E\u0633\u062A\u061B \u062F\u0627\u0646\u0644\u0648\u062F\u0634 \u06A9\u0646 \u0648 \u0628\u0627 \u0645\u062A\u0646 \u06A9\u0646\u0627\u0631\u0634 \u062F\u0631 \u0627\u06CC\u0646\u0633\u062A\u0627\u06AF\u0631\u0627\u0645 \u0645\u0646\u062A\u0634\u0631 \u06A9\u0646.",
      "adm.igDl": "\u062F\u0627\u0646\u0644\u0648\u062F \u062A\u0635\u0648\u06CC\u0631",
      "adm.igNoImg": "\u0627\u06CC\u0646 \u06A9\u0627\u0644\u0627 \u062A\u0635\u0648\u06CC\u0631 \u0646\u062F\u0627\u0631\u062F\u061B \u0627\u0648\u0644 \u0627\u0632 \u0628\u062E\u0634 \xAB\u062C\u0633\u062A\u200C\u0648\u062C\u0648\u06CC \u062A\u0635\u0648\u06CC\u0631\xBB \u06CC\u0627 \u0628\u0627\u0631\u06AF\u0630\u0627\u0631\u06CC\u060C \u0639\u06A9\u0633 \u0628\u06AF\u0630\u0627\u0631.",
      "adm.igCopyCap": "\u06A9\u067E\u06CC \u0645\u062A\u0646",
      "adm.igCopyTags": "\u06A9\u067E\u06CC \u0647\u0634\u062A\u06AF\u200C\u0647\u0627",
      "adm.igCopyAll": "\u06A9\u067E\u06CC \u0645\u062A\u0646 + \u0647\u0634\u062A\u06AF",
      "adm.bGenerated": "\u0628\u0627\u0631\u06A9\u062F \u0633\u0627\u062E\u062A\u0647 \u0648 \u062B\u0628\u062A \u0634\u062F",
      "adm.bScan": "\u0627\u0633\u06A9\u0646 \u0628\u0627\u0631\u06A9\u062F",
      "adm.bScanMode": "\u062D\u0627\u0644\u062A \u0627\u0633\u06A9\u0646\u0631 (\u0647\u0645\u06AF\u0627\u0645\u200C\u0633\u0627\u0632\u06CC \u062F\u0633\u062A\u06AF\u0627\u0647)",
      "adm.bScanHint": "\u062F\u0633\u062A\u06AF\u0627\u0647 \u0628\u0627\u0631\u06A9\u062F\u062E\u0648\u0627\u0646 \u0631\u0627 \u0645\u062B\u0644 \u06A9\u06CC\u0628\u0648\u0631\u062F \u0648\u0635\u0644 \u06A9\u0646\u061B \u0631\u0648\u06CC \u06A9\u0627\u062F\u0631 \u0632\u06CC\u0631 \u06A9\u0644\u06CC\u06A9 \u06A9\u0646 \u0648 \u0627\u0633\u06A9\u0646 \u06A9\u0646. \u0627\u0633\u06A9\u0646 \u0628\u0627 \u062F\u0648\u0631\u0628\u06CC\u0646 \u0647\u0645 \u06A9\u0627\u0631 \u0645\u06CC\u200C\u06A9\u0646\u062F.",
      "adm.bConnected": "\u062F\u0633\u062A\u06AF\u0627\u0647 \u0645\u062A\u0635\u0644 \u0634\u062F \u2014 \u0622\u0645\u0627\u062F\u0647\u200C\u06CC \u0627\u0633\u06A9\u0646",
      "adm.bSerial": "\u0627\u062A\u0635\u0627\u0644 \u0645\u0633\u062A\u0642\u06CC\u0645 \u0628\u0627 Web Serial",
      "adm.bSerialHint": "\u0627\u06AF\u0631 \u062F\u0633\u062A\u06AF\u0627\u0647\u062A \u067E\u0648\u0631\u062A \u0633\u0631\u06CC\u0627\u0644 \u06CC\u0627 USB \u062F\u0627\u0631\u062F\u060C \u0627\u0632 \u0627\u06CC\u0646\u062C\u0627 \u0648\u0635\u0644 \u0634\u0648 (\u0641\u0642\u0637 \u06A9\u0631\u0648\u0645 \u0648 \u0627\u062C \u062F\u0633\u06A9\u062A\u0627\u067E).",
      "adm.bSerialUnsupported": "\u0645\u0631\u0648\u0631\u06AF\u0631 \u062A\u0648 \u0627\u0632 Web Serial \u067E\u0634\u062A\u06CC\u0628\u0627\u0646\u06CC \u0646\u0645\u06CC\u200C\u06A9\u0646\u062F\u061B \u0627\u0632 \u062D\u0627\u0644\u062A \u06A9\u06CC\u0628\u0648\u0631\u062F \u06CC\u0627 \u062F\u0648\u0631\u0628\u06CC\u0646 \u0627\u0633\u062A\u0641\u0627\u062F\u0647 \u06A9\u0646.",
      "adm.bSerialConnected": "\u0645\u062A\u0635\u0644 \u0634\u062F",
      "adm.bSerialClosed": "\u0627\u062A\u0635\u0627\u0644 \u0628\u0633\u062A\u0647 \u0634\u062F",
      "adm.bHistory": "\u0627\u0633\u06A9\u0646\u200C\u0647\u0627\u06CC \u0627\u062E\u06CC\u0631",
      "adm.isTitle": "\u0627\u06CC\u0646\u062F\u06A9\u0633 \u062A\u0635\u0648\u06CC\u0631 \u0628\u0631\u0627\u06CC \u062C\u0633\u062A\u200C\u0648\u062C\u0648\u06CC \u062A\u0635\u0648\u06CC\u0631\u06CC",
      "adm.isHint": "\u06CC\u06A9\u200C\u0628\u0627\u0631 \u0627\u06CC\u0646\u062F\u06A9\u0633 \u0631\u0627 \u0628\u0633\u0627\u0632 \u062A\u0627 \u0645\u0634\u062A\u0631\u06CC\u200C\u0647\u0627 \u0628\u062A\u0648\u0627\u0646\u0646\u062F \u0628\u0627 \u0639\u06A9\u0633 \u062C\u0633\u062A\u200C\u0648\u062C\u0648 \u06A9\u0646\u0646\u062F. \u062F\u0631 \u0645\u0631\u0648\u0631\u06AF\u0631 \u062E\u0648\u062F\u062A \u0627\u062C\u0631\u0627 \u0645\u06CC\u200C\u0634\u0648\u062F \u0648 \u0628\u0627\u0631\u06CC \u0631\u0648\u06CC \u0633\u0631\u0648\u0631 \u0646\u062F\u0627\u0631\u062F.",
      "adm.isBuild": "\u0633\u0627\u062E\u062A \u0627\u06CC\u0646\u062F\u06A9\u0633",
      "adm.isBuilding": "\u062F\u0631 \u062D\u0627\u0644 \u0627\u06CC\u0646\u062F\u06A9\u0633\u200C\u0633\u0627\u0632\u06CC\u2026",
      "adm.isDone": "\u0627\u06CC\u0646\u062F\u06A9\u0633 \u0633\u0627\u062E\u062A\u0647 \u0634\u062F",
      "adm.isCount": "\u062A\u0635\u0648\u06CC\u0631\u0647\u0627\u06CC \u0627\u06CC\u0646\u062F\u06A9\u0633\u200C\u0634\u062F\u0647",
      "adm.auditAction": "\u0631\u0648\u06CC\u062F\u0627\u062F",
      "adm.auditActor": "\u06A9\u0627\u0631\u0628\u0631",
      "adm.auditTarget": "\u0645\u0648\u0636\u0648\u0639",
      "adm.auditMeta": "\u062C\u0632\u0626\u06CC\u0627\u062A",
      "adm.statsRevenue": "\u062F\u0631\u0622\u0645\u062F",
      "adm.statsVisits": "\u0628\u0627\u0632\u062F\u06CC\u062F",
      "adm.statsOrders": "\u0633\u0641\u0627\u0631\u0634",
      "adm.statsByCat": "\u0639\u0645\u0644\u06A9\u0631\u062F \u062F\u0633\u062A\u0647\u200C\u0647\u0627",
      "adm.statsByBrand": "\u0641\u0631\u0648\u0634 \u0628\u0631 \u0627\u0633\u0627\u0633 \u0628\u0631\u0646\u062F",
      "adm.statsStockValue": "\u0627\u0631\u0632\u0634 \u0645\u0648\u062C\u0648\u062F\u06CC",
      "adm.statsAvgOrder": "\u0645\u06CC\u0627\u0646\u06AF\u06CC\u0646 \u0633\u0628\u062F \u062E\u0631\u06CC\u062F",
      "adm.exportProducts": "\u062E\u0631\u0648\u062C\u06CC \u06A9\u0627\u0644\u0627\u0647\u0627",
      "adm.exportOrders": "\u062E\u0631\u0648\u062C\u06CC \u0633\u0641\u0627\u0631\u0634\u200C\u0647\u0627",
      "adm.exportUsers": "\u062E\u0631\u0648\u062C\u06CC \u06A9\u0627\u0631\u0628\u0631\u0627\u0646",
      "adm.exportReviews": "\u062E\u0631\u0648\u062C\u06CC \u0646\u0638\u0631\u0627\u062A",
      "adm.exportTickets": "\u062E\u0631\u0648\u062C\u06CC \u062A\u06CC\u06A9\u062A\u200C\u0647\u0627",
      "adm.exportAudit": "\u062E\u0631\u0648\u062C\u06CC \u0631\u0648\u06CC\u062F\u0627\u062F\u0647\u0627",
      "adm.exportAll": "\u067E\u0634\u062A\u06CC\u0628\u0627\u0646 \u06A9\u0627\u0645\u0644 (JSON)",
      "adm.backup": "\u0633\u0627\u062E\u062A \u067E\u0634\u062A\u06CC\u0628\u0627\u0646",
      "adm.backupDone": "\u067E\u0634\u062A\u06CC\u0628\u0627\u0646 \u0633\u0627\u062E\u062A\u0647 \u0634\u062F",
      "adm.cleanup": "\u067E\u0627\u06A9\u200C\u0633\u0627\u0632\u06CC \u062F\u0627\u062F\u0647\u200C\u0647\u0627\u06CC \u0642\u062F\u06CC\u0645\u06CC",
      "adm.cleanupDone": "\u067E\u0627\u06A9\u200C\u0633\u0627\u0632\u06CC \u0627\u0646\u062C\u0627\u0645 \u0634\u062F",
      "adm.pageEditHint": "\u0645\u062A\u0646 \u0635\u0641\u062D\u0647\u200C\u0647\u0627 \u0631\u0627 \u0627\u06CC\u0646\u062C\u0627 \u0648\u06CC\u0631\u0627\u06CC\u0634 \u06A9\u0646\u061B \u062A\u063A\u06CC\u06CC\u0631\u0647\u0627 \u0641\u0648\u0631\u0627\u064B \u062F\u0631 \u0633\u0627\u06CC\u062A \u0627\u0639\u0645\u0627\u0644 \u0645\u06CC\u200C\u0634\u0648\u062F.",
      "adm.noPermission": "\u0628\u0631\u0627\u06CC \u0627\u06CC\u0646 \u0628\u062E\u0634 \u062F\u0633\u062A\u0631\u0633\u06CC \u0646\u062F\u0627\u0631\u06CC. \u0627\u0632 \u0645\u0627\u0644\u06A9 \u0628\u062E\u0648\u0627\u0647 \u0622\u0646 \u0631\u0627 \u0641\u0639\u0627\u0644 \u06A9\u0646\u062F.",
      "adm.liveView": "\u067E\u06CC\u0634\u200C\u0646\u0645\u0627\u06CC\u0634 \u0632\u0646\u062F\u0647\u200C\u06CC \u062A\u063A\u06CC\u06CC\u0631\u0627\u062A",
      "adm.saved": "\u0630\u062E\u06CC\u0631\u0647 \u0634\u062F",
      "st.pending_payment": "\u062F\u0631 \u0627\u0646\u062A\u0638\u0627\u0631 \u067E\u0631\u062F\u0627\u062E\u062A",
      "st.pending_review": "\u062F\u0631 \u0627\u0646\u062A\u0638\u0627\u0631 \u0628\u0631\u0631\u0633\u06CC",
      "st.confirmed": "\u062A\u0623\u06CC\u06CC\u062F \u0634\u062F\u0647",
      "st.preparing": "\u062F\u0631 \u062D\u0627\u0644 \u0622\u0645\u0627\u062F\u0647\u200C\u0633\u0627\u0632\u06CC",
      "st.ready_pickup": "\u0622\u0645\u0627\u062F\u0647\u200C\u06CC \u062A\u062D\u0648\u06CC\u0644 \u062D\u0636\u0648\u0631\u06CC",
      "st.shipped": "\u0627\u0631\u0633\u0627\u0644 \u0634\u062F\u0647",
      "st.delivered": "\u062A\u062D\u0648\u06CC\u0644 \u0634\u062F\u0647",
      "st.cancelled": "\u0644\u063A\u0648 \u0634\u062F\u0647",
      "st.refunded": "\u0628\u0627\u0632\u06AF\u0634\u062A \u0648\u062C\u0647",
      "st.returned": "\u0645\u0631\u062C\u0648\u0639 \u0634\u062F\u0647",
      "dl.pickup": "\u062A\u062D\u0648\u06CC\u0644 \u062D\u0636\u0648\u0631\u06CC",
      "dl.courier": "\u0627\u0631\u0633\u0627\u0644 \u067E\u0633\u062A\u06CC",
      "pm.wallet": "\u06A9\u06CC\u0641 \u067E\u0648\u0644",
      "pm.gateway": "\u062F\u0631\u06AF\u0627\u0647 \u0628\u0627\u0646\u06A9\u06CC",
      "pm.cod": "\u067E\u0631\u062F\u0627\u062E\u062A \u062F\u0631 \u0645\u062D\u0644",
      "ps.unpaid": "\u067E\u0631\u062F\u0627\u062E\u062A\u200C\u0646\u0634\u062F\u0647",
      "ps.paid": "\u067E\u0631\u062F\u0627\u062E\u062A\u200C\u0634\u062F\u0647",
      "ps.pending": "\u062F\u0631 \u0627\u0646\u062A\u0638\u0627\u0631",
      "ps.refunded": "\u0628\u0627\u0632\u06AF\u0634\u062A \u062F\u0627\u062F\u0647 \u0634\u062F",
      "ps.failed": "\u0646\u0627\u0645\u0648\u0641\u0642",
      "ps.cancelled": "\u0644\u063A\u0648 \u0634\u062F\u0647",
      "tc.order": "\u067E\u06CC\u06AF\u06CC\u0631\u06CC \u0633\u0641\u0627\u0631\u0634",
      "tc.return": "\u0645\u0631\u062C\u0648\u0639\u06CC \u0648 \u0628\u0627\u0632\u06AF\u0634\u062A \u0648\u062C\u0647",
      "tc.product": "\u0633\u0624\u0627\u0644 \u062F\u0631\u0628\u0627\u0631\u0647\u200C\u06CC \u06A9\u0627\u0644\u0627",
      "tc.technical": "\u0645\u0634\u06A9\u0644 \u0641\u0646\u06CC \u0633\u0627\u06CC\u062A",
      "tc.complaint": "\u0634\u06A9\u0627\u06CC\u062A",
      "tc.partnership": "\u0647\u0645\u06A9\u0627\u0631\u06CC \u0648 \u062A\u0628\u0644\u06CC\u063A\u0627\u062A",
      "tc.account": "\u062D\u0633\u0627\u0628 \u06A9\u0627\u0631\u0628\u0631\u06CC \u0648 \u0627\u0645\u0646\u06CC\u062A",
      "tc.other": "\u0633\u0627\u06CC\u0631 \u0645\u0648\u0627\u0631\u062F",
      "tp.critical": "\u0628\u062D\u0631\u0627\u0646\u06CC",
      "tp.high": "\u0632\u06CC\u0627\u062F",
      "tp.normal": "\u0645\u0639\u0645\u0648\u0644\u06CC",
      "tp.low": "\u06A9\u0645",
      "ft.suggestion": "\u067E\u06CC\u0634\u0646\u0647\u0627\u062F",
      "ft.complaint": "\u0634\u06A9\u0627\u06CC\u062A",
      "ft.bug": "\u06AF\u0632\u0627\u0631\u0634 \u062E\u0637\u0627",
      "fs.new": "\u062C\u062F\u06CC\u062F",
      "fs.seen": "\u062F\u06CC\u062F\u0647 \u0634\u062F\u0647",
      "fs.in_progress": "\u062F\u0631 \u062D\u0627\u0644 \u067E\u06CC\u06AF\u06CC\u0631\u06CC",
      "fs.done": "\u0627\u0646\u062C\u0627\u0645 \u0634\u062F\u0647",
      "fs.rejected": "\u0631\u062F \u0634\u062F\u0647",
      "tk.open": "\u0628\u0627\u0632",
      "tk.answered": "\u067E\u0627\u0633\u062E \u062F\u0627\u062F\u0647 \u0634\u062F\u0647",
      "tk.closed": "\u0628\u0633\u062A\u0647",
      "feat.wallet": "\u06A9\u06CC\u0641 \u067E\u0648\u0644",
      "feat.plus": "\u0627\u0634\u062A\u0631\u0627\u06A9 \u067E\u0644\u0627\u0633",
      "feat.insurance": "\u0628\u06CC\u0645\u0647\u200C\u06CC \u0645\u0631\u0633\u0648\u0644\u0647",
      "feat.tickets": "\u0633\u0627\u0645\u0627\u0646\u0647\u200C\u06CC \u062A\u06CC\u06A9\u062A",
      "feat.reviews": "\u0646\u0638\u0631\u0627\u062A \u0645\u0634\u062A\u0631\u06CC\u0627\u0646",
      "feat.questions": "\u0633\u0624\u0627\u0644\u0627\u062A \u0645\u0634\u062A\u0631\u06CC\u0627\u0646",
      "feat.ads": "\u062A\u0628\u0644\u06CC\u063A\u0627\u062A \u062F\u0627\u062E\u0644 \u0633\u0627\u06CC\u062A",
      "feat.imageSearch": "\u062C\u0633\u062A\u200C\u0648\u062C\u0648\u06CC \u062A\u0635\u0648\u06CC\u0631\u06CC",
      "feat.barcode": "\u0628\u0627\u0631\u06A9\u062F \u0648 \u0628\u0631\u0686\u0633\u0628",
      "feat.priceCheckDevice": "\u062D\u0627\u0644\u062A \u0646\u0645\u0627\u06CC\u0634 \u0642\u06CC\u0645\u062A",
      "feat.publicStats": "\u0622\u0645\u0627\u0631 \u0639\u0645\u0648\u0645\u06CC",
      "feat.coupons": "\u06A9\u062F\u0647\u0627\u06CC \u062A\u062E\u0641\u06CC\u0641",
      "feat.consent": "\u0645\u0648\u062F\u0627\u0644 \u062A\u0648\u0627\u0641\u0642 \u06A9\u0648\u06A9\u06CC (\u0627\u0648\u0644\u06CC\u0646 \u0628\u0627\u0632\u062F\u06CC\u062F)",
      "feat.liveSupport": "\u0686\u062A \u067E\u0634\u062A\u06CC\u0628\u0627\u0646\u06CC \u0622\u0646\u0644\u0627\u06CC\u0646",
      "feat.announcements": "\u0627\u0639\u0644\u0627\u0646\u200C\u0647\u0627",
      "feat.wishlist": "\u0644\u06CC\u0633\u062A \u0645\u0646",
      "feat.compare": "\u0645\u0642\u0627\u06CC\u0633\u0647\u200C\u06CC \u06A9\u0627\u0644\u0627",
      "feat.recentlyViewed": "\u06A9\u0627\u0644\u0627\u0647\u0627\u06CC \u062F\u06CC\u062F\u0647\u200C\u0634\u062F\u0647",
      "feat.guestCheckout": "\u062E\u0631\u06CC\u062F \u0628\u062F\u0648\u0646 \u062D\u0633\u0627\u0628 \u06A9\u0627\u0631\u0628\u0631\u06CC",
      "feat.priceAlerts": "\u0627\u0639\u0644\u0627\u0646 \u0645\u0648\u062C\u0648\u062F \u0634\u062F\u0646 \u06A9\u0627\u0644\u0627",
      "feat.twoFactor": "\u0648\u0631\u0648\u062F \u062F\u0648\u0645\u0631\u062D\u0644\u0647\u200C\u0627\u06CC",
      "feat.referrals": "\u06A9\u062F \u0645\u0639\u0631\u0641",
      "feat.voiceSearch": "\u062C\u0633\u062A\u200C\u0648\u062C\u0648\u06CC \u0635\u0648\u062A\u06CC",
      "feat.offlineMode": "\u062D\u0627\u0644\u062A \u0622\u0641\u0644\u0627\u06CC\u0646",
      "feat.captcha": "\u06A9\u067E\u0686\u0627 (\u0645\u0646 \u0631\u0628\u0627\u062A \u0646\u06CC\u0633\u062A\u0645)",
      "captcha.required": "\u0628\u0631\u0627\u06CC \u0648\u0631\u0648\u062F\u060C \u0627\u0648\u0644 \u062A\u0623\u06CC\u06CC\u062F \u06A9\u0646 \u06A9\u0647 \u0631\u0628\u0627\u062A \u0646\u06CC\u0633\u062A\u06CC: \u062A\u06CC\u06A9 \u0628\u0632\u0646 \u0648 \u062D\u0627\u0635\u0644 \u0639\u0628\u0627\u0631\u062A \u0631\u0627 \u0628\u0646\u0648\u06CC\u0633.",
      "captcha.label": "\u0645\u0646 \u0631\u0628\u0627\u062A \u0646\u06CC\u0633\u062A\u0645",
      "captcha.hint": "\u062A\u06CC\u06A9 \u0628\u0632\u0646\u060C \u0628\u0639\u062F \u062D\u0627\u0635\u0644 \u0639\u0628\u0627\u0631\u062A \u062A\u0635\u0648\u06CC\u0631 \u0631\u0627 \u0628\u0646\u0648\u06CC\u0633",
      "captcha.placeholder": "\u062D\u0627\u0635\u0644 \u0639\u0628\u0627\u0631\u062A",
      "captcha.solved": "\u062A\u0623\u06CC\u06CC\u062F \u0634\u062F \u06A9\u0647 \u0631\u0628\u0627\u062A \u0646\u06CC\u0633\u062A\u06CC \u2714",
      "captcha.refresh": "\u0633\u0624\u0627\u0644 \u062A\u0627\u0632\u0647",
      "perm.dashboard.view": "\u0645\u0634\u0627\u0647\u062F\u0647\u200C\u06CC \u062F\u0627\u0634\u0628\u0648\u0631\u062F",
      "perm.products.view": "\u0645\u0634\u0627\u0647\u062F\u0647\u200C\u06CC \u06A9\u0627\u0644\u0627\u0647\u0627",
      "perm.products.create": "\u0627\u06CC\u062C\u0627\u062F \u06A9\u0627\u0644\u0627",
      "perm.products.edit": "\u0648\u06CC\u0631\u0627\u06CC\u0634 \u06A9\u0627\u0644\u0627",
      "perm.products.delete": "\u062D\u0630\u0641 \u06A9\u0627\u0644\u0627",
      "perm.products.price": "\u062A\u063A\u06CC\u06CC\u0631 \u0642\u06CC\u0645\u062A \u0648 \u062A\u062E\u0641\u06CC\u0641",
      "perm.products.stock": "\u062A\u063A\u06CC\u06CC\u0631 \u0645\u0648\u062C\u0648\u062F\u06CC",
      "perm.categories.manage": "\u0645\u062F\u06CC\u0631\u06CC\u062A \u062F\u0633\u062A\u0647\u200C\u0647\u0627 \u0648 \u0628\u0631\u0646\u062F\u0647\u0627",
      "perm.orders.view": "\u0645\u0634\u0627\u0647\u062F\u0647\u200C\u06CC \u0633\u0641\u0627\u0631\u0634\u200C\u0647\u0627",
      "perm.orders.manage": "\u062A\u063A\u06CC\u06CC\u0631 \u0648\u0636\u0639\u06CC\u062A \u0633\u0641\u0627\u0631\u0634",
      "perm.refunds.manage": "\u0645\u0631\u062C\u0648\u0639\u06CC \u0648 \u0644\u063A\u0648 \u0633\u0641\u0627\u0631\u0634",
      "perm.reviews.moderate": "\u062A\u0623\u06CC\u06CC\u062F \u0648 \u0645\u062F\u06CC\u0631\u06CC\u062A \u0646\u0638\u0631\u0627\u062A",
      "perm.reviews.reply": "\u067E\u0627\u0633\u062E \u0628\u0647 \u0646\u0638\u0631\u0627\u062A",
      "perm.tickets.manage": "\u0645\u062F\u06CC\u0631\u06CC\u062A \u062A\u06CC\u06A9\u062A\u200C\u0647\u0627",
      "perm.feedback.manage": "\u0628\u0627\u0632\u062E\u0648\u0631\u062F\u0647\u0627 \u0648 \u062E\u0637\u0627\u0647\u0627",
      "perm.users.view": "\u0645\u0634\u0627\u0647\u062F\u0647\u200C\u06CC \u06A9\u0627\u0631\u0628\u0631\u0627\u0646",
      "perm.users.manage": "\u0645\u062F\u06CC\u0631\u06CC\u062A \u06A9\u0627\u0631\u0628\u0631\u0627\u0646",
      "perm.users.permissions": "\u062A\u0639\u06CC\u06CC\u0646 \u062F\u0633\u062A\u0631\u0633\u06CC\u200C\u0647\u0627",
      "perm.wallet.manage": "\u0645\u062F\u06CC\u0631\u06CC\u062A \u06A9\u06CC\u0641 \u067E\u0648\u0644",
      "perm.plus.manage": "\u0645\u062F\u06CC\u0631\u06CC\u062A \u0627\u0634\u062A\u0631\u0627\u06A9 \u067E\u0644\u0627\u0633",
      "perm.coupons.manage": "\u0645\u062F\u06CC\u0631\u06CC\u062A \u06A9\u062F\u0647\u0627\u06CC \u062A\u062E\u0641\u06CC\u0641",
      "perm.ads.manage": "\u0645\u062F\u06CC\u0631\u06CC\u062A \u062A\u0628\u0644\u06CC\u063A\u0627\u062A",
      "perm.notifications.send": "\u0627\u0631\u0633\u0627\u0644 \u0627\u0639\u0644\u0627\u0646",
      "perm.settings.edit": "\u062A\u0646\u0638\u06CC\u0645\u0627\u062A \u0641\u0631\u0648\u0634\u06AF\u0627\u0647",
      "perm.theme.edit": "\u067E\u0648\u0633\u062A\u0647 \u0648 \u0686\u06CC\u062F\u0645\u0627\u0646",
      "perm.pages.edit": "\u0648\u06CC\u0631\u0627\u06CC\u0634 \u0645\u062D\u062A\u0648\u0627\u06CC \u0635\u0641\u062D\u0647\u200C\u0647\u0627",
      "perm.barcode.print": "\u0686\u0627\u067E \u0628\u0631\u0686\u0633\u0628",
      "perm.barcode.scan": "\u0627\u0633\u06A9\u0646 \u0648 \u0646\u0645\u0627\u06CC\u0634 \u0642\u06CC\u0645\u062A",
      "perm.imagesearch.index": "\u0627\u06CC\u0646\u062F\u06A9\u0633 \u062A\u0635\u0648\u06CC\u0631\u06CC",
      "perm.audit.view": "\u06AF\u0632\u0627\u0631\u0634 \u0631\u0648\u06CC\u062F\u0627\u062F\u0647\u0627",
      "perm.stats.view": "\u0622\u0645\u0627\u0631",
      "perm.data.export": "\u062E\u0631\u0648\u062C\u06CC \u062F\u0627\u062F\u0647\u200C\u0647\u0627",
      "misc.quickView": "\u0645\u0634\u0627\u0647\u062F\u0647\u200C\u06CC \u0633\u0631\u06CC\u0639",
      "misc.addToHome": "\u0627\u0641\u0632\u0648\u062F\u0646 \u0628\u0647 \u0635\u0641\u062D\u0647\u200C\u06CC \u0627\u0635\u0644\u06CC",
      "misc.installHint": "\u062F\u0631 \u0645\u0646\u0648\u06CC \u0645\u0631\u0648\u0631\u06AF\u0631\u060C \u06AF\u0632\u06CC\u0646\u0647\u200C\u06CC \xABAdd to Home screen\xBB \u06CC\u0627 \xABInstall\xBB \u0631\u0627 \u0628\u0632\u0646.",
      "misc.printBlocked": "\u067E\u0646\u062C\u0631\u0647\u200C\u06CC \u0686\u0627\u067E \u0628\u0627\u0632 \u0646\u0634\u062F\u061B \u0644\u0637\u0641\u0627\u064B \u067E\u0627\u067E\u200C\u0622\u067E \u0631\u0627 \u0645\u062C\u0627\u0632 \u06A9\u0646.",
      "misc.saved": "\u0630\u062E\u06CC\u0631\u0647 \u0634\u062F",
      "misc.deleted": "\u062D\u0630\u0641 \u0634\u062F",
      "misc.updated": "\u0628\u0647\u200C\u0631\u0648\u0632\u0631\u0633\u0627\u0646\u06CC \u0634\u062F",
      "misc.confirmDelete": "\u0627\u06CC\u0646 \u0645\u0648\u0631\u062F \u062D\u0630\u0641 \u0634\u0648\u062F\u061F",
      "misc.loadingMore": "\u062F\u0631 \u062D\u0627\u0644 \u0628\u0627\u0631\u06AF\u0630\u0627\u0631\u06CC\u2026",
      "misc.recentlyViewed": "\u06A9\u0627\u0644\u0627\u0647\u0627\u06CC \u062F\u06CC\u062F\u0647\u200C\u0634\u062F\u0647",
      "misc.uiSound": "\u0635\u062F\u0627\u06CC \u06A9\u0644\u06CC\u06A9 \u0631\u0627\u0628\u0637",
      "misc.uiSoundOn": "\u0635\u062F\u0627\u06CC \u06A9\u0644\u06CC\u06A9 \u0631\u0648\u0634\u0646 \u0634\u062F",
      "misc.uiSoundOff": "\u0635\u062F\u0627\u06CC \u06A9\u0644\u06CC\u06A9 \u062E\u0627\u0645\u0648\u0634 \u0634\u062F",
      "misc.shareDone": "\u0644\u06CC\u0646\u06A9 \u06A9\u067E\u06CC \u0634\u062F",
      "misc.shareNative": "\u0627\u0634\u062A\u0631\u0627\u06A9\u200C\u06AF\u0630\u0627\u0631\u06CC",
      "img.alt": "\u062A\u0635\u0648\u06CC\u0631 \u06A9\u0627\u0644\u0627",
      "adm.view": "\u0645\u0634\u0627\u0647\u062F\u0647",
      "adm.support": "\u0686\u062A \u067E\u0634\u062A\u06CC\u0628\u0627\u0646\u06CC",
      "adm.supSelect": "\u06CC\u06A9 \u06AF\u0641\u062A\u200C\u0648\u06AF\u0648 \u0631\u0627 \u0627\u0646\u062A\u062E\u0627\u0628 \u06A9\u0646",
      "adm.supSelectHint": "\u0627\u0632 \u0641\u0647\u0631\u0633\u062A \u06A9\u0646\u0627\u0631\u060C \u06AF\u0641\u062A\u200C\u0648\u06AF\u0648\u06CC \u06A9\u0627\u0631\u0628\u0631 \u0631\u0627 \u0628\u0627\u0632 \u06A9\u0646 \u062A\u0627 \u067E\u0627\u0633\u062E \u0628\u062F\u0647\u06CC.",
      "adm.tkReply": "\u067E\u0627\u0633\u062E \u067E\u0634\u062A\u06CC\u0628\u0627\u0646\u06CC",
      "adm.tkManage": "\u0645\u062F\u06CC\u0631\u06CC\u062A \u062A\u06CC\u06A9\u062A",
      "common.updated": "\u0628\u0647\u200C\u0631\u0648\u0632\u0631\u0633\u0627\u0646\u06CC",
      "common.link": "\u0644\u06CC\u0646\u06A9",
      "common.text": "\u0645\u062A\u0646",
      "cart.coupon": "\u06A9\u062F \u062A\u062E\u0641\u06CC\u0641",
      "misc.sent": "\u0627\u0631\u0633\u0627\u0644 \u0634\u062F",
      "misc.copied": "\u06A9\u067E\u06CC \u0634\u062F",
      "adm.revPending": "\u062F\u0631 \u0627\u0646\u062A\u0638\u0627\u0631 \u0628\u0631\u0631\u0633\u06CC",
      "adm.revApproved": "\u0645\u0646\u062A\u0634\u0631\u0634\u062F\u0647",
      "adm.revRejected": "\u0631\u062F\u0634\u062F\u0647",
      "adm.revApprove": "\u0627\u0646\u062A\u0634\u0627\u0631",
      "adm.revReject": "\u0631\u062F",
      "adm.revReply": "\u067E\u0627\u0633\u062E \u0641\u0631\u0648\u0634\u06AF\u0627\u0647",
      "adm.revEmpty": "\u0645\u0648\u0631\u062F\u06CC \u062F\u0631 \u0627\u06CC\u0646 \u0648\u0636\u0639\u06CC\u062A \u0646\u06CC\u0633\u062A",
      "adm.revEmptyHint": "\u0646\u0638\u0631 \u06CC\u0627 \u067E\u0631\u0633\u0634 \u062A\u0627\u0632\u0647\u200C\u0627\u06CC \u0628\u0631\u0627\u06CC \u0628\u0631\u0631\u0633\u06CC \u0648\u062C\u0648\u062F \u0646\u062F\u0627\u0631\u062F.",
      "rev.buyer": "\u062E\u0631\u06CC\u062F\u0627\u0631",
      "rev.visitor": "\u0628\u0627\u0632\u062F\u06CC\u062F\u06A9\u0646\u0646\u062F\u0647",
      "rev.shopReply": "\u067E\u0627\u0633\u062E \u0641\u0631\u0648\u0634\u06AF\u0627\u0647",
      "fb.new": "\u062C\u062F\u06CC\u062F",
      "fb.seen": "\u062F\u06CC\u062F\u0647 \u0634\u062F",
      "fb.inProgress": "\u062F\u0631 \u062D\u0627\u0644 \u0628\u0631\u0631\u0633\u06CC",
      "fb.done": "\u0627\u0646\u062C\u0627\u0645 \u0634\u062F",
      "fb.rejected": "\u0631\u062F \u0634\u062F",
      "feedback.suggestion": "\u067E\u06CC\u0634\u0646\u0647\u0627\u062F",
      "feedback.complaint": "\u0634\u06A9\u0627\u06CC\u062A",
      "feedback.bug": "\u06AF\u0632\u0627\u0631\u0634 \u062E\u0637\u0627",
      "adm.fbEmptyHint": "\u067E\u06CC\u0634\u0646\u0647\u0627\u062F\u060C \u0634\u06A9\u0627\u06CC\u062A \u06CC\u0627 \u06AF\u0632\u0627\u0631\u0634 \u062E\u0637\u0627\u06CC\u06CC \u062B\u0628\u062A \u0646\u0634\u062F\u0647 \u0627\u0633\u062A.",
      "adm.cpNew": "\u06A9\u062F \u062A\u062E\u0641\u06CC\u0641 \u062C\u062F\u06CC\u062F",
      "adm.cpPercent": "\u062F\u0631\u0635\u062F\u06CC",
      "adm.cpAmount": "\u0645\u0628\u0644\u063A\u06CC",
      "adm.cpValue": "\u0645\u0642\u062F\u0627\u0631",
      "adm.cpUsage": "\u0627\u0633\u062A\u0641\u0627\u062F\u0647",
      "adm.cpDates": "\u0628\u0627\u0632\u0647\u200C\u06CC \u0627\u0639\u062A\u0628\u0627\u0631",
      "adm.cpStart": "\u0634\u0631\u0648\u0639",
      "adm.cpEnd": "\u067E\u0627\u06CC\u0627\u0646",
      "adm.cpExpired": "\u0645\u0646\u0642\u0636\u06CC",
      "adm.adNew": "\u0628\u0646\u0631 \u062C\u062F\u06CC\u062F",
      "adm.adSlot": "\u062C\u0627\u06CC\u06AF\u0627\u0647 \u0646\u0645\u0627\u06CC\u0634",
      "adm.adsHint": "\u0628\u0646\u0631\u0647\u0627 \u0631\u0627 \u062F\u0631 \u0647\u0631 \u062C\u0627\u06CC \u0633\u0627\u06CC\u062A \u0632\u0645\u0627\u0646\u200C\u0628\u0646\u062F\u06CC\u060C \u0641\u0639\u0627\u0644 \u06CC\u0627 \u063A\u06CC\u0631\u0641\u0639\u0627\u0644 \u06A9\u0646.",
      "adm.notifNew": "\u0627\u0639\u0644\u0627\u0646 \u062C\u062F\u06CC\u062F",
      "adm.notifHint": "\u0627\u0639\u0644\u0627\u0646 \u0631\u0627 \u0628\u0631\u0627\u06CC \u0647\u0645\u0647\u200C\u06CC \u06A9\u0627\u0631\u0628\u0631\u0627\u0646 \u06CC\u0627 \u06CC\u06A9 \u06A9\u0627\u0631\u0628\u0631 \u062E\u0627\u0635 \u0628\u0641\u0631\u0633\u062A.",
      "adm.notifLevel": "\u0633\u0637\u062D",
      "adm.notifRecent": "\u0627\u0639\u0644\u0627\u0646\u200C\u0647\u0627\u06CC \u0627\u062E\u06CC\u0631",
      "notif.level.info": "\u0627\u0637\u0644\u0627\u0639",
      "notif.level.success": "\u0645\u0648\u0641\u0642",
      "notif.level.warning": "\u0647\u0634\u062F\u0627\u0631",
      "notif.level.error": "\u062E\u0637\u0627",
      "adm.pagesPick": "\u06CC\u06A9 \u0635\u0641\u062D\u0647 \u0631\u0627 \u0627\u0646\u062A\u062E\u0627\u0628 \u06A9\u0646",
      "adm.pagesPickHint": "\u0627\u0632 \u0641\u0647\u0631\u0633\u062A \u06A9\u0646\u0627\u0631\u060C \u0635\u0641\u062D\u0647\u200C\u0627\u06CC \u0631\u0627 \u06A9\u0647 \u0645\u06CC\u200C\u062E\u0648\u0627\u0647\u06CC \u0648\u06CC\u0631\u0627\u06CC\u0634 \u06A9\u0646\u06CC \u0627\u0646\u062A\u062E\u0627\u0628 \u06A9\u0646.",
      "adm.pgHint": "\u062A\u063A\u06CC\u06CC\u0631\u0647\u0627 \u0641\u0642\u0637 \u0645\u062A\u0646\u200C\u0627\u0646\u062F \u0648 \u0628\u0644\u0627\u0641\u0627\u0635\u0644\u0647 \u0631\u0648\u06CC \u0635\u0641\u062D\u0647 \u0627\u0639\u0645\u0627\u0644 \u0645\u06CC\u200C\u0634\u0648\u0646\u062F.",
      "adm.bPrinter": "\u0686\u0627\u067E\u06AF\u0631 \u0628\u0631\u0686\u0633\u0628",
      "adm.bPrinterHint": "\u0628\u0631\u0686\u0633\u0628\u200C\u0647\u0627 \u0627\u0632 \u0631\u0627\u0647 \u06AF\u0641\u062A\u200C\u0648\u06AF\u0648\u06CC \u0686\u0627\u067E \u0645\u0631\u0648\u0631\u06AF\u0631 \u0628\u0647 \u0686\u0627\u067E\u06AF\u0631 \u0641\u0631\u0633\u062A\u0627\u062F\u0647 \u0645\u06CC\u200C\u0634\u0648\u0646\u062F.",
      "adm.bScanner": "\u0628\u0627\u0631\u06A9\u062F\u062E\u0648\u0627\u0646",
      "adm.bLabels": "\u0633\u0627\u062E\u062A \u0648 \u0686\u0627\u067E \u0628\u0631\u0686\u0633\u0628",
      "adm.bPreview": "\u067E\u06CC\u0634\u200C\u0646\u0645\u0627\u06CC\u0634 \u0628\u0631\u0686\u0633\u0628",
      "adm.bPriceMode": "\u062D\u0627\u0644\u062A \u0646\u0645\u0627\u06CC\u0634 \u0642\u06CC\u0645\u062A",
      "adm.bFound": "\u06A9\u0627\u0644\u0627 \u067E\u06CC\u062F\u0627 \u0634\u062F",
      "adm.bNotFound": "\u06A9\u0627\u0644\u0627\u06CC\u06CC \u0628\u0627 \u0627\u06CC\u0646 \u0628\u0627\u0631\u06A9\u062F \u067E\u06CC\u062F\u0627 \u0646\u0634\u062F.",
      "adm.bPickFirst": "\u0627\u0648\u0644 \u062F\u0633\u062A\u200C\u06A9\u0645 \u06CC\u06A9 \u06A9\u0627\u0644\u0627 \u0631\u0627 \u0627\u0646\u062A\u062E\u0627\u0628 \u06A9\u0646.",
      "adm.ixHint": "\u0627\u062B\u0631\u0627\u0646\u06AF\u0634\u062A \u062A\u0635\u0648\u06CC\u0631 \u0647\u0631 \u06A9\u0627\u0644\u0627 \u062F\u0631 \u0645\u0631\u0648\u0631\u06AF\u0631 \u0645\u062D\u0627\u0633\u0628\u0647 \u0648 \u0630\u062E\u06CC\u0631\u0647 \u0645\u06CC\u200C\u0634\u0648\u062F \u062A\u0627 \u062C\u0633\u062A\u200C\u0648\u062C\u0648\u06CC \u062A\u0635\u0648\u06CC\u0631\u06CC \u06A9\u0627\u0631 \u06A9\u0646\u062F.",
      "adm.ixIndex": "\u0627\u06CC\u0646\u062F\u06A9\u0633 \u062A\u0635\u0627\u0648\u06CC\u0631 \u0628\u0627\u0642\u06CC\u200C\u0645\u0627\u0646\u062F\u0647",
      "adm.ixReindex": "\u0627\u06CC\u0646\u062F\u06A9\u0633 \u062F\u0648\u0628\u0627\u0631\u0647\u200C\u06CC \u0647\u0645\u0647",
      "adm.ixDone": "\u0627\u06CC\u0646\u062F\u06A9\u0633 \u0627\u0646\u062C\u0627\u0645 \u0634\u062F",
      "adm.audActor": "\u06A9\u0627\u0631\u0628\u0631",
      "adm.audAction": "\u0631\u0648\u06CC\u062F\u0627\u062F",
      "adm.audTarget": "\u0647\u062F\u0641",
      "adm.audMeta": "\u062C\u0632\u0626\u06CC\u0627\u062A",
      "adm.stOrders": "\u0633\u0641\u0627\u0631\u0634\u200C\u0647\u0627",
      "adm.stRevenue": "\u062F\u0631\u0622\u0645\u062F",
      "adm.stVisits": "\u0628\u0627\u0632\u062F\u06CC\u062F\u0647\u0627",
      "adm.stUsers": "\u06A9\u0627\u0631\u0628\u0631\u0627\u0646",
      "adm.stProducts": "\u06A9\u0627\u0644\u0627\u0647\u0627",
      "adm.stAvg": "\u0645\u06CC\u0627\u0646\u06AF\u06CC\u0646 \u0633\u0641\u0627\u0631\u0634",
      "adm.stByCat": "\u0639\u0645\u0644\u06A9\u0631\u062F \u062F\u0633\u062A\u0647\u200C\u0647\u0627",
      "adm.stByBrand": "\u067E\u0631\u0641\u0631\u0648\u0634\u200C\u062A\u0631\u06CC\u0646 \u0628\u0631\u0646\u062F\u0647\u0627",
      "adm.data": "\u062F\u0627\u062F\u0647\u200C\u0647\u0627",
      "adm.dataHint": "\u062E\u0631\u0648\u062C\u06CC \u06AF\u0631\u0641\u062A\u0646\u060C \u067E\u0634\u062A\u06CC\u0628\u0627\u0646\u200C\u06AF\u06CC\u0631\u06CC \u0648 \u067E\u0627\u06A9\u200C\u0633\u0627\u0632\u06CC \u062F\u0627\u062F\u0647\u200C\u0647\u0627.",
      "adm.dExport": "\u062E\u0631\u0648\u062C\u06CC",
      "adm.dBackup": "\u067E\u0634\u062A\u06CC\u0628\u0627\u0646\u200C\u06AF\u06CC\u0631\u06CC",
      "adm.dBackupHint": "\u06CC\u06A9 \u0646\u0633\u062E\u0647\u200C\u06CC \u06A9\u0627\u0645\u0644 \u0627\u0632 \u067E\u0627\u06CC\u06AF\u0627\u0647\u200C\u062F\u0627\u062F\u0647 \u062F\u0631 \u067E\u0648\u0634\u0647\u200C\u06CC data \u0630\u062E\u06CC\u0631\u0647 \u0645\u06CC\u200C\u0634\u0648\u062F.",
      "adm.dCleanup": "\u067E\u0627\u06A9\u200C\u0633\u0627\u0632\u06CC",
      "adm.dCleanupHint": "\u0631\u0648\u06CC\u062F\u0627\u062F\u0647\u0627\u06CC \u0642\u062F\u06CC\u0645\u06CC\u200C\u062A\u0631 \u0627\u0632 \u06F9\u06F0 \u0631\u0648\u0632 \u0648 \u0646\u0634\u0633\u062A\u200C\u0647\u0627\u06CC \u0645\u0646\u0642\u0636\u06CC \u062D\u0630\u0641 \u0645\u06CC\u200C\u0634\u0648\u0646\u062F.",
      "sys.turnOn": "\u0631\u0648\u0634\u0646 \u06A9\u0631\u062F\u0646 \u0641\u0631\u0648\u0634\u06AF\u0627\u0647",
      "sys.turnOff": "\u062E\u0627\u0645\u0648\u0634 \u06A9\u0631\u062F\u0646 \u0641\u0631\u0648\u0634\u06AF\u0627\u0647",
      "sys.offConfirm": "\u0645\u0637\u0645\u0626\u0646\u06CC\u061F \u062A\u0627 \u0648\u0642\u062A\u06CC \u062E\u0648\u062F\u062A \u0631\u0648\u0634\u0646\u0634 \u0646\u06A9\u0646\u06CC \u0647\u06CC\u0686\u200C\u06A9\u0633 \u0646\u0645\u06CC\u200C\u062A\u0648\u0627\u0646\u062F \u062E\u0631\u06CC\u062F \u06A9\u0646\u062F.",
      "sys.autoWakeMins": "\u0631\u0648\u0634\u0646 \u0634\u062F\u0646 \u062E\u0648\u062F\u06A9\u0627\u0631 \u0628\u0639\u062F \u0627\u0632 \u0686\u0646\u062F \u062F\u0642\u06CC\u0642\u0647 (\u06F0 = \u0647\u06CC\u0686\u200C\u0648\u0642\u062A)",
      "sys.asleep": "\u0641\u0631\u0648\u0634\u06AF\u0627\u0647 \u062E\u0627\u0645\u0648\u0634 \u0634\u062F.",
      "sys.asleepTimed": "\u0641\u0631\u0648\u0634\u06AF\u0627\u0647 \u062E\u0627\u0645\u0648\u0634 \u0634\u062F\u061B {n} \u062F\u0642\u06CC\u0642\u0647 \u062F\u06CC\u06AF\u0631 \u062E\u0648\u062F\u06A9\u0627\u0631 \u0631\u0648\u0634\u0646 \u0645\u06CC\u200C\u0634\u0648\u062F.",
      "sys.awake": "\u0641\u0631\u0648\u0634\u06AF\u0627\u0647 \u0631\u0648\u0634\u0646 \u0634\u062F.",
      "sys.sleepBanner": "\u0641\u0631\u0648\u0634\u06AF\u0627\u0647 \u0627\u0644\u0627\u0646 \u062E\u0627\u0645\u0648\u0634 \u0627\u0633\u062A. \u0628\u0627 \u062F\u06A9\u0645\u0647\u200C\u06CC \xAB\u0631\u0648\u0634\u0646 \u06A9\u0631\u062F\u0646 \u0641\u0631\u0648\u0634\u06AF\u0627\u0647\xBB \u0628\u0627\u0644\u0627\u06CC \u0647\u0645\u06CC\u0646 \u0635\u0641\u062D\u0647 \u062F\u0648\u0628\u0627\u0631\u0647 \u0631\u0648\u0634\u0646\u0634 \u06A9\u0646.",
      "sys.keepAlive": "\u0646\u06AF\u0647\u200C\u062F\u0627\u0634\u062A\u0646 \u0633\u0631\u0648\u06CC\u0633 \u0641\u0639\u0627\u0644",
      "checkout.guestInfo": "\u0627\u0637\u0644\u0627\u0639\u0627\u062A \u062A\u0645\u0627\u0633 \u0645\u0647\u0645\u0627\u0646",
      "checkout.guestHint": "\u0628\u062F\u0648\u0646 \u0633\u0627\u062E\u062A \u062D\u0633\u0627\u0628 \u062E\u0631\u06CC\u062F \u0645\u06CC\u200C\u06A9\u0646\u06CC\u061B \u0641\u0642\u0637 \u0628\u0631\u0627\u06CC \u0647\u0645\u0627\u0647\u0646\u06AF\u06CC \u062A\u062D\u0648\u06CC\u0644 \u0628\u0647 \u0627\u06CC\u0646 \u0627\u0637\u0644\u0627\u0639\u0627\u062A \u0646\u06CC\u0627\u0632 \u062F\u0627\u0631\u06CC\u0645.",
      "checkout.guestName": "\u0646\u0627\u0645 \u0648 \u0646\u0627\u0645 \u062E\u0627\u0646\u0648\u0627\u062F\u06AF\u06CC",
      "checkout.guestPhone": "\u0634\u0645\u0627\u0631\u0647\u200C\u06CC \u0645\u0648\u0628\u0627\u06CC\u0644",
      "checkout.guestPhoneHint": "\u0645\u062B\u0644\u0627\u064B \u06F0\u06F9\u06F1\u06F2\u06F3\u06F4\u06F5\u06F6\u06F7\u06F8\u06F9",
      "checkout.guestNameRequired": "\u0646\u0627\u0645 \u062E\u0648\u062F \u0631\u0627 \u0628\u0646\u0648\u06CC\u0633.",
      "checkout.guestPhoneInvalid": "\u0634\u0645\u0627\u0631\u0647\u200C\u06CC \u0645\u0648\u0628\u0627\u06CC\u0644 \u0628\u0627\u06CC\u062F \u06F1\u06F1 \u0631\u0642\u0645 \u0648 \u0628\u0627 \u06F0\u06F9 \u0634\u0631\u0648\u0639 \u0634\u0648\u062F.",
      "checkout.guestCodPickup": "\u067E\u0631\u062F\u0627\u062E\u062A \u062F\u0631 \u0645\u062D\u0644 \u0641\u0642\u0637 \u0628\u0631\u0627\u06CC \u0627\u0631\u0633\u0627\u0644 \u067E\u0633\u062A\u06CC \u0645\u0645\u06A9\u0646 \u0627\u0633\u062A\u061B \u0628\u0631\u0627\u06CC \u062A\u062D\u0648\u06CC\u0644 \u062D\u0636\u0648\u0631\u06CC\u060C \u0622\u0646\u0644\u0627\u06CC\u0646 \u067E\u0631\u062F\u0627\u062E\u062A \u06A9\u0646 \u06CC\u0627 \u0648\u0627\u0631\u062F \u062D\u0633\u0627\u0628 \u0634\u0648.",
      "home.recent": "\u0627\u062F\u0627\u0645\u0647\u200C\u06CC \u0628\u0627\u0632\u062F\u06CC\u062F\u0647\u0627\u06CC \u0634\u0645\u0627",
      "home.recentSub": "\u06A9\u0627\u0644\u0627\u0647\u0627\u06CC\u06CC \u06A9\u0647 \u0627\u062E\u06CC\u0631\u0627\u064B \u062F\u06CC\u062F\u0647\u200C\u0627\u06CC",
      "checkout.guestCourierNote": "\u0628\u0631\u0627\u06CC \u0627\u0631\u0633\u0627\u0644 \u067E\u0633\u062A\u06CC \u0648\u0627\u0631\u062F \u062D\u0633\u0627\u0628 \u0634\u0648"
    };
    en = {
      "app.name": "Green Apple",
      "app.tagline": "Mobile accessories & gadgets",
      "common.loading": "Loading\u2026",
      "common.save": "Save",
      "common.saving": "Saving\u2026",
      "common.cancel": "Cancel",
      "common.close": "Close",
      "common.confirm": "Confirm",
      "common.delete": "Delete",
      "common.edit": "Edit",
      "common.add": "Add",
      "common.create": "Create",
      "common.update": "Update",
      "common.search": "Search",
      "common.filter": "Filter",
      "common.filters": "Filters",
      "common.sort": "Sort",
      "common.all": "All",
      "common.none": "None",
      "common.more": "More",
      "common.less": "Less",
      "common.showAll": "View all",
      "common.back": "Back",
      "common.next": "Next",
      "common.prev": "Previous",
      "common.yes": "Yes",
      "common.no": "No",
      "common.optional": "Optional",
      "common.required": "Required",
      "common.copy": "Copy",
      "common.copied": "Copied",
      "common.share": "Share",
      "common.download": "Download",
      "common.upload": "Upload",
      "common.print": "Print",
      "common.refresh": "Refresh",
      "common.retry": "Try again",
      "common.send": "Send",
      "common.sent": "Sent",
      "common.submit": "Submit",
      "common.reply": "Reply",
      "common.view": "View",
      "common.details": "Details",
      "common.status": "Status",
      "common.date": "Date",
      "common.time": "Time",
      "common.amount": "Amount",
      "common.count": "Quantity",
      "common.total": "Total",
      "common.price": "Price",
      "common.stock": "Stock",
      "common.available": "In stock",
      "common.unavailable": "Out of stock",
      "common.inStock": "Available in stock",
      "common.lowStock": "Fewer than 3 left",
      "common.notifyMe": "Notify me when available",
      "common.notified": "We will let you know as soon as it is back",
      "common.category": "Category",
      "common.brand": "Brand",
      "common.product": "Product",
      "common.products": "Products",
      "common.order": "Order",
      "common.orders": "Orders",
      "common.user": "User",
      "common.users": "Users",
      "common.result": "Result",
      "common.results": "Results",
      "common.noResult": "No results found",
      "common.error": "Error",
      "common.success": "Done",
      "common.warning": "Notice",
      "common.note": "Note",
      "common.notes": "Notes",
      "common.description": "Description",
      "common.specs": "Specifications",
      "common.actions": "Actions",
      "common.active": "Active",
      "common.inactive": "Inactive",
      "common.enabled": "On",
      "common.disabled": "Off",
      "common.on": "On",
      "common.off": "Off",
      "common.from": "From",
      "common.to": "To",
      "common.and": "and",
      "common.or": "or",
      "common.today": "Today",
      "common.yesterday": "Yesterday",
      "common.toman": "Toman",
      "common.rial": "Rial",
      "common.page": "Page",
      "common.of": "of",
      "common.items": "items",
      "common.new": "New",
      "common.old": "Old",
      "common.apply": "Apply",
      "common.reset": "Reset",
      "common.clear": "Clear",
      "common.select": "Please select",
      "common.title": "Title",
      "common.body": "Message",
      "common.type": "Type",
      "common.priority": "Priority",
      "common.answer": "Answer",
      "common.message": "Message",
      "common.messages": "Messages",
      "common.attach": "Attachment",
      "common.image": "Image",
      "common.images": "Images",
      "common.phone": "Mobile number",
      "common.email": "Email",
      "common.address": "Address",
      "common.city": "City",
      "common.province": "Province",
      "common.postal": "Postal code",
      "common.name": "Name",
      "common.fullName": "Full name",
      "common.username": "Username",
      "common.password": "Password",
      "common.passwordConfirm": "Repeat password",
      "common.login": "Sign in",
      "common.logout": "Sign out",
      "common.register": "Register",
      "common.guest": "Guest",
      "common.admin": "Admin",
      "common.settings": "Settings",
      "common.help": "Help",
      "common.home": "Home",
      "common.skip": "Skip",
      "common.done": "Done",
      "common.pending": "Pending",
      "common.approved": "Approved",
      "common.rejected": "Rejected",
      "common.open": "Open",
      "common.closed": "Closed",
      "common.all2": "All items",
      "common.never": "Never",
      "common.empty": "Empty",
      "common.secure": "Secure",
      "common.free": "Free",
      "common.unit": "pcs",
      "common.day": "day",
      "common.hour": "hour",
      "common.minute": "minute",
      "common.second": "second",
      "common.percent": "percent",
      "common.discount": "Discount",
      "common.discountCode": "Discount code",
      "common.shipping": "Shipping cost",
      "common.insurance": "Shipment insurance",
      "common.subtotal": "Items subtotal",
      "common.payable": "Amount payable",
      "common.payment": "Payment",
      "common.cart": "Cart",
      "common.wishlist": "My list",
      "common.compare": "Compare",
      "common.profile": "Profile",
      "common.wallet": "Wallet",
      "common.balance": "Balance",
      "common.transactions": "Transactions",
      "common.deposit": "Top up wallet",
      "common.points": "Points",
      "common.ticket": "Ticket",
      "common.tickets": "Tickets",
      "common.support": "Support",
      "common.review": "Review",
      "common.reviews": "Reviews",
      "common.question": "Question",
      "common.questions": "Customer questions",
      "common.rating": "Rating",
      "common.notification": "Notification",
      "common.notifications": "Notifications",
      "common.security": "Security",
      "common.history": "History",
      "common.report": "Report",
      "common.bug": "Bug report",
      "common.suggestion": "Suggestion",
      "common.complaint": "Complaint",
      "common.law": "Terms & conditions",
      "common.privacy": "Privacy policy",
      "common.about": "About us",
      "common.contact": "Contact us",
      "common.faq": "FAQ",
      "common.guide": "Buying guide",
      "common.services": "Customer services",
      "common.stats": "Store statistics",
      "common.searchProducts": "Search products\u2026",
      "common.noData": "Nothing to show",
      "common.tryAgain": "Try again",
      "common.showMore": "Show more",
      "common.perPage": "Per page",
      "skip": "Skip to main content",
      "boot.loading": "Loading Green Apple\u2026",
      "boot.waking": "The cloud server is waking up; we will retry automatically in a few seconds\u2026",
      "boot.failed": "Store unreachable; the cloud server is asleep or the network is down.",
      "update.available": "A new version is ready \u2014 tap to see the changes.",
      "update.reload": "Refresh now",
      "boot.failedHint": "Tap Retry; if it still fails, open your saved Wake-Up file to wake the server.",
      "topbar.fastSend": "Shipping from Bushehr port to all of Iran",
      "nav.home": "Home",
      "nav.products": "All products",
      "nav.deals": "Deals",
      "nav.new": "New arrivals",
      "nav.stats": "Live stats",
      "nav.about": "About us",
      "nav.contact": "Contact us",
      "nav.login": "Sign in",
      "nav.register": "Register",
      "nav.cart": "Cart",
      "nav.wishlist": "My list",
      "nav.notifications": "Notifications",
      "nav.menu": "Menu",
      "nav.account": "My account",
      "nav.admin": "Admin panel",
      "nav.allCategories": "All categories",
      "theme.toggle": "Toggle theme (light/dark)",
      "theme.dark": "Dark mode",
      "theme.light": "Light mode",
      "theme.auto": "Match system",
      "search.placeholder": "Search products, brands or categories\u2026",
      "search.go": "Search",
      "search.voice": "Voice search",
      "search.byImage": "Search by photo",
      "search.listening": "Listening\u2026 go ahead and speak",
      "search.noVoice": "Your browser does not support voice search.",
      "search.micDenied": "Microphone access is blocked. Allow microphone permission for this site in browser settings.",
      "search.voiceNetwork": "Speech service unreachable; check your internet connection.",
      "search.noSpeech": "I didn't catch that; try again and speak clearly.",
      "search.noMic": "No microphone found on this device.",
      "pwd.show": "Show password",
      "pwd.hide": "Hide password",
      "search.suggestions": "Suggestions",
      "search.trending": "Trending searches",
      "search.recent": "Your recent searches",
      "search.resultsFor": "Search results for",
      "search.inProducts": "In products",
      "search.inCategories": "Categories",
      "search.inBrands": "Brands",
      "search.inPages": "Pages",
      "search.didYouMean": "Did you mean?",
      "search.noResultTitle": "We found nothing",
      "search.noResultText": "Try another phrase or use the filters. If you want a specific item, tell support and we will source it for you.",
      "search.imageTitle": "Search by photo",
      "search.imageText": "Upload a photo of the product and we will find similar items in the store.",
      "search.imageHint": "JPG or PNG, up to 4 MB",
      "search.imageIndexing": "Preparing the visual search engine\u2026",
      "search.imageNoIndex": "Product images are not indexed yet. The site admin can build the index from Admin panel \u2190 Image search.",
      "search.imageNoMatch": "No similar product found for this photo. You can search by product name instead.",
      "search.dropHere": "Drop the photo here",
      "search.pickFile": "Choose a photo",
      "search.takePhoto": "Take a photo with the camera",
      "mnav.home": "Home",
      "mnav.products": "Categories",
      "mnav.search": "Search",
      "mnav.cart": "Cart",
      "mnav.me": "Account",
      "footer.shopping": "Shopping",
      "footer.allProducts": "All products",
      "footer.deals": "Deals & offers",
      "footer.inStock": "In-stock items",
      "footer.searchByImage": "Visual search",
      "footer.myList": "My list",
      "footer.stats": "Store statistics",
      "footer.services": "Customer services",
      "footer.guide": "Buying guide",
      "footer.service": "Customer services",
      "footer.faq": "FAQ",
      "footer.insurance": "Shipment insurance",
      "footer.plus": "Plus membership",
      "footer.tickets": "Support tickets",
      "footer.about": "About & legal",
      "footer.aboutUs": "About us",
      "footer.terms": "Terms & conditions",
      "footer.privacy": "Privacy policy",
      "footer.bug": "Report a bug",
      "footer.contact": "Contact us",
      "footer.suggest": "Suggestions & complaints",
      "footer.contactUs": "Ways to reach us",
      "footer.install": "Install the app",
      "footer.support": "Live support",
      "footer.rights": "All rights reserved.",
      "footer.workingHours": "Working hours",
      "home.heroKicker": "From Bushehr port, with an authenticity guarantee",
      "home.heroTitle": "Mobile accessories & gadgets at port prices",
      "home.heroText": "Cables, chargers, iPhone and Samsung cases and screen guards, power banks, hands-free kits, speakers, smart watches and glasses \u2014 everything your phone or your content creation needs, all in one small shop by the Persian Gulf.",
      "home.ctaShop": "Start shopping",
      "home.ctaDeals": "Today's deals",
      "home.point1": "Authenticity guarantee",
      "home.point2": "7-day withdrawal right",
      "home.point3": "Shipping across Iran",
      "home.point4": "Free in-store pickup",
      "home.point5": "Best Price Guarantee",
      "home.categories": "Categories",
      "home.categoriesSub": "From cables and cases to wearables",
      "home.featured": "Featured picks",
      "home.featuredSub": "Items we use and recommend ourselves",
      "home.bestSellers": "Best sellers",
      "home.bestSellersSub": "Chosen by Green Apple customers",
      "home.newArrivals": "New in store",
      "home.newArrivalsSub": "The latest items added to the shelf",
      "home.deals": "Active discounts",
      "home.dealsSub": "Limited-time offers at better prices",
      "home.brands": "Brands in stock",
      "home.whyUs": "Why Green Apple?",
      "home.whyUsSub": "The things that set us apart",
      "home.reviews": "Customer reviews",
      "home.reviewsSub": "Real buyer experiences",
      "home.visitStore": "Visit the store",
      "home.visitStoreText": "By the Bushehr dock, Pearls of the Gulf Passage \u2014 free screen-guard fitting and in-person advice",
      "home.openMap": "See the sketch and map",
      "home.statsTitle": "The store at a glance",
      "home.plusTitle": "Green Apple Plus membership",
      "home.plusText": "With a monthly fee you get free shipping on all orders, automatic shipment insurance and a permanent 3% discount.",
      "home.plusCta": "See Plus benefits",
      "home.appTitle": "The Green Apple app",
      "home.appText": "This site is an installable app (PWA): it installs on Android, iPhone, Windows, Mac and Linux, and it works offline too.",
      "home.installCta": "Install on my device",
      "home.appInstalled": "The app is installed",
      "home.liveStats": "Live store statistics",
      "home.newsletter": "Stay posted on deals",
      "home.newsletterText": "Leave your mobile number and we will only message you about important deals and when items on your list come back in stock.",
      "home.subscribe": "Subscribe",
      "stats.products": "Active products",
      "stats.ordersTotal": "Total orders",
      "stats.ordersToday": "Orders today",
      "stats.visitsToday": "Visits today",
      "stats.visitsTotal": "Total visits",
      "stats.pendingOrders": "Orders under review",
      "stats.delivered": "Successful deliveries",
      "stats.customers": "Registered customers",
      "stats.plusMembers": "Plus members",
      "stats.categories": "Categories",
      "stats.brands": "Brands",
      "stats.outOfStock": "Out-of-stock items",
      "stats.years": "Years active",
      "stats.title": "Public store statistics",
      "stats.sub": "These figures are taken live from the site's real data.",
      "stats.chartTitle": "Visits over the last 14 days",
      "stats.topProducts": "Best-selling products",
      "stats.transparency": "Transparency for customers",
      "stats.transparencyText": "We show real stock and real prices, and we do not hide the store's statistics either.",
      "catalog.title": "Products",
      "catalog.filters": "Filters",
      "catalog.showFilters": "Show filters",
      "catalog.hideFilters": "Hide filters",
      "catalog.sort.relevant": "Most relevant",
      "catalog.sort.newest": "Newest",
      "catalog.sort.oldest": "Oldest",
      "catalog.sort.cheapest": "Cheapest",
      "catalog.sort.dearest": "Most expensive",
      "catalog.sort.popular": "Best selling",
      "catalog.sort.rating": "Highest rated",
      "catalog.sort.discount": "Biggest discount",
      "catalog.sort.name": "Alphabetical",
      "catalog.f.category": "Category",
      "catalog.f.brand": "Brand",
      "catalog.f.price": "Price range",
      "catalog.f.availability": "Availability",
      "catalog.f.inStock": "In-stock items only",
      "catalog.f.discountOnly": "Discounted only",
      "catalog.f.rating": "Minimum rating",
      "catalog.f.authenticity": "Authenticity",
      "catalog.f.clear": "Clear all filters",
      "catalog.count": "products",
      "catalog.viewGrid": "Grid view",
      "catalog.viewList": "List view",
      "auth.original": "Original",
      "auth.highcopy": "High copy (grade 1)",
      "auth.generic": "Generic",
      "card.addToCart": "Add to cart",
      "card.added": "Added to cart",
      "card.quickView": "Quick view",
      "card.wishlistAdd": "Add to my list",
      "card.wishlistRemove": "Remove from my list",
      "card.compareAdd": "Add to compare",
      "card.outOfStock": "Out of stock",
      "card.soldOut": "Sold out",
      "pdp.addToCart": "Add to cart",
      "pdp.buyNow": "Buy now",
      "pdp.pickup": "Free in-store pickup",
      "pdp.warranty": "Warranty",
      "pdp.warrantyMonths": "{n}-month store replacement warranty",
      "pdp.noWarranty": "No warranty",
      "pdp.sku": "Product code",
      "pdp.barcode": "Barcode",
      "pdp.weight": "Weight",
      "pdp.gram": "grams",
      "pdp.zoomIn": "Zoom in",
      "pdp.zoomOut": "Zoom out",
      "pdp.zoomReset": "Actual size",
      "pdp.zoomHint": "Hover for magnifier; click or double-tap for full zoom",
      "pdp.video": "Video",
      "pdp.share": "Share",
      "pdp.specs": "Specifications",
      "pdp.description": "Description",
      "pdp.reviews": "Reviews & ratings",
      "pdp.questions": "Customer questions",
      "pdp.related": "Similar products",
      "pdp.compatibility": "Compatibility",
      "pdp.writeReview": "Write a review & rating",
      "pdp.askQuestion": "Ask a question",
      "pdp.loginToReview": "Sign in to write a review.",
      "pdp.reviewSubmitted": "Your review was submitted and will appear once the admin approves it.",
      "pdp.reviewPending": "Your review will appear after the admin approves it.",
      "pdp.questionSubmitted": "Your question was submitted; once approved, the admin will answer it.",
      "pdp.buyerBadge": "Buyer of this product",
      "pdp.visitorBadge": "Visitor",
      "pdp.helpful": "Was helpful",
      "pdp.storeReply": "Store reply",
      "pdp.noReviews": "No reviews yet. Be the first!",
      "pdp.noQuestions": "No questions yet. Ask if you have one.",
      "pdp.yourRating": "Your rating",
      "pdp.viewed": "views",
      "pdp.sold": "sold",
      "pdp.off": "off",
      "pdp.save": "You save",
      "pdp.lastPrice": "Previous price",
      "pdp.stockCount": "In stock: {n}",
      "pdp.fastSend": "Fast shipping from Bushehr",
      "pdp.installment": "Cash on delivery for eligible orders",
      "cart.title": "Cart",
      "cart.empty": "Your cart is empty",
      "cart.emptyText": "You have not picked anything yet. Start from the categories or the search box.",
      "cart.goShopping": "Let's go shopping",
      "cart.item": "Product",
      "cart.qty": "Quantity",
      "cart.remove": "Remove",
      "cart.clear": "Empty the cart",
      "cart.clearConfirm": "Remove all items from the cart?",
      "cart.summary": "Order summary",
      "cart.continue": "Continue to checkout",
      "cart.freeShipHint": "Spend {amount} Toman more to get free shipping.",
      "cart.freeShipDone": "Shipping is free for this order!",
      "cart.couponApplied": "Discount code applied",
      "cart.couponPlaceholder": "Have a discount code? Enter it",
      "cart.applyCoupon": "Apply code",
      "cart.removeCoupon": "Remove code",
      "cart.updated": "Cart updated",
      "checkout.title": "Checkout",
      "checkout.step1": "Delivery",
      "checkout.step2": "Payment",
      "checkout.step3": "Confirm",
      "checkout.delivery": "Delivery method",
      "checkout.pickup": "Pickup from the store",
      "checkout.pickupDesc": "Free \u2014 once confirmed you get a ready-for-pickup notification and collect it in person.",
      "checkout.courier": "Courier / postal shipping",
      "checkout.courierDesc": "Shipped to a saved address, with optional shipment insurance.",
      "checkout.zone": "Shipping zone",
      "checkout.express": "Express shipping (same day)",
      "checkout.insuranceOpt": "Shipment insurance",
      "checkout.insuranceDesc": "If the parcel is damaged or lost in transit, the goods value is compensated.",
      "checkout.insuranceAuto": "Applied automatically and free for Plus members.",
      "checkout.address": "Delivery address",
      "checkout.addAddress": "Add a new address",
      "checkout.noAddress": "You must save at least one address for postal shipping.",
      "checkout.paymentMethod": "Payment method",
      "checkout.useWallet": "Pay from wallet",
      "checkout.walletBalance": "Wallet balance: {amount} Toman",
      "checkout.note": "Order note (optional)",
      "checkout.notePlaceholder": "e.g. please call before delivery.",
      "checkout.acceptTerms": "I have read and accept the Terms & Conditions and the Privacy Policy.",
      "checkout.placeOrder": "Place & pay for the order",
      "checkout.placing": "Placing your order\u2026",
      "checkout.loginRequired": "Sign in to complete your purchase.",
      "checkout.successTitle": "Order placed",
      "checkout.successText": "Your order code is {code}. Track its status under My Orders.",
      "checkout.payNow": "Pay online",
      "checkout.payLater": "I will pay later",
      "checkout.gatewayDemo": "The gateway is in demo mode; no real money is deducted.",
      "checkout.paymentSuccess": "Payment was successful",
      "checkout.paymentFailed": "Payment failed",
      "checkout.simulateSuccess": "Successful payment (gateway simulation)",
      "checkout.simulateFail": "Cancel payment",
      "checkout.concurrencyNote": "Stock is locked the moment you place the order; if an item sells out at the same time we will tell you and refund the amount.",
      "checkout.pickupReady": "Preparation time: about {h} working hours",
      "auth.title": "Sign in or register",
      "auth.loginTitle": "Sign in to your account",
      "auth.registerTitle": "Create an account",
      "auth.methodPassword": "Username & password",
      "auth.methodPhone": "Mobile number",
      "auth.methodEmail": "Email",
      "auth.identifier": "Username, mobile or email",
      "auth.remember": "Remember me",
      "auth.forgot": "Forgot password",
      "auth.noAccount": "Do not have an account?",
      "auth.haveAccount": "Already registered?",
      "auth.sendCode": "Send verification code",
      "auth.codeSent": "Verification code sent",
      "auth.codeSentTo": "A 6-digit code was sent to {target}.",
      "auth.enterCode": "Enter the verification code",
      "auth.otpCode": "Verification code",
      "auth.resend": "Resend code",
      "auth.resendIn": "Resend in {s} seconds",
      "auth.demoCode": "Demo mode: verification code {code}",
      "auth.2faTitle": "Two-step sign-in",
      "auth.2faText": "Enter the 6-digit code from your authenticator app, SMS or email.",
      "auth.2faTotp": "Authenticator app",
      "auth.2faSms": "SMS code",
      "auth.2faEmail": "Email code",
      "auth.2faBackup": "Backup code",
      "auth.2faVerify": "Verify & sign in",
      "auth.acceptTerms": "I accept the Terms & Conditions and the Privacy Policy.",
      "auth.referral": "Referral code (optional)",
      "auth.registerDone": "Your account was created. Welcome!",
      "auth.loginDone": "Welcome",
      "auth.logoutDone": "You signed out successfully",
      "auth.recoveryTitle": "Password recovery",
      "auth.recoveryText": "Enter your registered mobile number or email and we will send a recovery code.",
      "auth.newPassword": "New password",
      "auth.resetDone": "Password changed successfully",
      "auth.passwordRules": "At least 8 characters including lowercase, uppercase, a digit and a symbol",
      "auth.orContinue": "or",
      "auth.guestCheckout": "Continue shopping without an account",
      "acc.title": "My account",
      "acc.dashboard": "My dashboard",
      "acc.badges": "My achievements",
      "badge.got": "Earned",
      "badge.locked": "Locked",
      "badge.first-buy": "First purchase",
      "badge.first-buy.d": "You placed your first successful order.",
      "badge.silver-buyer": "Silver buyer",
      "badge.silver-buyer.d": "5 successful orders at Green Apple.",
      "badge.gold-buyer": "Gold buyer",
      "badge.gold-buyer.d": "15 successful orders; a Green Apple VIP.",
      "badge.big-spender": "Big spender",
      "badge.big-spender.d": "Over 50,000,000 Toman in purchases.",
      "badge.early-bird": "Early bird",
      "badge.early-bird.d": "Among the first 100 Green Apple users.",
      "badge.veteran": "Veteran",
      "badge.veteran.d": "With us for more than a year.",
      "badge.reviewer": "Reviewer",
      "badge.reviewer.d": "3 posted reviews helping others choose.",
      "badge.plus-member": "Plus member",
      "badge.plus-member.d": "You have an active Plus subscription.",
      "badge.wallet-user": "Wallet user",
      "badge.wallet-user.d": "You have used the Green Apple wallet.",
      "badge.supporter": "Supporter",
      "badge.supporter.d": "You opened your first support ticket.",
      "acc.orders": "My orders",
      "acc.wishlist": "My list",
      "acc.wallet": "Wallet",
      "acc.plus": "Plus membership",
      "acc.addresses": "Addresses",
      "acc.notifications": "Notifications",
      "acc.tickets": "My tickets",
      "acc.support": "Support chat",
      "acc.reviews": "My reviews",
      "acc.feedback": "Suggestions & complaints",
      "acc.profile": "Profile details",
      "acc.security": "Account security",
      "acc.sessions": "Active sessions",
      "acc.prefs": "Display preferences",
      "acc.data": "My data",
      "acc.hello": "Hi {name}",
      "acc.memberSince": "Member since {date}",
      "acc.noOrders": "You have not placed an order yet",
      "acc.noOrdersText": "Make your first purchase with the welcome discount WELCOME10.",
      "acc.orderCode": "Order code",
      "acc.orderDate": "Order date",
      "acc.orderItems": "Items",
      "acc.orderTotal": "Total amount",
      "acc.trackOrder": "Track order",
      "acc.cancelOrder": "Cancel order",
      "acc.cancelConfirm": "Cancel this order? The paid amount returns to your wallet.",
      "acc.cancelReason": "Reason for cancellation (optional)",
      "acc.orderCancelled": "Order cancelled",
      "acc.reorder": "Buy again",
      "acc.invoice": "Invoice",
      "acc.printInvoice": "Print invoice",
      "acc.timeline": "Order progress",
      "acc.walletEmpty": "No transactions recorded yet",
      "acc.walletDeposit": "Top up wallet",
      "acc.walletAmount": "Top-up amount (Toman)",
      "acc.walletDeposited": "Wallet topped up",
      "acc.walletNote": "The wallet balance can only be used to buy from this store; no interest or fee applies to it.",
      "acc.tx.deposit": "Top-up",
      "acc.tx.purchase": "Purchase",
      "acc.tx.refund": "Refund",
      "acc.tx.adjust_in": "Increase by admin",
      "acc.tx.adjust_out": "Deduction by admin",
      "acc.plusInactive": "You do not have a Plus membership",
      "acc.plusActive": "Plus active until {date}",
      "acc.plusSubscribe": "Buy Plus membership",
      "acc.plusRenew": "Renew membership",
      "acc.plusPrice": "{price} Toman for {days} days",
      "acc.plusPerks": "Plus membership benefits",
      "acc.plusSubscribed": "Plus membership activated",
      "acc.plusPayWallet": "Pay from wallet",
      "acc.plusPayGateway": "Pay online",
      "acc.addAddress": "Add address",
      "acc.editAddress": "Edit address",
      "acc.addrTitle": "Label (e.g. home, work)",
      "acc.addrReceiver": "Recipient name",
      "acc.addrPhone": "Recipient phone number",
      "acc.addrStreet": "Full postal address",
      "acc.addrDefault": "Default address",
      "acc.addrNote": "Note for the courier",
      "acc.addrSaved": "Address saved",
      "acc.addrDeleted": "Address deleted",
      "acc.noAddress": "No address saved yet",
      "acc.wishlistEmpty": "Your list is empty",
      "acc.wishlistEmptyText": "Tap the heart icon on any product to save it here.",
      "acc.notifEmpty": "You have no notifications",
      "acc.markAllRead": "Mark all as read",
      "acc.ticketNew": "New ticket",
      "acc.ticketSubject": "Subject",
      "acc.ticketCategory": "Request category",
      "acc.ticketPriority": "Priority",
      "acc.ticketBody": "Request details",
      "form.rulesRequired": "You must accept the ticket rules first.",
      "form.termsRequired": "You must accept the terms and conditions first.",
      "page.statsTitle": "Live store stats",
      "page.aboutCta": "Come and see what we have in store for you",
      "page.stepsTitle": "How to buy",
      "page.tipsTitle": "Buying tips",
      "page.hintsTitle": "For a more precise report",
      "page.bugTitle": "Report a bug",
      "page.rulesTitle": "Rules",
      "faq.all": "All topics",
      "faq.search": "Search questions\u2026",
      "faq.results": "{n} questions",
      "faq.notFound": "No question matched your search.",
      "faq.askText": "Ask live support or open a ticket.",
      "faq.cat.orders": "Orders & tracking",
      "faq.cat.shipping": "Shipping & delivery",
      "faq.cat.returns": "Returns & refunds",
      "faq.cat.product": "Products & authenticity",
      "faq.cat.account": "Account",
      "faq.cat.security": "Security & payment",
      "faq.cat.store": "Store & contact",
      "faq.cat.other": "Other",
      "acc.ticketCloseConfirm": "Close this ticket? You can reopen it later by sending a message.",
      "acc.ticketClosedNote": "This ticket is closed. Sending a new message reopens it.",
      "acc.ticketBodyShort": "The message is too short.",
      "acc.attachHint": "Up to 4 images, each below 4 MB.",
      "err.tooLarge": "The file is larger than 4 MB.",
      "acc.ticketRules": "I have read and accept the ticket rules.",
      "acc.ticketViewRules": "Read ticket rules",
      "acc.ticketCreated": "Ticket created. Tracking code: {code}",
      "acc.ticketWrite": "Write your reply\u2026",
      "acc.ticketClose": "Close ticket",
      "acc.ticketReopen": "Reopen",
      "acc.ticketSla": "Estimated reply time: {h} hours",
      "acc.noTickets": "You have no tickets",
      "acc.chatTitle": "Live support",
      "acc.chatPlaceholder": "Write your message\u2026",
      "acc.chatWelcome": "Hi! Any question or issue? Write it here and we will answer.",
      "acc.chatOffline": "We are outside working hours right now; leave a message and we reply first thing, or open a ticket.",
      "acc.chatOpenTicket": "Open a ticket",
      "acc.reviewEmpty": "You have not posted a review or question",
      "acc.feedbackNew": "Send a suggestion, complaint or bug report",
      "acc.feedbackType": "Message type",
      "acc.feedbackContact": "Contact (email or mobile)",
      "acc.feedbackContactHint": "If provided, we will inform you of the outcome.",
      "acc.feedbackSent": "Your message was submitted. Thanks for helping us improve.",
      "acc.noFeedback": "You have not sent any message",
      "acc.profileSaved": "Profile saved",
      "acc.passwordChange": "Change password",
      "acc.currentPassword": "Current password",
      "acc.newPassword2": "New password",
      "acc.passwordChanged": "Password changed",
      "acc.2faSection": "Two-factor authentication (2FA)",
      "acc.2faOff": "Disabled \u2014 turn it on for extra security.",
      "acc.2faOn": "Enabled",
      "acc.2faEnable": "Enable two-factor",
      "acc.2faDisable": "Disable",
      "acc.2faScan": "Scan this QR code with an authenticator app (e.g. Google Authenticator) or enter the key manually.",
      "acc.2faKey": "Manual key",
      "acc.2faEnterCode": "Enter the 6-digit code from the app to enable",
      "acc.2faEnabled": "Two-factor enabled",
      "acc.2faDisabled": "Two-factor disabled",
      "acc.2faBackup": "Backup codes (keep them safe)",
      "acc.2faBackupHint": "If you lose access to the app, sign in with these. Each code works once.",
      "acc.2faMethods": "Verification methods",
      "acc.sessionsText": "Devices currently signed in to your account.",
      "acc.revokeAll": "Sign out everywhere",
      "acc.revokeDone": "Sessions revoked",
      "acc.current": "This device",
      "acc.prefsText": "These settings apply only to this device.",
      "acc.prefTheme": "Theme",
      "acc.prefLang": "Language",
      "acc.prefDensity": "Density",
      "acc.prefMotion": "Animations",
      "acc.prefNotif": "Notifications",
      "acc.notifMarketing": "Offers and discounts",
      "acc.notifOrders": "Order status",
      "acc.notifRestock": "Restock of my saved items",
      "acc.notifSupport": "Support and ticket replies",
      "acc.exportData": "Export my data",
      "acc.exportHint": "Download all your account info, orders, reviews and tickets as JSON.",
      "acc.deleteAccount": "Delete account",
      "acc.deleteWarn": "Deleting removes your personal data, while financial order records are kept as required by law.",
      "acc.deleteConfirm": "Enter your password to delete the account",
      "acc.pointsText": "You earn 1 point per 100,000 Toman of purchase.",
      "acc.referralCode": "Your referral code",
      "acc.referralText": "Share this code; you both get 50 points.",
      "chat.title": "Green Apple live support",
      "chat.online": "We usually reply within minutes",
      "chat.open": "Start chat",
      "chat.minimize": "Close",
      "chat.loginFirst": "Sign in to chat with support.",
      "chat.sent": "Message sent",
      "chat.typing": "Support is typing\u2026",
      "chat.quick": "Frequent questions",
      "notif.new": "New notification",
      "notif.markRead": "Mark as read",
      "notif.viewAll": "View all notifications",
      "notif.empty": "No notifications",
      "notif.type.announcement": "Announcement",
      "notif.type.order": "Order",
      "notif.type.restock": "Back in stock",
      "notif.type.ticket": "Ticket",
      "notif.type.support": "Support",
      "notif.type.review": "Review",
      "notif.type.plus": "Plus membership",
      "notif.type.wallet": "Wallet",
      "notif.type.account": "Account",
      "notif.type.feedback": "Feedback",
      "notif.type.admin_alert": "Admin alert",
      "notif.type.news": "News",
      "notif.type.offer": "Special offer",
      "notif.type.system": "System",
      "notif.type.info": "Info",
      "notif.type.welcome": "Welcome",
      "consent.title": "Welcome to Green Apple",
      "consent.text": "Please read and accept the following before continuing. We use browser storage to improve your shopping experience and protect your personal data per the Privacy Policy.",
      "consent.terms": "I have read and accept the Terms & Conditions.",
      "consent.privacy": "I accept the Privacy Policy.",
      "consent.marketing": "I would like to hear about deals and new arrivals (optional).",
      "consent.accept": "Accept & enter the site",
      "consent.readTerms": "Read terms",
      "consent.readPrivacy": "Read privacy",
      "consent.thanks": "Thanks! Your acceptance was recorded.",
      "consent.manage": "Cookie & privacy choices",
      "social.instagram": "Instagram",
      "home.partnersTitle": "Brands we work with",
      "stats.title": "Live store stats",
      "stats.subtitle": "Real store numbers, updated live.",
      "stats.chartTitle": "Visits \u2014 last 14 days",
      "stats.chartHint": "Each column height is that day visit count.",
      "stats.topTitle": "Recent best sellers",
      "adm.sPartners": "Partners & brands",
      "adm.ptFa": "Persian name",
      "adm.ptEn": "Name (EN)",
      "adm.ptAdd": "Add brand",
      "adm.ptHint": "These names scroll as a marquee on the home page; order is yours to set.",
      "feat.partners": "Partner brands strip",
      "auth.pwdLater": "I'll change it later",
      "auth.pwdLaterToast": "OK; you can change it anytime from Account \u2192 Change password.",
      "social.telegram": "Telegram",
      "social.eitaa": "Eitaa",
      "social.whatsapp": "WhatsApp",
      "consent.rejectOptional": "Accept necessary only",
      "consent.ttlNote": "Your choice stays valid for 180 days; after that we ask again.",
      "contact.title": "Contact us",
      "contact.mapTitle": "Shop location sketch",
      "contact.mapHint": "Click to open in a map app",
      "contact.mapAsk": "Which map would you like to open?",
      "contact.mapPermission": "If you allow location access, we will show the route from your current position to the shop.",
      "contact.allowLocation": "Allow location access",
      "contact.denyLocation": "Continue without location",
      "contact.openMaps": "Open in maps",
      "contact.copyAddress": "Copy address",
      "contact.hours": "Working hours",
      "contact.phone": "Store phone",
      "contact.mobile": "Mobile & WhatsApp",
      "contact.emailUs": "Email",
      "contact.addressUs": "Address",
      "contact.callNow": "Call now",
      "contact.whatsapp": "Message on WhatsApp",
      "contact.locationOn": "Your approximate location was found",
      "contact.locationDenied": "Location denied; the map opens without an origin.",
      "contact.formTitle": "Send a quick message",
      "contact.formText": "Prefer not to call? Leave a message or open a ticket.",
      "contact.neshan": "Neshan",
      "contact.balad": "Balad",
      "contact.google": "Google Maps",
      "contact.osm": "OpenStreetMap",
      "contact.tgBotTitle": "Telegram support bot",
      "contact.tgBotText": "Track orders, search products and chat with support \u2014 24/7 on Telegram. Just send /start.",
      "contact.tgBotBtn": "Open the bot on Telegram",
      "compare.title": "Compare products",
      "compare.empty": "No products selected for comparison",
      "compare.emptyText": "Use the Compare button on product cards (up to 4 items).",
      "compare.add": "Add to compare",
      "compare.remove": "Remove",
      "priceCheck.title": "Price check by barcode",
      "priceCheck.sub": "Scan the barcode with your device or type it manually.",
      "priceCheck.input": "Barcode or SKU",
      "priceCheck.scanCamera": "Scan with camera",
      "priceCheck.stopCamera": "Stop camera",
      "priceCheck.waiting": "Waiting for a scan\u2026",
      "priceCheck.notFound": "No product found for this barcode",
      "priceCheck.found": "Product found",
      "priceCheck.cameraUnsupported": "Camera unavailable. Use a barcode device or manual entry.",
      "priceCheck.cameraDenied": "Camera access denied.",
      "priceCheck.deviceMode": "Kiosk mode (full screen)",
      "priceCheck.lastScan": "Last scan",
      "priceCheck.fullscreen": "Full screen",
      "err.generic": "Something went wrong. Please try again.",
      "err.network": "Could not reach the server.",
      "err.notFound": "Page not found",
      "err.notFoundText": "The address may be wrong or the page has been removed.",
      "err.goHome": "Go to homepage",
      "err.offline": "You are offline. Cached data is shown.",
      "err.online": "Back online",
      "err.loginRequired": "You must sign in to view this section.",
      "err.forbidden": "You do not have access to this section.",
      "adm.title": "Admin panel",
      "adm.dashboard": "Dashboard",
      "adm.products": "Products",
      "adm.productNew": "Add product",
      "adm.productEdit": "Edit product",
      "adm.categories": "Categories & brands",
      "adm.orders": "Orders",
      "adm.reviews": "Reviews & questions",
      "adm.tickets": "Tickets",
      "adm.supportChat": "Support chat",
      "adm.feedback": "Feedback & bugs",
      "adm.users": "Users & permissions",
      "adm.wallet": "User wallets",
      "adm.coupons": "Coupons",
      "adm.ads": "Advertisements",
      "adm.notifications": "Notifications",
      "adm.settings": "Store settings",
      "adm.theme": "Theme & layout",
      "adm.features": "Features",
      "adm.shipping": "Shipping & insurance",
      "adm.plus": "Plus membership",
      "adm.pages": "Page content",
      "adm.barcode": "Barcode & labels",
      "adm.imageSearch": "Image search",
      "adm.audit": "Audit log",
      "adm.stats": "Statistics",
      "adm.export": "Export & backup",
      "adm.maintenance": "Maintenance",
      "adm.backToSite": "Back to site",
      "adm.kpi.ordersToday": "Orders today",
      "adm.kpi.visits": "Visits today",
      "adm.kpi.pending": "Pending review",
      "adm.kpi.revenueTotal": "Total revenue",
      "adm.kpi.users": "Users",
      "adm.kpi.products": "Products",
      "adm.kpi.lowStock": "Low stock",
      "adm.awaiting": "Tasks awaiting action",
      "adm.awaiting.reviews": "Reviews to approve",
      "adm.awaiting.tickets": "Open tickets",
      "adm.awaiting.orders": "Pending orders",
      "adm.awaiting.feedback": "New feedback",
      "adm.awaiting.chat": "Unread chat messages",
      "adm.chart": "Last 14 days trend",
      "adm.topSelling": "Best sellers",
      "adm.lowStockList": "Low-stock items",
      "adm.recentAudit": "Latest events",
      "adm.storage": "Data size",
      "adm.pName": "Product name",
      "adm.pNameEn": "English name",
      "adm.pCat": "Category",
      "adm.pBrand": "Brand",
      "adm.pPrice": "Price (Toman)",
      "adm.pOldPrice": "Price before discount",
      "adm.pCost": "Purchase cost",
      "adm.pStock": "Stock",
      "adm.pSku": "SKU",
      "adm.pBarcode": "Barcode",
      "adm.pWeight": "Weight (grams)",
      "adm.pWarranty": "Warranty (months)",
      "adm.pAuth": "Authenticity",
      "adm.pTags": "Tags (separate with Enter)",
      "adm.pSpecs": "Specifications",
      "adm.pSpecKey": "Spec name",
      "adm.pSpecVal": "Value",
      "adm.pAddSpec": "Add spec",
      "adm.pVideos": "Product videos (one https or /uploads URL per line)",
      "adm.pVideosHint": "Videos play in the product gallery and lightbox.",
      "adm.pImages": "Images",
      "adm.pFindImage": "Auto image search",
      "adm.pFindImageHint": "We search free image sources (Wikimedia/Openverse) for this product. Pick one and approve it.",
      "adm.pFindSearching": "Searching for images\u2026",
      "adm.pFindEmpty": "No images found. You can upload your own photo.",
      "adm.pUpload": "Upload photo",
      "adm.pUseImage": "Use this image",
      "adm.pDefaultImage": "Restore default image",
      "adm.pFeatured": "Show in featured picks",
      "adm.pActive": "Active (visible on site)",
      "adm.pSaved": "Product saved",
      "adm.pCreated": "Product created",
      "adm.pDeleted": "Product deleted",
      "adm.pDeleteConfirm": "Delete this product permanently?",
      "adm.pQuickEdit": "Quick edit",
      "adm.pBulkPrice": "Bulk price change",
      "adm.catName": "Category name",
      "adm.catParent": "Parent category",
      "adm.catGlyph": "Icon",
      "adm.catOrder": "Display order",
      "adm.catNoParent": "No parent (top level)",
      "adm.brandName": "Brand name",
      "adm.brandNameEn": "Brand English name",
      "adm.oStatus": "Change status",
      "adm.oTracking": "Tracking code",
      "adm.oNote": "Internal note",
      "adm.oCustomer": "Customer",
      "adm.oDelivery": "Delivery",
      "adm.oPayment": "Payment",
      "adm.oSaved": "Order updated",
      "adm.rApprove": "Approve & publish",
      "adm.rReject": "Reject",
      "adm.rReply": "Reply",
      "adm.rReplySaved": "Reply saved",
      "adm.rModerated": "Review status updated",
      "adm.rFilter": "Filter",
      "adm.uRole": "Role",
      "adm.uPerms": "Permissions",
      "adm.uPermsHint": "Toggle each permission separately. Changes apply immediately.",
      "adm.uAll": "Enable all",
      "adm.uNone": "Disable all",
      "adm.uWalletAdjust": "Adjust wallet balance",
      "adm.uWalletReason": "Reason",
      "adm.uPlusDays": "Plus membership days",
      "adm.uResetPass": "Reset password",
      "adm.uStatus": "Account status",
      "adm.uBlocked": "Blocked",
      "adm.uSaved": "User changes saved",
      "adm.uMakeStaff": "Make staff",
      "adm.cCode": "Code",
      "adm.cType": "Discount type",
      "adm.cValue": "Value",
      "adm.cMax": "Max discount",
      "adm.cMin": "Minimum order",
      "adm.cLimit": "Total usage limit",
      "adm.cPerUser": "Per-user limit",
      "adm.cStart": "Starts",
      "adm.cEnd": "Ends",
      "adm.cUsed": "Used",
      "adm.aSlot": "Placement",
      "adm.aTitle": "Title",
      "adm.aText": "Text",
      "adm.aLink": "Target link",
      "adm.aCta": "Button text",
      "adm.aActive": "Visible",
      "adm.nTitle": "Notification title",
      "adm.nBody": "Notification body",
      "adm.nTarget": "Recipient",
      "adm.nAll": "All users",
      "adm.nOne": "A specific user",
      "adm.nLevel": "Level",
      "adm.nSent": "Notification sent",
      "adm.nOutbox": "SMS & email outbox (demo mode)",
      "adm.sStore": "Store information",
      "adm.sTheme": "Theme",
      "adm.sUi": "Interface layout",
      "adm.mailsms": "Email & SMS",
      "adm.mailCfg": "Mail server (SMTP)",
      "adm.mailEnabled": "Email sending on",
      "adm.mailFrom": "From address",
      "adm.smsCfg": "SMS panel (Kavenegar)",
      "adm.smsEnabled": "SMS sending on",
      "adm.smsKey": "API key",
      "adm.smsSender": "Sender number",
      "adm.console": "System console",
      "adm.consoleHint": "Restart takes a few seconds; the page reloads itself. Resets are irreversible.",
      "adm.sysRestart": "Restart server",
      "adm.sysRestartWarn": "Restart the server now? Users will be disconnected for a few seconds.",
      "adm.sysRestarting": "Restarting\u2026 the page will reload shortly.",
      "adm.sysResetLabel": "Reset sections (irreversible):",
      "adm.sysReset.audit": "Audit log",
      "adm.sysReset.carts": "Guest carts",
      "adm.sysReset.visits": "Visit counters",
      "adm.sysReset.visitors": "Visitors list",
      "adm.secTitle": "Defense & entry queue",
      "adm.secQueueEnabled": "Queue visitors when busy",
      "adm.secQueueDesc": "When load exceeds the limits, anonymous visitors are admitted one by one through a queue so the site stays error-free for everyone.",
      "adm.secMaxConc": "Max concurrent requests",
      "adm.secTriggerRps": "Requests-per-second trigger",
      "adm.secPassTtl": "Entry pass TTL (minutes)",
      "adm.secPoll": "Queue poll interval (seconds)",
      "adm.secFloodBan": "Auto-ban threshold (requests/minute)",
      "adm.secFloodMin": "Auto-ban duration (minutes)",
      "adm.secSaved": "Defense settings saved.",
      "adm.secInflight": "Active requests",
      "adm.secRps": "Req/sec",
      "adm.secQueued": "In queue",
      "adm.secAutoBans": "Active auto-bans",
      "adm.secTop": "Top talker IPs (last minute)",
      "adm.secPerMin": "Req/min",
      "adm.secTopEmpty": "No unusual traffic recorded.",
      "adm.secBusy": "Busy \u2014 queue active",
      "adm.secNormal": "Normal",
      "adm.banMinutes": "Duration (minutes, 0 = permanent)",
      "adm.banUntil": "Until",
      "adm.banAuto": "auto",
      "adm.resetAudit": "Clear audit logs",
      "adm.resetCarts": "Clear guest carts",
      "adm.resetVisitors": "Clear visitors",
      "adm.resetDone": "Reset done.",
      "adm.resetWarn.audit": "Delete all audit logs?",
      "adm.resetWarn.carts": "Empty all guest carts?",
      "adm.resetWarn.visitors": "Delete the visitors list?",
      "adm.resetWarn.visits": "Zero the visit counters?",
      "adm.visitors": "Visitors",
      "adm.uDevice": "Device / IP",
      "adm.uBrowser": "Browser",
      "adm.uRegion": "Region / time",
      "adm.uPath": "Path",
      "adm.guest": "Guest",
      "adm.bans": "Bans (block / unblock)",
      "adm.banType": "Type",
      "adm.banValue": "Value (IP / phone / email / username)",
      "adm.banReason": "Reason",
      "adm.ban": "Ban",
      "adm.unban": "Unban",
      "adm.banned": "Banned",
      "adm.banDone": "Banned.",
      "adm.unbanDone": "Unbanned.",
      "adm.bansEmpty": "Nobody is banned right now.",
      "adm.banByAdmin": "By admin",
      "adm.channels": "Channels",
      "adm.chSite": "In-site notification",
      "adm.chTelegram": "Telegram bot",
      "adm.chEmail": "Email",
      "adm.chSms": "SMS",
      "adm.channelsHint": "Email/SMS need settings below; without them only ready channels send.",
      "adm.telegram": "Telegram bot",
      "adm.tgHint": "Get a token from Telegram BotFather; the bot runs on the store server and is managed from this panel.",
      "adm.tgEnabled": "Bot on",
      "adm.tgToken": "Bot token",
      "adm.tgTokenHint": "Like 123456:ABC-\u2026",
      "adm.tgWelcome": "/start welcome message",
      "adm.tgTest": "Test send",
      "adm.tgInbox": "Inbox",
      "adm.tgSubs": "Subscribers",
      "adm.tgReplyPh": "Reply to this user\u2026",
      "adm.tgInboxEmpty": "No messages yet.",
      "adm.lottery": "Lottery",
      "adm.lotteryNew": "New draw",
      "adm.lotPrize": "Prize",
      "adm.lotEnds": "Ends",
      "adm.lotWinners": "Winners count",
      "adm.lotWinnersList": "Winners",
      "adm.lotMode": "Entry mode",
      "adm.lotModeOrders": "Automatic from orders",
      "adm.lotModeManual": "Manual join button",
      "adm.lotEntries": "Entries",
      "adm.lotRun": "Draw now",
      "adm.lotRunWarn": "Winners are picked randomly and notified now. Continue?",
      "adm.lotDone": "Draw done",
      "adm.lotClose": "Close",
      "adm.lotClosed": "Draw closed.",
      "adm.lotEmpty": "No draws yet.",
      "lot.title": "Green Apple lottery",
      "lot.nav": "Lottery",
      "lot.soon": "Coming soon \u2014 stay tuned!",
      "lot.done": "Past draws",
      "lot.winners": "Winners",
      "lot.active": "Active",
      "lot.prize": "Prize",
      "lot.ends": "Ends",
      "lot.entries": "Entries",
      "lot.joined": "You are in this draw.",
      "lot.join": "Join draw",
      "lot.joinDone": "Entry recorded \u2014 good luck!",
      "lot.autoEntry": "Every valid order in the draw window counts automatically.",
      "contact.phone3": "Third phone",
      "adm.sBackups": "Backups & dump",
      "adm.backupNow": "Backup now",
      "adm.backupsHint": "A full snapshot is taken automatically every {hours} hours; the last {keep} are kept.",
      "adm.backupsEmpty": 'No snapshot yet; hit "Backup now".',
      "adm.backupSize": "Size",
      "adm.backupRestore": "Restore",
      "adm.backupRestoreWarn": "All current data will be replaced by this snapshot. Sure?",
      "adm.backupDone": "Backup created.",
      "adm.backupRestored": "Restore done; reloading.",
      "adm.dumpFull": "Full site dump",
      "adm.sFeatures": "Features",
      "adm.sShipping": "Shipping",
      "adm.sPlus": "Plus",
      "adm.sOrders": "Orders & payment",
      "adm.sSeo": "SEO",
      "adm.sAuth": "Authentication",
      "adm.sSaved": "Settings saved",
      "adm.tAccent": "Primary colour",
      "adm.tPort": "Port theme (waves, boat and palm in the background)",
      "adm.tPortHint": "Turn it off for a plain neutral background.",
      "adm.tMode": "Default theme",
      "adm.tRadius": "Corner radius",
      "adm.tDensity": "Density",
      "adm.tBg": "Background style",
      "adm.tContrast": "Contrast",
      "adm.tAnim": "Animations",
      "adm.uSearchPos": "Search box position",
      "adm.uHeader": "Header layout",
      "adm.uNav": "Menu style",
      "adm.uCards": "Product card style",
      "adm.uSticky": "Sticky header",
      "adm.uTicker": "Top ticker bar",
      "adm.uTickerItems": "Ticker messages",
      "adm.uTickerSpeed": "Ticker speed",
      "adm.uQuick": "Product quick view",
      "adm.uChat": "Floating support button",
      "adm.uCrumb": "Show breadcrumbs",
      "adm.uCols": "Product columns",
      "adm.uColsMobile": "Mobile",
      "adm.uColsTablet": "Tablet",
      "adm.uColsDesktop": "Desktop",
      "adm.uColsWide": "Wide screen",
      "adm.uCardInfo": "Info shown on product cards",
      "adm.uPosStart": "Right (start)",
      "adm.uPosCenter": "Center",
      "adm.uPosEnd": "Left (end)",
      "adm.uLayoutLogoStart": "Logo at start",
      "adm.uLayoutSplit": "Logo start / search center / actions end",
      "adm.uLayoutCentered": "Logo centered",
      "adm.fHint": "Turn off any feature you do not need; its section disappears from the site and panel.",
      "adm.bLabel": "Label printing",
      "adm.bSelect": "Select products",
      "adm.bSize": "Label size",
      "adm.bCopies": "Copies per product",
      "adm.bShowName": "Product name",
      "adm.bShowPrice": "Price",
      "adm.bShowBrand": "Brand",
      "adm.bShowSku": "SKU",
      "adm.bShowQr": "Product page QR code",
      "adm.bType": "Barcode type",
      "adm.bPrint": "Print labels",
      "adm.bGenerate": "Generate new barcode",
      "adm.igPack": "Instagram post pack",
      "adm.igCap": "Caption (editable before copy)",
      "adm.igTags": "Hashtags",
      "adm.igImgHint": "Post image; download it and publish with the caption.",
      "adm.igDl": "Download image",
      "adm.igNoImg": "This product has no image yet; add one via upload or image search first.",
      "adm.igCopyCap": "Copy caption",
      "adm.igCopyTags": "Copy hashtags",
      "adm.igCopyAll": "Copy caption + tags",
      "adm.bGenerated": "Barcode generated and assigned",
      "adm.bScan": "Scan barcode",
      "adm.bScanMode": "Scanner mode (device sync)",
      "adm.bScanHint": "Connect your barcode device like a keyboard; click the box below and scan. Camera scanning also works.",
      "adm.bConnected": "Device connected \u2014 ready to scan",
      "adm.bSerial": "Direct connection via Web Serial",
      "adm.bSerialHint": "If your device has a serial/USB port, connect here (desktop Chrome/Edge only).",
      "adm.bSerialUnsupported": "Your browser does not support Web Serial; use keyboard or camera mode.",
      "adm.bSerialConnected": "Connected",
      "adm.bSerialClosed": "Connection closed",
      "adm.bHistory": "Recent scans",
      "adm.isTitle": "Image index for visual search",
      "adm.isHint": "Build the index once so customers can search by photo. It runs in your browser and adds no server load.",
      "adm.isBuild": "Build index",
      "adm.isBuilding": "Indexing\u2026",
      "adm.isDone": "Index built",
      "adm.isCount": "Indexed images",
      "adm.auditAction": "Event",
      "adm.auditActor": "User",
      "adm.auditTarget": "Target",
      "adm.auditMeta": "Details",
      "adm.statsRevenue": "Revenue",
      "adm.statsVisits": "Visits",
      "adm.statsOrders": "Orders",
      "adm.statsByCat": "Category performance",
      "adm.statsByBrand": "Sales by brand",
      "adm.statsStockValue": "Inventory value",
      "adm.statsAvgOrder": "Average basket",
      "adm.exportProducts": "Export products",
      "adm.exportOrders": "Export orders",
      "adm.exportUsers": "Export users",
      "adm.exportReviews": "Export reviews",
      "adm.exportTickets": "Export tickets",
      "adm.exportAudit": "Export events",
      "adm.exportAll": "Full backup (JSON)",
      "adm.backup": "Create backup now",
      "adm.backupDone": "Backup created",
      "adm.cleanup": "Clean old data",
      "adm.cleanupDone": "Cleanup done",
      "adm.pageEditHint": "Edit page texts here; changes apply to the site immediately.",
      "adm.noPermission": "You do not have permission for this section. Ask the owner to grant it.",
      "adm.liveView": "Live preview of changes",
      "adm.saved": "Saved",
      "st.pending_payment": "Pending payment",
      "st.pending_review": "Pending review",
      "st.confirmed": "Confirmed",
      "st.preparing": "Preparing",
      "st.ready_pickup": "Ready for pickup",
      "st.shipped": "Shipped",
      "st.delivered": "Delivered",
      "st.cancelled": "Cancelled",
      "st.refunded": "Refunded",
      "st.returned": "Returned",
      "dl.pickup": "In-store pickup",
      "dl.courier": "Postal shipping",
      "pm.wallet": "Wallet",
      "pm.gateway": "Bank gateway",
      "pm.cod": "Cash on delivery",
      "ps.unpaid": "Unpaid",
      "ps.paid": "Paid",
      "ps.pending": "Pending",
      "ps.refunded": "Refunded",
      "ps.failed": "Failed",
      "ps.cancelled": "Cancelled",
      "tc.order": "Order tracking",
      "tc.return": "Return & refund",
      "tc.product": "Product question",
      "tc.technical": "Technical issue",
      "tc.complaint": "Complaint",
      "tc.partnership": "Partnership & advertising",
      "tc.account": "Account & security",
      "tc.other": "Other",
      "tp.critical": "Critical",
      "tp.high": "High",
      "tp.normal": "Normal",
      "tp.low": "Low",
      "ft.suggestion": "Suggestion",
      "ft.complaint": "Complaint",
      "ft.bug": "Bug report",
      "fs.new": "New",
      "fs.seen": "Seen",
      "fs.in_progress": "In progress",
      "fs.done": "Done",
      "fs.rejected": "Rejected",
      "tk.open": "Open",
      "tk.answered": "Answered",
      "tk.closed": "Closed",
      "feat.wallet": "Wallet",
      "feat.plus": "Plus membership",
      "feat.insurance": "Shipment insurance",
      "feat.tickets": "Ticket system",
      "feat.reviews": "Customer reviews",
      "feat.questions": "Customer questions",
      "feat.ads": "On-site ads",
      "feat.imageSearch": "Image search",
      "feat.barcode": "Barcode & labels",
      "feat.priceCheckDevice": "Price display mode",
      "feat.publicStats": "Public statistics",
      "feat.coupons": "Coupons",
      "feat.consent": "Cookie consent modal (first visit)",
      "feat.liveSupport": "Live chat support",
      "feat.announcements": "Notifications",
      "feat.wishlist": "My list",
      "feat.compare": "Product comparison",
      "feat.recentlyViewed": "Recently viewed",
      "feat.guestCheckout": "Guest checkout",
      "feat.priceAlerts": "Restock alerts",
      "feat.twoFactor": "Two-factor login",
      "feat.referrals": "Referral codes",
      "feat.voiceSearch": "Voice search",
      "feat.offlineMode": "Offline mode",
      "feat.captcha": "Captcha (I'm not a robot)",
      "captcha.required": "Prove you are human first: tick the box and solve the math.",
      "captcha.label": "I'm not a robot",
      "captcha.hint": "Tick it, then solve the tiny math image",
      "captcha.placeholder": "Answer",
      "captcha.solved": "Human verified \u2714",
      "captcha.refresh": "New challenge",
      "perm.dashboard.view": "View dashboard",
      "perm.products.view": "View products",
      "perm.products.create": "Create product",
      "perm.products.edit": "Edit product",
      "perm.products.delete": "Delete product",
      "perm.products.price": "Change price & discount",
      "perm.products.stock": "Change stock",
      "perm.categories.manage": "Manage categories & brands",
      "perm.orders.view": "View orders",
      "perm.orders.manage": "Change order status",
      "perm.refunds.manage": "Refunds & cancellation",
      "perm.reviews.moderate": "Moderate reviews",
      "perm.reviews.reply": "Reply to reviews",
      "perm.tickets.manage": "Manage tickets",
      "perm.feedback.manage": "Feedback & bugs",
      "perm.users.view": "View users",
      "perm.users.manage": "Manage users",
      "perm.users.permissions": "Assign permissions",
      "perm.wallet.manage": "Wallet management",
      "perm.plus.manage": "Plus membership",
      "perm.coupons.manage": "Coupons",
      "perm.ads.manage": "Manage ads",
      "perm.notifications.send": "Send notifications",
      "perm.settings.edit": "Store settings",
      "perm.theme.edit": "Theme & layout",
      "perm.pages.edit": "Edit page content",
      "perm.barcode.print": "Print labels",
      "perm.barcode.scan": "Scan & price display",
      "perm.imagesearch.index": "Image index",
      "perm.audit.view": "Audit log",
      "perm.stats.view": "Statistics",
      "perm.data.export": "Export data",
      "misc.quickView": "Quick view",
      "misc.addToHome": "Add to home screen",
      "misc.installHint": 'In your browser menu, choose "Add to Home screen" or "Install".',
      "misc.printBlocked": "The print dialog did not open; please allow pop-ups.",
      "misc.saved": "Saved",
      "misc.deleted": "Deleted",
      "misc.updated": "Updated",
      "misc.confirmDelete": "Delete this item?",
      "misc.loadingMore": "Loading\u2026",
      "misc.recentlyViewed": "Recently viewed",
      "misc.uiSound": "UI click sound",
      "misc.uiSoundOn": "Click sound on",
      "misc.uiSoundOff": "Click sound off",
      "misc.shareDone": "Link copied",
      "misc.shareNative": "Share",
      "img.alt": "Product image",
      "adm.view": "View",
      "adm.support": "Support chat",
      "adm.supSelect": "Select a conversation",
      "adm.supSelectHint": "Pick a thread from the list to reply.",
      "adm.tkReply": "Support reply",
      "adm.tkManage": "Ticket management",
      "common.updated": "Updated",
      "common.link": "Link",
      "common.text": "Text",
      "cart.coupon": "Coupon code",
      "misc.sent": "Sent",
      "misc.copied": "Copied",
      "adm.revPending": "Pending",
      "adm.revApproved": "Approved",
      "adm.revRejected": "Rejected",
      "adm.revApprove": "Approve",
      "adm.revReject": "Reject",
      "adm.revReply": "Shop reply",
      "adm.revEmpty": "Nothing in this state",
      "adm.revEmptyHint": "No new reviews or questions to moderate.",
      "rev.buyer": "Buyer",
      "rev.visitor": "Visitor",
      "rev.shopReply": "Shop reply",
      "fb.new": "New",
      "fb.seen": "Seen",
      "fb.inProgress": "In progress",
      "fb.done": "Done",
      "fb.rejected": "Rejected",
      "feedback.suggestion": "Suggestion",
      "feedback.complaint": "Complaint",
      "feedback.bug": "Bug report",
      "adm.fbEmptyHint": "No suggestions, complaints or bug reports yet.",
      "adm.cpNew": "New coupon",
      "adm.cpPercent": "Percent",
      "adm.cpAmount": "Fixed amount",
      "adm.cpValue": "Value",
      "adm.cpUsage": "Usage",
      "adm.cpDates": "Validity",
      "adm.cpStart": "Starts",
      "adm.cpEnd": "Ends",
      "adm.cpExpired": "Expired",
      "adm.adNew": "New banner",
      "adm.adSlot": "Placement slot",
      "adm.adsHint": "Schedule, enable or disable banners anywhere on the site.",
      "adm.notifNew": "New notification",
      "adm.notifHint": "Send a notification to everyone or to one user.",
      "adm.notifLevel": "Level",
      "adm.notifRecent": "Recent notifications",
      "notif.level.info": "Info",
      "notif.level.success": "Success",
      "notif.level.warning": "Warning",
      "notif.level.error": "Error",
      "adm.pagesPick": "Pick a page",
      "adm.pagesPickHint": "Choose a page from the list to edit its content.",
      "adm.pgHint": "Changes are text-only and apply immediately.",
      "adm.bPrinter": "Label printer",
      "adm.bPrinterHint": "Labels go to the printer through the browser print dialog.",
      "adm.bScanner": "Barcode scanner",
      "adm.bLabels": "Build & print labels",
      "adm.bPreview": "Label preview",
      "adm.bPriceMode": "Price display mode",
      "adm.bFound": "Product found",
      "adm.bNotFound": "No product with this barcode.",
      "adm.bPickFirst": "Select at least one product first.",
      "adm.ixHint": "Image fingerprints are computed in the browser so visual search works.",
      "adm.ixIndex": "Index remaining images",
      "adm.ixReindex": "Re-index all",
      "adm.ixDone": "Indexing done",
      "adm.audActor": "Actor",
      "adm.audAction": "Action",
      "adm.audTarget": "Target",
      "adm.audMeta": "Details",
      "adm.stOrders": "Orders",
      "adm.stRevenue": "Revenue",
      "adm.stVisits": "Visits",
      "adm.stUsers": "Users",
      "adm.stProducts": "Products",
      "adm.stAvg": "Average order",
      "adm.stByCat": "Category performance",
      "adm.stByBrand": "Top brands",
      "adm.data": "Data",
      "adm.dataHint": "Export, back up and clean up data.",
      "adm.dExport": "Export",
      "adm.dBackup": "Backup",
      "adm.dBackupHint": "A full copy of the database is saved in the data folder.",
      "adm.dCleanup": "Cleanup",
      "adm.dCleanupHint": "Audit entries older than 90 days and expired sessions are removed.",
      "sys.turnOn": "Turn the store on",
      "sys.turnOff": "Turn the store off",
      "sys.offConfirm": "Are you sure? Nobody can buy until you turn it back on.",
      "sys.autoWakeMins": "Auto turn-on after minutes (0 = never)",
      "sys.asleep": "The store is now off.",
      "sys.asleepTimed": "The store is off; it turns back on automatically in {n} minutes.",
      "sys.awake": "The store is on.",
      "sys.sleepBanner": "The store is currently off. Use the \u201CTurn the store on\u201D button at the top of this page.",
      "sys.keepAlive": "Keep the service warm",
      "checkout.guestInfo": "Guest contact details",
      "checkout.guestHint": "You can buy without an account; we only need this to coordinate delivery.",
      "checkout.guestName": "Full name",
      "checkout.guestPhone": "Mobile number",
      "checkout.guestPhoneHint": "e.g. 09123456789",
      "checkout.guestNameRequired": "Please enter your name.",
      "checkout.guestPhoneInvalid": "Mobile number must be 11 digits starting with 09.",
      "checkout.guestCodPickup": "Cash on delivery is only available for courier shipping. For pickup, pay online or sign in.",
      "home.recent": "Continue where you left off",
      "home.recentSub": "Products you viewed recently",
      "checkout.guestCourierNote": "Sign in for courier delivery"
    };
    DICTS = { fa, en };
    LANG = "fa";
    missing = /* @__PURE__ */ new Set();
    lang = () => LANG;
    isFa2 = () => LANG === "fa";
  }
});

// public/js/lib/api.mjs
var api_exports = {};
__export(api_exports, {
  ApiError: () => ApiError,
  api: () => api,
  errorEn: () => errorEn,
  errorMessage: () => errorMessage,
  getCookie: () => getCookie,
  onLoading: () => onLoading,
  withQuery: () => withQuery
});
function getCookie(name) {
  const m = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/[.$?*|{}()[\]\\/+^]/g, "\\$&") + "=([^;]*)"));
  return m ? decodeURIComponent(m[1]) : "";
}
function showQueueOverlay(pos) {
  if (!qEl) {
    qEl = document.createElement("div");
    qEl.className = "bm-queue-overlay";
    qEl.setAttribute("role", "status");
    qEl.innerHTML = '<div class="bm-q-card"><div class="bm-q-logo">\u{1F34F}</div><b class="bm-q-title"></b><p class="bm-q-pos"></p><div class="bm-q-bar"><i></i></div><span class="bm-q-note"></span></div>';
    document.documentElement.appendChild(qEl);
  }
  const en2 = document.documentElement.lang === "en";
  qEl.querySelector(".bm-q-title").textContent = en2 ? "Site is busy \u2014 you are in the queue" : "\u0633\u0627\u06CC\u062A \u0634\u0644\u0648\u063A \u0627\u0633\u062A \u2014 \u062F\u0631 \u0635\u0641 \u0648\u0631\u0648\u062F \u0647\u0633\u062A\u06CC";
  qEl.querySelector(".bm-q-pos").textContent = en2 ? `Your turn: ${pos > 0 ? pos : "\u2026"}` : `\u0646\u0648\u0628\u062A \u0634\u0645\u0627: ${pos > 0 ? pos : "\u2026"}`;
  qEl.querySelector(".bm-q-note").textContent = en2 ? "Continues automatically when it is your turn\u2026" : "\u0628\u0647\u200C\u0645\u062D\u0636 \u0631\u0633\u06CC\u062F\u0646 \u0646\u0648\u0628\u062A\u060C \u062E\u0648\u062F\u06A9\u0627\u0631 \u0627\u062F\u0627\u0645\u0647 \u067E\u06CC\u062F\u0627 \u0645\u06CC\u200C\u06A9\u0646\u062F\u2026";
}
function hideQueueOverlay() {
  if (qEl) {
    qEl.remove();
    qEl = null;
  }
}
async function waitForQueuePass(info = {}) {
  if (!qWaiting) {
    qWaiting = (async () => {
      showQueueOverlay(Number(info.pos) || 0);
      const poll = Math.max(2, Math.min(20, Number(info.pollSec) || 4)) * 1e3;
      for (let i = 0; i < 60; i++) {
        await new Promise((r) => setTimeout(r, poll));
        try {
          const res = await fetch("/api/queue/status", { credentials: "same-origin", headers: { Accept: "application/json" } });
          const d = await res.json();
          if (d?.state === "pass") {
            hideQueueOverlay();
            return true;
          }
          if (d?.state === "queued") showQueueOverlay(Number(d.pos) || 0);
        } catch {
        }
      }
      hideQueueOverlay();
      return false;
    })().finally(() => {
      qWaiting = null;
    });
  }
  return qWaiting;
}
function onLoading(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}
function setLoading(v) {
  busy = Math.max(0, busy + (v ? 1 : -1));
  for (const fn of listeners) {
    try {
      fn(busy > 0);
    } catch {
    }
  }
}
async function request(method, path, body, opts = {}) {
  if (!navigator.onLine && method !== "GET") {
    throw new ApiError(0, "offline", "\u0627\u062A\u0635\u0627\u0644 \u0627\u06CC\u0646\u062A\u0631\u0646\u062A \u0628\u0631\u0642\u0631\u0627\u0631 \u0646\u06CC\u0633\u062A. \u0644\u0637\u0641\u0627\u064B \u0634\u0628\u06A9\u0647 \u0631\u0627 \u0628\u0631\u0631\u0633\u06CC \u06A9\u0646.", "You are offline.");
  }
  setLoading(true);
  const headers = { ...opts.headers || {} };
  if (body !== void 0 && body !== null) headers["Content-Type"] = "application/json";
  if (method !== "GET") {
    const csrf = getCookie("bm_csrf");
    if (csrf) headers["X-CSRF-Token"] = csrf;
  }
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), opts.timeout || 25e3);
  try {
    const res = await fetch(path, {
      method,
      headers,
      signal: ctrl.signal,
      credentials: "same-origin",
      body: body === void 0 || body === null ? void 0 : JSON.stringify(body)
    });
    let data2 = null;
    const text = await res.text();
    if (text) {
      try {
        data2 = JSON.parse(text);
      } catch {
        data2 = { raw: text.slice(0, 300) };
      }
    }
    if (res.status === 403 && data2?.code === "csrf_failed" && !opts._retried) {
      await fetch("/api/bootstrap", { credentials: "same-origin" }).catch(() => {
      });
      return request(method, path, body, { ...opts, _retried: true });
    }
    if (res.status === 503 && data2?.code === "queued" && !opts._queueRetried) {
      const passed = await waitForQueuePass(data2?.details || {});
      if (passed) return request(method, path, body, { ...opts, _queueRetried: true });
    }
    if (!res.ok || data2?.ok === false) {
      const code = data2?.code || "error";
      throw new ApiError(res.status || 500, code, data2?.message || EN_MESSAGES[code] || "\u062E\u0637\u0627", EN_MESSAGES[code]);
    }
    return data2;
  } catch (err) {
    if (err instanceof ApiError) throw err;
    if (err?.name === "AbortError") throw new ApiError(408, "timeout", "\u0632\u0645\u0627\u0646 \u062F\u0631\u062E\u0648\u0627\u0633\u062A \u0628\u0647 \u067E\u0627\u06CC\u0627\u0646 \u0631\u0633\u06CC\u062F. \u062F\u0648\u0628\u0627\u0631\u0647 \u062A\u0644\u0627\u0634 \u06A9\u0646.", "Request timed out.");
    throw new ApiError(0, "network", "\u0627\u0631\u062A\u0628\u0627\u0637 \u0628\u0627 \u0633\u0631\u0648\u0631 \u0628\u0631\u0642\u0631\u0627\u0631 \u0646\u0634\u062F. \u0627\u062A\u0635\u0627\u0644 \u0627\u06CC\u0646\u062A\u0631\u0646\u062A \u0631\u0627 \u0628\u0631\u0631\u0633\u06CC \u06A9\u0646.", "Network error.");
  } finally {
    clearTimeout(timer);
    setLoading(false);
  }
}
function errorMessage(err) {
  if (!(err instanceof ApiError)) return String(err?.message || err || "\u062E\u0637\u0627");
  return err.message;
}
function errorEn(err) {
  return err?.details || EN_MESSAGES[err?.code] || err?.message || "Error";
}
var ApiError, EN_MESSAGES, qEl, qWaiting, busy, listeners, withQuery, api;
var init_api = __esm({
  "public/js/lib/api.mjs"() {
    ApiError = class extends Error {
      constructor(status, code, message, details) {
        super(message || code || "error");
        this.status = status;
        this.code = code;
        this.details = details;
      }
    };
    EN_MESSAGES = {
      login_required: "Please sign in to continue.",
      store_asleep: "The store is temporarily turned off.",
      unauthorized: "Authentication failed.",
      forbidden: "You do not have access to this section.",
      csrf_failed: "Security token expired. Please refresh the page.",
      too_many_requests: "Too many requests. Please wait a moment.",
      not_found: "Not found.",
      product_not_found: "Product not found.",
      order_not_found: "Order not found.",
      invalid_credentials: "Incorrect username or password.",
      invalid_code: "The verification code is not valid.",
      invalid_phone: "Invalid mobile number.",
      invalid_email: "Invalid email address.",
      weak_password: "Password is too weak. Use upper/lower case letters, digits and symbols.",
      stock_limit: "Not enough stock for this quantity.",
      empty_cart: "Your cart is empty.",
      insufficient_balance: "Wallet balance is not enough.",
      account_exists: "This account already exists.",
      username_taken: "This username is taken.",
      phone_taken: "This phone number is already registered.",
      email_taken: "This email is already registered.",
      terms_required: "You must accept the terms and conditions.",
      rules_required: "You must accept the ticket rules.",
      address_required: "Please add a shipping address first.",
      already_submitted: "You have already submitted this.",
      payload_too_large: "The uploaded data is too large.",
      invalid_type: "Only image files are allowed.",
      server_error: "Internal server error. Please try again.",
      product_unavailable: "One of the items in your cart is no longer available.",
      cannot_cancel: "This order cannot be cancelled in its current state.",
      account_blocked: "This account is blocked. Please contact support.",
      disabled: "This feature is currently disabled.",
      queued: "The site is busy. You are in the entry queue\u2026",
      banned: "Access is blocked. Please contact support."
    };
    qEl = null;
    qWaiting = null;
    busy = 0;
    listeners = /* @__PURE__ */ new Set();
    withQuery = (path, params) => {
      const u = new URLSearchParams();
      for (const [k, v] of Object.entries(params || {})) {
        if (v === void 0 || v === null || v === "") continue;
        u.set(k, String(v));
      }
      const s = u.toString();
      return s ? `${path}${path.includes("?") ? "&" : "?"}${s}` : path;
    };
    api = {
      url: withQuery,
      get: (p, o) => request("GET", p, void 0, o),
      post: (p, b, o) => request("POST", p, b ?? {}, o),
      patch: (p, b, o) => request("PATCH", p, b ?? {}, o),
      del: (p, b, o) => request("DELETE", p, b, o),
      put: (p, b, o) => request("PUT", p, b ?? {}, o),
      upload: (dataUrl) => request("POST", "/api/upload", { data: dataUrl }, { timeout: 6e4 })
    };
  }
});

// public/js/state.mjs
var state_exports = {};
__export(state_exports, {
  BUILD: () => BUILD,
  CONSENT_TTL_DAYS: () => CONSENT_TTL_DAYS,
  CONSENT_VERSION: () => CONSENT_VERSION,
  S: () => S,
  adInSlot: () => adInSlot,
  addSearch: () => addSearch,
  addToCart: () => addToCart,
  applyCoupon: () => applyCoupon,
  applyPrefs: () => applyPrefs,
  boot: () => boot,
  brandById: () => brandById,
  brandName: () => brandName,
  can: () => can,
  cartCount: () => cartCount,
  catById: () => catById,
  catName: () => catName,
  clearCart: () => clearCart,
  clearSearches: () => clearSearches,
  connectEvents: () => connectEvents,
  deleteNotification: () => deleteNotification,
  emit: () => emit,
  feat: () => feat,
  getImgIndex: () => getImgIndex,
  hasAlert: () => hasAlert,
  hasConsent: () => hasConsent2,
  inCompare: () => inCompare,
  inWishlist: () => inWishlist,
  isAdmin: () => isAdmin,
  isPlus: () => isPlus,
  loadCart: () => loadCart,
  loadNotifications: () => loadNotifications,
  loadPrefs: () => loadPrefs,
  markNotificationsRead: () => markNotificationsRead,
  mergeGuestData: () => mergeGuestData,
  on: () => on,
  ordersCfg: () => ordersCfg,
  plusCfg: () => plusCfg,
  prodName: () => prodName,
  promptInstall: () => promptInstall,
  pushRecent: () => pushRecent,
  refreshBootstrap: () => refreshBootstrap,
  refreshMe: () => refreshMe,
  removeFromCart: () => removeFromCart,
  setConsent: () => setConsent,
  setImgIndex: () => setImgIndex,
  setPref: () => setPref,
  setQty: () => setQty,
  settings: () => settings,
  ship: () => ship,
  store: () => store,
  themeCfg: () => themeCfg,
  toggleAlert: () => toggleAlert,
  toggleCompare: () => toggleCompare,
  toggleWishlist: () => toggleWishlist,
  ui: () => ui,
  watchInstall: () => watchInstall,
  watchNetwork: () => watchNetwork
});
function on(ev, fn) {
  if (!handlers.has(ev)) handlers.set(ev, /* @__PURE__ */ new Set());
  handlers.get(ev).add(fn);
  return () => handlers.get(ev)?.delete(fn);
}
function emit(ev, data2) {
  for (const fn of handlers.get(ev) || []) {
    try {
      fn(data2);
    } catch (e) {
      console.error("[state]", ev, e);
    }
  }
}
function readLS(key, fallback) {
  try {
    const raw2 = localStorage.getItem(key);
    return raw2 ? JSON.parse(raw2) : fallback;
  } catch {
    return fallback;
  }
}
function writeLS(key, val) {
  try {
    localStorage.setItem(key, JSON.stringify(val));
  } catch {
  }
}
function loadPrefs() {
  const saved = readLS(LS.prefs, {});
  S.prefs = { ...S.prefs, ...saved };
  if (S.me?.prefs) {
    const p = S.me.prefs;
    if (p.theme) S.prefs.theme = p.theme;
    if (p.locale) S.prefs.locale = p.locale;
    if (p.density && p.density !== "normal") S.prefs.density = p.density;
    if (p.reduceMotion !== void 0) S.prefs.reduceMotion = !!p.reduceMotion;
    if (p.uiSound !== void 0) S.prefs.uiSound = !!p.uiSound;
  }
  return S.prefs;
}
function setPref(key, value, { sync = true } = {}) {
  S.prefs[key] = value;
  writeLS(LS.prefs, S.prefs);
  applyPrefs();
  emit("prefs", { key, value });
  if (sync && S.me && ["theme", "locale", "density", "reduceMotion", "uiSound"].includes(key)) {
    const prefs = { theme: S.prefs.theme, locale: S.prefs.locale, density: S.prefs.density, reduceMotion: S.prefs.reduceMotion, uiSound: !!S.prefs.uiSound };
    api.patch("/api/me", { prefs }).then((r) => {
      if (r?.me) {
        S.me = r.me;
        emit("me", S.me);
      }
    }).catch(() => {
    });
  }
}
function applyPrefs() {
  const root = document.documentElement;
  const th = themeCfg();
  const p = S.prefs;
  const loc = p.locale || "fa";
  setLang(loc);
  setLocale(loc);
  root.setAttribute("data-lang", loc);
  let mode = p.theme || th.mode || "dark";
  if (mode === "auto") mode = window.matchMedia?.("(prefers-color-scheme: light)").matches ? "light" : "dark";
  root.setAttribute("data-mode", mode);
  root.setAttribute("data-theme", th.theme || "default");
  root.setAttribute("color-scheme", mode);
  root.setAttribute("data-port", th.portTheme === false ? "off" : "on");
  root.setAttribute("data-bg", th.bgStyle || "waves");
  root.setAttribute("data-variant", th.variant === "classic" ? "classic" : "fresh");
  const r = Math.max(0, Math.min(28, Number(th.radius ?? 16)));
  root.style.setProperty("--radius", `${r}px`);
  root.style.setProperty("--radius-sm", `${Math.max(4, Math.round(r * 0.68))}px`);
  root.style.setProperty("--radius-lg", `${Math.round(r * 1.5)}px`);
  const density = p.density === "compact" || p.density === "comfy" ? p.density : th.density || "normal";
  root.setAttribute("data-density", density);
  root.setAttribute("data-contrast", th.contrast === "high" ? "high" : "normal");
  const motionOff = p.reduceMotion === true || th.animations === false;
  root.setAttribute("data-motion", motionOff ? "off" : "on");
  const accent = /^#[0-9a-f]{6}$/i.test(String(th.accent || "").trim()) ? th.accent.trim() : "#f59e0b";
  const [rr, gg, bb] = hexToRgb(accent).split(",").map((x) => parseInt(x, 10));
  root.style.setProperty("--accent", accent);
  root.style.setProperty("--accent-rgb", `${rr}, ${gg}, ${bb}`);
  root.style.setProperty("--accent-2", shade(accent, -34));
  root.style.setProperty("--accent-3", shade(accent, 52));
  root.style.setProperty("--accent-soft", `rgba(${rr}, ${gg}, ${bb}, .14)`);
  const u = ui();
  root.setAttribute("data-nav", u.navStyle === "underline" ? "underline" : "pills");
  root.setAttribute("data-cards", u.cardStyle === "list" ? "list" : "grid");
  root.style.setProperty("--cols-m", String(clampInt(u.columns?.mobile, 2, 1, 3)));
  root.style.setProperty("--cols-t", String(clampInt(u.columns?.tablet, 3, 2, 4)));
  root.style.setProperty("--cols-d", String(clampInt(u.columns?.desktop, 4, 3, 6)));
  root.style.setProperty("--cols-w", String(clampInt(u.columns?.wide, 5, 3, 7)));
  root.style.setProperty("--ticker-dur", `${Math.max(8, Number(u.tickerSpeed) || 30)}s`);
  const hg = document.getElementById("headerGrid");
  if (hg) {
    hg.setAttribute("data-search-position", ["start", "center", "end"].includes(u.searchPosition) ? u.searchPosition : "center");
    hg.setAttribute("data-header-layout", ["logoStart", "split", "centered"].includes(u.headerLayout) ? u.headerLayout : "split");
  }
  const hd = document.getElementById("siteHeader");
  if (hd) hd.setAttribute("data-sticky", u.stickyHeader === false ? "off" : "on");
  const tb = document.getElementById("topbar");
  if (tb) tb.hidden = u.showTicker === false && !S.ticker.length;
  emit("theme", { mode, loc });
}
function clampInt(v, dflt, min, max) {
  const n = Number(v);
  return Number.isFinite(n) ? Math.max(min, Math.min(max, Math.round(n))) : dflt;
}
function hexToRgb(hex) {
  const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(String(hex).trim());
  if (!m) return "49, 175, 212";
  return `${parseInt(m[1], 16)}, ${parseInt(m[2], 16)}, ${parseInt(m[3], 16)}`;
}
function shade(hex, amt) {
  const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(String(hex).trim());
  if (!m) return hex;
  const f = (v) => Math.max(0, Math.min(255, v + amt)).toString(16).padStart(2, "0");
  return `#${f(parseInt(m[1], 16))}${f(parseInt(m[2], 16))}${f(parseInt(m[3], 16))}`;
}
async function boot() {
  S.recent = readLS(LS.recent, []);
  S.searches = readLS(LS.search, []);
  S.consent = readLS(LS.consent, null);
  S.wishlist = readLS(LS.wish, []);
  S.compare = readLS(LS.cmp, []);
  S.installed = window.matchMedia?.("(display-mode: standalone)").matches || navigator.standalone === true;
  let data2 = null;
  const t0 = Date.now();
  for (let attempt = 0; attempt < 10 && !data2; attempt++) {
    if (attempt) await new Promise((r) => setTimeout(r, 5e3));
    try {
      data2 = await api.get("/api/bootstrap");
    } catch (e) {
      console.warn("[state] bootstrap failed", e);
    }
    if (!data2 && Date.now() - t0 > 6e3) emit("boot-slow");
  }
  if (data2) {
    S.serverTime = data2.serverTime;
    S.sleeping = !!data2.sleeping;
    S.sleepSince = data2.sleepSince || null;
    S.settings = data2.settings || {};
    S.categories = data2.categories || [];
    S.brands = data2.brands || [];
    S.me = data2.me || null;
    S.stats = data2.stats || null;
    S.ads = data2.ads || [];
    S.ticker = data2.ticker || [];
    S.orderStatuses = data2.orderStatuses || [];
    S.ticketCategories = data2.ticketCategories || [];
    S.ticketPriorities = data2.ticketPriorities || [];
  }
  if (!data2) emit("boot-failed");
  loadPrefs();
  applyPrefs();
  if (S.me) {
    S.wishlist = S.me.wishlist || [];
    S.compare = S.me.compare || [];
    S.alerts = S.me.alerts || [];
    S.unread = S.me.unreadNotifications || 0;
  }
  await Promise.all([loadCart().catch(() => {
  }), S.me ? loadNotifications(true).catch(() => {
  }) : Promise.resolve()]);
  S.ready = true;
  connectEvents();
  emit("ready", S);
  return S;
}
async function refreshBootstrap({ silent = false } = {}) {
  try {
    const data2 = await api.get("/api/bootstrap");
    S.settings = data2.settings || S.settings;
    S.sleeping = !!data2.sleeping;
    S.sleepSince = data2.sleepSince || null;
    S.categories = data2.categories || S.categories;
    S.brands = data2.brands || S.brands;
    S.stats = data2.stats || null;
    S.ads = data2.ads || [];
    S.ticker = data2.ticker || [];
    if (data2.me !== void 0) {
      S.me = data2.me || null;
      emit("me", S.me);
    }
    applyPrefs();
    emit("settings", S.settings);
    return S;
  } catch (e) {
    if (!silent) throw e;
    return S;
  }
}
async function refreshMe() {
  if (!S.me) return null;
  try {
    const r = await api.get("/api/me");
    S.me = r.me || null;
    if (S.me) {
      S.wishlist = S.me.wishlist || [];
      S.compare = S.me.compare || [];
      S.alerts = S.me.alerts || [];
      S.unread = S.me.unreadNotifications || 0;
    }
    emit("me", S.me);
    return S.me;
  } catch {
    return S.me;
  }
}
async function loadCart() {
  try {
    const r = await api.get("/api/cart");
    S.cart = r.cart || S.cart;
    if (r.quote?.freeOver !== void 0) S.freeOver = r.quote.freeOver;
    if (r.quote?.plus !== void 0) S.cartPlus = r.quote.plus;
  } catch {
    S.cart = { items: [], count: 0, subtotal: 0, weight: 0, coupon: null };
  }
  emit("cart", S.cart);
  return S.cart;
}
async function addToCart(productId, qty = 1) {
  const r = await api.post("/api/cart/add", { productId, qty });
  S.cart = r.cart;
  emit("cart", S.cart);
  return r;
}
async function setQty(productId, qty) {
  const r = await api.patch("/api/cart/item", { productId, qty });
  S.cart = r.cart;
  emit("cart", S.cart);
  return r;
}
async function removeFromCart(productId) {
  const r = await api.del(`/api/cart/item/${encodeURIComponent(productId)}`);
  S.cart = r.cart;
  emit("cart", S.cart);
  return r;
}
async function clearCart() {
  const r = await api.post("/api/cart/clear");
  S.cart = r.cart || { items: [], count: 0, subtotal: 0, weight: 0, coupon: null };
  emit("cart", S.cart);
  return r;
}
async function applyCoupon(code) {
  const r = await api.post("/api/cart/coupon", { code });
  S.cart = r.cart;
  emit("cart", S.cart);
  return r;
}
async function toggleServer(kind, productId) {
  const r = await api.post(`/api/me/${kind}/${encodeURIComponent(productId)}`);
  if (kind === "wishlist") S.wishlist = r.wishlist || S.wishlist;
  if (kind === "compare") S.compare = r.compare || S.compare;
  if (kind === "alerts") S.alerts = r.alerts || S.alerts;
  return r;
}
async function toggleWishlist(productId) {
  if (!S.me) {
    const i = S.wishlist.indexOf(productId);
    if (i >= 0) S.wishlist.splice(i, 1);
    else S.wishlist.push(productId);
    writeLS(LS.wish, S.wishlist);
    emit("wishlist", S.wishlist);
    return { in: S.wishlist.includes(productId) };
  }
  const r = await toggleServer("wishlist", productId);
  emit("wishlist", S.wishlist);
  return r;
}
async function toggleCompare(productId) {
  if (!S.me) {
    const i = S.compare.indexOf(productId);
    if (i >= 0) S.compare.splice(i, 1);
    else {
      if (S.compare.length >= 4) S.compare.shift();
      S.compare.push(productId);
    }
    writeLS(LS.cmp, S.compare);
    emit("compare", S.compare);
    return { in: S.compare.includes(productId) };
  }
  const r = await toggleServer("compare", productId);
  emit("compare", S.compare);
  return r;
}
async function toggleAlert(productId) {
  if (!S.me) throw new Error("login_required");
  const r = await toggleServer("alerts", productId);
  emit("alerts", S.alerts);
  return r;
}
async function mergeGuestData() {
  if (!S.me) return;
  const localWish = readLS(LS.wish, []);
  const localCmp = readLS(LS.cmp, []);
  const todo = [];
  for (const id of localWish) if (!S.wishlist.includes(id)) todo.push(toggleServer("wishlist", id).catch(() => {
  }));
  for (const id of localCmp) if (!S.compare.includes(id) && S.compare.length < 4) todo.push(toggleServer("compare", id).catch(() => {
  }));
  await Promise.all(todo);
  emit("wishlist", S.wishlist);
  emit("compare", S.compare);
}
async function loadNotifications(silent = false) {
  if (!S.me) {
    S.notifications = [];
    S.unread = 0;
    return [];
  }
  try {
    const r = await api.get("/api/me/notifications");
    S.notifications = r.items || [];
    S.unread = S.notifications.filter((n) => !n.read).length;
    if (S.me) S.me.unreadNotifications = S.unread;
    emit("notifications", S.notifications);
  } catch (e) {
    if (!silent) throw e;
  }
  return S.notifications;
}
async function markNotificationsRead(ids, all = false) {
  const r = await api.post("/api/me/notifications/read", { ids: ids || [], all });
  await loadNotifications(true);
  return r;
}
async function deleteNotification(id) {
  await api.del(`/api/me/notifications/${encodeURIComponent(id)}`);
  await loadNotifications(true);
}
function pushRecent(productId) {
  if (!feat("recentlyViewed")) return;
  S.recent = [productId, ...S.recent.filter((x) => x !== productId)].slice(0, 12);
  writeLS(LS.recent, S.recent);
  emit("recent", S.recent);
}
function addSearch(q) {
  const s = String(q || "").trim();
  if (!s) return;
  S.searches = [s, ...S.searches.filter((x) => x !== s)].slice(0, 8);
  writeLS(LS.search, S.searches);
}
function clearSearches() {
  S.searches = [];
  writeLS(LS.search, []);
}
function setConsent(data2) {
  S.consent = { ...data2, v: CONSENT_VERSION, at: (/* @__PURE__ */ new Date()).toISOString() };
  writeLS(LS.consent, S.consent);
  if (S.me) api.patch("/api/me", { consent: true }).catch(() => {
  });
  emit("consent", S.consent);
}
function connectEvents() {
  if (es) {
    try {
      es.close();
    } catch {
    }
  }
  if (typeof EventSource === "undefined") return;
  try {
    es = new EventSource("/api/events", { withCredentials: true });
  } catch {
    return;
  }
  es.addEventListener("ready", () => {
    S.online = true;
  });
  es.addEventListener("support", (e) => {
    emit("sse:support", safeParse(e.data));
  });
  es.addEventListener("ticket", (e) => {
    emit("sse:ticket", safeParse(e.data));
    emit("notif", safeParse(e.data));
  });
  es.addEventListener("notif", (e) => {
    emit("sse:notif", safeParse(e.data));
    loadNotifications(true);
  });
  es.addEventListener("settings", () => refreshBootstrap({ silent: true }));
  es.onerror = () => {
    try {
      es.close();
    } catch {
    }
    clearTimeout(sseTimer);
    sseTimer = setTimeout(connectEvents, 8e3);
  };
}
function safeParse(s) {
  try {
    return JSON.parse(s);
  } catch {
    return null;
  }
}
function watchNetwork() {
  window.addEventListener("online", () => {
    S.online = true;
    emit("online", true);
    loadCart().catch(() => {
    });
  });
  window.addEventListener("offline", () => {
    S.online = false;
    emit("online", false);
  });
}
function watchInstall() {
  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    S.installPrompt = e;
    emit("install", e);
  });
  window.addEventListener("appinstalled", () => {
    S.installed = true;
    S.installPrompt = null;
    emit("installed");
  });
}
async function promptInstall() {
  if (!S.installPrompt) return false;
  S.installPrompt.prompt();
  const res = await S.installPrompt.userChoice;
  S.installPrompt = null;
  return res?.outcome === "accepted";
}
function getImgIndex() {
  return readLS(LS.imgIdx, null);
}
function setImgIndex(v) {
  writeLS(LS.imgIdx, v);
}
var LS, S, handlers, BUILD, settings, store, ui, themeCfg, feat, ship, plusCfg, ordersCfg, catById, brandById, isPlus, isAdmin, can, catName, brandName, prodName, adInSlot, cartCount, inWishlist, inCompare, hasAlert, CONSENT_VERSION, CONSENT_TTL_DAYS, hasConsent2, es, sseTimer;
var init_state = __esm({
  "public/js/state.mjs"() {
    init_api();
    init_i18n();
    init_dom();
    LS = {
      prefs: "bm_prefs_v1",
      cart: "bm_cart_local_v1",
      wish: "bm_wish_v1",
      cmp: "bm_cmp_v1",
      recent: "bm_recent_v1",
      search: "bm_search_v1",
      consent: "bm_consent_v1",
      imgIdx: "bm_img_index_v1"
    };
    S = {
      ready: false,
      serverTime: null,
      sleeping: false,
      sleepSince: null,
      settings: null,
      categories: [],
      brands: [],
      me: null,
      stats: null,
      ads: [],
      ticker: [],
      orderStatuses: [],
      ticketCategories: [],
      ticketPriorities: [],
      cart: { items: [], count: 0, subtotal: 0, weight: 0, coupon: null },
      wishlist: [],
      compare: [],
      alerts: [],
      notifications: [],
      unread: 0,
      recent: [],
      searches: [],
      prefs: { theme: "dark", locale: "fa", density: "normal", reduceMotion: false, view: "grid" },
      consent: null,
      online: navigator.onLine,
      installPrompt: null,
      installed: false
    };
    handlers = /* @__PURE__ */ new Map();
    BUILD = "bm-v42";
    settings = () => S.settings || {};
    store = () => S.settings?.store || {};
    ui = () => S.settings?.ui || {};
    themeCfg = () => S.settings?.theme || {};
    feat = (k) => S.settings?.features?.[k] !== false;
    ship = () => S.settings?.shipping || {};
    plusCfg = () => S.settings?.plus || {};
    ordersCfg = () => S.settings?.orders || {};
    catById = (id) => S.categories.find((c) => c.id === id) || null;
    brandById = (id) => S.brands.find((b) => b.id === id) || null;
    isPlus = () => !!(S.me?.plus?.active && S.me?.plus?.until && new Date(S.me.plus.until) > /* @__PURE__ */ new Date());
    isAdmin = () => !!S.me?.isAdmin;
    can = (perm) => {
      if (!S.me) return false;
      if (S.me.role === "owner") return true;
      return S.me.permissions?.[perm] === true;
    };
    catName = (c) => lang() === "fa" ? c?.name || "" : c?.nameEn || c?.name || "";
    brandName = (b) => lang() === "fa" ? b?.name || "" : b?.nameEn || b?.name || "";
    prodName = (p) => lang() === "fa" ? p?.name || "" : p?.nameEn || p?.name || "";
    adInSlot = (slot) => feat("ads") ? S.ads.filter((a) => a.slot === slot && a.active !== false) : [];
    cartCount = () => S.cart?.count || 0;
    inWishlist = (id) => S.wishlist.includes(id);
    inCompare = (id) => S.compare.includes(id);
    hasAlert = (id) => S.alerts.includes(id);
    CONSENT_VERSION = 2;
    CONSENT_TTL_DAYS = 180;
    hasConsent2 = () => {
      const c = S.consent;
      if (!c?.at) return false;
      if ((c.v || 1) !== CONSENT_VERSION) return false;
      const age = Date.now() - Date.parse(c.at);
      return Number.isFinite(age) && age >= 0 && age < CONSENT_TTL_DAYS * 864e5;
    };
    es = null;
    sseTimer = null;
  }
});

// public/js/ui.mjs
var ui_exports = {};
__export(ui_exports, {
  adaptive: () => adaptive,
  clearInvalid: () => clearInvalid,
  confirmDelete: () => confirmDelete,
  confirmDialog: () => confirmDialog,
  copyWithToast: () => copyWithToast,
  drawer: () => drawer,
  emptyState: () => emptyState,
  errorState: () => errorState,
  fillSelect: () => fillSelect,
  installHintModal: () => installHintModal,
  lightbox: () => lightbox,
  listSkeleton: () => listSkeleton,
  loadingBar: () => loadingBar,
  markInvalid: () => markInvalid,
  modal: () => modal,
  notice: () => notice,
  productSkeleton: () => productSkeleton,
  promptDialog: () => promptDialog,
  readForm: () => readForm,
  sheet: () => sheet,
  spinner: () => spinner,
  tableSkeleton: () => tableSkeleton,
  toast: () => toast,
  toastApiError: () => toastApiError,
  toastError: () => toastError2,
  toastSuccess: () => toastSuccess,
  toastWarn: () => toastWarn,
  uiClickSound: () => uiClickSound,
  uiSoundEnabled: () => uiSoundEnabled,
  updateSleepScreen: () => updateSleepScreen,
  wireAccordions: () => wireAccordions,
  wireTabs: () => wireTabs,
  withBusy: () => withBusy
});
function toast(message, { type = "info", title: title15 = "", timeout = 3800, action = null } = {}) {
  const root = toastRoot();
  if (!root) return null;
  const id = `t${++toastSeq}`;
  const cls = TYPE_CLASS[type] || "info";
  const node = el("div", { class: `toast ${cls}`, id, role: type === "error" ? "alert" : "status" });
  node.innerHTML = html`
    ${icon(TYPE_ICON[type] || "info")}
    <div class="grow">
      ${title15 ? html`<div class="toast-t">${title15}</div>` : ""}
      <div class="${title15 ? "toast-d" : "toast-t"}">${message}</div>
    </div>
    ${action ? html`<button type="button" class="toast-act" data-tid="${id}">${action.label}</button>` : ""}
    <button type="button" class="toast-x" aria-label="${t("common.close")}" data-close="${id}">${icon("close")}</button>`;
  root.appendChild(node);
  while (root.children.length > 4) root.firstElementChild.remove();
  const kill = () => {
    if (!node.isConnected) return;
    node.classList.add("out");
    setTimeout(() => node.remove(), 220);
  };
  const timer = timeout > 0 ? setTimeout(kill, timeout) : null;
  node.addEventListener("click", (e) => {
    if (e.target.closest("[data-close]")) {
      clearTimeout(timer);
      kill();
      return;
    }
    if (action && e.target.closest("[data-tid]")) {
      clearTimeout(timer);
      kill();
      try {
        action.onClick();
      } catch (err) {
        console.error(err);
      }
    }
  });
  return { close: () => {
    clearTimeout(timer);
    kill();
  } };
}
function toastApiError(err, fallbackKey = "err.generic") {
  const msg = err instanceof ApiError ? lang() === "en" ? err.details || err.message : err.message : errorMessage(err);
  toastError2(msg || t(fallbackKey));
}
function lockScroll(on2) {
  if (on2) document.body.classList.add("locked");
  else if (!layerStack.length) document.body.classList.remove("locked");
}
function makeLayer(opts) {
  const {
    kind = "modal",
    title: title15 = "",
    subtitle = "",
    size = "md",
    body = "",
    footer = "",
    onMount = null,
    onClose = null,
    closeBtn = true,
    dismissible = true
  } = opts;
  const host = kind === "modal" ? modalRoot() : drawerRoot();
  if (!host) return { close: () => {
  } };
  const prevFocus = document.activeElement;
  const isMobile = window.innerWidth < 760;
  const realKind = kind === "drawer" && isMobile ? "sheet" : kind;
  const overlay = el("div", {
    class: `overlay${realKind === "drawer" ? " overlay-drawer" : ""}${realKind === "sheet" ? " overlay-sheet" : ""}`
  });
  const panelCls = realKind === "modal" ? `modal ${SIZE_CLASS[size] ?? ""}`.trim() : realKind;
  const panel = el("div", { class: panelCls, role: "dialog", "aria-modal": "true" });
  if (title15) panel.setAttribute("aria-label", title15);
  const headCls = realKind === "modal" ? "modal-h" : "drawer-h";
  const bodyCls = realKind === "modal" ? "modal-b" : "drawer-b";
  panel.innerHTML = html`
    ${title15 ? html`<header class="${headCls}">
      <div class="grow"><h3>${title15}</h3>${subtitle ? html`<p class="small muted">${subtitle}</p>` : ""}</div>
      ${closeBtn ? html`<button type="button" class="layer-x" data-lx aria-label="${t("common.close")}">${icon("close")}</button>` : ""}
    </header>` : closeBtn ? html`<button type="button" class="layer-x" data-lx aria-label="${t("common.close")}">${icon("close")}</button>` : ""}
    <div class="${bodyCls}">${body}</div>
    ${footer ? html`<footer class="modal-f">${footer}</footer>` : ""}`;
  overlay.appendChild(panel);
  host.appendChild(overlay);
  lockScroll(true);
  let closed = false;
  const handle = {
    panel,
    overlay,
    result: void 0,
    dismissible,
    close(result) {
      if (closed) return;
      closed = true;
      handle.result = result;
      overlay.classList.add("out");
      panel.classList.add("out");
      setTimeout(() => {
        overlay.remove();
        const i = layerStack.indexOf(handle);
        if (i >= 0) layerStack.splice(i, 1);
        lockScroll(false);
        try {
          prevFocus?.focus?.({ preventScroll: true });
        } catch {
        }
      }, 190);
      try {
        onClose?.(result);
      } catch (e) {
        console.error(e);
      }
    }
  };
  layerStack.push(handle);
  overlay.addEventListener("click", (e) => {
    if (closeBtn && e.target.closest("[data-lx]")) {
      handle.close(null);
      return;
    }
    if (e.target === overlay && dismissible) handle.close(null);
  });
  panel.addEventListener("keydown", (e) => {
    if (e.key !== "Tab") return;
    const nodes = panel.querySelectorAll('a[href], button:not([disabled]), textarea, input:not([type=hidden]), select, [tabindex]:not([tabindex="-1"])');
    const list5 = [...nodes].filter((n) => n.offsetParent !== null);
    if (!list5.length) return;
    const first = list5[0];
    const last = list5[list5.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  });
  setTimeout(() => {
    const first = panel.querySelector("[data-autofocus], input:not([type=hidden]), textarea, select");
    try {
      first?.focus({ preventScroll: true });
    } catch {
    }
  }, 70);
  try {
    onMount?.(panel, handle);
  } catch (e) {
    console.error(e);
  }
  return handle;
}
function confirmDialog({ title: title15 = "", text = "", okText = "", cancelText = "", danger = false, icon: ic = "alert" } = {}) {
  return new Promise((resolve) => {
    let result = false;
    makeLayer({
      kind: "modal",
      title: title15 || t("common.warning"),
      size: "sm",
      body: html`
        <div class="confirm-body">
          <span class="confirm-ic ${danger ? "danger" : ""}">${icon(ic)}</span>
          <p class="confirm-text">${text}</p>
        </div>`,
      footer: html`
        <button type="button" class="btn btn-ghost" data-no>${cancelText || t("common.cancel")}</button>
        <button type="button" class="btn ${danger ? "btn-danger" : "btn-primary"}" data-yes data-autofocus>${okText || t("common.confirm")}</button>`,
      onClose: () => resolve(result),
      onMount: (panel, handle) => {
        panel.querySelector("[data-no]").addEventListener("click", () => {
          result = false;
          handle.close();
        });
        panel.querySelector("[data-yes]").addEventListener("click", () => {
          result = true;
          handle.close();
        });
      }
    });
  });
}
function promptDialog({ title: title15 = "", text = "", label = "", value = "", type = "text", okText = "", required = false, rows = 4 } = {}) {
  return new Promise((resolve) => {
    let result = null;
    makeLayer({
      kind: "modal",
      title: title15 || t("common.note"),
      size: "sm",
      body: html`
        <form class="prompt-form" data-pf>
          ${text ? html`<p class="confirm-text mb-s">${text}</p>` : ""}
          <label class="field">
            <span class="label">${label || title15}</span>
            ${type === "textarea" ? html`<textarea class="textarea" name="v" rows="${rows}" data-autofocus>${value}</textarea>` : html`<input class="input" type="${type}" name="v" value="${value}" data-autofocus>`}
          </label>
        </form>`,
      footer: html`
        <button type="button" class="btn btn-ghost" data-no>${t("common.cancel")}</button>
        <button type="button" class="btn btn-primary" data-yes>${okText || t("common.confirm")}</button>`,
      onClose: () => resolve(result),
      onMount: (panel, handle) => {
        const input = panel.querySelector("[name=v]");
        const submit = () => {
          const v = String(input.value || "").trim();
          if (required && !v) {
            input.classList.add("invalid");
            input.focus();
            return;
          }
          result = v;
          handle.close();
        };
        panel.querySelector("[data-no]").addEventListener("click", () => {
          result = null;
          handle.close();
        });
        panel.querySelector("[data-yes]").addEventListener("click", submit);
        panel.querySelector("[data-pf]").addEventListener("submit", (e) => {
          e.preventDefault();
          submit();
        });
        input.addEventListener("keydown", (e) => {
          if (e.key === "Enter" && type !== "textarea") {
            e.preventDefault();
            submit();
          }
        });
      }
    });
  });
}
function lightbox(images, startIndex = 0, title15 = "") {
  const norm = (x) => typeof x === "string" ? { url: x, kind: "image" } : x;
  const list5 = (Array.isArray(images) ? images : [images]).filter(Boolean).map(norm).filter((x) => x.url);
  if (!list5.length) return null;
  let i = Math.max(0, Math.min(startIndex, list5.length - 1));
  let onKey2 = null;
  let scale = 1;
  let tx = 0;
  let ty = 0;
  const apply = (fig) => {
    const m = fig?.querySelector(".lb-img");
    if (m) m.style.transform = `translate(${tx.toFixed(0)}px, ${ty.toFixed(0)}px) scale(${scale.toFixed(2)})`;
    fig?.classList.toggle("zoomed", scale > 1.01);
  };
  const reset = () => {
    scale = 1;
    tx = 0;
    ty = 0;
  };
  const render34 = () => {
    const it = list5[i];
    const media = it.kind === "video" ? `<video class="lb-img lb-video" src="${it.url}" controls playsinline autoplay preload="metadata"></video>` : `<img class="lb-img" src="${it.url}" alt="${title15 || t("img.alt")}" decoding="async" draggable="false">`;
    return html`
    <figure class="lb-figure">
      ${raw(media)}
      <div class="lb-tools" role="toolbar" aria-label="${t("pdp.zoomHint")}">
        <button type="button" class="icon-btn" data-zin aria-label="${t("pdp.zoomIn")}">${icon("plus")}</button>
        <button type="button" class="icon-btn" data-zout aria-label="${t("pdp.zoomOut")}">${icon("minus")}</button>
        <button type="button" class="icon-btn tiny-txt" data-zreset aria-label="${t("pdp.zoomReset")}">1x</button>
      </div>
      ${list5.length > 1 ? html`<figcaption class="lb-count">${i + 1} / ${list5.length}${it.kind === "video" ? ` \xB7 ${t("pdp.video")}` : ""}</figcaption>` : ""}
    </figure>`;
  };
  return makeLayer({
    kind: "modal",
    size: "lg",
    title: "",
    body: html`<div data-lb>${render34()}</div>`,
    footer: list5.length > 1 ? html`
      <button type="button" class="btn btn-ghost" data-prev>${icon("chevron-right")} ${t("common.prev")}</button>
      <button type="button" class="btn btn-ghost" data-next>${t("common.next")} ${icon("chevron-left")}</button>` : "",
    onClose: () => {
      if (onKey2) document.removeEventListener("keydown", onKey2);
      onKey2 = null;
    },
    onMount: (panel) => {
      const box = panel.querySelector("[data-lb]");
      const fig = () => box.querySelector(".lb-figure");
      const go = (d) => {
        i = (i + d + list5.length) % list5.length;
        reset();
        box.innerHTML = render34();
        wireFig();
      };
      panel.querySelector("[data-prev]")?.addEventListener("click", () => go(-1));
      panel.querySelector("[data-next]")?.addEventListener("click", () => go(1));
      const zoomBy = (f, cx, cy) => {
        const ns = Math.max(1, Math.min(4, scale * f));
        if (ns === 1) {
          tx = 0;
          ty = 0;
        } else if (cx != null) {
          tx = cx - (cx - tx) * (ns / scale);
          ty = cy - (cy - ty) * (ns / scale);
        }
        scale = ns;
        apply(fig());
      };
      let ptrs = /* @__PURE__ */ new Map();
      let pinch0 = 0;
      let scale0 = 1;
      const wireFig = () => {
        const f = fig();
        if (!f) return;
        const media = f.querySelector(".lb-img");
        f.addEventListener("wheel", (e) => {
          if (list5[i].kind === "video") return;
          e.preventDefault();
          const r = f.getBoundingClientRect();
          zoomBy(e.deltaY < 0 ? 1.18 : 1 / 1.18, e.clientX - r.left - r.width / 2, e.clientY - r.top - r.height / 2);
        }, { passive: false });
        f.addEventListener("dblclick", (e) => {
          if (list5[i].kind === "video") return;
          const r = f.getBoundingClientRect();
          if (scale > 1.01) {
            reset();
          } else zoomBy(2.5, e.clientX - r.left - r.width / 2, e.clientY - r.top - r.height / 2);
          apply(f);
        });
        f.addEventListener("pointerdown", (e) => {
          if (list5[i].kind === "video") return;
          ptrs.set(e.pointerId, [e.clientX, e.clientY]);
          if (ptrs.size === 2) {
            const [a, b] = [...ptrs.values()];
            pinch0 = Math.hypot(a[0] - b[0], a[1] - b[1]);
            scale0 = scale;
          }
          f.setPointerCapture?.(e.pointerId);
        });
        f.addEventListener("pointermove", (e) => {
          if (!ptrs.has(e.pointerId)) return;
          const prev = ptrs.get(e.pointerId);
          ptrs.set(e.pointerId, [e.clientX, e.clientY]);
          if (ptrs.size === 2 && pinch0) {
            const [a, b] = [...ptrs.values()];
            const d = Math.hypot(a[0] - b[0], a[1] - b[1]);
            scale = Math.max(1, Math.min(4, scale0 * (d / pinch0)));
            if (scale === 1) {
              tx = 0;
              ty = 0;
            }
            apply(f);
          } else if (scale > 1.01) {
            tx += e.clientX - prev[0];
            ty += e.clientY - prev[1];
            apply(f);
          }
        });
        const up = (e) => {
          ptrs.delete(e.pointerId);
          if (ptrs.size < 2) pinch0 = 0;
        };
        f.addEventListener("pointerup", up);
        f.addEventListener("pointercancel", up);
        f.querySelector("[data-zin]")?.addEventListener("click", () => zoomBy(1.3));
        f.querySelector("[data-zout]")?.addEventListener("click", () => zoomBy(1 / 1.3));
        f.querySelector("[data-zreset]")?.addEventListener("click", () => {
          reset();
          apply(f);
        });
        apply(f);
      };
      wireFig();
      onKey2 = (e) => {
        if (e.key === "ArrowLeft") go(1);
        else if (e.key === "ArrowRight") go(-1);
        else if (e.key === "+" || e.key === "=") zoomBy(1.3);
        else if (e.key === "-") zoomBy(1 / 1.3);
        else if (e.key === "0") {
          reset();
          apply(fig());
        }
      };
      document.addEventListener("keydown", onKey2);
    }
  });
}
function productSkeleton(n = 8) {
  let out = "";
  for (let i = 0; i < n; i++) out += '<div class="sk sk-card"></div>';
  return raw(`<div class="pgrid">${out}</div>`);
}
function listSkeleton(n = 5, lines = 3) {
  let out = "";
  for (let i = 0; i < n; i++) {
    let l = "";
    for (let j = 0; j < lines; j++) l += `<div class="sk sk-line w${[70, 40, 55, 80][j % 4]}"></div>`;
    out += html`<div class="card row-card">${l}</div>`;
  }
  return out;
}
function tableSkeleton(rows = 6, cols = 4) {
  let out = "";
  for (let i = 0; i < rows; i++) {
    let tds = "";
    for (let c = 0; c < cols; c++) tds += `<td><div class="sk sk-line w${[80, 55, 40, 70][c % 4]}"></div></td>`;
    out += `<tr>${tds}</tr>`;
  }
  return raw(`<div class="table-wrap"><table class="table"><tbody>${out}</tbody></table></div>`);
}
function emptyState({ icon: ic = "box", title: title15 = "", text = "", action = null, act: act2 = null } = {}) {
  return html`
    <div class="empty">
      <span class="empty-ic">${icon(ic)}</span>
      <h4>${title15 || t("common.noData")}</h4>
      ${text ? html`<p>${text}</p>` : ""}
      ${action ? html`<a class="btn btn-primary" href="${action.href || "#/"}">${action.label}</a>` : ""}
      ${act2 ? html`<button type="button" class="btn btn-primary" data-act="${act2.act}" ${act2.arg ? html`data-arg="${act2.arg}"` : ""}>${act2.label}</button>` : ""}
    </div>`;
}
function errorState({ title: title15 = "", text = "", retryAct = "ui-retry" } = {}) {
  return html`
    <div class="empty">
      <span class="empty-ic danger">${icon("alert")}</span>
      <h4>${title15 || t("err.generic")}</h4>
      ${text ? html`<p>${text}</p>` : ""}
      <button type="button" class="btn btn-primary" data-act="${retryAct}">${t("common.retry")}</button>
    </div>`;
}
function loadingBar(on2) {
  if (on2) {
    clearTimeout(barTimer);
    if (!barEl) {
      barEl = el("div", { class: "loadbar" });
      barEl.innerHTML = '<span class="loadbar-fill"></span>';
      document.body.appendChild(barEl);
    }
    requestAnimationFrame(() => barEl?.classList.add("on"));
  } else {
    barTimer = setTimeout(() => {
      barEl?.classList.remove("on");
      setTimeout(() => {
        barEl?.remove();
        barEl = null;
      }, 420);
    }, 160);
  }
}
async function withBusy(buttonOrSelector, fn, { busyText = "" } = {}) {
  const btn = typeof buttonOrSelector === "string" ? qs(buttonOrSelector) : buttonOrSelector;
  const original = btn ? btn.innerHTML : "";
  try {
    if (btn) {
      btn.disabled = true;
      btn.classList.add("busy");
      btn.innerHTML = html`<span class="spinner"></span>${busyText || t("common.loading")}`;
    }
    return await fn();
  } finally {
    if (btn) {
      btn.disabled = false;
      btn.classList.remove("busy");
      btn.innerHTML = original;
    }
  }
}
function readForm(form) {
  const data2 = {};
  const fd = new FormData(form);
  for (const [k, v] of fd.entries()) {
    if (k in data2 && !Array.isArray(data2[k])) data2[k] = [data2[k], v];
    else if (k in data2) data2[k].push(v);
    else data2[k] = v;
  }
  for (const cb of form.querySelectorAll("input[type=checkbox]")) data2[cb.name] = cb.checked;
  return data2;
}
function markInvalid(form, fieldName, message) {
  const input = form.querySelector(`[name="${fieldName}"]`);
  if (!input) return;
  input.classList.add("invalid");
  let hint = input.closest(".field")?.querySelector(".field-err");
  if (!hint) {
    hint = el("span", { class: "field-err" });
    (input.closest(".field") || input.parentElement).appendChild(hint);
  }
  hint.textContent = message;
  try {
    input.focus({ preventScroll: false });
  } catch {
  }
}
function clearInvalid(form) {
  form.querySelectorAll(".invalid").forEach((n) => n.classList.remove("invalid"));
  form.querySelectorAll(".field-err").forEach((n) => n.remove());
}
function fillSelect(sel, items, { valueKey = "id", labelKey = "label", placeholder = "", selected = "" } = {}) {
  if (!sel) return;
  const opts = placeholder ? [`<option value="">${esc(placeholder)}</option>`] : [];
  for (const it of items) {
    const v = it[valueKey];
    opts.push(`<option value="${esc(v)}"${String(v) === String(selected) ? " selected" : ""}>${esc(it[labelKey])}</option>`);
  }
  sel.innerHTML = opts.join("");
}
async function copyWithToast(text, msg) {
  const { copyText: copyText2 } = await Promise.resolve().then(() => (init_dom(), dom_exports));
  try {
    await copyText2(String(text));
    toastSuccess(msg || t("common.copied"));
  } catch {
    toastError2(t("err.generic"));
  }
}
function installHintModal() {
  const steps = lang() === "fa" ? ["\u0645\u0646\u0648\u06CC \u0645\u0631\u0648\u0631\u06AF\u0631 (\u22EE \u06CC\u0627 \u062F\u06A9\u0645\u0647\u0654 \u0627\u0634\u062A\u0631\u0627\u06A9\u200C\u06AF\u0630\u0627\u0631\u06CC) \u0631\u0627 \u0628\u0627\u0632 \u06A9\u0646.", "\u06AF\u0632\u06CC\u0646\u0647\u0654 \xAB\u0627\u0641\u0632\u0648\u062F\u0646 \u0628\u0647 \u0635\u0641\u062D\u0647\u0654 \u0627\u0635\u0644\u06CC\xBB \u06CC\u0627 \xABInstall app\xBB \u0631\u0627 \u0628\u0632\u0646.", "\u062A\u0623\u06CC\u06CC\u062F \u06A9\u0646\u061B \u0622\u06CC\u06A9\u0648\u0646 \u06AF\u0631\u06CC\u0646 \u0627\u067E\u0644 \u0628\u0647 \u0635\u0641\u062D\u0647\u0654 \u0627\u0635\u0644\u06CC \u0627\u0636\u0627\u0641\u0647 \u0645\u06CC\u200C\u0634\u0648\u062F."] : ["Open the browser menu (\u22EE or the Share button).", "Choose \u201CAdd to Home screen\u201D or \u201CInstall app\u201D.", "Confirm \u2014 the Green Apple icon appears on your home screen."];
  modal({
    title: t("misc.addToHome"),
    size: "sm",
    body: html`
      <div class="install-hint">
        <ol class="steps-list">${steps.map((s) => html`<li>${s}</li>`)}</ol>
        <p class="muted small">${t("misc.installHint")}</p>
      </div>`,
    footer: html`<button type="button" class="btn btn-primary" data-ok>${t("common.done")}</button>`,
    onMount: (panel, handle) => panel.querySelector("[data-ok]").addEventListener("click", () => handle.close())
  });
}
function wireAccordions(root = document) {
  root.querySelectorAll(".acc-h").forEach((head) => {
    if (head.dataset.wired) return;
    head.dataset.wired = "1";
    head.addEventListener("click", () => {
      const item = head.closest(".acc-item");
      const open = item.classList.toggle("open");
      const body = item.querySelector(".acc-b");
      if (body) body.hidden = !open;
      head.setAttribute("aria-expanded", String(open));
    });
  });
}
function wireTabs(root = document, onChange = null) {
  root.querySelectorAll(".tabs").forEach((bar) => {
    if (bar.dataset.wired) return;
    bar.dataset.wired = "1";
    bar.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-tab]");
      if (!btn) return;
      const key = btn.dataset.tab;
      bar.querySelectorAll("[data-tab]").forEach((b) => b.classList.toggle("active", b === btn));
      const scope = root;
      scope.querySelectorAll("[data-panel]").forEach((p) => {
        p.hidden = p.dataset.panel !== key;
      });
      onChange?.(key);
    });
  });
}
function updateSleepScreen({ sleeping = false, canWake = false, since = null, onWake = null, onLogin = null } = {}) {
  const id = "sleepScreen";
  let box = document.getElementById(id);
  if (!sleeping) {
    if (box) box.remove();
    document.body?.classList.remove("sleeping");
    return;
  }
  document.body?.classList.add("sleeping");
  const fa3 = lang() === "fa";
  const title15 = fa3 ? "\u0641\u0631\u0648\u0634\u06AF\u0627\u0647 \u0627\u0644\u0627\u0646 \u062E\u0627\u0645\u0648\u0634 \u0627\u0633\u062A" : "The store is asleep";
  const text = fa3 ? "\u0628\u0631\u0627\u06CC \u0627\u0633\u062A\u0631\u0627\u062D\u062A \u0648 \u0646\u06AF\u0647\u062F\u0627\u0631\u06CC\u060C \u0641\u0631\u0648\u0634\u06AF\u0627\u0647 \u0631\u0627 \u062E\u0627\u0645\u0648\u0634 \u06A9\u0631\u062F\u0647\u200C\u0627\u06CC\u0645. \u06A9\u0633\u06CC \u0646\u0645\u06CC\u200C\u062A\u0648\u0627\u0646\u062F \u0633\u0641\u0627\u0631\u0634 \u062B\u0628\u062A \u06A9\u0646\u062F \u062A\u0627 \u062F\u0648\u0628\u0627\u0631\u0647 \u0631\u0648\u0634\u0646 \u0634\u0648\u062F." : "The shop was switched off for a break. Nobody can place orders until it is turned on again.";
  const sinceTxt = since ? `<div class="tiny sleep-since">${fa3 ? "\u062E\u0627\u0645\u0648\u0634 \u0627\u0632" : "Asleep since"}: ${new Date(since).toLocaleString(fa3 ? "fa-IR" : "en-GB")}</div>` : "";
  if (!box) {
    box = document.createElement("div");
    box.id = id;
    box.className = "sleep-screen";
    box.setAttribute("role", "dialog");
    box.setAttribute("aria-modal", "true");
    document.body?.appendChild(box);
  }
  box.innerHTML = html`
    <div class="sleep-card">
      <span class="sleep-ic">${icon("moon")}</span>
      <h2>${title15}</h2>
      <p>${text}</p>
      ${raw(sinceTxt)}
      ${canWake ? html`<button class="btn btn-primary btn-block mt" data-sleep-wake>${icon("zap")} ${fa3 ? "\u0631\u0648\u0634\u0646 \u06A9\u0631\u062F\u0646 \u0641\u0631\u0648\u0634\u06AF\u0627\u0647" : "Turn the store on"}</button>` : html`
          <a class="btn btn-outline btn-block mt" href="#/auth" data-sleep-login>${icon("user")} ${fa3 ? "\u0648\u0631\u0648\u062F \u0645\u062F\u06CC\u0631 \u0628\u0631\u0627\u06CC \u0631\u0648\u0634\u0646 \u06A9\u0631\u062F\u0646" : "Sign in as admin to turn it on"}</a>
          <button class="btn btn-ghost btn-block mt-s" data-sleep-reload>${icon("refresh")} ${fa3 ? "\u062A\u0644\u0627\u0634 \u062F\u0648\u0628\u0627\u0631\u0647" : "Try again"}</button>`}
      <p class="tiny sleep-note">${fa3 ? "\u062E\u0648\u062F\u06A9\u0627\u0631 \u062E\u0627\u0645\u0648\u0634 \u0646\u0645\u06CC\u200C\u0634\u0648\u062F\u061B \u062A\u0627 \u0648\u0642\u062A\u06CC \u0631\u0648\u0634\u0646\u0634 \u0646\u06A9\u0646\u06CC \u062E\u0627\u0645\u0648\u0634 \u0645\u06CC\u200C\u0645\u0627\u0646\u062F." : "It never turns off by itself \u2014 it stays off until you switch it on."}</p>
    </div>`;
  box.querySelector("[data-sleep-wake]")?.addEventListener("click", async (e) => {
    const btn = e.currentTarget;
    btn.disabled = true;
    try {
      await onWake?.();
    } finally {
      btn.disabled = false;
    }
  });
  box.querySelector("[data-sleep-reload]")?.addEventListener("click", () => location.reload());
  box.querySelector("[data-sleep-login]")?.addEventListener("click", () => onLogin?.());
}
function enhancePwd(root) {
  root.querySelectorAll?.('input[type="password"]')?.forEach((inp) => {
    if (inp.dataset.pwdDone) return;
    inp.dataset.pwdDone = "1";
    const wrap = document.createElement("span");
    wrap.className = "pwd-wrap";
    inp.parentNode.insertBefore(wrap, inp);
    wrap.appendChild(inp);
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "pwd-eye";
    btn.dataset.eye = "1";
    btn.setAttribute("aria-label", t("pwd.show"));
    btn.title = t("pwd.show");
    btn.innerHTML = icon("eye");
    wrap.appendChild(btn);
  });
}
function uiClickSound(force = false) {
  if (!force && !uiSoundEnabled()) return;
  try {
    _ac = _ac || new (window.AudioContext || window.webkitSoundContext || window.webkitAudioContext)();
    if (_ac.state === "suspended") _ac.resume();
    const t0 = _ac.currentTime;
    const o = _ac.createOscillator();
    const g = _ac.createGain();
    o.type = "sine";
    o.frequency.setValueAtTime(1560, t0);
    o.frequency.exponentialRampToValueAtTime(1180, t0 + 0.06);
    g.gain.setValueAtTime(1e-4, t0);
    g.gain.exponentialRampToValueAtTime(0.045, t0 + 8e-3);
    g.gain.exponentialRampToValueAtTime(1e-4, t0 + 0.075);
    o.connect(g).connect(_ac.destination);
    o.start(t0);
    o.stop(t0 + 0.09);
  } catch {
  }
}
function uiSoundEnabled() {
  try {
    return !!JSON.parse(localStorage.getItem("bm_prefs_v1") || "{}").uiSound;
  } catch {
    return false;
  }
}
var modalRoot, drawerRoot, toastRoot, SIZE_CLASS, TYPE_CLASS, TYPE_ICON, toastSeq, toastSuccess, toastError2, toastWarn, layerStack, modal, drawer, sheet, adaptive, confirmDelete, spinner, notice, barEl, barTimer, _ac;
var init_ui = __esm({
  "public/js/ui.mjs"() {
    init_dom();
    init_i18n();
    init_api();
    modalRoot = () => qs("#modalRoot");
    drawerRoot = () => qs("#drawerRoot");
    toastRoot = () => qs("#toastRoot");
    SIZE_CLASS = { sm: "narrow", md: "", lg: "wide", xl: "wide" };
    TYPE_CLASS = { success: "success", error: "error", warn: "warning", warning: "warning", info: "info" };
    TYPE_ICON = { success: "check-circle", error: "alert", warn: "alert", warning: "alert", info: "info" };
    toastSeq = 0;
    toastSuccess = (m, o) => toast(m, { type: "success", ...o });
    toastError2 = (m, o) => toast(m, { type: "error", timeout: 5600, ...o });
    toastWarn = (m, o) => toast(m, { type: "warn", ...o });
    layerStack = [];
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && layerStack.length) {
        const top = layerStack[layerStack.length - 1];
        if (top.dismissible !== false) {
          e.preventDefault();
          top.close(null);
        }
      }
    });
    modal = (o) => makeLayer({ kind: "modal", ...o });
    drawer = (o) => makeLayer({ kind: "drawer", ...o });
    sheet = (o) => makeLayer({ kind: "sheet", ...o });
    adaptive = (o) => makeLayer({ kind: window.innerWidth < 760 ? "sheet" : "modal", ...o });
    confirmDelete = (text) => confirmDialog({
      title: t("common.delete"),
      text: text || t("misc.confirmDelete"),
      okText: t("common.delete"),
      danger: true,
      icon: "trash"
    });
    spinner = (label = "") => html`<div class="row center mt-l" role="status"><span class="spinner"></span>${label ? html`<span class="muted small">${label}</span>` : ""}</div>`;
    notice = (kind, text) => html`
  <div class="notice notice-${kind}">${icon(kind === "success" ? "check-circle" : kind === "danger" ? "alert" : "info")}<div class="grow">${text}</div></div>`;
    barEl = null;
    barTimer = null;
    document.addEventListener("click", (e) => {
      const btn = e.target.closest?.("[data-eye]");
      if (!btn) return;
      const inp = btn.parentElement?.querySelector("input");
      if (!inp) return;
      const show = inp.type === "password";
      inp.type = show ? "text" : "password";
      btn.innerHTML = icon(show ? "eye-off" : "eye");
      const lbl = show ? t("pwd.hide") : t("pwd.show");
      btn.setAttribute("aria-label", lbl);
      btn.title = lbl;
      inp.focus({ preventScroll: true });
    }, true);
    new MutationObserver((muts) => {
      for (const m of muts) m.addedNodes.forEach((n) => {
        if (n.nodeType === 1) enhancePwd(n);
      });
    }).observe(document.documentElement, { childList: true, subtree: true });
    enhancePwd(document);
    _ac = null;
    document.addEventListener("pointerdown", (e) => {
      if (!uiSoundEnabled()) return;
      if (e.target.closest?.('button, a, [role="button"], .pcard, .chip, .gal-thumb')) uiClickSound(true);
    }, true);
  }
});

// public/js/components.mjs
function productImage(p, cls = "") {
  const src = p.images && p.images[0] || "";
  const alt = prodName(p) || t("img.alt");
  if (src) return html`<img class="${cls}" src="${src}" alt="${alt}" loading="lazy" decoding="async" data-glyph="${p.glyph || "misc"}">`;
  return raw(`<svg class="ic ph-img ${cls}" data-glyph="${esc(p.glyph || "misc")}" role="img" aria-label="${esc(alt)}"><use href="#i-${catIcon(p.glyph || "misc")}"/></svg>`);
}
function productCard(p, { quick = null } = {}) {
  const showBrand = (ui().productCardInfo || []).includes("brand");
  const showStock = (ui().productCardInfo || []).includes("stock");
  const showRating = (ui().productCardInfo || []).includes("rating");
  const showQuick = quick !== null ? quick : feat("compare") || ui().quickView !== false;
  const stock = p.stock ?? 0;
  const stockCls = stock <= 0 ? "out" : stock <= 3 ? "low" : "";
  return html`
  <article class="pcard" data-pid="${p.id}">
    <div class="pc-media">
      <a href="#/product/${p.id}" aria-label="${prodName(p)}">${productImage(p)}</a>
      <div class="ribbon">
        ${p.discountPct > 0 ? html`<span class="badge-pill bp-danger">${fmtNum(p.discountPct)}٪ ${t("pdp.off")}</span>` : ""}
        ${stock <= 0 ? html`<span class="badge-pill bp-muted">${t("card.outOfStock")}</span>` : ""}
        ${p.featured ? html`<span class="badge-pill bp-accent">${icon("star")} ${t("home.featured")}</span>` : ""}
      </div>
      <div class="pc-quick">
        ${ui().quickView !== false ? html`<button type="button" class="pc-qbtn" data-act="quick-view" data-id="${p.id}" title="${t("card.quickView")}" aria-label="${t("card.quickView")}">${icon("eye")}</button>` : ""}
        ${feat("wishlist") ? html`<button type="button" class="pc-qbtn" data-act="wish-toggle" data-id="${p.id}" title="${t("card.wishlistAdd")}" aria-label="${t("card.wishlistAdd")}">${icon("heart")}</button>` : ""}
        ${feat("compare") ? html`<button type="button" class="pc-qbtn" data-act="compare-toggle" data-id="${p.id}" title="${t("card.compareAdd")}" aria-label="${t("card.compareAdd")}">${icon("compare")}</button>` : ""}
      </div>
    </div>
    <div class="pc-body">
      ${showBrand && p.brandName ? html`<span class="pc-brand">${lang() === "fa" ? p.brandName : p.brandNameEn || p.brandName}</span>` : ""}
      <h3 class="pc-name"><a href="#/product/${p.id}">${prodName(p)}</a></h3>
      ${showRating && p.ratingCount > 0 ? html`<div class="pc-rate">${stars(p.ratingAvg)} <span>${fmtNum(p.ratingAvg)} (${fmtNum(p.ratingCount)})</span></div>` : ""}
      ${showStock ? html`<div class="pc-stock ${stockCls}"><span class="dot"></span>${stock <= 0 ? t("card.outOfStock") : stock <= 3 ? t("common.lowStock") : t("common.inStock")}</div>` : ""}
      <div class="pc-price">
        ${p.oldPrice > p.price ? html`<span class="pc-old">${fmtMoney(p.oldPrice)}</span>` : ""}
        <span class="pc-now">${fmtMoney(p.price)}</span>
      </div>
      <div class="pc-actions">
        <button type="button" class="btn btn-primary" data-act="add-cart" data-id="${p.id}" ${stock <= 0 ? "disabled" : ""}>${icon("cart")} ${t("card.addToCart")}</button>
      </div>
    </div>
  </article>`;
}
function catCard(c, count = null) {
  return html`
    <a class="cat-card" href="#/category/${c.id}">
      <span class="cat-ic">${icon(catIcon(c.glyph))}</span>
      <span class="cat-name">${catName(c)}</span>
      ${count !== null ? html`<span class="cat-count">${fmtNum(count)} ${t("catalog.count")}</span>` : ""}
    </a>`;
}
function bannerHtml(ad) {
  const title15 = lang() === "en" && ad.titleEn ? ad.titleEn : ad.title;
  const text = lang() === "en" && ad.textEn ? ad.textEn : ad.text;
  const cta = lang() === "en" && ad.ctaEn ? ad.ctaEn : ad.cta;
  return html`
    <div class="banner">
      <div class="banner-body">
        <div class="banner-title">${title15}</div>
        ${text ? html`<div class="banner-text">${text}</div>` : ""}
      </div>
      ${ad.link ? html`<a class="btn btn-primary banner-cta" href="${ad.link.startsWith("#") || ad.link.startsWith("/") ? ad.link : "#/"}">${cta || t("common.more")} ${icon("chevron-left")}</a>` : ""}
    </div>`;
}
function sectionHead({ titleIcon = "", title: title15 = "", sub = "", link = null, linkLabel = "" }) {
  return html`
    <div class="section-head">
      <div>
        <h2 class="section-title">${titleIcon ? icon(titleIcon) : ""}${title15}</h2>
        ${sub ? html`<p class="section-sub">${sub}</p>` : ""}
      </div>
      ${link ? html`<a class="section-link" href="${link}">${linkLabel || t("common.showAll")} ${icon("chevron-left")}</a>` : ""}
    </div>`;
}
function breadcrumbs(items) {
  if (ui().showBreadcrumbs === false || !items?.length) return "";
  return html`
    <nav class="breadcrumb" aria-label="breadcrumb">
      <a href="#/">${icon("home")} ${t("nav.home")}</a>
      ${items.map((it, i) => html`
        ${icon("chevron-left")}
        ${i === items.length - 1 ? html`<span aria-current="page">${it.label}</span>` : html`<a href="${it.href}">${it.label}</a>`}`)}
    </nav>`;
}
function pagination(page, pages, makeHref) {
  if (pages <= 1) return "";
  const btn = (p, label, cls = "", disabled = false) => html`
    <a class="pg ${cls}" href="${disabled ? "#" : makeHref(p)}" ${disabled ? 'aria-disabled="true" tabindex="-1"' : ""} ${p === page ? 'aria-current="page"' : ""}>${label}</a>`;
  const nums = [];
  const push = (p) => {
    if (p >= 1 && p <= pages && !nums.includes(p)) nums.push(p);
  };
  push(1);
  push(2);
  for (let p = page - 1; p <= page + 1; p++) push(p);
  push(pages - 1);
  push(pages);
  nums.sort((a, b) => a - b);
  let out = [btn(page - 1, icon("chevron-right"), "", page <= 1)];
  let last = 0;
  for (const p of nums) {
    if (last && p - last > 1) out.push(html`<span class="pg pg-gap" aria-hidden="true">…</span>`);
    out.push(btn(p, fmtNum(p), p === page ? "active" : ""));
    last = p;
  }
  out.push(btn(page + 1, icon("chevron-left"), "", page >= pages));
  return html`<nav class="pagination" aria-label="${t("common.page")}">${raw(out.join(""))}</nav>`;
}
function statusBadge(status) {
  return html`<span class="badge-pill ${STATUS_BADGE[status] || "bp-muted"}">${t(`st.${status}`)}</span>`;
}
function payBadge(payment) {
  const map = { paid: "bp-success", unpaid: "bp-warn", pending: "bp-warn", refunded: "bp-muted", failed: "bp-danger", cancelled: "bp-muted" };
  return html`<span class="badge-pill ${map[payment?.status] || "bp-muted"}">${t(`ps.${payment?.status || "unpaid"}`)}</span>`;
}
function timelineHtml(order) {
  const items = order.timeline || [];
  if (!items.length) return "";
  return html`
    <div class="timeline">
      ${items.map((it) => html`
        <div class="tl-item">
          <div class="tl-t">${t(`st.${it.status}`) || it.status}</div>
          <div class="tl-d">${fmtDate(it.at)}${it.note ? ` \u2014 ${it.note}` : ""}${it.by ? ` \xB7 ${it.by}` : ""}</div>
        </div>`)}
    </div>`;
}
function statCard({ icon: ic = "box", label = "", value = "", sub = "" }) {
  return html`
    <div class="stat-card">
      <span class="stat-ic">${icon(ic)}</span>
      <div><div class="stat-val">${value}</div><div class="stat-lbl">${label}</div>${sub ? html`<div class="tiny muted">${sub}</div>` : ""}</div>
    </div>`;
}
function kpiCard({ label = "", value = "", sub = "", icon: ic = "" }) {
  return html`
    <div class="kpi">
      <div class="l">${label}</div>
      <div class="v">${value}</div>
      ${sub ? html`<div class="s">${sub}</div>` : ""}
    </div>`;
}
function barChart(points, { height = 130 } = {}) {
  const max = Math.max(1, ...points.map((p) => p.value));
  return html`
    <div class="chart" ${height ? html`data-h="${height}px"` : ""}>
      ${points.map((p) => html`<div class="bar" data-tip="${p.label}: ${fmtNum(p.value)}" data-h="${Math.max(2, Math.round(p.value / max * 100))}%"></div>`)}
    </div>
    <div class="chart-x">${points.map((p) => html`<span>${p.short || ""}</span>`)}</div>`;
}
function tableHtml(cols, rowsHtml, { emptyText = null } = {}) {
  if (!rowsHtml.length) return raw(`<div class="empty"><h4>${esc(emptyText || t("common.noData"))}</h4></div>`);
  return html`
    <div class="table-wrap">
      <table class="table">
        <thead><tr>${cols.map((c) => html`<th class="${c.cls || ""}">${c.label}</th>`)}</tr></thead>
        <tbody>${raw(rowsHtml.join(""))}</tbody>
      </table>
    </div>`;
}
function field2({ label = "", name, type = "text", value = "", placeholder = "", required = false, hint = "", attrs = "", span2 = false, autocomplete = "" }) {
  return html`
    <label class="field ${span2 ? "span-2" : ""}">
      <span class="label">${label}${required ? html`<span class="req">*</span>` : ""}</span>
      <input class="input" type="${type}" name="${name}" value="${value}" placeholder="${placeholder}" ${required ? "required" : ""} ${autocomplete ? html`autocomplete="${autocomplete}"` : ""} ${attrs}>
      ${hint ? html`<span class="hint">${hint}</span>` : ""}
    </label>`;
}
function textareaField({ label = "", name, value = "", placeholder = "", required = false, hint = "", rows = 4, span2 = false, attrs = "" }) {
  return html`
    <label class="field ${span2 ? "span-2" : ""}">
      <span class="label">${label}${required ? html`<span class="req">*</span>` : ""}</span>
      <textarea class="textarea" name="${name}" rows="${rows}" placeholder="${placeholder}" ${required ? "required" : ""} ${attrs}>${value}</textarea>
      ${hint ? html`<span class="hint">${hint}</span>` : ""}
    </label>`;
}
function selectField({ label = "", name, options = [], value = "", required = false, hint = "", span2 = false, placeholder = "" }) {
  return html`
    <label class="field ${span2 ? "span-2" : ""}">
      <span class="label">${label}${required ? html`<span class="req">*</span>` : ""}</span>
      <select class="select" name="${name}" ${required ? "required" : ""}>
        ${placeholder ? html`<option value="">${placeholder}</option>` : ""}
        ${options.map((o) => html`<option value="${o.value}" ${String(o.value) === String(value) ? "selected" : ""}>${o.label}</option>`)}
      </select>
      ${hint ? html`<span class="hint">${hint}</span>` : ""}
    </label>`;
}
function checkField({ label = "", name, checked = false, hint = "" }) {
  return html`
    <label class="check">
      <input type="checkbox" name="${name}" ${checked ? "checked" : ""}>
      <span class="box">${icon("check")}</span>
      <span>${label}${hint ? html`<span class="hint">${hint}</span>` : ""}</span>
    </label>`;
}
function switchField({ label = "", desc = "", name, checked = false, value = "" }) {
  return html`
    <div class="switch-row">
      <div><div class="t">${label}</div>${desc ? html`<div class="d">${desc}</div>` : ""}</div>
      <label class="switch">
        <input type="checkbox" name="${name}" value="${value}" ${checked ? "checked" : ""}>
        <span class="track"></span>
      </label>
    </div>`;
}
function qtyWidget({ value = 1, max = 99, min = 1, name = "qty", small = false }) {
  return html`
    <div class="qty" data-qty>
      <button type="button" data-q="-1" aria-label="-1">${icon("minus")}</button>
      <input type="number" name="${name}" value="${value}" min="${min}" max="${max}" inputmode="numeric">
      <button type="button" data-q="1" aria-label="+1">${icon("plus")}</button>
    </div>`;
}
function starsInput({ name = "rating", value = 0 }) {
  return html`
    <div class="stars-input" data-stars name-wrap="${name}" role="radiogroup" aria-label="${t("pdp.yourRating")}">
      ${[1, 2, 3, 4, 5].map((i) => html`
        <button type="button" data-star="${i}" class="${i <= value ? "on" : ""}" role="radio" aria-checked="${i === value}" aria-label="${i}">
          <svg class="ic"><use href="#i-star"/></svg>
        </button>`)}
      <input type="hidden" name="${name}" value="${value}">
    </div>`;
}
function summaryRows(q, { showPlus = true } = {}) {
  const rows = [];
  rows.push(html`<div class="sum-row"><span>${t("common.subtotal")}</span><span class="v">${fmtMoney(q.subtotal)}</span></div>`);
  if (showPlus && q.plusDiscount > 0) rows.push(html`<div class="sum-row discount"><span>${t("acc.plus")} (${fmtNum(q.plusDiscountPct || 3)}٪)</span><span class="v">−${fmtMoney(q.plusDiscount)}</span></div>`);
  if (q.couponDiscount > 0) rows.push(html`<div class="sum-row discount"><span>${t("common.discountCode")}: ${q.coupon?.code || ""}</span><span class="v">−${fmtMoney(q.couponDiscount)}</span></div>`);
  rows.push(html`<div class="sum-row"><span>${t("common.shipping")}${q.shippingLabel ? html` <span class="muted tiny">(${q.shippingLabel})</span>` : ""}</span><span class="v">${q.shipping === 0 ? t("common.free") : fmtMoney(q.shipping)}</span></div>`);
  if (q.insured) rows.push(html`<div class="sum-row"><span>${t("common.insurance")}</span><span class="v">${q.insuranceFee === 0 ? t("common.free") : fmtMoney(q.insuranceFee)}</span></div>`);
  rows.push(html`<div class="sum-row total"><span>${t("common.payable")}</span><span class="v">${fmtMoney(q.total)}</span></div>`);
  return raw(rows.join(""));
}
function freeShipBar(subtotal) {
  const freeOver = Number(ship().freeOver ?? 0);
  if (!freeOver || subtotal >= freeOver) return html`<div class="notice notice-success mt-s">${icon("truck")}<div>${t("cart.freeShipDone")}</div></div>`;
  const pctv = Math.min(100, Math.round(subtotal / freeOver * 100));
  return html`
    <div class="mt-s">
      <div class="progress"><i data-w="${pctv}%"></i></div>
      <p class="hint mt-s">${t("cart.freeShipHint", { amount: fmtMoney(freeOver - subtotal, { withUnit: true }).replace(/<[^>]+>/g, "") })}</p>
    </div>`;
}
function minimapSvg() {
  const fa3 = isFa2();
  return html`
    <svg viewBox="0 0 640 360" preserveAspectRatio="xMidYMid slice" role="img" aria-label="${t("contact.mapTitle")}">
      <rect class="mm-bg" width="640" height="360"/>
      <!-- دریا -->
      <path class="mm-sea" d="M0 292c60-14 120 10 180 2s110-24 170-14 130 26 190 12 100-18 100-18V360H0Z"/>
      <g class="mm-wave" fill="none">
        <path d="M28 316c14-8 26 8 40 0s26 8 40 0"/>
        <path d="M250 330c14-8 26 8 40 0s26 8 40 0"/>
        <path d="M470 318c14-8 26 8 40 0s26 8 40 0"/>
      </g>
      <!-- بلوک‌های شهری -->
      <g class="mm-block">
        <rect x="36" y="34" width="150" height="86" rx="10"/>
        <rect x="238" y="34" width="120" height="60" rx="10"/>
        <rect x="452" y="34" width="150" height="86" rx="10"/>
        <rect x="36" y="176" width="110" height="70" rx="10"/>
        <rect x="452" y="176" width="150" height="70" rx="10"/>
      </g>
      <!-- خیابان‌ها -->
      <g class="mm-road" fill="none">
        <path d="M0 148h640"/>
        <path d="M0 268h640"/>
        <path d="M204 0v292"/>
        <path d="M420 0v292"/>
      </g>
      <g class="mm-road-thin" fill="none">
        <path d="M312 148v120"/>
      </g>
      <!-- پاساژ مغازه -->
      <g>
        <rect class="mm-shop" x="238" y="176" width="150" height="70" rx="10"/>
        <text class="mm-txt mm-txt-b" x="313" y="205" text-anchor="middle">${fa3 ? "\u067E\u0627\u0633\u0627\u0698 \u0645\u0631\u0648\u0627\u0631\u06CC\u062F \u062E\u0644\u06CC\u062C" : "Gulf Pearl Passage"}</text>
        <text class="mm-txt" x="313" y="226" text-anchor="middle">${fa3 ? "\u0637\u0628\u0642\u0647\u0654 \u062F\u0648\u0645\u060C \u067E\u0644\u0627\u06A9 \u06F2\u06F4" : "2nd floor, No. 24"}</text>
      </g>
      <!-- نام خیابان‌ها -->
      <text class="mm-txt" x="24" y="140">${fa3 ? "\u062E\u06CC\u0627\u0628\u0627\u0646 \u0633\u0627\u062D\u0644\u06CC" : "Saheli St."}</text>
      <text class="mm-txt" x="446" y="140">${fa3 ? "\u06A9\u0648\u0686\u0647\u0654 \u0644\u0646\u062C\u200C\u0633\u0627\u0632\u0627\u0646" : "Boat-makers Alley"}</text>
      <text class="mm-txt mm-vert" x="196" y="60" transform="rotate(90 196 60)">${fa3 ? "\u0628\u0644\u0648\u0627\u0631 \u0628\u0646\u062F\u0631" : "Port Blvd."}</text>
      <!-- نشان مغازه -->
      <g transform="translate(313 176)">
        <circle class="mm-pulse" r="26"/>
        <path class="mm-accent" d="M0-34c11 0 19 8 19 19 0 14-19 31-19 31S-19-1-19-15c0-11 8-19 19-19Z"/>
        <circle class="mm-pin" cx="0" cy="-15" r="7"/>
      </g>
      <g class="mm-tag">
        <rect x="330" y="120" rx="12" width="${fa3 ? 92 : 74}" height="26"/>
        <text x="${fa3 ? 376 : 367}" y="137" text-anchor="middle">${fa3 ? "\u0645\u063A\u0627\u0632\u0647\u0654 \u0645\u0627" : "Our shop"}</text>
      </g>
      <!-- قطب‌نما و مقیاس -->
      <g class="mm-compass" transform="translate(596 44)">
        <circle r="17"/>
        <path d="M0-11 4 5 0 1-4 5Z"/>
        <text y="30" text-anchor="middle">N</text>
      </g>
      <g class="mm-scale" transform="translate(36 336)">
        <path d="M0 0h70" fill="none"/>
        <path d="M0-4v8M70-4v8" fill="none"/>
        <text x="78" y="4">${fa3 ? "\u06F1\u06F0\u06F0 \u0645\u062A\u0631" : "100 m"}</text>
      </g>
    </svg>`;
}
function captchaField({ hidden = false } = {}) {
  return html`
  <div class="captcha" data-captcha ${hidden ? "hidden" : ""}>
    <label class="check"><input type="checkbox" name="captchaBox" data-act="captcha-open"><span class="box">${icon("check")}</span><span>${t("captcha.label")}</span></label>
    <div class="captcha-ch" data-cch hidden>
      <div class="captcha-img" data-cimg></div>
      <div class="captcha-row">
        <input class="input" name="captchaAnswer" inputmode="numeric" autocomplete="off" placeholder="${t("captcha.placeholder")}" aria-label="${t("captcha.placeholder")}" data-act="captcha-check">
        <button type="button" class="btn btn-ghost" data-act="captcha-refresh" title="${t("captcha.refresh")}" aria-label="${t("captcha.refresh")}">${icon("refresh")}</button>
      </div>
      <div class="captcha-st" data-cst>${t("captcha.hint")}</div>
    </div>
    <input type="hidden" name="captchaToken" data-ctok>
  </div>`;
}
var productGrid, bannerSlot, STATUS_BADGE;
var init_components = __esm({
  "public/js/components.mjs"() {
    init_dom();
    init_i18n();
    init_state();
    init_dom();
    init_ui();
    productGrid = (items, opts) => html`<div class="pgrid">${items.map((p) => productCard(p, opts))}</div>`;
    bannerSlot = (slot, ads, extraClass = "") => {
      const list5 = (ads || []).filter((a) => a.slot === slot);
      if (!list5.length) return "";
      return html`<div class="${extraClass} banner-grid mt">${list5.map(bannerHtml)}</div>`;
    };
    STATUS_BADGE = {
      pending_payment: "bp-warn",
      pending_review: "bp-warn",
      confirmed: "bp-info",
      preparing: "bp-info",
      ready_pickup: "bp-accent",
      shipped: "bp-violet",
      delivered: "bp-success",
      cancelled: "bp-danger",
      refunded: "bp-muted",
      returned: "bp-muted"
    };
  }
});

// public/js/views/home.mjs
var home_exports = {};
__export(home_exports, {
  mount: () => mount,
  render: () => render,
  title: () => title
});
async function render() {
  const st = store();
  let recentItems = [];
  if (feat("recentlyViewed") && (S.recent || []).length) {
    try {
      recentItems = (await api.get(`/api/products?ids=${S.recent.slice(0, 8).join(",")}&limit=8`)).items || [];
    } catch {
      recentItems = [];
    }
  }
  let items = [];
  let cats = S.categories;
  let brands = S.brands;
  let stats2 = S.stats;
  try {
    const [pr, cr, br] = await Promise.all([
      api.get("/api/products?limit=48&sort=popular"),
      S.categories.length ? Promise.resolve(null) : api.get("/api/categories"),
      S.brands.length ? Promise.resolve(null) : api.get("/api/brands")
    ]);
    items = pr.items || [];
    if (cr) cats = cr.items || [];
    if (br) brands = br.items || [];
    if (feat("publicStats")) {
      try {
        const sr = await api.get("/api/stats/public");
        stats2 = sr.stats || stats2;
      } catch {
      }
    }
  } catch {
  }
  const featured = items.filter((p) => p.featured).slice(0, 8);
  const best = [...items].sort((a, b) => (b.sold || 0) - (a.sold || 0)).slice(0, 8);
  const fresh = [...items].sort((a, b) => String(b.createdAt || "").localeCompare(String(a.createdAt || ""))).slice(0, 8);
  const deals = items.filter((p) => p.discountPct > 0).sort((a, b) => b.discountPct - a.discountPct).slice(0, 8);
  const topCats = cats.filter((c) => !c.parentId).slice(0, 12);
  const list5 = featured.length ? featured : best.slice(0, 8);
  return html`
    ${bannerSlot("home_hero", adInSlot("home_hero"))}
    ${feat("partners") && S.settings.partners?.items?.length ? html`
    <section class="partners-sec partners-top">
      ${sectionHead({ titleIcon: "store", title: t("home.partnersTitle") })}
      <div class="marquee" aria-label="${t("home.partnersTitle")}">
        <div class="marquee-track">
          ${[...S.settings.partners.items, ...S.settings.partners.items].map((p) => {
    const br = (S.brands || []).find((b) => b.name === p.fa || p.en && (b.nameEn === p.en || b.nameEn?.toLowerCase() === p.en.toLowerCase()));
    const href2 = br ? `#/products?brand=${br.id}` : `#/search?q=${encodeURIComponent(p.fa)}`;
    return html`<a class="partner-chip" href="${href2}" title="${isFa2() ? p.fa : p.en || p.fa}">
              <img class="pt-logo" src="/assets/img/brands/${br ? br.id : "no_name"}.svg" alt="" loading="lazy" decoding="async">
              <b>${isFa2() ? p.fa : p.en || p.fa}</b></a>`;
  }).join("")}
        </div>
      </div>
    </section>` : ""}

    <section class="hero">
      <div class="hero-bg"><img src="/assets/img/hero-port.svg" alt="" decoding="async"></div>
      <div class="hero-inner">
        <span class="hero-kicker">${icon("anchor")} ${t("home.heroKicker")}</span>
        <h1 class="hero-title">${t("home.heroTitle")}</h1>
        <p class="hero-text">${t("home.heroText")}</p>
        <div class="hero-cta">
          <a class="btn btn-primary btn-lg" href="#/products">${icon("cart")} ${t("home.ctaShop")}</a>
          <a class="btn btn-ghost btn-lg" href="#/products?discount=1">${icon("percent")} ${t("home.ctaDeals")}</a>
        </div>
        <div class="hero-points">
          <span class="hero-point">${icon("shield")} ${t("home.point1")}</span>
          <span class="hero-point">${icon("package-check")} ${t("home.point2")}</span>
          <span class="hero-point">${icon("truck")} ${t("home.point3")}</span>
          <span class="hero-point">${icon("store")} ${t("home.point4")}</span>
        </div>
      </div>
    </section>

    ${bannerSlot("home_strip", adInSlot("home_strip"))}

    <section class="section">
      ${sectionHead({ titleIcon: "layers", title: t("home.categories"), sub: t("home.categoriesSub"), link: "#/products", linkLabel: t("common.showAll") })}
      <div class="cat-grid">${topCats.map((c) => catCard(c, c.count ?? null))}</div>
    </section>

    ${list5.length ? html`
    <section class="section">
      ${sectionHead({ titleIcon: "star", title: t("home.featured"), sub: t("home.featuredSub"), link: "#/products?sort=popular" })}
      ${productGrid(list5)}
    </section>` : ""}

    ${deals.length ? html`
    <section class="section">
      ${sectionHead({ titleIcon: "percent", title: t("home.deals"), sub: t("home.dealsSub"), link: "#/products?discount=1" })}
      ${productGrid(deals)}
    </section>` : ""}

    ${best.length ? html`
    <section class="section">
      ${sectionHead({ titleIcon: "chart", title: t("home.bestSellers"), sub: t("home.bestSellersSub"), link: "#/products?sort=popular" })}
      ${productGrid(best)}
    </section>` : ""}

    ${fresh.length ? html`
    <section class="section">
      ${sectionHead({ titleIcon: "sparkles", title: t("home.newArrivals"), sub: t("home.newArrivalsSub"), link: "#/products?sort=newest" })}
      ${productGrid(fresh)}
    </section>` : ""}

    ${brands.length ? html`
    <section class="section">
      ${sectionHead({ titleIcon: "tag", title: t("home.brands") })}
      <div class="row row-wrap">
        ${brands.slice(0, 18).map((b) => html`<a class="chip" href="#/products?brand=${b.id}">${brandName(b)}</a>`)}
      </div>
    </section>` : ""}

    <section class="section">
      ${sectionHead({ titleIcon: "shield", title: t("home.whyUs"), sub: t("home.whyUsSub") })}
      <div class="pwa-grid">
        <div class="pwa-card"><span class="pwa-ic">${icon("shield")}</span><div><div class="b">${t("home.point1")}</div><div class="muted small">${isFa2() ? "\u0647\u0645\u0647\u0654 \u06A9\u0627\u0644\u0627\u0647\u0627 \u067E\u06CC\u0634 \u0627\u0632 \u0641\u0631\u0648\u0634 \u062A\u0633\u062A \u0645\u06CC\u200C\u0634\u0648\u0646\u062F \u0648 \u0628\u0627 \u0641\u0627\u06A9\u062A\u0648\u0631 \u0631\u0633\u0645\u06CC \u0648 \u06AF\u0627\u0631\u0627\u0646\u062A\u06CC \u0641\u0631\u0648\u0634\u06AF\u0627\u0647 \u062A\u062D\u0648\u06CC\u0644 \u0645\u06CC\u200C\u06AF\u06CC\u0631\u06CC\u062F." : "Every item is tested before sale and delivered with an official invoice and store warranty."}</div></div></div>
        <div class="pwa-card"><span class="pwa-ic">${icon("package-check")}</span><div><div class="b">${t("home.point2")}</div><div class="muted small">${isFa2() ? "\u0637\u0628\u0642 \u0642\u0627\u0646\u0648\u0646\u060C \u06F7 \u0631\u0648\u0632 \u06A9\u0627\u0631\u06CC \u0641\u0631\u0635\u062A \u062F\u0627\u0631\u06CC \u0628\u062F\u0648\u0646 \u062F\u0644\u06CC\u0644 \u06A9\u0627\u0644\u0627 \u0631\u0627 \u0628\u0631\u06AF\u0631\u062F\u0627\u0646\u06CC\u061B \u0641\u0642\u0637 \u0647\u0632\u06CC\u0646\u0647\u0654 \u0628\u0631\u06AF\u0634\u062A \u0628\u0627 \u062A\u0648\u0633\u062A." : "By law you have 7 working days to return an item without reason; only return shipping is on you."}</div></div></div>
        <div class="pwa-card"><span class="pwa-ic">${icon("truck")}</span><div><div class="b">${t("home.point3")}</div><div class="muted small">${isFa2() ? "\u0633\u0641\u0627\u0631\u0634\u200C\u0647\u0627 \u0647\u0631 \u0631\u0648\u0632 \u06A9\u0627\u0631\u06CC \u0627\u0632 \u0628\u0648\u0634\u0647\u0631 \u0631\u0627\u0647\u06CC \u0645\u06CC\u200C\u0634\u0648\u0646\u062F\u061B \u062F\u0627\u062E\u0644 \u0634\u0647\u0631 \u0628\u0627 \u067E\u06CC\u06A9 \u0648 \u0628\u0642\u06CC\u0647\u0654 \u0627\u06CC\u0631\u0627\u0646 \u0628\u0627 \u067E\u0633\u062A." : "Orders leave Bushehr every working day \u2014 by courier in the city and by post nationwide."}</div></div></div>
        <div class="pwa-card"><span class="pwa-ic">${icon("headset")}</span><div><div class="b">${t("footer.support")}</div><div class="muted small">${isFa2() ? "\u0686\u062A \u0622\u0646\u0644\u0627\u06CC\u0646\u060C \u062A\u06CC\u06A9\u062A \u0648 \u062A\u0644\u0641\u0646\u061B \u0646\u0635\u0628 \u06AF\u0644\u0633 \u0648 \u0645\u0634\u0627\u0648\u0631\u0647\u0654 \u062E\u0631\u06CC\u062F \u0647\u0645 \u062F\u0631 \u0645\u063A\u0627\u0632\u0647 \u0631\u0627\u06CC\u06AF\u0627\u0646 \u0627\u0633\u062A." : "Live chat, tickets and phone; screen-guard installation and buying advice are free in store."}</div></div></div>
      </div>
    </section>

    ${feat("publicStats") && stats2 ? html`
    <section class="section">
      ${sectionHead({ titleIcon: "chart", title: t("home.statsTitle"), link: "#/stats", linkLabel: t("common.showAll") })}
      <div class="stats-grid">
        ${statCard({ icon: "box", label: t("stats.products"), value: fmtNum(stats2.products) })}
        ${statCard({ icon: "package-check", label: t("stats.ordersTotal"), value: fmtNum(stats2.ordersTotal) })}
        ${statCard({ icon: "cart", label: t("stats.ordersToday"), value: fmtNum(stats2.ordersToday) })}
        ${statCard({ icon: "eye", label: t("stats.visitsToday"), value: fmtNum(stats2.visitsToday) })}
        ${statCard({ icon: "users", label: t("stats.customers"), value: fmtNum(stats2.customers) })}
        ${statCard({ icon: "truck", label: t("stats.delivered"), value: fmtNum(stats2.deliveredOrders) })}
      </div>
    </section>` : ""}

    ${feat("plus") && !isPlus() ? html`
    <section class="section">
      <div class="banner">
        <div class="banner-body">
          <div class="banner-title">${icon("sparkles")} ${t("home.plusTitle")}</div>
          <div class="banner-text">${t("home.plusText")}</div>
          <div class="row row-wrap mt-s">
            ${(plusCfg().perks || []).slice(0, 4).map((p) => html`<span class="chip">${icon("check")} ${isFa2() ? p.fa : p.en}</span>`)}
          </div>
        </div>
        <a class="btn btn-primary banner-cta" href="#/account/plus">${t("home.plusCta")} ${icon("chevron-left")}</a>
      </div>
    </section>` : ""}

    <section class="section">
      <div class="catalog" >
        <div class="card">
          ${sectionHead({ titleIcon: "store", title: t("home.visitStore"), sub: t("home.visitStoreText") })}
          <p class="muted small mb">${esc(isFa2() ? st.address || "" : st.addressEn || st.address || "")}</p>
          <div class="row row-wrap">
            <a class="btn btn-primary" href="#/pages/contact">${icon("map")} ${t("home.openMap")}</a>
            <a class="btn btn-ghost" href="tel:${st.phone}">${icon("phone")} ${fmtTel(st.phone || "")}</a>
          </div>
        </div>
        <div class="card">
          ${sectionHead({ titleIcon: "download", title: t("home.appTitle"), sub: t("home.appText") })}
          <div class="row row-wrap">
            <button type="button" class="btn btn-primary" data-act="install-app">${icon("download")} ${t("home.installCta")}</button>
          </div>
          <p class="hint mt-s">${t("misc.installHint")}</p>
        </div>
      </div>
    </section>

    ${recentItems.length ? html`
    <section class="section">
      ${sectionHead({ titleIcon: "history", title: t("home.recent"), sub: t("home.recentSub") })}
      ${productGrid(recentItems)}
    </section>` : ""}

    <section class="section">
      <div class="card">
        <div class="minimap" data-act="open-map"" role="button" tabindex="0" aria-label="${t("contact.mapTitle")}">
          ${raw(minimapSvg())}
          <span class="minimap-hint">${icon("pin")} ${t("contact.mapHint")}</span>
        </div>
      </div>
    </section>
  `;
}
function mount() {
  const box = document.querySelector(".marquee");
  const track = box?.querySelector(".marquee-track");
  if (!box || !track) return null;
  let pos = 0;
  let dragging = false;
  let moved = 0;
  let suppressClick = false;
  let lastX = 0;
  let last = performance.now();
  let raf2 = 0;
  const speed = 42;
  const half = () => {
    const gap = parseFloat(getComputedStyle(track).gap || "10") || 10;
    return (track.scrollWidth + gap) / 2 || 1;
  };
  const ensureCopies = () => {
    const gap = parseFloat(getComputedStyle(track).gap || "10") || 10;
    const kids = [...track.children];
    if (!kids.length) return;
    const n0 = track.dataset.base ? Number(track.dataset.base) : kids.length / 2;
    const base = kids.slice(0, n0);
    const baseW = base.reduce((a, el2) => a + el2.offsetWidth + gap, 0);
    let mult = 1;
    while (baseW * mult < innerWidth * 1.6 && mult < 4) mult++;
    track.dataset.base = String(n0);
    const want = n0 * mult * 2;
    if (kids.length === want) return;
    const frag = document.createDocumentFragment();
    for (let c = 0; c < 2; c++) for (let m2 = 0; m2 < mult; m2++) base.forEach((el2) => frag.appendChild(el2.cloneNode(true)));
    track.innerHTML = "";
    track.appendChild(frag);
  };
  ensureCopies();
  addEventListener("resize", ensureCopies, { passive: true });
  const sign = () => getComputedStyle(track).direction === "rtl" ? 1 : -1;
  const wrap = () => {
    const hw = half();
    if (sign() > 0) {
      if (pos >= hw) pos -= hw;
      if (pos < 0) pos += hw;
    } else {
      if (pos <= -hw) pos += hw;
      if (pos > 0) pos -= hw;
    }
  };
  const tick = (now) => {
    const dt = Math.min(0.05, (now - last) / 1e3);
    last = now;
    if (!dragging && !document.documentElement.classList.contains("eco")) pos += sign() * speed * dt;
    wrap();
    track.style.transform = `translateX(${pos.toFixed(1)}px)`;
    raf2 = requestAnimationFrame(tick);
  };
  raf2 = requestAnimationFrame(tick);
  const down = (e) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    suppressClick = false;
    dragging = true;
    moved = 0;
    lastX = e.clientX;
    box.classList.add("grabbing");
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    window.addEventListener("pointercancel", up);
  };
  const move = (e) => {
    if (!dragging) return;
    const dx = e.clientX - lastX;
    pos += dx;
    moved += Math.abs(dx);
    lastX = e.clientX;
  };
  const up = () => {
    dragging = false;
    box.classList.remove("grabbing");
    if (moved > 8) suppressClick = true;
    window.removeEventListener("pointermove", move);
    window.removeEventListener("pointerup", up);
    window.removeEventListener("pointercancel", up);
  };
  const onClick = (e) => {
    if (!suppressClick) return;
    suppressClick = false;
    e.preventDefault();
    e.stopPropagation();
  };
  const noDrag = (e) => e.preventDefault();
  box.addEventListener("dragstart", noDrag);
  box.addEventListener("click", onClick, true);
  box.addEventListener("pointerdown", down);
  return () => {
    cancelAnimationFrame(raf2);
    box.removeEventListener("pointerdown", down);
    box.removeEventListener("dragstart", noDrag);
    box.removeEventListener("click", onClick, true);
    window.removeEventListener("pointermove", move);
    window.removeEventListener("pointerup", up);
    window.removeEventListener("pointercancel", up);
  };
}
var title;
var init_home = __esm({
  "public/js/views/home.mjs"() {
    init_dom();
    init_i18n();
    init_api();
    init_state();
    init_components();
    title = () => t("nav.home");
  }
});

// public/js/views/catalog.mjs
var catalog_exports = {};
__export(catalog_exports, {
  mount: () => mount2,
  render: () => render2
});
function withQuery2(ctx, patch) {
  const p = new URLSearchParams(ctx.query);
  for (const [k, v] of Object.entries(patch)) {
    if (v === null || v === "" || v === void 0) p.delete(k);
    else p.set(k, v);
  }
  p.delete("page");
  const path = ctx.params.id ? `/category/${ctx.params.id}` : "/products";
  return `#${path}${p.toString() ? `?${p}` : ""}`;
}
async function render2(ctx) {
  const params = new URLSearchParams(ctx.query);
  if (ctx.params.id) params.set("cat", ctx.params.id);
  const query = params;
  const apiQuery = new URLSearchParams();
  for (const k of ["q", "cat", "sort", "min", "max", "rating", "authenticity", "page"]) {
    if (query.get(k)) apiQuery.set(k, query.get(k));
  }
  if (query.get("brand")) apiQuery.set("brand", query.get("brand"));
  if (query.get("inStock") === "1") apiQuery.set("inStock", "1");
  if (query.get("discount") === "1") apiQuery.set("discount", "1");
  apiQuery.set("limit", "24");
  let data2 = { items: [], total: 0, pages: 1, page: 1, facets: {} };
  try {
    data2 = await api.get(`/api/products?${apiQuery}`);
  } catch {
  }
  const items = data2.items || [];
  const facets = data2.facets || {};
  const cats = S.categories;
  const brands = S.brands;
  const activeCat = ctx.params.id ? catById(ctx.params.id) : query.get("cat") ? catById(query.get("cat")) : null;
  const selBrands = (query.get("brand") || "").split(",").filter(Boolean);
  const sort = SORTS.includes(query.get("sort")) ? query.get("sort") : "relevant";
  const page = Number(query.get("page")) || 1;
  const crumb = [];
  if (activeCat) {
    const chain = [];
    let c = activeCat;
    while (c) {
      chain.unshift(c);
      c = c.parentId ? catById(c.parentId) : null;
    }
    for (const x of chain) crumb.push({ label: catName(x), href: `#/category/${x.id}` });
  } else if (query.get("q")) crumb.push({ label: `${t("search.resultsFor")} \xAB${query.get("q")}\xBB` });
  else crumb.push({ label: t("catalog.title") });
  const fopt = (type, value, label, count, checked) => html`
    <label class="fopt">
      <input type="checkbox" data-f="${type}" value="${value}" ${checked ? "checked" : ""}>
      <span class="cb">${icon("check")}</span>
      <span>${label}</span>
      ${count !== void 0 ? html`<span class="cnt">${fmtNum(count)}</span>` : ""}
    </label>`;
  return html`
    ${breadcrumbs(crumb)}
    <div class="section-head">
      <div>
        <h1 class="section-title">${activeCat ? catName(activeCat) : query.get("q") ? t("search.resultsFor") + " \xAB" + query.get("q") + "\xBB" : t("catalog.title")}</h1>
        <p class="section-sub">${fmtNum(data2.total || 0)} ${t("catalog.count")}</p>
      </div>
      <button type="button" class="btn btn-ghost only-mobile" data-act="cat-filters">${icon("filter")} ${t("catalog.showFilters")}</button>
    </div>

    ${data2.didYouMean ? html`<div class="notice notice-info mb">${icon("sparkles")}<span>${t("search.didYouMean")} <a class="section-link" href="${withQuery2(ctx, { q: data2.didYouMean })}">${data2.didYouMean}</a></span></div>` : ""}

    <div class="catalog">
      <aside class="filters card" id="filtersBox" hidden>
        <div class="row row-between mb-s">
          <strong>${t("catalog.filters")}</strong>
          <button type="button" class="link-btn" data-act="cat-clear">${t("catalog.f.clear")}</button>
        </div>

        <div class="fgroup">
          <button type="button" class="fgroup-h" data-act="acc">${t("catalog.f.category")} ${icon("chevron-down")}</button>
          <div class="acc-b fgroup-b" >
            ${cats.filter((c) => !c.parentId).map((c) => fopt("cat", c.id, catName(c), facets.categories?.[c.id], (query.get("cat") || ctx.params.id) === c.id))}
          </div>
        </div>

        <div class="fgroup">
          <button type="button" class="fgroup-h" data-act="acc">${t("catalog.f.brand")} ${icon("chevron-down")}</button>
          <div class="acc-b fgroup-b">
            ${brands.slice(0, 20).map((b) => fopt("brand", b.id, brandName(b), facets.brands?.[b.id], selBrands.includes(b.id)))}
          </div>
        </div>

        <div class="fgroup">
          <div class="fgroup-h">${t("catalog.f.price")}</div>
          <form class="fgroup-b row" data-price-form>
            <input class="input" type="number" min="0" step="10000" name="min" placeholder="${t("common.from")}" value="${query.get("min") || ""}">
            <input class="input" type="number" min="0" step="10000" name="max" placeholder="${t("common.to")}" value="${query.get("max") || ""}">
            <button class="btn btn-ghost btn-xs" type="submit">${t("common.apply")}</button>
          </form>
        </div>

        <div class="fgroup">
          <div class="fgroup-h">${t("catalog.f.availability")}</div>
          <div class="fgroup-b">
            ${fopt("flag", "inStock", t("catalog.f.inStock"), void 0, query.get("inStock") === "1")}
            ${fopt("flag", "discount", t("catalog.f.discountOnly"), void 0, query.get("discount") === "1")}
          </div>
        </div>

        <div class="fgroup">
          <div class="fgroup-h">${t("catalog.f.rating")}</div>
          <div class="fgroup-b">
            ${[4, 3, 2].map((r) => fopt("rating", r, `${fmtNum(r)}\u2605 ${t("common.and")} ${t("common.more")}`, void 0, query.get("rating") === String(r)))}
          </div>
        </div>

        <div class="fgroup">
          <div class="fgroup-h">${t("catalog.f.authenticity")}</div>
          <div class="fgroup-b">
            ${["original", "highcopy", "generic"].map((a) => fopt("authenticity", a, t(`auth.${a}`), facets.authenticity?.[a], query.get("authenticity") === a))}
          </div>
        </div>
      </aside>

      <div>
        <div class="toolbar">
          <span class="muted small">${fmtNum(data2.total || 0)} ${t("catalog.count")}</span>
          <span class="grow"></span>
          <label class="row" >
            <span class="muted small nowrap">${t("common.sort")}</span>
            <select class="select" data-sort>
              ${SORTS.map((s) => html`<option value="${s}" ${s === sort ? "selected" : ""}>${t(`catalog.sort.${s}`)}</option>`)}
            </select>
          </label>
          <div class="btn-group">
            <button type="button" class="btn ${S.prefs.view !== "list" ? "active" : ""}" data-view="grid" title="${t("catalog.viewGrid")}" aria-label="${t("catalog.viewGrid")}">${icon("grid")}</button>
            <button type="button" class="btn ${S.prefs.view === "list" ? "active" : ""}" data-view="list" title="${t("catalog.viewList")}" aria-label="${t("catalog.viewList")}">${icon("list")}</button>
          </div>
        </div>

        <div class="active-filters" data-activef>
          ${activeCat ? html`<span class="chip active" data-unf="cat">${catName(activeCat)} <span class="chip-close">${icon("close")}</span></span>` : ""}
          ${selBrands.map((b) => html`<span class="chip active" data-unf="brand" data-v="${b}">${brandName({ id: b, ...S.brands.find((x) => x.id === b) || {} })} <span class="chip-close">${icon("close")}</span></span>`)}
          ${query.get("inStock") === "1" ? html`<span class="chip active" data-unf="flag" data-v="inStock">${t("catalog.f.inStock")} <span class="chip-close">${icon("close")}</span></span>` : ""}
          ${query.get("discount") === "1" ? html`<span class="chip active" data-unf="flag" data-v="discount">${t("catalog.f.discountOnly")} <span class="chip-close">${icon("close")}</span></span>` : ""}
          ${query.get("min") || query.get("max") ? html`<span class="chip active" data-unf="price">${t("catalog.f.price")} <span class="chip-close">${icon("close")}</span></span>` : ""}
          ${query.get("rating") ? html`<span class="chip active" data-unf="rating">${query.get("rating")}★ <span class="chip-close">${icon("close")}</span></span>` : ""}
          ${query.get("authenticity") ? html`<span class="chip active" data-unf="authenticity">${t(`auth.${query.get("authenticity")}`)} <span class="chip-close">${icon("close")}</span></span>` : ""}
        </div>

        ${items.length ? raw(productGrid(items)) : emptyState({ icon: "search", title: t("search.noResultTitle"), text: t("search.noResultText"), action: { href: "#/products", label: t("cart.goShopping") } })}

        ${pagination(page, data2.pages || 1, (p) => withQuery2(ctx, { page: p > 1 ? p : null }))}
      </div>
    </div>
  `;
}
function mount2(root, ctx) {
  applyDyn(root);
  const box = root.querySelector("#filtersBox");
  if (window.innerWidth >= 980) box.hidden = false;
  const go = (href2) => {
    location.hash = href2.replace(/^#/, "");
  };
  root.querySelector("[data-sort]")?.addEventListener("change", (e) => go(withQuery2(ctx, { sort: e.target.value === "relevant" ? null : e.target.value })));
  root.querySelectorAll("[data-view]").forEach((b) => b.addEventListener("click", () => {
    setPref("view", b.dataset.view, { sync: false });
    document.documentElement.setAttribute("data-cards", b.dataset.view === "list" ? "list" : "grid");
    b.closest(".btn-group").querySelectorAll("button").forEach((x) => x.classList.toggle("active", x === b));
  }));
  const applyFilters = () => {
    const params = new URLSearchParams(ctx.query);
    if (ctx.params.id) params.delete("cat");
    const cats = [...root.querySelectorAll('[data-f="cat"]:checked')].map((n) => n.value);
    const brs = [...root.querySelectorAll('[data-f="brand"]:checked')].map((n) => n.value);
    const rating = root.querySelector('[data-f="rating"]:checked')?.value || "";
    const auth = root.querySelector('[data-f="authenticity"]:checked')?.value || "";
    const inStock = root.querySelector('[data-f="flag"][value="inStock"]:checked') ? "1" : "";
    const discount = root.querySelector('[data-f="flag"][value="discount"]:checked') ? "1" : "";
    const next = new URLSearchParams();
    for (const [k, v] of params.entries()) if (!["cat", "brand", "rating", "authenticity", "inStock", "discount", "page"].includes(k)) next.set(k, v);
    if (cats.length) next.set("cat", cats[cats.length - 1]);
    if (brs.length) next.set("brand", brs.join(","));
    if (rating) next.set("rating", rating);
    if (auth) next.set("authenticity", auth);
    if (inStock) next.set("inStock", "1");
    if (discount) next.set("discount", "1");
    const path = ctx.params.id && !cats.length ? `/category/${ctx.params.id}` : "/products";
    go(`#${path}${next.toString() ? `?${next}` : ""}`);
  };
  root.querySelectorAll("[data-f]").forEach((n) => n.addEventListener("change", applyFilters));
  root.querySelector("[data-price-form]")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    go(withQuery2(ctx, { min: fd.get("min") || null, max: fd.get("max") || null }));
  });
  root.querySelectorAll("[data-unf]").forEach((chip) => chip.addEventListener("click", () => {
    const kind = chip.dataset.unf;
    const patch = {};
    if (kind === "cat") {
      patch.cat = null;
      if (ctx.params.id) {
        location.hash = `#/products${ctx.query.toString() ? `?${new URLSearchParams([...ctx.query.entries()].filter(([k]) => k !== "cat"))}` : ""}`;
        return;
      }
    }
    if (kind === "brand") {
      const list5 = (ctx.query.get("brand") || "").split(",").filter((x) => x && x !== chip.dataset.v);
      patch.brand = list5.length ? list5.join(",") : null;
    }
    if (kind === "flag") patch[chip.dataset.v] = null;
    if (kind === "price") {
      patch.min = null;
      patch.max = null;
    }
    if (kind === "rating") patch.rating = null;
    if (kind === "authenticity") patch.authenticity = null;
    go(withQuery2(ctx, patch));
  }));
  return null;
}
var SORTS;
var init_catalog = __esm({
  "public/js/views/catalog.mjs"() {
    init_dom();
    init_i18n();
    init_api();
    init_state();
    init_components();
    init_router();
    init_actions();
    SORTS = ["relevant", "newest", "oldest", "cheapest", "dearest", "popular", "rating", "discount", "name"];
    act("cat-filters", (e, el2) => {
      const box = document.getElementById("filtersBox");
      if (!box) return;
      box.hidden = !box.hidden;
      el2.textContent = box.hidden ? t("catalog.showFilters") : t("catalog.hideFilters");
      if (!box.hidden) box.scrollIntoView({ behavior: "smooth", block: "start" });
    });
    act("cat-clear", () => {
      const path = location.hash.includes("/category/") ? "#/products" : location.hash.split("?")[0];
      location.hash = path;
    });
  }
});

// public/js/views/product.mjs
var product_exports = {};
__export(product_exports, {
  mount: () => mount3,
  render: () => render3,
  title: () => title2
});
async function render3(ctx) {
  const id = ctx.params.id;
  let data2 = null;
  try {
    data2 = await api.get(`/api/products/${encodeURIComponent(id)}`);
  } catch {
    return emptyState({ icon: "alert", title: t("err.notFound"), text: t("err.notFoundText"), action: { href: "#/products", label: t("err.goHome") } });
  }
  const p = data2.product;
  const allRev = data2.reviews || [];
  const reviews = allRev.filter((r) => r.type !== "question");
  const questions = allRev.filter((r) => r.type === "question");
  const rstats = data2.reviewStats || { count: 0, avg: 0, dist: [0, 0, 0, 0, 0], questions: 0 };
  const related = data2.related || [];
  const chain = [];
  let c = catById(p.categoryId);
  while (c) {
    chain.unshift(c);
    c = c.parentId ? catById(c.parentId) : null;
  }
  const images = (p.images && p.images.length ? p.images : []).slice(0, 6);
  const media = [
    ...images.map((u) => ({ url: u, kind: "image" })),
    ...(p.videos || []).slice(0, 4).map((u) => ({ url: u, kind: "video", poster: images[0] || "" }))
  ];
  const stock = p.stock ?? 0;
  const zones = ship().zones || [];
  return html`
    ${breadcrumbs([...chain.map((x) => ({ label: catName(x), href: `#/category/${x.id}` })), { label: prodName(p) }])}
    <div class="pdp">
      <div class="gallery">
        <div class="gal-main" data-act="lightbox" data-imgs='${esc(JSON.stringify(media))}' data-i="0" role="button" tabindex="0" aria-label="${t("pdp.zoomHint")}">
          ${media[0]?.kind === "video" ? html`<video src="${media[0].url}" poster="${media[0].poster}" controls playsinline preload="metadata" class="gal-video"></video>` : images[0] ? html`<img src="${images[0]}" alt="${prodName(p)}" data-glyph="${p.glyph}">` : raw(`<svg class="ic"><use href="#i-${p.glyph || "box"}"/></svg>`)}
          <span class="gal-zoom-hint" aria-hidden="true">${icon("search")} ${t("pdp.zoomHint")}</span>
        </div>
        ${media.length > 1 ? html`<div class="gal-thumbs">${media.map((m, i) => html`
          <button type="button" class="gal-thumb ${i === 0 ? "active" : ""}" data-thumb="${i}" aria-label="${i + 1}">
            ${m.kind === "video" ? raw(`<span class="gt-video">${m.poster ? `<img src="${m.poster}" alt="" loading="lazy">` : ""}<svg class="ic"><use href="#i-play"/></svg></span>`) : html`<img src="${m.url}" alt="" loading="lazy">`}
          </button>`)}</div>` : ""}
        <div class="row row-wrap">
          ${feat("wishlist") ? html`<button type="button" class="btn btn-ghost btn-sm ${inWishlist(p.id) ? "btn-danger" : ""}" data-act="wish-toggle" data-id="${p.id}">${icon("heart")} ${inWishlist(p.id) ? t("card.wishlistRemove") : t("card.wishlistAdd")}</button>` : ""}
          ${feat("compare") ? html`<button type="button" class="btn btn-ghost btn-sm ${inCompare(p.id) ? "active" : ""}" data-act="compare-toggle" data-id="${p.id}">${icon("scale")} ${t("compare.add")}</button>` : ""}
          <button type="button" class="btn btn-ghost btn-sm" data-act="share" data-title="${prodName(p)}">${icon("share")} ${t("pdp.share")}</button>
        </div>
      </div>

      <div class="buy-box">
        ${p.brandName ? html`<div class="pc-brand">${isFa2() ? p.brandName : p.brandNameEn || p.brandName}</div>` : ""}
        <h1 class="buy-title">${prodName(p)}</h1>
        ${!isFa2() && p.name ? html`<div class="buy-title-en">${p.name}</div>` : ""}
        <div class="row row-wrap mt-s">
          <span class="badge-pill bp-accent">${icon(catIconSafe(p.glyph))} ${catName(chain[chain.length - 1])}</span>
          <span class="badge-pill ${p.authenticity === "original" ? "bp-success" : p.authenticity === "highcopy" ? "bp-warn" : "bp-muted"}">${t(`auth.${p.authenticity || "generic"}`)}</span>
          ${p.featured ? html`<span class="badge-pill bp-violet">${icon("star")} ${t("home.featured")}</span>` : ""}
        </div>
        <div class="pc-rate mt-s">${stars(p.ratingAvg)} <span class="muted small">${fmtNum(rstats.avg || p.ratingAvg)} · ${fmtNum(rstats.count || p.ratingCount)} ${t("common.reviews")}</span></div>

        <div class="buy-price">
          ${p.oldPrice > p.price ? html`<span class="pc-old">${fmtMoney(p.oldPrice)}</span>` : ""}
          <span class="buy-now">${fmtMoney(p.price)}</span>
          ${p.discountPct > 0 ? html`<span class="pc-off">${fmtNum(p.discountPct)}٪</span>` : ""}
        </div>
        ${p.oldPrice > p.price ? html`<p class="hint">${t("pdp.save")}: ${fmtMoney(p.oldPrice - p.price)}</p>` : ""}

        <div class="pc-stock ${stock <= 0 ? "out" : stock <= 3 ? "low" : ""} mt-s">
          <span class="dot"></span>
          ${stock <= 0 ? t("card.outOfStock") : t("pdp.stockCount", { n: fmtNum(stock) })}
          ${stock > 0 && stock <= 3 ? html` <span class="badge-pill bp-warn">${t("common.lowStock")}</span>` : ""}
        </div>

        <div class="row mt">
          ${qtyWidget({ value: 1, max: Math.max(1, stock), name: "qty" })}
          <button type="button" class="btn btn-primary btn-lg grow" data-act="pdp-add" data-id="${p.id}" ${stock <= 0 ? "disabled" : ""}>${icon("cart")} ${t("pdp.addToCart")}</button>
        </div>
        <button type="button" class="btn btn-outline btn-block mt-s" data-act="pdp-buy" data-id="${p.id}" ${stock <= 0 ? "disabled" : ""}>${icon("zap")} ${t("pdp.buyNow")}</button>

        ${stock <= 0 && feat("priceAlerts") ? html`
          <button type="button" class="btn btn-ghost btn-block mt-s ${hasAlert(p.id) ? "active" : ""}" data-act="notify-me" data-id="${p.id}">
            ${icon("bell")} ${hasAlert(p.id) ? t("common.notified") : t("common.notifyMe")}
          </button>` : ""}

        <div class="divider"></div>
        <ul class="col">
          <li class="row"><span class="stat-ic" data-h="30px" data-w="30px">${icon("store")}</span><span class="small">${t("pdp.pickup")}</span></li>
          <li class="row"><span class="stat-ic" data-h="30px" data-w="30px">${icon("truck")}</span><span class="small">${t("checkout.courier")}: ${zones.map((z) => `${isFa2() ? z.name : z.nameEn} ${fmtNum(z.fee)}`).join(" \xB7 ")}</span></li>
          ${feat("insurance") ? html`<li class="row"><span class="stat-ic" data-h="30px" data-w="30px">${icon("scale")}</span><span class="small">${t("checkout.insuranceDesc")}</span></li>` : ""}
          <li class="row"><span class="stat-ic" data-h="30px" data-w="30px">${icon("shield")}</span><span class="small">${p.warrantyMonths > 0 ? t("pdp.warrantyMonths", { n: fmtNum(p.warrantyMonths) }) : t("pdp.noWarranty")}</span></li>
        </ul>

        <div class="divider"></div>
        <div class="row row-between small muted">
          <span>${t("pdp.sku")}: <button type="button" class="link-btn mono" data-act="copy" data-text="${p.sku}">${p.sku}</button></span>
          ${p.barcode ? html`<span>${t("pdp.barcode")}: <button type="button" class="link-btn mono" data-act="copy" data-text="${p.barcode}">${p.barcode}</button></span>` : ""}
        </div>
        <div class="row row-between small muted mt-s">
          <span>${icon("eye")} ${fmtNum(p.views)} ${t("pdp.viewed")}</span>
          <span>${icon("package-check")} ${fmtNum(p.sold)} ${t("pdp.sold")}</span>
        </div>
      </div>
    </div>

    ${bannerSlot("product_page", adInSlot("product_page"))}

    <section class="section card">
      <div class="tabs" role="tablist">
        <button type="button" class="tab active" data-tab="specs" role="tab">${t("pdp.specs")}</button>
        <button type="button" class="tab" data-tab="desc" role="tab">${t("pdp.description")}</button>
        ${feat("reviews") ? html`<button type="button" class="tab" data-tab="reviews" role="tab">${t("pdp.reviews")} (${fmtNum(rstats.count)})</button>` : ""}
        ${feat("questions") ? html`<button type="button" class="tab" data-tab="questions" role="tab">${t("pdp.questions")} (${fmtNum(rstats.questions || questions.length)})</button>` : ""}
      </div>

      <div class="tab-panel" data-panel="specs">
        ${Object.keys(p.specs || {}).length ? html`
          <table class="spec-table">
            <tbody>${Object.entries(p.specs).map(([k, v]) => html`<tr><th>${esc(k)}</th><td>${esc(v)}</td></tr>`)}</tbody>
          </table>` : html`<p class="muted">${t("common.noData")}</p>`}
        ${p.weight ? html`<table class="spec-table mt-s"><tbody><tr><th>${t("pdp.weight")}</th><td>${fmtNum(p.weight)} ${t("pdp.gram")}</td></tr></tbody></table>` : ""}
        ${(p.tags || []).length ? html`<div class="row row-wrap mt">${p.tags.map((tg) => html`<a class="tag" href="#/products?q=${encodeURIComponent(tg)}">#${tg}</a>`)}</div>` : ""}
      </div>

      <div class="tab-panel" data-panel="desc" hidden>
        <div class="rev-body">${linkify(isFa2() ? p.description || "" : p.descriptionEn || p.description || "")}</div>
        ${!isFa2() && p.descriptionEn ? "" : p.descriptionEn ? html`<div class="rev-body muted mt-s" dir="ltr">${esc(p.descriptionEn)}</div>` : ""}
      </div>

      ${feat("reviews") ? html`
      <div class="tab-panel" data-panel="reviews" hidden>
        <div class="rev-summary mb">
          <div class="rev-score">
            <div class="n">${fmtNum(rstats.avg || 0)}</div>
            ${stars(rstats.avg || 0)}
            <div class="muted small mt-s">${fmtNum(rstats.count)} ${t("common.reviews")}</div>
          </div>
          <div class="rev-bars">
            ${[5, 4, 3, 2, 1].map((s) => html`
              <div class="rev-bar"><span>${fmtNum(s)}★</span><span class="track"><span class="fill" data-w="${rstats.count ? Math.round((rstats.dist?.[s - 1] || 0) / rstats.count * 100) : 0}%"></span></span><span>${fmtNum(rstats.dist?.[s - 1] || 0)}</span></div>`)}
          </div>
        </div>
        <div data-reviews>
          ${reviews.length ? reviews.map(reviewHtml).join("") : html`<p class="muted">${t("pdp.noReviews")}</p>`}
        </div>
        <div class="divider"></div>
        ${S.me ? html`
          <form data-act="review-submit" data-pid="${p.id}">
            <strong>${t("pdp.writeReview")}</strong>
            <div class="mt-s">${starsInput({ name: "rating", value: 5 })}</div>
            <label class="field mt-s"><span class="label">${t("common.title")}</span><input class="input" name="title" maxlength="80" required></label>
            <label class="field"><span class="label">${t("common.body")}</span><textarea class="textarea" name="body" maxlength="1500" required></textarea></label>
            <button class="btn btn-primary" type="submit">${t("common.submit")}</button>
          </form>` : html`<p class="notice notice-info">${icon("user")}<span>${t("pdp.loginToReview")} <a class="section-link" href="#/auth?next=product/${p.id}">${t("nav.login")}</a></span></p>`}
      </div>` : ""}

      ${feat("questions") ? html`
      <div class="tab-panel" data-panel="questions" hidden>
        <div data-questions>
          ${questions.length ? questions.map(reviewHtml).join("") : html`<p class="muted">${t("pdp.noQuestions")}</p>`}
        </div>
        <div class="divider"></div>
        ${S.me ? html`
          <form data-act="question-submit" data-pid="${p.id}">
            <strong>${t("pdp.askQuestion")}</strong>
            <label class="field mt-s"><span class="label">${t("common.title")}</span><input class="input" name="title" maxlength="80" required></label>
            <label class="field"><span class="label">${t("common.body")}</span><textarea class="textarea" name="body" maxlength="1500" required></textarea></label>
            <button class="btn btn-primary" type="submit">${t("common.submit")}</button>
          </form>` : html`<p class="notice notice-info">${icon("user")}<span>${t("pdp.loginToReview")} <a class="section-link" href="#/auth?next=product/${p.id}">${t("nav.login")}</a></span></p>`}
      </div>` : ""}
    </section>

    ${related.length ? html`
    <section class="section">
      <div class="section-head"><div><h2 class="section-title">${icon("layers")} ${t("pdp.related")}</h2></div></div>
      ${productGrid(related.slice(0, 5))}
    </section>` : ""}

    ${S.recent.filter((x) => x !== p.id).length ? html`
    <section class="section">
      <div class="section-head"><div><h2 class="section-title">${icon("history")} ${t("misc.recentlyViewed")}</h2></div></div>
      <div data-recent></div>
    </section>` : ""}

    <div class="pdp-bar no-print">
      <div class="pdp-bar-p">
        <div class="b">${fmtMoney(p.price)}</div>
        ${(p.oldPrice || 0) > p.price ? html`<div class="tiny muted del">${fmtMoney(p.oldPrice)}</div>` : ""}
      </div>
      ${(p.stock || 0) > 0 ? html`<button class="btn btn-primary" data-act="pdp-add" data-id="${p.id}">${icon("cart")} ${t("pdp.addToCart")}</button>` : html`<button class="btn btn-ghost" data-act="notify-me" data-id="${p.id}">${icon("bell")} ${t("common.notifyMe")}</button>`}
    </div>
  `;
}
function catIconSafe(g) {
  const map = { cable: "cable", adapter: "plug", case: "shield", glass: "layers", powerbank: "battery", battery: "battery", dongle: "plug", speaker: "speaker", audio: "headset", wearable: "watch", content: "camera", gaming: "zap", car: "truck", light: "light", mics: "mic", misc: "box" };
  return map[g] || "box";
}
function reviewHtml(r) {
  return html`
    <div class="review" data-rid="${r.id}">
      <div class="rev-head">
        <span class="rev-who">${esc(r.userName)}</span>
        <span class="badge-pill ${r.userBadge === "buyer" ? "bp-success" : "bp-muted"}">${r.userBadge === "buyer" ? t("pdp.buyerBadge") : t("pdp.visitorBadge")}</span>
        ${r.rating ? stars(r.rating) : ""}
        <span class="rev-date">${fmtDate(r.createdAt, { time: false })}</span>
      </div>
      <div class="rev-title">${esc(r.title)}</div>
      <div class="rev-body">${esc(r.body)}</div>
      ${r.reply ? html`<div class="rev-reply"><strong>${t("pdp.storeReply")}:</strong> ${esc(r.reply)}</div>` : ""}
      <div class="rev-actions">
        <button type="button" class="link-btn" data-act="review-like" data-id="${r.id}">${icon("heart")} ${t("pdp.helpful")} (${fmtNum(r.likes || 0)})</button>
      </div>
    </div>`;
}
function wireLens(root) {
  const gal = root.querySelector(".gal-main");
  if (!gal) return;
  if (!window.matchMedia?.("(hover: hover) and (pointer: fine)")?.matches) return;
  const Z = 2.6;
  let lens = null;
  let limg = null;
  const hide = () => {
    if (lens) lens.style.display = "none";
  };
  gal.addEventListener("mousemove", (e) => {
    const img = gal.querySelector("img");
    if (!img || !img.currentSrc) {
      hide();
      return;
    }
    const r = gal.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    if (x < 0 || y < 0 || x > r.width || y > r.height) {
      hide();
      return;
    }
    if (!lens) {
      lens = document.createElement("div");
      lens.className = "gal-lens";
      lens.setAttribute("aria-hidden", "true");
      limg = document.createElement("img");
      limg.alt = "";
      lens.appendChild(limg);
      gal.appendChild(lens);
    }
    const size = Math.max(120, Math.min(190, Math.round(r.width * 0.46)));
    lens.style.width = `${size}px`;
    lens.style.height = `${size}px`;
    lens.style.display = "block";
    lens.style.left = `${Math.max(-size * 0.15, Math.min(r.width - size * 0.85, x - size / 2))}px`;
    lens.style.top = `${Math.max(-size * 0.15, Math.min(r.height - size * 0.85, y - size / 2))}px`;
    const bw = r.width * Z;
    const bh = r.height * Z;
    limg.src = img.currentSrc;
    limg.style.width = `${bw}px`;
    limg.style.height = `${bh}px`;
    const qx = Math.max(size / 2, Math.min(bw - size / 2, x / r.width * bw));
    const qy = Math.max(size / 2, Math.min(bh - size / 2, y / r.height * bh));
    limg.style.left = `${size / 2 - qx}px`;
    limg.style.top = `${size / 2 - qy}px`;
  });
  gal.addEventListener("mouseleave", hide);
  gal.addEventListener("click", hide);
}
function mount3(root, ctx) {
  applyDyn(root);
  pushRecent(ctx.params.id);
  wireTabs(root);
  wireLens(root);
  const gal = root.querySelector(".gal-main");
  if (gal) {
    let sx = null;
    let swiped = false;
    gal.addEventListener("click", (e) => {
      if (!swiped) return;
      swiped = false;
      e.stopPropagation();
      e.preventDefault();
    }, true);
    gal.addEventListener("pointerdown", (e) => {
      if (e.pointerType !== "touch") return;
      sx = e.clientX;
    }, { passive: true });
    gal.addEventListener("pointerup", (e) => {
      if (sx == null || e.pointerType !== "touch") return;
      const dx = e.clientX - sx;
      sx = null;
      if (Math.abs(dx) < 48) return;
      swiped = true;
      const items = JSON.parse(root.querySelector("[data-imgs]")?.dataset.imgs || "[]");
      if (items.length < 2) return;
      let i = Number(root.querySelector("[data-imgs]").dataset.i || 0);
      i = (i + (dx < 0 ? 1 : -1) + items.length) % items.length;
      root.querySelector(`[data-thumb="${i}"]`)?.click();
    }, { passive: true });
  }
  root.querySelectorAll("[data-thumb]").forEach((b) => b.addEventListener("click", () => {
    const i = Number(b.dataset.thumb);
    const items = JSON.parse(root.querySelector("[data-imgs]").dataset.imgs || "[]");
    const gal2 = root.querySelector(".gal-main");
    const m = items[i];
    if (gal2 && m) {
      gal2.querySelector("img, video")?.remove();
      if (m.kind === "video") {
        const v = document.createElement("video");
        v.src = m.url;
        v.controls = true;
        v.playsInline = true;
        v.preload = "metadata";
        v.className = "gal-video";
        if (m.poster) v.poster = m.poster;
        gal2.prepend(v);
      } else {
        const img = document.createElement("img");
        img.src = m.url;
        img.alt = "";
        gal2.prepend(img);
      }
    }
    root.querySelectorAll("[data-thumb]").forEach((x) => x.classList.toggle("active", x === b));
    root.querySelector("[data-imgs]").dataset.i = String(i);
  }));
  act("pdp-add", async (e, el2) => {
    const qty = Number(root.querySelector(".qty input")?.value || 1);
    await withBusy(el2, async () => {
      try {
        const { addToCart: addToCart2 } = await Promise.resolve().then(() => (init_state(), state_exports));
        await addToCart2(el2.dataset.id, qty);
        toastSuccess(t("card.added"), { timeout: 2400 });
      } catch (err) {
        toastApiError(err);
      }
    });
  });
  act("pdp-buy", async (e, el2) => {
    const qty = Number(root.querySelector(".qty input")?.value || 1);
    try {
      const { addToCart: addToCart2 } = await Promise.resolve().then(() => (init_state(), state_exports));
      await addToCart2(el2.dataset.id, qty);
      navigate("#/checkout");
    } catch (err) {
      toastApiError(err);
    }
  });
  act("review-like", async (e, el2) => {
    if (!S.me) {
      navigate("#/auth");
      return;
    }
    try {
      const r = await api.post(`/api/reviews/${el2.dataset.id}/like`);
      el2.innerHTML = html`${icon("heart")} ${t("pdp.helpful")} (${fmtNum(r.likes)})`;
    } catch (err) {
      toastApiError(err);
    }
  });
  act("review-submit", async (e, form) => {
    e.preventDefault();
    const fd = new FormData(form);
    await withBusy(form.querySelector("button[type=submit]"), async () => {
      try {
        const r = await api.post("/api/reviews", {
          productId: form.dataset.pid,
          type: "review",
          rating: Number(fd.get("rating") || 0),
          title: fd.get("title"),
          body: fd.get("body")
        });
        toastSuccess(r.message || t("pdp.reviewSubmitted"), { timeout: 5e3 });
        form.reset();
      } catch (err) {
        toastApiError(err);
      }
    });
  });
  act("question-submit", async (e, form) => {
    e.preventDefault();
    const fd = new FormData(form);
    await withBusy(form.querySelector("button[type=submit]"), async () => {
      try {
        const r = await api.post("/api/reviews", { productId: form.dataset.pid, type: "question", title: fd.get("title"), body: fd.get("body") });
        toastSuccess(r.message || t("pdp.questionSubmitted"), { timeout: 5e3 });
        form.reset();
      } catch (err) {
        toastApiError(err);
      }
    });
  });
  const recentBox = root.querySelector("[data-recent]");
  if (recentBox && S.recent.length) {
    api.get("/api/products?limit=60").then((r) => {
      const ids = S.recent.filter((x) => x !== ctx.params.id).slice(0, 5);
      const items = ids.map((id) => r.items.find((p) => p.id === id)).filter(Boolean);
      recentBox.innerHTML = productGrid(items);
      applyDyn(recentBox);
    }).catch(() => {
    });
  }
  return () => {
  };
}
var title2;
var init_product = __esm({
  "public/js/views/product.mjs"() {
    init_dom();
    init_i18n();
    init_api();
    init_state();
    init_components();
    init_ui();
    init_actions();
    init_router();
    title2 = (ctx) => ctx.params.id;
  }
});

// public/js/lib/vision.mjs
function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("image-load"));
    img.src = src;
  });
}
async function fingerprints(dataUrl) {
  const img = await loadImage(dataUrl);
  const c9 = document.createElement("canvas");
  c9.width = 9;
  c9.height = 8;
  const x9 = c9.getContext("2d", { willReadFrequently: true });
  x9.drawImage(img, 0, 0, 9, 8);
  const g9 = x9.getImageData(0, 0, 9, 8).data;
  const gray = (i) => 0.299 * g9[i] + 0.587 * g9[i + 1] + 0.114 * g9[i + 2];
  let bits = "";
  for (let y = 0; y < 8; y++) {
    for (let x = 0; x < 8; x++) {
      const a = gray((y * 9 + x) * 4);
      const b = gray((y * 9 + x + 1) * 4);
      bits += a > b ? "1" : "0";
    }
  }
  let dhash = "";
  for (let i = 0; i < 64; i += 4) dhash += parseInt(bits.slice(i, i + 4), 2).toString(16);
  const c8 = document.createElement("canvas");
  c8.width = 8;
  c8.height = 8;
  const x8 = c8.getContext("2d", { willReadFrequently: true });
  x8.drawImage(img, 0, 0, 8, 8);
  const d8 = x8.getImageData(0, 0, 8, 8).data;
  const hist = new Array(64).fill(0);
  for (let i = 0; i < 64; i++) {
    const r = d8[i * 4] >> 6;
    const g = d8[i * 4 + 1] >> 6;
    const b = d8[i * 4 + 2] >> 6;
    hist[r << 4 | g << 2 | b]++;
  }
  const total = hist.reduce((a, b) => a + b, 0) || 1;
  return { dhash, hist: hist.map((v) => Math.round(v / total * 1e3) / 1e3) };
}
var init_vision = __esm({
  "public/js/lib/vision.mjs"() {
  }
});

// public/js/views/search-image.mjs
var search_image_exports = {};
__export(search_image_exports, {
  mount: () => mount4,
  render: () => render4,
  title: () => title3
});
async function render4() {
  return html`
    <div class="section-head"><div>
      <h1 class="section-title">${icon("camera")} ${t("search.imageTitle")}</h1>
      <p class="section-sub">${t("search.imageText")}</p>
    </div></div>

    <div class="card t-center" data-drop>
      <span class="empty-ic">${icon("image")}</span>
      <p class="muted">${t("search.imageHint")}</p>
      <div class="row center row-wrap mt">
        <label class="btn btn-primary">${icon("upload")} ${t("search.pickFile")}
          <input type="file" accept="image/jpeg,image/png,image/webp" data-file hidden>
        </label>
        <label class="btn btn-ghost">${icon("camera")} ${t("search.takePhoto")}
          <input type="file" accept="image/*" capture="environment" data-file hidden>
        </label>
      </div>
      <div class="mt" data-preview hidden>
        <img class="si-preview" data-pimg alt="">
      </div>
    </div>

    <section class="section" data-results hidden></section>`;
}
function mount4(root) {
  applyDyn(root);
  const drop = root.querySelector("[data-drop]");
  const results = root.querySelector("[data-results]");
  const handleFile = async (file) => {
    if (!file) return;
    if (!/^image\//.test(file.type)) {
      toastApiError({ code: "invalid_type", message: t("err.generic") });
      return;
    }
    if (file.size > 4 * 1024 * 1024) {
      toastApiError({ code: "payload_too_large", message: t("err.generic") });
      return;
    }
    const dataUrl = await fileToDataURL(file);
    const prev = root.querySelector("[data-preview]");
    prev.hidden = false;
    root.querySelector("[data-pimg]").src = dataUrl;
    results.hidden = false;
    results.innerHTML = html`<div class="row center">${icon("refresh")} ${t("search.imageIndexing")}</div>`;
    await withBusy(null, async () => {
      try {
        const fp = await fingerprints(dataUrl);
        const r = await api.post("/api/search/image", fp);
        if (!r.indexed) {
          results.innerHTML = emptyState({ icon: "image", title: t("search.imageNoIndex"), text: t("adm.isHint") });
          return;
        }
        if (!r.items?.length) {
          results.innerHTML = emptyState({ icon: "search", title: t("search.imageNoMatch"), action: { href: "#/products", label: t("cart.goShopping") } });
          return;
        }
        results.innerHTML = html`
          <div class="section-head"><div><h2 class="section-title">${icon("sparkles")} ${fmtNum(r.items.length)} ${t("common.results")}</h2></div></div>
          ${productGrid(r.items.map((p) => ({ ...p, match: p.matchScore })))}
          <div class="row row-wrap mt-s">${r.items.map((p) => html`<span class="chip">${p.name?.slice(0, 24)}… ${fmtNum(p.matchScore)}٪</span>`)}</div>`;
      } catch (err) {
        results.innerHTML = emptyState({ icon: "alert", title: t("err.generic") });
        toastApiError(err);
      }
    });
  };
  root.querySelectorAll("[data-file]").forEach((inp) => inp.addEventListener("change", () => handleFile(inp.files?.[0])));
  ["dragover", "dragenter"].forEach((ev) => drop.addEventListener(ev, (e) => {
    e.preventDefault();
    drop.classList.add("drag");
  }));
  ["dragleave", "drop"].forEach((ev) => drop.addEventListener(ev, (e) => {
    e.preventDefault();
    drop.classList.remove("drag");
  }));
  drop.addEventListener("drop", (e) => handleFile(e.dataTransfer?.files?.[0]));
  return null;
}
var title3;
var init_search_image = __esm({
  "public/js/views/search-image.mjs"() {
    init_dom();
    init_i18n();
    init_api();
    init_vision();
    init_ui();
    init_components();
    title3 = () => t("search.imageTitle");
  }
});

// public/js/views/cart.mjs
var cart_exports = {};
__export(cart_exports, {
  mount: () => mount5,
  render: () => render5,
  title: () => title4
});
async function render5() {
  await loadCart().catch(() => {
  });
  const cart = S.cart;
  if (!cart.items?.length) {
    return html`
      <div class="section-head"><div><h1 class="section-title">${icon("cart")} ${t("cart.title")}</h1></div></div>
      ${emptyState({ icon: "cart", title: t("cart.empty"), text: t("cart.emptyText"), action: { href: "#/products", label: t("cart.goShopping") } })}`;
  }
  return html`
    <div class="section-head">
      <div><h1 class="section-title">${icon("cart")} ${t("cart.title")}</h1>
      <p class="section-sub">${fmtNum(cart.count)} ${t("common.items")}</p></div>
      <button type="button" class="link-btn" data-act="cart-clear">${icon("trash")} ${t("cart.clear")}</button>
    </div>
    ${bannerSlot("cart", adInSlot("cart"))}
    <div class="cart-grid">
      <div class="card" data-lines>
        ${cart.items.map(lineHtml).join("")}
      </div>
      <aside class="summary card">
        <strong>${t("cart.summary")}</strong>
        <div class="sum-row"><span>${t("common.subtotal")}</span><span class="v">${fmtMoney(cart.subtotal)}</span></div>
        <div data-coupon-row>
          ${cart.coupon ? html`<div class="sum-row discount"><span>${t("common.discountCode")}: ${cart.coupon.code}</span><span class="v"><button type="button" class="link-btn" data-act="coupon-remove">${t("cart.removeCoupon")}</button></span></div>` : ""}
        </div>
        <div data-shipbar>${freeShipBar(cart.subtotal)}</div>
        ${!cart.coupon ? html`
          <form class="row mt-s" data-act="coupon-apply">
            <input class="input" name="code" placeholder="${t("cart.couponPlaceholder")}" maxlength="32">
            <button class="btn btn-ghost" type="submit">${t("cart.applyCoupon")}</button>
          </form>` : ""}
        <div class="sum-row total"><span>${t("common.payable")}</span><span class="v" data-total>${fmtMoney(cart.subtotal - (cart.couponDiscount || 0))}</span></div>
        <p class="hint">${t("checkout.concurrencyNote")}</p>
        <a class="btn btn-primary btn-block btn-lg mt" href="#/checkout">${t("cart.continue")} ${icon("chevron-left")}</a>
      </aside>
    </div>`;
}
function lineHtml(it) {
  const p = it.product;
  return html`
    <div class="cart-line" data-line="${p.id}">
      <a class="cl-img" href="#/product/${p.id}">${p.images?.[0] ? html`<img src="${p.images[0]}" alt="${prodName(p)}" loading="lazy" data-glyph="${p.glyph}">` : icon(p.glyph || "box")}</a>
      <div class="cl-body">
        <a class="cl-name" href="#/product/${p.id}">${prodName(p)}</a>
        <div class="cl-meta">${p.brandName ? `${p.brandName} \xB7 ` : ""}${fmtMoney(p.price)} / ${t("common.unit")}</div>
        ${it.available < it.requestedQty ? html`<div class="err mt-s">${icon("alert")} ${t("common.lowStock")} (${fmtNum(it.available)})</div>` : ""}
        <div class="cl-foot">
          <span data-qtybox>${qtyWidget({ value: it.qty, max: Math.max(1, it.available), name: "qty" })}</span>
          <button type="button" class="link-btn" data-act="cart-remove" data-id="${p.id}">${icon("trash")} ${t("cart.remove")}</button>
          <span class="cl-price">${fmtMoney(it.lineTotal)}</span>
        </div>
      </div>
    </div>`;
}
function mount5(root) {
  applyDyn(root);
  root.querySelectorAll(".qty input").forEach((input) => {
    input.addEventListener("change", async () => {
      const line = input.closest("[data-line]");
      const id = line.dataset.line;
      const qty = Math.max(1, Number(input.value) || 1);
      try {
        await setQty(id, qty);
        toast(t("cart.updated"), { timeout: 1500 });
        Promise.resolve().then(() => (init_router(), router_exports)).then((m) => m.refresh(true));
      } catch (err) {
        toastApiError(err);
        Promise.resolve().then(() => (init_router(), router_exports)).then((m) => m.refresh(true));
      }
    });
  });
  act("cart-remove", async (e, el2) => {
    try {
      await removeFromCart(el2.dataset.id);
      Promise.resolve().then(() => (init_router(), router_exports)).then((m) => m.refresh(true));
    } catch (err) {
      toastApiError(err);
    }
  });
  act("cart-clear", async () => {
    const ok = await confirmDialog({ text: t("cart.clearConfirm"), danger: true, okText: t("cart.clear") });
    if (!ok) return;
    try {
      await clearCart();
      Promise.resolve().then(() => (init_router(), router_exports)).then((m) => m.refresh(true));
    } catch (err) {
      toastApiError(err);
    }
  });
  act("coupon-apply", async (e, form) => {
    e.preventDefault();
    const code = form.querySelector("[name=code]").value.trim();
    if (!code) return;
    await withBusy(form.querySelector("button"), async () => {
      try {
        await applyCoupon(code);
        toastSuccess(t("cart.couponApplied"));
        Promise.resolve().then(() => (init_router(), router_exports)).then((m) => m.refresh(true));
      } catch (err) {
        toastApiError(err);
      }
    });
  });
  act("coupon-remove", async () => {
    try {
      await applyCoupon("");
      Promise.resolve().then(() => (init_router(), router_exports)).then((m) => m.refresh(true));
    } catch (err) {
      toastApiError(err);
    }
  });
  return null;
}
var title4;
var init_cart = __esm({
  "public/js/views/cart.mjs"() {
    init_dom();
    init_i18n();
    init_api();
    init_state();
    init_components();
    init_ui();
    init_actions();
    init_router();
    title4 = () => t("cart.title");
  }
});

// public/js/views/checkout-done.mjs
var checkout_done_exports = {};
__export(checkout_done_exports, {
  mount: () => mount6,
  render: () => render6,
  title: () => title5
});
function fromSession(id) {
  try {
    const o = JSON.parse(sessionStorage.getItem("bm_last_order") || "null");
    return o && o.id === id ? o : null;
  } catch {
    return null;
  }
}
async function render6(ctx) {
  const id = ctx.params.id;
  let order = fromSession(id);
  if (!order && S.me) {
    try {
      order = (await api.get(`/api/me/orders/${encodeURIComponent(id)}`)).order;
    } catch {
    }
  }
  if (!order) {
    return html`<div class="card t-center">
      <span class="empty-ic">${icon("check-circle")}</span>
      <h1 class="mt-s">${t("checkout.successTitle")}</h1>
      <a class="btn btn-primary mt" href="#/account/orders">${t("acc.orders")}</a>
    </div>`;
  }
  const paid = order.payment?.status === "paid";
  return html`
    <div class="card t-center">
      <span class="pwa-ic center" data-h="72px" data-w="72px">${icon("check-circle")}</span>
      <h1 class="mt-s">${t("checkout.successTitle")}</h1>
      <p class="muted">${t("checkout.successText", { code: order.code })}</p>
      <div class="row center row-wrap mt">
        ${statusBadge(order.status)} ${payBadge(order.payment)}
        <span class="badge-pill bp-accent">${fmtMoney(order.total)}</span>
      </div>
      ${!paid && order.payment?.method === "gateway" ? html`
        <a class="btn btn-success btn-lg mt" href="#/pay/${order.id}">${icon("card")} ${t("checkout.payNow")}</a>` : ""}
      <div class="row center row-wrap mt">
        <a class="btn btn-ghost" href="#/account/orders/${order.id}">${icon("package-check")} ${t("acc.trackOrder")}</a>
        <a class="btn btn-primary" href="#/products">${icon("cart")} ${t("cart.goShopping")}</a>
      </div>
      <div class="divider"></div>
      <div class="t-start">${timelineHtml(order)}</div>
    </div>`;
}
function mount6(root) {
  applyDyn(root);
  return null;
}
var title5;
var init_checkout_done = __esm({
  "public/js/views/checkout-done.mjs"() {
    init_dom();
    init_i18n();
    init_api();
    init_state();
    init_components();
    title5 = () => t("checkout.successTitle");
  }
});

// public/js/views/pay.mjs
var pay_exports = {};
__export(pay_exports, {
  mount: () => mount7,
  render: () => render7,
  title: () => title6
});
async function render7(ctx) {
  const id = ctx.params.id;
  let order = null;
  try {
    const r = await api.get(`/api/me/orders/${encodeURIComponent(id)}`);
    order = r.order;
  } catch {
  }
  if (!order) return emptyState({ icon: "alert", title: t("err.notFound"), action: { href: "#/account/orders", label: t("acc.orders") } });
  if (order.payment?.status === "paid") {
    return html`<div class="card t-center">
      <span class="empty-ic">${icon("check-circle")}</span>
      <h2 class="mt-s">${t("checkout.paymentSuccess")}</h2>
      <a class="btn btn-primary mt" href="#/checkout/done/${order.id}">${t("acc.trackOrder")}</a>
    </div>`;
  }
  const payable = order.payable ?? order.total;
  const isInstallment = ["snapppay", "azki", "digipay"].includes(order.payment?.method);
  let providerName = "";
  if (order.payment?.method === "snapppay") providerName = "\u0627\u0633\u0646\u067E\u200C\u067E\u06CC";
  else if (order.payment?.method === "azki") providerName = "\u0627\u0632\u06A9\u06CC\u200C\u0648\u0627\u0645";
  else if (order.payment?.method === "digipay") providerName = "\u062F\u06CC\u062C\u06CC\u200C\u067E\u06CC";
  return html`
    <div class="card" >
      <div class="t-center">
        <span class="pwa-ic center" data-h="64px" data-w="64px">${icon("card")}</span>
        <h1 class="mt-s">${isInstallment ? "\u067E\u0631\u062F\u0627\u062E\u062A \u0627\u0642\u0633\u0627\u0637\u06CC \u0627\u0632 \u0637\u0631\u06CC\u0642 " + providerName : t("common.payment")}</h1>
        <p class="muted">${t("acc.orderCode")}: <span class="mono b">${order.code}</span></p>
        <div class="buy-price center"><span class="buy-now">${fmtMoney(payable)}</span></div>
        
        ${isInstallment ? html`
          <div class="alert info text-right mb-4 mt-3">
            <strong>${icon("info")} شبیه‌ساز درگاه اقساطی (${providerName})</strong>
            <p class="mt-2 text-sm">در محیط واقعی، کاربر به درگاه ${providerName} منتقل شده و پس از اعتبارسنجی و کسر قسط اول (یا تایید اعتبار)، به سایت بازمی‌گردد.</p>
          </div>
        ` : html`
          <p class="notice notice-warn">${icon("info")}<span>${t("checkout.gatewayDemo")}</span></p>
        `}
        
        <div class="row center mt">
          <button class="btn btn-success btn-lg" data-act="pay-sim" data-id="${order.id}" data-ok="1">${icon("check")} ${t("checkout.simulateSuccess")}</button>
          <button class="btn btn-danger btn-lg" data-act="pay-sim" data-id="${order.id}" data-ok="0">${icon("close")} ${t("checkout.simulateFail")}</button>
        </div>
        <div class="divider"></div>
        <div class="row row-between small muted">
          <span>${t("acc.orderDate")}: ${order.createdAt}</span>
          <span>${t("common.items")}: ${fmtNum(order.items?.length || 0)}</span>
        </div>
      </div>
    </div>`;
  ;
}
function mount7(root) {
  applyDyn(root);
  return null;
}
var title6;
var init_pay = __esm({
  "public/js/views/pay.mjs"() {
    init_dom();
    init_i18n();
    init_api();
    init_state();
    init_components();
    init_ui();
    init_router();
    init_actions();
    act("pay-sim", async (e, el2) => {
      const ok = el2.dataset.ok === "1";
      await withBusy(el2, async () => {
        try {
          const r = await api.post(`/api/payments/simulate/${el2.dataset.id}`, { success: ok });
          await refreshMe();
          await loadCart();
          if (ok) {
            toastSuccess(t("checkout.paymentSuccess"));
            navigate(`#/checkout/done/${el2.dataset.id}`);
          } else {
            toastApiError({ code: "payment_failed", message: t("checkout.paymentFailed"), details: "Payment failed" });
            navigate("#/account/orders");
          }
        } catch (err) {
          toastApiError(err);
        }
      });
    });
    title6 = () => t("common.payment");
  }
});

// public/js/views/compare.mjs
var compare_exports = {};
__export(compare_exports, {
  mount: () => mount8,
  render: () => render8,
  title: () => title7
});
async function render8() {
  const ids = S.compare.slice(0, 4);
  if (!ids.length) return emptyState({ icon: "scale", title: t("compare.empty"), text: t("compare.emptyText"), action: { href: "#/products", label: t("cart.goShopping") } });
  const items = (await Promise.all(ids.map((id) => api.get(`/api/products/${encodeURIComponent(id)}`).catch(() => null)))).filter(Boolean).map((r) => r.product);
  if (!items.length) return emptyState({ icon: "scale", title: t("compare.empty") });
  const specKeys = [...new Set(items.flatMap((p) => Object.keys(p.specs || {})))];
  const row = (label, cells) => html`<tr><th class="t-start">${label}</th>${cells.map((c) => html`<td>${c}</td>`)}</tr>`;
  return html`
    <div class="section-head"><div><h1 class="section-title">${icon("scale")} ${t("compare.title")}</h1>
    <p class="section-sub">${fmtNum(items.length)} / 4</p></div></div>
    <div class="table-wrap">
      <table class="table">
        <thead><tr><th class="t-start">${t("common.product")}</th>${items.map((p) => html`<th>
          <div class="col center">
            <a href="#/product/${p.id}">${p.images?.[0] ? html`<img class="table-img" src="${p.images[0]}" alt="${prodName(p)}" data-glyph="${p.glyph}">` : icon(p.glyph)}</a>
            <span class="small">${prodName(p)}</span>
            <button type="button" class="link-btn" data-act="compare-toggle" data-id="${p.id}">${icon("trash")} ${t("compare.remove")}</button>
          </div></th>`)}</tr></thead>
        <tbody>
          ${row(t("common.price"), items.map((p) => raw(fmtMoney(p.price))))}
          ${row(t("common.brand"), items.map((p) => isFa2() ? p.brandName : p.brandNameEn || p.brandName || "\u2014"))}
          ${row(t("common.stock"), items.map((p) => p.stock > 0 ? html`<span class="badge-pill bp-success">${fmtNum(p.stock)}</span>` : html`<span class="badge-pill bp-danger">${t("card.outOfStock")}</span>`))}
          ${row(t("common.rating"), items.map((p) => p.ratingCount ? html`${stars(p.ratingAvg)} ${fmtNum(p.ratingAvg)}` : "\u2014"))}
          ${row(t("adm.pAuth"), items.map((p) => t(`auth.${p.authenticity || "generic"}`)))}
          ${row(t("pdp.warranty"), items.map((p) => p.warrantyMonths ? t("pdp.warrantyMonths", { n: fmtNum(p.warrantyMonths) }) : t("pdp.noWarranty")))}
          ${row(t("pdp.weight"), items.map((p) => p.weight ? `${fmtNum(p.weight)} ${t("pdp.gram")}` : "\u2014"))}
          ${specKeys.map((k) => row(k, items.map((p) => p.specs?.[k] || "\u2014")))}
          ${row("", items.map((p) => html`<button type="button" class="btn btn-primary btn-sm" data-act="add-cart" data-id="${p.id}" ${p.stock <= 0 ? "disabled" : ""}>${icon("cart")} ${t("card.addToCart")}</button>`))}
        </tbody>
      </table>
    </div>`;
}
function mount8(root) {
  applyDyn(root);
  return null;
}
var title7;
var init_compare = __esm({
  "public/js/views/compare.mjs"() {
    init_dom();
    init_i18n();
    init_api();
    init_state();
    init_components();
    title7 = () => t("compare.title");
  }
});

// public/js/views/lottery.mjs
var lottery_exports = {};
__export(lottery_exports, {
  render: () => render9,
  title: () => title8
});
async function render9() {
  let r = null;
  try {
    r = await api.get("/api/lotteries");
  } catch (err) {
    return errorState({ title: err?.message || t("err.generic") });
  }
  const active = (r.items || []).filter((x) => x.status === "active");
  const done = (r.items || []).filter((x) => x.status !== "active");
  if (!active.length) {
    return html`
      <div class="card lot-soon">
        <span class="lot-ic">${icon("gift2")}</span>
        <h1 class="buy-title">${t("lot.title")}</h1>
        <p class="muted mt-s">${t("lot.soon")}</p>
        ${done.length ? html`<div class="mt">
          <h2 class="section-title small">${icon("history")} ${t("lot.done")}</h2>
          ${done.slice(0, 5).map((l) => html`
            <div class="notif-item lv-success mt-s">
              <strong class="tiny">${esc(l.title)}</strong>
              <p class="tiny muted mt-s">${t("lot.winners")}: ${(l.winners || []).map((w) => esc(w)).join("\u060C ") || "\u2014"}</p>
            </div>`)}
        </div>` : ""}
      </div>`;
  }
  return html`
    <h1 class="section-title mb">${icon("gift2")} ${t("lot.title")}</h1>
    <div class="cart-grid">
      ${active.map((l) => html`
        <div class="card">
          <div class="row row-between"><strong>${icon("sparkles")} ${esc(l.title)}</strong><span class="badge-pill bp-accent">${t("lot.active")}</span></div>
          <p class="mt-s">${t("lot.prize")}: <b>${esc(l.prize)}</b></p>
          <p class="muted small">${t("lot.ends")}: ${fmtDate(l.endsAt)} · ${t("lot.entries")}: ${fmtNum(l.entries || 0)}</p>
          ${l.myEntry ? html`<div class="notice notice-success mt-s">${icon("check")} ${t("lot.joined")}</div>` : l.entryMode === "manual" ? html`<button class="btn btn-primary mt-s" data-act="lot-join" data-id="${l.id}">${icon("gift2")} ${t("lot.join")}</button>` : html`<p class="hint mt-s">${t("lot.autoEntry")}</p>`}
        </div>`)}
      ${done.slice(0, 6).map((l) => html`
        <div class="card">
          <div class="row row-between"><strong>${esc(l.title)}</strong><span class="badge-pill bp-success">${t("lot.done")}</span></div>
          <p class="tiny muted mt-s">${t("lot.winners")}: ${(l.winners || []).map((w) => esc(w)).join("\u060C ") || "\u2014"}</p>
        </div>`)}
    </div>`;
}
var title8;
var init_lottery = __esm({
  "public/js/views/lottery.mjs"() {
    init_dom();
    init_i18n();
    init_api();
    init_ui();
    init_actions();
    init_state();
    act("lot-join", async (e, el2) => {
      if (!S.me) {
        toastError2(t("nav.login"));
        return;
      }
      await withBusy(el2, async () => {
        try {
          await api.post(`/api/lotteries/${el2.dataset.id}/join`, {});
          toastSuccess(t("lot.joinDone"));
          Promise.resolve().then(() => (init_router(), router_exports)).then((m) => m.refresh(true));
        } catch (err) {
          toastApiError(err);
        }
      });
    });
    title8 = () => isFa2() ? "\u0642\u0631\u0639\u0647\u200C\u06A9\u0634\u06CC" : "Lottery";
  }
});

// public/js/views/price-check.mjs
var price_check_exports = {};
__export(price_check_exports, {
  mount: () => mount9,
  render: () => render10,
  title: () => title9
});
async function render10() {
  return html`
    <div class="section-head">
      <div><h1 class="section-title">${icon("barcode")} ${t("priceCheck.title")}</h1>
      <p class="section-sub">${t("priceCheck.sub")}</p></div>
      <button type="button" class="btn btn-ghost" data-act="pc-fullscreen">${icon("external")} ${t("priceCheck.fullscreen")}</button>
    </div>

    <div class="cart-grid">
      <div class="col">
        <div class="card scan-view">
          <form class="row" data-act="pc-lookup" >
            <input class="input" name="code" placeholder="${t("priceCheck.input")}" data-autofocus autocomplete="off" inputmode="numeric">
            <button class="btn btn-primary" type="submit">${icon("search")} ${t("common.search")}</button>
          </form>
          <div class="row row-wrap center">
            <button type="button" class="btn btn-ghost" data-act="pc-camera">${icon("camera")} ${t("priceCheck.scanCamera")}</button>
            <button type="button" class="btn btn-ghost" hidden data-act="pc-camera-stop">${icon("close")} ${t("priceCheck.stopCamera")}</button>
          </div>
          <div class="scan-frame" data-frame hidden>
            <video playsinline muted></video>
            <span class="scan-line"></span>
            <span class="scan-corner" ></span>
          </div>
          <p class="hint">${t("adm.bScanHint")}</p>
          <input class="pc-wedge" data-wedge autocomplete="off" aria-label="${t("priceCheck.input")}" placeholder="${t("priceCheck.waiting")}">
        </div>
        <div class="card" data-history>
          <strong class="row mb-s">${icon("history")} ${t("priceCheck.lastScan")}</strong>
          <div class="col" data-hlist><p class="muted small">${t("common.noData")}</p></div>
        </div>
      </div>
      <aside class="card price-display" data-result>
        <span class="empty-ic">${icon("barcode")}</span>
        <p class="muted">${t("priceCheck.waiting")}</p>
      </aside>
    </div>`;
}
function showResult(box, p, { error = "" } = {}) {
  if (error) {
    box.innerHTML = html`<span class="empty-ic danger">${icon("alert")}</span><h3>${error}</h3>`;
    return;
  }
  box.innerHTML = html`
    ${p.images?.[0] ? html`<img class="pc-result-img" src="${p.images[0]}" alt="${prodName(p)}" data-glyph="${p.glyph}">` : icon(p.glyph || "box")}
    <h2 class="mt-s">${prodName(p)}</h2>
    <p class="muted small">${p.brandName || ""} ${p.sku ? `\xB7 ${p.sku}` : ""}</p>
    <div class="big">${fmtMoney(p.price, { withUnit: false })}</div>
    <div class="cur">${t("common.toman")}</div>
    ${p.oldPrice > p.price ? html`<p class="pc-old">${fmtMoney(p.oldPrice)}</p>` : ""}
    <div class="mt-s">${p.stock > 0 ? html`<span class="badge-pill bp-success">${t("pdp.stockCount", { n: fmtNum(p.stock) })}</span>` : html`<span class="badge-pill bp-danger">${t("card.outOfStock")}</span>`}</div>
    <a class="btn btn-primary mt" href="#/product/${p.id}">${t("common.details")} ${icon("chevron-left")}</a>`;
}
async function lookup(code, root) {
  const box = root.querySelector("[data-result]");
  try {
    const r = await api.post("/api/scan", { code: String(code).trim() });
    if (r.found && r.product) {
      showResult(box, r.product);
      pushHistory(root, r.product);
      return r.product;
    }
    showResult(box, null, { error: t("priceCheck.notFound") });
  } catch (err) {
    if (err?.status === 404) showResult(box, null, { error: t("priceCheck.notFound") });
    else showResult(box, null, { error: t("err.generic") });
  }
  return null;
}
function pushHistory(root, p) {
  history2.unshift({ id: p.id, name: prodName(p), price: p.price, at: (/* @__PURE__ */ new Date()).toISOString() });
  if (history2.length > 8) history2.pop();
  const list5 = root.querySelector("[data-hlist]");
  if (list5) list5.innerHTML = history2.map((x) => html`<div class="row row-between small"><span class="nowrap">${x.name}</span><span class="b">${fmtNum(x.price)}</span></div>`).join("");
}
function mount9(root) {
  applyDyn(root);
  document.body.classList.add("kiosk-page");
  const wedge = root.querySelector("[data-wedge]");
  let buf = "";
  let lastKey = 0;
  wedge.addEventListener("keydown", (e) => {
    const now = Date.now();
    if (now - lastKey > 120) buf = "";
    lastKey = now;
    if (e.key === "Enter") {
      e.preventDefault();
      const code = buf.trim();
      buf = "";
      if (code) lookup(code, root);
      return;
    }
    if (e.key.length === 1) buf += e.key;
  });
  wedge.focus();
  act("pc-lookup", (e, form) => {
    e.preventDefault();
    lookup(form.querySelector("[name=code]").value, root);
  });
  act("pc-fullscreen", () => {
    if (document.fullscreenElement) document.exitFullscreen().catch(() => {
    });
    else document.documentElement.requestFullscreen?.().catch(() => toast(t("misc.printBlocked")));
  });
  act("pc-camera", async (e, el2) => {
    const frame = root.querySelector("[data-frame]");
    const video = frame.querySelector("video");
    if (!("BarcodeDetector" in window) && !navigator.mediaDevices?.getUserMedia) {
      toastError2(t("priceCheck.cameraUnsupported"));
      return;
    }
    try {
      stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
      video.srcObject = stream;
      await video.play();
      frame.hidden = false;
      el2.hidden = true;
      root.querySelector('[data-act="pc-camera-stop"]').hidden = false;
      if ("BarcodeDetector" in window) {
        detector = new window.BarcodeDetector({ formats: ["ean_13", "ean_8", "code_128", "code_39", "upc_a", "upc_e"] });
        const tick = async () => {
          if (!stream) return;
          try {
            const codes = await detector.detect(video);
            if (codes?.length) {
              const v = codes[0].rawValue;
              lookup(v, root);
              const input = root.querySelector("[name=code]");
              if (input) input.value = v;
            }
          } catch {
          }
          raf = setTimeout(tick, 700);
        };
        tick();
      }
    } catch {
      toastError2(t("priceCheck.cameraDenied"));
    }
  });
  act("pc-camera-stop", (e, el2) => {
    stopCamera(root);
    el2.hidden = true;
    root.querySelector('[data-act="pc-camera"]').hidden = false;
  });
  return () => {
    stopCamera(root);
    document.body.classList.remove("kiosk-page");
  };
}
function stopCamera(root) {
  clearTimeout(raf);
  if (stream) {
    for (const tr of stream.getTracks()) tr.stop();
    stream = null;
  }
  const frame = root?.querySelector("[data-frame]");
  if (frame) frame.hidden = true;
}
var stream, detector, raf, history2, title9;
var init_price_check = __esm({
  "public/js/views/price-check.mjs"() {
    init_dom();
    init_i18n();
    init_api();
    init_state();
    init_ui();
    init_actions();
    stream = null;
    detector = null;
    raf = 0;
    history2 = [];
    title9 = () => t("priceCheck.title");
  }
});

// public/js/views/auth.mjs
var auth_exports = {};
__export(auth_exports, {
  mount: () => mount10,
  render: () => render11,
  title: () => title10
});
async function gateCaptcha(form) {
  const box = form?.querySelector?.("[data-captcha]");
  if (!box || box.hidden) return true;
  if (box.dataset.verifying) {
    await new Promise((r) => {
      const t0 = Date.now();
      const iv = setInterval(() => {
        if (!box.dataset.verifying || Date.now() - t0 > 2500) {
          clearInterval(iv);
          r();
        }
      }, 60);
    });
  }
  if (String(box.querySelector("[data-ctok]")?.value || "").trim()) return true;
  const cb = box.querySelector("[name=captchaBox]");
  const ch = box.querySelector("[data-cch]");
  if (cb) cb.checked = true;
  if (ch) ch.hidden = false;
  if (!box.dataset.cid) loadCaptcha(box);
  box.querySelector("[name=captchaAnswer]")?.focus();
  toast(t("captcha.required"), { type: "error", timeout: 4500 });
  return false;
}
function afterAuth(next) {
  const dest = next && !next.startsWith("auth") ? `#/${next.replace(/^#|^\/|#$/g, "")}` : "#/";
  refreshBootstrap().then(() => loadCart()).then(() => mergeGuestData()).then(() => navigate(dest));
}
async function render11(ctx) {
  const next = ctx.query.get("next") || "";
  const ref = ctx.query.get("ref") || "";
  const isRegister = ctx.params.mode === "register" || !!ref;
  const isForgot = ctx.params.mode === "forgot";
  return html`
    <div class="auth-wrap">
      <div class="card auth-card">
        <div class="t-center mb">
          <span class="pwa-ic center" data-h="56px" data-w="56px">${icon("user")}</span>
          <h1 class="mt-s" data-title>${isRegister ? t("auth.registerTitle") : isForgot ? t("auth.recoveryTitle") : t("auth.loginTitle")}</h1>
        </div>

        <div class="tabs" data-auth-tabs role="tablist">
          <button type="button" class="tab ${!isRegister && !isForgot ? "active" : ""}" data-at="login" role="tab">${t("common.login")}</button>
          <button type="button" class="tab ${isRegister ? "active" : ""}" data-at="register" role="tab">${t("common.register")}</button>
          <button type="button" class="tab ${isForgot ? "active" : ""}" data-at="forgot" role="tab">${t("auth.forgot")}</button>
        </div>

        <!-- ورود -->
        <div class="tab-panel" data-ap="login" ${isRegister || isForgot ? "hidden" : ""}>
          <div class="btn-group mb" data-method>
            <button type="button" class="btn active" data-m="password">${t("auth.methodPassword")}</button>
            <button type="button" class="btn" data-m="phone">${t("auth.methodPhone")}</button>
            <button type="button" class="btn" data-m="email">${t("auth.methodEmail")}</button>
          </div>

          <form data-act="login-pass" data-apf="password">
            ${field2({ label: t("auth.identifier"), name: "identifier", required: true, autocomplete: "username" })}
            ${field2({ label: t("common.password"), name: "password", type: "password", required: true, hint: t("auth.passwordRules"), autocomplete: "new-password" })}
            <div class="row row-between mt-s gap-2">
              <span class="grow">${field2({ label: "\u06A9\u062F \u0645\u0639\u0631\u0641 (\u0627\u062E\u062A\u06CC\u0627\u0631\u06CC)", name: "referralCode", placeholder: "\u0645\u062B\u0644\u0627\u064B Z8A4X" })}</span>
              <span class="grow">
                <label class="field">
                  <span class="label">نحوه آشنایی</span>
                  <select class="input" name="hearAboutUs">
                    <option value="">(انتخاب کنید)</option>
                    <option value="google">جستجوی گوگل</option>
                    <option value="instagram">اینستاگرام</option>
                    <option value="telegram">تلگرام</option>
                    <option value="friend">معرفی دوستان</option>
                    <option value="other">سایر</option>
                  </select>
                </label>
              </span>
            </div>
            <div class="mb">${checkField({ label: html`${t("auth.acceptTerms")} <a class="section-link" href="#/pages/terms">${t("consent.readTerms")}</a>`, name: "acceptTerms", checked: true })}</div>
            ${captchaField()}
            <button class="btn btn-primary btn-block" type="submit">${icon("user")} ${t("common.register")}</button>
          </form>
        </div>

        <!-- بازیابی -->
        <div class="tab-panel" data-ap="forgot" ${!isForgot ? "hidden" : ""}>
          <p class="muted small mb">${t("auth.recoveryText")}</p>
          <form data-act="forgot-send">
            <div class="btn-group mb" data-fch>
              <button type="button" class="btn active" data-m="phone">${t("auth.methodPhone")}</button>
              <button type="button" class="btn" data-m="email">${t("auth.methodEmail")}</button>
            </div>
            ${field2({ label: t("common.phone"), name: "target", type: "tel", required: true, placeholder: "09xxxxxxxxx" })}
            ${captchaField()}
            <button class="btn btn-primary btn-block" type="submit">${icon("send")} ${t("auth.sendCode")}</button>
          </form>
          <form data-act="forgot-reset" hidden>
            <p class="notice notice-info mb">${icon("mail")}<span data-fsent></span></p>
            <p class="notice notice-warn mb" data-fdemo hidden>${icon("info")}<span></span></p>
            ${field2({ label: t("auth.otpCode"), name: "code", required: true, attrs: 'inputmode="numeric" maxlength="6"' })}
            ${field2({ label: t("auth.newPassword"), name: "password", type: "password", required: true, hint: t("auth.passwordRules"), autocomplete: "new-password" })}
            <button class="btn btn-primary btn-block" type="submit">${icon("key")} ${t("common.save")}</button>
          </form>
        </div>
      </div>
    </div>`;
}
function mount10(root, ctx) {
  applyDyn(root);
  root.querySelectorAll("[data-captcha]").forEach((b) => loadCaptcha(b));
  const next = ctx.query.get("next") || "";
  const refCode = ctx.query.get("ref") || "";
  if (refCode) {
    const refInput = root.querySelector("[name=referralCode]");
    if (refInput) {
      refInput.value = refCode;
      setTimeout(() => root.querySelector('[data-at="register"]')?.click(), 50);
    }
  }
  const panels = { login: root.querySelector('[data-ap="login"]'), register: root.querySelector('[data-ap="register"]'), forgot: root.querySelector('[data-ap="forgot"]') };
  root.querySelectorAll("[data-at]").forEach((b) => b.addEventListener("click", () => {
    root.querySelectorAll("[data-at]").forEach((x) => x.classList.toggle("active", x === b));
    for (const [k, el2] of Object.entries(panels)) el2.hidden = k !== b.dataset.at;
  }));
  root.querySelectorAll("[data-goto]").forEach((b) => b.addEventListener("click", () => root.querySelector(`[data-at="${b.dataset.goto}"]`).click()));
  const methodBox = root.querySelector("[data-method]");
  methodBox.addEventListener("click", (e) => {
    const b = e.target.closest("[data-m]");
    if (!b) return;
    methodBox.querySelectorAll("[data-m]").forEach((x) => x.classList.toggle("active", x === b));
    const m = b.dataset.m;
    panels.login.querySelectorAll("[data-apf]").forEach((f) => {
      f.hidden = f.dataset.apf !== m;
    });
  });
  const regBox = root.querySelector("[data-regmode]");
  regBox.addEventListener("click", (e) => {
    const b = e.target.closest("[data-m]");
    if (!b) return;
    regBox.querySelectorAll("[data-m]").forEach((x) => x.classList.toggle("active", x === b));
    state.regMode = b.dataset.m;
    root.querySelector("[data-reg-username]").hidden = state.regMode !== "username";
    root.querySelector("[data-reg-extra]").hidden = state.regMode !== "username";
    root.querySelector("[data-reg-target-phone]").hidden = state.regMode !== "phone";
    root.querySelector("[data-reg-target-email]").hidden = state.regMode !== "email";
    root.querySelector("[data-reg-code]").hidden = state.regMode === "username";
  });
  root.querySelector("[data-reg-send]").addEventListener("click", async (e) => {
    const form = root.querySelector('[data-act="register"]');
    const channel = state.regMode === "phone" ? "phone" : "email";
    const target = channel === "phone" ? form.querySelector("[name=phoneTarget]").value : form.querySelector("[name=emailTarget]").value;
    try {
      const r = await api.post("/api/auth/otp/send", { channel, target, purpose: "register", captchaToken: form.querySelector("[data-ctok]")?.value || void 0 });
      state.demoCode = r.demoCode || "";
      const demo = root.querySelector("[data-reg-demo]");
      demo.hidden = !r.demoCode;
      if (r.demoCode) demo.querySelector("span").textContent = t("auth.demoCode", { code: r.demoCode });
      toastSuccess(t("auth.codeSentTo", { target: r.target }));
      startResend(root, "[data-reg-send]");
    } catch (err) {
      if (err?.code === "captcha_required") refreshCaptchaIn(form);
      toastApiError(err);
    }
  });
  act("login-pass", async (e, form) => {
    e.preventDefault();
    clearInvalid(form);
    if (!await gateCaptcha(form)) return;
    const fd = new FormData(form);
    await withBusy(form.querySelector("button[type=submit]"), async () => {
      try {
        const r = await api.post("/api/auth/login", { identifier: fd.get("identifier"), password: fd.get("password"), remember: fd.get("remember") === "on", captchaToken: fd.get("captchaToken") || void 0 });
        if (r.twoFactor) {
          state.challenge = r.challengeToken;
          state.methods = r.methods || ["totp"];
          state.sent = r.sent || null;
          show2fa(root, r);
        } else {
          S.me = r.me;
          toastSuccess(t("auth.loginDone"));
          afterAuth(next);
        }
      } catch (err) {
        if (err?.code === "captcha_required" || err?.details?.captchaRequired) refreshCaptchaIn(form);
        toastApiError(err);
      }
    });
  });
  act("otp-send", async (e, form) => {
    e.preventDefault();
    if (!await gateCaptcha(form)) return;
    const fd = new FormData(form);
    const channel = form.dataset.apf === "email" ? "email" : "phone";
    state.channel = channel;
    state.target = String(fd.get("target") || "").trim();
    await withBusy(form.querySelector("button[type=submit]"), async () => {
      try {
        const r = await api.post("/api/auth/otp/send", { channel, target: state.target, purpose: "login", captchaToken: fd.get("captchaToken") || void 0 });
        state.demoCode = r.demoCode || "";
        const codeForm = panels.login.querySelector('[data-apf="code"]');
        panels.login.querySelectorAll("[data-apf]").forEach((f) => {
          f.hidden = f !== codeForm;
        });
        codeForm.querySelector("[data-sentto]").textContent = t("auth.codeSentTo", { target: r.target });
        const demo = codeForm.querySelector("[data-democode]");
        demo.hidden = !r.demoCode;
        if (r.demoCode) demo.querySelector("span").textContent = t("auth.demoCode", { code: r.demoCode });
        toastSuccess(t("auth.codeSent"));
        startResend(root, "[data-resend]");
        codeForm.querySelector("[name=code]").focus();
      } catch (err) {
        if (err?.code === "captcha_required") refreshCaptchaIn(form);
        toastApiError(err);
      }
    });
  });
  act("otp-login", async (e, form) => {
    e.preventDefault();
    const fd = new FormData(form);
    await withBusy(form.querySelector("button[type=submit]"), async () => {
      try {
        const r = await api.post("/api/auth/login/otp", { channel: state.channel, target: state.target, code: fd.get("code") });
        if (r.twoFactor) {
          state.challenge = r.challengeToken;
          state.methods = r.methods || ["totp"];
          show2fa(root, r);
          return;
        }
        S.me = r.me;
        toastSuccess(t("auth.loginDone"));
        afterAuth(next);
      } catch (err) {
        toastApiError(err);
      }
    });
  });
  root.querySelector("[data-resend]")?.addEventListener("click", async () => {
    try {
      const r = await api.post("/api/auth/otp/send", { channel: state.channel, target: state.target, purpose: "login" });
      state.demoCode = r.demoCode || "";
      const demo = panels.login.querySelector("[data-democode]");
      demo.hidden = !r.demoCode;
      if (r.demoCode) demo.querySelector("span").textContent = t("auth.demoCode", { code: r.demoCode });
      toastSuccess(t("auth.codeSent"));
      startResend(root, "[data-resend]");
    } catch (err) {
      toastApiError(err);
    }
  });
  act("login-2fa", async (e, form) => {
    e.preventDefault();
    const fd = new FormData(form);
    const type = form.querySelector("[data-2fam].active")?.dataset["2fam"] || "totp";
    await withBusy(form.querySelector("button[type=submit]"), async () => {
      try {
        const r = await api.post("/api/auth/login/2fa", { challengeToken: state.challenge, code: fd.get("code"), type });
        S.me = r.me;
        toastSuccess(t("auth.loginDone"));
        afterAuth(next);
      } catch (err) {
        toastApiError(err);
      }
    });
  });
  act("register", async (e, form) => {
    e.preventDefault();
    clearInvalid(form);
    if (!await gateCaptcha(form)) return;
    const fd = new FormData(form);
    const payload = {
      mode: state.regMode,
      name: fd.get("name"),
      password: fd.get("password"),
      acceptTerms: fd.get("acceptTerms") === "on",
      referralCode: fd.get("referralCode") || "",
      hearAboutUs: fd.get("hearAboutUs") || "",
      captchaToken: fd.get("captchaToken") || void 0
    };
    if (state.regMode === "username") {
      payload.username = fd.get("username");
      payload.phone = fd.get("phone") || "";
      payload.email = fd.get("email") || "";
    } else if (state.regMode === "phone") {
      payload.target = fd.get("phoneTarget");
      payload.code = fd.get("code");
      payload.email = fd.get("email") || "";
    } else {
      payload.target = fd.get("emailTarget");
      payload.code = fd.get("code");
      payload.phone = fd.get("phone") || "";
    }
    await withBusy(form.querySelector("button[type=submit]"), async () => {
      try {
        const r = await api.post("/api/auth/register", payload);
        S.me = r.me;
        toastSuccess(t("auth.registerDone"));
        afterAuth(next || "");
      } catch (err) {
        if (err?.code === "captcha_required") refreshCaptchaIn(form);
        toastApiError(err);
      }
    });
  });
  act("forgot-send", async (e, form) => {
    e.preventDefault();
    if (!await gateCaptcha(form)) return;
    const fd = new FormData(form);
    const channel = form.querySelector("[data-fch] .active").dataset.m;
    state.channel = channel;
    state.target = String(fd.get("target") || "").trim();
    await withBusy(form.querySelector("button[type=submit]"), async () => {
      try {
        const r = await api.post("/api/auth/password/forgot", { channel, target: state.target, captchaToken: fd.get("captchaToken") || void 0 });
        const rf = panels.forgot.querySelector('[data-act="forgot-reset"]');
        panels.forgot.querySelector('[data-act="forgot-send"]').hidden = true;
        rf.hidden = false;
        rf.querySelector("[data-fsent]").textContent = t("auth.codeSentTo", { target: r.target });
        const demo = rf.querySelector("[data-fdemo]");
        demo.hidden = !r.demoCode;
        if (r.demoCode) demo.querySelector("span").textContent = t("auth.demoCode", { code: r.demoCode });
        toastSuccess(t("auth.codeSent"));
      } catch (err) {
        if (err?.code === "captcha_required") refreshCaptchaIn(form);
        toastApiError(err);
      }
    });
  });
  act("forgot-reset", async (e, form) => {
    e.preventDefault();
    const fd = new FormData(form);
    await withBusy(form.querySelector("button[type=submit]"), async () => {
      try {
        const r = await api.post("/api/auth/password/reset", { channel: state.channel, target: state.target, code: fd.get("code"), password: fd.get("password") });
        S.me = r.me;
        toastSuccess(t("auth.resetDone"));
        afterAuth("");
      } catch (err) {
        toastApiError(err);
      }
    });
  });
  return null;
}
function show2fa(root, r) {
  const panel = root.querySelector('[data-ap="login"]');
  panel.querySelectorAll("[data-apf]").forEach((f) => {
    f.hidden = f.dataset.apf !== "2fa";
  });
  const form = panel.querySelector('[data-act="login-2fa"]');
  const box = form.querySelector("[data-2fa-method]");
  const methods = state.methods;
  const labels = { totp: t("auth.2faTotp"), sms: t("auth.2faSms"), email: t("auth.2faEmail"), backup: t("auth.2faBackup") };
  box.innerHTML = methods.map((m, i) => html`<button type="button" class="btn ${i === 0 ? "active" : ""}" data-2fam="${m}">${labels[m] || m}</button>`).join("");
  box.addEventListener("click", (e) => {
    const b = e.target.closest("[data-2fam]");
    if (!b) return;
    box.querySelectorAll("[data-2fam]").forEach((x) => x.classList.toggle("active", x === b));
  });
  if (r.sent?.demoCode) toast(t("auth.demoCode", { code: r.sent.demoCode }), { title: t("auth.2faTitle"), timeout: 12e3 });
  form.querySelector("[name=code]").focus();
}
function startResend(root, sel) {
  let s = 60;
  const elx = root.querySelector(sel);
  const timer = setInterval(() => {
    s -= 1;
    if (elx) elx.textContent = s > 0 ? t("auth.resendIn", { s: fmtNum(s) }) : t("auth.resend");
    if (s <= 0) clearInterval(timer);
  }, 1e3);
}
var state, title10;
var init_auth = __esm({
  "public/js/views/auth.mjs"() {
    init_dom();
    init_i18n();
    init_api();
    init_state();
    init_components();
    init_ui();
    init_actions();
    init_router();
    state = { challenge: null, methods: [], sent: null, channel: "phone", target: "", demoCode: "", mode: "login", regMode: "username" };
    title10 = () => t("auth.title");
  }
});

// public/js/chat.mjs
async function loadThread() {
  const r = await api.get("/api/support/messages");
  return r.items || [];
}
function threadHtml(items) {
  if (!items.length) {
    return html`<div class="msg them">${t("acc.chatWelcome")}</div>`;
  }
  return items.map(msgHtml).join("");
}
function scrollThread(box) {
  requestAnimationFrame(() => {
    box.scrollTop = box.scrollHeight;
  });
}
async function sendChat(body) {
  const r = await api.post("/api/support/messages", { body });
  return r;
}
function openChat() {
  if (!feat2()) return;
  if (!S.me) {
    toast(t("chat.loginFirst"));
    location.hash = "#/auth?next=" + encodeURIComponent("account/support");
    return;
  }
  if (winEl) {
    closeChat();
    return;
  }
  const root = document.getElementById("chatRoot");
  winEl = el("div", { class: "chat-win", role: "dialog", "aria-label": t("chat.title") });
  winEl.innerHTML = html`
    <header class="chat-h">
      <span class="stat-ic" data-h="34px" data-w="34px">${icon("headset")}</span>
      <div class="grow">
        <div class="t">${t("chat.title")}</div>
        <div class="s"><span class="online-dot"></span>${t("chat.online")}</div>
      </div>
      <button type="button" class="icon-btn" data-cx aria-label="${t("chat.minimize")}">${icon("close")}</button>
    </header>
    <div class="chat-b" data-thread><div class="msg them">${t("common.loading")}</div></div>
    <form class="chat-f" data-act="chat-send">
      <input class="input" name="body" maxlength="1000" placeholder="${t("acc.chatPlaceholder")}" autocomplete="off">
      <button type="submit" class="btn btn-primary btn-icon" aria-label="${t("common.send")}">${icon("send")}</button>
    </form>`;
  root.appendChild(winEl);
  threadEl = winEl.querySelector("[data-thread]");
  winEl.querySelector("[data-cx]").addEventListener("click", closeChat);
  const ih = winEl.querySelector(".chat-h .stat-ic");
  if (ih) {
    ih.style.width = "34px";
    ih.style.height = "34px";
    ih.style.borderRadius = "11px";
  }
  loadThread().then((items) => {
    threadEl.innerHTML = threadHtml(items);
    scrollThread(threadEl);
  }).catch(() => {
    threadEl.innerHTML = html`<div class="msg them">${t("err.network")}</div>`;
  });
  winEl.querySelector("input[name=body]").focus();
}
function closeChat() {
  winEl?.remove();
  winEl = null;
  threadEl = null;
}
function appendLive(m) {
  const boxes = [];
  if (threadEl) boxes.push(threadEl);
  document.querySelectorAll("[data-thread-page]").forEach((n) => boxes.push(n));
  for (const box of boxes) {
    if (box.querySelector(`[data-id="${m.id}"]`)) continue;
    const first = box.querySelector(".msg");
    if (first && !first.dataset.id && box.children.length === 1 && first.classList.contains("them") && first.textContent === t("acc.chatWelcome")) box.innerHTML = "";
    box.insertAdjacentHTML("beforeend", msgHtml(m));
    scrollThread(box);
  }
}
function initChat() {
  document.getElementById("fabSupport")?.addEventListener("click", openChat);
  document.getElementById("btnSupportTop")?.addEventListener("click", openChat);
  on("sse:support", (d) => {
    if (!S.me || d?.userId !== S.me.id) return;
    loadThread().then((items) => {
      const m = items.find((x) => x.id === d.id);
      if (m && m.from === "staff") {
        if (chatOpen()) appendLive(m);
        else {
          unread += 1;
          updateFabDot();
          toast(m.body, { title: t("chat.title"), timeout: 6e3, action: { label: t("common.view"), onClick: openChat } });
        }
      }
      const page = document.querySelector("[data-thread-page]");
      if (page && !chatOpen()) {
        page.innerHTML = threadHtml(items);
        scrollThread(page);
      }
    }).catch(() => {
    });
  });
  on("me", () => updateFabDot());
}
function updateFabDot() {
  const fab = document.getElementById("fabSupport");
  if (!fab) return;
  let dot = fab.querySelector(".fab-dot");
  if (unread > 0) {
    if (!dot) {
      dot = el("span", { class: "fab-dot" });
      fab.appendChild(dot);
    }
  } else dot?.remove();
}
function clearChatUnread() {
  unread = 0;
  updateFabDot();
}
function feat2() {
  return S.settings?.features?.liveSupport !== false;
}
var winEl, threadEl, unread, msgHtml, chatOpen;
var init_chat = __esm({
  "public/js/chat.mjs"() {
    init_state();
    init_i18n();
    init_api();
    init_dom();
    init_ui();
    init_actions();
    winEl = null;
    threadEl = null;
    unread = 0;
    msgHtml = (m) => html`
  <div class="msg ${m.from === "user" ? "me" : "them"}" data-id="${m.id || ""}">
    ${esc(m.body)}
    <span class="tm">${timeAgo(m.at)}</span>
  </div>`;
    chatOpen = () => !!winEl;
    act("chat-open", () => openChat());
    act("chat-send", async (e, form) => {
      const input = form.querySelector("input[name=body], textarea[name=body]");
      const body = String(input?.value || "").trim();
      if (!body) return;
      input.value = "";
      const me = { id: "tmp", from: "user", body, at: (/* @__PURE__ */ new Date()).toISOString() };
      const boxes = [];
      if (threadEl) boxes.push(threadEl);
      document.querySelectorAll("[data-thread-page]").forEach((n) => boxes.push(n));
      for (const b of boxes) {
        b.insertAdjacentHTML("beforeend", msgHtml(me));
        scrollThread(b);
      }
      try {
        const r = await sendChat(body);
        const saved = r.message;
        toast(t("chat.sent"), { timeout: 1600 });
        for (const b of boxes) {
          const last = b.querySelector(".msg.me:not([data-id])");
          if (last) {
            last.dataset.id = saved.id;
            last.querySelector(".tm").textContent = timeAgo(saved.at);
          }
        }
        if (r.botMessage) {
          appendLive(r.botMessage);
        }
      } catch (err) {
        toastApiError(err);
        for (const b of boxes) b.lastElementChild?.remove();
        input.value = body;
      }
    });
  }
});

// public/js/views/account.mjs
var account_exports = {};
__export(account_exports, {
  mount: () => mount11,
  render: () => render12,
  title: () => title11
});
async function render12(ctx) {
  const sec = ctx.params.section || "";
  const nav = SECTIONS.filter((s) => !s.feat || feat(s.feat));
  const body = await sectionHtml(sec, ctx);
  return html`
    <div class="section-head"><div>
      <h1 class="section-title">${icon("user")} ${t("acc.title")}</h1>
      <p class="section-sub">${t("acc.hello", { name: esc(S.me?.name || S.me?.username || "") })} · ${t("acc.memberSince", { date: fmtDate(S.me?.createdAt, { time: false }) })}</p>
    </div></div>
    <div class="acc-grid">
      <aside class="acc-side">
        <div class="acc-user">
          <span class="av">${esc((S.me?.name || S.me?.username || "?").charAt(0))}</span>
          <div class="grow">
            <div class="b nowrap">${esc(S.me?.name || S.me?.username)}</div>
            <div class="tiny muted">${S.me?.role === "owner" ? t("common.admin") : S.me?.role === "staff" ? "\u06A9\u0627\u0631\u0645\u0646\u062F" : t("common.user")}</div>
          </div>
        </div>
        <nav class="acc-nav" aria-label="${t("acc.title")}">
          ${nav.map((s) => html`<a href="#/account${s.id ? `/${s.id}` : ""}" class="${s.id === sec ? "active" : ""}">${icon(s.icon)} ${s.label()}${s.id === "notifications" && S.unread ? html`<span class="cnt">${fmtNum(S.unread)}</span>` : ""}</a>`)}
        </nav>
      </aside>
      <div data-accbody>${body}</div>
    </div>`;
}
async function sectionHtml(sec, ctx) {
  switch (sec) {
    case "orders":
      return ordersHtml();
    case "wishlist":
      return wishlistHtml();
    case "wallet":
      return walletHtml();
    case "plus":
      return plusHtml();
    case "addresses":
      return addressesHtml();
    case "notifications":
      return notificationsHtml();
    case "tickets":
      return ticketsHtml();
    case "support":
      return supportHtml();
    case "reviews":
      return reviewsHtml();
    case "feedback":
      return feedbackHtml();
    case "referrals":
      return referralsHtml();
    case "profile":
      return profileHtml();
    case "kyc":
      return kycHtml();
    case "security":
      return securityHtml();
    case "prefs":
      return prefsHtml();
    case "data":
      return dataHtml();
    default:
      return dashboardHtml();
  }
}
async function dashboardHtml() {
  let orders = [];
  try {
    orders = (await api.get("/api/me/orders")).items || [];
  } catch {
  }
  const recent = orders.slice(0, 4);
  return html`
    <div class="stats-grid mb">
      <div class="stat-card"><span class="stat-ic">${icon("package-check")}</span><div><div class="stat-val">${fmtNum(orders.length)}</div><div class="stat-lbl">${t("acc.orders")}</div></div></div>
      ${feat("wallet") ? html`<div class="stat-card"><span class="stat-ic">${icon("wallet")}</span><div><div class="stat-val">${fmtNum(S.me?.wallet?.balance || 0)}</div><div class="stat-lbl">${t("common.balance")}</div></div></div>` : ""}
      <div class="stat-card"><span class="stat-ic">${icon("heart")}</span><div><div class="stat-val">${fmtNum(S.wishlist.length)}</div><div class="stat-lbl">${t("acc.wishlist")}</div></div></div>
      <div class="stat-card"><span class="stat-ic">${icon("gift")}</span><div><div class="stat-val">${fmtNum(S.me?.points || 0)}</div><div class="stat-lbl">${t("common.points")}</div></div></div>
    </div>
    ${(() => {
    const badges = S.me?.badges || [];
    const got = badges.filter((b) => b.got).length;
    if (!badges.length) return "";
    return html`<div class="card mb">
        <div class="row row-between"><strong>${icon("award")} ${t("acc.badges")}</strong><span class="muted tiny">${fmtNum(got)} / ${fmtNum(badges.length)}</span></div>
        <div class="badges-grid mt-s">
          ${badges.map((b) => html`
            <div class="badge-item ${b.got ? "got" : ""}" title="${t(`badge.${b.id}.d`)}">
              <span class="bi-ic">${icon(b.got ? "award" : "lock")}</span>
              <b>${t(`badge.${b.id}`)}</b>
              <span class="tiny muted">${b.got ? t("badge.got") : b.progress !== void 0 ? `${fmtNum(b.progress)}\xD7` : t("badge.locked")}</span>
            </div>`)}
        </div>
      </div>`;
  })()}
    ${isPlus() ? html`<div class="notice notice-success mb">${icon("sparkles")}<span>${t("acc.plusActive", { date: fmtDate(S.me?.plus?.until, { time: false }) })}</span></div>` : feat("plus") ? html`<div class="notice notice-info mb">${icon("sparkles")}<span>${t("acc.plusInactive")} — <a class="section-link" href="#/account/plus">${t("acc.plusSubscribe")}</a></span></div>` : ""}
    ${orders.length ? html`
      <div class="section-head"><div><h2 class="section-title">${icon("history")} ${t("acc.orders")}</h2></div><a class="section-link" href="#/account/orders">${t("common.showAll")}</a></div>
      ${orderRows(recent)}` : emptyState({ icon: "cart", title: t("acc.noOrders"), text: t("acc.noOrdersText"), action: { href: "#/products", label: t("cart.goShopping") } })}
    ${S.me?.referralCode && feat("referrals") ? html`
      <div class="card mt">
        <strong>${icon("gift")} ${t("acc.referralCode")}</strong>
        <div class="row mt-s">
          <code class="tag mono b" data-h="34px">${S.me.referralCode}</code>
          <button class="btn btn-ghost btn-sm" data-act="copy" data-text="${S.me.referralCode}">${icon("copy")} ${t("common.copy")}</button>
        </div>
        <p class="hint mt-s">${t("acc.referralText")}</p>
      </div>` : ""}`;
}
function orderRows(orders) {
  return tableHtml(
    [{ label: t("acc.orderCode") }, { label: t("acc.orderDate") }, { label: t("common.status") }, { label: t("acc.orderTotal"), cls: "num" }, { label: t("common.actions"), cls: "num" }],
    orders.map((o) => html`
      <tr>
        <td class="mono b">${o.code}</td>
        <td class="nowrap">${fmtDate(o.createdAt, { time: false })}</td>
        <td>${statusBadge(o.status)}</td>
        <td class="num">${fmtMoney(o.total)}</td>
        <td><div class="act"><a class="btn btn-ghost btn-xs" href="#/account/orders/${o.id}">${t("common.view")}</a></div></td>
      </tr>`)
  );
}
async function ordersHtml() {
  let items = [];
  try {
    items = (await api.get("/api/me/orders")).items || [];
  } catch {
  }
  if (!items.length) return emptyState({ icon: "package-check", title: t("acc.noOrders"), text: t("acc.noOrdersText"), action: { href: "#/products", label: t("cart.goShopping") } });
  return orderRows(items);
}
async function wishlistHtml() {
  if (!S.wishlist.length) return emptyState({ icon: "heart", title: t("acc.wishlistEmpty"), text: t("acc.wishlistEmptyText"), action: { href: "#/products", label: t("cart.goShopping") } });
  const r = await api.get("/api/products?limit=96").catch(() => null);
  const items = S.wishlist.map((id) => r?.items?.find((p) => p.id === id)).filter(Boolean);
  return productGrid(items);
}
async function walletHtml() {
  if (!feat("wallet")) return emptyState({ icon: "wallet", title: t("err.notFound") });
  let w = { balance: 0, transactions: [] };
  try {
    w = await api.get("/api/me/wallet");
  } catch {
  }
  return html`
    <div class="card mb">
      <div class="row row-between row-wrap">
        <div><div class="muted small">${t("common.balance")}</div><div class="buy-now">${fmtMoney(w.balance)}</div></div>
        <button class="btn btn-primary" data-act="wallet-deposit">${icon("plus")} ${t("acc.walletDeposit")}</button>
      </div>
      <p class="hint mt-s">${t("acc.walletNote")}</p>
    </div>
    ${tableHtml(
    [{ label: t("common.date") }, { label: t("common.type") }, { label: t("common.amount"), cls: "num" }, { label: t("common.note") }],
    (w.transactions || []).map((x) => html`
        <tr>
          <td class="nowrap">${fmtDate(x.at)}</td>
          <td><span class="badge-pill ${x.amount >= 0 ? "bp-success" : "bp-warn"}">${t(`acc.tx.${x.type}`) || x.type}</span></td>
          <td class="num b">${x.amount >= 0 ? "+" : ""}${fmtNum(x.amount)}</td>
          <td class="muted small">${esc(x.note || "")} ${x.ref ? html`<button class="link-btn mono" data-act="copy" data-text="${x.ref}">${x.ref}</button>` : ""}</td>
        </tr>`),
    { emptyText: t("acc.walletEmpty") }
  )}`;
}
function plusHtml() {
  if (!feat("plus")) return emptyState({ icon: "sparkles", title: t("err.notFound") });
  const p = plusCfg();
  const active = isPlus();
  return html`
    <div class="card mb t-center">
      <span class="pwa-ic center" data-h="60px" data-w="60px">${icon("sparkles")}</span>
      <h2 class="mt-s">${active ? t("acc.plusActive", { date: fmtDate(S.me?.plus?.until, { time: false }) }) : t("acc.plusInactive")}</h2>
      <p class="buy-price center"><span class="buy-now">${fmtMoney(p.price)}</span><span class="buy-cur">/ ${fmtNum(p.durationDays)} ${t("common.day")}</span></p>
      <div class="row center row-wrap">
        <button class="btn btn-primary" data-act="plus-buy" data-method="wallet" ${feat("wallet") ? "" : "hidden"}>${icon("wallet")} ${t("acc.plusPayWallet")}</button>
        <button class="btn btn-ghost" data-act="plus-buy" data-method="gateway">${icon("card")} ${t("acc.plusPayGateway")}</button>
      </div>
      <p class="hint mt-s">${t("checkout.gatewayDemo")}</p>
    </div>
    <div class="section-head"><div><h2 class="section-title">${icon("gift")} ${t("acc.plusPerks")}</h2></div></div>
    <div class="pwa-grid">
      ${(p.perks || []).map((perk) => html`<div class="pwa-card"><span class="pwa-ic">${icon("check")}</span><div>${isFa2() ? perk.fa : perk.en}</div></div>`)}
    </div>`;
}
function addressesHtml() {
  const list5 = S.me?.addresses || [];
  return html`
    <div class="row row-between mb">
      <strong>${t("acc.addresses")} (${fmtNum(list5.length)})</strong>
      <button class="btn btn-primary btn-sm" data-act="addr-new">${icon("plus")} ${t("acc.addAddress")}</button>
    </div>
    ${list5.length ? html`<div class="pwa-grid">${list5.map((a) => html`
      <div class="card">
        <div class="row row-between">
          <strong>${esc(a.title || "")}</strong>
          ${a.isDefault ? html`<span class="badge-pill bp-accent">${t("acc.addrDefault")}</span>` : ""}
        </div>
        <p class="muted small mt-s">${esc(a.receiver || "")} · ${fmtTel(a.phone || "")}<br>${esc(a.street || "")}${a.city ? `\u060C ${esc(a.city)}` : ""}${a.postal ? `<br>${t("common.postal")}: ${esc(a.postal)}` : ""}</p>
        ${a.note ? html`<p class="hint">${esc(a.note)}</p>` : ""}
        <div class="row mt-s">
          <button class="btn btn-ghost btn-xs" data-act="addr-edit" data-id="${a.id}">${icon("edit")} ${t("common.edit")}</button>
          <button class="btn btn-ghost btn-xs" data-act="addr-del" data-id="${a.id}">${icon("trash")} ${t("common.delete")}</button>
          ${!a.isDefault ? html`<button class="btn btn-ghost btn-xs" data-act="addr-default" data-id="${a.id}">${icon("check")} ${t("acc.addrDefault")}</button>` : ""}
        </div>
      </div>`)}</div>` : emptyState({ icon: "pin", title: t("acc.noAddress") })}`;
}
function addressForm(a = null) {
  return modal({
    title: a ? t("acc.editAddress") : t("acc.addAddress"),
    body: html`
      <form data-act="addr-save2" class="form-grid" data-id="${a?.id || ""}">
        ${field2({ label: t("acc.addrTitle"), name: "title", required: true, value: a?.title || "" })}
        ${field2({ label: t("acc.addrReceiver"), name: "receiver", required: true, value: a?.receiver || S.me?.name || "" })}
        ${field2({ label: t("acc.addrPhone"), name: "phone", type: "tel", required: true, value: a?.phone || S.me?.phone || "" })}
        ${field2({ label: t("common.city"), name: "city", value: a?.city || "" })}
        ${field2({ label: t("common.postal"), name: "postal", value: a?.postal || "" })}
        ${field2({ label: t("acc.addrStreet"), name: "street", required: true, span2: true, value: a?.street || "" })}
        ${field2({ label: t("acc.addrNote"), name: "note", span2: true, value: a?.note || "" })}
        <label class="check span-2"><input type="checkbox" name="isDefault" ${a?.isDefault ? "checked" : ""}><span class="box">${icon("check")}</span><span>${t("acc.addrDefault")}</span></label>
        <button class="btn btn-primary span-2" type="submit">${t("common.save")}</button>
      </form>`
  });
}
async function notificationsHtml() {
  await loadNotifications(true);
  const list5 = S.notifications;
  return html`
    <div class="row row-between mb">
      <strong>${t("common.notifications")} (${fmtNum(list5.length)})</strong>
      <button class="btn btn-ghost btn-sm" data-act="notif-read-all">${icon("check")} ${t("acc.markAllRead")}</button>
    </div>
    ${list5.length ? html`<div class="col">${list5.map((n) => html`
      <div class="card ${n.read ? "" : "notif-unread"}">
        <div class="row row-between">
          <strong class="row">${icon(notifIcon(n.type))} ${esc(isFa2() ? n.title : n.titleEn || n.title)}</strong>
          <span class="muted tiny nowrap">${timeAgo(n.createdAt)}</span>
        </div>
        ${n.body ? html`<p class="muted small mt-s">${esc(isFa2() ? n.body : n.bodyEn || n.body)}</p>` : ""}
        <div class="row mt-s">
          ${n.link ? html`<a class="btn btn-ghost btn-xs" href="${n.link}">${t("common.view")}</a>` : ""}
          ${!n.read ? html`<button class="btn btn-ghost btn-xs" data-act="notif-read" data-id="${n.id}">${t("notif.markRead")}</button>` : ""}
          <button class="btn btn-ghost btn-xs" data-act="notif-del" data-id="${n.id}">${icon("trash")}</button>
        </div>
      </div>`)}</div>` : emptyState({ icon: "bell", title: t("acc.notifEmpty") })}`;
}
function notifIcon(type) {
  return { order: "package-check", restock: "box", ticket: "ticket", support: "headset", review: "star", plus: "sparkles", wallet: "wallet", account: "user", feedback: "flag", admin_alert: "alert", offer: "percent", welcome: "heart" }[type] || "bell";
}
async function ticketsHtml() {
  let items = [];
  try {
    items = (await api.get("/api/tickets")).items || [];
  } catch {
  }
  return html`
    <div class="row row-between mb">
      <strong>${t("common.tickets")} (${fmtNum(items.length)})</strong>
      <button class="btn btn-primary btn-sm" data-act="ticket-new">${icon("plus")} ${t("acc.ticketNew")}</button>
    </div>
    ${items.length ? tableHtml(
    [{ label: t("acc.orderCode") }, { label: t("acc.ticketSubject") }, { label: t("common.status") }, { label: t("common.priority") }, { label: t("common.date") }, { label: "" }],
    items.map((x) => html`
        <tr>
          <td class="mono">${x.code}</td>
          <td class="nowrap">${esc(x.subject)}</td>
          <td><span class="badge-pill ${x.status === "closed" ? "bp-muted" : x.status === "answered" ? "bp-success" : "bp-warn"}">${t(`tk.${x.status}`)}</span></td>
          <td>${t(`tp.${x.priority}`)}</td>
          <td class="nowrap">${fmtDate(x.createdAt, { time: false })}</td>
          <td><a class="btn btn-ghost btn-xs" href="#/account/tickets/${x.id}">${t("common.view")}${x.unread ? html` <span class="badge-pill bp-danger">${fmtNum(x.messageCount)}</span>` : ""}</a></td>
        </tr>`)
  ) : emptyState({ icon: "ticket", title: t("acc.noTickets") })}`;
}
async function supportHtml() {
  if (!feat("liveSupport")) return emptyState({ icon: "headset", title: t("err.notFound") });
  let items = [];
  try {
    items = await loadThread();
  } catch {
  }
  clearChatUnread();
  return html`
    <div class="card">
      <div class="row row-between mb-s">
        <strong>${icon("headset")} ${t("acc.chatTitle")}</strong>
        <a class="btn btn-ghost btn-xs" href="#/account/tickets">${icon("ticket")} ${t("acc.chatOpenTicket")}</a>
      </div>
      <div class="chat-b" data-thread-page data-h="340px">${threadHtml(items)}</div>
      <form class="chat-f mt-s" data-act="chat-send">
        <input class="input" name="body" maxlength="1000" placeholder="${t("acc.chatPlaceholder")}" autocomplete="off">
        <button type="submit" class="btn btn-primary btn-icon" aria-label="${t("common.send")}">${icon("send")}</button>
      </form>
    </div>`;
}
async function exportData() {
  const r = await api.get("/api/me/export");
  return r.data;
}
async function reviewsHtml() {
  let data2 = null;
  try {
    data2 = await exportData();
  } catch {
  }
  const list5 = data2?.reviews || [];
  if (!list5.length) return emptyState({ icon: "star", title: t("acc.reviewEmpty") });
  return html`<div class="col">${list5.map((r) => html`
    <div class="card">
      <div class="row row-between">
        <strong>${esc(r.productName || r.productId)}</strong>
        <span class="badge-pill ${r.status === "approved" ? "bp-success" : r.status === "rejected" ? "bp-danger" : "bp-warn"}">${t(`common.${r.status === "approved" ? "approved" : r.status === "rejected" ? "rejected" : "pending"}`)}</span>
      </div>
      <div class="row row-wrap mt-s">${r.rating ? stars(r.rating) : ""}<span class="muted tiny">${fmtDate(r.createdAt, { time: false })}</span><span class="badge-pill bp-muted">${r.type === "question" ? t("common.question") : t("common.review")}</span></div>
      <div class="rev-title mt-s">${esc(r.title)}</div>
      <div class="rev-body">${esc(r.body)}</div>
      ${r.reply ? html`<div class="rev-reply"><strong>${t("pdp.storeReply")}:</strong> ${esc(r.reply)}</div>` : ""}
    </div>`)}</div>`;
}
async function feedbackHtml() {
  let data2 = null;
  try {
    data2 = await exportData();
  } catch {
  }
  const list5 = data2?.feedback || [];
  return html`
    <div class="row row-between mb">
      <strong>${t("acc.feedback")}</strong>
      <button class="btn btn-primary btn-sm" data-act="feedback-new">${icon("plus")} ${t("acc.feedbackNew")}</button>
    </div>
    ${list5.length ? html`<div class="col">${list5.map((f) => html`
      <div class="card">
        <div class="row row-between">
          <span class="badge-pill ${f.type === "bug" ? "bp-danger" : f.type === "complaint" ? "bp-warn" : "bp-info"}">${t(`ft.${f.type}`)}</span>
          <span class="badge-pill bp-muted">${t(`fs.${f.status}`)}</span>
        </div>
        <div class="rev-title mt-s">${esc(f.title)}</div>
        <div class="rev-body">${esc(f.body)}</div>
        ${f.response ? html`<div class="rev-reply">${esc(f.response)}</div>` : ""}
        <div class="muted tiny mt-s">${fmtDate(f.createdAt)}</div>
      </div>`)}</div>` : emptyState({ icon: "flag", title: t("acc.noFeedback") })}`;
}
function profileHtml() {
  const me = S.me;
  return html`
    <form class="card form-grid" data-act="profile-save">
      ${field2({ label: t("common.fullName"), name: "name", required: true, value: me?.name || "" })}
      ${field2({ label: "Name (EN)", name: "nameEn", value: me?.nameEn || "" })}
      ${field2({ label: t("common.username"), name: "username", value: me?.username || "", attrs: "disabled" })}
      ${field2({ label: t("common.phone"), name: "phone", type: "tel", value: me?.phone || "" })}
      ${field2({ label: t("common.email"), name: "email", type: "email", value: me?.email || "" })}
      <div class="span-2 row">
        <button class="btn btn-primary" type="submit">${icon("save")} ${t("common.save")}</button>
      </div>
    </form>`;
}
async function securityHtml() {
  let two = null;
  let sessions = [];
  try {
    two = await api.get("/api/me/2fa");
  } catch {
  }
  try {
    sessions = (await api.get("/api/me/sessions")).items || [];
  } catch {
  }
  return html`
    <div class="card mb">
      <strong>${icon("key")} ${t("acc.passwordChange")}</strong>
      <form class="form-grid mt-s" data-act="pass-change">
        ${field2({ label: t("acc.currentPassword"), name: "current", type: "password", required: true, autocomplete: "current-password" })}
        ${field2({ label: t("acc.newPassword2"), name: "next", type: "password", required: true, hint: t("auth.passwordRules"), autocomplete: "new-password" })}
        ${field2({ label: t("common.passwordConfirm"), name: "confirm", type: "password", required: true, autocomplete: "new-password" })}
        <div class="span-2"><button class="btn btn-primary" type="submit">${t("common.save")}</button></div>
      </form>
    </div>

    ${feat("twoFactor") ? html`
    <div class="card mb">
      <div class="row row-between">
        <strong>${icon("shield")} ${t("acc.2faSection")}</strong>
        <span class="badge-pill ${two?.enabled ? "bp-success" : "bp-muted"}">${two?.enabled ? t("acc.2faOn") : t("acc.2faOff")}</span>
      </div>
      <div class="mt-s" data-2fa-box>
        ${two?.enabled ? html`
          <p class="muted small">${t("acc.2faMethods")}: ${(two.methods || []).map((m) => t(`auth.2fa${m === "totp" ? "Totp" : m === "sms" ? "Sms" : "Email"}`)).join("\u060C ")}</p>
          ${two.backupCodes?.length ? html`<details class="mt-s"><summary class="link-btn">${t("acc.2faBackup")}</summary><p class="hint">${t("acc.2faBackupHint")}</p><div class="row row-wrap">${two.backupCodes.map((c) => html`<code class="tag mono">${c}</code>`)}</div></details>` : ""}
          <button class="btn btn-danger btn-sm mt" data-act="2fa-disable">${icon("close")} ${t("acc.2faDisable")}</button>` : html`
          <p class="muted small">${t("acc.2faOff")}</p>
          <button class="btn btn-primary btn-sm mt-s" data-act="2fa-setup">${icon("shield")} ${t("acc.2faEnable")}</button>`}
      </div>
    </div>` : ""}

    <div class="card">
      <div class="row row-between">
        <strong>${icon("users")} ${t("acc.sessions")}</strong>
        <button class="btn btn-ghost btn-sm" data-act="sessions-revoke">${icon("logout")} ${t("acc.revokeAll")}</button>
      </div>
      <p class="muted small mt-s">${t("acc.sessionsText")}</p>
      ${tableHtml(
    [{ label: t("acc.current") }, { label: "IP" }, { label: t("common.date") }, { label: "" }],
    sessions.map((s) => html`
          <tr>
            <td>${s.current ? html`<span class="badge-pill bp-success">${t("acc.current")}</span>` : html`<span class="muted tiny">${esc((s.ua || "").slice(0, 40))}</span>`}</td>
            <td class="mono small">${esc(s.ip || "")}</td>
            <td class="nowrap small">${fmtDate(s.lastSeenAt || s.createdAt)}</td>
            <td>${!s.current ? html`<button class="btn btn-ghost btn-xs" data-act="session-revoke" data-id="${s.id}">${icon("trash")}</button>` : ""}</td>
          </tr>`)
  )}
    </div>`;
}
async function loadQrLib() {
  if (window.qrcode) return window.qrcode;
  await new Promise((resolve, reject) => {
    const s = document.createElement("script");
    s.src = "/js/vendor/qrcode-generator.js";
    s.onload = resolve;
    s.onerror = reject;
    document.head.appendChild(s);
  });
  return window.qrcode;
}
function prefsHtml() {
  const p = S.prefs;
  const np = S.me?.notificationsPrefs || {};
  return html`
    <div class="card mb">
      <strong>${icon("settings")} ${t("acc.prefs")}</strong>
      <p class="muted small mt-s">${t("acc.prefsText")}</p>
      <div class="form-grid mt">
        ${selectField({ label: t("acc.prefTheme"), name: "theme", value: p.theme, options: [{ value: "dark", label: t("theme.dark") }, { value: "light", label: t("theme.light") }, { value: "auto", label: t("theme.auto") }] })}
        ${selectField({ label: t("acc.prefLang"), name: "locale", value: p.locale, options: [{ value: "fa", label: "\u0641\u0627\u0631\u0633\u06CC" }, { value: "en", label: "English" }] })}
        ${selectField({ label: t("acc.prefDensity"), name: "density", value: p.density, options: [{ value: "compact", label: "Compact" }, { value: "normal", label: "Normal" }, { value: "comfy", label: "Comfy" }] })}
      </div>
      ${switchField({ label: t("acc.prefMotion"), desc: lang() === "fa" ? "\u062E\u0627\u0645\u0648\u0634 \u06A9\u0631\u062F\u0646 \u0627\u0646\u06CC\u0645\u06CC\u0634\u0646\u200C\u0647\u0627 \u0628\u0631\u0627\u06CC \u0631\u0627\u062D\u062A\u06CC \u0686\u0634\u0645" : "Turn animations off", name: "reduceMotion", checked: !!p.reduceMotion })}
    </div>
    <div class="card">
      <strong>${icon("bell")} ${t("acc.prefNotif")}</strong>
      <form data-act="notif-prefs" class="mt-s">
        ${switchField({ label: t("acc.notifMarketing"), name: "marketing", checked: !!np.marketing })}
        ${switchField({ label: t("acc.notifOrders"), name: "orders", checked: np.orders !== false })}
        ${switchField({ label: t("acc.notifRestock"), name: "restock", checked: np.restock !== false })}
        ${switchField({ label: t("acc.notifSupport"), name: "support", checked: np.support !== false })}
        <button class="btn btn-primary mt" type="submit">${t("common.save")}</button>
      </form>
    </div>`;
}
function dataHtml() {
  return html`
    <div class="card mb">
      <strong>${icon("download")} ${t("acc.exportData")}</strong>
      <p class="muted small mt-s">${t("acc.exportHint")}</p>
      <button class="btn btn-primary mt-s" data-act="data-export">${icon("download")} ${t("common.download")}</button>
    </div>
    <div class="card">
      <strong class="danger-text">${icon("alert")} ${t("acc.deleteAccount")}</strong>
      <p class="muted small mt-s">${t("acc.deleteWarn")}</p>
      <button class="btn btn-danger mt-s" data-act="data-delete">${icon("trash")} ${t("acc.deleteAccount")}</button>
    </div>`;
}
function mount11(root, ctx) {
  applyDyn(root);
  void ctx;
  return null;
}
async function kycHtml() {
  const isApproved = S.me.kycStatus === "approved";
  const isPending = S.me.kycStatus === "pending";
  const isRejected = S.me.kycStatus === "rejected";
  if (isApproved) {
    return html`
      <div class="card box pad text-center">
        ${icon("check-circle", { style: "color:var(--success);width:64px;height:64px;" })}
        <h3 class="mt-4 mb-2">احراز هویت تأیید شده است</h3>
        <p class="text-muted">شما می‌توانید بدون محدودیت از تمامی خدمات و ثبت سفارش استفاده کنید.</p>
      </div>
    `;
  }
  if (isPending) {
    return html`
      <div class="card box pad text-center">
        ${icon("clock", { style: "color:var(--warning);width:64px;height:64px;" })}
        <h3 class="mt-4 mb-2">در حال بررسی مدارک</h3>
        <p class="text-muted">مدارک شما دریافت شده و در صف بررسی توسط کارشناسان یاسایی الکترونیک قرار دارد. لطفاً شکیبا باشید.</p>
      </div>
    `;
  }
  return html`
    <div class="card box pad">
      <h3 class="mb-4">${icon("shield-check")} تکمیل احراز هویت</h3>
      ${isRejected ? html`<div class="alert danger mb-4">مدارک قبلی شما به دلیل نقص یا ناخوانا بودن رد شد. لطفاً دوباره ارسال کنید. (${esc(S.me.kycMessage || "")})</div>` : ""}
      <p class="text-muted mb-4"><strong>توجه:</strong> حداکثر حجم مجاز برای هر فایل ۲ مگابایت است.<br>احراز هویت <strong>اجباری نیست</strong>، اما با تایید مدارک خود امکان استفاده از <strong>خرید اقساطی (اسنپ‌پی، ازکی‌وام)</strong>، شرکت در <strong>قرعه‌کشی‌ها</strong> و دریافت <strong>کدهای تخفیف ویژه</strong> برای شما فعال خواهد شد.</p>
      
      <div class="alert info mb-4">
        <strong>راهنمای بارگذاری مدارک:</strong>
        <ol class="mt-2 mb-0" style="padding-right: 20px;">
          <li>فرم تعهدنامه را <a href="/assets/docs/kyc-form.pdf" target="_blank" download style="font-weight:bold;text-decoration:underline;">دانلود کنید</a>، پرینت گرفته و امضا کنید (یا به صورت دیجیتال پر کنید).</li>
          <li>یک عکس واضح از کارت ملی یا شناسنامه خود بگیرید.</li>
          <li>یک عکس سلفی در حالی که کارت ملی و فرم تعهدنامه را در دست دارید بگیرید.</li>
        </ol>
      </div>

      <form class="stack grid gap-3" onsubmit="event.preventDefault(); window.submitKyc(event.target);">
        <div class="field">
          <label>عکس سلفی (همراه با کارت ملی و فرم)</label>
          <input type="file" name="selfie" accept="image/*" required class="input">
        </div>
        <div class="field">
          <label>عکس کارت ملی یا شناسنامه</label>
          <input type="file" name="idCard" accept="image/*" required class="input">
        </div>
        <div class="field">
          <label>فرم امضا شده تعهدنامه (PDF یا عکس)</label>
          <input type="file" name="formDoc" accept="image/*,.pdf" required class="input">
        </div>
        <button type="submit" class="btn primary mt-2">${icon("upload")} ارسال مدارک</button>
      </form>
    </div>
  `;
}
function referralsHtml() {
  const refCode = S.me?.referralCode || S.me?.id?.substring(0, 6).toUpperCase();
  const refLink = window.location.origin + "#/auth?ref=" + refCode;
  return html`
    <div class="card box pad">
      <h3 class="mb-4">${icon("users")} دعوت از دوستان (Referral)</h3>
      <p class="text-muted mb-4">با دعوت از دوستان خود هم به آن‌ها هدیه بدهید و هم خودتان پاداش بگیرید!</p>
      
      <div class="grid gap-3 mb-4">
        <div class="box pad" style="background: var(--surface-2); border-radius: var(--radius);">
          <div class="muted mb-2">کد معرف شما:</div>
          <div class="row row-between">
            <h2 class="mono m-0">${refCode}</h2>
            <button class="btn btn-ghost" onclick="navigator.clipboard.writeText('${refCode}'); import('../ui.mjs').then(m => m.toastSuccess('کد کپی شد'))">${icon("copy")} کپی کد</button>
          </div>
        </div>
        <div class="box pad" style="background: var(--surface-2); border-radius: var(--radius);">
          <div class="muted mb-2">لینک دعوت اختصاصی:</div>
          <div class="row row-between gap-2">
            <input readonly value="${refLink}" class="input flex-1" style="font-size: 0.85rem;" dir="ltr">
            <button class="btn btn-ghost" onclick="navigator.clipboard.writeText('${refLink}'); import('../ui.mjs').then(m => m.toastSuccess('لینک کپی شد'))">${icon("copy")}</button>
          </div>
        </div>
      </div>
      
      <div class="stats-grid mb-4">
        <div class="stat-card">
          <span class="stat-ic" style="color:var(--info)">${icon("users")}</span>
          <div><div class="stat-val">${S.me?.referralCount || 0}</div><div class="stat-lbl">دوستان دعوت‌شده</div></div>
        </div>
        <div class="stat-card">
          <span class="stat-ic" style="color:var(--success)">${icon("gift")}</span>
          <div><div class="stat-val">${(S.me?.referralCount || 0) * 10}</div><div class="stat-lbl">امتیاز دریافتی</div></div>
        </div>
      </div>
      
      <div class="alert info">
        <h4 class="mb-2">${icon("info")} پاداش‌ها (به‌زودی بر اساس قوانین سایت):</h4>
        <ul class="mb-0" style="padding-right: 20px;">
          <li>دعوت از هر نفر (ثبت‌نام موفق): <strong>تخفیف روی سبد خرید بعدی یا ارسال رایگان</strong></li>
          <li>دعوت از بیش از ۱۰ نفر: <strong>دریافت جایزه ویژه وفاداری</strong></li>
        </ul>
      </div>
    </div>
  `;
}
var SECTIONS, addrHandle2, ticketHandle, fbHandle, title11;
var init_account = __esm({
  "public/js/views/account.mjs"() {
    init_dom();
    init_i18n();
    init_api();
    init_state();
    init_components();
    init_ui();
    init_actions();
    init_router();
    init_chat();
    SECTIONS = [
      { id: "", icon: "home", label: () => t("acc.dashboard") },
      { id: "orders", icon: "package-check", label: () => t("acc.orders") },
      { id: "wishlist", icon: "heart", label: () => t("acc.wishlist"), feat: "wishlist" },
      { id: "wallet", icon: "wallet", label: () => t("acc.wallet"), feat: "wallet" },
      { id: "plus", icon: "sparkles", label: () => t("acc.plus"), feat: "plus" },
      { id: "addresses", icon: "pin", label: () => t("acc.addresses") },
      { id: "notifications", icon: "bell", label: () => t("acc.notifications") },
      { id: "tickets", icon: "ticket", label: () => t("acc.tickets"), feat: "tickets" },
      { id: "support", icon: "headset", label: () => t("acc.support"), feat: "liveSupport" },
      { id: "reviews", icon: "star", label: () => t("acc.reviews") },
      { id: "feedback", icon: "flag", label: () => t("acc.feedback") },
      { id: "referrals", icon: "users", label: () => "\u062F\u0639\u0648\u062A \u0627\u0632 \u062F\u0648\u0633\u062A\u0627\u0646" },
      { id: "profile", icon: "user", label: () => t("acc.profile") },
      { id: "kyc", icon: "shield-check", label: () => "\u0627\u062D\u0631\u0627\u0632 \u0647\u0648\u06CC\u062A (KYC)" },
      { id: "security", icon: "shield", label: () => t("acc.security") },
      { id: "prefs", icon: "settings", label: () => t("acc.prefs") },
      { id: "data", icon: "download", label: () => t("acc.data") }
    ];
    act("wallet-deposit", () => {
      const handle = modal({
        title: t("acc.walletDeposit"),
        size: "sm",
        body: html`
      <form data-act="wallet-deposit-do">
        <p class="notice notice-warn mb">${icon("info")}<span>${t("checkout.gatewayDemo")}</span></p>
        ${field2({ label: t("acc.walletAmount"), name: "amount", type: "number", required: true, value: "100000", attrs: 'min="10000" step="10000"' })}
        <div class="row row-wrap mb">
          ${[1e5, 2e5, 5e5, 1e6].map((v) => html`<button type="button" class="chip" data-amt="${v}">${fmtNum(v)}</button>`)}
        </div>
        <button class="btn btn-primary btn-block" type="submit">${icon("card")} ${t("common.deposit")}</button>
      </form>`,
        onMount: (panel, handle2) => {
          panel.querySelectorAll("[data-amt]").forEach((b) => b.addEventListener("click", () => {
            panel.querySelector("[name=amount]").value = b.dataset.amt;
          }));
        }
      });
      void handle;
    });
    act("wallet-deposit-do", async (e, form) => {
      e.preventDefault();
      const amount = Number(new FormData(form).get("amount") || 0);
      await withBusy(form.querySelector("button[type=submit]"), async () => {
        try {
          await api.post("/api/me/wallet/deposit", { amount });
          await refreshMe();
          toastSuccess(t("acc.walletDeposited"));
          refresh(true);
        } catch (err) {
          toastApiError(err);
        }
      });
    });
    act("plus-buy", async (e, el2) => {
      await withBusy(el2, async () => {
        try {
          await api.post("/api/me/plus/subscribe", { method: el2.dataset.method });
          await refreshMe();
          toastSuccess(t("acc.plusSubscribed"));
          refresh(true);
        } catch (err) {
          toastApiError(err);
        }
      });
    });
    addrHandle2 = null;
    act("addr-new", () => {
      addrHandle2 = addressForm(null);
    });
    act("addr-edit", (e, el2) => {
      const a = (S.me?.addresses || []).find((x) => x.id === el2.dataset.id);
      if (a) addrHandle2 = addressForm(a);
    });
    act("addr-del", async (e, el2) => {
      const ok = await confirmDelete();
      if (!ok) return;
      try {
        const r = await api.del(`/api/me/addresses/${el2.dataset.id}`);
        if (S.me) S.me.addresses = r.addresses;
        toastSuccess(t("acc.addrDeleted"));
        refresh(true);
      } catch (err) {
        toastApiError(err);
      }
    });
    act("addr-default", async (e, el2) => {
      const a = (S.me?.addresses || []).find((x) => x.id === el2.dataset.id);
      try {
        const r = await api.patch(`/api/me/addresses/${el2.dataset.id}`, { ...a, isDefault: true });
        if (S.me) S.me.addresses = r.addresses;
        toastSuccess(t("acc.addrSaved"));
        refresh(true);
      } catch (err) {
        toastApiError(err);
      }
    });
    act("addr-save2", async (e, form) => {
      e.preventDefault();
      const fd = new FormData(form);
      const payload = Object.fromEntries(fd.entries());
      payload.isDefault = fd.get("isDefault") === "on";
      const id = form.dataset.id;
      try {
        const r = id ? await api.patch(`/api/me/addresses/${id}`, payload) : await api.post("/api/me/addresses", payload);
        if (S.me) S.me.addresses = r.addresses;
        toastSuccess(t("acc.addrSaved"));
        addrHandle2?.close();
        refresh(true);
      } catch (err) {
        toastApiError(err);
      }
    });
    act("notif-read-all", async () => {
      await markNotificationsRead([], true);
      refresh(true);
    });
    act("notif-read", async (e, el2) => {
      await markNotificationsRead([el2.dataset.id]);
      refresh(true);
    });
    act("notif-del", async (e, el2) => {
      await deleteNotification(el2.dataset.id);
      refresh(true);
    });
    ticketHandle = null;
    act("ticket-new", () => {
      const cats = S.ticketCategories || [];
      const pris = S.ticketPriorities || [];
      ticketHandle = modal({
        title: t("acc.ticketNew"),
        body: html`
      <form data-act="ticket-create">
        ${field2({ label: t("acc.ticketSubject"), name: "subject", required: true })}
        <div class="form-grid">
          ${selectField({ label: t("acc.ticketCategory"), name: "category", required: true, options: cats.map((c) => ({ value: c.id || c, label: t(`tc.${c.id || c}`) })) })}
          ${selectField({ label: t("acc.ticketPriority"), name: "priority", options: pris.map((pp) => ({ value: pp.id || pp, label: t(`tp.${pp.id || pp}`) })), value: "normal" })}
        </div>
        ${textareaField({ label: t("acc.ticketBody"), name: "body", required: true, rows: 5 })}
        <div class="mb">${checkField({ label: html`${t("acc.ticketRules")} <a class="section-link" href="#/pages/ticketRules">${t("acc.ticketViewRules")}</a>`, name: "rules", required: true })}</div>
        <button class="btn btn-primary btn-block" type="submit">${t("common.submit")}</button>
      </form>`
      });
    });
    act("ticket-create", async (e, form) => {
      e.preventDefault();
      const fd = new FormData(form);
      if (fd.get("rules") !== "on") {
        toastError2(t("form.rulesRequired"));
        return;
      }
      await withBusy(form.querySelector("button[type=submit]"), async () => {
        try {
          const r = await api.post("/api/tickets", { subject: fd.get("subject"), category: fd.get("category"), priority: fd.get("priority"), body: fd.get("body"), rulesAccepted: true });
          toastSuccess(t("acc.ticketCreated", { code: r.ticket?.code || "" }));
          ticketHandle?.close();
          navigate(`#/account/tickets/${r.ticket?.id || ""}`);
        } catch (err) {
          toastApiError(err);
        }
      });
    });
    fbHandle = null;
    act("feedback-new", () => {
      fbHandle = modal({
        title: t("acc.feedbackNew"),
        body: html`
      <form data-act="feedback-send">
        ${selectField({ label: t("acc.feedbackType"), name: "type", options: ["suggestion", "complaint", "bug"].map((x) => ({ value: x, label: t(`ft.${x}`) })), value: "suggestion" })}
        ${field2({ label: t("common.title"), name: "title", required: true })}
        ${textareaField({ label: t("common.body"), name: "body", required: true, rows: 5 })}
        ${field2({ label: t("acc.feedbackContact"), name: "contact", hint: t("acc.feedbackContactHint"), value: S.me?.phone || S.me?.email || "" })}
        ${S.me ? "" : captchaField()}
        <button class="btn btn-primary btn-block" type="submit">${t("common.submit")}</button>
      </form>`
      });
    });
    act("feedback-send", async (e, form) => {
      e.preventDefault();
      const fd = new FormData(form);
      await withBusy(form.querySelector("button[type=submit]"), async () => {
        try {
          await api.post("/api/feedback", { type: fd.get("type"), title: fd.get("title"), body: fd.get("body"), contact: fd.get("contact") || "", captchaToken: fd.get("captchaToken") || void 0 });
          toastSuccess(t("acc.feedbackSent"));
          fbHandle?.close();
          refresh(true);
        } catch (err) {
          if (err?.code === "captcha_required") {
            const b = form.querySelector("[data-captcha]");
            if (b) {
              b.hidden = false;
            }
          }
          toastApiError(err);
        }
      });
    });
    act("profile-save", async (e, form) => {
      e.preventDefault();
      const fd = new FormData(form);
      await withBusy(form.querySelector("button[type=submit]"), async () => {
        try {
          const r = await api.patch("/api/me", { name: fd.get("name"), nameEn: fd.get("nameEn"), phone: fd.get("phone"), email: fd.get("email") });
          S.me = r.me;
          toastSuccess(t("acc.profileSaved"));
          refresh(true);
        } catch (err) {
          toastApiError(err);
        }
      });
    });
    act("pass-change", async (e, form) => {
      e.preventDefault();
      const fd = new FormData(form);
      if (fd.get("next") !== fd.get("confirm")) {
        toastError2(lang() === "fa" ? "\u062A\u06A9\u0631\u0627\u0631 \u0631\u0645\u0632 \u06CC\u06A9\u0633\u0627\u0646 \u0646\u06CC\u0633\u062A." : "Passwords do not match.");
        return;
      }
      await withBusy(form.querySelector("button[type=submit]"), async () => {
        try {
          await api.post("/api/me/password", { current: fd.get("current"), next: fd.get("next") });
          toastSuccess(t("acc.passwordChanged"));
          form.reset();
        } catch (err) {
          toastApiError(err);
        }
      });
    });
    act("2fa-setup", async () => {
      try {
        const two = await api.get("/api/me/2fa");
        modal({
          title: t("acc.2faEnable"),
          body: html`
        <div data-2fa-setup>
          <p class="muted small">${t("acc.2faScan")}</p>
          <div class="center mt-s" data-qr></div>
          <p class="hint t-center mono" data-key>${two.secret || ""}</p>
          <div class="btn-group mt-s" data-methods>
            <button type="button" class="btn active" data-mm="totp">${t("auth.2faTotp")}</button>
            <button type="button" class="btn" data-mm="sms" ${two.hasPhone ? "" : "disabled"}>${t("auth.2faSms")}</button>
            <button type="button" class="btn" data-mm="email" ${two.hasEmail ? "" : "disabled"}>${t("auth.2faEmail")}</button>
          </div>
          <form data-act="2fa-enable" class="mt">
            ${field2({ label: t("acc.2faEnterCode"), name: "code", attrs: 'inputmode="numeric" maxlength="6"' })}
            <button class="btn btn-primary btn-block" type="submit">${t("common.confirm")}</button>
          </form>
        </div>`,
          onMount: async (panel) => {
            try {
              const qrc = await loadQrLib();
              const qr = qrc(0, "M");
              qr.addData(two.otpauth);
              qr.make();
              const box = panel.querySelector("[data-qr]");
              const svg = qr.createSvgTag({ cellSize: 4, margin: 2 });
              box.innerHTML = svg;
              const svgEl = box.querySelector("svg");
              if (svgEl) {
                svgEl.setAttribute("width", "180");
                svgEl.setAttribute("height", "180");
                svgEl.classList.add("qr-img");
              }
            } catch {
              panel.querySelector("[data-qr]").innerHTML = html`<code class="tag mono">${two.otpauth}</code>`;
            }
            panel.querySelector("[data-methods]").addEventListener("click", (e) => {
              const b = e.target.closest("[data-mm]");
              if (!b) return;
              panel.querySelectorAll("[data-mm]").forEach((x) => x.classList.toggle("active", x === b));
              panel.querySelector("[name=code]").closest(".field").hidden = b.dataset.mm !== "totp";
            });
          }
        });
      } catch (err) {
        toastApiError(err);
      }
    });
    act("2fa-enable", async (e, form) => {
      const method = form.closest("[data-2fa-setup]").querySelector("[data-mm].active")?.dataset.mm || "totp";
      const code = new FormData(form).get("code") || "";
      await withBusy(form.querySelector("button[type=submit]"), async () => {
        try {
          const r = await api.post("/api/me/2fa/enable", { method, code });
          await refreshMe();
          toastSuccess(t("acc.2faEnabled"));
          if (r.backupCodes?.length) {
            modal({
              title: t("acc.2faBackup"),
              size: "sm",
              body: html`<p class="hint">${t("acc.2faBackupHint")}</p><div class="row row-wrap mt-s">${r.backupCodes.map((c) => html`<code class="tag mono b">${c}</code>`)}</div>`
            });
          }
          refresh(true);
        } catch (err) {
          toastApiError(err);
        }
      });
    });
    act("2fa-disable", async () => {
      const password = await promptDialog({ title: t("acc.2faDisable"), label: t("common.password"), type: "password", required: true });
      if (password === null) return;
      try {
        await api.post("/api/me/2fa/disable", { password });
        await refreshMe();
        toastSuccess(t("acc.2faDisabled"));
        refresh(true);
      } catch (err) {
        toastApiError(err);
      }
    });
    act("sessions-revoke", async () => {
      const ok = await confirmDialog({ text: t("acc.revokeAll"), danger: true });
      if (!ok) return;
      try {
        await api.post("/api/me/sessions/revoke", { allOthers: true });
        toastSuccess(t("acc.revokeDone"));
        refresh(true);
      } catch (err) {
        toastApiError(err);
      }
    });
    act("session-revoke", async (e, el2) => {
      try {
        await api.post("/api/me/sessions/revoke", { id: el2.dataset.id });
        toastSuccess(t("acc.revokeDone"));
        refresh(true);
      } catch (err) {
        toastApiError(err);
      }
    });
    act("notif-prefs", async (e, form) => {
      e.preventDefault();
      const fd = new FormData(form);
      try {
        const r = await api.patch("/api/me", {
          notificationsPrefs: { marketing: fd.get("marketing") === "on", orders: fd.get("orders") === "on", restock: fd.get("restock") === "on", support: fd.get("support") === "on" }
        });
        S.me = r.me;
        toastSuccess(t("misc.saved"));
      } catch (err) {
        toastApiError(err);
      }
    });
    act("data-export", async (e, el2) => {
      await withBusy(el2, async () => {
        try {
          const data2 = await exportData();
          const blob = new Blob([JSON.stringify(data2, null, 2)], { type: "application/json" });
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = `bander-mobile-data-${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}.json`;
          a.click();
          setTimeout(() => URL.revokeObjectURL(url), 4e3);
          toastSuccess(t("common.download"));
        } catch (err) {
          toastApiError(err);
        }
      });
    });
    act("data-delete", async () => {
      const ok = await confirmDialog({ title: t("acc.deleteAccount"), text: t("acc.deleteWarn"), danger: true, okText: t("common.delete") });
      if (!ok) return;
      const password = await promptDialog({ title: t("acc.deleteConfirm"), label: t("common.password"), type: "password", required: true });
      if (password === null) return;
      try {
        await api.post("/api/me/delete", { password });
        S.me = null;
        navigate("#/");
        refresh();
      } catch (err) {
        toastApiError(err);
      }
    });
    title11 = (ctx) => t("acc.title");
  }
});

// public/js/views/order-detail.mjs
var order_detail_exports = {};
__export(order_detail_exports, {
  mount: () => mount12,
  render: () => render13
});
async function render13(ctx) {
  const id = ctx.params.id;
  let data2 = null;
  try {
    data2 = await api.get(`/api/me/orders/${id}`);
  } catch (err) {
    return err?.status === 404 ? emptyState({ icon: "package-check", title: t("acc.noOrders"), action: { href: "#/account/orders", label: t("acc.orders") } }) : errorState({ title: t("err.generic") });
  }
  const o = data2.order;
  const canReview = new Set(data2.canReviewIds || []);
  return html`
    <div class="breadcrumb mb-s">
      <a href="#/account">${t("acc.title")}</a> <span>/</span>
      <a href="#/account/orders">${t("acc.orders")}</a> <span>/</span>
      <span class="mono">${o.code}</span>
    </div>

    <div class="cart-grid">
      <div class="col">
        <div class="card">
          <div class="row row-between row-wrap">
            <div>
              <div class="row row-wrap"><h1 class="buy-title">${icon("package-check")} ${o.code}</h1>${statusBadge(o.status)}</div>
              <p class="muted small mt-s">${fmtDate(o.createdAt)} · ${esc(o.statusInfo?.fa || o.statusInfo?.label || "")}</p>
            </div>
            <div class="row row-wrap">
              <button class="btn btn-ghost btn-sm" data-act="od-invoice" data-id="${o.id}">${icon("printer")} ${t("acc.printInvoice")}</button>
              ${o.payment?.status === "unpaid" ? html`<a class="btn btn-primary btn-sm" href="#/pay/${o.id}">${icon("card")} ${t("common.payable")} ${fmtMoney(o.payable)}</a>` : ""}
              ${["pending_review", "pending_payment", "confirmed", "preparing"].includes(o.status) ? html`<button class="btn btn-danger btn-sm" data-act="od-cancel" data-id="${o.id}">${icon("close")} ${t("acc.cancelOrder")}</button>` : ""}
            ${o.tracking ? html`<span class="row gap-s"><span class="badge-pill bp-info mono">${icon("truck")} ${esc(o.tracking)}</span><button class="btn btn-ghost btn-xs" data-act="copy" data-text="${esc(o.tracking)}">${icon("copy")} ${t("common.copy")}</button></span>` : ""}
            </div>
          </div>
          ${o.statusInfo?.fa && isFa2() === false && o.statusInfo?.en ? html`<p class="muted small">${esc(o.statusInfo.en)}</p>` : ""}
        </div>

        <div class="card mt">
          <strong>${icon("history")} ${t("acc.timeline")}</strong>
          ${timelineHtml(o)}
        </div>

        <div class="card mt">
          <strong>${icon("box")} ${t("acc.orderItems")} (${fmtNum(o.items?.length || 0)})</strong>
          ${tableHtml(
    [{ label: "" }, { label: t("common.product") }, { label: t("common.price"), cls: "num" }, { label: t("common.count"), cls: "num" }, { label: t("common.total"), cls: "num" }, { label: "" }],
    (o.items || []).map((it) => html`
              <tr>
                <td><span class="cl-img" data-h="52px" data-w="52px">${it.image ? html`<img src="${it.image}" alt="${esc(isFa2() ? it.name : it.nameEn || it.name)}" loading="lazy">` : icon("box")}</span></td>
                <td>
                  <a class="b" href="#/product/${it.productId}">${esc(isFa2() ? it.name : it.nameEn || it.name)}</a>
                  ${it.brand ? html`<div class="tiny muted">${esc(it.brand)}</div>` : ""}
                  ${it.sku ? html`<div class="tiny muted mono">SKU ${esc(it.sku)}</div>` : ""}
                </td>
                <td class="num">${fmtMoney(it.price)}</td>
                <td class="num">${fmtNum(it.qty)}</td>
                <td class="num b">${fmtMoney(it.price * it.qty)}</td>
                <td>${canReview.has(it.productId) ? html`<button class="btn btn-ghost btn-xs" data-act="od-review" data-id="${it.productId}" data-name="${esc(isFa2() ? it.name : it.nameEn || it.name)}">${icon("star")} ${t("pdp.writeReview")}</button>` : ""}</td>
              </tr>`)
  )}
          <div class="row row-wrap mt">
            <button class="btn btn-ghost btn-sm" data-act="od-reorder" data-id="${o.id}">${icon("cart")} ${t("acc.reorder")}</button>
            <a class="btn btn-ghost btn-sm" href="#/account/tickets">${icon("ticket")} ${t("acc.chatOpenTicket")}</a>
          </div>
        </div>
      </div>

      <aside class="col">
        <div class="card summary">
          <strong>${t("cart.summary")}</strong>
          <div class="sum-row"><span>${t("common.subtotal")}</span><span class="v">${fmtMoney(o.subtotal)}</span></div>
          ${o.plusDiscount > 0 ? html`<div class="sum-row discount"><span>${t("acc.plus")}</span><span class="v">−${fmtMoney(o.plusDiscount)}</span></div>` : ""}
          ${o.couponDiscount > 0 ? html`<div class="sum-row discount"><span>${t("common.discountCode")}: ${o.couponCode}</span><span class="v">−${fmtMoney(o.couponDiscount)}</span></div>` : ""}
          <div class="sum-row"><span>${t("common.shipping")}${o.shippingLabel ? html` <span class="muted tiny">(${esc(o.shippingLabel)})</span>` : ""}</span><span class="v">${o.shipping === 0 ? t("common.free") : fmtMoney(o.shipping)}</span></div>
          ${o.insured ? html`<div class="sum-row"><span>${t("common.insurance")}</span><span class="v">${o.insuranceFee === 0 ? t("common.free") : fmtMoney(o.insuranceFee)}</span></div>` : ""}
          <div class="sum-row"><span>${t("common.total")}</span><span class="v">${fmtMoney(o.total)}</span></div>
          ${o.walletUsed > 0 ? html`<div class="sum-row discount"><span>${t("common.wallet")}</span><span class="v">−${fmtMoney(o.walletUsed)}</span></div>` : ""}
          <div class="sum-row total"><span>${t("common.payable")}</span><span class="v">${fmtMoney(o.payable)}</span></div>
          <div class="row row-between mt-s">
            <span class="muted small">${t("common.payment")}</span>
            ${payBadge(o.payment)}
          </div>
          ${o.payment?.ref ? html`<p class="hint mono mt-s">${esc(o.payment.ref)}</p>` : ""}
          ${o.refund ? html`<p class="notice notice-success mt-s">${icon("wallet")}<span>${fmtMoney(o.refund.amount)} ${t("acc.tx.refund")} — ${fmtDate(o.refund.at)}</span></p>` : ""}
        </div>

        <div class="card mt">
          <strong>${icon("truck")} ${t(o.delivery === "pickup" ? "checkout.pickup" : "checkout.courier")}</strong>
          ${o.delivery === "pickup" ? html`
            <p class="muted small mt-s">${t("checkout.pickupDesc")}</p>
            <p class="mt-s small">${esc(S.settings?.store?.address || "")}</p>` : html`
            ${o.address ? html`
              <p class="small mt-s"><strong>${esc(o.address.receiver || "")}</strong> · ${fmtTel(o.address.phone || "")}</p>
              <p class="muted small">${esc(o.address.street || "")}${o.address.city ? `\u060C ${esc(o.address.city)}` : ""}</p>
              ${o.address.postal ? html`<p class="muted small">${t("common.postal")}: ${esc(o.address.postal)}</p>` : ""}` : html`<p class="muted small mt-s">${t("acc.noAddress")}</p>`}
            ${o.zone ? html`<p class="small mt-s">${t("checkout.zone")}: ${esc(zoneLabel(o.zone))}</p>` : ""}`}
          ${o.express ? html`<p class="small mt-s"><span class="badge-pill bp-accent">${icon("zap")} ${t("checkout.express")}</span></p>` : ""}
          ${o.insured ? html`<p class="small mt-s"><span class="badge-pill bp-success">${icon("shield")} ${t("common.insurance")} ${fmtMoney(o.insuranceFee)}</span></p>` : ""}
          ${o.note ? html`<p class="hint mt-s">${icon("edit")} ${esc(o.note)}</p>` : ""}
          ${o.couponCode ? html`<p class="hint mt-s">${icon("percent")} ${o.couponCode}</p>` : ""}
        </div>
      </aside>
    </div>`;
}
function mount12(root, ctx) {
  applyDyn(root);
  void ctx;
  return null;
}
var zoneLabel;
var init_order_detail = __esm({
  "public/js/views/order-detail.mjs"() {
    init_dom();
    init_i18n();
    init_api();
    init_state();
    init_components();
    init_ui();
    init_actions();
    init_router();
    init_state();
    zoneLabel = (id) => {
      const z = (ship().zones || []).find((x) => x.id === id);
      if (!z) return id || "";
      return isFa2() ? z.name : z.nameEn || z.name;
    };
    act("od-cancel", async (e, el2) => {
      const reason = await promptDialog({ title: t("acc.cancelOrder"), text: t("acc.cancelReason"), label: t("acc.cancelReason"), rows: 3, okText: t("acc.cancelOrder") });
      if (reason === null) return;
      try {
        await api.post(`/api/me/orders/${el2.dataset.id}/cancel`, { reason: reason || "" });
        toastSuccess(t("acc.orderCancelled"));
        refresh(true);
      } catch (err) {
        toastApiError(err);
      }
    });
    act("od-reorder", async (e, el2) => {
      await withBusy(el2, async () => {
        try {
          const { order } = await api.get(`/api/me/orders/${el2.dataset.id}`);
          let added = 0;
          for (const it of order.items || []) {
            try {
              await api.post("/api/cart/add", { productId: it.productId, qty: it.qty || 1 });
              added += 1;
            } catch {
            }
          }
          await loadCart();
          if (!added) {
            toastApiError({ code: "out_of_stock", message: isFa2() ? "\u0647\u06CC\u0686\u200C\u06A9\u062F\u0627\u0645 \u0627\u0632 \u0627\u0642\u0644\u0627\u0645 \u062F\u0631 \u0627\u0646\u0628\u0627\u0631 \u0646\u06CC\u0633\u062A." : "None of the items are in stock." });
            return;
          }
          toastSuccess(t("card.added"));
          navigate("#/cart");
        } catch (err) {
          toastApiError(err);
        }
      });
    });
    act("od-invoice", async (e, el2) => {
      const { order: o } = await api.get(`/api/me/orders/${el2.dataset.id}`);
      const st = S.settings?.store || {};
      modal({
        title: t("acc.invoice"),
        body: html`
      <div class="invoice-print" dir="rtl">
        <div class="inv-head">
          <div>
            <strong>${esc(st.name || "Green Apple")}</strong>
            <div class="tiny">${esc(st.address || "")}</div>
            <div class="tiny">${fmtTel(st.phone || "")}</div>
          </div>
          <div class="t-center">
            <div class="inv-code mono">${o.code}</div>
            <div class="tiny">${fmtDate(o.createdAt)}</div>
          </div>
        </div>
        <table class="inv-table">
          <thead><tr><th>#</th><th>کالا</th><th>تعداد</th><th>فی</th><th>مبلغ</th></tr></thead>
          <tbody>
            ${(o.items || []).map((it, i) => html`<tr>
              <td>${fmtNum(i + 1)}</td><td>${esc(it.name)}${it.sku ? ` <span class="mono tiny">(${it.sku})</span>` : ""}</td>
              <td>${fmtNum(it.qty)}</td><td>${fmtNum(it.price)}</td><td>${fmtNum(it.price * it.qty)}</td>
            </tr>`)}
          </tbody>
        </table>
        <div class="inv-sum">
          <div><span>جمع کالاها</span><span>${fmtNum(o.subtotal)}</span></div>
          ${o.discount ? html`<div><span>تخفیف</span><span>- ${fmtNum(o.discount)}</span></div>` : ""}
          <div><span>هزینهٔ ارسال${o.shippingLabel ? ` (${o.shippingLabel})` : ""}</span><span>${fmtNum(o.shipping)}</span></div>
          ${o.insuranceFee ? html`<div><span>بیمهٔ ارسال</span><span>${fmtNum(o.insuranceFee)}</span></div>` : ""}
          <div class="b"><span>مبلغ کل</span><span>${fmtNum(o.total)}</span></div>
          ${o.walletUsed ? html`<div><span>پرداخت از کیف پول</span><span>- ${fmtNum(o.walletUsed)}</span></div>` : ""}
          <div class="b"><span>قابل پرداخت</span><span>${fmtNum(o.payable)}</span></div>
        </div>
        <div class="inv-foot tiny">
          <div>وضعیت پرداخت: ${o.payment?.status === "paid" ? "\u067E\u0631\u062F\u0627\u062E\u062A\u200C\u0634\u062F\u0647" : o.payment?.status === "pending" ? "\u062F\u0631 \u0627\u0646\u062A\u0638\u0627\u0631" : "\u067E\u0631\u062F\u0627\u062E\u062A\u200C\u0646\u0634\u062F\u0647"} — روش: ${o.payment?.method || "\u2014"}</div>
          <div>${esc(st.name || "")} · این فاکتور به‌صورت خودکار توسط سامانه صادر شده است.</div>
        </div>
      </div>
      <div class="row mt">
        <button class="btn btn-primary" data-act="print-page">${icon("printer")} ${t("common.print")}</button>
      </div>`
      });
    });
    act("od-review", (e, el2) => {
      const productId = el2.dataset.id;
      const name = el2.dataset.name || "";
      const handle = modal({
        title: `${t("pdp.writeReview")} \u2014 ${name}`,
        body: html`
      <form data-act="od-review-send" data-id="${productId}">
        <div class="field"><span class="label">${t("pdp.yourRating")}</span>${starsInput({ name: "rating", value: 5 })}</div>
        ${field2({ label: t("common.title"), name: "title", required: true })}
        ${textareaField({ label: t("common.body"), name: "body", required: true, rows: 5 })}
        <p class="hint mb">${t("pdp.reviewPending")}</p>
        <button class="btn btn-primary btn-block" type="submit">${t("common.submit")}</button>
      </form>`
      });
      void handle;
    });
    act("od-review-send", async (e, form) => {
      e.preventDefault();
      const fd = new FormData(form);
      await withBusy(form.querySelector("button[type=submit]"), async () => {
        try {
          await api.post("/api/reviews", {
            productId: form.dataset.id,
            type: "review",
            rating: Number(fd.get("rating") || 5),
            title: fd.get("title"),
            body: fd.get("body")
          });
          toastSuccess(t("pdp.reviewSubmitted"));
          form.closest(".overlay")?.remove();
        } catch (err) {
          toastApiError(err);
        }
      });
    });
  }
});

// public/js/views/ticket-detail.mjs
var ticket_detail_exports = {};
__export(ticket_detail_exports, {
  mount: () => mount13,
  render: () => render14
});
async function render14(ctx) {
  let ticket = null;
  try {
    ticket = (await api.get(`/api/tickets/${ctx.params.id}`)).ticket;
  } catch (err) {
    return err?.status === 404 ? emptyState({ icon: "ticket", title: t("acc.noTickets"), action: { href: "#/account/tickets", label: t("acc.tickets") } }) : errorState({ title: t("err.generic") });
  }
  pendingFiles = [];
  const sla = (S.ticketPriorities || []).find((p) => p.id === ticket.priority)?.slaHours || 24;
  const closed = ticket.status === "closed";
  return html`
    <div class="breadcrumb mb-s">
      <a href="#/account">${t("acc.title")}</a> <span>/</span>
      <a href="#/account/tickets">${t("acc.tickets")}</a> <span>/</span>
      <span class="mono">${ticket.code}</span>
    </div>

    <div class="card">
      <div class="row row-between row-wrap">
        <div>
          <h1 class="buy-title">${icon("ticket")} ${esc(ticket.subject)}</h1>
          <p class="muted small mt-s">
            <span class="mono">${ticket.code}</span> · ${fmtDate(ticket.createdAt)} ·
            ${t("acc.ticketCategory")}: ${t(`tc.${ticket.category}`)}
          </p>
        </div>
        <div class="row row-wrap">
          <span class="badge-pill ${STATUS_CLASS[ticket.status] || "bp-muted"}">${t(`tk.${ticket.status}`)}</span>
          <span class="badge-pill ${PRI_CLASS[ticket.priority] || "bp-info"}">${t(`tp.${ticket.priority}`)}</span>
          ${!closed ? html`<button class="btn btn-ghost btn-sm" data-act="tk-close" data-id="${ticket.id}">${icon("check")} ${t("acc.ticketClose")}</button>` : ""}
        </div>
      </div>
      <p class="notice notice-info mt-s">${icon("clock")}<span>${t("acc.ticketSla", { h: fmtNum(sla) })}</span></p>
    </div>

    <div class="card mt">
      <strong>${icon("chat")} ${t("common.messages")} (${fmtNum(ticket.messages?.length || 0)})</strong>
      <div class="tk-thread mt-s" data-tk-thread>
        ${(ticket.messages || []).map(messageHtml).join("")}
      </div>

      ${closed ? html`<p class="notice notice-warn mt">${icon("info")}<span>${t("acc.ticketClosedNote")}</span></p>` : ""}
      <form class="mt" data-act="tk-reply" data-id="${ticket.id}">
        ${textareaField({ label: t("acc.ticketWrite"), name: "body", required: true, rows: 4, placeholder: t("acc.chatPlaceholder") })}
        <div data-attach-preview class="row row-wrap mt-s"></div>
        <div class="row row-between row-wrap mt-s">
          <div class="row row-wrap">
            <label class="btn btn-ghost btn-sm" for="tk-file">${icon("upload")} ${t("common.attach")}</label>
            <input id="tk-file" type="file" accept="image/*" multiple hidden data-attach-input>
            <span class="hint">${t("acc.attachHint")}</span>
          </div>
          <button class="btn btn-primary" type="submit">${icon("send")} ${t("common.send")}</button>
        </div>
      </form>
    </div>`;
}
function messageHtml(m) {
  const mine = m.from === "user";
  const cls = m.from === "system" ? "them sys" : mine ? "me" : "them";
  return html`
    <div class="msg ${cls}">
      <div class="msg-bubble">
        <div class="row row-between">
          <strong class="tiny">${esc(mine ? S.me?.name || t("common.user") : m.from === "staff" ? t("common.support") : m.name || "")}</strong>
          <span class="tiny muted nowrap">${timeAgo(m.at)}</span>
        </div>
        <div class="msg-text">${esc(m.body || "").replace(/\n/g, "<br>")}</div>
        ${(m.attachments || []).length ? html`<div class="row row-wrap mt-s">${m.attachments.map((a) => html`<img class="tk-att" src="${a}" alt="${t("common.image")}" loading="lazy" data-act="tk-att-open" data-url="${a}">`)}</div>` : ""}
      </div>
    </div>`;
}
function renderAttachPreview(form) {
  const box = form.querySelector("[data-attach-preview]");
  if (!box) return;
  box.innerHTML = pendingFiles.map((f, i) => html`
    <span class="att-chip">
      <img src="${f.url}" alt="${esc(f.name)}">
      <button type="button" class="att-x" data-act="tk-att-del" data-i="${i}" aria-label="${t("common.delete")}">${icon("close")}</button>
    </span>`).join("");
}
function mount13(root, ctx) {
  applyDyn(root);
  const input = root.querySelector("[data-attach-input]");
  if (input) input.addEventListener("change", (e) => {
    const fn = getAct("tk-attach-pick");
    fn?.(e, e.target);
  });
  const thread = root.querySelector("[data-tk-thread]");
  if (thread) thread.scrollTop = thread.scrollHeight;
  void ctx;
  return null;
}
var STATUS_CLASS, PRI_CLASS, pendingFiles;
var init_ticket_detail = __esm({
  "public/js/views/ticket-detail.mjs"() {
    init_dom();
    init_i18n();
    init_api();
    init_state();
    init_components();
    init_ui();
    init_actions();
    init_router();
    STATUS_CLASS = { open: "bp-warn", answered: "bp-success", closed: "bp-muted", in_progress: "bp-info", new: "bp-info" };
    PRI_CLASS = { critical: "bp-danger", high: "bp-warn", normal: "bp-info", low: "bp-muted" };
    pendingFiles = [];
    act("tk-att-open", (e, el2) => {
      const all = [...document.querySelectorAll("[data-tk-thread] .tk-att")];
      const urls2 = all.map((x) => x.getAttribute("src"));
      lightbox(urls2.length ? urls2 : [el2.getAttribute("src")], Math.max(0, urls2.indexOf(el2.getAttribute("src"))));
    });
    act("tk-attach-pick", async (e, el2) => {
      const form = el2.closest("form");
      const files = [...el2.files || []].slice(0, 4 - pendingFiles.length);
      el2.value = "";
      for (const f of files) {
        if (f.size > 4 * 1024 * 1024) {
          toastError2(t("err.tooLarge"));
          continue;
        }
        try {
          const dataUrl = await fileToDataURL(f);
          const r = await api.upload(dataUrl);
          pendingFiles.push({ url: r.url, name: f.name });
        } catch (err) {
          toastApiError(err);
        }
      }
      renderAttachPreview(form);
    });
    act("tk-att-del", (e, el2) => {
      pendingFiles.splice(Number(el2.dataset.i), 1);
      renderAttachPreview(el2.closest("form"));
    });
    act("tk-reply", async (e, form) => {
      e.preventDefault();
      const body = String(new FormData(form).get("body") || "").trim();
      if (body.length < 2) {
        toastError2(t("acc.ticketBodyShort"));
        return;
      }
      const btn = form.querySelector("button[type=submit]");
      await withBusy(btn, async () => {
        try {
          const r = await api.post(`/api/tickets/${form.dataset.id}/messages`, {
            body,
            attachments: pendingFiles.map((f) => f.url)
          });
          pendingFiles = [];
          const thread = form.closest(".card").querySelector("[data-tk-thread]");
          if (thread) {
            thread.innerHTML = (r.ticket?.messages || []).map(messageHtml).join("");
            thread.scrollTop = thread.scrollHeight;
          }
          form.reset();
          renderAttachPreview(form);
          toastSuccess(t("common.sent"));
          loadNotifications(true);
        } catch (err) {
          toastApiError(err);
        }
      });
    });
    act("tk-close", async (e, el2) => {
      const ok = await confirmDialog({ text: t("acc.ticketCloseConfirm"), okText: t("acc.ticketClose") });
      if (!ok) return;
      await withBusy(el2, async () => {
        try {
          await api.post(`/api/tickets/${el2.dataset.id}/close`, {});
          toastSuccess(t("common.done"));
          refresh(true);
        } catch (err) {
          toastApiError(err);
        }
      });
    });
  }
});

// public/js/views/stats.mjs
var stats_exports = {};
__export(stats_exports, {
  render: () => render15
});
async function render15() {
  let data2 = null;
  try {
    data2 = await api.get("/api/stats/public");
  } catch {
  }
  if (!data2) return html`<div class="empty"><h4>${t("err.network")}</h4></div>`;
  const stats2 = data2.stats || {};
  const chart = data2.chart || [];
  const topProducts = data2.topProducts || [];
  const max = Math.max(1, ...chart.map((c) => c.visits));
  const bars = chart.map((c) => {
    const step = Math.min(12, Math.max(1, Math.round(c.visits / max * 12)));
    return html`<div class="ch-col" title="${c.date}: ${faDigits(c.visits)}">
      <i class="hb-${step}"></i>
      <span>${faDigits(Number(c.date.slice(8, 10)))}</span>
    </div>`;
  }).join("");
  return html`
    <div class="page-head">
      <h1 class="page-h1">${icon("chart")} ${t("stats.title")}</h1>
      <p class="muted small">${t("stats.subtitle")}</p>
    </div>

    <section class="section">
      <div class="stats-grid">
        ${statCard({ icon: "box", label: t("stats.products"), value: fmtNum(stats2.products) })}
        ${statCard({ icon: "grid", label: t("stats.categories"), value: fmtNum(stats2.categories) })}
        ${statCard({ icon: "cart", label: t("stats.ordersTotal"), value: fmtNum(stats2.ordersTotal) })}
        ${statCard({ icon: "package-check", label: t("stats.delivered"), value: fmtNum(stats2.deliveredOrders) })}
        ${statCard({ icon: "users", label: t("stats.customers"), value: fmtNum(stats2.customers) })}
        ${statCard({ icon: "eye", label: t("stats.visitsTotal"), value: fmtNum(stats2.visitsTotal) })}
        ${statCard({ icon: "chart", label: t("stats.visitsToday"), value: fmtNum(stats2.visitsToday) })}
        ${statCard({ icon: "sparkles", label: t("stats.plusMembers"), value: fmtNum(stats2.plusMembers) })}
      </div>
    </section>

    <section class="section">
      ${sectionHead({ titleIcon: "chart", title: t("stats.chartTitle") })}
      <div class="card chart-card">
        <div class="chart">${bars}</div>
        <p class="hint mt-s">${t("stats.chartHint")}</p>
      </div>
    </section>

    ${topProducts?.length ? html`
    <section class="section">
      ${sectionHead({ titleIcon: "star", title: t("stats.topTitle") })}
      <div class="list">
        ${topProducts.map((p, i) => html`
          <a class="list-row" href="#/product/${p.id}">
            <span class="rank">${faDigits(i + 1)}</span>
            <span class="grow">
              <span class="b">${isFa2() ? p.name : p.nameEn || p.name}</span>
              <span class="muted tiny">${isFa2() ? p.categoryName : p.categoryNameEn || p.categoryName}</span>
            </span>
            <span class="muted small">${icon("eye")} ${faDigits(p.sold || 0)}</span>
          </a>`)}
      </div>
    </section>` : ""}
  `;
}
var init_stats = __esm({
  "public/js/views/stats.mjs"() {
    init_dom();
    init_i18n();
    init_state();
    init_api();
    init_components();
  }
});

// public/js/views/page.mjs
var page_exports = {};
__export(page_exports, {
  mount: () => mount14,
  render: () => render16,
  title: () => title12
});
function hero(page, extra = "") {
  if (!page?.hero) return "";
  return html`
    <div class="page-hero mb">
      <h1 class="page-title">${esc(fa2(page.hero, "title"))}</h1>
      ${fa2(page.hero, "subtitle") ? html`<p class="page-sub">${esc(fa2(page.hero, "subtitle"))}</p>` : ""}
      ${extra}
    </div>`;
}
function sectionCards(sections) {
  if (!sections?.length) return "";
  return sections.map((s) => html`
    <div class="card mt">
      <h2 class="page-h2">${esc(fa2(s, "title"))}</h2>
      ${s.body || s.bodyEn ? html`<div class="page-body"><p>${esc(fa2(s, "body"))}</p></div>` : ""}
      ${bullets(list(s, "list").length ? list(s, "list") : s.list || [])}
    </div>`).join("");
}
async function render16(ctx) {
  const key = String(ctx.params.key || "");
  let data2 = null;
  try {
    data2 = await api.get(`/api/pages/${key}`);
  } catch {
  }
  if (!data2?.page) return emptyState({ icon: "file", title: t("err.notFound"), text: t("err.notFoundText"), action: { href: "#/", label: t("err.goHome") } });
  const page = data2.page;
  if (Array.isArray(page)) return faqHtml(page);
  switch (key) {
    case "about":
      return aboutHtml(page);
    case "guide":
      return guideHtml(page);
    case "service":
      return serviceHtml(page);
    case "contact":
      return contactHtml(page);
    case "bugReport":
      return bugHtml(page);
    default:
      return textHtml(page);
  }
}
async function aboutHtml(page) {
  let stats2 = null;
  if (feat("publicStats")) {
    try {
      stats2 = (await api.get("/api/stats/public")).stats;
    } catch {
    }
  }
  return html`
    ${hero(page)}
    ${stats2 && page.stats?.length ? html`
      <div class="section-head"><div><h2 class="section-title">${icon("chart")} ${t("page.statsTitle")}</h2></div></div>
      <div class="stats-grid">
        ${page.stats.map((s) => statCard({
    icon: statIcon(s.key),
    label: isFa2() ? s.fa : s.en || s.fa,
    value: fmtNum(Number(stats2[s.key] || 0))
  }))}
      </div>` : ""}
    ${sectionCards(page.sections)}
    <div class="card mt t-center">
      <strong>${icon("heart")} ${t("page.aboutCta")}</strong>
      <div class="row center row-wrap mt-s">
        <a class="btn btn-primary" href="#/products">${icon("cart")} ${t("cart.goShopping")}</a>
        <a class="btn btn-ghost" href="#/pages/contact">${icon("phone")} ${t("contact.title")}</a>
        <a class="btn btn-ghost" href="#/pages/guide">${icon("file")} ${t("footer.guide")}</a>
      </div>
    </div>`;
}
function statIcon(key) {
  return { years: "clock", products: "box", orders: "package-check", customers: "users", visits: "eye" }[key] || "chart";
}
function guideHtml(page) {
  return html`
    ${hero(page)}
    ${page.steps?.length ? html`
      <div class="section-head"><div><h2 class="section-title">${icon("list")} ${t("page.stepsTitle")}</h2></div></div>
      <ol class="steps-list">
        ${page.steps.map((s) => html`
          <li class="card step-item">
            <div class="grow">
              <strong>${esc(fa2(s, "title"))}</strong>
              <p class="muted small mt-s">${esc(fa2(s, "body"))}</p>
              ${bullets(list(s, "list").length ? list(s, "list") : s.list || [])}
            </div>
          </li>`)}
      </ol>` : ""}
    ${page.tips?.length ? html`
      <div class="card mt">
        <h2 class="page-h2">${icon("zap")} ${t("page.tipsTitle")}</h2>
        ${bullets((isFa2() ? page.tips : page.tips).map((x) => isFa2() ? x.fa : x.en || x.fa))}
      </div>` : ""}
    <div class="row row-wrap mt">
      <a class="btn btn-primary" href="#/products">${t("cart.goShopping")}</a>
      <a class="btn btn-ghost" href="#/pages/faq">${icon("info")} ${t("footer.faq")}</a>
    </div>`;
}
function serviceHtml(page) {
  return html`
    ${hero(page)}
    <div class="pwa-grid">
      ${(page.items || []).map((it) => html`
        <div class="pwa-card">
          <span class="pwa-ic">${icon(it.icon || "check")}</span>
          <div>
            <strong>${esc(fa2(it, "title"))}</strong>
            <p class="muted small mt-s">${esc(fa2(it, "body"))}</p>
            ${bullets(list(it, "list").length ? list(it, "list") : it.list || [])}
          </div>
        </div>`)}
    </div>
    ${sectionCards(page.sections)}`;
}
function textHtml(page) {
  return html`
    ${hero(page)}
    ${page.intro || page.introEn ? html`<p class="page-lead">${esc(isFa2() ? page.intro : page.introEn || page.intro)}</p>` : ""}
    ${page.body || page.bodyEn ? html`<div class="card"><div class="page-body"><p>${esc(isFa2() ? page.body : page.bodyEn || page.body)}</p></div></div>` : ""}
    ${page.rules?.length || page.rulesEn?.length ? html`
      <div class="card mt">
        <h2 class="page-h2">${icon("check")} ${t("page.rulesTitle")}</h2>
        ${bullets(isFa2() ? page.rules : page.rulesEn || page.rules)}
      </div>` : ""}
    ${sectionCards(page.sections)}
    ${page.notice || page.noticeEn ? html`<p class="notice notice-warn mt">${icon("info")}<span>${esc(isFa2() ? page.notice : page.noticeEn || page.notice)}</span></p>` : ""}
    <div class="row row-wrap mt">
      <a class="btn btn-ghost" href="#/pages/terms">${icon("file")} ${t("footer.terms")}</a>
      <a class="btn btn-ghost" href="#/pages/privacy">${icon("shield")} ${t("footer.privacy")}</a>
      <a class="btn btn-ghost" href="#/pages/insurance">${icon("truck")} ${t("footer.insurance")}</a>
      <a class="btn btn-ghost" href="#/pages/ticketRules">${icon("ticket")} ${t("acc.ticketViewRules")}</a>
    </div>
    ${(page.id === "terms" || page.id === "privacy") && !hasConsent() ? html`
      <div class="card mt bg-shade">
        <p class="mb-s b">${isFa2() ? "\u0622\u06CC\u0627 \u0642\u0648\u0627\u0646\u06CC\u0646 \u0631\u0627 \u0645\u0637\u0627\u0644\u0639\u0647 \u06A9\u0631\u062F\u06CC\u062F\u061F" : "Have you read the terms?"}</p>
        <button type="button" class="btn btn-primary" data-act="accept-consent-now">${icon("check")} ${t("consent.accept")}</button>
      </div>
    ` : ""}
    `;
}
function bugHtml(page) {
  return html`
    ${hero(page)}
    ${page.body || page.bodyEn ? html`<p class="page-lead">${esc(isFa2() ? page.body : page.bodyEn || page.body)}</p>` : ""}
    ${page.hints?.length ? html`
      <div class="card">
        <h2 class="page-h2">${icon("info")} ${t("page.hintsTitle")}</h2>
        ${bullets(isFa2() ? page.hints : page.hintsEn || page.hints)}
      </div>` : ""}
    <form class="card mt" data-act="page-feedback">
      <input type="hidden" name="type" value="bug">
      <h2 class="page-h2">${icon("bug")} ${t("page.bugTitle")}</h2>
      ${field2({ label: t("common.title"), name: "title", required: true })}
      ${textareaField({ label: t("common.body"), name: "body", required: true, rows: 6 })}
      ${field2({ label: t("acc.feedbackContact"), name: "contact", hint: t("acc.feedbackContactHint"), value: S.me?.phone || S.me?.email || "" })}
      <button class="btn btn-primary" type="submit">${icon("send")} ${t("common.submit")}</button>
    </form>`;
}
function contactHtml(page) {
  const st = store();
  const socials = st.socials || {};
  const socialList = [
    { key: "instagram", icon: "camera", url: safeHref(socials.instagram) },
    { key: "telegram", icon: "send", url: safeHref(socials.telegram) },
    { key: "eitaa", icon: "message", url: safeHref(socials.eitaa) },
    { key: "whatsapp", icon: "chat", url: st.whatsapp ? `https://wa.me/${String(st.whatsapp).replace(/\D/g, "")}` : "" }
  ].filter((x) => x.url);
  return html`
    ${hero(page)}
    <div class="acc-grid">
      <div class="col">
        <div class="card">
          <h2 class="page-h2">${icon("pin")} ${t("contact.addressUs")}</h2>
          <p class="page-body">${esc(isFa2() ? st.address : st.addressEn || st.address)}</p>
          <div class="row row-wrap mt-s">
            <button class="btn btn-ghost btn-sm" data-act="copy" data-text="${esc(isFa2() ? st.address : st.addressEn || st.address)}">${icon("copy")} ${t("contact.copyAddress")}</button>
            ${st.phone ? html`<a class="btn btn-primary btn-sm" href="tel:${st.phone}">${icon("phone")} ${t("contact.callNow")}</a>` : ""}
            ${st.email ? html`<a class="btn btn-ghost btn-sm" href="mailto:${st.email}">${icon("mail")} ${t("contact.emailUs")}</a>` : ""}
          </div>
          <div class="contact-list mt">
            ${st.phone ? html`<div class="row"><span class="muted small">${t("contact.phone")}</span><a class="mono" href="tel:${st.phone}">${fmtTel(st.phone)}</a></div>` : ""}
            ${st.phone2 ? html`<div class="row"><span class="muted small">${t("contact.mobile")}</span><a class="mono" href="tel:${st.phone2}">${fmtTel(st.phone2)}</a></div>` : ""}
            ${st.phone3 ? html`<div class="row"><span class="muted small">${t("contact.phone3")}</span><a class="mono" href="tel:${st.phone3}">${fmtTel(st.phone3)}</a></div>` : ""}
            ${st.whatsapp ? html`<div class="row"><span class="muted small">${t("contact.whatsapp")}</span><span class="mono">${fmtTel(st.whatsapp)}</span></div>` : ""}
            ${st.email ? html`<div class="row"><span class="muted small">${t("common.email")}</span><span class="mono small">${esc(st.email)}</span></div>` : ""}
          </div>
          ${socialList.length ? html`<div class="row row-wrap mt-s">${socialList.map((s) => html`<a class="btn btn-ghost btn-sm" href="${esc(s.url)}" target="_blank" rel="noopener">${icon(s.icon)} ${t("social." + s.key)}</a>`)}</div>` : ""}
        </div>

        <div class="card mt">
          <h2 class="page-h2">${icon("clock")} ${t("footer.workingHours")}</h2>
          ${(st.workingHours || []).map((w) => html`
            <div class="row row-between mt-s">
              <span class="small">${esc(isFa2() ? w.fa || w.day : w.en || w.day)}</span>
              <span class="small b mono">${esc(isFa2() ? w.time : w.timeEn || w.time)}</span>
            </div>`)}
        </div>

        <form class="card mt" data-act="page-feedback">
          <input type="hidden" name="type" value="suggestion">
          <h2 class="page-h2">${icon("chat")} ${t("contact.formTitle")}</h2>
          <p class="muted small mb-s">${t("contact.formText")}</p>
          ${field2({ label: t("common.title"), name: "title", required: true })}
          ${textareaField({ label: t("common.message"), name: "body", required: true, rows: 5 })}
          ${field2({ label: t("acc.feedbackContact"), name: "contact", value: S.me?.phone || S.me?.email || "" })}
          <button class="btn btn-primary" type="submit">${icon("send")} ${t("common.send")}</button>
        </form>
      </div>

      <aside class="col">
        ${safeHref(socials.telegram) ? html`
        <div class="card">
          <h2 class="page-h2">${icon("send")} ${t("contact.tgBotTitle")}</h2>
          <p class="muted small">${t("contact.tgBotText")}</p>
          <a class="btn btn-primary btn-sm mt-s" href="${esc(safeHref(socials.telegram))}" target="_blank" rel="noopener">${icon("send")} ${t("contact.tgBotBtn")}</a>
        </div>` : ""}

        <div class="card ${safeHref(socials.telegram) ? "mt" : ""}">
          <h2 class="page-h2">${icon("map")} ${t("contact.mapTitle")}</h2>
          <div class="minimap" data-act="open-map" role="button" tabindex="0" aria-label="${t("contact.mapTitle")}">
            ${raw(minimapSvg())}
            <span class="minimap-hint">${icon("pin")} ${t("contact.mapHint")}</span>
          </div>
          <p class="hint mt-s">${t("contact.mapAsk")}</p>
          <button class="btn btn-outline btn-block mt-s" data-act="open-map">${icon("map")} ${t("contact.openMaps")}</button>
        </div>

        ${feat("liveSupport") ? html`
        <div class="card mt">
          <h2 class="page-h2">${icon("headset")} ${t("common.support")}</h2>
          <p class="muted small">${t("acc.chatTitle")}</p>
          <div class="row row-wrap mt-s">
            ${S.me ? html`<button class="btn btn-primary btn-sm" data-act="chat-open">${icon("headset")} ${t("acc.chatTitle")}</button>` : html`<a class="btn btn-primary btn-sm" href="#/auth">${icon("user")} ${t("nav.login")}</a>`}
            ${feat("tickets") ? html`<a class="btn btn-ghost btn-sm" href="#/account/tickets">${icon("ticket")} ${t("common.ticket")}</a>` : ""}
          </div>
        </div>` : ""}

        <div class="card mt">
          <h2 class="page-h2">${icon("info")} ${t("footer.faq")}</h2>
          <p class="muted small">${t("faq.askText")}</p>
          <a class="btn btn-ghost btn-sm mt-s" href="#/pages/faq">${t("footer.faq")}</a>
        </div>
      </aside>
    </div>`;
}
function faqHtml(items) {
  const cats = [...new Set(items.map((x) => x.cat || "other"))];
  return html`
    <div class="page-hero mb">
      <h1 class="page-title">${icon("info")} ${t("footer.faq")}</h1>
      <p class="page-sub">${t("faq.askText")}</p>
    </div>
    <div class="field mb">
      <input class="input" type="search" id="faq-q" placeholder="${t("faq.search")}" data-faq-q autocomplete="off">
    </div>
    <div class="row row-wrap mb" data-faq-cats>
      <button type="button" class="chip active" data-act="faq-cat" data-cat="">${t("faq.all")}</button>
      ${cats.map((c) => html`<button type="button" class="chip" data-act="faq-cat" data-cat="${c}">${t(`faq.cat.${c}`)}</button>`)}
    </div>
    <p class="muted small mb-s" data-faq-count>${t("faq.results", { n: fmtNum(items.length) })}</p>
    <div class="accordion" data-faq-list>
      ${items.map((f, i) => html`
        <div class="acc-item" data-cat="${f.cat || "other"}" data-text="${esc(((isFa2() ? f.q : f.qEn) + " " + (isFa2() ? f.a : f.aEn)).toLowerCase())}">
          <button class="acc-h" type="button" aria-expanded="false">
            <span class="b">${esc(isFa2() ? f.q : f.qEn || f.q)}</span>
            ${icon("chevron-down")}
          </button>
          <div class="acc-b" hidden><div class="page-body"><p>${esc(isFa2() ? f.a : f.aEn || f.a)}</p></div></div>
        </div>`)}
    </div>
    <div class="card mt t-center" data-faq-empty hidden>
      <p class="muted">${t("faq.notFound")}</p>
      <div class="row center row-wrap mt-s">
        ${S.me && feat("liveSupport") ? html`<button class="btn btn-primary btn-sm" data-act="chat-open">${icon("headset")} ${t("acc.chatTitle")}</button>` : ""}
        ${feat("tickets") ? html`<a class="btn btn-ghost btn-sm" href="#/account/tickets">${icon("ticket")} ${t("acc.ticketNew")}</a>` : ""}
      </div>
    </div>`;
}
function filterFaq() {
  const root = document.querySelector("[data-faq-list]");
  if (!root) return;
  const q = (document.querySelector("[data-faq-q]")?.value || "").trim().toLowerCase();
  const cat = document.querySelector("[data-faq-cats] .chip.active")?.dataset.cat || "";
  let shown = 0;
  root.querySelectorAll(".acc-item").forEach((it) => {
    const okCat = !cat || it.dataset.cat === cat;
    const okQ = !q || (it.dataset.text || "").includes(q);
    const show = okCat && okQ;
    it.hidden = !show;
    if (show) shown += 1;
  });
  const count = document.querySelector("[data-faq-count]");
  if (count) count.textContent = t("faq.results", { n: fmtNum(shown) });
  const empty = document.querySelector("[data-faq-empty]");
  if (empty) empty.hidden = shown !== 0;
}
function mount14(root, ctx) {
  applyDyn(root);
  wireAccordions(root);
  const q = root.querySelector("[data-faq-q]");
  if (q) {
    let timer = 0;
    q.addEventListener("input", () => {
      clearTimeout(timer);
      timer = setTimeout(filterFaq, 160);
    });
  }
  void ctx;
  return null;
}
var fa2, list, bullets, title12;
var init_page = __esm({
  "public/js/views/page.mjs"() {
    init_dom();
    init_i18n();
    init_api();
    init_state();
    init_components();
    init_ui();
    init_actions();
    fa2 = (o, k) => isFa2() ? o?.[k] ?? "" : o?.[`${k}En`] ?? o?.[k] ?? "";
    list = (o, k) => isFa2() ? o?.[k] || [] : o?.[`${k}En`] || o?.[k] || [];
    bullets = (arr, cls = "dot-list") => arr?.length ? html`<ul class="${cls}">${arr.map((x) => html`<li>${typeof x === "string" ? esc(x) : esc(fa2(x, "fa") || x.title || "")}</li>`)}</ul>` : "";
    act("page-feedback", async (e, form) => {
      e.preventDefault();
      const fd = new FormData(form);
      await withBusy(form.querySelector("button[type=submit]"), async () => {
        try {
          await api.post("/api/feedback", {
            type: fd.get("type") || "suggestion",
            title: fd.get("title"),
            body: fd.get("body"),
            contact: fd.get("contact") || ""
          });
          toastSuccess(t("acc.feedbackSent"));
          form.reset();
        } catch (err) {
          toastApiError(err);
        }
      });
    });
    act("faq-cat", (e, el2) => {
      const wrap = el2.closest("[data-faq-cats]");
      wrap.querySelectorAll(".chip").forEach((c) => c.classList.toggle("active", c === el2));
      filterFaq();
    });
    title12 = () => t("common.page");
  }
});

// public/js/views/admin/dashboard.mjs
var dashboard_exports = {};
__export(dashboard_exports, {
  mount: () => mount15,
  render: () => render17
});
async function render17() {
  let d = null;
  try {
    d = await api.get("/api/admin/overview");
  } catch (err) {
    return errorState({ title: err?.message || t("err.generic") });
  }
  const s = d.stats || {};
  const chart = (d.chart || []).map((c) => ({ label: c.date, short: c.date.slice(8), value: c.visits || 0 }));
  if (can("users.view")) startSecPoll();
  return html`
    <div class="kpi-grid">
      ${kpiCard({ label: t("adm.kpi.ordersToday"), value: fmtNum(d.today?.orders || 0), sub: fmtMoney(d.today?.revenue || 0) })}
      ${kpiCard({ label: t("adm.kpi.visits"), value: fmtNum(d.today?.visits || 0), sub: `${t("stats.visitsTotal")}: ${fmtNum(s.visitsTotal || 0)}` })}
      ${kpiCard({ label: t("adm.kpi.revenueTotal"), value: fmtMoney(d.totals?.revenue || 0), sub: `${fmtNum(d.totals?.orders || 0)} ${t("common.orders")}` })}
      ${kpiCard({ label: t("adm.kpi.pending"), value: fmtNum(s.pendingOrders || 0), sub: t("adm.awaiting.orders") })}
      ${kpiCard({ label: t("adm.kpi.products"), value: fmtNum(s.products || 0), sub: `${fmtNum(s.outOfStock || 0)} ${t("stats.outOfStock")}` })}
      ${kpiCard({ label: t("adm.kpi.users"), value: fmtNum(s.customers || 0), sub: `${fmtNum(s.plusMembers || 0)} ${t("stats.plusMembers")}` })}
      ${kpiCard({ label: t("adm.kpi.lowStock"), value: fmtNum((d.lowStock || []).length), sub: t("adm.lowStockList") })}
      ${kpiCard({ label: t("adm.storage"), value: `${fmtNum(d.storage?.sizeKb || 0)} KB`, sub: "db.json" })}
    </div>

    <div class="section-head mt"><div><h2 class="section-title">${icon("alert")} ${t("adm.awaiting")}</h2></div></div>
    <div class="kpi-grid">
      ${can("reviews.moderate") ? awaitCard("star", t("adm.awaiting.reviews"), d.awaiting?.reviews, "#/admin/reviews") : ""}
      ${can("tickets.manage") ? awaitCard("ticket", t("adm.awaiting.tickets"), d.awaiting?.tickets, "#/admin/tickets") : ""}
      ${can("orders.view") ? awaitCard("package-check", t("adm.awaiting.orders"), d.awaiting?.orders, "#/admin/orders") : ""}
      ${can("feedback.manage") ? awaitCard("flag", t("adm.awaiting.feedback"), d.awaiting?.feedback, "#/admin/feedback") : ""}
      ${can("tickets.manage") ? awaitCard("headset", t("adm.awaiting.chat"), d.awaiting?.support, "#/admin/support") : ""}
    </div>

    <div class="card mt">
      <strong>${icon("chart")} ${t("adm.chart")}</strong>
      ${chart.length ? barChart(chart, { height: 140 }) : html`<p class="muted small">${t("common.noData")}</p>`}
    </div>

    <div class="acc-grid acc-grid-eq mt">
      <div class="card">
        <strong>${icon("star")} ${t("adm.topSelling")}</strong>
        ${tableHtml(
    [{ label: "" }, { label: t("adm.pName") }, { label: t("pdp.sold"), cls: "num" }, { label: t("common.stock"), cls: "num" }, { label: t("common.price"), cls: "num" }],
    (d.topSelling || []).map((p) => html`
            <tr>
              <td><span class="cl-img" data-h="42px" data-w="42px">${productImage({ ...p, images: p.image ? [p.image] : [] })}</span></td>
              <td><a class="b" href="#/admin/products/${p.id}">${esc(isFa2() ? p.name : p.name)}</a></td>
              <td class="num">${fmtNum(p.sold)}</td>
              <td class="num">${fmtNum(p.stock)}</td>
              <td class="num">${fmtMoney(p.price)}</td>
            </tr>`),
    { emptyText: t("common.noData") }
  )}
      </div>
      <div class="card">
        <strong>${icon("box")} ${t("adm.lowStockList")}</strong>
        ${tableHtml(
    [{ label: t("adm.pName") }, { label: t("common.available"), cls: "num" }, { label: "" }],
    (d.lowStock || []).map((p) => html`
            <tr>
              <td class="nowrap">${esc(p.name)}</td>
              <td class="num"><span class="badge-pill ${p.inStock ? "bp-warn" : "bp-danger"}">${fmtNum(Math.max(0, (p.stock || 0) - (p.reserved || 0)))}</span></td>
              <td><a class="btn btn-ghost btn-xs" href="#/admin/products/${p.id}">${t("common.edit")}</a></td>
            </tr>`),
    { emptyText: t("common.noData") }
  )}
      </div>
    </div>

    ${can("users.view") || can("settings.edit") ? html`
    <div class="acc-grid acc-grid-eq mt">
      ${can("users.view") ? html`
      <div class="card" id="secLiveCard">
        <div class="row row-between">
          <strong>${icon("shield")} ${t("adm.secTitle")}</strong>
          <span class="badge-pill bp-success tiny" id="secState">…</span>
        </div>
        <div class="kpi-grid mt-s" id="secKpis"></div>
        <div class="mt-s" id="secTop"></div>
        ${can("settings.edit") ? html`
        <form class="form-grid mt" id="secForm" data-act="adm-sec-save">
          ${switchField({ label: t("adm.secQueueEnabled"), desc: t("adm.secQueueDesc"), name: "queueEnabled", checked: true })}
          ${field2({ label: t("adm.secMaxConc"), name: "maxConcurrent", type: "number", value: "80", attrs: 'min="5" max="5000" inputmode="numeric"' })}
          ${field2({ label: t("adm.secTriggerRps"), name: "triggerRps", type: "number", value: "40", attrs: 'min="5" max="2000" inputmode="numeric"' })}
          ${field2({ label: t("adm.secPassTtl"), name: "passTtlMin", type: "number", value: "30", attrs: 'min="5" max="240" inputmode="numeric"' })}
          ${field2({ label: t("adm.secPoll"), name: "pollSec", type: "number", value: "4", attrs: 'min="2" max="20" inputmode="numeric"' })}
          ${field2({ label: t("adm.secFloodBan"), name: "floodBanPerMin", type: "number", value: "2500", attrs: 'min="500" max="100000" inputmode="numeric"' })}
          ${field2({ label: t("adm.secFloodMin"), name: "floodBanMin", type: "number", value: "15", attrs: 'min="1" max="1440" inputmode="numeric"' })}
          <button class="btn btn-primary btn-sm span-2" type="submit">${icon("save")} ${t("common.save")}</button>
        </form>` : ""}
      </div>` : ""}
      ${can("settings.edit") ? html`
      <div class="card">
        <strong>${icon("terminal")} ${t("adm.console")}</strong>
        <p class="muted small mt-s">${t("adm.consoleHint")}</p>
        <button class="btn btn-danger btn-sm mt-s" data-act="adm-sys-restart">${icon("zap")} ${t("adm.sysRestart")}</button>
        <p class="muted small mt">${t("adm.sysResetLabel")}</p>
        <div class="row row-wrap mt-s">
          <button class="btn btn-ghost btn-xs" data-act="adm-sys-reset" data-what="audit">${t("adm.sysReset.audit")}</button>
          <button class="btn btn-ghost btn-xs" data-act="adm-sys-reset" data-what="carts">${t("adm.sysReset.carts")}</button>
          <button class="btn btn-ghost btn-xs" data-act="adm-sys-reset" data-what="visits">${t("adm.sysReset.visits")}</button>
          <button class="btn btn-ghost btn-xs" data-act="adm-sys-reset" data-what="visitors">${t("adm.sysReset.visitors")}</button>
        </div>
      </div>` : ""}
    </div>` : ""}

    ${can("audit.view") ? html`
    <div class="card mt">
      <div class="row row-between">
        <strong>${icon("history")} ${t("adm.recentAudit")}</strong>
        <a class="section-link" href="#/admin/audit">${t("common.showAll")}</a>
      </div>
      ${tableHtml(
    [{ label: t("common.date") }, { label: t("adm.auditActor") }, { label: t("adm.auditAction") }, { label: t("adm.auditTarget") }],
    (d.recentAudit || []).map((a) => html`
          <tr>
            <td class="nowrap tiny">${timeAgo(a.at)}</td>
            <td class="tiny">${esc(a.actorName || "")} <span class="muted">(${esc(a.actorRole || "")})</span></td>
            <td class="mono tiny">${esc(a.action || "")}</td>
            <td class="tiny muted">${esc(String(a.target || "").slice(0, 40))}</td>
          </tr>`),
    { emptyText: t("common.noData") }
  )}
    </div>` : ""}`;
}
function awaitCard(ic, label, count, href2) {
  return html`
    <a class="kpi await-card ${count > 0 ? "hot" : ""}" href="${href2}">
      <div class="l">${icon(ic)} ${label}</div>
      <div class="v">${fmtNum(count || 0)}</div>
    </a>`;
}
async function refreshSec() {
  const card = document.getElementById("secLiveCard");
  if (!card) {
    if (++secMisses >= 3 && secTimer) {
      clearInterval(secTimer);
      secTimer = 0;
    }
    return;
  }
  secMisses = 0;
  let d;
  try {
    d = await api.get("/api/admin/system/load");
  } catch {
    return;
  }
  const kpis = document.getElementById("secKpis");
  if (kpis) kpis.innerHTML = [
    `<div class="kpi"><div class="l">${t("adm.secInflight")}</div><div class="v">${fmtNum(d.inflight)}</div></div>`,
    `<div class="kpi"><div class="l">${t("adm.secRps")}</div><div class="v">${fmtNum(d.rps)}</div></div>`,
    `<div class="kpi"><div class="l">${t("adm.secQueued")}</div><div class="v ${d.queued > 0 ? "hot" : ""}">${fmtNum(d.queued)}</div></div>`,
    `<div class="kpi"><div class="l">${t("adm.secAutoBans")}</div><div class="v">${fmtNum((d.autoBans || []).length)}</div></div>`
  ].join("");
  const top = document.getElementById("secTop");
  if (top) {
    top.innerHTML = (d.top || []).length ? `<div class="muted tiny">${t("adm.secTop")}</div><div class="table-wrap"><table class="table"><thead><tr><th>IP</th><th class="num">${t("adm.secPerMin")}</th></tr></thead><tbody>${d.top.map((x) => `<tr><td class="mono tiny">${esc(x.ip)}</td><td class="num tiny">${fmtNum(x.perMin)}</td></tr>`).join("")}</tbody></table></div>` : `<p class="muted tiny">${t("adm.secTopEmpty")}</p>`;
  }
  const st = document.getElementById("secState");
  if (st) {
    const busy2 = d.queued > 0 || d.inflight > (d.sec?.maxConcurrent || 80) || d.rps > (d.sec?.triggerRps || 40);
    st.textContent = busy2 ? t("adm.secBusy") : t("adm.secNormal");
    st.className = `badge-pill tiny ${busy2 ? "bp-warn" : "bp-success"}`;
  }
  const form = document.getElementById("secForm");
  if (form && !form.dataset.filled) {
    form.dataset.filled = "1";
    for (const k of ["maxConcurrent", "triggerRps", "passTtlMin", "pollSec", "floodBanPerMin", "floodBanMin"]) {
      const inp = form.elements[k];
      if (inp && d.sec?.[k] != null) inp.value = d.sec[k];
    }
    const sw = form.elements["queueEnabled"];
    if (sw) sw.checked = !!d.sec?.queueEnabled;
  }
}
function startSecPoll() {
  if (secTimer) clearInterval(secTimer);
  secMisses = 0;
  setTimeout(refreshSec, 400);
  secTimer = setInterval(refreshSec, 5e3);
}
function mount15() {
  return null;
}
var secTimer, secMisses;
var init_dashboard = __esm({
  "public/js/views/admin/dashboard.mjs"() {
    init_dom();
    init_i18n();
    init_api();
    init_actions();
    init_state();
    init_components();
    init_ui();
    secTimer = 0;
    secMisses = 0;
    act("adm-sec-save", async (e, form) => {
      e.preventDefault();
      const value = {
        queueEnabled: form.elements["queueEnabled"]?.checked ?? true,
        maxConcurrent: Number(form.elements["maxConcurrent"]?.value) || 80,
        triggerRps: Number(form.elements["triggerRps"]?.value) || 40,
        passTtlMin: Number(form.elements["passTtlMin"]?.value) || 30,
        pollSec: Number(form.elements["pollSec"]?.value) || 4,
        floodBanPerMin: Number(form.elements["floodBanPerMin"]?.value) || 2500,
        floodBanMin: Number(form.elements["floodBanMin"]?.value) || 15
      };
      await withBusy(form.querySelector("button[type=submit]"), async () => {
        try {
          await api.patch("/api/admin/settings/security", { value });
          toastSuccess(t("adm.secSaved"));
          const f = document.getElementById("secForm");
          if (f) delete f.dataset.filled;
          refreshSec();
        } catch (err) {
          toastApiError(err);
        }
      });
    });
    act("adm-sys-restart", async (e, el2) => {
      const ok = await confirmDialog({ text: t("adm.sysRestartWarn"), danger: true });
      if (!ok) return;
      await withBusy(el2, async () => {
        try {
          await api.post("/api/admin/system/restart", {});
          toastSuccess(t("adm.sysRestarting"));
          setTimeout(() => location.reload(), 6e3);
        } catch (err) {
          toastApiError(err);
        }
      });
    });
    act("adm-sys-reset", async (e, el2) => {
      const what = el2.dataset.what;
      const ok = await confirmDialog({ text: t(`adm.resetWarn.${what}`), danger: true });
      if (!ok) return;
      await withBusy(el2, async () => {
        try {
          await api.post("/api/admin/system/reset", { what });
          toastSuccess(t("adm.resetDone"));
        } catch (err) {
          toastApiError(err);
        }
      });
    });
  }
});

// public/js/views/admin/products.mjs
var products_exports = {};
__export(products_exports, {
  mount: () => mount16,
  render: () => render18
});
async function render18(ctx) {
  const id = ctx.params.id;
  if (id === "new") return editor(null);
  if (id) {
    let r = null;
    try {
      r = await api.get(`/api/admin/products/${id}`);
    } catch (err) {
      return errorState({ title: err?.message || t("err.notFound") });
    }
    return editor(r.product);
  }
  return list2();
}
async function list2() {
  let r = null;
  try {
    r = await api.get(api.url("/api/admin/products", { q: F.q, cat: F.cat, brand: F.brand, status: F.status, page: F.page, limit: F.limit }));
  } catch (err) {
    return errorState({ title: err?.message || t("err.generic") });
  }
  const items = r.items || [];
  const href2 = (p) => `#/admin/products?page=${p}`;
  return html`
    <div class="row row-between row-wrap mb">
      <div>
        <h2 class="section-title">${icon("box")} ${t("adm.products")}</h2>
        <p class="muted small">${fmtNum(r.total || 0)} ${t("catalog.count")}</p>
      </div>
      ${can("products.create") ? html`<a class="btn btn-primary btn-sm" href="#/admin/products/new">${icon("plus")} ${t("adm.productNew")}</a>` : ""}
    </div>

    <form class="card mb adm-filter" data-act="adm-p-filter">
      <div class="form-grid">
        <label class="field"><span class="label">${t("common.search")}</span>
          <input class="input" name="q" value="${esc(F.q)}" placeholder="${t("adm.pName")} / SKU / ${t("pdp.barcode")}">
        </label>
        ${selectField({ label: t("adm.pCat"), name: "cat", value: F.cat, options: [{ value: "", label: t("common.all") }, ...S.categories.map((c) => ({ value: c.id, label: catName(c) }))] })}
        ${selectField({ label: t("adm.pBrand"), name: "brand", value: F.brand, options: [{ value: "", label: t("common.all") }, ...S.brands.map((b) => ({ value: b.id, label: brandName(b) }))] })}
        ${selectField({
    label: t("common.status"),
    name: "status",
    value: F.status,
    options: [
      { value: "", label: t("common.all") },
      { value: "active", label: t("common.active") },
      { value: "inactive", label: t("common.inactive") },
      { value: "low", label: t("adm.kpi.lowStock") },
      { value: "out", label: t("card.outOfStock") }
    ]
  })}
      </div>
      <div class="row row-wrap mt-s">
        <button class="btn btn-primary btn-sm" type="submit">${icon("filter")} ${t("common.apply")}</button>
        <button class="btn btn-ghost btn-sm" type="button" data-act="adm-p-clear">${icon("close")} ${t("catalog.f.clear")}</button>
      </div>
    </form>

    ${items.length ? tableHtml(
    [
      { label: "" },
      { label: t("adm.pName") },
      { label: t("adm.pCat") },
      { label: t("common.price"), cls: "num" },
      { label: t("common.stock"), cls: "num" },
      { label: t("pdp.sold"), cls: "num" },
      { label: t("common.status") },
      { label: t("common.actions"), cls: "num" }
    ],
    items.map((p) => html`
        <tr>
          <td><span class="cl-img" data-h="46px" data-w="46px">${productImage(p)}</span></td>
          <td>
            <a class="b" href="#/admin/products/${p.id}">${esc(isFa2() ? p.name : p.nameEn || p.name)}</a>
            <div class="tiny muted mono">${esc(p.sku || "")}${p.barcode ? ` \xB7 ${esc(p.barcode)}` : ""}</div>
          </td>
          <td class="tiny">${esc(p.categoryName || "")}<div class="tiny muted">${esc(p.brandName || "")}</div></td>
          <td class="num">
            ${fmtMoney(p.price)}
            ${p.oldPrice > p.price ? html`<div class="tiny muted"><s>${fmtNum(p.oldPrice)}</s> <span class="badge-pill bp-danger">${fmtNum(p.discountPct)}٪</span></div>` : ""}
          </td>
          <td class="num"><span class="badge-pill ${p.inStock ? p.stock <= 3 ? "bp-warn" : "bp-success" : "bp-danger"}">${fmtNum(Math.max(0, (p.stock || 0) - (p.reserved || 0)))}</span></td>
          <td class="num">${fmtNum(p.sold || 0)}</td>
          <td>${p.active === false ? html`<span class="badge-pill bp-muted">${t("common.inactive")}</span>` : html`<span class="badge-pill bp-success">${t("common.active")}</span>`}</td>
          <td>
            <div class="act">
              <a class="btn btn-ghost btn-xs" href="#/admin/products/${p.id}">${icon("edit")}</a>
              <a class="btn btn-ghost btn-xs" href="#/product/${p.id}" target="_blank" rel="noopener">${icon("external")}</a>
              <button class="btn btn-ghost btn-xs" data-act="adm-p-igpack" data-id="${p.id}" title="${t("adm.igPack")}">${icon("camera")}</button>
              ${can("products.delete") ? html`<button class="btn btn-ghost btn-xs" data-act="adm-p-del" data-id="${p.id}" data-name="${esc(p.name)}">${icon("trash")}</button>` : ""}
            </div>
          </td>
        </tr>`)
  ) : emptyState({ icon: "box", title: t("common.noResult"), action: can("products.create") ? { href: "#/admin/products/new", label: t("adm.productNew") } : null })}

    <div class="mt" data-page="${r.page}" data-pages="${r.pages}">${pagination(r.page || 1, r.pages || 1, href2)}</div>`;
}
function editor(p) {
  const isNew = !p;
  E.images = [...p?.images || []];
  E.specs = Object.entries(p?.specs || {}).map(([key, value]) => ({ key, value }));
  E.tags = [...p?.tags || []];
  return html`
    <div class="row row-between row-wrap mb">
      <h2 class="section-title">${icon(isNew ? "plus" : "edit")} ${isNew ? t("adm.productNew") : t("adm.productEdit")}</h2>
      <div class="row row-wrap">
        <a class="btn btn-ghost btn-sm" href="#/admin/products">${icon("arrow-right")} ${t("adm.products")}</a>
        ${!isNew ? html`<a class="btn btn-ghost btn-sm" href="#/product/${p.id}" target="_blank" rel="noopener">${icon("external")} ${t("common.view")}</a>` : ""}
      </div>
    </div>

    <form data-act="adm-p-save" data-id="${p?.id || ""}">
      <div class="card">
        <div class="form-grid">
          ${field2({ label: t("adm.pName"), name: "name", required: true, value: p?.name || "" })}
          ${field2({ label: t("adm.pNameEn"), name: "nameEn", value: p?.nameEn || "" })}
          ${selectField({ label: t("adm.pCat"), name: "categoryId", value: p?.categoryId || "", options: S.categories.map((c) => ({ value: c.id, label: catName(c) })) })}
          ${selectField({ label: t("adm.pBrand"), name: "brandId", value: p?.brandId || "", options: S.brands.map((b) => ({ value: b.id, label: brandName(b) })) })}
          ${field2({ label: t("adm.pSku"), name: "sku", value: p?.sku || "", hint: isFa2() ? "\u062E\u0627\u0644\u06CC \u0628\u06AF\u0630\u0627\u0631\u06CC \u062E\u0648\u062F\u06A9\u0627\u0631 \u0633\u0627\u062E\u062A\u0647 \u0645\u06CC\u200C\u0634\u0648\u062F" : "Leave empty to auto-generate" })}
          ${field2({ label: t("adm.pBarcode"), name: "barcode", value: p?.barcode || "", attrs: 'inputmode="numeric"' })}
          ${field2({ label: t("adm.pPrice"), name: "price", type: "number", required: true, value: p?.price ?? "" })}
          ${field2({ label: t("adm.pOldPrice"), name: "oldPrice", type: "number", value: p?.oldPrice ?? 0 })}
          ${field2({ label: t("adm.pCost"), name: "cost", type: "number", value: p?.cost ?? 0 })}
          ${field2({ label: t("adm.pStock"), name: "stock", type: "number", required: true, value: p?.stock ?? 1 })}
          ${field2({ label: t("adm.pWeight"), name: "weight", type: "number", value: p?.weight ?? 0 })}
          ${field2({ label: t("adm.pWarranty"), name: "warrantyMonths", type: "number", value: p?.warrantyMonths ?? 0 })}
          ${selectField({
    label: t("adm.pAuth"),
    name: "authenticity",
    value: p?.authenticity || "generic",
    options: ["original", "highcopy", "generic"].map((a) => ({ value: a, label: t(`auth.${a}`) }))
  })}
        </div>
        ${!isNew && can("barcode.print") ? html`
          <div class="row row-wrap mt-s">
            <button type="button" class="btn btn-ghost btn-sm" data-act="adm-p-barcode" data-id="${p.id}">${icon("barcode")} ${t("adm.bGenerate")}</button>
            ${p.barcode ? html`<code class="tag mono">${p.barcode}</code>` : ""}
          </div>` : ""}
      </div>

      <div class="card mt">
        <strong>${icon("file")} ${t("pdp.description")}</strong>
        <div class="mt-s">${textareaField({ label: "\u0641\u0627\u0631\u0633\u06CC", name: "description", value: p?.description || "", rows: 5 })}</div>
        ${textareaField({ label: "English", name: "descriptionEn", value: p?.descriptionEn || "", rows: 4 })}
      </div>

      <div class="card mt">
        <div class="row row-between row-wrap">
          <strong>${icon("image")} ${t("adm.pImages")} (${fmtNum(E.images.length)}/8)</strong>
          <div class="row row-wrap">
            ${can("products.create") ? html`<button type="button" class="btn btn-ghost btn-sm" data-act="adm-p-find" data-name="${esc(p?.nameEn || p?.name || "")}">${icon("search")} ${t("adm.pFindImage")}</button>` : ""}
            <label class="btn btn-ghost btn-sm" for="adm-p-file">${icon("upload")} ${t("adm.pUpload")}</label>
            <input id="adm-p-file" type="file" accept="image/*" multiple hidden data-img-input>
          </div>
        </div>
        <div class="img-list mt-s" data-img-list>${imagesHtml()}</div>
        <div class="mt">
          ${textareaField({ label: t("adm.pVideos"), name: "videos", value: (p?.videos || []).join("\n"), rows: 2, hint: t("adm.pVideosHint") })}
        </div>
      </div>

      <div class="card mt">
        <div class="row row-between">
          <strong>${icon("list")} ${t("adm.pSpecs")}</strong>
          <button type="button" class="btn btn-ghost btn-sm" data-act="adm-p-spec-add">${icon("plus")} ${t("adm.pAddSpec")}</button>
        </div>
        <div class="mt-s" data-spec-list>${specsHtml()}</div>
      </div>

      <div class="card mt">
        <strong>${icon("tag")} ${t("adm.pTags")}</strong>
        <div class="mt-s" data-tag-list>${tagsHtml()}</div>
        <div class="row mt-s">
          <input class="input" data-tag-input placeholder="${isFa2() ? "\u0628\u0631\u0686\u0633\u0628 \u062C\u062F\u06CC\u062F \u0648 Enter" : "New tag and Enter"}" maxlength="30">
          <button type="button" class="btn btn-ghost btn-sm" data-act="adm-p-tag-add">${icon("plus")}</button>
        </div>
      </div>

      <div class="card mt">
        ${switchField({ label: t("adm.pFeatured"), name: "featured", checked: !!p?.featured })}
        ${switchField({ label: t("adm.pActive"), name: "active", checked: p ? p.active !== false : true })}
      </div>

      <div class="row row-wrap mt">
        <button class="btn btn-primary" type="submit">${icon("save")} ${t("common.save")}</button>
        <a class="btn btn-ghost" href="#/admin/products">${t("common.cancel")}</a>
      </div>
    </form>`;
}
function imagesHtml() {
  if (!E.images.length) return html`<p class="muted small">${t("adm.pFindEmpty")}</p>`;
  return E.images.map((src, i) => html`
    <span class="img-item">
      <img src="${src}" alt="${t("img.alt")}" loading="lazy">
      <span class="img-tools">
        ${i > 0 ? html`<button type="button" data-act="adm-img-up" data-i="${i}" title="${t("common.prev")}">${icon("arrow-up")}</button>` : ""}
        <button type="button" data-act="adm-img-del" data-i="${i}" title="${t("common.delete")}">${icon("trash")}</button>
      </span>
      ${i === 0 ? html`<span class="img-main">${t("common.image")} ۱</span>` : ""}
    </span>`).join("");
}
function specsHtml() {
  if (!E.specs.length) return html`<p class="muted small">${t("common.empty")}</p>`;
  return E.specs.map((s, i) => html`
    <div class="spec-row">
      <input class="input" value="${esc(s.key)}" placeholder="${t("adm.pSpecKey")}" data-spec-k="${i}" maxlength="40">
      <input class="input" value="${esc(s.value)}" placeholder="${t("adm.pSpecVal")}" data-spec-v="${i}" maxlength="120">
      <button type="button" class="btn btn-ghost btn-icon btn-sm" data-act="adm-spec-del" data-i="${i}">${icon("trash")}</button>
    </div>`).join("");
}
function tagsHtml() {
  if (!E.tags.length) return html`<p class="muted small">${t("common.empty")}</p>`;
  return html`<div class="row row-wrap">${E.tags.map((tag, i) => html`
    <span class="chip">${esc(tag)}<button type="button" data-act="adm-tag-del" data-i="${i}" aria-label="${t("common.delete")}">${icon("close")}</button></span>`)}</div>`;
}
function paint(root, sel, html2) {
  const box = (root || document).querySelector(sel);
  if (box) box.innerHTML = html2;
  applyDyn(box || document);
}
function igCaption(p) {
  const st = store();
  const name = isFa2() ? p.name : p.nameEn || p.name;
  const nf = (n) => Number(n || 0).toLocaleString(isFa2() ? "fa-IR" : "en-US");
  const old = Number(p.oldPrice || 0);
  const stock = Math.max(0, (p.stock || 0) - (p.reserved || 0));
  const link = `${location.origin}/#/product/${p.id}`;
  const desc = String(isFa2() ? p.description || "" : p.descriptionEn || p.description || "").split("\n")[0].trim().slice(0, 160);
  const rows = isFa2() ? [
    `\u2728 ${name} \u2728`,
    desc,
    "",
    `\u{1F4B0} \u0642\u06CC\u0645\u062A: ${nf(p.price)} \u062A\u0648\u0645\u0627\u0646${old > p.price ? ` (\u0628\u0647\u200C\u062C\u0627\u06CC ${nf(old)} \u2014 ${fmtNum(p.discountPct || 0)}\u066A \u062A\u062E\u0641\u06CC\u0641)` : ""}`,
    stock > 0 ? "\u{1F4E6} \u0645\u0648\u062C\u0648\u062F \u062F\u0631 \u0627\u0646\u0628\u0627\u0631 \u2014 \u0647\u0645\u06CC\u0646 \u062D\u0627\u0644\u0627 \u0633\u0641\u0627\u0631\u0634 \u0628\u062F\u0647" : "\u{1F4E6} \u0641\u0639\u0644\u0627\u064B \u0646\u0627\u0645\u0648\u062C\u0648\u062F\u061B \u067E\u06CC\u0627\u0645 \u0628\u062F\u0647 \u062A\u0627 \u0645\u0648\u062C\u0648\u062F \u0634\u062F \u062E\u0628\u0631\u062A \u06A9\u0646\u06CC\u0645",
    "\u{1F6E1} \u0636\u0645\u0627\u0646\u062A \u0627\u0635\u0627\u0644\u062A \u06A9\u0627\u0644\u0627 + \u0645\u0647\u0644\u062A \u062A\u0633\u062A \u0648 \u0645\u0631\u062C\u0648\u0639 \u062A\u0627 \u06F7 \u0631\u0648\u0632",
    "\u{1F69A} \u0627\u0631\u0633\u0627\u0644 \u0627\u0632 \u0628\u0646\u062F\u0631 \u0628\u0648\u0634\u0647\u0631 \u0628\u0647 \u0633\u0631\u0627\u0633\u0631 \u0627\u06CC\u0631\u0627\u0646",
    "",
    `\u{1F517} \u0633\u0641\u0627\u0631\u0634 \u0622\u0646\u0644\u0627\u06CC\u0646: ${link}`,
    `\u{1F4DE} \u062A\u0644\u0641\u0646: ${st.phone || ""} \xB7 \u{1F34F} \u0627\u06CC\u0646\u0633\u062A\u0627\u06AF\u0631\u0627\u0645: @jam.greenapple`
  ] : [
    `\u2728 ${name} \u2728`,
    desc,
    "",
    `\u{1F4B0} Price: ${nf(p.price)} Toman${old > p.price ? ` (was ${nf(old)})` : ""}`,
    "\u{1F6E1} Authenticity guarantee + 7-day return",
    `\u{1F517} Order: ${link}`,
    `\u{1F4DE} ${st.phone || ""}`
  ];
  return rows.filter((x, i, a) => !(x === "" && (a[i - 1] === "" || i === 0))).join("\n");
}
function igTags(p) {
  const base = isFa2() ? ["\u06AF\u0631\u06CC\u0646_\u0627\u067E\u0644", "\u0644\u0648\u0627\u0632\u0645_\u062C\u0627\u0646\u0628\u06CC_\u0645\u0648\u0628\u0627\u06CC\u0644", "\u06AF\u062C\u062A", "\u0628\u0648\u0634\u0647\u0631", "\u062C\u0645", "\u062E\u0631\u06CC\u062F_\u0622\u0646\u0644\u0627\u06CC\u0646"] : ["GreenApple", "MobileAccessories", "Gadget", "Bushehr", "OnlineShopping"];
  const extra = [p.brandName, p.categoryName].filter(Boolean).map((x) => String(x).trim().replace(/\s+/g, "_"));
  return [.../* @__PURE__ */ new Set([...base, ...extra])].map((x) => `#${x}`).join(" ");
}
async function runFind(box, query, langCode) {
  if (box) box.innerHTML = spinner(t("adm.pFindSearching"));
  try {
    const r = await api.post("/api/admin/find-image", { query, lang: langCode });
    const items = r.items || [];
    if (box) {
      box.innerHTML = items.length ? html`<div class="find-grid">${items.map((it, i) => html`
        <div class="find-item">
          <img src="/api/admin/image-thumb?url=${encodeURIComponent(it.thumbnail || it.url)}" alt="${esc(it.title || "")}" loading="lazy">
          <div class="find-meta">
            <div class="tiny b">${esc((it.title || "").slice(0, 60))}</div>
            <div class="tiny muted">${esc(it.license || "")} · ${esc(it.source || "")}${it.creator ? ` \xB7 ${esc(it.creator)}` : ""}</div>
          </div>
          <button type="button" class="btn btn-primary btn-xs" data-act="adm-find-use" data-url="${esc(it.url)}">${t("adm.pUseImage")}</button>
        </div>`).join("")}</div>` : emptyState({ icon: "image", title: t("adm.pFindEmpty") });
    }
  } catch (err) {
    if (box) box.innerHTML = html`<p class="notice notice-danger">${icon("alert")}<span>${esc(err?.message || t("err.network"))}</span></p>`;
  }
}
function mount16(root) {
  applyDyn(root);
  const fileInput = root.querySelector("[data-img-input]");
  if (fileInput) {
    fileInput.addEventListener("change", async () => {
      const files = [...fileInput.files || []].slice(0, 8 - E.images.length);
      fileInput.value = "";
      for (const f of files) {
        if (f.size > 4 * 1024 * 1024) {
          toast(`${t("err.tooLarge")}: ${f.name}`, { type: "warn" });
          continue;
        }
        try {
          const dataUrl = await fileToDataURL(f);
          const r = await api.upload(dataUrl);
          if (r.url) E.images.push(r.url);
        } catch (err) {
          toastApiError(err);
        }
      }
      paint(root, "[data-img-list]", imagesHtml());
    });
  }
  const tagInput = root.querySelector("[data-tag-input]");
  if (tagInput) {
    tagInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        document.querySelector('[data-act="adm-p-tag-add"]')?.click();
      }
    });
  }
  root.querySelectorAll(".pagination .pg").forEach((a) => {
    a.addEventListener("click", (e) => {
      const m = /page=(\d+)/.exec(a.getAttribute("href") || "");
      if (!m) return;
      e.preventDefault();
      const p = Number(m[1]);
      if (p >= 1) {
        F.page = p;
        refresh(true);
      }
    });
  });
  return null;
}
var F, E;
var init_products = __esm({
  "public/js/views/admin/products.mjs"() {
    init_dom();
    init_i18n();
    init_api();
    init_state();
    init_components();
    init_ui();
    init_actions();
    init_router();
    F = { q: "", cat: "", brand: "", status: "", page: 1, limit: 25 };
    E = { images: [], specs: [], tags: [] };
    act("adm-p-filter", (e, form) => {
      e.preventDefault();
      const fd = new FormData(form);
      F.q = String(fd.get("q") || "").trim();
      F.cat = String(fd.get("cat") || "");
      F.brand = String(fd.get("brand") || "");
      F.status = String(fd.get("status") || "");
      F.page = 1;
      refresh(true);
    });
    act("adm-p-clear", () => {
      Object.assign(F, { q: "", cat: "", brand: "", status: "", page: 1 });
      refresh(true);
    });
    act("adm-p-del", async (e, el2) => {
      const ok = await confirmDelete(el2.dataset.name);
      if (!ok) return;
      try {
        await api.del(`/api/admin/products/${el2.dataset.id}`);
        toastSuccess(t("adm.pDeleted"));
        refresh(true);
      } catch (err) {
        toastApiError(err);
      }
    });
    act("adm-img-del", (e, el2) => {
      E.images.splice(Number(el2.dataset.i), 1);
      paint(null, "[data-img-list]", imagesHtml());
    });
    act("adm-img-up", (e, el2) => {
      const i = Number(el2.dataset.i);
      const [x] = E.images.splice(i, 1);
      E.images.splice(i - 1, 0, x);
      paint(null, "[data-img-list]", imagesHtml());
    });
    act("adm-p-spec-add", () => {
      E.specs.push({ key: "", value: "" });
      paint(null, "[data-spec-list]", specsHtml());
    });
    act("adm-spec-del", (e, el2) => {
      E.specs.splice(Number(el2.dataset.i), 1);
      paint(null, "[data-spec-list]", specsHtml());
    });
    act("adm-p-tag-add", () => {
      const input = document.querySelector("[data-tag-input]");
      const v = String(input?.value || "").trim();
      if (!v) return;
      if (!E.tags.includes(v) && E.tags.length < 20) E.tags.push(v);
      if (input) input.value = "";
      paint(null, "[data-tag-list]", tagsHtml());
    });
    act("adm-tag-del", (e, el2) => {
      E.tags.splice(Number(el2.dataset.i), 1);
      paint(null, "[data-tag-list]", tagsHtml());
    });
    act("adm-p-barcode", async (e, el2) => {
      await withBusy(el2, async () => {
        try {
          const r = await api.post("/api/admin/barcode/generate", { productId: el2.dataset.id, count: 1 });
          const code = r.codes?.[0]?.barcode || r.codes?.[0] || "";
          if (code) {
            const input = document.querySelector("[name=barcode]");
            if (input) input.value = code;
            toastSuccess(t("adm.bGenerated"));
          }
        } catch (err) {
          toastApiError(err);
        }
      });
    });
    act("adm-p-igpack", async (e, el2) => {
      let p = null;
      try {
        p = (await api.get(`/api/admin/products/${el2.dataset.id}`)).product;
      } catch (err) {
        toastApiError(err);
        return;
      }
      const img = (p.images || [])[0] || "";
      modal({
        title: `${icon("camera")} ${t("adm.igPack")}`,
        subtitle: isFa2() ? p.name : p.nameEn || p.name,
        body: html`
      ${img ? html`
        <div class="row row-wrap mb">
          <img class="igpack-img" src="${esc(img)}" alt="">
          <div class="grow">
            <p class="small muted">${t("adm.igImgHint")}</p>
            <a class="btn btn-ghost btn-sm mt-s" href="${esc(img)}" download="greenapple-${esc(p.sku || p.id)}.jpg" target="_blank" rel="noopener">${icon("download")} ${t("adm.igDl")}</a>
          </div>
        </div>` : html`<p class="notice notice-warn mb">${icon("info")}<span>${t("adm.igNoImg")}</span></p>`}
      ${textareaField({ label: t("adm.igCap"), name: "igcap", rows: 10, value: igCaption(p) })}
      ${textareaField({ label: t("adm.igTags"), name: "igtags", rows: 2, value: igTags(p) })}
      <div class="row row-wrap mt-s">
        <button type="button" class="btn btn-primary btn-sm" data-act="adm-ig-copy" data-what="cap">${icon("copy")} ${t("adm.igCopyCap")}</button>
        <button type="button" class="btn btn-ghost btn-sm" data-act="adm-ig-copy" data-what="tags">${icon("copy")} ${t("adm.igCopyTags")}</button>
        <button type="button" class="btn btn-ghost btn-sm" data-act="adm-ig-copy" data-what="all">${icon("copy")} ${t("adm.igCopyAll")}</button>
      </div>`
      });
    });
    act("adm-ig-copy", async (e, el2) => {
      const panel = el2.closest(".modal");
      const cap = panel?.querySelector("[name=igcap]")?.value || "";
      const tags = panel?.querySelector("[name=igtags]")?.value || "";
      const text = el2.dataset.what === "tags" ? tags : el2.dataset.what === "all" ? `${cap}

${tags}` : cap;
      try {
        await copyText(text);
        toastSuccess(t("common.copied"), { timeout: 1800 });
      } catch {
        toastApiError(new Error(t("err.generic")));
      }
    });
    act("adm-p-save", async (e, form) => {
      e.preventDefault();
      const fd = new FormData(form);
      const specs = {};
      form.querySelectorAll("[data-spec-k]").forEach((k) => {
        const i = k.dataset.specK;
        const v = form.querySelector(`[data-spec-v="${i}"]`);
        const key = String(k.value || "").trim();
        if (key) specs[key] = String(v?.value || "").trim();
      });
      const id = form.dataset.id;
      const payload = {
        name: fd.get("name"),
        nameEn: fd.get("nameEn") || "",
        categoryId: fd.get("categoryId") || "",
        brandId: fd.get("brandId") || "",
        sku: fd.get("sku") || "",
        barcode: fd.get("barcode") || "",
        price: Number(fd.get("price") || 0),
        oldPrice: Number(fd.get("oldPrice") || 0),
        cost: Number(fd.get("cost") || 0),
        stock: Number(fd.get("stock") || 0),
        weight: Number(fd.get("weight") || 0),
        warrantyMonths: Number(fd.get("warrantyMonths") || 0),
        authenticity: fd.get("authenticity") || "generic",
        description: fd.get("description") || "",
        descriptionEn: fd.get("descriptionEn") || "",
        images: E.images.slice(0, 8),
        videos: String(form.videos?.value || "").split(/\n+/).map((x) => x.trim()).filter(Boolean).slice(0, 4),
        specs,
        tags: E.tags.slice(0, 20),
        featured: fd.get("featured") === "on",
        active: fd.get("active") === "on"
      };
      await withBusy(form.querySelector("button[type=submit]"), async () => {
        try {
          if (id) {
            await api.patch(`/api/admin/products/${id}`, payload);
            toastSuccess(t("adm.pSaved"));
          } else {
            const r = await api.post("/api/admin/products", payload);
            toastSuccess(t("adm.pCreated"));
            if (r.product?.id) {
              navigate(`#/admin/products/${r.product.id}`);
              return;
            }
          }
          refresh(true);
        } catch (err) {
          toastApiError(err);
        }
      });
    });
    act("adm-p-find", (e, el2) => {
      const handle = modal({
        title: t("adm.pFindImage"),
        size: "lg",
        body: html`
      <form data-act="adm-find-run" class="row row-wrap mb">
        <input class="input grow" name="query" value="${esc(el2.dataset.name || "")}" placeholder="${t("adm.pName")}" required>
        <select class="select" name="lang" data-w="110px">
          <option value="en">English</option>
          <option value="fa">فارسی</option>
        </select>
        <button class="btn btn-primary" type="submit">${icon("search")} ${t("common.search")}</button>
      </form>
      <p class="hint mb-s">${t("adm.pFindImageHint")}</p>
      <div data-find-results>${spinner(t("adm.pFindSearching"))}</div>`,
        onMount: (panel) => {
          panel.querySelector("[name=query]")?.focus();
          panel.dataset.findBox = "1";
          const q = el2.dataset.name || "";
          if (q) runFind(panel.querySelector("[data-find-results]"), q, "en");
        }
      });
      void handle;
    });
    act("adm-find-run", (e, form) => {
      e.preventDefault();
      const fd = new FormData(form);
      const panel = form.closest(".modal");
      runFind(panel?.querySelector("[data-find-results]"), String(fd.get("query") || ""), String(fd.get("lang") || "en"));
    });
    act("adm-find-use", async (e, el2) => {
      await withBusy(el2, async () => {
        try {
          const r = await api.post("/api/admin/fetch-image", { url: el2.dataset.url });
          if (r.url && !E.images.includes(r.url) && E.images.length < 8) E.images.push(r.url);
          paint(null, "[data-img-list]", imagesHtml());
          toastSuccess(t("adm.pSaved"));
          el2.closest(".overlay")?.querySelector("[data-lx]")?.click();
        } catch (err) {
          toastApiError(err);
        }
      });
    });
  }
});

// public/js/views/admin/catalog.mjs
var catalog_exports2 = {};
__export(catalog_exports2, {
  mount: () => mount17,
  render: () => render19
});
async function render19() {
  let r = null;
  try {
    r = await api.get("/api/admin/categories");
  } catch (err) {
    return errorState({ title: err?.message || t("err.generic") });
  }
  CATS = r.items || [];
  BRANDS = r.brands || [];
  return html`
    <div class="row row-between row-wrap mb">
      <h2 class="section-title">${icon("layers")} ${t("adm.categories")}</h2>
      <div class="row row-wrap">
        <button class="btn btn-primary btn-sm" data-act="adm-cat-new">${icon("plus")} ${t("common.category")}</button>
        <button class="btn btn-outline btn-sm" data-act="adm-brand-new">${icon("plus")} ${t("common.brand")}</button>
      </div>
    </div>

    <div class="card">
      <strong>${icon("layers")} ${t("common.category")} (${fmtNum(CATS.length)})</strong>
      ${tableHtml(
    [
      { label: t("adm.catGlyph") },
      { label: t("adm.catName") },
      { label: t("adm.catParent") },
      { label: t("adm.catOrder"), cls: "num" },
      { label: t("common.count"), cls: "num" },
      { label: t("common.status") },
      { label: "", cls: "num" }
    ],
    CATS.map((c) => html`
          <tr>
            <td><span class="cat-ic" data-h="34px" data-w="34px">${icon(c.glyph || "box")}</span></td>
            <td><span class="b">${esc(isFa2() ? c.name : c.nameEn || c.name)}</span><div class="tiny muted mono">${esc(c.id)}</div></td>
            <td class="tiny">${esc(CATS.find((x) => x.id === c.parentId)?.name || "\u2014")}</td>
            <td class="num">${fmtNum(c.order || 0)}</td>
            <td class="num">${fmtNum(c.productCount || 0)}</td>
            <td>${c.active === false ? html`<span class="badge-pill bp-muted">${t("common.inactive")}</span>` : html`<span class="badge-pill bp-success">${t("common.active")}</span>`}</td>
            <td>
              <div class="act">
                <button class="btn btn-ghost btn-xs" data-act="adm-cat-edit" data-id="${c.id}">${icon("edit")}</button>
                <a class="btn btn-ghost btn-xs" href="#/category/${c.id}" target="_blank" rel="noopener">${icon("external")}</a>
                <button class="btn btn-ghost btn-xs" data-act="adm-cat-del" data-id="${c.id}" data-name="${esc(c.name)}">${icon("trash")}</button>
              </div>
            </td>
          </tr>`),
    { emptyText: t("common.noData") }
  )}
    </div>

    <div class="card mt">
      <strong>${icon("tag")} ${t("common.brand")} (${fmtNum(BRANDS.length)})</strong>
      ${tableHtml(
    [
      { label: t("adm.brandName") },
      { label: t("adm.brandNameEn") },
      { label: t("common.count"), cls: "num" },
      { label: t("common.status") },
      { label: "", cls: "num" }
    ],
    BRANDS.map((b) => html`
          <tr>
            <td class="b">${esc(b.name)}<div class="tiny muted mono">${esc(b.id)}</div></td>
            <td class="tiny">${esc(b.nameEn || "")}${b.country ? html` <span class="muted">· ${esc(b.country)}</span>` : ""}</td>
            <td class="num">${fmtNum(b.productCount || 0)}</td>
            <td>${b.active === false ? html`<span class="badge-pill bp-muted">${t("common.inactive")}</span>` : html`<span class="badge-pill bp-success">${t("common.active")}</span>`}</td>
            <td>
              <div class="act">
                <button class="btn btn-ghost btn-xs" data-act="adm-brand-edit" data-id="${b.id}">${icon("edit")}</button>
                <button class="btn btn-ghost btn-xs" data-act="adm-brand-del" data-id="${b.id}" data-name="${esc(b.name)}">${icon("trash")}</button>
              </div>
            </td>
          </tr>`),
    { emptyText: t("common.noData") }
  )}
    </div>`;
}
function catForm(c) {
  return modal({
    title: c ? t("common.edit") : t("common.add"),
    body: html`
      <form class="form-grid" data-act="adm-cat-save" data-id="${c?.id || ""}" data-isnew="${c ? "" : "1"}">
        ${!c ? field2({ label: "id", name: "id", hint: isFa2() ? "\u062E\u0627\u0644\u06CC \u0628\u06AF\u0630\u0627\u0631\u06CC \u062E\u0648\u062F\u06A9\u0627\u0631 \u0633\u0627\u062E\u062A\u0647 \u0645\u06CC\u200C\u0634\u0648\u062F" : "Auto if empty" }) : ""}
        ${field2({ label: t("adm.catName"), name: "name", required: true, value: c?.name || "" })}
        ${field2({ label: t("adm.brandNameEn"), name: "nameEn", value: c?.nameEn || "" })}
        ${selectField({ label: t("adm.catGlyph"), name: "glyph", value: c?.glyph || "box", options: GLYPHS.map((g) => ({ value: g, label: g })) })}
        ${selectField({
      label: t("adm.catParent"),
      name: "parentId",
      value: c?.parentId || "",
      options: [{ value: "", label: t("adm.catNoParent") }, ...CATS.filter((x) => x.id !== c?.id).map((x) => ({ value: x.id, label: x.name }))]
    })}
        ${field2({ label: t("adm.catOrder"), name: "order", type: "number", value: c?.order ?? CATS.length + 1, attrs: 'min="0" max="999"' })}
        <div class="span-2">${textareaField({ label: t("common.description"), name: "description", value: c?.description || "", rows: 2 })}</div>
        <div class="span-2">${textareaField({ label: L2("\u062A\u0648\u0636\u06CC\u062D\u0627\u062A \u0627\u0646\u06AF\u0644\u06CC\u0633\u06CC", "Description (EN)"), name: "descriptionEn", value: c?.descriptionEn || "", rows: 2 })}</div>
        <div class="span-2">${switchField({ label: t("common.active"), name: "active", checked: c ? c.active !== false : true })}</div>
        <button class="btn btn-primary span-2" type="submit">${t("common.save")}</button>
      </form>`
  });
}
function brandForm(b) {
  return modal({
    title: b ? t("common.edit") : t("common.add"),
    size: "sm",
    body: html`
      <form data-act="adm-brand-save" data-id="${b?.id || ""}" data-isnew="${b ? "" : "1"}">
        ${!b ? field2({ label: "id", name: "id", hint: L2("\u062E\u0627\u0644\u06CC \u0628\u06AF\u0630\u0627\u0631\u06CC \u062E\u0648\u062F\u06A9\u0627\u0631 \u0633\u0627\u062E\u062A\u0647 \u0645\u06CC\u200C\u0634\u0648\u062F", "Auto if empty") }) : ""}
        ${field2({ label: t("adm.brandName"), name: "name", required: true, value: b?.name || "" })}
        ${field2({ label: t("adm.brandNameEn"), name: "nameEn", value: b?.nameEn || "" })}
        ${field2({ label: L2("\u06A9\u0634\u0648\u0631", "Country"), name: "country", value: b?.country || "" })}
        ${switchField({ label: t("common.active"), name: "active", checked: b ? b.active !== false : true })}
        <button class="btn btn-primary btn-block mt-s" type="submit">${t("common.save")}</button>
      </form>`
  });
}
function mount17(root) {
  applyDyn(root);
  return null;
}
var CATS, BRANDS, GLYPHS, L2, catHandle, brandHandle;
var init_catalog2 = __esm({
  "public/js/views/admin/catalog.mjs"() {
    init_dom();
    init_i18n();
    init_api();
    init_state();
    init_components();
    init_ui();
    init_actions();
    init_router();
    CATS = [];
    BRANDS = [];
    GLYPHS = ["box", "cable", "plug", "battery", "speaker", "watch", "glasses", "mic", "camera", "phone", "card", "zap", "image", "headset", "anchor", "palm", "wave", "globe", "layers", "tag"];
    L2 = (fa3, en2) => isFa2() ? fa3 : en2;
    catHandle = null;
    act("adm-cat-new", () => {
      catHandle = catForm(null);
    });
    act("adm-cat-edit", (e, el2) => {
      catHandle = catForm(CATS.find((c) => c.id === el2.dataset.id));
    });
    act("adm-cat-del", async (e, el2) => {
      if (!await confirmDelete(el2.dataset.name)) return;
      try {
        await api.del(`/api/admin/categories/${el2.dataset.id}`);
        toastSuccess(t("misc.deleted"));
        await refreshBootstrap({ silent: true });
        refresh(true);
      } catch (err) {
        toastApiError(err);
      }
    });
    act("adm-cat-save", async (e, form) => {
      e.preventDefault();
      const fd = new FormData(form);
      const isNew = form.dataset.isnew === "1";
      const payload = {
        name: fd.get("name"),
        nameEn: fd.get("nameEn") || "",
        glyph: fd.get("glyph") || "box",
        parentId: fd.get("parentId") || "",
        order: Number(fd.get("order") || 0),
        description: fd.get("description") || "",
        descriptionEn: fd.get("descriptionEn") || "",
        active: fd.get("active") === "on"
      };
      if (isNew && fd.get("id")) payload.id = fd.get("id");
      await withBusy(form.querySelector("button[type=submit]"), async () => {
        try {
          if (isNew) await api.post("/api/admin/categories", payload);
          else await api.patch(`/api/admin/categories/${form.dataset.id}`, payload);
          toastSuccess(t("misc.saved"));
          catHandle?.close();
          await refreshBootstrap({ silent: true });
          refresh(true);
        } catch (err) {
          toastApiError(err);
        }
      });
    });
    brandHandle = null;
    act("adm-brand-new", () => {
      brandHandle = brandForm(null);
    });
    act("adm-brand-edit", (e, el2) => {
      brandHandle = brandForm(BRANDS.find((b) => b.id === el2.dataset.id));
    });
    act("adm-brand-del", async (e, el2) => {
      if (!await confirmDelete(el2.dataset.name)) return;
      try {
        await api.del(`/api/admin/brands/${el2.dataset.id}`);
        toastSuccess(t("misc.deleted"));
        await refreshBootstrap({ silent: true });
        refresh(true);
      } catch (err) {
        toastApiError(err);
      }
    });
    act("adm-brand-save", async (e, form) => {
      e.preventDefault();
      const fd = new FormData(form);
      const isNew = form.dataset.isnew === "1";
      const payload = { name: fd.get("name"), nameEn: fd.get("nameEn") || "", country: fd.get("country") || "", active: fd.get("active") === "on" };
      if (isNew && fd.get("id")) payload.id = fd.get("id");
      await withBusy(form.querySelector("button[type=submit]"), async () => {
        try {
          if (isNew) await api.post("/api/admin/brands", payload);
          else await api.patch(`/api/admin/brands/${form.dataset.id}`, payload);
          toastSuccess(t("misc.saved"));
          brandHandle?.close();
          await refreshBootstrap({ silent: true });
          refresh(true);
        } catch (err) {
          toastApiError(err);
        }
      });
    });
  }
});

// public/js/views/admin/orders.mjs
var orders_exports = {};
__export(orders_exports, {
  mount: () => mount18,
  render: () => render20
});
async function render20(ctx) {
  if (ctx.params.id) return detail(ctx.params.id);
  return list3();
}
async function list3() {
  let r = null;
  try {
    r = await api.get(api.url("/api/admin/orders", { q: F2.q, status: F2.status, delivery: F2.delivery, page: F2.page, limit: F2.limit }));
  } catch (err) {
    return errorState({ title: err?.message || t("err.generic") });
  }
  STATUSES = r.statuses || [];
  const items = r.items || [];
  return html`
    <div class="row row-between row-wrap mb">
      <div>
        <h2 class="section-title">${icon("package-check")} ${t("adm.orders")}</h2>
        <p class="muted small">${fmtNum(r.total || 0)} ${t("common.orders")}</p>
      </div>
    </div>

    <form class="card mb adm-filter" data-act="adm-o-filter">
      <div class="form-grid">
        <label class="field"><span class="label">${t("common.search")}</span>
          <input class="input" name="q" value="${esc(F2.q)}" placeholder="${t("acc.orderCode")} / ${t("common.phone")} / ${t("common.name")}">
        </label>
        ${selectField({ label: t("common.status"), name: "status", value: F2.status, options: [{ value: "", label: t("common.all") }, ...STATUSES.map((s) => ({ value: s.id, label: t(`st.${s.id}`) }))] })}
        ${selectField({
    label: t("adm.oDelivery"),
    name: "delivery",
    value: F2.delivery,
    options: [{ value: "", label: t("common.all") }, { value: "pickup", label: t("dl.pickup") }, { value: "courier", label: t("dl.courier") }]
  })}
      </div>
      <div class="row row-wrap mt-s">
        <button class="btn btn-primary btn-sm" type="submit">${icon("filter")} ${t("common.apply")}</button>
        <button class="btn btn-ghost btn-sm" type="button" data-act="adm-o-clear">${icon("close")} ${t("catalog.f.clear")}</button>
      </div>
    </form>

    ${items.length ? tableHtml(
    [
      { label: t("acc.orderCode") },
      { label: t("adm.oCustomer") },
      { label: t("common.date") },
      { label: t("adm.oDelivery") },
      { label: t("common.total"), cls: "num" },
      { label: t("adm.oPayment") },
      { label: t("common.status") },
      { label: "", cls: "num" }
    ],
    items.map((o) => html`
        <tr>
          <td class="mono b nowrap">${o.code}</td>
          <td class="nowrap">${esc(o.userName || "")}<div class="tiny muted mono">${fmtTel(o.userPhone || "")}</div></td>
          <td class="nowrap tiny">${fmtDate(o.createdAt)}</td>
          <td class="tiny">${t(o.delivery === "pickup" ? "dl.pickup" : "dl.courier")}${o.express ? html` <span class="badge-pill bp-accent">${t("checkout.express")}</span>` : ""}</td>
          <td class="num b">${fmtMoney(o.total)}</td>
          <td>${payBadge(o.payment)}<div class="tiny muted">${t(`pm.${o.payment?.method || "cod"}`)}</div></td>
          <td>${statusBadge(o.status)}</td>
          <td><a class="btn btn-ghost btn-xs" href="#/admin/orders/${o.id}">${t("common.view")}</a></td>
        </tr>`)
  ) : emptyState({ icon: "package-check", title: t("common.noResult") })}

    <div class="mt">${pagination(r.page || 1, r.pages || 1, (p) => `#/admin/orders?page=${p}`)}</div>`;
}
async function detail(id) {
  let r = null;
  try {
    r = await api.get(api.url("/api/admin/orders", { q: "", page: 1, limit: 200 }));
  } catch {
  }
  const o = (r?.items || []).find((x) => x.id === id || x.code === id);
  if (!o) {
    try {
      const byCode = await api.get(api.url("/api/admin/orders", { q: id, page: 1, limit: 50 }));
      const found = (byCode?.items || []).find((x) => x.id === id || x.code === id);
      if (found) return detailHtml(found, byCode.statuses || []);
    } catch {
    }
    return emptyState({ icon: "package-check", title: t("acc.noOrders"), action: { href: "#/admin/orders", label: t("adm.orders") } });
  }
  return detailHtml(o, r.statuses || []);
}
function detailHtml(o, statuses) {
  const canManage = can("orders.manage");
  return html`
    <div class="breadcrumb mb-s">
      <a href="#/admin/orders">${t("adm.orders")}</a> <span>/</span> <span class="mono">${o.code}</span>
    </div>

    <div class="cart-grid">
      <div class="col">
        <div class="card">
          <div class="row row-between row-wrap">
            <div>
              <h2 class="buy-title">${icon("package-check")} ${o.code}</h2>
              <p class="muted small">${fmtDate(o.createdAt)} · ${esc(o.userName || "")} · <span class="mono">${fmtTel(o.userPhone || "")}</span></p>
            </div>
            <div class="row row-wrap">${statusBadge(o.status)}${payBadge(o.payment)}</div>
          </div>
          ${canManage ? html`
            <form class="form-grid mt" data-act="adm-o-save" data-id="${o.id}">
              ${selectField({ label: t("adm.oStatus"), name: "status", value: o.status, options: (statuses.length ? statuses : []).map((s) => ({ value: s.id, label: t(`st.${s.id}`) })) })}
              ${field2({ label: t("adm.oTracking"), name: "tracking", value: o.tracking || o.payment?.tracking || "" })}
              <div class="span-2">${textareaField({ label: t("adm.oNote"), name: "note", value: o.adminNote || "", rows: 3 })}</div>
              <div class="span-2"><button class="btn btn-primary" type="submit">${icon("save")} ${t("common.save")}</button></div>
            </form>` : ""}
        </div>

        <div class="card mt">
          <strong>${icon("box")} ${t("acc.orderItems")}</strong>
          ${tableHtml(
    [{ label: "" }, { label: t("common.product") }, { label: t("common.price"), cls: "num" }, { label: t("common.count"), cls: "num" }, { label: t("common.total"), cls: "num" }],
    (o.items || []).map((it) => html`
              <tr>
                <td><span class="cl-img" data-h="46px" data-w="46px">${productImage({ id: it.productId, name: it.name, images: it.image ? [it.image] : [] })}</span></td>
                <td><a class="b" href="#/admin/products/${it.productId}">${esc(isFa2() ? it.name : it.nameEn || it.name)}</a><div class="tiny muted mono">${esc(it.sku || "")}</div></td>
                <td class="num">${fmtMoney(it.price)}</td>
                <td class="num">${fmtNum(it.qty)}</td>
                <td class="num b">${fmtMoney(it.price * it.qty)}</td>
              </tr>`)
  )}
        </div>

        <div class="card mt">
          <strong>${icon("history")} ${t("acc.timeline")}</strong>
          ${timelineHtml(o)}
        </div>
      </div>

      <aside class="col">
        <div class="card summary">
          <strong>${t("cart.summary")}</strong>
          <div class="sum-row"><span>${t("common.subtotal")}</span><span class="v">${fmtMoney(o.subtotal)}</span></div>
          ${o.plusDiscount > 0 ? html`<div class="sum-row discount"><span>${t("acc.plus")}</span><span class="v">−${fmtMoney(o.plusDiscount)}</span></div>` : ""}
          ${o.couponDiscount > 0 ? html`<div class="sum-row discount"><span>${o.couponCode}</span><span class="v">−${fmtMoney(o.couponDiscount)}</span></div>` : ""}
          <div class="sum-row"><span>${t("common.shipping")}${o.shippingLabel ? html` <span class="muted tiny">(${esc(o.shippingLabel)})</span>` : ""}</span><span class="v">${fmtMoney(o.shipping)}</span></div>
          ${o.insured ? html`<div class="sum-row"><span>${t("common.insurance")}</span><span class="v">${fmtMoney(o.insuranceFee)}</span></div>` : ""}
          <div class="sum-row"><span>${t("common.total")}</span><span class="v">${fmtMoney(o.total)}</span></div>
          ${o.walletUsed > 0 ? html`<div class="sum-row discount"><span>${t("common.wallet")}</span><span class="v">−${fmtMoney(o.walletUsed)}</span></div>` : ""}
          <div class="sum-row total"><span>${t("common.payable")}</span><span class="v">${fmtMoney(o.payable)}</span></div>
          <p class="hint mt-s">${t("adm.oPayment")}: ${t(`pm.${o.payment?.method || "cod"}`)}${o.payment?.ref ? ` \xB7 ${esc(o.payment.ref)}` : ""}</p>
          ${o.refund ? html`<p class="notice notice-success mt-s">${icon("wallet")}<span>${fmtMoney(o.refund.amount)} — ${fmtDate(o.refund.at)}</span></p>` : ""}
        </div>

        <div class="card mt">
          <strong>${icon("truck")} ${t(o.delivery === "pickup" ? "dl.pickup" : "dl.courier")}</strong>
          ${o.address ? html`
            <p class="small mt-s"><strong>${esc(o.address.receiver || "")}</strong> · <span class="mono">${fmtTel(o.address.phone || "")}</span></p>
            <p class="muted small">${esc(o.address.street || "")}${o.address.city ? `\u060C ${esc(o.address.city)}` : ""}</p>
            ${o.address.postal ? html`<p class="muted small">${t("common.postal")}: ${esc(o.address.postal)}</p>` : ""}
            ${o.address.note ? html`<p class="hint">${esc(o.address.note)}</p>` : ""}` : html`<p class="muted small mt-s">${t("checkout.pickupDesc")}</p>`}
          ${o.zone ? html`<p class="small mt-s">${t("checkout.zone")}: ${esc(o.zone)}</p>` : ""}
          ${o.note ? html`<p class="hint mt-s">${icon("edit")} ${esc(o.note)}</p>` : ""}
        </div>
      </aside>
    </div>`;
}
function mount18(root) {
  applyDyn(root);
  root.querySelectorAll(".pagination .pg").forEach((a) => {
    a.addEventListener("click", (e) => {
      const m = /page=(\d+)/.exec(a.getAttribute("href") || "");
      if (!m) return;
      e.preventDefault();
      F2.page = Number(m[1]);
      refresh(true);
    });
  });
  return null;
}
var F2, STATUSES;
var init_orders = __esm({
  "public/js/views/admin/orders.mjs"() {
    init_dom();
    init_i18n();
    init_api();
    init_state();
    init_components();
    init_ui();
    init_actions();
    init_router();
    F2 = { q: "", status: "", delivery: "", page: 1, limit: 25 };
    STATUSES = [];
    act("adm-o-filter", (e, form) => {
      e.preventDefault();
      const fd = new FormData(form);
      F2.q = String(fd.get("q") || "").trim();
      F2.status = String(fd.get("status") || "");
      F2.delivery = String(fd.get("delivery") || "");
      F2.page = 1;
      refresh(true);
    });
    act("adm-o-clear", () => {
      Object.assign(F2, { q: "", status: "", delivery: "", page: 1 });
      refresh(true);
    });
    act("adm-o-save", async (e, form) => {
      e.preventDefault();
      const fd = new FormData(form);
      await withBusy(form.querySelector("button[type=submit]"), async () => {
        try {
          await api.patch(`/api/admin/orders/${form.dataset.id}`, {
            status: fd.get("status"),
            tracking: fd.get("tracking") || "",
            note: fd.get("note") || ""
          });
          toastSuccess(t("adm.oSaved"));
          refresh(true);
        } catch (err) {
          toastApiError(err);
        }
      });
    });
  }
});

// public/js/views/admin/reviews.mjs
var reviews_exports = {};
__export(reviews_exports, {
  mount: () => mount19,
  render: () => render21
});
async function render21() {
  let r = null;
  try {
    r = await api.get(api.url("/api/admin/reviews", { status: F3.status, type: F3.type }));
  } catch (err) {
    return errorState({ title: err?.message || t("err.generic") });
  }
  ITEMS = r.items || [];
  COUNTS = r.counts || COUNTS;
  const pages = Math.max(1, Math.ceil(ITEMS.length / PER));
  if (F3.page > pages) F3.page = pages;
  const rows = ITEMS.slice((F3.page - 1) * PER, F3.page * PER);
  return html`
    <div class="row row-between row-wrap mb">
      <h2 class="section-title">${icon("chat")} ${t("adm.reviews")}</h2>
      <div class="row row-wrap">
        <span class="badge-pill bp-warn">${t("adm.revPending")}: ${fmtNum(COUNTS.pending || 0)}</span>
        <span class="badge-pill bp-success">${t("adm.revApproved")}: ${fmtNum(COUNTS.approved || 0)}</span>
        <span class="badge-pill bp-muted">${t("adm.revRejected")}: ${fmtNum(COUNTS.rejected || 0)}</span>
      </div>
    </div>

    <form class="card mb adm-filter" data-act="adm-rev-filter">
      <div class="form-grid">
        ${selectField({
    label: t("common.status"),
    name: "status",
    value: F3.status,
    options: [
      { value: "pending", label: `${t("adm.revPending")} (${fmtNum(COUNTS.pending || 0)})` },
      { value: "approved", label: t("adm.revApproved") },
      { value: "rejected", label: t("adm.revRejected") },
      { value: "", label: t("common.all") }
    ]
  })}
        ${selectField({
    label: t("common.type"),
    name: "type",
    value: F3.type,
    options: [{ value: "", label: t("common.all") }, { value: "review", label: t("common.review") }, { value: "question", label: t("common.question") }]
  })}
      </div>
      <div class="row row-wrap mt-s">
        <button class="btn btn-primary btn-sm" type="submit">${icon("filter")} ${t("common.apply")}</button>
      </div>
    </form>

    ${rows.length ? html`
      <div class="rev-list">
        ${rows.map(revCard).join("")}
      </div>
      ${pages > 1 ? pagination(F3.page, pages, (p) => `#/admin/reviews?p=${p}`) : ""}
    ` : emptyState({ icon: "star", title: t("adm.revEmpty"), text: t("adm.revEmptyHint") })}`;
}
function revCard(r) {
  const isQ = r.type === "question";
  return html`
    <article class="card rev-card" data-id="${r.id}">
      <div class="row row-between row-wrap mb-s">
        <div class="row">
          ${r.productImage ? html`<img class="rev-thumb" src="${esc(r.productImage)}" alt="" loading="lazy" data-h="46px" data-w="46px">` : html`<span class="rev-thumb ph" data-h="46px" data-w="46px">${icon("box")}</span>`}
          <div>
            <a class="b" href="#/product/${r.productId}">${esc(r.productName || r.productId)}</a>
            <div class="tiny muted">${esc(r.userName || "")} · ${r.userBadge === "buyer" ? t("rev.buyer") : t("rev.visitor")} · ${fmtDate(r.createdAt)}</div>
          </div>
        </div>
        <div class="row row-wrap">
          ${isQ ? html`<span class="badge-pill bp-info">${t("common.question")}</span>` : html`<span class="rate-row">${stars(r.rating || 0)}</span>`}
          ${statusPill(r.status)}
        </div>
      </div>
      ${r.title ? html`<h3 class="rev-title">${esc(r.title)}</h3>` : ""}
      <p class="rev-body">${esc(r.body || "")}</p>
      ${r.reply ? html`
        <div class="rev-reply">
          <span class="tiny muted">${icon("send")} ${t("rev.shopReply")}</span>
          <p>${esc(r.reply)}</p>
        </div>` : ""}
      <div class="row row-wrap mt-s">
        ${r.status !== "approved" ? html`<button class="btn btn-success btn-xs" data-act="adm-rev-status" data-id="${r.id}" data-status="approved">${icon("check")} ${t("adm.revApprove")}</button>` : ""}
        ${r.status !== "rejected" ? html`<button class="btn btn-outline btn-xs" data-act="adm-rev-status" data-id="${r.id}" data-status="rejected">${icon("close")} ${t("adm.revReject")}</button>` : ""}
        ${r.status !== "pending" ? html`<button class="btn btn-ghost btn-xs" data-act="adm-rev-status" data-id="${r.id}" data-status="pending">${icon("refresh")} ${t("adm.revPending")}</button>` : ""}
        ${can("reviews.reply") ? html`<button class="btn btn-ghost btn-xs" data-act="adm-rev-reply" data-id="${r.id}">${icon("send")} ${t("adm.revReply")}</button>` : ""}
        <a class="btn btn-ghost btn-xs" href="#/product/${r.productId}" target="_blank" rel="noopener">${icon("external")}</a>
        <button class="btn btn-ghost btn-xs" data-act="adm-rev-del" data-id="${r.id}" data-name="${esc(r.title || r.body?.slice(0, 30) || "")}">${icon("trash")}</button>
      </div>
    </article>`;
}
function statusPill(s) {
  const map = { pending: ["bp-warn", t("adm.revPending")], approved: ["bp-success", t("adm.revApproved")], rejected: ["bp-danger", t("adm.revRejected")] };
  const [cls, label] = map[s] || ["bp-muted", s];
  return html`<span class="badge-pill ${cls}">${label}</span>`;
}
function mount19(root) {
  applyDyn(root);
  return null;
}
var F3, PER, ITEMS, COUNTS;
var init_reviews = __esm({
  "public/js/views/admin/reviews.mjs"() {
    init_dom();
    init_i18n();
    init_api();
    init_state();
    init_components();
    init_ui();
    init_actions();
    init_router();
    F3 = { status: "pending", type: "", page: 1 };
    PER = 12;
    ITEMS = [];
    COUNTS = { pending: 0, approved: 0, rejected: 0 };
    act("adm-rev-filter", (e, form) => {
      e.preventDefault();
      const fd = new FormData(form);
      F3.status = String(fd.get("status") || "");
      F3.type = String(fd.get("type") || "");
      F3.page = 1;
      refresh(true);
    });
    act("adm-rev-status", async (e, el2) => {
      try {
        await api.patch(`/api/admin/reviews/${el2.dataset.id}`, { status: el2.dataset.status });
        toastSuccess(t("misc.saved"));
        refresh(true);
      } catch (err) {
        toastApiError(err);
      }
    });
    act("adm-rev-reply", async (e, el2) => {
      const item = ITEMS.find((x) => x.id === el2.dataset.id);
      const value = await promptDialog({
        title: t("adm.revReply"),
        text: item?.body?.slice(0, 140) || "",
        label: t("rev.shopReply"),
        value: item?.reply || "",
        rows: 4
      });
      if (value === null) return;
      try {
        await api.patch(`/api/admin/reviews/${el2.dataset.id}`, { reply: String(value) });
        toastSuccess(t("misc.saved"));
        refresh(true);
      } catch (err) {
        toastApiError(err);
      }
    });
    act("adm-rev-del", async (e, el2) => {
      if (!await confirmDelete(el2.dataset.name || el2.dataset.id)) return;
      try {
        await api.del(`/api/admin/reviews/${el2.dataset.id}`);
        toastSuccess(t("misc.deleted"));
        refresh(true);
      } catch (err) {
        toastApiError(err);
      }
    });
  }
});

// public/js/views/admin/tickets.mjs
var tickets_exports = {};
__export(tickets_exports, {
  mount: () => mount20,
  render: () => render22
});
async function render22(ctx) {
  if (ctx.params.section === "support") return support(ctx.params.id);
  if (ctx.params.id) return ticketDetail(ctx.params.id);
  return ticketList();
}
async function ticketList() {
  let r = null;
  try {
    r = await api.get(api.url("/api/admin/tickets", { status: F4.status }));
  } catch (err) {
    return errorState({ title: err?.message || t("err.generic") });
  }
  const items = r.items || [];
  const counts = r.counts || {};
  return html`
    <div class="row row-between row-wrap mb">
      <div>
        <h2 class="section-title">${icon("ticket")} ${t("adm.tickets")}</h2>
        <p class="muted small">${L("\u0628\u0627\u0632", "Open")}: ${fmtNum(counts.open || 0)} · ${L("\u0628\u0633\u062A\u0647", "Closed")}: ${fmtNum(counts.closed || 0)} · ${L("\u062E\u0648\u0627\u0646\u062F\u0647\u200C\u0646\u0634\u062F\u0647", "Unread")}: ${fmtNum(items.filter((x) => x.unread).length)}</p>
      </div>
      <form class="row" data-act="adm-tk-filter" data-live>
        ${selectField({
    label: t("common.status"),
    name: "status",
    value: F4.status,
    options: [{ value: "", label: t("common.all") }, { value: "open", label: t("tk.open") }, { value: "answered", label: t("tk.answered") }, { value: "closed", label: t("tk.closed") }]
  })}
      </form>
    </div>

    ${tableHtml(
    [
      { label: t("acc.ticketSubject") },
      { label: t("acc.ticketCategory") },
      { label: t("common.priority") },
      { label: t("common.user") },
      { label: t("common.messages"), cls: "num" },
      { label: t("common.status") },
      { label: t("common.updated"), cls: "num" },
      { label: "", cls: "num" }
    ],
    items.map((x) => html`
        <tr class="${x.unread ? "row-new" : ""}">
          <td>
            ${x.unread ? html`<span class="dot-new" title="${L("\u062E\u0648\u0627\u0646\u062F\u0647\u200C\u0646\u0634\u062F\u0647", "Unread")}"></span>` : ""}
            <a class="b" href="#/admin/tickets/${x.id}">${esc(x.subject)}</a>
            <div class="tiny muted mono">${esc(x.code)}</div>
            ${x.lastMessage ? html`<div class="tiny muted clip">${esc(x.lastMessage)}</div>` : ""}
          </td>
          <td>${t(`tc.${x.category}`)}</td>
          <td><span class="badge-pill ${PRI_CLASS2[x.priority] || "bp-info"}">${t(`tp.${x.priority}`)}</span></td>
          <td class="tiny">${esc(x.userName || "")}<div class="tiny muted mono">${fmtTel(x.userPhone || "")}</div></td>
          <td class="num">${fmtNum(x.messageCount || 0)}</td>
          <td><span class="badge-pill ${STATUS_CLASS2[x.status] || "bp-muted"}">${t(`tk.${x.status}`)}</span></td>
          <td class="num tiny nowrap">${timeAgo(x.updatedAt || x.createdAt)}</td>
          <td><a class="btn btn-ghost btn-xs" href="#/admin/tickets/${x.id}">${icon("chevron-left")}</a></td>
        </tr>`),
    { emptyText: t("acc.noTickets") }
  )}`;
}
async function ticketDetail(id) {
  let tk = null;
  try {
    tk = (await api.get(`/api/admin/tickets/${id}`)).ticket;
  } catch (err) {
    return err?.status === 404 ? emptyState({ icon: "ticket", title: t("acc.noTickets"), action: { href: "#/admin/tickets", label: t("adm.tickets") } }) : errorState({ title: err?.message || t("err.generic") });
  }
  const u = tk.user;
  return html`
    <div class="breadcrumb mb-s">
      <a href="#/admin/tickets">${t("adm.tickets")}</a> <span>/</span> <span class="mono">${esc(tk.code)}</span>
    </div>

    <div class="cart-grid">
      <div class="col">
        <div class="card">
          <div class="row row-between row-wrap">
            <div>
              <h2 class="buy-title">${icon("ticket")} ${esc(tk.subject)}</h2>
              <p class="muted small mt-s">
                <span class="mono">${esc(tk.code)}</span> · ${t("acc.ticketCategory")}: ${t(`tc.${tk.category}`)} ·
                ${fmtDate(tk.createdAt)} · ${L("\u0622\u062E\u0631\u06CC\u0646 \u0628\u0647\u200C\u0631\u0648\u0632\u0631\u0633\u0627\u0646\u06CC", "Updated")}: ${timeAgo(tk.updatedAt || tk.createdAt)}
              </p>
            </div>
            <div class="row row-wrap">
              <span class="badge-pill ${STATUS_CLASS2[tk.status] || "bp-muted"}">${t(`tk.${tk.status}`)}</span>
              <span class="badge-pill ${PRI_CLASS2[tk.priority] || "bp-info"}">${t(`tp.${tk.priority}`)}</span>
            </div>
          </div>
        </div>

        <div class="card mt">
          <strong>${icon("chat")} ${t("common.messages")} (${fmtNum(tk.messages?.length || 0)})</strong>
          <div class="tk-thread mt">
            ${(tk.messages || []).map(messageHtml2).join("")}
          </div>
          <form class="mt" data-act="adm-tk-reply" data-id="${tk.id}">
            <label class="field">
              <span class="label">${t("adm.tkReply")}</span>
              <textarea class="textarea" name="body" rows="3" placeholder="${L("\u067E\u0627\u0633\u062E \u062E\u0648\u062F \u0631\u0627 \u0628\u0646\u0648\u06CC\u0633\u2026", "Write your reply\u2026")}"></textarea>
            </label>
            <div class="row row-wrap mt-s">
              <button class="btn btn-primary" type="submit">${icon("send")} ${t("common.send")}</button>
              <select class="select select-sm" name="status">
                <option value="answered">${t("tk.answered")}</option>
                <option value="open">${t("tk.open")}</option>
                <option value="closed">${t("tk.closed")}</option>
              </select>
            </div>
          </form>
        </div>
      </div>

      <aside class="col">
        <div class="card">
          <strong>${icon("user")} ${esc(u?.name || tk.userName || "")}</strong>
          <div class="mt-s">
            <div class="sum-row"><span>${t("common.phone")}</span><span class="v mono">${fmtTel(u?.phone || tk.userPhone || "")}</span></div>
            ${u?.email ? html`<div class="sum-row"><span>${t("common.email")}</span><span class="v tiny">${esc(u.email)}</span></div>` : ""}
            <div class="sum-row"><span>${t("acc.plus")}</span><span class="v">${u?.plus ? html`<span class="badge-pill bp-accent">${t("common.active")}</span>` : html`<span class="muted">—</span>`}</span></div>
            <div class="sum-row"><span>${t("common.orders")}</span><span class="v">${fmtNum(u?.orders || 0)}</span></div>
          </div>
          ${u ? html`<a class="btn btn-ghost btn-sm btn-block mt-s" href="#/admin/users/${u.id}">${icon("edit")} ${L("\u0645\u062F\u06CC\u0631\u06CC\u062A \u06A9\u0627\u0631\u0628\u0631", "Manage user")}</a>` : ""}
        </div>

        <div class="card mt">
          <strong>${icon("settings")} ${t("adm.tkManage")}</strong>
          <form class="mt-s" data-act="adm-tk-meta" data-id="${tk.id}">
            <label class="field"><span class="label">${t("common.priority")}</span>
              <select class="select" name="priority">
                ${["critical", "high", "normal", "low"].map((p) => html`<option value="${p}" ${tk.priority === p ? "selected" : ""}>${t(`tp.${p}`)}</option>`)}
              </select>
            </label>
            <button class="btn btn-outline btn-sm btn-block" type="submit">${t("common.save")}</button>
          </form>
          <div class="row row-wrap mt-s">
            ${tk.status !== "closed" ? html`<button class="btn btn-ghost btn-sm" data-act="adm-tk-status" data-id="${tk.id}" data-status="closed">${icon("check")} ${L("\u0628\u0633\u062A\u0646 \u062A\u06CC\u06A9\u062A", "Close ticket")}</button>` : html`<button class="btn btn-ghost btn-sm" data-act="adm-tk-status" data-id="${tk.id}" data-status="open">${icon("refresh")} ${L("\u0628\u0627\u0632\u06A9\u0631\u062F\u0646", "Reopen")}</button>`}
          </div>
        </div>
      </aside>
    </div>`;
}
function messageHtml2(m) {
  const staff = m.from === "staff";
  const cls = m.from === "system" ? "them sys" : staff ? "me" : "them";
  const who = staff ? m.staffName ? `${t("common.support")} \xB7 ${m.staffName}` : t("common.support") : m.name || t("common.user");
  return html`
    <div class="msg ${cls}">
      <div class="msg-bubble">
        <div class="row row-between">
          <strong class="tiny">${esc(who)}</strong>
          <span class="tiny muted nowrap">${timeAgo(m.at)}</span>
        </div>
        <div class="msg-text">${esc(m.body || "").replace(/\n/g, "<br>")}</div>
        ${(m.attachments || []).length ? html`<div class="row row-wrap mt-s">${m.attachments.map((a) => html`<img class="tk-att" src="${esc(a)}" alt="${t("common.image")}" loading="lazy" data-act="adm-att-open" data-url="${esc(a)}">`)}</div>` : ""}
      </div>
    </div>`;
}
async function support(userId) {
  let r = null;
  try {
    r = await api.get("/api/admin/support");
  } catch (err) {
    return errorState({ title: err?.message || t("err.generic") });
  }
  THREADS = r.items || [];
  const active = THREADS.find((x) => x.userId === userId) || null;
  return html`
    <div class="row row-between row-wrap mb">
      <h2 class="section-title">${icon("chat")} ${t("adm.support")}</h2>
      <span class="badge-pill bp-info">${fmtNum(THREADS.reduce((a, b) => a + (b.unread || 0), 0))} ${L("\u062E\u0648\u0627\u0646\u062F\u0647\u200C\u0646\u0634\u062F\u0647", "unread")}</span>
    </div>

    <div class="sup-grid">
      <div class="card sup-list">
        ${THREADS.length ? THREADS.map((x) => html`
          <a class="sup-item ${active && active.userId === x.userId ? "active" : ""} ${x.unread ? "has-new" : ""}" href="#/admin/support/${x.userId}">
            <span class="sup-av">${esc((x.userName || "?").slice(0, 1))}</span>
            <span class="grow">
              <span class="row row-between"><strong class="tiny">${esc(x.userName || "")}</strong><span class="tiny muted nowrap">${timeAgo(x.last?.at)}</span></span>
              <span class="tiny muted clip">${esc(x.last?.body || "")}</span>
            </span>
            ${x.unread ? html`<span class="badge-pill bp-danger">${fmtNum(x.unread)}</span>` : ""}
          </a>`).join("") : html`<p class="muted small">${t("common.noData")}</p>`}
      </div>

      <div class="card sup-chat">
        ${active ? html`
          <div class="row row-between mb-s">
            <strong>${icon("user")} ${esc(active.userName)}</strong>
            <span class="tiny muted">${fmtNum(active.count || 0)} ${t("common.messages")}</span>
          </div>
          <div class="msg-thread sup-thread" data-thread>
            ${(active.messages || []).map(messageHtml2).join("")}
          </div>
          <form class="row mt-s" data-act="adm-sup-send" data-id="${active.userId}">
            <input class="input grow" name="body" placeholder="${L("\u067E\u0627\u0633\u062E \u0633\u0631\u06CC\u0639\u2026", "Quick reply\u2026")}" autocomplete="off">
            <button class="btn btn-primary" type="submit">${icon("send")}</button>
          </form>
        ` : emptyState({ icon: "chat", title: t("adm.supSelect"), text: t("adm.supSelectHint") })}
      </div>
    </div>`;
}
function mount20(root, ctx) {
  applyDyn(root);
  if (ctx?.params?.section === "support" && ctx.params.id) {
    const box = root.querySelector("[data-thread]");
    if (box) box.scrollTop = box.scrollHeight;
  }
  return null;
}
var L, STATUS_CLASS2, PRI_CLASS2, F4, THREADS;
var init_tickets = __esm({
  "public/js/views/admin/tickets.mjs"() {
    init_dom();
    init_i18n();
    init_api();
    init_state();
    init_components();
    init_ui();
    init_actions();
    init_router();
    L = (fa3, en2) => isFa2() ? fa3 : en2;
    STATUS_CLASS2 = { open: "bp-warn", answered: "bp-success", closed: "bp-muted" };
    PRI_CLASS2 = { critical: "bp-danger", high: "bp-warn", normal: "bp-info", low: "bp-muted" };
    F4 = { status: "" };
    act("adm-tk-filter", (e, form) => {
      e.preventDefault();
      F4.status = String(new FormData(form).get("status") || "");
      refresh(true);
    });
    act("adm-att-open", (e, el2) => {
      e.preventDefault();
      lightbox([el2.dataset.url], 0, t("common.image"));
    });
    act("adm-tk-reply", async (e, form) => {
      e.preventDefault();
      const fd = new FormData(form);
      const body = String(fd.get("body") || "").trim();
      if (body.length < 1) return;
      await withBusy(form.querySelector("button[type=submit]"), async () => {
        try {
          await api.patch(`/api/admin/tickets/${form.dataset.id}`, { body, status: fd.get("status") || "answered" });
          toastSuccess(t("misc.sent"));
          refresh(true);
        } catch (err) {
          toastApiError(err);
        }
      });
    });
    act("adm-tk-meta", async (e, form) => {
      e.preventDefault();
      try {
        await api.patch(`/api/admin/tickets/${form.dataset.id}`, { priority: new FormData(form).get("priority") });
        toastSuccess(t("misc.saved"));
        refresh(true);
      } catch (err) {
        toastApiError(err);
      }
    });
    act("adm-tk-status", async (e, el2) => {
      try {
        await api.patch(`/api/admin/tickets/${el2.dataset.id}`, { status: el2.dataset.status });
        toastSuccess(t("misc.saved"));
        refresh(true);
      } catch (err) {
        toastApiError(err);
      }
    });
    THREADS = [];
    act("adm-sup-send", async (e, form) => {
      e.preventDefault();
      const input = form.querySelector("[name=body]");
      const body = String(input.value || "").trim();
      if (!body) return;
      input.value = "";
      try {
        await api.post(`/api/admin/support/${form.dataset.id}`, { body });
        const box = form.closest(".sup-chat")?.querySelector("[data-thread]");
        if (box) {
          const wrap = document.createElement("div");
          wrap.innerHTML = messageHtml2({ from: "staff", staffName: S.me?.name || "", body, at: (/* @__PURE__ */ new Date()).toISOString() }).trim();
          if (wrap.firstElementChild) box.appendChild(wrap.firstElementChild);
          box.scrollTop = box.scrollHeight;
        }
        const item = THREADS.find((x) => x.userId === form.dataset.id);
        if (item) {
          item.last = { body, at: (/* @__PURE__ */ new Date()).toISOString(), from: "staff" };
          item.unread = 0;
        }
        toastSuccess(t("misc.sent"));
      } catch (err) {
        toastApiError(err);
        input.value = body;
      }
    });
  }
});

// public/js/views/admin/feedback.mjs
var feedback_exports = {};
__export(feedback_exports, {
  mount: () => mount21,
  render: () => render23
});
async function render23() {
  let r = null;
  try {
    r = await api.get(api.url("/api/admin/feedback", { type: F5.type }));
  } catch (err) {
    return errorState({ title: err?.message || t("err.generic") });
  }
  let items = r.items || [];
  if (F5.status) items = items.filter((x) => x.status === F5.status);
  return html`
    <div class="row row-between row-wrap mb">
      <div>
        <h2 class="section-title">${icon("mail")} ${t("adm.feedback")}</h2>
        <p class="muted small">${fmtNum(r.counts?.total || items.length)} ${L3("\u0645\u0648\u0631\u062F", "items")} · ${fmtNum(r.counts?.new || 0)} ${L3("\u062C\u062F\u06CC\u062F", "new")}</p>
      </div>
    </div>

    <form class="card mb adm-filter" data-act="adm-fb-filter">
      <div class="form-grid">
        ${selectField({
    label: t("common.type"),
    name: "type",
    value: F5.type,
    options: [{ value: "", label: t("common.all") }, { value: "suggestion", label: t("feedback.suggestion") }, { value: "complaint", label: t("feedback.complaint") }, { value: "bug", label: t("feedback.bug") }]
  })}
        ${selectField({
    label: t("common.status"),
    name: "status",
    value: F5.status,
    options: [{ value: "", label: t("common.all") }, ...Object.entries(STATUS_META).map(([v, [, l]]) => ({ value: v, label: l() }))]
  })}
      </div>
      <div class="row row-wrap mt-s">
        <button class="btn btn-primary btn-sm" type="submit">${icon("filter")} ${t("common.apply")}</button>
      </div>
    </form>

    ${items.length ? html`<div class="rev-list">${items.map(fbCard).join("")}</div>` : emptyState({ icon: "mail", title: t("common.noData"), text: t("adm.fbEmptyHint") })}`;
}
function fbCard(f) {
  const meta = TYPE_META[f.type] || { icon: "mail", cls: "bp-muted" };
  const [sCls, sLabel] = STATUS_META[f.status] || ["bp-muted", () => f.status];
  return html`
    <article class="card rev-card">
      <div class="row row-between row-wrap mb-s">
        <div class="row">
          <span class="fb-ic ${meta.cls}">${icon(meta.icon)}</span>
          <div>
            <strong>${esc(f.title || "")}</strong>
            <div class="tiny muted">
              ${t(`feedback.${f.type}`)} · ${esc(f.userName || L3("\u0645\u0647\u0645\u0627\u0646", "Guest"))} · ${timeAgo(f.createdAt)}
              ${f.contact ? ` \xB7 ${esc(f.contact)}` : ""}${f.page ? ` \xB7 ${esc(f.page)}` : ""}
            </div>
          </div>
        </div>
        <span class="badge-pill ${sCls}">${sLabel()}</span>
      </div>
      <p class="rev-body">${esc(f.body || "")}</p>
      ${(f.attachments || []).length ? html`
        <div class="row row-wrap mt-s">
          ${f.attachments.map((a) => html`<img class="tk-att" src="${esc(a)}" alt="" loading="lazy" data-act="adm-att-open" data-url="${esc(a)}">`)}
        </div>` : ""}
      ${f.device?.ua ? html`<p class="tiny muted mono mt-s clip-wide">${esc(f.device.ua)}${f.device.screen ? ` \xB7 ${esc(f.device.screen)}` : ""}</p>` : ""}
      ${f.answer ? html`
        <div class="rev-reply">
          <span class="tiny muted">${icon("send")} ${L3("\u067E\u0627\u0633\u062E \u0645\u0627", "Our answer")}</span>
          <p>${esc(f.answer)}</p>
        </div>` : ""}
      <form class="mt-s" data-act="adm-fb-save" data-id="${f.id}">
        <div class="row row-wrap">
          <select class="select select-sm" name="status">
            ${Object.entries(STATUS_META).map(([v, [, l]]) => html`<option value="${v}" ${f.status === v ? "selected" : ""}>${l()}</option>`)}
          </select>
          <input class="input grow" name="answer" value="${esc(f.answer || "")}" placeholder="${L3("\u067E\u0627\u0633\u062E\u2026", "Answer\u2026")}">
          <button class="btn btn-outline btn-sm" type="submit">${icon("save")} ${t("common.save")}</button>
        </div>
      </form>
      <div class="tiny muted mt-s">${L3("\u062B\u0628\u062A", "Created")}: ${fmtDate(f.createdAt)}</div>
    </article>`;
}
function mount21(root) {
  applyDyn(root);
  return null;
}
var L3, F5, TYPE_META, STATUS_META;
var init_feedback = __esm({
  "public/js/views/admin/feedback.mjs"() {
    init_dom();
    init_i18n();
    init_api();
    init_components();
    init_ui();
    init_actions();
    init_router();
    L3 = (fa3, en2) => isFa2() ? fa3 : en2;
    F5 = { type: "", status: "" };
    TYPE_META = {
      suggestion: { icon: "sparkles", cls: "bp-info" },
      complaint: { icon: "flag", cls: "bp-warn" },
      bug: { icon: "bug", cls: "bp-danger" }
    };
    STATUS_META = {
      new: ["bp-info", () => t("fb.new")],
      seen: ["bp-muted", () => t("fb.seen")],
      in_progress: ["bp-warn", () => t("fb.inProgress")],
      done: ["bp-success", () => t("fb.done")],
      rejected: ["bp-danger", () => t("fb.rejected")]
    };
    act("adm-fb-filter", (e, form) => {
      e.preventDefault();
      const fd = new FormData(form);
      F5.type = String(fd.get("type") || "");
      F5.status = String(fd.get("status") || "");
      refresh(true);
    });
    act("adm-fb-save", async (e, form) => {
      e.preventDefault();
      const fd = new FormData(form);
      await withBusy(form.querySelector("button[type=submit]"), async () => {
        try {
          await api.patch(`/api/admin/feedback/${form.dataset.id}`, { status: fd.get("status"), answer: String(fd.get("answer") || "") });
          toastSuccess(t("misc.saved"));
          refresh(true);
        } catch (err) {
          toastApiError(err);
        }
      });
    });
  }
});

// public/js/views/admin/users.mjs
var users_exports = {};
__export(users_exports, {
  mount: () => mount22,
  render: () => render24
});
async function render24(ctx) {
  if (ctx.params.id) return detail2(ctx.params.id);
  return list4();
}
async function load() {
  const r = await api.get(api.url("/api/admin/users", { q: F6.q, role: F6.role }));
  CACHE = r.items || [];
  PERMS = r.permissions || [];
  return r;
}
async function list4() {
  const bansCard = await bansPanel();
  let r = null;
  try {
    r = await load();
  } catch (err) {
    return errorState({ title: err?.message || t("err.generic") });
  }
  return html`
    <div class="row row-between row-wrap mb">
      <div>
        <h2 class="section-title">${icon("users")} ${t("adm.users")}</h2>
        <p class="muted small">${fmtNum(CACHE.length)} ${t("common.users")}</p>
      </div>
    </div>

    <form class="card mb adm-filter" data-act="adm-u-filter">
      <div class="form-grid">
        <label class="field"><span class="label">${t("common.search")}</span>
          <input class="input" name="q" value="${esc(F6.q)}" placeholder="${t("common.name")} / ${t("common.username")} / ${t("common.phone")}">
        </label>
        ${selectField({
    label: t("adm.uRole"),
    name: "role",
    value: F6.role,
    options: [{ value: "", label: t("common.all") }, { value: "user", label: t("common.user") }, { value: "staff", label: L4("\u06A9\u0627\u0631\u0645\u0646\u062F", "Staff") }, { value: "owner", label: L4("\u0645\u0627\u0644\u06A9", "Owner") }]
  })}
      </div>
      <div class="row row-wrap mt-s">
        <button class="btn btn-primary btn-sm" type="submit">${icon("filter")} ${t("common.apply")}</button>
        <button class="btn btn-ghost btn-sm" type="button" data-act="adm-u-clear">${icon("close")} ${t("catalog.f.clear")}</button>
      </div>
    </form>

    ${tableHtml(
    [
      { label: t("common.user") },
      { label: t("common.phone") },
      { label: t("adm.uRole") },
      { label: t("common.balance"), cls: "num" },
      { label: t("acc.plus"), cls: "num" },
      { label: t("common.orders"), cls: "num" },
      { label: t("adm.uDevice") },
      { label: t("common.status") },
      { label: "", cls: "num" }
    ],
    CACHE.map((u) => html`
        <tr>
          <td>
            <span class="b">${esc(u.name || u.username)}</span>
            <span class="tiny muted mono">@${esc(u.username)}</span>
            ${u.twoFA ? html`<span class="badge-pill bp-success tiny">${icon("shield")}</span>` : ""}
          </td>
          <td class="mono tiny nowrap">${fmtTel(u.phone || "")}${u.email ? html`<div class="tiny muted">${esc(u.email)}</div>` : ""}</td>
          <td>${roleBadge(u.role)}</td>
          <td>${kycBadge(u.kycStatus)}</td>
          <td class="num">${fmtNum(u.wallet || 0)}</td>
          <td class="num">${u.plus ? html`<span class="badge-pill bp-accent">${t("common.active")}</span>` : html`<span class="muted">—</span>`}</td>
          <td class="num">${fmtNum(u.orders || 0)}<div class="tiny muted">${fmtMoney(u.spent || 0)}</div></td>
          <td class="tiny">${u.lastAgent ? html`<span>${u.lastAgent.os} · ${u.lastAgent.device}</span><div class="muted mono tiny">${esc(u.lastIp || "")}</div>` : html`<span class="muted">—</span>`}</td>
          <td>${u.banned ? html`<span class="badge-pill bp-danger">${t("adm.banned")}</span>` : u.status === "blocked" ? html`<span class="badge-pill bp-danger">${t("adm.uBlocked")}</span>` : html`<span class="badge-pill bp-success">${t("common.active")}</span>`}</td>
          <td><div class="row row-end">
            ${can("users.manage") ? html`<button class="btn ${u.banned ? "btn-success" : "btn-danger"} btn-xs" data-act="adm-u-ban-toggle" data-id="${u.id}" data-val="${esc(u.phone || u.username)}" data-banned="${u.banned ? "1" : ""}" title="${u.banned ? t("adm.unban") : t("adm.ban")}">${icon(u.banned ? "check" : "lock")}</button>` : ""}
            ${can("users.manage") ? html`<a class="btn btn-ghost btn-xs" href="#/admin/users/${u.id}">${icon("edit")}</a>` : ""}
          </div></td>
        </tr>`),
    { emptyText: t("common.noResult") }
  )}`;
}
function roleBadge(role) {
  const map = { owner: "bp-accent", staff: "bp-info", user: "bp-muted" };
  const label = { owner: L4("\u0645\u0627\u0644\u06A9", "Owner"), staff: L4("\u06A9\u0627\u0631\u0645\u0646\u062F", "Staff"), user: t("common.user") }[role] || role;
  return html`<span class="badge-pill ${map[role] || "bp-muted"}">${label}</span>`;
}
async function detail2(id) {
  try {
    if (!CACHE.length) await load();
  } catch (err) {
    return errorState({ title: err?.message || t("err.generic") });
  }
  const u = CACHE.find((x) => x.id === id);
  if (!u) return emptyState({ icon: "user", title: t("common.noResult"), action: { href: "#/admin/users", label: t("adm.users") } });
  const perms = u.permissions || {};
  const isSelf = S.me?.id === u.id;
  const canPerms = can("users.permissions");
  return html`
    <div class="breadcrumb mb-s">
      <a href="#/admin/users">${t("adm.users")}</a> <span>/</span> <span>${esc(u.name || u.username)}</span>
    </div>

    <div class="card">
      <div class="row row-between row-wrap">
        <div>
          <h2 class="buy-title">${icon("user")} ${esc(u.name || u.username)} <span class="muted mono small">@${esc(u.username)}</span></h2>
          <p class="muted small mt-s">
            ${fmtTel(u.phone || "")}${u.email ? ` \xB7 ${esc(u.email)}` : ""} ·
            ${t("acc.memberSince", { date: fmtDate(u.createdAt, { time: false }) })} ·
            ${L4("\u0622\u062E\u0631\u06CC\u0646 \u0648\u0631\u0648\u062F", "Last login")}: ${u.lastLoginAt ? fmtDate(u.lastLoginAt) : t("common.never")} (${fmtNum(u.loginCount || 0)})
          </p>
        </div>
        <div class="row row-wrap">
          ${roleBadge(u.role)}
          ${u.status === "blocked" ? html`<span class="badge-pill bp-danger">${t("adm.uBlocked")}</span>` : ""}
          ${u.plus ? html`<span class="badge-pill bp-accent">${t("acc.plus")} ${fmtDate(u.plusUntil, { time: false })}</span>` : ""}
        </div>
      </div>
      <div class="stats-grid mt">
        <div class="stat-card"><span class="stat-ic">${icon("wallet")}</span><div><div class="stat-val">${fmtNum(u.wallet || 0)}</div><div class="stat-lbl">${t("common.balance")}</div></div></div>
        <div class="stat-card"><span class="stat-ic">${icon("gift")}</span><div><div class="stat-val">${fmtNum(u.points || 0)}</div><div class="stat-lbl">${t("common.points")}</div></div></div>
        <div class="stat-card"><span class="stat-ic">${icon("package-check")}</span><div><div class="stat-val">${fmtNum(u.orders || 0)}</div><div class="stat-lbl">${t("common.orders")}</div></div></div>
        <div class="stat-card"><span class="stat-ic">${icon("card")}</span><div><div class="stat-val">${fmtMoney(u.spent || 0)}</div><div class="stat-lbl">${L4("\u0645\u062C\u0645\u0648\u0639 \u062E\u0631\u06CC\u062F", "Total spent")}</div></div></div>
      </div>
    </div>

    
    <!-- KYC Management -->
    ${u.kycStatus && u.kycStatus !== "none" ? html`
      <div class="card mt box pad border-warning">
        <h3 class="mb-3">${icon("shield-check")} احراز هویت (KYC)</h3>
        <p class="muted">وضعیت فعلی: ${kycBadge(u.kycStatus)}</p>
        ${u.kycDocs ? html`
          <div class="grid gap-3 mt-3">
            <div>
              <strong>سلفی:</strong> <a href="#" target="_blank">${u.kycDocs.selfie}</a>
            </div>
            <div>
              <strong>کارت ملی:</strong> <a href="#" target="_blank">${u.kycDocs.idCard}</a>
            </div>
            <div>
              <strong>فرم تعهدنامه:</strong> <a href="#" target="_blank">${u.kycDocs.formDoc}</a>
            </div>
          </div>
        ` : ""}
        <form class="mt-4 row row-wrap gap-2" onsubmit="event.preventDefault(); window.submitAdminKyc(event.target, '${u.id}')">
          <select class="input" name="kycStatus">
            <option value="pending" ${u.kycStatus === "pending" ? "selected" : ""}>در انتظار</option>
            <option value="approved" ${u.kycStatus === "approved" ? "selected" : ""}>تأیید شده</option>
            <option value="rejected" ${u.kycStatus === "rejected" ? "selected" : ""}>رد شده</option>
          </select>
          <input class="input flex-1" name="kycMessage" placeholder="پیام در صورت رد شدن مدارک..." value="${esc(u.kycMessage || "")}">
          <button class="btn primary" type="submit">${icon("save")} ذخیره وضعیت KYC</button>
        </form>
      </div>
    ` : ""}

    <form class="card mt" data-act="adm-u-save" data-id="${u.id}">
      <div class="form-grid">
        ${selectField({
    label: t("adm.uRole"),
    name: "role",
    value: u.role,
    options: [
      { value: "user", label: t("common.user") },
      { value: "staff", label: L4("\u06A9\u0627\u0631\u0645\u0646\u062F", "Staff") },
      ...canPerms && (S.me?.role === "owner" || u.role !== "owner") ? [{ value: "owner", label: L4("\u0645\u0627\u0644\u06A9", "Owner") }] : []
    ]
  })}
        ${selectField({
    label: t("adm.uStatus"),
    name: "status",
    value: u.status || "active",
    options: [{ value: "active", label: t("common.active") }, { value: "blocked", label: t("adm.uBlocked") }]
  })}
        ${field2({ label: t("common.points"), name: "points", type: "number", value: u.points || 0, attrs: 'min="0" max="1000000"' })}
      </div>

      ${canPerms ? html`
        <div class="row row-between row-wrap mt">
          <strong>${icon("key")} ${t("adm.uPerms")}</strong>
          <div class="row">
            <button type="button" class="btn btn-ghost btn-xs" data-act="adm-perm-all" data-v="1">${t("adm.uAll")}</button>
            <button type="button" class="btn btn-ghost btn-xs" data-act="adm-perm-all" data-v="0">${t("adm.uNone")}</button>
          </div>
        </div>
        <p class="hint">${t("adm.uPermsHint")}</p>
        <div class="perm-grid mt-s">
          ${PERMS.map((p) => html`
            <label class="perm-item">
              <span class="switch"><input type="checkbox" name="perm.${p.key}" ${perms[p.key] ? "checked" : ""}><span class="track"></span></span>
              <span class="grow">${esc(isFa2() ? p.fa : p.en || p.fa)}<span class="k mono">${p.key}</span></span>
            </label>`)}
        </div>` : ""}

      <div class="row row-wrap mt">
        <button class="btn btn-primary" type="submit">${icon("save")} ${t("common.save")}</button>
        <a class="btn btn-ghost" href="#/admin/users">${t("common.back")}</a>
      </div>
    </form>

    <div class="acc-grid acc-grid-eq mt">
      ${can("wallet.manage") ? html`
      <form class="card" data-act="adm-u-wallet" data-id="${u.id}">
        <strong>${icon("wallet")} ${t("adm.uWalletAdjust")}</strong>
        <p class="muted small mt-s">${t("common.balance")}: ${fmtMoney(u.wallet || 0)}</p>
        ${field2({ label: t("common.amount"), name: "walletAdjust", type: "number", value: "", attrs: 'min="-50000000" max="50000000" step="10000"', placeholder: "\xB1" })}
        ${field2({ label: t("adm.uWalletReason"), name: "walletReason", value: "" })}
        <button class="btn btn-outline" type="submit">${t("common.apply")}</button>
      </form>` : ""}

      ${can("plus.manage") ? html`
      <form class="card" data-act="adm-u-plus" data-id="${u.id}">
        <strong>${icon("sparkles")} ${t("adm.uPlusDays")}</strong>
        <p class="muted small mt-s">${u.plus ? `${t("acc.plusActive", { date: fmtDate(u.plusUntil, { time: false }) })}` : t("acc.plusInactive")}</p>
        ${field2({ label: t("common.day"), name: "plusDays", type: "number", value: "30", attrs: 'min="-365" max="365"' })}
        <div class="row row-wrap">
          <button class="btn btn-outline" type="submit">${t("common.apply")}</button>
          <button class="btn btn-ghost" type="button" data-act="adm-u-plus-off" data-id="${u.id}">${t("common.disabled")}</button>
        </div>
      </form>` : ""}

      ${can("users.manage") && !isSelf ? html`
      <form class="card" data-act="adm-u-pass" data-id="${u.id}">
        <strong>${icon("key")} ${t("adm.uResetPass")}</strong>
        <p class="muted small mt-s">${L4("\u067E\u0633 \u0627\u0632 \u062A\u063A\u06CC\u06CC\u0631\u060C \u06A9\u0627\u0631\u0628\u0631 \u0628\u0627\u06CC\u062F \u062F\u0648\u0628\u0627\u0631\u0647 \u0648\u0627\u0631\u062F \u0634\u0648\u062F \u0648 \u0631\u0645\u0632 \u0631\u0627 \u0639\u0648\u0636 \u06A9\u0646\u062F.", "The user must sign in again and change the password.")}</p>
        ${field2({ label: t("auth.newPassword"), name: "resetPassword", type: "text", value: "", hint: t("auth.passwordRules") })}
        <button class="btn btn-danger" type="submit">${t("common.reset")}</button>
      </form>` : ""}
    </div>`;
}
function mount22(root) {
  applyDyn(root);
  return null;
}
async function bansPanel() {
  if (!can("users.manage")) return "";
  let r = { items: [] };
  try {
    r = await api.get("/api/admin/bans");
  } catch {
    return "";
  }
  return html`
    <div class="card mb">
      <strong>${icon("lock")} ${t("adm.bans")}</strong>
      <form class="form-grid mt-s" data-act="adm-ban-add">
        ${selectField({ label: t("adm.banType"), name: "type", options: [{ value: "ip", label: "IP" }, { value: "phone", label: t("contact.mobile") }, { value: "email", label: t("common.email") }, { value: "username", label: t("common.username") }] })}
        ${field2({ label: t("adm.banValue"), name: "value", required: true })}
        ${field2({ label: t("adm.banReason"), name: "reason" })}
        ${field2({ label: t("adm.banMinutes"), name: "minutes", type: "number", value: "0", attrs: 'min="0" max="525600" inputmode="numeric"' })}
        <button class="btn btn-danger" type="submit">${icon("lock")} ${t("adm.ban")}</button>
      </form>
      ${r.items?.length ? html`<div class="table-wrap mt-s"><table class="table">
        <thead><tr><th>${t("adm.banType")}</th><th>${t("adm.banValue")}</th><th>${t("adm.banReason")}</th><th>${t("common.date")}</th><th></th></tr></thead>
        <tbody>${r.items.map((b) => html`<tr>
          <td class="tiny">${b.type}${b.auto ? html` <span class="badge-pill bp-warn tiny">${t("adm.banAuto")}</span>` : ""}</td><td class="mono tiny">${esc(b.value)}</td><td class="tiny muted">${esc(b.reason || "")}</td><td class="tiny">${fmtDate(b.at)}${b.until ? html`<br><span class="muted">${t("adm.banUntil")}: ${fmtDate(b.until)}</span>` : ""}</td>
          <td><button class="btn btn-success btn-xs" data-act="adm-ban-del" data-id="${b.id}">${icon("check")} ${t("adm.unban")}</button></td>
        </tr>`)}</tbody></table></div>` : html`<p class="muted small mt-s">${t("adm.bansEmpty")}</p>`}
    </div>`;
}
function kycBadge(status) {
  if (status === "approved") return html`<span class="${applyDyn("badge-pill bp-success")}">تأیید شده</span>`;
  if (status === "pending") return html`<span class="${applyDyn("badge-pill bp-warning")}">در انتظار</span>`;
  if (status === "rejected") return html`<span class="${applyDyn("badge-pill bp-danger")}">رد شده</span>`;
  return html`<span class="${applyDyn("muted")}">—</span>`;
}
var F6, PERMS, CACHE, L4;
var init_users = __esm({
  "public/js/views/admin/users.mjs"() {
    init_dom();
    init_i18n();
    init_api();
    init_state();
    init_components();
    init_ui();
    init_actions();
    init_router();
    F6 = { q: "", role: "" };
    PERMS = [];
    CACHE = [];
    L4 = (fa3, en2) => isFa2() ? fa3 : en2;
    act("adm-u-filter", (e, form) => {
      e.preventDefault();
      const fd = new FormData(form);
      F6.q = String(fd.get("q") || "").trim();
      F6.role = String(fd.get("role") || "");
      refresh(true);
    });
    act("adm-u-clear", () => {
      F6.q = "";
      F6.role = "";
      refresh(true);
    });
    act("adm-perm-all", (e, el2) => {
      const on2 = el2.dataset.v === "1";
      el2.closest("form").querySelectorAll('input[name^="perm."]').forEach((i) => {
        i.checked = on2;
      });
    });
    act("adm-u-save", async (e, form) => {
      e.preventDefault();
      const fd = new FormData(form);
      const payload = {
        role: fd.get("role"),
        status: fd.get("status"),
        points: Number(fd.get("points") || 0)
      };
      const perms = {};
      let hasPerms = false;
      form.querySelectorAll('input[name^="perm."]').forEach((i) => {
        perms[i.name.slice(5)] = i.checked;
        hasPerms = true;
      });
      if (hasPerms) payload.permissions = perms;
      await withBusy(form.querySelector("button[type=submit]"), async () => {
        try {
          await api.patch(`/api/admin/users/${form.dataset.id}`, payload);
          toastSuccess(t("adm.uSaved"));
          CACHE = [];
          refresh(true);
        } catch (err) {
          toastApiError(err);
        }
      });
    });
    act("adm-u-wallet", async (e, form) => {
      e.preventDefault();
      const fd = new FormData(form);
      const amount = Number(fd.get("walletAdjust") || 0);
      if (!amount) return;
      await withBusy(form.querySelector("button[type=submit]"), async () => {
        try {
          await api.patch(`/api/admin/users/${form.dataset.id}`, { walletAdjust: amount, walletReason: fd.get("walletReason") || "\u062A\u0646\u0638\u06CC\u0645 \u062A\u0648\u0633\u0637 \u0645\u062F\u06CC\u0631" });
          toastSuccess(t("adm.uSaved"));
          CACHE = [];
          refresh(true);
        } catch (err) {
          toastApiError(err);
        }
      });
    });
    act("adm-u-plus", async (e, form) => {
      e.preventDefault();
      const days = Number(new FormData(form).get("plusDays") || 0);
      if (!days) return;
      await withBusy(form.querySelector("button[type=submit]"), async () => {
        try {
          await api.patch(`/api/admin/users/${form.dataset.id}`, { plusDays: days });
          toastSuccess(t("adm.uSaved"));
          CACHE = [];
          refresh(true);
        } catch (err) {
          toastApiError(err);
        }
      });
    });
    act("adm-u-plus-off", async (e, el2) => {
      const ok = await confirmDialog({ text: L4("\u0627\u0634\u062A\u0631\u0627\u06A9 \u067E\u0644\u0627\u0633 \u0627\u06CC\u0646 \u06A9\u0627\u0631\u0628\u0631 \u063A\u06CC\u0631\u0641\u0639\u0627\u0644 \u0634\u0648\u062F\u061F", "Disable Plus for this user?") });
      if (!ok) return;
      try {
        await api.patch(`/api/admin/users/${el2.dataset.id}`, { plusDays: -365 });
        toastSuccess(t("adm.uSaved"));
        CACHE = [];
        refresh(true);
      } catch (err) {
        toastApiError(err);
      }
    });
    act("adm-u-pass", async (e, form) => {
      e.preventDefault();
      const pass = String(new FormData(form).get("resetPassword") || "");
      if (pass.length < 8) {
        toastApiError({ code: "weak_password", message: t("auth.passwordRules") });
        return;
      }
      await withBusy(form.querySelector("button[type=submit]"), async () => {
        try {
          await api.patch(`/api/admin/users/${form.dataset.id}`, { resetPassword: pass });
          toastSuccess(t("adm.uSaved"));
          form.reset();
        } catch (err) {
          toastApiError(err);
        }
      });
    });
    act("adm-ban-add", async (e, form) => {
      e.preventDefault();
      try {
        await api.post("/api/admin/bans", { type: form.type.value, value: form.value.value, reason: form.reason?.value || "", minutes: Number(form.minutes?.value) || 0 });
        toastSuccess(t("adm.banDone"));
        refresh(true);
      } catch (err) {
        toastApiError(err);
      }
    });
    act("adm-ban-del", async (e, el2) => {
      await withBusy(el2, async () => {
        try {
          await api.del(`/api/admin/bans/${el2.dataset.id}`);
          toastSuccess(t("adm.unbanDone"));
          refresh(true);
        } catch (err) {
          toastApiError(err);
        }
      });
    });
    act("adm-u-ban-toggle", async (e, el2) => {
      const banned = el2.dataset.banned === "1";
      if (banned) {
        const r = await api.get("/api/admin/bans");
        const b = (r.items || []).find((x) => x.value === String(el2.dataset.val || "").toLowerCase());
        if (!b) {
          toastError(t("err.generic"));
          return;
        }
        try {
          await api.del(`/api/admin/bans/${b.id}`);
          toastSuccess(t("adm.unbanDone"));
          refresh(true);
        } catch (err) {
          toastApiError(err);
        }
        return;
      }
      const type = /^09\d{9}$/.test(el2.dataset.val || "") ? "phone" : (el2.dataset.val || "").includes("@") ? "email" : "username";
      try {
        await api.post("/api/admin/bans", { type, value: el2.dataset.val, reason: t("adm.banByAdmin") });
        toastSuccess(t("adm.banDone"));
        refresh(true);
      } catch (err) {
        toastApiError(err);
      }
    });
  }
});

// public/js/views/admin/insights.mjs
var insights_exports = {};
__export(insights_exports, {
  mount: () => mount23,
  render: () => render25
});
async function render25(ctx) {
  const sec = ctx.params.section;
  if (sec === "stats") return stats();
  if (sec === "visitors") return visitors();
  if (sec === "data") return data();
  return audit();
}
async function audit() {
  let r = null;
  try {
    r = await api.get(api.url("/api/admin/audit", { q: AF.q, action: AF.action, page: AF.page, limit: AF.limit }));
  } catch (err) {
    return errorState({ title: err?.message || t("err.generic") });
  }
  const items = r.items || [];
  for (const it of items) {
    const pre = String(it.action || "").split(".")[0];
    if (pre && !ACTIONS.includes(pre)) ACTIONS.push(pre);
  }
  return html`
    <div class="row row-between row-wrap mb">
      <div>
        <h2 class="section-title">${icon("history")} ${t("adm.audit")}</h2>
        <p class="muted small">${fmtNum(r.total || 0)} ${L5("\u0631\u0648\u06CC\u062F\u0627\u062F", "events")}</p>
      </div>
    </div>

    <form class="card mb adm-filter" data-act="adm-aud-filter">
      <div class="form-grid">
        <label class="field"><span class="label">${t("common.search")}</span>
          <input class="input" name="q" value="${esc(AF.q)}" placeholder="${L5("\u06A9\u0627\u0631\u0628\u0631\u060C \u0631\u0648\u06CC\u062F\u0627\u062F\u060C \u0647\u062F\u0641\u2026", "actor, action, target\u2026")}">
        </label>
        ${selectField({
    label: t("adm.audAction"),
    name: "action",
    value: AF.action,
    options: [{ value: "", label: t("common.all") }, ...ACTIONS.sort().map((a) => ({ value: a, label: a }))]
  })}
      </div>
      <div class="row row-wrap mt-s">
        <button class="btn btn-primary btn-sm" type="submit">${icon("filter")} ${t("common.apply")}</button>
        <button class="btn btn-ghost btn-sm" type="button" data-act="adm-aud-clear">${icon("close")} ${t("catalog.f.clear")}</button>
      </div>
    </form>

    ${tableHtml(
    [
      { label: t("common.date") },
      { label: t("adm.audActor") },
      { label: t("adm.audAction") },
      { label: t("adm.audTarget") },
      { label: t("adm.audMeta") }
    ],
    items.map((l) => html`
        <tr>
          <td class="tiny nowrap" title="${fmtDate(l.at)}">${timeAgo(l.at)}</td>
          <td class="tiny"><span class="b">${esc(l.actorName || "")}</span><div class="tiny muted">${esc(l.actorRole || "")}</div></td>
          <td><code class="tag mono">${esc(l.action || "")}</code></td>
          <td class="tiny mono">${esc(l.target || "")}</td>
          <td class="tiny muted clip-wide">${esc(metaText(l.meta))}</td>
        </tr>`),
    { emptyText: t("common.noData") }
  )}
    ${r.pages > 1 ? pagination(r.page, r.pages, (p) => `#/admin/audit?p=${p}`) : ""}`;
}
function metaText(meta) {
  if (!meta || typeof meta !== "object") return "";
  return Object.entries(meta).map(([k, v]) => `${k}=${typeof v === "object" ? JSON.stringify(v) : v}`).join(" \xB7 ").slice(0, 160);
}
async function stats() {
  let r = null;
  try {
    r = await api.get(api.url("/api/admin/stats", { days: SF.days }));
  } catch (err) {
    return errorState({ title: err?.message || t("err.generic") });
  }
  const series = r.series || [];
  const summary = r.summary || {};
  const byCat = Object.entries(r.byCat || {}).sort((a, b) => b[1].sold - a[1].sold);
  const byBrand = Object.entries(r.byBrand || {}).sort((a, b) => b[1] - a[1]).slice(0, 12);
  const missedSearches = r.missedSearches || [];
  const metric = SF.metric;
  const points = series.map((d) => ({
    label: d.date,
    short: d.date.slice(5),
    value: metric === "revenue" ? d.revenue : metric === "visits" ? d.visits : d.orders
  }));
  const totals = series.reduce((a, d) => ({
    orders: a.orders + d.orders,
    revenue: a.revenue + d.revenue,
    visits: a.visits + d.visits,
    unique: a.unique + d.unique
  }), { orders: 0, revenue: 0, visits: 0, unique: 0 });
  return html`
    <div class="row row-between row-wrap mb">
      <h2 class="section-title">${icon("chart")} ${t("adm.stats")}</h2>
      <form class="row row-wrap" data-act="adm-st-filter" data-live>
        <select class="select select-sm" name="days">
          ${[7, 30, 90].map((d) => html`<option value="${d}" ${SF.days === d ? "selected" : ""}>${fmtNum(d)} ${L5("\u0631\u0648\u0632", "days")}</option>`)}
        </select>
        <select class="select select-sm" name="metric">
          <option value="orders" ${metric === "orders" ? "selected" : ""}>${t("adm.stOrders")}</option>
          <option value="revenue" ${metric === "revenue" ? "selected" : ""}>${t("adm.stRevenue")}</option>
          <option value="visits" ${metric === "visits" ? "selected" : ""}>${t("adm.stVisits")}</option>
        </select>
      </form>
    </div>

    <div class="kpi-grid mb">
      ${kpiCard({ icon: "package-check", label: t("adm.stOrders"), value: fmtNum(summary.orders || 0), sub: `${L5("\u062F\u0631 \u0627\u06CC\u0646 \u0628\u0627\u0632\u0647", "in range")}: ${fmtNum(totals.orders)}` })}
      ${kpiCard({ icon: "wallet", label: t("adm.stRevenue"), value: fmtMoney(summary.revenue || 0), sub: `${L5("\u062F\u0631 \u0627\u06CC\u0646 \u0628\u0627\u0632\u0647", "in range")}: ${fmtMoney(totals.revenue)}` })}
      ${kpiCard({ icon: "users", label: t("adm.stUsers"), value: fmtNum(summary.users || 0), sub: `${L5("\u0628\u0627\u0632\u062F\u06CC\u062F \u06CC\u06A9\u062A\u0627", "unique visits")}: ${fmtNum(totals.unique)}` })}
      ${kpiCard({ icon: "box", label: t("adm.stProducts"), value: fmtNum(summary.products || 0), sub: `${L5("\u0627\u0631\u0632\u0634 \u0645\u0648\u062C\u0648\u062F\u06CC", "stock value")}: ${fmtMoney(summary.stockValue || 0)}` })}
      ${kpiCard({ icon: "scale", label: t("adm.stAvg"), value: fmtMoney(summary.avgOrder || 0), sub: `${L5("\u0645\u06CC\u0627\u0646\u06AF\u06CC\u0646 \u0633\u0628\u062F", "average basket")}` })}
      ${kpiCard({ icon: "eye", label: t("adm.stVisits"), value: fmtNum(totals.visits), sub: `${L5("\u062F\u0631 \u0627\u06CC\u0646 \u0628\u0627\u0632\u0647", "in range")}` })}
    </div>

    <div class="card">
      <strong>${icon("chart")} ${metric === "revenue" ? t("adm.stRevenue") : metric === "visits" ? t("adm.stVisits") : t("adm.stOrders")} — ${fmtNum(SF.days)} ${L5("\u0631\u0648\u0632", "days")}</strong>
      <div class="mt-s">${barChart(points, { height: 150 })}</div>
    </div>

    <div class="cart-grid mt">
      <div class="col card">
        <strong>${icon("layers")} ${t("adm.stByCat")}</strong>
        ${tableHtml(
    [
      { label: t("common.category") },
      { label: t("common.products"), cls: "num" },
      { label: t("pdp.sold"), cls: "num" },
      { label: t("common.stock"), cls: "num" },
      { label: t("adm.stRevenue"), cls: "num" }
    ],
    byCat.map(([name, v]) => html`
            <tr>
              <td class="b">${esc(name)}</td>
              <td class="num">${fmtNum(v.products)}</td>
              <td class="num">${fmtNum(v.sold)}</td>
              <td class="num">${fmtNum(v.stock)}</td>
              <td class="num">${fmtMoney(v.revenue)}</td>
            </tr>`),
    { emptyText: t("common.noData") }
  )}
      </div>
      <aside class="col card">
        <strong>${icon("tag")} ${t("adm.stByBrand")}</strong>
        <div class="mt-s">
          ${byBrand.length ? byBrand.map(([name, sold]) => {
    const max = byBrand[0][1] || 1;
    return html`
            <div class="brand-row">
              <span class="tiny">${esc(name)}</span>
              <span class="progress"><i data-w="${Math.max(4, Math.round(sold / max * 100))}%"></i></span>
              <span class="tiny b">${fmtNum(sold)}</span>
            </div>`;
  }).join("") : html`<p class="muted small">${t("common.noData")}</p>`}
        </div>
      </aside>
    </div>
    
    <div class="card mt">
      <strong>${icon("search")} ${isFa2() ? "\u062C\u0633\u062A\u062C\u0648\u0647\u0627\u06CC \u0628\u062F\u0648\u0646 \u0646\u062A\u06CC\u062C\u0647 (\u06A9\u0627\u0644\u0627\u0647\u0627\u06CC \u0646\u0627\u0645\u0648\u062C\u0648\u062F)" : "Missed Searches (Not in stock)"}</strong>
      ${!missedSearches.length ? html`<p class="muted small mt-s">${t("common.empty")}</p>` : tableHtml(
    [
      { label: isFa2() ? "\u0639\u0628\u0627\u0631\u062A \u062C\u0633\u062A\u062C\u0648 \u0634\u062F\u0647" : "Query" },
      { label: isFa2() ? "\u062F\u0641\u0639\u0627\u062A \u062C\u0633\u062A\u062C\u0648" : "Count", cls: "num" }
    ],
    missedSearches.map((m) => html`
            <tr>
              <td>${esc(m.q)}</td>
              <td class="num"><span class="badge-pill bp-warn">${fmtNum(m.count)}</span></td>
            </tr>`)
  )}
    </div>`;
}
function data() {
  const isOwner = S.me?.role === "owner";
  return html`
    <div class="row row-between row-wrap mb">
      <div>
        <h2 class="section-title">${icon("download")} ${t("adm.data")}</h2>
        <p class="muted small">${t("adm.dataHint")}</p>
      </div>
    </div>

    <div class="card">
      <strong>${icon("file")} ${t("adm.dExport")}</strong>
      <div class="exp-grid mt-s">
        ${KINDS.map((k) => html`
          <div class="exp-item">
            <span class="exp-ic">${icon(k.icon)}</span>
            <span class="grow b small">${k.label()}</span>
            <span class="act">
              <a class="btn btn-ghost btn-xs" href="${api.url(`/api/admin/export/${k.id}`, { format: "csv" })}" download>${L5("CSV", "CSV")}</a>
              <a class="btn btn-ghost btn-xs" href="/api/admin/export/${k.id}" download>JSON</a>
            </span>
          </div>`).join("")}
      </div>
    </div>

    <div class="dev-grid mt">
      <div class="card">
        <strong>${icon("save")} ${t("adm.dBackup")}</strong>
        <p class="muted small mt-s">${t("adm.dBackupHint")}</p>
        ${isOwner ? html`<button class="btn btn-primary btn-sm mt-s" data-act="adm-d-backup">${icon("save")} ${t("adm.dBackup")}</button>` : html`<p class="notice notice-warn mt-s">${icon("lock")}<span>${L5("\u0641\u0642\u0637 \u0645\u0627\u0644\u06A9 \u0645\u06CC\u200C\u062A\u0648\u0627\u0646\u062F \u067E\u0634\u062A\u06CC\u0628\u0627\u0646 \u0628\u06AF\u06CC\u0631\u062F.", "Only the owner can create backups.")}</span></p>`}
      </div>
      <div class="card">
        <strong>${icon("refresh")} ${t("adm.dCleanup")}</strong>
        <p class="muted small mt-s">${t("adm.dCleanupHint")}</p>
        <button class="btn btn-outline btn-sm mt-s" data-act="adm-d-cleanup">${icon("trash")} ${t("adm.dCleanup")}</button>
      </div>
    </div>`;
}
function mount23(root, ctx) {
  applyDyn(root);
  if (ctx?.params?.section === "audit") {
    const p = new URLSearchParams(location.hash.split("?")[1] || "");
    const pg = Number(p.get("p") || 0);
    if (pg && pg !== AF.page) {
      AF.page = pg;
      refresh(true);
    }
  }
  return null;
}
async function visitors() {
  let r = { items: [], total: 0 };
  try {
    r = await api.get(api.url("/api/admin/visitors", { q: VF.q || "" }));
  } catch (err) {
    return errorState({ title: err?.message || t("err.generic") });
  }
  return html`
    <div class="row row-between row-wrap mb">
      <h2 class="section-title">${icon("users")} ${t("adm.visitors")} <span class="muted small">(${fmtNum(r.total || 0)})</span></h2>
      <form class="row" data-act="adm-vis-filter">
        <input class="input" name="q" value="${esc(VF.q || "")}" placeholder="${t("common.search")}">
        <button class="btn btn-ghost" type="submit">${icon("search")}</button>
      </form>
    </div>
    <div class="card">
      ${r.items?.length ? html`<div class="table-wrap"><table class="table">
        <thead><tr><th>${t("common.date")}</th><th>IP</th><th>${t("adm.uDevice")}</th><th>${t("adm.uBrowser")}</th><th>${t("adm.uRegion")}</th><th>${t("adm.uPath")}</th><th>${t("common.user")}</th></tr></thead>
        <tbody>${r.items.map((v) => html`<tr>
          <td class="tiny nowrap">${fmtDate(v.at)}</td>
          <td class="mono tiny">${esc(v.ip || "")}</td>
          <td class="tiny">${esc(v.os || "")} · ${esc(v.device || "")}${v.screen ? html`<div class="muted tiny">${esc(v.screen)}</div>` : ""}</div></td>
          <td class="tiny">${esc(v.browser || "")}</td>
          <td class="tiny">${esc(v.tz || "")}<div class="muted tiny">${esc(v.lang || "")}</div></td>
          <td class="mono tiny">${esc(v.path || "/")}</td>
          <td class="tiny">${v.userId ? html`<a href="#/admin/users/${v.userId}">${icon("user")}</a>` : html`<span class="muted">${t("adm.guest")}</span>`}</td>
        </tr>`)}</tbody></table></div>` : emptyState({ icon: "users", title: t("common.noResult") })}
    </div>`;
}
var L5, AF, SF, ACTIONS, KINDS, VF;
var init_insights = __esm({
  "public/js/views/admin/insights.mjs"() {
    init_dom();
    init_i18n();
    init_api();
    init_state();
    init_components();
    init_ui();
    init_actions();
    init_router();
    L5 = (fa3, en2) => isFa2() ? fa3 : en2;
    AF = { q: "", action: "", page: 1, limit: 50 };
    SF = { days: 30, metric: "orders" };
    ACTIONS = [];
    act("adm-aud-filter", (e, form) => {
      e.preventDefault();
      const fd = new FormData(form);
      AF.q = String(fd.get("q") || "").trim();
      AF.action = String(fd.get("action") || "");
      AF.page = 1;
      refresh(true);
    });
    act("adm-aud-clear", () => {
      AF.q = "";
      AF.action = "";
      AF.page = 1;
      refresh(true);
    });
    act("adm-st-filter", (e, form) => {
      e.preventDefault();
      const fd = new FormData(form);
      SF.days = Number(fd.get("days") || 30);
      SF.metric = String(fd.get("metric") || "orders");
      refresh(true);
    });
    KINDS = [
      { id: "products", icon: "box", label: () => t("common.products") },
      { id: "orders", icon: "package-check", label: () => t("common.orders") },
      { id: "users", icon: "users", label: () => t("common.users") },
      { id: "reviews", icon: "star", label: () => t("adm.reviews") },
      { id: "tickets", icon: "ticket", label: () => t("adm.tickets") },
      { id: "audit", icon: "history", label: () => t("adm.audit") },
      { id: "all", icon: "download", label: () => L5("\u0647\u0645\u0647\u0654 \u062F\u0627\u062F\u0647\u200C\u0647\u0627", "Everything") }
    ];
    act("adm-d-backup", async (e, el2) => {
      await withBusy(el2, async () => {
        try {
          const r = await api.post("/api/admin/backup", {});
          toastSuccess(`${t("adm.dBackup")}: ${r.file} (${fmtNum(r.sizeKb || 0)} KB)`);
        } catch (err) {
          toastApiError(err);
        }
      });
    });
    act("adm-d-cleanup", async (e, el2) => {
      const ok = await confirmDialog({ text: L5("\u0631\u0648\u06CC\u062F\u0627\u062F\u0647\u0627\u06CC \u0642\u062F\u06CC\u0645\u06CC\u200C\u062A\u0631 \u0627\u0632 \u06F9\u06F0 \u0631\u0648\u0632 \u0648 \u0646\u0634\u0633\u062A\u200C\u0647\u0627\u06CC \u0645\u0646\u0642\u0636\u06CC \u067E\u0627\u06A9 \u0634\u0648\u0646\u062F\u061F", "Remove audit entries older than 90 days and expired sessions?"), danger: true });
      if (!ok) return;
      await withBusy(el2, async () => {
        try {
          const r = await api.post("/api/admin/maintenance/cleanup", {});
          toastSuccess(`${L5("\u0631\u0648\u06CC\u062F\u0627\u062F", "audit")}: ${fmtNum(r.auditRemoved || 0)} \xB7 ${L5("\u0646\u0634\u0633\u062A", "sessions")}: ${fmtNum(r.sessionsRemoved || 0)}`);
        } catch (err) {
          toastApiError(err);
        }
      });
    });
    VF = { q: "" };
    act("adm-vis-filter", (e, form) => {
      e.preventDefault();
      VF.q = form.q.value;
      refresh(true);
    });
  }
});

// public/js/views/admin/marketing.mjs
var marketing_exports = {};
__export(marketing_exports, {
  mount: () => mount24,
  render: () => render26
});
async function render26(ctx) {
  const sec = ctx.params.section;
  if (sec === "ads") return adsView();
  if (sec === "notifications") return notificationsView();
  if (sec === "telegram") return telegramView();
  if (sec === "lottery") return lotteryView();
  return couponsView();
}
async function couponsView() {
  try {
    COUPONS = (await api.get("/api/admin/coupons")).items || [];
  } catch (err) {
    return errorState({ title: err?.message || t("err.generic") });
  }
  const active = COUPONS.filter((c) => c.active !== false && new Date(c.endAt) > /* @__PURE__ */ new Date()).length;
  return html`
    <div class="row row-between row-wrap mb">
      <div>
        <h2 class="section-title">${icon("percent")} ${t("adm.coupons")}</h2>
        <p class="muted small">${fmtNum(COUPONS.length)} ${L6("\u06A9\u062F", "codes")} · ${fmtNum(active)} ${L6("\u0641\u0639\u0627\u0644", "active")}</p>
      </div>
      <button class="btn btn-primary btn-sm" data-act="adm-cp-new">${icon("plus")} ${t("common.add")}</button>
    </div>

    ${tableHtml(
    [
      { label: t("cart.coupon") },
      { label: t("common.type") },
      { label: t("adm.cpValue"), cls: "num" },
      { label: t("adm.cpUsage"), cls: "num" },
      { label: t("adm.cpDates") },
      { label: t("common.status") },
      { label: "", cls: "num" }
    ],
    COUPONS.map((c) => {
      const expired = new Date(c.endAt) < /* @__PURE__ */ new Date();
      return html`
        <tr>
          <td><span class="mono b">${esc(c.code)}</span>${c.note ? html`<div class="tiny muted">${esc(c.note)}</div>` : ""}</td>
          <td>${c.type === "percent" ? t("adm.cpPercent") : t("adm.cpAmount")}</td>
          <td class="num">${c.type === "percent" ? `${fmtNum(c.value)}\u066A` : fmtMoney(c.value)}
            ${c.maxDiscount ? html`<div class="tiny muted">${L6("\u0633\u0642\u0641", "max")} ${fmtMoney(c.maxDiscount)}</div>` : ""}
            ${c.minOrder ? html`<div class="tiny muted">${L6("\u062D\u062F\u0627\u0642\u0644 \u0633\u0641\u0627\u0631\u0634", "min order")} ${fmtMoney(c.minOrder)}</div>` : ""}</td>
          <td class="num">${fmtNum(c.used || 0)} / ${fmtNum(c.usageLimit || 0)}<div class="tiny muted">${L6("\u0647\u0631 \u06A9\u0627\u0631\u0628\u0631", "per user")}: ${fmtNum(c.perUser || 1)}</div></td>
          <td class="tiny nowrap">${fmtDate(c.startAt, { time: false })}<div class="tiny muted">${fmtDate(c.endAt, { time: false })}</div></td>
          <td>${expired ? html`<span class="badge-pill bp-muted">${t("adm.cpExpired")}</span>` : c.active === false ? html`<span class="badge-pill bp-muted">${t("common.inactive")}</span>` : html`<span class="badge-pill bp-success">${t("common.active")}</span>`}</td>
          <td>
            <div class="act">
              <button class="btn btn-ghost btn-xs" data-act="adm-cp-toggle" data-id="${c.id}" title="${t("common.active")}">${icon(c.active === false ? "eye-off" : "eye")}</button>
              <button class="btn btn-ghost btn-xs" data-act="adm-cp-edit" data-id="${c.id}">${icon("edit")}</button>
              <button class="btn btn-ghost btn-xs" data-act="adm-cp-copy" data-code="${esc(c.code)}">${icon("copy")}</button>
              <button class="btn btn-ghost btn-xs" data-act="adm-cp-del" data-id="${c.id}" data-name="${esc(c.code)}">${icon("trash")}</button>
            </div>
          </td>
        </tr>`;
    }),
    { emptyText: t("common.noData") }
  )}`;
}
function couponForm(c) {
  return modal({
    title: c ? t("common.edit") : t("adm.cpNew"),
    body: html`
      <form class="form-grid" data-act="adm-cp-save" data-id="${c?.id || ""}" data-isnew="${c ? "" : "1"}">
        ${field2({ label: t("cart.coupon"), name: "code", required: !c, value: c?.code || "", attrs: c ? "readonly" : "", hint: L6("\u062D\u0631\u0648\u0641 \u0628\u0632\u0631\u06AF \u0627\u0646\u06AF\u0644\u06CC\u0633\u06CC \u0648 \u0639\u062F\u062F", "Uppercase letters and digits") })}
        ${selectField({
      label: t("common.type"),
      name: "type",
      value: c?.type || "percent",
      options: [{ value: "percent", label: t("adm.cpPercent") }, { value: "amount", label: t("adm.cpAmount") }]
    })}
        ${field2({ label: t("adm.cpValue"), name: "value", type: "number", required: true, value: c?.value ?? 10, attrs: 'min="1" max="100000000"' })}
        ${field2({ label: L6("\u0633\u0642\u0641 \u062A\u062E\u0641\u06CC\u0641", "Max discount"), name: "maxDiscount", type: "number", value: c?.maxDiscount ?? 0, attrs: 'min="0" max="100000000"' })}
        ${field2({ label: L6("\u062D\u062F\u0627\u0642\u0644 \u0645\u0628\u0644\u063A \u0633\u0641\u0627\u0631\u0634", "Minimum order"), name: "minOrder", type: "number", value: c?.minOrder ?? 0, attrs: 'min="0" max="100000000"' })}
        ${field2({ label: L6("\u0633\u0642\u0641 \u0627\u0633\u062A\u0641\u0627\u062F\u0647\u0654 \u06A9\u0644", "Total usage limit"), name: "usageLimit", type: "number", value: c?.usageLimit ?? 100, attrs: 'min="1" max="100000"' })}
        ${field2({ label: L6("\u0633\u0642\u0641 \u0647\u0631 \u06A9\u0627\u0631\u0628\u0631", "Per user"), name: "perUser", type: "number", value: c?.perUser ?? 1, attrs: 'min="1" max="100"' })}
        ${field2({ label: t("adm.cpStart"), name: "startAt", type: "datetime-local", value: toLocal(c?.startAt) })}
        ${field2({ label: t("adm.cpEnd"), name: "endAt", type: "datetime-local", value: toLocal(c?.endAt) })}
        <div class="span-2">${field2({ label: t("common.note"), name: "note", value: c?.note || "" })}</div>
        <div class="span-2">${switchField({ label: t("common.active"), name: "active", checked: c ? c.active !== false : true })}</div>
        <button class="btn btn-primary span-2" type="submit">${t("common.save")}</button>
      </form>`
  });
}
function toLocal(iso) {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  const p = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}T${p(d.getHours())}:${p(d.getMinutes())}`;
}
async function adsView() {
  try {
    const r = await api.get("/api/admin/ads");
    ADS = r.items || [];
    SLOTS = r.slots || [];
  } catch (err) {
    return errorState({ title: err?.message || t("err.generic") });
  }
  return html`
    <div class="row row-between row-wrap mb">
      <div>
        <h2 class="section-title">${icon("image")} ${t("adm.ads")}</h2>
        <p class="muted small">${t("adm.adsHint")}</p>
      </div>
      <button class="btn btn-primary btn-sm" data-act="adm-ad-new">${icon("plus")} ${t("common.add")}</button>
    </div>

    ${SLOTS.length ? SLOTS.map((s) => {
    const list5 = ADS.filter((a) => a.slot === s.id);
    return html`
      <div class="card mb">
        <div class="row row-between">
          <strong>${icon("pin")} ${esc(isFa2() ? s.fa : s.en || s.fa)}</strong>
          <span class="badge-pill bp-muted">${fmtNum(list5.length)}</span>
        </div>
        ${list5.length ? html`
          <div class="ad-rows mt-s">
            ${list5.map((a) => html`
              <div class="ad-row ${a.active === false ? "off" : ""}">
                ${a.image ? html`<img class="ad-img" src="${esc(a.image)}" alt="" loading="lazy" data-h="54px" data-w="88px">` : html`<span class="ad-img ph" data-h="54px" data-w="88px">${icon("image")}</span>`}
                <div class="grow">
                  <span class="b">${esc(isFa2() ? a.title : a.titleEn || a.title)}</span>
                  <span class="tiny muted">${esc(isFa2() ? a.text || "" : a.textEn || a.text || "")}</span>
                  <span class="tiny muted nowrap">${L6("\u0627\u0632", "From")} ${fmtDate(a.startAt, { time: false })} ${L6("\u062A\u0627", "to")} ${fmtDate(a.endAt, { time: false })}${a.link ? ` \xB7 ${esc(a.link)}` : ""}</span>
                </div>
                <div class="act">
                  <button class="btn btn-ghost btn-xs" data-act="adm-ad-toggle" data-id="${a.id}">${icon(a.active === false ? "eye-off" : "eye")}</button>
                  <button class="btn btn-ghost btn-xs" data-act="adm-ad-edit" data-id="${a.id}">${icon("edit")}</button>
                  <button class="btn btn-ghost btn-xs" data-act="adm-ad-del" data-id="${a.id}" data-name="${esc(a.title)}">${icon("trash")}</button>
                </div>
              </div>`).join("")}
          </div>` : html`<p class="muted small mt-s">${t("common.noData")}</p>`}
      </div>`;
  }).join("") : emptyState({ icon: "image", title: t("common.noData") })}`;
}
function adForm(a) {
  return modal({
    title: a ? t("common.edit") : t("adm.adNew"),
    body: html`
      <form class="form-grid" data-act="adm-ad-save" data-id="${a?.id || ""}" data-isnew="${a ? "" : "1"}">
        <div class="span-2">${selectField({
      label: t("adm.adSlot"),
      name: "slot",
      value: a?.slot || SLOTS[0]?.id || "home_hero",
      options: SLOTS.map((s) => ({ value: s.id, label: isFa2() ? s.fa : s.en || s.fa }))
    })}</div>
        ${field2({ label: t("common.title"), name: "title", required: true, value: a?.title || "" })}
        ${field2({ label: L6("\u0639\u0646\u0648\u0627\u0646 (\u0627\u0646\u06AF\u0644\u06CC\u0633\u06CC)", "Title (EN)"), name: "titleEn", value: a?.titleEn || "" })}
        <div class="span-2">${textareaField({ label: t("common.text"), name: "text", value: a?.text || "", rows: 2 })}</div>
        <div class="span-2">${textareaField({ label: L6("\u0645\u062A\u0646 (\u0627\u0646\u06AF\u0644\u06CC\u0633\u06CC)", "Text (EN)"), name: "textEn", value: a?.textEn || "", rows: 2 })}</div>
        ${field2({ label: t("common.link"), name: "link", value: a?.link || "", hint: "#/products?cat=cases" })}
        ${field2({ label: t("common.image"), name: "image", value: a?.image || "", hint: "/assets/\u2026" })}
        ${field2({ label: L6("\u0645\u062A\u0646 \u062F\u06A9\u0645\u0647", "CTA label"), name: "cta", value: a?.cta || "" })}
        ${field2({ label: L6("\u0645\u062A\u0646 \u062F\u06A9\u0645\u0647 (\u0627\u0646\u06AF\u0644\u06CC\u0633\u06CC)", "CTA (EN)"), name: "ctaEn", value: a?.ctaEn || "" })}
        ${field2({ label: L6("\u0634\u0631\u0648\u0639", "Start"), name: "startAt", type: "datetime-local", value: toLocal(a?.startAt) })}
        ${field2({ label: L6("\u067E\u0627\u06CC\u0627\u0646", "End"), name: "endAt", type: "datetime-local", value: toLocal(a?.endAt) })}
        <div class="span-2">${switchField({ label: t("common.active"), name: "active", checked: a ? a.active !== false : true })}</div>
        <button class="btn btn-primary span-2" type="submit">${t("common.save")}</button>
      </form>`
  });
}
async function notificationsView() {
  let r = null;
  try {
    r = await api.get("/api/admin/notifications");
  } catch (err) {
    return errorState({ title: err?.message || t("err.generic") });
  }
  const items = r.items || [];
  const outbox = r.outbox || [];
  return html`
    <div class="row row-between row-wrap mb">
      <div>
        <h2 class="section-title">${icon("bell")} ${t("adm.notifications")}</h2>
        <p class="muted small">${t("adm.notifHint")}</p>
      </div>
    </div>

    <div class="cart-grid">
      <div class="col">
        <form class="card" data-act="adm-notif-send">
          <strong>${icon("send")} ${t("adm.notifNew")}</strong>
          <div class="form-grid mt-s">
            ${field2({ label: t("common.title"), name: "title", required: true, attrs: 'maxlength="120"' })}
            ${field2({ label: L6("\u0639\u0646\u0648\u0627\u0646 (\u0627\u0646\u06AF\u0644\u06CC\u0633\u06CC)", "Title (EN)"), name: "titleEn", attrs: 'maxlength="120"' })}
            <div class="span-2">${textareaField({ label: t("common.text"), name: "body", rows: 3, attrs: 'maxlength="600"' })}</div>
            <div class="span-2">${textareaField({ label: L6("\u0645\u062A\u0646 (\u0627\u0646\u06AF\u0644\u06CC\u0633\u06CC)", "Text (EN)"), name: "bodyEn", rows: 2 })}</div>
            ${selectField({
    label: t("adm.notifLevel"),
    name: "level",
    value: "info",
    options: [{ value: "info", label: t("notif.level.info") }, { value: "success", label: t("notif.level.success") }, { value: "warning", label: t("notif.level.warning") }, { value: "error", label: t("notif.level.error") }]
  })}
            ${selectField({
    label: t("common.type"),
    name: "type",
    value: "announcement",
    options: [{ value: "announcement", label: t("notif.type.announcement") }, { value: "news", label: t("notif.type.news") }, { value: "offer", label: t("notif.type.offer") }, { value: "system", label: t("notif.type.system") }]
  })}
            ${field2({ label: t("common.link"), name: "link", hint: "#/products" })}
            ${field2({ label: L6("\u0634\u0646\u0627\u0633\u0647\u0654 \u06A9\u0627\u0631\u0628\u0631 (\u062E\u0627\u0644\u06CC = \u0647\u0645\u0647)", "User id (empty = everyone)"), name: "userId" })}
            <div class="span-2">
              <span class="label">${t("adm.channels")}</span>
              <div class="row row-wrap mt-s">
                <label class="check"><input type="checkbox" name="ch_site" checked><span class="box">${icon("check")}</span><span>${t("adm.chSite")}</span></label>
                <label class="check"><input type="checkbox" name="ch_telegram"><span class="box">${icon("check")}</span><span>${t("adm.chTelegram")}</span></label>
                <label class="check"><input type="checkbox" name="ch_email"><span class="box">${icon("check")}</span><span>${t("adm.chEmail")}</span></label>
                <label class="check"><input type="checkbox" name="ch_sms"><span class="box">${icon("check")}</span><span>${t("adm.chSms")}</span></label>
              </div>
              <p class="hint">${t("adm.channelsHint")}</p>
            </div>
          </div>
          <button class="btn btn-primary mt-s" type="submit">${icon("send")} ${t("common.send")}</button>
        </form>
      </div>

      <aside class="col">
        <div class="card">
          <strong>${icon("history")} ${t("adm.notifRecent")} (${fmtNum(items.length)})</strong>
          <div class="notif-list mt-s">
            ${items.length ? items.slice(0, 40).map((n) => html`
              <div class="notif-item lv-${esc(n.level || "info")}">
                <div class="row row-between">
                  <strong class="tiny">${esc(isFa2() ? n.title : n.titleEn || n.title)}</strong>
                  <span class="tiny muted nowrap">${timeAgo(n.createdAt)}</span>
                </div>
                ${n.body ? html`<p class="tiny muted">${esc(isFa2() ? n.body : n.bodyEn || n.body)}</p>` : ""}
                <span class="tiny muted mono">${n.userId ? esc(n.userId) : L6("\u0647\u0645\u0647\u0654 \u06A9\u0627\u0631\u0628\u0631\u0627\u0646", "All users")}${n.link ? ` \xB7 ${esc(n.link)}` : ""}</span>
              </div>`).join("") : html`<p class="muted small">${t("common.noData")}</p>`}
          </div>
        </div>
        ${outbox.length ? html`
        <div class="card mt">
          <strong>${icon("mail")} ${L6("\u0635\u0641 \u0627\u0631\u0633\u0627\u0644 \u067E\u06CC\u0627\u0645\u06A9/\u0627\u06CC\u0645\u06CC\u0644", "SMS / email outbox")} (${fmtNum(outbox.length)})</strong>
          <div class="mt-s">
            ${outbox.map((o) => html`<div class="sum-row"><span class="tiny mono">${esc(o.to || o.target || "")}</span><span class="v tiny">${esc(String(o.body || o.text || "").slice(0, 60))}</span></div>`).join("")}
          </div>
        </div>` : ""}
      </aside>
    </div>`;
}
function mount24(root) {
  applyDyn(root);
  return null;
}
async function telegramView() {
  let r = null;
  try {
    r = await api.get("/api/admin/telegram");
  } catch (err) {
    return errorState({ title: err?.message || t("err.generic") });
  }
  return html`
    <div class="cart-grid">
      <div class="col">
        <form class="card" data-act="adm-tg-save">
          <strong>${icon("send")} ${t("adm.telegram")}</strong>
          <p class="muted small mt-s">${t("adm.tgHint")}</p>
          <div class="form-grid mt-s">
            <div class="span-2">${switchField({ label: t("adm.tgEnabled"), name: "enabled", checked: !!r.enabled })}</div>
            <div class="span-2">${field2({ label: t("adm.tgToken"), name: "token", hint: t("adm.tgTokenHint"), type: "password" })}</div>
            <div class="span-2">${textareaField({ label: t("adm.tgWelcome"), name: "welcome", rows: 2, value: r.welcome || "" })}</div>
          </div>
          <button class="btn btn-primary mt-s" type="submit">${icon("check")} ${t("common.save")}</button>
        </form>
        <form class="card mt" data-act="adm-tg-test">
          <strong>${icon("zap")} ${t("adm.tgTest")}</strong>
          <div class="row mt-s">
            <input class="input" name="chatId" placeholder="chat id" required>
            <button class="btn btn-ghost" type="submit">${t("common.send")}</button>
          </div>
        </form>
      </div>
      <aside class="col">
        <div class="card">
          <strong>${icon("chat")} ${t("adm.tgInbox")} (${fmtNum(r.inbox?.length || 0)}) · ${t("adm.tgSubs")}: ${fmtNum(r.subs || 0)}</strong>
          ${r.enabled ? html`
            <p class="tiny muted mt-s">
              ${L6("\u0648\u0636\u0639\u06CC\u062A \u0627\u062A\u0635\u0627\u0644 \u0631\u0628\u0627\u062A:", "bot link:")}
              ${r.lastError ? html`<span class="c-danger">${L6("\u062E\u0637\u0627", "error")}: ${esc(String(r.lastError).slice(0, 120))}</span>` : html`<span class="c-success">${L6("\u0633\u0627\u0644\u0645", "healthy")}</span>`}
              · ${L6("\u062D\u0627\u0644\u062A \u0627\u062A\u0635\u0627\u0644:", "mode:")} ${r.webhook?.ok ? L6("\u0648\u0628\u200C\u0647\u0648\u06A9 \u2714", "webhook \u2714") : L6("\u067E\u0648\u0644\u06CC\u0646\u06AF", "polling")}
              ${r.lastPoll ? `\xB7 ${L6("\u0622\u062E\u0631\u06CC\u0646 \u0628\u0631\u0631\u0633\u06CC:", "last poll:")} ${timeAgo(r.lastPoll)}` : ""}
            </p>` : ""}
          <div class="notif-list mt-s">
            ${(r.inbox || []).slice(0, 30).map((m) => html`
              <div class="notif-item lv-info">
                <div class="row row-between"><strong class="tiny">${esc(m.name)}</strong><span class="tiny muted">${timeAgo(m.at)}</span></div>
                <p class="tiny mt-s">${esc(m.text)}</p>
                <form class="row mt-s" data-act="adm-tg-reply" data-chat="${esc(m.chatId)}">
                  <input class="input" name="text" placeholder="${t("adm.tgReplyPh")}" required>
                  <button class="btn btn-ghost btn-sm" type="submit">${icon("send")}</button>
                </form>
              </div>`)}
            ${!(r.inbox || []).length ? html`<p class="muted small">${t("adm.tgInboxEmpty")}</p>` : ""}
          </div>
        </div>
      </aside>
    </div>`;
}
async function lotteryView() {
  let r = null;
  try {
    r = await api.get("/api/admin/lotteries");
  } catch (err) {
    return errorState({ title: err?.message || t("err.generic") });
  }
  return html`
    <div class="cart-grid">
      <div class="col">
        <form class="card" data-act="adm-lot-create">
          <strong>${icon("gift2")} ${t("adm.lotteryNew")}</strong>
          <div class="form-grid mt-s">
            ${field2({ label: t("common.title"), name: "title", required: true })}
            ${field2({ label: t("adm.lotPrize"), name: "prize", required: true })}
            ${field2({ label: t("adm.lotEnds"), name: "endsAt", type: "datetime-local", required: true })}
            ${field2({ label: t("adm.lotWinners"), name: "winnersCount", type: "number", value: "1" })}
            <div class="span-2">${selectField({ label: t("adm.lotMode"), name: "entryMode", options: [{ value: "orders", label: t("adm.lotModeOrders") }, { value: "manual", label: t("adm.lotModeManual") }] })}</div>
          </div>
          <button class="btn btn-primary mt-s" type="submit">${icon("plus")} ${t("common.create")}</button>
        </form>
      </div>
      <aside class="col">
        <div class="card">
          <strong>${icon("gift2")} ${t("adm.lottery")} (${fmtNum(r.items?.length || 0)})</strong>
          <div class="notif-list mt-s">
            ${(r.items || []).map((l) => html`
              <div class="notif-item lv-${l.status === "drawn" ? "success" : l.status === "active" ? "info" : "warning"}">
                <div class="row row-between"><strong class="tiny">${esc(l.title)}</strong><span class="tiny muted">${l.status}</span></div>
                <p class="tiny mt-s">${t("adm.lotPrize")}: ${esc(l.prize)} · ${t("adm.lotEntries")}: ${fmtNum(l.entries || 0)} · ${t("adm.lotEnds")}: ${esc(l.endsAt || "")}</p>
                ${l.winners?.length ? html`<p class="tiny mt-s b">${t("adm.lotWinnersList")}: ${l.winners.map((w) => esc(w.name)).join("\u060C ")}</p>` : ""}
                ${l.status === "active" ? html`<div class="row mt-s">
                  <button class="btn btn-primary btn-sm" data-act="adm-lot-run" data-id="${l.id}">${icon("sparkles")} ${t("adm.lotRun")}</button>
                  <button class="btn btn-ghost btn-sm" data-act="adm-lot-close" data-id="${l.id}">${icon("close")} ${t("adm.lotClose")}</button>
                </div>` : ""}
              </div>`)}
            ${!(r.items || []).length ? html`<p class="muted small">${t("adm.lotEmpty")}</p>` : ""}
          </div>
        </div>
      </aside>
    </div>`;
}
var L6, COUPONS, ADS, SLOTS, cpHandle, adHandle;
var init_marketing = __esm({
  "public/js/views/admin/marketing.mjs"() {
    init_dom();
    init_i18n();
    init_api();
    init_components();
    init_ui();
    init_actions();
    init_router();
    L6 = (fa3, en2) => isFa2() ? fa3 : en2;
    COUPONS = [];
    ADS = [];
    SLOTS = [];
    cpHandle = null;
    act("adm-cp-new", () => {
      cpHandle = couponForm(null);
    });
    act("adm-cp-edit", (e, el2) => {
      cpHandle = couponForm(COUPONS.find((c) => c.id === el2.dataset.id));
    });
    act("adm-cp-toggle", async (e, el2) => {
      const c = COUPONS.find((x) => x.id === el2.dataset.id);
      if (!c) return;
      try {
        await api.patch(`/api/admin/coupons/${c.id}`, { active: c.active === false });
        refresh(true);
      } catch (err) {
        toastApiError(err);
      }
    });
    act("adm-cp-copy", async (e, el2) => {
      try {
        await navigator.clipboard.writeText(el2.dataset.code);
        toastSuccess(t("misc.copied"));
      } catch {
        toastSuccess(el2.dataset.code);
      }
    });
    act("adm-cp-del", async (e, el2) => {
      if (!await confirmDelete(el2.dataset.name)) return;
      try {
        await api.del(`/api/admin/coupons/${el2.dataset.id}`);
        toastSuccess(t("misc.deleted"));
        refresh(true);
      } catch (err) {
        toastApiError(err);
      }
    });
    act("adm-cp-save", async (e, form) => {
      e.preventDefault();
      const fd = new FormData(form);
      const isNew = form.dataset.isnew === "1";
      const payload = {
        type: fd.get("type"),
        value: Number(fd.get("value") || 0),
        maxDiscount: Number(fd.get("maxDiscount") || 0),
        minOrder: Number(fd.get("minOrder") || 0),
        usageLimit: Number(fd.get("usageLimit") || 100),
        perUser: Number(fd.get("perUser") || 1),
        active: fd.get("active") === "on",
        note: fd.get("note") || ""
      };
      if (fd.get("startAt")) payload.startAt = new Date(fd.get("startAt")).toISOString();
      if (fd.get("endAt")) payload.endAt = new Date(fd.get("endAt")).toISOString();
      if (isNew) payload.code = String(fd.get("code") || "").toUpperCase();
      await withBusy(form.querySelector("button[type=submit]"), async () => {
        try {
          if (isNew) await api.post("/api/admin/coupons", payload);
          else await api.patch(`/api/admin/coupons/${form.dataset.id}`, payload);
          toastSuccess(t("misc.saved"));
          cpHandle?.close();
          refresh(true);
        } catch (err) {
          toastApiError(err);
        }
      });
    });
    adHandle = null;
    act("adm-ad-new", () => {
      adHandle = adForm(null);
    });
    act("adm-ad-edit", (e, el2) => {
      adHandle = adForm(ADS.find((a) => a.id === el2.dataset.id));
    });
    act("adm-ad-toggle", async (e, el2) => {
      const a = ADS.find((x) => x.id === el2.dataset.id);
      if (!a) return;
      try {
        await api.patch(`/api/admin/ads/${a.id}`, { active: a.active === false });
        refresh(true);
      } catch (err) {
        toastApiError(err);
      }
    });
    act("adm-ad-del", async (e, el2) => {
      if (!await confirmDelete(el2.dataset.name)) return;
      try {
        await api.del(`/api/admin/ads/${el2.dataset.id}`);
        toastSuccess(t("misc.deleted"));
        refresh(true);
      } catch (err) {
        toastApiError(err);
      }
    });
    act("adm-ad-save", async (e, form) => {
      e.preventDefault();
      const fd = new FormData(form);
      const isNew = form.dataset.isnew === "1";
      const payload = {
        slot: fd.get("slot"),
        title: fd.get("title"),
        titleEn: fd.get("titleEn") || "",
        text: fd.get("text") || "",
        textEn: fd.get("textEn") || "",
        link: fd.get("link") || "",
        image: fd.get("image") || "",
        cta: fd.get("cta") || "",
        ctaEn: fd.get("ctaEn") || "",
        active: fd.get("active") === "on"
      };
      if (fd.get("startAt")) payload.startAt = new Date(fd.get("startAt")).toISOString();
      if (fd.get("endAt")) payload.endAt = new Date(fd.get("endAt")).toISOString();
      await withBusy(form.querySelector("button[type=submit]"), async () => {
        try {
          if (isNew) await api.post("/api/admin/ads", payload);
          else await api.patch(`/api/admin/ads/${form.dataset.id}`, payload);
          toastSuccess(t("misc.saved"));
          adHandle?.close();
          refresh(true);
        } catch (err) {
          toastApiError(err);
        }
      });
    });
    act("adm-notif-send", async (e, form) => {
      e.preventDefault();
      const fd = new FormData(form);
      const payload = {
        title: String(fd.get("title") || "").trim(),
        titleEn: String(fd.get("titleEn") || "").trim(),
        body: String(fd.get("body") || "").trim(),
        bodyEn: String(fd.get("bodyEn") || "").trim(),
        level: fd.get("level"),
        type: fd.get("type"),
        link: String(fd.get("link") || "").trim(),
        userId: String(fd.get("userId") || "").trim(),
        channels: ["site", "telegram", "email", "sms"].filter((c) => fd.get(`ch_${c}`))
      };
      if (payload.title.length < 3) return;
      await withBusy(form.querySelector("button[type=submit]"), async () => {
        try {
          const r = await api.post("/api/admin/notifications", payload);
          const res = r.results || {};
          const extra = Object.entries(res).map(([k, v]) => `${k}: ${v.error ? "\u2717" : `\u2713${v.ok ?? ""}`}`).join(" ");
          toastSuccess(extra ? `${t("misc.sent")} \u2014 ${extra}` : t("misc.sent"), { timeout: 4200 });
          refresh(true);
        } catch (err) {
          toastApiError(err);
        }
      });
    });
    act("adm-tg-save", async (e, form) => {
      e.preventDefault();
      const payload = { enabled: !!form.enabled?.checked };
      if (form.token?.value) payload.token = form.token.value;
      if (form.welcome !== void 0) payload.welcome = form.welcome.value;
      await withBusy(form.querySelector("button[type=submit]"), async () => {
        try {
          await api.post("/api/admin/telegram", payload);
          toastSuccess(t("common.saved"));
          refresh(true);
        } catch (err) {
          toastApiError(err);
        }
      });
    });
    act("adm-tg-test", async (e, form) => {
      e.preventDefault();
      try {
        await api.post("/api/admin/telegram/test", { chatId: form.chatId.value });
        toastSuccess(t("misc.sent"));
      } catch (err) {
        toastApiError(err);
      }
    });
    act("adm-tg-reply", async (e, form) => {
      e.preventDefault();
      try {
        await api.post("/api/admin/telegram/reply", { chatId: form.dataset.chat, text: form.text.value });
        toastSuccess(t("misc.sent"));
        form.text.value = "";
      } catch (err) {
        toastApiError(err);
      }
    });
    act("adm-lot-create", async (e, form) => {
      e.preventDefault();
      const endsAt = new Date(form.endsAt.value).toISOString();
      await withBusy(form.querySelector("button[type=submit]"), async () => {
        try {
          await api.post("/api/admin/lotteries", { title: form.title.value, prize: form.prize.value, endsAt, winnersCount: Number(form.winnersCount.value || 1), entryMode: form.entryMode.value });
          toastSuccess(t("common.saved"));
          refresh(true);
        } catch (err) {
          toastApiError(err);
        }
      });
    });
    act("adm-lot-run", async (e, el2) => {
      const ok = await confirmDialog({ text: t("adm.lotRunWarn"), danger: true });
      if (!ok) return;
      await withBusy(el2, async () => {
        try {
          const r = await api.post(`/api/admin/lotteries/${el2.dataset.id}/run`, {});
          toastSuccess(`${t("adm.lotDone")}: ${(r.lottery?.winners || []).map((w) => w.name).join("\u060C ")}`, { timeout: 6e3 });
          refresh(true);
        } catch (err) {
          toastApiError(err);
        }
      });
    });
    act("adm-lot-close", async (e, el2) => {
      await withBusy(el2, async () => {
        try {
          await api.post(`/api/admin/lotteries/${el2.dataset.id}/close`, {});
          toastSuccess(t("adm.lotClosed"));
          refresh(true);
        } catch (err) {
          toastApiError(err);
        }
      });
    });
  }
});

// public/js/views/admin/settings.mjs
var settings_exports = {};
__export(settings_exports, {
  mount: () => mount25,
  render: () => render27
});
async function render27(ctx) {
  const sec = ["settings", "theme", "features"].includes(ctx.params.section) ? ctx.params.section : "settings";
  const tabs = TABS[sec].filter((x) => sec === "theme" ? can("theme.edit") : true);
  if (!tabs.length) return emptyState({ icon: "lock", title: t("adm.noPermission") });
  const tab = tabs.find((x) => x.id === ctx.params.id) || tabs[0];
  try {
    CFG = await api.get("/api/admin/settings");
  } catch (err) {
    return errorState({ title: err?.message || t("err.generic") });
  }
  const values = CFG.settings?.[tab.id] || {};
  return html`
    <div class="row row-between row-wrap mb">
      <h2 class="section-title">${icon(tab.icon)} ${tab.label()}</h2>
      <span class="badge-pill bp-info">${t("adm.liveView")}</span>
    </div>
    <div class="tabs mb" data-tabs>
      ${TABS[sec].filter((x) => sec === "theme" ? can("theme.edit") : true).map((x) => html`
        <a class="tab ${x.id === tab.id ? "active" : ""}" href="#/admin/${sec}/${x.id}">${icon(x.icon)} ${x.label()}</a>`)}
    </div>
    ${tab.id === "features" ? featuresForm(CFG.settings?.features || {}) : tab.id === "backups" ? raw("<div data-backups-panel></div>") : tab.id === "partners" ? partnersForm(CFG.settings?.partners?.items || []) : schemaForm(tab.id, values)}
    <p class="hint mt">${L7("\u062A\u063A\u06CC\u06CC\u0631\u0647\u0627 \u0628\u0644\u0627\u0641\u0627\u0635\u0644\u0647 \u0631\u0648\u06CC \u0633\u0627\u06CC\u062A \u0627\u0639\u0645\u0627\u0644 \u0645\u06CC\u200C\u0634\u0648\u062F\u061B \u0628\u0631\u0627\u06CC \u062F\u06CC\u062F\u0646 \u0646\u062A\u06CC\u062C\u0647 \u0635\u0641\u062D\u0647 \u0631\u0627 \u062A\u0627\u0632\u0647 \u06A9\u0646.", "Changes apply to the site immediately; refresh the page to see them.")}</p>`;
}
function schemaForm(section, values) {
  const fields = FIELDS[section] || [];
  return html`
    <form class="card" data-act="adm-set-save" data-section="${section}">
      <div class="form-grid">
        ${fields.map((f) => renderField(f, values[f.k])).join("")}
      </div>
      <div class="row row-wrap mt">
        <button class="btn btn-primary" type="submit">${icon("save")} ${t("common.save")}</button>
        <button class="btn btn-ghost" type="button" data-act="adm-set-reset">${icon("refresh")} ${t("common.reset")}</button>
      </div>
    </form>`;
}
function renderField(f, value) {
  const label = f.label();
  switch (f.type) {
    case "bool":
      return html`<div class="span-2">${switchField({ label, desc: f.hint ? f.hint() : "", name: f.k, checked: value !== false })}</div>`;
    case "select":
      return selectField({ label, name: f.k, value: value ?? "", options: f.options().map(([v, l]) => ({ value: v, label: l })) });
    case "number":
      return field2({ label, name: f.k, type: "number", value: value ?? "", attrs: `min="${f.min ?? 0}" max="${f.max ?? 999999999}" step="${f.step ?? 1}"` });
    case "textarea":
      return html`<div class="span-2">${textareaField({ label, name: f.k, value: value ?? "", rows: 3 })}</div>`;
    case "color":
      return html`
        <label class="field"><span class="label">${label}</span>
          <span class="row color-row">
            <input type="color" class="color-pick" name="${f.k}-pick" value="${esc(value || "#31afd4")}" data-color-for="${f.k}">
            <input class="input mono" name="${f.k}" value="${esc(value || "#31afd4")}" maxlength="7" data-fkey="${f.k}">
          </span>
        </label>`;
    case "coords":
      return html`
        <div class="span-2"><span class="label">${label}</span>
          <div class="row">
            <input class="input mono" name="${f.k}.lat" value="${value?.lat ?? ""}" placeholder="lat" data-fnum="1">
            <input class="input mono" name="${f.k}.lng" value="${value?.lng ?? ""}" placeholder="lng" data-fnum="1">
            <button type="button" class="btn btn-ghost btn-sm" data-act="adm-set-geo" data-lat="${f.k}.lat" data-lng="${f.k}.lng">${icon("pin")} ${t("contact.allowLocation")}</button>
          </div>
        </div>`;
    case "group":
      return html`
        <div class="span-2 group-box">
          <strong class="small">${label}</strong>
          <div class="form-grid mt-s">
            ${f.fields.map((sf) => sf.type === "bool" ? html`<div class="span-2">${switchField({ label: sf.label(), name: `${f.k}.${sf.k}`, checked: value?.[sf.k] !== false })}</div>` : sf.type === "number" ? field2({ label: sf.label(), name: `${f.k}.${sf.k}`, type: "number", value: value?.[sf.k] ?? "" }) : field2({ label: sf.label(), name: `${f.k}.${sf.k}`, value: value?.[sf.k] ?? "", type: sf.k === "pass" || sf.k === "apiKey" ? "password" : "text" })).join("")}
          </div>
        </div>`;
    case "kv":
      return html`
        <div class="span-2"><span class="label">${label}</span>
          <div class="form-grid">
            ${f.keys.map((k) => html`<label class="field"><span class="label tiny muted mono">${k}</span>
              <input class="input" name="${f.k}.${k}" value="${esc(value?.[k] ?? "")}"></label>`)}
          </div>
        </div>`;
    case "kvnum":
      return html`
        <div class="span-2"><span class="label">${label}</span>
          <div class="form-grid">
            ${f.keys.map((k) => html`<label class="field"><span class="label tiny muted">${t(`adm.uCols${k.charAt(0).toUpperCase()}${k.slice(1)}`)}</span>
              <input class="input" type="number" min="${f.min}" max="${f.max}" name="${f.k}.${k}" value="${value?.[k] ?? ""}"></label>`)}
          </div>
        </div>`;
    case "multi":
      return html`
        <div class="span-2"><span class="label">${label}</span>
          <div class="row row-wrap">
            ${f.options().map(([v, l]) => html`<label class="check"><input type="checkbox" name="${f.k}[]" value="${v}" ${(value || []).includes(v) ? "checked" : ""}><span class="box">${icon("check")}</span><span>${l}</span></label>`)}
          </div>
        </div>`;
    case "rows":
      return html`
        <div class="span-2">
          <div class="row row-between">
            <span class="label">${label}</span>
            <button type="button" class="btn btn-ghost btn-xs" data-act="adm-row-add" data-row="${f.k}">${icon("plus")} ${t("common.add")}</button>
          </div>
          <div data-rows="${f.k}">
            ${(Array.isArray(value) ? value : []).map((row) => rowHtml(f, row)).join("")}
          </div>
          <template data-row-tpl="${f.k}">${rowHtml(f, null)}</template>
        </div>`;
    default:
      return field2({ label, name: f.k, value: value ?? "" });
  }
}
function rowHtml(f, row) {
  return html`
    <div class="spec-row" data-row="${f.k}">
      ${f.cols.map((c) => {
    const v = row?.[c.k] ?? "";
    return c.type === "select" ? html`<select class="select" data-col="${c.k}">${c.options().map(([ov, ol]) => html`<option value="${ov}" ${String(v) === String(ov) ? "selected" : ""}>${ol}</option>`)}</select>` : c.type === "number" ? html`<input class="input" type="number" data-col="${c.k}" value="${esc(v)}" placeholder="${c.label ? c.label() : c.k}">` : html`<input class="input" data-col="${c.k}" value="${esc(v)}" placeholder="${c.label ? c.label() : c.k}">`;
  })}
      <button type="button" class="btn btn-ghost btn-icon btn-sm" data-act="adm-row-del">${icon("trash")}</button>
    </div>`;
}
function featuresForm(features) {
  const keys = Object.keys(features);
  return html`
    <form class="card" data-act="adm-set-save" data-section="features">
      <p class="notice notice-info mb">${icon("info")}<span>${t("adm.fHint")}</span></p>
      <div class="perm-grid">
        ${keys.map((k) => html`
          <label class="perm-item">
            <span class="switch"><input type="checkbox" name="features.${k}" ${features[k] !== false ? "checked" : ""}><span class="track"></span></span>
            <span class="grow">${t(`feat.${k}`) || k}<span class="k mono">${k}</span></span>
          </label>`)}
      </div>
      <div class="row row-wrap mt">
        <button class="btn btn-primary" type="submit">${icon("save")} ${t("common.save")}</button>
        <button class="btn btn-ghost" type="button" data-act="adm-set-reset">${icon("refresh")} ${t("common.reset")}</button>
      </div>
    </form>`;
}
function partnersForm(items) {
  const row = (it) => html`
    <div class="row pt-row" data-ptrow>
      <input class="input" name="fa" placeholder="${t("adm.ptFa")}" value="${it?.fa || ""}" maxlength="60">
      <input class="input" name="en" placeholder="${t("adm.ptEn")}" value="${it?.en || ""}" maxlength="60">
      <button type="button" class="btn btn-ghost btn-sm" data-act="adm-pt-del" aria-label="${t("misc.delete")}">${icon("trash")}</button>
    </div>`;
  return html`
    <form class="card" data-act="adm-set-save" data-section="partners">
      <p class="notice notice-info mb">${icon("info")}<span>${t("adm.ptHint")}</span></p>
      <div class="col" data-ptlist>${items.map((it) => row(it)).join("") || row(null)}</div>
      <div class="row row-wrap mt">
        <button type="button" class="btn btn-ghost" data-act="adm-pt-add">${icon("plus")} ${t("adm.ptAdd")}</button>
        <button class="btn btn-primary" type="submit">${icon("save")} ${t("common.save")}</button>
      </div>
    </form>`;
}
function collect(form, section) {
  const out = {};
  if (section === "features") {
    form.querySelectorAll('input[type=checkbox][name^="features."]').forEach((i) => {
      out[i.name.slice(9)] = i.checked;
    });
    return out;
  }
  if (section === "partners") {
    out.items = [...form.querySelectorAll("[data-ptrow]")].map((r) => ({ fa: r.querySelector("[name=fa]").value.trim(), en: r.querySelector("[name=en]").value.trim() })).filter((x) => x.fa || x.en);
    return out;
  }
  for (const f of FIELDS[section] || []) {
    switch (f.type) {
      case "bool": {
        const el2 = form.querySelector(`[name="${f.k}"]`);
        if (el2) out[f.k] = el2.checked;
        break;
      }
      case "multi": {
        out[f.k] = [...form.querySelectorAll(`[name="${f.k}[]"]`)].filter((i) => i.checked).map((i) => i.value);
        break;
      }
      case "rows": {
        out[f.k] = [...form.querySelectorAll(`[data-rows="${f.k}"] [data-row]`)].map((row) => {
          const o = {};
          for (const c of f.cols) {
            const el2 = row.querySelector(`[data-col="${c.k}"]`);
            o[c.k] = c.type === "number" ? Number(el2?.value || 0) : String(el2?.value ?? "");
          }
          return o;
        });
        break;
      }
      case "kv": {
        const o = {};
        for (const k of f.keys) o[k] = String(form.querySelector(`[name="${f.k}.${k}"]`)?.value ?? "");
        out[f.k] = o;
        break;
      }
      case "group": {
        const o = {};
        for (const sf of f.fields) {
          const el2 = form.querySelector(`[name="${f.k}.${sf.k}"]`);
          if (!el2) continue;
          o[sf.k] = sf.type === "bool" ? el2.checked : sf.type === "number" ? Number(el2.value || 0) : String(el2.value ?? "");
        }
        out[f.k] = o;
        break;
      }
      case "kvnum": {
        const o = {};
        for (const k of f.keys) o[k] = Number(form.querySelector(`[name="${f.k}.${k}"]`)?.value || 0);
        out[f.k] = o;
        break;
      }
      case "coords": {
        const lat = form.querySelector(`[name="${f.k}.lat"]`)?.value;
        const lng = form.querySelector(`[name="${f.k}.lng"]`)?.value;
        if (lat !== "" && lng !== "" && lat !== void 0) out[f.k] = { lat: Number(lat), lng: Number(lng) };
        break;
      }
      case "number": {
        const el2 = form.querySelector(`[name="${f.k}"]`);
        if (el2 && el2.value !== "") out[f.k] = Number(el2.value);
        break;
      }
      default: {
        const el2 = form.querySelector(`[name="${f.k}"]`);
        if (el2) out[f.k] = String(el2.value ?? "");
      }
    }
  }
  return out;
}
function mount25(root, ctx) {
  applyDyn(root);
  if (ctx?.params?.id === "backups") loadBackupsPanel(root);
  root.querySelectorAll("[data-color-for]").forEach((pick) => {
    const text = root.querySelector(`[name="${pick.dataset.colorFor}"]`);
    pick.addEventListener("input", () => {
      if (text) text.value = pick.value;
    });
    text?.addEventListener("input", () => {
      if (/^#[0-9a-f]{6}$/i.test(text.value)) pick.value = text.value;
    });
  });
  return null;
}
async function loadBackupsPanel(root) {
  const box = root.querySelector("[data-backups-panel]");
  if (!box) return;
  box.innerHTML = '<div class="sk sk-line w70"></div>';
  try {
    const r = await api.get("/api/admin/backups");
    box.innerHTML = html`
      <div class="card">
        <div class="row row-between row-wrap">
          <strong>${icon("download")} ${t("adm.sBackups")}</strong>
          <div class="row row-wrap">
            <a class="btn btn-ghost btn-sm" href="/api/admin/dump" download>${icon("download")} ${t("adm.dumpFull")}</a>
            <button type="button" class="btn btn-primary btn-sm" data-act="adm-backup-now">${icon("plus")} ${t("adm.backupNow")}</button>
          </div>
        </div>
        <p class="muted small mt-s">${t("adm.backupsHint", { hours: fmtNum(r.everyHours || 12), keep: fmtNum(r.keep || 14) })}</p>
        ${r.items?.length ? html`<div class="table-wrap mt-s"><table class="table">
          <thead><tr><th>${t("common.date")}</th><th>${t("adm.backupSize")}</th><th></th></tr></thead>
          <tbody>${r.items.map((b) => html`<tr>
            <td class="tiny">${fmtDate(b.at)}</td>
            <td class="tiny muted">${fmtNum(Math.round(b.bytes / 1024))} KB</td>
            <td><div class="row row-end">
              <a class="btn btn-ghost btn-sm" href="/api/admin/backups/${b.id}/download" download>${icon("download")} ${t("common.download")}</a>
              <button type="button" class="btn btn-danger btn-sm" data-act="adm-backup-restore" data-id="${b.id}">${icon("refresh")} ${t("adm.backupRestore")}</button>
            </div></td>
          </tr>`)}</tbody></table></div>` : html`<p class="muted small mt-s">${t("adm.backupsEmpty")}</p>`}
      </div>`;
  } catch (err) {
    box.innerHTML = html`<div class="notice notice-error">${icon("alert")} ${err?.message || t("err.generic")}</div>`;
  }
}
var L7, FIELDS, TABS, CFG;
var init_settings = __esm({
  "public/js/views/admin/settings.mjs"() {
    init_dom();
    init_i18n();
    init_api();
    init_state();
    init_components();
    init_ui();
    init_actions();
    init_router();
    L7 = (fa3, en2) => isFa2() ? fa3 : en2;
    FIELDS = {
      mailsms: [
        { k: "mail", label: () => t("adm.mailCfg"), type: "group", fields: [
          { k: "enabled", label: () => t("adm.mailEnabled"), type: "bool" },
          { k: "host", label: () => "SMTP host", type: "text" },
          { k: "port", label: () => "SMTP port", type: "number", min: 1, max: 65535 },
          { k: "user", label: () => t("common.username"), type: "text" },
          { k: "pass", label: () => t("common.password"), type: "text" },
          { k: "from", label: () => t("adm.mailFrom"), type: "text" }
        ] },
        { k: "sms", label: () => t("adm.smsCfg"), type: "group", fields: [
          { k: "enabled", label: () => t("adm.smsEnabled"), type: "bool" },
          { k: "apiKey", label: () => t("adm.smsKey"), type: "text" },
          { k: "sender", label: () => t("adm.smsSender"), type: "text" }
        ] }
      ],
      store: [
        { k: "name", label: () => L7("\u0646\u0627\u0645 \u0641\u0631\u0648\u0634\u06AF\u0627\u0647", "Store name"), type: "text" },
        { k: "nameEn", label: () => L7("\u0646\u0627\u0645 (\u0627\u0646\u06AF\u0644\u06CC\u0633\u06CC)", "Name (EN)"), type: "text" },
        { k: "tagline", label: () => L7("\u0634\u0639\u0627\u0631", "Tagline"), type: "text" },
        { k: "taglineEn", label: () => L7("\u0634\u0639\u0627\u0631 (\u0627\u0646\u06AF\u0644\u06CC\u0633\u06CC)", "Tagline (EN)"), type: "text" },
        { k: "phone", label: () => t("contact.phone"), type: "text" },
        { k: "phone2", label: () => t("contact.mobile"), type: "text" },
        { k: "phone3", label: () => L7("\u0634\u0645\u0627\u0631\u0647\u0654 \u0633\u0648\u0645 (\u0627\u062E\u062A\u06CC\u0627\u0631\u06CC)", "Third phone (optional)"), type: "text" },
        { k: "whatsapp", label: () => t("contact.whatsapp"), type: "text" },
        { k: "email", label: () => t("common.email"), type: "text" },
        { k: "city", label: () => t("common.city"), type: "text" },
        { k: "cityEn", label: () => L7("\u0634\u0647\u0631 (\u0627\u0646\u06AF\u0644\u06CC\u0633\u06CC)", "City (EN)"), type: "text" },
        { k: "address", label: () => t("common.address"), type: "textarea" },
        { k: "addressEn", label: () => L7("\u0622\u062F\u0631\u0633 (\u0627\u0646\u06AF\u0644\u06CC\u0633\u06CC)", "Address (EN)"), type: "textarea" },
        { k: "description", label: () => t("common.description"), type: "textarea" },
        { k: "descriptionEn", label: () => L7("\u062A\u0648\u0636\u06CC\u062D\u0627\u062A (\u0627\u0646\u06AF\u0644\u06CC\u0633\u06CC)", "Description (EN)"), type: "textarea" },
        { k: "enamad", label: () => L7("\u06A9\u062F \u0646\u0645\u0627\u062F \u0627\u0639\u062A\u0645\u0627\u062F", "Trust symbol code"), type: "text" },
        { k: "established", label: () => L7("\u0633\u0627\u0644 \u062A\u0623\u0633\u06CC\u0633 (\u0634\u0645\u0633\u06CC)", "Founded year (Solar)"), type: "number", min: 1300, max: 1500 },
        { k: "mapCoords", label: () => L7("\u0645\u062E\u062A\u0635\u0627\u062A \u0646\u0642\u0634\u0647", "Map coordinates"), type: "coords" },
        { k: "socials", label: () => L7("\u0634\u0628\u06A9\u0647\u200C\u0647\u0627\u06CC \u0627\u062C\u062A\u0645\u0627\u0639\u06CC", "Social links"), type: "kv", keys: ["instagram", "telegram", "eitaa", "whatsapp", "website"] },
        { k: "workingHours", label: () => t("footer.workingHours"), type: "rows", cols: [
          { k: "fa", label: () => L7("\u0631\u0648\u0632", "Day (FA)") },
          { k: "en", label: () => L7("Day (EN)", "Day (EN)") },
          { k: "time", label: () => L7("\u0633\u0627\u0639\u062A", "Hours (FA)") },
          { k: "timeEn", label: () => L7("Hours (EN)", "Hours (EN)") }
        ] }
      ],
      theme: [
        { k: "accent", label: () => t("adm.tAccent"), type: "color" },
        { k: "mode", label: () => t("adm.tMode"), type: "select", options: () => [["dark", t("theme.dark")], ["light", t("theme.light")]] },
        { k: "bgStyle", label: () => t("adm.tBg"), type: "select", options: () => [["waves", L7("\u0645\u0648\u062C \u0648 \u0628\u0646\u062F\u0631", "Waves & port")], ["grid", L7("\u0634\u0628\u06A9\u0647\u200C\u0627\u06CC", "Grid")], ["plain", L7("\u0633\u0627\u062F\u0647", "Plain")]] },
        { k: "density", label: () => t("adm.tDensity"), type: "select", options: () => [["compact", "Compact"], ["normal", "Normal"], ["comfy", "Comfy"]] },
        { k: "contrast", label: () => t("adm.tContrast"), type: "select", options: () => [["normal", "Normal"], ["high", "High"]] },
        { k: "radius", label: () => t("adm.tRadius"), type: "number", min: 0, max: 32 },
        { k: "portTheme", label: () => t("adm.tPort"), type: "bool", hint: () => t("adm.tPortHint") },
        { k: "animations", label: () => t("adm.tAnim"), type: "bool" }
      ],
      ui: [
        { k: "searchPosition", label: () => t("adm.uSearchPos"), type: "select", options: () => [["start", t("adm.uPosStart")], ["center", t("adm.uPosCenter")], ["end", t("adm.uPosEnd")]] },
        { k: "headerLayout", label: () => t("adm.uHeader"), type: "select", options: () => [["logoStart", t("adm.uLayoutLogoStart")], ["split", t("adm.uLayoutSplit")], ["centered", t("adm.uLayoutCentered")]] },
        { k: "navStyle", label: () => t("adm.uNav"), type: "select", options: () => [["pills", "Pills"], ["underline", "Underline"]] },
        { k: "cardStyle", label: () => t("adm.uCards"), type: "select", options: () => [["grid", t("catalog.viewGrid")], ["list", t("catalog.viewList")]] },
        { k: "stickyHeader", label: () => t("adm.uSticky"), type: "bool" },
        { k: "showTicker", label: () => t("adm.uTicker"), type: "bool" },
        { k: "tickerSpeed", label: () => t("adm.uTickerSpeed"), type: "number", min: 10, max: 90 },
        { k: "quickView", label: () => t("adm.uQuick"), type: "bool" },
        { k: "floatingChat", label: () => t("adm.uChat"), type: "bool" },
        { k: "showBreadcrumbs", label: () => t("adm.uCrumb"), type: "bool" },
        { k: "columns", label: () => t("adm.uCols"), type: "kvnum", keys: ["mobile", "tablet", "desktop", "wide"], min: 1, max: 8 },
        { k: "productCardInfo", label: () => t("adm.uCardInfo"), type: "multi", options: () => [["brand", t("common.brand")], ["stock", t("common.stock")], ["rating", t("common.rating")], ["warranty", t("pdp.warranty")], ["sold", t("pdp.sold")]] },
        { k: "tickerItems", label: () => t("adm.uTickerItems"), type: "rows", cols: [
          { k: "text", label: () => L7("\u0645\u062A\u0646", "Text") },
          { k: "textEn", label: () => L7("\u0645\u062A\u0646 (\u0627\u0646\u06AF\u0644\u06CC\u0633\u06CC)", "Text (EN)") },
          { k: "link", label: () => L7("\u0644\u06CC\u0646\u06A9", "Link") }
        ] }
      ],
      shipping: [
        { k: "pickupEnabled", label: () => t("checkout.pickup"), type: "bool" },
        { k: "courierEnabled", label: () => t("checkout.courier"), type: "bool" },
        { k: "courierBase", label: () => L7("\u0647\u0632\u06CC\u0646\u0647\u0654 \u067E\u0627\u06CC\u0647\u0654 \u0627\u0631\u0633\u0627\u0644", "Base shipping fee"), type: "number", min: 0, max: 1e7 },
        { k: "freeOver", label: () => L7("\u0627\u0631\u0633\u0627\u0644 \u0631\u0627\u06CC\u06AF\u0627\u0646 \u0627\u0632 \u0645\u0628\u0644\u063A", "Free shipping over"), type: "number", min: 0, max: 1e8 },
        { k: "handlingHours", label: () => L7("\u0632\u0645\u0627\u0646 \u0622\u0645\u0627\u062F\u0647\u200C\u0633\u0627\u0632\u06CC (\u0633\u0627\u0639\u062A)", "Handling hours"), type: "number", min: 1, max: 720 },
        { k: "expressEnabled", label: () => t("checkout.express"), type: "bool" },
        { k: "expressFee", label: () => L7("\u0647\u0632\u06CC\u0646\u0647\u0654 \u0627\u0631\u0633\u0627\u0644 \u0641\u0648\u0631\u06CC", "Express fee"), type: "number", min: 0, max: 1e7 },
        { k: "insuranceRatePct", label: () => L7("\u0646\u0631\u062E \u0628\u06CC\u0645\u0647 (\u062F\u0631\u0635\u062F)", "Insurance rate (%)"), type: "number", min: 0, max: 20, step: 0.1 },
        { k: "insuranceMin", label: () => L7("\u062D\u062F\u0627\u0642\u0644 \u0647\u0632\u06CC\u0646\u0647\u0654 \u0628\u06CC\u0645\u0647", "Insurance minimum"), type: "number", min: 0, max: 1e7 },
        { k: "zones", label: () => t("checkout.zone"), type: "rows", cols: [
          { k: "id", label: () => L7("\u0634\u0646\u0627\u0633\u0647", "ID"), type: "select", options: () => [["city", L7("\u062F\u0627\u062E\u0644 \u0634\u0647\u0631", "City")], ["province", L7("\u0627\u0633\u062A\u0627\u0646", "Province")], ["country", L7("\u06A9\u0634\u0648\u0631", "Country")], ["island", L7("\u062C\u0632\u0627\u06CC\u0631", "Islands")]] },
          { k: "name", label: () => L7("\u0646\u0627\u0645", "Name") },
          { k: "nameEn", label: () => L7("\u0646\u0627\u0645 (\u0627\u0646\u06AF\u0644\u06CC\u0633\u06CC)", "Name (EN)") },
          { k: "fee", label: () => L7("\u0647\u0632\u06CC\u0646\u0647", "Fee"), type: "number" },
          { k: "eta", label: () => L7("\u0632\u0645\u0627\u0646 \u062A\u062D\u0648\u06CC\u0644", "ETA") }
        ] }
      ],
      plus: [
        { k: "enabled", label: () => t("feat.plus"), type: "bool" },
        { k: "price", label: () => L7("\u0645\u0628\u0644\u063A \u0627\u0634\u062A\u0631\u0627\u06A9", "Price"), type: "number", min: 0, max: 1e8 },
        { k: "durationDays", label: () => L7("\u0645\u062F\u062A (\u0631\u0648\u0632)", "Duration (days)"), type: "number", min: 1, max: 365 },
        { k: "discountPct", label: () => L7("\u062A\u062E\u0641\u06CC\u0641 \u062F\u0627\u0626\u0645\u06CC (\u062F\u0631\u0635\u062F)", "Permanent discount (%)"), type: "number", min: 0, max: 30, step: 0.5 },
        { k: "freeShippingMin", label: () => L7("\u0627\u0631\u0633\u0627\u0644 \u0631\u0627\u06CC\u06AF\u0627\u0646 \u0627\u0632 \u0645\u0628\u0644\u063A", "Free shipping over"), type: "number", min: 0, max: 1e8 },
        { k: "autoInsurance", label: () => L7("\u0628\u06CC\u0645\u0647\u0654 \u062E\u0648\u062F\u06A9\u0627\u0631", "Auto insurance"), type: "bool" },
        { k: "prioritySupport", label: () => L7("\u067E\u0634\u062A\u06CC\u0628\u0627\u0646\u06CC \u0627\u0648\u0644\u0648\u06CC\u062A\u200C\u062F\u0627\u0631", "Priority support"), type: "bool" },
        { k: "expressDiscountPct", label: () => L7("\u062A\u062E\u0641\u06CC\u0641 \u0627\u0631\u0633\u0627\u0644 \u0641\u0648\u0631\u06CC (\u062F\u0631\u0635\u062F)", "Express discount (%)"), type: "number", min: 0, max: 100 },
        { k: "perks", label: () => t("acc.plusPerks"), type: "rows", cols: [
          { k: "id", label: () => "id" },
          { k: "fa", label: () => L7("\u0645\u0632\u06CC\u062A", "Perk (FA)") },
          { k: "en", label: () => L7("Perk (EN)", "Perk (EN)") }
        ] }
      ],
      orders: [
        { k: "minOrder", label: () => L7("\u062D\u062F\u0627\u0642\u0644 \u0645\u0628\u0644\u063A \u0633\u0641\u0627\u0631\u0634", "Minimum order"), type: "number", min: 0, max: 1e8 },
        { k: "walletEnabled", label: () => t("feat.wallet"), type: "bool" },
        { k: "gatewayEnabled", label: () => t("pm.gateway"), type: "bool" },
        { k: "gatewayMode", label: () => L7("\u062D\u0627\u0644\u062A \u062F\u0631\u06AF\u0627\u0647", "Gateway mode"), type: "select", options: () => [["demo", L7("\u0622\u0632\u0645\u0627\u06CC\u0634\u06CC", "Demo")], ["live", L7("\u0648\u0627\u0642\u0639\u06CC", "Live")]] },
        { k: "codEnabled", label: () => t("pm.cod"), type: "bool" },
        { k: "autoCancelHours", label: () => L7("\u0644\u063A\u0648 \u062E\u0648\u062F\u06A9\u0627\u0631 \u067E\u0633 \u0627\u0632 (\u0633\u0627\u0639\u062A)", "Auto-cancel after (h)"), type: "number", min: 1, max: 720 },
        { k: "stockReserveMinutes", label: () => L7("\u0631\u0632\u0631\u0648 \u0645\u0648\u062C\u0648\u062F\u06CC (\u062F\u0642\u06CC\u0642\u0647)", "Stock reserve (min)"), type: "number", min: 0, max: 1440 },
        { k: "refundToWallet", label: () => L7("\u0628\u0627\u0632\u06AF\u0634\u062A \u0648\u062C\u0647 \u0628\u0647 \u06A9\u06CC\u0641 \u067E\u0648\u0644", "Refund to wallet"), type: "bool" }
      ],
      seo: [
        { k: "title", label: () => L7("\u0639\u0646\u0648\u0627\u0646 \u0633\u0627\u06CC\u062A", "Site title"), type: "text" },
        { k: "description", label: () => L7("\u062A\u0648\u0636\u06CC\u062D\u0627\u062A \u0645\u062A\u0627", "Meta description"), type: "textarea" },
        { k: "keywords", label: () => L7("\u06A9\u0644\u06CC\u062F\u0648\u0627\u0698\u0647\u200C\u0647\u0627", "Keywords"), type: "text" }
      ],
      currency: [
        { k: "code", label: () => L7("\u06A9\u062F \u0627\u0631\u0632", "Currency code"), type: "text" },
        { k: "label", label: () => L7("\u0646\u0627\u0645 \u0648\u0627\u062D\u062F", "Unit label"), type: "text" },
        { k: "labelEn", label: () => L7("Unit (EN)", "Unit (EN)"), type: "text" }
      ],
      auth: [
        { k: "allowRegistration", label: () => L7("\u062B\u0628\u062A\u200C\u0646\u0627\u0645 \u0628\u0627\u0632 \u0628\u0627\u0634\u062F", "Allow registration"), type: "bool" },
        { k: "otpMode", label: () => L7("\u062D\u0627\u0644\u062A \u0627\u0631\u0633\u0627\u0644 \u06A9\u062F", "OTP mode"), type: "select", options: () => [["demo", L7("\u0622\u0632\u0645\u0627\u06CC\u0634\u06CC", "Demo")], ["live", L7("\u0648\u0627\u0642\u0639\u06CC", "Live")]] },
        { k: "requirePhone", label: () => L7("\u0634\u0645\u0627\u0631\u0647\u0654 \u0645\u0648\u0628\u0627\u06CC\u0644 \u0627\u0644\u0632\u0627\u0645\u06CC", "Require phone"), type: "bool" },
        { k: "force2faStaff", label: () => L7("\u06F2FA \u0627\u062C\u0628\u0627\u0631\u06CC \u06A9\u0627\u0631\u06A9\u0646\u0627\u0646", "Force 2FA for staff"), type: "bool" },
        { k: "sessionDays", label: () => L7("\u0637\u0648\u0644 \u0646\u0634\u0633\u062A (\u0631\u0648\u0632)", "Session days"), type: "number", min: 1, max: 90 }
      ],
      contact: [
        { k: "supportNote", label: () => L7("\u067E\u06CC\u0627\u0645 \u0628\u062E\u0634 \u067E\u0634\u062A\u06CC\u0628\u0627\u0646\u06CC", "Support note"), type: "textarea" },
        { k: "supportNoteEn", label: () => L7("Support note (EN)", "Support note (EN)"), type: "textarea" }
      ]
    };
    TABS = {
      settings: [
        { id: "store", icon: "store", label: () => t("adm.sStore") },
        { id: "shipping", icon: "truck", label: () => t("adm.sShipping") },
        { id: "plus", icon: "sparkles", label: () => t("adm.sPlus") },
        { id: "orders", icon: "card", label: () => t("adm.sOrders") },
        { id: "auth", icon: "key", label: () => t("adm.sAuth") },
        { id: "seo", icon: "search", label: () => t("adm.sSeo") },
        { id: "currency", icon: "wallet", label: () => L7("\u0648\u0627\u062D\u062F \u067E\u0648\u0644", "Currency") },
        { id: "partners", icon: "star", label: () => t("adm.sPartners") },
        { id: "contact", icon: "headset", label: () => t("common.support") },
        { id: "mailsms", icon: "send", label: () => t("adm.mailsms") }
      ],
      theme: [
        { id: "theme", icon: "sun", label: () => t("adm.sTheme") },
        { id: "ui", icon: "grid", label: () => t("adm.sUi") }
      ],
      features: [
        { id: "features", icon: "zap", label: () => t("adm.sFeatures") },
        { id: "backups", icon: "download", label: () => t("adm.sBackups") }
      ]
    };
    CFG = null;
    act("adm-pt-add", (e) => {
      const list5 = e.target.closest("form").querySelector("[data-ptlist]");
      list5.insertAdjacentHTML("beforeend", `<div class="row pt-row" data-ptrow><input class="input" name="fa" placeholder="${t("adm.ptFa")}" value="" maxlength="60"><input class="input" name="en" placeholder="${t("adm.ptEn")}" value="" maxlength="60"><button type="button" class="btn btn-ghost btn-sm" data-act="adm-pt-del" aria-label="${t("misc.delete")}">${icon("trash")}</button></div>`);
    });
    act("adm-pt-del", (e) => {
      const form = e.target.closest("form");
      const rows = form.querySelectorAll("[data-ptrow]");
      if (rows.length > 1) e.target.closest("[data-ptrow]").remove();
      else form.querySelectorAll("[data-ptrow] input").forEach((i) => i.value = "");
    });
    act("adm-set-save", async (e, form) => {
      e.preventDefault();
      const section = form.dataset.section;
      const value = collect(form, section);
      if (section === "theme" && value.accent && !/^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(value.accent)) {
        toastError2(isFa2() ? "\u0631\u0646\u06AF \u0628\u0627\u06CC\u062F \u0628\u0627 \u0641\u0631\u0645\u062A #RRGGBB \u0628\u0627\u0634\u062F." : "Colour must be in #RRGGBB format.");
        return;
      }
      await withBusy(form.querySelector("button[type=submit]"), async () => {
        try {
          await api.patch(`/api/admin/settings/${section}`, { value });
          await refreshBootstrap({ silent: true });
          applyPrefs();
          toastSuccess(t("adm.sSaved"));
          refresh(true);
        } catch (err) {
          toastApiError(err);
        }
      });
    });
    act("adm-set-reset", () => refresh(true));
    act("adm-set-geo", (e, el2) => {
      if (!navigator.geolocation) {
        toastError2(t("contact.locationDenied"));
        return;
      }
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const form = el2.closest("form");
          const lat = form.querySelector(`[name="${el2.dataset.lat}"]`);
          const lng = form.querySelector(`[name="${el2.dataset.lng}"]`);
          if (lat) lat.value = pos.coords.latitude.toFixed(5);
          if (lng) lng.value = pos.coords.longitude.toFixed(5);
          toastSuccess(t("contact.locationOn"));
        },
        () => toastError2(t("contact.locationDenied")),
        { timeout: 9e3 }
      );
    });
    act("adm-row-add", (e, el2) => {
      const key = el2.dataset.row;
      const form = el2.closest("form");
      const tpl = form.querySelector(`[data-row-tpl="${key}"]`);
      const box = form.querySelector(`[data-rows="${key}"]`);
      if (!tpl || !box) return;
      const wrap = document.createElement("div");
      wrap.innerHTML = tpl.innerHTML.trim();
      const node = wrap.firstElementChild;
      if (node) {
        node.querySelectorAll("input").forEach((i) => {
          i.value = "";
        });
        box.appendChild(node);
      }
    });
    act("adm-row-del", (e, el2) => {
      el2.closest("[data-row]")?.remove();
    });
    act("adm-backup-now", async (e, el2) => {
      await withBusy(el2, async () => {
        try {
          await api.post("/api/admin/backups", {});
          toastSuccess(t("adm.backupDone"));
          await loadBackupsPanel(document.querySelector("#view") || el2.closest("#view")?.parentNode || document);
        } catch (err) {
          toastApiError(err);
        }
      });
    });
    act("adm-backup-restore", async (e, el2) => {
      const ok = await confirmDialog({ text: t("adm.backupRestoreWarn"), danger: true });
      if (!ok) return;
      await withBusy(el2, async () => {
        try {
          await api.post("/api/admin/backups/restore", { id: el2.dataset.id });
          toastSuccess(t("adm.backupRestored"));
          setTimeout(() => location.reload(), 900);
        } catch (err) {
          toastApiError(err);
        }
      });
    });
  }
});

// public/js/views/admin/pages.mjs
var pages_exports = {};
__export(pages_exports, {
  mount: () => mount26,
  render: () => render28
});
async function render28(ctx) {
  try {
    DATA = (await api.get("/api/admin/pages")).pages || {};
  } catch (err) {
    return errorState({ title: err?.message || t("err.generic") });
  }
  const key = PAGES.find((p) => p.key === ctx.params.id) ? ctx.params.id : "";
  return html`
    <div class="row row-between row-wrap mb">
      <h2 class="section-title">${icon("file")} ${t("adm.pages")}</h2>
      <span class="badge-pill bp-muted">${fmtNum(PAGES.length)} ${L8("\u0635\u0641\u062D\u0647", "pages")}</span>
    </div>

    <div class="page-grid">
      <div class="card page-nav">
        ${PAGES.map((p) => html`
          <a class="pg-item ${p.key === key ? "active" : ""}" href="#/admin/pages/${p.key}">
            ${icon(p.icon)}<span class="grow">${pageLabel(p.key)}</span>
          </a>`).join("")}
      </div>
      <div>${key ? editor2(PAGES.find((p) => p.key === key)) : emptyState({ icon: "file", title: t("adm.pagesPick"), text: t("adm.pagesPickHint") })}</div>
    </div>`;
}
function pageLabel(key) {
  const map = {
    about: t("footer.about"),
    guide: t("footer.guide"),
    service: t("footer.service"),
    faq: t("footer.faq"),
    terms: t("footer.terms"),
    privacy: t("footer.privacy"),
    insurance: t("footer.insurance"),
    ticketRules: t("acc.ticketRules"),
    bugReport: t("feedback.bug"),
    contact: t("footer.contact")
  };
  return map[key] || key;
}
function editor2(p) {
  const page = DATA[p.key] || (p.key === "faq" ? [] : {});
  return html`
    <form class="card" data-act="adm-pg-save" data-key="${p.key}">
      <div class="row row-between row-wrap mb-s">
        <strong>${icon(p.icon)} ${pageLabel(p.key)}</strong>
        <a class="btn btn-ghost btn-xs" href="#/pages/${p.key}" target="_blank" rel="noopener">${icon("external")} ${t("adm.view")}</a>
      </div>
      <p class="notice notice-info mb">${icon("info")}<span>${t("adm.pgHint")}</span></p>
      ${p.blocks.map((b) => blockHtml(b, page)).join("")}
      <div class="row row-wrap mt">
        <button class="btn btn-primary" type="submit">${icon("save")} ${t("common.save")}</button>
        <a class="btn btn-ghost" href="#/admin/pages/${p.key}">${t("common.reset")}</a>
      </div>
    </form>`;
}
function blockHtml(block, page) {
  switch (block) {
    case "hero": {
      const hr = page.hero || {};
      return html`
        <fieldset class="pg-block">
          <legend>${icon("sparkles")} ${L8("\u0633\u0631\u0628\u0631\u06AF \u0635\u0641\u062D\u0647", "Page hero")}</legend>
          <div class="form-grid">
            ${field2({ label: t("common.title"), name: "hero.title", value: hr.title || "", span2: true })}
            ${field2({ label: L8("\u0639\u0646\u0648\u0627\u0646 (\u0627\u0646\u06AF\u0644\u06CC\u0633\u06CC)", "Title (EN)"), name: "hero.titleEn", value: hr.titleEn || "", span2: true })}
            ${textareaField({ label: L8("\u0632\u06CC\u0631\u0639\u0646\u0648\u0627\u0646", "Subtitle"), name: "hero.subtitle", value: hr.subtitle || "", rows: 2, span2: true })}
            ${textareaField({ label: L8("\u0632\u06CC\u0631\u0639\u0646\u0648\u0627\u0646 (\u0627\u0646\u06AF\u0644\u06CC\u0633\u06CC)", "Subtitle (EN)"), name: "hero.subtitleEn", value: hr.subtitleEn || "", rows: 2, span2: true })}
          </div>
        </fieldset>`;
    }
    case "intro":
      return textBlock("intro", L8("\u0645\u0642\u062F\u0645\u0647", "Intro"), page.intro || "", page.introEn || "");
    case "body":
      return textBlock("body", L8("\u0645\u062A\u0646 \u0627\u0635\u0644\u06CC", "Body text"), page.body || "", page.bodyEn || "");
    case "notice":
      return textBlock("notice", L8("\u0647\u0634\u062F\u0627\u0631/\u0646\u06A9\u062A\u0647", "Notice"), page.notice || "", page.noticeEn || "", 2);
    case "rules":
      return linesBlock("rules", L8("\u0628\u0646\u062F\u0647\u0627 (\u0647\u0631 \u062E\u0637 \u06CC\u06A9 \u0628\u0646\u062F)", "Clauses (one per line)"), page.rules || [], page.rulesEn || []);
    case "hints":
      return linesBlock("hints", L8("\u0631\u0627\u0647\u0646\u0645\u0627\u06CC\u06CC\u200C\u0647\u0627 (\u0647\u0631 \u062E\u0637 \u06CC\u06A9\u06CC)", "Hints (one per line)"), page.hints || [], page.hintsEn || []);
    case "sections":
      return sectionsBlock(page.sections || []);
    case "steps":
      return blocksList("steps", L8("\u06AF\u0627\u0645\u200C\u0647\u0627", "Steps"), page.steps || [], ["title", "titleEn", "body", "bodyEn"], "list");
    case "items":
      return blocksList("items", L8("\u0645\u0648\u0627\u0631\u062F \u062E\u062F\u0645\u0627\u062A", "Service items"), page.items || [], ["icon", "title", "titleEn", "body", "bodyEn"], "grid");
    case "tips":
      return blocksList("tips", L8("\u0646\u06A9\u062A\u0647\u200C\u0647\u0627", "Tips"), page.tips || [], ["fa", "en"], "grid");
    case "stats":
      return blocksList("stats", L8("\u0622\u0645\u0627\u0631\u0647\u0627\u06CC \u0635\u0641\u062D\u0647\u0654 \u062F\u0631\u0628\u0627\u0631\u0647\u0654 \u0645\u0627", "About-page stats"), page.stats || [], ["fa", "en", "key"], "grid");
    case "faq":
      return faqBlock(Array.isArray(page) ? page : []);
    default:
      return "";
  }
}
function textBlock(name, label, fa3, en2, rows = 4) {
  return html`
    <fieldset class="pg-block">
      <legend>${icon("edit")} ${label}</legend>
      <div class="form-grid">
        ${textareaField({ label: L8("\u0641\u0627\u0631\u0633\u06CC", "Persian"), name: `${name}`, value: fa3, rows, span2: true })}
        ${textareaField({ label: L8("\u0627\u0646\u06AF\u0644\u06CC\u0633\u06CC", "English"), name: `${name}En`, value: en2, rows, span2: true })}
      </div>
    </fieldset>`;
}
function linesBlock(name, label, fa3, en2) {
  return html`
    <fieldset class="pg-block">
      <legend>${icon("list")} ${label}</legend>
      <div class="form-grid">
        <label class="field span-2"><span class="label">${L8("\u0641\u0627\u0631\u0633\u06CC", "Persian")}</span>
          <textarea class="textarea" name="${name}" rows="6" data-lines="1">${esc((fa3 || []).join("\n"))}</textarea></label>
        <label class="field span-2"><span class="label">${L8("\u0627\u0646\u06AF\u0644\u06CC\u0633\u06CC", "English")}</span>
          <textarea class="textarea" name="${name}En" rows="6" data-lines="1">${esc((en2 || []).join("\n"))}</textarea></label>
      </div>
    </fieldset>`;
}
function sectionsBlock(sections) {
  return html`
    <fieldset class="pg-block">
      <legend class="row row-between">
        <span>${icon("layers")} ${L8("\u0628\u062E\u0634\u200C\u0647\u0627", "Sections")}</span>
        <button type="button" class="btn btn-ghost btn-xs" data-act="adm-pg-add" data-kind="sections">${icon("plus")} ${t("common.add")}</button>
      </legend>
      <div data-blocks="sections">
        ${sections.map((s, i) => sectionHtml2(s, i)).join("")}
      </div>
      <template data-tpl="sections">${sectionHtml2(emptySection(), 0)}</template>
    </fieldset>`;
}
function sectionHtml2(s, i) {
  const objList = Array.isArray(s.list) && s.list.some((x) => x && typeof x === "object");
  return html`
    <div class="pg-item" data-block="sections" data-objlist="${objList ? "1" : ""}">
      <div class="row row-between">
        <strong class="tiny">${L8("\u0628\u062E\u0634", "Section")} ${i + 1}</strong>
        <span class="act">${moveBtns()}${delBtn()}</span>
      </div>
      <div class="form-grid mt-s">
        ${field2({ label: t("common.title"), name: "title", value: s.title || "" })}
        ${field2({ label: L8("\u0639\u0646\u0648\u0627\u0646 (\u0627\u0646\u06AF\u0644\u06CC\u0633\u06CC)", "Title (EN)"), name: "titleEn", value: s.titleEn || "" })}
        ${textareaField({ label: L8("\u0645\u062A\u0646", "Body"), name: "body", value: s.body || "", rows: 4, span2: true })}
        ${textareaField({ label: L8("\u0645\u062A\u0646 (\u0627\u0646\u06AF\u0644\u06CC\u0633\u06CC)", "Body (EN)"), name: "bodyEn", value: s.bodyEn || "", rows: 3, span2: true })}
        ${listPart(s, objList)}
      </div>
    </div>`;
}
function listPart(s, objList) {
  if (objList) {
    return html`
      <div class="span-2">
        <div class="row row-between">
          <span class="label">${L8("\u0641\u0647\u0631\u0633\u062A \u0645\u0648\u0631\u062F\u06CC", "Bullet list")}</span>
          <button type="button" class="btn btn-ghost btn-xs" data-act="adm-pg-li-add">${icon("plus")}</button>
        </div>
        <div data-li>${(s.list || []).map((x) => liRow(x)).join("")}</div>
        <template data-li-tpl>${liRow({ icon: "check", fa: "", en: "" })}</template>
      </div>`;
  }
  const faLines = (s.list || []).map((x) => typeof x === "string" ? x : x?.fa || "").join("\n");
  const enLines = (s.listEn || []).join("\n");
  if (faLines || enLines) {
    return html`
      <label class="field span-2"><span class="label">${L8("\u0641\u0647\u0631\u0633\u062A (\u0647\u0631 \u062E\u0637 \u06CC\u06A9 \u0645\u0648\u0631\u062F)", "List (one per line)")}</span>
        <textarea class="textarea" name="list" rows="4" data-lines="1">${esc(faLines)}</textarea></label>
      <label class="field span-2"><span class="label">${L8("\u0641\u0647\u0631\u0633\u062A \u0627\u0646\u06AF\u0644\u06CC\u0633\u06CC (\u0647\u0631 \u062E\u0637 \u06CC\u06A9 \u0645\u0648\u0631\u062F)", "List EN (one per line)")}</span>
        <textarea class="textarea" name="listEn" rows="4" data-lines="1">${esc(enLines)}</textarea></label>`;
  }
  return html`
    <div class="span-2">
      <button type="button" class="btn btn-ghost btn-xs" data-act="adm-pg-list-toggle">${icon("plus")} ${L8("\u0627\u0641\u0632\u0648\u062F\u0646 \u0641\u0647\u0631\u0633\u062A \u0645\u0648\u0631\u062F\u06CC", "Add bullet list")}</button>
      <div data-listbox hidden>
        <label class="field span-2"><span class="label">${L8("\u0641\u0647\u0631\u0633\u062A (\u0647\u0631 \u062E\u0637 \u06CC\u06A9 \u0645\u0648\u0631\u062F)", "List (one per line)")}</span>
          <textarea class="textarea" name="list" rows="3" data-lines="1"></textarea></label>
      </div>
    </div>`;
}
function liRow(x) {
  return html`
    <div class="spec-row" data-lir>
      <input class="input li-ic" name="icon" value="${esc(x?.icon || "check")}" placeholder="icon">
      <input class="input" name="fa" value="${esc(x?.fa || "")}" placeholder="${L8("\u0641\u0627\u0631\u0633\u06CC", "FA")}">
      <input class="input" name="en" value="${esc(x?.en || "")}" placeholder="${L8("\u0627\u0646\u06AF\u0644\u06CC\u0633\u06CC", "EN")}">
      <button type="button" class="btn btn-ghost btn-icon btn-sm" data-act="adm-pg-lidel">${icon("trash")}</button>
    </div>`;
}
function blocksList(name, label, items, cols, layout) {
  return html`
    <fieldset class="pg-block">
      <legend class="row row-between">
        <span>${icon("grid")} ${label}</span>
        <button type="button" class="btn btn-ghost btn-xs" data-act="adm-pg-add" data-kind="${name}">${icon("plus")} ${t("common.add")}</button>
      </legend>
      <div class="${layout === "grid" ? "perm-grid" : ""}" data-blocks="${name}">
        ${items.map((it, i) => html`
          <div class="pg-item ${layout === "grid" ? "tight" : ""}" data-block="${name}">
            <div class="row row-between">
              <strong class="tiny">${fmtNum(i + 1)}</strong>
              <span class="act">${moveBtns()}${delBtn()}</span>
            </div>
            <div class="form-grid mt-s">
              ${cols.map((c) => c === "body" || c === "bodyEn" ? textareaField({ label: colLabel(c), name: c, value: it[c] || "", rows: 2, span2: true }) : field2({ label: colLabel(c), name: c, value: it[c] || "" }))}
            </div>
          </div>`).join("")}
      </div>
      <template data-tpl="${name}">
        <div class="pg-item ${layout === "grid" ? "tight" : ""}" data-block="${name}">
          <div class="row row-between"><strong class="tiny">+</strong><span class="act">${moveBtns()}${delBtn()}</span></div>
          <div class="form-grid mt-s">
            ${cols.map((c) => c === "body" || c === "bodyEn" ? textareaField({ label: colLabel(c), name: c, value: "", rows: 2, span2: true }) : field2({ label: colLabel(c), name: c, value: "" }))}
          </div>
        </div>
      </template>
    </fieldset>`;
}
function colLabel(c) {
  return {
    title: t("common.title"),
    titleEn: L8("\u0639\u0646\u0648\u0627\u0646 (\u0627\u0646\u06AF\u0644\u06CC\u0633\u06CC)", "Title (EN)"),
    body: L8("\u0645\u062A\u0646", "Body"),
    bodyEn: L8("\u0645\u062A\u0646 (\u0627\u0646\u06AF\u0644\u06CC\u0633\u06CC)", "Body (EN)"),
    icon: L8("\u0622\u06CC\u06A9\u0648\u0646", "Icon"),
    fa: L8("\u0641\u0627\u0631\u0633\u06CC", "Persian"),
    en: L8("\u0627\u0646\u06AF\u0644\u06CC\u0633\u06CC", "English"),
    key: L8("\u06A9\u0644\u06CC\u062F \u0622\u0645\u0627\u0631\u06CC", "Stat key")
  }[c] || c;
}
function faqBlock(items) {
  const cats = ["orders", "shipping", "returns", "product", "account", "security", "store", "other"];
  return html`
    <fieldset class="pg-block">
      <legend class="row row-between">
        <span>${icon("help")} ${L8("\u0633\u0624\u0627\u0644\u0627\u062A \u0645\u062A\u062F\u0627\u0648\u0644", "FAQ")} (${fmtNum(items.length)})</span>
        <button type="button" class="btn btn-ghost btn-xs" data-act="adm-pg-add" data-kind="faq">${icon("plus")} ${t("common.add")}</button>
      </legend>
      <div data-blocks="faq">
        ${items.map((it, i) => faqItem(it, i, cats)).join("")}
      </div>
      <template data-tpl="faq">${faqItem({ cat: "general", q: "", qEn: "", a: "", aEn: "" }, 0, cats)}</template>
    </fieldset>`;
}
function faqItem(it, i, cats) {
  return html`
    <div class="pg-item" data-block="faq">
      <div class="row row-between">
        <strong class="tiny">${L8("\u0633\u0624\u0627\u0644", "Q")} ${i + 1}</strong>
        <span class="act">${moveBtns()}${delBtn()}</span>
      </div>
      <div class="form-grid mt-s">
        <label class="field"><span class="label">${L8("\u062F\u0633\u062A\u0647", "Category")}</span>
          <select class="select" name="cat">${cats.map((c) => html`<option value="${c}" ${it.cat === c ? "selected" : ""}>${t(`faq.cat.${c}`)}</option>`)}</select></label>
        ${field2({ label: L8("\u0633\u0624\u0627\u0644", "Question"), name: "q", value: it.q || "" })}
        ${field2({ label: L8("\u0633\u0624\u0627\u0644 (\u0627\u0646\u06AF\u0644\u06CC\u0633\u06CC)", "Question (EN)"), name: "qEn", value: it.qEn || "", span2: true })}
        ${textareaField({ label: L8("\u067E\u0627\u0633\u062E", "Answer"), name: "a", value: it.a || "", rows: 3, span2: true })}
        ${textareaField({ label: L8("\u067E\u0627\u0633\u062E (\u0627\u0646\u06AF\u0644\u06CC\u0633\u06CC)", "Answer (EN)"), name: "aEn", value: it.aEn || "", rows: 2, span2: true })}
      </div>
    </div>`;
}
function readBlock(form, name, block) {
  const ta = form.querySelector(`[name="${name}"]`);
  if (!ta) return void 0;
  if (ta.dataset.lines === "1") return ta.value.split("\n").map((x) => x.trim()).filter(Boolean);
  return ta.value;
}
function collect2(form, p) {
  const patch = {};
  for (const block of p.blocks) {
    if (block === "hero") {
      const g = (n) => form.querySelector(`[name="hero.${n}"]`)?.value ?? "";
      patch.hero = { title: g("title"), titleEn: g("titleEn"), subtitle: g("subtitle"), subtitleEn: g("subtitleEn") };
    } else if (["intro", "body", "notice"].includes(block)) {
      patch[block] = readBlock(form, block) ?? "";
      patch[`${block}En`] = readBlock(form, `${block}En`) ?? "";
    } else if (["rules", "hints"].includes(block)) {
      patch[block] = readBlock(form, block) || [];
      patch[`${block}En`] = readBlock(form, `${block}En`) || [];
    } else if (block === "faq") {
      patch.faq = [...form.querySelectorAll('[data-block="faq"]')].map((row) => ({
        cat: row.querySelector("[name=cat]")?.value || "general",
        q: row.querySelector("[name=q]")?.value || "",
        qEn: row.querySelector("[name=qEn]")?.value || "",
        a: row.querySelector("[name=a]")?.value || "",
        aEn: row.querySelector("[name=aEn]")?.value || ""
      }));
    } else {
      const cols = { sections: ["title", "titleEn", "body", "bodyEn"], steps: ["title", "titleEn", "body", "bodyEn"], items: ["icon", "title", "titleEn", "body", "bodyEn"], tips: ["fa", "en"], stats: ["fa", "en", "key"] }[block] || [];
      patch[block] = [...form.querySelectorAll(`[data-block="${block}"]`)].map((row) => {
        const o = {};
        for (const c of cols) o[c] = row.querySelector(`[name="${c}"]`)?.value ?? "";
        if (block === "sections") {
          if (row.dataset.objlist === "1") {
            o.list = [...row.querySelectorAll("[data-lir]")].map((li) => ({
              icon: li.querySelector("[name=icon]")?.value || "check",
              fa: li.querySelector("[name=fa]")?.value || "",
              en: li.querySelector("[name=en]")?.value || ""
            }));
          } else {
            const li = row.querySelector("[name=list]");
            if (li) o.list = li.value.split("\n").map((x) => x.trim()).filter(Boolean);
            const liEn = row.querySelector("[name=listEn]");
            if (liEn) o.listEn = liEn.value.split("\n").map((x) => x.trim()).filter(Boolean);
          }
        }
        return o;
      });
    }
  }
  return patch;
}
function mount26(root) {
  applyDyn(root);
  return null;
}
var L8, PAGES, DATA, emptySection, moveBtns, delBtn;
var init_pages = __esm({
  "public/js/views/admin/pages.mjs"() {
    init_dom();
    init_i18n();
    init_api();
    init_components();
    init_ui();
    init_actions();
    init_router();
    L8 = (fa3, en2) => isFa2() ? fa3 : en2;
    PAGES = [
      { key: "about", icon: "store", blocks: ["hero", "sections", "stats"] },
      { key: "guide", icon: "info", blocks: ["hero", "steps", "tips"] },
      { key: "service", icon: "headset", blocks: ["hero", "items"] },
      { key: "faq", icon: "help", blocks: ["faq"] },
      { key: "terms", icon: "file", blocks: ["hero", "intro", "notice", "sections"] },
      { key: "privacy", icon: "shield", blocks: ["hero", "intro", "sections"] },
      { key: "insurance", icon: "package-check", blocks: ["hero", "body", "rules"] },
      { key: "ticketRules", icon: "ticket", blocks: ["hero", "rules"] },
      { key: "bugReport", icon: "bug", blocks: ["hero", "body", "hints"] },
      { key: "contact", icon: "phone", blocks: ["hero"] }
    ];
    DATA = {};
    emptySection = () => ({ title: "", titleEn: "", body: "", bodyEn: "", list: [], listEn: [] });
    moveBtns = () => html`
  <button type="button" class="btn btn-ghost btn-icon btn-xs" data-act="adm-pg-up" aria-label="up">${icon("arrow-up")}</button>
  <button type="button" class="btn btn-ghost btn-icon btn-xs" data-act="adm-pg-down" aria-label="down">${icon("chevron-down")}</button>`;
    delBtn = () => html`<button type="button" class="btn btn-ghost btn-icon btn-xs" data-act="adm-pg-del" aria-label="delete">${icon("trash")}</button>`;
    act("adm-pg-save", async (e, form) => {
      e.preventDefault();
      const key = form.dataset.key;
      const p = PAGES.find((x) => x.key === key);
      const value = collect2(form, p);
      await withBusy(form.querySelector("button[type=submit]"), async () => {
        try {
          await api.patch(`/api/admin/pages/${key}`, { value });
          toastSuccess(t("misc.saved"));
          refresh(true);
        } catch (err) {
          toastApiError(err);
        }
      });
    });
    act("adm-pg-add", (e, el2) => {
      const kind = el2.dataset.kind;
      const form = el2.closest("form");
      const tpl = form.querySelector(`[data-tpl="${kind}"]`);
      const box = form.querySelector(`[data-blocks="${kind}"]`);
      if (!tpl || !box) return;
      const wrap = document.createElement("div");
      wrap.innerHTML = tpl.innerHTML.trim();
      const node = wrap.firstElementChild;
      if (!node) return;
      node.querySelectorAll("input, textarea").forEach((i) => {
        i.value = "";
      });
      const n = box.children.length + 1;
      const label = node.querySelector(".row strong");
      if (label) label.textContent = `${kind === "faq" ? isFa2() ? "\u0633\u0624\u0627\u0644" : "Q" : isFa2() ? "\u0645\u0648\u0631\u062F" : "Item"} ${n}`;
      box.appendChild(node);
      node.scrollIntoView({ behavior: "smooth", block: "center" });
    });
    act("adm-pg-del", (e, el2) => {
      el2.closest("[data-block]")?.remove();
    });
    act("adm-pg-up", (e, el2) => {
      const node = el2.closest("[data-block]");
      if (node?.previousElementSibling) node.parentNode.insertBefore(node, node.previousElementSibling);
    });
    act("adm-pg-down", (e, el2) => {
      const node = el2.closest("[data-block]");
      if (node?.nextElementSibling) node.parentNode.insertBefore(node.nextElementSibling, node);
    });
    act("adm-pg-li-add", (e, el2) => {
      const box = el2.closest(".span-2");
      const list5 = box.querySelector("[data-li]");
      const tpl = box.querySelector("[data-li-tpl]");
      if (!list5 || !tpl) return;
      const wrap = document.createElement("div");
      wrap.innerHTML = tpl.innerHTML.trim();
      if (wrap.firstElementChild) list5.appendChild(wrap.firstElementChild);
    });
    act("adm-pg-list-toggle", (e, el2) => {
      const box = el2.closest(".span-2")?.querySelector("[data-listbox]");
      if (box) box.hidden = !box.hidden;
    });
    act("adm-pg-lidel", (e, el2) => {
      el2.closest("[data-lir]")?.remove();
    });
  }
});

// public/js/views/admin/devices.mjs
var devices_exports = {};
__export(devices_exports, {
  mount: () => mount27,
  render: () => render29
});
async function render29(ctx) {
  if (ctx.params.section === "imageSearch") return imageSearch();
  return barcode();
}
async function barcode() {
  try {
    const r = await api.get(api.url("/api/admin/barcode", { q: F7.q }));
    ITEMS2 = r.items || [];
    SIZES = r.labelSizes || [];
    if (!SIZES.find((s) => s.id === F7.size) && SIZES.length) F7.size = SIZES[0].id;
  } catch (err) {
    return errorState({ title: err?.message || t("err.generic") });
  }
  const noBarcode = ITEMS2.filter((p) => !p.barcode).length;
  return html`
    <div class="row row-between row-wrap mb">
      <div>
        <h2 class="section-title">${icon("barcode")} ${t("adm.barcode")}</h2>
        <p class="muted small">${fmtNum(ITEMS2.length)} ${L9("\u06A9\u0627\u0644\u0627", "products")} · ${fmtNum(noBarcode)} ${L9("\u0628\u062F\u0648\u0646 \u0628\u0627\u0631\u06A9\u062F", "without barcode")}</p>
      </div>
      <a class="btn btn-outline btn-sm" href="#/price-check" target="_blank" rel="noopener">${icon("scan")} ${t("adm.bPriceMode")}</a>
    </div>

    <div class="dev-grid">
      <div class="card">
        <strong>${icon("printer")} ${t("adm.bPrinter")}</strong>
        <p class="muted small mt-s">${t("adm.bPrinterHint")}</p>
        <ol class="dev-steps">
          <li>${L9("\u0686\u0627\u067E\u06AF\u0631 \u0628\u0631\u0686\u0633\u0628 \u0631\u0627 \u0628\u0647 \u062F\u0633\u062A\u06AF\u0627\u0647 \u0648\u0635\u0644 \u06A9\u0646 (USB/\u0634\u0628\u06A9\u0647).", "Connect the label printer (USB/network).")}</li>
          <li>${L9("\u062F\u0631 \u062A\u0646\u0638\u06CC\u0645\u0627\u062A \u0686\u0627\u067E \u0633\u06CC\u0633\u062A\u0645\u060C \u0627\u0646\u062F\u0627\u0632\u0647\u0654 \u06A9\u0627\u063A\u0630 \u0631\u0627 \u0647\u0645\u200C\u0627\u0646\u062F\u0627\u0632\u0647\u0654 \u0628\u0631\u0686\u0633\u0628 \u0628\u06AF\u0630\u0627\u0631.", "Set the system paper size to your label size.")}</li>
          <li>${L9("\u06A9\u0627\u0644\u0627\u0647\u0627 \u0631\u0627 \u0627\u0646\u062A\u062E\u0627\u0628 \u0648 \xAB\u067E\u06CC\u0634\u200C\u0646\u0645\u0627\u06CC\u0634 \u0648 \u0686\u0627\u067E\xBB \u0631\u0627 \u0628\u0632\u0646.", "Pick products and press \u201CPreview & print\u201D.")}</li>
        </ol>
        <div class="row row-wrap mt-s">
          <button class="btn btn-ghost btn-sm" data-act="adm-bc-testprint">${icon("printer")} ${L9("\u0686\u0627\u067E \u0622\u0632\u0645\u0627\u06CC\u0634\u06CC", "Test print")}</button>
        </div>
      </div>

      <div class="card">
        <strong>${icon("scan")} ${t("adm.bScanner")}</strong>
        <p class="muted small mt-s">${t("adm.bScanHint")}</p>
        <form class="row mt-s" data-act="adm-bc-scan">
          <input class="input grow mono" name="code" placeholder="${L9("\u0628\u0627\u0631\u06A9\u062F \u0631\u0627 \u0627\u0633\u06A9\u0646 \u06A9\u0646\u2026", "Scan a barcode\u2026")}" autocomplete="off" data-autofocus>
          <button class="btn btn-primary" type="submit">${icon("search")}</button>
        </form>
        <div class="scan-result mt-s" data-scan-result>
          <p class="muted small">${L9("\u062F\u0648\u0631\u0628\u06CC\u0646 \u062A\u0644\u0641\u0646 \u0647\u0645 \u06A9\u0627\u0631 \u0645\u06CC\u200C\u06A9\u0646\u062F: \u0627\u0632 \u062D\u0627\u0644\u062A \u0646\u0645\u0627\u06CC\u0634 \u0642\u06CC\u0645\u062A \u0627\u0633\u062A\u0641\u0627\u062F\u0647 \u06A9\u0646.", "Phone camera works too \u2014 use the price-display mode.")}</p>
        </div>
        <p class="tiny muted mt-s">${detectorNote()}</p>
      </div>
    </div>

    <div class="card mt">
      <div class="row row-between row-wrap mb-s">
        <strong>${icon("printer")} ${t("adm.bLabels")}</strong>
        <form class="row row-wrap" data-act="adm-bc-search">
          <input class="input" name="q" value="${esc(F7.q)}" placeholder="${t("adm.pName")} / SKU / ${t("pdp.barcode")}">
          <button class="btn btn-ghost btn-sm" type="submit">${icon("search")}</button>
        </form>
      </div>

      <div class="row row-wrap mb-s">
        <select class="select select-sm" data-size>
          ${SIZES.map((s) => html`<option value="${s.id}" ${F7.size === s.id ? "selected" : ""}>${esc(isFa2() ? s.fa : `${s.w}\xD7${s.h} mm`)}</option>`)}
        </select>
        <label class="row tiny">${L9("\u062A\u0639\u062F\u0627\u062F \u0628\u0631\u0686\u0633\u0628 \u0647\u0631 \u06A9\u0627\u0644\u0627", "Copies per product")}
          <input class="input copies-in" type="number" min="1" max="20" value="${fmtNum(F7.copies)}" data-copies>
        </label>
        <button class="btn btn-ghost btn-sm" data-act="adm-bc-all">${icon("check")} ${L9("\u0627\u0646\u062A\u062E\u0627\u0628 \u0647\u0645\u0647", "Select all")}</button>
        <button class="btn btn-ghost btn-sm" data-act="adm-bc-none">${icon("close")} ${L9("\u067E\u0627\u06A9 \u06A9\u0631\u062F\u0646", "Clear")}</button>
        <button class="btn btn-ghost btn-sm" data-act="adm-bc-nocode">${icon("barcode")} ${L9("\u0628\u062F\u0648\u0646 \u0628\u0627\u0631\u06A9\u062F", "Without barcode")}</button>
        <span class="badge-pill bp-accent" data-selcount>${fmtNum(SEL.size)}</span>
      </div>

      ${tableHtml(
    [
      { label: "" },
      { label: t("common.product") },
      { label: t("pdp.barcode") },
      { label: t("common.price"), cls: "num" },
      { label: t("common.stock"), cls: "num" },
      { label: "", cls: "num" }
    ],
    ITEMS2.slice(0, 100).map((p) => html`
          <tr>
            <td><label class="check"><input type="checkbox" data-pick="${p.id}" ${SEL.has(p.id) ? "checked" : ""}><span class="box">${icon("check")}</span></label></td>
            <td><span class="b">${esc(p.name)}</span><div class="tiny muted mono">${esc(p.sku || "")}</div></td>
            <td class="mono tiny">${p.barcode ? esc(p.barcode) : html`<span class="badge-pill bp-warn">${L9("\u0646\u062F\u0627\u0631\u062F", "none")}</span>`}</td>
            <td class="num">${fmtMoney(p.price)}</td>
            <td class="num">${fmtNum(p.stock)}</td>
            <td>${!p.barcode ? html`<button class="btn btn-ghost btn-xs" data-act="adm-bc-gen" data-id="${p.id}">${icon("barcode")} ${t("adm.bGenerate")}</button>` : ""}</td>
          </tr>`),
    { emptyText: t("common.noResult") }
  )}
    </div>

    <div class="card mt no-print">
      <div class="row row-between row-wrap">
        <strong>${icon("eye")} ${t("adm.bPreview")}</strong>
        <div class="row row-wrap">
          <button class="btn btn-outline btn-sm" data-act="adm-bc-build">${icon("refresh")} ${L9("\u0633\u0627\u062E\u062A \u067E\u06CC\u0634\u200C\u0646\u0645\u0627\u06CC\u0634", "Build preview")}</button>
          <button class="btn btn-primary btn-sm" data-act="adm-bc-print">${icon("printer")} ${t("common.print")}</button>
        </div>
      </div>
      <div class="print-grid mt" data-print-area data-labels></div>
      <p class="hint mt-s">${L9("\u0627\u0646\u062F\u0627\u0632\u0647\u0654 \u0628\u0631\u0686\u0633\u0628 \u062F\u0631 \u0686\u0627\u067E \u0627\u0632 \u0645\u062A\u063A\u06CC\u0631 \u0635\u0641\u062D\u0647 \u062A\u0646\u0638\u06CC\u0645 \u0645\u06CC\u200C\u0634\u0648\u062F\u061B \u0627\u06AF\u0631 \u0628\u0631\u0686\u0633\u0628\u200C\u0647\u0627 \u062C\u0627\u0628\u0647\u200C\u062C\u0627 \u0686\u0627\u067E \u0634\u062F\u0646\u062F\u060C \u062D\u0627\u0634\u06CC\u0647\u0654 \u0686\u0627\u067E \u0631\u0627 \u062F\u0631 \u06AF\u0641\u062A\u200C\u0648\u06AF\u0648\u06CC \u0686\u0627\u067E \u0635\u0641\u0631 \u06A9\u0646.", "If labels shift when printing, set the print margins to zero in the print dialog.")}</p>
    </div>`;
}
function detectorNote() {
  return "BarcodeDetector" in window ? html`${icon("check")} ${L9("\u0627\u0633\u06A9\u0646 \u0628\u0627 \u062F\u0648\u0631\u0628\u06CC\u0646 \u067E\u0634\u062A\u06CC\u0628\u0627\u0646\u06CC \u0645\u06CC\u200C\u0634\u0648\u062F", "Camera scanning supported")}` : html`${icon("info")} ${L9("\u0627\u0633\u06A9\u0646 \u0628\u0627 \u062F\u0648\u0631\u0628\u06CC\u0646 \u062F\u0631 \u0627\u06CC\u0646 \u0645\u0631\u0648\u0631\u06AF\u0631 \u067E\u0634\u062A\u06CC\u0628\u0627\u0646\u06CC \u0646\u0645\u06CC\u200C\u0634\u0648\u062F\u061B \u0627\u0632 \u0628\u0627\u0631\u06A9\u062F\u062E\u0648\u0627\u0646 \u0633\u062E\u062A\u200C\u0627\u0641\u0632\u0627\u0631\u06CC \u0627\u0633\u062A\u0641\u0627\u062F\u0647 \u06A9\u0646.", "Camera scanning unsupported in this browser; use a hardware scanner.")}`;
}
async function loadBarcodeLib() {
  if (window.JsBarcode) return window.JsBarcode;
  await new Promise((resolve, reject) => {
    const s = document.createElement("script");
    s.src = "/js/vendor/jsbarcode.all.min.js";
    s.onload = resolve;
    s.onerror = reject;
    document.head.appendChild(s);
  });
  return window.JsBarcode;
}
function labelHtml(p, size) {
  const s = SIZES.find((x) => x.id === size) || { w: 40, h: 25 };
  const fmt = /^\d{13}$/.test(p.barcode || "") ? "EAN13" : "CODE128";
  return html`
    <div class="label-preview" data-lw="${s.w}" data-lh="${s.h}">
      <span class="ln">${esc(p.name.slice(0, 40))}</span>
      ${p.barcode ? html`<svg data-bc="${esc(p.barcode)}" data-fmt="${fmt}"></svg>` : html`<span class="ln tiny">${L9("\u0628\u062F\u0648\u0646 \u0628\u0627\u0631\u06A9\u062F", "no barcode")}</span>`}
      <span class="row row-between w100">
        <span class="ln mono tiny">${esc(p.barcode || p.sku || "")}</span>
        <span class="lp">${fmtNum(p.price)}</span>
      </span>
    </div>`;
}
async function buildLabels(root) {
  const box = root.querySelector("[data-labels]");
  if (!box) return 0;
  const chosen = ITEMS2.filter((p) => SEL.has(p.id));
  if (!chosen.length) {
    box.innerHTML = "";
    return 0;
  }
  const copies = Math.max(1, Number(root.querySelector("[data-copies]")?.value || 1));
  const size = root.querySelector("[data-size]")?.value || F7.size;
  const sz = SIZES.find((x) => x.id === size) || { w: 40, h: 25 };
  let htmlOut = "";
  for (const p of chosen) for (let i = 0; i < copies; i++) htmlOut += labelHtml(p, size);
  box.innerHTML = htmlOut;
  box.style.setProperty("--lw", `${sz.w}mm`);
  box.style.setProperty("--lh", `${sz.h}mm`);
  try {
    const JsBarcode = await loadBarcodeLib();
    box.querySelectorAll("svg[data-bc]").forEach((svg) => {
      try {
        JsBarcode(svg, svg.dataset.bc, {
          format: svg.dataset.fmt || "CODE128",
          displayValue: false,
          height: Math.max(18, sz.h - 14),
          width: 1.3,
          margin: 0,
          background: "#ffffff",
          lineColor: "#000000"
        });
      } catch {
        svg.remove();
      }
    });
  } catch {
    toastError2(L9("\u06A9\u062A\u0627\u0628\u062E\u0627\u0646\u0647\u0654 \u0628\u0627\u0631\u06A9\u062F \u0628\u0627\u0631\u06AF\u0630\u0627\u0631\u06CC \u0646\u0634\u062F\u061B \u0628\u0631\u0686\u0633\u0628\u200C\u0647\u0627 \u0628\u062F\u0648\u0646 \u0628\u0627\u0631\u06A9\u062F \u0686\u0627\u067E \u0645\u06CC\u200C\u0634\u0648\u0646\u062F.", "Barcode library failed to load; labels print without barcodes."));
  }
  return chosen.length * copies;
}
function syncSel() {
  document.querySelectorAll("[data-pick]").forEach((c) => {
    c.checked = SEL.has(c.dataset.pick);
  });
  const n = document.querySelector("[data-selcount]");
  if (n) n.textContent = fmtNum(SEL.size);
}
async function imageSearch() {
  let r = null;
  try {
    r = await api.get("/api/admin/image-index");
  } catch (err) {
    return errorState({ title: err?.message || t("err.generic") });
  }
  const products = r.products || [];
  const missing2 = products.filter((p) => !p.indexed);
  return html`
    <div class="row row-between row-wrap mb">
      <div>
        <h2 class="section-title">${icon("camera")} ${t("adm.imageSearch")}</h2>
        <p class="muted small">${fmtNum(r.indexed || 0)} / ${fmtNum(products.length)} ${L9("\u0627\u06CC\u0646\u062F\u06A9\u0633 \u0634\u062F\u0647", "indexed")}</p>
      </div>
      <button class="btn btn-primary btn-sm" data-act="adm-ix-run" data-count="${missing2.length}">
        ${icon("refresh")} ${missing2.length ? `${t("adm.ixIndex")} (${fmtNum(missing2.length)})` : t("adm.ixReindex")}
      </button>
    </div>

    <p class="notice notice-info mb">${icon("info")}<span>${t("adm.ixHint")}</span></p>
    <div class="mt-s" data-ix-progress hidden>
      <div class="progress"><i data-ix-bar data-w="0%"></i></div>
      <p class="tiny muted mt-s" data-ix-status></p>
    </div>

    ${products.length ? html`
      <div class="ix-grid">
        ${products.slice(0, 240).map((p) => html`
          <div class="ix-item ${p.indexed ? "on" : ""}" data-pid="${p.id}">
            ${p.image ? html`<img src="${esc(p.image)}" alt="" loading="lazy" data-h="54px" data-w="54px">` : html`<span class="ix-ph">${icon("image")}</span>`}
            <span class="grow tiny">${esc(p.name.slice(0, 46))}</span>
            ${p.indexed ? html`<span class="badge-pill bp-success tiny">${icon("check")}</span>` : html`<span class="badge-pill bp-muted tiny">${t("common.no")}</span>`}
          </div>`).join("")}
      </div>` : emptyState({ icon: "image", title: t("common.noData") })}`;
}
function mount27(root, ctx) {
  applyDyn(root);
  root.querySelectorAll("[data-pick]").forEach((c) => {
    c.addEventListener("change", () => {
      if (c.checked) SEL.add(c.dataset.pick);
      else SEL.delete(c.dataset.pick);
      const n = root.querySelector("[data-selcount]");
      if (n) n.textContent = fmtNum(SEL.size);
    });
  });
  root.querySelector("[data-size]")?.addEventListener("change", (e) => {
    F7.size = e.target.value;
  });
  root.querySelector("[data-copies]")?.addEventListener("change", (e) => {
    F7.copies = Math.max(1, Number(e.target.value) || 1);
  });
  return null;
}
var L9, ITEMS2, SIZES, SEL, F7;
var init_devices = __esm({
  "public/js/views/admin/devices.mjs"() {
    init_dom();
    init_i18n();
    init_api();
    init_components();
    init_ui();
    init_actions();
    init_router();
    init_vision();
    L9 = (fa3, en2) => isFa2() ? fa3 : en2;
    ITEMS2 = [];
    SIZES = [];
    SEL = /* @__PURE__ */ new Set();
    F7 = { q: "", size: "40x25", copies: 1 };
    act("adm-bc-search", (e, form) => {
      e.preventDefault();
      F7.q = String(new FormData(form).get("q") || "").trim();
      refresh(true);
    });
    act("adm-bc-all", () => {
      ITEMS2.slice(0, 100).forEach((p) => SEL.add(p.id));
      syncSel();
    });
    act("adm-bc-none", () => {
      SEL.clear();
      syncSel();
    });
    act("adm-bc-nocode", () => {
      SEL = new Set(ITEMS2.filter((p) => !p.barcode).map((p) => p.id));
      syncSel();
    });
    act("adm-bc-gen", async (e, el2) => {
      try {
        const r = await api.post("/api/admin/barcode/generate", { productId: el2.dataset.id, count: 1 });
        const code = r.codes?.[0]?.barcode || r.codes?.[0] || "";
        if (code) {
          toastSuccess(`${t("adm.bGenerate")}: ${code}`);
          refresh(true);
        }
      } catch (err) {
        toastApiError(err);
      }
    });
    act("adm-bc-build", async (e, el2) => {
      const root = el2.closest("[data-admbody]") || document;
      const n = await buildLabels(root);
      if (!n) toastError2(t("adm.bPickFirst"));
      else toastSuccess(`${fmtNum(n)} ${L9("\u0628\u0631\u0686\u0633\u0628 \u0622\u0645\u0627\u062F\u0647 \u0634\u062F", "labels ready")}`);
    });
    act("adm-bc-print", async (e, el2) => {
      const root = el2.closest("[data-admbody]") || document;
      const n = await buildLabels(root);
      if (!n) {
        toastError2(t("adm.bPickFirst"));
        return;
      }
      document.body.classList.add("printing-labels");
      const done = () => document.body.classList.remove("printing-labels");
      window.addEventListener("afterprint", done, { once: true });
      setTimeout(() => {
        window.print();
        setTimeout(done, 1200);
      }, 120);
    });
    act("adm-bc-testprint", async (e, el2) => {
      const root = el2.closest("[data-admbody]") || document;
      const box = root.querySelector("[data-labels]");
      if (!box) return;
      SEL = new Set([ITEMS2[0]?.id].filter(Boolean));
      syncSel();
      await buildLabels(root);
      document.body.classList.add("printing-labels");
      const done = () => document.body.classList.remove("printing-labels");
      window.addEventListener("afterprint", done, { once: true });
      setTimeout(() => {
        window.print();
        setTimeout(done, 1200);
      }, 120);
    });
    act("adm-bc-scan", async (e, form) => {
      e.preventDefault();
      const code = String(new FormData(form).get("code") || "").trim();
      const box = form.closest(".card").querySelector("[data-scan-result]");
      if (!code) return;
      try {
        const r = await api.post("/api/admin/barcode/scan-log", { code });
        const p = r.product;
        box.innerHTML = html`
      <div class="row row-between">
        <div>
          <strong>${esc(p.name)}</strong>
          <div class="tiny muted mono">${esc(p.sku || "")} · ${esc(p.barcode || "")}</div>
        </div>
        <div class="t-end">
          <div class="price-now">${fmtMoney(p.price)}</div>
          <div class="tiny muted">${t("common.stock")}: ${fmtNum(p.stock)}</div>
        </div>
      </div>
      <div class="row row-wrap mt-s">
        <a class="btn btn-ghost btn-xs" href="#/admin/products/${p.id}">${icon("edit")} ${t("common.edit")}</a>
        <a class="btn btn-ghost btn-xs" href="#/product/${p.id}" target="_blank" rel="noopener">${icon("external")} ${t("adm.view")}</a>
      </div>`;
        toastSuccess(t("adm.bFound"));
      } catch (err) {
        box.innerHTML = html`<p class="muted small">${icon("alert")} ${esc(err?.message || t("adm.bNotFound"))}</p>`;
        if (err?.status !== 404) toastApiError(err);
      } finally {
        form.querySelector("[name=code]").value = "";
        form.querySelector("[name=code]").focus();
      }
    });
    act("adm-ix-run", async (e, el2) => {
      const onlyMissing = Number(el2.dataset.count || 0) > 0;
      const wrap = document.querySelector("[data-ix-progress]");
      const bar = document.querySelector("[data-ix-bar]");
      const status = document.querySelector("[data-ix-status]");
      const items = [...document.querySelectorAll(".ix-item")];
      if (!items.length) return;
      const targets = onlyMissing ? items.filter((x) => !x.classList.contains("on")) : items;
      if (!targets.length) {
        toastSuccess(t("adm.ixDone"));
        return;
      }
      el2.disabled = true;
      if (wrap) wrap.hidden = false;
      let done = 0;
      let ok = 0;
      const batch = [];
      const flush = async () => {
        if (!batch.length) return;
        try {
          const r = await api.post("/api/admin/image-index", { entries: batch.splice(0, batch.length) });
          ok += r.indexed || 0;
        } catch (err) {
          toastApiError(err);
        }
      };
      for (const node of targets) {
        const img = node.querySelector("img");
        if (img?.src) {
          try {
            const src = img.src.startsWith("http") && !img.src.startsWith(location.origin) ? api.url("/api/admin/image-thumb", { url: img.src }) : img.src;
            const fp = await fingerprints(src);
            const id = node.dataset.pid;
            if (id) batch.push({ productId: id, dhash: fp.dhash, hist: fp.hist });
          } catch {
          }
        }
        done++;
        if (bar) bar.style.width = `${Math.round(done / targets.length * 100)}%`;
        if (status) status.textContent = `${fmtNum(done)} / ${fmtNum(targets.length)}`;
        if (batch.length >= 40) await flush();
      }
      await flush();
      el2.disabled = false;
      toastSuccess(`${t("adm.ixDone")} \u2014 ${fmtNum(ok)}`);
      refresh(true);
    });
  }
});

// public/js/views/admin/index.mjs
var admin_exports = {};
__export(admin_exports, {
  allowedSections: () => allowedSections,
  mount: () => mount28,
  render: () => render30,
  title: () => title13
});
async function render30(ctx) {
  const sec = ctx.params.section || "";
  const entry = findEntry(sec);
  const nav = allowedSections();
  let content = "";
  if (!entry) {
    content = notice("warn", sec ? t("adm.noPermission") : t("err.forbidden")) + html`<div class="card mt"><strong>${t("adm.title")}</strong><p class="muted small mt-s">${t("adm.noPermission")}</p></div>`;
  } else {
    try {
      const mod = await entry.mod();
      content = await mod.render({ ...ctx, params: { ...ctx.params, section: entry.id }, admNav: nav });
    } catch (err) {
      console.error("[admin] section render failed", err);
      content = notice("danger", `${t("err.generic")} (${esc(err?.message || "")})`);
    }
  }
  const groups = [...new Set(nav.map((s) => s.grp))];
  return html`
    <div class="row row-between row-wrap mb">
      <div class="row">
        <h1 class="section-title">${icon("settings")} ${t("adm.title")}</h1>
        <span class="badge-pill bp-accent">${esc(S.me?.role === "owner" ? isFa2() ? "\u0645\u0627\u0644\u06A9" : "Owner" : isFa2() ? "\u06A9\u0627\u0631\u0645\u0646\u062F" : "Staff")}</span>
      </div>
      <div class="row row-wrap">
        ${can("settings.edit") ? html`
          <button class="btn btn-sm ${S.sleeping ? "btn-success" : "btn-ghost"}" data-act="adm-sleep-toggle" title="${S.sleeping ? t("sys.turnOn") : t("sys.turnOff")}">
            ${icon(S.sleeping ? "zap" : "moon")} ${S.sleeping ? t("sys.turnOn") : t("sys.turnOff")}
          </button>` : ""}
        <a class="btn btn-ghost btn-sm" href="#/">${icon("arrow-right")} ${t("adm.backToSite")}</a>
      </div>
    </div>
    ${S.sleeping ? notice("warn", t("sys.sleepBanner")) : ""}
    <div class="adm-grid">
      <aside class="adm-side">
        ${groups.map((g) => html`
          <div class="grp">${esc(isFa2() ? GROUPS[g] : GROUPS_EN[g])}</div>
          ${nav.filter((s) => s.grp === g).map((s) => html`
            <a href="#/admin${s.id ? `/${s.id}` : ""}" class="${s.id === sec || !sec && !s.id ? "active" : ""}">
              ${icon(s.icon)} <span>${s.label()}</span>
              ${s.count ? html`<span class="cnt">${fmtNum(s.count)}</span>` : ""}
            </a>`)}
        `).join("")}
      </aside>
      <div data-admbody>${content}</div>
    </div>`;
}
async function mount28(root, ctx) {
  applyDyn(root);
  const sec = ctx.params.section || "";
  const entry = findEntry(sec);
  if (!entry) return null;
  try {
    const mod = await entry.mod();
    if (typeof mod.mount === "function") return mod.mount(root.querySelector("[data-admbody]") || root, ctx);
  } catch (err) {
    console.error("[admin] section mount failed", err);
  }
  return null;
}
var SECTIONS2, GROUPS, GROUPS_EN, allowedSections, findEntry, title13;
var init_admin = __esm({
  "public/js/views/admin/index.mjs"() {
    init_dom();
    init_i18n();
    init_state();
    init_ui();
    init_api();
    init_actions();
    init_router();
    SECTIONS2 = [
      { grp: "shop", id: "", perm: "dashboard.view", icon: "chart", label: () => t("adm.dashboard"), mod: () => Promise.resolve().then(() => (init_dashboard(), dashboard_exports)) },
      { grp: "shop", id: "products", perm: "products.view", icon: "box", label: () => t("adm.products"), mod: () => Promise.resolve().then(() => (init_products(), products_exports)) },
      { grp: "shop", id: "categories", perm: "categories.manage", icon: "layers", label: () => t("adm.categories"), mod: () => Promise.resolve().then(() => (init_catalog2(), catalog_exports2)) },
      { grp: "shop", id: "orders", perm: "orders.view", icon: "package-check", label: () => t("adm.orders"), mod: () => Promise.resolve().then(() => (init_orders(), orders_exports)) },
      { grp: "people", id: "reviews", perm: "reviews.moderate", icon: "star", label: () => t("adm.reviews"), mod: () => Promise.resolve().then(() => (init_reviews(), reviews_exports)) },
      { grp: "people", id: "tickets", perm: "tickets.manage", icon: "ticket", label: () => t("adm.tickets"), mod: () => Promise.resolve().then(() => (init_tickets(), tickets_exports)), feat: "tickets" },
      { grp: "people", id: "support", perm: "tickets.manage", icon: "headset", label: () => t("adm.supportChat"), mod: () => Promise.resolve().then(() => (init_tickets(), tickets_exports)), feat: "liveSupport" },
      { grp: "people", id: "feedback", perm: "feedback.manage", icon: "flag", label: () => t("adm.feedback"), mod: () => Promise.resolve().then(() => (init_feedback(), feedback_exports)) },
      { grp: "people", id: "users", perm: "users.view", icon: "users", label: () => t("adm.users"), mod: () => Promise.resolve().then(() => (init_users(), users_exports)) },
      { grp: "people", id: "visitors", perm: "users.view", icon: "eye", label: () => t("adm.visitors"), mod: () => Promise.resolve().then(() => (init_insights(), insights_exports)) },
      { grp: "growth", id: "coupons", perm: "coupons.manage", icon: "percent", label: () => t("adm.coupons"), mod: () => Promise.resolve().then(() => (init_marketing(), marketing_exports)), feat: "coupons" },
      { grp: "growth", id: "settings/partners", perm: "settings.edit", icon: "store", label: () => t("adm.sPartners"), mod: () => Promise.resolve().then(() => (init_settings(), settings_exports)), feat: "partners" },
      { grp: "growth", id: "ads", perm: "ads.manage", icon: "tag", label: () => t("adm.ads"), mod: () => Promise.resolve().then(() => (init_marketing(), marketing_exports)), feat: "ads" },
      { grp: "growth", id: "notifications", perm: "notifications.send", icon: "bell", label: () => t("adm.notifications"), mod: () => Promise.resolve().then(() => (init_marketing(), marketing_exports)), feat: "announcements" },
      { grp: "growth", id: "lottery", perm: "settings.edit", icon: "gift2", label: () => t("adm.lottery"), mod: () => Promise.resolve().then(() => (init_marketing(), marketing_exports)), feat: "lottery" },
      { grp: "system", id: "telegram", perm: "settings.edit", icon: "send", label: () => t("adm.telegram"), mod: () => Promise.resolve().then(() => (init_marketing(), marketing_exports)) },
      { grp: "system", id: "settings", perm: "settings.edit", icon: "settings", label: () => t("adm.settings"), mod: () => Promise.resolve().then(() => (init_settings(), settings_exports)) },
      { grp: "system", id: "theme", perm: "theme.edit", icon: "sun", label: () => t("adm.theme"), mod: () => Promise.resolve().then(() => (init_settings(), settings_exports)) },
      { grp: "system", id: "features", perm: "settings.edit", icon: "zap", label: () => t("adm.features"), mod: () => Promise.resolve().then(() => (init_settings(), settings_exports)) },
      { grp: "system", id: "pages", perm: "pages.edit", icon: "file", label: () => t("adm.pages"), mod: () => Promise.resolve().then(() => (init_pages(), pages_exports)) },
      { grp: "system", id: "barcode", perm: "barcode.print", icon: "barcode", label: () => t("adm.barcode"), mod: () => Promise.resolve().then(() => (init_devices(), devices_exports)), feat: "barcode" },
      { grp: "system", id: "imageSearch", perm: "imagesearch.index", icon: "camera", label: () => t("adm.imageSearch"), mod: () => Promise.resolve().then(() => (init_devices(), devices_exports)), feat: "imageSearch" },
      { grp: "system", id: "audit", perm: "audit.view", icon: "history", label: () => t("adm.audit"), mod: () => Promise.resolve().then(() => (init_insights(), insights_exports)) },
      { grp: "system", id: "stats", perm: "stats.view", icon: "chart", label: () => t("adm.stats"), mod: () => Promise.resolve().then(() => (init_insights(), insights_exports)) },
      { grp: "system", id: "data", perm: "data.export", icon: "download", label: () => t("adm.export"), mod: () => Promise.resolve().then(() => (init_insights(), insights_exports)) }
    ];
    GROUPS = { shop: "\u0641\u0631\u0648\u0634\u06AF\u0627\u0647", people: "\u0645\u0634\u062A\u0631\u06CC\u200C\u0647\u0627", growth: "\u0631\u0634\u062F \u0648 \u062A\u0628\u0644\u06CC\u063A\u0627\u062A", system: "\u0633\u0627\u0645\u0627\u0646\u0647" };
    GROUPS_EN = { shop: "Store", people: "Customers", growth: "Growth & ads", system: "System" };
    allowedSections = () => SECTIONS2.filter((s) => (!s.perm || can(s.perm)) && (!s.feat || feat(s.feat)));
    findEntry = (sec) => allowedSections().find((s) => s.id === sec) || null;
    title13 = () => t("adm.title");
    act("adm-sleep-toggle", async (e, el2) => {
      const turnOff = !S.sleeping;
      let minutes = 0;
      if (turnOff) {
        const answer = await promptDialog({
          title: t("sys.turnOff"),
          text: t("sys.offConfirm"),
          label: t("sys.autoWakeMins"),
          value: "0",
          type: "number"
        });
        if (answer === null) return;
        minutes = Math.max(0, Number(answer) || 0);
      }
      await withBusy(el2, async () => {
        try {
          await api.post(turnOff ? "/api/system/sleep" : "/api/system/wake", turnOff ? { minutes } : {});
          await refreshBootstrap({ silent: true });
          document.dispatchEvent(new CustomEvent("sleep:changed"));
          toastSuccess(turnOff ? minutes ? t("sys.asleepTimed", { n: minutes }) : t("sys.asleep") : t("sys.awake"));
          refresh(true);
        } catch (err) {
          toastApiError(err);
        }
      });
    });
  }
});

// public/js/views/not-found.mjs
var not_found_exports = {};
__export(not_found_exports, {
  mount: () => mount29,
  render: () => render31
});
async function render31() {
  const path = decodeURIComponent((location.hash || "#/").slice(1));
  return html`
    <div class="center col mt-l nf-wrap">
      <div class="nf-code">۴۰۴</div>
      ${emptyState({
    icon: "search",
    title: t("err.notFound"),
    text: `${t("err.notFoundText")} \u2014 ${path}`,
    action: { href: "#/", label: t("err.goHome") }
  })}
      <div class="row row-wrap center">
        <a class="btn btn-ghost btn-sm" href="#/products">${icon("grid")} ${t("nav.products")}</a>
        <a class="btn btn-ghost btn-sm" href="#/pages/faq">${icon("info")} ${t("footer.faq")}</a>
        <a class="btn btn-ghost btn-sm" href="#/pages/contact">${icon("phone")} ${t("contact.title")}</a>
        <a class="btn btn-ghost btn-sm" href="#/search/image">${icon("camera")} ${t("search.byImage")}</a>
      </div>
      ${S.recent?.length ? html`<p class="muted small">${t("misc.recentlyViewed")}: ${S.recent.length}</p>` : ""}
    </div>`;
}
function mount29(root) {
  applyDyn(root);
  return null;
}
var init_not_found = __esm({
  "public/js/views/not-found.mjs"() {
    init_dom();
    init_i18n();
    init_state();
    init_components();
  }
});

// public/js/router.mjs
var router_exports = {};
__export(router_exports, {
  currentRoute: () => currentRoute,
  href: () => href,
  initRouter: () => initRouter,
  navigate: () => navigate,
  parseHash: () => parseHash,
  refresh: () => refresh,
  render: () => render32,
  routes: () => routes,
  start: () => start
});
function parseHash(hash = location.hash) {
  let raw2 = String(hash || "").replace(/^#/, "");
  if (!raw2 || raw2 === "/") return { path: "/", query: new URLSearchParams(), hashStr: "" };
  let hashStr = "";
  const hi = raw2.indexOf("#");
  if (hi >= 0) {
    hashStr = raw2.slice(hi + 1);
    raw2 = raw2.slice(0, hi);
  }
  const qi = raw2.indexOf("?");
  const query = new URLSearchParams(qi >= 0 ? raw2.slice(qi + 1) : "");
  let path = qi >= 0 ? raw2.slice(0, qi) : raw2;
  if (!path.startsWith("/")) path = `/${path}`;
  path = path.replace(/\/{2,}/g, "/");
  if (path.length > 1 && path.endsWith("/")) path = path.slice(0, -1);
  return { path, query, hashStr };
}
function matchRoute(path) {
  const segs = path.split("/").filter((x) => x !== "");
  for (const r of routes) {
    const ps = r.pattern.split("/").filter((x) => x !== "");
    if (ps.length !== segs.length) continue;
    const params = {};
    let ok = true;
    for (let i = 0; i < ps.length; i++) {
      if (ps[i].startsWith(":")) params[ps[i].slice(1)] = decodeURIComponent(segs[i]);
      else if (ps[i] !== segs[i]) {
        ok = false;
        break;
      }
    }
    if (ok) return { route: r, params };
  }
  return { route: notFound, params: {} };
}
function checkGuard(guard, ctx) {
  if (!guard) return null;
  if (guard === "auth") {
    if (!S.me) {
      const next = encodeURIComponent(ctx.full);
      toast(t("err.loginRequired"));
      return `#/auth?next=${next}`;
    }
    return null;
  }
  if (guard === "admin") {
    if (!S.me?.isAdmin) {
      toastError2(t("err.forbidden"));
      return "#/";
    }
    return null;
  }
  if (guard.startsWith("perm:")) {
    const p = guard.slice(5);
    const { can: can2 } = ctx.helpers;
    if (!can2(p)) {
      toastError2(t("adm.noPermission"));
      return "#/admin";
    }
    return null;
  }
  if (guard.startsWith("feature:")) {
    const f = guard.slice(8);
    if (S.settings?.features?.[f] === false) {
      toast(t("err.notFound"));
      return "#/";
    }
    return null;
  }
  return null;
}
async function render32(ctx) {
  const view = V();
  if (!view) return;
  const my = ++token;
  if (currentCleanup) {
    try {
      currentCleanup();
    } catch {
    }
    currentCleanup = null;
  }
  loadingBar(true);
  view.innerHTML = ctx.skeleton || '<div class="sk sk-card"></div>';
  let mod = null;
  try {
    mod = await ctx.route.load();
  } catch (e) {
    console.error("[router] load failed", e);
    if (my !== token) return;
    view.innerHTML = `<div class="empty"><h4>${t("err.generic")}</h4><p>${t("err.network")}</p></div>`;
    loadingBar(false);
    return;
  }
  if (my !== token) return;
  let html2 = "";
  try {
    html2 = await mod.render(ctx);
  } catch (e) {
    console.error("[router] render failed", e);
    html2 = `<div class="empty"><h4>${t("err.generic")}</h4><p>${String(e?.message || e)}</p></div>`;
  }
  if (my !== token) return;
  view.innerHTML = html2;
  applyDyn(view);
  setTimeout(maybeConsent, 300);
  try {
    const base = S.settings?.store?.[ctx.lang === "en" ? "nameEn" : "name"] || "\u06AF\u0631\u06CC\u0646 \u0627\u067E\u0644";
    const tt = typeof mod.title === "function" ? mod.title(ctx) : mod.title || ctx.route.title?.(ctx) || "";
    document.title = tt ? `${tt} \xB7 ${base}` : base;
  } catch {
  }
  try {
    if (typeof mod.mount === "function") {
      const c = mod.mount(view, ctx);
      if (typeof c === "function") currentCleanup = c;
    }
  } catch (e) {
    console.error("[router] mount failed", e);
  }
  if (my !== token) return;
  loadingBar(false);
  document.dispatchEvent(new CustomEvent("view:rendered", { detail: ctx }));
  markActiveNav(ctx.path);
  if (!ctx.keepScroll) scrollTop(false);
  try {
    view.closest("#view")?.focus({ preventScroll: true });
  } catch {
  }
}
function markActiveNav(path) {
  document.querySelectorAll(".nav-link[data-nav-key]").forEach((a) => {
    a.classList.toggle("active", a.dataset.navKey === path || a.dataset.navKey !== "/" && path.startsWith(a.dataset.navKey));
  });
  document.querySelectorAll(".mobile-nav a[data-mn]").forEach((a) => {
    const key = a.dataset.mn;
    const on2 = key === "home" && path === "/" || key === "products" && (path.startsWith("/products") || path.startsWith("/category") || path.startsWith("/product")) || key === "search" && path.startsWith("/search") || key === "cart" && path.startsWith("/cart") || key === "me" && (path.startsWith("/account") || path.startsWith("/auth"));
    a.classList.toggle("active", on2);
  });
}
function navigate(to, { replace = false, keepScroll = false } = {}) {
  const target = String(to || "#/");
  const hash = target.startsWith("#") ? target : `#${target}`;
  if (location.hash === hash) {
    start({ keepScroll });
    return;
  }
  if (replace) history.replaceState(null, "", hash);
  else location.hash = hash;
  if (replace) start({ keepScroll });
}
function href(path, query) {
  const q = query instanceof URLSearchParams ? query : new URLSearchParams(query || {});
  const s = q.toString();
  return `#${path.startsWith("/") ? path : `/${path}`}${s ? `?${s}` : ""}`;
}
function start(opts = {}) {
  const { path, query, hashStr } = parseHash();
  const { route, params } = matchRoute(path);
  const full = `${path}${query.toString() ? `?${query}` : ""}`;
  const ctx = {
    path,
    params,
    query,
    hashStr,
    full,
    route,
    lang: document.documentElement.getAttribute("data-lang") || "fa",
    keepScroll: !!opts.keepScroll,
    skeleton: route.skeleton || "",
    helpers: {}
  };
  currentCtx = ctx;
  const redirect = checkGuard(route.guard, ctx);
  if (redirect) {
    if (redirect !== location.hash) {
      location.replace(redirect);
      return;
    }
    return;
  }
  render32(ctx);
}
function initRouter() {
  window.addEventListener("hashchange", () => start());
  start();
}
function refresh(keepScroll = false) {
  start({ keepScroll });
}
var V, routes, notFound, token, currentCtx, currentCleanup, currentRoute;
var init_router = __esm({
  "public/js/router.mjs"() {
    init_dom();
    init_i18n();
    init_state();
    init_ui();
    V = () => qs("#viewInner");
    routes = [
      { pattern: "/", load: () => Promise.resolve().then(() => (init_home(), home_exports)), title: () => t("nav.home") },
      { pattern: "/products", load: () => Promise.resolve().then(() => (init_catalog(), catalog_exports)), title: () => t("catalog.title") },
      { pattern: "/category/:id", load: () => Promise.resolve().then(() => (init_catalog(), catalog_exports)), title: () => t("catalog.title") },
      { pattern: "/product/:id", load: () => Promise.resolve().then(() => (init_product(), product_exports)), title: (c) => c.params.id },
      { pattern: "/search/image", load: () => Promise.resolve().then(() => (init_search_image(), search_image_exports)), title: () => t("search.imageTitle"), guard: "feature:imageSearch" },
      { pattern: "/cart", load: () => Promise.resolve().then(() => (init_cart(), cart_exports)), title: () => t("cart.title") },
      { pattern: "/checkout", load: () => Promise.resolve().then(() => (init_checkout(), checkout_exports)), title: () => t("checkout.title") },
      { pattern: "/checkout/done/:id", load: () => Promise.resolve().then(() => (init_checkout_done(), checkout_done_exports)), title: () => t("checkout.successTitle") },
      { pattern: "/pay/:id", load: () => Promise.resolve().then(() => (init_pay(), pay_exports)), title: () => t("common.payment") },
      { pattern: "/compare", load: () => Promise.resolve().then(() => (init_compare(), compare_exports)), title: () => t("compare.title"), guard: "feature:compare" },
      { pattern: "/lottery", load: () => Promise.resolve().then(() => (init_lottery(), lottery_exports)), title: () => t("lot.title") },
      { pattern: "/price-check", load: () => Promise.resolve().then(() => (init_price_check(), price_check_exports)), title: () => t("priceCheck.title"), guard: "feature:priceCheckDevice" },
      { pattern: "/auth", load: () => Promise.resolve().then(() => (init_auth(), auth_exports)), title: () => t("auth.title") },
      { pattern: "/auth/:mode", load: () => Promise.resolve().then(() => (init_auth(), auth_exports)), title: () => t("auth.title") },
      { pattern: "/account", load: () => Promise.resolve().then(() => (init_account(), account_exports)), title: () => t("acc.title"), guard: "auth" },
      { pattern: "/account/:section", load: () => Promise.resolve().then(() => (init_account(), account_exports)), title: () => t("acc.title"), guard: "auth" },
      { pattern: "/account/orders/:id", load: () => Promise.resolve().then(() => (init_order_detail(), order_detail_exports)), title: () => t("acc.trackOrder"), guard: "auth" },
      { pattern: "/account/tickets/:id", load: () => Promise.resolve().then(() => (init_ticket_detail(), ticket_detail_exports)), title: () => t("common.ticket"), guard: "auth" },
      { pattern: "/stats", load: () => Promise.resolve().then(() => (init_stats(), stats_exports)), title: () => t("nav.stats"), guard: "feature:publicStats" },
      { pattern: "/pages/:key", load: () => Promise.resolve().then(() => (init_page(), page_exports)), title: (c) => c.params.key },
      { pattern: "/admin", load: () => Promise.resolve().then(() => (init_admin(), admin_exports)), title: () => t("adm.title"), guard: "admin" },
      { pattern: "/admin/:section", load: () => Promise.resolve().then(() => (init_admin(), admin_exports)), title: () => t("adm.title"), guard: "admin" },
      { pattern: "/admin/:section/:id", load: () => Promise.resolve().then(() => (init_admin(), admin_exports)), title: () => t("adm.title"), guard: "admin" }
    ];
    notFound = { pattern: "/404", load: () => Promise.resolve().then(() => (init_not_found(), not_found_exports)), title: () => t("err.notFound") };
    token = 0;
    currentCtx = null;
    currentCleanup = null;
    currentRoute = () => currentCtx;
  }
});

// public/js/map.mjs
function coords() {
  const c = store().mapCoords || { lat: 28.9684, lng: 50.8385 };
  return { lat: Number(c.lat), lng: Number(c.lng) };
}
function urls(dest, origin) {
  const d = `${dest.lat},${dest.lng}`;
  const o = origin ? `${origin.lat},${origin.lng}` : "";
  return [
    {
      id: "neshan",
      label: t("contact.neshan"),
      icon: "map",
      href: origin ? `https://nshn.ir/maps?origin=${o}&destination=${d}&type=drive` : `https://nshn.ir/?lat=${dest.lat}&lng=${dest.lng}`
    },
    {
      id: "balad",
      label: t("contact.balad"),
      icon: "pin",
      href: origin ? `https://balad.ir/route/${o.replace(",", ",")}/${d}` : `https://balad.ir/map?lat=${dest.lat}&lng=${dest.lng}`
    },
    {
      id: "osm",
      label: t("contact.osm"),
      icon: "globe",
      href: origin ? `https://www.openstreetmap.org/directions?from=${o.replace(",", ";")}&to=${d.replace(",", ";")}` : `https://www.openstreetmap.org/?mlat=${dest.lat}&mlon=${dest.lng}#map=17/${dest.lat}/${dest.lng}`
    },
    {
      id: "google",
      label: t("contact.google"),
      icon: "external",
      href: origin ? `https://www.google.com/maps/dir/?api=1&destination=${d}&origin=${o}` : `https://www.google.com/maps/search/?api=1&query=${d}`
    }
  ];
}
function getLocation() {
  return new Promise((resolve) => {
    if (!("geolocation" in navigator)) return resolve(null);
    let done = false;
    const finish = (v) => {
      if (!done) {
        done = true;
        resolve(v);
      }
    };
    const timer = setTimeout(() => finish(null), 7e3);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        clearTimeout(timer);
        finish({ lat: pos.coords.latitude, lng: pos.coords.longitude });
      },
      () => {
        clearTimeout(timer);
        finish(null);
      },
      { enableHighAccuracy: false, timeout: 6e3, maximumAge: 12e4 }
    );
  });
}
function openMapChooser() {
  const dest = coords();
  let origin = null;
  const m = modal({
    title: t("contact.mapAsk"),
    size: "sm",
    body: html`
      <p class="notice notice-info mb">${icon("info")}<span>${t("contact.mapPermission")}</span></p>
      <div class="col" data-maps></div>`,
    footer: html`<button type="button" class="btn btn-ghost" data-x>${t("common.close")}</button>`,
    onMount: (panel, handle) => {
      const box = panel.querySelector("[data-maps]");
      const renderBtns = () => {
        box.innerHTML = urls(dest, origin).map((u) => html`
          <a class="btn btn-ghost btn-block" href="${u.href}" target="_blank" rel="noopener noreferrer">${icon(u.icon)} ${u.label} ${icon("external")}</a>`).join("");
      };
      renderBtns();
      panel.querySelector("[data-x]").addEventListener("click", () => handle.close());
      getLocation().then((pos) => {
        if (pos) {
          origin = pos;
          renderBtns();
          toastSuccess(t("contact.locationOn"), { timeout: 2400 });
        }
      });
    }
  });
  return m;
}
var init_map = __esm({
  "public/js/map.mjs"() {
    init_i18n();
    init_state();
    init_ui();
    init_dom();
    init_actions();
    act("open-map", (e) => {
      e.preventDefault?.();
      openMapChooser();
    });
    act("install-app", async () => {
      if (S.installPrompt) {
        const ok = await promptInstall();
        if (!ok) installHintModal();
      } else installHintModal();
    });
  }
});

// public/js/main.mjs
var main_exports = {};
__export(main_exports, {
  ecoPaused: () => ecoPaused,
  maybeConsent: () => maybeConsent2,
  updateBadges: () => updateBadges
});
async function init() {
  installDelegation();
  wireStaticControls();
  await boot();
  renderChrome();
  syncSleep();
  applyI18n();
  wireSearch();
  wirePalette();
  initChat();
  watchNetwork();
  watchInstall();
  wireNetworkToasts();
  wireScroll();
  initRouter();
  registerSW();
  recordVisit();
  subscribeEvents();
  wireSleepHeartbeat();
  wireCursorHalo();
  wireEcoMode();
  sendVisitBeacon();
  wireSearchShortcut();
  maybeCouponFromUrl();
  maybeConsent2();
  maybeForcePasswordChange();
  hideWelcome();
  wireRefresh();
  enhanceTooltips();
  wireErrorTelemetry();
  document.getElementById("bootSplash")?.remove();
}
function hideWelcome() {
  const ws = document.getElementById("welcomeScreen");
  if (!ws) return;
  const wait = Math.max(0, 700 - (performance.now() - T0));
  setTimeout(() => {
    ws.classList.add("gone");
    setTimeout(() => ws.remove(), 520);
  }, wait);
}
function wireRefresh() {
  const b = document.getElementById("btnRefresh");
  if (!b) return;
  b.addEventListener("click", () => {
    location.reload();
  });
}
function enhanceTooltips() {
  const pass = () => {
    for (const elx of document.querySelectorAll('button[aria-label],a[aria-label],[role="button"][aria-label]')) {
      if (!elx.title) elx.title = elx.getAttribute("aria-label") || "";
    }
  };
  pass();
  const ob = new MutationObserver(() => {
    clearTimeout(ob._t);
    ob._t = setTimeout(pass, 350);
  });
  ob.observe(document.body, { childList: true, subtree: true });
}
function wireErrorTelemetry() {
  const seen = /* @__PURE__ */ new Set();
  const send = (msg, src, line) => {
    const key = String(msg).slice(0, 120);
    if (seen.has(key) || seen.size > 12) return;
    seen.add(key);
    try {
      const body = JSON.stringify({ msg: String(msg).slice(0, 300), src: String(src || "").slice(0, 200), line: line || 0, path: location.hash.slice(0, 120), build: window.__BM_BUILD || "" });
      if (navigator.sendBeacon) navigator.sendBeacon("/api/client-error", new Blob([body], { type: "application/json" }));
      else fetch("/api/client-error", { method: "POST", headers: { "Content-Type": "application/json" }, body, keepalive: true }).catch(() => {
      });
    } catch {
    }
  };
  window.addEventListener("error", (e) => send(e.message, e.filename, e.lineno));
  window.addEventListener("unhandledrejection", (e) => send(`unhandledrejection: ${e.reason?.message || e.reason}`, location.href, 0));
}
function renderChrome() {
  const st = store();
  const u = ui();
  const topbar = qs("#topbar");
  const fb = [];
  if (st.freeShipOver) fb.push(isFa2() ? `\u0627\u0631\u0633\u0627\u0644 \u0631\u0627\u06CC\u06AF\u0627\u0646 \u0633\u0641\u0627\u0631\u0634\u200C\u0647\u0627\u06CC \u0628\u0627\u0644\u0627\u06CC ${fmtNum(st.freeShipOver)} \u062A\u0648\u0645\u0627\u0646` : `Free shipping over ${fmtNum(st.freeShipOver)}`);
  fb.push(isFa2() ? "\u0636\u0645\u0627\u0646\u062A \u0627\u0635\u0627\u0644\u062A \u06A9\u0627\u0644\u0627\u061B \u0645\u0631\u062C\u0648\u0639 \u062A\u0627 \u06F7 \u0631\u0648\u0632" : "Authenticity guarantee; 7-day returns");
  if (st.phone) fb.push(isFa2() ? `\u067E\u0634\u062A\u06CC\u0628\u0627\u0646\u06CC \u0647\u0631 \u0631\u0648\u0632 \u06F9 \u062A\u0627 \u06F2\u06F1 \u2014 ${fmtTel(st.phone)}` : `Support 9\u201321 daily \u2014 ${fmtTel(st.phone)}`);
  if (st.socials?.instagram) fb.push(isFa2() ? "\u062A\u0627\u0632\u0647\u200C\u0647\u0627\u06CC \u06AF\u062C\u062A \u0647\u0631 \u0647\u0641\u062A\u0647 \u062F\u0631 \u0627\u06CC\u0646\u0633\u062A\u0627\u06AF\u0631\u0627\u0645 \u06AF\u0631\u06CC\u0646 \u0627\u067E\u0644" : "New gadgets weekly on Instagram");
  const tickerItems = S.ticker?.length ? S.ticker : fb;
  topbar.hidden = false;
  topbar.classList.toggle("no-ticker", u.showTicker === false);
  const one = tickerItems.map((x) => html`<span class="ticker-item">${icon("sparkles")} ${x}</span>`).join("");
  qs("#ticker").innerHTML = `<div class="ticker-track">${one}${one}</div>`;
  const tbPhone = qs("#tb-phone");
  tbPhone.href = `tel:${st.phone || ""}`;
  tbPhone.innerHTML = html`${icon("phone")} ${fmtTel(st.phone || "")}`;
  qs("#brandName").textContent = isFa2() ? st.name || t("app.name") : st.nameEn || st.name || "Green Apple";
  qs("#brandTag").textContent = isFa2() ? st.tagline || "" : st.taglineEn || "";
  qs("#brandLink").setAttribute("aria-label", `${st.name || ""} \u2014 ${t("nav.home")}`);
  renderNav();
  renderFooter();
  renderUserArea();
  updateBadges();
  const installBtn = qs("#btnInstallApp");
  if (installBtn) installBtn.hidden = S.installed;
}
function renderNav() {
  const nav = qs("#navInner");
  const topCats = S.categories.filter((c) => !c.parentId).slice(0, 10);
  const links = [
    { key: "/", href: "#/", icon: "home", label: t("nav.home") },
    { key: "/products", href: "#/products", icon: "grid", label: t("nav.products") }
  ];
  let html2 = links.map((l) => html`<a class="nav-link" data-nav-key="${l.key}" href="${l.href}">${icon(l.icon)} ${l.label}</a>`).join("");
  html2 += html`
    <div class="nav-more">
      <button type="button" class="nav-link" data-dd aria-expanded="false" aria-haspopup="true">${icon("layers")} ${t("nav.allCategories")} ${icon("chevron-down")}</button>
      <div class="nav-dd" data-ddbox hidden>
        ${topCats.map((c) => html`<a href="#/category/${c.id}">${icon(catIcon(c.glyph))} ${catName(c)}</a>`)}
        <a href="#/products">${icon("grid")} ${t("footer.allProducts")}</a>
      </div>
    </div>`;
  const extra = [
    { key: "/deals", href: "#/products?discount=1", icon: "percent", label: t("nav.deals"), show: feat("coupons") },
    { key: "/new", href: "#/products?sort=newest", icon: "sparkles", label: t("nav.new"), show: true },
    { key: "/pages/stats", href: "#/stats", icon: "chart", label: t("nav.stats"), show: feat("publicStats") },
    { key: "/price-check", href: "#/price-check", icon: "barcode", label: t("priceCheck.title"), show: feat("priceCheckDevice") },
    { key: "/lottery", href: "#/lottery", icon: "gift2", label: t("lot.nav"), show: true },
    { key: "/pages/about", href: "#/pages/about", icon: "store", label: t("nav.about"), show: true },
    { key: "/pages/contact", href: "#/pages/contact", icon: "map", label: t("nav.contact"), show: true }
  ].filter((x) => x.show);
  html2 += extra.map((l) => html`<a class="nav-link" data-nav-key="${l.key}" href="${l.href}">${icon(l.icon)} ${l.label}</a>`).join("");
  const tickerAds = adInSlot("ticker");
  if (tickerAds.length) html2 += html`<span class="nav-link muted tiny">${tickerAds[0].title}</span>`;
  nav.innerHTML = html2;
  const ddBtn = nav.querySelector("[data-dd]");
  const ddBox = nav.querySelector("[data-ddbox]");
  ddBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    ddBox.hidden = !ddBox.hidden;
    ddBtn.setAttribute("aria-expanded", String(!ddBox.hidden));
  });
  document.addEventListener("click", (e) => {
    if (!ddBox.hidden && !e.target.closest(".nav-more")) {
      ddBox.hidden = true;
      ddBtn.setAttribute("aria-expanded", "false");
    }
  });
}
function renderFooter() {
  const st = store();
  qs("#fBrandName").textContent = isFa2() ? st.name || t("app.name") : st.nameEn || st.name || "";
  qs("#fDesc").textContent = isFa2() ? st.description || "" : st.descriptionEn || st.description || "";
  qs("#fYear").textContent = isFa2() ? faDigits((/* @__PURE__ */ new Date()).getFullYear()) : String((/* @__PURE__ */ new Date()).getFullYear());
  qs("#fBadges").innerHTML = html`
    <span class="f-badge">${icon("shield")}<span>${t("home.point1")}</span></span>
    <span class="f-badge">${icon("package-check")}<span>${t("home.point2")}</span></span>
    ${feat("insurance") ? html`<span class="f-badge">${icon("scale")}<span>${t("common.insurance")}</span></span>` : ""}
    ${feat("plus") ? html`<span class="f-badge">${icon("sparkles")}<span>${t("footer.plus")}</span></span>` : ""}`;
  const soc = st.socials || {};
  const socList = [
    ["instagram", safeHref(soc.instagram), "camera"],
    ["telegram", safeHref(soc.telegram), "send"],
    ["whatsapp", soc.whatsapp ? `https://wa.me/${String(soc.whatsapp).replace(/\D/g, "")}` : "", "chat"],
    ["eitaa", safeHref(soc.eitaa), "globe"]
  ].filter((x) => x[1]);
  qs("#fSocial").innerHTML = socList.length ? socList.map(([name, url, ic]) => html`<a href="${url}" target="_blank" rel="noopener noreferrer" aria-label="${name}" title="${name}">${icon(ic)}</a>`).join("") : html`<span class="muted tiny">${t("footer.contactUs")}</span>`;
  qs("#fContact").innerHTML = html`
    <li>${icon("phone")}<span>${t("contact.phone")}: <a href="tel:${st.phone}">${fmtTel(st.phone || "")}</a></span></li>
    <li>${icon("chat")}<span>${t("contact.mobile")}: <a href="tel:${st.phone2 || st.phone}">${fmtTel(st.phone2 || "")}</a></span></li>
    <li>${icon("mail")}<span><a href="mailto:${st.email}">${st.email}</a></span></li>
    <li>${icon("pin")}<span>${isFa2() ? st.address || "" : st.addressEn || st.address || ""}</span></li>
    <li>${icon("clock")}<span>${t("footer.workingHours")}: ${(st.workingHours || []).map((w) => `${isFa2() ? w.fa : w.en} ${isFa2() ? w.time : w.timeEn}`).join(" \xB7 ")}</span></li>`;
  qs("#fMinimap").innerHTML = minimapSvg();
  qs("#fMinimap").setAttribute("title", t("contact.mapTitle"));
}
function renderUserArea() {
  const menu = qs("#userMenu");
  const authBtn = qs("#btnAuth");
  if (!S.me) {
    menu.hidden = true;
    authBtn.hidden = false;
    authBtn.innerHTML = html`${icon("user")}<span data-i18n="nav.login">${t("nav.login")}</span>`;
    return;
  }
  authBtn.hidden = true;
  menu.hidden = false;
  const me = S.me;
  const initial = (me.name || me.username || "?").trim().charAt(0);
  menu.innerHTML = html`
    <button type="button" class="um-btn" data-um aria-expanded="false" aria-haspopup="true">
      <span class="um-avatar">${esc(initial)}</span>
      <span class="um-name">${esc(me.name || me.username)}</span>
      ${icon("chevron-down")}
    </button>
    <div class="um-dd" data-umbox hidden>
      <div class="um-dd-head">
        <div class="b">${esc(me.name || me.username)}</div>
        <div class="tiny muted">${esc(me.phone || me.email || me.username)}</div>
        ${isPlus() ? html`<span class="badge-pill bp-accent mt-s">${icon("sparkles")} ${t("acc.plus")}</span>` : ""}
      </div>
      <a href="#/account">${icon("user")} ${t("acc.dashboard")}</a>
      <a href="#/account/orders">${icon("package-check")} ${t("acc.orders")}</a>
      <a href="#/account/wishlist">${icon("heart")} ${t("acc.wishlist")} <span class="um-count">${fmtNum(S.wishlist.length)}</span></a>
      ${feat("wallet") ? html`<a href="#/account/wallet">${icon("wallet")} ${t("acc.wallet")} <span class="um-count">${fmtNum(me.wallet?.balance || 0)}</span></a>` : ""}
      ${feat("tickets") ? html`<a href="#/account/tickets">${icon("ticket")} ${t("acc.tickets")}</a>` : ""}
      <a href="#/account/notifications">${icon("bell")} ${t("acc.notifications")} ${S.unread ? html`<span class="um-count">${fmtNum(S.unread)}</span>` : ""}</a>
      ${me.isAdmin ? html`<div class="sep"></div><a href="#/admin">${icon("settings")} ${t("nav.admin")}</a>` : ""}
      <div class="sep"></div>
      <button type="button" data-act="sound-toggle" aria-pressed="${S.prefs?.uiSound ? "true" : "false"}">${icon(S.prefs?.uiSound ? "volume" : "volume-off")} ${t("misc.uiSound")} <span class="um-sw ${S.prefs?.uiSound ? "on" : ""}" aria-hidden="true"></span></button>
      <button type="button" data-act="logout">${icon("logout")} ${t("common.logout")}</button>
    </div>`;
  const btn = menu.querySelector("[data-um]");
  const box = menu.querySelector("[data-umbox]");
  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    box.hidden = !box.hidden;
    btn.setAttribute("aria-expanded", String(!box.hidden));
  });
  document.addEventListener("click", (e) => {
    if (!box.hidden && !e.target.closest(".user-menu")) {
      box.hidden = true;
      btn.setAttribute("aria-expanded", "false");
    }
  });
}
function updateBadges() {
  const set = (id, n) => {
    const elx = qs(id);
    if (!elx) return;
    elx.hidden = !n;
    elx.textContent = fmtNum(n);
  };
  set("#cartBadge", S.cart?.count || 0);
  set("#mnCart", S.cart?.count || 0);
  set("#wishBadge", S.wishlist.length);
  set("#notifBadge", S.unread);
}
function wireStaticControls() {
  qs("#btnTheme")?.addEventListener("click", () => {
    const cur = S.prefs.theme === "auto" ? document.documentElement.getAttribute("data-mode") || "dark" : S.prefs.theme;
    const next = cur === "dark" ? "light" : "dark";
    setPref("theme", next);
    const b = qs("#btnTheme");
    b.innerHTML = icon(next === "dark" ? "moon" : "sun");
  });
  qs("#btnLang")?.addEventListener("click", async () => {
    const next = lang() === "fa" ? "en" : "fa";
    setPref("locale", next);
    qs("#langChip").textContent = next === "fa" ? "EN" : "\u0641\u0627";
    applyI18n();
    renderChrome();
    applyI18n();
    refresh(true);
  });
  qs("#btnMenu")?.addEventListener("click", () => openMobileMenu());
  const fabTop = qs("#fabTop");
  fabTop?.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  let fabTick = false;
  addEventListener("scroll", () => {
    if (fabTick || !fabTop) return;
    fabTick = true;
    requestAnimationFrame(() => {
      fabTop.hidden = scrollY < 600;
      fabTick = false;
    });
  }, { passive: true });
  qs("#btnInstallApp")?.addEventListener("click", async () => {
    if (S.installPrompt) {
      const ok = await promptInstall();
      if (!ok) installHintModal();
    } else installHintModal();
  });
}
function openMobileMenu() {
  drawer({
    title: t("nav.menu"),
    body: html`
        <div class="col">
          <a class="nav-link" href="#/">${icon("home")} ${t("nav.home")}</a>
          <a class="nav-link" href="#/products">${icon("grid")} ${t("nav.products")}</a>
          ${S.categories.filter((c) => !c.parentId).map((c) => html`<a class="nav-link" href="#/category/${c.id}">${icon(catIcon(c.glyph))} ${catName(c)}</a>`)}
          <div class="divider"></div>
          <a class="nav-link" href="#/pages/about">${icon("store")} ${t("nav.about")}</a>
          <a class="nav-link" href="#/pages/contact">${icon("map")} ${t("nav.contact")}</a>
          ${S.me ? "" : html`<a class="btn btn-primary btn-block mt-s" href="#/auth">${icon("user")} ${t("nav.login")}</a>`}
        </div>`
  });
}
function wireSearch() {
  const form = qs("#searchForm");
  const input = qs("#searchInput");
  const box = qs("#suggestBox");
  let activeIdx = -1;
  const closeBox = () => {
    box.hidden = true;
    activeIdx = -1;
  };
  const suggest = debounce(async () => {
    const q = input.value.trim();
    if (!q) {
      if (!S.searches.length) {
        closeBox();
        return;
      }
      box.hidden = false;
      box.innerHTML = html`
        <div class="sg-group">${t("search.recent")}</div>
        ${S.searches.map((s) => html`<div class="sg-item" data-q="${s}">${icon("history")}<span class="sg-title">${s}</span></div>`)}`;
      return;
    }
    try {
      const r = await api.get(`/api/search?q=${encodeURIComponent(q)}&limit=7`);
      box.hidden = false;
      let out = "";
      if (r.didYouMean) out += html`<div class="sg-group">${t("search.didYouMean")}</div><div class="sg-item" data-q="${r.didYouMean}">${icon("sparkles")}<span class="sg-title">${r.didYouMean}</span></div>`;
      if (r.categories?.length) out += html`<div class="sg-group">${t("search.inCategories")}</div>${r.categories.map((c) => html`<a class="sg-item" href="#/category/${c.id}">${icon(catIcon(c.glyph))}<span class="sg-title">${catName(c)}</span></a>`)}`;
      if (r.brands?.length) out += html`<div class="sg-group">${t("search.inBrands")}</div>${r.brands.map((b) => html`<div class="sg-item" data-q="${brandName(b)}">${icon("tag")}<span class="sg-title">${brandName(b)}</span></div>`)}`;
      if (r.products?.length) {
        out += html`<div class="sg-group">${t("search.inProducts")}</div>${r.products.map((p) => html`
          <a class="sg-item" href="#/product/${p.id}">
            ${p.images?.[0] ? html`<img class="sg-thumb" src="${p.images[0]}" alt="" loading="lazy" data-glyph="${p.glyph}">` : icon(p.glyph || "box")}
            <span class="grow"><span class="sg-title">${prodName(p)}</span><span class="sg-meta">${catName({ name: p.categoryName, nameEn: p.categoryNameEn })}</span></span>
            <span class="sg-price">${fmtNum(p.price)}</span>
          </a>`)}`;
      }
      if (!out) out = html`<div class="sg-item muted">${t("common.noResult")}</div>`;
      box.innerHTML = out;
    } catch {
      closeBox();
    }
  }, 240);
  input.addEventListener("input", suggest);
  input.addEventListener("focus", suggest);
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".searchbox")) closeBox();
  });
  box.addEventListener("click", (e) => {
    if (e.target.closest("a.sg-item")) {
      closeBox();
      return;
    }
    const item = e.target.closest("[data-q]");
    if (!item) return;
    e.preventDefault();
    input.value = item.dataset.q;
    closeBox();
    goSearch(item.dataset.q);
  });
  window.addEventListener("hashchange", closeBox);
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const q = input.value.trim();
    closeBox();
    goSearch(q);
  });
  input.addEventListener("keydown", (e) => {
    const items = [...box.querySelectorAll(".sg-item, a.sg-item")];
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      if (!items.length) return;
      e.preventDefault();
      activeIdx = (activeIdx + (e.key === "ArrowDown" ? 1 : -1) + items.length) % items.length;
      items.forEach((n, i) => n.classList.toggle("active", i === activeIdx));
      items[activeIdx]?.scrollIntoView({ block: "nearest" });
    } else if (e.key === "Enter" && activeIdx >= 0 && items[activeIdx]) {
      e.preventDefault();
      const it = items[activeIdx];
      if (it.dataset.q) {
        input.value = it.dataset.q;
        goSearch(it.dataset.q);
      } else if (it.getAttribute("href")) location.hash = it.getAttribute("href");
      closeBox();
    } else if (e.key === "Escape") closeBox();
  });
  qs("#btnVoiceSearch")?.addEventListener("click", () => startVoice(input, goSearch));
  qs("#btnImageSearch")?.addEventListener("click", () => {
    if (!feat("imageSearch")) {
      toast(t("err.notFound"));
      return;
    }
    navigate("#/search/image");
  });
}
function goSearch(q) {
  const s = String(q || "").trim();
  if (!s) return;
  addSearch(s);
  navigate(`/products?q=${encodeURIComponent(s)}`);
}
async function startVoice(input, go) {
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SR) {
    toastError2(t("search.noVoice"));
    return;
  }
  try {
    if (navigator.mediaDevices?.getUserMedia) {
      const stream2 = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream2.getTracks().forEach((tr) => tr.stop());
    }
  } catch {
    toastError2(t("search.micDenied"));
    return;
  }
  const rec = new SR();
  rec.lang = lang() === "fa" ? "fa-IR" : "en-US";
  rec.interimResults = false;
  rec.maxAlternatives = 1;
  const btn = qs("#btnVoiceSearch");
  btn.classList.add("active");
  const listening = toast(t("search.listening"), { timeout: 2600 });
  rec.onresult = (e) => {
    listening?.close();
    const text = e.results?.[0]?.[0]?.transcript || "";
    if (text) {
      input.value = text;
      go(text);
    } else toast(t("search.noSpeech"));
  };
  rec.onerror = (e) => {
    listening?.close();
    const map = {
      "not-allowed": "search.micDenied",
      "service-not-allowed": "search.micDenied",
      network: "search.voiceNetwork",
      "no-speech": "search.noSpeech",
      aborted: null,
      "audio-capture": "search.noMic"
    };
    const key = map[e.error];
    if (key) toastError2(t(key));
    else if (e.error !== "aborted") toastError2(t("search.noSpeech"));
  };
  rec.onend = () => {
    btn.classList.remove("active");
    listening?.close();
  };
  try {
    rec.start();
  } catch {
    btn.classList.remove("active");
  }
}
function wirePalette() {
  let palEl = null;
  const close = () => {
    palEl?.remove();
    palEl = null;
    document.removeEventListener("keydown", onKey, true);
  };
  const open = async () => {
    if (palEl) {
      close();
      return;
    }
    palEl = el("div", { class: "cmdk", role: "dialog", "aria-modal": "true", "aria-label": t("common.search") });
    palEl.innerHTML = html`
      <div class="cmdk-box">
        <input class="cmdk-input" placeholder="${t("common.searchProducts")}" data-ci autocomplete="off">
        <div class="cmdk-list" data-cl></div>
        <div class="cmdk-foot"><span><kbd>↑↓</kbd> ${t("common.select")}</span><span><kbd>Enter</kbd> ${t("common.next")}</span><span><kbd>Esc</kbd> ${t("common.close")}</span></div>
      </div>`;
    document.body.appendChild(palEl);
    const input = palEl.querySelector("[data-ci]");
    const list5 = palEl.querySelector("[data-cl]");
    input.focus();
    const baseItems = () => [
      { icon: "home", label: t("nav.home"), href: "#/" },
      { icon: "grid", label: t("nav.products"), href: "#/products" },
      { icon: "percent", label: t("nav.deals"), href: "#/products?discount=1" },
      { icon: "cart", label: t("cart.title"), href: "#/cart" },
      ...S.me ? [
        { icon: "user", label: t("acc.dashboard"), href: "#/account" },
        { icon: "package-check", label: t("acc.orders"), href: "#/account/orders" },
        ...feat("wallet") ? [{ icon: "wallet", label: t("acc.wallet"), href: "#/account/wallet" }] : []
      ] : [{ icon: "user", label: t("nav.login"), href: "#/auth" }],
      ...S.me?.isAdmin ? [{ icon: "settings", label: t("adm.title"), href: "#/admin" }] : [],
      { icon: "moon", label: t("theme.toggle"), run: () => qs("#btnTheme").click() },
      { icon: "globe", label: "English / \u0641\u0627\u0631\u0633\u06CC", run: () => qs("#btnLang").click() },
      { icon: "chart", label: t("nav.stats"), href: "#/stats" },
      { icon: "map", label: t("nav.contact"), href: "#/pages/contact" }
    ];
    const renderList = async (q) => {
      let items = baseItems().filter((i) => !q || i.label.toLowerCase().includes(q.toLowerCase()));
      if (q) {
        try {
          const r = await api.get(`/api/search?q=${encodeURIComponent(q)}&limit=6`);
          items = [...items, ...r.products.map((p) => ({ icon: p.glyph || "box", label: prodName(p), meta: fmtNum(p.price), href: `#/product/${p.id}` }))];
        } catch {
        }
      }
      list5.innerHTML = items.length ? items.map((i, idx2) => html`<div class="cmdk-item ${idx2 === 0 ? "active" : ""}" data-idx="${idx2}">${icon(i.icon)}<span class="grow">${i.label}</span>${i.meta ? html`<span class="muted tiny">${i.meta}</span>` : ""}</div>`) : html`<div class="cmdk-item muted">${t("common.noResult")}</div>`;
      list5._items = items;
    };
    await renderList("");
    input.addEventListener("input", debounce(() => renderList(input.value.trim()), 200));
    const pick = (idx2) => {
      const it = list5._items?.[idx2];
      if (!it) return;
      close();
      if (it.run) it.run();
      else if (it.href) location.hash = it.href;
    };
    list5.addEventListener("click", (e) => {
      const it = e.target.closest("[data-idx]");
      if (it) pick(Number(it.dataset.idx));
    });
    let idx = 0;
    const onKey2 = (e) => {
      const items = list5.querySelectorAll(".cmdk-item[data-idx]");
      if (e.key === "Escape") {
        e.preventDefault();
        close();
      } else if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        e.preventDefault();
        idx = (idx + (e.key === "ArrowDown" ? 1 : -1) + items.length) % Math.max(1, items.length);
        items.forEach((n, i) => n.classList.toggle("active", i === idx));
        items[idx]?.scrollIntoView({ block: "nearest" });
      } else if (e.key === "Enter") {
        e.preventDefault();
        pick(idx);
      }
    };
    document.addEventListener("keydown", onKey2, true);
    palEl.addEventListener("click", (e) => {
      if (e.target === palEl) close();
    });
  };
  document.addEventListener("keydown", (e) => {
    if ((e.ctrlKey || e.metaKey) && String(e.key).toLowerCase() === "k") {
      e.preventDefault();
      open();
    }
  });
}
function subscribeEvents() {
  on("cart", updateBadges);
  on("wishlist", () => {
    updateBadges();
    renderUserArea();
  });
  on("notifications", updateBadges);
  on("me", () => {
    renderUserArea();
    updateBadges();
  });
  on("settings", () => {
    applyPrefs();
    renderChrome();
    applyI18n();
    syncSleep();
  });
  document.addEventListener("view:rendered", () => syncSleep());
  document.addEventListener("sleep:changed", () => {
    syncSleep();
    renderChrome();
  });
  on("install", () => {
    const b = qs("#btnInstallApp");
    if (b) b.hidden = false;
  });
  on("installed", () => {
    const b = qs("#btnInstallApp");
    if (b) b.hidden = true;
    toastSuccess(t("home.appInstalled"));
  });
  on("online", (up) => {
    if (up) toastSuccess(t("err.online"));
    else toastWarnOffline();
  });
}
function wireSleepHeartbeat() {
  const tick = async () => {
    if (document.documentElement.classList.contains("eco")) return;
    try {
      const r = await api.get("/api/system/status");
      const was = !!S.sleeping;
      S.sleeping = !!r.sleeping;
      S.sleepSince = r.since || null;
      if (was !== S.sleeping) {
        syncSleep();
        renderChrome();
        if (String(location.hash || "").startsWith("#/admin")) refresh(true);
      }
    } catch {
    }
  };
  setInterval(tick, 45e3);
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) tick();
  });
}
function syncSleep() {
  const adminArea = String(location.hash || "").startsWith("#/admin");
  const canWake = can("settings.edit");
  updateSleepScreen({
    sleeping: !!S.sleeping && !(adminArea && canWake),
    canWake,
    since: S.sleepSince,
    onWake: async () => {
      try {
        await api.post("/api/system/wake", {});
        await refreshBootstrap({ silent: true });
        syncSleep();
        renderChrome();
        toastSuccess(t("sys.awake"));
        refresh(true);
      } catch (err) {
        toastApiError(err);
      }
    },
    onLogin: () => navigate("#/auth?next=" + encodeURIComponent(location.hash.slice(1)))
  });
}
function toastWarnOffline() {
  if (offlineToasted) return;
  offlineToasted = true;
  toastError2(t("err.offline"), { timeout: 4200 });
}
function wireNetworkToasts() {
  window.addEventListener("online", () => {
    offlineToasted = false;
  });
}
function wireScroll() {
  const header = qs("#siteHeader");
  const fab = qs("#fabTop");
  let ticking = false;
  window.addEventListener("scroll", () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      header.classList.toggle("scrolled", window.scrollY > 8);
      fab.hidden = window.scrollY < 420;
      ticking = false;
    });
  }, { passive: true });
}
function openConsent() {
  if (!feat("consent")) return;
  if (sessionStorage.getItem("consentDeferred")) {
    if (!location.hash.startsWith("#/pages/")) {
      sessionStorage.removeItem("consentDeferred");
    } else return;
  }
  modal({
    title: t("consent.title"),
    dismissible: false,
    closeBtn: false,
    size: "md",
    body: html`
      <p class="confirm-text mb">${t("consent.text")}</p>
      <p class="hint mt-s">${icon("info")} ${t("consent.ttlNote")}</p>
      <form data-act="consent-form" class="col">
        <label class="check"><input type="checkbox" name="terms" checked><span class="box">${icon("check")}</span><span>${t("consent.terms")} <a class="section-link" href="#/pages/terms">${t("consent.readTerms")}</a></span></label>
        <label class="check"><input type="checkbox" name="privacy" checked><span class="box">${icon("check")}</span><span>${t("consent.privacy")} <a class="section-link" href="#/pages/privacy">${t("consent.readPrivacy")}</a></span></label>
        <label class="check"><input type="checkbox" name="marketing"><span class="box">${icon("check")}</span><span>${t("consent.marketing")}</span></label>
      </form>`,
    footer: html`<button type="button" class="btn btn-ghost" data-consent-min>${t("consent.rejectOptional")}</button><button type="button" class="btn btn-primary" data-consent-go>${t("consent.accept")}</button>`,
    onMount: (panel, handle) => {
      const form = panel.querySelector('[data-act="consent-form"]');
      panel.querySelectorAll('a[href^="#/"]').forEach((a) => a.addEventListener("click", () => {
        sessionStorage.setItem("consentDeferred", "1");
        handle.close();
      }));
      const go = () => {
        const terms = form.querySelector("[name=terms]").checked;
        const privacy = form.querySelector("[name=privacy]").checked;
        const marketing = form.querySelector("[name=marketing]").checked;
        if (!terms || !privacy) {
          toastError2(t("form.termsRequired"));
          return;
        }
        setConsent({ terms, privacy, marketing });
        if (S.me) api.patch("/api/me", { notificationsPrefs: { marketing } }).catch(() => {
        });
        toastSuccess(t("consent.thanks"));
        handle.close();
      };
      panel.closest(".modal").querySelector("[data-consent-go]").addEventListener("click", go);
      panel.closest(".modal").querySelector("[data-consent-min]").addEventListener("click", () => {
        setConsent({ terms: true, privacy: true, marketing: false });
        if (S.me) api.patch("/api/me", { notificationsPrefs: { marketing: false } }).catch(() => {
        });
        toastSuccess(t("consent.thanks"));
        handle.close();
      });
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        go();
      });
    }
  });
}
function maybeConsent2() {
  if (hasConsent2()) return;
  openConsent();
}
function maybeForcePasswordChange() {
  if (!S.me?.mustChangePassword) return;
  try {
    if (sessionStorage.getItem("bm_pwd_later")) return;
  } catch {
  }
  forceHandle = modal({
    title: t("acc.passwordChange"),
    dismissible: false,
    closeBtn: false,
    size: "sm",
    body: html`
      <form data-act="force-pass">
        <p class="notice notice-warn mb">${icon("alert")}<span>${lang() === "fa" ? "\u0628\u0631\u0627\u06CC \u0627\u0645\u0646\u06CC\u062A \u0628\u06CC\u0634\u062A\u0631\u060C \u0631\u0645\u0632 \u067E\u06CC\u0634\u200C\u0641\u0631\u0636 \u0631\u0627 \u062A\u063A\u06CC\u06CC\u0631 \u0628\u062F\u0647." : "For security, change the default password."}</span></p>
        <label class="field"><span class="label">${t("acc.currentPassword")}</span><input class="input" type="password" name="current" autocomplete="current-password" required></label>
        <label class="field"><span class="label">${t("acc.newPassword2")}</span><input class="input" type="password" name="next" autocomplete="new-password" required><span class="hint">${t("auth.passwordRules")}</span></label>
        <label class="field"><span class="label">${t("common.passwordConfirm")}</span><input class="input" type="password" name="confirm" autocomplete="new-password" required></label>
        <button class="btn btn-primary btn-block" type="submit">${t("common.save")}</button>
        <button class="btn btn-ghost btn-block mt-s" type="button" data-act="pwd-later">${t("auth.pwdLater")}</button>
      </form>`
  });
}
function recordVisit() {
  const key = "bm_visit";
  try {
    if (sessionStorage.getItem(key)) return;
    sessionStorage.setItem(key, "1");
  } catch {
    return;
  }
  api.post("/api/visits", { path: location.hash || "/" }).catch(() => {
  });
}
function maybeCouponFromUrl() {
  const m = String(location.href).match(/[?&]coupon=([A-Za-z0-9_-]{2,32})/);
  if (!m) return;
  const code = m[1];
  try {
    history.replaceState(null, "", String(location.href).replace(/[?&]coupon=[A-Za-z0-9_-]{2,32}/, "").replace(/\?$/, ""));
  } catch {
  }
  setTimeout(async () => {
    try {
      await api.post("/api/cart/coupon", { code });
      await loadCart();
      toastSuccess(`${t("cart.couponApplied")}: ${code}`);
    } catch {
    }
  }, 700);
}
function wireSearchShortcut() {
  document.addEventListener("keydown", (e) => {
    const tag = String(e.target?.tagName || "").toLowerCase();
    const typing = ["input", "textarea", "select"].includes(tag) || e.target?.isContentEditable;
    if (e.key === "/" && !typing && !e.metaKey && !e.ctrlKey && !e.altKey) {
      const si = qs("#searchInput");
      if (si) {
        e.preventDefault();
        si.focus();
        si.select?.();
      }
    }
    if (e.key === "Escape" && document.activeElement === qs("#searchInput")) {
      const si = qs("#searchInput");
      si.value = "";
      si.blur();
      qs("#suggestBox") && (qs("#suggestBox").hidden = true);
    }
  });
}
function registerSW() {
  if (!("serviceWorker" in navigator)) return;
  if (settings().features?.offlineMode === false) return;
  const doReg = async () => {
    try {
      const reg = await navigator.serviceWorker.register("/sw.js", { updateViaCache: "none" });
      setInterval(() => {
        reg.update().catch(() => {
        });
      }, 36e5);
      document.addEventListener("visibilitychange", () => {
        if (!document.hidden) reg.update().catch(() => {
        });
      });
    } catch {
    }
  };
  if (document.readyState === "complete") doReg();
  else window.addEventListener("load", doReg, { once: true });
}
function watchBuild() {
  fetch("/api/system/status", { cache: "no-store" }).then((r) => r.ok ? r.json() : null).then((j) => {
    if (j?.build && j.build !== BUILD && !sessionStorage.getItem("bm-upd-seen")) {
      sessionStorage.setItem("bm-upd-seen", "1");
      toast(t("update.available"), {
        timeout: 0,
        action: { label: t("update.reload"), onClick: () => location.reload() }
      });
    }
  }).catch(() => {
  });
}
function wireCursorHalo() {
  if (!matchMedia("(pointer:fine)").matches) return;
  const halo = qs("#cursorHalo");
  if (!halo) return;
  let x = innerWidth / 2, y = innerHeight / 2, cx = x, cy = y, raf2 = 0;
  const tick = () => {
    cx += (x - cx) * 0.22;
    cy += (y - cy) * 0.22;
    halo.style.left = `${cx.toFixed(1)}px`;
    halo.style.top = `${cy.toFixed(1)}px`;
    raf2 = requestAnimationFrame(tick);
  };
  document.addEventListener("pointermove", (e) => {
    if (document.documentElement.classList.contains("eco")) return;
    x = e.clientX;
    y = e.clientY;
    document.documentElement.classList.add("halo-on");
    if (!raf2) raf2 = requestAnimationFrame(tick);
    const hot = e.target.closest?.('a, button, [role="button"], .pcard, .gal-thumb');
    document.documentElement.classList.toggle("halo-hot", !!hot);
  }, { passive: true });
  document.addEventListener("pointerleave", () => {
    document.documentElement.classList.remove("halo-on");
  });
}
function ecoPaused() {
  return document.documentElement.classList.contains("eco");
}
function wireEcoMode() {
  const enter = () => {
    if (document.documentElement.classList.contains("eco")) return;
    document.documentElement.classList.add("eco");
    document.dispatchEvent(new CustomEvent("eco", { detail: { on: true } }));
  };
  const leave = () => {
    if (!document.documentElement.classList.contains("eco")) return;
    document.documentElement.classList.remove("eco");
    document.dispatchEvent(new CustomEvent("eco", { detail: { on: false } }));
    Promise.resolve().then(() => (init_state(), state_exports)).then((sm) => sm.refreshBootstrap?.({ silent: true })).catch(() => {
    });
  };
  const arm = () => {
    clearTimeout(ecoTimer);
    ecoTimer = setTimeout(enter, ECO_IDLE_MS);
  };
  for (const ev of ["pointerdown", "keydown", "wheel", "touchstart", "pointermove"]) document.addEventListener(ev, () => {
    if (document.documentElement.classList.contains("eco")) leave();
    arm();
  }, { passive: true, capture: true });
  arm();
}
function sendVisitBeacon() {
  try {
    if (sessionStorage.getItem("bm_vis")) {
      return;
    }
    sessionStorage.setItem("bm_vis", "1");
    const payload = {
      screen: `${screen.width}x${screen.height}`,
      tz: Intl.DateTimeFormat().resolvedOptions().timeZone || "",
      lang: navigator.language || "",
      ref: document.referrer ? document.referrer.slice(0, 200) : "",
      path: location.hash.replace("#", "") || "/"
    };
    Promise.resolve().then(() => (init_api(), api_exports)).then((a) => a.api.post("/api/track", payload)).catch(() => {
    });
  } catch {
  }
}
var T0, offlineToasted, forceHandle, ECO_IDLE_MS, ecoTimer;
var init_main = __esm({
  "public/js/main.mjs"() {
    init_state();
    init_i18n();
    init_api();
    init_dom();
    init_ui();
    init_actions();
    init_router();
    init_chat();
    init_map();
    init_state();
    init_components();
    T0 = performance.now();
    act("logout", async () => {
      const ok = await confirmDialog({ text: t("common.logout") + "\u061F", okText: t("common.logout") });
      if (!ok) return;
      try {
        await api.post("/api/auth/logout");
        S.me = null;
        await loadCart();
        renderChrome();
        toastSuccess(t("auth.logoutDone"));
        navigate("#/");
        refresh();
      } catch (e) {
        toastError2(t("err.generic"));
      }
    });
    offlineToasted = false;
    act("consent-form", () => {
    });
    act("consent-manage", () => openConsent());
    act("reload", () => location.reload());
    forceHandle = null;
    act("pwd-later", () => {
      try {
        sessionStorage.setItem("bm_pwd_later", "1");
      } catch {
      }
      forceHandle?.close();
      toast(t("auth.pwdLaterToast"));
    });
    act("force-pass", async (e, form) => {
      const d = new FormData(form);
      if (d.get("next") !== d.get("confirm")) {
        toastError2(lang() === "fa" ? "\u062A\u06A9\u0631\u0627\u0631 \u0631\u0645\u0632 \u06CC\u06A9\u0633\u0627\u0646 \u0646\u06CC\u0633\u062A." : "Passwords do not match.");
        return;
      }
      try {
        await api.post("/api/me/password", { current: d.get("current"), next: d.get("next") });
        await refreshMe();
        renderUserArea();
        toastSuccess(t("acc.passwordChanged"));
        forceHandle?.close();
      } catch (err) {
        toastError2(err.message);
      }
    });
    on("boot-slow", () => document.body.classList.add("boot-slow"));
    on("boot-failed", () => {
      document.getElementById("welcomeScreen")?.remove();
      const sp = qs("#bootSplash");
      if (!sp) return;
      sp.innerHTML = html`<div class="empty">
    <h4>${t("boot.failed")}</h4>
    <p class="muted small mt-s">${t("boot.failedHint")}</p>
    <button class="btn btn-primary mt" data-act="reload">${icon("refresh")} ${t("common.retry")}</button>
  </div>`;
    });
    init().catch((e) => {
      console.error("[boot]", e);
      document.getElementById("welcomeScreen")?.remove();
      const splash = qs("#bootSplash");
      if (splash) splash.innerHTML = html`<div class="empty"><h4>${t("err.generic")}</h4><button class="btn btn-primary" data-act="reload">${t("common.retry")}</button></div>`;
    });
    setTimeout(watchBuild, 6e3);
    ECO_IDLE_MS = 4 * 60 * 1e3;
    ecoTimer = 0;
  }
});

// public/js/actions.mjs
function act(name, fn) {
  registry.set(name, fn);
  return fn;
}
function getAct(name) {
  return registry.get(name);
}
async function loadCaptcha(box) {
  if (!box) return;
  const ch = box.querySelector("[data-cch]");
  const img = box.querySelector("[data-cimg]");
  const tok = box.querySelector("[data-ctok]");
  const st = box.querySelector("[data-cst]");
  const ans = box.querySelector("[name=captchaAnswer]");
  if (tok) tok.value = "";
  if (ans) {
    ans.value = "";
    ans.disabled = false;
  }
  const cb = box.querySelector("[name=captchaBox]");
  if (cb) cb.disabled = false;
  try {
    const r = await api.get("/api/captcha");
    if (r.disabled) {
      box.hidden = true;
      return;
    }
    box.hidden = false;
    box.dataset.cid = r.id;
    if (img) img.innerHTML = r.svg || "";
    if (st) st.textContent = t("captcha.hint");
    if (ch) ch.hidden = !cb?.checked;
  } catch {
  }
}
function refreshCaptchaIn(form) {
  const box = form?.querySelector?.("[data-captcha]");
  if (box) {
    box.hidden = false;
    loadCaptcha(box);
  }
}
function installDelegation() {
  document.addEventListener("click", (e) => {
    const el2 = e.target.closest("[data-act]");
    if (!el2) return;
    if (el2.tagName === "FORM") return;
    if (el2.tagName === "A") e.preventDefault();
    const name = el2.dataset.act;
    const fn = registry.get(name);
    if (!fn) {
      console.warn("[actions] unknown:", name);
      return;
    }
    try {
      const r = fn(e, el2);
      if (r && typeof r.catch === "function") r.catch((err) => {
        console.error("[action]", name, err);
        if (err?.code) toastApiError(err);
      });
    } catch (err) {
      console.error("[action]", name, err);
    }
  });
  document.addEventListener("submit", (e) => {
    const form = e.target;
    const name = form?.dataset?.act;
    if (!name) return;
    e.preventDefault();
    const fn = registry.get(name);
    if (!fn) {
      console.warn("[actions] unknown submit:", name);
      return;
    }
    try {
      const r = fn(e, form);
      if (r && typeof r.catch === "function") r.catch((err) => {
        console.error("[action]", name, err);
        if (err?.code) toastApiError(err);
      });
    } catch (err) {
      console.error("[action]", name, err);
    }
  });
  document.addEventListener("change", (e) => {
    const el2 = e.target;
    if (el2.matches?.(".qty input")) return;
    const liveForm = !el2.dataset?.act ? el2.closest?.("form[data-act][data-live]") : null;
    if (!el2.dataset?.act && !liveForm) return;
    const target = el2.dataset?.act ? el2 : liveForm;
    const fn = registry.get(target.dataset.act);
    if (!fn) return;
    try {
      const r = fn(e, target);
      if (r && typeof r.catch === "function") r.catch((err) => console.error(err));
    } catch (err) {
      console.error(err);
    }
  });
  let capDebounce = 0;
  document.addEventListener("input", (e) => {
    const el2 = e.target;
    if (!el2.matches?.("[data-act=captcha-check]")) return;
    clearTimeout(capDebounce);
    capDebounce = setTimeout(() => {
      const fn = registry.get("captcha-check");
      if (fn && !el2.disabled) fn(new Event("change"), el2);
    }, 450);
  });
  document.addEventListener("click", (e) => {
    const b = e.target.closest(".qty [data-q]");
    if (!b) return;
    e.preventDefault();
    const fn = registry.get("qty-btn");
    fn(e, b);
  });
  document.addEventListener("error", (e) => {
    const el2 = e.target;
    if (el2?.tagName !== "IMG" || el2.dataset.fallbackDone) return;
    el2.dataset.fallbackDone = "1";
    const glyph = el2.dataset.glyph || "misc";
    el2.src = placeholderFor(glyph);
  }, true);
}
function placeholderFor(glyph) {
  const d = GLYPH_PATH[glyph] || GLYPH_PATH.box;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="300" height="300"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#123a52"/><stop offset="1" stop-color="#0a2135"/></linearGradient></defs><rect width="100" height="100" fill="url(#g)"/><g fill="none" stroke="#7fd3ec" stroke-opacity=".8" stroke-width="3.4" stroke-linejoin="round" stroke-linecap="round"><path d="${d}"/></g></svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}
var registry, GLYPH_PATH;
var init_actions = __esm({
  "public/js/actions.mjs"() {
    init_state();
    init_i18n();
    init_ui();
    init_api();
    init_dom();
    init_state();
    init_router();
    registry = /* @__PURE__ */ new Map();
    act("add-cart", async (e, el2) => {
      const id = el2.dataset.id;
      const qty = Number(el2.dataset.qty || 1) || 1;
      await withBusy(el2, async () => {
        try {
          await addToCart(id, qty);
          toastSuccess(t("card.added"), { timeout: 2600 });
        } catch (err) {
          toastApiError(err);
        }
      });
    });
    act("wish-toggle", async (e, el2) => {
      if (!S.me) {
        navigate("#/auth?next=" + encodeURIComponent(location.hash.slice(1)));
        return;
      }
      try {
        const r = await toggleWishlist(el2.dataset.id);
        toast(r.in ? t("card.wishlistAdd") : t("card.wishlistRemove"), { timeout: 2e3 });
      } catch (err) {
        toastApiError(err);
      }
    });
    act("compare-toggle", async (e, el2) => {
      if (!S.me) {
        navigate("#/auth?next=" + encodeURIComponent(location.hash.slice(1)));
        return;
      }
      try {
        const r = await toggleCompare(el2.dataset.id);
        if (r.in === false) toast(t("compare.remove"), { timeout: 1800 });
        else toastSuccess(t("compare.add"), { timeout: 1800 });
      } catch (err) {
        toastApiError(err);
      }
    });
    act("notify-me", async (e, el2) => {
      if (!S.me) {
        navigate("#/auth?next=" + encodeURIComponent(location.hash.slice(1)));
        return;
      }
      try {
        const r = await toggleAlert(el2.dataset.id);
        toastSuccess(r.on ? t("common.notified") : t("common.notifyMe"), { timeout: 2400 });
        document.querySelectorAll(`[data-act="notify-me"][data-id="${el2.dataset.id}"]`).forEach((n) => {
          n.classList.toggle("active", r.on);
        });
      } catch (err) {
        toastApiError(err);
      }
    });
    act("lightbox", (e, el2) => {
      let imgs = [];
      try {
        imgs = JSON.parse(el2.dataset.imgs || "[]");
      } catch {
        imgs = [el2.dataset.imgs || ""];
      }
      lightbox(imgs, Number(el2.dataset.i || 0), el2.dataset.alt || "");
    });
    act("sound-toggle", () => {
      const on2 = !S.prefs?.uiSound;
      setPref("uiSound", on2);
      const btn = document.querySelector('[data-act="sound-toggle"]');
      if (btn) {
        btn.setAttribute("aria-pressed", String(on2));
        btn.innerHTML = html`${icon(on2 ? "volume" : "volume-off")} ${t("misc.uiSound")} <span class="um-sw ${on2 ? "on" : ""}" aria-hidden="true"></span>`;
      }
      toast(on2 ? t("misc.uiSoundOn") : t("misc.uiSoundOff"), { timeout: 1600 });
      if (on2) uiClickSound(true);
    });
    act("copy", async (e, el2) => {
      const { copyText: copyText2 } = await Promise.resolve().then(() => (init_dom(), dom_exports));
      try {
        await copyText2(el2.dataset.text || el2.textContent.trim());
        toastSuccess(t("common.copied"), { timeout: 1800 });
      } catch {
        toastError2(t("err.generic"));
      }
    });
    act("share", async (e, el2) => {
      const url = el2.dataset.url || location.href;
      const title15 = el2.dataset.title || document.title;
      if (navigator.share) {
        try {
          await navigator.share({ title: title15, url });
          return;
        } catch {
          return;
        }
      }
      const { copyText: copyText2 } = await Promise.resolve().then(() => (init_dom(), dom_exports));
      try {
        await copyText2(url);
        toastSuccess(t("misc.shareDone"), { timeout: 2e3 });
      } catch {
        toastError2(t("err.generic"));
      }
    });
    act("quick-view", async (e, el2) => {
      const id = el2.dataset.id;
      try {
        const r = await api.get(`/api/products/${encodeURIComponent(id)}`);
        const p = r.product;
        modal({
          title: prodName(p),
          size: "md",
          body: html`
        <div class="row">
          <div class="qv-media">${p.images?.[0] ? html`<img src="${p.images[0]}" alt="${prodName(p)}" class="qv-img" data-glyph="${p.glyph || "misc"}">` : icon(p.glyph || "box")}</div>
          <div class="grow">
            ${p.brandName ? html`<div class="pc-brand">${p.brandName}</div>` : ""}
            <div class="pc-rate mb-s">${stars(p.ratingAvg)} <span class="muted tiny">${fmtNum(p.ratingAvg)} · ${fmtNum(p.ratingCount)} ${t("common.reviews")}</span></div>
            <div class="buy-price">
              ${p.oldPrice > p.price ? html`<span class="pc-old">${fmtMoney(p.oldPrice)}</span>` : ""}
              <span class="buy-now">${fmtMoney(p.price)}</span>
            </div>
            <div class="pc-stock ${p.stock <= 0 ? "out" : p.stock <= 3 ? "low" : ""}"><span class="dot"></span>${p.stock <= 0 ? t("card.outOfStock") : t("pdp.stockCount", { n: fmtNum(p.stock) })}</div>
          </div>
        </div>
        ${p.description ? html`<p class="muted small mt-s">${esc(p.description).slice(0, 220)}…</p>` : ""}
        <div class="row mt">
          <a class="btn btn-ghost" href="#/product/${p.id}">${t("common.details")} ${icon("chevron-left")}</a>
        </div>`,
          footer: html`
        <button type="button" class="btn btn-ghost" data-close>${t("common.close")}</button>
        <button type="button" class="btn btn-primary" data-add ${p.stock <= 0 ? "disabled" : ""}>${icon("cart")} ${t("pdp.addToCart")}</button>`,
          onMount: (panel, handle) => {
            panel.querySelector("[data-close]").addEventListener("click", () => handle.close());
            panel.querySelector("[data-add]").addEventListener("click", async (ev) => {
              await withBusy(ev.currentTarget, async () => {
                try {
                  await addToCart(p.id, 1);
                  toastSuccess(t("card.added"), { timeout: 2200 });
                  handle.close();
                } catch (err) {
                  toastApiError(err);
                }
              });
            });
          }
        });
      } catch (err) {
        toastApiError(err);
      }
    });
    act("ui-retry", () => {
      Promise.resolve().then(() => (init_router(), router_exports)).then((m) => m.refresh());
    });
    act("scroll-top", () => window.scrollTo({ top: 0, behavior: "smooth" }));
    act("qty-btn", (e, el2) => {
      const wrap = el2.closest(".qty");
      const input = wrap?.querySelector("input");
      if (!input) return;
      const d = Number(el2.dataset.q || 0);
      const min = Number(input.min || 1);
      const max = Number(input.max || 99);
      const v = Math.max(min, Math.min(max, (Number(input.value) || min) + d));
      input.value = v;
      input.dispatchEvent(new Event("change", { bubbles: true }));
    });
    act("confirm-nav", async (e, el2) => {
      const ok = await confirmDialog({ text: el2.dataset.text || t("misc.confirmDelete"), danger: el2.dataset.danger === "1", okText: el2.dataset.ok || "" });
      if (ok && el2.dataset.href) navigate(el2.dataset.href);
    });
    act("acc", (e, el2) => {
      const item = el2.closest(".acc-item");
      if (!item) return;
      const open = item.classList.toggle("open");
      const body = item.querySelector(".acc-b");
      if (body) body.hidden = !open;
      el2.setAttribute("aria-expanded", String(open));
    });
    act("print-page", () => {
      window.print();
    });
    act("captcha-open", (e, input) => {
      const box = input.closest("[data-captcha]");
      const ch = box?.querySelector("[data-cch]");
      if (!ch) return;
      ch.hidden = !input.checked;
      if (input.checked && !box.dataset.cid) loadCaptcha(box);
    });
    act("captcha-refresh", (e, btn) => loadCaptcha(btn.closest("[data-captcha]")));
    act("captcha-check", async (e, input) => {
      const box = input.closest("[data-captcha]");
      if (!box || input.disabled || box.dataset.verifying) return;
      const st = box?.querySelector("[data-cst]");
      const tok = box?.querySelector("[data-ctok]");
      const val = String(input.value || "").trim();
      if (!val || !box?.dataset.cid) return;
      box.dataset.verifying = "1";
      try {
        const r = await api.post("/api/captcha/verify", { id: box.dataset.cid, answer: val });
        if (tok) tok.value = r.token || "";
        const cb = box.querySelector("[name=captchaBox]");
        if (cb) {
          cb.checked = true;
          cb.disabled = true;
        }
        input.disabled = true;
        if (st) st.textContent = t("captcha.solved");
      } catch (err) {
        if (st) st.textContent = err?.message || t("captcha.hint");
        await loadCaptcha(box);
      } finally {
        delete box.dataset.verifying;
      }
    });
    act("noop", () => {
    });
    GLYPH_PATH = {
      cable: "M30 40h14v14H30zM37 54c0 18 12 20 20 14s20-4 22 8M62 66h16v12H62z",
      adapter: "M34 34h32v34H34zM42 34V22M58 34V22M44 68h12v8H44z",
      shield: "M34 22h32v56H34zM40 28h12v16H40z",
      layers: "M36 26h28v48H36zM30 34l30-14 30 14",
      battery: "M26 40h48v26H26zM32 46h8v14h-8zM44 46h8v14h-8z",
      plug: "M24 42h34v16H24zM58 36h22v28H58z",
      speaker: "M30 24h40v52H30zM50 54a10 10 0 1 0 0 .1M50 32a5 5 0 1 0 0 .1",
      headset: "M28 56a22 22 0 0 1 44 0M24 52h10v20H24zM66 52h10v20H66z",
      watch: "M38 34h24v32H38zM42 14h16v20H42zM42 66h16v20H42z",
      camera: "M50 18a18 18 0 1 0 0 36 18 18 0 0 0 0-36zM50 54v34M50 88l-14-24M50 88l14-24",
      zap: "M26 44h14l6-8h10l6 8h14a10 10 0 0 1 0 20H26a10 10 0 0 1 0-20",
      truck: "M38 28h24v30H38zM44 58h12v10H44z",
      light: "M30 26h18l6 12H24zM34 38h20v40H34z",
      mic: "M42 18h16v28H42zM36 40a14 14 0 0 0 28 0M50 54v30M36 86h28",
      box: "M26 36 50 24l24 12v28L50 76 26 64zM26 36l24 12 24-12M50 48v28",
      phone: "M36 16h28v68H36zM44 74h12"
    };
    act("pdp-lower-price", (e, el2) => {
      const id = el2.dataset.id;
      Promise.resolve().then(() => (init_ui(), ui_exports)).then(({ modal: modal2 }) => {
        modal2({
          title: "\u06AF\u0632\u0627\u0631\u0634 \u0642\u06CC\u0645\u062A \u0645\u0646\u0627\u0633\u0628\u200C\u062A\u0631",
          content: html`
        <form data-act="submit-lower-price" data-id="${id}">
          <p class="mb">اگر این کالا را در فروشگاه دیگری با قیمت پایین‌تر دیده‌اید، به ما اطلاع دهید:</p>
          <div class="form-grid mb">
            ${field({ label: "\u0642\u06CC\u0645\u062A \u0641\u0631\u0648\u0634\u06AF\u0627\u0647 \u062F\u06CC\u06AF\u0631 (\u062A\u0648\u0645\u0627\u0646)", name: "price", type: "number", required: true })}
            ${field({ label: "\u0622\u062F\u0631\u0633 \u0641\u0631\u0648\u0634\u06AF\u0627\u0647 (\u0644\u06CC\u0646\u06A9 \u0633\u0627\u06CC\u062A \u06CC\u0627 \u0646\u0627\u0645)", name: "url", required: true })}
          </div>
          <div class="row row-wrap mt">
            <button type="submit" class="btn btn-primary">${icon("send")} ثبت</button>
            <button type="button" class="btn btn-ghost" data-act="modal-close">لغو</button>
          </div>
        </form>
      `
        });
      });
    });
    act("submit-lower-price", async (e, form) => {
      e.preventDefault();
      const { withBusy: withBusy2, toastSuccess: toastSuccess2, toastApiError: toastApiError2 } = await Promise.resolve().then(() => (init_ui(), ui_exports));
      await withBusy2(form, async () => {
        try {
          await api.post("/api/reports/lower-price", {
            productId: form.dataset.id,
            price: Number(form.price.value),
            url: form.url.value
          });
          toastSuccess2("\u0628\u0627 \u062A\u0634\u06A9\u0631! \u06AF\u0632\u0627\u0631\u0634 \u0634\u0645\u0627 \u062B\u0628\u062A \u0634\u062F.");
          form.closest('[role="dialog"]')?.querySelector("[data-lx]")?.click();
        } catch (err) {
          toastApiError2(err);
        }
      });
    });
    act("accept-consent-now", async (e, el2) => {
      const { setConsent: setConsent2 } = await Promise.resolve().then(() => (init_state(), state_exports));
      setConsent2({ terms: true, privacy: true, marketing: false });
      toastSuccess(isFa() ? "\u0642\u0648\u0627\u0646\u06CC\u0646 \u0648 \u0645\u0642\u0631\u0631\u0627\u062A \u0628\u0627 \u0645\u0648\u0641\u0642\u06CC\u062A \u067E\u0630\u06CC\u0631\u0641\u062A\u0647 \u0634\u062F." : "Terms accepted.");
      sessionStorage.removeItem("consentDeferred");
      const { maybeConsent: maybeConsent3 } = await Promise.resolve().then(() => (init_main(), main_exports));
      maybeConsent3();
      Promise.resolve().then(() => (init_router(), router_exports)).then((m) => m.refresh());
    });
  }
});

// public/js/views/checkout.mjs
var checkout_exports = {};
__export(checkout_exports, {
  mount: () => mount30,
  render: () => render33,
  title: () => title14
});
async function render33(ctx) {
  await loadCart().catch(() => {
  });
  if (!S.cart.items?.length) {
    return emptyState({ icon: "cart", title: t("cart.empty"), text: t("cart.emptyText"), action: { href: "#/products", label: t("cart.goShopping") } });
  }
  if (!S.me) {
    return emptyState({ icon: "user", title: t("checkout.loginRequired"), action: { href: "#/auth?next=checkout", label: t("nav.login") } });
  }
  if (S.me.kycStatus !== "approved") {
    return emptyState({
      icon: "shield-alert",
      title: "\u0627\u062D\u0631\u0627\u0632 \u0647\u0648\u06CC\u062A \u0646\u0627\u0642\u0635 \u0627\u0633\u062A",
      text: "\u062C\u0647\u062A \u062C\u0644\u0648\u06AF\u06CC\u0631\u06CC \u0627\u0632 \u062A\u0642\u0644\u0628 \u0648 \u0628\u0627 \u062A\u0648\u062C\u0647 \u0628\u0647 \u0627\u0644\u0632\u0627\u0645\u0627\u062A \u0642\u0627\u0646\u0648\u0646\u06CC\u060C \u062B\u0628\u062A \u0633\u0641\u0627\u0631\u0634 \u0646\u06CC\u0627\u0632\u0645\u0646\u062F \u062A\u0623\u06CC\u06CC\u062F \u0647\u0648\u06CC\u062A \u0627\u0633\u062A.",
      action: { href: "#/account/kyc", label: "\u062A\u06A9\u0645\u06CC\u0644 \u0627\u062D\u0631\u0627\u0632 \u0647\u0648\u06CC\u062A" }
    });
  }
  const sh = ship();
  const zones = sh.zones || [];
  const addresses = S.me?.addresses || [];
  try {
    const q = await api.post("/api/checkout/quote", { delivery: "courier", zone: zones[0]?.id || "country", express: false, insurance: false });
    quote = q.quote;
    payMethods = (q.paymentMethods || []).filter((m) => S.me ? true : m.id === "cod" || m.id === "gateway");
    if (!payMethods.length) payMethods = [{ id: "cod", fa: "\u067E\u0631\u062F\u0627\u062E\u062A \u062F\u0631 \u0645\u062D\u0644", en: "Cash on delivery", note: "" }];
  } catch (e) {
    quote = null;
  }
  return html`
    <div class="section-head"><div><h1 class="section-title">${icon("card")} ${t("checkout.title")}</h1></div></div>
    <div class="checkout-steps">
      <span class="cstep active"><span class="n">1</span> ${t("checkout.step1")}</span>
      <span class="cstep"><span class="n">2</span> ${t("checkout.step2")}</span>
      <span class="cstep"><span class="n">3</span> ${t("checkout.step3")}</span>
    </div>

    <form class="cart-grid" data-act="checkout-submit" novalidate>
      <div class="col">
        <section class="card">
          <strong class="row mb-s">${icon("truck")} ${t("checkout.delivery")}</strong>
          <div class="col">
            <label class="radio-card">
              <input type="radio" name="delivery" value="pickup" ${sh.pickupEnabled === false ? "disabled" : ""} ${S.me ? "" : "checked"}>
              <span class="dot"></span>
              <span><span class="b">${t("checkout.pickup")}</span><span class="hint" >${t("checkout.pickupDesc")} ${t("checkout.pickupReady", { h: fmtNum(sh.handlingHours || 24) })}</span></span>
            </label>
            <label class="radio-card${S.me ? "" : " disabled"}">
              <input type="radio" name="delivery" value="courier" ${S.me ? "checked" : "disabled"} ${sh.courierEnabled === false ? "disabled" : ""}>
              <span class="dot"></span>
              <span><span class="b">${t("checkout.courier")}</span><span class="hint">${t("checkout.courierDesc")}${S.me ? "" : ` \u2014 ${t("checkout.guestCourierNote")}`}</span></span>
            </label>
          </div>

          <div data-courier-opts class="mt">
            <label class="field"><span class="label">${t("checkout.zone")}</span>
              <select class="select" name="zone">
                ${zones.map((z) => html`<option value="${z.id}">${isFa2() ? z.name : z.nameEn} — ${fmtNum(z.fee)} ${t("common.toman")} · ${isFa2() ? z.eta : ""}</option>`)}
              </select>
            </label>
            ${sh.expressEnabled ? switchField({ label: t("checkout.express"), desc: `${fmtNum(sh.expressFee || 0)} ${t("common.toman")}${isPlus() ? ` \xB7 ${t("acc.plus")}: \u2212${fmtNum(sh.expressDiscountPct || 50)}\u066A` : ""}`, name: "express" }) : ""}
            ${feat("insurance") ? switchField({ label: t("checkout.insuranceOpt"), desc: isPlus() && S.settings?.plus?.autoInsurance ? t("checkout.insuranceAuto") : t("checkout.insuranceDesc"), name: "insurance", checked: isPlus() }) : ""}

            <div class="divider"></div>
            <strong class="row mb-s">${icon("pin")} ${t("checkout.address")}</strong>
            ${!S.me ? html`
              <div class="form-grid mt-s">
                ${field2({ label: isFa2() ? "\u0627\u0633\u062A\u0627\u0646" : "Province", name: "guestProvince" })}
                ${field2({ label: isFa2() ? "\u0634\u0647\u0631" : "City", name: "guestCity" })}
                ${field2({ label: isFa2() ? "\u0622\u062F\u0631\u0633 \u06A9\u0627\u0645\u0644 (\u062E\u06CC\u0627\u0628\u0627\u0646\u060C \u06A9\u0648\u0686\u0647\u060C \u067E\u0644\u0627\u06A9\u060C \u0648\u0627\u062D\u062F)" : "Full Address", name: "guestAddress", span2: true })}
                ${field2({ label: isFa2() ? "\u06A9\u062F \u067E\u0633\u062A\u06CC (\u0627\u062E\u062A\u06CC\u0627\u0631\u06CC)" : "Postal Code", name: "guestZip", type: "tel", attrs: 'inputmode="numeric"' })}
              </div>
            ` : addresses.length ? html`
              <div class="col" data-addresses>
                ${addresses.map((a, i) => html`
                  <label class="addr-card">
                    <input type="radio" name="addressId" value="${a.id}" ${a.isDefault || i === 0 ? "checked" : ""}>
                    <span class="dot"></span>
                    <span>
                      <span class="b">${esc(a.title || t("common.address"))}</span>
                      <span class="hint">${esc(a.receiver || "")} · ${fmtTel(a.phone || "")}<br>${esc(a.street || "")}${a.city ? `\u060C ${esc(a.city)}` : ""}${a.postal ? ` \xB7 ${esc(a.postal)}` : ""}</span>
                    </span>
                  </label>`)}
              </div>
              <button type="button" class="btn btn-ghost btn-sm mt-s" data-act="addr-add">${icon("plus")} ${t("checkout.addAddress")}</button>
            ` : html`
              <p class="notice notice-warn">${icon("alert")}<span>${t("checkout.noAddress")}</span></p>
              <button type="button" class="btn btn-ghost btn-sm mt-s" data-act="addr-add">${icon("plus")} ${t("checkout.addAddress")}</button>
            `}
          </div>
        </section>

        ${!S.me ? html`
        <section class="card">
          <strong class="row mb-s">${icon("user")} ${t("checkout.guestInfo")}</strong>
          <p class="hint mb-s">${t("checkout.guestHint")}</p>
          <div class="form-grid">
            ${field2({ label: t("checkout.guestName"), name: "guestName", required: true, autocomplete: "name" })}
            ${field2({ label: t("checkout.guestPhone"), name: "guestPhone", type: "tel", required: true, autocomplete: "tel", attrs: 'inputmode="numeric" maxlength="11" placeholder="09xxxxxxxxx"', hint: t("checkout.guestPhoneHint") })}
          </div>
        </section>` : ""}

        <section class="card">
          <strong class="row mb-s">${icon("wallet")} ${t("checkout.paymentMethod")}</strong>
          <div class="col" data-paymethods>
            ${(payMethods.length ? payMethods : [{ id: "gateway", fa: "\u062F\u0631\u06AF\u0627\u0647 \u0628\u0627\u0646\u06A9\u06CC", en: "Bank gateway", note: "" }]).map((m, i) => html`
              <label class="radio-card">
                <input type="radio" name="paymentMethod" value="${m.id}" ${i === 0 ? "checked" : ""} ${m.disabled || ["snapppay", "azki", "digipay"].includes(m.id) && (!S.me || S.me.kycStatus !== "approved") ? "disabled" : ""}>
                <span class="dot"></span>
                <span><span class="b">${isFa2() ? m.fa : m.en}</span><span class="hint">${esc(m.note || "")}${m.id === "gateway" && ordersCfg().gatewayMode === "demo" ? ` \u2014 ${t("checkout.gatewayDemo")}` : ""}${["snapppay", "azki", "digipay"].includes(m.id) && (!S.me || S.me.kycStatus !== "approved") && !m.disabled ? ' <span style="color:var(--danger)">(\u0646\u06CC\u0627\u0632\u0645\u0646\u062F \u0627\u062D\u0631\u0627\u0632 \u0647\u0648\u06CC\u062A)</span>' : ""}</span></span>
              </label>`)}
          </div>
          ${!S.me ? html`<p class="hint mt-s" data-guest-cod-note hidden>${t("checkout.guestCodPickup")}</p>` : ""}
          ${S.me && feat("wallet") && (S.me.wallet?.balance || 0) > 0 ? switchField({ label: t("checkout.useWallet"), desc: t("checkout.walletBalance", { amount: fmtNum(S.me.wallet.balance) }), name: "useWallet", checked: true }) : ""}
          <label class="field mt"><span class="label">${t("checkout.note")}</span><textarea class="textarea" name="note" rows="2" maxlength="400" placeholder="${t("checkout.notePlaceholder")}"></textarea></label>
        </section>

        <section class="card">
          ${checkField({ label: html`${t("checkout.acceptTerms")} <a class="section-link" href="#/pages/terms">${t("consent.readTerms")}</a>`, name: "acceptTerms", checked: true })}
          <p class="hint mt-s">${t("checkout.concurrencyNote")}</p>
        </section>
      </div>

      <aside class="summary card">
        <strong>${t("cart.summary")}</strong>
        <div data-quote>${quote ? summaryRows(quote) : html`<div class="sk sk-line w100"></div>`}</div>
        <button class="btn btn-primary btn-block btn-lg mt" type="submit">${icon("check")} ${t("checkout.placeOrder")}</button>
        <a class="btn btn-ghost btn-block mt-s" href="#/cart">${icon("chevron-right")} ${t("cart.title")}</a>
      </aside>
    </form>`;
}
async function requote(form) {
  const fd = new FormData(form);
  try {
    const q = await api.post("/api/checkout/quote", {
      delivery: fd.get("delivery") || "courier",
      zone: fd.get("zone") || "country",
      express: fd.get("express") === "on",
      insurance: fd.get("insurance") === "on"
    });
    quote = q.quote;
    const box = form.querySelector("[data-quote]");
    if (box) box.innerHTML = summaryRows(quote);
    const co = form.querySelector("[data-courier-opts]");
    const delivery = fd.get("delivery");
    if (co) co.hidden = delivery !== "courier";
    if (!S.me) {
      const cod = form.querySelector('input[name="paymentMethod"][value="cod"]');
      if (cod) {
        cod.disabled = delivery === "pickup";
        cod.closest(".radio-card")?.classList.toggle("disabled", delivery === "pickup");
        const note = form.querySelector("[data-guest-cod-note]");
        if (note) note.hidden = delivery !== "pickup";
        if (cod.disabled && cod.checked) {
          const gw = form.querySelector('input[name="paymentMethod"][value="gateway"]');
          if (gw) gw.checked = true;
        }
      }
    }
  } catch {
  }
}
function mount30(root) {
  applyDyn(root);
  const form = root.querySelector('form[data-act="checkout-submit"]');
  if (!form) return null;
  const rq = debounce(() => requote(form), 220);
  form.addEventListener("change", rq);
  requote(form);
  act("addr-add", () => openAddressModal());
  act("checkout-submit", async (e, f) => {
    e.preventDefault();
    const fd = new FormData(f);
    if (!fd.get("acceptTerms")) {
      toastError2(t("form.termsRequired"));
      return;
    }
    if (S.me && fd.get("delivery") === "courier" && !fd.get("addressId")) {
      toastError2(t("checkout.noAddress"));
      return;
    }
    if (!S.me && fd.get("delivery") === "courier") {
      if (!fd.get("guestProvince") || !fd.get("guestCity") || !fd.get("guestAddress")) {
        toastError2(isFa2() ? "\u0644\u0637\u0641\u0627\u064B \u0622\u062F\u0631\u0633 \u067E\u0633\u062A\u06CC \u0631\u0627 \u06A9\u0627\u0645\u0644 \u0648\u0627\u0631\u062F \u06A9\u0646\u06CC\u062F." : "Please enter your shipping address.");
        return;
      }
    }
    if (!S.me) {
      if (!String(fd.get("guestName") || "").trim()) {
        toastError2(t("checkout.guestNameRequired"));
        return;
      }
      if (!/^09\d{9}$/.test(String(fd.get("guestPhone") || "").replace(/[\s-]/g, ""))) {
        toastError2(t("checkout.guestPhoneInvalid"));
        return;
      }
    }
    await withBusy(f.querySelector("button[type=submit]"), async () => {
      try {
        const r = await api.post("/api/checkout", {
          delivery: fd.get("delivery"),
          zone: fd.get("zone"),
          express: fd.get("express") === "on",
          insurance: fd.get("insurance") === "on",
          paymentMethod: fd.get("paymentMethod") || "gateway",
          useWallet: fd.get("useWallet") === "on",
          note: fd.get("note") || "",
          addressId: fd.get("addressId") || "",
          guestName: S.me ? "" : String(fd.get("guestName") || "").trim(),
          guestPhone: S.me ? "" : String(fd.get("guestPhone") || "").replace(/[\s-]/g, ""),
          acceptTerms: true
        });
        if (r.me) {
          S.me = r.me;
          refreshMe();
        }
        try {
          sessionStorage.setItem("bm_last_order", JSON.stringify(r.order));
        } catch {
        }
        await loadCart();
        if (r.needsPayment && ["gateway", "snapppay", "azki", "digipay"].includes(r.paymentMethod)) navigate(`#/pay/${r.order.id}`);
        else navigate(`#/checkout/done/${r.order.id}`);
      } catch (err) {
        toastApiError(err);
        if (err?.code === "stock_limit" || err?.code === "product_unavailable") refresh(true);
      }
    });
  });
  return null;
}
function openAddressModal() {
  if (!S.me) {
    navigate("#/auth?next=checkout");
    return;
  }
  addrHandle = modal({
    title: t("acc.addAddress"),
    body: html`
      <form data-act="addr-save" class="form-grid">
        ${field2({ label: t("acc.addrTitle"), name: "title", required: true })}
        ${field2({ label: t("acc.addrReceiver"), name: "receiver", required: true, value: S.me.name || "" })}
        ${field2({ label: t("acc.addrPhone"), name: "phone", type: "tel", required: true, value: S.me.phone || "" })}
        ${field2({ label: t("common.city"), name: "city", value: S.settings?.store?.city || "" })}
        ${field2({ label: t("common.postal"), name: "postal" })}
        ${field2({ label: t("acc.addrStreet"), name: "street", required: true, span2: true })}
        ${field2({ label: t("acc.addrNote"), name: "note", span2: true })}
        <label class="check span-2"><input type="checkbox" name="isDefault"><span class="box">${icon("check")}</span><span>${t("acc.addrDefault")}</span></label>
        <button class="btn btn-primary span-2" type="submit">${t("common.save")}</button>
      </form>`
  });
}
var quote, payMethods, addrHandle, title14;
var init_checkout = __esm({
  "public/js/views/checkout.mjs"() {
    init_dom();
    init_i18n();
    init_api();
    init_state();
    init_components();
    init_ui();
    init_actions();
    init_router();
    quote = null;
    payMethods = [];
    addrHandle = null;
    act("addr-save", async (e, form) => {
      e.preventDefault();
      const fd = new FormData(form);
      const payload = Object.fromEntries(fd.entries());
      payload.isDefault = fd.get("isDefault") === "on";
      try {
        const r = await api.post("/api/me/addresses", payload);
        if (r.addresses && S.me) S.me.addresses = r.addresses;
        toastSuccess(t("acc.addrSaved"));
        addrHandle?.close();
        refresh(true);
      } catch (err) {
        toastApiError(err);
      }
    });
    title14 = () => t("checkout.title");
  }
});
init_checkout();
export {
  mount30 as mount,
  render33 as render,
  title14 as title
};
