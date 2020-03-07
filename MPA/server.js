

const webpack = require('webpack');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackDevMiddleware = require('webpack-dev-middleware');

const config = require('./webpack.config.dev.js')
const express = require('express');
const app = express();

Object.keys(config.entry).forEach(item=>{
  config.entry[item] = ['webpack-hot-middleware/client'].concat(config.entry[item])
})

// config.entry = ['webpack-hot-middleware/client'].concat(config.entry);

const compiler = webpack(config);

const devMiddelware = webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
  hot: true,
  noInfo: true,
  stats: {
    colors: true
  }
})

app.use(devMiddelware)
app.use(webpackHotMiddleware(compiler))

app.listen(3000, () => {
  console.log('server listening on port 3000........🍎🍎🍎')
});





