// src/context/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import axiosInstance from '../api/axiosInstance';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axiosInstance.get('/api/auth/me');
        setUserEmail(res.data.email);
      } catch {
        setUserEmail('');
      }
    };

    const token = localStorage.getItem('token');
    if (token) fetchUser();
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    setUserEmail('');
    window.location.href = '/';
  };

  return (
    <AuthContext.Provider value={{ userEmail, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
