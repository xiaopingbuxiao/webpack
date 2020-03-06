const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

module.exports = {
  entry:{
    index:'./src/index.js'
  },
  output:{
    filename: '[name].js',
    path: path.join(__dirname,'./dist'),
    publicPath:'/'
  },
  mode:'development',
  module:{
    rules:[
      {
        test:/\.js$/,
        use:'babel-loader'
      },
      {
        test:/\.(scss|css)$/,
        use:[
          'style-loader',
          'css-loader',
          'sass-loader',
          {
            loader:'px2rem-loader',
            options:{
              remUnit:75,
              remPrecesion:8
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10240,
            },
          },
        ],
      },
    ],
  },
  plugins:[
    new webpack.HotModuleReplacementPlugin(),
    new htmlWebpackPlugin({
      title:'hellow webpack',
      template:'./index.html',
      // chunks:['index']
    })
  ]
}
