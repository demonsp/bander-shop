// ─────────────────────────────────────────────────────────────
//  ساخت نسخهٔ تک‌فایلی آفلاین: node tools/standalone-build.mjs
//  خروجی: /home/user/bander-mobile-offline.html
// ─────────────────────────────────────────────────────────────
import { readFileSync, writeFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, relative, dirname } from 'node:path';

const ROOT = '/home/user';
const JS = join(ROOT, 'public/js');
const OUT = join(ROOT, 'bander-mobile-offline.html');

// ── فهرست ماژول‌ها ───────────────────────────────────────────
function walk(dir, out = []) {
  for (const e of readdirSync(dir)) {
    const p = join(dir, e);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (p.endsWith('.mjs')) out.push(p);
  }
  return out;
}
let files = walk(JS).map((f) => relative(JS, f).split('\\').join('/'));
files = files.filter((f) => f !== 'lib/api.mjs'); // با shim جایگزین می‌شود
files.push('lib/api.mjs→standalone');

// ── تبدیل ماژول به فرم ثبت‌شونده ─────────────────────────────
function transform(src, id) {
  const exports = [];
  let s = src;
  // import('...') پویا
  s = s.replace(/import\(\s*['"]([^'"]+)['"]\s*\)/g, (m, from) => `Promise.resolve(__req('${resolveId(from, id)}'))`);
  // import { a, b as c } from './x.mjs';  (چندخطی هم باشد)
  s = s.replace(/import\s*\{([\s\S]*?)\}\s*from\s*['"]([^'"]+)['"];?/g, (m, names, from) => {
    const target = resolveId(from, id);
    const pairs = names.split(',').map((x) => x.trim()).filter(Boolean).map((x) => {
      const mm = x.split(/\s+as\s+/);
      return mm.length === 2 ? `${mm[0].trim()}: ${mm[1].trim()}` : `${x}: ${x}`;
    });
    return `const { ${pairs.join(', ')} } = __req('${target}');`;
  });
  s = s.replace(/import\s*['"]([^'"]+)['"];?/g, (m, from) => `__req('${resolveId(from, id)}');`);
  // export { a, b } from './x.mjs';
  s = s.replace(/export\s*\{([\s\S]*?)\}\s*from\s*['"]([^'"]+)['"];?/g, (m, names, from) => {
    const target = resolveId(from, id);
    const list = names.split(',').map((x) => x.trim()).filter(Boolean);
    for (const n of list) exports.push(n.split(/\s+as\s+/).pop());
    return `const { ${list.map((n) => n.split(/\s+as\s+/)[0]).join(', ')} } = __req('${target}');`;
  });
  // export { a, b };
  s = s.replace(/export\s*\{([^}]*)\}\s*;?/g, (m, names) => {
    for (const n of names.split(',').map((x) => x.trim()).filter(Boolean)) exports.push(n.split(/\s+as\s+/)[0]);
    return '';
  });
  // export function / const / let / class
  s = s.replace(/export\s+(function|async function|class)\s+([A-Za-z0-9_$]+)/g, (m, kw, name) => { exports.push(name); return `${kw} ${name}`; });
  s = s.replace(/export\s+(const|let|var)\s+([A-Za-z0-9_$]+)/g, (m, kw, name) => { exports.push(name); return `${kw} ${name}`; });
  if (/export\s+default/.test(s)) throw new Error(`default export in ${id}`);
  const getters = exports.length
    ? `Object.defineProperties(__exports, { ${exports.map((n) => `${JSON.stringify(n)}: { get: () => ${n}, enumerable: true }`).join(', ')} });`
    : '';
  return `__def(${JSON.stringify(id)}, function (__req, __exports) {\n${getters}\n${s}\n});`;
}
function resolveId(from, selfId) {
  if (from === './lib/api.mjs' || from.endsWith('/lib/api.mjs')) return 'lib/api.mjs';
  const base = dirname(selfId === 'lib/api.mjs→standalone' ? 'lib/api.mjs' : selfId);
  const p = (from.startsWith('.') ? join(base, from) : from).split('\\').join('/');
  return p;
}

// ── باندل ────────────────────────────────────────────────────
const parts = [];
for (const f of files) {
  const real = f === 'lib/api.mjs→standalone' ? join(ROOT, 'tools/standalone/api-browser.mjs') : join(JS, f);
  const id = f === 'lib/api.mjs→standalone' ? 'lib/api.mjs' : f;
  parts.push(transform(readFileSync(real, 'utf-8'), id));
}
let bundle = `(function(){
'use strict';
const __REG = {}, __CACHE = {};
function __def(id, fn){ __REG[id] = fn; }
function __req(id){
  if (__CACHE[id]) return __CACHE[id];
  if (!__REG[id]) throw new Error('module not found: ' + id);
  const ex = {}; __CACHE[id] = ex; __REG[id](__req, ex); return ex;
}
${parts.join('\n')}
__req('main.mjs');
if (typeof window !== 'undefined') window.__REQ = __req;
})();`;

