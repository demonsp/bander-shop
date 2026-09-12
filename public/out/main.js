var $o=Object.defineProperty,Pi=Object.defineProperties;var Mi=Object.getOwnPropertyDescriptors;var vo=Object.getOwnPropertySymbols;var Li=Object.prototype.hasOwnProperty,Ni=Object.prototype.propertyIsEnumerable;var yo=(t,e,s)=>e in t?$o(t,e,{enumerable:!0,configurable:!0,writable:!0,value:s}):t[e]=s,pt=(t,e)=>{for(var s in e||(e={}))Li.call(e,s)&&yo(t,s,e[s]);if(vo)for(var s of vo(e))Ni.call(e,s)&&yo(t,s,e[s]);return t},Ut=(t,e)=>Pi(t,Mi(e));var V=(t,e,s)=>()=>{if(s)throw s[0];try{return t&&(e=t(t=0)),e}catch(n){throw s=[n],n}};var Z=(t,e)=>{for(var s in e)$o(t,s,{get:e[s],enumerable:!0})};var qo={};Z(qo,{ApiError:()=>ne,api:()=>v,errorEn:()=>Bi,errorMessage:()=>Ks,getCookie:()=>xo,onLoading:()=>Ri,withQuery:()=>Eo});function xo(t){let e=document.cookie.match(new RegExp("(?:^|; )"+t.replace(/[.$?*|{}()[\]\\/+^]/g,"\\$&")+"=([^;]*)"));return e?decodeURIComponent(e[1]):""}function wo(t){Jt||(Jt=document.createElement("div"),Jt.className="bm-queue-overlay",Jt.setAttribute("role","status"),Jt.innerHTML='<div class="bm-q-card"><div class="bm-q-logo">\u{1F34F}</div><b class="bm-q-title"></b><p class="bm-q-pos"></p><div class="bm-q-bar"><i></i></div><span class="bm-q-note"></span></div>',document.documentElement.appendChild(Jt));let e=document.documentElement.lang==="en";Jt.querySelector(".bm-q-title").textContent=e?"Site is busy \u2014 you are in the queue":"\u0633\u0627\u06CC\u062A \u0634\u0644\u0648\u063A \u0627\u0633\u062A \u2014 \u062F\u0631 \u0635\u0641 \u0648\u0631\u0648\u062F \u0647\u0633\u062A\u06CC",Jt.querySelector(".bm-q-pos").textContent=e?`Your turn: ${t>0?t:"\u2026"}`:`\u0646\u0648\u0628\u062A \u0634\u0645\u0627: ${t>0?t:"\u2026"}`,Jt.querySelector(".bm-q-note").textContent=e?"Continues automatically when it is your turn\u2026":"\u0628\u0647\u200C\u0645\u062D\u0636 \u0631\u0633\u06CC\u062F\u0646 \u0646\u0648\u0628\u062A\u060C \u062E\u0648\u062F\u06A9\u0627\u0631 \u0627\u062F\u0627\u0645\u0647 \u067E\u06CC\u062F\u0627 \u0645\u06CC\u200C\u06A9\u0646\u062F\u2026"}function ko(){Jt&&(Jt.remove(),Jt=null)}async function Ii(t={}){return Qa||(Qa=(async()=>{wo(Number(t.pos)||0);let e=Math.max(2,Math.min(20,Number(t.pollSec)||4))*1e3;for(let s=0;s<60;s++){await new Promise(n=>setTimeout(n,e));try{let o=await(await fetch("/api/queue/status",{credentials:"same-origin",headers:{Accept:"application/json"}})).json();if((o==null?void 0:o.state)==="pass")return ko(),!0;(o==null?void 0:o.state)==="queued"&&wo(Number(o.pos)||0)}catch(n){}}return ko(),!1})().finally(()=>{Qa=null})),Qa}function Ri(t){return Gs.add(t),()=>Gs.delete(t)}function So(t){Vs=Math.max(0,Vs+(t?1:-1));for(let e of Gs)try{e(Vs>0)}catch(s){}}async function Se(t,e,s,n={}){if(typeof navigator!="undefined"&&!navigator.onLine&&t!=="GET")throw new ne(0,"offline","\u0627\u062A\u0635\u0627\u0644 \u0627\u06CC\u0646\u062A\u0631\u0646\u062A \u0628\u0631\u0642\u0631\u0627\u0631 \u0646\u06CC\u0633\u062A. \u0644\u0637\u0641\u0627\u064B \u0634\u0628\u06A9\u0647 \u0631\u0627 \u0628\u0631\u0631\u0633\u06CC \u06A9\u0646.","You are offline.");So(!0);let o=pt({},n.headers||{});if(s!=null&&(o["Content-Type"]="application/json"),t!=="GET"){let m=xo("bm_csrf");m&&(o["X-CSRF-Token"]=m)}let c=new AbortController,l=setTimeout(()=>c.abort(),n.timeout||25e3);try{let m=await fetch(e,{method:t,headers:o,signal:c.signal,credentials:"same-origin",body:s==null?void 0:JSON.stringify(s)}),d=null,u=await m.text();if(u)try{d=JSON.parse(u)}catch(b){d={raw:u.slice(0,300)}}if(m.status===403&&(d==null?void 0:d.code)==="csrf_failed"&&!n._retried)return await fetch("/api/bootstrap",{credentials:"same-origin"}).catch(()=>{}),Se(t,e,s,Ut(pt({},n),{_retried:!0}));if(m.status===503&&(d==null?void 0:d.code)==="queued"&&!n._queueRetried&&await Ii((d==null?void 0:d.details)||{}))return Se(t,e,s,Ut(pt({},n),{_queueRetried:!0}));if(!m.ok||(d==null?void 0:d.ok)===!1){let b=(d==null?void 0:d.code)||"error";throw new ne(m.status||500,b,(d==null?void 0:d.message)||Ys[b]||"\u062E\u0637\u0627",Ys[b])}return d}catch(m){throw m instanceof ne?m:(m==null?void 0:m.name)==="AbortError"?new ne(408,"timeout","\u0632\u0645\u0627\u0646 \u062F\u0631\u062E\u0648\u0627\u0633\u062A \u0628\u0647 \u067E\u0627\u06CC\u0627\u0646 \u0631\u0633\u06CC\u062F. \u062F\u0648\u0628\u0627\u0631\u0647 \u062A\u0644\u0627\u0634 \u06A9\u0646.","Request timed out."):new ne(0,"network","\u0627\u0631\u062A\u0628\u0627\u0637 \u0628\u0627 \u0633\u0631\u0648\u0631 \u0628\u0631\u0642\u0631\u0627\u0631 \u0646\u0634\u062F. \u0627\u062A\u0635\u0627\u0644 \u0627\u06CC\u0646\u062A\u0631\u0646\u062A \u0631\u0627 \u0628\u0631\u0631\u0633\u06CC \u06A9\u0646.","Network error.")}finally{clearTimeout(l),So(!1)}}function Ks(t){return t instanceof ne?t.message:String((t==null?void 0:t.message)||t||"\u062E\u0637\u0627")}function Bi(t){return(t==null?void 0:t.details)||Ys[t==null?void 0:t.code]||(t==null?void 0:t.message)||"Error"}var ne,Ys,Jt,Qa,Vs,Gs,Eo,v,tt=V(()=>{ne=class extends Error{constructor(e,s,n,o){super(n||s||"error"),this.status=e,this.code=s,this.details=o}};Ys={login_required:"Please sign in to continue.",store_asleep:"The store is temporarily turned off.",unauthorized:"Authentication failed.",forbidden:"You do not have access to this section.",csrf_failed:"Security token expired. Please refresh the page.",too_many_requests:"Too many requests. Please wait a moment.",not_found:"Not found.",product_not_found:"Product not found.",order_not_found:"Order not found.",invalid_credentials:"Incorrect username or password.",invalid_code:"The verification code is not valid.",invalid_phone:"Invalid mobile number.",invalid_email:"Invalid email address.",weak_password:"Password is too weak. Use upper/lower case letters, digits and symbols.",stock_limit:"Not enough stock for this quantity.",empty_cart:"Your cart is empty.",insufficient_balance:"Wallet balance is not enough.",account_exists:"This account already exists.",username_taken:"This username is taken.",phone_taken:"This phone number is already registered.",email_taken:"This email is already registered.",terms_required:"You must accept the terms and conditions.",rules_required:"You must accept the ticket rules.",address_required:"Please add a shipping address first.",already_submitted:"You have already submitted this.",payload_too_large:"The uploaded data is too large.",invalid_type:"Only image files are allowed.",server_error:"Internal server error. Please try again.",product_unavailable:"One of the items in your cart is no longer available.",cannot_cancel:"This order cannot be cancelled in its current state.",account_blocked:"This account is blocked. Please contact support.",disabled:"This feature is currently disabled.",queued:"The site is busy. You are in the entry queue\u2026",banned:"Access is blocked. Please contact support."},Jt=null,Qa=null;Vs=0,Gs=new Set;Eo=(t,e)=>{let s=new URLSearchParams;for(let[o,c]of Object.entries(e||{}))c==null||c===""||s.set(o,String(c));let n=s.toString();return n?`${t}${t.includes("?")?"&":"?"}${n}`:t},v={url:Eo,get:(t,e)=>Se("GET",t,void 0,e),post:(t,e,s)=>Se("POST",t,e!=null?e:{},s),patch:(t,e,s)=>Se("PATCH",t,e!=null?e:{},s),del:(t,e,s)=>Se("DELETE",t,e,s),put:(t,e,s)=>Se("PUT",t,e!=null?e:{},s),upload:t=>Se("POST","/api/upload",{data:t},{timeout:6e4})}});var Co={};Z(Co,{applyI18n:()=>Xe,dictSize:()=>Oi,isFa:()=>q,lang:()=>wt,missingKeys:()=>Fi,setLang:()=>Js,t:()=>a});function Js(t){Je=t==="en"?"en":"fa",document.documentElement.lang=Je,document.documentElement.dir=Je==="fa"?"rtl":"ltr"}function a(t,e){let n=(Hi[Je]||Ja)[t];if(n===void 0&&(n=Ja[t],n===void 0&&(Qs.has(t)||(Qs.add(t),(location.hostname==="localhost"||location.hostname==="127.0.0.1")&&console.warn("[i18n] missing key:",t)),n=t)),e)for(let[o,c]of Object.entries(e))n=n.replace(new RegExp(`\\{${o}\\}`,"g"),String(c));return n}function Xe(t=document){t.querySelectorAll("[data-i18n]").forEach(e=>{e.textContent=a(e.dataset.i18n)}),t.querySelectorAll("[data-i18n-placeholder]").forEach(e=>{e.setAttribute("placeholder",a(e.dataset.i18nPlaceholder))}),t.querySelectorAll("[data-i18n-title]").forEach(e=>{e.setAttribute("title",a(e.dataset.i18nTitle)),e.setAttribute("aria-label",a(e.dataset.i18nTitle))}),t.querySelectorAll("[data-i18n-html]").forEach(e=>{e.innerHTML=a(e.dataset.i18nHtml)})}var Ja,To,Hi,Je,Qs,wt,q,Fi,Oi,G=V(()=>{Ja={"app.name":"\u06CC\u0627\u0633\u0627\u06CC\u06CC","app.tagline":"\u0644\u0648\u0627\u0632\u0645 \u0627\u0644\u06A9\u062A\u0631\u0648\u0646\u06CC\u06A9 \u0648 \u0627\u0644\u06A9\u062A\u0631\u06CC\u06A9\u06CC","common.loading":"\u062F\u0631 \u062D\u0627\u0644 \u0628\u0627\u0631\u06AF\u0630\u0627\u0631\u06CC\u2026","common.save":"\u0630\u062E\u06CC\u0631\u0647","common.saving":"\u062F\u0631 \u062D\u0627\u0644 \u0630\u062E\u06CC\u0631\u0647\u2026","common.cancel":"\u0627\u0646\u0635\u0631\u0627\u0641","common.close":"\u0628\u0633\u062A\u0646","common.confirm":"\u062A\u0623\u06CC\u06CC\u062F","common.delete":"\u062D\u0630\u0641","common.edit":"\u0648\u06CC\u0631\u0627\u06CC\u0634","common.add":"\u0627\u0641\u0632\u0648\u062F\u0646","common.create":"\u0627\u06CC\u062C\u0627\u062F","common.update":"\u0628\u0647\u200C\u0631\u0648\u0632\u0631\u0633\u0627\u0646\u06CC","common.search":"\u062C\u0633\u062A\u200C\u0648\u062C\u0648","common.filter":"\u0641\u06CC\u0644\u062A\u0631","common.filters":"\u0641\u06CC\u0644\u062A\u0631\u0647\u0627","common.sort":"\u0645\u0631\u062A\u0628\u200C\u0633\u0627\u0632\u06CC","common.all":"\u0647\u0645\u0647","common.none":"\u0647\u06CC\u0686","common.more":"\u0628\u06CC\u0634\u062A\u0631","common.less":"\u06A9\u0645\u062A\u0631","common.showAll":"\u0645\u0634\u0627\u0647\u062F\u0647\u200C\u06CC \u0647\u0645\u0647","common.back":"\u0628\u0627\u0632\u06AF\u0634\u062A","common.next":"\u0627\u062F\u0627\u0645\u0647","common.prev":"\u0642\u0628\u0644\u06CC","common.yes":"\u0628\u0644\u0647","common.no":"\u062E\u06CC\u0631","common.optional":"\u0627\u062E\u062A\u06CC\u0627\u0631\u06CC","common.required":"\u0627\u0644\u0632\u0627\u0645\u06CC","common.copy":"\u06A9\u067E\u06CC","common.copied":"\u06A9\u067E\u06CC \u0634\u062F","common.share":"\u0627\u0634\u062A\u0631\u0627\u06A9\u200C\u06AF\u0630\u0627\u0631\u06CC","common.download":"\u062F\u0627\u0646\u0644\u0648\u062F","common.upload":"\u0628\u0627\u0631\u06AF\u0630\u0627\u0631\u06CC","common.print":"\u0686\u0627\u067E","common.refresh":"\u062A\u0627\u0632\u0647\u200C\u0633\u0627\u0632\u06CC","common.retry":"\u062A\u0644\u0627\u0634 \u062F\u0648\u0628\u0627\u0631\u0647","common.send":"\u0627\u0631\u0633\u0627\u0644","common.sent":"\u0627\u0631\u0633\u0627\u0644 \u0634\u062F","common.submit":"\u062B\u0628\u062A","common.reply":"\u067E\u0627\u0633\u062E","common.view":"\u0645\u0634\u0627\u0647\u062F\u0647","common.details":"\u062C\u0632\u0626\u06CC\u0627\u062A","common.status":"\u0648\u0636\u0639\u06CC\u062A","common.date":"\u062A\u0627\u0631\u06CC\u062E","common.time":"\u0633\u0627\u0639\u062A","common.amount":"\u0645\u0628\u0644\u063A","common.count":"\u062A\u0639\u062F\u0627\u062F","common.total":"\u0645\u062C\u0645\u0648\u0639","common.price":"\u0642\u06CC\u0645\u062A","price.inquire":"\u0627\u0633\u062A\u0639\u0644\u0627\u0645 \u0642\u06CC\u0645\u062A \u2014 \u062A\u0645\u0627\u0633 \u0628\u0627 \u0645\u063A\u0627\u0632\u0647","price.inquireShort":"\u0627\u0633\u062A\u0639\u0644\u0627\u0645 \u0642\u06CC\u0645\u062A","pdp.callStore":"\u0632\u0646\u06AF \u0628\u0632\u0646 \u0628\u0647 \u0645\u063A\u0627\u0632\u0647","pdp.visitStore":"\u062D\u0636\u0648\u0631\u06CC \u0645\u06CC\u200C\u0622\u06CC\u0645","pdp.serviceHint":"\u0627\u06CC\u0646 \u0645\u0648\u0631\u062F \u062E\u062F\u0645\u0627\u062A/\u0633\u0641\u0627\u0631\u0634\u06CC \u0627\u0633\u062A\u061B \u0642\u06CC\u0645\u062A \u0646\u0647\u0627\u06CC\u06CC \u067E\u0633 \u0627\u0632 \u0628\u0631\u0631\u0633\u06CC \u062A\u0644\u0641\u0646\u06CC \u0627\u0639\u0644\u0627\u0645 \u0645\u06CC\u200C\u0634\u0648\u062F.","home.partFinder":"\u0642\u0637\u0639\u0647\u200C\u0627\u06CC \u067E\u06CC\u062F\u0627 \u0646\u06A9\u0631\u062F\u06CC\u061F","home.partFinderText":"\u0627\u0633\u0645\u0634 \u0631\u0627 \u062A\u0644\u0641\u0646\u06CC \u0628\u06AF\u0648 \u06CC\u0627 \u062F\u0631 \u067E\u06CC\u0627\u0645 \u0628\u0641\u0631\u0633\u062A\u061B \u0627\u06AF\u0631 \u062F\u0631 \u0642\u0641\u0633\u0647\u200C\u0647\u0627 \u0628\u0627\u0634\u062F\u060C \u0647\u0645\u0627\u0646 \u0631\u0648\u0632 \u0628\u0631\u0627\u06CC\u062A \u06A9\u0646\u0627\u0631 \u0645\u06CC\u200C\u06AF\u0630\u0627\u0631\u06CC\u0645.","home.partFinderCta":"\u062A\u0645\u0627\u0633 \u06CC\u0627 \u067E\u06CC\u0627\u0645","common.stock":"\u0645\u0648\u062C\u0648\u062F\u06CC","common.available":"\u0645\u0648\u062C\u0648\u062F","common.unavailable":"\u0646\u0627\u0645\u0648\u062C\u0648\u062F","common.inStock":"\u0645\u0648\u062C\u0648\u062F \u062F\u0631 \u0627\u0646\u0628\u0627\u0631","common.lowStock":"\u06A9\u0645\u062A\u0631 \u0627\u0632 \u06F3 \u0639\u062F\u062F \u0628\u0627\u0642\u06CC \u0645\u0627\u0646\u062F\u0647","common.notifyMe":"\u0645\u0648\u062C\u0648\u062F \u0634\u062F \u062E\u0628\u0631\u0645 \u06A9\u0646","common.notified":"\u0628\u0647 \u0645\u062D\u0636 \u0645\u0648\u062C\u0648\u062F \u0634\u062F\u0646 \u062E\u0628\u0631\u062A \u0645\u06CC\u200C\u06A9\u0646\u06CC\u0645","common.category":"\u062F\u0633\u062A\u0647\u200C\u0628\u0646\u062F\u06CC","common.brand":"\u0628\u0631\u0646\u062F","common.product":"\u06A9\u0627\u0644\u0627","common.products":"\u0645\u062D\u0635\u0648\u0644\u0627\u062A","common.order":"\u0633\u0641\u0627\u0631\u0634","common.orders":"\u0633\u0641\u0627\u0631\u0634\u200C\u0647\u0627","common.user":"\u06A9\u0627\u0631\u0628\u0631","common.users":"\u06A9\u0627\u0631\u0628\u0631\u0627\u0646","common.result":"\u0646\u062A\u06CC\u062C\u0647","common.results":"\u0646\u062A\u06CC\u062C\u0647","common.noResult":"\u0646\u062A\u06CC\u062C\u0647\u200C\u0627\u06CC \u067E\u06CC\u062F\u0627 \u0646\u0634\u062F","common.error":"\u062E\u0637\u0627","common.success":"\u0627\u0646\u062C\u0627\u0645 \u0634\u062F","common.warning":"\u062A\u0648\u062C\u0647","common.note":"\u06CC\u0627\u062F\u062F\u0627\u0634\u062A","common.notes":"\u062A\u0648\u0636\u06CC\u062D\u0627\u062A","common.description":"\u062A\u0648\u0636\u06CC\u062D\u0627\u062A","common.specs":"\u0645\u0634\u062E\u0635\u0627\u062A \u0641\u0646\u06CC","common.actions":"\u0639\u0645\u0644\u06CC\u0627\u062A","common.active":"\u0641\u0639\u0627\u0644","common.inactive":"\u063A\u06CC\u0631\u0641\u0639\u0627\u0644","common.enabled":"\u0631\u0648\u0634\u0646","common.disabled":"\u062E\u0627\u0645\u0648\u0634","common.on":"\u0631\u0648\u0634\u0646","common.off":"\u062E\u0627\u0645\u0648\u0634","common.from":"\u0627\u0632","common.to":"\u062A\u0627","common.and":"\u0648","common.or":"\u06CC\u0627","common.today":"\u0627\u0645\u0631\u0648\u0632","common.yesterday":"\u062F\u06CC\u0631\u0648\u0632","common.toman":"\u062A\u0648\u0645\u0627\u0646","common.rial":"\u0631\u06CC\u0627\u0644","common.page":"\u0635\u0641\u062D\u0647","common.of":"\u0627\u0632","common.items":"\u0642\u0644\u0645","common.new":"\u062C\u062F\u06CC\u062F","common.old":"\u0642\u062F\u06CC\u0645\u06CC","common.apply":"\u0627\u0639\u0645\u0627\u0644","common.reset":"\u0628\u0627\u0632\u0646\u0634\u0627\u0646\u06CC","common.clear":"\u067E\u0627\u06A9 \u06A9\u0631\u062F\u0646","common.select":"\u0627\u0646\u062A\u062E\u0627\u0628 \u06A9\u0646\u06CC\u062F","common.title":"\u0639\u0646\u0648\u0627\u0646","common.body":"\u0645\u062A\u0646","common.type":"\u0646\u0648\u0639","common.priority":"\u0627\u0648\u0644\u0648\u06CC\u062A","common.answer":"\u067E\u0627\u0633\u062E","common.message":"\u067E\u06CC\u0627\u0645","common.messages":"\u067E\u06CC\u0627\u0645\u200C\u0647\u0627","common.attach":"\u067E\u06CC\u0648\u0633\u062A","common.image":"\u062A\u0635\u0648\u06CC\u0631","common.images":"\u062A\u0635\u0627\u0648\u06CC\u0631","common.phone":"\u0634\u0645\u0627\u0631\u0647 \u0645\u0648\u0628\u0627\u06CC\u0644","common.email":"\u0627\u06CC\u0645\u06CC\u0644","common.address":"\u0622\u062F\u0631\u0633","common.city":"\u0634\u0647\u0631","common.province":"\u0627\u0633\u062A\u0627\u0646","common.postal":"\u06A9\u062F \u067E\u0633\u062A\u06CC","common.name":"\u0646\u0627\u0645","common.fullName":"\u0646\u0627\u0645 \u0648 \u0646\u0627\u0645 \u062E\u0627\u0646\u0648\u0627\u062F\u06AF\u06CC","common.username":"\u0646\u0627\u0645 \u06A9\u0627\u0631\u0628\u0631\u06CC","common.password":"\u0631\u0645\u0632 \u0639\u0628\u0648\u0631","common.passwordConfirm":"\u062A\u06A9\u0631\u0627\u0631 \u0631\u0645\u0632 \u0639\u0628\u0648\u0631","common.login":"\u0648\u0631\u0648\u062F","common.logout":"\u062E\u0631\u0648\u062C","common.register":"\u062B\u0628\u062A\u200C\u0646\u0627\u0645","common.guest":"\u0645\u0647\u0645\u0627\u0646","common.admin":"\u0645\u062F\u06CC\u0631","common.settings":"\u062A\u0646\u0638\u06CC\u0645\u0627\u062A","common.help":"\u0631\u0627\u0647\u0646\u0645\u0627","common.home":"\u062E\u0627\u0646\u0647","common.skip":"\u0631\u062F \u0634\u062F\u0646","common.done":"\u0627\u0646\u062C\u0627\u0645 \u0634\u062F","common.pending":"\u062F\u0631 \u0627\u0646\u062A\u0638\u0627\u0631","common.approved":"\u062A\u0623\u06CC\u06CC\u062F \u0634\u062F\u0647","common.rejected":"\u0631\u062F \u0634\u062F\u0647","common.open":"\u0628\u0627\u0632","common.closed":"\u0628\u0633\u062A\u0647","common.all2":"\u0647\u0645\u0647\u200C\u06CC \u0645\u0648\u0627\u0631\u062F","common.never":"\u0647\u0631\u06AF\u0632","common.empty":"\u062E\u0627\u0644\u06CC","common.secure":"\u0627\u0645\u0646","common.free":"\u0631\u0627\u06CC\u06AF\u0627\u0646","common.unit":"\u0639\u062F\u062F","common.day":"\u0631\u0648\u0632","common.hour":"\u0633\u0627\u0639\u062A","common.minute":"\u062F\u0642\u06CC\u0642\u0647","common.second":"\u062B\u0627\u0646\u06CC\u0647","common.percent":"\u062F\u0631\u0635\u062F","common.discount":"\u062A\u062E\u0641\u06CC\u0641","common.discountCode":"\u06A9\u062F \u062A\u062E\u0641\u06CC\u0641","common.shipping":"\u0647\u0632\u06CC\u0646\u0647\u200C\u06CC \u0627\u0631\u0633\u0627\u0644","common.insurance":"\u0628\u06CC\u0645\u0647\u200C\u06CC \u0645\u0631\u0633\u0648\u0644\u0647","common.subtotal":"\u062C\u0645\u0639 \u06A9\u0627\u0644\u0627\u0647\u0627","common.payable":"\u0645\u0628\u0644\u063A \u0642\u0627\u0628\u0644 \u067E\u0631\u062F\u0627\u062E\u062A","common.payment":"\u067E\u0631\u062F\u0627\u062E\u062A","common.cart":"\u0633\u0628\u062F \u062E\u0631\u06CC\u062F","common.wishlist":"\u0644\u06CC\u0633\u062A \u0645\u0646","common.compare":"\u0645\u0642\u0627\u06CC\u0633\u0647","common.profile":"\u067E\u0631\u0648\u0641\u0627\u06CC\u0644","common.wallet":"\u06A9\u06CC\u0641 \u067E\u0648\u0644","common.balance":"\u0645\u0648\u062C\u0648\u062F\u06CC","common.transactions":"\u062A\u0631\u0627\u06A9\u0646\u0634\u200C\u0647\u0627","common.deposit":"\u0634\u0627\u0631\u0698 \u06A9\u06CC\u0641 \u067E\u0648\u0644","common.points":"\u0627\u0645\u062A\u06CC\u0627\u0632","common.ticket":"\u062A\u06CC\u06A9\u062A","common.tickets":"\u062A\u06CC\u06A9\u062A\u200C\u0647\u0627","common.support":"\u067E\u0634\u062A\u06CC\u0628\u0627\u0646\u06CC","common.review":"\u0646\u0638\u0631","common.reviews":"\u0646\u0638\u0631\u0627\u062A","common.question":"\u0633\u0624\u0627\u0644","common.questions":"\u0633\u0624\u0627\u0644\u0627\u062A \u06A9\u0627\u0631\u0628\u0631\u0627\u0646","common.rating":"\u0627\u0645\u062A\u06CC\u0627\u0632","common.notification":"\u0627\u0639\u0644\u0627\u0646","common.notifications":"\u0627\u0639\u0644\u0627\u0646\u200C\u0647\u0627","common.security":"\u0627\u0645\u0646\u06CC\u062A","common.history":"\u062A\u0627\u0631\u06CC\u062E\u0686\u0647","common.report":"\u06AF\u0632\u0627\u0631\u0634","common.bug":"\u06AF\u0632\u0627\u0631\u0634 \u062E\u0637\u0627","common.suggestion":"\u067E\u06CC\u0634\u0646\u0647\u0627\u062F","common.complaint":"\u0634\u06A9\u0627\u06CC\u062A","common.law":"\u0642\u0648\u0627\u0646\u06CC\u0646 \u0648 \u0645\u0642\u0631\u0631\u0627\u062A","common.privacy":"\u062D\u0631\u06CC\u0645 \u062E\u0635\u0648\u0635\u06CC","common.about":"\u062F\u0631\u0628\u0627\u0631\u0647\u200C\u06CC \u0645\u0627","common.contact":"\u062A\u0645\u0627\u0633 \u0628\u0627 \u0645\u0627","common.faq":"\u0633\u0624\u0627\u0644\u0627\u062A \u0645\u062A\u062F\u0627\u0648\u0644","common.guide":"\u0631\u0627\u0647\u0646\u0645\u0627\u06CC \u062E\u0631\u06CC\u062F","common.services":"\u062E\u062F\u0645\u0627\u062A \u0645\u0634\u062A\u0631\u06CC\u0627\u0646","common.stats":"\u0622\u0645\u0627\u0631 \u0641\u0631\u0648\u0634\u06AF\u0627\u0647","common.searchProducts":"\u062C\u0633\u062A\u200C\u0648\u062C\u0648\u06CC \u06A9\u0627\u0644\u0627\u2026","common.noData":"\u0645\u0648\u0631\u062F\u06CC \u0628\u0631\u0627\u06CC \u0646\u0645\u0627\u06CC\u0634 \u0648\u062C\u0648\u062F \u0646\u062F\u0627\u0631\u062F","common.tryAgain":"\u062F\u0648\u0628\u0627\u0631\u0647 \u062A\u0644\u0627\u0634 \u06A9\u0646","common.showMore":"\u0646\u0645\u0627\u06CC\u0634 \u0628\u06CC\u0634\u062A\u0631","common.perPage":"\u062F\u0631 \u0647\u0631 \u0635\u0641\u062D\u0647",skip:"\u067E\u0631\u0634 \u0628\u0647 \u0645\u062D\u062A\u0648\u0627\u06CC \u0627\u0635\u0644\u06CC","boot.loading":"\u062F\u0631 \u062D\u0627\u0644 \u0628\u0627\u0631\u06AF\u0630\u0627\u0631\u06CC \u06CC\u0627\u0633\u0627\u06CC\u06CC\u2026","boot.waking":"\u0633\u0631\u0648\u0631 \u0627\u0628\u0631\u06CC \u062F\u0631 \u062D\u0627\u0644 \u0628\u06CC\u062F\u0627\u0631\u0634\u062F\u0646 \u0627\u0633\u062A\u061B \u0686\u0646\u062F \u062B\u0627\u0646\u06CC\u0647\u0654 \u062F\u06CC\u06AF\u0631 \u062E\u0648\u062F\u06A9\u0627\u0631 \u062F\u0648\u0628\u0627\u0631\u0647 \u062A\u0644\u0627\u0634 \u0645\u06CC\u200C\u06A9\u0646\u06CC\u0645\u2026","boot.failed":"\u0641\u0631\u0648\u0634\u06AF\u0627\u0647 \u062F\u0631 \u062F\u0633\u062A\u0631\u0633 \u0646\u06CC\u0633\u062A\u061B \u0633\u0631\u0648\u0631 \u0627\u0628\u0631\u06CC \u062E\u0648\u0627\u0628\u06CC\u062F\u0647 \u06CC\u0627 \u0634\u0628\u06A9\u0647 \u0642\u0637\u0639 \u0627\u0633\u062A.","update.available":"\u0646\u0633\u062E\u0647\u0654 \u062C\u062F\u06CC\u062F \u0633\u0627\u06CC\u062A \u0622\u0645\u0627\u062F\u0647 \u0627\u0633\u062A\u061B \u0628\u0631\u0627\u06CC \u062F\u06CC\u062F\u0646 \u062A\u063A\u06CC\u06CC\u0631\u0627\u062A \u062F\u06A9\u0645\u0647 \u0631\u0627 \u0628\u0632\u0646.","update.reload":"\u062A\u0627\u0632\u0647\u200C\u0633\u0627\u0632\u06CC \u0635\u0641\u062D\u0647","boot.failedHint":"\u062F\u06A9\u0645\u0647\u0654 \xAB\u062A\u0644\u0627\u0634 \u062F\u0648\u0628\u0627\u0631\u0647\xBB \u0631\u0627 \u0628\u0632\u0646\u061B \u0627\u06AF\u0631 \u0628\u0627\u0632 \u0647\u0645 \u0646\u06CC\u0627\u0645\u062F\u060C \u0641\u0627\u06CC\u0644 \xAB\u0628\u06CC\u062F\u0627\u0631\u0633\u0627\u0632\xBB \u0631\u0627 \u0627\u0632 \u06AF\u0648\u0634\u06CC/\u06A9\u0627\u0645\u067E\u06CC\u0648\u062A\u0631\u062A \u0628\u0627\u0632 \u06A9\u0646 \u062A\u0627 \u0633\u0631\u0648\u0631 \u0631\u0627 \u0628\u06CC\u062F\u0627\u0631 \u06A9\u0646\u062F.","topbar.fastSend":"\u0627\u0631\u0633\u0627\u0644 \u0627\u0632 \u062A\u0647\u0631\u0627\u0646 \u0628\u0647 \u0633\u0631\u0627\u0633\u0631 \u0627\u06CC\u0631\u0627\u0646","nav.home":"\u062E\u0627\u0646\u0647","nav.products":"\u0647\u0645\u0647\u200C\u06CC \u0645\u062D\u0635\u0648\u0644\u0627\u062A","nav.deals":"\u062A\u062E\u0641\u06CC\u0641\u200C\u0647\u0627","nav.new":"\u062C\u062F\u06CC\u062F\u062A\u0631\u06CC\u0646\u200C\u0647\u0627","nav.stats":"\u0622\u0645\u0627\u0631 \u0632\u0646\u062F\u0647","nav.about":"\u062F\u0631\u0628\u0627\u0631\u0647\u200C\u06CC \u0645\u0627","nav.contact":"\u062A\u0645\u0627\u0633 \u0628\u0627 \u0645\u0627","nav.login":"\u0648\u0631\u0648\u062F","nav.register":"\u062B\u0628\u062A\u200C\u0646\u0627\u0645","nav.cart":"\u0633\u0628\u062F \u062E\u0631\u06CC\u062F","nav.wishlist":"\u0644\u06CC\u0633\u062A \u0645\u0646","nav.notifications":"\u0627\u0639\u0644\u0627\u0646\u200C\u0647\u0627","nav.menu":"\u0645\u0646\u0648","nav.account":"\u062D\u0633\u0627\u0628 \u06A9\u0627\u0631\u0628\u0631\u06CC","nav.admin":"\u067E\u0646\u0644 \u0645\u062F\u06CC\u0631\u06CC\u062A","nav.allCategories":"\u0647\u0645\u0647\u200C\u06CC \u062F\u0633\u062A\u0647\u200C\u0647\u0627","theme.toggle":"\u062A\u063A\u06CC\u06CC\u0631 \u067E\u0648\u0633\u062A\u0647 (\u0631\u0648\u0634\u0646/\u062A\u0627\u0631\u06CC\u06A9)","theme.dark":"\u062D\u0627\u0644\u062A \u062A\u0627\u0631\u06CC\u06A9","theme.light":"\u062D\u0627\u0644\u062A \u0631\u0648\u0634\u0646","theme.auto":"\u0647\u0645\u0627\u0647\u0646\u06AF \u0628\u0627 \u0633\u06CC\u0633\u062A\u0645","search.placeholder":"\u062C\u0633\u062A\u200C\u0648\u062C\u0648\u06CC \u06A9\u0627\u0644\u0627\u060C \u0628\u0631\u0646\u062F \u06CC\u0627 \u062F\u0633\u062A\u0647\u2026","search.go":"\u062C\u0633\u062A\u200C\u0648\u062C\u0648","search.voice":"\u062C\u0633\u062A\u200C\u0648\u062C\u0648\u06CC \u0635\u0648\u062A\u06CC","search.byImage":"\u062C\u0633\u062A\u200C\u0648\u062C\u0648 \u0628\u0627 \u0639\u06A9\u0633","search.listening":"\u062F\u0631 \u062D\u0627\u0644 \u06AF\u0648\u0634 \u062F\u0627\u062F\u0646\u2026 \u062D\u0631\u0641 \u0628\u0632\u0646","search.noVoice":"\u0645\u0631\u0648\u0631\u06AF\u0631 \u0634\u0645\u0627 \u0627\u0632 \u062C\u0633\u062A\u200C\u0648\u062C\u0648\u06CC \u0635\u0648\u062A\u06CC \u067E\u0634\u062A\u06CC\u0628\u0627\u0646\u06CC \u0646\u0645\u06CC\u200C\u06A9\u0646\u062F.","search.micDenied":"\u062F\u0633\u062A\u0631\u0633\u06CC \u0645\u06CC\u06A9\u0631\u0648\u0641\u0646 \u0628\u0633\u062A\u0647 \u0627\u0633\u062A. \u0627\u0632 \u062A\u0646\u0638\u06CC\u0645\u0627\u062A \u0645\u0631\u0648\u0631\u06AF\u0631\u060C \u0627\u062C\u0627\u0632\u0647\u0654 \u0645\u06CC\u06A9\u0631\u0648\u0641\u0646 \u0631\u0627 \u0628\u0631\u0627\u06CC \u0633\u0627\u06CC\u062A \u0641\u0639\u0627\u0644 \u06A9\u0646.","search.voiceNetwork":"\u0633\u0631\u0648\u06CC\u0633 \u062A\u0634\u062E\u06CC\u0635 \u06AF\u0641\u062A\u0627\u0631 \u062F\u0631 \u062F\u0633\u062A\u0631\u0633 \u0646\u06CC\u0633\u062A\u061B \u0627\u06CC\u0646\u062A\u0631\u0646\u062A \u06CC\u0627 \u0641\u06CC\u0644\u062A\u0631\u0634\u06A9\u0646 \u0631\u0627 \u0628\u0631\u0631\u0633\u06CC \u06A9\u0646.","search.noSpeech":"\u0686\u06CC\u0632\u06CC \u0646\u0634\u0646\u06CC\u062F\u0645\u061B \u062F\u0648\u0628\u0627\u0631\u0647 \u062A\u0644\u0627\u0634 \u06A9\u0646 \u0648 \u0634\u0645\u0631\u062F\u0647 \u062D\u0631\u0641 \u0628\u0632\u0646.","search.noMic":"\u0645\u06CC\u06A9\u0631\u0648\u0641\u0646\u06CC \u0631\u0648\u06CC \u0627\u06CC\u0646 \u062F\u0633\u062A\u06AF\u0627\u0647 \u067E\u06CC\u062F\u0627 \u0646\u0634\u062F.","pwd.show":"\u0646\u0645\u0627\u06CC\u0634 \u0631\u0645\u0632 \u0639\u0628\u0648\u0631","pwd.hide":"\u067E\u0646\u0647\u0627\u0646 \u06A9\u0631\u062F\u0646 \u0631\u0645\u0632 \u0639\u0628\u0648\u0631","search.suggestions":"\u067E\u06CC\u0634\u0646\u0647\u0627\u062F\u0647\u0627","search.trending":"\u067E\u0631\u062C\u0633\u062A\u200C\u0648\u062C\u0648\u0647\u0627","search.recent":"\u062C\u0633\u062A\u200C\u0648\u062C\u0648\u0647\u0627\u06CC \u0627\u062E\u06CC\u0631 \u0634\u0645\u0627","search.resultsFor":"\u0646\u062A\u0627\u06CC\u062C \u062C\u0633\u062A\u200C\u0648\u062C\u0648 \u0628\u0631\u0627\u06CC","search.inProducts":"\u062F\u0631 \u0645\u062D\u0635\u0648\u0644\u0627\u062A","search.inCategories":"\u062F\u0633\u062A\u0647\u200C\u0647\u0627","search.inBrands":"\u0628\u0631\u0646\u062F\u0647\u0627","search.inPages":"\u0635\u0641\u062D\u0647\u200C\u0647\u0627","search.didYouMean":"\u0645\u0646\u0638\u0648\u0631\u062A \u0627\u06CC\u0646 \u0628\u0648\u062F\u061F","search.noResultTitle":"\u0686\u06CC\u0632\u06CC \u067E\u06CC\u062F\u0627 \u0646\u06A9\u0631\u062F\u06CC\u0645","search.noResultText":"\u0639\u0628\u0627\u0631\u062A \u062F\u06CC\u06AF\u0631\u06CC \u0631\u0627 \u0627\u0645\u062A\u062D\u0627\u0646 \u06A9\u0646 \u06CC\u0627 \u0627\u0632 \u0641\u06CC\u0644\u062A\u0631\u0647\u0627 \u0627\u0633\u062A\u0641\u0627\u062F\u0647 \u06A9\u0646. \u0627\u06AF\u0631 \u06A9\u0627\u0644\u0627\u06CC \u062E\u0627\u0635\u06CC \u0645\u06CC\u200C\u062E\u0648\u0627\u0647\u06CC\u060C \u0628\u0627 \u067E\u0634\u062A\u06CC\u0628\u0627\u0646\u06CC \u0628\u06AF\u0648 \u062A\u0627 \u0628\u0631\u0627\u06CC\u062A \u062A\u0647\u06CC\u0647 \u06A9\u0646\u06CC\u0645.","search.imageTitle":"\u062C\u0633\u062A\u200C\u0648\u062C\u0648 \u0628\u0627 \u0639\u06A9\u0633","search.imageText":"\u0639\u06A9\u0633 \u06A9\u0627\u0644\u0627 \u0631\u0627 \u0628\u0627\u0631\u06AF\u0630\u0627\u0631\u06CC \u06A9\u0646 \u062A\u0627 \u0645\u0634\u0627\u0628\u0647 \u0622\u0646 \u0631\u0627 \u062F\u0631 \u0641\u0631\u0648\u0634\u06AF\u0627\u0647 \u067E\u06CC\u062F\u0627 \u06A9\u0646\u06CC\u0645.","search.imageHint":"\u0641\u0631\u0645\u062A JPG \u06CC\u0627 PNG\u060C \u062D\u062F\u0627\u06A9\u062B\u0631 \u06F4 \u0645\u06AF\u0627\u0628\u0627\u06CC\u062A","search.imageIndexing":"\u062F\u0631 \u062D\u0627\u0644 \u0622\u0645\u0627\u062F\u0647\u200C\u0633\u0627\u0632\u06CC \u0645\u0648\u062A\u0648\u0631 \u062C\u0633\u062A\u200C\u0648\u062C\u0648\u06CC \u062A\u0635\u0648\u06CC\u0631\u06CC\u2026","search.imageNoIndex":"\u062A\u0635\u0627\u0648\u06CC\u0631 \u0645\u062D\u0635\u0648\u0644\u0627\u062A \u0647\u0646\u0648\u0632 \u0627\u06CC\u0646\u062F\u06A9\u0633 \u0646\u0634\u062F\u0647\u200C\u0627\u0646\u062F. \u0645\u062F\u06CC\u0631 \u0633\u0627\u06CC\u062A \u0627\u0632 \u067E\u0646\u0644 \u0645\u062F\u06CC\u0631\u06CC\u062A \u2190 \u062C\u0633\u062A\u200C\u0648\u062C\u0648\u06CC \u062A\u0635\u0648\u06CC\u0631\u06CC \u0645\u06CC\u200C\u062A\u0648\u0627\u0646\u062F \u0627\u06CC\u0646\u062F\u06A9\u0633 \u0631\u0627 \u0628\u0633\u0627\u0632\u062F.","search.imageNoMatch":"\u06A9\u0627\u0644\u0627\u06CC \u0645\u0634\u0627\u0628\u0647\u06CC \u0628\u0627 \u0627\u06CC\u0646 \u0639\u06A9\u0633 \u067E\u06CC\u062F\u0627 \u0646\u0634\u062F. \u0645\u06CC\u200C\u062A\u0648\u0627\u0646\u06CC \u0646\u0627\u0645 \u06A9\u0627\u0644\u0627 \u0631\u0627 \u062C\u0633\u062A\u200C\u0648\u062C\u0648 \u06A9\u0646\u06CC.","search.dropHere":"\u0639\u06A9\u0633 \u0631\u0627 \u0627\u06CC\u0646\u062C\u0627 \u0631\u0647\u0627 \u06A9\u0646","search.pickFile":"\u0627\u0646\u062A\u062E\u0627\u0628 \u0639\u06A9\u0633","search.takePhoto":"\u06AF\u0631\u0641\u062A\u0646 \u0639\u06A9\u0633 \u0628\u0627 \u062F\u0648\u0631\u0628\u06CC\u0646","mnav.home":"\u062E\u0627\u0646\u0647","mnav.products":"\u062F\u0633\u062A\u0647\u200C\u0647\u0627","mnav.search":"\u062C\u0633\u062A\u200C\u0648\u062C\u0648","mnav.cart":"\u0633\u0628\u062F","mnav.me":"\u062D\u0633\u0627\u0628 \u0645\u0646","footer.shopping":"\u062E\u0631\u06CC\u062F","footer.allProducts":"\u0647\u0645\u0647\u200C\u06CC \u0645\u062D\u0635\u0648\u0644\u0627\u062A","footer.deals":"\u062A\u062E\u0641\u06CC\u0641\u200C\u0647\u0627 \u0648 \u067E\u06CC\u0634\u0646\u0647\u0627\u062F\u0647\u0627","footer.inStock":"\u06A9\u0627\u0644\u0627\u0647\u0627\u06CC \u0645\u0648\u062C\u0648\u062F","footer.searchByImage":"\u062C\u0633\u062A\u200C\u0648\u062C\u0648\u06CC \u062A\u0635\u0648\u06CC\u0631\u06CC","footer.myList":"\u0644\u06CC\u0633\u062A \u0645\u0646","footer.stats":"\u0622\u0645\u0627\u0631 \u0641\u0631\u0648\u0634\u06AF\u0627\u0647","footer.services":"\u062E\u062F\u0645\u0627\u062A \u0645\u0634\u062A\u0631\u06CC\u0627\u0646","footer.guide":"\u0631\u0627\u0647\u0646\u0645\u0627\u06CC \u062E\u0631\u06CC\u062F","footer.service":"\u062E\u062F\u0645\u0627\u062A \u0645\u0634\u062A\u0631\u06CC\u0627\u0646","footer.faq":"\u0633\u0624\u0627\u0644\u0627\u062A \u0645\u062A\u062F\u0627\u0648\u0644","footer.insurance":"\u0628\u06CC\u0645\u0647\u200C\u06CC \u0645\u0631\u0633\u0648\u0644\u0647","footer.plus":"\u0627\u0634\u062A\u0631\u0627\u06A9 \u067E\u0644\u0627\u0633","footer.tickets":"\u062A\u06CC\u06A9\u062A \u067E\u0634\u062A\u06CC\u0628\u0627\u0646\u06CC","footer.about":"\u062F\u0631\u0628\u0627\u0631\u0647 \u0648 \u0642\u0648\u0627\u0646\u06CC\u0646","footer.aboutUs":"\u062F\u0631\u0628\u0627\u0631\u0647\u200C\u06CC \u0645\u0627","footer.terms":"\u0642\u0648\u0627\u0646\u06CC\u0646 \u0648 \u0645\u0642\u0631\u0631\u0627\u062A","footer.privacy":"\u062D\u0631\u06CC\u0645 \u062E\u0635\u0648\u0635\u06CC","footer.bug":"\u06AF\u0632\u0627\u0631\u0634 \u062E\u0637\u0627","footer.contact":"\u062A\u0645\u0627\u0633 \u0628\u0627 \u0645\u0627","footer.suggest":"\u067E\u06CC\u0634\u0646\u0647\u0627\u062F\u0647\u0627 \u0648 \u0634\u06A9\u0627\u06CC\u0627\u062A","footer.contactUs":"\u0631\u0627\u0647\u200C\u0647\u0627\u06CC \u0627\u0631\u062A\u0628\u0627\u0637\u06CC","footer.install":"\u0646\u0635\u0628 \u0627\u067E\u0644\u06CC\u06A9\u06CC\u0634\u0646","footer.support":"\u067E\u0634\u062A\u06CC\u0628\u0627\u0646\u06CC \u0622\u0646\u0644\u0627\u06CC\u0646","footer.rights":"\u0647\u0645\u0647\u200C\u06CC \u062D\u0642\u0648\u0642 \u0645\u062D\u0641\u0648\u0638 \u0627\u0633\u062A.","footer.workingHours":"\u0633\u0627\u0639\u062A \u06A9\u0627\u0631\u06CC","home.heroKicker":"\u0628\u0648\u0631\u0633 \u0647\u0641\u062A\u200C\u062D\u0648\u0636\u061B \u0628\u0627 \u0636\u0645\u0627\u0646\u062A \u0627\u0635\u0627\u0644\u062A","home.heroTitle":"\u0627\u0632 \u0645\u0642\u0627\u0648\u0645\u062A \u062A\u0627 \u06A9\u0646\u062A\u0627\u06A9\u062A\u0648\u0631\u061B \u0647\u0645\u0627\u0646 \u0644\u062D\u0638\u0647 \u0627\u0632 \u0642\u0641\u0633\u0647 \u0645\u06CC\u200C\u0622\u06CC\u062F","home.heroText":"\u0645\u0642\u0627\u0648\u0645\u062A \u0648 \u062E\u0627\u0632\u0646 \u0648 \u0622\u06CC\u200C\u0633\u06CC\u060C \u0647\u0648\u06CC\u0647 \u0648 \u0633\u06CC\u0645 \u0642\u0644\u0639\u060C \u06A9\u0627\u0628\u0644 \u0648 \u0633\u06CC\u0645 \u062F\u0631 \u0647\u0645\u0647\u0654 \u0633\u0627\u06CC\u0632\u0647\u0627\u060C \u0631\u06CC\u0633\u0647 \u0648 \u067E\u0631\u0648\u0698\u06A9\u062A\u0648\u0631\u060C \u0645\u0648\u062F\u0645 \u0648 \u0633\u0648\u06CC\u06CC\u0686\u060C \u067E\u0646\u06A9\u0647 \u0648 \u0645\u062D\u0627\u0641\u0638 \u0628\u0631\u0642 \u2014 \u0647\u0631 \u0622\u0646\u0686\u0647 \u0628\u0631\u0627\u06CC \u0628\u0631\u062F\u060C \u062E\u0627\u0646\u0647 \u0648 \u06A9\u0627\u0631\u06AF\u0627\u0647 \u0644\u0627\u0632\u0645 \u062F\u0627\u0631\u06CC\u060C \u06CC\u06A9\u200C\u062C\u0627 \u062F\u0631 \u0646\u0627\u0631\u0645\u06A9.","home.ctaShop":"\u0634\u0631\u0648\u0639 \u062E\u0631\u06CC\u062F","home.ctaDeals":"\u062A\u062E\u0641\u06CC\u0641\u200C\u0647\u0627\u06CC \u0627\u0645\u0631\u0648\u0632","home.point1":"\u0636\u0645\u0627\u0646\u062A \u0627\u0635\u0627\u0644\u062A \u06A9\u0627\u0644\u0627","home.point2":"\u06F7 \u0631\u0648\u0632 \u0645\u0647\u0644\u062A \u0627\u0646\u0635\u0631\u0627\u0641","home.point3":"\u0627\u0631\u0633\u0627\u0644 \u0628\u0647 \u0633\u0631\u0627\u0633\u0631 \u0627\u06CC\u0631\u0627\u0646","home.point4":"\u062A\u062D\u0648\u06CC\u0644 \u062D\u0636\u0648\u0631\u06CC \u0631\u0627\u06CC\u06AF\u0627\u0646","home.categories":"\u062F\u0633\u062A\u0647\u200C\u0628\u0646\u062F\u06CC\u200C\u0647\u0627","home.categoriesSub":"\u0627\u0632 \u0645\u0642\u0627\u0648\u0645\u062A \u0648 \u0622\u06CC\u200C\u0633\u06CC \u062A\u0627 \u067E\u0631\u0648\u0698\u06A9\u062A\u0648\u0631 \u0648 \u0645\u062D\u0627\u0641\u0638 \u0628\u0631\u0642","home.featured":"\u067E\u06CC\u0634\u0646\u0647\u0627\u062F \u0648\u06CC\u0698\u0647","home.featuredSub":"\u06A9\u0627\u0644\u0627\u0647\u0627\u06CC\u06CC \u06A9\u0647 \u062E\u0648\u062F\u0645\u0627\u0646 \u0627\u0633\u062A\u0641\u0627\u062F\u0647 \u0645\u06CC\u200C\u06A9\u0646\u06CC\u0645 \u0648 \u067E\u06CC\u0634\u0646\u0647\u0627\u062F \u0645\u06CC\u200C\u062F\u0647\u06CC\u0645","home.bestSellers":"\u067E\u0631\u0641\u0631\u0648\u0634\u200C\u062A\u0631\u06CC\u0646\u200C\u0647\u0627","home.bestSellersSub":"\u0627\u0646\u062A\u062E\u0627\u0628 \u0645\u0634\u062A\u0631\u06CC\u0627\u0646 \u06CC\u0627\u0633\u0627\u06CC\u06CC","home.newArrivals":"\u062A\u0627\u0632\u0647\u200C\u0647\u0627\u06CC \u0641\u0631\u0648\u0634\u06AF\u0627\u0647","home.newArrivalsSub":"\u0622\u062E\u0631\u06CC\u0646 \u06A9\u0627\u0644\u0627\u0647\u0627\u06CC\u06CC \u06A9\u0647 \u0628\u0647 \u0642\u0641\u0633\u0647 \u0627\u0636\u0627\u0641\u0647 \u0634\u062F\u0647","home.deals":"\u062A\u062E\u0641\u06CC\u0641\u200C\u0647\u0627\u06CC \u0641\u0639\u0627\u0644","home.dealsSub":"\u0641\u0631\u0635\u062A \u0645\u062D\u062F\u0648\u062F \u0628\u0627 \u0642\u06CC\u0645\u062A \u0628\u0647\u062A\u0631","home.brands":"\u0628\u0631\u0646\u062F\u0647\u0627\u06CC \u0645\u0648\u062C\u0648\u062F","home.whyUs":"\u0686\u0631\u0627 \u06CC\u0627\u0633\u0627\u06CC\u06CC\u061F","home.whyUsSub":"\u0686\u06CC\u0632\u0647\u0627\u06CC\u06CC \u06A9\u0647 \u0645\u0627 \u0631\u0627 \u0627\u0632 \u0628\u0642\u06CC\u0647 \u062C\u062F\u0627 \u0645\u06CC\u200C\u06A9\u0646\u062F","home.reviews":"\u0646\u0638\u0631 \u0645\u0634\u062A\u0631\u06CC\u0627\u0646","home.reviewsSub":"\u062A\u062C\u0631\u0628\u0647\u200C\u06CC \u0648\u0627\u0642\u0639\u06CC \u062E\u0631\u06CC\u062F\u0627\u0631\u0627\u0646","home.visitStore":"\u0628\u0627\u0632\u062F\u06CC\u062F \u0627\u0632 \u0641\u0631\u0648\u0634\u06AF\u0627\u0647","home.visitStoreText":"\u062A\u0647\u0631\u0627\u0646\u060C \u0646\u0627\u0631\u0645\u06A9\u060C \u0645\u06CC\u062F\u0627\u0646 \u0647\u0641\u062A\u200C\u062D\u0648\u0636 \u2014 \u0645\u0634\u0627\u0648\u0631\u0647\u0654 \u062D\u0636\u0648\u0631\u06CC \u0631\u0627\u06CC\u06AF\u0627\u0646 \u0648 \u062A\u0633\u062A \u06A9\u0627\u0644\u0627 \u0642\u0628\u0644 \u0627\u0632 \u062E\u0631\u06CC\u062F","home.openMap":"\u062F\u06CC\u062F\u0646 \u06A9\u0631\u0648\u06A9\u06CC \u0648 \u0646\u0642\u0634\u0647","home.statsTitle":"\u0641\u0631\u0648\u0634\u06AF\u0627\u0647 \u062F\u0631 \u06CC\u06A9 \u0646\u06AF\u0627\u0647","home.plusTitle":"\u0627\u0634\u062A\u0631\u0627\u06A9 \u067E\u0644\u0627\u0633 \u06CC\u0627\u0633\u0627\u06CC\u06CC","home.plusText":"\u0628\u0627 \u067E\u0631\u062F\u0627\u062E\u062A \u0645\u0627\u0647\u0627\u0646\u0647\u060C \u0627\u0631\u0633\u0627\u0644 \u0647\u0645\u0647\u200C\u06CC \u0633\u0641\u0627\u0631\u0634\u200C\u0647\u0627 \u0631\u0627\u06CC\u06AF\u0627\u0646\u060C \u0645\u0631\u0633\u0648\u0644\u0647\u200C\u0647\u0627 \u062E\u0648\u062F\u06A9\u0627\u0631 \u0628\u06CC\u0645\u0647 \u0648 \u06F3\u066A \u062A\u062E\u0641\u06CC\u0641 \u062F\u0627\u0626\u0645\u06CC \u0645\u06CC\u200C\u06AF\u06CC\u0631\u06CC.","home.plusCta":"\u062F\u06CC\u062F\u0646 \u0645\u0632\u0627\u06CC\u0627\u06CC \u067E\u0644\u0627\u0633","home.appTitle":"\u0627\u067E\u0644\u06CC\u06A9\u06CC\u0634\u0646 \u06CC\u0627\u0633\u0627\u06CC\u06CC","home.appText":"\u0647\u0645\u06CC\u0646 \u0633\u0627\u06CC\u062A \u06CC\u06A9 \u0627\u067E\u0644\u06CC\u06A9\u06CC\u0634\u0646 \u0646\u0635\u0628\u200C\u0634\u062F\u0646\u06CC (PWA) \u0627\u0633\u062A: \u0631\u0648\u06CC \u0627\u0646\u062F\u0631\u0648\u06CC\u062F\u060C \u0622\u06CC\u0641\u0648\u0646\u060C \u0648\u06CC\u0646\u062F\u0648\u0632\u060C \u0645\u06A9 \u0648 \u0644\u06CC\u0646\u0648\u06A9\u0633 \u0646\u0635\u0628 \u0645\u06CC\u200C\u0634\u0648\u062F \u0648 \u0628\u0647\u200C\u0635\u0648\u0631\u062A \u0622\u0641\u0644\u0627\u06CC\u0646 \u0647\u0645 \u06A9\u0627\u0631 \u0645\u06CC\u200C\u06A9\u0646\u062F.","home.installCta":"\u0646\u0635\u0628 \u0631\u0648\u06CC \u062F\u0633\u062A\u06AF\u0627\u0647 \u0645\u0646","home.appInstalled":"\u0627\u067E\u0644\u06CC\u06A9\u06CC\u0634\u0646 \u0646\u0635\u0628 \u0634\u062F\u0647 \u0627\u0633\u062A","home.liveStats":"\u0622\u0645\u0627\u0631 \u0632\u0646\u062F\u0647\u200C\u06CC \u0641\u0631\u0648\u0634\u06AF\u0627\u0647","home.newsletter":"\u0627\u0632 \u062A\u062E\u0641\u06CC\u0641\u200C\u0647\u0627 \u0628\u0627\u062E\u0628\u0631 \u0634\u0648","home.newsletterText":"\u0634\u0645\u0627\u0631\u0647\u200C\u06CC \u0645\u0648\u0628\u0627\u06CC\u0644\u062A \u0631\u0627 \u0628\u062F\u0647 \u062A\u0627 \u0641\u0642\u0637 \u0628\u0631\u0627\u06CC \u062A\u062E\u0641\u06CC\u0641\u200C\u0647\u0627\u06CC \u0645\u0647\u0645 \u0648 \u0645\u0648\u062C\u0648\u062F \u0634\u062F\u0646 \u06A9\u0627\u0644\u0627\u0647\u0627\u06CC \u0644\u06CC\u0633\u062A\u062A \u067E\u06CC\u0627\u0645 \u0628\u0641\u0631\u0633\u062A\u06CC\u0645.","home.subscribe":"\u0639\u0636\u0648\u06CC\u062A","stats.products":"\u06A9\u0627\u0644\u0627\u06CC \u0641\u0639\u0627\u0644","stats.ordersTotal":"\u06A9\u0644 \u0633\u0641\u0627\u0631\u0634\u200C\u0647\u0627","stats.ordersToday":"\u0633\u0641\u0627\u0631\u0634 \u0627\u0645\u0631\u0648\u0632","stats.visitsToday":"\u0628\u0627\u0632\u062F\u06CC\u062F \u0627\u0645\u0631\u0648\u0632","stats.visitsTotal":"\u06A9\u0644 \u0628\u0627\u0632\u062F\u06CC\u062F\u0647\u0627","stats.pendingOrders":"\u0633\u0641\u0627\u0631\u0634 \u062F\u0631 \u062D\u0627\u0644 \u0628\u0631\u0631\u0633\u06CC","stats.delivered":"\u062A\u062D\u0648\u06CC\u0644 \u0645\u0648\u0641\u0642","stats.customers":"\u0645\u0634\u062A\u0631\u06CC \u062B\u0628\u062A\u200C\u0646\u0627\u0645\u200C\u0634\u062F\u0647","stats.plusMembers":"\u0639\u0636\u0648 \u067E\u0644\u0627\u0633","stats.categories":"\u062F\u0633\u062A\u0647\u200C\u0628\u0646\u062F\u06CC","stats.brands":"\u0628\u0631\u0646\u062F","stats.outOfStock":"\u06A9\u0627\u0644\u0627\u06CC \u0646\u0627\u0645\u0648\u062C\u0648\u062F","stats.years":"\u0633\u0627\u0644 \u0641\u0639\u0627\u0644\u06CC\u062A","stats.title":"\u0622\u0645\u0627\u0631 \u0639\u0645\u0648\u0645\u06CC \u0641\u0631\u0648\u0634\u06AF\u0627\u0647","stats.sub":"\u0627\u06CC\u0646 \u0622\u0645\u0627\u0631 \u0628\u0647\u200C\u0635\u0648\u0631\u062A \u0632\u0646\u062F\u0647 \u0627\u0632 \u062F\u0627\u062F\u0647\u200C\u0647\u0627\u06CC \u0648\u0627\u0642\u0639\u06CC \u0633\u0627\u06CC\u062A \u06AF\u0631\u0641\u062A\u0647 \u0645\u06CC\u200C\u0634\u0648\u062F.","stats.chartTitle":"\u0628\u0627\u0632\u062F\u06CC\u062F \u06F1\u06F4 \u0631\u0648\u0632 \u0627\u062E\u06CC\u0631","stats.topProducts":"\u067E\u0631\u0641\u0631\u0648\u0634\u200C\u062A\u0631\u06CC\u0646 \u06A9\u0627\u0644\u0627\u0647\u0627","stats.transparency":"\u0634\u0641\u0627\u0641\u06CC\u062A \u0628\u0631\u0627\u06CC \u0645\u0634\u062A\u0631\u06CC","stats.transparencyText":"\u0645\u0627 \u0645\u0648\u062C\u0648\u062F\u06CC \u0648 \u0642\u06CC\u0645\u062A \u0648\u0627\u0642\u0639\u06CC \u0631\u0627 \u0646\u0645\u0627\u06CC\u0634 \u0645\u06CC\u200C\u062F\u0647\u06CC\u0645 \u0648 \u0622\u0645\u0627\u0631 \u0641\u0631\u0648\u0634\u06AF\u0627\u0647 \u0631\u0627 \u0647\u0645 \u067E\u0646\u0647\u0627\u0646 \u0646\u0645\u06CC\u200C\u06A9\u0646\u06CC\u0645.","catalog.title":"\u0645\u062D\u0635\u0648\u0644\u0627\u062A","catalog.filters":"\u0641\u06CC\u0644\u062A\u0631\u0647\u0627","catalog.showFilters":"\u0646\u0645\u0627\u06CC\u0634 \u0641\u06CC\u0644\u062A\u0631\u0647\u0627","catalog.hideFilters":"\u0628\u0633\u062A\u0646 \u0641\u06CC\u0644\u062A\u0631\u0647\u0627","catalog.sort.relevant":"\u0645\u0631\u062A\u0628\u0637\u200C\u062A\u0631\u06CC\u0646","catalog.sort.newest":"\u062C\u062F\u06CC\u062F\u062A\u0631\u06CC\u0646","catalog.sort.oldest":"\u0642\u062F\u06CC\u0645\u06CC\u200C\u062A\u0631\u06CC\u0646","catalog.sort.cheapest":"\u0627\u0631\u0632\u0627\u0646\u200C\u062A\u0631\u06CC\u0646","catalog.sort.dearest":"\u06AF\u0631\u0627\u0646\u200C\u062A\u0631\u06CC\u0646","catalog.sort.popular":"\u067E\u0631\u0641\u0631\u0648\u0634\u200C\u062A\u0631\u06CC\u0646","catalog.sort.rating":"\u0628\u06CC\u0634\u062A\u0631\u06CC\u0646 \u0627\u0645\u062A\u06CC\u0627\u0632","catalog.sort.discount":"\u0628\u06CC\u0634\u062A\u0631\u06CC\u0646 \u062A\u062E\u0641\u06CC\u0641","catalog.sort.name":"\u062D\u0631\u0648\u0641 \u0627\u0644\u0641\u0628\u0627","catalog.f.category":"\u062F\u0633\u062A\u0647\u200C\u0628\u0646\u062F\u06CC","catalog.f.brand":"\u0628\u0631\u0646\u062F","catalog.f.price":"\u0645\u062D\u062F\u0648\u062F\u0647\u200C\u06CC \u0642\u06CC\u0645\u062A","catalog.f.availability":"\u0645\u0648\u062C\u0648\u062F\u06CC","catalog.f.inStock":"\u0641\u0642\u0637 \u06A9\u0627\u0644\u0627\u0647\u0627\u06CC \u0645\u0648\u062C\u0648\u062F","catalog.f.discountOnly":"\u0641\u0642\u0637 \u062A\u062E\u0641\u06CC\u0641\u200C\u062F\u0627\u0631","catalog.f.rating":"\u062D\u062F\u0627\u0642\u0644 \u0627\u0645\u062A\u06CC\u0627\u0632","catalog.f.authenticity":"\u0627\u0635\u0627\u0644\u062A \u06A9\u0627\u0644\u0627","catalog.f.clear":"\u062D\u0630\u0641 \u0647\u0645\u0647\u200C\u06CC \u0641\u06CC\u0644\u062A\u0631\u0647\u0627","catalog.count":"\u06A9\u0627\u0644\u0627","catalog.viewGrid":"\u0646\u0645\u0627\u06CC\u0634 \u0634\u0628\u06A9\u0647\u200C\u0627\u06CC","catalog.viewList":"\u0646\u0645\u0627\u06CC\u0634 \u0641\u0647\u0631\u0633\u062A\u06CC","auth.original":"\u0627\u0635\u0644 (\u0627\u0648\u0631\u062C\u06CC\u0646\u0627\u0644)","auth.highcopy":"\u0647\u0627\u06CC\u200C\u06A9\u067E\u06CC \u062F\u0631\u062C\u0647 \u06CC\u06A9","auth.generic":"\u0645\u062A\u0641\u0631\u0642\u0647","card.addToCart":"\u0627\u0641\u0632\u0648\u062F\u0646 \u0628\u0647 \u0633\u0628\u062F","card.added":"\u0628\u0647 \u0633\u0628\u062F \u0627\u0636\u0627\u0641\u0647 \u0634\u062F","card.quickView":"\u0645\u0634\u0627\u0647\u062F\u0647\u200C\u06CC \u0633\u0631\u06CC\u0639","card.wishlistAdd":"\u0627\u0641\u0632\u0648\u062F\u0646 \u0628\u0647 \u0644\u06CC\u0633\u062A \u0645\u0646","card.wishlistRemove":"\u062D\u0630\u0641 \u0627\u0632 \u0644\u06CC\u0633\u062A \u0645\u0646","card.compareAdd":"\u0627\u0641\u0632\u0648\u062F\u0646 \u0628\u0647 \u0645\u0642\u0627\u06CC\u0633\u0647","card.outOfStock":"\u0646\u0627\u0645\u0648\u062C\u0648\u062F","card.soldOut":"\u062A\u0645\u0627\u0645 \u0634\u062F","pdp.addToCart":"\u0627\u0641\u0632\u0648\u062F\u0646 \u0628\u0647 \u0633\u0628\u062F \u062E\u0631\u06CC\u062F","pdp.buyNow":"\u062E\u0631\u06CC\u062F \u0641\u0648\u0631\u06CC","pdp.pickup":"\u062A\u062D\u0648\u06CC\u0644 \u062D\u0636\u0648\u0631\u06CC \u0631\u0627\u06CC\u06AF\u0627\u0646 \u062F\u0631 \u0645\u063A\u0627\u0632\u0647","pdp.warranty":"\u06AF\u0627\u0631\u0627\u0646\u062A\u06CC","pdp.warrantyMonths":"{n} \u0645\u0627\u0647 \u06AF\u0627\u0631\u0627\u0646\u062A\u06CC \u062A\u0639\u0648\u06CC\u0636 \u0641\u0631\u0648\u0634\u06AF\u0627\u0647","pdp.noWarranty":"\u0628\u062F\u0648\u0646 \u06AF\u0627\u0631\u0627\u0646\u062A\u06CC","pdp.sku":"\u06A9\u062F \u06A9\u0627\u0644\u0627","pdp.barcode":"\u0628\u0627\u0631\u06A9\u062F","pdp.weight":"\u0648\u0632\u0646","pdp.gram":"\u06AF\u0631\u0645","pdp.zoomIn":"\u0628\u0632\u0631\u06AF\u200C\u0646\u0645\u0627\u06CC\u06CC","pdp.zoomOut":"\u06A9\u0648\u0686\u06A9\u200C\u0646\u0645\u0627\u06CC\u06CC","pdp.zoomReset":"\u0627\u0646\u062F\u0627\u0632\u0647\u0654 \u0627\u0635\u0644\u06CC","pdp.zoomHint":"\u0630\u0631\u0647\u200C\u0628\u06CC\u0646: \u0645\u0648\u0633 \u0631\u0627 \u0631\u0648\u06CC \u062A\u0635\u0648\u06CC\u0631 \u0628\u0628\u0631\u061B \u0628\u0632\u0631\u06AF\u200C\u0646\u0645\u0627\u06CC\u06CC \u06A9\u0627\u0645\u0644: \u06A9\u0644\u06CC\u06A9 \u06CC\u0627 \u062F\u0648\u0636\u0631\u0628\u0647","pdp.video":"\u0648\u06CC\u062F\u06CC\u0648","pdp.share":"\u0627\u0634\u062A\u0631\u0627\u06A9\u200C\u06AF\u0630\u0627\u0631\u06CC","pdp.specs":"\u0645\u0634\u062E\u0635\u0627\u062A \u0641\u0646\u06CC","pdp.description":"\u062A\u0648\u0636\u06CC\u062D\u0627\u062A","pdp.reviews":"\u0646\u0638\u0631\u0627\u062A \u0648 \u0627\u0645\u062A\u06CC\u0627\u0632\u0647\u0627","pdp.questions":"\u0633\u0624\u0627\u0644\u0627\u062A \u06A9\u0627\u0631\u0628\u0631\u0627\u0646","pdp.related":"\u06A9\u0627\u0644\u0627\u0647\u0627\u06CC \u0645\u0634\u0627\u0628\u0647","pdp.compatibility":"\u0633\u0627\u0632\u06AF\u0627\u0631\u06CC","pdp.writeReview":"\u062B\u0628\u062A \u0646\u0638\u0631 \u0648 \u0627\u0645\u062A\u06CC\u0627\u0632","pdp.askQuestion":"\u067E\u0631\u0633\u06CC\u062F\u0646 \u0633\u0624\u0627\u0644","pdp.loginToReview":"\u0628\u0631\u0627\u06CC \u062B\u0628\u062A \u0646\u0638\u0631 \u0648\u0627\u0631\u062F \u062D\u0633\u0627\u0628 \u06A9\u0627\u0631\u0628\u0631\u06CC \u0634\u0648.","pdp.reviewSubmitted":"\u0646\u0638\u0631 \u0634\u0645\u0627 \u062B\u0628\u062A \u0634\u062F \u0648 \u067E\u0633 \u0627\u0632 \u062A\u0623\u06CC\u06CC\u062F \u0645\u062F\u06CC\u0631 \u0646\u0645\u0627\u06CC\u0634 \u062F\u0627\u062F\u0647 \u0645\u06CC\u200C\u0634\u0648\u062F.","pdp.reviewPending":"\u0646\u0638\u0631 \u0634\u0645\u0627 \u067E\u0633 \u0627\u0632 \u062A\u0623\u06CC\u06CC\u062F \u0645\u062F\u06CC\u0631 \u0646\u0645\u0627\u06CC\u0634 \u062F\u0627\u062F\u0647 \u0645\u06CC\u200C\u0634\u0648\u062F.","pdp.questionSubmitted":"\u0633\u0624\u0627\u0644 \u0634\u0645\u0627 \u062B\u0628\u062A \u0634\u062F\u061B \u067E\u0633 \u0627\u0632 \u062A\u0623\u06CC\u06CC\u062F\u060C \u0645\u062F\u06CC\u0631 \u0628\u0647 \u0622\u0646 \u067E\u0627\u0633\u062E \u0645\u06CC\u200C\u062F\u0647\u062F.","pdp.buyerBadge":"\u062E\u0631\u06CC\u062F\u0627\u0631 \u0627\u06CC\u0646 \u06A9\u0627\u0644\u0627","pdp.visitorBadge":"\u0628\u0627\u0632\u062F\u06CC\u062F\u06A9\u0646\u0646\u062F\u0647","pdp.helpful":"\u0645\u0641\u06CC\u062F \u0628\u0648\u062F","pdp.storeReply":"\u067E\u0627\u0633\u062E \u0641\u0631\u0648\u0634\u06AF\u0627\u0647","pdp.noReviews":"\u0647\u0646\u0648\u0632 \u0646\u0638\u0631\u06CC \u062B\u0628\u062A \u0646\u0634\u062F\u0647. \u0627\u0648\u0644\u06CC\u0646 \u0646\u0641\u0631 \u0628\u0627\u0634!","pdp.noQuestions":"\u0633\u0624\u0627\u0644\u06CC \u062B\u0628\u062A \u0646\u0634\u062F\u0647. \u0627\u06AF\u0631 \u0633\u0624\u0627\u0644\u06CC \u062F\u0627\u0631\u06CC \u0628\u067E\u0631\u0633.","pdp.yourRating":"\u0627\u0645\u062A\u06CC\u0627\u0632 \u0634\u0645\u0627","pdp.viewed":"\u0628\u0627\u0632\u062F\u06CC\u062F","pdp.sold":"\u0641\u0631\u0648\u0634 \u0631\u0641\u062A\u0647","pdp.off":"\u062A\u062E\u0641\u06CC\u0641","pdp.save":"\u0633\u0648\u062F \u0634\u0645\u0627","pdp.lastPrice":"\u0642\u06CC\u0645\u062A \u0642\u0628\u0644\u06CC","pdp.stockCount":"\u0645\u0648\u062C\u0648\u062F\u06CC: {n} \u0639\u062F\u062F","pdp.fastSend":"\u0627\u0631\u0633\u0627\u0644 \u0633\u0631\u06CC\u0639 \u0627\u0632 \u062A\u0647\u0631\u0627\u0646","pdp.installment":"\u067E\u0631\u062F\u0627\u062E\u062A \u062F\u0631 \u0645\u062D\u0644 \u0628\u0631\u0627\u06CC \u0633\u0641\u0627\u0631\u0634\u200C\u0647\u0627\u06CC \u0648\u0627\u062C\u062F \u0634\u0631\u0627\u06CC\u0637","cart.title":"\u0633\u0628\u062F \u062E\u0631\u06CC\u062F","cart.empty":"\u0633\u0628\u062F \u062E\u0631\u06CC\u062F \u062E\u0627\u0644\u06CC \u0627\u0633\u062A","cart.emptyText":"\u0647\u0646\u0648\u0632 \u06A9\u0627\u0644\u0627\u06CC\u06CC \u0627\u0646\u062A\u062E\u0627\u0628 \u0646\u06A9\u0631\u062F\u0647\u200C\u0627\u06CC. \u0627\u0632 \u062F\u0633\u062A\u0647\u200C\u0628\u0646\u062F\u06CC\u200C\u0647\u0627 \u06CC\u0627 \u062C\u0633\u062A\u200C\u0648\u062C\u0648 \u0634\u0631\u0648\u0639 \u06A9\u0646.","cart.goShopping":"\u0628\u0631\u06CC\u0645 \u0633\u0631\u0627\u063A \u062E\u0631\u06CC\u062F","cart.item":"\u06A9\u0627\u0644\u0627","cart.qty":"\u062A\u0639\u062F\u0627\u062F","cart.remove":"\u062D\u0630\u0641","cart.clear":"\u062E\u0627\u0644\u06CC \u06A9\u0631\u062F\u0646 \u0633\u0628\u062F","cart.clearConfirm":"\u0647\u0645\u0647\u200C\u06CC \u06A9\u0627\u0644\u0627\u0647\u0627\u06CC \u0633\u0628\u062F \u062D\u0630\u0641 \u0634\u0648\u0646\u062F\u061F","cart.summary":"\u062E\u0644\u0627\u0635\u0647\u200C\u06CC \u0633\u0641\u0627\u0631\u0634","cart.continue":"\u0627\u062F\u0627\u0645\u0647\u200C\u06CC \u0641\u0631\u0622\u06CC\u0646\u062F \u062E\u0631\u06CC\u062F","cart.freeShipHint":"\u0627\u06AF\u0631 {amount} \u062A\u0648\u0645\u0627\u0646 \u062F\u06CC\u06AF\u0631 \u062E\u0631\u06CC\u062F \u06A9\u0646\u06CC\u060C \u0627\u0631\u0633\u0627\u0644 \u0631\u0627\u06CC\u06AF\u0627\u0646 \u0645\u06CC\u200C\u0634\u0648\u062F.","cart.freeShipDone":"\u0627\u0631\u0633\u0627\u0644 \u0627\u06CC\u0646 \u0633\u0641\u0627\u0631\u0634 \u0631\u0627\u06CC\u06AF\u0627\u0646 \u0627\u0633\u062A!","cart.couponApplied":"\u06A9\u062F \u062A\u062E\u0641\u06CC\u0641 \u0627\u0639\u0645\u0627\u0644 \u0634\u062F","cart.couponPlaceholder":"\u06A9\u062F \u062A\u062E\u0641\u06CC\u0641 \u062F\u0627\u0631\u06CC\u061F \u0648\u0627\u0631\u062F \u06A9\u0646","cart.applyCoupon":"\u0627\u0639\u0645\u0627\u0644 \u06A9\u062F","cart.removeCoupon":"\u062D\u0630\u0641 \u06A9\u062F","cart.updated":"\u0633\u0628\u062F \u0628\u0647\u200C\u0631\u0648\u0632\u0631\u0633\u0627\u0646\u06CC \u0634\u062F","checkout.title":"\u062A\u06A9\u0645\u06CC\u0644 \u0633\u0641\u0627\u0631\u0634","checkout.step1":"\u062A\u062D\u0648\u06CC\u0644","checkout.step2":"\u067E\u0631\u062F\u0627\u062E\u062A","checkout.step3":"\u062A\u0623\u06CC\u06CC\u062F","checkout.delivery":"\u0631\u0648\u0634 \u062A\u062D\u0648\u06CC\u0644","checkout.pickup":"\u062A\u062D\u0648\u06CC\u0644 \u062D\u0636\u0648\u0631\u06CC \u0627\u0632 \u0645\u063A\u0627\u0632\u0647","checkout.pickupDesc":"\u0631\u0627\u06CC\u06AF\u0627\u0646 \u2014 \u067E\u0633 \u0627\u0632 \u062A\u0623\u06CC\u06CC\u062F\u060C \u0627\u0639\u0644\u0627\u0646 \u0622\u0645\u0627\u062F\u0647\u200C\u0633\u0627\u0632\u06CC \u0645\u06CC\u200C\u06AF\u06CC\u0631\u06CC \u0648 \u062D\u0636\u0648\u0631\u06CC \u062A\u062D\u0648\u06CC\u0644 \u0645\u06CC\u200C\u06AF\u06CC\u0631\u06CC.","checkout.courier":"\u0627\u0631\u0633\u0627\u0644 \u0628\u0627 \u067E\u06CC\u06A9 / \u067E\u0633\u062A","checkout.courierDesc":"\u0627\u0631\u0633\u0627\u0644 \u0628\u0647 \u0622\u062F\u0631\u0633 \u062B\u0628\u062A\u200C\u0634\u062F\u0647 \u0628\u0627 \u0627\u0645\u06A9\u0627\u0646 \u0628\u06CC\u0645\u0647\u200C\u06CC \u0645\u0631\u0633\u0648\u0644\u0647.","checkout.zone":"\u0645\u0646\u0637\u0642\u0647\u200C\u06CC \u0627\u0631\u0633\u0627\u0644","checkout.express":"\u0627\u0631\u0633\u0627\u0644 \u0641\u0648\u0631\u06CC (\u0647\u0645\u0627\u0646 \u0631\u0648\u0632)","checkout.insuranceOpt":"\u0628\u06CC\u0645\u0647\u200C\u06CC \u0645\u0631\u0633\u0648\u0644\u0647","checkout.insuranceDesc":"\u062F\u0631 \u0635\u0648\u0631\u062A \u0622\u0633\u06CC\u0628 \u06CC\u0627 \u0645\u0641\u0642\u0648\u062F\u06CC \u062F\u0631 \u0645\u0633\u06CC\u0631\u060C \u0645\u0639\u0627\u062F\u0644 \u0627\u0631\u0632\u0634 \u06A9\u0627\u0644\u0627 \u062C\u0628\u0631\u0627\u0646 \u0645\u06CC\u200C\u0634\u0648\u062F.","checkout.insuranceAuto":"\u0628\u0631\u0627\u06CC \u0627\u0639\u0636\u0627\u06CC \u067E\u0644\u0627\u0633 \u0628\u0647\u200C\u0635\u0648\u0631\u062A \u062E\u0648\u062F\u06A9\u0627\u0631 \u0648 \u0631\u0627\u06CC\u06AF\u0627\u0646 \u0627\u0639\u0645\u0627\u0644 \u0634\u062F.","checkout.address":"\u0622\u062F\u0631\u0633 \u0627\u0631\u0633\u0627\u0644","checkout.addAddress":"\u0627\u0641\u0632\u0648\u062F\u0646 \u0622\u062F\u0631\u0633 \u062C\u062F\u06CC\u062F","checkout.noAddress":"\u0628\u0631\u0627\u06CC \u0627\u0631\u0633\u0627\u0644 \u067E\u0633\u062A\u06CC \u0628\u0627\u06CC\u062F \u062D\u062F\u0627\u0642\u0644 \u06CC\u06A9 \u0622\u062F\u0631\u0633 \u062B\u0628\u062A \u06A9\u0646\u06CC.","checkout.paymentMethod":"\u0631\u0648\u0634 \u067E\u0631\u062F\u0627\u062E\u062A","checkout.useWallet":"\u067E\u0631\u062F\u0627\u062E\u062A \u0627\u0632 \u06A9\u06CC\u0641 \u067E\u0648\u0644","checkout.walletBalance":"\u0645\u0648\u062C\u0648\u062F\u06CC \u06A9\u06CC\u0641 \u067E\u0648\u0644: {amount} \u062A\u0648\u0645\u0627\u0646","checkout.note":"\u062A\u0648\u0636\u06CC\u062D\u0627\u062A \u0633\u0641\u0627\u0631\u0634 (\u0627\u062E\u062A\u06CC\u0627\u0631\u06CC)","checkout.notePlaceholder":"\u0645\u062B\u0644\u0627\u064B: \u0644\u0637\u0641\u0627\u064B \u0642\u0628\u0644 \u0627\u0632 \u0627\u0631\u0633\u0627\u0644 \u062A\u0645\u0627\u0633 \u0628\u06AF\u06CC\u0631\u06CC\u062F.","checkout.acceptTerms":"\u0642\u0648\u0627\u0646\u06CC\u0646 \u0648 \u0645\u0642\u0631\u0631\u0627\u062A \u0648 \u062D\u0631\u06CC\u0645 \u062E\u0635\u0648\u0635\u06CC \u0631\u0627 \u062E\u0648\u0627\u0646\u062F\u0647\u200C\u0627\u0645 \u0648 \u0645\u06CC\u200C\u067E\u0630\u06CC\u0631\u0645.","checkout.placeOrder":"\u062B\u0628\u062A \u0648 \u067E\u0631\u062F\u0627\u062E\u062A \u0633\u0641\u0627\u0631\u0634","checkout.placing":"\u062F\u0631 \u062D\u0627\u0644 \u062B\u0628\u062A \u0633\u0641\u0627\u0631\u0634\u2026","checkout.loginRequired":"\u0628\u0631\u0627\u06CC \u062A\u06A9\u0645\u06CC\u0644 \u062E\u0631\u06CC\u062F \u0648\u0627\u0631\u062F \u062D\u0633\u0627\u0628 \u06A9\u0627\u0631\u0628\u0631\u06CC \u0634\u0648.","checkout.successTitle":"\u0633\u0641\u0627\u0631\u0634 \u062B\u0628\u062A \u0634\u062F","checkout.successText":"\u06A9\u062F \u0633\u0641\u0627\u0631\u0634 \u062A\u0648 {code} \u0627\u0633\u062A. \u0648\u0636\u0639\u06CC\u062A \u0631\u0627 \u0627\u0632 \u0628\u062E\u0634 \xAB\u0633\u0641\u0627\u0631\u0634\u200C\u0647\u0627\u06CC \u0645\u0646\xBB \u067E\u06CC\u06AF\u06CC\u0631\u06CC \u06A9\u0646.","checkout.payNow":"\u067E\u0631\u062F\u0627\u062E\u062A \u0622\u0646\u0644\u0627\u06CC\u0646","checkout.payLater":"\u0628\u0639\u062F\u0627\u064B \u067E\u0631\u062F\u0627\u062E\u062A \u0645\u06CC\u200C\u06A9\u0646\u0645","checkout.gatewayDemo":"\u062F\u0631\u06AF\u0627\u0647 \u062F\u0631 \u062D\u0627\u0644\u062A \u0622\u0632\u0645\u0627\u06CC\u0634\u06CC \u0627\u0633\u062A\u061B \u0647\u06CC\u0686 \u0645\u0628\u0644\u063A\u06CC \u0648\u0627\u0642\u0639\u0627\u064B \u06A9\u0633\u0631 \u0646\u0645\u06CC\u200C\u0634\u0648\u062F.","checkout.paymentSuccess":"\u067E\u0631\u062F\u0627\u062E\u062A \u0645\u0648\u0641\u0642 \u0628\u0648\u062F","checkout.paymentFailed":"\u067E\u0631\u062F\u0627\u062E\u062A \u0646\u0627\u0645\u0648\u0641\u0642 \u0628\u0648\u062F","checkout.simulateSuccess":"\u067E\u0631\u062F\u0627\u062E\u062A \u0645\u0648\u0641\u0642 (\u0634\u0628\u06CC\u0647\u200C\u0633\u0627\u0632\u06CC \u062F\u0631\u06AF\u0627\u0647)","checkout.simulateFail":"\u0644\u063A\u0648 \u067E\u0631\u062F\u0627\u062E\u062A","checkout.concurrencyNote":"\u0645\u0648\u062C\u0648\u062F\u06CC \u062F\u0631 \u0644\u062D\u0638\u0647\u200C\u06CC \u062B\u0628\u062A \u0633\u0641\u0627\u0631\u0634 \u0642\u0641\u0644 \u0645\u06CC\u200C\u0634\u0648\u062F\u061B \u0627\u06AF\u0631 \u06A9\u0627\u0644\u0627\u06CC\u06CC \u0647\u0645\u200C\u0632\u0645\u0627\u0646 \u062A\u0645\u0627\u0645 \u0634\u0648\u062F\u060C \u0628\u0647 \u062A\u0648 \u0627\u0637\u0644\u0627\u0639 \u0645\u06CC\u200C\u062F\u0647\u06CC\u0645 \u0648 \u0648\u062C\u0647 \u0628\u0627\u0632 \u0645\u06CC\u200C\u06AF\u0631\u062F\u062F.","checkout.pickupReady":"\u0632\u0645\u0627\u0646 \u0622\u0645\u0627\u062F\u0647\u200C\u0633\u0627\u0632\u06CC: \u062D\u062F\u0648\u062F {h} \u0633\u0627\u0639\u062A \u06A9\u0627\u0631\u06CC","auth.title":"\u0648\u0631\u0648\u062F \u06CC\u0627 \u062B\u0628\u062A\u200C\u0646\u0627\u0645","auth.loginTitle":"\u0648\u0631\u0648\u062F \u0628\u0647 \u062D\u0633\u0627\u0628 \u06A9\u0627\u0631\u0628\u0631\u06CC","auth.registerTitle":"\u0633\u0627\u062E\u062A \u062D\u0633\u0627\u0628 \u06A9\u0627\u0631\u0628\u0631\u06CC","auth.methodPassword":"\u0646\u0627\u0645 \u06A9\u0627\u0631\u0628\u0631\u06CC \u0648 \u0631\u0645\u0632","auth.methodPhone":"\u0634\u0645\u0627\u0631\u0647 \u0645\u0648\u0628\u0627\u06CC\u0644","auth.methodEmail":"\u0627\u06CC\u0645\u06CC\u0644","auth.identifier":"\u0646\u0627\u0645 \u06A9\u0627\u0631\u0628\u0631\u06CC\u060C \u0645\u0648\u0628\u0627\u06CC\u0644 \u06CC\u0627 \u0627\u06CC\u0645\u06CC\u0644","auth.remember":"\u0645\u0631\u0627 \u0628\u0647 \u062E\u0627\u0637\u0631 \u0628\u0633\u067E\u0627\u0631","auth.forgot":"\u0641\u0631\u0627\u0645\u0648\u0634\u06CC \u0631\u0645\u0632 \u0639\u0628\u0648\u0631","auth.noAccount":"\u062D\u0633\u0627\u0628 \u06A9\u0627\u0631\u0628\u0631\u06CC \u0646\u062F\u0627\u0631\u06CC\u061F","auth.haveAccount":"\u0642\u0628\u0644\u0627\u064B \u062B\u0628\u062A\u200C\u0646\u0627\u0645 \u06A9\u0631\u062F\u0647\u200C\u0627\u06CC\u061F","auth.sendCode":"\u0627\u0631\u0633\u0627\u0644 \u06A9\u062F \u062A\u0623\u06CC\u06CC\u062F","auth.codeSent":"\u06A9\u062F \u062A\u0623\u06CC\u06CC\u062F \u0627\u0631\u0633\u0627\u0644 \u0634\u062F","auth.codeSentTo":"\u06A9\u062F \u06F6 \u0631\u0642\u0645\u06CC \u0628\u0647 {target} \u0627\u0631\u0633\u0627\u0644 \u0634\u062F.","auth.enterCode":"\u06A9\u062F \u062A\u0623\u06CC\u06CC\u062F \u0631\u0627 \u0648\u0627\u0631\u062F \u06A9\u0646","auth.otpCode":"\u06A9\u062F \u062A\u0623\u06CC\u06CC\u062F","auth.resend":"\u0627\u0631\u0633\u0627\u0644 \u062F\u0648\u0628\u0627\u0631\u0647\u200C\u06CC \u06A9\u062F","auth.resendIn":"\u0627\u0631\u0633\u0627\u0644 \u062F\u0648\u0628\u0627\u0631\u0647 \u062A\u0627 {s} \u062B\u0627\u0646\u06CC\u0647","auth.demoCode":"\u062D\u0627\u0644\u062A \u0622\u0632\u0645\u0627\u06CC\u0634\u06CC: \u06A9\u062F \u062A\u0623\u06CC\u06CC\u062F {code}","auth.2faTitle":"\u0648\u0631\u0648\u062F \u062F\u0648\u0645\u0631\u062D\u0644\u0647\u200C\u0627\u06CC","auth.2faText":"\u06A9\u062F \u06F6 \u0631\u0642\u0645\u06CC \u0627\u0632 \u0627\u067E \u0627\u062D\u0631\u0627\u0632 \u0647\u0648\u06CC\u062A\u060C \u067E\u06CC\u0627\u0645\u06A9 \u06CC\u0627 \u0627\u06CC\u0645\u06CC\u0644 \u0631\u0627 \u0648\u0627\u0631\u062F \u06A9\u0646.","auth.2faTotp":"\u0627\u067E \u0627\u062D\u0631\u0627\u0632 \u0647\u0648\u06CC\u062A","auth.2faSms":"\u06A9\u062F \u067E\u06CC\u0627\u0645\u06A9\u06CC","auth.2faEmail":"\u06A9\u062F \u0627\u06CC\u0645\u06CC\u0644\u06CC","auth.2faBackup":"\u06A9\u062F \u067E\u0634\u062A\u06CC\u0628\u0627\u0646","auth.2faVerify":"\u062A\u0623\u06CC\u06CC\u062F \u0648 \u0648\u0631\u0648\u062F","auth.acceptTerms":"\u0642\u0648\u0627\u0646\u06CC\u0646 \u0648 \u0645\u0642\u0631\u0631\u0627\u062A \u0648 \u062D\u0631\u06CC\u0645 \u062E\u0635\u0648\u0635\u06CC \u0631\u0627 \u0645\u06CC\u200C\u067E\u0630\u06CC\u0631\u0645.","auth.referral":"\u06A9\u062F \u0645\u0639\u0631\u0641 (\u0627\u062E\u062A\u06CC\u0627\u0631\u06CC)","auth.registerDone":"\u062D\u0633\u0627\u0628 \u06A9\u0627\u0631\u0628\u0631\u06CC \u0633\u0627\u062E\u062A\u0647 \u0634\u062F. \u062E\u0648\u0634 \u0622\u0645\u062F\u06CC!","auth.loginDone":"\u062E\u0648\u0634 \u0622\u0645\u062F\u06CC","auth.logoutDone":"\u0628\u0627 \u0645\u0648\u0641\u0642\u06CC\u062A \u062E\u0627\u0631\u062C \u0634\u062F\u06CC","auth.recoveryTitle":"\u0628\u0627\u0632\u06CC\u0627\u0628\u06CC \u0631\u0645\u0632 \u0639\u0628\u0648\u0631","auth.recoveryText":"\u0634\u0645\u0627\u0631\u0647\u200C\u06CC \u0645\u0648\u0628\u0627\u06CC\u0644 \u06CC\u0627 \u0627\u06CC\u0645\u06CC\u0644 \u062B\u0628\u062A\u200C\u0634\u062F\u0647 \u0631\u0627 \u0648\u0627\u0631\u062F \u06A9\u0646 \u062A\u0627 \u06A9\u062F \u0628\u0627\u0632\u06CC\u0627\u0628\u06CC \u0628\u0641\u0631\u0633\u062A\u06CC\u0645.","auth.newPassword":"\u0631\u0645\u0632 \u0639\u0628\u0648\u0631 \u062C\u062F\u06CC\u062F","auth.resetDone":"\u0631\u0645\u0632 \u0639\u0628\u0648\u0631 \u0628\u0627 \u0645\u0648\u0641\u0642\u06CC\u062A \u062A\u063A\u06CC\u06CC\u0631 \u06A9\u0631\u062F","auth.passwordRules":"\u062D\u062F\u0627\u0642\u0644 \u06F8 \u0646\u0648\u06CC\u0633\u0647 \u0634\u0627\u0645\u0644 \u062D\u0631\u0648\u0641 \u06A9\u0648\u0686\u06A9\u060C \u062D\u0631\u0648\u0641 \u0628\u0632\u0631\u06AF\u060C \u0639\u062F\u062F \u0648 \u0646\u0645\u0627\u062F","auth.orContinue":"\u06CC\u0627","auth.guestCheckout":"\u0627\u062F\u0627\u0645\u0647\u200C\u06CC \u062E\u0631\u06CC\u062F \u0628\u062F\u0648\u0646 \u062D\u0633\u0627\u0628 \u06A9\u0627\u0631\u0628\u0631\u06CC","acc.title":"\u062D\u0633\u0627\u0628 \u06A9\u0627\u0631\u0628\u0631\u06CC","acc.dashboard":"\u062F\u0627\u0634\u0628\u0648\u0631\u062F \u0645\u0646","acc.badges":"\u0627\u0641\u062A\u062E\u0627\u0631\u0627\u062A \u0645\u0646","badge.got":"\u062F\u0631\u06CC\u0627\u0641\u062A\u200C\u0634\u062F\u0647","badge.locked":"\u0647\u0646\u0648\u0632 \u0642\u0641\u0644","badge.first-buy":"\u0646\u062E\u0633\u062A\u06CC\u0646 \u062E\u0631\u06CC\u062F","badge.first-buy.d":"\u0627\u0648\u0644\u06CC\u0646 \u0633\u0641\u0627\u0631\u0634 \u0645\u0648\u0641\u0642 \u0631\u0627 \u062B\u0628\u062A \u06A9\u0631\u062F\u0647\u200C\u0627\u06CC\u062F.","badge.silver-buyer":"\u062E\u0631\u06CC\u062F\u0627\u0631 \u0646\u0642\u0631\u0647\u200C\u0627\u06CC","badge.silver-buyer.d":"\u06F5 \u062E\u0631\u06CC\u062F \u0645\u0648\u0641\u0642\u061B \u0627\u0639\u062A\u0628\u0627\u0631 \u0634\u0645\u0627 \u0646\u0632\u062F \u06CC\u0627\u0633\u0627\u06CC\u06CC.","badge.gold-buyer":"\u062E\u0631\u06CC\u062F\u0627\u0631 \u0637\u0644\u0627\u06CC\u06CC","badge.gold-buyer.d":"\u06F1\u06F5 \u062E\u0631\u06CC\u062F \u0645\u0648\u0641\u0642\u061B \u0645\u0634\u062A\u0631\u06CC \u0648\u06CC\u0698\u0647\u0654 \u06CC\u0627\u0633\u0627\u06CC\u06CC.","badge.big-spender":"\u062E\u0648\u0634\u200C\u062D\u0633\u0627\u0628","badge.big-spender.d":"\u0645\u062C\u0645\u0648\u0639 \u062E\u0631\u06CC\u062F \u0628\u0627\u0644\u0627\u06CC \u06F5\u06F0 \u0645\u06CC\u0644\u06CC\u0648\u0646 \u062A\u0648\u0645\u0627\u0646.","badge.early-bird":"\u067E\u06CC\u0634\u06AF\u0627\u0645","badge.early-bird.d":"\u062C\u0632\u0648 \u06F1\u06F0\u06F0 \u06A9\u0627\u0631\u0628\u0631 \u0646\u062E\u0633\u062A \u06CC\u0627\u0633\u0627\u06CC\u06CC \u0628\u0648\u062F\u0647\u200C\u0627\u06CC\u062F.","badge.veteran":"\u0647\u0645\u0631\u0627\u0647 \u06A9\u0647\u0646\u0647\u200C\u06A9\u0627\u0631","badge.veteran.d":"\u0628\u06CC\u0634 \u0627\u0632 \u06CC\u06A9 \u0633\u0627\u0644 \u0647\u0645\u0631\u0627\u0647 \u0645\u0627 \u0647\u0633\u062A\u06CC\u062F.","badge.reviewer":"\u0646\u0642\u062F\u0646\u0648\u06CC\u0633","badge.reviewer.d":"\u06F3 \u062B\u0628\u062A \u062A\u062C\u0631\u0628\u0647\u0654 \u062E\u0631\u06CC\u062F\u061B \u06A9\u0645\u06A9 \u0628\u0647 \u0627\u0646\u062A\u062E\u0627\u0628 \u0628\u0642\u06CC\u0647.","badge.plus-member":"\u0639\u0636\u0648 \u067E\u0644\u0627\u0633","badge.plus-member.d":"\u0627\u0634\u062A\u0631\u0627\u06A9 \u067E\u0644\u0627\u0633 \u0641\u0639\u0627\u0644 \u062F\u0627\u0631\u06CC\u062F.","badge.wallet-user":"\u06A9\u06CC\u0641\u200C\u067E\u0648\u0644\u06CC","badge.wallet-user.d":"\u0627\u0632 \u06A9\u06CC\u0641 \u067E\u0648\u0644 \u06CC\u0627\u0633\u0627\u06CC\u06CC \u0627\u0633\u062A\u0641\u0627\u062F\u0647 \u06A9\u0631\u062F\u0647\u200C\u0627\u06CC\u062F.","badge.supporter":"\u067E\u06CC\u06AF\u06CC\u0631","badge.supporter.d":"\u0627\u0648\u0644\u06CC\u0646 \u062A\u06CC\u06A9\u062A \u067E\u0634\u062A\u06CC\u0628\u0627\u0646\u06CC \u0631\u0627 \u062B\u0628\u062A \u06A9\u0631\u062F\u0647\u200C\u0627\u06CC\u062F.","acc.orders":"\u0633\u0641\u0627\u0631\u0634\u200C\u0647\u0627\u06CC \u0645\u0646","acc.wishlist":"\u0644\u06CC\u0633\u062A \u0645\u0646","acc.wallet":"\u06A9\u06CC\u0641 \u067E\u0648\u0644","acc.plus":"\u0627\u0634\u062A\u0631\u0627\u06A9 \u067E\u0644\u0627\u0633","acc.addresses":"\u0622\u062F\u0631\u0633\u200C\u0647\u0627","acc.notifications":"\u0627\u0639\u0644\u0627\u0646\u200C\u0647\u0627","acc.tickets":"\u062A\u06CC\u06A9\u062A\u200C\u0647\u0627\u06CC \u0645\u0646","acc.support":"\u0686\u062A \u067E\u0634\u062A\u06CC\u0628\u0627\u0646\u06CC","acc.reviews":"\u0646\u0638\u0631\u0627\u062A \u0645\u0646","acc.feedback":"\u067E\u06CC\u0634\u0646\u0647\u0627\u062F\u0647\u0627 \u0648 \u0634\u06A9\u0627\u06CC\u0627\u062A","acc.profile":"\u0645\u0634\u062E\u0635\u0627\u062A \u067E\u0631\u0648\u0641\u0627\u06CC\u0644","acc.security":"\u0627\u0645\u0646\u06CC\u062A \u062D\u0633\u0627\u0628","acc.sessions":"\u0646\u0634\u0633\u062A\u200C\u0647\u0627\u06CC \u0641\u0639\u0627\u0644","acc.prefs":"\u062A\u0631\u062C\u06CC\u062D\u0627\u062A \u0646\u0645\u0627\u06CC\u0634","acc.data":"\u062F\u0627\u062F\u0647\u200C\u0647\u0627\u06CC \u0645\u0646","acc.hello":"\u0633\u0644\u0627\u0645 {name}","acc.memberSince":"\u0639\u0636\u0648 \u0627\u0632 {date}","acc.noOrders":"\u0647\u0646\u0648\u0632 \u0633\u0641\u0627\u0631\u0634\u06CC \u062B\u0628\u062A \u0646\u06A9\u0631\u062F\u0647\u200C\u0627\u06CC","acc.noOrdersText":"\u0627\u0648\u0644\u06CC\u0646 \u062E\u0631\u06CC\u062F\u062A \u0631\u0627 \u0628\u0627 \u062A\u062E\u0641\u06CC\u0641 \u062E\u0648\u0634\u200C\u0622\u0645\u062F\u06AF\u0648\u06CC\u06CC WELCOME10 \u0627\u0646\u062C\u0627\u0645 \u0628\u062F\u0647.","acc.orderCode":"\u06A9\u062F \u0633\u0641\u0627\u0631\u0634","acc.orderDate":"\u062A\u0627\u0631\u06CC\u062E \u0633\u0641\u0627\u0631\u0634","acc.orderItems":"\u0627\u0642\u0644\u0627\u0645","acc.orderTotal":"\u0645\u0628\u0644\u063A \u06A9\u0644","acc.trackOrder":"\u067E\u06CC\u06AF\u06CC\u0631\u06CC \u0633\u0641\u0627\u0631\u0634","acc.cancelOrder":"\u0644\u063A\u0648 \u0633\u0641\u0627\u0631\u0634","acc.cancelConfirm":"\u0627\u06CC\u0646 \u0633\u0641\u0627\u0631\u0634 \u0644\u063A\u0648 \u0634\u0648\u062F\u061F \u0645\u0628\u0644\u063A \u067E\u0631\u062F\u0627\u062E\u062A\u06CC \u0628\u0647 \u06A9\u06CC\u0641 \u067E\u0648\u0644 \u0628\u0631\u0645\u06CC\u200C\u06AF\u0631\u062F\u062F.","acc.cancelReason":"\u062F\u0644\u06CC\u0644 \u0644\u063A\u0648 (\u0627\u062E\u062A\u06CC\u0627\u0631\u06CC)","acc.orderCancelled":"\u0633\u0641\u0627\u0631\u0634 \u0644\u063A\u0648 \u0634\u062F","acc.reorder":"\u062E\u0631\u06CC\u062F \u062F\u0648\u0628\u0627\u0631\u0647","acc.invoice":"\u0641\u0627\u06A9\u062A\u0648\u0631","acc.printInvoice":"\u0686\u0627\u067E \u0641\u0627\u06A9\u062A\u0648\u0631","acc.timeline":"\u0631\u0648\u0646\u062F \u0633\u0641\u0627\u0631\u0634","acc.walletEmpty":"\u062A\u0631\u0627\u06A9\u0646\u0634\u06CC \u062B\u0628\u062A \u0646\u0634\u062F\u0647 \u0627\u0633\u062A","acc.walletDeposit":"\u0634\u0627\u0631\u0698 \u06A9\u06CC\u0641 \u067E\u0648\u0644","acc.walletAmount":"\u0645\u0628\u0644\u063A \u0634\u0627\u0631\u0698 (\u062A\u0648\u0645\u0627\u0646)","acc.walletDeposited":"\u06A9\u06CC\u0641 \u067E\u0648\u0644 \u0634\u0627\u0631\u0698 \u0634\u062F","acc.walletNote":"\u0645\u0648\u062C\u0648\u062F\u06CC \u06A9\u06CC\u0641 \u067E\u0648\u0644 \u0641\u0642\u0637 \u0628\u0631\u0627\u06CC \u062E\u0631\u06CC\u062F \u0627\u0632 \u0647\u0645\u06CC\u0646 \u0641\u0631\u0648\u0634\u06AF\u0627\u0647 \u0627\u0633\u062A \u0648 \u0633\u0648\u062F \u06CC\u0627 \u06A9\u0627\u0631\u0645\u0632\u062F\u06CC \u0628\u0647 \u0622\u0646 \u062A\u0639\u0644\u0642 \u0646\u0645\u06CC\u200C\u06AF\u06CC\u0631\u062F.","acc.tx.deposit":"\u0634\u0627\u0631\u0698","acc.tx.purchase":"\u062E\u0631\u06CC\u062F","acc.tx.refund":"\u0628\u0627\u0632\u06AF\u0634\u062A \u0648\u062C\u0647","acc.tx.adjust_in":"\u0627\u0641\u0632\u0627\u06CC\u0634 \u062A\u0648\u0633\u0637 \u0645\u062F\u06CC\u0631","acc.tx.adjust_out":"\u06A9\u0633\u0631 \u062A\u0648\u0633\u0637 \u0645\u062F\u06CC\u0631","acc.plusInactive":"\u0627\u0634\u062A\u0631\u0627\u06A9 \u067E\u0644\u0627\u0633 \u0646\u062F\u0627\u0631\u06CC","acc.plusActive":"\u067E\u0644\u0627\u0633 \u0641\u0639\u0627\u0644 \u062A\u0627 {date}","acc.plusSubscribe":"\u062E\u0631\u06CC\u062F \u0627\u0634\u062A\u0631\u0627\u06A9 \u067E\u0644\u0627\u0633","acc.plusRenew":"\u062A\u0645\u062F\u06CC\u062F \u0627\u0634\u062A\u0631\u0627\u06A9","acc.plusPrice":"{price} \u062A\u0648\u0645\u0627\u0646 \u0628\u0631\u0627\u06CC {days} \u0631\u0648\u0632","acc.plusPerks":"\u0645\u0632\u0627\u06CC\u0627\u06CC \u0627\u0634\u062A\u0631\u0627\u06A9 \u067E\u0644\u0627\u0633","acc.plusSubscribed":"\u0627\u0634\u062A\u0631\u0627\u06A9 \u067E\u0644\u0627\u0633 \u0641\u0639\u0627\u0644 \u0634\u062F","acc.plusPayWallet":"\u067E\u0631\u062F\u0627\u062E\u062A \u0627\u0632 \u06A9\u06CC\u0641 \u067E\u0648\u0644","acc.plusPayGateway":"\u067E\u0631\u062F\u0627\u062E\u062A \u0622\u0646\u0644\u0627\u06CC\u0646","acc.addAddress":"\u0627\u0641\u0632\u0648\u062F\u0646 \u0622\u062F\u0631\u0633","acc.editAddress":"\u0648\u06CC\u0631\u0627\u06CC\u0634 \u0622\u062F\u0631\u0633","acc.addrTitle":"\u0639\u0646\u0648\u0627\u0646 (\u0645\u062B\u0644\u0627\u064B \u062E\u0627\u0646\u0647\u060C \u0645\u062D\u0644 \u06A9\u0627\u0631)","acc.addrReceiver":"\u0646\u0627\u0645 \u06AF\u06CC\u0631\u0646\u062F\u0647","acc.addrPhone":"\u0634\u0645\u0627\u0631\u0647\u200C\u06CC \u062A\u0645\u0627\u0633 \u06AF\u06CC\u0631\u0646\u062F\u0647","acc.addrStreet":"\u0622\u062F\u0631\u0633 \u06A9\u0627\u0645\u0644 \u067E\u0633\u062A\u06CC","acc.addrDefault":"\u0622\u062F\u0631\u0633 \u067E\u06CC\u0634\u200C\u0641\u0631\u0636","acc.addrNote":"\u062A\u0648\u0636\u06CC\u062D\u0627\u062A \u0628\u0631\u0627\u06CC \u067E\u06CC\u06A9","acc.addrSaved":"\u0622\u062F\u0631\u0633 \u0630\u062E\u06CC\u0631\u0647 \u0634\u062F","acc.addrDeleted":"\u0622\u062F\u0631\u0633 \u062D\u0630\u0641 \u0634\u062F","acc.noAddress":"\u0622\u062F\u0631\u0633\u06CC \u062B\u0628\u062A \u0646\u0634\u062F\u0647 \u0627\u0633\u062A","acc.wishlistEmpty":"\u0644\u06CC\u0633\u062A \u0645\u0646 \u062E\u0627\u0644\u06CC \u0627\u0633\u062A","acc.wishlistEmptyText":"\u0631\u0648\u06CC \u0622\u06CC\u06A9\u0648\u0646 \u0642\u0644\u0628 \u0647\u0631 \u06A9\u0627\u0644\u0627 \u0628\u0632\u0646 \u062A\u0627 \u0627\u06CC\u0646\u062C\u0627 \u0630\u062E\u06CC\u0631\u0647 \u0634\u0648\u062F.","acc.notifEmpty":"\u0627\u0639\u0644\u0627\u0646\u06CC \u0646\u062F\u0627\u0631\u06CC","acc.markAllRead":"\u0647\u0645\u0647 \u062E\u0648\u0627\u0646\u062F\u0647 \u0634\u062F","acc.ticketNew":"\u062A\u06CC\u06A9\u062A \u062C\u062F\u06CC\u062F","acc.ticketSubject":"\u0645\u0648\u0636\u0648\u0639","acc.ticketCategory":"\u062F\u0633\u062A\u0647\u200C\u06CC \u062F\u0631\u062E\u0648\u0627\u0633\u062A","acc.ticketPriority":"\u0627\u0648\u0644\u0648\u06CC\u062A","acc.ticketBody":"\u0634\u0631\u062D \u062F\u0631\u062E\u0648\u0627\u0633\u062A","form.rulesRequired":"\u067E\u0630\u06CC\u0631\u0634 \u0642\u0648\u0627\u0646\u06CC\u0646 \u062A\u06CC\u06A9\u062A \u0644\u0627\u0632\u0645 \u0627\u0633\u062A.","form.termsRequired":"\u067E\u0630\u06CC\u0631\u0634 \u0642\u0648\u0627\u0646\u06CC\u0646 \u0648 \u0645\u0642\u0631\u0631\u0627\u062A \u0644\u0627\u0632\u0645 \u0627\u0633\u062A.","page.statsTitle":"\u0622\u0645\u0627\u0631 \u0632\u0646\u062F\u0647\u200C\u06CC \u0641\u0631\u0648\u0634\u06AF\u0627\u0647","page.aboutCta":"\u0628\u06CC\u0627 \u0628\u0628\u06CC\u0646 \u0686\u0647 \u0686\u06CC\u0632\u0647\u0627\u06CC\u06CC \u0628\u0631\u0627\u06CC\u062A \u062F\u0627\u0631\u06CC\u0645","page.stepsTitle":"\u0645\u0631\u0627\u062D\u0644 \u062E\u0631\u06CC\u062F","page.tipsTitle":"\u0646\u06A9\u062A\u0647\u200C\u0647\u0627\u06CC \u062E\u0631\u06CC\u062F","page.hintsTitle":"\u0628\u0631\u0627\u06CC \u06AF\u0632\u0627\u0631\u0634\u06CC \u062F\u0642\u06CC\u0642\u200C\u062A\u0631","page.bugTitle":"\u06AF\u0632\u0627\u0631\u0634 \u062E\u0637\u0627","page.rulesTitle":"\u0642\u0648\u0627\u0646\u06CC\u0646","faq.all":"\u0647\u0645\u0647\u200C\u06CC \u0645\u0648\u0636\u0648\u0639\u0627\u062A","faq.search":"\u062C\u0633\u062A\u200C\u0648\u062C\u0648 \u062F\u0631 \u0633\u0624\u0627\u0644\u0627\u062A\u2026","faq.results":"{n} \u0633\u0624\u0627\u0644","faq.notFound":"\u0633\u0624\u0627\u0644\u06CC \u0628\u0627 \u0627\u06CC\u0646 \u0639\u0628\u0627\u0631\u062A \u067E\u06CC\u062F\u0627 \u0646\u0634\u062F.","faq.askText":"\u0627\u0632 \u067E\u0634\u062A\u06CC\u0628\u0627\u0646\u06CC \u0622\u0646\u0644\u0627\u06CC\u0646 \u0628\u067E\u0631\u0633 \u06CC\u0627 \u062A\u06CC\u06A9\u062A \u0628\u0632\u0646.","faq.cat.orders":"\u0633\u0641\u0627\u0631\u0634 \u0648 \u067E\u06CC\u06AF\u06CC\u0631\u06CC","faq.cat.shipping":"\u0627\u0631\u0633\u0627\u0644 \u0648 \u062A\u062D\u0648\u06CC\u0644","faq.cat.returns":"\u0645\u0631\u062C\u0648\u0639\u06CC \u0648 \u0628\u0627\u0632\u06AF\u0634\u062A \u0648\u062C\u0647","faq.cat.product":"\u06A9\u0627\u0644\u0627 \u0648 \u0627\u0635\u0627\u0644\u062A","faq.cat.account":"\u062D\u0633\u0627\u0628 \u06A9\u0627\u0631\u0628\u0631\u06CC","faq.cat.security":"\u0627\u0645\u0646\u06CC\u062A \u0648 \u067E\u0631\u062F\u0627\u062E\u062A","faq.cat.store":"\u0641\u0631\u0648\u0634\u06AF\u0627\u0647 \u0648 \u062A\u0645\u0627\u0633","faq.cat.other":"\u0633\u0627\u06CC\u0631","acc.ticketCloseConfirm":"\u062A\u06CC\u06A9\u062A \u0628\u0633\u062A\u0647 \u0634\u0648\u062F\u061F \u0628\u0639\u062F\u0627\u064B \u0628\u0627 \u0627\u0631\u0633\u0627\u0644 \u067E\u06CC\u0627\u0645 \u0645\u06CC\u200C\u062A\u0648\u0627\u0646\u06CC \u0628\u0627\u0632\u0634 \u06AF\u0631\u062F\u0627\u0646\u06CC.","acc.ticketClosedNote":"\u0627\u06CC\u0646 \u062A\u06CC\u06A9\u062A \u0628\u0633\u062A\u0647 \u0634\u062F\u0647 \u0627\u0633\u062A. \u0627\u0631\u0633\u0627\u0644 \u067E\u06CC\u0627\u0645 \u062C\u062F\u06CC\u062F\u060C \u0622\u0646 \u0631\u0627 \u062F\u0648\u0628\u0627\u0631\u0647 \u0628\u0627\u0632 \u0645\u06CC\u200C\u06A9\u0646\u062F.","acc.ticketBodyShort":"\u067E\u06CC\u0627\u0645 \u062E\u06CC\u0644\u06CC \u06A9\u0648\u062A\u0627\u0647 \u0627\u0633\u062A.","acc.attachHint":"\u062A\u0627 \u06F4 \u062A\u0635\u0648\u06CC\u0631\u060C \u0647\u0631 \u06A9\u062F\u0627\u0645 \u06A9\u0645\u062A\u0631 \u0627\u0632 \u06F4 \u0645\u06AF\u0627\u0628\u0627\u06CC\u062A.","err.tooLarge":"\u062D\u062C\u0645 \u0641\u0627\u06CC\u0644 \u0628\u06CC\u0634\u062A\u0631 \u0627\u0632 \u06F4 \u0645\u06AF\u0627\u0628\u0627\u06CC\u062A \u0627\u0633\u062A.","acc.ticketRules":"\u0642\u0648\u0627\u0646\u06CC\u0646 \u062A\u06CC\u06A9\u062A \u0631\u0627 \u062E\u0648\u0627\u0646\u062F\u0647\u200C\u0627\u0645 \u0648 \u0645\u06CC\u200C\u067E\u0630\u06CC\u0631\u0645.","acc.ticketViewRules":"\u0645\u0634\u0627\u0647\u062F\u0647\u200C\u06CC \u0642\u0648\u0627\u0646\u06CC\u0646 \u062A\u06CC\u06A9\u062A","acc.ticketCreated":"\u062A\u06CC\u06A9\u062A \u062B\u0628\u062A \u0634\u062F. \u06A9\u062F \u067E\u06CC\u06AF\u06CC\u0631\u06CC: {code}","acc.ticketWrite":"\u067E\u0627\u0633\u062E \u062E\u0648\u062F \u0631\u0627 \u0628\u0646\u0648\u06CC\u0633\u2026","acc.ticketClose":"\u0628\u0633\u062A\u0646 \u062A\u06CC\u06A9\u062A","acc.ticketReopen":"\u0628\u0627\u0632\u06AF\u0634\u0627\u06CC\u06CC","acc.ticketSla":"\u0632\u0645\u0627\u0646 \u067E\u0627\u0633\u062E\u200C\u06AF\u0648\u06CC\u06CC \u062A\u0642\u0631\u06CC\u0628\u06CC: {h} \u0633\u0627\u0639\u062A","acc.noTickets":"\u062A\u06CC\u06A9\u062A\u06CC \u062B\u0628\u062A \u0646\u06A9\u0631\u062F\u0647\u200C\u0627\u06CC","acc.chatTitle":"\u067E\u0634\u062A\u06CC\u0628\u0627\u0646\u06CC \u0622\u0646\u0644\u0627\u06CC\u0646","acc.chatPlaceholder":"\u067E\u06CC\u0627\u0645 \u062E\u0648\u062F \u0631\u0627 \u0628\u0646\u0648\u06CC\u0633\u2026","acc.chatWelcome":"\u0633\u0644\u0627\u0645! \u0633\u0624\u0627\u0644 \u06CC\u0627 \u0645\u0634\u06A9\u0644\u06CC \u062F\u0627\u0631\u06CC\u061F \u0647\u0645\u06CC\u0646\u200C\u062C\u0627 \u0628\u0646\u0648\u06CC\u0633 \u062A\u0627 \u067E\u0627\u0633\u062E \u062F\u0647\u06CC\u0645.","acc.chatOffline":"\u0627\u0644\u0627\u0646 \u062E\u0627\u0631\u062C \u0627\u0632 \u0633\u0627\u0639\u062A \u06A9\u0627\u0631\u06CC \u0647\u0633\u062A\u06CC\u0645\u061B \u067E\u06CC\u0627\u0645 \u0628\u06AF\u0630\u0627\u0631 \u062A\u0627 \u0627\u0648\u0644 \u0648\u0642\u062A \u067E\u0627\u0633\u062E \u062F\u0647\u06CC\u0645\u060C \u06CC\u0627 \u062A\u06CC\u06A9\u062A \u0628\u0632\u0646.","acc.chatOpenTicket":"\u062B\u0628\u062A \u062A\u06CC\u06A9\u062A","acc.reviewEmpty":"\u0646\u0638\u0631 \u06CC\u0627 \u0633\u0624\u0627\u0644\u06CC \u062B\u0628\u062A \u0646\u06A9\u0631\u062F\u0647\u200C\u0627\u06CC","acc.feedbackNew":"\u0627\u0631\u0633\u0627\u0644 \u067E\u06CC\u0634\u0646\u0647\u0627\u062F\u060C \u0634\u06A9\u0627\u06CC\u062A \u06CC\u0627 \u06AF\u0632\u0627\u0631\u0634 \u062E\u0637\u0627","acc.feedbackType":"\u0646\u0648\u0639 \u067E\u06CC\u0627\u0645","acc.feedbackContact":"\u0631\u0627\u0647 \u0627\u0631\u062A\u0628\u0627\u0637\u06CC (\u0627\u06CC\u0645\u06CC\u0644 \u06CC\u0627 \u0645\u0648\u0628\u0627\u06CC\u0644)","acc.feedbackContactHint":"\u062F\u0631 \u0635\u0648\u0631\u062A \u062B\u0628\u062A\u060C \u0646\u062A\u06CC\u062C\u0647 \u0631\u0627 \u0628\u0647 \u0627\u0637\u0644\u0627\u0639 \u062A\u0648 \u0645\u06CC\u200C\u0631\u0633\u0627\u0646\u06CC\u0645.","acc.feedbackSent":"\u067E\u06CC\u0627\u0645 \u062A\u0648 \u062B\u0628\u062A \u0634\u062F. \u0645\u0645\u0646\u0648\u0646 \u06A9\u0647 \u0628\u0647 \u0628\u0647\u062A\u0631 \u0634\u062F\u0646 \u0633\u0627\u06CC\u062A \u06A9\u0645\u06A9 \u0645\u06CC\u200C\u06A9\u0646\u06CC.","acc.noFeedback":"\u067E\u06CC\u0627\u0645\u06CC \u0627\u0631\u0633\u0627\u0644 \u0646\u06A9\u0631\u062F\u0647\u200C\u0627\u06CC","acc.profileSaved":"\u067E\u0631\u0648\u0641\u0627\u06CC\u0644 \u0630\u062E\u06CC\u0631\u0647 \u0634\u062F","acc.passwordChange":"\u062A\u063A\u06CC\u06CC\u0631 \u0631\u0645\u0632 \u0639\u0628\u0648\u0631","acc.currentPassword":"\u0631\u0645\u0632 \u0639\u0628\u0648\u0631 \u0641\u0639\u0644\u06CC","acc.newPassword2":"\u0631\u0645\u0632 \u0639\u0628\u0648\u0631 \u062C\u062F\u06CC\u062F","acc.passwordChanged":"\u0631\u0645\u0632 \u0639\u0628\u0648\u0631 \u062A\u063A\u06CC\u06CC\u0631 \u06A9\u0631\u062F","acc.2faSection":"\u0648\u0631\u0648\u062F \u062F\u0648\u0645\u0631\u062D\u0644\u0647\u200C\u0627\u06CC (2FA)","acc.2faOff":"\u063A\u06CC\u0631\u0641\u0639\u0627\u0644 \u2014 \u0628\u0631\u0627\u06CC \u0627\u0645\u0646\u06CC\u062A \u0628\u06CC\u0634\u062A\u0631 \u0631\u0648\u0634\u0646\u0634 \u06A9\u0646.","acc.2faOn":"\u0641\u0639\u0627\u0644","acc.2faEnable":"\u0641\u0639\u0627\u0644\u200C\u0633\u0627\u0632\u06CC \u0648\u0631\u0648\u062F \u062F\u0648\u0645\u0631\u062D\u0644\u0647\u200C\u0627\u06CC","acc.2faDisable":"\u063A\u06CC\u0631\u0641\u0639\u0627\u0644\u200C\u0633\u0627\u0632\u06CC","acc.2faScan":"\u0627\u06CC\u0646 \u06A9\u062F QR \u0631\u0627 \u0628\u0627 \u0627\u067E \u0627\u062D\u0631\u0627\u0632 \u0647\u0648\u06CC\u062A (\u0645\u062B\u0644 Google Authenticator) \u0627\u0633\u06A9\u0646 \u06A9\u0646 \u06CC\u0627 \u06A9\u0644\u06CC\u062F \u0631\u0627 \u062F\u0633\u062A\u06CC \u0648\u0627\u0631\u062F \u06A9\u0646.","acc.2faKey":"\u06A9\u0644\u06CC\u062F \u062F\u0633\u062A\u06CC","acc.2faEnterCode":"\u06A9\u062F \u06F6 \u0631\u0642\u0645\u06CC \u0627\u067E \u0631\u0627 \u0648\u0627\u0631\u062F \u06A9\u0646 \u062A\u0627 \u0641\u0639\u0627\u0644 \u0634\u0648\u062F","acc.2faEnabled":"\u0648\u0631\u0648\u062F \u062F\u0648\u0645\u0631\u062D\u0644\u0647\u200C\u0627\u06CC \u0641\u0639\u0627\u0644 \u0634\u062F","acc.2faDisabled":"\u0648\u0631\u0648\u062F \u062F\u0648\u0645\u0631\u062D\u0644\u0647\u200C\u0627\u06CC \u063A\u06CC\u0631\u0641\u0639\u0627\u0644 \u0634\u062F","acc.2faBackup":"\u06A9\u062F\u0647\u0627\u06CC \u067E\u0634\u062A\u06CC\u0628\u0627\u0646 (\u0646\u06AF\u0647\u0634\u0627\u0646 \u062F\u0627\u0631)","acc.2faBackupHint":"\u0627\u06AF\u0631 \u062F\u0633\u062A\u0631\u0633\u06CC \u0628\u0647 \u0627\u067E \u0631\u0627 \u0627\u0632 \u062F\u0633\u062A \u062F\u0627\u062F\u06CC\u060C \u0628\u0627 \u0627\u06CC\u0646 \u06A9\u062F\u0647\u0627 \u0648\u0627\u0631\u062F \u0634\u0648. \u0647\u0631 \u06A9\u062F \u0641\u0642\u0637 \u06CC\u06A9\u200C\u0628\u0627\u0631 \u0645\u0635\u0631\u0641 \u0627\u0633\u062A.","acc.2faMethods":"\u0631\u0648\u0634\u200C\u0647\u0627\u06CC \u062A\u0623\u06CC\u06CC\u062F","acc.sessionsText":"\u062F\u0633\u062A\u06AF\u0627\u0647\u200C\u0647\u0627\u06CC\u06CC \u06A9\u0647 \u0627\u06A9\u0646\u0648\u0646 \u0628\u0647 \u062D\u0633\u0627\u0628 \u062A\u0648 \u0648\u0627\u0631\u062F \u0647\u0633\u062A\u0646\u062F.","acc.revokeAll":"\u062E\u0631\u0648\u062C \u0627\u0632 \u0647\u0645\u0647\u200C\u06CC \u062F\u0633\u062A\u06AF\u0627\u0647\u200C\u0647\u0627","acc.revokeDone":"\u0646\u0634\u0633\u062A\u200C\u0647\u0627 \u0628\u0633\u062A\u0647 \u0634\u062F\u0646\u062F","acc.current":"\u0647\u0645\u06CC\u0646 \u062F\u0633\u062A\u06AF\u0627\u0647","acc.prefsText":"\u0627\u06CC\u0646 \u062A\u0646\u0638\u06CC\u0645\u0627\u062A \u0641\u0642\u0637 \u0631\u0648\u06CC \u0647\u0645\u06CC\u0646 \u062F\u0633\u062A\u06AF\u0627\u0647 \u0627\u0639\u0645\u0627\u0644 \u0645\u06CC\u200C\u0634\u0648\u062F.","acc.prefTheme":"\u067E\u0648\u0633\u062A\u0647","acc.prefLang":"\u0632\u0628\u0627\u0646","acc.prefDensity":"\u062A\u0631\u0627\u06A9\u0645 \u0646\u0645\u0627\u06CC\u0634","acc.prefMotion":"\u0627\u0646\u06CC\u0645\u06CC\u0634\u0646\u200C\u0647\u0627","acc.prefNotif":"\u0627\u0639\u0644\u0627\u0646\u200C\u0647\u0627","acc.notifMarketing":"\u062A\u062E\u0641\u06CC\u0641\u200C\u0647\u0627 \u0648 \u067E\u06CC\u0634\u0646\u0647\u0627\u062F\u0647\u0627","acc.notifOrders":"\u0648\u0636\u0639\u06CC\u062A \u0633\u0641\u0627\u0631\u0634\u200C\u0647\u0627","acc.notifRestock":"\u0645\u0648\u062C\u0648\u062F \u0634\u062F\u0646 \u06A9\u0627\u0644\u0627\u0647\u0627\u06CC \u0644\u06CC\u0633\u062A \u0645\u0646","acc.notifSupport":"\u067E\u0634\u062A\u06CC\u0628\u0627\u0646\u06CC \u0648 \u067E\u0627\u0633\u062E \u062A\u06CC\u06A9\u062A\u200C\u0647\u0627","acc.exportData":"\u062F\u0631\u06CC\u0627\u0641\u062A \u062F\u0627\u062F\u0647\u200C\u0647\u0627\u06CC \u0645\u0646","acc.exportHint":"\u0647\u0645\u0647\u200C\u06CC \u0627\u0637\u0644\u0627\u0639\u0627\u062A \u062D\u0633\u0627\u0628\u060C \u0633\u0641\u0627\u0631\u0634\u200C\u0647\u0627\u060C \u0646\u0638\u0631\u0627\u062A \u0648 \u062A\u06CC\u06A9\u062A\u200C\u0647\u0627 \u0631\u0627 \u0628\u0647\u200C\u0635\u0648\u0631\u062A JSON \u062F\u0627\u0646\u0644\u0648\u062F \u06A9\u0646.","acc.deleteAccount":"\u062D\u0630\u0641 \u062D\u0633\u0627\u0628 \u06A9\u0627\u0631\u0628\u0631\u06CC","acc.deleteWarn":"\u0628\u0627 \u062D\u0630\u0641 \u062D\u0633\u0627\u0628\u060C \u062F\u0627\u062F\u0647\u200C\u0647\u0627\u06CC \u0634\u062E\u0635\u06CC \u067E\u0627\u06A9 \u0645\u06CC\u200C\u0634\u0648\u062F\u061B \u0633\u0648\u0627\u0628\u062F \u0645\u0627\u0644\u06CC \u0633\u0641\u0627\u0631\u0634\u200C\u0647\u0627 \u0637\u0628\u0642 \u0642\u0627\u0646\u0648\u0646 \u0646\u06AF\u0647 \u062F\u0627\u0634\u062A\u0647 \u0645\u06CC\u200C\u0634\u0648\u062F.","acc.deleteConfirm":"\u0628\u0631\u0627\u06CC \u062D\u0630\u0641 \u062D\u0633\u0627\u0628\u060C \u0631\u0645\u0632 \u0639\u0628\u0648\u0631 \u0631\u0627 \u0648\u0627\u0631\u062F \u06A9\u0646","acc.pointsText":"\u0628\u0647 \u0627\u0632\u0627\u06CC \u0647\u0631 \u06F1\u06F0\u06F0\u066C\u06F0\u06F0\u06F0 \u062A\u0648\u0645\u0627\u0646 \u062E\u0631\u06CC\u062F\u060C \u06F1 \u0627\u0645\u062A\u06CC\u0627\u0632 \u0645\u06CC\u200C\u06AF\u06CC\u0631\u06CC.","acc.referralCode":"\u06A9\u062F \u0645\u0639\u0631\u0641 \u062A\u0648","acc.referralText":"\u0627\u06CC\u0646 \u06A9\u062F \u0631\u0627 \u0628\u0647 \u0627\u0634\u062A\u0631\u0627\u06A9 \u0628\u06AF\u0630\u0627\u0631\u061B \u0647\u0631 \u062F\u0648 \u06F5\u06F0 \u0627\u0645\u062A\u06CC\u0627\u0632 \u0645\u06CC\u200C\u06AF\u06CC\u0631\u06CC\u062F.","chat.title":"\u067E\u0634\u062A\u06CC\u0628\u0627\u0646\u06CC \u0622\u0646\u0644\u0627\u06CC\u0646 \u06CC\u0627\u0633\u0627\u06CC\u06CC","chat.online":"\u0645\u0639\u0645\u0648\u0644\u0627\u064B \u062F\u0631 \u0686\u0646\u062F \u062F\u0642\u06CC\u0642\u0647 \u067E\u0627\u0633\u062E \u0645\u06CC\u200C\u062F\u0647\u06CC\u0645","chat.open":"\u0634\u0631\u0648\u0639 \u06AF\u0641\u062A\u200C\u0648\u06AF\u0648","chat.minimize":"\u0628\u0633\u062A\u0646","chat.loginFirst":"\u0628\u0631\u0627\u06CC \u06AF\u0641\u062A\u200C\u0648\u06AF\u0648 \u0628\u0627 \u067E\u0634\u062A\u06CC\u0628\u0627\u0646\u06CC \u0648\u0627\u0631\u062F \u062D\u0633\u0627\u0628 \u0634\u0648.","chat.sent":"\u067E\u06CC\u0627\u0645 \u0627\u0631\u0633\u0627\u0644 \u0634\u062F","chat.typing":"\u067E\u0634\u062A\u06CC\u0628\u0627\u0646\u06CC \u062F\u0631 \u062D\u0627\u0644 \u0646\u0648\u0634\u062A\u0646\u2026","chat.quick":"\u0633\u0624\u0627\u0644\u0627\u062A \u067E\u0631\u062A\u06A9\u0631\u0627\u0631","notif.new":"\u0627\u0639\u0644\u0627\u0646 \u062C\u062F\u06CC\u062F","notif.markRead":"\u062E\u0648\u0627\u0646\u062F\u0647 \u0634\u062F","notif.viewAll":"\u0645\u0634\u0627\u0647\u062F\u0647\u200C\u06CC \u0647\u0645\u0647\u200C\u06CC \u0627\u0639\u0644\u0627\u0646\u200C\u0647\u0627","notif.empty":"\u0627\u0639\u0644\u0627\u0646\u06CC \u0646\u062F\u0627\u0631\u06CC","notif.type.announcement":"\u0627\u0637\u0644\u0627\u0639\u06CC\u0647","notif.type.order":"\u0633\u0641\u0627\u0631\u0634","notif.type.restock":"\u0645\u0648\u062C\u0648\u062F \u0634\u062F\u0646 \u06A9\u0627\u0644\u0627","notif.type.ticket":"\u062A\u06CC\u06A9\u062A","notif.type.support":"\u067E\u0634\u062A\u06CC\u0628\u0627\u0646\u06CC","notif.type.review":"\u0646\u0638\u0631","notif.type.plus":"\u0627\u0634\u062A\u0631\u0627\u06A9 \u067E\u0644\u0627\u0633","notif.type.wallet":"\u06A9\u06CC\u0641 \u067E\u0648\u0644","notif.type.account":"\u062D\u0633\u0627\u0628 \u06A9\u0627\u0631\u0628\u0631\u06CC","notif.type.feedback":"\u0628\u0627\u0632\u062E\u0648\u0631\u062F","notif.type.admin_alert":"\u0647\u0634\u062F\u0627\u0631 \u0645\u062F\u06CC\u0631","notif.type.news":"\u062E\u0628\u0631","notif.type.offer":"\u067E\u06CC\u0634\u0646\u0647\u0627\u062F \u0648\u06CC\u0698\u0647","notif.type.system":"\u0633\u0627\u0645\u0627\u0646\u0647","notif.type.info":"\u0627\u0637\u0644\u0627\u0639\u200C\u0631\u0633\u0627\u0646\u06CC","notif.type.welcome":"\u062E\u0648\u0634\u200C\u0622\u0645\u062F\u06AF\u0648\u06CC\u06CC","consent.title":"\u0628\u0647 \u06CC\u0627\u0633\u0627\u06CC\u06CC \u062E\u0648\u0634 \u0622\u0645\u062F\u06CC","consent.text":"\u0644\u0637\u0641\u0627\u064B \u067E\u06CC\u0634 \u0627\u0632 \u0627\u062F\u0627\u0645\u0647\u060C \u0645\u0648\u0627\u0631\u062F \u0632\u06CC\u0631 \u0631\u0627 \u0628\u062E\u0648\u0627\u0646 \u0648 \u0628\u067E\u0630\u06CC\u0631. \u0645\u0627 \u0627\u0632 \u062D\u0627\u0641\u0638\u0647\u200C\u06CC \u0645\u0631\u0648\u0631\u06AF\u0631 \u0628\u0631\u0627\u06CC \u0628\u0647\u062A\u0631 \u06A9\u0631\u062F\u0646 \u062A\u062C\u0631\u0628\u0647\u200C\u06CC \u062E\u0631\u06CC\u062F \u0627\u0633\u062A\u0641\u0627\u062F\u0647 \u0645\u06CC\u200C\u06A9\u0646\u06CC\u0645 \u0648 \u0637\u0628\u0642 \u062D\u0631\u06CC\u0645 \u062E\u0635\u0648\u0635\u06CC\u060C \u0645\u0631\u0627\u0642\u0628 \u062F\u0627\u062F\u0647\u200C\u0647\u0627\u06CC \u0634\u062E\u0635\u06CC \u062A\u0648 \u0647\u0633\u062A\u06CC\u0645.","consent.terms":"\u0642\u0648\u0627\u0646\u06CC\u0646 \u0648 \u0645\u0642\u0631\u0631\u0627\u062A \u0631\u0627 \u062E\u0648\u0627\u0646\u062F\u0647\u200C\u0627\u0645 \u0648 \u0645\u06CC\u200C\u067E\u0630\u06CC\u0631\u0645.","consent.privacy":"\u062D\u0631\u06CC\u0645 \u062E\u0635\u0648\u0635\u06CC \u0631\u0627 \u0645\u06CC\u200C\u067E\u0630\u06CC\u0631\u0645.","consent.marketing":"\u062F\u0648\u0633\u062A \u062F\u0627\u0631\u0645 \u0627\u0632 \u062A\u062E\u0641\u06CC\u0641\u200C\u0647\u0627 \u0648 \u06A9\u0627\u0644\u0627\u0647\u0627\u06CC \u062C\u062F\u06CC\u062F \u0628\u0627\u062E\u0628\u0631 \u0634\u0648\u0645 (\u0627\u062E\u062A\u06CC\u0627\u0631\u06CC).","consent.accept":"\u0645\u06CC\u200C\u067E\u0630\u06CC\u0631\u0645 \u0648 \u0648\u0627\u0631\u062F \u0633\u0627\u06CC\u062A \u0645\u06CC\u200C\u0634\u0648\u0645","consent.readTerms":"\u062E\u0648\u0627\u0646\u062F\u0646 \u0642\u0648\u0627\u0646\u06CC\u0646","consent.readPrivacy":"\u062E\u0648\u0627\u0646\u062F\u0646 \u062D\u0631\u06CC\u0645 \u062E\u0635\u0648\u0635\u06CC","consent.thanks":"\u0645\u0645\u0646\u0648\u0646! \u067E\u0630\u06CC\u0631\u0634 \u062A\u0648 \u062B\u0628\u062A \u0634\u062F.","consent.manage":"\u0645\u062F\u06CC\u0631\u06CC\u062A \u062A\u0648\u0627\u0641\u0642 \u06A9\u0648\u06A9\u06CC \u0648 \u062D\u0631\u06CC\u0645 \u062E\u0635\u0648\u0635\u06CC","social.instagram":"\u0627\u06CC\u0646\u0633\u062A\u0627\u06AF\u0631\u0627\u0645","home.partnersTitle":"\u0628\u0631\u0646\u062F\u0647\u0627\u06CC\u06CC \u06A9\u0647 \u0628\u0627 \u0622\u0646\u200C\u0647\u0627 \u06A9\u0627\u0631 \u0645\u06CC\u200C\u06A9\u0646\u06CC\u0645","stats.subtitle":"\u0639\u062F\u062F\u0647\u0627\u06CC \u0648\u0627\u0642\u0639\u06CC \u0641\u0631\u0648\u0634\u06AF\u0627\u0647\u060C \u0628\u0647\u200C\u0631\u0648\u0632 \u0648 \u0628\u062F\u0648\u0646 \u067E\u0631\u062F\u0647.","stats.chartHint":"\u0627\u0631\u062A\u0641\u0627\u0639 \u0647\u0631 \u0633\u062A\u0648\u0646 \u06CC\u0639\u0646\u06CC \u062A\u0639\u062F\u0627\u062F \u0628\u0627\u0632\u062F\u06CC\u062F \u0647\u0645\u0627\u0646 \u0631\u0648\u0632.","stats.topTitle":"\u067E\u0631\u0641\u0631\u0648\u0634\u200C\u0647\u0627\u06CC \u0627\u062E\u06CC\u0631","adm.sPartners":"\u0628\u0631\u0646\u062F\u0647\u0627 \u0648 \u0634\u0631\u06A9\u0627","adm.ptFa":"\u0646\u0627\u0645 \u0641\u0627\u0631\u0633\u06CC","adm.ptEn":"Name (EN)","adm.ptAdd":"\u0627\u0641\u0632\u0648\u062F\u0646 \u0628\u0631\u0646\u062F","adm.ptHint":"\u0627\u06CC\u0646 \u0646\u0627\u0645\u200C\u0647\u0627 \u0628\u0647\u200C\u0635\u0648\u0631\u062A \u0646\u0648\u0627\u0631 \u0645\u062A\u062D\u0631\u06A9 \u062F\u0631 \u0635\u0641\u062D\u0647\u0654 \u0627\u0635\u0644\u06CC \u0646\u0645\u0627\u06CC\u0634 \u062F\u0627\u062F\u0647 \u0645\u06CC\u200C\u0634\u0648\u0646\u062F\u061B \u062A\u0631\u062A\u06CC\u0628 \u0631\u0627 \u062E\u0648\u062F\u062A \u0628\u0686\u06CC\u0646.","feat.partners":"\u0646\u0648\u0627\u0631 \u0628\u0631\u0646\u062F\u0647\u0627\u06CC \u0647\u0645\u06A9\u0627\u0631","auth.pwdLater":"\u0628\u0639\u062F\u0627\u064B \u062A\u063A\u06CC\u06CC\u0631 \u0645\u06CC\u200C\u062F\u0647\u0645","auth.pwdLaterToast":"\u0628\u0627\u0634\u0647\u061B \u0647\u0631 \u0648\u0642\u062A \u062E\u0648\u0627\u0633\u062A\u06CC \u0627\u0632 \xAB\u062D\u0633\u0627\u0628 \u0645\u0646 \u2192 \u062A\u063A\u06CC\u06CC\u0631 \u0631\u0645\u0632 \u0639\u0628\u0648\u0631\xBB \u0627\u0646\u062C\u0627\u0645\u0634 \u0628\u062F\u0647.","social.telegram":"\u062A\u0644\u06AF\u0631\u0627\u0645","social.eitaa":"\u0627\u06CC\u062A\u0627","social.whatsapp":"\u0648\u0627\u062A\u0633\u0627\u067E","consent.rejectOptional":"\u067E\u0630\u06CC\u0631\u0634 \u0641\u0642\u0637 \u0645\u0648\u0627\u0631\u062F \u0636\u0631\u0648\u0631\u06CC","consent.ttlNote":"\u0627\u0646\u062A\u062E\u0627\u0628 \u062A\u0648 \u062A\u0627 \u06F1\u06F8\u06F0 \u0631\u0648\u0632 \u0645\u0639\u062A\u0628\u0631 \u0627\u0633\u062A \u0648 \u067E\u0633 \u0627\u0632 \u0622\u0646 \u062F\u0648\u0628\u0627\u0631\u0647 \u067E\u0631\u0633\u06CC\u062F\u0647 \u0645\u06CC\u200C\u0634\u0648\u062F.","contact.title":"\u062A\u0645\u0627\u0633 \u0628\u0627 \u0645\u0627","contact.mapTitle":"\u06A9\u0631\u0648\u06A9\u06CC \u0645\u062D\u0644 \u0641\u0631\u0648\u0634\u06AF\u0627\u0647","contact.mapHint":"\u0628\u0631\u0627\u06CC \u0628\u0627\u0632 \u0634\u062F\u0646 \u062F\u0631 \u0628\u0631\u0646\u0627\u0645\u0647\u200C\u06CC \u0646\u0642\u0634\u0647 \u06A9\u0644\u06CC\u06A9 \u06A9\u0646","contact.mapAsk":"\u06A9\u062F\u0627\u0645 \u0646\u0642\u0634\u0647 \u0628\u0627\u0632 \u0634\u0648\u062F\u061F","contact.mapPermission":"\u0627\u06AF\u0631 \u0627\u062C\u0627\u0632\u0647\u200C\u06CC \u0645\u0648\u0642\u0639\u06CC\u062A \u0628\u062F\u0647\u06CC\u060C \u0645\u0633\u06CC\u0631 \u062D\u0631\u06A9\u062A \u0627\u0632 \u062C\u0627\u06CC \u0641\u0639\u0644\u06CC\u200C\u0627\u062A \u062A\u0627 \u0645\u063A\u0627\u0632\u0647 \u0631\u0627 \u0646\u0634\u0627\u0646 \u0645\u06CC\u200C\u062F\u0647\u06CC\u0645.","contact.allowLocation":"\u0627\u062C\u0627\u0632\u0647\u200C\u06CC \u062F\u0633\u062A\u0631\u0633\u06CC \u0628\u0647 \u0645\u0648\u0642\u0639\u06CC\u062A","contact.denyLocation":"\u0627\u062F\u0627\u0645\u0647 \u0628\u062F\u0648\u0646 \u0645\u0648\u0642\u0639\u06CC\u062A","contact.openMaps":"\u0628\u0627\u0632 \u06A9\u0631\u062F\u0646 \u062F\u0631 \u0646\u0642\u0634\u0647","contact.copyAddress":"\u06A9\u067E\u06CC \u0622\u062F\u0631\u0633","contact.hours":"\u0633\u0627\u0639\u062A \u06A9\u0627\u0631\u06CC","contact.phone":"\u062A\u0644\u0641\u0646 \u0641\u0631\u0648\u0634\u06AF\u0627\u0647","contact.mobile":"\u0645\u0648\u0628\u0627\u06CC\u0644 \u0648 \u0648\u0627\u062A\u0633\u0627\u067E","contact.emailUs":"\u0627\u06CC\u0645\u06CC\u0644","contact.addressUs":"\u0622\u062F\u0631\u0633","contact.callNow":"\u062A\u0645\u0627\u0633 \u0628\u06AF\u06CC\u0631","contact.whatsapp":"\u067E\u06CC\u0627\u0645 \u062F\u0631 \u0648\u0627\u062A\u0633\u0627\u067E","contact.locationOn":"\u0645\u0648\u0642\u0639\u06CC\u062A \u062A\u0642\u0631\u06CC\u0628\u06CC \u062A\u0648 \u067E\u06CC\u062F\u0627 \u0634\u062F","contact.locationDenied":"\u062F\u0633\u062A\u0631\u0633\u06CC \u0628\u0647 \u0645\u0648\u0642\u0639\u06CC\u062A \u062F\u0627\u062F\u0647 \u0646\u0634\u062F\u061B \u0646\u0642\u0634\u0647 \u0628\u062F\u0648\u0646 \u0645\u0628\u062F\u0623 \u0628\u0627\u0632 \u0645\u06CC\u200C\u0634\u0648\u062F.","contact.formTitle":"\u0627\u0631\u0633\u0627\u0644 \u067E\u06CC\u0627\u0645 \u0633\u0631\u06CC\u0639","contact.formText":"\u062A\u0645\u0627\u0633 \u06AF\u0631\u0641\u062A\u0646 \u0631\u0627 \u062F\u0648\u0633\u062A \u0646\u062F\u0627\u0631\u06CC\u061F \u067E\u06CC\u0627\u0645 \u0628\u06AF\u0630\u0627\u0631 \u06CC\u0627 \u062A\u06CC\u06A9\u062A \u0628\u0632\u0646.","contact.neshan":"\u0646\u0634\u0627\u0646","contact.balad":"\u0628\u0644\u062F","contact.google":"\u06AF\u0648\u06AF\u0644 \u0645\u067E","contact.osm":"\u0627\u0648\u067E\u0646\u200C\u0627\u0633\u062A\u0631\u06CC\u062A\u200C\u0645\u067E","contact.tgBotTitle":"\u0631\u0628\u0627\u062A \u067E\u0634\u062A\u06CC\u0628\u0627\u0646\u06CC \u062A\u0644\u06AF\u0631\u0627\u0645","contact.tgBotText":"\u067E\u06CC\u06AF\u06CC\u0631\u06CC \u0633\u0641\u0627\u0631\u0634\u060C \u062C\u0633\u062A\u062C\u0648\u06CC \u06A9\u0627\u0644\u0627 \u0648 \u06AF\u0641\u062A\u200C\u0648\u06AF\u0648 \u0628\u0627 \u067E\u0634\u062A\u06CC\u0628\u0627\u0646\u06CC \u2014 \u0634\u0628\u0627\u0646\u0647\u200C\u0631\u0648\u0632 \u062F\u0631 \u062A\u0644\u06AF\u0631\u0627\u0645. \u06A9\u0627\u0641\u06CC \u0627\u0633\u062A /start \u0628\u0632\u0646\u06CC.","contact.tgBotBtn":"\u0628\u0627\u0632 \u06A9\u0631\u062F\u0646 \u0631\u0628\u0627\u062A \u062F\u0631 \u062A\u0644\u06AF\u0631\u0627\u0645","compare.title":"\u0645\u0642\u0627\u06CC\u0633\u0647\u200C\u06CC \u06A9\u0627\u0644\u0627\u0647\u0627","compare.empty":"\u06A9\u0627\u0644\u0627\u06CC\u06CC \u0628\u0631\u0627\u06CC \u0645\u0642\u0627\u06CC\u0633\u0647 \u0627\u0646\u062A\u062E\u0627\u0628 \u0646\u0634\u062F\u0647","compare.emptyText":"\u0627\u0632 \u062F\u06A9\u0645\u0647\u200C\u06CC \u0645\u0642\u0627\u06CC\u0633\u0647 \u0631\u0648\u06CC \u06A9\u0627\u0631\u062A \u06A9\u0627\u0644\u0627 \u0627\u0633\u062A\u0641\u0627\u062F\u0647 \u06A9\u0646 (\u062A\u0627 \u06F4 \u06A9\u0627\u0644\u0627).","compare.add":"\u0627\u0641\u0632\u0648\u062F\u0646 \u0628\u0647 \u0645\u0642\u0627\u06CC\u0633\u0647","compare.remove":"\u062D\u0630\u0641","priceCheck.title":"\u0627\u0633\u062A\u0639\u0644\u0627\u0645 \u0642\u06CC\u0645\u062A \u0628\u0627 \u0628\u0627\u0631\u06A9\u062F","priceCheck.sub":"\u0628\u0627\u0631\u06A9\u062F \u0631\u0627 \u0628\u0627 \u062F\u0633\u062A\u06AF\u0627\u0647 \u0627\u0633\u06A9\u0646 \u06A9\u0646 \u06CC\u0627 \u062F\u0633\u062A\u06CC \u0648\u0627\u0631\u062F \u06A9\u0646.","priceCheck.input":"\u0628\u0627\u0631\u06A9\u062F \u06CC\u0627 \u06A9\u062F \u06A9\u0627\u0644\u0627","priceCheck.scanCamera":"\u0627\u0633\u06A9\u0646 \u0628\u0627 \u062F\u0648\u0631\u0628\u06CC\u0646","priceCheck.stopCamera":"\u062A\u0648\u0642\u0641 \u062F\u0648\u0631\u0628\u06CC\u0646","priceCheck.waiting":"\u062F\u0631 \u0627\u0646\u062A\u0638\u0627\u0631 \u0627\u0633\u06A9\u0646\u2026","priceCheck.notFound":"\u06A9\u0627\u0644\u0627\u06CC\u06CC \u0628\u0627 \u0627\u06CC\u0646 \u0628\u0627\u0631\u06A9\u062F \u067E\u06CC\u062F\u0627 \u0646\u0634\u062F","priceCheck.found":"\u06A9\u0627\u0644\u0627 \u067E\u06CC\u062F\u0627 \u0634\u062F","priceCheck.cameraUnsupported":"\u062F\u0648\u0631\u0628\u06CC\u0646 \u062F\u0631 \u062F\u0633\u062A\u0631\u0633 \u0646\u06CC\u0633\u062A. \u0627\u0632 \u062F\u0633\u062A\u06AF\u0627\u0647 \u0628\u0627\u0631\u06A9\u062F\u062E\u0648\u0627\u0646 \u06CC\u0627 \u0648\u0631\u0648\u062F \u062F\u0633\u062A\u06CC \u0627\u0633\u062A\u0641\u0627\u062F\u0647 \u06A9\u0646.","priceCheck.cameraDenied":"\u062F\u0633\u062A\u0631\u0633\u06CC \u0628\u0647 \u062F\u0648\u0631\u0628\u06CC\u0646 \u062F\u0627\u062F\u0647 \u0646\u0634\u062F.","priceCheck.deviceMode":"\u062D\u0627\u0644\u062A \u06A9\u06CC\u0648\u0633\u06A9 (\u062A\u0645\u0627\u0645\u200C\u0635\u0641\u062D\u0647)","priceCheck.lastScan":"\u0622\u062E\u0631\u06CC\u0646 \u0627\u0633\u06A9\u0646","priceCheck.fullscreen":"\u062A\u0645\u0627\u0645\u200C\u0635\u0641\u062D\u0647","err.generic":"\u0645\u0634\u06A9\u0644\u06CC \u067E\u06CC\u0634 \u0622\u0645\u062F. \u062F\u0648\u0628\u0627\u0631\u0647 \u062A\u0644\u0627\u0634 \u06A9\u0646.","err.network":"\u0627\u062A\u0635\u0627\u0644 \u0628\u0647 \u0633\u0631\u0648\u0631 \u0628\u0631\u0642\u0631\u0627\u0631 \u0646\u0634\u062F.","err.notFound":"\u0635\u0641\u062D\u0647 \u067E\u06CC\u062F\u0627 \u0646\u0634\u062F","err.notFoundText":"\u0645\u0645\u06A9\u0646 \u0627\u0633\u062A \u0646\u0634\u0627\u0646\u06CC \u0627\u0634\u062A\u0628\u0627\u0647 \u0628\u0627\u0634\u062F \u06CC\u0627 \u0635\u0641\u062D\u0647 \u062D\u0630\u0641 \u0634\u062F\u0647 \u0628\u0627\u0634\u062F.","err.goHome":"\u0628\u0631\u0648 \u0628\u0647 \u0635\u0641\u062D\u0647\u200C\u06CC \u0627\u0635\u0644\u06CC","err.offline":"\u0622\u0641\u0644\u0627\u06CC\u0646 \u0647\u0633\u062A\u06CC. \u062F\u0627\u062F\u0647\u200C\u0647\u0627\u06CC \u0630\u062E\u06CC\u0631\u0647\u200C\u0634\u062F\u0647 \u0646\u0645\u0627\u06CC\u0634 \u062F\u0627\u062F\u0647 \u0645\u06CC\u200C\u0634\u0648\u062F.","err.online":"\u062F\u0648\u0628\u0627\u0631\u0647 \u0622\u0646\u0644\u0627\u06CC\u0646 \u0634\u062F\u06CC","err.loginRequired":"\u0628\u0631\u0627\u06CC \u062F\u06CC\u062F\u0646 \u0627\u06CC\u0646 \u0628\u062E\u0634 \u0628\u0627\u06CC\u062F \u0648\u0627\u0631\u062F \u062D\u0633\u0627\u0628 \u0634\u0648\u06CC.","err.forbidden":"\u0628\u0647 \u0627\u06CC\u0646 \u0628\u062E\u0634 \u062F\u0633\u062A\u0631\u0633\u06CC \u0646\u062F\u0627\u0631\u06CC.","adm.title":"\u067E\u0646\u0644 \u0645\u062F\u06CC\u0631\u06CC\u062A","adm.dashboard":"\u062F\u0627\u0634\u0628\u0648\u0631\u062F","adm.products":"\u06A9\u0627\u0644\u0627\u0647\u0627","adm.productNew":"\u0627\u0641\u0632\u0648\u062F\u0646 \u06A9\u0627\u0644\u0627","adm.productEdit":"\u0648\u06CC\u0631\u0627\u06CC\u0634 \u06A9\u0627\u0644\u0627","adm.categories":"\u062F\u0633\u062A\u0647\u200C\u0647\u0627 \u0648 \u0628\u0631\u0646\u062F\u0647\u0627","adm.orders":"\u0633\u0641\u0627\u0631\u0634\u200C\u0647\u0627","adm.reviews":"\u0646\u0638\u0631\u0627\u062A \u0648 \u0633\u0624\u0627\u0644\u0627\u062A","adm.tickets":"\u062A\u06CC\u06A9\u062A\u200C\u0647\u0627","adm.supportChat":"\u0686\u062A \u067E\u0634\u062A\u06CC\u0628\u0627\u0646\u06CC","adm.feedback":"\u0628\u0627\u0632\u062E\u0648\u0631\u062F\u0647\u0627 \u0648 \u062E\u0637\u0627\u0647\u0627","adm.users":"\u06A9\u0627\u0631\u0628\u0631\u0627\u0646 \u0648 \u062F\u0633\u062A\u0631\u0633\u06CC\u200C\u0647\u0627","adm.wallet":"\u06A9\u06CC\u0641 \u067E\u0648\u0644 \u06A9\u0627\u0631\u0628\u0631\u0627\u0646","adm.coupons":"\u06A9\u062F\u0647\u0627\u06CC \u062A\u062E\u0641\u06CC\u0641","adm.ads":"\u062A\u0628\u0644\u06CC\u063A\u0627\u062A","adm.notifications":"\u0627\u0639\u0644\u0627\u0646\u200C\u0647\u0627","adm.settings":"\u062A\u0646\u0638\u06CC\u0645\u0627\u062A \u0641\u0631\u0648\u0634\u06AF\u0627\u0647","adm.theme":"\u067E\u0648\u0633\u062A\u0647 \u0648 \u0686\u06CC\u062F\u0645\u0627\u0646","adm.features":"\u0627\u0645\u06A9\u0627\u0646\u0627\u062A","adm.shipping":"\u0627\u0631\u0633\u0627\u0644 \u0648 \u0628\u06CC\u0645\u0647","adm.plus":"\u0627\u0634\u062A\u0631\u0627\u06A9 \u067E\u0644\u0627\u0633","adm.pages":"\u0645\u062D\u062A\u0648\u0627\u06CC \u0635\u0641\u062D\u0647\u200C\u0647\u0627","adm.barcode":"\u0628\u0627\u0631\u06A9\u062F \u0648 \u0628\u0631\u0686\u0633\u0628","adm.imageSearch":"\u062C\u0633\u062A\u200C\u0648\u062C\u0648\u06CC \u062A\u0635\u0648\u06CC\u0631\u06CC","adm.audit":"\u06AF\u0632\u0627\u0631\u0634 \u0631\u0648\u06CC\u062F\u0627\u062F\u0647\u0627","adm.stats":"\u0622\u0645\u0627\u0631","adm.export":"\u062E\u0631\u0648\u062C\u06CC \u0648 \u067E\u0634\u062A\u06CC\u0628\u0627\u0646","adm.maintenance":"\u0646\u06AF\u0647\u062F\u0627\u0631\u06CC","adm.backToSite":"\u0628\u0627\u0632\u06AF\u0634\u062A \u0628\u0647 \u0633\u0627\u06CC\u062A","adm.kpi.ordersToday":"\u0633\u0641\u0627\u0631\u0634 \u0627\u0645\u0631\u0648\u0632","adm.kpi.visits":"\u0628\u0627\u0632\u062F\u06CC\u062F \u0627\u0645\u0631\u0648\u0632","adm.kpi.pending":"\u062F\u0631 \u0627\u0646\u062A\u0638\u0627\u0631 \u0628\u0631\u0631\u0633\u06CC","adm.kpi.revenueTotal":"\u062F\u0631\u0622\u0645\u062F \u06A9\u0644","adm.kpi.users":"\u06A9\u0627\u0631\u0628\u0631\u0627\u0646","adm.kpi.products":"\u06A9\u0627\u0644\u0627\u0647\u0627","adm.kpi.lowStock":"\u0645\u0648\u062C\u0648\u062F\u06CC \u06A9\u0645","adm.awaiting":"\u06A9\u0627\u0631\u0647\u0627\u06CC \u062F\u0631 \u0627\u0646\u062A\u0638\u0627\u0631 \u0627\u0642\u062F\u0627\u0645","adm.awaiting.reviews":"\u0646\u0638\u0631\u0627\u062A \u062F\u0631 \u0627\u0646\u062A\u0638\u0627\u0631 \u062A\u0623\u06CC\u06CC\u062F","adm.awaiting.tickets":"\u062A\u06CC\u06A9\u062A\u200C\u0647\u0627\u06CC \u0628\u0627\u0632","adm.awaiting.orders":"\u0633\u0641\u0627\u0631\u0634\u200C\u0647\u0627\u06CC \u062F\u0631 \u0627\u0646\u062A\u0638\u0627\u0631","adm.awaiting.feedback":"\u0628\u0627\u0632\u062E\u0648\u0631\u062F \u062C\u062F\u06CC\u062F","adm.awaiting.chat":"\u067E\u06CC\u0627\u0645 \u062E\u0648\u0627\u0646\u062F\u0647\u200C\u0646\u0634\u062F\u0647\u200C\u06CC \u0686\u062A","adm.chart":"\u0631\u0648\u0646\u062F \u06F1\u06F4 \u0631\u0648\u0632 \u0627\u062E\u06CC\u0631","adm.topSelling":"\u067E\u0631\u0641\u0631\u0648\u0634\u200C\u062A\u0631\u06CC\u0646\u200C\u0647\u0627","adm.lowStockList":"\u06A9\u0627\u0644\u0627\u0647\u0627\u06CC \u0628\u0627 \u0645\u0648\u062C\u0648\u062F\u06CC \u06A9\u0645","adm.recentAudit":"\u0622\u062E\u0631\u06CC\u0646 \u0631\u0648\u06CC\u062F\u0627\u062F\u0647\u0627","adm.storage":"\u062D\u062C\u0645 \u062F\u0627\u062F\u0647\u200C\u0647\u0627","adm.pName":"\u0646\u0627\u0645 \u06A9\u0627\u0644\u0627","adm.pNameEn":"\u0646\u0627\u0645 \u0627\u0646\u06AF\u0644\u06CC\u0633\u06CC","adm.pCat":"\u062F\u0633\u062A\u0647\u200C\u0628\u0646\u062F\u06CC","adm.pBrand":"\u0628\u0631\u0646\u062F","adm.pPrice":"\u0642\u06CC\u0645\u062A (\u062A\u0648\u0645\u0627\u0646)","adm.pOldPrice":"\u0642\u06CC\u0645\u062A \u0642\u0628\u0644 \u0627\u0632 \u062A\u062E\u0641\u06CC\u0641","adm.pCost":"\u0642\u06CC\u0645\u062A \u062E\u0631\u06CC\u062F","adm.pStock":"\u0645\u0648\u062C\u0648\u062F\u06CC","adm.pSku":"\u06A9\u062F \u06A9\u0627\u0644\u0627","adm.pBarcode":"\u0628\u0627\u0631\u06A9\u062F","adm.pWeight":"\u0648\u0632\u0646 (\u06AF\u0631\u0645)","adm.pWarranty":"\u06AF\u0627\u0631\u0627\u0646\u062A\u06CC (\u0645\u0627\u0647)","adm.pAuth":"\u0627\u0635\u0627\u0644\u062A \u06A9\u0627\u0644\u0627","adm.pTags":"\u0628\u0631\u0686\u0633\u0628\u200C\u0647\u0627 (\u0628\u0627 Enter \u062C\u062F\u0627 \u06A9\u0646)","adm.pSpecs":"\u0645\u0634\u062E\u0635\u0627\u062A \u0641\u0646\u06CC","adm.pSpecKey":"\u0646\u0627\u0645 \u0645\u0634\u062E\u0635\u0647","adm.pSpecVal":"\u0645\u0642\u062F\u0627\u0631","adm.pAddSpec":"\u0627\u0641\u0632\u0648\u062F\u0646 \u0645\u0634\u062E\u0635\u0647","adm.pVideos":"\u0648\u06CC\u062F\u06CC\u0648\u0647\u0627\u06CC \u0645\u062D\u0635\u0648\u0644 (\u0647\u0631 \u062E\u0637 \u06CC\u06A9 \u0646\u0634\u0627\u0646\u06CC https \u06CC\u0627 /uploads)","adm.pVideosHint":"\u0648\u06CC\u062F\u06CC\u0648\u0647\u0627 \u062F\u0631 \u06AF\u0627\u0644\u0631\u06CC \u0645\u062D\u0635\u0648\u0644 \u0648 \u0644\u0627\u06CC\u062A\u200C\u0628\u0627\u06A9\u0633 \u067E\u062E\u0634 \u0645\u06CC\u200C\u0634\u0648\u0646\u062F.","adm.pImages":"\u062A\u0635\u0627\u0648\u06CC\u0631","adm.pFindImage":"\u062C\u0633\u062A\u200C\u0648\u062C\u0648\u06CC \u062E\u0648\u062F\u06A9\u0627\u0631 \u062A\u0635\u0648\u06CC\u0631","adm.pFindImageHint":"\u0645\u0646\u0627\u0628\u0639 \u0622\u0632\u0627\u062F \u062A\u0635\u0648\u06CC\u0631 (\u0648\u06CC\u06A9\u06CC\u200C\u0645\u062F\u06CC\u0627/\u0627\u0648\u067E\u0646\u200C\u0648\u0631\u0633) \u0631\u0627 \u0628\u0631\u0627\u06CC \u0627\u06CC\u0646 \u06A9\u0627\u0644\u0627 \u062C\u0633\u062A\u200C\u0648\u062C\u0648 \u0645\u06CC\u200C\u06A9\u0646\u06CC\u0645. \u06CC\u06A9\u06CC \u0631\u0627 \u0627\u0646\u062A\u062E\u0627\u0628 \u0648 \u062A\u0623\u06CC\u06CC\u062F \u06A9\u0646.","adm.pFindSearching":"\u062F\u0631 \u062D\u0627\u0644 \u062C\u0633\u062A\u200C\u0648\u062C\u0648\u06CC \u062A\u0635\u0648\u06CC\u0631\u2026","adm.pFindEmpty":"\u062A\u0635\u0648\u06CC\u0631\u06CC \u067E\u06CC\u062F\u0627 \u0646\u0634\u062F. \u0645\u06CC\u200C\u062A\u0648\u0627\u0646\u06CC \u0639\u06A9\u0633 \u062E\u0648\u062F\u062A \u0631\u0627 \u0628\u0627\u0631\u06AF\u0630\u0627\u0631\u06CC \u06A9\u0646\u06CC.","adm.pUpload":"\u0628\u0627\u0631\u06AF\u0630\u0627\u0631\u06CC \u0639\u06A9\u0633","adm.pUseImage":"\u0627\u0633\u062A\u0641\u0627\u062F\u0647 \u0627\u0632 \u0627\u06CC\u0646 \u062A\u0635\u0648\u06CC\u0631","adm.pDefaultImage":"\u0628\u0627\u0632\u06AF\u0631\u062F\u0627\u0646\u062F\u0646 \u062A\u0635\u0648\u06CC\u0631 \u067E\u06CC\u0634\u200C\u0641\u0631\u0636","adm.pFeatured":"\u0646\u0645\u0627\u06CC\u0634 \u062F\u0631 \u067E\u06CC\u0634\u0646\u0647\u0627\u062F \u0648\u06CC\u0698\u0647","adm.pActive":"\u0641\u0639\u0627\u0644 (\u062F\u0631 \u0633\u0627\u06CC\u062A \u062F\u06CC\u062F\u0647 \u0634\u0648\u062F)","adm.pSaved":"\u06A9\u0627\u0644\u0627 \u0630\u062E\u06CC\u0631\u0647 \u0634\u062F","adm.pCreated":"\u06A9\u0627\u0644\u0627 \u0627\u06CC\u062C\u0627\u062F \u0634\u062F","adm.pDeleted":"\u06A9\u0627\u0644\u0627 \u062D\u0630\u0641 \u0634\u062F","adm.pDeleteConfirm":"\u0627\u06CC\u0646 \u06A9\u0627\u0644\u0627 \u0628\u0631\u0627\u06CC \u0647\u0645\u06CC\u0634\u0647 \u062D\u0630\u0641 \u0634\u0648\u062F\u061F","adm.pQuickEdit":"\u0648\u06CC\u0631\u0627\u06CC\u0634 \u0633\u0631\u06CC\u0639","adm.pBulkPrice":"\u062A\u063A\u06CC\u06CC\u0631 \u06AF\u0631\u0648\u0647\u06CC \u0642\u06CC\u0645\u062A","adm.catName":"\u0646\u0627\u0645 \u062F\u0633\u062A\u0647","adm.catParent":"\u062F\u0633\u062A\u0647\u200C\u06CC \u0648\u0627\u0644\u062F","adm.catGlyph":"\u0622\u06CC\u06A9\u0648\u0646","adm.catOrder":"\u062A\u0631\u062A\u06CC\u0628 \u0646\u0645\u0627\u06CC\u0634","adm.catNoParent":"\u0628\u062F\u0648\u0646 \u0648\u0627\u0644\u062F (\u0633\u0637\u062D \u0627\u0635\u0644\u06CC)","adm.brandName":"\u0646\u0627\u0645 \u0628\u0631\u0646\u062F","adm.brandNameEn":"\u0646\u0627\u0645 \u0627\u0646\u06AF\u0644\u06CC\u0633\u06CC \u0628\u0631\u0646\u062F","adm.oStatus":"\u062A\u063A\u06CC\u06CC\u0631 \u0648\u0636\u0639\u06CC\u062A","adm.oTracking":"\u06A9\u062F \u0631\u0647\u06AF\u06CC\u0631\u06CC","adm.oNote":"\u06CC\u0627\u062F\u062F\u0627\u0634\u062A \u062F\u0627\u062E\u0644\u06CC","adm.oCustomer":"\u0645\u0634\u062A\u0631\u06CC","adm.oDelivery":"\u062A\u062D\u0648\u06CC\u0644","adm.oPayment":"\u067E\u0631\u062F\u0627\u062E\u062A","adm.oSaved":"\u0633\u0641\u0627\u0631\u0634 \u0628\u0647\u200C\u0631\u0648\u0632\u0631\u0633\u0627\u0646\u06CC \u0634\u062F","adm.rApprove":"\u062A\u0623\u06CC\u06CC\u062F \u0648 \u0627\u0646\u062A\u0634\u0627\u0631","adm.rReject":"\u0631\u062F \u06A9\u0631\u062F\u0646","adm.rReply":"\u067E\u0627\u0633\u062E","adm.rReplySaved":"\u067E\u0627\u0633\u062E \u0630\u062E\u06CC\u0631\u0647 \u0634\u062F","adm.rModerated":"\u0648\u0636\u0639\u06CC\u062A \u0646\u0638\u0631 \u0628\u0647\u200C\u0631\u0648\u0632\u0631\u0633\u0627\u0646\u06CC \u0634\u062F","adm.rFilter":"\u0641\u06CC\u0644\u062A\u0631","adm.uRole":"\u0646\u0642\u0634","adm.uPerms":"\u062F\u0633\u062A\u0631\u0633\u06CC\u200C\u0647\u0627","adm.uPermsHint":"\u0647\u0631 \u062F\u0633\u062A\u0631\u0633\u06CC \u0631\u0627 \u062C\u062F\u0627\u06AF\u0627\u0646\u0647 \u0631\u0648\u0634\u0646 \u06CC\u0627 \u062E\u0627\u0645\u0648\u0634 \u06A9\u0646. \u062A\u063A\u06CC\u06CC\u0631\u0647\u0627 \u0641\u0648\u0631\u0627\u064B \u0627\u0639\u0645\u0627\u0644 \u0645\u06CC\u200C\u0634\u0648\u062F.","adm.uAll":"\u0641\u0639\u0627\u0644\u200C\u0633\u0627\u0632\u06CC \u0647\u0645\u0647","adm.uNone":"\u063A\u06CC\u0631\u0641\u0639\u0627\u0644\u200C\u0633\u0627\u0632\u06CC \u0647\u0645\u0647","adm.uWalletAdjust":"\u062A\u0646\u0638\u06CC\u0645 \u0645\u0648\u062C\u0648\u062F\u06CC \u06A9\u06CC\u0641 \u067E\u0648\u0644","adm.uWalletReason":"\u062F\u0644\u06CC\u0644","adm.uPlusDays":"\u0631\u0648\u0632\u0647\u0627\u06CC \u0627\u0634\u062A\u0631\u0627\u06A9 \u067E\u0644\u0627\u0633","adm.uResetPass":"\u0628\u0627\u0632\u0646\u0634\u0627\u0646\u06CC \u0631\u0645\u0632 \u0639\u0628\u0648\u0631","adm.uStatus":"\u0648\u0636\u0639\u06CC\u062A \u062D\u0633\u0627\u0628","adm.uBlocked":"\u0645\u0633\u062F\u0648\u062F","adm.uSaved":"\u062A\u063A\u06CC\u06CC\u0631\u0627\u062A \u06A9\u0627\u0631\u0628\u0631 \u0630\u062E\u06CC\u0631\u0647 \u0634\u062F","adm.uMakeStaff":"\u06A9\u0627\u0631\u0645\u0646\u062F \u06A9\u0631\u062F\u0646","adm.cCode":"\u06A9\u062F","adm.cType":"\u0646\u0648\u0639 \u062A\u062E\u0641\u06CC\u0641","adm.cValue":"\u0645\u0642\u062F\u0627\u0631","adm.cMax":"\u0633\u0642\u0641 \u062A\u062E\u0641\u06CC\u0641","adm.cMin":"\u062D\u062F\u0627\u0642\u0644 \u0645\u0628\u0644\u063A \u0633\u0641\u0627\u0631\u0634","adm.cLimit":"\u0633\u0642\u0641 \u0627\u0633\u062A\u0641\u0627\u062F\u0647\u200C\u06CC \u06A9\u0644","adm.cPerUser":"\u0633\u0642\u0641 \u0647\u0631 \u06A9\u0627\u0631\u0628\u0631","adm.cStart":"\u0634\u0631\u0648\u0639","adm.cEnd":"\u067E\u0627\u06CC\u0627\u0646","adm.cUsed":"\u0627\u0633\u062A\u0641\u0627\u062F\u0647\u200C\u0634\u062F\u0647","adm.aSlot":"\u0645\u062D\u0644 \u0646\u0645\u0627\u06CC\u0634","adm.aTitle":"\u0639\u0646\u0648\u0627\u0646","adm.aText":"\u0645\u062A\u0646","adm.aLink":"\u0644\u06CC\u0646\u06A9 \u0645\u0642\u0635\u062F","adm.aCta":"\u0645\u062A\u0646 \u062F\u06A9\u0645\u0647","adm.aActive":"\u0646\u0645\u0627\u06CC\u0634 \u062F\u0627\u062F\u0647 \u0634\u0648\u062F","adm.nTitle":"\u0639\u0646\u0648\u0627\u0646 \u0627\u0639\u0644\u0627\u0646","adm.nBody":"\u0645\u062A\u0646 \u0627\u0639\u0644\u0627\u0646","adm.nTarget":"\u06AF\u06CC\u0631\u0646\u062F\u0647","adm.nAll":"\u0647\u0645\u0647\u200C\u06CC \u06A9\u0627\u0631\u0628\u0631\u0627\u0646","adm.nOne":"\u06CC\u06A9 \u06A9\u0627\u0631\u0628\u0631 \u0645\u0634\u062E\u0635","adm.nLevel":"\u0633\u0637\u062D","adm.nSent":"\u0627\u0639\u0644\u0627\u0646 \u0627\u0631\u0633\u0627\u0644 \u0634\u062F","adm.nOutbox":"\u0635\u0646\u062F\u0648\u0642 \u062E\u0631\u0648\u062C\u06CC \u067E\u06CC\u0627\u0645\u06A9 \u0648 \u0627\u06CC\u0645\u06CC\u0644 (\u062D\u0627\u0644\u062A \u0622\u0632\u0645\u0627\u06CC\u0634\u06CC)","adm.sStore":"\u0627\u0637\u0644\u0627\u0639\u0627\u062A \u0641\u0631\u0648\u0634\u06AF\u0627\u0647","adm.sTheme":"\u067E\u0648\u0633\u062A\u0647","adm.sUi":"\u0686\u06CC\u062F\u0645\u0627\u0646 \u0631\u0627\u0628\u0637","adm.mailsms":"\u0627\u06CC\u0645\u06CC\u0644 \u0648 \u067E\u06CC\u0627\u0645\u06A9","adm.mailCfg":"\u0633\u0631\u0648\u0631 \u0627\u06CC\u0645\u06CC\u0644 (SMTP)","adm.mailEnabled":"\u0627\u0631\u0633\u0627\u0644 \u0627\u06CC\u0645\u06CC\u0644 \u0641\u0639\u0627\u0644","adm.mailFrom":"\u0622\u062F\u0631\u0633 \u0641\u0631\u0633\u062A\u0646\u062F\u0647","adm.smsCfg":"\u067E\u0646\u0644 \u067E\u06CC\u0627\u0645\u06A9 (\u06A9\u0627\u0648\u0647\u200C\u0646\u06AF\u0627\u0631)","adm.smsEnabled":"\u0627\u0631\u0633\u0627\u0644 \u067E\u06CC\u0627\u0645\u06A9 \u0641\u0639\u0627\u0644","adm.smsKey":"\u06A9\u0644\u06CC\u062F API","adm.smsSender":"\u0634\u0645\u0627\u0631\u0647\u0654 \u0641\u0631\u0633\u062A\u0646\u062F\u0647","adm.console":"\u06A9\u0646\u0633\u0648\u0644 \u0633\u0627\u0645\u0627\u0646\u0647","adm.consoleHint":"\u0631\u06CC\u0633\u062A\u0627\u0631\u062A \u0633\u0631\u0648\u0631 \u0686\u0646\u062F \u062B\u0627\u0646\u06CC\u0647 \u0637\u0648\u0644 \u0645\u06CC\u200C\u06A9\u0634\u062F\u061B \u0635\u0641\u062D\u0647 \u062E\u0648\u062F\u06A9\u0627\u0631 \u062A\u0627\u0632\u0647 \u0645\u06CC\u200C\u0634\u0648\u062F. \u0631\u06CC\u0633\u062A\u200C\u0647\u0627 \u063A\u06CC\u0631\u0642\u0627\u0628\u0644 \u0628\u0627\u0632\u06AF\u0634\u062A\u200C\u0627\u0646\u062F.","adm.sysRestart":"\u0631\u06CC\u0633\u062A\u0627\u0631\u062A \u0633\u0631\u0648\u0631","adm.sysRestartWarn":"\u0633\u0631\u0648\u0631 \u0647\u0645\u06CC\u0646 \u062D\u0627\u0644\u0627 \u0631\u06CC\u0633\u062A\u0627\u0631\u062A \u0634\u0648\u062F\u061F \u06A9\u0627\u0631\u0628\u0631\u0627\u0646 \u0686\u0646\u062F \u062B\u0627\u0646\u06CC\u0647 \u0642\u0637\u0639 \u0645\u06CC\u200C\u0634\u0648\u0646\u062F.","adm.sysRestarting":"\u062F\u0631 \u062D\u0627\u0644 \u0631\u06CC\u0633\u062A\u0627\u0631\u062A\u2026 \u0635\u0641\u062D\u0647 \u062A\u0627 \u0644\u062D\u0638\u0627\u062A\u06CC \u062F\u06CC\u06AF\u0631 \u062A\u0627\u0632\u0647 \u0645\u06CC\u200C\u0634\u0648\u062F.","adm.sysResetLabel":"\u0631\u06CC\u0633\u062A \u0628\u062E\u0634\u200C\u0647\u0627 (\u063A\u06CC\u0631\u0642\u0627\u0628\u0644 \u0628\u0627\u0632\u06AF\u0634\u062A):","adm.sysReset.audit":"\u0644\u0627\u06AF \u0645\u0645\u06CC\u0632\u06CC","adm.sysReset.carts":"\u0633\u0628\u062F\u0647\u0627\u06CC \u0645\u0647\u0645\u0627\u0646","adm.sysReset.visits":"\u0634\u0645\u0627\u0631 \u0628\u0627\u0632\u062F\u06CC\u062F\u0647\u0627","adm.sysReset.visitors":"\u0628\u0627\u0632\u062F\u06CC\u062F\u06A9\u0646\u0646\u062F\u06AF\u0627\u0646","adm.secTitle":"\u067E\u062F\u0627\u0641\u0646\u062F \u0648 \u0635\u0641 \u0648\u0631\u0648\u062F","adm.secQueueEnabled":"\u0635\u0641\u200C\u0628\u0646\u062F\u06CC \u0647\u0646\u06AF\u0627\u0645 \u0634\u0644\u0648\u063A\u06CC","adm.secQueueDesc":"\u0648\u0642\u062A\u06CC \u0628\u0627\u0631 \u0633\u0627\u06CC\u062A \u0627\u0632 \u062D\u062F \u0628\u06AF\u0630\u0631\u062F\u060C \u0628\u0627\u0632\u062F\u06CC\u062F\u06A9\u0646\u0646\u062F\u06AF\u0627\u0646 \u0646\u0627\u0634\u0646\u0627\u0633 \u062F\u0627\u0646\u0647\u200C\u062F\u0627\u0646\u0647 \u0627\u0632 \u0635\u0641 \u0648\u0627\u0631\u062F \u0645\u06CC\u200C\u0634\u0648\u0646\u062F \u062A\u0627 \u0633\u0627\u06CC\u062A \u0628\u0631\u0627\u06CC \u0647\u0645\u0647 \u0628\u062F\u0648\u0646 \u062E\u0637\u0627 \u0628\u0645\u0627\u0646\u062F.","adm.secMaxConc":"\u0633\u0642\u0641 \u062F\u0631\u062E\u0648\u0627\u0633\u062A \u0647\u0645\u0632\u0645\u0627\u0646","adm.secTriggerRps":"\u0622\u0633\u062A\u0627\u0646\u0647\u0654 \u062F\u0631\u062E\u0648\u0627\u0633\u062A \u062F\u0631 \u062B\u0627\u0646\u06CC\u0647","adm.secPassTtl":"\u0627\u0639\u062A\u0628\u0627\u0631 \u06AF\u0630\u0631\u0646\u0627\u0645\u0647\u0654 \u0648\u0631\u0648\u062F (\u062F\u0642\u06CC\u0642\u0647)","adm.secPoll":"\u0641\u0627\u0635\u0644\u0647\u0654 \u0628\u0631\u0631\u0633\u06CC \u0646\u0648\u0628\u062A (\u062B\u0627\u0646\u06CC\u0647)","adm.secFloodBan":"\u0622\u0633\u062A\u0627\u0646\u0647\u0654 \u0645\u0633\u062F\u0648\u062F\u0633\u0627\u0632\u06CC \u062E\u0648\u062F\u06A9\u0627\u0631 (\u062F\u0631\u062E\u0648\u0627\u0633\u062A \u062F\u0631 \u062F\u0642\u06CC\u0642\u0647)","adm.secFloodMin":"\u0645\u062F\u062A \u0645\u0633\u062F\u0648\u062F\u0633\u0627\u0632\u06CC \u062E\u0648\u062F\u06A9\u0627\u0631 (\u062F\u0642\u06CC\u0642\u0647)","adm.secSaved":"\u062A\u0646\u0638\u06CC\u0645\u0627\u062A \u067E\u062F\u0627\u0641\u0646\u062F \u0630\u062E\u06CC\u0631\u0647 \u0634\u062F.","adm.secInflight":"\u062F\u0631\u062E\u0648\u0627\u0633\u062A \u0641\u0639\u0627\u0644","adm.secRps":"\u062F\u0631\u062E\u0648\u0627\u0633\u062A/\u062B\u0627\u0646\u06CC\u0647","adm.secQueued":"\u062F\u0631 \u0635\u0641","adm.secAutoBans":"\u0645\u0633\u062F\u0648\u062F \u062E\u0648\u062F\u06A9\u0627\u0631 \u0641\u0639\u0627\u0644","adm.secTop":"\u067E\u0631\u062D\u0631\u0641\u200C\u062A\u0631\u06CC\u0646 IP\u0647\u0627 (\u062F\u0642\u06CC\u0642\u0647\u0654 \u0627\u062E\u06CC\u0631)","adm.secPerMin":"\u062F\u0631\u062E\u0648\u0627\u0633\u062A/\u062F\u0642\u06CC\u0642\u0647","adm.secTopEmpty":"\u062A\u0631\u0627\u0641\u06CC\u06A9 \u063A\u06CC\u0631\u0639\u0627\u062F\u06CC \u062B\u0628\u062A \u0646\u0634\u062F\u0647 \u0627\u0633\u062A.","adm.secBusy":"\u0634\u0644\u0648\u063A \u2014 \u0635\u0641 \u0641\u0639\u0627\u0644","adm.secNormal":"\u0648\u0636\u0639\u06CC\u062A \u0639\u0627\u062F\u06CC","adm.banMinutes":"\u0645\u062F\u062A (\u062F\u0642\u06CC\u0642\u0647\u060C \u06F0 = \u062F\u0627\u0626\u0645)","adm.banUntil":"\u062A\u0627","adm.banAuto":"\u062E\u0648\u062F\u06A9\u0627\u0631","adm.resetAudit":"\u067E\u0627\u06A9\u200C\u06A9\u0631\u062F\u0646 \u0644\u0627\u06AF\u200C\u0647\u0627","adm.resetCarts":"\u062E\u0627\u0644\u06CC\u200C\u06A9\u0631\u062F\u0646 \u0633\u0628\u062F\u0647\u0627\u06CC \u0645\u0647\u0645\u0627\u0646","adm.resetVisitors":"\u067E\u0627\u06A9\u200C\u06A9\u0631\u062F\u0646 \u0628\u0627\u0632\u062F\u06CC\u062F\u06A9\u0646\u0646\u062F\u06AF\u0627\u0646","adm.resetDone":"\u0631\u06CC\u0633\u062A \u0627\u0646\u062C\u0627\u0645 \u0634\u062F.","adm.resetWarn.audit":"\u0647\u0645\u0647\u0654 \u0644\u0627\u06AF\u200C\u0647\u0627\u06CC \u0645\u0645\u06CC\u0632\u06CC \u067E\u0627\u06A9 \u0634\u0648\u0646\u062F\u061F","adm.resetWarn.carts":"\u0633\u0628\u062F\u0647\u0627\u06CC \u062E\u0631\u06CC\u062F \u06A9\u0627\u0631\u0628\u0631\u0627\u0646 \u0645\u0647\u0645\u0627\u0646 \u062E\u0627\u0644\u06CC \u0634\u0648\u062F\u061F","adm.resetWarn.visitors":"\u0641\u0647\u0631\u0633\u062A \u0628\u0627\u0632\u062F\u06CC\u062F\u06A9\u0646\u0646\u062F\u06AF\u0627\u0646 \u067E\u0627\u06A9 \u0634\u0648\u062F\u061F","adm.resetWarn.visits":"\u0634\u0645\u0627\u0631\u0646\u062F\u0647\u200C\u0647\u0627\u06CC \u0628\u0627\u0632\u062F\u06CC\u062F \u0635\u0641\u0631 \u0634\u0648\u0646\u062F\u061F","adm.visitors":"\u0628\u0627\u0632\u062F\u06CC\u062F\u06A9\u0646\u0646\u062F\u06AF\u0627\u0646","adm.uDevice":"\u062F\u0633\u062A\u06AF\u0627\u0647 / IP","adm.uBrowser":"\u0645\u0631\u0648\u0631\u06AF\u0631","adm.uRegion":"\u0645\u0646\u0637\u0642\u0647 / \u0632\u0645\u0627\u0646","adm.uPath":"\u0645\u0633\u06CC\u0631","adm.guest":"\u0645\u0647\u0645\u0627\u0646","adm.bans":"\u0645\u0633\u062F\u0648\u062F\u0633\u0627\u0632\u06CC (\u0628\u0646/\u0622\u0646\u200C\u0628\u0646)","adm.banType":"\u0646\u0648\u0639","adm.banValue":"\u0645\u0642\u062F\u0627\u0631 (IP / \u0634\u0645\u0627\u0631\u0647 / \u0627\u06CC\u0645\u06CC\u0644 / \u0646\u0627\u0645 \u06A9\u0627\u0631\u0628\u0631\u06CC)","adm.banReason":"\u062F\u0644\u06CC\u0644","adm.ban":"\u0645\u0633\u062F\u0648\u062F \u06A9\u0646","adm.unban":"\u0631\u0641\u0639 \u0645\u0633\u062F\u0648\u062F\u06CC","adm.banned":"\u0645\u0633\u062F\u0648\u062F","adm.banDone":"\u0645\u0633\u062F\u0648\u062F \u0634\u062F.","adm.unbanDone":"\u0645\u0633\u062F\u0648\u062F\u06CC \u0631\u0641\u0639 \u0634\u062F.","adm.bansEmpty":"\u0641\u0639\u0644\u0627\u064B \u06A9\u0633\u06CC \u0645\u0633\u062F\u0648\u062F \u0646\u06CC\u0633\u062A.","adm.banByAdmin":"\u062A\u0648\u0633\u0637 \u0645\u062F\u06CC\u0631","adm.channels":"\u06A9\u0627\u0646\u0627\u0644\u200C\u0647\u0627\u06CC \u0627\u0631\u0633\u0627\u0644","adm.chSite":"\u0627\u0639\u0644\u0627\u0646 \u062F\u0627\u062E\u0644 \u0633\u0627\u06CC\u062A","adm.chTelegram":"\u0628\u0627\u062A \u062A\u0644\u06AF\u0631\u0627\u0645","adm.chEmail":"\u0627\u06CC\u0645\u06CC\u0644","adm.chSms":"\u067E\u06CC\u0627\u0645\u06A9","adm.channelsHint":"\u0627\u06CC\u0645\u06CC\u0644/\u067E\u06CC\u0627\u0645\u06A9 \u0646\u06CC\u0627\u0632 \u0628\u0647 \u062A\u0646\u0638\u06CC\u0645\u0627\u062A \u067E\u0627\u06CC\u06CC\u0646 \u0647\u0645\u06CC\u0646 \u0628\u062E\u0634 \u062F\u0627\u0631\u0646\u062F\u061B \u0628\u062F\u0648\u0646 \u062A\u0646\u0638\u06CC\u0645\u060C \u0641\u0642\u0637 \u06A9\u0627\u0646\u0627\u0644\u200C\u0647\u0627\u06CC \u0622\u0645\u0627\u062F\u0647 \u0627\u0631\u0633\u0627\u0644 \u0645\u06CC\u200C\u0634\u0648\u0646\u062F.","adm.telegram":"\u0628\u0627\u062A \u062A\u0644\u06AF\u0631\u0627\u0645","adm.tgHint":"\u062A\u0648\u06A9\u0646 \u0631\u0627 \u0627\u0632 BotFather \u062A\u0644\u06AF\u0631\u0627\u0645 \u0628\u06AF\u06CC\u0631 \u0648 \u0627\u06CC\u0646\u062C\u0627 \u0628\u06AF\u0630\u0627\u0631\u061B \u0628\u0627\u062A \u0631\u0648\u06CC \u0633\u0631\u0648\u0631 \u0641\u0631\u0648\u0634\u06AF\u0627\u0647 \u0645\u06CC\u200C\u0686\u0631\u062E\u062F \u0648 \u0627\u0632 \u0647\u0645\u06CC\u0646 \u067E\u0646\u0644 \u0645\u062F\u06CC\u0631\u06CC\u062A \u0645\u06CC\u200C\u0634\u0648\u062F.","adm.tgEnabled":"\u0628\u0627\u062A \u0631\u0648\u0634\u0646","adm.tgToken":"\u062A\u0648\u06A9\u0646 \u0628\u0627\u062A","adm.tgTokenHint":"\u0645\u062B\u0644 123456:ABC-\u2026","adm.tgWelcome":"\u067E\u06CC\u0627\u0645 \u062E\u0648\u0634\u200C\u0622\u0645\u062F /start","adm.tgTest":"\u0627\u0631\u0633\u0627\u0644 \u0622\u0632\u0645\u0627\u06CC\u0634\u06CC","adm.tgInbox":"\u0635\u0646\u062F\u0648\u0642 \u067E\u06CC\u0627\u0645\u200C\u0647\u0627","adm.tgSubs":"\u0639\u0636\u0648\u0647\u0627","adm.tgReplyPh":"\u067E\u0627\u0633\u062E \u0628\u0647 \u0627\u06CC\u0646 \u06A9\u0627\u0631\u0628\u0631\u2026","adm.tgInboxEmpty":"\u067E\u06CC\u0627\u0645\u06CC \u0646\u0631\u0633\u06CC\u062F\u0647 \u0627\u0633\u062A.","adm.lottery":"\u0642\u0631\u0639\u0647\u200C\u06A9\u0634\u06CC","adm.lotteryNew":"\u0642\u0631\u0639\u0647\u200C\u06A9\u0634\u06CC \u062C\u062F\u06CC\u062F","adm.lotPrize":"\u062C\u0627\u06CC\u0632\u0647","adm.lotEnds":"\u067E\u0627\u06CC\u0627\u0646","adm.lotWinners":"\u062A\u0639\u062F\u0627\u062F \u0628\u0631\u0646\u062F\u0647","adm.lotWinnersList":"\u0628\u0631\u0646\u062F\u0647\u200C\u0647\u0627","adm.lotMode":"\u0631\u0648\u0634 \u0634\u0631\u06A9\u062A","adm.lotModeOrders":"\u062E\u0648\u062F\u06A9\u0627\u0631 \u0627\u0632 \u0633\u0641\u0627\u0631\u0634\u200C\u0647\u0627","adm.lotModeManual":"\u062F\u06A9\u0645\u0647\u0654 \u0634\u0631\u06A9\u062A \u062F\u0633\u062A\u06CC","adm.lotEntries":"\u0634\u0631\u06A9\u062A\u200C\u06A9\u0646\u0646\u062F\u06AF\u0627\u0646","adm.lotRun":"\u0642\u0631\u0639\u0647\u200C\u06A9\u0634\u06CC \u06A9\u0646","adm.lotRunWarn":"\u0628\u0631\u0646\u062F\u0647\u200C\u0647\u0627 \u0647\u0645\u06CC\u0646 \u062D\u0627\u0644\u0627 \u0628\u0647\u200C\u0635\u0648\u0631\u062A \u062A\u0635\u0627\u062F\u0641\u06CC \u0627\u0646\u062A\u062E\u0627\u0628 \u0648 \u0645\u0637\u0644\u0639 \u0645\u06CC\u200C\u0634\u0648\u0646\u062F. \u0627\u062F\u0627\u0645\u0647 \u0645\u06CC\u200C\u062F\u0647\u06CC\u061F","adm.lotDone":"\u0642\u0631\u0639\u0647\u200C\u06A9\u0634\u06CC \u0627\u0646\u062C\u0627\u0645 \u0634\u062F","adm.lotClose":"\u0628\u0633\u062A\u0646","adm.lotClosed":"\u0642\u0631\u0639\u0647\u200C\u06A9\u0634\u06CC \u0628\u0633\u062A\u0647 \u0634\u062F.","adm.lotEmpty":"\u0647\u0646\u0648\u0632 \u0642\u0631\u0639\u0647\u200C\u06A9\u0634\u06CC\u200C\u0627\u06CC \u0646\u0633\u0627\u062E\u062A\u0647\u200C\u0627\u06CC.","lot.title":"\u0642\u0631\u0639\u0647\u200C\u06A9\u0634\u06CC \u06CC\u0627\u0633\u0627\u06CC\u06CC","lot.nav":"\u0642\u0631\u0639\u0647\u200C\u06A9\u0634\u06CC","lot.soon":"\u0628\u0647\u200C\u0632\u0648\u062F\u06CC \u0627\u0636\u0627\u0641\u0647 \u062E\u0648\u0627\u0647\u062F \u0634\u062F\u061B \u0645\u0646\u062A\u0638\u0631 \u062E\u0628\u0631\u0647\u0627\u06CC \u062E\u0648\u0628 \u0628\u0627\u0634!","lot.done":"\u0642\u0631\u0639\u0647\u200C\u06A9\u0634\u06CC\u200C\u0647\u0627\u06CC \u06AF\u0630\u0634\u062A\u0647","lot.winners":"\u0628\u0631\u0646\u062F\u0647\u200C\u0647\u0627","lot.active":"\u0641\u0639\u0627\u0644","lot.prize":"\u062C\u0627\u06CC\u0632\u0647","lot.ends":"\u067E\u0627\u06CC\u0627\u0646","lot.entries":"\u0634\u0631\u06A9\u062A\u200C\u06A9\u0646\u0646\u062F\u06AF\u0627\u0646","lot.joined":"\u062F\u0631 \u0627\u06CC\u0646 \u0642\u0631\u0639\u0647\u200C\u06A9\u0634\u06CC \u0634\u0631\u06A9\u062A \u06A9\u0631\u062F\u0647\u200C\u0627\u06CC.","lot.join":"\u0634\u0631\u06A9\u062A \u062F\u0631 \u0642\u0631\u0639\u0647\u200C\u06A9\u0634\u06CC","lot.joinDone":"\u0634\u0631\u06A9\u062A\u062A \u062B\u0628\u062A \u0634\u062F\u061B \u0628\u0647 \u0627\u0645\u06CC\u062F \u0628\u0631\u062F!","lot.autoEntry":"\u0647\u0631 \u062E\u0631\u06CC\u062F \u0645\u0639\u062A\u0628\u0631 \u062F\u0631 \u0628\u0627\u0632\u0647\u0654 \u0642\u0631\u0639\u0647\u200C\u06A9\u0634\u06CC\u060C \u062E\u0648\u062F\u06A9\u0627\u0631 \u06CC\u06A9 \u0634\u0631\u06A9\u062A \u0627\u0633\u062A.","contact.phone3":"\u0634\u0645\u0627\u0631\u0647\u0654 \u0633\u0648\u0645","adm.sBackups":"\u067E\u0634\u062A\u06CC\u0628\u0627\u0646\u200C\u06AF\u06CC\u0631\u06CC \u0648 \u062F\u0627\u0645\u067E","adm.backupNow":"\u067E\u0634\u062A\u06CC\u0628\u0627\u0646 \u0647\u0645\u06CC\u0646 \u062D\u0627\u0644\u0627","adm.backupsHint":"\u0647\u0631 {hours} \u0633\u0627\u0639\u062A \u06CC\u06A9\u200C\u0628\u0627\u0631 \u062E\u0648\u062F\u06A9\u0627\u0631 \u0646\u0633\u062E\u0647\u0654 \u06A9\u0627\u0645\u0644 \u06AF\u0631\u0641\u062A\u0647 \u0648 {keep} \u0646\u0633\u062E\u0647\u0654 \u0622\u062E\u0631 \u0646\u06AF\u0647 \u062F\u0627\u0634\u062A\u0647 \u0645\u06CC\u200C\u0634\u0648\u062F.","adm.backupsEmpty":"\u0647\u0646\u0648\u0632 \u0646\u0633\u062E\u0647\u200C\u0627\u06CC \u0633\u0627\u062E\u062A\u0647 \u0646\u0634\u062F\u0647\u061B \u062F\u06A9\u0645\u0647\u0654 \xAB\u067E\u0634\u062A\u06CC\u0628\u0627\u0646 \u0647\u0645\u06CC\u0646 \u062D\u0627\u0644\u0627\xBB \u0631\u0627 \u0628\u0632\u0646.","adm.backupSize":"\u062D\u062C\u0645","adm.backupRestore":"\u0628\u0627\u0632\u06AF\u0631\u062F\u0627\u0646\u06CC","adm.backupRestoreWarn":"\u0647\u0645\u0647\u0654 \u062F\u0627\u062F\u0647\u200C\u0647\u0627\u06CC \u0641\u0639\u0644\u06CC \u0628\u0627 \u0627\u06CC\u0646 \u0646\u0633\u062E\u0647 \u062C\u0627\u06CC\u06AF\u0632\u06CC\u0646 \u0645\u06CC\u200C\u0634\u0648\u062F. \u0645\u0637\u0645\u0626\u0646\u06CC\u061F","adm.backupDone":"\u0646\u0633\u062E\u0647\u0654 \u067E\u0634\u062A\u06CC\u0628\u0627\u0646 \u0633\u0627\u062E\u062A\u0647 \u0634\u062F.","adm.backupRestored":"\u0628\u0627\u0632\u06AF\u0631\u062F\u0627\u0646\u06CC \u0627\u0646\u062C\u0627\u0645 \u0634\u062F\u061B \u0635\u0641\u062D\u0647 \u062A\u0627\u0632\u0647 \u0645\u06CC\u200C\u0634\u0648\u062F.","adm.dumpFull":"\u062F\u0627\u0645\u067E \u06A9\u0627\u0645\u0644 \u0633\u0627\u06CC\u062A","adm.sFeatures":"\u0627\u0645\u06A9\u0627\u0646\u0627\u062A","adm.sShipping":"\u0627\u0631\u0633\u0627\u0644","adm.sPlus":"\u067E\u0644\u0627\u0633","adm.sOrders":"\u0633\u0641\u0627\u0631\u0634 \u0648 \u067E\u0631\u062F\u0627\u062E\u062A","adm.sSeo":"\u0633\u0626\u0648","adm.sAuth":"\u0627\u062D\u0631\u0627\u0632 \u0647\u0648\u06CC\u062A","adm.sSaved":"\u062A\u0646\u0638\u06CC\u0645\u0627\u062A \u0630\u062E\u06CC\u0631\u0647 \u0634\u062F","adm.tAccent":"\u0631\u0646\u06AF \u0627\u0635\u0644\u06CC","adm.tVariant":"\u067E\u0648\u0633\u062A\u0647\u0654 \u0638\u0627\u0647\u0631\u06CC","adm.tVariantHint":"\u0627\u06AF\u0631 \u067E\u0648\u0633\u062A\u0647\u0654 \u062A\u0627\u0632\u0647 \u0631\u0627 \u062F\u0648\u0633\u062A \u0646\u062F\u0627\u0634\u062A\u06CC\u062F\u060C \xAB\u06A9\u0644\u0627\u0633\u06CC\u06A9\xBB \u062F\u0642\u06CC\u0642\u0627\u064B \u0647\u0645\u0627\u0646 \u062A\u0645 \u0642\u0628\u0644\u06CC \u0627\u0633\u062A.","hdr.refresh":"\u062A\u0627\u0632\u0647\u200C\u0633\u0627\u0632\u06CC \u0635\u0641\u062D\u0647","adm.errTitle":"\u062E\u0637\u0627\u0647\u0627\u06CC \u0632\u0646\u062F\u0647\u0654 \u06A9\u0644\u0627\u06CC\u0646\u062A","adm.tPort":"\u0646\u0645\u0627\u06CC\u0634 \u062F\u0648\u0631\u0646\u0645\u0627\u06CC \u06AF\u0631\u0627\u0641\u06CC\u06A9\u06CC (\u0645\u0646\u0638\u0631\u0647\u060C \u0634\u0647\u0631\u060C \u0637\u0628\u06CC\u0639\u062A \u0645\u062A\u0646\u0627\u0633\u0628 \u0628\u0627 \u062A\u0645)","adm.tPortHint":"\u0628\u0631\u0627\u06CC \u067E\u0633\u200C\u0632\u0645\u06CC\u0646\u0647\u200C\u06CC \u0633\u0627\u062F\u0647 \u0648 \u062E\u0646\u062B\u06CC\u060C \u062E\u0627\u0645\u0648\u0634\u0634 \u06A9\u0646.","adm.tMode":"\u067E\u0648\u0633\u062A\u0647\u200C\u06CC \u067E\u06CC\u0634\u200C\u0641\u0631\u0636","adm.tRadius":"\u06AF\u0631\u062F\u06CC \u06AF\u0648\u0634\u0647\u200C\u0647\u0627","adm.tDensity":"\u062A\u0631\u0627\u06A9\u0645","adm.tBg":"\u0633\u0628\u06A9 \u067E\u0633\u200C\u0632\u0645\u06CC\u0646\u0647","adm.tContrast":"\u06A9\u0646\u062A\u0631\u0627\u0633\u062A","adm.tAnim":"\u0627\u0646\u06CC\u0645\u06CC\u0634\u0646\u200C\u0647\u0627","adm.uSearchPos":"\u0645\u062D\u0644 \u06A9\u0627\u062F\u0631 \u062C\u0633\u062A\u200C\u0648\u062C\u0648","adm.uHeader":"\u0686\u06CC\u062F\u0645\u0627\u0646 \u0633\u0631\u0628\u0631\u06AF","adm.uNav":"\u0633\u0628\u06A9 \u0645\u0646\u0648","adm.uCards":"\u0633\u0628\u06A9 \u06A9\u0627\u0631\u062A \u06A9\u0627\u0644\u0627","adm.uSticky":"\u0633\u0631\u0628\u0631\u06AF \u0686\u0633\u0628\u0627\u0646","adm.uTicker":"\u0646\u0648\u0627\u0631 \u062E\u0628\u0631\u06CC \u0628\u0627\u0644\u0627","adm.uTickerItems":"\u0645\u062A\u0646\u200C\u0647\u0627\u06CC \u0646\u0648\u0627\u0631 \u062E\u0628\u0631\u06CC","adm.uTickerSpeed":"\u0633\u0631\u0639\u062A \u0646\u0648\u0627\u0631 \u062E\u0628\u0631\u06CC","adm.uQuick":"\u0645\u0634\u0627\u0647\u062F\u0647\u200C\u06CC \u0633\u0631\u06CC\u0639 \u06A9\u0627\u0644\u0627","adm.uChat":"\u062F\u06A9\u0645\u0647\u200C\u06CC \u0634\u0646\u0627\u0648\u0631 \u067E\u0634\u062A\u06CC\u0628\u0627\u0646\u06CC","adm.uCrumb":"\u0646\u0645\u0627\u06CC\u0634 \u0645\u0633\u06CC\u0631 \u0635\u0641\u062D\u0647","adm.uCols":"\u0633\u062A\u0648\u0646\u200C\u0647\u0627\u06CC \u06A9\u0627\u0644\u0627","adm.uColsMobile":"\u0645\u0648\u0628\u0627\u06CC\u0644","adm.uColsTablet":"\u062A\u0628\u0644\u062A","adm.uColsDesktop":"\u062F\u0633\u06A9\u062A\u0627\u067E","adm.uColsWide":"\u0635\u0641\u062D\u0647\u200C\u06CC \u0639\u0631\u06CC\u0636","adm.uCardInfo":"\u0627\u0637\u0644\u0627\u0639\u0627\u062A \u0631\u0648\u06CC \u06A9\u0627\u0631\u062A \u06A9\u0627\u0644\u0627","adm.uPosStart":"\u0631\u0627\u0633\u062A (\u0622\u063A\u0627\u0632)","adm.uPosCenter":"\u0648\u0633\u0637","adm.uPosEnd":"\u0686\u067E (\u067E\u0627\u06CC\u0627\u0646)","adm.uLayoutLogoStart":"\u0644\u0648\u06AF\u0648 \u062F\u0631 \u0622\u063A\u0627\u0632","adm.uLayoutSplit":"\u0644\u0648\u06AF\u0648 \u0622\u063A\u0627\u0632 / \u062C\u0633\u062A\u200C\u0648\u062C\u0648 \u0648\u0633\u0637 / \u06A9\u0646\u0634\u200C\u0647\u0627 \u067E\u0627\u06CC\u0627\u0646","adm.uLayoutCentered":"\u0644\u0648\u06AF\u0648 \u062F\u0631 \u0648\u0633\u0637","adm.fHint":"\u0647\u0631 \u0627\u0645\u06A9\u0627\u0646\u06CC \u0631\u0627 \u06A9\u0647 \u0644\u0627\u0632\u0645 \u0646\u062F\u0627\u0631\u06CC \u062E\u0627\u0645\u0648\u0634 \u06A9\u0646\u061B \u0628\u062E\u0634 \u0645\u0631\u0628\u0648\u0637\u0647 \u0627\u0632 \u0633\u0627\u06CC\u062A \u0648 \u067E\u0646\u0644 \u062D\u0630\u0641 \u0645\u06CC\u200C\u0634\u0648\u062F.","adm.bLabel":"\u0686\u0627\u067E \u0628\u0631\u0686\u0633\u0628","adm.bSelect":"\u0627\u0646\u062A\u062E\u0627\u0628 \u06A9\u0627\u0644\u0627\u0647\u0627","adm.bSize":"\u0627\u0646\u062F\u0627\u0632\u0647\u200C\u06CC \u0628\u0631\u0686\u0633\u0628","adm.bCopies":"\u062A\u0639\u062F\u0627\u062F \u0646\u0633\u062E\u0647 \u0628\u0631\u0627\u06CC \u0647\u0631 \u06A9\u0627\u0644\u0627","adm.bShowName":"\u0646\u0627\u0645 \u06A9\u0627\u0644\u0627","adm.bShowPrice":"\u0642\u06CC\u0645\u062A","adm.bShowBrand":"\u0628\u0631\u0646\u062F","adm.bShowSku":"\u06A9\u062F \u06A9\u0627\u0644\u0627","adm.bShowQr":"\u06A9\u062F QR \u0635\u0641\u062D\u0647\u200C\u06CC \u06A9\u0627\u0644\u0627","adm.bType":"\u0646\u0648\u0639 \u0628\u0627\u0631\u06A9\u062F","adm.bPrint":"\u0686\u0627\u067E \u0628\u0631\u0686\u0633\u0628\u200C\u0647\u0627","adm.bGenerate":"\u0633\u0627\u062E\u062A \u0628\u0627\u0631\u06A9\u062F \u062C\u062F\u06CC\u062F","adm.igPack":"\u0628\u0633\u062A\u0647\u0654 \u067E\u0633\u062A \u0627\u06CC\u0646\u0633\u062A\u0627\u06AF\u0631\u0627\u0645","adm.igCap":"\u0645\u062A\u0646 \u067E\u0633\u062A (\u0642\u0627\u0628\u0644 \u0648\u06CC\u0631\u0627\u06CC\u0634 \u0642\u0628\u0644 \u0627\u0632 \u06A9\u067E\u06CC)","adm.igTags":"\u0647\u0634\u062A\u06AF\u200C\u0647\u0627","adm.igImgHint":"\u062A\u0635\u0648\u06CC\u0631 \u067E\u0633\u062A\u061B \u062F\u0627\u0646\u0644\u0648\u062F\u0634 \u06A9\u0646 \u0648 \u0628\u0627 \u0645\u062A\u0646 \u06A9\u0646\u0627\u0631\u0634 \u062F\u0631 \u0627\u06CC\u0646\u0633\u062A\u0627\u06AF\u0631\u0627\u0645 \u0645\u0646\u062A\u0634\u0631 \u06A9\u0646.","adm.igDl":"\u062F\u0627\u0646\u0644\u0648\u062F \u062A\u0635\u0648\u06CC\u0631","adm.igNoImg":"\u0627\u06CC\u0646 \u06A9\u0627\u0644\u0627 \u062A\u0635\u0648\u06CC\u0631 \u0646\u062F\u0627\u0631\u062F\u061B \u0627\u0648\u0644 \u0627\u0632 \u0628\u062E\u0634 \xAB\u062C\u0633\u062A\u200C\u0648\u062C\u0648\u06CC \u062A\u0635\u0648\u06CC\u0631\xBB \u06CC\u0627 \u0628\u0627\u0631\u06AF\u0630\u0627\u0631\u06CC\u060C \u0639\u06A9\u0633 \u0628\u06AF\u0630\u0627\u0631.","adm.igCopyCap":"\u06A9\u067E\u06CC \u0645\u062A\u0646","adm.igCopyTags":"\u06A9\u067E\u06CC \u0647\u0634\u062A\u06AF\u200C\u0647\u0627","adm.igCopyAll":"\u06A9\u067E\u06CC \u0645\u062A\u0646 + \u0647\u0634\u062A\u06AF","adm.bGenerated":"\u0628\u0627\u0631\u06A9\u062F \u0633\u0627\u062E\u062A\u0647 \u0648 \u062B\u0628\u062A \u0634\u062F","adm.bScan":"\u0627\u0633\u06A9\u0646 \u0628\u0627\u0631\u06A9\u062F","adm.bScanMode":"\u062D\u0627\u0644\u062A \u0627\u0633\u06A9\u0646\u0631 (\u0647\u0645\u06AF\u0627\u0645\u200C\u0633\u0627\u0632\u06CC \u062F\u0633\u062A\u06AF\u0627\u0647)","adm.bScanHint":"\u062F\u0633\u062A\u06AF\u0627\u0647 \u0628\u0627\u0631\u06A9\u062F\u062E\u0648\u0627\u0646 \u0631\u0627 \u0645\u062B\u0644 \u06A9\u06CC\u0628\u0648\u0631\u062F \u0648\u0635\u0644 \u06A9\u0646\u061B \u0631\u0648\u06CC \u06A9\u0627\u062F\u0631 \u0632\u06CC\u0631 \u06A9\u0644\u06CC\u06A9 \u06A9\u0646 \u0648 \u0627\u0633\u06A9\u0646 \u06A9\u0646. \u0627\u0633\u06A9\u0646 \u0628\u0627 \u062F\u0648\u0631\u0628\u06CC\u0646 \u0647\u0645 \u06A9\u0627\u0631 \u0645\u06CC\u200C\u06A9\u0646\u062F.","adm.bConnected":"\u062F\u0633\u062A\u06AF\u0627\u0647 \u0645\u062A\u0635\u0644 \u0634\u062F \u2014 \u0622\u0645\u0627\u062F\u0647\u200C\u06CC \u0627\u0633\u06A9\u0646","adm.bSerial":"\u0627\u062A\u0635\u0627\u0644 \u0645\u0633\u062A\u0642\u06CC\u0645 \u0628\u0627 Web Serial","adm.bSerialHint":"\u0627\u06AF\u0631 \u062F\u0633\u062A\u06AF\u0627\u0647\u062A \u067E\u0648\u0631\u062A \u0633\u0631\u06CC\u0627\u0644 \u06CC\u0627 USB \u062F\u0627\u0631\u062F\u060C \u0627\u0632 \u0627\u06CC\u0646\u062C\u0627 \u0648\u0635\u0644 \u0634\u0648 (\u0641\u0642\u0637 \u06A9\u0631\u0648\u0645 \u0648 \u0627\u062C \u062F\u0633\u06A9\u062A\u0627\u067E).","adm.bSerialUnsupported":"\u0645\u0631\u0648\u0631\u06AF\u0631 \u062A\u0648 \u0627\u0632 Web Serial \u067E\u0634\u062A\u06CC\u0628\u0627\u0646\u06CC \u0646\u0645\u06CC\u200C\u06A9\u0646\u062F\u061B \u0627\u0632 \u062D\u0627\u0644\u062A \u06A9\u06CC\u0628\u0648\u0631\u062F \u06CC\u0627 \u062F\u0648\u0631\u0628\u06CC\u0646 \u0627\u0633\u062A\u0641\u0627\u062F\u0647 \u06A9\u0646.","adm.bSerialConnected":"\u0645\u062A\u0635\u0644 \u0634\u062F","adm.bSerialClosed":"\u0627\u062A\u0635\u0627\u0644 \u0628\u0633\u062A\u0647 \u0634\u062F","adm.bHistory":"\u0627\u0633\u06A9\u0646\u200C\u0647\u0627\u06CC \u0627\u062E\u06CC\u0631","adm.isTitle":"\u0627\u06CC\u0646\u062F\u06A9\u0633 \u062A\u0635\u0648\u06CC\u0631 \u0628\u0631\u0627\u06CC \u062C\u0633\u062A\u200C\u0648\u062C\u0648\u06CC \u062A\u0635\u0648\u06CC\u0631\u06CC","adm.isHint":"\u06CC\u06A9\u200C\u0628\u0627\u0631 \u0627\u06CC\u0646\u062F\u06A9\u0633 \u0631\u0627 \u0628\u0633\u0627\u0632 \u062A\u0627 \u0645\u0634\u062A\u0631\u06CC\u200C\u0647\u0627 \u0628\u062A\u0648\u0627\u0646\u0646\u062F \u0628\u0627 \u0639\u06A9\u0633 \u062C\u0633\u062A\u200C\u0648\u062C\u0648 \u06A9\u0646\u0646\u062F. \u062F\u0631 \u0645\u0631\u0648\u0631\u06AF\u0631 \u062E\u0648\u062F\u062A \u0627\u062C\u0631\u0627 \u0645\u06CC\u200C\u0634\u0648\u062F \u0648 \u0628\u0627\u0631\u06CC \u0631\u0648\u06CC \u0633\u0631\u0648\u0631 \u0646\u062F\u0627\u0631\u062F.","adm.isBuild":"\u0633\u0627\u062E\u062A \u0627\u06CC\u0646\u062F\u06A9\u0633","adm.isBuilding":"\u062F\u0631 \u062D\u0627\u0644 \u0627\u06CC\u0646\u062F\u06A9\u0633\u200C\u0633\u0627\u0632\u06CC\u2026","adm.isDone":"\u0627\u06CC\u0646\u062F\u06A9\u0633 \u0633\u0627\u062E\u062A\u0647 \u0634\u062F","adm.isCount":"\u062A\u0635\u0648\u06CC\u0631\u0647\u0627\u06CC \u0627\u06CC\u0646\u062F\u06A9\u0633\u200C\u0634\u062F\u0647","adm.auditAction":"\u0631\u0648\u06CC\u062F\u0627\u062F","adm.auditActor":"\u06A9\u0627\u0631\u0628\u0631","adm.auditTarget":"\u0645\u0648\u0636\u0648\u0639","adm.auditMeta":"\u062C\u0632\u0626\u06CC\u0627\u062A","adm.statsRevenue":"\u062F\u0631\u0622\u0645\u062F","adm.statsVisits":"\u0628\u0627\u0632\u062F\u06CC\u062F","adm.statsOrders":"\u0633\u0641\u0627\u0631\u0634","adm.statsByCat":"\u0639\u0645\u0644\u06A9\u0631\u062F \u062F\u0633\u062A\u0647\u200C\u0647\u0627","adm.statsByBrand":"\u0641\u0631\u0648\u0634 \u0628\u0631 \u0627\u0633\u0627\u0633 \u0628\u0631\u0646\u062F","adm.statsStockValue":"\u0627\u0631\u0632\u0634 \u0645\u0648\u062C\u0648\u062F\u06CC","adm.statsAvgOrder":"\u0645\u06CC\u0627\u0646\u06AF\u06CC\u0646 \u0633\u0628\u062F \u062E\u0631\u06CC\u062F","adm.exportProducts":"\u062E\u0631\u0648\u062C\u06CC \u06A9\u0627\u0644\u0627\u0647\u0627","adm.exportOrders":"\u062E\u0631\u0648\u062C\u06CC \u0633\u0641\u0627\u0631\u0634\u200C\u0647\u0627","adm.exportUsers":"\u062E\u0631\u0648\u062C\u06CC \u06A9\u0627\u0631\u0628\u0631\u0627\u0646","adm.exportReviews":"\u062E\u0631\u0648\u062C\u06CC \u0646\u0638\u0631\u0627\u062A","adm.exportTickets":"\u062E\u0631\u0648\u062C\u06CC \u062A\u06CC\u06A9\u062A\u200C\u0647\u0627","adm.exportAudit":"\u062E\u0631\u0648\u062C\u06CC \u0631\u0648\u06CC\u062F\u0627\u062F\u0647\u0627","adm.exportAll":"\u067E\u0634\u062A\u06CC\u0628\u0627\u0646 \u06A9\u0627\u0645\u0644 (JSON)","adm.backup":"\u0633\u0627\u062E\u062A \u067E\u0634\u062A\u06CC\u0628\u0627\u0646","adm.cleanup":"\u067E\u0627\u06A9\u200C\u0633\u0627\u0632\u06CC \u062F\u0627\u062F\u0647\u200C\u0647\u0627\u06CC \u0642\u062F\u06CC\u0645\u06CC","adm.cleanupDone":"\u067E\u0627\u06A9\u200C\u0633\u0627\u0632\u06CC \u0627\u0646\u062C\u0627\u0645 \u0634\u062F","adm.pageEditHint":"\u0645\u062A\u0646 \u0635\u0641\u062D\u0647\u200C\u0647\u0627 \u0631\u0627 \u0627\u06CC\u0646\u062C\u0627 \u0648\u06CC\u0631\u0627\u06CC\u0634 \u06A9\u0646\u061B \u062A\u063A\u06CC\u06CC\u0631\u0647\u0627 \u0641\u0648\u0631\u0627\u064B \u062F\u0631 \u0633\u0627\u06CC\u062A \u0627\u0639\u0645\u0627\u0644 \u0645\u06CC\u200C\u0634\u0648\u062F.","adm.noPermission":"\u0628\u0631\u0627\u06CC \u0627\u06CC\u0646 \u0628\u062E\u0634 \u062F\u0633\u062A\u0631\u0633\u06CC \u0646\u062F\u0627\u0631\u06CC. \u0627\u0632 \u0645\u0627\u0644\u06A9 \u0628\u062E\u0648\u0627\u0647 \u0622\u0646 \u0631\u0627 \u0641\u0639\u0627\u0644 \u06A9\u0646\u062F.","adm.liveView":"\u067E\u06CC\u0634\u200C\u0646\u0645\u0627\u06CC\u0634 \u0632\u0646\u062F\u0647\u200C\u06CC \u062A\u063A\u06CC\u06CC\u0631\u0627\u062A","adm.saved":"\u0630\u062E\u06CC\u0631\u0647 \u0634\u062F","st.pending_payment":"\u062F\u0631 \u0627\u0646\u062A\u0638\u0627\u0631 \u067E\u0631\u062F\u0627\u062E\u062A","st.pending_review":"\u062F\u0631 \u0627\u0646\u062A\u0638\u0627\u0631 \u0628\u0631\u0631\u0633\u06CC","st.confirmed":"\u062A\u0623\u06CC\u06CC\u062F \u0634\u062F\u0647","st.preparing":"\u062F\u0631 \u062D\u0627\u0644 \u0622\u0645\u0627\u062F\u0647\u200C\u0633\u0627\u0632\u06CC","st.ready_pickup":"\u0622\u0645\u0627\u062F\u0647\u200C\u06CC \u062A\u062D\u0648\u06CC\u0644 \u062D\u0636\u0648\u0631\u06CC","st.shipped":"\u0627\u0631\u0633\u0627\u0644 \u0634\u062F\u0647","st.delivered":"\u062A\u062D\u0648\u06CC\u0644 \u0634\u062F\u0647","st.cancelled":"\u0644\u063A\u0648 \u0634\u062F\u0647","st.refunded":"\u0628\u0627\u0632\u06AF\u0634\u062A \u0648\u062C\u0647","st.returned":"\u0645\u0631\u062C\u0648\u0639 \u0634\u062F\u0647","dl.pickup":"\u062A\u062D\u0648\u06CC\u0644 \u062D\u0636\u0648\u0631\u06CC","dl.courier":"\u0627\u0631\u0633\u0627\u0644 \u067E\u0633\u062A\u06CC","pm.wallet":"\u06A9\u06CC\u0641 \u067E\u0648\u0644","pm.gateway":"\u062F\u0631\u06AF\u0627\u0647 \u0628\u0627\u0646\u06A9\u06CC","pm.cod":"\u067E\u0631\u062F\u0627\u062E\u062A \u062F\u0631 \u0645\u062D\u0644","ps.unpaid":"\u067E\u0631\u062F\u0627\u062E\u062A\u200C\u0646\u0634\u062F\u0647","ps.paid":"\u067E\u0631\u062F\u0627\u062E\u062A\u200C\u0634\u062F\u0647","ps.pending":"\u062F\u0631 \u0627\u0646\u062A\u0638\u0627\u0631","ps.refunded":"\u0628\u0627\u0632\u06AF\u0634\u062A \u062F\u0627\u062F\u0647 \u0634\u062F","ps.failed":"\u0646\u0627\u0645\u0648\u0641\u0642","ps.cancelled":"\u0644\u063A\u0648 \u0634\u062F\u0647","tc.order":"\u067E\u06CC\u06AF\u06CC\u0631\u06CC \u0633\u0641\u0627\u0631\u0634","tc.return":"\u0645\u0631\u062C\u0648\u0639\u06CC \u0648 \u0628\u0627\u0632\u06AF\u0634\u062A \u0648\u062C\u0647","tc.product":"\u0633\u0624\u0627\u0644 \u062F\u0631\u0628\u0627\u0631\u0647\u200C\u06CC \u06A9\u0627\u0644\u0627","tc.technical":"\u0645\u0634\u06A9\u0644 \u0641\u0646\u06CC \u0633\u0627\u06CC\u062A","tc.complaint":"\u0634\u06A9\u0627\u06CC\u062A","tc.partnership":"\u0647\u0645\u06A9\u0627\u0631\u06CC \u0648 \u062A\u0628\u0644\u06CC\u063A\u0627\u062A","tc.account":"\u062D\u0633\u0627\u0628 \u06A9\u0627\u0631\u0628\u0631\u06CC \u0648 \u0627\u0645\u0646\u06CC\u062A","tc.other":"\u0633\u0627\u06CC\u0631 \u0645\u0648\u0627\u0631\u062F","tp.critical":"\u0628\u062D\u0631\u0627\u0646\u06CC","tp.high":"\u0632\u06CC\u0627\u062F","tp.normal":"\u0645\u0639\u0645\u0648\u0644\u06CC","tp.low":"\u06A9\u0645","ft.suggestion":"\u067E\u06CC\u0634\u0646\u0647\u0627\u062F","ft.complaint":"\u0634\u06A9\u0627\u06CC\u062A","ft.bug":"\u06AF\u0632\u0627\u0631\u0634 \u062E\u0637\u0627","fs.new":"\u062C\u062F\u06CC\u062F","fs.seen":"\u062F\u06CC\u062F\u0647 \u0634\u062F\u0647","fs.in_progress":"\u062F\u0631 \u062D\u0627\u0644 \u067E\u06CC\u06AF\u06CC\u0631\u06CC","fs.done":"\u0627\u0646\u062C\u0627\u0645 \u0634\u062F\u0647","fs.rejected":"\u0631\u062F \u0634\u062F\u0647","tk.open":"\u0628\u0627\u0632","tk.answered":"\u067E\u0627\u0633\u062E \u062F\u0627\u062F\u0647 \u0634\u062F\u0647","tk.closed":"\u0628\u0633\u062A\u0647","feat.wallet":"\u06A9\u06CC\u0641 \u067E\u0648\u0644","feat.plus":"\u0627\u0634\u062A\u0631\u0627\u06A9 \u067E\u0644\u0627\u0633","feat.insurance":"\u0628\u06CC\u0645\u0647\u200C\u06CC \u0645\u0631\u0633\u0648\u0644\u0647","feat.tickets":"\u0633\u0627\u0645\u0627\u0646\u0647\u200C\u06CC \u062A\u06CC\u06A9\u062A","feat.reviews":"\u0646\u0638\u0631\u0627\u062A \u0645\u0634\u062A\u0631\u06CC\u0627\u0646","feat.questions":"\u0633\u0624\u0627\u0644\u0627\u062A \u0645\u0634\u062A\u0631\u06CC\u0627\u0646","feat.ads":"\u062A\u0628\u0644\u06CC\u063A\u0627\u062A \u062F\u0627\u062E\u0644 \u0633\u0627\u06CC\u062A","feat.imageSearch":"\u062C\u0633\u062A\u200C\u0648\u062C\u0648\u06CC \u062A\u0635\u0648\u06CC\u0631\u06CC","feat.barcode":"\u0628\u0627\u0631\u06A9\u062F \u0648 \u0628\u0631\u0686\u0633\u0628","feat.priceCheckDevice":"\u062D\u0627\u0644\u062A \u0646\u0645\u0627\u06CC\u0634 \u0642\u06CC\u0645\u062A","feat.publicStats":"\u0622\u0645\u0627\u0631 \u0639\u0645\u0648\u0645\u06CC","feat.coupons":"\u06A9\u062F\u0647\u0627\u06CC \u062A\u062E\u0641\u06CC\u0641","feat.consent":"\u0645\u0648\u062F\u0627\u0644 \u062A\u0648\u0627\u0641\u0642 \u06A9\u0648\u06A9\u06CC (\u0627\u0648\u0644\u06CC\u0646 \u0628\u0627\u0632\u062F\u06CC\u062F)","feat.liveSupport":"\u0686\u062A \u067E\u0634\u062A\u06CC\u0628\u0627\u0646\u06CC \u0622\u0646\u0644\u0627\u06CC\u0646","feat.announcements":"\u0627\u0639\u0644\u0627\u0646\u200C\u0647\u0627","feat.wishlist":"\u0644\u06CC\u0633\u062A \u0645\u0646","feat.compare":"\u0645\u0642\u0627\u06CC\u0633\u0647\u200C\u06CC \u06A9\u0627\u0644\u0627","feat.recentlyViewed":"\u06A9\u0627\u0644\u0627\u0647\u0627\u06CC \u062F\u06CC\u062F\u0647\u200C\u0634\u062F\u0647","feat.guestCheckout":"\u062E\u0631\u06CC\u062F \u0628\u062F\u0648\u0646 \u062D\u0633\u0627\u0628 \u06A9\u0627\u0631\u0628\u0631\u06CC","feat.priceAlerts":"\u0627\u0639\u0644\u0627\u0646 \u0645\u0648\u062C\u0648\u062F \u0634\u062F\u0646 \u06A9\u0627\u0644\u0627","feat.twoFactor":"\u0648\u0631\u0648\u062F \u062F\u0648\u0645\u0631\u062D\u0644\u0647\u200C\u0627\u06CC","feat.referrals":"\u06A9\u062F \u0645\u0639\u0631\u0641","feat.voiceSearch":"\u062C\u0633\u062A\u200C\u0648\u062C\u0648\u06CC \u0635\u0648\u062A\u06CC","feat.offlineMode":"\u062D\u0627\u0644\u062A \u0622\u0641\u0644\u0627\u06CC\u0646","feat.captcha":"\u06A9\u067E\u0686\u0627 (\u0645\u0646 \u0631\u0628\u0627\u062A \u0646\u06CC\u0633\u062A\u0645)","captcha.required":"\u0628\u0631\u0627\u06CC \u0648\u0631\u0648\u062F\u060C \u0627\u0648\u0644 \u062A\u0623\u06CC\u06CC\u062F \u06A9\u0646 \u06A9\u0647 \u0631\u0628\u0627\u062A \u0646\u06CC\u0633\u062A\u06CC: \u062A\u06CC\u06A9 \u0628\u0632\u0646 \u0648 \u062D\u0627\u0635\u0644 \u0639\u0628\u0627\u0631\u062A \u0631\u0627 \u0628\u0646\u0648\u06CC\u0633.","captcha.label":"\u0645\u0646 \u0631\u0628\u0627\u062A \u0646\u06CC\u0633\u062A\u0645","captcha.hint":"\u062A\u06CC\u06A9 \u0628\u0632\u0646\u060C \u0628\u0639\u062F \u062D\u0627\u0635\u0644 \u0639\u0628\u0627\u0631\u062A \u062A\u0635\u0648\u06CC\u0631 \u0631\u0627 \u0628\u0646\u0648\u06CC\u0633","captcha.placeholder":"\u062D\u0627\u0635\u0644 \u0639\u0628\u0627\u0631\u062A","captcha.solved":"\u062A\u0623\u06CC\u06CC\u062F \u0634\u062F \u06A9\u0647 \u0631\u0628\u0627\u062A \u0646\u06CC\u0633\u062A\u06CC \u2714","captcha.refresh":"\u0633\u0624\u0627\u0644 \u062A\u0627\u0632\u0647","perm.dashboard.view":"\u0645\u0634\u0627\u0647\u062F\u0647\u200C\u06CC \u062F\u0627\u0634\u0628\u0648\u0631\u062F","perm.products.view":"\u0645\u0634\u0627\u0647\u062F\u0647\u200C\u06CC \u06A9\u0627\u0644\u0627\u0647\u0627","perm.products.create":"\u0627\u06CC\u062C\u0627\u062F \u06A9\u0627\u0644\u0627","perm.products.edit":"\u0648\u06CC\u0631\u0627\u06CC\u0634 \u06A9\u0627\u0644\u0627","perm.products.delete":"\u062D\u0630\u0641 \u06A9\u0627\u0644\u0627","perm.products.price":"\u062A\u063A\u06CC\u06CC\u0631 \u0642\u06CC\u0645\u062A \u0648 \u062A\u062E\u0641\u06CC\u0641","perm.products.stock":"\u062A\u063A\u06CC\u06CC\u0631 \u0645\u0648\u062C\u0648\u062F\u06CC","perm.categories.manage":"\u0645\u062F\u06CC\u0631\u06CC\u062A \u062F\u0633\u062A\u0647\u200C\u0647\u0627 \u0648 \u0628\u0631\u0646\u062F\u0647\u0627","perm.orders.view":"\u0645\u0634\u0627\u0647\u062F\u0647\u200C\u06CC \u0633\u0641\u0627\u0631\u0634\u200C\u0647\u0627","perm.orders.manage":"\u062A\u063A\u06CC\u06CC\u0631 \u0648\u0636\u0639\u06CC\u062A \u0633\u0641\u0627\u0631\u0634","perm.refunds.manage":"\u0645\u0631\u062C\u0648\u0639\u06CC \u0648 \u0644\u063A\u0648 \u0633\u0641\u0627\u0631\u0634","perm.reviews.moderate":"\u062A\u0623\u06CC\u06CC\u062F \u0648 \u0645\u062F\u06CC\u0631\u06CC\u062A \u0646\u0638\u0631\u0627\u062A","perm.reviews.reply":"\u067E\u0627\u0633\u062E \u0628\u0647 \u0646\u0638\u0631\u0627\u062A","perm.tickets.manage":"\u0645\u062F\u06CC\u0631\u06CC\u062A \u062A\u06CC\u06A9\u062A\u200C\u0647\u0627","perm.feedback.manage":"\u0628\u0627\u0632\u062E\u0648\u0631\u062F\u0647\u0627 \u0648 \u062E\u0637\u0627\u0647\u0627","perm.users.view":"\u0645\u0634\u0627\u0647\u062F\u0647\u200C\u06CC \u06A9\u0627\u0631\u0628\u0631\u0627\u0646","perm.users.manage":"\u0645\u062F\u06CC\u0631\u06CC\u062A \u06A9\u0627\u0631\u0628\u0631\u0627\u0646","perm.users.permissions":"\u062A\u0639\u06CC\u06CC\u0646 \u062F\u0633\u062A\u0631\u0633\u06CC\u200C\u0647\u0627","perm.wallet.manage":"\u0645\u062F\u06CC\u0631\u06CC\u062A \u06A9\u06CC\u0641 \u067E\u0648\u0644","perm.plus.manage":"\u0645\u062F\u06CC\u0631\u06CC\u062A \u0627\u0634\u062A\u0631\u0627\u06A9 \u067E\u0644\u0627\u0633","perm.coupons.manage":"\u0645\u062F\u06CC\u0631\u06CC\u062A \u06A9\u062F\u0647\u0627\u06CC \u062A\u062E\u0641\u06CC\u0641","perm.ads.manage":"\u0645\u062F\u06CC\u0631\u06CC\u062A \u062A\u0628\u0644\u06CC\u063A\u0627\u062A","perm.notifications.send":"\u0627\u0631\u0633\u0627\u0644 \u0627\u0639\u0644\u0627\u0646","perm.settings.edit":"\u062A\u0646\u0638\u06CC\u0645\u0627\u062A \u0641\u0631\u0648\u0634\u06AF\u0627\u0647","perm.theme.edit":"\u067E\u0648\u0633\u062A\u0647 \u0648 \u0686\u06CC\u062F\u0645\u0627\u0646","perm.pages.edit":"\u0648\u06CC\u0631\u0627\u06CC\u0634 \u0645\u062D\u062A\u0648\u0627\u06CC \u0635\u0641\u062D\u0647\u200C\u0647\u0627","perm.barcode.print":"\u0686\u0627\u067E \u0628\u0631\u0686\u0633\u0628","perm.barcode.scan":"\u0627\u0633\u06A9\u0646 \u0648 \u0646\u0645\u0627\u06CC\u0634 \u0642\u06CC\u0645\u062A","perm.imagesearch.index":"\u0627\u06CC\u0646\u062F\u06A9\u0633 \u062A\u0635\u0648\u06CC\u0631\u06CC","perm.audit.view":"\u06AF\u0632\u0627\u0631\u0634 \u0631\u0648\u06CC\u062F\u0627\u062F\u0647\u0627","perm.stats.view":"\u0622\u0645\u0627\u0631","perm.data.export":"\u062E\u0631\u0648\u062C\u06CC \u062F\u0627\u062F\u0647\u200C\u0647\u0627","misc.quickView":"\u0645\u0634\u0627\u0647\u062F\u0647\u200C\u06CC \u0633\u0631\u06CC\u0639","misc.addToHome":"\u0627\u0641\u0632\u0648\u062F\u0646 \u0628\u0647 \u0635\u0641\u062D\u0647\u200C\u06CC \u0627\u0635\u0644\u06CC","misc.installHint":"\u062F\u0631 \u0645\u0646\u0648\u06CC \u0645\u0631\u0648\u0631\u06AF\u0631\u060C \u06AF\u0632\u06CC\u0646\u0647\u200C\u06CC \xABAdd to Home screen\xBB \u06CC\u0627 \xABInstall\xBB \u0631\u0627 \u0628\u0632\u0646.","misc.printBlocked":"\u067E\u0646\u062C\u0631\u0647\u200C\u06CC \u0686\u0627\u067E \u0628\u0627\u0632 \u0646\u0634\u062F\u061B \u0644\u0637\u0641\u0627\u064B \u067E\u0627\u067E\u200C\u0622\u067E \u0631\u0627 \u0645\u062C\u0627\u0632 \u06A9\u0646.","misc.saved":"\u0630\u062E\u06CC\u0631\u0647 \u0634\u062F","misc.deleted":"\u062D\u0630\u0641 \u0634\u062F","misc.updated":"\u0628\u0647\u200C\u0631\u0648\u0632\u0631\u0633\u0627\u0646\u06CC \u0634\u062F","misc.confirmDelete":"\u0627\u06CC\u0646 \u0645\u0648\u0631\u062F \u062D\u0630\u0641 \u0634\u0648\u062F\u061F","misc.loadingMore":"\u062F\u0631 \u062D\u0627\u0644 \u0628\u0627\u0631\u06AF\u0630\u0627\u0631\u06CC\u2026","misc.recentlyViewed":"\u06A9\u0627\u0644\u0627\u0647\u0627\u06CC \u062F\u06CC\u062F\u0647\u200C\u0634\u062F\u0647","misc.uiSound":"\u0635\u062F\u0627\u06CC \u06A9\u0644\u06CC\u06A9 \u0631\u0627\u0628\u0637","misc.uiSoundOn":"\u0635\u062F\u0627\u06CC \u06A9\u0644\u06CC\u06A9 \u0631\u0648\u0634\u0646 \u0634\u062F","misc.uiSoundOff":"\u0635\u062F\u0627\u06CC \u06A9\u0644\u06CC\u06A9 \u062E\u0627\u0645\u0648\u0634 \u0634\u062F","misc.shareDone":"\u0644\u06CC\u0646\u06A9 \u06A9\u067E\u06CC \u0634\u062F","misc.shareNative":"\u0627\u0634\u062A\u0631\u0627\u06A9\u200C\u06AF\u0630\u0627\u0631\u06CC","img.alt":"\u062A\u0635\u0648\u06CC\u0631 \u06A9\u0627\u0644\u0627","adm.view":"\u0645\u0634\u0627\u0647\u062F\u0647","adm.support":"\u0686\u062A \u067E\u0634\u062A\u06CC\u0628\u0627\u0646\u06CC","adm.supSelect":"\u06CC\u06A9 \u06AF\u0641\u062A\u200C\u0648\u06AF\u0648 \u0631\u0627 \u0627\u0646\u062A\u062E\u0627\u0628 \u06A9\u0646","adm.supSelectHint":"\u0627\u0632 \u0641\u0647\u0631\u0633\u062A \u06A9\u0646\u0627\u0631\u060C \u06AF\u0641\u062A\u200C\u0648\u06AF\u0648\u06CC \u06A9\u0627\u0631\u0628\u0631 \u0631\u0627 \u0628\u0627\u0632 \u06A9\u0646 \u062A\u0627 \u067E\u0627\u0633\u062E \u0628\u062F\u0647\u06CC.","adm.tkReply":"\u067E\u0627\u0633\u062E \u067E\u0634\u062A\u06CC\u0628\u0627\u0646\u06CC","adm.tkManage":"\u0645\u062F\u06CC\u0631\u06CC\u062A \u062A\u06CC\u06A9\u062A","common.updated":"\u0628\u0647\u200C\u0631\u0648\u0632\u0631\u0633\u0627\u0646\u06CC","common.link":"\u0644\u06CC\u0646\u06A9","common.text":"\u0645\u062A\u0646","cart.coupon":"\u06A9\u062F \u062A\u062E\u0641\u06CC\u0641","misc.sent":"\u0627\u0631\u0633\u0627\u0644 \u0634\u062F","misc.copied":"\u06A9\u067E\u06CC \u0634\u062F","adm.revPending":"\u062F\u0631 \u0627\u0646\u062A\u0638\u0627\u0631 \u0628\u0631\u0631\u0633\u06CC","adm.revApproved":"\u0645\u0646\u062A\u0634\u0631\u0634\u062F\u0647","adm.revRejected":"\u0631\u062F\u0634\u062F\u0647","adm.revApprove":"\u0627\u0646\u062A\u0634\u0627\u0631","adm.revReject":"\u0631\u062F","adm.revReply":"\u067E\u0627\u0633\u062E \u0641\u0631\u0648\u0634\u06AF\u0627\u0647","adm.revEmpty":"\u0645\u0648\u0631\u062F\u06CC \u062F\u0631 \u0627\u06CC\u0646 \u0648\u0636\u0639\u06CC\u062A \u0646\u06CC\u0633\u062A","adm.revEmptyHint":"\u0646\u0638\u0631 \u06CC\u0627 \u067E\u0631\u0633\u0634 \u062A\u0627\u0632\u0647\u200C\u0627\u06CC \u0628\u0631\u0627\u06CC \u0628\u0631\u0631\u0633\u06CC \u0648\u062C\u0648\u062F \u0646\u062F\u0627\u0631\u062F.","rev.buyer":"\u062E\u0631\u06CC\u062F\u0627\u0631","rev.visitor":"\u0628\u0627\u0632\u062F\u06CC\u062F\u06A9\u0646\u0646\u062F\u0647","rev.shopReply":"\u067E\u0627\u0633\u062E \u0641\u0631\u0648\u0634\u06AF\u0627\u0647","fb.new":"\u062C\u062F\u06CC\u062F","fb.seen":"\u062F\u06CC\u062F\u0647 \u0634\u062F","fb.inProgress":"\u062F\u0631 \u062D\u0627\u0644 \u0628\u0631\u0631\u0633\u06CC","fb.done":"\u0627\u0646\u062C\u0627\u0645 \u0634\u062F","fb.rejected":"\u0631\u062F \u0634\u062F","feedback.suggestion":"\u067E\u06CC\u0634\u0646\u0647\u0627\u062F","feedback.complaint":"\u0634\u06A9\u0627\u06CC\u062A","feedback.bug":"\u06AF\u0632\u0627\u0631\u0634 \u062E\u0637\u0627","adm.fbEmptyHint":"\u067E\u06CC\u0634\u0646\u0647\u0627\u062F\u060C \u0634\u06A9\u0627\u06CC\u062A \u06CC\u0627 \u06AF\u0632\u0627\u0631\u0634 \u062E\u0637\u0627\u06CC\u06CC \u062B\u0628\u062A \u0646\u0634\u062F\u0647 \u0627\u0633\u062A.","adm.cpNew":"\u06A9\u062F \u062A\u062E\u0641\u06CC\u0641 \u062C\u062F\u06CC\u062F","adm.cpPercent":"\u062F\u0631\u0635\u062F\u06CC","adm.cpAmount":"\u0645\u0628\u0644\u063A\u06CC","adm.cpValue":"\u0645\u0642\u062F\u0627\u0631","adm.cpUsage":"\u0627\u0633\u062A\u0641\u0627\u062F\u0647","adm.cpDates":"\u0628\u0627\u0632\u0647\u200C\u06CC \u0627\u0639\u062A\u0628\u0627\u0631","adm.cpStart":"\u0634\u0631\u0648\u0639","adm.cpEnd":"\u067E\u0627\u06CC\u0627\u0646","adm.cpExpired":"\u0645\u0646\u0642\u0636\u06CC","adm.adNew":"\u0628\u0646\u0631 \u062C\u062F\u06CC\u062F","adm.adSlot":"\u062C\u0627\u06CC\u06AF\u0627\u0647 \u0646\u0645\u0627\u06CC\u0634","adm.adsHint":"\u0628\u0646\u0631\u0647\u0627 \u0631\u0627 \u062F\u0631 \u0647\u0631 \u062C\u0627\u06CC \u0633\u0627\u06CC\u062A \u0632\u0645\u0627\u0646\u200C\u0628\u0646\u062F\u06CC\u060C \u0641\u0639\u0627\u0644 \u06CC\u0627 \u063A\u06CC\u0631\u0641\u0639\u0627\u0644 \u06A9\u0646.","adm.notifNew":"\u0627\u0639\u0644\u0627\u0646 \u062C\u062F\u06CC\u062F","adm.notifHint":"\u0627\u0639\u0644\u0627\u0646 \u0631\u0627 \u0628\u0631\u0627\u06CC \u0647\u0645\u0647\u200C\u06CC \u06A9\u0627\u0631\u0628\u0631\u0627\u0646 \u06CC\u0627 \u06CC\u06A9 \u06A9\u0627\u0631\u0628\u0631 \u062E\u0627\u0635 \u0628\u0641\u0631\u0633\u062A.","adm.notifLevel":"\u0633\u0637\u062D","adm.notifRecent":"\u0627\u0639\u0644\u0627\u0646\u200C\u0647\u0627\u06CC \u0627\u062E\u06CC\u0631","notif.level.info":"\u0627\u0637\u0644\u0627\u0639","notif.level.success":"\u0645\u0648\u0641\u0642","notif.level.warning":"\u0647\u0634\u062F\u0627\u0631","notif.level.error":"\u062E\u0637\u0627","adm.pagesPick":"\u06CC\u06A9 \u0635\u0641\u062D\u0647 \u0631\u0627 \u0627\u0646\u062A\u062E\u0627\u0628 \u06A9\u0646","adm.pagesPickHint":"\u0627\u0632 \u0641\u0647\u0631\u0633\u062A \u06A9\u0646\u0627\u0631\u060C \u0635\u0641\u062D\u0647\u200C\u0627\u06CC \u0631\u0627 \u06A9\u0647 \u0645\u06CC\u200C\u062E\u0648\u0627\u0647\u06CC \u0648\u06CC\u0631\u0627\u06CC\u0634 \u06A9\u0646\u06CC \u0627\u0646\u062A\u062E\u0627\u0628 \u06A9\u0646.","adm.pgHint":"\u062A\u063A\u06CC\u06CC\u0631\u0647\u0627 \u0641\u0642\u0637 \u0645\u062A\u0646\u200C\u0627\u0646\u062F \u0648 \u0628\u0644\u0627\u0641\u0627\u0635\u0644\u0647 \u0631\u0648\u06CC \u0635\u0641\u062D\u0647 \u0627\u0639\u0645\u0627\u0644 \u0645\u06CC\u200C\u0634\u0648\u0646\u062F.","adm.bPrinter":"\u0686\u0627\u067E\u06AF\u0631 \u0628\u0631\u0686\u0633\u0628","adm.bPrinterHint":"\u0628\u0631\u0686\u0633\u0628\u200C\u0647\u0627 \u0627\u0632 \u0631\u0627\u0647 \u06AF\u0641\u062A\u200C\u0648\u06AF\u0648\u06CC \u0686\u0627\u067E \u0645\u0631\u0648\u0631\u06AF\u0631 \u0628\u0647 \u0686\u0627\u067E\u06AF\u0631 \u0641\u0631\u0633\u062A\u0627\u062F\u0647 \u0645\u06CC\u200C\u0634\u0648\u0646\u062F.","adm.bScanner":"\u0628\u0627\u0631\u06A9\u062F\u062E\u0648\u0627\u0646","adm.bLabels":"\u0633\u0627\u062E\u062A \u0648 \u0686\u0627\u067E \u0628\u0631\u0686\u0633\u0628","adm.bPreview":"\u067E\u06CC\u0634\u200C\u0646\u0645\u0627\u06CC\u0634 \u0628\u0631\u0686\u0633\u0628","adm.bPriceMode":"\u062D\u0627\u0644\u062A \u0646\u0645\u0627\u06CC\u0634 \u0642\u06CC\u0645\u062A","adm.bFound":"\u06A9\u0627\u0644\u0627 \u067E\u06CC\u062F\u0627 \u0634\u062F","adm.bNotFound":"\u06A9\u0627\u0644\u0627\u06CC\u06CC \u0628\u0627 \u0627\u06CC\u0646 \u0628\u0627\u0631\u06A9\u062F \u067E\u06CC\u062F\u0627 \u0646\u0634\u062F.","adm.bPickFirst":"\u0627\u0648\u0644 \u062F\u0633\u062A\u200C\u06A9\u0645 \u06CC\u06A9 \u06A9\u0627\u0644\u0627 \u0631\u0627 \u0627\u0646\u062A\u062E\u0627\u0628 \u06A9\u0646.","adm.ixHint":"\u0627\u062B\u0631\u0627\u0646\u06AF\u0634\u062A \u062A\u0635\u0648\u06CC\u0631 \u0647\u0631 \u06A9\u0627\u0644\u0627 \u062F\u0631 \u0645\u0631\u0648\u0631\u06AF\u0631 \u0645\u062D\u0627\u0633\u0628\u0647 \u0648 \u0630\u062E\u06CC\u0631\u0647 \u0645\u06CC\u200C\u0634\u0648\u062F \u062A\u0627 \u062C\u0633\u062A\u200C\u0648\u062C\u0648\u06CC \u062A\u0635\u0648\u06CC\u0631\u06CC \u06A9\u0627\u0631 \u06A9\u0646\u062F.","adm.ixIndex":"\u0627\u06CC\u0646\u062F\u06A9\u0633 \u062A\u0635\u0627\u0648\u06CC\u0631 \u0628\u0627\u0642\u06CC\u200C\u0645\u0627\u0646\u062F\u0647","adm.ixReindex":"\u0627\u06CC\u0646\u062F\u06A9\u0633 \u062F\u0648\u0628\u0627\u0631\u0647\u200C\u06CC \u0647\u0645\u0647","adm.ixDone":"\u0627\u06CC\u0646\u062F\u06A9\u0633 \u0627\u0646\u062C\u0627\u0645 \u0634\u062F","adm.audActor":"\u06A9\u0627\u0631\u0628\u0631","adm.audAction":"\u0631\u0648\u06CC\u062F\u0627\u062F","adm.audTarget":"\u0647\u062F\u0641","adm.audMeta":"\u062C\u0632\u0626\u06CC\u0627\u062A","adm.stOrders":"\u0633\u0641\u0627\u0631\u0634\u200C\u0647\u0627","adm.stRevenue":"\u062F\u0631\u0622\u0645\u062F","adm.stVisits":"\u0628\u0627\u0632\u062F\u06CC\u062F\u0647\u0627","adm.stUsers":"\u06A9\u0627\u0631\u0628\u0631\u0627\u0646","adm.stProducts":"\u06A9\u0627\u0644\u0627\u0647\u0627","adm.stAvg":"\u0645\u06CC\u0627\u0646\u06AF\u06CC\u0646 \u0633\u0641\u0627\u0631\u0634","adm.stByCat":"\u0639\u0645\u0644\u06A9\u0631\u062F \u062F\u0633\u062A\u0647\u200C\u0647\u0627","adm.stByBrand":"\u067E\u0631\u0641\u0631\u0648\u0634\u200C\u062A\u0631\u06CC\u0646 \u0628\u0631\u0646\u062F\u0647\u0627","adm.data":"\u062F\u0627\u062F\u0647\u200C\u0647\u0627","adm.dataHint":"\u062E\u0631\u0648\u062C\u06CC \u06AF\u0631\u0641\u062A\u0646\u060C \u067E\u0634\u062A\u06CC\u0628\u0627\u0646\u200C\u06AF\u06CC\u0631\u06CC \u0648 \u067E\u0627\u06A9\u200C\u0633\u0627\u0632\u06CC \u062F\u0627\u062F\u0647\u200C\u0647\u0627.","adm.dExport":"\u062E\u0631\u0648\u062C\u06CC","adm.dBackup":"\u067E\u0634\u062A\u06CC\u0628\u0627\u0646\u200C\u06AF\u06CC\u0631\u06CC","adm.dBackupHint":"\u06CC\u06A9 \u0646\u0633\u062E\u0647\u200C\u06CC \u06A9\u0627\u0645\u0644 \u0627\u0632 \u067E\u0627\u06CC\u06AF\u0627\u0647\u200C\u062F\u0627\u062F\u0647 \u062F\u0631 \u067E\u0648\u0634\u0647\u200C\u06CC data \u0630\u062E\u06CC\u0631\u0647 \u0645\u06CC\u200C\u0634\u0648\u062F.","adm.dCleanup":"\u067E\u0627\u06A9\u200C\u0633\u0627\u0632\u06CC","adm.dCleanupHint":"\u0631\u0648\u06CC\u062F\u0627\u062F\u0647\u0627\u06CC \u0642\u062F\u06CC\u0645\u06CC\u200C\u062A\u0631 \u0627\u0632 \u06F9\u06F0 \u0631\u0648\u0632 \u0648 \u0646\u0634\u0633\u062A\u200C\u0647\u0627\u06CC \u0645\u0646\u0642\u0636\u06CC \u062D\u0630\u0641 \u0645\u06CC\u200C\u0634\u0648\u0646\u062F.","sys.turnOn":"\u0631\u0648\u0634\u0646 \u06A9\u0631\u062F\u0646 \u0641\u0631\u0648\u0634\u06AF\u0627\u0647","sys.turnOff":"\u062E\u0627\u0645\u0648\u0634 \u06A9\u0631\u062F\u0646 \u0641\u0631\u0648\u0634\u06AF\u0627\u0647","sys.offConfirm":"\u0645\u0637\u0645\u0626\u0646\u06CC\u061F \u062A\u0627 \u0648\u0642\u062A\u06CC \u062E\u0648\u062F\u062A \u0631\u0648\u0634\u0646\u0634 \u0646\u06A9\u0646\u06CC \u0647\u06CC\u0686\u200C\u06A9\u0633 \u0646\u0645\u06CC\u200C\u062A\u0648\u0627\u0646\u062F \u062E\u0631\u06CC\u062F \u06A9\u0646\u062F.","sys.autoWakeMins":"\u0631\u0648\u0634\u0646 \u0634\u062F\u0646 \u062E\u0648\u062F\u06A9\u0627\u0631 \u0628\u0639\u062F \u0627\u0632 \u0686\u0646\u062F \u062F\u0642\u06CC\u0642\u0647 (\u06F0 = \u0647\u06CC\u0686\u200C\u0648\u0642\u062A)","sys.asleep":"\u0641\u0631\u0648\u0634\u06AF\u0627\u0647 \u062E\u0627\u0645\u0648\u0634 \u0634\u062F.","sys.asleepTimed":"\u0641\u0631\u0648\u0634\u06AF\u0627\u0647 \u062E\u0627\u0645\u0648\u0634 \u0634\u062F\u061B {n} \u062F\u0642\u06CC\u0642\u0647 \u062F\u06CC\u06AF\u0631 \u062E\u0648\u062F\u06A9\u0627\u0631 \u0631\u0648\u0634\u0646 \u0645\u06CC\u200C\u0634\u0648\u062F.","sys.awake":"\u0641\u0631\u0648\u0634\u06AF\u0627\u0647 \u0631\u0648\u0634\u0646 \u0634\u062F.","sys.sleepBanner":"\u0641\u0631\u0648\u0634\u06AF\u0627\u0647 \u0627\u0644\u0627\u0646 \u062E\u0627\u0645\u0648\u0634 \u0627\u0633\u062A. \u0628\u0627 \u062F\u06A9\u0645\u0647\u200C\u06CC \xAB\u0631\u0648\u0634\u0646 \u06A9\u0631\u062F\u0646 \u0641\u0631\u0648\u0634\u06AF\u0627\u0647\xBB \u0628\u0627\u0644\u0627\u06CC \u0647\u0645\u06CC\u0646 \u0635\u0641\u062D\u0647 \u062F\u0648\u0628\u0627\u0631\u0647 \u0631\u0648\u0634\u0646\u0634 \u06A9\u0646.","sys.keepAlive":"\u0646\u06AF\u0647\u200C\u062F\u0627\u0634\u062A\u0646 \u0633\u0631\u0648\u06CC\u0633 \u0641\u0639\u0627\u0644","checkout.guestInfo":"\u0627\u0637\u0644\u0627\u0639\u0627\u062A \u062A\u0645\u0627\u0633 \u0645\u0647\u0645\u0627\u0646","checkout.guestHint":"\u0628\u062F\u0648\u0646 \u0633\u0627\u062E\u062A \u062D\u0633\u0627\u0628 \u062E\u0631\u06CC\u062F \u0645\u06CC\u200C\u06A9\u0646\u06CC\u061B \u0641\u0642\u0637 \u0628\u0631\u0627\u06CC \u0647\u0645\u0627\u0647\u0646\u06AF\u06CC \u062A\u062D\u0648\u06CC\u0644 \u0628\u0647 \u0627\u06CC\u0646 \u0627\u0637\u0644\u0627\u0639\u0627\u062A \u0646\u06CC\u0627\u0632 \u062F\u0627\u0631\u06CC\u0645.","checkout.guestName":"\u0646\u0627\u0645 \u0648 \u0646\u0627\u0645 \u062E\u0627\u0646\u0648\u0627\u062F\u06AF\u06CC","checkout.guestPhone":"\u0634\u0645\u0627\u0631\u0647\u200C\u06CC \u0645\u0648\u0628\u0627\u06CC\u0644","checkout.guestPhoneHint":"\u0645\u062B\u0644\u0627\u064B \u06F0\u06F9\u06F1\u06F2\u06F3\u06F4\u06F5\u06F6\u06F7\u06F8\u06F9","checkout.guestNameRequired":"\u0646\u0627\u0645 \u062E\u0648\u062F \u0631\u0627 \u0628\u0646\u0648\u06CC\u0633.","checkout.guestPhoneInvalid":"\u0634\u0645\u0627\u0631\u0647\u200C\u06CC \u0645\u0648\u0628\u0627\u06CC\u0644 \u0628\u0627\u06CC\u062F \u06F1\u06F1 \u0631\u0642\u0645 \u0648 \u0628\u0627 \u06F0\u06F9 \u0634\u0631\u0648\u0639 \u0634\u0648\u062F.","checkout.guestCodPickup":"\u067E\u0631\u062F\u0627\u062E\u062A \u062F\u0631 \u0645\u062D\u0644 \u0641\u0642\u0637 \u0628\u0631\u0627\u06CC \u0627\u0631\u0633\u0627\u0644 \u067E\u0633\u062A\u06CC \u0645\u0645\u06A9\u0646 \u0627\u0633\u062A\u061B \u0628\u0631\u0627\u06CC \u062A\u062D\u0648\u06CC\u0644 \u062D\u0636\u0648\u0631\u06CC\u060C \u0622\u0646\u0644\u0627\u06CC\u0646 \u067E\u0631\u062F\u0627\u062E\u062A \u06A9\u0646 \u06CC\u0627 \u0648\u0627\u0631\u062F \u062D\u0633\u0627\u0628 \u0634\u0648.","home.recent":"\u0627\u062F\u0627\u0645\u0647\u200C\u06CC \u0628\u0627\u0632\u062F\u06CC\u062F\u0647\u0627\u06CC \u0634\u0645\u0627","home.recentSub":"\u06A9\u0627\u0644\u0627\u0647\u0627\u06CC\u06CC \u06A9\u0647 \u0627\u062E\u06CC\u0631\u0627\u064B \u062F\u06CC\u062F\u0647\u200C\u0627\u06CC","checkout.guestCourierNote":"\u0628\u0631\u0627\u06CC \u0627\u0631\u0633\u0627\u0644 \u067E\u0633\u062A\u06CC \u0648\u0627\u0631\u062F \u062D\u0633\u0627\u0628 \u0634\u0648"},To={"app.name":"Yassaei Electronics","app.tagline":"Electronics & electrical supplies","common.loading":"Loading\u2026","common.save":"Save","common.saving":"Saving\u2026","common.cancel":"Cancel","common.close":"Close","common.confirm":"Confirm","common.delete":"Delete","common.edit":"Edit","common.add":"Add","common.create":"Create","common.update":"Update","common.search":"Search","common.filter":"Filter","common.filters":"Filters","common.sort":"Sort","common.all":"All","common.none":"None","common.more":"More","common.less":"Less","common.showAll":"View all","common.back":"Back","common.next":"Next","common.prev":"Previous","common.yes":"Yes","common.no":"No","common.optional":"Optional","common.required":"Required","common.copy":"Copy","common.copied":"Copied","common.share":"Share","common.download":"Download","common.upload":"Upload","common.print":"Print","common.refresh":"Refresh","common.retry":"Try again","common.send":"Send","common.sent":"Sent","common.submit":"Submit","common.reply":"Reply","common.view":"View","common.details":"Details","common.status":"Status","common.date":"Date","common.time":"Time","common.amount":"Amount","common.count":"Quantity","common.total":"Total","common.price":"Price","common.stock":"Stock","common.available":"In stock","common.unavailable":"Out of stock","common.inStock":"Available in stock","common.lowStock":"Fewer than 3 left","common.notifyMe":"Notify me when available","common.notified":"We will let you know as soon as it is back","common.category":"Category","common.brand":"Brand","common.product":"Product","common.products":"Products","common.order":"Order","common.orders":"Orders","common.user":"User","common.users":"Users","common.result":"Result","common.results":"Results","common.noResult":"No results found","common.error":"Error","common.success":"Done","common.warning":"Notice","common.note":"Note","common.notes":"Notes","common.description":"Description","common.specs":"Specifications","common.actions":"Actions","common.active":"Active","common.inactive":"Inactive","common.enabled":"On","common.disabled":"Off","common.on":"On","common.off":"Off","common.from":"From","common.to":"To","common.and":"and","common.or":"or","common.today":"Today","common.yesterday":"Yesterday","common.toman":"Toman","common.rial":"Rial","common.page":"Page","common.of":"of","common.items":"items","common.new":"New","common.old":"Old","common.apply":"Apply","common.reset":"Reset","common.clear":"Clear","common.select":"Please select","common.title":"Title","common.body":"Message","common.type":"Type","common.priority":"Priority","common.answer":"Answer","common.message":"Message","common.messages":"Messages","common.attach":"Attachment","common.image":"Image","common.images":"Images","common.phone":"Mobile number","common.email":"Email","common.address":"Address","common.city":"City","common.province":"Province","common.postal":"Postal code","common.name":"Name","common.fullName":"Full name","common.username":"Username","common.password":"Password","common.passwordConfirm":"Repeat password","common.login":"Sign in","common.logout":"Sign out","common.register":"Register","common.guest":"Guest","common.admin":"Admin","common.settings":"Settings","common.help":"Help","common.home":"Home","common.skip":"Skip","common.done":"Done","common.pending":"Pending","common.approved":"Approved","common.rejected":"Rejected","common.open":"Open","common.closed":"Closed","common.all2":"All items","common.never":"Never","common.empty":"Empty","common.secure":"Secure","common.free":"Free","common.unit":"pcs","common.day":"day","common.hour":"hour","common.minute":"minute","common.second":"second","common.percent":"percent","common.discount":"Discount","common.discountCode":"Discount code","common.shipping":"Shipping cost","common.insurance":"Shipment insurance","common.subtotal":"Items subtotal","common.payable":"Amount payable","common.payment":"Payment","common.cart":"Cart","common.wishlist":"My list","common.compare":"Compare","common.profile":"Profile","common.wallet":"Wallet","common.balance":"Balance","common.transactions":"Transactions","common.deposit":"Top up wallet","common.points":"Points","common.ticket":"Ticket","common.tickets":"Tickets","common.support":"Support","common.review":"Review","common.reviews":"Reviews","common.question":"Question","common.questions":"Customer questions","common.rating":"Rating","common.notification":"Notification","common.notifications":"Notifications","common.security":"Security","common.history":"History","common.report":"Report","common.bug":"Bug report","common.suggestion":"Suggestion","common.complaint":"Complaint","common.law":"Terms & conditions","common.privacy":"Privacy policy","common.about":"About us","common.contact":"Contact us","common.faq":"FAQ","common.guide":"Buying guide","common.services":"Customer services","common.stats":"Store statistics","common.searchProducts":"Search products\u2026","common.noData":"Nothing to show","common.tryAgain":"Try again","common.showMore":"Show more","common.perPage":"Per page",skip:"Skip to main content","boot.loading":"Loading Yassaei Electronics\u2026","boot.waking":"The cloud server is waking up; we will retry automatically in a few seconds\u2026","boot.failed":"Store unreachable; the cloud server is asleep or the network is down.","update.available":"A new version is ready \u2014 tap to see the changes.","update.reload":"Refresh now","boot.failedHint":"Tap Retry; if it still fails, open your saved Wake-Up file to wake the server.","topbar.fastSend":"Shipping from Tehran to all of Iran","nav.home":"Home","nav.products":"All products","nav.deals":"Deals","nav.new":"New arrivals","nav.stats":"Live stats","nav.about":"About us","price.inquire":"Price on request \u2014 call the store","price.inquireShort":"Inquire","pdp.callStore":"Call the store","pdp.visitStore":"Visit in person","pdp.serviceHint":"This is a service/custom item; final price is confirmed by phone.","home.partFinder":"Can't find a part?","home.partFinderText":"Tell us by phone or message; if it is on our shelves, we set it aside for you the same day.","home.partFinderCta":"Call or message","nav.contact":"Contact us","nav.login":"Sign in","nav.register":"Register","nav.cart":"Cart","nav.wishlist":"My list","nav.notifications":"Notifications","nav.menu":"Menu","nav.account":"My account","nav.admin":"Admin panel","nav.allCategories":"All categories","theme.toggle":"Toggle theme (light/dark)","theme.dark":"Dark mode","theme.light":"Light mode","theme.auto":"Match system","search.placeholder":"Search products, brands or categories\u2026","search.go":"Search","search.voice":"Voice search","search.byImage":"Search by photo","search.listening":"Listening\u2026 go ahead and speak","search.noVoice":"Your browser does not support voice search.","search.micDenied":"Microphone access is blocked. Allow microphone permission for this site in browser settings.","search.voiceNetwork":"Speech service unreachable; check your internet connection.","search.noSpeech":"I didn't catch that; try again and speak clearly.","search.noMic":"No microphone found on this device.","pwd.show":"Show password","pwd.hide":"Hide password","search.suggestions":"Suggestions","search.trending":"Trending searches","search.recent":"Your recent searches","search.resultsFor":"Search results for","search.inProducts":"In products","search.inCategories":"Categories","search.inBrands":"Brands","search.inPages":"Pages","search.didYouMean":"Did you mean?","search.noResultTitle":"We found nothing","search.noResultText":"Try another phrase or use the filters. If you want a specific item, tell support and we will source it for you.","search.imageTitle":"Search by photo","search.imageText":"Upload a photo of the product and we will find similar items in the store.","search.imageHint":"JPG or PNG, up to 4 MB","search.imageIndexing":"Preparing the visual search engine\u2026","search.imageNoIndex":"Product images are not indexed yet. The site admin can build the index from Admin panel \u2190 Image search.","search.imageNoMatch":"No similar product found for this photo. You can search by product name instead.","search.dropHere":"Drop the photo here","search.pickFile":"Choose a photo","search.takePhoto":"Take a photo with the camera","mnav.home":"Home","mnav.products":"Categories","mnav.search":"Search","mnav.cart":"Cart","mnav.me":"Account","footer.shopping":"Shopping","footer.allProducts":"All products","footer.deals":"Deals & offers","footer.inStock":"In-stock items","footer.searchByImage":"Visual search","footer.myList":"My list","footer.stats":"Store statistics","footer.services":"Customer services","footer.guide":"Buying guide","footer.service":"Customer services","footer.faq":"FAQ","footer.insurance":"Shipment insurance","footer.plus":"Plus membership","footer.tickets":"Support tickets","footer.about":"About & legal","footer.aboutUs":"About us","footer.terms":"Terms & conditions","footer.privacy":"Privacy policy","footer.bug":"Report a bug","footer.contact":"Contact us","footer.suggest":"Suggestions & complaints","footer.contactUs":"Ways to reach us","footer.install":"Install the app","footer.support":"Live support","footer.rights":"All rights reserved.","footer.workingHours":"Working hours","home.heroKicker":"Haft-Hoz bourse, with an authenticity guarantee","home.heroTitle":"From resistors to contactors \u2014 on your bench the same day","home.heroText":"Resistors, capacitors and ICs, soldering gear, cables and wires in every size, LED strips and projectors, modems and switches, fans and surge protectors \u2014 everything your board, home or workshop needs, under one roof in Narmak.","home.ctaShop":"Start shopping","home.ctaDeals":"Today's deals","home.point1":"Authenticity guarantee","home.point2":"7-day withdrawal right","home.point3":"Shipping across Iran","home.point4":"Free in-store pickup","home.categories":"Categories","home.categoriesSub":"From resistors and ICs to projectors and surge protectors","home.featured":"Featured picks","home.featuredSub":"Items we use and recommend ourselves","home.bestSellers":"Best sellers","home.bestSellersSub":"Chosen by Yassaei Electronics customers","home.newArrivals":"New in store","home.newArrivalsSub":"The latest items added to the shelf","home.deals":"Active discounts","home.dealsSub":"Limited-time offers at better prices","home.brands":"Brands in stock","home.whyUs":"Why Yassaei Electronics?","home.whyUsSub":"The things that set us apart","home.reviews":"Customer reviews","home.reviewsSub":"Real buyer experiences","home.visitStore":"Visit the store","home.visitStoreText":"Tehran, Narmak, Haft-Hoz square \u2014 free in-person advice and on-the-spot product testing","home.openMap":"See the sketch and map","home.statsTitle":"The store at a glance","home.plusTitle":"Yassaei Electronics Plus membership","home.plusText":"With a monthly fee you get free shipping on all orders, automatic shipment insurance and a permanent 3% discount.","home.plusCta":"See Plus benefits","home.appTitle":"The Yassaei Electronics app","home.appText":"This site is an installable app (PWA): it installs on Android, iPhone, Windows, Mac and Linux, and it works offline too.","home.installCta":"Install on my device","home.appInstalled":"The app is installed","home.liveStats":"Live store statistics","home.newsletter":"Stay posted on deals","home.newsletterText":"Leave your mobile number and we will only message you about important deals and when items on your list come back in stock.","home.subscribe":"Subscribe","stats.products":"Active products","stats.ordersTotal":"Total orders","stats.ordersToday":"Orders today","stats.visitsToday":"Visits today","stats.visitsTotal":"Total visits","stats.pendingOrders":"Orders under review","stats.delivered":"Successful deliveries","stats.customers":"Registered customers","stats.plusMembers":"Plus members","stats.categories":"Categories","stats.brands":"Brands","stats.outOfStock":"Out-of-stock items","stats.years":"Years active","stats.title":"Public store statistics","stats.sub":"These figures are taken live from the site's real data.","stats.chartTitle":"Visits over the last 14 days","stats.topProducts":"Best-selling products","stats.transparency":"Transparency for customers","stats.transparencyText":"We show real stock and real prices, and we do not hide the store's statistics either.","catalog.title":"Products","catalog.filters":"Filters","catalog.showFilters":"Show filters","catalog.hideFilters":"Hide filters","catalog.sort.relevant":"Most relevant","catalog.sort.newest":"Newest","catalog.sort.oldest":"Oldest","catalog.sort.cheapest":"Cheapest","catalog.sort.dearest":"Most expensive","catalog.sort.popular":"Best selling","catalog.sort.rating":"Highest rated","catalog.sort.discount":"Biggest discount","catalog.sort.name":"Alphabetical","catalog.f.category":"Category","catalog.f.brand":"Brand","catalog.f.price":"Price range","catalog.f.availability":"Availability","catalog.f.inStock":"In-stock items only","catalog.f.discountOnly":"Discounted only","catalog.f.rating":"Minimum rating","catalog.f.authenticity":"Authenticity","catalog.f.clear":"Clear all filters","catalog.count":"products","catalog.viewGrid":"Grid view","catalog.viewList":"List view","auth.original":"Original","auth.highcopy":"High copy (grade 1)","auth.generic":"Generic","card.addToCart":"Add to cart","card.added":"Added to cart","card.quickView":"Quick view","card.wishlistAdd":"Add to my list","card.wishlistRemove":"Remove from my list","card.compareAdd":"Add to compare","card.outOfStock":"Out of stock","card.soldOut":"Sold out","pdp.addToCart":"Add to cart","pdp.buyNow":"Buy now","pdp.pickup":"Free in-store pickup","pdp.warranty":"Warranty","pdp.warrantyMonths":"{n}-month store replacement warranty","pdp.noWarranty":"No warranty","pdp.sku":"Product code","pdp.barcode":"Barcode","pdp.weight":"Weight","pdp.gram":"grams","pdp.zoomIn":"Zoom in","pdp.zoomOut":"Zoom out","pdp.zoomReset":"Actual size","pdp.zoomHint":"Hover for magnifier; click or double-tap for full zoom","pdp.video":"Video","pdp.share":"Share","pdp.specs":"Specifications","pdp.description":"Description","pdp.reviews":"Reviews & ratings","pdp.questions":"Customer questions","pdp.related":"Similar products","pdp.compatibility":"Compatibility","pdp.writeReview":"Write a review & rating","pdp.askQuestion":"Ask a question","pdp.loginToReview":"Sign in to write a review.","pdp.reviewSubmitted":"Your review was submitted and will appear once the admin approves it.","pdp.reviewPending":"Your review will appear after the admin approves it.","pdp.questionSubmitted":"Your question was submitted; once approved, the admin will answer it.","pdp.buyerBadge":"Buyer of this product","pdp.visitorBadge":"Visitor","pdp.helpful":"Was helpful","pdp.storeReply":"Store reply","pdp.noReviews":"No reviews yet. Be the first!","pdp.noQuestions":"No questions yet. Ask if you have one.","pdp.yourRating":"Your rating","pdp.viewed":"views","pdp.sold":"sold","pdp.off":"off","pdp.save":"You save","pdp.lastPrice":"Previous price","pdp.stockCount":"In stock: {n}","pdp.fastSend":"Fast shipping from Tehran","pdp.installment":"Cash on delivery for eligible orders","cart.title":"Cart","cart.empty":"Your cart is empty","cart.emptyText":"You have not picked anything yet. Start from the categories or the search box.","cart.goShopping":"Let's go shopping","cart.item":"Product","cart.qty":"Quantity","cart.remove":"Remove","cart.clear":"Empty the cart","cart.clearConfirm":"Remove all items from the cart?","cart.summary":"Order summary","cart.continue":"Continue to checkout","cart.freeShipHint":"Spend {amount} Toman more to get free shipping.","cart.freeShipDone":"Shipping is free for this order!","cart.couponApplied":"Discount code applied","cart.couponPlaceholder":"Have a discount code? Enter it","cart.applyCoupon":"Apply code","cart.removeCoupon":"Remove code","cart.updated":"Cart updated","checkout.title":"Checkout","checkout.step1":"Delivery","checkout.step2":"Payment","checkout.step3":"Confirm","checkout.delivery":"Delivery method","checkout.pickup":"Pickup from the store","checkout.pickupDesc":"Free \u2014 once confirmed you get a ready-for-pickup notification and collect it in person.","checkout.courier":"Courier / postal shipping","checkout.courierDesc":"Shipped to a saved address, with optional shipment insurance.","checkout.zone":"Shipping zone","checkout.express":"Express shipping (same day)","checkout.insuranceOpt":"Shipment insurance","checkout.insuranceDesc":"If the parcel is damaged or lost in transit, the goods value is compensated.","checkout.insuranceAuto":"Applied automatically and free for Plus members.","checkout.address":"Delivery address","checkout.addAddress":"Add a new address","checkout.noAddress":"You must save at least one address for postal shipping.","checkout.paymentMethod":"Payment method","checkout.useWallet":"Pay from wallet","checkout.walletBalance":"Wallet balance: {amount} Toman","checkout.note":"Order note (optional)","checkout.notePlaceholder":"e.g. please call before delivery.","checkout.acceptTerms":"I have read and accept the Terms & Conditions and the Privacy Policy.","checkout.placeOrder":"Place & pay for the order","checkout.placing":"Placing your order\u2026","checkout.loginRequired":"Sign in to complete your purchase.","checkout.successTitle":"Order placed","checkout.successText":"Your order code is {code}. Track its status under My Orders.","checkout.payNow":"Pay online","checkout.payLater":"I will pay later","checkout.gatewayDemo":"The gateway is in demo mode; no real money is deducted.","checkout.paymentSuccess":"Payment was successful","checkout.paymentFailed":"Payment failed","checkout.simulateSuccess":"Successful payment (gateway simulation)","checkout.simulateFail":"Cancel payment","checkout.concurrencyNote":"Stock is locked the moment you place the order; if an item sells out at the same time we will tell you and refund the amount.","checkout.pickupReady":"Preparation time: about {h} working hours","auth.title":"Sign in or register","auth.loginTitle":"Sign in to your account","auth.registerTitle":"Create an account","auth.methodPassword":"Username & password","auth.methodPhone":"Mobile number","auth.methodEmail":"Email","auth.identifier":"Username, mobile or email","auth.remember":"Remember me","auth.forgot":"Forgot password","auth.noAccount":"Do not have an account?","auth.haveAccount":"Already registered?","auth.sendCode":"Send verification code","auth.codeSent":"Verification code sent","auth.codeSentTo":"A 6-digit code was sent to {target}.","auth.enterCode":"Enter the verification code","auth.otpCode":"Verification code","auth.resend":"Resend code","auth.resendIn":"Resend in {s} seconds","auth.demoCode":"Demo mode: verification code {code}","auth.2faTitle":"Two-step sign-in","auth.2faText":"Enter the 6-digit code from your authenticator app, SMS or email.","auth.2faTotp":"Authenticator app","auth.2faSms":"SMS code","auth.2faEmail":"Email code","auth.2faBackup":"Backup code","auth.2faVerify":"Verify & sign in","auth.acceptTerms":"I accept the Terms & Conditions and the Privacy Policy.","auth.referral":"Referral code (optional)","auth.registerDone":"Your account was created. Welcome!","auth.loginDone":"Welcome","auth.logoutDone":"You signed out successfully","auth.recoveryTitle":"Password recovery","auth.recoveryText":"Enter your registered mobile number or email and we will send a recovery code.","auth.newPassword":"New password","auth.resetDone":"Password changed successfully","auth.passwordRules":"At least 8 characters including lowercase, uppercase, a digit and a symbol","auth.orContinue":"or","auth.guestCheckout":"Continue shopping without an account","acc.title":"My account","acc.dashboard":"My dashboard","acc.badges":"My achievements","badge.got":"Earned","badge.locked":"Locked","badge.first-buy":"First purchase","badge.first-buy.d":"You placed your first successful order.","badge.silver-buyer":"Silver buyer","badge.silver-buyer.d":"5 successful orders at Yassaei Electronics.","badge.gold-buyer":"Gold buyer","badge.gold-buyer.d":"15 successful orders; a Yassaei Electronics VIP.","badge.big-spender":"Big spender","badge.big-spender.d":"Over 50,000,000 Toman in purchases.","badge.early-bird":"Early bird","badge.early-bird.d":"Among the first 100 Yassaei Electronics users.","badge.veteran":"Veteran","badge.veteran.d":"With us for more than a year.","badge.reviewer":"Reviewer","badge.reviewer.d":"3 posted reviews helping others choose.","badge.plus-member":"Plus member","badge.plus-member.d":"You have an active Plus subscription.","badge.wallet-user":"Wallet user","badge.wallet-user.d":"You have used the Yassaei Electronics wallet.","badge.supporter":"Supporter","badge.supporter.d":"You opened your first support ticket.","acc.orders":"My orders","acc.wishlist":"My list","acc.wallet":"Wallet","acc.plus":"Plus membership","acc.addresses":"Addresses","acc.notifications":"Notifications","acc.tickets":"My tickets","acc.support":"Support chat","acc.reviews":"My reviews","acc.feedback":"Suggestions & complaints","acc.profile":"Profile details","acc.security":"Account security","acc.sessions":"Active sessions","acc.prefs":"Display preferences","acc.data":"My data","acc.hello":"Hi {name}","acc.memberSince":"Member since {date}","acc.noOrders":"You have not placed an order yet","acc.noOrdersText":"Make your first purchase with the welcome discount WELCOME10.","acc.orderCode":"Order code","acc.orderDate":"Order date","acc.orderItems":"Items","acc.orderTotal":"Total amount","acc.trackOrder":"Track order","acc.cancelOrder":"Cancel order","acc.cancelConfirm":"Cancel this order? The paid amount returns to your wallet.","acc.cancelReason":"Reason for cancellation (optional)","acc.orderCancelled":"Order cancelled","acc.reorder":"Buy again","acc.invoice":"Invoice","acc.printInvoice":"Print invoice","acc.timeline":"Order progress","acc.walletEmpty":"No transactions recorded yet","acc.walletDeposit":"Top up wallet","acc.walletAmount":"Top-up amount (Toman)","acc.walletDeposited":"Wallet topped up","acc.walletNote":"The wallet balance can only be used to buy from this store; no interest or fee applies to it.","acc.tx.deposit":"Top-up","acc.tx.purchase":"Purchase","acc.tx.refund":"Refund","acc.tx.adjust_in":"Increase by admin","acc.tx.adjust_out":"Deduction by admin","acc.plusInactive":"You do not have a Plus membership","acc.plusActive":"Plus active until {date}","acc.plusSubscribe":"Buy Plus membership","acc.plusRenew":"Renew membership","acc.plusPrice":"{price} Toman for {days} days","acc.plusPerks":"Plus membership benefits","acc.plusSubscribed":"Plus membership activated","acc.plusPayWallet":"Pay from wallet","acc.plusPayGateway":"Pay online","acc.addAddress":"Add address","acc.editAddress":"Edit address","acc.addrTitle":"Label (e.g. home, work)","acc.addrReceiver":"Recipient name","acc.addrPhone":"Recipient phone number","acc.addrStreet":"Full postal address","acc.addrDefault":"Default address","acc.addrNote":"Note for the courier","acc.addrSaved":"Address saved","acc.addrDeleted":"Address deleted","acc.noAddress":"No address saved yet","acc.wishlistEmpty":"Your list is empty","acc.wishlistEmptyText":"Tap the heart icon on any product to save it here.","acc.notifEmpty":"You have no notifications","acc.markAllRead":"Mark all as read","acc.ticketNew":"New ticket","acc.ticketSubject":"Subject","acc.ticketCategory":"Request category","acc.ticketPriority":"Priority","acc.ticketBody":"Request details","form.rulesRequired":"You must accept the ticket rules first.","form.termsRequired":"You must accept the terms and conditions first.","page.statsTitle":"Live store stats","page.aboutCta":"Come and see what we have in store for you","page.stepsTitle":"How to buy","page.tipsTitle":"Buying tips","page.hintsTitle":"For a more precise report","page.bugTitle":"Report a bug","page.rulesTitle":"Rules","faq.all":"All topics","faq.search":"Search questions\u2026","faq.results":"{n} questions","faq.notFound":"No question matched your search.","faq.askText":"Ask live support or open a ticket.","faq.cat.orders":"Orders & tracking","faq.cat.shipping":"Shipping & delivery","faq.cat.returns":"Returns & refunds","faq.cat.product":"Products & authenticity","faq.cat.account":"Account","faq.cat.security":"Security & payment","faq.cat.store":"Store & contact","faq.cat.other":"Other","acc.ticketCloseConfirm":"Close this ticket? You can reopen it later by sending a message.","acc.ticketClosedNote":"This ticket is closed. Sending a new message reopens it.","acc.ticketBodyShort":"The message is too short.","acc.attachHint":"Up to 4 images, each below 4 MB.","err.tooLarge":"The file is larger than 4 MB.","acc.ticketRules":"I have read and accept the ticket rules.","acc.ticketViewRules":"Read ticket rules","acc.ticketCreated":"Ticket created. Tracking code: {code}","acc.ticketWrite":"Write your reply\u2026","acc.ticketClose":"Close ticket","acc.ticketReopen":"Reopen","acc.ticketSla":"Estimated reply time: {h} hours","acc.noTickets":"You have no tickets","acc.chatTitle":"Live support","acc.chatPlaceholder":"Write your message\u2026","acc.chatWelcome":"Hi! Any question or issue? Write it here and we will answer.","acc.chatOffline":"We are outside working hours right now; leave a message and we reply first thing, or open a ticket.","acc.chatOpenTicket":"Open a ticket","acc.reviewEmpty":"You have not posted a review or question","acc.feedbackNew":"Send a suggestion, complaint or bug report","acc.feedbackType":"Message type","acc.feedbackContact":"Contact (email or mobile)","acc.feedbackContactHint":"If provided, we will inform you of the outcome.","acc.feedbackSent":"Your message was submitted. Thanks for helping us improve.","acc.noFeedback":"You have not sent any message","acc.profileSaved":"Profile saved","acc.passwordChange":"Change password","acc.currentPassword":"Current password","acc.newPassword2":"New password","acc.passwordChanged":"Password changed","acc.2faSection":"Two-factor authentication (2FA)","acc.2faOff":"Disabled \u2014 turn it on for extra security.","acc.2faOn":"Enabled","acc.2faEnable":"Enable two-factor","acc.2faDisable":"Disable","acc.2faScan":"Scan this QR code with an authenticator app (e.g. Google Authenticator) or enter the key manually.","acc.2faKey":"Manual key","acc.2faEnterCode":"Enter the 6-digit code from the app to enable","acc.2faEnabled":"Two-factor enabled","acc.2faDisabled":"Two-factor disabled","acc.2faBackup":"Backup codes (keep them safe)","acc.2faBackupHint":"If you lose access to the app, sign in with these. Each code works once.","acc.2faMethods":"Verification methods","acc.sessionsText":"Devices currently signed in to your account.","acc.revokeAll":"Sign out everywhere","acc.revokeDone":"Sessions revoked","acc.current":"This device","acc.prefsText":"These settings apply only to this device.","acc.prefTheme":"Theme","acc.prefLang":"Language","acc.prefDensity":"Density","acc.prefMotion":"Animations","acc.prefNotif":"Notifications","acc.notifMarketing":"Offers and discounts","acc.notifOrders":"Order status","acc.notifRestock":"Restock of my saved items","acc.notifSupport":"Support and ticket replies","acc.exportData":"Export my data","acc.exportHint":"Download all your account info, orders, reviews and tickets as JSON.","acc.deleteAccount":"Delete account","acc.deleteWarn":"Deleting removes your personal data, while financial order records are kept as required by law.","acc.deleteConfirm":"Enter your password to delete the account","acc.pointsText":"You earn 1 point per 100,000 Toman of purchase.","acc.referralCode":"Your referral code","acc.referralText":"Share this code; you both get 50 points.","chat.title":"Yassaei Electronics live support","chat.online":"We usually reply within minutes","chat.open":"Start chat","chat.minimize":"Close","chat.loginFirst":"Sign in to chat with support.","chat.sent":"Message sent","chat.typing":"Support is typing\u2026","chat.quick":"Frequent questions","notif.new":"New notification","notif.markRead":"Mark as read","notif.viewAll":"View all notifications","notif.empty":"No notifications","notif.type.announcement":"Announcement","notif.type.order":"Order","notif.type.restock":"Back in stock","notif.type.ticket":"Ticket","notif.type.support":"Support","notif.type.review":"Review","notif.type.plus":"Plus membership","notif.type.wallet":"Wallet","notif.type.account":"Account","notif.type.feedback":"Feedback","notif.type.admin_alert":"Admin alert","notif.type.news":"News","notif.type.offer":"Special offer","notif.type.system":"System","notif.type.info":"Info","notif.type.welcome":"Welcome","consent.title":"Welcome to Yassaei Electronics","consent.text":"Please read and accept the following before continuing. We use browser storage to improve your shopping experience and protect your personal data per the Privacy Policy.","consent.terms":"I have read and accept the Terms & Conditions.","consent.privacy":"I accept the Privacy Policy.","consent.marketing":"I would like to hear about deals and new arrivals (optional).","consent.accept":"Accept & enter the site","consent.readTerms":"Read terms","consent.readPrivacy":"Read privacy","consent.thanks":"Thanks! Your acceptance was recorded.","consent.manage":"Cookie & privacy choices","social.instagram":"Instagram","home.partnersTitle":"Brands we work with","stats.subtitle":"Real store numbers, updated live.","stats.chartHint":"Each column height is that day visit count.","stats.topTitle":"Recent best sellers","adm.sPartners":"Partners & brands","adm.ptFa":"Persian name","adm.ptEn":"Name (EN)","adm.ptAdd":"Add brand","adm.ptHint":"These names scroll as a marquee on the home page; order is yours to set.","feat.partners":"Partner brands strip","auth.pwdLater":"I'll change it later","auth.pwdLaterToast":"OK; you can change it anytime from Account \u2192 Change password.","social.telegram":"Telegram","social.eitaa":"Eitaa","social.whatsapp":"WhatsApp","consent.rejectOptional":"Accept necessary only","consent.ttlNote":"Your choice stays valid for 180 days; after that we ask again.","contact.title":"Contact us","contact.mapTitle":"Shop location sketch","contact.mapHint":"Click to open in a map app","contact.mapAsk":"Which map would you like to open?","contact.mapPermission":"If you allow location access, we will show the route from your current position to the shop.","contact.allowLocation":"Allow location access","contact.denyLocation":"Continue without location","contact.openMaps":"Open in maps","contact.copyAddress":"Copy address","contact.hours":"Working hours","contact.phone":"Store phone","contact.mobile":"Mobile & WhatsApp","contact.emailUs":"Email","contact.addressUs":"Address","contact.callNow":"Call now","contact.whatsapp":"Message on WhatsApp","contact.locationOn":"Your approximate location was found","contact.locationDenied":"Location denied; the map opens without an origin.","contact.formTitle":"Send a quick message","contact.formText":"Prefer not to call? Leave a message or open a ticket.","contact.neshan":"Neshan","contact.balad":"Balad","contact.google":"Google Maps","contact.osm":"OpenStreetMap","contact.tgBotTitle":"Telegram support bot","contact.tgBotText":"Track orders, search products and chat with support \u2014 24/7 on Telegram. Just send /start.","contact.tgBotBtn":"Open the bot on Telegram","compare.title":"Compare products","compare.empty":"No products selected for comparison","compare.emptyText":"Use the Compare button on product cards (up to 4 items).","compare.add":"Add to compare","compare.remove":"Remove","priceCheck.title":"Price check by barcode","priceCheck.sub":"Scan the barcode with your device or type it manually.","priceCheck.input":"Barcode or SKU","priceCheck.scanCamera":"Scan with camera","priceCheck.stopCamera":"Stop camera","priceCheck.waiting":"Waiting for a scan\u2026","priceCheck.notFound":"No product found for this barcode","priceCheck.found":"Product found","priceCheck.cameraUnsupported":"Camera unavailable. Use a barcode device or manual entry.","priceCheck.cameraDenied":"Camera access denied.","priceCheck.deviceMode":"Kiosk mode (full screen)","priceCheck.lastScan":"Last scan","priceCheck.fullscreen":"Full screen","err.generic":"Something went wrong. Please try again.","err.network":"Could not reach the server.","err.notFound":"Page not found","err.notFoundText":"The address may be wrong or the page has been removed.","err.goHome":"Go to homepage","err.offline":"You are offline. Cached data is shown.","err.online":"Back online","err.loginRequired":"You must sign in to view this section.","err.forbidden":"You do not have access to this section.","adm.title":"Admin panel","adm.dashboard":"Dashboard","adm.products":"Products","adm.productNew":"Add product","adm.productEdit":"Edit product","adm.categories":"Categories & brands","adm.orders":"Orders","adm.reviews":"Reviews & questions","adm.tickets":"Tickets","adm.supportChat":"Support chat","adm.feedback":"Feedback & bugs","adm.users":"Users & permissions","adm.wallet":"User wallets","adm.coupons":"Coupons","adm.ads":"Advertisements","adm.notifications":"Notifications","adm.settings":"Store settings","adm.theme":"Theme & layout","adm.features":"Features","adm.shipping":"Shipping & insurance","adm.plus":"Plus membership","adm.pages":"Page content","adm.barcode":"Barcode & labels","adm.imageSearch":"Image search","adm.audit":"Audit log","adm.stats":"Statistics","adm.export":"Export & backup","adm.maintenance":"Maintenance","adm.backToSite":"Back to site","adm.kpi.ordersToday":"Orders today","adm.kpi.visits":"Visits today","adm.kpi.pending":"Pending review","adm.kpi.revenueTotal":"Total revenue","adm.kpi.users":"Users","adm.kpi.products":"Products","adm.kpi.lowStock":"Low stock","adm.awaiting":"Tasks awaiting action","adm.awaiting.reviews":"Reviews to approve","adm.awaiting.tickets":"Open tickets","adm.awaiting.orders":"Pending orders","adm.awaiting.feedback":"New feedback","adm.awaiting.chat":"Unread chat messages","adm.chart":"Last 14 days trend","adm.topSelling":"Best sellers","adm.lowStockList":"Low-stock items","adm.recentAudit":"Latest events","adm.storage":"Data size","adm.pName":"Product name","adm.pNameEn":"English name","adm.pCat":"Category","adm.pBrand":"Brand","adm.pPrice":"Price (Toman)","adm.pOldPrice":"Price before discount","adm.pCost":"Purchase cost","adm.pStock":"Stock","adm.pSku":"SKU","adm.pBarcode":"Barcode","adm.pWeight":"Weight (grams)","adm.pWarranty":"Warranty (months)","adm.pAuth":"Authenticity","adm.pTags":"Tags (separate with Enter)","adm.pSpecs":"Specifications","adm.pSpecKey":"Spec name","adm.pSpecVal":"Value","adm.pAddSpec":"Add spec","adm.pVideos":"Product videos (one https or /uploads URL per line)","adm.pVideosHint":"Videos play in the product gallery and lightbox.","adm.pImages":"Images","adm.pFindImage":"Auto image search","adm.pFindImageHint":"We search free image sources (Wikimedia/Openverse) for this product. Pick one and approve it.","adm.pFindSearching":"Searching for images\u2026","adm.pFindEmpty":"No images found. You can upload your own photo.","adm.pUpload":"Upload photo","adm.pUseImage":"Use this image","adm.pDefaultImage":"Restore default image","adm.pFeatured":"Show in featured picks","adm.pActive":"Active (visible on site)","adm.pSaved":"Product saved","adm.pCreated":"Product created","adm.pDeleted":"Product deleted","adm.pDeleteConfirm":"Delete this product permanently?","adm.pQuickEdit":"Quick edit","adm.pBulkPrice":"Bulk price change","adm.catName":"Category name","adm.catParent":"Parent category","adm.catGlyph":"Icon","adm.catOrder":"Display order","adm.catNoParent":"No parent (top level)","adm.brandName":"Brand name","adm.brandNameEn":"Brand English name","adm.oStatus":"Change status","adm.oTracking":"Tracking code","adm.oNote":"Internal note","adm.oCustomer":"Customer","adm.oDelivery":"Delivery","adm.oPayment":"Payment","adm.oSaved":"Order updated","adm.rApprove":"Approve & publish","adm.rReject":"Reject","adm.rReply":"Reply","adm.rReplySaved":"Reply saved","adm.rModerated":"Review status updated","adm.rFilter":"Filter","adm.uRole":"Role","adm.uPerms":"Permissions","adm.uPermsHint":"Toggle each permission separately. Changes apply immediately.","adm.uAll":"Enable all","adm.uNone":"Disable all","adm.uWalletAdjust":"Adjust wallet balance","adm.uWalletReason":"Reason","adm.uPlusDays":"Plus membership days","adm.uResetPass":"Reset password","adm.uStatus":"Account status","adm.uBlocked":"Blocked","adm.uSaved":"User changes saved","adm.uMakeStaff":"Make staff","adm.cCode":"Code","adm.cType":"Discount type","adm.cValue":"Value","adm.cMax":"Max discount","adm.cMin":"Minimum order","adm.cLimit":"Total usage limit","adm.cPerUser":"Per-user limit","adm.cStart":"Starts","adm.cEnd":"Ends","adm.cUsed":"Used","adm.aSlot":"Placement","adm.aTitle":"Title","adm.aText":"Text","adm.aLink":"Target link","adm.aCta":"Button text","adm.aActive":"Visible","adm.nTitle":"Notification title","adm.nBody":"Notification body","adm.nTarget":"Recipient","adm.nAll":"All users","adm.nOne":"A specific user","adm.nLevel":"Level","adm.nSent":"Notification sent","adm.nOutbox":"SMS & email outbox (demo mode)","adm.sStore":"Store information","adm.sTheme":"Theme","adm.sUi":"Interface layout","adm.mailsms":"Email & SMS","adm.mailCfg":"Mail server (SMTP)","adm.mailEnabled":"Email sending on","adm.mailFrom":"From address","adm.smsCfg":"SMS panel (Kavenegar)","adm.smsEnabled":"SMS sending on","adm.smsKey":"API key","adm.smsSender":"Sender number","adm.console":"System console","adm.consoleHint":"Restart takes a few seconds; the page reloads itself. Resets are irreversible.","adm.sysRestart":"Restart server","adm.sysRestartWarn":"Restart the server now? Users will be disconnected for a few seconds.","adm.sysRestarting":"Restarting\u2026 the page will reload shortly.","adm.sysResetLabel":"Reset sections (irreversible):","adm.sysReset.audit":"Audit log","adm.sysReset.carts":"Guest carts","adm.sysReset.visits":"Visit counters","adm.sysReset.visitors":"Visitors list","adm.secTitle":"Defense & entry queue","adm.secQueueEnabled":"Queue visitors when busy","adm.secQueueDesc":"When load exceeds the limits, anonymous visitors are admitted one by one through a queue so the site stays error-free for everyone.","adm.secMaxConc":"Max concurrent requests","adm.secTriggerRps":"Requests-per-second trigger","adm.secPassTtl":"Entry pass TTL (minutes)","adm.secPoll":"Queue poll interval (seconds)","adm.secFloodBan":"Auto-ban threshold (requests/minute)","adm.secFloodMin":"Auto-ban duration (minutes)","adm.secSaved":"Defense settings saved.","adm.secInflight":"Active requests","adm.secRps":"Req/sec","adm.secQueued":"In queue","adm.secAutoBans":"Active auto-bans","adm.secTop":"Top talker IPs (last minute)","adm.secPerMin":"Req/min","adm.secTopEmpty":"No unusual traffic recorded.","adm.secBusy":"Busy \u2014 queue active","adm.secNormal":"Normal","adm.banMinutes":"Duration (minutes, 0 = permanent)","adm.banUntil":"Until","adm.banAuto":"auto","adm.resetAudit":"Clear audit logs","adm.resetCarts":"Clear guest carts","adm.resetVisitors":"Clear visitors","adm.resetDone":"Reset done.","adm.resetWarn.audit":"Delete all audit logs?","adm.resetWarn.carts":"Empty all guest carts?","adm.resetWarn.visitors":"Delete the visitors list?","adm.resetWarn.visits":"Zero the visit counters?","adm.visitors":"Visitors","adm.uDevice":"Device / IP","adm.uBrowser":"Browser","adm.uRegion":"Region / time","adm.uPath":"Path","adm.guest":"Guest","adm.bans":"Bans (block / unblock)","adm.banType":"Type","adm.banValue":"Value (IP / phone / email / username)","adm.banReason":"Reason","adm.ban":"Ban","adm.unban":"Unban","adm.banned":"Banned","adm.banDone":"Banned.","adm.unbanDone":"Unbanned.","adm.bansEmpty":"Nobody is banned right now.","adm.banByAdmin":"By admin","adm.channels":"Channels","adm.chSite":"In-site notification","adm.chTelegram":"Telegram bot","adm.chEmail":"Email","adm.chSms":"SMS","adm.channelsHint":"Email/SMS need settings below; without them only ready channels send.","adm.telegram":"Telegram bot","adm.tgHint":"Get a token from Telegram BotFather; the bot runs on the store server and is managed from this panel.","adm.tgEnabled":"Bot on","adm.tgToken":"Bot token","adm.tgTokenHint":"Like 123456:ABC-\u2026","adm.tgWelcome":"/start welcome message","adm.tgTest":"Test send","adm.tgInbox":"Inbox","adm.tgSubs":"Subscribers","adm.tgReplyPh":"Reply to this user\u2026","adm.tgInboxEmpty":"No messages yet.","adm.lottery":"Lottery","adm.lotteryNew":"New draw","adm.lotPrize":"Prize","adm.lotEnds":"Ends","adm.lotWinners":"Winners count","adm.lotWinnersList":"Winners","adm.lotMode":"Entry mode","adm.lotModeOrders":"Automatic from orders","adm.lotModeManual":"Manual join button","adm.lotEntries":"Entries","adm.lotRun":"Draw now","adm.lotRunWarn":"Winners are picked randomly and notified now. Continue?","adm.lotDone":"Draw done","adm.lotClose":"Close","adm.lotClosed":"Draw closed.","adm.lotEmpty":"No draws yet.","lot.title":"Yassaei Electronics lottery","lot.nav":"Lottery","lot.soon":"Coming soon \u2014 stay tuned!","lot.done":"Past draws","lot.winners":"Winners","lot.active":"Active","lot.prize":"Prize","lot.ends":"Ends","lot.entries":"Entries","lot.joined":"You are in this draw.","lot.join":"Join draw","lot.joinDone":"Entry recorded \u2014 good luck!","lot.autoEntry":"Every valid order in the draw window counts automatically.","contact.phone3":"Third phone","adm.sBackups":"Backups & dump","adm.backupNow":"Backup now","adm.backupsHint":"A full snapshot is taken automatically every {hours} hours; the last {keep} are kept.","adm.backupsEmpty":'No snapshot yet; hit "Backup now".',"adm.backupSize":"Size","adm.backupRestore":"Restore","adm.backupRestoreWarn":"All current data will be replaced by this snapshot. Sure?","adm.backupDone":"Backup created.","adm.backupRestored":"Restore done; reloading.","adm.dumpFull":"Full site dump","adm.sFeatures":"Features","adm.sShipping":"Shipping","adm.sPlus":"Plus","adm.sOrders":"Orders & payment","adm.sSeo":"SEO","adm.sAuth":"Authentication","adm.sSaved":"Settings saved","adm.tAccent":"Primary colour","adm.tPort":"Port theme (waves, boat and palm in the background)","adm.tPortHint":"Turn it off for a plain neutral background.","adm.tMode":"Default theme","adm.tRadius":"Corner radius","adm.tDensity":"Density","adm.uHeader":"Header layout","adm.uNav":"Menu style","adm.uCards":"Product card style","adm.uSticky":"Sticky header","adm.uTicker":"Top ticker bar","adm.uTickerItems":"Ticker messages","adm.uTickerSpeed":"Ticker speed","adm.uQuick":"Product quick view","adm.uChat":"Floating support button","adm.uCrumb":"Show breadcrumbs","adm.uCols":"Product columns","adm.uColsMobile":"Mobile","adm.uColsTablet":"Tablet","adm.uColsDesktop":"Desktop","adm.uColsWide":"Wide screen","adm.uCardInfo":"Info shown on product cards","adm.uPosStart":"Right (start)","adm.uPosCenter":"Center","adm.uPosEnd":"Left (end)","adm.uLayoutLogoStart":"Logo at start","adm.uLayoutSplit":"Logo start / search center / actions end","adm.uLayoutCentered":"Logo centered","adm.fHint":"Turn off any feature you do not need; its section disappears from the site and panel.","adm.bLabel":"Label printing","adm.bSelect":"Select products","adm.bSize":"Label size","adm.bCopies":"Copies per product","adm.bShowName":"Product name","adm.bShowPrice":"Price","adm.bShowBrand":"Brand","adm.bShowSku":"SKU","adm.bShowQr":"Product page QR code","adm.bType":"Barcode type","adm.bPrint":"Print labels","adm.bGenerate":"Generate new barcode","adm.igPack":"Instagram post pack","adm.igCap":"Caption (editable before copy)","adm.igTags":"Hashtags","adm.igImgHint":"Post image; download it and publish with the caption.","adm.igDl":"Download image","adm.igNoImg":"This product has no image yet; add one via upload or image search first.","adm.igCopyCap":"Copy caption","adm.igCopyTags":"Copy hashtags","adm.igCopyAll":"Copy caption + tags","adm.bGenerated":"Barcode generated and assigned","adm.bScan":"Scan barcode","adm.bScanMode":"Scanner mode (device sync)","adm.bScanHint":"Connect your barcode device like a keyboard; click the box below and scan. Camera scanning also works.","adm.bConnected":"Device connected \u2014 ready to scan","adm.bSerial":"Direct connection via Web Serial","adm.bSerialHint":"If your device has a serial/USB port, connect here (desktop Chrome/Edge only).","adm.bSerialUnsupported":"Your browser does not support Web Serial; use keyboard or camera mode.","adm.bSerialConnected":"Connected","adm.bSerialClosed":"Connection closed","adm.bHistory":"Recent scans","adm.isTitle":"Image index for visual search","adm.isHint":"Build the index once so customers can search by photo. It runs in your browser and adds no server load.","adm.isBuild":"Build index","adm.isBuilding":"Indexing\u2026","adm.isDone":"Index built","adm.isCount":"Indexed images","adm.auditAction":"Event","adm.auditActor":"User","adm.auditTarget":"Target","adm.auditMeta":"Details","adm.statsRevenue":"Revenue","adm.statsVisits":"Visits","adm.statsOrders":"Orders","adm.statsByCat":"Category performance","adm.statsByBrand":"Sales by brand","adm.statsStockValue":"Inventory value","adm.statsAvgOrder":"Average basket","adm.exportProducts":"Export products","adm.exportOrders":"Export orders","adm.exportUsers":"Export users","adm.exportReviews":"Export reviews","adm.exportTickets":"Export tickets","adm.exportAudit":"Export events","adm.exportAll":"Full backup (JSON)","adm.backup":"Create backup now","adm.cleanup":"Clean old data","adm.cleanupDone":"Cleanup done","adm.pageEditHint":"Edit page texts here; changes apply to the site immediately.","adm.noPermission":"You do not have permission for this section. Ask the owner to grant it.","adm.liveView":"Live preview of changes","adm.saved":"Saved","st.pending_payment":"Pending payment","st.pending_review":"Pending review","st.confirmed":"Confirmed","st.preparing":"Preparing","st.ready_pickup":"Ready for pickup","st.shipped":"Shipped","st.delivered":"Delivered","st.cancelled":"Cancelled","st.refunded":"Refunded","st.returned":"Returned","dl.pickup":"In-store pickup","dl.courier":"Postal shipping","pm.wallet":"Wallet","pm.gateway":"Bank gateway","pm.cod":"Cash on delivery","ps.unpaid":"Unpaid","ps.paid":"Paid","ps.pending":"Pending","ps.refunded":"Refunded","ps.failed":"Failed","ps.cancelled":"Cancelled","tc.order":"Order tracking","tc.return":"Return & refund","tc.product":"Product question","tc.technical":"Technical issue","tc.complaint":"Complaint","tc.partnership":"Partnership & advertising","tc.account":"Account & security","tc.other":"Other","tp.critical":"Critical","tp.high":"High","tp.normal":"Normal","tp.low":"Low","ft.suggestion":"Suggestion","ft.complaint":"Complaint","ft.bug":"Bug report","fs.new":"New","fs.seen":"Seen","fs.in_progress":"In progress","fs.done":"Done","fs.rejected":"Rejected","tk.open":"Open","tk.answered":"Answered","tk.closed":"Closed","feat.wallet":"Wallet","feat.plus":"Plus membership","feat.insurance":"Shipment insurance","feat.tickets":"Ticket system","feat.reviews":"Customer reviews","feat.questions":"Customer questions","feat.ads":"On-site ads","feat.imageSearch":"Image search","feat.barcode":"Barcode & labels","feat.priceCheckDevice":"Price display mode","feat.publicStats":"Public statistics","feat.coupons":"Coupons","feat.consent":"Cookie consent modal (first visit)","feat.liveSupport":"Live chat support","feat.announcements":"Notifications","feat.wishlist":"My list","feat.compare":"Product comparison","feat.recentlyViewed":"Recently viewed","feat.guestCheckout":"Guest checkout","feat.priceAlerts":"Restock alerts","feat.twoFactor":"Two-factor login","feat.referrals":"Referral codes","feat.voiceSearch":"Voice search","feat.offlineMode":"Offline mode","feat.captcha":"Captcha (I'm not a robot)","captcha.required":"Prove you are human first: tick the box and solve the math.","captcha.label":"I'm not a robot","captcha.hint":"Tick it, then solve the tiny math image","captcha.placeholder":"Answer","captcha.solved":"Human verified \u2714","captcha.refresh":"New challenge","perm.dashboard.view":"View dashboard","perm.products.view":"View products","perm.products.create":"Create product","perm.products.edit":"Edit product","perm.products.delete":"Delete product","perm.products.price":"Change price & discount","perm.products.stock":"Change stock","perm.categories.manage":"Manage categories & brands","perm.orders.view":"View orders","perm.orders.manage":"Change order status","perm.refunds.manage":"Refunds & cancellation","perm.reviews.moderate":"Moderate reviews","perm.reviews.reply":"Reply to reviews","perm.tickets.manage":"Manage tickets","perm.feedback.manage":"Feedback & bugs","perm.users.view":"View users","perm.users.manage":"Manage users","perm.users.permissions":"Assign permissions","perm.wallet.manage":"Wallet management","perm.plus.manage":"Plus membership","perm.coupons.manage":"Coupons","perm.ads.manage":"Manage ads","perm.notifications.send":"Send notifications","perm.settings.edit":"Store settings","perm.theme.edit":"Theme & layout","perm.pages.edit":"Edit page content","perm.barcode.print":"Print labels","perm.barcode.scan":"Scan & price display","perm.imagesearch.index":"Image index","perm.audit.view":"Audit log","perm.stats.view":"Statistics","perm.data.export":"Export data","misc.quickView":"Quick view","misc.addToHome":"Add to home screen","misc.installHint":'In your browser menu, choose "Add to Home screen" or "Install".',"misc.printBlocked":"The print dialog did not open; please allow pop-ups.","misc.saved":"Saved","misc.deleted":"Deleted","misc.updated":"Updated","misc.confirmDelete":"Delete this item?","misc.loadingMore":"Loading\u2026","misc.recentlyViewed":"Recently viewed","misc.uiSound":"UI click sound","misc.uiSoundOn":"Click sound on","misc.uiSoundOff":"Click sound off","misc.shareDone":"Link copied","misc.shareNative":"Share","img.alt":"Product image","adm.view":"View","adm.support":"Support chat","adm.supSelect":"Select a conversation","adm.supSelectHint":"Pick a thread from the list to reply.","adm.tkReply":"Support reply","adm.tkManage":"Ticket management","common.updated":"Updated","common.link":"Link","common.text":"Text","cart.coupon":"Coupon code","misc.sent":"Sent","misc.copied":"Copied","adm.revPending":"Pending","adm.revApproved":"Approved","adm.revRejected":"Rejected","adm.revApprove":"Approve","adm.revReject":"Reject","adm.revReply":"Shop reply","adm.revEmpty":"Nothing in this state","adm.revEmptyHint":"No new reviews or questions to moderate.","rev.buyer":"Buyer","rev.visitor":"Visitor","rev.shopReply":"Shop reply","fb.new":"New","fb.seen":"Seen","fb.inProgress":"In progress","fb.done":"Done","fb.rejected":"Rejected","feedback.suggestion":"Suggestion","feedback.complaint":"Complaint","feedback.bug":"Bug report","adm.fbEmptyHint":"No suggestions, complaints or bug reports yet.","adm.cpNew":"New coupon","adm.cpPercent":"Percent","adm.cpAmount":"Fixed amount","adm.cpValue":"Value","adm.cpUsage":"Usage","adm.cpDates":"Validity","adm.cpStart":"Starts","adm.cpEnd":"Ends","adm.cpExpired":"Expired","adm.adNew":"New banner","adm.adSlot":"Placement slot","adm.adsHint":"Schedule, enable or disable banners anywhere on the site.","adm.notifNew":"New notification","adm.notifHint":"Send a notification to everyone or to one user.","adm.notifLevel":"Level","adm.notifRecent":"Recent notifications","notif.level.info":"Info","notif.level.success":"Success","notif.level.warning":"Warning","notif.level.error":"Error","adm.pagesPick":"Pick a page","adm.pagesPickHint":"Choose a page from the list to edit its content.","adm.pgHint":"Changes are text-only and apply immediately.","adm.bPrinter":"Label printer","adm.bPrinterHint":"Labels go to the printer through the browser print dialog.","adm.bScanner":"Barcode scanner","adm.bLabels":"Build & print labels","adm.bPreview":"Label preview","adm.bPriceMode":"Price display mode","adm.bFound":"Product found","adm.bNotFound":"No product with this barcode.","adm.bPickFirst":"Select at least one product first.","adm.ixHint":"Image fingerprints are computed in the browser so visual search works.","adm.ixIndex":"Index remaining images","adm.ixReindex":"Re-index all","adm.ixDone":"Indexing done","adm.audActor":"Actor","adm.audAction":"Action","adm.audTarget":"Target","adm.audMeta":"Details","adm.stOrders":"Orders","adm.stRevenue":"Revenue","adm.stVisits":"Visits","adm.stUsers":"Users","adm.stProducts":"Products","adm.stAvg":"Average order","adm.stByCat":"Category performance","adm.stByBrand":"Top brands","adm.data":"Data","adm.dataHint":"Export, back up and clean up data.","adm.dExport":"Export","adm.dBackup":"Backup","adm.dBackupHint":"A full copy of the database is saved in the data folder.","adm.dCleanup":"Cleanup","adm.dCleanupHint":"Audit entries older than 90 days and expired sessions are removed.","sys.turnOn":"Turn the store on","sys.turnOff":"Turn the store off","sys.offConfirm":"Are you sure? Nobody can buy until you turn it back on.","sys.autoWakeMins":"Auto turn-on after minutes (0 = never)","sys.asleep":"The store is now off.","sys.asleepTimed":"The store is off; it turns back on automatically in {n} minutes.","sys.awake":"The store is on.","sys.sleepBanner":"The store is currently off. Use the \u201CTurn the store on\u201D button at the top of this page.","sys.keepAlive":"Keep the service warm","checkout.guestInfo":"Guest contact details","checkout.guestHint":"You can buy without an account; we only need this to coordinate delivery.","checkout.guestName":"Full name","checkout.guestPhone":"Mobile number","checkout.guestPhoneHint":"e.g. 09123456789","checkout.guestNameRequired":"Please enter your name.","checkout.guestPhoneInvalid":"Mobile number must be 11 digits starting with 09.","checkout.guestCodPickup":"Cash on delivery is only available for courier shipping. For pickup, pay online or sign in.","home.recent":"Continue where you left off","home.recentSub":"Products you viewed recently","checkout.guestCourierNote":"Sign in for courier delivery"},Hi={fa:Ja,en:To},Je="fa",Qs=new Set;wt=()=>Je,q=()=>Je==="fa";Fi=()=>[...Qs],Oi=()=>({fa:Object.keys(Ja).length,en:Object.keys(To).length})});var as={};Z(as,{applyDyn:()=>N,byId:()=>Ui,catIcon:()=>xe,copyText:()=>en,countdown:()=>Ki,debounce:()=>Ze,el:()=>Xt,esc:()=>h,faDigits:()=>oe,fileToDataURL:()=>Ie,fmtDate:()=>O,fmtDay:()=>Gi,fmtMoney:()=>A,fmtMoneyPlain:()=>Yi,fmtNum:()=>f,fmtTel:()=>ot,html:()=>r,icon:()=>i,latinDigits:()=>_i,linkify:()=>tn,locale:()=>Vi,pct:()=>Qi,qs:()=>I,qsa:()=>zi,raw:()=>ct,safeHref:()=>Dt,scrollTop:()=>Xi,setLocale:()=>Zs,stars:()=>Ht,throttle:()=>Ji,timeAgo:()=>xt});function es(t){return Xa+ts(String(t!=null?t:""))+Za}function h(t){if(t==null||t===!1)return es("");if(typeof t=="object"&&t!==null&&t[Ao]!==void 0)return t[Ao];let e=String(t);return e.includes(Xa)||e.includes(Za)?ts(e):es(e.replace(/[&<>"'`]/g,s=>ji[s]))}function r(t,...e){let s=t[0];for(let n=0;n<e.length;n++){let o=e[n];Array.isArray(o)?s+=o.map(c=>h(c)).join(""):s+=h(o),s+=t[n+1]}return es(s)}function Xt(t,e={},s=[]){let n=document.createElement(t);for(let[o,c]of Object.entries(e))c==null||c===!1||(o==="class"?n.className=c:o==="text"?n.textContent=c:o.startsWith("on")&&typeof c=="function"?n.addEventListener(o.slice(2).toLowerCase(),c):o==="style"&&typeof c=="object"?Object.assign(n.style,c):n.setAttribute(o,c));for(let o of[].concat(s))o==null||o===!1||n.appendChild(typeof o=="string"?document.createTextNode(o):o);return n}function i(t,e=""){return ct(`<svg class="ic ${e}" viewBox="0 0 24 24" aria-hidden="true"><use href="#i-${t}"/></svg>`)}function oe(t){return String(t).replace(/[0-9]/g,e=>Xs[+e])}function _i(t){return String(t).replace(/[۰-۹]/g,e=>Xs.indexOf(e)).replace(/[٠-٩]/g,e=>"\u0660\u0661\u0662\u0663\u0664\u0665\u0666\u0667\u0668\u0669".indexOf(e))}function Zs(t){At=t==="en"?"en":"fa"}function f(t){let e=Number(t)||0;return new Intl.NumberFormat(At==="fa"?"fa-IR":"en-US").format(e)}function Dt(t){let e=String(t||"").trim();return/^https?:\/\//i.test(e)?e:""}function ot(t){let e=String(t!=null?t:"").trim();if(!e)return"";let s=/^(0\d{2})(\d{4})(\d{4})$/.test(e)?e.replace(/^(0\d{2})(\d{4})(\d{4})$/,"$1-$2-$3"):/^(09\d{2})(\d{3})(\d{4})$/.test(e)?e.replace(/^(09\d{2})(\d{3})(\d{4})$/,"$1 $2 $3"):e;return At==="fa"?s.replace(/\d/g,n=>Xs[+n]):s}function A(t,{withUnit:e=!0}={}){let s=Math.round(Number(t)||0),n=new Intl.NumberFormat(At==="fa"?"fa-IR":"en-US").format(s);return e?ct(`${n} <span class="pc-cur">${At==="fa"?"\u062A\u0648\u0645\u0627\u0646":"Toman"}</span>`):n}function Yi(t){return new Intl.NumberFormat(At==="fa"?"fa-IR":"en-US").format(Math.round(Number(t)||0))}function O(t,{time:e=!0,short:s=!1}={}){if(!t)return"\u2014";let n=new Date(t);if(Number.isNaN(n.getTime()))return"\u2014";try{let o={calendar:At==="fa"?"persian":"gregory"};if(s)return n.toLocaleDateString(At==="fa"?"fa-IR":"en-GB",pt({year:"numeric",month:"short",day:"numeric"},o));let c=n.toLocaleDateString(At==="fa"?"fa-IR":"en-GB",pt({year:"numeric",month:"long",day:"numeric"},o));if(!e)return c;let l=n.toLocaleTimeString(At==="fa"?"fa-IR":"en-GB",{hour:"2-digit",minute:"2-digit"});return`${c} \xB7 ${l}`}catch(o){return n.toISOString().slice(0,16).replace("T"," ")}}function Gi(t){let e=new Date(t);if(Number.isNaN(e.getTime()))return"\u2014";try{return e.toLocaleDateString(At==="fa"?"fa-IR":"en-GB",{year:"numeric",month:"short",day:"numeric",calendar:At==="fa"?"persian":"gregory"})}catch(s){return t.slice(0,10)}}function xt(t){let e=new Date(t).getTime();if(Number.isNaN(e))return"\u2014";let s=Math.max(1,Math.floor((Date.now()-e)/1e3)),n=(o,c)=>{try{return new Intl.RelativeTimeFormat(At==="fa"?"fa":"en",{numeric:"auto"}).format(-o,c)}catch(l){return`${o} ${c}`}};return s<60?n(s,"second"):s<3600?n(Math.floor(s/60),"minute"):s<86400?n(Math.floor(s/3600),"hour"):s<2592e3?n(Math.floor(s/86400),"day"):s<31536e3?n(Math.floor(s/2592e3),"month"):n(Math.floor(s/31536e3),"year")}function Ki(t){let e=new Date(t).getTime()-Date.now();if(Number.isNaN(e))return"";if(e<=0)return At==="fa"?"\u067E\u0627\u06CC\u0627\u0646 \u06CC\u0627\u0641\u062A":"Expired";let s=Math.floor(e/864e5),n=Math.floor(e%864e5/36e5),o=Math.floor(e%36e5/6e4),c=Math.floor(e%6e4/1e3);if(s>0)return At==="fa"?`${oe(s)} \u0631\u0648\u0632 \u0648 ${oe(n)} \u0633\u0627\u0639\u062A`:`${s}d ${n}h`;let l=d=>String(d).padStart(2,"0"),m=`${l(n)}:${l(o)}:${l(c)}`;return At==="fa"?oe(m):m}function Ht(t,e=""){let s=Math.round(Number(t)||0),n='<span class="pc-stars">';for(let o=1;o<=5;o++)n+=`<svg class="ic ${o<=s?"":"off"} ${e}" aria-hidden="true"><use href="#i-star"/></svg>`;return ct(n+"</span>")}function Qi(t){return`${f(Math.round(Number(t)||0))}\u066A`}function tn(t){let e=h(t);return ct(e.replace(/(https?:\/\/[^\s<]+)/g,s=>`<a href="${s}" target="_blank" rel="noopener noreferrer nofollow">${s}</a>`))}function Ze(t,e=260){let s;return(...n)=>{clearTimeout(s),s=setTimeout(()=>t(...n),e)}}function Ji(t,e=200){let s=0,n=null;return(...o)=>{let c=Date.now(),l=e-(c-s);l<=0?(s=c,t(...o)):(clearTimeout(n),n=setTimeout(()=>{s=Date.now(),t(...o)},l))}}function Ie(t){return new Promise((e,s)=>{let n=new FileReader;n.onload=()=>{if(t.type&&t.type.startsWith("image/")&&t.type!=="image/svg+xml"){let o=new Image;o.onload=()=>{let c=o.width,l=o.height,m=1600;(c>m||l>m)&&(c>l?(l=Math.round(l*m/c),c=m):(c=Math.round(c*m/l),l=m));let d=document.createElement("canvas");d.width=c,d.height=l,d.getContext("2d").drawImage(o,0,0,c,l),e(d.toDataURL("image/webp",.85))},o.onerror=()=>e(String(n.result)),o.src=String(n.result)}else e(String(n.result))},n.onerror=()=>s(new Error("read-failed")),n.readAsDataURL(t)})}function en(t){var e;return(e=navigator.clipboard)!=null&&e.writeText?navigator.clipboard.writeText(t):new Promise((s,n)=>{try{let o=document.createElement("textarea");o.value=t,o.setAttribute("readonly",""),o.style.position="fixed",o.style.opacity="0",document.body.appendChild(o),o.select(),document.execCommand("copy"),document.body.removeChild(o),s()}catch(o){n(o)}})}function N(t=document){t.querySelectorAll("[data-w]").forEach(e=>{e.style.width=e.dataset.w}),t.querySelectorAll("[data-h]").forEach(e=>{e.style.height=e.dataset.h}),t.querySelectorAll("[data-maxw]").forEach(e=>{e.style.maxWidth=e.dataset.maxw})}function Xi(t=!0){window.scrollTo({top:0,behavior:t?"smooth":"auto"})}var Ao,Xa,Za,ts,ct,ji,I,zi,Ui,Wi,xe,Xs,At,Vi,U=V(()=>{Ao=Symbol("raw"),Xa="",Za="",ts=t=>t.replace(/[\u0001\u0002]/g,"");try{if(typeof Element!="undefined"){let t=Object.getOwnPropertyDescriptor(Element.prototype,"innerHTML");t&&t.set&&t.configurable!==!1&&Object.defineProperty(Element.prototype,"innerHTML",{configurable:!0,enumerable:t.enumerable,get(){return t.get.call(this)},set(s){t.set.call(this,typeof s=="string"&&(s.includes(Xa)||s.includes(Za))?ts(s):s)}});let e=Element.prototype.insertAdjacentHTML;e&&(Element.prototype.insertAdjacentHTML=function(s,n){return e.call(this,s,typeof n=="string"&&(n.includes(Xa)||n.includes(Za))?ts(n):n)})}}catch(t){}ct=t=>es(t),ji={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","`":"&#96;"};I=(t,e=document)=>e.querySelector(t),zi=(t,e=document)=>[...e.querySelectorAll(t)],Ui=t=>document.getElementById(t);Wi={cable:"cable",adapter:"plug",case:"shield",glass:"layers",powerbank:"battery",battery:"battery",dongle:"plug",speaker:"speaker",audio:"headset",wearable:"watch",content:"camera",gaming:"zap",car:"truck",light:"light",mics:"mic",misc:"box",watch:"watch",phone:"phone",chip:"chip",solder:"solder",tools:"wrench",fan:"fan",tv:"tv",keyboard:"keyboard",measure:"chart",network:"globe",parts:"chip"},xe=t=>Wi[t]||"box",Xs=["\u06F0","\u06F1","\u06F2","\u06F3","\u06F4","\u06F5","\u06F6","\u06F7","\u06F8","\u06F9"];At="fa";Vi=()=>At});var qa={};Z(qa,{BUILD:()=>an,CONSENT_TTL_DAYS:()=>No,CONSENT_VERSION:()=>vn,S:()=>p,adInSlot:()=>le,addSearch:()=>fn,addToCart:()=>os,applyCoupon:()=>rs,applyPrefs:()=>Ce,boot:()=>on,brandById:()=>Zi,brandName:()=>Gt,can:()=>Q,cartCount:()=>ac,catById:()=>Ee,catName:()=>qt,clearCart:()=>ln,clearSearches:()=>sc,connectEvents:()=>$n,deleteNotification:()=>hn,emit:()=>et,feat:()=>H,getImgIndex:()=>nc,hasAlert:()=>cs,hasConsent:()=>yn,inCompare:()=>un,inWishlist:()=>is,isAdmin:()=>tc,isPlus:()=>te,loadCart:()=>Mt,loadNotifications:()=>ye,loadPrefs:()=>Lo,markNotificationsRead:()=>ls,mergeGuestData:()=>bn,on:()=>Ft,ordersCfg:()=>nn,plusCfg:()=>xa,prodName:()=>vt,promptInstall:()=>Ea,pushRecent:()=>gn,refreshBootstrap:()=>Ot,refreshMe:()=>ee,removeFromCart:()=>cn,setConsent:()=>ds,setImgIndex:()=>oc,setPref:()=>Te,setQty:()=>rn,settings:()=>sn,ship:()=>ve,store:()=>Zt,themeCfg:()=>Mo,toggleAlert:()=>pn,toggleCompare:()=>mn,toggleWishlist:()=>dn,ui:()=>re,watchInstall:()=>kn,watchNetwork:()=>wn});function Ft(t,e){return ka.has(t)||ka.set(t,new Set),ka.get(t).add(e),()=>{var s;return(s=ka.get(t))==null?void 0:s.delete(e)}}function et(t,e){for(let s of ka.get(t)||[])try{s(e)}catch(n){console.error("[state]",t,n)}}function fe(t,e){try{let s=localStorage.getItem(t);return s?JSON.parse(s):e}catch(s){return e}}function qe(t,e){try{localStorage.setItem(t,JSON.stringify(e))}catch(s){}}function Lo(){var e;let t=fe(Pt.prefs,{});if(p.prefs=pt(pt({},p.prefs),t),(e=p.me)!=null&&e.prefs){let s=p.me.prefs;s.theme&&(p.prefs.theme=s.theme),s.locale&&(p.prefs.locale=s.locale),s.density&&s.density!=="normal"&&(p.prefs.density=s.density),s.reduceMotion!==void 0&&(p.prefs.reduceMotion=!!s.reduceMotion),s.uiSound!==void 0&&(p.prefs.uiSound=!!s.uiSound)}return p.prefs}function Te(t,e,{sync:s=!0}={}){if(p.prefs[t]=e,qe(Pt.prefs,p.prefs),Ce(),et("prefs",{key:t,value:e}),s&&p.me&&["theme","locale","density","reduceMotion","uiSound"].includes(t)){let n={theme:p.prefs.theme,locale:p.prefs.locale,density:p.prefs.density,reduceMotion:p.prefs.reduceMotion,uiSound:!!p.prefs.uiSound};v.patch("/api/me",{prefs:n}).then(o=>{o!=null&&o.me&&(p.me=o.me,et("me",p.me))}).catch(()=>{})}}function Ce(){var F,j,st,R,B,it;let t=document.documentElement,e=Mo(),s=p.prefs,n=s.locale||"fa";Js(n),Zs(n),t.setAttribute("data-lang",n);let o=s.theme||e.mode||"dark";o==="auto"&&(o=(F=window.matchMedia)!=null&&F.call(window,"(prefers-color-scheme: light)").matches?"light":"dark"),t.setAttribute("data-mode",o),t.setAttribute("data-theme",e.theme||"default"),t.setAttribute("color-scheme",o),t.setAttribute("data-port",e.portTheme===!1?"off":"on"),t.setAttribute("data-bg",e.bgStyle||"waves"),t.setAttribute("data-variant",e.variant==="classic"?"classic":"fresh");let c=Math.max(0,Math.min(28,Number((j=e.radius)!=null?j:16)));t.style.setProperty("--radius",`${c}px`),t.style.setProperty("--radius-sm",`${Math.max(4,Math.round(c*.68))}px`),t.style.setProperty("--radius-lg",`${Math.round(c*1.5)}px`);let l=s.density==="compact"||s.density==="comfy"?s.density:e.density||"normal";t.setAttribute("data-density",l),t.setAttribute("data-contrast",e.contrast==="high"?"high":"normal");let m=s.reduceMotion===!0||e.animations===!1;t.setAttribute("data-motion",m?"off":"on");let d=/^#[0-9a-f]{6}$/i.test(String(e.accent||"").trim())?e.accent.trim():"#f59e0b",[u,b,g]=ec(d).split(",").map(St=>parseInt(St,10));t.style.setProperty("--accent",d),t.style.setProperty("--accent-rgb",`${u}, ${b}, ${g}`),t.style.setProperty("--accent-2",Do(d,-34)),t.style.setProperty("--accent-3",Do(d,52)),t.style.setProperty("--accent-soft",`rgba(${u}, ${b}, ${g}, .14)`);let $=re();t.setAttribute("data-nav",$.navStyle==="underline"?"underline":"pills"),t.setAttribute("data-cards",$.cardStyle==="list"?"list":"grid"),t.style.setProperty("--cols-m",String(ss((st=$.columns)==null?void 0:st.mobile,2,1,3))),t.style.setProperty("--cols-t",String(ss((R=$.columns)==null?void 0:R.tablet,3,2,4))),t.style.setProperty("--cols-d",String(ss((B=$.columns)==null?void 0:B.desktop,4,3,6))),t.style.setProperty("--cols-w",String(ss((it=$.columns)==null?void 0:it.wide,5,3,7))),t.style.setProperty("--ticker-dur",`${Math.max(8,Number($.tickerSpeed)||30)}s`);let w=document.getElementById("headerGrid");w&&(w.setAttribute("data-search-position",["start","center","end"].includes($.searchPosition)?$.searchPosition:"center"),w.setAttribute("data-header-layout",["logoStart","split","centered"].includes($.headerLayout)?$.headerLayout:"split"));let k=document.getElementById("siteHeader");k&&k.setAttribute("data-sticky",$.stickyHeader===!1?"off":"on");let C=document.getElementById("topbar");C&&(C.hidden=$.showTicker===!1&&!p.ticker.length),et("theme",{mode:o,loc:n}),setTimeout(()=>{let St=document.querySelector('meta[name="theme-color"]');if(St){let nt=getComputedStyle(t).getPropertyValue("--bg").trim();nt&&St.setAttribute("content",nt)}},50)}function ss(t,e,s,n){let o=Number(t);return Number.isFinite(o)?Math.max(s,Math.min(n,Math.round(o))):e}function ec(t){let e=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(String(t).trim());return e?`${parseInt(e[1],16)}, ${parseInt(e[2],16)}, ${parseInt(e[3],16)}`:"49, 175, 212"}function Do(t,e){let s=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(String(t).trim());if(!s)return t;let n=o=>Math.max(0,Math.min(255,o+e)).toString(16).padStart(2,"0");return`#${n(parseInt(s[1],16))}${n(parseInt(s[2],16))}${n(parseInt(s[3],16))}`}async function on(){var s;p.recent=fe(Pt.recent,[]),p.searches=fe(Pt.search,[]),p.consent=fe(Pt.consent,null),p.wishlist=fe(Pt.wish,[]),p.compare=fe(Pt.cmp,[]),p.installed=((s=window.matchMedia)==null?void 0:s.call(window,"(display-mode: standalone)").matches)||typeof navigator!="undefined"&&navigator.standalone===!0;let t=null,e=Date.now();for(let n=0;n<10&&!t;n++){n&&await new Promise(o=>setTimeout(o,5e3));try{t=await v.get("/api/bootstrap")}catch(o){console.warn("[state] bootstrap failed",o)}!t&&Date.now()-e>6e3&&et("boot-slow")}return t&&(p.serverTime=t.serverTime,p.sleeping=!!t.sleeping,p.sleepSince=t.sleepSince||null,p.settings=t.settings||{},p.categories=t.categories||[],p.brands=t.brands||[],p.me=t.me||null,p.stats=t.stats||null,p.ads=t.ads||[],p.ticker=t.ticker||[],p.orderStatuses=t.orderStatuses||[],p.ticketCategories=t.ticketCategories||[],p.ticketPriorities=t.ticketPriorities||[]),t||et("boot-failed"),Lo(),Ce(),p.me&&(p.wishlist=p.me.wishlist||[],p.compare=p.me.compare||[],p.alerts=p.me.alerts||[],p.unread=p.me.unreadNotifications||0),await Promise.all([Mt().catch(()=>{}),p.me?ye(!0).catch(()=>{}):Promise.resolve()]),p.ready=!0,$n(),et("ready",p),p}async function Ot({silent:t=!1}={}){try{let e=await v.get("/api/bootstrap");return p.settings=e.settings||p.settings,p.sleeping=!!e.sleeping,p.sleepSince=e.sleepSince||null,p.categories=e.categories||p.categories,p.brands=e.brands||p.brands,p.stats=e.stats||null,p.ads=e.ads||[],p.ticker=e.ticker||[],e.me!==void 0&&(p.me=e.me||null,et("me",p.me)),Ce(),et("settings",p.settings),p}catch(e){if(!t)throw e;return p}}async function ee(){if(!p.me)return null;try{let t=await v.get("/api/me");return p.me=t.me||null,p.me&&(p.wishlist=p.me.wishlist||[],p.compare=p.me.compare||[],p.alerts=p.me.alerts||[],p.unread=p.me.unreadNotifications||0),et("me",p.me),p.me}catch(t){return p.me}}async function Mt(){var t,e;try{let s=await v.get("/api/cart");p.cart=s.cart||p.cart,((t=s.quote)==null?void 0:t.freeOver)!==void 0&&(p.freeOver=s.quote.freeOver),((e=s.quote)==null?void 0:e.plus)!==void 0&&(p.cartPlus=s.quote.plus)}catch(s){p.cart={items:[],count:0,subtotal:0,weight:0,coupon:null}}return et("cart",p.cart),p.cart}async function os(t,e=1){let s=await v.post("/api/cart/add",{productId:t,qty:e});return p.cart=s.cart,et("cart",p.cart),s}async function rn(t,e){let s=await v.patch("/api/cart/item",{productId:t,qty:e});return p.cart=s.cart,et("cart",p.cart),s}async function cn(t){let e=await v.del(`/api/cart/item/${encodeURIComponent(t)}`);return p.cart=e.cart,et("cart",p.cart),e}async function ln(){let t=await v.post("/api/cart/clear");return p.cart=t.cart||{items:[],count:0,subtotal:0,weight:0,coupon:null},et("cart",p.cart),t}async function rs(t){let e=await v.post("/api/cart/coupon",{code:t});return p.cart=e.cart,et("cart",p.cart),e}async function Sa(t,e){let s=await v.post(`/api/me/${t}/${encodeURIComponent(e)}`);return t==="wishlist"&&(p.wishlist=s.wishlist||p.wishlist),t==="compare"&&(p.compare=s.compare||p.compare),t==="alerts"&&(p.alerts=s.alerts||p.alerts),s}async function dn(t){if(!p.me){let s=p.wishlist.indexOf(t);return s>=0?p.wishlist.splice(s,1):p.wishlist.push(t),qe(Pt.wish,p.wishlist),et("wishlist",p.wishlist),{in:p.wishlist.includes(t)}}let e=await Sa("wishlist",t);return et("wishlist",p.wishlist),e}async function mn(t){if(!p.me){let s=p.compare.indexOf(t);return s>=0?p.compare.splice(s,1):(p.compare.length>=4&&p.compare.shift(),p.compare.push(t)),qe(Pt.cmp,p.compare),et("compare",p.compare),{in:p.compare.includes(t)}}let e=await Sa("compare",t);return et("compare",p.compare),e}async function pn(t){if(!p.me)throw new Error("login_required");let e=await Sa("alerts",t);return et("alerts",p.alerts),e}async function bn(){if(!p.me)return;let t=fe(Pt.wish,[]),e=fe(Pt.cmp,[]),s=[];for(let n of t)p.wishlist.includes(n)||s.push(Sa("wishlist",n).catch(()=>{}));for(let n of e)!p.compare.includes(n)&&p.compare.length<4&&s.push(Sa("compare",n).catch(()=>{}));await Promise.all(s),et("wishlist",p.wishlist),et("compare",p.compare)}async function ye(t=!1){if(!p.me)return p.notifications=[],p.unread=0,[];try{let e=await v.get("/api/me/notifications");p.notifications=e.items||[],p.unread=p.notifications.filter(s=>!s.read).length,p.me&&(p.me.unreadNotifications=p.unread),et("notifications",p.notifications)}catch(e){if(!t)throw e}return p.notifications}async function ls(t,e=!1){let s=await v.post("/api/me/notifications/read",{ids:t||[],all:e});return await ye(!0),s}async function hn(t){await v.del(`/api/me/notifications/${encodeURIComponent(t)}`),await ye(!0)}function gn(t){H("recentlyViewed")&&(p.recent=[t,...p.recent.filter(e=>e!==t)].slice(0,12),qe(Pt.recent,p.recent),et("recent",p.recent))}function fn(t){let e=String(t||"").trim();e&&(p.searches=[e,...p.searches.filter(s=>s!==e)].slice(0,8),qe(Pt.search,p.searches))}function sc(){p.searches=[],qe(Pt.search,[])}function ds(t){p.consent=Ut(pt({},t),{v:vn,at:new Date().toISOString()}),qe(Pt.consent,p.consent),p.me&&v.patch("/api/me",{consent:!0}).catch(()=>{}),et("consent",p.consent)}function $n(){if(ce)try{ce.close()}catch(t){}if(typeof EventSource!="undefined"){try{ce=new EventSource("/api/events",{withCredentials:!0})}catch(t){return}ce.addEventListener("ready",()=>{p.online=!0}),ce.addEventListener("support",t=>{et("sse:support",ns(t.data))}),ce.addEventListener("ticket",t=>{et("sse:ticket",ns(t.data)),et("notif",ns(t.data))}),ce.addEventListener("notif",t=>{et("sse:notif",ns(t.data)),ye(!0)}),ce.addEventListener("settings",()=>Ot({silent:!0})),ce.onerror=()=>{try{ce.close()}catch(t){}clearTimeout(Po),Po=setTimeout($n,8e3)}}}function ns(t){try{return JSON.parse(t)}catch(e){return null}}function wn(){window.addEventListener("online",()=>{p.online=!0,et("online",!0),Mt().catch(()=>{})}),window.addEventListener("offline",()=>{p.online=!1,et("online",!1)})}function kn(){window.addEventListener("beforeinstallprompt",t=>{t.preventDefault(),p.installPrompt=t,et("install",t)}),window.addEventListener("appinstalled",()=>{p.installed=!0,p.installPrompt=null,et("installed")})}async function Ea(){if(!p.installPrompt)return!1;p.installPrompt.prompt();let t=await p.installPrompt.userChoice;return p.installPrompt=null,(t==null?void 0:t.outcome)==="accepted"}function nc(){return fe(Pt.imgIdx,null)}function oc(t){qe(Pt.imgIdx,t)}var Pt,p,ka,an,sn,Zt,re,Mo,H,ve,xa,nn,Ee,Zi,te,tc,Q,qt,Gt,vt,le,ac,is,un,cs,vn,No,yn,ce,Po,K=V(()=>{tt();G();U();Pt={prefs:"bm_prefs_v1",cart:"bm_cart_local_v1",wish:"bm_wish_v1",cmp:"bm_cmp_v1",recent:"bm_recent_v1",search:"bm_search_v1",consent:"bm_consent_v1",imgIdx:"bm_img_index_v1"},p={ready:!1,serverTime:null,sleeping:!1,sleepSince:null,settings:null,categories:[],brands:[],me:null,stats:null,ads:[],ticker:[],orderStatuses:[],ticketCategories:[],ticketPriorities:[],cart:{items:[],count:0,subtotal:0,weight:0,coupon:null},wishlist:[],compare:[],alerts:[],notifications:[],unread:0,recent:[],searches:[],prefs:{theme:"dark",locale:"fa",density:"normal",reduceMotion:!1,view:"grid"},consent:null,online:typeof navigator!="undefined"?navigator.onLine:!0,installPrompt:null,installed:!1},ka=new Map;an="ys-v8",sn=()=>p.settings||{},Zt=()=>{var t;return((t=p.settings)==null?void 0:t.store)||{}},re=()=>{var t;return((t=p.settings)==null?void 0:t.ui)||{}},Mo=()=>{var t;return((t=p.settings)==null?void 0:t.theme)||{}},H=t=>{var e,s;return((s=(e=p.settings)==null?void 0:e.features)==null?void 0:s[t])!==!1},ve=()=>{var t;return((t=p.settings)==null?void 0:t.shipping)||{}},xa=()=>{var t;return((t=p.settings)==null?void 0:t.plus)||{}},nn=()=>{var t;return((t=p.settings)==null?void 0:t.orders)||{}},Ee=t=>p.categories.find(e=>e.id===t)||null,Zi=t=>p.brands.find(e=>e.id===t)||null,te=()=>{var t,e,s,n;return!!((e=(t=p.me)==null?void 0:t.plus)!=null&&e.active&&((n=(s=p.me)==null?void 0:s.plus)!=null&&n.until)&&new Date(p.me.plus.until)>new Date)},tc=()=>{var t;return!!((t=p.me)!=null&&t.isAdmin)},Q=t=>{var e;return p.me?p.me.role==="owner"?!0:((e=p.me.permissions)==null?void 0:e[t])===!0:!1},qt=t=>wt()==="fa"?(t==null?void 0:t.name)||"":(t==null?void 0:t.nameEn)||(t==null?void 0:t.name)||"",Gt=t=>wt()==="fa"?(t==null?void 0:t.name)||"":(t==null?void 0:t.nameEn)||(t==null?void 0:t.name)||"",vt=t=>wt()==="fa"?(t==null?void 0:t.name)||"":(t==null?void 0:t.nameEn)||(t==null?void 0:t.name)||"",le=t=>H("ads")?p.ads.filter(e=>e.slot===t&&e.active!==!1):[];ac=()=>{var t;return((t=p.cart)==null?void 0:t.count)||0};is=t=>p.wishlist.includes(t),un=t=>p.compare.includes(t),cs=t=>p.alerts.includes(t);vn=2,No=180,yn=()=>{let t=p.consent;if(!t||!t.at||(t.v||1)!==vn)return!1;let e=Date.parse(t.at);if(Number.isNaN(e))return!1;let s=Date.now()-e;return s>=0&&s<No*864e5};ce=null,Po=null});var Ma={};Z(Ma,{adaptive:()=>xn,clearInvalid:()=>ms,confirmDelete:()=>Kt,confirmDialog:()=>kt,copyWithToast:()=>$c,drawer:()=>Sn,emptyState:()=>L,errorState:()=>W,fillSelect:()=>yc,fireConfetti:()=>Pa,installHintModal:()=>Fe,lightbox:()=>He,listSkeleton:()=>hc,loadingBar:()=>Da,markInvalid:()=>vc,modal:()=>ut,notice:()=>Aa,productSkeleton:()=>bc,promptDialog:()=>de,readForm:()=>fc,sheet:()=>Ta,spinner:()=>Ca,tableSkeleton:()=>gc,toast:()=>lt,toastApiError:()=>S,toastError:()=>Y,toastSuccess:()=>x,toastWarn:()=>uc,uiClickSound:()=>ps,uiSoundEnabled:()=>Cn,updateSleepScreen:()=>Tn,wireAccordions:()=>En,wireTabs:()=>qn,withBusy:()=>D});function lt(t,{type:e="info",title:s="",timeout:n=3800,action:o=null}={}){let c=cc();if(!c)return null;let l=`t${++pc}`,m=dc[e]||"info",d=Xt("div",{class:`toast ${m}`,id:l,role:e==="error"?"alert":"status"});for(d.innerHTML=r`
    ${i(mc[e]||"info")}
    <div class="grow">
      ${s?r`<div class="toast-t">${s}</div>`:""}
      <div class="${s?"toast-d":"toast-t"}">${t}</div>
    </div>
    ${o?r`<button type="button" class="toast-act" data-tid="${l}">${o.label}</button>`:""}
    <button type="button" class="toast-x" aria-label="${a("common.close")}" data-close="${l}">${i("close")}</button>`,c.appendChild(d);c.children.length>4;)c.firstElementChild.remove();let u=()=>{d.isConnected&&(d.classList.add("out"),setTimeout(()=>d.remove(),220))},b=n>0?setTimeout(u,n):null;return d.addEventListener("click",g=>{if(g.target.closest("[data-close]")){clearTimeout(b),u();return}if(o&&g.target.closest("[data-tid]")){clearTimeout(b),u();try{o.onClick()}catch($){console.error($)}}}),{close:()=>{clearTimeout(b),u()}}}function S(t,e="err.generic"){let s=t instanceof ne?wt()==="en"&&t.details||t.message:Ks(t);Y(s||a(e))}function Io(t){t?(document.body.classList.add("locked"),document.documentElement.classList.add("locked")):Re.length||(document.body.classList.remove("locked"),document.documentElement.classList.remove("locked"))}function Be(t){var St;let{kind:e="modal",title:s="",subtitle:n="",size:o="md",body:c="",footer:l="",onMount:m=null,onClose:d=null,closeBtn:u=!0,dismissible:b=!0}=t,g=e==="modal"?rc():ic();if(!g)return{close:()=>{}};let $=document.activeElement,w=window.innerWidth<760,k=e==="drawer"&&w?"sheet":e,C=Xt("div",{class:`overlay${k==="drawer"?" overlay-drawer":""}${k==="sheet"?" overlay-sheet":""}`}),F=k==="modal"?`modal ${(St=lc[o])!=null?St:""}`.trim():k,j=Xt("div",{class:F,role:"dialog","aria-modal":"true"});s&&j.setAttribute("aria-label",s);let st=k==="modal"?"modal-h":"drawer-h",R=k==="modal"?"modal-b":"drawer-b";j.innerHTML=r`
    ${s?r`<header class="${st}">
      <div class="grow"><h3>${s}</h3>${n?r`<p class="small muted">${n}</p>`:""}</div>
      ${u?r`<button type="button" class="layer-x" data-lx aria-label="${a("common.close")}">${i("close")}</button>`:""}
    </header>`:u?r`<button type="button" class="layer-x" data-lx aria-label="${a("common.close")}">${i("close")}</button>`:""}
    <div class="${R}">${c}</div>
    ${l?r`<footer class="modal-f">${l}</footer>`:""}`,C.appendChild(j),g.appendChild(C),Io(!0);let B=!1,it={panel:j,overlay:C,result:void 0,dismissible:b,close(nt){if(!B){B=!0,it.result=nt,C.classList.add("out"),j.classList.add("out"),setTimeout(()=>{var ft;C.remove();let M=Re.indexOf(it);M>=0&&Re.splice(M,1),Io(!1);try{(ft=$==null?void 0:$.focus)==null||ft.call($,{preventScroll:!0})}catch(zt){}},190);try{d==null||d(nt)}catch(M){console.error(M)}}}};Re.push(it),C.addEventListener("click",nt=>{if(u&&nt.target.closest("[data-lx]")){it.close(null);return}nt.target===C&&b&&it.close(null)}),j.addEventListener("keydown",nt=>{if(nt.key!=="Tab")return;let ft=[...j.querySelectorAll('a[href], button:not([disabled]), textarea, input:not([type=hidden]), select, [tabindex]:not([tabindex="-1"])')].filter(ge=>ge.offsetParent!==null);if(!ft.length)return;let zt=ft[0],Yt=ft[ft.length-1];nt.shiftKey&&document.activeElement===zt?(nt.preventDefault(),Yt.focus()):!nt.shiftKey&&document.activeElement===Yt&&(nt.preventDefault(),zt.focus())}),setTimeout(()=>{let nt=j.querySelector("[data-autofocus], input:not([type=hidden]), textarea, select");try{nt==null||nt.focus({preventScroll:!0})}catch(M){}},70);try{m==null||m(j,it)}catch(nt){console.error(nt)}return it}function kt({title:t="",text:e="",okText:s="",cancelText:n="",danger:o=!1,icon:c="alert"}={}){return new Promise(l=>{let m=!1;Be({kind:"modal",title:t||a("common.warning"),size:"sm",body:r`
        <div class="confirm-body">
          <span class="confirm-ic ${o?"danger":""}">${i(c)}</span>
          <p class="confirm-text">${e}</p>
        </div>`,footer:r`
        <button type="button" class="btn btn-ghost" data-no>${n||a("common.cancel")}</button>
        <button type="button" class="btn ${o?"btn-danger":"btn-primary"}" data-yes data-autofocus>${s||a("common.confirm")}</button>`,onClose:()=>l(m),onMount:(d,u)=>{d.querySelector("[data-no]").addEventListener("click",()=>{m=!1,u.close()}),d.querySelector("[data-yes]").addEventListener("click",()=>{m=!0,u.close()})}})})}function de({title:t="",text:e="",label:s="",value:n="",type:o="text",okText:c="",required:l=!1,rows:m=4}={}){return new Promise(d=>{let u=null;Be({kind:"modal",title:t||a("common.note"),size:"sm",body:r`
        <form class="prompt-form" data-pf>
          ${e?r`<p class="confirm-text mb-s">${e}</p>`:""}
          <label class="field">
            <span class="label">${s||t}</span>
            ${o==="textarea"?r`<textarea class="textarea" name="v" rows="${m}" data-autofocus>${n}</textarea>`:r`<input class="input" type="${o}" name="v" value="${n}" data-autofocus>`}
          </label>
        </form>`,footer:r`
        <button type="button" class="btn btn-ghost" data-no>${a("common.cancel")}</button>
        <button type="button" class="btn btn-primary" data-yes>${c||a("common.confirm")}</button>`,onClose:()=>d(u),onMount:(b,g)=>{let $=b.querySelector("[name=v]"),w=()=>{let k=String($.value||"").trim();if(l&&!k){$.classList.add("invalid"),$.focus();return}u=k,g.close()};b.querySelector("[data-no]").addEventListener("click",()=>{u=null,g.close()}),b.querySelector("[data-yes]").addEventListener("click",w),b.querySelector("[data-pf]").addEventListener("submit",k=>{k.preventDefault(),w()}),$.addEventListener("keydown",k=>{k.key==="Enter"&&o!=="textarea"&&(k.preventDefault(),w())})}})})}function He(t,e=0,s=""){let n=w=>typeof w=="string"?{url:w,kind:"image"}:w,o=(Array.isArray(t)?t:[t]).filter(Boolean).map(n).filter(w=>w.url);if(!o.length)return null;let c=Math.max(0,Math.min(e,o.length-1)),l=null,m=1,d=0,u=0,b=w=>{let k=w==null?void 0:w.querySelector(".lb-img");k&&(k.style.transform=`translate(${d.toFixed(0)}px, ${u.toFixed(0)}px) scale(${m.toFixed(2)})`),w==null||w.classList.toggle("zoomed",m>1.01)},g=()=>{m=1,d=0,u=0},$=()=>{let w=o[c],k=w.kind==="video"?`<video class="lb-img lb-video" src="${w.url}" controls playsinline autoplay preload="metadata"></video>`:`<img class="lb-img" src="${w.url}" alt="${s||a("img.alt")}" decoding="async" draggable="false">
       <div class="watermark-overlay"><div class="watermark-text">${document.title.split("\xB7").pop().trim()}</div></div>`;return r`
    <figure class="lb-figure">
      ${ct(k)}
      <div class="lb-tools" role="toolbar" aria-label="${a("pdp.zoomHint")}">
        <button type="button" class="icon-btn" data-zin aria-label="${a("pdp.zoomIn")}">${i("plus")}</button>
        <button type="button" class="icon-btn" data-zout aria-label="${a("pdp.zoomOut")}">${i("minus")}</button>
        <button type="button" class="icon-btn tiny-txt" data-zreset aria-label="${a("pdp.zoomReset")}">1x</button>
      </div>
      ${o.length>1?r`<figcaption class="lb-count">${c+1} / ${o.length}${w.kind==="video"?` \xB7 ${a("pdp.video")}`:""}</figcaption>`:""}
    </figure>`};return Be({kind:"modal",size:"lg",title:"",body:r`<div data-lb>${$()}</div>`,footer:o.length>1?r`
      <button type="button" class="btn btn-ghost" data-prev>${i("chevron-right")} ${a("common.prev")}</button>
      <button type="button" class="btn btn-ghost" data-next>${a("common.next")} ${i("chevron-left")}</button>`:"",onClose:()=>{l&&document.removeEventListener("keydown",l),l=null},onMount:w=>{var St,nt;let k=w.querySelector("[data-lb]"),C=()=>k.querySelector(".lb-figure"),F=M=>{c=(c+M+o.length)%o.length,g(),k.innerHTML=$(),it()};(St=w.querySelector("[data-prev]"))==null||St.addEventListener("click",()=>F(-1)),(nt=w.querySelector("[data-next]"))==null||nt.addEventListener("click",()=>F(1));let j=(M,ft,zt)=>{let Yt=Math.max(1,Math.min(4,m*M));Yt===1?(d=0,u=0):ft!=null&&(d=ft-(ft-d)*(Yt/m),u=zt-(zt-u)*(Yt/m)),m=Yt,b(C())},st=new Map,R=0,B=1,it=()=>{var Yt,ge,Ne,Ka,go,fo;let M=C();if(!M)return;let ft=M.querySelector(".lb-img");(Yt=M.querySelector("[data-zin]"))==null||Yt.addEventListener("click",()=>j(1.5)),(ge=M.querySelector("[data-zout]"))==null||ge.addEventListener("click",()=>j(1/1.5)),(Ne=M.querySelector("[data-zreset]"))==null||Ne.addEventListener("click",()=>{g(),b(M)}),M.addEventListener("wheel",Et=>{if(o[c].kind==="video")return;Et.preventDefault();let Bt=M.getBoundingClientRect();j(Et.deltaY<0?1.18:1/1.18,Et.clientX-Bt.left-Bt.width/2,Et.clientY-Bt.top-Bt.height/2)},{passive:!1}),M.addEventListener("dblclick",Et=>{if(o[c].kind==="video")return;let Bt=M.getBoundingClientRect();m>1.01?g():j(2.5,Et.clientX-Bt.left-Bt.width/2,Et.clientY-Bt.top-Bt.height/2),b(M)}),M.addEventListener("pointerdown",Et=>{var Bt;if(o[c].kind!=="video"){if(st.set(Et.pointerId,[Et.clientX,Et.clientY]),st.size===2){let[$a,wa]=[...st.values()];R=Math.hypot($a[0]-wa[0],$a[1]-wa[1]),B=m}(Bt=M.setPointerCapture)==null||Bt.call(M,Et.pointerId)}}),M.addEventListener("pointermove",Et=>{if(!st.has(Et.pointerId))return;let Bt=st.get(Et.pointerId);if(st.set(Et.pointerId,[Et.clientX,Et.clientY]),st.size===2&&R){let[$a,wa]=[...st.values()],Di=Math.hypot($a[0]-wa[0],$a[1]-wa[1]);m=Math.max(1,Math.min(4,B*(Di/R))),m===1&&(d=0,u=0),b(M)}else m>1.01&&(d+=Et.clientX-Bt[0],u+=Et.clientY-Bt[1],b(M))});let zt=Et=>{st.delete(Et.pointerId),st.size<2&&(R=0)};M.addEventListener("pointerup",zt),M.addEventListener("pointercancel",zt),(Ka=M.querySelector("[data-zin]"))==null||Ka.addEventListener("click",()=>j(1.3)),(go=M.querySelector("[data-zout]"))==null||go.addEventListener("click",()=>j(1/1.3)),(fo=M.querySelector("[data-zreset]"))==null||fo.addEventListener("click",()=>{g(),b(M)}),b(M)};it(),l=M=>{M.key==="ArrowLeft"?F(1):M.key==="ArrowRight"?F(-1):M.key==="+"||M.key==="="?j(1.3):M.key==="-"?j(1/1.3):M.key==="0"&&(g(),b(C()))},document.addEventListener("keydown",l)}})}function bc(t=8){let e="";for(let s=0;s<t;s++)e+='<div class="sk sk-card"></div>';return ct(`<div class="pgrid">${e}</div>`)}function hc(t=5,e=3){let s="";for(let n=0;n<t;n++){let o="";for(let c=0;c<e;c++)o+=`<div class="sk sk-line w${[70,40,55,80][c%4]}"></div>`;s+=r`<div class="card row-card">${o}</div>`}return s}function gc(t=6,e=4){let s="";for(let n=0;n<t;n++){let o="";for(let c=0;c<e;c++)o+=`<td><div class="sk sk-line w${[80,55,40,70][c%4]}"></div></td>`;s+=`<tr>${o}</tr>`}return ct(`<div class="table-wrap"><table class="table"><tbody>${s}</tbody></table></div>`)}function L({icon:t="box",title:e="",text:s="",action:n=null,act:o=null}={}){return r`
    <div class="empty">
      <span class="empty-ic">${i(t)}</span>
      <h4>${e||a("common.noData")}</h4>
      ${s?r`<p>${s}</p>`:""}
      ${n?r`<a class="btn btn-primary" href="${n.href||"#/"}">${n.label}</a>`:""}
      ${o?r`<button type="button" class="btn btn-primary" data-act="${o.act}" ${o.arg?r`data-arg="${o.arg}"`:""}>${o.label}</button>`:""}
    </div>`}function W({title:t="",text:e="",retryAct:s="ui-retry"}={}){return r`
    <div class="empty">
      <span class="empty-ic danger">${i("alert")}</span>
      <h4>${t||a("err.generic")}</h4>
      ${e?r`<p>${e}</p>`:""}
      <button type="button" class="btn btn-primary" data-act="${s}">${a("common.retry")}</button>
    </div>`}function Da(t){t?(clearTimeout(Ro),Wt||(Wt=Xt("div",{class:"loadbar"}),Wt.innerHTML='<span class="loadbar-fill"></span>',document.body.appendChild(Wt)),requestAnimationFrame(()=>Wt==null?void 0:Wt.classList.add("on"))):Ro=setTimeout(()=>{Wt==null||Wt.classList.remove("on"),setTimeout(()=>{Wt==null||Wt.remove(),Wt=null},420)},160)}async function D(t,e,{busyText:s=""}={}){let n=typeof t=="string"?I(t):t,o=n?n.innerHTML:"";try{return n&&(n.disabled=!0,n.classList.add("busy"),n.innerHTML=r`<span class="spinner"></span>${s||a("common.loading")}`),await e()}finally{n&&(n.disabled=!1,n.classList.remove("busy"),n.innerHTML=o)}}function fc(t){let e={},s=new FormData(t);for(let[n,o]of s.entries())n in e&&!Array.isArray(e[n])?e[n]=[e[n],o]:n in e?e[n].push(o):e[n]=o;for(let n of t.querySelectorAll("input[type=checkbox]"))e[n.name]=n.checked;return e}function vc(t,e,s){var c;let n=t.querySelector(`[name="${e}"]`);if(!n)return;n.classList.add("invalid");let o=(c=n.closest(".field"))==null?void 0:c.querySelector(".field-err");o||(o=Xt("span",{class:"field-err"}),(n.closest(".field")||n.parentElement).appendChild(o)),o.textContent=s;try{n.focus({preventScroll:!1})}catch(l){}}function ms(t){t.querySelectorAll(".invalid").forEach(e=>e.classList.remove("invalid")),t.querySelectorAll(".field-err").forEach(e=>e.remove())}function yc(t,e,{valueKey:s="id",labelKey:n="label",placeholder:o="",selected:c=""}={}){if(!t)return;let l=o?[`<option value="">${h(o)}</option>`]:[];for(let m of e){let d=m[s];l.push(`<option value="${h(d)}"${String(d)===String(c)?" selected":""}>${h(m[n])}</option>`)}t.innerHTML=l.join("")}async function $c(t,e){let{copyText:s}=await Promise.resolve().then(()=>(U(),as));try{await s(String(t)),x(e||a("common.copied"))}catch(n){Y(a("err.generic"))}}function Fe(){let t=wt()==="fa"?["\u0645\u0646\u0648\u06CC \u0645\u0631\u0648\u0631\u06AF\u0631 (\u22EE \u06CC\u0627 \u062F\u06A9\u0645\u0647\u0654 \u0627\u0634\u062A\u0631\u0627\u06A9\u200C\u06AF\u0630\u0627\u0631\u06CC) \u0631\u0627 \u0628\u0627\u0632 \u06A9\u0646.","\u06AF\u0632\u06CC\u0646\u0647\u0654 \xAB\u0627\u0641\u0632\u0648\u062F\u0646 \u0628\u0647 \u0635\u0641\u062D\u0647\u0654 \u0627\u0635\u0644\u06CC\xBB \u06CC\u0627 \xABInstall app\xBB \u0631\u0627 \u0628\u0632\u0646.","\u062A\u0623\u06CC\u06CC\u062F \u06A9\u0646\u061B \u0622\u06CC\u06A9\u0648\u0646 \u06CC\u0627\u0633\u0627\u06CC\u06CC \u0628\u0647 \u0635\u0641\u062D\u0647\u0654 \u0627\u0635\u0644\u06CC \u0627\u0636\u0627\u0641\u0647 \u0645\u06CC\u200C\u0634\u0648\u062F."]:["Open the browser menu (\u22EE or the Share button).","Choose \u201CAdd to Home screen\u201D or \u201CInstall app\u201D.","Confirm \u2014 the Yassaei Electronics icon appears on your home screen."];ut({title:a("misc.addToHome"),size:"sm",body:r`
      <div class="install-hint">
        <ol class="steps-list">${t.map(e=>r`<li>${e}</li>`)}</ol>
        <p class="muted small">${a("misc.installHint")}</p>
      </div>`,footer:r`<button type="button" class="btn btn-primary" data-ok>${a("common.done")}</button>`,onMount:(e,s)=>e.querySelector("[data-ok]").addEventListener("click",()=>s.close())})}function En(t=document){t.querySelectorAll(".acc-h").forEach(e=>{e.dataset.wired||(e.dataset.wired="1",e.addEventListener("click",()=>{let s=e.closest(".acc-item"),n=s.classList.toggle("open"),o=s.querySelector(".acc-b");o&&(o.hidden=!n),e.setAttribute("aria-expanded",String(n))}))})}function qn(t=document,e=null){t.querySelectorAll(".tabs").forEach(s=>{s.dataset.wired||(s.dataset.wired="1",s.addEventListener("click",n=>{let o=n.target.closest("[data-tab]");if(!o)return;let c=o.dataset.tab;s.querySelectorAll("[data-tab]").forEach(m=>m.classList.toggle("active",m===o)),t.querySelectorAll("[data-panel]").forEach(m=>{m.hidden=m.dataset.panel!==c}),e==null||e(c)}))})}function Tn({sleeping:t=!1,canWake:e=!1,since:s=null,onWake:n=null,onLogin:o=null}={}){var g,$,w,k,C,F;let c="sleepScreen",l=document.getElementById(c);if(!t){l&&l.remove(),(g=document.body)==null||g.classList.remove("sleeping");return}($=document.body)==null||$.classList.add("sleeping");let m=wt()==="fa",d=m?"\u0641\u0631\u0648\u0634\u06AF\u0627\u0647 \u0627\u0644\u0627\u0646 \u062E\u0627\u0645\u0648\u0634 \u0627\u0633\u062A":"The store is asleep",u=m?"\u0628\u0631\u0627\u06CC \u0627\u0633\u062A\u0631\u0627\u062D\u062A \u0648 \u0646\u06AF\u0647\u062F\u0627\u0631\u06CC\u060C \u0641\u0631\u0648\u0634\u06AF\u0627\u0647 \u0631\u0627 \u062E\u0627\u0645\u0648\u0634 \u06A9\u0631\u062F\u0647\u200C\u0627\u06CC\u0645. \u06A9\u0633\u06CC \u0646\u0645\u06CC\u200C\u062A\u0648\u0627\u0646\u062F \u0633\u0641\u0627\u0631\u0634 \u062B\u0628\u062A \u06A9\u0646\u062F \u062A\u0627 \u062F\u0648\u0628\u0627\u0631\u0647 \u0631\u0648\u0634\u0646 \u0634\u0648\u062F.":"The shop was switched off for a break. Nobody can place orders until it is turned on again.",b=s?`<div class="tiny sleep-since">${m?"\u062E\u0627\u0645\u0648\u0634 \u0627\u0632":"Asleep since"}: ${new Date(s).toLocaleString(m?"fa-IR":"en-GB")}</div>`:"";l||(l=document.createElement("div"),l.id=c,l.className="sleep-screen",l.setAttribute("role","dialog"),l.setAttribute("aria-modal","true"),(w=document.body)==null||w.appendChild(l)),l.innerHTML=r`
    <div class="sleep-card">
      <span class="sleep-ic">${i("moon")}</span>
      <h2>${d}</h2>
      <p>${u}</p>
      ${ct(b)}
      ${e?r`<button class="btn btn-primary btn-block mt" data-sleep-wake>${i("zap")} ${m?"\u0631\u0648\u0634\u0646 \u06A9\u0631\u062F\u0646 \u0641\u0631\u0648\u0634\u06AF\u0627\u0647":"Turn the store on"}</button>`:r`
          <a class="btn btn-outline btn-block mt" href="#/auth" data-sleep-login>${i("user")} ${m?"\u0648\u0631\u0648\u062F \u0645\u062F\u06CC\u0631 \u0628\u0631\u0627\u06CC \u0631\u0648\u0634\u0646 \u06A9\u0631\u062F\u0646":"Sign in as admin to turn it on"}</a>
          <button class="btn btn-ghost btn-block mt-s" data-sleep-reload>${i("refresh")} ${m?"\u062A\u0644\u0627\u0634 \u062F\u0648\u0628\u0627\u0631\u0647":"Try again"}</button>`}
      <p class="tiny sleep-note">${m?"\u062E\u0648\u062F\u06A9\u0627\u0631 \u062E\u0627\u0645\u0648\u0634 \u0646\u0645\u06CC\u200C\u0634\u0648\u062F\u061B \u062A\u0627 \u0648\u0642\u062A\u06CC \u0631\u0648\u0634\u0646\u0634 \u0646\u06A9\u0646\u06CC \u062E\u0627\u0645\u0648\u0634 \u0645\u06CC\u200C\u0645\u0627\u0646\u062F.":"It never turns off by itself \u2014 it stays off until you switch it on."}</p>
    </div>`,(k=l.querySelector("[data-sleep-wake]"))==null||k.addEventListener("click",async j=>{let st=j.currentTarget;st.disabled=!0;try{await(n==null?void 0:n())}finally{st.disabled=!1}}),(C=l.querySelector("[data-sleep-reload]"))==null||C.addEventListener("click",()=>location.reload()),(F=l.querySelector("[data-sleep-login]"))==null||F.addEventListener("click",()=>o==null?void 0:o())}function Bo(t){var e,s;(s=(e=t.querySelectorAll)==null?void 0:e.call(t,'input[type="password"]'))==null||s.forEach(n=>{if(n.dataset.pwdDone)return;n.dataset.pwdDone="1";let o=document.createElement("span");o.className="pwd-wrap",n.parentNode.insertBefore(o,n),o.appendChild(n);let c=document.createElement("button");c.type="button",c.className="pwd-eye",c.dataset.eye="1",c.setAttribute("aria-label",a("pwd.show")),c.title=a("pwd.show"),c.innerHTML=i("eye"),o.appendChild(c)})}function ps(t=!1){if(!(!t&&!Cn()))try{Ae=Ae||new(window.AudioContext||window.webkitSoundContext||window.webkitAudioContext),Ae.state==="suspended"&&Ae.resume();let e=Ae.currentTime,s=Ae.createOscillator(),n=Ae.createGain();s.type="sine",s.frequency.setValueAtTime(1560,e),s.frequency.exponentialRampToValueAtTime(1180,e+.06),n.gain.setValueAtTime(1e-4,e),n.gain.exponentialRampToValueAtTime(.045,e+.008),n.gain.exponentialRampToValueAtTime(1e-4,e+.075),s.connect(n).connect(Ae.destination),s.start(e),s.stop(e+.09)}catch(e){}}function Cn(){try{return!!JSON.parse(localStorage.getItem("bm_prefs_v1")||"{}").uiSound}catch(t){return!1}}function Pa(){let t=["var(--accent)","var(--accent-2)","#ffeb3b","#f44336","#4caf50","#2196f3","#e91e63"];for(let e=0;e<60;e++){let s=document.createElement("div");s.className="confetti",s.style.backgroundColor=t[Math.floor(Math.random()*t.length)],s.style.left=Math.random()*100+"vw",s.style.opacity=Math.random()+.5,s.style.transform=`scale(${Math.random()*.8+.4})`,s.style.animationDuration=Math.random()*2.5+2.5+"s",s.style.animationDelay=Math.random()*.2+"s",document.body.appendChild(s),setTimeout(()=>s.isConnected&&s.remove(),5500)}}var rc,ic,cc,lc,dc,mc,pc,x,Y,uc,Re,ut,Sn,Ta,xn,Kt,Ca,Aa,Wt,Ro,Ae,J=V(()=>{U();G();tt();rc=()=>I("#modalRoot"),ic=()=>I("#drawerRoot"),cc=()=>I("#toastRoot"),lc={sm:"narrow",md:"",lg:"wide",xl:"wide"},dc={success:"success",error:"error",warn:"warning",warning:"warning",info:"info"},mc={success:"check-circle",error:"alert",warn:"alert",warning:"alert",info:"info"},pc=0;x=(t,e)=>lt(t,pt({type:"success"},e)),Y=(t,e)=>lt(t,pt({type:"error",timeout:5600},e)),uc=(t,e)=>lt(t,pt({type:"warn"},e));Re=[];document.addEventListener("keydown",t=>{if(t.key==="Escape"&&Re.length){let e=Re[Re.length-1];e.dismissible!==!1&&(t.preventDefault(),e.close(null))}});ut=t=>Be(pt({kind:"modal"},t)),Sn=t=>Be(pt({kind:"drawer"},t)),Ta=t=>Be(pt({kind:"sheet"},t)),xn=t=>Be(pt({kind:window.innerWidth<760?"sheet":"modal"},t));Kt=t=>kt({title:a("common.delete"),text:t||a("misc.confirmDelete"),okText:a("common.delete"),danger:!0,icon:"trash"});Ca=(t="")=>r`<div class="row center mt-l" role="status"><span class="spinner"></span>${t?r`<span class="muted small">${t}</span>`:""}</div>`;Aa=(t,e)=>r`
  <div class="notice notice-${t}">${i(t==="success"?"check-circle":t==="danger"?"alert":"info")}<div class="grow">${e}</div></div>`,Wt=null,Ro=null;document.addEventListener("click",t=>{var c,l,m;let e=(l=(c=t.target).closest)==null?void 0:l.call(c,"[data-eye]");if(!e)return;let s=(m=e.parentElement)==null?void 0:m.querySelector("input");if(!s)return;let n=s.type==="password";s.type=n?"text":"password",e.innerHTML=i(n?"eye-off":"eye");let o=n?a("pwd.hide"):a("pwd.show");e.setAttribute("aria-label",o),e.title=o,s.focus({preventScroll:!0})},!0);new MutationObserver(t=>{for(let e of t)e.addedNodes.forEach(s=>{s.nodeType===1&&Bo(s)})}).observe(document.documentElement,{childList:!0,subtree:!0});Bo(document);Ae=null;document.addEventListener("pointerdown",t=>{var e,s;Cn()&&(s=(e=t.target).closest)!=null&&s.call(e,'button, a, [role="button"], .pcard, .chip, .gal-thumb')&&ps(!0)},!0)});function Oe(t,e=""){let s=t.images&&t.images[0]||"",n=vt(t)||a("img.alt");return s?r`<img class="${e}" src="${s}" alt="${n}" loading="lazy" decoding="async" data-glyph="${t.glyph||"misc"}">`:ct(`<svg class="ic ph-img ${e}" data-glyph="${h(t.glyph||"misc")}" role="img" aria-label="${h(n)}"><use href="#i-${xe(t.glyph||"misc")}"/></svg>`)}function wc(t,{quick:e=null}={}){var d;let s=(re().productCardInfo||[]).includes("brand"),n=(re().productCardInfo||[]).includes("stock"),o=(re().productCardInfo||[]).includes("rating"),c=e!==null?e:H("compare")||re().quickView!==!1,l=(d=t.stock)!=null?d:0,m=l<=0?"out":l<=3?"low":"";return r`
  <article class="pcard" data-pid="${t.id}">
    <div class="pc-media">
      <a href="#/product/${t.id}" aria-label="${vt(t)}">${Oe(t)}</a>
      <div class="ribbon">
        ${t.discountPct>0?r`<span class="badge-pill bp-danger">${f(t.discountPct)}٪ ${a("pdp.off")}</span>`:""}
        ${l<=0?r`<span class="badge-pill bp-muted">${a("card.outOfStock")}</span>`:""}
        ${t.featured?r`<span class="badge-pill bp-accent">${i("star")} ${a("home.featured")}</span>`:""}
      </div>
      <div class="pc-quick">
        ${re().quickView!==!1?r`<button type="button" class="pc-qbtn" data-act="quick-view" data-id="${t.id}" title="${a("card.quickView")}" aria-label="${a("card.quickView")}">${i("eye")}</button>`:""}
        ${H("wishlist")?r`<button type="button" class="pc-qbtn" data-act="wish-toggle" data-id="${t.id}" title="${a("card.wishlistAdd")}" aria-label="${a("card.wishlistAdd")}">${i("heart")}</button>`:""}
        ${H("compare")?r`<button type="button" class="pc-qbtn" data-act="compare-toggle" data-id="${t.id}" title="${a("card.compareAdd")}" aria-label="${a("card.compareAdd")}">${i("compare")}</button>`:""}
      </div>
    </div>
    <div class="pc-body">
      ${s&&t.brandName?r`<span class="pc-brand">${wt()==="fa"?t.brandName:t.brandNameEn||t.brandName}</span>`:""}
      <h3 class="pc-name"><a href="#/product/${t.id}">${vt(t)}</a></h3>
      ${o&&t.ratingCount>0?r`<div class="pc-rate">${Ht(t.ratingAvg)} <span>${f(t.ratingAvg)} (${f(t.ratingCount)})</span></div>`:""}
      ${n?r`<div class="pc-stock ${m}"><span class="dot"></span>${l<=0?a("card.outOfStock"):l<=3?a("common.lowStock"):a("common.inStock")}</div>`:""}
      <div class="pc-price">
        ${t.oldPrice>t.price?r`<span class="pc-old">${A(t.oldPrice)}</span>`:""}
        ${t.price?r`<span class="pc-now">${A(t.price)}</span>`:r`<span class="pc-now pc-inquire">${a("price.inquire")}</span>`}
      </div>
      <div class="pc-actions">
        ${t.price?r`<button type="button" class="btn btn-primary" data-act="add-cart" data-id="${t.id}" ${l<=0?"disabled":""}>${i("cart")} ${a("card.addToCart")}</button>`:r`<a class="btn btn-outline" href="#/product/${t.id}">${i("phone")} ${a("price.inquireShort")}</a>`}
      </div>
    </div>
  </article>`}function Ho(t,e=null){return r`
    <a class="cat-card" href="#/category/${t.id}">
      <span class="cat-ic">${i(xe(t.glyph))}</span>
      <span class="cat-name">${qt(t)}</span>
      ${e!==null?r`<span class="cat-count">${f(e)} ${a("catalog.count")}</span>`:""}
    </a>`}function kc(t){let e=wt()==="en"&&t.titleEn?t.titleEn:t.title,s=wt()==="en"&&t.textEn?t.textEn:t.text,n=wt()==="en"&&t.ctaEn?t.ctaEn:t.cta;return r`
    <div class="banner">
      <div class="banner-body">
        <div class="banner-title">${e}</div>
        ${s?r`<div class="banner-text">${s}</div>`:""}
      </div>
      ${t.link?r`<a class="btn btn-primary banner-cta" href="${t.link.startsWith("#")||t.link.startsWith("/")?t.link:"#/"}">${n||a("common.more")} ${i("chevron-left")}</a>`:""}
    </div>`}function Nt({titleIcon:t="",title:e="",sub:s="",link:n=null,linkLabel:o=""}){return r`
    <div class="section-head">
      <div>
        <h2 class="section-title">${t?i(t):""}${e}</h2>
        ${s?r`<p class="section-sub">${s}</p>`:""}
      </div>
      ${n?r`<a class="section-link" href="${n}">${o||a("common.showAll")} ${i("chevron-left")}</a>`:""}
    </div>`}function us(t){return re().showBreadcrumbs===!1||!(t!=null&&t.length)?"":r`
    <nav class="breadcrumb" aria-label="breadcrumb">
      <a href="#/">${i("home")} ${a("nav.home")}</a>
      ${t.map((e,s)=>r`
        ${i("chevron-left")}
        ${s===t.length-1?r`<span aria-current="page">${e.label}</span>`:r`<a href="${e.href}">${e.label}</a>`}`)}
    </nav>`}function me(t,e,s){if(e<=1)return"";let n=(d,u,b="",g=!1)=>r`
    <a class="pg ${b}" href="${g?"#":s(d)}" ${g?'aria-disabled="true" tabindex="-1"':""} ${d===t?'aria-current="page"':""}>${u}</a>`,o=[],c=d=>{d>=1&&d<=e&&!o.includes(d)&&o.push(d)};c(1),c(2);for(let d=t-1;d<=t+1;d++)c(d);c(e-1),c(e),o.sort((d,u)=>d-u);let l=[n(t-1,i("chevron-right"),"",t<=1)],m=0;for(let d of o)m&&d-m>1&&l.push(r`<span class="pg pg-gap" aria-hidden="true">…</span>`),l.push(n(d,f(d),d===t?"active":"")),m=d;return l.push(n(t+1,i("chevron-left"),"",t>=e)),r`<nav class="pagination" aria-label="${a("common.page")}">${ct(l.join(""))}</nav>`}function $e(t){return r`<span class="badge-pill ${Sc[t]||"bp-muted"}">${a(`st.${t}`)}</span>`}function ze(t){return r`<span class="badge-pill ${{paid:"bp-success",unpaid:"bp-warn",pending:"bp-warn",refunded:"bp-muted",failed:"bp-danger",cancelled:"bp-muted"}[t==null?void 0:t.status]||"bp-muted"}">${a(`ps.${(t==null?void 0:t.status)||"unpaid"}`)}</span>`}function ta(t){let e=t.timeline||[];return e.length?r`
    <div class="timeline">
      ${e.map(s=>r`
        <div class="tl-item">
          <div class="tl-t">${a(`st.${s.status}`)||s.status}</div>
          <div class="tl-d">${O(s.at)}${s.note?` \u2014 ${s.note}`:""}${s.by?` \xB7 ${s.by}`:""}</div>
        </div>`)}
    </div>`:""}function Ct({icon:t="box",label:e="",value:s="",sub:n=""}){return r`
    <div class="stat-card">
      <span class="stat-ic">${i(t)}</span>
      <div><div class="stat-val">${s}</div><div class="stat-lbl">${e}</div>${n?r`<div class="tiny muted">${n}</div>`:""}</div>
    </div>`}function It({label:t="",value:e="",sub:s="",icon:n=""}){return r`
    <div class="kpi">
      <div class="l">${t}</div>
      <div class="v">${e}</div>
      ${s?r`<div class="s">${s}</div>`:""}
    </div>`}function bs(t,{height:e=130}={}){let s=Math.max(1,...t.map(n=>n.value));return r`
    <div class="chart" ${e?r`data-h="${e}px"`:""}>
      ${t.map(n=>r`<div class="bar" data-tip="${n.label}: ${f(n.value)}" data-h="${Math.max(2,Math.round(n.value/s*100))}%"></div>`)}
    </div>
    <div class="chart-x">${t.map(n=>r`<span>${n.short||""}</span>`)}</div>`}function dt(t,e,{emptyText:s=null}={}){return e.length?r`
    <div class="table-wrap">
      <table class="table">
        <thead><tr>${t.map(n=>r`<th class="${n.cls||""}">${n.label}</th>`)}</tr></thead>
        <tbody>${ct(e.join(""))}</tbody>
      </table>
    </div>`:ct(`<div class="empty"><h4>${h(s||a("common.noData"))}</h4></div>`)}function E({label:t="",name:e,type:s="text",value:n="",placeholder:o="",required:c=!1,hint:l="",attrs:m="",span2:d=!1,autocomplete:u=""}){return r`
    <label class="field ${d?"span-2":""}">
      <span class="label">${t}${c?r`<span class="req">*</span>`:""}</span>
      <input class="input" type="${s}" name="${e}" value="${n}" placeholder="${o}" ${c?"required":""} ${u?r`autocomplete="${u}"`:""} ${m}>
      ${l?r`<span class="hint">${l}</span>`:""}
    </label>`}function X({label:t="",name:e,value:s="",placeholder:n="",required:o=!1,hint:c="",rows:l=4,span2:m=!1,attrs:d=""}){return r`
    <label class="field ${m?"span-2":""}">
      <span class="label">${t}${o?r`<span class="req">*</span>`:""}</span>
      <textarea class="textarea" name="${e}" rows="${l}" placeholder="${n}" ${o?"required":""} ${d}>${s}</textarea>
      ${c?r`<span class="hint">${c}</span>`:""}
    </label>`}function z({label:t="",name:e,options:s=[],value:n="",required:o=!1,hint:c="",span2:l=!1,placeholder:m=""}){let d=s.find(g=>String(g.value)===String(n)),u=d?d.label:m||a("common.select"),b=h(JSON.stringify(s));return r`
    <label class="field ${l?"span-2":""}">
      <span class="label">${t}${o?r`<span class="req">*</span>`:""}</span>
      <button type="button" class="input select" data-act="open-select" data-name="${e}" data-opts="${b}" data-val="${n}" data-title="${t}" style="text-align: start; padding-inline-end: 32px;">
        <span class="sb-txt" style="display:block; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">${u}</span>
      </button>
      <input type="hidden" name="${e}" value="${n}" ${o?"required":""}>
      ${c?r`<span class="hint">${c}</span>`:""}
    </label>`}function Ue({label:t="",name:e,checked:s=!1,hint:n=""}){return r`
    <label class="check">
      <input type="checkbox" name="${e}" ${s?"checked":""}>
      <span class="box">${i("check")}</span>
      <span>${t}${n?r`<span class="hint">${n}</span>`:""}</span>
    </label>`}function $t({label:t="",desc:e="",name:s,checked:n=!1,value:o=""}){return r`
    <div class="switch-row">
      <div><div class="t">${t}</div>${e?r`<div class="d">${e}</div>`:""}</div>
      <label class="switch">
        <input type="checkbox" name="${s}" value="${o}" ${n?"checked":""}>
        <span class="track"></span>
      </label>
    </div>`}function hs({value:t=1,max:e=99,min:s=1,name:n="qty",small:o=!1}){return r`
    <div class="qty" data-qty>
      <button type="button" data-q="-1" aria-label="-1">${i("minus")}</button>
      <input type="number" name="${n}" value="${t}" min="${s}" max="${e}" inputmode="numeric">
      <button type="button" data-q="1" aria-label="+1">${i("plus")}</button>
    </div>`}function gs({name:t="rating",value:e=0}){return r`
    <div class="stars-input" data-stars name-wrap="${t}" role="radiogroup" aria-label="${a("pdp.yourRating")}">
      ${[1,2,3,4,5].map(s=>r`
        <button type="button" data-star="${s}" class="${s<=e?"on":""}" role="radio" aria-checked="${s===e}" aria-label="${s}">
          <svg class="ic"><use href="#i-star"/></svg>
        </button>`)}
      <input type="hidden" name="${t}" value="${e}">
    </div>`}function An(t,{showPlus:e=!0}={}){var n;let s=[];return s.push(r`<div class="sum-row"><span>${a("common.subtotal")}</span><span class="v">${A(t.subtotal)}</span></div>`),e&&t.plusDiscount>0&&s.push(r`<div class="sum-row discount"><span>${a("acc.plus")} (${f(t.plusDiscountPct||3)}٪)</span><span class="v">−${A(t.plusDiscount)}</span></div>`),t.couponDiscount>0&&s.push(r`<div class="sum-row discount"><span>${a("common.discountCode")}: ${((n=t.coupon)==null?void 0:n.code)||""}</span><span class="v">−${A(t.couponDiscount)}</span></div>`),s.push(r`<div class="sum-row"><span>${a("common.shipping")}${t.shippingLabel?r` <span class="muted tiny">(${t.shippingLabel})</span>`:""}</span><span class="v">${t.shipping===0?a("common.free"):A(t.shipping)}</span></div>`),t.insured&&s.push(r`<div class="sum-row"><span>${a("common.insurance")}</span><span class="v">${t.insuranceFee===0?a("common.free"):A(t.insuranceFee)}</span></div>`),s.push(r`<div class="sum-row total"><span>${a("common.payable")}</span><span class="v">${A(t.total)}</span></div>`),ct(s.join(""))}function Fo(t){var n;let e=Number((n=ve().freeOver)!=null?n:0);if(!e||t>=e)return r`<div class="notice notice-success mt-s">${i("truck")}<div>${a("cart.freeShipDone")}</div></div>`;let s=Math.min(100,Math.round(t/e*100));return r`
    <div class="mt-s">
      <div class="progress"><i data-w="${s}%"></i></div>
      <p class="hint mt-s">${a("cart.freeShipHint",{amount:A(e-t,{withUnit:!0}).replace(/<[^>]+>/g,"")})}</p>
    </div>`}function ea(){let t=q();return r`
    <svg viewBox="0 0 640 360" preserveAspectRatio="xMidYMid slice" role="img" aria-label="${a("contact.mapTitle")}">
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
        <text class="mm-txt mm-txt-b" x="313" y="205" text-anchor="middle">${t?"\u0628\u0648\u0631\u0633 \u0627\u0644\u06A9\u062A\u0631\u0648\u0646\u06CC\u06A9 \u0647\u0641\u062A\u200C\u062D\u0648\u0636":"Haft-Hoz Electronics Bourse"}</text>
        <text class="mm-txt" x="313" y="226" text-anchor="middle">${t?"\u0637\u0628\u0642\u0647\u0654 \u062F\u0648\u0645\u060C \u067E\u0644\u0627\u06A9 \u06F2\u06F4":"2nd floor, No. 24"}</text>
      </g>
      <!-- نام خیابان‌ها -->
      <text class="mm-txt" x="24" y="140">${t?"\u062E\u06CC\u0627\u0628\u0627\u0646 \u0633\u0627\u062D\u0644\u06CC":"Saheli St."}</text>
      <text class="mm-txt" x="446" y="140">${t?"\u0645\u06CC\u062F\u0627\u0646 \u0647\u0641\u062A\u200C\u062D\u0648\u0636":"Haft-Hoz Square"}</text>
      <text class="mm-txt mm-vert" x="196" y="60" transform="rotate(90 196 60)">${t?"\u0628\u0644\u0648\u0627\u0631 \u062A\u0647\u0631\u0627\u0646":"Port Blvd."}</text>
      <!-- نشان مغازه -->
      <g transform="translate(313 176)">
        <circle class="mm-pulse" r="26"/>
        <path class="mm-accent" d="M0-34c11 0 19 8 19 19 0 14-19 31-19 31S-19-1-19-15c0-11 8-19 19-19Z"/>
        <circle class="mm-pin" cx="0" cy="-15" r="7"/>
      </g>
      <g class="mm-tag">
        <rect x="330" y="120" rx="12" width="${t?92:74}" height="26"/>
        <text x="${t?376:367}" y="137" text-anchor="middle">${t?"\u0645\u063A\u0627\u0632\u0647\u0654 \u0645\u0627":"Our shop"}</text>
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
        <text x="78" y="4">${t?"\u06F1\u06F0\u06F0 \u0645\u062A\u0631":"100 m"}</text>
      </g>
    </svg>`}function De({hidden:t=!1}={}){return r`
  <div class="captcha" data-captcha ${t?"hidden":""}>
    <label class="check"><input type="checkbox" name="captchaBox" data-act="captcha-open"><span class="box">${i("check")}</span><span>${a("captcha.label")}</span></label>
    <div class="captcha-ch" data-cch hidden>
      <div class="captcha-img" data-cimg></div>
      <div class="captcha-row">
        <input class="input" name="captchaAnswer" inputmode="numeric" autocomplete="off" placeholder="${a("captcha.placeholder")}" aria-label="${a("captcha.placeholder")}" data-act="captcha-check">
        <button type="button" class="btn btn-ghost" data-act="captcha-refresh" title="${a("captcha.refresh")}" aria-label="${a("captcha.refresh")}">${i("refresh")}</button>
      </div>
      <div class="captcha-st" data-cst>${a("captcha.hint")}</div>
    </div>
    <input type="hidden" name="captchaToken" data-ctok>
  </div>`}var jt,je,Sc,mt=V(()=>{U();G();K();U();J();jt=(t,e)=>r`<div class="pgrid">${t.map(s=>wc(s,e))}</div>`;je=(t,e,s="")=>{let n=(e||[]).filter(o=>o.slot===t);return n.length?r`<div class="${s} banner-grid mt">${n.map(kc)}</div>`:""};Sc={pending_payment:"bp-warn",pending_review:"bp-warn",confirmed:"bp-info",preparing:"bp-info",ready_pickup:"bp-accent",shipped:"bp-violet",delivered:"bp-success",cancelled:"bp-danger",refunded:"bp-muted",returned:"bp-muted"}});var Oo={};Z(Oo,{mount:()=>Ec,render:()=>xc,title:()=>qc});async function xc(){var $,w,k,C,F,j,st;let t=Zt(),e=[];if(H("recentlyViewed")&&(p.recent||[]).length)try{e=(await v.get(`/api/products?ids=${p.recent.slice(0,8).join(",")}&limit=8`)).items||[]}catch(R){e=[]}let s=[],n=p.categories,o=p.brands,c=p.stats;try{let[R,B,it]=await Promise.all([v.get("/api/products?limit=48&sort=popular"),p.categories.length?Promise.resolve(null):v.get("/api/categories"),p.brands.length?Promise.resolve(null):v.get("/api/brands")]);if(s=R.items||[],B&&(n=B.items||[]),it&&(o=it.items||[]),H("publicStats"))try{c=(await v.get("/api/stats/public")).stats||c}catch(St){}}catch(R){}let l=s.filter(R=>R.featured).slice(0,8),m=[...s].sort((R,B)=>(B.sold||0)-(R.sold||0)).slice(0,8),d=[...s].sort((R,B)=>String(B.createdAt||"").localeCompare(String(R.createdAt||""))).slice(0,8),u=s.filter(R=>R.discountPct>0).sort((R,B)=>B.discountPct-R.discountPct).slice(0,8),b=n.filter(R=>!R.parentId).slice(0,12),g=l.length?l:m.slice(0,8);return r`
    ${je("home_hero",le("home_hero"))}
    

    <section class="hero">
      <div class="hero-bg"><img src="/assets/img/hero-circuit.svg" alt="" decoding="async"></div>
      <div class="hero-inner">
        <span class="hero-kicker">${i("zap")} ${a("home.heroKicker")}</span>
        <h1 class="hero-title">${a("home.heroTitle")}</h1>
        <p class="hero-text">${a("home.heroText")}</p>
        <div class="hero-cta">
          <a class="btn btn-primary btn-lg" href="#/products">${i("cart")} ${a("home.ctaShop")}</a>
          <a class="btn btn-ghost btn-lg" href="#/products?discount=1">${i("percent")} ${a("home.ctaDeals")}</a>
        </div>
        <div class="hero-points">
          <span class="hero-point">${i("shield")} ${a("home.point1")}</span>
          <span class="hero-point">${i("package-check")} ${a("home.point2")}</span>
          <span class="hero-point">${i("truck")} ${a("home.point3")}</span>
          <span class="hero-point">${i("store")} ${a("home.point4")}</span>
        </div>
      </div>
    </section>

    ${je("home_strip",le("home_strip"))}

    <section class="section">
      ${Nt({titleIcon:"layers",title:a("home.categories"),sub:a("home.categoriesSub"),link:"#/products",linkLabel:a("common.showAll")})}
      <div class="cat-grid">${b.map(R=>{var B;return Ho(R,(B=R.count)!=null?B:null)})}</div>
    </section>

    ${H("partners")&&((w=($=p.settings.partners)==null?void 0:$.items)!=null&&w.length)?r`
    <section class="partners-sec partners-top">
      ${Nt({titleIcon:"store",title:a("home.partnersTitle")})}
      <div class="marquee" aria-label="${a("home.partnersTitle")}">
        <div class="marquee-track">
          ${[...p.settings.partners.items,...p.settings.partners.items].map(R=>{let B=(p.brands||[]).find(St=>{var nt;return St.name===R.fa||R.en&&(St.nameEn===R.en||((nt=St.nameEn)==null?void 0:nt.toLowerCase())===R.en.toLowerCase())}),it=B?`#/products?brand=${B.id}`:`#/search?q=${encodeURIComponent(R.fa)}`;return r`<a class="partner-chip" href="${it}" title="${q()?R.fa:R.en||R.fa}">
              <img class="pt-logo" src="/assets/img/brands/${B?B.id:"no_name"}.svg" alt="" loading="lazy" decoding="async">
              <b>${q()?R.fa:R.en||R.fa}</b></a>`}).join("")}
        </div>
      </div>
    </section>`:""}

    ${g.length?r`
    <section class="section">
      ${Nt({titleIcon:"star",title:a("home.featured"),sub:a("home.featuredSub"),link:"#/products?sort=popular"})}
      ${jt(g)}
    </section>`:""}

    ${u.length?r`
    <section class="section">
      ${Nt({titleIcon:"percent",title:a("home.deals"),sub:a("home.dealsSub"),link:"#/products?discount=1"})}
      ${jt(u)}
    </section>`:""}

    ${m.length?r`
    <section class="section">
      ${Nt({titleIcon:"chart",title:a("home.bestSellers"),sub:a("home.bestSellersSub"),link:"#/products?sort=popular"})}
      ${jt(m)}
    </section>`:""}

    ${d.length?r`
    <section class="section">
      ${Nt({titleIcon:"sparkles",title:a("home.newArrivals"),sub:a("home.newArrivalsSub"),link:"#/products?sort=newest"})}
      ${jt(d)}
    </section>`:""}

    ${o.length?r`
    <section class="section">
      ${Nt({titleIcon:"tag",title:a("home.brands")})}
      <div class="row row-wrap">
        ${o.slice(0,18).map(R=>r`<a class="chip" href="#/products?brand=${R.id}">${Gt(R)}</a>`)}
      </div>
    </section>`:""}

    <section class="section">
      <div class="card pf-card">
        <strong>${i("search")} ${a("home.partFinder")}</strong>
        <p class="muted small mt-s">${a("home.partFinderText")}</p>
        <div class="row row-wrap mt-s">
          ${(C=(k=p.settings)==null?void 0:k.store)!=null&&C.phone?r`<a class="btn btn-primary btn-sm" href="tel:${p.settings.store.phone}">${i("phone")} ${a("home.partFinderCta")}: <bdi>${ot(p.settings.store.phone)}</bdi></a>`:""}
          <a class="btn btn-outline btn-sm" href="#/pages/contact">${i("chat")} ${a("nav.contact")}</a>
          ${(st=(j=(F=p.settings)==null?void 0:F.store)==null?void 0:j.socials)!=null&&st.instagram?r`<a class="btn btn-ghost btn-sm" href="${p.settings.store.socials.instagram}" target="_blank" rel="noopener">${i("camera")} ${a("social.instagram")}</a>`:""}
        </div>
      </div>
    </section>

    <section class="section">
      ${Nt({titleIcon:"shield",title:a("home.whyUs"),sub:a("home.whyUsSub")})}
      <div class="pwa-grid">
        <div class="pwa-card"><span class="pwa-ic">${i("shield")}</span><div><div class="b">${a("home.point1")}</div><div class="muted small">${q()?"\u0647\u0645\u0647\u0654 \u06A9\u0627\u0644\u0627\u0647\u0627 \u067E\u06CC\u0634 \u0627\u0632 \u0641\u0631\u0648\u0634 \u062A\u0633\u062A \u0645\u06CC\u200C\u0634\u0648\u0646\u062F \u0648 \u0628\u0627 \u0641\u0627\u06A9\u062A\u0648\u0631 \u0631\u0633\u0645\u06CC \u0648 \u06AF\u0627\u0631\u0627\u0646\u062A\u06CC \u0641\u0631\u0648\u0634\u06AF\u0627\u0647 \u062A\u062D\u0648\u06CC\u0644 \u0645\u06CC\u200C\u06AF\u06CC\u0631\u06CC\u062F.":"Every item is tested before sale and delivered with an official invoice and store warranty."}</div></div></div>
        <div class="pwa-card"><span class="pwa-ic">${i("package-check")}</span><div><div class="b">${a("home.point2")}</div><div class="muted small">${q()?"\u0637\u0628\u0642 \u0642\u0627\u0646\u0648\u0646\u060C \u06F7 \u0631\u0648\u0632 \u06A9\u0627\u0631\u06CC \u0641\u0631\u0635\u062A \u062F\u0627\u0631\u06CC \u0628\u062F\u0648\u0646 \u062F\u0644\u06CC\u0644 \u06A9\u0627\u0644\u0627 \u0631\u0627 \u0628\u0631\u06AF\u0631\u062F\u0627\u0646\u06CC\u061B \u0641\u0642\u0637 \u0647\u0632\u06CC\u0646\u0647\u0654 \u0628\u0631\u06AF\u0634\u062A \u0628\u0627 \u062A\u0648\u0633\u062A.":"By law you have 7 working days to return an item without reason; only return shipping is on you."}</div></div></div>
        <div class="pwa-card"><span class="pwa-ic">${i("truck")}</span><div><div class="b">${a("home.point3")}</div><div class="muted small">${q()?"\u0633\u0641\u0627\u0631\u0634\u200C\u0647\u0627 \u0647\u0631 \u0631\u0648\u0632 \u06A9\u0627\u0631\u06CC \u0627\u0632 \u062A\u0647\u0631\u0627\u0646 \u0631\u0627\u0647\u06CC \u0645\u06CC\u200C\u0634\u0648\u0646\u062F\u061B \u062F\u0627\u062E\u0644 \u0634\u0647\u0631 \u0628\u0627 \u067E\u06CC\u06A9 \u0648 \u0628\u0642\u06CC\u0647\u0654 \u0627\u06CC\u0631\u0627\u0646 \u0628\u0627 \u067E\u0633\u062A.":"Orders leave Tehran every working day \u2014 by courier in the city and by post nationwide."}</div></div></div>
        <div class="pwa-card"><span class="pwa-ic">${i("headset")}</span><div><div class="b">${a("footer.support")}</div><div class="muted small">${q()?"\u0686\u062A \u0622\u0646\u0644\u0627\u06CC\u0646\u060C \u062A\u06CC\u06A9\u062A \u0648 \u062A\u0644\u0641\u0646\u061B \u0646\u0635\u0628 \u06AF\u0644\u0633 \u0648 \u0645\u0634\u0627\u0648\u0631\u0647\u0654 \u062E\u0631\u06CC\u062F \u0647\u0645 \u062F\u0631 \u0645\u063A\u0627\u0632\u0647 \u0631\u0627\u06CC\u06AF\u0627\u0646 \u0627\u0633\u062A.":"Live chat, tickets and phone; screen-guard installation and buying advice are free in store."}</div></div></div>
      </div>
    </section>

    ${H("publicStats")&&c?r`
    <section class="section">
      ${Nt({titleIcon:"chart",title:a("home.statsTitle"),link:"#/stats",linkLabel:a("common.showAll")})}
      <div class="stats-grid">
        ${Ct({icon:"box",label:a("stats.products"),value:f(c.products)})}
        ${Ct({icon:"package-check",label:a("stats.ordersTotal"),value:f(c.ordersTotal)})}
        ${Ct({icon:"cart",label:a("stats.ordersToday"),value:f(c.ordersToday)})}
        ${Ct({icon:"eye",label:a("stats.visitsToday"),value:f(c.visitsToday)})}
        ${Ct({icon:"users",label:a("stats.customers"),value:f(c.customers)})}
        ${Ct({icon:"truck",label:a("stats.delivered"),value:f(c.deliveredOrders)})}
      </div>
    </section>`:""}

    ${H("plus")&&!te()?r`
    <section class="section">
      <div class="banner">
        <div class="banner-body">
          <div class="banner-title">${i("sparkles")} ${a("home.plusTitle")}</div>
          <div class="banner-text">${a("home.plusText")}</div>
          <div class="row row-wrap mt-s">
            ${(xa().perks||[]).slice(0,4).map(R=>r`<span class="chip">${i("check")} ${q()?R.fa:R.en}</span>`)}
          </div>
        </div>
        <a class="btn btn-primary banner-cta" href="#/account/plus">${a("home.plusCta")} ${i("chevron-left")}</a>
      </div>
    </section>`:""}

    <section class="section">
      <div class="catalog" >
        <div class="card">
          ${Nt({titleIcon:"store",title:a("home.visitStore"),sub:a("home.visitStoreText")})}
          <p class="muted small mb">${h(q()?t.address||"":t.addressEn||t.address||"")}</p>
          <div class="row row-wrap">
            <a class="btn btn-primary" href="#/pages/contact">${i("map")} ${a("home.openMap")}</a>
            <a class="btn btn-ghost" href="tel:${t.phone}">${i("phone")} ${ot(t.phone||"")}</a>
          </div>
        </div>
        <div class="card">
          ${Nt({titleIcon:"download",title:a("home.appTitle"),sub:a("home.appText")})}
          <div class="row row-wrap">
            <button type="button" class="btn btn-primary" data-act="install-app">${i("download")} ${a("home.installCta")}</button>
          </div>
          <p class="hint mt-s">${a("misc.installHint")}</p>
        </div>
      </div>
    </section>

    ${e.length?r`
    <section class="section">
      ${Nt({titleIcon:"history",title:a("home.recent"),sub:a("home.recentSub")})}
      ${jt(e)}
    </section>`:""}

    <section class="section">
      <div class="card">
        <div class="minimap" data-act="open-map" role="button" tabindex="0" aria-label="${a("contact.mapTitle")}">
          ${ct(ea())}
          <span class="minimap-hint">${i("pin")} ${a("contact.mapHint")}</span>
        </div>
      </div>
    </section>
  `}function Ec(){let t=document.querySelector(".marquee"),e=t==null?void 0:t.querySelector(".marquee-track");if(!t||!e)return null;let s=0,n=!1,o=0,c=!1,l=0,m=performance.now(),d=0,u=42,b=()=>{let B=parseFloat(getComputedStyle(e).gap||"10")||10;return(e.scrollWidth+B)/2||1},g=()=>{let B=parseFloat(getComputedStyle(e).gap||"10")||10,it=[...e.children];if(!it.length)return;let St=e.dataset.base?Number(e.dataset.base):it.length/2,nt=it.slice(0,St),M=nt.reduce((ge,Ne)=>ge+Ne.offsetWidth+B,0),ft=1;for(;M*ft<innerWidth*1.6&&ft<4;)ft++;e.dataset.base=String(St);let zt=St*ft*2;if(it.length===zt)return;let Yt=document.createDocumentFragment();for(let ge=0;ge<2;ge++)for(let Ne=0;Ne<ft;Ne++)nt.forEach(Ka=>Yt.appendChild(Ka.cloneNode(!0)));e.innerHTML="",e.appendChild(Yt)};g(),addEventListener("resize",g,{passive:!0});let $=()=>getComputedStyle(e).direction==="rtl"?1:-1,w=()=>{let B=b();$()>0?(s>=B&&(s-=B),s<0&&(s+=B)):(s<=-B&&(s+=B),s>0&&(s-=B))},k=B=>{let it=Math.min(.05,(B-m)/1e3);m=B,!n&&!document.documentElement.classList.contains("eco")&&(s+=$()*u*it),w(),e.style.transform=`translateX(${s.toFixed(1)}px)`,d=requestAnimationFrame(k)};d=requestAnimationFrame(k);let C=B=>{B.pointerType==="mouse"&&B.button!==0||(c=!1,n=!0,o=0,l=B.clientX,t.classList.add("grabbing"),window.addEventListener("pointermove",F),window.addEventListener("pointerup",j),window.addEventListener("pointercancel",j))},F=B=>{if(!n)return;let it=B.clientX-l;s+=it,o+=Math.abs(it),l=B.clientX},j=()=>{n=!1,t.classList.remove("grabbing"),o>8&&(c=!0),window.removeEventListener("pointermove",F),window.removeEventListener("pointerup",j),window.removeEventListener("pointercancel",j)},st=B=>{c&&(c=!1,B.preventDefault(),B.stopPropagation())},R=B=>B.preventDefault();return t.addEventListener("dragstart",R),t.addEventListener("click",st,!0),t.addEventListener("pointerdown",C),()=>{cancelAnimationFrame(d),t.removeEventListener("pointerdown",C),t.removeEventListener("dragstart",R),t.removeEventListener("click",st,!0),window.removeEventListener("pointermove",F),window.removeEventListener("pointerup",j),window.removeEventListener("pointercancel",j)}}var qc,jo=V(()=>{U();G();tt();K();mt();qc=()=>a("nav.home")});var Dn={};Z(Dn,{mount:()=>Cc,render:()=>Tc});function fs(t,e){let s=new URLSearchParams(t.query);for(let[o,c]of Object.entries(e))c===null||c===""||c===void 0?s.delete(o):s.set(o,c);return"page"in e||s.delete("page"),`#${t.params.id?`/category/${t.params.id}`:"/products"}${s.toString()?`?${s}`:""}`}async function Tc(t){let e=new URLSearchParams(t.query);t.params.id&&e.set("cat",t.params.id);let s=e,n=new URLSearchParams;for(let C of["q","cat","sort","min","max","rating","authenticity","page"])s.get(C)&&n.set(C,s.get(C));s.get("brand")&&n.set("brand",s.get("brand")),s.get("inStock")==="1"&&n.set("inStock","1"),s.get("discount")==="1"&&n.set("discount","1"),n.set("limit","24");let o={items:[],total:0,pages:1,page:1,facets:{}};try{o=await v.get(`/api/products?${n}`)}catch(C){}let c=o.items||[],l=o.facets||{},m=p.categories,d=p.brands,u=t.params.id?Ee(t.params.id):s.get("cat")?Ee(s.get("cat")):null,b=(s.get("brand")||"").split(",").filter(Boolean),g=zo.includes(s.get("sort"))?s.get("sort"):"relevant",$=Number(s.get("page"))||1,w=[];if(u){let C=[],F=u;for(;F;)C.unshift(F),F=F.parentId?Ee(F.parentId):null;for(let j of C)w.push({label:qt(j),href:`#/category/${j.id}`})}else s.get("q")?w.push({label:`${a("search.resultsFor")} \xAB${s.get("q")}\xBB`}):s.get("discount")==="1"?w.push({label:a("nav.deals",{default:"\u062A\u062E\u0641\u06CC\u0641\u200C\u0647\u0627"})}):s.get("sort")==="newest"?w.push({label:a("nav.new",{default:"\u062C\u062F\u06CC\u062F\u062A\u0631\u06CC\u0646\u200C\u0647\u0627"})}):w.push({label:a("catalog.title")});let k=(C,F,j,st,R)=>r`
    <label class="fopt">
      <input type="checkbox" data-f="${C}" value="${F}" ${R?"checked":""}>
      <span class="cb">${i("check")}</span>
      <span>${j}</span>
      ${st!==void 0?r`<span class="cnt">${f(st)}</span>`:""}
    </label>`;return r`
    ${us(w)}
    <div class="section-head">
      <div>
        <h1 class="section-title">${u?qt(u):s.get("q")?a("search.resultsFor")+" \xAB"+s.get("q")+"\xBB":s.get("discount")==="1"?a("nav.deals",{default:"\u062A\u062E\u0641\u06CC\u0641\u200C\u0647\u0627"}):s.get("sort")==="newest"?a("nav.new",{default:"\u062C\u062F\u06CC\u062F\u062A\u0631\u06CC\u0646\u200C\u0647\u0627"}):a("catalog.title")}</h1>
        <p class="section-sub">${f(o.total||0)} ${a("catalog.count")}</p>
      </div>
      <button type="button" class="btn btn-ghost only-mobile" data-act="cat-filters">${i("filter")} ${a("catalog.showFilters")}</button>
    </div>

    ${o.didYouMean?r`<div class="notice notice-info mb">${i("sparkles")}<span>${a("search.didYouMean")} <a class="section-link" href="${fs(t,{q:o.didYouMean})}">${o.didYouMean}</a></span></div>`:""}

    <div class="catalog">
      <aside class="filters card" id="filtersBox" hidden>
        <div class="row row-between mb-s">
          <strong>${a("catalog.filters")}</strong>
          <button type="button" class="link-btn" data-act="cat-clear">${a("catalog.f.clear")}</button>
        </div>

        <div class="fgroup">
          <button type="button" class="fgroup-h" data-act="acc">${a("catalog.f.category")} ${i("chevron-down")}</button>
          <div class="acc-b fgroup-b" >
            ${m.filter(C=>!C.parentId).map(C=>{var F;return k("cat",C.id,qt(C),(F=l.categories)==null?void 0:F[C.id],(s.get("cat")||t.params.id)===C.id)})}
          </div>
        </div>

        <div class="fgroup">
          <button type="button" class="fgroup-h" data-act="acc">${a("catalog.f.brand")} ${i("chevron-down")}</button>
          <div class="acc-b fgroup-b">
            ${d.slice(0,20).map(C=>{var F;return k("brand",C.id,Gt(C),(F=l.brands)==null?void 0:F[C.id],b.includes(C.id))})}
          </div>
        </div>

        <div class="fgroup">
          <div class="fgroup-h">${a("catalog.f.price")}</div>
          <form class="fgroup-b row" data-price-form>
            <input class="input" type="number" min="0" step="10000" name="min" placeholder="${a("common.from")}" value="${s.get("min")||""}">
            <input class="input" type="number" min="0" step="10000" name="max" placeholder="${a("common.to")}" value="${s.get("max")||""}">
            <button class="btn btn-ghost btn-xs" type="submit">${a("common.apply")}</button>
          </form>
        </div>

        <div class="fgroup">
          <div class="fgroup-h">${a("catalog.f.availability")}</div>
          <div class="fgroup-b">
            ${k("flag","inStock",a("catalog.f.inStock"),void 0,s.get("inStock")==="1")}
            ${k("flag","discount",a("catalog.f.discountOnly"),void 0,s.get("discount")==="1")}
          </div>
        </div>

        <div class="fgroup">
          <div class="fgroup-h">${a("catalog.f.rating")}</div>
          <div class="fgroup-b">
            ${[4,3,2].map(C=>k("rating",C,`${f(C)}\u2605 ${a("common.and")} ${a("common.more")}`,void 0,s.get("rating")===String(C)))}
          </div>
        </div>

        <div class="fgroup">
          <div class="fgroup-h">${a("catalog.f.authenticity")}</div>
          <div class="fgroup-b">
            ${["original","highcopy","generic"].map(C=>{var F;return k("authenticity",C,a(`auth.${C}`),(F=l.authenticity)==null?void 0:F[C],s.get("authenticity")===C)})}
          </div>
        </div>
      </aside>

      <div>
        <div class="toolbar">
          <span class="muted small">${f(o.total||0)} ${a("catalog.count")}</span>
          <span class="grow"></span>
          <label class="row" style="flex-wrap: nowrap;" >
            <span class="muted small nowrap" style="flex-shrink: 0;">${a("common.sort")}</span>
            <button type="button" class="btn" data-act="choose-sort" style="background: var(--surface-2); border: 1px solid var(--border); border-radius: 11px; padding: 7px 12px; display: flex; align-items: center; justify-content: space-between; gap: 8px; min-width: 140px; font-size: 14px; font-weight: 500; color: var(--text); flex-shrink: 0;">
              <span data-txt style="white-space: nowrap;">${a(`catalog.sort.${g}`)}</span>
              ${i("chevron-down")}
            </button>
          </label>
          <div class="btn-group">
            <button type="button" class="btn ${p.prefs.view!=="list"?"active":""}" data-view="grid" title="${a("catalog.viewGrid")}" aria-label="${a("catalog.viewGrid")}">${i("grid")}</button>
            <button type="button" class="btn ${p.prefs.view==="list"?"active":""}" data-view="list" title="${a("catalog.viewList")}" aria-label="${a("catalog.viewList")}">${i("list")}</button>
          </div>
        </div>

        <div class="active-filters" data-activef>
          ${u?r`<span class="chip active" data-unf="cat">${qt(u)} <span class="chip-close">${i("close")}</span></span>`:""}
          ${b.map(C=>r`<span class="chip active" data-unf="brand" data-v="${C}">${Gt(pt({id:C},p.brands.find(F=>F.id===C)||{}))} <span class="chip-close">${i("close")}</span></span>`)}
          ${s.get("inStock")==="1"?r`<span class="chip active" data-unf="flag" data-v="inStock">${a("catalog.f.inStock")} <span class="chip-close">${i("close")}</span></span>`:""}
          ${s.get("discount")==="1"?r`<span class="chip active" data-unf="flag" data-v="discount">${a("catalog.f.discountOnly")} <span class="chip-close">${i("close")}</span></span>`:""}
          ${s.get("min")||s.get("max")?r`<span class="chip active" data-unf="price">${a("catalog.f.price")} <span class="chip-close">${i("close")}</span></span>`:""}
          ${s.get("rating")?r`<span class="chip active" data-unf="rating">${s.get("rating")}★ <span class="chip-close">${i("close")}</span></span>`:""}
          ${s.get("authenticity")?r`<span class="chip active" data-unf="authenticity">${a(`auth.${s.get("authenticity")}`)} <span class="chip-close">${i("close")}</span></span>`:""}
        </div>

        ${c.length?ct(jt(c)):L({icon:"search",title:a("search.noResultTitle"),text:a("search.noResultText"),action:{href:"#/products",label:a("cart.goShopping")}})}

        ${me($,o.pages||1,C=>fs(t,{page:C>1?C:null}))}
      </div>
    </div>
  `}function Cc(t,e){var c;N(t);let s=t.querySelector("#filtersBox");window.innerWidth>=980&&(s.hidden=!1);let n=l=>{location.hash=l.replace(/^#/,"")};t.querySelectorAll("[data-view]").forEach(l=>l.addEventListener("click",()=>{Te("view",l.dataset.view,{sync:!1}),document.documentElement.setAttribute("data-cards",l.dataset.view==="list"?"list":"grid"),l.closest(".btn-group").querySelectorAll("button").forEach(m=>m.classList.toggle("active",m===l))}));let o=()=>{var C,F;let l=new URLSearchParams(e.query);e.params.id&&l.delete("cat");let m=[...t.querySelectorAll('[data-f="cat"]:checked')].map(j=>j.value),d=[...t.querySelectorAll('[data-f="brand"]:checked')].map(j=>j.value),u=((C=t.querySelector('[data-f="rating"]:checked'))==null?void 0:C.value)||"",b=((F=t.querySelector('[data-f="authenticity"]:checked'))==null?void 0:F.value)||"",g=t.querySelector('[data-f="flag"][value="inStock"]:checked')?"1":"",$=t.querySelector('[data-f="flag"][value="discount"]:checked')?"1":"",w=new URLSearchParams;for(let[j,st]of l.entries())["cat","brand","rating","authenticity","inStock","discount","page"].includes(j)||w.set(j,st);m.length&&w.set("cat",m[m.length-1]),d.length&&w.set("brand",d.join(",")),u&&w.set("rating",u),b&&w.set("authenticity",b),g&&w.set("inStock","1"),$&&w.set("discount","1");let k=e.params.id&&!m.length?`/category/${e.params.id}`:"/products";n(`#${k}${w.toString()?`?${w}`:""}`)};return t.querySelectorAll("[data-f]").forEach(l=>l.addEventListener("change",o)),(c=t.querySelector("[data-price-form]"))==null||c.addEventListener("submit",l=>{l.preventDefault();let m=new FormData(l.target);n(fs(e,{min:m.get("min")||null,max:m.get("max")||null}))}),t.querySelectorAll("[data-unf]").forEach(l=>l.addEventListener("click",()=>{let m=l.dataset.unf,d={};if(m==="cat"&&(d.cat=null,e.params.id)){location.hash=`#/products${e.query.toString()?`?${new URLSearchParams([...e.query.entries()].filter(([u])=>u!=="cat"))}`:""}`;return}if(m==="brand"){let u=(e.query.get("brand")||"").split(",").filter(b=>b&&b!==l.dataset.v);d.brand=u.length?u.join(","):null}m==="flag"&&(d[l.dataset.v]=null),m==="price"&&(d.min=null,d.max=null),m==="rating"&&(d.rating=null),m==="authenticity"&&(d.authenticity=null),n(fs(e,d))})),null}var zo,Pn=V(()=>{U();G();tt();K();mt();at();J();bt();zo=["relevant","newest","oldest","cheapest","dearest","popular","rating","discount","name"];y("cat-filters",(t,e)=>{let s=document.getElementById("filtersBox");s&&(s.hidden=!s.hidden,e.textContent=s.hidden?a("catalog.showFilters"):a("catalog.hideFilters"),s.hidden||s.scrollIntoView({behavior:"smooth",block:"start"}))});y("choose-sort",(t,e)=>{let s=new URLSearchParams(location.hash.split("?")[1]||"").get("sort")||"relevant",n=Ta({title:a("common.sort"),body:r`<div class="col" style="gap:4px; padding-bottom: 20px;">
      ${zo.map(o=>r`<button class="btn ${o===s?"active":""}" style="justify-content: flex-start; padding: 14px 16px; background: var(--surface-2); border-radius: 12px; font-size: 15px;" data-v="${o}">${a(`catalog.sort.${o}`)}</button>`).join("")}
    </div>`});n.panel.querySelectorAll("button[data-v]").forEach(o=>{o.addEventListener("click",()=>{let c=o.dataset.v;n.close();let l=new URLSearchParams(location.hash.split("?")[1]||"");c==="relevant"?l.delete("sort"):l.set("sort",c),l.delete("page"),location.hash=`${location.hash.split("?")[0]}${l.toString()?"?"+l.toString():""}`})})});y("cat-clear",()=>{let t=location.hash.includes("/category/")?"#/products":location.hash.split("?")[0];location.hash=t})});var Wo={};Z(Wo,{mount:()=>Mc,render:()=>Ac,title:()=>Lc});async function Ac(t){var F,j,st,R,B,it,St,nt;let e=t.params.id,s=null;try{s=await v.get(`/api/products/${encodeURIComponent(e)}`)}catch(M){return L({icon:"alert",title:a("err.notFound"),text:a("err.notFoundText"),action:{href:"#/products",label:a("err.goHome")}})}let n=s.product,o=s.reviews||[],c=o.filter(M=>M.type!=="question"),l=o.filter(M=>M.type==="question"),m=s.reviewStats||{count:0,avg:0,dist:[0,0,0,0,0],questions:0},d=s.related||[],u=[],b=Ee(n.categoryId);for(;b;)u.unshift(b),b=b.parentId?Ee(b.parentId):null;let g=(n.images&&n.images.length?n.images:[]).slice(0,6),$=[...g.map(M=>({url:M,kind:"image"})),...(n.videos||[]).slice(0,4).map(M=>({url:M,kind:"video",poster:g[0]||""}))],w=(F=n.stock)!=null?F:0,k=String(((st=(j=p.settings)==null?void 0:j.store)==null?void 0:st.phone)||"").trim(),C=ve().zones||[];return r`
    ${us([...u.map(M=>({label:qt(M),href:`#/category/${M.id}`})),{label:vt(n)}])}
    <div class="pdp">
      <div class="gallery">
        <div class="gal-main" data-act="lightbox" data-imgs='${h(JSON.stringify($))}' data-i="0" role="button" tabindex="0" aria-label="${a("pdp.zoomHint")}">
        <div class="watermark-overlay"><div class="watermark-text">${((B=(R=p.settings)==null?void 0:R.store)==null?void 0:B.nameEn)||((St=(it=p.settings)==null?void 0:it.store)==null?void 0:St.name)||""}</div></div>
          ${((nt=$[0])==null?void 0:nt.kind)==="video"?r`<video src="${$[0].url}" poster="${$[0].poster}" controls playsinline preload="metadata" class="gal-video"></video>`:g[0]?r`<img src="${g[0]}" alt="${vt(n)}" data-glyph="${n.glyph}">`:ct(`<svg class="ic"><use href="#i-${n.glyph||"box"}"/></svg>`)}
          <span class="gal-zoom-hint" aria-hidden="true">${i("search")} ${a("pdp.zoomHint")}</span>
        </div>
        ${$.length>1?r`<div class="gal-thumbs">${$.map((M,ft)=>r`
          <button type="button" class="gal-thumb ${ft===0?"active":""}" data-thumb="${ft}" aria-label="${ft+1}">
            ${M.kind==="video"?ct(`<span class="gt-video">${M.poster?`<img src="${M.poster}" alt="" loading="lazy">`:""}<svg class="ic"><use href="#i-play"/></svg></span>`):r`<img src="${M.url}" alt="" loading="lazy">`}
          </button>`)}</div>`:""}
        <div class="row row-wrap">
          ${H("wishlist")?r`<button type="button" class="btn btn-ghost btn-sm ${is(n.id)?"btn-danger":""}" data-act="wish-toggle" data-id="${n.id}">${i("heart")} ${is(n.id)?a("card.wishlistRemove"):a("card.wishlistAdd")}</button>`:""}
          ${H("compare")?r`<button type="button" class="btn btn-ghost btn-sm ${un(n.id)?"active":""}" data-act="compare-toggle" data-id="${n.id}">${i("scale")} ${a("compare.add")}</button>`:""}
          
        </div>
      </div>

      <div class="buy-box">
        ${n.brandName?r`<div class="pc-brand">${q()?n.brandName:n.brandNameEn||n.brandName}</div>`:""}
        <h1 class="buy-title">${vt(n)}</h1>
        ${!q()&&n.name?r`<div class="buy-title-en">${n.name}</div>`:""}
        <div class="row row-wrap mt-s">
          <a href="#/products?cat=${n.categoryId}" class="badge-pill bp-accent">${i(Dc(n.glyph))} ${qt(u[u.length-1])}</a>
          <a href="#/products?authenticity=${n.authenticity||"generic"}" class="badge-pill ${n.authenticity==="original"?"bp-success":n.authenticity==="highcopy"?"bp-warn":"bp-muted"}">${a(`auth.${n.authenticity||"generic"}`)}</a>
          ${n.featured?r`<a href="#/products?sort=popular" class="badge-pill bp-violet">${i("star")} ${a("home.featured")}</a>`:""}
        </div>
        <div class="row row-between mt-s">
          <div class="pc-rate">${Ht(n.ratingAvg)} <span class="muted small">${f(m.avg||n.ratingAvg)} · ${f(m.count||n.ratingCount)} ${a("common.reviews")}</span></div>
          <button type="button" class="btn btn-ghost btn-sm" data-act="share" data-title="${vt(n)}" style="color:var(--accent);">${i("share")} ${a("pdp.share")}</button>
        </div>
        ${n.createdAt?r`<p class="muted tiny mt-s" style="opacity:0.8">${i("calendar")} ${q()?"\u062A\u0627\u0631\u06CC\u062E \u062B\u0628\u062A \u0645\u062D\u0635\u0648\u0644:":"Added on:"} ${O(n.createdAt)}</p>`:""}

        <div class="buy-price">
          ${n.oldPrice>n.price?r`<span class="pc-old">${A(n.oldPrice)}</span>`:""}
          ${n.price?r`<span class="buy-now">${A(n.price)}</span>`:r`<span class="buy-now pc-inquire">${a("price.inquire")}</span>`}
          ${n.discountPct>0?r`<span class="pc-off">${f(n.discountPct)}٪</span>`:""}
        </div>
        ${n.oldPrice>n.price?r`<p class="hint">${a("pdp.save")}: ${A(n.oldPrice-n.price)}</p>`:""}

        <div class="pc-stock ${w<=0?"out":w<=3?"low":""} mt-s">
          <span class="dot"></span>
          ${w<=0?a("card.outOfStock"):a("pdp.stockCount",{n:f(w)})}
          ${w>0&&w<=3?r` <span class="badge-pill bp-warn">${a("common.lowStock")}</span>`:""}
        </div>

        ${n.price?r`
        <div class="row mt">
          ${hs({value:1,max:Math.max(1,w),name:"qty"})}
          <button type="button" class="btn btn-primary btn-lg grow" data-act="pdp-add" data-id="${n.id}" ${w<=0?"disabled":""}>${i("cart")} ${a("pdp.addToCart")}</button>
        </div>
        <button type="button" class="btn btn-outline btn-block mt-s" data-act="pdp-buy" data-id="${n.id}" ${w<=0?"disabled":""}>${i("zap")} ${a("pdp.buyNow")}</button>`:r`
        <div class="row mt">
          ${k?r`<a class="btn btn-primary btn-lg grow" href="tel:${k}">${i("phone")} ${a("pdp.callStore")}</a>`:""}
          <a class="btn btn-outline btn-lg" href="#/pages/contact">${i("map")} ${a("pdp.visitStore")}</a>
        </div>
        <p class="hint mt-s">${i("info")} ${a("pdp.serviceHint")}</p>`}
        ${n.price&&k?r`<a class="btn btn-ghost btn-block mt-s" href="tel:${k}">${i("phone")} ${a("pdp.callStore")}: <bdi>${ot(k)}</bdi></a>`:""}

        ${w<=0&&H("priceAlerts")?r`
          <button type="button" class="btn btn-ghost btn-block mt-s ${cs(n.id)?"active":""}" data-act="notify-me" data-id="${n.id}">
            ${i("bell")} ${cs(n.id)?a("common.notified"):a("common.notifyMe")}
          </button>`:""}

        <div class="divider"></div>
        <ul class="col">
          <li class="row"><span class="stat-ic" data-h="30px" data-w="30px">${i("store")}</span><span class="small">${a("pdp.pickup")}</span></li>
          <li class="row"><span class="stat-ic" data-h="30px" data-w="30px">${i("truck")}</span><span class="small">${a("checkout.courier")}: ${C.map(M=>`${q()?M.name:M.nameEn} ${f(M.fee)}`).join(" \xB7 ")}</span></li>
          ${H("insurance")?r`<li class="row"><span class="stat-ic" data-h="30px" data-w="30px">${i("scale")}</span><span class="small">${a("checkout.insuranceDesc")}</span></li>`:""}
          <li class="row"><span class="stat-ic" data-h="30px" data-w="30px">${i("shield")}</span><span class="small">${n.warrantyMonths>0?a("pdp.warrantyMonths",{n:f(n.warrantyMonths)}):a("pdp.noWarranty")}</span></li>
        </ul>

        <div class="divider"></div>
        <div class="row row-between small muted">
          <span>${a("pdp.sku")}: <button type="button" class="link-btn mono" data-act="copy" data-text="${n.sku}">${n.sku}</button></span>
          ${n.barcode?r`<span>${a("pdp.barcode")}: <button type="button" class="link-btn mono" data-act="copy" data-text="${n.barcode}">${n.barcode}</button></span>`:""}
        </div>
        <div class="row row-between small muted mt-s">
          <span>${i("eye")} ${f(n.views)} ${a("pdp.viewed")}</span>
          <span>${i("package-check")} ${f(n.sold)} ${a("pdp.sold")}</span>
        </div>
      </div>
    </div>

    ${je("product_page",le("product_page"))}

    <section class="section card">
      <div class="tabs" role="tablist">
        <button type="button" class="tab active" data-tab="specs" role="tab">${a("pdp.specs")}</button>
        <button type="button" class="tab" data-tab="desc" role="tab">${a("pdp.description")}</button>
        ${H("reviews")?r`<button type="button" class="tab" data-tab="reviews" role="tab">${a("pdp.reviews")} (${f(m.count)})</button>`:""}
        ${H("questions")?r`<button type="button" class="tab" data-tab="questions" role="tab">${a("pdp.questions")} (${f(m.questions||l.length)})</button>`:""}
      </div>

      <div class="tab-panel" data-panel="specs">
        ${Object.keys(n.specs||{}).length?r`
          <table class="spec-table">
            <tbody>${Object.entries(n.specs).map(([M,ft])=>r`<tr><th>${h(M)}</th><td>${h(ft)}</td></tr>`)}</tbody>
          </table>`:r`<p class="muted">${a("common.noData")}</p>`}
        ${n.weight?r`<table class="spec-table mt-s"><tbody><tr><th>${a("pdp.weight")}</th><td>${f(n.weight)} ${a("pdp.gram")}</td></tr></tbody></table>`:""}
        ${(n.tags||[]).length?r`<div class="row row-wrap mt">${n.tags.map(M=>r`<a class="tag" href="#/products?q=${encodeURIComponent(M)}">#${M}</a>`)}</div>`:""}
      </div>

      <div class="tab-panel" data-panel="desc" hidden>
        <div class="rev-body">${tn(q()?n.description||"":n.descriptionEn||n.description||"")}</div>
        ${!q()&&n.descriptionEn?"":n.descriptionEn?r`<div class="rev-body muted mt-s" dir="ltr">${h(n.descriptionEn)}</div>`:""}
      </div>

      ${H("reviews")?r`
      <div class="tab-panel" data-panel="reviews" hidden>
        <div class="rev-summary mb">
          <div class="rev-score">
            <div class="n">${f(m.avg||0)}</div>
            ${Ht(m.avg||0)}
            <div class="muted small mt-s">${f(m.count)} ${a("common.reviews")}</div>
          </div>
          <div class="rev-bars">
            ${[5,4,3,2,1].map(M=>{var ft,zt;return r`
              <div class="rev-bar"><span>${f(M)}★</span><span class="track"><span class="fill" data-w="${m.count?Math.round((((ft=m.dist)==null?void 0:ft[M-1])||0)/m.count*100):0}%"></span></span><span>${f(((zt=m.dist)==null?void 0:zt[M-1])||0)}</span></div>`})}
          </div>
        </div>
        <div data-reviews>
          ${c.length?c.map(Uo).join(""):r`<p class="muted">${a("pdp.noReviews")}</p>`}
        </div>
        <div class="divider"></div>
        ${p.me?r`
          <form data-act="review-submit" data-pid="${n.id}">
            <strong>${a("pdp.writeReview")}</strong>
            <div class="mt-s">${gs({name:"rating",value:5})}</div>
            <label class="field mt-s"><span class="label">${a("common.title")}</span><input class="input" name="title" maxlength="80" required></label>
            <label class="field"><span class="label">${a("common.body")}</span><textarea class="textarea" name="body" maxlength="1500" required></textarea></label>
            <button class="btn btn-primary" type="submit">${a("common.submit")}</button>
          </form>`:r`<p class="notice notice-info">${i("user")}<span>${a("pdp.loginToReview")} <a class="section-link" href="#/auth?next=product/${n.id}">${a("nav.login")}</a></span></p>`}
      </div>`:""}

      ${H("questions")?r`
      <div class="tab-panel" data-panel="questions" hidden>
        <div data-questions>
          ${l.length?l.map(Uo).join(""):r`<p class="muted">${a("pdp.noQuestions")}</p>`}
        </div>
        <div class="divider"></div>
        ${p.me?r`
          <form data-act="question-submit" data-pid="${n.id}">
            <strong>${a("pdp.askQuestion")}</strong>
            <label class="field mt-s"><span class="label">${a("common.title")}</span><input class="input" name="title" maxlength="80" required></label>
            <label class="field"><span class="label">${a("common.body")}</span><textarea class="textarea" name="body" maxlength="1500" required></textarea></label>
            <button class="btn btn-primary" type="submit">${a("common.submit")}</button>
          </form>`:r`<p class="notice notice-info">${i("user")}<span>${a("pdp.loginToReview")} <a class="section-link" href="#/auth?next=product/${n.id}">${a("nav.login")}</a></span></p>`}
      </div>`:""}
    </section>

    ${d.length?r`
    <section class="section">
      <div class="section-head"><div><h2 class="section-title">${i("layers")} ${a("pdp.related")}</h2></div></div>
      ${jt(d.slice(0,5))}
    </section>`:""}

    ${p.recent.filter(M=>M!==n.id).length?r`
    <section class="section">
      <div class="section-head"><div><h2 class="section-title">${i("history")} ${a("misc.recentlyViewed")}</h2></div></div>
      <div data-recent></div>
    </section>`:""}

    <div class="pdp-bar no-print">
      <div class="pdp-bar-p">
        ${n.price?r`<div class="b">${A(n.price)}</div>`:r`<div class="b pc-inquire">${a("price.inquireShort")}</div>`}
        ${(n.oldPrice||0)>n.price?r`<div class="tiny muted del">${A(n.oldPrice)}</div>`:""}
      </div>
      ${n.price?(n.stock||0)>0?r`<button class="btn btn-primary" data-act="pdp-add" data-id="${n.id}">${i("cart")} ${a("pdp.addToCart")}</button>`:r`<button class="btn btn-ghost" data-act="notify-me" data-id="${n.id}">${i("bell")} ${a("common.notifyMe")}</button>`:k?r`<a class="btn btn-primary" href="tel:${k}">${i("phone")} ${a("pdp.callStore")}</a>`:r`<a class="btn btn-primary" href="#/pages/contact">${i("chat")} ${a("nav.contact")}</a>`}
    </div>
  `}function Dc(t){return{cable:"cable",adapter:"plug",case:"shield",glass:"layers",powerbank:"battery",battery:"battery",dongle:"plug",speaker:"speaker",audio:"headset",wearable:"watch",content:"camera",gaming:"zap",car:"truck",light:"light",mics:"mic",misc:"box"}[t]||"box"}function Uo(t){return r`
    <div class="review" data-rid="${t.id}">
      <div class="rev-head">
        <span class="rev-who">${h(t.userName)}</span>
        <span class="badge-pill ${t.userBadge==="buyer"?"bp-success":"bp-muted"}">${t.userBadge==="buyer"?a("pdp.buyerBadge"):a("pdp.visitorBadge")}</span>
        ${t.rating?Ht(t.rating):""}
        <span class="rev-date">${O(t.createdAt,{time:!1})}</span>
      </div>
      <div class="rev-title">${h(t.title)}</div>
      <div class="rev-body">${h(t.body)}</div>
      ${t.reply?r`<div class="rev-reply"><strong>${a("pdp.storeReply")}:</strong> ${h(t.reply)}</div>`:""}
      <div class="rev-actions">
        <button type="button" class="link-btn" data-act="review-like" data-id="${t.id}">${i("heart")} ${a("pdp.helpful")} (${f(t.likes||0)})</button>
      </div>
    </div>`}function Pc(t){var l,m;let e=t.querySelector(".gal-main");if(!e||!((m=(l=window.matchMedia)==null?void 0:l.call(window,"(hover: hover) and (pointer: fine)"))!=null&&m.matches))return;let s=2.6,n=null,o=null,c=()=>{n&&(n.style.display="none")};e.addEventListener("mousemove",d=>{let u=e.querySelector("img");if(!u||!u.currentSrc){c();return}let b=e.getBoundingClientRect(),g=d.clientX-b.left,$=d.clientY-b.top;if(g<0||$<0||g>b.width||$>b.height){c();return}n||(n=document.createElement("div"),n.className="gal-lens",n.setAttribute("aria-hidden","true"),o=document.createElement("img"),o.alt="",n.appendChild(o),e.appendChild(n));let w=Math.max(120,Math.min(190,Math.round(b.width*.46)));n.style.width=`${w}px`,n.style.height=`${w}px`,n.style.display="block",n.style.left=`${Math.max(-w*.15,Math.min(b.width-w*.85,g-w/2))}px`,n.style.top=`${Math.max(-w*.15,Math.min(b.height-w*.85,$-w/2))}px`;let k=b.width*s,C=b.height*s;o.src=u.currentSrc,o.style.width=`${k}px`,o.style.height=`${C}px`;let F=Math.max(w/2,Math.min(k-w/2,g/b.width*k)),j=Math.max(w/2,Math.min(C-w/2,$/b.height*C));o.style.left=`${w/2-F}px`,o.style.top=`${w/2-j}px`}),e.addEventListener("mouseleave",c),e.addEventListener("click",c)}function Mc(t,e){N(t);let s=t.querySelector(".pdp-bar"),n=t.querySelector('button[data-act="pdp-add"]');s&&n&&window.IntersectionObserver&&(s.style.transform="translateY(150%)",s.style.transition="transform 0.3s ease",s.style.display="flex",new IntersectionObserver(m=>{m.forEach(d=>{d.isIntersecting?s.style.transform="translateY(150%)":s.style.transform="translateY(0)"})},{threshold:.1}).observe(n)),gn(e.params.id),qn(t),Pc(t);let o=t.querySelector(".gal-main");if(o){let l=null,m=!1;o.addEventListener("click",d=>{m&&(m=!1,d.stopPropagation(),d.preventDefault())},!0),o.addEventListener("pointerdown",d=>{d.pointerType==="touch"&&(l=d.clientX)},{passive:!0}),o.addEventListener("pointerup",d=>{var $,w;if(l==null||d.pointerType!=="touch")return;let u=d.clientX-l;if(l=null,Math.abs(u)<48)return;m=!0;let b=JSON.parse((($=t.querySelector("[data-imgs]"))==null?void 0:$.dataset.imgs)||"[]");if(b.length<2)return;let g=Number(t.querySelector("[data-imgs]").dataset.i||0);g=(g+(u<0?1:-1)+b.length)%b.length,(w=t.querySelector(`[data-thumb="${g}"]`))==null||w.click()},{passive:!0})}t.querySelectorAll("[data-thumb]").forEach(l=>l.addEventListener("click",()=>{var g;let m=Number(l.dataset.thumb),d=JSON.parse(t.querySelector("[data-imgs]").dataset.imgs||"[]"),u=t.querySelector(".gal-main"),b=d[m];if(u&&b)if((g=u.querySelector("img, video"))==null||g.remove(),b.kind==="video"){let $=document.createElement("video");$.src=b.url,$.controls=!0,$.playsInline=!0,$.preload="metadata",$.className="gal-video",b.poster&&($.poster=b.poster),u.prepend($)}else{let $=document.createElement("img");$.src=b.url,$.alt="",u.prepend($)}t.querySelectorAll("[data-thumb]").forEach($=>$.classList.toggle("active",$===l)),t.querySelector("[data-imgs]").dataset.i=String(m)})),y("pdp-add",async(l,m)=>{var u;let d=Number(((u=t.querySelector(".qty input"))==null?void 0:u.value)||1);await D(m,async()=>{try{let{addToCart:b}=await Promise.resolve().then(()=>(K(),qa));await b(m.dataset.id,d),x(a("card.added"),{timeout:2400})}catch(b){S(b)}})}),y("pdp-buy",async(l,m)=>{var u;let d=Number(((u=t.querySelector(".qty input"))==null?void 0:u.value)||1);try{let{addToCart:b}=await Promise.resolve().then(()=>(K(),qa));await b(m.dataset.id,d),ht("#/checkout")}catch(b){S(b)}}),y("review-like",async(l,m)=>{if(!p.me){ht("#/auth");return}try{let d=await v.post(`/api/reviews/${m.dataset.id}/like`);m.innerHTML=r`${i("heart")} ${a("pdp.helpful")} (${f(d.likes)})`}catch(d){S(d)}}),y("review-submit",async(l,m)=>{l.preventDefault();let d=new FormData(m);await D(m.querySelector("button[type=submit]"),async()=>{try{let u=await v.post("/api/reviews",{productId:m.dataset.pid,type:"review",rating:Number(d.get("rating")||0),title:d.get("title"),body:d.get("body")});x(u.message||a("pdp.reviewSubmitted"),{timeout:5e3}),m.reset()}catch(u){S(u)}})}),y("question-submit",async(l,m)=>{l.preventDefault();let d=new FormData(m);await D(m.querySelector("button[type=submit]"),async()=>{try{let u=await v.post("/api/reviews",{productId:m.dataset.pid,type:"question",title:d.get("title"),body:d.get("body")});x(u.message||a("pdp.questionSubmitted"),{timeout:5e3}),m.reset()}catch(u){S(u)}})});let c=t.querySelector("[data-recent]");return c&&p.recent.length&&v.get("/api/products?limit=60").then(l=>{let d=p.recent.filter(u=>u!==e.params.id).slice(0,5).map(u=>l.items.find(b=>b.id===u)).filter(Boolean);c.innerHTML=jt(d),N(c)}).catch(()=>{}),()=>{}}var Lc,_o=V(()=>{U();G();tt();K();mt();J();bt();at();Lc=t=>t.params.id});function Nc(t){return new Promise((e,s)=>{let n=new Image;n.onload=()=>e(n),n.onerror=()=>s(new Error("image-load")),n.src=t})}async function vs(t){let e=await Nc(t),s=document.createElement("canvas");s.width=9,s.height=8;let n=s.getContext("2d",{willReadFrequently:!0});n.drawImage(e,0,0,9,8);let o=n.getImageData(0,0,9,8).data,c=w=>.299*o[w]+.587*o[w+1]+.114*o[w+2],l="";for(let w=0;w<8;w++)for(let k=0;k<8;k++){let C=c((w*9+k)*4),F=c((w*9+k+1)*4);l+=C>F?"1":"0"}let m="";for(let w=0;w<64;w+=4)m+=parseInt(l.slice(w,w+4),2).toString(16);let d=document.createElement("canvas");d.width=8,d.height=8;let u=d.getContext("2d",{willReadFrequently:!0});u.drawImage(e,0,0,8,8);let b=u.getImageData(0,0,8,8).data,g=new Array(64).fill(0);for(let w=0;w<64;w++){let k=b[w*4]>>6,C=b[w*4+1]>>6,F=b[w*4+2]>>6;g[k<<4|C<<2|F]++}let $=g.reduce((w,k)=>w+k,0)||1;return{dhash:m,hist:g.map(w=>Math.round(w/$*1e3)/1e3)}}var Mn=V(()=>{});var Vo={};Z(Vo,{mount:()=>Rc,render:()=>Ic,title:()=>Bc});async function Ic(){return r`
    <div class="section-head"><div>
      <h1 class="section-title">${i("camera")} ${a("search.imageTitle")}</h1>
      <p class="section-sub">${a("search.imageText")}</p>
    </div></div>

    <div class="card t-center" data-drop>
      <span class="empty-ic">${i("image")}</span>
      <p class="muted">${a("search.imageHint")}</p>
      <div class="row center row-wrap mt">
        <label class="btn btn-primary">${i("upload")} ${a("search.pickFile")}
          <input type="file" accept="image/jpeg,image/png,image/webp" data-file hidden>
        </label>
        <label class="btn btn-ghost">${i("camera")} ${a("search.takePhoto")}
          <input type="file" accept="image/*" capture="environment" data-file hidden>
        </label>
      </div>
      <div class="mt" data-preview hidden>
        <img class="si-preview" data-pimg alt="">
      </div>
    </div>

    <section class="section" data-results hidden></section>`}function Rc(t){N(t);let e=t.querySelector("[data-drop]"),s=t.querySelector("[data-results]"),n=async o=>{if(!o)return;if(!/^image\//.test(o.type)){S({code:"invalid_type",message:a("err.generic")});return}if(o.size>4*1024*1024){S({code:"payload_too_large",message:a("err.generic")});return}let c=await Ie(o),l=t.querySelector("[data-preview]");l.hidden=!1,t.querySelector("[data-pimg]").src=c,s.hidden=!1,s.innerHTML=r`<div class="row center">${i("refresh")} ${a("search.imageIndexing")}</div>`,await D(null,async()=>{var m;try{let d=await vs(c),u=await v.post("/api/search/image",d);if(!u.indexed){s.innerHTML=L({icon:"image",title:a("search.imageNoIndex"),text:a("adm.isHint")});return}if(!((m=u.items)!=null&&m.length)){s.innerHTML=L({icon:"search",title:a("search.imageNoMatch"),action:{href:"#/products",label:a("cart.goShopping")}});return}s.innerHTML=r`
          <div class="section-head"><div><h2 class="section-title">${i("sparkles")} ${f(u.items.length)} ${a("common.results")}</h2></div></div>
          ${jt(u.items.map(b=>Ut(pt({},b),{match:b.matchScore})))}
          <div class="row row-wrap mt-s">${u.items.map(b=>{var g;return r`<span class="chip">${(g=b.name)==null?void 0:g.slice(0,24)}… ${f(b.matchScore)}٪</span>`})}</div>`}catch(d){s.innerHTML=L({icon:"alert",title:a("err.generic")}),S(d)}})};return t.querySelectorAll("[data-file]").forEach(o=>o.addEventListener("change",()=>{var c;return n((c=o.files)==null?void 0:c[0])})),["dragover","dragenter"].forEach(o=>e.addEventListener(o,c=>{c.preventDefault(),e.classList.add("drag")})),["dragleave","drop"].forEach(o=>e.addEventListener(o,c=>{c.preventDefault(),e.classList.remove("drag")})),e.addEventListener("drop",o=>{var c,l;return n((l=(c=o.dataTransfer)==null?void 0:c.files)==null?void 0:l[0])}),null}var Bc,Yo=V(()=>{U();G();tt();Mn();J();mt();Bc=()=>a("search.imageTitle")});var Go={};Z(Go,{mount:()=>Oc,render:()=>Hc,title:()=>jc});async function Hc(){var e;await Mt().catch(()=>{});let t=p.cart;return(e=t.items)!=null&&e.length?r`
    <div class="section-head">
      <div><h1 class="section-title">${i("cart")} ${a("cart.title")}</h1>
      <p class="section-sub">${f(t.count)} ${a("common.items")}</p></div>
      <button type="button" class="link-btn" data-act="cart-clear">${i("trash")} ${a("cart.clear")}</button>
    </div>
    ${je("cart",le("cart"))}
    <div class="cart-grid">
      <div class="card" data-lines>
        ${t.items.map(Fc).join("")}
      </div>
      <aside class="summary card">
        <strong>${a("cart.summary")}</strong>
        <div class="sum-row"><span>${a("common.subtotal")}</span><span class="v">${A(t.subtotal)}</span></div>
        <div data-coupon-row>
          ${t.coupon?r`<div class="sum-row discount"><span>${a("common.discountCode")}: ${t.coupon.code}</span><span class="v"><button type="button" class="link-btn" data-act="coupon-remove">${a("cart.removeCoupon")}</button></span></div>`:""}
        </div>
        <div data-shipbar>${Fo(t.subtotal)}</div>
        ${t.coupon?"":r`
          <form class="row mt-s" data-act="coupon-apply">
            <input class="input" name="code" placeholder="${a("cart.couponPlaceholder")}" maxlength="32">
            <button class="btn btn-ghost" type="submit">${a("cart.applyCoupon")}</button>
          </form>`}
        <div class="sum-row total"><span>${a("common.payable")}</span><span class="v" data-total>${A(t.subtotal-(t.couponDiscount||0))}</span></div>
        <p class="hint">${a("checkout.concurrencyNote")}</p>
        <a class="btn btn-primary btn-block btn-lg mt" href="#/checkout">${a("cart.continue")} ${i("chevron-left")}</a>
      </aside>
    </div>`:r`
      <div class="section-head"><div><h1 class="section-title">${i("cart")} ${a("cart.title")}</h1></div></div>
      ${L({icon:"cart",title:a("cart.empty"),text:a("cart.emptyText"),action:{href:"#/products",label:a("cart.goShopping")}})}`}function Fc(t){var s;let e=t.product;return r`
    <div class="cart-line" data-line="${e.id}">
      <a class="cl-img" href="#/product/${e.id}">${(s=e.images)!=null&&s[0]?r`<img src="${e.images[0]}" alt="${vt(e)}" loading="lazy" data-glyph="${e.glyph}">`:i(e.glyph||"box")}</a>
      <div class="cl-body">
        <a class="cl-name" href="#/product/${e.id}">${vt(e)}</a>
        <div class="cl-meta">${e.brandName?`${e.brandName} \xB7 `:""}${A(e.price)} / ${a("common.unit")}</div>
        ${t.available<t.requestedQty?r`<div class="err mt-s">${i("alert")} ${a("common.lowStock")} (${f(t.available)})</div>`:""}
        <div class="cl-foot">
          <span data-qtybox>${hs({value:t.qty,max:Math.max(1,t.available),name:"qty"})}</span>
          <button type="button" class="link-btn" data-act="cart-remove" data-id="${e.id}">${i("trash")} ${a("cart.remove")}</button>
          <span class="cl-price">${A(t.lineTotal)}</span>
        </div>
      </div>
    </div>`}function Oc(t){return N(t),t.querySelectorAll(".qty input").forEach(e=>{e.addEventListener("change",async()=>{let n=e.closest("[data-line]").dataset.line,o=Math.max(1,Number(e.value)||1);try{await rn(n,o),lt(a("cart.updated"),{timeout:1500}),Promise.resolve().then(()=>(at(),pe)).then(c=>c.refresh(!0))}catch(c){S(c),Promise.resolve().then(()=>(at(),pe)).then(l=>l.refresh(!0))}})}),y("cart-remove",async(e,s)=>{try{await cn(s.dataset.id),Promise.resolve().then(()=>(at(),pe)).then(n=>n.refresh(!0))}catch(n){S(n)}}),y("cart-clear",async()=>{if(await kt({text:a("cart.clearConfirm"),danger:!0,okText:a("cart.clear")}))try{await ln(),Promise.resolve().then(()=>(at(),pe)).then(s=>s.refresh(!0))}catch(s){S(s)}}),y("coupon-apply",async(e,s)=>{e.preventDefault();let n=s.querySelector("[name=code]").value.trim();n&&await D(s.querySelector("button"),async()=>{try{await rs(n),x(a("cart.couponApplied")),Promise.resolve().then(()=>(at(),pe)).then(o=>o.refresh(!0))}catch(o){S(o)}})}),y("coupon-remove",async()=>{try{await rs(""),Promise.resolve().then(()=>(at(),pe)).then(e=>e.refresh(!0))}catch(e){S(e)}}),null}var jc,Ko=V(()=>{U();G();tt();K();mt();J();bt();at();jc=()=>a("cart.title")});var Jo={};Z(Jo,{mount:()=>Uc,render:()=>zc,title:()=>_c});async function zc(t){var o,c,l,m,d,u;if(await Mt().catch(()=>{}),!((o=p.cart.items)!=null&&o.length))return L({icon:"cart",title:a("cart.empty"),text:a("cart.emptyText"),action:{href:"#/products",label:a("cart.goShopping")}});if(!p.me)return L({icon:"user",title:a("checkout.loginRequired"),action:{href:"#/auth?next=checkout",label:a("nav.login")}});if(p.me.kycStatus!=="approved")return L({icon:"shield-alert",title:"\u0627\u062D\u0631\u0627\u0632 \u0647\u0648\u06CC\u062A \u0646\u0627\u0642\u0635 \u0627\u0633\u062A",text:"\u062C\u0647\u062A \u062C\u0644\u0648\u06AF\u06CC\u0631\u06CC \u0627\u0632 \u062A\u0642\u0644\u0628 \u0648 \u0628\u0627 \u062A\u0648\u062C\u0647 \u0628\u0647 \u0627\u0644\u0632\u0627\u0645\u0627\u062A \u0642\u0627\u0646\u0648\u0646\u06CC\u060C \u062B\u0628\u062A \u0633\u0641\u0627\u0631\u0634 \u0646\u06CC\u0627\u0632\u0645\u0646\u062F \u062A\u0623\u06CC\u06CC\u062F \u0647\u0648\u06CC\u062A \u0627\u0633\u062A.",action:{href:"#/account/kyc",label:"\u062A\u06A9\u0645\u06CC\u0644 \u0627\u062D\u0631\u0627\u0632 \u0647\u0648\u06CC\u062A"}});let e=ve(),s=e.zones||[],n=((c=p.me)==null?void 0:c.addresses)||[];try{let b=await v.post("/api/checkout/quote",{delivery:"courier",zone:((l=s[0])==null?void 0:l.id)||"country",express:!1,insurance:!1});aa=b.quote,La=(b.paymentMethods||[]).filter(g=>p.me?!0:g.id==="cod"||g.id==="gateway"),La.length||(La=[{id:"cod",fa:"\u067E\u0631\u062F\u0627\u062E\u062A \u062F\u0631 \u0645\u062D\u0644",en:"Cash on delivery",note:""}])}catch(b){aa=null}return r`
    <div class="section-head"><div><h1 class="section-title">${i("card")} ${a("checkout.title")}</h1></div></div>
    <div class="checkout-steps">
      <span class="cstep active"><span class="n">1</span> ${a("checkout.step1")}</span>
      <span class="cstep"><span class="n">2</span> ${a("checkout.step2")}</span>
      <span class="cstep"><span class="n">3</span> ${a("checkout.step3")}</span>
    </div>

    <form class="cart-grid" data-act="checkout-submit" novalidate>
      <div class="col">
        <section class="card">
          <strong class="row mb-s">${i("truck")} ${a("checkout.delivery")}</strong>
          <div class="col">
            <label class="radio-card">
              <input type="radio" name="delivery" value="pickup" ${e.pickupEnabled===!1?"disabled":""} ${p.me?"":"checked"}>
              <span class="dot"></span>
              <span><span class="b">${a("checkout.pickup")}</span><span class="hint" >${a("checkout.pickupDesc")} ${a("checkout.pickupReady",{h:f(e.handlingHours||24)})}</span></span>
            </label>
            <label class="radio-card${p.me?"":" disabled"}">
              <input type="radio" name="delivery" value="courier" ${p.me?"checked":"disabled"} ${e.courierEnabled===!1?"disabled":""}>
              <span class="dot"></span>
              <span><span class="b">${a("checkout.courier")}</span><span class="hint">${a("checkout.courierDesc")}${p.me?"":` \u2014 ${a("checkout.guestCourierNote")}`}</span></span>
            </label>
          </div>

          <div data-courier-opts class="mt">
            ${z({label:a("checkout.zone"),name:"zone",value:defZone,options:s.map(b=>({value:b.id,label:`${q()?b.name:b.nameEn} \u2014 ${f(b.fee)} ${a("common.toman")} \xB7 ${q()?b.eta:""}`}))})}
            ${e.expressEnabled?$t({label:a("checkout.express"),desc:`${f(e.expressFee||0)} ${a("common.toman")}${te()?` \xB7 ${a("acc.plus")}: \u2212${f(e.expressDiscountPct||50)}\u066A`:""}`,name:"express"}):""}
            ${H("insurance")?$t({label:a("checkout.insuranceOpt"),desc:te()&&((d=(m=p.settings)==null?void 0:m.plus)!=null&&d.autoInsurance)?a("checkout.insuranceAuto"):a("checkout.insuranceDesc"),name:"insurance",checked:te()}):""}

            <div class="divider"></div>
            <strong class="row mb-s">${i("pin")} ${a("checkout.address")}</strong>

        <section class="card">
          <strong class="row mb-s">${i("wallet")} ${a("checkout.paymentMethod")}</strong>
          <div class="col" data-paymethods>
            ${(La.length?La:[{id:"gateway",fa:"\u062F\u0631\u06AF\u0627\u0647 \u0628\u0627\u0646\u06A9\u06CC",en:"Bank gateway",note:""}]).map((b,g)=>r`
              <label class="radio-card">
                <input type="radio" name="paymentMethod" value="${b.id}" ${g===0?"checked":""} ${["snapppay","azki","digipay"].includes(b.id)&&(!p.me||p.me.kycStatus!=="approved")?"disabled":""}>
                <span class="dot"></span>
                <span><span class="b">${q()?b.fa:b.en}</span><span class="hint">${h(b.note||"")}${b.id==="gateway"&&nn().gatewayMode==="demo"?` \u2014 ${a("checkout.gatewayDemo")}`:""}${["snapppay","azki","digipay"].includes(b.id)&&(!p.me||p.me.kycStatus!=="approved")?' <span style="color:var(--danger)">(\u0646\u06CC\u0627\u0632\u0645\u0646\u062F \u0627\u062D\u0631\u0627\u0632 \u0647\u0648\u06CC\u062A)</span>':""}</span></span>
              </label>`)}
          </div>
          ${p.me&&H("wallet")&&(((u=p.me.wallet)==null?void 0:u.balance)||0)>0?$t({label:a("checkout.useWallet"),desc:a("checkout.walletBalance",{amount:f(p.me.wallet.balance)}),name:"useWallet",checked:!0}):""}
          <label class="field mt"><span class="label">${a("checkout.note")}</span><textarea class="textarea" name="note" rows="2" maxlength="400" placeholder="${a("checkout.notePlaceholder")}"></textarea></label>
        </section>

        <section class="card">
          ${Ue({label:r`${a("checkout.acceptTerms")} <a class="section-link" href="#/pages/terms">${a("consent.readTerms")}</a>`,name:"acceptTerms",checked:!0})}
          <p class="hint mt-s">${a("checkout.concurrencyNote")}</p>
        </section>
      </div>

      <aside class="summary card">
        <strong>${a("cart.summary")}</strong>
        <div data-quote>${aa?An(aa):r`<div class="sk sk-line w100"></div>`}</div>
        <button class="btn btn-primary btn-block btn-lg mt" type="submit">${i("check")} ${a("checkout.placeOrder")}</button>
        <a class="btn btn-ghost btn-block mt-s" href="#/cart">${i("chevron-right")} ${a("cart.title")}</a>
      </aside>
    </form>`}async function Qo(t){var s;let e=new FormData(t);try{aa=(await v.post("/api/checkout/quote",{delivery:e.get("delivery")||"courier",zone:e.get("zone")||"country",express:e.get("express")==="on",insurance:e.get("insurance")==="on"})).quote;let o=t.querySelector("[data-quote]");o&&(o.innerHTML=An(aa));let c=t.querySelector("[data-courier-opts]"),l=e.get("delivery");if(c&&(c.hidden=l!=="courier"),!p.me){let m=t.querySelector('input[name="paymentMethod"][value="cod"]');if(m){m.disabled=l==="pickup",(s=m.closest(".radio-card"))==null||s.classList.toggle("disabled",l==="pickup");let d=t.querySelector("[data-guest-cod-note]");if(d&&(d.hidden=l!=="pickup"),m.disabled&&m.checked){let u=t.querySelector('input[name="paymentMethod"][value="gateway"]');u&&(u.checked=!0)}}}}catch(n){}}function Uc(t){N(t);let e=t.querySelector('form[data-act="checkout-submit"]');if(!e)return null;let s=Ze(()=>Qo(e),220);return e.addEventListener("change",s),Qo(e),y("addr-add",()=>Wc()),y("checkout-submit",async(n,o)=>{n.preventDefault();let c=new FormData(o);if(!c.get("acceptTerms")){Y(a("form.termsRequired"));return}if(p.me&&c.get("delivery")==="courier"&&!c.get("addressId")){Y(a("checkout.noAddress"));return}if(!p.me&&c.get("delivery")==="courier"&&(!c.get("guestProvince")||!c.get("guestCity")||!c.get("guestAddress"))){Y(q()?"\u0644\u0637\u0641\u0627\u064B \u0622\u062F\u0631\u0633 \u067E\u0633\u062A\u06CC \u0631\u0627 \u06A9\u0627\u0645\u0644 \u0648\u0627\u0631\u062F \u06A9\u0646\u06CC\u062F.":"Please enter your shipping address.");return}if(!p.me){if(!String(c.get("guestName")||"").trim()){Y(a("checkout.guestNameRequired"));return}if(!/^09\d{9}$/.test(String(c.get("guestPhone")||"").replace(/[\s-]/g,""))){Y(a("checkout.guestPhoneInvalid"));return}}await D(o.querySelector("button[type=submit]"),async()=>{try{let l=await v.post("/api/checkout",{delivery:c.get("delivery"),zone:c.get("zone"),express:c.get("express")==="on",insurance:c.get("insurance")==="on",paymentMethod:c.get("paymentMethod")||"gateway",useWallet:c.get("useWallet")==="on",note:c.get("note")||"",addressId:c.get("addressId")||"",guestName:p.me?"":String(c.get("guestName")||"").trim(),guestPhone:p.me?"":String(c.get("guestPhone")||"").replace(/[\s-]/g,""),acceptTerms:!0});l.me&&(p.me=l.me,ee());try{sessionStorage.setItem("bm_last_order",JSON.stringify(l.order))}catch(m){}await Mt(),l.needsPayment&&["gateway","snapppay","azki","digipay"].includes(l.paymentMethod)?ht(`#/pay/${l.order.id}`):ht(`#/checkout/done/${l.order.id}`)}catch(l){S(l),((l==null?void 0:l.code)==="stock_limit"||(l==null?void 0:l.code)==="product_unavailable")&&T(!0)}})}),null}function Wc(){var t,e;if(!p.me){ht("#/auth?next=checkout");return}ys=ut({title:a("acc.addAddress"),body:r`
      <form data-act="addr-save" class="form-grid">
        ${E({label:a("acc.addrTitle"),name:"title",required:!0})}
        ${E({label:a("acc.addrReceiver"),name:"receiver",required:!0,value:p.me.name||""})}
        ${E({label:a("acc.addrPhone"),name:"phone",type:"tel",required:!0,value:p.me.phone||""})}
        ${E({label:a("common.city"),name:"city",value:((e=(t=p.settings)==null?void 0:t.store)==null?void 0:e.city)||""})}
        ${E({label:a("common.postal"),name:"postal"})}
        ${E({label:a("acc.addrStreet"),name:"street",required:!0,span2:!0})}
        ${E({label:a("acc.addrNote"),name:"note",span2:!0})}
        <label class="check span-2"><input type="checkbox" name="isDefault"><span class="box">${i("check")}</span><span>${a("acc.addrDefault")}</span></label>
        <button class="btn btn-primary span-2" type="submit">${a("common.save")}</button>
      </form>`})}var aa,La,ys,_c,Xo=V(()=>{U();G();tt();K();mt();J();bt();at();aa=null,La=[];ys=null;y("addr-save",async(t,e)=>{t.preventDefault();let s=new FormData(e),n=Object.fromEntries(s.entries());n.isDefault=s.get("isDefault")==="on";try{let o=await v.post("/api/me/addresses",n);o.addresses&&p.me&&(p.me.addresses=o.addresses),x(a("acc.addrSaved")),ys==null||ys.close(),T(!0)}catch(o){S(o)}});_c=()=>a("checkout.title")});var Zo={};Z(Zo,{mount:()=>Gc,render:()=>Yc,title:()=>Kc});function Vc(t){try{let e=JSON.parse(sessionStorage.getItem("bm_last_order")||"null");return e&&e.id===t?e:null}catch(e){return null}}async function Yc(t){var o,c;let e=t.params.id,s=Vc(e);if(!s&&p.me)try{s=(await v.get(`/api/me/orders/${encodeURIComponent(e)}`)).order}catch(l){}if(!s)return r`<div class="card t-center">
      <span class="empty-ic">${i("check-circle")}</span>
      <h1 class="mt-s">${a("checkout.successTitle")}</h1>
      <a class="btn btn-primary mt" href="#/account/orders">${a("acc.orders")}</a>
    </div>`;let n=((o=s.payment)==null?void 0:o.status)==="paid";return r`
    <div class="card t-center">
      <span class="pwa-ic center" data-h="72px" data-w="72px">${i("check-circle")}</span>
      <h1 class="mt-s">${a("checkout.successTitle")}</h1>
      <p class="muted">${a("checkout.successText",{code:s.code})}</p>
      <div class="row center row-wrap mt">
        ${$e(s.status)} ${ze(s.payment)}
        <span class="badge-pill bp-accent">${A(s.total)}</span>
      </div>
      ${!n&&((c=s.payment)==null?void 0:c.method)==="gateway"?r`
        <a class="btn btn-success btn-lg mt" href="#/pay/${s.id}">${i("card")} ${a("checkout.payNow")}</a>`:""}
      <div class="row center row-wrap mt">
        <a class="btn btn-ghost" href="#/account/orders/${s.id}">${i("package-check")} ${a("acc.trackOrder")}</a>
        <a class="btn btn-primary" href="#/products">${i("cart")} ${a("cart.goShopping")}</a>
      </div>
      <div class="divider"></div>
      <div class="t-start">${ta(s)}</div>
    </div>`}function Gc(t){return N(t),setTimeout(Pa,100),null}var Kc,tr=V(()=>{U();G();tt();K();mt();J();Kc=()=>a("checkout.successTitle")});var er={};Z(er,{mount:()=>Jc,render:()=>Qc,title:()=>Xc});async function Qc(t){var l,m,d,u,b,g,$;let e=t.params.id,s=null;try{s=(await v.get(`/api/me/orders/${encodeURIComponent(e)}`)).order}catch(w){}if(!s)return L({icon:"alert",title:a("err.notFound"),action:{href:"#/account/orders",label:a("acc.orders")}});if(((l=s.payment)==null?void 0:l.status)==="paid")return r`<div class="card t-center">
      <span class="empty-ic">${i("check-circle")}</span>
      <h2 class="mt-s">${a("checkout.paymentSuccess")}</h2>
      <a class="btn btn-primary mt" href="#/checkout/done/${s.id}">${a("acc.trackOrder")}</a>
    </div>`;let n=(m=s.payable)!=null?m:s.total,o=["snapppay","azki","digipay"].includes((d=s.payment)==null?void 0:d.method),c="";return((u=s.payment)==null?void 0:u.method)==="snapppay"?c="\u0627\u0633\u0646\u067E\u200C\u067E\u06CC":((b=s.payment)==null?void 0:b.method)==="azki"?c="\u0627\u0632\u06A9\u06CC\u200C\u0648\u0627\u0645":((g=s.payment)==null?void 0:g.method)==="digipay"&&(c="\u062F\u06CC\u062C\u06CC\u200C\u067E\u06CC"),r`
    <div class="card" >
      <div class="t-center">
        <span class="pwa-ic center" data-h="64px" data-w="64px">${i("card")}</span>
        <h1 class="mt-s">${o?"\u067E\u0631\u062F\u0627\u062E\u062A \u0627\u0642\u0633\u0627\u0637\u06CC \u0627\u0632 \u0637\u0631\u06CC\u0642 "+c:a("common.payment")}</h1>
        <p class="muted">${a("acc.orderCode")}: <span class="mono b">${s.code}</span></p>
        <div class="buy-price center"><span class="buy-now">${A(n)}</span></div>
        
        ${o?r`
          <div class="alert info text-right mb-4 mt-3">
            <strong>${i("info")} شبیه‌ساز درگاه اقساطی (${c})</strong>
            <p class="mt-2 text-sm">در محیط واقعی، کاربر به درگاه ${c} منتقل شده و پس از اعتبارسنجی و کسر قسط اول (یا تایید اعتبار)، به سایت بازمی‌گردد.</p>
          </div>
        `:r`
          <p class="notice notice-warn">${i("info")}<span>${a("checkout.gatewayDemo")}</span></p>
        `}
        
        <div class="row center mt">
          <button class="btn btn-success btn-lg" data-act="pay-sim" data-id="${s.id}" data-ok="1">${i("check")} ${a("checkout.simulateSuccess")}</button>
          <button class="btn btn-danger btn-lg" data-act="pay-sim" data-id="${s.id}" data-ok="0">${i("close")} ${a("checkout.simulateFail")}</button>
        </div>
        <div class="divider"></div>
        <div class="row row-between small muted">
          <span>${a("acc.orderDate")}: ${s.createdAt}</span>
          <span>${a("common.items")}: ${f((($=s.items)==null?void 0:$.length)||0)}</span>
        </div>
      </div>
    </div>`}function Jc(t){return N(t),null}var Xc,ar=V(()=>{U();G();tt();K();mt();J();at();bt();y("pay-sim",async(t,e)=>{let s=e.dataset.ok==="1";await D(e,async()=>{try{let n=await v.post(`/api/payments/simulate/${e.dataset.id}`,{success:s});await ee(),await Mt(),s?(x(a("checkout.paymentSuccess")),fireConfetti(),ht(`#/checkout/done/${e.dataset.id}`)):(S({code:"payment_failed",message:a("checkout.paymentFailed"),details:"Payment failed"}),ht("#/account/orders"))}catch(n){S(n)}})});Xc=()=>a("common.payment")});var sr={};Z(sr,{mount:()=>tl,render:()=>Zc,title:()=>el});async function Zc(){let t=p.compare.slice(0,4);if(!t.length)return L({icon:"scale",title:a("compare.empty"),text:a("compare.emptyText"),action:{href:"#/products",label:a("cart.goShopping")}});let e=(await Promise.all(t.map(o=>v.get(`/api/products/${encodeURIComponent(o)}`).catch(()=>null)))).filter(Boolean).map(o=>o.product);if(!e.length)return L({icon:"scale",title:a("compare.empty")});let s=[...new Set(e.flatMap(o=>Object.keys(o.specs||{})))],n=(o,c)=>r`<tr><th class="t-start">${o}</th>${c.map(l=>r`<td>${l}</td>`)}</tr>`;return r`
    <div class="section-head"><div><h1 class="section-title">${i("scale")} ${a("compare.title")}</h1>
    <p class="section-sub">${f(e.length)} / 4</p></div></div>
    <div class="table-wrap">
      <table class="table">
        <thead><tr><th class="t-start">${a("common.product")}</th>${e.map(o=>{var c;return r`<th>
          <div class="col center">
            <a href="#/product/${o.id}">${(c=o.images)!=null&&c[0]?r`<img class="table-img" src="${o.images[0]}" alt="${vt(o)}" data-glyph="${o.glyph}">`:i(o.glyph)}</a>
            <span class="small">${vt(o)}</span>
            <button type="button" class="link-btn" data-act="compare-toggle" data-id="${o.id}">${i("trash")} ${a("compare.remove")}</button>
          </div></th>`})}</tr></thead>
        <tbody>
          ${n(a("common.price"),e.map(o=>ct(A(o.price))))}
          ${n(a("common.brand"),e.map(o=>q()?o.brandName:o.brandNameEn||o.brandName||"\u2014"))}
          ${n(a("common.stock"),e.map(o=>o.stock>0?r`<span class="badge-pill bp-success">${f(o.stock)}</span>`:r`<span class="badge-pill bp-danger">${a("card.outOfStock")}</span>`))}
          ${n(a("common.rating"),e.map(o=>o.ratingCount?r`${Ht(o.ratingAvg)} ${f(o.ratingAvg)}`:"\u2014"))}
          ${n(a("adm.pAuth"),e.map(o=>a(`auth.${o.authenticity||"generic"}`)))}
          ${n(a("pdp.warranty"),e.map(o=>o.warrantyMonths?a("pdp.warrantyMonths",{n:f(o.warrantyMonths)}):a("pdp.noWarranty")))}
          ${n(a("pdp.weight"),e.map(o=>o.weight?`${f(o.weight)} ${a("pdp.gram")}`:"\u2014"))}
          ${s.map(o=>n(o,e.map(c=>{var l;return((l=c.specs)==null?void 0:l[o])||"\u2014"})))}
          ${n("",e.map(o=>r`<button type="button" class="btn btn-primary btn-sm" data-act="add-cart" data-id="${o.id}" ${o.stock<=0?"disabled":""}>${i("cart")} ${a("card.addToCart")}</button>`))}
        </tbody>
      </table>
    </div>`}function tl(t){return N(t),null}var el,nr=V(()=>{U();G();tt();K();mt();el=()=>a("compare.title")});var or={};Z(or,{render:()=>al,title:()=>sl});async function al(){let t=null;try{t=await v.get("/api/lotteries")}catch(n){return W({title:(n==null?void 0:n.message)||a("err.generic")})}let e=(t.items||[]).filter(n=>n.status==="active"),s=(t.items||[]).filter(n=>n.status!=="active");return e.length?r`
    <h1 class="section-title mb">${i("gift2")} ${a("lot.title")}</h1>
    <div class="cart-grid">
      ${e.map(n=>r`
        <div class="card">
          <div class="row row-between"><strong>${i("sparkles")} ${h(n.title)}</strong><span class="badge-pill bp-accent">${a("lot.active")}</span></div>
          <p class="mt-s">${a("lot.prize")}: <b>${h(n.prize)}</b></p>
          <p class="muted small">${a("lot.ends")}: ${O(n.endsAt)} · ${a("lot.entries")}: ${f(n.entries||0)}</p>
          ${n.myEntry?r`<div class="notice notice-success mt-s">${i("check")} ${a("lot.joined")}</div>`:n.entryMode==="manual"?r`<button class="btn btn-primary mt-s" data-act="lot-join" data-id="${n.id}">${i("gift2")} ${a("lot.join")}</button>`:r`<p class="hint mt-s">${a("lot.autoEntry")}</p>`}
        </div>`)}
      ${s.slice(0,6).map(n=>r`
        <div class="card">
          <div class="row row-between"><strong>${h(n.title)}</strong><span class="badge-pill bp-success">${a("lot.done")}</span></div>
          <p class="tiny muted mt-s">${a("lot.winners")}: ${(n.winners||[]).map(o=>h(o)).join("\u060C ")||"\u2014"}</p>
        </div>`)}
    </div>`:r`
      <div class="card lot-soon">
        <span class="lot-ic">${i("gift2")}</span>
        <h1 class="buy-title">${a("lot.title")}</h1>
        <p class="muted mt-s">${a("lot.soon")}</p>
        ${s.length?r`<div class="mt">
          <h2 class="section-title small">${i("history")} ${a("lot.done")}</h2>
          ${s.slice(0,5).map(n=>r`
            <div class="notif-item lv-success mt-s">
              <strong class="tiny">${h(n.title)}</strong>
              <p class="tiny muted mt-s">${a("lot.winners")}: ${(n.winners||[]).map(o=>h(o)).join("\u060C ")||"\u2014"}</p>
            </div>`)}
        </div>`:""}
      </div>`}var sl,rr=V(()=>{U();G();tt();J();bt();K();y("lot-join",async(t,e)=>{if(!p.me){Y(a("nav.login"));return}await D(e,async()=>{try{await v.post(`/api/lotteries/${e.dataset.id}/join`,{}),x(a("lot.joinDone")),Pa(),Promise.resolve().then(()=>(at(),pe)).then(s=>s.refresh(!0))}catch(s){S(s)}})});sl=()=>q()?"\u0642\u0631\u0639\u0647\u200C\u06A9\u0634\u06CC":"Lottery"});var dr={};Z(dr,{mount:()=>rl,render:()=>nl,title:()=>il});async function nl(){return r`
    <div class="section-head">
      <div><h1 class="section-title">${i("barcode")} ${a("priceCheck.title")}</h1>
      <p class="section-sub">${a("priceCheck.sub")}</p></div>
      <button type="button" class="btn btn-ghost" data-act="pc-fullscreen">${i("external")} ${a("priceCheck.fullscreen")}</button>
    </div>

    <div class="cart-grid">
      <div class="col">
        <div class="card scan-view">
          <form class="row" data-act="pc-lookup" >
            <input class="input" name="code" placeholder="${a("priceCheck.input")}" data-autofocus autocomplete="off" inputmode="numeric">
            <button class="btn btn-primary" type="submit">${i("search")} ${a("common.search")}</button>
          </form>
          <div class="row row-wrap center">
            <button type="button" class="btn btn-ghost" data-act="pc-camera">${i("camera")} ${a("priceCheck.scanCamera")}</button>
            <button type="button" class="btn btn-ghost" hidden data-act="pc-camera-stop">${i("close")} ${a("priceCheck.stopCamera")}</button>
          </div>
          <div class="scan-frame" data-frame hidden>
            <video playsinline muted></video>
            <span class="scan-line"></span>
            <span class="scan-corner" ></span>
          </div>
          <p class="hint">${a("adm.bScanHint")}</p>
          <input class="pc-wedge" data-wedge autocomplete="off" aria-label="${a("priceCheck.input")}" placeholder="${a("priceCheck.waiting")}">
        </div>
        <div class="card" data-history>
          <strong class="row mb-s">${i("history")} ${a("priceCheck.lastScan")}</strong>
          <div class="col" data-hlist><p class="muted small">${a("common.noData")}</p></div>
        </div>
      </div>
      <aside class="card price-display" data-result>
        <span class="empty-ic">${i("barcode")}</span>
        <p class="muted">${a("priceCheck.waiting")}</p>
      </aside>
    </div>`}function ws(t,e,{error:s=""}={}){var n;if(s){t.innerHTML=r`<span class="empty-ic danger">${i("alert")}</span><h3>${s}</h3>`;return}t.innerHTML=r`
    ${(n=e.images)!=null&&n[0]?r`<img class="pc-result-img" src="${e.images[0]}" alt="${vt(e)}" data-glyph="${e.glyph}">`:i(e.glyph||"box")}
    <h2 class="mt-s">${vt(e)}</h2>
    <p class="muted small">${e.brandName||""} ${e.sku?`\xB7 ${e.sku}`:""}</p>
    <div class="big">${A(e.price,{withUnit:!1})}</div>
    <div class="cur">${a("common.toman")}</div>
    ${e.oldPrice>e.price?r`<p class="pc-old">${A(e.oldPrice)}</p>`:""}
    <div class="mt-s">${e.stock>0?r`<span class="badge-pill bp-success">${a("pdp.stockCount",{n:f(e.stock)})}</span>`:r`<span class="badge-pill bp-danger">${a("card.outOfStock")}</span>`}</div>
    <a class="btn btn-primary mt" href="#/product/${e.id}">${a("common.details")} ${i("chevron-left")}</a>`}async function Ln(t,e){let s=e.querySelector("[data-result]");try{let n=await v.post("/api/scan",{code:String(t).trim()});if(n.found&&n.product)return ws(s,n.product),ol(e,n.product),n.product;ws(s,null,{error:a("priceCheck.notFound")})}catch(n){(n==null?void 0:n.status)===404?ws(s,null,{error:a("priceCheck.notFound")}):ws(s,null,{error:a("err.generic")})}return null}function ol(t,e){$s.unshift({id:e.id,name:vt(e),price:e.price,at:new Date().toISOString()}),$s.length>8&&$s.pop();let s=t.querySelector("[data-hlist]");s&&(s.innerHTML=$s.map(n=>r`<div class="row row-between small"><span class="nowrap">${n.name}</span><span class="b">${f(n.price)}</span></div>`).join(""))}function rl(t){N(t),document.body.classList.add("kiosk-page");let e=t.querySelector("[data-wedge]"),s="",n=0;return e.addEventListener("keydown",o=>{let c=Date.now();if(c-n>120&&(s=""),n=c,o.key==="Enter"){o.preventDefault();let l=s.trim();s="",l&&Ln(l,t);return}o.key.length===1&&(s+=o.key)}),e.focus(),y("pc-lookup",(o,c)=>{o.preventDefault(),Ln(c.querySelector("[name=code]").value,t)}),y("pc-fullscreen",()=>{var o,c;document.fullscreenElement?document.exitFullscreen().catch(()=>{}):(c=(o=document.documentElement).requestFullscreen)==null||c.call(o).catch(()=>lt(a("misc.printBlocked")))}),y("pc-camera",async(o,c)=>{var d;let l=t.querySelector("[data-frame]"),m=l.querySelector("video");if(!("BarcodeDetector"in window)&&!((d=navigator.mediaDevices)!=null&&d.getUserMedia)){Y(a("priceCheck.cameraUnsupported"));return}try{if(sa=await navigator.mediaDevices.getUserMedia({video:{facingMode:"environment"}}),m.srcObject=sa,await m.play(),l.hidden=!1,c.hidden=!0,t.querySelector('[data-act="pc-camera-stop"]').hidden=!1,"BarcodeDetector"in window){ir=new window.BarcodeDetector({formats:["ean_13","ean_8","code_128","code_39","upc_a","upc_e"]});let u=async()=>{if(sa){try{let b=await ir.detect(m);if(b!=null&&b.length){let g=b[0].rawValue;Ln(g,t);let $=t.querySelector("[name=code]");$&&($.value=g)}}catch(b){}lr=setTimeout(u,700)}};u()}}catch(u){Y(a("priceCheck.cameraDenied"))}}),y("pc-camera-stop",(o,c)=>{cr(t),c.hidden=!0,t.querySelector('[data-act="pc-camera"]').hidden=!1}),()=>{cr(t),document.body.classList.remove("kiosk-page")}}function cr(t){if(clearTimeout(lr),sa){for(let s of sa.getTracks())s.stop();sa=null}let e=t==null?void 0:t.querySelector("[data-frame]");e&&(e.hidden=!0)}var sa,ir,lr,$s,il,mr=V(()=>{U();G();tt();K();J();bt();sa=null,ir=null,lr=0,$s=[];il=()=>a("priceCheck.title")});var In={};Z(In,{mount:()=>ll,render:()=>cl,title:()=>dl});async function ks(t){var c,l,m,d;let e=(c=t==null?void 0:t.querySelector)==null?void 0:c.call(t,"[data-captcha]");if(!e||e.hidden)return!0;let s=e.querySelector("[name=captchaAnswer]");if(s&&String(s.value).trim()&&!e.dataset.verifying&&!((l=e.querySelector("[data-ctok]"))!=null&&l.value)){let u=Ss("captcha-check");u&&await u(new Event("change"),s)}if(e.dataset.verifying&&await new Promise(u=>{let b=Date.now(),g=setInterval(()=>{(!e.dataset.verifying||Date.now()-b>2500)&&(clearInterval(g),u())},60)}),String(((m=e.querySelector("[data-ctok]"))==null?void 0:m.value)||"").trim())return!0;let n=e.querySelector("[name=captchaBox]"),o=e.querySelector("[data-cch]");return n&&(n.checked=!0),o&&(o.hidden=!1),e.dataset.cid||We(e),(d=e.querySelector("[name=captchaAnswer]"))==null||d.focus(),lt(a("captcha.required"),{type:"error",timeout:4500}),!1}function Na(t){let e=t&&!t.startsWith("auth")?`#/${t.replace(/^#|^\/|#$/g,"")}`:"#/";Ot().then(()=>Mt()).then(()=>bn()).then(()=>ht(e))}async function cl(t){let e=t.query.get("next")||"",s=t.query.get("ref")||"",n=t.params.mode==="register"||!!s,o=t.params.mode==="forgot";return r`
    <div class="auth-wrap">
      <div class="card auth-card">
        <div class="t-center mb">
          <span class="pwa-ic center" data-h="56px" data-w="56px">${i("user")}</span>
          <h1 class="mt-s" data-title>${n?a("auth.registerTitle"):o?a("auth.recoveryTitle"):a("auth.loginTitle")}</h1>
        </div>

        <div class="tabs" data-auth-tabs role="tablist">
          <button type="button" class="tab ${!n&&!o?"active":""}" data-at="login" role="tab">${a("common.login")}</button>
          <button type="button" class="tab ${n?"active":""}" data-at="register" role="tab">${a("common.register")}</button>
          <button type="button" class="tab ${o?"active":""}" data-at="forgot" role="tab">${a("auth.forgot")}</button>
        </div>

        <!-- ورود -->
        <div class="tab-panel" data-ap="login" ${n||o?"hidden":""}>
          <div class="btn-group mb" data-method>
            <button type="button" class="btn active" data-m="password">${a("auth.methodPassword")}</button>
            <button type="button" class="btn" data-m="phone">${a("auth.methodPhone")}</button>
            <button type="button" class="btn" data-m="email">${a("auth.methodEmail")}</button>
          </div>

          <form data-act="login-pass" data-apf="password">
            ${E({label:a("auth.identifier"),name:"identifier",required:!0,autocomplete:"username"})}
            ${E({label:a("common.password"),name:"password",type:"password",required:!0,autocomplete:"current-password"})}
            <div class="row row-between mb">
              ${Ue({label:a("auth.remember"),name:"remember",checked:!0})}
              <button type="button" class="link-btn" data-goto="forgot">${a("auth.forgot")}</button>
            </div>
            ${De()}
            <button class="btn btn-primary btn-block" type="submit">${i("logout")} ${a("common.login")}</button>
          </form>

          <form data-act="otp-send" data-purpose="login" data-apf="phone" hidden>
            ${E({label:a("common.phone"),name:"target",type:"tel",required:!0,placeholder:"09xxxxxxxxx"})}
            ${De()}
            <button class="btn btn-primary btn-block" type="submit">${i("send")} ${a("auth.sendCode")}</button>
          </form>
          <form data-act="otp-send" data-purpose="login" data-apf="email" hidden>
            ${E({label:a("common.email"),name:"target",type:"email",required:!0})}
            ${De()}
            <button class="btn btn-primary btn-block" type="submit">${i("send")} ${a("auth.sendCode")}</button>
          </form>

          <form data-act="otp-login" data-apf="code" hidden>
            <p class="notice notice-info mb">${i("mail")}<span data-sentto></span></p>
            <p class="notice notice-warn mb" data-democode hidden>${i("info")}<span></span></p>
            ${E({label:a("auth.otpCode"),name:"code",required:!0,autocomplete:"one-time-code",attrs:'inputmode="numeric" maxlength="6"'})}
            <button class="btn btn-primary btn-block" type="submit">${i("check")} ${a("common.login")}</button>
            <div class="row row-between mt-s">
              <button type="button" class="link-btn" data-resend>${a("auth.resend")}</button>
              <span class="muted tiny" data-resend-timer></span>
            </div>
          </form>

          <form data-act="login-2fa" data-apf="2fa" hidden>
            <p class="notice notice-info mb">${i("shield")}<span>${a("auth.2faText")}</span></p>
            <div class="btn-group mb" data-2fa-method></div>
            ${E({label:a("auth.otpCode"),name:"code",required:!0,autocomplete:"one-time-code",attrs:'inputmode="numeric"'})}
            <button class="btn btn-primary btn-block" type="submit">${i("shield")} ${a("auth.2faVerify")}</button>
          </form>
        </div>

        <!-- ثبت‌نام -->
        <div class="tab-panel" data-ap="register" ${n?"":"hidden"}>
          <div class="btn-group mb" data-regmode>
            <button type="button" class="btn active" data-m="username">${a("auth.methodPassword")}</button>
            <button type="button" class="btn" data-m="phone">${a("auth.methodPhone")}</button>
            <button type="button" class="btn" data-m="email">${a("auth.methodEmail")}</button>
          </div>
          <form data-act="register" data-next="${e}">
            ${E({label:a("common.fullName"),name:"name",required:!0,autocomplete:"name"})}
            <span data-reg-username>${E({label:a("common.username"),name:"username",autocomplete:"username",hint:wt()==="fa"?"\u062D\u0631\u0648\u0641 \u0627\u0646\u06AF\u0644\u06CC\u0633\u06CC\u060C \u0639\u062F\u062F \u0648 _ \u060C \u062D\u062F\u0627\u0642\u0644 \u06F3 \u0646\u0648\u06CC\u0633\u0647":"letters, digits and _ , min 3 chars"})}</span>
            <span data-reg-target-phone hidden>${E({label:a("common.phone"),name:"phoneTarget",type:"tel",placeholder:"09xxxxxxxxx"})}</span>
            <span data-reg-target-email hidden>${E({label:a("common.email"),name:"emailTarget",type:"email"})}</span>
            <span data-reg-code hidden>
              <div class="row">
                <span class="grow">${E({label:a("auth.otpCode"),name:"code",attrs:'inputmode="numeric" maxlength="6"'})}</span>
                <button type="button" class="btn btn-ghost" data-reg-send>${a("auth.sendCode")}</button>
              </div>
              <p class="notice notice-warn mb" data-reg-demo hidden>${i("info")}<span></span></p>
            </span>
            <span data-reg-extra>
              ${E({label:`${a("common.phone")} (${a("common.optional")})`,name:"phone",type:"tel"})}
              ${E({label:`${a("common.email")} (${a("common.optional")})`,name:"email",type:"email"})}
            </span>
            ${E({label:a("common.password"),name:"password",type:"password",required:!0,hint:a("auth.passwordRules"),autocomplete:"new-password"})}
            <div class="row row-between mt-s gap-2">
              <span class="grow">${E({label:"\u06A9\u062F \u0645\u0639\u0631\u0641 (\u0627\u062E\u062A\u06CC\u0627\u0631\u06CC)",name:"referralCode",placeholder:"\u0645\u062B\u0644\u0627\u064B Z8A4X"})}</span>
              <span class="grow">
                <span class="grow" style="width:100%">
                <label class="field">
                  <span class="label">نحوه آشنایی (اختیاری)</span>
                  <input type="hidden" name="hearAboutUs" value="">
                  <button type="button" class="input" data-act="choose-hear" style="text-align: right; display: flex; justify-content: space-between; align-items: center; cursor: pointer;">
                    <span data-txt>(انتخاب کنید)</span>
                    ${i("chevron-down")}
                  </button>
                </label>
              </span>
              </span>
            </div>
            <div class="mb">${Ue({label:r`${a("auth.acceptTerms")} <a class="section-link" href="#/pages/terms">${a("consent.readTerms")}</a>`,name:"acceptTerms",checked:!0})}</div>
            ${De()}
            <button class="btn btn-primary btn-block" type="submit">${i("user")} ${a("common.register")}</button>
          </form>
        </div>

        <!-- بازیابی -->
        <div class="tab-panel" data-ap="forgot" ${o?"":"hidden"}>
          <p class="muted small mb">${a("auth.recoveryText")}</p>
          <form data-act="forgot-send">
            <div class="btn-group mb" data-fch>
              <button type="button" class="btn active" data-m="phone">${a("auth.methodPhone")}</button>
              <button type="button" class="btn" data-m="email">${a("auth.methodEmail")}</button>
            </div>
            ${E({label:a("common.phone"),name:"target",type:"tel",required:!0,placeholder:"09xxxxxxxxx"})}
            ${De()}
            <button class="btn btn-primary btn-block" type="submit">${i("send")} ${a("auth.sendCode")}</button>
          </form>
          <form data-act="forgot-reset" hidden>
            <p class="notice notice-info mb">${i("mail")}<span data-fsent></span></p>
            <p class="notice notice-warn mb" data-fdemo hidden>${i("info")}<span></span></p>
            ${E({label:a("auth.otpCode"),name:"code",required:!0,attrs:'inputmode="numeric" maxlength="6"'})}
            ${E({label:a("auth.newPassword"),name:"password",type:"password",required:!0,hint:a("auth.passwordRules"),autocomplete:"new-password"})}
            <button class="btn btn-primary btn-block" type="submit">${i("key")} ${a("common.save")}</button>
          </form>
        </div>
      </div>
    </div>`}function ll(t,e){var m;N(t),t.querySelectorAll("[data-captcha]").forEach(d=>We(d));let s=e.query.get("next")||"",n=e.query.get("ref")||"";if(n){let d=t.querySelector("[name=referralCode]");d&&(d.value=n,setTimeout(()=>{var u;return(u=t.querySelector('[data-at="register"]'))==null?void 0:u.click()},50))}let o={login:t.querySelector('[data-ap="login"]'),register:t.querySelector('[data-ap="register"]'),forgot:t.querySelector('[data-ap="forgot"]')};t.querySelectorAll("[data-at]").forEach(d=>d.addEventListener("click",()=>{t.querySelectorAll("[data-at]").forEach(u=>u.classList.toggle("active",u===d));for(let[u,b]of Object.entries(o))b.hidden=u!==d.dataset.at})),t.querySelectorAll("[data-goto]").forEach(d=>d.addEventListener("click",()=>t.querySelector(`[data-at="${d.dataset.goto}"]`).click()));let c=t.querySelector("[data-method]");c.addEventListener("click",d=>{let u=d.target.closest("[data-m]");if(!u)return;c.querySelectorAll("[data-m]").forEach(g=>g.classList.toggle("active",g===u));let b=u.dataset.m;o.login.querySelectorAll("[data-apf]").forEach(g=>{g.hidden=g.dataset.apf!==b})});let l=t.querySelector("[data-regmode]");return l.addEventListener("click",d=>{let u=d.target.closest("[data-m]");u&&(l.querySelectorAll("[data-m]").forEach(b=>b.classList.toggle("active",b===u)),rt.regMode=u.dataset.m,t.querySelector("[data-reg-username]").hidden=rt.regMode!=="username",t.querySelector("[data-reg-extra]").hidden=rt.regMode!=="username",t.querySelector("[data-reg-target-phone]").hidden=rt.regMode!=="phone",t.querySelector("[data-reg-target-email]").hidden=rt.regMode!=="email",t.querySelector("[data-reg-code]").hidden=rt.regMode==="username")}),t.querySelector("[data-reg-send]").addEventListener("click",async d=>{var $;let u=t.querySelector('[data-act="register"]'),b=rt.regMode==="phone"?"phone":"email",g=b==="phone"?u.querySelector("[name=phoneTarget]").value:u.querySelector("[name=emailTarget]").value;try{let w=await v.post("/api/auth/otp/send",{channel:b,target:g,purpose:"register",captchaToken:(($=u.querySelector("[data-ctok]"))==null?void 0:$.value)||void 0});rt.demoCode=w.demoCode||"";let k=t.querySelector("[data-reg-demo]");k.hidden=!w.demoCode,w.demoCode&&(k.querySelector("span").textContent=a("auth.demoCode",{code:w.demoCode})),x(a("auth.codeSentTo",{target:w.target})),Nn(t,"[data-reg-send]")}catch(w){(w==null?void 0:w.code)==="captcha_required"&&na(u),S(w)}}),y("choose-hear",(d,u)=>{let g=Ta({title:"\u0646\u062D\u0648\u0647 \u0622\u0634\u0646\u0627\u06CC\u06CC (\u0627\u062E\u062A\u06CC\u0627\u0631\u06CC)",body:r`<div class="col" style="gap:4px; padding-bottom: 20px;">
        ${[{v:"",l:"(\u0627\u0646\u062A\u062E\u0627\u0628 \u06A9\u0646\u06CC\u062F)"},{v:"google",l:"\u062C\u0633\u062A\u062C\u0648\u06CC \u06AF\u0648\u06AF\u0644"},{v:"instagram",l:"\u0627\u06CC\u0646\u0633\u062A\u0627\u06AF\u0631\u0627\u0645"},{v:"telegram",l:"\u062A\u0644\u06AF\u0631\u0627\u0645"},{v:"friend",l:"\u0645\u0639\u0631\u0641\u06CC \u062F\u0648\u0633\u062A\u0627\u0646"},{v:"other",l:"\u0633\u0627\u06CC\u0631"}].map($=>r`<button class="btn" style="justify-content: flex-start; padding: 14px 16px; background: var(--surface-2); border-radius: 12px; font-size: 15px;" data-v="${$.v}">${$.l}</button>`).join("")}
      </div>`});g.panel.querySelectorAll("button[data-v]").forEach($=>{$.addEventListener("click",()=>{u.parentElement.querySelector('input[type="hidden"]').value=$.dataset.v,u.querySelector("[data-txt]").textContent=$.textContent,g.close()})})}),y("login-pass",async(d,u)=>{if(d.preventDefault(),ms(u),!await ks(u))return;let b=new FormData(u);await D(u.querySelector("button[type=submit]"),async()=>{var g;try{let $=await v.post("/api/auth/login",{identifier:b.get("identifier"),password:b.get("password"),remember:b.get("remember")==="on",captchaToken:b.get("captchaToken")||void 0});$.twoFactor?(rt.challenge=$.challengeToken,rt.methods=$.methods||["totp"],rt.sent=$.sent||null,pr(t,$)):(p.me=$.me,x(a("auth.loginDone")),Na(s))}catch($){(($==null?void 0:$.code)==="captcha_required"||(g=$==null?void 0:$.details)!=null&&g.captchaRequired)&&na(u),S($)}})}),y("otp-send",async(d,u)=>{if(d.preventDefault(),!await ks(u))return;let b=new FormData(u),g=u.dataset.apf==="email"?"email":"phone";rt.channel=g,rt.target=String(b.get("target")||"").trim(),await D(u.querySelector("button[type=submit]"),async()=>{try{let $=await v.post("/api/auth/otp/send",{channel:g,target:rt.target,purpose:"login",captchaToken:b.get("captchaToken")||void 0});rt.demoCode=$.demoCode||"";let w=o.login.querySelector('[data-apf="code"]');o.login.querySelectorAll("[data-apf]").forEach(C=>{C.hidden=C!==w}),w.querySelector("[data-sentto]").textContent=a("auth.codeSentTo",{target:$.target});let k=w.querySelector("[data-democode]");k.hidden=!$.demoCode,$.demoCode&&(k.querySelector("span").textContent=a("auth.demoCode",{code:$.demoCode})),x(a("auth.codeSent")),Nn(t,"[data-resend]"),w.querySelector("[name=code]").focus()}catch($){($==null?void 0:$.code)==="captcha_required"&&na(u),S($)}})}),y("otp-login",async(d,u)=>{d.preventDefault();let b=new FormData(u);await D(u.querySelector("button[type=submit]"),async()=>{try{let g=await v.post("/api/auth/login/otp",{channel:rt.channel,target:rt.target,code:b.get("code")});if(g.twoFactor){rt.challenge=g.challengeToken,rt.methods=g.methods||["totp"],pr(t,g);return}p.me=g.me,x(a("auth.loginDone")),Na(s)}catch(g){S(g)}})}),(m=t.querySelector("[data-resend]"))==null||m.addEventListener("click",async()=>{try{let d=await v.post("/api/auth/otp/send",{channel:rt.channel,target:rt.target,purpose:"login"});rt.demoCode=d.demoCode||"";let u=o.login.querySelector("[data-democode]");u.hidden=!d.demoCode,d.demoCode&&(u.querySelector("span").textContent=a("auth.demoCode",{code:d.demoCode})),x(a("auth.codeSent")),Nn(t,"[data-resend]")}catch(d){S(d)}}),y("login-2fa",async(d,u)=>{var $;d.preventDefault();let b=new FormData(u),g=(($=u.querySelector("[data-2fam].active"))==null?void 0:$.dataset["2fam"])||"totp";await D(u.querySelector("button[type=submit]"),async()=>{try{let w=await v.post("/api/auth/login/2fa",{challengeToken:rt.challenge,code:b.get("code"),type:g});p.me=w.me,x(a("auth.loginDone")),Na(s)}catch(w){S(w)}})}),y("register",async(d,u)=>{if(d.preventDefault(),ms(u),!await ks(u))return;let b=new FormData(u),g={mode:rt.regMode,name:b.get("name"),password:b.get("password"),acceptTerms:b.get("acceptTerms")==="on",referralCode:b.get("referralCode")||"",hearAboutUs:b.get("hearAboutUs")||"",captchaToken:b.get("captchaToken")||void 0};rt.regMode==="username"?(g.username=b.get("username"),g.phone=b.get("phone")||"",g.email=b.get("email")||""):rt.regMode==="phone"?(g.target=b.get("phoneTarget"),g.code=b.get("code"),g.email=b.get("email")||""):(g.target=b.get("emailTarget"),g.code=b.get("code"),g.phone=b.get("phone")||""),await D(u.querySelector("button[type=submit]"),async()=>{try{let $=await v.post("/api/auth/register",g);p.me=$.me,x(a("auth.registerDone")),Na(s||"")}catch($){($==null?void 0:$.code)==="captcha_required"&&na(u),S($)}})}),y("forgot-send",async(d,u)=>{if(d.preventDefault(),!await ks(u))return;let b=new FormData(u),g=u.querySelector("[data-fch] .active").dataset.m;rt.channel=g,rt.target=String(b.get("target")||"").trim(),await D(u.querySelector("button[type=submit]"),async()=>{try{let $=await v.post("/api/auth/password/forgot",{channel:g,target:rt.target,captchaToken:b.get("captchaToken")||void 0}),w=o.forgot.querySelector('[data-act="forgot-reset"]');o.forgot.querySelector('[data-act="forgot-send"]').hidden=!0,w.hidden=!1,w.querySelector("[data-fsent]").textContent=a("auth.codeSentTo",{target:$.target});let k=w.querySelector("[data-fdemo]");k.hidden=!$.demoCode,$.demoCode&&(k.querySelector("span").textContent=a("auth.demoCode",{code:$.demoCode})),x(a("auth.codeSent"))}catch($){($==null?void 0:$.code)==="captcha_required"&&na(u),S($)}})}),y("forgot-reset",async(d,u)=>{d.preventDefault();let b=new FormData(u);await D(u.querySelector("button[type=submit]"),async()=>{try{let g=await v.post("/api/auth/password/reset",{channel:rt.channel,target:rt.target,code:b.get("code"),password:b.get("password")});p.me=g.me,x(a("auth.resetDone")),Na("")}catch(g){S(g)}})}),null}function pr(t,e){var m;let s=t.querySelector('[data-ap="login"]');s.querySelectorAll("[data-apf]").forEach(d=>{d.hidden=d.dataset.apf!=="2fa"});let n=s.querySelector('[data-act="login-2fa"]'),o=n.querySelector("[data-2fa-method]"),c=rt.methods,l={totp:a("auth.2faTotp"),sms:a("auth.2faSms"),email:a("auth.2faEmail"),backup:a("auth.2faBackup")};o.innerHTML=c.map((d,u)=>r`<button type="button" class="btn ${u===0?"active":""}" data-2fam="${d}">${l[d]||d}</button>`).join(""),o.addEventListener("click",d=>{let u=d.target.closest("[data-2fam]");u&&o.querySelectorAll("[data-2fam]").forEach(b=>b.classList.toggle("active",b===u))}),(m=e.sent)!=null&&m.demoCode&&lt(a("auth.demoCode",{code:e.sent.demoCode}),{title:a("auth.2faTitle"),timeout:12e3}),n.querySelector("[name=code]").focus()}function Nn(t,e){let s=60,n=t.querySelector(e),o=setInterval(()=>{s-=1,n&&(n.textContent=s>0?a("auth.resendIn",{s:f(s)}):a("auth.resend")),s<=0&&clearInterval(o)},1e3)}var rt,dl,Rn=V(()=>{U();G();tt();K();mt();J();bt();at();rt={challenge:null,methods:[],sent:null,channel:"phone",target:"",demoCode:"",mode:"login",regMode:"username"};dl=()=>a("auth.title")});async function Es(){return(await v.get("/api/support/messages")).items||[]}function qs(t){return t.length?t.map(Fn).join(""):r`<div class="msg them">${a("acc.chatWelcome")}</div>`}function Ts(t){requestAnimationFrame(()=>{t.scrollTop=t.scrollHeight})}async function ml(t){return await v.post("/api/support/messages",{body:t})}function xs(){if(!pl())return;if(!p.me){lt(a("chat.loginFirst")),location.hash="#/auth?next="+encodeURIComponent("account/support");return}if(Qt){ur();return}let t=document.getElementById("chatRoot");Qt=Xt("div",{class:"chat-win",role:"dialog","aria-label":a("chat.title")}),Qt.innerHTML=r`
    <header class="chat-h">
      <span class="stat-ic" data-h="34px" data-w="34px">${i("headset")}</span>
      <div class="grow">
        <div class="t">${a("chat.title")}</div>
        <div class="s"><span class="online-dot"></span>${a("chat.online")}</div>
      </div>
      <button type="button" class="icon-btn" data-cx aria-label="${a("chat.minimize")}">${i("close")}</button>
    </header>
    <div class="chat-b" data-thread><div class="msg them">${a("common.loading")}</div></div>
    <form class="chat-f" data-act="chat-send">
      <input class="input" name="body" maxlength="1000" placeholder="${a("acc.chatPlaceholder")}" autocomplete="off">
      <button type="submit" class="btn btn-primary btn-icon" aria-label="${a("common.send")}">${i("send")}</button>
    </form>`,t.appendChild(Qt),we=Qt.querySelector("[data-thread]"),Qt.querySelector("[data-cx]").addEventListener("click",ur);let e=Qt.querySelector(".chat-h .stat-ic");e&&(e.style.width="34px",e.style.height="34px",e.style.borderRadius="11px"),Es().then(s=>{we.innerHTML=qs(s),Ts(we)}).catch(()=>{we.innerHTML=r`<div class="msg them">${a("err.network")}</div>`}),Qt.querySelector("input[name=body]").focus()}function ur(){Qt==null||Qt.remove(),Qt=null,we=null}function hr(t){let e=[];we&&e.push(we),document.querySelectorAll("[data-thread-page]").forEach(s=>e.push(s));for(let s of e){if(s.querySelector(`[data-id="${t.id}"]`))continue;let n=s.querySelector(".msg");n&&!n.dataset.id&&s.children.length===1&&n.classList.contains("them")&&n.textContent===a("acc.chatWelcome")&&(s.innerHTML=""),s.insertAdjacentHTML("beforeend",Fn(t)),Ts(s)}}function gr(){var t,e;(t=document.getElementById("fabSupport"))==null||t.addEventListener("click",xs),(e=document.getElementById("btnSupportTop"))==null||e.addEventListener("click",xs),Ft("sse:support",s=>{!p.me||(s==null?void 0:s.userId)!==p.me.id||Es().then(n=>{let o=n.find(l=>l.id===s.id);o&&o.from==="staff"&&(br()?hr(o):(Hn+=1,Bn(),lt(o.body,{title:a("chat.title"),timeout:6e3,action:{label:a("common.view"),onClick:xs}})));let c=document.querySelector("[data-thread-page]");c&&!br()&&(c.innerHTML=qs(n),Ts(c))}).catch(()=>{})}),Ft("me",()=>Bn())}function Bn(){let t=document.getElementById("fabSupport");if(!t)return;let e=t.querySelector(".fab-dot");Hn>0?e||(e=Xt("span",{class:"fab-dot"}),t.appendChild(e)):e==null||e.remove()}function fr(){Hn=0,Bn()}function pl(){var t,e;return((e=(t=p.settings)==null?void 0:t.features)==null?void 0:e.liveSupport)!==!1}var Qt,we,Hn,Fn,br,On=V(()=>{K();G();tt();U();J();bt();Qt=null,we=null,Hn=0,Fn=t=>r`
  <div class="msg ${t.from==="user"?"me":"them"}" data-id="${t.id||""}">
    ${h(t.body)}
    <span class="tm">${xt(t.at)}</span>
  </div>`;br=()=>!!Qt;y("chat-open",()=>xs());y("chat-send",async(t,e)=>{var l;let s=e.querySelector("input[name=body], textarea[name=body]"),n=String((s==null?void 0:s.value)||"").trim();if(!n)return;s.value="";let o={id:"tmp",from:"user",body:n,at:new Date().toISOString()},c=[];we&&c.push(we),document.querySelectorAll("[data-thread-page]").forEach(m=>c.push(m));for(let m of c)m.insertAdjacentHTML("beforeend",Fn(o)),Ts(m);try{let m=await ml(n),d=m.message;lt(a("chat.sent"),{timeout:1600});for(let u of c){let b=u.querySelector(".msg.me:not([data-id])");b&&(b.dataset.id=d.id,b.querySelector(".tm").textContent=xt(d.at))}m.botMessage&&hr(m.botMessage)}catch(m){S(m);for(let d of c)(l=d.lastElementChild)==null||l.remove();s.value=n}})});var zn={};Z(zn,{mount:()=>Ll,render:()=>bl,title:()=>Nl});async function bl(t){var o,c,l,m,d,u,b,g,$;let e=t.params.section||"",s=ul.filter(w=>!w.feat||H(w.feat)),n=await hl(e,t);return r`
    <div class="section-head"><div>
      <h1 class="section-title">${i("user")} ${a("acc.title")}</h1>
      <p class="section-sub">${a("acc.hello",{name:h(((o=p.me)==null?void 0:o.name)||((c=p.me)==null?void 0:c.username)||"")})} · ${a("acc.memberSince",{date:O((l=p.me)==null?void 0:l.createdAt,{time:!1})})}</p>
    </div></div>
    <div class="acc-grid">
      <aside class="acc-side">
        <div class="acc-user">
          <span class="av">${h((((m=p.me)==null?void 0:m.name)||((d=p.me)==null?void 0:d.username)||"?").charAt(0))}</span>
          <div class="grow">
            <div class="b nowrap">${h(((u=p.me)==null?void 0:u.name)||((b=p.me)==null?void 0:b.username))}</div>
            <div class="tiny muted">${((g=p.me)==null?void 0:g.role)==="owner"?a("common.admin"):(($=p.me)==null?void 0:$.role)==="staff"?"\u06A9\u0627\u0631\u0645\u0646\u062F":a("common.user")}</div>
          </div>
        </div>
        <nav class="acc-nav" aria-label="${a("acc.title")}">
          ${s.map(w=>r`<a href="#/account${w.id?`/${w.id}`:""}" class="${w.id===e?"active":""}">${i(w.icon)} ${w.label()}${w.id==="notifications"&&p.unread?r`<span class="cnt">${f(p.unread)}</span>`:""}</a>`)}
        </nav>
      </aside>
      <div data-accbody>${n}</div>
    </div>`}async function hl(t,e){switch(t){case"orders":return fl();case"wishlist":return vl();case"wallet":return yl();case"plus":return $l();case"addresses":return wl();case"notifications":return kl();case"tickets":return xl();case"support":return El();case"reviews":return ql();case"feedback":return Tl();case"referrals":return Rl();case"profile":return Cl();case"kyc":return Il();case"security":return Al();case"prefs":return Pl();case"data":return Ml();default:return gl()}}async function gl(){var s,n,o,c,l,m;let t=[];try{t=(await v.get("/api/me/orders")).items||[]}catch(d){}let e=t.slice(0,4);return r`
    <div class="stats-grid mb">
      <div class="stat-card"><span class="stat-ic">${i("package-check")}</span><div><div class="stat-val">${f(t.length)}</div><div class="stat-lbl">${a("acc.orders")}</div></div></div>
      ${H("wallet")?r`<div class="stat-card"><span class="stat-ic">${i("wallet")}</span><div><div class="stat-val">${f(((n=(s=p.me)==null?void 0:s.wallet)==null?void 0:n.balance)||0)}</div><div class="stat-lbl">${a("common.balance")}</div></div></div>`:""}
      <div class="stat-card"><span class="stat-ic">${i("heart")}</span><div><div class="stat-val">${f(p.wishlist.length)}</div><div class="stat-lbl">${a("acc.wishlist")}</div></div></div>
      <div class="stat-card"><span class="stat-ic">${i("gift")}</span><div><div class="stat-val">${f(((o=p.me)==null?void 0:o.points)||0)}</div><div class="stat-lbl">${a("common.points")}</div></div></div>
    </div>
    ${(()=>{var b;let d=((b=p.me)==null?void 0:b.badges)||[],u=d.filter(g=>g.got).length;return d.length?r`<div class="card mb">
        <div class="row row-between"><strong>${i("award")} ${a("acc.badges")}</strong><span class="muted tiny">${f(u)} / ${f(d.length)}</span></div>
        <div class="badges-grid mt-s">
          ${d.map(g=>r`
            <div class="badge-item ${g.got?"got":""}" title="${a(`badge.${g.id}.d`)}">
              <span class="bi-ic">${i(g.got?"award":"lock")}</span>
              <b>${a(`badge.${g.id}`)}</b>
              <span class="tiny muted">${g.got?a("badge.got"):g.progress!==void 0?`${f(g.progress)}\xD7`:a("badge.locked")}</span>
            </div>`)}
        </div>
      </div>`:""})()}
    ${te()?r`<div class="notice notice-success mb">${i("sparkles")}<span>${a("acc.plusActive",{date:O((l=(c=p.me)==null?void 0:c.plus)==null?void 0:l.until,{time:!1})})}</span></div>`:H("plus")?r`<div class="notice notice-info mb">${i("sparkles")}<span>${a("acc.plusInactive")} — <a class="section-link" href="#/account/plus">${a("acc.plusSubscribe")}</a></span></div>`:""}
    ${t.length?r`
      <div class="section-head"><div><h2 class="section-title">${i("history")} ${a("acc.orders")}</h2></div><a class="section-link" href="#/account/orders">${a("common.showAll")}</a></div>
      ${vr(e)}`:L({icon:"cart",title:a("acc.noOrders"),text:a("acc.noOrdersText"),action:{href:"#/products",label:a("cart.goShopping")}})}
    ${(m=p.me)!=null&&m.referralCode&&H("referrals")?r`
      <div class="card mt">
        <strong>${i("gift")} ${a("acc.referralCode")}</strong>
        <div class="row mt-s">
          <code class="tag mono b" data-h="34px">${p.me.referralCode}</code>
          <button class="btn btn-ghost btn-sm" data-act="copy" data-text="${p.me.referralCode}">${i("copy")} ${a("common.copy")}</button>
        </div>
        <p class="hint mt-s">${a("acc.referralText")}</p>
      </div>`:""}`}function vr(t){return dt([{label:a("acc.orderCode")},{label:a("acc.orderDate")},{label:a("common.status")},{label:a("acc.orderTotal"),cls:"num"},{label:a("common.actions"),cls:"num"}],t.map(e=>r`
      <tr>
        <td class="mono b">${e.code}</td>
        <td class="nowrap">${O(e.createdAt,{time:!1})}</td>
        <td>${$e(e.status)}</td>
        <td class="num">${A(e.total)}</td>
        <td><div class="act"><a class="btn btn-ghost btn-xs" href="#/account/orders/${e.id}">${a("common.view")}</a></div></td>
      </tr>`))}async function fl(){let t=[];try{t=(await v.get("/api/me/orders")).items||[]}catch(e){}return t.length?vr(t):L({icon:"package-check",title:a("acc.noOrders"),text:a("acc.noOrdersText"),action:{href:"#/products",label:a("cart.goShopping")}})}async function vl(){if(!p.wishlist.length)return L({icon:"heart",title:a("acc.wishlistEmpty"),text:a("acc.wishlistEmptyText"),action:{href:"#/products",label:a("cart.goShopping")}});let t=await v.get("/api/products?limit=96").catch(()=>null),e=p.wishlist.map(s=>{var n;return(n=t==null?void 0:t.items)==null?void 0:n.find(o=>o.id===s)}).filter(Boolean);return jt(e)}async function yl(){if(!H("wallet"))return L({icon:"wallet",title:a("err.notFound")});let t={balance:0,transactions:[]};try{t=await v.get("/api/me/wallet")}catch(e){}return r`
    <div class="card mb">
      <div class="row row-between row-wrap">
        <div><div class="muted small">${a("common.balance")}</div><div class="buy-now">${A(t.balance)}</div></div>
        <button class="btn btn-primary" data-act="wallet-deposit">${i("plus")} ${a("acc.walletDeposit")}</button>
      </div>
      <p class="hint mt-s">${a("acc.walletNote")}</p>
    </div>
    ${dt([{label:a("common.date")},{label:a("common.type")},{label:a("common.amount"),cls:"num"},{label:a("common.note")}],(t.transactions||[]).map(e=>r`
        <tr>
          <td class="nowrap">${O(e.at)}</td>
          <td><span class="badge-pill ${e.amount>=0?"bp-success":"bp-warn"}">${a(`acc.tx.${e.type}`)||e.type}</span></td>
          <td class="num b">${e.amount>=0?"+":""}${f(e.amount)}</td>
          <td class="muted small">${h(e.note||"")} ${e.ref?r`<button class="link-btn mono" data-act="copy" data-text="${e.ref}">${e.ref}</button>`:""}</td>
        </tr>`),{emptyText:a("acc.walletEmpty")})}`}function $l(){var s,n;if(!H("plus"))return L({icon:"sparkles",title:a("err.notFound")});let t=xa(),e=te();return r`
    <div class="card mb t-center">
      <span class="pwa-ic center" data-h="60px" data-w="60px">${i("sparkles")}</span>
      <h2 class="mt-s">${e?a("acc.plusActive",{date:O((n=(s=p.me)==null?void 0:s.plus)==null?void 0:n.until,{time:!1})}):a("acc.plusInactive")}</h2>
      <p class="buy-price center"><span class="buy-now">${A(t.price)}</span><span class="buy-cur">/ ${f(t.durationDays)} ${a("common.day")}</span></p>
      <div class="row center row-wrap">
        <button class="btn btn-primary" data-act="plus-buy" data-method="wallet" ${H("wallet")?"":"hidden"}>${i("wallet")} ${a("acc.plusPayWallet")}</button>
        <button class="btn btn-ghost" data-act="plus-buy" data-method="gateway">${i("card")} ${a("acc.plusPayGateway")}</button>
      </div>
      <p class="hint mt-s">${a("checkout.gatewayDemo")}</p>
    </div>
    <div class="section-head"><div><h2 class="section-title">${i("gift")} ${a("acc.plusPerks")}</h2></div></div>
    <div class="pwa-grid">
      ${(t.perks||[]).map(o=>r`<div class="pwa-card"><span class="pwa-ic">${i("check")}</span><div>${q()?o.fa:o.en}</div></div>`)}
    </div>`}function wl(){var e;let t=((e=p.me)==null?void 0:e.addresses)||[];return r`
    <div class="row row-between mb">
      <strong>${a("acc.addresses")} (${f(t.length)})</strong>
      <button class="btn btn-primary btn-sm" data-act="addr-new">${i("plus")} ${a("acc.addAddress")}</button>
    </div>
    ${t.length?r`<div class="pwa-grid">${t.map(s=>r`
      <div class="card">
        <div class="row row-between">
          <strong>${h(s.title||"")}</strong>
          ${s.isDefault?r`<span class="badge-pill bp-accent">${a("acc.addrDefault")}</span>`:""}
        </div>
        <p class="muted small mt-s">${h(s.receiver||"")} · ${ot(s.phone||"")}<br>${h(s.street||"")}${s.city?`\u060C ${h(s.city)}`:""}${s.postal?`<br>${a("common.postal")}: ${h(s.postal)}`:""}</p>
        ${s.note?r`<p class="hint">${h(s.note)}</p>`:""}
        <div class="row mt-s">
          <button class="btn btn-ghost btn-xs" data-act="addr-edit" data-id="${s.id}">${i("edit")} ${a("common.edit")}</button>
          <button class="btn btn-ghost btn-xs" data-act="addr-del" data-id="${s.id}">${i("trash")} ${a("common.delete")}</button>
          ${s.isDefault?"":r`<button class="btn btn-ghost btn-xs" data-act="addr-default" data-id="${s.id}">${i("check")} ${a("acc.addrDefault")}</button>`}
        </div>
      </div>`)}</div>`:L({icon:"pin",title:a("acc.noAddress")})}`}function yr(t=null){var e,s;return ut({title:t?a("acc.editAddress"):a("acc.addAddress"),body:r`
      <form data-act="addr-save2" class="form-grid" data-id="${(t==null?void 0:t.id)||""}">
        ${E({label:a("acc.addrTitle"),name:"title",required:!0,value:(t==null?void 0:t.title)||""})}
        ${E({label:a("acc.addrReceiver"),name:"receiver",required:!0,value:(t==null?void 0:t.receiver)||((e=p.me)==null?void 0:e.name)||""})}
        ${E({label:a("acc.addrPhone"),name:"phone",type:"tel",required:!0,value:(t==null?void 0:t.phone)||((s=p.me)==null?void 0:s.phone)||""})}
        ${E({label:a("common.city"),name:"city",value:(t==null?void 0:t.city)||""})}
        ${E({label:a("common.postal"),name:"postal",value:(t==null?void 0:t.postal)||""})}
        ${E({label:a("acc.addrStreet"),name:"street",required:!0,span2:!0,value:(t==null?void 0:t.street)||""})}
        ${E({label:a("acc.addrNote"),name:"note",span2:!0,value:(t==null?void 0:t.note)||""})}
        <label class="check span-2"><input type="checkbox" name="isDefault" ${t!=null&&t.isDefault?"checked":""}><span class="box">${i("check")}</span><span>${a("acc.addrDefault")}</span></label>
        <button class="btn btn-primary span-2" type="submit">${a("common.save")}</button>
      </form>`})}async function kl(){await ye(!0);let t=p.notifications;return r`
    <div class="row row-between mb">
      <strong>${a("common.notifications")} (${f(t.length)})</strong>
      <button class="btn btn-ghost btn-sm" data-act="notif-read-all">${i("check")} ${a("acc.markAllRead")}</button>
    </div>
    ${t.length?r`<div class="col">${t.map(e=>r`
      <div class="card ${e.read?"":"notif-unread"}">
        <div class="row row-between">
          <strong class="row">${i(Sl(e.type))} ${h(q()?e.title:e.titleEn||e.title)}</strong>
          <span class="muted tiny nowrap">${xt(e.createdAt)}</span>
        </div>
        ${e.body?r`<p class="muted small mt-s">${h(q()?e.body:e.bodyEn||e.body)}</p>`:""}
        <div class="row mt-s">
          ${e.link?r`<a class="btn btn-ghost btn-xs" href="${e.link}">${a("common.view")}</a>`:""}
          ${e.read?"":r`<button class="btn btn-ghost btn-xs" data-act="notif-read" data-id="${e.id}">${a("notif.markRead")}</button>`}
          <button class="btn btn-ghost btn-xs" data-act="notif-del" data-id="${e.id}">${i("trash")}</button>
        </div>
      </div>`)}</div>`:L({icon:"bell",title:a("acc.notifEmpty")})}`}function Sl(t){return{order:"package-check",restock:"box",ticket:"ticket",support:"headset",review:"star",plus:"sparkles",wallet:"wallet",account:"user",feedback:"flag",admin_alert:"alert",offer:"percent",welcome:"heart"}[t]||"bell"}async function xl(){let t=[];try{t=(await v.get("/api/tickets")).items||[]}catch(e){}return r`
    <div class="row row-between mb">
      <strong>${a("common.tickets")} (${f(t.length)})</strong>
      <button class="btn btn-primary btn-sm" data-act="ticket-new">${i("plus")} ${a("acc.ticketNew")}</button>
    </div>
    ${t.length?dt([{label:a("acc.orderCode")},{label:a("acc.ticketSubject")},{label:a("common.status")},{label:a("common.priority")},{label:a("common.date")},{label:""}],t.map(e=>r`
        <tr>
          <td class="mono">${e.code}</td>
          <td class="nowrap">${h(e.subject)}</td>
          <td><span class="badge-pill ${e.status==="closed"?"bp-muted":e.status==="answered"?"bp-success":"bp-warn"}">${a(`tk.${e.status}`)}</span></td>
          <td>${a(`tp.${e.priority}`)}</td>
          <td class="nowrap">${O(e.createdAt,{time:!1})}</td>
          <td><a class="btn btn-ghost btn-xs" href="#/account/tickets/${e.id}">${a("common.view")}${e.unread?r` <span class="badge-pill bp-danger">${f(e.messageCount)}</span>`:""}</a></td>
        </tr>`)):L({icon:"ticket",title:a("acc.noTickets")})}`}async function El(){if(!H("liveSupport"))return L({icon:"headset",title:a("err.notFound")});let t=[];try{t=await Es()}catch(e){}return fr(),r`
    <div class="card">
      <div class="row row-between mb-s">
        <strong>${i("headset")} ${a("acc.chatTitle")}</strong>
        <a class="btn btn-ghost btn-xs" href="#/account/tickets">${i("ticket")} ${a("acc.chatOpenTicket")}</a>
      </div>
      <div class="chat-b" data-thread-page data-h="340px">${qs(t)}</div>
      <form class="chat-f mt-s" data-act="chat-send">
        <input class="input" name="body" maxlength="1000" placeholder="${a("acc.chatPlaceholder")}" autocomplete="off">
        <button type="submit" class="btn btn-primary btn-icon" aria-label="${a("common.send")}">${i("send")}</button>
      </form>
    </div>`}async function jn(){return(await v.get("/api/me/export")).data}async function ql(){let t=null;try{t=await jn()}catch(s){}let e=(t==null?void 0:t.reviews)||[];return e.length?r`<div class="col">${e.map(s=>r`
    <div class="card">
      <div class="row row-between">
        <strong>${h(s.productName||s.productId)}</strong>
        <span class="badge-pill ${s.status==="approved"?"bp-success":s.status==="rejected"?"bp-danger":"bp-warn"}">${a(`common.${s.status==="approved"?"approved":s.status==="rejected"?"rejected":"pending"}`)}</span>
      </div>
      <div class="row row-wrap mt-s">${s.rating?Ht(s.rating):""}<span class="muted tiny">${O(s.createdAt,{time:!1})}</span><span class="badge-pill bp-muted">${s.type==="question"?a("common.question"):a("common.review")}</span></div>
      <div class="rev-title mt-s">${h(s.title)}</div>
      <div class="rev-body">${h(s.body)}</div>
      ${s.reply?r`<div class="rev-reply"><strong>${a("pdp.storeReply")}:</strong> ${h(s.reply)}</div>`:""}
    </div>`)}</div>`:L({icon:"star",title:a("acc.reviewEmpty")})}async function Tl(){let t=null;try{t=await jn()}catch(s){}let e=(t==null?void 0:t.feedback)||[];return r`
    <div class="row row-between mb">
      <strong>${a("acc.feedback")}</strong>
      <button class="btn btn-primary btn-sm" data-act="feedback-new">${i("plus")} ${a("acc.feedbackNew")}</button>
    </div>
    ${e.length?r`<div class="col">${e.map(s=>r`
      <div class="card">
        <div class="row row-between">
          <span class="badge-pill ${s.type==="bug"?"bp-danger":s.type==="complaint"?"bp-warn":"bp-info"}">${a(`ft.${s.type}`)}</span>
          <span class="badge-pill bp-muted">${a(`fs.${s.status}`)}</span>
        </div>
        <div class="rev-title mt-s">${h(s.title)}</div>
        <div class="rev-body">${h(s.body)}</div>
        ${s.response?r`<div class="rev-reply">${h(s.response)}</div>`:""}
        <div class="muted tiny mt-s">${O(s.createdAt)}</div>
      </div>`)}</div>`:L({icon:"flag",title:a("acc.noFeedback")})}`}function Cl(){let t=p.me;return r`
    <form class="card form-grid" data-act="profile-save">
      ${E({label:a("common.fullName"),name:"name",required:!0,value:(t==null?void 0:t.name)||""})}
      ${E({label:"Name (EN)",name:"nameEn",value:(t==null?void 0:t.nameEn)||""})}
      ${E({label:a("common.username"),name:"username",value:(t==null?void 0:t.username)||"",attrs:"disabled"})}
      ${E({label:a("common.phone"),name:"phone",type:"tel",value:(t==null?void 0:t.phone)||""})}
      ${E({label:a("common.email"),name:"email",type:"email",value:(t==null?void 0:t.email)||""})}
      <div class="span-2 row">
        <button class="btn btn-primary" type="submit">${i("save")} ${a("common.save")}</button>
      </div>
    </form>`}async function Al(){var s;let t=null,e=[];try{t=await v.get("/api/me/2fa")}catch(n){}try{e=(await v.get("/api/me/sessions")).items||[]}catch(n){}return r`
    <div class="card mb">
      <strong>${i("key")} ${a("acc.passwordChange")}</strong>
      <form class="form-grid mt-s" data-act="pass-change">
        ${E({label:a("acc.currentPassword"),name:"current",type:"password",required:!0,autocomplete:"current-password"})}
        ${E({label:a("acc.newPassword2"),name:"next",type:"password",required:!0,hint:a("auth.passwordRules"),autocomplete:"new-password"})}
        ${E({label:a("common.passwordConfirm"),name:"confirm",type:"password",required:!0,autocomplete:"new-password"})}
        <div class="span-2"><button class="btn btn-primary" type="submit">${a("common.save")}</button></div>
      </form>
    </div>

    ${H("twoFactor")?r`
    <div class="card mb">
      <div class="row row-between">
        <strong>${i("shield")} ${a("acc.2faSection")}</strong>
        <span class="badge-pill ${t!=null&&t.enabled?"bp-success":"bp-muted"}">${t!=null&&t.enabled?a("acc.2faOn"):a("acc.2faOff")}</span>
      </div>
      <div class="mt-s" data-2fa-box>
        ${t!=null&&t.enabled?r`
          <p class="muted small">${a("acc.2faMethods")}: ${(t.methods||[]).map(n=>a(`auth.2fa${n==="totp"?"Totp":n==="sms"?"Sms":"Email"}`)).join("\u060C ")}</p>
          ${(s=t.backupCodes)!=null&&s.length?r`<details class="mt-s"><summary class="link-btn">${a("acc.2faBackup")}</summary><p class="hint">${a("acc.2faBackupHint")}</p><div class="row row-wrap">${t.backupCodes.map(n=>r`<code class="tag mono">${n}</code>`)}</div></details>`:""}
          <button class="btn btn-danger btn-sm mt" data-act="2fa-disable">${i("close")} ${a("acc.2faDisable")}</button>`:r`
          <p class="muted small">${a("acc.2faOff")}</p>
          <button class="btn btn-primary btn-sm mt-s" data-act="2fa-setup">${i("shield")} ${a("acc.2faEnable")}</button>`}
      </div>
    </div>`:""}

    <div class="card">
      <div class="row row-between">
        <strong>${i("users")} ${a("acc.sessions")}</strong>
        <button class="btn btn-ghost btn-sm" data-act="sessions-revoke">${i("logout")} ${a("acc.revokeAll")}</button>
      </div>
      <p class="muted small mt-s">${a("acc.sessionsText")}</p>
      ${dt([{label:a("acc.current")},{label:"IP"},{label:a("common.date")},{label:""}],e.map(n=>r`
          <tr>
            <td>${n.current?r`<span class="badge-pill bp-success">${a("acc.current")}</span>`:r`<span class="muted tiny">${h((n.ua||"").slice(0,40))}</span>`}</td>
            <td class="mono small">${h(n.ip||"")}</td>
            <td class="nowrap small">${O(n.lastSeenAt||n.createdAt)}</td>
            <td>${n.current?"":r`<button class="btn btn-ghost btn-xs" data-act="session-revoke" data-id="${n.id}">${i("trash")}</button>`}</td>
          </tr>`))}
    </div>`}async function Dl(){return window.qrcode||await new Promise((t,e)=>{let s=document.createElement("script");s.src="/js/vendor/qrcode-generator.js",s.onload=t,s.onerror=e,document.head.appendChild(s)}),window.qrcode}function Pl(){var s;let t=p.prefs,e=((s=p.me)==null?void 0:s.notificationsPrefs)||{};return r`
    <div class="card mb">
      <strong>${i("settings")} ${a("acc.prefs")}</strong>
      <p class="muted small mt-s">${a("acc.prefsText")}</p>
      <div class="form-grid mt">
        ${z({label:a("acc.prefTheme"),name:"theme",value:t.theme,options:[{value:"dark",label:a("theme.dark")},{value:"light",label:a("theme.light")},{value:"auto",label:a("theme.auto")}]})}
        ${z({label:a("acc.prefLang"),name:"locale",value:t.locale,options:[{value:"fa",label:"\u0641\u0627\u0631\u0633\u06CC"},{value:"en",label:"English"}]})}
        ${z({label:a("acc.prefDensity"),name:"density",value:t.density,options:[{value:"compact",label:"Compact"},{value:"normal",label:"Normal"},{value:"comfy",label:"Comfy"}]})}
      </div>
      ${$t({label:a("acc.prefMotion"),desc:wt()==="fa"?"\u062E\u0627\u0645\u0648\u0634 \u06A9\u0631\u062F\u0646 \u0627\u0646\u06CC\u0645\u06CC\u0634\u0646\u200C\u0647\u0627 \u0628\u0631\u0627\u06CC \u0631\u0627\u062D\u062A\u06CC \u0686\u0634\u0645":"Turn animations off",name:"reduceMotion",checked:!!t.reduceMotion})}
    </div>
    <div class="card">
      <strong>${i("bell")} ${a("acc.prefNotif")}</strong>
      <form data-act="notif-prefs" class="mt-s">
        ${$t({label:a("acc.notifMarketing"),name:"marketing",checked:!!e.marketing})}
        ${$t({label:a("acc.notifOrders"),name:"orders",checked:e.orders!==!1})}
        ${$t({label:a("acc.notifRestock"),name:"restock",checked:e.restock!==!1})}
        ${$t({label:a("acc.notifSupport"),name:"support",checked:e.support!==!1})}
        <button class="btn btn-primary mt" type="submit">${a("common.save")}</button>
      </form>
    </div>`}function Ml(){return r`
    <div class="card mb">
      <strong>${i("download")} ${a("acc.exportData")}</strong>
      <p class="muted small mt-s">${a("acc.exportHint")}</p>
      <button class="btn btn-primary mt-s" data-act="data-export">${i("download")} ${a("common.download")}</button>
    </div>
    <div class="card">
      <strong class="danger-text">${i("alert")} ${a("acc.deleteAccount")}</strong>
      <p class="muted small mt-s">${a("acc.deleteWarn")}</p>
      <button class="btn btn-danger mt-s" data-act="data-delete">${i("trash")} ${a("acc.deleteAccount")}</button>
    </div>`}function Ll(t,e){return N(t),null}async function Il(){let t=p.me.kycStatus==="approved",e=p.me.kycStatus==="pending",s=p.me.kycStatus==="rejected";return t?r`
      <div class="card box pad text-center">
        ${i("check-circle",{style:"color:var(--success);width:64px;height:64px;"})}
        <h3 class="mt-4 mb-2">احراز هویت تأیید شده است</h3>
        <p class="text-muted">شما می‌توانید بدون محدودیت از تمامی خدمات و ثبت سفارش استفاده کنید.</p>
      </div>
    `:e?r`
      <div class="card box pad text-center">
        ${i("clock",{style:"color:var(--warning);width:64px;height:64px;"})}
        <h3 class="mt-4 mb-2">در حال بررسی مدارک</h3>
        <p class="text-muted">مدارک شما دریافت شده و در صف بررسی توسط کارشناسان یاسایی الکترونیک قرار دارد. لطفاً شکیبا باشید.</p>
      </div>
    `:r`
    <div class="card box pad">
      <h3 class="mb-4">${i("shield-check")} تکمیل احراز هویت</h3>
      ${s?r`<div class="alert danger mb-4">مدارک قبلی شما به دلیل نقص یا ناخوانا بودن رد شد. لطفاً دوباره ارسال کنید. (${h(p.me.kycMessage||"")})</div>`:""}
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
        <button type="submit" class="btn primary mt-2">${i("upload")} ارسال مدارک</button>
      </form>
    </div>
  `}function Rl(){var s,n,o,c,l;let t=((s=p.me)==null?void 0:s.referralCode)||((o=(n=p.me)==null?void 0:n.id)==null?void 0:o.substring(0,6).toUpperCase()),e=window.location.origin+"#/auth?ref="+t;return r`
    <div class="card box pad">
      <h3 class="mb-4">${i("users")} دعوت از دوستان (Referral)</h3>
      <p class="text-muted mb-4">با دعوت از دوستان خود هم به آن‌ها هدیه بدهید و هم خودتان پاداش بگیرید!</p>
      
      <div class="grid gap-3 mb-4">
        <div class="box pad" style="background: var(--surface-2); border-radius: var(--radius);">
          <div class="muted mb-2">کد معرف شما:</div>
          <div class="row row-between">
            <h2 class="mono m-0">${t}</h2>
            <button class="btn btn-ghost" onclick="navigator.clipboard.writeText('${t}'); import('../ui.mjs').then(m => m.toastSuccess('کد کپی شد'))">${i("copy")} کپی کد</button>
          </div>
        </div>
        <div class="box pad" style="background: var(--surface-2); border-radius: var(--radius);">
          <div class="muted mb-2">لینک دعوت اختصاصی:</div>
          <div class="row row-between gap-2">
            <input readonly value="${e}" class="input flex-1" style="font-size: 0.85rem;" dir="ltr">
            <button class="btn btn-ghost" onclick="navigator.clipboard.writeText('${e}'); import('../ui.mjs').then(m => m.toastSuccess('لینک کپی شد'))">${i("copy")}</button>
          </div>
        </div>
      </div>
      
      <div class="stats-grid mb-4">
        <div class="stat-card">
          <span class="stat-ic" style="color:var(--info)">${i("users")}</span>
          <div><div class="stat-val">${((c=p.me)==null?void 0:c.referralCount)||0}</div><div class="stat-lbl">دوستان دعوت‌شده</div></div>
        </div>
        <div class="stat-card">
          <span class="stat-ic" style="color:var(--success)">${i("gift")}</span>
          <div><div class="stat-val">${(((l=p.me)==null?void 0:l.referralCount)||0)*10}</div><div class="stat-lbl">امتیاز دریافتی</div></div>
        </div>
      </div>
      
      <div class="alert info">
        <h4 class="mb-2">${i("info")} پاداش‌ها (به‌زودی بر اساس قوانین سایت):</h4>
        <ul class="mb-0" style="padding-right: 20px;">
          <li>دعوت از هر نفر (ثبت‌نام موفق): <strong>تخفیف روی سبد خرید بعدی یا ارسال رایگان</strong></li>
          <li>دعوت از بیش از ۱۰ نفر: <strong>دریافت جایزه ویژه وفاداری</strong></li>
        </ul>
      </div>
    </div>
  `}var ul,Ia,Cs,As,Nl,Un=V(()=>{U();G();tt();K();mt();J();bt();at();On();ul=[{id:"",icon:"home",label:()=>a("acc.dashboard")},{id:"orders",icon:"package-check",label:()=>a("acc.orders")},{id:"wishlist",icon:"heart",label:()=>a("acc.wishlist"),feat:"wishlist"},{id:"wallet",icon:"wallet",label:()=>a("acc.wallet"),feat:"wallet"},{id:"plus",icon:"sparkles",label:()=>a("acc.plus"),feat:"plus"},{id:"addresses",icon:"pin",label:()=>a("acc.addresses")},{id:"notifications",icon:"bell",label:()=>a("acc.notifications")},{id:"tickets",icon:"ticket",label:()=>a("acc.tickets"),feat:"tickets"},{id:"support",icon:"headset",label:()=>a("acc.support"),feat:"liveSupport"},{id:"reviews",icon:"star",label:()=>a("acc.reviews")},{id:"feedback",icon:"flag",label:()=>a("acc.feedback")},{id:"referrals",icon:"users",label:()=>"\u062F\u0639\u0648\u062A \u0627\u0632 \u062F\u0648\u0633\u062A\u0627\u0646"},{id:"profile",icon:"user",label:()=>a("acc.profile")},{id:"kyc",icon:"shield-check",label:()=>"\u0627\u062D\u0631\u0627\u0632 \u0647\u0648\u06CC\u062A (KYC)"},{id:"security",icon:"shield",label:()=>a("acc.security")},{id:"prefs",icon:"settings",label:()=>a("acc.prefs")},{id:"data",icon:"download",label:()=>a("acc.data")}];y("wallet-deposit",()=>{let t=ut({title:a("acc.walletDeposit"),size:"sm",body:r`
      <form data-act="wallet-deposit-do">
        <p class="notice notice-warn mb">${i("info")}<span>${a("checkout.gatewayDemo")}</span></p>
        ${E({label:a("acc.walletAmount"),name:"amount",type:"number",required:!0,value:"100000",attrs:'min="10000" step="10000"'})}
        <div class="row row-wrap mb">
          ${[1e5,2e5,5e5,1e6].map(e=>r`<button type="button" class="chip" data-amt="${e}">${f(e)}</button>`)}
        </div>
        <button class="btn btn-primary btn-block" type="submit">${i("card")} ${a("common.deposit")}</button>
      </form>`,onMount:(e,s)=>{e.querySelectorAll("[data-amt]").forEach(n=>n.addEventListener("click",()=>{e.querySelector("[name=amount]").value=n.dataset.amt}))}})});y("wallet-deposit-do",async(t,e)=>{t.preventDefault();let s=Number(new FormData(e).get("amount")||0);await D(e.querySelector("button[type=submit]"),async()=>{try{await v.post("/api/me/wallet/deposit",{amount:s}),await ee(),x(a("acc.walletDeposited")),T(!0)}catch(n){S(n)}})});y("plus-buy",async(t,e)=>{await D(e,async()=>{try{await v.post("/api/me/plus/subscribe",{method:e.dataset.method}),await ee(),x(a("acc.plusSubscribed")),T(!0)}catch(s){S(s)}})});Ia=null;y("addr-new",()=>{Ia=yr(null)});y("addr-edit",(t,e)=>{var n;let s=(((n=p.me)==null?void 0:n.addresses)||[]).find(o=>o.id===e.dataset.id);s&&(Ia=yr(s))});y("addr-del",async(t,e)=>{if(await Kt())try{let n=await v.del(`/api/me/addresses/${e.dataset.id}`);p.me&&(p.me.addresses=n.addresses),x(a("acc.addrDeleted")),T(!0)}catch(n){S(n)}});y("addr-default",async(t,e)=>{var n;let s=(((n=p.me)==null?void 0:n.addresses)||[]).find(o=>o.id===e.dataset.id);try{let o=await v.patch(`/api/me/addresses/${e.dataset.id}`,Ut(pt({},s),{isDefault:!0}));p.me&&(p.me.addresses=o.addresses),x(a("acc.addrSaved")),T(!0)}catch(o){S(o)}});y("addr-save2",async(t,e)=>{t.preventDefault();let s=new FormData(e),n=Object.fromEntries(s.entries());n.isDefault=s.get("isDefault")==="on";let o=e.dataset.id;try{let c=o?await v.patch(`/api/me/addresses/${o}`,n):await v.post("/api/me/addresses",n);p.me&&(p.me.addresses=c.addresses),x(a("acc.addrSaved")),Ia==null||Ia.close(),T(!0)}catch(c){S(c)}});y("notif-read-all",async()=>{await ls([],!0),T(!0)});y("notif-read",async(t,e)=>{await ls([e.dataset.id]),T(!0)});y("notif-del",async(t,e)=>{await hn(e.dataset.id),T(!0)});Cs=null;y("ticket-new",()=>{let t=p.ticketCategories||[],e=p.ticketPriorities||[];Cs=ut({title:a("acc.ticketNew"),body:r`
      <form data-act="ticket-create">
        ${E({label:a("acc.ticketSubject"),name:"subject",required:!0})}
        <div class="form-grid">
          ${z({label:a("acc.ticketCategory"),name:"category",required:!0,options:t.map(s=>({value:s.id||s,label:a(`tc.${s.id||s}`)}))})}
          ${z({label:a("acc.ticketPriority"),name:"priority",options:e.map(s=>({value:s.id||s,label:a(`tp.${s.id||s}`)})),value:"normal"})}
        </div>
        ${X({label:a("acc.ticketBody"),name:"body",required:!0,rows:5})}
        <div class="mb">${Ue({label:r`${a("acc.ticketRules")} <a class="section-link" href="#/pages/ticketRules">${a("acc.ticketViewRules")}</a>`,name:"rules",required:!0})}</div>
        <button class="btn btn-primary btn-block" type="submit">${a("common.submit")}</button>
      </form>`})});y("ticket-create",async(t,e)=>{t.preventDefault();let s=new FormData(e);if(s.get("rules")!=="on"){Y(a("form.rulesRequired"));return}await D(e.querySelector("button[type=submit]"),async()=>{var n,o;try{let c=await v.post("/api/tickets",{subject:s.get("subject"),category:s.get("category"),priority:s.get("priority"),body:s.get("body"),rulesAccepted:!0});x(a("acc.ticketCreated",{code:((n=c.ticket)==null?void 0:n.code)||""})),Cs==null||Cs.close(),ht(`#/account/tickets/${((o=c.ticket)==null?void 0:o.id)||""}`)}catch(c){S(c)}})});As=null;y("feedback-new",()=>{var t,e;As=ut({title:a("acc.feedbackNew"),body:r`
      <form data-act="feedback-send">
        ${z({label:a("acc.feedbackType"),name:"type",options:["suggestion","complaint","bug"].map(s=>({value:s,label:a(`ft.${s}`)})),value:"suggestion"})}
        ${E({label:a("common.title"),name:"title",required:!0})}
        ${X({label:a("common.body"),name:"body",required:!0,rows:5})}
        ${E({label:a("acc.feedbackContact"),name:"contact",hint:a("acc.feedbackContactHint"),value:((t=p.me)==null?void 0:t.phone)||((e=p.me)==null?void 0:e.email)||""})}
        ${p.me?"":De()}
        <button class="btn btn-primary btn-block" type="submit">${a("common.submit")}</button>
      </form>`})});y("feedback-send",async(t,e)=>{t.preventDefault();let s=new FormData(e);await D(e.querySelector("button[type=submit]"),async()=>{try{await v.post("/api/feedback",{type:s.get("type"),title:s.get("title"),body:s.get("body"),contact:s.get("contact")||"",captchaToken:s.get("captchaToken")||void 0}),x(a("acc.feedbackSent")),As==null||As.close(),T(!0)}catch(n){if((n==null?void 0:n.code)==="captcha_required"){let o=e.querySelector("[data-captcha]");o&&(o.hidden=!1)}S(n)}})});y("profile-save",async(t,e)=>{t.preventDefault();let s=new FormData(e);await D(e.querySelector("button[type=submit]"),async()=>{try{let n=await v.patch("/api/me",{name:s.get("name"),nameEn:s.get("nameEn"),phone:s.get("phone"),email:s.get("email")});p.me=n.me,x(a("acc.profileSaved")),T(!0)}catch(n){S(n)}})});y("pass-change",async(t,e)=>{t.preventDefault();let s=new FormData(e);if(s.get("next")!==s.get("confirm")){Y(wt()==="fa"?"\u062A\u06A9\u0631\u0627\u0631 \u0631\u0645\u0632 \u06CC\u06A9\u0633\u0627\u0646 \u0646\u06CC\u0633\u062A.":"Passwords do not match.");return}await D(e.querySelector("button[type=submit]"),async()=>{try{await v.post("/api/me/password",{current:s.get("current"),next:s.get("next")}),x(a("acc.passwordChanged")),e.reset()}catch(n){S(n)}})});y("2fa-setup",async()=>{try{let t=await v.get("/api/me/2fa");ut({title:a("acc.2faEnable"),body:r`
        <div data-2fa-setup>
          <p class="muted small">${a("acc.2faScan")}</p>
          <div class="center mt-s" data-qr></div>
          <p class="hint t-center mono" data-key>${t.secret||""}</p>
          <div class="btn-group mt-s" data-methods>
            <button type="button" class="btn active" data-mm="totp">${a("auth.2faTotp")}</button>
            <button type="button" class="btn" data-mm="sms" ${t.hasPhone?"":"disabled"}>${a("auth.2faSms")}</button>
            <button type="button" class="btn" data-mm="email" ${t.hasEmail?"":"disabled"}>${a("auth.2faEmail")}</button>
          </div>
          <form data-act="2fa-enable" class="mt">
            ${E({label:a("acc.2faEnterCode"),name:"code",attrs:'inputmode="numeric" maxlength="6"'})}
            <button class="btn btn-primary btn-block" type="submit">${a("common.confirm")}</button>
          </form>
        </div>`,onMount:async e=>{try{let n=(await Dl())(0,"M");n.addData(t.otpauth),n.make();let o=e.querySelector("[data-qr]"),c=n.createSvgTag({cellSize:4,margin:2});o.innerHTML=c;let l=o.querySelector("svg");l&&(l.setAttribute("width","180"),l.setAttribute("height","180"),l.classList.add("qr-img"))}catch(s){e.querySelector("[data-qr]").innerHTML=r`<code class="tag mono">${t.otpauth}</code>`}e.querySelector("[data-methods]").addEventListener("click",s=>{let n=s.target.closest("[data-mm]");n&&(e.querySelectorAll("[data-mm]").forEach(o=>o.classList.toggle("active",o===n)),e.querySelector("[name=code]").closest(".field").hidden=n.dataset.mm!=="totp")})}})}catch(t){S(t)}});y("2fa-enable",async(t,e)=>{var o;let s=((o=e.closest("[data-2fa-setup]").querySelector("[data-mm].active"))==null?void 0:o.dataset.mm)||"totp",n=new FormData(e).get("code")||"";await D(e.querySelector("button[type=submit]"),async()=>{var c;try{let l=await v.post("/api/me/2fa/enable",{method:s,code:n});await ee(),x(a("acc.2faEnabled")),(c=l.backupCodes)!=null&&c.length&&ut({title:a("acc.2faBackup"),size:"sm",body:r`<p class="hint">${a("acc.2faBackupHint")}</p><div class="row row-wrap mt-s">${l.backupCodes.map(m=>r`<code class="tag mono b">${m}</code>`)}</div>`}),T(!0)}catch(l){S(l)}})});y("2fa-disable",async()=>{let t=await de({title:a("acc.2faDisable"),label:a("common.password"),type:"password",required:!0});if(t!==null)try{await v.post("/api/me/2fa/disable",{password:t}),await ee(),x(a("acc.2faDisabled")),T(!0)}catch(e){S(e)}});y("sessions-revoke",async()=>{if(await kt({text:a("acc.revokeAll"),danger:!0}))try{await v.post("/api/me/sessions/revoke",{allOthers:!0}),x(a("acc.revokeDone")),T(!0)}catch(e){S(e)}});y("session-revoke",async(t,e)=>{try{await v.post("/api/me/sessions/revoke",{id:e.dataset.id}),x(a("acc.revokeDone")),T(!0)}catch(s){S(s)}});y("notif-prefs",async(t,e)=>{t.preventDefault();let s=new FormData(e);try{let n=await v.patch("/api/me",{notificationsPrefs:{marketing:s.get("marketing")==="on",orders:s.get("orders")==="on",restock:s.get("restock")==="on",support:s.get("support")==="on"}});p.me=n.me,x(a("misc.saved"))}catch(n){S(n)}});y("data-export",async(t,e)=>{await D(e,async()=>{try{let s=await jn(),n=new Blob([JSON.stringify(s,null,2)],{type:"application/json"}),o=URL.createObjectURL(n),c=document.createElement("a");c.href=o,c.download=`bander-mobile-data-${new Date().toISOString().slice(0,10)}.json`,c.click(),setTimeout(()=>URL.revokeObjectURL(o),4e3),x(a("common.download"))}catch(s){S(s)}})});y("data-delete",async()=>{if(!await kt({title:a("acc.deleteAccount"),text:a("acc.deleteWarn"),danger:!0,okText:a("common.delete")}))return;let e=await de({title:a("acc.deleteConfirm"),label:a("common.password"),type:"password",required:!0});if(e!==null)try{await v.post("/api/me/delete",{password:e}),p.me=null,ht("#/"),T()}catch(s){S(s)}});Nl=t=>a("acc.title")});var $r={};Z($r,{mount:()=>Fl,render:()=>Hl});async function Hl(t){var c,l,m,d,u,b,g,$,w;let e=t.params.id,s=null;try{s=await v.get(`/api/me/orders/${e}`)}catch(k){return(k==null?void 0:k.status)===404?L({icon:"package-check",title:a("acc.noOrders"),action:{href:"#/account/orders",label:a("acc.orders")}}):W({title:a("err.generic")})}let n=s.order,o=new Set(s.canReviewIds||[]);return r`
    <div class="breadcrumb mb-s">
      <a href="#/account">${a("acc.title")}</a> <span>/</span>
      <a href="#/account/orders">${a("acc.orders")}</a> <span>/</span>
      <span class="mono">${n.code}</span>
    </div>

    <div class="cart-grid">
      <div class="col">
        <div class="card">
          <div class="row row-between row-wrap">
            <div>
              <div class="row row-wrap"><h1 class="buy-title">${i("package-check")} ${n.code}</h1>${$e(n.status)}</div>
              <p class="muted small mt-s">${O(n.createdAt)} · ${h(((c=n.statusInfo)==null?void 0:c.fa)||((l=n.statusInfo)==null?void 0:l.label)||"")}</p>
            </div>
            <div class="row row-wrap">
              <button class="btn btn-ghost btn-sm" data-act="od-invoice" data-id="${n.id}">${i("printer")} ${a("acc.printInvoice")}</button>
              ${((m=n.payment)==null?void 0:m.status)==="unpaid"?r`<a class="btn btn-primary btn-sm" href="#/pay/${n.id}">${i("card")} ${a("common.payable")} ${A(n.payable)}</a>`:""}
              ${["pending_review","pending_payment","confirmed","preparing"].includes(n.status)?r`<button class="btn btn-danger btn-sm" data-act="od-cancel" data-id="${n.id}">${i("close")} ${a("acc.cancelOrder")}</button>`:""}
            ${n.tracking?r`<span class="row gap-s"><span class="badge-pill bp-info mono">${i("truck")} ${h(n.tracking)}</span><button class="btn btn-ghost btn-xs" data-act="copy" data-text="${h(n.tracking)}">${i("copy")} ${a("common.copy")}</button></span>`:""}
            </div>
          </div>
          ${(d=n.statusInfo)!=null&&d.fa&&q()===!1&&((u=n.statusInfo)!=null&&u.en)?r`<p class="muted small">${h(n.statusInfo.en)}</p>`:""}
        </div>

        <div class="card mt">
          <strong>${i("history")} ${a("acc.timeline")}</strong>
          ${ta(n)}
        </div>

        <div class="card mt">
          <strong>${i("box")} ${a("acc.orderItems")} (${f(((b=n.items)==null?void 0:b.length)||0)})</strong>
          ${dt([{label:""},{label:a("common.product")},{label:a("common.price"),cls:"num"},{label:a("common.count"),cls:"num"},{label:a("common.total"),cls:"num"},{label:""}],(n.items||[]).map(k=>r`
              <tr>
                <td><span class="cl-img" data-h="52px" data-w="52px">${k.image?r`<img src="${k.image}" alt="${h(q()?k.name:k.nameEn||k.name)}" loading="lazy">`:i("box")}</span></td>
                <td>
                  <a class="b" href="#/product/${k.productId}">${h(q()?k.name:k.nameEn||k.name)}</a>
                  ${k.brand?r`<div class="tiny muted">${h(k.brand)}</div>`:""}
                  ${k.sku?r`<div class="tiny muted mono">SKU ${h(k.sku)}</div>`:""}
                </td>
                <td class="num">${A(k.price)}</td>
                <td class="num">${f(k.qty)}</td>
                <td class="num b">${A(k.price*k.qty)}</td>
                <td>${o.has(k.productId)?r`<button class="btn btn-ghost btn-xs" data-act="od-review" data-id="${k.productId}" data-name="${h(q()?k.name:k.nameEn||k.name)}">${i("star")} ${a("pdp.writeReview")}</button>`:""}</td>
              </tr>`))}
          <div class="row row-wrap mt">
            <button class="btn btn-ghost btn-sm" data-act="od-reorder" data-id="${n.id}">${i("cart")} ${a("acc.reorder")}</button>
            <a class="btn btn-ghost btn-sm" href="#/account/tickets">${i("ticket")} ${a("acc.chatOpenTicket")}</a>
          </div>
        </div>
      </div>

      <aside class="col">
        <div class="card summary">
          <strong>${a("cart.summary")}</strong>
          <div class="sum-row"><span>${a("common.subtotal")}</span><span class="v">${A(n.subtotal)}</span></div>
          ${n.plusDiscount>0?r`<div class="sum-row discount"><span>${a("acc.plus")}</span><span class="v">−${A(n.plusDiscount)}</span></div>`:""}
          ${n.couponDiscount>0?r`<div class="sum-row discount"><span>${a("common.discountCode")}: ${n.couponCode}</span><span class="v">−${A(n.couponDiscount)}</span></div>`:""}
          <div class="sum-row"><span>${a("common.shipping")}${n.shippingLabel?r` <span class="muted tiny">(${h(n.shippingLabel)})</span>`:""}</span><span class="v">${n.shipping===0?a("common.free"):A(n.shipping)}</span></div>
          ${n.insured?r`<div class="sum-row"><span>${a("common.insurance")}</span><span class="v">${n.insuranceFee===0?a("common.free"):A(n.insuranceFee)}</span></div>`:""}
          <div class="sum-row"><span>${a("common.total")}</span><span class="v">${A(n.total)}</span></div>
          ${n.walletUsed>0?r`<div class="sum-row discount"><span>${a("common.wallet")}</span><span class="v">−${A(n.walletUsed)}</span></div>`:""}
          <div class="sum-row total"><span>${a("common.payable")}</span><span class="v">${A(n.payable)}</span></div>
          <div class="row row-between mt-s">
            <span class="muted small">${a("common.payment")}</span>
            ${ze(n.payment)}
          </div>
          ${(g=n.payment)!=null&&g.ref?r`<p class="hint mono mt-s">${h(n.payment.ref)}</p>`:""}
          ${n.refund?r`<p class="notice notice-success mt-s">${i("wallet")}<span>${A(n.refund.amount)} ${a("acc.tx.refund")} — ${O(n.refund.at)}</span></p>`:""}
        </div>

        <div class="card mt">
          <strong>${i("truck")} ${a(n.delivery==="pickup"?"checkout.pickup":"checkout.courier")}</strong>
          ${n.delivery==="pickup"?r`
            <p class="muted small mt-s">${a("checkout.pickupDesc")}</p>
            <p class="mt-s small">${h(((w=($=p.settings)==null?void 0:$.store)==null?void 0:w.address)||"")}</p>`:r`
            ${n.address?r`
              <p class="small mt-s"><strong>${h(n.address.receiver||"")}</strong> · ${ot(n.address.phone||"")}</p>
              <p class="muted small">${h(n.address.street||"")}${n.address.city?`\u060C ${h(n.address.city)}`:""}</p>
              ${n.address.postal?r`<p class="muted small">${a("common.postal")}: ${h(n.address.postal)}</p>`:""}`:r`<p class="muted small mt-s">${a("acc.noAddress")}</p>`}
            ${n.zone?r`<p class="small mt-s">${a("checkout.zone")}: ${h(Bl(n.zone))}</p>`:""}`}
          ${n.express?r`<p class="small mt-s"><span class="badge-pill bp-accent">${i("zap")} ${a("checkout.express")}</span></p>`:""}
          ${n.insured?r`<p class="small mt-s"><span class="badge-pill bp-success">${i("shield")} ${a("common.insurance")} ${A(n.insuranceFee)}</span></p>`:""}
          ${n.note?r`<p class="hint mt-s">${i("edit")} ${h(n.note)}</p>`:""}
          ${n.couponCode?r`<p class="hint mt-s">${i("percent")} ${n.couponCode}</p>`:""}
        </div>
      </aside>
    </div>`}function Fl(t,e){return N(t),null}var Bl,wr=V(()=>{U();G();tt();K();mt();J();bt();at();K();Bl=t=>{let e=(ve().zones||[]).find(s=>s.id===t);return e?q()?e.name:e.nameEn||e.name:t||""};y("od-cancel",async(t,e)=>{let s=await de({title:a("acc.cancelOrder"),text:a("acc.cancelReason"),label:a("acc.cancelReason"),rows:3,okText:a("acc.cancelOrder")});if(s!==null)try{await v.post(`/api/me/orders/${e.dataset.id}/cancel`,{reason:s||""}),x(a("acc.orderCancelled")),T(!0)}catch(n){S(n)}});y("od-reorder",async(t,e)=>{await D(e,async()=>{try{let{order:s}=await v.get(`/api/me/orders/${e.dataset.id}`),n=0;for(let o of s.items||[])try{await v.post("/api/cart/add",{productId:o.productId,qty:o.qty||1}),n+=1}catch(c){}if(await Mt(),!n){S({code:"out_of_stock",message:q()?"\u0647\u06CC\u0686\u200C\u06A9\u062F\u0627\u0645 \u0627\u0632 \u0627\u0642\u0644\u0627\u0645 \u062F\u0631 \u0627\u0646\u0628\u0627\u0631 \u0646\u06CC\u0633\u062A.":"None of the items are in stock."});return}x(a("card.added")),ht("#/cart")}catch(s){S(s)}})});y("od-invoice",async(t,e)=>{var o,c,l,m;let{order:s}=await v.get(`/api/me/orders/${e.dataset.id}`),n=((o=p.settings)==null?void 0:o.store)||{};ut({title:a("acc.invoice"),body:r`
      <div class="invoice-print" dir="rtl">
        <div class="inv-head">
          <div>
            <strong>${h(n.name||"Yassaei Electronics")}</strong>
            <div class="tiny">${h(n.address||"")}</div>
            <div class="tiny">${ot(n.phone||"")}</div>
          </div>
          <div class="t-center">
            <div class="inv-code mono">${s.code}</div>
            <div class="tiny">${O(s.createdAt)}</div>
          </div>
        </div>
        <table class="inv-table">
          <thead><tr><th>#</th><th>کالا</th><th>تعداد</th><th>فی</th><th>مبلغ</th></tr></thead>
          <tbody>
            ${(s.items||[]).map((d,u)=>r`<tr>
              <td>${f(u+1)}</td><td>${h(d.name)}${d.sku?` <span class="mono tiny">(${d.sku})</span>`:""}</td>
              <td>${f(d.qty)}</td><td>${f(d.price)}</td><td>${f(d.price*d.qty)}</td>
            </tr>`)}
          </tbody>
        </table>
        <div class="inv-sum">
          <div><span>جمع کالاها</span><span>${f(s.subtotal)}</span></div>
          ${s.discount?r`<div><span>تخفیف</span><span>- ${f(s.discount)}</span></div>`:""}
          <div><span>هزینهٔ ارسال${s.shippingLabel?` (${s.shippingLabel})`:""}</span><span>${f(s.shipping)}</span></div>
          ${s.insuranceFee?r`<div><span>بیمهٔ ارسال</span><span>${f(s.insuranceFee)}</span></div>`:""}
          <div class="b"><span>مبلغ کل</span><span>${f(s.total)}</span></div>
          ${s.walletUsed?r`<div><span>پرداخت از کیف پول</span><span>- ${f(s.walletUsed)}</span></div>`:""}
          <div class="b"><span>قابل پرداخت</span><span>${f(s.payable)}</span></div>
        </div>
        <div class="inv-foot tiny">
          <div>وضعیت پرداخت: ${((c=s.payment)==null?void 0:c.status)==="paid"?"\u067E\u0631\u062F\u0627\u062E\u062A\u200C\u0634\u062F\u0647":((l=s.payment)==null?void 0:l.status)==="pending"?"\u062F\u0631 \u0627\u0646\u062A\u0638\u0627\u0631":"\u067E\u0631\u062F\u0627\u062E\u062A\u200C\u0646\u0634\u062F\u0647"} — روش: ${((m=s.payment)==null?void 0:m.method)||"\u2014"}</div>
          <div>${h(n.name||"")} · این فاکتور به‌صورت خودکار توسط سامانه صادر شده است.</div>
        </div>
      </div>
      <div class="row mt">
        <button class="btn btn-primary" data-act="print-page">${i("printer")} ${a("common.print")}</button>
      </div>`})});y("od-review",(t,e)=>{let s=e.dataset.id,n=e.dataset.name||"",o=ut({title:`${a("pdp.writeReview")} \u2014 ${n}`,body:r`
      <form data-act="od-review-send" data-id="${s}">
        <div class="field"><span class="label">${a("pdp.yourRating")}</span>${gs({name:"rating",value:5})}</div>
        ${E({label:a("common.title"),name:"title",required:!0})}
        ${X({label:a("common.body"),name:"body",required:!0,rows:5})}
        <p class="hint mb">${a("pdp.reviewPending")}</p>
        <button class="btn btn-primary btn-block" type="submit">${a("common.submit")}</button>
      </form>`})});y("od-review-send",async(t,e)=>{t.preventDefault();let s=new FormData(e);await D(e.querySelector("button[type=submit]"),async()=>{var n;try{await v.post("/api/reviews",{productId:e.dataset.id,type:"review",rating:Number(s.get("rating")||5),title:s.get("title"),body:s.get("body")}),x(a("pdp.reviewSubmitted")),(n=e.closest(".overlay"))==null||n.remove()}catch(o){S(o)}})})});var Sr={};Z(Sr,{mount:()=>Ul,render:()=>zl});async function zl(t){var o,c;let e=null;try{e=(await v.get(`/api/tickets/${t.params.id}`)).ticket}catch(l){return(l==null?void 0:l.status)===404?L({icon:"ticket",title:a("acc.noTickets"),action:{href:"#/account/tickets",label:a("acc.tickets")}}):W({title:a("err.generic")})}_e=[];let s=((o=(p.ticketPriorities||[]).find(l=>l.id===e.priority))==null?void 0:o.slaHours)||24,n=e.status==="closed";return r`
    <div class="breadcrumb mb-s">
      <a href="#/account">${a("acc.title")}</a> <span>/</span>
      <a href="#/account/tickets">${a("acc.tickets")}</a> <span>/</span>
      <span class="mono">${e.code}</span>
    </div>

    <div class="card">
      <div class="row row-between row-wrap">
        <div>
          <h1 class="buy-title">${i("ticket")} ${h(e.subject)}</h1>
          <p class="muted small mt-s">
            <span class="mono">${e.code}</span> · ${O(e.createdAt)} ·
            ${a("acc.ticketCategory")}: ${a(`tc.${e.category}`)}
          </p>
        </div>
        <div class="row row-wrap">
          <span class="badge-pill ${Ol[e.status]||"bp-muted"}">${a(`tk.${e.status}`)}</span>
          <span class="badge-pill ${jl[e.priority]||"bp-info"}">${a(`tp.${e.priority}`)}</span>
          ${n?"":r`<button class="btn btn-ghost btn-sm" data-act="tk-close" data-id="${e.id}">${i("check")} ${a("acc.ticketClose")}</button>`}
        </div>
      </div>
      <p class="notice notice-info mt-s">${i("clock")}<span>${a("acc.ticketSla",{h:f(s)})}</span></p>
    </div>

    <div class="card mt">
      <strong>${i("chat")} ${a("common.messages")} (${f(((c=e.messages)==null?void 0:c.length)||0)})</strong>
      <div class="tk-thread mt-s" data-tk-thread>
        ${(e.messages||[]).map(kr).join("")}
      </div>

      ${n?r`<p class="notice notice-warn mt">${i("info")}<span>${a("acc.ticketClosedNote")}</span></p>`:""}
      <form class="mt" data-act="tk-reply" data-id="${e.id}">
        ${X({label:a("acc.ticketWrite"),name:"body",required:!0,rows:4,placeholder:a("acc.chatPlaceholder")})}
        <div data-attach-preview class="row row-wrap mt-s"></div>
        <div class="row row-between row-wrap mt-s">
          <div class="row row-wrap">
            <label class="btn btn-ghost btn-sm" for="tk-file">${i("upload")} ${a("common.attach")}</label>
            <input id="tk-file" type="file" accept="image/*" multiple hidden data-attach-input>
            <span class="hint">${a("acc.attachHint")}</span>
          </div>
          <button class="btn btn-primary" type="submit">${i("send")} ${a("common.send")}</button>
        </div>
      </form>
    </div>`}function kr(t){var n;let e=t.from==="user",s=t.from==="system"?"them sys":e?"me":"them";return r`
    <div class="msg ${s}">
      <div class="msg-bubble">
        <div class="row row-between">
          <strong class="tiny">${h(e?((n=p.me)==null?void 0:n.name)||a("common.user"):t.from==="staff"?a("common.support"):t.name||"")}</strong>
          <span class="tiny muted nowrap">${xt(t.at)}</span>
        </div>
        <div class="msg-text">${h(t.body||"").replace(/\n/g,"<br>")}</div>
        ${(t.attachments||[]).length?r`<div class="row row-wrap mt-s">${t.attachments.map(o=>r`<img class="tk-att" src="${o}" alt="${a("common.image")}" loading="lazy" data-act="tk-att-open" data-url="${o}">`)}</div>`:""}
      </div>
    </div>`}function Wn(t){let e=t.querySelector("[data-attach-preview]");e&&(e.innerHTML=_e.map((s,n)=>r`
    <span class="att-chip">
      <img src="${s.url}" alt="${h(s.name)}">
      <button type="button" class="att-x" data-act="tk-att-del" data-i="${n}" aria-label="${a("common.delete")}">${i("close")}</button>
    </span>`).join(""))}function Ul(t,e){N(t);let s=t.querySelector("[data-attach-input]");s&&s.addEventListener("change",o=>{let c=Ss("tk-attach-pick");c==null||c(o,o.target)});let n=t.querySelector("[data-tk-thread]");return n&&(n.scrollTop=n.scrollHeight),null}var Ol,jl,_e,xr=V(()=>{U();G();tt();K();mt();J();bt();at();Ol={open:"bp-warn",answered:"bp-success",closed:"bp-muted",in_progress:"bp-info",new:"bp-info"},jl={critical:"bp-danger",high:"bp-warn",normal:"bp-info",low:"bp-muted"},_e=[];y("tk-att-open",(t,e)=>{let n=[...document.querySelectorAll("[data-tk-thread] .tk-att")].map(o=>o.getAttribute("src"));He(n.length?n:[e.getAttribute("src")],Math.max(0,n.indexOf(e.getAttribute("src"))))});y("tk-attach-pick",async(t,e)=>{let s=e.closest("form"),n=[...e.files||[]].slice(0,4-_e.length);e.value="";for(let o of n){if(o.size>4*1024*1024){Y(a("err.tooLarge"));continue}try{let c=await Ie(o),l=await v.upload(c);_e.push({url:l.url,name:o.name})}catch(c){S(c)}}Wn(s)});y("tk-att-del",(t,e)=>{_e.splice(Number(e.dataset.i),1),Wn(e.closest("form"))});y("tk-reply",async(t,e)=>{t.preventDefault();let s=String(new FormData(e).get("body")||"").trim();if(s.length<2){Y(a("acc.ticketBodyShort"));return}let n=e.querySelector("button[type=submit]");await D(n,async()=>{var o;try{let c=await v.post(`/api/tickets/${e.dataset.id}/messages`,{body:s,attachments:_e.map(m=>m.url)});_e=[];let l=e.closest(".card").querySelector("[data-tk-thread]");l&&(l.innerHTML=(((o=c.ticket)==null?void 0:o.messages)||[]).map(kr).join(""),l.scrollTop=l.scrollHeight),e.reset(),Wn(e),x(a("common.sent")),ye(!0)}catch(c){S(c)}})});y("tk-close",async(t,e)=>{await kt({text:a("acc.ticketCloseConfirm"),okText:a("acc.ticketClose")})&&await D(e,async()=>{try{await v.post(`/api/tickets/${e.dataset.id}/close`,{}),x(a("common.done")),T(!0)}catch(n){S(n)}})})});var Er={};Z(Er,{render:()=>Wl});async function Wl(){let t=null;try{t=await v.get("/api/stats/public")}catch(l){}if(!t)return r`<div class="empty"><h4>${a("err.network")}</h4></div>`;let e=t.stats||{},s=t.chart||[],n=t.topProducts||[],o=Math.max(1,...s.map(l=>l.visits)),c=s.map(l=>{let m=Math.min(12,Math.max(1,Math.round(l.visits/o*12)));return r`<div class="ch-col" title="${l.date}: ${oe(l.visits)}">
      <i class="hb-${m}"></i>
      <span>${oe(Number(l.date.slice(8,10)))}</span>
    </div>`}).join("");return r`
    <div class="page-head">
      <h1 class="page-h1">${i("chart")} ${a("stats.title")}</h1>
      <p class="muted small">${a("stats.subtitle")}</p>
    </div>

    <section class="section">
      <div class="stats-grid">
        ${Ct({icon:"box",label:a("stats.products"),value:f(e.products)})}
        ${Ct({icon:"grid",label:a("stats.categories"),value:f(e.categories)})}
        ${Ct({icon:"cart",label:a("stats.ordersTotal"),value:f(e.ordersTotal)})}
        ${Ct({icon:"package-check",label:a("stats.delivered"),value:f(e.deliveredOrders)})}
        ${Ct({icon:"users",label:a("stats.customers"),value:f(e.customers)})}
        ${Ct({icon:"eye",label:a("stats.visitsTotal"),value:f(e.visitsTotal)})}
        ${Ct({icon:"chart",label:a("stats.visitsToday"),value:f(e.visitsToday)})}
        ${Ct({icon:"sparkles",label:a("stats.plusMembers"),value:f(e.plusMembers)})}
      </div>
    </section>

    <section class="section">
      ${Nt({titleIcon:"chart",title:a("stats.chartTitle")})}
      <div class="card chart-card">
        <div class="chart">${c}</div>
        <p class="hint mt-s">${a("stats.chartHint")}</p>
      </div>
    </section>

    ${n!=null&&n.length?r`
    <section class="section">
      ${Nt({titleIcon:"star",title:a("stats.topTitle")})}
      <div class="list">
        ${n.map((l,m)=>r`
          <a class="list-row" href="#/product/${l.id}">
            <span class="rank">${oe(m+1)}</span>
            <span class="grow">
              <span class="b">${q()?l.name:l.nameEn||l.name}</span>
              <span class="muted tiny">${q()?l.categoryName:l.categoryNameEn||l.categoryName}</span>
            </span>
            <span class="muted small">${i("eye")} ${oe(l.sold||0)}</span>
          </a>`)}
      </div>
    </section>`:""}
  `}var qr=V(()=>{U();G();K();tt();mt()});var Cr={};Z(Cr,{mount:()=>td,render:()=>_l,title:()=>ed});function ia(t,e=""){return t!=null&&t.hero?r`
    <div class="page-hero mb">
      <h1 class="page-title">${h(ue(t.hero,"title"))}</h1>
      ${ue(t.hero,"subtitle")?r`<p class="page-sub">${h(ue(t.hero,"subtitle"))}</p>`:""}
      ${e}
    </div>`:""}function _n(t){return t!=null&&t.length?t.map(e=>r`
    <div class="card mt">
      <h2 class="page-h2">${h(ue(e,"title"))}</h2>
      ${e.body||e.bodyEn?r`<div class="page-body">${ct(ue(e,"body"))}</div>`:""}
      ${ra(oa(e,"list").length?oa(e,"list"):e.list||[])}
    </div>`).join(""):""}async function _l(t){let e=String(t.params.key||""),s=null;try{s=await v.get(`/api/pages/${e}`)}catch(o){}if(!(s!=null&&s.page))return L({icon:"file",title:a("err.notFound"),text:a("err.notFoundText"),action:{href:"#/",label:a("err.goHome")}});let n=s.page;if(Array.isArray(n))return Zl(n);switch(e){case"about":return Vl(n);case"guide":return Gl(n);case"service":return Kl(n);case"contact":return Xl(n);case"bugReport":return Jl(n);default:return Ql(n)}}async function Vl(t){var s;let e=null;if(H("publicStats"))try{e=(await v.get("/api/stats/public")).stats}catch(n){}return r`
    ${ia(t)}
    ${e&&((s=t.stats)!=null&&s.length)?r`
      <div class="section-head"><div><h2 class="section-title">${i("chart")} ${a("page.statsTitle")}</h2></div></div>
      <div class="stats-grid">
        ${t.stats.map(n=>Ct({icon:Yl(n.key),label:q()?n.fa:n.en||n.fa,value:f(Number(e[n.key]||0))}))}
      </div>`:""}
    ${_n(t.sections)}
    <div class="card mt t-center">
      <strong>${i("heart")} ${a("page.aboutCta")}</strong>
      <div class="row center row-wrap mt-s">
        <a class="btn btn-primary" href="#/products">${i("cart")} ${a("cart.goShopping")}</a>
        <a class="btn btn-ghost" href="#/pages/contact">${i("phone")} ${a("contact.title")}</a>
        <a class="btn btn-ghost" href="#/pages/guide">${i("file")} ${a("footer.guide")}</a>
      </div>
    </div>`}function Yl(t){return{years:"clock",products:"box",orders:"package-check",customers:"users",visits:"eye"}[t]||"chart"}function Gl(t){var e,s;return r`
    ${ia(t)}
    ${(e=t.steps)!=null&&e.length?r`
      <div class="section-head"><div><h2 class="section-title">${i("list")} ${a("page.stepsTitle")}</h2></div></div>
      <ol class="steps-list">
        ${t.steps.map(n=>r`
          <li class="card step-item">
            <div class="grow">
              <strong>${h(ue(n,"title"))}</strong>
              <p class="muted small mt-s">${h(ue(n,"body"))}</p>
              ${ra(oa(n,"list").length?oa(n,"list"):n.list||[])}
            </div>
          </li>`)}
      </ol>`:""}
    ${(s=t.tips)!=null&&s.length?r`
      <div class="card mt">
        <h2 class="page-h2">${i("zap")} ${a("page.tipsTitle")}</h2>
        ${ra((q(),t.tips).map(n=>q()?n.fa:n.en||n.fa))}
      </div>`:""}
    <div class="row row-wrap mt">
      <a class="btn btn-primary" href="#/products">${a("cart.goShopping")}</a>
      <a class="btn btn-ghost" href="#/pages/faq">${i("info")} ${a("footer.faq")}</a>
    </div>`}function Kl(t){return r`
    ${ia(t)}
    <div class="pwa-grid">
      ${(t.items||[]).map(e=>r`
        <div class="pwa-card">
          <span class="pwa-ic">${i(e.icon||"check")}</span>
          <div>
            <strong>${h(ue(e,"title"))}</strong>
            <p class="muted small mt-s">${h(ue(e,"body"))}</p>
            ${ra(oa(e,"list").length?oa(e,"list"):e.list||[])}
          </div>
        </div>`)}
    </div>
    ${_n(t.sections)}`}function Ql(t){var e,s;return r`
    ${ia(t)}
    ${t.intro||t.introEn?r`<p class="page-lead">${h(q()?t.intro:t.introEn||t.intro)}</p>`:""}
    ${t.body||t.bodyEn?r`<div class="card"><div class="page-body">${ct(q()?t.body:t.bodyEn||t.body)}</div></div>`:""}
    ${(e=t.rules)!=null&&e.length||(s=t.rulesEn)!=null&&s.length?r`
      <div class="card mt">
        <h2 class="page-h2">${i("check")} ${a("page.rulesTitle")}</h2>
        ${ra(q()?t.rules:t.rulesEn||t.rules)}
      </div>`:""}
    ${_n(t.sections)}
    ${t.notice||t.noticeEn?r`<p class="notice notice-warn mt">${i("info")}<span>${h(q()?t.notice:t.noticeEn||t.notice)}</span></p>`:""}
    <div class="row row-wrap mt">
      <a class="btn btn-ghost" href="#/pages/terms">${i("file")} ${a("footer.terms")}</a>
      <a class="btn btn-ghost" href="#/pages/privacy">${i("shield")} ${a("footer.privacy")}</a>
      <a class="btn btn-ghost" href="#/pages/insurance">${i("truck")} ${a("footer.insurance")}</a>
      <a class="btn btn-ghost" href="#/pages/ticketRules">${i("ticket")} ${a("acc.ticketViewRules")}</a>
    </div>
    ${(t.id==="terms"||t.id==="privacy")&&!hasConsent()?r`
      <div class="card mt bg-shade">
        <p class="mb-s b">${q()?"\u0622\u06CC\u0627 \u0642\u0648\u0627\u0646\u06CC\u0646 \u0631\u0627 \u0645\u0637\u0627\u0644\u0639\u0647 \u06A9\u0631\u062F\u06CC\u062F\u061F":"Have you read the terms?"}</p>
        <button type="button" class="btn btn-primary" data-act="accept-consent-now">${i("check")} ${a("consent.accept")}</button>
      </div>
    `:""}
    `}function Jl(t){var e,s,n;return r`
    ${ia(t)}
    ${t.body||t.bodyEn?r`<p class="page-lead">${h(q()?t.body:t.bodyEn||t.body)}</p>`:""}
    ${(e=t.hints)!=null&&e.length?r`
      <div class="card">
        <h2 class="page-h2">${i("info")} ${a("page.hintsTitle")}</h2>
        ${ra(q()?t.hints:t.hintsEn||t.hints)}
      </div>`:""}
    <form class="card mt" data-act="page-feedback">
      <input type="hidden" name="type" value="bug">
      <h2 class="page-h2">${i("bug")} ${a("page.bugTitle")}</h2>
      ${E({label:a("common.title"),name:"title",required:!0})}
      ${X({label:a("common.body"),name:"body",required:!0,rows:6})}
      ${E({label:a("acc.feedbackContact"),name:"contact",hint:a("acc.feedbackContactHint"),value:((s=p.me)==null?void 0:s.phone)||((n=p.me)==null?void 0:n.email)||""})}
      <button class="btn btn-primary" type="submit">${i("send")} ${a("common.submit")}</button>
    </form>`}function Xl(t){var c,l;let e=Zt(),s=e.socials||{},n="https://instagram.com/jam.yassaei",o=[{key:"instagram",icon:"camera",url:Dt(s.instagram||n)},{key:"telegram",icon:"send",url:Dt(s.telegram)},{key:"eitaa",icon:"message",url:Dt(s.eitaa)},{key:"whatsapp",icon:"chat",url:e.whatsapp?`https://wa.me/${String(e.whatsapp).replace(/\D/g,"")}`:""}].filter(m=>m.url);return r`
    ${ia(t)}
    <div class="acc-grid">
      <div class="col">
        <div class="card">
          <h2 class="page-h2">${i("pin")} ${a("contact.addressUs")}</h2>
          <p class="page-body">${h(q()?e.address:e.addressEn||e.address)}</p>
          <div class="row row-wrap mt-s">
            <button class="btn btn-ghost btn-sm" data-act="copy" data-text="${h(q()?e.address:e.addressEn||e.address)}">${i("copy")} ${a("contact.copyAddress")}</button>
            ${e.phone?r`<a class="btn btn-primary btn-sm" href="tel:${e.phone}">${i("phone")} ${a("contact.callNow")}</a>`:""}
            ${e.email?r`<a class="btn btn-ghost btn-sm" href="mailto:${e.email}">${i("mail")} ${a("contact.emailUs")}</a>`:""}
          </div>
          <div class="contact-list mt">
            ${e.phone?r`<div class="row"><span class="muted small">${a("contact.phone")}</span><a class="mono" href="tel:${e.phone}">${ot(e.phone)}</a></div>`:""}
            ${e.phone2?r`<div class="row"><span class="muted small">${a("contact.mobile")}</span><a class="mono" href="tel:${e.phone2}">${ot(e.phone2)}</a></div>`:""}
            ${e.phone3?r`<div class="row"><span class="muted small">${a("contact.phone3")}</span><a class="mono" href="tel:${e.phone3}">${ot(e.phone3)}</a></div>`:""}
            ${e.whatsapp?r`<div class="row"><span class="muted small">${a("contact.whatsapp")}</span><span class="mono">${ot(e.whatsapp)}</span></div>`:""}
            ${e.email?r`<div class="row"><span class="muted small">${a("common.email")}</span><span class="mono small">${h(e.email)}</span></div>`:""}
          </div>
          ${o.length?r`<div class="row row-wrap mt-s">${o.map(m=>r`<a class="btn btn-ghost btn-sm" href="${h(m.url)}" target="_blank" rel="noopener">${i(m.icon)} ${a("social."+m.key)}</a>`)}</div>`:""}
        </div>

        <div class="card mt">
          <h2 class="page-h2">${i("clock")} ${a("footer.workingHours")}</h2>
          ${(e.workingHours||[]).map(m=>r`
            <div class="row row-between mt-s">
              <span class="small">${h(q()?m.fa||m.day:m.en||m.day)}</span>
              <span class="small b mono">${h(q()?m.time:m.timeEn||m.time)}</span>
            </div>`)}
        </div>

        <form class="card mt" data-act="page-feedback">
          <input type="hidden" name="type" value="suggestion">
          <h2 class="page-h2">${i("chat")} ${a("contact.formTitle")}</h2>
          <p class="muted small mb-s">${a("contact.formText")}</p>
          ${E({label:a("common.title"),name:"title",required:!0})}
          ${X({label:a("common.message"),name:"body",required:!0,rows:5})}
          ${E({label:a("acc.feedbackContact"),name:"contact",value:((c=p.me)==null?void 0:c.phone)||((l=p.me)==null?void 0:l.email)||""})}
          <button class="btn btn-primary" type="submit">${i("send")} ${a("common.send")}</button>
        </form>
      </div>

      <aside class="col">
        ${Dt(s.instagram||n)||Dt(s.telegram)?r`
        <div class="card">
          <h2 class="page-h2">${i("globe")} ${a("contact.socials")}</h2>
          <p class="muted small">${a("contact.socialsDesc",{default:"\u0645\u0627 \u0631\u0627 \u062F\u0631 \u0634\u0628\u06A9\u0647\u200C\u0647\u0627\u06CC \u0627\u062C\u062A\u0645\u0627\u0639\u06CC \u062F\u0646\u0628\u0627\u0644 \u06A9\u0646\u06CC\u062F."})}</p>
          <div class="row row-wrap mt-s" style="gap: 12px;">
            ${Dt(s.instagram||n)?r`<a class="btn btn-outline btn-sm" href="${h(Dt(s.instagram||n))}" target="_blank" rel="noopener">${i("camera")} ${a("social.instagram")}</a>`:""}
            ${Dt(s.telegram)?r`<a class="btn btn-primary btn-sm" href="${h(Dt(s.telegram))}" target="_blank" rel="noopener">${i("send")} ${a("contact.tgBotBtn")}</a>`:""}
          </div>
        </div>`:""}

        <div class="card ${Dt(s.telegram)||Dt(s.instagram||n)?"mt":""}">
          <h2 class="page-h2">${i("map")} ${a("contact.mapTitle")}</h2>
          <div class="minimap" data-act="open-map" role="button" tabindex="0" aria-label="${a("contact.mapTitle")}">
            ${ct(ea())}
            <span class="minimap-hint">${i("pin")} ${a("contact.mapHint")}</span>
          </div>
          <p class="hint mt-s">${a("contact.mapAsk")}</p>
          <button class="btn btn-outline btn-block mt-s" data-act="open-map">${i("map")} ${a("contact.openMaps")}</button>
        </div>

        ${H("liveSupport")?r`
        <div class="card mt">
          <h2 class="page-h2">${i("headset")} ${a("common.support")}</h2>
          <p class="muted small">${a("acc.chatTitle")}</p>
          <div class="row row-wrap mt-s">
            ${p.me?r`<button class="btn btn-primary btn-sm" data-act="chat-open">${i("headset")} ${a("acc.chatTitle")}</button>`:r`<a class="btn btn-primary btn-sm" href="#/auth">${i("user")} ${a("nav.login")}</a>`}
            ${H("tickets")?r`<a class="btn btn-ghost btn-sm" href="#/account/tickets">${i("ticket")} ${a("common.ticket")}</a>`:""}
          </div>
        </div>`:""}

        <div class="card mt">
          <h2 class="page-h2">${i("info")} ${a("footer.faq")}</h2>
          <p class="muted small">${a("faq.askText")}</p>
          <a class="btn btn-ghost btn-sm mt-s" href="#/pages/faq">${a("footer.faq")}</a>
        </div>
      </aside>
    </div>`}function Zl(t){let e=[...new Set(t.map(s=>s.cat||"other"))];return r`
    <div class="page-hero mb">
      <h1 class="page-title">${i("info")} ${a("footer.faq")}</h1>
      <p class="page-sub">${a("faq.askText")}</p>
    </div>
    <div class="field mb">
      <input class="input" type="search" id="faq-q" placeholder="${a("faq.search")}" data-faq-q autocomplete="off">
    </div>
    <div class="row row-wrap mb" data-faq-cats>
      <button type="button" class="chip active" data-act="faq-cat" data-cat="">${a("faq.all")}</button>
      ${e.map(s=>r`<button type="button" class="chip" data-act="faq-cat" data-cat="${s}">${a(`faq.cat.${s}`)}</button>`)}
    </div>
    <p class="muted small mb-s" data-faq-count>${a("faq.results",{n:f(t.length)})}</p>
    <div class="accordion" data-faq-list>
      ${t.map((s,n)=>r`
        <div class="acc-item" data-cat="${s.cat||"other"}" data-text="${h(((q()?s.q:s.qEn)+" "+(q()?s.a:s.aEn)).toLowerCase())}">
          <button class="acc-h" type="button" aria-expanded="false">
            <span class="b">${h(q()?s.q:s.qEn||s.q)}</span>
            ${i("chevron-down")}
          </button>
          <div class="acc-b" hidden><div class="page-body"><p>${h(q()?s.a:s.aEn||s.a)}</p></div></div>
        </div>`)}
    </div>
    <div class="card mt t-center" data-faq-empty hidden>
      <p class="muted">${a("faq.notFound")}</p>
      <div class="row center row-wrap mt-s">
        ${p.me&&H("liveSupport")?r`<button class="btn btn-primary btn-sm" data-act="chat-open">${i("headset")} ${a("acc.chatTitle")}</button>`:""}
        ${H("tickets")?r`<a class="btn btn-ghost btn-sm" href="#/account/tickets">${i("ticket")} ${a("acc.ticketNew")}</a>`:""}
      </div>
    </div>`}function Tr(){var l,m;let t=document.querySelector("[data-faq-list]");if(!t)return;let e=(((l=document.querySelector("[data-faq-q]"))==null?void 0:l.value)||"").trim().toLowerCase(),s=((m=document.querySelector("[data-faq-cats] .chip.active"))==null?void 0:m.dataset.cat)||"",n=0;t.querySelectorAll(".acc-item").forEach(d=>{let u=!s||d.dataset.cat===s,b=!e||(d.dataset.text||"").includes(e),g=u&&b;d.hidden=!g,g&&(n+=1)});let o=document.querySelector("[data-faq-count]");o&&(o.textContent=a("faq.results",{n:f(n)}));let c=document.querySelector("[data-faq-empty]");c&&(c.hidden=n!==0)}function td(t,e){N(t),En(t);let s=t.querySelector("[data-faq-q]");if(s){let n=0;s.addEventListener("input",()=>{clearTimeout(n),n=setTimeout(Tr,160)})}return null}var ue,oa,ra,ed,Ar=V(()=>{U();G();tt();K();mt();J();bt();ue=(t,e)=>{var s,n,o;return q()?(s=t==null?void 0:t[e])!=null?s:"":(o=(n=t==null?void 0:t[`${e}En`])!=null?n:t==null?void 0:t[e])!=null?o:""},oa=(t,e)=>q()?(t==null?void 0:t[e])||[]:(t==null?void 0:t[`${e}En`])||(t==null?void 0:t[e])||[];ra=(t,e="dot-list")=>t!=null&&t.length?r`<ul class="${e}">${t.map(s=>r`<li>${typeof s=="string"?h(s):h(ue(s,"fa")||s.title||"")}</li>`)}</ul>`:"";y("page-feedback",async(t,e)=>{t.preventDefault();let s=new FormData(e);await D(e.querySelector("button[type=submit]"),async()=>{try{await v.post("/api/feedback",{type:s.get("type")||"suggestion",title:s.get("title"),body:s.get("body"),contact:s.get("contact")||""}),x(a("acc.feedbackSent")),e.reset()}catch(n){S(n)}})});y("faq-cat",(t,e)=>{e.closest("[data-faq-cats]").querySelectorAll(".chip").forEach(n=>n.classList.toggle("active",n===e)),Tr()});ed=()=>a("common.page")});var Dr={};Z(Dr,{mount:()=>nd,render:()=>ad});async function ad(){var n,o,c,l,m,d,u,b,g,$,w;let t=null;try{t=await v.get("/api/admin/overview")}catch(k){return W({title:(k==null?void 0:k.message)||a("err.generic")})}let e=t.stats||{},s=(t.chart||[]).map(k=>({label:k.date,short:k.date.slice(8),value:k.visits||0}));return Q("users.view")&&sd(),r`
    <div class="kpi-grid">
      ${It({label:a("adm.kpi.ordersToday"),value:f(((n=t.today)==null?void 0:n.orders)||0),sub:A(((o=t.today)==null?void 0:o.revenue)||0)})}
      ${It({label:a("adm.kpi.visits"),value:f(((c=t.today)==null?void 0:c.visits)||0),sub:`${a("stats.visitsTotal")}: ${f(e.visitsTotal||0)}`})}
      ${It({label:a("adm.kpi.revenueTotal"),value:A(((l=t.totals)==null?void 0:l.revenue)||0),sub:`${f(((m=t.totals)==null?void 0:m.orders)||0)} ${a("common.orders")}`})}
      ${It({label:a("adm.kpi.pending"),value:f(e.pendingOrders||0),sub:a("adm.awaiting.orders")})}
      ${It({label:a("adm.kpi.products"),value:f(e.products||0),sub:`${f(e.outOfStock||0)} ${a("stats.outOfStock")}`})}
      ${It({label:a("adm.kpi.users"),value:f(e.customers||0),sub:`${f(e.plusMembers||0)} ${a("stats.plusMembers")}`})}
      ${It({label:a("adm.kpi.lowStock"),value:f((t.lowStock||[]).length),sub:a("adm.lowStockList")})}
      ${It({label:a("adm.storage"),value:`${f(((d=t.storage)==null?void 0:d.sizeKb)||0)} KB`,sub:"db.json"})}
    </div>

    <div class="section-head mt"><div><h2 class="section-title">${i("alert")} ${a("adm.awaiting")}</h2></div></div>
    <div class="kpi-grid">
      ${Q("reviews.moderate")?Ra("star",a("adm.awaiting.reviews"),(u=t.awaiting)==null?void 0:u.reviews,"#/admin/reviews"):""}
      ${Q("tickets.manage")?Ra("ticket",a("adm.awaiting.tickets"),(b=t.awaiting)==null?void 0:b.tickets,"#/admin/tickets"):""}
      ${Q("orders.view")?Ra("package-check",a("adm.awaiting.orders"),(g=t.awaiting)==null?void 0:g.orders,"#/admin/orders"):""}
      ${Q("feedback.manage")?Ra("flag",a("adm.awaiting.feedback"),($=t.awaiting)==null?void 0:$.feedback,"#/admin/feedback"):""}
      ${Q("tickets.manage")?Ra("headset",a("adm.awaiting.chat"),(w=t.awaiting)==null?void 0:w.support,"#/admin/support"):""}
    </div>

    <div class="card mt">
      <strong>${i("chart")} ${a("adm.chart")}</strong>
      ${s.length?bs(s,{height:140}):r`<p class="muted small">${a("common.noData")}</p>`}
    </div>

    <div class="acc-grid acc-grid-eq mt">
      <div class="card">
        <strong>${i("star")} ${a("adm.topSelling")}</strong>
        ${dt([{label:""},{label:a("adm.pName")},{label:a("pdp.sold"),cls:"num"},{label:a("common.stock"),cls:"num"},{label:a("common.price"),cls:"num"}],(t.topSelling||[]).map(k=>r`
            <tr>
              <td><span class="cl-img" data-h="42px" data-w="42px">${Oe(Ut(pt({},k),{images:k.image?[k.image]:[]}))}</span></td>
              <td><a class="b" href="#/admin/products/${k.id}">${h((q(),k.name))}</a></td>
              <td class="num">${f(k.sold)}</td>
              <td class="num">${f(k.stock)}</td>
              <td class="num">${A(k.price)}</td>
            </tr>`),{emptyText:a("common.noData")})}
      </div>
      <div class="card">
        <strong>${i("box")} ${a("adm.lowStockList")}</strong>
        ${dt([{label:a("adm.pName")},{label:a("common.available"),cls:"num"},{label:""}],(t.lowStock||[]).map(k=>r`
            <tr>
              <td class="nowrap">${h(k.name)}</td>
              <td class="num"><span class="badge-pill ${k.inStock?"bp-warn":"bp-danger"}">${f(Math.max(0,(k.stock||0)-(k.reserved||0)))}</span></td>
              <td><a class="btn btn-ghost btn-xs" href="#/admin/products/${k.id}">${a("common.edit")}</a></td>
            </tr>`),{emptyText:a("common.noData")})}
      </div>
    </div>

    ${Q("users.view")||Q("settings.edit")?r`
    <div class="acc-grid acc-grid-eq mt">
      ${Q("users.view")?r`
      <div class="card" id="secLiveCard">
        <div class="row row-between">
          <strong>${i("shield")} ${a("adm.secTitle")}</strong>
          <span class="badge-pill bp-success tiny" id="secState">…</span>
        </div>
        <div class="kpi-grid mt-s" id="secKpis"></div>
        <div class="mt-s" id="secTop"></div>
        ${Q("settings.edit")?r`
        <form class="form-grid mt" id="secForm" data-act="adm-sec-save">
          ${$t({label:a("adm.secQueueEnabled"),desc:a("adm.secQueueDesc"),name:"queueEnabled",checked:!0})}
          ${E({label:a("adm.secMaxConc"),name:"maxConcurrent",type:"number",value:"80",attrs:'min="5" max="5000" inputmode="numeric"'})}
          ${E({label:a("adm.secTriggerRps"),name:"triggerRps",type:"number",value:"40",attrs:'min="5" max="2000" inputmode="numeric"'})}
          ${E({label:a("adm.secPassTtl"),name:"passTtlMin",type:"number",value:"30",attrs:'min="5" max="240" inputmode="numeric"'})}
          ${E({label:a("adm.secPoll"),name:"pollSec",type:"number",value:"4",attrs:'min="2" max="20" inputmode="numeric"'})}
          ${E({label:a("adm.secFloodBan"),name:"floodBanPerMin",type:"number",value:"2500",attrs:'min="500" max="100000" inputmode="numeric"'})}
          ${E({label:a("adm.secFloodMin"),name:"floodBanMin",type:"number",value:"15",attrs:'min="1" max="1440" inputmode="numeric"'})}
          <button class="btn btn-primary btn-sm span-2" type="submit">${i("save")} ${a("common.save")}</button>
        </form>`:""}
      </div>`:""}
      ${Q("settings.edit")?r`
      <div class="card">
        <strong>${i("terminal")} ${a("adm.console")}</strong>
        <p class="muted small mt-s">${a("adm.consoleHint")}</p>
        <button class="btn btn-danger btn-sm mt-s" data-act="adm-sys-restart">${i("zap")} ${a("adm.sysRestart")}</button>
        <p class="muted small mt">${a("adm.sysResetLabel")}</p>
        <div class="row row-wrap mt-s">
          <button class="btn btn-ghost btn-xs" data-act="adm-sys-reset" data-what="audit">${a("adm.sysReset.audit")}</button>
          <button class="btn btn-ghost btn-xs" data-act="adm-sys-reset" data-what="carts">${a("adm.sysReset.carts")}</button>
          <button class="btn btn-ghost btn-xs" data-act="adm-sys-reset" data-what="visits">${a("adm.sysReset.visits")}</button>
          <button class="btn btn-ghost btn-xs" data-act="adm-sys-reset" data-what="visitors">${a("adm.sysReset.visitors")}</button>
        </div>
      </div>`:""}
    </div>`:""}

    ${Q("audit.view")?r`
    <div class="card mt">
      <div class="row row-between">
        <strong>${i("history")} ${a("adm.recentAudit")}</strong>
        <a class="section-link" href="#/admin/audit">${a("common.showAll")}</a>
      </div>
      ${dt([{label:a("common.date")},{label:a("adm.auditActor")},{label:a("adm.auditAction")},{label:a("adm.auditTarget")}],(t.recentAudit||[]).map(k=>r`
          <tr>
            <td class="nowrap tiny">${xt(k.at)}</td>
            <td class="tiny">${h(k.actorName||"")} <span class="muted">(${h(k.actorRole||"")})</span></td>
            <td class="mono tiny">${h(k.action||"")}</td>
            <td class="tiny muted">${h(String(k.target||"").slice(0,40))}</td>
          </tr>`),{emptyText:a("common.noData")})}
    </div>`:""}`}function Ra(t,e,s,n){return r`
    <a class="kpi await-card ${s>0?"hot":""}" href="${n}">
      <div class="l">${i(t)} ${e}</div>
      <div class="v">${f(s||0)}</div>
    </a>`}async function Yn(){var l,m,d,u;if(!document.getElementById("secLiveCard")){++Vn>=3&&ca&&(clearInterval(ca),ca=0);return}Vn=0;let e;try{e=await v.get("/api/admin/system/load")}catch(b){return}let s=document.getElementById("secKpis");s&&(s.innerHTML=[`<div class="kpi"><div class="l">${a("adm.secInflight")}</div><div class="v">${f(e.inflight)}</div></div>`,`<div class="kpi"><div class="l">${a("adm.secRps")}</div><div class="v">${f(e.rps)}</div></div>`,`<div class="kpi"><div class="l">${a("adm.secQueued")}</div><div class="v ${e.queued>0?"hot":""}">${f(e.queued)}</div></div>`,`<div class="kpi"><div class="l">${a("adm.secAutoBans")}</div><div class="v">${f((e.autoBans||[]).length)}</div></div>`].join(""));let n=document.getElementById("secTop");n&&(n.innerHTML=(e.top||[]).length?`<div class="muted tiny">${a("adm.secTop")}</div><div class="table-wrap"><table class="table"><thead><tr><th>IP</th><th class="num">${a("adm.secPerMin")}</th></tr></thead><tbody>${e.top.map(b=>`<tr><td class="mono tiny">${h(b.ip)}</td><td class="num tiny">${f(b.perMin)}</td></tr>`).join("")}</tbody></table></div>`:`<p class="muted tiny">${a("adm.secTopEmpty")}</p>`);let o=document.getElementById("secState");if(o){let b=e.queued>0||e.inflight>(((l=e.sec)==null?void 0:l.maxConcurrent)||80)||e.rps>(((m=e.sec)==null?void 0:m.triggerRps)||40);o.textContent=b?a("adm.secBusy"):a("adm.secNormal"),o.className=`badge-pill tiny ${b?"bp-warn":"bp-success"}`}let c=document.getElementById("secForm");if(c&&!c.dataset.filled){c.dataset.filled="1";for(let g of["maxConcurrent","triggerRps","passTtlMin","pollSec","floodBanPerMin","floodBanMin"]){let $=c.elements[g];$&&((d=e.sec)==null?void 0:d[g])!=null&&($.value=e.sec[g])}let b=c.elements.queueEnabled;b&&(b.checked=!!((u=e.sec)!=null&&u.queueEnabled))}}function sd(){ca&&clearInterval(ca),Vn=0,setTimeout(Yn,400),ca=setInterval(Yn,5e3)}function nd(){return null}var ca,Vn,Pr=V(()=>{U();G();tt();bt();K();mt();J();ca=0,Vn=0;y("adm-sec-save",async(t,e)=>{var n,o,c,l,m,d,u,b;t.preventDefault();let s={queueEnabled:(o=(n=e.elements.queueEnabled)==null?void 0:n.checked)!=null?o:!0,maxConcurrent:Number((c=e.elements.maxConcurrent)==null?void 0:c.value)||80,triggerRps:Number((l=e.elements.triggerRps)==null?void 0:l.value)||40,passTtlMin:Number((m=e.elements.passTtlMin)==null?void 0:m.value)||30,pollSec:Number((d=e.elements.pollSec)==null?void 0:d.value)||4,floodBanPerMin:Number((u=e.elements.floodBanPerMin)==null?void 0:u.value)||2500,floodBanMin:Number((b=e.elements.floodBanMin)==null?void 0:b.value)||15};await D(e.querySelector("button[type=submit]"),async()=>{try{await v.patch("/api/admin/settings/security",{value:s}),x(a("adm.secSaved"));let g=document.getElementById("secForm");g&&delete g.dataset.filled,Yn()}catch(g){S(g)}})});y("adm-sys-restart",async(t,e)=>{await kt({text:a("adm.sysRestartWarn"),danger:!0})&&await D(e,async()=>{try{await v.post("/api/admin/system/restart",{}),x(a("adm.sysRestarting")),setTimeout(()=>location.reload(),6e3)}catch(n){S(n)}})});y("adm-sys-reset",async(t,e)=>{let s=e.dataset.what;await kt({text:a(`adm.resetWarn.${s}`),danger:!0})&&await D(e,async()=>{try{await v.post("/api/admin/system/reset",{what:s}),x(a("adm.resetDone"))}catch(o){S(o)}})})});var Nr={};Z(Nr,{mount:()=>ld,render:()=>od});async function od(t){let e=t.params.id;if(e==="new")return Mr(null);if(e){let s=null;try{s=await v.get(`/api/admin/products/${e}`)}catch(n){return W({title:(n==null?void 0:n.message)||a("err.notFound")})}return Mr(s.product)}return rd()}async function rd(){let t=null;try{t=await v.get(v.url("/api/admin/products",{q:Lt.q,cat:Lt.cat,brand:Lt.brand,status:Lt.status,page:Lt.page,limit:Lt.limit}))}catch(n){return W({title:(n==null?void 0:n.message)||a("err.generic")})}let e=t.items||[],s=n=>`#/admin/products?page=${n}`;return r`
    <div class="row row-between row-wrap mb">
      <div>
        <h2 class="section-title">${i("box")} ${a("adm.products")}</h2>
        <p class="muted small">${f(t.total||0)} ${a("catalog.count")}</p>
      </div>
      ${Q("products.create")?r`<a class="btn btn-primary btn-sm" href="#/admin/products/new">${i("plus")} ${a("adm.productNew")}</a>`:""}
    </div>

    <form class="card mb adm-filter" data-act="adm-p-filter">
      <div class="form-grid">
        <label class="field"><span class="label">${a("common.search")}</span>
          <input class="input" name="q" value="${h(Lt.q)}" placeholder="${a("adm.pName")} / SKU / ${a("pdp.barcode")}">
        </label>
        ${z({label:a("adm.pCat"),name:"cat",value:Lt.cat,options:[{value:"",label:a("common.all")},...p.categories.map(n=>({value:n.id,label:qt(n)}))]})}
        ${z({label:a("adm.pBrand"),name:"brand",value:Lt.brand,options:[{value:"",label:a("common.all")},...p.brands.map(n=>({value:n.id,label:Gt(n)}))]})}
        ${z({label:a("common.status"),name:"status",value:Lt.status,options:[{value:"",label:a("common.all")},{value:"active",label:a("common.active")},{value:"inactive",label:a("common.inactive")},{value:"low",label:a("adm.kpi.lowStock")},{value:"out",label:a("card.outOfStock")}]})}
      </div>
      <div class="row row-wrap mt-s">
        <button class="btn btn-primary btn-sm" type="submit">${i("filter")} ${a("common.apply")}</button>
        <button class="btn btn-ghost btn-sm" type="button" data-act="adm-p-clear">${i("close")} ${a("catalog.f.clear")}</button>
      </div>
    </form>

    ${e.length?dt([{label:""},{label:a("adm.pName")},{label:a("adm.pCat")},{label:a("common.price"),cls:"num"},{label:a("common.stock"),cls:"num"},{label:a("pdp.sold"),cls:"num"},{label:a("common.status")},{label:a("common.actions"),cls:"num"}],e.map(n=>r`
        <tr>
          <td><span class="cl-img" data-h="46px" data-w="46px">${Oe(n)}</span></td>
          <td>
            <a class="b" href="#/admin/products/${n.id}">${h(q()?n.name:n.nameEn||n.name)}</a>
            <div class="tiny muted mono">${h(n.sku||"")}${n.barcode?` \xB7 ${h(n.barcode)}`:""}</div>
          </td>
          <td class="tiny">${h(n.categoryName||"")}<div class="tiny muted">${h(n.brandName||"")}</div></td>
          <td class="num">
            ${A(n.price)}
            ${n.oldPrice>n.price?r`<div class="tiny muted"><s>${f(n.oldPrice)}</s> <span class="badge-pill bp-danger">${f(n.discountPct)}٪</span></div>`:""}
          </td>
          <td class="num"><span class="badge-pill ${n.inStock?n.stock<=3?"bp-warn":"bp-success":"bp-danger"}">${f(Math.max(0,(n.stock||0)-(n.reserved||0)))}</span></td>
          <td class="num">${f(n.sold||0)}</td>
          <td>${n.active===!1?r`<span class="badge-pill bp-muted">${a("common.inactive")}</span>`:r`<span class="badge-pill bp-success">${a("common.active")}</span>`}</td>
          <td>
            <div class="act">
              <a class="btn btn-ghost btn-xs" href="#/admin/products/${n.id}">${i("edit")}</a>
              <a class="btn btn-ghost btn-xs" href="#/product/${n.id}" target="_blank" rel="noopener">${i("external")}</a>
              <button class="btn btn-ghost btn-xs" data-act="adm-p-igpack" data-id="${n.id}" title="${a("adm.igPack")}">${i("camera")}</button>
              ${Q("products.delete")?r`<button class="btn btn-ghost btn-xs" data-act="adm-p-del" data-id="${n.id}" data-name="${h(n.name)}">${i("trash")}</button>`:""}
            </div>
          </td>
        </tr>`)):L({icon:"box",title:a("common.noResult"),action:Q("products.create")?{href:"#/admin/products/new",label:a("adm.productNew")}:null})}

    <div class="mt" data-page="${t.page}" data-pages="${t.pages}">${me(t.page||1,t.pages||1,s)}</div>`}function Mr(t){var s,n,o,c,l,m;let e=!t;return yt.images=[...(t==null?void 0:t.images)||[]],yt.specs=Object.entries((t==null?void 0:t.specs)||{}).map(([d,u])=>({key:d,value:u})),yt.tags=[...(t==null?void 0:t.tags)||[]],r`
    <div class="row row-between row-wrap mb">
      <h2 class="section-title">${i(e?"plus":"edit")} ${e?a("adm.productNew"):a("adm.productEdit")}</h2>
      <div class="row row-wrap">
        <a class="btn btn-ghost btn-sm" href="#/admin/products">${i("arrow-right")} ${a("adm.products")}</a>
        ${e?"":r`<a class="btn btn-ghost btn-sm" href="#/product/${t.id}" target="_blank" rel="noopener">${i("external")} ${a("common.view")}</a>`}
      </div>
    </div>

    <form data-act="adm-p-save" data-id="${(t==null?void 0:t.id)||""}">
      <div class="card">
        <div class="form-grid">
          ${E({label:a("adm.pName"),name:"name",required:!0,value:(t==null?void 0:t.name)||""})}
          ${E({label:a("adm.pNameEn"),name:"nameEn",value:(t==null?void 0:t.nameEn)||""})}
          ${z({label:a("adm.pCat"),name:"categoryId",value:(t==null?void 0:t.categoryId)||"",options:p.categories.map(d=>({value:d.id,label:qt(d)}))})}
          ${z({label:a("adm.pBrand"),name:"brandId",value:(t==null?void 0:t.brandId)||"",options:p.brands.map(d=>({value:d.id,label:Gt(d)}))})}
          ${E({label:a("adm.pSku"),name:"sku",value:(t==null?void 0:t.sku)||"",hint:q()?"\u062E\u0627\u0644\u06CC \u0628\u06AF\u0630\u0627\u0631\u06CC \u062E\u0648\u062F\u06A9\u0627\u0631 \u0633\u0627\u062E\u062A\u0647 \u0645\u06CC\u200C\u0634\u0648\u062F":"Leave empty to auto-generate"})}
          ${E({label:a("adm.pBarcode"),name:"barcode",value:(t==null?void 0:t.barcode)||"",attrs:'inputmode="numeric"'})}
          ${E({label:a("adm.pPrice"),name:"price",type:"number",required:!0,value:(s=t==null?void 0:t.price)!=null?s:""})}
          ${E({label:a("adm.pOldPrice"),name:"oldPrice",type:"number",value:(n=t==null?void 0:t.oldPrice)!=null?n:0})}
          ${E({label:a("adm.pCost"),name:"cost",type:"number",value:(o=t==null?void 0:t.cost)!=null?o:0})}
          ${E({label:a("adm.pStock"),name:"stock",type:"number",required:!0,value:(c=t==null?void 0:t.stock)!=null?c:1})}
          ${E({label:a("adm.pWeight"),name:"weight",type:"number",value:(l=t==null?void 0:t.weight)!=null?l:0})}
          ${E({label:a("adm.pWarranty"),name:"warrantyMonths",type:"number",value:(m=t==null?void 0:t.warrantyMonths)!=null?m:0})}
          ${z({label:a("adm.pAuth"),name:"authenticity",value:(t==null?void 0:t.authenticity)||"generic",options:["original","highcopy","generic"].map(d=>({value:d,label:a(`auth.${d}`)}))})}
        </div>
        ${!e&&Q("barcode.print")?r`
          <div class="row row-wrap mt-s">
            <button type="button" class="btn btn-ghost btn-sm" data-act="adm-p-barcode" data-id="${t.id}">${i("barcode")} ${a("adm.bGenerate")}</button>
            ${t.barcode?r`<code class="tag mono">${t.barcode}</code>`:""}
          </div>`:""}
      </div>

      <div class="card mt">
        <strong>${i("file")} ${a("pdp.description")}</strong>
        <div class="mt-s">${X({label:"\u0641\u0627\u0631\u0633\u06CC",name:"description",value:(t==null?void 0:t.description)||"",rows:5})}</div>
        ${X({label:"English",name:"descriptionEn",value:(t==null?void 0:t.descriptionEn)||"",rows:4})}
      </div>

      <div class="card mt">
        <div class="row row-between row-wrap">
          <strong>${i("image")} ${a("adm.pImages")} (${f(yt.images.length)}/8)</strong>
          <div class="row row-wrap">
            ${Q("products.create")?r`<button type="button" class="btn btn-ghost btn-sm" data-act="adm-p-find" data-name="${h((t==null?void 0:t.nameEn)||(t==null?void 0:t.name)||"")}">${i("search")} ${a("adm.pFindImage")}</button>`:""}
            <label class="btn btn-ghost btn-sm" for="adm-p-file">${i("upload")} ${a("adm.pUpload")}</label>
            <input id="adm-p-file" type="file" accept="image/*" multiple hidden data-img-input>
          </div>
        </div>
        <div class="img-list mt-s" data-img-list>${Ba()}</div>
        <div class="mt">
          ${X({label:a("adm.pVideos"),name:"videos",value:((t==null?void 0:t.videos)||[]).join(`
`),rows:2,hint:a("adm.pVideosHint")})}
        </div>
      </div>

      <div class="card mt">
        <div class="row row-between">
          <strong>${i("list")} ${a("adm.pSpecs")}</strong>
          <button type="button" class="btn btn-ghost btn-sm" data-act="adm-p-spec-add">${i("plus")} ${a("adm.pAddSpec")}</button>
        </div>
        <div class="mt-s" data-spec-list>${Gn()}</div>
      </div>

      <div class="card mt">
        <strong>${i("tag")} ${a("adm.pTags")}</strong>
        <div class="mt-s" data-tag-list>${Kn()}</div>
        <div class="row mt-s">
          <input class="input" data-tag-input placeholder="${q()?"\u0628\u0631\u0686\u0633\u0628 \u062C\u062F\u06CC\u062F \u0648 Enter":"New tag and Enter"}" maxlength="30">
          <button type="button" class="btn btn-ghost btn-sm" data-act="adm-p-tag-add">${i("plus")}</button>
        </div>
      </div>

      <div class="card mt">
        ${$t({label:a("adm.pFeatured"),name:"featured",checked:!!(t!=null&&t.featured)})}
        ${$t({label:a("adm.pActive"),name:"active",checked:t?t.active!==!1:!0})}
      </div>

      <div class="row row-wrap mt">
        <button class="btn btn-primary" type="submit">${i("save")} ${a("common.save")}</button>
        <a class="btn btn-ghost" href="#/admin/products">${a("common.cancel")}</a>
      </div>
    </form>`}function Ba(){return yt.images.length?yt.images.map((t,e)=>r`
    <span class="img-item">
      <img src="${t}" alt="${a("img.alt")}" loading="lazy">
      <span class="img-tools">
        ${e>0?r`<button type="button" data-act="adm-img-up" data-i="${e}" title="${a("common.prev")}">${i("arrow-up")}</button>`:""}
        <button type="button" data-act="adm-img-del" data-i="${e}" title="${a("common.delete")}">${i("trash")}</button>
      </span>
      ${e===0?r`<span class="img-main">${a("common.image")} ۱</span>`:""}
    </span>`).join(""):r`<p class="muted small">${a("adm.pFindEmpty")}</p>`}function Gn(){return yt.specs.length?yt.specs.map((t,e)=>r`
    <div class="spec-row">
      <input class="input" value="${h(t.key)}" placeholder="${a("adm.pSpecKey")}" data-spec-k="${e}" maxlength="40">
      <input class="input" value="${h(t.value)}" placeholder="${a("adm.pSpecVal")}" data-spec-v="${e}" maxlength="120">
      <button type="button" class="btn btn-ghost btn-icon btn-sm" data-act="adm-spec-del" data-i="${e}">${i("trash")}</button>
    </div>`).join(""):r`<p class="muted small">${a("common.empty")}</p>`}function Kn(){return yt.tags.length?r`<div class="row row-wrap">${yt.tags.map((t,e)=>r`
    <span class="chip">${h(t)}<button type="button" data-act="adm-tag-del" data-i="${e}" aria-label="${a("common.delete")}">${i("close")}</button></span>`)}</div>`:r`<p class="muted small">${a("common.empty")}</p>`}function Pe(t,e,s){let n=(t||document).querySelector(e);n&&(n.innerHTML=s),N(n||document)}function id(t){let e=Zt(),s=q()?t.name:t.nameEn||t.name,n=u=>Number(u||0).toLocaleString(q()?"fa-IR":"en-US"),o=Number(t.oldPrice||0),c=Math.max(0,(t.stock||0)-(t.reserved||0)),l=`${location.origin}/#/product/${t.id}`,m=String(q()?t.description||"":t.descriptionEn||t.description||"").split(`
`)[0].trim().slice(0,160);return(q()?[`\u2728 ${s} \u2728`,m,"",`\u{1F4B0} \u0642\u06CC\u0645\u062A: ${n(t.price)} \u062A\u0648\u0645\u0627\u0646${o>t.price?` (\u0628\u0647\u200C\u062C\u0627\u06CC ${n(o)} \u2014 ${f(t.discountPct||0)}\u066A \u062A\u062E\u0641\u06CC\u0641)`:""}`,c>0?"\u{1F4E6} \u0645\u0648\u062C\u0648\u062F \u062F\u0631 \u0627\u0646\u0628\u0627\u0631 \u2014 \u0647\u0645\u06CC\u0646 \u062D\u0627\u0644\u0627 \u0633\u0641\u0627\u0631\u0634 \u0628\u062F\u0647":"\u{1F4E6} \u0641\u0639\u0644\u0627\u064B \u0646\u0627\u0645\u0648\u062C\u0648\u062F\u061B \u067E\u06CC\u0627\u0645 \u0628\u062F\u0647 \u062A\u0627 \u0645\u0648\u062C\u0648\u062F \u0634\u062F \u062E\u0628\u0631\u062A \u06A9\u0646\u06CC\u0645","\u{1F6E1} \u0636\u0645\u0627\u0646\u062A \u0627\u0635\u0627\u0644\u062A \u06A9\u0627\u0644\u0627 + \u0645\u0647\u0644\u062A \u062A\u0633\u062A \u0648 \u0645\u0631\u062C\u0648\u0639 \u062A\u0627 \u06F7 \u0631\u0648\u0632","\u{1F69A} \u0627\u0631\u0633\u0627\u0644 \u0627\u0632 \u062A\u0647\u0631\u0627\u0646 \u0628\u0647 \u0633\u0631\u0627\u0633\u0631 \u0627\u06CC\u0631\u0627\u0646","",`\u{1F517} \u0633\u0641\u0627\u0631\u0634 \u0622\u0646\u0644\u0627\u06CC\u0646: ${l}`,`\u{1F4DE} \u062A\u0644\u0641\u0646: ${e.phone||""} \xB7 \u{1F34F} \u0627\u06CC\u0646\u0633\u062A\u0627\u06AF\u0631\u0627\u0645: @jam.yassaei`]:[`\u2728 ${s} \u2728`,m,"",`\u{1F4B0} Price: ${n(t.price)} Toman${o>t.price?` (was ${n(o)})`:""}`,"\u{1F6E1} Authenticity guarantee + 7-day return",`\u{1F517} Order: ${l}`,`\u{1F4DE} ${e.phone||""}`]).filter((u,b,g)=>!(u===""&&(g[b-1]===""||b===0))).join(`
`)}function cd(t){let e=q()?["\u06CC\u0627\u0633\u0627\u06CC\u06CC","\u0644\u0648\u0627\u0632\u0645_\u0627\u0644\u06A9\u062A\u0631\u0648\u0646\u06CC\u06A9","\u0642\u0637\u0639\u0627\u062A","\u062A\u0647\u0631\u0627\u0646","\u0646\u0627\u0631\u0645\u06A9","\u062E\u0631\u06CC\u062F_\u0622\u0646\u0644\u0627\u06CC\u0646"]:["Yassaei","Electronics","Parts","Tehran","OnlineShopping"],s=[t.brandName,t.categoryName].filter(Boolean).map(n=>String(n).trim().replace(/\s+/g,"_"));return[...new Set([...e,...s])].map(n=>`#${n}`).join(" ")}async function Lr(t,e,s){t&&(t.innerHTML=Ca(a("adm.pFindSearching")));try{let o=(await v.post("/api/admin/find-image",{query:e,lang:s})).items||[];t&&(t.innerHTML=o.length?r`<div class="find-grid">${o.map((c,l)=>r`
        <div class="find-item">
          <img src="/api/admin/image-thumb?url=${encodeURIComponent(c.thumbnail||c.url)}" alt="${h(c.title||"")}" loading="lazy">
          <div class="find-meta">
            <div class="tiny b">${h((c.title||"").slice(0,60))}</div>
            <div class="tiny muted">${h(c.license||"")} · ${h(c.source||"")}${c.creator?` \xB7 ${h(c.creator)}`:""}</div>
          </div>
          <button type="button" class="btn btn-primary btn-xs" data-act="adm-find-use" data-url="${h(c.url)}">${a("adm.pUseImage")}</button>
        </div>`).join("")}</div>`:L({icon:"image",title:a("adm.pFindEmpty")}))}catch(n){t&&(t.innerHTML=r`<p class="notice notice-danger">${i("alert")}<span>${h((n==null?void 0:n.message)||a("err.network"))}</span></p>`)}}function ld(t){N(t);let e=t.querySelector("[data-img-input]");e&&e.addEventListener("change",async()=>{let n=[...e.files||[]].slice(0,8-yt.images.length);e.value="";for(let o of n){if(o.size>4*1024*1024){lt(`${a("err.tooLarge")}: ${o.name}`,{type:"warn"});continue}try{let c=await Ie(o),l=await v.upload(c);l.url&&yt.images.push(l.url)}catch(c){S(c)}}Pe(t,"[data-img-list]",Ba())});let s=t.querySelector("[data-tag-input]");return s&&s.addEventListener("keydown",n=>{var o;n.key==="Enter"&&(n.preventDefault(),(o=document.querySelector('[data-act="adm-p-tag-add"]'))==null||o.click())}),t.querySelectorAll(".pagination .pg").forEach(n=>{n.addEventListener("click",o=>{let c=/page=(\d+)/.exec(n.getAttribute("href")||"");if(!c)return;o.preventDefault();let l=Number(c[1]);l>=1&&(Lt.page=l,T(!0))})}),null}var Lt,yt,Ir=V(()=>{U();G();tt();K();mt();J();bt();at();Lt={q:"",cat:"",brand:"",status:"",page:1,limit:25},yt={images:[],specs:[],tags:[]};y("adm-p-filter",(t,e)=>{t.preventDefault();let s=new FormData(e);Lt.q=String(s.get("q")||"").trim(),Lt.cat=String(s.get("cat")||""),Lt.brand=String(s.get("brand")||""),Lt.status=String(s.get("status")||""),Lt.page=1,T(!0)});y("adm-p-clear",()=>{Object.assign(Lt,{q:"",cat:"",brand:"",status:"",page:1}),T(!0)});y("adm-p-del",async(t,e)=>{if(await Kt(e.dataset.name))try{await v.del(`/api/admin/products/${e.dataset.id}`),x(a("adm.pDeleted")),T(!0)}catch(n){S(n)}});y("adm-img-del",(t,e)=>{yt.images.splice(Number(e.dataset.i),1),Pe(null,"[data-img-list]",Ba())});y("adm-img-up",(t,e)=>{let s=Number(e.dataset.i),[n]=yt.images.splice(s,1);yt.images.splice(s-1,0,n),Pe(null,"[data-img-list]",Ba())});y("adm-p-spec-add",()=>{yt.specs.push({key:"",value:""}),Pe(null,"[data-spec-list]",Gn())});y("adm-spec-del",(t,e)=>{yt.specs.splice(Number(e.dataset.i),1),Pe(null,"[data-spec-list]",Gn())});y("adm-p-tag-add",()=>{let t=document.querySelector("[data-tag-input]"),e=String((t==null?void 0:t.value)||"").trim();e&&(!yt.tags.includes(e)&&yt.tags.length<20&&yt.tags.push(e),t&&(t.value=""),Pe(null,"[data-tag-list]",Kn()))});y("adm-tag-del",(t,e)=>{yt.tags.splice(Number(e.dataset.i),1),Pe(null,"[data-tag-list]",Kn())});y("adm-p-barcode",async(t,e)=>{await D(e,async()=>{var s,n,o;try{let c=await v.post("/api/admin/barcode/generate",{productId:e.dataset.id,count:1}),l=((n=(s=c.codes)==null?void 0:s[0])==null?void 0:n.barcode)||((o=c.codes)==null?void 0:o[0])||"";if(l){let m=document.querySelector("[name=barcode]");m&&(m.value=l),x(a("adm.bGenerated"))}}catch(c){S(c)}})});y("adm-p-igpack",async(t,e)=>{let s=null;try{s=(await v.get(`/api/admin/products/${e.dataset.id}`)).product}catch(o){S(o);return}let n=(s.images||[])[0]||"";ut({title:`${i("camera")} ${a("adm.igPack")}`,subtitle:q()?s.name:s.nameEn||s.name,body:r`
      ${n?r`
        <div class="row row-wrap mb">
          <img class="igpack-img" src="${h(n)}" alt="">
          <div class="grow">
            <p class="small muted">${a("adm.igImgHint")}</p>
            <a class="btn btn-ghost btn-sm mt-s" href="${h(n)}" download="yassaei-${h(s.sku||s.id)}.jpg" target="_blank" rel="noopener">${i("download")} ${a("adm.igDl")}</a>
          </div>
        </div>`:r`<p class="notice notice-warn mb">${i("info")}<span>${a("adm.igNoImg")}</span></p>`}
      ${X({label:a("adm.igCap"),name:"igcap",rows:10,value:id(s)})}
      ${X({label:a("adm.igTags"),name:"igtags",rows:2,value:cd(s)})}
      <div class="row row-wrap mt-s">
        <button type="button" class="btn btn-primary btn-sm" data-act="adm-ig-copy" data-what="cap">${i("copy")} ${a("adm.igCopyCap")}</button>
        <button type="button" class="btn btn-ghost btn-sm" data-act="adm-ig-copy" data-what="tags">${i("copy")} ${a("adm.igCopyTags")}</button>
        <button type="button" class="btn btn-ghost btn-sm" data-act="adm-ig-copy" data-what="all">${i("copy")} ${a("adm.igCopyAll")}</button>
      </div>`})});y("adm-ig-copy",async(t,e)=>{var l,m;let s=e.closest(".modal"),n=((l=s==null?void 0:s.querySelector("[name=igcap]"))==null?void 0:l.value)||"",o=((m=s==null?void 0:s.querySelector("[name=igtags]"))==null?void 0:m.value)||"",c=e.dataset.what==="tags"?o:e.dataset.what==="all"?`${n}

${o}`:n;try{await en(c),x(a("common.copied"),{timeout:1800})}catch(d){S(new Error(a("err.generic")))}});y("adm-p-save",async(t,e)=>{var l;t.preventDefault();let s=new FormData(e),n={};e.querySelectorAll("[data-spec-k]").forEach(m=>{let d=m.dataset.specK,u=e.querySelector(`[data-spec-v="${d}"]`),b=String(m.value||"").trim();b&&(n[b]=String((u==null?void 0:u.value)||"").trim())});let o=e.dataset.id,c={name:s.get("name"),nameEn:s.get("nameEn")||"",categoryId:s.get("categoryId")||"",brandId:s.get("brandId")||"",sku:s.get("sku")||"",barcode:s.get("barcode")||"",price:Number(s.get("price")||0),oldPrice:Number(s.get("oldPrice")||0),cost:Number(s.get("cost")||0),stock:Number(s.get("stock")||0),weight:Number(s.get("weight")||0),warrantyMonths:Number(s.get("warrantyMonths")||0),authenticity:s.get("authenticity")||"generic",description:s.get("description")||"",descriptionEn:s.get("descriptionEn")||"",images:yt.images.slice(0,8),videos:String(((l=e.videos)==null?void 0:l.value)||"").split(/\n+/).map(m=>m.trim()).filter(Boolean).slice(0,4),specs:n,tags:yt.tags.slice(0,20),featured:s.get("featured")==="on",active:s.get("active")==="on"};await D(e.querySelector("button[type=submit]"),async()=>{var m;try{if(o)await v.patch(`/api/admin/products/${o}`,c),x(a("adm.pSaved"));else{let d=await v.post("/api/admin/products",c);if(x(a("adm.pCreated")),(m=d.product)!=null&&m.id){ht(`#/admin/products/${d.product.id}`);return}}T(!0)}catch(d){S(d)}})});y("adm-p-find",(t,e)=>{let s=ut({title:a("adm.pFindImage"),size:"lg",body:r`
      <form data-act="adm-find-run" class="row row-wrap mb">
        <input class="input grow" name="query" value="${h(e.dataset.name||"")}" placeholder="${a("adm.pName")}" required>
        <select class="select" name="lang" data-w="110px">
          <option value="en">English</option>
          <option value="fa">فارسی</option>
        </select>
        <button class="btn btn-primary" type="submit">${i("search")} ${a("common.search")}</button>
      </form>
      <p class="hint mb-s">${a("adm.pFindImageHint")}</p>
      <div data-find-results>${Ca(a("adm.pFindSearching"))}</div>`,onMount:n=>{var c;(c=n.querySelector("[name=query]"))==null||c.focus(),n.dataset.findBox="1";let o=e.dataset.name||"";o&&Lr(n.querySelector("[data-find-results]"),o,"en")}})});y("adm-find-run",(t,e)=>{t.preventDefault();let s=new FormData(e),n=e.closest(".modal");Lr(n==null?void 0:n.querySelector("[data-find-results]"),String(s.get("query")||""),String(s.get("lang")||"en"))});y("adm-find-use",async(t,e)=>{await D(e,async()=>{var s,n;try{let o=await v.post("/api/admin/fetch-image",{url:e.dataset.url});o.url&&!yt.images.includes(o.url)&&yt.images.length<8&&yt.images.push(o.url),Pe(null,"[data-img-list]",Ba()),x(a("adm.pSaved")),(n=(s=e.closest(".overlay"))==null?void 0:s.querySelector("[data-lx]"))==null||n.click()}catch(o){S(o)}})})});var Hr={};Z(Hr,{mount:()=>pd,render:()=>dd});async function dd(){let t=null;try{t=await v.get("/api/admin/categories")}catch(e){return W({title:(e==null?void 0:e.message)||a("err.generic")})}return Ve=t.items||[],Ds=t.brands||[],r`
    <div class="row row-between row-wrap mb">
      <h2 class="section-title">${i("layers")} ${a("adm.categories")}</h2>
      <div class="row row-wrap">
        <button class="btn btn-primary btn-sm" data-act="adm-cat-new">${i("plus")} ${a("common.category")}</button>
        <button class="btn btn-outline btn-sm" data-act="adm-brand-new">${i("plus")} ${a("common.brand")}</button>
      </div>
    </div>

    <div class="card">
      <strong>${i("layers")} ${a("common.category")} (${f(Ve.length)})</strong>
      ${dt([{label:a("adm.catGlyph")},{label:a("adm.catName")},{label:a("adm.catParent")},{label:a("adm.catOrder"),cls:"num"},{label:a("common.count"),cls:"num"},{label:a("common.status")},{label:"",cls:"num"}],Ve.map(e=>{var s;return r`
          <tr>
            <td><span class="cat-ic" data-h="34px" data-w="34px">${i(e.glyph||"box")}</span></td>
            <td><span class="b">${h(q()?e.name:e.nameEn||e.name)}</span><div class="tiny muted mono">${h(e.id)}</div></td>
            <td class="tiny">${h(((s=Ve.find(n=>n.id===e.parentId))==null?void 0:s.name)||"\u2014")}</td>
            <td class="num">${f(e.order||0)}</td>
            <td class="num">${f(e.productCount||0)}</td>
            <td>${e.active===!1?r`<span class="badge-pill bp-muted">${a("common.inactive")}</span>`:r`<span class="badge-pill bp-success">${a("common.active")}</span>`}</td>
            <td>
              <div class="act">
                <button class="btn btn-ghost btn-xs" data-act="adm-cat-edit" data-id="${e.id}">${i("edit")}</button>
                <a class="btn btn-ghost btn-xs" href="#/category/${e.id}" target="_blank" rel="noopener">${i("external")}</a>
                <button class="btn btn-ghost btn-xs" data-act="adm-cat-del" data-id="${e.id}" data-name="${h(e.name)}">${i("trash")}</button>
              </div>
            </td>
          </tr>`}),{emptyText:a("common.noData")})}
    </div>

    <div class="card mt">
      <strong>${i("tag")} ${a("common.brand")} (${f(Ds.length)})</strong>
      ${dt([{label:a("adm.brandName")},{label:a("adm.brandNameEn")},{label:a("common.count"),cls:"num"},{label:a("common.status")},{label:"",cls:"num"}],Ds.map(e=>r`
          <tr>
            <td class="b">${h(e.name)}<div class="tiny muted mono">${h(e.id)}</div></td>
            <td class="tiny">${h(e.nameEn||"")}${e.country?r` <span class="muted">· ${h(e.country)}</span>`:""}</td>
            <td class="num">${f(e.productCount||0)}</td>
            <td>${e.active===!1?r`<span class="badge-pill bp-muted">${a("common.inactive")}</span>`:r`<span class="badge-pill bp-success">${a("common.active")}</span>`}</td>
            <td>
              <div class="act">
                <button class="btn btn-ghost btn-xs" data-act="adm-brand-edit" data-id="${e.id}">${i("edit")}</button>
                <button class="btn btn-ghost btn-xs" data-act="adm-brand-del" data-id="${e.id}" data-name="${h(e.name)}">${i("trash")}</button>
              </div>
            </td>
          </tr>`),{emptyText:a("common.noData")})}
    </div>`}function Rr(t){var e;return ut({title:t?a("common.edit"):a("common.add"),body:r`
      <form class="form-grid" data-act="adm-cat-save" data-id="${(t==null?void 0:t.id)||""}" data-isnew="${t?"":"1"}">
        ${t?"":E({label:"id",name:"id",hint:q()?"\u062E\u0627\u0644\u06CC \u0628\u06AF\u0630\u0627\u0631\u06CC \u062E\u0648\u062F\u06A9\u0627\u0631 \u0633\u0627\u062E\u062A\u0647 \u0645\u06CC\u200C\u0634\u0648\u062F":"Auto if empty"})}
        ${E({label:a("adm.catName"),name:"name",required:!0,value:(t==null?void 0:t.name)||""})}
        ${E({label:a("adm.brandNameEn"),name:"nameEn",value:(t==null?void 0:t.nameEn)||""})}
        ${z({label:a("adm.catGlyph"),name:"glyph",value:(t==null?void 0:t.glyph)||"box",options:md.map(s=>({value:s,label:s}))})}
        ${z({label:a("adm.catParent"),name:"parentId",value:(t==null?void 0:t.parentId)||"",options:[{value:"",label:a("adm.catNoParent")},...Ve.filter(s=>s.id!==(t==null?void 0:t.id)).map(s=>({value:s.id,label:s.name}))]})}
        ${E({label:a("adm.catOrder"),name:"order",type:"number",value:(e=t==null?void 0:t.order)!=null?e:Ve.length+1,attrs:'min="0" max="999"'})}
        <div class="span-2">${X({label:a("common.description"),name:"description",value:(t==null?void 0:t.description)||"",rows:2})}</div>
        <div class="span-2">${X({label:Qn("\u062A\u0648\u0636\u06CC\u062D\u0627\u062A \u0627\u0646\u06AF\u0644\u06CC\u0633\u06CC","Description (EN)"),name:"descriptionEn",value:(t==null?void 0:t.descriptionEn)||"",rows:2})}</div>
        <div class="span-2">${$t({label:a("common.active"),name:"active",checked:t?t.active!==!1:!0})}</div>
        <button class="btn btn-primary span-2" type="submit">${a("common.save")}</button>
      </form>`})}function Br(t){return ut({title:t?a("common.edit"):a("common.add"),size:"sm",body:r`
      <form data-act="adm-brand-save" data-id="${(t==null?void 0:t.id)||""}" data-isnew="${t?"":"1"}">
        ${t?"":E({label:"id",name:"id",hint:Qn("\u062E\u0627\u0644\u06CC \u0628\u06AF\u0630\u0627\u0631\u06CC \u062E\u0648\u062F\u06A9\u0627\u0631 \u0633\u0627\u062E\u062A\u0647 \u0645\u06CC\u200C\u0634\u0648\u062F","Auto if empty")})}
        ${E({label:a("adm.brandName"),name:"name",required:!0,value:(t==null?void 0:t.name)||""})}
        ${E({label:a("adm.brandNameEn"),name:"nameEn",value:(t==null?void 0:t.nameEn)||""})}
        ${E({label:Qn("\u06A9\u0634\u0648\u0631","Country"),name:"country",value:(t==null?void 0:t.country)||""})}
        ${$t({label:a("common.active"),name:"active",checked:t?t.active!==!1:!0})}
        <button class="btn btn-primary btn-block mt-s" type="submit">${a("common.save")}</button>
      </form>`})}function pd(t){return N(t),null}var Ve,Ds,md,Qn,Ha,Fa,Fr=V(()=>{U();G();tt();K();mt();J();bt();at();Ve=[],Ds=[];md=["box","cable","plug","battery","speaker","watch","glasses","mic","camera","phone","card","zap","image","headset","anchor","palm","wave","globe","layers","tag","chip","solder","wrench","fan","tv","keyboard","chart"];Qn=(t,e)=>q()?t:e,Ha=null;y("adm-cat-new",()=>{Ha=Rr(null)});y("adm-cat-edit",(t,e)=>{Ha=Rr(Ve.find(s=>s.id===e.dataset.id))});y("adm-cat-del",async(t,e)=>{if(await Kt(e.dataset.name))try{await v.del(`/api/admin/categories/${e.dataset.id}`),x(a("misc.deleted")),await Ot({silent:!0}),T(!0)}catch(s){S(s)}});y("adm-cat-save",async(t,e)=>{t.preventDefault();let s=new FormData(e),n=e.dataset.isnew==="1",o={name:s.get("name"),nameEn:s.get("nameEn")||"",glyph:s.get("glyph")||"box",parentId:s.get("parentId")||"",order:Number(s.get("order")||0),description:s.get("description")||"",descriptionEn:s.get("descriptionEn")||"",active:s.get("active")==="on"};n&&s.get("id")&&(o.id=s.get("id")),await D(e.querySelector("button[type=submit]"),async()=>{try{n?await v.post("/api/admin/categories",o):await v.patch(`/api/admin/categories/${e.dataset.id}`,o),x(a("misc.saved")),Ha==null||Ha.close(),await Ot({silent:!0}),T(!0)}catch(c){S(c)}})});Fa=null;y("adm-brand-new",()=>{Fa=Br(null)});y("adm-brand-edit",(t,e)=>{Fa=Br(Ds.find(s=>s.id===e.dataset.id))});y("adm-brand-del",async(t,e)=>{if(await Kt(e.dataset.name))try{await v.del(`/api/admin/brands/${e.dataset.id}`),x(a("misc.deleted")),await Ot({silent:!0}),T(!0)}catch(s){S(s)}});y("adm-brand-save",async(t,e)=>{t.preventDefault();let s=new FormData(e),n=e.dataset.isnew==="1",o={name:s.get("name"),nameEn:s.get("nameEn")||"",country:s.get("country")||"",active:s.get("active")==="on"};n&&s.get("id")&&(o.id=s.get("id")),await D(e.querySelector("button[type=submit]"),async()=>{try{n?await v.post("/api/admin/brands",o):await v.patch(`/api/admin/brands/${e.dataset.id}`,o),x(a("misc.saved")),Fa==null||Fa.close(),await Ot({silent:!0}),T(!0)}catch(c){S(c)}})})});var zr={};Z(zr,{mount:()=>gd,render:()=>ud});async function ud(t){return t.params.id?hd(t.params.id):bd()}async function bd(){let t=null;try{t=await v.get(v.url("/api/admin/orders",{q:_t.q,status:_t.status,delivery:_t.delivery,page:_t.page,limit:_t.limit}))}catch(s){return W({title:(s==null?void 0:s.message)||a("err.generic")})}Or=t.statuses||[];let e=t.items||[];return r`
    <div class="row row-between row-wrap mb">
      <div>
        <h2 class="section-title">${i("package-check")} ${a("adm.orders")}</h2>
        <p class="muted small">${f(t.total||0)} ${a("common.orders")}</p>
      </div>
    </div>

    <form class="card mb adm-filter" data-act="adm-o-filter">
      <div class="form-grid">
        <label class="field"><span class="label">${a("common.search")}</span>
          <input class="input" name="q" value="${h(_t.q)}" placeholder="${a("acc.orderCode")} / ${a("common.phone")} / ${a("common.name")}">
        </label>
        ${z({label:a("common.status"),name:"status",value:_t.status,options:[{value:"",label:a("common.all")},...Or.map(s=>({value:s.id,label:a(`st.${s.id}`)}))]})}
        ${z({label:a("adm.oDelivery"),name:"delivery",value:_t.delivery,options:[{value:"",label:a("common.all")},{value:"pickup",label:a("dl.pickup")},{value:"courier",label:a("dl.courier")}]})}
      </div>
      <div class="row row-wrap mt-s">
        <button class="btn btn-primary btn-sm" type="submit">${i("filter")} ${a("common.apply")}</button>
        <button class="btn btn-ghost btn-sm" type="button" data-act="adm-o-clear">${i("close")} ${a("catalog.f.clear")}</button>
      </div>
    </form>

    ${e.length?dt([{label:a("acc.orderCode")},{label:a("adm.oCustomer")},{label:a("common.date")},{label:a("adm.oDelivery")},{label:a("common.total"),cls:"num"},{label:a("adm.oPayment")},{label:a("common.status")},{label:"",cls:"num"}],e.map(s=>{var n;return r`
        <tr>
          <td class="mono b nowrap">${s.code}</td>
          <td class="nowrap">${h(s.userName||"")}<div class="tiny muted mono">${ot(s.userPhone||"")}</div></td>
          <td class="nowrap tiny">${O(s.createdAt)}</td>
          <td class="tiny">${a(s.delivery==="pickup"?"dl.pickup":"dl.courier")}${s.express?r` <span class="badge-pill bp-accent">${a("checkout.express")}</span>`:""}</td>
          <td class="num b">${A(s.total)}</td>
          <td>${ze(s.payment)}<div class="tiny muted">${a(`pm.${((n=s.payment)==null?void 0:n.method)||"cod"}`)}</div></td>
          <td>${$e(s.status)}</td>
          <td><a class="btn btn-ghost btn-xs" href="#/admin/orders/${s.id}">${a("common.view")}</a></td>
        </tr>`})):L({icon:"package-check",title:a("common.noResult")})}

    <div class="mt">${me(t.page||1,t.pages||1,s=>`#/admin/orders?page=${s}`)}</div>`}async function hd(t){let e=null;try{e=await v.get(v.url("/api/admin/orders",{q:"",page:1,limit:200}))}catch(n){}let s=((e==null?void 0:e.items)||[]).find(n=>n.id===t||n.code===t);if(!s){try{let n=await v.get(v.url("/api/admin/orders",{q:t,page:1,limit:50})),o=((n==null?void 0:n.items)||[]).find(c=>c.id===t||c.code===t);if(o)return jr(o,n.statuses||[])}catch(n){}return L({icon:"package-check",title:a("acc.noOrders"),action:{href:"#/admin/orders",label:a("adm.orders")}})}return jr(s,e.statuses||[])}function jr(t,e){var n,o,c;let s=Q("orders.manage");return r`
    <div class="breadcrumb mb-s">
      <a href="#/admin/orders">${a("adm.orders")}</a> <span>/</span> <span class="mono">${t.code}</span>
    </div>

    <div class="cart-grid">
      <div class="col">
        <div class="card">
          <div class="row row-between row-wrap">
            <div>
              <h2 class="buy-title">${i("package-check")} ${t.code}</h2>
              <p class="muted small">${O(t.createdAt)} · ${h(t.userName||"")} · <span class="mono">${ot(t.userPhone||"")}</span></p>
            </div>
            <div class="row row-wrap">${$e(t.status)}${ze(t.payment)}</div>
          </div>
          ${s?r`
            <form class="form-grid mt" data-act="adm-o-save" data-id="${t.id}">
              ${z({label:a("adm.oStatus"),name:"status",value:t.status,options:(e.length?e:[]).map(l=>({value:l.id,label:a(`st.${l.id}`)}))})}
              ${E({label:a("adm.oTracking"),name:"tracking",value:t.tracking||((n=t.payment)==null?void 0:n.tracking)||""})}
              <div class="span-2">${X({label:a("adm.oNote"),name:"note",value:t.adminNote||"",rows:3})}</div>
              <div class="span-2"><button class="btn btn-primary" type="submit">${i("save")} ${a("common.save")}</button></div>
            </form>`:""}
        </div>

        <div class="card mt">
          <strong>${i("box")} ${a("acc.orderItems")}</strong>
          ${dt([{label:""},{label:a("common.product")},{label:a("common.price"),cls:"num"},{label:a("common.count"),cls:"num"},{label:a("common.total"),cls:"num"}],(t.items||[]).map(l=>r`
              <tr>
                <td><span class="cl-img" data-h="46px" data-w="46px">${Oe({id:l.productId,name:l.name,images:l.image?[l.image]:[]})}</span></td>
                <td><a class="b" href="#/admin/products/${l.productId}">${h(q()?l.name:l.nameEn||l.name)}</a><div class="tiny muted mono">${h(l.sku||"")}</div></td>
                <td class="num">${A(l.price)}</td>
                <td class="num">${f(l.qty)}</td>
                <td class="num b">${A(l.price*l.qty)}</td>
              </tr>`))}
        </div>

        <div class="card mt">
          <strong>${i("history")} ${a("acc.timeline")}</strong>
          ${ta(t)}
        </div>
      </div>

      <aside class="col">
        <div class="card summary">
          <strong>${a("cart.summary")}</strong>
          <div class="sum-row"><span>${a("common.subtotal")}</span><span class="v">${A(t.subtotal)}</span></div>
          ${t.plusDiscount>0?r`<div class="sum-row discount"><span>${a("acc.plus")}</span><span class="v">−${A(t.plusDiscount)}</span></div>`:""}
          ${t.couponDiscount>0?r`<div class="sum-row discount"><span>${t.couponCode}</span><span class="v">−${A(t.couponDiscount)}</span></div>`:""}
          <div class="sum-row"><span>${a("common.shipping")}${t.shippingLabel?r` <span class="muted tiny">(${h(t.shippingLabel)})</span>`:""}</span><span class="v">${A(t.shipping)}</span></div>
          ${t.insured?r`<div class="sum-row"><span>${a("common.insurance")}</span><span class="v">${A(t.insuranceFee)}</span></div>`:""}
          <div class="sum-row"><span>${a("common.total")}</span><span class="v">${A(t.total)}</span></div>
          ${t.walletUsed>0?r`<div class="sum-row discount"><span>${a("common.wallet")}</span><span class="v">−${A(t.walletUsed)}</span></div>`:""}
          <div class="sum-row total"><span>${a("common.payable")}</span><span class="v">${A(t.payable)}</span></div>
          <p class="hint mt-s">${a("adm.oPayment")}: ${a(`pm.${((o=t.payment)==null?void 0:o.method)||"cod"}`)}${(c=t.payment)!=null&&c.ref?` \xB7 ${h(t.payment.ref)}`:""}</p>
          ${t.refund?r`<p class="notice notice-success mt-s">${i("wallet")}<span>${A(t.refund.amount)} — ${O(t.refund.at)}</span></p>`:""}
        </div>

        <div class="card mt">
          <strong>${i("truck")} ${a(t.delivery==="pickup"?"dl.pickup":"dl.courier")}</strong>
          ${t.address?r`
            <p class="small mt-s"><strong>${h(t.address.receiver||"")}</strong> · <span class="mono">${ot(t.address.phone||"")}</span></p>
            <p class="muted small">${h(t.address.street||"")}${t.address.city?`\u060C ${h(t.address.city)}`:""}</p>
            ${t.address.postal?r`<p class="muted small">${a("common.postal")}: ${h(t.address.postal)}</p>`:""}
            ${t.address.note?r`<p class="hint">${h(t.address.note)}</p>`:""}`:r`<p class="muted small mt-s">${a("checkout.pickupDesc")}</p>`}
          ${t.zone?r`<p class="small mt-s">${a("checkout.zone")}: ${h(t.zone)}</p>`:""}
          ${t.note?r`<p class="hint mt-s">${i("edit")} ${h(t.note)}</p>`:""}
        </div>
      </aside>
    </div>`}function gd(t){return N(t),t.querySelectorAll(".pagination .pg").forEach(e=>{e.addEventListener("click",s=>{let n=/page=(\d+)/.exec(e.getAttribute("href")||"");n&&(s.preventDefault(),_t.page=Number(n[1]),T(!0))})}),null}var _t,Or,Ur=V(()=>{U();G();tt();K();mt();J();bt();at();_t={q:"",status:"",delivery:"",page:1,limit:25},Or=[];y("adm-o-filter",(t,e)=>{t.preventDefault();let s=new FormData(e);_t.q=String(s.get("q")||"").trim(),_t.status=String(s.get("status")||""),_t.delivery=String(s.get("delivery")||""),_t.page=1,T(!0)});y("adm-o-clear",()=>{Object.assign(_t,{q:"",status:"",delivery:"",page:1}),T(!0)});y("adm-o-save",async(t,e)=>{t.preventDefault();let s=new FormData(e);await D(e.querySelector("button[type=submit]"),async()=>{try{await v.patch(`/api/admin/orders/${e.dataset.id}`,{status:s.get("status"),tracking:s.get("tracking")||"",note:s.get("note")||""}),x(a("adm.oSaved")),T(!0)}catch(n){S(n)}})})});var Wr={};Z(Wr,{mount:()=>$d,render:()=>fd});async function fd(){let t=null;try{t=await v.get(v.url("/api/admin/reviews",{status:ae.status,type:ae.type}))}catch(n){return W({title:(n==null?void 0:n.message)||a("err.generic")})}Ps=t.items||[],la=t.counts||la;let e=Math.max(1,Math.ceil(Ps.length/Jn));ae.page>e&&(ae.page=e);let s=Ps.slice((ae.page-1)*Jn,ae.page*Jn);return r`
    <div class="row row-between row-wrap mb">
      <h2 class="section-title">${i("chat")} ${a("adm.reviews")}</h2>
      <div class="row row-wrap">
        <span class="badge-pill bp-warn">${a("adm.revPending")}: ${f(la.pending||0)}</span>
        <span class="badge-pill bp-success">${a("adm.revApproved")}: ${f(la.approved||0)}</span>
        <span class="badge-pill bp-muted">${a("adm.revRejected")}: ${f(la.rejected||0)}</span>
      </div>
    </div>

    <form class="card mb adm-filter" data-act="adm-rev-filter">
      <div class="form-grid">
        ${z({label:a("common.status"),name:"status",value:ae.status,options:[{value:"pending",label:`${a("adm.revPending")} (${f(la.pending||0)})`},{value:"approved",label:a("adm.revApproved")},{value:"rejected",label:a("adm.revRejected")},{value:"",label:a("common.all")}]})}
        ${z({label:a("common.type"),name:"type",value:ae.type,options:[{value:"",label:a("common.all")},{value:"review",label:a("common.review")},{value:"question",label:a("common.question")}]})}
      </div>
      <div class="row row-wrap mt-s">
        <button class="btn btn-primary btn-sm" type="submit">${i("filter")} ${a("common.apply")}</button>
      </div>
    </form>

    ${s.length?r`
      <div class="rev-list">
        ${s.map(vd).join("")}
      </div>
      ${e>1?me(ae.page,e,n=>`#/admin/reviews?p=${n}`):""}
    `:L({icon:"star",title:a("adm.revEmpty"),text:a("adm.revEmptyHint")})}`}function vd(t){var s;let e=t.type==="question";return r`
    <article class="card rev-card" data-id="${t.id}">
      <div class="row row-between row-wrap mb-s">
        <div class="row">
          ${t.productImage?r`<img class="rev-thumb" src="${h(t.productImage)}" alt="" loading="lazy" data-h="46px" data-w="46px">`:r`<span class="rev-thumb ph" data-h="46px" data-w="46px">${i("box")}</span>`}
          <div>
            <a class="b" href="#/product/${t.productId}">${h(t.productName||t.productId)}</a>
            <div class="tiny muted">${h(t.userName||"")} · ${t.userBadge==="buyer"?a("rev.buyer"):a("rev.visitor")} · ${O(t.createdAt)}</div>
          </div>
        </div>
        <div class="row row-wrap">
          ${e?r`<span class="badge-pill bp-info">${a("common.question")}</span>`:r`<span class="rate-row">${Ht(t.rating||0)}</span>`}
          ${yd(t.status)}
        </div>
      </div>
      ${t.title?r`<h3 class="rev-title">${h(t.title)}</h3>`:""}
      <p class="rev-body">${h(t.body||"")}</p>
      ${t.reply?r`
        <div class="rev-reply">
          <span class="tiny muted">${i("send")} ${a("rev.shopReply")}</span>
          <p>${h(t.reply)}</p>
        </div>`:""}
      <div class="row row-wrap mt-s">
        ${t.status!=="approved"?r`<button class="btn btn-success btn-xs" data-act="adm-rev-status" data-id="${t.id}" data-status="approved">${i("check")} ${a("adm.revApprove")}</button>`:""}
        ${t.status!=="rejected"?r`<button class="btn btn-outline btn-xs" data-act="adm-rev-status" data-id="${t.id}" data-status="rejected">${i("close")} ${a("adm.revReject")}</button>`:""}
        ${t.status!=="pending"?r`<button class="btn btn-ghost btn-xs" data-act="adm-rev-status" data-id="${t.id}" data-status="pending">${i("refresh")} ${a("adm.revPending")}</button>`:""}
        ${Q("reviews.reply")?r`<button class="btn btn-ghost btn-xs" data-act="adm-rev-reply" data-id="${t.id}">${i("send")} ${a("adm.revReply")}</button>`:""}
        <a class="btn btn-ghost btn-xs" href="#/product/${t.productId}" target="_blank" rel="noopener">${i("external")}</a>
        <button class="btn btn-ghost btn-xs" data-act="adm-rev-del" data-id="${t.id}" data-name="${h(t.title||((s=t.body)==null?void 0:s.slice(0,30))||"")}">${i("trash")}</button>
      </div>
    </article>`}function yd(t){let e={pending:["bp-warn",a("adm.revPending")],approved:["bp-success",a("adm.revApproved")],rejected:["bp-danger",a("adm.revRejected")]},[s,n]=e[t]||["bp-muted",t];return r`<span class="badge-pill ${s}">${n}</span>`}function $d(t){return N(t),null}var ae,Jn,Ps,la,_r=V(()=>{U();G();tt();K();mt();J();bt();at();ae={status:"pending",type:"",page:1},Jn=12,Ps=[],la={pending:0,approved:0,rejected:0};y("adm-rev-filter",(t,e)=>{t.preventDefault();let s=new FormData(e);ae.status=String(s.get("status")||""),ae.type=String(s.get("type")||""),ae.page=1,T(!0)});y("adm-rev-status",async(t,e)=>{try{await v.patch(`/api/admin/reviews/${e.dataset.id}`,{status:e.dataset.status}),x(a("misc.saved")),T(!0)}catch(s){S(s)}});y("adm-rev-reply",async(t,e)=>{var o;let s=Ps.find(c=>c.id===e.dataset.id),n=await de({title:a("adm.revReply"),text:((o=s==null?void 0:s.body)==null?void 0:o.slice(0,140))||"",label:a("rev.shopReply"),value:(s==null?void 0:s.reply)||"",rows:4});if(n!==null)try{await v.patch(`/api/admin/reviews/${e.dataset.id}`,{reply:String(n)}),x(a("misc.saved")),T(!0)}catch(c){S(c)}});y("adm-rev-del",async(t,e)=>{if(await Kt(e.dataset.name||e.dataset.id))try{await v.del(`/api/admin/reviews/${e.dataset.id}`),x(a("misc.deleted")),T(!0)}catch(s){S(s)}})});var to={};Z(to,{mount:()=>Ed,render:()=>wd});async function wd(t){return t.params.section==="support"?xd(t.params.id):t.params.id?Sd(t.params.id):kd()}async function kd(){let t=null;try{t=await v.get(v.url("/api/admin/tickets",{status:Xn.status}))}catch(n){return W({title:(n==null?void 0:n.message)||a("err.generic")})}let e=t.items||[],s=t.counts||{};return r`
    <div class="row row-between row-wrap mb">
      <div>
        <h2 class="section-title">${i("ticket")} ${a("adm.tickets")}</h2>
        <p class="muted small">${ie("\u0628\u0627\u0632","Open")}: ${f(s.open||0)} · ${ie("\u0628\u0633\u062A\u0647","Closed")}: ${f(s.closed||0)} · ${ie("\u062E\u0648\u0627\u0646\u062F\u0647\u200C\u0646\u0634\u062F\u0647","Unread")}: ${f(e.filter(n=>n.unread).length)}</p>
      </div>
      <form class="row" data-act="adm-tk-filter" data-live>
        ${z({label:a("common.status"),name:"status",value:Xn.status,options:[{value:"",label:a("common.all")},{value:"open",label:a("tk.open")},{value:"answered",label:a("tk.answered")},{value:"closed",label:a("tk.closed")}]})}
      </form>
    </div>

    ${dt([{label:a("acc.ticketSubject")},{label:a("acc.ticketCategory")},{label:a("common.priority")},{label:a("common.user")},{label:a("common.messages"),cls:"num"},{label:a("common.status")},{label:a("common.updated"),cls:"num"},{label:"",cls:"num"}],e.map(n=>r`
        <tr class="${n.unread?"row-new":""}">
          <td>
            ${n.unread?r`<span class="dot-new" title="${ie("\u062E\u0648\u0627\u0646\u062F\u0647\u200C\u0646\u0634\u062F\u0647","Unread")}"></span>`:""}
            <a class="b" href="#/admin/tickets/${n.id}">${h(n.subject)}</a>
            <div class="tiny muted mono">${h(n.code)}</div>
            ${n.lastMessage?r`<div class="tiny muted clip">${h(n.lastMessage)}</div>`:""}
          </td>
          <td>${a(`tc.${n.category}`)}</td>
          <td><span class="badge-pill ${Yr[n.priority]||"bp-info"}">${a(`tp.${n.priority}`)}</span></td>
          <td class="tiny">${h(n.userName||"")}<div class="tiny muted mono">${ot(n.userPhone||"")}</div></td>
          <td class="num">${f(n.messageCount||0)}</td>
          <td><span class="badge-pill ${Vr[n.status]||"bp-muted"}">${a(`tk.${n.status}`)}</span></td>
          <td class="num tiny nowrap">${xt(n.updatedAt||n.createdAt)}</td>
          <td><a class="btn btn-ghost btn-xs" href="#/admin/tickets/${n.id}">${i("chevron-left")}</a></td>
        </tr>`),{emptyText:a("acc.noTickets")})}`}async function Sd(t){var n;let e=null;try{e=(await v.get(`/api/admin/tickets/${t}`)).ticket}catch(o){return(o==null?void 0:o.status)===404?L({icon:"ticket",title:a("acc.noTickets"),action:{href:"#/admin/tickets",label:a("adm.tickets")}}):W({title:(o==null?void 0:o.message)||a("err.generic")})}let s=e.user;return r`
    <div class="breadcrumb mb-s">
      <a href="#/admin/tickets">${a("adm.tickets")}</a> <span>/</span> <span class="mono">${h(e.code)}</span>
    </div>

    <div class="cart-grid">
      <div class="col">
        <div class="card">
          <div class="row row-between row-wrap">
            <div>
              <h2 class="buy-title">${i("ticket")} ${h(e.subject)}</h2>
              <p class="muted small mt-s">
                <span class="mono">${h(e.code)}</span> · ${a("acc.ticketCategory")}: ${a(`tc.${e.category}`)} ·
                ${O(e.createdAt)} · ${ie("\u0622\u062E\u0631\u06CC\u0646 \u0628\u0647\u200C\u0631\u0648\u0632\u0631\u0633\u0627\u0646\u06CC","Updated")}: ${xt(e.updatedAt||e.createdAt)}
              </p>
            </div>
            <div class="row row-wrap">
              <span class="badge-pill ${Vr[e.status]||"bp-muted"}">${a(`tk.${e.status}`)}</span>
              <span class="badge-pill ${Yr[e.priority]||"bp-info"}">${a(`tp.${e.priority}`)}</span>
            </div>
          </div>
        </div>

        <div class="card mt">
          <strong>${i("chat")} ${a("common.messages")} (${f(((n=e.messages)==null?void 0:n.length)||0)})</strong>
          <div class="tk-thread mt">
            ${(e.messages||[]).map(Zn).join("")}
          </div>
          <form class="mt" data-act="adm-tk-reply" data-id="${e.id}">
            <label class="field">
              <span class="label">${a("adm.tkReply")}</span>
              <textarea class="textarea" name="body" rows="3" placeholder="${ie("\u067E\u0627\u0633\u062E \u062E\u0648\u062F \u0631\u0627 \u0628\u0646\u0648\u06CC\u0633\u2026","Write your reply\u2026")}"></textarea>
            </label>
            <div class="row row-wrap mt-s">
              <button class="btn btn-primary" type="submit">${i("send")} ${a("common.send")}</button>
              <select class="select select-sm" name="status">
                <option value="answered">${a("tk.answered")}</option>
                <option value="open">${a("tk.open")}</option>
                <option value="closed">${a("tk.closed")}</option>
              </select>
            </div>
          </form>
        </div>
      </div>

      <aside class="col">
        <div class="card">
          <strong>${i("user")} ${h((s==null?void 0:s.name)||e.userName||"")}</strong>
          <div class="mt-s">
            <div class="sum-row"><span>${a("common.phone")}</span><span class="v mono">${ot((s==null?void 0:s.phone)||e.userPhone||"")}</span></div>
            ${s!=null&&s.email?r`<div class="sum-row"><span>${a("common.email")}</span><span class="v tiny">${h(s.email)}</span></div>`:""}
            <div class="sum-row"><span>${a("acc.plus")}</span><span class="v">${s!=null&&s.plus?r`<span class="badge-pill bp-accent">${a("common.active")}</span>`:r`<span class="muted">—</span>`}</span></div>
            <div class="sum-row"><span>${a("common.orders")}</span><span class="v">${f((s==null?void 0:s.orders)||0)}</span></div>
          </div>
          ${s?r`<a class="btn btn-ghost btn-sm btn-block mt-s" href="#/admin/users/${s.id}">${i("edit")} ${ie("\u0645\u062F\u06CC\u0631\u06CC\u062A \u06A9\u0627\u0631\u0628\u0631","Manage user")}</a>`:""}
        </div>

        <div class="card mt">
          <strong>${i("settings")} ${a("adm.tkManage")}</strong>
          <form class="mt-s" data-act="adm-tk-meta" data-id="${e.id}">
            <label class="field"><span class="label">${a("common.priority")}</span>
              <select class="select" name="priority">
                ${["critical","high","normal","low"].map(o=>r`<option value="${o}" ${e.priority===o?"selected":""}>${a(`tp.${o}`)}</option>`)}
              </select>
            </label>
            <button class="btn btn-outline btn-sm btn-block" type="submit">${a("common.save")}</button>
          </form>
          <div class="row row-wrap mt-s">
            ${e.status!=="closed"?r`<button class="btn btn-ghost btn-sm" data-act="adm-tk-status" data-id="${e.id}" data-status="closed">${i("check")} ${ie("\u0628\u0633\u062A\u0646 \u062A\u06CC\u06A9\u062A","Close ticket")}</button>`:r`<button class="btn btn-ghost btn-sm" data-act="adm-tk-status" data-id="${e.id}" data-status="open">${i("refresh")} ${ie("\u0628\u0627\u0632\u06A9\u0631\u062F\u0646","Reopen")}</button>`}
          </div>
        </div>
      </aside>
    </div>`}function Zn(t){let e=t.from==="staff",s=t.from==="system"?"them sys":e?"me":"them",n=e?t.staffName?`${a("common.support")} \xB7 ${t.staffName}`:a("common.support"):t.name||a("common.user");return r`
    <div class="msg ${s}">
      <div class="msg-bubble">
        <div class="row row-between">
          <strong class="tiny">${h(n)}</strong>
          <span class="tiny muted nowrap">${xt(t.at)}</span>
        </div>
        <div class="msg-text">${h(t.body||"").replace(/\n/g,"<br>")}</div>
        ${(t.attachments||[]).length?r`<div class="row row-wrap mt-s">${t.attachments.map(o=>r`<img class="tk-att" src="${h(o)}" alt="${a("common.image")}" loading="lazy" data-act="adm-att-open" data-url="${h(o)}">`)}</div>`:""}
      </div>
    </div>`}async function xd(t){let e=null;try{e=await v.get("/api/admin/support")}catch(n){return W({title:(n==null?void 0:n.message)||a("err.generic")})}da=e.items||[];let s=da.find(n=>n.userId===t)||null;return r`
    <div class="row row-between row-wrap mb">
      <h2 class="section-title">${i("chat")} ${a("adm.support")}</h2>
      <span class="badge-pill bp-info">${f(da.reduce((n,o)=>n+(o.unread||0),0))} ${ie("\u062E\u0648\u0627\u0646\u062F\u0647\u200C\u0646\u0634\u062F\u0647","unread")}</span>
    </div>

    <div class="sup-grid">
      <div class="card sup-list">
        ${da.length?da.map(n=>{var o,c;return r`
          <a class="sup-item ${s&&s.userId===n.userId?"active":""} ${n.unread?"has-new":""}" href="#/admin/support/${n.userId}">
            <span class="sup-av">${h((n.userName||"?").slice(0,1))}</span>
            <span class="grow">
              <span class="row row-between"><strong class="tiny">${h(n.userName||"")}</strong><span class="tiny muted nowrap">${xt((o=n.last)==null?void 0:o.at)}</span></span>
              <span class="tiny muted clip">${h(((c=n.last)==null?void 0:c.body)||"")}</span>
            </span>
            ${n.unread?r`<span class="badge-pill bp-danger">${f(n.unread)}</span>`:""}
          </a>`}).join(""):r`<p class="muted small">${a("common.noData")}</p>`}
      </div>

      <div class="card sup-chat">
        ${s?r`
          <div class="row row-between mb-s">
            <strong>${i("user")} ${h(s.userName)}</strong>
            <span class="tiny muted">${f(s.count||0)} ${a("common.messages")}</span>
          </div>
          <div class="msg-thread sup-thread" data-thread>
            ${(s.messages||[]).map(Zn).join("")}
          </div>
          <form class="row mt-s" data-act="adm-sup-send" data-id="${s.userId}">
            <input class="input grow" name="body" placeholder="${ie("\u067E\u0627\u0633\u062E \u0633\u0631\u06CC\u0639\u2026","Quick reply\u2026")}" autocomplete="off">
            <button class="btn btn-primary" type="submit">${i("send")}</button>
          </form>
        `:L({icon:"chat",title:a("adm.supSelect"),text:a("adm.supSelectHint")})}
      </div>
    </div>`}function Ed(t,e){var s;if(N(t),((s=e==null?void 0:e.params)==null?void 0:s.section)==="support"&&e.params.id){let n=t.querySelector("[data-thread]");n&&(n.scrollTop=n.scrollHeight)}return null}var ie,Vr,Yr,Xn,da,eo=V(()=>{U();G();tt();K();mt();J();bt();at();ie=(t,e)=>q()?t:e,Vr={open:"bp-warn",answered:"bp-success",closed:"bp-muted"},Yr={critical:"bp-danger",high:"bp-warn",normal:"bp-info",low:"bp-muted"},Xn={status:""};y("adm-tk-filter",(t,e)=>{t.preventDefault(),Xn.status=String(new FormData(e).get("status")||""),T(!0)});y("adm-att-open",(t,e)=>{t.preventDefault(),He([e.dataset.url],0,a("common.image"))});y("adm-tk-reply",async(t,e)=>{t.preventDefault();let s=new FormData(e),n=String(s.get("body")||"").trim();n.length<1||await D(e.querySelector("button[type=submit]"),async()=>{try{await v.patch(`/api/admin/tickets/${e.dataset.id}`,{body:n,status:s.get("status")||"answered"}),x(a("misc.sent")),T(!0)}catch(o){S(o)}})});y("adm-tk-meta",async(t,e)=>{t.preventDefault();try{await v.patch(`/api/admin/tickets/${e.dataset.id}`,{priority:new FormData(e).get("priority")}),x(a("misc.saved")),T(!0)}catch(s){S(s)}});y("adm-tk-status",async(t,e)=>{try{await v.patch(`/api/admin/tickets/${e.dataset.id}`,{status:e.dataset.status}),x(a("misc.saved")),T(!0)}catch(s){S(s)}});da=[];y("adm-sup-send",async(t,e)=>{var o,c;t.preventDefault();let s=e.querySelector("[name=body]"),n=String(s.value||"").trim();if(n){s.value="";try{await v.post(`/api/admin/support/${e.dataset.id}`,{body:n});let l=(o=e.closest(".sup-chat"))==null?void 0:o.querySelector("[data-thread]");if(l){let d=document.createElement("div");d.innerHTML=Zn({from:"staff",staffName:((c=p.me)==null?void 0:c.name)||"",body:n,at:new Date().toISOString()}).trim(),d.firstElementChild&&l.appendChild(d.firstElementChild),l.scrollTop=l.scrollHeight}let m=da.find(d=>d.userId===e.dataset.id);m&&(m.last={body:n,at:new Date().toISOString(),from:"staff"},m.unread=0),x(a("misc.sent"))}catch(l){S(l),s.value=n}}})});var Gr={};Z(Gr,{mount:()=>Ad,render:()=>Td});async function Td(){var s,n;let t=null;try{t=await v.get(v.url("/api/admin/feedback",{type:Ye.type}))}catch(o){return W({title:(o==null?void 0:o.message)||a("err.generic")})}let e=t.items||[];return Ye.status&&(e=e.filter(o=>o.status===Ye.status)),r`
    <div class="row row-between row-wrap mb">
      <div>
        <h2 class="section-title">${i("mail")} ${a("adm.feedback")}</h2>
        <p class="muted small">${f(((s=t.counts)==null?void 0:s.total)||e.length)} ${ma("\u0645\u0648\u0631\u062F","items")} · ${f(((n=t.counts)==null?void 0:n.new)||0)} ${ma("\u062C\u062F\u06CC\u062F","new")}</p>
      </div>
    </div>

    <form class="card mb adm-filter" data-act="adm-fb-filter">
      <div class="form-grid">
        ${z({label:a("common.type"),name:"type",value:Ye.type,options:[{value:"",label:a("common.all")},{value:"suggestion",label:a("feedback.suggestion")},{value:"complaint",label:a("feedback.complaint")},{value:"bug",label:a("feedback.bug")}]})}
        ${z({label:a("common.status"),name:"status",value:Ye.status,options:[{value:"",label:a("common.all")},...Object.entries(ao).map(([o,[,c]])=>({value:o,label:c()}))]})}
      </div>
      <div class="row row-wrap mt-s">
        <button class="btn btn-primary btn-sm" type="submit">${i("filter")} ${a("common.apply")}</button>
      </div>
    </form>

    ${e.length?r`<div class="rev-list">${e.map(Cd).join("")}</div>`:L({icon:"mail",title:a("common.noData"),text:a("adm.fbEmptyHint")})}`}function Cd(t){var o;let e=qd[t.type]||{icon:"mail",cls:"bp-muted"},[s,n]=ao[t.status]||["bp-muted",()=>t.status];return r`
    <article class="card rev-card">
      <div class="row row-between row-wrap mb-s">
        <div class="row">
          <span class="fb-ic ${e.cls}">${i(e.icon)}</span>
          <div>
            <strong>${h(t.title||"")}</strong>
            <div class="tiny muted">
              ${a(`feedback.${t.type}`)} · ${h(t.userName||ma("\u0645\u0647\u0645\u0627\u0646","Guest"))} · ${xt(t.createdAt)}
              ${t.contact?` \xB7 ${h(t.contact)}`:""}${t.page?` \xB7 ${h(t.page)}`:""}
            </div>
          </div>
        </div>
        <span class="badge-pill ${s}">${n()}</span>
      </div>
      <p class="rev-body">${h(t.body||"")}</p>
      ${(t.attachments||[]).length?r`
        <div class="row row-wrap mt-s">
          ${t.attachments.map(c=>r`<img class="tk-att" src="${h(c)}" alt="" loading="lazy" data-act="adm-att-open" data-url="${h(c)}">`)}
        </div>`:""}
      ${(o=t.device)!=null&&o.ua?r`<p class="tiny muted mono mt-s clip-wide">${h(t.device.ua)}${t.device.screen?` \xB7 ${h(t.device.screen)}`:""}</p>`:""}
      ${t.answer?r`
        <div class="rev-reply">
          <span class="tiny muted">${i("send")} ${ma("\u067E\u0627\u0633\u062E \u0645\u0627","Our answer")}</span>
          <p>${h(t.answer)}</p>
        </div>`:""}
      <form class="mt-s" data-act="adm-fb-save" data-id="${t.id}">
        <div class="row row-wrap">
          <select class="select select-sm" name="status">
            ${Object.entries(ao).map(([c,[,l]])=>r`<option value="${c}" ${t.status===c?"selected":""}>${l()}</option>`)}
          </select>
          <input class="input grow" name="answer" value="${h(t.answer||"")}" placeholder="${ma("\u067E\u0627\u0633\u062E\u2026","Answer\u2026")}">
          <button class="btn btn-outline btn-sm" type="submit">${i("save")} ${a("common.save")}</button>
        </div>
      </form>
      <div class="tiny muted mt-s">${ma("\u062B\u0628\u062A","Created")}: ${O(t.createdAt)}</div>
    </article>`}function Ad(t){return N(t),null}var ma,Ye,qd,ao,Kr=V(()=>{U();G();tt();mt();J();bt();at();ma=(t,e)=>q()?t:e,Ye={type:"",status:""},qd={suggestion:{icon:"sparkles",cls:"bp-info"},complaint:{icon:"flag",cls:"bp-warn"},bug:{icon:"bug",cls:"bp-danger"}},ao={new:["bp-info",()=>a("fb.new")],seen:["bp-muted",()=>a("fb.seen")],in_progress:["bp-warn",()=>a("fb.inProgress")],done:["bp-success",()=>a("fb.done")],rejected:["bp-danger",()=>a("fb.rejected")]};y("adm-fb-filter",(t,e)=>{t.preventDefault();let s=new FormData(e);Ye.type=String(s.get("type")||""),Ye.status=String(s.get("status")||""),T(!0)});y("adm-fb-save",async(t,e)=>{t.preventDefault();let s=new FormData(e);await D(e.querySelector("button[type=submit]"),async()=>{try{await v.patch(`/api/admin/feedback/${e.dataset.id}`,{status:s.get("status"),answer:String(s.get("answer")||"")}),x(a("misc.saved")),T(!0)}catch(n){S(n)}})})});var ti={};Z(ti,{mount:()=>Ld,render:()=>Dd});async function Dd(t){return t.params.id?Md(t.params.id):Pd()}async function Jr(){let t=await v.get(v.url("/api/admin/users",{q:Me.q,role:Me.role}));return ke=t.items||[],Qr=t.permissions||[],t}async function Pd(){let t=await Nd(),e=null;try{e=await Jr()}catch(s){return W({title:(s==null?void 0:s.message)||a("err.generic")})}return r`
    <div class="row row-between row-wrap mb">
      <div>
        <h2 class="section-title">${i("users")} ${a("adm.users")}</h2>
        <p class="muted small">${f(ke.length)} ${a("common.users")}</p>
      </div>
    </div>

    <form class="card mb adm-filter" data-act="adm-u-filter">
      <div class="form-grid">
        <label class="field"><span class="label">${a("common.search")}</span>
          <input class="input" name="q" value="${h(Me.q)}" placeholder="${a("common.name")} / ${a("common.username")} / ${a("common.phone")}">
        </label>
        ${z({label:a("adm.uRole"),name:"role",value:Me.role,options:[{value:"",label:a("common.all")},{value:"user",label:a("common.user")},{value:"staff",label:be("\u06A9\u0627\u0631\u0645\u0646\u062F","Staff")},{value:"owner",label:be("\u0645\u0627\u0644\u06A9","Owner")}]})}
      </div>
      <div class="row row-wrap mt-s">
        <button class="btn btn-primary btn-sm" type="submit">${i("filter")} ${a("common.apply")}</button>
        <button class="btn btn-ghost btn-sm" type="button" data-act="adm-u-clear">${i("close")} ${a("catalog.f.clear")}</button>
      </div>
    </form>

    ${dt([{label:a("common.user")},{label:a("common.phone")},{label:a("adm.uRole")},{label:a("common.balance"),cls:"num"},{label:a("acc.plus"),cls:"num"},{label:a("common.orders"),cls:"num"},{label:a("adm.uDevice")},{label:a("common.status")},{label:"",cls:"num"}],ke.map(s=>r`
        <tr>
          <td>
            <span class="b">${h(s.name||s.username)}</span>
            <span class="tiny muted mono">@${h(s.username)}</span>
            ${s.twoFA?r`<span class="badge-pill bp-success tiny">${i("shield")}</span>`:""}
          </td>
          <td class="mono tiny nowrap">${ot(s.phone||"")}${s.email?r`<div class="tiny muted">${h(s.email)}</div>`:""}</td>
          <td>${Xr(s.role)}</td>
          <td>${Zr(s.kycStatus)}</td>
          <td class="num">${f(s.wallet||0)}</td>
          <td class="num">${s.plus?r`<span class="badge-pill bp-accent">${a("common.active")}</span>`:r`<span class="muted">—</span>`}</td>
          <td class="num">${f(s.orders||0)}<div class="tiny muted">${A(s.spent||0)}</div></td>
          <td class="tiny">${s.lastAgent?r`<span>${s.lastAgent.os} · ${s.lastAgent.device}</span><div class="muted mono tiny">${h(s.lastIp||"")}</div>`:r`<span class="muted">—</span>`}</td>
          <td>${s.banned?r`<span class="badge-pill bp-danger">${a("adm.banned")}</span>`:s.status==="blocked"?r`<span class="badge-pill bp-danger">${a("adm.uBlocked")}</span>`:r`<span class="badge-pill bp-success">${a("common.active")}</span>`}</td>
          <td><div class="row row-end">
            ${Q("users.manage")?r`<button class="btn ${s.banned?"btn-success":"btn-danger"} btn-xs" data-act="adm-u-ban-toggle" data-id="${s.id}" data-val="${h(s.phone||s.username)}" data-banned="${s.banned?"1":""}" title="${s.banned?a("adm.unban"):a("adm.ban")}">${i(s.banned?"check":"lock")}</button>`:""}
            ${Q("users.manage")?r`<a class="btn btn-ghost btn-xs" href="#/admin/users/${s.id}">${i("edit")}</a>`:""}
          </div></td>
        </tr>`),{emptyText:a("common.noResult")})}`}function Xr(t){let e={owner:"bp-accent",staff:"bp-info",user:"bp-muted"},s={owner:be("\u0645\u0627\u0644\u06A9","Owner"),staff:be("\u06A9\u0627\u0631\u0645\u0646\u062F","Staff"),user:a("common.user")}[t]||t;return r`<span class="badge-pill ${e[t]||"bp-muted"}">${s}</span>`}async function Md(t){var c,l;try{ke.length||await Jr()}catch(m){return W({title:(m==null?void 0:m.message)||a("err.generic")})}let e=ke.find(m=>m.id===t);if(!e)return L({icon:"user",title:a("common.noResult"),action:{href:"#/admin/users",label:a("adm.users")}});let s=e.permissions||{},n=((c=p.me)==null?void 0:c.id)===e.id,o=Q("users.permissions");return r`
    <div class="breadcrumb mb-s">
      <a href="#/admin/users">${a("adm.users")}</a> <span>/</span> <span>${h(e.name||e.username)}</span>
    </div>

    <div class="card">
      <div class="row row-between row-wrap">
        <div>
          <h2 class="buy-title">${i("user")} ${h(e.name||e.username)} <span class="muted mono small">@${h(e.username)}</span></h2>
          <p class="muted small mt-s">
            ${ot(e.phone||"")}${e.email?` \xB7 ${h(e.email)}`:""} ·
            ${a("acc.memberSince",{date:O(e.createdAt,{time:!1})})} ·
            ${be("\u0622\u062E\u0631\u06CC\u0646 \u0648\u0631\u0648\u062F","Last login")}: ${e.lastLoginAt?O(e.lastLoginAt):a("common.never")} (${f(e.loginCount||0)})
          </p>
        </div>
        <div class="row row-wrap">
          ${Xr(e.role)}
          ${e.status==="blocked"?r`<span class="badge-pill bp-danger">${a("adm.uBlocked")}</span>`:""}
          ${e.plus?r`<span class="badge-pill bp-accent">${a("acc.plus")} ${O(e.plusUntil,{time:!1})}</span>`:""}
        </div>
      </div>
      <div class="stats-grid mt">
        <div class="stat-card"><span class="stat-ic">${i("wallet")}</span><div><div class="stat-val">${f(e.wallet||0)}</div><div class="stat-lbl">${a("common.balance")}</div></div></div>
        <div class="stat-card"><span class="stat-ic">${i("gift")}</span><div><div class="stat-val">${f(e.points||0)}</div><div class="stat-lbl">${a("common.points")}</div></div></div>
        <div class="stat-card"><span class="stat-ic">${i("package-check")}</span><div><div class="stat-val">${f(e.orders||0)}</div><div class="stat-lbl">${a("common.orders")}</div></div></div>
        <div class="stat-card"><span class="stat-ic">${i("card")}</span><div><div class="stat-val">${A(e.spent||0)}</div><div class="stat-lbl">${be("\u0645\u062C\u0645\u0648\u0639 \u062E\u0631\u06CC\u062F","Total spent")}</div></div></div>
      </div>
    </div>

    
    <!-- KYC Management -->
    ${e.kycStatus&&e.kycStatus!=="none"?r`
      <div class="card mt box pad border-warning">
        <h3 class="mb-3">${i("shield-check")} احراز هویت (KYC)</h3>
        <p class="muted">وضعیت فعلی: ${Zr(e.kycStatus)}</p>
        ${e.kycDocs?r`
          <div class="grid gap-3 mt-3">
            <div>
              <strong>سلفی:</strong> <a href="#" target="_blank">${e.kycDocs.selfie}</a>
            </div>
            <div>
              <strong>کارت ملی:</strong> <a href="#" target="_blank">${e.kycDocs.idCard}</a>
            </div>
            <div>
              <strong>فرم تعهدنامه:</strong> <a href="#" target="_blank">${e.kycDocs.formDoc}</a>
            </div>
          </div>
        `:""}
        <form class="mt-4 row row-wrap gap-2" onsubmit="event.preventDefault(); window.submitAdminKyc(event.target, '${e.id}')">
          <select class="input" name="kycStatus">
            <option value="pending" ${e.kycStatus==="pending"?"selected":""}>در انتظار</option>
            <option value="approved" ${e.kycStatus==="approved"?"selected":""}>تأیید شده</option>
            <option value="rejected" ${e.kycStatus==="rejected"?"selected":""}>رد شده</option>
          </select>
          <input class="input flex-1" name="kycMessage" placeholder="پیام در صورت رد شدن مدارک..." value="${h(e.kycMessage||"")}">
          <button class="btn primary" type="submit">${i("save")} ذخیره وضعیت KYC</button>
        </form>
      </div>
    `:""}

    <form class="card mt" data-act="adm-u-save" data-id="${e.id}">
      <div class="form-grid">
        ${z({label:a("adm.uRole"),name:"role",value:e.role,options:[{value:"user",label:a("common.user")},{value:"staff",label:be("\u06A9\u0627\u0631\u0645\u0646\u062F","Staff")},...o&&(((l=p.me)==null?void 0:l.role)==="owner"||e.role!=="owner")?[{value:"owner",label:be("\u0645\u0627\u0644\u06A9","Owner")}]:[]]})}
        ${z({label:a("adm.uStatus"),name:"status",value:e.status||"active",options:[{value:"active",label:a("common.active")},{value:"blocked",label:a("adm.uBlocked")}]})}
        ${E({label:a("common.points"),name:"points",type:"number",value:e.points||0,attrs:'min="0" max="1000000"'})}
      </div>

      ${o?r`
        <div class="row row-between row-wrap mt">
          <strong>${i("key")} ${a("adm.uPerms")}</strong>
          <div class="row">
            <button type="button" class="btn btn-ghost btn-xs" data-act="adm-perm-all" data-v="1">${a("adm.uAll")}</button>
            <button type="button" class="btn btn-ghost btn-xs" data-act="adm-perm-all" data-v="0">${a("adm.uNone")}</button>
          </div>
        </div>
        <p class="hint">${a("adm.uPermsHint")}</p>
        <div class="perm-grid mt-s">
          ${Qr.map(m=>r`
            <label class="perm-item">
              <span class="switch"><input type="checkbox" name="perm.${m.key}" ${s[m.key]?"checked":""}><span class="track"></span></span>
              <span class="grow">${h(q()?m.fa:m.en||m.fa)}<span class="k mono">${m.key}</span></span>
            </label>`)}
        </div>`:""}

      <div class="row row-wrap mt">
        <button class="btn btn-primary" type="submit">${i("save")} ${a("common.save")}</button>
        <a class="btn btn-ghost" href="#/admin/users">${a("common.back")}</a>
      </div>
    </form>

    <div class="acc-grid acc-grid-eq mt">
      ${Q("wallet.manage")?r`
      <form class="card" data-act="adm-u-wallet" data-id="${e.id}">
        <strong>${i("wallet")} ${a("adm.uWalletAdjust")}</strong>
        <p class="muted small mt-s">${a("common.balance")}: ${A(e.wallet||0)}</p>
        ${E({label:a("common.amount"),name:"walletAdjust",type:"number",value:"",attrs:'min="-50000000" max="50000000" step="10000"',placeholder:"\xB1"})}
        ${E({label:a("adm.uWalletReason"),name:"walletReason",value:""})}
        <button class="btn btn-outline" type="submit">${a("common.apply")}</button>
      </form>`:""}

      ${Q("plus.manage")?r`
      <form class="card" data-act="adm-u-plus" data-id="${e.id}">
        <strong>${i("sparkles")} ${a("adm.uPlusDays")}</strong>
        <p class="muted small mt-s">${e.plus?`${a("acc.plusActive",{date:O(e.plusUntil,{time:!1})})}`:a("acc.plusInactive")}</p>
        ${E({label:a("common.day"),name:"plusDays",type:"number",value:"30",attrs:'min="-365" max="365"'})}
        <div class="row row-wrap">
          <button class="btn btn-outline" type="submit">${a("common.apply")}</button>
          <button class="btn btn-ghost" type="button" data-act="adm-u-plus-off" data-id="${e.id}">${a("common.disabled")}</button>
        </div>
      </form>`:""}

      ${Q("users.manage")&&!n?r`
      <form class="card" data-act="adm-u-pass" data-id="${e.id}">
        <strong>${i("key")} ${a("adm.uResetPass")}</strong>
        <p class="muted small mt-s">${be("\u067E\u0633 \u0627\u0632 \u062A\u063A\u06CC\u06CC\u0631\u060C \u06A9\u0627\u0631\u0628\u0631 \u0628\u0627\u06CC\u062F \u062F\u0648\u0628\u0627\u0631\u0647 \u0648\u0627\u0631\u062F \u0634\u0648\u062F \u0648 \u0631\u0645\u0632 \u0631\u0627 \u0639\u0648\u0636 \u06A9\u0646\u062F.","The user must sign in again and change the password.")}</p>
        ${E({label:a("auth.newPassword"),name:"resetPassword",type:"text",value:"",hint:a("auth.passwordRules")})}
        <button class="btn btn-danger" type="submit">${a("common.reset")}</button>
      </form>`:""}
    </div>`}function Ld(t){return N(t),null}async function Nd(){var e;if(!Q("users.manage"))return"";let t={items:[]};try{t=await v.get("/api/admin/bans")}catch(s){return""}return r`
    <div class="card mb">
      <strong>${i("lock")} ${a("adm.bans")}</strong>
      <form class="form-grid mt-s" data-act="adm-ban-add">
        ${z({label:a("adm.banType"),name:"type",options:[{value:"ip",label:"IP"},{value:"phone",label:a("contact.mobile")},{value:"email",label:a("common.email")},{value:"username",label:a("common.username")}]})}
        ${E({label:a("adm.banValue"),name:"value",required:!0})}
        ${E({label:a("adm.banReason"),name:"reason"})}
        ${E({label:a("adm.banMinutes"),name:"minutes",type:"number",value:"0",attrs:'min="0" max="525600" inputmode="numeric"'})}
        <button class="btn btn-danger" type="submit">${i("lock")} ${a("adm.ban")}</button>
      </form>
      ${(e=t.items)!=null&&e.length?r`<div class="table-wrap mt-s"><table class="table">
        <thead><tr><th>${a("adm.banType")}</th><th>${a("adm.banValue")}</th><th>${a("adm.banReason")}</th><th>${a("common.date")}</th><th></th></tr></thead>
        <tbody>${t.items.map(s=>r`<tr>
          <td class="tiny">${s.type}${s.auto?r` <span class="badge-pill bp-warn tiny">${a("adm.banAuto")}</span>`:""}</td><td class="mono tiny">${h(s.value)}</td><td class="tiny muted">${h(s.reason||"")}</td><td class="tiny">${O(s.at)}${s.until?r`<br><span class="muted">${a("adm.banUntil")}: ${O(s.until)}</span>`:""}</td>
          <td><button class="btn btn-success btn-xs" data-act="adm-ban-del" data-id="${s.id}">${i("check")} ${a("adm.unban")}</button></td>
        </tr>`)}</tbody></table></div>`:r`<p class="muted small mt-s">${a("adm.bansEmpty")}</p>`}
    </div>`}function Zr(t){return t==="approved"?r`<span class="${N("badge-pill bp-success")}">تأیید شده</span>`:t==="pending"?r`<span class="${N("badge-pill bp-warning")}">در انتظار</span>`:t==="rejected"?r`<span class="${N("badge-pill bp-danger")}">رد شده</span>`:r`<span class="${N("muted")}">—</span>`}var Me,Qr,ke,be,ei=V(()=>{U();G();tt();K();mt();J();bt();at();Me={q:"",role:""},Qr=[],ke=[];be=(t,e)=>q()?t:e;y("adm-u-filter",(t,e)=>{t.preventDefault();let s=new FormData(e);Me.q=String(s.get("q")||"").trim(),Me.role=String(s.get("role")||""),T(!0)});y("adm-u-clear",()=>{Me.q="",Me.role="",T(!0)});y("adm-perm-all",(t,e)=>{let s=e.dataset.v==="1";e.closest("form").querySelectorAll('input[name^="perm."]').forEach(n=>{n.checked=s})});y("adm-u-save",async(t,e)=>{t.preventDefault();let s=new FormData(e),n={role:s.get("role"),status:s.get("status"),points:Number(s.get("points")||0)},o={},c=!1;e.querySelectorAll('input[name^="perm."]').forEach(l=>{o[l.name.slice(5)]=l.checked,c=!0}),c&&(n.permissions=o),await D(e.querySelector("button[type=submit]"),async()=>{try{await v.patch(`/api/admin/users/${e.dataset.id}`,n),x(a("adm.uSaved")),ke=[],T(!0)}catch(l){S(l)}})});y("adm-u-wallet",async(t,e)=>{t.preventDefault();let s=new FormData(e),n=Number(s.get("walletAdjust")||0);n&&await D(e.querySelector("button[type=submit]"),async()=>{try{await v.patch(`/api/admin/users/${e.dataset.id}`,{walletAdjust:n,walletReason:s.get("walletReason")||"\u062A\u0646\u0638\u06CC\u0645 \u062A\u0648\u0633\u0637 \u0645\u062F\u06CC\u0631"}),x(a("adm.uSaved")),ke=[],T(!0)}catch(o){S(o)}})});y("adm-u-plus",async(t,e)=>{t.preventDefault();let s=Number(new FormData(e).get("plusDays")||0);s&&await D(e.querySelector("button[type=submit]"),async()=>{try{await v.patch(`/api/admin/users/${e.dataset.id}`,{plusDays:s}),x(a("adm.uSaved")),ke=[],T(!0)}catch(n){S(n)}})});y("adm-u-plus-off",async(t,e)=>{if(await kt({text:be("\u0627\u0634\u062A\u0631\u0627\u06A9 \u067E\u0644\u0627\u0633 \u0627\u06CC\u0646 \u06A9\u0627\u0631\u0628\u0631 \u063A\u06CC\u0631\u0641\u0639\u0627\u0644 \u0634\u0648\u062F\u061F","Disable Plus for this user?")}))try{await v.patch(`/api/admin/users/${e.dataset.id}`,{plusDays:-365}),x(a("adm.uSaved")),ke=[],T(!0)}catch(n){S(n)}});y("adm-u-pass",async(t,e)=>{t.preventDefault();let s=String(new FormData(e).get("resetPassword")||"");if(s.length<8){S({code:"weak_password",message:a("auth.passwordRules")});return}await D(e.querySelector("button[type=submit]"),async()=>{try{await v.patch(`/api/admin/users/${e.dataset.id}`,{resetPassword:s}),x(a("adm.uSaved")),e.reset()}catch(n){S(n)}})});y("adm-ban-add",async(t,e)=>{var s,n;t.preventDefault();try{await v.post("/api/admin/bans",{type:e.type.value,value:e.value.value,reason:((s=e.reason)==null?void 0:s.value)||"",minutes:Number((n=e.minutes)==null?void 0:n.value)||0}),x(a("adm.banDone")),T(!0)}catch(o){S(o)}});y("adm-ban-del",async(t,e)=>{await D(e,async()=>{try{await v.del(`/api/admin/bans/${e.dataset.id}`),x(a("adm.unbanDone")),T(!0)}catch(s){S(s)}})});y("adm-u-ban-toggle",async(t,e)=>{if(e.dataset.banned==="1"){let c=((await v.get("/api/admin/bans")).items||[]).find(l=>l.value===String(e.dataset.val||"").toLowerCase());if(!c){toastError(a("err.generic"));return}try{await v.del(`/api/admin/bans/${c.id}`),x(a("adm.unbanDone")),T(!0)}catch(l){S(l)}return}let n=/^09\d{9}$/.test(e.dataset.val||"")?"phone":(e.dataset.val||"").includes("@")?"email":"username";try{await v.post("/api/admin/bans",{type:n,value:e.dataset.val,reason:a("adm.banByAdmin")}),x(a("adm.banDone")),T(!0)}catch(o){S(o)}})});var Oa={};Z(Oa,{mount:()=>jd,render:()=>Id});async function Id(t){let e=t.params.section;return e==="stats"?Hd():e==="visitors"?zd():e==="data"?Od():Rd()}async function Rd(){let t=null;try{t=await v.get(v.url("/api/admin/audit",{q:Vt.q,action:Vt.action,page:Vt.page,limit:Vt.limit}))}catch(s){return W({title:(s==null?void 0:s.message)||a("err.generic")})}let e=t.items||[];for(let s of e){let n=String(s.action||"").split(".")[0];n&&!so.includes(n)&&so.push(n)}return r`
    <div class="row row-between row-wrap mb">
      <div>
        <h2 class="section-title">${i("history")} ${a("adm.audit")}</h2>
        <p class="muted small">${f(t.total||0)} ${Rt("\u0631\u0648\u06CC\u062F\u0627\u062F","events")}</p>
      </div>
    </div>

    <form class="card mb adm-filter" data-act="adm-aud-filter">
      <div class="form-grid">
        <label class="field"><span class="label">${a("common.search")}</span>
          <input class="input" name="q" value="${h(Vt.q)}" placeholder="${Rt("\u06A9\u0627\u0631\u0628\u0631\u060C \u0631\u0648\u06CC\u062F\u0627\u062F\u060C \u0647\u062F\u0641\u2026","actor, action, target\u2026")}">
        </label>
        ${z({label:a("adm.audAction"),name:"action",value:Vt.action,options:[{value:"",label:a("common.all")},...so.sort().map(s=>({value:s,label:s}))]})}
      </div>
      <div class="row row-wrap mt-s">
        <button class="btn btn-primary btn-sm" type="submit">${i("filter")} ${a("common.apply")}</button>
        <button class="btn btn-ghost btn-sm" type="button" data-act="adm-aud-clear">${i("close")} ${a("catalog.f.clear")}</button>
      </div>
    </form>

    ${dt([{label:a("common.date")},{label:a("adm.audActor")},{label:a("adm.audAction")},{label:a("adm.audTarget")},{label:a("adm.audMeta")}],e.map(s=>r`
        <tr>
          <td class="tiny nowrap" title="${O(s.at)}">${xt(s.at)}</td>
          <td class="tiny"><span class="b">${h(s.actorName||"")}</span><div class="tiny muted">${h(s.actorRole||"")}</div></td>
          <td><code class="tag mono">${h(s.action||"")}</code></td>
          <td class="tiny mono">${h(s.target||"")}</td>
          <td class="tiny muted clip-wide">${h(Bd(s.meta))}</td>
        </tr>`),{emptyText:a("common.noData")})}
    ${t.pages>1?me(t.page,t.pages,s=>`#/admin/audit?p=${s}`):""}`}function Bd(t){return!t||typeof t!="object"?"":Object.entries(t).map(([e,s])=>`${e}=${typeof s=="object"?JSON.stringify(s):s}`).join(" \xB7 ").slice(0,160)}async function Hd(){let t=null;try{t=await v.get(v.url("/api/admin/stats",{days:pa.days}))}catch(u){return W({title:(u==null?void 0:u.message)||a("err.generic")})}let e=t.series||[],s=t.summary||{},n=Object.entries(t.byCat||{}).sort((u,b)=>b[1].sold-u[1].sold),o=Object.entries(t.byBrand||{}).sort((u,b)=>b[1]-u[1]).slice(0,12),c=t.missedSearches||[],l=pa.metric,m=e.map(u=>({label:u.date,short:u.date.slice(5),value:l==="revenue"?u.revenue:l==="visits"?u.visits:u.orders})),d=e.reduce((u,b)=>({orders:u.orders+b.orders,revenue:u.revenue+b.revenue,visits:u.visits+b.visits,unique:u.unique+b.unique}),{orders:0,revenue:0,visits:0,unique:0});return r`
    <div class="row row-between row-wrap mb">
      <h2 class="section-title">${i("chart")} ${a("adm.stats")}</h2>
      <form class="row row-wrap" data-act="adm-st-filter" data-live>
        <select class="select select-sm" name="days">
          ${[7,30,90].map(u=>r`<option value="${u}" ${pa.days===u?"selected":""}>${f(u)} ${Rt("\u0631\u0648\u0632","days")}</option>`)}
        </select>
        <select class="select select-sm" name="metric">
          <option value="orders" ${l==="orders"?"selected":""}>${a("adm.stOrders")}</option>
          <option value="revenue" ${l==="revenue"?"selected":""}>${a("adm.stRevenue")}</option>
          <option value="visits" ${l==="visits"?"selected":""}>${a("adm.stVisits")}</option>
        </select>
      </form>
    </div>

    <div class="kpi-grid mb">
      ${It({icon:"package-check",label:a("adm.stOrders"),value:f(s.orders||0),sub:`${Rt("\u062F\u0631 \u0627\u06CC\u0646 \u0628\u0627\u0632\u0647","in range")}: ${f(d.orders)}`})}
      ${It({icon:"wallet",label:a("adm.stRevenue"),value:A(s.revenue||0),sub:`${Rt("\u062F\u0631 \u0627\u06CC\u0646 \u0628\u0627\u0632\u0647","in range")}: ${A(d.revenue)}`})}
      ${It({icon:"users",label:a("adm.stUsers"),value:f(s.users||0),sub:`${Rt("\u0628\u0627\u0632\u062F\u06CC\u062F \u06CC\u06A9\u062A\u0627","unique visits")}: ${f(d.unique)}`})}
      ${It({icon:"box",label:a("adm.stProducts"),value:f(s.products||0),sub:`${Rt("\u0627\u0631\u0632\u0634 \u0645\u0648\u062C\u0648\u062F\u06CC","stock value")}: ${A(s.stockValue||0)}`})}
      ${It({icon:"scale",label:a("adm.stAvg"),value:A(s.avgOrder||0),sub:`${Rt("\u0645\u06CC\u0627\u0646\u06AF\u06CC\u0646 \u0633\u0628\u062F","average basket")}`})}
      ${It({icon:"eye",label:a("adm.stVisits"),value:f(d.visits),sub:`${Rt("\u062F\u0631 \u0627\u06CC\u0646 \u0628\u0627\u0632\u0647","in range")}`})}
    </div>

    <div class="card">
      <strong>${i("chart")} ${l==="revenue"?a("adm.stRevenue"):l==="visits"?a("adm.stVisits"):a("adm.stOrders")} — ${f(pa.days)} ${Rt("\u0631\u0648\u0632","days")}</strong>
      <div class="mt-s">${bs(m,{height:150})}</div>
    </div>

    <div class="cart-grid mt">
      <div class="col card">
        <strong>${i("layers")} ${a("adm.stByCat")}</strong>
        ${dt([{label:a("common.category")},{label:a("common.products"),cls:"num"},{label:a("pdp.sold"),cls:"num"},{label:a("common.stock"),cls:"num"},{label:a("adm.stRevenue"),cls:"num"}],n.map(([u,b])=>r`
            <tr>
              <td class="b">${h(u)}</td>
              <td class="num">${f(b.products)}</td>
              <td class="num">${f(b.sold)}</td>
              <td class="num">${f(b.stock)}</td>
              <td class="num">${A(b.revenue)}</td>
            </tr>`),{emptyText:a("common.noData")})}
      </div>
      <aside class="col card">
        <strong>${i("tag")} ${a("adm.stByBrand")}</strong>
        <div class="mt-s">
          ${o.length?o.map(([u,b])=>{let g=o[0][1]||1;return r`
            <div class="brand-row">
              <span class="tiny">${h(u)}</span>
              <span class="progress"><i data-w="${Math.max(4,Math.round(b/g*100))}%"></i></span>
              <span class="tiny b">${f(b)}</span>
            </div>`}).join(""):r`<p class="muted small">${a("common.noData")}</p>`}
        </div>
      </aside>
    </div>
    
    <div class="card mt">
      <strong>${i("search")} ${q()?"\u062C\u0633\u062A\u062C\u0648\u0647\u0627\u06CC \u0628\u062F\u0648\u0646 \u0646\u062A\u06CC\u062C\u0647 (\u06A9\u0627\u0644\u0627\u0647\u0627\u06CC \u0646\u0627\u0645\u0648\u062C\u0648\u062F)":"Missed Searches (Not in stock)"}</strong>
      ${c.length?dt([{label:q()?"\u0639\u0628\u0627\u0631\u062A \u062C\u0633\u062A\u062C\u0648 \u0634\u062F\u0647":"Query"},{label:q()?"\u062F\u0641\u0639\u0627\u062A \u062C\u0633\u062A\u062C\u0648":"Count",cls:"num"}],c.map(u=>r`
            <tr>
              <td>${h(u.q)}</td>
              <td class="num"><span class="badge-pill bp-warn">${f(u.count)}</span></td>
            </tr>`)):r`<p class="muted small mt-s">${a("common.empty")}</p>`}
    </div>`}function Od(){var e;let t=((e=p.me)==null?void 0:e.role)==="owner";return r`
    <div class="row row-between row-wrap mb">
      <div>
        <h2 class="section-title">${i("download")} ${a("adm.data")}</h2>
        <p class="muted small">${a("adm.dataHint")}</p>
      </div>
    </div>

    <div class="card">
      <strong>${i("file")} ${a("adm.dExport")}</strong>
      <div class="exp-grid mt-s">
        ${Fd.map(s=>r`
          <div class="exp-item">
            <span class="exp-ic">${i(s.icon)}</span>
            <span class="grow b small">${s.label()}</span>
            <span class="act">
              <a class="btn btn-ghost btn-xs" href="${v.url(`/api/admin/export/${s.id}`,{format:"csv"})}" download>${Rt("CSV","CSV")}</a>
              <a class="btn btn-ghost btn-xs" href="/api/admin/export/${s.id}" download>JSON</a>
            </span>
          </div>`).join("")}
      </div>
    </div>

    <div class="dev-grid mt">
      <div class="card">
        <strong>${i("save")} ${a("adm.dBackup")}</strong>
        <p class="muted small mt-s">${a("adm.dBackupHint")}</p>
        ${t?r`<button class="btn btn-primary btn-sm mt-s" data-act="adm-d-backup">${i("save")} ${a("adm.dBackup")}</button>`:r`<p class="notice notice-warn mt-s">${i("lock")}<span>${Rt("\u0641\u0642\u0637 \u0645\u0627\u0644\u06A9 \u0645\u06CC\u200C\u062A\u0648\u0627\u0646\u062F \u067E\u0634\u062A\u06CC\u0628\u0627\u0646 \u0628\u06AF\u06CC\u0631\u062F.","Only the owner can create backups.")}</span></p>`}
      </div>
      <div class="card">
        <strong>${i("refresh")} ${a("adm.dCleanup")}</strong>
        <p class="muted small mt-s">${a("adm.dCleanupHint")}</p>
        <button class="btn btn-outline btn-sm mt-s" data-act="adm-d-cleanup">${i("trash")} ${a("adm.dCleanup")}</button>
      </div>
    </div>`}function jd(t,e){var s;if(N(t),((s=e==null?void 0:e.params)==null?void 0:s.section)==="audit"){let n=new URLSearchParams(location.hash.split("?")[1]||""),o=Number(n.get("p")||0);o&&o!==Vt.page&&(Vt.page=o,T(!0))}return null}async function zd(){var e;let t={items:[],total:0};try{t=await v.get(v.url("/api/admin/visitors",{q:no.q||""}))}catch(s){return W({title:(s==null?void 0:s.message)||a("err.generic")})}return r`
    <div class="row row-between row-wrap mb">
      <h2 class="section-title">${i("users")} ${a("adm.visitors")} <span class="muted small">(${f(t.total||0)})</span></h2>
      <form class="row" data-act="adm-vis-filter">
        <input class="input" name="q" value="${h(no.q||"")}" placeholder="${a("common.search")}">
        <button class="btn btn-ghost" type="submit">${i("search")}</button>
      </form>
    </div>
    <div class="card">
      ${(e=t.items)!=null&&e.length?r`<div class="table-wrap"><table class="table">
        <thead><tr><th>${a("common.date")}</th><th>IP</th><th>${a("adm.uDevice")}</th><th>${a("adm.uBrowser")}</th><th>${a("adm.uRegion")}</th><th>${a("adm.uPath")}</th><th>${a("common.user")}</th></tr></thead>
        <tbody>${t.items.map(s=>r`<tr>
          <td class="tiny nowrap">${O(s.at)}</td>
          <td class="mono tiny">${h(s.ip||"")}</td>
          <td class="tiny">${h(s.os||"")} · ${h(s.device||"")}${s.screen?r`<div class="muted tiny">${h(s.screen)}</div>`:""}</div></td>
          <td class="tiny">${h(s.browser||"")}</td>
          <td class="tiny">${h(s.tz||"")}<div class="muted tiny">${h(s.lang||"")}</div></td>
          <td class="mono tiny">${h(s.path||"/")}</td>
          <td class="tiny">${s.userId?r`<a href="#/admin/users/${s.userId}">${i("user")}</a>`:r`<span class="muted">${a("adm.guest")}</span>`}</td>
        </tr>`)}</tbody></table></div>`:L({icon:"users",title:a("common.noResult")})}
    </div>`}var Rt,Vt,pa,so,Fd,no,ja=V(()=>{U();G();tt();K();mt();J();bt();at();Rt=(t,e)=>q()?t:e,Vt={q:"",action:"",page:1,limit:50},pa={days:30,metric:"orders"},so=[];y("adm-aud-filter",(t,e)=>{t.preventDefault();let s=new FormData(e);Vt.q=String(s.get("q")||"").trim(),Vt.action=String(s.get("action")||""),Vt.page=1,T(!0)});y("adm-aud-clear",()=>{Vt.q="",Vt.action="",Vt.page=1,T(!0)});y("adm-st-filter",(t,e)=>{t.preventDefault();let s=new FormData(e);pa.days=Number(s.get("days")||30),pa.metric=String(s.get("metric")||"orders"),T(!0)});Fd=[{id:"products",icon:"box",label:()=>a("common.products")},{id:"orders",icon:"package-check",label:()=>a("common.orders")},{id:"users",icon:"users",label:()=>a("common.users")},{id:"reviews",icon:"star",label:()=>a("adm.reviews")},{id:"tickets",icon:"ticket",label:()=>a("adm.tickets")},{id:"audit",icon:"history",label:()=>a("adm.audit")},{id:"all",icon:"download",label:()=>Rt("\u0647\u0645\u0647\u0654 \u062F\u0627\u062F\u0647\u200C\u0647\u0627","Everything")}];y("adm-d-backup",async(t,e)=>{await D(e,async()=>{try{let s=await v.post("/api/admin/backup",{});x(`${a("adm.dBackup")}: ${s.file} (${f(s.sizeKb||0)} KB)`)}catch(s){S(s)}})});y("adm-d-cleanup",async(t,e)=>{await kt({text:Rt("\u0631\u0648\u06CC\u062F\u0627\u062F\u0647\u0627\u06CC \u0642\u062F\u06CC\u0645\u06CC\u200C\u062A\u0631 \u0627\u0632 \u06F9\u06F0 \u0631\u0648\u0632 \u0648 \u0646\u0634\u0633\u062A\u200C\u0647\u0627\u06CC \u0645\u0646\u0642\u0636\u06CC \u067E\u0627\u06A9 \u0634\u0648\u0646\u062F\u061F","Remove audit entries older than 90 days and expired sessions?"),danger:!0})&&await D(e,async()=>{try{let n=await v.post("/api/admin/maintenance/cleanup",{});x(`${Rt("\u0631\u0648\u06CC\u062F\u0627\u062F","audit")}: ${f(n.auditRemoved||0)} \xB7 ${Rt("\u0646\u0634\u0633\u062A","sessions")}: ${f(n.sessionsRemoved||0)}`)}catch(n){S(n)}})});no={q:""};y("adm-vis-filter",(t,e)=>{t.preventDefault(),no.q=e.q.value,T(!0)})});var ba={};Z(ba,{mount:()=>Yd,render:()=>Ud});async function Ud(t){let e=t.params.section;return e==="ads"?_d():e==="notifications"?Vd():e==="telegram"?Gd():e==="lottery"?Kd():Wd()}async function Wd(){try{ua=(await v.get("/api/admin/coupons")).items||[]}catch(e){return W({title:(e==null?void 0:e.message)||a("err.generic")})}let t=ua.filter(e=>e.active!==!1&&new Date(e.endAt)>new Date).length;return r`
    <div class="row row-between row-wrap mb">
      <div>
        <h2 class="section-title">${i("percent")} ${a("adm.coupons")}</h2>
        <p class="muted small">${f(ua.length)} ${gt("\u06A9\u062F","codes")} · ${f(t)} ${gt("\u0641\u0639\u0627\u0644","active")}</p>
      </div>
      <button class="btn btn-primary btn-sm" data-act="adm-cp-new">${i("plus")} ${a("common.add")}</button>
    </div>

    ${dt([{label:a("cart.coupon")},{label:a("common.type")},{label:a("adm.cpValue"),cls:"num"},{label:a("adm.cpUsage"),cls:"num"},{label:a("adm.cpDates")},{label:a("common.status")},{label:"",cls:"num"}],ua.map(e=>{let s=new Date(e.endAt)<new Date;return r`
        <tr>
          <td><span class="mono b">${h(e.code)}</span>${e.note?r`<div class="tiny muted">${h(e.note)}</div>`:""}</td>
          <td>${e.type==="percent"?a("adm.cpPercent"):a("adm.cpAmount")}</td>
          <td class="num">${e.type==="percent"?`${f(e.value)}\u066A`:A(e.value)}
            ${e.maxDiscount?r`<div class="tiny muted">${gt("\u0633\u0642\u0641","max")} ${A(e.maxDiscount)}</div>`:""}
            ${e.minOrder?r`<div class="tiny muted">${gt("\u062D\u062F\u0627\u0642\u0644 \u0633\u0641\u0627\u0631\u0634","min order")} ${A(e.minOrder)}</div>`:""}</td>
          <td class="num">${f(e.used||0)} / ${f(e.usageLimit||0)}<div class="tiny muted">${gt("\u0647\u0631 \u06A9\u0627\u0631\u0628\u0631","per user")}: ${f(e.perUser||1)}</div></td>
          <td class="tiny nowrap">${O(e.startAt,{time:!1})}<div class="tiny muted">${O(e.endAt,{time:!1})}</div></td>
          <td>${s?r`<span class="badge-pill bp-muted">${a("adm.cpExpired")}</span>`:e.active===!1?r`<span class="badge-pill bp-muted">${a("common.inactive")}</span>`:r`<span class="badge-pill bp-success">${a("common.active")}</span>`}</td>
          <td>
            <div class="act">
              <button class="btn btn-ghost btn-xs" data-act="adm-cp-toggle" data-id="${e.id}" title="${a("common.active")}">${i(e.active===!1?"eye-off":"eye")}</button>
              <button class="btn btn-ghost btn-xs" data-act="adm-cp-edit" data-id="${e.id}">${i("edit")}</button>
              <button class="btn btn-ghost btn-xs" data-act="adm-cp-copy" data-code="${h(e.code)}">${i("copy")}</button>
              <button class="btn btn-ghost btn-xs" data-act="adm-cp-del" data-id="${e.id}" data-name="${h(e.code)}">${i("trash")}</button>
            </div>
          </td>
        </tr>`}),{emptyText:a("common.noData")})}`}function ai(t){var e,s,n,o,c;return ut({title:t?a("common.edit"):a("adm.cpNew"),body:r`
      <form class="form-grid" data-act="adm-cp-save" data-id="${(t==null?void 0:t.id)||""}" data-isnew="${t?"":"1"}">
        ${E({label:a("cart.coupon"),name:"code",required:!t,value:(t==null?void 0:t.code)||"",attrs:t?"readonly":"",hint:gt("\u062D\u0631\u0648\u0641 \u0628\u0632\u0631\u06AF \u0627\u0646\u06AF\u0644\u06CC\u0633\u06CC \u0648 \u0639\u062F\u062F","Uppercase letters and digits")})}
        ${z({label:a("common.type"),name:"type",value:(t==null?void 0:t.type)||"percent",options:[{value:"percent",label:a("adm.cpPercent")},{value:"amount",label:a("adm.cpAmount")}]})}
        ${E({label:a("adm.cpValue"),name:"value",type:"number",required:!0,value:(e=t==null?void 0:t.value)!=null?e:10,attrs:'min="1" max="100000000"'})}
        ${E({label:gt("\u0633\u0642\u0641 \u062A\u062E\u0641\u06CC\u0641","Max discount"),name:"maxDiscount",type:"number",value:(s=t==null?void 0:t.maxDiscount)!=null?s:0,attrs:'min="0" max="100000000"'})}
        ${E({label:gt("\u062D\u062F\u0627\u0642\u0644 \u0645\u0628\u0644\u063A \u0633\u0641\u0627\u0631\u0634","Minimum order"),name:"minOrder",type:"number",value:(n=t==null?void 0:t.minOrder)!=null?n:0,attrs:'min="0" max="100000000"'})}
        ${E({label:gt("\u0633\u0642\u0641 \u0627\u0633\u062A\u0641\u0627\u062F\u0647\u0654 \u06A9\u0644","Total usage limit"),name:"usageLimit",type:"number",value:(o=t==null?void 0:t.usageLimit)!=null?o:100,attrs:'min="1" max="100000"'})}
        ${E({label:gt("\u0633\u0642\u0641 \u0647\u0631 \u06A9\u0627\u0631\u0628\u0631","Per user"),name:"perUser",type:"number",value:(c=t==null?void 0:t.perUser)!=null?c:1,attrs:'min="1" max="100"'})}
        ${E({label:a("adm.cpStart"),name:"startAt",type:"datetime-local",value:Ls(t==null?void 0:t.startAt)})}
        ${E({label:a("adm.cpEnd"),name:"endAt",type:"datetime-local",value:Ls(t==null?void 0:t.endAt)})}
        <div class="span-2">${E({label:a("common.note"),name:"note",value:(t==null?void 0:t.note)||""})}</div>
        <div class="span-2">${$t({label:a("common.active"),name:"active",checked:t?t.active!==!1:!0})}</div>
        <button class="btn btn-primary span-2" type="submit">${a("common.save")}</button>
      </form>`})}function Ls(t){if(!t)return"";let e=new Date(t);if(Number.isNaN(e.getTime()))return"";let s=n=>String(n).padStart(2,"0");return`${e.getFullYear()}-${s(e.getMonth()+1)}-${s(e.getDate())}T${s(e.getHours())}:${s(e.getMinutes())}`}async function _d(){try{let t=await v.get("/api/admin/ads");Ms=t.items||[],za=t.slots||[]}catch(t){return W({title:(t==null?void 0:t.message)||a("err.generic")})}return r`
    <div class="row row-between row-wrap mb">
      <div>
        <h2 class="section-title">${i("image")} ${a("adm.ads")}</h2>
        <p class="muted small">${a("adm.adsHint")}</p>
      </div>
      <button class="btn btn-primary btn-sm" data-act="adm-ad-new">${i("plus")} ${a("common.add")}</button>
    </div>

    ${za.length?za.map(t=>{let e=Ms.filter(s=>s.slot===t.id);return r`
      <div class="card mb">
        <div class="row row-between">
          <strong>${i("pin")} ${h(q()?t.fa:t.en||t.fa)}</strong>
          <span class="badge-pill bp-muted">${f(e.length)}</span>
        </div>
        ${e.length?r`
          <div class="ad-rows mt-s">
            ${e.map(s=>r`
              <div class="ad-row ${s.active===!1?"off":""}">
                ${s.image?r`<img class="ad-img" src="${h(s.image)}" alt="" loading="lazy" data-h="54px" data-w="88px">`:r`<span class="ad-img ph" data-h="54px" data-w="88px">${i("image")}</span>`}
                <div class="grow">
                  <span class="b">${h(q()?s.title:s.titleEn||s.title)}</span>
                  <span class="tiny muted">${h(q()?s.text||"":s.textEn||s.text||"")}</span>
                  <span class="tiny muted nowrap">${gt("\u0627\u0632","From")} ${O(s.startAt,{time:!1})} ${gt("\u062A\u0627","to")} ${O(s.endAt,{time:!1})}${s.link?` \xB7 ${h(s.link)}`:""}</span>
                </div>
                <div class="act">
                  <button class="btn btn-ghost btn-xs" data-act="adm-ad-toggle" data-id="${s.id}">${i(s.active===!1?"eye-off":"eye")}</button>
                  <button class="btn btn-ghost btn-xs" data-act="adm-ad-edit" data-id="${s.id}">${i("edit")}</button>
                  <button class="btn btn-ghost btn-xs" data-act="adm-ad-del" data-id="${s.id}" data-name="${h(s.title)}">${i("trash")}</button>
                </div>
              </div>`).join("")}
          </div>`:r`<p class="muted small mt-s">${a("common.noData")}</p>`}
      </div>`}).join(""):L({icon:"image",title:a("common.noData")})}`}function si(t){var e;return ut({title:t?a("common.edit"):a("adm.adNew"),body:r`
      <form class="form-grid" data-act="adm-ad-save" data-id="${(t==null?void 0:t.id)||""}" data-isnew="${t?"":"1"}">
        <div class="span-2">${z({label:a("adm.adSlot"),name:"slot",value:(t==null?void 0:t.slot)||((e=za[0])==null?void 0:e.id)||"home_hero",options:za.map(s=>({value:s.id,label:q()?s.fa:s.en||s.fa}))})}</div>
        ${E({label:a("common.title"),name:"title",required:!0,value:(t==null?void 0:t.title)||""})}
        ${E({label:gt("\u0639\u0646\u0648\u0627\u0646 (\u0627\u0646\u06AF\u0644\u06CC\u0633\u06CC)","Title (EN)"),name:"titleEn",value:(t==null?void 0:t.titleEn)||""})}
        <div class="span-2">${X({label:a("common.text"),name:"text",value:(t==null?void 0:t.text)||"",rows:2})}</div>
        <div class="span-2">${X({label:gt("\u0645\u062A\u0646 (\u0627\u0646\u06AF\u0644\u06CC\u0633\u06CC)","Text (EN)"),name:"textEn",value:(t==null?void 0:t.textEn)||"",rows:2})}</div>
        ${E({label:a("common.link"),name:"link",value:(t==null?void 0:t.link)||"",hint:"#/products?cat=cases"})}
        ${E({label:a("common.image"),name:"image",value:(t==null?void 0:t.image)||"",hint:"/assets/\u2026"})}
        ${E({label:gt("\u0645\u062A\u0646 \u062F\u06A9\u0645\u0647","CTA label"),name:"cta",value:(t==null?void 0:t.cta)||""})}
        ${E({label:gt("\u0645\u062A\u0646 \u062F\u06A9\u0645\u0647 (\u0627\u0646\u06AF\u0644\u06CC\u0633\u06CC)","CTA (EN)"),name:"ctaEn",value:(t==null?void 0:t.ctaEn)||""})}
        ${E({label:gt("\u0634\u0631\u0648\u0639","Start"),name:"startAt",type:"datetime-local",value:Ls(t==null?void 0:t.startAt)})}
        ${E({label:gt("\u067E\u0627\u06CC\u0627\u0646","End"),name:"endAt",type:"datetime-local",value:Ls(t==null?void 0:t.endAt)})}
        <div class="span-2">${$t({label:a("common.active"),name:"active",checked:t?t.active!==!1:!0})}</div>
        <button class="btn btn-primary span-2" type="submit">${a("common.save")}</button>
      </form>`})}async function Vd(){let t=null;try{t=await v.get("/api/admin/notifications")}catch(n){return W({title:(n==null?void 0:n.message)||a("err.generic")})}let e=t.items||[],s=t.outbox||[];return r`
    <div class="row row-between row-wrap mb">
      <div>
        <h2 class="section-title">${i("bell")} ${a("adm.notifications")}</h2>
        <p class="muted small">${a("adm.notifHint")}</p>
      </div>
    </div>

    <div class="cart-grid">
      <div class="col">
        <form class="card" data-act="adm-notif-send">
          <strong>${i("send")} ${a("adm.notifNew")}</strong>
          <div class="form-grid mt-s">
            ${E({label:a("common.title"),name:"title",required:!0,attrs:'maxlength="120"'})}
            ${E({label:gt("\u0639\u0646\u0648\u0627\u0646 (\u0627\u0646\u06AF\u0644\u06CC\u0633\u06CC)","Title (EN)"),name:"titleEn",attrs:'maxlength="120"'})}
            <div class="span-2">${X({label:a("common.text"),name:"body",rows:3,attrs:'maxlength="600"'})}</div>
            <div class="span-2">${X({label:gt("\u0645\u062A\u0646 (\u0627\u0646\u06AF\u0644\u06CC\u0633\u06CC)","Text (EN)"),name:"bodyEn",rows:2})}</div>
            ${z({label:a("adm.notifLevel"),name:"level",value:"info",options:[{value:"info",label:a("notif.level.info")},{value:"success",label:a("notif.level.success")},{value:"warning",label:a("notif.level.warning")},{value:"error",label:a("notif.level.error")}]})}
            ${z({label:a("common.type"),name:"type",value:"announcement",options:[{value:"announcement",label:a("notif.type.announcement")},{value:"news",label:a("notif.type.news")},{value:"offer",label:a("notif.type.offer")},{value:"system",label:a("notif.type.system")}]})}
            ${E({label:a("common.link"),name:"link",hint:"#/products"})}
            ${E({label:gt("\u0634\u0646\u0627\u0633\u0647\u0654 \u06A9\u0627\u0631\u0628\u0631 (\u062E\u0627\u0644\u06CC = \u0647\u0645\u0647)","User id (empty = everyone)"),name:"userId"})}
            <div class="span-2">
              <span class="label">${a("adm.channels")}</span>
              <div class="row row-wrap mt-s">
                <label class="check"><input type="checkbox" name="ch_site" checked><span class="box">${i("check")}</span><span>${a("adm.chSite")}</span></label>
                <label class="check"><input type="checkbox" name="ch_telegram"><span class="box">${i("check")}</span><span>${a("adm.chTelegram")}</span></label>
                <label class="check"><input type="checkbox" name="ch_email"><span class="box">${i("check")}</span><span>${a("adm.chEmail")}</span></label>
                <label class="check"><input type="checkbox" name="ch_sms"><span class="box">${i("check")}</span><span>${a("adm.chSms")}</span></label>
              </div>
              <p class="hint">${a("adm.channelsHint")}</p>
            </div>
          </div>
          <button class="btn btn-primary mt-s" type="submit">${i("send")} ${a("common.send")}</button>
        </form>
      </div>

      <aside class="col">
        <div class="card">
          <strong>${i("history")} ${a("adm.notifRecent")} (${f(e.length)})</strong>
          <div class="notif-list mt-s">
            ${e.length?e.slice(0,40).map(n=>r`
              <div class="notif-item lv-${h(n.level||"info")}">
                <div class="row row-between">
                  <strong class="tiny">${h(q()?n.title:n.titleEn||n.title)}</strong>
                  <span class="tiny muted nowrap">${xt(n.createdAt)}</span>
                </div>
                ${n.body?r`<p class="tiny muted">${h(q()?n.body:n.bodyEn||n.body)}</p>`:""}
                <span class="tiny muted mono">${n.userId?h(n.userId):gt("\u0647\u0645\u0647\u0654 \u06A9\u0627\u0631\u0628\u0631\u0627\u0646","All users")}${n.link?` \xB7 ${h(n.link)}`:""}</span>
              </div>`).join(""):r`<p class="muted small">${a("common.noData")}</p>`}
          </div>
        </div>
        ${s.length?r`
        <div class="card mt">
          <strong>${i("mail")} ${gt("\u0635\u0641 \u0627\u0631\u0633\u0627\u0644 \u067E\u06CC\u0627\u0645\u06A9/\u0627\u06CC\u0645\u06CC\u0644","SMS / email outbox")} (${f(s.length)})</strong>
          <div class="mt-s">
            ${s.map(n=>r`<div class="sum-row"><span class="tiny mono">${h(n.to||n.target||"")}</span><span class="v tiny">${h(String(n.body||n.text||"").slice(0,60))}</span></div>`).join("")}
          </div>
        </div>`:""}
      </aside>
    </div>`}function Yd(t){return N(t),null}async function Gd(){var e,s;let t=null;try{t=await v.get("/api/admin/telegram")}catch(n){return W({title:(n==null?void 0:n.message)||a("err.generic")})}return r`
    <div class="cart-grid">
      <div class="col">
        <form class="card" data-act="adm-tg-save">
          <strong>${i("send")} ${a("adm.telegram")}</strong>
          <p class="muted small mt-s">${a("adm.tgHint")}</p>
          <div class="form-grid mt-s">
            <div class="span-2">${$t({label:a("adm.tgEnabled"),name:"enabled",checked:!!t.enabled})}</div>
            <div class="span-2">${E({label:a("adm.tgToken"),name:"token",hint:a("adm.tgTokenHint"),type:"password"})}</div>
            <div class="span-2">${X({label:a("adm.tgWelcome"),name:"welcome",rows:2,value:t.welcome||""})}</div>
          </div>
          <button class="btn btn-primary mt-s" type="submit">${i("check")} ${a("common.save")}</button>
        </form>
        <form class="card mt" data-act="adm-tg-test">
          <strong>${i("zap")} ${a("adm.tgTest")}</strong>
          <div class="row mt-s">
            <input class="input" name="chatId" placeholder="chat id" required>
            <button class="btn btn-ghost" type="submit">${a("common.send")}</button>
          </div>
        </form>
      </div>
      <aside class="col">
        <div class="card">
          <strong>${i("chat")} ${a("adm.tgInbox")} (${f(((e=t.inbox)==null?void 0:e.length)||0)}) · ${a("adm.tgSubs")}: ${f(t.subs||0)}</strong>
          ${t.enabled?r`
            <p class="tiny muted mt-s">
              ${gt("\u0648\u0636\u0639\u06CC\u062A \u0627\u062A\u0635\u0627\u0644 \u0631\u0628\u0627\u062A:","bot link:")}
              ${t.lastError?r`<span class="c-danger">${gt("\u062E\u0637\u0627","error")}: ${h(String(t.lastError).slice(0,120))}</span>`:r`<span class="c-success">${gt("\u0633\u0627\u0644\u0645","healthy")}</span>`}
              · ${gt("\u062D\u0627\u0644\u062A \u0627\u062A\u0635\u0627\u0644:","mode:")} ${(s=t.webhook)!=null&&s.ok?gt("\u0648\u0628\u200C\u0647\u0648\u06A9 \u2714","webhook \u2714"):gt("\u067E\u0648\u0644\u06CC\u0646\u06AF","polling")}
              ${t.lastPoll?`\xB7 ${gt("\u0622\u062E\u0631\u06CC\u0646 \u0628\u0631\u0631\u0633\u06CC:","last poll:")} ${xt(t.lastPoll)}`:""}
            </p>`:""}
          <div class="notif-list mt-s">
            ${(t.inbox||[]).slice(0,30).map(n=>r`
              <div class="notif-item lv-info">
                <div class="row row-between"><strong class="tiny">${h(n.name)}</strong><span class="tiny muted">${xt(n.at)}</span></div>
                <p class="tiny mt-s">${h(n.text)}</p>
                <form class="row mt-s" data-act="adm-tg-reply" data-chat="${h(n.chatId)}">
                  <input class="input" name="text" placeholder="${a("adm.tgReplyPh")}" required>
                  <button class="btn btn-ghost btn-sm" type="submit">${i("send")}</button>
                </form>
              </div>`)}
            ${(t.inbox||[]).length?"":r`<p class="muted small">${a("adm.tgInboxEmpty")}</p>`}
          </div>
        </div>
      </aside>
    </div>`}async function Kd(){var e;let t=null;try{t=await v.get("/api/admin/lotteries")}catch(s){return W({title:(s==null?void 0:s.message)||a("err.generic")})}return r`
    <div class="cart-grid">
      <div class="col">
        <form class="card" data-act="adm-lot-create">
          <strong>${i("gift2")} ${a("adm.lotteryNew")}</strong>
          <div class="form-grid mt-s">
            ${E({label:a("common.title"),name:"title",required:!0})}
            ${E({label:a("adm.lotPrize"),name:"prize",required:!0})}
            ${E({label:a("adm.lotEnds"),name:"endsAt",type:"datetime-local",required:!0})}
            ${E({label:a("adm.lotWinners"),name:"winnersCount",type:"number",value:"1"})}
            <div class="span-2">${z({label:a("adm.lotMode"),name:"entryMode",options:[{value:"orders",label:a("adm.lotModeOrders")},{value:"manual",label:a("adm.lotModeManual")}]})}</div>
          </div>
          <button class="btn btn-primary mt-s" type="submit">${i("plus")} ${a("common.create")}</button>
        </form>
      </div>
      <aside class="col">
        <div class="card">
          <strong>${i("gift2")} ${a("adm.lottery")} (${f(((e=t.items)==null?void 0:e.length)||0)})</strong>
          <div class="notif-list mt-s">
            ${(t.items||[]).map(s=>{var n;return r`
              <div class="notif-item lv-${s.status==="drawn"?"success":s.status==="active"?"info":"warning"}">
                <div class="row row-between"><strong class="tiny">${h(s.title)}</strong><span class="tiny muted">${s.status}</span></div>
                <p class="tiny mt-s">${a("adm.lotPrize")}: ${h(s.prize)} · ${a("adm.lotEntries")}: ${f(s.entries||0)} · ${a("adm.lotEnds")}: ${h(s.endsAt||"")}</p>
                ${(n=s.winners)!=null&&n.length?r`<p class="tiny mt-s b">${a("adm.lotWinnersList")}: ${s.winners.map(o=>h(o.name)).join("\u060C ")}</p>`:""}
                ${s.status==="active"?r`<div class="row mt-s">
                  <button class="btn btn-primary btn-sm" data-act="adm-lot-run" data-id="${s.id}">${i("sparkles")} ${a("adm.lotRun")}</button>
                  <button class="btn btn-ghost btn-sm" data-act="adm-lot-close" data-id="${s.id}">${i("close")} ${a("adm.lotClose")}</button>
                </div>`:""}
              </div>`})}
            ${(t.items||[]).length?"":r`<p class="muted small">${a("adm.lotEmpty")}</p>`}
          </div>
        </div>
      </aside>
    </div>`}var gt,ua,Ms,za,Ua,Wa,ha=V(()=>{U();G();tt();mt();J();bt();at();gt=(t,e)=>q()?t:e,ua=[],Ms=[],za=[];Ua=null;y("adm-cp-new",()=>{Ua=ai(null)});y("adm-cp-edit",(t,e)=>{Ua=ai(ua.find(s=>s.id===e.dataset.id))});y("adm-cp-toggle",async(t,e)=>{let s=ua.find(n=>n.id===e.dataset.id);if(s)try{await v.patch(`/api/admin/coupons/${s.id}`,{active:s.active===!1}),T(!0)}catch(n){S(n)}});y("adm-cp-copy",async(t,e)=>{try{await navigator.clipboard.writeText(e.dataset.code),x(a("misc.copied"))}catch(s){x(e.dataset.code)}});y("adm-cp-del",async(t,e)=>{if(await Kt(e.dataset.name))try{await v.del(`/api/admin/coupons/${e.dataset.id}`),x(a("misc.deleted")),T(!0)}catch(s){S(s)}});y("adm-cp-save",async(t,e)=>{t.preventDefault();let s=new FormData(e),n=e.dataset.isnew==="1",o={type:s.get("type"),value:Number(s.get("value")||0),maxDiscount:Number(s.get("maxDiscount")||0),minOrder:Number(s.get("minOrder")||0),usageLimit:Number(s.get("usageLimit")||100),perUser:Number(s.get("perUser")||1),active:s.get("active")==="on",note:s.get("note")||""};s.get("startAt")&&(o.startAt=new Date(s.get("startAt")).toISOString()),s.get("endAt")&&(o.endAt=new Date(s.get("endAt")).toISOString()),n&&(o.code=String(s.get("code")||"").toUpperCase()),await D(e.querySelector("button[type=submit]"),async()=>{try{n?await v.post("/api/admin/coupons",o):await v.patch(`/api/admin/coupons/${e.dataset.id}`,o),x(a("misc.saved")),Ua==null||Ua.close(),T(!0)}catch(c){S(c)}})});Wa=null;y("adm-ad-new",()=>{Wa=si(null)});y("adm-ad-edit",(t,e)=>{Wa=si(Ms.find(s=>s.id===e.dataset.id))});y("adm-ad-toggle",async(t,e)=>{let s=Ms.find(n=>n.id===e.dataset.id);if(s)try{await v.patch(`/api/admin/ads/${s.id}`,{active:s.active===!1}),T(!0)}catch(n){S(n)}});y("adm-ad-del",async(t,e)=>{if(await Kt(e.dataset.name))try{await v.del(`/api/admin/ads/${e.dataset.id}`),x(a("misc.deleted")),T(!0)}catch(s){S(s)}});y("adm-ad-save",async(t,e)=>{t.preventDefault();let s=new FormData(e),n=e.dataset.isnew==="1",o={slot:s.get("slot"),title:s.get("title"),titleEn:s.get("titleEn")||"",text:s.get("text")||"",textEn:s.get("textEn")||"",link:s.get("link")||"",image:s.get("image")||"",cta:s.get("cta")||"",ctaEn:s.get("ctaEn")||"",active:s.get("active")==="on"};s.get("startAt")&&(o.startAt=new Date(s.get("startAt")).toISOString()),s.get("endAt")&&(o.endAt=new Date(s.get("endAt")).toISOString()),await D(e.querySelector("button[type=submit]"),async()=>{try{n?await v.post("/api/admin/ads",o):await v.patch(`/api/admin/ads/${e.dataset.id}`,o),x(a("misc.saved")),Wa==null||Wa.close(),T(!0)}catch(c){S(c)}})});y("adm-notif-send",async(t,e)=>{t.preventDefault();let s=new FormData(e),n={title:String(s.get("title")||"").trim(),titleEn:String(s.get("titleEn")||"").trim(),body:String(s.get("body")||"").trim(),bodyEn:String(s.get("bodyEn")||"").trim(),level:s.get("level"),type:s.get("type"),link:String(s.get("link")||"").trim(),userId:String(s.get("userId")||"").trim(),channels:["site","telegram","email","sms"].filter(o=>s.get(`ch_${o}`))};n.title.length<3||await D(e.querySelector("button[type=submit]"),async()=>{try{let c=(await v.post("/api/admin/notifications",n)).results||{},l=Object.entries(c).map(([m,d])=>{var u;return`${m}: ${d.error?"\u2717":`\u2713${(u=d.ok)!=null?u:""}`}`}).join(" ");x(l?`${a("misc.sent")} \u2014 ${l}`:a("misc.sent"),{timeout:4200}),T(!0)}catch(o){S(o)}})});y("adm-tg-save",async(t,e)=>{var n,o;t.preventDefault();let s={enabled:!!((n=e.enabled)!=null&&n.checked)};(o=e.token)!=null&&o.value&&(s.token=e.token.value),e.welcome!==void 0&&(s.welcome=e.welcome.value),await D(e.querySelector("button[type=submit]"),async()=>{try{await v.post("/api/admin/telegram",s),x(a("common.saved")),T(!0)}catch(c){S(c)}})});y("adm-tg-test",async(t,e)=>{t.preventDefault();try{await v.post("/api/admin/telegram/test",{chatId:e.chatId.value}),x(a("misc.sent"))}catch(s){S(s)}});y("adm-tg-reply",async(t,e)=>{t.preventDefault();try{await v.post("/api/admin/telegram/reply",{chatId:e.dataset.chat,text:e.text.value}),x(a("misc.sent")),e.text.value=""}catch(s){S(s)}});y("adm-lot-create",async(t,e)=>{t.preventDefault();let s=new Date(e.endsAt.value).toISOString();await D(e.querySelector("button[type=submit]"),async()=>{try{await v.post("/api/admin/lotteries",{title:e.title.value,prize:e.prize.value,endsAt:s,winnersCount:Number(e.winnersCount.value||1),entryMode:e.entryMode.value}),x(a("common.saved")),T(!0)}catch(n){S(n)}})});y("adm-lot-run",async(t,e)=>{await kt({text:a("adm.lotRunWarn"),danger:!0})&&await D(e,async()=>{var n;try{let c=(((n=(await v.post(`/api/admin/lotteries/${e.dataset.id}/run`,{})).lottery)==null?void 0:n.winners)||[]).map(l=>l.name).join("\u060C ");Promise.resolve().then(()=>(J(),Ma)).then(({fireConfetti:l,adaptive:m})=>{let d=document.createElement("div");d.innerHTML='<div class="t-center" style="padding:40px 0;"><h1 class="slot-machine" style="font-size:32px; color:var(--accent); font-weight:800;">???</h1><p class="muted mt-s">\u062F\u0631 \u062D\u0627\u0644 \u0627\u0646\u062A\u062E\u0627\u0628 \u0628\u0631\u0646\u062F\u0647 \u062E\u0648\u0634\u200C\u0634\u0627\u0646\u0633...</p></div>';let u=m({title:"\u062F\u0631 \u062D\u0627\u0644 \u0642\u0631\u0639\u0647\u200C\u06A9\u0634\u06CC...",body:d}),b=u.panel.querySelector(".slot-machine"),g=0,$=setInterval(()=>{b.textContent="09"+Math.floor(1e8+Math.random()*9e8),g++,g>25&&(clearInterval($),b.textContent=c||"\u0628\u062F\u0648\u0646 \u0628\u0631\u0646\u062F\u0647!",l(),setTimeout(()=>{u.close(),T(!0)},5e3))},120)})}catch(o){S(o)}})});y("adm-lot-close",async(t,e)=>{await D(e,async()=>{try{await v.post(`/api/admin/lotteries/${e.dataset.id}/close`,{}),x(a("adm.lotClosed")),T(!0)}catch(s){S(s)}})})});var _a={};Z(_a,{mount:()=>am,render:()=>Qd});async function Qd(t){var c,l,m,d;let e=["settings","theme","features"].includes(t.params.section)?t.params.section:"settings",s=ni[e].filter(u=>e==="theme"?Q("theme.edit"):!0);if(!s.length)return L({icon:"lock",title:a("adm.noPermission")});let n=s.find(u=>u.id===t.params.id)||s[0];try{Ns=await v.get("/api/admin/settings")}catch(u){return W({title:(u==null?void 0:u.message)||a("err.generic")})}let o=((c=Ns.settings)==null?void 0:c[n.id])||{};return r`
    <div class="row row-between row-wrap mb">
      <h2 class="section-title">${i(n.icon)} ${n.label()}</h2>
      <span class="badge-pill bp-info">${a("adm.liveView")}</span>
    </div>
    <div class="tabs mb" data-tabs>
      ${ni[e].filter(u=>e==="theme"?Q("theme.edit"):!0).map(u=>r`
        <a class="tab ${u.id===n.id?"active":""}" href="#/admin/${e}/${u.id}">${i(u.icon)} ${u.label()}</a>`)}
    </div>
    ${n.id==="features"?Zd(((l=Ns.settings)==null?void 0:l.features)||{}):n.id==="backups"?ct("<div data-backups-panel></div>"):n.id==="partners"?tm(((d=(m=Ns.settings)==null?void 0:m.partners)==null?void 0:d.items)||[]):Jd(n.id,o)}
    <p class="hint mt">${P("\u062A\u063A\u06CC\u06CC\u0631\u0647\u0627 \u0628\u0644\u0627\u0641\u0627\u0635\u0644\u0647 \u0631\u0648\u06CC \u0633\u0627\u06CC\u062A \u0627\u0639\u0645\u0627\u0644 \u0645\u06CC\u200C\u0634\u0648\u062F\u061B \u0628\u0631\u0627\u06CC \u062F\u06CC\u062F\u0646 \u0646\u062A\u06CC\u062C\u0647 \u0635\u0641\u062D\u0647 \u0631\u0627 \u062A\u0627\u0632\u0647 \u06A9\u0646.","Changes apply to the site immediately; refresh the page to see them.")}</p>`}function Jd(t,e){let s=ri[t]||[];return r`
    <form class="card" data-act="adm-set-save" data-section="${t}">
      <div class="form-grid">
        ${s.map(n=>Xd(n,e[n.k])).join("")}
      </div>
      <div class="row row-wrap mt">
        <button class="btn btn-primary" type="submit">${i("save")} ${a("common.save")}</button>
        <button class="btn btn-ghost" type="button" data-act="adm-set-reset">${i("refresh")} ${a("common.reset")}</button>
      </div>
    </form>`}function Xd(t,e){var n,o,c,l,m;let s=t.label();switch(t.type){case"bool":return r`<div class="span-2">${$t({label:s,desc:t.hint?t.hint():"",name:t.k,checked:e!==!1})}</div>`;case"select":return z({label:s,name:t.k,value:e!=null?e:"",options:t.options().map(([d,u])=>({value:d,label:u}))});case"number":return E({label:s,name:t.k,type:"number",value:e!=null?e:"",attrs:`min="${(n=t.min)!=null?n:0}" max="${(o=t.max)!=null?o:999999999}" step="${(c=t.step)!=null?c:1}"`});case"textarea":return r`<div class="span-2">${X({label:s,name:t.k,value:e!=null?e:"",rows:3})}</div>`;case"color":return r`
        <label class="field"><span class="label">${s}</span>
          <span class="row color-row">
            <input type="color" class="color-pick" name="${t.k}-pick" value="${h(e||"#f59e0b")}" data-color-for="${t.k}">
            <input class="input mono" name="${t.k}" value="${h(e||"#f59e0b")}" maxlength="7" data-fkey="${t.k}">
          </span>
        </label>`;case"coords":return r`
        <div class="span-2"><span class="label">${s}</span>
          <div class="row">
            <input class="input mono" name="${t.k}.lat" value="${(l=e==null?void 0:e.lat)!=null?l:""}" placeholder="lat" data-fnum="1">
            <input class="input mono" name="${t.k}.lng" value="${(m=e==null?void 0:e.lng)!=null?m:""}" placeholder="lng" data-fnum="1">
            <button type="button" class="btn btn-ghost btn-sm" data-act="adm-set-geo" data-lat="${t.k}.lat" data-lng="${t.k}.lng">${i("pin")} ${a("contact.allowLocation")}</button>
          </div>
        </div>`;case"group":return r`
        <div class="span-2 group-box">
          <strong class="small">${s}</strong>
          <div class="form-grid mt-s">
            ${t.fields.map(d=>{var u,b;return d.type==="bool"?r`<div class="span-2">${$t({label:d.label(),name:`${t.k}.${d.k}`,checked:(e==null?void 0:e[d.k])!==!1})}</div>`:d.type==="number"?E({label:d.label(),name:`${t.k}.${d.k}`,type:"number",value:(u=e==null?void 0:e[d.k])!=null?u:""}):E({label:d.label(),name:`${t.k}.${d.k}`,value:(b=e==null?void 0:e[d.k])!=null?b:"",type:d.k==="pass"||d.k==="apiKey"?"password":"text"})}).join("")}
          </div>
        </div>`;case"kv":return r`
        <div class="span-2"><span class="label">${s}</span>
          <div class="form-grid">
            ${t.keys.map(d=>{var u;return r`<label class="field"><span class="label tiny muted mono">${d}</span>
              <input class="input" name="${t.k}.${d}" value="${h((u=e==null?void 0:e[d])!=null?u:"")}"></label>`})}
          </div>
        </div>`;case"kvnum":return r`
        <div class="span-2"><span class="label">${s}</span>
          <div class="form-grid">
            ${t.keys.map(d=>{var u;return r`<label class="field"><span class="label tiny muted">${a(`adm.uCols${d.charAt(0).toUpperCase()}${d.slice(1)}`)}</span>
              <input class="input" type="number" min="${t.min}" max="${t.max}" name="${t.k}.${d}" value="${(u=e==null?void 0:e[d])!=null?u:""}"></label>`})}
          </div>
        </div>`;case"multi":return r`
        <div class="span-2"><span class="label">${s}</span>
          <div class="row row-wrap">
            ${t.options().map(([d,u])=>r`<label class="check"><input type="checkbox" name="${t.k}[]" value="${d}" ${(e||[]).includes(d)?"checked":""}><span class="box">${i("check")}</span><span>${u}</span></label>`)}
          </div>
        </div>`;case"rows":return r`
        <div class="span-2">
          <div class="row row-between">
            <span class="label">${s}</span>
            <button type="button" class="btn btn-ghost btn-xs" data-act="adm-row-add" data-row="${t.k}">${i("plus")} ${a("common.add")}</button>
          </div>
          <div data-rows="${t.k}">
            ${(Array.isArray(e)?e:[]).map(d=>oi(t,d)).join("")}
          </div>
          <template data-row-tpl="${t.k}">${oi(t,null)}</template>
        </div>`;default:return E({label:s,name:t.k,value:e!=null?e:""})}}function oi(t,e){return r`
    <div class="spec-row" data-row="${t.k}">
      ${t.cols.map(s=>{var o;let n=(o=e==null?void 0:e[s.k])!=null?o:"";return s.type==="select"?r`<select class="select" data-col="${s.k}">${s.options().map(([c,l])=>r`<option value="${c}" ${String(n)===String(c)?"selected":""}>${l}</option>`)}</select>`:s.type==="number"?r`<input class="input" type="number" data-col="${s.k}" value="${h(n)}" placeholder="${s.label?s.label():s.k}">`:r`<input class="input" data-col="${s.k}" value="${h(n)}" placeholder="${s.label?s.label():s.k}">`})}
      <button type="button" class="btn btn-ghost btn-icon btn-sm" data-act="adm-row-del">${i("trash")}</button>
    </div>`}function Zd(t){let e=Object.keys(t);return r`
    <form class="card" data-act="adm-set-save" data-section="features">
      <p class="notice notice-info mb">${i("info")}<span>${a("adm.fHint")}</span></p>
      <div class="perm-grid">
        ${e.map(s=>r`
          <label class="perm-item">
            <span class="switch"><input type="checkbox" name="features.${s}" ${t[s]!==!1?"checked":""}><span class="track"></span></span>
            <span class="grow">${a(`feat.${s}`)||s}<span class="k mono">${s}</span></span>
          </label>`)}
      </div>
      <div class="row row-wrap mt">
        <button class="btn btn-primary" type="submit">${i("save")} ${a("common.save")}</button>
        <button class="btn btn-ghost" type="button" data-act="adm-set-reset">${i("refresh")} ${a("common.reset")}</button>
      </div>
    </form>`}function tm(t){let e=s=>r`
    <div class="row pt-row" data-ptrow>
      <input class="input" name="fa" placeholder="${a("adm.ptFa")}" value="${(s==null?void 0:s.fa)||""}" maxlength="60">
      <input class="input" name="en" placeholder="${a("adm.ptEn")}" value="${(s==null?void 0:s.en)||""}" maxlength="60">
      <button type="button" class="btn btn-ghost btn-sm" data-act="adm-pt-del" aria-label="${a("misc.delete")}">${i("trash")}</button>
    </div>`;return r`
    <form class="card" data-act="adm-set-save" data-section="partners">
      <p class="notice notice-info mb">${i("info")}<span>${a("adm.ptHint")}</span></p>
      <div class="col" data-ptlist>${t.map(s=>e(s)).join("")||e(null)}</div>
      <div class="row row-wrap mt">
        <button type="button" class="btn btn-ghost" data-act="adm-pt-add">${i("plus")} ${a("adm.ptAdd")}</button>
        <button class="btn btn-primary" type="submit">${i("save")} ${a("common.save")}</button>
      </div>
    </form>`}function em(t,e){var n,o,c,l,m,d,u;let s={};if(e==="features")return t.querySelectorAll('input[type=checkbox][name^="features."]').forEach(b=>{s[b.name.slice(9)]=b.checked}),s;if(e==="partners")return s.items=[...t.querySelectorAll("[data-ptrow]")].map(b=>({fa:b.querySelector("[name=fa]").value.trim(),en:b.querySelector("[name=en]").value.trim()})).filter(b=>b.fa||b.en),s;for(let b of ri[e]||[])switch(b.type){case"bool":{let g=t.querySelector(`[name="${b.k}"]`);g&&(s[b.k]=g.checked);break}case"multi":{s[b.k]=[...t.querySelectorAll(`[name="${b.k}[]"]`)].filter(g=>g.checked).map(g=>g.value);break}case"rows":{s[b.k]=[...t.querySelectorAll(`[data-rows="${b.k}"] [data-row]`)].map(g=>{var w;let $={};for(let k of b.cols){let C=g.querySelector(`[data-col="${k.k}"]`);$[k.k]=k.type==="number"?Number((C==null?void 0:C.value)||0):String((w=C==null?void 0:C.value)!=null?w:"")}return $});break}case"kv":{let g={};for(let $ of b.keys)g[$]=String((o=(n=t.querySelector(`[name="${b.k}.${$}"]`))==null?void 0:n.value)!=null?o:"");s[b.k]=g;break}case"group":{let g={};for(let $ of b.fields){let w=t.querySelector(`[name="${b.k}.${$.k}"]`);w&&(g[$.k]=$.type==="bool"?w.checked:$.type==="number"?Number(w.value||0):String((c=w.value)!=null?c:""))}s[b.k]=g;break}case"kvnum":{let g={};for(let $ of b.keys)g[$]=Number(((l=t.querySelector(`[name="${b.k}.${$}"]`))==null?void 0:l.value)||0);s[b.k]=g;break}case"coords":{let g=(m=t.querySelector(`[name="${b.k}.lat"]`))==null?void 0:m.value,$=(d=t.querySelector(`[name="${b.k}.lng"]`))==null?void 0:d.value;g!==""&&$!==""&&g!==void 0&&(s[b.k]={lat:Number(g),lng:Number($)});break}case"number":{let g=t.querySelector(`[name="${b.k}"]`);g&&g.value!==""&&(s[b.k]=Number(g.value));break}default:{let g=t.querySelector(`[name="${b.k}"]`);g&&(s[b.k]=String((u=g.value)!=null?u:""))}}return s}function am(t,e){var s;return N(t),((s=e==null?void 0:e.params)==null?void 0:s.id)==="backups"&&ii(t),t.querySelectorAll("[data-color-for]").forEach(n=>{let o=t.querySelector(`[name="${n.dataset.colorFor}"]`);n.addEventListener("input",()=>{o&&(o.value=n.value)}),o==null||o.addEventListener("input",()=>{/^#[0-9a-f]{6}$/i.test(o.value)&&(n.value=o.value)})}),null}async function ii(t){var s;let e=t.querySelector("[data-backups-panel]");if(e){e.innerHTML='<div class="sk sk-line w70"></div>';try{let n=await v.get("/api/admin/backups");e.innerHTML=r`
      <div class="card">
        <div class="row row-between row-wrap">
          <strong>${i("download")} ${a("adm.sBackups")}</strong>
          <div class="row row-wrap">
            <a class="btn btn-ghost btn-sm" href="/api/admin/dump" download>${i("download")} ${a("adm.dumpFull")}</a>
            <button type="button" class="btn btn-primary btn-sm" data-act="adm-backup-now">${i("plus")} ${a("adm.backupNow")}</button>
          </div>
        </div>
        <p class="muted small mt-s">${a("adm.backupsHint",{hours:f(n.everyHours||12),keep:f(n.keep||14)})}</p>
        ${(s=n.items)!=null&&s.length?r`<div class="table-wrap mt-s"><table class="table">
          <thead><tr><th>${a("common.date")}</th><th>${a("adm.backupSize")}</th><th></th></tr></thead>
          <tbody>${n.items.map(o=>r`<tr>
            <td class="tiny">${O(o.at)}</td>
            <td class="tiny muted">${f(Math.round(o.bytes/1024))} KB</td>
            <td><div class="row row-end">
              <a class="btn btn-ghost btn-sm" href="/api/admin/backups/${o.id}/download" download>${i("download")} ${a("common.download")}</a>
              <button type="button" class="btn btn-danger btn-sm" data-act="adm-backup-restore" data-id="${o.id}">${i("refresh")} ${a("adm.backupRestore")}</button>
            </div></td>
          </tr>`)}</tbody></table></div>`:r`<p class="muted small mt-s">${a("adm.backupsEmpty")}</p>`}
      </div>`}catch(n){e.innerHTML=r`<div class="notice notice-error">${i("alert")} ${(n==null?void 0:n.message)||a("err.generic")}</div>`}}}var P,ri,ni,Ns,Va=V(()=>{U();G();tt();K();mt();J();bt();at();P=(t,e)=>q()?t:e,ri={mailsms:[{k:"mail",label:()=>a("adm.mailCfg"),type:"group",fields:[{k:"enabled",label:()=>a("adm.mailEnabled"),type:"bool"},{k:"host",label:()=>"SMTP host",type:"text"},{k:"port",label:()=>"SMTP port",type:"number",min:1,max:65535},{k:"user",label:()=>a("common.username"),type:"text"},{k:"pass",label:()=>a("common.password"),type:"text"},{k:"from",label:()=>a("adm.mailFrom"),type:"text"}]},{k:"sms",label:()=>a("adm.smsCfg"),type:"group",fields:[{k:"enabled",label:()=>a("adm.smsEnabled"),type:"bool"},{k:"apiKey",label:()=>a("adm.smsKey"),type:"text"},{k:"sender",label:()=>a("adm.smsSender"),type:"text"}]}],store:[{k:"name",label:()=>P("\u0646\u0627\u0645 \u0641\u0631\u0648\u0634\u06AF\u0627\u0647","Store name"),type:"text"},{k:"nameEn",label:()=>P("\u0646\u0627\u0645 (\u0627\u0646\u06AF\u0644\u06CC\u0633\u06CC)","Name (EN)"),type:"text"},{k:"tagline",label:()=>P("\u0634\u0639\u0627\u0631","Tagline"),type:"text"},{k:"taglineEn",label:()=>P("\u0634\u0639\u0627\u0631 (\u0627\u0646\u06AF\u0644\u06CC\u0633\u06CC)","Tagline (EN)"),type:"text"},{k:"phone",label:()=>a("contact.phone"),type:"text"},{k:"phone2",label:()=>a("contact.mobile"),type:"text"},{k:"phone3",label:()=>P("\u0634\u0645\u0627\u0631\u0647\u0654 \u0633\u0648\u0645 (\u0627\u062E\u062A\u06CC\u0627\u0631\u06CC)","Third phone (optional)"),type:"text"},{k:"whatsapp",label:()=>a("contact.whatsapp"),type:"text"},{k:"email",label:()=>a("common.email"),type:"text"},{k:"city",label:()=>a("common.city"),type:"text"},{k:"cityEn",label:()=>P("\u0634\u0647\u0631 (\u0627\u0646\u06AF\u0644\u06CC\u0633\u06CC)","City (EN)"),type:"text"},{k:"address",label:()=>a("common.address"),type:"textarea"},{k:"addressEn",label:()=>P("\u0622\u062F\u0631\u0633 (\u0627\u0646\u06AF\u0644\u06CC\u0633\u06CC)","Address (EN)"),type:"textarea"},{k:"description",label:()=>a("common.description"),type:"textarea"},{k:"descriptionEn",label:()=>P("\u062A\u0648\u0636\u06CC\u062D\u0627\u062A (\u0627\u0646\u06AF\u0644\u06CC\u0633\u06CC)","Description (EN)"),type:"textarea"},{k:"enamad",label:()=>P("\u06A9\u062F \u0646\u0645\u0627\u062F \u0627\u0639\u062A\u0645\u0627\u062F","Trust symbol code"),type:"text"},{k:"established",label:()=>P("\u0633\u0627\u0644 \u062A\u0623\u0633\u06CC\u0633 (\u0634\u0645\u0633\u06CC)","Founded year (Solar)"),type:"number",min:1300,max:1500},{k:"mapCoords",label:()=>P("\u0645\u062E\u062A\u0635\u0627\u062A \u0646\u0642\u0634\u0647","Map coordinates"),type:"coords"},{k:"socials",label:()=>P("\u0634\u0628\u06A9\u0647\u200C\u0647\u0627\u06CC \u0627\u062C\u062A\u0645\u0627\u0639\u06CC","Social links"),type:"kv",keys:["instagram","telegram","eitaa","whatsapp","website"]},{k:"workingHours",label:()=>a("footer.workingHours"),type:"rows",cols:[{k:"fa",label:()=>P("\u0631\u0648\u0632","Day (FA)")},{k:"en",label:()=>P("Day (EN)","Day (EN)")},{k:"time",label:()=>P("\u0633\u0627\u0639\u062A","Hours (FA)")},{k:"timeEn",label:()=>P("Hours (EN)","Hours (EN)")}]}],theme:[{k:"theme",label:()=>P("\u0642\u0627\u0644\u0628 \u0638\u0627\u0647\u0631\u06CC (\u062A\u0645)","Design Theme"),type:"select",options:()=>[["default",P("\u067E\u06CC\u0634\u200C\u0641\u0631\u0636 (\u06CC\u0627\u0633\u0627\u06CC\u06CC/\u0641\u0631\u0648\u0634\u06AF\u0627\u0647)","Default")],["tehran-nights",P("\u0634\u0628\u200C\u0647\u0627\u06CC \u062A\u0647\u0631\u0627\u0646","Tehran Nights")],["milad",P("\u0628\u0631\u062C \u0645\u06CC\u0644\u0627\u062F","Milad Tower")],["azadi",P("\u0645\u06CC\u062F\u0627\u0646 \u0622\u0632\u0627\u062F\u06CC","Azadi Square")],["lalehzar",P("\u0644\u0627\u0644\u0647\u200C\u0632\u0627\u0631","Lalehzar")],["tochal",P("\u062A\u0648\u0686\u0627\u0644","Tochal")],["valiasr",P("\u0648\u0644\u06CC\u0639\u0635\u0631","Valiasr")],["bazaar",P("\u0628\u0627\u0632\u0627\u0631 \u0628\u0632\u0631\u06AF","Grand Bazaar")],["chitgar",P("\u0686\u06CC\u062A\u06AF\u0631","Chitgar")],["tajrish",P("\u062A\u062C\u0631\u06CC\u0634","Tajrish")],["darband",P("\u062F\u0631\u0628\u0646\u062F","Darband")]]},{k:"accent",label:()=>a("adm.tAccent"),type:"color"},{k:"mode",label:()=>a("adm.tMode"),type:"select",options:()=>[["dark",a("theme.dark")],["light",a("theme.light")]]},{k:"bgStyle",label:()=>a("adm.tBg"),type:"select",options:()=>[["waves",P("\u0645\u0648\u062C \u0648 \u062A\u0647\u0631\u0627\u0646","Waves & port")],["grid",P("\u0634\u0628\u06A9\u0647\u200C\u0627\u06CC","Grid")],["plain",P("\u0633\u0627\u062F\u0647","Plain")]]},{k:"density",label:()=>a("adm.tDensity"),type:"select",options:()=>[["compact","Compact"],["normal","Normal"],["comfy","Comfy"]]},{k:"contrast",label:()=>a("adm.tContrast"),type:"select",options:()=>[["normal","Normal"],["high","High"]]},{k:"radius",label:()=>a("adm.tRadius"),type:"number",min:0,max:32},{k:"portTheme",label:()=>a("adm.tPort"),type:"bool",hint:()=>a("adm.tPortHint")},{k:"animations",label:()=>a("adm.tAnim"),type:"bool"}],ui:[{k:"searchPosition",label:()=>a("adm.uSearchPos"),type:"select",options:()=>[["start",a("adm.uPosStart")],["center",a("adm.uPosCenter")],["end",a("adm.uPosEnd")]]},{k:"headerLayout",label:()=>a("adm.uHeader"),type:"select",options:()=>[["logoStart",a("adm.uLayoutLogoStart")],["split",a("adm.uLayoutSplit")],["centered",a("adm.uLayoutCentered")]]},{k:"navStyle",label:()=>a("adm.uNav"),type:"select",options:()=>[["pills","Pills"],["underline","Underline"]]},{k:"cardStyle",label:()=>a("adm.uCards"),type:"select",options:()=>[["grid",a("catalog.viewGrid")],["list",a("catalog.viewList")]]},{k:"stickyHeader",label:()=>a("adm.uSticky"),type:"bool"},{k:"showTicker",label:()=>a("adm.uTicker"),type:"bool"},{k:"tickerSpeed",label:()=>a("adm.uTickerSpeed"),type:"number",min:10,max:90},{k:"quickView",label:()=>a("adm.uQuick"),type:"bool"},{k:"floatingChat",label:()=>a("adm.uChat"),type:"bool"},{k:"showBreadcrumbs",label:()=>a("adm.uCrumb"),type:"bool"},{k:"columns",label:()=>a("adm.uCols"),type:"kvnum",keys:["mobile","tablet","desktop","wide"],min:1,max:8},{k:"productCardInfo",label:()=>a("adm.uCardInfo"),type:"multi",options:()=>[["brand",a("common.brand")],["stock",a("common.stock")],["rating",a("common.rating")],["warranty",a("pdp.warranty")],["sold",a("pdp.sold")]]},{k:"tickerItems",label:()=>a("adm.uTickerItems"),type:"rows",cols:[{k:"text",label:()=>P("\u0645\u062A\u0646","Text")},{k:"textEn",label:()=>P("\u0645\u062A\u0646 (\u0627\u0646\u06AF\u0644\u06CC\u0633\u06CC)","Text (EN)")},{k:"link",label:()=>P("\u0644\u06CC\u0646\u06A9","Link")}]}],shipping:[{k:"pickupEnabled",label:()=>a("checkout.pickup"),type:"bool"},{k:"courierEnabled",label:()=>a("checkout.courier"),type:"bool"},{k:"courierBase",label:()=>P("\u0647\u0632\u06CC\u0646\u0647\u0654 \u067E\u0627\u06CC\u0647\u0654 \u0627\u0631\u0633\u0627\u0644","Base shipping fee"),type:"number",min:0,max:1e7},{k:"freeOver",label:()=>P("\u0627\u0631\u0633\u0627\u0644 \u0631\u0627\u06CC\u06AF\u0627\u0646 \u0627\u0632 \u0645\u0628\u0644\u063A","Free shipping over"),type:"number",min:0,max:1e8},{k:"handlingHours",label:()=>P("\u0632\u0645\u0627\u0646 \u0622\u0645\u0627\u062F\u0647\u200C\u0633\u0627\u0632\u06CC (\u0633\u0627\u0639\u062A)","Handling hours"),type:"number",min:1,max:720},{k:"expressEnabled",label:()=>a("checkout.express"),type:"bool"},{k:"expressFee",label:()=>P("\u0647\u0632\u06CC\u0646\u0647\u0654 \u0627\u0631\u0633\u0627\u0644 \u0641\u0648\u0631\u06CC","Express fee"),type:"number",min:0,max:1e7},{k:"insuranceRatePct",label:()=>P("\u0646\u0631\u062E \u0628\u06CC\u0645\u0647 (\u062F\u0631\u0635\u062F)","Insurance rate (%)"),type:"number",min:0,max:20,step:.1},{k:"insuranceMin",label:()=>P("\u062D\u062F\u0627\u0642\u0644 \u0647\u0632\u06CC\u0646\u0647\u0654 \u0628\u06CC\u0645\u0647","Insurance minimum"),type:"number",min:0,max:1e7},{k:"zones",label:()=>a("checkout.zone"),type:"rows",cols:[{k:"id",label:()=>P("\u0634\u0646\u0627\u0633\u0647","ID"),type:"select",options:()=>[["city",P("\u062F\u0627\u062E\u0644 \u0634\u0647\u0631","City")],["province",P("\u0627\u0633\u062A\u0627\u0646","Province")],["country",P("\u06A9\u0634\u0648\u0631","Country")],["island",P("\u062C\u0632\u0627\u06CC\u0631","Islands")]]},{k:"name",label:()=>P("\u0646\u0627\u0645","Name")},{k:"nameEn",label:()=>P("\u0646\u0627\u0645 (\u0627\u0646\u06AF\u0644\u06CC\u0633\u06CC)","Name (EN)")},{k:"fee",label:()=>P("\u0647\u0632\u06CC\u0646\u0647","Fee"),type:"number"},{k:"eta",label:()=>P("\u0632\u0645\u0627\u0646 \u062A\u062D\u0648\u06CC\u0644","ETA")}]}],plus:[{k:"enabled",label:()=>a("feat.plus"),type:"bool"},{k:"price",label:()=>P("\u0645\u0628\u0644\u063A \u0627\u0634\u062A\u0631\u0627\u06A9","Price"),type:"number",min:0,max:1e8},{k:"durationDays",label:()=>P("\u0645\u062F\u062A (\u0631\u0648\u0632)","Duration (days)"),type:"number",min:1,max:365},{k:"discountPct",label:()=>P("\u062A\u062E\u0641\u06CC\u0641 \u062F\u0627\u0626\u0645\u06CC (\u062F\u0631\u0635\u062F)","Permanent discount (%)"),type:"number",min:0,max:30,step:.5},{k:"freeShippingMin",label:()=>P("\u0627\u0631\u0633\u0627\u0644 \u0631\u0627\u06CC\u06AF\u0627\u0646 \u0627\u0632 \u0645\u0628\u0644\u063A","Free shipping over"),type:"number",min:0,max:1e8},{k:"autoInsurance",label:()=>P("\u0628\u06CC\u0645\u0647\u0654 \u062E\u0648\u062F\u06A9\u0627\u0631","Auto insurance"),type:"bool"},{k:"prioritySupport",label:()=>P("\u067E\u0634\u062A\u06CC\u0628\u0627\u0646\u06CC \u0627\u0648\u0644\u0648\u06CC\u062A\u200C\u062F\u0627\u0631","Priority support"),type:"bool"},{k:"expressDiscountPct",label:()=>P("\u062A\u062E\u0641\u06CC\u0641 \u0627\u0631\u0633\u0627\u0644 \u0641\u0648\u0631\u06CC (\u062F\u0631\u0635\u062F)","Express discount (%)"),type:"number",min:0,max:100},{k:"perks",label:()=>a("acc.plusPerks"),type:"rows",cols:[{k:"id",label:()=>"id"},{k:"fa",label:()=>P("\u0645\u0632\u06CC\u062A","Perk (FA)")},{k:"en",label:()=>P("Perk (EN)","Perk (EN)")}]}],orders:[{k:"minOrder",label:()=>P("\u062D\u062F\u0627\u0642\u0644 \u0645\u0628\u0644\u063A \u0633\u0641\u0627\u0631\u0634","Minimum order"),type:"number",min:0,max:1e8},{k:"walletEnabled",label:()=>a("feat.wallet"),type:"bool"},{k:"gatewayEnabled",label:()=>a("pm.gateway"),type:"bool"},{k:"gatewayMode",label:()=>P("\u062D\u0627\u0644\u062A \u062F\u0631\u06AF\u0627\u0647","Gateway mode"),type:"select",options:()=>[["demo",P("\u0622\u0632\u0645\u0627\u06CC\u0634\u06CC","Demo")],["live",P("\u0648\u0627\u0642\u0639\u06CC","Live")]]},{k:"codEnabled",label:()=>a("pm.cod"),type:"bool"},{k:"autoCancelHours",label:()=>P("\u0644\u063A\u0648 \u062E\u0648\u062F\u06A9\u0627\u0631 \u067E\u0633 \u0627\u0632 (\u0633\u0627\u0639\u062A)","Auto-cancel after (h)"),type:"number",min:1,max:720},{k:"stockReserveMinutes",label:()=>P("\u0631\u0632\u0631\u0648 \u0645\u0648\u062C\u0648\u062F\u06CC (\u062F\u0642\u06CC\u0642\u0647)","Stock reserve (min)"),type:"number",min:0,max:1440},{k:"refundToWallet",label:()=>P("\u0628\u0627\u0632\u06AF\u0634\u062A \u0648\u062C\u0647 \u0628\u0647 \u06A9\u06CC\u0641 \u067E\u0648\u0644","Refund to wallet"),type:"bool"}],seo:[{k:"title",label:()=>P("\u0639\u0646\u0648\u0627\u0646 \u0633\u0627\u06CC\u062A","Site title"),type:"text"},{k:"description",label:()=>P("\u062A\u0648\u0636\u06CC\u062D\u0627\u062A \u0645\u062A\u0627","Meta description"),type:"textarea"},{k:"keywords",label:()=>P("\u06A9\u0644\u06CC\u062F\u0648\u0627\u0698\u0647\u200C\u0647\u0627","Keywords"),type:"text"},{k:"googleSiteVerification",label:()=>P("\u06A9\u062F \u062A\u0623\u06CC\u06CC\u062F \u0633\u0631\u0686 \u06A9\u0646\u0633\u0648\u0644 \u06AF\u0648\u06AF\u0644","Google Site Verification Code"),type:"text"}],currency:[{k:"code",label:()=>P("\u06A9\u062F \u0627\u0631\u0632","Currency code"),type:"text"},{k:"label",label:()=>P("\u0646\u0627\u0645 \u0648\u0627\u062D\u062F","Unit label"),type:"text"},{k:"labelEn",label:()=>P("Unit (EN)","Unit (EN)"),type:"text"}],auth:[{k:"allowRegistration",label:()=>P("\u062B\u0628\u062A\u200C\u0646\u0627\u0645 \u0628\u0627\u0632 \u0628\u0627\u0634\u062F","Allow registration"),type:"bool"},{k:"otpMode",label:()=>P("\u062D\u0627\u0644\u062A \u0627\u0631\u0633\u0627\u0644 \u06A9\u062F","OTP mode"),type:"select",options:()=>[["demo",P("\u0622\u0632\u0645\u0627\u06CC\u0634\u06CC","Demo")],["live",P("\u0648\u0627\u0642\u0639\u06CC","Live")]]},{k:"requirePhone",label:()=>P("\u0634\u0645\u0627\u0631\u0647\u0654 \u0645\u0648\u0628\u0627\u06CC\u0644 \u0627\u0644\u0632\u0627\u0645\u06CC","Require phone"),type:"bool"},{k:"force2faStaff",label:()=>P("\u06F2FA \u0627\u062C\u0628\u0627\u0631\u06CC \u06A9\u0627\u0631\u06A9\u0646\u0627\u0646","Force 2FA for staff"),type:"bool"},{k:"sessionDays",label:()=>P("\u0637\u0648\u0644 \u0646\u0634\u0633\u062A (\u0631\u0648\u0632)","Session days"),type:"number",min:1,max:90}],contact:[{k:"supportNote",label:()=>P("\u067E\u06CC\u0627\u0645 \u0628\u062E\u0634 \u067E\u0634\u062A\u06CC\u0628\u0627\u0646\u06CC","Support note"),type:"textarea"},{k:"supportNoteEn",label:()=>P("Support note (EN)","Support note (EN)"),type:"textarea"}]},ni={settings:[{id:"store",icon:"store",label:()=>a("adm.sStore")},{id:"shipping",icon:"truck",label:()=>a("adm.sShipping")},{id:"plus",icon:"sparkles",label:()=>a("adm.sPlus")},{id:"orders",icon:"card",label:()=>a("adm.sOrders")},{id:"auth",icon:"key",label:()=>a("adm.sAuth")},{id:"seo",icon:"search",label:()=>a("adm.sSeo")},{id:"currency",icon:"wallet",label:()=>P("\u0648\u0627\u062D\u062F \u067E\u0648\u0644","Currency")},{id:"partners",icon:"star",label:()=>a("adm.sPartners")},{id:"contact",icon:"headset",label:()=>a("common.support")},{id:"mailsms",icon:"send",label:()=>a("adm.mailsms")}],theme:[{id:"theme",icon:"sun",label:()=>a("adm.sTheme")},{id:"ui",icon:"grid",label:()=>a("adm.sUi")}],features:[{id:"features",icon:"zap",label:()=>a("adm.sFeatures")},{id:"backups",icon:"download",label:()=>a("adm.sBackups")}]},Ns=null;y("adm-pt-add",t=>{t.target.closest("form").querySelector("[data-ptlist]").insertAdjacentHTML("beforeend",`<div class="row pt-row" data-ptrow><input class="input" name="fa" placeholder="${a("adm.ptFa")}" value="" maxlength="60"><input class="input" name="en" placeholder="${a("adm.ptEn")}" value="" maxlength="60"><button type="button" class="btn btn-ghost btn-sm" data-act="adm-pt-del" aria-label="${a("misc.delete")}">${i("trash")}</button></div>`)});y("adm-pt-del",t=>{let e=t.target.closest("form");e.querySelectorAll("[data-ptrow]").length>1?t.target.closest("[data-ptrow]").remove():e.querySelectorAll("[data-ptrow] input").forEach(n=>n.value="")});y("adm-set-save",async(t,e)=>{t.preventDefault();let s=e.dataset.section,n=em(e,s);if(s==="theme"&&n.accent&&!/^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(n.accent)){Y(q()?"\u0631\u0646\u06AF \u0628\u0627\u06CC\u062F \u0628\u0627 \u0641\u0631\u0645\u062A #RRGGBB \u0628\u0627\u0634\u062F.":"Colour must be in #RRGGBB format.");return}await D(e.querySelector("button[type=submit]"),async()=>{try{await v.patch(`/api/admin/settings/${s}`,{value:n}),await Ot({silent:!0}),Ce(),x(a("adm.sSaved")),T(!0)}catch(o){S(o)}})});y("adm-set-reset",()=>T(!0));y("adm-set-geo",(t,e)=>{if(!navigator.geolocation){Y(a("contact.locationDenied"));return}navigator.geolocation.getCurrentPosition(s=>{let n=e.closest("form"),o=n.querySelector(`[name="${e.dataset.lat}"]`),c=n.querySelector(`[name="${e.dataset.lng}"]`);o&&(o.value=s.coords.latitude.toFixed(5)),c&&(c.value=s.coords.longitude.toFixed(5)),x(a("contact.locationOn"))},()=>Y(a("contact.locationDenied")),{timeout:9e3})});y("adm-row-add",(t,e)=>{let s=e.dataset.row,n=e.closest("form"),o=n.querySelector(`[data-row-tpl="${s}"]`),c=n.querySelector(`[data-rows="${s}"]`);if(!o||!c)return;let l=document.createElement("div");l.innerHTML=o.innerHTML.trim();let m=l.firstElementChild;m&&(m.querySelectorAll("input").forEach(d=>{d.value=""}),c.appendChild(m))});y("adm-row-del",(t,e)=>{var s;(s=e.closest("[data-row]"))==null||s.remove()});y("adm-backup-now",async(t,e)=>{await D(e,async()=>{var s;try{await v.post("/api/admin/backups",{}),x(a("adm.backupDone")),await ii(document.querySelector("#view")||((s=e.closest("#view"))==null?void 0:s.parentNode)||document)}catch(n){S(n)}})});y("adm-backup-restore",async(t,e)=>{await kt({text:a("adm.backupRestoreWarn"),danger:!0})&&await D(e,async()=>{try{await v.post("/api/admin/backups/restore",{id:e.dataset.id}),x(a("adm.backupRestored")),setTimeout(()=>location.reload(),900)}catch(n){S(n)}})})});var bi={};Z(bi,{mount:()=>mm,render:()=>sm});async function sm(t){try{pi=(await v.get("/api/admin/pages")).pages||{}}catch(s){return W({title:(s==null?void 0:s.message)||a("err.generic")})}let e=Ya.find(s=>s.key===t.params.id)?t.params.id:"";return r`
    <div class="row row-between row-wrap mb">
      <h2 class="section-title">${i("file")} ${a("adm.pages")}</h2>
      <span class="badge-pill bp-muted">${f(Ya.length)} ${_("\u0635\u0641\u062D\u0647","pages")}</span>
    </div>

    <div class="page-grid">
      <div class="card page-nav">
        ${Ya.map(s=>r`
          <a class="pg-item ${s.key===e?"active":""}" href="#/admin/pages/${s.key}">
            ${i(s.icon)}<span class="grow">${ui(s.key)}</span>
          </a>`).join("")}
      </div>
      <div>${e?nm(Ya.find(s=>s.key===e)):L({icon:"file",title:a("adm.pagesPick"),text:a("adm.pagesPickHint")})}</div>
    </div>`}function ui(t){return{about:a("footer.about"),guide:a("footer.guide"),service:a("footer.service"),faq:a("footer.faq"),terms:a("footer.terms"),privacy:a("footer.privacy"),insurance:a("footer.insurance"),ticketRules:a("acc.ticketRules"),bugReport:a("feedback.bug"),contact:a("footer.contact"),installments:_("\u062E\u0631\u06CC\u062F \u0627\u0642\u0633\u0627\u0637\u06CC","Installments")}[t]||t}function nm(t){let e=pi[t.key]||(t.key==="faq"?[]:{});return r`
    <form class="card" data-act="adm-pg-save" data-key="${t.key}">
      <div class="row row-between row-wrap mb-s">
        <strong>${i(t.icon)} ${ui(t.key)}</strong>
        <a class="btn btn-ghost btn-xs" href="#/pages/${t.key}" target="_blank" rel="noopener">${i("external")} ${a("adm.view")}</a>
      </div>
      <p class="notice notice-info mb">${i("info")}<span>${a("adm.pgHint")}</span></p>
      ${t.blocks.map(s=>om(s,e)).join("")}
      <div class="row row-wrap mt">
        <button class="btn btn-primary" type="submit">${i("save")} ${a("common.save")}</button>
        <a class="btn btn-ghost" href="#/admin/pages/${t.key}">${a("common.reset")}</a>
      </div>
    </form>`}function om(t,e){switch(t){case"hero":{let s=e.hero||{};return r`
        <fieldset class="pg-block">
          <legend>${i("sparkles")} ${_("\u0633\u0631\u0628\u0631\u06AF \u0635\u0641\u062D\u0647","Page hero")}</legend>
          <div class="form-grid">
            ${E({label:a("common.title"),name:"hero.title",value:s.title||"",span2:!0})}
            ${E({label:_("\u0639\u0646\u0648\u0627\u0646 (\u0627\u0646\u06AF\u0644\u06CC\u0633\u06CC)","Title (EN)"),name:"hero.titleEn",value:s.titleEn||"",span2:!0})}
            ${X({label:_("\u0632\u06CC\u0631\u0639\u0646\u0648\u0627\u0646","Subtitle"),name:"hero.subtitle",value:s.subtitle||"",rows:2,span2:!0})}
            ${X({label:_("\u0632\u06CC\u0631\u0639\u0646\u0648\u0627\u0646 (\u0627\u0646\u06AF\u0644\u06CC\u0633\u06CC)","Subtitle (EN)"),name:"hero.subtitleEn",value:s.subtitleEn||"",rows:2,span2:!0})}
          </div>
        </fieldset>`}case"intro":return oo("intro",_("\u0645\u0642\u062F\u0645\u0647","Intro"),e.intro||"",e.introEn||"");case"body":return oo("body",_("\u0645\u062A\u0646 \u0627\u0635\u0644\u06CC","Body text"),e.body||"",e.bodyEn||"");case"notice":return oo("notice",_("\u0647\u0634\u062F\u0627\u0631/\u0646\u06A9\u062A\u0647","Notice"),e.notice||"",e.noticeEn||"",2);case"rules":return ci("rules",_("\u0628\u0646\u062F\u0647\u0627 (\u0647\u0631 \u062E\u0637 \u06CC\u06A9 \u0628\u0646\u062F)","Clauses (one per line)"),e.rules||[],e.rulesEn||[]);case"hints":return ci("hints",_("\u0631\u0627\u0647\u0646\u0645\u0627\u06CC\u06CC\u200C\u0647\u0627 (\u0647\u0631 \u062E\u0637 \u06CC\u06A9\u06CC)","Hints (one per line)"),e.hints||[],e.hintsEn||[]);case"sections":return rm(e.sections||[]);case"steps":return Is("steps",_("\u06AF\u0627\u0645\u200C\u0647\u0627","Steps"),e.steps||[],["title","titleEn","body","bodyEn"],"list");case"items":return Is("items",_("\u0645\u0648\u0627\u0631\u062F \u062E\u062F\u0645\u0627\u062A","Service items"),e.items||[],["icon","title","titleEn","body","bodyEn"],"grid");case"tips":return Is("tips",_("\u0646\u06A9\u062A\u0647\u200C\u0647\u0627","Tips"),e.tips||[],["fa","en"],"grid");case"stats":return Is("stats",_("\u0622\u0645\u0627\u0631\u0647\u0627\u06CC \u0635\u0641\u062D\u0647\u0654 \u062F\u0631\u0628\u0627\u0631\u0647\u0654 \u0645\u0627","About-page stats"),e.stats||[],["fa","en","key"],"grid");case"faq":return lm(Array.isArray(e)?e:[]);default:return""}}function oo(t,e,s,n,o=4){return r`
    <fieldset class="pg-block">
      <legend>${i("edit")} ${e}</legend>
      <div class="form-grid">
        ${X({label:_("\u0641\u0627\u0631\u0633\u06CC","Persian"),name:`${t}`,value:s,rows:o,span2:!0})}
        ${X({label:_("\u0627\u0646\u06AF\u0644\u06CC\u0633\u06CC","English"),name:`${t}En`,value:n,rows:o,span2:!0})}
      </div>
    </fieldset>`}function ci(t,e,s,n){return r`
    <fieldset class="pg-block">
      <legend>${i("list")} ${e}</legend>
      <div class="form-grid">
        <label class="field span-2"><span class="label">${_("\u0641\u0627\u0631\u0633\u06CC","Persian")}</span>
          <textarea class="textarea" name="${t}" rows="6" data-lines="1">${h((s||[]).join(`
`))}</textarea></label>
        <label class="field span-2"><span class="label">${_("\u0627\u0646\u06AF\u0644\u06CC\u0633\u06CC","English")}</span>
          <textarea class="textarea" name="${t}En" rows="6" data-lines="1">${h((n||[]).join(`
`))}</textarea></label>
      </div>
    </fieldset>`}function rm(t){return r`
    <fieldset class="pg-block">
      <legend class="row row-between">
        <span>${i("layers")} ${_("\u0628\u062E\u0634\u200C\u0647\u0627","Sections")}</span>
        <button type="button" class="btn btn-ghost btn-xs" data-act="adm-pg-add" data-kind="sections">${i("plus")} ${a("common.add")}</button>
      </legend>
      <div data-blocks="sections">
        ${t.map((e,s)=>li(e,s)).join("")}
      </div>
      <template data-tpl="sections">${li(im(),0)}</template>
    </fieldset>`}function li(t,e){let s=Array.isArray(t.list)&&t.list.some(n=>n&&typeof n=="object");return r`
    <div class="pg-item" data-block="sections" data-objlist="${s?"1":""}">
      <div class="row row-between">
        <strong class="tiny">${_("\u0628\u062E\u0634","Section")} ${e+1}</strong>
        <span class="act">${Hs()}${Fs()}</span>
      </div>
      <div class="form-grid mt-s">
        ${E({label:a("common.title"),name:"title",value:t.title||""})}
        ${E({label:_("\u0639\u0646\u0648\u0627\u0646 (\u0627\u0646\u06AF\u0644\u06CC\u0633\u06CC)","Title (EN)"),name:"titleEn",value:t.titleEn||""})}
        ${X({label:_("\u0645\u062A\u0646","Body"),name:"body",value:t.body||"",rows:4,span2:!0})}
        ${X({label:_("\u0645\u062A\u0646 (\u0627\u0646\u06AF\u0644\u06CC\u0633\u06CC)","Body (EN)"),name:"bodyEn",value:t.bodyEn||"",rows:3,span2:!0})}
        ${cm(t,s)}
      </div>
    </div>`}function cm(t,e){if(e)return r`
      <div class="span-2">
        <div class="row row-between">
          <span class="label">${_("\u0641\u0647\u0631\u0633\u062A \u0645\u0648\u0631\u062F\u06CC","Bullet list")}</span>
          <button type="button" class="btn btn-ghost btn-xs" data-act="adm-pg-li-add">${i("plus")}</button>
        </div>
        <div data-li>${(t.list||[]).map(o=>di(o)).join("")}</div>
        <template data-li-tpl>${di({icon:"check",fa:"",en:""})}</template>
      </div>`;let s=(t.list||[]).map(o=>typeof o=="string"?o:(o==null?void 0:o.fa)||"").join(`
`),n=(t.listEn||[]).join(`
`);return s||n?r`
      <label class="field span-2"><span class="label">${_("\u0641\u0647\u0631\u0633\u062A (\u0647\u0631 \u062E\u0637 \u06CC\u06A9 \u0645\u0648\u0631\u062F)","List (one per line)")}</span>
        <textarea class="textarea" name="list" rows="4" data-lines="1">${h(s)}</textarea></label>
      <label class="field span-2"><span class="label">${_("\u0641\u0647\u0631\u0633\u062A \u0627\u0646\u06AF\u0644\u06CC\u0633\u06CC (\u0647\u0631 \u062E\u0637 \u06CC\u06A9 \u0645\u0648\u0631\u062F)","List EN (one per line)")}</span>
        <textarea class="textarea" name="listEn" rows="4" data-lines="1">${h(n)}</textarea></label>`:r`
    <div class="span-2">
      <button type="button" class="btn btn-ghost btn-xs" data-act="adm-pg-list-toggle">${i("plus")} ${_("\u0627\u0641\u0632\u0648\u062F\u0646 \u0641\u0647\u0631\u0633\u062A \u0645\u0648\u0631\u062F\u06CC","Add bullet list")}</button>
      <div data-listbox hidden>
        <label class="field span-2"><span class="label">${_("\u0641\u0647\u0631\u0633\u062A (\u0647\u0631 \u062E\u0637 \u06CC\u06A9 \u0645\u0648\u0631\u062F)","List (one per line)")}</span>
          <textarea class="textarea" name="list" rows="3" data-lines="1"></textarea></label>
      </div>
    </div>`}function di(t){return r`
    <div class="spec-row" data-lir>
      <input class="input li-ic" name="icon" value="${h((t==null?void 0:t.icon)||"check")}" placeholder="icon">
      <input class="input" name="fa" value="${h((t==null?void 0:t.fa)||"")}" placeholder="${_("\u0641\u0627\u0631\u0633\u06CC","FA")}">
      <input class="input" name="en" value="${h((t==null?void 0:t.en)||"")}" placeholder="${_("\u0627\u0646\u06AF\u0644\u06CC\u0633\u06CC","EN")}">
      <button type="button" class="btn btn-ghost btn-icon btn-sm" data-act="adm-pg-lidel">${i("trash")}</button>
    </div>`}function Is(t,e,s,n,o){return r`
    <fieldset class="pg-block">
      <legend class="row row-between">
        <span>${i("grid")} ${e}</span>
        <button type="button" class="btn btn-ghost btn-xs" data-act="adm-pg-add" data-kind="${t}">${i("plus")} ${a("common.add")}</button>
      </legend>
      <div class="${o==="grid"?"perm-grid":""}" data-blocks="${t}">
        ${s.map((c,l)=>r`
          <div class="pg-item ${o==="grid"?"tight":""}" data-block="${t}">
            <div class="row row-between">
              <strong class="tiny">${f(l+1)}</strong>
              <span class="act">${Hs()}${Fs()}</span>
            </div>
            <div class="form-grid mt-s">
              ${n.map(m=>m==="body"||m==="bodyEn"?X({label:Rs(m),name:m,value:c[m]||"",rows:2,span2:!0}):E({label:Rs(m),name:m,value:c[m]||""}))}
            </div>
          </div>`).join("")}
      </div>
      <template data-tpl="${t}">
        <div class="pg-item ${o==="grid"?"tight":""}" data-block="${t}">
          <div class="row row-between"><strong class="tiny">+</strong><span class="act">${Hs()}${Fs()}</span></div>
          <div class="form-grid mt-s">
            ${n.map(c=>c==="body"||c==="bodyEn"?X({label:Rs(c),name:c,value:"",rows:2,span2:!0}):E({label:Rs(c),name:c,value:""}))}
          </div>
        </div>
      </template>
    </fieldset>`}function Rs(t){return{title:a("common.title"),titleEn:_("\u0639\u0646\u0648\u0627\u0646 (\u0627\u0646\u06AF\u0644\u06CC\u0633\u06CC)","Title (EN)"),body:_("\u0645\u062A\u0646","Body"),bodyEn:_("\u0645\u062A\u0646 (\u0627\u0646\u06AF\u0644\u06CC\u0633\u06CC)","Body (EN)"),icon:_("\u0622\u06CC\u06A9\u0648\u0646","Icon"),fa:_("\u0641\u0627\u0631\u0633\u06CC","Persian"),en:_("\u0627\u0646\u06AF\u0644\u06CC\u0633\u06CC","English"),key:_("\u06A9\u0644\u06CC\u062F \u0622\u0645\u0627\u0631\u06CC","Stat key")}[t]||t}function lm(t){let e=["orders","shipping","returns","product","account","security","store","other"];return r`
    <fieldset class="pg-block">
      <legend class="row row-between">
        <span>${i("help")} ${_("\u0633\u0624\u0627\u0644\u0627\u062A \u0645\u062A\u062F\u0627\u0648\u0644","FAQ")} (${f(t.length)})</span>
        <button type="button" class="btn btn-ghost btn-xs" data-act="adm-pg-add" data-kind="faq">${i("plus")} ${a("common.add")}</button>
      </legend>
      <div data-blocks="faq">
        ${t.map((s,n)=>mi(s,n,e)).join("")}
      </div>
      <template data-tpl="faq">${mi({cat:"general",q:"",qEn:"",a:"",aEn:""},0,e)}</template>
    </fieldset>`}function mi(t,e,s){return r`
    <div class="pg-item" data-block="faq">
      <div class="row row-between">
        <strong class="tiny">${_("\u0633\u0624\u0627\u0644","Q")} ${e+1}</strong>
        <span class="act">${Hs()}${Fs()}</span>
      </div>
      <div class="form-grid mt-s">
        <label class="field"><span class="label">${_("\u062F\u0633\u062A\u0647","Category")}</span>
          <select class="select" name="cat">${s.map(n=>r`<option value="${n}" ${t.cat===n?"selected":""}>${a(`faq.cat.${n}`)}</option>`)}</select></label>
        ${E({label:_("\u0633\u0624\u0627\u0644","Question"),name:"q",value:t.q||""})}
        ${E({label:_("\u0633\u0624\u0627\u0644 (\u0627\u0646\u06AF\u0644\u06CC\u0633\u06CC)","Question (EN)"),name:"qEn",value:t.qEn||"",span2:!0})}
        ${X({label:_("\u067E\u0627\u0633\u062E","Answer"),name:"a",value:t.a||"",rows:3,span2:!0})}
        ${X({label:_("\u067E\u0627\u0633\u062E (\u0627\u0646\u06AF\u0644\u06CC\u0633\u06CC)","Answer (EN)"),name:"aEn",value:t.aEn||"",rows:2,span2:!0})}
      </div>
    </div>`}function Bs(t,e,s){let n=t.querySelector(`[name="${e}"]`);if(n)return n.dataset.lines==="1"?n.value.split(`
`).map(o=>o.trim()).filter(Boolean):n.value}function dm(t,e){var n,o;let s={};for(let c of e.blocks)if(c==="hero"){let l=m=>{var d,u;return(u=(d=t.querySelector(`[name="hero.${m}"]`))==null?void 0:d.value)!=null?u:""};s.hero={title:l("title"),titleEn:l("titleEn"),subtitle:l("subtitle"),subtitleEn:l("subtitleEn")}}else if(["intro","body","notice"].includes(c))s[c]=(n=Bs(t,c))!=null?n:"",s[`${c}En`]=(o=Bs(t,`${c}En`))!=null?o:"";else if(["rules","hints"].includes(c))s[c]=Bs(t,c)||[],s[`${c}En`]=Bs(t,`${c}En`)||[];else if(c==="faq")s.faq=[...t.querySelectorAll('[data-block="faq"]')].map(l=>{var m,d,u,b,g;return{cat:((m=l.querySelector("[name=cat]"))==null?void 0:m.value)||"general",q:((d=l.querySelector("[name=q]"))==null?void 0:d.value)||"",qEn:((u=l.querySelector("[name=qEn]"))==null?void 0:u.value)||"",a:((b=l.querySelector("[name=a]"))==null?void 0:b.value)||"",aEn:((g=l.querySelector("[name=aEn]"))==null?void 0:g.value)||""}});else{let l={sections:["title","titleEn","body","bodyEn"],steps:["title","titleEn","body","bodyEn"],items:["icon","title","titleEn","body","bodyEn"],tips:["fa","en"],stats:["fa","en","key"]}[c]||[];s[c]=[...t.querySelectorAll(`[data-block="${c}"]`)].map(m=>{var u,b;let d={};for(let g of l)d[g]=(b=(u=m.querySelector(`[name="${g}"]`))==null?void 0:u.value)!=null?b:"";if(c==="sections")if(m.dataset.objlist==="1")d.list=[...m.querySelectorAll("[data-lir]")].map(g=>{var $,w,k;return{icon:(($=g.querySelector("[name=icon]"))==null?void 0:$.value)||"check",fa:((w=g.querySelector("[name=fa]"))==null?void 0:w.value)||"",en:((k=g.querySelector("[name=en]"))==null?void 0:k.value)||""}});else{let g=m.querySelector("[name=list]");g&&(d.list=g.value.split(`
`).map(w=>w.trim()).filter(Boolean));let $=m.querySelector("[name=listEn]");$&&(d.listEn=$.value.split(`
`).map(w=>w.trim()).filter(Boolean))}return d})}return s}function mm(t){return N(t),null}var _,Ya,pi,im,Hs,Fs,hi=V(()=>{U();G();tt();mt();J();bt();at();_=(t,e)=>q()?t:e,Ya=[{key:"about",icon:"store",blocks:["hero","sections","stats"]},{key:"guide",icon:"info",blocks:["hero","steps","tips"]},{key:"service",icon:"headset",blocks:["hero","items"]},{key:"faq",icon:"help",blocks:["faq"]},{key:"terms",icon:"file",blocks:["hero","intro","notice","sections"]},{key:"privacy",icon:"shield",blocks:["hero","intro","sections"]},{key:"insurance",icon:"package-check",blocks:["hero","body","rules"]},{key:"ticketRules",icon:"ticket",blocks:["hero","rules"]},{key:"bugReport",icon:"bug",blocks:["hero","body","hints"]},{key:"contact",icon:"phone",blocks:["hero"]},{key:"installments",icon:"card",blocks:["hero","body","rules","sections"]}],pi={};im=()=>({title:"",titleEn:"",body:"",bodyEn:"",list:[],listEn:[]});Hs=()=>r`
  <button type="button" class="btn btn-ghost btn-icon btn-xs" data-act="adm-pg-up" aria-label="up">${i("arrow-up")}</button>
  <button type="button" class="btn btn-ghost btn-icon btn-xs" data-act="adm-pg-down" aria-label="down">${i("chevron-down")}</button>`,Fs=()=>r`<button type="button" class="btn btn-ghost btn-icon btn-xs" data-act="adm-pg-del" aria-label="delete">${i("trash")}</button>`;y("adm-pg-save",async(t,e)=>{t.preventDefault();let s=e.dataset.key,n=Ya.find(c=>c.key===s),o=dm(e,n);await D(e.querySelector("button[type=submit]"),async()=>{try{await v.patch(`/api/admin/pages/${s}`,{value:o}),x(a("misc.saved")),T(!0)}catch(c){S(c)}})});y("adm-pg-add",(t,e)=>{let s=e.dataset.kind,n=e.closest("form"),o=n.querySelector(`[data-tpl="${s}"]`),c=n.querySelector(`[data-blocks="${s}"]`);if(!o||!c)return;let l=document.createElement("div");l.innerHTML=o.innerHTML.trim();let m=l.firstElementChild;if(!m)return;m.querySelectorAll("input, textarea").forEach(b=>{b.value=""});let d=c.children.length+1,u=m.querySelector(".row strong");u&&(u.textContent=`${s==="faq"?q()?"\u0633\u0624\u0627\u0644":"Q":q()?"\u0645\u0648\u0631\u062F":"Item"} ${d}`),c.appendChild(m),m.scrollIntoView({behavior:"smooth",block:"center"})});y("adm-pg-del",(t,e)=>{var s;(s=e.closest("[data-block]"))==null||s.remove()});y("adm-pg-up",(t,e)=>{let s=e.closest("[data-block]");s!=null&&s.previousElementSibling&&s.parentNode.insertBefore(s,s.previousElementSibling)});y("adm-pg-down",(t,e)=>{let s=e.closest("[data-block]");s!=null&&s.nextElementSibling&&s.parentNode.insertBefore(s.nextElementSibling,s)});y("adm-pg-li-add",(t,e)=>{let s=e.closest(".span-2"),n=s.querySelector("[data-li]"),o=s.querySelector("[data-li-tpl]");if(!n||!o)return;let c=document.createElement("div");c.innerHTML=o.innerHTML.trim(),c.firstElementChild&&n.appendChild(c.firstElementChild)});y("adm-pg-list-toggle",(t,e)=>{var n;let s=(n=e.closest(".span-2"))==null?void 0:n.querySelector("[data-listbox]");s&&(s.hidden=!s.hidden)});y("adm-pg-lidel",(t,e)=>{var s;(s=e.closest("[data-lir]"))==null||s.remove()})});var io={};Z(io,{mount:()=>vm,render:()=>pm});async function pm(t){return t.params.section==="imageSearch"?fm():um()}async function um(){try{let e=await v.get(v.url("/api/admin/barcode",{q:he.q}));Le=e.items||[],Ge=e.labelSizes||[],!Ge.find(s=>s.id===he.size)&&Ge.length&&(he.size=Ge[0].id)}catch(e){return W({title:(e==null?void 0:e.message)||a("err.generic")})}let t=Le.filter(e=>!e.barcode).length;return r`
    <div class="row row-between row-wrap mb">
      <div>
        <h2 class="section-title">${i("barcode")} ${a("adm.barcode")}</h2>
        <p class="muted small">${f(Le.length)} ${Tt("\u06A9\u0627\u0644\u0627","products")} · ${f(t)} ${Tt("\u0628\u062F\u0648\u0646 \u0628\u0627\u0631\u06A9\u062F","without barcode")}</p>
      </div>
      <a class="btn btn-outline btn-sm" href="#/price-check" target="_blank" rel="noopener">${i("scan")} ${a("adm.bPriceMode")}</a>
    </div>

    <div class="dev-grid">
      <div class="card">
        <strong>${i("printer")} ${a("adm.bPrinter")}</strong>
        <p class="muted small mt-s">${a("adm.bPrinterHint")}</p>
        <ol class="dev-steps">
          <li>${Tt("\u0686\u0627\u067E\u06AF\u0631 \u0628\u0631\u0686\u0633\u0628 \u0631\u0627 \u0628\u0647 \u062F\u0633\u062A\u06AF\u0627\u0647 \u0648\u0635\u0644 \u06A9\u0646 (USB/\u0634\u0628\u06A9\u0647).","Connect the label printer (USB/network).")}</li>
          <li>${Tt("\u062F\u0631 \u062A\u0646\u0638\u06CC\u0645\u0627\u062A \u0686\u0627\u067E \u0633\u06CC\u0633\u062A\u0645\u060C \u0627\u0646\u062F\u0627\u0632\u0647\u0654 \u06A9\u0627\u063A\u0630 \u0631\u0627 \u0647\u0645\u200C\u0627\u0646\u062F\u0627\u0632\u0647\u0654 \u0628\u0631\u0686\u0633\u0628 \u0628\u06AF\u0630\u0627\u0631.","Set the system paper size to your label size.")}</li>
          <li>${Tt("\u06A9\u0627\u0644\u0627\u0647\u0627 \u0631\u0627 \u0627\u0646\u062A\u062E\u0627\u0628 \u0648 \xAB\u067E\u06CC\u0634\u200C\u0646\u0645\u0627\u06CC\u0634 \u0648 \u0686\u0627\u067E\xBB \u0631\u0627 \u0628\u0632\u0646.","Pick products and press \u201CPreview & print\u201D.")}</li>
        </ol>
        <div class="row row-wrap mt-s">
          <button class="btn btn-ghost btn-sm" data-act="adm-bc-testprint">${i("printer")} ${Tt("\u0686\u0627\u067E \u0622\u0632\u0645\u0627\u06CC\u0634\u06CC","Test print")}</button>
        </div>
      </div>

      <div class="card">
        <strong>${i("scan")} ${a("adm.bScanner")}</strong>
        <p class="muted small mt-s">${a("adm.bScanHint")}</p>
        <form class="row mt-s" data-act="adm-bc-scan">
          <input class="input grow mono" name="code" placeholder="${Tt("\u0628\u0627\u0631\u06A9\u062F \u0631\u0627 \u0627\u0633\u06A9\u0646 \u06A9\u0646\u2026","Scan a barcode\u2026")}" autocomplete="off" data-autofocus>
          <button class="btn btn-primary" type="submit">${i("search")}</button>
        </form>
        <div class="scan-result mt-s" data-scan-result>
          <p class="muted small">${Tt("\u062F\u0648\u0631\u0628\u06CC\u0646 \u062A\u0644\u0641\u0646 \u0647\u0645 \u06A9\u0627\u0631 \u0645\u06CC\u200C\u06A9\u0646\u062F: \u0627\u0632 \u062D\u0627\u0644\u062A \u0646\u0645\u0627\u06CC\u0634 \u0642\u06CC\u0645\u062A \u0627\u0633\u062A\u0641\u0627\u062F\u0647 \u06A9\u0646.","Phone camera works too \u2014 use the price-display mode.")}</p>
        </div>
        <p class="tiny muted mt-s">${bm()}</p>
      </div>
    </div>

    <div class="card mt">
      <div class="row row-between row-wrap mb-s">
        <strong>${i("printer")} ${a("adm.bLabels")}</strong>
        <form class="row row-wrap" data-act="adm-bc-search">
          <input class="input" name="q" value="${h(he.q)}" placeholder="${a("adm.pName")} / SKU / ${a("pdp.barcode")}">
          <button class="btn btn-ghost btn-sm" type="submit">${i("search")}</button>
        </form>
      </div>

      <div class="row row-wrap mb-s">
        <select class="select select-sm" data-size>
          ${Ge.map(e=>r`<option value="${e.id}" ${he.size===e.id?"selected":""}>${h(q()?e.fa:`${e.w}\xD7${e.h} mm`)}</option>`)}
        </select>
        <label class="row tiny">${Tt("\u062A\u0639\u062F\u0627\u062F \u0628\u0631\u0686\u0633\u0628 \u0647\u0631 \u06A9\u0627\u0644\u0627","Copies per product")}
          <input class="input copies-in" type="number" min="1" max="20" value="${f(he.copies)}" data-copies>
        </label>
        <button class="btn btn-ghost btn-sm" data-act="adm-bc-all">${i("check")} ${Tt("\u0627\u0646\u062A\u062E\u0627\u0628 \u0647\u0645\u0647","Select all")}</button>
        <button class="btn btn-ghost btn-sm" data-act="adm-bc-none">${i("close")} ${Tt("\u067E\u0627\u06A9 \u06A9\u0631\u062F\u0646","Clear")}</button>
        <button class="btn btn-ghost btn-sm" data-act="adm-bc-nocode">${i("barcode")} ${Tt("\u0628\u062F\u0648\u0646 \u0628\u0627\u0631\u06A9\u062F","Without barcode")}</button>
        <span class="badge-pill bp-accent" data-selcount>${f(se.size)}</span>
      </div>

      ${dt([{label:""},{label:a("common.product")},{label:a("pdp.barcode")},{label:a("common.price"),cls:"num"},{label:a("common.stock"),cls:"num"},{label:"",cls:"num"}],Le.slice(0,100).map(e=>r`
          <tr>
            <td><label class="check"><input type="checkbox" data-pick="${e.id}" ${se.has(e.id)?"checked":""}><span class="box">${i("check")}</span></label></td>
            <td><span class="b">${h(e.name)}</span><div class="tiny muted mono">${h(e.sku||"")}</div></td>
            <td class="mono tiny">${e.barcode?h(e.barcode):r`<span class="badge-pill bp-warn">${Tt("\u0646\u062F\u0627\u0631\u062F","none")}</span>`}</td>
            <td class="num">${A(e.price)}</td>
            <td class="num">${f(e.stock)}</td>
            <td>${e.barcode?"":r`<button class="btn btn-ghost btn-xs" data-act="adm-bc-gen" data-id="${e.id}">${i("barcode")} ${a("adm.bGenerate")}</button>`}</td>
          </tr>`),{emptyText:a("common.noResult")})}
    </div>

    <div class="card mt no-print">
      <div class="row row-between row-wrap">
        <strong>${i("eye")} ${a("adm.bPreview")}</strong>
        <div class="row row-wrap">
          <button class="btn btn-outline btn-sm" data-act="adm-bc-build">${i("refresh")} ${Tt("\u0633\u0627\u062E\u062A \u067E\u06CC\u0634\u200C\u0646\u0645\u0627\u06CC\u0634","Build preview")}</button>
          <button class="btn btn-primary btn-sm" data-act="adm-bc-print">${i("printer")} ${a("common.print")}</button>
        </div>
      </div>
      <div class="print-grid mt" data-print-area data-labels></div>
      <p class="hint mt-s">${Tt("\u0627\u0646\u062F\u0627\u0632\u0647\u0654 \u0628\u0631\u0686\u0633\u0628 \u062F\u0631 \u0686\u0627\u067E \u0627\u0632 \u0645\u062A\u063A\u06CC\u0631 \u0635\u0641\u062D\u0647 \u062A\u0646\u0638\u06CC\u0645 \u0645\u06CC\u200C\u0634\u0648\u062F\u061B \u0627\u06AF\u0631 \u0628\u0631\u0686\u0633\u0628\u200C\u0647\u0627 \u062C\u0627\u0628\u0647\u200C\u062C\u0627 \u0686\u0627\u067E \u0634\u062F\u0646\u062F\u060C \u062D\u0627\u0634\u06CC\u0647\u0654 \u0686\u0627\u067E \u0631\u0627 \u062F\u0631 \u06AF\u0641\u062A\u200C\u0648\u06AF\u0648\u06CC \u0686\u0627\u067E \u0635\u0641\u0631 \u06A9\u0646.","If labels shift when printing, set the print margins to zero in the print dialog.")}</p>
    </div>`}function bm(){return"BarcodeDetector"in window?r`${i("check")} ${Tt("\u0627\u0633\u06A9\u0646 \u0628\u0627 \u062F\u0648\u0631\u0628\u06CC\u0646 \u067E\u0634\u062A\u06CC\u0628\u0627\u0646\u06CC \u0645\u06CC\u200C\u0634\u0648\u062F","Camera scanning supported")}`:r`${i("info")} ${Tt("\u0627\u0633\u06A9\u0646 \u0628\u0627 \u062F\u0648\u0631\u0628\u06CC\u0646 \u062F\u0631 \u0627\u06CC\u0646 \u0645\u0631\u0648\u0631\u06AF\u0631 \u067E\u0634\u062A\u06CC\u0628\u0627\u0646\u06CC \u0646\u0645\u06CC\u200C\u0634\u0648\u062F\u061B \u0627\u0632 \u0628\u0627\u0631\u06A9\u062F\u062E\u0648\u0627\u0646 \u0633\u062E\u062A\u200C\u0627\u0641\u0632\u0627\u0631\u06CC \u0627\u0633\u062A\u0641\u0627\u062F\u0647 \u06A9\u0646.","Camera scanning unsupported in this browser; use a hardware scanner.")}`}async function hm(){return window.JsBarcode||await new Promise((t,e)=>{let s=document.createElement("script");s.src="/js/vendor/jsbarcode.all.min.js",s.onload=t,s.onerror=e,document.head.appendChild(s)}),window.JsBarcode}function gm(t,e){let s=Ge.find(o=>o.id===e)||{w:40,h:25},n=/^\d{13}$/.test(t.barcode||"")?"EAN13":"CODE128";return r`
    <div class="label-preview" data-lw="${s.w}" data-lh="${s.h}">
      <span class="ln">${h(t.name.slice(0,40))}</span>
      ${t.barcode?r`<svg data-bc="${h(t.barcode)}" data-fmt="${n}"></svg>`:r`<span class="ln tiny">${Tt("\u0628\u062F\u0648\u0646 \u0628\u0627\u0631\u06A9\u062F","no barcode")}</span>`}
      <span class="row row-between w100">
        <span class="ln mono tiny">${h(t.barcode||t.sku||"")}</span>
        <span class="lp">${f(t.price)}</span>
      </span>
    </div>`}async function ro(t){var m,d;let e=t.querySelector("[data-labels]");if(!e)return 0;let s=Le.filter(u=>se.has(u.id));if(!s.length)return e.innerHTML="",0;let n=Math.max(1,Number(((m=t.querySelector("[data-copies]"))==null?void 0:m.value)||1)),o=((d=t.querySelector("[data-size]"))==null?void 0:d.value)||he.size,c=Ge.find(u=>u.id===o)||{w:40,h:25},l="";for(let u of s)for(let b=0;b<n;b++)l+=gm(u,o);e.innerHTML=l,e.style.setProperty("--lw",`${c.w}mm`),e.style.setProperty("--lh",`${c.h}mm`);try{let u=await hm();e.querySelectorAll("svg[data-bc]").forEach(b=>{try{u(b,b.dataset.bc,{format:b.dataset.fmt||"CODE128",displayValue:!1,height:Math.max(18,c.h-14),width:1.3,margin:0,background:"#ffffff",lineColor:"#000000"})}catch(g){b.remove()}})}catch(u){Y(Tt("\u06A9\u062A\u0627\u0628\u062E\u0627\u0646\u0647\u0654 \u0628\u0627\u0631\u06A9\u062F \u0628\u0627\u0631\u06AF\u0630\u0627\u0631\u06CC \u0646\u0634\u062F\u061B \u0628\u0631\u0686\u0633\u0628\u200C\u0647\u0627 \u0628\u062F\u0648\u0646 \u0628\u0627\u0631\u06A9\u062F \u0686\u0627\u067E \u0645\u06CC\u200C\u0634\u0648\u0646\u062F.","Barcode library failed to load; labels print without barcodes."))}return s.length*n}function Os(){document.querySelectorAll("[data-pick]").forEach(e=>{e.checked=se.has(e.dataset.pick)});let t=document.querySelector("[data-selcount]");t&&(t.textContent=f(se.size))}async function fm(){let t=null;try{t=await v.get("/api/admin/image-index")}catch(n){return W({title:(n==null?void 0:n.message)||a("err.generic")})}let e=t.products||[],s=e.filter(n=>!n.indexed);return r`
    <div class="row row-between row-wrap mb">
      <div>
        <h2 class="section-title">${i("camera")} ${a("adm.imageSearch")}</h2>
        <p class="muted small">${f(t.indexed||0)} / ${f(e.length)} ${Tt("\u0627\u06CC\u0646\u062F\u06A9\u0633 \u0634\u062F\u0647","indexed")}</p>
      </div>
      <button class="btn btn-primary btn-sm" data-act="adm-ix-run" data-count="${s.length}">
        ${i("refresh")} ${s.length?`${a("adm.ixIndex")} (${f(s.length)})`:a("adm.ixReindex")}
      </button>
    </div>

    <p class="notice notice-info mb">${i("info")}<span>${a("adm.ixHint")}</span></p>
    <div class="mt-s" data-ix-progress hidden>
      <div class="progress"><i data-ix-bar data-w="0%"></i></div>
      <p class="tiny muted mt-s" data-ix-status></p>
    </div>

    ${e.length?r`
      <div class="ix-grid">
        ${e.slice(0,240).map(n=>r`
          <div class="ix-item ${n.indexed?"on":""}" data-pid="${n.id}">
            ${n.image?r`<img src="${h(n.image)}" alt="" loading="lazy" data-h="54px" data-w="54px">`:r`<span class="ix-ph">${i("image")}</span>`}
            <span class="grow tiny">${h(n.name.slice(0,46))}</span>
            ${n.indexed?r`<span class="badge-pill bp-success tiny">${i("check")}</span>`:r`<span class="badge-pill bp-muted tiny">${a("common.no")}</span>`}
          </div>`).join("")}
      </div>`:L({icon:"image",title:a("common.noData")})}`}function vm(t,e){var s,n;return N(t),t.querySelectorAll("[data-pick]").forEach(o=>{o.addEventListener("change",()=>{o.checked?se.add(o.dataset.pick):se.delete(o.dataset.pick);let c=t.querySelector("[data-selcount]");c&&(c.textContent=f(se.size))})}),(s=t.querySelector("[data-size]"))==null||s.addEventListener("change",o=>{he.size=o.target.value}),(n=t.querySelector("[data-copies]"))==null||n.addEventListener("change",o=>{he.copies=Math.max(1,Number(o.target.value)||1)}),null}var Tt,Le,Ge,se,he,co=V(()=>{U();G();tt();mt();J();bt();at();Mn();Tt=(t,e)=>q()?t:e,Le=[],Ge=[],se=new Set,he={q:"",size:"40x25",copies:1};y("adm-bc-search",(t,e)=>{t.preventDefault(),he.q=String(new FormData(e).get("q")||"").trim(),T(!0)});y("adm-bc-all",()=>{Le.slice(0,100).forEach(t=>se.add(t.id)),Os()});y("adm-bc-none",()=>{se.clear(),Os()});y("adm-bc-nocode",()=>{se=new Set(Le.filter(t=>!t.barcode).map(t=>t.id)),Os()});y("adm-bc-gen",async(t,e)=>{var s,n,o;try{let c=await v.post("/api/admin/barcode/generate",{productId:e.dataset.id,count:1}),l=((n=(s=c.codes)==null?void 0:s[0])==null?void 0:n.barcode)||((o=c.codes)==null?void 0:o[0])||"";l&&(x(`${a("adm.bGenerate")}: ${l}`),T(!0))}catch(c){S(c)}});y("adm-bc-build",async(t,e)=>{let s=e.closest("[data-admbody]")||document,n=await ro(s);n?x(`${f(n)} ${Tt("\u0628\u0631\u0686\u0633\u0628 \u0622\u0645\u0627\u062F\u0647 \u0634\u062F","labels ready")}`):Y(a("adm.bPickFirst"))});y("adm-bc-print",async(t,e)=>{let s=e.closest("[data-admbody]")||document;if(!await ro(s)){Y(a("adm.bPickFirst"));return}document.body.classList.add("printing-labels");let o=()=>document.body.classList.remove("printing-labels");window.addEventListener("afterprint",o,{once:!0}),setTimeout(()=>{window.print(),setTimeout(o,1200)},120)});y("adm-bc-testprint",async(t,e)=>{var c;let s=e.closest("[data-admbody]")||document;if(!s.querySelector("[data-labels]"))return;se=new Set([(c=Le[0])==null?void 0:c.id].filter(Boolean)),Os(),await ro(s),document.body.classList.add("printing-labels");let o=()=>document.body.classList.remove("printing-labels");window.addEventListener("afterprint",o,{once:!0}),setTimeout(()=>{window.print(),setTimeout(o,1200)},120)});y("adm-bc-scan",async(t,e)=>{t.preventDefault();let s=String(new FormData(e).get("code")||"").trim(),n=e.closest(".card").querySelector("[data-scan-result]");if(s)try{let c=(await v.post("/api/admin/barcode/scan-log",{code:s})).product;n.innerHTML=r`
      <div class="row row-between">
        <div>
          <strong>${h(c.name)}</strong>
          <div class="tiny muted mono">${h(c.sku||"")} · ${h(c.barcode||"")}</div>
        </div>
        <div class="t-end">
          <div class="price-now">${A(c.price)}</div>
          <div class="tiny muted">${a("common.stock")}: ${f(c.stock)}</div>
        </div>
      </div>
      <div class="row row-wrap mt-s">
        <a class="btn btn-ghost btn-xs" href="#/admin/products/${c.id}">${i("edit")} ${a("common.edit")}</a>
        <a class="btn btn-ghost btn-xs" href="#/product/${c.id}" target="_blank" rel="noopener">${i("external")} ${a("adm.view")}</a>
      </div>`,x(a("adm.bFound"))}catch(o){n.innerHTML=r`<p class="muted small">${i("alert")} ${h((o==null?void 0:o.message)||a("adm.bNotFound"))}</p>`,(o==null?void 0:o.status)!==404&&S(o)}finally{e.querySelector("[name=code]").value="",e.querySelector("[name=code]").focus()}});y("adm-ix-run",async(t,e)=>{let s=Number(e.dataset.count||0)>0,n=document.querySelector("[data-ix-progress]"),o=document.querySelector("[data-ix-bar]"),c=document.querySelector("[data-ix-status]"),l=[...document.querySelectorAll(".ix-item")];if(!l.length)return;let m=s?l.filter($=>!$.classList.contains("on")):l;if(!m.length){x(a("adm.ixDone"));return}e.disabled=!0,n&&(n.hidden=!1);let d=0,u=0,b=[],g=async()=>{if(b.length)try{let $=await v.post("/api/admin/image-index",{entries:b.splice(0,b.length)});u+=$.indexed||0}catch($){S($)}};for(let $ of m){let w=$.querySelector("img");if(w!=null&&w.src)try{let k=w.src.startsWith("http")&&!w.src.startsWith(location.origin)?v.url("/api/admin/image-thumb",{url:w.src}):w.src,C=await vs(k),F=$.dataset.pid;F&&b.push({productId:F,dhash:C.dhash,hist:C.hist})}catch(k){}d++,o&&(o.style.width=`${Math.round(d/m.length*100)}%`),c&&(c.textContent=`${f(d)} / ${f(m.length)}`),b.length>=40&&await g()}await g(),e.disabled=!1,x(`${a("adm.ixDone")} \u2014 ${f(u)}`),T(!0)})});var js={};Z(js,{allowedSections:()=>lo,mount:()=>Sm,render:()=>km,title:()=>xm});async function km(t){var l;let e=t.params.section||"",s=gi(e),n=lo(),o="";if(!s)o=Aa("warn",e?a("adm.noPermission"):a("err.forbidden"))+r`<div class="card mt"><strong>${a("adm.title")}</strong><p class="muted small mt-s">${a("adm.noPermission")}</p></div>`;else try{o=await(await s.mod()).render(Ut(pt({},t),{params:Ut(pt({},t.params),{section:s.id}),admNav:n}))}catch(m){console.error("[admin] section render failed",m),o=Aa("danger",`${a("err.generic")} (${h((m==null?void 0:m.message)||"")})`)}let c=[...new Set(n.map(m=>m.grp))];return r`
    <div class="row row-between row-wrap mb">
      <div class="row">
        <h1 class="section-title">${i("settings")} ${a("adm.title")}</h1>
        <span class="badge-pill bp-accent">${h(((l=p.me)==null?void 0:l.role)==="owner"?q()?"\u0645\u0627\u0644\u06A9":"Owner":q()?"\u06A9\u0627\u0631\u0645\u0646\u062F":"Staff")}</span>
      </div>
      <div class="row row-wrap">
        ${Q("settings.edit")?r`
          <button class="btn btn-sm ${p.sleeping?"btn-success":"btn-ghost"}" data-act="adm-sleep-toggle" title="${p.sleeping?a("sys.turnOn"):a("sys.turnOff")}">
            ${i(p.sleeping?"zap":"moon")} ${p.sleeping?a("sys.turnOn"):a("sys.turnOff")}
          </button>`:""}
        <a class="btn btn-ghost btn-sm" href="#/">${i("arrow-right")} ${a("adm.backToSite")}</a>
      </div>
    </div>
    ${p.sleeping?Aa("warn",a("sys.sleepBanner")):""}
    <div class="adm-grid">
      <aside class="adm-side">
        ${c.map(m=>r`
          <div class="grp">${h(q()?$m[m]:wm[m])}</div>
          ${n.filter(d=>d.grp===m).map(d=>r`
            <a href="#/admin${d.id?`/${d.id}`:""}" class="${d.id===e||!e&&!d.id?"active":""}">
              ${i(d.icon)} <span>${d.label()}</span>
              ${d.count?r`<span class="cnt">${f(d.count)}</span>`:""}
            </a>`)}
        `).join("")}
      </aside>
      <div data-admbody>${o}</div>
    </div>`}async function Sm(t,e){N(t);let s=e.params.section||"",n=gi(s);if(!n)return null;try{let o=await n.mod();if(typeof o.mount=="function")return o.mount(t.querySelector("[data-admbody]")||t,e)}catch(o){console.error("[admin] section mount failed",o)}return null}var ym,$m,wm,lo,gi,xm,zs=V(()=>{U();G();K();J();tt();bt();at();ym=[{grp:"shop",id:"",perm:"dashboard.view",icon:"chart",label:()=>a("adm.dashboard"),mod:()=>Promise.resolve().then(()=>(Pr(),Dr))},{grp:"shop",id:"products",perm:"products.view",icon:"box",label:()=>a("adm.products"),mod:()=>Promise.resolve().then(()=>(Ir(),Nr))},{grp:"shop",id:"categories",perm:"categories.manage",icon:"layers",label:()=>a("adm.categories"),mod:()=>Promise.resolve().then(()=>(Fr(),Hr))},{grp:"shop",id:"orders",perm:"orders.view",icon:"package-check",label:()=>a("adm.orders"),mod:()=>Promise.resolve().then(()=>(Ur(),zr))},{grp:"people",id:"reviews",perm:"reviews.moderate",icon:"star",label:()=>a("adm.reviews"),mod:()=>Promise.resolve().then(()=>(_r(),Wr))},{grp:"people",id:"tickets",perm:"tickets.manage",icon:"ticket",label:()=>a("adm.tickets"),mod:()=>Promise.resolve().then(()=>(eo(),to)),feat:"tickets"},{grp:"people",id:"support",perm:"tickets.manage",icon:"headset",label:()=>a("adm.supportChat"),mod:()=>Promise.resolve().then(()=>(eo(),to)),feat:"liveSupport"},{grp:"people",id:"feedback",perm:"feedback.manage",icon:"flag",label:()=>a("adm.feedback"),mod:()=>Promise.resolve().then(()=>(Kr(),Gr))},{grp:"people",id:"users",perm:"users.view",icon:"users",label:()=>a("adm.users"),mod:()=>Promise.resolve().then(()=>(ei(),ti))},{grp:"people",id:"visitors",perm:"users.view",icon:"eye",label:()=>a("adm.visitors"),mod:()=>Promise.resolve().then(()=>(ja(),Oa))},{grp:"growth",id:"coupons",perm:"coupons.manage",icon:"percent",label:()=>a("adm.coupons"),mod:()=>Promise.resolve().then(()=>(ha(),ba)),feat:"coupons"},{grp:"growth",id:"settings/partners",perm:"settings.edit",icon:"store",label:()=>a("adm.sPartners"),mod:()=>Promise.resolve().then(()=>(Va(),_a)),feat:"partners"},{grp:"growth",id:"ads",perm:"ads.manage",icon:"tag",label:()=>a("adm.ads"),mod:()=>Promise.resolve().then(()=>(ha(),ba)),feat:"ads"},{grp:"growth",id:"notifications",perm:"notifications.send",icon:"bell",label:()=>a("adm.notifications"),mod:()=>Promise.resolve().then(()=>(ha(),ba)),feat:"announcements"},{grp:"growth",id:"lottery",perm:"settings.edit",icon:"gift2",label:()=>a("adm.lottery"),mod:()=>Promise.resolve().then(()=>(ha(),ba)),feat:"lottery"},{grp:"system",id:"telegram",perm:"settings.edit",icon:"send",label:()=>a("adm.telegram"),mod:()=>Promise.resolve().then(()=>(ha(),ba))},{grp:"system",id:"settings",perm:"settings.edit",icon:"settings",label:()=>a("adm.settings"),mod:()=>Promise.resolve().then(()=>(Va(),_a))},{grp:"system",id:"theme",perm:"theme.edit",icon:"sun",label:()=>a("adm.theme"),mod:()=>Promise.resolve().then(()=>(Va(),_a))},{grp:"system",id:"features",perm:"settings.edit",icon:"zap",label:()=>a("adm.features"),mod:()=>Promise.resolve().then(()=>(Va(),_a))},{grp:"system",id:"pages",perm:"pages.edit",icon:"file",label:()=>a("adm.pages"),mod:()=>Promise.resolve().then(()=>(hi(),bi))},{grp:"system",id:"barcode",perm:"barcode.print",icon:"barcode",label:()=>a("adm.barcode"),mod:()=>Promise.resolve().then(()=>(co(),io)),feat:"barcode"},{grp:"system",id:"imageSearch",perm:"imagesearch.index",icon:"camera",label:()=>a("adm.imageSearch"),mod:()=>Promise.resolve().then(()=>(co(),io)),feat:"imageSearch"},{grp:"system",id:"audit",perm:"audit.view",icon:"history",label:()=>a("adm.audit"),mod:()=>Promise.resolve().then(()=>(ja(),Oa))},{grp:"system",id:"stats",perm:"stats.view",icon:"chart",label:()=>a("adm.stats"),mod:()=>Promise.resolve().then(()=>(ja(),Oa))},{grp:"system",id:"data",perm:"data.export",icon:"download",label:()=>a("adm.export"),mod:()=>Promise.resolve().then(()=>(ja(),Oa))}],$m={shop:"\u0641\u0631\u0648\u0634\u06AF\u0627\u0647",people:"\u0645\u0634\u062A\u0631\u06CC\u200C\u0647\u0627",growth:"\u0631\u0634\u062F \u0648 \u062A\u0628\u0644\u06CC\u063A\u0627\u062A",system:"\u0633\u0627\u0645\u0627\u0646\u0647"},wm={shop:"Store",people:"Customers",growth:"Growth & ads",system:"System"},lo=()=>ym.filter(t=>(!t.perm||Q(t.perm))&&(!t.feat||H(t.feat))),gi=t=>lo().find(e=>e.id===t)||null;xm=()=>a("adm.title");y("adm-sleep-toggle",async(t,e)=>{let s=!p.sleeping,n=0;if(s){let o=await de({title:a("sys.turnOff"),text:a("sys.offConfirm"),label:a("sys.autoWakeMins"),value:"0",type:"number"});if(o===null)return;n=Math.max(0,Number(o)||0)}await D(e,async()=>{try{await v.post(s?"/api/system/sleep":"/api/system/wake",s?{minutes:n}:{}),await Ot({silent:!0}),document.dispatchEvent(new CustomEvent("sleep:changed")),x(s?n?a("sys.asleepTimed",{n}):a("sys.asleep"):a("sys.awake")),T(!0)}catch(o){S(o)}})})});var fi={};Z(fi,{mount:()=>qm,render:()=>Em});async function Em(){var e;let t=decodeURIComponent((location.hash||"#/").slice(1));return r`
    <div class="center col mt-l nf-wrap">
      <div class="nf-code">۴۰۴</div>
      ${L({icon:"search",title:a("err.notFound"),text:`${a("err.notFoundText")} \u2014 ${t}`,action:{href:"#/",label:a("err.goHome")}})}
      <div class="row row-wrap center">
        <a class="btn btn-ghost btn-sm" href="#/products">${i("grid")} ${a("nav.products")}</a>
        <a class="btn btn-ghost btn-sm" href="#/pages/faq">${i("info")} ${a("footer.faq")}</a>
        <a class="btn btn-ghost btn-sm" href="#/pages/contact">${i("phone")} ${a("contact.title")}</a>
        <a class="btn btn-ghost btn-sm" href="#/search/image">${i("camera")} ${a("search.byImage")}</a>
      </div>
      ${(e=p.recent)!=null&&e.length?r`<p class="muted small">${a("misc.recentlyViewed")}: ${p.recent.length}</p>`:""}
    </div>`}function qm(t){return N(t),null}var vi=V(()=>{U();G();K();mt()});var pe={};Z(pe,{currentRoute:()=>Pm,href:()=>Lm,initRouter:()=>mo,navigate:()=>ht,parseHash:()=>$i,refresh:()=>T,render:()=>ki,routes:()=>yi,start:()=>ga});function $i(t=location.hash){let e=String(t||"").replace(/^#/,"");if(!e||e==="/")return{path:"/",query:new URLSearchParams,hashStr:""};let s="",n=e.indexOf("#");n>=0&&(s=e.slice(n+1),e=e.slice(0,n));let o=e.indexOf("?"),c=new URLSearchParams(o>=0?e.slice(o+1):""),l=o>=0?e.slice(0,o):e;return l.startsWith("/")||(l=`/${l}`),l=l.replace(/\/{2,}/g,"/"),l.length>1&&l.endsWith("/")&&(l=l.slice(0,-1)),{path:l,query:c,hashStr:s}}function Am(t){let e=t.split("/").filter(s=>s!=="");for(let s of yi){let n=s.pattern.split("/").filter(l=>l!=="");if(n.length!==e.length)continue;let o={},c=!0;for(let l=0;l<n.length;l++)if(n[l].startsWith(":"))o[n[l].slice(1)]=decodeURIComponent(e[l]);else if(n[l]!==e[l]){c=!1;break}if(c)return{route:s,params:o}}return{route:Cm,params:{}}}function Dm(t,e){var s,n,o;if(!t)return null;if(t==="auth"){if(!p.me){let c=encodeURIComponent(e.full);return lt(a("err.loginRequired")),`#/auth?next=${c}`}return null}if(t==="admin")return(s=p.me)!=null&&s.isAdmin?null:(Y(a("err.forbidden")),"#/");if(t.startsWith("perm:")){let c=t.slice(5),{can:l}=e.helpers;return l(c)?null:(Y(a("adm.noPermission")),"#/admin")}if(t.startsWith("feature:")){let c=t.slice(8);return((o=(n=p.settings)==null?void 0:n.features)==null?void 0:o[c])===!1?(lt(a("err.notFound")),"#/"):null}return null}async function ki(t){var c,l,m,d,u,b;let e=Tm();if(!e)return;let s=++Ga;if(Us){try{Us()}catch(g){}Us=null}Da(!0),e.innerHTML=t.skeleton||'<div class="sk sk-card"></div>';let n=null;try{n=await t.route.load()}catch(g){if(console.error("[router] load failed",g),s!==Ga)return;e.innerHTML=`<div class="empty"><h4>${a("err.generic")}</h4><p>${a("err.network")}</p></div>`,Da(!1);return}if(s!==Ga)return;let o="";try{o=await n.render(t)}catch(g){console.error("[router] render failed",g),o=`<div class="empty"><h4>${a("err.generic")}</h4><p>${String((g==null?void 0:g.message)||g)}</p></div>`}if(s===Ga){e.innerHTML=o,N(e),setTimeout(()=>Promise.resolve().then(()=>(uo(),po)).then(g=>g.maybeConsent&&g.maybeConsent()),300);try{let g=((l=(c=p.settings)==null?void 0:c.store)==null?void 0:l[t.lang==="en"?"nameEn":"name"])||((m=document.querySelector(".ws-name"))==null?void 0:m.textContent)||"\u0641\u0631\u0648\u0634\u06AF\u0627\u0647",$=typeof n.title=="function"?n.title(t):n.title||((u=(d=t.route).title)==null?void 0:u.call(d,t))||"";document.title=$?`${$} \xB7 ${g}`:g}catch(g){}try{if(typeof n.mount=="function"){let g=n.mount(e,t);typeof g=="function"&&(Us=g)}}catch(g){console.error("[router] mount failed",g)}if(s===Ga){Da(!1),document.dispatchEvent(new CustomEvent("view:rendered",{detail:t})),Mm(t),t.keepScroll||(window.scrollTo(0,0),setTimeout(()=>window.scrollTo(0,0),50));try{(b=e.closest("#view"))==null||b.focus({preventScroll:!0})}catch(g){}}}}function Mm(t){let e=t.path,s=e==="/products"&&t.query.get("discount")==="1",n=e==="/products"&&t.query.get("sort")==="newest";document.querySelectorAll(".nav-link[data-nav-key]").forEach(o=>{let c=!1;o.dataset.navKey==="/deals"?c=s:o.dataset.navKey==="/new"?c=n:o.dataset.navKey==="/products"?c=e==="/products"&&!s&&!n:c=o.dataset.navKey===e||o.dataset.navKey!=="/"&&e.startsWith(o.dataset.navKey),o.classList.toggle("active",c)}),document.querySelectorAll(".mobile-nav a[data-mn]").forEach(o=>{let c=o.dataset.mn,l=c==="home"&&e==="/"||c==="cats"&&(e.startsWith("/products")||e.startsWith("/category")||e.startsWith("/product"))||c==="search"&&e.startsWith("/search")||c==="cart"&&e.startsWith("/cart")||c==="me"&&(e.startsWith("/account")||e.startsWith("/auth"));o.classList.toggle("active",l)})}function ht(t,{replace:e=!1,keepScroll:s=!1}={}){let n=String(t||"#/"),o=n.startsWith("#")?n:`#${n}`;if(location.hash===o){ga({keepScroll:s});return}e?history.replaceState(null,"",o):location.hash=o,e&&ga({keepScroll:s})}function Lm(t,e){let n=(e instanceof URLSearchParams?e:new URLSearchParams(e||{})).toString();return`#${t.startsWith("/")?t:`/${t}`}${n?`?${n}`:""}`}function ga(t={}){let{path:e,query:s,hashStr:n}=$i(),{route:o,params:c}=Am(e),l=`${e}${s.toString()?`?${s}`:""}`,m={path:e,params:c,query:s,hashStr:n,full:l,route:o,lang:document.documentElement.getAttribute("data-lang")||"fa",keepScroll:!!t.keepScroll,skeleton:o.skeleton||"",helpers:{}};wi=m;let d=Dm(o.guard,m);if(d){if(d!==location.hash){location.replace(d);return}return}ki(m)}function mo(){window.addEventListener("hashchange",()=>ga()),ga()}function T(t=!1){ga({keepScroll:t})}var Tm,yi,Cm,Ga,wi,Us,Pm,at=V(()=>{U();G();K();J();Tm=()=>I("#viewInner"),yi=[{pattern:"/",load:()=>Promise.resolve().then(()=>(jo(),Oo)),title:()=>a("nav.home")},{pattern:"/products",load:()=>Promise.resolve().then(()=>(Pn(),Dn)),title:()=>a("catalog.title")},{pattern:"/category/:id",load:()=>Promise.resolve().then(()=>(Pn(),Dn)),title:()=>a("catalog.title")},{pattern:"/product/:id",load:()=>Promise.resolve().then(()=>(_o(),Wo)),title:t=>t.params.id},{pattern:"/search/image",load:()=>Promise.resolve().then(()=>(Yo(),Vo)),title:()=>a("search.imageTitle"),guard:"feature:imageSearch"},{pattern:"/cart",load:()=>Promise.resolve().then(()=>(Ko(),Go)),title:()=>a("cart.title")},{pattern:"/checkout",load:()=>Promise.resolve().then(()=>(Xo(),Jo)),title:()=>a("checkout.title"),guard:"auth"},{pattern:"/checkout/done/:id",load:()=>Promise.resolve().then(()=>(tr(),Zo)),title:()=>a("checkout.successTitle")},{pattern:"/pay/:id",load:()=>Promise.resolve().then(()=>(ar(),er)),title:()=>a("common.payment")},{pattern:"/compare",load:()=>Promise.resolve().then(()=>(nr(),sr)),title:()=>a("compare.title"),guard:"feature:compare"},{pattern:"/lottery",load:()=>Promise.resolve().then(()=>(rr(),or)),title:()=>a("lot.title")},{pattern:"/price-check",load:()=>Promise.resolve().then(()=>(mr(),dr)),title:()=>a("priceCheck.title"),guard:"feature:priceCheckDevice"},{pattern:"/auth",load:()=>Promise.resolve().then(()=>(Rn(),In)),title:()=>a("auth.title")},{pattern:"/auth/:mode",load:()=>Promise.resolve().then(()=>(Rn(),In)),title:()=>a("auth.title")},{pattern:"/account",load:()=>Promise.resolve().then(()=>(Un(),zn)),title:()=>a("acc.title"),guard:"auth"},{pattern:"/account/:section",load:()=>Promise.resolve().then(()=>(Un(),zn)),title:()=>a("acc.title"),guard:"auth"},{pattern:"/account/orders/:id",load:()=>Promise.resolve().then(()=>(wr(),$r)),title:()=>a("acc.trackOrder"),guard:"auth"},{pattern:"/account/tickets/:id",load:()=>Promise.resolve().then(()=>(xr(),Sr)),title:()=>a("common.ticket"),guard:"auth"},{pattern:"/stats",load:()=>Promise.resolve().then(()=>(qr(),Er)),title:()=>a("nav.stats"),guard:"feature:publicStats"},{pattern:"/pages/:key",load:()=>Promise.resolve().then(()=>(Ar(),Cr)),title:t=>t.params.key},{pattern:"/admin",load:()=>Promise.resolve().then(()=>(zs(),js)),title:()=>a("adm.title"),guard:"admin"},{pattern:"/admin/:section",load:()=>Promise.resolve().then(()=>(zs(),js)),title:()=>a("adm.title"),guard:"admin"},{pattern:"/admin/:section/:id",load:()=>Promise.resolve().then(()=>(zs(),js)),title:()=>a("adm.title"),guard:"admin"}],Cm={pattern:"/404",load:()=>Promise.resolve().then(()=>(vi(),fi)),title:()=>a("err.notFound")};Ga=0,wi=null,Us=null,Pm=()=>wi});function y(t,e){return fa.set(t,e),e}function Ss(t){return fa.get(t)}async function We(t){if(!t)return;let e=t.querySelector("[data-cch]"),s=t.querySelector("[data-cimg]"),n=t.querySelector("[data-ctok]"),o=t.querySelector("[data-cst]"),c=t.querySelector("[name=captchaAnswer]");n&&(n.value=""),c&&(c.value="",c.disabled=!1);let l=t.querySelector("[name=captchaBox]");l&&(l.disabled=!1);try{let m=await v.get("/api/captcha");if(m.disabled){t.hidden=!0;return}t.hidden=!1,t.dataset.cid=m.id,s&&(s.innerHTML=m.svg||""),o&&(o.textContent=a("captcha.hint")),e&&(e.hidden=!(l!=null&&l.checked))}catch(m){}}function na(t){var s;let e=(s=t==null?void 0:t.querySelector)==null?void 0:s.call(t,"[data-captcha]");e&&(e.hidden=!1,We(e))}function xi(){let t=0;document.addEventListener("click",e=>{let s=e.target.closest("[data-act]");if(!s||s.disabled||s.classList.contains("busy")||s.tagName==="FORM")return;let n=Date.now();if(n-t<150){e.preventDefault();return}t=n,s.tagName==="A"&&e.preventDefault();let o=s.dataset.act,c=fa.get(o);if(!c){console.warn("[actions] unknown:",o);return}try{let l=c(e,s);l&&typeof l.catch=="function"&&l.catch(m=>{console.error("[action]",o,m),m!=null&&m.code&&S(m)})}catch(l){console.error("[action]",o,l)}}),document.addEventListener("submit",e=>{var l;let s=e.target;if(s.classList.contains("busy")||s.querySelector("button.busy")){e.preventDefault();return}let n=Date.now();if(n-t<300){e.preventDefault();return}t=n;let o=(l=s==null?void 0:s.dataset)==null?void 0:l.act;if(!o)return;e.preventDefault();let c=fa.get(o);if(!c){console.warn("[actions] unknown submit:",o);return}try{let m=c(e,s);m&&typeof m.catch=="function"&&m.catch(d=>{console.error("[action]",o,d),d!=null&&d.code&&S(d)})}catch(m){console.error("[action]",o,m)}}),document.addEventListener("change",e=>{var l,m,d,u,b;let s=e.target;if((l=s.matches)!=null&&l.call(s,".qty input"))return;let n=(m=s.dataset)!=null&&m.act?null:(d=s.closest)==null?void 0:d.call(s,"form[data-act][data-live]");if(!((u=s.dataset)!=null&&u.act)&&!n)return;let o=(b=s.dataset)!=null&&b.act?s:n,c=fa.get(o.dataset.act);if(c)try{let g=c(e,o);g&&typeof g.catch=="function"&&g.catch($=>console.error($))}catch(g){console.error(g)}}),document.addEventListener("click",e=>{let s=e.target.closest(".qty [data-q]");if(!s)return;e.preventDefault(),fa.get("qty-btn")(e,s)}),document.addEventListener("error",e=>{let s=e.target;if((s==null?void 0:s.tagName)!=="IMG"||s.dataset.fallbackDone)return;s.dataset.fallbackDone="1";let n=s.dataset.glyph||"misc";s.src=Nm(n)},!0)}function Nm(t){let s=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="300" height="300"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#123a52"/><stop offset="1" stop-color="#0a2135"/></linearGradient></defs><rect width="100" height="100" fill="url(#g)"/><g fill="none" stroke="#7fd3ec" stroke-opacity=".8" stroke-width="3.4" stroke-linejoin="round" stroke-linecap="round"><path d="${Si[t]||Si.box}"/></g></svg>`;return`data:image/svg+xml;utf8,${encodeURIComponent(s)}`}var fa,Si,bt=V(()=>{K();G();J();tt();U();K();at();J();fa=new Map;y("add-cart",async(t,e)=>{let s=e.dataset.id,n=Number(e.dataset.qty||1)||1;await D(e,async()=>{try{await os(s,n),x(a("card.added"),{timeout:2600})}catch(o){S(o)}})});y("wish-toggle",async(t,e)=>{if(!p.me){ht("#/auth?next="+encodeURIComponent(location.hash.slice(1)));return}try{let s=await dn(e.dataset.id);lt(s.in?a("card.wishlistAdd"):a("card.wishlistRemove"),{timeout:2e3})}catch(s){S(s)}});y("compare-toggle",async(t,e)=>{if(!p.me){ht("#/auth?next="+encodeURIComponent(location.hash.slice(1)));return}try{(await mn(e.dataset.id)).in===!1?lt(a("compare.remove"),{timeout:1800}):x(a("compare.add"),{timeout:1800})}catch(s){S(s)}});y("notify-me",async(t,e)=>{if(!p.me){ht("#/auth?next="+encodeURIComponent(location.hash.slice(1)));return}try{let s=await pn(e.dataset.id);x(s.on?a("common.notified"):a("common.notifyMe"),{timeout:2400}),document.querySelectorAll(`[data-act="notify-me"][data-id="${e.dataset.id}"]`).forEach(n=>{n.classList.toggle("active",s.on)})}catch(s){S(s)}});y("lightbox",(t,e)=>{let s=[];try{s=JSON.parse(e.dataset.imgs||"[]")}catch(n){s=[e.dataset.imgs||""]}He(s,Number(e.dataset.i||0),e.dataset.alt||"")});y("sound-toggle",()=>{var s;let t=!((s=p.prefs)!=null&&s.uiSound);Te("uiSound",t);let e=document.querySelector('[data-act="sound-toggle"]');e&&(e.setAttribute("aria-pressed",String(t)),e.innerHTML=r`${i(t?"volume":"volume-off")} ${a("misc.uiSound")} <span class="um-sw ${t?"on":""}" aria-hidden="true"></span>`),lt(t?a("misc.uiSoundOn"):a("misc.uiSoundOff"),{timeout:1600}),t&&ps(!0)});y("copy",async(t,e)=>{let{copyText:s}=await Promise.resolve().then(()=>(U(),as));try{await s(e.dataset.text||e.textContent.trim()),x(a("common.copied"),{timeout:1800})}catch(n){Y(a("err.generic"))}});y("share",async(t,e)=>{let s=e.dataset.url||location.href,n=e.dataset.title||document.title;if(navigator.share)try{await navigator.share({title:n,url:s});return}catch(c){return}let{copyText:o}=await Promise.resolve().then(()=>(U(),as));try{await o(s),x(a("misc.shareDone"),{timeout:2e3})}catch(c){Y(a("err.generic"))}});y("quick-view",async(t,e)=>{var n;let s=e.dataset.id;try{let c=(await v.get(`/api/products/${encodeURIComponent(s)}`)).product;ut({title:vt(c),size:"md",body:r`
        <div class="row">
          <div class="qv-media">${(n=c.images)!=null&&n[0]?r`<img src="${c.images[0]}" alt="${vt(c)}" class="qv-img" data-glyph="${c.glyph||"misc"}">`:i(c.glyph||"box")}</div>
          <div class="grow">
            ${c.brandName?r`<div class="pc-brand">${c.brandName}</div>`:""}
            <div class="pc-rate mb-s">${Ht(c.ratingAvg)} <span class="muted tiny">${f(c.ratingAvg)} · ${f(c.ratingCount)} ${a("common.reviews")}</span></div>
            <div class="buy-price">
              ${c.oldPrice>c.price?r`<span class="pc-old">${A(c.oldPrice)}</span>`:""}
              <span class="buy-now">${A(c.price)}</span>
            </div>
            <div class="pc-stock ${c.stock<=0?"out":c.stock<=3?"low":""}"><span class="dot"></span>${c.stock<=0?a("card.outOfStock"):a("pdp.stockCount",{n:f(c.stock)})}</div>
          </div>
        </div>
        ${c.description?r`<p class="muted small mt-s">${h(c.description).slice(0,220)}…</p>`:""}
        <div class="row mt">
          <a class="btn btn-ghost" href="#/product/${c.id}">${a("common.details")} ${i("chevron-left")}</a>
        </div>`,footer:r`
        <button type="button" class="btn btn-ghost" data-close>${a("common.close")}</button>
        <button type="button" class="btn btn-primary" data-add ${c.stock<=0?"disabled":""}>${i("cart")} ${a("pdp.addToCart")}</button>`,onMount:(l,m)=>{l.querySelector("[data-close]").addEventListener("click",()=>m.close()),l.querySelector("[data-add]").addEventListener("click",async d=>{await D(d.currentTarget,async()=>{try{await os(c.id,1),x(a("card.added"),{timeout:2200}),m.close()}catch(u){S(u)}})})}})}catch(o){S(o)}});y("ui-retry",()=>{Promise.resolve().then(()=>(at(),pe)).then(t=>t.refresh())});y("scroll-top",()=>window.scrollTo({top:0,behavior:"smooth"}));y("qty-btn",(t,e)=>{let s=e.closest(".qty"),n=s==null?void 0:s.querySelector("input");if(!n)return;let o=Number(e.dataset.q||0),c=Number(n.min||1),l=Number(n.max||99),m=Math.max(c,Math.min(l,(Number(n.value)||c)+o));n.value=m,n.dispatchEvent(new Event("change",{bubbles:!0}))});y("confirm-nav",async(t,e)=>{await kt({text:e.dataset.text||a("misc.confirmDelete"),danger:e.dataset.danger==="1",okText:e.dataset.ok||""})&&e.dataset.href&&ht(e.dataset.href)});y("acc",(t,e)=>{let s=e.closest(".acc-item");if(!s)return;let n=s.classList.toggle("open"),o=s.querySelector(".acc-b");o&&(o.hidden=!n),e.setAttribute("aria-expanded",String(n))});y("print-page",()=>{window.print()});y("captcha-open",(t,e)=>{let s=e.closest("[data-captcha]"),n=s==null?void 0:s.querySelector("[data-cch]");n&&(n.hidden=!e.checked,e.checked&&!s.dataset.cid&&We(s))});y("captcha-refresh",(t,e)=>We(e.closest("[data-captcha]")));y("captcha-check",async(t,e)=>{let s=e.closest("[data-captcha]");if(!s||e.disabled||s.dataset.verifying)return;let n=s==null?void 0:s.querySelector("[data-cst]"),o=s==null?void 0:s.querySelector("[data-ctok]"),c=String(e.value||"").trim();if(!(!c||!(s!=null&&s.dataset.cid))){s.dataset.verifying="1";try{let l=await v.post("/api/captcha/verify",{id:s.dataset.cid,answer:c});o&&(o.value=l.token||"");let m=s.querySelector("[name=captchaBox]");m&&(m.checked=!0,m.disabled=!0),e.disabled=!0,n&&(n.textContent=a("captcha.solved"),n.style.color="")}catch(l){n&&(n.textContent=(l==null?void 0:l.message)||a("captcha.hint"),n.style.color="var(--danger)"),await We(s)}finally{delete s.dataset.verifying}}});y("noop",()=>{});y("open-select",(t,e)=>{let s=e.dataset.name,n=e.dataset.title||a("common.select"),o=e.dataset.val,c=[];try{c=JSON.parse(e.dataset.opts||"[]")}catch(m){}let l=xn({title:n,body:r`<div class="col" style="gap:4px; padding-bottom: 20px; max-height: 60vh; overflow-y: auto;">
      ${c.map(m=>r`<button class="btn" style="justify-content: flex-start; padding: 14px 16px; background: ${String(m.value)===String(o)?"var(--primary)":"var(--surface-2)"}; color: ${String(m.value)===String(o)?"#fff":"inherit"}; border-radius: 12px; font-size: 15px;" data-v="${m.value}">${m.label}</button>`).join("")}
    </div>`});l.panel.querySelectorAll("button[data-v]").forEach(m=>{m.addEventListener("click",()=>{let d=m.dataset.v;e.dataset.val=d;let u=e.querySelector(".sb-txt");u&&(u.textContent=m.textContent);let b=e.parentElement.querySelector(`input[name="${s}"]`);b&&(b.value=d,b.dispatchEvent(new Event("change",{bubbles:!0}))),l.close()})})});Si={cable:"M30 40h14v14H30zM37 54c0 18 12 20 20 14s20-4 22 8M62 66h16v12H62z",adapter:"M34 34h32v34H34zM42 34V22M58 34V22M44 68h12v8H44z",shield:"M34 22h32v56H34zM40 28h12v16H40z",layers:"M36 26h28v48H36zM30 34l30-14 30 14",battery:"M26 40h48v26H26zM32 46h8v14h-8zM44 46h8v14h-8z",plug:"M24 42h34v16H24zM58 36h22v28H58z",speaker:"M30 24h40v52H30zM50 54a10 10 0 1 0 0 .1M50 32a5 5 0 1 0 0 .1",headset:"M28 56a22 22 0 0 1 44 0M24 52h10v20H24zM66 52h10v20H66z",watch:"M38 34h24v32H38zM42 14h16v20H42zM42 66h16v20H42z",camera:"M50 18a18 18 0 1 0 0 36 18 18 0 0 0 0-36zM50 54v34M50 88l-14-24M50 88l14-24",zap:"M26 44h14l6-8h10l6 8h14a10 10 0 0 1 0 20H26a10 10 0 0 1 0-20",truck:"M38 28h24v30H38zM44 58h12v10H44z",light:"M30 26h18l6 12H24zM34 38h20v40H34z",mic:"M42 18h16v28H42zM36 40a14 14 0 0 0 28 0M50 54v30M36 86h28",box:"M26 36 50 24l24 12v28L50 76 26 64zM26 36l24 12 24-12M50 48v28",phone:"M36 16h28v68H36zM44 74h12"};y("pdp-lower-price",(t,e)=>{let s=e.dataset.id;Promise.resolve().then(()=>(J(),Ma)).then(({modal:n})=>{n({title:"\u06AF\u0632\u0627\u0631\u0634 \u0642\u06CC\u0645\u062A \u0645\u0646\u0627\u0633\u0628\u200C\u062A\u0631",content:r`
        <form data-act="submit-lower-price" data-id="${s}">
          <p class="mb">اگر این کالا را در فروشگاه دیگری با قیمت پایین‌تر دیده‌اید، به ما اطلاع دهید:</p>
          <div class="form-grid mb">
            ${field({label:"\u0642\u06CC\u0645\u062A \u0641\u0631\u0648\u0634\u06AF\u0627\u0647 \u062F\u06CC\u06AF\u0631 (\u062A\u0648\u0645\u0627\u0646)",name:"price",type:"number",required:!0})}
            ${field({label:"\u0622\u062F\u0631\u0633 \u0641\u0631\u0648\u0634\u06AF\u0627\u0647 (\u0644\u06CC\u0646\u06A9 \u0633\u0627\u06CC\u062A \u06CC\u0627 \u0646\u0627\u0645)",name:"url",required:!0})}
          </div>
          <div class="row row-wrap mt">
            <button type="submit" class="btn btn-primary">${i("send")} ثبت</button>
            <button type="button" class="btn btn-ghost" data-act="modal-close">لغو</button>
          </div>
        </form>
      `})})});y("submit-lower-price",async(t,e)=>{t.preventDefault();let{withBusy:s,toastSuccess:n,toastApiError:o}=await Promise.resolve().then(()=>(J(),Ma));await s(e,async()=>{var c,l;try{await v.post("/api/reports/lower-price",{productId:e.dataset.id,price:Number(e.price.value),url:e.url.value}),n("\u0628\u0627 \u062A\u0634\u06A9\u0631! \u06AF\u0632\u0627\u0631\u0634 \u0634\u0645\u0627 \u062B\u0628\u062A \u0634\u062F."),(l=(c=e.closest('[role="dialog"]'))==null?void 0:c.querySelector("[data-lx]"))==null||l.click()}catch(m){o(m)}})});y("accept-consent-now",async(t,e)=>{let{setConsent:s}=await Promise.resolve().then(()=>(K(),qa));s({terms:!0,privacy:!0,marketing:!1}),x(isFa()?"\u0642\u0648\u0627\u0646\u06CC\u0646 \u0648 \u0645\u0642\u0631\u0631\u0627\u062A \u0628\u0627 \u0645\u0648\u0641\u0642\u06CC\u062A \u067E\u0630\u06CC\u0631\u0641\u062A\u0647 \u0634\u062F.":"Terms accepted."),sessionStorage.removeItem("consentDeferred");let{maybeConsent:n}=await Promise.resolve().then(()=>(uo(),po));n(),Promise.resolve().then(()=>(at(),pe)).then(o=>o.refresh())})});function Im(){let t=Zt().mapCoords||{lat:35.731026,lng:51.488461};return{lat:Number(t.lat),lng:Number(t.lng)}}function Rm(t,e){let s=`${t.lat},${t.lng}`,n=e?`${e.lat},${e.lng}`:"";return[{id:"neshan",label:a("contact.neshan"),icon:"map",href:e?`https://nshn.ir/maps?origin=${n}&destination=${s}&type=drive`:`https://nshn.ir/?lat=${t.lat}&lng=${t.lng}`},{id:"balad",label:a("contact.balad"),icon:"pin",href:e?`https://balad.ir/route/${n.replace(",",",")}/${s}`:`https://balad.ir/map?lat=${t.lat}&lng=${t.lng}`},{id:"osm",label:a("contact.osm"),icon:"globe",href:e?`https://www.openstreetmap.org/directions?from=${n.replace(",",";")}&to=${s.replace(",",";")}`:`https://www.openstreetmap.org/?mlat=${t.lat}&mlon=${t.lng}#map=17/${t.lat}/${t.lng}`},{id:"google",label:a("contact.google"),icon:"external",href:e?`https://www.google.com/maps/dir/?api=1&destination=${s}&origin=${n}`:`https://www.google.com/maps/search/?api=1&query=${s}`}]}function Bm(){return new Promise(t=>{if(!("geolocation"in navigator))return t(null);let e=!1,s=o=>{e||(e=!0,t(o))},n=setTimeout(()=>s(null),7e3);navigator.geolocation.getCurrentPosition(o=>{clearTimeout(n),s({lat:o.coords.latitude,lng:o.coords.longitude})},()=>{clearTimeout(n),s(null)},{enableHighAccuracy:!1,timeout:6e3,maximumAge:12e4})})}function Hm(){let t=Im(),e=null;return ut({title:a("contact.mapAsk"),size:"sm",body:r`
      <p class="notice notice-info mb">${i("info")}<span>${a("contact.mapPermission")}</span></p>
      <div class="col" data-maps></div>`,footer:r`<button type="button" class="btn btn-ghost" data-x>${a("common.close")}</button>`,onMount:(n,o)=>{let c=n.querySelector("[data-maps]"),l=()=>{c.innerHTML=Rm(t,e).map(m=>r`
          <a class="btn btn-ghost btn-block" href="${m.href}" target="_blank" rel="noopener noreferrer">${i(m.icon)} ${m.label} ${i("external")}</a>`).join("")};l(),n.querySelector("[data-x]").addEventListener("click",()=>o.close()),Bm().then(m=>{m&&(e=m,l(),x(a("contact.locationOn"),{timeout:2400}))})}})}var Ei=V(()=>{G();K();J();U();bt();y("open-map",t=>{var e;(e=t.preventDefault)==null||e.call(t),Hm()});y("install-app",async()=>{p.installPrompt?await Ea()||Fe():Fe()})});var po={};Z(po,{ecoPaused:()=>dp,maybeConsent:()=>Ai,updateBadges:()=>va});async function Fm(){var t;xi(),location.search.includes("_nocache")&&history.replaceState(null,"",location.pathname+location.hash),Vm(),await on(),Qe(),ya(),Xe(),Gm(),Qm(),gr(),wn(),kn(),tp(),ep(),mo(),rp(),sp(),Jm(),Xm(),cp(),mp(),pp(),op(),np(),Ai(),ap(),Ti(),jm(),zm(),Um(),(t=document.getElementById("bootSplash"))==null||t.remove()}function Ti(){let t=document.getElementById("welcomeScreen");if(!t)return;let e=Math.max(0,700-(performance.now()-Om));setTimeout(()=>{t.classList.add("gone"),setTimeout(()=>t.parentNode&&t.parentNode.removeChild(t),520)},e)}function jm(){let t=document.getElementById("btnRefresh");t&&t.addEventListener("click",async()=>{if(typeof navigator!="undefined"&&!navigator.onLine){let{toastError:e}=await Promise.resolve().then(()=>(J(),Ma)),{isFa:s}=await Promise.resolve().then(()=>(G(),Co));e(s()?"\u0628\u0631\u0627\u06CC \u0628\u0631\u0648\u0632\u0631\u0633\u0627\u0646\u06CC \u0648 \u062D\u0630\u0641 \u06A9\u0634 \u0628\u0627\u06CC\u062F \u0628\u0647 \u0627\u06CC\u0646\u062A\u0631\u0646\u062A \u0645\u062A\u0635\u0644 \u0628\u0627\u0634\u06CC\u062F":"You must be online to refresh the app.");return}try{if("serviceWorker"in navigator){let e=await navigator.serviceWorker.getRegistrations();for(let s of e)await s.unregister()}if("caches"in window){let e=await caches.keys();for(let s of e)await caches.delete(s)}}catch(e){console.warn("Cache clear failed",e)}location.href=location.pathname+"?_nocache="+Date.now()})}function zm(){let t=()=>{for(let s of document.querySelectorAll('button[aria-label],a[aria-label],[role="button"][aria-label]'))s.title||(s.title=s.getAttribute("aria-label")||"")};t();let e=new MutationObserver(()=>{clearTimeout(e._t),e._t=setTimeout(t,350)});e.observe(document.body,{childList:!0,subtree:!0})}function Um(){let t=new Set,e=(s,n,o)=>{let c=String(s).slice(0,120);if(!(t.has(c)||t.size>12)){t.add(c);try{let l=JSON.stringify({msg:String(s).slice(0,300),src:String(n||"").slice(0,200),line:o||0,path:location.hash.slice(0,120),build:window.__BM_BUILD||""});navigator.sendBeacon?navigator.sendBeacon("/api/client-error",new Blob([l],{type:"application/json"})):fetch("/api/client-error",{method:"POST",headers:{"Content-Type":"application/json"},body:l,keepalive:!0}).catch(()=>{})}catch(l){}}};window.addEventListener("error",s=>e(s.message,s.filename,s.lineno)),window.addEventListener("unhandledrejection",s=>{var n;return e(`unhandledrejection: ${((n=s.reason)==null?void 0:n.message)||s.reason}`,location.href,0)})}function Qe(){var d,u;let t=Zt(),e=re(),s=I("#topbar"),n=[];t.freeShipOver&&n.push(q()?`\u0627\u0631\u0633\u0627\u0644 \u0631\u0627\u06CC\u06AF\u0627\u0646 \u0633\u0641\u0627\u0631\u0634\u200C\u0647\u0627\u06CC \u0628\u0627\u0644\u0627\u06CC ${f(t.freeShipOver)} \u062A\u0648\u0645\u0627\u0646`:`Free shipping over ${f(t.freeShipOver)}`),n.push(q()?"\u0636\u0645\u0627\u0646\u062A \u0627\u0635\u0627\u0644\u062A \u06A9\u0627\u0644\u0627\u061B \u0645\u0631\u062C\u0648\u0639 \u062A\u0627 \u06F7 \u0631\u0648\u0632":"Authenticity guarantee; 7-day returns"),t.phone&&n.push(q()?`\u067E\u0634\u062A\u06CC\u0628\u0627\u0646\u06CC \u0647\u0631 \u0631\u0648\u0632 \u06F9 \u062A\u0627 \u06F2\u06F1 \u2014 ${ot(t.phone)}`:`Support 9\u201321 daily \u2014 ${ot(t.phone)}`),(d=t.socials)!=null&&d.instagram,n.push(q()?"\u062A\u0627\u0632\u0647\u200C\u0647\u0627\u06CC \u06AF\u062C\u062A \u0647\u0631 \u0647\u0641\u062A\u0647 \u062F\u0631 \u0627\u06CC\u0646\u0633\u062A\u0627\u06AF\u0631\u0627\u0645 \u06CC\u0627\u0633\u0627\u06CC\u06CC":"New gadgets weekly on Instagram");let o=(u=p.ticker)!=null&&u.length?p.ticker:n;s.hidden=!1,s.classList.toggle("no-ticker",e.showTicker===!1);let c=o.map(b=>r`<span class="ticker-item">${i("sparkles")} ${b}</span>`).join("");I("#ticker").innerHTML=`<div class="ticker-track">${c}${c}</div>`;let l=I("#tb-phone");l.href=`tel:${t.phone||""}`,l.innerHTML=r`${i("phone")} ${ot(t.phone||"")}`,I("#brandName").textContent=q()?t.name||a("app.name"):t.nameEn||t.name||"Yassaei Electronics",I("#brandTag").textContent=q()?t.tagline||"":t.taglineEn||"",I("#brandLink").setAttribute("aria-label",`${t.name||""} \u2014 ${a("nav.home")}`),Wm(),_m(),_s(),va();let m=I("#btnInstallApp");m&&(m.hidden=p.installed)}function Wm(){let t=I("#navInner"),e=p.categories.filter(d=>!d.parentId).slice(0,10),n=[{key:"/",href:"#/",icon:"home",label:a("nav.home")},{key:"/products",href:"#/products",icon:"grid",label:a("nav.products")}].map(d=>r`<a class="nav-link" data-nav-key="${d.key}" href="${d.href}">${i(d.icon)} ${d.label}</a>`).join("");n+=r`
    <div class="nav-more">
      <a href="#/products" class="nav-link">${i("layers")} ${a("nav.allCategories")} ${i("chevron-down")}</a>
      <div class="nav-dd mega-menu hidden-default">
        <div class="mega-side">
          ${p.categories.filter(d=>!d.parentId).map(d=>r`<a href="#/category/${d.id}" class="mega-side-link" data-cat="${d.id}">${i(xe(d.glyph))} ${qt(d)}</a>`)}
        </div>
        <div class="mega-content">
          <div class="mega-empty muted small">${a("nav.allCategories")}</div>
        </div>
      </div>
    </div>`;let o=[{key:"/deals",href:"#/products?discount=1",icon:"percent",label:a("nav.deals"),show:H("coupons")},{key:"/new",href:"#/products?sort=newest",icon:"sparkles",label:a("nav.new"),show:!0},{key:"/stats",href:"#/stats",icon:"chart",label:a("nav.stats"),show:H("publicStats")},{key:"/price-check",href:"#/price-check",icon:"barcode",label:a("priceCheck.title"),show:H("priceCheckDevice")},{key:"/lottery",href:"#/lottery",icon:"gift2",label:a("lot.nav"),show:!0},{key:"/pages/installments",href:"#/pages/installments",icon:"card",label:q()?"\u062E\u0631\u06CC\u062F \u0627\u0642\u0633\u0627\u0637\u06CC":"Installments",show:!0},{key:"/pages/about",href:"#/pages/about",icon:"store",label:a("nav.about"),show:!0},{key:"/pages/contact",href:"#/pages/contact",icon:"map",label:a("nav.contact"),show:!0}].filter(d=>d.show);n+=o.map(d=>r`<a class="nav-link" data-nav-key="${d.key}" href="${d.href}">${i(d.icon)} ${d.label}</a>`).join("");let c=le("ticker");c.length&&(n+=r`<span class="nav-link muted tiny">${c[0].title}</span>`),t.innerHTML=n;let l=t.querySelectorAll(".mega-side-link"),m=t.querySelector(".mega-content");if(l.length&&m){let d=u=>{l.forEach(k=>k.classList.remove("active")),u.classList.add("active");let b=u.dataset.cat,g=p.categories.filter(k=>k.parentId===b),$=p.brands.slice(0,10),w=`<a href="#/category/${b}" class="mega-see-all" style="margin-top:0;">${a("nav.allCategories")} ${qt(p.categories.find(k=>k.id===b)||{})} ${i("chevron-left")}</a>`;w+='<div class="mega-sub-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 24px; align-items: start; align-content: start;">',g.length&&(w+='<div class="mega-sub-col" style="display:flex; flex-direction:column; gap:8px;"><h3>\u062F\u0633\u062A\u0647\u200C\u0628\u0646\u062F\u06CC\u200C\u0647\u0627\u06CC \u0632\u06CC\u0631\u0645\u062C\u0645\u0648\u0639\u0647</h3>',g.forEach(k=>{w+=`<a href="#/category/${k.id}" style="margin:0;">${qt(k)}</a>`}),w+="</div>"),w+=`<div class="mega-sub-col" style="${g.length?"":"grid-column: 1 / -1;"} display:flex; flex-direction:column; gap:8px;"><h3>\u0628\u0631\u0646\u062F\u0647\u0627\u06CC \u067E\u0631\u0637\u0631\u0641\u062F\u0627\u0631 \u0627\u06CC\u0646 \u062F\u0633\u062A\u0647</h3><div style="display: flex; flex-wrap: wrap; gap: 8px;">`,$.forEach(k=>{w+=`<a href="#/products?cat=${b}&brand=${k.id}" class="chip" style="margin:0;">${Gt(k)}</a>`}),w+="</div></div></div>",m.innerHTML=w,m.scrollTop=0};l.forEach(u=>{u.addEventListener("mouseenter",()=>d(u))}),l[0]&&d(l[0])}}function _m(){let t=Zt();I("#fBrandName").textContent=q()?t.name||a("app.name"):t.nameEn||t.name||"",I("#fDesc").textContent=q()?t.description||"":t.descriptionEn||t.description||"",I("#fYear").textContent=q()?oe(new Date().getFullYear()):String(new Date().getFullYear()),I("#fBadges").innerHTML=r`
    <span class="f-badge">${i("shield")}<span>${a("home.point1")}</span></span>
    <span class="f-badge">${i("package-check")}<span>${a("home.point2")}</span></span>
    ${H("insurance")?r`<span class="f-badge">${i("scale")}<span>${a("common.insurance")}</span></span>`:""}
    ${H("plus")?r`<span class="f-badge">${i("sparkles")}<span>${a("footer.plus")}</span></span>`:""}`;let e=t.socials||{},s=[["instagram",Dt(e.instagram||"https://instagram.com/jam.yassaei"),"camera"],["telegram",Dt(e.telegram),"send"],["whatsapp",e.whatsapp?`https://wa.me/${String(e.whatsapp).replace(/\D/g,"")}`:"","chat"],["eitaa",Dt(e.eitaa),"globe"]].filter(n=>n[1]);I("#fSocial").innerHTML=s.length?s.map(([n,o,c])=>r`<a href="${o}" target="_blank" rel="noopener noreferrer" aria-label="${n}" title="${n}">${i(c)}</a>`).join(""):r`<span class="muted tiny">${a("footer.contactUs")}</span>`,I("#fContact").innerHTML=r`
    <li>${i("phone")}<span>${a("contact.phone")}: <a href="tel:${t.phone}">${ot(t.phone||"")}</a></span></li>
    <li>${i("chat")}<span>${a("contact.mobile")}: <a href="tel:${t.phone2||t.phone}">${ot(t.phone2||"")}</a></span></li>
    <li>${i("mail")}<span><a href="mailto:${t.email}">${t.email}</a></span></li>
    <li>${i("pin")}<span>${q()?t.address||"":t.addressEn||t.address||""}</span></li>
    <li>${i("clock")}<span>${a("footer.workingHours")}: ${(t.workingHours||[]).map(n=>r`<bdi>${q()?n.fa:n.en} ${q()?n.time:n.timeEn}</bdi>`)}</span></li>`,I("#fMinimap").innerHTML=ea(),I("#fMinimap").setAttribute("title",a("contact.mapTitle"))}function _s(){var l,m,d,u;let t=I("#userMenu"),e=I("#btnAuth");if(!p.me){t.hidden=!0,e.hidden=!1,e.innerHTML=r`${i("user")}<span data-i18n="nav.login">${a("nav.login")}</span>`;return}e.hidden=!0,t.hidden=!1;let s=p.me,n=(s.name||s.username||"?").trim().charAt(0);t.innerHTML=r`
    <button type="button" class="um-btn" data-um aria-expanded="false" aria-haspopup="true">
      <span class="um-avatar">${h(n)}</span>
      <span class="um-name">${h(s.name||s.username)}</span>
      ${i("chevron-down")}
    </button>
    <div class="um-dd" data-umbox hidden>
      <div class="um-dd-head">
        <div class="b">${h(s.name||s.username)}</div>
        <div class="tiny muted">${h(s.phone||s.email||s.username)}</div>
        ${te()?r`<span class="badge-pill bp-accent mt-s">${i("sparkles")} ${a("acc.plus")}</span>`:""}
      </div>
      <a href="#/account">${i("user")} ${a("acc.dashboard")}</a>
      <a href="#/account/orders">${i("package-check")} ${a("acc.orders")}</a>
      <a href="#/account/wishlist">${i("heart")} ${a("acc.wishlist")} <span class="um-count">${f(p.wishlist.length)}</span></a>
      ${H("wallet")?r`<a href="#/account/wallet">${i("wallet")} ${a("acc.wallet")} <span class="um-count">${f(((l=s.wallet)==null?void 0:l.balance)||0)}</span></a>`:""}
      ${H("tickets")?r`<a href="#/account/tickets">${i("ticket")} ${a("acc.tickets")}</a>`:""}
      <a href="#/account/notifications">${i("bell")} ${a("acc.notifications")} ${p.unread?r`<span class="um-count">${f(p.unread)}</span>`:""}</a>
      ${s.isAdmin?r`<div class="sep"></div><a href="#/admin">${i("settings")} ${a("nav.admin")}</a>`:""}
      <div class="sep"></div>
      <button type="button" data-act="sound-toggle" aria-pressed="${(m=p.prefs)!=null&&m.uiSound?"true":"false"}">${i((d=p.prefs)!=null&&d.uiSound?"volume":"volume-off")} ${a("misc.uiSound")} <span class="um-sw ${(u=p.prefs)!=null&&u.uiSound?"on":""}" aria-hidden="true"></span></button>
      <button type="button" data-act="logout">${i("logout")} ${a("common.logout")}</button>
    </div>`;let o=t.querySelector("[data-um]"),c=t.querySelector("[data-umbox]");o.addEventListener("click",b=>{b.stopPropagation(),c.hidden=!c.hidden,o.setAttribute("aria-expanded",String(!c.hidden))}),document.addEventListener("click",b=>{!c.hidden&&!b.target.closest(".user-menu")&&(c.hidden=!0,o.setAttribute("aria-expanded","false"))})}function va(){var e,s;let t=(n,o)=>{let c=I(n);c&&(c.hidden=!o,c.textContent=f(o))};t("#cartBadge",((e=p.cart)==null?void 0:e.count)||0),t("#mnCart",((s=p.cart)==null?void 0:s.count)||0),t("#wishBadge",p.wishlist.length),t("#notifBadge",p.unread)}function Vm(){var s,n,o,c;(s=I("#btnTheme"))==null||s.addEventListener("click",()=>{let m=(p.prefs.theme==="auto"?document.documentElement.getAttribute("data-mode")||"dark":p.prefs.theme)==="dark"?"light":"dark";Te("theme",m);let d=I("#btnTheme");d.innerHTML=i(m==="dark"?"moon":"sun")}),(n=I("#btnLang"))==null||n.addEventListener("click",async()=>{let l=wt()==="fa"?"en":"fa";Te("locale",l),I("#langChip").textContent=l==="fa"?"EN":"\u0641\u0627",Xe(),Qe(),Xe(),T(!0)}),(o=I("#btnMenu"))==null||o.addEventListener("click",()=>Ym());let t=I("#fabTop");t==null||t.addEventListener("click",()=>window.scrollTo({top:0,behavior:"smooth"}));let e=!1;addEventListener("scroll",()=>{e||!t||(e=!0,requestAnimationFrame(()=>{t.hidden=scrollY<600,e=!1}))},{passive:!0}),(c=I("#btnInstallApp"))==null||c.addEventListener("click",async()=>{p.installPrompt?await Ea()||Fe():Fe()})}function Ym(){Sn({title:r`<div style="display:flex;align-items:center;gap:12px;font-size:16px;font-weight:700">
      ${i("menu")} ${a("nav.menu")}
    </div>`,body:r`
      <div class="col" style="gap: 8px">
        <a class="nav-link" href="#/" style="padding: 12px; font-size: 15px; border-bottom: 1px solid var(--border)">${i("home")} ${a("nav.home")}</a>
        <a class="nav-link" href="#/products" style="padding: 12px; font-size: 15px; border-bottom: 1px solid var(--border)">${i("grid")} ${a("nav.products")}</a>
        ${p.categories.filter(t=>!t.parentId).map(t=>r`<a class="nav-link" href="#/category/${t.id}" style="padding: 12px; font-size: 15px; border-bottom: 1px solid var(--border)">${i(xe(t.glyph))} ${qt(t)}</a>`).join("")}
        <div class="divider" style="margin: 4px 0"></div>
        <a class="nav-link" href="#/pages/installments" style="padding: 12px; font-size: 15px; border-bottom: 1px solid var(--border)">${i("card")} خرید اقساطی</a>
        <a class="nav-link" href="#/pages/about" style="padding: 12px; font-size: 15px; border-bottom: 1px solid var(--border)">${i("store")} ${a("nav.about")}</a>
        <a class="nav-link" href="#/pages/contact" style="padding: 12px; font-size: 15px; border-bottom: 1px solid var(--border)">${i("map")} ${a("nav.contact")}</a>
        ${p.me?"":r`<a class="btn btn-primary btn-block mt-s" href="#/auth" style="margin-top: 16px">${i("user")} ${a("nav.login")}</a>`}
      </div>`})}function Gm(){var l,m;let t=I("#searchForm"),e=I("#searchInput"),s=I("#suggestBox"),n=-1,o=()=>{s.hidden=!0,n=-1},c=Ze(async()=>{var u,b,g;let d=e.value.trim();if(!d){if(!p.searches.length){o();return}s.hidden=!1,s.innerHTML=r`
        <div class="sg-group">${a("search.recent")}</div>
        ${p.searches.map($=>r`<div class="sg-item" data-q="${$}">${i("history")}<span class="sg-title">${$}</span></div>`)}`;return}try{let $=await v.get(`/api/search?q=${encodeURIComponent(d)}&limit=7`);s.hidden=!1;let w="";$.didYouMean&&(w+=r`<div class="sg-group">${a("search.didYouMean")}</div><div class="sg-item" data-q="${$.didYouMean}">${i("sparkles")}<span class="sg-title">${$.didYouMean}</span></div>`),(u=$.categories)!=null&&u.length&&(w+=r`<div class="sg-group">${a("search.inCategories")}</div>${$.categories.map(k=>r`<a class="sg-item" href="#/category/${k.id}">${i(xe(k.glyph))}<span class="sg-title">${qt(k)}</span></a>`)}`),(b=$.brands)!=null&&b.length&&(w+=r`<div class="sg-group">${a("search.inBrands")}</div>${$.brands.map(k=>r`<div class="sg-item" data-q="${Gt(k)}">${i("tag")}<span class="sg-title">${Gt(k)}</span></div>`)}`),(g=$.products)!=null&&g.length&&(w+=r`<div class="sg-group">${a("search.inProducts")}</div>${$.products.map(k=>{var C;return r`
          <a class="sg-item" href="#/product/${k.id}">
            ${(C=k.images)!=null&&C[0]?r`<img class="sg-thumb" src="${k.images[0]}" alt="" loading="lazy" data-glyph="${k.glyph}">`:i(k.glyph||"box")}
            <span class="grow"><span class="sg-title">${vt(k)}</span><span class="sg-meta">${qt({name:k.categoryName,nameEn:k.categoryNameEn})}</span></span>
            <span class="sg-price">${f(k.price)}</span>
          </a>`})}`),w||(w=r`<div class="sg-item muted">${a("common.noResult")}</div>`),s.innerHTML=w}catch($){o()}},240);e.addEventListener("input",c),e.addEventListener("focus",c),document.addEventListener("click",d=>{d.target.closest(".searchbox")||o()}),s.addEventListener("click",d=>{if(d.target.closest("a.sg-item")){o();return}let u=d.target.closest("[data-q]");u&&(d.preventDefault(),e.value=u.dataset.q,o(),Ws(u.dataset.q))}),window.addEventListener("hashchange",o),t.addEventListener("submit",d=>{d.preventDefault();let u=e.value.trim();o(),Ws(u)}),e.addEventListener("keydown",d=>{var b;let u=[...s.querySelectorAll(".sg-item, a.sg-item")];if(d.key==="ArrowDown"||d.key==="ArrowUp"){if(!u.length)return;d.preventDefault(),n=(n+(d.key==="ArrowDown"?1:-1)+u.length)%u.length,u.forEach((g,$)=>g.classList.toggle("active",$===n)),(b=u[n])==null||b.scrollIntoView({block:"nearest"})}else if(d.key==="Enter"&&n>=0&&u[n]){d.preventDefault();let g=u[n];g.dataset.q?(e.value=g.dataset.q,Ws(g.dataset.q)):g.getAttribute("href")&&(location.hash=g.getAttribute("href")),o()}else d.key==="Escape"&&o()}),(l=I("#btnVoiceSearch"))==null||l.addEventListener("click",()=>Km(e,Ws)),(m=I("#btnImageSearch"))==null||m.addEventListener("click",()=>{if(!H("imageSearch")){lt(a("err.notFound"));return}ht("#/search/image")})}function Ws(t){let e=String(t||"").trim();e&&(fn(e),ht(`/products?q=${encodeURIComponent(e)}`))}async function Km(t,e){var l;let s=window.SpeechRecognition||window.webkitSpeechRecognition;if(!s){Y(a("search.noVoice"));return}try{(l=navigator.mediaDevices)!=null&&l.getUserMedia&&(await navigator.mediaDevices.getUserMedia({audio:!0})).getTracks().forEach(d=>d.stop())}catch(m){Y(a("search.micDenied"));return}let n=new s;n.lang=wt()==="fa"?"fa-IR":"en-US",n.interimResults=!1,n.maxAlternatives=1;let o=I("#btnVoiceSearch");o.classList.add("active");let c=lt(a("search.listening"),{timeout:2600});n.onresult=m=>{var u,b,g;c==null||c.close();let d=((g=(b=(u=m.results)==null?void 0:u[0])==null?void 0:b[0])==null?void 0:g.transcript)||"";d?(t.value=d,e(d)):lt(a("search.noSpeech"))},n.onerror=m=>{c==null||c.close();let u={"not-allowed":"search.micDenied","service-not-allowed":"search.micDenied",network:"search.voiceNetwork","no-speech":"search.noSpeech",aborted:null,"audio-capture":"search.noMic"}[m.error];u?Y(a(u)):m.error!=="aborted"&&Y(a("search.noSpeech"))},n.onend=()=>{o.classList.remove("active"),c==null||c.close()};try{n.start()}catch(m){o.classList.remove("active")}}function Qm(){let t=null,e=()=>{t==null||t.remove(),t=null,document.removeEventListener("keydown",onKey,!0)},s=async()=>{if(t){e();return}t=Xt("div",{class:"cmdk",role:"dialog","aria-modal":"true","aria-label":a("common.search")}),t.innerHTML=r`
      <div class="cmdk-box">
        <input class="cmdk-input" placeholder="${a("common.searchProducts")}" data-ci autocomplete="off">
        <div class="cmdk-list" data-cl></div>
        <div class="cmdk-foot"><span><kbd>↑↓</kbd> ${a("common.select")}</span><span><kbd>Enter</kbd> ${a("common.next")}</span><span><kbd>Esc</kbd> ${a("common.close")}</span></div>
      </div>`,document.body.appendChild(t);let n=t.querySelector("[data-ci]"),o=t.querySelector("[data-cl]");n.focus();let c=()=>{var u;return[{icon:"home",label:a("nav.home"),href:"#/"},{icon:"grid",label:a("nav.products"),href:"#/products"},{icon:"percent",label:a("nav.deals"),href:"#/products?discount=1"},{icon:"cart",label:a("cart.title"),href:"#/cart"},...p.me?[{icon:"user",label:a("acc.dashboard"),href:"#/account"},{icon:"package-check",label:a("acc.orders"),href:"#/account/orders"},...H("wallet")?[{icon:"wallet",label:a("acc.wallet"),href:"#/account/wallet"}]:[]]:[{icon:"user",label:a("nav.login"),href:"#/auth"}],...(u=p.me)!=null&&u.isAdmin?[{icon:"settings",label:a("adm.title"),href:"#/admin"}]:[],{icon:"moon",label:a("theme.toggle"),run:()=>I("#btnTheme").click()},{icon:"globe",label:"English / \u0641\u0627\u0631\u0633\u06CC",run:()=>I("#btnLang").click()},{icon:"chart",label:a("nav.stats"),href:"#/stats"},{icon:"map",label:a("nav.contact"),href:"#/pages/contact"}]},l=async u=>{let b=c().filter(g=>!u||g.label.toLowerCase().includes(u.toLowerCase()));if(u)try{let g=await v.get(`/api/search?q=${encodeURIComponent(u)}&limit=6`);b=[...b,...g.products.map($=>({icon:$.glyph||"box",label:vt($),meta:f($.price),href:`#/product/${$.id}`}))]}catch(g){}o.innerHTML=b.length?b.map((g,$)=>r`<div class="cmdk-item ${$===0?"active":""}" data-idx="${$}">${i(g.icon)}<span class="grow">${g.label}</span>${g.meta?r`<span class="muted tiny">${g.meta}</span>`:""}</div>`):r`<div class="cmdk-item muted">${a("common.noResult")}</div>`,o._items=b};await l(""),n.addEventListener("input",Ze(()=>l(n.value.trim()),200));let m=u=>{var g;let b=(g=o._items)==null?void 0:g[u];b&&(e(),b.run?b.run():b.href&&(location.hash=b.href))};o.addEventListener("click",u=>{let b=u.target.closest("[data-idx]");b&&m(Number(b.dataset.idx))});let d=0;onKey=u=>{var g;let b=o.querySelectorAll(".cmdk-item[data-idx]");u.key==="Escape"?(u.preventDefault(),e()):u.key==="ArrowDown"||u.key==="ArrowUp"?(u.preventDefault(),d=(d+(u.key==="ArrowDown"?1:-1)+b.length)%Math.max(1,b.length),b.forEach(($,w)=>$.classList.toggle("active",w===d)),(g=b[d])==null||g.scrollIntoView({block:"nearest"})):u.key==="Enter"&&(u.preventDefault(),m(d))},document.addEventListener("keydown",onKey,!0),t.addEventListener("click",u=>{u.target===t&&e()})};document.addEventListener("keydown",n=>{(n.ctrlKey||n.metaKey)&&String(n.key).toLowerCase()==="k"&&(n.preventDefault(),s())})}function Jm(){Ft("cart",va),Ft("wishlist",()=>{va(),_s()}),Ft("notifications",va),Ft("me",()=>{_s(),va()}),Ft("settings",()=>{Ce(),Qe(),Xe(),ya()}),document.addEventListener("view:rendered",()=>ya()),document.addEventListener("sleep:changed",()=>{ya(),Qe()}),Ft("install",()=>{let t=I("#btnInstallApp");t&&(t.hidden=!1)}),Ft("installed",()=>{let t=I("#btnInstallApp");t&&(t.hidden=!0),x(a("home.appInstalled"))}),Ft("online",t=>{t?x(a("err.online")):Zm()})}function Xm(){let t=async()=>{if(!document.documentElement.classList.contains("eco"))try{let e=await v.get("/api/system/status"),s=!!p.sleeping;p.sleeping=!!e.sleeping,p.sleepSince=e.since||null,s!==p.sleeping&&(ya(),Qe(),String(location.hash||"").startsWith("#/admin")&&T(!0))}catch(e){}};setInterval(t,45e3),document.addEventListener("visibilitychange",()=>{document.hidden||t()})}function ya(){let t=String(location.hash||"").startsWith("#/admin"),e=Q("settings.edit");Tn({sleeping:!!p.sleeping&&!(t&&e),canWake:e,since:p.sleepSince,onWake:async()=>{try{await v.post("/api/system/wake",{}),await Ot({silent:!0}),ya(),Qe(),x(a("sys.awake")),T(!0)}catch(s){S(s)}},onLogin:()=>ht("#/auth?next="+encodeURIComponent(location.hash.slice(1)))})}function Zm(){ho||(ho=!0,Y(a("err.offline"),{timeout:4200}))}function tp(){window.addEventListener("online",()=>{ho=!1})}function ep(){let t=I("#siteHeader"),e=I("#fabTop"),s=!1;window.addEventListener("scroll",()=>{s||(s=!0,requestAnimationFrame(()=>{t.classList.toggle("scrolled",window.scrollY>8),e.hidden=window.scrollY<420,s=!1}))},{passive:!0})}function Ci(){if(!bo&&(bo=!0,!!H("consent"))){if(sessionStorage.getItem("consentDeferred"))if(!location.hash.startsWith("#/pages/"))sessionStorage.removeItem("consentDeferred");else return;ut({title:a("consent.title"),dismissible:!1,closeBtn:!1,size:"md",body:r`
      <p class="confirm-text mb">${a("consent.text")}</p>
      <p class="hint mt-s">${i("info")} ${a("consent.ttlNote")}</p>
      <form data-act="consent-form" class="col">
        <label class="check"><input type="checkbox" name="terms" checked><span class="box">${i("check")}</span><span>${a("consent.terms")} <a class="section-link" href="#/pages/terms">${a("consent.readTerms")}</a></span></label>
        <label class="check"><input type="checkbox" name="privacy" checked><span class="box">${i("check")}</span><span>${a("consent.privacy")} <a class="section-link" href="#/pages/privacy">${a("consent.readPrivacy")}</a></span></label>
        <label class="check"><input type="checkbox" name="marketing"><span class="box">${i("check")}</span><span>${a("consent.marketing")}</span></label>
      </form>`,footer:r`<button type="button" class="btn btn-ghost" data-consent-min>${a("consent.rejectOptional")}</button><button type="button" class="btn btn-primary" data-consent-go>${a("consent.accept")}</button>`,onClose:()=>{bo=!1},onMount:(t,e)=>{let s=t.querySelector('[data-act="consent-form"]');t.querySelectorAll('a[href^="#/"]').forEach(o=>o.addEventListener("click",()=>{sessionStorage.setItem("consentDeferred","1"),e.close()}));let n=()=>{let o=s.querySelector("[name=terms]").checked,c=s.querySelector("[name=privacy]").checked,l=s.querySelector("[name=marketing]").checked;if(!o||!c){Y(a("form.termsRequired"));return}ds({terms:o,privacy:c,marketing:l}),p.me&&v.patch("/api/me",{notificationsPrefs:{marketing:l}}).catch(()=>{}),x(a("consent.thanks")),e.close()};t.closest('[role="dialog"]').querySelector("[data-consent-go]").addEventListener("click",n),t.closest('[role="dialog"]').querySelector("[data-consent-min]").addEventListener("click",()=>{ds({terms:!0,privacy:!0,marketing:!1}),p.me&&v.patch("/api/me",{notificationsPrefs:{marketing:!1}}).catch(()=>{}),x(a("consent.thanks")),e.close()}),s.addEventListener("submit",o=>{o.preventDefault(),n()})}})}}function Ai(){yn()||Ci()}function ap(){var t;if((t=p.me)!=null&&t.mustChangePassword){try{if(sessionStorage.getItem("bm_pwd_later"))return}catch(e){}Ke=ut({title:a("acc.passwordChange"),dismissible:!1,closeBtn:!1,size:"sm",body:r`
      <form data-act="force-pass">
        <p class="notice notice-warn mb">${i("alert")}<span>${wt()==="fa"?"\u0628\u0631\u0627\u06CC \u0627\u0645\u0646\u06CC\u062A \u0628\u06CC\u0634\u062A\u0631\u060C \u0631\u0645\u0632 \u067E\u06CC\u0634\u200C\u0641\u0631\u0636 \u0631\u0627 \u062A\u063A\u06CC\u06CC\u0631 \u0628\u062F\u0647.":"For security, change the default password."}</span></p>
        <label class="field"><span class="label">${a("acc.currentPassword")}</span><input class="input" type="password" name="current" autocomplete="current-password" required></label>
        <label class="field"><span class="label">${a("acc.newPassword2")}</span><input class="input" type="password" name="next" autocomplete="new-password" required><span class="hint">${a("auth.passwordRules")}</span></label>
        <label class="field"><span class="label">${a("common.passwordConfirm")}</span><input class="input" type="password" name="confirm" autocomplete="new-password" required></label>
        <button class="btn btn-primary btn-block" type="submit">${a("common.save")}</button>
        <button class="btn btn-ghost btn-block mt-s" type="button" data-act="pwd-later">${a("auth.pwdLater")}</button>
      </form>`})}}function sp(){let t="bm_visit";try{if(sessionStorage.getItem(t))return;sessionStorage.setItem(t,"1")}catch(e){return}v.post("/api/visits",{path:location.hash||"/"}).catch(()=>{})}function np(){let t=String(location.href).match(/[?&]coupon=([A-Za-z0-9_-]{2,32})/);if(!t)return;let e=t[1];try{history.replaceState(null,"",String(location.href).replace(/[?&]coupon=[A-Za-z0-9_-]{2,32}/,"").replace(/\?$/,""))}catch(s){}setTimeout(async()=>{try{await v.post("/api/cart/coupon",{code:e}),await Mt(),x(`${a("cart.couponApplied")}: ${e}`)}catch(s){}},700)}function op(){document.addEventListener("keydown",t=>{var n,o,c;let e=String(((n=t.target)==null?void 0:n.tagName)||"").toLowerCase(),s=["input","textarea","select"].includes(e)||((o=t.target)==null?void 0:o.isContentEditable);if(t.key==="/"&&!s&&!t.metaKey&&!t.ctrlKey&&!t.altKey){let l=I("#searchInput");l&&(t.preventDefault(),l.focus(),(c=l.select)==null||c.call(l))}if(t.key==="Escape"&&document.activeElement===I("#searchInput")){let l=I("#searchInput");l.value="",l.blur(),I("#suggestBox")&&(I("#suggestBox").hidden=!0)}})}function rp(){var e;if(!("serviceWorker"in navigator)||((e=sn().features)==null?void 0:e.offlineMode)===!1)return;let t=async()=>{try{let s=await navigator.serviceWorker.register("/sw.js",{updateViaCache:"none"});setInterval(()=>{s.update().catch(()=>{})},36e5),document.addEventListener("visibilitychange",()=>{document.hidden||s.update().catch(()=>{})});let n=!navigator.serviceWorker.controller;s.addEventListener("updatefound",()=>{let o=s.installing;o&&o.addEventListener("statechange",()=>{if(o.state==="installed"){if(n){n=!1;return}navigator.serviceWorker.controller&&lt(q()?"\u0628\u0631\u0627\u06CC \u0627\u0639\u0645\u0627\u0644 \u062A\u063A\u06CC\u06CC\u0631\u0627\u062A \u0631\u0648\u06CC \u062F\u06A9\u0645\u0647 \u0632\u06CC\u0631 \u06A9\u0644\u06CC\u06A9 \u06A9\u0646\u06CC\u062F.":"Click update to apply changes.",{type:"info",title:q()?"\u0646\u0633\u062E\u0647\u0654 \u062C\u062F\u06CC\u062F \u0622\u0645\u0627\u062F\u0647 \u0627\u0633\u062A":"Update Available",timeout:15e3,action:{label:q()?"\u0628\u0631\u0648\u0632\u0631\u0633\u0627\u0646\u06CC":"Update",onClick:()=>{var c;(c=document.getElementById("btnRefresh"))==null||c.click()}}})}})})}catch(s){}};document.readyState==="complete"?t():window.addEventListener("load",t,{once:!0})}function ip(){fetch("/api/system/status",{cache:"no-store"}).then(t=>t.ok?t.json():null).then(t=>{t!=null&&t.build&&t.build!==an&&!sessionStorage.getItem("bm-upd-seen")&&(sessionStorage.setItem("bm-upd-seen","1"),lt(a("update.available"),{timeout:0,action:{label:a("update.reload"),onClick:()=>location.reload()}}))}).catch(()=>{})}function cp(){if(!matchMedia("(pointer:fine)").matches)return;let t=I("#cursorHalo");if(!t)return;let e=innerWidth/2,s=innerHeight/2,n=e,o=s,c=0,l=()=>{n+=(e-n)*.22,o+=(s-o)*.22,t.style.left=`${n.toFixed(1)}px`,t.style.top=`${o.toFixed(1)}px`,c=requestAnimationFrame(l)};document.addEventListener("pointermove",m=>{var u,b;if(document.documentElement.classList.contains("eco"))return;e=m.clientX,s=m.clientY,document.documentElement.classList.add("halo-on"),c||(c=requestAnimationFrame(l));let d=(b=(u=m.target).closest)==null?void 0:b.call(u,'a, button, [role="button"], .pcard, .gal-thumb');document.documentElement.classList.toggle("halo-hot",!!d)},{passive:!0}),document.addEventListener("pointerleave",()=>{document.documentElement.classList.remove("halo-on")})}function dp(){return document.documentElement.classList.contains("eco")}function mp(){let t=()=>{document.documentElement.classList.contains("eco")||(document.documentElement.classList.add("eco"),document.dispatchEvent(new CustomEvent("eco",{detail:{on:!0}})))},e=()=>{document.documentElement.classList.contains("eco")&&(document.documentElement.classList.remove("eco"),document.dispatchEvent(new CustomEvent("eco",{detail:{on:!1}})),Promise.resolve().then(()=>(K(),qa)).then(n=>{var o;return(o=n.refreshBootstrap)==null?void 0:o.call(n,{silent:!0})}).catch(()=>{}))},s=()=>{clearTimeout(qi),qi=setTimeout(t,lp)};for(let n of["pointerdown","keydown","wheel","touchstart","pointermove"])document.addEventListener(n,()=>{document.documentElement.classList.contains("eco")&&e(),s()},{passive:!0,capture:!0});s()}function pp(){try{if(sessionStorage.getItem("bm_vis"))return;sessionStorage.setItem("bm_vis","1");let t={screen:`${screen.width}x${screen.height}`,tz:Intl.DateTimeFormat().resolvedOptions().timeZone||"",lang:navigator.language||"",ref:document.referrer?document.referrer.slice(0,200):"",path:location.hash.replace("#","")||"/"};Promise.resolve().then(()=>(tt(),qo)).then(e=>e.api.post("/api/track",t)).catch(()=>{})}catch(t){}}var Om,ho,bo,Ke,lp,qi,uo=V(()=>{K();G();tt();U();J();bt();at();On();Ei();K();mt();setTimeout(Ti,1e4);Om=performance.now();y("logout",async()=>{if(await kt({text:a("common.logout")+"\u061F",okText:a("common.logout")}))try{await v.post("/api/auth/logout"),p.me=null,await Mt(),Qe(),x(a("auth.logoutDone")),ht("#/"),T()}catch(e){Y(a("err.generic"))}});ho=!1;bo=!1;y("consent-form",()=>{});y("consent-manage",()=>Ci());y("reload",()=>location.reload());Ke=null;y("pwd-later",()=>{try{sessionStorage.setItem("bm_pwd_later","1")}catch(t){}Ke==null||Ke.close(),lt(a("auth.pwdLaterToast"))});y("force-pass",async(t,e)=>{let s=new FormData(e);if(s.get("next")!==s.get("confirm")){Y(wt()==="fa"?"\u062A\u06A9\u0631\u0627\u0631 \u0631\u0645\u0632 \u06CC\u06A9\u0633\u0627\u0646 \u0646\u06CC\u0633\u062A.":"Passwords do not match.");return}try{await v.post("/api/me/password",{current:s.get("current"),next:s.get("next")}),await ee(),_s(),x(a("acc.passwordChanged")),Ke==null||Ke.close()}catch(n){Y(n.message)}});Ft("boot-slow",()=>document.body.classList.add("boot-slow"));Ft("boot-failed",()=>{let t=document.getElementById("welcomeScreen");t&&t.parentNode&&t.parentNode.removeChild(t);let e=I("#bootSplash");e&&(e.innerHTML=r`<div class="empty">
    <h4>${a("boot.failed")}</h4>
    <p class="muted small mt-s">${a("boot.failedHint")}</p>
    <button class="btn btn-primary mt" data-act="reload">${i("refresh")} ${a("common.retry")}</button>
  </div>`)});Fm().catch(t=>{console.error("[boot]",t);let e=document.getElementById("welcomeScreen");e&&e.parentNode&&e.parentNode.removeChild(e);let s=I("#bootSplash");s&&(s.innerHTML=r`<div class="empty"><h4>${a("err.generic")}</h4><button class="btn btn-primary" data-act="reload">${a("common.retry")}</button></div>`)});setTimeout(ip,6e3);lp=240*1e3,qi=0});uo();export{dp as ecoPaused,Ai as maybeConsent,va as updateBadges};
