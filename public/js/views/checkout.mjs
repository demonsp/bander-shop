// ─────────────────────────────────────────────────────────────
//  تکمیل خرید (Checkout)
// ─────────────────────────────────────────────────────────────
import { fmtTel, html as h, icon, fmtNum, fmtMoney, esc, applyDyn, debounce } from '../lib/dom.mjs';
import { t, isFa } from '../i18n.mjs';
import { api } from '../lib/api.mjs';
import { S, ship, feat, ordersCfg, isPlus, refreshMe, loadCart } from '../state.mjs';
import { summaryRows, emptyState, field, checkField, switchField } from '../components.mjs';
import { toast, toastSuccess, toastError, toastApiError, modal, withBusy } from '../ui.mjs';
import { act } from '../actions.mjs';
import { navigate, refresh } from '../router.mjs';

let quote = null;
let payMethods = [];

export async function render(ctx) {
  await loadCart().catch(() => {});
  if (!S.cart.items?.length) {
    return emptyState({ icon: 'cart', title: t('cart.empty'), text: t('cart.emptyText'), action: { href: '#/products', label: t('cart.goShopping') } });
  }
  
  if (!S.me) {
    return emptyState({ icon: 'user', title: t('checkout.loginRequired'), action: { href: '#/auth?next=checkout', label: t('nav.login') } });
  }

  // KYC Check
  if (S.me.kycStatus !== 'approved') {
    return emptyState({
      icon: 'shield-alert',
      title: 'احراز هویت ناقص است',
      text: 'جهت جلوگیری از تقلب و با توجه به الزامات قانونی، ثبت سفارش نیازمند تأیید هویت است.',
      action: { href: '#/account/kyc', label: 'تکمیل احراز هویت' }
    });
  }

  const sh = ship();
  const zones = sh.zones || [];
  const addresses = S.me?.addresses || [];

  // نقل‌قول اولیه
  try {
    const q = await api.post('/api/checkout/quote', { delivery: 'courier', zone: zones[0]?.id || 'country', express: false, insurance: false });
    quote = q.quote;
    payMethods = (q.paymentMethods || []).filter((m) => (S.me ? true : m.id === 'cod' || m.id === 'gateway'));
    if (!payMethods.length) payMethods = [{ id: 'cod', fa: 'پرداخت در محل', en: 'Cash on delivery', note: '' }];
  } catch (e) { quote = null; }

  return h`
    <div class="section-head"><div><h1 class="section-title">${icon('card')} ${t('checkout.title')}</h1></div></div>
    <div class="checkout-steps">
      <span class="cstep active"><span class="n">1</span> ${t('checkout.step1')}</span>
      <span class="cstep"><span class="n">2</span> ${t('checkout.step2')}</span>
      <span class="cstep"><span class="n">3</span> ${t('checkout.step3')}</span>
    </div>

    <form class="cart-grid" data-act="checkout-submit" novalidate>
      <div class="col">
        <section class="card">
          <strong class="row mb-s">${icon('truck')} ${t('checkout.delivery')}</strong>
          <div class="col">
            <label class="radio-card ${['snapppay', 'azki', 'digipay'].includes(m.id) && (!S.me || S.me.kycStatus !== 'approved') ? 'disabled' : ''}">
              <input type="radio" name="delivery" value="pickup" ${sh.pickupEnabled === false ? 'disabled' : ''} ${S.me ? '' : 'checked'}>
              <span class="dot"></span>
              <span><span class="b">${t('checkout.pickup')}</span><span class="hint" >${t('checkout.pickupDesc')} ${t('checkout.pickupReady', { h: fmtNum(sh.handlingHours || 24) })}</span></span>
            </label>
            <label class="radio-card${S.me ? '' : ' disabled'}">
              <input type="radio" name="delivery" value="courier" ${S.me ? 'checked' : 'disabled'} ${sh.courierEnabled === false ? 'disabled' : ''}>
              <span class="dot"></span>
              <span><span class="b">${t('checkout.courier')}</span><span class="hint">${t('checkout.courierDesc')}${S.me ? '' : ` — ${t('checkout.guestCourierNote')}`}</span></span>
            </label>
          </div>

          <div data-courier-opts class="mt">
            <label class="field"><span class="label">${t('checkout.zone')}</span>
              <select class="select" name="zone">
                ${zones.map((z) => h`<option value="${z.id}">${isFa() ? z.name : z.nameEn} — ${fmtNum(z.fee)} ${t('common.toman')} · ${isFa() ? z.eta : ''}</option>`)}
              </select>
            </label>
            ${sh.expressEnabled ? switchField({ label: t('checkout.express'), desc: `${fmtNum(sh.expressFee || 0)} ${t('common.toman')}${isPlus() ? ` · ${t('acc.plus')}: −${fmtNum(sh.expressDiscountPct || 50)}٪` : ''}`, name: 'express' }) : ''}
            ${feat('insurance') ? switchField({ label: t('checkout.insuranceOpt'), desc: isPlus() && (S.settings?.plus?.autoInsurance) ? t('checkout.insuranceAuto') : t('checkout.insuranceDesc'), name: 'insurance', checked: isPlus() }) : ''}

            <div class="divider"></div>
            <strong class="row mb-s">${icon('pin')} ${t('checkout.address')}</strong>
            ${!S.me ? h`
              <div class="form-grid mt-s">
                ${field({ label: isFa() ? 'استان' : 'Province', name: 'guestProvince' })}
                ${field({ label: isFa() ? 'شهر' : 'City', name: 'guestCity' })}
                ${field({ label: isFa() ? 'آدرس کامل (خیابان، کوچه، پلاک، واحد)' : 'Full Address', name: 'guestAddress', span2: true })}
                ${field({ label: isFa() ? 'کد پستی (اختیاری)' : 'Postal Code', name: 'guestZip', type: 'tel', attrs: 'inputmode="numeric"' })}
              </div>
            ` : addresses.length ? h`
              <div class="col" data-addresses>
                ${addresses.map((a, i) => h`
                  <label class="addr-card">
                    <input type="radio" name="addressId" value="${a.id}" ${a.isDefault || i === 0 ? 'checked' : ''}>
                    <span class="dot"></span>
                    <span>
                      <span class="b">${esc(a.title || t('common.address'))}</span>
                      <span class="hint">${esc(a.receiver || '')} · ${fmtTel(a.phone || '')}<br>${esc(a.street || '')}${a.city ? `، ${esc(a.city)}` : ''}${a.postal ? ` · ${esc(a.postal)}` : ''}</span>
                    </span>
                  </label>`)}
              </div>
              <button type="button" class="btn btn-ghost btn-sm mt-s" data-act="addr-add">${icon('plus')} ${t('checkout.addAddress')}</button>
            ` : h`
              <p class="notice notice-warn">${icon('alert')}<span>${t('checkout.noAddress')}</span></p>
              <button type="button" class="btn btn-ghost btn-sm mt-s" data-act="addr-add">${icon('plus')} ${t('checkout.addAddress')}</button>
            `}
          </div>
        </section>

        ${!S.me ? h`
        <section class="card">
          <strong class="row mb-s">${icon('user')} ${t('checkout.guestInfo')}</strong>
          <p class="hint mb-s">${t('checkout.guestHint')}</p>
          <div class="form-grid">
            ${field({ label: t('checkout.guestName'), name: 'guestName', required: true, autocomplete: 'name' })}
            ${field({ label: t('checkout.guestPhone'), name: 'guestPhone', type: 'tel', required: true, autocomplete: 'tel', attrs: 'inputmode="numeric" maxlength="11" placeholder="09xxxxxxxxx"', hint: t('checkout.guestPhoneHint') })}
          </div>
        </section>` : ''}

        <section class="card">
          <strong class="row mb-s">${icon('wallet')} ${t('checkout.paymentMethod')}</strong>
          <div class="col" data-paymethods>
            ${(payMethods.length ? payMethods : [{ id: 'gateway', fa: 'درگاه بانکی', en: 'Bank gateway', note: '' }]).map((m, i) => h`
              <label class="radio-card">
                <input type="radio" name="paymentMethod" value="${m.id}" ${i === 0 ? 'checked' : ''} ${['snapppay', 'azki', 'digipay'].includes(m.id) && (!S.me || S.me.kycStatus !== 'approved') ? 'disabled' : ''}>
                <span class="dot"></span>
                <span><span class="b">${isFa() ? m.fa : m.en}</span><span class="hint">${esc(m.note || '')}${m.id === 'gateway' && ordersCfg().gatewayMode === 'demo' ? ` — ${t('checkout.gatewayDemo')}` : ''}${['snapppay', 'azki', 'digipay'].includes(m.id) && (!S.me || S.me.kycStatus !== 'approved') ? ' <span style="color:var(--danger)">(نیازمند احراز هویت)</span>' : ''}</span></span>
              </label>`)}
          </div>
          ${!S.me ? h`<p class="hint mt-s" data-guest-cod-note hidden>${t('checkout.guestCodPickup')}</p>` : ''}
          ${S.me && feat('wallet') && (S.me.wallet?.balance || 0) > 0 ? switchField({ label: t('checkout.useWallet'), desc: t('checkout.walletBalance', { amount: fmtNum(S.me.wallet.balance) }), name: 'useWallet', checked: true }) : ''}
          <label class="field mt"><span class="label">${t('checkout.note')}</span><textarea class="textarea" name="note" rows="2" maxlength="400" placeholder="${t('checkout.notePlaceholder')}"></textarea></label>
        </section>

        <section class="card">
          ${checkField({ label: h`${t('checkout.acceptTerms')} <a class="section-link" href="#/pages/terms">${t('consent.readTerms')}</a>`, name: 'acceptTerms', checked: true })}
          <p class="hint mt-s">${t('checkout.concurrencyNote')}</p>
        </section>
      </div>

      <aside class="summary card">
        <strong>${t('cart.summary')}</strong>
        <div data-quote>${quote ? summaryRows(quote) : h`<div class="sk sk-line w100"></div>`}</div>
        <button class="btn btn-primary btn-block btn-lg mt" type="submit">${icon('check')} ${t('checkout.placeOrder')}</button>
        <a class="btn btn-ghost btn-block mt-s" href="#/cart">${icon('chevron-right')} ${t('cart.title')}</a>
      </aside>
    </form>`;
}

