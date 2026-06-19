import React, { useState } from 'react';
import { User, FileText, AlertCircle, Eye, CheckCircle, ChevronRight, Star } from 'lucide-react';
import Pagination from '../../shared/components/Pagination/Pagination';
import { useNavigate } from 'react-router-dom';
import { mockDocuments, mockTableUsers, topDownloads, mockDocumentQueue } from '../../data/mockDocuments';
import './ManagerDashboard.css';

const ManagerDashboard = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const navigate = useNavigate();

  // Process data for leaderboard
  const topUsers = topDownloads.slice(0, 5); // Synced with Community Page
  const topManagers = mockTableUsers.filter(u => u.role === 'Manager').slice(0, 3);

  // Process data for report queue
  // Use the synced document queue directly so deletions and approvals reflect
  const queueData = [...mockDocumentQueue];

  const totalPages = Math.ceil(queueData.length / itemsPerPage);
  const currentTableData = queueData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getStatusClass = (status) => {
    switch (status) {
      case 'PENDING': return 'status-pending';
      case 'PROCESSING': return 'status-processing';
      case 'ANALYZING': return 'status-analyzing';
      default: return '';
    }
  };

  return (
    <div className="manager-dashboard">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Chào mừng trở lại, Manager</h1>
        <p className="dashboard-subtitle">
          Hệ thống của bạn đang hoạt động ổn định. Dưới đây là các cập nhật mới nhất cho hôm nay.
        </p>
      </div>

      <div className="dashboard-top-cards">
        <div className="stat-card">
          <div className="stat-card-header">
            <div className="stat-icon-wrapper user-icon">
              <User size={20} />
            </div>
            <span className="stat-change positive">+12%</span>
          </div>
          <p className="stat-label">Total Users</p>
          <h2 className="stat-value">12,450</h2>
        </div>

        <div className="stat-card">
          <div className="stat-card-header">
            <div className="stat-icon-wrapper doc-icon">
              <FileText size={20} />
            </div>
            <span className="stat-change neutral">842 items</span>
          </div>
          <p className="stat-label">Study Materials</p>
          <h2 className="stat-value">4,320</h2>
        </div>

        <div className="stat-card alert-card">
          <div className="alert-content">
            <AlertCircle size={32} className="alert-icon" />
            <h3>Kiểm duyệt báo cáo khẩn cấp</h3>
          </div>
        </div>
      </div>

      <div className="dashboard-main-content">
        <div className="leaderboard-section" onClick={() => navigate('/manager/community')} style={{cursor: 'pointer'}}>
          <div className="leaderboard-header">
            <h3>Hệ thống Bảng xếp hạng nhanh</h3>
            <div className="star-icon-wrapper">
              <Star size={16} />
            </div>
          </div>

          <div className="leaderboard-list">
            <p className="leaderboard-subtitle">Top 5 Contributors</p>
            {topUsers.map((user, index) => (
              <div key={user.id} className="leaderboard-item">
                <div className="user-rank">{index + 1}</div>
                <span className="user-name">{user.name}</span>
                <span className="user-points">{user.downloads.toLocaleString()} dl</span>
              </div>
            ))}
            <button className="view-more-btn" onClick={(e) => { e.stopPropagation(); navigate('/manager/community'); }}>
              Xem chi tiết...
            </button>
          </div>

          <div className="leaderboard-managers">
            <p className="leaderboard-subtitle">Top 3 Managers</p>
            <div className="manager-avatars">
              {topManagers.map((manager, index) => (
                <div key={manager.id} className="manager-avatar-wrapper">
                  <img src={manager.avatar} alt={manager.name} className="manager-avatar" />
                  <span className="manager-rank-badge">#{index + 1} {manager.name.split(' ')[0]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="report-queue-section">
          <div className="report-queue-header">
            <h3>Report approval queue</h3>
            <div className="report-queue-actions">
              <button className="btn-filter">Filter</button>
              <button className="btn-export">Export CSV</button>
            </div>
          </div>

          <div className="table-responsive">
            <table className="report-table">
              <thead>
                <tr>
                  <th>Tên Tài liệu</th>
                  <th>Người đăng</th>
                  <th>Lượt xem</th>
                  <th>Tải về</th>
                  <th>Trạng thái</th>
                  <th>Hành động</th>
                </tr>
              </thead>
              <tbody>
                {currentTableData.map((row, idx) => (
                  <tr key={idx}>
                    <td className="doc-name">
                      <FileText size={16} className="doc-type-icon" />
                      {row.name}
                    </td>
                    <td>{row.author?.name || 'Unknown'}</td>
                    <td>{row.views}</td>
                    <td>{row.downloads}</td>
                    <td>
                      <span className={`status-badge ${getStatusClass(row.status)}`}>
                        {row.status}
                      </span>
                    </td>
                    <td>
                      <div className="action-buttons">
                        <button className="action-btn" onClick={() => navigate('/manager/documents', { state: { selectedDocId: row.id } })}>
                          <Eye size={18} />
                        </button>
                        <button className="action-btn check"><CheckCircle size={18} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="pagination-wrapper">
            <span className="pagination-info">
              Hiển thị {currentTableData.length} trong {queueData.length} yêu cầu
            </span>
            {/* Reuse Pagination component */}
            <Pagination 
              currentPage={currentPage} 
              totalPages={totalPages} 
              onPageChange={setCurrentPage} 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagerDashboard;
