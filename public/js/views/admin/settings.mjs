// ─────────────────────────────────────────────────────────────
//  تنظیمات فروشگاه: اطلاعات، پوسته، چیدمان رابط، امکانات، ارسال،
//  پلاس، سفارش/پرداخت، سئو، ارز، احراز هویت و پشتیبانی
//  فرم‌ها از روی ساختار تنظیمات ساخته می‌شوند (schema-driven)
// ─────────────────────────────────────────────────────────────
import { html as h, raw, icon, esc, applyDyn, fmtNum, fmtDate } from '../../lib/dom.mjs';
import { t, isFa } from '../../i18n.mjs';
import { api } from '../../lib/api.mjs';
import { can, refreshBootstrap, applyPrefs } from '../../state.mjs';
import { field, textareaField, selectField, switchField } from '../../components.mjs';
import { toastSuccess, toastError, toastApiError, withBusy, errorState, emptyState, confirmDialog } from '../../ui.mjs';
import { act } from '../../actions.mjs';
import { refresh } from '../../router.mjs';

const L = (fa, en) => (isFa() ? fa : en);

// ── تعریف فیلدها ────────────────────────────────────────────
const FIELDS = {
  mailsms: [
    { k: 'mail', label: () => t('adm.mailCfg'), type: 'group', fields: [
      { k: 'enabled', label: () => t('adm.mailEnabled'), type: 'bool' },
      { k: 'host', label: () => 'SMTP host', type: 'text' },
      { k: 'port', label: () => 'SMTP port', type: 'number', min: 1, max: 65535 },
      { k: 'user', label: () => t('common.username'), type: 'text' },
      { k: 'pass', label: () => t('common.password'), type: 'text' },
      { k: 'from', label: () => t('adm.mailFrom'), type: 'text' },
    ] },
    { k: 'sms', label: () => t('adm.smsCfg'), type: 'group', fields: [
      { k: 'enabled', label: () => t('adm.smsEnabled'), type: 'bool' },
      { k: 'apiKey', label: () => t('adm.smsKey'), type: 'text' },
      { k: 'sender', label: () => t('adm.smsSender'), type: 'text' },
    ] },
  ],
  store: [
    { k: 'name', label: () => L('نام فروشگاه', 'Store name'), type: 'text' },
    { k: 'nameEn', label: () => L('نام (انگلیسی)', 'Name (EN)'), type: 'text' },
    { k: 'tagline', label: () => L('شعار', 'Tagline'), type: 'text' },
    { k: 'taglineEn', label: () => L('شعار (انگلیسی)', 'Tagline (EN)'), type: 'text' },
    { k: 'phone', label: () => t('contact.phone'), type: 'text' },
    { k: 'phone2', label: () => t('contact.mobile'), type: 'text' },
    { k: 'phone3', label: () => L('شمارهٔ سوم (اختیاری)', 'Third phone (optional)'), type: 'text' },
    { k: 'whatsapp', label: () => t('contact.whatsapp'), type: 'text' },
    { k: 'email', label: () => t('common.email'), type: 'text' },
    { k: 'city', label: () => t('common.city'), type: 'text' },
    { k: 'cityEn', label: () => L('شهر (انگلیسی)', 'City (EN)'), type: 'text' },
    { k: 'address', label: () => t('common.address'), type: 'textarea' },
    { k: 'addressEn', label: () => L('آدرس (انگلیسی)', 'Address (EN)'), type: 'textarea' },
    { k: 'description', label: () => t('common.description'), type: 'textarea' },
    { k: 'descriptionEn', label: () => L('توضیحات (انگلیسی)', 'Description (EN)'), type: 'textarea' },
    { k: 'enamad', label: () => L('کد نماد اعتماد', 'Trust symbol code'), type: 'text' },
    { k: 'established', label: () => L('سال تأسیس (شمسی)', 'Founded year (Solar)'), type: 'number', min: 1300, max: 1500 },
    { k: 'mapCoords', label: () => L('مختصات نقشه', 'Map coordinates'), type: 'coords' },
    { k: 'socials', label: () => L('شبکه‌های اجتماعی', 'Social links'), type: 'kv', keys: ['instagram', 'telegram', 'eitaa', 'whatsapp', 'website'] },
    { k: 'workingHours', label: () => t('footer.workingHours'), type: 'rows', cols: [
      { k: 'fa', label: () => L('روز', 'Day (FA)') }, { k: 'en', label: () => L('Day (EN)', 'Day (EN)') },
      { k: 'time', label: () => L('ساعت', 'Hours (FA)') }, { k: 'timeEn', label: () => L('Hours (EN)', 'Hours (EN)') },
    ] },
  ],
  theme: [
    { k: 'theme', label: () => L('قالب ظاهری (تم)', 'Design Theme'), type: 'select', options: () => [
      ['default', L('پیش‌فرض (یاسایی/فروشگاه)', 'Default')],
      ['tehran-nights', L('شب‌های تهران', 'Tehran Nights')],
      ['milad', L('برج میلاد', 'Milad Tower')],
      ['azadi', L('میدان آزادی', 'Azadi Square')],
      ['lalehzar', L('لاله‌زار', 'Lalehzar')],
      ['tochal', L('توچال', 'Tochal')],
      ['valiasr', L('ولیعصر', 'Valiasr')],
      ['bazaar', L('بازار بزرگ', 'Grand Bazaar')],
      ['chitgar', L('چیتگر', 'Chitgar')],
      ['tajrish', L('تجریش', 'Tajrish')],
      ['darband', L('دربند', 'Darband')]
    ] },
    { k: 'accent', label: () => t('adm.tAccent'), type: 'color' },
    { k: 'mode', label: () => t('adm.tMode'), type: 'select', options: () => [['dark', t('theme.dark')], ['light', t('theme.light')]] },
    { k: 'bgStyle', label: () => t('adm.tBg'), type: 'select', options: () => [['waves', L('موج و تهران', 'Waves & port')], ['grid', L('شبکه‌ای', 'Grid')], ['plain', L('ساده', 'Plain')]] },
    { k: 'density', label: () => t('adm.tDensity'), type: 'select', options: () => [['compact', 'Compact'], ['normal', 'Normal'], ['comfy', 'Comfy']] },
    { k: 'contrast', label: () => t('adm.tContrast'), type: 'select', options: () => [['normal', 'Normal'], ['high', 'High']] },
    { k: 'radius', label: () => t('adm.tRadius'), type: 'number', min: 0, max: 32 },
    { k: 'portTheme', label: () => t('adm.tPort'), type: 'bool', hint: () => t('adm.tPortHint') },
    { k: 'animations', label: () => t('adm.tAnim'), type: 'bool' },
  ],
  ui: [
    { k: 'searchPosition', label: () => t('adm.uSearchPos'), type: 'select', options: () => [['start', t('adm.uPosStart')], ['center', t('adm.uPosCenter')], ['end', t('adm.uPosEnd')]] },
    { k: 'headerLayout', label: () => t('adm.uHeader'), type: 'select', options: () => [['logoStart', t('adm.uLayoutLogoStart')], ['split', t('adm.uLayoutSplit')], ['centered', t('adm.uLayoutCentered')]] },
    { k: 'navStyle', label: () => t('adm.uNav'), type: 'select', options: () => [['pills', 'Pills'], ['underline', 'Underline']] },
    { k: 'cardStyle', label: () => t('adm.uCards'), type: 'select', options: () => [['grid', t('catalog.viewGrid')], ['list', t('catalog.viewList')]] },
    { k: 'stickyHeader', label: () => t('adm.uSticky'), type: 'bool' },
    { k: 'showTicker', label: () => t('adm.uTicker'), type: 'bool' },
    { k: 'tickerSpeed', label: () => t('adm.uTickerSpeed'), type: 'number', min: 10, max: 90 },
    { k: 'quickView', label: () => t('adm.uQuick'), type: 'bool' },
    { k: 'floatingChat', label: () => t('adm.uChat'), type: 'bool' },
    { k: 'showBreadcrumbs', label: () => t('adm.uCrumb'), type: 'bool' },
    { k: 'columns', label: () => t('adm.uCols'), type: 'kvnum', keys: ['mobile', 'tablet', 'desktop', 'wide'], min: 1, max: 8 },
    { k: 'productCardInfo', label: () => t('adm.uCardInfo'), type: 'multi', options: () => [['brand', t('common.brand')], ['stock', t('common.stock')], ['rating', t('common.rating')], ['warranty', t('pdp.warranty')], ['sold', t('pdp.sold')]] },
    { k: 'tickerItems', label: () => t('adm.uTickerItems'), type: 'rows', cols: [
      { k: 'text', label: () => L('متن', 'Text') }, { k: 'textEn', label: () => L('متن (انگلیسی)', 'Text (EN)') }, { k: 'link', label: () => L('لینک', 'Link') },
    ] },
  ],
  shipping: [
    { k: 'pickupEnabled', label: () => t('checkout.pickup'), type: 'bool' },
    { k: 'courierEnabled', label: () => t('checkout.courier'), type: 'bool' },
    { k: 'courierBase', label: () => L('هزینهٔ پایهٔ ارسال', 'Base shipping fee'), type: 'number', min: 0, max: 10000000 },
    { k: 'freeOver', label: () => L('ارسال رایگان از مبلغ', 'Free shipping over'), type: 'number', min: 0, max: 100000000 },
    { k: 'handlingHours', label: () => L('زمان آماده‌سازی (ساعت)', 'Handling hours'), type: 'number', min: 1, max: 720 },
    { k: 'expressEnabled', label: () => t('checkout.express'), type: 'bool' },
    { k: 'expressFee', label: () => L('هزینهٔ ارسال فوری', 'Express fee'), type: 'number', min: 0, max: 10000000 },
    { k: 'insuranceRatePct', label: () => L('نرخ بیمه (درصد)', 'Insurance rate (%)'), type: 'number', min: 0, max: 20, step: 0.1 },
    { k: 'insuranceMin', label: () => L('حداقل هزینهٔ بیمه', 'Insurance minimum'), type: 'number', min: 0, max: 10000000 },
    { k: 'zones', label: () => t('checkout.zone'), type: 'rows', cols: [
      { k: 'id', label: () => L('شناسه', 'ID'), type: 'select', options: () => [['city', L('داخل شهر', 'City')], ['province', L('استان', 'Province')], ['country', L('کشور', 'Country')], ['island', L('جزایر', 'Islands')]] },
      { k: 'name', label: () => L('نام', 'Name') }, { k: 'nameEn', label: () => L('نام (انگلیسی)', 'Name (EN)') },
      { k: 'fee', label: () => L('هزینه', 'Fee'), type: 'number' }, { k: 'eta', label: () => L('زمان تحویل', 'ETA') },
    ] },
  ],
  plus: [
    { k: 'enabled', label: () => t('feat.plus'), type: 'bool' },
    { k: 'price', label: () => L('مبلغ اشتراک', 'Price'), type: 'number', min: 0, max: 100000000 },
    { k: 'durationDays', label: () => L('مدت (روز)', 'Duration (days)'), type: 'number', min: 1, max: 365 },
    { k: 'discountPct', label: () => L('تخفیف دائمی (درصد)', 'Permanent discount (%)'), type: 'number', min: 0, max: 30, step: 0.5 },
    { k: 'freeShippingMin', label: () => L('ارسال رایگان از مبلغ', 'Free shipping over'), type: 'number', min: 0, max: 100000000 },
    { k: 'autoInsurance', label: () => L('بیمهٔ خودکار', 'Auto insurance'), type: 'bool' },
    { k: 'prioritySupport', label: () => L('پشتیبانی اولویت‌دار', 'Priority support'), type: 'bool' },
    { k: 'expressDiscountPct', label: () => L('تخفیف ارسال فوری (درصد)', 'Express discount (%)'), type: 'number', min: 0, max: 100 },
    { k: 'perks', label: () => t('acc.plusPerks'), type: 'rows', cols: [
      { k: 'id', label: () => 'id' }, { k: 'fa', label: () => L('مزیت', 'Perk (FA)') }, { k: 'en', label: () => L('Perk (EN)', 'Perk (EN)') },
    ] },
  ],
  orders: [
    { k: 'minOrder', label: () => L('حداقل مبلغ سفارش', 'Minimum order'), type: 'number', min: 0, max: 100000000 },
    { k: 'walletEnabled', label: () => t('feat.wallet'), type: 'bool' },
    { k: 'gatewayEnabled', label: () => t('pm.gateway'), type: 'bool' },
    { k: 'gatewayMode', label: () => L('حالت درگاه', 'Gateway mode'), type: 'select', options: () => [['demo', L('آزمایشی', 'Demo')], ['live', L('واقعی', 'Live')]] },
    { k: 'codEnabled', label: () => t('pm.cod'), type: 'bool' },
    { k: 'autoCancelHours', label: () => L('لغو خودکار پس از (ساعت)', 'Auto-cancel after (h)'), type: 'number', min: 1, max: 720 },
    { k: 'stockReserveMinutes', label: () => L('رزرو موجودی (دقیقه)', 'Stock reserve (min)'), type: 'number', min: 0, max: 1440 },
    { k: 'refundToWallet', label: () => L('بازگشت وجه به کیف پول', 'Refund to wallet'), type: 'bool' },
  ],
  seo: [
    { k: 'title', label: () => L('عنوان سایت', 'Site title'), type: 'text' },
    { k: 'description', label: () => L('توضیحات متا', 'Meta description'), type: 'textarea' },
    { k: 'keywords', label: () => L('کلیدواژه‌ها', 'Keywords'), type: 'text' },
    { k: 'googleSiteVerification', label: () => L('کد تأیید سرچ کنسول گوگل', 'Google Site Verification Code'), type: 'text' },
  ],
  currency: [
    { k: 'code', label: () => L('کد ارز', 'Currency code'), type: 'text' },
    { k: 'label', label: () => L('نام واحد', 'Unit label'), type: 'text' },
    { k: 'labelEn', label: () => L('Unit (EN)', 'Unit (EN)'), type: 'text' },
  ],
  auth: [
    { k: 'allowRegistration', label: () => L('ثبت‌نام باز باشد', 'Allow registration'), type: 'bool' },
    { k: 'otpMode', label: () => L('حالت ارسال کد', 'OTP mode'), type: 'select', options: () => [['demo', L('آزمایشی', 'Demo')], ['live', L('واقعی', 'Live')]] },
    { k: 'requirePhone', label: () => L('شمارهٔ موبایل الزامی', 'Require phone'), type: 'bool' },
    { k: 'force2faStaff', label: () => L('۲FA اجباری کارکنان', 'Force 2FA for staff'), type: 'bool' },
    { k: 'sessionDays', label: () => L('طول نشست (روز)', 'Session days'), type: 'number', min: 1, max: 90 },
  ],
  contact: [
    { k: 'supportNote', label: () => L('پیام بخش پشتیبانی', 'Support note'), type: 'textarea' },
    { k: 'supportNoteEn', label: () => L('Support note (EN)', 'Support note (EN)'), type: 'textarea' },
  ],
};

