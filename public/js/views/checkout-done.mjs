// ─────────────────────────────────────────────────────────────
//  صفحهٔ موفقیت ثبت سفارش
// ─────────────────────────────────────────────────────────────
import { html as h, icon, fmtNum, fmtMoney, applyDyn } from '../lib/dom.mjs';
import { t } from '../i18n.mjs';
import { api } from '../lib/api.mjs';
import { S } from '../state.mjs';
import { timelineHtml, statusBadge, payBadge } from '../components.mjs';

function fromSession(id) {
  try {
    const o = JSON.parse(sessionStorage.getItem('bm_last_order') || 'null');
    return o && o.id === id ? o : null;
  } catch { return null; }
}

export async function render(ctx) {
  const id = ctx.params.id;
  let order = fromSession(id);
  if (!order && S.me) {
    try { order = (await api.get(`/api/me/orders/${encodeURIComponent(id)}`)).order; } catch { /* noop */ }
  }
  if (!order) {
    return h`<div class="card t-center">
      <span class="empty-ic">${icon('check-circle')}</span>
      <h1 class="mt-s">${t('checkout.successTitle')}</h1>
      <a class="btn btn-primary mt" href="#/account/orders">${t('acc.orders')}</a>
    </div>`;
  }
  const paid = order.payment?.status === 'paid';
  return h`
    <div class="card t-center">
      <span class="pwa-ic center" data-h="72px" data-w="72px">${icon('check-circle')}</span>
      <h1 class="mt-s">${t('checkout.successTitle')}</h1>
      <p class="muted">${t('checkout.successText', { code: order.code })}</p>
      <div class="row center row-wrap mt">
        ${statusBadge(order.status)} ${payBadge(order.payment)}
        <span class="badge-pill bp-accent">${fmtMoney(order.total)}</span>
      </div>
      ${!paid && order.payment?.method === 'gateway' ? h`
        <a class="btn btn-success btn-lg mt" href="#/pay/${order.id}">${icon('card')} ${t('checkout.payNow')}</a>` : ''}
      <div class="row center row-wrap mt">
        <a class="btn btn-ghost" href="#/account/orders/${order.id}">${icon('package-check')} ${t('acc.trackOrder')}</a>
        <a class="btn btn-primary" href="#/products">${icon('cart')} ${t('cart.goShopping')}</a>
      </div>
      <div class="divider"></div>
      <div class="t-start">${timelineHtml(order)}</div>
    </div>`;
}

export function mount(root) { applyDyn(root); return null; }
export const title = () => t('checkout.successTitle');
