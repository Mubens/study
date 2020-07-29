const crypto = require('crypto')

// 密钥
const SECRET_KEY = 'Zhu_Muben#QQ-1321'

// md5 加密
const md5 = (content) => {
  let md5 = crypto.createHash('md5')
  return md5.update(content).digest('hex')
}

// 加密函数
const encrypt = (plaintext) => {
  const str = `password=${plaintext}&key=${SECRET_KEY}`
  return md5(str)
}

module.exports = {
  encrypt
}
