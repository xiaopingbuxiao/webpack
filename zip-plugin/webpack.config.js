const path = require('path')

const MyPlugin = require('./plugin/zip-plugin')


module.exports = {

  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'main.js'
  },
  plugins: [
    new MyPlugin({
      filename: 'my plugin'
    })
  ]
}
