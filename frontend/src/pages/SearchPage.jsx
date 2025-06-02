import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FilterSidebar from '../components/FilterSidebar';
import BookResultList from '../components/BookResultList';
import SearchBar from '../components/SearchBar';
import NavBar from '../components/NavBar';
import books from '../data/books';
import axios from 'axios';

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedPublishers, setSelectedPublishers] = useState([]);
  const [sortOption, setSortOption] = useState('title');
  const [books, setBooks] = useState([]);

  const genres = ['프로그래밍', '문학', 'AI'];
  const publishers = ['한빛미디어', '길벗', '비제이퍼블릭'];

  useEffect(() => {
    axios.get('http://localhost:8080/api/posts')
      .then((res) => {
        setBooks(res.data);
      })
      .catch((err) => {
        console.error('도서 목록 불러오기 실패:', err);
      });
  }, []);

  const filteredBooks = books
    .filter((book) => book.title.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter((book) => selectedGenres.length === 0 || selectedGenres.includes(book.category))
    .filter((book) => selectedPublishers.length === 0 || selectedPublishers.includes(book.publisher))
    .sort((a, b) => {
      if (sortOption === 'title') return a.title.localeCompare(b.title);
      if (sortOption === 'latest') return new Date(b.createdAt) - new Date(a.createdAt);
      return 0;
    });

  return (
    <>
      <Header />
      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        sortOption={sortOption}
        setSortOption={setSortOption}
      />
      <NavBar />
      <div className="layout" style={{ display: 'flex', padding: '0' }}>
        <FilterSidebar
          genres={genres}
          publishers={publishers}
          selectedGenres={selectedGenres}
          setSelectedGenres={setSelectedGenres}
          selectedPublishers={selectedPublishers}
          setSelectedPublishers={setSelectedPublishers}
        />
        <BookResultList books={filteredBooks} />
      </div>
      <Footer />
    </>
  );
};

export default SearchPage;
