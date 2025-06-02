// src/components/BookCard.jsx
import React from 'react';

const BookCard = ({ title, image }) => {
  return (
    <div className="book-card">
      <img src={image} alt={title} className="book-thumbnail" />
      <div className="book-title">{title}</div>
    </div>
  );
};

export default BookCard;
