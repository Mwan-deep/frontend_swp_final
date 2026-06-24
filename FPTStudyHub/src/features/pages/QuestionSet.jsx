import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';

// Import Components
import StatCard from '../questionset/components/StatCard';
import QuestionSetCard from '../questionset/components/QuestionSetCard';
import AddNewSetCard from '../questionset/components/AddNewSetCard';
import './QuestionSet.css';

// Import Dữ liệu giả
import { STAT_DATA, QUESTION_SETS } from '../../data/mockQuestionSetData';

const QuestionSet = () => {
  const navigate = useNavigate();

  const handleCreateNew = () => {
    navigate('/create-quiz');
  };

  return (
    <div className="question-set-container">
      {/* Header */}
      <div className="qs-header">
        <div className="qs-title-section">
          <h1>Question Set Management</h1>
          <p>Organize and manage shared examination resources across faculties.</p>
        </div>
        <div className="qs-actions">
          <select className="qs-select">
            <option value="all">All Majors</option>
            <option value="it">Info. Technology</option>
            <option value="business">Business Admin</option>
          </select>
          <button className="qs-btn-create" onClick={handleCreateNew}>
            <Plus size={18} />
            Create New Question Set
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="qs-stats-grid">
        {STAT_DATA.map((stat) => (
          <StatCard key={stat.id} {...stat} />
        ))}
      </div>

      {/* Cards Grid */}
      <div className="qs-cards-grid">
        {QUESTION_SETS.map((qset) => (
          <QuestionSetCard key={qset.id} {...qset} />
        ))}
        <AddNewSetCard onClick={handleCreateNew} />
      </div>
    </div>
  );
};

export default QuestionSet;