// ─────────────────────────────────────────────────────────────
//  بازاریابی: کدهای تخفیف، بنرهای تبلیغاتی و اعلان‌ها
// ─────────────────────────────────────────────────────────────
import { html as h, icon, esc, fmtNum, fmtMoney, fmtDate, timeAgo, applyDyn } from '../../lib/dom.mjs';
import { t, isFa } from '../../i18n.mjs';
import { api } from '../../lib/api.mjs';
import { tableHtml, field, selectField, switchField, textareaField, emptyState, errorState } from '../../components.mjs';
import { toastSuccess, toastApiError, modal, confirmDelete, withBusy } from '../../ui.mjs';
import { act } from '../../actions.mjs';
import { refresh } from '../../router.mjs';

const L = (fa, en) => (isFa() ? fa : en);
let COUPONS = [];
let ADS = [];
let SLOTS = [];

export async function render(ctx) {
  const sec = ctx.params.section;
  if (sec === 'ads') return adsView();
  if (sec === 'notifications') return notificationsView();
  return couponsView();
}

// ── کدهای تخفیف ─────────────────────────────────────────────
async function couponsView() {
  try { COUPONS = (await api.get('/api/admin/coupons')).items || []; }
  catch (err) { return errorState({ title: err?.message || t('err.generic') }); }
  const active = COUPONS.filter((c) => c.active !== false && new Date(c.endAt) > new Date()).length;

  return h`
    <div class="row row-between row-wrap mb">
      <div>
        <h2 class="section-title">${icon('percent')} ${t('adm.coupons')}</h2>
        <p class="muted small">${fmtNum(COUPONS.length)} ${L('کد', 'codes')} · ${fmtNum(active)} ${L('فعال', 'active')}</p>
      </div>
      <button class="btn btn-primary btn-sm" data-act="adm-cp-new">${icon('plus')} ${t('common.add')}</button>
    </div>

    ${tableHtml(
      [
        { label: t('cart.coupon') }, { label: t('common.type') }, { label: t('adm.cpValue'), cls: 'num' },
        { label: t('adm.cpUsage'), cls: 'num' }, { label: t('adm.cpDates') }, { label: t('common.status') }, { label: '', cls: 'num' },
      ],
      COUPONS.map((c) => {
        const expired = new Date(c.endAt) < new Date();
        return h`
        <tr>
          <td><span class="mono b">${esc(c.code)}</span>${c.note ? h`<div class="tiny muted">${esc(c.note)}</div>` : ''}</td>
          <td>${c.type === 'percent' ? t('adm.cpPercent') : t('adm.cpAmount')}</td>
          <td class="num">${c.type === 'percent' ? `${fmtNum(c.value)}٪` : fmtMoney(c.value)}
            ${c.maxDiscount ? h`<div class="tiny muted">${L('سقف', 'max')} ${fmtMoney(c.maxDiscount)}</div>` : ''}
            ${c.minOrder ? h`<div class="tiny muted">${L('حداقل سفارش', 'min order')} ${fmtMoney(c.minOrder)}</div>` : ''}</td>
          <td class="num">${fmtNum(c.used || 0)} / ${fmtNum(c.usageLimit || 0)}<div class="tiny muted">${L('هر کاربر', 'per user')}: ${fmtNum(c.perUser || 1)}</div></td>
          <td class="tiny nowrap">${fmtDate(c.startAt, { time: false })}<div class="tiny muted">${fmtDate(c.endAt, { time: false })}</div></td>
          <td>${expired ? h`<span class="badge-pill bp-muted">${t('adm.cpExpired')}</span>`
            : c.active === false ? h`<span class="badge-pill bp-muted">${t('common.inactive')}</span>`
            : h`<span class="badge-pill bp-success">${t('common.active')}</span>`}</td>
          <td>
            <div class="act">
              <button class="btn btn-ghost btn-xs" data-act="adm-cp-toggle" data-id="${c.id}" title="${t('common.active')}">${icon(c.active === false ? 'eye-off' : 'eye')}</button>
              <button class="btn btn-ghost btn-xs" data-act="adm-cp-edit" data-id="${c.id}">${icon('edit')}</button>
              <button class="btn btn-ghost btn-xs" data-act="adm-cp-copy" data-code="${esc(c.code)}">${icon('copy')}</button>
              <button class="btn btn-ghost btn-xs" data-act="adm-cp-del" data-id="${c.id}" data-name="${esc(c.code)}">${icon('trash')}</button>
            </div>
          </td>
        </tr>`;
      }),
      { emptyText: t('common.noData') },
    )}`;
}

