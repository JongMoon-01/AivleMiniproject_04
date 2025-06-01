// src/components/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';
const Header = () => {
  return (
    <header>
      <div className="top-menu">
        <a href="/help">help</a>
        <Link to="/register">Register</Link>
        <a href="/login">login</a>
      </div>
      <div className="logo">Logo</div>
    </header>
  );
};

export default Header;