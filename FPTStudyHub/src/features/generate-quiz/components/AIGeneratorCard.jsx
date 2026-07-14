import React, { useState } from 'react';
import { Sparkles, Minus, Plus, Loader2 } from 'lucide-react';
import axiosClient from '../../../utils/axiosClient';

const AIGeneratorCard = ({ onGenerateSuccess }) => {
  const [count, setCount] = useState(5); 
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      alert("Vui lòng nhập yêu cầu cho AI (VD: Tạo 5 câu hỏi về Tính Kế Thừa...)");
      return;
    }

    setIsGenerating(true);
    try {
      // Gọi API sinh câu hỏi từ text tự do
      const response = await axiosClient.post('/api/v1/quizzes/generate-from-prompt', {
        prompt: prompt,
        quantity: count
      });

      const newQuestions = response.result || response.data || [];
      
      // Bắn dữ liệu về bảng chính
      if (onGenerateSuccess) {
        onGenerateSuccess(newQuestions);
      }
      
      alert("AI đã sinh câu hỏi thành công!");
      setPrompt(''); // Xóa text sau khi tạo xong
    } catch (error) {
      console.error(error);
      alert("Lỗi AI: " + (error.response?.data || "Hệ thống quá tải"));
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="gq-card ai-card">
      <div className="gq-card-header">
        <div className="gq-card-icon ai"><Sparkles size={20} /></div>
        <h3 className="gq-card-title">AI Question Generator</h3>
      </div>

      <div className="gq-input-group">
        <label className="gq-label">Generation Prompt</label>
        <textarea 
          className="gq-textarea" 
          placeholder="e.g., Create 5 Java OOP multiple-choice questions about Inheritance..." 
          style={{ minHeight: '140px' }}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
      </div>

      <div className="gq-counter">
        <span className="gq-label">Questions Count</span>
        <div className="gq-counter-controls">
          <button className="gq-counter-btn" onClick={() => setCount(c => Math.max(1, c - 1))}><Minus size={14}/></button>
          <span className="gq-counter-val">{count}</span>
          <button className="gq-counter-btn" onClick={() => setCount(c => c + 1)}><Plus size={14}/></button>
        </div>
      </div>

      <button className="gq-btn-generate" onClick={handleGenerate} disabled={isGenerating}>
        {isGenerating ? <Loader2 size={16} className="spinner" /> : <Sparkles size={16} />}
        {isGenerating ? " AI is Thinking..." : " Generate Now"}
      </button>
    </div>
  );
};

export default AIGeneratorCard;