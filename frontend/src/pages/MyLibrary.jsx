import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FilterSidebar from '../components/FilterSidebar';
import SearchBar from '../components/SearchBar';
import NavBar from '../components/NavBar';

const MyLibrary = () => {
  const genres = ['프로그래밍', '문학', 'AI'];
  const publishers = ['한빛미디어', '길벗', '비제이퍼블릭'];

  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedPublishers, setSelectedPublishers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('title');

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
        {/* 사이드바 */}
        <FilterSidebar
          genres={genres}
          publishers={publishers}
          selectedGenres={selectedGenres}
          setSelectedGenres={setSelectedGenres}
          selectedPublishers={selectedPublishers}
          setSelectedPublishers={setSelectedPublishers}
        />

        {/* 우측 본문 */}
        <div style={{ flex: 1, padding: '50px', backgroundColor: '#fff' }}>
          <div style={{ textAlign: 'center' }}>
            <h2>📚 나의 서재</h2>
            <p>등록된 도서가 없습니다.</p>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default MyLibrary;
