const http = require('http')

const hostname = '127.0.0.1'
const port = 3000
const app = http.createServer()

app.on('request', (req, res) => {
  // res.statusCode = 200
  // res.setHeader('Content-Type', 'text/html')
  // 上面两步等同于
  res.writeHead(200, { 'content-type': 'text/html' })

  res.end('<h1>Hello world!</h1>')
})

app.listen(port, hostname, () => {
  console.log(`listening on http://${hostname}:${port}`)
})
