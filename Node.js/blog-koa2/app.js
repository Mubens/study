const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const session = require('koa-generic-session')
const redisStore = require('koa-redis')
const path = require('path')
const morgan = require('koa-morgan')
const fs = require('fs')

const index = require('./routes/index')
const user = require('./routes/user')
const blog = require('./routes/blog')

const { REDIS_CONF } = require('./conf/db')

// error handler
onerror(app)

// middlewares
app.use(
  bodyparser({
    enableTypes: ['json', 'form', 'text']
  })
)
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(
  views(__dirname + '/views', {
    extension: 'pug'
  })
)

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'))
} else {
  const logFileName = path.join(__dirname, 'logs', 'access.log')
  const writeStream = fs.createWriteStream(logFileName, { flags: 'a' })
  app.use(morgan('combined', { stream: writeStream }))
}

// session 配置
app.keys = ['FengGe_QQ#1321']
app.use(
  session({
    // 配置 cookie
    cookie: { path: '/', httpOnly: true, maxAge: 24 * 60 * 60 * 1000 },
    // 配置 redis
    store: redisStore({ host: REDIS_CONF.host, port: REDIS_CONF.port })
  })
)

// routes
app.use(index.routes(), index.allowedMethods())
app.use(user.routes(), user.allowedMethods())
app.use(blog.routes(), blog.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
})

module.exports = app