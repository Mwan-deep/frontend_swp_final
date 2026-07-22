import React from 'react';
import { Sliders } from 'lucide-react';

const DocumentLibraryFilters = ({
  selectedCategory,
  setSelectedCategory,
  selectedFormat,
  setSelectedFormat,
  selectedSort,
  setSelectedSort,
  showMoreFilters,
  setShowMoreFilters,
  categories // ĐÃ THÊM: Nhận mảng chuyên ngành động từ component cha
}) => {
  return (
    <div className="filters-container">
      <div className="filters-left-group">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="filter-dropdown-btn"
          aria-label="Filter by Category"
        >
          <option value="All">All Categories</option>
          {/* ĐÃ SỬA: Lặp qua danh sách chuyên ngành thực tế từ Backend */}
          {categories && categories.map((cat, idx) => (
            <option key={idx} value={cat}>{cat}</option>
          ))}
        </select>

        <select
          value={selectedFormat}
          onChange={(e) => setSelectedFormat(e.target.value)}
          className="filter-dropdown-btn"
          aria-label="Filter by Format"
        >
          <option value="All">All Formats</option>
          <option value="PDF">PDF</option>
          <option value="DOCX">DOCX</option>
          <option value="ZIP/RAR">ZIP/RAR</option>
          <option value="PPTX">PPTX</option>
        </select>

        <button 
          type="button" 
          className={`more-filters-btn ${showMoreFilters ? 'active' : ''}`}
          onClick={() => setShowMoreFilters(!showMoreFilters)}
        >
          <Sliders size={15} />
          <span>More Filters</span>
        </button>
      </div>

      <div className="filters-right-group">
        <span className="sort-label">Sort by:</span>
        <select
          value={selectedSort}
          onChange={(e) => setSelectedSort(e.target.value)}
          className="sort-dropdown-btn"
          aria-label="Sort by"
        >
          <option value="recent">Most Recent</option>
          <option value="views">Most Viewed</option>
          <option value="downloads">Most Downloaded</option>
          <option value="az">A-Z</option>
          <option value="za">Z-A</option>
        </select>
      </div>
    </div>
  );
};

export default DocumentLibraryFilters;