// ─────────────────────────────────────────────────────────────
//  نقطهٔ ورود برنامه: راه‌اندازی، اسکلت سایت، جست‌وجو، پالت فرمان
// ─────────────────────────────────────────────────────────────
import {
  S, boot, on, settings, store, ui, feat, can, refreshBootstrap,
  setPref, applyPrefs, loadCart, refreshMe, hasConsent, setConsent,
  watchNetwork, watchInstall, promptInstall, adInSlot, isPlus, addSearch,
} from './state.mjs';
import { t, lang, isFa, applyI18n, setLang } from './i18n.mjs';
import { api } from './lib/api.mjs';
import { html as h, raw, esc, icon, el, qs, debounce, fmtNum, faDigits, catIcon, applyDyn } from './lib/dom.mjs';
import { toast, toastSuccess, toastError, toastApiError, modal, drawer, confirmDialog, installHintModal, updateSleepScreen } from './ui.mjs';
import { installDelegation, act } from './actions.mjs';
import { initRouter, navigate, refresh, parseHash } from './router.mjs';
import { initChat, openChat } from './chat.mjs';
import './map.mjs';
import { catName, brandName, prodName } from './state.mjs';
import { bannerHtml, minimapSvg } from './components.mjs';

// ── راه‌اندازی ──────────────────────────────────────────────
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
  wireSearchShortcut();
  maybeCouponFromUrl();
  maybeConsent();
  maybeForcePasswordChange();
  document.getElementById('bootSplash')?.remove();
}

// ── اسکلت سایت ──────────────────────────────────────────────
function renderChrome() {
  const st = store();
  const u = ui();

  // نوار بالا
  const topbar = qs('#topbar');
  const tickerItems = (u.showTicker !== false ? (S.ticker || []) : []);
  if (tickerItems.length) {
    topbar.hidden = false;
    const one = tickerItems.map((x) => h`<span class="ticker-item">${icon('sparkles')} ${x}</span>`).join('');
    qs('#ticker').innerHTML = `<div class="ticker-track">${one}${one}</div>`;
  } else topbar.hidden = true;
  const tbPhone = qs('#tb-phone');
  tbPhone.href = `tel:${st.phone || ''}`;
  tbPhone.innerHTML = h`${icon('phone')} ${fmtNum(st.phone || '')}`;

  // برند
  qs('#brandName').textContent = isFa() ? (st.name || t('app.name')) : (st.nameEn || st.name || 'Bander Mobile');
  qs('#brandTag').textContent = isFa() ? (st.tagline || '') : (st.taglineEn || '');
  qs('#brandLink').setAttribute('aria-label', `${st.name || ''} — ${t('nav.home')}`);

  // ناوبری اصلی
  renderNav();

  // پانویس
  renderFooter();

  // ناحیهٔ کاربر
  renderUserArea();
  updateBadges();

  // دکمهٔ نصب
  const installBtn = qs('#btnInstallApp');
  if (installBtn) installBtn.hidden = S.installed;
}

