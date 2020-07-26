const fs = require('fs')
const path = require('path')

const fileName = path.resolve(__dirname, 'data.txt')

// 读文件
// fs.readFile(fileName, 'utf-8', (err, data) => {
//   if (err) {
//     console.error(err)
//   } else {
//     console.log(data)
//   }
// })

// 写文件
const data = '这是要写入的内容'
fs.writeFile(fileName, `\n${data}`, { flag: 'a' }, (err) => {
  if (err) {
    console.error(err)
  }
})

// 查文件
// fs.exists(fileName, (exists) => {
//   console.log('exists:', exists)
// })
