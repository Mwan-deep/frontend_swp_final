
import React from 'react';
import { TrendingUp } from 'lucide-react';

const ProgressCard = ({ value, label }) => {
  return (
    <div className="stat-card progress-card">
      <div className="progress-icon-wrapper">
        <TrendingUp size={22} />
      </div>
      <div className="stat-content">
        <h3 className="stat-value">{value}</h3>
        <p className="stat-label">{label}</p>

      </div>
    </div>
  );
};

export default ProgressCard;