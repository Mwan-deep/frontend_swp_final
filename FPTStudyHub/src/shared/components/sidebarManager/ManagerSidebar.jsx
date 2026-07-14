import React, { useState } from 'react';
import { LayoutGrid, FileText, BarChart2, LogOut, Settings } from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';
import LogoutModal from '../LogoutModal/LogoutModal';
import axiosClient from '../../../utils/axiosClient'; // Đảm bảo import axiosClient để gọi API
import './ManagerSidebar.css';

const ManagerSidebar = () => {
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const navigate = useNavigate();

  // HÀM ĐĂNG XUẤT CHUẨN BẢO MẬT (Đồng bộ với User và Admin)
  const handleLogout = async () => {
    try {
      const currentToken = localStorage.getItem('token') || localStorage.getItem('api_token');
      
      if (currentToken) {
        // 1. Gọi API hủy token dưới Backend để vô hiệu hóa hoàn toàn phiên đăng nhập
        await axiosClient.post('/api/authen/logout', { 
          token: currentToken 
        });
      }
    } catch (error) {
      console.error("Lỗi khi đăng xuất ở Backend:", error);
    } finally {
      // 2. Dọn dẹp toàn bộ bộ nhớ cục bộ
      localStorage.clear();
      sessionStorage.clear();
      
      // 3. Ẩn UI tạm thời chống giật lag và ép trình duyệt văng ra trang chủ '/'
      document.body.style.display = 'none'; 
      window.location.replace('/'); 
    }
  };

  return (
    <aside className="manager-sidebar">
      <div className="manager-sidebar-header">
        <h1 className="manager-sidebar-title">FPT Study Hub</h1>
        <p className="manager-sidebar-subtitle">Manager Control Panel</p>
      </div>

      <nav className="manager-sidebar-nav">
        <ul className="manager-sidebar-menu">
          <li>
            <NavLink to="/manager" end className={({ isActive }) => `manager-sidebar-item ${isActive ? 'active' : ''}`}>
              <LayoutGrid size={20} />
              <span>Dashboard</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/manager/documents" className={({ isActive }) => `manager-sidebar-item ${isActive ? 'active' : ''}`}>
              <FileText size={20} />
              <span>Documents</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/manager/community" className={({ isActive }) => `manager-sidebar-item ${isActive ? 'active' : ''}`}>
              <BarChart2 size={20} />
              <span>Community</span>
            </NavLink>
          </li>
        </ul>
      </nav>

      <div className="manager-sidebar-footer">
        <NavLink to="/manager/settings" className="manager-sidebar-bottom-item">
          <Settings size={20} />
          <span>Settings</span>
        </NavLink>
        <button className="manager-sidebar-logout" onClick={() => setIsLogoutModalOpen(true)}>
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>

      <LogoutModal 
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={handleLogout}
      />
    </aside>
  );
};

export default ManagerSidebar;