function renderNav() {
  const nav = qs('#navInner');
  const topCats = S.categories.filter((c) => !c.parentId).slice(0, 10);
  const links = [
    { key: '/', href: '#/', icon: 'home', label: t('nav.home') },
    { key: '/products', href: '#/products', icon: 'grid', label: t('nav.products') },
  ];
  let html = links.map((l) => h`<a class="nav-link" data-nav-key="${l.key}" href="${l.href}">${icon(l.icon)} ${l.label}</a>`).join('');

  html += h`
    <div class="nav-more">
      <button type="button" class="nav-link" data-dd aria-expanded="false" aria-haspopup="true">${icon('layers')} ${t('nav.allCategories')} ${icon('chevron-down')}</button>
      <div class="nav-dd" data-ddbox hidden>
        ${topCats.map((c) => h`<a href="#/category/${c.id}">${icon(catIcon(c.glyph))} ${catName(c)}</a>`)}
        <a href="#/products">${icon('grid')} ${t('footer.allProducts')}</a>
      </div>
    </div>`;

  const extra = [
    { key: '/deals', href: '#/products?discount=1', icon: 'percent', label: t('nav.deals'), show: feat('coupons') },
    { key: '/new', href: '#/products?sort=newest', icon: 'sparkles', label: t('nav.new'), show: true },
    { key: '/pages/stats', href: '#/stats', icon: 'chart', label: t('nav.stats'), show: feat('publicStats') },
    { key: '/price-check', href: '#/price-check', icon: 'barcode', label: t('priceCheck.title'), show: feat('priceCheckDevice') },
    { key: '/pages/about', href: '#/pages/about', icon: 'store', label: t('nav.about'), show: true },
    { key: '/pages/contact', href: '#/pages/contact', icon: 'map', label: t('nav.contact'), show: true },
  ].filter((x) => x.show);
  html += extra.map((l) => h`<a class="nav-link" data-nav-key="${l.key}" href="${l.href}">${icon(l.icon)} ${l.label}</a>`).join('');

  // بنر تبلیغی نوار (اسلات ticker)
  const tickerAds = adInSlot('ticker');
  if (tickerAds.length) html += h`<span class="nav-link muted tiny">${tickerAds[0].title}</span>`;

  nav.innerHTML = html;

  const ddBtn = nav.querySelector('[data-dd]');
  const ddBox = nav.querySelector('[data-ddbox]');
  ddBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    ddBox.hidden = !ddBox.hidden;
    ddBtn.setAttribute('aria-expanded', String(!ddBox.hidden));
  });
  document.addEventListener('click', (e) => {
    if (!ddBox.hidden && !e.target.closest('.nav-more')) { ddBox.hidden = true; ddBtn.setAttribute('aria-expanded', 'false'); }
  });
}

function renderFooter() {
  const st = store();
  qs('#fBrandName').textContent = isFa() ? (st.name || t('app.name')) : (st.nameEn || st.name || '');
  qs('#fDesc').textContent = isFa() ? (st.description || '') : (st.descriptionEn || st.description || '');
  qs('#fYear').textContent = isFa() ? faDigits(new Date().getFullYear()) : String(new Date().getFullYear());

  // نشان‌ها
  qs('#fBadges').innerHTML = h`
    <span class="f-badge">${icon('shield')}<span>${t('home.point1')}</span></span>
    <span class="f-badge">${icon('package-check')}<span>${t('home.point2')}</span></span>
    ${feat('insurance') ? h`<span class="f-badge">${icon('scale')}<span>${t('common.insurance')}</span></span>` : ''}
    ${feat('plus') ? h`<span class="f-badge">${icon('sparkles')}<span>${t('footer.plus')}</span></span>` : ''}`;

  // شبکه‌های اجتماعی
  const soc = st.socials || {};
  const socList = [
    ['instagram', soc.instagram, 'camera'],
    ['telegram', soc.telegram, 'send'],
    ['whatsapp', soc.whatsapp ? `https://wa.me/${String(soc.whatsapp).replace(/\D/g, '')}` : '', 'chat'],
    ['eitaa', soc.eitaa, 'globe'],
  ].filter((x) => x[1]);
  qs('#fSocial').innerHTML = socList.length
    ? socList.map(([name, url, ic]) => h`<a href="${url}" target="_blank" rel="noopener noreferrer" aria-label="${name}" title="${name}">${icon(ic)}</a>`).join('')
    : h`<span class="muted tiny">${t('footer.contactUs')}</span>`;

  // تماس
  qs('#fContact').innerHTML = h`
    <li>${icon('phone')}<span>${t('contact.phone')}: <a href="tel:${st.phone}">${fmtNum(st.phone || '')}</a></span></li>
    <li>${icon('chat')}<span>${t('contact.mobile')}: <a href="tel:${st.phone2 || st.phone}">${fmtNum(st.phone2 || '')}</a></span></li>
    <li>${icon('mail')}<span><a href="mailto:${st.email}">${st.email}</a></span></li>
    <li>${icon('pin')}<span>${isFa() ? (st.address || '') : (st.addressEn || st.address || '')}</span></li>
    <li>${icon('clock')}<span>${t('footer.workingHours')}: ${(st.workingHours || []).map((w) => `${isFa() ? w.fa : w.en} ${isFa() ? w.time : w.timeEn}`).join(' · ')}</span></li>`;

  // کروکی نقشه در پانویس
  qs('#fMinimap').innerHTML = minimapSvg();
  qs('#fMinimap').setAttribute('title', t('contact.mapTitle'));
}

