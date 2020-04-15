const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const glob = require('glob')


const setMPA = () => {
  const entry = {}
  const htmlWebpackPlugins = []
  const entryFiles = glob.sync(path.join(__dirname, './src/*/index.js'))
  console.log(entryFiles)

  Object.keys(entryFiles).map(index => {
    console.log()
    const entryFile = entryFiles[index]
    const match = entryFile.match(/src\/(.*)\/index.js/)
    const pageName = match && match[1]
    entry[pageName] = entryFile

    htmlWebpackPlugins.push(new htmlWebpackPlugin({
      template: path.join(__dirname, `./src/${pageName}/index.html`),
      filename: `${pageName}.html`,
      chunks: [`${pageName}`],
      inject: true,
      minify: {
        html5: true,
        collapseWhitespace: true,
        preserveLineBreaks: false,
        minifyCSS: true,
        minifyJS: true,
        removeComments: false
      }
    }))
  })

  return {
    entry,
    htmlWebpackPlugins
  }
}

const { entry, htmlWebpackPlugins } = setMPA();

module.exports = {
  entry:entry,
  output:{
    filename: '[name].js',
    path: path.join(__dirname,'./dist'),
    publicPath:'/'
  },
  mode:'development',
  devtool:'source-map',
  module:{
    rules:[
      {
        test:/\.(js|jsx)$/,
        use:'babel-loader'
      },
      {
        test:/\.(scss|css)$/,
        use:[
          'style-loader',
          // 'css-loader',
          {
            loader:'css-loader',
            options:{
              sourceMap:true
            }
          },
          'sass-loader'
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
  ].concat(htmlWebpackPlugins)
}
