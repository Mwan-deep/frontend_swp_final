import React from 'react';

const QuestionSetCard = ({ title, subject, totalQuestions, downloads, status, icon: Icon, iconColor, iconBg }) => {
  return (
    <div className="qset-card">
      <div className="qset-card-header">
        <div 
          className="qset-icon-wrapper"
          style={{ backgroundColor: iconBg, color: iconColor }}
        >
          {Icon && <Icon size={20} />}
        </div>
        <span className={`qset-status ${status.toLowerCase()}`}>
          {status}
        </span>
      </div>
      
      <h3 className="qset-title">{title}</h3>
      <p className="qset-subject">{subject}</p>
      
      <div className="qset-divider"></div>
      
      <div className="qset-footer">
        <div className="qset-stat-item">
          <span className="qset-stat-label">Total Questions</span>
          <span className="qset-stat-value">{totalQuestions}</span>
        </div>
        <div className="qset-stat-item">
          <span className="qset-stat-label">Downloads</span>
          <span className="qset-stat-value">{downloads}</span>
        </div>
      </div>
    </div>
  );
};

export default QuestionSetCard;