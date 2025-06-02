import React from 'react';
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
  const navigate = useNavigate();

  const navItems = [
    { label: '나의 서재', path: '/my-library' },
    { label: '도서 둘러보기', path: '/' },
    { label: '도서 등록하기', path: '/register-book' },
    { label: '내가 등록한 도서 보기', path: '/my-uploads' } // ✅ 새 항목
  ];

  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'center',
      backgroundColor: '#fff',
      padding: '0px 0 0 0',
      borderTop: '1px solid #ccc',
      borderBottom: '1px solid #ccc'
    }}>
      {navItems.map(({ label, path }) => (
        <div
          key={label}
          onClick={() => navigate(path)}
          style={{
            margin: '0 30px',
            cursor: 'pointer',
            fontWeight: '500',
            padding: '8px 10px 10px 10px',
            display: 'flex',
            alignItems: 'center'
          }}
          onMouseEnter={(e) => e.currentTarget.style.fontWeight = '700'}
          onMouseLeave={(e) => e.currentTarget.style.fontWeight = '500'}
        >
          {label}
        </div>
      ))}
    </nav>
  );
};

export default NavBar;
