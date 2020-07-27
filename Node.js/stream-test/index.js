// 标准输入输出
// process.stdin.pipe(process.stdout)

// const http = require('http')
// const server = http.createServer((req, res) => {
//   if (req.method === 'POST') {
//     req.pipe(res)
//   }
// })
// server.listen(8000, () => console.log('listening on http://localhost:8000/'))

// 复制文件
// const fs = require('fs')
// const path = require('path')
// const readFile = path.resolve(__dirname, 'data.txt')
// const writeFile = path.resolve(__dirname, 'data-copy.txt')
// const readStream = fs.createReadStream(readFile)
// const writeStream = fs.createWriteStream(writeFile)
// readStream.pipe(writeStream)
// let count = 0
// readStream.on('data', (chunk) => {
//   // console.log(chunk.toString()
//   console.log('count:', ++count)
// })
// readStream.on('end', () => {
//   console.log('copy has done')
//   count = 0
// })

const http = require('http')
const fs = require('fs')
const path = require('path')
const readFile = path.resolve(__dirname, 'data.txt')
const server = http.createServer((req, res) => {
  if (req.method === 'GET') {
    const readStream = fs.createReadStream(readFile)
    res.setHeader('Content-Type', 'text/html;charset=utf-8')
    readStream.pipe(res)
  }
})
server.listen(8000, () => console.log('listening on http://localhost:8000/'))
