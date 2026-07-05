/*
 * 组装脚本：把生成管线的产物（工作流 result.cards）反转义 + 校验后落盘为 cards.js。
 * 为什么要反转义：子 agent 把代码里的 < > & 输出成了 HTML 实体（&lt; &gt; &amp;），
 * 前端用 textContent 渲染不会解码，会原样显示 &lt;，所以这里统一还原成真字符。
 *
 * 用法：node scripts/assemble-cards.js <工作流输出文件.json>
 */
var fs = require("fs");

var srcFile = process.argv[2];
if (!srcFile) {
  console.error("用法: node scripts/assemble-cards.js <workflow-output.json>");
  process.exit(1);
}

// 递归定位 {stat, cards}
function findResult(x) {
  if (!x || typeof x !== "object") { return null; }
  if (Array.isArray(x.cards) && x.stat) { return x; }
  for (var k in x) {
    var r = findResult(x[k]);
    if (r) { return r; }
  }
  return null;
}

// HTML 实体还原；&amp; 必须最后处理，避免二次解码
function decode(s) {
  return String(s)
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&amp;/g, "&");
}
function deep(x) {
  if (typeof x === "string") { return decode(x); }
  if (Array.isArray(x)) { return x.map(deep); }
  if (x && typeof x === "object") {
    var o = {};
    for (var k in x) { o[decode(k)] = deep(x[k]); }
    return o;
  }
  return x;
}

var raw = findResult(JSON.parse(fs.readFileSync(srcFile, "utf8")));
if (!raw) {
  console.error("没在输出文件里找到 result.cards");
  process.exit(1);
}

var cards = raw.cards.map(deep);

// 抢救：部分卡没打 {{B}}、把答案直接写进了代码。若答案在代码里恰好出现一次，
// 且替换成 {{B}} 后其它「含字母的」选项不出现在代码里（否则泄题），就原地补挖空。
// 纯数字/单字符选项(如 0/1/i)不做泄题判定，避免 "int x = 0" 里的 0 造成误杀。
function trySalvage(c) {
  var code = String(c.code);
  if (code.indexOf("{{B}}") >= 0) { return null; }
  var ans = String(c.answer);
  if (!ans || code.indexOf(ans) < 0) { return "答案不在代码里"; }
  if (code.indexOf(ans) !== code.lastIndexOf(ans)) { return "答案在代码里出现多次"; }
  var newCode = code.replace(ans, "{{B}}");
  var leak = (c.options || []).some(function (o) {
    return o !== ans && /[a-zA-Z]/.test(o) && o.length >= 2 && newCode.indexOf(o) >= 0;
  });
  if (leak) { return "替换后会泄题"; }
  c.code = newCode;
  return null;
}

// 校验
var good = [];
var warnings = [];
var dropped = [];
var salvaged = 0;
var seenId = {};
cards.forEach(function (c, i) {
  var tag = c.id || ("#" + i);
  // 先剔除空白选项(生成时偶尔混入空字符串占位)，并同步清理 wrongWhy 里的空键
  c.options = (c.options || []).filter(function (o) { return String(o).trim() !== ""; });
  if (c.wrongWhy && c.wrongWhy[""] !== undefined) { delete c.wrongWhy[""]; }
  // 硬性问题 -> 丢弃
  var blanks = (String(c.code).match(/\{\{B\}\}/g) || []).length;
  if (blanks === 0) {
    var reason = trySalvage(c);
    if (reason) { dropped.push(tag + " 无挖空且不可救(" + reason + ")"); return; }
    salvaged += 1;
    blanks = 1;
  }
  if (blanks !== 1) { dropped.push(tag + " 挖空数=" + blanks); return; }
  if (!c.options || c.options.indexOf(c.answer) < 0) { dropped.push(tag + " answer 不在 options"); return; }
  if (c.options.length < 2 || c.options.length > 4) { dropped.push(tag + " 选项数=" + c.options.length); return; }
  if (!c.why || !c.crux || !c.answer) { dropped.push(tag + " 缺 why/crux/answer"); return; }
  if (seenId[c.id]) { dropped.push(tag + " 重复 id"); return; }
  seenId[c.id] = true;
  // 软性问题 -> 保留但记录
  c.options.forEach(function (o) {
    if (o !== c.answer && (!c.wrongWhy || !c.wrongWhy[o])) {
      warnings.push(tag + " 干扰项「" + o + "」缺 wrongWhy");
    }
  });
  var uniq = {};
  c.options.forEach(function (o) { uniq[o] = 1; });
  if (Object.keys(uniq).length !== c.options.length) { warnings.push(tag + " 选项有重复"); }
  good.push(c);
});

// 落盘
var header = "/*\n" +
  " * 卡库（构建产物）：由生成管线锚定 ../hot100project 官方题解生成，经对抗式校验 + 本脚本反转义/结构校验。\n" +
  " * 勿手改；重建见 scripts/。共 " + good.length + " 张卡，覆盖 Hot100。\n" +
  " */\n";
var body = "window.CRUX_CARDS_VERSION = \"2\";\n" +
  "window.CRUX_CARDS = " + JSON.stringify(good, null, 1) + ";\n";
fs.writeFileSync("cards.js", header + body);

// 报告
var byCat = {};
good.forEach(function (c) { byCat[c.category] = (byCat[c.category] || 0) + 1; });
var byProb = {};
good.forEach(function (c) { byProb[c.problemId] = (byProb[c.problemId] || 0) + 1; });
console.log("入库 " + good.length + " 张(其中抢救回 " + salvaged + " 张)，丢弃 " + dropped.length + " 张，软警告 " + warnings.length + " 条");
console.log("覆盖题目 " + Object.keys(byProb).length + " 道");
console.log("\n分类分布:");
Object.keys(byCat).sort().forEach(function (k) { console.log("  " + k + ": " + byCat[k]); });
if (dropped.length) {
  console.log("\n丢弃明细:");
  dropped.forEach(function (d) { console.log("  - " + d); });
}
if (warnings.length) {
  console.log("\n软警告(前20条):");
  warnings.slice(0, 20).forEach(function (w) { console.log("  - " + w); });
}
