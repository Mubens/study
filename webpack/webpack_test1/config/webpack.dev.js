/**
 * webpack 的入口文件
 */

const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: ['./src/js/index.js', './src/index.html'], // 入口
  output: {
    path: resolve(__dirname, 'dist'), // 输出路劲
    filename: './js/index.js' // 输出的文件名
  },
  mode: 'development', // 开发模式
  // 所有的 loader 都要在 module 对象的 rules 属性中，rules 是一个数组，数组中的每一个对象就是一个 loader
  // 下载后无需引入，直接使用
  module: {
    rules: [
      {
        test: /\.less$/, // 匹配所有的less文件
        use: [
          'style-loader', // 3. 用于在html文档中创建一个style标签, 将样式塞进去
          'css-loader', // 2. 将编译后的css转换成为CommonJS的一个模块
          'less-loader' // 1. 将less编译为css,但不生成单独的css文件，在内存中
        ]
      },
      {
        test: /\.js$/, // 只检测 js 文件
        exclude: /node_modules/, // 排除 node_modules
        enforce: 'pre', // 提前加载使用
        loader: 'eslint-loader' // 语法检查
      },
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
                  corejs: { version: 3 }, // 解决 warn
                  targets: {
                    // 指定兼容性处理哪些浏览器
                    chrome: '58',
                    ie: '9'
                  }
                }
              ]
            ],
            cacheDirectory: true // 开启babel缓存
          }
        }
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 8192, // 8kb -> 8kb 以下的图片会base64处理
            outputPath: 'images/', // 文件本地输出路径
            publicPath: 'images', // 决定图片的路径
            name: '[hash:8].[ext]' // 修改文件名称 [hash:8] hash 值取8位 [ext] 文件扩展名
          }
        }
      },
      {
        test: /\.(html)$/,
        loader: 'html-loader'
      },
      {
        test: /\.(eot|svg|woff|woff2|ttf|mp3|mp4|avi)$/,
        loader: 'file-loader',
        options: {
          outputPath: 'media',
          name: '[hash:8].[ext]'
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html' // 以当前文件为模版创建新的HTML（结构和原来一样，自动引入打包资源）
    })
  ],
  devServer: {
    open: true, // 自动打开浏览器
    compress: true, // 启动 gzip 压缩
    port: 3000 // 端口号
  },
  devtool: 'cheap-module-eval-source-map'
}
