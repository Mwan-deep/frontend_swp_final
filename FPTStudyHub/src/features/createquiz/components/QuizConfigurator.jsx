import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';

const QuizConfigurator = ({ onSubmit, isGenerating }) => {
  // Chỉ giữ lại duy nhất state số lượng câu hỏi
  const [questionsCount, setQuestionsCount] = useState(15);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Trả duy nhất trường quantity lên component cha (CreateQuiz)
    onSubmit({
      quantity: questionsCount
    });
  };

  return (
    <div className="create-card quiz-configurator-card">
      <div className="card-header">
        <div className="header-titles">
          <h2 className="card-title">2. AI Configuration</h2>
          <p className="card-subtitle">Select the number of questions for AI to generate.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="config-form">
        
        {/* Questions Count Slider */}
        <div className="form-group" style={{ marginBottom: '32px' }}>
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

        {/* Submit Button */}
        <button type="submit" className="btn-generate-ai-quiz" disabled={isGenerating}>
          <Sparkles size={16} fill="currentColor" />
          {isGenerating ? 'AI is Generating...' : 'Generate Questions'}
        </button>
      </form>
    </div>
  );
};

export default QuizConfigurator;