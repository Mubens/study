const { execSql, escape } = require('../db/mysql')
const { encrypt } = require('../utils/cryp')

const login = async (username, password) => {
  username = escape(username)
  password = escape(encrypt(password))

  const sql = `select username, realname from users where username=${username} and password=${password};`
  console.log('sql is:', sql)
  const data = await execSql(sql)
  return data[0] || null
}

const register = async (formData) => {
  const userExitSQL = `select id, username from users where username=${escape(
    formData.username
  )};`
  const userExit = await execSql(userExitSQL)

  // 如果 username 的记录存在，不能重复注册
  if (userExit[0]) {
    return false
  }
  const { username, password, realname } = formData
  const registerSQL = `insert into users (username, password, realname) values (${escape(
    username
  )}, ${escape(password)}, ${escape(realname)});`
  const data = await execSql(registerSQL)
  return data.affectedRows > 0 ? true : false
}

module.exports = {
  login,
  register
}

//

//

//

//
function myIndexOf(a, b) {
  if (a == null || b == null) {
    return -1
  }
  if (b === '') {
    return 0
  }
  const reg = new RegExp(b)
  return reg.test(a) ? a.split(reg)[0].length : -1
}
