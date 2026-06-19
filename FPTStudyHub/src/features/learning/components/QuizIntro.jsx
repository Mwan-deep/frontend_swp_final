import React from 'react';
import { ArrowLeft } from 'lucide-react'; // Import ArrowLeft icon

const QuizIntro = ({ activeQuiz, onStartQuiz, onCancel }) => {
  const totalQuestions = activeQuiz.questions.length;
  return (
    <div className="secure-access-page-wrapper" style={{ flexDirection: 'column', gap: '8px' }}>
      
      {/* Nút Quay về (Back Button) */}
      <button 
        type="button" 
        className="learning-back-btn" 
        onClick={onCancel}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          background: 'none',
          border: 'none',
          color: '#64748B',
          fontSize: '14px',
          fontWeight: '600',
          cursor: 'pointer',
          padding: '6px 12px 6px 0',
          alignSelf: 'flex-start',
          transition: 'all 0.2s ease',
          outline: 'none'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = '#F26F21';
          e.currentTarget.style.transform = 'translateX(-2px)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = '#64748B';
          e.currentTarget.style.transform = 'translateX(0)';
        }}
      >
        <ArrowLeft size={16} />
        <span>Back</span>
      </button>

      {/* Breadcrumbs */}
      <div className="learning-breadcrumbs">
        <span className="breadcrumb-home-icon">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
          </svg>
        </span>
        <span className="breadcrumb-separator">&gt;</span>
        <span className="breadcrumb-link" onClick={onCancel}>Learning Modules</span>
        <span className="breadcrumb-separator">&gt;</span>
        <span className="breadcrumb-active">{activeQuiz.title}</span>
      </div>

      {/* Intro Card */}
      <div className="secure-access-card intro-card">
        
        <div className="intro-badge">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '4px' }}>
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <line x1="16" y1="13" x2="8" y2="13"></line>
            <line x1="16" y1="17" x2="8" y2="17"></line>
            <polyline points="10 9 9 9 8 9"></polyline>
          </svg>
          <span>Assessment</span>
        </div>

        <h2 className="secure-access-title" style={{ fontSize: '32px', marginTop: '4px', lineHeight: '1.25' }}>
          {activeQuiz.title}
        </h2>
        <p className="secure-access-subtitle" style={{ marginBottom: '32px', fontSize: '15px' }}>
          Course: {activeQuiz.id} - {activeQuiz.subject}
        </p>

        {/* Stats Boxes */}
        <div className="intro-stats-row">
          <div className="intro-stat-box">
            <div className="stat-box-icon-container">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="8" y1="6" x2="21" y2="6"></line>
                <line x1="8" y1="12" x2="21" y2="12"></line>
                <line x1="8" y1="18" x2="21" y2="18"></line>
                <line x1="3" y1="6" x2="3.01" y2="6"></line>
                <line x1="3" y1="12" x2="3.01" y2="12"></line>
                <line x1="3" y1="18" x2="3.01" y2="18"></line>
              </svg>
            </div>
            <div className="stat-box-text">
              <span className="stat-box-label">Questions</span>
              <span className="stat-box-value">{totalQuestions}</span>
            </div>
          </div>
          <div className="intro-stat-box">
            <div className="stat-box-icon-container">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
            </div>
            <div className="stat-box-text">
              <span className="stat-box-label">Time Limit</span>
              <span className="stat-box-value">{activeQuiz.duration} Minutes</span>
            </div>
          </div>
        </div>

        {/* Important Instructions Box */}
        <div className="intro-instructions-panel">
          <h4>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '6px' }}>
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="16" x2="12" y2="12"></line>
              <line x1="12" y1="8" x2="12.01" y2="8"></line>
            </svg>
            <span>Important Instructions</span>
          </h4>
          <ul className="intro-instructions-list">
            <li className="intro-instruction-item">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: '2px' }}>
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 8 12 12 16 14"></polyline>
              </svg>
              <span>Ensure you have a stable internet connection before beginning the examination.</span>
            </li>
            <li className="intro-instruction-item">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: '2px' }}>
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 8 12 12 16 14"></polyline>
              </svg>
              <span>Do not close or refresh your browser window while the quiz is active, as this may result in loss of progress.</span>
            </li>
            <li className="intro-instruction-item">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: '2px' }}>
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 8 12 12 16 14"></polyline>
              </svg>
              <span>The quiz will automatically submit when the timer reaches zero. Unanswered questions will be marked as zero.</span>
            </li>
            <li className="intro-instruction-item">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: '2px' }}>
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 8 12 12 16 14"></polyline>
              </svg>
              <span>This is a closed-book examination. Unauthorized materials are prohibited.</span>
            </li>
          </ul>
        </div>

        {/* Start Quiz button */}
        <button 
          type="button" 
          className="secure-submit-btn-full"
          style={{ padding: '16px', fontSize: '16px', borderRadius: '50px', justifyContent: 'center' }}
          onClick={onStartQuiz}
        >
          <span>Start Quiz</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </button>
        
        <div className="intro-footer-text">
          By clicking "Start Quiz", you agree to the academic integrity guidelines.
        </div>

        <button 
          type="button" 
          className="secure-cancel-link"
          onClick={onCancel}
        >
          Cancel and return
        </button>

      </div>
    </div>
  );
};

export default QuizIntro;