const TABS = {
  settings: [
    { id: 'store', icon: 'store', label: () => t('adm.sStore') },
    { id: 'shipping', icon: 'truck', label: () => t('adm.sShipping') },
    { id: 'plus', icon: 'sparkles', label: () => t('adm.sPlus') },
    { id: 'orders', icon: 'card', label: () => t('adm.sOrders') },
    { id: 'auth', icon: 'key', label: () => t('adm.sAuth') },
    { id: 'seo', icon: 'search', label: () => t('adm.sSeo') },
    { id: 'currency', icon: 'wallet', label: () => L('واحد پول', 'Currency') },
    { id: 'partners', icon: 'star', label: () => t('adm.sPartners') },
    { id: 'contact', icon: 'headset', label: () => t('common.support') },
    { id: 'mailsms', icon: 'send', label: () => t('adm.mailsms') },
  ],
  theme: [
    { id: 'theme', icon: 'sun', label: () => t('adm.sTheme') },
    { id: 'ui', icon: 'grid', label: () => t('adm.sUi') },
  ],
  features: [
    { id: 'features', icon: 'zap', label: () => t('adm.sFeatures') },
    { id: 'backups', icon: 'download', label: () => t('adm.sBackups') },
  ],
};

let CFG = null;

export async function render(ctx) {
  const sec = ['settings', 'theme', 'features'].includes(ctx.params.section) ? ctx.params.section : 'settings';
  const tabs = TABS[sec].filter((x) => (sec === 'theme' ? can('theme.edit') : true));
  if (!tabs.length) return emptyState({ icon: 'lock', title: t('adm.noPermission') });
  const tab = tabs.find((x) => x.id === ctx.params.id) || tabs[0];

  try { CFG = await api.get('/api/admin/settings'); }
  catch (err) { return errorState({ title: err?.message || t('err.generic') }); }

  const values = CFG.settings?.[tab.id] || {};
  return h`
    <div class="row row-between row-wrap mb">
      <h2 class="section-title">${icon(tab.icon)} ${tab.label()}</h2>
      <span class="badge-pill bp-info">${t('adm.liveView')}</span>
    </div>
    <div class="tabs mb" data-tabs>
      ${TABS[sec].filter((x) => (sec === 'theme' ? can('theme.edit') : true)).map((x) => h`
        <a class="tab ${x.id === tab.id ? 'active' : ''}" href="#/admin/${sec}/${x.id}">${icon(x.icon)} ${x.label()}</a>`)}
    </div>
    ${tab.id === 'features' ? featuresForm(CFG.settings?.features || {})
      : tab.id === 'backups' ? raw('<div data-backups-panel></div>')
      : tab.id === 'partners' ? partnersForm(CFG.settings?.partners?.items || [])
      : schemaForm(tab.id, values)}
    <p class="hint mt">${L('تغییرها بلافاصله روی سایت اعمال می‌شود؛ برای دیدن نتیجه صفحه را تازه کن.', 'Changes apply to the site immediately; refresh the page to see them.')}</p>`;
}

