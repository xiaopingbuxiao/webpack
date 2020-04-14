
if (typeof window === 'undefined') {
  global.window = {}
}
const express = require('express')

const { renderToString } = require('react-dom/server')
const SSR = require('../dist/search-server.js')


console.log(renderToString(SSR),'111')
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
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
  </head>
  <body>
    <div id="app">
      ${str}
    </div>
  </body>
  </html>
  
  `
}

