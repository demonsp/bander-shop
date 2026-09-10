// ─────────────────────────────────────────────────────────────
//  مدیریت کاربران: فهرست، نقش‌ها، دسترسی‌های ریز (۳۰+ کلید)،
//  کیف پول، اشتراک پلاس، امتیاز، مسدودسازی و بازنشانی رمز
// ─────────────────────────────────────────────────────────────
import { fmtTel, html as h, icon, esc, fmtNum, fmtMoney, fmtDate, applyDyn } from '../../lib/dom.mjs';
import { t, isFa } from '../../i18n.mjs';
import { api } from '../../lib/api.mjs';
import { S, can } from '../../state.mjs';
import { tableHtml, field, selectField } from '../../components.mjs';
import { toastSuccess, toastApiError, withBusy, errorState, confirmDialog, emptyState } from '../../ui.mjs';
import { act } from '../../actions.mjs';
import { refresh } from '../../router.mjs';

const F = { q: '', role: '' };
let PERMS = [];
let CACHE = [];

export async function render(ctx) {
  if (ctx.params.id) return detail(ctx.params.id);
  return list();
}

async function load() {
  const r = await api.get(api.url('/api/admin/users', { q: F.q, role: F.role }));
  CACHE = r.items || [];
  PERMS = r.permissions || [];
  return r;
}

async function list() {
  const bansCard = await bansPanel();
  let r = null;
  try { r = await load(); } catch (err) { return errorState({ title: err?.message || t('err.generic') }); }
  return h`
    <div class="row row-between row-wrap mb">
      <div>
        <h2 class="section-title">${icon('users')} ${t('adm.users')}</h2>
        <p class="muted small">${fmtNum(CACHE.length)} ${t('common.users')}</p>
      </div>
    </div>

    <form class="card mb adm-filter" data-act="adm-u-filter">
      <div class="form-grid">
        <label class="field"><span class="label">${t('common.search')}</span>
          <input class="input" name="q" value="${esc(F.q)}" placeholder="${t('common.name')} / ${t('common.username')} / ${t('common.phone')}">
        </label>
        ${selectField({
          label: t('adm.uRole'), name: 'role', value: F.role,
          options: [{ value: '', label: t('common.all') }, { value: 'user', label: t('common.user') }, { value: 'staff', label: L('کارمند', 'Staff') }, { value: 'owner', label: L('مالک', 'Owner') }],
        })}
      </div>
      <div class="row row-wrap mt-s">
        <button class="btn btn-primary btn-sm" type="submit">${icon('filter')} ${t('common.apply')}</button>
        <button class="btn btn-ghost btn-sm" type="button" data-act="adm-u-clear">${icon('close')} ${t('catalog.f.clear')}</button>
      </div>
    </form>

    ${tableHtml(
      [
        { label: t('common.user') }, { label: t('common.phone') }, { label: t('adm.uRole') },
        { label: t('common.balance'), cls: 'num' }, { label: t('acc.plus'), cls: 'num' },
        { label: t('common.orders'), cls: 'num' }, { label: t('adm.uDevice') }, { label: t('common.status') }, { label: '', cls: 'num' },
      ],
      CACHE.map((u) => h`
        <tr>
          <td>
            <span class="b">${esc(u.name || u.username)}</span>
            <span class="tiny muted mono">@${esc(u.username)}</span>
            ${u.twoFA ? h`<span class="badge-pill bp-success tiny">${icon('shield')}</span>` : ''}
          </td>
          <td class="mono tiny nowrap">${fmtTel(u.phone || '')}${u.email ? h`<div class="tiny muted">${esc(u.email)}</div>` : ''}</td>
          <td>${roleBadge(u.role)}</td>
          <td>${kycBadge(u.kycStatus)}</td>
          <td class="num">${fmtNum(u.wallet || 0)}</td>
          <td class="num">${u.plus ? h`<span class="badge-pill bp-accent">${t('common.active')}</span>` : h`<span class="muted">—</span>`}</td>
          <td class="num">${fmtNum(u.orders || 0)}<div class="tiny muted">${fmtMoney(u.spent || 0)}</div></td>
          <td class="tiny">${u.lastAgent ? h`<span>${u.lastAgent.os} · ${u.lastAgent.device}</span><div class="muted mono tiny">${esc(u.lastIp || '')}</div>` : h`<span class="muted">—</span>`}</td>
          <td>${u.banned ? h`<span class="badge-pill bp-danger">${t('adm.banned')}</span>` : u.status === 'blocked' ? h`<span class="badge-pill bp-danger">${t('adm.uBlocked')}</span>` : h`<span class="badge-pill bp-success">${t('common.active')}</span>`}</td>
          <td><div class="row row-end">
            ${can('users.manage') ? h`<button class="btn ${u.banned ? 'btn-success' : 'btn-danger'} btn-xs" data-act="adm-u-ban-toggle" data-id="${u.id}" data-val="${esc(u.phone || u.username)}" data-banned="${u.banned ? '1' : ''}" title="${u.banned ? t('adm.unban') : t('adm.ban')}">${icon(u.banned ? 'check' : 'lock')}</button>` : ''}
            ${can('users.manage') ? h`<a class="btn btn-ghost btn-xs" href="#/admin/users/${u.id}">${icon('edit')}</a>` : ''}
          </div></td>
        </tr>`),
      { emptyText: t('common.noResult') },
    )}`;
}

