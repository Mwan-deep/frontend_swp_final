import React from 'react';
import { 
  List, 
  Play, 
  BarChart2, 
  Lock,
  Globe,
  EyeOff
} from 'lucide-react';

const QuizTableRow = ({ quiz, onStart, onStats, onToggleVisibility }) => {
  // Kiểm tra trạng thái hiện tại là Public hay Private
  const isPublic = quiz.visibility === 'PUBLIC';

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

      {/* 2. CỘT TRẠNG THÁI: CÔNG TẮC TOGGLE */}
      <td className="col-quiz-status">
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          
          {/* Cấu trúc Công tắc CSS thuần */}
          <label style={{ position: 'relative', display: 'inline-block', width: '44px', height: '24px', flexShrink: 0, cursor: 'pointer' }}>
            <input 
              type="checkbox" 
              checked={isPublic}
              onChange={() => onToggleVisibility(quiz.id, quiz.visibility)}
              style={{ opacity: 0, width: 0, height: 0 }}
            />
            <span style={{
              position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
              backgroundColor: isPublic ? '#10B981' : '#CBD5E1', // Xanh khi Public, Xám khi Private
              transition: '.3s', borderRadius: '24px'
            }}>
              <span style={{
                position: 'absolute', content: '""', height: '18px', width: '18px',
                left: isPublic ? '22px' : '3px', bottom: '3px',
                backgroundColor: 'white', transition: '.3s', borderRadius: '50%',
                boxShadow: '0 1px 3px rgba(0,0,0,0.3)'
              }} />
            </span>
          </label>

          {/* Icon và Text hiển thị bên cạnh công tắc */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '13px', fontWeight: '600', color: isPublic ? '#10B981' : '#64748B' }}>
            {isPublic ? <Globe size={14} /> : <EyeOff size={14} />}
            {isPublic ? 'Public' : 'Private'}
          </div>

        </div>
      </td>

      {/* 3. Created Date */}
      <td className="col-quiz-date">
        <span className="date-text">{quiz.createdDate}</span>
      </td>

      {/* 4. Actions */}
      <td className="col-quiz-actions">
        <div className="actions-button-group">
          {/* Các nút bấm (Luôn cho phép thao tác bất kể Public hay Private) */}
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
        </div>
      </td>
    </tr>
  );
};

export default QuizTableRow;