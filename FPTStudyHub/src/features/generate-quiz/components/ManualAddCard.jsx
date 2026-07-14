import React, { useState } from 'react';
import { FileText, Plus, X, Loader2 } from 'lucide-react';
import axiosClient from '../../../utils/axiosClient';

const ManualAddCard = ({ onSaveSuccess }) => {
  const [questionText, setQuestionText] = useState('');
  const [subject, setSubject] = useState('Java Programming');
  const [difficulty, setDifficulty] = useState('Easy');
  
  // State xịn hơn: Lưu luôn nội dung text và cờ đúng/sai
  const [options, setOptions] = useState([
    { id: 1, text: '', isCorrect: true },
    { id: 2, text: '', isCorrect: false },
    { id: 3, text: '', isCorrect: false },
    { id: 4, text: '', isCorrect: false }
  ]);
  const [isSaving, setIsSaving] = useState(false);

  const handleOptionChange = (id, newText) => {
    setOptions(options.map(opt => opt.id === id ? { ...opt, text: newText } : opt));
  };

  const setCorrectOption = (id) => {
    setOptions(options.map(opt => ({ ...opt, isCorrect: opt.id === id })));
  };

  const handleSave = async () => {
    if (!questionText.trim() || options.some(o => !o.text.trim())) {
      alert("Vui lòng điền đầy đủ câu hỏi và các đáp án!");
      return;
    }

    setIsSaving(true);
    try {
      const payload = {
        content: questionText,
        subject: subject,
        difficulty: difficulty.toUpperCase(),
        options: options.map(opt => ({ text: opt.text, isCorrect: opt.isCorrect }))
      };

      // Gọi API lưu xuống Database
      const response = await axiosClient.post('/api/v1/question-sets/questions/create', payload);
      const savedQuestion = response.result || response.data;

      if (onSaveSuccess) {
        onSaveSuccess(savedQuestion); // Bắn câu hỏi thật (có ID thật) ra bảng
      }

      alert("Lưu câu hỏi thành công!");
      setQuestionText('');
      setOptions(options.map((opt, i) => ({ ...opt, text: '', isCorrect: i === 0 })));
    } catch (error) {
      console.error(error);
      alert("Lỗi lưu câu hỏi!");
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
              placeholder={`Option ${String.fromCharCode(65 + index)}`} 
              value={opt.text}
              onChange={(e) => handleOptionChange(opt.id, e.target.value)}
            />
          </div>
        ))}
      </div>

      <div className="gq-row-2">
        <div className="gq-input-group w-50">
          <label className="gq-label">Subject</label>
          <select className="gq-select-full" value={subject} onChange={(e) => setSubject(e.target.value)}>
            <option value="Java Programming">Java Programming</option>
            <option value="Networking">Networking</option>
            <option value="Database">Database</option>
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

      <button className="gq-btn-save" onClick={handleSave} disabled={isSaving}>
        {isSaving ? "Saving..." : "Save Question"}
      </button>
    </div>
  );
};

export default ManualAddCard;