function couponForm(c) {
  return modal({
    title: c ? t('common.edit') : t('adm.cpNew'),
    body: h`
      <form class="form-grid" data-act="adm-cp-save" data-id="${c?.id || ''}" data-isnew="${c ? '' : '1'}">
        ${field({ label: t('cart.coupon'), name: 'code', required: !c, value: c?.code || '', attrs: c ? 'readonly' : '', hint: L('حروف بزرگ انگلیسی و عدد', 'Uppercase letters and digits') })}
        ${selectField({
          label: t('common.type'), name: 'type', value: c?.type || 'percent',
          options: [{ value: 'percent', label: t('adm.cpPercent') }, { value: 'amount', label: t('adm.cpAmount') }],
        })}
        ${field({ label: t('adm.cpValue'), name: 'value', type: 'number', required: true, value: c?.value ?? 10, attrs: 'min="1" max="100000000"' })}
        ${field({ label: L('سقف تخفیف', 'Max discount'), name: 'maxDiscount', type: 'number', value: c?.maxDiscount ?? 0, attrs: 'min="0" max="100000000"' })}
        ${field({ label: L('حداقل مبلغ سفارش', 'Minimum order'), name: 'minOrder', type: 'number', value: c?.minOrder ?? 0, attrs: 'min="0" max="100000000"' })}
        ${field({ label: L('سقف استفادهٔ کل', 'Total usage limit'), name: 'usageLimit', type: 'number', value: c?.usageLimit ?? 100, attrs: 'min="1" max="100000"' })}
        ${field({ label: L('سقف هر کاربر', 'Per user'), name: 'perUser', type: 'number', value: c?.perUser ?? 1, attrs: 'min="1" max="100"' })}
        ${field({ label: t('adm.cpStart'), name: 'startAt', type: 'datetime-local', value: toLocal(c?.startAt) })}
        ${field({ label: t('adm.cpEnd'), name: 'endAt', type: 'datetime-local', value: toLocal(c?.endAt) })}
        <div class="span-2">${field({ label: t('common.note'), name: 'note', value: c?.note || '' })}</div>
        <div class="span-2">${switchField({ label: t('common.active'), name: 'active', checked: c ? c.active !== false : true })}</div>
        <button class="btn btn-primary span-2" type="submit">${t('common.save')}</button>
      </form>`,
  });
}

