import React from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';

const QuizFilter = ({ searchQuery, setSearchQuery, selectedStatus, setSelectedStatus }) => {
  return (
    <div className="quiz-filter-bar">
      <div className="filter-search-wrapper">
        <Search className="search-icon" size={18} />
        <input
          type="text"
          placeholder="Search quiz name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="filter-search-input"
        />
      </div>
      
      <div className="filter-dropdown-wrapper">
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="filter-select"
        >
          <option value="all">All Statuses</option>
          <option value="ready">Ready</option>
          <option value="expired">Expired</option>
        </select>
        <div className="filter-icon-container">
          <SlidersHorizontal size={16} />
        </div>
      </div>
    </div>
  );
};

export default QuizFilter;