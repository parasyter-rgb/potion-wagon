// เซิร์ฟเวอร์เกมเกวียนปรุงยา: ตอนนี้ทำหน้าที่ส่งไฟล์เกมให้ผู้เล่น
// (ขั้นต่อไปจะเพิ่มระบบบัญชี เงิน และตลาดกลางที่กันโกงไว้ในไฟล์นี้)
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;          // Render จะกำหนด PORT ให้เอง
const PUBLIC = path.join(__dirname, 'public');
const TYPES = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.png': 'image/png', '.svg': 'image/svg+xml', '.json': 'application/json' };

http.createServer((req, res) => {
  const url = decodeURIComponent(req.url.split('?')[0]);
  if (url === '/health') { res.writeHead(200); return res.end('ok'); }
  let file = path.normalize(path.join(PUBLIC, url === '/' ? 'index.html' : url));
  if (!file.startsWith(PUBLIC)) { res.writeHead(403); return res.end(); }   // กันการขอไฟล์นอกโฟลเดอร์ public
  fs.readFile(file, (err, data) => {
    if (err) { res.writeHead(404); return res.end('not found'); }
    res.writeHead(200, { 'Content-Type': TYPES[path.extname(file)] || 'application/octet-stream', 'Cache-Control': 'no-cache' });
    res.end(data);
  });
}).listen(PORT, () => console.log('เกวียนปรุงยา online at port ' + PORT));
