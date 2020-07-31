const router = require('koa-router')()

const {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog
} = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')

router.prefix('/api/blog')

router.get('/list', async (ctx, next) => {
  const author = ctx.query.author || ''
  const keyword = ctx.query.keyword || ''

  const data = await getList(author, keyword)

  ctx.body = data[0] ? new SuccessModel(data) : new ErrorModel('没有记录')
})

module.exports = router
