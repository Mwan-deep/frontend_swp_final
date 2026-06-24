import React, { useState, useEffect } from 'react';
import './DocumentLibrary.css';
import DocumentLibraryHeader from '../documentlibrary/components/DocumentLibraryHeader';
import DocumentLibraryFilters from '../documentlibrary/components/DocumentLibraryFilters';
import DocumentLibraryCard from '../documentlibrary/components/DocumentLibraryCard';
import DocumentLibraryRow from '../documentlibrary/components/DocumentLibraryRow';
import Pagination from '../../shared/components/Pagination/Pagination.jsx';

import { mockDocuments } from "../../data/mockDocuments.js";

// Phân nhóm tài liệu thành các danh mục dựa trên từ khóa trong tiêu đề
const enrichDocument = (doc) => {
  const title = doc.title.toLowerCase();

  // 1. Categories: Computer Science, Software Engineering, Economics, AI Applications
  let category = 'Computer Science'; // default
  if (title.includes('calculus') || title.includes('math')) {
    category = 'AI Applications';
  } else if (title.includes('python') || title.includes('scripting')) {
    category = 'Computer Science';
  } else if (title.includes('web') || title.includes('boilerplate')) {
    category = 'Software Engineering';
  } else if (title.includes('macroeconomics') || title.includes('economics')) {
    category = 'Economics';
  }

  // 2. Semesters: Block 1, Block 2, Summer, Fall, Spring
  let semester = 'Fall';
  if (doc.id === 1 || doc.id === 4) semester = 'Block 1';
  if (doc.id === 2) semester = 'Block 2';
  if (doc.id === 3 || doc.id === 5) semester = 'Summer';
  if (doc.id === 6) semester = 'Spring';

  return {
    ...doc,
    category,
    semester,
    instructor: doc.author.replace('By ', '')
  };
};

// Hàm phân tích định lượng các số liệu xem/tải (ví dụ: '1.2k' -> 1200)
const parseStatValue = (val) => {
  if (!val) return 0;
  const cleaned = val.toString().trim().toLowerCase();
  if (cleaned.endsWith('k')) {
    return parseFloat(cleaned.slice(0, -1)) * 1000;
  }
  return parseFloat(cleaned);
};

