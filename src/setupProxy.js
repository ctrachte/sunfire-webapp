const proxy = require('http-proxy-middleware');
module.exports = function(app) {
  app.use(
    proxy.createProxyMiddleware('/.netlify/functions/', {
      target: 'http://localhost:9000/',
      pathRewrite: {
        '^/\\.netlify/functions': '',
      },
    })
  );
};