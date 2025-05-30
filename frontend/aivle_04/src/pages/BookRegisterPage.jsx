import React, { useState } from 'react';

import ImageModal from './ImageModal';

const BookRegister = () => {
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [introduction, setIntroduction] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('Option 1');
  const [tags, setTags] = useState([]);
  const [cover, setCover] = useState(null);
  const [preview, setPreview] = useState('');
  const [showModal, setShowModal] = useState(false);

    // 이미지 모달 열기/닫기
  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCover(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleTagToggle = (tag) => {
    setTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ title, subtitle, category, tags, introduction, content, cover });
    alert('도서가 등록되었습니다.');
  };

  return (
    <div style={{ fontFamily: 'sans-serif' }}>
      {/* 상단 메뉴바 */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '10px 20px', borderBottom: '1px solid #ccc'
      }}>
        <div><strong>Menubar</strong></div>
        <div>
          <input type="text" placeholder="Search" />
          <button style={{ marginLeft: '10px' }}>help</button>
          <button style={{ marginLeft: '10px' }}>도서 등록</button>
          <button style={{ marginLeft: '10px' }}>logout</button>
        </div>
      </div>

      {/* 폼 */}
      <form onSubmit={handleSubmit} style={{ display: 'flex', padding: 20 }}>
        {/* 왼쪽: 이미지 등록 */}
        <div style={{ flex: 1, marginRight: 20 }}>
          <label>
            <div style={{ border: '1px solid #ccc', padding: 10, textAlign: 'center' }}>
              {preview ? (
                <img src={preview} alt="도서 표지" style={{ width: '100%', height: 'auto' }} />
              ) : (
                <div style={{ height: 200, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <span>도서 표지</span>
                </div>
              )}
            </div>
            <input type="file" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} />
            {/* <button type="button" style={{ marginTop: 10 }}>이미지 등록</button> */}
                    {/* 이미지 등록 버튼만 변경 */}
            <button type="button" onClick={openModal} style={{ marginTop: 10 }}>
                이미지 등록
            </button>
          </label>
        </div>

        {/* 오른쪽: 입력 필드들 */}
        <div style={{ flex: 2 }}>
          <div>
            <label>도서 제목(title)</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={{ width: '100%', marginBottom: 10 }}
            />
          </div>
          <div>
            <label>도서 부제목(subtitle)</label>
            <input
              type="text"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              style={{ width: '100%', marginBottom: 10 }}
            />
          </div>

          <div style={{ marginBottom: 10 }}>
            <label>카테고리 설정(category)</label><br />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              style={{ marginBottom: 5 }}
            >
              <option>Option 1</option>
              <option>Option 2</option>
              <option>Option 3</option>
            </select>
          </div>

          <div style={{ marginBottom: 10 }}>
            <label>태그 설정</label><br />
            {['#tag1', '#tag2', '#tag3', '#tag4'].map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => handleTagToggle(tag)}
                style={{
                  margin: '5px 5px 0 0',
                  backgroundColor: tags.includes(tag) ? '#007bff' : '#ddd',
                  color: tags.includes(tag) ? '#fff' : '#000',
                  border: 'none',
                  padding: '5px 10px',
                  borderRadius: '5px',
                  cursor: 'pointer'
                }}
              >
                {tag}
              </button>
            ))}
          </div>

          <div>
            <label>도서 내용(Introduction)</label>
            <textarea
              value={introduction}
              onChange={(e) => setIntroduction(e.target.value)}
              rows={4}
              style={{ width: '100%', marginBottom: 10 }}
            />
          </div>
          <div>
            <label>작가의 말(Content)</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={4}
              style={{ width: '100%', marginBottom: 10 }}
            />
          </div>

          <button type="submit" style={{
            backgroundColor: '#007bff',
            color: '#fff',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}>도서 등록</button>
        </div>
      </form>

      {/* 하단 */}
      <footer style={{
        textAlign: 'center',
        borderTop: '1px solid #ccc',
        padding: 10,
        marginTop: 20,
        fontSize: '12px'
      }}>
        bottom (copy right, 사업자번호, 대표자 전화번호 등등)
      </footer>

     {/* 모달 */}
      {showModal && <ImageModal onClose={closeModal} />}
    </div>
  );
};

export default BookRegister;