const L = (fa, en) => (isFa() ? fa : en);
function roleBadge(role) {
  const map = { owner: 'bp-accent', staff: 'bp-info', user: 'bp-muted' };
  const label = { owner: L('مالک', 'Owner'), staff: L('کارمند', 'Staff'), user: t('common.user') }[role] || role;
  return h`<span class="badge-pill ${map[role] || 'bp-muted'}">${label}</span>`;
}

async function detail(id) {
  try { if (!CACHE.length) await load(); } catch (err) { return errorState({ title: err?.message || t('err.generic') }); }
  const u = CACHE.find((x) => x.id === id);
  if (!u) return emptyState({ icon: 'user', title: t('common.noResult'), action: { href: '#/admin/users', label: t('adm.users') } });
  const perms = u.permissions || {};
  const isSelf = S.me?.id === u.id;
  const canPerms = can('users.permissions');

  return h`
    <div class="breadcrumb mb-s">
      <a href="#/admin/users">${t('adm.users')}</a> <span>/</span> <span>${esc(u.name || u.username)}</span>
    </div>

    <div class="card">
      <div class="row row-between row-wrap">
        <div>
          <h2 class="buy-title">${icon('user')} ${esc(u.name || u.username)} <span class="muted mono small">@${esc(u.username)}</span></h2>
          <p class="muted small mt-s">
            ${fmtTel(u.phone || '')}${u.email ? ` · ${esc(u.email)}` : ''} ·
            ${t('acc.memberSince', { date: fmtDate(u.createdAt, { time: false }) })} ·
            ${L('آخرین ورود', 'Last login')}: ${u.lastLoginAt ? fmtDate(u.lastLoginAt) : t('common.never')} (${fmtNum(u.loginCount || 0)})
          </p>
        </div>
        <div class="row row-wrap">
          ${roleBadge(u.role)}
          ${u.status === 'blocked' ? h`<span class="badge-pill bp-danger">${t('adm.uBlocked')}</span>` : ''}
          ${u.plus ? h`<span class="badge-pill bp-accent">${t('acc.plus')} ${fmtDate(u.plusUntil, { time: false })}</span>` : ''}
        </div>
      </div>
      <div class="stats-grid mt">
        <div class="stat-card"><span class="stat-ic">${icon('wallet')}</span><div><div class="stat-val">${fmtNum(u.wallet || 0)}</div><div class="stat-lbl">${t('common.balance')}</div></div></div>
        <div class="stat-card"><span class="stat-ic">${icon('gift')}</span><div><div class="stat-val">${fmtNum(u.points || 0)}</div><div class="stat-lbl">${t('common.points')}</div></div></div>
        <div class="stat-card"><span class="stat-ic">${icon('package-check')}</span><div><div class="stat-val">${fmtNum(u.orders || 0)}</div><div class="stat-lbl">${t('common.orders')}</div></div></div>
        <div class="stat-card"><span class="stat-ic">${icon('card')}</span><div><div class="stat-val">${fmtMoney(u.spent || 0)}</div><div class="stat-lbl">${L('مجموع خرید', 'Total spent')}</div></div></div>
      </div>
    </div>

    
    <!-- KYC Management -->
    ${u.kycStatus && u.kycStatus !== 'none' ? h`
      <div class="card mt box pad border-warning">
        <h3 class="mb-3">${icon('shield-check')} احراز هویت (KYC)</h3>
        <p class="muted">وضعیت فعلی: ${kycBadge(u.kycStatus)}</p>
        ${u.kycDocs ? h`
          <div class="grid gap-3 mt-3">
            <div>
              <strong>سلفی:</strong> <a href="#" target="_blank">${u.kycDocs.selfie}</a>
            </div>
            <div>
              <strong>کارت ملی:</strong> <a href="#" target="_blank">${u.kycDocs.idCard}</a>
            </div>
            <div>
              <strong>فرم تعهدنامه:</strong> <a href="#" target="_blank">${u.kycDocs.formDoc}</a>
            </div>
          </div>
        ` : ''}
        <form class="mt-4 row row-wrap gap-2" onsubmit="event.preventDefault(); window.submitAdminKyc(event.target, '${u.id}')">
          <select class="input" name="kycStatus">
            <option value="pending" ${u.kycStatus==='pending'?'selected':''}>در انتظار</option>
            <option value="approved" ${u.kycStatus==='approved'?'selected':''}>تأیید شده</option>
            <option value="rejected" ${u.kycStatus==='rejected'?'selected':''}>رد شده</option>
          </select>
          <input class="input flex-1" name="kycMessage" placeholder="پیام در صورت رد شدن مدارک..." value="${esc(u.kycMessage || '')}">
          <button class="btn primary" type="submit">${icon('save')} ذخیره وضعیت KYC</button>
        </form>
      </div>
    ` : ''}

    <form class="card mt" data-act="adm-u-save" data-id="${u.id}">
      <div class="form-grid">
        ${selectField({
          label: t('adm.uRole'), name: 'role', value: u.role,
          options: [
            { value: 'user', label: t('common.user') },
            { value: 'staff', label: L('کارمند', 'Staff') },
            ...(canPerms && (S.me?.role === 'owner' || u.role !== 'owner') ? [{ value: 'owner', label: L('مالک', 'Owner') }] : []),
          ],
        })}
        ${selectField({
          label: t('adm.uStatus'), name: 'status', value: u.status || 'active',
          options: [{ value: 'active', label: t('common.active') }, { value: 'blocked', label: t('adm.uBlocked') }],
        })}
        ${field({ label: t('common.points'), name: 'points', type: 'number', value: u.points || 0, attrs: 'min="0" max="1000000"' })}
      </div>

      ${canPerms ? h`
        <div class="row row-between row-wrap mt">
          <strong>${icon('key')} ${t('adm.uPerms')}</strong>
          <div class="row">
            <button type="button" class="btn btn-ghost btn-xs" data-act="adm-perm-all" data-v="1">${t('adm.uAll')}</button>
            <button type="button" class="btn btn-ghost btn-xs" data-act="adm-perm-all" data-v="0">${t('adm.uNone')}</button>
          </div>
        </div>
        <p class="hint">${t('adm.uPermsHint')}</p>
        <div class="perm-grid mt-s">
          ${PERMS.map((p) => h`
            <label class="perm-item">
              <span class="switch"><input type="checkbox" name="perm.${p.key}" ${perms[p.key] ? 'checked' : ''}><span class="track"></span></span>
              <span class="grow">${esc(isFa() ? p.fa : (p.en || p.fa))}<span class="k mono">${p.key}</span></span>
            </label>`)}
        </div>` : ''}

      <div class="row row-wrap mt">
        <button class="btn btn-primary" type="submit">${icon('save')} ${t('common.save')}</button>
        <a class="btn btn-ghost" href="#/admin/users">${t('common.back')}</a>
      </div>
    </form>

    <div class="acc-grid acc-grid-eq mt">
      ${can('wallet.manage') ? h`
      <form class="card" data-act="adm-u-wallet" data-id="${u.id}">
        <strong>${icon('wallet')} ${t('adm.uWalletAdjust')}</strong>
        <p class="muted small mt-s">${t('common.balance')}: ${fmtMoney(u.wallet || 0)}</p>
        ${field({ label: t('common.amount'), name: 'walletAdjust', type: 'number', value: '', attrs: 'min="-50000000" max="50000000" step="10000"', placeholder: '±' })}
        ${field({ label: t('adm.uWalletReason'), name: 'walletReason', value: '' })}
        <button class="btn btn-outline" type="submit">${t('common.apply')}</button>
      </form>` : ''}

      ${can('plus.manage') ? h`
      <form class="card" data-act="adm-u-plus" data-id="${u.id}">
        <strong>${icon('sparkles')} ${t('adm.uPlusDays')}</strong>
        <p class="muted small mt-s">${u.plus ? `${t('acc.plusActive', { date: fmtDate(u.plusUntil, { time: false }) })}` : t('acc.plusInactive')}</p>
        ${field({ label: t('common.day'), name: 'plusDays', type: 'number', value: '30', attrs: 'min="-365" max="365"' })}
        <div class="row row-wrap">
          <button class="btn btn-outline" type="submit">${t('common.apply')}</button>
          <button class="btn btn-ghost" type="button" data-act="adm-u-plus-off" data-id="${u.id}">${t('common.disabled')}</button>
        </div>
      </form>` : ''}

      ${can('users.manage') && !isSelf ? h`
      <form class="card" data-act="adm-u-pass" data-id="${u.id}">
        <strong>${icon('key')} ${t('adm.uResetPass')}</strong>
        <p class="muted small mt-s">${L('پس از تغییر، کاربر باید دوباره وارد شود و رمز را عوض کند.', 'The user must sign in again and change the password.')}</p>
        ${field({ label: t('auth.newPassword'), name: 'resetPassword', type: 'text', value: '', hint: t('auth.passwordRules') })}
        <button class="btn btn-danger" type="submit">${t('common.reset')}</button>
      </form>` : ''}
    </div>`;
}

