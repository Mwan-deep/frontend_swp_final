import React, { useState, useEffect } from 'react';

const QuizTaking = ({ activeQuiz, onSubmit }) => {
  const totalQuestions = activeQuiz.questions.length;
  
  // Quiz states
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [markedForReview, setMarkedForReview] = useState({});
  const [timeLeft, setTimeLeft] = useState(activeQuiz.duration * 60);

  // Timer countdown hook
  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          // Auto submit when time runs out
          handleSubmitQuiz(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleOptionSelect = (optionIdx) => {
    setUserAnswers(prev => ({
      ...prev,
      [currentQuestionIndex]: optionIdx
    }));
  };

  const toggleMarkForReview = () => {
    setMarkedForReview(prev => ({
      ...prev,
      [currentQuestionIndex]: !prev[currentQuestionIndex]
    }));
  };

  const handleSubmitQuiz = (auto = false) => {
    if (!auto && !window.confirm("Are you sure you want to submit the assessment?")) {
      return;
    }
    onSubmit(userAnswers);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const currentQuestion = activeQuiz.questions[currentQuestionIndex];
  const progressPct = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  return (
    <div className="quiz-taking-page-wrapper">
      
      {/* Main Column */}
      <div className="quiz-taking-main-col">
        
        {/* Header Card (Title, Timer, Progress) */}
        <div className="quiz-taking-header-card">
          <div className="quiz-taking-title-row">
            <h2 className="quiz-taking-title">{activeQuiz.title}</h2>
            <div className="quiz-timer-badge">
              ⏱️ {formatTime(timeLeft)}
            </div>
          </div>
          <div className="quiz-taking-progress-info">
            Question {currentQuestionIndex + 1} of {totalQuestions}
          </div>
          <div className="quiz-progress-track">
            <div className="quiz-progress-fill-bar" style={{ width: `${progressPct}%` }}></div>
          </div>
        </div>

        {/* Active Question Card */}
        <div className="question-card-container">
          <h3 className="question-text-title">
            {currentQuestion.text}
          </h3>

          {/* Options list */}
          <div className="options-list-container">
            {currentQuestion.options.map((opt, idx) => {
              const isSelected = userAnswers[currentQuestionIndex] === idx;
              return (
                <div 
                  key={idx}
                  className={`option-choice-box ${isSelected ? 'selected-option' : ''}`}
                  onClick={() => handleOptionSelect(idx)}
                >
                  <input 
                    type="radio" 
                    name={`question-${currentQuestionIndex}`}
                    checked={isSelected}
                    readOnly
                    className="option-radio-input"
                  />
                  <span className="option-label-text">{opt}</span>
                </div>
              );
            })}
          </div>

          {/* Bottom Actions Row */}
          <div className="question-navigation-row">
            <button 
              type="button"
              className="nav-prev-btn"
              disabled={currentQuestionIndex === 0}
              onClick={() => setCurrentQuestionIndex(prev => prev - 1)}
            >
              &larr; Previous
            </button>
            
            <button 
              type="button"
              className={`nav-mark-review-btn ${markedForReview[currentQuestionIndex] ? 'active-marked' : ''}`}
              onClick={toggleMarkForReview}
            >
              🔖 {markedForReview[currentQuestionIndex] ? 'Marked' : 'Mark for Review'}
            </button>

            <button 
              type="button"
              className="nav-next-btn"
              onClick={() => {
                if (currentQuestionIndex < totalQuestions - 1) {
                  setCurrentQuestionIndex(prev => prev + 1);
                } else {
                  handleSubmitQuiz();
                }
              }}
            >
              {currentQuestionIndex === totalQuestions - 1 ? 'Finish Assessment' : 'Next \u2192'}
            </button>
          </div>

        </div>
      </div>

      {/* Sidebar Column */}
      <div className="quiz-taking-sidebar-col">
        
        {/* Quiz Navigator Card */}
        <div className="quiz-navigator-card">
          <h3 className="navigator-card-title">Quiz Navigator</h3>
          
          <div className="navigator-legend-row">
            <div className="legend-item">
              <span className="legend-dot answered"></span>
              <span>Answered</span>
            </div>
            <div className="legend-item">
              <span className="legend-dot current"></span>
              <span>Current</span>
            </div>
            <div className="legend-item">
              <span className="legend-dot unanswered"></span>
              <span>Unanswered</span>
            </div>
          </div>

          {/* Grid numbers */}
          <div className="navigator-grid">
            {activeQuiz.questions.map((q, idx) => {
              const isCurrent = idx === currentQuestionIndex;
              const isAnswered = userAnswers[idx] !== undefined;
              let gridClass = '';
              if (isCurrent) gridClass += ' current-question';
              if (isAnswered) gridClass += ' answered-question';

              return (
                <div 
                  key={idx}
                  className={`navigator-grid-item ${gridClass}`}
                  onClick={() => setCurrentQuestionIndex(idx)}
                >
                  {idx + 1}
                  {markedForReview[idx] && <span className="marked-review-dot"></span>}
                </div>
              );
            })}
          </div>

          <button 
            type="button"
            className="sidebar-submit-btn"
            onClick={() => handleSubmitQuiz()}
          >
            Submit Quiz
          </button>
        </div>

      </div>

    </div>
  );
};

export default QuizTaking;