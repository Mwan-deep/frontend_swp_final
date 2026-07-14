import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import LoginHeader from './components/LoginHeader';
import LoginForm from './components/LoginForm';
import LoginSocial from './components/LoginSocial';
import LoginFooter from './components/LoginFooter';
import { authService, parseJwt } from '../../../service/authService';
import axiosClient from '../../../utils/axiosClient'; // Đảm bảo đã import axiosClient
import './login.css';

// Hàm tạo Device ID duy nhất cho thiết bị (nếu chưa có)
const getDeviceId = () => {
  let deviceId = localStorage.getItem('deviceId');
  if (!deviceId) {
    deviceId = crypto.randomUUID(); // Sinh mã ngẫu nhiên chuẩn UUID
    localStorage.setItem('deviceId', deviceId);
  }
  return deviceId;
};

const Login = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // --- STATE DÀNH CHO XÁC THỰC OTP ---
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [pendingEmail, setPendingEmail] = useState('');

  useEffect(() => {
    // ... Logic Google OAuth cũ giữ nguyên ...
    const tokenFromUrl = searchParams.get('token');
    if (tokenFromUrl) {
      handleSuccessLogin(tokenFromUrl);
    }
  }, [searchParams, navigate]);

  // Hàm xử lý dùng chung khi đăng nhập / xác thực OTP thành công
  const handleSuccessLogin = (token) => {
    localStorage.setItem('token', token);
    const payload = parseJwt(token);
    const scope = payload?.scope || ''; 

    let normalizedRole = 'user';
    if (scope.includes('ADMIN')) {
      normalizedRole = 'admin';
    } else if (scope.includes('MANAGER')) {
      normalizedRole = 'manager';
    }

    localStorage.setItem('role', normalizedRole);
    if (normalizedRole === 'admin') {
      navigate('/admin', { replace: true });
    } else if (normalizedRole === 'manager') {
      navigate('/manager', { replace: true });
    } else {
      navigate('/dashboard', { replace: true });
    }
  };

  const handleLoginSubmit = async ({ email, password }) => {
    setIsLoading(true);
    setErrorMessage('');

    try {
      const deviceId = getDeviceId(); // Lấy Device ID
      
      // LƯU Ý: authService.login() của bạn cần được sửa để truyền thêm deviceId xuống Backend
      const response = await authService.login(email, password, deviceId);
      const result = response.result;

      // NẾU LÀ THIẾT BỊ MỚI -> Mở bảng nhập OTP
      if (result && result.authenticated === false) {
        setPendingEmail(email);
        setShowOtpModal(true);
        return;
      }

      // NẾU THÀNH CÔNG NGAY
      if (result && result.authenticated === true && result.token) {
        handleSuccessLogin(result.token);
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'Email hoặc mật khẩu không chính xác!';
      setErrorMessage(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  // HÀM GỬI OTP XUỐNG BACKEND ĐỂ XÁC MINH
  const handleVerifyOtpSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');

    try {
      const deviceId = getDeviceId();
      const response = await axiosClient.post('/api/authen/verify-otp', {
        email: pendingEmail,
        deviceId: deviceId,
        otp: otpCode
      });

      const result = response.result || response.data?.result;
      
      if (result && result.authenticated === true && result.token) {
        setShowOtpModal(false);
        handleSuccessLogin(result.token); // Đăng nhập thành công!
      }
    } catch (error) {
      setErrorMessage('Mã OTP không chính xác hoặc đã hết hạn!');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page-container">
      <div className="back-to-home-nav" onClick={() => navigate('/')}>
        ← Back to Home
      </div>

      <div className="login-card-wrapper">
        <LoginHeader />
        
        {errorMessage && (
          <div style={{ color: '#dc3545', textAlign: 'center', marginBottom: '15px', backgroundColor: '#f8d7da', padding: '10px', borderRadius: '5px' }}>
            {errorMessage}
          </div>
        )}

        {/* NẾU ĐANG CẦN NHẬP OTP THÌ HIỆN FORM OTP, NGƯỢC LẠI HIỆN FORM LOGIN CHÍNH */}
        {showOtpModal ? (
          <form onSubmit={handleVerifyOtpSubmit} className="login-form-content">
            <div style={{ textAlign: 'center', marginBottom: '20px', color: '#4b5563' }}>
              Chúng tôi phát hiện bạn đăng nhập trên thiết bị mới.<br />
              Vui lòng nhập mã OTP gồm 6 số vừa được gửi đến <b>{pendingEmail}</b>.
            </div>
            
            <div className="form-group-item">
              <input
                type="text"
                className="form-text-input"
                placeholder="Nhập mã OTP..."
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value)}
                required
                disabled={isLoading}
                style={{ textAlign: 'center', letterSpacing: '5px', fontSize: '18px', fontWeight: 'bold' }}
                maxLength={6}
              />
            </div>
            
            <button type="submit" className="login-submit-button" disabled={isLoading || otpCode.length < 4}>
              <span>{isLoading ? 'Đang xác thực...' : 'Xác nhận OTP'}</span>
            </button>

            <div style={{ textAlign: 'center', marginTop: '15px' }}>
              <span 
                className="forgot-link" 
                onClick={() => { setShowOtpModal(false); setErrorMessage(''); }}
              >
                Quay lại đăng nhập
              </span>
            </div>
          </form>
        ) : (
          <>
            <LoginForm onSubmit={handleLoginSubmit} isLoading={isLoading} />
            <LoginSocial 
              onGoogleLogin={() => { 
                window.location.href = 'http://localhost:8080/oauth2/authorization/google';
              }} 
              onRegisterClick={() => navigate('/register')} 
            />
          </>
        )}
      </div>
      <LoginFooter />
    </div>
  );
};

export default Login;