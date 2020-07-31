const fs = require('fs')
const path = require('path')

function writeLog(writeStream, log) {
  writeStream.write(log + '\n')
}

function createWriteSream(fileName) {
  const fullFileName = path.join(__dirname, '../', '../', 'logs', fileName)
  return fs.createWriteStream(fullFileName, { flags: 'a' })
}

const accessWriteStream = createWriteSream('access.log')
function access(log) {
  writeLog(accessWriteStream, log)
}

module.exports = {
  access
}
