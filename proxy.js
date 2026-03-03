const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

const server = http.createServer((req, res) => {
  const url = req.url;

  if (url === '/scout' || url === '/scout/') {
    const proxyReq = http.request({
      hostname: 'localhost',
      port: 3001,
      path: '/',
      method: req.method,
      headers: req.headers
    }, (proxyRes) => {
      res.writeHead(proxyRes.statusCode, proxyRes.headers);
      proxyRes.pipe(res, { end: true });
    });
    req.pipe(proxyReq, { end: true });
  } else if (url.startsWith('/scout/match')) {
    const proxyReq = http.request({
      hostname: 'localhost',
      port: 3001,
      path: url,
      method: req.method,
      headers: req.headers
    }, (proxyRes) => {
      res.writeHead(proxyRes.statusCode, proxyRes.headers);
      proxyRes.pipe(res, { end: true });
    });
    req.pipe(proxyReq, { end: true });
  } else if (url.startsWith('/scout/pit')) {
    const proxyReq = http.request({
      hostname: 'localhost',
      port: 3001,
      path: url,
      method: req.method,
      headers: req.headers
    }, (proxyRes) => {
      res.writeHead(proxyRes.statusCode, proxyRes.headers);
      proxyRes.pipe(res, { end: true });
    });
    req.pipe(proxyReq, { end: true });
  } else if (url.startsWith('/scout/analytics')) {
    const targetPath = url.replace('/scout/analytics', '/analytics');
    const proxyReq = http.request({
      hostname: 'localhost',
      port: 3001,
      path: targetPath,
      method: req.method,
      headers: req.headers
    }, (proxyRes) => {
      let headers = { ...proxyRes.headers };
      if (proxyRes.headers.location) {
        headers.location = '/scout/analytics';
      }
      res.writeHead(proxyRes.statusCode, headers);
      proxyRes.pipe(res, { end: true });
    });
    req.pipe(proxyReq, { end: true });
  } else if (url.startsWith('/scout/login')) {
    const targetPath = url.replace('/scout/login', '/login');
    const proxyReq = http.request({
      hostname: 'localhost',
      port: 3001,
      path: targetPath,
      method: req.method,
      headers: req.headers
    }, (proxyRes) => {
      let headers = { ...proxyRes.headers };
      if (proxyRes.headers.location) {
        headers.location = '/scout/login';
      }
      res.writeHead(proxyRes.statusCode, headers);
      proxyRes.pipe(res, { end: true });
    });
    req.pipe(proxyReq, { end: true });
  } else if (url.startsWith('/scout/settings')) {
    const targetPath = url.replace('/scout/settings', '/settings');
    const proxyReq = http.request({
      hostname: 'localhost',
      port: 3001,
      path: targetPath,
      method: req.method,
      headers: req.headers
    }, (proxyRes) => {
      let headers = { ...proxyRes.headers };
      if (proxyRes.headers.location) {
        headers.location = '/scout/settings';
      }
      res.writeHead(proxyRes.statusCode, headers);
      proxyRes.pipe(res, { end: true });
    });
    req.pipe(proxyReq, { end: true });
  } else if (url.startsWith('/scout/admin')) {
    const targetPath = url.replace('/scout/admin', '/admin');
    const proxyReq = http.request({
      hostname: 'localhost',
      port: 3001,
      path: targetPath,
      method: req.method,
      headers: req.headers
    }, (proxyRes) => {
      let headers = { ...proxyRes.headers };
      if (proxyRes.headers.location) {
        headers.location = '/scout/admin';
      }
      res.writeHead(proxyRes.statusCode, headers);
      proxyRes.pipe(res, { end: true });
    });
    req.pipe(proxyReq, { end: true });
  } else if (url.startsWith('/scout/teams')) {
    const targetPath = url.replace('/scout/teams', '/teams');
    const proxyReq = http.request({
      hostname: 'localhost',
      port: 3001,
      path: targetPath,
      method: req.method,
      headers: req.headers
    }, (proxyRes) => {
      let headers = { ...proxyRes.headers };
      if (proxyRes.headers.location) {
        headers.location = '/scout/teams';
      }
      res.writeHead(proxyRes.statusCode, headers);
      proxyRes.pipe(res, { end: true });
    });
    req.pipe(proxyReq, { end: true });
  } else if (url.startsWith('/scout/images') || url === '/scout/logo.png' || url === '/scout/MetalCowRobotics_Logo_green_xlg.png') {
    let filePath = path.join(__dirname, 'www/scout/public', url.replace('/scout/', '/'));
    const ext = path.extname(filePath);
    const contentTypes = {
      '.png': 'image/png',
      '.jpg': 'image/jpeg',
      '.jpeg': 'image/jpeg',
      '.gif': 'image/gif',
      '.svg': 'image/svg+xml',
      '.ico': 'image/x-icon',
      '.webp': 'image/webp'
    };
    
    console.log('Serving static image:', filePath);
    
    fs.readFile(filePath, (err, content) => {
      if (err) {
        console.log('Error reading file:', err);
        res.writeHead(404);
        res.end('Not Found');
      } else {
        res.writeHead(200, { 'Content-Type': contentTypes[ext] || 'text/plain' });
        res.end(content);
      }
    });
  } else if (url.startsWith('/scout/') || url.startsWith('/_next') || url.startsWith('/favicon') || url.startsWith('/_next/image')) {
    const proxyReq = http.request({
      hostname: 'localhost',
      port: 3001,
      path: url,
      method: req.method,
      headers: req.headers
    }, (proxyRes) => {
      res.writeHead(proxyRes.statusCode, proxyRes.headers);
      proxyRes.pipe(res, { end: true });
    });
    req.pipe(proxyReq, { end: true });
  } else {
    let filePath = path.join(__dirname, 'www', url === '/' ? 'index.html' : url);
    
    if (!path.extname(filePath)) {
      filePath += '.html';
    }

    const ext = path.extname(filePath);
    const contentTypes = {
      '.html': 'text/html',
      '.css': 'text/css',
      '.js': 'application/javascript',
      '.png': 'image/png',
      '.jpg': 'image/jpeg',
      '.jpeg': 'image/jpeg',
      '.gif': 'image/gif',
      '.svg': 'image/svg+xml',
      '.ico': 'image/x-icon',
      '.webp': 'image/webp'
    };

    fs.readFile(filePath, (err, content) => {
      if (err) {
        if (err.code === 'ENOENT') {
          fs.readFile(path.join(__dirname, 'www', 'index.html'), (err2, content2) => {
            if (err2) {
              res.writeHead(404);
              res.end('Not Found');
            } else {
              res.writeHead(200, { 'Content-Type': 'text/html' });
              res.end(content2);
            }
          });
        } else {
          res.writeHead(500);
          res.end('Server Error');
        }
      } else {
        res.writeHead(200, { 'Content-Type': contentTypes[ext] || 'text/plain' });
        res.end(content);
      }
    });
  }
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log(`Main site: http://localhost:${PORT}/`);
  console.log(`Scout app: http://localhost:${PORT}/scout/`);
});