function schemaForm(section, values) {
  const fields = FIELDS[section] || [];
  return h`
    <form class="card" data-act="adm-set-save" data-section="${section}">
      <div class="form-grid">
        ${fields.map((f) => renderField(f, values[f.k])).join('')}
      </div>
      <div class="row row-wrap mt">
        <button class="btn btn-primary" type="submit">${icon('save')} ${t('common.save')}</button>
        <button class="btn btn-ghost" type="button" data-act="adm-set-reset">${icon('refresh')} ${t('common.reset')}</button>
      </div>
    </form>`;
}

function renderField(f, value) {
  const label = f.label();
  switch (f.type) {
    case 'bool':
      return h`<div class="span-2">${switchField({ label, desc: f.hint ? f.hint() : '', name: f.k, checked: value !== false })}</div>`;
    case 'select':
      return selectField({ label, name: f.k, value: value ?? '', options: f.options().map(([v, l]) => ({ value: v, label: l })) });
    case 'number':
      return field({ label, name: f.k, type: 'number', value: value ?? '', attrs: `min="${f.min ?? 0}" max="${f.max ?? 999999999}" step="${f.step ?? 1}"` });
    case 'textarea':
      return h`<div class="span-2">${textareaField({ label, name: f.k, value: value ?? '', rows: 3 })}</div>`;
    case 'color':
      return h`
        <label class="field"><span class="label">${label}</span>
          <span class="row color-row">
            <input type="color" class="color-pick" name="${f.k}-pick" value="${esc(value || '#f59e0b')}" data-color-for="${f.k}">
            <input class="input mono" name="${f.k}" value="${esc(value || '#f59e0b')}" maxlength="7" data-fkey="${f.k}">
          </span>
        </label>`;
    case 'coords':
      return h`
        <div class="span-2"><span class="label">${label}</span>
          <div class="row">
            <input class="input mono" name="${f.k}.lat" value="${value?.lat ?? ''}" placeholder="lat" data-fnum="1">
            <input class="input mono" name="${f.k}.lng" value="${value?.lng ?? ''}" placeholder="lng" data-fnum="1">
            <button type="button" class="btn btn-ghost btn-sm" data-act="adm-set-geo" data-lat="${f.k}.lat" data-lng="${f.k}.lng">${icon('pin')} ${t('contact.allowLocation')}</button>
          </div>
        </div>`;
    case 'group':
      return h`
        <div class="span-2 group-box">
          <strong class="small">${label}</strong>
          <div class="form-grid mt-s">
            ${f.fields.map((sf) => sf.type === 'bool'
              ? h`<div class="span-2">${switchField({ label: sf.label(), name: `${f.k}.${sf.k}`, checked: value?.[sf.k] !== false })}</div>`
              : sf.type === 'number'
                ? field({ label: sf.label(), name: `${f.k}.${sf.k}`, type: 'number', value: value?.[sf.k] ?? '' })
                : field({ label: sf.label(), name: `${f.k}.${sf.k}`, value: value?.[sf.k] ?? '', type: sf.k === 'pass' || sf.k === 'apiKey' ? 'password' : 'text' })).join('')}
          </div>
        </div>`;
    case 'kv':
      return h`
        <div class="span-2"><span class="label">${label}</span>
          <div class="form-grid">
            ${f.keys.map((k) => h`<label class="field"><span class="label tiny muted mono">${k}</span>
              <input class="input" name="${f.k}.${k}" value="${esc(value?.[k] ?? '')}"></label>`)}
          </div>
        </div>`;
    case 'kvnum':
      return h`
        <div class="span-2"><span class="label">${label}</span>
          <div class="form-grid">
            ${f.keys.map((k) => h`<label class="field"><span class="label tiny muted">${t(`adm.uCols${k.charAt(0).toUpperCase()}${k.slice(1)}`)}</span>
              <input class="input" type="number" min="${f.min}" max="${f.max}" name="${f.k}.${k}" value="${value?.[k] ?? ''}"></label>`)}
          </div>
        </div>`;
    case 'multi':
      return h`
        <div class="span-2"><span class="label">${label}</span>
          <div class="row row-wrap">
            ${f.options().map(([v, l]) => h`<label class="check"><input type="checkbox" name="${f.k}[]" value="${v}" ${(value || []).includes(v) ? 'checked' : ''}><span class="box">${icon('check')}</span><span>${l}</span></label>`)}
          </div>
        </div>`;
    case 'rows':
      return h`
        <div class="span-2">
          <div class="row row-between">
            <span class="label">${label}</span>
            <button type="button" class="btn btn-ghost btn-xs" data-act="adm-row-add" data-row="${f.k}">${icon('plus')} ${t('common.add')}</button>
          </div>
          <div data-rows="${f.k}">
            ${(Array.isArray(value) ? value : []).map((row) => rowHtml(f, row)).join('')}
          </div>
          <template data-row-tpl="${f.k}">${rowHtml(f, null)}</template>
        </div>`;
    default:
      return field({ label, name: f.k, value: value ?? '' });
  }
}

