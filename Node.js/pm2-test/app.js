const http = require('http')

const app = http.createServer((req, res) => {
  if (req.url === '/err') {
    throw new Error('/err 出错了')
  }
  res.end('pm2 test server 1')
})

app.listen(5001)
