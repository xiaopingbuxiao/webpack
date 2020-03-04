

'use strict';
import React from 'react'
import ReactDOM from 'react-dom'
import './search.scss'
import logo from './img/react.png'
class Search extends React.Component {
  render() {
    return (
      <div className='search-text'>
        <img src={logo} alt="" srcset="" />
        Search Text
      </div>
    )
  }
}

ReactDOM.render(
  <Search></Search>,
  document.getElementById('root')
)
