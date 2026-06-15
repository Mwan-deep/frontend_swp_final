import React from 'react';
import { ChevronDown, Sliders } from 'lucide-react';

const DocumentLibraryFilters = () => {
  return (
    <div className="filters-container">
      <div className="filters-left-group">
        <div className="filter-dropdown-btn">
          <span>All Categories</span>
          <ChevronDown size={16} />
        </div>

        <div className="filter-dropdown-btn">
          <span>All Formats</span>
          <ChevronDown size={16} />
        </div>

        <button className="more-filters-btn">
          <Sliders size={15} />
          <span>More Filters</span>
        </button>
      </div>

      <div className="filters-right-group">
        <span className="sort-label">Sort by:</span>
        <div className="sort-dropdown-btn">
          <span>Most Recent</span>
          <ChevronDown size={16} />
        </div>
      </div>
    </div>
  );
};

export default DocumentLibraryFilters;