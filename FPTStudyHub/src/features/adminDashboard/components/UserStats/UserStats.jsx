import React from 'react';
import { Users, Radio, UserX, AlertCircle, TrendingUp } from 'lucide-react';
import { mockTableUsers, mockReports } from '../../../../data/mockDocuments';
import './UserStats.css';

const UserStats = () => {
  const totalUsers = mockTableUsers.length;
  const activeUsers = mockTableUsers.filter(u => u.status === 'Active').length;
  const inactiveUsers = mockTableUsers.filter(u => u.status === 'Inactive' || u.status === 'Suspended').length;
  const totalReports = mockReports.length;

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
            +2.4% this month
          </span>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-card-header">
          <div className="stat-card-content">
            <p className="stat-label">ACTIVE NOW</p>
            <h2 className="stat-value">{activeUsers}</h2>
          </div>
          <div className="stat-icon-wrapper blue-bg">
            <Radio size={20} className="stat-icon blue-text" />
          </div>
        </div>
        <div className="stat-card-footer">
          <span className="stat-desc">Currently logged in</span>
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
            Requires attention
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
