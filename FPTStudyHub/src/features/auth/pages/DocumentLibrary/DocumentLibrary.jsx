import React, { useState } from 'react';
import { LayoutGrid, List, ChevronDown, Sliders, Eye, Download, 
         Heart, Share2, MoreVertical, ChevronLeft, ChevronRight 
        } from 'lucide-react';
import './DocumentLibrary.css';


import { mockDocuments } from "../../../../data/mockDocuments.js";

//========= Component Thẻ Tài Liệu (Card) =============
const DocumentCard = ({ doc }) => {
  const [liked, setLiked] = useState(false);
  //*Ban đầu set là false khi người dùng bấm vào yêu thích thì chuyển thành true*/}
   

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
{/*Gọi ra 2 icon hình Con mắt và hình Mũi tên tải xuống từ thư viện Lucide*/}
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
{/*PHẦN NÀY XỬ LÝ NÚT LIKE VÀ NÚT TYM============================*/}

          <div className="card-actions">
            <button
              onClick={() => setLiked(!liked)} // LÚC ĐẦU LF FALSE CHUYỂN THÀNH TRUE
              className={`action-btn ${liked ? 'liked' : ''}`} // TRUE THÌ CHUYỂN MÀU NÚT BẤM HOẶC NGUOC LẠI
             
            >
              <Heart size={15} />
            </button>
            <button className="action-btn" onClick={() => alert('Đã chia sẻ: ' + doc.title)}> {/*// THÔNG BÁO KHI CÓ AI SHARE*/}
              <Share2 size={15} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

{/* Component Phân Trang (Pagination) */}
const Pagination = ({ currentPage, totalPages = 20, onPageChange }) => (
  <div className="library-pagination">
   {/* //==== NÚT MŨI TÊN BÊN TRÁI=====*/}
    <button
      className="page-btn nav-arrow"
      disabled={currentPage === 1}
      onClick={() => onPageChange(currentPage - 1)}
    >
      <ChevronLeft size={16} />
    </button>
    {/* TRANG SỐ 1 , 2 , 3*/}

    <button className={`page-btn ${currentPage === 1 ? 'active' : ''}`} onClick={() => onPageChange(1)}>1</button>
    <button className={`page-btn ${currentPage === 2 ? 'active' : ''}`} onClick={() => onPageChange(2)}>2</button>
    <button className={`page-btn ${currentPage === 3 ? 'active' : ''}`} onClick={() => onPageChange(3)}>3</button>

    <span className="page-ellipsis">...</span>

    <button className={`page-btn ${currentPage === totalPages ? 'active' : ''}`} onClick={() => onPageChange(totalPages)}>{totalPages}</button>
{/* MŨI TÊN BÊN PHẢI*/}
    <button
      className="page-btn nav-arrow"
      disabled={currentPage === totalPages}
      onClick={() => onPageChange(currentPage + 1)}
    >
      <ChevronRight size={16} />
    </button>
  </div>
);

{/*Giao diện chính của Thư viện tài liệu */}
const DocumentLibrary = () => {
  const [viewType, setViewType] = useState('grid');
  const [currentPage, setCurrentPage] = useState(1);
  //viewType kiểu xem tài liệu ngang có thể chuyển sang dọc

  return (
    <div className="doc-library-container">
      {/* Tiêu đề & Chọn kiểu hiển thị Grid/List */}
      <div className="library-top-bar">
        <div className="title-area">
          <h1>Document Library</h1>
          <p>Explore and manage your study materials.</p>
        </div>
{/* 2 nút chuyển đổi giữa ngang và dọc*/}
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
    {/*Khối này tạo ra giao diện các nút để sau này bạn
     làm tính năng tìm kiếm nâng cao (như tìm theo Môn học, tìm file PDF/DOCX, hoặc sắp xếp theo tài liệu mới nhất).*/}

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
      {/*nếu đang ở dạng grid thì áp dunhj css cho nó ngược lại nếu list thì cx dùng css*/}

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

      {/*Nó bàn giao số trang hiện tại (currentPage = 1) và cái nút bấm chuyển trang (onPageChange) 
      cho khối này quản lý. Khi người dùng bấm nút sang 
      trang 2  thi setCurrentPage sẽ đổi trang hiện tại là 2 ( currentPage là 2)
        chuyển sang nội dung trang 2 */}
    </div>
  );
};

export default DocumentLibrary;