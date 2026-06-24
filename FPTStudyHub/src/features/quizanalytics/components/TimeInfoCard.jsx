import React from 'react';
import { Calendar } from 'lucide-react';

const TimeInfoCard = () => {
  return (
    <div className="qa-time-card">
      <div className="qa-time-left">
        <div className="qa-time-icon">
          <Calendar size={24} color="#6b7280" />
        </div>
        <div className="qa-time-text">
          <h3>Time Information</h3>
          <div className="qa-time-status">
            <span className="qa-badge-ended">ENDED</span>
            <span className="qa-time-desc">Expired 3 days ago</span>
          </div>
        </div>
      </div>
      
      <div className="qa-time-right">
        <div className="qa-time-date">
          <span>START DATE</span>
          <strong>10/10/2023</strong>
        </div>
        <div className="qa-time-divider"></div>
        <div className="qa-time-date">
          <span>END DATE</span>
          <strong>17/10/2023</strong>
        </div>
        <button className="qa-btn-edit">Edit Deadline</button>
      </div>
    </div>
  );
};

export default TimeInfoCard;