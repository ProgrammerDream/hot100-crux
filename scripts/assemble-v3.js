/*
 * v3 组装：把已验证的扁平临界点(scripts/cards-flat.js)重排为「按题分组」结构，
 * 每张卡显示【完整题解代码】(只挖当前这一个临界点) + 【题面】。
 * 一个临界点 = 一张卡；同一题的多张卡共享同一份完整代码与题面(像背单词：一个词，逐个字母轮流挖空)。
 *
 * 数据源：scripts/cards-flat.js(临界点+答案+解释) + ../hot100project/problems.js(完整代码+题面)。
 * 挖空点用字符偏移 blankOffset/blankLen 定位到完整代码，避免重复存整段代码。
 */
var fs = require("fs");
global.window = {};
require("./cards-flat.js");
var CARDS = window.CRUX_CARDS;

var win2 = {};
(function () { global.window = win2; require("../../hot100project/problems.js"); })();
var PROBS = win2.HOT100_PROBLEMS || [];
var meta = {};
PROBS.forEach(function (p) { meta[p.id] = p; });

// 去掉题面里离线打不开的外链图片与脚本
function cleanDesc(html) {
  return String(html || "")
    .replace(/<img\b[^>]*>/gi, "")
    .replace(/<script[\s\S]*?<\/script>/gi, "");
}

// 把挖空点锚定到完整代码，返回 {offset,len} 或 null（与 anchor-measure.js 同款两级匹配）
function anchor(fullCode, excerpt, answer) {
  var bi = excerpt.indexOf("{{B}}");
  if (bi < 0) { return null; }
  var original = excerpt.slice(0, bi) + answer + excerpt.slice(bi + 5);
  var p = fullCode.indexOf(original);
  if (p >= 0 && fullCode.indexOf(original, p + 1) < 0) {
    return { offset: p + bi, len: answer.length };
  }
  var origLines = original.split("\n");
  var acc = 0, li = -1, colInLine = 0;
  for (var i = 0; i < origLines.length; i++) {
    var lineLen = origLines[i].length + 1;
    if (bi < acc + lineLen) { li = i; colInLine = bi - acc; break; }
    acc += lineLen;
  }
  if (li < 0) { return null; }
  var targetTrim = origLines[li].trim();
  var fullLines = fullCode.split("\n");
  var matches = [];
  for (var j = 0; j < fullLines.length; j++) {
    if (fullLines[j].trim() === targetTrim) { matches.push(j); }
  }
  if (matches.length !== 1) { return null; }
  var j0 = matches[0];
  var leadOrig = origLines[li].length - origLines[li].replace(/^\s+/, "").length;
  var leadFull = fullLines[j0].length - fullLines[j0].replace(/^\s+/, "").length;
  var colInFull = colInLine - leadOrig + leadFull;
  if (fullLines[j0].substr(colInFull, answer.length) !== answer) {
    var fi = fullLines[j0].indexOf(answer);
    if (fi < 0) { return null; }
    colInFull = fi;
  }
  var g = 0;
  for (var k = 0; k < j0; k++) { g += fullLines[k].length + 1; }
  return { offset: g + colInFull, len: answer.length };
}

// 按题分组
var byProb = {};
var order = [];
var dropped = [];
CARDS.forEach(function (c) {
  var m = meta[c.problemId];
  if (!m) { dropped.push(c.id + "(无题目)"); return; }
  var full = m.solutionCode;
  var r = anchor(full, String(c.code), String(c.answer));
  if (!r || full.substr(r.offset, r.len) !== c.answer) { dropped.push(c.id + "(锚定失败)"); return; }
  if (!byProb[c.problemId]) {
    byProb[c.problemId] = {
      id: m.id, title: m.title, category: m.category, difficulty: m.difficulty,
      descHtml: cleanDesc(m.descHtml), code: full, cards: []
    };
    order.push(c.problemId);
  }
  byProb[c.problemId].cards.push({
    id: c.id, crux: c.crux, answer: c.answer,
    blankOffset: r.offset, blankLen: r.len,
    options: c.options, why: c.why, wrongWhy: c.wrongWhy
  });
});

order.sort(function (a, b) { return a - b; });
var out = order.map(function (id) { return byProb[id]; });
var totalCards = out.reduce(function (n, p) { return n + p.cards.length; }, 0);

var header = "/*\n * 卡库 v3（构建产物）：按题分组，每张卡=完整题解代码里挖掉一个临界点 + 题面。\n" +
  " * 临界点/答案/解释来自 scripts/cards-flat.js（对抗式校验过），完整代码/题面来自 hot100 官方题解。\n" +
  " * 勿手改；重建：node scripts/assemble-v3.js。共 " + out.length + " 题 / " + totalCards + " 张卡。\n */\n";
fs.writeFileSync("cards.js",
  header + "window.CRUX_VERSION = \"3\";\nwindow.CRUX_PROBLEMS = " + JSON.stringify(out, null, 1) + ";\n");

var sz = fs.statSync("cards.js").size;
console.log("入库 " + out.length + " 题 / " + totalCards + " 张卡，丢弃 " + dropped.length + " 张");
console.log("cards.js 体积 " + (sz / 1024).toFixed(0) + " KB");
console.log("每题卡数分布(前12题):");
out.slice(0, 12).forEach(function (p) { console.log("  " + p.title + " -> " + p.cards.length + " 张"); });
if (dropped.length) { console.log("丢弃: " + dropped.join(", ")); }