function rowHtml(f, row) {
  return h`
    <div class="spec-row" data-row="${f.k}">
      ${f.cols.map((c) => {
        const v = row?.[c.k] ?? '';
        return c.type === 'select'
          ? h`<select class="select" data-col="${c.k}">${c.options().map(([ov, ol]) => h`<option value="${ov}" ${String(v) === String(ov) ? 'selected' : ''}>${ol}</option>`)}</select>`
          : c.type === 'number'
            ? h`<input class="input" type="number" data-col="${c.k}" value="${esc(v)}" placeholder="${c.label ? c.label() : c.k}">`
            : h`<input class="input" data-col="${c.k}" value="${esc(v)}" placeholder="${c.label ? c.label() : c.k}">`;
      })}
      <button type="button" class="btn btn-ghost btn-icon btn-sm" data-act="adm-row-del">${icon('trash')}</button>
    </div>`;
}

function featuresForm(features) {
  const keys = Object.keys(features);
  return h`
    <form class="card" data-act="adm-set-save" data-section="features">
      <p class="notice notice-info mb">${icon('info')}<span>${t('adm.fHint')}</span></p>
      <div class="perm-grid">
        ${keys.map((k) => h`
          <label class="perm-item">
            <span class="switch"><input type="checkbox" name="features.${k}" ${features[k] !== false ? 'checked' : ''}><span class="track"></span></span>
            <span class="grow">${t(`feat.${k}`) || k}<span class="k mono">${k}</span></span>
          </label>`)}
      </div>
      <div class="row row-wrap mt">
        <button class="btn btn-primary" type="submit">${icon('save')} ${t('common.save')}</button>
        <button class="btn btn-ghost" type="button" data-act="adm-set-reset">${icon('refresh')} ${t('common.reset')}</button>
      </div>
    </form>`;
}

