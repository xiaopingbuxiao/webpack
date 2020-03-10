import React from 'react'
import ReactDOM from 'react-dom'
import { common } from '../../common'
import './search.scss'
import logo from './img/react-logo.png'
import { a } from './tree-shaking'

var str = a()
console.log(common())
class Search extends React.Component {

  constructor() {
    super()
    this.state = {
      Text: null
    }
  }

  loadComponent() {
    import('./Text.jsx').then((Text) => {
      console.log(Text.default)
      this.setState({
        Text: Text.default
      })
    })
  }
  render() {
    const { Text } = this.state
    return (
      <div className='search-Text'>
        {
          Text ? <Text></Text> : null
        }
        <img src={logo} onClick={this.loadComponent.bind(this)} />
        <span>搜索页面的html{str}</span>
      </div>
    )
  }
}
ReactDOM.render(
  <Search />,
  document.querySelector('#app')
)

