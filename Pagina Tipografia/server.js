const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const ROOT = __dirname;
const REQUIRED_CODE = 'S0UL17264';
const DOWNLOAD_FILES = {
  ttf: 'NewgenSoulsarchive-Regular.ttf',
  otf: 'NewgenSoulsarchive-Regular.otf'
};

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.ttf': 'font/ttf',
  '.otf': 'font/otf',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

function sendJson(res, statusCode, payload) {
  res.writeHead(statusCode, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(JSON.stringify(payload));
}

function serveFile(res, filePath, filename = null) {
  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  fs.readFile(filePath, (error, content) => {
    if (error) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Not found');
      return;
    }

    const headers = {
      'Content-Type': contentType,
      'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
      'Pragma': 'no-cache',
      'X-Content-Type-Options': 'nosniff'
    };

    if (filename) {
      headers['Content-Disposition'] = `attachment; filename="${filename}"`;
    }

    res.writeHead(200, headers);
    res.end(content);
  });
}

function parseBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.setEncoding('utf8');
    req.on('data', (chunk) => {
      body += chunk;
      if (body.length > 1e6) {
        req.destroy();
      }
    });
    req.on('end', () => {
      try {
        if (!body) {
          resolve({});
          return;
        }

        const contentType = (req.headers['content-type'] || '').toLowerCase();

        if (contentType.includes('application/json')) {
          resolve(JSON.parse(body));
          return;
        }

        if (contentType.includes('application/x-www-form-urlencoded')) {
          const params = new URLSearchParams(body);
          resolve(Object.fromEntries(params.entries()));
          return;
        }

        resolve({ code: body.trim() });
      } catch (error) {
        console.error('Cuerpo inválido recibido:', body);
        reject(error);
      }
    });
    req.on('error', (error) => {
      console.error('Error al leer el cuerpo:', error);
      reject(error);
    });
  });
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);

  if (req.method === 'POST' && url.pathname.startsWith('/download/')) {
    try {
      const body = await parseBody(req);
      const code = typeof body.code === 'string' ? body.code.trim() : '';

      if (code !== REQUIRED_CODE) {
        sendJson(res, 403, { ok: false, error: 'Código incorrecto' });
        return;
      }

      const format = url.pathname.split('/').pop();
      const fileName = DOWNLOAD_FILES[format];

      if (!fileName) {
        sendJson(res, 404, { ok: false, error: 'Formato no permitido' });
        return;
      }

      const filePath = path.join(ROOT, fileName);

      fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
          sendJson(res, 404, { ok: false, error: 'Archivo no encontrado' });
          return;
        }

        serveFile(res, filePath, fileName);
      });
      return;
    } catch (error) {
      sendJson(res, 400, { ok: false, error: 'Solicitud inválida' });
      return;
    }
  }

  if (req.method === 'GET' && url.pathname === '/font/ttf') {
    serveFile(res, path.join(ROOT, 'NewgenSoulsarchive-Regular.ttf'), 'NewgenSoulsarchive-Regular.ttf');
    return;
  }

  if (req.method === 'GET' && url.pathname === '/font/otf') {
    serveFile(res, path.join(ROOT, 'NewgenSoulsarchive-Regular.otf'), 'NewgenSoulsarchive-Regular.otf');
    return;
  }

  let reqPath = url.pathname;
  if (reqPath === '/') reqPath = '/index.html';
  const safePath = path.normalize(reqPath).replace(/^\/+/, '');
  const fullPath = path.join(ROOT, safePath);

  if (!fullPath.startsWith(ROOT)) {
    res.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Forbidden');
    return;
  }

  if (fs.existsSync(fullPath) && fs.statSync(fullPath).isFile()) {
    const ext = path.extname(fullPath).toLowerCase();
    if (ext === '.ttf' || ext === '.otf') {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Not found');
      return;
    }

    serveFile(res, fullPath);
    return;
  }

  res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
  res.end('Not found');
});

server.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
