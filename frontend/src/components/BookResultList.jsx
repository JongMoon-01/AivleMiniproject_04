// src/components/BookResultList.jsx
import React from 'react';
import BookCard from './BookCard';

const BookResultList = ({ books }) => {
  if (books.length === 0) return <p>검색 결과가 없습니다.</p>;
  return (
    <div className="book-list" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
      {books.map((book) => (
        <BookCard key={book.id} title={book.title} image={book.image} />
      ))}
    </div>
  );
};

export default BookResultList;
