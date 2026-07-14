import React, { useState } from 'react';
import { Eye, EyeOff, LogIn } from 'lucide-react';

const LoginForm = ({ onSubmit, isLoading }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ email, password, rememberMe });
  };

  return (
    <form onSubmit={handleSubmit} className="login-form-content">
      {/* Nhập Email */}
      <div className="form-group-item">
        <label htmlFor="email-input">Email Address</label>
        <input
          id="email-input"
          type="email"
          className="form-text-input"
          placeholder="student@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={isLoading}
        />
      </div>

      {/* Nhập Password */}
      <div className="form-group-item">
        <div className="password-label-container">
          <label htmlFor="password-input">Password</label>
          <span className="forgot-link" onClick={() => alert('Recovery code has been sent to your email!')}>
            Forgot password?
          </span>
        </div>
        {/* Show Password */}
        <div className="password-input-wrapper">
          <input
            id="password-input"
            type={showPassword ? 'text' : 'password'}
            className="form-text-input password-input-field"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={isLoading}
          />
          <button
            type="button"
            className="password-visibility-toggle"
            onClick={() => setShowPassword(!showPassword)}
            aria-label="Toggle password visibility"
            disabled={isLoading}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      </div>

      {/* Ghi nhớ đăng nhập */}
      <div className="form-remember-container">
        <label className="checkbox-custom-label">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="checkbox-input"
            disabled={isLoading}
          />
          <span className="checkbox-text">Remember me for 7 days</span>
        </label>
      </div>

      {/* Nút Login */}
      <button type="submit" className="login-submit-button" disabled={isLoading}>
        <span>{isLoading ? 'Logging in...' : 'Login'}</span>
        {!isLoading && <LogIn size={18} className="button-login-icon" />}
      </button>
    </form>
  );
};

export default LoginForm;