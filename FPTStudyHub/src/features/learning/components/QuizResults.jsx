import React from 'react';

const QuizResults = ({ activeQuiz, userAnswers, onFinish }) => {
  const totalQuestions = activeQuiz.questions.length;
  let correctCount = 0;
  activeQuiz.questions.forEach((q, idx) => {
    if (userAnswers[idx] === q.correct) correctCount++;
  });
  const finalScore = Math.round((correctCount / totalQuestions) * 100);

  return (
    <div className="secure-access-page-wrapper">
      <div className="secure-access-card results-card">
        <div className="secure-lock-icon-container" style={{ backgroundColor: '#F0FDF4' }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
        </div>
        <h2 className="secure-access-title">Assessment Completed</h2>
        <p className="secure-access-subtitle">
          You have successfully submitted the exam. Here are your results:
        </p>

        <div className="results-summary-box">
          <div className="results-score-circle">
            <span className="results-score-number">{finalScore}%</span>
            <span className="results-score-label">Score</span>
          </div>
          <div className="results-details-list">
            <div className="results-detail-item">
              <span className="detail-label">Total Questions</span>
              <span className="detail-val">{totalQuestions}</span>
            </div>
            <div className="results-detail-item">
              <span className="detail-label">Correct Answers</span>
              <span className="detail-val text-success">{correctCount}</span>
            </div>
            <div className="results-detail-item">
              <span className="detail-label">Incorrect Answers</span>
              <span className="detail-val text-danger">{totalQuestions - correctCount}</span>
            </div>
          </div>
        </div>

        <button 
          type="button" 
          className="secure-submit-btn-full"
          onClick={() => onFinish(finalScore)}
        >
          Return to Knowledge Check
        </button>
      </div>
    </div>
  );
};

export default QuizResults;