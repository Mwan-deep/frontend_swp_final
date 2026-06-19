import React from 'react';

const TimeFilter = ({ activeFilter, onChange }) => {
  const filters = [
    { id: 'weekly', label: 'Weekly' },
    { id: 'monthly', label: 'Monthly' },
    { id: 'allTime', label: 'All Time' }
  ];

  return (
    <div className="time-filter-container">
      {filters.map((filter) => (
        <button
          key={filter.id}
          className={`time-filter-btn ${activeFilter === filter.id ? 'active' : ''}`}
          onClick={() => onChange(filter.id)}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
};

export default TimeFilter;