


import { hello } from './hello'
import { world } from './world'


if (module.hot) {
  console.log('ssssss')
  module.hot.accept()
}