module.exports = api => {
  return {
    '/api': {
      target: api,
      changeOrigin: true,
      // pathRewrite: { '^/h5': '/app' },
    },
  }
}
