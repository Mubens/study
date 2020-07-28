const querystring = require('querystring')

const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')
const { get, set, del } = require('./src/db/redis')
const { access } = require('./src/util/log')

// 解析请求体
const getPostData = (req) => {
  return new Promise((resolve, reject) => {
    if (
      req.method !== 'POST' ||
      req.headers['content-type'] !== 'application/json'
    ) {
      resolve({})
      return
    }

    let data = ''
    req.on('data', (chunk) => {
      data += chunk.toString()
    })
    req.on('end', () => {
      data ? resolve(JSON.parse(data)) : resolve({})
    })
  })
}
// 解析 cookie
const getCookie = (req) => {
  let cookie = {}
  const cookieStr = req.headers.cookie || ''

  cookieStr.split(';').forEach((item) => {
    if (!item) {
      return
    }
    const arr = item.split('=')
    const key = arr[0].trim()
    const val = arr[1].trim()
    cookie[key] = val
  })
  return cookie
}
// 设置 cookie 过期时间
const getCookieExpires = (duration = 24 * 60 * 60) => {
  return new Date(+new Date() + duration * 1000).toGMTString()
}
// 解析 session
const getSessionId = async (sid) => {
  if (sid) {
    if (!get(sid)) {
      set(sid, {})
    }
  } else {
    sid = (
      parseInt((Math.random() + 1) * 10 ** 11).toString(36) +
      (+new Date()).toString(36)
    ).toUpperCase()
    set(sid, {})
  }
  return sid
}

// http 请求处理
const serverHandle = async (req, res) => {
  // 记录 access log
  access(
    `${req.method} -- ${req.url} -- ${
      req.headers['user-agent']
    } -- ${Date.now()}`
  )

  // 设置返回格式 JSON
  res.setHeader('Content-Type', 'application/json')

  const url = req.url.split('?')

  // 获取 path
  req.path = url[0]
  // 解析 query
  req.query = querystring.parse(url[1])
  // 获取 body
  req.body = await getPostData(req)
  console.log(req.body)
  // 解析 cookie
  req.cookie = getCookie(req)
  // 解析 session
  // const userId = getSessionId(req.cookie.userId)
  // req.session = SESSION_DATA[userId]
  const userId = await getSessionId(req.cookie.userId)
  req.session = await get(userId)

  // 处理 blog 路由
  const blogData = await handleBlogRouter(req, res)
  if (blogData) {
    res.end(JSON.stringify(blogData))
    return
  }

  // 处理 user 路由
  const userData = await handleUserRouter(req, res)
  if (userData) {
    // 登录成功则设置 cookie sessionId
    if (userData.message === 'login success') {
      set(userId, req.session)
      res.setHeader(
        'Set-Cookie',
        `userId=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`
      )
    }
    if (userData.message === 'logout') {
      del(userId)
      res.setHeader(
        'Set-Cookie',
        `userId=${userId}; path=/; httpOnly; expires=${getCookieExpires(0)}`
      )
    }
    res.end(JSON.stringify(userData))
    return
  }

  // 处理 * 路由 404
  res.writeHead(404, { 'Content-Type': 'text/html' })
  res.end('<h1>404 Not Found</h1>')
}

module.exports = serverHandle
