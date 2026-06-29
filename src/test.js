const http = require('http');
const req = http.request({
  hostname: process.env.LISTENER_HOST,
  port: 80,
  path: '/chain2',
  method: 'POST',
  headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Content-Length': 8 }
}, () => {});
req.write('chain2=1');
req.end();
