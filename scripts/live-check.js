// 对线上部署地址做真实浏览器冒烟：渲染 -> 选一张 -> 揭示 -> SW 注册
const { chromium } = require("playwright");
const URL = "https://programmerdream.github.io/hot100-crux/";
(async () => {
  const b = await chromium.launch({ channel: "msedge", headless: true });
  const p = await b.newPage();
  let ok = true;
  p.on("pageerror", e => { console.log("✗ 页面报错:", e.message); ok = false; });
  await p.goto(URL, { waitUntil: "networkidle" });
  await p.waitForSelector(".crux", { timeout: 15000 });
  console.log("✓ 线上首页渲染出卡片，crux:", (await p.$eval(".crux", e => e.textContent)).slice(0, 30));
  const card = await p.evaluate(() => { const cr = document.querySelector(".crux").textContent; return window.CRUX_CARDS.find(c => c.crux === cr); });
  const opts = await p.$$(".opt");
  for (const o of opts) { if ((await o.textContent()).trim() === card.answer) { await o.click(); break; } }
  await p.click(".actions .btn:not(.ghost)");
  await p.waitForSelector(".reveal.show", { timeout: 5000 });
  console.log("✓ 选择->确认->揭示解释链路正常");
  await p.screenshot({ path: "scripts/shot-live.png" });
  const sw = await p.evaluate(async () => !!(await navigator.serviceWorker.getRegistration()));
  console.log((sw ? "✓" : "✗") + " Service Worker 已注册(离线基础)");
  await b.close();
  process.exit(ok && sw ? 0 : 1);
})().catch(e => { console.log("✗ 出错:", e.message); process.exit(2); });
