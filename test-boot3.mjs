import { JSDOM, VirtualConsole } from 'jsdom';
import fs from 'fs';
import path from 'path';

const virtualConsole = new VirtualConsole();
virtualConsole.on("error", () => {});
virtualConsole.on("log", (...args) => console.log('LOG:', ...args));

const dom = new JSDOM(
  `<!DOCTYPE html>
   <html lang="fa" dir="rtl" data-mode="dark" data-port="on">
   <body>
     <div id="welcomeScreen"></div>
     <script>console.log("INLINE SCRIPT OK");</script>
     <script type="module">
       import { boot } from "file:///home/user/yassaei/public/js/state.mjs";
       console.log("import OK");
       boot().then(() => console.log("boot done")).catch(e => console.log("boot error", e));
     </script>
   </body>
   </html>`,
  {
    url: "http://localhost:3000/",
    runScripts: "dangerously",
    resources: "usable",
    virtualConsole
  }
);
setTimeout(() => {
  process.exit(0);
}, 3000);
