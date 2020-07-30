const http = require('http')

class LikeExpress {
  constructor() {
    // 存放中间件的列表
    this.routes = {
      all: [], // app.use(...)
      get: [], // app.get(...)
      post: [] // app.post(...)
    }
  }

  // 分析第一个注册参数
  register(path) {
    const info = {}
    if (typeof path === 'string') {
      info.path = path
      // 从第二个参数开始，转化为数组
      info.stack = Array.prototype.slice.call(arguments, 1)
    } else {
      // 从第一个参数开始，转化为数组
      info.path = '/'
      info.stack = Array.prototype.slice.call(arguments, 0)
    }
    return info
  }

  // use 注册中间件
  use() {
    const info = this.register.apply(this, arguments)
    this.routes.all.push(info)
  }

  // get 注册中间件
  get() {
    const info = this.register.apply(this, arguments)
    this.routes.get.push(info)
  }

  // post 注册中间件
  post() {
    const info = this.register.apply(this, arguments)
    this.routes.post.push(info)
  }

  // 获取需要处理的中间件
  match(method, url) {
    let stack = []
    if (url === '/favicon.ico') {
      return stack
    }

    // 获取 routes
    let curRoutes = []
    curRoutes = curRoutes.concat(this.routes.all)
    curRoutes = curRoutes.concat(this.routes[method])

    curRoutes.forEach((routeInfo) => {
      if (url.indexOf(routeInfo.path) === 0) {
        // url === '/api/get-cookie' && routeInfo.path === '/'
        // url === '/api/get-cookie' && routeInfo.path === '/api'
        // url === '/api/get-cookie' && routeInfo.path === '/api/get-cookie'
        // XXXX url === '/others/api' && routeInfo.path === '/api' 不符合
        stack = stack.concat(routeInfo.stack)
      }
    })
    return stack
  }

  // 核心的 next 机制
  handle(req, res, stack) {
    const next = () => {
      // 拿到第一个匹配的中间件
      const middleware = stack.shift()
      if (middleware) {
        // 执行中间件函数
        middleware(req, res, next)
      }
    }
    next()
  }

  // 请求侦听事件
  reqListener = (req, res) => {
    res.json = (data) => {
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify(data))
    }
    const url = req.url
    const method = req.method.toLowerCase()

    // 拿到当前请求需要处理的中间件
    const resultList = this.match(method, url)
    // 处理这些中间件
    this.handle(req, res, resultList)
  }

  // app.listen
  listen(...args) {
    const server = http.createServer(this.reqListener)
    server.listen(...args)
  }
}

// const app = express()
module.exports = () => {
  return new LikeExpress()
}
