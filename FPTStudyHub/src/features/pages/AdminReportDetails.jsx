import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ChevronRight, Clock, User, AlertTriangle, FileText, Download } from 'lucide-react';
import axiosClient from '../../utils/axiosClient';
import { getDirectImageUrl } from '../../utils/imageHelper'; // ĐÃ THÊM IMPORT HÀM XỬ LÝ ẢNH
import './AdminReportDetails.css';

const AdminReportDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const reportId = location.state?.reportId;

  const [reportData, setReportData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // States quản lý Form
  const [status, setStatus] = useState('');
  const [userStatus, setUserStatus] = useState('');
  const [internalNotes, setInternalNotes] = useState('');

  // 1. GỌI API LẤY CHI TIẾT REPORT
  useEffect(() => {
    if (!reportId) {
      navigate('/admin/reports');
      return;
    }

    const fetchReportDetail = async () => {
      try {
        const response = await axiosClient.get(`/api/reports/${reportId}`);
        const data = response.result || response; // Tuỳ cấu trúc bọc ApiResponse của bạn
        
        setReportData(data);
        setStatus(data.status || 'PENDING'); 
        setUserStatus(data.reportedUser?.accountStatus || 'ACTIVE');
        setInternalNotes(data.internalNotes || '');
      } catch (error) {
        console.error("Lỗi tải chi tiết report:", error);
        alert("Không thể tải thông tin báo cáo!");
        navigate('/admin/reports');
      } finally {
        setIsLoading(false);
      }
    };

    fetchReportDetail();
  }, [reportId, navigate]);

  // 2. LƯU THAY ĐỔI XUỐNG BACKEND
  const handleSave = async () => {
    setIsSaving(true);
    try {
      // 2.1 Cập nhật trạng thái và ghi chú của Report
      if (status !== reportData.status || internalNotes !== reportData.internalNotes) {
        await axiosClient.put(`/api/reports/${reportId}`, {
          status: status,
          internalNotes: internalNotes
        });
      }

      // 2.2 Nếu Admin đổi trạng thái tài khoản của người vi phạm -> Gọi API khoá acc
      if (userStatus !== reportData.reportedUser?.accountStatus) {
        await axiosClient.put(`/api/account/${reportData.reportedUser.accountId}/status`);
      }

      alert('Đã xử lý báo cáo thành công!');
      navigate('/admin/reports');
    } catch (error) {
      console.error("Lỗi khi lưu:", error);
      alert(error.response?.data?.message || 'Có lỗi xảy ra khi xử lý!');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading || !reportData) {
    return <div style={{ padding: '40px', textAlign: 'center' }}>Loading survey data...</div>;
  }

  // Phân tách dữ liệu cho dễ render
  const reporter = reportData.reporter || {};
  const reportedUser = reportData.reportedUser || {};
  const material = reportData.material || {};

  return (
    <div className="admin-page-container">
      {/* Breadcrumb */}
      <div className="breadcrumb-wrapper">
        <div className="breadcrumb">
          <span className="breadcrumb-link" onClick={() => navigate('/admin/reports')}>Reports</span>
          <ChevronRight size={14} className="breadcrumb-separator" />
          <span className="breadcrumb-current">Investigation</span>
        </div>
      </div>

      {/* Page Header */}
      <div className="report-details-header">
        <div className="report-title-wrapper">
          <h1 className="admin-page-title mb-0">Report #{reportData.reportId}</h1>
          <span className={`badge-under-review ${status.toLowerCase().replace('_', '-')}`}>{status}</span>
        </div>
        <button className="btn-export">
          <Download size={16} /> Export PDF
        </button>
      </div>

      <div className="details-layout">
        {/* Left Column: Report Info */}
        <div className="details-main">
          
          <div className="section-card mb-24">
            <div className="section-body">
              <h3 className="section-subtitle">Metadata Information</h3>
              <div className="metadata-grid">
                <div className="metadata-item">
                  <span className="metadata-label">Violation Document ID</span>
                  <span className="metadata-value text-primary cursor-pointer">
                    {material.materialId ? `#${material.materialId} - ${material.title}` : 'Not specified'}
                  </span>
                </div>
                <div className="metadata-item">
                  <span className="metadata-label">Report Date</span>
                  <span className="metadata-value">{new Date(reportData.createdAt).toLocaleString('vi-VN')}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Users Row */}
          <div className="users-row mb-24">
            {/* Reporter */}
            <div className="user-card reporter-card">
              <div className="user-card-header">
                <User size={16} className="text-secondary" />
                <span className="user-card-role">Reporter</span>
              </div>
              <div className="user-card-body">
                {/* ĐÃ CẬP NHẬT CẤU TRÚC ẢNH AVATAR NGƯỜI TỐ CÁO */}
                <img 
                  src={reporter.avatarUrl ? getDirectImageUrl(reporter.avatarUrl) : `https://ui-avatars.com/api/?name=${reporter.fullName || reporter.userName || 'R'}&background=random`} 
                  alt="Reporter" 
                  className="user-avatar-md"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    e.target.src = `https://ui-avatars.com/api/?name=${reporter.fullName || reporter.userName || 'R'}&background=random`;
                  }}
                />
                <div className="user-info">
                  <h4 className="user-name">{reporter.fullName || reporter.userName}</h4>
                  <p className="user-email">{reporter.email}</p>
                  <p className="user-id">Account ID: {reporter.accountId}</p>
                </div>
              </div>
            </div>

            {/* Reported User */}
            <div className="user-card reported-card">
              <div className="user-card-header d-flex-between">
                <div className="d-flex-align-center gap-8">
                  <User size={16} className="text-secondary" />
                  <span className="user-card-role">Reported User (Owner)</span>
                </div>
                <span className="badge-flagged">FLAGGED</span>
              </div>
              <div className="user-card-body">
                {/* ĐÃ CẬP NHẬT CẤU TRÚC ẢNH AVATAR NGƯỜI BỊ TỐ CÁO */}
                <img 
                  src={reportedUser.avatarUrl ? getDirectImageUrl(reportedUser.avatarUrl) : `https://ui-avatars.com/api/?name=${reportedUser.fullName || reportedUser.userName || 'U'}&background=random`} 
                  alt="Reported User" 
                  className="user-avatar-md"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    e.target.src = `https://ui-avatars.com/api/?name=${reportedUser.fullName || reportedUser.userName || 'U'}&background=random`;
                  }}
                />
                <div className="user-info">
                  <h4 className="user-name">{reportedUser.fullName || reportedUser.userName}</h4>
                  <p className="user-email">{reportedUser.email}</p>
                  <p className="user-id">Account ID: {reportedUser.accountId}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Nội dung báo cáo */}
          <div className="section-card">
            <div className="section-header">
              <div className="section-title-wrapper">
                <FileText size={18} className="text-warning" />
                <h3 className="section-title">Reason & Content of Report</h3>
              </div>
            </div>
            <div className="section-body bg-light-gray">
              <p className="investigation-text" style={{ whiteSpace: 'pre-line' }}>
                "{reportData.description}"
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Actions */}
        <div className="details-sidebar">
          <div className="section-card">
            <div className="section-header border-bottom-0 pb-0">
              <div className="section-title-wrapper text-warning mb-16">
                <AlertTriangle size={18} />
                <h3 className="section-title">Processing Decision</h3>
              </div>
            </div>
            
            <div className="section-body pt-16">
              <div className="form-group">
                <label className="form-label">Update Report Status</label>
                <select className="form-select" value={status} onChange={(e) => setStatus(e.target.value)}>
                  <option value="PENDING">Pending</option>
                  <option value="UNDER_REVIEW">Under Review</option>
                  <option value="RESOLVED">Resolved</option>
                </select>
              </div>

              {/* Phạt tài khoản người dùng */}
              <div className="form-group mt-16">
                <label className="form-label">Penalty for Violating Account</label>
                <select className="form-select" value={userStatus} onChange={(e) => setUserStatus(e.target.value)}>
                  <option value="ACTIVE">Normal (Active)</option>
                  <option value="INACTIVE">Lock Account (Inactive)</option>
                </select>
                <span style={{ fontSize: '12px', color: '#667085', marginTop: '4px', display: 'block' }}>
                  Note: This change will revoke the user's login privileges.
                </span>
              </div>

              <div className="form-group mb-24 mt-16">
                <div className="d-flex-between mb-8">
                  <label className="form-label mb-0">Internal Notes</label>
                  <span className="text-muted text-xs">Only Admin can see</span>
                </div>
                <textarea 
                  className="form-textarea" 
                  rows="4" 
                  value={internalNotes}
                  onChange={(e) => setInternalNotes(e.target.value)}
                  placeholder="Record the results of your investigation...."
                ></textarea>
              </div>

              <div className="action-buttons-group">
                <button className="btn-action-warning" onClick={handleSave} disabled={isSaving}>
                  <AlertTriangle size={16} />
                  {isSaving ? 'Saving...' : 'Save Decision'}
                </button>
                <button className="btn-action-secondary" onClick={() => navigate('/admin/reports')}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminReportDetails;