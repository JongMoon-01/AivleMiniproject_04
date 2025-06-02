// src/pages/MainPage.jsx
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BookCard from '../components/BookCard';
import '../App.css';

export default function MainPage() {
  return (
    <>
      <Header />
      <div className="search-bar">
        <input type="text" placeholder="Search" />
      </div>
      <nav style={{ textAlign: 'center', marginBottom: '20px' }}>Menubar</nav>
      <div className="book-list">
        {[...Array(8)].map((_, idx) => (
          <BookCard key={idx} />
        ))}
      </div>
      <Footer />
    </>
  );
}