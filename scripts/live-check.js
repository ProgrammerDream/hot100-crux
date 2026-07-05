// 线上 v3 真机验证：完整代码 + 题面折叠 + 挖空交互
const { chromium } = require("playwright");
const URL = "https://programmerdream.github.io/hot100-crux/";
(async () => {
  const b = await chromium.launch({ channel: "msedge", headless: true });
  const ctx = await b.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, colorScheme: "dark" });
  const p = await ctx.newPage();
  let ok = true;
  p.on("pageerror", e => { console.log("✗ 页面报错:", e.message); ok = false; });
  await p.goto(URL + "?t=" + Date.now(), { waitUntil: "networkidle" });
  await p.evaluate(() => localStorage.clear());
  await p.reload({ waitUntil: "networkidle" });
  await p.waitForSelector(".crux", { timeout: 15000 });

  const codeLen = await p.$eval("pre.code", e => e.textContent.length);
  console.log((codeLen > 150 ? "✓" : "✗") + " 显示完整题解代码，长度 " + codeLen + " 字符");
  console.log((await p.$(".slot") ? "✓" : "✗") + " 完整代码里有一个挖空槽");

  // 展开题面
  await p.click("details.desc > summary");
  const descLen = await p.$eval(".desc-body", e => e.textContent.trim().length);
  console.log((descLen > 30 ? "✓" : "✗") + " 题面可展开，长度 " + descLen + " 字符");

  // 交互：选正确项 -> 确认 -> 揭示
  const card = await p.evaluate(() => { const cr = document.querySelector(".crux").textContent; return window.CRUX_CARDS.find(c => c.crux === cr); });
  for (const o of await p.$$(".opt")) { if ((await o.textContent()).trim() === card.answer) { await o.click(); break; } }
  await p.click(".actions .btn:not(.ghost)");
  await p.waitForSelector(".reveal.show", { timeout: 5000 });
  console.log("✓ 选择->确认->揭示解释链路正常");
  await p.screenshot({ path: "scripts/shot-live.png", fullPage: true });
  await b.close();
  process.exit(ok ? 0 : 1);
})().catch(e => { console.log("✗ 出错:", e.message); process.exit(2); });
