### 1. 了解 Webpack 相关

#### 1.1 什么是 webpack

- Webpack 是一种前端资源构建工具，一个静态模块打包器(module bundler)。

- 在 Webpack 看来，前端的所有资源文( js/json/css/img/less/...)都会作为模块处理

- 它将根据模块的依赖关系进行静态分析，生成对应的静态资源
- 五个核心概念
  - Entry：入口起点 (entry point) 指示 webpack 应该使用哪个文件，来作为构建其内部依赖图的开始。
  
  - Output：output 属性告诉 webpack 在哪里输出它所创建的 bundles，以及如何命名这些文件，默认值为 ./dist.
  
  - Loader: loader 让 webpack 能够去处理那些非 JavaScript 文件 ( webpack 自身只能解析 JavaScript、json ) 。
  
  - Plugins：插件则可以用于执行范围更广的任务。插件的范围包括，从打包优化和压缩，一直到重新定义环境中的变量等。
  
  - Mode：模式，有生产模式 production 和开发模式 development
  
    | 选项        | 描述                                                         | 特点                       |
    | ----------- | ------------------------------------------------------------ | -------------------------- |
    | development | 会将 `process.env.NODE_ENV` 的值设为 `development`  <br />启用 `NamedChunksPlugin` 和 `NamedModulesPlugin` | 能让代码本地调试运行环境   |
    | production  | 会将 `process.env.NODE_ENV` 的值设为 `production` <br />启用`FlagDependencyUsagePlugin`，<br />`FlagIncludedChunksPlugin`，<br />`ModuleConcatennationPlugin`,<br />`NoEmitOnErrorsPlugin`，<br />`OccurrenceOrderPlugin`，<br />`SideEffectsFlagPlugin`， <br />`UglifyJsPlugin` | 能让代码优化上线运行的环境 |

#### 1.2 理解 Loader

- Webpack 本身只能加载 JS/JSON 模块，如果要加载其他类型的文件(模块)，就需要使用对应的 loader 进行转换/加载
- Loader 本身也是运行在 node. js 环境中的 JavaScript 模块
- 它本身是一个函数，接受源文件作为参数，返回转换的结果
- loader 一般以 xxx-loader 的方式命名，xxx 代表了这个 loader 要做的转换功能，比如 json-loader

#### 1.3 理解Plugins

- 插件可以完成一些 loader 不能完成的功能。
- 插件的使用一般是在 webpack 的配置信息 plugins 选项中指定。

#### 1.4 配置文件(默认)

- webpack.config.js：是一个 node 模块， 返回一个 json 格式的配置信息对象

### 2. 开启项目

#### 2.1 初始化项目

- 生成 package.json 文件

  - npm init -y
  
  ```json
  {
  	"name": 'app',
    "version": "1.0.0"
  }
  ```

#### 2.2 安装 webpack

- npm install webpack webpack-cli -g	// 全局安装，作为指令使用
- npm install webpack webpack-cli -D	// 本地安装，作为本地依赖使用

### 3. 编译打包应用

- 创建js文件
  - src/js/app.js
  - src/js/module1.js
  - src/js/module2.js
  - src/js/module3.js

- 创建 json 文件
  - src/json/data.json
- 创建主页面
  - src/index.html
- 运行指令
  - 开发配置指令：webpack src/js/app.js -o dist/js/app.js --mode development
    - 功能：webpack 能够编译打包 js 和 json 文件，并且能将 es6 的模块化语法转换成浏览器能识别的语法
  - 生产配置指令：webpack src/js/app.js -o dist/js/app.js --mode production
    - 功能：在开发配置功能上加上一个压缩代码
- 结论：
  - webpack 能够编译打包 js 和 json 文件
  - 能将 es6 的模块化语法转换成浏览器能识别的语法
  - 能压缩代码
- 缺点：
  - 不能编译打包 css、img 等文件
  - 不能将 js 的 es6 基本语法转化为 es5 以下语法
- 改善：使用 webpack 配置文件解决，自定义功能

### 4. 使用 webpack 配置文件

- 目的：在项目根目录定义配置文件，通过自定义配置文件，还原以上功能

- 文件名称：webpack.config.js

- 文件内容：

  ```js
  const { resolve } = require('path')
  
  module.exports = {
    entry: './src/js/app.js', // 入口
    /* 完整写法
    	entry: {
    		main: './src/js/app.js'
    	}
    */
    output: {
      path: resolve(__dirname, 'dist'), // 输出路劲
      filename: './js/bundle.js', // 输出的文件名
    },
    mode: 'development'
  }
  ```

