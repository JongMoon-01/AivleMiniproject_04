import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header
      style={{
        position: 'relative', // ✅ 메뉴 절대위치 기준
        backgroundColor: '#f5f5f5',
        borderBottom: '1px solid #ddd',
        paddingBottom: '10px',
        minHeight: '120px',
        boxSizing: 'border-box'
      }}
    >
      {/* ✅ 오른쪽 상단 메뉴 */}
      <div
        style={{
          position: 'absolute',
          top: '10px',
          right: '40px',
          display: 'flex',
          gap: '20px',
          fontSize: '16px' // ✅ 글자 키움
        }}
      >
        <Link to="/help" style={linkStyle}>help</Link>
        <Link to="/register" style={linkStyle}>Register</Link>
        <Link to="/login" style={linkStyle}>login</Link>
      </div>

      {/* ✅ 중앙 로고 */}
      <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '30px' }}>
        <Link to="/">
          <img
            src="/logo.png"
            alt="Book림 로고"
            style={{
              maxHeight: '120px',
              objectFit: 'contain',
              display: 'block'
            }}
          />
        </Link>
      </div>
    </header>
  );
};

const linkStyle = {
  textDecoration: 'none',
  color: '#333'
};

export default Header;
