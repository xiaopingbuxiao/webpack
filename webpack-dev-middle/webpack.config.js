const htmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const path = require('path')

module.exports={
  entry:['./src/index.js'],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
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
          'sass-loader'
        ]
      }
    ]
  },
  plugins:[
    new htmlWebpackPlugin({
      title:'webpack-dev-middleware',
      template:'./index.html'
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
}

