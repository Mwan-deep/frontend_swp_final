import React, { useState } from 'react';
import { Sparkles, Minus, Plus } from 'lucide-react';

const AIGeneratorCard = () => {
  const [count, setCount] = useState(20);

  return (
    <div className="gq-card ai-card">
      <div className="gq-card-header">
        <div className="gq-card-icon ai">
          <Sparkles size={20} />
        </div>
        <h3 className="gq-card-title">AI Question Generator</h3>
      </div>

      <div className="gq-input-group">
        <label className="gq-label">Generation Prompt</label>
        <textarea 
          className="gq-textarea" 
          placeholder="e.g., Create 20 Java OOP multiple-choice questions..." 
          style={{ minHeight: '140px' }}
        />
      </div>

      <div className="gq-counter">
        <span className="gq-label">Questions Count</span>
        <div className="gq-counter-controls">
          <button className="gq-counter-btn" onClick={() => setCount(c => c - 1)}><Minus size={14}/></button>
          <span className="gq-counter-val">{count}</span>
          <button className="gq-counter-btn" onClick={() => setCount(c => c + 1)}><Plus size={14}/></button>
        </div>
      </div>

      <button className="gq-btn-generate">
        <Sparkles size={16} /> Generate Now
      </button>
    </div>
  );
};

export default AIGeneratorCard;