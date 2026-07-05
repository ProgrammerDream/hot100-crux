/*
 * 端到端自测：用系统 Edge 驱动真实页面，走完「挖空 -> 选择 -> 揭示 -> 间隔重复调度」全链路。
 * 不下载 Playwright 自带浏览器，直接 channel: 'msedge'。
 * 前置：另开 `node server.js`（默认 5510）。
 */
const { chromium } = require("playwright");

const BASE = "http://127.0.0.1:" + (process.env.PORT || 5510);
const PROGRESS_KEY = "crux.progress.v1";

let passed = 0;
let failed = 0;
function ok(name) { passed++; console.log("  ✓ " + name); }
function bad(name, extra) { failed++; console.log("  ✗ " + name + (extra ? "  -> " + extra : "")); }
function assert(cond, name, extra) { cond ? ok(name) : bad(name, extra); }

function todayIdx() { return Math.floor(Date.now() / 86400000); }

async function currentCard(page) {
  // 读页面上显示的 crux，映射回卡数据，拿到 answer / options
  return await page.evaluate(function () {
    var crux = document.querySelector(".crux").textContent;
    var card = window.CRUX_CARDS.filter(function (c) { return c.crux === crux; })[0];
    return { id: card.id, answer: card.answer, options: card.options, crux: crux };
  });
}

async function clickOption(page, text) {
  const opts = await page.$$(".opt");
  for (const o of opts) {
    const t = (await o.textContent()).trim();
    if (t === text) { await o.click(); return true; }
  }
  return false;
}

async function readProgress(page, id) {
  return await page.evaluate(function (args) {
    var p = JSON.parse(localStorage.getItem(args.key) || "{}");
    return p[args.id] || null;
  }, { key: PROGRESS_KEY, id });
}

(async () => {
  const browser = await chromium.launch({ channel: "msedge", headless: true });
  const page = await browser.newPage();
  page.on("pageerror", (e) => bad("页面 JS 运行期报错", e.message));

  // 干净状态
  await page.goto(BASE + "/index.html");
  await page.evaluate(() => localStorage.clear());
  await page.reload();
  await page.waitForSelector(".crux");

  console.log("[1] 挖空卡渲染");
  assert(await page.$(".slot"), "存在填空槽 .slot");
  assert((await page.$eval(".slot", (e) => e.textContent)).indexOf("▢") >= 0, "填空槽初始显示 ▢");
  assert((await page.$$(".opt")).length >= 2, "至少 2 个候选项");
  assert(await page.$(".btn[disabled]"), "未选择时「确认」禁用");

  console.log("[2] 选错 -> 揭示错误原因 + 打回盒1 + 重排");
  let c1 = await currentCard(page);
  const wrong = c1.options.filter((o) => o !== c1.answer)[0];
  await clickOption(page, wrong);
  assert((await page.$eval(".slot", (e) => e.textContent)).indexOf(wrong) >= 0, "选中后填空槽显示所选项");
  await page.click(".actions .btn:not(.ghost)"); // 确认
  await page.waitForSelector(".reveal.show");
  assert(await page.$(".banner.bad"), "显示「选错了」红色横幅");
  assert(await page.$(".slot.ok"), "揭示后填空槽变绿显示正确答案");
  assert(await page.$(".slot .miss"), "划掉显示用户选错的那个");
  assert(await page.$(".why"), "显示「为什么对」解释");
  assert(await page.$(".why.wrong"), "显示「你选的为什么错」解释");
  let p1 = await readProgress(page, c1.id);
  assert(p1 && p1.box === 1, "选错 -> box 回到 1", p1 && ("box=" + p1.box));
  assert(p1 && p1.due === todayIdx(), "选错 -> 当天再考(due=今天)", p1 && ("due=" + p1.due + " today=" + todayIdx()));
  assert(p1 && p1.seen === 1 && p1.wrong === 1, "计数 seen=1 wrong=1", p1 && JSON.stringify(p1));

  console.log("[3] 下一题 · 选对 -> 升盒 + 间隔变长");
  await page.click(".actions .btn:not(.ghost)"); // 下一题
  await page.waitForSelector(".crux");
  let c2 = await currentCard(page);
  await clickOption(page, c2.answer);
  await page.click(".actions .btn:not(.ghost)"); // 确认
  await page.waitForSelector(".reveal.show");
  assert(await page.$(".banner.ok"), "显示「正确」绿色横幅");
  assert(!(await page.$(".slot .miss")), "选对时没有划掉项");
  let p2 = await readProgress(page, c2.id);
  assert(p2 && p2.box === 2, "选对 -> box 升到 2", p2 && ("box=" + p2.box));
  assert(p2 && p2.due === todayIdx() + 1, "选对 -> 间隔=1天(due=明天)", p2 && ("due=" + p2.due));
  assert(p2 && p2.correct === 1, "计数 correct=1", p2 && JSON.stringify(p2));

  console.log("[4] 「我刚是蒙的」-> 撤销奖励，打回盒1");
  await page.click(".actions .btn.ghost"); // 第一个 ghost 是「我刚是蒙的」
  let p2b = await readProgress(page, c2.id);
  assert(p2b && p2b.box === 1, "标记蒙对 -> box 回到 1", p2b && ("box=" + p2b.box));
  assert(p2b && p2b.due === todayIdx(), "标记蒙对 -> 当天再考", p2b && ("due=" + p2b.due));
  assert(p2b && p2b.correct === 0, "撤销了 correct 计数", p2b && JSON.stringify(p2b));

  console.log("[5] Service Worker 注册(离线基础)");
  const swReg = await page.evaluate(async () => {
    if (!("serviceWorker" in navigator)) { return false; }
    const r = await navigator.serviceWorker.getRegistration();
    return !!r;
  });
  assert(swReg, "Service Worker 已注册");

  console.log("[6] 统计数字随进度更新");
  const total = await page.$eval("#stTotal", (e) => e.textContent);
  const cardCount = await page.evaluate(() => window.CRUX_CARDS.length);
  assert(Number(total) === cardCount && cardCount > 0, "总卡数与卡库一致", "total=" + total + " 卡库=" + cardCount);

  await browser.close();
  console.log("\n结果：通过 " + passed + " / 失败 " + failed);
  process.exit(failed === 0 ? 0 : 1);
})().catch((e) => {
  console.error("验证脚本自身出错：", e.message);
  process.exit(2);
});
