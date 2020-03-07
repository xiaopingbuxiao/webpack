
import './index.scss'

document.getElementById('app').innerHTML = 'hellow webpack'

if (module.hot) {
  console.log('ssssss')
  module.hot.accept()
}