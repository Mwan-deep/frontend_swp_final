import React, { useState, useEffect, useRef } from 'react';
import { Mail, Lock, Eye, EyeOff, RotateCcw, ShieldCheck, CheckCircle2, ArrowRight, ArrowLeft } from 'lucide-react';
import './ForgotPassword.css';

// 1. Component StepsIndicator
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

// 2. Component StepEmail
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

// 3. Component StepOtp
const StepOtp = ({ otp, setOtp, onSubmit, onBack, timer, onResendOtp, otpInputsRef }) => {
  const handleOtpChange = (e, index) => {
    const value = e.target.value;
    if (isNaN(value)) return;
    
    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    if (value && index < 5) {
      otpInputsRef.current[index + 1].focus();
    }
  };

  const handleOtpKeyDown = (e, index) => {
    if (e.key === 'Backspace') {
      const newOtp = [...otp];
      if (!newOtp[index] && index > 0) {
        newOtp[index - 1] = '';
        setOtp(newOtp);
        otpInputsRef.current[index - 1].focus();
      } else {
        newOtp[index] = '';
        setOtp(newOtp);
      }
    }
  };

  return (
    <>
      <div className="reset-card-header">
        <div className="reset-icon-badge dark-orange-bg">
          <ShieldCheck className="reset-badge-icon text-white" size={24} />
        </div>
        <h2 className="reset-card-title">Verify Your Email</h2>
        <p className="reset-card-subtitle">
          We've sent a 6-digit code to your email address.
        </p>
      </div>

      <form onSubmit={onSubmit} className="login-form-content">
        <div className="otp-inputs-grid">
          {otp.map((digit, idx) => (
            <input
              key={idx}
              ref={(el) => (otpInputsRef.current[idx] = el)}
              type="text"
              maxLength={1}
              className="otp-digit-input"
              value={digit}
              onChange={(e) => handleOtpChange(e, idx)}
              onKeyDown={(e) => handleOtpKeyDown(e, idx)}
              required
            />
          ))}
        </div>

        <div className="otp-timer-message">
          {timer > 0 ? (
            <span>Didn't receive the code? Resend OTP in {timer}s</span>
          ) : (
            <button type="button" className="otp-resend-btn" onClick={onResendOtp}>
              Resend OTP code
            </button>
          )}
        </div>

        <button type="submit" className="login-submit-button btn-brown-theme">
          <span>Verify</span>
        </button>
      </form>

      <div className="reset-back-to-login" onClick={onBack}>
        <ArrowLeft size={16} />
        <span>Back to password reset</span>
      </div>
    </>
  );
};

// 4. Component StepNewPassword
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

// 5. Component StepDone
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

// Main Export Component
const ForgotPassword = ({ onBackToLogin }) => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [timer, setTimer] = useState(60);
  const otpInputsRef = useRef([]);

  useEffect(() => {
    let interval;
    if (step === 2 && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [step, timer]);

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setStep(2);
    setTimer(60);
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    const otpCode = otp.join('');
    if (otpCode.length < 6) {
      alert('Please enter all 6 digits of the OTP code.');
      return;
    }
    setStep(3);
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (newPassword.length < 8) {
      alert('Password must be at least 8 characters long.');
      return;
    }
    if (newPassword !== confirmPassword) {
      alert('Passwords do not match.');
      return;
    }
    setStep(4);
  };

  const handleResendOtp = () => {
    setTimer(60);
    setOtp(['', '', '', '', '', '']);
    alert('A new verification code has been sent to your email.');
  };

  return (
    <div className="forgot-password-flow-wrapper">
      <StepsIndicator step={step} />

      <div className="login-card-wrapper reset-password-card">
        {step === 1 && (
          <StepEmail
            email={email}
            setEmail={setEmail}
            onSubmit={handleEmailSubmit}
            onBackToLogin={onBackToLogin}
          />
        )}

        {step === 2 && (
          <StepOtp
            otp={otp}
            setOtp={setOtp}
            onSubmit={handleOtpSubmit}
            onBack={() => setStep(1)}
            timer={timer}
            onResendOtp={handleResendOtp}
            otpInputsRef={otpInputsRef}
          />
        )}

        {step === 3 && (
          <StepNewPassword
            email={email}
            newPassword={newPassword}
            setNewPassword={setNewPassword}
            confirmPassword={confirmPassword}
            setConfirmPassword={setConfirmPassword}
            onSubmit={handlePasswordSubmit}
            onBackToLogin={onBackToLogin}
          />
        )}

        {step === 4 && (
          <StepDone
            onBackToLogin={onBackToLogin}
          />
        )}
      </div>

      <div className="reset-external-support-footer">
        {step === 4 ? (
          <span>Having trouble logging in? <a href="#support">Contact Support</a></span>
        ) : (
          <span>Having trouble? <a href="#support">Contact Support</a></span>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
