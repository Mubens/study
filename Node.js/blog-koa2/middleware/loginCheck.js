const { ErrorModel } = require('../model/resModel')

module.exports = async (ctx, next) => {
  ctx.session.username ? await next() : (ctx.body = new ErrorModel('未登录'))
}
