import './Header.scss';
import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className="top-bar">
      <div className="top-bar-left">
        <Link to="/">
          <h3><b>FINANCIAL ADVISOR</b></h3>
        </Link>
      </div>
    </div>
  )
};

export default Header;