var express = require('express')
var router = express.Router()

const { login } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')

/* GET users listing. */
router.post('/login', async (req, res, next) => {
  const { username, password } = req.body
  const result = await login(username, password)
  if (result) {
    // 设置 session
    req.session.username = result.username
  }
  res.json(result ? new SuccessModel(result) : new ErrorModel('登录失败'))
})

router.get('/login-test', (req, res, next) => {
  const { username } = req.session
  res.json(
    username ? new SuccessModel(`${username}已登录`) : new ErrorModel('未登录')
  )
})

router.get('/logout', (req, res, next) => {
  const { username } = req.session
  if (username) {
    delete req.session.username
  }
  res.json(
    username
      ? new SuccessModel(`${username}退出登录`)
      : new ErrorModel('未登录')
  )
})

// router.get('/session-test', function (req, res, next) {
//   const session = req.session
//   if (session.viewNum == null) {
//     session.viewNum = 0
//   }
//   session.viewNum++
//   res.json({
//     viewNum: session.viewNum
//   })
// })

module.exports = router
