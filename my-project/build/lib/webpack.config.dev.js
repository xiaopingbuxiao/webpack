const webpackMerge = require('webpack-merge')

const baseConfig = require('./webpack.config.base.js')
// baseConfig.module.rules[1].use.unshift('style-loader')

const devConfig = {
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.(sass|scss|css)$/,  // webpack-merge 合并之后如果合并出来loader重复调用 会报错
        use: [
          'style-loader',
        ]
      },
    ]
  }
}
module.exports = webpackMerge(devConfig, baseConfig)



