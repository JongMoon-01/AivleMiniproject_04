// src/pages/MyUploads.jsx
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import NavBar from '../components/NavBar';

const MyUploads = () => {
  return (
    <>
      <Header />
      <NavBar />

      <div style={{ textAlign: 'center', padding: '100px' }}>
        <h2>📘 내가 등록한 도서</h2>
        <p>등록한 도서 목록이 여기에 표시됩니다.</p>
      </div>

      <Footer />
    </>
  );
};

export default MyUploads;
