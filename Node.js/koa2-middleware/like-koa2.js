const http = require('http')

class LikeKoa2 {
  constructor() {
    this.middlewareList = []
  }

  use(fn) {
    this.middlewareList.push(fn)
    return this
  }

  // 组合中间件
  compose = (ctx) => {
    const dispatch = (i) => {
      const fn = this.middlewareList[i]
      try {
        // 执行中间件 ((ctx, next) => {})()
        return Promise.resolve(fn(ctx, dispatch.bind(null, i + 1)))
      } catch (err) {
        return Promise.reject(err)
      }
    }
    return dispatch(0) // (ctx, next) => {}
  }

  createContext(request, response) {
    const ctx = { request, response }
    ctx.query = request.query
    ctx.method = request.method
    return ctx
  }

  reqListener = (req, res) => {
    const ctx = this.createContext(req, res)
    return this.compose(ctx)
  }

  listen(...args) {
    const server = http.createServer(this.reqListener)
    server.listen(...args)
  }
}

module.exports = LikeKoa2
