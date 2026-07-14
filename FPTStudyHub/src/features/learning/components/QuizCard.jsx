import React from 'react';

// Document Icon
const QuestionDocIcon = () => (
  <svg className="quiz-spec-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
    <polyline points="14 2 14 8 20 8"></polyline>
    <line x1="9" y1="15" x2="15" y2="15"></line>
    <line x1="9" y1="19" x2="15" y2="19"></line>
    <path d="M9 11h1"></path>
  </svg>
);

// Clock Icon
const ClockIcon = () => (
  <svg className="quiz-spec-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <polyline points="12 6 12 12 16 14"></polyline>
  </svg>
);

const QuizCard = ({ quiz, onAction }) => {
  const { id, subject, title, source, questionsCount, duration, status, score, completedQuestions, accessMode } = quiz;

  const getSubjectClass = (subj) => {
    switch (subj?.toLowerCase()) {
      case 'computer science': return 'cs-theme';
      case 'software engineering': return 'se-theme';
      case 'economics': return 'eco-theme';
      default: return 'default-theme';
    }
  };

  return (
    <div className="quiz-grid-card">
      <div className="quiz-card-header-badges">
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <span className="quiz-card-id-badge">{id}</span>
          <span className={`quiz-badge-subject ${getSubjectClass(subject)}`}>{subject}</span>
        </div>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          {accessMode === 'private' && (
            <span className="quiz-badge-access private-badge" title="Password Protected">
              🔒 Private
            </span>
          )}
        </div>
      </div>

      <div className="quiz-card-main-content">
        <h3 className="quiz-card-title">{title}</h3>
        <p className="quiz-card-source">{source}</p>
        
        <div className="quiz-card-specs-row">
          <div className="quiz-spec-item">
            <QuestionDocIcon />
            <span>{questionsCount} Questions</span>
          </div>
          <div className="quiz-spec-item">
            <ClockIcon />
            <span>{duration} mins</span>
          </div>
        </div>
      </div>

      <div className="quiz-card-action-footer">
        
        {/* --- ĐÃ CẬP NHẬT: Thêm nút Retake cạnh Review --- */}
        {status === 'completed' && (
          <div className="quiz-status-details-block">
            <div className="quiz-score-row">
              <span className="score-label">Best Score</span>
              <span className="score-value-text">{score} pts</span>
            </div>
            <div style={{ display: 'flex', gap: '10px', marginTop: '12px' }}>
              <button 
                type="button" 
                className="quiz-card-btn review-btn"
                style={{ flex: 1 }}
                onClick={() => onAction(id, 'review')}
              >
                Review
              </button>
              <button 
                type="button" 
                className="quiz-card-btn take-quiz-btn"
                style={{ flex: 1 }}
                onClick={() => onAction(id, 'take')}
              >
                Retake
              </button>
            </div>
          </div>
        )}

        {status === 'in-progress' && (
          <div className="quiz-status-details-block">
            <div className="quiz-progress-stats-row">
              <span className="progress-label">Resume Quiz</span>
              <span className="progress-value-text">{completedQuestions}/{questionsCount} Completed</span>
            </div>
            <div className="quiz-card-progress-bar-container">
              <div 
                className="quiz-card-progress-fill" 
                style={{ width: `${(completedQuestions / questionsCount) * 100}%` }}
              ></div>
            </div>
            <button 
              type="button" 
              className="quiz-card-btn resume-btn"
              onClick={() => onAction(id, 'resume')}
            >
              Resume
            </button>
          </div>
        )}

        {status === 'not-started' && (
          <div className="quiz-status-details-block">
            <div className="quiz-no-attempts-row">
              <span className="no-attempts-text">No attempts yet</span>
            </div>
            <button 
              type="button" 
              className="quiz-card-btn take-quiz-btn"
              onClick={() => onAction(id, 'take')}
            >
              Take Quiz
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default QuizCard;