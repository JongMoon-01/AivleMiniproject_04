// src/pages/BookRegisterPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './BookRegisterPage.css'

export default function BookRegisterPage() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setPreviewImage(imageURL);
    }
  };

  const handleGenerateImage = () => {
    setIsGenerating(true);
    // 나중에 여기에 이미지 생성 API 요청 추가 가능
    setTimeout(() => {
      setIsGenerating(false);
      // 이미지가 생성되면 previewImage도 설정 가능
    }, 2000); // 2초 후 로딩 종료 (테스트용)
  };

  const handleRegister = () => {
    // 여기에 도서 등록 처리 로직이 들어갈 수 있음
    // 예: 유효성 검사 -> 서버 전송

    // 등록 완료 후 메인 페이지로 이동
    navigate('/');
  };

  return (
    <div className="book-register-page">
      <nav style={{ textAlign: 'center', borderBottom: '1px solid #ccc' }}>Menubar</nav>

      <div className="register-container">
        <div className="left-panel">
          <div className="image-upload">
            {/* 등록된 이미지 미리보기기 */}
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
              <input type="text" placeholder="제목1" />
            </div>

            <div className="form-group">
              <label>도서 부제목(Subtitle)</label>
              <input type="text" placeholder="제목1" />
            </div>
          </div>
          <div className="form-group">
            <label>카테고리(Category) + 태그(Tag) 설정</label>
            <div className="category-tags">
              <select>
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
            <textarea />
          </div>

          <div className="form-group">
            <label>작가의 말(Comment)</label>
            <textarea />
          </div>

          <div className="form-group">
            <label>본문 내용(Content)</label>
            <textarea />
          </div>

          <div className="form-group">
            <button className="submit-button" onClick={handleRegister}>도서 등록</button>
          </div>
        </div>
      </div>
    {/* 이미지 등록 모달 */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
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
