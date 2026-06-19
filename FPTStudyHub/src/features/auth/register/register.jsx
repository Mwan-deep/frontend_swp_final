import React from 'react';

import './register.css';

// 1. Import các component từ Landing Pages (đã sửa đúng tên để gọi ở dưới)
import LandingNavbar from "../../landingpages/components/LandingNavbar";
import LandingFooter from "../../landingpages/components/LandingFooter";

// 2. Import các component con dùng riêng cho Register
import HeroSection from './components/HeroSection';
import RegisterCard from './components/RegisterCard';

const Register = () => {
  return (
    <div className="register-page-container">
      {/* Thanh điều hướng dùng lại từ Landing Page */}
      <LandingNavbar />

      {/* Cấu trúc chia hai cột */}
      <div className="register-main-content">
        {/* Bên trái: Trình bày giới thiệu hệ thống */}
        <HeroSection />

        {/* Bên phải: Khung đăng ký tài khoản */}
        <div className="form-section-container">
          <RegisterCard />

          {/* Ngôi sao lấp lánh trang trí góc dưới bên phải */}
          <svg className="sparkle-decorator" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0L14.6 9.4L24 12L14.6 14.6L12 24L9.4 14.6L0 12L9.4 9.4L12 0Z" />
          </svg>
        </div>
      </div>

      {/* Chân trang dùng lại từ Landing Page */}
      <LandingFooter />

    </div>
  );
};


export default Register;

