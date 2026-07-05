const { chromium } = require("playwright");
const BASE = "http://127.0.0.1:" + (process.env.PORT || 5510);
(async () => {
  const browser = await chromium.launch({ channel: "msedge", headless: true });
  // 手机视口
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, colorScheme: "dark" });
  const page = await ctx.newPage();
  await page.goto(BASE + "/index.html");
  await page.evaluate(() => localStorage.clear());
  await page.reload();
  await page.waitForSelector(".crux");
  await page.screenshot({ path: "scripts/shot-answering.png" });
  // 选一个答案并确认，进入揭示态
  const card = await page.evaluate(() => {
    const crux = document.querySelector(".crux").textContent;
    return window.CRUX_CARDS.filter(c => c.crux === crux)[0];
  });
  const opts = await page.$$(".opt");
  for (const o of opts) { if ((await o.textContent()).trim() === card.answer) { await o.click(); break; } }
  await page.click(".actions .btn:not(.ghost)");
  await page.waitForSelector(".reveal.show");
  await page.screenshot({ path: "scripts/shot-revealed.png" });
  await browser.close();
  console.log("screenshots saved");
})();
