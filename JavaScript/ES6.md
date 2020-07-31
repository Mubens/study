# ECMAScript 6

## 1 ECMAScript 相关介绍

### 1.1 什么是 ECMA

ECMA (European Computer Manufacturers Association) 中文名称为欧洲计算机制造商协会，这个组织的目标是评估、开发和认可电信和计算机标准。1994 年后该组织改名为 Ecma 国际。

### 1.2 什么是 ECMAScript

ECMAScript 是由 Ecma 国际通过 ECMA-262 标准化的脚本程序设计语言。

### 1.3 什么是 ECMA-262

Ecma 国际制定了许多标准，而 ECMA-262 只是其中的一个，所有标准列表查看
http://www.ecma-international.org/publications/standards/Standard.htm

### 1.4 ECMA-262 历史

ECMA-262 (ECMAScript) 历史版本查看网址
http://www.ecma-international.org/publications/standards/Ecma-262-arch.htm

| 版本        | 时间               | 内容                                                                    |
| :---------- | ------------------ | ----------------------------------------------------------------------- |
| 第 1 版     | 1997 年            | 制定了语言基本语法                                                      |
| 第 2 版     | 1998 年            | 较小改动                                                                |
| 第 3 版     | 1999 年            | 引入正则、异常处理。<br />格式化输出等。IE 开始支持                     |
| 第 4 版     | 2007 年            | 过于激进，未发布                                                        |
| 第 5 版     | 2009 年            | 引入严格模式、JSON、<br />扩展对象、数组、原型、字符串、日期方法        |
| **第 6 版** | **2015 年**        | 模块化、面向对象语法、Promise、箭头函数、<br />let、const、解构赋值等等 |
| 第 7 版     | 2016 年            | 幂运算符、数组扩展、async/await 关键字                                  |
| 第 8 版     | 2017 年            | async/await、字符串扩展                                                 |
| 第 9 版     | 2018 年            | 对象解构赋值、正则扩展                                                  |
| 第 10 版    | 2019 年            | 扩展对象、数组方法                                                      |
| 第 11 版    | 2020 年            |                                                                         |
| ES.next     | 动态指向下一个版本 |                                                                         |

> 从 ES6 开始，每年发布一个版本

### 1.5 谁在维护 ECMA-262

TC39 (Technical Committee 39) 是推进 ECMAScript 发展的委员会。其会员都是公司(其中主要是浏览器厂商，有苹果、谷歌、微软、因特尔等)。TC39 定期召开会议，会议由会员公司的代表与特邀专家出席。

### 1.6 为什么要学习 ES6

- ES6 的版本变动内容最多，具有里程碑意义

- ES6 加入许多新的语法特性，编程实现更简单、高效
- ES6 是前端发展趋势，就业必备技能

### 1.7 ES6 兼容性

http://kangax.github.io/compat-table/es6/ 可查看兼容性

## 2 ECMAScript 2015

### 2.1 let 声明变量

使用 let 代替 var 声明变量

**特性：**

- 不能重复声明

  ```javascript
  let star = '刘德华'
  let star = '张学友' // Uncaught SyntaxError: Identifier 'star' has already been declared
  ```

- 块级作用域 全局，函数，evel

  ```javascript
  if (1) {
    var name = '刘德华'
    let age = 18
  }
  console.log(name) // 刘德华
  console.log(age) // Uncaught ReferenceError: age is not defined
  ```

- 不会变量提升

  ```javascript
  console.log(song) // undefined
  var song = '冰雨'

  console.log(movie)
  let movie = '狄仁杰通天帝国' // Uncaught ReferenceError: Cannot access 'movie' before initialization
  ```

### 2.2 const 声明常量

使用 const 代替 var 声明常量

**特性：**

- 不能重复声明

- 必须要赋初值

  ```javascript
  const num = 10
  const str	// Uncaught SyntaxError: Missing initializer in const declaration
  ```

- 常量（地址）不能修改

  ```javascript
  const STAR = '刘德华'
  STAR = '张学友' // Uncaught TypeError: Assignment to constant variable
  ```

- 块级作用域

- 不会变量提升

### 2.3 解构赋值

- 数组解构

  ```javascript
  const arr = [1, 2, 3, 4]
  let [a, b, c, d] = arr
  console.log(a, b, c, d) // 1 2 3 4
  ```

- 对象解构

  ```javascript
  const star = { name: '刘德华', age: 22, sex: '男' }
  let { name, age, sex } = star
  console.log(name, age, sex) // 刘德华 22 男
  ```

### 2.4 模版字符串

使用 ``` `代替`''`

