import { JSDOM } from 'jsdom';

const dom = new JSDOM(`<!DOCTYPE html><html><body><div id="welcomeScreen"></div><script type="module" src="http://localhost:3000/js/main.mjs"></script></body></html>`, {
  url: "http://localhost:3000/",
  runScripts: "dangerously",
  resources: "usable"
});

dom.window.console.log = (...args) => console.log('LOG:', ...args);
dom.window.console.error = (...args) => console.error('ERROR:', ...args);
dom.window.console.warn = (...args) => console.warn('WARN:', ...args);

setTimeout(() => {
  console.log("Done waiting");
  process.exit(0);
}, 3000);
