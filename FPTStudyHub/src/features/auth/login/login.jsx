import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import LoginHeader from './components/LoginHeader';
import LoginForm from './components/LoginForm';
import LoginSocial from './components/LoginSocial';
import LoginFooter from './components/LoginFooter';

import { authService, parseJwt } from '../../../service/authService';
import axiosClient from '../../../utils/axiosClient';
import './login.css';

// Function to generate a unique Device ID if it doesn't exist
const getDeviceId = () => {
  let deviceId = localStorage.getItem('deviceId');
  if (!deviceId) {
    deviceId = crypto.randomUUID();
    localStorage.setItem('deviceId', deviceId);
  }
  return deviceId;
};

const Login = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // --- OTP AUTHENTICATION STATE ---
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [pendingEmail, setPendingEmail] = useState('');

  // --- BLOCKED ACCOUNT STATE (NEW) ---
  const [showBlockedModal, setShowBlockedModal] = useState(false);

  // TỰ ĐỘNG CHUYỂN HƯỚNG SAU 5 GIÂY
  useEffect(() => {
    if (showBlockedModal) {
      const timer = setTimeout(() => {
        setShowBlockedModal(false);
        navigate('/'); // Đẩy về trang chủ
      }, 5000); // 5000 = 5 giây (Bạn có thể tùy chỉnh)

      // Dọn dẹp bộ đếm nếu người dùng tắt popup trước 5 giây
      return () => clearTimeout(timer);
    }
  }, [showBlockedModal, navigate]);

  useEffect(() => {
    const tokenFromUrl = searchParams.get('token');

    // 1. LẤY THAM SỐ LỖI TỪ URL (Backend vừa ném về)
    const errorFromUrl = searchParams.get('error');

    if (tokenFromUrl) {
      handleSuccessLogin(tokenFromUrl);
    }

    // 2. NẾU URL CÓ CHỨA LỖI -> BẬT POPUP NGAY LẬP TỨC
    if (errorFromUrl) {
      const lowerErr = errorFromUrl.toLowerCase();

      // Nếu lỗi chứa các từ khóa khóa tài khoản
      if (lowerErr.includes('locked') || lowerErr.includes('inactive') || lowerErr.includes('banned') || lowerErr.includes('suspended')) {
        setShowBlockedModal(true);
      } else {
        // Nếu là lỗi khác từ Google/Backend
        setErrorMessage('Login failed. Reason: ' + errorFromUrl);
      }
    }
  }, [searchParams, navigate]);

  // Shared function for successful login/OTP verification
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
      const deviceId = getDeviceId();
      const response = await authService.login(email, password, deviceId);

      // =================================================================
      // TẦNG 1: BẮT LỖI NGẦM (Backend trả về 200 OK nhưng thực chất là lỗi)
      // =================================================================
      if (response && response.code && response.code !== 1000) {
        const msg = (response.message || '').toLowerCase();
        if (response.code === 403 || msg.includes('khóa') || msg.includes('inactive') || msg.includes('suspended')) {
          setShowBlockedModal(true);
          setIsLoading(false);
          return;
        } else {
          // Ép nó văng xuống catch nếu là các lỗi khác
          throw new Error(response.message || 'Invalid email or password!');
        }
      }

      const result = response.result || response;

      // IF NEW DEVICE -> Open OTP modal
      if (result && result.authenticated === false) {
        setPendingEmail(email);
        setShowOtpModal(true);
        return;
      }

      // IF SUCCESS
      if (result && result.authenticated === true && result.token) {
        handleSuccessLogin(result.token);
      }

    } catch (error) {
      alert("Dữ liệu lỗi Backend trả về là: \n" + JSON.stringify(error.response?.data || error.message));
      // IN RA TOÀN BỘ OBJECT LỖI ĐỂ KIỂM TRA
      console.log("🔍 CHI TIẾT LỖI TỪ BACKEND:", error);

      // =================================================================
      // TẦNG 2: XỬ LÝ LỖI HTTP CHUẨN (4xx, 5xx) MỘT CÁCH AN TOÀN TUYỆT ĐỐI
      // =================================================================
      let errorMsg = 'Invalid email or password!';
      let statusCode = 500;

      // Bóc tách an toàn, đề phòng error.response bị undefined (do sập server hoặc lỗi CORS)
      if (error.response) {
        statusCode = error.response.status;
        const data = error.response.data;
        if (data) {
          errorMsg = data.message || data.error || (typeof data === 'string' ? data : errorMsg);
        }
      } else if (error.message) {
        errorMsg = error.message; // Lấy thông báo lỗi ngầm từ Tầng 1 (nếu có)
      }

      const lowerMsg = (typeof errorMsg === 'string' ? errorMsg : '').toLowerCase();

      // Kiểm tra và bật Popup
      if (
        statusCode === 403 ||
        lowerMsg.includes('khóa') ||
        lowerMsg.includes('đình chỉ') ||
        lowerMsg.includes('inactive') ||
        lowerMsg.includes('banned') ||
        lowerMsg.includes('suspended') ||
        lowerMsg.includes('disabled')
      ) {
        setShowBlockedModal(true);
      } else {
        // Nếu không phải lỗi khóa acc, in ra thông báo lỗi màu đỏ bình thường
        setErrorMessage(errorMsg === 'Email hoặc mật khẩu không chính xác!' ? 'Invalid email or password!' : errorMsg);
      }
    } finally {
      setIsLoading(false);
    }
  };

  // SEND OTP TO BACKEND FOR VERIFICATION
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
        handleSuccessLogin(result.token);
      }
    } catch (error) {
      setErrorMessage('Invalid or expired OTP code!');
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

        {/* OTP FORM VS MAIN LOGIN FORM */}
        {showOtpModal ? (
          <form onSubmit={handleVerifyOtpSubmit} className="login-form-content">
            <div style={{ textAlign: 'center', marginBottom: '20px', color: '#4b5563' }}>
              We detected a login from a new device.<br />
              Please enter the 6-digit OTP sent to <b>{pendingEmail}</b>.
            </div>

            <div className="form-group-item">
              <input
                type="text"
                className="form-text-input"
                placeholder="Enter OTP code..."
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value)}
                required
                disabled={isLoading}
                style={{ textAlign: 'center', letterSpacing: '5px', fontSize: '18px', fontWeight: 'bold' }}
                maxLength={6}
              />
            </div>

            <button type="submit" className="login-submit-button" disabled={isLoading || otpCode.length < 4}>
              <span>{isLoading ? 'Verifying...' : 'Verify OTP'}</span>
            </button>

            <div style={{ textAlign: 'center', marginTop: '15px' }}>
              <span
                className="forgot-link"
                onClick={() => { setShowOtpModal(false); setErrorMessage(''); }}
              >
                Back to login
              </span>
            </div>
          </form>
        ) : (
          <>
            <LoginForm
              onSubmit={handleLoginSubmit}
              isLoading={isLoading}
              onForgotPassword={() => navigate('/forgot-password')}
            />
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

      {/* ACCOUNT BLOCKED MODAL (POPUP) */}
      {showBlockedModal && (
        <div className="modal-overlay" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999 }}>
          <div className="modal-content" style={{ backgroundColor: 'white', padding: '32px', borderRadius: '12px', width: '90%', maxWidth: '400px', textAlign: 'center', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}>

            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
              <div style={{ backgroundColor: '#FEE2E2', padding: '16px', borderRadius: '50%' }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                  <line x1="12" y1="14" x2="12" y2="17"></line>
                </svg>
              </div>
            </div>

            <h3 style={{ margin: '0 0 12px 0', color: '#111827', fontSize: '20px' }}>Account Suspended</h3>
            <p style={{ color: '#4B5563', fontSize: '15px', lineHeight: '1.5', marginBottom: '24px' }}>
              Your account is currently inactive or has been suspended by the administrator. Please contact our support team for further assistance.
            </p>

            <button
              onClick={() => {
                setShowBlockedModal(false);
                navigate('/'); // Đẩy người dùng về trang chủ
              }}
              style={{ width: '100%', padding: '12px', backgroundColor: '#4F46E5', color: 'white', border: 'none', borderRadius: '8px', fontSize: '15px', fontWeight: '600', cursor: 'pointer' }}
            >
              Close & Return Home
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;