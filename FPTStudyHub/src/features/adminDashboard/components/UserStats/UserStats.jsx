import React from 'react';
import { Users, Radio, UserX, AlertCircle, TrendingUp } from 'lucide-react';
import './UserStats.css';

const UserStats = ({ users, isLoading }) => {
  
  // Tính toán số liệu dựa trên Data thật
  const totalUsers = users.length;
  const activeUsers = users.filter(u => u.accountStatus === 'ACTIVE').length;
  const inactiveUsers = users.filter(u => u.accountStatus !== 'ACTIVE').length;
  const totalReports = 0; // Tạm thời để 0, chờ có bảng Report sẽ làm sau

  if (isLoading) return <div style={{ marginBottom: '20px' }}>Đang tải số liệu...</div>;

  return (
    <div className="user-stats-container">
      <div className="stat-card">
        <div className="stat-card-header">
          <div className="stat-card-content">
            <p className="stat-label">TOTAL USERS</p>
            <h2 className="stat-value">{totalUsers}</h2>
          </div>
          <div className="stat-icon-wrapper orange-bg">
            <Users size={20} className="stat-icon orange-text" />
          </div>
        </div>
        <div className="stat-card-footer">
          <span className="stat-trend positive">
            <TrendingUp size={14} />
            Updated live
          </span>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-card-header">
          <div className="stat-card-content">
            <p className="stat-label">ACTIVE ACCOUNTS</p>
            <h2 className="stat-value">{activeUsers}</h2>
          </div>
          <div className="stat-icon-wrapper blue-bg">
            <Radio size={20} className="stat-icon blue-text" />
          </div>
        </div>
        <div className="stat-card-footer">
          <span className="stat-desc">Currently allowed to login</span>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-card-header">
          <div className="stat-card-content">
            <p className="stat-label">INACTIVE</p>
            <h2 className="stat-value">{inactiveUsers}</h2>
          </div>
          <div className="stat-icon-wrapper gray-bg">
            <UserX size={20} className="stat-icon gray-text" />
          </div>
        </div>
        <div className="stat-card-footer">
          <span className="stat-trend negative">
            <AlertCircle size={14} />
            Suspended or Banned
          </span>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-card-header">
          <div className="stat-card-content">
            <p className="stat-label">TOTAL REPORTS</p>
            <h2 className="stat-value">{totalReports}</h2>
          </div>
          <div className="stat-icon-wrapper red-bg">
            <AlertCircle size={20} className="stat-icon red-text" />
          </div>
        </div>
        <div className="stat-card-footer">
          <span className="stat-desc invisible">placeholder</span>
        </div>
      </div>
    </div>
  );
};

export default UserStats;