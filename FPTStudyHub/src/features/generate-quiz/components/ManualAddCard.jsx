import React, { useState } from 'react';
import { FileText, Plus, X } from 'lucide-react';

const ManualAddCard = ({ onSave }) => { // Nhận prop onSave từ trang cha
  // State quản lý dữ liệu người dùng nhập
  const [questionText, setQuestionText] = useState('');
  const [subject, setSubject] = useState('Java Programming');
  const [difficulty, setDifficulty] = useState('Easy');
  
  const [options, setOptions] = useState([
    { id: 1, placeholder: 'Option A' },
    { id: 2, placeholder: 'Option B' }
  ]);

  const handleAddOption = () => {
    const newId = options.length > 0 ? Math.max(...options.map(o => o.id)) + 1 : 1;
    const nextLetter = String.fromCharCode(65 + options.length);
    setOptions([...options, { id: newId, placeholder: `Option ${nextLetter}` }]);
  };

  const handleRemoveOption = (id) => {
    if (options.length > 2) {
      setOptions(options.filter(o => o.id !== id));
    }
  };

  const handleSave = () => {
    if (!questionText.trim()) {
      alert("Please enter the question text!");
      return;
    }

    // 1. Tạo một object câu hỏi mới khớp với cấu trúc bảng
    const newQuestion = {
      id: `QB-${Math.floor(Math.random() * 1000) + 2000}`, // Random ID ví dụ: QB-2451
      content: questionText,
      subject: subject,
      difficulty: difficulty.toUpperCase(),
      created: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      status: 'active'
    };

    // 2. Truyền câu hỏi mới này cho trang cha (GenerateQuizPage) để nó cập nhật bảng
    if (onSave) {
      onSave(newQuestion);
    }

    alert("Question added to the bank successfully!");
    
    // 3. Xóa trắng form sau khi lưu
    setQuestionText('');
    setOptions([{ id: 1, placeholder: 'Option A' }, { id: 2, placeholder: 'Option B' }]);
  };

  return (
    <div className="gq-card">
      <div className="gq-card-header">
        <div className="gq-card-icon manual">
          <FileText size={20} />
        </div>
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
        <label className="gq-label">Options</label>
        {options.map((opt) => (
          <div className="gq-option-row" key={opt.id}>
            <input type="radio" name="correct_opt" />
            <input type="text" className="gq-input" placeholder={opt.placeholder} />
            {options.length > 2 && (
              <button className="gq-btn-remove-opt" onClick={() => handleRemoveOption(opt.id)}>
                <X size={16} />
              </button>
            )}
          </div>
        ))}
        <button className="gq-btn-add-opt" onClick={handleAddOption}>
          <Plus size={14} /> Add Option
        </button>
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

      <button className="gq-btn-save" onClick={handleSave}>Save Question</button>
    </div>
  );
};

export default ManualAddCard;