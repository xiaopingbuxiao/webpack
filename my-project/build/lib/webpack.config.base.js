const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const glob = require('glob')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')


const projectRoot = process.cwd()

console.log(path.join(projectRoot, './src'))

const setMPA = () => {
  const entry = {}
  const htmlWebpackPlugins = []

  const entryFiles = glob.sync(path.join(projectRoot, './src/page/*/index.js'))
  Object.keys(entryFiles).forEach((index) => {
    const entryFile = entryFiles[index]
    // const regx = /page\/(.*)\/index.js/
    const match = entryFile.match(/page\/(.*)\/index.js/)
    const pageName = match && match[1]
    entry[pageName] = entryFile
    htmlWebpackPlugins.push(
      new HtmlWebpackPlugin({
        title: 'My App',
        template: path.join(projectRoot, `./templateHtml/${pageName}.html`) || null,
        filename: `${pageName}.html`,
        inject: true,
        chunks: ['app', pageName],
        minify: {
          html5: true,
          collapseWhitespace: true,
          preserveLineBreaks: false,
          minifyCSS: true,
          minifyJS: true,
          removeComments: false,
        },
      })
    )
  })
  return { entry, htmlWebpackPlugins }

}

const { entry, htmlWebpackPlugins } = setMPA()





module.exports = {
  entry: entry,
  output: {
    path: path.join(projectRoot, './dist'),
    filename: 'js/[name]_[chunkhash:8].js'
  },
  module: {
    rules: [
      {
        test: /.js$/,
        use: 'babel-loader'
      },
      {
        test: /\.(sass|scss|css)$/,
        use: [
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ]
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10240,
            name: 'images/[name]_[hash:8].[ext]'
          }
        }]
      },
      {
        test: /.(woff|woff2|eot|ttf|otf)$/,
        use: 'url-loader'
      }
    ]
  },
  plugins: [
    new FriendlyErrorsWebpackPlugin(),
    new CleanWebpackPlugin()
  ].concat(htmlWebpackPlugins)
}