- 运行指令：webpack

### 5. 打包 less 资源

- 概述：less 文件 webpack 不能解析，需要借助 loader 编译解析

- 创建 less 文件

  - src/less/style.less

- 入口 app.js 文件

  - 引入 less 资源

- 安装 loader

  - npm install style-loader css-loader less-loader less --save-dev

- 配置 loader

  ```js
  {
    test: /\.less$/, // 匹配所有的less文件
    use: [
      'style-loader', // 3. 用于在html文档中创建一个style标签, 将样式塞进去
      'css-loader', // 2. 将编译后的css转换成为CommonJS的一个模块
      'less-loader' // 1. 将less编译为css,但不生成单独的css文件，在内存中
    ]
  }
  ```

- 运行指令：webpack

### 6. js 语法检查

- 概述：对 js 基本语法错误/隐患，进行提前检查

- 安装 loader

  - npm install eslint-loader eslint --save-dev

  > 备注1：在：eslint.org 网站 -> userGuide -> Configuring ESLint 查看如何配置
  >
  > 备注2：在：eslint.org 网站 -> userGuide -> Rules 查看所有规则

- 配置 loader

  ```js
  {
    test: /\.js$/, // 只检测 js 文件
    exclude: /node_modules/, // 排除 node_modules
    enforce: 'pre', // 提前加载使用
    loader: 'eslint-loader'
  }
  ```

- 修改 package.json （需要删除注释才能生效）

  ```json
  "eslintConfig": {
    "parserOptions": {
      "ecmaVersion": 6,
      "sourceType": "module"
    },
    "env": {
      "browser": true,
      "node": true
    },
    "globals": {
      "$": "readonly"
    },
    "rules": {
      "no-console": 0,
      "eqeqeq": 2,
      "no-alert": 2
    },
    "extends": "eslint:recommended"
  }
  ```

- 运行指令：webpack

### 7. js 语法转换

- 概述：将浏览器不能识别的新语法转换成原来识别的旧语法，做浏览器兼容性处理

- 安装 loader

- npm install babel-loader @babel/core @babel/preset-env --save-dev

- 配置 loader

  ```js
  {
    test: /\.js$/,
    exclude: /node_modules/,
    use: {
    	loader: 'babel-loader',
    	options: {
    		presets: [ '@babel/preset-env' ]
    	}
    }
  }
  ```

- 运行指令：webpack

### 8. js 兼容性处理

#### 8.1 使用经典的 polyfill

- 安装包

  - npm i @babel/polyfill -D

- 使用：app.js 入口文件

  ```js
  import '@babel/polyfill'	// 包含 es6 的高级语法转换
  ```

- 优点：解决 babel 只能转换部分低级语法的问题(如：let/const/解构赋值...)，引入 polyfilI 可以转换高级语法(如：Promise...)
- 缺点：将所有高级语法都进行了转换，导致打包文件变大，但实际上可能只使用一部分
- 解决：需要按需加载 (使用了什么高级语法，就转换什么，其他的不转换)

#### 8.2 借助 core-js 按需引入

- 安装包

  - npm i core-js -D

- 配置 loader

  ```js
  {
    test: /\.js$/,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader', // es6 -> es5
      options: {
        presets: [
          [
            '@babel/preset-env',
            {
              useBuiltIns: 'usage', // 按需引入需要使用的 polyfill
              corejs: { version: 3 },	// 解决 warn
              targets: { chrome: '58', ie: '9' } // 指定兼容性处理哪些浏览器
            }
          ]
        ],
        cacheDirectory: true  // 开启babel缓存
      }
    }
  }
  ```



### 9. 打包样式文件中的图片资源

- 概述：图片文件 webpack 不能解析，需要借助 loader 编译解析

- 添加2张图片:

  - 小图，小于8kb：src/images/1.png
  - 大图，大于8kb：src/images/2.jpg

- 在 less 文件中通过背景图的方式引入图片

- 安装 loader

  - npm i file-loader url-loader -D

  > 补充：url-loader 是对象 file-loader 的上层封装，使用时需配合 file-loader 使用。

- 配置 loader

  ```js
  {
    test: /\.(png|jpg|gif)$/,
    use: {
      loader: 'url-loader',
      options: {
        limit: 8192,  // 8kb -> 8kb 以下的图片会base64处理
        outputPath: '/images', // 文件放置的路径
        publicPath: '../dist/images', // 决定图片的路径
        name: '[hash:8].[ext]'  // 修改文件名称 [hash:8] hash 值取8位 [ext] 文件扩展名
      }
    }
  }
  ```

