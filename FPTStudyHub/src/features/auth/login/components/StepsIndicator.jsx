import React from 'react';

const StepsIndicator = ({ step }) => {
  if (step === 4) {
    return (
      <div className="reset-steps-complete-header">
        <div className="steps-complete-lines">
          <span className="step-line active"></span>
          <span className="step-line active"></span>
          <span className="step-line active"></span>
          <span className="step-line active"></span>
        </div>
        <span className="step-complete-text">Step 4: Complete</span>
      </div>
    );
  }

  return (
    <div className="reset-steps-indicator">
      <div className={`step-item ${step >= 1 ? 'active' : ''}`}>
        <div className="step-badge">1</div>
        <span className="step-label">EMAIL</span>
      </div>
      <div className={`step-connector-line ${step >= 2 ? 'active' : ''}`}></div>

      <div className={`step-item ${step >= 2 ? 'active' : ''}`}>
        <div className="step-badge">2</div>
        <span className="step-label">OTP</span>
      </div>
      <div className={`step-connector-line ${step >= 3 ? 'active' : ''}`}></div>

      <div className={`step-item ${step >= 3 ? 'active' : ''}`}>
        <div className="step-badge">3</div>
        <span className="step-label">NEW PASS</span>
      </div>
      <div className={`step-connector-line ${step >= 4 ? 'active' : ''}`}></div>

      <div className={`step-item ${step >= 4 ? 'active' : ''}`}>
        <div className="step-badge">4</div>
        <span className="step-label">DONE</span>
      </div>
    </div>
  );
};

export default StepsIndicator;
