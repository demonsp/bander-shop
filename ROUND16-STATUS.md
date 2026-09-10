# Round 16 — delivered & live (commit 7913b81, sw bm-v25)

LIVE: https://bander-mobile.onrender.com — all sweeps green local + live (api 185/0, endpoints 91/0, http-smoke 217/0, interaction-sweep, bug-sweep, offline).

## What shipped
1. Topbar: always visible; admin tickerItems or 4 fallback items; `.topbar.no-ticker` hides only ticker row (showTicker toggle).
2. Rebrand: گرین اپل / Green Apple everywhere (defaults, db, i18n, manifest, offline, wake page, otpauth issuer); new apple logo: inline header SVG + assets/img/favicon.svg + icon-192/512/180/maskable PNGs (ImageMagick needs SOLID fill — gradient renders black).
3. PDP: lightbox zoom (wheel/dblclick/pinch/buttons/keys +,-,0), video support (product.videos; admin textarea field; gallery thumbs with play badge; lightbox <video>).
4. Audit: catch-all `api.<method>` log for every non-GET /api call; search + product.view logs; audit cap 4000→12000? (cap still 4000 in db.mjs — raised? NO: left 4000; catch-all adds volume) — check db.mjs line ~165 if broader retention needed.
5. Backups: server/lib/backup.mjs — gzip snapshot every 12h (startBackupScheduler in main.mjs boot), keep 14, in data/backups/; admin routes GET/POST /api/admin/backups, POST .../restore, GET .../:id/download, GET /api/admin/dump (perm settings.edit); UI tab: admin → features → backups.
6. Marquee: rAF driver + pointer drag (window-level move/up listeners; dragstart prevented; click suppressed after >8px move). Verified -140px exact.
7. Voice search: getUserMedia preflight + per-error Persian messages (micDenied/voiceNetwork/noSpeech/noMic).
8. Click sound: WebAudio blip; user-menu toggle (data-act=sound-toggle); pref uiSound synced to me.prefs; LS key bm_prefs_v1.
9. Badges: server computeBadges() in api-auth (10 badges) → me.badges; account card "افتخارات من"; i18n badge.* fa/en; sprite i-award.
10. Captcha: operator unrotated/34px/accent #31afd4, noise only top/bottom edges; auth mount prefetches challenge; login captcha now visible from start (was hidden:true).
11. 2FA fix: GET /api/me/2fa persists TOTP secret (was generating throwaway secret per call → codes never matched).
12. Password eye: global enhancer in ui.mjs (MutationObserver) + .pwd-wrap CSS; i18n pwd.show/hide.
13. Phone formatting: fmtTel() (no thousands grouping, keeps leading 0) in dom.mjs; used in topbar/footer/home/order-detail/page.
14. Sprites added: i-play, i-video, i-volume, i-volume-off, i-award.

## Gotchas for next round
- deploy-repo: re-add git identity + origin (x-access-token PAT) every session; fetch+reset --hard origin/main before syncing.
- Render GET /v1/deploys/{id} returned 404 for dep-dagsrhmk… — verify live via curl sw.js instead.
- Sweeps take BASE as argv[1], not env.
- Playwright: reinstall each sandbox resume (pip install playwright && playwright install chromium && install-deps).
- Consent modal blocks clicks in tests: click [data-consent-go] first.
- Custom checkboxes: click `label.check .box`, scope with [data-captcha] to avoid remember-me.
- i18n: never insert EN keys with naive replace of first anchor (FA anchor matches first) — caused dup keys once.

## Owed answers (delivered in chat round 16)
- VPN/Iran: custom domain + Cloudflare proxy or Iranian host; *.onrender.com filtered.
- Instagram auto-post: needs Meta developer app + FB Page + IG Business account + token; interim manual/post-pack.

## STANDING RULE (round 16b, user request)
Every future update MUST end with a fresh full-site zip delivered to the user.
Recipe: python zipfile over server/, public/, tools/ (skip cloudflared binary, standalone/, backups/, .git), tests/, bander-*.html, README-RUN.md, ROUND16-STATUS.md, data/db.json, package.json+render.yaml (from deploy-repo, arc at root). Name: greenapple-site-<sw-version>.zip at workspace root. Current: greenapple-site-bm-v25.zip (2.3 MB, 245 entries).