// ── کنش‌ها ──────────────────────────────────────────────────
act('adm-u-filter', (e, form) => {
  e.preventDefault();
  const fd = new FormData(form);
  F.q = String(fd.get('q') || '').trim();
  F.role = String(fd.get('role') || '');
  refresh(true);
});
act('adm-u-clear', () => { F.q = ''; F.role = ''; refresh(true); });

act('adm-perm-all', (e, el) => {
  const on = el.dataset.v === '1';
  el.closest('form').querySelectorAll('input[name^="perm."]').forEach((i) => { i.checked = on; });
});

act('adm-u-save', async (e, form) => {
  e.preventDefault();
  const fd = new FormData(form);
  const payload = {
    role: fd.get('role'),
    status: fd.get('status'),
    points: Number(fd.get('points') || 0),
  };
  const perms = {};
  let hasPerms = false;
  form.querySelectorAll('input[name^="perm."]').forEach((i) => { perms[i.name.slice(5)] = i.checked; hasPerms = true; });
  if (hasPerms) payload.permissions = perms;
  await withBusy(form.querySelector('button[type=submit]'), async () => {
    try {
      await api.patch(`/api/admin/users/${form.dataset.id}`, payload);
      toastSuccess(t('adm.uSaved'));
      CACHE = [];
      refresh(true);
    } catch (err) { toastApiError(err); }
  });
});

