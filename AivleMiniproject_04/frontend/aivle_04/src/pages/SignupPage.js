// 회원가입 페이지, 홍승우

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance'; // ✅ axiosInstance import
import './SignupPage.css';

function SignupPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    try {
      await axiosInstance.post('/api/auth/signup', {
        username,
        email,
        nickname,
        password,
      });

      alert('회원가입 성공!');
      navigate('/login');
    } catch (err) {
      alert('회원가입 실패: ' + (err.response?.data?.message || '서버 오류'));
    }
  };

  return (
    <div className="signup-container">
      <header className="signup-header">
        <div className="logo">Logo</div>
        <nav>
          <a href="#">Help</a>
          <a href="/signup">Register</a>
          <a href="/login">Login</a>
        </nav>
      </header>

      <form className="signup-form" onSubmit={handleSignup}>
        <label>
          이름:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <label>
          이메일:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          별명:
          <input
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
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
        <label>
          비밀번호 확인:
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit">가입</button>
      </form>
    </div>
  );
}

export default SignupPage;