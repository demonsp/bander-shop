import { JSDOM } from 'jsdom';
import fs from 'fs';
import path from 'path';

const dom = new JSDOM(
  `<!DOCTYPE html>
   <html lang="fa" dir="rtl" data-mode="dark" data-port="on">
   <body>
     <div id="welcomeScreen"></div>
     <div id="bootSplash"></div>
     <header id="topbar"></header>
     <div id="ticker"></div>
     <a id="tb-phone"></a>
     <a id="brandLink"></a>
     <nav id="navInner"></nav>
     <div id="btnAuth"></div>
     <ul id="fContact"></ul>
     <div id="fMinimap"></div>
     <script type="module">
       window.onerror = (e) => console.log("WINDOW ERR:", e);
     </script>
     <script type="module" src="file:///home/user/yassaei/public/js/main.mjs"></script>
   </body>
   </html>`,
  {
    url: "http://localhost:3000/",
    runScripts: "dangerously",
    resources: "usable"
  }
);
setTimeout(() => {
  console.log("WelcomeScreen present?", !!dom.window.document.getElementById('welcomeScreen'));
  process.exit(0);
}, 3000);
