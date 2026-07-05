/*
 * 本地静态服务器（零依赖，仅 Node 内置模块），用于开发自测与首次「添加到主屏」。
 * Service Worker 需要 http(s) 源，file:// 打不开离线能力，所以本地也走这个小服务器。
 * 只监听 127.0.0.1，不暴露到局域网。
 */
var http = require("http");
var fs = require("fs");
var path = require("path");

var ROOT = __dirname;
var PORT = process.env.PORT ? Number(process.env.PORT) : 5510;

var MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".webmanifest": "application/manifest+json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".css": "text/css; charset=utf-8"
};

var server = http.createServer(function (req, res) {
  var urlPath = decodeURIComponent(req.url.split("?")[0]);
  if (urlPath === "/") {
    urlPath = "/index.html";
  }
  // 防目录穿越
  var filePath = path.join(ROOT, path.normalize(urlPath));
  if (filePath.indexOf(ROOT) !== 0) {
    res.writeHead(403);
    res.end("forbidden");
    return;
  }
  fs.readFile(filePath, function (err, data) {
    if (err) {
      res.writeHead(404);
      res.end("not found");
      return;
    }
    var ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, { "Content-Type": MIME[ext] || "application/octet-stream" });
    res.end(data);
  });
});

server.listen(PORT, "127.0.0.1", function () {
  console.log("[crux] serving " + ROOT);
  console.log("[crux] open http://127.0.0.1:" + PORT);
});
