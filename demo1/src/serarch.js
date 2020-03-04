

'use strict';
import React from 'react'
import ReactDOM from 'react-dom'
import './search.scss'
class Search extends React.Component {
  render() {
    return <div className='search-text'>Search Text</div>;
  }
}

ReactDOM.render(
  <Search></Search>,
  document.getElementById('root')
)
