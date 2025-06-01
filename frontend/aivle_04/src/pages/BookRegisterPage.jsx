// src/pages/BookRegisterPage.jsx
import React, { useState } from 'react';
import './BookRegisterPage.css'

export default function BookRegisterPage() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="book-register-page">
      <nav style={{ textAlign: 'center', borderBottom: '1px solid #ccc' }}>Menubar</nav>

      <div className="register-container">
        <div className="left-panel">
          <div className="image-upload">
            <div className="image-placeholder" />
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
            <label>카테고리 설정(Category) + 태그설정</label>
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
            <button className="submit-button">도서 등록</button>
          </div>
        </div>
      </div>
    {/* 이미지 등록 모달 */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h2 style={{ textAlign: 'center' }}>이미지</h2>
            <div className="modal-image-placeholder" />

            <div className="prompt-box">
              <p><strong>커버 이미지 생성 프롬프트</strong></p>
              <p>
                예시) 줄거리에 어울릴만한 책 커버를 만들어 줘.
              </p>
            </div>

            <div className="modal-buttons">
              <button>이미지 생성</button>
                <label htmlFor="file-upload" className="upload-label">
                  이미지 등록
                </label>
                  <input
                    type="file"
                    id="file-upload"
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        console.log('선택된 파일:', file);
                        // 👉 여기에 미리보기 처리 또는 업로드 로직 연결 가능
                      }
                    }}
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
