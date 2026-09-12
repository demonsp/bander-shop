import { JSDOM, VirtualConsole } from 'jsdom';
import fs from 'fs';
import path from 'path';

const virtualConsole = new VirtualConsole();
virtualConsole.on("error", () => { /* Suppress CSS errors */ });
virtualConsole.on("log", (...args) => console.log('LOG:', ...args));
virtualConsole.on("info", (...args) => console.log('INFO:', ...args));
virtualConsole.on("warn", (...args) => console.log('WARN:', ...args));
virtualConsole.on("jsdomError", (err) => console.error('JSDOM ERROR:', err.message, err.detail));

const dom = new JSDOM(
  `<!DOCTYPE html>
   <html lang="fa" dir="rtl" data-mode="dark" data-port="on">
   <head>
     <title>Test</title>
   </head>
   <body>
     <div id="welcomeScreen"></div>
     <div id="bootSplash"></div>
     <script type="module">
       window.onerror = function(msg, url, lineNo, columnNo, error) {
         console.log('WINDOW ERROR:', msg, url, lineNo, columnNo, error ? error.stack : '');
         return false;
       };
       window.addEventListener('unhandledrejection', function(event) {
         console.log('UNHANDLED REJECTION:', event.reason ? event.reason.stack : event.reason);
       });
     </script>
     <script type="module" src="file:///home/user/yassaei/public/js/main.mjs"></script>
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
  console.log("WelcomeScreen present?", !!dom.window.document.getElementById('welcomeScreen'));
  process.exit(0);
}, 3000);
