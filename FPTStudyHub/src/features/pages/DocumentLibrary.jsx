import React, { useState, useEffect } from 'react';
import './DocumentLibrary.css';
import DocumentLibraryHeader from '../documentlibrary/components/DocumentLibraryHeader';
import DocumentLibraryFilters from '../documentlibrary/components/DocumentLibraryFilters';
import DocumentLibraryCard from '../documentlibrary/components/DocumentLibraryCard';
import DocumentLibraryRow from '../documentlibrary/components/DocumentLibraryRow';
import Pagination from '../../shared/components/Pagination/Pagination.jsx';
import axiosClient from '../../utils/axiosClient';
import { AlertTriangle, X } from 'lucide-react';

const enrichDocument = (doc) => {
  // ĐÃ SỬA: Thay vì lấy subjectName, giờ ta lấy majorName từ Backend
  const category = doc.subject?.majorName || 'Chung (General)';

  const semester = doc.semester?.displayName || doc.semester?.semesterName || 'Khác';
  const format = doc.fileName ? doc.fileName.split('.').pop().toUpperCase() : 'DOC';

  return {
    ...doc,
    id: doc.materialId, 
    category,
    semester,
    format,
    instructor: doc.account?.userName || 'Anonymous',
    views: doc.viewCount || 0,
    downloads: doc.downloadCount || 0,
    date: doc.createdAt ? new Date(doc.createdAt).toLocaleDateString('vi-VN') : 'N/A'
  };
};

