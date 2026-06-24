import React from 'react';

// Nhận hàm onCreateClick từ thẻ cha truyền xuống
const FilterBar = ({ onCreateClick }) => {
  return (
    <div className="gq-filter-bar">
      <div className="gq-filters">
        <select className="gq-select">
          <option>Subject: All</option>
          <option>Java Programming</option>
          <option>Networking</option>
        </select>
        <select className="gq-select">
          <option>Difficulty: All</option>
          <option>Easy</option>
          <option>Medium</option>
          <option>Hard</option>
        </select>
        <select className="gq-select">
          <option>Topic: All</option>
        </select>
      </div>
      
      {/* Khi bấm, nó sẽ gọi hàm onCreateClick để báo cho thẻ cha bật Modal lên */}
      <button className="gq-btn-create" onClick={onCreateClick}>
        CREATE QUIZ
      </button> 
    </div>
  );
};

export default FilterBar;