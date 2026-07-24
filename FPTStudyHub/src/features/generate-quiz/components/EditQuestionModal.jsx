import React, { useState, useEffect } from 'react';
import { X, Plus } from 'lucide-react';

const EditQuestionModal = ({ question, onClose, onSave }) => {
  const [content, setContent] = useState('');
  const [subject, setSubject] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [options, setOptions] = useState([]);
  const [correctOptionId, setCorrectOptionId] = useState(null);

  // Populate question data into form when opening Modal
  useEffect(() => {
    if (question) {
      setContent(question.content || '');
      setSubject(question.subject || 'Java Programming');
      
      // Capitalize the first letter of Difficulty
      const diff = question.difficulty ? question.difficulty.charAt(0).toUpperCase() + question.difficulty.slice(1).toLowerCase() : 'Easy';
      setDifficulty(diff);
      
      // Create default options if the question doesn't have them
      const initialOptions = question.options && question.options.length > 0 
        ? question.options 
        : [
            { id: 1, value: 'Inheritance allows a class to acquire properties of another class.' },
            { id: 2, value: 'Inheritance is a way to hide data from other classes.' }
          ];
      setOptions(initialOptions);
      setCorrectOptionId(initialOptions[0]?.id || null);
    }
  }, [question]);

  if (!question) return null;

  const handleOptionChange = (id, newValue) => {
    setOptions(options.map(opt => opt.id === id ? { ...opt, value: newValue } : opt));
  };

  const handleAddOption = () => {
    const newId = options.length > 0 ? Math.max(...options.map(o => o.id)) + 1 : 1;
    setOptions([...options, { id: newId, value: '' }]);
  };

  const handleSave = () => {
    // Package the updated data
    const updatedQuestion = {
      ...question,
      content,
      subject,
      difficulty: difficulty.toUpperCase(),
      options: options.map(opt => ({
        ...opt,
        isCorrect: opt.id === correctOptionId
      }))
    };
    onSave(updatedQuestion);
  };

  return (
    <div className="gq-modal-overlay">
      <div className="gq-modal-content">
        <div className="gq-modal-header">
          <h2 className="gq-modal-title">Edit Question - {question.id}</h2>
          <button className="gq-modal-close" onClick={onClose}><X size={20} /></button>
        </div>

        <div className="gq-modal-body">
          <div className="gq-input-group">
            <label className="gq-label">Question Content</label>
            <textarea 
              className="gq-textarea" 
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>

          <div className="gq-row-2">
            <div className="gq-input-group w-50">
              <label className="gq-label">Subject</label>
              <select className="gq-select-full" value={subject} onChange={(e) => setSubject(e.target.value)}>
                <option value="Java Programming">Java Programming</option>
                <option value="Networking">Networking</option>
                <option value="Database">Database</option>
                <option value="Web Development">Web Development</option>
              </select>
            </div>
            <div className="gq-input-group w-50">
              <label className="gq-label">Difficulty</label>
              <select className="gq-select-full" value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>
          </div>

          <div className="gq-options-section">
            <div className="gq-options-header">
              <label className="gq-label">Question Options</label>
              <span className="gq-options-hint">Select the radio button for the correct answer</span>
            </div>
            
            <div className="gq-options-list">
              {options.map((opt) => (
                <div className="gq-modal-option-row" key={opt.id}>
                  <div className="gq-custom-radio">
                    <input 
                      type="radio" 
                      name="modal_correct_opt" 
                      id={`opt_${opt.id}`}
                      checked={correctOptionId === opt.id}
                      onChange={() => setCorrectOptionId(opt.id)}
                    />
                    <label htmlFor={`opt_${opt.id}`}></label>
                  </div>
                  <input 
                    type="text" 
                    className="gq-input" 
                    value={opt.value}
                    onChange={(e) => handleOptionChange(opt.id, e.target.value)}
                  />
                </div>
              ))}
            </div>

            <button className="gq-btn-add-modal-opt" onClick={handleAddOption}>
              <Plus size={16} /> Add Option
            </button>
          </div>
        </div>

        <div className="gq-modal-footer">
          <button className="gq-btn-cancel" onClick={onClose}>Cancel</button>
          <button className="gq-btn-save-modal" onClick={handleSave}>Save Changes</button>
        </div>
      </div>
    </div>
  );
};

export default EditQuestionModal;
