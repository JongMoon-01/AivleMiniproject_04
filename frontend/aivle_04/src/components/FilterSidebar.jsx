const FilterSidebar = ({
  genres,
  publishers,
  selectedGenres,
  setSelectedGenres,
  selectedPublishers,
  setSelectedPublishers
}) => {

  const toggleItem = (item, selected, setSelected) => {
    if (selected.includes(item)) {
      setSelected(selected.filter((i) => i !== item));
    } else {
      setSelected([...selected, item]);
    }
  };

  return (
    <aside
      style={{
        width: '200px',
        padding: '20px',
        backgroundColor: '#fafafa',
        borderRight: '1px solid #ddd',
        boxSizing: 'border-box'
      }}
    >
      <div>
        <strong>장르</strong>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {genres.map((genre) => (
            <li key={genre}>
              <label>
                <input
                  type="checkbox"
                  checked={selectedGenres.includes(genre)}
                  onChange={() =>
                    toggleItem(genre, selectedGenres, setSelectedGenres)
                  }
                />{' '}
                {genre}
              </label>
            </li>
          ))}
        </ul>
      </div>

      <div style={{ marginTop: '20px' }}>
        <strong>출판사</strong>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {publishers.map((publisher) => (
            <li key={publisher}>
              <label>
                <input
                  type="checkbox"
                  checked={selectedPublishers.includes(publisher)}
                  onChange={() =>
                    toggleItem(publisher, selectedPublishers, setSelectedPublishers)
                  }
                />{' '}
                {publisher}
              </label>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default FilterSidebar;
