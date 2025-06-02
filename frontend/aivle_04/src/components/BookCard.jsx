// src/components/BookCard.jsx
import React from 'react';

const openDetailWindow = (bookId) => {
  window.open(`/books/${bookId}`, "_blank", "width=1000,height=800");
};


const BookCard = ({ id, image, title}) => {
  return (
    <div className="book-card" onClick={() => openDetailWindow(id)}>
      <img src={image} alt={title} className="book-thumbnail" />
      <div className="book-title">{title}</div>
    </div>
  );
};

export default BookCard;
