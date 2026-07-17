import React from 'react';
import { Mail, RotateCcw, ArrowRight, ArrowLeft } from 'lucide-react';

const StepEmail = ({ email, setEmail, onSubmit, onBackToLogin }) => {
  return (
    <>
      <div className="reset-card-header">
        <div className="reset-icon-badge peach-bg">
          <RotateCcw className="reset-badge-icon" size={24} />
        </div>
        <h2 className="reset-card-title">Reset Password</h2>
        <p className="reset-card-subtitle">
          Enter your email address to receive a verification code
        </p>
      </div>

      <form onSubmit={onSubmit} className="login-form-content">
        <div className="form-group-item">
          <label htmlFor="reset-email-input">Email Address</label>
          <div className="input-with-icon-wrapper">
            <Mail className="input-field-icon" size={18} />
            <input
              id="reset-email-input"
              type="email"
              className="form-text-input input-with-icon-padding"
              placeholder="name@university.edu"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </div>

        <button type="submit" className="login-submit-button btn-blue-theme">
          <span>Continue</span>
          <ArrowRight size={18} />
        </button>
      </form>

      <div className="reset-divider-line"></div>

      <div className="reset-back-to-login" onClick={onBackToLogin}>
        <ArrowLeft size={16} />
        <span>Back to Login</span>
      </div>
    </>
  );
};

export default StepEmail;
