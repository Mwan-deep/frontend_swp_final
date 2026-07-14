import React from 'react';
import { Calendar } from 'lucide-react';

const TimeInfoCard = ({ createdAt }) => {
  const dateStr = createdAt ? new Date(createdAt).toLocaleDateString('vi-VN') : 'N/A';
  
  return (
    <div className="qa-time-card">
      <div className="qa-time-left">
        <div className="qa-time-icon"><Calendar size={24} color="#6b7280" /></div>
        <div className="qa-time-text">
          <h3>Time Information</h3>
          <div className="qa-time-status">
            <span className="qa-badge-green" style={{background: '#dcfce7', color: '#166534', padding: '2px 8px', borderRadius: '12px', fontSize:'12px', fontWeight: 'bold'}}>ACTIVE</span>
            <span className="qa-time-desc">Currently accepting submissions</span>
          </div>
        </div>
      </div>
      <div className="qa-time-right">
        <div className="qa-time-date">
          <span>CREATED DATE</span>
          <strong>{dateStr}</strong>
        </div>
        <button className="qa-btn-edit">Edit Settings</button>
      </div>
    </div>
  );
};
export default TimeInfoCard;