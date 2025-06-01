// src/pages/Login.js
// FE BE 통합으로 생성파일

import React, { useState } from "react";
import axios from "../api/axiosInstance";
import { saveToken } from "../utils/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/login", {
        email,
        password,
      });

      saveToken(response.data.token); // 토큰 저장
      alert("로그인 성공");
    } catch (error) {
      alert("로그인 실패: " + error.response?.data || "오류 발생");
    }
  };

  return (
    <div>
      <h2>로그인</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        /><br />
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        /><br />
        <button type="submit">로그인</button>
      </form>
    </div>
  );
};

export default Login;