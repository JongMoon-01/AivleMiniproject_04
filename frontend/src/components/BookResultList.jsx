// src/components/BookResultList.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const BookResultList = ({ books }) => {
  const navigate = useNavigate();

  const handleClick = (postId) => {
    navigate(`/books/${postId}`);
  };

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", padding: "20px" }}>
      {books.map((book) => (
        <div
          key={book.postId}
          onClick={() => handleClick(book.postId)}
          style={{
            width: "150px",
            cursor: "pointer",
            textAlign: "center",
          }}
        >
          <img
            src={book.coverImageUrl}
            alt={book.title}
            style={{ width: "100%", height: "220px", objectFit: "cover", borderRadius: "4px" }}
          />
          <p style={{ marginTop: "8px" }}>{book.title}</p>
        </div>
      ))}
    </div>
  );
};

export default BookResultList;
