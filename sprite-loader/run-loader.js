const fs = require('fs')
const path = require('path')
const { runLoaders } = require('loader-runner')


runLoaders({
  resource:path.resolve(__dirname,'./loaders/index.css'),
  loaders: [
    {
      loader: path.resolve(__dirname, './loaders/sprite-loader'),
    }
  ],
  readResource: fs.readFile.bind(this)
}, (err, result) => {
  err ? console.log(err) : console.log(result)
})



