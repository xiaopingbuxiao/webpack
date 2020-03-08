const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const miniCssExtractPlugin = require('mini-css-extract-plugin')
const optimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
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
      chunks: ['commons','React_ReactDOM', `${pageName}`],
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
  optimization: {
    splitChunks: {
      minSize: 0,
      cacheGroups: {
        React_ReactDOM: {
          test: /(react|react-dom)/,
          name: 'React_ReactDOM',
          chunks: 'all'
        },
        commons: {
          name: 'commons',
          chunks: 'all',
          minChunks: 2
        }
      }
    }
  },
  /* entry: {
    index: './src/index.js',
    search: './src/search.js'
  }, */
  entry: entry,
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name]_[chunkhash:8].js'
  },
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader'
      },
      {
        test: /\.(scss|css)$/,
        use: [
          // 'style-loader',
          miniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          {
            loader: 'px2rem-loader',
            options: {
              remUnit: 75, // 750 设计稿
              remPrecesion: 8
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
              name: 'img/[name][hash:8].[ext]'
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new miniCssExtractPlugin({
      filename: '[name][contenthash:8].css',
    }),
    new optimizeCssAssetsWebpackPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano')
    }),
    new CleanWebpackPlugin(),// 默认清楚soutput的目录
  ].concat(htmlWebpackPlugins)
}