import React from 'react';
import { LayoutGrid, List } from 'lucide-react';

const DocumentLibraryHeader = ({ viewType, setViewType }) => {
  return (
    <div className="library-top-bar">
      <div className="title-area">
        <h1>Document Library</h1>
        <p>Explore and manage your study materials.</p>
      </div>
      
      {/* 2 nút chuyển đổi giữa hiển thị Grid và List */}
      <div className="layout-toggle">
        <button
          onClick={() => setViewType('grid')}
          className={`toggle-icon-btn ${viewType === 'grid' ? 'active' : ''}`}
          aria-label="Grid view"
        >
          <LayoutGrid size={18} />
        </button>
        <button
          onClick={() => setViewType('list')}
          className={`toggle-icon-btn ${viewType === 'list' ? 'active' : ''}`}
          aria-label="List view"
        >
          <List size={18} />
        </button>
      </div>
    </div>
  );
};

export default DocumentLibraryHeader;