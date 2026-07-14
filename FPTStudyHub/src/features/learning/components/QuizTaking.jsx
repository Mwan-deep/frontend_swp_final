import React, { useState, useEffect } from 'react';
import axiosClient from '../../../utils/axiosClient';

const QuizTaking = ({ activeQuiz, onSubmit }) => {
  const totalQuestions = activeQuiz.questions?.length || 0;
  
  const parseDurationToMinutes = (durationData) => {
    if (!durationData) return 15;
    if (Array.isArray(durationData)) return (durationData[0] || 0) * 60 + (durationData[1] || 0);
    if (typeof durationData === 'string' && durationData.includes(':')) {
      const parts = durationData.split(':');
      return (parseInt(parts[0], 10) || 0) * 60 + (parseInt(parts[1], 10) || 0);
    }
    if (typeof durationData === 'number') return durationData;
    return 15; 
  };

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  
  // Tự động nhận đáp án nháp từ DB truyền xuống
  const [userAnswers, setUserAnswers] = useState(activeQuiz.draftAnswers || {});
  
  const [markedForReview, setMarkedForReview] = useState({});
  const [timeLeft, setTimeLeft] = useState(parseDurationToMinutes(activeQuiz.duration) * 60);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (timeLeft <= 0 || isSubmitting) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitQuiz(true); 
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft, isSubmitting]);

  // KHI CHỌN ĐÁP ÁN: Gọi API Auto-Save thẳng xuống Backend
  const handleOptionSelect = (questionId, optionId) => {
    const newAnswers = { ...userAnswers, [questionId]: optionId };
    setUserAnswers(newAnswers);

    // Gửi ngầm không làm gián đoạn UI
    axiosClient.post('/api/v1/quizzes/auto-save', {
      quizId: activeQuiz.quizId,
      answers: newAnswers
    }).catch(err => console.error("Lỗi Auto-save:", err));
  };

  const toggleMarkForReview = () => {
    setMarkedForReview(prev => ({ ...prev, [currentQuestionIndex]: !prev[currentQuestionIndex] }));
  };

  const handleSubmitQuiz = async (auto = false) => {
    if (!auto && !window.confirm("Are you sure you want to submit the assessment?")) return;

    setIsSubmitting(true);
    try {
      const payload = { quizId: activeQuiz.quizId, answers: userAnswers };
      const response = await axiosClient.post('/api/v1/quizzes/submit', payload);
      const gradedResult = response.result || response.data || response;

      // Không cần xóa localStorage nữa vì Backend sẽ lo việc đè COMPLETED lên IN_PROGRESS
      onSubmit(gradedResult);
    } catch (error) {
      console.error("Lỗi nộp bài thi:", error);
      alert("Đã xảy ra lỗi khi kết nối với máy chủ. Vui lòng thử lại!");
      setIsSubmitting(false);
    }
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
      <div className="quiz-taking-main-col">
        <div className="quiz-taking-header-card">
          <div className="quiz-taking-title-row">
            <h2 className="quiz-taking-title">{activeQuiz.title}</h2>
            <div className="quiz-timer-badge">⏱️ {formatTime(timeLeft)}</div>
          </div>
          <div className="quiz-taking-progress-info">
            Question {currentQuestionIndex + 1} of {totalQuestions}
          </div>
          <div className="quiz-progress-track">
            <div className="quiz-progress-fill-bar" style={{ width: `${progressPct}%` }}></div>
          </div>
        </div>

        <div className="question-card-container">
          <h3 className="question-text-title">{currentQuestion?.questionText}</h3>
          
          <div className="options-list-container">
            {currentQuestion?.options.map((opt) => {
              const isSelected = userAnswers[currentQuestion.questionId] === opt.optionId;
              return (
                <div 
                  key={opt.optionId}
                  className={`option-choice-box ${isSelected ? 'selected-option' : ''}`}
                  onClick={() => !isSubmitting && handleOptionSelect(currentQuestion.questionId, opt.optionId)}
                >
                  <input type="radio" checked={isSelected} readOnly className="option-radio-input" />
                  <span className="option-label-text">{opt.optionText}</span>
                </div>
              );
            })}
          </div>

          <div className="question-navigation-row">
            <button 
              type="button" className="nav-prev-btn" disabled={currentQuestionIndex === 0 || isSubmitting}
              onClick={() => setCurrentQuestionIndex(prev => prev - 1)}
            >
              &larr; Previous
            </button>
            <button 
              type="button" className={`nav-mark-review-btn ${markedForReview[currentQuestionIndex] ? 'active-marked' : ''}`} disabled={isSubmitting} onClick={toggleMarkForReview}
            >
              🔖 {markedForReview[currentQuestionIndex] ? 'Marked' : 'Mark for Review'}
            </button>
            <button 
              type="button" className="nav-next-btn" disabled={isSubmitting}
              onClick={() => {
                if (currentQuestionIndex < totalQuestions - 1) setCurrentQuestionIndex(prev => prev + 1);
                else handleSubmitQuiz();
              }}
            >
              {isSubmitting ? 'Submitting...' : (currentQuestionIndex === totalQuestions - 1 ? 'Finish Assessment' : 'Next \u2192')}
            </button>
          </div>
        </div>
      </div>

      <div className="quiz-taking-sidebar-col">
        <div className="quiz-navigator-card">
          <h3 className="navigator-card-title">Quiz Navigator</h3>
          <div className="navigator-legend-row">
            <div className="legend-item"><span className="legend-dot answered"></span><span>Answered</span></div>
            <div className="legend-item"><span className="legend-dot current"></span><span>Current</span></div>
            <div className="legend-item"><span className="legend-dot unanswered"></span><span>Unanswered</span></div>
          </div>
          <div className="navigator-grid">
            {activeQuiz.questions.map((q, idx) => {
              const isCurrent = idx === currentQuestionIndex;
              const isAnswered = userAnswers[q.questionId] !== undefined; 
              let gridClass = isCurrent ? ' current-question' : (isAnswered ? ' answered-question' : '');
              return (
                <div 
                  key={q.questionId} className={`navigator-grid-item${gridClass}`}
                  onClick={() => !isSubmitting && setCurrentQuestionIndex(idx)}
                >
                  {idx + 1}
                  {markedForReview[idx] && <span className="marked-review-dot"></span>}
                </div>
              );
            })}
          </div>
          <button type="button" className="sidebar-submit-btn" disabled={isSubmitting} onClick={() => handleSubmitQuiz()}>
            {isSubmitting ? 'Sending...' : 'Submit Quiz'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizTaking;