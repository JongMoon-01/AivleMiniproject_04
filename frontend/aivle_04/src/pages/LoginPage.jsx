import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // ✅ 테스트 계정 처리
    if (email === 'aivle' && password === '07') {
      alert('테스트 로그인 성공!');
      navigate('/'); // 홈으로 이동
      return;
    }

    try {
      const res = await axios.post('http://localhost:8080/api/auth/login', {
        email,
        password,
      });
      localStorage.setItem('token', res.data.token);
      alert('로그인 성공!');
      navigate('/');
    } catch (err) {
      alert('로그인 실패');
    }
  };

  return (
    <div className="login-container">
      <header className="login-header">
        <div className="logo">Logo</div>
        <nav>
          <a href="#">help</a>
          <a href="/signup">Register</a>
          <a href="/login">login</a>
        </nav>
      </header>

      <form className="login-form" onSubmit={handleLogin}>
        <label>
          이메일:
          <input
            type="text" // ✅ 이메일 형식 체크 제거
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