**特性：**

- 内容可以直接换行

  ```javascript
  let str = `
  	<ul>
  		<li>1</li>
  		<li>2</li>
  	</ul>
  `
  ```

- 变量拼接

  ```javascript
  let name = '刘德华'
  let song = '爱你一万年'
  let msg = `${name}唱${song}`
  ```

### 2.5 对象简化

ES6 允许在大括号里面，直接写入变量和函数，作为对象的属性和方法。

```javascript
let name = '刘德华'
let sing = function () {
  console.log('冰雨')
}

const star = {
  name,
  sing,
  es5: function () {},
  es6() {}
}
```

### 2.6 箭头函数

使用 `() => {}` 代替 `function () {}`

```javascript
let fn = (a, b) => {
  return a + b
}
fn(1, 2)
```

**特性：**

- `this` 是静态的，始终指向声明时作用域下的 `this`

- 无法使用 `call` / `apply` / `bind` 改变 `this` 的指向

- 不能作为构造函数对象

  ```javascript
  const Person = (name, age) => {
    this.name = name
    this.age = age
  }
  const pserson = new Person('ming', 18) // Uncaught TypeError: Person is not a constructor
  ```

- 函数没有 `arguments`

- 当且仅当形参只有一个时，可以省略小括号
- 当代码只有一条语句时，可以省略大括号，直接 return 执行结果

**使用场景：**

- 适合与 `this` 无关的回调，定时器、数组方法的回调
- 不适合与 `this` 有关的回调，DOM 事件回调、对象的方法

### 2.7 形参的默认值

ES6 允许给函数形参赋默认值

```javascript
function add(a = 0, b = 0) {
  return a + b
}
add() // 0
add(10) // 10
add(10, 21) // 31
```

- 可以结合解构赋值

```javascript
function connect({ host = '127.0.0.1', port = 8080 }) {
  return 'http://' + host + ':' + port
}
connect()
connect({ host: '127.0.0.1', port: 3000 })
```

- 不能出现同名形参

### 2.8 rest 参数

ES6 引入了 `rest` 剩余参数，代替 `arguments` ，用于获取函数的实参。

```javascript
function getArgs(a, b, ...args) {
  console.log(a) // 白金
  console.log(b) // 加加
  console.log(args) // ['企业']
}
getArgs('白金', '加加', '企业')
```

`rest` 参数必须放到最后

### 2.9 扩展运算符

扩展运算符 `...` 能将数组转化为逗号分隔的参数序列

```javascript
function exec() {
  console.log(arguments)
}
const AZ = ['企业', '饺子']
exec(AZ) // [['企业', '饺子'], length: 1]
exec(...AZ) // ['企业', '饺子', length: 2]
```

**使用场景：**

- 数组合并

  ```javascript
  const kuaizi = ['肖央', '王太利']
  const fenghuang = ['杨魏玲花', '曾毅']
  const zuixuanxiaopingguo = [...kuaizi, ...fenghuang]

  console.log(zuixuanxiaopingguo) // ['肖央', '王太利', '杨魏玲花', '曾毅']
  ```

- 数组克隆

  引用类型还是浅拷贝

- 将伪数组转化为真正的数组

  NodeList 转为 ArrayList

  arguments 转为 ArrayList

### 2.10 Symbol

#### 2.10.1 Symbol 的基本使用

ES6 引入了一种新的原始数据类型 Symbol，表示独一无二的值。它是 JavaScript 语言的第七种数据类型，是一种类似于字符串的数据类型。

```javascript
let sym = Symbol()
```

**Symbol 特点：**

- Symbol 的值是唯一的，用来解决命名冲突的问题
- Symbol 值不能与其他数据进行运算
- Symbol 定义的对象属性不能使用 for...in 循环遍历，但是可以使用
- Reflect.ownKeys 来获取对象的所有键名

#### 2.10.2 Symbol 内置值

除了定义自己使用的 Symbol 值以外，ES6 还提供了 11 个内置的 Symbol 值，指向语言内部使用的方法。

