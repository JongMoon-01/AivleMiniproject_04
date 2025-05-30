// src/components/Footer.jsx
import React from 'react';

const Footer = () => {
  return (
    <footer
  style={{
    backgroundColor: '#f5f5f5',
    color: '#666',
    fontSize: '12px',
    textAlign: 'center',
    padding: '15px 0',
    margin: '0', // ✅ 여기를 꼭 추가
    borderTop: '1px solid #ddd'
  }}
>
  bottom(copy right, 사업자번호, 대표자 전화번호 등등)
</footer>

  );
};

export default Footer;
