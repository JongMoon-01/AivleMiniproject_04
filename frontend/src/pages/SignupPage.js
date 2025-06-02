// 회원가입 페이지

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';
import './SignupPage.css';

function SignupPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
  e.preventDefault();

  if (password !== confirmPassword) {
    alert('비밀번호가 일치하지 않습니다.');
    return;
  }

  const payload = {
    username,
    email,
    password
  };

  console.log("📦 보내는 값:", payload); // 디버깅 확인

  try {
    const res = await axiosInstance.post('/api/auth/signup', payload, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    alert('회원가입 성공!');
    navigate('/login');
  } catch (err) {
    console.error("❌ 에러:", err.response);
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
