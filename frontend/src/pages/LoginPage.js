// 로그인 페이지 js, 홍승우, 김호아

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance'; // ✅ axiosInstance import
import './LoginPage.css';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axiosInstance.post('/api/auth/login', {
        email,
        password,
      });

      const { token } = res.data;

      if (token) {
        localStorage.setItem('token', 'Bearer ' + token); // ✅ JWT저장, 반드시 Bearer 붙이기
        alert('로그인 성공!');
        navigate('/');
      } else {
        alert('로그인 실패: 토큰이 없습니다.');
      }
    } catch (err) {
      alert('로그인 실패: ' + (err.response?.data?.message || '서버 오류'));
    }
  };

  return (
    <div className="login-container">
      <header className="login-header">
        <div className="logo">Logo</div>
        <nav>
          <a href="#">Help</a>
          <a href="/signup">Register</a>
          <a href="/login">Login</a>
        </nav>
      </header>

      <form className="login-form" onSubmit={handleLogin}>
        <label>
          이메일:
          <input
            type="text"
            placeholder="이메일 또는 ID"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          비밀번호:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit">로그인</button>
      </form>
    </div>
  );
}

export default LoginPage;