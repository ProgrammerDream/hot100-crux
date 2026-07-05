/*
 * 可行性测量：把现有 370 张卡的挖空点，重新锚定到该题【完整 solutionCode】里的精确字符偏移。
 * 成功率高 -> 复用已验证内容，只改呈现（完整代码+题面）；成功率低 -> 重新生成。
 */
var fs = require("fs");
global.window = {};
require("../cards.js"); // 现有 v2，code 已反转义
var CARDS = window.CRUX_CARDS;
var probs = JSON.parse(fs.readFileSync("scripts/problems-slim.json", "utf8"));
var codeOf = {};
probs.forEach(function (p) { codeOf[p.id] = p.solutionCode; });

// 把某张卡的挖空点锚定到 fullCode，返回 {offset,len} 或 null
function anchor(fullCode, excerpt, answer) {
  var bi = excerpt.indexOf("{{B}}");
  if (bi < 0) { return null; }
  var original = excerpt.slice(0, bi) + answer + excerpt.slice(bi + 5);

  // tier1：整段节选在完整代码里唯一出现
  var p = fullCode.indexOf(original);
  if (p >= 0 && fullCode.indexOf(original, p + 1) < 0) {
    return { offset: p + bi, len: answer.length, tier: 1 };
  }

  // tier2：按“挖空所在行”去掉缩进后与完整代码某行唯一匹配
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
  return { offset: g + colInFull, len: answer.length, tier: 2 };
}

var ok = 0, fail = 0, t1 = 0, t2 = 0, failIds = [];
CARDS.forEach(function (c) {
  var full = codeOf[c.problemId];
  if (!full) { fail++; failIds.push(c.id + "(无题解)"); return; }
  var r = anchor(full, String(c.code), String(c.answer));
  if (r && full.substr(r.offset, r.len) === c.answer) {
    ok++;
    if (r.tier === 1) { t1++; } else { t2++; }
    return;
  }
  fail++;
  failIds.push(c.id);
});
console.log("总卡 " + CARDS.length + " | 锚定成功 " + ok + " (tier1=" + t1 + ", tier2=" + t2 + ") | 失败 " + fail);
console.log("成功率 " + (ok / CARDS.length * 100).toFixed(1) + "%");
if (failIds.length) {
  console.log("\n失败样例(前25):");
  failIds.slice(0, 25).forEach(function (x) { console.log("  - " + x); });
}
