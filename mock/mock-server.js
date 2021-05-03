const bodyParser = require('body-parser')
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
      if (!route.url.match(/^-|^#-/))
        //開頭是"-"不回傳，開頭#的取代掉
        return responseFake(
          route.url.replace(/^#/, ''),
          route.type,
          route.response,
        )
    }),
  )
  for (const mock of mocksForServer) {
    app[mock.type](mock.url, bodyParser.json(), mock.response)
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
const responseFake = (url, type, respond) => {
  return {
    url: new RegExp(`${url}`),
    type: type || 'get',
    response(req, res) {
      console.log('request invoke:' + req.path)
      res.json(
        Mock.mock(respond instanceof Function ? respond(req, res) : respond),
      )
    },
  }
}

module.exports = {
  proxy,
  server(app) {
    // parse app.body
    // https://expressjs.com/en/4x/api.html#req.body
    // app.use(bodyParser.json())
    // app.use(bodyParser.urlencoded({
    //   extended: true
    // }))

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
  },
}