// ── ناحیهٔ کاربر در سربرگ ───────────────────────────────────
function renderUserArea() {
  const menu = qs('#userMenu');
  const authBtn = qs('#btnAuth');
  if (!S.me) {
    menu.hidden = true;
    authBtn.hidden = false;
    authBtn.innerHTML = h`${icon('user')}<span data-i18n="nav.login">${t('nav.login')}</span>`;
    return;
  }
  authBtn.hidden = true;
  menu.hidden = false;
  const me = S.me;
  const initial = (me.name || me.username || '?').trim().charAt(0);
  menu.innerHTML = h`
    <button type="button" class="um-btn" data-um aria-expanded="false" aria-haspopup="true">
      <span class="um-avatar">${esc(initial)}</span>
      <span class="um-name">${esc(me.name || me.username)}</span>
      ${icon('chevron-down')}
    </button>
    <div class="um-dd" data-umbox hidden>
      <div class="um-dd-head">
        <div class="b">${esc(me.name || me.username)}</div>
        <div class="tiny muted">${esc(me.phone || me.email || me.username)}</div>
        ${isPlus() ? h`<span class="badge-pill bp-accent mt-s">${icon('sparkles')} ${t('acc.plus')}</span>` : ''}
      </div>
      <a href="#/account">${icon('user')} ${t('acc.dashboard')}</a>
      <a href="#/account/orders">${icon('package-check')} ${t('acc.orders')}</a>
      <a href="#/account/wishlist">${icon('heart')} ${t('acc.wishlist')} <span class="um-count">${fmtNum(S.wishlist.length)}</span></a>
      ${feat('wallet') ? h`<a href="#/account/wallet">${icon('wallet')} ${t('acc.wallet')} <span class="um-count">${fmtNum(me.wallet?.balance || 0)}</span></a>` : ''}
      ${feat('tickets') ? h`<a href="#/account/tickets">${icon('ticket')} ${t('acc.tickets')}</a>` : ''}
      <a href="#/account/notifications">${icon('bell')} ${t('acc.notifications')} ${S.unread ? h`<span class="um-count">${fmtNum(S.unread)}</span>` : ''}</a>
      ${me.isAdmin ? h`<div class="sep"></div><a href="#/admin">${icon('settings')} ${t('nav.admin')}</a>` : ''}
      <div class="sep"></div>
      <button type="button" data-act="logout">${icon('logout')} ${t('common.logout')}</button>
    </div>`;
  const btn = menu.querySelector('[data-um]');
  const box = menu.querySelector('[data-umbox]');
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    box.hidden = !box.hidden;
    btn.setAttribute('aria-expanded', String(!box.hidden));
  });
  document.addEventListener('click', (e) => {
    if (!box.hidden && !e.target.closest('.user-menu')) { box.hidden = true; btn.setAttribute('aria-expanded', 'false'); }
  });
}

act('logout', async () => {
  const ok = await confirmDialog({ text: t('common.logout') + '؟', okText: t('common.logout') });
  if (!ok) return;
  try {
    await api.post('/api/auth/logout');
    S.me = null;
    await loadCart();
    renderChrome();
    toastSuccess(t('auth.logoutDone'));
    navigate('#/');
    refresh();
  } catch (e) { toastError(t('err.generic')); }
});

// ── بج‌ها ───────────────────────────────────────────────────
export function updateBadges() {
  const set = (id, n) => {
    const elx = qs(id);
    if (!elx) return;
    elx.hidden = !n;
    elx.textContent = fmtNum(n);
  };
  set('#cartBadge', S.cart?.count || 0);
  set('#mnCart', S.cart?.count || 0);
  set('#wishBadge', S.wishlist.length);
  set('#notifBadge', S.unread);
}

// ── کنترل‌های ثابت ──────────────────────────────────────────
function wireStaticControls() {
  qs('#btnTheme')?.addEventListener('click', () => {
    const cur = S.prefs.theme === 'auto'
      ? (document.documentElement.getAttribute('data-mode') || 'dark')
      : S.prefs.theme;
    const next = cur === 'dark' ? 'light' : 'dark';
    setPref('theme', next);
    const b = qs('#btnTheme');
    b.innerHTML = icon(next === 'dark' ? 'moon' : 'sun');
  });
  qs('#btnLang')?.addEventListener('click', async () => {
    const next = lang() === 'fa' ? 'en' : 'fa';
    setPref('locale', next);
    qs('#langChip').textContent = next === 'fa' ? 'EN' : 'فا';
    applyI18n();
    renderChrome();
    applyI18n();
    refresh(true);
  });
  qs('#btnMenu')?.addEventListener('click', () => openMobileMenu());
  qs('#fabTop')?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  qs('#btnInstallApp')?.addEventListener('click', async () => {
    if (S.installPrompt) { const ok = await promptInstall(); if (!ok) installHintModal(); }
    else installHintModal();
  });
}