function partnersForm(items) {
  const row = (it) => h`
    <div class="row pt-row" data-ptrow>
      <input class="input" name="fa" placeholder="${t('adm.ptFa')}" value="${it?.fa || ''}" maxlength="60">
      <input class="input" name="en" placeholder="${t('adm.ptEn')}" value="${it?.en || ''}" maxlength="60">
      <button type="button" class="btn btn-ghost btn-sm" data-act="adm-pt-del" aria-label="${t('misc.delete')}">${icon('trash')}</button>
    </div>`;
  return h`
    <form class="card" data-act="adm-set-save" data-section="partners">
      <p class="notice notice-info mb">${icon('info')}<span>${t('adm.ptHint')}</span></p>
      <div class="col" data-ptlist>${items.map((it) => row(it)).join('') || row(null)}</div>
      <div class="row row-wrap mt">
        <button type="button" class="btn btn-ghost" data-act="adm-pt-add">${icon('plus')} ${t('adm.ptAdd')}</button>
        <button class="btn btn-primary" type="submit">${icon('save')} ${t('common.save')}</button>
      </div>
    </form>`;
}
act('adm-pt-add', (e) => {
  const list = e.target.closest('form').querySelector('[data-ptlist]');
  list.insertAdjacentHTML('beforeend', `<div class="row pt-row" data-ptrow><input class="input" name="fa" placeholder="${t('adm.ptFa')}" value="" maxlength="60"><input class="input" name="en" placeholder="${t('adm.ptEn')}" value="" maxlength="60"><button type="button" class="btn btn-ghost btn-sm" data-act="adm-pt-del" aria-label="${t('misc.delete')}">${icon('trash')}</button></div>`);
});
act('adm-pt-del', (e) => {
  const form = e.target.closest('form');
  const rows = form.querySelectorAll('[data-ptrow]');
  if (rows.length > 1) e.target.closest('[data-ptrow]').remove();
  else form.querySelectorAll('[data-ptrow] input').forEach((i) => (i.value = ''));
});