### 10. 打包 html 文件

- 概述：html 文件 webpack 不能解析，需要借助插件编译解析

- 添加 html 文件

  - src/index.html
  - 注意不要在 html 中引入任何 css 和 js 文件

- 安装 Plugin

  - npm i html-webpack-plugin -D

- 在 webpack.config.js 中引入插件 (插件都需要手动引入，而 loader 会自动加载)

  ```js
  const HtmlWebpackPlugin = require('html-webpack-plugin')
  ```

- 配置插件 Plugins

  ```js
  pulgins: [
  	new HtmlWebpackPlugin({
  		template: './src/index.html'	// 以此文件为模版创建新的HTML（结构和原来一样，自动引入打包资源）
  	})
  ]
  ```

- 运行指令：webpack

### 11. 打包 html 文件中的图片

- 概述：html 中的图片 url-loader 没法处理，它只能处理 js 中引入的图片/样式中图片，不能处理 html 中 img 标签，需要引入其他 html-loader 处理。
- 添加图片
  
- 在 src/index.html 添加两个 img 标签
  
- 安装 loader

  - npm install html-loader --save-dev

- 配置 loader

  ```js
  {
    test: /\.(html)$/,
    loader: 'html-loader'
  }
  ```

### 12. 打包其他资源

- 概述：其他资源 webpack 不能解析，需要借助 loader 编译解析

- 添加字体文件
  
  - src/css/iconfont.less
  - src/font/iconfont.eot
  - src/font/iconfont.svg
  - src/font/iconfont.ttf
- src/font/iconfont.woff
  
  - src/font/iconfqnt.woff2
  
- 修改 iconfont.less

  ```css
  @font-face {
    font-family: 'iconfont';
    src: url('../font/iconfont.eot?...');
    src: url('../font/iconfont.eot?...')format('embedded-opentype'),
    url('data:application/x-font-woff2;charset=utf-8;base64,...') format('woff2'),
    url('../font/iconfont.woff?...') format('woff'),
    url('../font/iconfont.ttf?...') format('truetype'),
    url('../font/iconfont.svg?...') format('svg');
  }
  ```

- 修改 html，添加字体

- 配置 loader

  ```js
  {
    test: /\.(eot|svg|woff|woff2|ttf|mp3|mp4|avi)$/,
    loader: 'file-loader',
    options: {
      outputPath: 'media',
      name: '[hash:8].[ext]'
    }
  }
  ```

### 13. 自动编译打包（全部刷新）

- 安装 loader

  - npm install webpack-dev-server --save-dev

- 详细配置见官网：指南 -> 开发环境 -> 使用 webpack-dev-server

- 修改 webpack 配置对象 (注意和 loader 同级)

  ```js
  devServer: {
    open: true,	// 自动打开浏览器
    compress: true,	// 启动 gzip 压缩
    port: 3000	// 端口号
  }
  ```

- 修改 url-loader 部分配置
  - 因为构建工具以 dist 为根目录，不用再找 dist 了
  - `publicPath: '../dist/images/'` --> `publicPath: 'images/')`
- 修改 package. json 中 scripts 指令
  
  - `"start": "webpack-dev-server"`

### 14. 热模替换功能（局部刷新）

- 概述：热模块替换(HMR) 是 webpack 提供的最有用的功能之一。 它允许在运行时更新所有类型的模块，而无需完全刷新(只更新变化的模块，不变的模块不更新)

- 详细配置见官网：指南 -> 模块热替换

- 修改 devServer 配置

  ```js
  devServer: {
    open: true,	// 自动打开浏览器
    compress: true,	// 启动 gzip 压缩
    port: 3000,	// 端口号
    hot: true	// 开启热模替换功能
  }
  ```

- html 文件无法自动更新，需要增加一个入口

  ```js
  entry: [ './src/js/index.js', './src/index.html' ]
  ```

### 15. devtool

- 概述：一种将压缩/编译文件中的代码映射回源文件中的原始位置的技术，让我们调试代码不在困难
- 详细配置见官网：配置 -> devtool
- 介绍
  - cheap 只保留行，编译速度快
  - eval webpack 生成的代码(每个模块彼此分开,并使用模块名称进行注释) , 编译速度快
  - inline 以 base64 方式将 source-map 嵌入到代码中，缺点造成编译后代码体积很大
- 推荐使用:
  - 开发环境：cheap-module-eval-source-map
  - 生产环境：cheap-module-source-map

