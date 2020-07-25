const mysql = require('mysql')

// 创建连接对象
const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '0095428',
  port: '3306',
  database: 'myblog'
})

// 连接数据库
con.connect()

console.log(1)
// sql 操作
const select = 'select * from users where state=1;'
con.query(select, (err, data) => {
  if (err) {
    console.error(err)
  } else {
    console.log(data)
  }
})
console.log(2)

// 关闭连接
con.end()
