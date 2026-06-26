import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputField from './InputField';
import CheckboxField from './CheckboxField';
import axiosClient from "../../../../api/axiosClient";

const RegisterForm = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    studentId: '',
    password: '',
    agree: false
  });
  
  const [emailError, setEmailError] = useState('');
  const [serverError, setServerError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: type === 'checkbox' ? checked : value
    }));

    if (id === 'email') setEmailError('');
    if (serverError) setServerError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const emailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/i;
    if (!emailPattern.test(formData.email)) {
      setEmailError('Please use a valid @gmail.com email address.');
      return;
    }

    if (!formData.agree) {
      alert("You must agree to the Terms of Service and Privacy Policy.");
      return;
    }

    setIsLoading(true);
    setServerError('');
    setSuccessMsg('');

    try {
      // Gọi đúng endpoint /account từ AccountController
      // Map dữ liệu từ UI form sang cấu trúc của AccountCreateRequest DTO
      const response = await axiosClient.post('/account', {
        userName: formData.email,      // Ánh xạ Student ID thành userName
        passwordHash: formData.password,   // Ánh xạ password thành passwordHash
        fullName: formData.fullName,
        email: formData.email
        // Các trường dob, gender, avatarUrl, bio không có trong form nên sẽ nhận giá trị null ở backend
      });

      // Backend trả về ApiResponse có thuộc tính 'message' ("Create Successfully!!!")
      setSuccessMsg(response.message || 'Account created successfully! Redirecting...');
      
      setFormData({
        fullName: '', email: '', studentId: '', password: '', agree: false
      });

      setTimeout(() => {
        navigate('/login');
      }, 2000);

    } catch (error) {
      console.error("Registration error:", error);
      
      // Xử lý lỗi từ @Valid của Spring Boot (Ví dụ: "PASSWORD_INVALIDATION", "EMAIL_INVALID")
      // Spring Boot thường ném lỗi validation vào mảng errors hoặc thông báo chung
      const errorMsg = error.response?.data?.message 
                    || error.response?.data?.errors?.[0]?.defaultMessage 
                    || 'Registration failed. Please try again later.';
      setServerError(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="register-form" onSubmit={handleSubmit}>
      
      {serverError && <div style={{ color: '#dc3545', marginBottom: '15px', fontSize: '14px', fontWeight: '500' }}>{serverError}</div>}
      {successMsg && <div style={{ color: '#198754', marginBottom: '15px', fontSize: '14px', fontWeight: '500' }}>{successMsg}</div>}

      <InputField
        label="Full Name"
        id="fullName"
        placeholder="John Doe"
        value={formData.fullName}
        onChange={handleChange}
      />
      
      <div>
        <InputField
          label="Email"
          id="email"
          type="email"
          placeholder="name@gmail.com"
          value={formData.email}
          onChange={handleChange}
        />
        {emailError && <span style={{ color: '#dc3545', fontSize: '12px', marginTop: '-10px', display: 'block', marginBottom: '10px' }}>{emailError}</span>}
      </div>

      <div className="form-grid-row">
        <InputField
          label="Student ID (Username)"
          id="studentId"
          placeholder="SE123456"
          value={formData.studentId}
          onChange={handleChange}
        />
        
        <InputField
          label="Password"
          id="password"
          type="password"
          placeholder="••••••••"
          value={formData.password}
          onChange={handleChange}
        />
      </div>

      <CheckboxField
        id="agree"
        checked={formData.agree}
        onChange={handleChange}
      />

      <button 
        type="submit" 
        className="submit-button"
        disabled={isLoading}
        style={{ opacity: isLoading ? 0.7 : 1, cursor: isLoading ? 'not-allowed' : 'pointer' }}
      >
        {isLoading ? 'Creating Account...' : 'Create Account'}
      </button>
    </form>
  );
};

export default RegisterForm;