// src/components/SidebarFilter.jsx
import React from 'react';

const SidebarFilter = () => {
  const options = ['Option 1', 'Option 2', 'Option 3', 'Option 4'];

  return (
    <aside className="sidebar-filter">
      {[...Array(3)].map((_, colIdx) => (
        <div key={colIdx} className="filter-column">
          {options.map((opt, idx) => (
            <label key={idx}>
              <input type="checkbox" />
              {opt}
            </label>
          ))}
        </div>
      ))}
    </aside>
  );
};

export default SidebarFilter;