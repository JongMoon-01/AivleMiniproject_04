// src/pages/MainPage.jsx
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BookCard from '../components/BookCard';
import { useEffect, useState } from 'react';
import axios from 'axios'; // 또는 fetch 사용 가능
import books from 'data/books'
import BookResultList from '../components/BookResultList'

import '../App.css';

export default function MainPage() {
//  const [books, setBooks] = useState([]);
  

  // useEffect(() => {
  //   const fetchBooks = async () => {
  //     try {
  //       const res = await axios.fetch(`/data/books.js`);
  //       const data = await res.json();
  //       setBooks(data);
  //     } catch (err) {
  //       console.error("도서 목록 불러오기 실패", err);
  //     }
  //   };

  //   fetchBooks();
  // }, []);
  return (
    <>
      <Header />
      <div className="search-bar">
        <input type="text" placeholder="Search" />
      </div>
      <nav style={{ textAlign: 'center', marginBottom: '20px' }}>Menubar</nav>
      {/* <div className="book-list">
        {books.map((book, idx) => (
          <BookCard key={book.id} image={book.image} title={book.title} onClick={openDetailWindow(idx)}/>
        ))}
      </div> */}
      <BookResultList books={books}/>
      <Footer />
    </>
  );
}