// ─────────────────────────────────────────────────────────────
//  جزئیات سفارش: تایم‌لاین، اقلام، خلاصهٔ مالی، لغو/پرداخت/سفارش مجدد،
//  ثبت نظر پس از تحویل و فاکتور چاپی
// ─────────────────────────────────────────────────────────────
import { html as h, icon, esc, fmtNum, fmtMoney, fmtDate, applyDyn, fmtTel } from '../lib/dom.mjs';
import { t, lang, isFa } from '../i18n.mjs';
import { api } from '../lib/api.mjs';
import { S, ship } from '../state.mjs';
import {
  emptyState, statusBadge, payBadge, tableHtml, timelineHtml,
  field, textareaField, starsInput,
} from '../components.mjs';
import {
  toastSuccess, toastApiError, modal, confirmDialog, withBusy, promptDialog, errorState,
} from '../ui.mjs';
import { act } from '../actions.mjs';
import { navigate, refresh } from '../router.mjs';
import { loadCart } from '../state.mjs';

const zoneLabel = (id) => {
  const z = (ship().zones || []).find((x) => x.id === id);
  if (!z) return id || '';
  return isFa() ? z.name : (z.nameEn || z.name);
};

export async function render(ctx) {
  const id = ctx.params.id;
  let data = null;
  try { data = await api.get(`/api/me/orders/${id}`); } catch (err) {
    return err?.status === 404
      ? emptyState({ icon: 'package-check', title: t('acc.noOrders'), action: { href: '#/account/orders', label: t('acc.orders') } })
      : errorState({ title: t('err.generic') });
  }
  const o = data.order;
  const canReview = new Set(data.canReviewIds || []);

  return h`
    <div class="breadcrumb mb-s">
      <a href="#/account">${t('acc.title')}</a> <span>/</span>
      <a href="#/account/orders">${t('acc.orders')}</a> <span>/</span>
      <span class="mono">${o.code}</span>
    </div>

    <div class="cart-grid">
      <div class="col">
        <div class="card">
          <div class="row row-between row-wrap">
            <div>
              <div class="row row-wrap"><h1 class="buy-title">${icon('package-check')} ${o.code}</h1>${statusBadge(o.status)}</div>
              <p class="muted small mt-s">${fmtDate(o.createdAt)} · ${esc(o.statusInfo?.fa || o.statusInfo?.label || '')}</p>
            </div>
            <div class="row row-wrap">
              <button class="btn btn-ghost btn-sm" data-act="od-invoice" data-id="${o.id}">${icon('printer')} ${t('acc.printInvoice')}</button>
              ${o.payment?.status === 'unpaid' ? h`<a class="btn btn-primary btn-sm" href="#/pay/${o.id}">${icon('card')} ${t('common.payable')} ${fmtMoney(o.payable)}</a>` : ''}
              ${['pending_review', 'pending_payment', 'confirmed', 'preparing'].includes(o.status) ? h`<button class="btn btn-danger btn-sm" data-act="od-cancel" data-id="${o.id}">${icon('close')} ${t('acc.cancelOrder')}</button>` : ''}
            ${o.tracking ? h`<span class="row gap-s"><span class="badge-pill bp-info mono">${icon('truck')} ${esc(o.tracking)}</span><button class="btn btn-ghost btn-xs" data-act="copy" data-text="${esc(o.tracking)}">${icon('copy')} ${t('common.copy')}</button></span>` : ''}
            </div>
          </div>
          ${o.statusInfo?.fa && isFa() === false && o.statusInfo?.en ? h`<p class="muted small">${esc(o.statusInfo.en)}</p>` : ''}
        </div>

        <div class="card mt">
          <strong>${icon('history')} ${t('acc.timeline')}</strong>
          ${timelineHtml(o)}
        </div>

        <div class="card mt">
          <strong>${icon('box')} ${t('acc.orderItems')} (${fmtNum(o.items?.length || 0)})</strong>
          ${tableHtml(
            [{ label: '' }, { label: t('common.product') }, { label: t('common.price'), cls: 'num' }, { label: t('common.count'), cls: 'num' }, { label: t('common.total'), cls: 'num' }, { label: '' }],
            (o.items || []).map((it) => h`
              <tr>
                <td><span class="cl-img" data-h="52px" data-w="52px">${it.image ? h`<img src="${it.image}" alt="${esc(isFa() ? it.name : (it.nameEn || it.name))}" loading="lazy">` : icon('box')}</span></td>
                <td>
                  <a class="b" href="#/product/${it.productId}">${esc(isFa() ? it.name : (it.nameEn || it.name))}</a>
                  ${it.brand ? h`<div class="tiny muted">${esc(it.brand)}</div>` : ''}
                  ${it.sku ? h`<div class="tiny muted mono">SKU ${esc(it.sku)}</div>` : ''}
                </td>
                <td class="num">${fmtMoney(it.price)}</td>
                <td class="num">${fmtNum(it.qty)}</td>
                <td class="num b">${fmtMoney(it.price * it.qty)}</td>
                <td>${canReview.has(it.productId) ? h`<button class="btn btn-ghost btn-xs" data-act="od-review" data-id="${it.productId}" data-name="${esc(isFa() ? it.name : (it.nameEn || it.name))}">${icon('star')} ${t('pdp.writeReview')}</button>` : ''}</td>
              </tr>`),
          )}
          <div class="row row-wrap mt">
            <button class="btn btn-ghost btn-sm" data-act="od-reorder" data-id="${o.id}">${icon('cart')} ${t('acc.reorder')}</button>
            <a class="btn btn-ghost btn-sm" href="#/account/tickets">${icon('ticket')} ${t('acc.chatOpenTicket')}</a>
          </div>
        </div>
      </div>

      <aside class="col">
        <div class="card summary">
          <strong>${t('cart.summary')}</strong>
          <div class="sum-row"><span>${t('common.subtotal')}</span><span class="v">${fmtMoney(o.subtotal)}</span></div>
          ${o.plusDiscount > 0 ? h`<div class="sum-row discount"><span>${t('acc.plus')}</span><span class="v">−${fmtMoney(o.plusDiscount)}</span></div>` : ''}
          ${o.couponDiscount > 0 ? h`<div class="sum-row discount"><span>${t('common.discountCode')}: ${o.couponCode}</span><span class="v">−${fmtMoney(o.couponDiscount)}</span></div>` : ''}
          <div class="sum-row"><span>${t('common.shipping')}${o.shippingLabel ? h` <span class="muted tiny">(${esc(o.shippingLabel)})</span>` : ''}</span><span class="v">${o.shipping === 0 ? t('common.free') : fmtMoney(o.shipping)}</span></div>
          ${o.insured ? h`<div class="sum-row"><span>${t('common.insurance')}</span><span class="v">${o.insuranceFee === 0 ? t('common.free') : fmtMoney(o.insuranceFee)}</span></div>` : ''}
          <div class="sum-row"><span>${t('common.total')}</span><span class="v">${fmtMoney(o.total)}</span></div>
          ${o.walletUsed > 0 ? h`<div class="sum-row discount"><span>${t('common.wallet')}</span><span class="v">−${fmtMoney(o.walletUsed)}</span></div>` : ''}
          <div class="sum-row total"><span>${t('common.payable')}</span><span class="v">${fmtMoney(o.payable)}</span></div>
          <div class="row row-between mt-s">
            <span class="muted small">${t('common.payment')}</span>
            ${payBadge(o.payment)}
          </div>
          ${o.payment?.ref ? h`<p class="hint mono mt-s">${esc(o.payment.ref)}</p>` : ''}
          ${o.refund ? h`<p class="notice notice-success mt-s">${icon('wallet')}<span>${fmtMoney(o.refund.amount)} ${t('acc.tx.refund')} — ${fmtDate(o.refund.at)}</span></p>` : ''}
        </div>

        <div class="card mt">
          <strong>${icon('truck')} ${t(o.delivery === 'pickup' ? 'checkout.pickup' : 'checkout.courier')}</strong>
          ${o.delivery === 'pickup' ? h`
            <p class="muted small mt-s">${t('checkout.pickupDesc')}</p>
            <p class="mt-s small">${esc(S.settings?.store?.address || '')}</p>` : h`
            ${o.address ? h`
              <p class="small mt-s"><strong>${esc(o.address.receiver || '')}</strong> · ${fmtTel(o.address.phone || '')}</p>
              <p class="muted small">${esc(o.address.street || '')}${o.address.city ? `، ${esc(o.address.city)}` : ''}</p>
              ${o.address.postal ? h`<p class="muted small">${t('common.postal')}: ${esc(o.address.postal)}</p>` : ''}` : h`<p class="muted small mt-s">${t('acc.noAddress')}</p>`}
            ${o.zone ? h`<p class="small mt-s">${t('checkout.zone')}: ${esc(zoneLabel(o.zone))}</p>` : ''}`}
          ${o.express ? h`<p class="small mt-s"><span class="badge-pill bp-accent">${icon('zap')} ${t('checkout.express')}</span></p>` : ''}
          ${o.insured ? h`<p class="small mt-s"><span class="badge-pill bp-success">${icon('shield')} ${t('common.insurance')} ${fmtMoney(o.insuranceFee)}</span></p>` : ''}
          ${o.note ? h`<p class="hint mt-s">${icon('edit')} ${esc(o.note)}</p>` : ''}
          ${o.couponCode ? h`<p class="hint mt-s">${icon('percent')} ${o.couponCode}</p>` : ''}
        </div>
      </aside>
    </div>`;
}

