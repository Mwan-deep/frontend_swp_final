import React from 'react';

// Receive onCreateClick function passed down from parent component
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
      
      {/* On click, it triggers onCreateClick to tell the parent to open the Modal */}
      <button className="gq-btn-create" onClick={onCreateClick}>
        CREATE QUIZ
      </button> 
    </div>
  );
};

export default FilterBar;
