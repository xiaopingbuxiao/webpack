

'use strict';
import React from 'react'
import ReactDOM from 'react-dom'
import './search.scss'
import reactPng from './img/react.png'
import reactLogo from './img/react-logo.png'
class Search extends React.Component {
  render() {
    return (
      <div>
        <div className='search-text'>
          <img src={reactLogo} alt="" srcset="" />
          Search Text
        </div>
        <img src={reactPng}></img>
      </div>
    )
  }
}

ReactDOM.render(
  <Search></Search>,
  document.getElementById('root')
)
