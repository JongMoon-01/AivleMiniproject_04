import React, { useState } from 'react';

import React, { useState } from 'react';

const BookRegister = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');
  const [coverImage, setCoverImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCoverImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 여기에 실제 등록 로직을 추가하세요 (예: API 호출)
    console.log({ title, author, content, coverImage });
    alert('도서가 등록되었습니다.');
  };

  const handleCancel = () => {
    setTitle('');
    setAuthor('');
    setContent('');
    setCoverImage(null);
    setPreviewUrl('');
  };

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto' }}>
      <h2>도서 등록</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>도서 제목</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={{ width: '100%' }}
          />
        </div>

        <div>
          <label>도서 표지</label>
          <input type="file" accept="image/*" onChange={handleImageChange} />
          {previewUrl && (
            <div style={{ marginTop: '10px' }}>
              <img src={previewUrl} alt="미리보기" style={{ width: '100%', maxHeight: '300px', objectFit: 'contain' }} />
            </div>
          )}
        </div>

        <div>
          <label>저자</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
            style={{ width: '100%' }}
          />
        </div>

        <div>
          <label>책 내용</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={5}
            style={{ width: '100%' }}
            required
          />
        </div>

        <div style={{ marginTop: '10px' }}>
          <button type="submit">등록</button>
          <button type="button" onClick={handleCancel} style={{ marginLeft: '10px' }}>
            취소
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookRegister;
