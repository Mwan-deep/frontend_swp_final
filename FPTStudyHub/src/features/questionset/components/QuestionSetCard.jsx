import React from 'react';

const QuestionSetCard = ({ title, subject, totalQuestions, icon: Icon, iconColor, iconBg }) => {
  return (
    <div className="qset-card">
      <div className="qset-card-header">
        <div 
          className="qset-icon-wrapper"
          style={{ backgroundColor: iconBg, color: iconColor }}
        >
          {Icon && <Icon size={20} />}
        </div>
        {/* Đã xóa badge status ở đây */}
      </div>
      
      <h3 className="qset-title">{title}</h3>
      <p className="qset-subject">{subject}</p>
      
      <div className="qset-divider"></div>
      
      <div className="qset-footer">
        <div className="qset-stat-item">
          <span className="qset-stat-label">Total Questions</span>
          <span className="qset-stat-value">{totalQuestions}</span>
        </div>
        {/* Đã xóa phần hiển thị lượt Downloads ở đây */}
      </div>
    </div>
  );
};

export default QuestionSetCard;