import React, { useState } from 'react';
import { LayoutGrid, List, ChevronDown, Sliders, Eye, Download, 
         Heart, Share2, MoreVertical 
        } from 'lucide-react';
import './DocumentLibrary.css';
import Pagination from '../../shared/components/Pagination/Pagination';

import { mockDocuments } from "../../data/mockDocuments.js";

//========= Component Thẻ Tài Liệu (Card) =============
const DocumentCard = ({ doc }) => {
  const [liked, setLiked] = useState(false);

  return (
    <div className="doc-card">
      <div className="card-thumbnail">
        {doc.image ? (
          <img src={doc.image} alt={doc.title} className="card-image" />
        ) : (
          <div className="no-image-placeholder">
            <span>No preview</span>
          </div>
        )}

        {/* Nhãn định dạng màu trắng viền xám giống hệt ảnh */}
        <span className="doc-format-badge">{doc.format}</span>
      </div>

      <div className="card-body">
        <div className="card-title-row">
          <h3 className="card-title" title={doc.title}>{doc.title}</h3>
          <button className="card-menu-btn"><MoreVertical size={16} /></button>
        </div>

        <p className="card-meta">
          By {doc.author.replace('By ', '')} • {doc.date}
        </p>

        {/* Gọi ra 2 icon hình Con mắt và hình Mũi tên tải xuống từ thư viện Lucide */}
        <div className="card-footer">
          <div className="card-stats">
            <div className="stat-item">
              <Eye size={14} />
              <span>{doc.views}</span>
            </div>
            <div className="stat-item">
              <Download size={14} />
              <span>{doc.downloads}</span>
            </div>
          </div>

          {/* PHẦN NÀY XỬ LÝ NÚT LIKE VÀ NÚT TYM */}
          <div className="card-actions">
            <button
              onClick={() => setLiked(!liked)}
              className={`action-btn ${liked ? 'liked' : ''}`}
            >
              <Heart size={15} />
            </button>
            <button 
              className="action-btn" 
              onClick={() => alert('Đã chia sẻ: ' + doc.title)}
            >
              <Share2 size={15} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

//=========== Giao diện chính của Thư viện tài liệu ============
const DocumentLibrary = () => {
  const [viewType, setViewType] = useState('grid');
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="doc-library-container">
      {/* Tiêu đề & Chọn kiểu hiển thị Grid/List */}
      <div className="library-top-bar">
        <div className="title-area">
          <h1>Document Library</h1>
          <p>Explore and manage your study materials.</p>
        </div>
        
        {/* 2 nút chuyển đổi giữa ngang và dọc */}
        <div className="layout-toggle">
          <button
            className={`toggle-icon-btn ${viewType === 'grid' ? 'active' : ''}`}
            onClick={() => setViewType('grid')}
          >
            <LayoutGrid size={18} />
          </button>
          <button
            className={`toggle-icon-btn ${viewType === 'list' ? 'active' : ''}`}
            onClick={() => setViewType('list')}
          >
            <List size={18} />
          </button>
        </div>
      </div>

      {/* Bộ Lọc (Filters) */}
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

      {/* Hiển thị danh sách dạng Grid hoặc List */}
      {viewType === 'grid' ? (
        <div className="library-cards-grid">
          {mockDocuments.map((doc) => (
            <DocumentCard key={doc.id} doc={doc} />
          ))}
        </div>
      ) : (
        <div className="library-list-view">
          {mockDocuments.map((doc) => (
            <div key={doc.id} className="list-row-item">
              <div className="list-left-info">
                <span className="list-format-tag">{doc.format}</span>
                <div>
                  <h4>{doc.title}</h4>
                  <p>By {doc.author.replace('By ', '')} • {doc.date}</p>
                </div>
              </div>
              <div className="list-right-stats">
                <span>{doc.views} lượt xem</span>
                <span>{doc.downloads} lượt tải</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* GỌI BÀN GIAO COMPONENT PHÂN TRANG HIỂN THỊ Ở ĐÂY */}
      <Pagination 
        currentPage={currentPage} 
        totalPages={20} 
        onPageChange={setCurrentPage} 
      />
    </div>
  );
};

export default DocumentLibrary;