const DocumentLibrary = () => {
  const [viewType, setViewType] = useState('grid');//viewType với giá trị mặc định ban đầu là 'grid'
                                                   //setViewType là hàm duy nhất dùng để thay đổi 
                                                   // giá trị của viewType (ví dụ chuyển từ 'grid' sang 'list').
  const [currentPage, setCurrentPage] = useState(1); // mặc định trang đầu tiên là page 1
                                                     //setCurrentPage dùng để đổi sang trang khác khi nguoi dùng bấm đổi trang

  // Bộ lọc nâng cao và sắp xếp dựa trên dữ liệu giả lập
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedFormat, setSelectedFormat] = useState('All');
  const [selectedSort, setSelectedSort] = useState('recent');

  // Toggle & giá trị lọc nâng cao (More Filters)
  const [showMoreFilters, setShowMoreFilters] = useState(false);
  const [selectedSemester, setSelectedSemester] = useState('All');
  const [selectedInstructor, setSelectedInstructor] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');

  // Quản lý trạng thái đã đọc và yêu thích của tài liệu
  const [favoriteDocs, setFavoriteDocs] = useState({}); // { [docId]: boolean }
  const [readDocs, setReadDocs] = useState({}); // { [docId]: boolean }

  const handleToggleFavorite = (id) => {
    setFavoriteDocs(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleMarkAsRead = (id) => {
    setReadDocs(prev => ({
      ...prev,
      [id]: true
    }));
  };

  // Khởi tạo lại trang hiện tại về 1 khi bất kỳ bộ lọc nào thay đổi
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, selectedFormat, selectedSort, selectedSemester, selectedInstructor, selectedStatus]);

  // Làm giàu thông tin tài liệu gốc
  const enrichedDocs = mockDocuments.map(enrichDocument);

  // Danh sách giảng viên để lựa chọn trong dropdown
  const instructors = Array.from(new Set(enrichedDocs.map(doc => doc.instructor)));

  // Áp dụng bộ lọc (Filters)
  let filtered = enrichedDocs;

  // 1. Lọc theo danh mục
  if (selectedCategory !== 'All') {
    filtered = filtered.filter(doc => doc.category === selectedCategory);
  }

  // 2. Lọc theo định dạng file
  if (selectedFormat !== 'All') {
    if (selectedFormat === 'ZIP/RAR') {
      filtered = filtered.filter(doc => doc.format === 'ZIP' || doc.format === 'RAR');
    } else {
      filtered = filtered.filter(doc => doc.format === selectedFormat);
    }
  }

  // 3. Lọc nâng cao theo Semester
  if (selectedSemester !== 'All') {
    filtered = filtered.filter(doc => doc.semester === selectedSemester);
  }

  // 4. Lọc nâng cao theo Instructor
  if (selectedInstructor !== 'All') {
    filtered = filtered.filter(doc => doc.instructor === selectedInstructor);
  }

  // 5. Lọc nâng cao theo trạng thái Read/Unread/Bookmarked
  if (selectedStatus !== 'All') {
    if (selectedStatus === 'Read') {
      filtered = filtered.filter(doc => readDocs[doc.id] === true);
    } else if (selectedStatus === 'Unread') {
      filtered = filtered.filter(doc => !readDocs[doc.id]);
    } else if (selectedStatus === 'Bookmarked') {
      filtered = filtered.filter(doc => favoriteDocs[doc.id] === true);
    }
  }

  // Áp dụng sắp xếp (Sort)
  if (selectedSort === 'views') {
    filtered = [...filtered].sort((a, b) => parseStatValue(b.views) - parseStatValue(a.views));
  } else if (selectedSort === 'downloads') {
    filtered = [...filtered].sort((a, b) => parseStatValue(b.downloads) - parseStatValue(a.downloads));
  } else if (selectedSort === 'az') {
    filtered = [...filtered].sort((a, b) => a.title.localeCompare(b.title));
  } else if (selectedSort === 'za') {
    filtered = [...filtered].sort((a, b) => b.title.localeCompare(a.title));
  } else {
    // Sắp xếp mặc định: Mới nhất (id tăng dần theo mock data gốc)
    filtered = [...filtered].sort((a, b) => a.id - b.id);
  }

  // Cấu hình phân trang: hiển thị tối đa 9 tài liệu mỗi trang
  const ITEMS_PER_PAGE = 9;
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE) || 1;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedDocuments = filtered.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className="doc-library-container">
      {/* Tiêu đề & Chọn kiểu hiển thị Grid/List */}
      <DocumentLibraryHeader viewType={viewType} setViewType={setViewType} />

      {/* Bộ Lọc (Filters) */}
      <DocumentLibraryFilters 
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedFormat={selectedFormat}
        setSelectedFormat={setSelectedFormat}
        selectedSort={selectedSort}
        setSelectedSort={setSelectedSort}
        showMoreFilters={showMoreFilters}
        setShowMoreFilters={setShowMoreFilters}
      />

      {/* Bảng điều khiển bộ lọc nâng cao (More Filters Panel) */}
      {showMoreFilters && (
        <div className="more-filters-panel">
          <div className="more-filters-group">
            <label>Semester</label>
            <select
              value={selectedSemester}
              onChange={(e) => setSelectedSemester(e.target.value)}
              aria-label="Filter by Semester"
            >
              <option value="All">All Semesters</option>
              <option value="Block 1">Block 1</option>
              <option value="Block 2">Block 2</option>
              <option value="Summer">Học kỳ Summer</option>
              <option value="Fall">Học kỳ Fall</option>
              <option value="Spring">Học kỳ Spring</option>
            </select>
          </div>

          <div className="more-filters-group">
            <label>Instructors</label>
            <select
              value={selectedInstructor}
              onChange={(e) => setSelectedInstructor(e.target.value)}
              aria-label="Filter by Instructor"
            >
              <option value="All">All Instructors</option>
              {instructors.map((ins, idx) => (
                <option key={idx} value={ins}>{ins}</option>
              ))}
            </select>
          </div>

          <div className="more-filters-group">
            <label>Status</label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              aria-label="Filter by Status"
            >
              <option value="All">All Statuses</option>
              <option value="Read">Tài liệu đã đọc</option>
              <option value="Unread">Tài liệu chưa đọc</option>
              <option value="Bookmarked">Tài liệu yêu thích (Bookmark)</option>
            </select>
          </div>
        </div>
      )}

      {/* Hiển thị danh sách dạng Grid hoặc List */}
      {paginatedDocuments.length > 0 ? (
        viewType === 'grid' ? (
          <div className="library-cards-grid">
            {paginatedDocuments.map((doc) => (
              <DocumentLibraryCard 
                key={doc.id} 
                doc={doc} 
                isFavorite={!!favoriteDocs[doc.id]}
                onToggleFavorite={handleToggleFavorite}
                onMarkAsRead={handleMarkAsRead}
                onAuthRequired={() => {}} 
              />
            ))}
          </div>
        ) : (
          <div className="library-list-view">
            {paginatedDocuments.map((doc) => (
              <DocumentLibraryRow 
                key={doc.id} 
                doc={doc} 
                onMarkAsRead={handleMarkAsRead}
                onAuthRequired={() => {}} 
              />
            ))}
          </div>
        )
      ) : (
        <div className="quizzes-empty-state" style={{ margin: '20px 0' }}>
          <h3>Không tìm thấy tài liệu phù hợp</h3>
          <p>Hãy thử thay đổi các bộ lọc nâng cao hoặc lựa chọn định dạng khác.</p>
        </div>
      )}

      {/* GỌI BÀN GIAO COMPONENT PHÂN TRANG HIỂN THỊ Ở ĐÂY */}
      {totalPages > 1 && (
        <Pagination 
          currentPage={currentPage} 
          totalPages={totalPages} 
          onPageChange={setCurrentPage} 
        />
      )}
    </div>
  );
};

export default DocumentLibrary;