'use strict'
const mockServer = require('./mock/mock-server.js')

const port = 8080
const name = 'vue3'

const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  publicPath: process.env.VUE_APP_BASE_URL_CDN,
  assetsDir: 'static',
  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: false,
  css: {
    extract: false,
  },
  devServer: {
    port: port,
    open: false,
    overlay: {
      warning: false,
      errors: true,
    },
    before: mockServer.server,
    proxy: mockServer.proxy,
  },
  configureWebpack: {
    name: name,
    resolve: {
      alias: {
        '@': resolve('src'),
      },
    },
  },
  chainWebpack(config) {
    //禁止檔案大小警告
    config.performance.hints(false)
    // runtime檔(各js目錄)只產生一個
    config.optimization.runtimeChunk('single')
    // 如果太多頁，會一次request太多頁的js
    config.plugins.delete('prefetch')
    config.plugin('preload').tap(() => [
      {
        rel: 'preload',
        // 以下檔案不preload
        fileBlacklist: [/\.map$/, /hot-update\.js$/, /runtime\..*\.js$/],
        include: 'initial',
      },
    ])
    config.when(process.env.NODE_ENV !== 'development', config => {
      //webp
      config.plugin('webp').use('imagemin-webp-webpack-plugin', [
        {
          config: [
            {
              test: /\.(jpe?g|png)/,
              options: {
                quality: 50,
              },
            },
          ],
        },
      ])
      config
        .plugin('ScriptExtHtmlWebpackPlugin')
        .after('html')
        .use('script-ext-html-webpack-plugin', [
          {
            // runtime 檔案命名同其他js
            inline: /runtime\..*\.js$/,
          },
        ])
        .end()
      // 代碼分離
      config.optimization.splitChunks({
        chunks: 'all',
        cacheGroups: {
          libs: {
            name: 'chunk-libs',
            test: /[\\/]node_modules[\\/]/,
            priority: 10, // 優先度
            chunks: 'initial',
            // async(僅分出動態引入js)、all(動態js、非動態js皆分出，但放在一起)、initial(動態js、非動態js皆分出，但不放在一起)
          },
          commons: {
            name: 'chunk-commons',
            test: /[\\/](components|utils)[\\/]/,
            minChunks: 2, // 進行分離最少引用次數條件
            priority: 5,
            reuseExistingChunk: true, // 重複使用
          },
        },
      })
    })
    // 圖片轉base64 使用webp應取消此功能
    // config.module
    //   .rule('images')
    //   .use('url-loader')
    //   .loader('url-loader')
    //   .tap((options) => Object.assign(options, { limit: 10 }))
    //   .end()
  },
}
