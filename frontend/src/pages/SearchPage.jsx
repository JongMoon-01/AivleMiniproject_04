// src/pages/SearchPage.jsx
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SidebarFilter from '../components/SidebarFilter';
import BookCard from '../components/BookCard';
import '../App.css';

export default function SearchPage() {
  return (
    <>
      <Header />
      <div className="search-bar">
        <input type="text" placeholder="Search" />
      </div>
      <div className="search-layout">
        <SidebarFilter />
        <div className="book-list">
          {[...Array(4)].map((_, idx) => (
            <BookCard key={idx} />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}