function openMobileMenu() {
  drawer({
      title: t('nav.menu'),
      body: h`
        <div class="col">
          <a class="nav-link" href="#/">${icon('home')} ${t('nav.home')}</a>
          <a class="nav-link" href="#/products">${icon('grid')} ${t('nav.products')}</a>
          ${S.categories.filter((c) => !c.parentId).map((c) => h`<a class="nav-link" href="#/category/${c.id}">${icon(catIcon(c.glyph))} ${catName(c)}</a>`)}
          <div class="divider"></div>
          <a class="nav-link" href="#/pages/about">${icon('store')} ${t('nav.about')}</a>
          <a class="nav-link" href="#/pages/contact">${icon('map')} ${t('nav.contact')}</a>
          ${S.me ? '' : h`<a class="btn btn-primary btn-block mt-s" href="#/auth">${icon('user')} ${t('nav.login')}</a>`}
        </div>`,
    });
}

// ── جست‌وجو و پیشنهادها ─────────────────────────────────────
function wireSearch() {
  const form = qs('#searchForm');
  const input = qs('#searchInput');
  const box = qs('#suggestBox');
  let activeIdx = -1;

  const closeBox = () => { box.hidden = true; activeIdx = -1; };

  const suggest = debounce(async () => {
    const q = input.value.trim();
    if (!q) {
      // پیشنهادهای پیش‌فرض: اخیر + پرجست‌وجو
      if (!S.searches.length) { closeBox(); return; }
      box.hidden = false;
      box.innerHTML = h`
        <div class="sg-group">${t('search.recent')}</div>
        ${S.searches.map((s) => h`<div class="sg-item" data-q="${s}">${icon('history')}<span class="sg-title">${s}</span></div>`)}`;
      return;
    }
    try {
      const r = await api.get(`/api/search?q=${encodeURIComponent(q)}&limit=7`);
      box.hidden = false;
      let out = '';
      if (r.didYouMean) out += h`<div class="sg-group">${t('search.didYouMean')}</div><div class="sg-item" data-q="${r.didYouMean}">${icon('sparkles')}<span class="sg-title">${r.didYouMean}</span></div>`;
      if (r.categories?.length) out += h`<div class="sg-group">${t('search.inCategories')}</div>${r.categories.map((c) => h`<a class="sg-item" href="#/category/${c.id}">${icon(catIcon(c.glyph))}<span class="sg-title">${catName(c)}</span></a>`)}`;
      if (r.brands?.length) out += h`<div class="sg-group">${t('search.inBrands')}</div>${r.brands.map((b) => h`<div class="sg-item" data-q="${brandName(b)}">${icon('tag')}<span class="sg-title">${brandName(b)}</span></div>`)}`;
      if (r.products?.length) {
        out += h`<div class="sg-group">${t('search.inProducts')}</div>${r.products.map((p) => h`
          <a class="sg-item" href="#/product/${p.id}">
            ${p.images?.[0] ? h`<img class="sg-thumb" src="${p.images[0]}" alt="" loading="lazy" data-glyph="${p.glyph}">` : icon(p.glyph || 'box')}
            <span class="grow"><span class="sg-title">${prodName(p)}</span><span class="sg-meta">${catName({ name: p.categoryName, nameEn: p.categoryNameEn })}</span></span>
            <span class="sg-price">${fmtNum(p.price)}</span>
          </a>`)}`;
      }
      if (!out) out = h`<div class="sg-item muted">${t('common.noResult')}</div>`;
      box.innerHTML = out;
    } catch { closeBox(); }
  }, 240);

  input.addEventListener('input', suggest);
  input.addEventListener('focus', suggest);
  document.addEventListener('click', (e) => { if (!e.target.closest('.searchbox')) closeBox(); });

  box.addEventListener('click', (e) => {
    const item = e.target.closest('[data-q]');
    if (!item) return;
    e.preventDefault();
    input.value = item.dataset.q;
    closeBox();
    goSearch(item.dataset.q);
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const q = input.value.trim();
    closeBox();
    goSearch(q);
  });

  input.addEventListener('keydown', (e) => {
    const items = [...box.querySelectorAll('.sg-item, a.sg-item')];
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      if (!items.length) return;
      e.preventDefault();
      activeIdx = (activeIdx + (e.key === 'ArrowDown' ? 1 : -1) + items.length) % items.length;
      items.forEach((n, i) => n.classList.toggle('active', i === activeIdx));
      items[activeIdx]?.scrollIntoView({ block: 'nearest' });
    } else if (e.key === 'Enter' && activeIdx >= 0 && items[activeIdx]) {
      e.preventDefault();
      const it = items[activeIdx];
      if (it.dataset.q) { input.value = it.dataset.q; goSearch(it.dataset.q); }
      else if (it.getAttribute('href')) location.hash = it.getAttribute('href');
      closeBox();
    } else if (e.key === 'Escape') closeBox();
  });

  // جست‌وجوی صوتی
  qs('#btnVoiceSearch')?.addEventListener('click', () => startVoice(input, goSearch));
  // جست‌وجوی تصویری
  qs('#btnImageSearch')?.addEventListener('click', () => {
    if (!feat('imageSearch')) { toast(t('err.notFound')); return; }
    navigate('#/search/image');
  });
}

