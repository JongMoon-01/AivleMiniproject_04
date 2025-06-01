import React, { useEffect, useState } from 'react';
import axiosInstance from '../api/axiosInstance';
import { useNavigate } from 'react-router-dom';

function MainPage() {
  const [userEmail, setUserEmail] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSecureData = async () => {
      try {
        const res = await axiosInstance.get('/api/auth/secure');
        setUserEmail(res.data.email); // 파싱 없이 깔끔
      } catch (err) {
        alert('로그인이 필요합니다.');
        navigate('/login'); // ✅ 인증 실패 시 로그인 페이지로 이동
      }
    };

    fetchSecureData();
  }, [navigate]);

  return (
    <div style={{ padding: '2rem' }}>
      <h1>환영합니다, {userEmail}님!</h1>
      <p>이 페이지는 로그인된 사용자만 접근할 수 있습니다.</p>
    </div>
  );
}

export default MainPage;