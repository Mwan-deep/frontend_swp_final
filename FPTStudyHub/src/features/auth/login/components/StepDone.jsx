import React from 'react';
import { CheckCircle2, ArrowRight } from 'lucide-react';

const StepDone = ({ onBackToLogin }) => {
  return (
    <>
      <div className="reset-card-header done-step-padding">
        <div className="reset-icon-badge green-bg">
          <CheckCircle2 className="reset-badge-icon text-white" size={28} />
        </div>
        <h2 className="reset-card-title">Password Reset Successful</h2>
        <p className="reset-card-subtitle text-dark-muted">
          Your password has been reset successfully. You can now log in with your new credentials.
        </p>
      </div>

      <button type="button" className="login-submit-button btn-blue-theme" onClick={onBackToLogin}>
        <span>Back to Login</span>
        <ArrowRight size={18} />
      </button>
    </>
  );
};

export default StepDone;
