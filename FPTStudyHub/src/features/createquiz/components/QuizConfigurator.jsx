import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';

const QuizConfigurator = ({ onSubmit }) => {
  const [questionsCount, setQuestionsCount] = useState(25);
  const [difficulty, setDifficulty] = useState('Intermediate');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [customPrompt, setCustomPrompt] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      questionsCount,
      difficulty,
      startDate,
      endDate,
      customPrompt
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
        {/* 1. Questions Count Slider */}
        <div className="form-group">
          <div className="group-label-row">
            <label className="group-label">NUMBER OF QUESTIONS</label>
            <span className="slider-value-badge">{questionsCount}</span>
          </div>
          <div className="slider-wrapper">
            <input 
              type="range" 
              min="5" 
              max="50" 
              value={questionsCount}
              onChange={(e) => setQuestionsCount(parseInt(e.target.value))}
              className="config-slider"
            />
            <div className="slider-labels">
              <span>5</span>
              <span>25</span>
              <span>50</span>
            </div>
          </div>
        </div>

        {/* 2. Difficulty Segmented Control */}
        <div className="form-group">
          <label className="group-label">QUIZ DIFFICULTY</label>
          <div className="segmented-control">
            {['Beginner', 'Intermediate', 'Advanced'].map((level) => {
              const isSelected = difficulty === level;
              return (
                <button
                  key={level}
                  type="button"
                  className={`segment-btn ${isSelected ? 'selected' : ''}`}
                  onClick={() => setDifficulty(level)}
                >
                  {level}
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. Duration Timeframe */}
        <div className="form-group">
          <label className="group-label">3. TIME LIMIT FRAME</label>
          <div className="datetime-inputs-row">
            <div className="sub-input-group">
              <span className="sub-label">START DATE</span>
              <input 
                type="datetime-local" 
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="datetime-input"
              />
            </div>
            <div className="sub-input-group">
              <span className="sub-label">END DATE</span>
              <input 
                type="datetime-local" 
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="datetime-input"
              />
            </div>
          </div>
        </div>

        {/* 4. Customize Content */}
        <div className="form-group">
          <label className="group-label">CUSTOMIZE CONTENT</label>
          <textarea
            placeholder="e.g. Focus on chapter 3, include calculations..."
            value={customPrompt}
            onChange={(e) => setCustomPrompt(e.target.value)}
            className="config-textarea"
            rows="3"
          />
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn-generate-ai-quiz">
          <Sparkles size={16} fill="currentColor" />
          Generate AI Quiz
        </button>
      </form>
    </div>
  );
};

export default QuizConfigurator;