async function requote(form) {
  const fd = new FormData(form);
  try {
    const q = await api.post('/api/checkout/quote', {
      delivery: fd.get('delivery') || 'courier',
      zone: fd.get('zone') || 'country',
      express: fd.get('express') === 'on',
      insurance: fd.get('insurance') === 'on',
    });
    quote = q.quote;
    const box = form.querySelector('[data-quote]');
    if (box) box.innerHTML = summaryRows(quote);
    // نمایش/پنهان‌سازی بخش پستی
    const co = form.querySelector('[data-courier-opts]');
    const delivery = fd.get('delivery');
    if (co) co.hidden = delivery !== 'courier';
    // مهمان: پرداخت در محل فقط برای ارسال پستی
    if (!S.me) {
      const cod = form.querySelector('input[name="paymentMethod"][value="cod"]');
      if (cod) {
        cod.disabled = delivery === 'pickup';
        cod.closest('.radio-card')?.classList.toggle('disabled', delivery === 'pickup');
        const note = form.querySelector('[data-guest-cod-note]');
        if (note) note.hidden = delivery !== 'pickup';
        if (cod.disabled && cod.checked) {
          const gw = form.querySelector('input[name="paymentMethod"][value="gateway"]');
          if (gw) gw.checked = true;
        }
      }
    }
  } catch { /* noop */ }
}