function goSearch(q) {
  const s = String(q || '').trim();
  if (!s) return;
  addSearch(s);
  navigate(`/products?q=${encodeURIComponent(s)}`);
}

function startVoice(input, go) {
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SR) { toastError(t('search.noVoice')); return; }
  const rec = new SR();
  rec.lang = lang() === 'fa' ? 'fa-IR' : 'en-US';
  rec.interimResults = false;
  const btn = qs('#btnVoiceSearch');
  btn.classList.add('active');
  toast(t('search.listening'), { timeout: 2600 });
  rec.onresult = (e) => {
    const text = e.results?.[0]?.[0]?.transcript || '';
    if (text) { input.value = text; go(text); }
  };
  rec.onerror = () => toastError(t('search.noVoice'));
  rec.onend = () => btn.classList.remove('active');
  try { rec.start(); } catch { btn.classList.remove('active'); }
}

// ── پالت فرمان (Ctrl+K) ─────────────────────────────────────
function wirePalette() {
  let palEl = null;
  const close = () => { palEl?.remove(); palEl = null; document.removeEventListener('keydown', onKey, true); };
  const open = async () => {
    if (palEl) { close(); return; }
    palEl = el('div', { class: 'cmdk', role: 'dialog', 'aria-modal': 'true', 'aria-label': t('common.search') });
    palEl.innerHTML = h`
      <div class="cmdk-box">
        <input class="cmdk-input" placeholder="${t('common.searchProducts')}" data-ci autocomplete="off">
        <div class="cmdk-list" data-cl></div>
        <div class="cmdk-foot"><span><kbd>↑↓</kbd> ${t('common.select')}</span><span><kbd>Enter</kbd> ${t('common.next')}</span><span><kbd>Esc</kbd> ${t('common.close')}</span></div>
      </div>`;
    document.body.appendChild(palEl);
    const input = palEl.querySelector('[data-ci]');
    const list = palEl.querySelector('[data-cl]');
    input.focus();

    const baseItems = () => [
      { icon: 'home', label: t('nav.home'), href: '#/' },
      { icon: 'grid', label: t('nav.products'), href: '#/products' },
      { icon: 'percent', label: t('nav.deals'), href: '#/products?discount=1' },
      { icon: 'cart', label: t('cart.title'), href: '#/cart' },
      ...(S.me ? [
        { icon: 'user', label: t('acc.dashboard'), href: '#/account' },
        { icon: 'package-check', label: t('acc.orders'), href: '#/account/orders' },
        ...(feat('wallet') ? [{ icon: 'wallet', label: t('acc.wallet'), href: '#/account/wallet' }] : []),
      ] : [{ icon: 'user', label: t('nav.login'), href: '#/auth' }]),
      ...(S.me?.isAdmin ? [{ icon: 'settings', label: t('adm.title'), href: '#/admin' }] : []),
      { icon: 'moon', label: t('theme.toggle'), run: () => qs('#btnTheme').click() },
      { icon: 'globe', label: 'English / فارسی', run: () => qs('#btnLang').click() },
      { icon: 'chart', label: t('nav.stats'), href: '#/stats' },
      { icon: 'map', label: t('nav.contact'), href: '#/pages/contact' },
    ];

    const renderList = async (q) => {
      let items = baseItems().filter((i) => !q || i.label.toLowerCase().includes(q.toLowerCase()));
      if (q) {
        try {
          const r = await api.get(`/api/search?q=${encodeURIComponent(q)}&limit=6`);
          items = [...items, ...r.products.map((p) => ({ icon: p.glyph || 'box', label: prodName(p), meta: fmtNum(p.price), href: `#/product/${p.id}` }))];
        } catch { /* noop */ }
      }
      list.innerHTML = items.length
        ? items.map((i, idx) => h`<div class="cmdk-item ${idx === 0 ? 'active' : ''}" data-idx="${idx}">${icon(i.icon)}<span class="grow">${i.label}</span>${i.meta ? h`<span class="muted tiny">${i.meta}</span>` : ''}</div>`)
        : h`<div class="cmdk-item muted">${t('common.noResult')}</div>`;
      list._items = items;
    };
    await renderList('');
    input.addEventListener('input', debounce(() => renderList(input.value.trim()), 200));

    const pick = (idx) => {
      const it = list._items?.[idx];
      if (!it) return;
      close();
      if (it.run) it.run();
      else if (it.href) location.hash = it.href;
    };
    list.addEventListener('click', (e) => {
      const it = e.target.closest('[data-idx]');
      if (it) pick(Number(it.dataset.idx));
    });
    let idx = 0;
    const onKey = (e) => {
      const items = list.querySelectorAll('.cmdk-item[data-idx]');
      if (e.key === 'Escape') { e.preventDefault(); close(); }
      else if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        idx = (idx + (e.key === 'ArrowDown' ? 1 : -1) + items.length) % Math.max(1, items.length);
        items.forEach((n, i) => n.classList.toggle('active', i === idx));
        items[idx]?.scrollIntoView({ block: 'nearest' });
      } else if (e.key === 'Enter') { e.preventDefault(); pick(idx); }
    };
    document.addEventListener('keydown', onKey, true);
    palEl.addEventListener('click', (e) => { if (e.target === palEl) close(); });
  };
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && String(e.key).toLowerCase() === 'k') { e.preventDefault(); open(); }
  });
}