act('adm-u-wallet', async (e, form) => {
  e.preventDefault();
  const fd = new FormData(form);
  const amount = Number(fd.get('walletAdjust') || 0);
  if (!amount) return;
  await withBusy(form.querySelector('button[type=submit]'), async () => {
    try {
      await api.patch(`/api/admin/users/${form.dataset.id}`, { walletAdjust: amount, walletReason: fd.get('walletReason') || 'تنظیم توسط مدیر' });
      toastSuccess(t('adm.uSaved'));
      CACHE = [];
      refresh(true);
    } catch (err) { toastApiError(err); }
  });
});

act('adm-u-plus', async (e, form) => {
  e.preventDefault();
  const days = Number(new FormData(form).get('plusDays') || 0);
  if (!days) return;
  await withBusy(form.querySelector('button[type=submit]'), async () => {
    try {
      await api.patch(`/api/admin/users/${form.dataset.id}`, { plusDays: days });
      toastSuccess(t('adm.uSaved'));
      CACHE = [];
      refresh(true);
    } catch (err) { toastApiError(err); }
  });
});

act('adm-u-plus-off', async (e, el) => {
  const ok = await confirmDialog({ text: L('اشتراک پلاس این کاربر غیرفعال شود؟', 'Disable Plus for this user?') });
  if (!ok) return;
  try {
    await api.patch(`/api/admin/users/${el.dataset.id}`, { plusDays: -365 });
    toastSuccess(t('adm.uSaved'));
    CACHE = [];
    refresh(true);
  } catch (err) { toastApiError(err); }
});

act('adm-u-pass', async (e, form) => {
  e.preventDefault();
  const pass = String(new FormData(form).get('resetPassword') || '');
  if (pass.length < 8) { toastApiError({ code: 'weak_password', message: t('auth.passwordRules') }); return; }
  await withBusy(form.querySelector('button[type=submit]'), async () => {
    try {
      await api.patch(`/api/admin/users/${form.dataset.id}`, { resetPassword: pass });
      toastSuccess(t('adm.uSaved'));
      form.reset();
    } catch (err) { toastApiError(err); }
  });
});

