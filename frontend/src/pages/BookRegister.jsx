// src/pages/BookRegister.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import NavBar from '../components/NavBar';
import './BookRegister.css';
 
const BookRegister = () => {
  const navigate = useNavigate();
 
  const [previewImage, setPreviewImage] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [apiKey, setApiKey] = useState('');
 
  const [title, setTitle] = useState('');
  const [subTitle, setSubTitle] = useState('');
  const [synopsis, setSynopsis] = useState('경제');
  const [comment, setComment] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [publisher, setPublisher] = useState('');
 
  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setPreviewImage(imageURL);
    }
  };
 
  const generateImageFromPrompt = async (prompt, apiKey) => {
    const response = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({ prompt, n: 1, size: '512x512', response_format: 'url' }),
    });
 
    if (!response.ok) throw new Error('OpenAI API 요청 실패');
 
    const data = await response.json();
    return data.data[0].url;
  };
 
  const handleGenerateImage = async () => {
    if (!apiKey) return alert('API 키를 입력하세요.');
    setIsGenerating(true);
    try {
      const imageUrl = await generateImageFromPrompt("책 표지로 쓸 수 있는 판타지 일러스트", apiKey);
      setPreviewImage(imageUrl);
    } catch (err) {
      alert('이미지 생성 실패: ' + err.message);
    } finally {
      setIsGenerating(false);
    }
  };
 
  const handleRegister = async () => {
    if (!title || !synopsis || !comment || !content) {
      alert('필수 항목을 모두 입력해주세요.');
      return;
    }
 
    const postData = {
      title,
      subTitle,
      synopsis,
      comment,
      content,
      category,
      publisher,
      coverImageUrl: previewImage,
    };
 
    try {
      setIsGenerating(true);
      await axios.post('http://localhost:8080/api/posts', postData);
      alert('도서가 성공적으로 등록되었습니다.');
      navigate('/');
    } catch (error) {
      alert('도서 등록에 실패했습니다: ' + (error.response?.data.message || error.message));
    } finally {
      setIsGenerating(false);
    }
  };
 
  return (
    <>
      <Header />
      <NavBar />
      <div className="register-container">
        <h2>📚 도서 등록 페이지</h2>
        <div className="form-group">
          <input placeholder="제목" value={title} onChange={e => setTitle(e.target.value)} />
          <input placeholder="부제목" value={subTitle} onChange={e => setSubTitle(e.target.value)} />
          <input placeholder="시놉시스" value={synopsis} onChange={e => setSynopsis(e.target.value)} />
          <textarea placeholder="한줄평" value={comment} onChange={e => setComment(e.target.value)} />
          <textarea placeholder="본문 내용" value={content} onChange={e => setContent(e.target.value)} />
          <input placeholder="카테고리" value={category} onChange={e => setCategory(e.target.value)} />
          <input placeholder="출판사" value={publisher} onChange={e => setPublisher(e.target.value)} />
 
          <input type="file" onChange={handleImageSelect} />
          {previewImage && <img src={previewImage} alt="책 표지 미리보기" className="preview-image" />}
 
          <input placeholder="OpenAI API 키" value={apiKey} onChange={e => setApiKey(e.target.value)} />
          <button onClick={handleGenerateImage} disabled={isGenerating}>이미지 생성</button>
          <button onClick={handleRegister} disabled={isGenerating}>도서 등록</button>
        </div>
      </div>
      <Footer />
    </>
  );
};
 
export default BookRegister;  
 