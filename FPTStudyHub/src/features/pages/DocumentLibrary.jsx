import React, { useState } from 'react';
import './DocumentLibrary.css';
import DocumentLibraryHeader from '../documentlibrary/components/DocumentLibraryHeader';
import DocumentLibraryFilters from '../documentlibrary/components/DocumentLibraryFilters';
import DocumentLibraryCard from '../documentlibrary/components/DocumentLibraryCard';
import DocumentLibraryRow from '../documentlibrary/components/DocumentLibraryRow';
import Pagination from '../../shared/components/Pagination/Pagination.jsx';

import { mockDocuments } from "../../data/mockDocuments.js";

const DocumentLibrary = () => {
  const [viewType, setViewType] = useState('grid');//viewType với giá trị mặc định ban đầu là 'grid'
                                                   //setViewType là hàm duy nhất dùng để thay đổi 
                                                   // giá trị của viewType (ví dụ chuyển từ 'grid' sang 'list').
  const [currentPage, setCurrentPage] = useState(1); // mặc định trang đầu tiên là page 1
                                                     //setCurrentPage dùng để đổi sang trang khác khi nguoi dùng bấm đổi trang

  return (
    <div className="doc-library-container">
      {/* Tiêu đề & Chọn kiểu hiển thị Grid/List */}
      <DocumentLibraryHeader viewType={viewType} setViewType={setViewType} />

      {/* Bộ Lọc (Filters) */}
      <DocumentLibraryFilters />

      {/* Hiển thị danh sách dạng Grid hoặc List */}
      {viewType === 'grid' ? (
        <div className="library-cards-grid">
          {mockDocuments.map((doc) => (
            <DocumentLibraryCard key={doc.id} doc={doc} />
          ))}
        </div>
      ) : (
        <div className="library-list-view">
          {mockDocuments.map((doc) => (
            <DocumentLibraryRow key={doc.id} doc={doc} />
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