export function mount(root) {
  applyDyn(root);
  return null;
}

async function bansPanel() {
  if (!can('users.manage')) return '';
  let r = { items: [] };
  try { r = await api.get('/api/admin/bans'); } catch { return ''; }
  return h`
    <div class="card mb">
      <strong>${icon('lock')} ${t('adm.bans')}</strong>
      <form class="form-grid mt-s" data-act="adm-ban-add">
        ${selectField({ label: t('adm.banType'), name: 'type', options: [{ value: 'ip', label: 'IP' }, { value: 'phone', label: t('contact.mobile') }, { value: 'email', label: t('common.email') }, { value: 'username', label: t('common.username') }] })}
        ${field({ label: t('adm.banValue'), name: 'value', required: true })}
        ${field({ label: t('adm.banReason'), name: 'reason' })}
        ${field({ label: t('adm.banMinutes'), name: 'minutes', type: 'number', value: '0', attrs: 'min="0" max="525600" inputmode="numeric"' })}
        <button class="btn btn-danger" type="submit">${icon('lock')} ${t('adm.ban')}</button>
      </form>
      ${r.items?.length ? h`<div class="table-wrap mt-s"><table class="table">
        <thead><tr><th>${t('adm.banType')}</th><th>${t('adm.banValue')}</th><th>${t('adm.banReason')}</th><th>${t('common.date')}</th><th></th></tr></thead>
        <tbody>${r.items.map((b) => h`<tr>
          <td class="tiny">${b.type}${b.auto ? h` <span class="badge-pill bp-warn tiny">${t('adm.banAuto')}</span>` : ''}</td><td class="mono tiny">${esc(b.value)}</td><td class="tiny muted">${esc(b.reason || '')}</td><td class="tiny">${fmtDate(b.at)}${b.until ? h`<br><span class="muted">${t('adm.banUntil')}: ${fmtDate(b.until)}</span>` : ''}</td>
          <td><button class="btn btn-success btn-xs" data-act="adm-ban-del" data-id="${b.id}">${icon('check')} ${t('adm.unban')}</button></td>
        </tr>`)}</tbody></table></div>` : h`<p class="muted small mt-s">${t('adm.bansEmpty')}</p>`}
    </div>`;
}

act('adm-ban-add', async (e, form) => {
  e.preventDefault();
  try {
    await api.post('/api/admin/bans', { type: form.type.value, value: form.value.value, reason: form.reason?.value || '', minutes: Number(form.minutes?.value) || 0 });
    toastSuccess(t('adm.banDone')); refresh(true);
  } catch (err) { toastApiError(err); }
});
act('adm-ban-del', async (e, el) => {
  await withBusy(el, async () => {
    try { await api.del(`/api/admin/bans/${el.dataset.id}`); toastSuccess(t('adm.unbanDone')); refresh(true); }
    catch (err) { toastApiError(err); }
  });
});
act('adm-u-ban-toggle', async (e, el) => {
  const banned = el.dataset.banned === '1';
  if (banned) {
    const r = await api.get('/api/admin/bans');
    const b = (r.items || []).find((x) => x.value === String(el.dataset.val || '').toLowerCase());
    if (!b) { toastError(t('err.generic')); return; }
    try { await api.del(`/api/admin/bans/${b.id}`); toastSuccess(t('adm.unbanDone')); refresh(true); }
    catch (err) { toastApiError(err); }
    return;
  }
  const type = /^09\d{9}$/.test(el.dataset.val || '') ? 'phone' : (el.dataset.val || '').includes('@') ? 'email' : 'username';
  try { await api.post('/api/admin/bans', { type, value: el.dataset.val, reason: t('adm.banByAdmin') }); toastSuccess(t('adm.banDone')); refresh(true); }
  catch (err) { toastApiError(err); }
});


function kycBadge(status) {
  if (status === 'approved') return h`<span class="${applyDyn('badge-pill bp-success')}">تأیید شده</span>`;
  if (status === 'pending') return h`<span class="${applyDyn('badge-pill bp-warning')}">در انتظار</span>`;
  if (status === 'rejected') return h`<span class="${applyDyn('badge-pill bp-danger')}">رد شده</span>`;
  return h`<span class="${applyDyn('muted')}">—</span>`;
}
