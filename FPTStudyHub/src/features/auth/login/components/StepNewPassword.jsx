import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, ArrowLeft } from 'lucide-react';

const StepNewPassword = ({ email, newPassword, setNewPassword, confirmPassword, setConfirmPassword, onSubmit, onBackToLogin }) => {
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const maskEmail = (emailStr) => {
    if (!emailStr) return '';
    const [name, domain] = emailStr.split('@');
    if (name.length <= 3) {
      return `${name}***@${domain}`;
    }
    return `${name.substring(0, 3)}***@${domain}`;
  };

  return (
    <>
      <div className="reset-card-header">
        <h2 className="reset-card-title">Create New Password</h2>
        <p className="reset-card-subtitle">
          Secure your account with a unique password.
        </p>
      </div>

      <form onSubmit={onSubmit} className="login-form-content">
        <div className="masked-email-display-box">
          <Mail className="masked-email-icon" size={16} />
          <span>Email: {maskEmail(email)}</span>
        </div>

        <div className="form-group-item">
          <label htmlFor="reset-new-password">New Password</label>
          <div className="password-input-wrapper">
            <Lock className="input-field-icon left-pos" size={18} />
            <input
              id="reset-new-password"
              type={showNewPassword ? 'text' : 'password'}
              className="form-text-input input-with-icon-padding password-input-field"
              placeholder="••••••••"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="password-visibility-toggle"
              onClick={() => setShowNewPassword(!showNewPassword)}
            >
              {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          <span className="password-character-hint">Must be at least 8 characters</span>
        </div>

        <div className="form-group-item">
          <label htmlFor="reset-confirm-password">Confirm Password</label>
          <div className="password-input-wrapper">
            <Lock className="input-field-icon left-pos" size={18} />
            <input
              id="reset-confirm-password"
              type={showConfirmPassword ? 'text' : 'password'}
              className="form-text-input input-with-icon-padding password-input-field"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="password-visibility-toggle"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <button type="submit" className="login-submit-button btn-blue-theme">
          <span>Reset Password</span>
        </button>
      </form>

      <div className="reset-back-to-login" onClick={onBackToLogin}>
        <ArrowLeft size={16} />
        <span>Back to Login</span>
      </div>
    </>
  );
};

export default StepNewPassword;
