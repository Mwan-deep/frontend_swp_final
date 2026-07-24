import React, { useState } from 'react';
import { FileText, Plus, X, Loader2 } from 'lucide-react';
import axiosClient from '../../../utils/axiosClient';

const ManualAddCard = ({ onSaveSuccess }) => {
  const [questionText, setQuestionText] = useState('');
  
  // Focus only on question and options, REMOVED subject and difficulty
  const [options, setOptions] = useState([
    { id: 1, value: '', isCorrect: true },
    { id: 2, value: '', isCorrect: false },
    { id: 3, value: '', isCorrect: false },
    { id: 4, value: '', isCorrect: false }
  ]);
  
  const [isSaving, setIsSaving] = useState(false);

  const handleOptionChange = (id, newValue) => {
    setOptions(options.map(opt => opt.id === id ? { ...opt, value: newValue } : opt));
  };

  const setCorrectOption = (id) => {
    setOptions(options.map(opt => ({ ...opt, isCorrect: opt.id === id })));
  };

  const handleSave = async () => {
    // 1. Automatically filter out empty options
    const validOptions = options.filter(opt => opt.value.trim() !== '');

    // 2. Validate inputs
    if (!questionText.trim()) {
      alert("Please enter the question content!");
      return;
    }
    if (validOptions.length < 2) {
      alert("Please provide at least 2 options for a multiple-choice question!");
      return;
    }
    if (!validOptions.some(opt => opt.isCorrect)) {
      alert("Please select 1 correct option!");
      return;
    }

    setIsSaving(true);
    try {
      // 3. CLEAN PAYLOAD: Send exactly what the Backend expects
      const payload = {
        content: questionText.trim(),
        options: validOptions.map(opt => ({ 
            text: opt.value.trim(), 
            isCorrect: opt.isCorrect 
        }))
      };

      const response = await axiosClient.post('/api/v1/question-sets/questions/create', payload);
      const savedQuestion = response.result || response.data;

      if (onSaveSuccess) {
        onSaveSuccess(savedQuestion); 
      }

      alert("Question saved successfully!");
      
      // Reset form after saving
      setQuestionText('');
      setOptions(options.map((opt, i) => ({ ...opt, value: '', isCorrect: i === 0 })));
      
    } catch (error) {
      console.error("Error details:", error);
      // Force Frontend to display the Backend error message
      const backendError = error.response?.data?.message || error.response?.data || error.message;
      const errorString = typeof backendError === 'string' ? backendError : JSON.stringify(backendError);
      
      alert(`Server Error:\n${errorString}`);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="gq-card">
      <div className="gq-card-header">
        <div className="gq-card-icon manual"><FileText size={20} /></div>
        <h3 className="gq-card-title">Add Question Manually</h3>
      </div>
      
      <div className="gq-input-group">
        <label className="gq-label">Question Text</label>
        <textarea 
          className="gq-textarea" 
          placeholder="Enter your question here..." 
          value={questionText}
          onChange={(e) => setQuestionText(e.target.value)}
        />
      </div>

      <div className="gq-input-group">
        <label className="gq-label">Options (Tick the correct answer)</label>
        {options.map((opt, index) => (
          <div className="gq-option-row" key={opt.id} style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '8px' }}>
            <input 
              type="radio" 
              name="manual_correct_opt" 
              checked={opt.isCorrect}
              onChange={() => setCorrectOption(opt.id)}
              style={{ cursor: 'pointer' }}
            />
            <input 
              type="text" 
              className="gq-input" 
              placeholder={`Option ${String.fromCharCode(65 + index)} (Leave empty if not used)`} 
              value={opt.value}
              onChange={(e) => handleOptionChange(opt.id, e.target.value)}
            />
          </div>
        ))}
      </div>

      <button className="gq-btn-save" onClick={handleSave} disabled={isSaving}>
        {isSaving ? "Saving..." : "Save Question"}
      </button>
    </div>
  );
};

export default ManualAddCard;
