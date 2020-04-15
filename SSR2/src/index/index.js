
import './index.scss'
import { common } from '../../common'
console.log(common())

document.getElementById('app').innerHTML = 'hellow webpack'

if (module.hot) {
  console.log('ssssss')
  module.hot.accept()
}