export function mount(root) {
  applyDyn(root);
  const form = root.querySelector('form[data-act="checkout-submit"]');
  if (!form) return null;
  const rq = debounce(() => requote(form), 220);
  form.addEventListener('change', rq);
  requote(form);

  act('addr-add', () => openAddressModal());

  act('checkout-submit', async (e, f) => {
    e.preventDefault();
    const fd = new FormData(f);
    if (!fd.get('acceptTerms')) { toastError(t('form.termsRequired')); return; }
    if (S.me && fd.get('delivery') === 'courier' && !fd.get('addressId')) { toastError(t('checkout.noAddress')); return; }
    if (!S.me && fd.get('delivery') === 'courier') {
      if (!fd.get('guestProvince') || !fd.get('guestCity') || !fd.get('guestAddress')) {
        toastError(isFa() ? 'لطفاً آدرس پستی را کامل وارد کنید.' : 'Please enter your shipping address.');
        return;
      }
    }
    if (!S.me) {
      if (!String(fd.get('guestName') || '').trim()) { toastError(t('checkout.guestNameRequired')); return; }
      if (!/^09\d{9}$/.test(String(fd.get('guestPhone') || '').replace(/[\s-]/g, ''))) { toastError(t('checkout.guestPhoneInvalid')); return; }
    }
    await withBusy(f.querySelector('button[type=submit]'), async () => {
      try {
        const r = await api.post('/api/checkout', {
          delivery: fd.get('delivery'), zone: fd.get('zone'), express: fd.get('express') === 'on',
          insurance: fd.get('insurance') === 'on', paymentMethod: fd.get('paymentMethod') || 'gateway',
          useWallet: fd.get('useWallet') === 'on', note: fd.get('note') || '', addressId: fd.get('addressId') || '',
          guestName: S.me ? '' : String(fd.get('guestName') || '').trim(),
          guestPhone: S.me ? '' : String(fd.get('guestPhone') || '').replace(/[\s-]/g, ''),
          acceptTerms: true,
        });
        if (r.me) { S.me = r.me; refreshMe(); }
        try { sessionStorage.setItem('bm_last_order', JSON.stringify(r.order)); } catch { /* noop */ }
        await loadCart();
        if (r.needsPayment && ['gateway', 'snapppay', 'azki', 'digipay'].includes(r.paymentMethod)) navigate(`#/pay/${r.order.id}`);
        else navigate(`#/checkout/done/${r.order.id}`);
      } catch (err) {
        toastApiError(err);
        if (err?.code === 'stock_limit' || err?.code === 'product_unavailable') refresh(true);
      }
    });
  });
  return null;
}

