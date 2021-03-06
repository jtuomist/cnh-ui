// server.js
const next = require('next');
const morgan = require('morgan');
const express = require('express');
const LRUCache = require('lru-cache');
const originalUrl = require('original-url');

const routes = require('./routes');

const serverPort = process.env.PORT || 3000;

const ssrCache = new LRUCache({
  length(n, key) {
    return n.toString().length + key.toString().length;
  },
  max: 50 * 1000 * 1000, // 50MB cache soft limit
  maxAge: 1000 * 60 * 60, // 1hour
});

const app = next({ dev: process.env.NODE_ENV !== 'production' });
const handler = routes.getRequestHandler(app, handleRoute);

app.prepare().then(() => {
  const server = express();

  server.use(morgan('dev'));
  server.use(handler)
    .listen(serverPort, (err) => {
      if (err) throw err;
      console.log(`Ready on http://localhost:${serverPort}`);
    });
});

/*
 * NB: make sure to modify this to take into account anything that should trigger
 * an immediate page change (e.g a locale stored in req.session)
 */
function getCacheKey(req) {
  return `${req.url}`;
}

function getCurrentURL(req) {
  const obj = originalUrl(req);
  let port;

  if (obj.protocol === 'http:' && obj.port === 80) {
    port = '';
  } else if (obj.protocol === 'https:' && obj.port === 443) {
    port = '';
  } else {
    port = `:${obj.port}`;
  }
  const path = obj.pathname.replace(/\/$/, ''); // strip trailing slash
  const domain = `${obj.protocol}//${obj.hostname}${port}`;
  return { domain, path };
}

function handleRoute({
  req, res, route, query,
}) {
  const cacheKey = getCacheKey(req);

  if (ssrCache.has(cacheKey)) {
    res.setHeader('x-cache', 'HIT');
    return res.send(ssrCache.get(cacheKey));
  }
  req.currentURL = getCurrentURL(req);
  app.renderToHTML(req, res, route.page, query).then((html) => {
    if (res.statusCode === 200) {
      ssrCache.set(req.url, html);
    }
    res.setHeader('x-cache', 'MISS');
    res.send(html);
  })
    .catch((err) => {
      app.renderError(err, req, res, route.page, query);
    });
}