// ── جمع‌آوری مقادیر ────────────────────────────────────────
function collect(form, section) {
  const out = {};
  if (section === 'features') {
    form.querySelectorAll('input[type=checkbox][name^="features."]').forEach((i) => { out[i.name.slice(9)] = i.checked; });
    return out;
  }
  if (section === 'partners') {
    out.items = [...form.querySelectorAll('[data-ptrow]')].map((r) => ({ fa: r.querySelector('[name=fa]').value.trim(), en: r.querySelector('[name=en]').value.trim() })).filter((x) => x.fa || x.en);
    return out;
  }
  for (const f of FIELDS[section] || []) {
    switch (f.type) {
      case 'bool': {
        const el = form.querySelector(`[name="${f.k}"]`);
        if (el) out[f.k] = el.checked;
        break;
      }
      case 'multi': {
        out[f.k] = [...form.querySelectorAll(`[name="${f.k}[]"]`)].filter((i) => i.checked).map((i) => i.value);
        break;
      }
      case 'rows': {
        out[f.k] = [...form.querySelectorAll(`[data-rows="${f.k}"] [data-row]`)].map((row) => {
          const o = {};
          for (const c of f.cols) {
            const el = row.querySelector(`[data-col="${c.k}"]`);
            o[c.k] = c.type === 'number' ? Number(el?.value || 0) : String(el?.value ?? '');
          }
          return o;
        });
        break;
      }
      case 'kv': {
        const o = {};
        for (const k of f.keys) o[k] = String(form.querySelector(`[name="${f.k}.${k}"]`)?.value ?? '');
        out[f.k] = o;
        break;
      }
      case 'group': {
        const o = {};
        for (const sf of f.fields) {
          const el = form.querySelector(`[name="${f.k}.${sf.k}"]`);
          if (!el) continue;
          o[sf.k] = sf.type === 'bool' ? el.checked : sf.type === 'number' ? Number(el.value || 0) : String(el.value ?? '');
        }
        out[f.k] = o;
        break;
      }
      case 'kvnum': {
        const o = {};
        for (const k of f.keys) o[k] = Number(form.querySelector(`[name="${f.k}.${k}"]`)?.value || 0);
        out[f.k] = o;
        break;
      }
      case 'coords': {
        const lat = form.querySelector(`[name="${f.k}.lat"]`)?.value;
        const lng = form.querySelector(`[name="${f.k}.lng"]`)?.value;
        if (lat !== '' && lng !== '' && lat !== undefined) out[f.k] = { lat: Number(lat), lng: Number(lng) };
        break;
      }
      case 'number': {
        const el = form.querySelector(`[name="${f.k}"]`);
        if (el && el.value !== '') out[f.k] = Number(el.value);
        break;
      }
      default: {
        const el = form.querySelector(`[name="${f.k}"]`);
        if (el) out[f.k] = String(el.value ?? '');
      }
    }
  }
  return out;
}

