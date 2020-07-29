const { ErrorModel } = require('../model/resModel')

module.exports = (req, res, next) => {
  req.session.username ? next() : res.json(new ErrorModel('未登录'))
}
