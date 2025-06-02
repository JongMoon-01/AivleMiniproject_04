// src/pages/BookRegister.jsx
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import NavBar from '../components/NavBar';

const BookRegister = () => {
  return (
    <>
      <Header />
      <NavBar />

      <div style={{ textAlign: 'center', padding: '100px' }}>
        <h2>📚 도서 등록 페이지</h2>
        <p>여기서 새로운 책을 등록할 수 있습니다.</p>
      </div>

      <Footer />
    </>
  );
};

export default BookRegister;
