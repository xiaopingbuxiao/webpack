const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const app = express();
const config = require('./webpack.config.js');


config.entry = ['webpack-hot-middleware/client'].concat(config.entry);
const compiler = webpack(config);


const devMiddleware = webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
  hot: true,
  noInfo: true,
  stats: {
    colors: true
  }
});

app.use(devMiddleware);

app.use(webpackHotMiddleware(compiler));
// 将文件 serve 到 port 3000。
app.listen(3000, function () {
  console.log('Example app listening on port 3000!\n');
});