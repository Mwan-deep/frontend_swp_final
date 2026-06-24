import React from 'react';
import { ClipboardList, CheckCircle, TrendingUp } from 'lucide-react';
import { mockReports } from '../../../../data/mockDocuments';
import './ReportStats.css';

const ReportStats = () => {
  const pendingCount = mockReports.filter(r => r.status === 'Pending').length;
  const resolvedCount = mockReports.filter(r => r.status === 'Resolved').length;

  return (
    <div className="report-stats-container">
      <div className="stat-card">
        <div className="stat-card-header">
          <div className="stat-card-content">
            <p className="stat-label">TOTAL PENDING</p>
            <h2 className="stat-value">{pendingCount}</h2>
          </div>
          <div className="stat-icon-wrapper orange-bg">
            <ClipboardList size={20} className="stat-icon orange-text" />
          </div>
        </div>
        <div className="stat-card-footer">
          <span className="stat-trend positive">
            <TrendingUp size={14} />
            +12% from yesterday
          </span>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-card-header">
          <div className="stat-card-content">
            <p className="stat-label">RESOLVED TODAY</p>
            <h2 className="stat-value">{resolvedCount}</h2>
          </div>
          <div className="stat-icon-wrapper blue-bg">
            <CheckCircle size={20} className="stat-icon blue-text" />
          </div>
        </div>
        <div className="stat-card-footer">
          <span className="stat-desc">
            <CheckCircle size={14} className="inline-icon" /> On track for daily goal
          </span>
        </div>
      </div>
    </div>
  );
};

export default ReportStats;
