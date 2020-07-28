const {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog
} = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')

// 登录验证
const loginCheck = (req) => {
  if (!req.session.username) {
    return Promise.resolve(new ErrorModel('尚未登录'))
  }
}

const handleBlogRouter = async (req, res) => {
  const method = req.method
  const path = req.path

  // 获取博客列表
  if (method === 'GET' && path === '/api/blog/list') {
    const author = req.query.author || ''
    const keyword = req.query.keyword || ''

    const data = await getList(author, keyword)
    return data[0] ? new SuccessModel(data) : new ErrorModel('没有记录')
  }

  // 获取博客详情
  if (method === 'GET' && path === '/api/blog/detail') {
    const data = await getDetail(req.query.id)
    return data[0] ? new SuccessModel(data) : new ErrorModel('没有记录')
  }

  // 新建一篇博客
  if (method === 'POST' && path === '/api/blog/new') {
    const notLogin = loginCheck(req)
    if (notLogin) {
      // 未登录
      return notLogin
    }
    req.body.author = req.session.username
    const data = await newBlog(req.body)
    return data
      ? new SuccessModel('博客创建成功')
      : new ErrorModel('博客创建失败')
  }

  // 更新一篇博客
  if (method === 'POST' && path === '/api/blog/update') {
    const notLogin = loginCheck(req)
    if (notLogin) {
      // 未登录
      return notLogin
    }
    const result = await updateBlog(req.body)
    return result
      ? new SuccessModel('更新博客成功')
      : new ErrorModel('更新博客失败')
  }

  // 删除一篇博客
  if (method === 'POST' && path === '/api/blog/del') {
    const notLogin = loginCheck(req)
    if (notLogin) {
      // 未登录
      return notLogin
    }
    req.body.author = req.session.username
    const result = await delBlog(req.body)
    return result
      ? new SuccessModel('删除博客成功')
      : new ErrorModel('删除博客失败')
  }
}

module.exports = handleBlogRouter