function toLocal(iso) {
  if (!iso) return '';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  const p = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}T${p(d.getHours())}:${p(d.getMinutes())}`;
}

let cpHandle = null;
act('adm-cp-new', () => { cpHandle = couponForm(null); });
act('adm-cp-edit', (e, el) => { cpHandle = couponForm(COUPONS.find((c) => c.id === el.dataset.id)); });
act('adm-cp-toggle', async (e, el) => {
  const c = COUPONS.find((x) => x.id === el.dataset.id);
  if (!c) return;
  try { await api.patch(`/api/admin/coupons/${c.id}`, { active: c.active === false }); refresh(true); }
  catch (err) { toastApiError(err); }
});
act('adm-cp-copy', async (e, el) => {
  try { await navigator.clipboard.writeText(el.dataset.code); toastSuccess(t('misc.copied')); }
  catch { toastSuccess(el.dataset.code); }
});
act('adm-cp-del', async (e, el) => {
  if (!(await confirmDelete(el.dataset.name))) return;
  try { await api.del(`/api/admin/coupons/${el.dataset.id}`); toastSuccess(t('misc.deleted')); refresh(true); }
  catch (err) { toastApiError(err); }
});
act('adm-cp-save', async (e, form) => {
  e.preventDefault();
  const fd = new FormData(form);
  const isNew = form.dataset.isnew === '1';
  const payload = {
    type: fd.get('type'), value: Number(fd.get('value') || 0), maxDiscount: Number(fd.get('maxDiscount') || 0),
    minOrder: Number(fd.get('minOrder') || 0), usageLimit: Number(fd.get('usageLimit') || 100),
    perUser: Number(fd.get('perUser') || 1), active: fd.get('active') === 'on', note: fd.get('note') || '',
  };
  if (fd.get('startAt')) payload.startAt = new Date(fd.get('startAt')).toISOString();
  if (fd.get('endAt')) payload.endAt = new Date(fd.get('endAt')).toISOString();
  if (isNew) payload.code = String(fd.get('code') || '').toUpperCase();
  await withBusy(form.querySelector('button[type=submit]'), async () => {
    try {
      if (isNew) await api.post('/api/admin/coupons', payload);
      else await api.patch(`/api/admin/coupons/${form.dataset.id}`, payload);
      toastSuccess(t('misc.saved'));
      cpHandle?.close();
      refresh(true);
    } catch (err) { toastApiError(err); }
  });
});

// ── بنرها / تبلیغات ─────────────────────────────────────────
async function adsView() {
  try {
    const r = await api.get('/api/admin/ads');
    ADS = r.items || []; SLOTS = r.slots || [];
  } catch (err) { return errorState({ title: err?.message || t('err.generic') }); }

  return h`
    <div class="row row-between row-wrap mb">
      <div>
        <h2 class="section-title">${icon('image')} ${t('adm.ads')}</h2>
        <p class="muted small">${t('adm.adsHint')}</p>
      </div>
      <button class="btn btn-primary btn-sm" data-act="adm-ad-new">${icon('plus')} ${t('common.add')}</button>
    </div>

    ${SLOTS.length ? SLOTS.map((s) => {
      const list = ADS.filter((a) => a.slot === s.id);
      return h`
      <div class="card mb">
        <div class="row row-between">
          <strong>${icon('pin')} ${esc(isFa() ? s.fa : (s.en || s.fa))}</strong>
          <span class="badge-pill bp-muted">${fmtNum(list.length)}</span>
        </div>
        ${list.length ? h`
          <div class="ad-rows mt-s">
            ${list.map((a) => h`
              <div class="ad-row ${a.active === false ? 'off' : ''}">
                ${a.image ? h`<img class="ad-img" src="${esc(a.image)}" alt="" loading="lazy" data-h="54px" data-w="88px">` : h`<span class="ad-img ph" data-h="54px" data-w="88px">${icon('image')}</span>`}
                <div class="grow">
                  <span class="b">${esc(isFa() ? a.title : (a.titleEn || a.title))}</span>
                  <span class="tiny muted">${esc(isFa() ? (a.text || '') : (a.textEn || a.text || ''))}</span>
                  <span class="tiny muted nowrap">${L('از', 'From')} ${fmtDate(a.startAt, { time: false })} ${L('تا', 'to')} ${fmtDate(a.endAt, { time: false })}${a.link ? ` · ${esc(a.link)}` : ''}</span>
                </div>
                <div class="act">
                  <button class="btn btn-ghost btn-xs" data-act="adm-ad-toggle" data-id="${a.id}">${icon(a.active === false ? 'eye-off' : 'eye')}</button>
                  <button class="btn btn-ghost btn-xs" data-act="adm-ad-edit" data-id="${a.id}">${icon('edit')}</button>
                  <button class="btn btn-ghost btn-xs" data-act="adm-ad-del" data-id="${a.id}" data-name="${esc(a.title)}">${icon('trash')}</button>
                </div>
              </div>`).join('')}
          </div>` : h`<p class="muted small mt-s">${t('common.noData')}</p>`}
      </div>`;
    }).join('') : emptyState({ icon: 'image', title: t('common.noData') })}`;
}

function adForm(a) {
  return modal({
    title: a ? t('common.edit') : t('adm.adNew'),
    body: h`
      <form class="form-grid" data-act="adm-ad-save" data-id="${a?.id || ''}" data-isnew="${a ? '' : '1'}">
        <div class="span-2">${selectField({
          label: t('adm.adSlot'), name: 'slot', value: a?.slot || SLOTS[0]?.id || 'home_hero',
          options: SLOTS.map((s) => ({ value: s.id, label: isFa() ? s.fa : (s.en || s.fa) })),
        })}</div>
        ${field({ label: t('common.title'), name: 'title', required: true, value: a?.title || '' })}
        ${field({ label: L('عنوان (انگلیسی)', 'Title (EN)'), name: 'titleEn', value: a?.titleEn || '' })}
        <div class="span-2">${textareaField({ label: t('common.text'), name: 'text', value: a?.text || '', rows: 2 })}</div>
        <div class="span-2">${textareaField({ label: L('متن (انگلیسی)', 'Text (EN)'), name: 'textEn', value: a?.textEn || '', rows: 2 })}</div>
        ${field({ label: t('common.link'), name: 'link', value: a?.link || '', hint: '#/products?cat=cases' })}
        ${field({ label: t('common.image'), name: 'image', value: a?.image || '', hint: '/assets/…' })}
        ${field({ label: L('متن دکمه', 'CTA label'), name: 'cta', value: a?.cta || '' })}
        ${field({ label: L('متن دکمه (انگلیسی)', 'CTA (EN)'), name: 'ctaEn', value: a?.ctaEn || '' })}
        ${field({ label: L('شروع', 'Start'), name: 'startAt', type: 'datetime-local', value: toLocal(a?.startAt) })}
        ${field({ label: L('پایان', 'End'), name: 'endAt', type: 'datetime-local', value: toLocal(a?.endAt) })}
        <div class="span-2">${switchField({ label: t('common.active'), name: 'active', checked: a ? a.active !== false : true })}</div>
        <button class="btn btn-primary span-2" type="submit">${t('common.save')}</button>
      </form>`,
  });
}

let adHandle = null;
act('adm-ad-new', () => { adHandle = adForm(null); });
act('adm-ad-edit', (e, el) => { adHandle = adForm(ADS.find((a) => a.id === el.dataset.id)); });
act('adm-ad-toggle', async (e, el) => {
  const a = ADS.find((x) => x.id === el.dataset.id);
  if (!a) return;
  try { await api.patch(`/api/admin/ads/${a.id}`, { active: a.active === false }); refresh(true); }
  catch (err) { toastApiError(err); }
});
act('adm-ad-del', async (e, el) => {
  if (!(await confirmDelete(el.dataset.name))) return;
  try { await api.del(`/api/admin/ads/${el.dataset.id}`); toastSuccess(t('misc.deleted')); refresh(true); }
  catch (err) { toastApiError(err); }
});
act('adm-ad-save', async (e, form) => {
  e.preventDefault();
  const fd = new FormData(form);
  const isNew = form.dataset.isnew === '1';
  const payload = {
    slot: fd.get('slot'), title: fd.get('title'), titleEn: fd.get('titleEn') || '',
    text: fd.get('text') || '', textEn: fd.get('textEn') || '', link: fd.get('link') || '',
    image: fd.get('image') || '', cta: fd.get('cta') || '', ctaEn: fd.get('ctaEn') || '',
    active: fd.get('active') === 'on',
  };
  if (fd.get('startAt')) payload.startAt = new Date(fd.get('startAt')).toISOString();
  if (fd.get('endAt')) payload.endAt = new Date(fd.get('endAt')).toISOString();
  await withBusy(form.querySelector('button[type=submit]'), async () => {
    try {
      if (isNew) await api.post('/api/admin/ads', payload);
      else await api.patch(`/api/admin/ads/${form.dataset.id}`, payload);
      toastSuccess(t('misc.saved'));
      adHandle?.close();
      refresh(true);
    } catch (err) { toastApiError(err); }
  });
});

// ── اعلان‌ها ────────────────────────────────────────────────
async function notificationsView() {
  let r = null;
  try { r = await api.get('/api/admin/notifications'); } catch (err) { return errorState({ title: err?.message || t('err.generic') }); }
  const items = r.items || [];
  const outbox = r.outbox || [];

  return h`
    <div class="row row-between row-wrap mb">
      <div>
        <h2 class="section-title">${icon('bell')} ${t('adm.notifications')}</h2>
        <p class="muted small">${t('adm.notifHint')}</p>
      </div>
    </div>

    <div class="cart-grid">
      <div class="col">
        <form class="card" data-act="adm-notif-send">
          <strong>${icon('send')} ${t('adm.notifNew')}</strong>
          <div class="form-grid mt-s">
            ${field({ label: t('common.title'), name: 'title', required: true, attrs: 'maxlength="120"' })}
            ${field({ label: L('عنوان (انگلیسی)', 'Title (EN)'), name: 'titleEn', attrs: 'maxlength="120"' })}
            <div class="span-2">${textareaField({ label: t('common.text'), name: 'body', rows: 3, attrs: 'maxlength="600"' })}</div>
            <div class="span-2">${textareaField({ label: L('متن (انگلیسی)', 'Text (EN)'), name: 'bodyEn', rows: 2 })}</div>
            ${selectField({
              label: t('adm.notifLevel'), name: 'level', value: 'info',
              options: [{ value: 'info', label: t('notif.level.info') }, { value: 'success', label: t('notif.level.success') }, { value: 'warning', label: t('notif.level.warning') }, { value: 'error', label: t('notif.level.error') }],
            })}
            ${selectField({
              label: t('common.type'), name: 'type', value: 'announcement',
              options: [{ value: 'announcement', label: t('notif.type.announcement') }, { value: 'news', label: t('notif.type.news') }, { value: 'offer', label: t('notif.type.offer') }, { value: 'system', label: t('notif.type.system') }],
            })}
            ${field({ label: t('common.link'), name: 'link', hint: '#/products' })}
            ${field({ label: L('شناسهٔ کاربر (خالی = همه)', 'User id (empty = everyone)'), name: 'userId' })}
          </div>
          <button class="btn btn-primary mt-s" type="submit">${icon('send')} ${t('common.send')}</button>
        </form>
      </div>

      <aside class="col">
        <div class="card">
          <strong>${icon('history')} ${t('adm.notifRecent')} (${fmtNum(items.length)})</strong>
          <div class="notif-list mt-s">
            ${items.length ? items.slice(0, 40).map((n) => h`
              <div class="notif-item lv-${esc(n.level || 'info')}">
                <div class="row row-between">
                  <strong class="tiny">${esc(isFa() ? n.title : (n.titleEn || n.title))}</strong>
                  <span class="tiny muted nowrap">${timeAgo(n.createdAt)}</span>
                </div>
                ${n.body ? h`<p class="tiny muted">${esc(isFa() ? n.body : (n.bodyEn || n.body))}</p>` : ''}
                <span class="tiny muted mono">${n.userId ? esc(n.userId) : L('همهٔ کاربران', 'All users')}${n.link ? ` · ${esc(n.link)}` : ''}</span>
              </div>`).join('') : h`<p class="muted small">${t('common.noData')}</p>`}
          </div>
        </div>
        ${outbox.length ? h`
        <div class="card mt">
          <strong>${icon('mail')} ${L('صف ارسال پیامک/ایمیل', 'SMS / email outbox')} (${fmtNum(outbox.length)})</strong>
          <div class="mt-s">
            ${outbox.map((o) => h`<div class="sum-row"><span class="tiny mono">${esc(o.to || o.target || '')}</span><span class="v tiny">${esc(String(o.body || o.text || '').slice(0, 60))}</span></div>`).join('')}
          </div>
        </div>` : ''}
      </aside>
    </div>`;
}

act('adm-notif-send', async (e, form) => {
  e.preventDefault();
  const fd = new FormData(form);
  const payload = {
    title: String(fd.get('title') || '').trim(),
    titleEn: String(fd.get('titleEn') || '').trim(),
    body: String(fd.get('body') || '').trim(),
    bodyEn: String(fd.get('bodyEn') || '').trim(),
    level: fd.get('level'), type: fd.get('type'),
    link: String(fd.get('link') || '').trim(),
    userId: String(fd.get('userId') || '').trim(),
  };
  if (payload.title.length < 3) return;
  await withBusy(form.querySelector('button[type=submit]'), async () => {
    try {
      await api.post('/api/admin/notifications', payload);
      toastSuccess(t('misc.sent'));
      refresh(true);
    } catch (err) { toastApiError(err); }
  });
});

export function mount(root) {
  applyDyn(root);
  return null;
}
