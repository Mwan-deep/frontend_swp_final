import React from 'react';

const StatCard = ({ icon: Icon, value, label, iconBgClass }) => {
  return (
    <div className="stat-card">
      <div className={`stat-icon-wrapper ${iconBgClass}`}>
        <Icon size={20} />
      </div>
      <div className="stat-content">
        <h3 className="stat-value">{value}</h3>
        <p className="stat-label">{label}</p>
      </div>
    </div>
  );
};

export default StatCard;