var express = require('express')
var router = express.Router()

const {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog
} = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')

/* GET users listing. */
router.get('/list', async function (req, res, next) {
  const author = req.query.author || ''
  const keyword = req.query.keyword || ''

  const data = await getList(author, keyword)

  res.json(data[0] ? new SuccessModel(data) : new ErrorModel('没有记录'))
})

router.get('/detail', (req, res) => {
  res.json({
    errno: 0,
    data: 'OK'
  })
})

module.exports = router
