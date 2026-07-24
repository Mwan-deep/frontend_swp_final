import React, { useState } from 'react';
import { FileText, Plus, X, Loader2 } from 'lucide-react';
import axiosClient from '../../../utils/axiosClient';

const ManualAddCard = ({ onSaveSuccess }) => {
  const [questionText, setQuestionText] = useState('');
  
  // Chỉ tập trung vào câu hỏi và đáp án, ĐÃ BỎ subject và difficulty
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
    // 1. Tự động lọc ra những đáp án có điền chữ (bỏ qua ô trống)
    const validOptions = options.filter(opt => opt.value.trim() !== '');

    // 2. Kiểm tra điều kiện
    if (!questionText.trim()) {
      alert("Vui lòng nhập nội dung câu hỏi!");
      return;
    }
    if (validOptions.length < 2) {
      alert("Vui lòng điền ít nhất 2 đáp án để tạo thành câu hỏi trắc nghiệm!");
      return;
    }
    if (!validOptions.some(opt => opt.isCorrect)) {
      alert("Vui lòng chọn 1 đáp án đúng!");
      return;
    }

    setIsSaving(true);
    try {
      // 3. Payload SIÊU SẠCH: Chỉ gửi chính xác những gì Backend Java đang dùng
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

      alert("Lưu câu hỏi thành công!");
      
      // Reset form sau khi lưu
      setQuestionText('');
      setOptions(options.map((opt, i) => ({ ...opt, value: '', isCorrect: i === 0 })));
      
    } catch (error) {
      console.error("Chi tiết lỗi:", error);
      // Ép Frontend in ra bằng được lời "mắng" của Backend
      const backendError = error.response?.data?.message || error.response?.data || error.message;
      const errorString = typeof backendError === 'string' ? backendError : JSON.stringify(backendError);
      
      alert(`Lỗi từ máy chủ:\n${errorString}`);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="gq-card">
      <div className="gq-card-header">
        <div className="gq-card-icon manual"><FileText size={20} /></div>
        <h3 className="gq-card-title">Tạo Câu Hỏi Thủ Công</h3>
      </div>
      
      <div className="gq-input-group">
        <label className="gq-label">Nội dung câu hỏi</label>
        <textarea 
          className="gq-textarea" 
          placeholder="Nhập nội dung câu hỏi vào đây..." 
          value={questionText}
          onChange={(e) => setQuestionText(e.target.value)}
        />
      </div>

      <div className="gq-input-group">
        <label className="gq-label">Đáp án (Tích chọn vào đáp án đúng)</label>
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
              placeholder={`Đáp án ${String.fromCharCode(65 + index)} (Bỏ trống nếu không dùng)`} 
              value={opt.value}
              onChange={(e) => handleOptionChange(opt.id, e.target.value)}
            />
          </div>
        ))}
      </div>

      <button className="gq-btn-save" onClick={handleSave} disabled={isSaving}>
        {isSaving ? "Đang lưu..." : "Lưu Câu Hỏi"}
      </button>
    </div>
  );
};

export default ManualAddCard;
