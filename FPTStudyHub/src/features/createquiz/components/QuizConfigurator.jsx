import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';

const QuizConfigurator = ({ onSubmit, isGenerating }) => {
  // Các state đồng bộ với QuizCreateRequest DTO
  const [title, setTitle] = useState('');
  const [questionsCount, setQuestionsCount] = useState(15);
  const [durationMinutes, setDurationMinutes] = useState(15);
  const [passScore, setPassScore] = useState(50);
  const [visibility, setVisibility] = useState('PRIVATE');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      alert("Vui lòng nhập tên đề thi!");
      return;
    }
    
    // Trả dữ liệu lên component cha (CreateQuiz)
    onSubmit({
      title,
      quantity: questionsCount,
      durationMinutes,
      passScore,
      visibility
    });
  };

  return (
    <div className="create-card quiz-configurator-card">
      <div className="card-header">
        <div className="header-titles">
          <h2 className="card-title">2. Quiz Configuration</h2>
          <p className="card-subtitle">Customize settings to generate questions.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="config-form">
        
        {/* Quiz Title */}
        <div className="form-group">
          <label className="group-label">QUIZ TITLE</label>
          <input 
            type="text" 
            placeholder="e.g. Midterm Exam - Java OOP"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="config-textarea"
            style={{ height: '40px' }}
            required
          />
        </div>

        {/* Questions Count Slider */}
        <div className="form-group">
          <div className="group-label-row">
            <label className="group-label">NUMBER OF QUESTIONS</label>
            <span className="slider-value-badge">{questionsCount}</span>
          </div>
          <div className="slider-wrapper">
            <input 
              type="range" min="5" max="50" step="5"
              value={questionsCount}
              onChange={(e) => setQuestionsCount(parseInt(e.target.value))}
              className="config-slider"
            />
            <div className="slider-labels">
              <span>5</span><span>25</span><span>50</span>
            </div>
          </div>
        </div>

        {/* Duration & Pass Score */}
        <div className="form-group">
          <label className="group-label">EXAM SETTINGS</label>
          <div className="datetime-inputs-row">
            <div className="sub-input-group">
              <span className="sub-label">DURATION (MINUTES)</span>
              <input 
                type="number" min="5" max="180"
                value={durationMinutes}
                onChange={(e) => setDurationMinutes(parseInt(e.target.value))}
                className="datetime-input"
              />
            </div>
            <div className="sub-input-group">
              <span className="sub-label">PASS SCORE (%)</span>
              <input 
                type="number" min="10" max="100" step="10"
                value={passScore}
                onChange={(e) => setPassScore(parseInt(e.target.value))}
                className="datetime-input"
              />
            </div>
          </div>
        </div>

        {/* Visibility */}
        <div className="form-group">
          <label className="group-label">ACCESS MODE</label>
          <div className="segmented-control">
            {['PRIVATE', 'PUBLIC'].map((mode) => (
              <button
                key={mode} type="button"
                className={`segment-btn ${visibility === mode ? 'selected' : ''}`}
                onClick={() => setVisibility(mode)}
              >
                {mode === 'PRIVATE' ? '🔒 Private' : '🌐 Public'}
              </button>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn-generate-ai-quiz" disabled={isGenerating}>
          <Sparkles size={16} fill="currentColor" />
          {isGenerating ? 'AI is Generating...' : 'Generate & Create Quiz'}
        </button>
      </form>
    </div>
  );
};

export default QuizConfigurator;