import React from 'react';
import { 
  List, 
  Play, 
  BarChart2, 
  Lock 
} from 'lucide-react';

const QuizTableRow = ({ quiz, onStart, onStats }) => {
  // Support both publishStatus and status fields for ready state fallback
  const isReady = quiz.publishStatus === 'ready' || quiz.status === 'ready';

  return (
    <tr className="quiz-table-row">
      {/* 1. Quiz Information */}
      <td className="col-quiz-info">
        <div className="quiz-title-wrapper">
          <h4 className="quiz-title-text">{quiz.title}</h4>
          <div className="quiz-meta-badges">
            <span className="subject-badge">{quiz.code}</span>
            <span className="questions-count">
              <List size={14} className="meta-icon" />
              {quiz.questionsCount} questions
            </span>
          </div>
        </div>
      </td>

      {/* 2. Status */}
      <td className="col-quiz-status">
        {isReady ? (
          <span className="status-badge-container status-ready">
            <span className="status-dot"></span>
            Ready
          </span>
        ) : (
          <span className="status-badge-container status-expired">
            <span className="status-dot"></span>
            Expired
          </span>
        )}
      </td>

      {/* 3. Created Date */}
      <td className="col-quiz-date">
        <span className="date-text">{quiz.createdDate}</span>
      </td>

      {/* 4. Actions */}
      <td className="col-quiz-actions">
        <div className="actions-button-group">
          {isReady ? (
            <>
              <button 
                onClick={() => onStart(quiz.id)} 
                className="btn-action-start"
              >
                <Play size={14} fill="currentColor" />
                Start
              </button>
              <button 
                onClick={() => onStats(quiz.id)} 
                className="btn-action-stats"
              >
                <BarChart2 size={14} />
                Statistics
              </button>
            </>
          ) : (
            <>
              <button className="btn-action-locked" disabled>
                <Lock size={14} />
                Locked
              </button>
              <button 
                onClick={() => onStats(quiz.id)} 
                className="btn-action-summary"
              >
                <BarChart2 size={14} />
                Summary
              </button>
            </>
          )}
        </div>
      </td>
    </tr>
  );
};

export default QuizTableRow;