import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext'; // ✅ 이 줄 추가
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import SearchPage from './pages/SearchPage';
import MyLibrary from './pages/MyLibrary';
import BookRegister from './pages/BookRegister';
import MyUploads from './pages/MyUploads';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<SearchPage />} />
          <Route path="/my-library" element={<MyLibrary />} />
          <Route path="/register-book" element={<BookRegister />} />
          <Route path="/my-uploads" element={<MyUploads />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
