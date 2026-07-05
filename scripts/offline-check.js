// 离线验证：首访装好 SW 后切断网络，确认仍能打开并渲染卡片
const { chromium } = require("playwright");
const BASE = "http://127.0.0.1:" + (process.env.PORT || 5510);
(async () => {
  const browser = await chromium.launch({ channel: "msedge", headless: true });
  const ctx = await browser.newContext();
  const page = await ctx.newPage();
  await page.goto(BASE + "/index.html");
  await page.waitForSelector(".crux");
  // 等 SW 接管并缓存外壳
  await page.evaluate(async () => { await navigator.serviceWorker.ready; });
  await page.waitForFunction(() => navigator.serviceWorker.controller !== null, { timeout: 8000 });
  // 断网
  await ctx.setOffline(true);
  await page.reload();
  let ok = false;
  try { await page.waitForSelector(".crux", { timeout: 8000 }); ok = true; } catch (e) {}
  const cardsLoaded = await page.evaluate(() => Array.isArray(window.CRUX_CARDS) && window.CRUX_CARDS.length);
  console.log(ok ? "✓ 断网后 index.html 仍能打开并渲染卡片" : "✗ 断网后打不开");
  console.log((cardsLoaded ? "✓" : "✗") + " 断网后 cards.js 也来自缓存，卡数=" + cardsLoaded);
  await browser.close();
  process.exit(ok && cardsLoaded ? 0 : 1);
})().catch(e => { console.error("离线脚本出错:", e.message); process.exit(2); });