// ── کنش‌ها ──────────────────────────────────────────────────
act('adm-set-save', async (e, form) => {
  e.preventDefault();
  const section = form.dataset.section;
  const value = collect(form, section);
  if (section === 'theme' && value.accent && !/^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(value.accent)) {
    toastError(isFa() ? 'رنگ باید با فرمت #RRGGBB باشد.' : 'Colour must be in #RRGGBB format.');
    return;
  }
  await withBusy(form.querySelector('button[type=submit]'), async () => {
    try {
      await api.patch(`/api/admin/settings/${section}`, { value });
      await refreshBootstrap({ silent: true });
      applyPrefs();
      toastSuccess(t('adm.sSaved'));
      refresh(true);
    } catch (err) { toastApiError(err); }
  });
});

act('adm-set-reset', () => refresh(true));

act('adm-set-geo', (e, el) => {
  if (!navigator.geolocation) { toastError(t('contact.locationDenied')); return; }
  navigator.geolocation.getCurrentPosition(
    (pos) => {
      const form = el.closest('form');
      const lat = form.querySelector(`[name="${el.dataset.lat}"]`);
      const lng = form.querySelector(`[name="${el.dataset.lng}"]`);
      if (lat) lat.value = pos.coords.latitude.toFixed(5);
      if (lng) lng.value = pos.coords.longitude.toFixed(5);
      toastSuccess(t('contact.locationOn'));
    },
    () => toastError(t('contact.locationDenied')),
    { timeout: 9000 },
  );
});