// ── رویدادهای سراسری ────────────────────────────────────────
function subscribeEvents() {
  on('cart', updateBadges);
  on('wishlist', () => { updateBadges(); renderUserArea(); });
  on('notifications', updateBadges);
  on('me', () => { renderUserArea(); updateBadges(); });
  on('settings', () => { applyPrefs(); renderChrome(); applyI18n(); syncSleep(); });
  document.addEventListener('view:rendered', () => syncSleep());
  document.addEventListener('sleep:changed', () => { syncSleep(); renderChrome(); });
  on('install', () => { const b = qs('#btnInstallApp'); if (b) b.hidden = false; });
  on('installed', () => { const b = qs('#btnInstallApp'); if (b) b.hidden = true; toastSuccess(t('home.appInstalled')); });
  on('online', (up) => { if (up) toastSuccess(t('err.online')); else toastWarnOffline(); });
}
// ── ضربان قلب: هم وضعیت خاموش/روشن را تازه می‌کند، هم سرویس را گرم نگه می‌دارد
function wireSleepHeartbeat() {
  const tick = async () => {
    try {
      const r = await api.get('/api/system/status');
      const was = !!S.sleeping;
      S.sleeping = !!r.sleeping;
      S.sleepSince = r.since || null;
      if (was !== S.sleeping) {
        syncSleep();
        renderChrome();
        if (String(location.hash || '').startsWith('#/admin')) refresh(true);
      }
    } catch { /* آفلاین یا سرور در حال ریستارت */ }
  };
  setInterval(tick, 45000);
  document.addEventListener('visibilitychange', () => { if (!document.hidden) tick(); });
}

