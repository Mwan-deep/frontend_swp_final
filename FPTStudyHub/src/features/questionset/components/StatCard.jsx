import React from 'react';

const StatCard = ({ icon: Icon, value, label, subtext, subtextType, iconBg, iconColor }) => {
  return (
    <div className="stat-card">
      <div className="stat-card-header">
        <div 
          className="stat-icon-wrapper" 
          style={{ backgroundColor: iconBg, color: iconColor }}
        >
          {Icon && <Icon size={20} />}
        </div>
        <h3 className="stat-card-title">{label}</h3>
      </div>
      <div>
        <h2 className="stat-card-value">{value}</h2>
        {subtext && (
          <p className={`stat-card-subtext ${subtextType || ''}`}>
            {subtext}
          </p>
        )}
      </div>
    </div>
  );
};

export default StatCard;