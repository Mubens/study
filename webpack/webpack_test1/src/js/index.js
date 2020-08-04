/**
 * 这里的 index.js 不同于学习模块化时，那个用于汇总 js 的文件
 * 而是 webpack 的入口文件
 * 可以汇总：js、css、json、图片、视频、音频
 */

/* 汇总所有的js模块 */
import '@babel/polyfill'
import { sum } from './module1'
import { sub } from './module2'
import module3 from './module3'
// 引入 json 文件
import a from '../json/test.json'
// 引入 less 文件

import '../css/iconfont.less'
import '../css/index.less'

console.log(sum(1, 2))
console.log(sub(3, 2))
console.log(module3.mul(1, 2))
console.log(module3.div(10, 2))
console.log(a, typeof a)

// webpack 只管翻译 es6 的模块语法变为浏览器认识的，但是不会处理其他新的语法
setTimeout(() => {
  console.log('定时器到点了')
}, 1000)

new Promise(resolve => {
  setTimeout(() => {
    resolve('Hello')
  }, 2000)
}).then(data => console.log(data))
