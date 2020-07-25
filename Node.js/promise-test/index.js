const fs = require('fs')
const path = require('path')

/**
 * callback hell
 */
// function getFileContent(fileName, callback) {
//   const fullFileName = path.resolve(__dirname, 'files', fileName)

//   fs.readFile(fullFileName, 'utf-8', (err, data) => {
//     err ? console.log(err) : callback(JSON.parse(data))
//   })
// }

// getFileContent('a.json', (adata) => {
//   console.log(adata)
//   getFileContent(adata.next, (bdata) => {
//     console.log(bdata)
//     getFileContent(bdata.next, (cdata) => {
//       console.log(cdata)
//     })
//   })
// })

/**
 * Promise
 */
// function getFileContent(fileName) {
//   return new Promise((resolve, reject) => {
//     const fullFileName = path.resolve(__dirname, 'files', fileName)

//     fs.readFile(fullFileName, 'utf-8', (err, data) => {
//       err ? reject(err) : resolve(JSON.parse(data))
//     })
//   })
// }

// getFileContent('a.json')
//   .then((adata) => {
//     console.log(adata)
//     return getFileContent(adata.next)
//   })
//   .then((bdata) => {
//     console.log(bdata)
//     return getFileContent(bdata.next)
//   })
//   .then((cdata) => {
//     console.log(cdata)
//   })
//   .catch((err) => {
//     console.log(err)
//   })

/**
 * async / await
 */
function getFileContent(fileName) {
  return new Promise((resolve, reject) => {
    const fullFileName = path.resolve(__dirname, 'files', fileName)

    fs.readFile(fullFileName, 'utf-8', (err, data) => {
      err ? reject(err) : resolve(JSON.parse(data))
    })
  })
}

;(async function () {
  let adata = await getFileContent('a.json')
  console.log(adata)
  let bdata = await getFileContent(adata.next)
  console.log(bdata)
  let cdata = await getFileContent(bdata.next)
  console.log(cdata)
})()
