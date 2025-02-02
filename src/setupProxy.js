const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api', // Add your API endpoint
    createProxyMiddleware({
      target: 'https://api.jsonserve.com/Uw5CrX', // The API server URL
      changeOrigin: true,
      secure: false,
    })
  );
};
