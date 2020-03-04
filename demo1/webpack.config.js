const path = require('path')

module.exports = {
  entry: {
    index:'./src/index.js',
    search:'./src/serarch.js'
  },
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
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js'
  },
  mode:'production'
}