const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

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
          // 'style-loader',
          MiniCssExtractPlugin.loader,
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
            limit: 10240,
            name:'img/[name][hash:8].[ext]'
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
    filename: '[name][chunkhash:8].js'
  },
  mode: 'production',
  plugins: [
    // new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
      filename: `[name][contenthash:8].css`
    }),
    new OptimizeCssAssetsWebpackPlugin({
      assetNameRegExp:/\.css$/,
      cssProcessor:require('cssnano')
    }),
    new HtmlWebpackPlugin({ 
      template:path.join(__dirname,'./search.html'),//模版中可以使用ejs语法
      filename:'search.html',
      chunks:['search'], // 指定html使用那些chunk
      inject:true,//自动将使用的chunk注入模版
      minify:{
        html5:true,
        collapseWhitespace:true,
        preserveLineBreaks:false,
        minifyCSS:true,
        minifyJS:true,
        removeComments:false
      }
    }),
    new HtmlWebpackPlugin({ 
      template:path.join(__dirname,'./index.html'),//模版中可以使用ejs语法
      filename:'index.html',
      chunks:['index'], // 指定html使用那些chunk
      inject:true,//自动将使用的chunk注入模版
      minify:{
        html5:true,
        collapseWhitespace:true,
        preserveLineBreaks:false,
        minifyCSS:true,
        minifyJS:true,
        removeComments:false
      }
    })
  ],
  devServer: {
    contentBase: './dist',
    hot: true
  }
}