// ── کنش‌ها ──────────────────────────────────────────────────
act('od-cancel', async (e, el) => {
  const reason = await promptDialog({ title: t('acc.cancelOrder'), text: t('acc.cancelReason'), label: t('acc.cancelReason'), rows: 3, okText: t('acc.cancelOrder') });
  if (reason === null) return;
  try {
    await api.post(`/api/me/orders/${el.dataset.id}/cancel`, { reason: reason || '' });
    toastSuccess(t('acc.orderCancelled'));
    refresh(true);
  } catch (err) { toastApiError(err); }
});

act('od-reorder', async (e, el) => {
  await withBusy(el, async () => {
    try {
      const { order } = await api.get(`/api/me/orders/${el.dataset.id}`);
      let added = 0;
      for (const it of order.items || []) {
        try { await api.post('/api/cart/add', { productId: it.productId, qty: it.qty || 1 }); added += 1; } catch { /* موجود نبود: رد شو */ }
      }
      await loadCart();
      if (!added) { toastApiError({ code: 'out_of_stock', message: isFa() ? 'هیچ‌کدام از اقلام در انبار نیست.' : 'None of the items are in stock.' }); return; }
      toastSuccess(t('card.added'));
      navigate('#/cart');
    } catch (err) { toastApiError(err); }
  });
});