> 以上就是 webpack 开发环境的配置，可以在内存中自动打包所有类型文件并有自动编译运行、热更新等功能。

### 16. 准备生产环境

- 创建文件夹 config，将webpack.config.js 复制两份

  - ./config/webpack.dev.js
  - .config/webpack.prod.js

- 修改 webpack.prod.js 配置，删除 webpack-dev-server 配置

  ```js
  module.exports = {
    output: {
      ...
      path: resolve(__dirname, '../dist'), // 文件输出路径
      filename: './js/index.js', // 文件输出名称
      publicPath: '/' // 所有输出资源在引入时的公共路径，若loader中也指定了publicPath，会以loader的为准
    },
    mode: 'production',
    module: {
      rules: [ 
      	{
          test: /\.(png|jpg|gif)$/,
          use: {
            loader: 'url-loader',
            options: {
              limit: 8192,
              outputPath: '/images',
              publicPath: '/images',
              name: '[hash:8].[ext]'
            }
          }
        }
      ]
    },
    plugins: [ ... ],
    devtool: 'cheap-module-source-map'
  }
  ```

- 修改 package.json 的指令
  - `"start": "webpack-dev-server --config ./config/webpack.dev.js"`
  - `"dev": "webpack-dev-server --config ./config/webpack.dev.js"`
  - `"build": "webpack --config ./config/webpack.prod.js"`

- 开发环境指令
  - npm start
  - npm run dev

- 生产环境指令

  - npm run build

  - 注意：生产环境代码需要部署到服务器上才能运行 (serve 这个库能帮助我们快速搭建一个静态资源服务器)
    - npm i serve -g
    - serve dist -p 5000

### 17. 清空打包文件目录

- 概述：每次打包生成力文件，都需要手动删除，引入插件帮助我们自动删除上一有的文件
- 安装插件
  - npm install clean-webpack-plugin --save-dev
- 引入插件
  - const { CleanWebpackPlugin } = require('clean-webpack-plugin')	// 注意要解构赋值! ! !
- 配置插件
  - new CleanWebpackPlugin()	// 自动清除output.path目录下的文件
- 运行指令: npm run build

### 18. 提取 css 为单独文件

- 安装插件

  - npm install mini-css-extract-plugin --save-dev

- 引入插件

  - const MiniCssExtractPlugin = require('mini-css-extract-plugin')

- 配置 loader

  ```js
  {
    test: /\.less$/,
    use: [
      MiniCssExtractPlugin.loader,
      'css-loader',
      'less-loader'
    ]
  }
  ```

- 配置插件

  ```js
  new MiniCssExtractPlugin({
    filename: 'css/[name].css'
  })
  ```

- 运行指令
  - npm run build
  - serve dist -p 5000

### 19. 添加 css 兼容

- 安装 loader
  
- npm i postcss-loader postcss-flexbugs-fixes postcss-preset-env postcss-normalize autoprefixer -D
  
- 配置 loader

  ```js
  {
    test: /\.less$/,
    use: [
      MiniCssExtractPlugin.loader,
      'css-loader',
      {
        loader: 'postcss-loader',
        options: {
          ident: 'postcss',
          plugins: () => [
            require('postcss-flexbugs-fixes'),
            require('postcss-preset-env')({
              autoprefixer: { flexbox: 'no-2009' },
              stage: 3
            }),
            require('postcss-normalize')()
          ],
          sourceMap: true
        }
      },
      'less-loader'
    ]
  }
  ```

- 添加配置文件：.browserslistrc

  ```
  last 1 version
  > 1%
  IE 9 # sorry
  ```

运行指令

- npm run build
- serve dist -p 5000

### 20. 压缩 css

- 安装插件

  - npm install optimize-css-assets-webpack-plugin --save-dev

- 引入插件

  - const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')

- 配置插件

  ```js
  new OptimizeCssAssetsPlugin({
    cssProcessorPluginOptions: {
      presets: ['default', { discardComments: { removeAll: true } }]
    },
    cssProcessorOptions: {
      map: {
        inline: false,
        annotation: true
      }
    }
  })
  ```

### 21. 压缩 html

- 修改插件配置

  ```js
  new HtmlWebpackPlugin({
    template: './src/index.html',
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeRedundantAttributes: true,
      useShortDoctype: true,
      removeEmptyAttributes: true,
      removeStyleLinkTypeAttributes: true,
      keepClosingSlash: true,
      minifyJS: true,
      minifyCSS: true,
      minifyURLs: true
    }
  })
  ```