## Round 17 — live @ d3f2aff, sw bm-v26
Added: admin console (restart via process.exit→Render respawn; resets audit/carts/visitors), bans (ip/phone/email/username; IP enforced pre-route in main.mjs; auth flows check), visitors registry (POST /api/track once per session via api client w/ CSRF; parseAgent os/device/browser; admin tab visitors), telegram bot (lib/telegram.mjs long-poll; /start /help /status /products /contact; inbox+reply+test in admin; broadcast channel), broadcast channels in notif composer (site/telegram/email via lib/mail.mjs minimal SMTP/sms via lib/sms.mjs Kavenegar; settings tab mailsms w/ group fields), lottery (state.lotteries; admin create/run/close; public /lottery page + nav item; manual join + auto entries from orders), cursor halo (#cursorHalo, pointer:fine only, halo-hot on interactives), eco idle mode (4min idle → html.eco pauses polls/marquee/halo; activity resumes + silent refresh; route/scroll preserved), marquee seamless loop (gap-aware half, base×mult copies exactly 2 copies, resize re-measure), contact phone3 + socials shown, build tag BUILD in util + status + dashboard chip.
Gotchas: deploy-repo snapshot may lag (was b31dcf3) → always fetch+reset --hard origin/main before sync+commit. /api/track needs CSRF (use api client, not raw fetch). main.mjs needed V import for track.

## Round-18 (2026-09-10) — marquee RTL root fix + polish — LIVE @ commit 97183c0 (sw bm-v27)
- ROOT FIX: marquee driver was LTR-only (negative translateX); in RTL track walked left leaving growing blank on right ("nappears until refresh"). Now sign() follows track direction (fa→+1, en→-1), pos wraps bidirectionally at half. Verified 35s sampling local+live: full coverage always (rightGap<0), wrap seamless.
- fabTop button was wired but never un-hidden → scroll listener in main.mjs toggles hidden (visible >600px scroll).
- PDP gallery: touch-swipe next/prev (pointer events, 48px threshold, touch only) + click guard suppresses accidental lightbox open after swipe.
- BUILD tag → bm-v27; api 185/0, endpoints 96/0, http-smoke 221/0, sweeps clean, EN/light verified.

## Round-19 (2026-09-10) — پدافند/صف ورود + لینک جدید — LIVE @ commit 95c1338 (sw bm-v28)
- لینک جدید سایت: https://greenapple-shop.onrender.com (سرویس srv-dah53bqjnfac738baj60، region frankfurt، پلن free)
- لینک قدیمی bander-mobile.onrender.com با 301 دائمی به لینک جدید هدایت می‌شود (مسیر حفظ می‌شود).
- اتاق انتظار ضد-DDoS: سقف همزمان + آستانه rps (فقط درخواست سنگین)، پذیرش دانه‌دانه با کوکی HMAC (bm_pass)، صفحه صف دوزبانه fa/en، کلاینت SPA با روکش صف و تلاش خودکار.
- مسدودسازی خودکار سیلاب (flood auto-ban) با انقضا؛ BAN های زمانی در همه gate ها رعایت می‌شوند؛ فیلد «مدت» در پنل بن‌ها.
- پنل زنده «پدافند و صف ورود» در داشبورد مدیر (inflight/rps/queued/auto-bans/top IPs + فرم تنظیمات security).
- باگ‌های یافت‌شده در ممیزی ۰→۱۰۰ و رفع‌شده: (۱) مسیرهای restart/reset داخل هندلر wake ثبت می‌شدند (فقط پس از wake فعال بودند)؛ (۲) کارت کنسول سامانه در داشبورد هرگز رندر نمی‌شد.
- env تست: BM_QUEUE=off برای سوئیت‌ها؛ صف در تولید روشن است.
- تست‌ها: api 185/0، endpoints 96/0، http-smoke 223/0، queue-test 11/11، flood-test PASS، sweep ها تمیز، offline ok.

## Round-20 (2026-09-10) — تحویل نهایی — LIVE @ commit ad74a96 (sw bm-v29)
- ولکام‌اسکرین برندینگ‌شده (لوگو+نام+اسپینر، محو نرم، حداقل ۷۰ms، reduced-motion安全).
- دکمهٔ رفرش در هدر + تولتیپ سراسری (کپی aria-label→title با MutationObserver).
- پوستهٔ ظاهری fresh/classic با کلید برگشت در پنل (settings.theme.variant؛ CSS فقط زیر html[data-variant]).
- تله‌متری خطای کلاینت: POST /api/client-error (معاف CSRF، rate-limited) + فهرست زنده در کارت پدافند داشبورد.
- خودترمیمی: db از backups/ هم برمی‌گردد؛ repairState در بوت + واچ‌داگ ۶۰ ثانیه؛ log ممیزی system.selfheal.
- بازسازی نسخهٔ تک‌فایلی آفلاین: greenapple-offline.html (جای bander-mobile-offline.html قدیمی).
- اسناد: RAHNAMA-KAMEL.md (راهنمای کامل فارسی) و PROMPT-SAKHT-SITE.md (پرامپت ساخت سایت برای هر AI).
- تست‌ها: api 185/0، endpoints 96/0، http-smoke 225/0، sweep‌ها تمیز، offline ok، queue 11/11 (راند قبل).

## Round-21 FINAL (2026-09-10) — نسخهٔ پایانی bm-v30 — LIVE @ commit 49ab545
- باگ‌های این راند: (۱) ولکام‌اسکرین روی خطای بوت می‌ماند و پیام خطا را می‌پوشاند → حالا در boot-failed/catch حذف می‌شود + noscript آن را مخفی می‌کند؛ (۲) SPA fallback هر بار فایل را از دیسک می‌خواند → کش mtime + gzip.
- شکار عمیق v30 (۷ پروب): استرس ۲۵۰ همزمان بدون 5xx، SSE سالم، gzip ناوبری، فاز ورودی‌ها و مسیرها بدون 5xx/نشت، چرخهٔ پشتیبان سالم — همه PASS.
- کنسول EN+Light: صفر خطا. سوئیت‌ها: api 185/0 · endpoints 96/0 · http 226/0 · sweep‌ها تمیز · offline ok.
- راهنمای بات تلگرام در گزارش نهایی و RAHNAMA-KAMEL.md بخش ۵ آمده است.
