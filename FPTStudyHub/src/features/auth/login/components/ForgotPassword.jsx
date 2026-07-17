import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import StepsIndicator from './StepsIndicator';
import StepEmail from './StepEmail';
import StepOtp from './StepOtp';
import StepNewPassword from './StepNewPassword';
import StepDone from './StepDone';
import './ForgotPassword.css';

// Main Export Component
const ForgotPassword = ({ onBackToLogin }) => {
  const navigate = useNavigate();
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

  const handleBackToLogin = () => {
    if (onBackToLogin) {
      onBackToLogin();
    } else {
      navigate('/login');
    }
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
            onBackToLogin={handleBackToLogin}
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
            onBackToLogin={handleBackToLogin}
          />
        )}

        {step === 4 && (
          <StepDone
            onBackToLogin={handleBackToLogin}
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