act('od-invoice', async (e, el) => {
  const { order: o } = await api.get(`/api/me/orders/${el.dataset.id}`);
  const st = S.settings?.store || {};
  modal({
    title: t('acc.invoice'),
    body: h`
      <div class="invoice-print" dir="rtl">
        <div class="inv-head">
          <div>
            <strong>${esc(st.name || 'Yassaei Electronics')}</strong>
            <div class="tiny">${esc(st.address || '')}</div>
            <div class="tiny">${fmtTel(st.phone || '')}</div>
          </div>
          <div class="t-center">
            <div class="inv-code mono">${o.code}</div>
            <div class="tiny">${fmtDate(o.createdAt)}</div>
          </div>
        </div>
        <table class="inv-table">
          <thead><tr><th>#</th><th>کالا</th><th>تعداد</th><th>فی</th><th>مبلغ</th></tr></thead>
          <tbody>
            ${(o.items || []).map((it, i) => h`<tr>
              <td>${fmtNum(i + 1)}</td><td>${esc(it.name)}${it.sku ? ` <span class="mono tiny">(${it.sku})</span>` : ''}</td>
              <td>${fmtNum(it.qty)}</td><td>${fmtNum(it.price)}</td><td>${fmtNum(it.price * it.qty)}</td>
            </tr>`)}
          </tbody>
        </table>
        <div class="inv-sum">
          <div><span>جمع کالاها</span><span>${fmtNum(o.subtotal)}</span></div>
          ${o.discount ? h`<div><span>تخفیف</span><span>- ${fmtNum(o.discount)}</span></div>` : ''}
          <div><span>هزینهٔ ارسال${o.shippingLabel ? ` (${o.shippingLabel})` : ''}</span><span>${fmtNum(o.shipping)}</span></div>
          ${o.insuranceFee ? h`<div><span>بیمهٔ ارسال</span><span>${fmtNum(o.insuranceFee)}</span></div>` : ''}
          <div class="b"><span>مبلغ کل</span><span>${fmtNum(o.total)}</span></div>
          ${o.walletUsed ? h`<div><span>پرداخت از کیف پول</span><span>- ${fmtNum(o.walletUsed)}</span></div>` : ''}
          <div class="b"><span>قابل پرداخت</span><span>${fmtNum(o.payable)}</span></div>
        </div>
        <div class="inv-foot tiny">
          <div>وضعیت پرداخت: ${o.payment?.status === 'paid' ? 'پرداخت‌شده' : o.payment?.status === 'pending' ? 'در انتظار' : 'پرداخت‌نشده'} — روش: ${o.payment?.method || '—'}</div>
          <div>${esc(st.name || '')} · این فاکتور به‌صورت خودکار توسط سامانه صادر شده است.</div>
        </div>
      </div>
      <div class="row mt">
        <button class="btn btn-primary" data-act="print-page">${icon('printer')} ${t('common.print')}</button>
      </div>`,
  });
});

act('od-review', (e, el) => {
  const productId = el.dataset.id;
  const name = el.dataset.name || '';
  const handle = modal({
    title: `${t('pdp.writeReview')} — ${name}`,
    body: h`
      <form data-act="od-review-send" data-id="${productId}">
        <div class="field"><span class="label">${t('pdp.yourRating')}</span>${starsInput({ name: 'rating', value: 5 })}</div>
        ${field({ label: t('common.title'), name: 'title', required: true })}
        ${textareaField({ label: t('common.body'), name: 'body', required: true, rows: 5 })}
        <p class="hint mb">${t('pdp.reviewPending')}</p>
        <button class="btn btn-primary btn-block" type="submit">${t('common.submit')}</button>
      </form>`,
  });
  void handle;
});

act('od-review-send', async (e, form) => {
  e.preventDefault();
  const fd = new FormData(form);
  await withBusy(form.querySelector('button[type=submit]'), async () => {
    try {
      await api.post('/api/reviews', {
        productId: form.dataset.id, type: 'review',
        rating: Number(fd.get('rating') || 5), title: fd.get('title'), body: fd.get('body'),
      });
      toastSuccess(t('pdp.reviewSubmitted'));
      form.closest('.overlay')?.remove();
    } catch (err) { toastApiError(err); }
  });
});

export function mount(root, ctx) {
  applyDyn(root);
  void ctx;
  return null;
}
