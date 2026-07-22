import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ChevronRight, ArrowLeft, Download, FileText, Trash2, ShieldAlert, CheckSquare, X, Filter } from 'lucide-react';
import axiosClient from '../../utils/axiosClient';
import { getDirectImageUrl } from '../../utils/imageHelper'; // ĐÃ THÊM IMPORT HÀM XỬ LÝ ẢNH
import './AdminDocumentInvestigation.css';

const AdminDocumentInvestigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Lấy materialId nếu được truyền từ trang khác sang (nếu không có thì hiển thị tất cả báo cáo)
  const filterMaterialId = location.state?.materialId || null;
  
  const [reports, setReports] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  
  const [selectedReport, setSelectedReport] = useState(null);
  const [reportStatus, setReportStatus] = useState('');
  const [userStatus, setUserStatus] = useState('');
  const [internalNotes, setInternalNotes] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  // 1. GỌI API LẤY DANH SÁCH BÁO CÁO
  const fetchReports = async () => {
    try {
      setIsLoading(true);
      const response = await axiosClient.get('/api/reports');
      let data = response.result || response;

      // Nếu có filterMaterialId, chỉ hiển thị báo cáo của tài liệu đó
      if (filterMaterialId) {
        data = data.filter(r => r.material?.materialId === filterMaterialId);
      }
      setReports(data);
    } catch (error) {
      console.error("Lỗi tải danh sách báo cáo:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, [filterMaterialId]);

  // 2. LỌC BÁO CÁO THEO TRẠNG THÁI (Tabs)
  const filteredReports = reports.filter(report => {
    if (statusFilter === 'all') {
      return report.status !== 'RESOLVED';
    }
    return report.status === statusFilter.toUpperCase();
  });

  const totalReports = reports.length;

  // Lấy thông tin tài liệu (dựa trên báo cáo đầu tiên trong danh sách nếu có)
  const documentInfo = reports.length > 0 ? {
    id: reports[0].material?.materialId,
    title: reports[0].material?.title,
    authorName: reports[0].reportedUser?.fullName || reports[0].reportedUser?.userName,
    // ĐÃ CẬP NHẬT: XỬ LÝ LINK ẢNH AVATAR NGAY TỪ LÚC LẤY DỮ LIỆU
    authorAvatar: reports[0].reportedUser?.avatarUrl ? getDirectImageUrl(reports[0].reportedUser.avatarUrl) : `https://ui-avatars.com/api/?name=${reports[0].reportedUser?.userName || 'U'}&background=random`,
    authorId: reports[0].reportedUser?.accountId
  } : {
    id: filterMaterialId || 'N/A',
    title: filterMaterialId ? 'Tài liệu đang bị báo cáo' : 'Tất cả Báo cáo hệ thống',
    authorName: 'N/A',
    authorAvatar: 'https://ui-avatars.com/api/?name=N/A',
    authorId: null
  };

  // 3. MỞ BẢNG CHI TIẾT
  const openReportDetails = (report) => {
    setSelectedReport(report);
    setReportStatus(report.status);
    setUserStatus(report.reportedUser?.accountStatus || 'ACTIVE');
    setInternalNotes(report.internalNotes || '');
  };

  const closeReportDetails = () => {
    setSelectedReport(null);
  };

  // 4. LƯU QUYẾT ĐỊNH XỬ LÝ (Gọi API)
  const handleSaveModeration = async () => {
    setIsSaving(true);
    try {
      // Cập nhật trạng thái báo cáo
      if (reportStatus !== selectedReport.status || internalNotes !== selectedReport.internalNotes) {
        await axiosClient.put(`/api/reports/${selectedReport.reportId}`, {
          status: reportStatus,
          internalNotes: internalNotes
        });
      }
      
      // Nếu trạng thái User thay đổi, gọi API khóa/mở khóa tài khoản
      if (userStatus !== selectedReport.reportedUser?.accountStatus) {
         await axiosClient.put(`/api/account/${selectedReport.reportedUser.accountId}/status`);
      }
      
      alert(`Đã lưu quyết định xử lý cho báo cáo #${selectedReport.reportId}`);
      closeReportDetails();
      fetchReports(); // Tải lại danh sách mới nhất
    } catch (error) {
      alert("Lỗi khi lưu quyết định: " + (error.response?.data?.message || error.message));
    } finally {
      setIsSaving(false);
    }
  };

  // Hàm tiện ích hiển thị
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleString('vi-VN');
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'PENDING': return <span className="status-badge pending">PENDING</span>;
      case 'UNDER_REVIEW': return <span className="status-badge review">IN REVIEW</span>;
      case 'RESOLVED': return <span className="status-badge resolved">RESOLVED</span>;
      default: return <span className="status-badge">{status}</span>;
    }
  };

  return (
    <div className="admin-page-container document-investigation-page">
      <div className="investigation-top-header">
        <button className="btn-back-clean" onClick={() => navigate('/admin')}>
          <ArrowLeft size={18} /> Dashboard
        </button>
      </div>

      <div className="investigation-content">
        <div className="breadcrumb-wrapper mb-16">
          <div className="breadcrumb">
            <span className="breadcrumb-link" onClick={() => navigate('/admin')}>Report Management</span>
            <ChevronRight size={14} className="breadcrumb-separator" />
            <span className="breadcrumb-current">{documentInfo.title}</span>
          </div>
        </div>

        <div className="report-details-header mb-24">
          <div className="report-title-wrapper">
            <h1 className="admin-page-title mb-0">{documentInfo.title}</h1>
            {totalReports > 0 && <span className="badge-critical"><ShieldAlert size={14} /> Needs to be addressed</span>}
          </div>
        </div>

        {/* Bảng thông tin tổng quan */}
        <div className="investigation-actions-row mb-24">
          <div className="investigation-doc-card">
            <div className="doc-icon-box">
              <FileText size={24} className="text-secondary" />
            </div>
            <div className="doc-info-cols">
              <div className="doc-info-col">
                <span className="doc-info-label">Document ID</span>
                <span className="doc-info-value">{documentInfo.id}</span>
              </div>
              <div className="doc-info-col">
                <span className="doc-info-label">Uploader</span>
                <div className="uploader-info">
                  {/* ĐÃ CẬP NHẬT CẤU TRÚC ẢNH AVATAR NGƯỜI ĐĂNG */}
                  <img 
                    src={documentInfo.authorAvatar} 
                    alt="Uploader" 
                    className="uploader-avatar" 
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      e.target.src = `https://ui-avatars.com/api/?name=${documentInfo.authorName || 'U'}&background=random`;
                    }}
                  />
                  <span className="doc-info-value">{documentInfo.authorName}</span>
                </div>
              </div>
              <div className="doc-info-col">
                <span className="doc-info-label">Total Reports</span>
                <span className="doc-info-value text-danger font-bold">{totalReports}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Giao diện Bảng & Bảng điều khiển */}
        <div className={`investigation-layout ${selectedReport ? 'panel-open' : ''}`}>
          
          {/* Main Table */}
          <div className="investigation-table-container">
            <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '16px 24px', borderBottom: '1px solid #eaebf0' }}>
              <div className="filter-dropdown-container">
                <Filter size={16} className="filter-dropdown-icon" />
                <select 
                  className="btn-filter select-filter-with-icon"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="all">Needs to be addressed (Pending + Review)</option>
                  <option value="Pending">Pending</option>
                  <option value="Under Review">Under Review</option>
                  <option value="Resolved">Resolved</option>
                </select>
              </div>
            </div>
            
            {isLoading ? (
              <div style={{ padding: '40px', textAlign: 'center' }}>Loading report list...</div>
            ) : (
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Report ID</th>
                    <th>Reporter</th>
                    <th>Reason</th>
                    <th>Submitted Date</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredReports.map((report) => (
                    <tr 
                      key={report.reportId} 
                      className={selectedReport?.reportId === report.reportId ? 'selected-row' : ''}
                      onClick={() => openReportDetails(report)}
                      style={{ cursor: 'pointer' }}
                    >
                      <td className="report-id-cell">#{report.reportId}</td>
                      <td>
                        <div className="user-cell">
                          {/* ĐÃ CẬP NHẬT CẤU TRÚC ẢNH AVATAR NGƯỜI TỐ CÁO */}
                          <img 
                            src={report.reporter?.avatarUrl ? getDirectImageUrl(report.reporter.avatarUrl) : `https://ui-avatars.com/api/?name=${report.reporter?.userName || 'U'}&background=random`} 
                            alt={report.reporter?.userName || 'Reporter'} 
                            className="user-cell-avatar"
                            referrerPolicy="no-referrer"
                            onError={(e) => {
                              e.target.src = `https://ui-avatars.com/api/?name=${report.reporter?.userName || 'U'}&background=random`;
                            }}
                          />
                          <span className="user-cell-name">{report.reporter?.fullName || report.reporter?.userName}</span>
                        </div>
                      </td>
                      <td>
                         <span className="reason-badge inappropriate" title={report.description}>
                            {report.description?.length > 30 ? report.description.substring(0, 30) + '...' : report.description}
                         </span>
                      </td>
                      <td className="date-cell">{formatDate(report.createdAt)}</td>
                      <td>{getStatusBadge(report.status)}</td>
                      <td className="td-actions">
                        <button className="text-action-btn view-record" onClick={(e) => { e.stopPropagation(); openReportDetails(report); }}>
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                  {filteredReports.length === 0 && (
                     <tr>
                        <td colSpan="6" style={{ textAlign: 'center', padding: '30px' }}>No reports found in this status.</td>
                     </tr>
                  )}
                </tbody>
              </table>
            )}
            
            <div className="table-footer">
              <div className="pagination-info">Đang hiển thị {filteredReports.length} / {totalReports} báo cáo</div>
            </div>
          </div>

          {/* Side Panel (Khu vực xử lý) */}
          {selectedReport && (
            <div className="investigation-side-panel">
              <div className="side-panel-header">
                <h3 className="side-panel-title">Report Details #{selectedReport.reportId}</h3>
                <button className="btn-close-panel" onClick={closeReportDetails}><X size={20} /></button>
              </div>
              
              <div className="side-panel-content">
                <div className="panel-section mb-24">
                  <h4 className="panel-section-title">Report Content</h4>
                  <div className="bg-light-gray p-16 br-8">
                    <p className="investigation-text m-0" style={{ whiteSpace: 'pre-line' }}>{selectedReport.description}</p>
                  </div>
                </div>

                <div className="panel-section">
                  <div className="d-flex-align-center gap-8 mb-16 text-warning">
                    <ShieldAlert size={18} />
                    <h4 className="panel-section-title m-0">Processing Decision</h4>
                  </div>
                  
                  <div className="form-group mb-16">
                    <label className="form-label">Update Report Status</label>
                    <select className="form-select" value={reportStatus} onChange={(e) => setReportStatus(e.target.value)}>
                      <option value="PENDING">Pending</option>
                      <option value="UNDER_REVIEW">Under Review</option>
                      <option value="RESOLVED">Resolved</option>
                    </select>
                  </div>

                  <div className="form-group mb-16">
                    <label className="form-label">Penalty for Violating Account</label>
                    <select className="form-select" value={userStatus} onChange={(e) => setUserStatus(e.target.value)}>
                      <option value="ACTIVE">Normal (Active)</option>
                      <option value="INACTIVE">Lock Account (Inactive)</option>
                    </select>
                  </div>

                  <div className="form-group mb-24">
                    <div className="d-flex-between mb-8">
                      <label className="form-label mb-0">Internal Notes</label>
                      <span className="text-muted text-xs">Only Admin can see</span>
                    </div>
                    <textarea 
                      className="form-textarea" 
                      rows="4" 
                      value={internalNotes}
                      onChange={(e) => setInternalNotes(e.target.value)}
                      placeholder="Ghi lại kết quả điều tra của bạn để Manager xem..."
                    ></textarea>
                  </div>

                  <div className="action-buttons-group">
                    <button className="btn-action-warning" onClick={handleSaveModeration} disabled={isSaving}>
                      <ShieldAlert size={16} />
                      {isSaving ? 'Đang lưu...' : 'Lưu Quyết Định'}
                    </button>
                    <button className="btn-action-secondary" onClick={closeReportDetails}>
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDocumentInvestigation;