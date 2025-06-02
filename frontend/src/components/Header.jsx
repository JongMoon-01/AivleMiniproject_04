// src/components/Header.jsx
import React from 'react';

const Header = () => {
  return (
    <header>
      <div className="top-menu">
        <a href="/help">help</a>
        <a href="/Signup">Register</a>
        <a href="/login">login</a>
      </div>
      <div className="logo">Logo</div>
    </header>
  );
};

export default Header;