import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SearchPage from '../pages/SearchPage';
import MyLibrary from '../pages/MyLibrary';
import BookRegister from '../pages/BookRegister';
import MyUploads from '../pages/MyUploads';
import BookDetail from '../pages/book/BookDetail';

export default function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="/my-library" element={<MyLibrary />} />
        <Route path="/register-book" element={<BookRegister />} />
        <Route path="/my-uploads" element={<MyUploads />} />
        <Route path="/books/:id" element={<BookDetail />} />
      </Routes>
    </Router>
  );
}
