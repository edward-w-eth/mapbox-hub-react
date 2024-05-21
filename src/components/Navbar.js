// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className='navbar'>
      <ul>
        <li>
          <Link to="/">Map</Link>
        </li>
        <li>
          <Link to="/building">Building</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
