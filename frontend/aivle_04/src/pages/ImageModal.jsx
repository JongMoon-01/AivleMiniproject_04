import React from 'react';

const modalStyle = {
  overlay: {
    position: 'fixed',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000
  },
  modal: {
    backgroundColor: '#fff',
    padding: '20px',
    width: '400px',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    textAlign: 'center'
  },
  imageBox: {
    border: '1px dashed #ccc',
    padding: '20px',
    marginBottom: '20px'
  },
  buttons: {
    display: 'flex',
    justifyContent: 'center',
    gap: '10px',
    marginTop: '20px'
  }
};

const ImageModal = ({ onClose }) => {
  return (
    <div style={modalStyle.overlay} onClick={onClose}>
      <div style={modalStyle.modal} onClick={(e) => e.stopPropagation()}>
        <h3>이미지</h3>
        <div style={modalStyle.imageBox}>
          <img src="https://via.placeholder.com/100" alt="미리보기" />
        </div>

        <div style={{ textAlign: 'left' }}>
          <strong>Prompt</strong>
          <div style={{
            border: '1px solid #ccc',
            padding: '10px',
            marginTop: '5px'
          }}>
            <strong>크큭</strong>
            <p style={{ margin: 0 }}>
              아몰랑
            </p>
          </div>
        </div>

        <div style={modalStyle.buttons}>
          <button style={{ backgroundColor: '#007bff', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: 5 }}>이미지 생성</button>
          <button style={{ backgroundColor: '#007bff', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: 5 }}>이미지 등록</button>
        </div>
      </div>
    </div>
  );
};

export default ImageModal;