| 值                        |                                                                                                                                |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| Symbol.hasInstance        | 当其他对象使用 instanceof 运算符，判断是否为该对象<br/>的实例时，会调用这个方法                                                |
| Symbol.isConcatSpreadable | 对象的 Symbol.isConcatSpreadable 属性等于的是一一个布<br/>尔值，表示该对象用于 Array.prototype.concat()时，是否<br/>可以展开。 |
| Symbol.unscopables        | 该对象指定了使用 with 关键字时，哪些属性会被 with<br/>环境排除。                                                               |
| Symbol.match              | 当执行 str.match(myObject)时，如果该属性存在，会调<br/>用它，返回该方法的返回值。                                              |
| Symbol.replace            | 当该对象被 str.replace(myObject)方法调用时，会返回该<br/>方法的返回值。                                                        |
| Symbol.search             | 当该对象被 str. search (myObject)方法调用时，会返回该<br/>方法的返回值。                                                       |
| Symbol.split              | 当该对象被 str. split (myObject)方法调用时，会返回该方<br />法的返回值。                                                       |
| Symbol.iterator           | 返回该对象的默认遍历器                                                                                                         |
| Symbol.toPrimitive        | 该对象被转为原始类型的值时，会调用这个方法，返回<br/>该对象对应的原始类型值。                                                  |
| Symbol. toStringTag       | 在该对象上面调用 toString 方法时，返回该方法的返回值                                                                           |
| Symbol.species            | 创建衍生对象时，会使用该属性                                                                                                   |

### 2.11 迭代器

迭代器（Iterator）是一种接口，为各种不同的数据结构提供统一的访问机制。任何数据结构只要部署 Iterator 接口，就可以完成遍历操作。

1. ES6 创造了一种新的遍历命令 for...of 循环，Iterator 接口主要供 for...of 消费
2. 原生具备 Iterator 接口的数据（可用 for...of 遍历）
   - Array
   - Arguments
   - Set
   - Map
   - String
   - TypedArray
   - NodeList
3. 工作原理
   1. 创建一个指针对象，指向当前数据结构的起始位置
   2. 第一次调用对象的 next 方法，指针自动指向数据结构的第一个成员
   3. 接下来不断调用 next 方法，指针一直往后移动，直到指向最后一个成员
   4. 每调用 next 方法返回一个包含 value 和 done 属性的对象

### 2.12 生成器

生成器（Generator）是 ES6 提供的一种异步编程解决方案，可以分段执行一个函数。

```javascript
function* fn() {
  yield 'a'
  yield 'b'
}
```

### 2.13 Promise

Promise 是 ES6 引入的异步编得的新解决方案。语法上 Promise 是-一个构造函数，用来封装异步操作并可以获取其成功或失败的结果。

1. Promise 构造函数：Promise (excutor) {}
2. Promise.prototype.then 方法
3. Promise.prototype.catch 方法

调用 `then` 方法，返回的结果是 Promise 对象，对象状态由回调函数的执行结果决定。

- 如果回调函数中返回的结果是非 promise，状态值为 resolved ，返回值为 then 的返回值
- 如果回调函数中返回的结果是 promise，状态值为该 promise 的状态值 ，返回值为该 promise 的返回值
- 如果回调函数中抛出错误，状态值为 rejected，返回值为 抛出的错误

### 2.14 Set 集合

ES6 提供了新的数据结构 Set（集合）。它类似于数组，但成员的值都是唯一的（自动去重），集合实现了 iterator 接口，所以可以使用 `...` 和 `for...of` 。

集合的属性和方法：

- size：返回集合的元素个数
- add：增加一个元素，返回当前 set
- delete：删除一个元素，返回 boolean 值
- has：检测集合中是否包含某个元素，返回 boolean 值
- clear：清空 set

### 2.15 Map 集合

ES6 提供了 Map 数据结构。它类似于对象，也是键值对的集合。但是键的范围不限于字符串，各种类型的值（包括对象）都可以当作键。Map 也实现了 iterator 接口，所以可以使用 `...` 和 `for...of` 进行遍历。

Map 的属性和方法：

- size：返回 Map 的元素个数
- set：增加一个新元素，返回当前 map
- get：返回键名对应的键值
- has：检测 map 中是否包含某个元素，返回 boolean 值
- clear：清空 map

### 2.16 class 类

ES6 提供了更接近传统语言的写法，引入了 Class （类）这个概念，作为对象的模板。通过 class 关键字，可以定义类。基本上，ES6 的 class 可以看作只是一个语法糖，它的绝大部分功能，ES5 都可以做到，新的 class 写法只是让对象原型的写法更加清晰、更像面向对象编程的语法而已。
知识点：

- class 声明类
- constructor 定义构造函数初始化
- extends 继承父类
- super 调用父级构造方法
- static 定义静态方法和属性
- 父类方法可以重写
- get/set

### 2.17 数值扩展

- Number.EPSILON：Number 的最小精度
- Number.isFinite：检测是否为有限数
- Number.isNaN：检测是否为 NaN
- Number.parseInt：转为整数
- Number.parseFloat：转为浮点数
- Number.isInteger：检测是否为整数
- Math.trunc：去除数值小数部分
- Math.sign：判断是正数、0、负数

