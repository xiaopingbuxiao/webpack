const { RawSource } = require('webpack-sources')




module.exports = class MyPlugin {

  constructor(options) {
    this.options = options
  }
  apply(compiler) {
    console.log('MyPlugin is executed!')
    console.log('MyPlugin options', this.options)

    const { name } = this.options
    compiler.plugin('emit', (compilation, cb) => {
      compilation.assets[name] = new RawSource('demo')
    })
  }
}