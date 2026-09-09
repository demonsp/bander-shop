// ─────────────────────────────────────────────────────────────
//  داشبورد مدیریت: شاخص‌ها، کارهای در انتظار، نمودار، پرفروش‌ها،
//  موجودی کم، آخرین رویدادها و حجم داده
// ─────────────────────────────────────────────────────────────
import { html as h, icon, esc, fmtNum, fmtMoney, fmtDate, timeAgo } from '../../lib/dom.mjs';
import { t, isFa } from '../../i18n.mjs';
import { api } from '../../lib/api.mjs';
import { can } from '../../state.mjs';
import { kpiCard, barChart, tableHtml, productImage, statusBadge } from '../../components.mjs';
import { errorState } from '../../ui.mjs';

export async function render() {
  let d = null;
  try { d = await api.get('/api/admin/overview'); } catch (err) { return errorState({ title: err?.message || t('err.generic') }); }
  const s = d.stats || {};
  const chart = (d.chart || []).map((c) => ({ label: c.date, short: c.date.slice(8), value: c.visits || 0 }));

  return h`
    <div class="kpi-grid">
      ${kpiCard({ label: t('adm.kpi.ordersToday'), value: fmtNum(d.today?.orders || 0), sub: fmtMoney(d.today?.revenue || 0) })}
      ${kpiCard({ label: t('adm.kpi.visits'), value: fmtNum(d.today?.visits || 0), sub: `${t('stats.visitsTotal')}: ${fmtNum(s.visitsTotal || 0)}` })}
      ${kpiCard({ label: t('adm.kpi.revenueTotal'), value: fmtMoney(d.totals?.revenue || 0), sub: `${fmtNum(d.totals?.orders || 0)} ${t('common.orders')}` })}
      ${kpiCard({ label: t('adm.kpi.pending'), value: fmtNum(s.pendingOrders || 0), sub: t('adm.awaiting.orders') })}
      ${kpiCard({ label: t('adm.kpi.products'), value: fmtNum(s.products || 0), sub: `${fmtNum(s.outOfStock || 0)} ${t('stats.outOfStock')}` })}
      ${kpiCard({ label: t('adm.kpi.users'), value: fmtNum(s.customers || 0), sub: `${fmtNum(s.plusMembers || 0)} ${t('stats.plusMembers')}` })}
      ${kpiCard({ label: t('adm.kpi.lowStock'), value: fmtNum((d.lowStock || []).length), sub: t('adm.lowStockList') })}
      ${kpiCard({ label: t('adm.storage'), value: `${fmtNum(d.storage?.sizeKb || 0)} KB`, sub: 'db.json' })}
    </div>

    <div class="section-head mt"><div><h2 class="section-title">${icon('alert')} ${t('adm.awaiting')}</h2></div></div>
    <div class="kpi-grid">
      ${can('reviews.moderate') ? awaitCard('star', t('adm.awaiting.reviews'), d.awaiting?.reviews, '#/admin/reviews') : ''}
      ${can('tickets.manage') ? awaitCard('ticket', t('adm.awaiting.tickets'), d.awaiting?.tickets, '#/admin/tickets') : ''}
      ${can('orders.view') ? awaitCard('package-check', t('adm.awaiting.orders'), d.awaiting?.orders, '#/admin/orders') : ''}
      ${can('feedback.manage') ? awaitCard('flag', t('adm.awaiting.feedback'), d.awaiting?.feedback, '#/admin/feedback') : ''}
      ${can('tickets.manage') ? awaitCard('headset', t('adm.awaiting.chat'), d.awaiting?.support, '#/admin/support') : ''}
    </div>

    <div class="card mt">
      <strong>${icon('chart')} ${t('adm.chart')}</strong>
      ${chart.length ? barChart(chart, { height: 140 }) : h`<p class="muted small">${t('common.noData')}</p>`}
    </div>

    <div class="acc-grid mt">
      <div class="card">
        <strong>${icon('star')} ${t('adm.topSelling')}</strong>
        ${tableHtml(
          [{ label: '' }, { label: t('adm.pName') }, { label: t('pdp.sold'), cls: 'num' }, { label: t('common.stock'), cls: 'num' }, { label: t('common.price'), cls: 'num' }],
          (d.topSelling || []).map((p) => h`
            <tr>
              <td><span class="cl-img" data-h="42px" data-w="42px">${productImage({ ...p, images: p.image ? [p.image] : [] })}</span></td>
              <td><a class="b" href="#/admin/products/${p.id}">${esc(isFa() ? p.name : p.name)}</a></td>
              <td class="num">${fmtNum(p.sold)}</td>
              <td class="num">${fmtNum(p.stock)}</td>
              <td class="num">${fmtMoney(p.price)}</td>
            </tr>`),
          { emptyText: t('common.noData') },
        )}
      </div>
      <div class="card">
        <strong>${icon('box')} ${t('adm.lowStockList')}</strong>
        ${tableHtml(
          [{ label: t('adm.pName') }, { label: t('common.available'), cls: 'num' }, { label: '' }],
          (d.lowStock || []).map((p) => h`
            <tr>
              <td class="nowrap">${esc(p.name)}</td>
              <td class="num"><span class="badge-pill ${p.inStock ? 'bp-warn' : 'bp-danger'}">${fmtNum(Math.max(0, (p.stock || 0) - (p.reserved || 0)))}</span></td>
              <td><a class="btn btn-ghost btn-xs" href="#/admin/products/${p.id}">${t('common.edit')}</a></td>
            </tr>`),
          { emptyText: t('common.noData') },
        )}
      </div>
    </div>

    ${can('audit.view') ? h`
    <div class="card mt">
      <div class="row row-between">
        <strong>${icon('history')} ${t('adm.recentAudit')}</strong>
        <a class="section-link" href="#/admin/audit">${t('common.showAll')}</a>
      </div>
      ${tableHtml(
        [{ label: t('common.date') }, { label: t('adm.auditActor') }, { label: t('adm.auditAction') }, { label: t('adm.auditTarget') }],
        (d.recentAudit || []).map((a) => h`
          <tr>
            <td class="nowrap tiny">${timeAgo(a.at)}</td>
            <td class="tiny">${esc(a.actorName || '')} <span class="muted">(${esc(a.actorRole || '')})</span></td>
            <td class="mono tiny">${esc(a.action || '')}</td>
            <td class="tiny muted">${esc(String(a.target || '').slice(0, 40))}</td>
          </tr>`),
        { emptyText: t('common.noData') },
      )}
    </div>` : ''}`;
}

function awaitCard(ic, label, count, href) {
  return h`
    <a class="kpi await-card ${count > 0 ? 'hot' : ''}" href="${href}">
      <div class="l">${icon(ic)} ${label}</div>
      <div class="v">${fmtNum(count || 0)}</div>
    </a>`;
}

export function mount() { return null; }
