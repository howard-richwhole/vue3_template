module.exports = api => {
  if (!process.argv.includes('build')) {
    process.env.VUE_APP_BASE_API = ''
  }
  return {
    '/api': {
      target: api,
      changeOrigin: true,
      // pathRewrite: { '^/h5': '/app' },
    },
  }
}
