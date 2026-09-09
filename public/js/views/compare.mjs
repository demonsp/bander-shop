// ─────────────────────────────────────────────────────────────
//  مقایسهٔ کالاها
// ─────────────────────────────────────────────────────────────
import { html as h, raw, icon, fmtNum, fmtMoney, stars, applyDyn } from '../lib/dom.mjs';
import { t, isFa } from '../i18n.mjs';
import { api } from '../lib/api.mjs';
import { S, prodName } from '../state.mjs';
import { emptyState } from '../components.mjs';

export async function render() {
  const ids = S.compare.slice(0, 4);
  if (!ids.length) return emptyState({ icon: 'scale', title: t('compare.empty'), text: t('compare.emptyText'), action: { href: '#/products', label: t('cart.goShopping') } });
  const items = (await Promise.all(ids.map((id) => api.get(`/api/products/${encodeURIComponent(id)}`).catch(() => null)))).filter(Boolean).map((r) => r.product);
  if (!items.length) return emptyState({ icon: 'scale', title: t('compare.empty') });

  const specKeys = [...new Set(items.flatMap((p) => Object.keys(p.specs || {})))];
  const row = (label, cells) => h`<tr><th class="t-start">${label}</th>${cells.map((c) => h`<td>${c}</td>`)}</tr>`;

  return h`
    <div class="section-head"><div><h1 class="section-title">${icon('scale')} ${t('compare.title')}</h1>
    <p class="section-sub">${fmtNum(items.length)} / 4</p></div></div>
    <div class="table-wrap">
      <table class="table">
        <thead><tr><th class="t-start">${t('common.product')}</th>${items.map((p) => h`<th>
          <div class="col center">
            <a href="#/product/${p.id}">${p.images?.[0] ? h`<img class="table-img" src="${p.images[0]}" alt="${prodName(p)}" data-glyph="${p.glyph}">` : icon(p.glyph)}</a>
            <span class="small">${prodName(p)}</span>
            <button type="button" class="link-btn" data-act="compare-toggle" data-id="${p.id}">${icon('trash')} ${t('compare.remove')}</button>
          </div></th>`)}</tr></thead>
        <tbody>
          ${row(t('common.price'), items.map((p) => raw(fmtMoney(p.price))))}
          ${row(t('common.brand'), items.map((p) => isFa() ? p.brandName : (p.brandNameEn || p.brandName) || '—'))}
          ${row(t('common.stock'), items.map((p) => p.stock > 0 ? h`<span class="badge-pill bp-success">${fmtNum(p.stock)}</span>` : h`<span class="badge-pill bp-danger">${t('card.outOfStock')}</span>`))}
          ${row(t('common.rating'), items.map((p) => p.ratingCount ? h`${stars(p.ratingAvg)} ${fmtNum(p.ratingAvg)}` : '—'))}
          ${row(t('adm.pAuth'), items.map((p) => t(`auth.${p.authenticity || 'generic'}`)))}
          ${row(t('pdp.warranty'), items.map((p) => p.warrantyMonths ? t('pdp.warrantyMonths', { n: fmtNum(p.warrantyMonths) }) : t('pdp.noWarranty')))}
          ${row(t('pdp.weight'), items.map((p) => p.weight ? `${fmtNum(p.weight)} ${t('pdp.gram')}` : '—'))}
          ${specKeys.map((k) => row(k, items.map((p) => p.specs?.[k] || '—')))}
          ${row('', items.map((p) => h`<button type="button" class="btn btn-primary btn-sm" data-act="add-cart" data-id="${p.id}" ${p.stock <= 0 ? 'disabled' : ''}>${icon('cart')} ${t('card.addToCart')}</button>`))}
        </tbody>
      </table>
    </div>`;
}

export function mount(root) { applyDyn(root); return null; }
export const title = () => t('compare.title');
