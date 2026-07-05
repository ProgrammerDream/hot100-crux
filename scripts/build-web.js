/*
 * 把应用外壳同步到 www/（Capacitor 的 webDir），供打包进 APK。
 * cards.js 更新后重跑本脚本 + npx cap sync 即可把新卡库打进 APK。
 */
var fs = require("fs");
var path = require("path");

var files = ["index.html", "cards.js", "sw.js", "manifest.webmanifest", "icon.svg"];
fs.mkdirSync("www", { recursive: true });
files.forEach(function (f) {
  fs.copyFileSync(f, path.join("www", f));
});
console.log("已同步 " + files.length + " 个文件到 www/");
