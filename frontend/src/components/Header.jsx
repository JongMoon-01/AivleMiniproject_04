import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext'; // 🔑 전역 인증 상태 가져옴

const Header = () => {
  const { userEmail, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <header
      style={{
        position: 'relative',
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
          fontSize: '16px'
        }}
      >
        <Link to="/help" style={linkStyle}>help</Link>

        {userEmail ? (
          <>
            <span>{userEmail} 님</span>
            <button onClick={logout} style={{ ...linkStyle, background: 'none', border: 'none', cursor: 'pointer' }}>
              logout
            </button>
          </>
        ) : (
          <>
            <Link to="/signup" style={linkStyle}>Register</Link>
            <Link to="/login" style={linkStyle}>login</Link>
          </>
        )}
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
