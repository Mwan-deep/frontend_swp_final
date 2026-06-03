import React, { useState } from 'react';
import Header from "../header/header";
import Sidebar from "../sidebar/sidebar";
import { LayoutGrid, List, ChevronDown, Filter, Eye, Download, Heart, Share2, MoreVertical, Play, ChevronLeft, ChevronRight } from 'lucide-react';
import './layout.css';
import {mockDocuments} from '../../../data/mockDocuments';

// Component Thẻ Tài Liệu
const DocumentCard = ({ doc }) => {
  const [liked, setLiked] = useState(false);
  const formatLower = doc.format.toLowerCase();

  return (
    <div className="doc-card">
      <div className="card-thumbnail-container">
        <img src={doc.image} alt={doc.title} className="card-image" />
        <span className={`format-badge badge-${formatLower}`}>{doc.format}</span>
        {formatLower === 'video' && (
          <div className="video-overlay">
            <div className="play-button-circle">
              <Play size={18} fill="currentColor" style={{ marginLeft: '2px' }} />
            </div>
          </div>
        )}
      </div>

      <div className="card-content">
        <div className="card-title-row">
          <h3 className="card-title" title={doc.title}>{doc.title}</h3>
          <button className="menu-btn"><MoreVertical size={16} /></button>
        </div>
        <p className="card-author">By {doc.author} • {doc.date}</p>
        <div className="card-footer">
          <div className="footer-stats-left">
            <div className="stat-item"><Eye size={14} /><span>{doc.views}</span></div>
            <div className="stat-item"><Download size={14} /><span>{doc.downloads}</span></div>
          </div>
          <div className="footer-actions-right">
            <button className={`action-icon-btn ${liked ? 'liked' : ''}`} onClick={() => setLiked(!liked)}>
              <Heart size={15} />
            </button>
            <button className="action-icon-btn" onClick={() => alert('Đã chia sẻ: ' + doc.title)}>
              <Share2 size={15} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Component Phân Trang
const Pagination = ({ currentPage, totalPages = 12, onPageChange }) => (
  <div className="pagination-container">
    <div className="pagination-wrapper">
      <button className="pagination-item" disabled={currentPage === 1} onClick={() => onPageChange(currentPage - 1)}>
        <ChevronLeft size={16} />
      </button>
      <button className={`pagination-item ${currentPage === 1 ? 'active' : ''}`} onClick={() => onPageChange(1)}>1</button>
      <button className={`pagination-item ${currentPage === 2 ? 'active' : ''}`} onClick={() => onPageChange(2)}>2</button>
      <button className={`pagination-item ${currentPage === 3 ? 'active' : ''}`} onClick={() => onPageChange(3)}>3</button>
      <span className="pagination-ellipsis">...</span>
      <button className={`pagination-item ${currentPage === totalPages ? 'active' : ''}`} onClick={() => onPageChange(totalPages)}>{totalPages}</button>
      <button className="pagination-item" disabled={currentPage === totalPages} onClick={() => onPageChange(currentPage + 1)}>
        <ChevronRight size={16} />
      </button>
    </div>
  </div>
);

// Component Layout Tổng Hợp Chính
const Layout = () => {
  const [activeTab, setActiveTab] = useState('documents');
  const [viewType, setViewType] = useState('grid');
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="app-container">
      <Header />
      <div className="main-wrapper">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <main className="content-area">
          {activeTab === 'documents' ? (
            <div className="library-container">
              {/* Tiêu đề & Chọn kiểu hiển thị */}
              <div className="library-header">
                <div className="library-title-section">
                  <h1>Document Library</h1>
                  <p>Explore and manage your study materials.</p>
                </div>
                <div className="view-toggle-wrapper">
                  <button className={`toggle-btn ${viewType === 'grid' ? 'active' : ''}`} onClick={() => setViewType('grid')}>
                    <LayoutGrid size={18} />
                  </button>
                  <button className={`toggle-btn ${viewType === 'list' ? 'active' : ''}`} onClick={() => setViewType('list')}>
                    <List size={18} />
                  </button>
                </div>
              </div>

              {/* Thanh Lọc & Sắp Xếp */}
              <div className="filters-bar">
                <div className="filters-left">
                  <div className="filter-select"><span>All Categories</span><ChevronDown size={16} /></div>
                  <div className="filter-select"><span>All Formats</span><ChevronDown size={16} /></div>
                  <button className="filter-btn-more"><Filter size={16} /><span>More Filters</span></button>
                </div>
                <div className="sort-wrapper">
                  <span>Sort by:</span>
                  <div className="sort-select"><span>Most Recent</span><ChevronDown size={16} /></div>
                </div>
              </div>

              {/* Danh sách tài liệu */}
              {viewType === 'grid' ? (
                <div className="documents-grid">
                  {mockDocuments.map((doc) => (
                    <DocumentCard key={doc.id} doc={doc} />
                  ))}
                </div>
              ) : (
                <div className="documents-list-view">
                  {mockDocuments.map((doc) => (
                    <div key={doc.id} className="doc-card-list">
                      <div className="list-item-left">
                        <span className={`format-badge badge-${doc.format.toLowerCase()}`}>{doc.format}</span>
                        <div>
                          <h3>{doc.title}</h3>
                          <p>By {doc.author} • {doc.date}</p>
                        </div>
                      </div>
                      <div className="list-item-right">
                        <span>Views: {doc.views}</span>
                        <span>Downloads: {doc.downloads}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Phân trang */}
              <Pagination currentPage={currentPage} onPageChange={setCurrentPage} />
            </div>
          ) : (
            <div className="tab-placeholder">
              <h2>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1).replace('-', ' ')} Page</h2>
              <p>Trang này hiện đang được phát triển. Vui lòng quay lại tab "Documents".</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Layout;