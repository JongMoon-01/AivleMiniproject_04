// src/pages/BookRegisterPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './BookRegisterPage.css';
import axios from "axios";

export default function BookRegisterPage() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [previewImage, setPreviewImage] = useState(null); // 얘가 coverImageUrl이 됨
  const [isGenerating, setIsGenerating] = useState(false);
  const [apiKey, setApiKey] = useState('');

  // 책 생성
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

  const handleRegister = async () => {
    // 여기에 도서 등록 처리 로직이 들어갈 수 있음
    // // 예: 유효성 검사 -> 서버 전송
    if (!title || !synopsis || !comment || !content) {
      alert ('필수 항목을 모두 입력해주세요.')

      return;
    }

    const postData = {
      title,
      subTitle,
      synopsis,
      comment,
      content,
      category,
      publisher, // 출판사 추가
      coverImageUrl: previewImage, // OpenAI로 생성 또는 업로드된 이미지 URL
      // tags는 백엔드 DTO 형식에 맞춰 가공 (예: 문자열, 배열 등)
    };

    try {
      setIsGenerating(true);
      const response = await axios.post('http://localhost:8080/api/posts', postData);
      console.log('포스트 등록 성공: ', response.data);
      alert('도서가 성공적으로 등록되었습니다.');
      // 등록 완료 후 메인 페이지로 이동
      navigate('/');
    } catch (error) {
      console.log('포스트 등록 실패: ', error.response ? error.response.data : error.message);
      alert('도서 등록에 실패했습니다' + (error.response ? error.response.data.message || error.response.data.error : error.message));
    } finally {
      setIsGenerating(false);
    }
  };

  const generateImageFromPrompt = async (prompt, apiKey) => {
    try {
      const response = await fetch('https://api.openai.com/v1/images/generations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          prompt,
          n: 1,
          size: '512x512',
          response_format: 'url',
        }),
      });

      if (!response.ok) {
        throw new Error('OpenAI API 요청 실패');
      }

      const data = await response.json();
      return data.data[0].url;
    } catch (err) {
      throw err;
    }
  };

  const handleGenerateImage = async () => {
    if (!apiKey) {
      alert('먼저 API 키를 입력하세요.');
      return;
    }

    setIsGenerating(true);
    try {
      const prompt = "책 표지로 쓸 수 있는 판타지 일러스트"; // 👉 사용자 입력값으로 바꿔도 됨
      const imageUrl = await generateImageFromPrompt(prompt, apiKey);
      setPreviewImage(imageUrl);
    } catch (err) {
      alert('이미지 생성 실패: ' + err.message);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
      <div className="book-register-page">
        <nav style={{ textAlign: 'center', borderBottom: '1px solid #ccc' }}>Menubar</nav>

        <div className="register-container">
          <div className="left-panel">
            <div className="image-upload">
              {/* 등록된 이미지 미리보기 */}
              {previewImage ? (
                  <img
                      src={previewImage}
                      alt='book preview'
                      style={{maxWidth:'100%', maxHeight:'100%'}}
                  />
              ) : (
                  <div className='image-placeholder'/>
              )}
              <button onClick={() => setShowModal(true)}>이미지 등록</button>
            </div>
          </div>

          <div className="right-panel">
            <div className='form-group-title'>
              <div className="form-group">
                <label>도서 제목(Title)</label>
                <input type="text" placeholder="제목1" value={title}
                onChange={(e) => setTitle(e.target.value)}/>
              </div>

              <div className="form-group">
                <label>도서 부제목(Subtitle)</label>
                <input type="text" placeholder="제목1"
                value={subTitle} onChange={(e) => setSubTitle(e.target.value)}/>
              </div>
            </div>
            <div className="form-group">
              <label>카테고리(Category) + 태그(Tag) 설정</label>
              <div className="category-tags">
                <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}>
                  <option>경제</option>
                  <option>철학</option>
                  <option>문학</option>
                </select>
                <div className="tags">
                  <button className="tag active">#tag1</button>
                  <button className="tag">#tag2</button>
                  <button className="tag">#tag3</button>
                  <button className="tag">#tag4</button>
                </div>
              </div>
            </div>

            <div className="form-group">
              <label>줄거리(Synopsis)</label>
              <textarea
              value={synopsis}
              onChange={(e) => setSynopsis(e.target.value)}/>
            </div>

            <div className="form-group">
              <label>작가의 말(Comment)</label>
              <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}/>
            </div>

            <div className="form-group">
              <label>본문 내용(Content)</label>
              <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}/>
            </div>

            <div className="form-group">
              <button className="submit-button" onClick={handleRegister}>도서 등록</button>
            </div>
          </div>
        </div>
        {/* 이미지 등록 모달 */}
        {showModal && (
            <div className="modal-overlay" onClick={() => setShowModal(false)}>
              <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h2 style={{ textAlign: 'center' }}>이미지</h2>
                <div>
                  <button
                      className='delete-preview-button'
                      onClick={() => setPreviewImage(null)}
                  >
                    x
                  </button>
                </div>

                {/* 이미지 미리보기 */}
                <div className="modal-image-placeholder">

                  {previewImage ? (
                      <div className="image-preview-container">
                        <img
                            src={previewImage}
                            alt='preview'
                            className='preview-image'
                        />
                      </div>
                  ) : (
                      <div className='image-placeholder'>미리보기 없음</div>
                  )}
                </div>

                {/* 프롬프트 영역 */}
                <p>Prompt</p>
                <div className="prompt-box">
                  <p>
                    예시) 줄거리에 어울릴만한 책 커버를 만들어 줘.
                  </p>
                </div>
                <div className="form-group">
                  <label>OpenAI API 키</label>
                  <input
                      type="password"
                      placeholder="sk-..."
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                  />
                </div>

                {/* 버튼 및 파일 입력 */}
                <div className="modal-buttons">
                  {/* 이미지 생성 */}
                  {isGenerating ? (
                      <div className="spinner" />
                  ) : (
                      <button onClick={handleGenerateImage}>이미지 생성</button>
                  )}

                  {/* 실제 파일 업로드 */}
                  <label htmlFor="file-upload" className="upload-label">
                    이미지 업로드
                  </label>
                  <input
                      type="file"
                      id="file-upload"
                      accept="image/*"
                      style={{ display: 'none' }}
                      onChange={handleImageSelect}
                  />
                </div>
              </div>
            </div>
        )}
        <footer style={{ textAlign: 'center', borderTop: '1px solid #ccc', marginTop: '40px' }}>
          bottom(copy right, 사업자번호, 대표자 전화번호 등등)
        </footer>
      </div>
  );
}
