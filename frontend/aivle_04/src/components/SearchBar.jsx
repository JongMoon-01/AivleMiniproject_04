import React, { useEffect } from 'react';

const SearchBar = ({ searchTerm, setSearchTerm, sortOption, setSortOption }) => {
  // ✅ 초기 설정은 useEffect로 (딱 1번만 실행됨)
  useEffect(() => {
    if (searchTerm === '') setSearchTerm(''); // 이건 사실 필요 없음
  }, []);

  return (
    <div style={{ backgroundColor: '#f5f5f5', padding: '20px 0' }}>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{
          display: 'flex',
          border: '1px solid #ccc',
          borderRadius: '4px',
          overflow: 'hidden',
          width: '550px',
          height: '36px',
          backgroundColor: '#fff'
        }}>
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              flex: 1,
              border: 'none',
              padding: '0 10px',
              fontSize: '14px',
              outline: 'none'
            }}
          />
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            style={{
              border: 'none',
              borderLeft: '1px solid #ccc',
              padding: '0 10px',
              fontSize: '14px',
              outline: 'none',
              backgroundColor: '#fff',
              cursor: 'pointer'
            }}
          >
            <option value="title">제목순</option>
            <option value="latest">최신순</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
