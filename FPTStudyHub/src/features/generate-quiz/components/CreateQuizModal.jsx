import React, { useState } from 'react';
import { X, Eye, EyeOff, Info, FileQuestion, Lock } from 'lucide-react';

const CreateQuizModal = ({ onClose, onCreate }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [visibility, setVisibility] = useState('public');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleCreate = () => {
    if (!title.trim()) {
      alert("Please enter a Quiz Title");
      return;
    }
    // Nếu chọn private thì bắt buộc nhập mật khẩu
    if (visibility === 'private' && !password.trim()) {
      alert("Please enter an access password for the private quiz");
      return;
    }

    // Đóng gói dữ liệu gửi ra ngoài
    const newQuizData = {
      title,
      description,
      visibility,
      password
    };
    onCreate(newQuizData);
  };

  return (
    <div className="gq-modal-overlay">
      <div className="gq-modal-content create-quiz">
        
        {/* Header */}
        <div className="gq-modal-header">
          <div className="gq-modal-title-wrap">
            <div className="gq-modal-title-icon">
              <FileQuestion size={20} color="#b45309" />
            </div>
            <h2 className="gq-modal-title" style={{ color: '#111827' }}>Create New Quiz</h2>
          </div>
          <button className="gq-modal-close" onClick={onClose}><X size={20} /></button>
        </div>

        {/* Body */}
        <div className="gq-modal-body">
          <div className="gq-input-group">
            <label className="gq-label">Quiz Title</label>
            <input 
              type="text" 
              className="gq-input" 
              placeholder="e.g., Introduction to Computer Science Midterm"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="gq-input-group">
            <label className="gq-label">Description</label>
            <textarea 
              className="gq-textarea" 
              placeholder="Briefly describe the scope and objectives of this quiz..."
              style={{ minHeight: '80px' }}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* Visibility Selection */}
          <div className="gq-input-group">
            <label className="gq-label">Visibility</label>
            <div className="gq-visibility-options">
              
              <div 
                className={`gq-visibility-card ${visibility === 'public' ? 'selected' : ''}`}
                onClick={() => setVisibility('public')}
              >
                <div className={`gq-radio-custom ${visibility === 'public' ? 'checked' : ''}`}>
                  <div className="gq-radio-dot"></div>
                </div>
                <div className="gq-vis-text">
                  <h4>Public</h4>
                  <p>Visible to all students</p>
                </div>
              </div>

              <div 
                className={`gq-visibility-card ${visibility === 'private' ? 'selected' : ''}`}
                onClick={() => setVisibility('private')}
              >
                <div className="gq-vis-icon-blue">
                  {/* Đã thay đổi icon Network thành Lock ở đây */}
                  <Lock size={22} />
                </div>
                <div className="gq-vis-text">
                  <h4>Private</h4>
                  <p>Restricted access</p>
                </div>
              </div>

            </div>
          </div>

          {/* Chỉ hiện Password khi chọn Private */}
          {visibility === 'private' && (
            <div className="gq-input-group">
              <label className="gq-label">Access Password</label>
              <div className="gq-password-wrapper">
                <input 
                  type={showPassword ? "text" : "password"} 
                  className="gq-input gq-password-input" 
                  placeholder="Enter protection password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button 
                  type="button" 
                  className="gq-btn-eye"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} color="#6b7280" /> : <Eye size={18} color="#6b7280" />}
                </button>
              </div>
              <div className="gq-password-hint">
                <Info size={16} color="#4b5563" />
                <span>Passwords provide an extra layer of security for both private and public quizzes.</span>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="gq-modal-footer center">
          <button className="gq-btn-cancel-outline" onClick={onClose}>Cancel</button>
          <button className="gq-btn-save-modal" onClick={handleCreate}>Create Quiz</button>
        </div>

      </div>
    </div>
  );
};

export default CreateQuizModal;