const express = require('express')
const chokidar = require('chokidar')
const chalk = require('chalk')
const Mock = require('mockjs')
const path = require('path')
const _ = require('lodash')

const mockDir = path.join(process.cwd(), 'mock')

//原API 網址傳路proxy
const api = process.env.VUE_APP_BASE_API
const proxy = require('./proxy.js')(api)
//使用代理 須把API網址 改為localhost

function registerRoutes(app) {
  let mockLastIndex
  let mocks = [{ url: '^/!@#$', response: '' }] //mocks 至少有一個
  try {
    mocks = [...require('./response')]
  } catch (e) {
    console.log(e)
    //
  }
  const mocksForServer = _.compact(
    mocks.map(route => {
      //開頭是"-"不回傳
      if (!route.url.match(/^-/)) {
        return responseFake(route.url, route.type, route.response, route.delay)
      }
    }),
  )
  for (const mock of mocksForServer) {
    app[mock.type](mock.url, mock.response)
    mockLastIndex = app._router.stack.length
  }
  const mockRoutesLength = Object.keys(mocksForServer).length
  return {
    mockRoutesLength: mockRoutesLength,
    mockStartIndex: mockLastIndex - mockRoutesLength,
  }
}

function unregisterRoutes() {
  Object.keys(require.cache).forEach(i => {
    if (i.includes(mockDir)) {
      delete require.cache[require.resolve(i)]
    }
  })
}

// for mock server
const responseFake = (url, type, respond, delay) => {
  return {
    url: new RegExp(`${url}`),
    type: type || 'get',
    response(req, res) {
      console.log('request invoke:' + req.path)
      const mockData = Mock.mock(
        respond instanceof Function ? respond(req, res) : respond,
      )
      if (_.isNumber(delay)) {
        setTimeout(() => {
          res.json(mockData)
        }, delay)
      } else res.json(mockData)
    },
  }
}
function server(app) {
  app.use(express.json())
  app.use(express.urlencoded({ extended: false }))

  const mockRoutes = registerRoutes(app)
  var mockRoutesLength = mockRoutes.mockRoutesLength
  var mockStartIndex = mockRoutes.mockStartIndex

  // watch files, hot reload mock server
  chokidar
    .watch(mockDir, {
      ignored: /mock-server|mockXHR|proxy|run|swagger/,
      ignoreInitial: true,
    })
    .on('all', (event, path) => {
      if (event === 'change' || event === 'add') {
        try {
          // 保存proxy的route
          const proxy_route = app._router.stack.splice(
            mockStartIndex + mockRoutesLength,
          )
          // remove mock routes stack
          app._router.stack.splice(mockStartIndex, mockRoutesLength)

          // clear routes cache
          unregisterRoutes()

          const mockRoutes = registerRoutes(app)
          // 重新註冊proxy
          app._router.stack = app._router.stack.concat(proxy_route)
          mockRoutesLength = mockRoutes.mockRoutesLength
          mockStartIndex = mockRoutes.mockStartIndex
          console.log(
            chalk.magentaBright(
              `\n > Mock Server hot reload success! changed  ${path}`,
            ),
          )
        } catch (error) {
          console.log(chalk.redBright(error))
        }
      }
    })
}

module.exports = function(config) {
  if (process.argv.includes('serve')) {
    process.env.VUE_APP_BASE_API = api.replace(/^http(s?):\/\/.*\//, '/')
    config.devServer.before = server
    config.devServer.proxy = proxy
  }
}