act('adm-row-add', (e, el) => {
  const key = el.dataset.row;
  const form = el.closest('form');
  const tpl = form.querySelector(`[data-row-tpl="${key}"]`);
  const box = form.querySelector(`[data-rows="${key}"]`);
  if (!tpl || !box) return;
  const wrap = document.createElement('div');
  wrap.innerHTML = tpl.innerHTML.trim();
  const node = wrap.firstElementChild;
  if (node) {
    node.querySelectorAll('input').forEach((i) => { i.value = ''; });
    box.appendChild(node);
  }
});

act('adm-row-del', (e, el) => { el.closest('[data-row]')?.remove(); });

export function mount(root, ctx) {
  applyDyn(root);
  if (ctx?.params?.id === 'backups') loadBackupsPanel(root);
  // همگام‌سازی انتخابگر رنگ با فیلد متنی
  root.querySelectorAll('[data-color-for]').forEach((pick) => {
    const text = root.querySelector(`[name="${pick.dataset.colorFor}"]`);
    pick.addEventListener('input', () => { if (text) text.value = pick.value; });
    text?.addEventListener('input', () => { if (/^#[0-9a-f]{6}$/i.test(text.value)) pick.value = text.value; });
  });
  return null;
}

async function loadBackupsPanel(root) {
  const box = root.querySelector('[data-backups-panel]');
  if (!box) return;
  box.innerHTML = '<div class="sk sk-line w70"></div>';
  try {
    const r = await api.get('/api/admin/backups');
    box.innerHTML = h`
      <div class="card">
        <div class="row row-between row-wrap">
          <strong>${icon('download')} ${t('adm.sBackups')}</strong>
          <div class="row row-wrap">
            <a class="btn btn-ghost btn-sm" href="/api/admin/dump" download>${icon('download')} ${t('adm.dumpFull')}</a>
            <button type="button" class="btn btn-primary btn-sm" data-act="adm-backup-now">${icon('plus')} ${t('adm.backupNow')}</button>
          </div>
        </div>
        <p class="muted small mt-s">${t('adm.backupsHint', { hours: fmtNum(r.everyHours || 12), keep: fmtNum(r.keep || 14) })}</p>
        ${r.items?.length ? h`<div class="table-wrap mt-s"><table class="table">
          <thead><tr><th>${t('common.date')}</th><th>${t('adm.backupSize')}</th><th></th></tr></thead>
          <tbody>${r.items.map((b) => h`<tr>
            <td class="tiny">${fmtDate(b.at)}</td>
            <td class="tiny muted">${fmtNum(Math.round(b.bytes / 1024))} KB</td>
            <td><div class="row row-end">
              <a class="btn btn-ghost btn-sm" href="/api/admin/backups/${b.id}/download" download>${icon('download')} ${t('common.download')}</a>
              <button type="button" class="btn btn-danger btn-sm" data-act="adm-backup-restore" data-id="${b.id}">${icon('refresh')} ${t('adm.backupRestore')}</button>
            </div></td>
          </tr>`)}</tbody></table></div>` : h`<p class="muted small mt-s">${t('adm.backupsEmpty')}</p>`}
      </div>`;
  } catch (err) { box.innerHTML = h`<div class="notice notice-error">${icon('alert')} ${err?.message || t('err.generic')}</div>`; }
}

act('adm-backup-now', async (e, el) => {
  await withBusy(el, async () => {
    try {
      await api.post('/api/admin/backups', {});
      toastSuccess(t('adm.backupDone'));
      await loadBackupsPanel(document.querySelector('#view') || el.closest('#view')?.parentNode || document);
    } catch (err) { toastApiError(err); }
  });
});

act('adm-backup-restore', async (e, el) => {
  const ok = await confirmDialog({ text: t('adm.backupRestoreWarn'), danger: true });
  if (!ok) return;
  await withBusy(el, async () => {
    try { await api.post('/api/admin/backups/restore', { id: el.dataset.id }); toastSuccess(t('adm.backupRestored')); setTimeout(() => location.reload(), 900); }
    catch (err) { toastApiError(err); }
  });
});