// ── پردهٔ «فروشگاه خاموش است» ───────────────────────────────
function syncSleep() {
  const adminArea = String(location.hash || '').startsWith('#/admin');
  const canWake = can('settings.edit');
  // مدیر داخل پنل پرده را نمی‌بیند تا بتواند فروشگاه را روشن کند
  updateSleepScreen({
    sleeping: !!S.sleeping && !(adminArea && canWake),
    canWake,
    since: S.sleepSince,
    onWake: async () => {
      try {
        await api.post('/api/system/wake', {});
        await refreshBootstrap({ silent: true });
        syncSleep();
        renderChrome();
        toastSuccess(t('sys.awake'));
        refresh(true);
      } catch (err) { toastApiError(err); }
    },
    onLogin: () => navigate('#/auth?next=' + encodeURIComponent(location.hash.slice(1))),
  });
}

let offlineToasted = false;
function toastWarnOffline() {
  if (offlineToasted) return;
  offlineToasted = true;
  toastError(t('err.offline'), { timeout: 4200 });
}
function wireNetworkToasts() {
  window.addEventListener('online', () => { offlineToasted = false; });
}

function wireScroll() {
  const header = qs('#siteHeader');
  const fab = qs('#fabTop');
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      header.classList.toggle('scrolled', window.scrollY > 8);
      fab.hidden = window.scrollY < 420;
      ticking = false;
    });
  }, { passive: true });
}

// ── توافق‌نامهٔ اولین بازدید ────────────────────────────────
function openConsent() {
  if (!feat('consent')) return;
  modal({
    title: t('consent.title'),
    dismissible: false,
    closeBtn: false,
    size: 'md',
    body: h`
      <p class="confirm-text mb">${t('consent.text')}</p>
      <p class="hint mt-s">${icon('info')} ${t('consent.ttlNote')}</p>
      <form data-act="consent-form" class="col">
        <label class="check"><input type="checkbox" name="terms" checked><span class="box">${icon('check')}</span><span>${t('consent.terms')} <a class="section-link" href="#/pages/terms">${t('consent.readTerms')}</a></span></label>
        <label class="check"><input type="checkbox" name="privacy" checked><span class="box">${icon('check')}</span><span>${t('consent.privacy')} <a class="section-link" href="#/pages/privacy">${t('consent.readPrivacy')}</a></span></label>
        <label class="check"><input type="checkbox" name="marketing"><span class="box">${icon('check')}</span><span>${t('consent.marketing')}</span></label>
      </form>`,
    footer: h`<button type="button" class="btn btn-ghost" data-consent-min>${t('consent.rejectOptional')}</button><button type="button" class="btn btn-primary" data-consent-go>${t('consent.accept')}</button>`,
    onMount: (panel, handle) => {
      const form = panel.querySelector('[data-act="consent-form"]');
      const go = () => {
        const terms = form.querySelector('[name=terms]').checked;
        const privacy = form.querySelector('[name=privacy]').checked;
        const marketing = form.querySelector('[name=marketing]').checked;
        if (!terms || !privacy) { toastError(t('form.termsRequired')); return; }
        setConsent({ terms, privacy, marketing });
        if (S.me) api.patch('/api/me', { notificationsPrefs: { marketing } }).catch(() => {});
        toastSuccess(t('consent.thanks'));
        handle.close();
      };
      panel.closest('.modal').querySelector('[data-consent-go]').addEventListener('click', go);
      panel.closest('.modal').querySelector('[data-consent-min]').addEventListener('click', () => {
        setConsent({ terms: true, privacy: true, marketing: false });
        if (S.me) api.patch('/api/me', { notificationsPrefs: { marketing: false } }).catch(() => {});
        toastSuccess(t('consent.thanks'));
        handle.close();
      });
      form.addEventListener('submit', (e) => { e.preventDefault(); go(); });
    },
  });
}
act('consent-form', () => {}); // فرم توسط onMount مدیریت می‌شود
act('consent-manage', () => openConsent());
function maybeConsent() { if (hasConsent()) return; openConsent(); }
act('reload', () => location.reload());

