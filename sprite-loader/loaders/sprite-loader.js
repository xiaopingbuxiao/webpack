const fs = require('fs')
const path = require('path')
const spritesmith = require('spritesmith')


module.exports = function (source) {
  const callback = this.async()
  const imgs = source.match(/url\((\S*)\?_sprite/g)
  const matchedImgs = []
  for (let i = 0; i < imgs.length; i++) {
    const img = imgs[i].match(/url\((\S*)\?_sprite/)[1]
    matchedImgs.push(path.resolve(__dirname, img.slice(1)))
  }
  console.log(matchedImgs)

  spritesmith.run({
    src: matchedImgs
  }, (err, result) => {
    console.log(err)
    console.log(result, 'sss')
    fs.writeFileSync(path.join(process.cwd(), './dist/sprite.png'), result.image) // 这里正常情况下应该是使用this.emitFile方法来生成文件
    source = source.replace(/url\((\S*)\?_sprite/g, (match) => {
      return `url("dist/sprite.png")`
    })
    callback(null, source)
  })
}

