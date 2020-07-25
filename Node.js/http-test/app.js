const http = require('http')
const querystring = require('querystring')

const app = http.createServer()

app.on('request', (req, res) => {
  if (req.method === 'GET') {
    // 请求 url
    const url = req.url
    // 请求参数
    req.query = querystring.parse(url.split('?')[1])
    res.end(JSON.stringify(req.query))
  } else if (req.method === 'POST') {
    // 数据格式
    console.log('content-type:', req.headers['content-type'])
    // 接收数据
    let data = ''
    req.on('data', (chunk) => {
      data += chunk.toString()
    })
    req.on('end', () => {
      console.log('data:', data)
      res.end('ok')
    })
  }
})

app.listen(3000, () => {
  console.log(`listening on http://loclhost:3000`)
})