const DocumentLibrary = () => {
  const [documents, setDocuments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [currentUser, setCurrentUser] = useState(''); 
  const [viewType, setViewType] = useState('grid');
  const [currentPage, setCurrentPage] = useState(1); 

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedFormat, setSelectedFormat] = useState('All');
  const [selectedSort, setSelectedSort] = useState('recent');
  const [showMoreFilters, setShowMoreFilters] = useState(false);
  const [selectedSemester, setSelectedSemester] = useState('All');
  const [selectedInstructor, setSelectedInstructor] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');

  const [favoriteDocs, setFavoriteDocs] = useState({}); 
  const [readDocs, setReadDocs] = useState({}); 

  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [reportingDoc, setReportingDoc] = useState(null);
  const [reportReason, setReportReason] = useState('');
  const [isSubmittingReport, setIsSubmittingReport] = useState(false);

  const getUsernameFromToken = () => {
    const token = localStorage.getItem('token') || localStorage.getItem('api_token');
    if (!token) return '';
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.sub || payload.userName || payload.username || '';
    } catch (e) {
      return '';
    }
  };

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setIsLoading(true);
        setCurrentUser(getUsernameFromToken());

        try {
          const docsRes = await axiosClient.get('/api/v1/documents');
          setDocuments(docsRes || []);
        } catch (e) { console.error("Lỗi lấy tài liệu", e); }
        
        try {
          const favRes = await axiosClient.get('/api/v1/favorites/my-favorites');
          const list = Array.isArray(favRes) ? favRes : (favRes?.result || []);
          
          if (list.length > 0) {
            const favMap = {};
            list.forEach(mat => {
              if (mat && mat.materialId) favMap[mat.materialId] = true;
            });
            setFavoriteDocs(favMap);
          }
        } catch (e) { console.warn("Lỗi tải yêu thích", e); }

      } catch (error) {
        console.error("Lỗi tổng thể kết nối Server:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchInitialData();
  }, []);

  const handleToggleFavorite = async (id) => {
    setFavoriteDocs(prev => ({ ...prev, [id]: !prev[id] }));
    try {
      await axiosClient.post(`/api/v1/favorites/toggle?materialId=${id}`);
    } catch (error) {
      setFavoriteDocs(prev => ({ ...prev, [id]: !prev[id] }));
      alert("Không thể cập nhật danh sách yêu thích lúc này.");
    }
  };

  const handleMarkAsRead = (id) => setReadDocs(prev => ({ ...prev, [id]: true }));

  const handleOpenReport = (doc) => {
    setReportingDoc(doc);
    setReportReason('');
    setIsReportModalOpen(true);
  };

  const handleSubmitReport = async () => {
    if (!reportReason.trim()) {
      alert("Vui lòng nhập lý do báo cáo!");
      return;
    }
    setIsSubmittingReport(true);
    try {
      await axiosClient.post('/api/reports', {
        materialId: reportingDoc.materialId,
        description: reportReason
      });
      alert(`Đã gửi báo cáo cho tài liệu: ${reportingDoc.title}. Cảm ơn bạn!`);
      setIsReportModalOpen(false);
    } catch (error) {
      alert(error.response?.data?.message || 'Lỗi khi gửi báo cáo!');
    } finally {
      setIsSubmittingReport(false);
    }
  };

  const handleDeleteDocument = async (doc) => {
    if (window.confirm(`Bạn có chắc chắn muốn xóa vĩnh viễn tài liệu "${doc.title}" không? Hành động này không thể hoàn tác.`)) {
      try {
        await axiosClient.delete(`/api/v1/documents/${doc.materialId}`);
        alert("Đã xóa tài liệu thành công!");
        setDocuments(prev => prev.filter(d => d.materialId !== doc.materialId));
      } catch (error) {
        alert(error.response?.data?.message || "Lỗi khi xóa tài liệu!");
      }
    }
  };

  const handleToggleVisibility = async (doc) => {
    const newVisibility = doc.visibility === 'PRIVATE' ? 'PUBLIC' : 'PRIVATE';
    const confirmMsg = newVisibility === 'PUBLIC' 
      ? `Bạn muốn CÔNG KHAI tài liệu "${doc.title}" cho mọi người cùng xem?`
      : `Bạn muốn ẨN tài liệu "${doc.title}" thành RIÊNG TƯ?`;

    if (window.confirm(confirmMsg)) {
      setDocuments(prev => prev.map(d => 
        d.materialId === doc.materialId ? { ...d, visibility: newVisibility } : d
      ));

      try {
        await axiosClient.put(`/api/v1/documents/${doc.materialId}/visibility`, {
          visibility: newVisibility
        });
      } catch (error) {
        setDocuments(prev => prev.map(d => 
          d.materialId === doc.materialId ? { ...d, visibility: doc.visibility } : d
        ));
        alert(error.response?.data?.message || "Đã xảy ra lỗi khi cập nhật trạng thái!");
      }
    }
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, selectedFormat, selectedSort, selectedSemester, selectedInstructor, selectedStatus]);

  const enrichedDocs = documents.map(enrichDocument);

  // ĐÃ SỬA: Tự động trích xuất danh sách các Chuyên Ngành/Môn học hiện có từ dữ liệu tải về
  const categories = Array.from(new Set(enrichedDocs.map(doc => doc.category)));
  const instructors = Array.from(new Set(enrichedDocs.map(doc => doc.instructor)));
  const semesters = Array.from(new Set(enrichedDocs.map(doc => doc.semester)));

  let filtered = enrichedDocs;
  
  // BỘ LỌC CHUYÊN NGÀNH HOẠT ĐỘNG
  if (selectedCategory !== 'All') filtered = filtered.filter(doc => doc.category === selectedCategory);
  
  if (selectedFormat !== 'All') {
    if (selectedFormat === 'ZIP/RAR') filtered = filtered.filter(doc => doc.format === 'ZIP' || doc.format === 'RAR');
    else filtered = filtered.filter(doc => doc.format === selectedFormat);
  }
  if (selectedSemester !== 'All') filtered = filtered.filter(doc => doc.semester === selectedSemester);
  if (selectedInstructor !== 'All') filtered = filtered.filter(doc => doc.instructor === selectedInstructor);
  
  if (selectedStatus !== 'All') {
    if (selectedStatus === 'Read') filtered = filtered.filter(doc => readDocs[doc.id] === true);
    else if (selectedStatus === 'Unread') filtered = filtered.filter(doc => !readDocs[doc.id]);
    else if (selectedStatus === 'Bookmarked') filtered = filtered.filter(doc => favoriteDocs[doc.id] === true);
  }

  if (selectedSort === 'views') filtered = [...filtered].sort((a, b) => b.views - a.views);
  else if (selectedSort === 'downloads') filtered = [...filtered].sort((a, b) => b.downloads - a.downloads);
  else if (selectedSort === 'az') filtered = [...filtered].sort((a, b) => a.title.localeCompare(b.title));
  else if (selectedSort === 'za') filtered = [...filtered].sort((a, b) => b.title.localeCompare(a.title));
  else filtered = [...filtered].sort((a, b) => b.id - a.id);

  const ITEMS_PER_PAGE = 9;
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE) || 1;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedDocuments = filtered.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className="doc-library-container">
      <DocumentLibraryHeader viewType={viewType} setViewType={setViewType} />
      
      {/* ĐÃ THÊM: Truyền mảng categories (Chuyên ngành động) xuống component con */}
      <DocumentLibraryFilters 
        selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}
        selectedFormat={selectedFormat} setSelectedFormat={setSelectedFormat}
        selectedSort={selectedSort} setSelectedSort={setSelectedSort}
        showMoreFilters={showMoreFilters} setShowMoreFilters={setShowMoreFilters}
        categories={categories} 
      />

      {showMoreFilters && (
        <div className="more-filters-panel">
          <div className="more-filters-group">
            <label>Semester</label>
            <select value={selectedSemester} onChange={(e) => setSelectedSemester(e.target.value)}>
              <option value="All">All Semesters</option>
              {semesters.map((sem, idx) => <option key={idx} value={sem}>{sem}</option>)}
            </select>
          </div>
          <div className="more-filters-group">
            <label>Instructors (Users)</label>
            <select value={selectedInstructor} onChange={(e) => setSelectedInstructor(e.target.value)}>
              <option value="All">All Instructors</option>
              {instructors.map((ins, idx) => <option key={idx} value={ins}>{ins}</option>)}
            </select>
          </div>
          <div className="more-filters-group">
            <label>Status</label>
            <select value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)}>
              <option value="All">All Statuses</option>
              <option value="Bookmarked">⭐ Tài liệu yêu thích</option>
              <option value="Read">Tài liệu đã đọc</option>
              <option value="Unread">Tài liệu chưa đọc</option>
            </select>
          </div>
        </div>
      )}

      {isLoading ? (
        <div className="loading-state" style={{ textAlign: 'center', padding: '50px 0' }}>
          <h3>Đang tải thư viện tài liệu...</h3>
        </div>
      ) : paginatedDocuments.length > 0 ? (
        viewType === 'grid' ? (
          <div className="library-cards-grid">
            {paginatedDocuments.map((doc) => (
              <DocumentLibraryCard 
                key={doc.id} 
                doc={doc} 
                currentUser={currentUser} 
                isFavorite={!!favoriteDocs[doc.id]}
                onToggleFavorite={handleToggleFavorite}
                onMarkAsRead={handleMarkAsRead}
                onReport={handleOpenReport}
                onDelete={handleDeleteDocument}
                onToggleVisibility={handleToggleVisibility}
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
              />
            ))}
          </div>
        )
      ) : (
        <div className="quizzes-empty-state" style={{ margin: '20px 0' }}>
          <h3>Không tìm thấy tài liệu phù hợp</h3>
          <p>Hãy thử thay đổi các bộ lọc hoặc chọn mục khác.</p>
        </div>
      )}

      {totalPages > 1 && (
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
      )}

      {/* MODAL BÁO CÁO TÀI LIỆU */}
      {isReportModalOpen && (
        <div className="modal-overlay" onClick={() => setIsReportModalOpen(false)}>
          <div className="modal-content report-modal" onClick={(e) => e.stopPropagation()}>
            <div className="report-modal-header">
              <div className="modal-icon-wrapper warning-bg">
                <AlertTriangle size={24} className="warning-text" />
              </div>
              <button className="close-btn" onClick={() => setIsReportModalOpen(false)}><X size={20}/></button>
            </div>
            
            <h3 className="modal-title" style={{ textAlign: 'left', marginTop: '15px' }}>Báo cáo vi phạm</h3>
            <p className="modal-description" style={{ textAlign: 'left', marginBottom: '15px' }}>
              Bạn đang báo cáo tài liệu: <strong>{reportingDoc?.title}</strong>.<br/>
              Vui lòng cho quản trị viên biết lý do chi tiết (VD: Spam, sai kiến thức, bản quyền...).
            </p>

            <textarea 
              className="form-textarea" 
              rows="4" 
              placeholder="Nhập lý do báo cáo của bạn..."
              value={reportReason}
              onChange={(e) => setReportReason(e.target.value)}
              style={{ width: '100%', marginBottom: '20px', padding: '10px', borderRadius: '8px', border: '1px solid #d0d5dd' }}
            />

            <div className="modal-actions" style={{ justifyContent: 'flex-end', gap: '10px' }}>
              <button className="modal-btn btn-cancel" onClick={() => setIsReportModalOpen(false)} disabled={isSubmittingReport}>
                Hủy
              </button>
              <button className="modal-btn btn-confirm" style={{ backgroundColor: '#ef4444' }} onClick={handleSubmitReport} disabled={isSubmittingReport}>
                {isSubmittingReport ? 'Đang gửi...' : 'Gửi Báo Cáo'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentLibrary;