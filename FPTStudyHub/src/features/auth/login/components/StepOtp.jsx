import React from 'react';
import { ShieldCheck, ArrowLeft } from 'lucide-react';

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

export default StepOtp;
