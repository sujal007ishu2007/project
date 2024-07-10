import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className='head'>
    <nav>
        <h1>JobConnect</h1>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/jobs">Jobs</Link></li>

          <li><Link to="/login">Login</Link></li>
          <li><Link to="/register">Register</Link></li>
        </ul>
      </nav>
      </div>
  );
};

export default Header;
