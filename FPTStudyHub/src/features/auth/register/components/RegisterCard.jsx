import React from 'react';
import SocialSignup from './SocialSignup';
import RegisterForm from './RegisterForm';

const RegisterCard = () => {
  return (
    <div className="register-card">
      <div className="register-card-header">
        <h2 className="register-card-title">Create Account</h2>
        <p className="register-card-subtitle">
          Join the next generation of digital learners at FPT University.
        </p>
      </div>

      <SocialSignup />
      
      <div className="register-divider">
        <span>Or register with email</span>
      </div>
      
      <RegisterForm />

      <div className="card-footer-badges">
        <div className="badge-item">
          <svg className="badge-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            <path d="m9 12 2 2 4-4"/>
          </svg>
          <span>Academic Standard</span>
        </div>
        <div className="badge-item">
          <svg className="badge-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
          </svg>
          <span>AES-256 Encrypted</span>
        </div>
      </div>
    </div>
  );
};

export default RegisterCard;