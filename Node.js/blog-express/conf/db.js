const env = process.env.NODE_ENV

let MYSQL_CONF = null
let REDIS_CONF = null

if (env === 'dev') {
  MYSQL_CONF = {
    host: 'localhost',
    user: 'root',
    password: '0095428',
    port: '3306',
    database: 'myblog'
  }

  REDIS_CONF = {
    port: 6379,
    host: '127.0.0.1'
  }
}

if (env === 'production') {
  MYSQL_CONF = {
    host: 'localhost',
    user: 'root',
    password: '0095428',
    port: '3306',
    database: 'myblog'
  }

  REDIS_CONF = {
    port: 6379,
    host: '127.0.0.1'
  }
}

module.exports = {
  MYSQL_CONF,
  REDIS_CONF
}