// ── اجبار به تغییر رمز پیش‌فرض ──────────────────────────────
let forceHandle = null;
function maybeForcePasswordChange() {
  if (!S.me?.mustChangePassword) return;
  try { if (sessionStorage.getItem('bm_pwd_later')) return; } catch { /* private mode */ }
  forceHandle = modal({
    title: t('acc.passwordChange'),
    dismissible: false,
    closeBtn: false,
    size: 'sm',
    body: h`
      <form data-act="force-pass">
        <p class="notice notice-warn mb">${icon('alert')}<span>${lang() === 'fa' ? 'برای امنیت بیشتر، رمز پیش‌فرض را تغییر بده.' : 'For security, change the default password.'}</span></p>
        <label class="field"><span class="label">${t('acc.currentPassword')}</span><input class="input" type="password" name="current" autocomplete="current-password" required></label>
        <label class="field"><span class="label">${t('acc.newPassword2')}</span><input class="input" type="password" name="next" autocomplete="new-password" required><span class="hint">${t('auth.passwordRules')}</span></label>
        <label class="field"><span class="label">${t('common.passwordConfirm')}</span><input class="input" type="password" name="confirm" autocomplete="new-password" required></label>
        <button class="btn btn-primary btn-block" type="submit">${t('common.save')}</button>
        <button class="btn btn-ghost btn-block mt-s" type="button" data-act="pwd-later">${t('auth.pwdLater')}</button>
      </form>`,
  });
}
act('pwd-later', () => {
  try { sessionStorage.setItem('bm_pwd_later', '1'); } catch { /* private mode */ }
  forceHandle?.close();
  toast(t('auth.pwdLaterToast'));
});
act('force-pass', async (e, form) => {
  const d = new FormData(form);
  if (d.get('next') !== d.get('confirm')) { toastError(lang() === 'fa' ? 'تکرار رمز یکسان نیست.' : 'Passwords do not match.'); return; }
  try {
    await api.post('/api/me/password', { current: d.get('current'), next: d.get('next') });
    await refreshMe();
    renderUserArea();
    toastSuccess(t('acc.passwordChanged'));
    forceHandle?.close();
  } catch (err) {
    toastError(err.message);
  }
});

// ── بازدید و سرویس‌ورکر ─────────────────────────────────────
function recordVisit() {
  const key = 'bm_visit';
  try {
    if (sessionStorage.getItem(key)) return;
    sessionStorage.setItem(key, '1');
  } catch { return; }
  api.post('/api/visits', { path: location.hash || '/' }).catch(() => {});
}

function maybeCouponFromUrl() {
  const m = String(location.href).match(/[?&]coupon=([A-Za-z0-9_-]{2,32})/);
  if (!m) return;
  const code = m[1];
  try { history.replaceState(null, '', String(location.href).replace(/[?&]coupon=[A-Za-z0-9_-]{2,32}/, '').replace(/\?$/, '')); } catch { /* noop */ }
  setTimeout(async () => {
    try {
      await api.post('/api/cart/coupon', { code });
      await loadCart();
      toastSuccess(`${t('cart.couponApplied')}: ${code}`);
    } catch { /* کوپن نامعتبر بود — بی‌سروصدا رد می‌شویم */ }
  }, 700);
}

function wireSearchShortcut() {
  document.addEventListener('keydown', (e) => {
    const tag = String(e.target?.tagName || '').toLowerCase();
    const typing = ['input', 'textarea', 'select'].includes(tag) || e.target?.isContentEditable;
    if (e.key === '/' && !typing && !e.metaKey && !e.ctrlKey && !e.altKey) {
      const si = qs('#searchInput');
      if (si) { e.preventDefault(); si.focus(); si.select?.(); }
    }
    if (e.key === 'Escape' && document.activeElement === qs('#searchInput')) {
      const si = qs('#searchInput'); si.value = ''; si.blur(); qs('#suggestBox') && (qs('#suggestBox').hidden = true);
    }
  });
}

function registerSW() {
  if (!('serviceWorker' in navigator)) return;
  if (settings().features?.offlineMode === false) return;
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => { /* محیط بدون SW */ });
  });
}

// ── شروع ────────────────────────────────────────────────────
on('boot-slow', () => document.body.classList.add('boot-slow'));
on('boot-failed', () => {
  const sp = qs('#bootSplash');
  if (!sp) return;
  sp.innerHTML = h`<div class="empty">
    <h4>${t('boot.failed')}</h4>
    <p class="muted small mt-s">${t('boot.failedHint')}</p>
    <button class="btn btn-primary mt" data-act="reload">${icon('refresh')} ${t('common.retry')}</button>
  </div>`;
});
init().catch((e) => {
  console.error('[boot]', e);
  const splash = qs('#bootSplash');
  if (splash) splash.innerHTML = h`<div class="empty"><h4>${t('err.generic')}</h4><button class="btn btn-primary" data-act="reload">${t('common.retry')}</button></div>`;
});
