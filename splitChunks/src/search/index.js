import React from 'react'
import ReactDOM from 'react-dom'
import { common } from '../../common'
import './search.scss'
import logo from './img/react-logo.png'
import { a } from './tree-shaking'

var str = a()
console.log(common())
class Search extends React.Component {
  render() {
    return (
      <div className='search-text'>
        <img src={logo} />
        <span>搜索页面的html{str}</span>
      </div>
    )
  }
}
ReactDOM.render(
  <Search />,
  document.querySelector('#app')
)

