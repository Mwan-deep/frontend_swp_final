import React, { useState } from 'react';

const SecureQuizAuth = ({ activeQuiz, onAuthSuccess, onCancel }) => {
  const [inputPassword, setInputPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showAccessPassword, setShowAccessPassword] = useState(false);

  const handleSecureAuthSubmit = (e) => {
    e.preventDefault();
    if (!activeQuiz) return;

    if (inputPassword === activeQuiz.password) {
      setPasswordError('');
      onAuthSuccess();
    } else {
      setPasswordError('Incorrect password. Access denied.');
    }
  };

  return (
    <div className="secure-access-page-wrapper">
      <div className="secure-access-card">
        
        <div className="secure-lock-icon-container">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#F26F21" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
          </svg>
        </div>

        <h2 className="secure-access-title">Secure Quiz Access</h2>
        <p className="secure-access-subtitle">
          Please authenticate to enter the examination environment.
        </p>

        <form onSubmit={handleSecureAuthSubmit}>
          
          <div className="secure-form-group">
            <label className="secure-input-label">Quiz ID</label>
            <div className="secure-input-wrapper">
              <span className="secure-input-prefix">#</span>
              <input 
                type="text" 
                value={activeQuiz.id} 
                disabled 
                className="secure-input disabled-input"
              />
            </div>
          </div>

          <div className="secure-form-group">
            <label className="secure-input-label">Access Password</label>
            <div className="secure-input-wrapper">
              <span className="secure-input-prefix">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"></path>
                </svg>
              </span>
              <input 
                type={showAccessPassword ? "text" : "password"} 
                placeholder="••••••••"
                value={inputPassword}
                onChange={(e) => {
                  setInputPassword(e.target.value);
                  setPasswordError('');
                }}
                className={passwordError ? "secure-input input-error" : "secure-input"}
                autoFocus
              />
              <button 
                type="button" 
                className="secure-toggle-pwd-btn"
                onClick={() => setShowAccessPassword(!showAccessPassword)}
              >
                {showAccessPassword ? (
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                    <line x1="1" y1="1" x2="23" y2="23"></line>
                  </svg>
                ) : (
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                )}
              </button>
            </div>
            <div className="secure-input-info">
              <span className="info-icon">ℹ️</span> Password provided by your instructor.
            </div>
          </div>

          {passwordError && <div className="secure-error-message">{passwordError}</div>}

          <div className="secure-proctored-warning">
            <span className="warning-shield-icon">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#0284C7" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              </svg>
            </span>
            <p className="warning-text">
              This is a proctored environment. Your activity may be logged once access is granted. Ensure you have a stable connection.
            </p>
          </div>

          <button type="submit" className="secure-submit-btn-full">
            Enter Assessment &rarr;
          </button>

          <button 
            type="button" 
            className="secure-cancel-link" 
            onClick={onCancel}
          >
            Cancel and return
          </button>

        </form>
      </div>
    </div>
  );
};

export default SecureQuizAuth;