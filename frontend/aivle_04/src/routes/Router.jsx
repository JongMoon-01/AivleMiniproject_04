// src/routes/Router.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from '../pages/MainPage';
import SearchPage from '../pages/SearchPage';
import BookDetail from '../pages/book/BookDetail';
import BookRegister from '../pages/book/BookRegister';

export default function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/books/:id" element={<BookDetail />} />
        <Route path="/books/register" element={<BookRegister />} />
        {/* <Route path="/books/:id/edit" element={<BookEdit />} /> */}
      </Routes>
    </Router>
  );
}