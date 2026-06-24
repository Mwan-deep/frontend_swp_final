import React from 'react';
import { HelpCircle } from 'lucide-react';

const RecentQuizzesGrid = ({ recentQuizzes, onViewAll }) => {
  const getBadgeClass = (status) => {
    switch (status.toLowerCase()) {
      case 'ready':
        return 'recent-badge badge-ready';
      case 'processing':
        return 'recent-badge badge-processing';
      case 'failed':
        return 'recent-badge badge-failed';
      default:
        return 'recent-badge';
    }
  };

  return (
    <div className="recent-quizzes-section">
      <div className="section-header-row">
        <h2 className="section-title">Recent Quizzes</h2>
        <button onClick={onViewAll} className="btn-view-all">
          View all
        </button>
      </div>

      <div className="recent-grid">
        {recentQuizzes.map((quiz) => (
          <div key={quiz.id} className="recent-quiz-card">
            <div className="recent-card-top">
              <div className="recent-icon-wrapper">
                <HelpCircle size={20} className="recent-icon" />
              </div>
              <span className={getBadgeClass(quiz.status)}>
                {quiz.status.toUpperCase()}
              </span>
            </div>
            
            <h3 className="recent-quiz-title">{quiz.title}</h3>
            
            <div className="recent-card-footer">
              <span className="recent-footer-text">
                {quiz.questionsCount !== null ? `${quiz.questionsCount} questions` : '-- questions'}
              </span>
              <span className="recent-footer-dot">•</span>
              <span className="recent-footer-text">{quiz.timeAgo}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentQuizzesGrid;