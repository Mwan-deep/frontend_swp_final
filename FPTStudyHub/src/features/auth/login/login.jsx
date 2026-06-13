import React from 'react';
import { useNavigate } from 'react-router-dom';
import LoginHeader from './components/LoginHeader';
import LoginForm from './components/LoginForm';
import LoginSocial from './components/LoginSocial';
import LoginFooter from './components/LoginFooter';
import { mockUsers } from '../../../data/mockDocuments';
import './login.css';

const Login = () => {
  const navigate = useNavigate();

  const handleLoginSubmit = ({ email, password }) => {
    
    const cleanEmail = email.trim().toLowerCase();
    const cleanPassword = password.trim();
//đi xem trong data coi có ai có email và pass mới nhập ko
    const foundUser = mockUsers.find(
      (user) => user.email.toLowerCase() === cleanEmail && user.password === cleanPassword
    );
// nếu mà có user đó thì vào trang dashboard ko thì ngược lai
    if (foundUser) {
      localStorage.setItem('isLoggedIn', 'true');
      navigate('/dashboard');
    } else {
      alert('Incorrect email or password!');
    }
  };

  return (
    <div className="login-page-container">
      {/*Nút quay về */}
      <div className="back-to-home-nav" onClick={() => navigate('/')}>
        ← Back to Home
      </div>

      <div className="login-card-wrapper">
        <LoginHeader />
        
        <LoginForm onSubmit={handleLoginSubmit} />
        
        {/*Các nút đăng kí bằng gg và nút đki */}
        <LoginSocial 
          onGoogleLogin={() => { localStorage.setItem('isLoggedIn', 'true'); navigate('/dashboard'); }} 
          onRegisterClick={() => alert('Registration form will be available soon!')} 
        />
      </div>

      <LoginFooter />
    </div>
  );
};

export default Login;