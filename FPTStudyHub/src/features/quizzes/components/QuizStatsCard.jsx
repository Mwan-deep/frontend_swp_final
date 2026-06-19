import React from 'react';

const QuizStatsCard = ({ icon: Icon, badgeText, badgeType, value, label, iconBg, iconColor }) => {
  const getBadgeClass = () => {
    switch (badgeType) {
      case 'success':
        return 'stats-badge badge-success';
      case 'info':
        return 'stats-badge badge-info';
      case 'warning':
        return 'stats-badge badge-warning';
      default:
        return 'stats-badge badge-default';
    }
  };

  return (
    <div className="quiz-stats-card">
      <div className="stats-card-header">
        <div 
          className="stats-icon-wrapper" 
          style={{ backgroundColor: iconBg, color: iconColor }}
        >
          <Icon size={20} />
        </div>
        {badgeText && (
          <span className={getBadgeClass()}>
            {badgeText}
          </span>
        )}
      </div>
      <div className="stats-card-body">
        <h3 className="stats-value">{value}</h3>
        <p className="stats-label">{label}</p>
      </div>
    </div>
  );
};

export default QuizStatsCard;