import React from 'react';
import { Sparkles } from 'lucide-react'; //lấy icon từ thư viện lucide-react

const LoginHeader = () => {
  return (
    <div className="login-header-section">
      
      <div className="login-sparkle-box">
        <Sparkles className="login-sparkle-icon" size={24} />
      </div>
      
      <h2 className="login-welcome-title">Welcome Back</h2>
      <p className="login-subtitle">Sign in to continue to FPT Study Hub</p>
    </div>
  );
};

export default LoginHeader;