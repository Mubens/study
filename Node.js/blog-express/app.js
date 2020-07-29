const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const session = require('express-session')
const RedisStore = require('connect-redis')(session)
const fs = require('fs')

const indexRouter = require('./routes/index')
const userRouter = require('./routes/user')
const blogRouter = require('./routes/blog')

const app = express()

// view engine setup
// app.set('views', path.join(__dirname, 'views'))
// app.set('view engine', 'jade')

const ENV = process.env.NODE_ENV
if (ENV !== 'production') {
  // 开发测试环境
  app.use(logger('dev', { stream: process.stdout }))
} else {
  // 生产环境
  const logFileName = path.join(__dirname, 'logs', 'access.log')
  const writeDtream = fs.createWriteStream(logFileName, { flags: 'a' })
  app.use(logger('combined', { stream: writeDtream }))
}

app.use(express.json()) // application/json get req body
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

const sessionStore = new RedisStore({
  client: require('./db/redis')
})
app.use(
  session({
    secret: 'FengGe_QQ#1321',
    cookie: {
      // path: '/',
      // httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000
    },
    store: sessionStore
  })
)
// app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)
app.use('/api/user', userRouter)
app.use('/api/blog', blogRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.send('error')
  // res.render('error')
})

module.exports = app
