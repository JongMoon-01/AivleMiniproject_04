import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'; // ✅ 수정
import './SignupPage.css';

function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate(); // ✅ 추가

  const handleSignup = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    try {
      await axios.post('http://localhost:8080/api/auth/signup', {
        username: name,
        email,
        nickname,
        password,
      });
      alert('회원가입 성공!');
      navigate('/'); // ✅ 메인으로 이동
    } catch (err) {
      alert('회원가입 실패');
    }
  };

  return (
    <div className="signup-container">
      <header className="signup-header">
        <div className="logo">Logo</div>
        <nav>
          <Link to="#">help</Link>
          <Link to="/signup">Register</Link>
          <Link to="/login">login</Link>
        </nav>
      </header>

      <form className="signup-form" onSubmit={handleSignup}>
        <label>
          이름:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </label>
        <label>
          이메일:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
        <label>
          별명:
          <input type="text" value={nickname} onChange={(e) => setNickname(e.target.value)} required />
        </label>
        <label>
          비밀번호:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </label>
        <label>
          비밀번호 확인:
          <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
        </label>
        <button type="submit">가입</button>
      </form>
    </div>
  );
}

export default SignupPage;
