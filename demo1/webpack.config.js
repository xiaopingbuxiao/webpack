const path = require('path')
const webpack = require('webpack')
module.exports = {
  entry: {
    index: './src/index.js',
    search: './src/serarch.js'
  },
  // watch: true,
  // watchOptions: {
  //   //默认为空，不监听的文件或者文件夹，支持正则匹配
  //   ignored: /node_modules/,
  //   //监听到变化发生后会等300ms再去执行，默认300ms
  //   aggregateTimeout: 300,
  //   //判断文件是否发生变化是通过不停询问系统指定文件有没有变化实现的，默认每秒问1000次 
  //   poll: 1000
  // },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader'
      },
      {
        test: /\.(scss|css)$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      // {
      //   test: /\.(png|jpg|jgeg|git)$/,
      //   use: 'file-loader'
      // },
      {
        test: /\.(png|jpg|jgeg|git)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10240
          }
        }]
      },
      {
        test: /.(woff|woff2|eot|ttf|otf)$/,
        use: 'file-loader'
      }
    ]
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js'
  },
  mode: 'development',
  plugins:[
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer:{
    contentBase:'./dist',
    hot:true
  }
}