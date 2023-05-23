import React from 'react'
import {Link} from 'react-router-dom'

import './index.css';

const Nav = () => {
  return (
    <nav>
        <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/Comments">Comments</Link></li>
        </ul>
    </nav>
  )
}

export default Nav