// src/utils/auth.js
// FE BE 통합으로 생성파일

export const saveToken = (token) => {
  localStorage.setItem("jwtToken", token);
};

export const getToken = () => {
  return localStorage.getItem("jwtToken");
};

export const removeToken = () => {
  localStorage.removeItem("jwtToken");
};