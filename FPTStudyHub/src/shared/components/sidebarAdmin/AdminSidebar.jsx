import React, { useState, useEffect } from 'react';
import { LayoutGrid, FileText, LogOut, Settings } from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';
import LogoutModal from '../LogoutModal/LogoutModal';
import axiosClient from '../../../utils/axiosClient'; 
import { getDirectImageUrl } from '../../../utils/imageHelper'; // ĐÃ THÊM IMPORT HÀM XỬ LÝ ẢNH
import './AdminSidebar.css';

const AdminSidebar = () => {
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const navigate = useNavigate();

  // STATE ĐỂ LƯU THÔNG TIN ADMIN THẬT
  const [adminProfile, setAdminProfile] = useState({
    fullName: 'Đang tải...',
    role: 'Admin',
    avatarUrl: localStorage.getItem('avatarUrl') || '' // Lấy tạm từ cache nếu có
  });

  // TỰ ĐỘNG LẤY THÔNG TIN ADMIN KHI VỪA MỞ TRANG
  useEffect(() => {
    const fetchAdminProfile = async () => {
      try {
        const response = await axiosClient.get('/api/account/my-profile');
        const data = response.result || response;
        if (data) {
          const fetchedAvatar = data.avatarUrl || data.avatar_url || data.avatar || localStorage.getItem('avatarUrl');
          setAdminProfile({
            fullName: data.fullName || data.userName,
            role: data.roles && data.roles.length > 0 ? data.roles[0].name : 'Superuser Access',
            avatarUrl: fetchedAvatar || ''
          });
          
          if (fetchedAvatar) {
            localStorage.setItem('avatarUrl', fetchedAvatar);
          }
        }
      } catch (error) {
        console.error("Lỗi tải thông tin Admin Sidebar:", error);
        setAdminProfile(prev => ({ ...prev, fullName: 'Admin' }));
      }
    };
    fetchAdminProfile();

    // Lắng nghe sự kiện để đổi ảnh realtime giống như bên AdminHeader
    const handleAvatarUpdate = () => {
      const newAvatar = localStorage.getItem('avatarUrl');
      if (newAvatar) {
        setAdminProfile(prev => ({ ...prev, avatarUrl: newAvatar }));
      }
    };

    window.addEventListener('notificationsUpdated', handleAvatarUpdate);
    window.addEventListener('storage', handleAvatarUpdate);

    return () => {
      window.removeEventListener('notificationsUpdated', handleAvatarUpdate);
      window.removeEventListener('storage', handleAvatarUpdate);
    };
  }, []);

  // HÀM ĐĂNG XUẤT CHUẨN BẢO MẬT
  const handleConfirmLogout = async () => {
    try {
      const currentToken = localStorage.getItem('token') || localStorage.getItem('api_token');
      
      if (currentToken) {
        // Gọi API hủy token dưới Backend
        await axiosClient.post('/api/authen/logout', { 
          token: currentToken 
        });
      }
    } catch (error) {
      console.error("Lỗi khi đăng xuất ở Backend:", error);
    } finally {
      // Dọn dẹp bộ nhớ và ép trình duyệt văng ra trang chủ (Giống hệt bên User)
      localStorage.clear();
      sessionStorage.clear();
      document.body.style.display = 'none'; // Chống giật lag UI trước khi chuyển trang
      
      // ĐÃ SỬA: Đổi từ '/login' thành '/' để quay về trang chủ
      window.location.replace('/'); 
    }
  };

  return (
    <aside className="admin-sidebar">
      <div className="admin-sidebar-header">
        <h1 className="admin-sidebar-title">FPT Study Hub</h1>
        <p className="admin-sidebar-subtitle">Admin Control Panel</p>
      </div>

      <nav className="admin-sidebar-nav">
        <ul className="admin-sidebar-menu">
          <li>
            <NavLink to="/admin" end className={({ isActive }) => `admin-sidebar-item ${isActive ? 'active' : ''}`}>
              <LayoutGrid size={20} />
              <span>Dashboard</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/reports" className={({ isActive }) => `admin-sidebar-item ${isActive ? 'active' : ''}`}>
              <FileText size={20} />
              <span>Report Management</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/settings" className={({ isActive }) => `admin-sidebar-item ${isActive ? 'active' : ''}`}>
              <Settings size={20} />
              <span>Settings</span>
            </NavLink>
          </li>
        </ul>
      </nav>

      <div className="admin-sidebar-footer">
        <button className="admin-sidebar-logout" onClick={() => setIsLogoutModalOpen(true)}>
          <LogOut size={20} />
          <span>Logout</span>
        </button>
        <div className="admin-sidebar-profile">
          {/* ĐÃ CẬP NHẬT CẤU TRÚC ẢNH AVATAR VÀ THÊM CHỐNG LỖI */}
          <img
            src={adminProfile.avatarUrl ? getDirectImageUrl(adminProfile.avatarUrl) : `https://ui-avatars.com/api/?name=${encodeURIComponent(adminProfile.fullName || 'Admin')}&background=random`}
            alt="Admin Profile"
            className="admin-profile-img"
            referrerPolicy="no-referrer"
            onError={(e) => {
              e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(adminProfile.fullName || 'Admin')}&background=random`;
            }}
          />
          <div className="admin-profile-info">
            <p className="admin-profile-name">{adminProfile.fullName}</p>
            <p className="admin-profile-role">{adminProfile.role}</p>
          </div>
        </div>
      </div>

      <LogoutModal 
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={handleConfirmLogout}
      />
    </aside>
  );
};

export default AdminSidebar;