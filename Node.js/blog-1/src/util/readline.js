const fs = require('fs')
const path = require('path')
const readline = require('readline')

const fileName = path.resolve(__dirname, '../', '../', 'logs', 'access.log')

const readStream = fs.createReadStream(fileName)
const rl = readline.createInterface({ input: readStream })

let chromeNum = 0
let sum = 0
rl.on('line', (linedata) => {
  if (!linedata) {
    return
  }
  //
  sum++
  const arr = linedata.split(' -- ')
  if (arr[2] && arr[2].indexOf('Chrome') > 0) {
    chromeNum++
  }
})

rl.on('close', () => {
  console.log('Chrome 占比：' + chromeNum / sum)
})
;('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.89 Safari/537.36')
;('Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:77.0) Gecko/20100101 Firefox/77.0')
;('Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.25 Safari/537.36 Core/1.70.3756.400 QQBrowser/10.5.4039.400')
;('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36 Edge/18.18363')

function myBrowser(userAgent) {
  var isOpera = userAgent.indexOf('Opera') > -1 //判断是否Opera浏览器
  var isIE =
    userAgent.indexOf('compatible') > -1 &&
    userAgent.indexOf('MSIE') > -1 &&
    !isOpera //判断是否IE浏览器
  var isEdge = userAgent.indexOf('Edge') > -1 //判断是否 Edge 浏览器
  var isFF = userAgent.indexOf('Firefox') > -1 //判断是否 Firefox 浏览器
  var isSafari =
    userAgent.indexOf('Safari') > -1 && userAgent.indexOf('Chrome') == -1 //判断是否 Safari 浏览器
  var isChrome =
    userAgent.indexOf('Chrome') > -1 && userAgent.indexOf('Safari') > -1 //判断 Chrome 浏览器

  if (isIE) {
    var reIE = new RegExp('MSIE (\\d+\\.\\d+);')
    reIE.test(userAgent)
    var fIEVersion = parseFloat(RegExp['$1'])
    if (fIEVersion == 7) {
      return 'IE7'
    } else if (fIEVersion == 8) {
      return 'IE8'
    } else if (fIEVersion == 9) {
      return 'IE9'
    } else if (fIEVersion == 10) {
      return 'IE10'
    } else if (fIEVersion == 11) {
      return 'IE11'
    } else {
      return '0'
    } //IE版本过低
    return 'IE'
  }
  if (isOpera) {
    return 'Opera'
  }
  if (isEdge) {
    return 'Edge'
  }
  if (isFF) {
    return 'FF'
  }
  if (isSafari) {
    return 'Safari'
  }
  if (isChrome) {
    return 'Chrome'
  }
}
