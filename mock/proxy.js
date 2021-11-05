module.exports = api => {
  return {
    '/api': {
      target: api,
      changeOrigin: true,
      xfwd: false,
      // pathRewrite: { '^/h5': '/app' },
    },
  }
}
