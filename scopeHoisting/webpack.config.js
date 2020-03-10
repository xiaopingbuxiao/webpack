const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const webpack = require('webpack')



module.exports = {
  entry: {
    index: './src/index.js',
  },
  output: {
    path: path.join(__dirname, './dist'),
    filename: '[name].js',
    publicPath: '/'
  },
  mode: 'none',
  // mode: 'production',
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader'
      }
    ]
  },
  plugins: [
    // new webpack.HotModuleReplacementPlugin(),
    // new webpack.optimize.ModuleConcatenationPlugin(),
    new htmlWebpackPlugin({
      title: 'scope hoisting',
      template: './index.html',
    }),
    new CleanWebpackPlugin()
  ]
}
