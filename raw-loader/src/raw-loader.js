const loaderUtils = require('loader-utils')
const fs = require('fs')
const path = require('path')

module.exports = function (source) {
  const { name } = loaderUtils.getOptions(this) // 参数获取
  console.log(name)

  const callback = this.async()


  const json = JSON.stringify(source)
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029')
    .replace('foo', 'hello world')

  fs.readFile(path.join(__dirname, './async.txt'), 'utf-8', function (err, data) {
    console.log(data)
    if (err) {
      callback(err, '')
    }
    callback(null, data)
  })

 


  /* 同步loader的抛出错误 */
  // throw new Error('Error') // 抛出异常第一种方式 第二种方式 通过 this.callback
  // this.callback(new Error('raw-loader error'),json)

  /* 同步loader 的返回结果 同时也可以通过 this.callback(null,json,1,2,3,) 来传递多个参数 */
  // return `export default ${json}` // 返回结果的方式 也可以通过 this.callback的方式返回
  // this.callback(null, json)

}