- 二进制（0b）、八进制（0o）、十六进制（0x）

### 2.18 对象方法扩展

- Object.is：判断两个值是否完全相等
- Object.assign：对象合并
- Object.setPrototypeOf：设置原型对象
- Object.getPrototypeOf：获取原型对象

### 2.19 模块化

模块化是指将一个大的程序文件，拆分成许多小的文件，然后将小文件组合起来。

模块化的优势有以下几点：

1. 防止命名冲突
2. 代码复用

3. 高维护性

ES6 之前的模块化规范有：

- CommonJS：Node.js、 Browserify
- AMD：RequireJS
- CMD：seaJS

**ES6 语法：**

模块功能主要由两个命令构成：export 和 import

- export 命令用于规定模块的对外接口
  - `export` 分别暴露
  - `export {}` 统一暴露
  - `export default` 默认暴露
- import 命令用于输入其他模块提供的功能

  - `import * as m from ''` 通用的导入方式
  - `import {} from ''` 解构赋值形式
  - `import m from ''` 只能针对默认暴露

- as 作为 import 别名，可以解决变量冲突
  - `import { m as n } from ''`
  - `import { default as df } from ''` 导入默认暴露的模块

通过 `<script>` 标签引入 ES6 模块化需要添加 `type="module"`

## 3 ECMAScript 2016

### 3.1 Array.prototype.includes

`includes` 方法用于检测数组中是否包含某个元素，返回布尔类型值

### 3.2 指数操作符

在 ES7 中引入指数运算符 `**` ，用来实现幂运算，功能与 Math.pow 结果相同。

## 4 ECMAScript 2017

### 4.1 async / await

**async 函数：**

1. async 函数的返回值为 promise 对象。
2. promise 对象结果由 async 函数执行的返回值决定

**await 表达式：**

1. await 必须写在 async 函数中
2. await 右边一般是 promise 对象
3. await 的返回值是 promise 成功的值
4. 使用 try/catch 可以捕获 promise 失败的值

### 4.2 对象方法扩展

- Object.values：返回一个给定对象的所有可枚举属性值的数组

- Object.entries：返回一个给定对象自身可遍历属性 [key, value] 的数组

- Object.getOwnPropertyDescriptors：该方法返回指定对象所有自身属性的描述对象

## 5 ECMAScript 2018

### 5.1 扩展运算符

rest 参数与 spread 扩展运算符在 ES6 中已经引入，不过 ES6 中只针对于数组，在 ES9 中为对象提供了像数组一样的 rest 参数和扩展运算符。

```javascript
function connect({ host, port, ...user }) {
  console.log(host)
  console.log(port)
  console.log(user.username)
  console.log(user.password)
}
connect({
  host: '127.0.0.1'
  port: 3306
  username: 'root'
  password: 'root'
})
```

### 5.2 正则扩展

- 命名捕获分组

  ```javascript
  const str = '<a href="http://www.bilibili.com">哔哩哔哩</a>'

  // 提取 url 和 innerText
  // const reg = /<a href="(.*)">(.*)<\/a>/
  const reg = /<a href="(?<url>.*)">(?<text>.*)<\/a>/

  // 执行
  const res = reg.exec(str)

  // console.log(res[1])
  // console.log(res[2])
  console.log(res.groups.url)
  console.log(res.groups.text)
  ```

- 反向断言

  ```javascript
  cosnt str = 'JS5555666778你好吗567哈哈哈'

  // 正向断言
  // const reg = /\d+(?=哈)/
  // 反向断言
  const reg = /(?<=吗)\d+/

  const res = reg.exec(str)

  console.log(res)
  ```

- dotAll 模式

  `.` 元字符，`/s` 模式下可以匹配除换行符以外的任意单个字符

  ```javascript
  const str = `
  	<ul>
  		<li>
  			<a>JavaScript 基础教程</a>
  			<p>上传时间：2019-07-10</p>
  		</li>
  		<li>
  			<a>Vue.js 面试知识点</a>
  			<p>上传时间：2020-01-16</p>
  		</li>
  	</ul>`

  // const reg = /<li>\s+<a>(.*?)<\/a>\s+<p>(.*?)<\/p>/g
  const reg = /<li>.*?<a>(.*?)<\/a>.*?<p>(.*?)<\/p>/gs

  let res
  while ((res = reg.exec(str))) {
    console.log(res)
  }
  ```

## 6 ESMAScript 2019

### 6.1 对象方法扩展

