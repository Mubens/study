const mysql = require('mysql')

const { MYSQL_CONF } = require('../conf/db')

// 创建连接对象
const con = mysql.createConnection(MYSQL_CONF)

// 开始连接
con.connect()

// 执行 sql
function exec(sql) {
  return new Promise((resolve, reject) => {
    con.query(sql, (err, data) => {
      err ? reject(err) : resolve(data)
    })
  })
}

module.exports = {
  exec,
  escape: mysql.escape
}
