const xss = require('xss')
const { execSql } = require('../db/mysql')

const getList = async (author, keyword) => {
  let sql = `select * from blogs where del=0`
  sql += author ? ` and author='${author}'` : ''
  sql += keyword ? ` and title like '%${keyword}%'` : ''
  sql += ' order by pubtime desc;'

  return await execSql(sql)
}

const getDetail = async (id) => {
  const sql = `select * from blogs where id=${id} and del=0;`
  return await execSql(sql)
}

const newBlog = async (blogData = {}) => {
  const { title, content, author } = blogData
  if (!title || !content || !author) {
    return false
  }
  title = xss(title)
  content = xss(content)
  const pubtime = +new Date()
  const sql = `insert into blogs (title, content, author, pubtime) values('${title}','${content}','${author}',${pubtime});`
  const data = await execSql(sql)
  return data.affectedRows > 0 ? true : false
}

const updateBlog = async (blogData) => {
  const { id, title, content } = blogData
  let sql = `update blogs set title='${title}', content='${content}' where id=${id};`
  const data = await execSql(sql)
  return data.affectedRows > 0 ? true : false
}

const delBlog = async (blogData) => {
  const { id, author } = blogData
  let sql = `update blogs set del=1 where id=${id} and author='${author}';`
  const data = await execSql(sql)
  return data.affectedRows > 0 ? true : false
}

module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog
}
