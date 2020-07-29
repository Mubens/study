const express = require('express')

const app = express()

app.use((req, res, next) => {
  console.log('req\t:', req.method, req.url)
  next()
})

app.use((req, res, next) => {
  // 假设模拟 cookie
  req.cookie = { sid: 'abc123' }
  next()
})

app.use((req, res, next) => {
  // 假设模拟异步
  setTimeout(() => {
    req.body = { a: 100, b: 200 }
    next()
  }, 1000)
})

app.use('/api', (req, res, next) => {
  console.log('handle\t: /api')
  next()
})

app.get('/api', (req, res, next) => {
  console.log('get\t: /api')
  next()
})

app.post('/api', (req, res, next) => {
  console.log('post\t: /api')
})

// 模拟登录验证
function loginCheck(req, res, next) {
  console.log('模拟登陆成功')
  setTimeout(() => {
    next()
  })
}

app.get('/api/get-cookie', loginCheck, (req, res, next) => {
  console.log('get\t: /api/get-cookie')
  res.json({
    errno: 0,
    data: req.cookie
  })
})

app.post('/api/get-cookie', (req, res, next) => {
  console.log('psot\t: /api/get-cookie')
  res.json({
    errno: 0,
    data: req.body
  })
})

app.use((req, res, next) => {
  console.log('handle\t: 404')
  res.json({
    errno: 1,
    msg: '404'
  })
})

app.listen(3000, () => console.log('http://localhost:3000'))