// ── دادهٔ اولیه ──────────────────────────────────────────────
const db = JSON.parse(readFileSync(join(ROOT, 'data/db.json'), 'utf-8'));
const PASS = { admin: 'Bander@1404', staff: 'Staff@1404', maryam: 'Demo@1404', reza: 'Demo@1404', sina: 'Demo@1404' };
const seed = {
  products: db.products, categories: db.categories, brands: db.brands, pages: db.pages,
  settings: db.settings, coupons: db.coupons, ads: db.ads, notifications: db.notifications || [],
  orders: db.orders, reviews: db.reviews, tickets: db.tickets, feedback: db.feedback || [],
  supportMessages: db.supportMessages || [], audit: (db.audit || []).slice(0, 200), carts: [], barcodeLog: [],
  meta: {}, visits: {},
  users: db.users.map((u) => ({ ...u, password: PASS[u.username] || 'Demo@1404' })),
};

// ── دارایی‌ها (data URI) ─────────────────────────────────────
const ASSETS = {};
function addAsset(rel) {
  const p = join(ROOT, 'public', rel);
  if (!existsSync(p)) return;
  const b = readFileSync(p);
  const mime = rel.endsWith('.svg') ? 'image/svg+xml' : rel.endsWith('.woff2') ? 'font/woff2' : rel.endsWith('.png') ? 'image/png' : 'application/octet-stream';
  ASSETS['/' + rel] = `data:${mime};base64,${b.toString('base64')}`;
}
for (const f of readdirSync(join(ROOT, 'public/assets/img/products'))) addAsset(`assets/img/products/${f}`);
for (const f of readdirSync(join(ROOT, 'public/assets/img/brands'))) addAsset(`assets/img/brands/${f}`);
for (const f of ['assets/img/hero-port.svg', 'assets/img/favicon.svg', 'assets/img/og-cover.svg']) addAsset(f);
for (const f of readdirSync(join(ROOT, 'public/assets/fonts'))) addAsset(`assets/fonts/${f}`);

// ── CSS ──────────────────────────────────────────────────────
let css = readFileSync(join(ROOT, 'public/css/app.css'), 'utf-8');
css = css.replace(/url\((['"]?)(\/[^)]+)\1\)/g, (m, q, path) => (ASSETS[path] ? `url(${ASSETS[path]})` : m));

// جایگذاری لیترال‌های دارایی داخل کد (مثل تصویر hero)
for (const [path, data] of Object.entries(ASSETS)) {
  if (path.endsWith('.svg') && bundle.includes(`"${path}"`)) bundle = bundle.split(`"${path}"`).join(`"${data}"`);
}

// ── HTML ─────────────────────────────────────────────────────
let html = readFileSync(join(ROOT, 'public/index.html'), 'utf-8');
html = html.replace(/<link rel="manifest"[^>]*>/, '');
html = html.replace(/<link rel="icon"[^>]*>/, '');
html = html.replace(/<link rel="apple-touch-icon"[^>]*>/, '');
html = html.replace(/<link rel="stylesheet"[^>]*>/, '');
html = html.replace(/<script type="module"[^>]*><\/script>/, '');
for (const [path, data] of Object.entries(ASSETS)) html = html.split(`"${path}"`).join(`"${data}"`);
const vendor = ['public/js/vendor/qrcode-generator.js', 'public/js/vendor/jsbarcode.all.min.js']
  .map((f) => `<script>${readFileSync(join(ROOT, f), 'utf-8')}</script>`).join('\n');

const finalHtml = html.replace('</head>', `<style>\n${css}\n</style>\n</head>`)
  .replace('</body>', `
<script>window.__SEED = ${JSON.stringify(seed)};</script>
<script>window.__ASSETS = ${JSON.stringify(ASSETS)};</script>
${vendor}
<script>
${bundle}
</script>
</body>`);

writeFileSync(OUT, finalHtml);
const kb = (Buffer.byteLength(finalHtml) / 1024).toFixed(0);
console.log(`✔ ساخته شد: ${OUT} (${kb} KB)`);
console.log('  ماژول‌ها:', parts.length, '· دارایی‌ها:', Object.keys(ASSETS).length);
writeFileSync('/tmp/bundle-extract.js', bundle);
