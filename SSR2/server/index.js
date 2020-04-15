
if (typeof window === 'undefined') {
  global.window = {}
}
const fs = require('fs')
const path = require('path')
const express = require('express')

const { renderToString } = require('react-dom/server')
const SSR = require('../dist/search-server.js')

const template = fs.readFileSync(path.join(__dirname, '../dist/search.html'), 'utf-8')

const data = {
  message: 'hello world',
  success: true
}

console.log(renderToString(SSR), '111')
const server = (port) => {

  const app = express()
  app.use(express.static('./dist'))
  app.get('/search', (req, res) => {
    res.send(renderMarkup(renderToString(SSR)))
  })
  app.listen(port, function () {
    console.log('server is running.......🍎🍎🍎')
  })
}

server(3000)

const renderMarkup = (str) => {
  return template.replace('<!-- HTML_PLACEHOLDER -->', str)
    .replace('<!--INITIAL_DATA_PLACEHOLDER-->', `<script>window.INITIAL_DATA_PLACEHOLDER=${JSON.stringify(data)}</script>`)
}

