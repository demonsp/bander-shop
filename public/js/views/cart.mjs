// ─────────────────────────────────────────────────────────────
//  سبد خرید
// ─────────────────────────────────────────────────────────────
import { html as h, icon, fmtNum, fmtMoney, applyDyn } from '../lib/dom.mjs';
import { t } from '../i18n.mjs';
import { api } from '../lib/api.mjs';
import { S, loadCart, setQty, removeFromCart, clearCart, applyCoupon, adInSlot, prodName } from '../state.mjs';
import { emptyState, bannerSlot, freeShipBar, qtyWidget } from '../components.mjs';
import { toast, toastSuccess, toastApiError, confirmDialog, withBusy } from '../ui.mjs';
import { act } from '../actions.mjs';
import { navigate } from '../router.mjs';

export async function render() {
  await loadCart().catch(() => {});
  const cart = S.cart;
  if (!cart.items?.length) {
    return h`
      <div class="section-head"><div><h1 class="section-title">${icon('cart')} ${t('cart.title')}</h1></div></div>
      ${emptyState({ icon: 'cart', title: t('cart.empty'), text: t('cart.emptyText'), action: { href: '#/products', label: t('cart.goShopping') } })}`;
  }
  return h`
    <div class="section-head">
      <div><h1 class="section-title">${icon('cart')} ${t('cart.title')}</h1>
      <p class="section-sub">${fmtNum(cart.count)} ${t('common.items')}</p></div>
      <button type="button" class="link-btn" data-act="cart-clear">${icon('trash')} ${t('cart.clear')}</button>
    </div>
    ${bannerSlot('cart', adInSlot('cart'))}
    <div class="cart-grid">
      <div class="card" data-lines>
        ${cart.items.map(lineHtml).join('')}
      </div>
      <aside class="summary card">
        <strong>${t('cart.summary')}</strong>
        <div class="sum-row"><span>${t('common.subtotal')}</span><span class="v">${fmtMoney(cart.subtotal)}</span></div>
        <div data-coupon-row>
          ${cart.coupon ? h`<div class="sum-row discount"><span>${t('common.discountCode')}: ${cart.coupon.code}</span><span class="v"><button type="button" class="link-btn" data-act="coupon-remove">${t('cart.removeCoupon')}</button></span></div>` : ''}
        </div>
        <div data-shipbar>${freeShipBar(cart.subtotal)}</div>
        ${!cart.coupon ? h`
          <form class="row mt-s" data-act="coupon-apply">
            <input class="input" name="code" placeholder="${t('cart.couponPlaceholder')}" maxlength="32">
            <button class="btn btn-ghost" type="submit">${t('cart.applyCoupon')}</button>
          </form>` : ''}
        <div class="sum-row total"><span>${t('common.payable')}</span><span class="v" data-total>${fmtMoney(cart.subtotal - (cart.couponDiscount || 0))}</span></div>
        <p class="hint">${t('checkout.concurrencyNote')}</p>
        <a class="btn btn-primary btn-block btn-lg mt" href="#/checkout">${t('cart.continue')} ${icon('chevron-left')}</a>
      </aside>
    </div>`;
}

function lineHtml(it) {
  const p = it.product;
  return h`
    <div class="cart-line" data-line="${p.id}">
      <a class="cl-img" href="#/product/${p.id}">${p.images?.[0] ? h`<img src="${p.images[0]}" alt="${prodName(p)}" loading="lazy" data-glyph="${p.glyph}">` : icon(p.glyph || 'box')}</a>
      <div class="cl-body">
        <a class="cl-name" href="#/product/${p.id}">${prodName(p)}</a>
        <div class="cl-meta">${p.brandName ? `${p.brandName} · ` : ''}${fmtMoney(p.price)} / ${t('common.unit')}</div>
        ${it.available < it.requestedQty ? h`<div class="err mt-s">${icon('alert')} ${t('common.lowStock')} (${fmtNum(it.available)})</div>` : ''}
        <div class="cl-foot">
          <span data-qtybox>${qtyWidget({ value: it.qty, max: Math.max(1, it.available), name: 'qty' })}</span>
          <button type="button" class="link-btn" data-act="cart-remove" data-id="${p.id}">${icon('trash')} ${t('cart.remove')}</button>
          <span class="cl-price">${fmtMoney(it.lineTotal)}</span>
        </div>
      </div>
    </div>`;
}

export function mount(root) {
  applyDyn(root);

  root.querySelectorAll('.qty input').forEach((input) => {
    input.addEventListener('change', async () => {
      const line = input.closest('[data-line]');
      const id = line.dataset.line;
      const qty = Math.max(1, Number(input.value) || 1);
      try {
        await setQty(id, qty);
        toast(t('cart.updated'), { timeout: 1500 });
        import('../router.mjs').then((m) => m.refresh(true));
      } catch (err) { toastApiError(err); import('../router.mjs').then((m) => m.refresh(true)); }
    });
  });

  act('cart-remove', async (e, el) => {
    try {
      await removeFromCart(el.dataset.id);
      import('../router.mjs').then((m) => m.refresh(true));
    } catch (err) { toastApiError(err); }
  });

  act('cart-clear', async () => {
    const ok = await confirmDialog({ text: t('cart.clearConfirm'), danger: true, okText: t('cart.clear') });
    if (!ok) return;
    try { await clearCart(); import('../router.mjs').then((m) => m.refresh(true)); }
    catch (err) { toastApiError(err); }
  });

  act('coupon-apply', async (e, form) => {
    e.preventDefault();
    const code = form.querySelector('[name=code]').value.trim();
    if (!code) return;
    await withBusy(form.querySelector('button'), async () => {
      try {
        await applyCoupon(code);
        toastSuccess(t('cart.couponApplied'));
        import('../router.mjs').then((m) => m.refresh(true));
      } catch (err) { toastApiError(err); }
    });
  });

  act('coupon-remove', async () => {
    try {
      await applyCoupon('');
      import('../router.mjs').then((m) => m.refresh(true));
    } catch (err) { toastApiError(err); }
  });
  return null;
}

export const title = () => t('cart.title');
