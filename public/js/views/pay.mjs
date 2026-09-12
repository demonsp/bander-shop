// ─────────────────────────────────────────────────────────────
//  صفحهٔ پرداخت (شبیه‌ساز درگاه در حالت آزمایشی)
// ─────────────────────────────────────────────────────────────
import { html as h, icon, fmtNum, fmtMoney, applyDyn } from '../lib/dom.mjs';
import { t } from '../i18n.mjs';
import { api } from '../lib/api.mjs';
import { S, refreshMe, loadCart } from '../state.mjs';
import { emptyState, timelineHtml } from '../components.mjs';
import { toastSuccess, toastApiError, withBusy } from '../ui.mjs';
import { navigate } from '../router.mjs';

export async function render(ctx) {
  const id = ctx.params.id;
  let order = null;
  try {
    const r = await api.get(`/api/me/orders/${encodeURIComponent(id)}`);
    order = r.order;
  } catch { /* noop */ }
  if (!order) return emptyState({ icon: 'alert', title: t('err.notFound'), action: { href: '#/account/orders', label: t('acc.orders') } });
  if (order.payment?.status === 'paid') {
    return h`<div class="card t-center">
      <span class="empty-ic">${icon('check-circle')}</span>
      <h2 class="mt-s">${t('checkout.paymentSuccess')}</h2>
      <a class="btn btn-primary mt" href="#/checkout/done/${order.id}">${t('acc.trackOrder')}</a>
    </div>`;
  }
  const payable = order.payable ?? order.total;
  const isInstallment = ['snapppay', 'azki', 'digipay'].includes(order.payment?.method);
  let providerName = '';
  if (order.payment?.method === 'snapppay') providerName = 'اسنپ‌پی';
  else if (order.payment?.method === 'azki') providerName = 'ازکی‌وام';
  else if (order.payment?.method === 'digipay') providerName = 'دیجی‌پی';

  return h`
    <div class="card" >
      <div class="t-center">
        <span class="pwa-ic center" data-h="64px" data-w="64px">${icon('card')}</span>
        <h1 class="mt-s">${isInstallment ? 'پرداخت اقساطی از طریق ' + providerName : t('common.payment')}</h1>
        <p class="muted">${t('acc.orderCode')}: <span class="mono b">${order.code}</span></p>
        <div class="buy-price center"><span class="buy-now">${fmtMoney(payable)}</span></div>
        
        ${isInstallment ? h`
          <div class="alert info text-right mb-4 mt-3">
            <strong>${icon('info')} شبیه‌ساز درگاه اقساطی (${providerName})</strong>
            <p class="mt-2 text-sm">در محیط واقعی، کاربر به درگاه ${providerName} منتقل شده و پس از اعتبارسنجی و کسر قسط اول (یا تایید اعتبار)، به سایت بازمی‌گردد.</p>
          </div>
        ` : h`
          <p class="notice notice-warn">${icon('info')}<span>${t('checkout.gatewayDemo')}</span></p>
        `}
        
        <div class="row center mt">
          <button class="btn btn-success btn-lg" data-act="pay-sim" data-id="${order.id}" data-ok="1">${icon('check')} ${t('checkout.simulateSuccess')}</button>
          <button class="btn btn-danger btn-lg" data-act="pay-sim" data-id="${order.id}" data-ok="0">${icon('close')} ${t('checkout.simulateFail')}</button>
        </div>
        <div class="divider"></div>
        <div class="row row-between small muted">
          <span>${t('acc.orderDate')}: ${order.createdAt}</span>
          <span>${t('common.items')}: ${fmtNum(order.items?.length || 0)}</span>
        </div>
      </div>
    </div>`;;
}

export function mount(root) { applyDyn(root); return null; }

import { act } from '../actions.mjs';
act('pay-sim', async (e, el) => {
  const ok = el.dataset.ok === '1';
  await withBusy(el, async () => {
    try {
      const r = await api.post(`/api/payments/simulate/${el.dataset.id}`, { success: ok });
      await refreshMe();
      await loadCart();
      if (ok) { toastSuccess(t('checkout.paymentSuccess')); fireConfetti(); navigate(`#/checkout/done/${el.dataset.id}`); }
      else { toastApiError({ code: 'payment_failed', message: t('checkout.paymentFailed'), details: 'Payment failed' }); navigate('#/account/orders'); }
    } catch (err) { toastApiError(err); }
  });
});

export const title = () => t('common.payment');
