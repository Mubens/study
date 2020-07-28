const { login, register } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')

const handleUserRouter = async (req, res) => {
  const method = req.method
  const path = req.path

  // 登录
  if (method === 'POST' && path === '/api/user/login') {
    const { username, password } = req.body
    const result = await login(username, password)
    if (result) {
      // 设置 session
      req.session.username = result.username
    }
    return result
      ? new SuccessModel(result, 'login success')
      : new ErrorModel('登录失败')
  }

  // 测试
  // if (method === 'GET' && path === '/api/user/login_test') {
  //   const data = req.session.username
  //     ? new SuccessModel(`${req.session.username}已经登录`)
  //     : new ErrorModel('尚未登录')
  //   return Promise.resolve(data)
  // }

  // 注册
  if (method === 'POST' && path === '/api/user/register') {
    const result = await register(req.body)
    return result ? new SuccessModel('注册成功') : new ErrorModel('注册失败')
  }

  // 登出
  if (method === 'GET' && path === '/api/user/logout') {
    return Promise.resolve(new SuccessModel('logout'))
  }
}

module.exports = handleUserRouter
