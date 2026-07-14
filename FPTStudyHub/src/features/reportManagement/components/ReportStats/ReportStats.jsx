import React from 'react';
import { ClipboardList, CheckCircle, TrendingUp } from 'lucide-react';
import './ReportStats.css';

// Nhận props reports từ file cha thay vì dùng mock data
const ReportStats = ({ reports = [], isLoading = false }) => {
  // Lọc theo trạng thái chuẩn của Backend
  const pendingCount = reports.filter(r => r.status === 'PENDING').length;
  const resolvedCount = reports.filter(r => r.status === 'RESOLVED').length;

  return (
    <div className="report-stats-container">
      <div className="stat-card">
        <div className="stat-card-header">
          <div className="stat-card-content">
            <p className="stat-label">TỔNG CHỜ XỬ LÝ (PENDING)</p>
            <h2 className="stat-value">{isLoading ? '...' : pendingCount}</h2>
          </div>
          <div className="stat-icon-wrapper orange-bg">
            <ClipboardList size={20} className="stat-icon orange-text" />
          </div>
        </div>
        <div className="stat-card-footer">
          <span className="stat-trend positive">
            <TrendingUp size={14} />
            Yêu cầu xem xét sớm
          </span>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-card-header">
          <div className="stat-card-content">
            <p className="stat-label">ĐÃ GIẢI QUYẾT (RESOLVED)</p>
            <h2 className="stat-value">{isLoading ? '...' : resolvedCount}</h2>
          </div>
          <div className="stat-icon-wrapper blue-bg">
            <CheckCircle size={20} className="stat-icon blue-text" />
          </div>
        </div>
        <div className="stat-card-footer">
          <span className="stat-desc">
            <CheckCircle size={14} className="inline-icon" /> Đã xử lý hoàn tất
          </span>
        </div>
      </div>
    </div>
  );
};

export default ReportStats;