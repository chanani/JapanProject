const { createProxyMiddleware} = require("http-proxy-middleware");

module.exports = function(app){
  app.use(
    '/notice',
    createProxyMiddleware({
      target : 'http://localhost:8889',
      changeOrigin : true,
    })
  );
  app.use(
    '/login',
    createProxyMiddleware({
      target : 'http://localhost:8889',
      changeOrigin : true,
    })
  );
  app.use(
    '/admin',
    createProxyMiddleware({
      target : 'http://localhost:8889',
      changeOrigin : true,
    })
  );
  app.use(
    '/chat-gpt',
    createProxyMiddleware({
      target : 'http://localhost:8889',
      changeOrigin : true,
    })
  );
  app.use(
    '/kafka',
    createProxyMiddleware({
      target : 'http://localhost:8889',
      changeOrigin : true,
    })
  );
  app.use(
    '/mypage',
    createProxyMiddleware({
      target : 'http://localhost:8889',
      changeOrigin : true,
    })
  );
  app.use(
    '/notifications',
    createProxyMiddleware({
      target : 'http://localhost:8889',
      changeOrigin : true,
    })
  );
  app.use(
    '/study',
    createProxyMiddleware({
      target : 'http://localhost:8889',
      changeOrigin : true,
    })
  );
  app.use(
    '/test',
    createProxyMiddleware({
      target : 'http://localhost:8889',
      changeOrigin : true,
    })
  );

};