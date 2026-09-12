var hc=Object.defineProperty;var O=(e,a,s)=>()=>{if(s)throw s[0];try{return e&&(a=e(e=0)),a}catch(n){throw s=[n],n}};var G=(e,a)=>{for(var s in a)hc(e,s,{get:a[s],enumerable:!0})};var oo={};G(oo,{ApiError:()=>Je,api:()=>h,errorEn:()=>vc,errorMessage:()=>Ds,getCookie:()=>so,onLoading:()=>fc,withQuery:()=>no});function so(e){let a=document.cookie.match(new RegExp("(?:^|; )"+e.replace(/[.$?*|{}()[\]\\/+^]/g,"\\$&")+"=([^;]*)"));return a?decodeURIComponent(a[1]):""}function eo(e){Ue||(Ue=document.createElement("div"),Ue.className="bm-queue-overlay",Ue.setAttribute("role","status"),Ue.innerHTML='<div class="bm-q-card"><div class="bm-q-logo">\u{1F34F}</div><b class="bm-q-title"></b><p class="bm-q-pos"></p><div class="bm-q-bar"><i></i></div><span class="bm-q-note"></span></div>',document.documentElement.appendChild(Ue));let a=document.documentElement.lang==="en";Ue.querySelector(".bm-q-title").textContent=a?"Site is busy \u2014 you are in the queue":"\u0633\u0627\u06CC\u062A \u0634\u0644\u0648\u063A \u0627\u0633\u062A \u2014 \u062F\u0631 \u0635\u0641 \u0648\u0631\u0648\u062F \u0647\u0633\u062A\u06CC",Ue.querySelector(".bm-q-pos").textContent=a?`Your turn: ${e>0?e:"\u2026"}`:`\u0646\u0648\u0628\u062A \u0634\u0645\u0627: ${e>0?e:"\u2026"}`,Ue.querySelector(".bm-q-note").textContent=a?"Continues automatically when it is your turn\u2026":"\u0628\u0647\u200C\u0645\u062D\u0636 \u0631\u0633\u06CC\u062F\u0646 \u0646\u0648\u0628\u062A\u060C \u062E\u0648\u062F\u06A9\u0627\u0631 \u0627\u062F\u0627\u0645\u0647 \u067E\u06CC\u062F\u0627 \u0645\u06CC\u200C\u06A9\u0646\u062F\u2026"}function to(){Ue&&(Ue.remove(),Ue=null)}async function gc(e={}){return Na||(Na=(async()=>{eo(Number(e.pos)||0);let a=Math.max(2,Math.min(20,Number(e.pollSec)||4))*1e3;for(let s=0;s<60;s++){await new Promise(n=>setTimeout(n,a));try{let o=await(await fetch("/api/queue/status",{credentials:"same-origin",headers:{Accept:"application/json"}})).json();if(o?.state==="pass")return to(),!0;o?.state==="queued"&&eo(Number(o.pos)||0)}catch{}}return to(),!1})().finally(()=>{Na=null})),Na}function fc(e){return As.add(e),()=>As.delete(e)}function ao(e){Ts=Math.max(0,Ts+(e?1:-1));for(let a of As)try{a(Ts>0)}catch{}}async function ft(e,a,s,n={}){if(typeof navigator<"u"&&!navigator.onLine&&e!=="GET")throw new Je(0,"offline","\u0627\u062A\u0635\u0627\u0644 \u0627\u06CC\u0646\u062A\u0631\u0646\u062A \u0628\u0631\u0642\u0631\u0627\u0631 \u0646\u06CC\u0633\u062A. \u0644\u0637\u0641\u0627\u064B \u0634\u0628\u06A9\u0647 \u0631\u0627 \u0628\u0631\u0631\u0633\u06CC \u06A9\u0646.","You are offline.");ao(!0);let o={...n.headers||{}};if(s!=null&&(o["Content-Type"]="application/json"),e!=="GET"){let m=so("bm_csrf");m&&(o["X-CSRF-Token"]=m)}let i=new AbortController,l=setTimeout(()=>i.abort(),n.timeout||25e3);try{let m=await fetch(a,{method:e,headers:o,signal:i.signal,credentials:"same-origin",body:s==null?void 0:JSON.stringify(s)}),u=null,f=await m.text();if(f)try{u=JSON.parse(f)}catch{u={raw:f.slice(0,300)}}if(m.status===403&&u?.code==="csrf_failed"&&!n._retried)return await fetch("/api/bootstrap",{credentials:"same-origin"}).catch(()=>{}),ft(e,a,s,{...n,_retried:!0});if(m.status===503&&u?.code==="queued"&&!n._queueRetried&&await gc(u?.details||{}))return ft(e,a,s,{...n,_queueRetried:!0});if(!m.ok||u?.ok===!1){let v=u?.code||"error";throw new Je(m.status||500,v,u?.message||Cs[v]||"\u062E\u0637\u0627",Cs[v])}return u}catch(m){throw m instanceof Je?m:m?.name==="AbortError"?new Je(408,"timeout","\u0632\u0645\u0627\u0646 \u062F\u0631\u062E\u0648\u0627\u0633\u062A \u0628\u0647 \u067E\u0627\u06CC\u0627\u0646 \u0631\u0633\u06CC\u062F. \u062F\u0648\u0628\u0627\u0631\u0647 \u062A\u0644\u0627\u0634 \u06A9\u0646.","Request timed out."):new Je(0,"network","\u0627\u0631\u062A\u0628\u0627\u0637 \u0628\u0627 \u0633\u0631\u0648\u0631 \u0628\u0631\u0642\u0631\u0627\u0631 \u0646\u0634\u062F. \u0627\u062A\u0635\u0627\u0644 \u0627\u06CC\u0646\u062A\u0631\u0646\u062A \u0631\u0627 \u0628\u0631\u0631\u0633\u06CC \u06A9\u0646.","Network error.")}finally{clearTimeout(l),ao(!1)}}function Ds(e){return e instanceof Je?e.message:String(e?.message||e||"\u062E\u0637\u0627")}function vc(e){return e?.details||Cs[e?.code]||e?.message||"Error"}var Je,Cs,Ue,Na,Ts,As,no,h,Q=O(()=>{Je=class extends Error{constructor(a,s,n,o){super(n||s||"error"),this.status=a,this.code=s,this.details=o}};Cs={login_required:"Please sign in to continue.",store_asleep:"The store is temporarily turned off.",unauthorized:"Authentication failed.",forbidden:"You do not have access to this section.",csrf_failed:"Security token expired. Please refresh the page.",too_many_requests:"Too many requests. Please wait a moment.",not_found:"Not found.",product_not_found:"Product not found.",order_not_found:"Order not found.",invalid_credentials:"Incorrect username or password.",invalid_code:"The verification code is not valid.",invalid_phone:"Invalid mobile number.",invalid_email:"Invalid email address.",weak_password:"Password is too weak. Use upper/lower case letters, digits and symbols.",stock_limit:"Not enough stock for this quantity.",empty_cart:"Your cart is empty.",insufficient_balance:"Wallet balance is not enough.",account_exists:"This account already exists.",username_taken:"This username is taken.",phone_taken:"This phone number is already registered.",email_taken:"This email is already registered.",terms_required:"You must accept the terms and conditions.",rules_required:"You must accept the ticket rules.",address_required:"Please add a shipping address first.",already_submitted:"You have already submitted this.",payload_too_large:"The uploaded data is too large.",invalid_type:"Only image files are allowed.",server_error:"Internal server error. Please try again.",product_unavailable:"One of the items in your cart is no longer available.",cannot_cancel:"This order cannot be cancelled in its current state.",account_blocked:"This account is blocked. Please contact support.",disabled:"This feature is currently disabled.",queued:"The site is busy. You are in the entry queue\u2026",banned:"Access is blocked. Please contact support."},Ue=null,Na=null;Ts=0,As=new Set;no=(e,a)=>{let s=new URLSearchParams;for(let[o,i]of Object.entries(a||{}))i==null||i===""||s.set(o,String(i));let n=s.toString();return n?`${e}${e.includes("?")?"&":"?"}${n}`:e},h={url:no,get:(e,a)=>ft("GET",e,void 0,a),post:(e,a,s)=>ft("POST",e,a??{},s),patch:(e,a,s)=>ft("PATCH",e,a??{},s),del:(e,a,s)=>ft("DELETE",e,a,s),put:(e,a,s)=>ft("PUT",e,a??{},s),upload:e=>ft("POST","/api/upload",{data:e},{timeout:6e4})}});var co={};G(co,{applyI18n:()=>Vt,dictSize:()=>wc,isFa:()=>w,lang:()=>ve,missingKeys:()=>$c,setLang:()=>Ms,t:()=>t});function Ms(e){_t=e==="en"?"en":"fa",document.documentElement.lang=_t,document.documentElement.dir=_t==="fa"?"rtl":"ltr"}function t(e,a){let n=(yc[_t]||Ia)[e];if(n===void 0&&(n=Ia[e],n===void 0&&(Ps.has(e)||(Ps.add(e),(location.hostname==="localhost"||location.hostname==="127.0.0.1")&&console.warn("[i18n] missing key:",e)),n=e)),a)for(let[o,i]of Object.entries(a))n=n.replace(new RegExp(`\\{${o}\\}`,"g"),String(i));return n}function Vt(e=document){e.querySelectorAll("[data-i18n]").forEach(a=>{a.textContent=t(a.dataset.i18n)}),e.querySelectorAll("[data-i18n-placeholder]").forEach(a=>{a.setAttribute("placeholder",t(a.dataset.i18nPlaceholder))}),e.querySelectorAll("[data-i18n-title]").forEach(a=>{a.setAttribute("title",t(a.dataset.i18nTitle)),a.setAttribute("aria-label",t(a.dataset.i18nTitle))}),e.querySelectorAll("[data-i18n-html]").forEach(a=>{a.innerHTML=t(a.dataset.i18nHtml)})}var Ia,ro,yc,_t,Ps,ve,w,$c,wc,W=O(()=>{Ia={"app.name":"\u06CC\u0627\u0633\u0627\u06CC\u06CC","app.tagline":"\u0644\u0648\u0627\u0632\u0645 \u0627\u0644\u06A9\u062A\u0631\u0648\u0646\u06CC\u06A9 \u0648 \u0627\u0644\u06A9\u062A\u0631\u06CC\u06A9\u06CC","common.loading":"\u062F\u0631 \u062D\u0627\u0644 \u0628\u0627\u0631\u06AF\u0630\u0627\u0631\u06CC\u2026","common.save":"\u0630\u062E\u06CC\u0631\u0647","common.saving":"\u062F\u0631 \u062D\u0627\u0644 \u0630\u062E\u06CC\u0631\u0647\u2026","common.cancel":"\u0627\u0646\u0635\u0631\u0627\u0641","common.close":"\u0628\u0633\u062A\u0646","common.confirm":"\u062A\u0623\u06CC\u06CC\u062F","common.delete":"\u062D\u0630\u0641","common.edit":"\u0648\u06CC\u0631\u0627\u06CC\u0634","common.add":"\u0627\u0641\u0632\u0648\u062F\u0646","common.create":"\u0627\u06CC\u062C\u0627\u062F","common.update":"\u0628\u0647\u200C\u0631\u0648\u0632\u0631\u0633\u0627\u0646\u06CC","common.search":"\u062C\u0633\u062A\u200C\u0648\u062C\u0648","common.filter":"\u0641\u06CC\u0644\u062A\u0631","common.filters":"\u0641\u06CC\u0644\u062A\u0631\u0647\u0627","common.sort":"\u0645\u0631\u062A\u0628\u200C\u0633\u0627\u0632\u06CC","common.all":"\u0647\u0645\u0647","common.none":"\u0647\u06CC\u0686","common.more":"\u0628\u06CC\u0634\u062A\u0631","common.less":"\u06A9\u0645\u062A\u0631","common.showAll":"\u0645\u0634\u0627\u0647\u062F\u0647\u200C\u06CC \u0647\u0645\u0647","common.back":"\u0628\u0627\u0632\u06AF\u0634\u062A","common.next":"\u0627\u062F\u0627\u0645\u0647","common.prev":"\u0642\u0628\u0644\u06CC","common.yes":"\u0628\u0644\u0647","common.no":"\u062E\u06CC\u0631","common.optional":"\u0627\u062E\u062A\u06CC\u0627\u0631\u06CC","common.required":"\u0627\u0644\u0632\u0627\u0645\u06CC","common.copy":"\u06A9\u067E\u06CC","common.copied":"\u06A9\u067E\u06CC \u0634\u062F","common.share":"\u0627\u0634\u062A\u0631\u0627\u06A9\u200C\u06AF\u0630\u0627\u0631\u06CC","common.download":"\u062F\u0627\u0646\u0644\u0648\u062F","common.upload":"\u0628\u0627\u0631\u06AF\u0630\u0627\u0631\u06CC","common.print":"\u0686\u0627\u067E","common.refresh":"\u062A\u0627\u0632\u0647\u200C\u0633\u0627\u0632\u06CC","common.retry":"\u062A\u0644\u0627\u0634 \u062F\u0648\u0628\u0627\u0631\u0647","common.send":"\u0627\u0631\u0633\u0627\u0644","common.sent":"\u0627\u0631\u0633\u0627\u0644 \u0634\u062F","common.submit":"\u062B\u0628\u062A","common.reply":"\u067E\u0627\u0633\u062E","common.view":"\u0645\u0634\u0627\u0647\u062F\u0647","common.details":"\u062C\u0632\u0626\u06CC\u0627\u062A","common.status":"\u0648\u0636\u0639\u06CC\u062A","common.date":"\u062A\u0627\u0631\u06CC\u062E","common.time":"\u0633\u0627\u0639\u062A","common.amount":"\u0645\u0628\u0644\u063A","common.count":"\u062A\u0639\u062F\u0627\u062F","common.total":"\u0645\u062C\u0645\u0648\u0639","common.price":"\u0642\u06CC\u0645\u062A","price.inquire":"\u0627\u0633\u062A\u0639\u0644\u0627\u0645 \u0642\u06CC\u0645\u062A \u2014 \u062A\u0645\u0627\u0633 \u0628\u0627 \u0645\u063A\u0627\u0632\u0647","price.inquireShort":"\u0627\u0633\u062A\u0639\u0644\u0627\u0645 \u0642\u06CC\u0645\u062A","pdp.callStore":"\u0632\u0646\u06AF \u0628\u0632\u0646 \u0628\u0647 \u0645\u063A\u0627\u0632\u0647","pdp.visitStore":"\u062D\u0636\u0648\u0631\u06CC \u0645\u06CC\u200C\u0622\u06CC\u0645","pdp.serviceHint":"\u0627\u06CC\u0646 \u0645\u0648\u0631\u062F \u062E\u062F\u0645\u0627\u062A/\u0633\u0641\u0627\u0631\u0634\u06CC \u0627\u0633\u062A\u061B \u0642\u06CC\u0645\u062A \u0646\u0647\u0627\u06CC\u06CC \u067E\u0633 \u0627\u0632 \u0628\u0631\u0631\u0633\u06CC \u062A\u0644\u0641\u0646\u06CC \u0627\u0639\u0644\u0627\u0645 \u0645\u06CC\u200C\u0634\u0648\u062F.","home.partFinder":"\u0642\u0637\u0639\u0647\u200C\u0627\u06CC \u067E\u06CC\u062F\u0627 \u0646\u06A9\u0631\u062F\u06CC\u061F","home.partFinderText":"\u0627\u0633\u0645\u0634 \u0631\u0627 \u062A\u0644\u0641\u0646\u06CC \u0628\u06AF\u0648 \u06CC\u0627 \u062F\u0631 \u067E\u06CC\u0627\u0645 \u0628\u0641\u0631\u0633\u062A\u061B \u0627\u06AF\u0631 \u062F\u0631 \u0642\u0641\u0633\u0647\u200C\u0647\u0627 \u0628\u0627\u0634\u062F\u060C \u0647\u0645\u0627\u0646 \u0631\u0648\u0632 \u0628\u0631\u0627\u06CC\u062A \u06A9\u0646\u0627\u0631 \u0645\u06CC\u200C\u06AF\u0630\u0627\u0631\u06CC\u0645.","home.partFinderCta":"\u062A\u0645\u0627\u0633 \u06CC\u0627 \u067E\u06CC\u0627\u0645","common.stock":"\u0645\u0648\u062C\u0648\u062F\u06CC","common.available":"\u0645\u0648\u062C\u0648\u062F","common.unavailable":"\u0646\u0627\u0645\u0648\u062C\u0648\u062F","common.inStock":"\u0645\u0648\u062C\u0648\u062F \u062F\u0631 \u0627\u0646\u0628\u0627\u0631","common.lowStock":"\u06A9\u0645\u062A\u0631 \u0627\u0632 \u06F3 \u0639\u062F\u062F \u0628\u0627\u0642\u06CC \u0645\u0627\u0646\u062F\u0647","common.notifyMe":"\u0645\u0648\u062C\u0648\u062F \u0634\u062F \u062E\u0628\u0631\u0645 \u06A9\u0646","common.notified":"\u0628\u0647 \u0645\u062D\u0636 \u0645\u0648\u062C\u0648\u062F \u0634\u062F\u0646 \u062E\u0628\u0631\u062A \u0645\u06CC\u200C\u06A9\u0646\u06CC\u0645","common.category":"\u062F\u0633\u062A\u0647\u200C\u0628\u0646\u062F\u06CC","common.brand":"\u0628\u0631\u0646\u062F","common.product":"\u06A9\u0627\u0644\u0627","common.products":"\u0645\u062D\u0635\u0648\u0644\u0627\u062A","common.order":"\u0633\u0641\u0627\u0631\u0634","common.orders":"\u0633\u0641\u0627\u0631\u0634\u200C\u0647\u0627","common.user":"\u06A9\u0627\u0631\u0628\u0631","common.users":"\u06A9\u0627\u0631\u0628\u0631\u0627\u0646","common.result":"\u0646\u062A\u06CC\u062C\u0647","common.results":"\u0646\u062A\u06CC\u062C\u0647","common.noResult":"\u0646\u062A\u06CC\u062C\u0647\u200C\u0627\u06CC \u067E\u06CC\u062F\u0627 \u0646\u0634\u062F","common.error":"\u062E\u0637\u0627","common.success":"\u0627\u0646\u062C\u0627\u0645 \u0634\u062F","common.warning":"\u062A\u0648\u062C\u0647","common.note":"\u06CC\u0627\u062F\u062F\u0627\u0634\u062A","common.notes":"\u062A\u0648\u0636\u06CC\u062D\u0627\u062A","common.description":"\u062A\u0648\u0636\u06CC\u062D\u0627\u062A","common.specs":"\u0645\u0634\u062E\u0635\u0627\u062A \u0641\u0646\u06CC","common.actions":"\u0639\u0645\u0644\u06CC\u0627\u062A","common.active":"\u0641\u0639\u0627\u0644","common.inactive":"\u063A\u06CC\u0631\u0641\u0639\u0627\u0644","common.enabled":"\u0631\u0648\u0634\u0646","common.disabled":"\u062E\u0627\u0645\u0648\u0634","common.on":"\u0631\u0648\u0634\u0646","common.off":"\u062E\u0627\u0645\u0648\u0634","common.from":"\u0627\u0632","common.to":"\u062A\u0627","common.and":"\u0648","common.or":"\u06CC\u0627","common.today":"\u0627\u0645\u0631\u0648\u0632","common.yesterday":"\u062F\u06CC\u0631\u0648\u0632","common.toman":"\u062A\u0648\u0645\u0627\u0646","common.rial":"\u0631\u06CC\u0627\u0644","common.page":"\u0635\u0641\u062D\u0647","common.of":"\u0627\u0632","common.items":"\u0642\u0644\u0645","common.new":"\u062C\u062F\u06CC\u062F","common.old":"\u0642\u062F\u06CC\u0645\u06CC","common.apply":"\u0627\u0639\u0645\u0627\u0644","common.reset":"\u0628\u0627\u0632\u0646\u0634\u0627\u0646\u06CC","common.clear":"\u067E\u0627\u06A9 \u06A9\u0631\u062F\u0646","common.select":"\u0627\u0646\u062A\u062E\u0627\u0628 \u06A9\u0646\u06CC\u062F","common.title":"\u0639\u0646\u0648\u0627\u0646","common.body":"\u0645\u062A\u0646","common.type":"\u0646\u0648\u0639","common.priority":"\u0627\u0648\u0644\u0648\u06CC\u062A","common.answer":"\u067E\u0627\u0633\u062E","common.message":"\u067E\u06CC\u0627\u0645","common.messages":"\u067E\u06CC\u0627\u0645\u200C\u0647\u0627","common.attach":"\u067E\u06CC\u0648\u0633\u062A","common.image":"\u062A\u0635\u0648\u06CC\u0631","common.images":"\u062A\u0635\u0627\u0648\u06CC\u0631","common.phone":"\u0634\u0645\u0627\u0631\u0647 \u0645\u0648\u0628\u0627\u06CC\u0644","common.email":"\u0627\u06CC\u0645\u06CC\u0644","common.address":"\u0622\u062F\u0631\u0633","common.city":"\u0634\u0647\u0631","common.province":"\u0627\u0633\u062A\u0627\u0646","common.postal":"\u06A9\u062F \u067E\u0633\u062A\u06CC","common.name":"\u0646\u0627\u0645","common.fullName":"\u0646\u0627\u0645 \u0648 \u0646\u0627\u0645 \u062E\u0627\u0646\u0648\u0627\u062F\u06AF\u06CC","common.username":"\u0646\u0627\u0645 \u06A9\u0627\u0631\u0628\u0631\u06CC","common.password":"\u0631\u0645\u0632 \u0639\u0628\u0648\u0631","common.passwordConfirm":"\u062A\u06A9\u0631\u0627\u0631 \u0631\u0645\u0632 \u0639\u0628\u0648\u0631","common.login":"\u0648\u0631\u0648\u062F","common.logout":"\u062E\u0631\u0648\u062C","common.register":"\u062B\u0628\u062A\u200C\u0646\u0627\u0645","common.guest":"\u0645\u0647\u0645\u0627\u0646","common.admin":"\u0645\u062F\u06CC\u0631","common.settings":"\u062A\u0646\u0638\u06CC\u0645\u0627\u062A","common.help":"\u0631\u0627\u0647\u0646\u0645\u0627","common.home":"\u062E\u0627\u0646\u0647","common.skip":"\u0631\u062F \u0634\u062F\u0646","common.done":"\u0627\u0646\u062C\u0627\u0645 \u0634\u062F","common.pending":"\u062F\u0631 \u0627\u0646\u062A\u0638\u0627\u0631","common.approved":"\u062A\u0623\u06CC\u06CC\u062F \u0634\u062F\u0647","common.rejected":"\u0631\u062F \u0634\u062F\u0647","common.open":"\u0628\u0627\u0632","common.closed":"\u0628\u0633\u062A\u0647","common.all2":"\u0647\u0645\u0647\u200C\u06CC \u0645\u0648\u0627\u0631\u062F","common.never":"\u0647\u0631\u06AF\u0632","common.empty":"\u062E\u0627\u0644\u06CC","common.secure":"\u0627\u0645\u0646","common.free":"\u0631\u0627\u06CC\u06AF\u0627\u0646","common.unit":"\u0639\u062F\u062F","common.day":"\u0631\u0648\u0632","common.hour":"\u0633\u0627\u0639\u062A","common.minute":"\u062F\u0642\u06CC\u0642\u0647","common.second":"\u062B\u0627\u0646\u06CC\u0647","common.percent":"\u062F\u0631\u0635\u062F","common.discount":"\u062A\u062E\u0641\u06CC\u0641","common.discountCode":"\u06A9\u062F \u062A\u062E\u0641\u06CC\u0641","common.shipping":"\u0647\u0632\u06CC\u0646\u0647\u200C\u06CC \u0627\u0631\u0633\u0627\u0644","common.insurance":"\u0628\u06CC\u0645\u0647\u200C\u06CC \u0645\u0631\u0633\u0648\u0644\u0647","common.subtotal":"\u062C\u0645\u0639 \u06A9\u0627\u0644\u0627\u0647\u0627","common.payable":"\u0645\u0628\u0644\u063A \u0642\u0627\u0628\u0644 \u067E\u0631\u062F\u0627\u062E\u062A","common.payment":"\u067E\u0631\u062F\u0627\u062E\u062A","common.cart":"\u0633\u0628\u062F \u062E\u0631\u06CC\u062F","common.wishlist":"\u0644\u06CC\u0633\u062A \u0645\u0646","common.compare":"\u0645\u0642\u0627\u06CC\u0633\u0647","common.profile":"\u067E\u0631\u0648\u0641\u0627\u06CC\u0644","common.wallet":"\u06A9\u06CC\u0641 \u067E\u0648\u0644","common.balance":"\u0645\u0648\u062C\u0648\u062F\u06CC","common.transactions":"\u062A\u0631\u0627\u06A9\u0646\u0634\u200C\u0647\u0627","common.deposit":"\u0634\u0627\u0631\u0698 \u06A9\u06CC\u0641 \u067E\u0648\u0644","common.points":"\u0627\u0645\u062A\u06CC\u0627\u0632","common.ticket":"\u062A\u06CC\u06A9\u062A","common.tickets":"\u062A\u06CC\u06A9\u062A\u200C\u0647\u0627","common.support":"\u067E\u0634\u062A\u06CC\u0628\u0627\u0646\u06CC","common.review":"\u0646\u0638\u0631","common.reviews":"\u0646\u0638\u0631\u0627\u062A","common.question":"\u0633\u0624\u0627\u0644","common.questions":"\u0633\u0624\u0627\u0644\u0627\u062A \u06A9\u0627\u0631\u0628\u0631\u0627\u0646","common.rating":"\u0627\u0645\u062A\u06CC\u0627\u0632","common.notification":"\u0627\u0639\u0644\u0627\u0646","common.notifications":"\u0627\u0639\u0644\u0627\u0646\u200C\u0647\u0627","common.security":"\u0627\u0645\u0646\u06CC\u062A","common.history":"\u062A\u0627\u0631\u06CC\u062E\u0686\u0647","common.report":"\u06AF\u0632\u0627\u0631\u0634","common.bug":"\u06AF\u0632\u0627\u0631\u0634 \u062E\u0637\u0627","common.suggestion":"\u067E\u06CC\u0634\u0646\u0647\u0627\u062F","common.complaint":"\u0634\u06A9\u0627\u06CC\u062A","common.law":"\u0642\u0648\u0627\u0646\u06CC\u0646 \u0648 \u0645\u0642\u0631\u0631\u0627\u062A","common.privacy":"\u062D\u0631\u06CC\u0645 \u062E\u0635\u0648\u0635\u06CC","common.about":"\u062F\u0631\u0628\u0627\u0631\u0647\u200C\u06CC \u0645\u0627","common.contact":"\u062A\u0645\u0627\u0633 \u0628\u0627 \u0645\u0627","common.faq":"\u0633\u0624\u0627\u0644\u0627\u062A \u0645\u062A\u062F\u0627\u0648\u0644","common.guide":"\u0631\u0627\u0647\u0646\u0645\u0627\u06CC \u062E\u0631\u06CC\u062F","common.services":"\u062E\u062F\u0645\u0627\u062A \u0645\u0634\u062A\u0631\u06CC\u0627\u0646","common.stats":"\u0622\u0645\u0627\u0631 \u0641\u0631\u0648\u0634\u06AF\u0627\u0647","common.searchProducts":"\u062C\u0633\u062A\u200C\u0648\u062C\u0648\u06CC \u06A9\u0627\u0644\u0627\u2026","common.noData":"\u0645\u0648\u0631\u062F\u06CC \u0628\u0631\u0627\u06CC \u0646\u0645\u0627\u06CC\u0634 \u0648\u062C\u0648\u062F \u0646\u062F\u0627\u0631\u062F","common.tryAgain":"\u062F\u0648\u0628\u0627\u0631\u0647 \u062A\u0644\u0627\u0634 \u06A9\u0646","common.showMore":"\u0646\u0645\u0627\u06CC\u0634 \u0628\u06CC\u0634\u062A\u0631","common.perPage":"\u062F\u0631 \u0647\u0631 \u0635\u0641\u062D\u0647",skip:"\u067E\u0631\u0634 \u0628\u0647 \u0645\u062D\u062A\u0648\u0627\u06CC \u0627\u0635\u0644\u06CC","boot.loading":"\u062F\u0631 \u062D\u0627\u0644 \u0628\u0627\u0631\u06AF\u0630\u0627\u0631\u06CC \u06CC\u0627\u0633\u0627\u06CC\u06CC\u2026","boot.waking":"\u0633\u0631\u0648\u0631 \u0627\u0628\u0631\u06CC \u062F\u0631 \u062D\u0627\u0644 \u0628\u06CC\u062F\u0627\u0631\u0634\u062F\u0646 \u0627\u0633\u062A\u061B \u0686\u0646\u062F \u062B\u0627\u0646\u06CC\u0647\u0654 \u062F\u06CC\u06AF\u0631 \u062E\u0648\u062F\u06A9\u0627\u0631 \u062F\u0648\u0628\u0627\u0631\u0647 \u062A\u0644\u0627\u0634 \u0645\u06CC\u200C\u06A9\u0646\u06CC\u0645\u2026","boot.failed":"\u0641\u0631\u0648\u0634\u06AF\u0627\u0647 \u062F\u0631 \u062F\u0633\u062A\u0631\u0633 \u0646\u06CC\u0633\u062A\u061B \u0633\u0631\u0648\u0631 \u0627\u0628\u0631\u06CC \u062E\u0648\u0627\u0628\u06CC\u062F\u0647 \u06CC\u0627 \u0634\u0628\u06A9\u0647 \u0642\u0637\u0639 \u0627\u0633\u062A.","update.available":"\u0646\u0633\u062E\u0647\u0654 \u062C\u062F\u06CC\u062F \u0633\u0627\u06CC\u062A \u0622\u0645\u0627\u062F\u0647 \u0627\u0633\u062A\u061B \u0628\u0631\u0627\u06CC \u062F\u06CC\u062F\u0646 \u062A\u063A\u06CC\u06CC\u0631\u0627\u062A \u062F\u06A9\u0645\u0647 \u0631\u0627 \u0628\u0632\u0646.","update.reload":"\u062A\u0627\u0632\u0647\u200C\u0633\u0627\u0632\u06CC \u0635\u0641\u062D\u0647","boot.failedHint":"\u062F\u06A9\u0645\u0647\u0654 \xAB\u062A\u0644\u0627\u0634 \u062F\u0648\u0628\u0627\u0631\u0647\xBB \u0631\u0627 \u0628\u0632\u0646\u061B \u0627\u06AF\u0631 \u0628\u0627\u0632 \u0647\u0645 \u0646\u06CC\u0627\u0645\u062F\u060C \u0641\u0627\u06CC\u0644 \xAB\u0628\u06CC\u062F\u0627\u0631\u0633\u0627\u0632\xBB \u0631\u0627 \u0627\u0632 \u06AF\u0648\u0634\u06CC/\u06A9\u0627\u0645\u067E\u06CC\u0648\u062A\u0631\u062A \u0628\u0627\u0632 \u06A9\u0646 \u062A\u0627 \u0633\u0631\u0648\u0631 \u0631\u0627 \u0628\u06CC\u062F\u0627\u0631 \u06A9\u0646\u062F.","topbar.fastSend":"\u0627\u0631\u0633\u0627\u0644 \u0627\u0632 \u062A\u0647\u0631\u0627\u0646 \u0628\u0647 \u0633\u0631\u0627\u0633\u0631 \u0627\u06CC\u0631\u0627\u0646","nav.home":"\u062E\u0627\u0646\u0647","nav.products":"\u0647\u0645\u0647\u200C\u06CC \u0645\u062D\u0635\u0648\u0644\u0627\u062A","nav.deals":"\u062A\u062E\u0641\u06CC\u0641\u200C\u0647\u0627","nav.new":"\u062C\u062F\u06CC\u062F\u062A\u0631\u06CC\u0646\u200C\u0647\u0627","nav.stats":"\u0622\u0645\u0627\u0631 \u0632\u0646\u062F\u0647","nav.about":"\u062F\u0631\u0628\u0627\u0631\u0647\u200C\u06CC \u0645\u0627","nav.contact":"\u062A\u0645\u0627\u0633 \u0628\u0627 \u0645\u0627","nav.login":"\u0648\u0631\u0648\u062F","nav.register":"\u062B\u0628\u062A\u200C\u0646\u0627\u0645","nav.cart":"\u0633\u0628\u062F \u062E\u0631\u06CC\u062F","nav.wishlist":"\u0644\u06CC\u0633\u062A \u0645\u0646","nav.notifications":"\u0627\u0639\u0644\u0627\u0646\u200C\u0647\u0627","nav.menu":"\u0645\u0646\u0648","nav.account":"\u062D\u0633\u0627\u0628 \u06A9\u0627\u0631\u0628\u0631\u06CC","nav.admin":"\u067E\u0646\u0644 \u0645\u062F\u06CC\u0631\u06CC\u062A","nav.allCategories":"\u0647\u0645\u0647\u200C\u06CC \u062F\u0633\u062A\u0647\u200C\u0647\u0627","theme.toggle":"\u062A\u063A\u06CC\u06CC\u0631 \u067E\u0648\u0633\u062A\u0647 (\u0631\u0648\u0634\u0646/\u062A\u0627\u0631\u06CC\u06A9)","theme.dark":"\u062D\u0627\u0644\u062A \u062A\u0627\u0631\u06CC\u06A9","theme.light":"\u062D\u0627\u0644\u062A \u0631\u0648\u0634\u0646","theme.auto":"\u0647\u0645\u0627\u0647\u0646\u06AF \u0628\u0627 \u0633\u06CC\u0633\u062A\u0645","search.placeholder":"\u062C\u0633\u062A\u200C\u0648\u062C\u0648\u06CC \u06A9\u0627\u0644\u0627\u060C \u0628\u0631\u0646\u062F \u06CC\u0627 \u062F\u0633\u062A\u0647\u2026","search.go":"\u062C\u0633\u062A\u200C\u0648\u062C\u0648","search.voice":"\u062C\u0633\u062A\u200C\u0648\u062C\u0648\u06CC \u0635\u0648\u062A\u06CC","search.byImage":"\u062C\u0633\u062A\u200C\u0648\u062C\u0648 \u0628\u0627 \u0639\u06A9\u0633","search.listening":"\u062F\u0631 \u062D\u0627\u0644 \u06AF\u0648\u0634 \u062F\u0627\u062F\u0646\u2026 \u062D\u0631\u0641 \u0628\u0632\u0646","search.noVoice":"\u0645\u0631\u0648\u0631\u06AF\u0631 \u0634\u0645\u0627 \u0627\u0632 \u062C\u0633\u062A\u200C\u0648\u062C\u0648\u06CC \u0635\u0648\u062A\u06CC \u067E\u0634\u062A\u06CC\u0628\u0627\u0646\u06CC \u0646\u0645\u06CC\u200C\u06A9\u0646\u062F.","search.micDenied":"\u062F\u0633\u062A\u0631\u0633\u06CC \u0645\u06CC\u06A9\u0631\u0648\u0641\u0646 \u0628\u0633\u062A\u0647 \u0627\u0633\u062A. \u0627\u0632 \u062A\u0646\u0638\u06CC\u0645\u0627\u062A \u0645\u0631\u0648\u0631\u06AF\u0631\u060C \u0627\u062C\u0627\u0632\u0647\u0654 \u0645\u06CC\u06A9\u0631\u0648\u0641\u0646 \u0631\u0627 \u0628\u0631\u0627\u06CC \u0633\u0627\u06CC\u062A \u0641\u0639\u0627\u0644 \u06A9\u0646.","search.voiceNetwork":"\u0633\u0631\u0648\u06CC\u0633 \u062A\u0634\u062E\u06CC\u0635 \u06AF\u0641\u062A\u0627\u0631 \u062F\u0631 \u062F\u0633\u062A\u0631\u0633 \u0646\u06CC\u0633\u062A\u061B \u0627\u06CC\u0646\u062A\u0631\u0646\u062A \u06CC\u0627 \u0641\u06CC\u0644\u062A\u0631\u0634\u06A9\u0646 \u0631\u0627 \u0628\u0631\u0631\u0633\u06CC \u06A9\u0646.","search.noSpeech":"\u0686\u06CC\u0632\u06CC \u0646\u0634\u0646\u06CC\u062F\u0645\u061B \u062F\u0648\u0628\u0627\u0631\u0647 \u062A\u0644\u0627\u0634 \u06A9\u0646 \u0648 \u0634\u0645\u0631\u062F\u0647 \u062D\u0631\u0641 \u0628\u0632\u0646.","search.noMic":"\u0645\u06CC\u06A9\u0631\u0648\u0641\u0646\u06CC \u0631\u0648\u06CC \u0627\u06CC\u0646 \u062F\u0633\u062A\u06AF\u0627\u0647 \u067E\u06CC\u062F\u0627 \u0646\u0634\u062F.","pwd.show":"\u0646\u0645\u0627\u06CC\u0634 \u0631\u0645\u0632 \u0639\u0628\u0648\u0631","pwd.hide":"\u067E\u0646\u0647\u0627\u0646 \u06A9\u0631\u062F\u0646 \u0631\u0645\u0632 \u0639\u0628\u0648\u0631","search.suggestions":"\u067E\u06CC\u0634\u0646\u0647\u0627\u062F\u0647\u0627","search.trending":"\u067E\u0631\u062C\u0633\u062A\u200C\u0648\u062C\u0648\u0647\u0627","search.recent":"\u062C\u0633\u062A\u200C\u0648\u062C\u0648\u0647\u0627\u06CC \u0627\u062E\u06CC\u0631 \u0634\u0645\u0627","search.resultsFor":"\u0646\u062A\u0627\u06CC\u062C \u062C\u0633\u062A\u200C\u0648\u062C\u0648 \u0628\u0631\u0627\u06CC","search.inProducts":"\u062F\u0631 \u0645\u062D\u0635\u0648\u0644\u0627\u062A","search.inCategories":"\u062F\u0633\u062A\u0647\u200C\u0647\u0627","search.inBrands":"\u0628\u0631\u0646\u062F\u0647\u0627","search.inPages":"\u0635\u0641\u062D\u0647\u200C\u0647\u0627","search.didYouMean":"\u0645\u0646\u0638\u0648\u0631\u062A \u0627\u06CC\u0646 \u0628\u0648\u062F\u061F","search.noResultTitle":"\u0686\u06CC\u0632\u06CC \u067E\u06CC\u062F\u0627 \u0646\u06A9\u0631\u062F\u06CC\u0645","search.noResultText":"\u0639\u0628\u0627\u0631\u062A \u062F\u06CC\u06AF\u0631\u06CC \u0631\u0627 \u0627\u0645\u062A\u062D\u0627\u0646 \u06A9\u0646 \u06CC\u0627 \u0627\u0632 \u0641\u06CC\u0644\u062A\u0631\u0647\u0627 \u0627\u0633\u062A\u0641\u0627\u062F\u0647 \u06A9\u0646. \u0627\u06AF\u0631 \u06A9\u0627\u0644\u0627\u06CC \u062E\u0627\u0635\u06CC \u0645\u06CC\u200C\u062E\u0648\u0627\u0647\u06CC\u060C \u0628\u0627 \u067E\u0634\u062A\u06CC\u0628\u0627\u0646\u06CC \u0628\u06AF\u0648 \u062A\u0627 \u0628\u0631\u0627\u06CC\u062A \u062A\u0647\u06CC\u0647 \u06A9\u0646\u06CC\u0645.","search.imageTitle":"\u062C\u0633\u062A\u200C\u0648\u062C\u0648 \u0628\u0627 \u0639\u06A9\u0633","search.imageText":"\u0639\u06A9\u0633 \u06A9\u0627\u0644\u0627 \u0631\u0627 \u0628\u0627\u0631\u06AF\u0630\u0627\u0631\u06CC \u06A9\u0646 \u062A\u0627 \u0645\u0634\u0627\u0628\u0647 \u0622\u0646 \u0631\u0627 \u062F\u0631 \u0641\u0631\u0648\u0634\u06AF\u0627\u0647 \u067E\u06CC\u062F\u0627 \u06A9\u0646\u06CC\u0645.","search.imageHint":"\u0641\u0631\u0645\u062A JPG \u06CC\u0627 PNG\u060C \u062D\u062F\u0627\u06A9\u062B\u0631 \u06F4 \u0645\u06AF\u0627\u0628\u0627\u06CC\u062A","search.imageIndexing":"\u062F\u0631 \u062D\u0627\u0644 \u0622\u0645\u0627\u062F\u0647\u200C\u0633\u0627\u0632\u06CC \u0645\u0648\u062A\u0648\u0631 \u062C\u0633\u062A\u200C\u0648\u062C\u0648\u06CC \u062A\u0635\u0648\u06CC\u0631\u06CC\u2026","search.imageNoIndex":"\u062A\u0635\u0627\u0648\u06CC\u0631 \u0645\u062D\u0635\u0648\u0644\u0627\u062A \u0647\u0646\u0648\u0632 \u0627\u06CC\u0646\u062F\u06A9\u0633 \u0646\u0634\u062F\u0647\u200C\u0627\u0646\u062F. \u0645\u062F\u06CC\u0631 \u0633\u0627\u06CC\u062A \u0627\u0632 \u067E\u0646\u0644 \u0645\u062F\u06CC\u0631\u06CC\u062A \u2190 \u062C\u0633\u062A\u200C\u0648\u062C\u0648\u06CC \u062A\u0635\u0648\u06CC\u0631\u06CC \u0645\u06CC\u200C\u062A\u0648\u0627\u0646\u062F \u0627\u06CC\u0646\u062F\u06A9\u0633 \u0631\u0627 \u0628\u0633\u0627\u0632\u062F.","search.imageNoMatch":"\u06A9\u0627\u0644\u0627\u06CC \u0645\u0634\u0627\u0628\u0647\u06CC \u0628\u0627 \u0627\u06CC\u0646 \u0639\u06A9\u0633 \u067E\u06CC\u062F\u0627 \u0646\u0634\u062F. \u0645\u06CC\u200C\u062A\u0648\u0627\u0646\u06CC \u0646\u0627\u0645 \u06A9\u0627\u0644\u0627 \u0631\u0627 \u062C\u0633\u062A\u200C\u0648\u062C\u0648 \u06A9\u0646\u06CC.","search.dropHere":"\u0639\u06A9\u0633 \u0631\u0627 \u0627\u06CC\u0646\u062C\u0627 \u0631\u0647\u0627 \u06A9\u0646","search.pickFile":"\u0627\u0646\u062A\u062E\u0627\u0628 \u0639\u06A9\u0633","search.takePhoto":"\u06AF\u0631\u0641\u062A\u0646 \u0639\u06A9\u0633 \u0628\u0627 \u062F\u0648\u0631\u0628\u06CC\u0646","mnav.home":"\u062E\u0627\u0646\u0647","mnav.products":"\u062F\u0633\u062A\u0647\u200C\u0647\u0627","mnav.search":"\u062C\u0633\u062A\u200C\u0648\u062C\u0648","mnav.cart":"\u0633\u0628\u062F","mnav.me":"\u062D\u0633\u0627\u0628 \u0645\u0646","footer.shopping":"\u062E\u0631\u06CC\u062F","footer.allProducts":"\u0647\u0645\u0647\u200C\u06CC \u0645\u062D\u0635\u0648\u0644\u0627\u062A","footer.deals":"\u062A\u062E\u0641\u06CC\u0641\u200C\u0647\u0627 \u0648 \u067E\u06CC\u0634\u0646\u0647\u0627\u062F\u0647\u0627","footer.inStock":"\u06A9\u0627\u0644\u0627\u0647\u0627\u06CC \u0645\u0648\u062C\u0648\u062F","footer.searchByImage":"\u062C\u0633\u062A\u200C\u0648\u062C\u0648\u06CC \u062A\u0635\u0648\u06CC\u0631\u06CC","footer.myList":"\u0644\u06CC\u0633\u062A \u0645\u0646","footer.stats":"\u0622\u0645\u0627\u0631 \u0641\u0631\u0648\u0634\u06AF\u0627\u0647","footer.services":"\u062E\u062F\u0645\u0627\u062A \u0645\u0634\u062A\u0631\u06CC\u0627\u0646","footer.guide":"\u0631\u0627\u0647\u0646\u0645\u0627\u06CC \u062E\u0631\u06CC\u062F","footer.service":"\u062E\u062F\u0645\u0627\u062A \u0645\u0634\u062A\u0631\u06CC\u0627\u0646","footer.faq":"\u0633\u0624\u0627\u0644\u0627\u062A \u0645\u062A\u062F\u0627\u0648\u0644","footer.insurance":"\u0628\u06CC\u0645\u0647\u200C\u06CC \u0645\u0631\u0633\u0648\u0644\u0647","footer.plus":"\u0627\u0634\u062A\u0631\u0627\u06A9 \u067E\u0644\u0627\u0633","footer.tickets":"\u062A\u06CC\u06A9\u062A \u067E\u0634\u062A\u06CC\u0628\u0627\u0646\u06CC","footer.about":"\u062F\u0631\u0628\u0627\u0631\u0647 \u0648 \u0642\u0648\u0627\u0646\u06CC\u0646","footer.aboutUs":"\u062F\u0631\u0628\u0627\u0631\u0647\u200C\u06CC \u0645\u0627","footer.terms":"\u0642\u0648\u0627\u0646\u06CC\u0646 \u0648 \u0645\u0642\u0631\u0631\u0627\u062A","footer.privacy":"\u062D\u0631\u06CC\u0645 \u062E\u0635\u0648\u0635\u06CC","footer.bug":"\u06AF\u0632\u0627\u0631\u0634 \u062E\u0637\u0627","footer.contact":"\u062A\u0645\u0627\u0633 \u0628\u0627 \u0645\u0627","footer.suggest":"\u067E\u06CC\u0634\u0646\u0647\u0627\u062F\u0647\u0627 \u0648 \u0634\u06A9\u0627\u06CC\u0627\u062A","footer.contactUs":"\u0631\u0627\u0647\u200C\u0647\u0627\u06CC \u0627\u0631\u062A\u0628\u0627\u0637\u06CC","footer.install":"\u0646\u0635\u0628 \u0627\u067E\u0644\u06CC\u06A9\u06CC\u0634\u0646","footer.support":"\u067E\u0634\u062A\u06CC\u0628\u0627\u0646\u06CC \u0622\u0646\u0644\u0627\u06CC\u0646","footer.rights":"\u0647\u0645\u0647\u200C\u06CC \u062D\u0642\u0648\u0642 \u0645\u062D\u0641\u0648\u0638 \u0627\u0633\u062A.","footer.workingHours":"\u0633\u0627\u0639\u062A \u06A9\u0627\u0631\u06CC","home.heroKicker":"\u0628\u0648\u0631\u0633 \u0647\u0641\u062A\u200C\u062D\u0648\u0636\u061B \u0628\u0627 \u0636\u0645\u0627\u0646\u062A \u0627\u0635\u0627\u0644\u062A","home.heroTitle":"\u0627\u0632 \u0645\u0642\u0627\u0648\u0645\u062A \u062A\u0627 \u06A9\u0646\u062A\u0627\u06A9\u062A\u0648\u0631\u061B \u0647\u0645\u0627\u0646 \u0644\u062D\u0638\u0647 \u0627\u0632 \u0642\u0641\u0633\u0647 \u0645\u06CC\u200C\u0622\u06CC\u062F","home.heroText":"\u0645\u0642\u0627\u0648\u0645\u062A \u0648 \u062E\u0627\u0632\u0646 \u0648 \u0622\u06CC\u200C\u0633\u06CC\u060C \u0647\u0648\u06CC\u0647 \u0648 \u0633\u06CC\u0645 \u0642\u0644\u0639\u060C \u06A9\u0627\u0628\u0644 \u0648 \u0633\u06CC\u0645 \u062F\u0631 \u0647\u0645\u0647\u0654 \u0633\u0627\u06CC\u0632\u0647\u0627\u060C \u0631\u06CC\u0633\u0647 \u0648 \u067E\u0631\u0648\u0698\u06A9\u062A\u0648\u0631\u060C \u0645\u0648\u062F\u0645 \u0648 \u0633\u0648\u06CC\u06CC\u0686\u060C \u067E\u0646\u06A9\u0647 \u0648 \u0645\u062D\u0627\u0641\u0638 \u0628\u0631\u0642 \u2014 \u0647\u0631 \u0622\u0646\u0686\u0647 \u0628\u0631\u0627\u06CC \u0628\u0631\u062F\u060C \u062E\u0627\u0646\u0647 \u0648 \u06A9\u0627\u0631\u06AF\u0627\u0647 \u0644\u0627\u0632\u0645 \u062F\u0627\u0631\u06CC\u060C \u06CC\u06A9\u200C\u062C\u0627 \u062F\u0631 \u0646\u0627\u0631\u0645\u06A9.","home.ctaShop":"\u0634\u0631\u0648\u0639 \u062E\u0631\u06CC\u062F","home.ctaDeals":"\u062A\u062E\u0641\u06CC\u0641\u200C\u0647\u0627\u06CC \u0627\u0645\u0631\u0648\u0632","home.point1":"\u0636\u0645\u0627\u0646\u062A \u0627\u0635\u0627\u0644\u062A \u06A9\u0627\u0644\u0627","home.point2":"\u06F7 \u0631\u0648\u0632 \u0645\u0647\u0644\u062A \u0627\u0646\u0635\u0631\u0627\u0641","home.point3":"\u0627\u0631\u0633\u0627\u0644 \u0628\u0647 \u0633\u0631\u0627\u0633\u0631 \u0627\u06CC\u0631\u0627\u0646","home.point4":"\u062A\u062D\u0648\u06CC\u0644 \u062D\u0636\u0648\u0631\u06CC \u0631\u0627\u06CC\u06AF\u0627\u0646","home.categories":"\u062F\u0633\u062A\u0647\u200C\u0628\u0646\u062F\u06CC\u200C\u0647\u0627","home.categoriesSub":"\u0627\u0632 \u0645\u0642\u0627\u0648\u0645\u062A \u0648 \u0622\u06CC\u200C\u0633\u06CC \u062A\u0627 \u067E\u0631\u0648\u0698\u06A9\u062A\u0648\u0631 \u0648 \u0645\u062D\u0627\u0641\u0638 \u0628\u0631\u0642","home.featured":"\u067E\u06CC\u0634\u0646\u0647\u0627\u062F \u0648\u06CC\u0698\u0647","home.featuredSub":"\u06A9\u0627\u0644\u0627\u0647\u0627\u06CC\u06CC \u06A9\u0647 \u062E\u0648\u062F\u0645\u0627\u0646 \u0627\u0633\u062A\u0641\u0627\u062F\u0647 \u0645\u06CC\u200C\u06A9\u0646\u06CC\u0645 \u0648 \u067E\u06CC\u0634\u0646\u0647\u0627\u062F \u0645\u06CC\u200C\u062F\u0647\u06CC\u0645","home.bestSellers":"\u067E\u0631\u0641\u0631\u0648\u0634\u200C\u062A\u0631\u06CC\u0646\u200C\u0647\u0627","home.bestSellersSub":"\u0627\u0646\u062A\u062E\u0627\u0628 \u0645\u0634\u062A\u0631\u06CC\u0627\u0646 \u06CC\u0627\u0633\u0627\u06CC\u06CC","home.newArrivals":"\u062A\u0627\u0632\u0647\u200C\u0647\u0627\u06CC \u0641\u0631\u0648\u0634\u06AF\u0627\u0647","home.newArrivalsSub":"\u0622\u062E\u0631\u06CC\u0646 \u06A9\u0627\u0644\u0627\u0647\u0627\u06CC\u06CC \u06A9\u0647 \u0628\u0647 \u0642\u0641\u0633\u0647 \u0627\u0636\u0627\u0641\u0647 \u0634\u062F\u0647","home.deals":"\u062A\u062E\u0641\u06CC\u0641\u200C\u0647\u0627\u06CC \u0641\u0639\u0627\u0644","home.dealsSub":"\u0641\u0631\u0635\u062A \u0645\u062D\u062F\u0648\u062F \u0628\u0627 \u0642\u06CC\u0645\u062A \u0628\u0647\u062A\u0631","home.brands":"\u0628\u0631\u0646\u062F\u0647\u0627\u06CC \u0645\u0648\u062C\u0648\u062F","home.whyUs":"\u0686\u0631\u0627 \u06CC\u0627\u0633\u0627\u06CC\u06CC\u061F","home.whyUsSub":"\u0686\u06CC\u0632\u0647\u0627\u06CC\u06CC \u06A9\u0647 \u0645\u0627 \u0631\u0627 \u0627\u0632 \u0628\u0642\u06CC\u0647 \u062C\u062F\u0627 \u0645\u06CC\u200C\u06A9\u0646\u062F","home.reviews":"\u0646\u0638\u0631 \u0645\u0634\u062A\u0631\u06CC\u0627\u0646","home.reviewsSub":"\u062A\u062C\u0631\u0628\u0647\u200C\u06CC \u0648\u0627\u0642\u0639\u06CC \u062E\u0631\u06CC\u062F\u0627\u0631\u0627\u0646","home.visitStore":"\u0628\u0627\u0632\u062F\u06CC\u062F \u0627\u0632 \u0641\u0631\u0648\u0634\u06AF\u0627\u0647","home.visitStoreText":"\u062A\u0647\u0631\u0627\u0646\u060C \u0646\u0627\u0631\u0645\u06A9\u060C \u0645\u06CC\u062F\u0627\u0646 \u0647\u0641\u062A\u200C\u062D\u0648\u0636 \u2014 \u0645\u0634\u0627\u0648\u0631\u0647\u0654 \u062D\u0636\u0648\u0631\u06CC \u0631\u0627\u06CC\u06AF\u0627\u0646 \u0648 \u062A\u0633\u062A \u06A9\u0627\u0644\u0627 \u0642\u0628\u0644 \u0627\u0632 \u062E\u0631\u06CC\u062F","home.openMap":"\u062F\u06CC\u062F\u0646 \u06A9\u0631\u0648\u06A9\u06CC \u0648 \u0646\u0642\u0634\u0647","home.statsTitle":"\u0641\u0631\u0648\u0634\u06AF\u0627\u0647 \u062F\u0631 \u06CC\u06A9 \u0646\u06AF\u0627\u0647","home.plusTitle":"\u0627\u0634\u062A\u0631\u0627\u06A9 \u067E\u0644\u0627\u0633 \u06CC\u0627\u0633\u0627\u06CC\u06CC","home.plusText":"\u0628\u0627 \u067E\u0631\u062F\u0627\u062E\u062A \u0645\u0627\u0647\u0627\u0646\u0647\u060C \u0627\u0631\u0633\u0627\u0644 \u0647\u0645\u0647\u200C\u06CC \u0633\u0641\u0627\u0631\u0634\u200C\u0647\u0627 \u0631\u0627\u06CC\u06AF\u0627\u0646\u060C \u0645\u0631\u0633\u0648\u0644\u0647\u200C\u0647\u0627 \u062E\u0648\u062F\u06A9\u0627\u0631 \u0628\u06CC\u0645\u0647 \u0648 \u06F3\u066A \u062A\u062E\u0641\u06CC\u0641 \u062F\u0627\u0626\u0645\u06CC \u0645\u06CC\u200C\u06AF\u06CC\u0631\u06CC.","home.plusCta":"\u062F\u06CC\u062F\u0646 \u0645\u0632\u0627\u06CC\u0627\u06CC \u067E\u0644\u0627\u0633","home.appTitle":"\u0627\u067E\u0644\u06CC\u06A9\u06CC\u0634\u0646 \u06CC\u0627\u0633\u0627\u06CC\u06CC","home.appText":"\u0647\u0645\u06CC\u0646 \u0633\u0627\u06CC\u062A \u06CC\u06A9 \u0627\u067E\u0644\u06CC\u06A9\u06CC\u0634\u0646 \u0646\u0635\u0628\u200C\u0634\u062F\u0646\u06CC (PWA) \u0627\u0633\u062A: \u0631\u0648\u06CC \u0627\u0646\u062F\u0631\u0648\u06CC\u062F\u060C \u0622\u06CC\u0641\u0648\u0646\u060C \u0648\u06CC\u0646\u062F\u0648\u0632\u060C \u0645\u06A9 \u0648 \u0644\u06CC\u0646\u0648\u06A9\u0633 \u0646\u0635\u0628 \u0645\u06CC\u200C\u0634\u0648\u062F \u0648 \u0628\u0647\u200C\u0635\u0648\u0631\u062A \u0622\u0641\u0644\u0627\u06CC\u0646 \u0647\u0645 \u06A9\u0627\u0631 \u0645\u06CC\u200C\u06A9\u0646\u062F.","home.installCta":"\u0646\u0635\u0628 \u0631\u0648\u06CC \u062F\u0633\u062A\u06AF\u0627\u0647 \u0645\u0646","home.appInstalled":"\u0627\u067E\u0644\u06CC\u06A9\u06CC\u0634\u0646 \u0646\u0635\u0628 \u0634\u062F\u0647 \u0627\u0633\u062A","home.liveStats":"\u0622\u0645\u0627\u0631 \u0632\u0646\u062F\u0647\u200C\u06CC \u0641\u0631\u0648\u0634\u06AF\u0627\u0647","home.newsletter":"\u0627\u0632 \u062A\u062E\u0641\u06CC\u0641\u200C\u0647\u0627 \u0628\u0627\u062E\u0628\u0631 \u0634\u0648","home.newsletterText":"\u0634\u0645\u0627\u0631\u0647\u200C\u06CC \u0645\u0648\u0628\u0627\u06CC\u0644\u062A \u0631\u0627 \u0628\u062F\u0647 \u062A\u0627 \u0641\u0642\u0637 \u0628\u0631\u0627\u06CC \u062A\u062E\u0641\u06CC\u0641\u200C\u0647\u0627\u06CC \u0645\u0647\u0645 \u0648 \u0645\u0648\u062C\u0648\u062F \u0634\u062F\u0646 \u06A9\u0627\u0644\u0627\u0647\u0627\u06CC \u0644\u06CC\u0633\u062A\u062A \u067E\u06CC\u0627\u0645 \u0628\u0641\u0631\u0633\u062A\u06CC\u0645.","home.subscribe":"\u0639\u0636\u0648\u06CC\u062A","stats.products":"\u06A9\u0627\u0644\u0627\u06CC \u0641\u0639\u0627\u0644","stats.ordersTotal":"\u06A9\u0644 \u0633\u0641\u0627\u0631\u0634\u200C\u0647\u0627","stats.ordersToday":"\u0633\u0641\u0627\u0631\u0634 \u0627\u0645\u0631\u0648\u0632","stats.visitsToday":"\u0628\u0627\u0632\u062F\u06CC\u062F \u0627\u0645\u0631\u0648\u0632","stats.visitsTotal":"\u06A9\u0644 \u0628\u0627\u0632\u062F\u06CC\u062F\u0647\u0627","stats.pendingOrders":"\u0633\u0641\u0627\u0631\u0634 \u062F\u0631 \u062D\u0627\u0644 \u0628\u0631\u0631\u0633\u06CC","stats.delivered":"\u062A\u062D\u0648\u06CC\u0644 \u0645\u0648\u0641\u0642","stats.customers":"\u0645\u0634\u062A\u0631\u06CC \u062B\u0628\u062A\u200C\u0646\u0627\u0645\u200C\u0634\u062F\u0647","stats.plusMembers":"\u0639\u0636\u0648 \u067E\u0644\u0627\u0633","stats.categories":"\u062F\u0633\u062A\u0647\u200C\u0628\u0646\u062F\u06CC","stats.brands":"\u0628\u0631\u0646\u062F","stats.outOfStock":"\u06A9\u0627\u0644\u0627\u06CC \u0646\u0627\u0645\u0648\u062C\u0648\u062F","stats.years":"\u0633\u0627\u0644 \u0641\u0639\u0627\u0644\u06CC\u062A","stats.title":"\u0622\u0645\u0627\u0631 \u0639\u0645\u0648\u0645\u06CC \u0641\u0631\u0648\u0634\u06AF\u0627\u0647","stats.sub":"\u0627\u06CC\u0646 \u0622\u0645\u0627\u0631 \u0628\u0647\u200C\u0635\u0648\u0631\u062A \u0632\u0646\u062F\u0647 \u0627\u0632 \u062F\u0627\u062F\u0647\u200C\u0647\u0627\u06CC \u0648\u0627\u0642\u0639\u06CC \u0633\u0627\u06CC\u062A \u06AF\u0631\u0641\u062A\u0647 \u0645\u06CC\u200C\u0634\u0648\u062F.","stats.chartTitle":"\u0628\u0627\u0632\u062F\u06CC\u062F \u06F1\u06F4 \u0631\u0648\u0632 \u0627\u062E\u06CC\u0631","stats.topProducts":"\u067E\u0631\u0641\u0631\u0648\u0634\u200C\u062A\u0631\u06CC\u0646 \u06A9\u0627\u0644\u0627\u0647\u0627","stats.transparency":"\u0634\u0641\u0627\u0641\u06CC\u062A \u0628\u0631\u0627\u06CC \u0645\u0634\u062A\u0631\u06CC","stats.transparencyText":"\u0645\u0627 \u0645\u0648\u062C\u0648\u062F\u06CC \u0648 \u0642\u06CC\u0645\u062A \u0648\u0627\u0642\u0639\u06CC \u0631\u0627 \u0646\u0645\u0627\u06CC\u0634 \u0645\u06CC\u200C\u062F\u0647\u06CC\u0645 \u0648 \u0622\u0645\u0627\u0631 \u0641\u0631\u0648\u0634\u06AF\u0627\u0647 \u0631\u0627 \u0647\u0645 \u067E\u0646\u0647\u0627\u0646 \u0646\u0645\u06CC\u200C\u06A9\u0646\u06CC\u0645.","catalog.title":"\u0645\u062D\u0635\u0648\u0644\u0627\u062A","catalog.filters":"\u0641\u06CC\u0644\u062A\u0631\u0647\u0627","catalog.showFilters":"\u0646\u0645\u0627\u06CC\u0634 \u0641\u06CC\u0644\u062A\u0631\u0647\u0627","catalog.hideFilters":"\u0628\u0633\u062A\u0646 \u0641\u06CC\u0644\u062A\u0631\u0647\u0627","catalog.sort.relevant":"\u0645\u0631\u062A\u0628\u0637\u200C\u062A\u0631\u06CC\u0646","catalog.sort.newest":"\u062C\u062F\u06CC\u062F\u062A\u0631\u06CC\u0646","catalog.sort.oldest":"\u0642\u062F\u06CC\u0645\u06CC\u200C\u062A\u0631\u06CC\u0646","catalog.sort.cheapest":"\u0627\u0631\u0632\u0627\u0646\u200C\u062A\u0631\u06CC\u0646","catalog.sort.dearest":"\u06AF\u0631\u0627\u0646\u200C\u062A\u0631\u06CC\u0646","catalog.sort.popular":"\u067E\u0631\u0641\u0631\u0648\u0634\u200C\u062A\u0631\u06CC\u0646","catalog.sort.rating":"\u0628\u06CC\u0634\u062A\u0631\u06CC\u0646 \u0627\u0645\u062A\u06CC\u0627\u0632","catalog.sort.discount":"\u0628\u06CC\u0634\u062A\u0631\u06CC\u0646 \u062A\u062E\u0641\u06CC\u0641","catalog.sort.name":"\u062D\u0631\u0648\u0641 \u0627\u0644\u0641\u0628\u0627","catalog.f.category":"\u062F\u0633\u062A\u0647\u200C\u0628\u0646\u062F\u06CC","catalog.f.brand":"\u0628\u0631\u0646\u062F","catalog.f.price":"\u0645\u062D\u062F\u0648\u062F\u0647\u200C\u06CC \u0642\u06CC\u0645\u062A","catalog.f.availability":"\u0645\u0648\u062C\u0648\u062F\u06CC","catalog.f.inStock":"\u0641\u0642\u0637 \u06A9\u0627\u0644\u0627\u0647\u0627\u06CC \u0645\u0648\u062C\u0648\u062F","catalog.f.discountOnly":"\u0641\u0642\u0637 \u062A\u062E\u0641\u06CC\u0641\u200C\u062F\u0627\u0631","catalog.f.rating":"\u062D\u062F\u0627\u0642\u0644 \u0627\u0645\u062A\u06CC\u0627\u0632","catalog.f.authenticity":"\u0627\u0635\u0627\u0644\u062A \u06A9\u0627\u0644\u0627","catalog.f.clear":"\u062D\u0630\u0641 \u0647\u0645\u0647\u200C\u06CC \u0641\u06CC\u0644\u062A\u0631\u0647\u0627","catalog.count":"\u06A9\u0627\u0644\u0627","catalog.viewGrid":"\u0646\u0645\u0627\u06CC\u0634 \u0634\u0628\u06A9\u0647\u200C\u0627\u06CC","catalog.viewList":"\u0646\u0645\u0627\u06CC\u0634 \u0641\u0647\u0631\u0633\u062A\u06CC","auth.original":"\u0627\u0635\u0644 (\u0627\u0648\u0631\u062C\u06CC\u0646\u0627\u0644)","auth.highcopy":"\u0647\u0627\u06CC\u200C\u06A9\u067E\u06CC \u062F\u0631\u062C\u0647 \u06CC\u06A9","auth.generic":"\u0645\u062A\u0641\u0631\u0642\u0647","card.addToCart":"\u0627\u0641\u0632\u0648\u062F\u0646 \u0628\u0647 \u0633\u0628\u062F","card.added":"\u0628\u0647 \u0633\u0628\u062F \u0627\u0636\u0627\u0641\u0647 \u0634\u062F","card.quickView":"\u0645\u0634\u0627\u0647\u062F\u0647\u200C\u06CC \u0633\u0631\u06CC\u0639","card.wishlistAdd":"\u0627\u0641\u0632\u0648\u062F\u0646 \u0628\u0647 \u0644\u06CC\u0633\u062A \u0645\u0646","card.wishlistRemove":"\u062D\u0630\u0641 \u0627\u0632 \u0644\u06CC\u0633\u062A \u0645\u0646","card.compareAdd":"\u0627\u0641\u0632\u0648\u062F\u0646 \u0628\u0647 \u0645\u0642\u0627\u06CC\u0633\u0647","card.outOfStock":"\u0646\u0627\u0645\u0648\u062C\u0648\u062F","card.soldOut":"\u062A\u0645\u0627\u0645 \u0634\u062F","pdp.addToCart":"\u0627\u0641\u0632\u0648\u062F\u0646 \u0628\u0647 \u0633\u0628\u062F \u062E\u0631\u06CC\u062F","pdp.buyNow":"\u062E\u0631\u06CC\u062F \u0641\u0648\u0631\u06CC","pdp.pickup":"\u062A\u062D\u0648\u06CC\u0644 \u062D\u0636\u0648\u0631\u06CC \u0631\u0627\u06CC\u06AF\u0627\u0646 \u062F\u0631 \u0645\u063A\u0627\u0632\u0647","pdp.warranty":"\u06AF\u0627\u0631\u0627\u0646\u062A\u06CC","pdp.warrantyMonths":"{n} \u0645\u0627\u0647 \u06AF\u0627\u0631\u0627\u0646\u062A\u06CC \u062A\u0639\u0648\u06CC\u0636 \u0641\u0631\u0648\u0634\u06AF\u0627\u0647","pdp.noWarranty":"\u0628\u062F\u0648\u0646 \u06AF\u0627\u0631\u0627\u0646\u062A\u06CC","pdp.sku":"\u06A9\u062F \u06A9\u0627\u0644\u0627","pdp.barcode":"\u0628\u0627\u0631\u06A9\u062F","pdp.weight":"\u0648\u0632\u0646","pdp.gram":"\u06AF\u0631\u0645","pdp.zoomIn":"\u0628\u0632\u0631\u06AF\u200C\u0646\u0645\u0627\u06CC\u06CC","pdp.zoomOut":"\u06A9\u0648\u0686\u06A9\u200C\u0646\u0645\u0627\u06CC\u06CC","pdp.zoomReset":"\u0627\u0646\u062F\u0627\u0632\u0647\u0654 \u0627\u0635\u0644\u06CC","pdp.zoomHint":"\u0630\u0631\u0647\u200C\u0628\u06CC\u0646: \u0645\u0648\u0633 \u0631\u0627 \u0631\u0648\u06CC \u062A\u0635\u0648\u06CC\u0631 \u0628\u0628\u0631\u061B \u0628\u0632\u0631\u06AF\u200C\u0646\u0645\u0627\u06CC\u06CC \u06A9\u0627\u0645\u0644: \u06A9\u0644\u06CC\u06A9 \u06CC\u0627 \u062F\u0648\u0636\u0631\u0628\u0647","pdp.video":"\u0648\u06CC\u062F\u06CC\u0648","pdp.share":"\u0627\u0634\u062A\u0631\u0627\u06A9\u200C\u06AF\u0630\u0627\u0631\u06CC","pdp.specs":"\u0645\u0634\u062E\u0635\u0627\u062A \u0641\u0646\u06CC","pdp.description":"\u062A\u0648\u0636\u06CC\u062D\u0627\u062A","pdp.reviews":"\u0646\u0638\u0631\u0627\u062A \u0648 \u0627\u0645\u062A\u06CC\u0627\u0632\u0647\u0627","pdp.questions":"\u0633\u0624\u0627\u0644\u0627\u062A \u06A9\u0627\u0631\u0628\u0631\u0627\u0646","pdp.related":"\u06A9\u0627\u0644\u0627\u0647\u0627\u06CC \u0645\u0634\u0627\u0628\u0647","pdp.compatibility":"\u0633\u0627\u0632\u06AF\u0627\u0631\u06CC","pdp.writeReview":"\u062B\u0628\u062A \u0646\u0638\u0631 \u0648 \u0627\u0645\u062A\u06CC\u0627\u0632","pdp.askQuestion":"\u067E\u0631\u0633\u06CC\u062F\u0646 \u0633\u0624\u0627\u0644","pdp.loginToReview":"\u0628\u0631\u0627\u06CC \u062B\u0628\u062A \u0646\u0638\u0631 \u0648\u0627\u0631\u062F \u062D\u0633\u0627\u0628 \u06A9\u0627\u0631\u0628\u0631\u06CC \u0634\u0648.","pdp.reviewSubmitted":"\u0646\u0638\u0631 \u0634\u0645\u0627 \u062B\u0628\u062A \u0634\u062F \u0648 \u067E\u0633 \u0627\u0632 \u062A\u0623\u06CC\u06CC\u062F \u0645\u062F\u06CC\u0631 \u0646\u0645\u0627\u06CC\u0634 \u062F\u0627\u062F\u0647 \u0645\u06CC\u200C\u0634\u0648\u062F.","pdp.reviewPending":"\u0646\u0638\u0631 \u0634\u0645\u0627 \u067E\u0633 \u0627\u0632 \u062A\u0623\u06CC\u06CC\u062F \u0645\u062F\u06CC\u0631 \u0646\u0645\u0627\u06CC\u0634 \u062F\u0627\u062F\u0647 \u0645\u06CC\u200C\u0634\u0648\u062F.","pdp.questionSubmitted":"\u0633\u0624\u0627\u0644 \u0634\u0645\u0627 \u062B\u0628\u062A \u0634\u062F\u061B \u067E\u0633 \u0627\u0632 \u062A\u0623\u06CC\u06CC\u062F\u060C \u0645\u062F\u06CC\u0631 \u0628\u0647 \u0622\u0646 \u067E\u0627\u0633\u062E \u0645\u06CC\u200C\u062F\u0647\u062F.","pdp.buyerBadge":"\u062E\u0631\u06CC\u062F\u0627\u0631 \u0627\u06CC\u0646 \u06A9\u0627\u0644\u0627","pdp.visitorBadge":"\u0628\u0627\u0632\u062F\u06CC\u062F\u06A9\u0646\u0646\u062F\u0647","pdp.helpful":"\u0645\u0641\u06CC\u062F \u0628\u0648\u062F","pdp.storeReply":"\u067E\u0627\u0633\u062E \u0641\u0631\u0648\u0634\u06AF\u0627\u0647","pdp.noReviews":"\u0647\u0646\u0648\u0632 \u0646\u0638\u0631\u06CC \u062B\u0628\u062A \u0646\u0634\u062F\u0647. \u0627\u0648\u0644\u06CC\u0646 \u0646\u0641\u0631 \u0628\u0627\u0634!","pdp.noQuestions":"\u0633\u0624\u0627\u0644\u06CC \u062B\u0628\u062A \u0646\u0634\u062F\u0647. \u0627\u06AF\u0631 \u0633\u0624\u0627\u0644\u06CC \u062F\u0627\u0631\u06CC \u0628\u067E\u0631\u0633.","pdp.yourRating":"\u0627\u0645\u062A\u06CC\u0627\u0632 \u0634\u0645\u0627","pdp.viewed":"\u0628\u0627\u0632\u062F\u06CC\u062F","pdp.sold":"\u0641\u0631\u0648\u0634 \u0631\u0641\u062A\u0647","pdp.off":"\u062A\u062E\u0641\u06CC\u0641","pdp.save":"\u0633\u0648\u062F \u0634\u0645\u0627","pdp.lastPrice":"\u0642\u06CC\u0645\u062A \u0642\u0628\u0644\u06CC","pdp.stockCount":"\u0645\u0648\u062C\u0648\u062F\u06CC: {n} \u0639\u062F\u062F","pdp.fastSend":"\u0627\u0631\u0633\u0627\u0644 \u0633\u0631\u06CC\u0639 \u0627\u0632 \u062A\u0647\u0631\u0627\u0646","pdp.installment":"\u067E\u0631\u062F\u0627\u062E\u062A \u062F\u0631 \u0645\u062D\u0644 \u0628\u0631\u0627\u06CC \u0633\u0641\u0627\u0631\u0634\u200C\u0647\u0627\u06CC \u0648\u0627\u062C\u062F \u0634\u0631\u0627\u06CC\u0637","cart.title":"\u0633\u0628\u062F \u062E\u0631\u06CC\u062F","cart.empty":"\u0633\u0628\u062F \u062E\u0631\u06CC\u062F \u062E\u0627\u0644\u06CC \u0627\u0633\u062A","cart.emptyText":"\u0647\u0646\u0648\u0632 \u06A9\u0627\u0644\u0627\u06CC\u06CC \u0627\u0646\u062A\u062E\u0627\u0628 \u0646\u06A9\u0631\u062F\u0647\u200C\u0627\u06CC. \u0627\u0632 \u062F\u0633\u062A\u0647\u200C\u0628\u0646\u062F\u06CC\u200C\u0647\u0627 \u06CC\u0627 \u062C\u0633\u062A\u200C\u0648\u062C\u0648 \u0634\u0631\u0648\u0639 \u06A9\u0646.","cart.goShopping":"\u0628\u0631\u06CC\u0645 \u0633\u0631\u0627\u063A \u062E\u0631\u06CC\u062F","cart.item":"\u06A9\u0627\u0644\u0627","cart.qty":"\u062A\u0639\u062F\u0627\u062F","cart.remove":"\u062D\u0630\u0641","cart.clear":"\u062E\u0627\u0644\u06CC \u06A9\u0631\u062F\u0646 \u0633\u0628\u062F","cart.clearConfirm":"\u0647\u0645\u0647\u200C\u06CC \u06A9\u0627\u0644\u0627\u0647\u0627\u06CC \u0633\u0628\u062F \u062D\u0630\u0641 \u0634\u0648\u0646\u062F\u061F","cart.summary":"\u062E\u0644\u0627\u0635\u0647\u200C\u06CC \u0633\u0641\u0627\u0631\u0634","cart.continue":"\u0627\u062F\u0627\u0645\u0647\u200C\u06CC \u0641\u0631\u0622\u06CC\u0646\u062F \u062E\u0631\u06CC\u062F","cart.freeShipHint":"\u0627\u06AF\u0631 {amount} \u062A\u0648\u0645\u0627\u0646 \u062F\u06CC\u06AF\u0631 \u062E\u0631\u06CC\u062F \u06A9\u0646\u06CC\u060C \u0627\u0631\u0633\u0627\u0644 \u0631\u0627\u06CC\u06AF\u0627\u0646 \u0645\u06CC\u200C\u0634\u0648\u062F.","cart.freeShipDone":"\u0627\u0631\u0633\u0627\u0644 \u0627\u06CC\u0646 \u0633\u0641\u0627\u0631\u0634 \u0631\u0627\u06CC\u06AF\u0627\u0646 \u0627\u0633\u062A!","cart.couponApplied":"\u06A9\u062F \u062A\u062E\u0641\u06CC\u0641 \u0627\u0639\u0645\u0627\u0644 \u0634\u062F","cart.couponPlaceholder":"\u06A9\u062F \u062A\u062E\u0641\u06CC\u0641 \u062F\u0627\u0631\u06CC\u061F \u0648\u0627\u0631\u062F \u06A9\u0646","cart.applyCoupon":"\u0627\u0639\u0645\u0627\u0644 \u06A9\u062F","cart.removeCoupon":"\u062D\u0630\u0641 \u06A9\u062F","cart.updated":"\u0633\u0628\u062F \u0628\u0647\u200C\u0631\u0648\u0632\u0631\u0633\u0627\u0646\u06CC \u0634\u062F","checkout.title":"\u062A\u06A9\u0645\u06CC\u0644 \u0633\u0641\u0627\u0631\u0634","checkout.step1":"\u062A\u062D\u0648\u06CC\u0644","checkout.step2":"\u067E\u0631\u062F\u0627\u062E\u062A","checkout.step3":"\u062A\u0623\u06CC\u06CC\u062F","checkout.delivery":"\u0631\u0648\u0634 \u062A\u062D\u0648\u06CC\u0644","checkout.pickup":"\u062A\u062D\u0648\u06CC\u0644 \u062D\u0636\u0648\u0631\u06CC \u0627\u0632 \u0645\u063A\u0627\u0632\u0647","checkout.pickupDesc":"\u0631\u0627\u06CC\u06AF\u0627\u0646 \u2014 \u067E\u0633 \u0627\u0632 \u062A\u0623\u06CC\u06CC\u062F\u060C \u0627\u0639\u0644\u0627\u0646 \u0622\u0645\u0627\u062F\u0647\u200C\u0633\u0627\u0632\u06CC \u0645\u06CC\u200C\u06AF\u06CC\u0631\u06CC \u0648 \u062D\u0636\u0648\u0631\u06CC \u062A\u062D\u0648\u06CC\u0644 \u0645\u06CC\u200C\u06AF\u06CC\u0631\u06CC.","checkout.courier":"\u0627\u0631\u0633\u0627\u0644 \u0628\u0627 \u067E\u06CC\u06A9 / \u067E\u0633\u062A","checkout.courierDesc":"\u0627\u0631\u0633\u0627\u0644 \u0628\u0647 \u0622\u062F\u0631\u0633 \u062B\u0628\u062A\u200C\u0634\u062F\u0647 \u0628\u0627 \u0627\u0645\u06A9\u0627\u0646 \u0628\u06CC\u0645\u0647\u200C\u06CC \u0645\u0631\u0633\u0648\u0644\u0647.","checkout.zone":"\u0645\u0646\u0637\u0642\u0647\u200C\u06CC \u0627\u0631\u0633\u0627\u0644","checkout.express":"\u0627\u0631\u0633\u0627\u0644 \u0641\u0648\u0631\u06CC (\u0647\u0645\u0627\u0646 \u0631\u0648\u0632)","checkout.insuranceOpt":"\u0628\u06CC\u0645\u0647\u200C\u06CC \u0645\u0631\u0633\u0648\u0644\u0647","checkout.insuranceDesc":"\u062F\u0631 \u0635\u0648\u0631\u062A \u0622\u0633\u06CC\u0628 \u06CC\u0627 \u0645\u0641\u0642\u0648\u062F\u06CC \u062F\u0631 \u0645\u0633\u06CC\u0631\u060C \u0645\u0639\u0627\u062F\u0644 \u0627\u0631\u0632\u0634 \u06A9\u0627\u0644\u0627 \u062C\u0628\u0631\u0627\u0646 \u0645\u06CC\u200C\u0634\u0648\u062F.","checkout.insuranceAuto":"\u0628\u0631\u0627\u06CC \u0627\u0639\u0636\u0627\u06CC \u067E\u0644\u0627\u0633 \u0628\u0647\u200C\u0635\u0648\u0631\u062A \u062E\u0648\u062F\u06A9\u0627\u0631 \u0648 \u0631\u0627\u06CC\u06AF\u0627\u0646 \u0627\u0639\u0645\u0627\u0644 \u0634\u062F.","checkout.address":"\u0622\u062F\u0631\u0633 \u0627\u0631\u0633\u0627\u0644","checkout.addAddress":"\u0627\u0641\u0632\u0648\u062F\u0646 \u0622\u062F\u0631\u0633 \u062C\u062F\u06CC\u062F","checkout.noAddress":"\u0628\u0631\u0627\u06CC \u0627\u0631\u0633\u0627\u0644 \u067E\u0633\u062A\u06CC \u0628\u0627\u06CC\u062F \u062D\u062F\u0627\u0642\u0644 \u06CC\u06A9 \u0622\u062F\u0631\u0633 \u062B\u0628\u062A \u06A9\u0646\u06CC.","checkout.paymentMethod":"\u0631\u0648\u0634 \u067E\u0631\u062F\u0627\u062E\u062A","checkout.useWallet":"\u067E\u0631\u062F\u0627\u062E\u062A \u0627\u0632 \u06A9\u06CC\u0641 \u067E\u0648\u0644","checkout.walletBalance":"\u0645\u0648\u062C\u0648\u062F\u06CC \u06A9\u06CC\u0641 \u067E\u0648\u0644: {amount} \u062A\u0648\u0645\u0627\u0646","checkout.note":"\u062A\u0648\u0636\u06CC\u062D\u0627\u062A \u0633\u0641\u0627\u0631\u0634 (\u0627\u062E\u062A\u06CC\u0627\u0631\u06CC)","checkout.notePlaceholder":"\u0645\u062B\u0644\u0627\u064B: \u0644\u0637\u0641\u0627\u064B \u0642\u0628\u0644 \u0627\u0632 \u0627\u0631\u0633\u0627\u0644 \u062A\u0645\u0627\u0633 \u0628\u06AF\u06CC\u0631\u06CC\u062F.","checkout.acceptTerms":"\u0642\u0648\u0627\u0646\u06CC\u0646 \u0648 \u0645\u0642\u0631\u0631\u0627\u062A \u0648 \u062D\u0631\u06CC\u0645 \u062E\u0635\u0648\u0635\u06CC \u0631\u0627 \u062E\u0648\u0627\u0646\u062F\u0647\u200C\u0627\u0645 \u0648 \u0645\u06CC\u200C\u067E\u0630\u06CC\u0631\u0645.","checkout.placeOrder":"\u062B\u0628\u062A \u0648 \u067E\u0631\u062F\u0627\u062E\u062A \u0633\u0641\u0627\u0631\u0634","checkout.placing":"\u062F\u0631 \u062D\u0627\u0644 \u062B\u0628\u062A \u0633\u0641\u0627\u0631\u0634\u2026","checkout.loginRequired":"\u0628\u0631\u0627\u06CC \u062A\u06A9\u0645\u06CC\u0644 \u062E\u0631\u06CC\u062F \u0648\u0627\u0631\u062F \u062D\u0633\u0627\u0628 \u06A9\u0627\u0631\u0628\u0631\u06CC \u0634\u0648.","checkout.successTitle":"\u0633\u0641\u0627\u0631\u0634 \u062B\u0628\u062A \u0634\u062F","checkout.successText":"\u06A9\u062F \u0633\u0641\u0627\u0631\u0634 \u062A\u0648 {code} \u0627\u0633\u062A. \u0648\u0636\u0639\u06CC\u062A \u0631\u0627 \u0627\u0632 \u0628\u062E\u0634 \xAB\u0633\u0641\u0627\u0631\u0634\u200C\u0647\u0627\u06CC \u0645\u0646\xBB \u067E\u06CC\u06AF\u06CC\u0631\u06CC \u06A9\u0646.","checkout.payNow":"\u067E\u0631\u062F\u0627\u062E\u062A \u0622\u0646\u0644\u0627\u06CC\u0646","checkout.payLater":"\u0628\u0639\u062F\u0627\u064B \u067E\u0631\u062F\u0627\u062E\u062A \u0645\u06CC\u200C\u06A9\u0646\u0645","checkout.gatewayDemo":"\u062F\u0631\u06AF\u0627\u0647 \u062F\u0631 \u062D\u0627\u0644\u062A \u0622\u0632\u0645\u0627\u06CC\u0634\u06CC \u0627\u0633\u062A\u061B \u0647\u06CC\u0686 \u0645\u0628\u0644\u063A\u06CC \u0648\u0627\u0642\u0639\u0627\u064B \u06A9\u0633\u0631 \u0646\u0645\u06CC\u200C\u0634\u0648\u062F.","checkout.paymentSuccess":"\u067E\u0631\u062F\u0627\u062E\u062A \u0645\u0648\u0641\u0642 \u0628\u0648\u062F","checkout.paymentFailed":"\u067E\u0631\u062F\u0627\u062E\u062A \u0646\u0627\u0645\u0648\u0641\u0642 \u0628\u0648\u062F","checkout.simulateSuccess":"\u067E\u0631\u062F\u0627\u062E\u062A \u0645\u0648\u0641\u0642 (\u0634\u0628\u06CC\u0647\u200C\u0633\u0627\u0632\u06CC \u062F\u0631\u06AF\u0627\u0647)","checkout.simulateFail":"\u0644\u063A\u0648 \u067E\u0631\u062F\u0627\u062E\u062A","checkout.concurrencyNote":"\u0645\u0648\u062C\u0648\u062F\u06CC \u062F\u0631 \u0644\u062D\u0638\u0647\u200C\u06CC \u062B\u0628\u062A \u0633\u0641\u0627\u0631\u0634 \u0642\u0641\u0644 \u0645\u06CC\u200C\u0634\u0648\u062F\u061B \u0627\u06AF\u0631 \u06A9\u0627\u0644\u0627\u06CC\u06CC \u0647\u0645\u200C\u0632\u0645\u0627\u0646 \u062A\u0645\u0627\u0645 \u0634\u0648\u062F\u060C \u0628\u0647 \u062A\u0648 \u0627\u0637\u0644\u0627\u0639 \u0645\u06CC\u200C\u062F\u0647\u06CC\u0645 \u0648 \u0648\u062C\u0647 \u0628\u0627\u0632 \u0645\u06CC\u200C\u06AF\u0631\u062F\u062F.","checkout.pickupReady":"\u0632\u0645\u0627\u0646 \u0622\u0645\u0627\u062F\u0647\u200C\u0633\u0627\u0632\u06CC: \u062D\u062F\u0648\u062F {h} \u0633\u0627\u0639\u062A \u06A9\u0627\u0631\u06CC","auth.title":"\u0648\u0631\u0648\u062F \u06CC\u0627 \u062B\u0628\u062A\u200C\u0646\u0627\u0645","auth.loginTitle":"\u0648\u0631\u0648\u062F \u0628\u0647 \u062D\u0633\u0627\u0628 \u06A9\u0627\u0631\u0628\u0631\u06CC","auth.registerTitle":"\u0633\u0627\u062E\u062A \u062D\u0633\u0627\u0628 \u06A9\u0627\u0631\u0628\u0631\u06CC","auth.methodPassword":"\u0646\u0627\u0645 \u06A9\u0627\u0631\u0628\u0631\u06CC \u0648 \u0631\u0645\u0632","auth.methodPhone":"\u0634\u0645\u0627\u0631\u0647 \u0645\u0648\u0628\u0627\u06CC\u0644","auth.methodEmail":"\u0627\u06CC\u0645\u06CC\u0644","auth.identifier":"\u0646\u0627\u0645 \u06A9\u0627\u0631\u0628\u0631\u06CC\u060C \u0645\u0648\u0628\u0627\u06CC\u0644 \u06CC\u0627 \u0627\u06CC\u0645\u06CC\u0644","auth.remember":"\u0645\u0631\u0627 \u0628\u0647 \u062E\u0627\u0637\u0631 \u0628\u0633\u067E\u0627\u0631","auth.forgot":"\u0641\u0631\u0627\u0645\u0648\u0634\u06CC \u0631\u0645\u0632 \u0639\u0628\u0648\u0631","auth.noAccount":"\u062D\u0633\u0627\u0628 \u06A9\u0627\u0631\u0628\u0631\u06CC \u0646\u062F\u0627\u0631\u06CC\u061F","auth.haveAccount":"\u0642\u0628\u0644\u0627\u064B \u062B\u0628\u062A\u200C\u0646\u0627\u0645 \u06A9\u0631\u062F\u0647\u200C\u0627\u06CC\u061F","auth.sendCode":"\u0627\u0631\u0633\u0627\u0644 \u06A9\u062F \u062A\u0623\u06CC\u06CC\u062F","auth.codeSent":"\u06A9\u062F \u062A\u0623\u06CC\u06CC\u062F \u0627\u0631\u0633\u0627\u0644 \u0634\u062F","auth.codeSentTo":"\u06A9\u062F \u06F6 \u0631\u0642\u0645\u06CC \u0628\u0647 {target} \u0627\u0631\u0633\u0627\u0644 \u0634\u062F.","auth.enterCode":"\u06A9\u062F \u062A\u0623\u06CC\u06CC\u062F \u0631\u0627 \u0648\u0627\u0631\u062F \u06A9\u0646","auth.otpCode":"\u06A9\u062F \u062A\u0623\u06CC\u06CC\u062F","auth.resend":"\u0627\u0631\u0633\u0627\u0644 \u062F\u0648\u0628\u0627\u0631\u0647\u200C\u06CC \u06A9\u062F","auth.resendIn":"\u0627\u0631\u0633\u0627\u0644 \u062F\u0648\u0628\u0627\u0631\u0647 \u062A\u0627 {s} \u062B\u0627\u0646\u06CC\u0647","auth.demoCode":"\u062D\u0627\u0644\u062A \u0622\u0632\u0645\u0627\u06CC\u0634\u06CC: \u06A9\u062F \u062A\u0623\u06CC\u06CC\u062F {code}","auth.2faTitle":"\u0648\u0631\u0648\u062F \u062F\u0648\u0645\u0631\u062D\u0644\u0647\u200C\u0627\u06CC","auth.2faText":"\u06A9\u062F \u06F6 \u0631\u0642\u0645\u06CC \u0627\u0632 \u0627\u067E \u0627\u062D\u0631\u0627\u0632 \u0647\u0648\u06CC\u062A\u060C \u067E\u06CC\u0627\u0645\u06A9 \u06CC\u0627 \u0627\u06CC\u0645\u06CC\u0644 \u0631\u0627 \u0648\u0627\u0631\u062F \u06A9\u0646.","auth.2faTotp":"\u0627\u067E \u0627\u062D\u0631\u0627\u0632 \u0647\u0648\u06CC\u062A","auth.2faSms":"\u06A9\u062F \u067E\u06CC\u0627\u0645\u06A9\u06CC","auth.2faEmail":"\u06A9\u062F \u0627\u06CC\u0645\u06CC\u0644\u06CC","auth.2faBackup":"\u06A9\u062F \u067E\u0634\u062A\u06CC\u0628\u0627\u0646","auth.2faVerify":"\u062A\u0623\u06CC\u06CC\u062F \u0648 \u0648\u0631\u0648\u062F","auth.acceptTerms":"\u0642\u0648\u0627\u0646\u06CC\u0646 \u0648 \u0645\u0642\u0631\u0631\u0627\u062A \u0648 \u062D\u0631\u06CC\u0645 \u062E\u0635\u0648\u0635\u06CC \u0631\u0627 \u0645\u06CC\u200C\u067E\u0630\u06CC\u0631\u0645.","auth.referral":"\u06A9\u062F \u0645\u0639\u0631\u0641 (\u0627\u062E\u062A\u06CC\u0627\u0631\u06CC)","auth.registerDone":"\u062D\u0633\u0627\u0628 \u06A9\u0627\u0631\u0628\u0631\u06CC \u0633\u0627\u062E\u062A\u0647 \u0634\u062F. \u062E\u0648\u0634 \u0622\u0645\u062F\u06CC!","auth.loginDone":"\u062E\u0648\u0634 \u0622\u0645\u062F\u06CC","auth.logoutDone":"\u0628\u0627 \u0645\u0648\u0641\u0642\u06CC\u062A \u062E\u0627\u0631\u062C \u0634\u062F\u06CC","auth.recoveryTitle":"\u0628\u0627\u0632\u06CC\u0627\u0628\u06CC \u0631\u0645\u0632 \u0639\u0628\u0648\u0631","auth.recoveryText":"\u0634\u0645\u0627\u0631\u0647\u200C\u06CC \u0645\u0648\u0628\u0627\u06CC\u0644 \u06CC\u0627 \u0627\u06CC\u0645\u06CC\u0644 \u062B\u0628\u062A\u200C\u0634\u062F\u0647 \u0631\u0627 \u0648\u0627\u0631\u062F \u06A9\u0646 \u062A\u0627 \u06A9\u062F \u0628\u0627\u0632\u06CC\u0627\u0628\u06CC \u0628\u0641\u0631\u0633\u062A\u06CC\u0645.","auth.newPassword":"\u0631\u0645\u0632 \u0639\u0628\u0648\u0631 \u062C\u062F\u06CC\u062F","auth.resetDone":"\u0631\u0645\u0632 \u0639\u0628\u0648\u0631 \u0628\u0627 \u0645\u0648\u0641\u0642\u06CC\u062A \u062A\u063A\u06CC\u06CC\u0631 \u06A9\u0631\u062F","auth.passwordRules":"\u062D\u062F\u0627\u0642\u0644 \u06F8 \u0646\u0648\u06CC\u0633\u0647 \u0634\u0627\u0645\u0644 \u062D\u0631\u0648\u0641 \u06A9\u0648\u0686\u06A9\u060C \u062D\u0631\u0648\u0641 \u0628\u0632\u0631\u06AF\u060C \u0639\u062F\u062F \u0648 \u0646\u0645\u0627\u062F","auth.orContinue":"\u06CC\u0627","auth.guestCheckout":"\u0627\u062F\u0627\u0645\u0647\u200C\u06CC \u062E\u0631\u06CC\u062F \u0628\u062F\u0648\u0646 \u062D\u0633\u0627\u0628 \u06A9\u0627\u0631\u0628\u0631\u06CC","acc.title":"\u062D\u0633\u0627\u0628 \u06A9\u0627\u0631\u0628\u0631\u06CC","acc.dashboard":"\u062F\u0627\u0634\u0628\u0648\u0631\u062F \u0645\u0646","acc.badges":"\u0627\u0641\u062A\u062E\u0627\u0631\u0627\u062A \u0645\u0646","badge.got":"\u062F\u0631\u06CC\u0627\u0641\u062A\u200C\u0634\u062F\u0647","badge.locked":"\u0647\u0646\u0648\u0632 \u0642\u0641\u0644","badge.first-buy":"\u0646\u062E\u0633\u062A\u06CC\u0646 \u062E\u0631\u06CC\u062F","badge.first-buy.d":"\u0627\u0648\u0644\u06CC\u0646 \u0633\u0641\u0627\u0631\u0634 \u0645\u0648\u0641\u0642 \u0631\u0627 \u062B\u0628\u062A \u06A9\u0631\u062F\u0647\u200C\u0627\u06CC\u062F.","badge.silver-buyer":"\u062E\u0631\u06CC\u062F\u0627\u0631 \u0646\u0642\u0631\u0647\u200C\u0627\u06CC","badge.silver-buyer.d":"\u06F5 \u062E\u0631\u06CC\u062F \u0645\u0648\u0641\u0642\u061B \u0627\u0639\u062A\u0628\u0627\u0631 \u0634\u0645\u0627 \u0646\u0632\u062F \u06CC\u0627\u0633\u0627\u06CC\u06CC.","badge.gold-buyer":"\u062E\u0631\u06CC\u062F\u0627\u0631 \u0637\u0644\u0627\u06CC\u06CC","badge.gold-buyer.d":"\u06F1\u06F5 \u062E\u0631\u06CC\u062F \u0645\u0648\u0641\u0642\u061B \u0645\u0634\u062A\u0631\u06CC \u0648\u06CC\u0698\u0647\u0654 \u06CC\u0627\u0633\u0627\u06CC\u06CC.","badge.big-spender":"\u062E\u0648\u0634\u200C\u062D\u0633\u0627\u0628","badge.big-spender.d":"\u0645\u062C\u0645\u0648\u0639 \u062E\u0631\u06CC\u062F \u0628\u0627\u0644\u0627\u06CC \u06F5\u06F0 \u0645\u06CC\u0644\u06CC\u0648\u0646 \u062A\u0648\u0645\u0627\u0646.","badge.early-bird":"\u067E\u06CC\u0634\u06AF\u0627\u0645","badge.early-bird.d":"\u062C\u0632\u0648 \u06F1\u06F0\u06F0 \u06A9\u0627\u0631\u0628\u0631 \u0646\u062E\u0633\u062A \u06CC\u0627\u0633\u0627\u06CC\u06CC \u0628\u0648\u062F\u0647\u200C\u0627\u06CC\u062F.","badge.veteran":"\u0647\u0645\u0631\u0627\u0647 \u06A9\u0647\u0646\u0647\u200C\u06A9\u0627\u0631","badge.veteran.d":"\u0628\u06CC\u0634 \u0627\u0632 \u06CC\u06A9 \u0633\u0627\u0644 \u0647\u0645\u0631\u0627\u0647 \u0645\u0627 \u0647\u0633\u062A\u06CC\u062F.","badge.reviewer":"\u0646\u0642\u062F\u0646\u0648\u06CC\u0633","badge.reviewer.d":"\u06F3 \u062B\u0628\u062A \u062A\u062C\u0631\u0628\u0647\u0654 \u062E\u0631\u06CC\u062F\u061B \u06A9\u0645\u06A9 \u0628\u0647 \u0627\u0646\u062A\u062E\u0627\u0628 \u0628\u0642\u06CC\u0647.","badge.plus-member":"\u0639\u0636\u0648 \u067E\u0644\u0627\u0633","badge.plus-member.d":"\u0627\u0634\u062A\u0631\u0627\u06A9 \u067E\u0644\u0627\u0633 \u0641\u0639\u0627\u0644 \u062F\u0627\u0631\u06CC\u062F.","badge.wallet-user":"\u06A9\u06CC\u0641\u200C\u067E\u0648\u0644\u06CC","badge.wallet-user.d":"\u0627\u0632 \u06A9\u06CC\u0641 \u067E\u0648\u0644 \u06CC\u0627\u0633\u0627\u06CC\u06CC \u0627\u0633\u062A\u0641\u0627\u062F\u0647 \u06A9\u0631\u062F\u0647\u200C\u0627\u06CC\u062F.","badge.supporter":"\u067E\u06CC\u06AF\u06CC\u0631","badge.supporter.d":"\u0627\u0648\u0644\u06CC\u0646 \u062A\u06CC\u06A9\u062A \u067E\u0634\u062A\u06CC\u0628\u0627\u0646\u06CC \u0631\u0627 \u062B\u0628\u062A \u06A9\u0631\u062F\u0647\u200C\u0627\u06CC\u062F.","acc.orders":"\u0633\u0641\u0627\u0631\u0634\u200C\u0647\u0627\u06CC \u0645\u0646","acc.wishlist":"\u0644\u06CC\u0633\u062A \u0645\u0646","acc.wallet":"\u06A9\u06CC\u0641 \u067E\u0648\u0644","acc.plus":"\u0627\u0634\u062A\u0631\u0627\u06A9 \u067E\u0644\u0627\u0633","acc.addresses":"\u0622\u062F\u0631\u0633\u200C\u0647\u0627","acc.notifications":"\u0627\u0639\u0644\u0627\u0646\u200C\u0647\u0627","acc.tickets":"\u062A\u06CC\u06A9\u062A\u200C\u0647\u0627\u06CC \u0645\u0646","acc.support":"\u0686\u062A \u067E\u0634\u062A\u06CC\u0628\u0627\u0646\u06CC","acc.reviews":"\u0646\u0638\u0631\u0627\u062A \u0645\u0646","acc.feedback":"\u067E\u06CC\u0634\u0646\u0647\u0627\u062F\u0647\u0627 \u0648 \u0634\u06A9\u0627\u06CC\u0627\u062A","acc.profile":"\u0645\u0634\u062E\u0635\u0627\u062A \u067E\u0631\u0648\u0641\u0627\u06CC\u0644","acc.security":"\u0627\u0645\u0646\u06CC\u062A \u062D\u0633\u0627\u0628","acc.sessions":"\u0646\u0634\u0633\u062A\u200C\u0647\u0627\u06CC \u0641\u0639\u0627\u0644","acc.prefs":"\u062A\u0631\u062C\u06CC\u062D\u0627\u062A \u0646\u0645\u0627\u06CC\u0634","acc.data":"\u062F\u0627\u062F\u0647\u200C\u0647\u0627\u06CC \u0645\u0646","acc.hello":"\u0633\u0644\u0627\u0645 {name}","acc.memberSince":"\u0639\u0636\u0648 \u0627\u0632 {date}","acc.noOrders":"\u0647\u0646\u0648\u0632 \u0633\u0641\u0627\u0631\u0634\u06CC \u062B\u0628\u062A \u0646\u06A9\u0631\u062F\u0647\u200C\u0627\u06CC","acc.noOrdersText":"\u0627\u0648\u0644\u06CC\u0646 \u062E\u0631\u06CC\u062F\u062A \u0631\u0627 \u0628\u0627 \u062A\u062E\u0641\u06CC\u0641 \u062E\u0648\u0634\u200C\u0622\u0645\u062F\u06AF\u0648\u06CC\u06CC WELCOME10 \u0627\u0646\u062C\u0627\u0645 \u0628\u062F\u0647.","acc.orderCode":"\u06A9\u062F \u0633\u0641\u0627\u0631\u0634","acc.orderDate":"\u062A\u0627\u0631\u06CC\u062E \u0633\u0641\u0627\u0631\u0634","acc.orderItems":"\u0627\u0642\u0644\u0627\u0645","acc.orderTotal":"\u0645\u0628\u0644\u063A \u06A9\u0644","acc.trackOrder":"\u067E\u06CC\u06AF\u06CC\u0631\u06CC \u0633\u0641\u0627\u0631\u0634","acc.cancelOrder":"\u0644\u063A\u0648 \u0633\u0641\u0627\u0631\u0634","acc.cancelConfirm":"\u0627\u06CC\u0646 \u0633\u0641\u0627\u0631\u0634 \u0644\u063A\u0648 \u0634\u0648\u062F\u061F \u0645\u0628\u0644\u063A \u067E\u0631\u062F\u0627\u062E\u062A\u06CC \u0628\u0647 \u06A9\u06CC\u0641 \u067E\u0648\u0644 \u0628\u0631\u0645\u06CC\u200C\u06AF\u0631\u062F\u062F.","acc.cancelReason":"\u062F\u0644\u06CC\u0644 \u0644\u063A\u0648 (\u0627\u062E\u062A\u06CC\u0627\u0631\u06CC)","acc.orderCancelled":"\u0633\u0641\u0627\u0631\u0634 \u0644\u063A\u0648 \u0634\u062F","acc.reorder":"\u062E\u0631\u06CC\u062F \u062F\u0648\u0628\u0627\u0631\u0647","acc.invoice":"\u0641\u0627\u06A9\u062A\u0648\u0631","acc.printInvoice":"\u0686\u0627\u067E \u0641\u0627\u06A9\u062A\u0648\u0631","acc.timeline":"\u0631\u0648\u0646\u062F \u0633\u0641\u0627\u0631\u0634","acc.walletEmpty":"\u062A\u0631\u0627\u06A9\u0646\u0634\u06CC \u062B\u0628\u062A \u0646\u0634\u062F\u0647 \u0627\u0633\u062A","acc.walletDeposit":"\u0634\u0627\u0631\u0698 \u06A9\u06CC\u0641 \u067E\u0648\u0644","acc.walletAmount":"\u0645\u0628\u0644\u063A \u0634\u0627\u0631\u0698 (\u062A\u0648\u0645\u0627\u0646)","acc.walletDeposited":"\u06A9\u06CC\u0641 \u067E\u0648\u0644 \u0634\u0627\u0631\u0698 \u0634\u062F","acc.walletNote":"\u0645\u0648\u062C\u0648\u062F\u06CC \u06A9\u06CC\u0641 \u067E\u0648\u0644 \u0641\u0642\u0637 \u0628\u0631\u0627\u06CC \u062E\u0631\u06CC\u062F \u0627\u0632 \u0647\u0645\u06CC\u0646 \u0641\u0631\u0648\u0634\u06AF\u0627\u0647 \u0627\u0633\u062A \u0648 \u0633\u0648\u062F \u06CC\u0627 \u06A9\u0627\u0631\u0645\u0632\u062F\u06CC \u0628\u0647 \u0622\u0646 \u062A\u0639\u0644\u0642 \u0646\u0645\u06CC\u200C\u06AF\u06CC\u0631\u062F.","acc.tx.deposit":"\u0634\u0627\u0631\u0698","acc.tx.purchase":"\u062E\u0631\u06CC\u062F","acc.tx.refund":"\u0628\u0627\u0632\u06AF\u0634\u062A \u0648\u062C\u0647","acc.tx.adjust_in":"\u0627\u0641\u0632\u0627\u06CC\u0634 \u062A\u0648\u0633\u0637 \u0645\u062F\u06CC\u0631","acc.tx.adjust_out":"\u06A9\u0633\u0631 \u062A\u0648\u0633\u0637 \u0645\u062F\u06CC\u0631","acc.plusInactive":"\u0627\u0634\u062A\u0631\u0627\u06A9 \u067E\u0644\u0627\u0633 \u0646\u062F\u0627\u0631\u06CC","acc.plusActive":"\u067E\u0644\u0627\u0633 \u0641\u0639\u0627\u0644 \u062A\u0627 {date}","acc.plusSubscribe":"\u062E\u0631\u06CC\u062F \u0627\u0634\u062A\u0631\u0627\u06A9 \u067E\u0644\u0627\u0633","acc.plusRenew":"\u062A\u0645\u062F\u06CC\u062F \u0627\u0634\u062A\u0631\u0627\u06A9","acc.plusPrice":"{price} \u062A\u0648\u0645\u0627\u0646 \u0628\u0631\u0627\u06CC {days} \u0631\u0648\u0632","acc.plusPerks":"\u0645\u0632\u0627\u06CC\u0627\u06CC \u0627\u0634\u062A\u0631\u0627\u06A9 \u067E\u0644\u0627\u0633","acc.plusSubscribed":"\u0627\u0634\u062A\u0631\u0627\u06A9 \u067E\u0644\u0627\u0633 \u0641\u0639\u0627\u0644 \u0634\u062F","acc.plusPayWallet":"\u067E\u0631\u062F\u0627\u062E\u062A \u0627\u0632 \u06A9\u06CC\u0641 \u067E\u0648\u0644","acc.plusPayGateway":"\u067E\u0631\u062F\u0627\u062E\u062A \u0622\u0646\u0644\u0627\u06CC\u0646","acc.addAddress":"\u0627\u0641\u0632\u0648\u062F\u0646 \u0622\u062F\u0631\u0633","acc.editAddress":"\u0648\u06CC\u0631\u0627\u06CC\u0634 \u0622\u062F\u0631\u0633","acc.addrTitle":"\u0639\u0646\u0648\u0627\u0646 (\u0645\u062B\u0644\u0627\u064B \u062E\u0627\u0646\u0647\u060C \u0645\u062D\u0644 \u06A9\u0627\u0631)","acc.addrReceiver":"\u0646\u0627\u0645 \u06AF\u06CC\u0631\u0646\u062F\u0647","acc.addrPhone":"\u0634\u0645\u0627\u0631\u0647\u200C\u06CC \u062A\u0645\u0627\u0633 \u06AF\u06CC\u0631\u0646\u062F\u0647","acc.addrStreet":"\u0622\u062F\u0631\u0633 \u06A9\u0627\u0645\u0644 \u067E\u0633\u062A\u06CC","acc.addrDefault":"\u0622\u062F\u0631\u0633 \u067E\u06CC\u0634\u200C\u0641\u0631\u0636","acc.addrNote":"\u062A\u0648\u0636\u06CC\u062D\u0627\u062A \u0628\u0631\u0627\u06CC \u067E\u06CC\u06A9","acc.addrSaved":"\u0622\u062F\u0631\u0633 \u0630\u062E\u06CC\u0631\u0647 \u0634\u062F","acc.addrDeleted":"\u0622\u062F\u0631\u0633 \u062D\u0630\u0641 \u0634\u062F","acc.noAddress":"\u0622\u062F\u0631\u0633\u06CC \u062B\u0628\u062A \u0646\u0634\u062F\u0647 \u0627\u0633\u062A","acc.wishlistEmpty":"\u0644\u06CC\u0633\u062A \u0645\u0646 \u062E\u0627\u0644\u06CC \u0627\u0633\u062A","acc.wishlistEmptyText":"\u0631\u0648\u06CC \u0622\u06CC\u06A9\u0648\u0646 \u0642\u0644\u0628 \u0647\u0631 \u06A9\u0627\u0644\u0627 \u0628\u0632\u0646 \u062A\u0627 \u0627\u06CC\u0646\u062C\u0627 \u0630\u062E\u06CC\u0631\u0647 \u0634\u0648\u062F.","acc.notifEmpty":"\u0627\u0639\u0644\u0627\u0646\u06CC \u0646\u062F\u0627\u0631\u06CC","acc.markAllRead":"\u0647\u0645\u0647 \u062E\u0648\u0627\u0646\u062F\u0647 \u0634\u062F","acc.ticketNew":"\u062A\u06CC\u06A9\u062A \u062C\u062F\u06CC\u062F","acc.ticketSubject":"\u0645\u0648\u0636\u0648\u0639","acc.ticketCategory":"\u062F\u0633\u062A\u0647\u200C\u06CC \u062F\u0631\u062E\u0648\u0627\u0633\u062A","acc.ticketPriority":"\u0627\u0648\u0644\u0648\u06CC\u062A","acc.ticketBody":"\u0634\u0631\u062D \u062F\u0631\u062E\u0648\u0627\u0633\u062A","form.rulesRequired":"\u067E\u0630\u06CC\u0631\u0634 \u0642\u0648\u0627\u0646\u06CC\u0646 \u062A\u06CC\u06A9\u062A \u0644\u0627\u0632\u0645 \u0627\u0633\u062A.","form.termsRequired":"\u067E\u0630\u06CC\u0631\u0634 \u0642\u0648\u0627\u0646\u06CC\u0646 \u0648 \u0645\u0642\u0631\u0631\u0627\u062A \u0644\u0627\u0632\u0645 \u0627\u0633\u062A.","page.statsTitle":"\u0622\u0645\u0627\u0631 \u0632\u0646\u062F\u0647\u200C\u06CC \u0641\u0631\u0648\u0634\u06AF\u0627\u0647","page.aboutCta":"\u0628\u06CC\u0627 \u0628\u0628\u06CC\u0646 \u0686\u0647 \u0686\u06CC\u0632\u0647\u0627\u06CC\u06CC \u0628\u0631\u0627\u06CC\u062A \u062F\u0627\u0631\u06CC\u0645","page.stepsTitle":"\u0645\u0631\u0627\u062D\u0644 \u062E\u0631\u06CC\u062F","page.tipsTitle":"\u0646\u06A9\u062A\u0647\u200C\u0647\u0627\u06CC \u062E\u0631\u06CC\u062F","page.hintsTitle":"\u0628\u0631\u0627\u06CC \u06AF\u0632\u0627\u0631\u0634\u06CC \u062F\u0642\u06CC\u0642\u200C\u062A\u0631","page.bugTitle":"\u06AF\u0632\u0627\u0631\u0634 \u062E\u0637\u0627","page.rulesTitle":"\u0642\u0648\u0627\u0646\u06CC\u0646","faq.all":"\u0647\u0645\u0647\u200C\u06CC \u0645\u0648\u0636\u0648\u0639\u0627\u062A","faq.search":"\u062C\u0633\u062A\u200C\u0648\u062C\u0648 \u062F\u0631 \u0633\u0624\u0627\u0644\u0627\u062A\u2026","faq.results":"{n} \u0633\u0624\u0627\u0644","faq.notFound":"\u0633\u0624\u0627\u0644\u06CC \u0628\u0627 \u0627\u06CC\u0646 \u0639\u0628\u0627\u0631\u062A \u067E\u06CC\u062F\u0627 \u0646\u0634\u062F.","faq.askText":"\u0627\u0632 \u067E\u0634\u062A\u06CC\u0628\u0627\u0646\u06CC \u0622\u0646\u0644\u0627\u06CC\u0646 \u0628\u067E\u0631\u0633 \u06CC\u0627 \u062A\u06CC\u06A9\u062A \u0628\u0632\u0646.","faq.cat.orders":"\u0633\u0641\u0627\u0631\u0634 \u0648 \u067E\u06CC\u06AF\u06CC\u0631\u06CC","faq.cat.shipping":"\u0627\u0631\u0633\u0627\u0644 \u0648 \u062A\u062D\u0648\u06CC\u0644","faq.cat.returns":"\u0645\u0631\u062C\u0648\u0639\u06CC \u0648 \u0628\u0627\u0632\u06AF\u0634\u062A \u0648\u062C\u0647","faq.cat.product":"\u06A9\u0627\u0644\u0627 \u0648 \u0627\u0635\u0627\u0644\u062A","faq.cat.account":"\u062D\u0633\u0627\u0628 \u06A9\u0627\u0631\u0628\u0631\u06CC","faq.cat.security":"\u0627\u0645\u0646\u06CC\u062A \u0648 \u067E\u0631\u062F\u0627\u062E\u062A","faq.cat.store":"\u0641\u0631\u0648\u0634\u06AF\u0627\u0647 \u0648 \u062A\u0645\u0627\u0633","faq.cat.other":"\u0633\u0627\u06CC\u0631","acc.ticketCloseConfirm":"\u062A\u06CC\u06A9\u062A \u0628\u0633\u062A\u0647 \u0634\u0648\u062F\u061F \u0628\u0639\u062F\u0627\u064B \u0628\u0627 \u0627\u0631\u0633\u0627\u0644 \u067E\u06CC\u0627\u0645 \u0645\u06CC\u200C\u062A\u0648\u0627\u0646\u06CC \u0628\u0627\u0632\u0634 \u06AF\u0631\u062F\u0627\u0646\u06CC.","acc.ticketClosedNote":"\u0627\u06CC\u0646 \u062A\u06CC\u06A9\u062A \u0628\u0633\u062A\u0647 \u0634\u062F\u0647 \u0627\u0633\u062A. \u0627\u0631\u0633\u0627\u0644 \u067E\u06CC\u0627\u0645 \u062C\u062F\u06CC\u062F\u060C \u0622\u0646 \u0631\u0627 \u062F\u0648\u0628\u0627\u0631\u0647 \u0628\u0627\u0632 \u0645\u06CC\u200C\u06A9\u0646\u062F.","acc.ticketBodyShort":"\u067E\u06CC\u0627\u0645 \u062E\u06CC\u0644\u06CC \u06A9\u0648\u062A\u0627\u0647 \u0627\u0633\u062A.","acc.attachHint":"\u062A\u0627 \u06F4 \u062A\u0635\u0648\u06CC\u0631\u060C \u0647\u0631 \u06A9\u062F\u0627\u0645 \u06A9\u0645\u062A\u0631 \u0627\u0632 \u06F4 \u0645\u06AF\u0627\u0628\u0627\u06CC\u062A.","err.tooLarge":"\u062D\u062C\u0645 \u0641\u0627\u06CC\u0644 \u0628\u06CC\u0634\u062A\u0631 \u0627\u0632 \u06F4 \u0645\u06AF\u0627\u0628\u0627\u06CC\u062A \u0627\u0633\u062A.","acc.ticketRules":"\u0642\u0648\u0627\u0646\u06CC\u0646 \u062A\u06CC\u06A9\u062A \u0631\u0627 \u062E\u0648\u0627\u0646\u062F\u0647\u200C\u0627\u0645 \u0648 \u0645\u06CC\u200C\u067E\u0630\u06CC\u0631\u0645.","acc.ticketViewRules":"\u0645\u0634\u0627\u0647\u062F\u0647\u200C\u06CC \u0642\u0648\u0627\u0646\u06CC\u0646 \u062A\u06CC\u06A9\u062A","acc.ticketCreated":"\u062A\u06CC\u06A9\u062A \u062B\u0628\u062A \u0634\u062F. \u06A9\u062F \u067E\u06CC\u06AF\u06CC\u0631\u06CC: {code}","acc.ticketWrite":"\u067E\u0627\u0633\u062E \u062E\u0648\u062F \u0631\u0627 \u0628\u0646\u0648\u06CC\u0633\u2026","acc.ticketClose":"\u0628\u0633\u062A\u0646 \u062A\u06CC\u06A9\u062A","acc.ticketReopen":"\u0628\u0627\u0632\u06AF\u0634\u0627\u06CC\u06CC","acc.ticketSla":"\u0632\u0645\u0627\u0646 \u067E\u0627\u0633\u062E\u200C\u06AF\u0648\u06CC\u06CC \u062A\u0642\u0631\u06CC\u0628\u06CC: {h} \u0633\u0627\u0639\u062A","acc.noTickets":"\u062A\u06CC\u06A9\u062A\u06CC \u062B\u0628\u062A \u0646\u06A9\u0631\u062F\u0647\u200C\u0627\u06CC","acc.chatTitle":"\u067E\u0634\u062A\u06CC\u0628\u0627\u0646\u06CC \u0622\u0646\u0644\u0627\u06CC\u0646","acc.chatPlaceholder":"\u067E\u06CC\u0627\u0645 \u062E\u0648\u062F \u0631\u0627 \u0628\u0646\u0648\u06CC\u0633\u2026","acc.chatWelcome":"\u0633\u0644\u0627\u0645! \u0633\u0624\u0627\u0644 \u06CC\u0627 \u0645\u0634\u06A9\u0644\u06CC \u062F\u0627\u0631\u06CC\u061F \u0647\u0645\u06CC\u0646\u200C\u062C\u0627 \u0628\u0646\u0648\u06CC\u0633 \u062A\u0627 \u067E\u0627\u0633\u062E \u062F\u0647\u06CC\u0645.","acc.chatOffline":"\u0627\u0644\u0627\u0646 \u062E\u0627\u0631\u062C \u0627\u0632 \u0633\u0627\u0639\u062A \u06A9\u0627\u0631\u06CC \u0647\u0633\u062A\u06CC\u0645\u061B \u067E\u06CC\u0627\u0645 \u0628\u06AF\u0630\u0627\u0631 \u062A\u0627 \u0627\u0648\u0644 \u0648\u0642\u062A \u067E\u0627\u0633\u062E \u062F\u0647\u06CC\u0645\u060C \u06CC\u0627 \u062A\u06CC\u06A9\u062A \u0628\u0632\u0646.","acc.chatOpenTicket":"\u062B\u0628\u062A \u062A\u06CC\u06A9\u062A","acc.reviewEmpty":"\u0646\u0638\u0631 \u06CC\u0627 \u0633\u0624\u0627\u0644\u06CC \u062B\u0628\u062A \u0646\u06A9\u0631\u062F\u0647\u200C\u0627\u06CC","acc.feedbackNew":"\u0627\u0631\u0633\u0627\u0644 \u067E\u06CC\u0634\u0646\u0647\u0627\u062F\u060C \u0634\u06A9\u0627\u06CC\u062A \u06CC\u0627 \u06AF\u0632\u0627\u0631\u0634 \u062E\u0637\u0627","acc.feedbackType":"\u0646\u0648\u0639 \u067E\u06CC\u0627\u0645","acc.feedbackContact":"\u0631\u0627\u0647 \u0627\u0631\u062A\u0628\u0627\u0637\u06CC (\u0627\u06CC\u0645\u06CC\u0644 \u06CC\u0627 \u0645\u0648\u0628\u0627\u06CC\u0644)","acc.feedbackContactHint":"\u062F\u0631 \u0635\u0648\u0631\u062A \u062B\u0628\u062A\u060C \u0646\u062A\u06CC\u062C\u0647 \u0631\u0627 \u0628\u0647 \u0627\u0637\u0644\u0627\u0639 \u062A\u0648 \u0645\u06CC\u200C\u0631\u0633\u0627\u0646\u06CC\u0645.","acc.feedbackSent":"\u067E\u06CC\u0627\u0645 \u062A\u0648 \u062B\u0628\u062A \u0634\u062F. \u0645\u0645\u0646\u0648\u0646 \u06A9\u0647 \u0628\u0647 \u0628\u0647\u062A\u0631 \u0634\u062F\u0646 \u0633\u0627\u06CC\u062A \u06A9\u0645\u06A9 \u0645\u06CC\u200C\u06A9\u0646\u06CC.","acc.noFeedback":"\u067E\u06CC\u0627\u0645\u06CC \u0627\u0631\u0633\u0627\u0644 \u0646\u06A9\u0631\u062F\u0647\u200C\u0627\u06CC","acc.profileSaved":"\u067E\u0631\u0648\u0641\u0627\u06CC\u0644 \u0630\u062E\u06CC\u0631\u0647 \u0634\u062F","acc.passwordChange":"\u062A\u063A\u06CC\u06CC\u0631 \u0631\u0645\u0632 \u0639\u0628\u0648\u0631","acc.currentPassword":"\u0631\u0645\u0632 \u0639\u0628\u0648\u0631 \u0641\u0639\u0644\u06CC","acc.newPassword2":"\u0631\u0645\u0632 \u0639\u0628\u0648\u0631 \u062C\u062F\u06CC\u062F","acc.passwordChanged":"\u0631\u0645\u0632 \u0639\u0628\u0648\u0631 \u062A\u063A\u06CC\u06CC\u0631 \u06A9\u0631\u062F","acc.2faSection":"\u0648\u0631\u0648\u062F \u062F\u0648\u0645\u0631\u062D\u0644\u0647\u200C\u0627\u06CC (2FA)","acc.2faOff":"\u063A\u06CC\u0631\u0641\u0639\u0627\u0644 \u2014 \u0628\u0631\u0627\u06CC \u0627\u0645\u0646\u06CC\u062A \u0628\u06CC\u0634\u062A\u0631 \u0631\u0648\u0634\u0646\u0634 \u06A9\u0646.","acc.2faOn":"\u0641\u0639\u0627\u0644","acc.2faEnable":"\u0641\u0639\u0627\u0644\u200C\u0633\u0627\u0632\u06CC \u0648\u0631\u0648\u062F \u062F\u0648\u0645\u0631\u062D\u0644\u0647\u200C\u0627\u06CC","acc.2faDisable":"\u063A\u06CC\u0631\u0641\u0639\u0627\u0644\u200C\u0633\u0627\u0632\u06CC","acc.2faScan":"\u0627\u06CC\u0646 \u06A9\u062F QR \u0631\u0627 \u0628\u0627 \u0627\u067E \u0627\u062D\u0631\u0627\u0632 \u0647\u0648\u06CC\u062A (\u0645\u062B\u0644 Google Authenticator) \u0627\u0633\u06A9\u0646 \u06A9\u0646 \u06CC\u0627 \u06A9\u0644\u06CC\u062F \u0631\u0627 \u062F\u0633\u062A\u06CC \u0648\u0627\u0631\u062F \u06A9\u0646.","acc.2faKey":"\u06A9\u0644\u06CC\u062F \u062F\u0633\u062A\u06CC","acc.2faEnterCode":"\u06A9\u062F \u06F6 \u0631\u0642\u0645\u06CC \u0627\u067E \u0631\u0627 \u0648\u0627\u0631\u062F \u06A9\u0646 \u062A\u0627 \u0641\u0639\u0627\u0644 \u0634\u0648\u062F","acc.2faEnabled":"\u0648\u0631\u0648\u062F \u062F\u0648\u0645\u0631\u062D\u0644\u0647\u200C\u0627\u06CC \u0641\u0639\u0627\u0644 \u0634\u062F","acc.2faDisabled":"\u0648\u0631\u0648\u062F \u062F\u0648\u0645\u0631\u062D\u0644\u0647\u200C\u0627\u06CC \u063A\u06CC\u0631\u0641\u0639\u0627\u0644 \u0634\u062F","acc.2faBackup":"\u06A9\u062F\u0647\u0627\u06CC \u067E\u0634\u062A\u06CC\u0628\u0627\u0646 (\u0646\u06AF\u0647\u0634\u0627\u0646 \u062F\u0627\u0631)","acc.2faBackupHint":"\u0627\u06AF\u0631 \u062F\u0633\u062A\u0631\u0633\u06CC \u0628\u0647 \u0627\u067E \u0631\u0627 \u0627\u0632 \u062F\u0633\u062A \u062F\u0627\u062F\u06CC\u060C \u0628\u0627 \u0627\u06CC\u0646 \u06A9\u062F\u0647\u0627 \u0648\u0627\u0631\u062F \u0634\u0648. \u0647\u0631 \u06A9\u062F \u0641\u0642\u0637 \u06CC\u06A9\u200C\u0628\u0627\u0631 \u0645\u0635\u0631\u0641 \u0627\u0633\u062A.","acc.2faMethods":"\u0631\u0648\u0634\u200C\u0647\u0627\u06CC \u062A\u0623\u06CC\u06CC\u062F","acc.sessionsText":"\u062F\u0633\u062A\u06AF\u0627\u0647\u200C\u0647\u0627\u06CC\u06CC \u06A9\u0647 \u0627\u06A9\u0646\u0648\u0646 \u0628\u0647 \u062D\u0633\u0627\u0628 \u062A\u0648 \u0648\u0627\u0631\u062F \u0647\u0633\u062A\u0646\u062F.","acc.revokeAll":"\u062E\u0631\u0648\u062C \u0627\u0632 \u0647\u0645\u0647\u200C\u06CC \u062F\u0633\u062A\u06AF\u0627\u0647\u200C\u0647\u0627","acc.revokeDone":"\u0646\u0634\u0633\u062A\u200C\u0647\u0627 \u0628\u0633\u062A\u0647 \u0634\u062F\u0646\u062F","acc.current":"\u0647\u0645\u06CC\u0646 \u062F\u0633\u062A\u06AF\u0627\u0647","acc.prefsText":"\u0627\u06CC\u0646 \u062A\u0646\u0638\u06CC\u0645\u0627\u062A \u0641\u0642\u0637 \u0631\u0648\u06CC \u0647\u0645\u06CC\u0646 \u062F\u0633\u062A\u06AF\u0627\u0647 \u0627\u0639\u0645\u0627\u0644 \u0645\u06CC\u200C\u0634\u0648\u062F.","acc.prefTheme":"\u067E\u0648\u0633\u062A\u0647","acc.prefLang":"\u0632\u0628\u0627\u0646","acc.prefDensity":"\u062A\u0631\u0627\u06A9\u0645 \u0646\u0645\u0627\u06CC\u0634","acc.prefMotion":"\u0627\u0646\u06CC\u0645\u06CC\u0634\u0646\u200C\u0647\u0627","acc.prefNotif":"\u0627\u0639\u0644\u0627\u0646\u200C\u0647\u0627","acc.notifMarketing":"\u062A\u062E\u0641\u06CC\u0641\u200C\u0647\u0627 \u0648 \u067E\u06CC\u0634\u0646\u0647\u0627\u062F\u0647\u0627","acc.notifOrders":"\u0648\u0636\u0639\u06CC\u062A \u0633\u0641\u0627\u0631\u0634\u200C\u0647\u0627","acc.notifRestock":"\u0645\u0648\u062C\u0648\u062F \u0634\u062F\u0646 \u06A9\u0627\u0644\u0627\u0647\u0627\u06CC \u0644\u06CC\u0633\u062A \u0645\u0646","acc.notifSupport":"\u067E\u0634\u062A\u06CC\u0628\u0627\u0646\u06CC \u0648 \u067E\u0627\u0633\u062E \u062A\u06CC\u06A9\u062A\u200C\u0647\u0627","acc.exportData":"\u062F\u0631\u06CC\u0627\u0641\u062A \u062F\u0627\u062F\u0647\u200C\u0647\u0627\u06CC \u0645\u0646","acc.exportHint":"\u0647\u0645\u0647\u200C\u06CC \u0627\u0637\u0644\u0627\u0639\u0627\u062A \u062D\u0633\u0627\u0628\u060C \u0633\u0641\u0627\u0631\u0634\u200C\u0647\u0627\u060C \u0646\u0638\u0631\u0627\u062A \u0648 \u062A\u06CC\u06A9\u062A\u200C\u0647\u0627 \u0631\u0627 \u0628\u0647\u200C\u0635\u0648\u0631\u062A JSON \u062F\u0627\u0646\u0644\u0648\u062F \u06A9\u0646.","acc.deleteAccount":"\u062D\u0630\u0641 \u062D\u0633\u0627\u0628 \u06A9\u0627\u0631\u0628\u0631\u06CC","acc.deleteWarn":"\u0628\u0627 \u062D\u0630\u0641 \u062D\u0633\u0627\u0628\u060C \u062F\u0627\u062F\u0647\u200C\u0647\u0627\u06CC \u0634\u062E\u0635\u06CC \u067E\u0627\u06A9 \u0645\u06CC\u200C\u0634\u0648\u062F\u061B \u0633\u0648\u0627\u0628\u062F \u0645\u0627\u0644\u06CC \u0633\u0641\u0627\u0631\u0634\u200C\u0647\u0627 \u0637\u0628\u0642 \u0642\u0627\u0646\u0648\u0646 \u0646\u06AF\u0647 \u062F\u0627\u0634\u062A\u0647 \u0645\u06CC\u200C\u0634\u0648\u062F.","acc.deleteConfirm":"\u0628\u0631\u0627\u06CC \u062D\u0630\u0641 \u062D\u0633\u0627\u0628\u060C \u0631\u0645\u0632 \u0639\u0628\u0648\u0631 \u0631\u0627 \u0648\u0627\u0631\u062F \u06A9\u0646","acc.pointsText":"\u0628\u0647 \u0627\u0632\u0627\u06CC \u0647\u0631 \u06F1\u06F0\u06F0\u066C\u06F0\u06F0\u06F0 \u062A\u0648\u0645\u0627\u0646 \u062E\u0631\u06CC\u062F\u060C \u06F1 \u0627\u0645\u062A\u06CC\u0627\u0632 \u0645\u06CC\u200C\u06AF\u06CC\u0631\u06CC.","acc.referralCode":"\u06A9\u062F \u0645\u0639\u0631\u0641 \u062A\u0648","acc.referralText":"\u0627\u06CC\u0646 \u06A9\u062F \u0631\u0627 \u0628\u0647 \u0627\u0634\u062A\u0631\u0627\u06A9 \u0628\u06AF\u0630\u0627\u0631\u061B \u0647\u0631 \u062F\u0648 \u06F5\u06F0 \u0627\u0645\u062A\u06CC\u0627\u0632 \u0645\u06CC\u200C\u06AF\u06CC\u0631\u06CC\u062F.","chat.title":"\u067E\u0634\u062A\u06CC\u0628\u0627\u0646\u06CC \u0622\u0646\u0644\u0627\u06CC\u0646 \u06CC\u0627\u0633\u0627\u06CC\u06CC","chat.online":"\u0645\u0639\u0645\u0648\u0644\u0627\u064B \u062F\u0631 \u0686\u0646\u062F \u062F\u0642\u06CC\u0642\u0647 \u067E\u0627\u0633\u062E \u0645\u06CC\u200C\u062F\u0647\u06CC\u0645","chat.open":"\u0634\u0631\u0648\u0639 \u06AF\u0641\u062A\u200C\u0648\u06AF\u0648","chat.minimize":"\u0628\u0633\u062A\u0646","chat.loginFirst":"\u0628\u0631\u0627\u06CC \u06AF\u0641\u062A\u200C\u0648\u06AF\u0648 \u0628\u0627 \u067E\u0634\u062A\u06CC\u0628\u0627\u0646\u06CC \u0648\u0627\u0631\u062F \u062D\u0633\u0627\u0628 \u0634\u0648.","chat.sent":"\u067E\u06CC\u0627\u0645 \u0627\u0631\u0633\u0627\u0644 \u0634\u062F","chat.typing":"\u067E\u0634\u062A\u06CC\u0628\u0627\u0646\u06CC \u062F\u0631 \u062D\u0627\u0644 \u0646\u0648\u0634\u062A\u0646\u2026","chat.quick":"\u0633\u0624\u0627\u0644\u0627\u062A \u067E\u0631\u062A\u06A9\u0631\u0627\u0631","notif.new":"\u0627\u0639\u0644\u0627\u0646 \u062C\u062F\u06CC\u062F","notif.markRead":"\u062E\u0648\u0627\u0646\u062F\u0647 \u0634\u062F","notif.viewAll":"\u0645\u0634\u0627\u0647\u062F\u0647\u200C\u06CC \u0647\u0645\u0647\u200C\u06CC \u0627\u0639\u0644\u0627\u0646\u200C\u0647\u0627","notif.empty":"\u0627\u0639\u0644\u0627\u0646\u06CC \u0646\u062F\u0627\u0631\u06CC","notif.type.announcement":"\u0627\u0637\u0644\u0627\u0639\u06CC\u0647","notif.type.order":"\u0633\u0641\u0627\u0631\u0634","notif.type.restock":"\u0645\u0648\u062C\u0648\u062F \u0634\u062F\u0646 \u06A9\u0627\u0644\u0627","notif.type.ticket":"\u062A\u06CC\u06A9\u062A","notif.type.support":"\u067E\u0634\u062A\u06CC\u0628\u0627\u0646\u06CC","notif.type.review":"\u0646\u0638\u0631","notif.type.plus":"\u0627\u0634\u062A\u0631\u0627\u06A9 \u067E\u0644\u0627\u0633","notif.type.wallet":"\u06A9\u06CC\u0641 \u067E\u0648\u0644","notif.type.account":"\u062D\u0633\u0627\u0628 \u06A9\u0627\u0631\u0628\u0631\u06CC","notif.type.feedback":"\u0628\u0627\u0632\u062E\u0648\u0631\u062F","notif.type.admin_alert":"\u0647\u0634\u062F\u0627\u0631 \u0645\u062F\u06CC\u0631","notif.type.news":"\u062E\u0628\u0631","notif.type.offer":"\u067E\u06CC\u0634\u0646\u0647\u0627\u062F \u0648\u06CC\u0698\u0647","notif.type.system":"\u0633\u0627\u0645\u0627\u0646\u0647","notif.type.info":"\u0627\u0637\u0644\u0627\u0639\u200C\u0631\u0633\u0627\u0646\u06CC","notif.type.welcome":"\u062E\u0648\u0634\u200C\u0622\u0645\u062F\u06AF\u0648\u06CC\u06CC","consent.title":"\u0628\u0647 \u06CC\u0627\u0633\u0627\u06CC\u06CC \u062E\u0648\u0634 \u0622\u0645\u062F\u06CC","consent.text":"\u0644\u0637\u0641\u0627\u064B \u067E\u06CC\u0634 \u0627\u0632 \u0627\u062F\u0627\u0645\u0647\u060C \u0645\u0648\u0627\u0631\u062F \u0632\u06CC\u0631 \u0631\u0627 \u0628\u062E\u0648\u0627\u0646 \u0648 \u0628\u067E\u0630\u06CC\u0631. \u0645\u0627 \u0627\u0632 \u062D\u0627\u0641\u0638\u0647\u200C\u06CC \u0645\u0631\u0648\u0631\u06AF\u0631 \u0628\u0631\u0627\u06CC \u0628\u0647\u062A\u0631 \u06A9\u0631\u062F\u0646 \u062A\u062C\u0631\u0628\u0647\u200C\u06CC \u062E\u0631\u06CC\u062F \u0627\u0633\u062A\u0641\u0627\u062F\u0647 \u0645\u06CC\u200C\u06A9\u0646\u06CC\u0645 \u0648 \u0637\u0628\u0642 \u062D\u0631\u06CC\u0645 \u062E\u0635\u0648\u0635\u06CC\u060C \u0645\u0631\u0627\u0642\u0628 \u062F\u0627\u062F\u0647\u200C\u0647\u0627\u06CC \u0634\u062E\u0635\u06CC \u062A\u0648 \u0647\u0633\u062A\u06CC\u0645.","consent.terms":"\u0642\u0648\u0627\u0646\u06CC\u0646 \u0648 \u0645\u0642\u0631\u0631\u0627\u062A \u0631\u0627 \u062E\u0648\u0627\u0646\u062F\u0647\u200C\u0627\u0645 \u0648 \u0645\u06CC\u200C\u067E\u0630\u06CC\u0631\u0645.","consent.privacy":"\u062D\u0631\u06CC\u0645 \u062E\u0635\u0648\u0635\u06CC \u0631\u0627 \u0645\u06CC\u200C\u067E\u0630\u06CC\u0631\u0645.","consent.marketing":"\u062F\u0648\u0633\u062A \u062F\u0627\u0631\u0645 \u0627\u0632 \u062A\u062E\u0641\u06CC\u0641\u200C\u0647\u0627 \u0648 \u06A9\u0627\u0644\u0627\u0647\u0627\u06CC \u062C\u062F\u06CC\u062F \u0628\u0627\u062E\u0628\u0631 \u0634\u0648\u0645 (\u0627\u062E\u062A\u06CC\u0627\u0631\u06CC).","consent.accept":"\u0645\u06CC\u200C\u067E\u0630\u06CC\u0631\u0645 \u0648 \u0648\u0627\u0631\u062F \u0633\u0627\u06CC\u062A \u0645\u06CC\u200C\u0634\u0648\u0645","consent.readTerms":"\u062E\u0648\u0627\u0646\u062F\u0646 \u0642\u0648\u0627\u0646\u06CC\u0646","consent.readPrivacy":"\u062E\u0648\u0627\u0646\u062F\u0646 \u062D\u0631\u06CC\u0645 \u062E\u0635\u0648\u0635\u06CC","consent.thanks":"\u0645\u0645\u0646\u0648\u0646! \u067E\u0630\u06CC\u0631\u0634 \u062A\u0648 \u062B\u0628\u062A \u0634\u062F.","consent.manage":"\u0645\u062F\u06CC\u0631\u06CC\u062A \u062A\u0648\u0627\u0641\u0642 \u06A9\u0648\u06A9\u06CC \u0648 \u062D\u0631\u06CC\u0645 \u062E\u0635\u0648\u0635\u06CC","social.instagram":"\u0627\u06CC\u0646\u0633\u062A\u0627\u06AF\u0631\u0627\u0645","home.partnersTitle":"\u0628\u0631\u0646\u062F\u0647\u0627\u06CC\u06CC \u06A9\u0647 \u0628\u0627 \u0622\u0646\u200C\u0647\u0627 \u06A9\u0627\u0631 \u0645\u06CC\u200C\u06A9\u0646\u06CC\u0645","stats.subtitle":"\u0639\u062F\u062F\u0647\u0627\u06CC \u0648\u0627\u0642\u0639\u06CC \u0641\u0631\u0648\u0634\u06AF\u0627\u0647\u060C \u0628\u0647\u200C\u0631\u0648\u0632 \u0648 \u0628\u062F\u0648\u0646 \u067E\u0631\u062F\u0647.","stats.chartHint":"\u0627\u0631\u062A\u0641\u0627\u0639 \u0647\u0631 \u0633\u062A\u0648\u0646 \u06CC\u0639\u0646\u06CC \u062A\u0639\u062F\u0627\u062F \u0628\u0627\u0632\u062F\u06CC\u062F \u0647\u0645\u0627\u0646 \u0631\u0648\u0632.","stats.topTitle":"\u067E\u0631\u0641\u0631\u0648\u0634\u200C\u0647\u0627\u06CC \u0627\u062E\u06CC\u0631","adm.sPartners":"\u0628\u0631\u0646\u062F\u0647\u0627 \u0648 \u0634\u0631\u06A9\u0627","adm.ptFa":"\u0646\u0627\u0645 \u0641\u0627\u0631\u0633\u06CC","adm.ptEn":"Name (EN)","adm.ptAdd":"\u0627\u0641\u0632\u0648\u062F\u0646 \u0628\u0631\u0646\u062F","adm.ptHint":"\u0627\u06CC\u0646 \u0646\u0627\u0645\u200C\u0647\u0627 \u0628\u0647\u200C\u0635\u0648\u0631\u062A \u0646\u0648\u0627\u0631 \u0645\u062A\u062D\u0631\u06A9 \u062F\u0631 \u0635\u0641\u062D\u0647\u0654 \u0627\u0635\u0644\u06CC \u0646\u0645\u0627\u06CC\u0634 \u062F\u0627\u062F\u0647 \u0645\u06CC\u200C\u0634\u0648\u0646\u062F\u061B \u062A\u0631\u062A\u06CC\u0628 \u0631\u0627 \u062E\u0648\u062F\u062A \u0628\u0686\u06CC\u0646.","feat.partners":"\u0646\u0648\u0627\u0631 \u0628\u0631\u0646\u062F\u0647\u0627\u06CC \u0647\u0645\u06A9\u0627\u0631","auth.pwdLater":"\u0628\u0639\u062F\u0627\u064B \u062A\u063A\u06CC\u06CC\u0631 \u0645\u06CC\u200C\u062F\u0647\u0645","auth.pwdLaterToast":"\u0628\u0627\u0634\u0647\u061B \u0647\u0631 \u0648\u0642\u062A \u062E\u0648\u0627\u0633\u062A\u06CC \u0627\u0632 \xAB\u062D\u0633\u0627\u0628 \u0645\u0646 \u2192 \u062A\u063A\u06CC\u06CC\u0631 \u0631\u0645\u0632 \u0639\u0628\u0648\u0631\xBB \u0627\u0646\u062C\u0627\u0645\u0634 \u0628\u062F\u0647.","social.telegram":"\u062A\u0644\u06AF\u0631\u0627\u0645","social.eitaa":"\u0627\u06CC\u062A\u0627","social.whatsapp":"\u0648\u0627\u062A\u0633\u0627\u067E","consent.rejectOptional":"\u067E\u0630\u06CC\u0631\u0634 \u0641\u0642\u0637 \u0645\u0648\u0627\u0631\u062F \u0636\u0631\u0648\u0631\u06CC","consent.ttlNote":"\u0627\u0646\u062A\u062E\u0627\u0628 \u062A\u0648 \u062A\u0627 \u06F1\u06F8\u06F0 \u0631\u0648\u0632 \u0645\u0639\u062A\u0628\u0631 \u0627\u0633\u062A \u0648 \u067E\u0633 \u0627\u0632 \u0622\u0646 \u062F\u0648\u0628\u0627\u0631\u0647 \u067E\u0631\u0633\u06CC\u062F\u0647 \u0645\u06CC\u200C\u0634\u0648\u062F.","contact.title":"\u062A\u0645\u0627\u0633 \u0628\u0627 \u0645\u0627","contact.mapTitle":"\u06A9\u0631\u0648\u06A9\u06CC \u0645\u062D\u0644 \u0641\u0631\u0648\u0634\u06AF\u0627\u0647","contact.mapHint":"\u0628\u0631\u0627\u06CC \u0628\u0627\u0632 \u0634\u062F\u0646 \u062F\u0631 \u0628\u0631\u0646\u0627\u0645\u0647\u200C\u06CC \u0646\u0642\u0634\u0647 \u06A9\u0644\u06CC\u06A9 \u06A9\u0646","contact.mapAsk":"\u06A9\u062F\u0627\u0645 \u0646\u0642\u0634\u0647 \u0628\u0627\u0632 \u0634\u0648\u062F\u061F","contact.mapPermission":"\u0627\u06AF\u0631 \u0627\u062C\u0627\u0632\u0647\u200C\u06CC \u0645\u0648\u0642\u0639\u06CC\u062A \u0628\u062F\u0647\u06CC\u060C \u0645\u0633\u06CC\u0631 \u062D\u0631\u06A9\u062A \u0627\u0632 \u062C\u0627\u06CC \u0641\u0639\u0644\u06CC\u200C\u0627\u062A \u062A\u0627 \u0645\u063A\u0627\u0632\u0647 \u0631\u0627 \u0646\u0634\u0627\u0646 \u0645\u06CC\u200C\u062F\u0647\u06CC\u0645.","contact.allowLocation":"\u0627\u062C\u0627\u0632\u0647\u200C\u06CC \u062F\u0633\u062A\u0631\u0633\u06CC \u0628\u0647 \u0645\u0648\u0642\u0639\u06CC\u062A","contact.denyLocation":"\u0627\u062F\u0627\u0645\u0647 \u0628\u062F\u0648\u0646 \u0645\u0648\u0642\u0639\u06CC\u062A","contact.openMaps":"\u0628\u0627\u0632 \u06A9\u0631\u062F\u0646 \u062F\u0631 \u0646\u0642\u0634\u0647","contact.copyAddress":"\u06A9\u067E\u06CC \u0622\u062F\u0631\u0633","contact.hours":"\u0633\u0627\u0639\u062A \u06A9\u0627\u0631\u06CC","contact.phone":"\u062A\u0644\u0641\u0646 \u0641\u0631\u0648\u0634\u06AF\u0627\u0647","contact.mobile":"\u0645\u0648\u0628\u0627\u06CC\u0644 \u0648 \u0648\u0627\u062A\u0633\u0627\u067E","contact.emailUs":"\u0627\u06CC\u0645\u06CC\u0644","contact.addressUs":"\u0622\u062F\u0631\u0633","contact.callNow":"\u062A\u0645\u0627\u0633 \u0628\u06AF\u06CC\u0631","contact.whatsapp":"\u067E\u06CC\u0627\u0645 \u062F\u0631 \u0648\u0627\u062A\u0633\u0627\u067E","contact.locationOn":"\u0645\u0648\u0642\u0639\u06CC\u062A \u062A\u0642\u0631\u06CC\u0628\u06CC \u062A\u0648 \u067E\u06CC\u062F\u0627 \u0634\u062F","contact.locationDenied":"\u062F\u0633\u062A\u0631\u0633\u06CC \u0628\u0647 \u0645\u0648\u0642\u0639\u06CC\u062A \u062F\u0627\u062F\u0647 \u0646\u0634\u062F\u061B \u0646\u0642\u0634\u0647 \u0628\u062F\u0648\u0646 \u0645\u0628\u062F\u0623 \u0628\u0627\u0632 \u0645\u06CC\u200C\u0634\u0648\u062F.","contact.formTitle":"\u0627\u0631\u0633\u0627\u0644 \u067E\u06CC\u0627\u0645 \u0633\u0631\u06CC\u0639","contact.formText":"\u062A\u0645\u0627\u0633 \u06AF\u0631\u0641\u062A\u0646 \u0631\u0627 \u062F\u0648\u0633\u062A \u0646\u062F\u0627\u0631\u06CC\u061F \u067E\u06CC\u0627\u0645 \u0628\u06AF\u0630\u0627\u0631 \u06CC\u0627 \u062A\u06CC\u06A9\u062A \u0628\u0632\u0646.","contact.neshan":"\u0646\u0634\u0627\u0646","contact.balad":"\u0628\u0644\u062F","contact.google":"\u06AF\u0648\u06AF\u0644 \u0645\u067E","contact.osm":"\u0627\u0648\u067E\u0646\u200C\u0627\u0633\u062A\u0631\u06CC\u062A\u200C\u0645\u067E","contact.tgBotTitle":"\u0631\u0628\u0627\u062A \u067E\u0634\u062A\u06CC\u0628\u0627\u0646\u06CC \u062A\u0644\u06AF\u0631\u0627\u0645","contact.tgBotText":"\u067E\u06CC\u06AF\u06CC\u0631\u06CC \u0633\u0641\u0627\u0631\u0634\u060C \u062C\u0633\u062A\u062C\u0648\u06CC \u06A9\u0627\u0644\u0627 \u0648 \u06AF\u0641\u062A\u200C\u0648\u06AF\u0648 \u0628\u0627 \u067E\u0634\u062A\u06CC\u0628\u0627\u0646\u06CC \u2014 \u0634\u0628\u0627\u0646\u0647\u200C\u0631\u0648\u0632 \u062F\u0631 \u062A\u0644\u06AF\u0631\u0627\u0645. \u06A9\u0627\u0641\u06CC \u0627\u0633\u062A /start \u0628\u0632\u0646\u06CC.","contact.tgBotBtn":"\u0628\u0627\u0632 \u06A9\u0631\u062F\u0646 \u0631\u0628\u0627\u062A \u062F\u0631 \u062A\u0644\u06AF\u0631\u0627\u0645","compare.title":"\u0645\u0642\u0627\u06CC\u0633\u0647\u200C\u06CC \u06A9\u0627\u0644\u0627\u0647\u0627","compare.empty":"\u06A9\u0627\u0644\u0627\u06CC\u06CC \u0628\u0631\u0627\u06CC \u0645\u0642\u0627\u06CC\u0633\u0647 \u0627\u0646\u062A\u062E\u0627\u0628 \u0646\u0634\u062F\u0647","compare.emptyText":"\u0627\u0632 \u062F\u06A9\u0645\u0647\u200C\u06CC \u0645\u0642\u0627\u06CC\u0633\u0647 \u0631\u0648\u06CC \u06A9\u0627\u0631\u062A \u06A9\u0627\u0644\u0627 \u0627\u0633\u062A\u0641\u0627\u062F\u0647 \u06A9\u0646 (\u062A\u0627 \u06F4 \u06A9\u0627\u0644\u0627).","compare.add":"\u0627\u0641\u0632\u0648\u062F\u0646 \u0628\u0647 \u0645\u0642\u0627\u06CC\u0633\u0647","compare.remove":"\u062D\u0630\u0641","priceCheck.title":"\u0627\u0633\u062A\u0639\u0644\u0627\u0645 \u0642\u06CC\u0645\u062A \u0628\u0627 \u0628\u0627\u0631\u06A9\u062F","priceCheck.sub":"\u0628\u0627\u0631\u06A9\u062F \u0631\u0627 \u0628\u0627 \u062F\u0633\u062A\u06AF\u0627\u0647 \u0627\u0633\u06A9\u0646 \u06A9\u0646 \u06CC\u0627 \u062F\u0633\u062A\u06CC \u0648\u0627\u0631\u062F \u06A9\u0646.","priceCheck.input":"\u0628\u0627\u0631\u06A9\u062F \u06CC\u0627 \u06A9\u062F \u06A9\u0627\u0644\u0627","priceCheck.scanCamera":"\u0627\u0633\u06A9\u0646 \u0628\u0627 \u062F\u0648\u0631\u0628\u06CC\u0646","priceCheck.stopCamera":"\u062A\u0648\u0642\u0641 \u062F\u0648\u0631\u0628\u06CC\u0646","priceCheck.waiting":"\u062F\u0631 \u0627\u0646\u062A\u0638\u0627\u0631 \u0627\u0633\u06A9\u0646\u2026","priceCheck.notFound":"\u06A9\u0627\u0644\u0627\u06CC\u06CC \u0628\u0627 \u0627\u06CC\u0646 \u0628\u0627\u0631\u06A9\u062F \u067E\u06CC\u062F\u0627 \u0646\u0634\u062F","priceCheck.found":"\u06A9\u0627\u0644\u0627 \u067E\u06CC\u062F\u0627 \u0634\u062F","priceCheck.cameraUnsupported":"\u062F\u0648\u0631\u0628\u06CC\u0646 \u062F\u0631 \u062F\u0633\u062A\u0631\u0633 \u0646\u06CC\u0633\u062A. \u0627\u0632 \u062F\u0633\u062A\u06AF\u0627\u0647 \u0628\u0627\u0631\u06A9\u062F\u062E\u0648\u0627\u0646 \u06CC\u0627 \u0648\u0631\u0648\u062F \u062F\u0633\u062A\u06CC \u0627\u0633\u062A\u0641\u0627\u062F\u0647 \u06A9\u0646.","priceCheck.cameraDenied":"\u062F\u0633\u062A\u0631\u0633\u06CC \u0628\u0647 \u062F\u0648\u0631\u0628\u06CC\u0646 \u062F\u0627\u062F\u0647 \u0646\u0634\u062F.","priceCheck.deviceMode":"\u062D\u0627\u0644\u062A \u06A9\u06CC\u0648\u0633\u06A9 (\u062A\u0645\u0627\u0645\u200C\u0635\u0641\u062D\u0647)","priceCheck.lastScan":"\u0622\u062E\u0631\u06CC\u0646 \u0627\u0633\u06A9\u0646","priceCheck.fullscreen":"\u062A\u0645\u0627\u0645\u200C\u0635\u0641\u062D\u0647","err.generic":"\u0645\u0634\u06A9\u0644\u06CC \u067E\u06CC\u0634 \u0622\u0645\u062F. \u062F\u0648\u0628\u0627\u0631\u0647 \u062A\u0644\u0627\u0634 \u06A9\u0646.","err.network":"\u0627\u062A\u0635\u0627\u0644 \u0628\u0647 \u0633\u0631\u0648\u0631 \u0628\u0631\u0642\u0631\u0627\u0631 \u0646\u0634\u062F.","err.notFound":"\u0635\u0641\u062D\u0647 \u067E\u06CC\u062F\u0627 \u0646\u0634\u062F","err.notFoundText":"\u0645\u0645\u06A9\u0646 \u0627\u0633\u062A \u0646\u0634\u0627\u0646\u06CC \u0627\u0634\u062A\u0628\u0627\u0647 \u0628\u0627\u0634\u062F \u06CC\u0627 \u0635\u0641\u062D\u0647 \u062D\u0630\u0641 \u0634\u062F\u0647 \u0628\u0627\u0634\u062F.","err.goHome":"\u0628\u0631\u0648 \u0628\u0647 \u0635\u0641\u062D\u0647\u200C\u06CC \u0627\u0635\u0644\u06CC","err.offline":"\u0622\u0641\u0644\u0627\u06CC\u0646 \u0647\u0633\u062A\u06CC. \u062F\u0627\u062F\u0647\u200C\u0647\u0627\u06CC \u0630\u062E\u06CC\u0631\u0647\u200C\u0634\u062F\u0647 \u0646\u0645\u0627\u06CC\u0634 \u062F\u0627\u062F\u0647 \u0645\u06CC\u200C\u0634\u0648\u062F.","err.online":"\u062F\u0648\u0628\u0627\u0631\u0647 \u0622\u0646\u0644\u0627\u06CC\u0646 \u0634\u062F\u06CC","err.loginRequired":"\u0628\u0631\u0627\u06CC \u062F\u06CC\u062F\u0646 \u0627\u06CC\u0646 \u0628\u062E\u0634 \u0628\u0627\u06CC\u062F \u0648\u0627\u0631\u062F \u062D\u0633\u0627\u0628 \u0634\u0648\u06CC.","err.forbidden":"\u0628\u0647 \u0627\u06CC\u0646 \u0628\u062E\u0634 \u062F\u0633\u062A\u0631\u0633\u06CC \u0646\u062F\u0627\u0631\u06CC.","adm.title":"\u067E\u0646\u0644 \u0645\u062F\u06CC\u0631\u06CC\u062A","adm.dashboard":"\u062F\u0627\u0634\u0628\u0648\u0631\u062F","adm.products":"\u06A9\u0627\u0644\u0627\u0647\u0627","adm.productNew":"\u0627\u0641\u0632\u0648\u062F\u0646 \u06A9\u0627\u0644\u0627","adm.productEdit":"\u0648\u06CC\u0631\u0627\u06CC\u0634 \u06A9\u0627\u0644\u0627","adm.categories":"\u062F\u0633\u062A\u0647\u200C\u0647\u0627 \u0648 \u0628\u0631\u0646\u062F\u0647\u0627","adm.orders":"\u0633\u0641\u0627\u0631\u0634\u200C\u0647\u0627","adm.reviews":"\u0646\u0638\u0631\u0627\u062A \u0648 \u0633\u0624\u0627\u0644\u0627\u062A","adm.tickets":"\u062A\u06CC\u06A9\u062A\u200C\u0647\u0627","adm.supportChat":"\u0686\u062A \u067E\u0634\u062A\u06CC\u0628\u0627\u0646\u06CC","adm.feedback":"\u0628\u0627\u0632\u062E\u0648\u0631\u062F\u0647\u0627 \u0648 \u062E\u0637\u0627\u0647\u0627","adm.users":"\u06A9\u0627\u0631\u0628\u0631\u0627\u0646 \u0648 \u062F\u0633\u062A\u0631\u0633\u06CC\u200C\u0647\u0627","adm.wallet":"\u06A9\u06CC\u0641 \u067E\u0648\u0644 \u06A9\u0627\u0631\u0628\u0631\u0627\u0646","adm.coupons":"\u06A9\u062F\u0647\u0627\u06CC \u062A\u062E\u0641\u06CC\u0641","adm.ads":"\u062A\u0628\u0644\u06CC\u063A\u0627\u062A","adm.notifications":"\u0627\u0639\u0644\u0627\u0646\u200C\u0647\u0627","adm.settings":"\u062A\u0646\u0638\u06CC\u0645\u0627\u062A \u0641\u0631\u0648\u0634\u06AF\u0627\u0647","adm.theme":"\u067E\u0648\u0633\u062A\u0647 \u0648 \u0686\u06CC\u062F\u0645\u0627\u0646","adm.features":"\u0627\u0645\u06A9\u0627\u0646\u0627\u062A","adm.shipping":"\u0627\u0631\u0633\u0627\u0644 \u0648 \u0628\u06CC\u0645\u0647","adm.plus":"\u0627\u0634\u062A\u0631\u0627\u06A9 \u067E\u0644\u0627\u0633","adm.pages":"\u0645\u062D\u062A\u0648\u0627\u06CC \u0635\u0641\u062D\u0647\u200C\u0647\u0627","adm.barcode":"\u0628\u0627\u0631\u06A9\u062F \u0648 \u0628\u0631\u0686\u0633\u0628","adm.imageSearch":"\u062C\u0633\u062A\u200C\u0648\u062C\u0648\u06CC \u062A\u0635\u0648\u06CC\u0631\u06CC","adm.audit":"\u06AF\u0632\u0627\u0631\u0634 \u0631\u0648\u06CC\u062F\u0627\u062F\u0647\u0627","adm.stats":"\u0622\u0645\u0627\u0631","adm.export":"\u062E\u0631\u0648\u062C\u06CC \u0648 \u067E\u0634\u062A\u06CC\u0628\u0627\u0646","adm.maintenance":"\u0646\u06AF\u0647\u062F\u0627\u0631\u06CC","adm.backToSite":"\u0628\u0627\u0632\u06AF\u0634\u062A \u0628\u0647 \u0633\u0627\u06CC\u062A","adm.kpi.ordersToday":"\u0633\u0641\u0627\u0631\u0634 \u0627\u0645\u0631\u0648\u0632","adm.kpi.visits":"\u0628\u0627\u0632\u062F\u06CC\u062F \u0627\u0645\u0631\u0648\u0632","adm.kpi.pending":"\u062F\u0631 \u0627\u0646\u062A\u0638\u0627\u0631 \u0628\u0631\u0631\u0633\u06CC","adm.kpi.revenueTotal":"\u062F\u0631\u0622\u0645\u062F \u06A9\u0644","adm.kpi.users":"\u06A9\u0627\u0631\u0628\u0631\u0627\u0646","adm.kpi.products":"\u06A9\u0627\u0644\u0627\u0647\u0627","adm.kpi.lowStock":"\u0645\u0648\u062C\u0648\u062F\u06CC \u06A9\u0645","adm.awaiting":"\u06A9\u0627\u0631\u0647\u0627\u06CC \u062F\u0631 \u0627\u0646\u062A\u0638\u0627\u0631 \u0627\u0642\u062F\u0627\u0645","adm.awaiting.reviews":"\u0646\u0638\u0631\u0627\u062A \u062F\u0631 \u0627\u0646\u062A\u0638\u0627\u0631 \u062A\u0623\u06CC\u06CC\u062F","adm.awaiting.tickets":"\u062A\u06CC\u06A9\u062A\u200C\u0647\u0627\u06CC \u0628\u0627\u0632","adm.awaiting.orders":"\u0633\u0641\u0627\u0631\u0634\u200C\u0647\u0627\u06CC \u062F\u0631 \u0627\u0646\u062A\u0638\u0627\u0631","adm.awaiting.feedback":"\u0628\u0627\u0632\u062E\u0648\u0631\u062F \u062C\u062F\u06CC\u062F","adm.awaiting.chat":"\u067E\u06CC\u0627\u0645 \u062E\u0648\u0627\u0646\u062F\u0647\u200C\u0646\u0634\u062F\u0647\u200C\u06CC \u0686\u062A","adm.chart":"\u0631\u0648\u0646\u062F \u06F1\u06F4 \u0631\u0648\u0632 \u0627\u062E\u06CC\u0631","adm.topSelling":"\u067E\u0631\u0641\u0631\u0648\u0634\u200C\u062A\u0631\u06CC\u0646\u200C\u0647\u0627","adm.lowStockList":"\u06A9\u0627\u0644\u0627\u0647\u0627\u06CC \u0628\u0627 \u0645\u0648\u062C\u0648\u062F\u06CC \u06A9\u0645","adm.recentAudit":"\u0622\u062E\u0631\u06CC\u0646 \u0631\u0648\u06CC\u062F\u0627\u062F\u0647\u0627","adm.storage":"\u062D\u062C\u0645 \u062F\u0627\u062F\u0647\u200C\u0647\u0627","adm.pName":"\u0646\u0627\u0645 \u06A9\u0627\u0644\u0627","adm.pNameEn":"\u0646\u0627\u0645 \u0627\u0646\u06AF\u0644\u06CC\u0633\u06CC","adm.pCat":"\u062F\u0633\u062A\u0647\u200C\u0628\u0646\u062F\u06CC","adm.pBrand":"\u0628\u0631\u0646\u062F","adm.pPrice":"\u0642\u06CC\u0645\u062A (\u062A\u0648\u0645\u0627\u0646)","adm.pOldPrice":"\u0642\u06CC\u0645\u062A \u0642\u0628\u0644 \u0627\u0632 \u062A\u062E\u0641\u06CC\u0641","adm.pCost":"\u0642\u06CC\u0645\u062A \u062E\u0631\u06CC\u062F","adm.pStock":"\u0645\u0648\u062C\u0648\u062F\u06CC","adm.pSku":"\u06A9\u062F \u06A9\u0627\u0644\u0627","adm.pBarcode":"\u0628\u0627\u0631\u06A9\u062F","adm.pWeight":"\u0648\u0632\u0646 (\u06AF\u0631\u0645)","adm.pWarranty":"\u06AF\u0627\u0631\u0627\u0646\u062A\u06CC (\u0645\u0627\u0647)","adm.pAuth":"\u0627\u0635\u0627\u0644\u062A \u06A9\u0627\u0644\u0627","adm.pTags":"\u0628\u0631\u0686\u0633\u0628\u200C\u0647\u0627 (\u0628\u0627 Enter \u062C\u062F\u0627 \u06A9\u0646)","adm.pSpecs":"\u0645\u0634\u062E\u0635\u0627\u062A \u0641\u0646\u06CC","adm.pSpecKey":"\u0646\u0627\u0645 \u0645\u0634\u062E\u0635\u0647","adm.pSpecVal":"\u0645\u0642\u062F\u0627\u0631","adm.pAddSpec":"\u0627\u0641\u0632\u0648\u062F\u0646 \u0645\u0634\u062E\u0635\u0647","adm.pVideos":"\u0648\u06CC\u062F\u06CC\u0648\u0647\u0627\u06CC \u0645\u062D\u0635\u0648\u0644 (\u0647\u0631 \u062E\u0637 \u06CC\u06A9 \u0646\u0634\u0627\u0646\u06CC https \u06CC\u0627 /uploads)","adm.pVideosHint":"\u0648\u06CC\u062F\u06CC\u0648\u0647\u0627 \u062F\u0631 \u06AF\u0627\u0644\u0631\u06CC \u0645\u062D\u0635\u0648\u0644 \u0648 \u0644\u0627\u06CC\u062A\u200C\u0628\u0627\u06A9\u0633 \u067E\u062E\u0634 \u0645\u06CC\u200C\u0634\u0648\u0646\u062F.","adm.pImages":"\u062A\u0635\u0627\u0648\u06CC\u0631","adm.pFindImage":"\u062C\u0633\u062A\u200C\u0648\u062C\u0648\u06CC \u062E\u0648\u062F\u06A9\u0627\u0631 \u062A\u0635\u0648\u06CC\u0631","adm.pFindImageHint":"\u0645\u0646\u0627\u0628\u0639 \u0622\u0632\u0627\u062F \u062A\u0635\u0648\u06CC\u0631 (\u0648\u06CC\u06A9\u06CC\u200C\u0645\u062F\u06CC\u0627/\u0627\u0648\u067E\u0646\u200C\u0648\u0631\u0633) \u0631\u0627 \u0628\u0631\u0627\u06CC \u0627\u06CC\u0646 \u06A9\u0627\u0644\u0627 \u062C\u0633\u062A\u200C\u0648\u062C\u0648 \u0645\u06CC\u200C\u06A9\u0646\u06CC\u0645. \u06CC\u06A9\u06CC \u0631\u0627 \u0627\u0646\u062A\u062E\u0627\u0628 \u0648 \u062A\u0623\u06CC\u06CC\u062F \u06A9\u0646.","adm.pFindSearching":"\u062F\u0631 \u062D\u0627\u0644 \u062C\u0633\u062A\u200C\u0648\u062C\u0648\u06CC \u062A\u0635\u0648\u06CC\u0631\u2026","adm.pFindEmpty":"\u062A\u0635\u0648\u06CC\u0631\u06CC \u067E\u06CC\u062F\u0627 \u0646\u0634\u062F. \u0645\u06CC\u200C\u062A\u0648\u0627\u0646\u06CC \u0639\u06A9\u0633 \u062E\u0648\u062F\u062A \u0631\u0627 \u0628\u0627\u0631\u06AF\u0630\u0627\u0631\u06CC \u06A9\u0646\u06CC.","adm.pUpload":"\u0628\u0627\u0631\u06AF\u0630\u0627\u0631\u06CC \u0639\u06A9\u0633","adm.pUseImage":"\u0627\u0633\u062A\u0641\u0627\u062F\u0647 \u0627\u0632 \u0627\u06CC\u0646 \u062A\u0635\u0648\u06CC\u0631","adm.pDefaultImage":"\u0628\u0627\u0632\u06AF\u0631\u062F\u0627\u0646\u062F\u0646 \u062A\u0635\u0648\u06CC\u0631 \u067E\u06CC\u0634\u200C\u0641\u0631\u0636","adm.pFeatured":"\u0646\u0645\u0627\u06CC\u0634 \u062F\u0631 \u067E\u06CC\u0634\u0646\u0647\u0627\u062F \u0648\u06CC\u0698\u0647","adm.pActive":"\u0641\u0639\u0627\u0644 (\u062F\u0631 \u0633\u0627\u06CC\u062A \u062F\u06CC\u062F\u0647 \u0634\u0648\u062F)","adm.pSaved":"\u06A9\u0627\u0644\u0627 \u0630\u062E\u06CC\u0631\u0647 \u0634\u062F","adm.pCreated":"\u06A9\u0627\u0644\u0627 \u0627\u06CC\u062C\u0627\u062F \u0634\u062F","adm.pDeleted":"\u06A9\u0627\u0644\u0627 \u062D\u0630\u0641 \u0634\u062F","adm.pDeleteConfirm":"\u0627\u06CC\u0646 \u06A9\u0627\u0644\u0627 \u0628\u0631\u0627\u06CC \u0647\u0645\u06CC\u0634\u0647 \u062D\u0630\u0641 \u0634\u0648\u062F\u061F","adm.pQuickEdit":"\u0648\u06CC\u0631\u0627\u06CC\u0634 \u0633\u0631\u06CC\u0639","adm.pBulkPrice":"\u062A\u063A\u06CC\u06CC\u0631 \u06AF\u0631\u0648\u0647\u06CC \u0642\u06CC\u0645\u062A","adm.catName":"\u0646\u0627\u0645 \u062F\u0633\u062A\u0647","adm.catParent":"\u062F\u0633\u062A\u0647\u200C\u06CC \u0648\u0627\u0644\u062F","adm.catGlyph":"\u0622\u06CC\u06A9\u0648\u0646","adm.catOrder":"\u062A\u0631\u062A\u06CC\u0628 \u0646\u0645\u0627\u06CC\u0634","adm.catNoParent":"\u0628\u062F\u0648\u0646 \u0648\u0627\u0644\u062F (\u0633\u0637\u062D \u0627\u0635\u0644\u06CC)","adm.brandName":"\u0646\u0627\u0645 \u0628\u0631\u0646\u062F","adm.brandNameEn":"\u0646\u0627\u0645 \u0627\u0646\u06AF\u0644\u06CC\u0633\u06CC \u0628\u0631\u0646\u062F","adm.oStatus":"\u062A\u063A\u06CC\u06CC\u0631 \u0648\u0636\u0639\u06CC\u062A","adm.oTracking":"\u06A9\u062F \u0631\u0647\u06AF\u06CC\u0631\u06CC","adm.oNote":"\u06CC\u0627\u062F\u062F\u0627\u0634\u062A \u062F\u0627\u062E\u0644\u06CC","adm.oCustomer":"\u0645\u0634\u062A\u0631\u06CC","adm.oDelivery":"\u062A\u062D\u0648\u06CC\u0644","adm.oPayment":"\u067E\u0631\u062F\u0627\u062E\u062A","adm.oSaved":"\u0633\u0641\u0627\u0631\u0634 \u0628\u0647\u200C\u0631\u0648\u0632\u0631\u0633\u0627\u0646\u06CC \u0634\u062F","adm.rApprove":"\u062A\u0623\u06CC\u06CC\u062F \u0648 \u0627\u0646\u062A\u0634\u0627\u0631","adm.rReject":"\u0631\u062F \u06A9\u0631\u062F\u0646","adm.rReply":"\u067E\u0627\u0633\u062E","adm.rReplySaved":"\u067E\u0627\u0633\u062E \u0630\u062E\u06CC\u0631\u0647 \u0634\u062F","adm.rModerated":"\u0648\u0636\u0639\u06CC\u062A \u0646\u0638\u0631 \u0628\u0647\u200C\u0631\u0648\u0632\u0631\u0633\u0627\u0646\u06CC \u0634\u062F","adm.rFilter":"\u0641\u06CC\u0644\u062A\u0631","adm.uRole":"\u0646\u0642\u0634","adm.uPerms":"\u062F\u0633\u062A\u0631\u0633\u06CC\u200C\u0647\u0627","adm.uPermsHint":"\u0647\u0631 \u062F\u0633\u062A\u0631\u0633\u06CC \u0631\u0627 \u062C\u062F\u0627\u06AF\u0627\u0646\u0647 \u0631\u0648\u0634\u0646 \u06CC\u0627 \u062E\u0627\u0645\u0648\u0634 \u06A9\u0646. \u062A\u063A\u06CC\u06CC\u0631\u0647\u0627 \u0641\u0648\u0631\u0627\u064B \u0627\u0639\u0645\u0627\u0644 \u0645\u06CC\u200C\u0634\u0648\u062F.","adm.uAll":"\u0641\u0639\u0627\u0644\u200C\u0633\u0627\u0632\u06CC \u0647\u0645\u0647","adm.uNone":"\u063A\u06CC\u0631\u0641\u0639\u0627\u0644\u200C\u0633\u0627\u0632\u06CC \u0647\u0645\u0647","adm.uWalletAdjust":"\u062A\u0646\u0638\u06CC\u0645 \u0645\u0648\u062C\u0648\u062F\u06CC \u06A9\u06CC\u0641 \u067E\u0648\u0644","adm.uWalletReason":"\u062F\u0644\u06CC\u0644","adm.uPlusDays":"\u0631\u0648\u0632\u0647\u0627\u06CC \u0627\u0634\u062A\u0631\u0627\u06A9 \u067E\u0644\u0627\u0633","adm.uResetPass":"\u0628\u0627\u0632\u0646\u0634\u0627\u0646\u06CC \u0631\u0645\u0632 \u0639\u0628\u0648\u0631","adm.uStatus":"\u0648\u0636\u0639\u06CC\u062A \u062D\u0633\u0627\u0628","adm.uBlocked":"\u0645\u0633\u062F\u0648\u062F","adm.uSaved":"\u062A\u063A\u06CC\u06CC\u0631\u0627\u062A \u06A9\u0627\u0631\u0628\u0631 \u0630\u062E\u06CC\u0631\u0647 \u0634\u062F","adm.uMakeStaff":"\u06A9\u0627\u0631\u0645\u0646\u062F \u06A9\u0631\u062F\u0646","adm.cCode":"\u06A9\u062F","adm.cType":"\u0646\u0648\u0639 \u062A\u062E\u0641\u06CC\u0641","adm.cValue":"\u0645\u0642\u062F\u0627\u0631","adm.cMax":"\u0633\u0642\u0641 \u062A\u062E\u0641\u06CC\u0641","adm.cMin":"\u062D\u062F\u0627\u0642\u0644 \u0645\u0628\u0644\u063A \u0633\u0641\u0627\u0631\u0634","adm.cLimit":"\u0633\u0642\u0641 \u0627\u0633\u062A\u0641\u0627\u062F\u0647\u200C\u06CC \u06A9\u0644","adm.cPerUser":"\u0633\u0642\u0641 \u0647\u0631 \u06A9\u0627\u0631\u0628\u0631","adm.cStart":"\u0634\u0631\u0648\u0639","adm.cEnd":"\u067E\u0627\u06CC\u0627\u0646","adm.cUsed":"\u0627\u0633\u062A\u0641\u0627\u062F\u0647\u200C\u0634\u062F\u0647","adm.aSlot":"\u0645\u062D\u0644 \u0646\u0645\u0627\u06CC\u0634","adm.aTitle":"\u0639\u0646\u0648\u0627\u0646","adm.aText":"\u0645\u062A\u0646","adm.aLink":"\u0644\u06CC\u0646\u06A9 \u0645\u0642\u0635\u062F","adm.aCta":"\u0645\u062A\u0646 \u062F\u06A9\u0645\u0647","adm.aActive":"\u0646\u0645\u0627\u06CC\u0634 \u062F\u0627\u062F\u0647 \u0634\u0648\u062F","adm.nTitle":"\u0639\u0646\u0648\u0627\u0646 \u0627\u0639\u0644\u0627\u0646","adm.nBody":"\u0645\u062A\u0646 \u0627\u0639\u0644\u0627\u0646","adm.nTarget":"\u06AF\u06CC\u0631\u0646\u062F\u0647","adm.nAll":"\u0647\u0645\u0647\u200C\u06CC \u06A9\u0627\u0631\u0628\u0631\u0627\u0646","adm.nOne":"\u06CC\u06A9 \u06A9\u0627\u0631\u0628\u0631 \u0645\u0634\u062E\u0635","adm.nLevel":"\u0633\u0637\u062D","adm.nSent":"\u0627\u0639\u0644\u0627\u0646 \u0627\u0631\u0633\u0627\u0644 \u0634\u062F","adm.nOutbox":"\u0635\u0646\u062F\u0648\u0642 \u062E\u0631\u0648\u062C\u06CC \u067E\u06CC\u0627\u0645\u06A9 \u0648 \u0627\u06CC\u0645\u06CC\u0644 (\u062D\u0627\u0644\u062A \u0622\u0632\u0645\u0627\u06CC\u0634\u06CC)","adm.sStore":"\u0627\u0637\u0644\u0627\u0639\u0627\u062A \u0641\u0631\u0648\u0634\u06AF\u0627\u0647","adm.sTheme":"\u067E\u0648\u0633\u062A\u0647","adm.sUi":"\u0686\u06CC\u062F\u0645\u0627\u0646 \u0631\u0627\u0628\u0637","adm.mailsms":"\u0627\u06CC\u0645\u06CC\u0644 \u0648 \u067E\u06CC\u0627\u0645\u06A9","adm.mailCfg":"\u0633\u0631\u0648\u0631 \u0627\u06CC\u0645\u06CC\u0644 (SMTP)","adm.mailEnabled":"\u0627\u0631\u0633\u0627\u0644 \u0627\u06CC\u0645\u06CC\u0644 \u0641\u0639\u0627\u0644","adm.mailFrom":"\u0622\u062F\u0631\u0633 \u0641\u0631\u0633\u062A\u0646\u062F\u0647","adm.smsCfg":"\u067E\u0646\u0644 \u067E\u06CC\u0627\u0645\u06A9 (\u06A9\u0627\u0648\u0647\u200C\u0646\u06AF\u0627\u0631)","adm.smsEnabled":"\u0627\u0631\u0633\u0627\u0644 \u067E\u06CC\u0627\u0645\u06A9 \u0641\u0639\u0627\u0644","adm.smsKey":"\u06A9\u0644\u06CC\u062F API","adm.smsSender":"\u0634\u0645\u0627\u0631\u0647\u0654 \u0641\u0631\u0633\u062A\u0646\u062F\u0647","adm.console":"\u06A9\u0646\u0633\u0648\u0644 \u0633\u0627\u0645\u0627\u0646\u0647","adm.consoleHint":"\u0631\u06CC\u0633\u062A\u0627\u0631\u062A \u0633\u0631\u0648\u0631 \u0686\u0646\u062F \u062B\u0627\u0646\u06CC\u0647 \u0637\u0648\u0644 \u0645\u06CC\u200C\u06A9\u0634\u062F\u061B \u0635\u0641\u062D\u0647 \u062E\u0648\u062F\u06A9\u0627\u0631 \u062A\u0627\u0632\u0647 \u0645\u06CC\u200C\u0634\u0648\u062F. \u0631\u06CC\u0633\u062A\u200C\u0647\u0627 \u063A\u06CC\u0631\u0642\u0627\u0628\u0644 \u0628\u0627\u0632\u06AF\u0634\u062A\u200C\u0627\u0646\u062F.","adm.sysRestart":"\u0631\u06CC\u0633\u062A\u0627\u0631\u062A \u0633\u0631\u0648\u0631","adm.sysRestartWarn":"\u0633\u0631\u0648\u0631 \u0647\u0645\u06CC\u0646 \u062D\u0627\u0644\u0627 \u0631\u06CC\u0633\u062A\u0627\u0631\u062A \u0634\u0648\u062F\u061F \u06A9\u0627\u0631\u0628\u0631\u0627\u0646 \u0686\u0646\u062F \u062B\u0627\u0646\u06CC\u0647 \u0642\u0637\u0639 \u0645\u06CC\u200C\u0634\u0648\u0646\u062F.","adm.sysRestarting":"\u062F\u0631 \u062D\u0627\u0644 \u0631\u06CC\u0633\u062A\u0627\u0631\u062A\u2026 \u0635\u0641\u062D\u0647 \u062A\u0627 \u0644\u062D\u0638\u0627\u062A\u06CC \u062F\u06CC\u06AF\u0631 \u062A\u0627\u0632\u0647 \u0645\u06CC\u200C\u0634\u0648\u062F.","adm.sysResetLabel":"\u0631\u06CC\u0633\u062A \u0628\u062E\u0634\u200C\u0647\u0627 (\u063A\u06CC\u0631\u0642\u0627\u0628\u0644 \u0628\u0627\u0632\u06AF\u0634\u062A):","adm.sysReset.audit":"\u0644\u0627\u06AF \u0645\u0645\u06CC\u0632\u06CC","adm.sysReset.carts":"\u0633\u0628\u062F\u0647\u0627\u06CC \u0645\u0647\u0645\u0627\u0646","adm.sysReset.visits":"\u0634\u0645\u0627\u0631 \u0628\u0627\u0632\u062F\u06CC\u062F\u0647\u0627","adm.sysReset.visitors":"\u0628\u0627\u0632\u062F\u06CC\u062F\u06A9\u0646\u0646\u062F\u06AF\u0627\u0646","adm.secTitle":"\u067E\u062F\u0627\u0641\u0646\u062F \u0648 \u0635\u0641 \u0648\u0631\u0648\u062F","adm.secQueueEnabled":"\u0635\u0641\u200C\u0628\u0646\u062F\u06CC \u0647\u0646\u06AF\u0627\u0645 \u0634\u0644\u0648\u063A\u06CC","adm.secQueueDesc":"\u0648\u0642\u062A\u06CC \u0628\u0627\u0631 \u0633\u0627\u06CC\u062A \u0627\u0632 \u062D\u062F \u0628\u06AF\u0630\u0631\u062F\u060C \u0628\u0627\u0632\u062F\u06CC\u062F\u06A9\u0646\u0646\u062F\u06AF\u0627\u0646 \u0646\u0627\u0634\u0646\u0627\u0633 \u062F\u0627\u0646\u0647\u200C\u062F\u0627\u0646\u0647 \u0627\u0632 \u0635\u0641 \u0648\u0627\u0631\u062F \u0645\u06CC\u200C\u0634\u0648\u0646\u062F \u062A\u0627 \u0633\u0627\u06CC\u062A \u0628\u0631\u0627\u06CC \u0647\u0645\u0647 \u0628\u062F\u0648\u0646 \u062E\u0637\u0627 \u0628\u0645\u0627\u0646\u062F.","adm.secMaxConc":"\u0633\u0642\u0641 \u062F\u0631\u062E\u0648\u0627\u0633\u062A \u0647\u0645\u0632\u0645\u0627\u0646","adm.secTriggerRps":"\u0622\u0633\u062A\u0627\u0646\u0647\u0654 \u062F\u0631\u062E\u0648\u0627\u0633\u062A \u062F\u0631 \u062B\u0627\u0646\u06CC\u0647","adm.secPassTtl":"\u0627\u0639\u062A\u0628\u0627\u0631 \u06AF\u0630\u0631\u0646\u0627\u0645\u0647\u0654 \u0648\u0631\u0648\u062F (\u062F\u0642\u06CC\u0642\u0647)","adm.secPoll":"\u0641\u0627\u0635\u0644\u0647\u0654 \u0628\u0631\u0631\u0633\u06CC \u0646\u0648\u0628\u062A (\u062B\u0627\u0646\u06CC\u0647)","adm.secFloodBan":"\u0622\u0633\u062A\u0627\u0646\u0647\u0654 \u0645\u0633\u062F\u0648\u062F\u0633\u0627\u0632\u06CC \u062E\u0648\u062F\u06A9\u0627\u0631 (\u062F\u0631\u062E\u0648\u0627\u0633\u062A \u062F\u0631 \u062F\u0642\u06CC\u0642\u0647)","adm.secFloodMin":"\u0645\u062F\u062A \u0645\u0633\u062F\u0648\u062F\u0633\u0627\u0632\u06CC \u062E\u0648\u062F\u06A9\u0627\u0631 (\u062F\u0642\u06CC\u0642\u0647)","adm.secSaved":"\u062A\u0646\u0638\u06CC\u0645\u0627\u062A \u067E\u062F\u0627\u0641\u0646\u062F \u0630\u062E\u06CC\u0631\u0647 \u0634\u062F.","adm.secInflight":"\u062F\u0631\u062E\u0648\u0627\u0633\u062A \u0641\u0639\u0627\u0644","adm.secRps":"\u062F\u0631\u062E\u0648\u0627\u0633\u062A/\u062B\u0627\u0646\u06CC\u0647","adm.secQueued":"\u062F\u0631 \u0635\u0641","adm.secAutoBans":"\u0645\u0633\u062F\u0648\u062F \u062E\u0648\u062F\u06A9\u0627\u0631 \u0641\u0639\u0627\u0644","adm.secTop":"\u067E\u0631\u062D\u0631\u0641\u200C\u062A\u0631\u06CC\u0646 IP\u0647\u0627 (\u062F\u0642\u06CC\u0642\u0647\u0654 \u0627\u062E\u06CC\u0631)","adm.secPerMin":"\u062F\u0631\u062E\u0648\u0627\u0633\u062A/\u062F\u0642\u06CC\u0642\u0647","adm.secTopEmpty":"\u062A\u0631\u0627\u0641\u06CC\u06A9 \u063A\u06CC\u0631\u0639\u0627\u062F\u06CC \u062B\u0628\u062A \u0646\u0634\u062F\u0647 \u0627\u0633\u062A.","adm.secBusy":"\u0634\u0644\u0648\u063A \u2014 \u0635\u0641 \u0641\u0639\u0627\u0644","adm.secNormal":"\u0648\u0636\u0639\u06CC\u062A \u0639\u0627\u062F\u06CC","adm.banMinutes":"\u0645\u062F\u062A (\u062F\u0642\u06CC\u0642\u0647\u060C \u06F0 = \u062F\u0627\u0626\u0645)","adm.banUntil":"\u062A\u0627","adm.banAuto":"\u062E\u0648\u062F\u06A9\u0627\u0631","adm.resetAudit":"\u067E\u0627\u06A9\u200C\u06A9\u0631\u062F\u0646 \u0644\u0627\u06AF\u200C\u0647\u0627","adm.resetCarts":"\u062E\u0627\u0644\u06CC\u200C\u06A9\u0631\u062F\u0646 \u0633\u0628\u062F\u0647\u0627\u06CC \u0645\u0647\u0645\u0627\u0646","adm.resetVisitors":"\u067E\u0627\u06A9\u200C\u06A9\u0631\u062F\u0646 \u0628\u0627\u0632\u062F\u06CC\u062F\u06A9\u0646\u0646\u062F\u06AF\u0627\u0646","adm.resetDone":"\u0631\u06CC\u0633\u062A \u0627\u0646\u062C\u0627\u0645 \u0634\u062F.","adm.resetWarn.audit":"\u0647\u0645\u0647\u0654 \u0644\u0627\u06AF\u200C\u0647\u0627\u06CC \u0645\u0645\u06CC\u0632\u06CC \u067E\u0627\u06A9 \u0634\u0648\u0646\u062F\u061F","adm.resetWarn.carts":"\u0633\u0628\u062F\u0647\u0627\u06CC \u062E\u0631\u06CC\u062F \u06A9\u0627\u0631\u0628\u0631\u0627\u0646 \u0645\u0647\u0645\u0627\u0646 \u062E\u0627\u0644\u06CC \u0634\u0648\u062F\u061F","adm.resetWarn.visitors":"\u0641\u0647\u0631\u0633\u062A \u0628\u0627\u0632\u062F\u06CC\u062F\u06A9\u0646\u0646\u062F\u06AF\u0627\u0646 \u067E\u0627\u06A9 \u0634\u0648\u062F\u061F","adm.resetWarn.visits":"\u0634\u0645\u0627\u0631\u0646\u062F\u0647\u200C\u0647\u0627\u06CC \u0628\u0627\u0632\u062F\u06CC\u062F \u0635\u0641\u0631 \u0634\u0648\u0646\u062F\u061F","adm.visitors":"\u0628\u0627\u0632\u062F\u06CC\u062F\u06A9\u0646\u0646\u062F\u06AF\u0627\u0646","adm.uDevice":"\u062F\u0633\u062A\u06AF\u0627\u0647 / IP","adm.uBrowser":"\u0645\u0631\u0648\u0631\u06AF\u0631","adm.uRegion":"\u0645\u0646\u0637\u0642\u0647 / \u0632\u0645\u0627\u0646","adm.uPath":"\u0645\u0633\u06CC\u0631","adm.guest":"\u0645\u0647\u0645\u0627\u0646","adm.bans":"\u0645\u0633\u062F\u0648\u062F\u0633\u0627\u0632\u06CC (\u0628\u0646/\u0622\u0646\u200C\u0628\u0646)","adm.banType":"\u0646\u0648\u0639","adm.banValue":"\u0645\u0642\u062F\u0627\u0631 (IP / \u0634\u0645\u0627\u0631\u0647 / \u0627\u06CC\u0645\u06CC\u0644 / \u0646\u0627\u0645 \u06A9\u0627\u0631\u0628\u0631\u06CC)","adm.banReason":"\u062F\u0644\u06CC\u0644","adm.ban":"\u0645\u0633\u062F\u0648\u062F \u06A9\u0646","adm.unban":"\u0631\u0641\u0639 \u0645\u0633\u062F\u0648\u062F\u06CC","adm.banned":"\u0645\u0633\u062F\u0648\u062F","adm.banDone":"\u0645\u0633\u062F\u0648\u062F \u0634\u062F.","adm.unbanDone":"\u0645\u0633\u062F\u0648\u062F\u06CC \u0631\u0641\u0639 \u0634\u062F.","adm.bansEmpty":"\u0641\u0639\u0644\u0627\u064B \u06A9\u0633\u06CC \u0645\u0633\u062F\u0648\u062F \u0646\u06CC\u0633\u062A.","adm.banByAdmin":"\u062A\u0648\u0633\u0637 \u0645\u062F\u06CC\u0631","adm.channels":"\u06A9\u0627\u0646\u0627\u0644\u200C\u0647\u0627\u06CC \u0627\u0631\u0633\u0627\u0644","adm.chSite":"\u0627\u0639\u0644\u0627\u0646 \u062F\u0627\u062E\u0644 \u0633\u0627\u06CC\u062A","adm.chTelegram":"\u0628\u0627\u062A \u062A\u0644\u06AF\u0631\u0627\u0645","adm.chEmail":"\u0627\u06CC\u0645\u06CC\u0644","adm.chSms":"\u067E\u06CC\u0627\u0645\u06A9","adm.channelsHint":"\u0627\u06CC\u0645\u06CC\u0644/\u067E\u06CC\u0627\u0645\u06A9 \u0646\u06CC\u0627\u0632 \u0628\u0647 \u062A\u0646\u0638\u06CC\u0645\u0627\u062A \u067E\u0627\u06CC\u06CC\u0646 \u0647\u0645\u06CC\u0646 \u0628\u062E\u0634 \u062F\u0627\u0631\u0646\u062F\u061B \u0628\u062F\u0648\u0646 \u062A\u0646\u0638\u06CC\u0645\u060C \u0641\u0642\u0637 \u06A9\u0627\u0646\u0627\u0644\u200C\u0647\u0627\u06CC \u0622\u0645\u0627\u062F\u0647 \u0627\u0631\u0633\u0627\u0644 \u0645\u06CC\u200C\u0634\u0648\u0646\u062F.","adm.telegram":"\u0628\u0627\u062A \u062A\u0644\u06AF\u0631\u0627\u0645","adm.tgHint":"\u062A\u0648\u06A9\u0646 \u0631\u0627 \u0627\u0632 BotFather \u062A\u0644\u06AF\u0631\u0627\u0645 \u0628\u06AF\u06CC\u0631 \u0648 \u0627\u06CC\u0646\u062C\u0627 \u0628\u06AF\u0630\u0627\u0631\u061B \u0628\u0627\u062A \u0631\u0648\u06CC \u0633\u0631\u0648\u0631 \u0641\u0631\u0648\u0634\u06AF\u0627\u0647 \u0645\u06CC\u200C\u0686\u0631\u062E\u062F \u0648 \u0627\u0632 \u0647\u0645\u06CC\u0646 \u067E\u0646\u0644 \u0645\u062F\u06CC\u0631\u06CC\u062A \u0645\u06CC\u200C\u0634\u0648\u062F.","adm.tgEnabled":"\u0628\u0627\u062A \u0631\u0648\u0634\u0646","adm.tgToken":"\u062A\u0648\u06A9\u0646 \u0628\u0627\u062A","adm.tgTokenHint":"\u0645\u062B\u0644 123456:ABC-\u2026","adm.tgWelcome":"\u067E\u06CC\u0627\u0645 \u062E\u0648\u0634\u200C\u0622\u0645\u062F /start","adm.tgTest":"\u0627\u0631\u0633\u0627\u0644 \u0622\u0632\u0645\u0627\u06CC\u0634\u06CC","adm.tgInbox":"\u0635\u0646\u062F\u0648\u0642 \u067E\u06CC\u0627\u0645\u200C\u0647\u0627","adm.tgSubs":"\u0639\u0636\u0648\u0647\u0627","adm.tgReplyPh":"\u067E\u0627\u0633\u062E \u0628\u0647 \u0627\u06CC\u0646 \u06A9\u0627\u0631\u0628\u0631\u2026","adm.tgInboxEmpty":"\u067E\u06CC\u0627\u0645\u06CC \u0646\u0631\u0633\u06CC\u062F\u0647 \u0627\u0633\u062A.","adm.lottery":"\u0642\u0631\u0639\u0647\u200C\u06A9\u0634\u06CC","adm.lotteryNew":"\u0642\u0631\u0639\u0647\u200C\u06A9\u0634\u06CC \u062C\u062F\u06CC\u062F","adm.lotPrize":"\u062C\u0627\u06CC\u0632\u0647","adm.lotEnds":"\u067E\u0627\u06CC\u0627\u0646","adm.lotWinners":"\u062A\u0639\u062F\u0627\u062F \u0628\u0631\u0646\u062F\u0647","adm.lotWinnersList":"\u0628\u0631\u0646\u062F\u0647\u200C\u0647\u0627","adm.lotMode":"\u0631\u0648\u0634 \u0634\u0631\u06A9\u062A","adm.lotModeOrders":"\u062E\u0648\u062F\u06A9\u0627\u0631 \u0627\u0632 \u0633\u0641\u0627\u0631\u0634\u200C\u0647\u0627","adm.lotModeManual":"\u062F\u06A9\u0645\u0647\u0654 \u0634\u0631\u06A9\u062A \u062F\u0633\u062A\u06CC","adm.lotEntries":"\u0634\u0631\u06A9\u062A\u200C\u06A9\u0646\u0646\u062F\u06AF\u0627\u0646","adm.lotRun":"\u0642\u0631\u0639\u0647\u200C\u06A9\u0634\u06CC \u06A9\u0646","adm.lotRunWarn":"\u0628\u0631\u0646\u062F\u0647\u200C\u0647\u0627 \u0647\u0645\u06CC\u0646 \u062D\u0627\u0644\u0627 \u0628\u0647\u200C\u0635\u0648\u0631\u062A \u062A\u0635\u0627\u062F\u0641\u06CC \u0627\u0646\u062A\u062E\u0627\u0628 \u0648 \u0645\u0637\u0644\u0639 \u0645\u06CC\u200C\u0634\u0648\u0646\u062F. \u0627\u062F\u0627\u0645\u0647 \u0645\u06CC\u200C\u062F\u0647\u06CC\u061F","adm.lotDone":"\u0642\u0631\u0639\u0647\u200C\u06A9\u0634\u06CC \u0627\u0646\u062C\u0627\u0645 \u0634\u062F","adm.lotClose":"\u0628\u0633\u062A\u0646","adm.lotClosed":"\u0642\u0631\u0639\u0647\u200C\u06A9\u0634\u06CC \u0628\u0633\u062A\u0647 \u0634\u062F.","adm.lotEmpty":"\u0647\u0646\u0648\u0632 \u0642\u0631\u0639\u0647\u200C\u06A9\u0634\u06CC\u200C\u0627\u06CC \u0646\u0633\u0627\u062E\u062A\u0647\u200C\u0627\u06CC.","lot.title":"\u0642\u0631\u0639\u0647\u200C\u06A9\u0634\u06CC \u06CC\u0627\u0633\u0627\u06CC\u06CC","lot.nav":"\u0642\u0631\u0639\u0647\u200C\u06A9\u0634\u06CC","lot.soon":"\u0628\u0647\u200C\u0632\u0648\u062F\u06CC \u0627\u0636\u0627\u0641\u0647 \u062E\u0648\u0627\u0647\u062F \u0634\u062F\u061B \u0645\u0646\u062A\u0638\u0631 \u062E\u0628\u0631\u0647\u0627\u06CC \u062E\u0648\u0628 \u0628\u0627\u0634!","lot.done":"\u0642\u0631\u0639\u0647\u200C\u06A9\u0634\u06CC\u200C\u0647\u0627\u06CC \u06AF\u0630\u0634\u062A\u0647","lot.winners":"\u0628\u0631\u0646\u062F\u0647\u200C\u0647\u0627","lot.active":"\u0641\u0639\u0627\u0644","lot.prize":"\u062C\u0627\u06CC\u0632\u0647","lot.ends":"\u067E\u0627\u06CC\u0627\u0646","lot.entries":"\u0634\u0631\u06A9\u062A\u200C\u06A9\u0646\u0646\u062F\u06AF\u0627\u0646","lot.joined":"\u062F\u0631 \u0627\u06CC\u0646 \u0642\u0631\u0639\u0647\u200C\u06A9\u0634\u06CC \u0634\u0631\u06A9\u062A \u06A9\u0631\u062F\u0647\u200C\u0627\u06CC.","lot.join":"\u0634\u0631\u06A9\u062A \u062F\u0631 \u0642\u0631\u0639\u0647\u200C\u06A9\u0634\u06CC","lot.joinDone":"\u0634\u0631\u06A9\u062A\u062A \u062B\u0628\u062A \u0634\u062F\u061B \u0628\u0647 \u0627\u0645\u06CC\u062F \u0628\u0631\u062F!","lot.autoEntry":"\u0647\u0631 \u062E\u0631\u06CC\u062F \u0645\u0639\u062A\u0628\u0631 \u062F\u0631 \u0628\u0627\u0632\u0647\u0654 \u0642\u0631\u0639\u0647\u200C\u06A9\u0634\u06CC\u060C \u062E\u0648\u062F\u06A9\u0627\u0631 \u06CC\u06A9 \u0634\u0631\u06A9\u062A \u0627\u0633\u062A.","contact.phone3":"\u0634\u0645\u0627\u0631\u0647\u0654 \u0633\u0648\u0645","adm.sBackups":"\u067E\u0634\u062A\u06CC\u0628\u0627\u0646\u200C\u06AF\u06CC\u0631\u06CC \u0648 \u062F\u0627\u0645\u067E","adm.backupNow":"\u067E\u0634\u062A\u06CC\u0628\u0627\u0646 \u0647\u0645\u06CC\u0646 \u062D\u0627\u0644\u0627","adm.backupsHint":"\u0647\u0631 {hours} \u0633\u0627\u0639\u062A \u06CC\u06A9\u200C\u0628\u0627\u0631 \u062E\u0648\u062F\u06A9\u0627\u0631 \u0646\u0633\u062E\u0647\u0654 \u06A9\u0627\u0645\u0644 \u06AF\u0631\u0641\u062A\u0647 \u0648 {keep} \u0646\u0633\u062E\u0647\u0654 \u0622\u062E\u0631 \u0646\u06AF\u0647 \u062F\u0627\u0634\u062A\u0647 \u0645\u06CC\u200C\u0634\u0648\u062F.","adm.backupsEmpty":"\u0647\u0646\u0648\u0632 \u0646\u0633\u062E\u0647\u200C\u0627\u06CC \u0633\u0627\u062E\u062A\u0647 \u0646\u0634\u062F\u0647\u061B \u062F\u06A9\u0645\u0647\u0654 \xAB\u067E\u0634\u062A\u06CC\u0628\u0627\u0646 \u0647\u0645\u06CC\u0646 \u062D\u0627\u0644\u0627\xBB \u0631\u0627 \u0628\u0632\u0646.","adm.backupSize":"\u062D\u062C\u0645","adm.backupRestore":"\u0628\u0627\u0632\u06AF\u0631\u062F\u0627\u0646\u06CC","adm.backupRestoreWarn":"\u0647\u0645\u0647\u0654 \u062F\u0627\u062F\u0647\u200C\u0647\u0627\u06CC \u0641\u0639\u0644\u06CC \u0628\u0627 \u0627\u06CC\u0646 \u0646\u0633\u062E\u0647 \u062C\u0627\u06CC\u06AF\u0632\u06CC\u0646 \u0645\u06CC\u200C\u0634\u0648\u062F. \u0645\u0637\u0645\u0626\u0646\u06CC\u061F","adm.backupDone":"\u0646\u0633\u062E\u0647\u0654 \u067E\u0634\u062A\u06CC\u0628\u0627\u0646 \u0633\u0627\u062E\u062A\u0647 \u0634\u062F.","adm.backupRestored":"\u0628\u0627\u0632\u06AF\u0631\u062F\u0627\u0646\u06CC \u0627\u0646\u062C\u0627\u0645 \u0634\u062F\u061B \u0635\u0641\u062D\u0647 \u062A\u0627\u0632\u0647 \u0645\u06CC\u200C\u0634\u0648\u062F.","adm.dumpFull":"\u062F\u0627\u0645\u067E \u06A9\u0627\u0645\u0644 \u0633\u0627\u06CC\u062A","adm.sFeatures":"\u0627\u0645\u06A9\u0627\u0646\u0627\u062A","adm.sShipping":"\u0627\u0631\u0633\u0627\u0644","adm.sPlus":"\u067E\u0644\u0627\u0633","adm.sOrders":"\u0633\u0641\u0627\u0631\u0634 \u0648 \u067E\u0631\u062F\u0627\u062E\u062A","adm.sSeo":"\u0633\u0626\u0648","adm.sAuth":"\u0627\u062D\u0631\u0627\u0632 \u0647\u0648\u06CC\u062A","adm.sSaved":"\u062A\u0646\u0638\u06CC\u0645\u0627\u062A \u0630\u062E\u06CC\u0631\u0647 \u0634\u062F","adm.tAccent":"\u0631\u0646\u06AF \u0627\u0635\u0644\u06CC","adm.tVariant":"\u067E\u0648\u0633\u062A\u0647\u0654 \u0638\u0627\u0647\u0631\u06CC","adm.tVariantHint":"\u0627\u06AF\u0631 \u067E\u0648\u0633\u062A\u0647\u0654 \u062A\u0627\u0632\u0647 \u0631\u0627 \u062F\u0648\u0633\u062A \u0646\u062F\u0627\u0634\u062A\u06CC\u062F\u060C \xAB\u06A9\u0644\u0627\u0633\u06CC\u06A9\xBB \u062F\u0642\u06CC\u0642\u0627\u064B \u0647\u0645\u0627\u0646 \u062A\u0645 \u0642\u0628\u0644\u06CC \u0627\u0633\u062A.","hdr.refresh":"\u062A\u0627\u0632\u0647\u200C\u0633\u0627\u0632\u06CC \u0635\u0641\u062D\u0647","adm.errTitle":"\u062E\u0637\u0627\u0647\u0627\u06CC \u0632\u0646\u062F\u0647\u0654 \u06A9\u0644\u0627\u06CC\u0646\u062A","adm.tPort":"\u067E\u0648\u0633\u062A\u0647\u0654 \u0645\u0648\u062C \u0648 \u062F\u0631\u06CC\u0627 (\u0645\u0646\u0627\u0633\u0628 \u0641\u0631\u0648\u0634\u06AF\u0627\u0647 \u0633\u0627\u062D\u0644\u06CC \u2014 \u0628\u0631\u0627\u06CC \u06CC\u0627\u0633\u0627\u06CC\u06CC \u062E\u0627\u0645\u0648\u0634 \u0627\u0633\u062A)","adm.tPortHint":"\u0628\u0631\u0627\u06CC \u067E\u0633\u200C\u0632\u0645\u06CC\u0646\u0647\u200C\u06CC \u0633\u0627\u062F\u0647 \u0648 \u062E\u0646\u062B\u06CC\u060C \u062E\u0627\u0645\u0648\u0634\u0634 \u06A9\u0646.","adm.tMode":"\u067E\u0648\u0633\u062A\u0647\u200C\u06CC \u067E\u06CC\u0634\u200C\u0641\u0631\u0636","adm.tRadius":"\u06AF\u0631\u062F\u06CC \u06AF\u0648\u0634\u0647\u200C\u0647\u0627","adm.tDensity":"\u062A\u0631\u0627\u06A9\u0645","adm.tBg":"\u0633\u0628\u06A9 \u067E\u0633\u200C\u0632\u0645\u06CC\u0646\u0647","adm.tContrast":"\u06A9\u0646\u062A\u0631\u0627\u0633\u062A","adm.tAnim":"\u0627\u0646\u06CC\u0645\u06CC\u0634\u0646\u200C\u0647\u0627","adm.uSearchPos":"\u0645\u062D\u0644 \u06A9\u0627\u062F\u0631 \u062C\u0633\u062A\u200C\u0648\u062C\u0648","adm.uHeader":"\u0686\u06CC\u062F\u0645\u0627\u0646 \u0633\u0631\u0628\u0631\u06AF","adm.uNav":"\u0633\u0628\u06A9 \u0645\u0646\u0648","adm.uCards":"\u0633\u0628\u06A9 \u06A9\u0627\u0631\u062A \u06A9\u0627\u0644\u0627","adm.uSticky":"\u0633\u0631\u0628\u0631\u06AF \u0686\u0633\u0628\u0627\u0646","adm.uTicker":"\u0646\u0648\u0627\u0631 \u062E\u0628\u0631\u06CC \u0628\u0627\u0644\u0627","adm.uTickerItems":"\u0645\u062A\u0646\u200C\u0647\u0627\u06CC \u0646\u0648\u0627\u0631 \u062E\u0628\u0631\u06CC","adm.uTickerSpeed":"\u0633\u0631\u0639\u062A \u0646\u0648\u0627\u0631 \u062E\u0628\u0631\u06CC","adm.uQuick":"\u0645\u0634\u0627\u0647\u062F\u0647\u200C\u06CC \u0633\u0631\u06CC\u0639 \u06A9\u0627\u0644\u0627","adm.uChat":"\u062F\u06A9\u0645\u0647\u200C\u06CC \u0634\u0646\u0627\u0648\u0631 \u067E\u0634\u062A\u06CC\u0628\u0627\u0646\u06CC","adm.uCrumb":"\u0646\u0645\u0627\u06CC\u0634 \u0645\u0633\u06CC\u0631 \u0635\u0641\u062D\u0647","adm.uCols":"\u0633\u062A\u0648\u0646\u200C\u0647\u0627\u06CC \u06A9\u0627\u0644\u0627","adm.uColsMobile":"\u0645\u0648\u0628\u0627\u06CC\u0644","adm.uColsTablet":"\u062A\u0628\u0644\u062A","adm.uColsDesktop":"\u062F\u0633\u06A9\u062A\u0627\u067E","adm.uColsWide":"\u0635\u0641\u062D\u0647\u200C\u06CC \u0639\u0631\u06CC\u0636","adm.uCardInfo":"\u0627\u0637\u0644\u0627\u0639\u0627\u062A \u0631\u0648\u06CC \u06A9\u0627\u0631\u062A \u06A9\u0627\u0644\u0627","adm.uPosStart":"\u0631\u0627\u0633\u062A (\u0622\u063A\u0627\u0632)","adm.uPosCenter":"\u0648\u0633\u0637","adm.uPosEnd":"\u0686\u067E (\u067E\u0627\u06CC\u0627\u0646)","adm.uLayoutLogoStart":"\u0644\u0648\u06AF\u0648 \u062F\u0631 \u0622\u063A\u0627\u0632","adm.uLayoutSplit":"\u0644\u0648\u06AF\u0648 \u0622\u063A\u0627\u0632 / \u062C\u0633\u062A\u200C\u0648\u062C\u0648 \u0648\u0633\u0637 / \u06A9\u0646\u0634\u200C\u0647\u0627 \u067E\u0627\u06CC\u0627\u0646","adm.uLayoutCentered":"\u0644\u0648\u06AF\u0648 \u062F\u0631 \u0648\u0633\u0637","adm.fHint":"\u0647\u0631 \u0627\u0645\u06A9\u0627\u0646\u06CC \u0631\u0627 \u06A9\u0647 \u0644\u0627\u0632\u0645 \u0646\u062F\u0627\u0631\u06CC \u062E\u0627\u0645\u0648\u0634 \u06A9\u0646\u061B \u0628\u062E\u0634 \u0645\u0631\u0628\u0648\u0637\u0647 \u0627\u0632 \u0633\u0627\u06CC\u062A \u0648 \u067E\u0646\u0644 \u062D\u0630\u0641 \u0645\u06CC\u200C\u0634\u0648\u062F.","adm.bLabel":"\u0686\u0627\u067E \u0628\u0631\u0686\u0633\u0628","adm.bSelect":"\u0627\u0646\u062A\u062E\u0627\u0628 \u06A9\u0627\u0644\u0627\u0647\u0627","adm.bSize":"\u0627\u0646\u062F\u0627\u0632\u0647\u200C\u06CC \u0628\u0631\u0686\u0633\u0628","adm.bCopies":"\u062A\u0639\u062F\u0627\u062F \u0646\u0633\u062E\u0647 \u0628\u0631\u0627\u06CC \u0647\u0631 \u06A9\u0627\u0644\u0627","adm.bShowName":"\u0646\u0627\u0645 \u06A9\u0627\u0644\u0627","adm.bShowPrice":"\u0642\u06CC\u0645\u062A","adm.bShowBrand":"\u0628\u0631\u0646\u062F","adm.bShowSku":"\u06A9\u062F \u06A9\u0627\u0644\u0627","adm.bShowQr":"\u06A9\u062F QR \u0635\u0641\u062D\u0647\u200C\u06CC \u06A9\u0627\u0644\u0627","adm.bType":"\u0646\u0648\u0639 \u0628\u0627\u0631\u06A9\u062F","adm.bPrint":"\u0686\u0627\u067E \u0628\u0631\u0686\u0633\u0628\u200C\u0647\u0627","adm.bGenerate":"\u0633\u0627\u062E\u062A \u0628\u0627\u0631\u06A9\u062F \u062C\u062F\u06CC\u062F","adm.igPack":"\u0628\u0633\u062A\u0647\u0654 \u067E\u0633\u062A \u0627\u06CC\u0646\u0633\u062A\u0627\u06AF\u0631\u0627\u0645","adm.igCap":"\u0645\u062A\u0646 \u067E\u0633\u062A (\u0642\u0627\u0628\u0644 \u0648\u06CC\u0631\u0627\u06CC\u0634 \u0642\u0628\u0644 \u0627\u0632 \u06A9\u067E\u06CC)","adm.igTags":"\u0647\u0634\u062A\u06AF\u200C\u0647\u0627","adm.igImgHint":"\u062A\u0635\u0648\u06CC\u0631 \u067E\u0633\u062A\u061B \u062F\u0627\u0646\u0644\u0648\u062F\u0634 \u06A9\u0646 \u0648 \u0628\u0627 \u0645\u062A\u0646 \u06A9\u0646\u0627\u0631\u0634 \u062F\u0631 \u0627\u06CC\u0646\u0633\u062A\u0627\u06AF\u0631\u0627\u0645 \u0645\u0646\u062A\u0634\u0631 \u06A9\u0646.","adm.igDl":"\u062F\u0627\u0646\u0644\u0648\u062F \u062A\u0635\u0648\u06CC\u0631","adm.igNoImg":"\u0627\u06CC\u0646 \u06A9\u0627\u0644\u0627 \u062A\u0635\u0648\u06CC\u0631 \u0646\u062F\u0627\u0631\u062F\u061B \u0627\u0648\u0644 \u0627\u0632 \u0628\u062E\u0634 \xAB\u062C\u0633\u062A\u200C\u0648\u062C\u0648\u06CC \u062A\u0635\u0648\u06CC\u0631\xBB \u06CC\u0627 \u0628\u0627\u0631\u06AF\u0630\u0627\u0631\u06CC\u060C \u0639\u06A9\u0633 \u0628\u06AF\u0630\u0627\u0631.","adm.igCopyCap":"\u06A9\u067E\u06CC \u0645\u062A\u0646","adm.igCopyTags":"\u06A9\u067E\u06CC \u0647\u0634\u062A\u06AF\u200C\u0647\u0627","adm.igCopyAll":"\u06A9\u067E\u06CC \u0645\u062A\u0646 + \u0647\u0634\u062A\u06AF","adm.bGenerated":"\u0628\u0627\u0631\u06A9\u062F \u0633\u0627\u062E\u062A\u0647 \u0648 \u062B\u0628\u062A \u0634\u062F","adm.bScan":"\u0627\u0633\u06A9\u0646 \u0628\u0627\u0631\u06A9\u062F","adm.bScanMode":"\u062D\u0627\u0644\u062A \u0627\u0633\u06A9\u0646\u0631 (\u0647\u0645\u06AF\u0627\u0645\u200C\u0633\u0627\u0632\u06CC \u062F\u0633\u062A\u06AF\u0627\u0647)","adm.bScanHint":"\u062F\u0633\u062A\u06AF\u0627\u0647 \u0628\u0627\u0631\u06A9\u062F\u062E\u0648\u0627\u0646 \u0631\u0627 \u0645\u062B\u0644 \u06A9\u06CC\u0628\u0648\u0631\u062F \u0648\u0635\u0644 \u06A9\u0646\u061B \u0631\u0648\u06CC \u06A9\u0627\u062F\u0631 \u0632\u06CC\u0631 \u06A9\u0644\u06CC\u06A9 \u06A9\u0646 \u0648 \u0627\u0633\u06A9\u0646 \u06A9\u0646. \u0627\u0633\u06A9\u0646 \u0628\u0627 \u062F\u0648\u0631\u0628\u06CC\u0646 \u0647\u0645 \u06A9\u0627\u0631 \u0645\u06CC\u200C\u06A9\u0646\u062F.","adm.bConnected":"\u062F\u0633\u062A\u06AF\u0627\u0647 \u0645\u062A\u0635\u0644 \u0634\u062F \u2014 \u0622\u0645\u0627\u062F\u0647\u200C\u06CC \u0627\u0633\u06A9\u0646","adm.bSerial":"\u0627\u062A\u0635\u0627\u0644 \u0645\u0633\u062A\u0642\u06CC\u0645 \u0628\u0627 Web Serial","adm.bSerialHint":"\u0627\u06AF\u0631 \u062F\u0633\u062A\u06AF\u0627\u0647\u062A \u067E\u0648\u0631\u062A \u0633\u0631\u06CC\u0627\u0644 \u06CC\u0627 USB \u062F\u0627\u0631\u062F\u060C \u0627\u0632 \u0627\u06CC\u0646\u062C\u0627 \u0648\u0635\u0644 \u0634\u0648 (\u0641\u0642\u0637 \u06A9\u0631\u0648\u0645 \u0648 \u0627\u062C \u062F\u0633\u06A9\u062A\u0627\u067E).","adm.bSerialUnsupported":"\u0645\u0631\u0648\u0631\u06AF\u0631 \u062A\u0648 \u0627\u0632 Web Serial \u067E\u0634\u062A\u06CC\u0628\u0627\u0646\u06CC \u0646\u0645\u06CC\u200C\u06A9\u0646\u062F\u061B \u0627\u0632 \u062D\u0627\u0644\u062A \u06A9\u06CC\u0628\u0648\u0631\u062F \u06CC\u0627 \u062F\u0648\u0631\u0628\u06CC\u0646 \u0627\u0633\u062A\u0641\u0627\u062F\u0647 \u06A9\u0646.","adm.bSerialConnected":"\u0645\u062A\u0635\u0644 \u0634\u062F","adm.bSerialClosed":"\u0627\u062A\u0635\u0627\u0644 \u0628\u0633\u062A\u0647 \u0634\u062F","adm.bHistory":"\u0627\u0633\u06A9\u0646\u200C\u0647\u0627\u06CC \u0627\u062E\u06CC\u0631","adm.isTitle":"\u0627\u06CC\u0646\u062F\u06A9\u0633 \u062A\u0635\u0648\u06CC\u0631 \u0628\u0631\u0627\u06CC \u062C\u0633\u062A\u200C\u0648\u062C\u0648\u06CC \u062A\u0635\u0648\u06CC\u0631\u06CC","adm.isHint":"\u06CC\u06A9\u200C\u0628\u0627\u0631 \u0627\u06CC\u0646\u062F\u06A9\u0633 \u0631\u0627 \u0628\u0633\u0627\u0632 \u062A\u0627 \u0645\u0634\u062A\u0631\u06CC\u200C\u0647\u0627 \u0628\u062A\u0648\u0627\u0646\u0646\u062F \u0628\u0627 \u0639\u06A9\u0633 \u062C\u0633\u062A\u200C\u0648\u062C\u0648 \u06A9\u0646\u0646\u062F. \u062F\u0631 \u0645\u0631\u0648\u0631\u06AF\u0631 \u062E\u0648\u062F\u062A \u0627\u062C\u0631\u0627 \u0645\u06CC\u200C\u0634\u0648\u062F \u0648 \u0628\u0627\u0631\u06CC \u0631\u0648\u06CC \u0633\u0631\u0648\u0631 \u0646\u062F\u0627\u0631\u062F.","adm.isBuild":"\u0633\u0627\u062E\u062A \u0627\u06CC\u0646\u062F\u06A9\u0633","adm.isBuilding":"\u062F\u0631 \u062D\u0627\u0644 \u0627\u06CC\u0646\u062F\u06A9\u0633\u200C\u0633\u0627\u0632\u06CC\u2026","adm.isDone":"\u0627\u06CC\u0646\u062F\u06A9\u0633 \u0633\u0627\u062E\u062A\u0647 \u0634\u062F","adm.isCount":"\u062A\u0635\u0648\u06CC\u0631\u0647\u0627\u06CC \u0627\u06CC\u0646\u062F\u06A9\u0633\u200C\u0634\u062F\u0647","adm.auditAction":"\u0631\u0648\u06CC\u062F\u0627\u062F","adm.auditActor":"\u06A9\u0627\u0631\u0628\u0631","adm.auditTarget":"\u0645\u0648\u0636\u0648\u0639","adm.auditMeta":"\u062C\u0632\u0626\u06CC\u0627\u062A","adm.statsRevenue":"\u062F\u0631\u0622\u0645\u062F","adm.statsVisits":"\u0628\u0627\u0632\u062F\u06CC\u062F","adm.statsOrders":"\u0633\u0641\u0627\u0631\u0634","adm.statsByCat":"\u0639\u0645\u0644\u06A9\u0631\u062F \u062F\u0633\u062A\u0647\u200C\u0647\u0627","adm.statsByBrand":"\u0641\u0631\u0648\u0634 \u0628\u0631 \u0627\u0633\u0627\u0633 \u0628\u0631\u0646\u062F","adm.statsStockValue":"\u0627\u0631\u0632\u0634 \u0645\u0648\u062C\u0648\u062F\u06CC","adm.statsAvgOrder":"\u0645\u06CC\u0627\u0646\u06AF\u06CC\u0646 \u0633\u0628\u062F \u062E\u0631\u06CC\u062F","adm.exportProducts":"\u062E\u0631\u0648\u062C\u06CC \u06A9\u0627\u0644\u0627\u0647\u0627","adm.exportOrders":"\u062E\u0631\u0648\u062C\u06CC \u0633\u0641\u0627\u0631\u0634\u200C\u0647\u0627","adm.exportUsers":"\u062E\u0631\u0648\u062C\u06CC \u06A9\u0627\u0631\u0628\u0631\u0627\u0646","adm.exportReviews":"\u062E\u0631\u0648\u062C\u06CC \u0646\u0638\u0631\u0627\u062A","adm.exportTickets":"\u062E\u0631\u0648\u062C\u06CC \u062A\u06CC\u06A9\u062A\u200C\u0647\u0627","adm.exportAudit":"\u062E\u0631\u0648\u062C\u06CC \u0631\u0648\u06CC\u062F\u0627\u062F\u0647\u0627","adm.exportAll":"\u067E\u0634\u062A\u06CC\u0628\u0627\u0646 \u06A9\u0627\u0645\u0644 (JSON)","adm.backup":"\u0633\u0627\u062E\u062A \u067E\u0634\u062A\u06CC\u0628\u0627\u0646","adm.cleanup":"\u067E\u0627\u06A9\u200C\u0633\u0627\u0632\u06CC \u062F\u0627\u062F\u0647\u200C\u0647\u0627\u06CC \u0642\u062F\u06CC\u0645\u06CC","adm.cleanupDone":"\u067E\u0627\u06A9\u200C\u0633\u0627\u0632\u06CC \u0627\u0646\u062C\u0627\u0645 \u0634\u062F","adm.pageEditHint":"\u0645\u062A\u0646 \u0635\u0641\u062D\u0647\u200C\u0647\u0627 \u0631\u0627 \u0627\u06CC\u0646\u062C\u0627 \u0648\u06CC\u0631\u0627\u06CC\u0634 \u06A9\u0646\u061B \u062A\u063A\u06CC\u06CC\u0631\u0647\u0627 \u0641\u0648\u0631\u0627\u064B \u062F\u0631 \u0633\u0627\u06CC\u062A \u0627\u0639\u0645\u0627\u0644 \u0645\u06CC\u200C\u0634\u0648\u062F.","adm.noPermission":"\u0628\u0631\u0627\u06CC \u0627\u06CC\u0646 \u0628\u062E\u0634 \u062F\u0633\u062A\u0631\u0633\u06CC \u0646\u062F\u0627\u0631\u06CC. \u0627\u0632 \u0645\u0627\u0644\u06A9 \u0628\u062E\u0648\u0627\u0647 \u0622\u0646 \u0631\u0627 \u0641\u0639\u0627\u0644 \u06A9\u0646\u062F.","adm.liveView":"\u067E\u06CC\u0634\u200C\u0646\u0645\u0627\u06CC\u0634 \u0632\u0646\u062F\u0647\u200C\u06CC \u062A\u063A\u06CC\u06CC\u0631\u0627\u062A","adm.saved":"\u0630\u062E\u06CC\u0631\u0647 \u0634\u062F","st.pending_payment":"\u062F\u0631 \u0627\u0646\u062A\u0638\u0627\u0631 \u067E\u0631\u062F\u0627\u062E\u062A","st.pending_review":"\u062F\u0631 \u0627\u0646\u062A\u0638\u0627\u0631 \u0628\u0631\u0631\u0633\u06CC","st.confirmed":"\u062A\u0623\u06CC\u06CC\u062F \u0634\u062F\u0647","st.preparing":"\u062F\u0631 \u062D\u0627\u0644 \u0622\u0645\u0627\u062F\u0647\u200C\u0633\u0627\u0632\u06CC","st.ready_pickup":"\u0622\u0645\u0627\u062F\u0647\u200C\u06CC \u062A\u062D\u0648\u06CC\u0644 \u062D\u0636\u0648\u0631\u06CC","st.shipped":"\u0627\u0631\u0633\u0627\u0644 \u0634\u062F\u0647","st.delivered":"\u062A\u062D\u0648\u06CC\u0644 \u0634\u062F\u0647","st.cancelled":"\u0644\u063A\u0648 \u0634\u062F\u0647","st.refunded":"\u0628\u0627\u0632\u06AF\u0634\u062A \u0648\u062C\u0647","st.returned":"\u0645\u0631\u062C\u0648\u0639 \u0634\u062F\u0647","dl.pickup":"\u062A\u062D\u0648\u06CC\u0644 \u062D\u0636\u0648\u0631\u06CC","dl.courier":"\u0627\u0631\u0633\u0627\u0644 \u067E\u0633\u062A\u06CC","pm.wallet":"\u06A9\u06CC\u0641 \u067E\u0648\u0644","pm.gateway":"\u062F\u0631\u06AF\u0627\u0647 \u0628\u0627\u0646\u06A9\u06CC","pm.cod":"\u067E\u0631\u062F\u0627\u062E\u062A \u062F\u0631 \u0645\u062D\u0644","ps.unpaid":"\u067E\u0631\u062F\u0627\u062E\u062A\u200C\u0646\u0634\u062F\u0647","ps.paid":"\u067E\u0631\u062F\u0627\u062E\u062A\u200C\u0634\u062F\u0647","ps.pending":"\u062F\u0631 \u0627\u0646\u062A\u0638\u0627\u0631","ps.refunded":"\u0628\u0627\u0632\u06AF\u0634\u062A \u062F\u0627\u062F\u0647 \u0634\u062F","ps.failed":"\u0646\u0627\u0645\u0648\u0641\u0642","ps.cancelled":"\u0644\u063A\u0648 \u0634\u062F\u0647","tc.order":"\u067E\u06CC\u06AF\u06CC\u0631\u06CC \u0633\u0641\u0627\u0631\u0634","tc.return":"\u0645\u0631\u062C\u0648\u0639\u06CC \u0648 \u0628\u0627\u0632\u06AF\u0634\u062A \u0648\u062C\u0647","tc.product":"\u0633\u0624\u0627\u0644 \u062F\u0631\u0628\u0627\u0631\u0647\u200C\u06CC \u06A9\u0627\u0644\u0627","tc.technical":"\u0645\u0634\u06A9\u0644 \u0641\u0646\u06CC \u0633\u0627\u06CC\u062A","tc.complaint":"\u0634\u06A9\u0627\u06CC\u062A","tc.partnership":"\u0647\u0645\u06A9\u0627\u0631\u06CC \u0648 \u062A\u0628\u0644\u06CC\u063A\u0627\u062A","tc.account":"\u062D\u0633\u0627\u0628 \u06A9\u0627\u0631\u0628\u0631\u06CC \u0648 \u0627\u0645\u0646\u06CC\u062A","tc.other":"\u0633\u0627\u06CC\u0631 \u0645\u0648\u0627\u0631\u062F","tp.critical":"\u0628\u062D\u0631\u0627\u0646\u06CC","tp.high":"\u0632\u06CC\u0627\u062F","tp.normal":"\u0645\u0639\u0645\u0648\u0644\u06CC","tp.low":"\u06A9\u0645","ft.suggestion":"\u067E\u06CC\u0634\u0646\u0647\u0627\u062F","ft.complaint":"\u0634\u06A9\u0627\u06CC\u062A","ft.bug":"\u06AF\u0632\u0627\u0631\u0634 \u062E\u0637\u0627","fs.new":"\u062C\u062F\u06CC\u062F","fs.seen":"\u062F\u06CC\u062F\u0647 \u0634\u062F\u0647","fs.in_progress":"\u062F\u0631 \u062D\u0627\u0644 \u067E\u06CC\u06AF\u06CC\u0631\u06CC","fs.done":"\u0627\u0646\u062C\u0627\u0645 \u0634\u062F\u0647","fs.rejected":"\u0631\u062F \u0634\u062F\u0647","tk.open":"\u0628\u0627\u0632","tk.answered":"\u067E\u0627\u0633\u062E \u062F\u0627\u062F\u0647 \u0634\u062F\u0647","tk.closed":"\u0628\u0633\u062A\u0647","feat.wallet":"\u06A9\u06CC\u0641 \u067E\u0648\u0644","feat.plus":"\u0627\u0634\u062A\u0631\u0627\u06A9 \u067E\u0644\u0627\u0633","feat.insurance":"\u0628\u06CC\u0645\u0647\u200C\u06CC \u0645\u0631\u0633\u0648\u0644\u0647","feat.tickets":"\u0633\u0627\u0645\u0627\u0646\u0647\u200C\u06CC \u062A\u06CC\u06A9\u062A","feat.reviews":"\u0646\u0638\u0631\u0627\u062A \u0645\u0634\u062A\u0631\u06CC\u0627\u0646","feat.questions":"\u0633\u0624\u0627\u0644\u0627\u062A \u0645\u0634\u062A\u0631\u06CC\u0627\u0646","feat.ads":"\u062A\u0628\u0644\u06CC\u063A\u0627\u062A \u062F\u0627\u062E\u0644 \u0633\u0627\u06CC\u062A","feat.imageSearch":"\u062C\u0633\u062A\u200C\u0648\u062C\u0648\u06CC \u062A\u0635\u0648\u06CC\u0631\u06CC","feat.barcode":"\u0628\u0627\u0631\u06A9\u062F \u0648 \u0628\u0631\u0686\u0633\u0628","feat.priceCheckDevice":"\u062D\u0627\u0644\u062A \u0646\u0645\u0627\u06CC\u0634 \u0642\u06CC\u0645\u062A","feat.publicStats":"\u0622\u0645\u0627\u0631 \u0639\u0645\u0648\u0645\u06CC","feat.coupons":"\u06A9\u062F\u0647\u0627\u06CC \u062A\u062E\u0641\u06CC\u0641","feat.consent":"\u0645\u0648\u062F\u0627\u0644 \u062A\u0648\u0627\u0641\u0642 \u06A9\u0648\u06A9\u06CC (\u0627\u0648\u0644\u06CC\u0646 \u0628\u0627\u0632\u062F\u06CC\u062F)","feat.liveSupport":"\u0686\u062A \u067E\u0634\u062A\u06CC\u0628\u0627\u0646\u06CC \u0622\u0646\u0644\u0627\u06CC\u0646","feat.announcements":"\u0627\u0639\u0644\u0627\u0646\u200C\u0647\u0627","feat.wishlist":"\u0644\u06CC\u0633\u062A \u0645\u0646","feat.compare":"\u0645\u0642\u0627\u06CC\u0633\u0647\u200C\u06CC \u06A9\u0627\u0644\u0627","feat.recentlyViewed":"\u06A9\u0627\u0644\u0627\u0647\u0627\u06CC \u062F\u06CC\u062F\u0647\u200C\u0634\u062F\u0647","feat.guestCheckout":"\u062E\u0631\u06CC\u062F \u0628\u062F\u0648\u0646 \u062D\u0633\u0627\u0628 \u06A9\u0627\u0631\u0628\u0631\u06CC","feat.priceAlerts":"\u0627\u0639\u0644\u0627\u0646 \u0645\u0648\u062C\u0648\u062F \u0634\u062F\u0646 \u06A9\u0627\u0644\u0627","feat.twoFactor":"\u0648\u0631\u0648\u062F \u062F\u0648\u0645\u0631\u062D\u0644\u0647\u200C\u0627\u06CC","feat.referrals":"\u06A9\u062F \u0645\u0639\u0631\u0641","feat.voiceSearch":"\u062C\u0633\u062A\u200C\u0648\u062C\u0648\u06CC \u0635\u0648\u062A\u06CC","feat.offlineMode":"\u062D\u0627\u0644\u062A \u0622\u0641\u0644\u0627\u06CC\u0646","feat.captcha":"\u06A9\u067E\u0686\u0627 (\u0645\u0646 \u0631\u0628\u0627\u062A \u0646\u06CC\u0633\u062A\u0645)","captcha.required":"\u0628\u0631\u0627\u06CC \u0648\u0631\u0648\u062F\u060C \u0627\u0648\u0644 \u062A\u0623\u06CC\u06CC\u062F \u06A9\u0646 \u06A9\u0647 \u0631\u0628\u0627\u062A \u0646\u06CC\u0633\u062A\u06CC: \u062A\u06CC\u06A9 \u0628\u0632\u0646 \u0648 \u062D\u0627\u0635\u0644 \u0639\u0628\u0627\u0631\u062A \u0631\u0627 \u0628\u0646\u0648\u06CC\u0633.","captcha.label":"\u0645\u0646 \u0631\u0628\u0627\u062A \u0646\u06CC\u0633\u062A\u0645","captcha.hint":"\u062A\u06CC\u06A9 \u0628\u0632\u0646\u060C \u0628\u0639\u062F \u062D\u0627\u0635\u0644 \u0639\u0628\u0627\u0631\u062A \u062A\u0635\u0648\u06CC\u0631 \u0631\u0627 \u0628\u0646\u0648\u06CC\u0633","captcha.placeholder":"\u062D\u0627\u0635\u0644 \u0639\u0628\u0627\u0631\u062A","captcha.solved":"\u062A\u0623\u06CC\u06CC\u062F \u0634\u062F \u06A9\u0647 \u0631\u0628\u0627\u062A \u0646\u06CC\u0633\u062A\u06CC \u2714","captcha.refresh":"\u0633\u0624\u0627\u0644 \u062A\u0627\u0632\u0647","perm.dashboard.view":"\u0645\u0634\u0627\u0647\u062F\u0647\u200C\u06CC \u062F\u0627\u0634\u0628\u0648\u0631\u062F","perm.products.view":"\u0645\u0634\u0627\u0647\u062F\u0647\u200C\u06CC \u06A9\u0627\u0644\u0627\u0647\u0627","perm.products.create":"\u0627\u06CC\u062C\u0627\u062F \u06A9\u0627\u0644\u0627","perm.products.edit":"\u0648\u06CC\u0631\u0627\u06CC\u0634 \u06A9\u0627\u0644\u0627","perm.products.delete":"\u062D\u0630\u0641 \u06A9\u0627\u0644\u0627","perm.products.price":"\u062A\u063A\u06CC\u06CC\u0631 \u0642\u06CC\u0645\u062A \u0648 \u062A\u062E\u0641\u06CC\u0641","perm.products.stock":"\u062A\u063A\u06CC\u06CC\u0631 \u0645\u0648\u062C\u0648\u062F\u06CC","perm.categories.manage":"\u0645\u062F\u06CC\u0631\u06CC\u062A \u062F\u0633\u062A\u0647\u200C\u0647\u0627 \u0648 \u0628\u0631\u0646\u062F\u0647\u0627","perm.orders.view":"\u0645\u0634\u0627\u0647\u062F\u0647\u200C\u06CC \u0633\u0641\u0627\u0631\u0634\u200C\u0647\u0627","perm.orders.manage":"\u062A\u063A\u06CC\u06CC\u0631 \u0648\u0636\u0639\u06CC\u062A \u0633\u0641\u0627\u0631\u0634","perm.refunds.manage":"\u0645\u0631\u062C\u0648\u0639\u06CC \u0648 \u0644\u063A\u0648 \u0633\u0641\u0627\u0631\u0634","perm.reviews.moderate":"\u062A\u0623\u06CC\u06CC\u062F \u0648 \u0645\u062F\u06CC\u0631\u06CC\u062A \u0646\u0638\u0631\u0627\u062A","perm.reviews.reply":"\u067E\u0627\u0633\u062E \u0628\u0647 \u0646\u0638\u0631\u0627\u062A","perm.tickets.manage":"\u0645\u062F\u06CC\u0631\u06CC\u062A \u062A\u06CC\u06A9\u062A\u200C\u0647\u0627","perm.feedback.manage":"\u0628\u0627\u0632\u062E\u0648\u0631\u062F\u0647\u0627 \u0648 \u062E\u0637\u0627\u0647\u0627","perm.users.view":"\u0645\u0634\u0627\u0647\u062F\u0647\u200C\u06CC \u06A9\u0627\u0631\u0628\u0631\u0627\u0646","perm.users.manage":"\u0645\u062F\u06CC\u0631\u06CC\u062A \u06A9\u0627\u0631\u0628\u0631\u0627\u0646","perm.users.permissions":"\u062A\u0639\u06CC\u06CC\u0646 \u062F\u0633\u062A\u0631\u0633\u06CC\u200C\u0647\u0627","perm.wallet.manage":"\u0645\u062F\u06CC\u0631\u06CC\u062A \u06A9\u06CC\u0641 \u067E\u0648\u0644","perm.plus.manage":"\u0645\u062F\u06CC\u0631\u06CC\u062A \u0627\u0634\u062A\u0631\u0627\u06A9 \u067E\u0644\u0627\u0633","perm.coupons.manage":"\u0645\u062F\u06CC\u0631\u06CC\u062A \u06A9\u062F\u0647\u0627\u06CC \u062A\u062E\u0641\u06CC\u0641","perm.ads.manage":"\u0645\u062F\u06CC\u0631\u06CC\u062A \u062A\u0628\u0644\u06CC\u063A\u0627\u062A","perm.notifications.send":"\u0627\u0631\u0633\u0627\u0644 \u0627\u0639\u0644\u0627\u0646","perm.settings.edit":"\u062A\u0646\u0638\u06CC\u0645\u0627\u062A \u0641\u0631\u0648\u0634\u06AF\u0627\u0647","perm.theme.edit":"\u067E\u0648\u0633\u062A\u0647 \u0648 \u0686\u06CC\u062F\u0645\u0627\u0646","perm.pages.edit":"\u0648\u06CC\u0631\u0627\u06CC\u0634 \u0645\u062D\u062A\u0648\u0627\u06CC \u0635\u0641\u062D\u0647\u200C\u0647\u0627","perm.barcode.print":"\u0686\u0627\u067E \u0628\u0631\u0686\u0633\u0628","perm.barcode.scan":"\u0627\u0633\u06A9\u0646 \u0648 \u0646\u0645\u0627\u06CC\u0634 \u0642\u06CC\u0645\u062A","perm.imagesearch.index":"\u0627\u06CC\u0646\u062F\u06A9\u0633 \u062A\u0635\u0648\u06CC\u0631\u06CC","perm.audit.view":"\u06AF\u0632\u0627\u0631\u0634 \u0631\u0648\u06CC\u062F\u0627\u062F\u0647\u0627","perm.stats.view":"\u0622\u0645\u0627\u0631","perm.data.export":"\u062E\u0631\u0648\u062C\u06CC \u062F\u0627\u062F\u0647\u200C\u0647\u0627","misc.quickView":"\u0645\u0634\u0627\u0647\u062F\u0647\u200C\u06CC \u0633\u0631\u06CC\u0639","misc.addToHome":"\u0627\u0641\u0632\u0648\u062F\u0646 \u0628\u0647 \u0635\u0641\u062D\u0647\u200C\u06CC \u0627\u0635\u0644\u06CC","misc.installHint":"\u062F\u0631 \u0645\u0646\u0648\u06CC \u0645\u0631\u0648\u0631\u06AF\u0631\u060C \u06AF\u0632\u06CC\u0646\u0647\u200C\u06CC \xABAdd to Home screen\xBB \u06CC\u0627 \xABInstall\xBB \u0631\u0627 \u0628\u0632\u0646.","misc.printBlocked":"\u067E\u0646\u062C\u0631\u0647\u200C\u06CC \u0686\u0627\u067E \u0628\u0627\u0632 \u0646\u0634\u062F\u061B \u0644\u0637\u0641\u0627\u064B \u067E\u0627\u067E\u200C\u0622\u067E \u0631\u0627 \u0645\u062C\u0627\u0632 \u06A9\u0646.","misc.saved":"\u0630\u062E\u06CC\u0631\u0647 \u0634\u062F","misc.deleted":"\u062D\u0630\u0641 \u0634\u062F","misc.updated":"\u0628\u0647\u200C\u0631\u0648\u0632\u0631\u0633\u0627\u0646\u06CC \u0634\u062F","misc.confirmDelete":"\u0627\u06CC\u0646 \u0645\u0648\u0631\u062F \u062D\u0630\u0641 \u0634\u0648\u062F\u061F","misc.loadingMore":"\u062F\u0631 \u062D\u0627\u0644 \u0628\u0627\u0631\u06AF\u0630\u0627\u0631\u06CC\u2026","misc.recentlyViewed":"\u06A9\u0627\u0644\u0627\u0647\u0627\u06CC \u062F\u06CC\u062F\u0647\u200C\u0634\u062F\u0647","misc.uiSound":"\u0635\u062F\u0627\u06CC \u06A9\u0644\u06CC\u06A9 \u0631\u0627\u0628\u0637","misc.uiSoundOn":"\u0635\u062F\u0627\u06CC \u06A9\u0644\u06CC\u06A9 \u0631\u0648\u0634\u0646 \u0634\u062F","misc.uiSoundOff":"\u0635\u062F\u0627\u06CC \u06A9\u0644\u06CC\u06A9 \u062E\u0627\u0645\u0648\u0634 \u0634\u062F","misc.shareDone":"\u0644\u06CC\u0646\u06A9 \u06A9\u067E\u06CC \u0634\u062F","misc.shareNative":"\u0627\u0634\u062A\u0631\u0627\u06A9\u200C\u06AF\u0630\u0627\u0631\u06CC","img.alt":"\u062A\u0635\u0648\u06CC\u0631 \u06A9\u0627\u0644\u0627","adm.view":"\u0645\u0634\u0627\u0647\u062F\u0647","adm.support":"\u0686\u062A \u067E\u0634\u062A\u06CC\u0628\u0627\u0646\u06CC","adm.supSelect":"\u06CC\u06A9 \u06AF\u0641\u062A\u200C\u0648\u06AF\u0648 \u0631\u0627 \u0627\u0646\u062A\u062E\u0627\u0628 \u06A9\u0646","adm.supSelectHint":"\u0627\u0632 \u0641\u0647\u0631\u0633\u062A \u06A9\u0646\u0627\u0631\u060C \u06AF\u0641\u062A\u200C\u0648\u06AF\u0648\u06CC \u06A9\u0627\u0631\u0628\u0631 \u0631\u0627 \u0628\u0627\u0632 \u06A9\u0646 \u062A\u0627 \u067E\u0627\u0633\u062E \u0628\u062F\u0647\u06CC.","adm.tkReply":"\u067E\u0627\u0633\u062E \u067E\u0634\u062A\u06CC\u0628\u0627\u0646\u06CC","adm.tkManage":"\u0645\u062F\u06CC\u0631\u06CC\u062A \u062A\u06CC\u06A9\u062A","common.updated":"\u0628\u0647\u200C\u0631\u0648\u0632\u0631\u0633\u0627\u0646\u06CC","common.link":"\u0644\u06CC\u0646\u06A9","common.text":"\u0645\u062A\u0646","cart.coupon":"\u06A9\u062F \u062A\u062E\u0641\u06CC\u0641","misc.sent":"\u0627\u0631\u0633\u0627\u0644 \u0634\u062F","misc.copied":"\u06A9\u067E\u06CC \u0634\u062F","adm.revPending":"\u062F\u0631 \u0627\u0646\u062A\u0638\u0627\u0631 \u0628\u0631\u0631\u0633\u06CC","adm.revApproved":"\u0645\u0646\u062A\u0634\u0631\u0634\u062F\u0647","adm.revRejected":"\u0631\u062F\u0634\u062F\u0647","adm.revApprove":"\u0627\u0646\u062A\u0634\u0627\u0631","adm.revReject":"\u0631\u062F","adm.revReply":"\u067E\u0627\u0633\u062E \u0641\u0631\u0648\u0634\u06AF\u0627\u0647","adm.revEmpty":"\u0645\u0648\u0631\u062F\u06CC \u062F\u0631 \u0627\u06CC\u0646 \u0648\u0636\u0639\u06CC\u062A \u0646\u06CC\u0633\u062A","adm.revEmptyHint":"\u0646\u0638\u0631 \u06CC\u0627 \u067E\u0631\u0633\u0634 \u062A\u0627\u0632\u0647\u200C\u0627\u06CC \u0628\u0631\u0627\u06CC \u0628\u0631\u0631\u0633\u06CC \u0648\u062C\u0648\u062F \u0646\u062F\u0627\u0631\u062F.","rev.buyer":"\u062E\u0631\u06CC\u062F\u0627\u0631","rev.visitor":"\u0628\u0627\u0632\u062F\u06CC\u062F\u06A9\u0646\u0646\u062F\u0647","rev.shopReply":"\u067E\u0627\u0633\u062E \u0641\u0631\u0648\u0634\u06AF\u0627\u0647","fb.new":"\u062C\u062F\u06CC\u062F","fb.seen":"\u062F\u06CC\u062F\u0647 \u0634\u062F","fb.inProgress":"\u062F\u0631 \u062D\u0627\u0644 \u0628\u0631\u0631\u0633\u06CC","fb.done":"\u0627\u0646\u062C\u0627\u0645 \u0634\u062F","fb.rejected":"\u0631\u062F \u0634\u062F","feedback.suggestion":"\u067E\u06CC\u0634\u0646\u0647\u0627\u062F","feedback.complaint":"\u0634\u06A9\u0627\u06CC\u062A","feedback.bug":"\u06AF\u0632\u0627\u0631\u0634 \u062E\u0637\u0627","adm.fbEmptyHint":"\u067E\u06CC\u0634\u0646\u0647\u0627\u062F\u060C \u0634\u06A9\u0627\u06CC\u062A \u06CC\u0627 \u06AF\u0632\u0627\u0631\u0634 \u062E\u0637\u0627\u06CC\u06CC \u062B\u0628\u062A \u0646\u0634\u062F\u0647 \u0627\u0633\u062A.","adm.cpNew":"\u06A9\u062F \u062A\u062E\u0641\u06CC\u0641 \u062C\u062F\u06CC\u062F","adm.cpPercent":"\u062F\u0631\u0635\u062F\u06CC","adm.cpAmount":"\u0645\u0628\u0644\u063A\u06CC","adm.cpValue":"\u0645\u0642\u062F\u0627\u0631","adm.cpUsage":"\u0627\u0633\u062A\u0641\u0627\u062F\u0647","adm.cpDates":"\u0628\u0627\u0632\u0647\u200C\u06CC \u0627\u0639\u062A\u0628\u0627\u0631","adm.cpStart":"\u0634\u0631\u0648\u0639","adm.cpEnd":"\u067E\u0627\u06CC\u0627\u0646","adm.cpExpired":"\u0645\u0646\u0642\u0636\u06CC","adm.adNew":"\u0628\u0646\u0631 \u062C\u062F\u06CC\u062F","adm.adSlot":"\u062C\u0627\u06CC\u06AF\u0627\u0647 \u0646\u0645\u0627\u06CC\u0634","adm.adsHint":"\u0628\u0646\u0631\u0647\u0627 \u0631\u0627 \u062F\u0631 \u0647\u0631 \u062C\u0627\u06CC \u0633\u0627\u06CC\u062A \u0632\u0645\u0627\u0646\u200C\u0628\u0646\u062F\u06CC\u060C \u0641\u0639\u0627\u0644 \u06CC\u0627 \u063A\u06CC\u0631\u0641\u0639\u0627\u0644 \u06A9\u0646.","adm.notifNew":"\u0627\u0639\u0644\u0627\u0646 \u062C\u062F\u06CC\u062F","adm.notifHint":"\u0627\u0639\u0644\u0627\u0646 \u0631\u0627 \u0628\u0631\u0627\u06CC \u0647\u0645\u0647\u200C\u06CC \u06A9\u0627\u0631\u0628\u0631\u0627\u0646 \u06CC\u0627 \u06CC\u06A9 \u06A9\u0627\u0631\u0628\u0631 \u062E\u0627\u0635 \u0628\u0641\u0631\u0633\u062A.","adm.notifLevel":"\u0633\u0637\u062D","adm.notifRecent":"\u0627\u0639\u0644\u0627\u0646\u200C\u0647\u0627\u06CC \u0627\u062E\u06CC\u0631","notif.level.info":"\u0627\u0637\u0644\u0627\u0639","notif.level.success":"\u0645\u0648\u0641\u0642","notif.level.warning":"\u0647\u0634\u062F\u0627\u0631","notif.level.error":"\u062E\u0637\u0627","adm.pagesPick":"\u06CC\u06A9 \u0635\u0641\u062D\u0647 \u0631\u0627 \u0627\u0646\u062A\u062E\u0627\u0628 \u06A9\u0646","adm.pagesPickHint":"\u0627\u0632 \u0641\u0647\u0631\u0633\u062A \u06A9\u0646\u0627\u0631\u060C \u0635\u0641\u062D\u0647\u200C\u0627\u06CC \u0631\u0627 \u06A9\u0647 \u0645\u06CC\u200C\u062E\u0648\u0627\u0647\u06CC \u0648\u06CC\u0631\u0627\u06CC\u0634 \u06A9\u0646\u06CC \u0627\u0646\u062A\u062E\u0627\u0628 \u06A9\u0646.","adm.pgHint":"\u062A\u063A\u06CC\u06CC\u0631\u0647\u0627 \u0641\u0642\u0637 \u0645\u062A\u0646\u200C\u0627\u0646\u062F \u0648 \u0628\u0644\u0627\u0641\u0627\u0635\u0644\u0647 \u0631\u0648\u06CC \u0635\u0641\u062D\u0647 \u0627\u0639\u0645\u0627\u0644 \u0645\u06CC\u200C\u0634\u0648\u0646\u062F.","adm.bPrinter":"\u0686\u0627\u067E\u06AF\u0631 \u0628\u0631\u0686\u0633\u0628","adm.bPrinterHint":"\u0628\u0631\u0686\u0633\u0628\u200C\u0647\u0627 \u0627\u0632 \u0631\u0627\u0647 \u06AF\u0641\u062A\u200C\u0648\u06AF\u0648\u06CC \u0686\u0627\u067E \u0645\u0631\u0648\u0631\u06AF\u0631 \u0628\u0647 \u0686\u0627\u067E\u06AF\u0631 \u0641\u0631\u0633\u062A\u0627\u062F\u0647 \u0645\u06CC\u200C\u0634\u0648\u0646\u062F.","adm.bScanner":"\u0628\u0627\u0631\u06A9\u062F\u062E\u0648\u0627\u0646","adm.bLabels":"\u0633\u0627\u062E\u062A \u0648 \u0686\u0627\u067E \u0628\u0631\u0686\u0633\u0628","adm.bPreview":"\u067E\u06CC\u0634\u200C\u0646\u0645\u0627\u06CC\u0634 \u0628\u0631\u0686\u0633\u0628","adm.bPriceMode":"\u062D\u0627\u0644\u062A \u0646\u0645\u0627\u06CC\u0634 \u0642\u06CC\u0645\u062A","adm.bFound":"\u06A9\u0627\u0644\u0627 \u067E\u06CC\u062F\u0627 \u0634\u062F","adm.bNotFound":"\u06A9\u0627\u0644\u0627\u06CC\u06CC \u0628\u0627 \u0627\u06CC\u0646 \u0628\u0627\u0631\u06A9\u062F \u067E\u06CC\u062F\u0627 \u0646\u0634\u062F.","adm.bPickFirst":"\u0627\u0648\u0644 \u062F\u0633\u062A\u200C\u06A9\u0645 \u06CC\u06A9 \u06A9\u0627\u0644\u0627 \u0631\u0627 \u0627\u0646\u062A\u062E\u0627\u0628 \u06A9\u0646.","adm.ixHint":"\u0627\u062B\u0631\u0627\u0646\u06AF\u0634\u062A \u062A\u0635\u0648\u06CC\u0631 \u0647\u0631 \u06A9\u0627\u0644\u0627 \u062F\u0631 \u0645\u0631\u0648\u0631\u06AF\u0631 \u0645\u062D\u0627\u0633\u0628\u0647 \u0648 \u0630\u062E\u06CC\u0631\u0647 \u0645\u06CC\u200C\u0634\u0648\u062F \u062A\u0627 \u062C\u0633\u062A\u200C\u0648\u062C\u0648\u06CC \u062A\u0635\u0648\u06CC\u0631\u06CC \u06A9\u0627\u0631 \u06A9\u0646\u062F.","adm.ixIndex":"\u0627\u06CC\u0646\u062F\u06A9\u0633 \u062A\u0635\u0627\u0648\u06CC\u0631 \u0628\u0627\u0642\u06CC\u200C\u0645\u0627\u0646\u062F\u0647","adm.ixReindex":"\u0627\u06CC\u0646\u062F\u06A9\u0633 \u062F\u0648\u0628\u0627\u0631\u0647\u200C\u06CC \u0647\u0645\u0647","adm.ixDone":"\u0627\u06CC\u0646\u062F\u06A9\u0633 \u0627\u0646\u062C\u0627\u0645 \u0634\u062F","adm.audActor":"\u06A9\u0627\u0631\u0628\u0631","adm.audAction":"\u0631\u0648\u06CC\u062F\u0627\u062F","adm.audTarget":"\u0647\u062F\u0641","adm.audMeta":"\u062C\u0632\u0626\u06CC\u0627\u062A","adm.stOrders":"\u0633\u0641\u0627\u0631\u0634\u200C\u0647\u0627","adm.stRevenue":"\u062F\u0631\u0622\u0645\u062F","adm.stVisits":"\u0628\u0627\u0632\u062F\u06CC\u062F\u0647\u0627","adm.stUsers":"\u06A9\u0627\u0631\u0628\u0631\u0627\u0646","adm.stProducts":"\u06A9\u0627\u0644\u0627\u0647\u0627","adm.stAvg":"\u0645\u06CC\u0627\u0646\u06AF\u06CC\u0646 \u0633\u0641\u0627\u0631\u0634","adm.stByCat":"\u0639\u0645\u0644\u06A9\u0631\u062F \u062F\u0633\u062A\u0647\u200C\u0647\u0627","adm.stByBrand":"\u067E\u0631\u0641\u0631\u0648\u0634\u200C\u062A\u0631\u06CC\u0646 \u0628\u0631\u0646\u062F\u0647\u0627","adm.data":"\u062F\u0627\u062F\u0647\u200C\u0647\u0627","adm.dataHint":"\u062E\u0631\u0648\u062C\u06CC \u06AF\u0631\u0641\u062A\u0646\u060C \u067E\u0634\u062A\u06CC\u0628\u0627\u0646\u200C\u06AF\u06CC\u0631\u06CC \u0648 \u067E\u0627\u06A9\u200C\u0633\u0627\u0632\u06CC \u062F\u0627\u062F\u0647\u200C\u0647\u0627.","adm.dExport":"\u062E\u0631\u0648\u062C\u06CC","adm.dBackup":"\u067E\u0634\u062A\u06CC\u0628\u0627\u0646\u200C\u06AF\u06CC\u0631\u06CC","adm.dBackupHint":"\u06CC\u06A9 \u0646\u0633\u062E\u0647\u200C\u06CC \u06A9\u0627\u0645\u0644 \u0627\u0632 \u067E\u0627\u06CC\u06AF\u0627\u0647\u200C\u062F\u0627\u062F\u0647 \u062F\u0631 \u067E\u0648\u0634\u0647\u200C\u06CC data \u0630\u062E\u06CC\u0631\u0647 \u0645\u06CC\u200C\u0634\u0648\u062F.","adm.dCleanup":"\u067E\u0627\u06A9\u200C\u0633\u0627\u0632\u06CC","adm.dCleanupHint":"\u0631\u0648\u06CC\u062F\u0627\u062F\u0647\u0627\u06CC \u0642\u062F\u06CC\u0645\u06CC\u200C\u062A\u0631 \u0627\u0632 \u06F9\u06F0 \u0631\u0648\u0632 \u0648 \u0646\u0634\u0633\u062A\u200C\u0647\u0627\u06CC \u0645\u0646\u0642\u0636\u06CC \u062D\u0630\u0641 \u0645\u06CC\u200C\u0634\u0648\u0646\u062F.","sys.turnOn":"\u0631\u0648\u0634\u0646 \u06A9\u0631\u062F\u0646 \u0641\u0631\u0648\u0634\u06AF\u0627\u0647","sys.turnOff":"\u062E\u0627\u0645\u0648\u0634 \u06A9\u0631\u062F\u0646 \u0641\u0631\u0648\u0634\u06AF\u0627\u0647","sys.offConfirm":"\u0645\u0637\u0645\u0626\u0646\u06CC\u061F \u062A\u0627 \u0648\u0642\u062A\u06CC \u062E\u0648\u062F\u062A \u0631\u0648\u0634\u0646\u0634 \u0646\u06A9\u0646\u06CC \u0647\u06CC\u0686\u200C\u06A9\u0633 \u0646\u0645\u06CC\u200C\u062A\u0648\u0627\u0646\u062F \u062E\u0631\u06CC\u062F \u06A9\u0646\u062F.","sys.autoWakeMins":"\u0631\u0648\u0634\u0646 \u0634\u062F\u0646 \u062E\u0648\u062F\u06A9\u0627\u0631 \u0628\u0639\u062F \u0627\u0632 \u0686\u0646\u062F \u062F\u0642\u06CC\u0642\u0647 (\u06F0 = \u0647\u06CC\u0686\u200C\u0648\u0642\u062A)","sys.asleep":"\u0641\u0631\u0648\u0634\u06AF\u0627\u0647 \u062E\u0627\u0645\u0648\u0634 \u0634\u062F.","sys.asleepTimed":"\u0641\u0631\u0648\u0634\u06AF\u0627\u0647 \u062E\u0627\u0645\u0648\u0634 \u0634\u062F\u061B {n} \u062F\u0642\u06CC\u0642\u0647 \u062F\u06CC\u06AF\u0631 \u062E\u0648\u062F\u06A9\u0627\u0631 \u0631\u0648\u0634\u0646 \u0645\u06CC\u200C\u0634\u0648\u062F.","sys.awake":"\u0641\u0631\u0648\u0634\u06AF\u0627\u0647 \u0631\u0648\u0634\u0646 \u0634\u062F.","sys.sleepBanner":"\u0641\u0631\u0648\u0634\u06AF\u0627\u0647 \u0627\u0644\u0627\u0646 \u062E\u0627\u0645\u0648\u0634 \u0627\u0633\u062A. \u0628\u0627 \u062F\u06A9\u0645\u0647\u200C\u06CC \xAB\u0631\u0648\u0634\u0646 \u06A9\u0631\u062F\u0646 \u0641\u0631\u0648\u0634\u06AF\u0627\u0647\xBB \u0628\u0627\u0644\u0627\u06CC \u0647\u0645\u06CC\u0646 \u0635\u0641\u062D\u0647 \u062F\u0648\u0628\u0627\u0631\u0647 \u0631\u0648\u0634\u0646\u0634 \u06A9\u0646.","sys.keepAlive":"\u0646\u06AF\u0647\u200C\u062F\u0627\u0634\u062A\u0646 \u0633\u0631\u0648\u06CC\u0633 \u0641\u0639\u0627\u0644","checkout.guestInfo":"\u0627\u0637\u0644\u0627\u0639\u0627\u062A \u062A\u0645\u0627\u0633 \u0645\u0647\u0645\u0627\u0646","checkout.guestHint":"\u0628\u062F\u0648\u0646 \u0633\u0627\u062E\u062A \u062D\u0633\u0627\u0628 \u062E\u0631\u06CC\u062F \u0645\u06CC\u200C\u06A9\u0646\u06CC\u061B \u0641\u0642\u0637 \u0628\u0631\u0627\u06CC \u0647\u0645\u0627\u0647\u0646\u06AF\u06CC \u062A\u062D\u0648\u06CC\u0644 \u0628\u0647 \u0627\u06CC\u0646 \u0627\u0637\u0644\u0627\u0639\u0627\u062A \u0646\u06CC\u0627\u0632 \u062F\u0627\u0631\u06CC\u0645.","checkout.guestName":"\u0646\u0627\u0645 \u0648 \u0646\u0627\u0645 \u062E\u0627\u0646\u0648\u0627\u062F\u06AF\u06CC","checkout.guestPhone":"\u0634\u0645\u0627\u0631\u0647\u200C\u06CC \u0645\u0648\u0628\u0627\u06CC\u0644","checkout.guestPhoneHint":"\u0645\u062B\u0644\u0627\u064B \u06F0\u06F9\u06F1\u06F2\u06F3\u06F4\u06F5\u06F6\u06F7\u06F8\u06F9","checkout.guestNameRequired":"\u0646\u0627\u0645 \u062E\u0648\u062F \u0631\u0627 \u0628\u0646\u0648\u06CC\u0633.","checkout.guestPhoneInvalid":"\u0634\u0645\u0627\u0631\u0647\u200C\u06CC \u0645\u0648\u0628\u0627\u06CC\u0644 \u0628\u0627\u06CC\u062F \u06F1\u06F1 \u0631\u0642\u0645 \u0648 \u0628\u0627 \u06F0\u06F9 \u0634\u0631\u0648\u0639 \u0634\u0648\u062F.","checkout.guestCodPickup":"\u067E\u0631\u062F\u0627\u062E\u062A \u062F\u0631 \u0645\u062D\u0644 \u0641\u0642\u0637 \u0628\u0631\u0627\u06CC \u0627\u0631\u0633\u0627\u0644 \u067E\u0633\u062A\u06CC \u0645\u0645\u06A9\u0646 \u0627\u0633\u062A\u061B \u0628\u0631\u0627\u06CC \u062A\u062D\u0648\u06CC\u0644 \u062D\u0636\u0648\u0631\u06CC\u060C \u0622\u0646\u0644\u0627\u06CC\u0646 \u067E\u0631\u062F\u0627\u062E\u062A \u06A9\u0646 \u06CC\u0627 \u0648\u0627\u0631\u062F \u062D\u0633\u0627\u0628 \u0634\u0648.","home.recent":"\u0627\u062F\u0627\u0645\u0647\u200C\u06CC \u0628\u0627\u0632\u062F\u06CC\u062F\u0647\u0627\u06CC \u0634\u0645\u0627","home.recentSub":"\u06A9\u0627\u0644\u0627\u0647\u0627\u06CC\u06CC \u06A9\u0647 \u0627\u062E\u06CC\u0631\u0627\u064B \u062F\u06CC\u062F\u0647\u200C\u0627\u06CC","checkout.guestCourierNote":"\u0628\u0631\u0627\u06CC \u0627\u0631\u0633\u0627\u0644 \u067E\u0633\u062A\u06CC \u0648\u0627\u0631\u062F \u062D\u0633\u0627\u0628 \u0634\u0648"},ro={"app.name":"Yassaei Electronics","app.tagline":"Electronics & electrical supplies","common.loading":"Loading\u2026","common.save":"Save","common.saving":"Saving\u2026","common.cancel":"Cancel","common.close":"Close","common.confirm":"Confirm","common.delete":"Delete","common.edit":"Edit","common.add":"Add","common.create":"Create","common.update":"Update","common.search":"Search","common.filter":"Filter","common.filters":"Filters","common.sort":"Sort","common.all":"All","common.none":"None","common.more":"More","common.less":"Less","common.showAll":"View all","common.back":"Back","common.next":"Next","common.prev":"Previous","common.yes":"Yes","common.no":"No","common.optional":"Optional","common.required":"Required","common.copy":"Copy","common.copied":"Copied","common.share":"Share","common.download":"Download","common.upload":"Upload","common.print":"Print","common.refresh":"Refresh","common.retry":"Try again","common.send":"Send","common.sent":"Sent","common.submit":"Submit","common.reply":"Reply","common.view":"View","common.details":"Details","common.status":"Status","common.date":"Date","common.time":"Time","common.amount":"Amount","common.count":"Quantity","common.total":"Total","common.price":"Price","common.stock":"Stock","common.available":"In stock","common.unavailable":"Out of stock","common.inStock":"Available in stock","common.lowStock":"Fewer than 3 left","common.notifyMe":"Notify me when available","common.notified":"We will let you know as soon as it is back","common.category":"Category","common.brand":"Brand","common.product":"Product","common.products":"Products","common.order":"Order","common.orders":"Orders","common.user":"User","common.users":"Users","common.result":"Result","common.results":"Results","common.noResult":"No results found","common.error":"Error","common.success":"Done","common.warning":"Notice","common.note":"Note","common.notes":"Notes","common.description":"Description","common.specs":"Specifications","common.actions":"Actions","common.active":"Active","common.inactive":"Inactive","common.enabled":"On","common.disabled":"Off","common.on":"On","common.off":"Off","common.from":"From","common.to":"To","common.and":"and","common.or":"or","common.today":"Today","common.yesterday":"Yesterday","common.toman":"Toman","common.rial":"Rial","common.page":"Page","common.of":"of","common.items":"items","common.new":"New","common.old":"Old","common.apply":"Apply","common.reset":"Reset","common.clear":"Clear","common.select":"Please select","common.title":"Title","common.body":"Message","common.type":"Type","common.priority":"Priority","common.answer":"Answer","common.message":"Message","common.messages":"Messages","common.attach":"Attachment","common.image":"Image","common.images":"Images","common.phone":"Mobile number","common.email":"Email","common.address":"Address","common.city":"City","common.province":"Province","common.postal":"Postal code","common.name":"Name","common.fullName":"Full name","common.username":"Username","common.password":"Password","common.passwordConfirm":"Repeat password","common.login":"Sign in","common.logout":"Sign out","common.register":"Register","common.guest":"Guest","common.admin":"Admin","common.settings":"Settings","common.help":"Help","common.home":"Home","common.skip":"Skip","common.done":"Done","common.pending":"Pending","common.approved":"Approved","common.rejected":"Rejected","common.open":"Open","common.closed":"Closed","common.all2":"All items","common.never":"Never","common.empty":"Empty","common.secure":"Secure","common.free":"Free","common.unit":"pcs","common.day":"day","common.hour":"hour","common.minute":"minute","common.second":"second","common.percent":"percent","common.discount":"Discount","common.discountCode":"Discount code","common.shipping":"Shipping cost","common.insurance":"Shipment insurance","common.subtotal":"Items subtotal","common.payable":"Amount payable","common.payment":"Payment","common.cart":"Cart","common.wishlist":"My list","common.compare":"Compare","common.profile":"Profile","common.wallet":"Wallet","common.balance":"Balance","common.transactions":"Transactions","common.deposit":"Top up wallet","common.points":"Points","common.ticket":"Ticket","common.tickets":"Tickets","common.support":"Support","common.review":"Review","common.reviews":"Reviews","common.question":"Question","common.questions":"Customer questions","common.rating":"Rating","common.notification":"Notification","common.notifications":"Notifications","common.security":"Security","common.history":"History","common.report":"Report","common.bug":"Bug report","common.suggestion":"Suggestion","common.complaint":"Complaint","common.law":"Terms & conditions","common.privacy":"Privacy policy","common.about":"About us","common.contact":"Contact us","common.faq":"FAQ","common.guide":"Buying guide","common.services":"Customer services","common.stats":"Store statistics","common.searchProducts":"Search products\u2026","common.noData":"Nothing to show","common.tryAgain":"Try again","common.showMore":"Show more","common.perPage":"Per page",skip:"Skip to main content","boot.loading":"Loading Yassaei Electronics\u2026","boot.waking":"The cloud server is waking up; we will retry automatically in a few seconds\u2026","boot.failed":"Store unreachable; the cloud server is asleep or the network is down.","update.available":"A new version is ready \u2014 tap to see the changes.","update.reload":"Refresh now","boot.failedHint":"Tap Retry; if it still fails, open your saved Wake-Up file to wake the server.","topbar.fastSend":"Shipping from Tehran to all of Iran","nav.home":"Home","nav.products":"All products","nav.deals":"Deals","nav.new":"New arrivals","nav.stats":"Live stats","nav.about":"About us","price.inquire":"Price on request \u2014 call the store","price.inquireShort":"Inquire","pdp.callStore":"Call the store","pdp.visitStore":"Visit in person","pdp.serviceHint":"This is a service/custom item; final price is confirmed by phone.","home.partFinder":"Can't find a part?","home.partFinderText":"Tell us by phone or message; if it is on our shelves, we set it aside for you the same day.","home.partFinderCta":"Call or message","nav.contact":"Contact us","nav.login":"Sign in","nav.register":"Register","nav.cart":"Cart","nav.wishlist":"My list","nav.notifications":"Notifications","nav.menu":"Menu","nav.account":"My account","nav.admin":"Admin panel","nav.allCategories":"All categories","theme.toggle":"Toggle theme (light/dark)","theme.dark":"Dark mode","theme.light":"Light mode","theme.auto":"Match system","search.placeholder":"Search products, brands or categories\u2026","search.go":"Search","search.voice":"Voice search","search.byImage":"Search by photo","search.listening":"Listening\u2026 go ahead and speak","search.noVoice":"Your browser does not support voice search.","search.micDenied":"Microphone access is blocked. Allow microphone permission for this site in browser settings.","search.voiceNetwork":"Speech service unreachable; check your internet connection.","search.noSpeech":"I didn't catch that; try again and speak clearly.","search.noMic":"No microphone found on this device.","pwd.show":"Show password","pwd.hide":"Hide password","search.suggestions":"Suggestions","search.trending":"Trending searches","search.recent":"Your recent searches","search.resultsFor":"Search results for","search.inProducts":"In products","search.inCategories":"Categories","search.inBrands":"Brands","search.inPages":"Pages","search.didYouMean":"Did you mean?","search.noResultTitle":"We found nothing","search.noResultText":"Try another phrase or use the filters. If you want a specific item, tell support and we will source it for you.","search.imageTitle":"Search by photo","search.imageText":"Upload a photo of the product and we will find similar items in the store.","search.imageHint":"JPG or PNG, up to 4 MB","search.imageIndexing":"Preparing the visual search engine\u2026","search.imageNoIndex":"Product images are not indexed yet. The site admin can build the index from Admin panel \u2190 Image search.","search.imageNoMatch":"No similar product found for this photo. You can search by product name instead.","search.dropHere":"Drop the photo here","search.pickFile":"Choose a photo","search.takePhoto":"Take a photo with the camera","mnav.home":"Home","mnav.products":"Categories","mnav.search":"Search","mnav.cart":"Cart","mnav.me":"Account","footer.shopping":"Shopping","footer.allProducts":"All products","footer.deals":"Deals & offers","footer.inStock":"In-stock items","footer.searchByImage":"Visual search","footer.myList":"My list","footer.stats":"Store statistics","footer.services":"Customer services","footer.guide":"Buying guide","footer.service":"Customer services","footer.faq":"FAQ","footer.insurance":"Shipment insurance","footer.plus":"Plus membership","footer.tickets":"Support tickets","footer.about":"About & legal","footer.aboutUs":"About us","footer.terms":"Terms & conditions","footer.privacy":"Privacy policy","footer.bug":"Report a bug","footer.contact":"Contact us","footer.suggest":"Suggestions & complaints","footer.contactUs":"Ways to reach us","footer.install":"Install the app","footer.support":"Live support","footer.rights":"All rights reserved.","footer.workingHours":"Working hours","home.heroKicker":"Haft-Hoz bourse, with an authenticity guarantee","home.heroTitle":"From resistors to contactors \u2014 on your bench the same day","home.heroText":"Resistors, capacitors and ICs, soldering gear, cables and wires in every size, LED strips and projectors, modems and switches, fans and surge protectors \u2014 everything your board, home or workshop needs, under one roof in Narmak.","home.ctaShop":"Start shopping","home.ctaDeals":"Today's deals","home.point1":"Authenticity guarantee","home.point2":"7-day withdrawal right","home.point3":"Shipping across Iran","home.point4":"Free in-store pickup","home.categories":"Categories","home.categoriesSub":"From resistors and ICs to projectors and surge protectors","home.featured":"Featured picks","home.featuredSub":"Items we use and recommend ourselves","home.bestSellers":"Best sellers","home.bestSellersSub":"Chosen by Yassaei Electronics customers","home.newArrivals":"New in store","home.newArrivalsSub":"The latest items added to the shelf","home.deals":"Active discounts","home.dealsSub":"Limited-time offers at better prices","home.brands":"Brands in stock","home.whyUs":"Why Yassaei Electronics?","home.whyUsSub":"The things that set us apart","home.reviews":"Customer reviews","home.reviewsSub":"Real buyer experiences","home.visitStore":"Visit the store","home.visitStoreText":"Tehran, Narmak, Haft-Hoz square \u2014 free in-person advice and on-the-spot product testing","home.openMap":"See the sketch and map","home.statsTitle":"The store at a glance","home.plusTitle":"Yassaei Electronics Plus membership","home.plusText":"With a monthly fee you get free shipping on all orders, automatic shipment insurance and a permanent 3% discount.","home.plusCta":"See Plus benefits","home.appTitle":"The Yassaei Electronics app","home.appText":"This site is an installable app (PWA): it installs on Android, iPhone, Windows, Mac and Linux, and it works offline too.","home.installCta":"Install on my device","home.appInstalled":"The app is installed","home.liveStats":"Live store statistics","home.newsletter":"Stay posted on deals","home.newsletterText":"Leave your mobile number and we will only message you about important deals and when items on your list come back in stock.","home.subscribe":"Subscribe","stats.products":"Active products","stats.ordersTotal":"Total orders","stats.ordersToday":"Orders today","stats.visitsToday":"Visits today","stats.visitsTotal":"Total visits","stats.pendingOrders":"Orders under review","stats.delivered":"Successful deliveries","stats.customers":"Registered customers","stats.plusMembers":"Plus members","stats.categories":"Categories","stats.brands":"Brands","stats.outOfStock":"Out-of-stock items","stats.years":"Years active","stats.title":"Public store statistics","stats.sub":"These figures are taken live from the site's real data.","stats.chartTitle":"Visits over the last 14 days","stats.topProducts":"Best-selling products","stats.transparency":"Transparency for customers","stats.transparencyText":"We show real stock and real prices, and we do not hide the store's statistics either.","catalog.title":"Products","catalog.filters":"Filters","catalog.showFilters":"Show filters","catalog.hideFilters":"Hide filters","catalog.sort.relevant":"Most relevant","catalog.sort.newest":"Newest","catalog.sort.oldest":"Oldest","catalog.sort.cheapest":"Cheapest","catalog.sort.dearest":"Most expensive","catalog.sort.popular":"Best selling","catalog.sort.rating":"Highest rated","catalog.sort.discount":"Biggest discount","catalog.sort.name":"Alphabetical","catalog.f.category":"Category","catalog.f.brand":"Brand","catalog.f.price":"Price range","catalog.f.availability":"Availability","catalog.f.inStock":"In-stock items only","catalog.f.discountOnly":"Discounted only","catalog.f.rating":"Minimum rating","catalog.f.authenticity":"Authenticity","catalog.f.clear":"Clear all filters","catalog.count":"products","catalog.viewGrid":"Grid view","catalog.viewList":"List view","auth.original":"Original","auth.highcopy":"High copy (grade 1)","auth.generic":"Generic","card.addToCart":"Add to cart","card.added":"Added to cart","card.quickView":"Quick view","card.wishlistAdd":"Add to my list","card.wishlistRemove":"Remove from my list","card.compareAdd":"Add to compare","card.outOfStock":"Out of stock","card.soldOut":"Sold out","pdp.addToCart":"Add to cart","pdp.buyNow":"Buy now","pdp.pickup":"Free in-store pickup","pdp.warranty":"Warranty","pdp.warrantyMonths":"{n}-month store replacement warranty","pdp.noWarranty":"No warranty","pdp.sku":"Product code","pdp.barcode":"Barcode","pdp.weight":"Weight","pdp.gram":"grams","pdp.zoomIn":"Zoom in","pdp.zoomOut":"Zoom out","pdp.zoomReset":"Actual size","pdp.zoomHint":"Hover for magnifier; click or double-tap for full zoom","pdp.video":"Video","pdp.share":"Share","pdp.specs":"Specifications","pdp.description":"Description","pdp.reviews":"Reviews & ratings","pdp.questions":"Customer questions","pdp.related":"Similar products","pdp.compatibility":"Compatibility","pdp.writeReview":"Write a review & rating","pdp.askQuestion":"Ask a question","pdp.loginToReview":"Sign in to write a review.","pdp.reviewSubmitted":"Your review was submitted and will appear once the admin approves it.","pdp.reviewPending":"Your review will appear after the admin approves it.","pdp.questionSubmitted":"Your question was submitted; once approved, the admin will answer it.","pdp.buyerBadge":"Buyer of this product","pdp.visitorBadge":"Visitor","pdp.helpful":"Was helpful","pdp.storeReply":"Store reply","pdp.noReviews":"No reviews yet. Be the first!","pdp.noQuestions":"No questions yet. Ask if you have one.","pdp.yourRating":"Your rating","pdp.viewed":"views","pdp.sold":"sold","pdp.off":"off","pdp.save":"You save","pdp.lastPrice":"Previous price","pdp.stockCount":"In stock: {n}","pdp.fastSend":"Fast shipping from Tehran","pdp.installment":"Cash on delivery for eligible orders","cart.title":"Cart","cart.empty":"Your cart is empty","cart.emptyText":"You have not picked anything yet. Start from the categories or the search box.","cart.goShopping":"Let's go shopping","cart.item":"Product","cart.qty":"Quantity","cart.remove":"Remove","cart.clear":"Empty the cart","cart.clearConfirm":"Remove all items from the cart?","cart.summary":"Order summary","cart.continue":"Continue to checkout","cart.freeShipHint":"Spend {amount} Toman more to get free shipping.","cart.freeShipDone":"Shipping is free for this order!","cart.couponApplied":"Discount code applied","cart.couponPlaceholder":"Have a discount code? Enter it","cart.applyCoupon":"Apply code","cart.removeCoupon":"Remove code","cart.updated":"Cart updated","checkout.title":"Checkout","checkout.step1":"Delivery","checkout.step2":"Payment","checkout.step3":"Confirm","checkout.delivery":"Delivery method","checkout.pickup":"Pickup from the store","checkout.pickupDesc":"Free \u2014 once confirmed you get a ready-for-pickup notification and collect it in person.","checkout.courier":"Courier / postal shipping","checkout.courierDesc":"Shipped to a saved address, with optional shipment insurance.","checkout.zone":"Shipping zone","checkout.express":"Express shipping (same day)","checkout.insuranceOpt":"Shipment insurance","checkout.insuranceDesc":"If the parcel is damaged or lost in transit, the goods value is compensated.","checkout.insuranceAuto":"Applied automatically and free for Plus members.","checkout.address":"Delivery address","checkout.addAddress":"Add a new address","checkout.noAddress":"You must save at least one address for postal shipping.","checkout.paymentMethod":"Payment method","checkout.useWallet":"Pay from wallet","checkout.walletBalance":"Wallet balance: {amount} Toman","checkout.note":"Order note (optional)","checkout.notePlaceholder":"e.g. please call before delivery.","checkout.acceptTerms":"I have read and accept the Terms & Conditions and the Privacy Policy.","checkout.placeOrder":"Place & pay for the order","checkout.placing":"Placing your order\u2026","checkout.loginRequired":"Sign in to complete your purchase.","checkout.successTitle":"Order placed","checkout.successText":"Your order code is {code}. Track its status under My Orders.","checkout.payNow":"Pay online","checkout.payLater":"I will pay later","checkout.gatewayDemo":"The gateway is in demo mode; no real money is deducted.","checkout.paymentSuccess":"Payment was successful","checkout.paymentFailed":"Payment failed","checkout.simulateSuccess":"Successful payment (gateway simulation)","checkout.simulateFail":"Cancel payment","checkout.concurrencyNote":"Stock is locked the moment you place the order; if an item sells out at the same time we will tell you and refund the amount.","checkout.pickupReady":"Preparation time: about {h} working hours","auth.title":"Sign in or register","auth.loginTitle":"Sign in to your account","auth.registerTitle":"Create an account","auth.methodPassword":"Username & password","auth.methodPhone":"Mobile number","auth.methodEmail":"Email","auth.identifier":"Username, mobile or email","auth.remember":"Remember me","auth.forgot":"Forgot password","auth.noAccount":"Do not have an account?","auth.haveAccount":"Already registered?","auth.sendCode":"Send verification code","auth.codeSent":"Verification code sent","auth.codeSentTo":"A 6-digit code was sent to {target}.","auth.enterCode":"Enter the verification code","auth.otpCode":"Verification code","auth.resend":"Resend code","auth.resendIn":"Resend in {s} seconds","auth.demoCode":"Demo mode: verification code {code}","auth.2faTitle":"Two-step sign-in","auth.2faText":"Enter the 6-digit code from your authenticator app, SMS or email.","auth.2faTotp":"Authenticator app","auth.2faSms":"SMS code","auth.2faEmail":"Email code","auth.2faBackup":"Backup code","auth.2faVerify":"Verify & sign in","auth.acceptTerms":"I accept the Terms & Conditions and the Privacy Policy.","auth.referral":"Referral code (optional)","auth.registerDone":"Your account was created. Welcome!","auth.loginDone":"Welcome","auth.logoutDone":"You signed out successfully","auth.recoveryTitle":"Password recovery","auth.recoveryText":"Enter your registered mobile number or email and we will send a recovery code.","auth.newPassword":"New password","auth.resetDone":"Password changed successfully","auth.passwordRules":"At least 8 characters including lowercase, uppercase, a digit and a symbol","auth.orContinue":"or","auth.guestCheckout":"Continue shopping without an account","acc.title":"My account","acc.dashboard":"My dashboard","acc.badges":"My achievements","badge.got":"Earned","badge.locked":"Locked","badge.first-buy":"First purchase","badge.first-buy.d":"You placed your first successful order.","badge.silver-buyer":"Silver buyer","badge.silver-buyer.d":"5 successful orders at Yassaei Electronics.","badge.gold-buyer":"Gold buyer","badge.gold-buyer.d":"15 successful orders; a Yassaei Electronics VIP.","badge.big-spender":"Big spender","badge.big-spender.d":"Over 50,000,000 Toman in purchases.","badge.early-bird":"Early bird","badge.early-bird.d":"Among the first 100 Yassaei Electronics users.","badge.veteran":"Veteran","badge.veteran.d":"With us for more than a year.","badge.reviewer":"Reviewer","badge.reviewer.d":"3 posted reviews helping others choose.","badge.plus-member":"Plus member","badge.plus-member.d":"You have an active Plus subscription.","badge.wallet-user":"Wallet user","badge.wallet-user.d":"You have used the Yassaei Electronics wallet.","badge.supporter":"Supporter","badge.supporter.d":"You opened your first support ticket.","acc.orders":"My orders","acc.wishlist":"My list","acc.wallet":"Wallet","acc.plus":"Plus membership","acc.addresses":"Addresses","acc.notifications":"Notifications","acc.tickets":"My tickets","acc.support":"Support chat","acc.reviews":"My reviews","acc.feedback":"Suggestions & complaints","acc.profile":"Profile details","acc.security":"Account security","acc.sessions":"Active sessions","acc.prefs":"Display preferences","acc.data":"My data","acc.hello":"Hi {name}","acc.memberSince":"Member since {date}","acc.noOrders":"You have not placed an order yet","acc.noOrdersText":"Make your first purchase with the welcome discount WELCOME10.","acc.orderCode":"Order code","acc.orderDate":"Order date","acc.orderItems":"Items","acc.orderTotal":"Total amount","acc.trackOrder":"Track order","acc.cancelOrder":"Cancel order","acc.cancelConfirm":"Cancel this order? The paid amount returns to your wallet.","acc.cancelReason":"Reason for cancellation (optional)","acc.orderCancelled":"Order cancelled","acc.reorder":"Buy again","acc.invoice":"Invoice","acc.printInvoice":"Print invoice","acc.timeline":"Order progress","acc.walletEmpty":"No transactions recorded yet","acc.walletDeposit":"Top up wallet","acc.walletAmount":"Top-up amount (Toman)","acc.walletDeposited":"Wallet topped up","acc.walletNote":"The wallet balance can only be used to buy from this store; no interest or fee applies to it.","acc.tx.deposit":"Top-up","acc.tx.purchase":"Purchase","acc.tx.refund":"Refund","acc.tx.adjust_in":"Increase by admin","acc.tx.adjust_out":"Deduction by admin","acc.plusInactive":"You do not have a Plus membership","acc.plusActive":"Plus active until {date}","acc.plusSubscribe":"Buy Plus membership","acc.plusRenew":"Renew membership","acc.plusPrice":"{price} Toman for {days} days","acc.plusPerks":"Plus membership benefits","acc.plusSubscribed":"Plus membership activated","acc.plusPayWallet":"Pay from wallet","acc.plusPayGateway":"Pay online","acc.addAddress":"Add address","acc.editAddress":"Edit address","acc.addrTitle":"Label (e.g. home, work)","acc.addrReceiver":"Recipient name","acc.addrPhone":"Recipient phone number","acc.addrStreet":"Full postal address","acc.addrDefault":"Default address","acc.addrNote":"Note for the courier","acc.addrSaved":"Address saved","acc.addrDeleted":"Address deleted","acc.noAddress":"No address saved yet","acc.wishlistEmpty":"Your list is empty","acc.wishlistEmptyText":"Tap the heart icon on any product to save it here.","acc.notifEmpty":"You have no notifications","acc.markAllRead":"Mark all as read","acc.ticketNew":"New ticket","acc.ticketSubject":"Subject","acc.ticketCategory":"Request category","acc.ticketPriority":"Priority","acc.ticketBody":"Request details","form.rulesRequired":"You must accept the ticket rules first.","form.termsRequired":"You must accept the terms and conditions first.","page.statsTitle":"Live store stats","page.aboutCta":"Come and see what we have in store for you","page.stepsTitle":"How to buy","page.tipsTitle":"Buying tips","page.hintsTitle":"For a more precise report","page.bugTitle":"Report a bug","page.rulesTitle":"Rules","faq.all":"All topics","faq.search":"Search questions\u2026","faq.results":"{n} questions","faq.notFound":"No question matched your search.","faq.askText":"Ask live support or open a ticket.","faq.cat.orders":"Orders & tracking","faq.cat.shipping":"Shipping & delivery","faq.cat.returns":"Returns & refunds","faq.cat.product":"Products & authenticity","faq.cat.account":"Account","faq.cat.security":"Security & payment","faq.cat.store":"Store & contact","faq.cat.other":"Other","acc.ticketCloseConfirm":"Close this ticket? You can reopen it later by sending a message.","acc.ticketClosedNote":"This ticket is closed. Sending a new message reopens it.","acc.ticketBodyShort":"The message is too short.","acc.attachHint":"Up to 4 images, each below 4 MB.","err.tooLarge":"The file is larger than 4 MB.","acc.ticketRules":"I have read and accept the ticket rules.","acc.ticketViewRules":"Read ticket rules","acc.ticketCreated":"Ticket created. Tracking code: {code}","acc.ticketWrite":"Write your reply\u2026","acc.ticketClose":"Close ticket","acc.ticketReopen":"Reopen","acc.ticketSla":"Estimated reply time: {h} hours","acc.noTickets":"You have no tickets","acc.chatTitle":"Live support","acc.chatPlaceholder":"Write your message\u2026","acc.chatWelcome":"Hi! Any question or issue? Write it here and we will answer.","acc.chatOffline":"We are outside working hours right now; leave a message and we reply first thing, or open a ticket.","acc.chatOpenTicket":"Open a ticket","acc.reviewEmpty":"You have not posted a review or question","acc.feedbackNew":"Send a suggestion, complaint or bug report","acc.feedbackType":"Message type","acc.feedbackContact":"Contact (email or mobile)","acc.feedbackContactHint":"If provided, we will inform you of the outcome.","acc.feedbackSent":"Your message was submitted. Thanks for helping us improve.","acc.noFeedback":"You have not sent any message","acc.profileSaved":"Profile saved","acc.passwordChange":"Change password","acc.currentPassword":"Current password","acc.newPassword2":"New password","acc.passwordChanged":"Password changed","acc.2faSection":"Two-factor authentication (2FA)","acc.2faOff":"Disabled \u2014 turn it on for extra security.","acc.2faOn":"Enabled","acc.2faEnable":"Enable two-factor","acc.2faDisable":"Disable","acc.2faScan":"Scan this QR code with an authenticator app (e.g. Google Authenticator) or enter the key manually.","acc.2faKey":"Manual key","acc.2faEnterCode":"Enter the 6-digit code from the app to enable","acc.2faEnabled":"Two-factor enabled","acc.2faDisabled":"Two-factor disabled","acc.2faBackup":"Backup codes (keep them safe)","acc.2faBackupHint":"If you lose access to the app, sign in with these. Each code works once.","acc.2faMethods":"Verification methods","acc.sessionsText":"Devices currently signed in to your account.","acc.revokeAll":"Sign out everywhere","acc.revokeDone":"Sessions revoked","acc.current":"This device","acc.prefsText":"These settings apply only to this device.","acc.prefTheme":"Theme","acc.prefLang":"Language","acc.prefDensity":"Density","acc.prefMotion":"Animations","acc.prefNotif":"Notifications","acc.notifMarketing":"Offers and discounts","acc.notifOrders":"Order status","acc.notifRestock":"Restock of my saved items","acc.notifSupport":"Support and ticket replies","acc.exportData":"Export my data","acc.exportHint":"Download all your account info, orders, reviews and tickets as JSON.","acc.deleteAccount":"Delete account","acc.deleteWarn":"Deleting removes your personal data, while financial order records are kept as required by law.","acc.deleteConfirm":"Enter your password to delete the account","acc.pointsText":"You earn 1 point per 100,000 Toman of purchase.","acc.referralCode":"Your referral code","acc.referralText":"Share this code; you both get 50 points.","chat.title":"Yassaei Electronics live support","chat.online":"We usually reply within minutes","chat.open":"Start chat","chat.minimize":"Close","chat.loginFirst":"Sign in to chat with support.","chat.sent":"Message sent","chat.typing":"Support is typing\u2026","chat.quick":"Frequent questions","notif.new":"New notification","notif.markRead":"Mark as read","notif.viewAll":"View all notifications","notif.empty":"No notifications","notif.type.announcement":"Announcement","notif.type.order":"Order","notif.type.restock":"Back in stock","notif.type.ticket":"Ticket","notif.type.support":"Support","notif.type.review":"Review","notif.type.plus":"Plus membership","notif.type.wallet":"Wallet","notif.type.account":"Account","notif.type.feedback":"Feedback","notif.type.admin_alert":"Admin alert","notif.type.news":"News","notif.type.offer":"Special offer","notif.type.system":"System","notif.type.info":"Info","notif.type.welcome":"Welcome","consent.title":"Welcome to Yassaei Electronics","consent.text":"Please read and accept the following before continuing. We use browser storage to improve your shopping experience and protect your personal data per the Privacy Policy.","consent.terms":"I have read and accept the Terms & Conditions.","consent.privacy":"I accept the Privacy Policy.","consent.marketing":"I would like to hear about deals and new arrivals (optional).","consent.accept":"Accept & enter the site","consent.readTerms":"Read terms","consent.readPrivacy":"Read privacy","consent.thanks":"Thanks! Your acceptance was recorded.","consent.manage":"Cookie & privacy choices","social.instagram":"Instagram","home.partnersTitle":"Brands we work with","stats.subtitle":"Real store numbers, updated live.","stats.chartHint":"Each column height is that day visit count.","stats.topTitle":"Recent best sellers","adm.sPartners":"Partners & brands","adm.ptFa":"Persian name","adm.ptEn":"Name (EN)","adm.ptAdd":"Add brand","adm.ptHint":"These names scroll as a marquee on the home page; order is yours to set.","feat.partners":"Partner brands strip","auth.pwdLater":"I'll change it later","auth.pwdLaterToast":"OK; you can change it anytime from Account \u2192 Change password.","social.telegram":"Telegram","social.eitaa":"Eitaa","social.whatsapp":"WhatsApp","consent.rejectOptional":"Accept necessary only","consent.ttlNote":"Your choice stays valid for 180 days; after that we ask again.","contact.title":"Contact us","contact.mapTitle":"Shop location sketch","contact.mapHint":"Click to open in a map app","contact.mapAsk":"Which map would you like to open?","contact.mapPermission":"If you allow location access, we will show the route from your current position to the shop.","contact.allowLocation":"Allow location access","contact.denyLocation":"Continue without location","contact.openMaps":"Open in maps","contact.copyAddress":"Copy address","contact.hours":"Working hours","contact.phone":"Store phone","contact.mobile":"Mobile & WhatsApp","contact.emailUs":"Email","contact.addressUs":"Address","contact.callNow":"Call now","contact.whatsapp":"Message on WhatsApp","contact.locationOn":"Your approximate location was found","contact.locationDenied":"Location denied; the map opens without an origin.","contact.formTitle":"Send a quick message","contact.formText":"Prefer not to call? Leave a message or open a ticket.","contact.neshan":"Neshan","contact.balad":"Balad","contact.google":"Google Maps","contact.osm":"OpenStreetMap","contact.tgBotTitle":"Telegram support bot","contact.tgBotText":"Track orders, search products and chat with support \u2014 24/7 on Telegram. Just send /start.","contact.tgBotBtn":"Open the bot on Telegram","compare.title":"Compare products","compare.empty":"No products selected for comparison","compare.emptyText":"Use the Compare button on product cards (up to 4 items).","compare.add":"Add to compare","compare.remove":"Remove","priceCheck.title":"Price check by barcode","priceCheck.sub":"Scan the barcode with your device or type it manually.","priceCheck.input":"Barcode or SKU","priceCheck.scanCamera":"Scan with camera","priceCheck.stopCamera":"Stop camera","priceCheck.waiting":"Waiting for a scan\u2026","priceCheck.notFound":"No product found for this barcode","priceCheck.found":"Product found","priceCheck.cameraUnsupported":"Camera unavailable. Use a barcode device or manual entry.","priceCheck.cameraDenied":"Camera access denied.","priceCheck.deviceMode":"Kiosk mode (full screen)","priceCheck.lastScan":"Last scan","priceCheck.fullscreen":"Full screen","err.generic":"Something went wrong. Please try again.","err.network":"Could not reach the server.","err.notFound":"Page not found","err.notFoundText":"The address may be wrong or the page has been removed.","err.goHome":"Go to homepage","err.offline":"You are offline. Cached data is shown.","err.online":"Back online","err.loginRequired":"You must sign in to view this section.","err.forbidden":"You do not have access to this section.","adm.title":"Admin panel","adm.dashboard":"Dashboard","adm.products":"Products","adm.productNew":"Add product","adm.productEdit":"Edit product","adm.categories":"Categories & brands","adm.orders":"Orders","adm.reviews":"Reviews & questions","adm.tickets":"Tickets","adm.supportChat":"Support chat","adm.feedback":"Feedback & bugs","adm.users":"Users & permissions","adm.wallet":"User wallets","adm.coupons":"Coupons","adm.ads":"Advertisements","adm.notifications":"Notifications","adm.settings":"Store settings","adm.theme":"Theme & layout","adm.features":"Features","adm.shipping":"Shipping & insurance","adm.plus":"Plus membership","adm.pages":"Page content","adm.barcode":"Barcode & labels","adm.imageSearch":"Image search","adm.audit":"Audit log","adm.stats":"Statistics","adm.export":"Export & backup","adm.maintenance":"Maintenance","adm.backToSite":"Back to site","adm.kpi.ordersToday":"Orders today","adm.kpi.visits":"Visits today","adm.kpi.pending":"Pending review","adm.kpi.revenueTotal":"Total revenue","adm.kpi.users":"Users","adm.kpi.products":"Products","adm.kpi.lowStock":"Low stock","adm.awaiting":"Tasks awaiting action","adm.awaiting.reviews":"Reviews to approve","adm.awaiting.tickets":"Open tickets","adm.awaiting.orders":"Pending orders","adm.awaiting.feedback":"New feedback","adm.awaiting.chat":"Unread chat messages","adm.chart":"Last 14 days trend","adm.topSelling":"Best sellers","adm.lowStockList":"Low-stock items","adm.recentAudit":"Latest events","adm.storage":"Data size","adm.pName":"Product name","adm.pNameEn":"English name","adm.pCat":"Category","adm.pBrand":"Brand","adm.pPrice":"Price (Toman)","adm.pOldPrice":"Price before discount","adm.pCost":"Purchase cost","adm.pStock":"Stock","adm.pSku":"SKU","adm.pBarcode":"Barcode","adm.pWeight":"Weight (grams)","adm.pWarranty":"Warranty (months)","adm.pAuth":"Authenticity","adm.pTags":"Tags (separate with Enter)","adm.pSpecs":"Specifications","adm.pSpecKey":"Spec name","adm.pSpecVal":"Value","adm.pAddSpec":"Add spec","adm.pVideos":"Product videos (one https or /uploads URL per line)","adm.pVideosHint":"Videos play in the product gallery and lightbox.","adm.pImages":"Images","adm.pFindImage":"Auto image search","adm.pFindImageHint":"We search free image sources (Wikimedia/Openverse) for this product. Pick one and approve it.","adm.pFindSearching":"Searching for images\u2026","adm.pFindEmpty":"No images found. You can upload your own photo.","adm.pUpload":"Upload photo","adm.pUseImage":"Use this image","adm.pDefaultImage":"Restore default image","adm.pFeatured":"Show in featured picks","adm.pActive":"Active (visible on site)","adm.pSaved":"Product saved","adm.pCreated":"Product created","adm.pDeleted":"Product deleted","adm.pDeleteConfirm":"Delete this product permanently?","adm.pQuickEdit":"Quick edit","adm.pBulkPrice":"Bulk price change","adm.catName":"Category name","adm.catParent":"Parent category","adm.catGlyph":"Icon","adm.catOrder":"Display order","adm.catNoParent":"No parent (top level)","adm.brandName":"Brand name","adm.brandNameEn":"Brand English name","adm.oStatus":"Change status","adm.oTracking":"Tracking code","adm.oNote":"Internal note","adm.oCustomer":"Customer","adm.oDelivery":"Delivery","adm.oPayment":"Payment","adm.oSaved":"Order updated","adm.rApprove":"Approve & publish","adm.rReject":"Reject","adm.rReply":"Reply","adm.rReplySaved":"Reply saved","adm.rModerated":"Review status updated","adm.rFilter":"Filter","adm.uRole":"Role","adm.uPerms":"Permissions","adm.uPermsHint":"Toggle each permission separately. Changes apply immediately.","adm.uAll":"Enable all","adm.uNone":"Disable all","adm.uWalletAdjust":"Adjust wallet balance","adm.uWalletReason":"Reason","adm.uPlusDays":"Plus membership days","adm.uResetPass":"Reset password","adm.uStatus":"Account status","adm.uBlocked":"Blocked","adm.uSaved":"User changes saved","adm.uMakeStaff":"Make staff","adm.cCode":"Code","adm.cType":"Discount type","adm.cValue":"Value","adm.cMax":"Max discount","adm.cMin":"Minimum order","adm.cLimit":"Total usage limit","adm.cPerUser":"Per-user limit","adm.cStart":"Starts","adm.cEnd":"Ends","adm.cUsed":"Used","adm.aSlot":"Placement","adm.aTitle":"Title","adm.aText":"Text","adm.aLink":"Target link","adm.aCta":"Button text","adm.aActive":"Visible","adm.nTitle":"Notification title","adm.nBody":"Notification body","adm.nTarget":"Recipient","adm.nAll":"All users","adm.nOne":"A specific user","adm.nLevel":"Level","adm.nSent":"Notification sent","adm.nOutbox":"SMS & email outbox (demo mode)","adm.sStore":"Store information","adm.sTheme":"Theme","adm.sUi":"Interface layout","adm.mailsms":"Email & SMS","adm.mailCfg":"Mail server (SMTP)","adm.mailEnabled":"Email sending on","adm.mailFrom":"From address","adm.smsCfg":"SMS panel (Kavenegar)","adm.smsEnabled":"SMS sending on","adm.smsKey":"API key","adm.smsSender":"Sender number","adm.console":"System console","adm.consoleHint":"Restart takes a few seconds; the page reloads itself. Resets are irreversible.","adm.sysRestart":"Restart server","adm.sysRestartWarn":"Restart the server now? Users will be disconnected for a few seconds.","adm.sysRestarting":"Restarting\u2026 the page will reload shortly.","adm.sysResetLabel":"Reset sections (irreversible):","adm.sysReset.audit":"Audit log","adm.sysReset.carts":"Guest carts","adm.sysReset.visits":"Visit counters","adm.sysReset.visitors":"Visitors list","adm.secTitle":"Defense & entry queue","adm.secQueueEnabled":"Queue visitors when busy","adm.secQueueDesc":"When load exceeds the limits, anonymous visitors are admitted one by one through a queue so the site stays error-free for everyone.","adm.secMaxConc":"Max concurrent requests","adm.secTriggerRps":"Requests-per-second trigger","adm.secPassTtl":"Entry pass TTL (minutes)","adm.secPoll":"Queue poll interval (seconds)","adm.secFloodBan":"Auto-ban threshold (requests/minute)","adm.secFloodMin":"Auto-ban duration (minutes)","adm.secSaved":"Defense settings saved.","adm.secInflight":"Active requests","adm.secRps":"Req/sec","adm.secQueued":"In queue","adm.secAutoBans":"Active auto-bans","adm.secTop":"Top talker IPs (last minute)","adm.secPerMin":"Req/min","adm.secTopEmpty":"No unusual traffic recorded.","adm.secBusy":"Busy \u2014 queue active","adm.secNormal":"Normal","adm.banMinutes":"Duration (minutes, 0 = permanent)","adm.banUntil":"Until","adm.banAuto":"auto","adm.resetAudit":"Clear audit logs","adm.resetCarts":"Clear guest carts","adm.resetVisitors":"Clear visitors","adm.resetDone":"Reset done.","adm.resetWarn.audit":"Delete all audit logs?","adm.resetWarn.carts":"Empty all guest carts?","adm.resetWarn.visitors":"Delete the visitors list?","adm.resetWarn.visits":"Zero the visit counters?","adm.visitors":"Visitors","adm.uDevice":"Device / IP","adm.uBrowser":"Browser","adm.uRegion":"Region / time","adm.uPath":"Path","adm.guest":"Guest","adm.bans":"Bans (block / unblock)","adm.banType":"Type","adm.banValue":"Value (IP / phone / email / username)","adm.banReason":"Reason","adm.ban":"Ban","adm.unban":"Unban","adm.banned":"Banned","adm.banDone":"Banned.","adm.unbanDone":"Unbanned.","adm.bansEmpty":"Nobody is banned right now.","adm.banByAdmin":"By admin","adm.channels":"Channels","adm.chSite":"In-site notification","adm.chTelegram":"Telegram bot","adm.chEmail":"Email","adm.chSms":"SMS","adm.channelsHint":"Email/SMS need settings below; without them only ready channels send.","adm.telegram":"Telegram bot","adm.tgHint":"Get a token from Telegram BotFather; the bot runs on the store server and is managed from this panel.","adm.tgEnabled":"Bot on","adm.tgToken":"Bot token","adm.tgTokenHint":"Like 123456:ABC-\u2026","adm.tgWelcome":"/start welcome message","adm.tgTest":"Test send","adm.tgInbox":"Inbox","adm.tgSubs":"Subscribers","adm.tgReplyPh":"Reply to this user\u2026","adm.tgInboxEmpty":"No messages yet.","adm.lottery":"Lottery","adm.lotteryNew":"New draw","adm.lotPrize":"Prize","adm.lotEnds":"Ends","adm.lotWinners":"Winners count","adm.lotWinnersList":"Winners","adm.lotMode":"Entry mode","adm.lotModeOrders":"Automatic from orders","adm.lotModeManual":"Manual join button","adm.lotEntries":"Entries","adm.lotRun":"Draw now","adm.lotRunWarn":"Winners are picked randomly and notified now. Continue?","adm.lotDone":"Draw done","adm.lotClose":"Close","adm.lotClosed":"Draw closed.","adm.lotEmpty":"No draws yet.","lot.title":"Yassaei Electronics lottery","lot.nav":"Lottery","lot.soon":"Coming soon \u2014 stay tuned!","lot.done":"Past draws","lot.winners":"Winners","lot.active":"Active","lot.prize":"Prize","lot.ends":"Ends","lot.entries":"Entries","lot.joined":"You are in this draw.","lot.join":"Join draw","lot.joinDone":"Entry recorded \u2014 good luck!","lot.autoEntry":"Every valid order in the draw window counts automatically.","contact.phone3":"Third phone","adm.sBackups":"Backups & dump","adm.backupNow":"Backup now","adm.backupsHint":"A full snapshot is taken automatically every {hours} hours; the last {keep} are kept.","adm.backupsEmpty":'No snapshot yet; hit "Backup now".',"adm.backupSize":"Size","adm.backupRestore":"Restore","adm.backupRestoreWarn":"All current data will be replaced by this snapshot. Sure?","adm.backupDone":"Backup created.","adm.backupRestored":"Restore done; reloading.","adm.dumpFull":"Full site dump","adm.sFeatures":"Features","adm.sShipping":"Shipping","adm.sPlus":"Plus","adm.sOrders":"Orders & payment","adm.sSeo":"SEO","adm.sAuth":"Authentication","adm.sSaved":"Settings saved","adm.tAccent":"Primary colour","adm.tPort":"Port theme (waves, boat and palm in the background)","adm.tPortHint":"Turn it off for a plain neutral background.","adm.tMode":"Default theme","adm.tRadius":"Corner radius","adm.tDensity":"Density","adm.uHeader":"Header layout","adm.uNav":"Menu style","adm.uCards":"Product card style","adm.uSticky":"Sticky header","adm.uTicker":"Top ticker bar","adm.uTickerItems":"Ticker messages","adm.uTickerSpeed":"Ticker speed","adm.uQuick":"Product quick view","adm.uChat":"Floating support button","adm.uCrumb":"Show breadcrumbs","adm.uCols":"Product columns","adm.uColsMobile":"Mobile","adm.uColsTablet":"Tablet","adm.uColsDesktop":"Desktop","adm.uColsWide":"Wide screen","adm.uCardInfo":"Info shown on product cards","adm.uPosStart":"Right (start)","adm.uPosCenter":"Center","adm.uPosEnd":"Left (end)","adm.uLayoutLogoStart":"Logo at start","adm.uLayoutSplit":"Logo start / search center / actions end","adm.uLayoutCentered":"Logo centered","adm.fHint":"Turn off any feature you do not need; its section disappears from the site and panel.","adm.bLabel":"Label printing","adm.bSelect":"Select products","adm.bSize":"Label size","adm.bCopies":"Copies per product","adm.bShowName":"Product name","adm.bShowPrice":"Price","adm.bShowBrand":"Brand","adm.bShowSku":"SKU","adm.bShowQr":"Product page QR code","adm.bType":"Barcode type","adm.bPrint":"Print labels","adm.bGenerate":"Generate new barcode","adm.igPack":"Instagram post pack","adm.igCap":"Caption (editable before copy)","adm.igTags":"Hashtags","adm.igImgHint":"Post image; download it and publish with the caption.","adm.igDl":"Download image","adm.igNoImg":"This product has no image yet; add one via upload or image search first.","adm.igCopyCap":"Copy caption","adm.igCopyTags":"Copy hashtags","adm.igCopyAll":"Copy caption + tags","adm.bGenerated":"Barcode generated and assigned","adm.bScan":"Scan barcode","adm.bScanMode":"Scanner mode (device sync)","adm.bScanHint":"Connect your barcode device like a keyboard; click the box below and scan. Camera scanning also works.","adm.bConnected":"Device connected \u2014 ready to scan","adm.bSerial":"Direct connection via Web Serial","adm.bSerialHint":"If your device has a serial/USB port, connect here (desktop Chrome/Edge only).","adm.bSerialUnsupported":"Your browser does not support Web Serial; use keyboard or camera mode.","adm.bSerialConnected":"Connected","adm.bSerialClosed":"Connection closed","adm.bHistory":"Recent scans","adm.isTitle":"Image index for visual search","adm.isHint":"Build the index once so customers can search by photo. It runs in your browser and adds no server load.","adm.isBuild":"Build index","adm.isBuilding":"Indexing\u2026","adm.isDone":"Index built","adm.isCount":"Indexed images","adm.auditAction":"Event","adm.auditActor":"User","adm.auditTarget":"Target","adm.auditMeta":"Details","adm.statsRevenue":"Revenue","adm.statsVisits":"Visits","adm.statsOrders":"Orders","adm.statsByCat":"Category performance","adm.statsByBrand":"Sales by brand","adm.statsStockValue":"Inventory value","adm.statsAvgOrder":"Average basket","adm.exportProducts":"Export products","adm.exportOrders":"Export orders","adm.exportUsers":"Export users","adm.exportReviews":"Export reviews","adm.exportTickets":"Export tickets","adm.exportAudit":"Export events","adm.exportAll":"Full backup (JSON)","adm.backup":"Create backup now","adm.cleanup":"Clean old data","adm.cleanupDone":"Cleanup done","adm.pageEditHint":"Edit page texts here; changes apply to the site immediately.","adm.noPermission":"You do not have permission for this section. Ask the owner to grant it.","adm.liveView":"Live preview of changes","adm.saved":"Saved","st.pending_payment":"Pending payment","st.pending_review":"Pending review","st.confirmed":"Confirmed","st.preparing":"Preparing","st.ready_pickup":"Ready for pickup","st.shipped":"Shipped","st.delivered":"Delivered","st.cancelled":"Cancelled","st.refunded":"Refunded","st.returned":"Returned","dl.pickup":"In-store pickup","dl.courier":"Postal shipping","pm.wallet":"Wallet","pm.gateway":"Bank gateway","pm.cod":"Cash on delivery","ps.unpaid":"Unpaid","ps.paid":"Paid","ps.pending":"Pending","ps.refunded":"Refunded","ps.failed":"Failed","ps.cancelled":"Cancelled","tc.order":"Order tracking","tc.return":"Return & refund","tc.product":"Product question","tc.technical":"Technical issue","tc.complaint":"Complaint","tc.partnership":"Partnership & advertising","tc.account":"Account & security","tc.other":"Other","tp.critical":"Critical","tp.high":"High","tp.normal":"Normal","tp.low":"Low","ft.suggestion":"Suggestion","ft.complaint":"Complaint","ft.bug":"Bug report","fs.new":"New","fs.seen":"Seen","fs.in_progress":"In progress","fs.done":"Done","fs.rejected":"Rejected","tk.open":"Open","tk.answered":"Answered","tk.closed":"Closed","feat.wallet":"Wallet","feat.plus":"Plus membership","feat.insurance":"Shipment insurance","feat.tickets":"Ticket system","feat.reviews":"Customer reviews","feat.questions":"Customer questions","feat.ads":"On-site ads","feat.imageSearch":"Image search","feat.barcode":"Barcode & labels","feat.priceCheckDevice":"Price display mode","feat.publicStats":"Public statistics","feat.coupons":"Coupons","feat.consent":"Cookie consent modal (first visit)","feat.liveSupport":"Live chat support","feat.announcements":"Notifications","feat.wishlist":"My list","feat.compare":"Product comparison","feat.recentlyViewed":"Recently viewed","feat.guestCheckout":"Guest checkout","feat.priceAlerts":"Restock alerts","feat.twoFactor":"Two-factor login","feat.referrals":"Referral codes","feat.voiceSearch":"Voice search","feat.offlineMode":"Offline mode","feat.captcha":"Captcha (I'm not a robot)","captcha.required":"Prove you are human first: tick the box and solve the math.","captcha.label":"I'm not a robot","captcha.hint":"Tick it, then solve the tiny math image","captcha.placeholder":"Answer","captcha.solved":"Human verified \u2714","captcha.refresh":"New challenge","perm.dashboard.view":"View dashboard","perm.products.view":"View products","perm.products.create":"Create product","perm.products.edit":"Edit product","perm.products.delete":"Delete product","perm.products.price":"Change price & discount","perm.products.stock":"Change stock","perm.categories.manage":"Manage categories & brands","perm.orders.view":"View orders","perm.orders.manage":"Change order status","perm.refunds.manage":"Refunds & cancellation","perm.reviews.moderate":"Moderate reviews","perm.reviews.reply":"Reply to reviews","perm.tickets.manage":"Manage tickets","perm.feedback.manage":"Feedback & bugs","perm.users.view":"View users","perm.users.manage":"Manage users","perm.users.permissions":"Assign permissions","perm.wallet.manage":"Wallet management","perm.plus.manage":"Plus membership","perm.coupons.manage":"Coupons","perm.ads.manage":"Manage ads","perm.notifications.send":"Send notifications","perm.settings.edit":"Store settings","perm.theme.edit":"Theme & layout","perm.pages.edit":"Edit page content","perm.barcode.print":"Print labels","perm.barcode.scan":"Scan & price display","perm.imagesearch.index":"Image index","perm.audit.view":"Audit log","perm.stats.view":"Statistics","perm.data.export":"Export data","misc.quickView":"Quick view","misc.addToHome":"Add to home screen","misc.installHint":'In your browser menu, choose "Add to Home screen" or "Install".',"misc.printBlocked":"The print dialog did not open; please allow pop-ups.","misc.saved":"Saved","misc.deleted":"Deleted","misc.updated":"Updated","misc.confirmDelete":"Delete this item?","misc.loadingMore":"Loading\u2026","misc.recentlyViewed":"Recently viewed","misc.uiSound":"UI click sound","misc.uiSoundOn":"Click sound on","misc.uiSoundOff":"Click sound off","misc.shareDone":"Link copied","misc.shareNative":"Share","img.alt":"Product image","adm.view":"View","adm.support":"Support chat","adm.supSelect":"Select a conversation","adm.supSelectHint":"Pick a thread from the list to reply.","adm.tkReply":"Support reply","adm.tkManage":"Ticket management","common.updated":"Updated","common.link":"Link","common.text":"Text","cart.coupon":"Coupon code","misc.sent":"Sent","misc.copied":"Copied","adm.revPending":"Pending","adm.revApproved":"Approved","adm.revRejected":"Rejected","adm.revApprove":"Approve","adm.revReject":"Reject","adm.revReply":"Shop reply","adm.revEmpty":"Nothing in this state","adm.revEmptyHint":"No new reviews or questions to moderate.","rev.buyer":"Buyer","rev.visitor":"Visitor","rev.shopReply":"Shop reply","fb.new":"New","fb.seen":"Seen","fb.inProgress":"In progress","fb.done":"Done","fb.rejected":"Rejected","feedback.suggestion":"Suggestion","feedback.complaint":"Complaint","feedback.bug":"Bug report","adm.fbEmptyHint":"No suggestions, complaints or bug reports yet.","adm.cpNew":"New coupon","adm.cpPercent":"Percent","adm.cpAmount":"Fixed amount","adm.cpValue":"Value","adm.cpUsage":"Usage","adm.cpDates":"Validity","adm.cpStart":"Starts","adm.cpEnd":"Ends","adm.cpExpired":"Expired","adm.adNew":"New banner","adm.adSlot":"Placement slot","adm.adsHint":"Schedule, enable or disable banners anywhere on the site.","adm.notifNew":"New notification","adm.notifHint":"Send a notification to everyone or to one user.","adm.notifLevel":"Level","adm.notifRecent":"Recent notifications","notif.level.info":"Info","notif.level.success":"Success","notif.level.warning":"Warning","notif.level.error":"Error","adm.pagesPick":"Pick a page","adm.pagesPickHint":"Choose a page from the list to edit its content.","adm.pgHint":"Changes are text-only and apply immediately.","adm.bPrinter":"Label printer","adm.bPrinterHint":"Labels go to the printer through the browser print dialog.","adm.bScanner":"Barcode scanner","adm.bLabels":"Build & print labels","adm.bPreview":"Label preview","adm.bPriceMode":"Price display mode","adm.bFound":"Product found","adm.bNotFound":"No product with this barcode.","adm.bPickFirst":"Select at least one product first.","adm.ixHint":"Image fingerprints are computed in the browser so visual search works.","adm.ixIndex":"Index remaining images","adm.ixReindex":"Re-index all","adm.ixDone":"Indexing done","adm.audActor":"Actor","adm.audAction":"Action","adm.audTarget":"Target","adm.audMeta":"Details","adm.stOrders":"Orders","adm.stRevenue":"Revenue","adm.stVisits":"Visits","adm.stUsers":"Users","adm.stProducts":"Products","adm.stAvg":"Average order","adm.stByCat":"Category performance","adm.stByBrand":"Top brands","adm.data":"Data","adm.dataHint":"Export, back up and clean up data.","adm.dExport":"Export","adm.dBackup":"Backup","adm.dBackupHint":"A full copy of the database is saved in the data folder.","adm.dCleanup":"Cleanup","adm.dCleanupHint":"Audit entries older than 90 days and expired sessions are removed.","sys.turnOn":"Turn the store on","sys.turnOff":"Turn the store off","sys.offConfirm":"Are you sure? Nobody can buy until you turn it back on.","sys.autoWakeMins":"Auto turn-on after minutes (0 = never)","sys.asleep":"The store is now off.","sys.asleepTimed":"The store is off; it turns back on automatically in {n} minutes.","sys.awake":"The store is on.","sys.sleepBanner":"The store is currently off. Use the \u201CTurn the store on\u201D button at the top of this page.","sys.keepAlive":"Keep the service warm","checkout.guestInfo":"Guest contact details","checkout.guestHint":"You can buy without an account; we only need this to coordinate delivery.","checkout.guestName":"Full name","checkout.guestPhone":"Mobile number","checkout.guestPhoneHint":"e.g. 09123456789","checkout.guestNameRequired":"Please enter your name.","checkout.guestPhoneInvalid":"Mobile number must be 11 digits starting with 09.","checkout.guestCodPickup":"Cash on delivery is only available for courier shipping. For pickup, pay online or sign in.","home.recent":"Continue where you left off","home.recentSub":"Products you viewed recently","checkout.guestCourierNote":"Sign in for courier delivery"},yc={fa:Ia,en:ro},_t="fa",Ps=new Set;ve=()=>_t,w=()=>_t==="fa";$c=()=>[...Ps],wc=()=>({fa:Object.keys(Ia).length,en:Object.keys(ro).length})});var Oa={};G(Oa,{applyDyn:()=>L,byId:()=>xc,catIcon:()=>vt,copyText:()=>Rs,countdown:()=>Dc,debounce:()=>Yt,el:()=>ze,esc:()=>p,faDigits:()=>Xe,fileToDataURL:()=>At,fmtDate:()=>H,fmtDay:()=>Ac,fmtMoney:()=>C,fmtMoneyPlain:()=>Cc,fmtNum:()=>b,fmtTel:()=>ne,html:()=>r,icon:()=>c,latinDigits:()=>qc,linkify:()=>Is,locale:()=>Tc,pct:()=>Pc,qs:()=>N,qsa:()=>Sc,raw:()=>pe,safeHref:()=>We,scrollTop:()=>Lc,setLocale:()=>Ns,stars:()=>Me,throttle:()=>Mc,timeAgo:()=>fe});function Fa(e){return Ra+Ba(String(e??""))+Ha}function p(e){if(e==null||e===!1)return Fa("");if(typeof e=="object"&&e!==null&&e[io]!==void 0)return e[io];let a=String(e);return a.includes(Ra)||a.includes(Ha)?Ba(a):Fa(a.replace(/[&<>"'`]/g,s=>kc[s]))}function r(e,...a){let s=e[0];for(let n=0;n<a.length;n++){let o=a[n];Array.isArray(o)?s+=o.map(i=>p(i)).join(""):s+=p(o),s+=e[n+1]}return Fa(s)}function ze(e,a={},s=[]){let n=document.createElement(e);for(let[o,i]of Object.entries(a))i==null||i===!1||(o==="class"?n.className=i:o==="text"?n.textContent=i:o.startsWith("on")&&typeof i=="function"?n.addEventListener(o.slice(2).toLowerCase(),i):o==="style"&&typeof i=="object"?Object.assign(n.style,i):n.setAttribute(o,i));for(let o of[].concat(s))o==null||o===!1||n.appendChild(typeof o=="string"?document.createTextNode(o):o);return n}function c(e,a=""){return pe(`<svg class="ic ${a}" viewBox="0 0 24 24" aria-hidden="true"><use href="#i-${e}"/></svg>`)}function Xe(e){return String(e).replace(/[0-9]/g,a=>Ls[+a])}function qc(e){return String(e).replace(/[۰-۹]/g,a=>Ls.indexOf(a)).replace(/[٠-٩]/g,a=>"\u0660\u0661\u0662\u0663\u0664\u0665\u0666\u0667\u0668\u0669".indexOf(a))}function Ns(e){Ee=e==="en"?"en":"fa"}function b(e){let a=Number(e)||0;return new Intl.NumberFormat(Ee==="fa"?"fa-IR":"en-US").format(a)}function We(e){let a=String(e||"").trim();return/^https?:\/\//i.test(a)?a:""}function ne(e){let a=String(e??"").trim();return a?Ee==="fa"?a.replace(/\d/g,s=>Ls[+s]):a:""}function C(e,{withUnit:a=!0}={}){let s=Math.round(Number(e)||0),n=new Intl.NumberFormat(Ee==="fa"?"fa-IR":"en-US").format(s);return a?pe(`${n} <span class="pc-cur">${Ee==="fa"?"\u062A\u0648\u0645\u0627\u0646":"Toman"}</span>`):n}function Cc(e){return new Intl.NumberFormat(Ee==="fa"?"fa-IR":"en-US").format(Math.round(Number(e)||0))}function H(e,{time:a=!0,short:s=!1}={}){if(!e)return"\u2014";let n=new Date(e);if(Number.isNaN(n.getTime()))return"\u2014";try{let o={calendar:Ee==="fa"?"persian":"gregory"};if(s)return n.toLocaleDateString(Ee==="fa"?"fa-IR":"en-GB",{year:"numeric",month:"short",day:"numeric",...o});let i=n.toLocaleDateString(Ee==="fa"?"fa-IR":"en-GB",{year:"numeric",month:"long",day:"numeric",...o});if(!a)return i;let l=n.toLocaleTimeString(Ee==="fa"?"fa-IR":"en-GB",{hour:"2-digit",minute:"2-digit"});return`${i} \xB7 ${l}`}catch{return n.toISOString().slice(0,16).replace("T"," ")}}function Ac(e){let a=new Date(e);if(Number.isNaN(a.getTime()))return"\u2014";try{return a.toLocaleDateString(Ee==="fa"?"fa-IR":"en-GB",{year:"numeric",month:"short",day:"numeric",calendar:Ee==="fa"?"persian":"gregory"})}catch{return e.slice(0,10)}}function fe(e){let a=new Date(e).getTime();if(Number.isNaN(a))return"\u2014";let s=Math.max(1,Math.floor((Date.now()-a)/1e3)),n=(o,i)=>{try{return new Intl.RelativeTimeFormat(Ee==="fa"?"fa":"en",{numeric:"auto"}).format(-o,i)}catch{return`${o} ${i}`}};return s<60?n(s,"second"):s<3600?n(Math.floor(s/60),"minute"):s<86400?n(Math.floor(s/3600),"hour"):s<2592e3?n(Math.floor(s/86400),"day"):s<31536e3?n(Math.floor(s/2592e3),"month"):n(Math.floor(s/31536e3),"year")}function Dc(e){let a=new Date(e).getTime()-Date.now();if(Number.isNaN(a))return"";if(a<=0)return Ee==="fa"?"\u067E\u0627\u06CC\u0627\u0646 \u06CC\u0627\u0641\u062A":"Expired";let s=Math.floor(a/864e5),n=Math.floor(a%864e5/36e5),o=Math.floor(a%36e5/6e4),i=Math.floor(a%6e4/1e3);if(s>0)return Ee==="fa"?`${Xe(s)} \u0631\u0648\u0632 \u0648 ${Xe(n)} \u0633\u0627\u0639\u062A`:`${s}d ${n}h`;let l=u=>String(u).padStart(2,"0"),m=`${l(n)}:${l(o)}:${l(i)}`;return Ee==="fa"?Xe(m):m}function Me(e,a=""){let s=Math.round(Number(e)||0),n='<span class="pc-stars">';for(let o=1;o<=5;o++)n+=`<svg class="ic ${o<=s?"":"off"} ${a}" aria-hidden="true"><use href="#i-star"/></svg>`;return pe(n+"</span>")}function Pc(e){return`${b(Math.round(Number(e)||0))}\u066A`}function Is(e){let a=p(e);return pe(a.replace(/(https?:\/\/[^\s<]+)/g,s=>`<a href="${s}" target="_blank" rel="noopener noreferrer nofollow">${s}</a>`))}function Yt(e,a=260){let s;return(...n)=>{clearTimeout(s),s=setTimeout(()=>e(...n),a)}}function Mc(e,a=200){let s=0,n=null;return(...o)=>{let i=Date.now(),l=a-(i-s);l<=0?(s=i,e(...o)):(clearTimeout(n),n=setTimeout(()=>{s=Date.now(),e(...o)},l))}}function At(e){return new Promise((a,s)=>{let n=new FileReader;n.onload=()=>a(String(n.result)),n.onerror=()=>s(new Error("read-failed")),n.readAsDataURL(e)})}function Rs(e){return navigator.clipboard?.writeText?navigator.clipboard.writeText(e):new Promise((a,s)=>{try{let n=document.createElement("textarea");n.value=e,n.setAttribute("readonly",""),n.style.position="fixed",n.style.opacity="0",document.body.appendChild(n),n.select(),document.execCommand("copy"),document.body.removeChild(n),a()}catch(n){s(n)}})}function L(e=document){e.querySelectorAll("[data-w]").forEach(a=>{a.style.width=a.dataset.w}),e.querySelectorAll("[data-h]").forEach(a=>{a.style.height=a.dataset.h}),e.querySelectorAll("[data-maxw]").forEach(a=>{a.style.maxWidth=a.dataset.maxw})}function Lc(e=!0){window.scrollTo({top:0,behavior:e?"smooth":"auto"})}var io,Ra,Ha,Ba,pe,kc,N,Sc,xc,Ec,vt,Ls,Ee,Tc,B=O(()=>{io=Symbol("raw"),Ra="",Ha="",Ba=e=>e.replace(/[\u0001\u0002]/g,"");try{if(typeof Element<"u"){let e=Object.getOwnPropertyDescriptor(Element.prototype,"innerHTML");e&&e.set&&e.configurable!==!1&&Object.defineProperty(Element.prototype,"innerHTML",{configurable:!0,enumerable:e.enumerable,get(){return e.get.call(this)},set(s){e.set.call(this,typeof s=="string"&&(s.includes(Ra)||s.includes(Ha))?Ba(s):s)}});let a=Element.prototype.insertAdjacentHTML;a&&(Element.prototype.insertAdjacentHTML=function(s,n){return a.call(this,s,typeof n=="string"&&(n.includes(Ra)||n.includes(Ha))?Ba(n):n)})}}catch{}pe=e=>Fa(e),kc={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","`":"&#96;"};N=(e,a=document)=>a.querySelector(e),Sc=(e,a=document)=>[...a.querySelectorAll(e)],xc=e=>document.getElementById(e);Ec={cable:"cable",adapter:"plug",case:"shield",glass:"layers",powerbank:"battery",battery:"battery",dongle:"plug",speaker:"speaker",audio:"headset",wearable:"watch",content:"camera",gaming:"zap",car:"truck",light:"light",mics:"mic",misc:"box",watch:"watch",phone:"phone"},vt=e=>Ec[e]||"box",Ls=["\u06F0","\u06F1","\u06F2","\u06F3","\u06F4","\u06F5","\u06F6","\u06F7","\u06F8","\u06F9"];Ee="fa";Tc=()=>Ee});var va={};G(va,{BUILD:()=>Hs,CONSENT_TTL_DAYS:()=>bo,CONSENT_VERSION:()=>Xs,S:()=>d,adInSlot:()=>nt,addSearch:()=>Js,addToCart:()=>za,applyCoupon:()=>Wa,applyPrefs:()=>kt,boot:()=>Os,brandById:()=>Nc,brandName:()=>Fe,can:()=>V,cartCount:()=>Hc,catById:()=>yt,catName:()=>ke,clearCart:()=>zs,clearSearches:()=>Bc,connectEvents:()=>en,deleteNotification:()=>Ks,emit:()=>Z,feat:()=>I,getImgIndex:()=>Fc,hasAlert:()=>Va,hasConsent:()=>Zs,inCompare:()=>Ys,inWishlist:()=>_a,isAdmin:()=>Ic,isPlus:()=>Ve,loadCart:()=>Te,loadNotifications:()=>ut,loadPrefs:()=>uo,markNotificationsRead:()=>Ya,mergeGuestData:()=>Gs,on:()=>Le,ordersCfg:()=>Fs,plusCfg:()=>ga,prodName:()=>ue,promptInstall:()=>fa,pushRecent:()=>Qs,refreshBootstrap:()=>Ne,refreshMe:()=>Ye,removeFromCart:()=>Us,setConsent:()=>Ga,setImgIndex:()=>Oc,setPref:()=>wt,setQty:()=>js,settings:()=>Bs,ship:()=>pt,store:()=>_e,themeCfg:()=>po,toggleAlert:()=>Vs,toggleCompare:()=>_s,toggleWishlist:()=>Ws,ui:()=>Ze,watchInstall:()=>an,watchNetwork:()=>tn});function Le(e,a){return ba.has(e)||ba.set(e,new Set),ba.get(e).add(a),()=>ba.get(e)?.delete(a)}function Z(e,a){for(let s of ba.get(e)||[])try{s(a)}catch(n){console.error("[state]",e,n)}}function mt(e,a){try{let s=localStorage.getItem(e);return s?JSON.parse(s):a}catch{return a}}function $t(e,a){try{localStorage.setItem(e,JSON.stringify(a))}catch{}}function uo(){let e=mt(qe.prefs,{});if(d.prefs={...d.prefs,...e},d.me?.prefs){let a=d.me.prefs;a.theme&&(d.prefs.theme=a.theme),a.locale&&(d.prefs.locale=a.locale),a.density&&a.density!=="normal"&&(d.prefs.density=a.density),a.reduceMotion!==void 0&&(d.prefs.reduceMotion=!!a.reduceMotion),a.uiSound!==void 0&&(d.prefs.uiSound=!!a.uiSound)}return d.prefs}function wt(e,a,{sync:s=!0}={}){if(d.prefs[e]=a,$t(qe.prefs,d.prefs),kt(),Z("prefs",{key:e,value:a}),s&&d.me&&["theme","locale","density","reduceMotion","uiSound"].includes(e)){let n={theme:d.prefs.theme,locale:d.prefs.locale,density:d.prefs.density,reduceMotion:d.prefs.reduceMotion,uiSound:!!d.prefs.uiSound};h.patch("/api/me",{prefs:n}).then(o=>{o?.me&&(d.me=o.me,Z("me",d.me))}).catch(()=>{})}}function kt(){let e=document.documentElement,a=po(),s=d.prefs,n=s.locale||"fa";Ms(n),Ns(n),e.setAttribute("data-lang",n);let o=s.theme||a.mode||"dark";o==="auto"&&(o=window.matchMedia?.("(prefers-color-scheme: light)").matches?"light":"dark"),e.setAttribute("data-mode",o),e.setAttribute("data-theme",a.theme||"default"),e.setAttribute("color-scheme",o),e.setAttribute("data-port",a.portTheme===!1?"off":"on"),e.setAttribute("data-bg",a.bgStyle||"waves"),e.setAttribute("data-variant",a.variant==="classic"?"classic":"fresh");let i=Math.max(0,Math.min(28,Number(a.radius??16)));e.style.setProperty("--radius",`${i}px`),e.style.setProperty("--radius-sm",`${Math.max(4,Math.round(i*.68))}px`),e.style.setProperty("--radius-lg",`${Math.round(i*1.5)}px`);let l=s.density==="compact"||s.density==="comfy"?s.density:a.density||"normal";e.setAttribute("data-density",l),e.setAttribute("data-contrast",a.contrast==="high"?"high":"normal");let m=s.reduceMotion===!0||a.animations===!1;e.setAttribute("data-motion",m?"off":"on");let u=/^#[0-9a-f]{6}$/i.test(String(a.accent||"").trim())?a.accent.trim():"#f59e0b",[f,v,S]=Rc(u).split(",").map(K=>parseInt(K,10));e.style.setProperty("--accent",u),e.style.setProperty("--accent-rgb",`${f}, ${v}, ${S}`),e.style.setProperty("--accent-2",lo(u,-34)),e.style.setProperty("--accent-3",lo(u,52)),e.style.setProperty("--accent-soft",`rgba(${f}, ${v}, ${S}, .14)`);let k=Ze();e.setAttribute("data-nav",k.navStyle==="underline"?"underline":"pills"),e.setAttribute("data-cards",k.cardStyle==="list"?"list":"grid"),e.style.setProperty("--cols-m",String(ja(k.columns?.mobile,2,1,3))),e.style.setProperty("--cols-t",String(ja(k.columns?.tablet,3,2,4))),e.style.setProperty("--cols-d",String(ja(k.columns?.desktop,4,3,6))),e.style.setProperty("--cols-w",String(ja(k.columns?.wide,5,3,7))),e.style.setProperty("--ticker-dur",`${Math.max(8,Number(k.tickerSpeed)||30)}s`);let E=document.getElementById("headerGrid");E&&(E.setAttribute("data-search-position",["start","center","end"].includes(k.searchPosition)?k.searchPosition:"center"),E.setAttribute("data-header-layout",["logoStart","split","centered"].includes(k.headerLayout)?k.headerLayout:"split"));let M=document.getElementById("siteHeader");M&&M.setAttribute("data-sticky",k.stickyHeader===!1?"off":"on");let q=document.getElementById("topbar");q&&(q.hidden=k.showTicker===!1&&!d.ticker.length),Z("theme",{mode:o,loc:n}),setTimeout(()=>{let K=document.querySelector('meta[name="theme-color"]');if(K){let ae=getComputedStyle(e).getPropertyValue("--bg").trim();ae&&K.setAttribute("content",ae)}},50)}function ja(e,a,s,n){let o=Number(e);return Number.isFinite(o)?Math.max(s,Math.min(n,Math.round(o))):a}function Rc(e){let a=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(String(e).trim());return a?`${parseInt(a[1],16)}, ${parseInt(a[2],16)}, ${parseInt(a[3],16)}`:"49, 175, 212"}function lo(e,a){let s=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(String(e).trim());if(!s)return e;let n=o=>Math.max(0,Math.min(255,o+a)).toString(16).padStart(2,"0");return`#${n(parseInt(s[1],16))}${n(parseInt(s[2],16))}${n(parseInt(s[3],16))}`}async function Os(){d.recent=mt(qe.recent,[]),d.searches=mt(qe.search,[]),d.consent=mt(qe.consent,null),d.wishlist=mt(qe.wish,[]),d.compare=mt(qe.cmp,[]),d.installed=window.matchMedia?.("(display-mode: standalone)").matches||typeof navigator<"u"&&navigator.standalone===!0;let e=null,a=Date.now();for(let s=0;s<10&&!e;s++){s&&await new Promise(n=>setTimeout(n,5e3));try{e=await h.get("/api/bootstrap")}catch(n){console.warn("[state] bootstrap failed",n)}!e&&Date.now()-a>6e3&&Z("boot-slow")}return e&&(d.serverTime=e.serverTime,d.sleeping=!!e.sleeping,d.sleepSince=e.sleepSince||null,d.settings=e.settings||{},d.categories=e.categories||[],d.brands=e.brands||[],d.me=e.me||null,d.stats=e.stats||null,d.ads=e.ads||[],d.ticker=e.ticker||[],d.orderStatuses=e.orderStatuses||[],d.ticketCategories=e.ticketCategories||[],d.ticketPriorities=e.ticketPriorities||[]),e||Z("boot-failed"),uo(),kt(),d.me&&(d.wishlist=d.me.wishlist||[],d.compare=d.me.compare||[],d.alerts=d.me.alerts||[],d.unread=d.me.unreadNotifications||0),await Promise.all([Te().catch(()=>{}),d.me?ut(!0).catch(()=>{}):Promise.resolve()]),d.ready=!0,en(),Z("ready",d),d}async function Ne({silent:e=!1}={}){try{let a=await h.get("/api/bootstrap");return d.settings=a.settings||d.settings,d.sleeping=!!a.sleeping,d.sleepSince=a.sleepSince||null,d.categories=a.categories||d.categories,d.brands=a.brands||d.brands,d.stats=a.stats||null,d.ads=a.ads||[],d.ticker=a.ticker||[],a.me!==void 0&&(d.me=a.me||null,Z("me",d.me)),kt(),Z("settings",d.settings),d}catch(a){if(!e)throw a;return d}}async function Ye(){if(!d.me)return null;try{let e=await h.get("/api/me");return d.me=e.me||null,d.me&&(d.wishlist=d.me.wishlist||[],d.compare=d.me.compare||[],d.alerts=d.me.alerts||[],d.unread=d.me.unreadNotifications||0),Z("me",d.me),d.me}catch{return d.me}}async function Te(){try{let e=await h.get("/api/cart");d.cart=e.cart||d.cart,e.quote?.freeOver!==void 0&&(d.freeOver=e.quote.freeOver),e.quote?.plus!==void 0&&(d.cartPlus=e.quote.plus)}catch{d.cart={items:[],count:0,subtotal:0,weight:0,coupon:null}}return Z("cart",d.cart),d.cart}async function za(e,a=1){let s=await h.post("/api/cart/add",{productId:e,qty:a});return d.cart=s.cart,Z("cart",d.cart),s}async function js(e,a){let s=await h.patch("/api/cart/item",{productId:e,qty:a});return d.cart=s.cart,Z("cart",d.cart),s}async function Us(e){let a=await h.del(`/api/cart/item/${encodeURIComponent(e)}`);return d.cart=a.cart,Z("cart",d.cart),a}async function zs(){let e=await h.post("/api/cart/clear");return d.cart=e.cart||{items:[],count:0,subtotal:0,weight:0,coupon:null},Z("cart",d.cart),e}async function Wa(e){let a=await h.post("/api/cart/coupon",{code:e});return d.cart=a.cart,Z("cart",d.cart),a}async function ha(e,a){let s=await h.post(`/api/me/${e}/${encodeURIComponent(a)}`);return e==="wishlist"&&(d.wishlist=s.wishlist||d.wishlist),e==="compare"&&(d.compare=s.compare||d.compare),e==="alerts"&&(d.alerts=s.alerts||d.alerts),s}async function Ws(e){if(!d.me){let s=d.wishlist.indexOf(e);return s>=0?d.wishlist.splice(s,1):d.wishlist.push(e),$t(qe.wish,d.wishlist),Z("wishlist",d.wishlist),{in:d.wishlist.includes(e)}}let a=await ha("wishlist",e);return Z("wishlist",d.wishlist),a}async function _s(e){if(!d.me){let s=d.compare.indexOf(e);return s>=0?d.compare.splice(s,1):(d.compare.length>=4&&d.compare.shift(),d.compare.push(e)),$t(qe.cmp,d.compare),Z("compare",d.compare),{in:d.compare.includes(e)}}let a=await ha("compare",e);return Z("compare",d.compare),a}async function Vs(e){if(!d.me)throw new Error("login_required");let a=await ha("alerts",e);return Z("alerts",d.alerts),a}async function Gs(){if(!d.me)return;let e=mt(qe.wish,[]),a=mt(qe.cmp,[]),s=[];for(let n of e)d.wishlist.includes(n)||s.push(ha("wishlist",n).catch(()=>{}));for(let n of a)!d.compare.includes(n)&&d.compare.length<4&&s.push(ha("compare",n).catch(()=>{}));await Promise.all(s),Z("wishlist",d.wishlist),Z("compare",d.compare)}async function ut(e=!1){if(!d.me)return d.notifications=[],d.unread=0,[];try{let a=await h.get("/api/me/notifications");d.notifications=a.items||[],d.unread=d.notifications.filter(s=>!s.read).length,d.me&&(d.me.unreadNotifications=d.unread),Z("notifications",d.notifications)}catch(a){if(!e)throw a}return d.notifications}async function Ya(e,a=!1){let s=await h.post("/api/me/notifications/read",{ids:e||[],all:a});return await ut(!0),s}async function Ks(e){await h.del(`/api/me/notifications/${encodeURIComponent(e)}`),await ut(!0)}function Qs(e){I("recentlyViewed")&&(d.recent=[e,...d.recent.filter(a=>a!==e)].slice(0,12),$t(qe.recent,d.recent),Z("recent",d.recent))}function Js(e){let a=String(e||"").trim();a&&(d.searches=[a,...d.searches.filter(s=>s!==a)].slice(0,8),$t(qe.search,d.searches))}function Bc(){d.searches=[],$t(qe.search,[])}function Ga(e){d.consent={...e,v:Xs,at:new Date().toISOString()},$t(qe.consent,d.consent),d.me&&h.patch("/api/me",{consent:!0}).catch(()=>{}),Z("consent",d.consent)}function en(){if(st)try{st.close()}catch{}if(!(typeof EventSource>"u")){try{st=new EventSource("/api/events",{withCredentials:!0})}catch{return}st.addEventListener("ready",()=>{d.online=!0}),st.addEventListener("support",e=>{Z("sse:support",Ua(e.data))}),st.addEventListener("ticket",e=>{Z("sse:ticket",Ua(e.data)),Z("notif",Ua(e.data))}),st.addEventListener("notif",e=>{Z("sse:notif",Ua(e.data)),ut(!0)}),st.addEventListener("settings",()=>Ne({silent:!0})),st.onerror=()=>{try{st.close()}catch{}clearTimeout(mo),mo=setTimeout(en,8e3)}}}function Ua(e){try{return JSON.parse(e)}catch{return null}}function tn(){window.addEventListener("online",()=>{d.online=!0,Z("online",!0),Te().catch(()=>{})}),window.addEventListener("offline",()=>{d.online=!1,Z("online",!1)})}function an(){window.addEventListener("beforeinstallprompt",e=>{e.preventDefault(),d.installPrompt=e,Z("install",e)}),window.addEventListener("appinstalled",()=>{d.installed=!0,d.installPrompt=null,Z("installed")})}async function fa(){if(!d.installPrompt)return!1;d.installPrompt.prompt();let e=await d.installPrompt.userChoice;return d.installPrompt=null,e?.outcome==="accepted"}function Fc(){return mt(qe.imgIdx,null)}function Oc(e){$t(qe.imgIdx,e)}var qe,d,ba,Hs,Bs,_e,Ze,po,I,pt,ga,Fs,yt,Nc,Ve,Ic,V,ke,Fe,ue,nt,Hc,_a,Ys,Va,Xs,bo,Zs,st,mo,_=O(()=>{Q();W();B();qe={prefs:"bm_prefs_v1",cart:"bm_cart_local_v1",wish:"bm_wish_v1",cmp:"bm_cmp_v1",recent:"bm_recent_v1",search:"bm_search_v1",consent:"bm_consent_v1",imgIdx:"bm_img_index_v1"},d={ready:!1,serverTime:null,sleeping:!1,sleepSince:null,settings:null,categories:[],brands:[],me:null,stats:null,ads:[],ticker:[],orderStatuses:[],ticketCategories:[],ticketPriorities:[],cart:{items:[],count:0,subtotal:0,weight:0,coupon:null},wishlist:[],compare:[],alerts:[],notifications:[],unread:0,recent:[],searches:[],prefs:{theme:"dark",locale:"fa",density:"normal",reduceMotion:!1,view:"grid"},consent:null,online:typeof navigator<"u"?navigator.onLine:!0,installPrompt:null,installed:!1},ba=new Map;Hs="bm-v44",Bs=()=>d.settings||{},_e=()=>d.settings?.store||{},Ze=()=>d.settings?.ui||{},po=()=>d.settings?.theme||{},I=e=>d.settings?.features?.[e]!==!1,pt=()=>d.settings?.shipping||{},ga=()=>d.settings?.plus||{},Fs=()=>d.settings?.orders||{},yt=e=>d.categories.find(a=>a.id===e)||null,Nc=e=>d.brands.find(a=>a.id===e)||null,Ve=()=>!!(d.me?.plus?.active&&d.me?.plus?.until&&new Date(d.me.plus.until)>new Date),Ic=()=>!!d.me?.isAdmin,V=e=>d.me?d.me.role==="owner"?!0:d.me.permissions?.[e]===!0:!1,ke=e=>ve()==="fa"?e?.name||"":e?.nameEn||e?.name||"",Fe=e=>ve()==="fa"?e?.name||"":e?.nameEn||e?.name||"",ue=e=>ve()==="fa"?e?.name||"":e?.nameEn||e?.name||"",nt=e=>I("ads")?d.ads.filter(a=>a.slot===e&&a.active!==!1):[];Hc=()=>d.cart?.count||0;_a=e=>d.wishlist.includes(e),Ys=e=>d.compare.includes(e),Va=e=>d.alerts.includes(e);Xs=2,bo=180,Zs=()=>{let e=d.consent;if(!e?.at||(e.v||1)!==Xs)return!1;let a=Date.now()-Date.parse(e.at);return Number.isFinite(a)&&a>=0&&a<bo*864e5};st=null,mo=null});var Ja={};G(Ja,{adaptive:()=>Qc,clearInvalid:()=>Ka,confirmDelete:()=>Oe,confirmDialog:()=>ge,copyWithToast:()=>si,drawer:()=>sn,emptyState:()=>P,errorState:()=>F,fillSelect:()=>ai,installHintModal:()=>Lt,lightbox:()=>Mt,listSkeleton:()=>Xc,loadingBar:()=>wa,markInvalid:()=>ti,modal:()=>ie,notice:()=>$a,productSkeleton:()=>Jc,promptDialog:()=>ot,readForm:()=>ei,sheet:()=>Kc,spinner:()=>ya,tableSkeleton:()=>Zc,toast:()=>oe,toastApiError:()=>y,toastError:()=>j,toastSuccess:()=>$,toastWarn:()=>Gc,uiClickSound:()=>Qa,uiSoundEnabled:()=>cn,updateSleepScreen:()=>rn,wireAccordions:()=>nn,wireTabs:()=>on,withBusy:()=>A});function oe(e,{type:a="info",title:s="",timeout:n=3800,action:o=null}={}){let i=zc();if(!i)return null;let l=`t${++Yc}`,m=_c[a]||"info",u=ze("div",{class:`toast ${m}`,id:l,role:a==="error"?"alert":"status"});for(u.innerHTML=r`
    ${c(Vc[a]||"info")}
    <div class="grow">
      ${s?r`<div class="toast-t">${s}</div>`:""}
      <div class="${s?"toast-d":"toast-t"}">${e}</div>
    </div>
    ${o?r`<button type="button" class="toast-act" data-tid="${l}">${o.label}</button>`:""}
    <button type="button" class="toast-x" aria-label="${t("common.close")}" data-close="${l}">${c("close")}</button>`,i.appendChild(u);i.children.length>4;)i.firstElementChild.remove();let f=()=>{u.isConnected&&(u.classList.add("out"),setTimeout(()=>u.remove(),220))},v=n>0?setTimeout(f,n):null;return u.addEventListener("click",S=>{if(S.target.closest("[data-close]")){clearTimeout(v),f();return}if(o&&S.target.closest("[data-tid]")){clearTimeout(v),f();try{o.onClick()}catch(k){console.error(k)}}}),{close:()=>{clearTimeout(v),f()}}}function y(e,a="err.generic"){let s=e instanceof Je?ve()==="en"&&e.details||e.message:Ds(e);j(s||t(a))}function ho(e){e?(document.body.classList.add("locked"),document.documentElement.classList.add("locked")):Dt.length||(document.body.classList.remove("locked"),document.documentElement.classList.remove("locked"))}function Pt(e){let{kind:a="modal",title:s="",subtitle:n="",size:o="md",body:i="",footer:l="",onMount:m=null,onClose:u=null,closeBtn:f=!0,dismissible:v=!0}=e,S=a==="modal"?jc():Uc();if(!S)return{close:()=>{}};let k=document.activeElement,E=window.innerWidth<760,M=a==="drawer"&&E?"sheet":a,q=ze("div",{class:`overlay${M==="drawer"?" overlay-drawer":""}${M==="sheet"?" overlay-sheet":""}`}),K=M==="modal"?`modal ${Wc[o]??""}`.trim():M,ae=ze("div",{class:K,role:"dialog","aria-modal":"true"});s&&ae.setAttribute("aria-label",s);let Se=M==="modal"?"modal-h":"drawer-h",Qe=M==="modal"?"modal-b":"drawer-b";ae.innerHTML=r`
    ${s?r`<header class="${Se}">
      <div class="grow"><h3>${s}</h3>${n?r`<p class="small muted">${n}</p>`:""}</div>
      ${f?r`<button type="button" class="layer-x" data-lx aria-label="${t("common.close")}">${c("close")}</button>`:""}
    </header>`:f?r`<button type="button" class="layer-x" data-lx aria-label="${t("common.close")}">${c("close")}</button>`:""}
    <div class="${Qe}">${i}</div>
    ${l?r`<footer class="modal-f">${l}</footer>`:""}`,q.appendChild(ae),S.appendChild(q),ho(!0);let se=!1,$e={panel:ae,overlay:q,result:void 0,dismissible:v,close(R){if(!se){se=!0,$e.result=R,q.classList.add("out"),ae.classList.add("out"),setTimeout(()=>{q.remove();let Be=Dt.indexOf($e);Be>=0&&Dt.splice(Be,1),ho(!1);try{k?.focus?.({preventScroll:!0})}catch{}},190);try{u?.(R)}catch(Be){console.error(Be)}}}};Dt.push($e),q.addEventListener("click",R=>{if(f&&R.target.closest("[data-lx]")){$e.close(null);return}R.target===q&&v&&$e.close(null)}),ae.addEventListener("keydown",R=>{if(R.key!=="Tab")return;let je=[...ae.querySelectorAll('a[href], button:not([disabled]), textarea, input:not([type=hidden]), select, [tabindex]:not([tabindex="-1"])')].filter(at=>at.offsetParent!==null);if(!je.length)return;let J=je[0],we=je[je.length-1];R.shiftKey&&document.activeElement===J?(R.preventDefault(),we.focus()):!R.shiftKey&&document.activeElement===we&&(R.preventDefault(),J.focus())}),setTimeout(()=>{let R=ae.querySelector("[data-autofocus], input:not([type=hidden]), textarea, select");try{R?.focus({preventScroll:!0})}catch{}},70);try{m?.(ae,$e)}catch(R){console.error(R)}return $e}function ge({title:e="",text:a="",okText:s="",cancelText:n="",danger:o=!1,icon:i="alert"}={}){return new Promise(l=>{let m=!1;Pt({kind:"modal",title:e||t("common.warning"),size:"sm",body:r`
        <div class="confirm-body">
          <span class="confirm-ic ${o?"danger":""}">${c(i)}</span>
          <p class="confirm-text">${a}</p>
        </div>`,footer:r`
        <button type="button" class="btn btn-ghost" data-no>${n||t("common.cancel")}</button>
        <button type="button" class="btn ${o?"btn-danger":"btn-primary"}" data-yes data-autofocus>${s||t("common.confirm")}</button>`,onClose:()=>l(m),onMount:(u,f)=>{u.querySelector("[data-no]").addEventListener("click",()=>{m=!1,f.close()}),u.querySelector("[data-yes]").addEventListener("click",()=>{m=!0,f.close()})}})})}function ot({title:e="",text:a="",label:s="",value:n="",type:o="text",okText:i="",required:l=!1,rows:m=4}={}){return new Promise(u=>{let f=null;Pt({kind:"modal",title:e||t("common.note"),size:"sm",body:r`
        <form class="prompt-form" data-pf>
          ${a?r`<p class="confirm-text mb-s">${a}</p>`:""}
          <label class="field">
            <span class="label">${s||e}</span>
            ${o==="textarea"?r`<textarea class="textarea" name="v" rows="${m}" data-autofocus>${n}</textarea>`:r`<input class="input" type="${o}" name="v" value="${n}" data-autofocus>`}
          </label>
        </form>`,footer:r`
        <button type="button" class="btn btn-ghost" data-no>${t("common.cancel")}</button>
        <button type="button" class="btn btn-primary" data-yes>${i||t("common.confirm")}</button>`,onClose:()=>u(f),onMount:(v,S)=>{let k=v.querySelector("[name=v]"),E=()=>{let M=String(k.value||"").trim();if(l&&!M){k.classList.add("invalid"),k.focus();return}f=M,S.close()};v.querySelector("[data-no]").addEventListener("click",()=>{f=null,S.close()}),v.querySelector("[data-yes]").addEventListener("click",E),v.querySelector("[data-pf]").addEventListener("submit",M=>{M.preventDefault(),E()}),k.addEventListener("keydown",M=>{M.key==="Enter"&&o!=="textarea"&&(M.preventDefault(),E())})}})})}function Mt(e,a=0,s=""){let n=E=>typeof E=="string"?{url:E,kind:"image"}:E,o=(Array.isArray(e)?e:[e]).filter(Boolean).map(n).filter(E=>E.url);if(!o.length)return null;let i=Math.max(0,Math.min(a,o.length-1)),l=null,m=1,u=0,f=0,v=E=>{let M=E?.querySelector(".lb-img");M&&(M.style.transform=`translate(${u.toFixed(0)}px, ${f.toFixed(0)}px) scale(${m.toFixed(2)})`),E?.classList.toggle("zoomed",m>1.01)},S=()=>{m=1,u=0,f=0},k=()=>{let E=o[i],M=E.kind==="video"?`<video class="lb-img lb-video" src="${E.url}" controls playsinline autoplay preload="metadata"></video>`:`<img class="lb-img" src="${E.url}" alt="${s||t("img.alt")}" decoding="async" draggable="false">`;return r`
    <figure class="lb-figure">
      ${pe(M)}
      <div class="lb-tools" role="toolbar" aria-label="${t("pdp.zoomHint")}">
        <button type="button" class="icon-btn" data-zin aria-label="${t("pdp.zoomIn")}">${c("plus")}</button>
        <button type="button" class="icon-btn" data-zout aria-label="${t("pdp.zoomOut")}">${c("minus")}</button>
        <button type="button" class="icon-btn tiny-txt" data-zreset aria-label="${t("pdp.zoomReset")}">1x</button>
      </div>
      ${o.length>1?r`<figcaption class="lb-count">${i+1} / ${o.length}${E.kind==="video"?` \xB7 ${t("pdp.video")}`:""}</figcaption>`:""}
    </figure>`};return Pt({kind:"modal",size:"lg",title:"",body:r`<div data-lb>${k()}</div>`,footer:o.length>1?r`
      <button type="button" class="btn btn-ghost" data-prev>${c("chevron-right")} ${t("common.prev")}</button>
      <button type="button" class="btn btn-ghost" data-next>${t("common.next")} ${c("chevron-left")}</button>`:"",onClose:()=>{l&&document.removeEventListener("keydown",l),l=null},onMount:E=>{let M=E.querySelector("[data-lb]"),q=()=>M.querySelector(".lb-figure"),K=R=>{i=(i+R+o.length)%o.length,S(),M.innerHTML=k(),$e()};E.querySelector("[data-prev]")?.addEventListener("click",()=>K(-1)),E.querySelector("[data-next]")?.addEventListener("click",()=>K(1));let ae=(R,Be,je)=>{let J=Math.max(1,Math.min(4,m*R));J===1?(u=0,f=0):Be!=null&&(u=Be-(Be-u)*(J/m),f=je-(je-f)*(J/m)),m=J,v(q())},Se=new Map,Qe=0,se=1,$e=()=>{let R=q();if(!R)return;let Be=R.querySelector(".lb-img");R.addEventListener("wheel",J=>{if(o[i].kind==="video")return;J.preventDefault();let we=R.getBoundingClientRect();ae(J.deltaY<0?1.18:1/1.18,J.clientX-we.left-we.width/2,J.clientY-we.top-we.height/2)},{passive:!1}),R.addEventListener("dblclick",J=>{if(o[i].kind==="video")return;let we=R.getBoundingClientRect();m>1.01?S():ae(2.5,J.clientX-we.left-we.width/2,J.clientY-we.top-we.height/2),v(R)}),R.addEventListener("pointerdown",J=>{if(o[i].kind!=="video"){if(Se.set(J.pointerId,[J.clientX,J.clientY]),Se.size===2){let[we,at]=[...Se.values()];Qe=Math.hypot(we[0]-at[0],we[1]-at[1]),se=m}R.setPointerCapture?.(J.pointerId)}}),R.addEventListener("pointermove",J=>{if(!Se.has(J.pointerId))return;let we=Se.get(J.pointerId);if(Se.set(J.pointerId,[J.clientX,J.clientY]),Se.size===2&&Qe){let[at,Ct]=[...Se.values()],Wt=Math.hypot(at[0]-Ct[0],at[1]-Ct[1]);m=Math.max(1,Math.min(4,se*(Wt/Qe))),m===1&&(u=0,f=0),v(R)}else m>1.01&&(u+=J.clientX-we[0],f+=J.clientY-we[1],v(R))});let je=J=>{Se.delete(J.pointerId),Se.size<2&&(Qe=0)};R.addEventListener("pointerup",je),R.addEventListener("pointercancel",je),R.querySelector("[data-zin]")?.addEventListener("click",()=>ae(1.3)),R.querySelector("[data-zout]")?.addEventListener("click",()=>ae(1/1.3)),R.querySelector("[data-zreset]")?.addEventListener("click",()=>{S(),v(R)}),v(R)};$e(),l=R=>{R.key==="ArrowLeft"?K(1):R.key==="ArrowRight"?K(-1):R.key==="+"||R.key==="="?ae(1.3):R.key==="-"?ae(1/1.3):R.key==="0"&&(S(),v(q()))},document.addEventListener("keydown",l)}})}function Jc(e=8){let a="";for(let s=0;s<e;s++)a+='<div class="sk sk-card"></div>';return pe(`<div class="pgrid">${a}</div>`)}function Xc(e=5,a=3){let s="";for(let n=0;n<e;n++){let o="";for(let i=0;i<a;i++)o+=`<div class="sk sk-line w${[70,40,55,80][i%4]}"></div>`;s+=r`<div class="card row-card">${o}</div>`}return s}function Zc(e=6,a=4){let s="";for(let n=0;n<e;n++){let o="";for(let i=0;i<a;i++)o+=`<td><div class="sk sk-line w${[80,55,40,70][i%4]}"></div></td>`;s+=`<tr>${o}</tr>`}return pe(`<div class="table-wrap"><table class="table"><tbody>${s}</tbody></table></div>`)}function P({icon:e="box",title:a="",text:s="",action:n=null,act:o=null}={}){return r`
    <div class="empty">
      <span class="empty-ic">${c(e)}</span>
      <h4>${a||t("common.noData")}</h4>
      ${s?r`<p>${s}</p>`:""}
      ${n?r`<a class="btn btn-primary" href="${n.href||"#/"}">${n.label}</a>`:""}
      ${o?r`<button type="button" class="btn btn-primary" data-act="${o.act}" ${o.arg?r`data-arg="${o.arg}"`:""}>${o.label}</button>`:""}
    </div>`}function F({title:e="",text:a="",retryAct:s="ui-retry"}={}){return r`
    <div class="empty">
      <span class="empty-ic danger">${c("alert")}</span>
      <h4>${e||t("err.generic")}</h4>
      ${a?r`<p>${a}</p>`:""}
      <button type="button" class="btn btn-primary" data-act="${s}">${t("common.retry")}</button>
    </div>`}function wa(e){e?(clearTimeout(go),St||(St=ze("div",{class:"loadbar"}),St.innerHTML='<span class="loadbar-fill"></span>',document.body.appendChild(St)),requestAnimationFrame(()=>St?.classList.add("on"))):go=setTimeout(()=>{St?.classList.remove("on"),setTimeout(()=>{St?.remove(),St=null},420)},160)}async function A(e,a,{busyText:s=""}={}){let n=typeof e=="string"?N(e):e,o=n?n.innerHTML:"";try{return n&&(n.disabled=!0,n.classList.add("busy"),n.innerHTML=r`<span class="spinner"></span>${s||t("common.loading")}`),await a()}finally{n&&(n.disabled=!1,n.classList.remove("busy"),n.innerHTML=o)}}function ei(e){let a={},s=new FormData(e);for(let[n,o]of s.entries())n in a&&!Array.isArray(a[n])?a[n]=[a[n],o]:n in a?a[n].push(o):a[n]=o;for(let n of e.querySelectorAll("input[type=checkbox]"))a[n.name]=n.checked;return a}function ti(e,a,s){let n=e.querySelector(`[name="${a}"]`);if(!n)return;n.classList.add("invalid");let o=n.closest(".field")?.querySelector(".field-err");o||(o=ze("span",{class:"field-err"}),(n.closest(".field")||n.parentElement).appendChild(o)),o.textContent=s;try{n.focus({preventScroll:!1})}catch{}}function Ka(e){e.querySelectorAll(".invalid").forEach(a=>a.classList.remove("invalid")),e.querySelectorAll(".field-err").forEach(a=>a.remove())}function ai(e,a,{valueKey:s="id",labelKey:n="label",placeholder:o="",selected:i=""}={}){if(!e)return;let l=o?[`<option value="">${p(o)}</option>`]:[];for(let m of a){let u=m[s];l.push(`<option value="${p(u)}"${String(u)===String(i)?" selected":""}>${p(m[n])}</option>`)}e.innerHTML=l.join("")}async function si(e,a){let{copyText:s}=await Promise.resolve().then(()=>(B(),Oa));try{await s(String(e)),$(a||t("common.copied"))}catch{j(t("err.generic"))}}function Lt(){let e=ve()==="fa"?["\u0645\u0646\u0648\u06CC \u0645\u0631\u0648\u0631\u06AF\u0631 (\u22EE \u06CC\u0627 \u062F\u06A9\u0645\u0647\u0654 \u0627\u0634\u062A\u0631\u0627\u06A9\u200C\u06AF\u0630\u0627\u0631\u06CC) \u0631\u0627 \u0628\u0627\u0632 \u06A9\u0646.","\u06AF\u0632\u06CC\u0646\u0647\u0654 \xAB\u0627\u0641\u0632\u0648\u062F\u0646 \u0628\u0647 \u0635\u0641\u062D\u0647\u0654 \u0627\u0635\u0644\u06CC\xBB \u06CC\u0627 \xABInstall app\xBB \u0631\u0627 \u0628\u0632\u0646.","\u062A\u0623\u06CC\u06CC\u062F \u06A9\u0646\u061B \u0622\u06CC\u06A9\u0648\u0646 \u06AF\u0631\u06CC\u0646 \u0627\u067E\u0644 \u0628\u0647 \u0635\u0641\u062D\u0647\u0654 \u0627\u0635\u0644\u06CC \u0627\u0636\u0627\u0641\u0647 \u0645\u06CC\u200C\u0634\u0648\u062F."]:["Open the browser menu (\u22EE or the Share button).","Choose \u201CAdd to Home screen\u201D or \u201CInstall app\u201D.","Confirm \u2014 the Green Apple icon appears on your home screen."];ie({title:t("misc.addToHome"),size:"sm",body:r`
      <div class="install-hint">
        <ol class="steps-list">${e.map(a=>r`<li>${a}</li>`)}</ol>
        <p class="muted small">${t("misc.installHint")}</p>
      </div>`,footer:r`<button type="button" class="btn btn-primary" data-ok>${t("common.done")}</button>`,onMount:(a,s)=>a.querySelector("[data-ok]").addEventListener("click",()=>s.close())})}function nn(e=document){e.querySelectorAll(".acc-h").forEach(a=>{a.dataset.wired||(a.dataset.wired="1",a.addEventListener("click",()=>{let s=a.closest(".acc-item"),n=s.classList.toggle("open"),o=s.querySelector(".acc-b");o&&(o.hidden=!n),a.setAttribute("aria-expanded",String(n))}))})}function on(e=document,a=null){e.querySelectorAll(".tabs").forEach(s=>{s.dataset.wired||(s.dataset.wired="1",s.addEventListener("click",n=>{let o=n.target.closest("[data-tab]");if(!o)return;let i=o.dataset.tab;s.querySelectorAll("[data-tab]").forEach(m=>m.classList.toggle("active",m===o)),e.querySelectorAll("[data-panel]").forEach(m=>{m.hidden=m.dataset.panel!==i}),a?.(i)}))})}function rn({sleeping:e=!1,canWake:a=!1,since:s=null,onWake:n=null,onLogin:o=null}={}){let i="sleepScreen",l=document.getElementById(i);if(!e){l&&l.remove(),document.body?.classList.remove("sleeping");return}document.body?.classList.add("sleeping");let m=ve()==="fa",u=m?"\u0641\u0631\u0648\u0634\u06AF\u0627\u0647 \u0627\u0644\u0627\u0646 \u062E\u0627\u0645\u0648\u0634 \u0627\u0633\u062A":"The store is asleep",f=m?"\u0628\u0631\u0627\u06CC \u0627\u0633\u062A\u0631\u0627\u062D\u062A \u0648 \u0646\u06AF\u0647\u062F\u0627\u0631\u06CC\u060C \u0641\u0631\u0648\u0634\u06AF\u0627\u0647 \u0631\u0627 \u062E\u0627\u0645\u0648\u0634 \u06A9\u0631\u062F\u0647\u200C\u0627\u06CC\u0645. \u06A9\u0633\u06CC \u0646\u0645\u06CC\u200C\u062A\u0648\u0627\u0646\u062F \u0633\u0641\u0627\u0631\u0634 \u062B\u0628\u062A \u06A9\u0646\u062F \u062A\u0627 \u062F\u0648\u0628\u0627\u0631\u0647 \u0631\u0648\u0634\u0646 \u0634\u0648\u062F.":"The shop was switched off for a break. Nobody can place orders until it is turned on again.",v=s?`<div class="tiny sleep-since">${m?"\u062E\u0627\u0645\u0648\u0634 \u0627\u0632":"Asleep since"}: ${new Date(s).toLocaleString(m?"fa-IR":"en-GB")}</div>`:"";l||(l=document.createElement("div"),l.id=i,l.className="sleep-screen",l.setAttribute("role","dialog"),l.setAttribute("aria-modal","true"),document.body?.appendChild(l)),l.innerHTML=r`
    <div class="sleep-card">
      <span class="sleep-ic">${c("moon")}</span>
      <h2>${u}</h2>
      <p>${f}</p>
      ${pe(v)}
      ${a?r`<button class="btn btn-primary btn-block mt" data-sleep-wake>${c("zap")} ${m?"\u0631\u0648\u0634\u0646 \u06A9\u0631\u062F\u0646 \u0641\u0631\u0648\u0634\u06AF\u0627\u0647":"Turn the store on"}</button>`:r`
          <a class="btn btn-outline btn-block mt" href="#/auth" data-sleep-login>${c("user")} ${m?"\u0648\u0631\u0648\u062F \u0645\u062F\u06CC\u0631 \u0628\u0631\u0627\u06CC \u0631\u0648\u0634\u0646 \u06A9\u0631\u062F\u0646":"Sign in as admin to turn it on"}</a>
          <button class="btn btn-ghost btn-block mt-s" data-sleep-reload>${c("refresh")} ${m?"\u062A\u0644\u0627\u0634 \u062F\u0648\u0628\u0627\u0631\u0647":"Try again"}</button>`}
      <p class="tiny sleep-note">${m?"\u062E\u0648\u062F\u06A9\u0627\u0631 \u062E\u0627\u0645\u0648\u0634 \u0646\u0645\u06CC\u200C\u0634\u0648\u062F\u061B \u062A\u0627 \u0648\u0642\u062A\u06CC \u0631\u0648\u0634\u0646\u0634 \u0646\u06A9\u0646\u06CC \u062E\u0627\u0645\u0648\u0634 \u0645\u06CC\u200C\u0645\u0627\u0646\u062F.":"It never turns off by itself \u2014 it stays off until you switch it on."}</p>
    </div>`,l.querySelector("[data-sleep-wake]")?.addEventListener("click",async S=>{let k=S.currentTarget;k.disabled=!0;try{await n?.()}finally{k.disabled=!1}}),l.querySelector("[data-sleep-reload]")?.addEventListener("click",()=>location.reload()),l.querySelector("[data-sleep-login]")?.addEventListener("click",()=>o?.())}function fo(e){e.querySelectorAll?.('input[type="password"]')?.forEach(a=>{if(a.dataset.pwdDone)return;a.dataset.pwdDone="1";let s=document.createElement("span");s.className="pwd-wrap",a.parentNode.insertBefore(s,a),s.appendChild(a);let n=document.createElement("button");n.type="button",n.className="pwd-eye",n.dataset.eye="1",n.setAttribute("aria-label",t("pwd.show")),n.title=t("pwd.show"),n.innerHTML=c("eye"),s.appendChild(n)})}function Qa(e=!1){if(!(!e&&!cn()))try{xt=xt||new(window.AudioContext||window.webkitSoundContext||window.webkitAudioContext),xt.state==="suspended"&&xt.resume();let a=xt.currentTime,s=xt.createOscillator(),n=xt.createGain();s.type="sine",s.frequency.setValueAtTime(1560,a),s.frequency.exponentialRampToValueAtTime(1180,a+.06),n.gain.setValueAtTime(1e-4,a),n.gain.exponentialRampToValueAtTime(.045,a+.008),n.gain.exponentialRampToValueAtTime(1e-4,a+.075),s.connect(n).connect(xt.destination),s.start(a),s.stop(a+.09)}catch{}}function cn(){try{return!!JSON.parse(localStorage.getItem("bm_prefs_v1")||"{}").uiSound}catch{return!1}}var jc,Uc,zc,Wc,_c,Vc,Yc,$,j,Gc,Dt,ie,sn,Kc,Qc,Oe,ya,$a,St,go,xt,X=O(()=>{B();W();Q();jc=()=>N("#modalRoot"),Uc=()=>N("#drawerRoot"),zc=()=>N("#toastRoot"),Wc={sm:"narrow",md:"",lg:"wide",xl:"wide"},_c={success:"success",error:"error",warn:"warning",warning:"warning",info:"info"},Vc={success:"check-circle",error:"alert",warn:"alert",warning:"alert",info:"info"},Yc=0;$=(e,a)=>oe(e,{type:"success",...a}),j=(e,a)=>oe(e,{type:"error",timeout:5600,...a}),Gc=(e,a)=>oe(e,{type:"warn",...a});Dt=[];document.addEventListener("keydown",e=>{if(e.key==="Escape"&&Dt.length){let a=Dt[Dt.length-1];a.dismissible!==!1&&(e.preventDefault(),a.close(null))}});ie=e=>Pt({kind:"modal",...e}),sn=e=>Pt({kind:"drawer",...e}),Kc=e=>Pt({kind:"sheet",...e}),Qc=e=>Pt({kind:window.innerWidth<760?"sheet":"modal",...e});Oe=e=>ge({title:t("common.delete"),text:e||t("misc.confirmDelete"),okText:t("common.delete"),danger:!0,icon:"trash"});ya=(e="")=>r`<div class="row center mt-l" role="status"><span class="spinner"></span>${e?r`<span class="muted small">${e}</span>`:""}</div>`;$a=(e,a)=>r`
  <div class="notice notice-${e}">${c(e==="success"?"check-circle":e==="danger"?"alert":"info")}<div class="grow">${a}</div></div>`,St=null,go=null;document.addEventListener("click",e=>{let a=e.target.closest?.("[data-eye]");if(!a)return;let s=a.parentElement?.querySelector("input");if(!s)return;let n=s.type==="password";s.type=n?"text":"password",a.innerHTML=c(n?"eye-off":"eye");let o=n?t("pwd.hide"):t("pwd.show");a.setAttribute("aria-label",o),a.title=o,s.focus({preventScroll:!0})},!0);new MutationObserver(e=>{for(let a of e)a.addedNodes.forEach(s=>{s.nodeType===1&&fo(s)})}).observe(document.documentElement,{childList:!0,subtree:!0});fo(document);xt=null;document.addEventListener("pointerdown",e=>{cn()&&e.target.closest?.('button, a, [role="button"], .pcard, .chip, .gal-thumb')&&Qa(!0)},!0)});function Nt(e,a=""){let s=e.images&&e.images[0]||"",n=ue(e)||t("img.alt");return s?r`<img class="${a}" src="${s}" alt="${n}" loading="lazy" decoding="async" data-glyph="${e.glyph||"misc"}">`:pe(`<svg class="ic ph-img ${a}" data-glyph="${p(e.glyph||"misc")}" role="img" aria-label="${p(n)}"><use href="#i-${vt(e.glyph||"misc")}"/></svg>`)}function ni(e,{quick:a=null}={}){let s=(Ze().productCardInfo||[]).includes("brand"),n=(Ze().productCardInfo||[]).includes("stock"),o=(Ze().productCardInfo||[]).includes("rating"),i=a!==null?a:I("compare")||Ze().quickView!==!1,l=e.stock??0,m=l<=0?"out":l<=3?"low":"";return r`
  <article class="pcard" data-pid="${e.id}">
    <div class="pc-media">
      <a href="#/product/${e.id}" aria-label="${ue(e)}">${Nt(e)}</a>
      <div class="ribbon">
        ${e.discountPct>0?r`<span class="badge-pill bp-danger">${b(e.discountPct)}٪ ${t("pdp.off")}</span>`:""}
        ${l<=0?r`<span class="badge-pill bp-muted">${t("card.outOfStock")}</span>`:""}
        ${e.featured?r`<span class="badge-pill bp-accent">${c("star")} ${t("home.featured")}</span>`:""}
      </div>
      <div class="pc-quick">
        ${Ze().quickView!==!1?r`<button type="button" class="pc-qbtn" data-act="quick-view" data-id="${e.id}" title="${t("card.quickView")}" aria-label="${t("card.quickView")}">${c("eye")}</button>`:""}
        ${I("wishlist")?r`<button type="button" class="pc-qbtn" data-act="wish-toggle" data-id="${e.id}" title="${t("card.wishlistAdd")}" aria-label="${t("card.wishlistAdd")}">${c("heart")}</button>`:""}
        ${I("compare")?r`<button type="button" class="pc-qbtn" data-act="compare-toggle" data-id="${e.id}" title="${t("card.compareAdd")}" aria-label="${t("card.compareAdd")}">${c("compare")}</button>`:""}
      </div>
    </div>
    <div class="pc-body">
      ${s&&e.brandName?r`<span class="pc-brand">${ve()==="fa"?e.brandName:e.brandNameEn||e.brandName}</span>`:""}
      <h3 class="pc-name"><a href="#/product/${e.id}">${ue(e)}</a></h3>
      ${o&&e.ratingCount>0?r`<div class="pc-rate">${Me(e.ratingAvg)} <span>${b(e.ratingAvg)} (${b(e.ratingCount)})</span></div>`:""}
      ${n?r`<div class="pc-stock ${m}"><span class="dot"></span>${l<=0?t("card.outOfStock"):l<=3?t("common.lowStock"):t("common.inStock")}</div>`:""}
      <div class="pc-price">
        ${e.oldPrice>e.price?r`<span class="pc-old">${C(e.oldPrice)}</span>`:""}
        <span class="pc-now">${C(e.price)}</span>
      </div>
      <div class="pc-actions">
        <button type="button" class="btn btn-primary" data-act="add-cart" data-id="${e.id}" ${l<=0?"disabled":""}>${c("cart")} ${t("card.addToCart")}</button>
      </div>
    </div>
  </article>`}function vo(e,a=null){return r`
    <a class="cat-card" href="#/category/${e.id}">
      <span class="cat-ic">${c(vt(e.glyph))}</span>
      <span class="cat-name">${ke(e)}</span>
      ${a!==null?r`<span class="cat-count">${b(a)} ${t("catalog.count")}</span>`:""}
    </a>`}function oi(e){let a=ve()==="en"&&e.titleEn?e.titleEn:e.title,s=ve()==="en"&&e.textEn?e.textEn:e.text,n=ve()==="en"&&e.ctaEn?e.ctaEn:e.cta;return r`
    <div class="banner">
      <div class="banner-body">
        <div class="banner-title">${a}</div>
        ${s?r`<div class="banner-text">${s}</div>`:""}
      </div>
      ${e.link?r`<a class="btn btn-primary banner-cta" href="${e.link.startsWith("#")||e.link.startsWith("/")?e.link:"#/"}">${n||t("common.more")} ${c("chevron-left")}</a>`:""}
    </div>`}function Ae({titleIcon:e="",title:a="",sub:s="",link:n=null,linkLabel:o=""}){return r`
    <div class="section-head">
      <div>
        <h2 class="section-title">${e?c(e):""}${a}</h2>
        ${s?r`<p class="section-sub">${s}</p>`:""}
      </div>
      ${n?r`<a class="section-link" href="${n}">${o||t("common.showAll")} ${c("chevron-left")}</a>`:""}
    </div>`}function Xa(e){return Ze().showBreadcrumbs===!1||!e?.length?"":r`
    <nav class="breadcrumb" aria-label="breadcrumb">
      <a href="#/">${c("home")} ${t("nav.home")}</a>
      ${e.map((a,s)=>r`
        ${c("chevron-left")}
        ${s===e.length-1?r`<span aria-current="page">${a.label}</span>`:r`<a href="${a.href}">${a.label}</a>`}`)}
    </nav>`}function rt(e,a,s){if(a<=1)return"";let n=(u,f,v="",S=!1)=>r`
    <a class="pg ${v}" href="${S?"#":s(u)}" ${S?'aria-disabled="true" tabindex="-1"':""} ${u===e?'aria-current="page"':""}>${f}</a>`,o=[],i=u=>{u>=1&&u<=a&&!o.includes(u)&&o.push(u)};i(1),i(2);for(let u=e-1;u<=e+1;u++)i(u);i(a-1),i(a),o.sort((u,f)=>u-f);let l=[n(e-1,c("chevron-right"),"",e<=1)],m=0;for(let u of o)m&&u-m>1&&l.push(r`<span class="pg pg-gap" aria-hidden="true">…</span>`),l.push(n(u,b(u),u===e?"active":"")),m=u;return l.push(n(e+1,c("chevron-left"),"",e>=a)),r`<nav class="pagination" aria-label="${t("common.page")}">${pe(l.join(""))}</nav>`}function bt(e){return r`<span class="badge-pill ${ri[e]||"bp-muted"}">${t(`st.${e}`)}</span>`}function Rt(e){return r`<span class="badge-pill ${{paid:"bp-success",unpaid:"bp-warn",pending:"bp-warn",refunded:"bp-muted",failed:"bp-danger",cancelled:"bp-muted"}[e?.status]||"bp-muted"}">${t(`ps.${e?.status||"unpaid"}`)}</span>`}function Gt(e){let a=e.timeline||[];return a.length?r`
    <div class="timeline">
      ${a.map(s=>r`
        <div class="tl-item">
          <div class="tl-t">${t(`st.${s.status}`)||s.status}</div>
          <div class="tl-d">${H(s.at)}${s.note?` \u2014 ${s.note}`:""}${s.by?` \xB7 ${s.by}`:""}</div>
        </div>`)}
    </div>`:""}function xe({icon:e="box",label:a="",value:s="",sub:n=""}){return r`
    <div class="stat-card">
      <span class="stat-ic">${c(e)}</span>
      <div><div class="stat-val">${s}</div><div class="stat-lbl">${a}</div>${n?r`<div class="tiny muted">${n}</div>`:""}</div>
    </div>`}function De({label:e="",value:a="",sub:s="",icon:n=""}){return r`
    <div class="kpi">
      <div class="l">${e}</div>
      <div class="v">${a}</div>
      ${s?r`<div class="s">${s}</div>`:""}
    </div>`}function Za(e,{height:a=130}={}){let s=Math.max(1,...e.map(n=>n.value));return r`
    <div class="chart" ${a?r`data-h="${a}px"`:""}>
      ${e.map(n=>r`<div class="bar" data-tip="${n.label}: ${b(n.value)}" data-h="${Math.max(2,Math.round(n.value/s*100))}%"></div>`)}
    </div>
    <div class="chart-x">${e.map(n=>r`<span>${n.short||""}</span>`)}</div>`}function re(e,a,{emptyText:s=null}={}){return a.length?r`
    <div class="table-wrap">
      <table class="table">
        <thead><tr>${e.map(n=>r`<th class="${n.cls||""}">${n.label}</th>`)}</tr></thead>
        <tbody>${pe(a.join(""))}</tbody>
      </table>
    </div>`:pe(`<div class="empty"><h4>${p(s||t("common.noData"))}</h4></div>`)}function x({label:e="",name:a,type:s="text",value:n="",placeholder:o="",required:i=!1,hint:l="",attrs:m="",span2:u=!1,autocomplete:f=""}){return r`
    <label class="field ${u?"span-2":""}">
      <span class="label">${e}${i?r`<span class="req">*</span>`:""}</span>
      <input class="input" type="${s}" name="${a}" value="${n}" placeholder="${o}" ${i?"required":""} ${f?r`autocomplete="${f}"`:""} ${m}>
      ${l?r`<span class="hint">${l}</span>`:""}
    </label>`}function Y({label:e="",name:a,value:s="",placeholder:n="",required:o=!1,hint:i="",rows:l=4,span2:m=!1,attrs:u=""}){return r`
    <label class="field ${m?"span-2":""}">
      <span class="label">${e}${o?r`<span class="req">*</span>`:""}</span>
      <textarea class="textarea" name="${a}" rows="${l}" placeholder="${n}" ${o?"required":""} ${u}>${s}</textarea>
      ${i?r`<span class="hint">${i}</span>`:""}
    </label>`}function U({label:e="",name:a,options:s=[],value:n="",required:o=!1,hint:i="",span2:l=!1,placeholder:m=""}){return r`
    <label class="field ${l?"span-2":""}">
      <span class="label">${e}${o?r`<span class="req">*</span>`:""}</span>
      <select class="select" name="${a}" ${o?"required":""}>
        ${m?r`<option value="">${m}</option>`:""}
        ${s.map(u=>r`<option value="${u.value}" ${String(u.value)===String(n)?"selected":""}>${u.label}</option>`)}
      </select>
      ${i?r`<span class="hint">${i}</span>`:""}
    </label>`}function Kt({label:e="",name:a,checked:s=!1,hint:n=""}){return r`
    <label class="check">
      <input type="checkbox" name="${a}" ${s?"checked":""}>
      <span class="box">${c("check")}</span>
      <span>${e}${n?r`<span class="hint">${n}</span>`:""}</span>
    </label>`}function he({label:e="",desc:a="",name:s,checked:n=!1,value:o=""}){return r`
    <div class="switch-row">
      <div><div class="t">${e}</div>${a?r`<div class="d">${a}</div>`:""}</div>
      <label class="switch">
        <input type="checkbox" name="${s}" value="${o}" ${n?"checked":""}>
        <span class="track"></span>
      </label>
    </div>`}function es({value:e=1,max:a=99,min:s=1,name:n="qty",small:o=!1}){return r`
    <div class="qty" data-qty>
      <button type="button" data-q="-1" aria-label="-1">${c("minus")}</button>
      <input type="number" name="${n}" value="${e}" min="${s}" max="${a}" inputmode="numeric">
      <button type="button" data-q="1" aria-label="+1">${c("plus")}</button>
    </div>`}function ts({name:e="rating",value:a=0}){return r`
    <div class="stars-input" data-stars name-wrap="${e}" role="radiogroup" aria-label="${t("pdp.yourRating")}">
      ${[1,2,3,4,5].map(s=>r`
        <button type="button" data-star="${s}" class="${s<=a?"on":""}" role="radio" aria-checked="${s===a}" aria-label="${s}">
          <svg class="ic"><use href="#i-star"/></svg>
        </button>`)}
      <input type="hidden" name="${e}" value="${a}">
    </div>`}function ln(e,{showPlus:a=!0}={}){let s=[];return s.push(r`<div class="sum-row"><span>${t("common.subtotal")}</span><span class="v">${C(e.subtotal)}</span></div>`),a&&e.plusDiscount>0&&s.push(r`<div class="sum-row discount"><span>${t("acc.plus")} (${b(e.plusDiscountPct||3)}٪)</span><span class="v">−${C(e.plusDiscount)}</span></div>`),e.couponDiscount>0&&s.push(r`<div class="sum-row discount"><span>${t("common.discountCode")}: ${e.coupon?.code||""}</span><span class="v">−${C(e.couponDiscount)}</span></div>`),s.push(r`<div class="sum-row"><span>${t("common.shipping")}${e.shippingLabel?r` <span class="muted tiny">(${e.shippingLabel})</span>`:""}</span><span class="v">${e.shipping===0?t("common.free"):C(e.shipping)}</span></div>`),e.insured&&s.push(r`<div class="sum-row"><span>${t("common.insurance")}</span><span class="v">${e.insuranceFee===0?t("common.free"):C(e.insuranceFee)}</span></div>`),s.push(r`<div class="sum-row total"><span>${t("common.payable")}</span><span class="v">${C(e.total)}</span></div>`),pe(s.join(""))}function yo(e){let a=Number(pt().freeOver??0);if(!a||e>=a)return r`<div class="notice notice-success mt-s">${c("truck")}<div>${t("cart.freeShipDone")}</div></div>`;let s=Math.min(100,Math.round(e/a*100));return r`
    <div class="mt-s">
      <div class="progress"><i data-w="${s}%"></i></div>
      <p class="hint mt-s">${t("cart.freeShipHint",{amount:C(a-e,{withUnit:!0}).replace(/<[^>]+>/g,"")})}</p>
    </div>`}function Qt(){let e=w();return r`
    <svg viewBox="0 0 640 360" preserveAspectRatio="xMidYMid slice" role="img" aria-label="${t("contact.mapTitle")}">
      <rect class="mm-bg" width="640" height="360"/>
      <!-- دریا -->
      <path class="mm-sea" d="M0 292c60-14 120 10 180 2s110-24 170-14 130 26 190 12 100-18 100-18V360H0Z"/>
      <g class="mm-wave" fill="none">
        <path d="M28 316c14-8 26 8 40 0s26 8 40 0"/>
        <path d="M250 330c14-8 26 8 40 0s26 8 40 0"/>
        <path d="M470 318c14-8 26 8 40 0s26 8 40 0"/>
      </g>
      <!-- بلوک‌های شهری -->
      <g class="mm-block">
        <rect x="36" y="34" width="150" height="86" rx="10"/>
        <rect x="238" y="34" width="120" height="60" rx="10"/>
        <rect x="452" y="34" width="150" height="86" rx="10"/>
        <rect x="36" y="176" width="110" height="70" rx="10"/>
        <rect x="452" y="176" width="150" height="70" rx="10"/>
      </g>
      <!-- خیابان‌ها -->
      <g class="mm-road" fill="none">
        <path d="M0 148h640"/>
        <path d="M0 268h640"/>
        <path d="M204 0v292"/>
        <path d="M420 0v292"/>
      </g>
      <g class="mm-road-thin" fill="none">
        <path d="M312 148v120"/>
      </g>
      <!-- پاساژ مغازه -->
      <g>
        <rect class="mm-shop" x="238" y="176" width="150" height="70" rx="10"/>
        <text class="mm-txt mm-txt-b" x="313" y="205" text-anchor="middle">${e?"\u067E\u0627\u0633\u0627\u0698 \u0645\u0631\u0648\u0627\u0631\u06CC\u062F \u062E\u0644\u06CC\u062C":"Gulf Pearl Passage"}</text>
        <text class="mm-txt" x="313" y="226" text-anchor="middle">${e?"\u0637\u0628\u0642\u0647\u0654 \u062F\u0648\u0645\u060C \u067E\u0644\u0627\u06A9 \u06F2\u06F4":"2nd floor, No. 24"}</text>
      </g>
      <!-- نام خیابان‌ها -->
      <text class="mm-txt" x="24" y="140">${e?"\u062E\u06CC\u0627\u0628\u0627\u0646 \u0633\u0627\u062D\u0644\u06CC":"Saheli St."}</text>
      <text class="mm-txt" x="446" y="140">${e?"\u06A9\u0648\u0686\u0647\u0654 \u0644\u0646\u062C\u200C\u0633\u0627\u0632\u0627\u0646":"Boat-makers Alley"}</text>
      <text class="mm-txt mm-vert" x="196" y="60" transform="rotate(90 196 60)">${e?"\u0628\u0644\u0648\u0627\u0631 \u0628\u0646\u062F\u0631":"Port Blvd."}</text>
      <!-- نشان مغازه -->
      <g transform="translate(313 176)">
        <circle class="mm-pulse" r="26"/>
        <path class="mm-accent" d="M0-34c11 0 19 8 19 19 0 14-19 31-19 31S-19-1-19-15c0-11 8-19 19-19Z"/>
        <circle class="mm-pin" cx="0" cy="-15" r="7"/>
      </g>
      <g class="mm-tag">
        <rect x="330" y="120" rx="12" width="${e?92:74}" height="26"/>
        <text x="${e?376:367}" y="137" text-anchor="middle">${e?"\u0645\u063A\u0627\u0632\u0647\u0654 \u0645\u0627":"Our shop"}</text>
      </g>
      <!-- قطب‌نما و مقیاس -->
      <g class="mm-compass" transform="translate(596 44)">
        <circle r="17"/>
        <path d="M0-11 4 5 0 1-4 5Z"/>
        <text y="30" text-anchor="middle">N</text>
      </g>
      <g class="mm-scale" transform="translate(36 336)">
        <path d="M0 0h70" fill="none"/>
        <path d="M0-4v8M70-4v8" fill="none"/>
        <text x="78" y="4">${e?"\u06F1\u06F0\u06F0 \u0645\u062A\u0631":"100 m"}</text>
      </g>
    </svg>`}function ka({hidden:e=!1}={}){return r`
  <div class="captcha" data-captcha ${e?"hidden":""}>
    <label class="check"><input type="checkbox" name="captchaBox" data-act="captcha-open"><span class="box">${c("check")}</span><span>${t("captcha.label")}</span></label>
    <div class="captcha-ch" data-cch hidden>
      <div class="captcha-img" data-cimg></div>
      <div class="captcha-row">
        <input class="input" name="captchaAnswer" inputmode="numeric" autocomplete="off" placeholder="${t("captcha.placeholder")}" aria-label="${t("captcha.placeholder")}" data-act="captcha-check">
        <button type="button" class="btn btn-ghost" data-act="captcha-refresh" title="${t("captcha.refresh")}" aria-label="${t("captcha.refresh")}">${c("refresh")}</button>
      </div>
      <div class="captcha-st" data-cst>${t("captcha.hint")}</div>
    </div>
    <input type="hidden" name="captchaToken" data-ctok>
  </div>`}var Ie,It,ri,ce=O(()=>{B();W();_();B();X();Ie=(e,a)=>r`<div class="pgrid">${e.map(s=>ni(s,a))}</div>`;It=(e,a,s="")=>{let n=(a||[]).filter(o=>o.slot===e);return n.length?r`<div class="${s} banner-grid mt">${n.map(oi)}</div>`:""};ri={pending_payment:"bp-warn",pending_review:"bp-warn",confirmed:"bp-info",preparing:"bp-info",ready_pickup:"bp-accent",shipped:"bp-violet",delivered:"bp-success",cancelled:"bp-danger",refunded:"bp-muted",returned:"bp-muted"}});var $o={};G($o,{mount:()=>ii,render:()=>ci,title:()=>li});async function ci(){let e=_e(),a=[];if(I("recentlyViewed")&&(d.recent||[]).length)try{a=(await h.get(`/api/products?ids=${d.recent.slice(0,8).join(",")}&limit=8`)).items||[]}catch{a=[]}let s=[],n=d.categories,o=d.brands,i=d.stats;try{let[k,E,M]=await Promise.all([h.get("/api/products?limit=48&sort=popular"),d.categories.length?Promise.resolve(null):h.get("/api/categories"),d.brands.length?Promise.resolve(null):h.get("/api/brands")]);if(s=k.items||[],E&&(n=E.items||[]),M&&(o=M.items||[]),I("publicStats"))try{i=(await h.get("/api/stats/public")).stats||i}catch{}}catch{}let l=s.filter(k=>k.featured).slice(0,8),m=[...s].sort((k,E)=>(E.sold||0)-(k.sold||0)).slice(0,8),u=[...s].sort((k,E)=>String(E.createdAt||"").localeCompare(String(k.createdAt||""))).slice(0,8),f=s.filter(k=>k.discountPct>0).sort((k,E)=>E.discountPct-k.discountPct).slice(0,8),v=n.filter(k=>!k.parentId).slice(0,12),S=l.length?l:m.slice(0,8);return r`
    ${It("home_hero",nt("home_hero"))}
    ${I("partners")&&d.settings.partners?.items?.length?r`
    <section class="partners-sec partners-top">
      ${Ae({titleIcon:"store",title:t("home.partnersTitle")})}
      <div class="marquee" aria-label="${t("home.partnersTitle")}">
        <div class="marquee-track">
          ${[...d.settings.partners.items,...d.settings.partners.items].map(k=>{let E=(d.brands||[]).find(q=>q.name===k.fa||k.en&&(q.nameEn===k.en||q.nameEn?.toLowerCase()===k.en.toLowerCase())),M=E?`#/products?brand=${E.id}`:`#/search?q=${encodeURIComponent(k.fa)}`;return r`<a class="partner-chip" href="${M}" title="${w()?k.fa:k.en||k.fa}">
              <img class="pt-logo" src="/assets/img/brands/${E?E.id:"no_name"}.svg" alt="" loading="lazy" decoding="async">
              <b>${w()?k.fa:k.en||k.fa}</b></a>`}).join("")}
        </div>
      </div>
    </section>`:""}

    <section class="hero">
      <div class="hero-bg"><img src="/assets/img/hero-port.svg" alt="" decoding="async"></div>
      <div class="hero-inner">
        <span class="hero-kicker">${c("anchor")} ${t("home.heroKicker")}</span>
        <h1 class="hero-title">${t("home.heroTitle")}</h1>
        <p class="hero-text">${t("home.heroText")}</p>
        <div class="hero-cta">
          <a class="btn btn-primary btn-lg" href="#/products">${c("cart")} ${t("home.ctaShop")}</a>
          <a class="btn btn-ghost btn-lg" href="#/products?discount=1">${c("percent")} ${t("home.ctaDeals")}</a>
        </div>
        <div class="hero-points">
          <span class="hero-point">${c("shield")} ${t("home.point1")}</span>
          <span class="hero-point">${c("package-check")} ${t("home.point2")}</span>
          <span class="hero-point">${c("truck")} ${t("home.point3")}</span>
          <span class="hero-point">${c("store")} ${t("home.point4")}</span>
        </div>
      </div>
    </section>

    ${It("home_strip",nt("home_strip"))}

    <section class="section">
      ${Ae({titleIcon:"layers",title:t("home.categories"),sub:t("home.categoriesSub"),link:"#/products",linkLabel:t("common.showAll")})}
      <div class="cat-grid">${v.map(k=>vo(k,k.count??null))}</div>
    </section>

    ${S.length?r`
    <section class="section">
      ${Ae({titleIcon:"star",title:t("home.featured"),sub:t("home.featuredSub"),link:"#/products?sort=popular"})}
      ${Ie(S)}
    </section>`:""}

    ${f.length?r`
    <section class="section">
      ${Ae({titleIcon:"percent",title:t("home.deals"),sub:t("home.dealsSub"),link:"#/products?discount=1"})}
      ${Ie(f)}
    </section>`:""}

    ${m.length?r`
    <section class="section">
      ${Ae({titleIcon:"chart",title:t("home.bestSellers"),sub:t("home.bestSellersSub"),link:"#/products?sort=popular"})}
      ${Ie(m)}
    </section>`:""}

    ${u.length?r`
    <section class="section">
      ${Ae({titleIcon:"sparkles",title:t("home.newArrivals"),sub:t("home.newArrivalsSub"),link:"#/products?sort=newest"})}
      ${Ie(u)}
    </section>`:""}

    ${o.length?r`
    <section class="section">
      ${Ae({titleIcon:"tag",title:t("home.brands")})}
      <div class="row row-wrap">
        ${o.slice(0,18).map(k=>r`<a class="chip" href="#/products?brand=${k.id}">${Fe(k)}</a>`)}
      </div>
    </section>`:""}

    <section class="section">
      ${Ae({titleIcon:"shield",title:t("home.whyUs"),sub:t("home.whyUsSub")})}
      <div class="pwa-grid">
        <div class="pwa-card"><span class="pwa-ic">${c("shield")}</span><div><div class="b">${t("home.point1")}</div><div class="muted small">${w()?"\u0647\u0645\u0647\u0654 \u06A9\u0627\u0644\u0627\u0647\u0627 \u067E\u06CC\u0634 \u0627\u0632 \u0641\u0631\u0648\u0634 \u062A\u0633\u062A \u0645\u06CC\u200C\u0634\u0648\u0646\u062F \u0648 \u0628\u0627 \u0641\u0627\u06A9\u062A\u0648\u0631 \u0631\u0633\u0645\u06CC \u0648 \u06AF\u0627\u0631\u0627\u0646\u062A\u06CC \u0641\u0631\u0648\u0634\u06AF\u0627\u0647 \u062A\u062D\u0648\u06CC\u0644 \u0645\u06CC\u200C\u06AF\u06CC\u0631\u06CC\u062F.":"Every item is tested before sale and delivered with an official invoice and store warranty."}</div></div></div>
        <div class="pwa-card"><span class="pwa-ic">${c("package-check")}</span><div><div class="b">${t("home.point2")}</div><div class="muted small">${w()?"\u0637\u0628\u0642 \u0642\u0627\u0646\u0648\u0646\u060C \u06F7 \u0631\u0648\u0632 \u06A9\u0627\u0631\u06CC \u0641\u0631\u0635\u062A \u062F\u0627\u0631\u06CC \u0628\u062F\u0648\u0646 \u062F\u0644\u06CC\u0644 \u06A9\u0627\u0644\u0627 \u0631\u0627 \u0628\u0631\u06AF\u0631\u062F\u0627\u0646\u06CC\u061B \u0641\u0642\u0637 \u0647\u0632\u06CC\u0646\u0647\u0654 \u0628\u0631\u06AF\u0634\u062A \u0628\u0627 \u062A\u0648\u0633\u062A.":"By law you have 7 working days to return an item without reason; only return shipping is on you."}</div></div></div>
        <div class="pwa-card"><span class="pwa-ic">${c("truck")}</span><div><div class="b">${t("home.point3")}</div><div class="muted small">${w()?"\u0633\u0641\u0627\u0631\u0634\u200C\u0647\u0627 \u0647\u0631 \u0631\u0648\u0632 \u06A9\u0627\u0631\u06CC \u0627\u0632 \u0628\u0648\u0634\u0647\u0631 \u0631\u0627\u0647\u06CC \u0645\u06CC\u200C\u0634\u0648\u0646\u062F\u061B \u062F\u0627\u062E\u0644 \u0634\u0647\u0631 \u0628\u0627 \u067E\u06CC\u06A9 \u0648 \u0628\u0642\u06CC\u0647\u0654 \u0627\u06CC\u0631\u0627\u0646 \u0628\u0627 \u067E\u0633\u062A.":"Orders leave Bushehr every working day \u2014 by courier in the city and by post nationwide."}</div></div></div>
        <div class="pwa-card"><span class="pwa-ic">${c("headset")}</span><div><div class="b">${t("footer.support")}</div><div class="muted small">${w()?"\u0686\u062A \u0622\u0646\u0644\u0627\u06CC\u0646\u060C \u062A\u06CC\u06A9\u062A \u0648 \u062A\u0644\u0641\u0646\u061B \u0646\u0635\u0628 \u06AF\u0644\u0633 \u0648 \u0645\u0634\u0627\u0648\u0631\u0647\u0654 \u062E\u0631\u06CC\u062F \u0647\u0645 \u062F\u0631 \u0645\u063A\u0627\u0632\u0647 \u0631\u0627\u06CC\u06AF\u0627\u0646 \u0627\u0633\u062A.":"Live chat, tickets and phone; screen-guard installation and buying advice are free in store."}</div></div></div>
      </div>
    </section>

    ${I("publicStats")&&i?r`
    <section class="section">
      ${Ae({titleIcon:"chart",title:t("home.statsTitle"),link:"#/stats",linkLabel:t("common.showAll")})}
      <div class="stats-grid">
        ${xe({icon:"box",label:t("stats.products"),value:b(i.products)})}
        ${xe({icon:"package-check",label:t("stats.ordersTotal"),value:b(i.ordersTotal)})}
        ${xe({icon:"cart",label:t("stats.ordersToday"),value:b(i.ordersToday)})}
        ${xe({icon:"eye",label:t("stats.visitsToday"),value:b(i.visitsToday)})}
        ${xe({icon:"users",label:t("stats.customers"),value:b(i.customers)})}
        ${xe({icon:"truck",label:t("stats.delivered"),value:b(i.deliveredOrders)})}
      </div>
    </section>`:""}

    ${I("plus")&&!Ve()?r`
    <section class="section">
      <div class="banner">
        <div class="banner-body">
          <div class="banner-title">${c("sparkles")} ${t("home.plusTitle")}</div>
          <div class="banner-text">${t("home.plusText")}</div>
          <div class="row row-wrap mt-s">
            ${(ga().perks||[]).slice(0,4).map(k=>r`<span class="chip">${c("check")} ${w()?k.fa:k.en}</span>`)}
          </div>
        </div>
        <a class="btn btn-primary banner-cta" href="#/account/plus">${t("home.plusCta")} ${c("chevron-left")}</a>
      </div>
    </section>`:""}

    <section class="section">
      <div class="catalog" >
        <div class="card">
          ${Ae({titleIcon:"store",title:t("home.visitStore"),sub:t("home.visitStoreText")})}
          <p class="muted small mb">${p(w()?e.address||"":e.addressEn||e.address||"")}</p>
          <div class="row row-wrap">
            <a class="btn btn-primary" href="#/pages/contact">${c("map")} ${t("home.openMap")}</a>
            <a class="btn btn-ghost" href="tel:${e.phone}">${c("phone")} ${ne(e.phone||"")}</a>
          </div>
        </div>
        <div class="card">
          ${Ae({titleIcon:"download",title:t("home.appTitle"),sub:t("home.appText")})}
          <div class="row row-wrap">
            <button type="button" class="btn btn-primary" data-act="install-app">${c("download")} ${t("home.installCta")}</button>
          </div>
          <p class="hint mt-s">${t("misc.installHint")}</p>
        </div>
      </div>
    </section>

    ${a.length?r`
    <section class="section">
      ${Ae({titleIcon:"history",title:t("home.recent"),sub:t("home.recentSub")})}
      ${Ie(a)}
    </section>`:""}

    <section class="section">
      <div class="card">
        <div class="minimap" data-act="open-map"" role="button" tabindex="0" aria-label="${t("contact.mapTitle")}">
          ${pe(Qt())}
          <span class="minimap-hint">${c("pin")} ${t("contact.mapHint")}</span>
        </div>
      </div>
    </section>
  `}function ii(){let e=document.querySelector(".marquee"),a=e?.querySelector(".marquee-track");if(!e||!a)return null;let s=0,n=!1,o=0,i=!1,l=0,m=performance.now(),u=0,f=42,v=()=>{let se=parseFloat(getComputedStyle(a).gap||"10")||10;return(a.scrollWidth+se)/2||1},S=()=>{let se=parseFloat(getComputedStyle(a).gap||"10")||10,$e=[...a.children];if(!$e.length)return;let R=a.dataset.base?Number(a.dataset.base):$e.length/2,Be=$e.slice(0,R),je=Be.reduce((Ct,Wt)=>Ct+Wt.offsetWidth+se,0),J=1;for(;je*J<innerWidth*1.6&&J<4;)J++;a.dataset.base=String(R);let we=R*J*2;if($e.length===we)return;let at=document.createDocumentFragment();for(let Ct=0;Ct<2;Ct++)for(let Wt=0;Wt<J;Wt++)Be.forEach(bc=>at.appendChild(bc.cloneNode(!0)));a.innerHTML="",a.appendChild(at)};S(),addEventListener("resize",S,{passive:!0});let k=()=>getComputedStyle(a).direction==="rtl"?1:-1,E=()=>{let se=v();k()>0?(s>=se&&(s-=se),s<0&&(s+=se)):(s<=-se&&(s+=se),s>0&&(s-=se))},M=se=>{let $e=Math.min(.05,(se-m)/1e3);m=se,!n&&!document.documentElement.classList.contains("eco")&&(s+=k()*f*$e),E(),a.style.transform=`translateX(${s.toFixed(1)}px)`,u=requestAnimationFrame(M)};u=requestAnimationFrame(M);let q=se=>{se.pointerType==="mouse"&&se.button!==0||(i=!1,n=!0,o=0,l=se.clientX,e.classList.add("grabbing"),window.addEventListener("pointermove",K),window.addEventListener("pointerup",ae),window.addEventListener("pointercancel",ae))},K=se=>{if(!n)return;let $e=se.clientX-l;s+=$e,o+=Math.abs($e),l=se.clientX},ae=()=>{n=!1,e.classList.remove("grabbing"),o>8&&(i=!0),window.removeEventListener("pointermove",K),window.removeEventListener("pointerup",ae),window.removeEventListener("pointercancel",ae)},Se=se=>{i&&(i=!1,se.preventDefault(),se.stopPropagation())},Qe=se=>se.preventDefault();return e.addEventListener("dragstart",Qe),e.addEventListener("click",Se,!0),e.addEventListener("pointerdown",q),()=>{cancelAnimationFrame(u),e.removeEventListener("pointerdown",q),e.removeEventListener("dragstart",Qe),e.removeEventListener("click",Se,!0),window.removeEventListener("pointermove",K),window.removeEventListener("pointerup",ae),window.removeEventListener("pointercancel",ae)}}var li,wo=O(()=>{B();W();Q();_();ce();li=()=>t("nav.home")});var dn={};G(dn,{mount:()=>mi,render:()=>di});function as(e,a){let s=new URLSearchParams(e.query);for(let[o,i]of Object.entries(a))i===null||i===""||i===void 0?s.delete(o):s.set(o,i);return s.delete("page"),`#${e.params.id?`/category/${e.params.id}`:"/products"}${s.toString()?`?${s}`:""}`}async function di(e){let a=new URLSearchParams(e.query);e.params.id&&a.set("cat",e.params.id);let s=a,n=new URLSearchParams;for(let q of["q","cat","sort","min","max","rating","authenticity","page"])s.get(q)&&n.set(q,s.get(q));s.get("brand")&&n.set("brand",s.get("brand")),s.get("inStock")==="1"&&n.set("inStock","1"),s.get("discount")==="1"&&n.set("discount","1"),n.set("limit","24");let o={items:[],total:0,pages:1,page:1,facets:{}};try{o=await h.get(`/api/products?${n}`)}catch{}let i=o.items||[],l=o.facets||{},m=d.categories,u=d.brands,f=e.params.id?yt(e.params.id):s.get("cat")?yt(s.get("cat")):null,v=(s.get("brand")||"").split(",").filter(Boolean),S=ko.includes(s.get("sort"))?s.get("sort"):"relevant",k=Number(s.get("page"))||1,E=[];if(f){let q=[],K=f;for(;K;)q.unshift(K),K=K.parentId?yt(K.parentId):null;for(let ae of q)E.push({label:ke(ae),href:`#/category/${ae.id}`})}else s.get("q")?E.push({label:`${t("search.resultsFor")} \xAB${s.get("q")}\xBB`}):E.push({label:t("catalog.title")});let M=(q,K,ae,Se,Qe)=>r`
    <label class="fopt">
      <input type="checkbox" data-f="${q}" value="${K}" ${Qe?"checked":""}>
      <span class="cb">${c("check")}</span>
      <span>${ae}</span>
      ${Se!==void 0?r`<span class="cnt">${b(Se)}</span>`:""}
    </label>`;return r`
    ${Xa(E)}
    <div class="section-head">
      <div>
        <h1 class="section-title">${f?ke(f):s.get("q")?t("search.resultsFor")+" \xAB"+s.get("q")+"\xBB":t("catalog.title")}</h1>
        <p class="section-sub">${b(o.total||0)} ${t("catalog.count")}</p>
      </div>
      <button type="button" class="btn btn-ghost only-mobile" data-act="cat-filters">${c("filter")} ${t("catalog.showFilters")}</button>
    </div>

    ${o.didYouMean?r`<div class="notice notice-info mb">${c("sparkles")}<span>${t("search.didYouMean")} <a class="section-link" href="${as(e,{q:o.didYouMean})}">${o.didYouMean}</a></span></div>`:""}

    <div class="catalog">
      <aside class="filters card" id="filtersBox" hidden>
        <div class="row row-between mb-s">
          <strong>${t("catalog.filters")}</strong>
          <button type="button" class="link-btn" data-act="cat-clear">${t("catalog.f.clear")}</button>
        </div>

        <div class="fgroup">
          <button type="button" class="fgroup-h" data-act="acc">${t("catalog.f.category")} ${c("chevron-down")}</button>
          <div class="acc-b fgroup-b" >
            ${m.filter(q=>!q.parentId).map(q=>M("cat",q.id,ke(q),l.categories?.[q.id],(s.get("cat")||e.params.id)===q.id))}
          </div>
        </div>

        <div class="fgroup">
          <button type="button" class="fgroup-h" data-act="acc">${t("catalog.f.brand")} ${c("chevron-down")}</button>
          <div class="acc-b fgroup-b">
            ${u.slice(0,20).map(q=>M("brand",q.id,Fe(q),l.brands?.[q.id],v.includes(q.id)))}
          </div>
        </div>

        <div class="fgroup">
          <div class="fgroup-h">${t("catalog.f.price")}</div>
          <form class="fgroup-b row" data-price-form>
            <input class="input" type="number" min="0" step="10000" name="min" placeholder="${t("common.from")}" value="${s.get("min")||""}">
            <input class="input" type="number" min="0" step="10000" name="max" placeholder="${t("common.to")}" value="${s.get("max")||""}">
            <button class="btn btn-ghost btn-xs" type="submit">${t("common.apply")}</button>
          </form>
        </div>

        <div class="fgroup">
          <div class="fgroup-h">${t("catalog.f.availability")}</div>
          <div class="fgroup-b">
            ${M("flag","inStock",t("catalog.f.inStock"),void 0,s.get("inStock")==="1")}
            ${M("flag","discount",t("catalog.f.discountOnly"),void 0,s.get("discount")==="1")}
          </div>
        </div>

        <div class="fgroup">
          <div class="fgroup-h">${t("catalog.f.rating")}</div>
          <div class="fgroup-b">
            ${[4,3,2].map(q=>M("rating",q,`${b(q)}\u2605 ${t("common.and")} ${t("common.more")}`,void 0,s.get("rating")===String(q)))}
          </div>
        </div>

        <div class="fgroup">
          <div class="fgroup-h">${t("catalog.f.authenticity")}</div>
          <div class="fgroup-b">
            ${["original","highcopy","generic"].map(q=>M("authenticity",q,t(`auth.${q}`),l.authenticity?.[q],s.get("authenticity")===q))}
          </div>
        </div>
      </aside>

      <div>
        <div class="toolbar">
          <span class="muted small">${b(o.total||0)} ${t("catalog.count")}</span>
          <span class="grow"></span>
          <label class="row" >
            <span class="muted small nowrap">${t("common.sort")}</span>
            <button type="button" class="select" data-act="choose-sort" style="text-align: right; display: flex; justify-content: space-between; align-items: center; min-width: 140px; padding-block: 8px;">
              <span data-txt>${t(`catalog.sort.${S}`)}</span>
              ${c("chevron-down")}
            </button>
          </label>
          <div class="btn-group">
            <button type="button" class="btn ${d.prefs.view!=="list"?"active":""}" data-view="grid" title="${t("catalog.viewGrid")}" aria-label="${t("catalog.viewGrid")}">${c("grid")}</button>
            <button type="button" class="btn ${d.prefs.view==="list"?"active":""}" data-view="list" title="${t("catalog.viewList")}" aria-label="${t("catalog.viewList")}">${c("list")}</button>
          </div>
        </div>

        <div class="active-filters" data-activef>
          ${f?r`<span class="chip active" data-unf="cat">${ke(f)} <span class="chip-close">${c("close")}</span></span>`:""}
          ${v.map(q=>r`<span class="chip active" data-unf="brand" data-v="${q}">${Fe({id:q,...d.brands.find(K=>K.id===q)||{}})} <span class="chip-close">${c("close")}</span></span>`)}
          ${s.get("inStock")==="1"?r`<span class="chip active" data-unf="flag" data-v="inStock">${t("catalog.f.inStock")} <span class="chip-close">${c("close")}</span></span>`:""}
          ${s.get("discount")==="1"?r`<span class="chip active" data-unf="flag" data-v="discount">${t("catalog.f.discountOnly")} <span class="chip-close">${c("close")}</span></span>`:""}
          ${s.get("min")||s.get("max")?r`<span class="chip active" data-unf="price">${t("catalog.f.price")} <span class="chip-close">${c("close")}</span></span>`:""}
          ${s.get("rating")?r`<span class="chip active" data-unf="rating">${s.get("rating")}★ <span class="chip-close">${c("close")}</span></span>`:""}
          ${s.get("authenticity")?r`<span class="chip active" data-unf="authenticity">${t(`auth.${s.get("authenticity")}`)} <span class="chip-close">${c("close")}</span></span>`:""}
        </div>

        ${i.length?pe(Ie(i)):P({icon:"search",title:t("search.noResultTitle"),text:t("search.noResultText"),action:{href:"#/products",label:t("cart.goShopping")}})}

        ${rt(k,o.pages||1,q=>as(e,{page:q>1?q:null}))}
      </div>
    </div>
  `}function mi(e,a){L(e);let s=e.querySelector("#filtersBox");window.innerWidth>=980&&(s.hidden=!1);let n=i=>{location.hash=i.replace(/^#/,"")};e.querySelectorAll("[data-view]").forEach(i=>i.addEventListener("click",()=>{wt("view",i.dataset.view,{sync:!1}),document.documentElement.setAttribute("data-cards",i.dataset.view==="list"?"list":"grid"),i.closest(".btn-group").querySelectorAll("button").forEach(l=>l.classList.toggle("active",l===i))}));let o=()=>{let i=new URLSearchParams(a.query);a.params.id&&i.delete("cat");let l=[...e.querySelectorAll('[data-f="cat"]:checked')].map(M=>M.value),m=[...e.querySelectorAll('[data-f="brand"]:checked')].map(M=>M.value),u=e.querySelector('[data-f="rating"]:checked')?.value||"",f=e.querySelector('[data-f="authenticity"]:checked')?.value||"",v=e.querySelector('[data-f="flag"][value="inStock"]:checked')?"1":"",S=e.querySelector('[data-f="flag"][value="discount"]:checked')?"1":"",k=new URLSearchParams;for(let[M,q]of i.entries())["cat","brand","rating","authenticity","inStock","discount","page"].includes(M)||k.set(M,q);l.length&&k.set("cat",l[l.length-1]),m.length&&k.set("brand",m.join(",")),u&&k.set("rating",u),f&&k.set("authenticity",f),v&&k.set("inStock","1"),S&&k.set("discount","1");let E=a.params.id&&!l.length?`/category/${a.params.id}`:"/products";n(`#${E}${k.toString()?`?${k}`:""}`)};return e.querySelectorAll("[data-f]").forEach(i=>i.addEventListener("change",o)),e.querySelector("[data-price-form]")?.addEventListener("submit",i=>{i.preventDefault();let l=new FormData(i.target);n(as(a,{min:l.get("min")||null,max:l.get("max")||null}))}),e.querySelectorAll("[data-unf]").forEach(i=>i.addEventListener("click",()=>{let l=i.dataset.unf,m={};if(l==="cat"&&(m.cat=null,a.params.id)){location.hash=`#/products${a.query.toString()?`?${new URLSearchParams([...a.query.entries()].filter(([u])=>u!=="cat"))}`:""}`;return}if(l==="brand"){let u=(a.query.get("brand")||"").split(",").filter(f=>f&&f!==i.dataset.v);m.brand=u.length?u.join(","):null}l==="flag"&&(m[i.dataset.v]=null),l==="price"&&(m.min=null,m.max=null),l==="rating"&&(m.rating=null),l==="authenticity"&&(m.authenticity=null),n(as(a,m))})),null}var ko,mn=O(()=>{B();W();Q();_();ce();ee();le();ko=["relevant","newest","oldest","cheapest","dearest","popular","rating","discount","name"];g("cat-filters",(e,a)=>{let s=document.getElementById("filtersBox");s&&(s.hidden=!s.hidden,a.textContent=s.hidden?t("catalog.showFilters"):t("catalog.hideFilters"),s.hidden||s.scrollIntoView({behavior:"smooth",block:"start"}))});g("choose-sort",(e,a)=>{let s=new URLSearchParams(location.hash.split("?")[1]||"").get("sort")||"relevant",{sheet:n}=ui,o=n({title:t("common.sort"),body:r`<div class="col" style="gap:4px; padding-bottom: 20px;">
      ${ko.map(i=>r`<button class="btn ${i===s?"active":""}" style="justify-content: flex-start; padding: 14px 16px; background: var(--surface-2); border-radius: 12px; font-size: 15px;" data-v="${i}">${t(`catalog.sort.${i}`)}</button>`).join("")}
    </div>`});o.panel.querySelectorAll("button[data-v]").forEach(i=>{i.addEventListener("click",()=>{let l=i.dataset.v;o.close();let m=new URLSearchParams(location.hash.split("?")[1]||"");l==="relevant"?m.delete("sort"):m.set("sort",l),m.delete("page"),location.hash=`${location.hash.split("?")[0]}${m.toString()?"?"+m.toString():""}`})})});g("cat-clear",()=>{let e=location.hash.includes("/category/")?"#/products":location.hash.split("?")[0];location.hash=e})});var xo={};G(xo,{mount:()=>gi,render:()=>pi,title:()=>fi});async function pi(e){let a=e.params.id,s=null;try{s=await h.get(`/api/products/${encodeURIComponent(a)}`)}catch{return P({icon:"alert",title:t("err.notFound"),text:t("err.notFoundText"),action:{href:"#/products",label:t("err.goHome")}})}let n=s.product,o=s.reviews||[],i=o.filter(q=>q.type!=="question"),l=o.filter(q=>q.type==="question"),m=s.reviewStats||{count:0,avg:0,dist:[0,0,0,0,0],questions:0},u=s.related||[],f=[],v=yt(n.categoryId);for(;v;)f.unshift(v),v=v.parentId?yt(v.parentId):null;let S=(n.images&&n.images.length?n.images:[]).slice(0,6),k=[...S.map(q=>({url:q,kind:"image"})),...(n.videos||[]).slice(0,4).map(q=>({url:q,kind:"video",poster:S[0]||""}))],E=n.stock??0,M=pt().zones||[];return r`
    ${Xa([...f.map(q=>({label:ke(q),href:`#/category/${q.id}`})),{label:ue(n)}])}
    <div class="pdp">
      <div class="gallery">
        <div class="gal-main" data-act="lightbox" data-imgs='${p(JSON.stringify(k))}' data-i="0" role="button" tabindex="0" aria-label="${t("pdp.zoomHint")}">
          ${k[0]?.kind==="video"?r`<video src="${k[0].url}" poster="${k[0].poster}" controls playsinline preload="metadata" class="gal-video"></video>`:S[0]?r`<img src="${S[0]}" alt="${ue(n)}" data-glyph="${n.glyph}">`:pe(`<svg class="ic"><use href="#i-${n.glyph||"box"}"/></svg>`)}
          <span class="gal-zoom-hint" aria-hidden="true">${c("search")} ${t("pdp.zoomHint")}</span>
        </div>
        ${k.length>1?r`<div class="gal-thumbs">${k.map((q,K)=>r`
          <button type="button" class="gal-thumb ${K===0?"active":""}" data-thumb="${K}" aria-label="${K+1}">
            ${q.kind==="video"?pe(`<span class="gt-video">${q.poster?`<img src="${q.poster}" alt="" loading="lazy">`:""}<svg class="ic"><use href="#i-play"/></svg></span>`):r`<img src="${q.url}" alt="" loading="lazy">`}
          </button>`)}</div>`:""}
        <div class="row row-wrap">
          ${I("wishlist")?r`<button type="button" class="btn btn-ghost btn-sm ${_a(n.id)?"btn-danger":""}" data-act="wish-toggle" data-id="${n.id}">${c("heart")} ${_a(n.id)?t("card.wishlistRemove"):t("card.wishlistAdd")}</button>`:""}
          ${I("compare")?r`<button type="button" class="btn btn-ghost btn-sm ${Ys(n.id)?"active":""}" data-act="compare-toggle" data-id="${n.id}">${c("scale")} ${t("compare.add")}</button>`:""}
          <button type="button" class="btn btn-ghost btn-sm" data-act="share" data-title="${ue(n)}">${c("share")} ${t("pdp.share")}</button>
        </div>
      </div>

      <div class="buy-box">
        ${n.brandName?r`<div class="pc-brand">${w()?n.brandName:n.brandNameEn||n.brandName}</div>`:""}
        <h1 class="buy-title">${ue(n)}</h1>
        ${!w()&&n.name?r`<div class="buy-title-en">${n.name}</div>`:""}
        <div class="row row-wrap mt-s">
          <span class="badge-pill bp-accent">${c(bi(n.glyph))} ${ke(f[f.length-1])}</span>
          <span class="badge-pill ${n.authenticity==="original"?"bp-success":n.authenticity==="highcopy"?"bp-warn":"bp-muted"}">${t(`auth.${n.authenticity||"generic"}`)}</span>
          ${n.featured?r`<span class="badge-pill bp-violet">${c("star")} ${t("home.featured")}</span>`:""}
        </div>
        <div class="pc-rate mt-s">${Me(n.ratingAvg)} <span class="muted small">${b(m.avg||n.ratingAvg)} · ${b(m.count||n.ratingCount)} ${t("common.reviews")}</span></div>

        <div class="buy-price">
          ${n.oldPrice>n.price?r`<span class="pc-old">${C(n.oldPrice)}</span>`:""}
          <span class="buy-now">${C(n.price)}</span>
          ${n.discountPct>0?r`<span class="pc-off">${b(n.discountPct)}٪</span>`:""}
        </div>
        ${n.oldPrice>n.price?r`<p class="hint">${t("pdp.save")}: ${C(n.oldPrice-n.price)}</p>`:""}

        <div class="pc-stock ${E<=0?"out":E<=3?"low":""} mt-s">
          <span class="dot"></span>
          ${E<=0?t("card.outOfStock"):t("pdp.stockCount",{n:b(E)})}
          ${E>0&&E<=3?r` <span class="badge-pill bp-warn">${t("common.lowStock")}</span>`:""}
        </div>

        <div class="row mt">
          ${es({value:1,max:Math.max(1,E),name:"qty"})}
          <button type="button" class="btn btn-primary btn-lg grow" data-act="pdp-add" data-id="${n.id}" ${E<=0?"disabled":""}>${c("cart")} ${t("pdp.addToCart")}</button>
        </div>
        <button type="button" class="btn btn-outline btn-block mt-s" data-act="pdp-buy" data-id="${n.id}" ${E<=0?"disabled":""}>${c("zap")} ${t("pdp.buyNow")}</button>

        ${E<=0&&I("priceAlerts")?r`
          <button type="button" class="btn btn-ghost btn-block mt-s ${Va(n.id)?"active":""}" data-act="notify-me" data-id="${n.id}">
            ${c("bell")} ${Va(n.id)?t("common.notified"):t("common.notifyMe")}
          </button>`:""}

        <div class="divider"></div>
        <ul class="col">
          <li class="row"><span class="stat-ic" data-h="30px" data-w="30px">${c("store")}</span><span class="small">${t("pdp.pickup")}</span></li>
          <li class="row"><span class="stat-ic" data-h="30px" data-w="30px">${c("truck")}</span><span class="small">${t("checkout.courier")}: ${M.map(q=>`${w()?q.name:q.nameEn} ${b(q.fee)}`).join(" \xB7 ")}</span></li>
          ${I("insurance")?r`<li class="row"><span class="stat-ic" data-h="30px" data-w="30px">${c("scale")}</span><span class="small">${t("checkout.insuranceDesc")}</span></li>`:""}
          <li class="row"><span class="stat-ic" data-h="30px" data-w="30px">${c("shield")}</span><span class="small">${n.warrantyMonths>0?t("pdp.warrantyMonths",{n:b(n.warrantyMonths)}):t("pdp.noWarranty")}</span></li>
        </ul>

        <div class="divider"></div>
        <div class="row row-between small muted">
          <span>${t("pdp.sku")}: <button type="button" class="link-btn mono" data-act="copy" data-text="${n.sku}">${n.sku}</button></span>
          ${n.barcode?r`<span>${t("pdp.barcode")}: <button type="button" class="link-btn mono" data-act="copy" data-text="${n.barcode}">${n.barcode}</button></span>`:""}
        </div>
        <div class="row row-between small muted mt-s">
          <span>${c("eye")} ${b(n.views)} ${t("pdp.viewed")}</span>
          <span>${c("package-check")} ${b(n.sold)} ${t("pdp.sold")}</span>
        </div>
      </div>
    </div>

    ${It("product_page",nt("product_page"))}

    <section class="section card">
      <div class="tabs" role="tablist">
        <button type="button" class="tab active" data-tab="specs" role="tab">${t("pdp.specs")}</button>
        <button type="button" class="tab" data-tab="desc" role="tab">${t("pdp.description")}</button>
        ${I("reviews")?r`<button type="button" class="tab" data-tab="reviews" role="tab">${t("pdp.reviews")} (${b(m.count)})</button>`:""}
        ${I("questions")?r`<button type="button" class="tab" data-tab="questions" role="tab">${t("pdp.questions")} (${b(m.questions||l.length)})</button>`:""}
      </div>

      <div class="tab-panel" data-panel="specs">
        ${Object.keys(n.specs||{}).length?r`
          <table class="spec-table">
            <tbody>${Object.entries(n.specs).map(([q,K])=>r`<tr><th>${p(q)}</th><td>${p(K)}</td></tr>`)}</tbody>
          </table>`:r`<p class="muted">${t("common.noData")}</p>`}
        ${n.weight?r`<table class="spec-table mt-s"><tbody><tr><th>${t("pdp.weight")}</th><td>${b(n.weight)} ${t("pdp.gram")}</td></tr></tbody></table>`:""}
        ${(n.tags||[]).length?r`<div class="row row-wrap mt">${n.tags.map(q=>r`<a class="tag" href="#/products?q=${encodeURIComponent(q)}">#${q}</a>`)}</div>`:""}
      </div>

      <div class="tab-panel" data-panel="desc" hidden>
        <div class="rev-body">${Is(w()?n.description||"":n.descriptionEn||n.description||"")}</div>
        ${!w()&&n.descriptionEn?"":n.descriptionEn?r`<div class="rev-body muted mt-s" dir="ltr">${p(n.descriptionEn)}</div>`:""}
      </div>

      ${I("reviews")?r`
      <div class="tab-panel" data-panel="reviews" hidden>
        <div class="rev-summary mb">
          <div class="rev-score">
            <div class="n">${b(m.avg||0)}</div>
            ${Me(m.avg||0)}
            <div class="muted small mt-s">${b(m.count)} ${t("common.reviews")}</div>
          </div>
          <div class="rev-bars">
            ${[5,4,3,2,1].map(q=>r`
              <div class="rev-bar"><span>${b(q)}★</span><span class="track"><span class="fill" data-w="${m.count?Math.round((m.dist?.[q-1]||0)/m.count*100):0}%"></span></span><span>${b(m.dist?.[q-1]||0)}</span></div>`)}
          </div>
        </div>
        <div data-reviews>
          ${i.length?i.map(So).join(""):r`<p class="muted">${t("pdp.noReviews")}</p>`}
        </div>
        <div class="divider"></div>
        ${d.me?r`
          <form data-act="review-submit" data-pid="${n.id}">
            <strong>${t("pdp.writeReview")}</strong>
            <div class="mt-s">${ts({name:"rating",value:5})}</div>
            <label class="field mt-s"><span class="label">${t("common.title")}</span><input class="input" name="title" maxlength="80" required></label>
            <label class="field"><span class="label">${t("common.body")}</span><textarea class="textarea" name="body" maxlength="1500" required></textarea></label>
            <button class="btn btn-primary" type="submit">${t("common.submit")}</button>
          </form>`:r`<p class="notice notice-info">${c("user")}<span>${t("pdp.loginToReview")} <a class="section-link" href="#/auth?next=product/${n.id}">${t("nav.login")}</a></span></p>`}
      </div>`:""}

      ${I("questions")?r`
      <div class="tab-panel" data-panel="questions" hidden>
        <div data-questions>
          ${l.length?l.map(So).join(""):r`<p class="muted">${t("pdp.noQuestions")}</p>`}
        </div>
        <div class="divider"></div>
        ${d.me?r`
          <form data-act="question-submit" data-pid="${n.id}">
            <strong>${t("pdp.askQuestion")}</strong>
            <label class="field mt-s"><span class="label">${t("common.title")}</span><input class="input" name="title" maxlength="80" required></label>
            <label class="field"><span class="label">${t("common.body")}</span><textarea class="textarea" name="body" maxlength="1500" required></textarea></label>
            <button class="btn btn-primary" type="submit">${t("common.submit")}</button>
          </form>`:r`<p class="notice notice-info">${c("user")}<span>${t("pdp.loginToReview")} <a class="section-link" href="#/auth?next=product/${n.id}">${t("nav.login")}</a></span></p>`}
      </div>`:""}
    </section>

    ${u.length?r`
    <section class="section">
      <div class="section-head"><div><h2 class="section-title">${c("layers")} ${t("pdp.related")}</h2></div></div>
      ${Ie(u.slice(0,5))}
    </section>`:""}

    ${d.recent.filter(q=>q!==n.id).length?r`
    <section class="section">
      <div class="section-head"><div><h2 class="section-title">${c("history")} ${t("misc.recentlyViewed")}</h2></div></div>
      <div data-recent></div>
    </section>`:""}

    <div class="pdp-bar no-print">
      <div class="pdp-bar-p">
        <div class="b">${C(n.price)}</div>
        ${(n.oldPrice||0)>n.price?r`<div class="tiny muted del">${C(n.oldPrice)}</div>`:""}
      </div>
      ${(n.stock||0)>0?r`<button class="btn btn-primary" data-act="pdp-add" data-id="${n.id}">${c("cart")} ${t("pdp.addToCart")}</button>`:r`<button class="btn btn-ghost" data-act="notify-me" data-id="${n.id}">${c("bell")} ${t("common.notifyMe")}</button>`}
    </div>
  `}function bi(e){return{cable:"cable",adapter:"plug",case:"shield",glass:"layers",powerbank:"battery",battery:"battery",dongle:"plug",speaker:"speaker",audio:"headset",wearable:"watch",content:"camera",gaming:"zap",car:"truck",light:"light",mics:"mic",misc:"box"}[e]||"box"}function So(e){return r`
    <div class="review" data-rid="${e.id}">
      <div class="rev-head">
        <span class="rev-who">${p(e.userName)}</span>
        <span class="badge-pill ${e.userBadge==="buyer"?"bp-success":"bp-muted"}">${e.userBadge==="buyer"?t("pdp.buyerBadge"):t("pdp.visitorBadge")}</span>
        ${e.rating?Me(e.rating):""}
        <span class="rev-date">${H(e.createdAt,{time:!1})}</span>
      </div>
      <div class="rev-title">${p(e.title)}</div>
      <div class="rev-body">${p(e.body)}</div>
      ${e.reply?r`<div class="rev-reply"><strong>${t("pdp.storeReply")}:</strong> ${p(e.reply)}</div>`:""}
      <div class="rev-actions">
        <button type="button" class="link-btn" data-act="review-like" data-id="${e.id}">${c("heart")} ${t("pdp.helpful")} (${b(e.likes||0)})</button>
      </div>
    </div>`}function hi(e){let a=e.querySelector(".gal-main");if(!a||!window.matchMedia?.("(hover: hover) and (pointer: fine)")?.matches)return;let s=2.6,n=null,o=null,i=()=>{n&&(n.style.display="none")};a.addEventListener("mousemove",l=>{let m=a.querySelector("img");if(!m||!m.currentSrc){i();return}let u=a.getBoundingClientRect(),f=l.clientX-u.left,v=l.clientY-u.top;if(f<0||v<0||f>u.width||v>u.height){i();return}n||(n=document.createElement("div"),n.className="gal-lens",n.setAttribute("aria-hidden","true"),o=document.createElement("img"),o.alt="",n.appendChild(o),a.appendChild(n));let S=Math.max(120,Math.min(190,Math.round(u.width*.46)));n.style.width=`${S}px`,n.style.height=`${S}px`,n.style.display="block",n.style.left=`${Math.max(-S*.15,Math.min(u.width-S*.85,f-S/2))}px`,n.style.top=`${Math.max(-S*.15,Math.min(u.height-S*.85,v-S/2))}px`;let k=u.width*s,E=u.height*s;o.src=m.currentSrc,o.style.width=`${k}px`,o.style.height=`${E}px`;let M=Math.max(S/2,Math.min(k-S/2,f/u.width*k)),q=Math.max(S/2,Math.min(E-S/2,v/u.height*E));o.style.left=`${S/2-M}px`,o.style.top=`${S/2-q}px`}),a.addEventListener("mouseleave",i),a.addEventListener("click",i)}function gi(e,a){L(e),Qs(a.params.id),on(e),hi(e);let s=e.querySelector(".gal-main");if(s){let o=null,i=!1;s.addEventListener("click",l=>{i&&(i=!1,l.stopPropagation(),l.preventDefault())},!0),s.addEventListener("pointerdown",l=>{l.pointerType==="touch"&&(o=l.clientX)},{passive:!0}),s.addEventListener("pointerup",l=>{if(o==null||l.pointerType!=="touch")return;let m=l.clientX-o;if(o=null,Math.abs(m)<48)return;i=!0;let u=JSON.parse(e.querySelector("[data-imgs]")?.dataset.imgs||"[]");if(u.length<2)return;let f=Number(e.querySelector("[data-imgs]").dataset.i||0);f=(f+(m<0?1:-1)+u.length)%u.length,e.querySelector(`[data-thumb="${f}"]`)?.click()},{passive:!0})}e.querySelectorAll("[data-thumb]").forEach(o=>o.addEventListener("click",()=>{let i=Number(o.dataset.thumb),l=JSON.parse(e.querySelector("[data-imgs]").dataset.imgs||"[]"),m=e.querySelector(".gal-main"),u=l[i];if(m&&u)if(m.querySelector("img, video")?.remove(),u.kind==="video"){let f=document.createElement("video");f.src=u.url,f.controls=!0,f.playsInline=!0,f.preload="metadata",f.className="gal-video",u.poster&&(f.poster=u.poster),m.prepend(f)}else{let f=document.createElement("img");f.src=u.url,f.alt="",m.prepend(f)}e.querySelectorAll("[data-thumb]").forEach(f=>f.classList.toggle("active",f===o)),e.querySelector("[data-imgs]").dataset.i=String(i)})),g("pdp-add",async(o,i)=>{let l=Number(e.querySelector(".qty input")?.value||1);await A(i,async()=>{try{let{addToCart:m}=await Promise.resolve().then(()=>(_(),va));await m(i.dataset.id,l),$(t("card.added"),{timeout:2400})}catch(m){y(m)}})}),g("pdp-buy",async(o,i)=>{let l=Number(e.querySelector(".qty input")?.value||1);try{let{addToCart:m}=await Promise.resolve().then(()=>(_(),va));await m(i.dataset.id,l),de("#/checkout")}catch(m){y(m)}}),g("review-like",async(o,i)=>{if(!d.me){de("#/auth");return}try{let l=await h.post(`/api/reviews/${i.dataset.id}/like`);i.innerHTML=r`${c("heart")} ${t("pdp.helpful")} (${b(l.likes)})`}catch(l){y(l)}}),g("review-submit",async(o,i)=>{o.preventDefault();let l=new FormData(i);await A(i.querySelector("button[type=submit]"),async()=>{try{let m=await h.post("/api/reviews",{productId:i.dataset.pid,type:"review",rating:Number(l.get("rating")||0),title:l.get("title"),body:l.get("body")});$(m.message||t("pdp.reviewSubmitted"),{timeout:5e3}),i.reset()}catch(m){y(m)}})}),g("question-submit",async(o,i)=>{o.preventDefault();let l=new FormData(i);await A(i.querySelector("button[type=submit]"),async()=>{try{let m=await h.post("/api/reviews",{productId:i.dataset.pid,type:"question",title:l.get("title"),body:l.get("body")});$(m.message||t("pdp.questionSubmitted"),{timeout:5e3}),i.reset()}catch(m){y(m)}})});let n=e.querySelector("[data-recent]");return n&&d.recent.length&&h.get("/api/products?limit=60").then(o=>{let l=d.recent.filter(m=>m!==a.params.id).slice(0,5).map(m=>o.items.find(u=>u.id===m)).filter(Boolean);n.innerHTML=Ie(l),L(n)}).catch(()=>{}),()=>{}}var fi,Eo=O(()=>{B();W();Q();_();ce();X();le();ee();fi=e=>e.params.id});function vi(e){return new Promise((a,s)=>{let n=new Image;n.onload=()=>a(n),n.onerror=()=>s(new Error("image-load")),n.src=e})}async function ss(e){let a=await vi(e),s=document.createElement("canvas");s.width=9,s.height=8;let n=s.getContext("2d",{willReadFrequently:!0});n.drawImage(a,0,0,9,8);let o=n.getImageData(0,0,9,8).data,i=E=>.299*o[E]+.587*o[E+1]+.114*o[E+2],l="";for(let E=0;E<8;E++)for(let M=0;M<8;M++){let q=i((E*9+M)*4),K=i((E*9+M+1)*4);l+=q>K?"1":"0"}let m="";for(let E=0;E<64;E+=4)m+=parseInt(l.slice(E,E+4),2).toString(16);let u=document.createElement("canvas");u.width=8,u.height=8;let f=u.getContext("2d",{willReadFrequently:!0});f.drawImage(a,0,0,8,8);let v=f.getImageData(0,0,8,8).data,S=new Array(64).fill(0);for(let E=0;E<64;E++){let M=v[E*4]>>6,q=v[E*4+1]>>6,K=v[E*4+2]>>6;S[M<<4|q<<2|K]++}let k=S.reduce((E,M)=>E+M,0)||1;return{dhash:m,hist:S.map(E=>Math.round(E/k*1e3)/1e3)}}var pn=O(()=>{});var qo={};G(qo,{mount:()=>$i,render:()=>yi,title:()=>wi});async function yi(){return r`
    <div class="section-head"><div>
      <h1 class="section-title">${c("camera")} ${t("search.imageTitle")}</h1>
      <p class="section-sub">${t("search.imageText")}</p>
    </div></div>

    <div class="card t-center" data-drop>
      <span class="empty-ic">${c("image")}</span>
      <p class="muted">${t("search.imageHint")}</p>
      <div class="row center row-wrap mt">
        <label class="btn btn-primary">${c("upload")} ${t("search.pickFile")}
          <input type="file" accept="image/jpeg,image/png,image/webp" data-file hidden>
        </label>
        <label class="btn btn-ghost">${c("camera")} ${t("search.takePhoto")}
          <input type="file" accept="image/*" capture="environment" data-file hidden>
        </label>
      </div>
      <div class="mt" data-preview hidden>
        <img class="si-preview" data-pimg alt="">
      </div>
    </div>

    <section class="section" data-results hidden></section>`}function $i(e){L(e);let a=e.querySelector("[data-drop]"),s=e.querySelector("[data-results]"),n=async o=>{if(!o)return;if(!/^image\//.test(o.type)){y({code:"invalid_type",message:t("err.generic")});return}if(o.size>4*1024*1024){y({code:"payload_too_large",message:t("err.generic")});return}let i=await At(o),l=e.querySelector("[data-preview]");l.hidden=!1,e.querySelector("[data-pimg]").src=i,s.hidden=!1,s.innerHTML=r`<div class="row center">${c("refresh")} ${t("search.imageIndexing")}</div>`,await A(null,async()=>{try{let m=await ss(i),u=await h.post("/api/search/image",m);if(!u.indexed){s.innerHTML=P({icon:"image",title:t("search.imageNoIndex"),text:t("adm.isHint")});return}if(!u.items?.length){s.innerHTML=P({icon:"search",title:t("search.imageNoMatch"),action:{href:"#/products",label:t("cart.goShopping")}});return}s.innerHTML=r`
          <div class="section-head"><div><h2 class="section-title">${c("sparkles")} ${b(u.items.length)} ${t("common.results")}</h2></div></div>
          ${Ie(u.items.map(f=>({...f,match:f.matchScore})))}
          <div class="row row-wrap mt-s">${u.items.map(f=>r`<span class="chip">${f.name?.slice(0,24)}… ${b(f.matchScore)}٪</span>`)}</div>`}catch(m){s.innerHTML=P({icon:"alert",title:t("err.generic")}),y(m)}})};return e.querySelectorAll("[data-file]").forEach(o=>o.addEventListener("change",()=>n(o.files?.[0]))),["dragover","dragenter"].forEach(o=>a.addEventListener(o,i=>{i.preventDefault(),a.classList.add("drag")})),["dragleave","drop"].forEach(o=>a.addEventListener(o,i=>{i.preventDefault(),a.classList.remove("drag")})),a.addEventListener("drop",o=>n(o.dataTransfer?.files?.[0])),null}var wi,To=O(()=>{B();W();Q();pn();X();ce();wi=()=>t("search.imageTitle")});var Co={};G(Co,{mount:()=>xi,render:()=>ki,title:()=>Ei});async function ki(){await Te().catch(()=>{});let e=d.cart;return e.items?.length?r`
    <div class="section-head">
      <div><h1 class="section-title">${c("cart")} ${t("cart.title")}</h1>
      <p class="section-sub">${b(e.count)} ${t("common.items")}</p></div>
      <button type="button" class="link-btn" data-act="cart-clear">${c("trash")} ${t("cart.clear")}</button>
    </div>
    ${It("cart",nt("cart"))}
    <div class="cart-grid">
      <div class="card" data-lines>
        ${e.items.map(Si).join("")}
      </div>
      <aside class="summary card">
        <strong>${t("cart.summary")}</strong>
        <div class="sum-row"><span>${t("common.subtotal")}</span><span class="v">${C(e.subtotal)}</span></div>
        <div data-coupon-row>
          ${e.coupon?r`<div class="sum-row discount"><span>${t("common.discountCode")}: ${e.coupon.code}</span><span class="v"><button type="button" class="link-btn" data-act="coupon-remove">${t("cart.removeCoupon")}</button></span></div>`:""}
        </div>
        <div data-shipbar>${yo(e.subtotal)}</div>
        ${e.coupon?"":r`
          <form class="row mt-s" data-act="coupon-apply">
            <input class="input" name="code" placeholder="${t("cart.couponPlaceholder")}" maxlength="32">
            <button class="btn btn-ghost" type="submit">${t("cart.applyCoupon")}</button>
          </form>`}
        <div class="sum-row total"><span>${t("common.payable")}</span><span class="v" data-total>${C(e.subtotal-(e.couponDiscount||0))}</span></div>
        <p class="hint">${t("checkout.concurrencyNote")}</p>
        <a class="btn btn-primary btn-block btn-lg mt" href="#/checkout">${t("cart.continue")} ${c("chevron-left")}</a>
      </aside>
    </div>`:r`
      <div class="section-head"><div><h1 class="section-title">${c("cart")} ${t("cart.title")}</h1></div></div>
      ${P({icon:"cart",title:t("cart.empty"),text:t("cart.emptyText"),action:{href:"#/products",label:t("cart.goShopping")}})}`}function Si(e){let a=e.product;return r`
    <div class="cart-line" data-line="${a.id}">
      <a class="cl-img" href="#/product/${a.id}">${a.images?.[0]?r`<img src="${a.images[0]}" alt="${ue(a)}" loading="lazy" data-glyph="${a.glyph}">`:c(a.glyph||"box")}</a>
      <div class="cl-body">
        <a class="cl-name" href="#/product/${a.id}">${ue(a)}</a>
        <div class="cl-meta">${a.brandName?`${a.brandName} \xB7 `:""}${C(a.price)} / ${t("common.unit")}</div>
        ${e.available<e.requestedQty?r`<div class="err mt-s">${c("alert")} ${t("common.lowStock")} (${b(e.available)})</div>`:""}
        <div class="cl-foot">
          <span data-qtybox>${es({value:e.qty,max:Math.max(1,e.available),name:"qty"})}</span>
          <button type="button" class="link-btn" data-act="cart-remove" data-id="${a.id}">${c("trash")} ${t("cart.remove")}</button>
          <span class="cl-price">${C(e.lineTotal)}</span>
        </div>
      </div>
    </div>`}function xi(e){return L(e),e.querySelectorAll(".qty input").forEach(a=>{a.addEventListener("change",async()=>{let n=a.closest("[data-line]").dataset.line,o=Math.max(1,Number(a.value)||1);try{await js(n,o),oe(t("cart.updated"),{timeout:1500}),Promise.resolve().then(()=>(ee(),ct)).then(i=>i.refresh(!0))}catch(i){y(i),Promise.resolve().then(()=>(ee(),ct)).then(l=>l.refresh(!0))}})}),g("cart-remove",async(a,s)=>{try{await Us(s.dataset.id),Promise.resolve().then(()=>(ee(),ct)).then(n=>n.refresh(!0))}catch(n){y(n)}}),g("cart-clear",async()=>{if(await ge({text:t("cart.clearConfirm"),danger:!0,okText:t("cart.clear")}))try{await zs(),Promise.resolve().then(()=>(ee(),ct)).then(s=>s.refresh(!0))}catch(s){y(s)}}),g("coupon-apply",async(a,s)=>{a.preventDefault();let n=s.querySelector("[name=code]").value.trim();n&&await A(s.querySelector("button"),async()=>{try{await Wa(n),$(t("cart.couponApplied")),Promise.resolve().then(()=>(ee(),ct)).then(o=>o.refresh(!0))}catch(o){y(o)}})}),g("coupon-remove",async()=>{try{await Wa(""),Promise.resolve().then(()=>(ee(),ct)).then(a=>a.refresh(!0))}catch(a){y(a)}}),null}var Ei,Ao=O(()=>{B();W();Q();_();ce();X();le();ee();Ei=()=>t("cart.title")});var Mo={};G(Mo,{mount:()=>Ti,render:()=>qi,title:()=>Ai});async function qi(e){if(await Te().catch(()=>{}),!d.cart.items?.length)return P({icon:"cart",title:t("cart.empty"),text:t("cart.emptyText"),action:{href:"#/products",label:t("cart.goShopping")}});if(!d.me)return P({icon:"user",title:t("checkout.loginRequired"),action:{href:"#/auth?next=checkout",label:t("nav.login")}});if(d.me.kycStatus!=="approved")return P({icon:"shield-alert",title:"\u0627\u062D\u0631\u0627\u0632 \u0647\u0648\u06CC\u062A \u0646\u0627\u0642\u0635 \u0627\u0633\u062A",text:"\u062C\u0647\u062A \u062C\u0644\u0648\u06AF\u06CC\u0631\u06CC \u0627\u0632 \u062A\u0642\u0644\u0628 \u0648 \u0628\u0627 \u062A\u0648\u062C\u0647 \u0628\u0647 \u0627\u0644\u0632\u0627\u0645\u0627\u062A \u0642\u0627\u0646\u0648\u0646\u06CC\u060C \u062B\u0628\u062A \u0633\u0641\u0627\u0631\u0634 \u0646\u06CC\u0627\u0632\u0645\u0646\u062F \u062A\u0623\u06CC\u06CC\u062F \u0647\u0648\u06CC\u062A \u0627\u0633\u062A.",action:{href:"#/account/kyc",label:"\u062A\u06A9\u0645\u06CC\u0644 \u0627\u062D\u0631\u0627\u0632 \u0647\u0648\u06CC\u062A"}});let a=pt(),s=a.zones||[],n=d.me?.addresses||[];try{let o=await h.post("/api/checkout/quote",{delivery:"courier",zone:s[0]?.id||"country",express:!1,insurance:!1});Jt=o.quote,Sa=(o.paymentMethods||[]).filter(i=>d.me?!0:i.id==="cod"||i.id==="gateway"),Sa.length||(Sa=[{id:"cod",fa:"\u067E\u0631\u062F\u0627\u062E\u062A \u062F\u0631 \u0645\u062D\u0644",en:"Cash on delivery",note:""}])}catch{Jt=null}return r`
    <div class="section-head"><div><h1 class="section-title">${c("card")} ${t("checkout.title")}</h1></div></div>
    <div class="checkout-steps">
      <span class="cstep active"><span class="n">1</span> ${t("checkout.step1")}</span>
      <span class="cstep"><span class="n">2</span> ${t("checkout.step2")}</span>
      <span class="cstep"><span class="n">3</span> ${t("checkout.step3")}</span>
    </div>

    <form class="cart-grid" data-act="checkout-submit" novalidate>
      <div class="col">
        <section class="card">
          <strong class="row mb-s">${c("truck")} ${t("checkout.delivery")}</strong>
          <div class="col">
            <label class="radio-card">
              <input type="radio" name="delivery" value="pickup" ${a.pickupEnabled===!1?"disabled":""} ${d.me?"":"checked"}>
              <span class="dot"></span>
              <span><span class="b">${t("checkout.pickup")}</span><span class="hint" >${t("checkout.pickupDesc")} ${t("checkout.pickupReady",{h:b(a.handlingHours||24)})}</span></span>
            </label>
            <label class="radio-card${d.me?"":" disabled"}">
              <input type="radio" name="delivery" value="courier" ${d.me?"checked":"disabled"} ${a.courierEnabled===!1?"disabled":""}>
              <span class="dot"></span>
              <span><span class="b">${t("checkout.courier")}</span><span class="hint">${t("checkout.courierDesc")}${d.me?"":` \u2014 ${t("checkout.guestCourierNote")}`}</span></span>
            </label>
          </div>

          <div data-courier-opts class="mt">
            <label class="field"><span class="label">${t("checkout.zone")}</span>
              <select class="select" name="zone">
                ${s.map(o=>r`<option value="${o.id}">${w()?o.name:o.nameEn} — ${b(o.fee)} ${t("common.toman")} · ${w()?o.eta:""}</option>`)}
              </select>
            </label>
            ${a.expressEnabled?he({label:t("checkout.express"),desc:`${b(a.expressFee||0)} ${t("common.toman")}${Ve()?` \xB7 ${t("acc.plus")}: \u2212${b(a.expressDiscountPct||50)}\u066A`:""}`,name:"express"}):""}
            ${I("insurance")?he({label:t("checkout.insuranceOpt"),desc:Ve()&&d.settings?.plus?.autoInsurance?t("checkout.insuranceAuto"):t("checkout.insuranceDesc"),name:"insurance",checked:Ve()}):""}

            <div class="divider"></div>
            <strong class="row mb-s">${c("pin")} ${t("checkout.address")}</strong>
            ${d.me?n.length?r`
              <div class="col" data-addresses>
                ${n.map((o,i)=>r`
                  <label class="addr-card">
                    <input type="radio" name="addressId" value="${o.id}" ${o.isDefault||i===0?"checked":""}>
                    <span class="dot"></span>
                    <span>
                      <span class="b">${p(o.title||t("common.address"))}</span>
                      <span class="hint">${p(o.receiver||"")} · ${ne(o.phone||"")}<br>${p(o.street||"")}${o.city?`\u060C ${p(o.city)}`:""}${o.postal?` \xB7 ${p(o.postal)}`:""}</span>
                    </span>
                  </label>`)}
              </div>
              <button type="button" class="btn btn-ghost btn-sm mt-s" data-act="addr-add">${c("plus")} ${t("checkout.addAddress")}</button>
            `:r`
              <p class="notice notice-warn">${c("alert")}<span>${t("checkout.noAddress")}</span></p>
              <button type="button" class="btn btn-ghost btn-sm mt-s" data-act="addr-add">${c("plus")} ${t("checkout.addAddress")}</button>
            `:r`
              <div class="form-grid mt-s">
                ${x({label:w()?"\u0627\u0633\u062A\u0627\u0646":"Province",name:"guestProvince"})}
                ${x({label:w()?"\u0634\u0647\u0631":"City",name:"guestCity"})}
                ${x({label:w()?"\u0622\u062F\u0631\u0633 \u06A9\u0627\u0645\u0644 (\u062E\u06CC\u0627\u0628\u0627\u0646\u060C \u06A9\u0648\u0686\u0647\u060C \u067E\u0644\u0627\u06A9\u060C \u0648\u0627\u062D\u062F)":"Full Address",name:"guestAddress",span2:!0})}
                ${x({label:w()?"\u06A9\u062F \u067E\u0633\u062A\u06CC (\u0627\u062E\u062A\u06CC\u0627\u0631\u06CC)":"Postal Code",name:"guestZip",type:"tel",attrs:'inputmode="numeric"'})}
              </div>
            `}
          </div>
        </section>

        ${d.me?"":r`
        <section class="card">
          <strong class="row mb-s">${c("user")} ${t("checkout.guestInfo")}</strong>
          <p class="hint mb-s">${t("checkout.guestHint")}</p>
          <div class="form-grid">
            ${x({label:t("checkout.guestName"),name:"guestName",required:!0,autocomplete:"name"})}
            ${x({label:t("checkout.guestPhone"),name:"guestPhone",type:"tel",required:!0,autocomplete:"tel",attrs:'inputmode="numeric" maxlength="11" placeholder="09xxxxxxxxx"',hint:t("checkout.guestPhoneHint")})}
          </div>
        </section>`}

        <section class="card">
          <strong class="row mb-s">${c("wallet")} ${t("checkout.paymentMethod")}</strong>
          <div class="col" data-paymethods>
            ${(Sa.length?Sa:[{id:"gateway",fa:"\u062F\u0631\u06AF\u0627\u0647 \u0628\u0627\u0646\u06A9\u06CC",en:"Bank gateway",note:""}]).map((o,i)=>r`
              <label class="radio-card">
                <input type="radio" name="paymentMethod" value="${o.id}" ${i===0?"checked":""} ${["snapppay","azki","digipay"].includes(o.id)&&(!d.me||d.me.kycStatus!=="approved")?"disabled":""}>
                <span class="dot"></span>
                <span><span class="b">${w()?o.fa:o.en}</span><span class="hint">${p(o.note||"")}${o.id==="gateway"&&Fs().gatewayMode==="demo"?` \u2014 ${t("checkout.gatewayDemo")}`:""}${["snapppay","azki","digipay"].includes(o.id)&&(!d.me||d.me.kycStatus!=="approved")?' <span style="color:var(--danger)">(\u0646\u06CC\u0627\u0632\u0645\u0646\u062F \u0627\u062D\u0631\u0627\u0632 \u0647\u0648\u06CC\u062A)</span>':""}</span></span>
              </label>`)}
          </div>
          ${d.me?"":r`<p class="hint mt-s" data-guest-cod-note hidden>${t("checkout.guestCodPickup")}</p>`}
          ${d.me&&I("wallet")&&(d.me.wallet?.balance||0)>0?he({label:t("checkout.useWallet"),desc:t("checkout.walletBalance",{amount:b(d.me.wallet.balance)}),name:"useWallet",checked:!0}):""}
          <label class="field mt"><span class="label">${t("checkout.note")}</span><textarea class="textarea" name="note" rows="2" maxlength="400" placeholder="${t("checkout.notePlaceholder")}"></textarea></label>
        </section>

        <section class="card">
          ${Kt({label:r`${t("checkout.acceptTerms")} <a class="section-link" href="#/pages/terms">${t("consent.readTerms")}</a>`,name:"acceptTerms",checked:!0})}
          <p class="hint mt-s">${t("checkout.concurrencyNote")}</p>
        </section>
      </div>

      <aside class="summary card">
        <strong>${t("cart.summary")}</strong>
        <div data-quote>${Jt?ln(Jt):r`<div class="sk sk-line w100"></div>`}</div>
        <button class="btn btn-primary btn-block btn-lg mt" type="submit">${c("check")} ${t("checkout.placeOrder")}</button>
        <a class="btn btn-ghost btn-block mt-s" href="#/cart">${c("chevron-right")} ${t("cart.title")}</a>
      </aside>
    </form>`}async function Do(e){let a=new FormData(e);try{Jt=(await h.post("/api/checkout/quote",{delivery:a.get("delivery")||"courier",zone:a.get("zone")||"country",express:a.get("express")==="on",insurance:a.get("insurance")==="on"})).quote;let n=e.querySelector("[data-quote]");n&&(n.innerHTML=ln(Jt));let o=e.querySelector("[data-courier-opts]"),i=a.get("delivery");if(o&&(o.hidden=i!=="courier"),!d.me){let l=e.querySelector('input[name="paymentMethod"][value="cod"]');if(l){l.disabled=i==="pickup",l.closest(".radio-card")?.classList.toggle("disabled",i==="pickup");let m=e.querySelector("[data-guest-cod-note]");if(m&&(m.hidden=i!=="pickup"),l.disabled&&l.checked){let u=e.querySelector('input[name="paymentMethod"][value="gateway"]');u&&(u.checked=!0)}}}}catch{}}function Ti(e){L(e);let a=e.querySelector('form[data-act="checkout-submit"]');if(!a)return null;let s=Yt(()=>Do(a),220);return a.addEventListener("change",s),Do(a),g("addr-add",()=>Ci()),g("checkout-submit",async(n,o)=>{n.preventDefault();let i=new FormData(o);if(!i.get("acceptTerms")){j(t("form.termsRequired"));return}if(d.me&&i.get("delivery")==="courier"&&!i.get("addressId")){j(t("checkout.noAddress"));return}if(!d.me&&i.get("delivery")==="courier"&&(!i.get("guestProvince")||!i.get("guestCity")||!i.get("guestAddress"))){j(w()?"\u0644\u0637\u0641\u0627\u064B \u0622\u062F\u0631\u0633 \u067E\u0633\u062A\u06CC \u0631\u0627 \u06A9\u0627\u0645\u0644 \u0648\u0627\u0631\u062F \u06A9\u0646\u06CC\u062F.":"Please enter your shipping address.");return}if(!d.me){if(!String(i.get("guestName")||"").trim()){j(t("checkout.guestNameRequired"));return}if(!/^09\d{9}$/.test(String(i.get("guestPhone")||"").replace(/[\s-]/g,""))){j(t("checkout.guestPhoneInvalid"));return}}await A(o.querySelector("button[type=submit]"),async()=>{try{let l=await h.post("/api/checkout",{delivery:i.get("delivery"),zone:i.get("zone"),express:i.get("express")==="on",insurance:i.get("insurance")==="on",paymentMethod:i.get("paymentMethod")||"gateway",useWallet:i.get("useWallet")==="on",note:i.get("note")||"",addressId:i.get("addressId")||"",guestName:d.me?"":String(i.get("guestName")||"").trim(),guestPhone:d.me?"":String(i.get("guestPhone")||"").replace(/[\s-]/g,""),acceptTerms:!0});l.me&&(d.me=l.me,Ye());try{sessionStorage.setItem("bm_last_order",JSON.stringify(l.order))}catch{}await Te(),l.needsPayment&&["gateway","snapppay","azki","digipay"].includes(l.paymentMethod)?de(`#/pay/${l.order.id}`):de(`#/checkout/done/${l.order.id}`)}catch(l){y(l),(l?.code==="stock_limit"||l?.code==="product_unavailable")&&T(!0)}})}),null}function Ci(){if(!d.me){de("#/auth?next=checkout");return}Po=ie({title:t("acc.addAddress"),body:r`
      <form data-act="addr-save" class="form-grid">
        ${x({label:t("acc.addrTitle"),name:"title",required:!0})}
        ${x({label:t("acc.addrReceiver"),name:"receiver",required:!0,value:d.me.name||""})}
        ${x({label:t("acc.addrPhone"),name:"phone",type:"tel",required:!0,value:d.me.phone||""})}
        ${x({label:t("common.city"),name:"city",value:d.settings?.store?.city||""})}
        ${x({label:t("common.postal"),name:"postal"})}
        ${x({label:t("acc.addrStreet"),name:"street",required:!0,span2:!0})}
        ${x({label:t("acc.addrNote"),name:"note",span2:!0})}
        <label class="check span-2"><input type="checkbox" name="isDefault"><span class="box">${c("check")}</span><span>${t("acc.addrDefault")}</span></label>
        <button class="btn btn-primary span-2" type="submit">${t("common.save")}</button>
      </form>`})}var Jt,Sa,Po,Ai,Lo=O(()=>{B();W();Q();_();ce();X();le();ee();Jt=null,Sa=[];Po=null;g("addr-save",async(e,a)=>{e.preventDefault();let s=new FormData(a),n=Object.fromEntries(s.entries());n.isDefault=s.get("isDefault")==="on";try{let o=await h.post("/api/me/addresses",n);o.addresses&&d.me&&(d.me.addresses=o.addresses),$(t("acc.addrSaved")),Po?.close(),T(!0)}catch(o){y(o)}});Ai=()=>t("checkout.title")});var No={};G(No,{mount:()=>Mi,render:()=>Pi,title:()=>Li});function Di(e){try{let a=JSON.parse(sessionStorage.getItem("bm_last_order")||"null");return a&&a.id===e?a:null}catch{return null}}async function Pi(e){let a=e.params.id,s=Di(a);if(!s&&d.me)try{s=(await h.get(`/api/me/orders/${encodeURIComponent(a)}`)).order}catch{}if(!s)return r`<div class="card t-center">
      <span class="empty-ic">${c("check-circle")}</span>
      <h1 class="mt-s">${t("checkout.successTitle")}</h1>
      <a class="btn btn-primary mt" href="#/account/orders">${t("acc.orders")}</a>
    </div>`;let n=s.payment?.status==="paid";return r`
    <div class="card t-center">
      <span class="pwa-ic center" data-h="72px" data-w="72px">${c("check-circle")}</span>
      <h1 class="mt-s">${t("checkout.successTitle")}</h1>
      <p class="muted">${t("checkout.successText",{code:s.code})}</p>
      <div class="row center row-wrap mt">
        ${bt(s.status)} ${Rt(s.payment)}
        <span class="badge-pill bp-accent">${C(s.total)}</span>
      </div>
      ${!n&&s.payment?.method==="gateway"?r`
        <a class="btn btn-success btn-lg mt" href="#/pay/${s.id}">${c("card")} ${t("checkout.payNow")}</a>`:""}
      <div class="row center row-wrap mt">
        <a class="btn btn-ghost" href="#/account/orders/${s.id}">${c("package-check")} ${t("acc.trackOrder")}</a>
        <a class="btn btn-primary" href="#/products">${c("cart")} ${t("cart.goShopping")}</a>
      </div>
      <div class="divider"></div>
      <div class="t-start">${Gt(s)}</div>
    </div>`}function Mi(e){return L(e),null}var Li,Io=O(()=>{B();W();Q();_();ce();Li=()=>t("checkout.successTitle")});var Ro={};G(Ro,{mount:()=>Ii,render:()=>Ni,title:()=>Ri});async function Ni(e){let a=e.params.id,s=null;try{s=(await h.get(`/api/me/orders/${encodeURIComponent(a)}`)).order}catch{}if(!s)return P({icon:"alert",title:t("err.notFound"),action:{href:"#/account/orders",label:t("acc.orders")}});if(s.payment?.status==="paid")return r`<div class="card t-center">
      <span class="empty-ic">${c("check-circle")}</span>
      <h2 class="mt-s">${t("checkout.paymentSuccess")}</h2>
      <a class="btn btn-primary mt" href="#/checkout/done/${s.id}">${t("acc.trackOrder")}</a>
    </div>`;let n=s.payable??s.total,o=["snapppay","azki","digipay"].includes(s.payment?.method),i="";return s.payment?.method==="snapppay"?i="\u0627\u0633\u0646\u067E\u200C\u067E\u06CC":s.payment?.method==="azki"?i="\u0627\u0632\u06A9\u06CC\u200C\u0648\u0627\u0645":s.payment?.method==="digipay"&&(i="\u062F\u06CC\u062C\u06CC\u200C\u067E\u06CC"),r`
    <div class="card" >
      <div class="t-center">
        <span class="pwa-ic center" data-h="64px" data-w="64px">${c("card")}</span>
        <h1 class="mt-s">${o?"\u067E\u0631\u062F\u0627\u062E\u062A \u0627\u0642\u0633\u0627\u0637\u06CC \u0627\u0632 \u0637\u0631\u06CC\u0642 "+i:t("common.payment")}</h1>
        <p class="muted">${t("acc.orderCode")}: <span class="mono b">${s.code}</span></p>
        <div class="buy-price center"><span class="buy-now">${C(n)}</span></div>
        
        ${o?r`
          <div class="alert info text-right mb-4 mt-3">
            <strong>${c("info")} شبیه‌ساز درگاه اقساطی (${i})</strong>
            <p class="mt-2 text-sm">در محیط واقعی، کاربر به درگاه ${i} منتقل شده و پس از اعتبارسنجی و کسر قسط اول (یا تایید اعتبار)، به سایت بازمی‌گردد.</p>
          </div>
        `:r`
          <p class="notice notice-warn">${c("info")}<span>${t("checkout.gatewayDemo")}</span></p>
        `}
        
        <div class="row center mt">
          <button class="btn btn-success btn-lg" data-act="pay-sim" data-id="${s.id}" data-ok="1">${c("check")} ${t("checkout.simulateSuccess")}</button>
          <button class="btn btn-danger btn-lg" data-act="pay-sim" data-id="${s.id}" data-ok="0">${c("close")} ${t("checkout.simulateFail")}</button>
        </div>
        <div class="divider"></div>
        <div class="row row-between small muted">
          <span>${t("acc.orderDate")}: ${s.createdAt}</span>
          <span>${t("common.items")}: ${b(s.items?.length||0)}</span>
        </div>
      </div>
    </div>`}function Ii(e){return L(e),null}var Ri,Ho=O(()=>{B();W();Q();_();ce();X();ee();le();g("pay-sim",async(e,a)=>{let s=a.dataset.ok==="1";await A(a,async()=>{try{let n=await h.post(`/api/payments/simulate/${a.dataset.id}`,{success:s});await Ye(),await Te(),s?($(t("checkout.paymentSuccess")),de(`#/checkout/done/${a.dataset.id}`)):(y({code:"payment_failed",message:t("checkout.paymentFailed"),details:"Payment failed"}),de("#/account/orders"))}catch(n){y(n)}})});Ri=()=>t("common.payment")});var Bo={};G(Bo,{mount:()=>Bi,render:()=>Hi,title:()=>Fi});async function Hi(){let e=d.compare.slice(0,4);if(!e.length)return P({icon:"scale",title:t("compare.empty"),text:t("compare.emptyText"),action:{href:"#/products",label:t("cart.goShopping")}});let a=(await Promise.all(e.map(o=>h.get(`/api/products/${encodeURIComponent(o)}`).catch(()=>null)))).filter(Boolean).map(o=>o.product);if(!a.length)return P({icon:"scale",title:t("compare.empty")});let s=[...new Set(a.flatMap(o=>Object.keys(o.specs||{})))],n=(o,i)=>r`<tr><th class="t-start">${o}</th>${i.map(l=>r`<td>${l}</td>`)}</tr>`;return r`
    <div class="section-head"><div><h1 class="section-title">${c("scale")} ${t("compare.title")}</h1>
    <p class="section-sub">${b(a.length)} / 4</p></div></div>
    <div class="table-wrap">
      <table class="table">
        <thead><tr><th class="t-start">${t("common.product")}</th>${a.map(o=>r`<th>
          <div class="col center">
            <a href="#/product/${o.id}">${o.images?.[0]?r`<img class="table-img" src="${o.images[0]}" alt="${ue(o)}" data-glyph="${o.glyph}">`:c(o.glyph)}</a>
            <span class="small">${ue(o)}</span>
            <button type="button" class="link-btn" data-act="compare-toggle" data-id="${o.id}">${c("trash")} ${t("compare.remove")}</button>
          </div></th>`)}</tr></thead>
        <tbody>
          ${n(t("common.price"),a.map(o=>pe(C(o.price))))}
          ${n(t("common.brand"),a.map(o=>w()?o.brandName:o.brandNameEn||o.brandName||"\u2014"))}
          ${n(t("common.stock"),a.map(o=>o.stock>0?r`<span class="badge-pill bp-success">${b(o.stock)}</span>`:r`<span class="badge-pill bp-danger">${t("card.outOfStock")}</span>`))}
          ${n(t("common.rating"),a.map(o=>o.ratingCount?r`${Me(o.ratingAvg)} ${b(o.ratingAvg)}`:"\u2014"))}
          ${n(t("adm.pAuth"),a.map(o=>t(`auth.${o.authenticity||"generic"}`)))}
          ${n(t("pdp.warranty"),a.map(o=>o.warrantyMonths?t("pdp.warrantyMonths",{n:b(o.warrantyMonths)}):t("pdp.noWarranty")))}
          ${n(t("pdp.weight"),a.map(o=>o.weight?`${b(o.weight)} ${t("pdp.gram")}`:"\u2014"))}
          ${s.map(o=>n(o,a.map(i=>i.specs?.[o]||"\u2014")))}
          ${n("",a.map(o=>r`<button type="button" class="btn btn-primary btn-sm" data-act="add-cart" data-id="${o.id}" ${o.stock<=0?"disabled":""}>${c("cart")} ${t("card.addToCart")}</button>`))}
        </tbody>
      </table>
    </div>`}function Bi(e){return L(e),null}var Fi,Fo=O(()=>{B();W();Q();_();ce();Fi=()=>t("compare.title")});var Oo={};G(Oo,{render:()=>Oi,title:()=>ji});async function Oi(){let e=null;try{e=await h.get("/api/lotteries")}catch(n){return F({title:n?.message||t("err.generic")})}let a=(e.items||[]).filter(n=>n.status==="active"),s=(e.items||[]).filter(n=>n.status!=="active");return a.length?r`
    <h1 class="section-title mb">${c("gift2")} ${t("lot.title")}</h1>
    <div class="cart-grid">
      ${a.map(n=>r`
        <div class="card">
          <div class="row row-between"><strong>${c("sparkles")} ${p(n.title)}</strong><span class="badge-pill bp-accent">${t("lot.active")}</span></div>
          <p class="mt-s">${t("lot.prize")}: <b>${p(n.prize)}</b></p>
          <p class="muted small">${t("lot.ends")}: ${H(n.endsAt)} · ${t("lot.entries")}: ${b(n.entries||0)}</p>
          ${n.myEntry?r`<div class="notice notice-success mt-s">${c("check")} ${t("lot.joined")}</div>`:n.entryMode==="manual"?r`<button class="btn btn-primary mt-s" data-act="lot-join" data-id="${n.id}">${c("gift2")} ${t("lot.join")}</button>`:r`<p class="hint mt-s">${t("lot.autoEntry")}</p>`}
        </div>`)}
      ${s.slice(0,6).map(n=>r`
        <div class="card">
          <div class="row row-between"><strong>${p(n.title)}</strong><span class="badge-pill bp-success">${t("lot.done")}</span></div>
          <p class="tiny muted mt-s">${t("lot.winners")}: ${(n.winners||[]).map(o=>p(o)).join("\u060C ")||"\u2014"}</p>
        </div>`)}
    </div>`:r`
      <div class="card lot-soon">
        <span class="lot-ic">${c("gift2")}</span>
        <h1 class="buy-title">${t("lot.title")}</h1>
        <p class="muted mt-s">${t("lot.soon")}</p>
        ${s.length?r`<div class="mt">
          <h2 class="section-title small">${c("history")} ${t("lot.done")}</h2>
          ${s.slice(0,5).map(n=>r`
            <div class="notif-item lv-success mt-s">
              <strong class="tiny">${p(n.title)}</strong>
              <p class="tiny muted mt-s">${t("lot.winners")}: ${(n.winners||[]).map(o=>p(o)).join("\u060C ")||"\u2014"}</p>
            </div>`)}
        </div>`:""}
      </div>`}var ji,jo=O(()=>{B();W();Q();X();le();_();g("lot-join",async(e,a)=>{if(!d.me){j(t("nav.login"));return}await A(a,async()=>{try{await h.post(`/api/lotteries/${a.dataset.id}/join`,{}),$(t("lot.joinDone")),Promise.resolve().then(()=>(ee(),ct)).then(s=>s.refresh(!0))}catch(s){y(s)}})});ji=()=>w()?"\u0642\u0631\u0639\u0647\u200C\u06A9\u0634\u06CC":"Lottery"});var _o={};G(_o,{mount:()=>Wi,render:()=>Ui,title:()=>_i});async function Ui(){return r`
    <div class="section-head">
      <div><h1 class="section-title">${c("barcode")} ${t("priceCheck.title")}</h1>
      <p class="section-sub">${t("priceCheck.sub")}</p></div>
      <button type="button" class="btn btn-ghost" data-act="pc-fullscreen">${c("external")} ${t("priceCheck.fullscreen")}</button>
    </div>

    <div class="cart-grid">
      <div class="col">
        <div class="card scan-view">
          <form class="row" data-act="pc-lookup" >
            <input class="input" name="code" placeholder="${t("priceCheck.input")}" data-autofocus autocomplete="off" inputmode="numeric">
            <button class="btn btn-primary" type="submit">${c("search")} ${t("common.search")}</button>
          </form>
          <div class="row row-wrap center">
            <button type="button" class="btn btn-ghost" data-act="pc-camera">${c("camera")} ${t("priceCheck.scanCamera")}</button>
            <button type="button" class="btn btn-ghost" hidden data-act="pc-camera-stop">${c("close")} ${t("priceCheck.stopCamera")}</button>
          </div>
          <div class="scan-frame" data-frame hidden>
            <video playsinline muted></video>
            <span class="scan-line"></span>
            <span class="scan-corner" ></span>
          </div>
          <p class="hint">${t("adm.bScanHint")}</p>
          <input class="pc-wedge" data-wedge autocomplete="off" aria-label="${t("priceCheck.input")}" placeholder="${t("priceCheck.waiting")}">
        </div>
        <div class="card" data-history>
          <strong class="row mb-s">${c("history")} ${t("priceCheck.lastScan")}</strong>
          <div class="col" data-hlist><p class="muted small">${t("common.noData")}</p></div>
        </div>
      </div>
      <aside class="card price-display" data-result>
        <span class="empty-ic">${c("barcode")}</span>
        <p class="muted">${t("priceCheck.waiting")}</p>
      </aside>
    </div>`}function os(e,a,{error:s=""}={}){if(s){e.innerHTML=r`<span class="empty-ic danger">${c("alert")}</span><h3>${s}</h3>`;return}e.innerHTML=r`
    ${a.images?.[0]?r`<img class="pc-result-img" src="${a.images[0]}" alt="${ue(a)}" data-glyph="${a.glyph}">`:c(a.glyph||"box")}
    <h2 class="mt-s">${ue(a)}</h2>
    <p class="muted small">${a.brandName||""} ${a.sku?`\xB7 ${a.sku}`:""}</p>
    <div class="big">${C(a.price,{withUnit:!1})}</div>
    <div class="cur">${t("common.toman")}</div>
    ${a.oldPrice>a.price?r`<p class="pc-old">${C(a.oldPrice)}</p>`:""}
    <div class="mt-s">${a.stock>0?r`<span class="badge-pill bp-success">${t("pdp.stockCount",{n:b(a.stock)})}</span>`:r`<span class="badge-pill bp-danger">${t("card.outOfStock")}</span>`}</div>
    <a class="btn btn-primary mt" href="#/product/${a.id}">${t("common.details")} ${c("chevron-left")}</a>`}async function un(e,a){let s=a.querySelector("[data-result]");try{let n=await h.post("/api/scan",{code:String(e).trim()});if(n.found&&n.product)return os(s,n.product),zi(a,n.product),n.product;os(s,null,{error:t("priceCheck.notFound")})}catch(n){n?.status===404?os(s,null,{error:t("priceCheck.notFound")}):os(s,null,{error:t("err.generic")})}return null}function zi(e,a){ns.unshift({id:a.id,name:ue(a),price:a.price,at:new Date().toISOString()}),ns.length>8&&ns.pop();let s=e.querySelector("[data-hlist]");s&&(s.innerHTML=ns.map(n=>r`<div class="row row-between small"><span class="nowrap">${n.name}</span><span class="b">${b(n.price)}</span></div>`).join(""))}function Wi(e){L(e),document.body.classList.add("kiosk-page");let a=e.querySelector("[data-wedge]"),s="",n=0;return a.addEventListener("keydown",o=>{let i=Date.now();if(i-n>120&&(s=""),n=i,o.key==="Enter"){o.preventDefault();let l=s.trim();s="",l&&un(l,e);return}o.key.length===1&&(s+=o.key)}),a.focus(),g("pc-lookup",(o,i)=>{o.preventDefault(),un(i.querySelector("[name=code]").value,e)}),g("pc-fullscreen",()=>{document.fullscreenElement?document.exitFullscreen().catch(()=>{}):document.documentElement.requestFullscreen?.().catch(()=>oe(t("misc.printBlocked")))}),g("pc-camera",async(o,i)=>{let l=e.querySelector("[data-frame]"),m=l.querySelector("video");if(!("BarcodeDetector"in window)&&!navigator.mediaDevices?.getUserMedia){j(t("priceCheck.cameraUnsupported"));return}try{if(Xt=await navigator.mediaDevices.getUserMedia({video:{facingMode:"environment"}}),m.srcObject=Xt,await m.play(),l.hidden=!1,i.hidden=!0,e.querySelector('[data-act="pc-camera-stop"]').hidden=!1,"BarcodeDetector"in window){Uo=new window.BarcodeDetector({formats:["ean_13","ean_8","code_128","code_39","upc_a","upc_e"]});let u=async()=>{if(Xt){try{let f=await Uo.detect(m);if(f?.length){let v=f[0].rawValue;un(v,e);let S=e.querySelector("[name=code]");S&&(S.value=v)}}catch{}Wo=setTimeout(u,700)}};u()}}catch{j(t("priceCheck.cameraDenied"))}}),g("pc-camera-stop",(o,i)=>{zo(e),i.hidden=!0,e.querySelector('[data-act="pc-camera"]').hidden=!1}),()=>{zo(e),document.body.classList.remove("kiosk-page")}}function zo(e){if(clearTimeout(Wo),Xt){for(let s of Xt.getTracks())s.stop();Xt=null}let a=e?.querySelector("[data-frame]");a&&(a.hidden=!0)}var Xt,Uo,Wo,ns,_i,Vo=O(()=>{B();W();Q();_();X();le();Xt=null,Uo=null,Wo=0,ns=[];_i=()=>t("priceCheck.title")});var hn={};G(hn,{mount:()=>Yi,render:()=>Vi,title:()=>Gi});async function rs(e){let a=e?.querySelector?.("[data-captcha]");if(!a||a.hidden||(a.dataset.verifying&&await new Promise(o=>{let i=Date.now(),l=setInterval(()=>{(!a.dataset.verifying||Date.now()-i>2500)&&(clearInterval(l),o())},60)}),String(a.querySelector("[data-ctok]")?.value||"").trim()))return!0;let s=a.querySelector("[name=captchaBox]"),n=a.querySelector("[data-cch]");return s&&(s.checked=!0),n&&(n.hidden=!1),a.dataset.cid||Ht(a),a.querySelector("[name=captchaAnswer]")?.focus(),oe(t("captcha.required"),{type:"error",timeout:4500}),!1}function xa(e){let a=e&&!e.startsWith("auth")?`#/${e.replace(/^#|^\/|#$/g,"")}`:"#/";Ne().then(()=>Te()).then(()=>Gs()).then(()=>de(a))}async function Vi(e){let a=e.query.get("next")||"",s=e.query.get("ref")||"",n=e.params.mode==="register"||!!s,o=e.params.mode==="forgot";return r`
    <div class="auth-wrap">
      <div class="card auth-card">
        <div class="t-center mb">
          <span class="pwa-ic center" data-h="56px" data-w="56px">${c("user")}</span>
          <h1 class="mt-s" data-title>${n?t("auth.registerTitle"):o?t("auth.recoveryTitle"):t("auth.loginTitle")}</h1>
        </div>

        <div class="tabs" data-auth-tabs role="tablist">
          <button type="button" class="tab ${!n&&!o?"active":""}" data-at="login" role="tab">${t("common.login")}</button>
          <button type="button" class="tab ${n?"active":""}" data-at="register" role="tab">${t("common.register")}</button>
          <button type="button" class="tab ${o?"active":""}" data-at="forgot" role="tab">${t("auth.forgot")}</button>
        </div>

        <!-- ورود -->
        <div class="tab-panel" data-ap="login" ${n||o?"hidden":""}>
          <div class="btn-group mb" data-method>
            <button type="button" class="btn active" data-m="password">${t("auth.methodPassword")}</button>
            <button type="button" class="btn" data-m="phone">${t("auth.methodPhone")}</button>
            <button type="button" class="btn" data-m="email">${t("auth.methodEmail")}</button>
          </div>

          <form data-act="login-pass" data-apf="password">
            ${x({label:t("auth.identifier"),name:"identifier",required:!0,autocomplete:"username"})}
            ${x({label:t("common.password"),name:"password",type:"password",required:!0,hint:t("auth.passwordRules"),autocomplete:"new-password"})}
            <div class="row row-between mt-s gap-2">
              <span class="grow">${x({label:"\u06A9\u062F \u0645\u0639\u0631\u0641 (\u0627\u062E\u062A\u06CC\u0627\u0631\u06CC)",name:"referralCode",placeholder:"\u0645\u062B\u0644\u0627\u064B Z8A4X"})}</span>
              <span class="grow">
                <span class="grow" style="width:100%">
                <label class="field">
                  <span class="label">نحوه آشنایی (اختیاری)</span>
                  <input type="hidden" name="hearAboutUs" value="">
                  <button type="button" class="select" data-act="choose-hear" style="text-align: right; display: flex; justify-content: space-between; align-items: center;">
                    <span data-txt>(انتخاب کنید)</span>
                    ${c("chevron-down")}
                  </button>
                </label>
              </span>
              </span>
            </div>
            <div class="mb">${Kt({label:r`${t("auth.acceptTerms")} <a class="section-link" href="#/pages/terms">${t("consent.readTerms")}</a>`,name:"acceptTerms",checked:!0})}</div>
            ${ka()}
            <button class="btn btn-primary btn-block" type="submit">${c("user")} ${t("common.register")}</button>
          </form>
        </div>

        <!-- بازیابی -->
        <div class="tab-panel" data-ap="forgot" ${o?"":"hidden"}>
          <p class="muted small mb">${t("auth.recoveryText")}</p>
          <form data-act="forgot-send">
            <div class="btn-group mb" data-fch>
              <button type="button" class="btn active" data-m="phone">${t("auth.methodPhone")}</button>
              <button type="button" class="btn" data-m="email">${t("auth.methodEmail")}</button>
            </div>
            ${x({label:t("common.phone"),name:"target",type:"tel",required:!0,placeholder:"09xxxxxxxxx"})}
            ${ka()}
            <button class="btn btn-primary btn-block" type="submit">${c("send")} ${t("auth.sendCode")}</button>
          </form>
          <form data-act="forgot-reset" hidden>
            <p class="notice notice-info mb">${c("mail")}<span data-fsent></span></p>
            <p class="notice notice-warn mb" data-fdemo hidden>${c("info")}<span></span></p>
            ${x({label:t("auth.otpCode"),name:"code",required:!0,attrs:'inputmode="numeric" maxlength="6"'})}
            ${x({label:t("auth.newPassword"),name:"password",type:"password",required:!0,hint:t("auth.passwordRules"),autocomplete:"new-password"})}
            <button class="btn btn-primary btn-block" type="submit">${c("key")} ${t("common.save")}</button>
          </form>
        </div>
      </div>
    </div>`}function Yi(e,a){L(e),e.querySelectorAll("[data-captcha]").forEach(m=>Ht(m));let s=a.query.get("next")||"",n=a.query.get("ref")||"";if(n){let m=e.querySelector("[name=referralCode]");m&&(m.value=n,setTimeout(()=>e.querySelector('[data-at="register"]')?.click(),50))}let o={login:e.querySelector('[data-ap="login"]'),register:e.querySelector('[data-ap="register"]'),forgot:e.querySelector('[data-ap="forgot"]')};e.querySelectorAll("[data-at]").forEach(m=>m.addEventListener("click",()=>{e.querySelectorAll("[data-at]").forEach(u=>u.classList.toggle("active",u===m));for(let[u,f]of Object.entries(o))f.hidden=u!==m.dataset.at})),e.querySelectorAll("[data-goto]").forEach(m=>m.addEventListener("click",()=>e.querySelector(`[data-at="${m.dataset.goto}"]`).click()));let i=e.querySelector("[data-method]");i.addEventListener("click",m=>{let u=m.target.closest("[data-m]");if(!u)return;i.querySelectorAll("[data-m]").forEach(v=>v.classList.toggle("active",v===u));let f=u.dataset.m;o.login.querySelectorAll("[data-apf]").forEach(v=>{v.hidden=v.dataset.apf!==f})});let l=e.querySelector("[data-regmode]");return l.addEventListener("click",m=>{let u=m.target.closest("[data-m]");u&&(l.querySelectorAll("[data-m]").forEach(f=>f.classList.toggle("active",f===u)),te.regMode=u.dataset.m,e.querySelector("[data-reg-username]").hidden=te.regMode!=="username",e.querySelector("[data-reg-extra]").hidden=te.regMode!=="username",e.querySelector("[data-reg-target-phone]").hidden=te.regMode!=="phone",e.querySelector("[data-reg-target-email]").hidden=te.regMode!=="email",e.querySelector("[data-reg-code]").hidden=te.regMode==="username")}),e.querySelector("[data-reg-send]").addEventListener("click",async m=>{let u=e.querySelector('[data-act="register"]'),f=te.regMode==="phone"?"phone":"email",v=f==="phone"?u.querySelector("[name=phoneTarget]").value:u.querySelector("[name=emailTarget]").value;try{let S=await h.post("/api/auth/otp/send",{channel:f,target:v,purpose:"register",captchaToken:u.querySelector("[data-ctok]")?.value||void 0});te.demoCode=S.demoCode||"";let k=e.querySelector("[data-reg-demo]");k.hidden=!S.demoCode,S.demoCode&&(k.querySelector("span").textContent=t("auth.demoCode",{code:S.demoCode})),$(t("auth.codeSentTo",{target:S.target})),bn(e,"[data-reg-send]")}catch(S){S?.code==="captcha_required"&&Zt(u),y(S)}}),g("choose-hear",(m,u)=>{let f=[{v:"",l:"(\u0627\u0646\u062A\u062E\u0627\u0628 \u06A9\u0646\u06CC\u062F)"},{v:"google",l:"\u062C\u0633\u062A\u062C\u0648\u06CC \u06AF\u0648\u06AF\u0644"},{v:"instagram",l:"\u0627\u06CC\u0646\u0633\u062A\u0627\u06AF\u0631\u0627\u0645"},{v:"telegram",l:"\u062A\u0644\u06AF\u0631\u0627\u0645"},{v:"friend",l:"\u0645\u0639\u0631\u0641\u06CC \u062F\u0648\u0633\u062A\u0627\u0646"},{v:"other",l:"\u0633\u0627\u06CC\u0631"}],v=sheet({title:"\u0646\u062D\u0648\u0647 \u0622\u0634\u0646\u0627\u06CC\u06CC (\u0627\u062E\u062A\u06CC\u0627\u0631\u06CC)",body:r`<div class="col" style="gap:4px; padding-bottom: 20px;">
        ${f.map(S=>r`<button class="btn" style="justify-content: flex-start; padding: 14px 16px; background: var(--surface-2); border-radius: 12px; font-size: 15px;" data-v="${S.v}">${S.l}</button>`).join("")}
      </div>`});v.panel.querySelectorAll("button[data-v]").forEach(S=>{S.addEventListener("click",()=>{u.parentElement.querySelector('input[type="hidden"]').value=S.dataset.v,u.querySelector("[data-txt]").textContent=S.textContent,v.close()})})}),g("login-pass",async(m,u)=>{if(m.preventDefault(),Ka(u),!await rs(u))return;let f=new FormData(u);await A(u.querySelector("button[type=submit]"),async()=>{try{let v=await h.post("/api/auth/login",{identifier:f.get("identifier"),password:f.get("password"),remember:f.get("remember")==="on",captchaToken:f.get("captchaToken")||void 0});v.twoFactor?(te.challenge=v.challengeToken,te.methods=v.methods||["totp"],te.sent=v.sent||null,Yo(e,v)):(d.me=v.me,$(t("auth.loginDone")),xa(s))}catch(v){(v?.code==="captcha_required"||v?.details?.captchaRequired)&&Zt(u),y(v)}})}),g("otp-send",async(m,u)=>{if(m.preventDefault(),!await rs(u))return;let f=new FormData(u),v=u.dataset.apf==="email"?"email":"phone";te.channel=v,te.target=String(f.get("target")||"").trim(),await A(u.querySelector("button[type=submit]"),async()=>{try{let S=await h.post("/api/auth/otp/send",{channel:v,target:te.target,purpose:"login",captchaToken:f.get("captchaToken")||void 0});te.demoCode=S.demoCode||"";let k=o.login.querySelector('[data-apf="code"]');o.login.querySelectorAll("[data-apf]").forEach(M=>{M.hidden=M!==k}),k.querySelector("[data-sentto]").textContent=t("auth.codeSentTo",{target:S.target});let E=k.querySelector("[data-democode]");E.hidden=!S.demoCode,S.demoCode&&(E.querySelector("span").textContent=t("auth.demoCode",{code:S.demoCode})),$(t("auth.codeSent")),bn(e,"[data-resend]"),k.querySelector("[name=code]").focus()}catch(S){S?.code==="captcha_required"&&Zt(u),y(S)}})}),g("otp-login",async(m,u)=>{m.preventDefault();let f=new FormData(u);await A(u.querySelector("button[type=submit]"),async()=>{try{let v=await h.post("/api/auth/login/otp",{channel:te.channel,target:te.target,code:f.get("code")});if(v.twoFactor){te.challenge=v.challengeToken,te.methods=v.methods||["totp"],Yo(e,v);return}d.me=v.me,$(t("auth.loginDone")),xa(s)}catch(v){y(v)}})}),e.querySelector("[data-resend]")?.addEventListener("click",async()=>{try{let m=await h.post("/api/auth/otp/send",{channel:te.channel,target:te.target,purpose:"login"});te.demoCode=m.demoCode||"";let u=o.login.querySelector("[data-democode]");u.hidden=!m.demoCode,m.demoCode&&(u.querySelector("span").textContent=t("auth.demoCode",{code:m.demoCode})),$(t("auth.codeSent")),bn(e,"[data-resend]")}catch(m){y(m)}}),g("login-2fa",async(m,u)=>{m.preventDefault();let f=new FormData(u),v=u.querySelector("[data-2fam].active")?.dataset["2fam"]||"totp";await A(u.querySelector("button[type=submit]"),async()=>{try{let S=await h.post("/api/auth/login/2fa",{challengeToken:te.challenge,code:f.get("code"),type:v});d.me=S.me,$(t("auth.loginDone")),xa(s)}catch(S){y(S)}})}),g("register",async(m,u)=>{if(m.preventDefault(),Ka(u),!await rs(u))return;let f=new FormData(u),v={mode:te.regMode,name:f.get("name"),password:f.get("password"),acceptTerms:f.get("acceptTerms")==="on",referralCode:f.get("referralCode")||"",hearAboutUs:f.get("hearAboutUs")||"",captchaToken:f.get("captchaToken")||void 0};te.regMode==="username"?(v.username=f.get("username"),v.phone=f.get("phone")||"",v.email=f.get("email")||""):te.regMode==="phone"?(v.target=f.get("phoneTarget"),v.code=f.get("code"),v.email=f.get("email")||""):(v.target=f.get("emailTarget"),v.code=f.get("code"),v.phone=f.get("phone")||""),await A(u.querySelector("button[type=submit]"),async()=>{try{let S=await h.post("/api/auth/register",v);d.me=S.me,$(t("auth.registerDone")),xa(s||"")}catch(S){S?.code==="captcha_required"&&Zt(u),y(S)}})}),g("forgot-send",async(m,u)=>{if(m.preventDefault(),!await rs(u))return;let f=new FormData(u),v=u.querySelector("[data-fch] .active").dataset.m;te.channel=v,te.target=String(f.get("target")||"").trim(),await A(u.querySelector("button[type=submit]"),async()=>{try{let S=await h.post("/api/auth/password/forgot",{channel:v,target:te.target,captchaToken:f.get("captchaToken")||void 0}),k=o.forgot.querySelector('[data-act="forgot-reset"]');o.forgot.querySelector('[data-act="forgot-send"]').hidden=!0,k.hidden=!1,k.querySelector("[data-fsent]").textContent=t("auth.codeSentTo",{target:S.target});let E=k.querySelector("[data-fdemo]");E.hidden=!S.demoCode,S.demoCode&&(E.querySelector("span").textContent=t("auth.demoCode",{code:S.demoCode})),$(t("auth.codeSent"))}catch(S){S?.code==="captcha_required"&&Zt(u),y(S)}})}),g("forgot-reset",async(m,u)=>{m.preventDefault();let f=new FormData(u);await A(u.querySelector("button[type=submit]"),async()=>{try{let v=await h.post("/api/auth/password/reset",{channel:te.channel,target:te.target,code:f.get("code"),password:f.get("password")});d.me=v.me,$(t("auth.resetDone")),xa("")}catch(v){y(v)}})}),null}function Yo(e,a){let s=e.querySelector('[data-ap="login"]');s.querySelectorAll("[data-apf]").forEach(m=>{m.hidden=m.dataset.apf!=="2fa"});let n=s.querySelector('[data-act="login-2fa"]'),o=n.querySelector("[data-2fa-method]"),i=te.methods,l={totp:t("auth.2faTotp"),sms:t("auth.2faSms"),email:t("auth.2faEmail"),backup:t("auth.2faBackup")};o.innerHTML=i.map((m,u)=>r`<button type="button" class="btn ${u===0?"active":""}" data-2fam="${m}">${l[m]||m}</button>`).join(""),o.addEventListener("click",m=>{let u=m.target.closest("[data-2fam]");u&&o.querySelectorAll("[data-2fam]").forEach(f=>f.classList.toggle("active",f===u))}),a.sent?.demoCode&&oe(t("auth.demoCode",{code:a.sent.demoCode}),{title:t("auth.2faTitle"),timeout:12e3}),n.querySelector("[name=code]").focus()}function bn(e,a){let s=60,n=e.querySelector(a),o=setInterval(()=>{s-=1,n&&(n.textContent=s>0?t("auth.resendIn",{s:b(s)}):t("auth.resend")),s<=0&&clearInterval(o)},1e3)}var te,Gi,gn=O(()=>{B();W();Q();_();ce();X();le();ee();te={challenge:null,methods:[],sent:null,channel:"phone",target:"",demoCode:"",mode:"login",regMode:"username"};Gi=()=>t("auth.title")});async function is(){return(await h.get("/api/support/messages")).items||[]}function ls(e){return e.length?e.map(yn).join(""):r`<div class="msg them">${t("acc.chatWelcome")}</div>`}function ds(e){requestAnimationFrame(()=>{e.scrollTop=e.scrollHeight})}async function Ki(e){return await h.post("/api/support/messages",{body:e})}function cs(){if(!Qi())return;if(!d.me){oe(t("chat.loginFirst")),location.hash="#/auth?next="+encodeURIComponent("account/support");return}if(et){Go();return}let e=document.getElementById("chatRoot");et=ze("div",{class:"chat-win",role:"dialog","aria-label":t("chat.title")}),et.innerHTML=r`
    <header class="chat-h">
      <span class="stat-ic" data-h="34px" data-w="34px">${c("headset")}</span>
      <div class="grow">
        <div class="t">${t("chat.title")}</div>
        <div class="s"><span class="online-dot"></span>${t("chat.online")}</div>
      </div>
      <button type="button" class="icon-btn" data-cx aria-label="${t("chat.minimize")}">${c("close")}</button>
    </header>
    <div class="chat-b" data-thread><div class="msg them">${t("common.loading")}</div></div>
    <form class="chat-f" data-act="chat-send">
      <input class="input" name="body" maxlength="1000" placeholder="${t("acc.chatPlaceholder")}" autocomplete="off">
      <button type="submit" class="btn btn-primary btn-icon" aria-label="${t("common.send")}">${c("send")}</button>
    </form>`,e.appendChild(et),ht=et.querySelector("[data-thread]"),et.querySelector("[data-cx]").addEventListener("click",Go);let a=et.querySelector(".chat-h .stat-ic");a&&(a.style.width="34px",a.style.height="34px",a.style.borderRadius="11px"),is().then(s=>{ht.innerHTML=ls(s),ds(ht)}).catch(()=>{ht.innerHTML=r`<div class="msg them">${t("err.network")}</div>`}),et.querySelector("input[name=body]").focus()}function Go(){et?.remove(),et=null,ht=null}function Qo(e){let a=[];ht&&a.push(ht),document.querySelectorAll("[data-thread-page]").forEach(s=>a.push(s));for(let s of a){if(s.querySelector(`[data-id="${e.id}"]`))continue;let n=s.querySelector(".msg");n&&!n.dataset.id&&s.children.length===1&&n.classList.contains("them")&&n.textContent===t("acc.chatWelcome")&&(s.innerHTML=""),s.insertAdjacentHTML("beforeend",yn(e)),ds(s)}}function Jo(){document.getElementById("fabSupport")?.addEventListener("click",cs),document.getElementById("btnSupportTop")?.addEventListener("click",cs),Le("sse:support",e=>{!d.me||e?.userId!==d.me.id||is().then(a=>{let s=a.find(o=>o.id===e.id);s&&s.from==="staff"&&(Ko()?Qo(s):(vn+=1,fn(),oe(s.body,{title:t("chat.title"),timeout:6e3,action:{label:t("common.view"),onClick:cs}})));let n=document.querySelector("[data-thread-page]");n&&!Ko()&&(n.innerHTML=ls(a),ds(n))}).catch(()=>{})}),Le("me",()=>fn())}function fn(){let e=document.getElementById("fabSupport");if(!e)return;let a=e.querySelector(".fab-dot");vn>0?a||(a=ze("span",{class:"fab-dot"}),e.appendChild(a)):a?.remove()}function Xo(){vn=0,fn()}function Qi(){return d.settings?.features?.liveSupport!==!1}var et,ht,vn,yn,Ko,$n=O(()=>{_();W();Q();B();X();le();et=null,ht=null,vn=0,yn=e=>r`
  <div class="msg ${e.from==="user"?"me":"them"}" data-id="${e.id||""}">
    ${p(e.body)}
    <span class="tm">${fe(e.at)}</span>
  </div>`;Ko=()=>!!et;g("chat-open",()=>cs());g("chat-send",async(e,a)=>{let s=a.querySelector("input[name=body], textarea[name=body]"),n=String(s?.value||"").trim();if(!n)return;s.value="";let o={id:"tmp",from:"user",body:n,at:new Date().toISOString()},i=[];ht&&i.push(ht),document.querySelectorAll("[data-thread-page]").forEach(l=>i.push(l));for(let l of i)l.insertAdjacentHTML("beforeend",yn(o)),ds(l);try{let l=await Ki(n),m=l.message;oe(t("chat.sent"),{timeout:1600});for(let u of i){let f=u.querySelector(".msg.me:not([data-id])");f&&(f.dataset.id=m.id,f.querySelector(".tm").textContent=fe(m.at))}l.botMessage&&Qo(l.botMessage)}catch(l){y(l);for(let m of i)m.lastElementChild?.remove();s.value=n}})});var Sn={};G(Sn,{mount:()=>fl,render:()=>Xi,title:()=>vl});async function Xi(e){let a=e.params.section||"",s=Ji.filter(o=>!o.feat||I(o.feat)),n=await Zi(a,e);return r`
    <div class="section-head"><div>
      <h1 class="section-title">${c("user")} ${t("acc.title")}</h1>
      <p class="section-sub">${t("acc.hello",{name:p(d.me?.name||d.me?.username||"")})} · ${t("acc.memberSince",{date:H(d.me?.createdAt,{time:!1})})}</p>
    </div></div>
    <div class="acc-grid">
      <aside class="acc-side">
        <div class="acc-user">
          <span class="av">${p((d.me?.name||d.me?.username||"?").charAt(0))}</span>
          <div class="grow">
            <div class="b nowrap">${p(d.me?.name||d.me?.username)}</div>
            <div class="tiny muted">${d.me?.role==="owner"?t("common.admin"):d.me?.role==="staff"?"\u06A9\u0627\u0631\u0645\u0646\u062F":t("common.user")}</div>
          </div>
        </div>
        <nav class="acc-nav" aria-label="${t("acc.title")}">
          ${s.map(o=>r`<a href="#/account${o.id?`/${o.id}`:""}" class="${o.id===a?"active":""}">${c(o.icon)} ${o.label()}${o.id==="notifications"&&d.unread?r`<span class="cnt">${b(d.unread)}</span>`:""}</a>`)}
        </nav>
      </aside>
      <div data-accbody>${n}</div>
    </div>`}async function Zi(e,a){switch(e){case"orders":return tl();case"wishlist":return al();case"wallet":return sl();case"plus":return nl();case"addresses":return ol();case"notifications":return rl();case"tickets":return il();case"support":return ll();case"reviews":return dl();case"feedback":return ml();case"referrals":return $l();case"profile":return pl();case"kyc":return yl();case"security":return ul();case"prefs":return hl();case"data":return gl();default:return el()}}async function el(){let e=[];try{e=(await h.get("/api/me/orders")).items||[]}catch{}let a=e.slice(0,4);return r`
    <div class="stats-grid mb">
      <div class="stat-card"><span class="stat-ic">${c("package-check")}</span><div><div class="stat-val">${b(e.length)}</div><div class="stat-lbl">${t("acc.orders")}</div></div></div>
      ${I("wallet")?r`<div class="stat-card"><span class="stat-ic">${c("wallet")}</span><div><div class="stat-val">${b(d.me?.wallet?.balance||0)}</div><div class="stat-lbl">${t("common.balance")}</div></div></div>`:""}
      <div class="stat-card"><span class="stat-ic">${c("heart")}</span><div><div class="stat-val">${b(d.wishlist.length)}</div><div class="stat-lbl">${t("acc.wishlist")}</div></div></div>
      <div class="stat-card"><span class="stat-ic">${c("gift")}</span><div><div class="stat-val">${b(d.me?.points||0)}</div><div class="stat-lbl">${t("common.points")}</div></div></div>
    </div>
    ${(()=>{let s=d.me?.badges||[],n=s.filter(o=>o.got).length;return s.length?r`<div class="card mb">
        <div class="row row-between"><strong>${c("award")} ${t("acc.badges")}</strong><span class="muted tiny">${b(n)} / ${b(s.length)}</span></div>
        <div class="badges-grid mt-s">
          ${s.map(o=>r`
            <div class="badge-item ${o.got?"got":""}" title="${t(`badge.${o.id}.d`)}">
              <span class="bi-ic">${c(o.got?"award":"lock")}</span>
              <b>${t(`badge.${o.id}`)}</b>
              <span class="tiny muted">${o.got?t("badge.got"):o.progress!==void 0?`${b(o.progress)}\xD7`:t("badge.locked")}</span>
            </div>`)}
        </div>
      </div>`:""})()}
    ${Ve()?r`<div class="notice notice-success mb">${c("sparkles")}<span>${t("acc.plusActive",{date:H(d.me?.plus?.until,{time:!1})})}</span></div>`:I("plus")?r`<div class="notice notice-info mb">${c("sparkles")}<span>${t("acc.plusInactive")} — <a class="section-link" href="#/account/plus">${t("acc.plusSubscribe")}</a></span></div>`:""}
    ${e.length?r`
      <div class="section-head"><div><h2 class="section-title">${c("history")} ${t("acc.orders")}</h2></div><a class="section-link" href="#/account/orders">${t("common.showAll")}</a></div>
      ${Zo(a)}`:P({icon:"cart",title:t("acc.noOrders"),text:t("acc.noOrdersText"),action:{href:"#/products",label:t("cart.goShopping")}})}
    ${d.me?.referralCode&&I("referrals")?r`
      <div class="card mt">
        <strong>${c("gift")} ${t("acc.referralCode")}</strong>
        <div class="row mt-s">
          <code class="tag mono b" data-h="34px">${d.me.referralCode}</code>
          <button class="btn btn-ghost btn-sm" data-act="copy" data-text="${d.me.referralCode}">${c("copy")} ${t("common.copy")}</button>
        </div>
        <p class="hint mt-s">${t("acc.referralText")}</p>
      </div>`:""}`}function Zo(e){return re([{label:t("acc.orderCode")},{label:t("acc.orderDate")},{label:t("common.status")},{label:t("acc.orderTotal"),cls:"num"},{label:t("common.actions"),cls:"num"}],e.map(a=>r`
      <tr>
        <td class="mono b">${a.code}</td>
        <td class="nowrap">${H(a.createdAt,{time:!1})}</td>
        <td>${bt(a.status)}</td>
        <td class="num">${C(a.total)}</td>
        <td><div class="act"><a class="btn btn-ghost btn-xs" href="#/account/orders/${a.id}">${t("common.view")}</a></div></td>
      </tr>`))}async function tl(){let e=[];try{e=(await h.get("/api/me/orders")).items||[]}catch{}return e.length?Zo(e):P({icon:"package-check",title:t("acc.noOrders"),text:t("acc.noOrdersText"),action:{href:"#/products",label:t("cart.goShopping")}})}async function al(){if(!d.wishlist.length)return P({icon:"heart",title:t("acc.wishlistEmpty"),text:t("acc.wishlistEmptyText"),action:{href:"#/products",label:t("cart.goShopping")}});let e=await h.get("/api/products?limit=96").catch(()=>null),a=d.wishlist.map(s=>e?.items?.find(n=>n.id===s)).filter(Boolean);return Ie(a)}async function sl(){if(!I("wallet"))return P({icon:"wallet",title:t("err.notFound")});let e={balance:0,transactions:[]};try{e=await h.get("/api/me/wallet")}catch{}return r`
    <div class="card mb">
      <div class="row row-between row-wrap">
        <div><div class="muted small">${t("common.balance")}</div><div class="buy-now">${C(e.balance)}</div></div>
        <button class="btn btn-primary" data-act="wallet-deposit">${c("plus")} ${t("acc.walletDeposit")}</button>
      </div>
      <p class="hint mt-s">${t("acc.walletNote")}</p>
    </div>
    ${re([{label:t("common.date")},{label:t("common.type")},{label:t("common.amount"),cls:"num"},{label:t("common.note")}],(e.transactions||[]).map(a=>r`
        <tr>
          <td class="nowrap">${H(a.at)}</td>
          <td><span class="badge-pill ${a.amount>=0?"bp-success":"bp-warn"}">${t(`acc.tx.${a.type}`)||a.type}</span></td>
          <td class="num b">${a.amount>=0?"+":""}${b(a.amount)}</td>
          <td class="muted small">${p(a.note||"")} ${a.ref?r`<button class="link-btn mono" data-act="copy" data-text="${a.ref}">${a.ref}</button>`:""}</td>
        </tr>`),{emptyText:t("acc.walletEmpty")})}`}function nl(){if(!I("plus"))return P({icon:"sparkles",title:t("err.notFound")});let e=ga(),a=Ve();return r`
    <div class="card mb t-center">
      <span class="pwa-ic center" data-h="60px" data-w="60px">${c("sparkles")}</span>
      <h2 class="mt-s">${a?t("acc.plusActive",{date:H(d.me?.plus?.until,{time:!1})}):t("acc.plusInactive")}</h2>
      <p class="buy-price center"><span class="buy-now">${C(e.price)}</span><span class="buy-cur">/ ${b(e.durationDays)} ${t("common.day")}</span></p>
      <div class="row center row-wrap">
        <button class="btn btn-primary" data-act="plus-buy" data-method="wallet" ${I("wallet")?"":"hidden"}>${c("wallet")} ${t("acc.plusPayWallet")}</button>
        <button class="btn btn-ghost" data-act="plus-buy" data-method="gateway">${c("card")} ${t("acc.plusPayGateway")}</button>
      </div>
      <p class="hint mt-s">${t("checkout.gatewayDemo")}</p>
    </div>
    <div class="section-head"><div><h2 class="section-title">${c("gift")} ${t("acc.plusPerks")}</h2></div></div>
    <div class="pwa-grid">
      ${(e.perks||[]).map(s=>r`<div class="pwa-card"><span class="pwa-ic">${c("check")}</span><div>${w()?s.fa:s.en}</div></div>`)}
    </div>`}function ol(){let e=d.me?.addresses||[];return r`
    <div class="row row-between mb">
      <strong>${t("acc.addresses")} (${b(e.length)})</strong>
      <button class="btn btn-primary btn-sm" data-act="addr-new">${c("plus")} ${t("acc.addAddress")}</button>
    </div>
    ${e.length?r`<div class="pwa-grid">${e.map(a=>r`
      <div class="card">
        <div class="row row-between">
          <strong>${p(a.title||"")}</strong>
          ${a.isDefault?r`<span class="badge-pill bp-accent">${t("acc.addrDefault")}</span>`:""}
        </div>
        <p class="muted small mt-s">${p(a.receiver||"")} · ${ne(a.phone||"")}<br>${p(a.street||"")}${a.city?`\u060C ${p(a.city)}`:""}${a.postal?`<br>${t("common.postal")}: ${p(a.postal)}`:""}</p>
        ${a.note?r`<p class="hint">${p(a.note)}</p>`:""}
        <div class="row mt-s">
          <button class="btn btn-ghost btn-xs" data-act="addr-edit" data-id="${a.id}">${c("edit")} ${t("common.edit")}</button>
          <button class="btn btn-ghost btn-xs" data-act="addr-del" data-id="${a.id}">${c("trash")} ${t("common.delete")}</button>
          ${a.isDefault?"":r`<button class="btn btn-ghost btn-xs" data-act="addr-default" data-id="${a.id}">${c("check")} ${t("acc.addrDefault")}</button>`}
        </div>
      </div>`)}</div>`:P({icon:"pin",title:t("acc.noAddress")})}`}function er(e=null){return ie({title:e?t("acc.editAddress"):t("acc.addAddress"),body:r`
      <form data-act="addr-save2" class="form-grid" data-id="${e?.id||""}">
        ${x({label:t("acc.addrTitle"),name:"title",required:!0,value:e?.title||""})}
        ${x({label:t("acc.addrReceiver"),name:"receiver",required:!0,value:e?.receiver||d.me?.name||""})}
        ${x({label:t("acc.addrPhone"),name:"phone",type:"tel",required:!0,value:e?.phone||d.me?.phone||""})}
        ${x({label:t("common.city"),name:"city",value:e?.city||""})}
        ${x({label:t("common.postal"),name:"postal",value:e?.postal||""})}
        ${x({label:t("acc.addrStreet"),name:"street",required:!0,span2:!0,value:e?.street||""})}
        ${x({label:t("acc.addrNote"),name:"note",span2:!0,value:e?.note||""})}
        <label class="check span-2"><input type="checkbox" name="isDefault" ${e?.isDefault?"checked":""}><span class="box">${c("check")}</span><span>${t("acc.addrDefault")}</span></label>
        <button class="btn btn-primary span-2" type="submit">${t("common.save")}</button>
      </form>`})}async function rl(){await ut(!0);let e=d.notifications;return r`
    <div class="row row-between mb">
      <strong>${t("common.notifications")} (${b(e.length)})</strong>
      <button class="btn btn-ghost btn-sm" data-act="notif-read-all">${c("check")} ${t("acc.markAllRead")}</button>
    </div>
    ${e.length?r`<div class="col">${e.map(a=>r`
      <div class="card ${a.read?"":"notif-unread"}">
        <div class="row row-between">
          <strong class="row">${c(cl(a.type))} ${p(w()?a.title:a.titleEn||a.title)}</strong>
          <span class="muted tiny nowrap">${fe(a.createdAt)}</span>
        </div>
        ${a.body?r`<p class="muted small mt-s">${p(w()?a.body:a.bodyEn||a.body)}</p>`:""}
        <div class="row mt-s">
          ${a.link?r`<a class="btn btn-ghost btn-xs" href="${a.link}">${t("common.view")}</a>`:""}
          ${a.read?"":r`<button class="btn btn-ghost btn-xs" data-act="notif-read" data-id="${a.id}">${t("notif.markRead")}</button>`}
          <button class="btn btn-ghost btn-xs" data-act="notif-del" data-id="${a.id}">${c("trash")}</button>
        </div>
      </div>`)}</div>`:P({icon:"bell",title:t("acc.notifEmpty")})}`}function cl(e){return{order:"package-check",restock:"box",ticket:"ticket",support:"headset",review:"star",plus:"sparkles",wallet:"wallet",account:"user",feedback:"flag",admin_alert:"alert",offer:"percent",welcome:"heart"}[e]||"bell"}async function il(){let e=[];try{e=(await h.get("/api/tickets")).items||[]}catch{}return r`
    <div class="row row-between mb">
      <strong>${t("common.tickets")} (${b(e.length)})</strong>
      <button class="btn btn-primary btn-sm" data-act="ticket-new">${c("plus")} ${t("acc.ticketNew")}</button>
    </div>
    ${e.length?re([{label:t("acc.orderCode")},{label:t("acc.ticketSubject")},{label:t("common.status")},{label:t("common.priority")},{label:t("common.date")},{label:""}],e.map(a=>r`
        <tr>
          <td class="mono">${a.code}</td>
          <td class="nowrap">${p(a.subject)}</td>
          <td><span class="badge-pill ${a.status==="closed"?"bp-muted":a.status==="answered"?"bp-success":"bp-warn"}">${t(`tk.${a.status}`)}</span></td>
          <td>${t(`tp.${a.priority}`)}</td>
          <td class="nowrap">${H(a.createdAt,{time:!1})}</td>
          <td><a class="btn btn-ghost btn-xs" href="#/account/tickets/${a.id}">${t("common.view")}${a.unread?r` <span class="badge-pill bp-danger">${b(a.messageCount)}</span>`:""}</a></td>
        </tr>`)):P({icon:"ticket",title:t("acc.noTickets")})}`}async function ll(){if(!I("liveSupport"))return P({icon:"headset",title:t("err.notFound")});let e=[];try{e=await is()}catch{}return Xo(),r`
    <div class="card">
      <div class="row row-between mb-s">
        <strong>${c("headset")} ${t("acc.chatTitle")}</strong>
        <a class="btn btn-ghost btn-xs" href="#/account/tickets">${c("ticket")} ${t("acc.chatOpenTicket")}</a>
      </div>
      <div class="chat-b" data-thread-page data-h="340px">${ls(e)}</div>
      <form class="chat-f mt-s" data-act="chat-send">
        <input class="input" name="body" maxlength="1000" placeholder="${t("acc.chatPlaceholder")}" autocomplete="off">
        <button type="submit" class="btn btn-primary btn-icon" aria-label="${t("common.send")}">${c("send")}</button>
      </form>
    </div>`}async function kn(){return(await h.get("/api/me/export")).data}async function dl(){let e=null;try{e=await kn()}catch{}let a=e?.reviews||[];return a.length?r`<div class="col">${a.map(s=>r`
    <div class="card">
      <div class="row row-between">
        <strong>${p(s.productName||s.productId)}</strong>
        <span class="badge-pill ${s.status==="approved"?"bp-success":s.status==="rejected"?"bp-danger":"bp-warn"}">${t(`common.${s.status==="approved"?"approved":s.status==="rejected"?"rejected":"pending"}`)}</span>
      </div>
      <div class="row row-wrap mt-s">${s.rating?Me(s.rating):""}<span class="muted tiny">${H(s.createdAt,{time:!1})}</span><span class="badge-pill bp-muted">${s.type==="question"?t("common.question"):t("common.review")}</span></div>
      <div class="rev-title mt-s">${p(s.title)}</div>
      <div class="rev-body">${p(s.body)}</div>
      ${s.reply?r`<div class="rev-reply"><strong>${t("pdp.storeReply")}:</strong> ${p(s.reply)}</div>`:""}
    </div>`)}</div>`:P({icon:"star",title:t("acc.reviewEmpty")})}async function ml(){let e=null;try{e=await kn()}catch{}let a=e?.feedback||[];return r`
    <div class="row row-between mb">
      <strong>${t("acc.feedback")}</strong>
      <button class="btn btn-primary btn-sm" data-act="feedback-new">${c("plus")} ${t("acc.feedbackNew")}</button>
    </div>
    ${a.length?r`<div class="col">${a.map(s=>r`
      <div class="card">
        <div class="row row-between">
          <span class="badge-pill ${s.type==="bug"?"bp-danger":s.type==="complaint"?"bp-warn":"bp-info"}">${t(`ft.${s.type}`)}</span>
          <span class="badge-pill bp-muted">${t(`fs.${s.status}`)}</span>
        </div>
        <div class="rev-title mt-s">${p(s.title)}</div>
        <div class="rev-body">${p(s.body)}</div>
        ${s.response?r`<div class="rev-reply">${p(s.response)}</div>`:""}
        <div class="muted tiny mt-s">${H(s.createdAt)}</div>
      </div>`)}</div>`:P({icon:"flag",title:t("acc.noFeedback")})}`}function pl(){let e=d.me;return r`
    <form class="card form-grid" data-act="profile-save">
      ${x({label:t("common.fullName"),name:"name",required:!0,value:e?.name||""})}
      ${x({label:"Name (EN)",name:"nameEn",value:e?.nameEn||""})}
      ${x({label:t("common.username"),name:"username",value:e?.username||"",attrs:"disabled"})}
      ${x({label:t("common.phone"),name:"phone",type:"tel",value:e?.phone||""})}
      ${x({label:t("common.email"),name:"email",type:"email",value:e?.email||""})}
      <div class="span-2 row">
        <button class="btn btn-primary" type="submit">${c("save")} ${t("common.save")}</button>
      </div>
    </form>`}async function ul(){let e=null,a=[];try{e=await h.get("/api/me/2fa")}catch{}try{a=(await h.get("/api/me/sessions")).items||[]}catch{}return r`
    <div class="card mb">
      <strong>${c("key")} ${t("acc.passwordChange")}</strong>
      <form class="form-grid mt-s" data-act="pass-change">
        ${x({label:t("acc.currentPassword"),name:"current",type:"password",required:!0,autocomplete:"current-password"})}
        ${x({label:t("acc.newPassword2"),name:"next",type:"password",required:!0,hint:t("auth.passwordRules"),autocomplete:"new-password"})}
        ${x({label:t("common.passwordConfirm"),name:"confirm",type:"password",required:!0,autocomplete:"new-password"})}
        <div class="span-2"><button class="btn btn-primary" type="submit">${t("common.save")}</button></div>
      </form>
    </div>

    ${I("twoFactor")?r`
    <div class="card mb">
      <div class="row row-between">
        <strong>${c("shield")} ${t("acc.2faSection")}</strong>
        <span class="badge-pill ${e?.enabled?"bp-success":"bp-muted"}">${e?.enabled?t("acc.2faOn"):t("acc.2faOff")}</span>
      </div>
      <div class="mt-s" data-2fa-box>
        ${e?.enabled?r`
          <p class="muted small">${t("acc.2faMethods")}: ${(e.methods||[]).map(s=>t(`auth.2fa${s==="totp"?"Totp":s==="sms"?"Sms":"Email"}`)).join("\u060C ")}</p>
          ${e.backupCodes?.length?r`<details class="mt-s"><summary class="link-btn">${t("acc.2faBackup")}</summary><p class="hint">${t("acc.2faBackupHint")}</p><div class="row row-wrap">${e.backupCodes.map(s=>r`<code class="tag mono">${s}</code>`)}</div></details>`:""}
          <button class="btn btn-danger btn-sm mt" data-act="2fa-disable">${c("close")} ${t("acc.2faDisable")}</button>`:r`
          <p class="muted small">${t("acc.2faOff")}</p>
          <button class="btn btn-primary btn-sm mt-s" data-act="2fa-setup">${c("shield")} ${t("acc.2faEnable")}</button>`}
      </div>
    </div>`:""}

    <div class="card">
      <div class="row row-between">
        <strong>${c("users")} ${t("acc.sessions")}</strong>
        <button class="btn btn-ghost btn-sm" data-act="sessions-revoke">${c("logout")} ${t("acc.revokeAll")}</button>
      </div>
      <p class="muted small mt-s">${t("acc.sessionsText")}</p>
      ${re([{label:t("acc.current")},{label:"IP"},{label:t("common.date")},{label:""}],a.map(s=>r`
          <tr>
            <td>${s.current?r`<span class="badge-pill bp-success">${t("acc.current")}</span>`:r`<span class="muted tiny">${p((s.ua||"").slice(0,40))}</span>`}</td>
            <td class="mono small">${p(s.ip||"")}</td>
            <td class="nowrap small">${H(s.lastSeenAt||s.createdAt)}</td>
            <td>${s.current?"":r`<button class="btn btn-ghost btn-xs" data-act="session-revoke" data-id="${s.id}">${c("trash")}</button>`}</td>
          </tr>`))}
    </div>`}async function bl(){return window.qrcode||await new Promise((e,a)=>{let s=document.createElement("script");s.src="/js/vendor/qrcode-generator.js",s.onload=e,s.onerror=a,document.head.appendChild(s)}),window.qrcode}function hl(){let e=d.prefs,a=d.me?.notificationsPrefs||{};return r`
    <div class="card mb">
      <strong>${c("settings")} ${t("acc.prefs")}</strong>
      <p class="muted small mt-s">${t("acc.prefsText")}</p>
      <div class="form-grid mt">
        ${U({label:t("acc.prefTheme"),name:"theme",value:e.theme,options:[{value:"dark",label:t("theme.dark")},{value:"light",label:t("theme.light")},{value:"auto",label:t("theme.auto")}]})}
        ${U({label:t("acc.prefLang"),name:"locale",value:e.locale,options:[{value:"fa",label:"\u0641\u0627\u0631\u0633\u06CC"},{value:"en",label:"English"}]})}
        ${U({label:t("acc.prefDensity"),name:"density",value:e.density,options:[{value:"compact",label:"Compact"},{value:"normal",label:"Normal"},{value:"comfy",label:"Comfy"}]})}
      </div>
      ${he({label:t("acc.prefMotion"),desc:ve()==="fa"?"\u062E\u0627\u0645\u0648\u0634 \u06A9\u0631\u062F\u0646 \u0627\u0646\u06CC\u0645\u06CC\u0634\u0646\u200C\u0647\u0627 \u0628\u0631\u0627\u06CC \u0631\u0627\u062D\u062A\u06CC \u0686\u0634\u0645":"Turn animations off",name:"reduceMotion",checked:!!e.reduceMotion})}
    </div>
    <div class="card">
      <strong>${c("bell")} ${t("acc.prefNotif")}</strong>
      <form data-act="notif-prefs" class="mt-s">
        ${he({label:t("acc.notifMarketing"),name:"marketing",checked:!!a.marketing})}
        ${he({label:t("acc.notifOrders"),name:"orders",checked:a.orders!==!1})}
        ${he({label:t("acc.notifRestock"),name:"restock",checked:a.restock!==!1})}
        ${he({label:t("acc.notifSupport"),name:"support",checked:a.support!==!1})}
        <button class="btn btn-primary mt" type="submit">${t("common.save")}</button>
      </form>
    </div>`}function gl(){return r`
    <div class="card mb">
      <strong>${c("download")} ${t("acc.exportData")}</strong>
      <p class="muted small mt-s">${t("acc.exportHint")}</p>
      <button class="btn btn-primary mt-s" data-act="data-export">${c("download")} ${t("common.download")}</button>
    </div>
    <div class="card">
      <strong class="danger-text">${c("alert")} ${t("acc.deleteAccount")}</strong>
      <p class="muted small mt-s">${t("acc.deleteWarn")}</p>
      <button class="btn btn-danger mt-s" data-act="data-delete">${c("trash")} ${t("acc.deleteAccount")}</button>
    </div>`}function fl(e,a){return L(e),null}async function yl(){let e=d.me.kycStatus==="approved",a=d.me.kycStatus==="pending",s=d.me.kycStatus==="rejected";return e?r`
      <div class="card box pad text-center">
        ${c("check-circle",{style:"color:var(--success);width:64px;height:64px;"})}
        <h3 class="mt-4 mb-2">احراز هویت تأیید شده است</h3>
        <p class="text-muted">شما می‌توانید بدون محدودیت از تمامی خدمات و ثبت سفارش استفاده کنید.</p>
      </div>
    `:a?r`
      <div class="card box pad text-center">
        ${c("clock",{style:"color:var(--warning);width:64px;height:64px;"})}
        <h3 class="mt-4 mb-2">در حال بررسی مدارک</h3>
        <p class="text-muted">مدارک شما دریافت شده و در صف بررسی توسط کارشناسان یاسایی الکترونیک قرار دارد. لطفاً شکیبا باشید.</p>
      </div>
    `:r`
    <div class="card box pad">
      <h3 class="mb-4">${c("shield-check")} تکمیل احراز هویت</h3>
      ${s?r`<div class="alert danger mb-4">مدارک قبلی شما به دلیل نقص یا ناخوانا بودن رد شد. لطفاً دوباره ارسال کنید. (${p(d.me.kycMessage||"")})</div>`:""}
      <p class="text-muted mb-4"><strong>توجه:</strong> حداکثر حجم مجاز برای هر فایل ۲ مگابایت است.<br>احراز هویت <strong>اجباری نیست</strong>، اما با تایید مدارک خود امکان استفاده از <strong>خرید اقساطی (اسنپ‌پی، ازکی‌وام)</strong>، شرکت در <strong>قرعه‌کشی‌ها</strong> و دریافت <strong>کدهای تخفیف ویژه</strong> برای شما فعال خواهد شد.</p>
      
      <div class="alert info mb-4">
        <strong>راهنمای بارگذاری مدارک:</strong>
        <ol class="mt-2 mb-0" style="padding-right: 20px;">
          <li>فرم تعهدنامه را <a href="/assets/docs/kyc-form.pdf" target="_blank" download style="font-weight:bold;text-decoration:underline;">دانلود کنید</a>، پرینت گرفته و امضا کنید (یا به صورت دیجیتال پر کنید).</li>
          <li>یک عکس واضح از کارت ملی یا شناسنامه خود بگیرید.</li>
          <li>یک عکس سلفی در حالی که کارت ملی و فرم تعهدنامه را در دست دارید بگیرید.</li>
        </ol>
      </div>

      <form class="stack grid gap-3" onsubmit="event.preventDefault(); window.submitKyc(event.target);">
        <div class="field">
          <label>عکس سلفی (همراه با کارت ملی و فرم)</label>
          <input type="file" name="selfie" accept="image/*" required class="input">
        </div>
        <div class="field">
          <label>عکس کارت ملی یا شناسنامه</label>
          <input type="file" name="idCard" accept="image/*" required class="input">
        </div>
        <div class="field">
          <label>فرم امضا شده تعهدنامه (PDF یا عکس)</label>
          <input type="file" name="formDoc" accept="image/*,.pdf" required class="input">
        </div>
        <button type="submit" class="btn primary mt-2">${c("upload")} ارسال مدارک</button>
      </form>
    </div>
  `}function $l(){let e=d.me?.referralCode||d.me?.id?.substring(0,6).toUpperCase(),a=window.location.origin+"#/auth?ref="+e;return r`
    <div class="card box pad">
      <h3 class="mb-4">${c("users")} دعوت از دوستان (Referral)</h3>
      <p class="text-muted mb-4">با دعوت از دوستان خود هم به آن‌ها هدیه بدهید و هم خودتان پاداش بگیرید!</p>
      
      <div class="grid gap-3 mb-4">
        <div class="box pad" style="background: var(--surface-2); border-radius: var(--radius);">
          <div class="muted mb-2">کد معرف شما:</div>
          <div class="row row-between">
            <h2 class="mono m-0">${e}</h2>
            <button class="btn btn-ghost" onclick="navigator.clipboard.writeText('${e}'); import('../ui.mjs').then(m => m.toastSuccess('کد کپی شد'))">${c("copy")} کپی کد</button>
          </div>
        </div>
        <div class="box pad" style="background: var(--surface-2); border-radius: var(--radius);">
          <div class="muted mb-2">لینک دعوت اختصاصی:</div>
          <div class="row row-between gap-2">
            <input readonly value="${a}" class="input flex-1" style="font-size: 0.85rem;" dir="ltr">
            <button class="btn btn-ghost" onclick="navigator.clipboard.writeText('${a}'); import('../ui.mjs').then(m => m.toastSuccess('لینک کپی شد'))">${c("copy")}</button>
          </div>
        </div>
      </div>
      
      <div class="stats-grid mb-4">
        <div class="stat-card">
          <span class="stat-ic" style="color:var(--info)">${c("users")}</span>
          <div><div class="stat-val">${d.me?.referralCount||0}</div><div class="stat-lbl">دوستان دعوت‌شده</div></div>
        </div>
        <div class="stat-card">
          <span class="stat-ic" style="color:var(--success)">${c("gift")}</span>
          <div><div class="stat-val">${(d.me?.referralCount||0)*10}</div><div class="stat-lbl">امتیاز دریافتی</div></div>
        </div>
      </div>
      
      <div class="alert info">
        <h4 class="mb-2">${c("info")} پاداش‌ها (به‌زودی بر اساس قوانین سایت):</h4>
        <ul class="mb-0" style="padding-right: 20px;">
          <li>دعوت از هر نفر (ثبت‌نام موفق): <strong>تخفیف روی سبد خرید بعدی یا ارسال رایگان</strong></li>
          <li>دعوت از بیش از ۱۰ نفر: <strong>دریافت جایزه ویژه وفاداری</strong></li>
        </ul>
      </div>
    </div>
  `}var Ji,wn,tr,ar,vl,xn=O(()=>{B();W();Q();_();ce();X();le();ee();$n();Ji=[{id:"",icon:"home",label:()=>t("acc.dashboard")},{id:"orders",icon:"package-check",label:()=>t("acc.orders")},{id:"wishlist",icon:"heart",label:()=>t("acc.wishlist"),feat:"wishlist"},{id:"wallet",icon:"wallet",label:()=>t("acc.wallet"),feat:"wallet"},{id:"plus",icon:"sparkles",label:()=>t("acc.plus"),feat:"plus"},{id:"addresses",icon:"pin",label:()=>t("acc.addresses")},{id:"notifications",icon:"bell",label:()=>t("acc.notifications")},{id:"tickets",icon:"ticket",label:()=>t("acc.tickets"),feat:"tickets"},{id:"support",icon:"headset",label:()=>t("acc.support"),feat:"liveSupport"},{id:"reviews",icon:"star",label:()=>t("acc.reviews")},{id:"feedback",icon:"flag",label:()=>t("acc.feedback")},{id:"referrals",icon:"users",label:()=>"\u062F\u0639\u0648\u062A \u0627\u0632 \u062F\u0648\u0633\u062A\u0627\u0646"},{id:"profile",icon:"user",label:()=>t("acc.profile")},{id:"kyc",icon:"shield-check",label:()=>"\u0627\u062D\u0631\u0627\u0632 \u0647\u0648\u06CC\u062A (KYC)"},{id:"security",icon:"shield",label:()=>t("acc.security")},{id:"prefs",icon:"settings",label:()=>t("acc.prefs")},{id:"data",icon:"download",label:()=>t("acc.data")}];g("wallet-deposit",()=>{let e=ie({title:t("acc.walletDeposit"),size:"sm",body:r`
      <form data-act="wallet-deposit-do">
        <p class="notice notice-warn mb">${c("info")}<span>${t("checkout.gatewayDemo")}</span></p>
        ${x({label:t("acc.walletAmount"),name:"amount",type:"number",required:!0,value:"100000",attrs:'min="10000" step="10000"'})}
        <div class="row row-wrap mb">
          ${[1e5,2e5,5e5,1e6].map(a=>r`<button type="button" class="chip" data-amt="${a}">${b(a)}</button>`)}
        </div>
        <button class="btn btn-primary btn-block" type="submit">${c("card")} ${t("common.deposit")}</button>
      </form>`,onMount:(a,s)=>{a.querySelectorAll("[data-amt]").forEach(n=>n.addEventListener("click",()=>{a.querySelector("[name=amount]").value=n.dataset.amt}))}})});g("wallet-deposit-do",async(e,a)=>{e.preventDefault();let s=Number(new FormData(a).get("amount")||0);await A(a.querySelector("button[type=submit]"),async()=>{try{await h.post("/api/me/wallet/deposit",{amount:s}),await Ye(),$(t("acc.walletDeposited")),T(!0)}catch(n){y(n)}})});g("plus-buy",async(e,a)=>{await A(a,async()=>{try{await h.post("/api/me/plus/subscribe",{method:a.dataset.method}),await Ye(),$(t("acc.plusSubscribed")),T(!0)}catch(s){y(s)}})});wn=null;g("addr-new",()=>{wn=er(null)});g("addr-edit",(e,a)=>{let s=(d.me?.addresses||[]).find(n=>n.id===a.dataset.id);s&&(wn=er(s))});g("addr-del",async(e,a)=>{if(await Oe())try{let n=await h.del(`/api/me/addresses/${a.dataset.id}`);d.me&&(d.me.addresses=n.addresses),$(t("acc.addrDeleted")),T(!0)}catch(n){y(n)}});g("addr-default",async(e,a)=>{let s=(d.me?.addresses||[]).find(n=>n.id===a.dataset.id);try{let n=await h.patch(`/api/me/addresses/${a.dataset.id}`,{...s,isDefault:!0});d.me&&(d.me.addresses=n.addresses),$(t("acc.addrSaved")),T(!0)}catch(n){y(n)}});g("addr-save2",async(e,a)=>{e.preventDefault();let s=new FormData(a),n=Object.fromEntries(s.entries());n.isDefault=s.get("isDefault")==="on";let o=a.dataset.id;try{let i=o?await h.patch(`/api/me/addresses/${o}`,n):await h.post("/api/me/addresses",n);d.me&&(d.me.addresses=i.addresses),$(t("acc.addrSaved")),wn?.close(),T(!0)}catch(i){y(i)}});g("notif-read-all",async()=>{await Ya([],!0),T(!0)});g("notif-read",async(e,a)=>{await Ya([a.dataset.id]),T(!0)});g("notif-del",async(e,a)=>{await Ks(a.dataset.id),T(!0)});tr=null;g("ticket-new",()=>{let e=d.ticketCategories||[],a=d.ticketPriorities||[];tr=ie({title:t("acc.ticketNew"),body:r`
      <form data-act="ticket-create">
        ${x({label:t("acc.ticketSubject"),name:"subject",required:!0})}
        <div class="form-grid">
          ${U({label:t("acc.ticketCategory"),name:"category",required:!0,options:e.map(s=>({value:s.id||s,label:t(`tc.${s.id||s}`)}))})}
          ${U({label:t("acc.ticketPriority"),name:"priority",options:a.map(s=>({value:s.id||s,label:t(`tp.${s.id||s}`)})),value:"normal"})}
        </div>
        ${Y({label:t("acc.ticketBody"),name:"body",required:!0,rows:5})}
        <div class="mb">${Kt({label:r`${t("acc.ticketRules")} <a class="section-link" href="#/pages/ticketRules">${t("acc.ticketViewRules")}</a>`,name:"rules",required:!0})}</div>
        <button class="btn btn-primary btn-block" type="submit">${t("common.submit")}</button>
      </form>`})});g("ticket-create",async(e,a)=>{e.preventDefault();let s=new FormData(a);if(s.get("rules")!=="on"){j(t("form.rulesRequired"));return}await A(a.querySelector("button[type=submit]"),async()=>{try{let n=await h.post("/api/tickets",{subject:s.get("subject"),category:s.get("category"),priority:s.get("priority"),body:s.get("body"),rulesAccepted:!0});$(t("acc.ticketCreated",{code:n.ticket?.code||""})),tr?.close(),de(`#/account/tickets/${n.ticket?.id||""}`)}catch(n){y(n)}})});ar=null;g("feedback-new",()=>{ar=ie({title:t("acc.feedbackNew"),body:r`
      <form data-act="feedback-send">
        ${U({label:t("acc.feedbackType"),name:"type",options:["suggestion","complaint","bug"].map(e=>({value:e,label:t(`ft.${e}`)})),value:"suggestion"})}
        ${x({label:t("common.title"),name:"title",required:!0})}
        ${Y({label:t("common.body"),name:"body",required:!0,rows:5})}
        ${x({label:t("acc.feedbackContact"),name:"contact",hint:t("acc.feedbackContactHint"),value:d.me?.phone||d.me?.email||""})}
        ${d.me?"":ka()}
        <button class="btn btn-primary btn-block" type="submit">${t("common.submit")}</button>
      </form>`})});g("feedback-send",async(e,a)=>{e.preventDefault();let s=new FormData(a);await A(a.querySelector("button[type=submit]"),async()=>{try{await h.post("/api/feedback",{type:s.get("type"),title:s.get("title"),body:s.get("body"),contact:s.get("contact")||"",captchaToken:s.get("captchaToken")||void 0}),$(t("acc.feedbackSent")),ar?.close(),T(!0)}catch(n){if(n?.code==="captcha_required"){let o=a.querySelector("[data-captcha]");o&&(o.hidden=!1)}y(n)}})});g("profile-save",async(e,a)=>{e.preventDefault();let s=new FormData(a);await A(a.querySelector("button[type=submit]"),async()=>{try{let n=await h.patch("/api/me",{name:s.get("name"),nameEn:s.get("nameEn"),phone:s.get("phone"),email:s.get("email")});d.me=n.me,$(t("acc.profileSaved")),T(!0)}catch(n){y(n)}})});g("pass-change",async(e,a)=>{e.preventDefault();let s=new FormData(a);if(s.get("next")!==s.get("confirm")){j(ve()==="fa"?"\u062A\u06A9\u0631\u0627\u0631 \u0631\u0645\u0632 \u06CC\u06A9\u0633\u0627\u0646 \u0646\u06CC\u0633\u062A.":"Passwords do not match.");return}await A(a.querySelector("button[type=submit]"),async()=>{try{await h.post("/api/me/password",{current:s.get("current"),next:s.get("next")}),$(t("acc.passwordChanged")),a.reset()}catch(n){y(n)}})});g("2fa-setup",async()=>{try{let e=await h.get("/api/me/2fa");ie({title:t("acc.2faEnable"),body:r`
        <div data-2fa-setup>
          <p class="muted small">${t("acc.2faScan")}</p>
          <div class="center mt-s" data-qr></div>
          <p class="hint t-center mono" data-key>${e.secret||""}</p>
          <div class="btn-group mt-s" data-methods>
            <button type="button" class="btn active" data-mm="totp">${t("auth.2faTotp")}</button>
            <button type="button" class="btn" data-mm="sms" ${e.hasPhone?"":"disabled"}>${t("auth.2faSms")}</button>
            <button type="button" class="btn" data-mm="email" ${e.hasEmail?"":"disabled"}>${t("auth.2faEmail")}</button>
          </div>
          <form data-act="2fa-enable" class="mt">
            ${x({label:t("acc.2faEnterCode"),name:"code",attrs:'inputmode="numeric" maxlength="6"'})}
            <button class="btn btn-primary btn-block" type="submit">${t("common.confirm")}</button>
          </form>
        </div>`,onMount:async a=>{try{let n=(await bl())(0,"M");n.addData(e.otpauth),n.make();let o=a.querySelector("[data-qr]"),i=n.createSvgTag({cellSize:4,margin:2});o.innerHTML=i;let l=o.querySelector("svg");l&&(l.setAttribute("width","180"),l.setAttribute("height","180"),l.classList.add("qr-img"))}catch{a.querySelector("[data-qr]").innerHTML=r`<code class="tag mono">${e.otpauth}</code>`}a.querySelector("[data-methods]").addEventListener("click",s=>{let n=s.target.closest("[data-mm]");n&&(a.querySelectorAll("[data-mm]").forEach(o=>o.classList.toggle("active",o===n)),a.querySelector("[name=code]").closest(".field").hidden=n.dataset.mm!=="totp")})}})}catch(e){y(e)}});g("2fa-enable",async(e,a)=>{let s=a.closest("[data-2fa-setup]").querySelector("[data-mm].active")?.dataset.mm||"totp",n=new FormData(a).get("code")||"";await A(a.querySelector("button[type=submit]"),async()=>{try{let o=await h.post("/api/me/2fa/enable",{method:s,code:n});await Ye(),$(t("acc.2faEnabled")),o.backupCodes?.length&&ie({title:t("acc.2faBackup"),size:"sm",body:r`<p class="hint">${t("acc.2faBackupHint")}</p><div class="row row-wrap mt-s">${o.backupCodes.map(i=>r`<code class="tag mono b">${i}</code>`)}</div>`}),T(!0)}catch(o){y(o)}})});g("2fa-disable",async()=>{let e=await ot({title:t("acc.2faDisable"),label:t("common.password"),type:"password",required:!0});if(e!==null)try{await h.post("/api/me/2fa/disable",{password:e}),await Ye(),$(t("acc.2faDisabled")),T(!0)}catch(a){y(a)}});g("sessions-revoke",async()=>{if(await ge({text:t("acc.revokeAll"),danger:!0}))try{await h.post("/api/me/sessions/revoke",{allOthers:!0}),$(t("acc.revokeDone")),T(!0)}catch(a){y(a)}});g("session-revoke",async(e,a)=>{try{await h.post("/api/me/sessions/revoke",{id:a.dataset.id}),$(t("acc.revokeDone")),T(!0)}catch(s){y(s)}});g("notif-prefs",async(e,a)=>{e.preventDefault();let s=new FormData(a);try{let n=await h.patch("/api/me",{notificationsPrefs:{marketing:s.get("marketing")==="on",orders:s.get("orders")==="on",restock:s.get("restock")==="on",support:s.get("support")==="on"}});d.me=n.me,$(t("misc.saved"))}catch(n){y(n)}});g("data-export",async(e,a)=>{await A(a,async()=>{try{let s=await kn(),n=new Blob([JSON.stringify(s,null,2)],{type:"application/json"}),o=URL.createObjectURL(n),i=document.createElement("a");i.href=o,i.download=`bander-mobile-data-${new Date().toISOString().slice(0,10)}.json`,i.click(),setTimeout(()=>URL.revokeObjectURL(o),4e3),$(t("common.download"))}catch(s){y(s)}})});g("data-delete",async()=>{if(!await ge({title:t("acc.deleteAccount"),text:t("acc.deleteWarn"),danger:!0,okText:t("common.delete")}))return;let a=await ot({title:t("acc.deleteConfirm"),label:t("common.password"),type:"password",required:!0});if(a!==null)try{await h.post("/api/me/delete",{password:a}),d.me=null,de("#/"),T()}catch(s){y(s)}});vl=e=>t("acc.title")});var sr={};G(sr,{mount:()=>Sl,render:()=>kl});async function kl(e){let a=e.params.id,s=null;try{s=await h.get(`/api/me/orders/${a}`)}catch(i){return i?.status===404?P({icon:"package-check",title:t("acc.noOrders"),action:{href:"#/account/orders",label:t("acc.orders")}}):F({title:t("err.generic")})}let n=s.order,o=new Set(s.canReviewIds||[]);return r`
    <div class="breadcrumb mb-s">
      <a href="#/account">${t("acc.title")}</a> <span>/</span>
      <a href="#/account/orders">${t("acc.orders")}</a> <span>/</span>
      <span class="mono">${n.code}</span>
    </div>

    <div class="cart-grid">
      <div class="col">
        <div class="card">
          <div class="row row-between row-wrap">
            <div>
              <div class="row row-wrap"><h1 class="buy-title">${c("package-check")} ${n.code}</h1>${bt(n.status)}</div>
              <p class="muted small mt-s">${H(n.createdAt)} · ${p(n.statusInfo?.fa||n.statusInfo?.label||"")}</p>
            </div>
            <div class="row row-wrap">
              <button class="btn btn-ghost btn-sm" data-act="od-invoice" data-id="${n.id}">${c("printer")} ${t("acc.printInvoice")}</button>
              ${n.payment?.status==="unpaid"?r`<a class="btn btn-primary btn-sm" href="#/pay/${n.id}">${c("card")} ${t("common.payable")} ${C(n.payable)}</a>`:""}
              ${["pending_review","pending_payment","confirmed","preparing"].includes(n.status)?r`<button class="btn btn-danger btn-sm" data-act="od-cancel" data-id="${n.id}">${c("close")} ${t("acc.cancelOrder")}</button>`:""}
            ${n.tracking?r`<span class="row gap-s"><span class="badge-pill bp-info mono">${c("truck")} ${p(n.tracking)}</span><button class="btn btn-ghost btn-xs" data-act="copy" data-text="${p(n.tracking)}">${c("copy")} ${t("common.copy")}</button></span>`:""}
            </div>
          </div>
          ${n.statusInfo?.fa&&w()===!1&&n.statusInfo?.en?r`<p class="muted small">${p(n.statusInfo.en)}</p>`:""}
        </div>

        <div class="card mt">
          <strong>${c("history")} ${t("acc.timeline")}</strong>
          ${Gt(n)}
        </div>

        <div class="card mt">
          <strong>${c("box")} ${t("acc.orderItems")} (${b(n.items?.length||0)})</strong>
          ${re([{label:""},{label:t("common.product")},{label:t("common.price"),cls:"num"},{label:t("common.count"),cls:"num"},{label:t("common.total"),cls:"num"},{label:""}],(n.items||[]).map(i=>r`
              <tr>
                <td><span class="cl-img" data-h="52px" data-w="52px">${i.image?r`<img src="${i.image}" alt="${p(w()?i.name:i.nameEn||i.name)}" loading="lazy">`:c("box")}</span></td>
                <td>
                  <a class="b" href="#/product/${i.productId}">${p(w()?i.name:i.nameEn||i.name)}</a>
                  ${i.brand?r`<div class="tiny muted">${p(i.brand)}</div>`:""}
                  ${i.sku?r`<div class="tiny muted mono">SKU ${p(i.sku)}</div>`:""}
                </td>
                <td class="num">${C(i.price)}</td>
                <td class="num">${b(i.qty)}</td>
                <td class="num b">${C(i.price*i.qty)}</td>
                <td>${o.has(i.productId)?r`<button class="btn btn-ghost btn-xs" data-act="od-review" data-id="${i.productId}" data-name="${p(w()?i.name:i.nameEn||i.name)}">${c("star")} ${t("pdp.writeReview")}</button>`:""}</td>
              </tr>`))}
          <div class="row row-wrap mt">
            <button class="btn btn-ghost btn-sm" data-act="od-reorder" data-id="${n.id}">${c("cart")} ${t("acc.reorder")}</button>
            <a class="btn btn-ghost btn-sm" href="#/account/tickets">${c("ticket")} ${t("acc.chatOpenTicket")}</a>
          </div>
        </div>
      </div>

      <aside class="col">
        <div class="card summary">
          <strong>${t("cart.summary")}</strong>
          <div class="sum-row"><span>${t("common.subtotal")}</span><span class="v">${C(n.subtotal)}</span></div>
          ${n.plusDiscount>0?r`<div class="sum-row discount"><span>${t("acc.plus")}</span><span class="v">−${C(n.plusDiscount)}</span></div>`:""}
          ${n.couponDiscount>0?r`<div class="sum-row discount"><span>${t("common.discountCode")}: ${n.couponCode}</span><span class="v">−${C(n.couponDiscount)}</span></div>`:""}
          <div class="sum-row"><span>${t("common.shipping")}${n.shippingLabel?r` <span class="muted tiny">(${p(n.shippingLabel)})</span>`:""}</span><span class="v">${n.shipping===0?t("common.free"):C(n.shipping)}</span></div>
          ${n.insured?r`<div class="sum-row"><span>${t("common.insurance")}</span><span class="v">${n.insuranceFee===0?t("common.free"):C(n.insuranceFee)}</span></div>`:""}
          <div class="sum-row"><span>${t("common.total")}</span><span class="v">${C(n.total)}</span></div>
          ${n.walletUsed>0?r`<div class="sum-row discount"><span>${t("common.wallet")}</span><span class="v">−${C(n.walletUsed)}</span></div>`:""}
          <div class="sum-row total"><span>${t("common.payable")}</span><span class="v">${C(n.payable)}</span></div>
          <div class="row row-between mt-s">
            <span class="muted small">${t("common.payment")}</span>
            ${Rt(n.payment)}
          </div>
          ${n.payment?.ref?r`<p class="hint mono mt-s">${p(n.payment.ref)}</p>`:""}
          ${n.refund?r`<p class="notice notice-success mt-s">${c("wallet")}<span>${C(n.refund.amount)} ${t("acc.tx.refund")} — ${H(n.refund.at)}</span></p>`:""}
        </div>

        <div class="card mt">
          <strong>${c("truck")} ${t(n.delivery==="pickup"?"checkout.pickup":"checkout.courier")}</strong>
          ${n.delivery==="pickup"?r`
            <p class="muted small mt-s">${t("checkout.pickupDesc")}</p>
            <p class="mt-s small">${p(d.settings?.store?.address||"")}</p>`:r`
            ${n.address?r`
              <p class="small mt-s"><strong>${p(n.address.receiver||"")}</strong> · ${ne(n.address.phone||"")}</p>
              <p class="muted small">${p(n.address.street||"")}${n.address.city?`\u060C ${p(n.address.city)}`:""}</p>
              ${n.address.postal?r`<p class="muted small">${t("common.postal")}: ${p(n.address.postal)}</p>`:""}`:r`<p class="muted small mt-s">${t("acc.noAddress")}</p>`}
            ${n.zone?r`<p class="small mt-s">${t("checkout.zone")}: ${p(wl(n.zone))}</p>`:""}`}
          ${n.express?r`<p class="small mt-s"><span class="badge-pill bp-accent">${c("zap")} ${t("checkout.express")}</span></p>`:""}
          ${n.insured?r`<p class="small mt-s"><span class="badge-pill bp-success">${c("shield")} ${t("common.insurance")} ${C(n.insuranceFee)}</span></p>`:""}
          ${n.note?r`<p class="hint mt-s">${c("edit")} ${p(n.note)}</p>`:""}
          ${n.couponCode?r`<p class="hint mt-s">${c("percent")} ${n.couponCode}</p>`:""}
        </div>
      </aside>
    </div>`}function Sl(e,a){return L(e),null}var wl,nr=O(()=>{B();W();Q();_();ce();X();le();ee();_();wl=e=>{let a=(pt().zones||[]).find(s=>s.id===e);return a?w()?a.name:a.nameEn||a.name:e||""};g("od-cancel",async(e,a)=>{let s=await ot({title:t("acc.cancelOrder"),text:t("acc.cancelReason"),label:t("acc.cancelReason"),rows:3,okText:t("acc.cancelOrder")});if(s!==null)try{await h.post(`/api/me/orders/${a.dataset.id}/cancel`,{reason:s||""}),$(t("acc.orderCancelled")),T(!0)}catch(n){y(n)}});g("od-reorder",async(e,a)=>{await A(a,async()=>{try{let{order:s}=await h.get(`/api/me/orders/${a.dataset.id}`),n=0;for(let o of s.items||[])try{await h.post("/api/cart/add",{productId:o.productId,qty:o.qty||1}),n+=1}catch{}if(await Te(),!n){y({code:"out_of_stock",message:w()?"\u0647\u06CC\u0686\u200C\u06A9\u062F\u0627\u0645 \u0627\u0632 \u0627\u0642\u0644\u0627\u0645 \u062F\u0631 \u0627\u0646\u0628\u0627\u0631 \u0646\u06CC\u0633\u062A.":"None of the items are in stock."});return}$(t("card.added")),de("#/cart")}catch(s){y(s)}})});g("od-invoice",async(e,a)=>{let{order:s}=await h.get(`/api/me/orders/${a.dataset.id}`),n=d.settings?.store||{};ie({title:t("acc.invoice"),body:r`
      <div class="invoice-print" dir="rtl">
        <div class="inv-head">
          <div>
            <strong>${p(n.name||"Green Apple")}</strong>
            <div class="tiny">${p(n.address||"")}</div>
            <div class="tiny">${ne(n.phone||"")}</div>
          </div>
          <div class="t-center">
            <div class="inv-code mono">${s.code}</div>
            <div class="tiny">${H(s.createdAt)}</div>
          </div>
        </div>
        <table class="inv-table">
          <thead><tr><th>#</th><th>کالا</th><th>تعداد</th><th>فی</th><th>مبلغ</th></tr></thead>
          <tbody>
            ${(s.items||[]).map((o,i)=>r`<tr>
              <td>${b(i+1)}</td><td>${p(o.name)}${o.sku?` <span class="mono tiny">(${o.sku})</span>`:""}</td>
              <td>${b(o.qty)}</td><td>${b(o.price)}</td><td>${b(o.price*o.qty)}</td>
            </tr>`)}
          </tbody>
        </table>
        <div class="inv-sum">
          <div><span>جمع کالاها</span><span>${b(s.subtotal)}</span></div>
          ${s.discount?r`<div><span>تخفیف</span><span>- ${b(s.discount)}</span></div>`:""}
          <div><span>هزینهٔ ارسال${s.shippingLabel?` (${s.shippingLabel})`:""}</span><span>${b(s.shipping)}</span></div>
          ${s.insuranceFee?r`<div><span>بیمهٔ ارسال</span><span>${b(s.insuranceFee)}</span></div>`:""}
          <div class="b"><span>مبلغ کل</span><span>${b(s.total)}</span></div>
          ${s.walletUsed?r`<div><span>پرداخت از کیف پول</span><span>- ${b(s.walletUsed)}</span></div>`:""}
          <div class="b"><span>قابل پرداخت</span><span>${b(s.payable)}</span></div>
        </div>
        <div class="inv-foot tiny">
          <div>وضعیت پرداخت: ${s.payment?.status==="paid"?"\u067E\u0631\u062F\u0627\u062E\u062A\u200C\u0634\u062F\u0647":s.payment?.status==="pending"?"\u062F\u0631 \u0627\u0646\u062A\u0638\u0627\u0631":"\u067E\u0631\u062F\u0627\u062E\u062A\u200C\u0646\u0634\u062F\u0647"} — روش: ${s.payment?.method||"\u2014"}</div>
          <div>${p(n.name||"")} · این فاکتور به‌صورت خودکار توسط سامانه صادر شده است.</div>
        </div>
      </div>
      <div class="row mt">
        <button class="btn btn-primary" data-act="print-page">${c("printer")} ${t("common.print")}</button>
      </div>`})});g("od-review",(e,a)=>{let s=a.dataset.id,n=a.dataset.name||"",o=ie({title:`${t("pdp.writeReview")} \u2014 ${n}`,body:r`
      <form data-act="od-review-send" data-id="${s}">
        <div class="field"><span class="label">${t("pdp.yourRating")}</span>${ts({name:"rating",value:5})}</div>
        ${x({label:t("common.title"),name:"title",required:!0})}
        ${Y({label:t("common.body"),name:"body",required:!0,rows:5})}
        <p class="hint mb">${t("pdp.reviewPending")}</p>
        <button class="btn btn-primary btn-block" type="submit">${t("common.submit")}</button>
      </form>`})});g("od-review-send",async(e,a)=>{e.preventDefault();let s=new FormData(a);await A(a.querySelector("button[type=submit]"),async()=>{try{await h.post("/api/reviews",{productId:a.dataset.id,type:"review",rating:Number(s.get("rating")||5),title:s.get("title"),body:s.get("body")}),$(t("pdp.reviewSubmitted")),a.closest(".overlay")?.remove()}catch(n){y(n)}})})});var rr={};G(rr,{mount:()=>Tl,render:()=>ql});async function ql(e){let a=null;try{a=(await h.get(`/api/tickets/${e.params.id}`)).ticket}catch(o){return o?.status===404?P({icon:"ticket",title:t("acc.noTickets"),action:{href:"#/account/tickets",label:t("acc.tickets")}}):F({title:t("err.generic")})}Bt=[];let s=(d.ticketPriorities||[]).find(o=>o.id===a.priority)?.slaHours||24,n=a.status==="closed";return r`
    <div class="breadcrumb mb-s">
      <a href="#/account">${t("acc.title")}</a> <span>/</span>
      <a href="#/account/tickets">${t("acc.tickets")}</a> <span>/</span>
      <span class="mono">${a.code}</span>
    </div>

    <div class="card">
      <div class="row row-between row-wrap">
        <div>
          <h1 class="buy-title">${c("ticket")} ${p(a.subject)}</h1>
          <p class="muted small mt-s">
            <span class="mono">${a.code}</span> · ${H(a.createdAt)} ·
            ${t("acc.ticketCategory")}: ${t(`tc.${a.category}`)}
          </p>
        </div>
        <div class="row row-wrap">
          <span class="badge-pill ${xl[a.status]||"bp-muted"}">${t(`tk.${a.status}`)}</span>
          <span class="badge-pill ${El[a.priority]||"bp-info"}">${t(`tp.${a.priority}`)}</span>
          ${n?"":r`<button class="btn btn-ghost btn-sm" data-act="tk-close" data-id="${a.id}">${c("check")} ${t("acc.ticketClose")}</button>`}
        </div>
      </div>
      <p class="notice notice-info mt-s">${c("clock")}<span>${t("acc.ticketSla",{h:b(s)})}</span></p>
    </div>

    <div class="card mt">
      <strong>${c("chat")} ${t("common.messages")} (${b(a.messages?.length||0)})</strong>
      <div class="tk-thread mt-s" data-tk-thread>
        ${(a.messages||[]).map(or).join("")}
      </div>

      ${n?r`<p class="notice notice-warn mt">${c("info")}<span>${t("acc.ticketClosedNote")}</span></p>`:""}
      <form class="mt" data-act="tk-reply" data-id="${a.id}">
        ${Y({label:t("acc.ticketWrite"),name:"body",required:!0,rows:4,placeholder:t("acc.chatPlaceholder")})}
        <div data-attach-preview class="row row-wrap mt-s"></div>
        <div class="row row-between row-wrap mt-s">
          <div class="row row-wrap">
            <label class="btn btn-ghost btn-sm" for="tk-file">${c("upload")} ${t("common.attach")}</label>
            <input id="tk-file" type="file" accept="image/*" multiple hidden data-attach-input>
            <span class="hint">${t("acc.attachHint")}</span>
          </div>
          <button class="btn btn-primary" type="submit">${c("send")} ${t("common.send")}</button>
        </div>
      </form>
    </div>`}function or(e){let a=e.from==="user",s=e.from==="system"?"them sys":a?"me":"them";return r`
    <div class="msg ${s}">
      <div class="msg-bubble">
        <div class="row row-between">
          <strong class="tiny">${p(a?d.me?.name||t("common.user"):e.from==="staff"?t("common.support"):e.name||"")}</strong>
          <span class="tiny muted nowrap">${fe(e.at)}</span>
        </div>
        <div class="msg-text">${p(e.body||"").replace(/\n/g,"<br>")}</div>
        ${(e.attachments||[]).length?r`<div class="row row-wrap mt-s">${e.attachments.map(n=>r`<img class="tk-att" src="${n}" alt="${t("common.image")}" loading="lazy" data-act="tk-att-open" data-url="${n}">`)}</div>`:""}
      </div>
    </div>`}function En(e){let a=e.querySelector("[data-attach-preview]");a&&(a.innerHTML=Bt.map((s,n)=>r`
    <span class="att-chip">
      <img src="${s.url}" alt="${p(s.name)}">
      <button type="button" class="att-x" data-act="tk-att-del" data-i="${n}" aria-label="${t("common.delete")}">${c("close")}</button>
    </span>`).join(""))}function Tl(e,a){L(e);let s=e.querySelector("[data-attach-input]");s&&s.addEventListener("change",o=>{ir("tk-attach-pick")?.(o,o.target)});let n=e.querySelector("[data-tk-thread]");return n&&(n.scrollTop=n.scrollHeight),null}var xl,El,Bt,cr=O(()=>{B();W();Q();_();ce();X();le();ee();xl={open:"bp-warn",answered:"bp-success",closed:"bp-muted",in_progress:"bp-info",new:"bp-info"},El={critical:"bp-danger",high:"bp-warn",normal:"bp-info",low:"bp-muted"},Bt=[];g("tk-att-open",(e,a)=>{let n=[...document.querySelectorAll("[data-tk-thread] .tk-att")].map(o=>o.getAttribute("src"));Mt(n.length?n:[a.getAttribute("src")],Math.max(0,n.indexOf(a.getAttribute("src"))))});g("tk-attach-pick",async(e,a)=>{let s=a.closest("form"),n=[...a.files||[]].slice(0,4-Bt.length);a.value="";for(let o of n){if(o.size>4*1024*1024){j(t("err.tooLarge"));continue}try{let i=await At(o),l=await h.upload(i);Bt.push({url:l.url,name:o.name})}catch(i){y(i)}}En(s)});g("tk-att-del",(e,a)=>{Bt.splice(Number(a.dataset.i),1),En(a.closest("form"))});g("tk-reply",async(e,a)=>{e.preventDefault();let s=String(new FormData(a).get("body")||"").trim();if(s.length<2){j(t("acc.ticketBodyShort"));return}let n=a.querySelector("button[type=submit]");await A(n,async()=>{try{let o=await h.post(`/api/tickets/${a.dataset.id}/messages`,{body:s,attachments:Bt.map(l=>l.url)});Bt=[];let i=a.closest(".card").querySelector("[data-tk-thread]");i&&(i.innerHTML=(o.ticket?.messages||[]).map(or).join(""),i.scrollTop=i.scrollHeight),a.reset(),En(a),$(t("common.sent")),ut(!0)}catch(o){y(o)}})});g("tk-close",async(e,a)=>{await ge({text:t("acc.ticketCloseConfirm"),okText:t("acc.ticketClose")})&&await A(a,async()=>{try{await h.post(`/api/tickets/${a.dataset.id}/close`,{}),$(t("common.done")),T(!0)}catch(n){y(n)}})})});var lr={};G(lr,{render:()=>Cl});async function Cl(){let e=null;try{e=await h.get("/api/stats/public")}catch{}if(!e)return r`<div class="empty"><h4>${t("err.network")}</h4></div>`;let a=e.stats||{},s=e.chart||[],n=e.topProducts||[],o=Math.max(1,...s.map(l=>l.visits)),i=s.map(l=>{let m=Math.min(12,Math.max(1,Math.round(l.visits/o*12)));return r`<div class="ch-col" title="${l.date}: ${Xe(l.visits)}">
      <i class="hb-${m}"></i>
      <span>${Xe(Number(l.date.slice(8,10)))}</span>
    </div>`}).join("");return r`
    <div class="page-head">
      <h1 class="page-h1">${c("chart")} ${t("stats.title")}</h1>
      <p class="muted small">${t("stats.subtitle")}</p>
    </div>

    <section class="section">
      <div class="stats-grid">
        ${xe({icon:"box",label:t("stats.products"),value:b(a.products)})}
        ${xe({icon:"grid",label:t("stats.categories"),value:b(a.categories)})}
        ${xe({icon:"cart",label:t("stats.ordersTotal"),value:b(a.ordersTotal)})}
        ${xe({icon:"package-check",label:t("stats.delivered"),value:b(a.deliveredOrders)})}
        ${xe({icon:"users",label:t("stats.customers"),value:b(a.customers)})}
        ${xe({icon:"eye",label:t("stats.visitsTotal"),value:b(a.visitsTotal)})}
        ${xe({icon:"chart",label:t("stats.visitsToday"),value:b(a.visitsToday)})}
        ${xe({icon:"sparkles",label:t("stats.plusMembers"),value:b(a.plusMembers)})}
      </div>
    </section>

    <section class="section">
      ${Ae({titleIcon:"chart",title:t("stats.chartTitle")})}
      <div class="card chart-card">
        <div class="chart">${i}</div>
        <p class="hint mt-s">${t("stats.chartHint")}</p>
      </div>
    </section>

    ${n?.length?r`
    <section class="section">
      ${Ae({titleIcon:"star",title:t("stats.topTitle")})}
      <div class="list">
        ${n.map((l,m)=>r`
          <a class="list-row" href="#/product/${l.id}">
            <span class="rank">${Xe(m+1)}</span>
            <span class="grow">
              <span class="b">${w()?l.name:l.nameEn||l.name}</span>
              <span class="muted tiny">${w()?l.categoryName:l.categoryNameEn||l.categoryName}</span>
            </span>
            <span class="muted small">${c("eye")} ${Xe(l.sold||0)}</span>
          </a>`)}
      </div>
    </section>`:""}
  `}var dr=O(()=>{B();W();_();Q();ce()});var pr={};G(pr,{mount:()=>Bl,render:()=>Al,title:()=>Fl});function aa(e,a=""){return e?.hero?r`
    <div class="page-hero mb">
      <h1 class="page-title">${p(it(e.hero,"title"))}</h1>
      ${it(e.hero,"subtitle")?r`<p class="page-sub">${p(it(e.hero,"subtitle"))}</p>`:""}
      ${a}
    </div>`:""}function qn(e){return e?.length?e.map(a=>r`
    <div class="card mt">
      <h2 class="page-h2">${p(it(a,"title"))}</h2>
      ${a.body||a.bodyEn?r`<div class="page-body"><p>${p(it(a,"body"))}</p></div>`:""}
      ${ta(ea(a,"list").length?ea(a,"list"):a.list||[])}
    </div>`).join(""):""}async function Al(e){let a=String(e.params.key||""),s=null;try{s=await h.get(`/api/pages/${a}`)}catch{}if(!s?.page)return P({icon:"file",title:t("err.notFound"),text:t("err.notFoundText"),action:{href:"#/",label:t("err.goHome")}});let n=s.page;if(Array.isArray(n))return Hl(n);switch(a){case"about":return Dl(n);case"guide":return Ml(n);case"service":return Ll(n);case"contact":return Rl(n);case"bugReport":return Il(n);default:return Nl(n)}}async function Dl(e){let a=null;if(I("publicStats"))try{a=(await h.get("/api/stats/public")).stats}catch{}return r`
    ${aa(e)}
    ${a&&e.stats?.length?r`
      <div class="section-head"><div><h2 class="section-title">${c("chart")} ${t("page.statsTitle")}</h2></div></div>
      <div class="stats-grid">
        ${e.stats.map(s=>xe({icon:Pl(s.key),label:w()?s.fa:s.en||s.fa,value:b(Number(a[s.key]||0))}))}
      </div>`:""}
    ${qn(e.sections)}
    <div class="card mt t-center">
      <strong>${c("heart")} ${t("page.aboutCta")}</strong>
      <div class="row center row-wrap mt-s">
        <a class="btn btn-primary" href="#/products">${c("cart")} ${t("cart.goShopping")}</a>
        <a class="btn btn-ghost" href="#/pages/contact">${c("phone")} ${t("contact.title")}</a>
        <a class="btn btn-ghost" href="#/pages/guide">${c("file")} ${t("footer.guide")}</a>
      </div>
    </div>`}function Pl(e){return{years:"clock",products:"box",orders:"package-check",customers:"users",visits:"eye"}[e]||"chart"}function Ml(e){return r`
    ${aa(e)}
    ${e.steps?.length?r`
      <div class="section-head"><div><h2 class="section-title">${c("list")} ${t("page.stepsTitle")}</h2></div></div>
      <ol class="steps-list">
        ${e.steps.map(a=>r`
          <li class="card step-item">
            <div class="grow">
              <strong>${p(it(a,"title"))}</strong>
              <p class="muted small mt-s">${p(it(a,"body"))}</p>
              ${ta(ea(a,"list").length?ea(a,"list"):a.list||[])}
            </div>
          </li>`)}
      </ol>`:""}
    ${e.tips?.length?r`
      <div class="card mt">
        <h2 class="page-h2">${c("zap")} ${t("page.tipsTitle")}</h2>
        ${ta((w(),e.tips).map(a=>w()?a.fa:a.en||a.fa))}
      </div>`:""}
    <div class="row row-wrap mt">
      <a class="btn btn-primary" href="#/products">${t("cart.goShopping")}</a>
      <a class="btn btn-ghost" href="#/pages/faq">${c("info")} ${t("footer.faq")}</a>
    </div>`}function Ll(e){return r`
    ${aa(e)}
    <div class="pwa-grid">
      ${(e.items||[]).map(a=>r`
        <div class="pwa-card">
          <span class="pwa-ic">${c(a.icon||"check")}</span>
          <div>
            <strong>${p(it(a,"title"))}</strong>
            <p class="muted small mt-s">${p(it(a,"body"))}</p>
            ${ta(ea(a,"list").length?ea(a,"list"):a.list||[])}
          </div>
        </div>`)}
    </div>
    ${qn(e.sections)}`}function Nl(e){return r`
    ${aa(e)}
    ${e.intro||e.introEn?r`<p class="page-lead">${p(w()?e.intro:e.introEn||e.intro)}</p>`:""}
    ${e.body||e.bodyEn?r`<div class="card"><div class="page-body"><p>${p(w()?e.body:e.bodyEn||e.body)}</p></div></div>`:""}
    ${e.rules?.length||e.rulesEn?.length?r`
      <div class="card mt">
        <h2 class="page-h2">${c("check")} ${t("page.rulesTitle")}</h2>
        ${ta(w()?e.rules:e.rulesEn||e.rules)}
      </div>`:""}
    ${qn(e.sections)}
    ${e.notice||e.noticeEn?r`<p class="notice notice-warn mt">${c("info")}<span>${p(w()?e.notice:e.noticeEn||e.notice)}</span></p>`:""}
    <div class="row row-wrap mt">
      <a class="btn btn-ghost" href="#/pages/terms">${c("file")} ${t("footer.terms")}</a>
      <a class="btn btn-ghost" href="#/pages/privacy">${c("shield")} ${t("footer.privacy")}</a>
      <a class="btn btn-ghost" href="#/pages/insurance">${c("truck")} ${t("footer.insurance")}</a>
      <a class="btn btn-ghost" href="#/pages/ticketRules">${c("ticket")} ${t("acc.ticketViewRules")}</a>
    </div>
    ${(e.id==="terms"||e.id==="privacy")&&!hasConsent()?r`
      <div class="card mt bg-shade">
        <p class="mb-s b">${w()?"\u0622\u06CC\u0627 \u0642\u0648\u0627\u0646\u06CC\u0646 \u0631\u0627 \u0645\u0637\u0627\u0644\u0639\u0647 \u06A9\u0631\u062F\u06CC\u062F\u061F":"Have you read the terms?"}</p>
        <button type="button" class="btn btn-primary" data-act="accept-consent-now">${c("check")} ${t("consent.accept")}</button>
      </div>
    `:""}
    `}function Il(e){return r`
    ${aa(e)}
    ${e.body||e.bodyEn?r`<p class="page-lead">${p(w()?e.body:e.bodyEn||e.body)}</p>`:""}
    ${e.hints?.length?r`
      <div class="card">
        <h2 class="page-h2">${c("info")} ${t("page.hintsTitle")}</h2>
        ${ta(w()?e.hints:e.hintsEn||e.hints)}
      </div>`:""}
    <form class="card mt" data-act="page-feedback">
      <input type="hidden" name="type" value="bug">
      <h2 class="page-h2">${c("bug")} ${t("page.bugTitle")}</h2>
      ${x({label:t("common.title"),name:"title",required:!0})}
      ${Y({label:t("common.body"),name:"body",required:!0,rows:6})}
      ${x({label:t("acc.feedbackContact"),name:"contact",hint:t("acc.feedbackContactHint"),value:d.me?.phone||d.me?.email||""})}
      <button class="btn btn-primary" type="submit">${c("send")} ${t("common.submit")}</button>
    </form>`}function Rl(e){let a=_e(),s=a.socials||{},n=[{key:"instagram",icon:"camera",url:We(s.instagram)},{key:"telegram",icon:"send",url:We(s.telegram)},{key:"eitaa",icon:"message",url:We(s.eitaa)},{key:"whatsapp",icon:"chat",url:a.whatsapp?`https://wa.me/${String(a.whatsapp).replace(/\D/g,"")}`:""}].filter(o=>o.url);return r`
    ${aa(e)}
    <div class="acc-grid">
      <div class="col">
        <div class="card">
          <h2 class="page-h2">${c("pin")} ${t("contact.addressUs")}</h2>
          <p class="page-body">${p(w()?a.address:a.addressEn||a.address)}</p>
          <div class="row row-wrap mt-s">
            <button class="btn btn-ghost btn-sm" data-act="copy" data-text="${p(w()?a.address:a.addressEn||a.address)}">${c("copy")} ${t("contact.copyAddress")}</button>
            ${a.phone?r`<a class="btn btn-primary btn-sm" href="tel:${a.phone}">${c("phone")} ${t("contact.callNow")}</a>`:""}
            ${a.email?r`<a class="btn btn-ghost btn-sm" href="mailto:${a.email}">${c("mail")} ${t("contact.emailUs")}</a>`:""}
          </div>
          <div class="contact-list mt">
            ${a.phone?r`<div class="row"><span class="muted small">${t("contact.phone")}</span><a class="mono" href="tel:${a.phone}">${ne(a.phone)}</a></div>`:""}
            ${a.phone2?r`<div class="row"><span class="muted small">${t("contact.mobile")}</span><a class="mono" href="tel:${a.phone2}">${ne(a.phone2)}</a></div>`:""}
            ${a.phone3?r`<div class="row"><span class="muted small">${t("contact.phone3")}</span><a class="mono" href="tel:${a.phone3}">${ne(a.phone3)}</a></div>`:""}
            ${a.whatsapp?r`<div class="row"><span class="muted small">${t("contact.whatsapp")}</span><span class="mono">${ne(a.whatsapp)}</span></div>`:""}
            ${a.email?r`<div class="row"><span class="muted small">${t("common.email")}</span><span class="mono small">${p(a.email)}</span></div>`:""}
          </div>
          ${n.length?r`<div class="row row-wrap mt-s">${n.map(o=>r`<a class="btn btn-ghost btn-sm" href="${p(o.url)}" target="_blank" rel="noopener">${c(o.icon)} ${t("social."+o.key)}</a>`)}</div>`:""}
        </div>

        <div class="card mt">
          <h2 class="page-h2">${c("clock")} ${t("footer.workingHours")}</h2>
          ${(a.workingHours||[]).map(o=>r`
            <div class="row row-between mt-s">
              <span class="small">${p(w()?o.fa||o.day:o.en||o.day)}</span>
              <span class="small b mono">${p(w()?o.time:o.timeEn||o.time)}</span>
            </div>`)}
        </div>

        <form class="card mt" data-act="page-feedback">
          <input type="hidden" name="type" value="suggestion">
          <h2 class="page-h2">${c("chat")} ${t("contact.formTitle")}</h2>
          <p class="muted small mb-s">${t("contact.formText")}</p>
          ${x({label:t("common.title"),name:"title",required:!0})}
          ${Y({label:t("common.message"),name:"body",required:!0,rows:5})}
          ${x({label:t("acc.feedbackContact"),name:"contact",value:d.me?.phone||d.me?.email||""})}
          <button class="btn btn-primary" type="submit">${c("send")} ${t("common.send")}</button>
        </form>
      </div>

      <aside class="col">
        ${We(s.telegram)?r`
        <div class="card">
          <h2 class="page-h2">${c("send")} ${t("contact.tgBotTitle")}</h2>
          <p class="muted small">${t("contact.tgBotText")}</p>
          <a class="btn btn-primary btn-sm mt-s" href="${p(We(s.telegram))}" target="_blank" rel="noopener">${c("send")} ${t("contact.tgBotBtn")}</a>
        </div>`:""}

        <div class="card ${We(s.telegram)?"mt":""}">
          <h2 class="page-h2">${c("map")} ${t("contact.mapTitle")}</h2>
          <div class="minimap" data-act="open-map" role="button" tabindex="0" aria-label="${t("contact.mapTitle")}">
            ${pe(Qt())}
            <span class="minimap-hint">${c("pin")} ${t("contact.mapHint")}</span>
          </div>
          <p class="hint mt-s">${t("contact.mapAsk")}</p>
          <button class="btn btn-outline btn-block mt-s" data-act="open-map">${c("map")} ${t("contact.openMaps")}</button>
        </div>

        ${I("liveSupport")?r`
        <div class="card mt">
          <h2 class="page-h2">${c("headset")} ${t("common.support")}</h2>
          <p class="muted small">${t("acc.chatTitle")}</p>
          <div class="row row-wrap mt-s">
            ${d.me?r`<button class="btn btn-primary btn-sm" data-act="chat-open">${c("headset")} ${t("acc.chatTitle")}</button>`:r`<a class="btn btn-primary btn-sm" href="#/auth">${c("user")} ${t("nav.login")}</a>`}
            ${I("tickets")?r`<a class="btn btn-ghost btn-sm" href="#/account/tickets">${c("ticket")} ${t("common.ticket")}</a>`:""}
          </div>
        </div>`:""}

        <div class="card mt">
          <h2 class="page-h2">${c("info")} ${t("footer.faq")}</h2>
          <p class="muted small">${t("faq.askText")}</p>
          <a class="btn btn-ghost btn-sm mt-s" href="#/pages/faq">${t("footer.faq")}</a>
        </div>
      </aside>
    </div>`}function Hl(e){let a=[...new Set(e.map(s=>s.cat||"other"))];return r`
    <div class="page-hero mb">
      <h1 class="page-title">${c("info")} ${t("footer.faq")}</h1>
      <p class="page-sub">${t("faq.askText")}</p>
    </div>
    <div class="field mb">
      <input class="input" type="search" id="faq-q" placeholder="${t("faq.search")}" data-faq-q autocomplete="off">
    </div>
    <div class="row row-wrap mb" data-faq-cats>
      <button type="button" class="chip active" data-act="faq-cat" data-cat="">${t("faq.all")}</button>
      ${a.map(s=>r`<button type="button" class="chip" data-act="faq-cat" data-cat="${s}">${t(`faq.cat.${s}`)}</button>`)}
    </div>
    <p class="muted small mb-s" data-faq-count>${t("faq.results",{n:b(e.length)})}</p>
    <div class="accordion" data-faq-list>
      ${e.map((s,n)=>r`
        <div class="acc-item" data-cat="${s.cat||"other"}" data-text="${p(((w()?s.q:s.qEn)+" "+(w()?s.a:s.aEn)).toLowerCase())}">
          <button class="acc-h" type="button" aria-expanded="false">
            <span class="b">${p(w()?s.q:s.qEn||s.q)}</span>
            ${c("chevron-down")}
          </button>
          <div class="acc-b" hidden><div class="page-body"><p>${p(w()?s.a:s.aEn||s.a)}</p></div></div>
        </div>`)}
    </div>
    <div class="card mt t-center" data-faq-empty hidden>
      <p class="muted">${t("faq.notFound")}</p>
      <div class="row center row-wrap mt-s">
        ${d.me&&I("liveSupport")?r`<button class="btn btn-primary btn-sm" data-act="chat-open">${c("headset")} ${t("acc.chatTitle")}</button>`:""}
        ${I("tickets")?r`<a class="btn btn-ghost btn-sm" href="#/account/tickets">${c("ticket")} ${t("acc.ticketNew")}</a>`:""}
      </div>
    </div>`}function mr(){let e=document.querySelector("[data-faq-list]");if(!e)return;let a=(document.querySelector("[data-faq-q]")?.value||"").trim().toLowerCase(),s=document.querySelector("[data-faq-cats] .chip.active")?.dataset.cat||"",n=0;e.querySelectorAll(".acc-item").forEach(l=>{let m=!s||l.dataset.cat===s,u=!a||(l.dataset.text||"").includes(a),f=m&&u;l.hidden=!f,f&&(n+=1)});let o=document.querySelector("[data-faq-count]");o&&(o.textContent=t("faq.results",{n:b(n)}));let i=document.querySelector("[data-faq-empty]");i&&(i.hidden=n!==0)}function Bl(e,a){L(e),nn(e);let s=e.querySelector("[data-faq-q]");if(s){let n=0;s.addEventListener("input",()=>{clearTimeout(n),n=setTimeout(mr,160)})}return null}var it,ea,ta,Fl,ur=O(()=>{B();W();Q();_();ce();X();le();it=(e,a)=>w()?e?.[a]??"":e?.[`${a}En`]??e?.[a]??"",ea=(e,a)=>w()?e?.[a]||[]:e?.[`${a}En`]||e?.[a]||[];ta=(e,a="dot-list")=>e?.length?r`<ul class="${a}">${e.map(s=>r`<li>${typeof s=="string"?p(s):p(it(s,"fa")||s.title||"")}</li>`)}</ul>`:"";g("page-feedback",async(e,a)=>{e.preventDefault();let s=new FormData(a);await A(a.querySelector("button[type=submit]"),async()=>{try{await h.post("/api/feedback",{type:s.get("type")||"suggestion",title:s.get("title"),body:s.get("body"),contact:s.get("contact")||""}),$(t("acc.feedbackSent")),a.reset()}catch(n){y(n)}})});g("faq-cat",(e,a)=>{a.closest("[data-faq-cats]").querySelectorAll(".chip").forEach(n=>n.classList.toggle("active",n===a)),mr()});Fl=()=>t("common.page")});var br={};G(br,{mount:()=>Ul,render:()=>Ol});async function Ol(){let e=null;try{e=await h.get("/api/admin/overview")}catch(n){return F({title:n?.message||t("err.generic")})}let a=e.stats||{},s=(e.chart||[]).map(n=>({label:n.date,short:n.date.slice(8),value:n.visits||0}));return V("users.view")&&jl(),r`
    <div class="kpi-grid">
      ${De({label:t("adm.kpi.ordersToday"),value:b(e.today?.orders||0),sub:C(e.today?.revenue||0)})}
      ${De({label:t("adm.kpi.visits"),value:b(e.today?.visits||0),sub:`${t("stats.visitsTotal")}: ${b(a.visitsTotal||0)}`})}
      ${De({label:t("adm.kpi.revenueTotal"),value:C(e.totals?.revenue||0),sub:`${b(e.totals?.orders||0)} ${t("common.orders")}`})}
      ${De({label:t("adm.kpi.pending"),value:b(a.pendingOrders||0),sub:t("adm.awaiting.orders")})}
      ${De({label:t("adm.kpi.products"),value:b(a.products||0),sub:`${b(a.outOfStock||0)} ${t("stats.outOfStock")}`})}
      ${De({label:t("adm.kpi.users"),value:b(a.customers||0),sub:`${b(a.plusMembers||0)} ${t("stats.plusMembers")}`})}
      ${De({label:t("adm.kpi.lowStock"),value:b((e.lowStock||[]).length),sub:t("adm.lowStockList")})}
      ${De({label:t("adm.storage"),value:`${b(e.storage?.sizeKb||0)} KB`,sub:"db.json"})}
    </div>

    <div class="section-head mt"><div><h2 class="section-title">${c("alert")} ${t("adm.awaiting")}</h2></div></div>
    <div class="kpi-grid">
      ${V("reviews.moderate")?Ea("star",t("adm.awaiting.reviews"),e.awaiting?.reviews,"#/admin/reviews"):""}
      ${V("tickets.manage")?Ea("ticket",t("adm.awaiting.tickets"),e.awaiting?.tickets,"#/admin/tickets"):""}
      ${V("orders.view")?Ea("package-check",t("adm.awaiting.orders"),e.awaiting?.orders,"#/admin/orders"):""}
      ${V("feedback.manage")?Ea("flag",t("adm.awaiting.feedback"),e.awaiting?.feedback,"#/admin/feedback"):""}
      ${V("tickets.manage")?Ea("headset",t("adm.awaiting.chat"),e.awaiting?.support,"#/admin/support"):""}
    </div>

    <div class="card mt">
      <strong>${c("chart")} ${t("adm.chart")}</strong>
      ${s.length?Za(s,{height:140}):r`<p class="muted small">${t("common.noData")}</p>`}
    </div>

    <div class="acc-grid acc-grid-eq mt">
      <div class="card">
        <strong>${c("star")} ${t("adm.topSelling")}</strong>
        ${re([{label:""},{label:t("adm.pName")},{label:t("pdp.sold"),cls:"num"},{label:t("common.stock"),cls:"num"},{label:t("common.price"),cls:"num"}],(e.topSelling||[]).map(n=>r`
            <tr>
              <td><span class="cl-img" data-h="42px" data-w="42px">${Nt({...n,images:n.image?[n.image]:[]})}</span></td>
              <td><a class="b" href="#/admin/products/${n.id}">${p((w(),n.name))}</a></td>
              <td class="num">${b(n.sold)}</td>
              <td class="num">${b(n.stock)}</td>
              <td class="num">${C(n.price)}</td>
            </tr>`),{emptyText:t("common.noData")})}
      </div>
      <div class="card">
        <strong>${c("box")} ${t("adm.lowStockList")}</strong>
        ${re([{label:t("adm.pName")},{label:t("common.available"),cls:"num"},{label:""}],(e.lowStock||[]).map(n=>r`
            <tr>
              <td class="nowrap">${p(n.name)}</td>
              <td class="num"><span class="badge-pill ${n.inStock?"bp-warn":"bp-danger"}">${b(Math.max(0,(n.stock||0)-(n.reserved||0)))}</span></td>
              <td><a class="btn btn-ghost btn-xs" href="#/admin/products/${n.id}">${t("common.edit")}</a></td>
            </tr>`),{emptyText:t("common.noData")})}
      </div>
    </div>

    ${V("users.view")||V("settings.edit")?r`
    <div class="acc-grid acc-grid-eq mt">
      ${V("users.view")?r`
      <div class="card" id="secLiveCard">
        <div class="row row-between">
          <strong>${c("shield")} ${t("adm.secTitle")}</strong>
          <span class="badge-pill bp-success tiny" id="secState">…</span>
        </div>
        <div class="kpi-grid mt-s" id="secKpis"></div>
        <div class="mt-s" id="secTop"></div>
        ${V("settings.edit")?r`
        <form class="form-grid mt" id="secForm" data-act="adm-sec-save">
          ${he({label:t("adm.secQueueEnabled"),desc:t("adm.secQueueDesc"),name:"queueEnabled",checked:!0})}
          ${x({label:t("adm.secMaxConc"),name:"maxConcurrent",type:"number",value:"80",attrs:'min="5" max="5000" inputmode="numeric"'})}
          ${x({label:t("adm.secTriggerRps"),name:"triggerRps",type:"number",value:"40",attrs:'min="5" max="2000" inputmode="numeric"'})}
          ${x({label:t("adm.secPassTtl"),name:"passTtlMin",type:"number",value:"30",attrs:'min="5" max="240" inputmode="numeric"'})}
          ${x({label:t("adm.secPoll"),name:"pollSec",type:"number",value:"4",attrs:'min="2" max="20" inputmode="numeric"'})}
          ${x({label:t("adm.secFloodBan"),name:"floodBanPerMin",type:"number",value:"2500",attrs:'min="500" max="100000" inputmode="numeric"'})}
          ${x({label:t("adm.secFloodMin"),name:"floodBanMin",type:"number",value:"15",attrs:'min="1" max="1440" inputmode="numeric"'})}
          <button class="btn btn-primary btn-sm span-2" type="submit">${c("save")} ${t("common.save")}</button>
        </form>`:""}
      </div>`:""}
      ${V("settings.edit")?r`
      <div class="card">
        <strong>${c("terminal")} ${t("adm.console")}</strong>
        <p class="muted small mt-s">${t("adm.consoleHint")}</p>
        <button class="btn btn-danger btn-sm mt-s" data-act="adm-sys-restart">${c("zap")} ${t("adm.sysRestart")}</button>
        <p class="muted small mt">${t("adm.sysResetLabel")}</p>
        <div class="row row-wrap mt-s">
          <button class="btn btn-ghost btn-xs" data-act="adm-sys-reset" data-what="audit">${t("adm.sysReset.audit")}</button>
          <button class="btn btn-ghost btn-xs" data-act="adm-sys-reset" data-what="carts">${t("adm.sysReset.carts")}</button>
          <button class="btn btn-ghost btn-xs" data-act="adm-sys-reset" data-what="visits">${t("adm.sysReset.visits")}</button>
          <button class="btn btn-ghost btn-xs" data-act="adm-sys-reset" data-what="visitors">${t("adm.sysReset.visitors")}</button>
        </div>
      </div>`:""}
    </div>`:""}

    ${V("audit.view")?r`
    <div class="card mt">
      <div class="row row-between">
        <strong>${c("history")} ${t("adm.recentAudit")}</strong>
        <a class="section-link" href="#/admin/audit">${t("common.showAll")}</a>
      </div>
      ${re([{label:t("common.date")},{label:t("adm.auditActor")},{label:t("adm.auditAction")},{label:t("adm.auditTarget")}],(e.recentAudit||[]).map(n=>r`
          <tr>
            <td class="nowrap tiny">${fe(n.at)}</td>
            <td class="tiny">${p(n.actorName||"")} <span class="muted">(${p(n.actorRole||"")})</span></td>
            <td class="mono tiny">${p(n.action||"")}</td>
            <td class="tiny muted">${p(String(n.target||"").slice(0,40))}</td>
          </tr>`),{emptyText:t("common.noData")})}
    </div>`:""}`}function Ea(e,a,s,n){return r`
    <a class="kpi await-card ${s>0?"hot":""}" href="${n}">
      <div class="l">${c(e)} ${a}</div>
      <div class="v">${b(s||0)}</div>
    </a>`}async function Cn(){if(!document.getElementById("secLiveCard")){++Tn>=3&&sa&&(clearInterval(sa),sa=0);return}Tn=0;let a;try{a=await h.get("/api/admin/system/load")}catch{return}let s=document.getElementById("secKpis");s&&(s.innerHTML=[`<div class="kpi"><div class="l">${t("adm.secInflight")}</div><div class="v">${b(a.inflight)}</div></div>`,`<div class="kpi"><div class="l">${t("adm.secRps")}</div><div class="v">${b(a.rps)}</div></div>`,`<div class="kpi"><div class="l">${t("adm.secQueued")}</div><div class="v ${a.queued>0?"hot":""}">${b(a.queued)}</div></div>`,`<div class="kpi"><div class="l">${t("adm.secAutoBans")}</div><div class="v">${b((a.autoBans||[]).length)}</div></div>`].join(""));let n=document.getElementById("secTop");n&&(n.innerHTML=(a.top||[]).length?`<div class="muted tiny">${t("adm.secTop")}</div><div class="table-wrap"><table class="table"><thead><tr><th>IP</th><th class="num">${t("adm.secPerMin")}</th></tr></thead><tbody>${a.top.map(l=>`<tr><td class="mono tiny">${p(l.ip)}</td><td class="num tiny">${b(l.perMin)}</td></tr>`).join("")}</tbody></table></div>`:`<p class="muted tiny">${t("adm.secTopEmpty")}</p>`);let o=document.getElementById("secState");if(o){let l=a.queued>0||a.inflight>(a.sec?.maxConcurrent||80)||a.rps>(a.sec?.triggerRps||40);o.textContent=l?t("adm.secBusy"):t("adm.secNormal"),o.className=`badge-pill tiny ${l?"bp-warn":"bp-success"}`}let i=document.getElementById("secForm");if(i&&!i.dataset.filled){i.dataset.filled="1";for(let m of["maxConcurrent","triggerRps","passTtlMin","pollSec","floodBanPerMin","floodBanMin"]){let u=i.elements[m];u&&a.sec?.[m]!=null&&(u.value=a.sec[m])}let l=i.elements.queueEnabled;l&&(l.checked=!!a.sec?.queueEnabled)}}function jl(){sa&&clearInterval(sa),Tn=0,setTimeout(Cn,400),sa=setInterval(Cn,5e3)}function Ul(){return null}var sa,Tn,hr=O(()=>{B();W();Q();le();_();ce();X();sa=0,Tn=0;g("adm-sec-save",async(e,a)=>{e.preventDefault();let s={queueEnabled:a.elements.queueEnabled?.checked??!0,maxConcurrent:Number(a.elements.maxConcurrent?.value)||80,triggerRps:Number(a.elements.triggerRps?.value)||40,passTtlMin:Number(a.elements.passTtlMin?.value)||30,pollSec:Number(a.elements.pollSec?.value)||4,floodBanPerMin:Number(a.elements.floodBanPerMin?.value)||2500,floodBanMin:Number(a.elements.floodBanMin?.value)||15};await A(a.querySelector("button[type=submit]"),async()=>{try{await h.patch("/api/admin/settings/security",{value:s}),$(t("adm.secSaved"));let n=document.getElementById("secForm");n&&delete n.dataset.filled,Cn()}catch(n){y(n)}})});g("adm-sys-restart",async(e,a)=>{await ge({text:t("adm.sysRestartWarn"),danger:!0})&&await A(a,async()=>{try{await h.post("/api/admin/system/restart",{}),$(t("adm.sysRestarting")),setTimeout(()=>location.reload(),6e3)}catch(n){y(n)}})});g("adm-sys-reset",async(e,a)=>{let s=a.dataset.what;await ge({text:t(`adm.resetWarn.${s}`),danger:!0})&&await A(a,async()=>{try{await h.post("/api/admin/system/reset",{what:s}),$(t("adm.resetDone"))}catch(o){y(o)}})})});var vr={};G(vr,{mount:()=>Yl,render:()=>zl});async function zl(e){let a=e.params.id;if(a==="new")return gr(null);if(a){let s=null;try{s=await h.get(`/api/admin/products/${a}`)}catch(n){return F({title:n?.message||t("err.notFound")})}return gr(s.product)}return Wl()}async function Wl(){let e=null;try{e=await h.get(h.url("/api/admin/products",{q:Ce.q,cat:Ce.cat,brand:Ce.brand,status:Ce.status,page:Ce.page,limit:Ce.limit}))}catch(n){return F({title:n?.message||t("err.generic")})}let a=e.items||[],s=n=>`#/admin/products?page=${n}`;return r`
    <div class="row row-between row-wrap mb">
      <div>
        <h2 class="section-title">${c("box")} ${t("adm.products")}</h2>
        <p class="muted small">${b(e.total||0)} ${t("catalog.count")}</p>
      </div>
      ${V("products.create")?r`<a class="btn btn-primary btn-sm" href="#/admin/products/new">${c("plus")} ${t("adm.productNew")}</a>`:""}
    </div>

    <form class="card mb adm-filter" data-act="adm-p-filter">
      <div class="form-grid">
        <label class="field"><span class="label">${t("common.search")}</span>
          <input class="input" name="q" value="${p(Ce.q)}" placeholder="${t("adm.pName")} / SKU / ${t("pdp.barcode")}">
        </label>
        ${U({label:t("adm.pCat"),name:"cat",value:Ce.cat,options:[{value:"",label:t("common.all")},...d.categories.map(n=>({value:n.id,label:ke(n)}))]})}
        ${U({label:t("adm.pBrand"),name:"brand",value:Ce.brand,options:[{value:"",label:t("common.all")},...d.brands.map(n=>({value:n.id,label:Fe(n)}))]})}
        ${U({label:t("common.status"),name:"status",value:Ce.status,options:[{value:"",label:t("common.all")},{value:"active",label:t("common.active")},{value:"inactive",label:t("common.inactive")},{value:"low",label:t("adm.kpi.lowStock")},{value:"out",label:t("card.outOfStock")}]})}
      </div>
      <div class="row row-wrap mt-s">
        <button class="btn btn-primary btn-sm" type="submit">${c("filter")} ${t("common.apply")}</button>
        <button class="btn btn-ghost btn-sm" type="button" data-act="adm-p-clear">${c("close")} ${t("catalog.f.clear")}</button>
      </div>
    </form>

    ${a.length?re([{label:""},{label:t("adm.pName")},{label:t("adm.pCat")},{label:t("common.price"),cls:"num"},{label:t("common.stock"),cls:"num"},{label:t("pdp.sold"),cls:"num"},{label:t("common.status")},{label:t("common.actions"),cls:"num"}],a.map(n=>r`
        <tr>
          <td><span class="cl-img" data-h="46px" data-w="46px">${Nt(n)}</span></td>
          <td>
            <a class="b" href="#/admin/products/${n.id}">${p(w()?n.name:n.nameEn||n.name)}</a>
            <div class="tiny muted mono">${p(n.sku||"")}${n.barcode?` \xB7 ${p(n.barcode)}`:""}</div>
          </td>
          <td class="tiny">${p(n.categoryName||"")}<div class="tiny muted">${p(n.brandName||"")}</div></td>
          <td class="num">
            ${C(n.price)}
            ${n.oldPrice>n.price?r`<div class="tiny muted"><s>${b(n.oldPrice)}</s> <span class="badge-pill bp-danger">${b(n.discountPct)}٪</span></div>`:""}
          </td>
          <td class="num"><span class="badge-pill ${n.inStock?n.stock<=3?"bp-warn":"bp-success":"bp-danger"}">${b(Math.max(0,(n.stock||0)-(n.reserved||0)))}</span></td>
          <td class="num">${b(n.sold||0)}</td>
          <td>${n.active===!1?r`<span class="badge-pill bp-muted">${t("common.inactive")}</span>`:r`<span class="badge-pill bp-success">${t("common.active")}</span>`}</td>
          <td>
            <div class="act">
              <a class="btn btn-ghost btn-xs" href="#/admin/products/${n.id}">${c("edit")}</a>
              <a class="btn btn-ghost btn-xs" href="#/product/${n.id}" target="_blank" rel="noopener">${c("external")}</a>
              <button class="btn btn-ghost btn-xs" data-act="adm-p-igpack" data-id="${n.id}" title="${t("adm.igPack")}">${c("camera")}</button>
              ${V("products.delete")?r`<button class="btn btn-ghost btn-xs" data-act="adm-p-del" data-id="${n.id}" data-name="${p(n.name)}">${c("trash")}</button>`:""}
            </div>
          </td>
        </tr>`)):P({icon:"box",title:t("common.noResult"),action:V("products.create")?{href:"#/admin/products/new",label:t("adm.productNew")}:null})}

    <div class="mt" data-page="${e.page}" data-pages="${e.pages}">${rt(e.page||1,e.pages||1,s)}</div>`}function gr(e){let a=!e;return be.images=[...e?.images||[]],be.specs=Object.entries(e?.specs||{}).map(([s,n])=>({key:s,value:n})),be.tags=[...e?.tags||[]],r`
    <div class="row row-between row-wrap mb">
      <h2 class="section-title">${c(a?"plus":"edit")} ${a?t("adm.productNew"):t("adm.productEdit")}</h2>
      <div class="row row-wrap">
        <a class="btn btn-ghost btn-sm" href="#/admin/products">${c("arrow-right")} ${t("adm.products")}</a>
        ${a?"":r`<a class="btn btn-ghost btn-sm" href="#/product/${e.id}" target="_blank" rel="noopener">${c("external")} ${t("common.view")}</a>`}
      </div>
    </div>

    <form data-act="adm-p-save" data-id="${e?.id||""}">
      <div class="card">
        <div class="form-grid">
          ${x({label:t("adm.pName"),name:"name",required:!0,value:e?.name||""})}
          ${x({label:t("adm.pNameEn"),name:"nameEn",value:e?.nameEn||""})}
          ${U({label:t("adm.pCat"),name:"categoryId",value:e?.categoryId||"",options:d.categories.map(s=>({value:s.id,label:ke(s)}))})}
          ${U({label:t("adm.pBrand"),name:"brandId",value:e?.brandId||"",options:d.brands.map(s=>({value:s.id,label:Fe(s)}))})}
          ${x({label:t("adm.pSku"),name:"sku",value:e?.sku||"",hint:w()?"\u062E\u0627\u0644\u06CC \u0628\u06AF\u0630\u0627\u0631\u06CC \u062E\u0648\u062F\u06A9\u0627\u0631 \u0633\u0627\u062E\u062A\u0647 \u0645\u06CC\u200C\u0634\u0648\u062F":"Leave empty to auto-generate"})}
          ${x({label:t("adm.pBarcode"),name:"barcode",value:e?.barcode||"",attrs:'inputmode="numeric"'})}
          ${x({label:t("adm.pPrice"),name:"price",type:"number",required:!0,value:e?.price??""})}
          ${x({label:t("adm.pOldPrice"),name:"oldPrice",type:"number",value:e?.oldPrice??0})}
          ${x({label:t("adm.pCost"),name:"cost",type:"number",value:e?.cost??0})}
          ${x({label:t("adm.pStock"),name:"stock",type:"number",required:!0,value:e?.stock??1})}
          ${x({label:t("adm.pWeight"),name:"weight",type:"number",value:e?.weight??0})}
          ${x({label:t("adm.pWarranty"),name:"warrantyMonths",type:"number",value:e?.warrantyMonths??0})}
          ${U({label:t("adm.pAuth"),name:"authenticity",value:e?.authenticity||"generic",options:["original","highcopy","generic"].map(s=>({value:s,label:t(`auth.${s}`)}))})}
        </div>
        ${!a&&V("barcode.print")?r`
          <div class="row row-wrap mt-s">
            <button type="button" class="btn btn-ghost btn-sm" data-act="adm-p-barcode" data-id="${e.id}">${c("barcode")} ${t("adm.bGenerate")}</button>
            ${e.barcode?r`<code class="tag mono">${e.barcode}</code>`:""}
          </div>`:""}
      </div>

      <div class="card mt">
        <strong>${c("file")} ${t("pdp.description")}</strong>
        <div class="mt-s">${Y({label:"\u0641\u0627\u0631\u0633\u06CC",name:"description",value:e?.description||"",rows:5})}</div>
        ${Y({label:"English",name:"descriptionEn",value:e?.descriptionEn||"",rows:4})}
      </div>

      <div class="card mt">
        <div class="row row-between row-wrap">
          <strong>${c("image")} ${t("adm.pImages")} (${b(be.images.length)}/8)</strong>
          <div class="row row-wrap">
            ${V("products.create")?r`<button type="button" class="btn btn-ghost btn-sm" data-act="adm-p-find" data-name="${p(e?.nameEn||e?.name||"")}">${c("search")} ${t("adm.pFindImage")}</button>`:""}
            <label class="btn btn-ghost btn-sm" for="adm-p-file">${c("upload")} ${t("adm.pUpload")}</label>
            <input id="adm-p-file" type="file" accept="image/*" multiple hidden data-img-input>
          </div>
        </div>
        <div class="img-list mt-s" data-img-list>${qa()}</div>
        <div class="mt">
          ${Y({label:t("adm.pVideos"),name:"videos",value:(e?.videos||[]).join(`
`),rows:2,hint:t("adm.pVideosHint")})}
        </div>
      </div>

      <div class="card mt">
        <div class="row row-between">
          <strong>${c("list")} ${t("adm.pSpecs")}</strong>
          <button type="button" class="btn btn-ghost btn-sm" data-act="adm-p-spec-add">${c("plus")} ${t("adm.pAddSpec")}</button>
        </div>
        <div class="mt-s" data-spec-list>${An()}</div>
      </div>

      <div class="card mt">
        <strong>${c("tag")} ${t("adm.pTags")}</strong>
        <div class="mt-s" data-tag-list>${Dn()}</div>
        <div class="row mt-s">
          <input class="input" data-tag-input placeholder="${w()?"\u0628\u0631\u0686\u0633\u0628 \u062C\u062F\u06CC\u062F \u0648 Enter":"New tag and Enter"}" maxlength="30">
          <button type="button" class="btn btn-ghost btn-sm" data-act="adm-p-tag-add">${c("plus")}</button>
        </div>
      </div>

      <div class="card mt">
        ${he({label:t("adm.pFeatured"),name:"featured",checked:!!e?.featured})}
        ${he({label:t("adm.pActive"),name:"active",checked:e?e.active!==!1:!0})}
      </div>

      <div class="row row-wrap mt">
        <button class="btn btn-primary" type="submit">${c("save")} ${t("common.save")}</button>
        <a class="btn btn-ghost" href="#/admin/products">${t("common.cancel")}</a>
      </div>
    </form>`}function qa(){return be.images.length?be.images.map((e,a)=>r`
    <span class="img-item">
      <img src="${e}" alt="${t("img.alt")}" loading="lazy">
      <span class="img-tools">
        ${a>0?r`<button type="button" data-act="adm-img-up" data-i="${a}" title="${t("common.prev")}">${c("arrow-up")}</button>`:""}
        <button type="button" data-act="adm-img-del" data-i="${a}" title="${t("common.delete")}">${c("trash")}</button>
      </span>
      ${a===0?r`<span class="img-main">${t("common.image")} ۱</span>`:""}
    </span>`).join(""):r`<p class="muted small">${t("adm.pFindEmpty")}</p>`}function An(){return be.specs.length?be.specs.map((e,a)=>r`
    <div class="spec-row">
      <input class="input" value="${p(e.key)}" placeholder="${t("adm.pSpecKey")}" data-spec-k="${a}" maxlength="40">
      <input class="input" value="${p(e.value)}" placeholder="${t("adm.pSpecVal")}" data-spec-v="${a}" maxlength="120">
      <button type="button" class="btn btn-ghost btn-icon btn-sm" data-act="adm-spec-del" data-i="${a}">${c("trash")}</button>
    </div>`).join(""):r`<p class="muted small">${t("common.empty")}</p>`}function Dn(){return be.tags.length?r`<div class="row row-wrap">${be.tags.map((e,a)=>r`
    <span class="chip">${p(e)}<button type="button" data-act="adm-tag-del" data-i="${a}" aria-label="${t("common.delete")}">${c("close")}</button></span>`)}</div>`:r`<p class="muted small">${t("common.empty")}</p>`}function Et(e,a,s){let n=(e||document).querySelector(a);n&&(n.innerHTML=s),L(n||document)}function _l(e){let a=_e(),s=w()?e.name:e.nameEn||e.name,n=f=>Number(f||0).toLocaleString(w()?"fa-IR":"en-US"),o=Number(e.oldPrice||0),i=Math.max(0,(e.stock||0)-(e.reserved||0)),l=`${location.origin}/#/product/${e.id}`,m=String(w()?e.description||"":e.descriptionEn||e.description||"").split(`
`)[0].trim().slice(0,160);return(w()?[`\u2728 ${s} \u2728`,m,"",`\u{1F4B0} \u0642\u06CC\u0645\u062A: ${n(e.price)} \u062A\u0648\u0645\u0627\u0646${o>e.price?` (\u0628\u0647\u200C\u062C\u0627\u06CC ${n(o)} \u2014 ${b(e.discountPct||0)}\u066A \u062A\u062E\u0641\u06CC\u0641)`:""}`,i>0?"\u{1F4E6} \u0645\u0648\u062C\u0648\u062F \u062F\u0631 \u0627\u0646\u0628\u0627\u0631 \u2014 \u0647\u0645\u06CC\u0646 \u062D\u0627\u0644\u0627 \u0633\u0641\u0627\u0631\u0634 \u0628\u062F\u0647":"\u{1F4E6} \u0641\u0639\u0644\u0627\u064B \u0646\u0627\u0645\u0648\u062C\u0648\u062F\u061B \u067E\u06CC\u0627\u0645 \u0628\u062F\u0647 \u062A\u0627 \u0645\u0648\u062C\u0648\u062F \u0634\u062F \u062E\u0628\u0631\u062A \u06A9\u0646\u06CC\u0645","\u{1F6E1} \u0636\u0645\u0627\u0646\u062A \u0627\u0635\u0627\u0644\u062A \u06A9\u0627\u0644\u0627 + \u0645\u0647\u0644\u062A \u062A\u0633\u062A \u0648 \u0645\u0631\u062C\u0648\u0639 \u062A\u0627 \u06F7 \u0631\u0648\u0632","\u{1F69A} \u0627\u0631\u0633\u0627\u0644 \u0627\u0632 \u0628\u0646\u062F\u0631 \u0628\u0648\u0634\u0647\u0631 \u0628\u0647 \u0633\u0631\u0627\u0633\u0631 \u0627\u06CC\u0631\u0627\u0646","",`\u{1F517} \u0633\u0641\u0627\u0631\u0634 \u0622\u0646\u0644\u0627\u06CC\u0646: ${l}`,`\u{1F4DE} \u062A\u0644\u0641\u0646: ${a.phone||""} \xB7 \u{1F34F} \u0627\u06CC\u0646\u0633\u062A\u0627\u06AF\u0631\u0627\u0645: @jam.greenapple`]:[`\u2728 ${s} \u2728`,m,"",`\u{1F4B0} Price: ${n(e.price)} Toman${o>e.price?` (was ${n(o)})`:""}`,"\u{1F6E1} Authenticity guarantee + 7-day return",`\u{1F517} Order: ${l}`,`\u{1F4DE} ${a.phone||""}`]).filter((f,v,S)=>!(f===""&&(S[v-1]===""||v===0))).join(`
`)}function Vl(e){let a=w()?["\u06AF\u0631\u06CC\u0646_\u0627\u067E\u0644","\u0644\u0648\u0627\u0632\u0645_\u062C\u0627\u0646\u0628\u06CC_\u0645\u0648\u0628\u0627\u06CC\u0644","\u06AF\u062C\u062A","\u0628\u0648\u0634\u0647\u0631","\u062C\u0645","\u062E\u0631\u06CC\u062F_\u0622\u0646\u0644\u0627\u06CC\u0646"]:["GreenApple","MobileAccessories","Gadget","Bushehr","OnlineShopping"],s=[e.brandName,e.categoryName].filter(Boolean).map(n=>String(n).trim().replace(/\s+/g,"_"));return[...new Set([...a,...s])].map(n=>`#${n}`).join(" ")}async function fr(e,a,s){e&&(e.innerHTML=ya(t("adm.pFindSearching")));try{let o=(await h.post("/api/admin/find-image",{query:a,lang:s})).items||[];e&&(e.innerHTML=o.length?r`<div class="find-grid">${o.map((i,l)=>r`
        <div class="find-item">
          <img src="/api/admin/image-thumb?url=${encodeURIComponent(i.thumbnail||i.url)}" alt="${p(i.title||"")}" loading="lazy">
          <div class="find-meta">
            <div class="tiny b">${p((i.title||"").slice(0,60))}</div>
            <div class="tiny muted">${p(i.license||"")} · ${p(i.source||"")}${i.creator?` \xB7 ${p(i.creator)}`:""}</div>
          </div>
          <button type="button" class="btn btn-primary btn-xs" data-act="adm-find-use" data-url="${p(i.url)}">${t("adm.pUseImage")}</button>
        </div>`).join("")}</div>`:P({icon:"image",title:t("adm.pFindEmpty")}))}catch(n){e&&(e.innerHTML=r`<p class="notice notice-danger">${c("alert")}<span>${p(n?.message||t("err.network"))}</span></p>`)}}function Yl(e){L(e);let a=e.querySelector("[data-img-input]");a&&a.addEventListener("change",async()=>{let n=[...a.files||[]].slice(0,8-be.images.length);a.value="";for(let o of n){if(o.size>4*1024*1024){oe(`${t("err.tooLarge")}: ${o.name}`,{type:"warn"});continue}try{let i=await At(o),l=await h.upload(i);l.url&&be.images.push(l.url)}catch(i){y(i)}}Et(e,"[data-img-list]",qa())});let s=e.querySelector("[data-tag-input]");return s&&s.addEventListener("keydown",n=>{n.key==="Enter"&&(n.preventDefault(),document.querySelector('[data-act="adm-p-tag-add"]')?.click())}),e.querySelectorAll(".pagination .pg").forEach(n=>{n.addEventListener("click",o=>{let i=/page=(\d+)/.exec(n.getAttribute("href")||"");if(!i)return;o.preventDefault();let l=Number(i[1]);l>=1&&(Ce.page=l,T(!0))})}),null}var Ce,be,yr=O(()=>{B();W();Q();_();ce();X();le();ee();Ce={q:"",cat:"",brand:"",status:"",page:1,limit:25},be={images:[],specs:[],tags:[]};g("adm-p-filter",(e,a)=>{e.preventDefault();let s=new FormData(a);Ce.q=String(s.get("q")||"").trim(),Ce.cat=String(s.get("cat")||""),Ce.brand=String(s.get("brand")||""),Ce.status=String(s.get("status")||""),Ce.page=1,T(!0)});g("adm-p-clear",()=>{Object.assign(Ce,{q:"",cat:"",brand:"",status:"",page:1}),T(!0)});g("adm-p-del",async(e,a)=>{if(await Oe(a.dataset.name))try{await h.del(`/api/admin/products/${a.dataset.id}`),$(t("adm.pDeleted")),T(!0)}catch(n){y(n)}});g("adm-img-del",(e,a)=>{be.images.splice(Number(a.dataset.i),1),Et(null,"[data-img-list]",qa())});g("adm-img-up",(e,a)=>{let s=Number(a.dataset.i),[n]=be.images.splice(s,1);be.images.splice(s-1,0,n),Et(null,"[data-img-list]",qa())});g("adm-p-spec-add",()=>{be.specs.push({key:"",value:""}),Et(null,"[data-spec-list]",An())});g("adm-spec-del",(e,a)=>{be.specs.splice(Number(a.dataset.i),1),Et(null,"[data-spec-list]",An())});g("adm-p-tag-add",()=>{let e=document.querySelector("[data-tag-input]"),a=String(e?.value||"").trim();a&&(!be.tags.includes(a)&&be.tags.length<20&&be.tags.push(a),e&&(e.value=""),Et(null,"[data-tag-list]",Dn()))});g("adm-tag-del",(e,a)=>{be.tags.splice(Number(a.dataset.i),1),Et(null,"[data-tag-list]",Dn())});g("adm-p-barcode",async(e,a)=>{await A(a,async()=>{try{let s=await h.post("/api/admin/barcode/generate",{productId:a.dataset.id,count:1}),n=s.codes?.[0]?.barcode||s.codes?.[0]||"";if(n){let o=document.querySelector("[name=barcode]");o&&(o.value=n),$(t("adm.bGenerated"))}}catch(s){y(s)}})});g("adm-p-igpack",async(e,a)=>{let s=null;try{s=(await h.get(`/api/admin/products/${a.dataset.id}`)).product}catch(o){y(o);return}let n=(s.images||[])[0]||"";ie({title:`${c("camera")} ${t("adm.igPack")}`,subtitle:w()?s.name:s.nameEn||s.name,body:r`
      ${n?r`
        <div class="row row-wrap mb">
          <img class="igpack-img" src="${p(n)}" alt="">
          <div class="grow">
            <p class="small muted">${t("adm.igImgHint")}</p>
            <a class="btn btn-ghost btn-sm mt-s" href="${p(n)}" download="greenapple-${p(s.sku||s.id)}.jpg" target="_blank" rel="noopener">${c("download")} ${t("adm.igDl")}</a>
          </div>
        </div>`:r`<p class="notice notice-warn mb">${c("info")}<span>${t("adm.igNoImg")}</span></p>`}
      ${Y({label:t("adm.igCap"),name:"igcap",rows:10,value:_l(s)})}
      ${Y({label:t("adm.igTags"),name:"igtags",rows:2,value:Vl(s)})}
      <div class="row row-wrap mt-s">
        <button type="button" class="btn btn-primary btn-sm" data-act="adm-ig-copy" data-what="cap">${c("copy")} ${t("adm.igCopyCap")}</button>
        <button type="button" class="btn btn-ghost btn-sm" data-act="adm-ig-copy" data-what="tags">${c("copy")} ${t("adm.igCopyTags")}</button>
        <button type="button" class="btn btn-ghost btn-sm" data-act="adm-ig-copy" data-what="all">${c("copy")} ${t("adm.igCopyAll")}</button>
      </div>`})});g("adm-ig-copy",async(e,a)=>{let s=a.closest(".modal"),n=s?.querySelector("[name=igcap]")?.value||"",o=s?.querySelector("[name=igtags]")?.value||"",i=a.dataset.what==="tags"?o:a.dataset.what==="all"?`${n}

${o}`:n;try{await Rs(i),$(t("common.copied"),{timeout:1800})}catch{y(new Error(t("err.generic")))}});g("adm-p-save",async(e,a)=>{e.preventDefault();let s=new FormData(a),n={};a.querySelectorAll("[data-spec-k]").forEach(l=>{let m=l.dataset.specK,u=a.querySelector(`[data-spec-v="${m}"]`),f=String(l.value||"").trim();f&&(n[f]=String(u?.value||"").trim())});let o=a.dataset.id,i={name:s.get("name"),nameEn:s.get("nameEn")||"",categoryId:s.get("categoryId")||"",brandId:s.get("brandId")||"",sku:s.get("sku")||"",barcode:s.get("barcode")||"",price:Number(s.get("price")||0),oldPrice:Number(s.get("oldPrice")||0),cost:Number(s.get("cost")||0),stock:Number(s.get("stock")||0),weight:Number(s.get("weight")||0),warrantyMonths:Number(s.get("warrantyMonths")||0),authenticity:s.get("authenticity")||"generic",description:s.get("description")||"",descriptionEn:s.get("descriptionEn")||"",images:be.images.slice(0,8),videos:String(a.videos?.value||"").split(/\n+/).map(l=>l.trim()).filter(Boolean).slice(0,4),specs:n,tags:be.tags.slice(0,20),featured:s.get("featured")==="on",active:s.get("active")==="on"};await A(a.querySelector("button[type=submit]"),async()=>{try{if(o)await h.patch(`/api/admin/products/${o}`,i),$(t("adm.pSaved"));else{let l=await h.post("/api/admin/products",i);if($(t("adm.pCreated")),l.product?.id){de(`#/admin/products/${l.product.id}`);return}}T(!0)}catch(l){y(l)}})});g("adm-p-find",(e,a)=>{let s=ie({title:t("adm.pFindImage"),size:"lg",body:r`
      <form data-act="adm-find-run" class="row row-wrap mb">
        <input class="input grow" name="query" value="${p(a.dataset.name||"")}" placeholder="${t("adm.pName")}" required>
        <select class="select" name="lang" data-w="110px">
          <option value="en">English</option>
          <option value="fa">فارسی</option>
        </select>
        <button class="btn btn-primary" type="submit">${c("search")} ${t("common.search")}</button>
      </form>
      <p class="hint mb-s">${t("adm.pFindImageHint")}</p>
      <div data-find-results>${ya(t("adm.pFindSearching"))}</div>`,onMount:n=>{n.querySelector("[name=query]")?.focus(),n.dataset.findBox="1";let o=a.dataset.name||"";o&&fr(n.querySelector("[data-find-results]"),o,"en")}})});g("adm-find-run",(e,a)=>{e.preventDefault();let s=new FormData(a),n=a.closest(".modal");fr(n?.querySelector("[data-find-results]"),String(s.get("query")||""),String(s.get("lang")||"en"))});g("adm-find-use",async(e,a)=>{await A(a,async()=>{try{let s=await h.post("/api/admin/fetch-image",{url:a.dataset.url});s.url&&!be.images.includes(s.url)&&be.images.length<8&&be.images.push(s.url),Et(null,"[data-img-list]",qa()),$(t("adm.pSaved")),a.closest(".overlay")?.querySelector("[data-lx]")?.click()}catch(s){y(s)}})})});var kr={};G(kr,{mount:()=>Ql,render:()=>Gl});async function Gl(){let e=null;try{e=await h.get("/api/admin/categories")}catch(a){return F({title:a?.message||t("err.generic")})}return Ft=e.items||[],ms=e.brands||[],r`
    <div class="row row-between row-wrap mb">
      <h2 class="section-title">${c("layers")} ${t("adm.categories")}</h2>
      <div class="row row-wrap">
        <button class="btn btn-primary btn-sm" data-act="adm-cat-new">${c("plus")} ${t("common.category")}</button>
        <button class="btn btn-outline btn-sm" data-act="adm-brand-new">${c("plus")} ${t("common.brand")}</button>
      </div>
    </div>

    <div class="card">
      <strong>${c("layers")} ${t("common.category")} (${b(Ft.length)})</strong>
      ${re([{label:t("adm.catGlyph")},{label:t("adm.catName")},{label:t("adm.catParent")},{label:t("adm.catOrder"),cls:"num"},{label:t("common.count"),cls:"num"},{label:t("common.status")},{label:"",cls:"num"}],Ft.map(a=>r`
          <tr>
            <td><span class="cat-ic" data-h="34px" data-w="34px">${c(a.glyph||"box")}</span></td>
            <td><span class="b">${p(w()?a.name:a.nameEn||a.name)}</span><div class="tiny muted mono">${p(a.id)}</div></td>
            <td class="tiny">${p(Ft.find(s=>s.id===a.parentId)?.name||"\u2014")}</td>
            <td class="num">${b(a.order||0)}</td>
            <td class="num">${b(a.productCount||0)}</td>
            <td>${a.active===!1?r`<span class="badge-pill bp-muted">${t("common.inactive")}</span>`:r`<span class="badge-pill bp-success">${t("common.active")}</span>`}</td>
            <td>
              <div class="act">
                <button class="btn btn-ghost btn-xs" data-act="adm-cat-edit" data-id="${a.id}">${c("edit")}</button>
                <a class="btn btn-ghost btn-xs" href="#/category/${a.id}" target="_blank" rel="noopener">${c("external")}</a>
                <button class="btn btn-ghost btn-xs" data-act="adm-cat-del" data-id="${a.id}" data-name="${p(a.name)}">${c("trash")}</button>
              </div>
            </td>
          </tr>`),{emptyText:t("common.noData")})}
    </div>

    <div class="card mt">
      <strong>${c("tag")} ${t("common.brand")} (${b(ms.length)})</strong>
      ${re([{label:t("adm.brandName")},{label:t("adm.brandNameEn")},{label:t("common.count"),cls:"num"},{label:t("common.status")},{label:"",cls:"num"}],ms.map(a=>r`
          <tr>
            <td class="b">${p(a.name)}<div class="tiny muted mono">${p(a.id)}</div></td>
            <td class="tiny">${p(a.nameEn||"")}${a.country?r` <span class="muted">· ${p(a.country)}</span>`:""}</td>
            <td class="num">${b(a.productCount||0)}</td>
            <td>${a.active===!1?r`<span class="badge-pill bp-muted">${t("common.inactive")}</span>`:r`<span class="badge-pill bp-success">${t("common.active")}</span>`}</td>
            <td>
              <div class="act">
                <button class="btn btn-ghost btn-xs" data-act="adm-brand-edit" data-id="${a.id}">${c("edit")}</button>
                <button class="btn btn-ghost btn-xs" data-act="adm-brand-del" data-id="${a.id}" data-name="${p(a.name)}">${c("trash")}</button>
              </div>
            </td>
          </tr>`),{emptyText:t("common.noData")})}
    </div>`}function $r(e){return ie({title:e?t("common.edit"):t("common.add"),body:r`
      <form class="form-grid" data-act="adm-cat-save" data-id="${e?.id||""}" data-isnew="${e?"":"1"}">
        ${e?"":x({label:"id",name:"id",hint:w()?"\u062E\u0627\u0644\u06CC \u0628\u06AF\u0630\u0627\u0631\u06CC \u062E\u0648\u062F\u06A9\u0627\u0631 \u0633\u0627\u062E\u062A\u0647 \u0645\u06CC\u200C\u0634\u0648\u062F":"Auto if empty"})}
        ${x({label:t("adm.catName"),name:"name",required:!0,value:e?.name||""})}
        ${x({label:t("adm.brandNameEn"),name:"nameEn",value:e?.nameEn||""})}
        ${U({label:t("adm.catGlyph"),name:"glyph",value:e?.glyph||"box",options:Kl.map(a=>({value:a,label:a}))})}
        ${U({label:t("adm.catParent"),name:"parentId",value:e?.parentId||"",options:[{value:"",label:t("adm.catNoParent")},...Ft.filter(a=>a.id!==e?.id).map(a=>({value:a.id,label:a.name}))]})}
        ${x({label:t("adm.catOrder"),name:"order",type:"number",value:e?.order??Ft.length+1,attrs:'min="0" max="999"'})}
        <div class="span-2">${Y({label:t("common.description"),name:"description",value:e?.description||"",rows:2})}</div>
        <div class="span-2">${Y({label:Pn("\u062A\u0648\u0636\u06CC\u062D\u0627\u062A \u0627\u0646\u06AF\u0644\u06CC\u0633\u06CC","Description (EN)"),name:"descriptionEn",value:e?.descriptionEn||"",rows:2})}</div>
        <div class="span-2">${he({label:t("common.active"),name:"active",checked:e?e.active!==!1:!0})}</div>
        <button class="btn btn-primary span-2" type="submit">${t("common.save")}</button>
      </form>`})}function wr(e){return ie({title:e?t("common.edit"):t("common.add"),size:"sm",body:r`
      <form data-act="adm-brand-save" data-id="${e?.id||""}" data-isnew="${e?"":"1"}">
        ${e?"":x({label:"id",name:"id",hint:Pn("\u062E\u0627\u0644\u06CC \u0628\u06AF\u0630\u0627\u0631\u06CC \u062E\u0648\u062F\u06A9\u0627\u0631 \u0633\u0627\u062E\u062A\u0647 \u0645\u06CC\u200C\u0634\u0648\u062F","Auto if empty")})}
        ${x({label:t("adm.brandName"),name:"name",required:!0,value:e?.name||""})}
        ${x({label:t("adm.brandNameEn"),name:"nameEn",value:e?.nameEn||""})}
        ${x({label:Pn("\u06A9\u0634\u0648\u0631","Country"),name:"country",value:e?.country||""})}
        ${he({label:t("common.active"),name:"active",checked:e?e.active!==!1:!0})}
        <button class="btn btn-primary btn-block mt-s" type="submit">${t("common.save")}</button>
      </form>`})}function Ql(e){return L(e),null}var Ft,ms,Kl,Pn,Mn,Ln,Sr=O(()=>{B();W();Q();_();ce();X();le();ee();Ft=[],ms=[];Kl=["box","cable","plug","battery","speaker","watch","glasses","mic","camera","phone","card","zap","image","headset","anchor","palm","wave","globe","layers","tag"];Pn=(e,a)=>w()?e:a,Mn=null;g("adm-cat-new",()=>{Mn=$r(null)});g("adm-cat-edit",(e,a)=>{Mn=$r(Ft.find(s=>s.id===a.dataset.id))});g("adm-cat-del",async(e,a)=>{if(await Oe(a.dataset.name))try{await h.del(`/api/admin/categories/${a.dataset.id}`),$(t("misc.deleted")),await Ne({silent:!0}),T(!0)}catch(s){y(s)}});g("adm-cat-save",async(e,a)=>{e.preventDefault();let s=new FormData(a),n=a.dataset.isnew==="1",o={name:s.get("name"),nameEn:s.get("nameEn")||"",glyph:s.get("glyph")||"box",parentId:s.get("parentId")||"",order:Number(s.get("order")||0),description:s.get("description")||"",descriptionEn:s.get("descriptionEn")||"",active:s.get("active")==="on"};n&&s.get("id")&&(o.id=s.get("id")),await A(a.querySelector("button[type=submit]"),async()=>{try{n?await h.post("/api/admin/categories",o):await h.patch(`/api/admin/categories/${a.dataset.id}`,o),$(t("misc.saved")),Mn?.close(),await Ne({silent:!0}),T(!0)}catch(i){y(i)}})});Ln=null;g("adm-brand-new",()=>{Ln=wr(null)});g("adm-brand-edit",(e,a)=>{Ln=wr(ms.find(s=>s.id===a.dataset.id))});g("adm-brand-del",async(e,a)=>{if(await Oe(a.dataset.name))try{await h.del(`/api/admin/brands/${a.dataset.id}`),$(t("misc.deleted")),await Ne({silent:!0}),T(!0)}catch(s){y(s)}});g("adm-brand-save",async(e,a)=>{e.preventDefault();let s=new FormData(a),n=a.dataset.isnew==="1",o={name:s.get("name"),nameEn:s.get("nameEn")||"",country:s.get("country")||"",active:s.get("active")==="on"};n&&s.get("id")&&(o.id=s.get("id")),await A(a.querySelector("button[type=submit]"),async()=>{try{n?await h.post("/api/admin/brands",o):await h.patch(`/api/admin/brands/${a.dataset.id}`,o),$(t("misc.saved")),Ln?.close(),await Ne({silent:!0}),T(!0)}catch(i){y(i)}})})});var qr={};G(qr,{mount:()=>ed,render:()=>Jl});async function Jl(e){return e.params.id?Zl(e.params.id):Xl()}async function Xl(){let e=null;try{e=await h.get(h.url("/api/admin/orders",{q:Re.q,status:Re.status,delivery:Re.delivery,page:Re.page,limit:Re.limit}))}catch(s){return F({title:s?.message||t("err.generic")})}xr=e.statuses||[];let a=e.items||[];return r`
    <div class="row row-between row-wrap mb">
      <div>
        <h2 class="section-title">${c("package-check")} ${t("adm.orders")}</h2>
        <p class="muted small">${b(e.total||0)} ${t("common.orders")}</p>
      </div>
    </div>

    <form class="card mb adm-filter" data-act="adm-o-filter">
      <div class="form-grid">
        <label class="field"><span class="label">${t("common.search")}</span>
          <input class="input" name="q" value="${p(Re.q)}" placeholder="${t("acc.orderCode")} / ${t("common.phone")} / ${t("common.name")}">
        </label>
        ${U({label:t("common.status"),name:"status",value:Re.status,options:[{value:"",label:t("common.all")},...xr.map(s=>({value:s.id,label:t(`st.${s.id}`)}))]})}
        ${U({label:t("adm.oDelivery"),name:"delivery",value:Re.delivery,options:[{value:"",label:t("common.all")},{value:"pickup",label:t("dl.pickup")},{value:"courier",label:t("dl.courier")}]})}
      </div>
      <div class="row row-wrap mt-s">
        <button class="btn btn-primary btn-sm" type="submit">${c("filter")} ${t("common.apply")}</button>
        <button class="btn btn-ghost btn-sm" type="button" data-act="adm-o-clear">${c("close")} ${t("catalog.f.clear")}</button>
      </div>
    </form>

    ${a.length?re([{label:t("acc.orderCode")},{label:t("adm.oCustomer")},{label:t("common.date")},{label:t("adm.oDelivery")},{label:t("common.total"),cls:"num"},{label:t("adm.oPayment")},{label:t("common.status")},{label:"",cls:"num"}],a.map(s=>r`
        <tr>
          <td class="mono b nowrap">${s.code}</td>
          <td class="nowrap">${p(s.userName||"")}<div class="tiny muted mono">${ne(s.userPhone||"")}</div></td>
          <td class="nowrap tiny">${H(s.createdAt)}</td>
          <td class="tiny">${t(s.delivery==="pickup"?"dl.pickup":"dl.courier")}${s.express?r` <span class="badge-pill bp-accent">${t("checkout.express")}</span>`:""}</td>
          <td class="num b">${C(s.total)}</td>
          <td>${Rt(s.payment)}<div class="tiny muted">${t(`pm.${s.payment?.method||"cod"}`)}</div></td>
          <td>${bt(s.status)}</td>
          <td><a class="btn btn-ghost btn-xs" href="#/admin/orders/${s.id}">${t("common.view")}</a></td>
        </tr>`)):P({icon:"package-check",title:t("common.noResult")})}

    <div class="mt">${rt(e.page||1,e.pages||1,s=>`#/admin/orders?page=${s}`)}</div>`}async function Zl(e){let a=null;try{a=await h.get(h.url("/api/admin/orders",{q:"",page:1,limit:200}))}catch{}let s=(a?.items||[]).find(n=>n.id===e||n.code===e);if(!s){try{let n=await h.get(h.url("/api/admin/orders",{q:e,page:1,limit:50})),o=(n?.items||[]).find(i=>i.id===e||i.code===e);if(o)return Er(o,n.statuses||[])}catch{}return P({icon:"package-check",title:t("acc.noOrders"),action:{href:"#/admin/orders",label:t("adm.orders")}})}return Er(s,a.statuses||[])}function Er(e,a){let s=V("orders.manage");return r`
    <div class="breadcrumb mb-s">
      <a href="#/admin/orders">${t("adm.orders")}</a> <span>/</span> <span class="mono">${e.code}</span>
    </div>

    <div class="cart-grid">
      <div class="col">
        <div class="card">
          <div class="row row-between row-wrap">
            <div>
              <h2 class="buy-title">${c("package-check")} ${e.code}</h2>
              <p class="muted small">${H(e.createdAt)} · ${p(e.userName||"")} · <span class="mono">${ne(e.userPhone||"")}</span></p>
            </div>
            <div class="row row-wrap">${bt(e.status)}${Rt(e.payment)}</div>
          </div>
          ${s?r`
            <form class="form-grid mt" data-act="adm-o-save" data-id="${e.id}">
              ${U({label:t("adm.oStatus"),name:"status",value:e.status,options:(a.length?a:[]).map(n=>({value:n.id,label:t(`st.${n.id}`)}))})}
              ${x({label:t("adm.oTracking"),name:"tracking",value:e.tracking||e.payment?.tracking||""})}
              <div class="span-2">${Y({label:t("adm.oNote"),name:"note",value:e.adminNote||"",rows:3})}</div>
              <div class="span-2"><button class="btn btn-primary" type="submit">${c("save")} ${t("common.save")}</button></div>
            </form>`:""}
        </div>

        <div class="card mt">
          <strong>${c("box")} ${t("acc.orderItems")}</strong>
          ${re([{label:""},{label:t("common.product")},{label:t("common.price"),cls:"num"},{label:t("common.count"),cls:"num"},{label:t("common.total"),cls:"num"}],(e.items||[]).map(n=>r`
              <tr>
                <td><span class="cl-img" data-h="46px" data-w="46px">${Nt({id:n.productId,name:n.name,images:n.image?[n.image]:[]})}</span></td>
                <td><a class="b" href="#/admin/products/${n.productId}">${p(w()?n.name:n.nameEn||n.name)}</a><div class="tiny muted mono">${p(n.sku||"")}</div></td>
                <td class="num">${C(n.price)}</td>
                <td class="num">${b(n.qty)}</td>
                <td class="num b">${C(n.price*n.qty)}</td>
              </tr>`))}
        </div>

        <div class="card mt">
          <strong>${c("history")} ${t("acc.timeline")}</strong>
          ${Gt(e)}
        </div>
      </div>

      <aside class="col">
        <div class="card summary">
          <strong>${t("cart.summary")}</strong>
          <div class="sum-row"><span>${t("common.subtotal")}</span><span class="v">${C(e.subtotal)}</span></div>
          ${e.plusDiscount>0?r`<div class="sum-row discount"><span>${t("acc.plus")}</span><span class="v">−${C(e.plusDiscount)}</span></div>`:""}
          ${e.couponDiscount>0?r`<div class="sum-row discount"><span>${e.couponCode}</span><span class="v">−${C(e.couponDiscount)}</span></div>`:""}
          <div class="sum-row"><span>${t("common.shipping")}${e.shippingLabel?r` <span class="muted tiny">(${p(e.shippingLabel)})</span>`:""}</span><span class="v">${C(e.shipping)}</span></div>
          ${e.insured?r`<div class="sum-row"><span>${t("common.insurance")}</span><span class="v">${C(e.insuranceFee)}</span></div>`:""}
          <div class="sum-row"><span>${t("common.total")}</span><span class="v">${C(e.total)}</span></div>
          ${e.walletUsed>0?r`<div class="sum-row discount"><span>${t("common.wallet")}</span><span class="v">−${C(e.walletUsed)}</span></div>`:""}
          <div class="sum-row total"><span>${t("common.payable")}</span><span class="v">${C(e.payable)}</span></div>
          <p class="hint mt-s">${t("adm.oPayment")}: ${t(`pm.${e.payment?.method||"cod"}`)}${e.payment?.ref?` \xB7 ${p(e.payment.ref)}`:""}</p>
          ${e.refund?r`<p class="notice notice-success mt-s">${c("wallet")}<span>${C(e.refund.amount)} — ${H(e.refund.at)}</span></p>`:""}
        </div>

        <div class="card mt">
          <strong>${c("truck")} ${t(e.delivery==="pickup"?"dl.pickup":"dl.courier")}</strong>
          ${e.address?r`
            <p class="small mt-s"><strong>${p(e.address.receiver||"")}</strong> · <span class="mono">${ne(e.address.phone||"")}</span></p>
            <p class="muted small">${p(e.address.street||"")}${e.address.city?`\u060C ${p(e.address.city)}`:""}</p>
            ${e.address.postal?r`<p class="muted small">${t("common.postal")}: ${p(e.address.postal)}</p>`:""}
            ${e.address.note?r`<p class="hint">${p(e.address.note)}</p>`:""}`:r`<p class="muted small mt-s">${t("checkout.pickupDesc")}</p>`}
          ${e.zone?r`<p class="small mt-s">${t("checkout.zone")}: ${p(e.zone)}</p>`:""}
          ${e.note?r`<p class="hint mt-s">${c("edit")} ${p(e.note)}</p>`:""}
        </div>
      </aside>
    </div>`}function ed(e){return L(e),e.querySelectorAll(".pagination .pg").forEach(a=>{a.addEventListener("click",s=>{let n=/page=(\d+)/.exec(a.getAttribute("href")||"");n&&(s.preventDefault(),Re.page=Number(n[1]),T(!0))})}),null}var Re,xr,Tr=O(()=>{B();W();Q();_();ce();X();le();ee();Re={q:"",status:"",delivery:"",page:1,limit:25},xr=[];g("adm-o-filter",(e,a)=>{e.preventDefault();let s=new FormData(a);Re.q=String(s.get("q")||"").trim(),Re.status=String(s.get("status")||""),Re.delivery=String(s.get("delivery")||""),Re.page=1,T(!0)});g("adm-o-clear",()=>{Object.assign(Re,{q:"",status:"",delivery:"",page:1}),T(!0)});g("adm-o-save",async(e,a)=>{e.preventDefault();let s=new FormData(a);await A(a.querySelector("button[type=submit]"),async()=>{try{await h.patch(`/api/admin/orders/${a.dataset.id}`,{status:s.get("status"),tracking:s.get("tracking")||"",note:s.get("note")||""}),$(t("adm.oSaved")),T(!0)}catch(n){y(n)}})})});var Cr={};G(Cr,{mount:()=>nd,render:()=>td});async function td(){let e=null;try{e=await h.get(h.url("/api/admin/reviews",{status:Ge.status,type:Ge.type}))}catch(n){return F({title:n?.message||t("err.generic")})}ps=e.items||[],na=e.counts||na;let a=Math.max(1,Math.ceil(ps.length/Nn));Ge.page>a&&(Ge.page=a);let s=ps.slice((Ge.page-1)*Nn,Ge.page*Nn);return r`
    <div class="row row-between row-wrap mb">
      <h2 class="section-title">${c("chat")} ${t("adm.reviews")}</h2>
      <div class="row row-wrap">
        <span class="badge-pill bp-warn">${t("adm.revPending")}: ${b(na.pending||0)}</span>
        <span class="badge-pill bp-success">${t("adm.revApproved")}: ${b(na.approved||0)}</span>
        <span class="badge-pill bp-muted">${t("adm.revRejected")}: ${b(na.rejected||0)}</span>
      </div>
    </div>

    <form class="card mb adm-filter" data-act="adm-rev-filter">
      <div class="form-grid">
        ${U({label:t("common.status"),name:"status",value:Ge.status,options:[{value:"pending",label:`${t("adm.revPending")} (${b(na.pending||0)})`},{value:"approved",label:t("adm.revApproved")},{value:"rejected",label:t("adm.revRejected")},{value:"",label:t("common.all")}]})}
        ${U({label:t("common.type"),name:"type",value:Ge.type,options:[{value:"",label:t("common.all")},{value:"review",label:t("common.review")},{value:"question",label:t("common.question")}]})}
      </div>
      <div class="row row-wrap mt-s">
        <button class="btn btn-primary btn-sm" type="submit">${c("filter")} ${t("common.apply")}</button>
      </div>
    </form>

    ${s.length?r`
      <div class="rev-list">
        ${s.map(ad).join("")}
      </div>
      ${a>1?rt(Ge.page,a,n=>`#/admin/reviews?p=${n}`):""}
    `:P({icon:"star",title:t("adm.revEmpty"),text:t("adm.revEmptyHint")})}`}function ad(e){let a=e.type==="question";return r`
    <article class="card rev-card" data-id="${e.id}">
      <div class="row row-between row-wrap mb-s">
        <div class="row">
          ${e.productImage?r`<img class="rev-thumb" src="${p(e.productImage)}" alt="" loading="lazy" data-h="46px" data-w="46px">`:r`<span class="rev-thumb ph" data-h="46px" data-w="46px">${c("box")}</span>`}
          <div>
            <a class="b" href="#/product/${e.productId}">${p(e.productName||e.productId)}</a>
            <div class="tiny muted">${p(e.userName||"")} · ${e.userBadge==="buyer"?t("rev.buyer"):t("rev.visitor")} · ${H(e.createdAt)}</div>
          </div>
        </div>
        <div class="row row-wrap">
          ${a?r`<span class="badge-pill bp-info">${t("common.question")}</span>`:r`<span class="rate-row">${Me(e.rating||0)}</span>`}
          ${sd(e.status)}
        </div>
      </div>
      ${e.title?r`<h3 class="rev-title">${p(e.title)}</h3>`:""}
      <p class="rev-body">${p(e.body||"")}</p>
      ${e.reply?r`
        <div class="rev-reply">
          <span class="tiny muted">${c("send")} ${t("rev.shopReply")}</span>
          <p>${p(e.reply)}</p>
        </div>`:""}
      <div class="row row-wrap mt-s">
        ${e.status!=="approved"?r`<button class="btn btn-success btn-xs" data-act="adm-rev-status" data-id="${e.id}" data-status="approved">${c("check")} ${t("adm.revApprove")}</button>`:""}
        ${e.status!=="rejected"?r`<button class="btn btn-outline btn-xs" data-act="adm-rev-status" data-id="${e.id}" data-status="rejected">${c("close")} ${t("adm.revReject")}</button>`:""}
        ${e.status!=="pending"?r`<button class="btn btn-ghost btn-xs" data-act="adm-rev-status" data-id="${e.id}" data-status="pending">${c("refresh")} ${t("adm.revPending")}</button>`:""}
        ${V("reviews.reply")?r`<button class="btn btn-ghost btn-xs" data-act="adm-rev-reply" data-id="${e.id}">${c("send")} ${t("adm.revReply")}</button>`:""}
        <a class="btn btn-ghost btn-xs" href="#/product/${e.productId}" target="_blank" rel="noopener">${c("external")}</a>
        <button class="btn btn-ghost btn-xs" data-act="adm-rev-del" data-id="${e.id}" data-name="${p(e.title||e.body?.slice(0,30)||"")}">${c("trash")}</button>
      </div>
    </article>`}function sd(e){let a={pending:["bp-warn",t("adm.revPending")],approved:["bp-success",t("adm.revApproved")],rejected:["bp-danger",t("adm.revRejected")]},[s,n]=a[e]||["bp-muted",e];return r`<span class="badge-pill ${s}">${n}</span>`}function nd(e){return L(e),null}var Ge,Nn,ps,na,Ar=O(()=>{B();W();Q();_();ce();X();le();ee();Ge={status:"pending",type:"",page:1},Nn=12,ps=[],na={pending:0,approved:0,rejected:0};g("adm-rev-filter",(e,a)=>{e.preventDefault();let s=new FormData(a);Ge.status=String(s.get("status")||""),Ge.type=String(s.get("type")||""),Ge.page=1,T(!0)});g("adm-rev-status",async(e,a)=>{try{await h.patch(`/api/admin/reviews/${a.dataset.id}`,{status:a.dataset.status}),$(t("misc.saved")),T(!0)}catch(s){y(s)}});g("adm-rev-reply",async(e,a)=>{let s=ps.find(o=>o.id===a.dataset.id),n=await ot({title:t("adm.revReply"),text:s?.body?.slice(0,140)||"",label:t("rev.shopReply"),value:s?.reply||"",rows:4});if(n!==null)try{await h.patch(`/api/admin/reviews/${a.dataset.id}`,{reply:String(n)}),$(t("misc.saved")),T(!0)}catch(o){y(o)}});g("adm-rev-del",async(e,a)=>{if(await Oe(a.dataset.name||a.dataset.id))try{await h.del(`/api/admin/reviews/${a.dataset.id}`),$(t("misc.deleted")),T(!0)}catch(s){y(s)}})});var Hn={};G(Hn,{mount:()=>ld,render:()=>od});async function od(e){return e.params.section==="support"?id(e.params.id):e.params.id?cd(e.params.id):rd()}async function rd(){let e=null;try{e=await h.get(h.url("/api/admin/tickets",{status:In.status}))}catch(n){return F({title:n?.message||t("err.generic")})}let a=e.items||[],s=e.counts||{};return r`
    <div class="row row-between row-wrap mb">
      <div>
        <h2 class="section-title">${c("ticket")} ${t("adm.tickets")}</h2>
        <p class="muted small">${tt("\u0628\u0627\u0632","Open")}: ${b(s.open||0)} · ${tt("\u0628\u0633\u062A\u0647","Closed")}: ${b(s.closed||0)} · ${tt("\u062E\u0648\u0627\u0646\u062F\u0647\u200C\u0646\u0634\u062F\u0647","Unread")}: ${b(a.filter(n=>n.unread).length)}</p>
      </div>
      <form class="row" data-act="adm-tk-filter" data-live>
        ${U({label:t("common.status"),name:"status",value:In.status,options:[{value:"",label:t("common.all")},{value:"open",label:t("tk.open")},{value:"answered",label:t("tk.answered")},{value:"closed",label:t("tk.closed")}]})}
      </form>
    </div>

    ${re([{label:t("acc.ticketSubject")},{label:t("acc.ticketCategory")},{label:t("common.priority")},{label:t("common.user")},{label:t("common.messages"),cls:"num"},{label:t("common.status")},{label:t("common.updated"),cls:"num"},{label:"",cls:"num"}],a.map(n=>r`
        <tr class="${n.unread?"row-new":""}">
          <td>
            ${n.unread?r`<span class="dot-new" title="${tt("\u062E\u0648\u0627\u0646\u062F\u0647\u200C\u0646\u0634\u062F\u0647","Unread")}"></span>`:""}
            <a class="b" href="#/admin/tickets/${n.id}">${p(n.subject)}</a>
            <div class="tiny muted mono">${p(n.code)}</div>
            ${n.lastMessage?r`<div class="tiny muted clip">${p(n.lastMessage)}</div>`:""}
          </td>
          <td>${t(`tc.${n.category}`)}</td>
          <td><span class="badge-pill ${Pr[n.priority]||"bp-info"}">${t(`tp.${n.priority}`)}</span></td>
          <td class="tiny">${p(n.userName||"")}<div class="tiny muted mono">${ne(n.userPhone||"")}</div></td>
          <td class="num">${b(n.messageCount||0)}</td>
          <td><span class="badge-pill ${Dr[n.status]||"bp-muted"}">${t(`tk.${n.status}`)}</span></td>
          <td class="num tiny nowrap">${fe(n.updatedAt||n.createdAt)}</td>
          <td><a class="btn btn-ghost btn-xs" href="#/admin/tickets/${n.id}">${c("chevron-left")}</a></td>
        </tr>`),{emptyText:t("acc.noTickets")})}`}async function cd(e){let a=null;try{a=(await h.get(`/api/admin/tickets/${e}`)).ticket}catch(n){return n?.status===404?P({icon:"ticket",title:t("acc.noTickets"),action:{href:"#/admin/tickets",label:t("adm.tickets")}}):F({title:n?.message||t("err.generic")})}let s=a.user;return r`
    <div class="breadcrumb mb-s">
      <a href="#/admin/tickets">${t("adm.tickets")}</a> <span>/</span> <span class="mono">${p(a.code)}</span>
    </div>

    <div class="cart-grid">
      <div class="col">
        <div class="card">
          <div class="row row-between row-wrap">
            <div>
              <h2 class="buy-title">${c("ticket")} ${p(a.subject)}</h2>
              <p class="muted small mt-s">
                <span class="mono">${p(a.code)}</span> · ${t("acc.ticketCategory")}: ${t(`tc.${a.category}`)} ·
                ${H(a.createdAt)} · ${tt("\u0622\u062E\u0631\u06CC\u0646 \u0628\u0647\u200C\u0631\u0648\u0632\u0631\u0633\u0627\u0646\u06CC","Updated")}: ${fe(a.updatedAt||a.createdAt)}
              </p>
            </div>
            <div class="row row-wrap">
              <span class="badge-pill ${Dr[a.status]||"bp-muted"}">${t(`tk.${a.status}`)}</span>
              <span class="badge-pill ${Pr[a.priority]||"bp-info"}">${t(`tp.${a.priority}`)}</span>
            </div>
          </div>
        </div>

        <div class="card mt">
          <strong>${c("chat")} ${t("common.messages")} (${b(a.messages?.length||0)})</strong>
          <div class="tk-thread mt">
            ${(a.messages||[]).map(Rn).join("")}
          </div>
          <form class="mt" data-act="adm-tk-reply" data-id="${a.id}">
            <label class="field">
              <span class="label">${t("adm.tkReply")}</span>
              <textarea class="textarea" name="body" rows="3" placeholder="${tt("\u067E\u0627\u0633\u062E \u062E\u0648\u062F \u0631\u0627 \u0628\u0646\u0648\u06CC\u0633\u2026","Write your reply\u2026")}"></textarea>
            </label>
            <div class="row row-wrap mt-s">
              <button class="btn btn-primary" type="submit">${c("send")} ${t("common.send")}</button>
              <select class="select select-sm" name="status">
                <option value="answered">${t("tk.answered")}</option>
                <option value="open">${t("tk.open")}</option>
                <option value="closed">${t("tk.closed")}</option>
              </select>
            </div>
          </form>
        </div>
      </div>

      <aside class="col">
        <div class="card">
          <strong>${c("user")} ${p(s?.name||a.userName||"")}</strong>
          <div class="mt-s">
            <div class="sum-row"><span>${t("common.phone")}</span><span class="v mono">${ne(s?.phone||a.userPhone||"")}</span></div>
            ${s?.email?r`<div class="sum-row"><span>${t("common.email")}</span><span class="v tiny">${p(s.email)}</span></div>`:""}
            <div class="sum-row"><span>${t("acc.plus")}</span><span class="v">${s?.plus?r`<span class="badge-pill bp-accent">${t("common.active")}</span>`:r`<span class="muted">—</span>`}</span></div>
            <div class="sum-row"><span>${t("common.orders")}</span><span class="v">${b(s?.orders||0)}</span></div>
          </div>
          ${s?r`<a class="btn btn-ghost btn-sm btn-block mt-s" href="#/admin/users/${s.id}">${c("edit")} ${tt("\u0645\u062F\u06CC\u0631\u06CC\u062A \u06A9\u0627\u0631\u0628\u0631","Manage user")}</a>`:""}
        </div>

        <div class="card mt">
          <strong>${c("settings")} ${t("adm.tkManage")}</strong>
          <form class="mt-s" data-act="adm-tk-meta" data-id="${a.id}">
            <label class="field"><span class="label">${t("common.priority")}</span>
              <select class="select" name="priority">
                ${["critical","high","normal","low"].map(n=>r`<option value="${n}" ${a.priority===n?"selected":""}>${t(`tp.${n}`)}</option>`)}
              </select>
            </label>
            <button class="btn btn-outline btn-sm btn-block" type="submit">${t("common.save")}</button>
          </form>
          <div class="row row-wrap mt-s">
            ${a.status!=="closed"?r`<button class="btn btn-ghost btn-sm" data-act="adm-tk-status" data-id="${a.id}" data-status="closed">${c("check")} ${tt("\u0628\u0633\u062A\u0646 \u062A\u06CC\u06A9\u062A","Close ticket")}</button>`:r`<button class="btn btn-ghost btn-sm" data-act="adm-tk-status" data-id="${a.id}" data-status="open">${c("refresh")} ${tt("\u0628\u0627\u0632\u06A9\u0631\u062F\u0646","Reopen")}</button>`}
          </div>
        </div>
      </aside>
    </div>`}function Rn(e){let a=e.from==="staff",s=e.from==="system"?"them sys":a?"me":"them",n=a?e.staffName?`${t("common.support")} \xB7 ${e.staffName}`:t("common.support"):e.name||t("common.user");return r`
    <div class="msg ${s}">
      <div class="msg-bubble">
        <div class="row row-between">
          <strong class="tiny">${p(n)}</strong>
          <span class="tiny muted nowrap">${fe(e.at)}</span>
        </div>
        <div class="msg-text">${p(e.body||"").replace(/\n/g,"<br>")}</div>
        ${(e.attachments||[]).length?r`<div class="row row-wrap mt-s">${e.attachments.map(o=>r`<img class="tk-att" src="${p(o)}" alt="${t("common.image")}" loading="lazy" data-act="adm-att-open" data-url="${p(o)}">`)}</div>`:""}
      </div>
    </div>`}async function id(e){let a=null;try{a=await h.get("/api/admin/support")}catch(n){return F({title:n?.message||t("err.generic")})}oa=a.items||[];let s=oa.find(n=>n.userId===e)||null;return r`
    <div class="row row-between row-wrap mb">
      <h2 class="section-title">${c("chat")} ${t("adm.support")}</h2>
      <span class="badge-pill bp-info">${b(oa.reduce((n,o)=>n+(o.unread||0),0))} ${tt("\u062E\u0648\u0627\u0646\u062F\u0647\u200C\u0646\u0634\u062F\u0647","unread")}</span>
    </div>

    <div class="sup-grid">
      <div class="card sup-list">
        ${oa.length?oa.map(n=>r`
          <a class="sup-item ${s&&s.userId===n.userId?"active":""} ${n.unread?"has-new":""}" href="#/admin/support/${n.userId}">
            <span class="sup-av">${p((n.userName||"?").slice(0,1))}</span>
            <span class="grow">
              <span class="row row-between"><strong class="tiny">${p(n.userName||"")}</strong><span class="tiny muted nowrap">${fe(n.last?.at)}</span></span>
              <span class="tiny muted clip">${p(n.last?.body||"")}</span>
            </span>
            ${n.unread?r`<span class="badge-pill bp-danger">${b(n.unread)}</span>`:""}
          </a>`).join(""):r`<p class="muted small">${t("common.noData")}</p>`}
      </div>

      <div class="card sup-chat">
        ${s?r`
          <div class="row row-between mb-s">
            <strong>${c("user")} ${p(s.userName)}</strong>
            <span class="tiny muted">${b(s.count||0)} ${t("common.messages")}</span>
          </div>
          <div class="msg-thread sup-thread" data-thread>
            ${(s.messages||[]).map(Rn).join("")}
          </div>
          <form class="row mt-s" data-act="adm-sup-send" data-id="${s.userId}">
            <input class="input grow" name="body" placeholder="${tt("\u067E\u0627\u0633\u062E \u0633\u0631\u06CC\u0639\u2026","Quick reply\u2026")}" autocomplete="off">
            <button class="btn btn-primary" type="submit">${c("send")}</button>
          </form>
        `:P({icon:"chat",title:t("adm.supSelect"),text:t("adm.supSelectHint")})}
      </div>
    </div>`}function ld(e,a){if(L(e),a?.params?.section==="support"&&a.params.id){let s=e.querySelector("[data-thread]");s&&(s.scrollTop=s.scrollHeight)}return null}var tt,Dr,Pr,In,oa,Bn=O(()=>{B();W();Q();_();ce();X();le();ee();tt=(e,a)=>w()?e:a,Dr={open:"bp-warn",answered:"bp-success",closed:"bp-muted"},Pr={critical:"bp-danger",high:"bp-warn",normal:"bp-info",low:"bp-muted"},In={status:""};g("adm-tk-filter",(e,a)=>{e.preventDefault(),In.status=String(new FormData(a).get("status")||""),T(!0)});g("adm-att-open",(e,a)=>{e.preventDefault(),Mt([a.dataset.url],0,t("common.image"))});g("adm-tk-reply",async(e,a)=>{e.preventDefault();let s=new FormData(a),n=String(s.get("body")||"").trim();n.length<1||await A(a.querySelector("button[type=submit]"),async()=>{try{await h.patch(`/api/admin/tickets/${a.dataset.id}`,{body:n,status:s.get("status")||"answered"}),$(t("misc.sent")),T(!0)}catch(o){y(o)}})});g("adm-tk-meta",async(e,a)=>{e.preventDefault();try{await h.patch(`/api/admin/tickets/${a.dataset.id}`,{priority:new FormData(a).get("priority")}),$(t("misc.saved")),T(!0)}catch(s){y(s)}});g("adm-tk-status",async(e,a)=>{try{await h.patch(`/api/admin/tickets/${a.dataset.id}`,{status:a.dataset.status}),$(t("misc.saved")),T(!0)}catch(s){y(s)}});oa=[];g("adm-sup-send",async(e,a)=>{e.preventDefault();let s=a.querySelector("[name=body]"),n=String(s.value||"").trim();if(n){s.value="";try{await h.post(`/api/admin/support/${a.dataset.id}`,{body:n});let o=a.closest(".sup-chat")?.querySelector("[data-thread]");if(o){let l=document.createElement("div");l.innerHTML=Rn({from:"staff",staffName:d.me?.name||"",body:n,at:new Date().toISOString()}).trim(),l.firstElementChild&&o.appendChild(l.firstElementChild),o.scrollTop=o.scrollHeight}let i=oa.find(l=>l.userId===a.dataset.id);i&&(i.last={body:n,at:new Date().toISOString(),from:"staff"},i.unread=0),$(t("misc.sent"))}catch(o){y(o),s.value=n}}})});var Mr={};G(Mr,{mount:()=>ud,render:()=>md});async function md(){let e=null;try{e=await h.get(h.url("/api/admin/feedback",{type:Ot.type}))}catch(s){return F({title:s?.message||t("err.generic")})}let a=e.items||[];return Ot.status&&(a=a.filter(s=>s.status===Ot.status)),r`
    <div class="row row-between row-wrap mb">
      <div>
        <h2 class="section-title">${c("mail")} ${t("adm.feedback")}</h2>
        <p class="muted small">${b(e.counts?.total||a.length)} ${ra("\u0645\u0648\u0631\u062F","items")} · ${b(e.counts?.new||0)} ${ra("\u062C\u062F\u06CC\u062F","new")}</p>
      </div>
    </div>

    <form class="card mb adm-filter" data-act="adm-fb-filter">
      <div class="form-grid">
        ${U({label:t("common.type"),name:"type",value:Ot.type,options:[{value:"",label:t("common.all")},{value:"suggestion",label:t("feedback.suggestion")},{value:"complaint",label:t("feedback.complaint")},{value:"bug",label:t("feedback.bug")}]})}
        ${U({label:t("common.status"),name:"status",value:Ot.status,options:[{value:"",label:t("common.all")},...Object.entries(Fn).map(([s,[,n]])=>({value:s,label:n()}))]})}
      </div>
      <div class="row row-wrap mt-s">
        <button class="btn btn-primary btn-sm" type="submit">${c("filter")} ${t("common.apply")}</button>
      </div>
    </form>

    ${a.length?r`<div class="rev-list">${a.map(pd).join("")}</div>`:P({icon:"mail",title:t("common.noData"),text:t("adm.fbEmptyHint")})}`}function pd(e){let a=dd[e.type]||{icon:"mail",cls:"bp-muted"},[s,n]=Fn[e.status]||["bp-muted",()=>e.status];return r`
    <article class="card rev-card">
      <div class="row row-between row-wrap mb-s">
        <div class="row">
          <span class="fb-ic ${a.cls}">${c(a.icon)}</span>
          <div>
            <strong>${p(e.title||"")}</strong>
            <div class="tiny muted">
              ${t(`feedback.${e.type}`)} · ${p(e.userName||ra("\u0645\u0647\u0645\u0627\u0646","Guest"))} · ${fe(e.createdAt)}
              ${e.contact?` \xB7 ${p(e.contact)}`:""}${e.page?` \xB7 ${p(e.page)}`:""}
            </div>
          </div>
        </div>
        <span class="badge-pill ${s}">${n()}</span>
      </div>
      <p class="rev-body">${p(e.body||"")}</p>
      ${(e.attachments||[]).length?r`
        <div class="row row-wrap mt-s">
          ${e.attachments.map(o=>r`<img class="tk-att" src="${p(o)}" alt="" loading="lazy" data-act="adm-att-open" data-url="${p(o)}">`)}
        </div>`:""}
      ${e.device?.ua?r`<p class="tiny muted mono mt-s clip-wide">${p(e.device.ua)}${e.device.screen?` \xB7 ${p(e.device.screen)}`:""}</p>`:""}
      ${e.answer?r`
        <div class="rev-reply">
          <span class="tiny muted">${c("send")} ${ra("\u067E\u0627\u0633\u062E \u0645\u0627","Our answer")}</span>
          <p>${p(e.answer)}</p>
        </div>`:""}
      <form class="mt-s" data-act="adm-fb-save" data-id="${e.id}">
        <div class="row row-wrap">
          <select class="select select-sm" name="status">
            ${Object.entries(Fn).map(([o,[,i]])=>r`<option value="${o}" ${e.status===o?"selected":""}>${i()}</option>`)}
          </select>
          <input class="input grow" name="answer" value="${p(e.answer||"")}" placeholder="${ra("\u067E\u0627\u0633\u062E\u2026","Answer\u2026")}">
          <button class="btn btn-outline btn-sm" type="submit">${c("save")} ${t("common.save")}</button>
        </div>
      </form>
      <div class="tiny muted mt-s">${ra("\u062B\u0628\u062A","Created")}: ${H(e.createdAt)}</div>
    </article>`}function ud(e){return L(e),null}var ra,Ot,dd,Fn,Lr=O(()=>{B();W();Q();ce();X();le();ee();ra=(e,a)=>w()?e:a,Ot={type:"",status:""},dd={suggestion:{icon:"sparkles",cls:"bp-info"},complaint:{icon:"flag",cls:"bp-warn"},bug:{icon:"bug",cls:"bp-danger"}},Fn={new:["bp-info",()=>t("fb.new")],seen:["bp-muted",()=>t("fb.seen")],in_progress:["bp-warn",()=>t("fb.inProgress")],done:["bp-success",()=>t("fb.done")],rejected:["bp-danger",()=>t("fb.rejected")]};g("adm-fb-filter",(e,a)=>{e.preventDefault();let s=new FormData(a);Ot.type=String(s.get("type")||""),Ot.status=String(s.get("status")||""),T(!0)});g("adm-fb-save",async(e,a)=>{e.preventDefault();let s=new FormData(a);await A(a.querySelector("button[type=submit]"),async()=>{try{await h.patch(`/api/admin/feedback/${a.dataset.id}`,{status:s.get("status"),answer:String(s.get("answer")||"")}),$(t("misc.saved")),T(!0)}catch(n){y(n)}})})});var Br={};G(Br,{mount:()=>fd,render:()=>bd});async function bd(e){return e.params.id?gd(e.params.id):hd()}async function Ir(){let e=await h.get(h.url("/api/admin/users",{q:qt.q,role:qt.role}));return gt=e.items||[],Nr=e.permissions||[],e}async function hd(){let e=await vd(),a=null;try{a=await Ir()}catch(s){return F({title:s?.message||t("err.generic")})}return r`
    <div class="row row-between row-wrap mb">
      <div>
        <h2 class="section-title">${c("users")} ${t("adm.users")}</h2>
        <p class="muted small">${b(gt.length)} ${t("common.users")}</p>
      </div>
    </div>

    <form class="card mb adm-filter" data-act="adm-u-filter">
      <div class="form-grid">
        <label class="field"><span class="label">${t("common.search")}</span>
          <input class="input" name="q" value="${p(qt.q)}" placeholder="${t("common.name")} / ${t("common.username")} / ${t("common.phone")}">
        </label>
        ${U({label:t("adm.uRole"),name:"role",value:qt.role,options:[{value:"",label:t("common.all")},{value:"user",label:t("common.user")},{value:"staff",label:lt("\u06A9\u0627\u0631\u0645\u0646\u062F","Staff")},{value:"owner",label:lt("\u0645\u0627\u0644\u06A9","Owner")}]})}
      </div>
      <div class="row row-wrap mt-s">
        <button class="btn btn-primary btn-sm" type="submit">${c("filter")} ${t("common.apply")}</button>
        <button class="btn btn-ghost btn-sm" type="button" data-act="adm-u-clear">${c("close")} ${t("catalog.f.clear")}</button>
      </div>
    </form>

    ${re([{label:t("common.user")},{label:t("common.phone")},{label:t("adm.uRole")},{label:t("common.balance"),cls:"num"},{label:t("acc.plus"),cls:"num"},{label:t("common.orders"),cls:"num"},{label:t("adm.uDevice")},{label:t("common.status")},{label:"",cls:"num"}],gt.map(s=>r`
        <tr>
          <td>
            <span class="b">${p(s.name||s.username)}</span>
            <span class="tiny muted mono">@${p(s.username)}</span>
            ${s.twoFA?r`<span class="badge-pill bp-success tiny">${c("shield")}</span>`:""}
          </td>
          <td class="mono tiny nowrap">${ne(s.phone||"")}${s.email?r`<div class="tiny muted">${p(s.email)}</div>`:""}</td>
          <td>${Rr(s.role)}</td>
          <td>${Hr(s.kycStatus)}</td>
          <td class="num">${b(s.wallet||0)}</td>
          <td class="num">${s.plus?r`<span class="badge-pill bp-accent">${t("common.active")}</span>`:r`<span class="muted">—</span>`}</td>
          <td class="num">${b(s.orders||0)}<div class="tiny muted">${C(s.spent||0)}</div></td>
          <td class="tiny">${s.lastAgent?r`<span>${s.lastAgent.os} · ${s.lastAgent.device}</span><div class="muted mono tiny">${p(s.lastIp||"")}</div>`:r`<span class="muted">—</span>`}</td>
          <td>${s.banned?r`<span class="badge-pill bp-danger">${t("adm.banned")}</span>`:s.status==="blocked"?r`<span class="badge-pill bp-danger">${t("adm.uBlocked")}</span>`:r`<span class="badge-pill bp-success">${t("common.active")}</span>`}</td>
          <td><div class="row row-end">
            ${V("users.manage")?r`<button class="btn ${s.banned?"btn-success":"btn-danger"} btn-xs" data-act="adm-u-ban-toggle" data-id="${s.id}" data-val="${p(s.phone||s.username)}" data-banned="${s.banned?"1":""}" title="${s.banned?t("adm.unban"):t("adm.ban")}">${c(s.banned?"check":"lock")}</button>`:""}
            ${V("users.manage")?r`<a class="btn btn-ghost btn-xs" href="#/admin/users/${s.id}">${c("edit")}</a>`:""}
          </div></td>
        </tr>`),{emptyText:t("common.noResult")})}`}function Rr(e){let a={owner:"bp-accent",staff:"bp-info",user:"bp-muted"},s={owner:lt("\u0645\u0627\u0644\u06A9","Owner"),staff:lt("\u06A9\u0627\u0631\u0645\u0646\u062F","Staff"),user:t("common.user")}[e]||e;return r`<span class="badge-pill ${a[e]||"bp-muted"}">${s}</span>`}async function gd(e){try{gt.length||await Ir()}catch(i){return F({title:i?.message||t("err.generic")})}let a=gt.find(i=>i.id===e);if(!a)return P({icon:"user",title:t("common.noResult"),action:{href:"#/admin/users",label:t("adm.users")}});let s=a.permissions||{},n=d.me?.id===a.id,o=V("users.permissions");return r`
    <div class="breadcrumb mb-s">
      <a href="#/admin/users">${t("adm.users")}</a> <span>/</span> <span>${p(a.name||a.username)}</span>
    </div>

    <div class="card">
      <div class="row row-between row-wrap">
        <div>
          <h2 class="buy-title">${c("user")} ${p(a.name||a.username)} <span class="muted mono small">@${p(a.username)}</span></h2>
          <p class="muted small mt-s">
            ${ne(a.phone||"")}${a.email?` \xB7 ${p(a.email)}`:""} ·
            ${t("acc.memberSince",{date:H(a.createdAt,{time:!1})})} ·
            ${lt("\u0622\u062E\u0631\u06CC\u0646 \u0648\u0631\u0648\u062F","Last login")}: ${a.lastLoginAt?H(a.lastLoginAt):t("common.never")} (${b(a.loginCount||0)})
          </p>
        </div>
        <div class="row row-wrap">
          ${Rr(a.role)}
          ${a.status==="blocked"?r`<span class="badge-pill bp-danger">${t("adm.uBlocked")}</span>`:""}
          ${a.plus?r`<span class="badge-pill bp-accent">${t("acc.plus")} ${H(a.plusUntil,{time:!1})}</span>`:""}
        </div>
      </div>
      <div class="stats-grid mt">
        <div class="stat-card"><span class="stat-ic">${c("wallet")}</span><div><div class="stat-val">${b(a.wallet||0)}</div><div class="stat-lbl">${t("common.balance")}</div></div></div>
        <div class="stat-card"><span class="stat-ic">${c("gift")}</span><div><div class="stat-val">${b(a.points||0)}</div><div class="stat-lbl">${t("common.points")}</div></div></div>
        <div class="stat-card"><span class="stat-ic">${c("package-check")}</span><div><div class="stat-val">${b(a.orders||0)}</div><div class="stat-lbl">${t("common.orders")}</div></div></div>
        <div class="stat-card"><span class="stat-ic">${c("card")}</span><div><div class="stat-val">${C(a.spent||0)}</div><div class="stat-lbl">${lt("\u0645\u062C\u0645\u0648\u0639 \u062E\u0631\u06CC\u062F","Total spent")}</div></div></div>
      </div>
    </div>

    
    <!-- KYC Management -->
    ${a.kycStatus&&a.kycStatus!=="none"?r`
      <div class="card mt box pad border-warning">
        <h3 class="mb-3">${c("shield-check")} احراز هویت (KYC)</h3>
        <p class="muted">وضعیت فعلی: ${Hr(a.kycStatus)}</p>
        ${a.kycDocs?r`
          <div class="grid gap-3 mt-3">
            <div>
              <strong>سلفی:</strong> <a href="#" target="_blank">${a.kycDocs.selfie}</a>
            </div>
            <div>
              <strong>کارت ملی:</strong> <a href="#" target="_blank">${a.kycDocs.idCard}</a>
            </div>
            <div>
              <strong>فرم تعهدنامه:</strong> <a href="#" target="_blank">${a.kycDocs.formDoc}</a>
            </div>
          </div>
        `:""}
        <form class="mt-4 row row-wrap gap-2" onsubmit="event.preventDefault(); window.submitAdminKyc(event.target, '${a.id}')">
          <select class="input" name="kycStatus">
            <option value="pending" ${a.kycStatus==="pending"?"selected":""}>در انتظار</option>
            <option value="approved" ${a.kycStatus==="approved"?"selected":""}>تأیید شده</option>
            <option value="rejected" ${a.kycStatus==="rejected"?"selected":""}>رد شده</option>
          </select>
          <input class="input flex-1" name="kycMessage" placeholder="پیام در صورت رد شدن مدارک..." value="${p(a.kycMessage||"")}">
          <button class="btn primary" type="submit">${c("save")} ذخیره وضعیت KYC</button>
        </form>
      </div>
    `:""}

    <form class="card mt" data-act="adm-u-save" data-id="${a.id}">
      <div class="form-grid">
        ${U({label:t("adm.uRole"),name:"role",value:a.role,options:[{value:"user",label:t("common.user")},{value:"staff",label:lt("\u06A9\u0627\u0631\u0645\u0646\u062F","Staff")},...o&&(d.me?.role==="owner"||a.role!=="owner")?[{value:"owner",label:lt("\u0645\u0627\u0644\u06A9","Owner")}]:[]]})}
        ${U({label:t("adm.uStatus"),name:"status",value:a.status||"active",options:[{value:"active",label:t("common.active")},{value:"blocked",label:t("adm.uBlocked")}]})}
        ${x({label:t("common.points"),name:"points",type:"number",value:a.points||0,attrs:'min="0" max="1000000"'})}
      </div>

      ${o?r`
        <div class="row row-between row-wrap mt">
          <strong>${c("key")} ${t("adm.uPerms")}</strong>
          <div class="row">
            <button type="button" class="btn btn-ghost btn-xs" data-act="adm-perm-all" data-v="1">${t("adm.uAll")}</button>
            <button type="button" class="btn btn-ghost btn-xs" data-act="adm-perm-all" data-v="0">${t("adm.uNone")}</button>
          </div>
        </div>
        <p class="hint">${t("adm.uPermsHint")}</p>
        <div class="perm-grid mt-s">
          ${Nr.map(i=>r`
            <label class="perm-item">
              <span class="switch"><input type="checkbox" name="perm.${i.key}" ${s[i.key]?"checked":""}><span class="track"></span></span>
              <span class="grow">${p(w()?i.fa:i.en||i.fa)}<span class="k mono">${i.key}</span></span>
            </label>`)}
        </div>`:""}

      <div class="row row-wrap mt">
        <button class="btn btn-primary" type="submit">${c("save")} ${t("common.save")}</button>
        <a class="btn btn-ghost" href="#/admin/users">${t("common.back")}</a>
      </div>
    </form>

    <div class="acc-grid acc-grid-eq mt">
      ${V("wallet.manage")?r`
      <form class="card" data-act="adm-u-wallet" data-id="${a.id}">
        <strong>${c("wallet")} ${t("adm.uWalletAdjust")}</strong>
        <p class="muted small mt-s">${t("common.balance")}: ${C(a.wallet||0)}</p>
        ${x({label:t("common.amount"),name:"walletAdjust",type:"number",value:"",attrs:'min="-50000000" max="50000000" step="10000"',placeholder:"\xB1"})}
        ${x({label:t("adm.uWalletReason"),name:"walletReason",value:""})}
        <button class="btn btn-outline" type="submit">${t("common.apply")}</button>
      </form>`:""}

      ${V("plus.manage")?r`
      <form class="card" data-act="adm-u-plus" data-id="${a.id}">
        <strong>${c("sparkles")} ${t("adm.uPlusDays")}</strong>
        <p class="muted small mt-s">${a.plus?`${t("acc.plusActive",{date:H(a.plusUntil,{time:!1})})}`:t("acc.plusInactive")}</p>
        ${x({label:t("common.day"),name:"plusDays",type:"number",value:"30",attrs:'min="-365" max="365"'})}
        <div class="row row-wrap">
          <button class="btn btn-outline" type="submit">${t("common.apply")}</button>
          <button class="btn btn-ghost" type="button" data-act="adm-u-plus-off" data-id="${a.id}">${t("common.disabled")}</button>
        </div>
      </form>`:""}

      ${V("users.manage")&&!n?r`
      <form class="card" data-act="adm-u-pass" data-id="${a.id}">
        <strong>${c("key")} ${t("adm.uResetPass")}</strong>
        <p class="muted small mt-s">${lt("\u067E\u0633 \u0627\u0632 \u062A\u063A\u06CC\u06CC\u0631\u060C \u06A9\u0627\u0631\u0628\u0631 \u0628\u0627\u06CC\u062F \u062F\u0648\u0628\u0627\u0631\u0647 \u0648\u0627\u0631\u062F \u0634\u0648\u062F \u0648 \u0631\u0645\u0632 \u0631\u0627 \u0639\u0648\u0636 \u06A9\u0646\u062F.","The user must sign in again and change the password.")}</p>
        ${x({label:t("auth.newPassword"),name:"resetPassword",type:"text",value:"",hint:t("auth.passwordRules")})}
        <button class="btn btn-danger" type="submit">${t("common.reset")}</button>
      </form>`:""}
    </div>`}function fd(e){return L(e),null}async function vd(){if(!V("users.manage"))return"";let e={items:[]};try{e=await h.get("/api/admin/bans")}catch{return""}return r`
    <div class="card mb">
      <strong>${c("lock")} ${t("adm.bans")}</strong>
      <form class="form-grid mt-s" data-act="adm-ban-add">
        ${U({label:t("adm.banType"),name:"type",options:[{value:"ip",label:"IP"},{value:"phone",label:t("contact.mobile")},{value:"email",label:t("common.email")},{value:"username",label:t("common.username")}]})}
        ${x({label:t("adm.banValue"),name:"value",required:!0})}
        ${x({label:t("adm.banReason"),name:"reason"})}
        ${x({label:t("adm.banMinutes"),name:"minutes",type:"number",value:"0",attrs:'min="0" max="525600" inputmode="numeric"'})}
        <button class="btn btn-danger" type="submit">${c("lock")} ${t("adm.ban")}</button>
      </form>
      ${e.items?.length?r`<div class="table-wrap mt-s"><table class="table">
        <thead><tr><th>${t("adm.banType")}</th><th>${t("adm.banValue")}</th><th>${t("adm.banReason")}</th><th>${t("common.date")}</th><th></th></tr></thead>
        <tbody>${e.items.map(a=>r`<tr>
          <td class="tiny">${a.type}${a.auto?r` <span class="badge-pill bp-warn tiny">${t("adm.banAuto")}</span>`:""}</td><td class="mono tiny">${p(a.value)}</td><td class="tiny muted">${p(a.reason||"")}</td><td class="tiny">${H(a.at)}${a.until?r`<br><span class="muted">${t("adm.banUntil")}: ${H(a.until)}</span>`:""}</td>
          <td><button class="btn btn-success btn-xs" data-act="adm-ban-del" data-id="${a.id}">${c("check")} ${t("adm.unban")}</button></td>
        </tr>`)}</tbody></table></div>`:r`<p class="muted small mt-s">${t("adm.bansEmpty")}</p>`}
    </div>`}function Hr(e){return e==="approved"?r`<span class="${L("badge-pill bp-success")}">تأیید شده</span>`:e==="pending"?r`<span class="${L("badge-pill bp-warning")}">در انتظار</span>`:e==="rejected"?r`<span class="${L("badge-pill bp-danger")}">رد شده</span>`:r`<span class="${L("muted")}">—</span>`}var qt,Nr,gt,lt,Fr=O(()=>{B();W();Q();_();ce();X();le();ee();qt={q:"",role:""},Nr=[],gt=[];lt=(e,a)=>w()?e:a;g("adm-u-filter",(e,a)=>{e.preventDefault();let s=new FormData(a);qt.q=String(s.get("q")||"").trim(),qt.role=String(s.get("role")||""),T(!0)});g("adm-u-clear",()=>{qt.q="",qt.role="",T(!0)});g("adm-perm-all",(e,a)=>{let s=a.dataset.v==="1";a.closest("form").querySelectorAll('input[name^="perm."]').forEach(n=>{n.checked=s})});g("adm-u-save",async(e,a)=>{e.preventDefault();let s=new FormData(a),n={role:s.get("role"),status:s.get("status"),points:Number(s.get("points")||0)},o={},i=!1;a.querySelectorAll('input[name^="perm."]').forEach(l=>{o[l.name.slice(5)]=l.checked,i=!0}),i&&(n.permissions=o),await A(a.querySelector("button[type=submit]"),async()=>{try{await h.patch(`/api/admin/users/${a.dataset.id}`,n),$(t("adm.uSaved")),gt=[],T(!0)}catch(l){y(l)}})});g("adm-u-wallet",async(e,a)=>{e.preventDefault();let s=new FormData(a),n=Number(s.get("walletAdjust")||0);n&&await A(a.querySelector("button[type=submit]"),async()=>{try{await h.patch(`/api/admin/users/${a.dataset.id}`,{walletAdjust:n,walletReason:s.get("walletReason")||"\u062A\u0646\u0638\u06CC\u0645 \u062A\u0648\u0633\u0637 \u0645\u062F\u06CC\u0631"}),$(t("adm.uSaved")),gt=[],T(!0)}catch(o){y(o)}})});g("adm-u-plus",async(e,a)=>{e.preventDefault();let s=Number(new FormData(a).get("plusDays")||0);s&&await A(a.querySelector("button[type=submit]"),async()=>{try{await h.patch(`/api/admin/users/${a.dataset.id}`,{plusDays:s}),$(t("adm.uSaved")),gt=[],T(!0)}catch(n){y(n)}})});g("adm-u-plus-off",async(e,a)=>{if(await ge({text:lt("\u0627\u0634\u062A\u0631\u0627\u06A9 \u067E\u0644\u0627\u0633 \u0627\u06CC\u0646 \u06A9\u0627\u0631\u0628\u0631 \u063A\u06CC\u0631\u0641\u0639\u0627\u0644 \u0634\u0648\u062F\u061F","Disable Plus for this user?")}))try{await h.patch(`/api/admin/users/${a.dataset.id}`,{plusDays:-365}),$(t("adm.uSaved")),gt=[],T(!0)}catch(n){y(n)}});g("adm-u-pass",async(e,a)=>{e.preventDefault();let s=String(new FormData(a).get("resetPassword")||"");if(s.length<8){y({code:"weak_password",message:t("auth.passwordRules")});return}await A(a.querySelector("button[type=submit]"),async()=>{try{await h.patch(`/api/admin/users/${a.dataset.id}`,{resetPassword:s}),$(t("adm.uSaved")),a.reset()}catch(n){y(n)}})});g("adm-ban-add",async(e,a)=>{e.preventDefault();try{await h.post("/api/admin/bans",{type:a.type.value,value:a.value.value,reason:a.reason?.value||"",minutes:Number(a.minutes?.value)||0}),$(t("adm.banDone")),T(!0)}catch(s){y(s)}});g("adm-ban-del",async(e,a)=>{await A(a,async()=>{try{await h.del(`/api/admin/bans/${a.dataset.id}`),$(t("adm.unbanDone")),T(!0)}catch(s){y(s)}})});g("adm-u-ban-toggle",async(e,a)=>{if(a.dataset.banned==="1"){let i=((await h.get("/api/admin/bans")).items||[]).find(l=>l.value===String(a.dataset.val||"").toLowerCase());if(!i){toastError(t("err.generic"));return}try{await h.del(`/api/admin/bans/${i.id}`),$(t("adm.unbanDone")),T(!0)}catch(l){y(l)}return}let n=/^09\d{9}$/.test(a.dataset.val||"")?"phone":(a.dataset.val||"").includes("@")?"email":"username";try{await h.post("/api/admin/bans",{type:n,value:a.dataset.val,reason:t("adm.banByAdmin")}),$(t("adm.banDone")),T(!0)}catch(o){y(o)}})});var Ta={};G(Ta,{mount:()=>Ed,render:()=>yd});async function yd(e){let a=e.params.section;return a==="stats"?kd():a==="visitors"?qd():a==="data"?xd():$d()}async function $d(){let e=null;try{e=await h.get(h.url("/api/admin/audit",{q:He.q,action:He.action,page:He.page,limit:He.limit}))}catch(s){return F({title:s?.message||t("err.generic")})}let a=e.items||[];for(let s of a){let n=String(s.action||"").split(".")[0];n&&!On.includes(n)&&On.push(n)}return r`
    <div class="row row-between row-wrap mb">
      <div>
        <h2 class="section-title">${c("history")} ${t("adm.audit")}</h2>
        <p class="muted small">${b(e.total||0)} ${Pe("\u0631\u0648\u06CC\u062F\u0627\u062F","events")}</p>
      </div>
    </div>

    <form class="card mb adm-filter" data-act="adm-aud-filter">
      <div class="form-grid">
        <label class="field"><span class="label">${t("common.search")}</span>
          <input class="input" name="q" value="${p(He.q)}" placeholder="${Pe("\u06A9\u0627\u0631\u0628\u0631\u060C \u0631\u0648\u06CC\u062F\u0627\u062F\u060C \u0647\u062F\u0641\u2026","actor, action, target\u2026")}">
        </label>
        ${U({label:t("adm.audAction"),name:"action",value:He.action,options:[{value:"",label:t("common.all")},...On.sort().map(s=>({value:s,label:s}))]})}
      </div>
      <div class="row row-wrap mt-s">
        <button class="btn btn-primary btn-sm" type="submit">${c("filter")} ${t("common.apply")}</button>
        <button class="btn btn-ghost btn-sm" type="button" data-act="adm-aud-clear">${c("close")} ${t("catalog.f.clear")}</button>
      </div>
    </form>

    ${re([{label:t("common.date")},{label:t("adm.audActor")},{label:t("adm.audAction")},{label:t("adm.audTarget")},{label:t("adm.audMeta")}],a.map(s=>r`
        <tr>
          <td class="tiny nowrap" title="${H(s.at)}">${fe(s.at)}</td>
          <td class="tiny"><span class="b">${p(s.actorName||"")}</span><div class="tiny muted">${p(s.actorRole||"")}</div></td>
          <td><code class="tag mono">${p(s.action||"")}</code></td>
          <td class="tiny mono">${p(s.target||"")}</td>
          <td class="tiny muted clip-wide">${p(wd(s.meta))}</td>
        </tr>`),{emptyText:t("common.noData")})}
    ${e.pages>1?rt(e.page,e.pages,s=>`#/admin/audit?p=${s}`):""}`}function wd(e){return!e||typeof e!="object"?"":Object.entries(e).map(([a,s])=>`${a}=${typeof s=="object"?JSON.stringify(s):s}`).join(" \xB7 ").slice(0,160)}async function kd(){let e=null;try{e=await h.get(h.url("/api/admin/stats",{days:ca.days}))}catch(f){return F({title:f?.message||t("err.generic")})}let a=e.series||[],s=e.summary||{},n=Object.entries(e.byCat||{}).sort((f,v)=>v[1].sold-f[1].sold),o=Object.entries(e.byBrand||{}).sort((f,v)=>v[1]-f[1]).slice(0,12),i=e.missedSearches||[],l=ca.metric,m=a.map(f=>({label:f.date,short:f.date.slice(5),value:l==="revenue"?f.revenue:l==="visits"?f.visits:f.orders})),u=a.reduce((f,v)=>({orders:f.orders+v.orders,revenue:f.revenue+v.revenue,visits:f.visits+v.visits,unique:f.unique+v.unique}),{orders:0,revenue:0,visits:0,unique:0});return r`
    <div class="row row-between row-wrap mb">
      <h2 class="section-title">${c("chart")} ${t("adm.stats")}</h2>
      <form class="row row-wrap" data-act="adm-st-filter" data-live>
        <select class="select select-sm" name="days">
          ${[7,30,90].map(f=>r`<option value="${f}" ${ca.days===f?"selected":""}>${b(f)} ${Pe("\u0631\u0648\u0632","days")}</option>`)}
        </select>
        <select class="select select-sm" name="metric">
          <option value="orders" ${l==="orders"?"selected":""}>${t("adm.stOrders")}</option>
          <option value="revenue" ${l==="revenue"?"selected":""}>${t("adm.stRevenue")}</option>
          <option value="visits" ${l==="visits"?"selected":""}>${t("adm.stVisits")}</option>
        </select>
      </form>
    </div>

    <div class="kpi-grid mb">
      ${De({icon:"package-check",label:t("adm.stOrders"),value:b(s.orders||0),sub:`${Pe("\u062F\u0631 \u0627\u06CC\u0646 \u0628\u0627\u0632\u0647","in range")}: ${b(u.orders)}`})}
      ${De({icon:"wallet",label:t("adm.stRevenue"),value:C(s.revenue||0),sub:`${Pe("\u062F\u0631 \u0627\u06CC\u0646 \u0628\u0627\u0632\u0647","in range")}: ${C(u.revenue)}`})}
      ${De({icon:"users",label:t("adm.stUsers"),value:b(s.users||0),sub:`${Pe("\u0628\u0627\u0632\u062F\u06CC\u062F \u06CC\u06A9\u062A\u0627","unique visits")}: ${b(u.unique)}`})}
      ${De({icon:"box",label:t("adm.stProducts"),value:b(s.products||0),sub:`${Pe("\u0627\u0631\u0632\u0634 \u0645\u0648\u062C\u0648\u062F\u06CC","stock value")}: ${C(s.stockValue||0)}`})}
      ${De({icon:"scale",label:t("adm.stAvg"),value:C(s.avgOrder||0),sub:`${Pe("\u0645\u06CC\u0627\u0646\u06AF\u06CC\u0646 \u0633\u0628\u062F","average basket")}`})}
      ${De({icon:"eye",label:t("adm.stVisits"),value:b(u.visits),sub:`${Pe("\u062F\u0631 \u0627\u06CC\u0646 \u0628\u0627\u0632\u0647","in range")}`})}
    </div>

    <div class="card">
      <strong>${c("chart")} ${l==="revenue"?t("adm.stRevenue"):l==="visits"?t("adm.stVisits"):t("adm.stOrders")} — ${b(ca.days)} ${Pe("\u0631\u0648\u0632","days")}</strong>
      <div class="mt-s">${Za(m,{height:150})}</div>
    </div>

    <div class="cart-grid mt">
      <div class="col card">
        <strong>${c("layers")} ${t("adm.stByCat")}</strong>
        ${re([{label:t("common.category")},{label:t("common.products"),cls:"num"},{label:t("pdp.sold"),cls:"num"},{label:t("common.stock"),cls:"num"},{label:t("adm.stRevenue"),cls:"num"}],n.map(([f,v])=>r`
            <tr>
              <td class="b">${p(f)}</td>
              <td class="num">${b(v.products)}</td>
              <td class="num">${b(v.sold)}</td>
              <td class="num">${b(v.stock)}</td>
              <td class="num">${C(v.revenue)}</td>
            </tr>`),{emptyText:t("common.noData")})}
      </div>
      <aside class="col card">
        <strong>${c("tag")} ${t("adm.stByBrand")}</strong>
        <div class="mt-s">
          ${o.length?o.map(([f,v])=>{let S=o[0][1]||1;return r`
            <div class="brand-row">
              <span class="tiny">${p(f)}</span>
              <span class="progress"><i data-w="${Math.max(4,Math.round(v/S*100))}%"></i></span>
              <span class="tiny b">${b(v)}</span>
            </div>`}).join(""):r`<p class="muted small">${t("common.noData")}</p>`}
        </div>
      </aside>
    </div>
    
    <div class="card mt">
      <strong>${c("search")} ${w()?"\u062C\u0633\u062A\u062C\u0648\u0647\u0627\u06CC \u0628\u062F\u0648\u0646 \u0646\u062A\u06CC\u062C\u0647 (\u06A9\u0627\u0644\u0627\u0647\u0627\u06CC \u0646\u0627\u0645\u0648\u062C\u0648\u062F)":"Missed Searches (Not in stock)"}</strong>
      ${i.length?re([{label:w()?"\u0639\u0628\u0627\u0631\u062A \u062C\u0633\u062A\u062C\u0648 \u0634\u062F\u0647":"Query"},{label:w()?"\u062F\u0641\u0639\u0627\u062A \u062C\u0633\u062A\u062C\u0648":"Count",cls:"num"}],i.map(f=>r`
            <tr>
              <td>${p(f.q)}</td>
              <td class="num"><span class="badge-pill bp-warn">${b(f.count)}</span></td>
            </tr>`)):r`<p class="muted small mt-s">${t("common.empty")}</p>`}
    </div>`}function xd(){let e=d.me?.role==="owner";return r`
    <div class="row row-between row-wrap mb">
      <div>
        <h2 class="section-title">${c("download")} ${t("adm.data")}</h2>
        <p class="muted small">${t("adm.dataHint")}</p>
      </div>
    </div>

    <div class="card">
      <strong>${c("file")} ${t("adm.dExport")}</strong>
      <div class="exp-grid mt-s">
        ${Sd.map(a=>r`
          <div class="exp-item">
            <span class="exp-ic">${c(a.icon)}</span>
            <span class="grow b small">${a.label()}</span>
            <span class="act">
              <a class="btn btn-ghost btn-xs" href="${h.url(`/api/admin/export/${a.id}`,{format:"csv"})}" download>${Pe("CSV","CSV")}</a>
              <a class="btn btn-ghost btn-xs" href="/api/admin/export/${a.id}" download>JSON</a>
            </span>
          </div>`).join("")}
      </div>
    </div>

    <div class="dev-grid mt">
      <div class="card">
        <strong>${c("save")} ${t("adm.dBackup")}</strong>
        <p class="muted small mt-s">${t("adm.dBackupHint")}</p>
        ${e?r`<button class="btn btn-primary btn-sm mt-s" data-act="adm-d-backup">${c("save")} ${t("adm.dBackup")}</button>`:r`<p class="notice notice-warn mt-s">${c("lock")}<span>${Pe("\u0641\u0642\u0637 \u0645\u0627\u0644\u06A9 \u0645\u06CC\u200C\u062A\u0648\u0627\u0646\u062F \u067E\u0634\u062A\u06CC\u0628\u0627\u0646 \u0628\u06AF\u06CC\u0631\u062F.","Only the owner can create backups.")}</span></p>`}
      </div>
      <div class="card">
        <strong>${c("refresh")} ${t("adm.dCleanup")}</strong>
        <p class="muted small mt-s">${t("adm.dCleanupHint")}</p>
        <button class="btn btn-outline btn-sm mt-s" data-act="adm-d-cleanup">${c("trash")} ${t("adm.dCleanup")}</button>
      </div>
    </div>`}function Ed(e,a){if(L(e),a?.params?.section==="audit"){let s=new URLSearchParams(location.hash.split("?")[1]||""),n=Number(s.get("p")||0);n&&n!==He.page&&(He.page=n,T(!0))}return null}async function qd(){let e={items:[],total:0};try{e=await h.get(h.url("/api/admin/visitors",{q:jn.q||""}))}catch(a){return F({title:a?.message||t("err.generic")})}return r`
    <div class="row row-between row-wrap mb">
      <h2 class="section-title">${c("users")} ${t("adm.visitors")} <span class="muted small">(${b(e.total||0)})</span></h2>
      <form class="row" data-act="adm-vis-filter">
        <input class="input" name="q" value="${p(jn.q||"")}" placeholder="${t("common.search")}">
        <button class="btn btn-ghost" type="submit">${c("search")}</button>
      </form>
    </div>
    <div class="card">
      ${e.items?.length?r`<div class="table-wrap"><table class="table">
        <thead><tr><th>${t("common.date")}</th><th>IP</th><th>${t("adm.uDevice")}</th><th>${t("adm.uBrowser")}</th><th>${t("adm.uRegion")}</th><th>${t("adm.uPath")}</th><th>${t("common.user")}</th></tr></thead>
        <tbody>${e.items.map(a=>r`<tr>
          <td class="tiny nowrap">${H(a.at)}</td>
          <td class="mono tiny">${p(a.ip||"")}</td>
          <td class="tiny">${p(a.os||"")} · ${p(a.device||"")}${a.screen?r`<div class="muted tiny">${p(a.screen)}</div>`:""}</div></td>
          <td class="tiny">${p(a.browser||"")}</td>
          <td class="tiny">${p(a.tz||"")}<div class="muted tiny">${p(a.lang||"")}</div></td>
          <td class="mono tiny">${p(a.path||"/")}</td>
          <td class="tiny">${a.userId?r`<a href="#/admin/users/${a.userId}">${c("user")}</a>`:r`<span class="muted">${t("adm.guest")}</span>`}</td>
        </tr>`)}</tbody></table></div>`:P({icon:"users",title:t("common.noResult")})}
    </div>`}var Pe,He,ca,On,Sd,jn,Ca=O(()=>{B();W();Q();_();ce();X();le();ee();Pe=(e,a)=>w()?e:a,He={q:"",action:"",page:1,limit:50},ca={days:30,metric:"orders"},On=[];g("adm-aud-filter",(e,a)=>{e.preventDefault();let s=new FormData(a);He.q=String(s.get("q")||"").trim(),He.action=String(s.get("action")||""),He.page=1,T(!0)});g("adm-aud-clear",()=>{He.q="",He.action="",He.page=1,T(!0)});g("adm-st-filter",(e,a)=>{e.preventDefault();let s=new FormData(a);ca.days=Number(s.get("days")||30),ca.metric=String(s.get("metric")||"orders"),T(!0)});Sd=[{id:"products",icon:"box",label:()=>t("common.products")},{id:"orders",icon:"package-check",label:()=>t("common.orders")},{id:"users",icon:"users",label:()=>t("common.users")},{id:"reviews",icon:"star",label:()=>t("adm.reviews")},{id:"tickets",icon:"ticket",label:()=>t("adm.tickets")},{id:"audit",icon:"history",label:()=>t("adm.audit")},{id:"all",icon:"download",label:()=>Pe("\u0647\u0645\u0647\u0654 \u062F\u0627\u062F\u0647\u200C\u0647\u0627","Everything")}];g("adm-d-backup",async(e,a)=>{await A(a,async()=>{try{let s=await h.post("/api/admin/backup",{});$(`${t("adm.dBackup")}: ${s.file} (${b(s.sizeKb||0)} KB)`)}catch(s){y(s)}})});g("adm-d-cleanup",async(e,a)=>{await ge({text:Pe("\u0631\u0648\u06CC\u062F\u0627\u062F\u0647\u0627\u06CC \u0642\u062F\u06CC\u0645\u06CC\u200C\u062A\u0631 \u0627\u0632 \u06F9\u06F0 \u0631\u0648\u0632 \u0648 \u0646\u0634\u0633\u062A\u200C\u0647\u0627\u06CC \u0645\u0646\u0642\u0636\u06CC \u067E\u0627\u06A9 \u0634\u0648\u0646\u062F\u061F","Remove audit entries older than 90 days and expired sessions?"),danger:!0})&&await A(a,async()=>{try{let n=await h.post("/api/admin/maintenance/cleanup",{});$(`${Pe("\u0631\u0648\u06CC\u062F\u0627\u062F","audit")}: ${b(n.auditRemoved||0)} \xB7 ${Pe("\u0646\u0634\u0633\u062A","sessions")}: ${b(n.sessionsRemoved||0)}`)}catch(n){y(n)}})});jn={q:""};g("adm-vis-filter",(e,a)=>{e.preventDefault(),jn.q=a.q.value,T(!0)})});var la={};G(la,{mount:()=>Pd,render:()=>Td});async function Td(e){let a=e.params.section;return a==="ads"?Ad():a==="notifications"?Dd():a==="telegram"?Md():a==="lottery"?Ld():Cd()}async function Cd(){try{ia=(await h.get("/api/admin/coupons")).items||[]}catch(a){return F({title:a?.message||t("err.generic")})}let e=ia.filter(a=>a.active!==!1&&new Date(a.endAt)>new Date).length;return r`
    <div class="row row-between row-wrap mb">
      <div>
        <h2 class="section-title">${c("percent")} ${t("adm.coupons")}</h2>
        <p class="muted small">${b(ia.length)} ${me("\u06A9\u062F","codes")} · ${b(e)} ${me("\u0641\u0639\u0627\u0644","active")}</p>
      </div>
      <button class="btn btn-primary btn-sm" data-act="adm-cp-new">${c("plus")} ${t("common.add")}</button>
    </div>

    ${re([{label:t("cart.coupon")},{label:t("common.type")},{label:t("adm.cpValue"),cls:"num"},{label:t("adm.cpUsage"),cls:"num"},{label:t("adm.cpDates")},{label:t("common.status")},{label:"",cls:"num"}],ia.map(a=>{let s=new Date(a.endAt)<new Date;return r`
        <tr>
          <td><span class="mono b">${p(a.code)}</span>${a.note?r`<div class="tiny muted">${p(a.note)}</div>`:""}</td>
          <td>${a.type==="percent"?t("adm.cpPercent"):t("adm.cpAmount")}</td>
          <td class="num">${a.type==="percent"?`${b(a.value)}\u066A`:C(a.value)}
            ${a.maxDiscount?r`<div class="tiny muted">${me("\u0633\u0642\u0641","max")} ${C(a.maxDiscount)}</div>`:""}
            ${a.minOrder?r`<div class="tiny muted">${me("\u062D\u062F\u0627\u0642\u0644 \u0633\u0641\u0627\u0631\u0634","min order")} ${C(a.minOrder)}</div>`:""}</td>
          <td class="num">${b(a.used||0)} / ${b(a.usageLimit||0)}<div class="tiny muted">${me("\u0647\u0631 \u06A9\u0627\u0631\u0628\u0631","per user")}: ${b(a.perUser||1)}</div></td>
          <td class="tiny nowrap">${H(a.startAt,{time:!1})}<div class="tiny muted">${H(a.endAt,{time:!1})}</div></td>
          <td>${s?r`<span class="badge-pill bp-muted">${t("adm.cpExpired")}</span>`:a.active===!1?r`<span class="badge-pill bp-muted">${t("common.inactive")}</span>`:r`<span class="badge-pill bp-success">${t("common.active")}</span>`}</td>
          <td>
            <div class="act">
              <button class="btn btn-ghost btn-xs" data-act="adm-cp-toggle" data-id="${a.id}" title="${t("common.active")}">${c(a.active===!1?"eye-off":"eye")}</button>
              <button class="btn btn-ghost btn-xs" data-act="adm-cp-edit" data-id="${a.id}">${c("edit")}</button>
              <button class="btn btn-ghost btn-xs" data-act="adm-cp-copy" data-code="${p(a.code)}">${c("copy")}</button>
              <button class="btn btn-ghost btn-xs" data-act="adm-cp-del" data-id="${a.id}" data-name="${p(a.code)}">${c("trash")}</button>
            </div>
          </td>
        </tr>`}),{emptyText:t("common.noData")})}`}function Or(e){return ie({title:e?t("common.edit"):t("adm.cpNew"),body:r`
      <form class="form-grid" data-act="adm-cp-save" data-id="${e?.id||""}" data-isnew="${e?"":"1"}">
        ${x({label:t("cart.coupon"),name:"code",required:!e,value:e?.code||"",attrs:e?"readonly":"",hint:me("\u062D\u0631\u0648\u0641 \u0628\u0632\u0631\u06AF \u0627\u0646\u06AF\u0644\u06CC\u0633\u06CC \u0648 \u0639\u062F\u062F","Uppercase letters and digits")})}
        ${U({label:t("common.type"),name:"type",value:e?.type||"percent",options:[{value:"percent",label:t("adm.cpPercent")},{value:"amount",label:t("adm.cpAmount")}]})}
        ${x({label:t("adm.cpValue"),name:"value",type:"number",required:!0,value:e?.value??10,attrs:'min="1" max="100000000"'})}
        ${x({label:me("\u0633\u0642\u0641 \u062A\u062E\u0641\u06CC\u0641","Max discount"),name:"maxDiscount",type:"number",value:e?.maxDiscount??0,attrs:'min="0" max="100000000"'})}
        ${x({label:me("\u062D\u062F\u0627\u0642\u0644 \u0645\u0628\u0644\u063A \u0633\u0641\u0627\u0631\u0634","Minimum order"),name:"minOrder",type:"number",value:e?.minOrder??0,attrs:'min="0" max="100000000"'})}
        ${x({label:me("\u0633\u0642\u0641 \u0627\u0633\u062A\u0641\u0627\u062F\u0647\u0654 \u06A9\u0644","Total usage limit"),name:"usageLimit",type:"number",value:e?.usageLimit??100,attrs:'min="1" max="100000"'})}
        ${x({label:me("\u0633\u0642\u0641 \u0647\u0631 \u06A9\u0627\u0631\u0628\u0631","Per user"),name:"perUser",type:"number",value:e?.perUser??1,attrs:'min="1" max="100"'})}
        ${x({label:t("adm.cpStart"),name:"startAt",type:"datetime-local",value:bs(e?.startAt)})}
        ${x({label:t("adm.cpEnd"),name:"endAt",type:"datetime-local",value:bs(e?.endAt)})}
        <div class="span-2">${x({label:t("common.note"),name:"note",value:e?.note||""})}</div>
        <div class="span-2">${he({label:t("common.active"),name:"active",checked:e?e.active!==!1:!0})}</div>
        <button class="btn btn-primary span-2" type="submit">${t("common.save")}</button>
      </form>`})}function bs(e){if(!e)return"";let a=new Date(e);if(Number.isNaN(a.getTime()))return"";let s=n=>String(n).padStart(2,"0");return`${a.getFullYear()}-${s(a.getMonth()+1)}-${s(a.getDate())}T${s(a.getHours())}:${s(a.getMinutes())}`}async function Ad(){try{let e=await h.get("/api/admin/ads");us=e.items||[],Aa=e.slots||[]}catch(e){return F({title:e?.message||t("err.generic")})}return r`
    <div class="row row-between row-wrap mb">
      <div>
        <h2 class="section-title">${c("image")} ${t("adm.ads")}</h2>
        <p class="muted small">${t("adm.adsHint")}</p>
      </div>
      <button class="btn btn-primary btn-sm" data-act="adm-ad-new">${c("plus")} ${t("common.add")}</button>
    </div>

    ${Aa.length?Aa.map(e=>{let a=us.filter(s=>s.slot===e.id);return r`
      <div class="card mb">
        <div class="row row-between">
          <strong>${c("pin")} ${p(w()?e.fa:e.en||e.fa)}</strong>
          <span class="badge-pill bp-muted">${b(a.length)}</span>
        </div>
        ${a.length?r`
          <div class="ad-rows mt-s">
            ${a.map(s=>r`
              <div class="ad-row ${s.active===!1?"off":""}">
                ${s.image?r`<img class="ad-img" src="${p(s.image)}" alt="" loading="lazy" data-h="54px" data-w="88px">`:r`<span class="ad-img ph" data-h="54px" data-w="88px">${c("image")}</span>`}
                <div class="grow">
                  <span class="b">${p(w()?s.title:s.titleEn||s.title)}</span>
                  <span class="tiny muted">${p(w()?s.text||"":s.textEn||s.text||"")}</span>
                  <span class="tiny muted nowrap">${me("\u0627\u0632","From")} ${H(s.startAt,{time:!1})} ${me("\u062A\u0627","to")} ${H(s.endAt,{time:!1})}${s.link?` \xB7 ${p(s.link)}`:""}</span>
                </div>
                <div class="act">
                  <button class="btn btn-ghost btn-xs" data-act="adm-ad-toggle" data-id="${s.id}">${c(s.active===!1?"eye-off":"eye")}</button>
                  <button class="btn btn-ghost btn-xs" data-act="adm-ad-edit" data-id="${s.id}">${c("edit")}</button>
                  <button class="btn btn-ghost btn-xs" data-act="adm-ad-del" data-id="${s.id}" data-name="${p(s.title)}">${c("trash")}</button>
                </div>
              </div>`).join("")}
          </div>`:r`<p class="muted small mt-s">${t("common.noData")}</p>`}
      </div>`}).join(""):P({icon:"image",title:t("common.noData")})}`}function jr(e){return ie({title:e?t("common.edit"):t("adm.adNew"),body:r`
      <form class="form-grid" data-act="adm-ad-save" data-id="${e?.id||""}" data-isnew="${e?"":"1"}">
        <div class="span-2">${U({label:t("adm.adSlot"),name:"slot",value:e?.slot||Aa[0]?.id||"home_hero",options:Aa.map(a=>({value:a.id,label:w()?a.fa:a.en||a.fa}))})}</div>
        ${x({label:t("common.title"),name:"title",required:!0,value:e?.title||""})}
        ${x({label:me("\u0639\u0646\u0648\u0627\u0646 (\u0627\u0646\u06AF\u0644\u06CC\u0633\u06CC)","Title (EN)"),name:"titleEn",value:e?.titleEn||""})}
        <div class="span-2">${Y({label:t("common.text"),name:"text",value:e?.text||"",rows:2})}</div>
        <div class="span-2">${Y({label:me("\u0645\u062A\u0646 (\u0627\u0646\u06AF\u0644\u06CC\u0633\u06CC)","Text (EN)"),name:"textEn",value:e?.textEn||"",rows:2})}</div>
        ${x({label:t("common.link"),name:"link",value:e?.link||"",hint:"#/products?cat=cases"})}
        ${x({label:t("common.image"),name:"image",value:e?.image||"",hint:"/assets/\u2026"})}
        ${x({label:me("\u0645\u062A\u0646 \u062F\u06A9\u0645\u0647","CTA label"),name:"cta",value:e?.cta||""})}
        ${x({label:me("\u0645\u062A\u0646 \u062F\u06A9\u0645\u0647 (\u0627\u0646\u06AF\u0644\u06CC\u0633\u06CC)","CTA (EN)"),name:"ctaEn",value:e?.ctaEn||""})}
        ${x({label:me("\u0634\u0631\u0648\u0639","Start"),name:"startAt",type:"datetime-local",value:bs(e?.startAt)})}
        ${x({label:me("\u067E\u0627\u06CC\u0627\u0646","End"),name:"endAt",type:"datetime-local",value:bs(e?.endAt)})}
        <div class="span-2">${he({label:t("common.active"),name:"active",checked:e?e.active!==!1:!0})}</div>
        <button class="btn btn-primary span-2" type="submit">${t("common.save")}</button>
      </form>`})}async function Dd(){let e=null;try{e=await h.get("/api/admin/notifications")}catch(n){return F({title:n?.message||t("err.generic")})}let a=e.items||[],s=e.outbox||[];return r`
    <div class="row row-between row-wrap mb">
      <div>
        <h2 class="section-title">${c("bell")} ${t("adm.notifications")}</h2>
        <p class="muted small">${t("adm.notifHint")}</p>
      </div>
    </div>

    <div class="cart-grid">
      <div class="col">
        <form class="card" data-act="adm-notif-send">
          <strong>${c("send")} ${t("adm.notifNew")}</strong>
          <div class="form-grid mt-s">
            ${x({label:t("common.title"),name:"title",required:!0,attrs:'maxlength="120"'})}
            ${x({label:me("\u0639\u0646\u0648\u0627\u0646 (\u0627\u0646\u06AF\u0644\u06CC\u0633\u06CC)","Title (EN)"),name:"titleEn",attrs:'maxlength="120"'})}
            <div class="span-2">${Y({label:t("common.text"),name:"body",rows:3,attrs:'maxlength="600"'})}</div>
            <div class="span-2">${Y({label:me("\u0645\u062A\u0646 (\u0627\u0646\u06AF\u0644\u06CC\u0633\u06CC)","Text (EN)"),name:"bodyEn",rows:2})}</div>
            ${U({label:t("adm.notifLevel"),name:"level",value:"info",options:[{value:"info",label:t("notif.level.info")},{value:"success",label:t("notif.level.success")},{value:"warning",label:t("notif.level.warning")},{value:"error",label:t("notif.level.error")}]})}
            ${U({label:t("common.type"),name:"type",value:"announcement",options:[{value:"announcement",label:t("notif.type.announcement")},{value:"news",label:t("notif.type.news")},{value:"offer",label:t("notif.type.offer")},{value:"system",label:t("notif.type.system")}]})}
            ${x({label:t("common.link"),name:"link",hint:"#/products"})}
            ${x({label:me("\u0634\u0646\u0627\u0633\u0647\u0654 \u06A9\u0627\u0631\u0628\u0631 (\u062E\u0627\u0644\u06CC = \u0647\u0645\u0647)","User id (empty = everyone)"),name:"userId"})}
            <div class="span-2">
              <span class="label">${t("adm.channels")}</span>
              <div class="row row-wrap mt-s">
                <label class="check"><input type="checkbox" name="ch_site" checked><span class="box">${c("check")}</span><span>${t("adm.chSite")}</span></label>
                <label class="check"><input type="checkbox" name="ch_telegram"><span class="box">${c("check")}</span><span>${t("adm.chTelegram")}</span></label>
                <label class="check"><input type="checkbox" name="ch_email"><span class="box">${c("check")}</span><span>${t("adm.chEmail")}</span></label>
                <label class="check"><input type="checkbox" name="ch_sms"><span class="box">${c("check")}</span><span>${t("adm.chSms")}</span></label>
              </div>
              <p class="hint">${t("adm.channelsHint")}</p>
            </div>
          </div>
          <button class="btn btn-primary mt-s" type="submit">${c("send")} ${t("common.send")}</button>
        </form>
      </div>

      <aside class="col">
        <div class="card">
          <strong>${c("history")} ${t("adm.notifRecent")} (${b(a.length)})</strong>
          <div class="notif-list mt-s">
            ${a.length?a.slice(0,40).map(n=>r`
              <div class="notif-item lv-${p(n.level||"info")}">
                <div class="row row-between">
                  <strong class="tiny">${p(w()?n.title:n.titleEn||n.title)}</strong>
                  <span class="tiny muted nowrap">${fe(n.createdAt)}</span>
                </div>
                ${n.body?r`<p class="tiny muted">${p(w()?n.body:n.bodyEn||n.body)}</p>`:""}
                <span class="tiny muted mono">${n.userId?p(n.userId):me("\u0647\u0645\u0647\u0654 \u06A9\u0627\u0631\u0628\u0631\u0627\u0646","All users")}${n.link?` \xB7 ${p(n.link)}`:""}</span>
              </div>`).join(""):r`<p class="muted small">${t("common.noData")}</p>`}
          </div>
        </div>
        ${s.length?r`
        <div class="card mt">
          <strong>${c("mail")} ${me("\u0635\u0641 \u0627\u0631\u0633\u0627\u0644 \u067E\u06CC\u0627\u0645\u06A9/\u0627\u06CC\u0645\u06CC\u0644","SMS / email outbox")} (${b(s.length)})</strong>
          <div class="mt-s">
            ${s.map(n=>r`<div class="sum-row"><span class="tiny mono">${p(n.to||n.target||"")}</span><span class="v tiny">${p(String(n.body||n.text||"").slice(0,60))}</span></div>`).join("")}
          </div>
        </div>`:""}
      </aside>
    </div>`}function Pd(e){return L(e),null}async function Md(){let e=null;try{e=await h.get("/api/admin/telegram")}catch(a){return F({title:a?.message||t("err.generic")})}return r`
    <div class="cart-grid">
      <div class="col">
        <form class="card" data-act="adm-tg-save">
          <strong>${c("send")} ${t("adm.telegram")}</strong>
          <p class="muted small mt-s">${t("adm.tgHint")}</p>
          <div class="form-grid mt-s">
            <div class="span-2">${he({label:t("adm.tgEnabled"),name:"enabled",checked:!!e.enabled})}</div>
            <div class="span-2">${x({label:t("adm.tgToken"),name:"token",hint:t("adm.tgTokenHint"),type:"password"})}</div>
            <div class="span-2">${Y({label:t("adm.tgWelcome"),name:"welcome",rows:2,value:e.welcome||""})}</div>
          </div>
          <button class="btn btn-primary mt-s" type="submit">${c("check")} ${t("common.save")}</button>
        </form>
        <form class="card mt" data-act="adm-tg-test">
          <strong>${c("zap")} ${t("adm.tgTest")}</strong>
          <div class="row mt-s">
            <input class="input" name="chatId" placeholder="chat id" required>
            <button class="btn btn-ghost" type="submit">${t("common.send")}</button>
          </div>
        </form>
      </div>
      <aside class="col">
        <div class="card">
          <strong>${c("chat")} ${t("adm.tgInbox")} (${b(e.inbox?.length||0)}) · ${t("adm.tgSubs")}: ${b(e.subs||0)}</strong>
          ${e.enabled?r`
            <p class="tiny muted mt-s">
              ${me("\u0648\u0636\u0639\u06CC\u062A \u0627\u062A\u0635\u0627\u0644 \u0631\u0628\u0627\u062A:","bot link:")}
              ${e.lastError?r`<span class="c-danger">${me("\u062E\u0637\u0627","error")}: ${p(String(e.lastError).slice(0,120))}</span>`:r`<span class="c-success">${me("\u0633\u0627\u0644\u0645","healthy")}</span>`}
              · ${me("\u062D\u0627\u0644\u062A \u0627\u062A\u0635\u0627\u0644:","mode:")} ${e.webhook?.ok?me("\u0648\u0628\u200C\u0647\u0648\u06A9 \u2714","webhook \u2714"):me("\u067E\u0648\u0644\u06CC\u0646\u06AF","polling")}
              ${e.lastPoll?`\xB7 ${me("\u0622\u062E\u0631\u06CC\u0646 \u0628\u0631\u0631\u0633\u06CC:","last poll:")} ${fe(e.lastPoll)}`:""}
            </p>`:""}
          <div class="notif-list mt-s">
            ${(e.inbox||[]).slice(0,30).map(a=>r`
              <div class="notif-item lv-info">
                <div class="row row-between"><strong class="tiny">${p(a.name)}</strong><span class="tiny muted">${fe(a.at)}</span></div>
                <p class="tiny mt-s">${p(a.text)}</p>
                <form class="row mt-s" data-act="adm-tg-reply" data-chat="${p(a.chatId)}">
                  <input class="input" name="text" placeholder="${t("adm.tgReplyPh")}" required>
                  <button class="btn btn-ghost btn-sm" type="submit">${c("send")}</button>
                </form>
              </div>`)}
            ${(e.inbox||[]).length?"":r`<p class="muted small">${t("adm.tgInboxEmpty")}</p>`}
          </div>
        </div>
      </aside>
    </div>`}async function Ld(){let e=null;try{e=await h.get("/api/admin/lotteries")}catch(a){return F({title:a?.message||t("err.generic")})}return r`
    <div class="cart-grid">
      <div class="col">
        <form class="card" data-act="adm-lot-create">
          <strong>${c("gift2")} ${t("adm.lotteryNew")}</strong>
          <div class="form-grid mt-s">
            ${x({label:t("common.title"),name:"title",required:!0})}
            ${x({label:t("adm.lotPrize"),name:"prize",required:!0})}
            ${x({label:t("adm.lotEnds"),name:"endsAt",type:"datetime-local",required:!0})}
            ${x({label:t("adm.lotWinners"),name:"winnersCount",type:"number",value:"1"})}
            <div class="span-2">${U({label:t("adm.lotMode"),name:"entryMode",options:[{value:"orders",label:t("adm.lotModeOrders")},{value:"manual",label:t("adm.lotModeManual")}]})}</div>
          </div>
          <button class="btn btn-primary mt-s" type="submit">${c("plus")} ${t("common.create")}</button>
        </form>
      </div>
      <aside class="col">
        <div class="card">
          <strong>${c("gift2")} ${t("adm.lottery")} (${b(e.items?.length||0)})</strong>
          <div class="notif-list mt-s">
            ${(e.items||[]).map(a=>r`
              <div class="notif-item lv-${a.status==="drawn"?"success":a.status==="active"?"info":"warning"}">
                <div class="row row-between"><strong class="tiny">${p(a.title)}</strong><span class="tiny muted">${a.status}</span></div>
                <p class="tiny mt-s">${t("adm.lotPrize")}: ${p(a.prize)} · ${t("adm.lotEntries")}: ${b(a.entries||0)} · ${t("adm.lotEnds")}: ${p(a.endsAt||"")}</p>
                ${a.winners?.length?r`<p class="tiny mt-s b">${t("adm.lotWinnersList")}: ${a.winners.map(s=>p(s.name)).join("\u060C ")}</p>`:""}
                ${a.status==="active"?r`<div class="row mt-s">
                  <button class="btn btn-primary btn-sm" data-act="adm-lot-run" data-id="${a.id}">${c("sparkles")} ${t("adm.lotRun")}</button>
                  <button class="btn btn-ghost btn-sm" data-act="adm-lot-close" data-id="${a.id}">${c("close")} ${t("adm.lotClose")}</button>
                </div>`:""}
              </div>`)}
            ${(e.items||[]).length?"":r`<p class="muted small">${t("adm.lotEmpty")}</p>`}
          </div>
        </div>
      </aside>
    </div>`}var me,ia,us,Aa,Un,zn,da=O(()=>{B();W();Q();ce();X();le();ee();me=(e,a)=>w()?e:a,ia=[],us=[],Aa=[];Un=null;g("adm-cp-new",()=>{Un=Or(null)});g("adm-cp-edit",(e,a)=>{Un=Or(ia.find(s=>s.id===a.dataset.id))});g("adm-cp-toggle",async(e,a)=>{let s=ia.find(n=>n.id===a.dataset.id);if(s)try{await h.patch(`/api/admin/coupons/${s.id}`,{active:s.active===!1}),T(!0)}catch(n){y(n)}});g("adm-cp-copy",async(e,a)=>{try{await navigator.clipboard.writeText(a.dataset.code),$(t("misc.copied"))}catch{$(a.dataset.code)}});g("adm-cp-del",async(e,a)=>{if(await Oe(a.dataset.name))try{await h.del(`/api/admin/coupons/${a.dataset.id}`),$(t("misc.deleted")),T(!0)}catch(s){y(s)}});g("adm-cp-save",async(e,a)=>{e.preventDefault();let s=new FormData(a),n=a.dataset.isnew==="1",o={type:s.get("type"),value:Number(s.get("value")||0),maxDiscount:Number(s.get("maxDiscount")||0),minOrder:Number(s.get("minOrder")||0),usageLimit:Number(s.get("usageLimit")||100),perUser:Number(s.get("perUser")||1),active:s.get("active")==="on",note:s.get("note")||""};s.get("startAt")&&(o.startAt=new Date(s.get("startAt")).toISOString()),s.get("endAt")&&(o.endAt=new Date(s.get("endAt")).toISOString()),n&&(o.code=String(s.get("code")||"").toUpperCase()),await A(a.querySelector("button[type=submit]"),async()=>{try{n?await h.post("/api/admin/coupons",o):await h.patch(`/api/admin/coupons/${a.dataset.id}`,o),$(t("misc.saved")),Un?.close(),T(!0)}catch(i){y(i)}})});zn=null;g("adm-ad-new",()=>{zn=jr(null)});g("adm-ad-edit",(e,a)=>{zn=jr(us.find(s=>s.id===a.dataset.id))});g("adm-ad-toggle",async(e,a)=>{let s=us.find(n=>n.id===a.dataset.id);if(s)try{await h.patch(`/api/admin/ads/${s.id}`,{active:s.active===!1}),T(!0)}catch(n){y(n)}});g("adm-ad-del",async(e,a)=>{if(await Oe(a.dataset.name))try{await h.del(`/api/admin/ads/${a.dataset.id}`),$(t("misc.deleted")),T(!0)}catch(s){y(s)}});g("adm-ad-save",async(e,a)=>{e.preventDefault();let s=new FormData(a),n=a.dataset.isnew==="1",o={slot:s.get("slot"),title:s.get("title"),titleEn:s.get("titleEn")||"",text:s.get("text")||"",textEn:s.get("textEn")||"",link:s.get("link")||"",image:s.get("image")||"",cta:s.get("cta")||"",ctaEn:s.get("ctaEn")||"",active:s.get("active")==="on"};s.get("startAt")&&(o.startAt=new Date(s.get("startAt")).toISOString()),s.get("endAt")&&(o.endAt=new Date(s.get("endAt")).toISOString()),await A(a.querySelector("button[type=submit]"),async()=>{try{n?await h.post("/api/admin/ads",o):await h.patch(`/api/admin/ads/${a.dataset.id}`,o),$(t("misc.saved")),zn?.close(),T(!0)}catch(i){y(i)}})});g("adm-notif-send",async(e,a)=>{e.preventDefault();let s=new FormData(a),n={title:String(s.get("title")||"").trim(),titleEn:String(s.get("titleEn")||"").trim(),body:String(s.get("body")||"").trim(),bodyEn:String(s.get("bodyEn")||"").trim(),level:s.get("level"),type:s.get("type"),link:String(s.get("link")||"").trim(),userId:String(s.get("userId")||"").trim(),channels:["site","telegram","email","sms"].filter(o=>s.get(`ch_${o}`))};n.title.length<3||await A(a.querySelector("button[type=submit]"),async()=>{try{let i=(await h.post("/api/admin/notifications",n)).results||{},l=Object.entries(i).map(([m,u])=>`${m}: ${u.error?"\u2717":`\u2713${u.ok??""}`}`).join(" ");$(l?`${t("misc.sent")} \u2014 ${l}`:t("misc.sent"),{timeout:4200}),T(!0)}catch(o){y(o)}})});g("adm-tg-save",async(e,a)=>{e.preventDefault();let s={enabled:!!a.enabled?.checked};a.token?.value&&(s.token=a.token.value),a.welcome!==void 0&&(s.welcome=a.welcome.value),await A(a.querySelector("button[type=submit]"),async()=>{try{await h.post("/api/admin/telegram",s),$(t("common.saved")),T(!0)}catch(n){y(n)}})});g("adm-tg-test",async(e,a)=>{e.preventDefault();try{await h.post("/api/admin/telegram/test",{chatId:a.chatId.value}),$(t("misc.sent"))}catch(s){y(s)}});g("adm-tg-reply",async(e,a)=>{e.preventDefault();try{await h.post("/api/admin/telegram/reply",{chatId:a.dataset.chat,text:a.text.value}),$(t("misc.sent")),a.text.value=""}catch(s){y(s)}});g("adm-lot-create",async(e,a)=>{e.preventDefault();let s=new Date(a.endsAt.value).toISOString();await A(a.querySelector("button[type=submit]"),async()=>{try{await h.post("/api/admin/lotteries",{title:a.title.value,prize:a.prize.value,endsAt:s,winnersCount:Number(a.winnersCount.value||1),entryMode:a.entryMode.value}),$(t("common.saved")),T(!0)}catch(n){y(n)}})});g("adm-lot-run",async(e,a)=>{await ge({text:t("adm.lotRunWarn"),danger:!0})&&await A(a,async()=>{try{let n=await h.post(`/api/admin/lotteries/${a.dataset.id}/run`,{});$(`${t("adm.lotDone")}: ${(n.lottery?.winners||[]).map(o=>o.name).join("\u060C ")}`,{timeout:6e3}),T(!0)}catch(n){y(n)}})});g("adm-lot-close",async(e,a)=>{await A(a,async()=>{try{await h.post(`/api/admin/lotteries/${a.dataset.id}/close`,{}),$(t("adm.lotClosed")),T(!0)}catch(s){y(s)}})})});var Da={};G(Da,{mount:()=>Od,render:()=>Nd});async function Nd(e){let a=["settings","theme","features"].includes(e.params.section)?e.params.section:"settings",s=Ur[a].filter(i=>a==="theme"?V("theme.edit"):!0);if(!s.length)return P({icon:"lock",title:t("adm.noPermission")});let n=s.find(i=>i.id===e.params.id)||s[0];try{hs=await h.get("/api/admin/settings")}catch(i){return F({title:i?.message||t("err.generic")})}let o=hs.settings?.[n.id]||{};return r`
    <div class="row row-between row-wrap mb">
      <h2 class="section-title">${c(n.icon)} ${n.label()}</h2>
      <span class="badge-pill bp-info">${t("adm.liveView")}</span>
    </div>
    <div class="tabs mb" data-tabs>
      ${Ur[a].filter(i=>a==="theme"?V("theme.edit"):!0).map(i=>r`
        <a class="tab ${i.id===n.id?"active":""}" href="#/admin/${a}/${i.id}">${c(i.icon)} ${i.label()}</a>`)}
    </div>
    ${n.id==="features"?Hd(hs.settings?.features||{}):n.id==="backups"?pe("<div data-backups-panel></div>"):n.id==="partners"?Bd(hs.settings?.partners?.items||[]):Id(n.id,o)}
    <p class="hint mt">${D("\u062A\u063A\u06CC\u06CC\u0631\u0647\u0627 \u0628\u0644\u0627\u0641\u0627\u0635\u0644\u0647 \u0631\u0648\u06CC \u0633\u0627\u06CC\u062A \u0627\u0639\u0645\u0627\u0644 \u0645\u06CC\u200C\u0634\u0648\u062F\u061B \u0628\u0631\u0627\u06CC \u062F\u06CC\u062F\u0646 \u0646\u062A\u06CC\u062C\u0647 \u0635\u0641\u062D\u0647 \u0631\u0627 \u062A\u0627\u0632\u0647 \u06A9\u0646.","Changes apply to the site immediately; refresh the page to see them.")}</p>`}function Id(e,a){let s=Wr[e]||[];return r`
    <form class="card" data-act="adm-set-save" data-section="${e}">
      <div class="form-grid">
        ${s.map(n=>Rd(n,a[n.k])).join("")}
      </div>
      <div class="row row-wrap mt">
        <button class="btn btn-primary" type="submit">${c("save")} ${t("common.save")}</button>
        <button class="btn btn-ghost" type="button" data-act="adm-set-reset">${c("refresh")} ${t("common.reset")}</button>
      </div>
    </form>`}function Rd(e,a){let s=e.label();switch(e.type){case"bool":return r`<div class="span-2">${he({label:s,desc:e.hint?e.hint():"",name:e.k,checked:a!==!1})}</div>`;case"select":return U({label:s,name:e.k,value:a??"",options:e.options().map(([n,o])=>({value:n,label:o}))});case"number":return x({label:s,name:e.k,type:"number",value:a??"",attrs:`min="${e.min??0}" max="${e.max??999999999}" step="${e.step??1}"`});case"textarea":return r`<div class="span-2">${Y({label:s,name:e.k,value:a??"",rows:3})}</div>`;case"color":return r`
        <label class="field"><span class="label">${s}</span>
          <span class="row color-row">
            <input type="color" class="color-pick" name="${e.k}-pick" value="${p(a||"#31afd4")}" data-color-for="${e.k}">
            <input class="input mono" name="${e.k}" value="${p(a||"#31afd4")}" maxlength="7" data-fkey="${e.k}">
          </span>
        </label>`;case"coords":return r`
        <div class="span-2"><span class="label">${s}</span>
          <div class="row">
            <input class="input mono" name="${e.k}.lat" value="${a?.lat??""}" placeholder="lat" data-fnum="1">
            <input class="input mono" name="${e.k}.lng" value="${a?.lng??""}" placeholder="lng" data-fnum="1">
            <button type="button" class="btn btn-ghost btn-sm" data-act="adm-set-geo" data-lat="${e.k}.lat" data-lng="${e.k}.lng">${c("pin")} ${t("contact.allowLocation")}</button>
          </div>
        </div>`;case"group":return r`
        <div class="span-2 group-box">
          <strong class="small">${s}</strong>
          <div class="form-grid mt-s">
            ${e.fields.map(n=>n.type==="bool"?r`<div class="span-2">${he({label:n.label(),name:`${e.k}.${n.k}`,checked:a?.[n.k]!==!1})}</div>`:n.type==="number"?x({label:n.label(),name:`${e.k}.${n.k}`,type:"number",value:a?.[n.k]??""}):x({label:n.label(),name:`${e.k}.${n.k}`,value:a?.[n.k]??"",type:n.k==="pass"||n.k==="apiKey"?"password":"text"})).join("")}
          </div>
        </div>`;case"kv":return r`
        <div class="span-2"><span class="label">${s}</span>
          <div class="form-grid">
            ${e.keys.map(n=>r`<label class="field"><span class="label tiny muted mono">${n}</span>
              <input class="input" name="${e.k}.${n}" value="${p(a?.[n]??"")}"></label>`)}
          </div>
        </div>`;case"kvnum":return r`
        <div class="span-2"><span class="label">${s}</span>
          <div class="form-grid">
            ${e.keys.map(n=>r`<label class="field"><span class="label tiny muted">${t(`adm.uCols${n.charAt(0).toUpperCase()}${n.slice(1)}`)}</span>
              <input class="input" type="number" min="${e.min}" max="${e.max}" name="${e.k}.${n}" value="${a?.[n]??""}"></label>`)}
          </div>
        </div>`;case"multi":return r`
        <div class="span-2"><span class="label">${s}</span>
          <div class="row row-wrap">
            ${e.options().map(([n,o])=>r`<label class="check"><input type="checkbox" name="${e.k}[]" value="${n}" ${(a||[]).includes(n)?"checked":""}><span class="box">${c("check")}</span><span>${o}</span></label>`)}
          </div>
        </div>`;case"rows":return r`
        <div class="span-2">
          <div class="row row-between">
            <span class="label">${s}</span>
            <button type="button" class="btn btn-ghost btn-xs" data-act="adm-row-add" data-row="${e.k}">${c("plus")} ${t("common.add")}</button>
          </div>
          <div data-rows="${e.k}">
            ${(Array.isArray(a)?a:[]).map(n=>zr(e,n)).join("")}
          </div>
          <template data-row-tpl="${e.k}">${zr(e,null)}</template>
        </div>`;default:return x({label:s,name:e.k,value:a??""})}}function zr(e,a){return r`
    <div class="spec-row" data-row="${e.k}">
      ${e.cols.map(s=>{let n=a?.[s.k]??"";return s.type==="select"?r`<select class="select" data-col="${s.k}">${s.options().map(([o,i])=>r`<option value="${o}" ${String(n)===String(o)?"selected":""}>${i}</option>`)}</select>`:s.type==="number"?r`<input class="input" type="number" data-col="${s.k}" value="${p(n)}" placeholder="${s.label?s.label():s.k}">`:r`<input class="input" data-col="${s.k}" value="${p(n)}" placeholder="${s.label?s.label():s.k}">`})}
      <button type="button" class="btn btn-ghost btn-icon btn-sm" data-act="adm-row-del">${c("trash")}</button>
    </div>`}function Hd(e){let a=Object.keys(e);return r`
    <form class="card" data-act="adm-set-save" data-section="features">
      <p class="notice notice-info mb">${c("info")}<span>${t("adm.fHint")}</span></p>
      <div class="perm-grid">
        ${a.map(s=>r`
          <label class="perm-item">
            <span class="switch"><input type="checkbox" name="features.${s}" ${e[s]!==!1?"checked":""}><span class="track"></span></span>
            <span class="grow">${t(`feat.${s}`)||s}<span class="k mono">${s}</span></span>
          </label>`)}
      </div>
      <div class="row row-wrap mt">
        <button class="btn btn-primary" type="submit">${c("save")} ${t("common.save")}</button>
        <button class="btn btn-ghost" type="button" data-act="adm-set-reset">${c("refresh")} ${t("common.reset")}</button>
      </div>
    </form>`}function Bd(e){let a=s=>r`
    <div class="row pt-row" data-ptrow>
      <input class="input" name="fa" placeholder="${t("adm.ptFa")}" value="${s?.fa||""}" maxlength="60">
      <input class="input" name="en" placeholder="${t("adm.ptEn")}" value="${s?.en||""}" maxlength="60">
      <button type="button" class="btn btn-ghost btn-sm" data-act="adm-pt-del" aria-label="${t("misc.delete")}">${c("trash")}</button>
    </div>`;return r`
    <form class="card" data-act="adm-set-save" data-section="partners">
      <p class="notice notice-info mb">${c("info")}<span>${t("adm.ptHint")}</span></p>
      <div class="col" data-ptlist>${e.map(s=>a(s)).join("")||a(null)}</div>
      <div class="row row-wrap mt">
        <button type="button" class="btn btn-ghost" data-act="adm-pt-add">${c("plus")} ${t("adm.ptAdd")}</button>
        <button class="btn btn-primary" type="submit">${c("save")} ${t("common.save")}</button>
      </div>
    </form>`}function Fd(e,a){let s={};if(a==="features")return e.querySelectorAll('input[type=checkbox][name^="features."]').forEach(n=>{s[n.name.slice(9)]=n.checked}),s;if(a==="partners")return s.items=[...e.querySelectorAll("[data-ptrow]")].map(n=>({fa:n.querySelector("[name=fa]").value.trim(),en:n.querySelector("[name=en]").value.trim()})).filter(n=>n.fa||n.en),s;for(let n of Wr[a]||[])switch(n.type){case"bool":{let o=e.querySelector(`[name="${n.k}"]`);o&&(s[n.k]=o.checked);break}case"multi":{s[n.k]=[...e.querySelectorAll(`[name="${n.k}[]"]`)].filter(o=>o.checked).map(o=>o.value);break}case"rows":{s[n.k]=[...e.querySelectorAll(`[data-rows="${n.k}"] [data-row]`)].map(o=>{let i={};for(let l of n.cols){let m=o.querySelector(`[data-col="${l.k}"]`);i[l.k]=l.type==="number"?Number(m?.value||0):String(m?.value??"")}return i});break}case"kv":{let o={};for(let i of n.keys)o[i]=String(e.querySelector(`[name="${n.k}.${i}"]`)?.value??"");s[n.k]=o;break}case"group":{let o={};for(let i of n.fields){let l=e.querySelector(`[name="${n.k}.${i.k}"]`);l&&(o[i.k]=i.type==="bool"?l.checked:i.type==="number"?Number(l.value||0):String(l.value??""))}s[n.k]=o;break}case"kvnum":{let o={};for(let i of n.keys)o[i]=Number(e.querySelector(`[name="${n.k}.${i}"]`)?.value||0);s[n.k]=o;break}case"coords":{let o=e.querySelector(`[name="${n.k}.lat"]`)?.value,i=e.querySelector(`[name="${n.k}.lng"]`)?.value;o!==""&&i!==""&&o!==void 0&&(s[n.k]={lat:Number(o),lng:Number(i)});break}case"number":{let o=e.querySelector(`[name="${n.k}"]`);o&&o.value!==""&&(s[n.k]=Number(o.value));break}default:{let o=e.querySelector(`[name="${n.k}"]`);o&&(s[n.k]=String(o.value??""))}}return s}function Od(e,a){return L(e),a?.params?.id==="backups"&&_r(e),e.querySelectorAll("[data-color-for]").forEach(s=>{let n=e.querySelector(`[name="${s.dataset.colorFor}"]`);s.addEventListener("input",()=>{n&&(n.value=s.value)}),n?.addEventListener("input",()=>{/^#[0-9a-f]{6}$/i.test(n.value)&&(s.value=n.value)})}),null}async function _r(e){let a=e.querySelector("[data-backups-panel]");if(a){a.innerHTML='<div class="sk sk-line w70"></div>';try{let s=await h.get("/api/admin/backups");a.innerHTML=r`
      <div class="card">
        <div class="row row-between row-wrap">
          <strong>${c("download")} ${t("adm.sBackups")}</strong>
          <div class="row row-wrap">
            <a class="btn btn-ghost btn-sm" href="/api/admin/dump" download>${c("download")} ${t("adm.dumpFull")}</a>
            <button type="button" class="btn btn-primary btn-sm" data-act="adm-backup-now">${c("plus")} ${t("adm.backupNow")}</button>
          </div>
        </div>
        <p class="muted small mt-s">${t("adm.backupsHint",{hours:b(s.everyHours||12),keep:b(s.keep||14)})}</p>
        ${s.items?.length?r`<div class="table-wrap mt-s"><table class="table">
          <thead><tr><th>${t("common.date")}</th><th>${t("adm.backupSize")}</th><th></th></tr></thead>
          <tbody>${s.items.map(n=>r`<tr>
            <td class="tiny">${H(n.at)}</td>
            <td class="tiny muted">${b(Math.round(n.bytes/1024))} KB</td>
            <td><div class="row row-end">
              <a class="btn btn-ghost btn-sm" href="/api/admin/backups/${n.id}/download" download>${c("download")} ${t("common.download")}</a>
              <button type="button" class="btn btn-danger btn-sm" data-act="adm-backup-restore" data-id="${n.id}">${c("refresh")} ${t("adm.backupRestore")}</button>
            </div></td>
          </tr>`)}</tbody></table></div>`:r`<p class="muted small mt-s">${t("adm.backupsEmpty")}</p>`}
      </div>`}catch(s){a.innerHTML=r`<div class="notice notice-error">${c("alert")} ${s?.message||t("err.generic")}</div>`}}}var D,Wr,Ur,hs,Pa=O(()=>{B();W();Q();_();ce();X();le();ee();D=(e,a)=>w()?e:a,Wr={mailsms:[{k:"mail",label:()=>t("adm.mailCfg"),type:"group",fields:[{k:"enabled",label:()=>t("adm.mailEnabled"),type:"bool"},{k:"host",label:()=>"SMTP host",type:"text"},{k:"port",label:()=>"SMTP port",type:"number",min:1,max:65535},{k:"user",label:()=>t("common.username"),type:"text"},{k:"pass",label:()=>t("common.password"),type:"text"},{k:"from",label:()=>t("adm.mailFrom"),type:"text"}]},{k:"sms",label:()=>t("adm.smsCfg"),type:"group",fields:[{k:"enabled",label:()=>t("adm.smsEnabled"),type:"bool"},{k:"apiKey",label:()=>t("adm.smsKey"),type:"text"},{k:"sender",label:()=>t("adm.smsSender"),type:"text"}]}],store:[{k:"name",label:()=>D("\u0646\u0627\u0645 \u0641\u0631\u0648\u0634\u06AF\u0627\u0647","Store name"),type:"text"},{k:"nameEn",label:()=>D("\u0646\u0627\u0645 (\u0627\u0646\u06AF\u0644\u06CC\u0633\u06CC)","Name (EN)"),type:"text"},{k:"tagline",label:()=>D("\u0634\u0639\u0627\u0631","Tagline"),type:"text"},{k:"taglineEn",label:()=>D("\u0634\u0639\u0627\u0631 (\u0627\u0646\u06AF\u0644\u06CC\u0633\u06CC)","Tagline (EN)"),type:"text"},{k:"phone",label:()=>t("contact.phone"),type:"text"},{k:"phone2",label:()=>t("contact.mobile"),type:"text"},{k:"phone3",label:()=>D("\u0634\u0645\u0627\u0631\u0647\u0654 \u0633\u0648\u0645 (\u0627\u062E\u062A\u06CC\u0627\u0631\u06CC)","Third phone (optional)"),type:"text"},{k:"whatsapp",label:()=>t("contact.whatsapp"),type:"text"},{k:"email",label:()=>t("common.email"),type:"text"},{k:"city",label:()=>t("common.city"),type:"text"},{k:"cityEn",label:()=>D("\u0634\u0647\u0631 (\u0627\u0646\u06AF\u0644\u06CC\u0633\u06CC)","City (EN)"),type:"text"},{k:"address",label:()=>t("common.address"),type:"textarea"},{k:"addressEn",label:()=>D("\u0622\u062F\u0631\u0633 (\u0627\u0646\u06AF\u0644\u06CC\u0633\u06CC)","Address (EN)"),type:"textarea"},{k:"description",label:()=>t("common.description"),type:"textarea"},{k:"descriptionEn",label:()=>D("\u062A\u0648\u0636\u06CC\u062D\u0627\u062A (\u0627\u0646\u06AF\u0644\u06CC\u0633\u06CC)","Description (EN)"),type:"textarea"},{k:"enamad",label:()=>D("\u06A9\u062F \u0646\u0645\u0627\u062F \u0627\u0639\u062A\u0645\u0627\u062F","Trust symbol code"),type:"text"},{k:"established",label:()=>D("\u0633\u0627\u0644 \u062A\u0623\u0633\u06CC\u0633 (\u0634\u0645\u0633\u06CC)","Founded year (Solar)"),type:"number",min:1300,max:1500},{k:"mapCoords",label:()=>D("\u0645\u062E\u062A\u0635\u0627\u062A \u0646\u0642\u0634\u0647","Map coordinates"),type:"coords"},{k:"socials",label:()=>D("\u0634\u0628\u06A9\u0647\u200C\u0647\u0627\u06CC \u0627\u062C\u062A\u0645\u0627\u0639\u06CC","Social links"),type:"kv",keys:["instagram","telegram","eitaa","whatsapp","website"]},{k:"workingHours",label:()=>t("footer.workingHours"),type:"rows",cols:[{k:"fa",label:()=>D("\u0631\u0648\u0632","Day (FA)")},{k:"en",label:()=>D("Day (EN)","Day (EN)")},{k:"time",label:()=>D("\u0633\u0627\u0639\u062A","Hours (FA)")},{k:"timeEn",label:()=>D("Hours (EN)","Hours (EN)")}]}],theme:[{k:"accent",label:()=>t("adm.tAccent"),type:"color"},{k:"mode",label:()=>t("adm.tMode"),type:"select",options:()=>[["dark",t("theme.dark")],["light",t("theme.light")]]},{k:"bgStyle",label:()=>t("adm.tBg"),type:"select",options:()=>[["waves",D("\u0645\u0648\u062C \u0648 \u0628\u0646\u062F\u0631","Waves & port")],["grid",D("\u0634\u0628\u06A9\u0647\u200C\u0627\u06CC","Grid")],["plain",D("\u0633\u0627\u062F\u0647","Plain")]]},{k:"density",label:()=>t("adm.tDensity"),type:"select",options:()=>[["compact","Compact"],["normal","Normal"],["comfy","Comfy"]]},{k:"contrast",label:()=>t("adm.tContrast"),type:"select",options:()=>[["normal","Normal"],["high","High"]]},{k:"radius",label:()=>t("adm.tRadius"),type:"number",min:0,max:32},{k:"portTheme",label:()=>t("adm.tPort"),type:"bool",hint:()=>t("adm.tPortHint")},{k:"animations",label:()=>t("adm.tAnim"),type:"bool"}],ui:[{k:"searchPosition",label:()=>t("adm.uSearchPos"),type:"select",options:()=>[["start",t("adm.uPosStart")],["center",t("adm.uPosCenter")],["end",t("adm.uPosEnd")]]},{k:"headerLayout",label:()=>t("adm.uHeader"),type:"select",options:()=>[["logoStart",t("adm.uLayoutLogoStart")],["split",t("adm.uLayoutSplit")],["centered",t("adm.uLayoutCentered")]]},{k:"navStyle",label:()=>t("adm.uNav"),type:"select",options:()=>[["pills","Pills"],["underline","Underline"]]},{k:"cardStyle",label:()=>t("adm.uCards"),type:"select",options:()=>[["grid",t("catalog.viewGrid")],["list",t("catalog.viewList")]]},{k:"stickyHeader",label:()=>t("adm.uSticky"),type:"bool"},{k:"showTicker",label:()=>t("adm.uTicker"),type:"bool"},{k:"tickerSpeed",label:()=>t("adm.uTickerSpeed"),type:"number",min:10,max:90},{k:"quickView",label:()=>t("adm.uQuick"),type:"bool"},{k:"floatingChat",label:()=>t("adm.uChat"),type:"bool"},{k:"showBreadcrumbs",label:()=>t("adm.uCrumb"),type:"bool"},{k:"columns",label:()=>t("adm.uCols"),type:"kvnum",keys:["mobile","tablet","desktop","wide"],min:1,max:8},{k:"productCardInfo",label:()=>t("adm.uCardInfo"),type:"multi",options:()=>[["brand",t("common.brand")],["stock",t("common.stock")],["rating",t("common.rating")],["warranty",t("pdp.warranty")],["sold",t("pdp.sold")]]},{k:"tickerItems",label:()=>t("adm.uTickerItems"),type:"rows",cols:[{k:"text",label:()=>D("\u0645\u062A\u0646","Text")},{k:"textEn",label:()=>D("\u0645\u062A\u0646 (\u0627\u0646\u06AF\u0644\u06CC\u0633\u06CC)","Text (EN)")},{k:"link",label:()=>D("\u0644\u06CC\u0646\u06A9","Link")}]}],shipping:[{k:"pickupEnabled",label:()=>t("checkout.pickup"),type:"bool"},{k:"courierEnabled",label:()=>t("checkout.courier"),type:"bool"},{k:"courierBase",label:()=>D("\u0647\u0632\u06CC\u0646\u0647\u0654 \u067E\u0627\u06CC\u0647\u0654 \u0627\u0631\u0633\u0627\u0644","Base shipping fee"),type:"number",min:0,max:1e7},{k:"freeOver",label:()=>D("\u0627\u0631\u0633\u0627\u0644 \u0631\u0627\u06CC\u06AF\u0627\u0646 \u0627\u0632 \u0645\u0628\u0644\u063A","Free shipping over"),type:"number",min:0,max:1e8},{k:"handlingHours",label:()=>D("\u0632\u0645\u0627\u0646 \u0622\u0645\u0627\u062F\u0647\u200C\u0633\u0627\u0632\u06CC (\u0633\u0627\u0639\u062A)","Handling hours"),type:"number",min:1,max:720},{k:"expressEnabled",label:()=>t("checkout.express"),type:"bool"},{k:"expressFee",label:()=>D("\u0647\u0632\u06CC\u0646\u0647\u0654 \u0627\u0631\u0633\u0627\u0644 \u0641\u0648\u0631\u06CC","Express fee"),type:"number",min:0,max:1e7},{k:"insuranceRatePct",label:()=>D("\u0646\u0631\u062E \u0628\u06CC\u0645\u0647 (\u062F\u0631\u0635\u062F)","Insurance rate (%)"),type:"number",min:0,max:20,step:.1},{k:"insuranceMin",label:()=>D("\u062D\u062F\u0627\u0642\u0644 \u0647\u0632\u06CC\u0646\u0647\u0654 \u0628\u06CC\u0645\u0647","Insurance minimum"),type:"number",min:0,max:1e7},{k:"zones",label:()=>t("checkout.zone"),type:"rows",cols:[{k:"id",label:()=>D("\u0634\u0646\u0627\u0633\u0647","ID"),type:"select",options:()=>[["city",D("\u062F\u0627\u062E\u0644 \u0634\u0647\u0631","City")],["province",D("\u0627\u0633\u062A\u0627\u0646","Province")],["country",D("\u06A9\u0634\u0648\u0631","Country")],["island",D("\u062C\u0632\u0627\u06CC\u0631","Islands")]]},{k:"name",label:()=>D("\u0646\u0627\u0645","Name")},{k:"nameEn",label:()=>D("\u0646\u0627\u0645 (\u0627\u0646\u06AF\u0644\u06CC\u0633\u06CC)","Name (EN)")},{k:"fee",label:()=>D("\u0647\u0632\u06CC\u0646\u0647","Fee"),type:"number"},{k:"eta",label:()=>D("\u0632\u0645\u0627\u0646 \u062A\u062D\u0648\u06CC\u0644","ETA")}]}],plus:[{k:"enabled",label:()=>t("feat.plus"),type:"bool"},{k:"price",label:()=>D("\u0645\u0628\u0644\u063A \u0627\u0634\u062A\u0631\u0627\u06A9","Price"),type:"number",min:0,max:1e8},{k:"durationDays",label:()=>D("\u0645\u062F\u062A (\u0631\u0648\u0632)","Duration (days)"),type:"number",min:1,max:365},{k:"discountPct",label:()=>D("\u062A\u062E\u0641\u06CC\u0641 \u062F\u0627\u0626\u0645\u06CC (\u062F\u0631\u0635\u062F)","Permanent discount (%)"),type:"number",min:0,max:30,step:.5},{k:"freeShippingMin",label:()=>D("\u0627\u0631\u0633\u0627\u0644 \u0631\u0627\u06CC\u06AF\u0627\u0646 \u0627\u0632 \u0645\u0628\u0644\u063A","Free shipping over"),type:"number",min:0,max:1e8},{k:"autoInsurance",label:()=>D("\u0628\u06CC\u0645\u0647\u0654 \u062E\u0648\u062F\u06A9\u0627\u0631","Auto insurance"),type:"bool"},{k:"prioritySupport",label:()=>D("\u067E\u0634\u062A\u06CC\u0628\u0627\u0646\u06CC \u0627\u0648\u0644\u0648\u06CC\u062A\u200C\u062F\u0627\u0631","Priority support"),type:"bool"},{k:"expressDiscountPct",label:()=>D("\u062A\u062E\u0641\u06CC\u0641 \u0627\u0631\u0633\u0627\u0644 \u0641\u0648\u0631\u06CC (\u062F\u0631\u0635\u062F)","Express discount (%)"),type:"number",min:0,max:100},{k:"perks",label:()=>t("acc.plusPerks"),type:"rows",cols:[{k:"id",label:()=>"id"},{k:"fa",label:()=>D("\u0645\u0632\u06CC\u062A","Perk (FA)")},{k:"en",label:()=>D("Perk (EN)","Perk (EN)")}]}],orders:[{k:"minOrder",label:()=>D("\u062D\u062F\u0627\u0642\u0644 \u0645\u0628\u0644\u063A \u0633\u0641\u0627\u0631\u0634","Minimum order"),type:"number",min:0,max:1e8},{k:"walletEnabled",label:()=>t("feat.wallet"),type:"bool"},{k:"gatewayEnabled",label:()=>t("pm.gateway"),type:"bool"},{k:"gatewayMode",label:()=>D("\u062D\u0627\u0644\u062A \u062F\u0631\u06AF\u0627\u0647","Gateway mode"),type:"select",options:()=>[["demo",D("\u0622\u0632\u0645\u0627\u06CC\u0634\u06CC","Demo")],["live",D("\u0648\u0627\u0642\u0639\u06CC","Live")]]},{k:"codEnabled",label:()=>t("pm.cod"),type:"bool"},{k:"autoCancelHours",label:()=>D("\u0644\u063A\u0648 \u062E\u0648\u062F\u06A9\u0627\u0631 \u067E\u0633 \u0627\u0632 (\u0633\u0627\u0639\u062A)","Auto-cancel after (h)"),type:"number",min:1,max:720},{k:"stockReserveMinutes",label:()=>D("\u0631\u0632\u0631\u0648 \u0645\u0648\u062C\u0648\u062F\u06CC (\u062F\u0642\u06CC\u0642\u0647)","Stock reserve (min)"),type:"number",min:0,max:1440},{k:"refundToWallet",label:()=>D("\u0628\u0627\u0632\u06AF\u0634\u062A \u0648\u062C\u0647 \u0628\u0647 \u06A9\u06CC\u0641 \u067E\u0648\u0644","Refund to wallet"),type:"bool"}],seo:[{k:"title",label:()=>D("\u0639\u0646\u0648\u0627\u0646 \u0633\u0627\u06CC\u062A","Site title"),type:"text"},{k:"description",label:()=>D("\u062A\u0648\u0636\u06CC\u062D\u0627\u062A \u0645\u062A\u0627","Meta description"),type:"textarea"},{k:"keywords",label:()=>D("\u06A9\u0644\u06CC\u062F\u0648\u0627\u0698\u0647\u200C\u0647\u0627","Keywords"),type:"text"}],currency:[{k:"code",label:()=>D("\u06A9\u062F \u0627\u0631\u0632","Currency code"),type:"text"},{k:"label",label:()=>D("\u0646\u0627\u0645 \u0648\u0627\u062D\u062F","Unit label"),type:"text"},{k:"labelEn",label:()=>D("Unit (EN)","Unit (EN)"),type:"text"}],auth:[{k:"allowRegistration",label:()=>D("\u062B\u0628\u062A\u200C\u0646\u0627\u0645 \u0628\u0627\u0632 \u0628\u0627\u0634\u062F","Allow registration"),type:"bool"},{k:"otpMode",label:()=>D("\u062D\u0627\u0644\u062A \u0627\u0631\u0633\u0627\u0644 \u06A9\u062F","OTP mode"),type:"select",options:()=>[["demo",D("\u0622\u0632\u0645\u0627\u06CC\u0634\u06CC","Demo")],["live",D("\u0648\u0627\u0642\u0639\u06CC","Live")]]},{k:"requirePhone",label:()=>D("\u0634\u0645\u0627\u0631\u0647\u0654 \u0645\u0648\u0628\u0627\u06CC\u0644 \u0627\u0644\u0632\u0627\u0645\u06CC","Require phone"),type:"bool"},{k:"force2faStaff",label:()=>D("\u06F2FA \u0627\u062C\u0628\u0627\u0631\u06CC \u06A9\u0627\u0631\u06A9\u0646\u0627\u0646","Force 2FA for staff"),type:"bool"},{k:"sessionDays",label:()=>D("\u0637\u0648\u0644 \u0646\u0634\u0633\u062A (\u0631\u0648\u0632)","Session days"),type:"number",min:1,max:90}],contact:[{k:"supportNote",label:()=>D("\u067E\u06CC\u0627\u0645 \u0628\u062E\u0634 \u067E\u0634\u062A\u06CC\u0628\u0627\u0646\u06CC","Support note"),type:"textarea"},{k:"supportNoteEn",label:()=>D("Support note (EN)","Support note (EN)"),type:"textarea"}]},Ur={settings:[{id:"store",icon:"store",label:()=>t("adm.sStore")},{id:"shipping",icon:"truck",label:()=>t("adm.sShipping")},{id:"plus",icon:"sparkles",label:()=>t("adm.sPlus")},{id:"orders",icon:"card",label:()=>t("adm.sOrders")},{id:"auth",icon:"key",label:()=>t("adm.sAuth")},{id:"seo",icon:"search",label:()=>t("adm.sSeo")},{id:"currency",icon:"wallet",label:()=>D("\u0648\u0627\u062D\u062F \u067E\u0648\u0644","Currency")},{id:"partners",icon:"star",label:()=>t("adm.sPartners")},{id:"contact",icon:"headset",label:()=>t("common.support")},{id:"mailsms",icon:"send",label:()=>t("adm.mailsms")}],theme:[{id:"theme",icon:"sun",label:()=>t("adm.sTheme")},{id:"ui",icon:"grid",label:()=>t("adm.sUi")}],features:[{id:"features",icon:"zap",label:()=>t("adm.sFeatures")},{id:"backups",icon:"download",label:()=>t("adm.sBackups")}]},hs=null;g("adm-pt-add",e=>{e.target.closest("form").querySelector("[data-ptlist]").insertAdjacentHTML("beforeend",`<div class="row pt-row" data-ptrow><input class="input" name="fa" placeholder="${t("adm.ptFa")}" value="" maxlength="60"><input class="input" name="en" placeholder="${t("adm.ptEn")}" value="" maxlength="60"><button type="button" class="btn btn-ghost btn-sm" data-act="adm-pt-del" aria-label="${t("misc.delete")}">${c("trash")}</button></div>`)});g("adm-pt-del",e=>{let a=e.target.closest("form");a.querySelectorAll("[data-ptrow]").length>1?e.target.closest("[data-ptrow]").remove():a.querySelectorAll("[data-ptrow] input").forEach(n=>n.value="")});g("adm-set-save",async(e,a)=>{e.preventDefault();let s=a.dataset.section,n=Fd(a,s);if(s==="theme"&&n.accent&&!/^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(n.accent)){j(w()?"\u0631\u0646\u06AF \u0628\u0627\u06CC\u062F \u0628\u0627 \u0641\u0631\u0645\u062A #RRGGBB \u0628\u0627\u0634\u062F.":"Colour must be in #RRGGBB format.");return}await A(a.querySelector("button[type=submit]"),async()=>{try{await h.patch(`/api/admin/settings/${s}`,{value:n}),await Ne({silent:!0}),kt(),$(t("adm.sSaved")),T(!0)}catch(o){y(o)}})});g("adm-set-reset",()=>T(!0));g("adm-set-geo",(e,a)=>{if(!navigator.geolocation){j(t("contact.locationDenied"));return}navigator.geolocation.getCurrentPosition(s=>{let n=a.closest("form"),o=n.querySelector(`[name="${a.dataset.lat}"]`),i=n.querySelector(`[name="${a.dataset.lng}"]`);o&&(o.value=s.coords.latitude.toFixed(5)),i&&(i.value=s.coords.longitude.toFixed(5)),$(t("contact.locationOn"))},()=>j(t("contact.locationDenied")),{timeout:9e3})});g("adm-row-add",(e,a)=>{let s=a.dataset.row,n=a.closest("form"),o=n.querySelector(`[data-row-tpl="${s}"]`),i=n.querySelector(`[data-rows="${s}"]`);if(!o||!i)return;let l=document.createElement("div");l.innerHTML=o.innerHTML.trim();let m=l.firstElementChild;m&&(m.querySelectorAll("input").forEach(u=>{u.value=""}),i.appendChild(m))});g("adm-row-del",(e,a)=>{a.closest("[data-row]")?.remove()});g("adm-backup-now",async(e,a)=>{await A(a,async()=>{try{await h.post("/api/admin/backups",{}),$(t("adm.backupDone")),await _r(document.querySelector("#view")||a.closest("#view")?.parentNode||document)}catch(s){y(s)}})});g("adm-backup-restore",async(e,a)=>{await ge({text:t("adm.backupRestoreWarn"),danger:!0})&&await A(a,async()=>{try{await h.post("/api/admin/backups/restore",{id:a.dataset.id}),$(t("adm.backupRestored")),setTimeout(()=>location.reload(),900)}catch(n){y(n)}})})});var Xr={};G(Xr,{mount:()=>Kd,render:()=>jd});async function jd(e){try{Qr=(await h.get("/api/admin/pages")).pages||{}}catch(s){return F({title:s?.message||t("err.generic")})}let a=Ma.find(s=>s.key===e.params.id)?e.params.id:"";return r`
    <div class="row row-between row-wrap mb">
      <h2 class="section-title">${c("file")} ${t("adm.pages")}</h2>
      <span class="badge-pill bp-muted">${b(Ma.length)} ${z("\u0635\u0641\u062D\u0647","pages")}</span>
    </div>

    <div class="page-grid">
      <div class="card page-nav">
        ${Ma.map(s=>r`
          <a class="pg-item ${s.key===a?"active":""}" href="#/admin/pages/${s.key}">
            ${c(s.icon)}<span class="grow">${Jr(s.key)}</span>
          </a>`).join("")}
      </div>
      <div>${a?Ud(Ma.find(s=>s.key===a)):P({icon:"file",title:t("adm.pagesPick"),text:t("adm.pagesPickHint")})}</div>
    </div>`}function Jr(e){return{about:t("footer.about"),guide:t("footer.guide"),service:t("footer.service"),faq:t("footer.faq"),terms:t("footer.terms"),privacy:t("footer.privacy"),insurance:t("footer.insurance"),ticketRules:t("acc.ticketRules"),bugReport:t("feedback.bug"),contact:t("footer.contact")}[e]||e}function Ud(e){let a=Qr[e.key]||(e.key==="faq"?[]:{});return r`
    <form class="card" data-act="adm-pg-save" data-key="${e.key}">
      <div class="row row-between row-wrap mb-s">
        <strong>${c(e.icon)} ${Jr(e.key)}</strong>
        <a class="btn btn-ghost btn-xs" href="#/pages/${e.key}" target="_blank" rel="noopener">${c("external")} ${t("adm.view")}</a>
      </div>
      <p class="notice notice-info mb">${c("info")}<span>${t("adm.pgHint")}</span></p>
      ${e.blocks.map(s=>zd(s,a)).join("")}
      <div class="row row-wrap mt">
        <button class="btn btn-primary" type="submit">${c("save")} ${t("common.save")}</button>
        <a class="btn btn-ghost" href="#/admin/pages/${e.key}">${t("common.reset")}</a>
      </div>
    </form>`}function zd(e,a){switch(e){case"hero":{let s=a.hero||{};return r`
        <fieldset class="pg-block">
          <legend>${c("sparkles")} ${z("\u0633\u0631\u0628\u0631\u06AF \u0635\u0641\u062D\u0647","Page hero")}</legend>
          <div class="form-grid">
            ${x({label:t("common.title"),name:"hero.title",value:s.title||"",span2:!0})}
            ${x({label:z("\u0639\u0646\u0648\u0627\u0646 (\u0627\u0646\u06AF\u0644\u06CC\u0633\u06CC)","Title (EN)"),name:"hero.titleEn",value:s.titleEn||"",span2:!0})}
            ${Y({label:z("\u0632\u06CC\u0631\u0639\u0646\u0648\u0627\u0646","Subtitle"),name:"hero.subtitle",value:s.subtitle||"",rows:2,span2:!0})}
            ${Y({label:z("\u0632\u06CC\u0631\u0639\u0646\u0648\u0627\u0646 (\u0627\u0646\u06AF\u0644\u06CC\u0633\u06CC)","Subtitle (EN)"),name:"hero.subtitleEn",value:s.subtitleEn||"",rows:2,span2:!0})}
          </div>
        </fieldset>`}case"intro":return Wn("intro",z("\u0645\u0642\u062F\u0645\u0647","Intro"),a.intro||"",a.introEn||"");case"body":return Wn("body",z("\u0645\u062A\u0646 \u0627\u0635\u0644\u06CC","Body text"),a.body||"",a.bodyEn||"");case"notice":return Wn("notice",z("\u0647\u0634\u062F\u0627\u0631/\u0646\u06A9\u062A\u0647","Notice"),a.notice||"",a.noticeEn||"",2);case"rules":return Vr("rules",z("\u0628\u0646\u062F\u0647\u0627 (\u0647\u0631 \u062E\u0637 \u06CC\u06A9 \u0628\u0646\u062F)","Clauses (one per line)"),a.rules||[],a.rulesEn||[]);case"hints":return Vr("hints",z("\u0631\u0627\u0647\u0646\u0645\u0627\u06CC\u06CC\u200C\u0647\u0627 (\u0647\u0631 \u062E\u0637 \u06CC\u06A9\u06CC)","Hints (one per line)"),a.hints||[],a.hintsEn||[]);case"sections":return Wd(a.sections||[]);case"steps":return gs("steps",z("\u06AF\u0627\u0645\u200C\u0647\u0627","Steps"),a.steps||[],["title","titleEn","body","bodyEn"],"list");case"items":return gs("items",z("\u0645\u0648\u0627\u0631\u062F \u062E\u062F\u0645\u0627\u062A","Service items"),a.items||[],["icon","title","titleEn","body","bodyEn"],"grid");case"tips":return gs("tips",z("\u0646\u06A9\u062A\u0647\u200C\u0647\u0627","Tips"),a.tips||[],["fa","en"],"grid");case"stats":return gs("stats",z("\u0622\u0645\u0627\u0631\u0647\u0627\u06CC \u0635\u0641\u062D\u0647\u0654 \u062F\u0631\u0628\u0627\u0631\u0647\u0654 \u0645\u0627","About-page stats"),a.stats||[],["fa","en","key"],"grid");case"faq":return Yd(Array.isArray(a)?a:[]);default:return""}}function Wn(e,a,s,n,o=4){return r`
    <fieldset class="pg-block">
      <legend>${c("edit")} ${a}</legend>
      <div class="form-grid">
        ${Y({label:z("\u0641\u0627\u0631\u0633\u06CC","Persian"),name:`${e}`,value:s,rows:o,span2:!0})}
        ${Y({label:z("\u0627\u0646\u06AF\u0644\u06CC\u0633\u06CC","English"),name:`${e}En`,value:n,rows:o,span2:!0})}
      </div>
    </fieldset>`}function Vr(e,a,s,n){return r`
    <fieldset class="pg-block">
      <legend>${c("list")} ${a}</legend>
      <div class="form-grid">
        <label class="field span-2"><span class="label">${z("\u0641\u0627\u0631\u0633\u06CC","Persian")}</span>
          <textarea class="textarea" name="${e}" rows="6" data-lines="1">${p((s||[]).join(`
`))}</textarea></label>
        <label class="field span-2"><span class="label">${z("\u0627\u0646\u06AF\u0644\u06CC\u0633\u06CC","English")}</span>
          <textarea class="textarea" name="${e}En" rows="6" data-lines="1">${p((n||[]).join(`
`))}</textarea></label>
      </div>
    </fieldset>`}function Wd(e){return r`
    <fieldset class="pg-block">
      <legend class="row row-between">
        <span>${c("layers")} ${z("\u0628\u062E\u0634\u200C\u0647\u0627","Sections")}</span>
        <button type="button" class="btn btn-ghost btn-xs" data-act="adm-pg-add" data-kind="sections">${c("plus")} ${t("common.add")}</button>
      </legend>
      <div data-blocks="sections">
        ${e.map((a,s)=>Yr(a,s)).join("")}
      </div>
      <template data-tpl="sections">${Yr(_d(),0)}</template>
    </fieldset>`}function Yr(e,a){let s=Array.isArray(e.list)&&e.list.some(n=>n&&typeof n=="object");return r`
    <div class="pg-item" data-block="sections" data-objlist="${s?"1":""}">
      <div class="row row-between">
        <strong class="tiny">${z("\u0628\u062E\u0634","Section")} ${a+1}</strong>
        <span class="act">${ys()}${$s()}</span>
      </div>
      <div class="form-grid mt-s">
        ${x({label:t("common.title"),name:"title",value:e.title||""})}
        ${x({label:z("\u0639\u0646\u0648\u0627\u0646 (\u0627\u0646\u06AF\u0644\u06CC\u0633\u06CC)","Title (EN)"),name:"titleEn",value:e.titleEn||""})}
        ${Y({label:z("\u0645\u062A\u0646","Body"),name:"body",value:e.body||"",rows:4,span2:!0})}
        ${Y({label:z("\u0645\u062A\u0646 (\u0627\u0646\u06AF\u0644\u06CC\u0633\u06CC)","Body (EN)"),name:"bodyEn",value:e.bodyEn||"",rows:3,span2:!0})}
        ${Vd(e,s)}
      </div>
    </div>`}function Vd(e,a){if(a)return r`
      <div class="span-2">
        <div class="row row-between">
          <span class="label">${z("\u0641\u0647\u0631\u0633\u062A \u0645\u0648\u0631\u062F\u06CC","Bullet list")}</span>
          <button type="button" class="btn btn-ghost btn-xs" data-act="adm-pg-li-add">${c("plus")}</button>
        </div>
        <div data-li>${(e.list||[]).map(o=>Gr(o)).join("")}</div>
        <template data-li-tpl>${Gr({icon:"check",fa:"",en:""})}</template>
      </div>`;let s=(e.list||[]).map(o=>typeof o=="string"?o:o?.fa||"").join(`
`),n=(e.listEn||[]).join(`
`);return s||n?r`
      <label class="field span-2"><span class="label">${z("\u0641\u0647\u0631\u0633\u062A (\u0647\u0631 \u062E\u0637 \u06CC\u06A9 \u0645\u0648\u0631\u062F)","List (one per line)")}</span>
        <textarea class="textarea" name="list" rows="4" data-lines="1">${p(s)}</textarea></label>
      <label class="field span-2"><span class="label">${z("\u0641\u0647\u0631\u0633\u062A \u0627\u0646\u06AF\u0644\u06CC\u0633\u06CC (\u0647\u0631 \u062E\u0637 \u06CC\u06A9 \u0645\u0648\u0631\u062F)","List EN (one per line)")}</span>
        <textarea class="textarea" name="listEn" rows="4" data-lines="1">${p(n)}</textarea></label>`:r`
    <div class="span-2">
      <button type="button" class="btn btn-ghost btn-xs" data-act="adm-pg-list-toggle">${c("plus")} ${z("\u0627\u0641\u0632\u0648\u062F\u0646 \u0641\u0647\u0631\u0633\u062A \u0645\u0648\u0631\u062F\u06CC","Add bullet list")}</button>
      <div data-listbox hidden>
        <label class="field span-2"><span class="label">${z("\u0641\u0647\u0631\u0633\u062A (\u0647\u0631 \u062E\u0637 \u06CC\u06A9 \u0645\u0648\u0631\u062F)","List (one per line)")}</span>
          <textarea class="textarea" name="list" rows="3" data-lines="1"></textarea></label>
      </div>
    </div>`}function Gr(e){return r`
    <div class="spec-row" data-lir>
      <input class="input li-ic" name="icon" value="${p(e?.icon||"check")}" placeholder="icon">
      <input class="input" name="fa" value="${p(e?.fa||"")}" placeholder="${z("\u0641\u0627\u0631\u0633\u06CC","FA")}">
      <input class="input" name="en" value="${p(e?.en||"")}" placeholder="${z("\u0627\u0646\u06AF\u0644\u06CC\u0633\u06CC","EN")}">
      <button type="button" class="btn btn-ghost btn-icon btn-sm" data-act="adm-pg-lidel">${c("trash")}</button>
    </div>`}function gs(e,a,s,n,o){return r`
    <fieldset class="pg-block">
      <legend class="row row-between">
        <span>${c("grid")} ${a}</span>
        <button type="button" class="btn btn-ghost btn-xs" data-act="adm-pg-add" data-kind="${e}">${c("plus")} ${t("common.add")}</button>
      </legend>
      <div class="${o==="grid"?"perm-grid":""}" data-blocks="${e}">
        ${s.map((i,l)=>r`
          <div class="pg-item ${o==="grid"?"tight":""}" data-block="${e}">
            <div class="row row-between">
              <strong class="tiny">${b(l+1)}</strong>
              <span class="act">${ys()}${$s()}</span>
            </div>
            <div class="form-grid mt-s">
              ${n.map(m=>m==="body"||m==="bodyEn"?Y({label:fs(m),name:m,value:i[m]||"",rows:2,span2:!0}):x({label:fs(m),name:m,value:i[m]||""}))}
            </div>
          </div>`).join("")}
      </div>
      <template data-tpl="${e}">
        <div class="pg-item ${o==="grid"?"tight":""}" data-block="${e}">
          <div class="row row-between"><strong class="tiny">+</strong><span class="act">${ys()}${$s()}</span></div>
          <div class="form-grid mt-s">
            ${n.map(i=>i==="body"||i==="bodyEn"?Y({label:fs(i),name:i,value:"",rows:2,span2:!0}):x({label:fs(i),name:i,value:""}))}
          </div>
        </div>
      </template>
    </fieldset>`}function fs(e){return{title:t("common.title"),titleEn:z("\u0639\u0646\u0648\u0627\u0646 (\u0627\u0646\u06AF\u0644\u06CC\u0633\u06CC)","Title (EN)"),body:z("\u0645\u062A\u0646","Body"),bodyEn:z("\u0645\u062A\u0646 (\u0627\u0646\u06AF\u0644\u06CC\u0633\u06CC)","Body (EN)"),icon:z("\u0622\u06CC\u06A9\u0648\u0646","Icon"),fa:z("\u0641\u0627\u0631\u0633\u06CC","Persian"),en:z("\u0627\u0646\u06AF\u0644\u06CC\u0633\u06CC","English"),key:z("\u06A9\u0644\u06CC\u062F \u0622\u0645\u0627\u0631\u06CC","Stat key")}[e]||e}function Yd(e){let a=["orders","shipping","returns","product","account","security","store","other"];return r`
    <fieldset class="pg-block">
      <legend class="row row-between">
        <span>${c("help")} ${z("\u0633\u0624\u0627\u0644\u0627\u062A \u0645\u062A\u062F\u0627\u0648\u0644","FAQ")} (${b(e.length)})</span>
        <button type="button" class="btn btn-ghost btn-xs" data-act="adm-pg-add" data-kind="faq">${c("plus")} ${t("common.add")}</button>
      </legend>
      <div data-blocks="faq">
        ${e.map((s,n)=>Kr(s,n,a)).join("")}
      </div>
      <template data-tpl="faq">${Kr({cat:"general",q:"",qEn:"",a:"",aEn:""},0,a)}</template>
    </fieldset>`}function Kr(e,a,s){return r`
    <div class="pg-item" data-block="faq">
      <div class="row row-between">
        <strong class="tiny">${z("\u0633\u0624\u0627\u0644","Q")} ${a+1}</strong>
        <span class="act">${ys()}${$s()}</span>
      </div>
      <div class="form-grid mt-s">
        <label class="field"><span class="label">${z("\u062F\u0633\u062A\u0647","Category")}</span>
          <select class="select" name="cat">${s.map(n=>r`<option value="${n}" ${e.cat===n?"selected":""}>${t(`faq.cat.${n}`)}</option>`)}</select></label>
        ${x({label:z("\u0633\u0624\u0627\u0644","Question"),name:"q",value:e.q||""})}
        ${x({label:z("\u0633\u0624\u0627\u0644 (\u0627\u0646\u06AF\u0644\u06CC\u0633\u06CC)","Question (EN)"),name:"qEn",value:e.qEn||"",span2:!0})}
        ${Y({label:z("\u067E\u0627\u0633\u062E","Answer"),name:"a",value:e.a||"",rows:3,span2:!0})}
        ${Y({label:z("\u067E\u0627\u0633\u062E (\u0627\u0646\u06AF\u0644\u06CC\u0633\u06CC)","Answer (EN)"),name:"aEn",value:e.aEn||"",rows:2,span2:!0})}
      </div>
    </div>`}function vs(e,a,s){let n=e.querySelector(`[name="${a}"]`);if(n)return n.dataset.lines==="1"?n.value.split(`
`).map(o=>o.trim()).filter(Boolean):n.value}function Gd(e,a){let s={};for(let n of a.blocks)if(n==="hero"){let o=i=>e.querySelector(`[name="hero.${i}"]`)?.value??"";s.hero={title:o("title"),titleEn:o("titleEn"),subtitle:o("subtitle"),subtitleEn:o("subtitleEn")}}else if(["intro","body","notice"].includes(n))s[n]=vs(e,n)??"",s[`${n}En`]=vs(e,`${n}En`)??"";else if(["rules","hints"].includes(n))s[n]=vs(e,n)||[],s[`${n}En`]=vs(e,`${n}En`)||[];else if(n==="faq")s.faq=[...e.querySelectorAll('[data-block="faq"]')].map(o=>({cat:o.querySelector("[name=cat]")?.value||"general",q:o.querySelector("[name=q]")?.value||"",qEn:o.querySelector("[name=qEn]")?.value||"",a:o.querySelector("[name=a]")?.value||"",aEn:o.querySelector("[name=aEn]")?.value||""}));else{let o={sections:["title","titleEn","body","bodyEn"],steps:["title","titleEn","body","bodyEn"],items:["icon","title","titleEn","body","bodyEn"],tips:["fa","en"],stats:["fa","en","key"]}[n]||[];s[n]=[...e.querySelectorAll(`[data-block="${n}"]`)].map(i=>{let l={};for(let m of o)l[m]=i.querySelector(`[name="${m}"]`)?.value??"";if(n==="sections")if(i.dataset.objlist==="1")l.list=[...i.querySelectorAll("[data-lir]")].map(m=>({icon:m.querySelector("[name=icon]")?.value||"check",fa:m.querySelector("[name=fa]")?.value||"",en:m.querySelector("[name=en]")?.value||""}));else{let m=i.querySelector("[name=list]");m&&(l.list=m.value.split(`
`).map(f=>f.trim()).filter(Boolean));let u=i.querySelector("[name=listEn]");u&&(l.listEn=u.value.split(`
`).map(f=>f.trim()).filter(Boolean))}return l})}return s}function Kd(e){return L(e),null}var z,Ma,Qr,_d,ys,$s,Zr=O(()=>{B();W();Q();ce();X();le();ee();z=(e,a)=>w()?e:a,Ma=[{key:"about",icon:"store",blocks:["hero","sections","stats"]},{key:"guide",icon:"info",blocks:["hero","steps","tips"]},{key:"service",icon:"headset",blocks:["hero","items"]},{key:"faq",icon:"help",blocks:["faq"]},{key:"terms",icon:"file",blocks:["hero","intro","notice","sections"]},{key:"privacy",icon:"shield",blocks:["hero","intro","sections"]},{key:"insurance",icon:"package-check",blocks:["hero","body","rules"]},{key:"ticketRules",icon:"ticket",blocks:["hero","rules"]},{key:"bugReport",icon:"bug",blocks:["hero","body","hints"]},{key:"contact",icon:"phone",blocks:["hero"]}],Qr={};_d=()=>({title:"",titleEn:"",body:"",bodyEn:"",list:[],listEn:[]});ys=()=>r`
  <button type="button" class="btn btn-ghost btn-icon btn-xs" data-act="adm-pg-up" aria-label="up">${c("arrow-up")}</button>
  <button type="button" class="btn btn-ghost btn-icon btn-xs" data-act="adm-pg-down" aria-label="down">${c("chevron-down")}</button>`,$s=()=>r`<button type="button" class="btn btn-ghost btn-icon btn-xs" data-act="adm-pg-del" aria-label="delete">${c("trash")}</button>`;g("adm-pg-save",async(e,a)=>{e.preventDefault();let s=a.dataset.key,n=Ma.find(i=>i.key===s),o=Gd(a,n);await A(a.querySelector("button[type=submit]"),async()=>{try{await h.patch(`/api/admin/pages/${s}`,{value:o}),$(t("misc.saved")),T(!0)}catch(i){y(i)}})});g("adm-pg-add",(e,a)=>{let s=a.dataset.kind,n=a.closest("form"),o=n.querySelector(`[data-tpl="${s}"]`),i=n.querySelector(`[data-blocks="${s}"]`);if(!o||!i)return;let l=document.createElement("div");l.innerHTML=o.innerHTML.trim();let m=l.firstElementChild;if(!m)return;m.querySelectorAll("input, textarea").forEach(v=>{v.value=""});let u=i.children.length+1,f=m.querySelector(".row strong");f&&(f.textContent=`${s==="faq"?w()?"\u0633\u0624\u0627\u0644":"Q":w()?"\u0645\u0648\u0631\u062F":"Item"} ${u}`),i.appendChild(m),m.scrollIntoView({behavior:"smooth",block:"center"})});g("adm-pg-del",(e,a)=>{a.closest("[data-block]")?.remove()});g("adm-pg-up",(e,a)=>{let s=a.closest("[data-block]");s?.previousElementSibling&&s.parentNode.insertBefore(s,s.previousElementSibling)});g("adm-pg-down",(e,a)=>{let s=a.closest("[data-block]");s?.nextElementSibling&&s.parentNode.insertBefore(s.nextElementSibling,s)});g("adm-pg-li-add",(e,a)=>{let s=a.closest(".span-2"),n=s.querySelector("[data-li]"),o=s.querySelector("[data-li-tpl]");if(!n||!o)return;let i=document.createElement("div");i.innerHTML=o.innerHTML.trim(),i.firstElementChild&&n.appendChild(i.firstElementChild)});g("adm-pg-list-toggle",(e,a)=>{let s=a.closest(".span-2")?.querySelector("[data-listbox]");s&&(s.hidden=!s.hidden)});g("adm-pg-lidel",(e,a)=>{a.closest("[data-lir]")?.remove()})});var Vn={};G(Vn,{mount:()=>am,render:()=>Qd});async function Qd(e){return e.params.section==="imageSearch"?tm():Jd()}async function Jd(){try{let a=await h.get(h.url("/api/admin/barcode",{q:dt.q}));Tt=a.items||[],jt=a.labelSizes||[],!jt.find(s=>s.id===dt.size)&&jt.length&&(dt.size=jt[0].id)}catch(a){return F({title:a?.message||t("err.generic")})}let e=Tt.filter(a=>!a.barcode).length;return r`
    <div class="row row-between row-wrap mb">
      <div>
        <h2 class="section-title">${c("barcode")} ${t("adm.barcode")}</h2>
        <p class="muted small">${b(Tt.length)} ${ye("\u06A9\u0627\u0644\u0627","products")} · ${b(e)} ${ye("\u0628\u062F\u0648\u0646 \u0628\u0627\u0631\u06A9\u062F","without barcode")}</p>
      </div>
      <a class="btn btn-outline btn-sm" href="#/price-check" target="_blank" rel="noopener">${c("scan")} ${t("adm.bPriceMode")}</a>
    </div>

    <div class="dev-grid">
      <div class="card">
        <strong>${c("printer")} ${t("adm.bPrinter")}</strong>
        <p class="muted small mt-s">${t("adm.bPrinterHint")}</p>
        <ol class="dev-steps">
          <li>${ye("\u0686\u0627\u067E\u06AF\u0631 \u0628\u0631\u0686\u0633\u0628 \u0631\u0627 \u0628\u0647 \u062F\u0633\u062A\u06AF\u0627\u0647 \u0648\u0635\u0644 \u06A9\u0646 (USB/\u0634\u0628\u06A9\u0647).","Connect the label printer (USB/network).")}</li>
          <li>${ye("\u062F\u0631 \u062A\u0646\u0638\u06CC\u0645\u0627\u062A \u0686\u0627\u067E \u0633\u06CC\u0633\u062A\u0645\u060C \u0627\u0646\u062F\u0627\u0632\u0647\u0654 \u06A9\u0627\u063A\u0630 \u0631\u0627 \u0647\u0645\u200C\u0627\u0646\u062F\u0627\u0632\u0647\u0654 \u0628\u0631\u0686\u0633\u0628 \u0628\u06AF\u0630\u0627\u0631.","Set the system paper size to your label size.")}</li>
          <li>${ye("\u06A9\u0627\u0644\u0627\u0647\u0627 \u0631\u0627 \u0627\u0646\u062A\u062E\u0627\u0628 \u0648 \xAB\u067E\u06CC\u0634\u200C\u0646\u0645\u0627\u06CC\u0634 \u0648 \u0686\u0627\u067E\xBB \u0631\u0627 \u0628\u0632\u0646.","Pick products and press \u201CPreview & print\u201D.")}</li>
        </ol>
        <div class="row row-wrap mt-s">
          <button class="btn btn-ghost btn-sm" data-act="adm-bc-testprint">${c("printer")} ${ye("\u0686\u0627\u067E \u0622\u0632\u0645\u0627\u06CC\u0634\u06CC","Test print")}</button>
        </div>
      </div>

      <div class="card">
        <strong>${c("scan")} ${t("adm.bScanner")}</strong>
        <p class="muted small mt-s">${t("adm.bScanHint")}</p>
        <form class="row mt-s" data-act="adm-bc-scan">
          <input class="input grow mono" name="code" placeholder="${ye("\u0628\u0627\u0631\u06A9\u062F \u0631\u0627 \u0627\u0633\u06A9\u0646 \u06A9\u0646\u2026","Scan a barcode\u2026")}" autocomplete="off" data-autofocus>
          <button class="btn btn-primary" type="submit">${c("search")}</button>
        </form>
        <div class="scan-result mt-s" data-scan-result>
          <p class="muted small">${ye("\u062F\u0648\u0631\u0628\u06CC\u0646 \u062A\u0644\u0641\u0646 \u0647\u0645 \u06A9\u0627\u0631 \u0645\u06CC\u200C\u06A9\u0646\u062F: \u0627\u0632 \u062D\u0627\u0644\u062A \u0646\u0645\u0627\u06CC\u0634 \u0642\u06CC\u0645\u062A \u0627\u0633\u062A\u0641\u0627\u062F\u0647 \u06A9\u0646.","Phone camera works too \u2014 use the price-display mode.")}</p>
        </div>
        <p class="tiny muted mt-s">${Xd()}</p>
      </div>
    </div>

    <div class="card mt">
      <div class="row row-between row-wrap mb-s">
        <strong>${c("printer")} ${t("adm.bLabels")}</strong>
        <form class="row row-wrap" data-act="adm-bc-search">
          <input class="input" name="q" value="${p(dt.q)}" placeholder="${t("adm.pName")} / SKU / ${t("pdp.barcode")}">
          <button class="btn btn-ghost btn-sm" type="submit">${c("search")}</button>
        </form>
      </div>

      <div class="row row-wrap mb-s">
        <select class="select select-sm" data-size>
          ${jt.map(a=>r`<option value="${a.id}" ${dt.size===a.id?"selected":""}>${p(w()?a.fa:`${a.w}\xD7${a.h} mm`)}</option>`)}
        </select>
        <label class="row tiny">${ye("\u062A\u0639\u062F\u0627\u062F \u0628\u0631\u0686\u0633\u0628 \u0647\u0631 \u06A9\u0627\u0644\u0627","Copies per product")}
          <input class="input copies-in" type="number" min="1" max="20" value="${b(dt.copies)}" data-copies>
        </label>
        <button class="btn btn-ghost btn-sm" data-act="adm-bc-all">${c("check")} ${ye("\u0627\u0646\u062A\u062E\u0627\u0628 \u0647\u0645\u0647","Select all")}</button>
        <button class="btn btn-ghost btn-sm" data-act="adm-bc-none">${c("close")} ${ye("\u067E\u0627\u06A9 \u06A9\u0631\u062F\u0646","Clear")}</button>
        <button class="btn btn-ghost btn-sm" data-act="adm-bc-nocode">${c("barcode")} ${ye("\u0628\u062F\u0648\u0646 \u0628\u0627\u0631\u06A9\u062F","Without barcode")}</button>
        <span class="badge-pill bp-accent" data-selcount>${b(Ke.size)}</span>
      </div>

      ${re([{label:""},{label:t("common.product")},{label:t("pdp.barcode")},{label:t("common.price"),cls:"num"},{label:t("common.stock"),cls:"num"},{label:"",cls:"num"}],Tt.slice(0,100).map(a=>r`
          <tr>
            <td><label class="check"><input type="checkbox" data-pick="${a.id}" ${Ke.has(a.id)?"checked":""}><span class="box">${c("check")}</span></label></td>
            <td><span class="b">${p(a.name)}</span><div class="tiny muted mono">${p(a.sku||"")}</div></td>
            <td class="mono tiny">${a.barcode?p(a.barcode):r`<span class="badge-pill bp-warn">${ye("\u0646\u062F\u0627\u0631\u062F","none")}</span>`}</td>
            <td class="num">${C(a.price)}</td>
            <td class="num">${b(a.stock)}</td>
            <td>${a.barcode?"":r`<button class="btn btn-ghost btn-xs" data-act="adm-bc-gen" data-id="${a.id}">${c("barcode")} ${t("adm.bGenerate")}</button>`}</td>
          </tr>`),{emptyText:t("common.noResult")})}
    </div>

    <div class="card mt no-print">
      <div class="row row-between row-wrap">
        <strong>${c("eye")} ${t("adm.bPreview")}</strong>
        <div class="row row-wrap">
          <button class="btn btn-outline btn-sm" data-act="adm-bc-build">${c("refresh")} ${ye("\u0633\u0627\u062E\u062A \u067E\u06CC\u0634\u200C\u0646\u0645\u0627\u06CC\u0634","Build preview")}</button>
          <button class="btn btn-primary btn-sm" data-act="adm-bc-print">${c("printer")} ${t("common.print")}</button>
        </div>
      </div>
      <div class="print-grid mt" data-print-area data-labels></div>
      <p class="hint mt-s">${ye("\u0627\u0646\u062F\u0627\u0632\u0647\u0654 \u0628\u0631\u0686\u0633\u0628 \u062F\u0631 \u0686\u0627\u067E \u0627\u0632 \u0645\u062A\u063A\u06CC\u0631 \u0635\u0641\u062D\u0647 \u062A\u0646\u0638\u06CC\u0645 \u0645\u06CC\u200C\u0634\u0648\u062F\u061B \u0627\u06AF\u0631 \u0628\u0631\u0686\u0633\u0628\u200C\u0647\u0627 \u062C\u0627\u0628\u0647\u200C\u062C\u0627 \u0686\u0627\u067E \u0634\u062F\u0646\u062F\u060C \u062D\u0627\u0634\u06CC\u0647\u0654 \u0686\u0627\u067E \u0631\u0627 \u062F\u0631 \u06AF\u0641\u062A\u200C\u0648\u06AF\u0648\u06CC \u0686\u0627\u067E \u0635\u0641\u0631 \u06A9\u0646.","If labels shift when printing, set the print margins to zero in the print dialog.")}</p>
    </div>`}function Xd(){return"BarcodeDetector"in window?r`${c("check")} ${ye("\u0627\u0633\u06A9\u0646 \u0628\u0627 \u062F\u0648\u0631\u0628\u06CC\u0646 \u067E\u0634\u062A\u06CC\u0628\u0627\u0646\u06CC \u0645\u06CC\u200C\u0634\u0648\u062F","Camera scanning supported")}`:r`${c("info")} ${ye("\u0627\u0633\u06A9\u0646 \u0628\u0627 \u062F\u0648\u0631\u0628\u06CC\u0646 \u062F\u0631 \u0627\u06CC\u0646 \u0645\u0631\u0648\u0631\u06AF\u0631 \u067E\u0634\u062A\u06CC\u0628\u0627\u0646\u06CC \u0646\u0645\u06CC\u200C\u0634\u0648\u062F\u061B \u0627\u0632 \u0628\u0627\u0631\u06A9\u062F\u062E\u0648\u0627\u0646 \u0633\u062E\u062A\u200C\u0627\u0641\u0632\u0627\u0631\u06CC \u0627\u0633\u062A\u0641\u0627\u062F\u0647 \u06A9\u0646.","Camera scanning unsupported in this browser; use a hardware scanner.")}`}async function Zd(){return window.JsBarcode||await new Promise((e,a)=>{let s=document.createElement("script");s.src="/js/vendor/jsbarcode.all.min.js",s.onload=e,s.onerror=a,document.head.appendChild(s)}),window.JsBarcode}function em(e,a){let s=jt.find(o=>o.id===a)||{w:40,h:25},n=/^\d{13}$/.test(e.barcode||"")?"EAN13":"CODE128";return r`
    <div class="label-preview" data-lw="${s.w}" data-lh="${s.h}">
      <span class="ln">${p(e.name.slice(0,40))}</span>
      ${e.barcode?r`<svg data-bc="${p(e.barcode)}" data-fmt="${n}"></svg>`:r`<span class="ln tiny">${ye("\u0628\u062F\u0648\u0646 \u0628\u0627\u0631\u06A9\u062F","no barcode")}</span>`}
      <span class="row row-between w100">
        <span class="ln mono tiny">${p(e.barcode||e.sku||"")}</span>
        <span class="lp">${b(e.price)}</span>
      </span>
    </div>`}async function _n(e){let a=e.querySelector("[data-labels]");if(!a)return 0;let s=Tt.filter(m=>Ke.has(m.id));if(!s.length)return a.innerHTML="",0;let n=Math.max(1,Number(e.querySelector("[data-copies]")?.value||1)),o=e.querySelector("[data-size]")?.value||dt.size,i=jt.find(m=>m.id===o)||{w:40,h:25},l="";for(let m of s)for(let u=0;u<n;u++)l+=em(m,o);a.innerHTML=l,a.style.setProperty("--lw",`${i.w}mm`),a.style.setProperty("--lh",`${i.h}mm`);try{let m=await Zd();a.querySelectorAll("svg[data-bc]").forEach(u=>{try{m(u,u.dataset.bc,{format:u.dataset.fmt||"CODE128",displayValue:!1,height:Math.max(18,i.h-14),width:1.3,margin:0,background:"#ffffff",lineColor:"#000000"})}catch{u.remove()}})}catch{j(ye("\u06A9\u062A\u0627\u0628\u062E\u0627\u0646\u0647\u0654 \u0628\u0627\u0631\u06A9\u062F \u0628\u0627\u0631\u06AF\u0630\u0627\u0631\u06CC \u0646\u0634\u062F\u061B \u0628\u0631\u0686\u0633\u0628\u200C\u0647\u0627 \u0628\u062F\u0648\u0646 \u0628\u0627\u0631\u06A9\u062F \u0686\u0627\u067E \u0645\u06CC\u200C\u0634\u0648\u0646\u062F.","Barcode library failed to load; labels print without barcodes."))}return s.length*n}function ws(){document.querySelectorAll("[data-pick]").forEach(a=>{a.checked=Ke.has(a.dataset.pick)});let e=document.querySelector("[data-selcount]");e&&(e.textContent=b(Ke.size))}async function tm(){let e=null;try{e=await h.get("/api/admin/image-index")}catch(n){return F({title:n?.message||t("err.generic")})}let a=e.products||[],s=a.filter(n=>!n.indexed);return r`
    <div class="row row-between row-wrap mb">
      <div>
        <h2 class="section-title">${c("camera")} ${t("adm.imageSearch")}</h2>
        <p class="muted small">${b(e.indexed||0)} / ${b(a.length)} ${ye("\u0627\u06CC\u0646\u062F\u06A9\u0633 \u0634\u062F\u0647","indexed")}</p>
      </div>
      <button class="btn btn-primary btn-sm" data-act="adm-ix-run" data-count="${s.length}">
        ${c("refresh")} ${s.length?`${t("adm.ixIndex")} (${b(s.length)})`:t("adm.ixReindex")}
      </button>
    </div>

    <p class="notice notice-info mb">${c("info")}<span>${t("adm.ixHint")}</span></p>
    <div class="mt-s" data-ix-progress hidden>
      <div class="progress"><i data-ix-bar data-w="0%"></i></div>
      <p class="tiny muted mt-s" data-ix-status></p>
    </div>

    ${a.length?r`
      <div class="ix-grid">
        ${a.slice(0,240).map(n=>r`
          <div class="ix-item ${n.indexed?"on":""}" data-pid="${n.id}">
            ${n.image?r`<img src="${p(n.image)}" alt="" loading="lazy" data-h="54px" data-w="54px">`:r`<span class="ix-ph">${c("image")}</span>`}
            <span class="grow tiny">${p(n.name.slice(0,46))}</span>
            ${n.indexed?r`<span class="badge-pill bp-success tiny">${c("check")}</span>`:r`<span class="badge-pill bp-muted tiny">${t("common.no")}</span>`}
          </div>`).join("")}
      </div>`:P({icon:"image",title:t("common.noData")})}`}function am(e,a){return L(e),e.querySelectorAll("[data-pick]").forEach(s=>{s.addEventListener("change",()=>{s.checked?Ke.add(s.dataset.pick):Ke.delete(s.dataset.pick);let n=e.querySelector("[data-selcount]");n&&(n.textContent=b(Ke.size))})}),e.querySelector("[data-size]")?.addEventListener("change",s=>{dt.size=s.target.value}),e.querySelector("[data-copies]")?.addEventListener("change",s=>{dt.copies=Math.max(1,Number(s.target.value)||1)}),null}var ye,Tt,jt,Ke,dt,Yn=O(()=>{B();W();Q();ce();X();le();ee();pn();ye=(e,a)=>w()?e:a,Tt=[],jt=[],Ke=new Set,dt={q:"",size:"40x25",copies:1};g("adm-bc-search",(e,a)=>{e.preventDefault(),dt.q=String(new FormData(a).get("q")||"").trim(),T(!0)});g("adm-bc-all",()=>{Tt.slice(0,100).forEach(e=>Ke.add(e.id)),ws()});g("adm-bc-none",()=>{Ke.clear(),ws()});g("adm-bc-nocode",()=>{Ke=new Set(Tt.filter(e=>!e.barcode).map(e=>e.id)),ws()});g("adm-bc-gen",async(e,a)=>{try{let s=await h.post("/api/admin/barcode/generate",{productId:a.dataset.id,count:1}),n=s.codes?.[0]?.barcode||s.codes?.[0]||"";n&&($(`${t("adm.bGenerate")}: ${n}`),T(!0))}catch(s){y(s)}});g("adm-bc-build",async(e,a)=>{let s=a.closest("[data-admbody]")||document,n=await _n(s);n?$(`${b(n)} ${ye("\u0628\u0631\u0686\u0633\u0628 \u0622\u0645\u0627\u062F\u0647 \u0634\u062F","labels ready")}`):j(t("adm.bPickFirst"))});g("adm-bc-print",async(e,a)=>{let s=a.closest("[data-admbody]")||document;if(!await _n(s)){j(t("adm.bPickFirst"));return}document.body.classList.add("printing-labels");let o=()=>document.body.classList.remove("printing-labels");window.addEventListener("afterprint",o,{once:!0}),setTimeout(()=>{window.print(),setTimeout(o,1200)},120)});g("adm-bc-testprint",async(e,a)=>{let s=a.closest("[data-admbody]")||document;if(!s.querySelector("[data-labels]"))return;Ke=new Set([Tt[0]?.id].filter(Boolean)),ws(),await _n(s),document.body.classList.add("printing-labels");let o=()=>document.body.classList.remove("printing-labels");window.addEventListener("afterprint",o,{once:!0}),setTimeout(()=>{window.print(),setTimeout(o,1200)},120)});g("adm-bc-scan",async(e,a)=>{e.preventDefault();let s=String(new FormData(a).get("code")||"").trim(),n=a.closest(".card").querySelector("[data-scan-result]");if(s)try{let i=(await h.post("/api/admin/barcode/scan-log",{code:s})).product;n.innerHTML=r`
      <div class="row row-between">
        <div>
          <strong>${p(i.name)}</strong>
          <div class="tiny muted mono">${p(i.sku||"")} · ${p(i.barcode||"")}</div>
        </div>
        <div class="t-end">
          <div class="price-now">${C(i.price)}</div>
          <div class="tiny muted">${t("common.stock")}: ${b(i.stock)}</div>
        </div>
      </div>
      <div class="row row-wrap mt-s">
        <a class="btn btn-ghost btn-xs" href="#/admin/products/${i.id}">${c("edit")} ${t("common.edit")}</a>
        <a class="btn btn-ghost btn-xs" href="#/product/${i.id}" target="_blank" rel="noopener">${c("external")} ${t("adm.view")}</a>
      </div>`,$(t("adm.bFound"))}catch(o){n.innerHTML=r`<p class="muted small">${c("alert")} ${p(o?.message||t("adm.bNotFound"))}</p>`,o?.status!==404&&y(o)}finally{a.querySelector("[name=code]").value="",a.querySelector("[name=code]").focus()}});g("adm-ix-run",async(e,a)=>{let s=Number(a.dataset.count||0)>0,n=document.querySelector("[data-ix-progress]"),o=document.querySelector("[data-ix-bar]"),i=document.querySelector("[data-ix-status]"),l=[...document.querySelectorAll(".ix-item")];if(!l.length)return;let m=s?l.filter(k=>!k.classList.contains("on")):l;if(!m.length){$(t("adm.ixDone"));return}a.disabled=!0,n&&(n.hidden=!1);let u=0,f=0,v=[],S=async()=>{if(v.length)try{let k=await h.post("/api/admin/image-index",{entries:v.splice(0,v.length)});f+=k.indexed||0}catch(k){y(k)}};for(let k of m){let E=k.querySelector("img");if(E?.src)try{let M=E.src.startsWith("http")&&!E.src.startsWith(location.origin)?h.url("/api/admin/image-thumb",{url:E.src}):E.src,q=await ss(M),K=k.dataset.pid;K&&v.push({productId:K,dhash:q.dhash,hist:q.hist})}catch{}u++,o&&(o.style.width=`${Math.round(u/m.length*100)}%`),i&&(i.textContent=`${b(u)} / ${b(m.length)}`),v.length>=40&&await S()}await S(),a.disabled=!1,$(`${t("adm.ixDone")} \u2014 ${b(f)}`),T(!0)})});var ks={};G(ks,{allowedSections:()=>Gn,mount:()=>cm,render:()=>rm,title:()=>im});async function rm(e){let a=e.params.section||"",s=ec(a),n=Gn(),o="";if(!s)o=$a("warn",a?t("adm.noPermission"):t("err.forbidden"))+r`<div class="card mt"><strong>${t("adm.title")}</strong><p class="muted small mt-s">${t("adm.noPermission")}</p></div>`;else try{o=await(await s.mod()).render({...e,params:{...e.params,section:s.id},admNav:n})}catch(l){console.error("[admin] section render failed",l),o=$a("danger",`${t("err.generic")} (${p(l?.message||"")})`)}let i=[...new Set(n.map(l=>l.grp))];return r`
    <div class="row row-between row-wrap mb">
      <div class="row">
        <h1 class="section-title">${c("settings")} ${t("adm.title")}</h1>
        <span class="badge-pill bp-accent">${p(d.me?.role==="owner"?w()?"\u0645\u0627\u0644\u06A9":"Owner":w()?"\u06A9\u0627\u0631\u0645\u0646\u062F":"Staff")}</span>
      </div>
      <div class="row row-wrap">
        ${V("settings.edit")?r`
          <button class="btn btn-sm ${d.sleeping?"btn-success":"btn-ghost"}" data-act="adm-sleep-toggle" title="${d.sleeping?t("sys.turnOn"):t("sys.turnOff")}">
            ${c(d.sleeping?"zap":"moon")} ${d.sleeping?t("sys.turnOn"):t("sys.turnOff")}
          </button>`:""}
        <a class="btn btn-ghost btn-sm" href="#/">${c("arrow-right")} ${t("adm.backToSite")}</a>
      </div>
    </div>
    ${d.sleeping?$a("warn",t("sys.sleepBanner")):""}
    <div class="adm-grid">
      <aside class="adm-side">
        ${i.map(l=>r`
          <div class="grp">${p(w()?nm[l]:om[l])}</div>
          ${n.filter(m=>m.grp===l).map(m=>r`
            <a href="#/admin${m.id?`/${m.id}`:""}" class="${m.id===a||!a&&!m.id?"active":""}">
              ${c(m.icon)} <span>${m.label()}</span>
              ${m.count?r`<span class="cnt">${b(m.count)}</span>`:""}
            </a>`)}
        `).join("")}
      </aside>
      <div data-admbody>${o}</div>
    </div>`}async function cm(e,a){L(e);let s=a.params.section||"",n=ec(s);if(!n)return null;try{let o=await n.mod();if(typeof o.mount=="function")return o.mount(e.querySelector("[data-admbody]")||e,a)}catch(o){console.error("[admin] section mount failed",o)}return null}var sm,nm,om,Gn,ec,im,Ss=O(()=>{B();W();_();X();Q();le();ee();sm=[{grp:"shop",id:"",perm:"dashboard.view",icon:"chart",label:()=>t("adm.dashboard"),mod:()=>Promise.resolve().then(()=>(hr(),br))},{grp:"shop",id:"products",perm:"products.view",icon:"box",label:()=>t("adm.products"),mod:()=>Promise.resolve().then(()=>(yr(),vr))},{grp:"shop",id:"categories",perm:"categories.manage",icon:"layers",label:()=>t("adm.categories"),mod:()=>Promise.resolve().then(()=>(Sr(),kr))},{grp:"shop",id:"orders",perm:"orders.view",icon:"package-check",label:()=>t("adm.orders"),mod:()=>Promise.resolve().then(()=>(Tr(),qr))},{grp:"people",id:"reviews",perm:"reviews.moderate",icon:"star",label:()=>t("adm.reviews"),mod:()=>Promise.resolve().then(()=>(Ar(),Cr))},{grp:"people",id:"tickets",perm:"tickets.manage",icon:"ticket",label:()=>t("adm.tickets"),mod:()=>Promise.resolve().then(()=>(Bn(),Hn)),feat:"tickets"},{grp:"people",id:"support",perm:"tickets.manage",icon:"headset",label:()=>t("adm.supportChat"),mod:()=>Promise.resolve().then(()=>(Bn(),Hn)),feat:"liveSupport"},{grp:"people",id:"feedback",perm:"feedback.manage",icon:"flag",label:()=>t("adm.feedback"),mod:()=>Promise.resolve().then(()=>(Lr(),Mr))},{grp:"people",id:"users",perm:"users.view",icon:"users",label:()=>t("adm.users"),mod:()=>Promise.resolve().then(()=>(Fr(),Br))},{grp:"people",id:"visitors",perm:"users.view",icon:"eye",label:()=>t("adm.visitors"),mod:()=>Promise.resolve().then(()=>(Ca(),Ta))},{grp:"growth",id:"coupons",perm:"coupons.manage",icon:"percent",label:()=>t("adm.coupons"),mod:()=>Promise.resolve().then(()=>(da(),la)),feat:"coupons"},{grp:"growth",id:"settings/partners",perm:"settings.edit",icon:"store",label:()=>t("adm.sPartners"),mod:()=>Promise.resolve().then(()=>(Pa(),Da)),feat:"partners"},{grp:"growth",id:"ads",perm:"ads.manage",icon:"tag",label:()=>t("adm.ads"),mod:()=>Promise.resolve().then(()=>(da(),la)),feat:"ads"},{grp:"growth",id:"notifications",perm:"notifications.send",icon:"bell",label:()=>t("adm.notifications"),mod:()=>Promise.resolve().then(()=>(da(),la)),feat:"announcements"},{grp:"growth",id:"lottery",perm:"settings.edit",icon:"gift2",label:()=>t("adm.lottery"),mod:()=>Promise.resolve().then(()=>(da(),la)),feat:"lottery"},{grp:"system",id:"telegram",perm:"settings.edit",icon:"send",label:()=>t("adm.telegram"),mod:()=>Promise.resolve().then(()=>(da(),la))},{grp:"system",id:"settings",perm:"settings.edit",icon:"settings",label:()=>t("adm.settings"),mod:()=>Promise.resolve().then(()=>(Pa(),Da))},{grp:"system",id:"theme",perm:"theme.edit",icon:"sun",label:()=>t("adm.theme"),mod:()=>Promise.resolve().then(()=>(Pa(),Da))},{grp:"system",id:"features",perm:"settings.edit",icon:"zap",label:()=>t("adm.features"),mod:()=>Promise.resolve().then(()=>(Pa(),Da))},{grp:"system",id:"pages",perm:"pages.edit",icon:"file",label:()=>t("adm.pages"),mod:()=>Promise.resolve().then(()=>(Zr(),Xr))},{grp:"system",id:"barcode",perm:"barcode.print",icon:"barcode",label:()=>t("adm.barcode"),mod:()=>Promise.resolve().then(()=>(Yn(),Vn)),feat:"barcode"},{grp:"system",id:"imageSearch",perm:"imagesearch.index",icon:"camera",label:()=>t("adm.imageSearch"),mod:()=>Promise.resolve().then(()=>(Yn(),Vn)),feat:"imageSearch"},{grp:"system",id:"audit",perm:"audit.view",icon:"history",label:()=>t("adm.audit"),mod:()=>Promise.resolve().then(()=>(Ca(),Ta))},{grp:"system",id:"stats",perm:"stats.view",icon:"chart",label:()=>t("adm.stats"),mod:()=>Promise.resolve().then(()=>(Ca(),Ta))},{grp:"system",id:"data",perm:"data.export",icon:"download",label:()=>t("adm.export"),mod:()=>Promise.resolve().then(()=>(Ca(),Ta))}],nm={shop:"\u0641\u0631\u0648\u0634\u06AF\u0627\u0647",people:"\u0645\u0634\u062A\u0631\u06CC\u200C\u0647\u0627",growth:"\u0631\u0634\u062F \u0648 \u062A\u0628\u0644\u06CC\u063A\u0627\u062A",system:"\u0633\u0627\u0645\u0627\u0646\u0647"},om={shop:"Store",people:"Customers",growth:"Growth & ads",system:"System"},Gn=()=>sm.filter(e=>(!e.perm||V(e.perm))&&(!e.feat||I(e.feat))),ec=e=>Gn().find(a=>a.id===e)||null;im=()=>t("adm.title");g("adm-sleep-toggle",async(e,a)=>{let s=!d.sleeping,n=0;if(s){let o=await ot({title:t("sys.turnOff"),text:t("sys.offConfirm"),label:t("sys.autoWakeMins"),value:"0",type:"number"});if(o===null)return;n=Math.max(0,Number(o)||0)}await A(a,async()=>{try{await h.post(s?"/api/system/sleep":"/api/system/wake",s?{minutes:n}:{}),await Ne({silent:!0}),document.dispatchEvent(new CustomEvent("sleep:changed")),$(s?n?t("sys.asleepTimed",{n}):t("sys.asleep"):t("sys.awake")),T(!0)}catch(o){y(o)}})})});var tc={};G(tc,{mount:()=>dm,render:()=>lm});async function lm(){let e=decodeURIComponent((location.hash||"#/").slice(1));return r`
    <div class="center col mt-l nf-wrap">
      <div class="nf-code">۴۰۴</div>
      ${P({icon:"search",title:t("err.notFound"),text:`${t("err.notFoundText")} \u2014 ${e}`,action:{href:"#/",label:t("err.goHome")}})}
      <div class="row row-wrap center">
        <a class="btn btn-ghost btn-sm" href="#/products">${c("grid")} ${t("nav.products")}</a>
        <a class="btn btn-ghost btn-sm" href="#/pages/faq">${c("info")} ${t("footer.faq")}</a>
        <a class="btn btn-ghost btn-sm" href="#/pages/contact">${c("phone")} ${t("contact.title")}</a>
        <a class="btn btn-ghost btn-sm" href="#/search/image">${c("camera")} ${t("search.byImage")}</a>
      </div>
      ${d.recent?.length?r`<p class="muted small">${t("misc.recentlyViewed")}: ${d.recent.length}</p>`:""}
    </div>`}function dm(e){return L(e),null}var ac=O(()=>{B();W();_();ce()});var ct={};G(ct,{currentRoute:()=>hm,href:()=>fm,initRouter:()=>Kn,navigate:()=>de,parseHash:()=>nc,refresh:()=>T,render:()=>rc,routes:()=>sc,start:()=>ma});function nc(e=location.hash){let a=String(e||"").replace(/^#/,"");if(!a||a==="/")return{path:"/",query:new URLSearchParams,hashStr:""};let s="",n=a.indexOf("#");n>=0&&(s=a.slice(n+1),a=a.slice(0,n));let o=a.indexOf("?"),i=new URLSearchParams(o>=0?a.slice(o+1):""),l=o>=0?a.slice(0,o):a;return l.startsWith("/")||(l=`/${l}`),l=l.replace(/\/{2,}/g,"/"),l.length>1&&l.endsWith("/")&&(l=l.slice(0,-1)),{path:l,query:i,hashStr:s}}function um(e){let a=e.split("/").filter(s=>s!=="");for(let s of sc){let n=s.pattern.split("/").filter(l=>l!=="");if(n.length!==a.length)continue;let o={},i=!0;for(let l=0;l<n.length;l++)if(n[l].startsWith(":"))o[n[l].slice(1)]=decodeURIComponent(a[l]);else if(n[l]!==a[l]){i=!1;break}if(i)return{route:s,params:o}}return{route:pm,params:{}}}function bm(e,a){if(!e)return null;if(e==="auth"){if(!d.me){let s=encodeURIComponent(a.full);return oe(t("err.loginRequired")),`#/auth?next=${s}`}return null}if(e==="admin")return d.me?.isAdmin?null:(j(t("err.forbidden")),"#/");if(e.startsWith("perm:")){let s=e.slice(5),{can:n}=a.helpers;return n(s)?null:(j(t("adm.noPermission")),"#/admin")}if(e.startsWith("feature:")){let s=e.slice(8);return d.settings?.features?.[s]===!1?(oe(t("err.notFound")),"#/"):null}return null}async function rc(e){let a=mm();if(!a)return;let s=++La;if(xs){try{xs()}catch{}xs=null}wa(!0),a.innerHTML=e.skeleton||'<div class="sk sk-card"></div>';let n=null;try{n=await e.route.load()}catch(i){if(console.error("[router] load failed",i),s!==La)return;a.innerHTML=`<div class="empty"><h4>${t("err.generic")}</h4><p>${t("err.network")}</p></div>`,wa(!1);return}if(s!==La)return;let o="";try{o=await n.render(e)}catch(i){console.error("[router] render failed",i),o=`<div class="empty"><h4>${t("err.generic")}</h4><p>${String(i?.message||i)}</p></div>`}if(s===La){a.innerHTML=o,L(a),setTimeout(()=>Promise.resolve().then(()=>(Jn(),Qn)).then(i=>i.maybeConsent&&i.maybeConsent()),300);try{let i=d.settings?.store?.[e.lang==="en"?"nameEn":"name"]||"\u06AF\u0631\u06CC\u0646 \u0627\u067E\u0644",l=typeof n.title=="function"?n.title(e):n.title||e.route.title?.(e)||"";document.title=l?`${l} \xB7 ${i}`:i}catch{}try{if(typeof n.mount=="function"){let i=n.mount(a,e);typeof i=="function"&&(xs=i)}}catch(i){console.error("[router] mount failed",i)}if(s===La){wa(!1),document.dispatchEvent(new CustomEvent("view:rendered",{detail:e})),gm(e.path),e.keepScroll||(window.scrollTo(0,0),setTimeout(()=>window.scrollTo(0,0),50));try{a.closest("#view")?.focus({preventScroll:!0})}catch{}}}}function gm(e){document.querySelectorAll(".nav-link[data-nav-key]").forEach(a=>{a.classList.toggle("active",a.dataset.navKey===e||a.dataset.navKey!=="/"&&e.startsWith(a.dataset.navKey))}),document.querySelectorAll(".mobile-nav a[data-mn]").forEach(a=>{let s=a.dataset.mn,n=s==="home"&&e==="/"||s==="cats"&&(e.startsWith("/products")||e.startsWith("/category")||e.startsWith("/product"))||s==="search"&&e.startsWith("/search")||s==="cart"&&e.startsWith("/cart")||s==="me"&&(e.startsWith("/account")||e.startsWith("/auth"));a.classList.toggle("active",n)})}function de(e,{replace:a=!1,keepScroll:s=!1}={}){let n=String(e||"#/"),o=n.startsWith("#")?n:`#${n}`;if(location.hash===o){ma({keepScroll:s});return}a?history.replaceState(null,"",o):location.hash=o,a&&ma({keepScroll:s})}function fm(e,a){let n=(a instanceof URLSearchParams?a:new URLSearchParams(a||{})).toString();return`#${e.startsWith("/")?e:`/${e}`}${n?`?${n}`:""}`}function ma(e={}){let{path:a,query:s,hashStr:n}=nc(),{route:o,params:i}=um(a),l=`${a}${s.toString()?`?${s}`:""}`,m={path:a,params:i,query:s,hashStr:n,full:l,route:o,lang:document.documentElement.getAttribute("data-lang")||"fa",keepScroll:!!e.keepScroll,skeleton:o.skeleton||"",helpers:{}};oc=m;let u=bm(o.guard,m);if(u){if(u!==location.hash){location.replace(u);return}return}rc(m)}function Kn(){window.addEventListener("hashchange",()=>ma()),ma()}function T(e=!1){ma({keepScroll:e})}var mm,sc,pm,La,oc,xs,hm,ee=O(()=>{B();W();_();X();mm=()=>N("#viewInner"),sc=[{pattern:"/",load:()=>Promise.resolve().then(()=>(wo(),$o)),title:()=>t("nav.home")},{pattern:"/products",load:()=>Promise.resolve().then(()=>(mn(),dn)),title:()=>t("catalog.title")},{pattern:"/category/:id",load:()=>Promise.resolve().then(()=>(mn(),dn)),title:()=>t("catalog.title")},{pattern:"/product/:id",load:()=>Promise.resolve().then(()=>(Eo(),xo)),title:e=>e.params.id},{pattern:"/search/image",load:()=>Promise.resolve().then(()=>(To(),qo)),title:()=>t("search.imageTitle"),guard:"feature:imageSearch"},{pattern:"/cart",load:()=>Promise.resolve().then(()=>(Ao(),Co)),title:()=>t("cart.title")},{pattern:"/checkout",load:()=>Promise.resolve().then(()=>(Lo(),Mo)),title:()=>t("checkout.title")},{pattern:"/checkout/done/:id",load:()=>Promise.resolve().then(()=>(Io(),No)),title:()=>t("checkout.successTitle")},{pattern:"/pay/:id",load:()=>Promise.resolve().then(()=>(Ho(),Ro)),title:()=>t("common.payment")},{pattern:"/compare",load:()=>Promise.resolve().then(()=>(Fo(),Bo)),title:()=>t("compare.title"),guard:"feature:compare"},{pattern:"/lottery",load:()=>Promise.resolve().then(()=>(jo(),Oo)),title:()=>t("lot.title")},{pattern:"/price-check",load:()=>Promise.resolve().then(()=>(Vo(),_o)),title:()=>t("priceCheck.title"),guard:"feature:priceCheckDevice"},{pattern:"/auth",load:()=>Promise.resolve().then(()=>(gn(),hn)),title:()=>t("auth.title")},{pattern:"/auth/:mode",load:()=>Promise.resolve().then(()=>(gn(),hn)),title:()=>t("auth.title")},{pattern:"/account",load:()=>Promise.resolve().then(()=>(xn(),Sn)),title:()=>t("acc.title"),guard:"auth"},{pattern:"/account/:section",load:()=>Promise.resolve().then(()=>(xn(),Sn)),title:()=>t("acc.title"),guard:"auth"},{pattern:"/account/orders/:id",load:()=>Promise.resolve().then(()=>(nr(),sr)),title:()=>t("acc.trackOrder"),guard:"auth"},{pattern:"/account/tickets/:id",load:()=>Promise.resolve().then(()=>(cr(),rr)),title:()=>t("common.ticket"),guard:"auth"},{pattern:"/stats",load:()=>Promise.resolve().then(()=>(dr(),lr)),title:()=>t("nav.stats"),guard:"feature:publicStats"},{pattern:"/pages/:key",load:()=>Promise.resolve().then(()=>(ur(),pr)),title:e=>e.params.key},{pattern:"/admin",load:()=>Promise.resolve().then(()=>(Ss(),ks)),title:()=>t("adm.title"),guard:"admin"},{pattern:"/admin/:section",load:()=>Promise.resolve().then(()=>(Ss(),ks)),title:()=>t("adm.title"),guard:"admin"},{pattern:"/admin/:section/:id",load:()=>Promise.resolve().then(()=>(Ss(),ks)),title:()=>t("adm.title"),guard:"admin"}],pm={pattern:"/404",load:()=>Promise.resolve().then(()=>(ac(),tc)),title:()=>t("err.notFound")};La=0,oc=null,xs=null,hm=()=>oc});function g(e,a){return Ut.set(e,a),a}function ir(e){return Ut.get(e)}async function Ht(e){if(!e)return;let a=e.querySelector("[data-cch]"),s=e.querySelector("[data-cimg]"),n=e.querySelector("[data-ctok]"),o=e.querySelector("[data-cst]"),i=e.querySelector("[name=captchaAnswer]");n&&(n.value=""),i&&(i.value="",i.disabled=!1);let l=e.querySelector("[name=captchaBox]");l&&(l.disabled=!1);try{let m=await h.get("/api/captcha");if(m.disabled){e.hidden=!0;return}e.hidden=!1,e.dataset.cid=m.id,s&&(s.innerHTML=m.svg||""),o&&(o.textContent=t("captcha.hint")),a&&(a.hidden=!l?.checked)}catch{}}function Zt(e){let a=e?.querySelector?.("[data-captcha]");a&&(a.hidden=!1,Ht(a))}function ic(){document.addEventListener("click",a=>{let s=a.target.closest("[data-act]");if(!s||s.tagName==="FORM")return;s.tagName==="A"&&a.preventDefault();let n=s.dataset.act,o=Ut.get(n);if(!o){console.warn("[actions] unknown:",n);return}try{let i=o(a,s);i&&typeof i.catch=="function"&&i.catch(l=>{console.error("[action]",n,l),l?.code&&y(l)})}catch(i){console.error("[action]",n,i)}}),document.addEventListener("submit",a=>{let s=a.target,n=s?.dataset?.act;if(!n)return;a.preventDefault();let o=Ut.get(n);if(!o){console.warn("[actions] unknown submit:",n);return}try{let i=o(a,s);i&&typeof i.catch=="function"&&i.catch(l=>{console.error("[action]",n,l),l?.code&&y(l)})}catch(i){console.error("[action]",n,i)}}),document.addEventListener("change",a=>{let s=a.target;if(s.matches?.(".qty input"))return;let n=s.dataset?.act?null:s.closest?.("form[data-act][data-live]");if(!s.dataset?.act&&!n)return;let o=s.dataset?.act?s:n,i=Ut.get(o.dataset.act);if(i)try{let l=i(a,o);l&&typeof l.catch=="function"&&l.catch(m=>console.error(m))}catch(l){console.error(l)}});let e=0;document.addEventListener("input",a=>{let s=a.target;s.matches?.("[data-act=captcha-check]")&&(clearTimeout(e),e=setTimeout(()=>{let n=Ut.get("captcha-check");n&&!s.disabled&&n(new Event("change"),s)},450))}),document.addEventListener("click",a=>{let s=a.target.closest(".qty [data-q]");if(!s)return;a.preventDefault(),Ut.get("qty-btn")(a,s)}),document.addEventListener("error",a=>{let s=a.target;if(s?.tagName!=="IMG"||s.dataset.fallbackDone)return;s.dataset.fallbackDone="1";let n=s.dataset.glyph||"misc";s.src=vm(n)},!0)}function vm(e){let s=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="300" height="300"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#123a52"/><stop offset="1" stop-color="#0a2135"/></linearGradient></defs><rect width="100" height="100" fill="url(#g)"/><g fill="none" stroke="#7fd3ec" stroke-opacity=".8" stroke-width="3.4" stroke-linejoin="round" stroke-linecap="round"><path d="${cc[e]||cc.box}"/></g></svg>`;return`data:image/svg+xml;utf8,${encodeURIComponent(s)}`}var Ut,cc,le=O(()=>{_();W();X();Q();B();_();ee();Ut=new Map;g("add-cart",async(e,a)=>{let s=a.dataset.id,n=Number(a.dataset.qty||1)||1;await A(a,async()=>{try{await za(s,n),$(t("card.added"),{timeout:2600})}catch(o){y(o)}})});g("wish-toggle",async(e,a)=>{if(!d.me){de("#/auth?next="+encodeURIComponent(location.hash.slice(1)));return}try{let s=await Ws(a.dataset.id);oe(s.in?t("card.wishlistAdd"):t("card.wishlistRemove"),{timeout:2e3})}catch(s){y(s)}});g("compare-toggle",async(e,a)=>{if(!d.me){de("#/auth?next="+encodeURIComponent(location.hash.slice(1)));return}try{(await _s(a.dataset.id)).in===!1?oe(t("compare.remove"),{timeout:1800}):$(t("compare.add"),{timeout:1800})}catch(s){y(s)}});g("notify-me",async(e,a)=>{if(!d.me){de("#/auth?next="+encodeURIComponent(location.hash.slice(1)));return}try{let s=await Vs(a.dataset.id);$(s.on?t("common.notified"):t("common.notifyMe"),{timeout:2400}),document.querySelectorAll(`[data-act="notify-me"][data-id="${a.dataset.id}"]`).forEach(n=>{n.classList.toggle("active",s.on)})}catch(s){y(s)}});g("lightbox",(e,a)=>{let s=[];try{s=JSON.parse(a.dataset.imgs||"[]")}catch{s=[a.dataset.imgs||""]}Mt(s,Number(a.dataset.i||0),a.dataset.alt||"")});g("sound-toggle",()=>{let e=!d.prefs?.uiSound;wt("uiSound",e);let a=document.querySelector('[data-act="sound-toggle"]');a&&(a.setAttribute("aria-pressed",String(e)),a.innerHTML=r`${c(e?"volume":"volume-off")} ${t("misc.uiSound")} <span class="um-sw ${e?"on":""}" aria-hidden="true"></span>`),oe(e?t("misc.uiSoundOn"):t("misc.uiSoundOff"),{timeout:1600}),e&&Qa(!0)});g("copy",async(e,a)=>{let{copyText:s}=await Promise.resolve().then(()=>(B(),Oa));try{await s(a.dataset.text||a.textContent.trim()),$(t("common.copied"),{timeout:1800})}catch{j(t("err.generic"))}});g("share",async(e,a)=>{let s=a.dataset.url||location.href,n=a.dataset.title||document.title;if(navigator.share)try{await navigator.share({title:n,url:s});return}catch{return}let{copyText:o}=await Promise.resolve().then(()=>(B(),Oa));try{await o(s),$(t("misc.shareDone"),{timeout:2e3})}catch{j(t("err.generic"))}});g("quick-view",async(e,a)=>{let s=a.dataset.id;try{let o=(await h.get(`/api/products/${encodeURIComponent(s)}`)).product;ie({title:ue(o),size:"md",body:r`
        <div class="row">
          <div class="qv-media">${o.images?.[0]?r`<img src="${o.images[0]}" alt="${ue(o)}" class="qv-img" data-glyph="${o.glyph||"misc"}">`:c(o.glyph||"box")}</div>
          <div class="grow">
            ${o.brandName?r`<div class="pc-brand">${o.brandName}</div>`:""}
            <div class="pc-rate mb-s">${Me(o.ratingAvg)} <span class="muted tiny">${b(o.ratingAvg)} · ${b(o.ratingCount)} ${t("common.reviews")}</span></div>
            <div class="buy-price">
              ${o.oldPrice>o.price?r`<span class="pc-old">${C(o.oldPrice)}</span>`:""}
              <span class="buy-now">${C(o.price)}</span>
            </div>
            <div class="pc-stock ${o.stock<=0?"out":o.stock<=3?"low":""}"><span class="dot"></span>${o.stock<=0?t("card.outOfStock"):t("pdp.stockCount",{n:b(o.stock)})}</div>
          </div>
        </div>
        ${o.description?r`<p class="muted small mt-s">${p(o.description).slice(0,220)}…</p>`:""}
        <div class="row mt">
          <a class="btn btn-ghost" href="#/product/${o.id}">${t("common.details")} ${c("chevron-left")}</a>
        </div>`,footer:r`
        <button type="button" class="btn btn-ghost" data-close>${t("common.close")}</button>
        <button type="button" class="btn btn-primary" data-add ${o.stock<=0?"disabled":""}>${c("cart")} ${t("pdp.addToCart")}</button>`,onMount:(i,l)=>{i.querySelector("[data-close]").addEventListener("click",()=>l.close()),i.querySelector("[data-add]").addEventListener("click",async m=>{await A(m.currentTarget,async()=>{try{await za(o.id,1),$(t("card.added"),{timeout:2200}),l.close()}catch(u){y(u)}})})}})}catch(n){y(n)}});g("ui-retry",()=>{Promise.resolve().then(()=>(ee(),ct)).then(e=>e.refresh())});g("scroll-top",()=>window.scrollTo({top:0,behavior:"smooth"}));g("qty-btn",(e,a)=>{let n=a.closest(".qty")?.querySelector("input");if(!n)return;let o=Number(a.dataset.q||0),i=Number(n.min||1),l=Number(n.max||99),m=Math.max(i,Math.min(l,(Number(n.value)||i)+o));n.value=m,n.dispatchEvent(new Event("change",{bubbles:!0}))});g("confirm-nav",async(e,a)=>{await ge({text:a.dataset.text||t("misc.confirmDelete"),danger:a.dataset.danger==="1",okText:a.dataset.ok||""})&&a.dataset.href&&de(a.dataset.href)});g("acc",(e,a)=>{let s=a.closest(".acc-item");if(!s)return;let n=s.classList.toggle("open"),o=s.querySelector(".acc-b");o&&(o.hidden=!n),a.setAttribute("aria-expanded",String(n))});g("print-page",()=>{window.print()});g("captcha-open",(e,a)=>{let s=a.closest("[data-captcha]"),n=s?.querySelector("[data-cch]");n&&(n.hidden=!a.checked,a.checked&&!s.dataset.cid&&Ht(s))});g("captcha-refresh",(e,a)=>Ht(a.closest("[data-captcha]")));g("captcha-check",async(e,a)=>{let s=a.closest("[data-captcha]");if(!s||a.disabled||s.dataset.verifying)return;let n=s?.querySelector("[data-cst]"),o=s?.querySelector("[data-ctok]"),i=String(a.value||"").trim();if(!(!i||!s?.dataset.cid)){s.dataset.verifying="1";try{let l=await h.post("/api/captcha/verify",{id:s.dataset.cid,answer:i});o&&(o.value=l.token||"");let m=s.querySelector("[name=captchaBox]");m&&(m.checked=!0,m.disabled=!0),a.disabled=!0,n&&(n.textContent=t("captcha.solved"))}catch(l){n&&(n.textContent=l?.message||t("captcha.hint")),await Ht(s)}finally{delete s.dataset.verifying}}});g("noop",()=>{});cc={cable:"M30 40h14v14H30zM37 54c0 18 12 20 20 14s20-4 22 8M62 66h16v12H62z",adapter:"M34 34h32v34H34zM42 34V22M58 34V22M44 68h12v8H44z",shield:"M34 22h32v56H34zM40 28h12v16H40z",layers:"M36 26h28v48H36zM30 34l30-14 30 14",battery:"M26 40h48v26H26zM32 46h8v14h-8zM44 46h8v14h-8z",plug:"M24 42h34v16H24zM58 36h22v28H58z",speaker:"M30 24h40v52H30zM50 54a10 10 0 1 0 0 .1M50 32a5 5 0 1 0 0 .1",headset:"M28 56a22 22 0 0 1 44 0M24 52h10v20H24zM66 52h10v20H66z",watch:"M38 34h24v32H38zM42 14h16v20H42zM42 66h16v20H42z",camera:"M50 18a18 18 0 1 0 0 36 18 18 0 0 0 0-36zM50 54v34M50 88l-14-24M50 88l14-24",zap:"M26 44h14l6-8h10l6 8h14a10 10 0 0 1 0 20H26a10 10 0 0 1 0-20",truck:"M38 28h24v30H38zM44 58h12v10H44z",light:"M30 26h18l6 12H24zM34 38h20v40H34z",mic:"M42 18h16v28H42zM36 40a14 14 0 0 0 28 0M50 54v30M36 86h28",box:"M26 36 50 24l24 12v28L50 76 26 64zM26 36l24 12 24-12M50 48v28",phone:"M36 16h28v68H36zM44 74h12"};g("pdp-lower-price",(e,a)=>{let s=a.dataset.id;Promise.resolve().then(()=>(X(),Ja)).then(({modal:n})=>{n({title:"\u06AF\u0632\u0627\u0631\u0634 \u0642\u06CC\u0645\u062A \u0645\u0646\u0627\u0633\u0628\u200C\u062A\u0631",content:r`
        <form data-act="submit-lower-price" data-id="${s}">
          <p class="mb">اگر این کالا را در فروشگاه دیگری با قیمت پایین‌تر دیده‌اید، به ما اطلاع دهید:</p>
          <div class="form-grid mb">
            ${field({label:"\u0642\u06CC\u0645\u062A \u0641\u0631\u0648\u0634\u06AF\u0627\u0647 \u062F\u06CC\u06AF\u0631 (\u062A\u0648\u0645\u0627\u0646)",name:"price",type:"number",required:!0})}
            ${field({label:"\u0622\u062F\u0631\u0633 \u0641\u0631\u0648\u0634\u06AF\u0627\u0647 (\u0644\u06CC\u0646\u06A9 \u0633\u0627\u06CC\u062A \u06CC\u0627 \u0646\u0627\u0645)",name:"url",required:!0})}
          </div>
          <div class="row row-wrap mt">
            <button type="submit" class="btn btn-primary">${c("send")} ثبت</button>
            <button type="button" class="btn btn-ghost" data-act="modal-close">لغو</button>
          </div>
        </form>
      `})})});g("submit-lower-price",async(e,a)=>{e.preventDefault();let{withBusy:s,toastSuccess:n,toastApiError:o}=await Promise.resolve().then(()=>(X(),Ja));await s(a,async()=>{try{await h.post("/api/reports/lower-price",{productId:a.dataset.id,price:Number(a.price.value),url:a.url.value}),n("\u0628\u0627 \u062A\u0634\u06A9\u0631! \u06AF\u0632\u0627\u0631\u0634 \u0634\u0645\u0627 \u062B\u0628\u062A \u0634\u062F."),a.closest('[role="dialog"]')?.querySelector("[data-lx]")?.click()}catch(i){o(i)}})});g("accept-consent-now",async(e,a)=>{let{setConsent:s}=await Promise.resolve().then(()=>(_(),va));s({terms:!0,privacy:!0,marketing:!1}),$(isFa()?"\u0642\u0648\u0627\u0646\u06CC\u0646 \u0648 \u0645\u0642\u0631\u0631\u0627\u062A \u0628\u0627 \u0645\u0648\u0641\u0642\u06CC\u062A \u067E\u0630\u06CC\u0631\u0641\u062A\u0647 \u0634\u062F.":"Terms accepted."),sessionStorage.removeItem("consentDeferred");let{maybeConsent:n}=await Promise.resolve().then(()=>(Jn(),Qn));n(),Promise.resolve().then(()=>(ee(),ct)).then(o=>o.refresh())})});function ym(){let e=_e().mapCoords||{lat:28.9684,lng:50.8385};return{lat:Number(e.lat),lng:Number(e.lng)}}function $m(e,a){let s=`${e.lat},${e.lng}`,n=a?`${a.lat},${a.lng}`:"";return[{id:"neshan",label:t("contact.neshan"),icon:"map",href:a?`https://nshn.ir/maps?origin=${n}&destination=${s}&type=drive`:`https://nshn.ir/?lat=${e.lat}&lng=${e.lng}`},{id:"balad",label:t("contact.balad"),icon:"pin",href:a?`https://balad.ir/route/${n.replace(",",",")}/${s}`:`https://balad.ir/map?lat=${e.lat}&lng=${e.lng}`},{id:"osm",label:t("contact.osm"),icon:"globe",href:a?`https://www.openstreetmap.org/directions?from=${n.replace(",",";")}&to=${s.replace(",",";")}`:`https://www.openstreetmap.org/?mlat=${e.lat}&mlon=${e.lng}#map=17/${e.lat}/${e.lng}`},{id:"google",label:t("contact.google"),icon:"external",href:a?`https://www.google.com/maps/dir/?api=1&destination=${s}&origin=${n}`:`https://www.google.com/maps/search/?api=1&query=${s}`}]}function wm(){return new Promise(e=>{if(!("geolocation"in navigator))return e(null);let a=!1,s=o=>{a||(a=!0,e(o))},n=setTimeout(()=>s(null),7e3);navigator.geolocation.getCurrentPosition(o=>{clearTimeout(n),s({lat:o.coords.latitude,lng:o.coords.longitude})},()=>{clearTimeout(n),s(null)},{enableHighAccuracy:!1,timeout:6e3,maximumAge:12e4})})}function km(){let e=ym(),a=null;return ie({title:t("contact.mapAsk"),size:"sm",body:r`
      <p class="notice notice-info mb">${c("info")}<span>${t("contact.mapPermission")}</span></p>
      <div class="col" data-maps></div>`,footer:r`<button type="button" class="btn btn-ghost" data-x>${t("common.close")}</button>`,onMount:(n,o)=>{let i=n.querySelector("[data-maps]"),l=()=>{i.innerHTML=$m(e,a).map(m=>r`
          <a class="btn btn-ghost btn-block" href="${m.href}" target="_blank" rel="noopener noreferrer">${c(m.icon)} ${m.label} ${c("external")}</a>`).join("")};l(),n.querySelector("[data-x]").addEventListener("click",()=>o.close()),wm().then(m=>{m&&(a=m,l(),$(t("contact.locationOn"),{timeout:2400}))})}})}var lc=O(()=>{W();_();X();B();le();g("open-map",e=>{e.preventDefault?.(),km()});g("install-app",async()=>{d.installPrompt?await fa()||Lt():Lt()})});var Qn={};G(Qn,{ecoPaused:()=>Gm,maybeConsent:()=>uc,updateBadges:()=>pa});async function Sm(){ic(),Dm(),await Os(),zt(),ua(),Vt(),Mm(),Nm(),Jo(),tn(),an(),Bm(),Fm(),Kn(),Wm(),jm(),Im(),Rm(),Vm(),Km(),Qm(),zm(),Um(),uc(),Om(),mc(),Em(),qm(),Tm(),document.getElementById("bootSplash")?.remove()}function mc(){let e=document.getElementById("welcomeScreen");if(!e)return;let a=Math.max(0,700-(performance.now()-xm));setTimeout(()=>{e.classList.add("gone"),setTimeout(()=>e.remove(),520)},a)}function Em(){let e=document.getElementById("btnRefresh");e&&e.addEventListener("click",async()=>{if(typeof navigator<"u"&&!navigator.onLine){let{toastError:a}=await Promise.resolve().then(()=>(X(),Ja)),{isFa:s}=await Promise.resolve().then(()=>(W(),co));a(s()?"\u0628\u0631\u0627\u06CC \u0628\u0631\u0648\u0632\u0631\u0633\u0627\u0646\u06CC \u0648 \u062D\u0630\u0641 \u06A9\u0634 \u0628\u0627\u06CC\u062F \u0628\u0647 \u0627\u06CC\u0646\u062A\u0631\u0646\u062A \u0645\u062A\u0635\u0644 \u0628\u0627\u0634\u06CC\u062F":"You must be online to refresh the app.");return}try{if("serviceWorker"in navigator){let a=await navigator.serviceWorker.getRegistrations();for(let s of a)await s.unregister()}if("caches"in window){let a=await caches.keys();for(let s of a)await caches.delete(s)}}catch(a){console.warn("Cache clear failed",a)}location.href=location.pathname+"?_nocache="+Date.now()})}function qm(){let e=()=>{for(let s of document.querySelectorAll('button[aria-label],a[aria-label],[role="button"][aria-label]'))s.title||(s.title=s.getAttribute("aria-label")||"")};e();let a=new MutationObserver(()=>{clearTimeout(a._t),a._t=setTimeout(e,350)});a.observe(document.body,{childList:!0,subtree:!0})}function Tm(){let e=new Set,a=(s,n,o)=>{let i=String(s).slice(0,120);if(!(e.has(i)||e.size>12)){e.add(i);try{let l=JSON.stringify({msg:String(s).slice(0,300),src:String(n||"").slice(0,200),line:o||0,path:location.hash.slice(0,120),build:window.__BM_BUILD||""});navigator.sendBeacon?navigator.sendBeacon("/api/client-error",new Blob([l],{type:"application/json"})):fetch("/api/client-error",{method:"POST",headers:{"Content-Type":"application/json"},body:l,keepalive:!0}).catch(()=>{})}catch{}}};window.addEventListener("error",s=>a(s.message,s.filename,s.lineno)),window.addEventListener("unhandledrejection",s=>a(`unhandledrejection: ${s.reason?.message||s.reason}`,location.href,0))}function zt(){let e=_e(),a=Ze(),s=N("#topbar"),n=[];e.freeShipOver&&n.push(w()?`\u0627\u0631\u0633\u0627\u0644 \u0631\u0627\u06CC\u06AF\u0627\u0646 \u0633\u0641\u0627\u0631\u0634\u200C\u0647\u0627\u06CC \u0628\u0627\u0644\u0627\u06CC ${b(e.freeShipOver)} \u062A\u0648\u0645\u0627\u0646`:`Free shipping over ${b(e.freeShipOver)}`),n.push(w()?"\u0636\u0645\u0627\u0646\u062A \u0627\u0635\u0627\u0644\u062A \u06A9\u0627\u0644\u0627\u061B \u0645\u0631\u062C\u0648\u0639 \u062A\u0627 \u06F7 \u0631\u0648\u0632":"Authenticity guarantee; 7-day returns"),e.phone&&n.push(w()?`\u067E\u0634\u062A\u06CC\u0628\u0627\u0646\u06CC \u0647\u0631 \u0631\u0648\u0632 \u06F9 \u062A\u0627 \u06F2\u06F1 \u2014 ${ne(e.phone)}`:`Support 9\u201321 daily \u2014 ${ne(e.phone)}`),e.socials?.instagram&&n.push(w()?"\u062A\u0627\u0632\u0647\u200C\u0647\u0627\u06CC \u06AF\u062C\u062A \u0647\u0631 \u0647\u0641\u062A\u0647 \u062F\u0631 \u0627\u06CC\u0646\u0633\u062A\u0627\u06AF\u0631\u0627\u0645 \u06CC\u0627\u0633\u0627\u06CC\u06CC":"New gadgets weekly on Instagram");let o=d.ticker?.length?d.ticker:n;s.hidden=!1,s.classList.toggle("no-ticker",a.showTicker===!1);let i=o.map(u=>r`<span class="ticker-item">${c("sparkles")} ${u}</span>`).join("");N("#ticker").innerHTML=`<div class="ticker-track">${i}${i}</div>`;let l=N("#tb-phone");l.href=`tel:${e.phone||""}`,l.innerHTML=r`${c("phone")} ${ne(e.phone||"")}`,N("#brandName").textContent=w()?e.name||t("app.name"):e.nameEn||e.name||"Yassaei Electronics",N("#brandTag").textContent=w()?e.tagline||"":e.taglineEn||"",N("#brandLink").setAttribute("aria-label",`${e.name||""} \u2014 ${t("nav.home")}`),Cm(),Am(),qs(),pa();let m=N("#btnInstallApp");m&&(m.hidden=d.installed)}function Cm(){let e=N("#navInner"),a=d.categories.filter(u=>!u.parentId).slice(0,10),n=[{key:"/",href:"#/",icon:"home",label:t("nav.home")},{key:"/products",href:"#/products",icon:"grid",label:t("nav.products")}].map(u=>r`<a class="nav-link" data-nav-key="${u.key}" href="${u.href}">${c(u.icon)} ${u.label}</a>`).join("");n+=r`
    <div class="nav-more">
      <a href="#/products" class="nav-link">${c("layers")} ${t("nav.allCategories")} ${c("chevron-down")}</a>
      <div class="nav-dd mega-menu hidden-default">
        <div class="mega-side">
          ${d.categories.filter(u=>!u.parentId).map(u=>r`<a href="#/category/${u.id}" class="mega-side-link" data-cat="${u.id}">${c(vt(u.glyph))} ${ke(u)}</a>`)}
        </div>
        <div class="mega-content">
          <div class="mega-empty muted small">${t("nav.allCategories")}</div>
        </div>
      </div>
    </div>`;let o=[{key:"/deals",href:"#/products?discount=1",icon:"percent",label:t("nav.deals"),show:I("coupons")},{key:"/new",href:"#/products?sort=newest",icon:"sparkles",label:t("nav.new"),show:!0},{key:"/pages/stats",href:"#/stats",icon:"chart",label:t("nav.stats"),show:I("publicStats")},{key:"/price-check",href:"#/price-check",icon:"barcode",label:t("priceCheck.title"),show:I("priceCheckDevice")},{key:"/lottery",href:"#/lottery",icon:"gift2",label:t("lot.nav"),show:!0},{key:"/pages/installments",href:"#/pages/installments",icon:"credit-card",label:w()?"\u062E\u0631\u06CC\u062F \u0627\u0642\u0633\u0627\u0637\u06CC":"Installments",show:!0},{key:"/pages/about",href:"#/pages/about",icon:"store",label:t("nav.about"),show:!0},{key:"/pages/contact",href:"#/pages/contact",icon:"map",label:t("nav.contact"),show:!0}].filter(u=>u.show);n+=o.map(u=>r`<a class="nav-link" data-nav-key="${u.key}" href="${u.href}">${c(u.icon)} ${u.label}</a>`).join("");let i=nt("ticker");i.length&&(n+=r`<span class="nav-link muted tiny">${i[0].title}</span>`),e.innerHTML=n;let l=e.querySelectorAll(".mega-side-link"),m=e.querySelector(".mega-content");l.length&&m&&l.forEach(u=>{u.addEventListener("mouseenter",()=>{l.forEach(E=>E.classList.remove("active")),u.classList.add("active");let f=u.dataset.cat,v=d.categories.filter(E=>E.parentId===f),S=d.brands.slice(0,10),k='<div class="mega-sub-grid">';v.length&&(k+='<div class="mega-sub-col"><h3>\u062F\u0633\u062A\u0647\u200C\u0628\u0646\u062F\u06CC\u200C\u0647\u0627\u06CC \u0632\u06CC\u0631\u0645\u062C\u0645\u0648\u0639\u0647</h3>',v.forEach(E=>{k+=`<a href="#/category/${E.id}">${ke(E)}</a>`}),k+="</div>"),k+='<div class="mega-sub-col"><h3>\u0628\u0631\u0646\u062F\u0647\u0627\u06CC \u067E\u0631\u0637\u0631\u0641\u062F\u0627\u0631</h3>',S.forEach(E=>{k+=`<a href="#/products?brand=${E.id}">${Fe(E)}</a>`}),k+="</div>",k+="</div>",m.innerHTML=k})})}function Am(){let e=_e();N("#fBrandName").textContent=w()?e.name||t("app.name"):e.nameEn||e.name||"",N("#fDesc").textContent=w()?e.description||"":e.descriptionEn||e.description||"",N("#fYear").textContent=w()?Xe(new Date().getFullYear()):String(new Date().getFullYear()),N("#fBadges").innerHTML=r`
    <span class="f-badge">${c("shield")}<span>${t("home.point1")}</span></span>
    <span class="f-badge">${c("package-check")}<span>${t("home.point2")}</span></span>
    ${I("insurance")?r`<span class="f-badge">${c("scale")}<span>${t("common.insurance")}</span></span>`:""}
    ${I("plus")?r`<span class="f-badge">${c("sparkles")}<span>${t("footer.plus")}</span></span>`:""}`;let a=e.socials||{},s=[["instagram",We(a.instagram),"camera"],["telegram",We(a.telegram),"send"],["whatsapp",a.whatsapp?`https://wa.me/${String(a.whatsapp).replace(/\D/g,"")}`:"","chat"],["eitaa",We(a.eitaa),"globe"]].filter(n=>n[1]);N("#fSocial").innerHTML=s.length?s.map(([n,o,i])=>r`<a href="${o}" target="_blank" rel="noopener noreferrer" aria-label="${n}" title="${n}">${c(i)}</a>`).join(""):r`<span class="muted tiny">${t("footer.contactUs")}</span>`,N("#fContact").innerHTML=r`
    <li>${c("phone")}<span>${t("contact.phone")}: <a href="tel:${e.phone}">${ne(e.phone||"")}</a></span></li>
    <li>${c("chat")}<span>${t("contact.mobile")}: <a href="tel:${e.phone2||e.phone}">${ne(e.phone2||"")}</a></span></li>
    <li>${c("mail")}<span><a href="mailto:${e.email}">${e.email}</a></span></li>
    <li>${c("pin")}<span>${w()?e.address||"":e.addressEn||e.address||""}</span></li>
    <li>${c("clock")}<span>${t("footer.workingHours")}: ${(e.workingHours||[]).map(n=>r`<bdi>${w()?n.fa:n.en} ${w()?n.time:n.timeEn}</bdi>`)}</span></li>`,N("#fMinimap").innerHTML=Qt(),N("#fMinimap").setAttribute("title",t("contact.mapTitle"))}function qs(){let e=N("#userMenu"),a=N("#btnAuth");if(!d.me){e.hidden=!0,a.hidden=!1,a.innerHTML=r`${c("user")}<span data-i18n="nav.login">${t("nav.login")}</span>`;return}a.hidden=!0,e.hidden=!1;let s=d.me,n=(s.name||s.username||"?").trim().charAt(0);e.innerHTML=r`
    <button type="button" class="um-btn" data-um aria-expanded="false" aria-haspopup="true">
      <span class="um-avatar">${p(n)}</span>
      <span class="um-name">${p(s.name||s.username)}</span>
      ${c("chevron-down")}
    </button>
    <div class="um-dd" data-umbox hidden>
      <div class="um-dd-head">
        <div class="b">${p(s.name||s.username)}</div>
        <div class="tiny muted">${p(s.phone||s.email||s.username)}</div>
        ${Ve()?r`<span class="badge-pill bp-accent mt-s">${c("sparkles")} ${t("acc.plus")}</span>`:""}
      </div>
      <a href="#/account">${c("user")} ${t("acc.dashboard")}</a>
      <a href="#/account/orders">${c("package-check")} ${t("acc.orders")}</a>
      <a href="#/account/wishlist">${c("heart")} ${t("acc.wishlist")} <span class="um-count">${b(d.wishlist.length)}</span></a>
      ${I("wallet")?r`<a href="#/account/wallet">${c("wallet")} ${t("acc.wallet")} <span class="um-count">${b(s.wallet?.balance||0)}</span></a>`:""}
      ${I("tickets")?r`<a href="#/account/tickets">${c("ticket")} ${t("acc.tickets")}</a>`:""}
      <a href="#/account/notifications">${c("bell")} ${t("acc.notifications")} ${d.unread?r`<span class="um-count">${b(d.unread)}</span>`:""}</a>
      ${s.isAdmin?r`<div class="sep"></div><a href="#/admin">${c("settings")} ${t("nav.admin")}</a>`:""}
      <div class="sep"></div>
      <button type="button" data-act="sound-toggle" aria-pressed="${d.prefs?.uiSound?"true":"false"}">${c(d.prefs?.uiSound?"volume":"volume-off")} ${t("misc.uiSound")} <span class="um-sw ${d.prefs?.uiSound?"on":""}" aria-hidden="true"></span></button>
      <button type="button" data-act="logout">${c("logout")} ${t("common.logout")}</button>
    </div>`;let o=e.querySelector("[data-um]"),i=e.querySelector("[data-umbox]");o.addEventListener("click",l=>{l.stopPropagation(),i.hidden=!i.hidden,o.setAttribute("aria-expanded",String(!i.hidden))}),document.addEventListener("click",l=>{!i.hidden&&!l.target.closest(".user-menu")&&(i.hidden=!0,o.setAttribute("aria-expanded","false"))})}function pa(){let e=(a,s)=>{let n=N(a);n&&(n.hidden=!s,n.textContent=b(s))};e("#cartBadge",d.cart?.count||0),e("#mnCart",d.cart?.count||0),e("#wishBadge",d.wishlist.length),e("#notifBadge",d.unread)}function Dm(){N("#btnTheme")?.addEventListener("click",()=>{let n=(d.prefs.theme==="auto"?document.documentElement.getAttribute("data-mode")||"dark":d.prefs.theme)==="dark"?"light":"dark";wt("theme",n);let o=N("#btnTheme");o.innerHTML=c(n==="dark"?"moon":"sun")}),N("#btnLang")?.addEventListener("click",async()=>{let s=ve()==="fa"?"en":"fa";wt("locale",s),N("#langChip").textContent=s==="fa"?"EN":"\u0641\u0627",Vt(),zt(),Vt(),T(!0)}),N("#btnMenu")?.addEventListener("click",()=>Pm());let e=N("#fabTop");e?.addEventListener("click",()=>window.scrollTo({top:0,behavior:"smooth"}));let a=!1;addEventListener("scroll",()=>{a||!e||(a=!0,requestAnimationFrame(()=>{e.hidden=scrollY<600,a=!1}))},{passive:!0}),N("#btnInstallApp")?.addEventListener("click",async()=>{d.installPrompt?await fa()||Lt():Lt()})}function Pm(){sn({title:r`<div style="display:flex;align-items:center;gap:12px;font-size:16px;font-weight:700">
      ${c("menu")} ${t("nav.menu")}
    </div>`,body:r`
      <div class="col" style="gap: 8px">
        <a class="nav-link" href="#/" style="padding: 12px; font-size: 15px; border-bottom: 1px solid var(--border)">${c("home")} ${t("nav.home")}</a>
        <a class="nav-link" href="#/products" style="padding: 12px; font-size: 15px; border-bottom: 1px solid var(--border)">${c("grid")} ${t("nav.products")}</a>
        ${d.categories.filter(e=>!e.parentId).map(e=>r`<a class="nav-link" href="#/category/${e.id}" style="padding: 12px; font-size: 15px; border-bottom: 1px solid var(--border)">${c(vt(e.glyph))} ${ke(e)}</a>`).join("")}
        <div class="divider" style="margin: 4px 0"></div>
        <a class="nav-link" href="#/pages/installments" style="padding: 12px; font-size: 15px; border-bottom: 1px solid var(--border)">${c("card")} خرید اقساطی</a>
        <a class="nav-link" href="#/pages/about" style="padding: 12px; font-size: 15px; border-bottom: 1px solid var(--border)">${c("store")} ${t("nav.about")}</a>
        <a class="nav-link" href="#/pages/contact" style="padding: 12px; font-size: 15px; border-bottom: 1px solid var(--border)">${c("map")} ${t("nav.contact")}</a>
        ${d.me?"":r`<a class="btn btn-primary btn-block mt-s" href="#/auth" style="margin-top: 16px">${c("user")} ${t("nav.login")}</a>`}
      </div>`})}function Mm(){let e=N("#searchForm"),a=N("#searchInput"),s=N("#suggestBox"),n=-1,o=()=>{s.hidden=!0,n=-1},i=Yt(async()=>{let l=a.value.trim();if(!l){if(!d.searches.length){o();return}s.hidden=!1,s.innerHTML=r`
        <div class="sg-group">${t("search.recent")}</div>
        ${d.searches.map(m=>r`<div class="sg-item" data-q="${m}">${c("history")}<span class="sg-title">${m}</span></div>`)}`;return}try{let m=await h.get(`/api/search?q=${encodeURIComponent(l)}&limit=7`);s.hidden=!1;let u="";m.didYouMean&&(u+=r`<div class="sg-group">${t("search.didYouMean")}</div><div class="sg-item" data-q="${m.didYouMean}">${c("sparkles")}<span class="sg-title">${m.didYouMean}</span></div>`),m.categories?.length&&(u+=r`<div class="sg-group">${t("search.inCategories")}</div>${m.categories.map(f=>r`<a class="sg-item" href="#/category/${f.id}">${c(vt(f.glyph))}<span class="sg-title">${ke(f)}</span></a>`)}`),m.brands?.length&&(u+=r`<div class="sg-group">${t("search.inBrands")}</div>${m.brands.map(f=>r`<div class="sg-item" data-q="${Fe(f)}">${c("tag")}<span class="sg-title">${Fe(f)}</span></div>`)}`),m.products?.length&&(u+=r`<div class="sg-group">${t("search.inProducts")}</div>${m.products.map(f=>r`
          <a class="sg-item" href="#/product/${f.id}">
            ${f.images?.[0]?r`<img class="sg-thumb" src="${f.images[0]}" alt="" loading="lazy" data-glyph="${f.glyph}">`:c(f.glyph||"box")}
            <span class="grow"><span class="sg-title">${ue(f)}</span><span class="sg-meta">${ke({name:f.categoryName,nameEn:f.categoryNameEn})}</span></span>
            <span class="sg-price">${b(f.price)}</span>
          </a>`)}`),u||(u=r`<div class="sg-item muted">${t("common.noResult")}</div>`),s.innerHTML=u}catch{o()}},240);a.addEventListener("input",i),a.addEventListener("focus",i),document.addEventListener("click",l=>{l.target.closest(".searchbox")||o()}),s.addEventListener("click",l=>{if(l.target.closest("a.sg-item")){o();return}let m=l.target.closest("[data-q]");m&&(l.preventDefault(),a.value=m.dataset.q,o(),Es(m.dataset.q))}),window.addEventListener("hashchange",o),e.addEventListener("submit",l=>{l.preventDefault();let m=a.value.trim();o(),Es(m)}),a.addEventListener("keydown",l=>{let m=[...s.querySelectorAll(".sg-item, a.sg-item")];if(l.key==="ArrowDown"||l.key==="ArrowUp"){if(!m.length)return;l.preventDefault(),n=(n+(l.key==="ArrowDown"?1:-1)+m.length)%m.length,m.forEach((u,f)=>u.classList.toggle("active",f===n)),m[n]?.scrollIntoView({block:"nearest"})}else if(l.key==="Enter"&&n>=0&&m[n]){l.preventDefault();let u=m[n];u.dataset.q?(a.value=u.dataset.q,Es(u.dataset.q)):u.getAttribute("href")&&(location.hash=u.getAttribute("href")),o()}else l.key==="Escape"&&o()}),N("#btnVoiceSearch")?.addEventListener("click",()=>Lm(a,Es)),N("#btnImageSearch")?.addEventListener("click",()=>{if(!I("imageSearch")){oe(t("err.notFound"));return}de("#/search/image")})}function Es(e){let a=String(e||"").trim();a&&(Js(a),de(`/products?q=${encodeURIComponent(a)}`))}async function Lm(e,a){let s=window.SpeechRecognition||window.webkitSpeechRecognition;if(!s){j(t("search.noVoice"));return}try{navigator.mediaDevices?.getUserMedia&&(await navigator.mediaDevices.getUserMedia({audio:!0})).getTracks().forEach(m=>m.stop())}catch{j(t("search.micDenied"));return}let n=new s;n.lang=ve()==="fa"?"fa-IR":"en-US",n.interimResults=!1,n.maxAlternatives=1;let o=N("#btnVoiceSearch");o.classList.add("active");let i=oe(t("search.listening"),{timeout:2600});n.onresult=l=>{i?.close();let m=l.results?.[0]?.[0]?.transcript||"";m?(e.value=m,a(m)):oe(t("search.noSpeech"))},n.onerror=l=>{i?.close();let u={"not-allowed":"search.micDenied","service-not-allowed":"search.micDenied",network:"search.voiceNetwork","no-speech":"search.noSpeech",aborted:null,"audio-capture":"search.noMic"}[l.error];u?j(t(u)):l.error!=="aborted"&&j(t("search.noSpeech"))},n.onend=()=>{o.classList.remove("active"),i?.close()};try{n.start()}catch{o.classList.remove("active")}}function Nm(){let e=null,a=()=>{e?.remove(),e=null,document.removeEventListener("keydown",onKey,!0)},s=async()=>{if(e){a();return}e=ze("div",{class:"cmdk",role:"dialog","aria-modal":"true","aria-label":t("common.search")}),e.innerHTML=r`
      <div class="cmdk-box">
        <input class="cmdk-input" placeholder="${t("common.searchProducts")}" data-ci autocomplete="off">
        <div class="cmdk-list" data-cl></div>
        <div class="cmdk-foot"><span><kbd>↑↓</kbd> ${t("common.select")}</span><span><kbd>Enter</kbd> ${t("common.next")}</span><span><kbd>Esc</kbd> ${t("common.close")}</span></div>
      </div>`,document.body.appendChild(e);let n=e.querySelector("[data-ci]"),o=e.querySelector("[data-cl]");n.focus();let i=()=>[{icon:"home",label:t("nav.home"),href:"#/"},{icon:"grid",label:t("nav.products"),href:"#/products"},{icon:"percent",label:t("nav.deals"),href:"#/products?discount=1"},{icon:"cart",label:t("cart.title"),href:"#/cart"},...d.me?[{icon:"user",label:t("acc.dashboard"),href:"#/account"},{icon:"package-check",label:t("acc.orders"),href:"#/account/orders"},...I("wallet")?[{icon:"wallet",label:t("acc.wallet"),href:"#/account/wallet"}]:[]]:[{icon:"user",label:t("nav.login"),href:"#/auth"}],...d.me?.isAdmin?[{icon:"settings",label:t("adm.title"),href:"#/admin"}]:[],{icon:"moon",label:t("theme.toggle"),run:()=>N("#btnTheme").click()},{icon:"globe",label:"English / \u0641\u0627\u0631\u0633\u06CC",run:()=>N("#btnLang").click()},{icon:"chart",label:t("nav.stats"),href:"#/stats"},{icon:"map",label:t("nav.contact"),href:"#/pages/contact"}],l=async v=>{let S=i().filter(k=>!v||k.label.toLowerCase().includes(v.toLowerCase()));if(v)try{let k=await h.get(`/api/search?q=${encodeURIComponent(v)}&limit=6`);S=[...S,...k.products.map(E=>({icon:E.glyph||"box",label:ue(E),meta:b(E.price),href:`#/product/${E.id}`}))]}catch{}o.innerHTML=S.length?S.map((k,E)=>r`<div class="cmdk-item ${E===0?"active":""}" data-idx="${E}">${c(k.icon)}<span class="grow">${k.label}</span>${k.meta?r`<span class="muted tiny">${k.meta}</span>`:""}</div>`):r`<div class="cmdk-item muted">${t("common.noResult")}</div>`,o._items=S};await l(""),n.addEventListener("input",Yt(()=>l(n.value.trim()),200));let m=v=>{let S=o._items?.[v];S&&(a(),S.run?S.run():S.href&&(location.hash=S.href))};o.addEventListener("click",v=>{let S=v.target.closest("[data-idx]");S&&m(Number(S.dataset.idx))});let u=0,f=v=>{let S=o.querySelectorAll(".cmdk-item[data-idx]");v.key==="Escape"?(v.preventDefault(),a()):v.key==="ArrowDown"||v.key==="ArrowUp"?(v.preventDefault(),u=(u+(v.key==="ArrowDown"?1:-1)+S.length)%Math.max(1,S.length),S.forEach((k,E)=>k.classList.toggle("active",E===u)),S[u]?.scrollIntoView({block:"nearest"})):v.key==="Enter"&&(v.preventDefault(),m(u))};document.addEventListener("keydown",f,!0),e.addEventListener("click",v=>{v.target===e&&a()})};document.addEventListener("keydown",n=>{(n.ctrlKey||n.metaKey)&&String(n.key).toLowerCase()==="k"&&(n.preventDefault(),s())})}function Im(){Le("cart",pa),Le("wishlist",()=>{pa(),qs()}),Le("notifications",pa),Le("me",()=>{qs(),pa()}),Le("settings",()=>{kt(),zt(),Vt(),ua()}),document.addEventListener("view:rendered",()=>ua()),document.addEventListener("sleep:changed",()=>{ua(),zt()}),Le("install",()=>{let e=N("#btnInstallApp");e&&(e.hidden=!1)}),Le("installed",()=>{let e=N("#btnInstallApp");e&&(e.hidden=!0),$(t("home.appInstalled"))}),Le("online",e=>{e?$(t("err.online")):Hm()})}function Rm(){let e=async()=>{if(!document.documentElement.classList.contains("eco"))try{let a=await h.get("/api/system/status"),s=!!d.sleeping;d.sleeping=!!a.sleeping,d.sleepSince=a.since||null,s!==d.sleeping&&(ua(),zt(),String(location.hash||"").startsWith("#/admin")&&T(!0))}catch{}};setInterval(e,45e3),document.addEventListener("visibilitychange",()=>{document.hidden||e()})}function ua(){let e=String(location.hash||"").startsWith("#/admin"),a=V("settings.edit");rn({sleeping:!!d.sleeping&&!(e&&a),canWake:a,since:d.sleepSince,onWake:async()=>{try{await h.post("/api/system/wake",{}),await Ne({silent:!0}),ua(),zt(),$(t("sys.awake")),T(!0)}catch(s){y(s)}},onLogin:()=>de("#/auth?next="+encodeURIComponent(location.hash.slice(1)))})}function Hm(){Xn||(Xn=!0,j(t("err.offline"),{timeout:4200}))}function Bm(){window.addEventListener("online",()=>{Xn=!1})}function Fm(){let e=N("#siteHeader"),a=N("#fabTop"),s=!1;window.addEventListener("scroll",()=>{s||(s=!0,requestAnimationFrame(()=>{e.classList.toggle("scrolled",window.scrollY>8),a.hidden=window.scrollY<420,s=!1}))},{passive:!0})}function pc(){if(I("consent")){if(sessionStorage.getItem("consentDeferred"))if(!location.hash.startsWith("#/pages/"))sessionStorage.removeItem("consentDeferred");else return;ie({title:t("consent.title"),dismissible:!1,closeBtn:!1,size:"md",body:r`
      <p class="confirm-text mb">${t("consent.text")}</p>
      <p class="hint mt-s">${c("info")} ${t("consent.ttlNote")}</p>
      <form data-act="consent-form" class="col">
        <label class="check"><input type="checkbox" name="terms" checked><span class="box">${c("check")}</span><span>${t("consent.terms")} <a class="section-link" href="#/pages/terms">${t("consent.readTerms")}</a></span></label>
        <label class="check"><input type="checkbox" name="privacy" checked><span class="box">${c("check")}</span><span>${t("consent.privacy")} <a class="section-link" href="#/pages/privacy">${t("consent.readPrivacy")}</a></span></label>
        <label class="check"><input type="checkbox" name="marketing"><span class="box">${c("check")}</span><span>${t("consent.marketing")}</span></label>
      </form>`,footer:r`<button type="button" class="btn btn-ghost" data-consent-min>${t("consent.rejectOptional")}</button><button type="button" class="btn btn-primary" data-consent-go>${t("consent.accept")}</button>`,onMount:(e,a)=>{let s=e.querySelector('[data-act="consent-form"]');e.querySelectorAll('a[href^="#/"]').forEach(o=>o.addEventListener("click",()=>{sessionStorage.setItem("consentDeferred","1"),a.close()}));let n=()=>{let o=s.querySelector("[name=terms]").checked,i=s.querySelector("[name=privacy]").checked,l=s.querySelector("[name=marketing]").checked;if(!o||!i){j(t("form.termsRequired"));return}Ga({terms:o,privacy:i,marketing:l}),d.me&&h.patch("/api/me",{notificationsPrefs:{marketing:l}}).catch(()=>{}),$(t("consent.thanks")),a.close()};e.closest(".modal").querySelector("[data-consent-go]").addEventListener("click",n),e.closest(".modal").querySelector("[data-consent-min]").addEventListener("click",()=>{Ga({terms:!0,privacy:!0,marketing:!1}),d.me&&h.patch("/api/me",{notificationsPrefs:{marketing:!1}}).catch(()=>{}),$(t("consent.thanks")),a.close()}),s.addEventListener("submit",o=>{o.preventDefault(),n()})}})}}function uc(){Zs()||pc()}function Om(){if(d.me?.mustChangePassword){try{if(sessionStorage.getItem("bm_pwd_later"))return}catch{}Zn=ie({title:t("acc.passwordChange"),dismissible:!1,closeBtn:!1,size:"sm",body:r`
      <form data-act="force-pass">
        <p class="notice notice-warn mb">${c("alert")}<span>${ve()==="fa"?"\u0628\u0631\u0627\u06CC \u0627\u0645\u0646\u06CC\u062A \u0628\u06CC\u0634\u062A\u0631\u060C \u0631\u0645\u0632 \u067E\u06CC\u0634\u200C\u0641\u0631\u0636 \u0631\u0627 \u062A\u063A\u06CC\u06CC\u0631 \u0628\u062F\u0647.":"For security, change the default password."}</span></p>
        <label class="field"><span class="label">${t("acc.currentPassword")}</span><input class="input" type="password" name="current" autocomplete="current-password" required></label>
        <label class="field"><span class="label">${t("acc.newPassword2")}</span><input class="input" type="password" name="next" autocomplete="new-password" required><span class="hint">${t("auth.passwordRules")}</span></label>
        <label class="field"><span class="label">${t("common.passwordConfirm")}</span><input class="input" type="password" name="confirm" autocomplete="new-password" required></label>
        <button class="btn btn-primary btn-block" type="submit">${t("common.save")}</button>
        <button class="btn btn-ghost btn-block mt-s" type="button" data-act="pwd-later">${t("auth.pwdLater")}</button>
      </form>`})}}function jm(){let e="bm_visit";try{if(sessionStorage.getItem(e))return;sessionStorage.setItem(e,"1")}catch{return}h.post("/api/visits",{path:location.hash||"/"}).catch(()=>{})}function Um(){let e=String(location.href).match(/[?&]coupon=([A-Za-z0-9_-]{2,32})/);if(!e)return;let a=e[1];try{history.replaceState(null,"",String(location.href).replace(/[?&]coupon=[A-Za-z0-9_-]{2,32}/,"").replace(/\?$/,""))}catch{}setTimeout(async()=>{try{await h.post("/api/cart/coupon",{code:a}),await Te(),$(`${t("cart.couponApplied")}: ${a}`)}catch{}},700)}function zm(){document.addEventListener("keydown",e=>{let a=String(e.target?.tagName||"").toLowerCase(),s=["input","textarea","select"].includes(a)||e.target?.isContentEditable;if(e.key==="/"&&!s&&!e.metaKey&&!e.ctrlKey&&!e.altKey){let n=N("#searchInput");n&&(e.preventDefault(),n.focus(),n.select?.())}if(e.key==="Escape"&&document.activeElement===N("#searchInput")){let n=N("#searchInput");n.value="",n.blur(),N("#suggestBox")&&(N("#suggestBox").hidden=!0)}})}function Wm(){if(!("serviceWorker"in navigator)||Bs().features?.offlineMode===!1)return;let e=async()=>{try{let a=await navigator.serviceWorker.register("/sw.js",{updateViaCache:"none"});setInterval(()=>{a.update().catch(()=>{})},36e5),document.addEventListener("visibilitychange",()=>{document.hidden||a.update().catch(()=>{})}),a.addEventListener("updatefound",()=>{let s=a.installing;s&&s.addEventListener("statechange",()=>{s.state==="installed"&&navigator.serviceWorker.controller&&oe({type:"info",title:w()?"\u0646\u0633\u062E\u0647\u0654 \u062C\u062F\u06CC\u062F \u0622\u0645\u0627\u062F\u0647 \u0627\u0633\u062A":"Update Available",timeout:1e4,action:{label:w()?"\u0628\u0631\u0648\u0632\u0631\u0633\u0627\u0646\u06CC":"Update",onClick:()=>{document.getElementById("btnRefresh")?.click()}}})})})}catch{}};document.readyState==="complete"?e():window.addEventListener("load",e,{once:!0})}function _m(){fetch("/api/system/status",{cache:"no-store"}).then(e=>e.ok?e.json():null).then(e=>{e?.build&&e.build!==Hs&&!sessionStorage.getItem("bm-upd-seen")&&(sessionStorage.setItem("bm-upd-seen","1"),oe(t("update.available"),{timeout:0,action:{label:t("update.reload"),onClick:()=>location.reload()}}))}).catch(()=>{})}function Vm(){if(!matchMedia("(pointer:fine)").matches)return;let e=N("#cursorHalo");if(!e)return;let a=innerWidth/2,s=innerHeight/2,n=a,o=s,i=0,l=()=>{n+=(a-n)*.22,o+=(s-o)*.22,e.style.left=`${n.toFixed(1)}px`,e.style.top=`${o.toFixed(1)}px`,i=requestAnimationFrame(l)};document.addEventListener("pointermove",m=>{if(document.documentElement.classList.contains("eco"))return;a=m.clientX,s=m.clientY,document.documentElement.classList.add("halo-on"),i||(i=requestAnimationFrame(l));let u=m.target.closest?.('a, button, [role="button"], .pcard, .gal-thumb');document.documentElement.classList.toggle("halo-hot",!!u)},{passive:!0}),document.addEventListener("pointerleave",()=>{document.documentElement.classList.remove("halo-on")})}function Gm(){return document.documentElement.classList.contains("eco")}function Km(){let e=()=>{document.documentElement.classList.contains("eco")||(document.documentElement.classList.add("eco"),document.dispatchEvent(new CustomEvent("eco",{detail:{on:!0}})))},a=()=>{document.documentElement.classList.contains("eco")&&(document.documentElement.classList.remove("eco"),document.dispatchEvent(new CustomEvent("eco",{detail:{on:!1}})),Promise.resolve().then(()=>(_(),va)).then(n=>n.refreshBootstrap?.({silent:!0})).catch(()=>{}))},s=()=>{clearTimeout(dc),dc=setTimeout(e,Ym)};for(let n of["pointerdown","keydown","wheel","touchstart","pointermove"])document.addEventListener(n,()=>{document.documentElement.classList.contains("eco")&&a(),s()},{passive:!0,capture:!0});s()}function Qm(){try{if(sessionStorage.getItem("bm_vis"))return;sessionStorage.setItem("bm_vis","1");let e={screen:`${screen.width}x${screen.height}`,tz:Intl.DateTimeFormat().resolvedOptions().timeZone||"",lang:navigator.language||"",ref:document.referrer?document.referrer.slice(0,200):"",path:location.hash.replace("#","")||"/"};Promise.resolve().then(()=>(Q(),oo)).then(a=>a.api.post("/api/track",e)).catch(()=>{})}catch{}}var xm,Xn,Zn,Ym,dc,Jn=O(()=>{_();W();Q();B();X();le();ee();$n();lc();_();ce();setTimeout(mc,1e4);xm=performance.now();g("logout",async()=>{if(await ge({text:t("common.logout")+"\u061F",okText:t("common.logout")}))try{await h.post("/api/auth/logout"),d.me=null,await Te(),zt(),$(t("auth.logoutDone")),de("#/"),T()}catch{j(t("err.generic"))}});Xn=!1;g("consent-form",()=>{});g("consent-manage",()=>pc());g("reload",()=>location.reload());Zn=null;g("pwd-later",()=>{try{sessionStorage.setItem("bm_pwd_later","1")}catch{}Zn?.close(),oe(t("auth.pwdLaterToast"))});g("force-pass",async(e,a)=>{let s=new FormData(a);if(s.get("next")!==s.get("confirm")){j(ve()==="fa"?"\u062A\u06A9\u0631\u0627\u0631 \u0631\u0645\u0632 \u06CC\u06A9\u0633\u0627\u0646 \u0646\u06CC\u0633\u062A.":"Passwords do not match.");return}try{await h.post("/api/me/password",{current:s.get("current"),next:s.get("next")}),await Ye(),qs(),$(t("acc.passwordChanged")),Zn?.close()}catch(n){j(n.message)}});Le("boot-slow",()=>document.body.classList.add("boot-slow"));Le("boot-failed",()=>{document.getElementById("welcomeScreen")?.remove();let e=N("#bootSplash");e&&(e.innerHTML=r`<div class="empty">
    <h4>${t("boot.failed")}</h4>
    <p class="muted small mt-s">${t("boot.failedHint")}</p>
    <button class="btn btn-primary mt" data-act="reload">${c("refresh")} ${t("common.retry")}</button>
  </div>`)});Sm().catch(e=>{console.error("[boot]",e),document.getElementById("welcomeScreen")?.remove();let a=N("#bootSplash");a&&(a.innerHTML=r`<div class="empty"><h4>${t("err.generic")}</h4><button class="btn btn-primary" data-act="reload">${t("common.retry")}</button></div>`)});setTimeout(_m,6e3);Ym=240*1e3,dc=0});Jn();export{Gm as ecoPaused,uc as maybeConsent,pa as updateBadges};
