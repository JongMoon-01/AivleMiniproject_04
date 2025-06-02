// src/routes/Router.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from '../pages/MainPage';
import SearchPage from '../pages/SearchPage';

export default function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/search" element={<SearchPage />} />
      </Routes>
    </Router>
  );
}