- Object.fromEntries：将把键值对列表（二维数组、map）转换为一个对象。

  ```javascript
  const arr = [
    ['name', 'naruto'],
    ['families', ['hinata', 'boruto', 'himawari']]
  ]

  console.log(Object.fromEntries(arr))
  ```

### 6.2 字符串扩展方法

- String.prototype.trimStart()：清除字符串右侧空白
- String.prototype.trimEnd()：清除字符串左侧空白

### 6.3 数组方法扩展

- Array.prototype.flat()：按照一个可指定的深度递归遍历数组，并将所有元素与遍历到的子数组中的元素合并为一个新数组返回。

  ```javascript
  const arr1 = [1, 2, [3, 4]]
  arr1.flat() // [1, 2, 3, 4]

  const arr2 = [1, 2, [3, 4, [5, 6]]]
  arr2.flat() // [1, 2, 3, 4, [5, 6]]

  const arr3 = [1, 2, [3, 4, [5, 6]]]
  arr3.flat(2) // [1, 2, 3, 4, 5, 6]

  // 使用 Infinity，可展开任意深度的嵌套数组
  const arr4 = [1, 2, [3, 4, [5, 6, [7, 8, [9, 10]]]]]
  arr4.flat(Infinity) // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  ```

- Array.prototype.flatMap()：方法首先使用映射函数映射每个元素，然后将结果压缩成一个新数组。它与 map 连着深度值为 1 的 [flat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flat) 几乎相同，但 `flatMap` 通常在合并成一种方法的效率稍微高一些。

  ```javascript
  const arr1 = [1, 2, 3, 4]

  arr1.map((x) => [x * 2]) // [[2], [4], [6], [8]]

  arr1.flatMap((x) => [x * 2]) // [2, 4, 6, 8]

  arr1.flatMap((x) => [[x * 2]]) // [[2], [4], [6], [8]]
  ```

### 6.4 Symbol 扩展

- Symbol.prototype.description()：返回 symbol 对象的可选描述的字符串。

## 7 ECMAScrpit 2020

### 7.1 class 私有属性

```javascript
class Person {
  // 共有属性
  name
  // 私有属性
  #age
  #weight
  constructor(name, age, weight) {
    this.name = name
    this.#age = age
    this.#weight = weight
  }
  get age() {
    return this.#age
  }
}

const p = new Person('zhangsan', 18, '62kg')

console.log(p.name) // zhangsan
// console.log(p.#age)	// Uncaught SyntaxError: Private field '#age' must be declared in an enclosing class
console.log(p.age)
```

### 7.2 Promise 对象方法

- Promise.allSettled()：方法返回一个所有给定的 promise 结果的 promise，并带有一个对象数组，每个对象表示对应的 promise 结果。

### 7.3 字符串方法扩展

- String.prototype.matchAll()：返回一个包含所有匹配正则表达式的结果及分组捕获组的迭代器。

  ```javascript
  const str = `
  	<ul>
  		<li>
  			<a>JavaScript 基础教程</a>
  			<p>上传时间：2019-07-10</p>
  		</li>
  		<li>
  			<a>Vue.js 面试知识点</a>
  			<p>上传时间：2020-01-16</p>
  		</li>
  	</ul>`
  
  const reg = /<li>.*?<a>(.*?)<\/a>.*?<p>(.*?)<\/p>/gs
  
  const res = str.matchAll(reg)
  
  for (const v of res) {
    console.log(v)
  }
  ```

### 7.4 可选链操作符

```javascript
function main(config) {
  // const dbHost = config && config.db && config.db.host || undefined
  const dbHost = config?.db?.host
  console.log(dbHost)
}

main({
  db: { host: '172.0.0.1', port: 3306 }
})
// 172.0.0.1

main()	// undefined
```

### 7.5 动态导入

实现模块的按需加载

```javascript
// index.js
const btn = document.querySelector('#btn')

btn.onclick = function () {
  import('./module.js').then(module => {
    module.greeting()
  })
}

// module.js
export function greeting () {
  alert('Hello!')
}
```

### 7.6 BigInt

```javascript
// 大整形
let num = 123n
console.log(num, typeof num)	// 123n "bigint"

// 函数
let n = 456
let bign = BigInt(n)
console.log(bign)	// 456n

// 大数值运算
let max = Number.MAX_SAFE_INTEGER	// 9007199254740991
console.log(max + 1)	// 9007199254740992
console.log(max + 2)	// 9007199254740992
console.log(BigInt(max) + BigInt(1))	// 9007199254740992n
console.log(BigInt(max) + BigInt(2))	// 9007199254740993n
```

### 7.7 globalThis

globalThis 始终指向全局对象。