let addrHandle = null;
function openAddressModal() {
  if (!S.me) { navigate('#/auth?next=checkout'); return; }
  addrHandle = modal({
    title: t('acc.addAddress'),
    body: h`
      <form data-act="addr-save" class="form-grid">
        ${field({ label: t('acc.addrTitle'), name: 'title', required: true })}
        ${field({ label: t('acc.addrReceiver'), name: 'receiver', required: true, value: S.me.name || '' })}
        ${field({ label: t('acc.addrPhone'), name: 'phone', type: 'tel', required: true, value: S.me.phone || '' })}
        ${field({ label: t('common.city'), name: 'city', value: S.settings?.store?.city || '' })}
        ${field({ label: t('common.postal'), name: 'postal' })}
        ${field({ label: t('acc.addrStreet'), name: 'street', required: true, span2: true })}
        ${field({ label: t('acc.addrNote'), name: 'note', span2: true })}
        <label class="check span-2"><input type="checkbox" name="isDefault"><span class="box">${icon('check')}</span><span>${t('acc.addrDefault')}</span></label>
        <button class="btn btn-primary span-2" type="submit">${t('common.save')}</button>
      </form>`,
  });
}

act('addr-save', async (e, form) => {
  e.preventDefault();
  const fd = new FormData(form);
  const payload = Object.fromEntries(fd.entries());
  payload.isDefault = fd.get('isDefault') === 'on';
  try {
    const r = await api.post('/api/me/addresses', payload);
    if (r.addresses && S.me) S.me.addresses = r.addresses;
    toastSuccess(t('acc.addrSaved'));
    addrHandle?.close();
    refresh(true);
  } catch (err) { toastApiError(err); }
});

export const title = () => t('checkout.title');
