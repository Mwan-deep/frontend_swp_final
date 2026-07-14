import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import "./sidebar.css";
import axiosClient from '../../../utils/axiosClient';
import {
  LayoutDashboard,
  Folder,
  Sparkles,
  BookOpen,
  Users,
  HelpCircle,
  Upload,
  Settings,
  LogOut
} from 'lucide-react';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Logic kiểm tra đăng nhập: Cứ có token là tính đã đăng nhập!
  const isLoggedIn = !!(localStorage.getItem('token') || localStorage.getItem('api_token') || localStorage.getItem('isLoggedIn') === 'true');
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  // --- LÍNH GÁC BẢO MẬT: CHỐNG NÚT BACK CỦA TRÌNH DUYỆT ---
  useEffect(() => {
    const enforceSecurity = () => {
      const currentToken = localStorage.getItem('token') || localStorage.getItem('api_token');
      // Nếu không có token (đã đăng xuất), ép văng ra trang login ngay lập tức
      if (!currentToken) {
        window.location.replace('/login');
      }
    };

    // 1. Kiểm tra mỗi khi URL thay đổi
    enforceSecurity();

    // 2. Kiểm tra khi trình duyệt lôi trang từ RAM ra (Chống BFCache)
    window.addEventListener('pageshow', enforceSecurity);
    
    // Dọn dẹp sự kiện
    return () => {
      window.removeEventListener('pageshow', enforceSecurity);
    };
  }, [location.pathname]);
  
  const menuItems = [
    { id: 'dashboard', path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'documents', path: '/documents', label: 'Documents', icon: Folder },
    { id: 'ai-features', path: '/ai-features', label: 'AI Features', icon: Sparkles },
    { id: 'learning', path: '/learning', label: 'Learning', icon: BookOpen },
    { id: 'community', path: '/community', label: 'Community', icon: Users },
    { id: 'my-quizzes', path: '/my-quizzes', label: 'My Quizzes', icon: HelpCircle }, 
  ];

  // --- HÀM XỬ LÝ ĐĂNG XUẤT CHUẨN ---
  const handleConfirmLogout = async () => {
    console.log("👉 [1] Đã xác nhận Logout từ Modal, bắt đầu tiến trình...");
    
    try {
      const currentToken = localStorage.getItem('token') || localStorage.getItem('api_token');
      
      if (currentToken) {
        console.log("👉 [2] Đang gọi API Logout xuống Backend...");
        await axiosClient.post('/api/authen/logout', { 
          token: currentToken 
        });
        console.log("✅ [3] Backend đã xác nhận hủy Token thành công!");
      }
    } catch (error) {
      console.error("❌ Lỗi khi đăng xuất ở Backend:", error);
    } finally {
      console.log("👉 [4] Đang xóa sạch dữ liệu trình duyệt và thoát...");
      localStorage.clear();
      sessionStorage.clear();
      
      // Che giấu toàn bộ giao diện trước khi thoát
      document.body.style.display = 'none'; 
      
      // ĐỔI TẠI ĐÂY: Sửa '/login' thành '/' để đá thẳng về trang chủ!
      window.location.replace('/'); 
    }
  };

  return (
    <>
      <aside className="sidebar">
        <div className="sidebar-nav">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.id}
                to={item.path}
                className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </div>

        <div className="sidebar-footer">
          <button
            className="upload-btn"
            onClick={() => navigate('/updatedocument')}
          >
            <Upload size={16} />
            <span>Upload Document</span>
          </button>

          <div className="sidebar-bottom-links">
            <NavLink
              to="/settings"
              className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
            >
              <Settings size={18} />
              <span>Settings</span>
            </NavLink>

            {isLoggedIn && (
              <div
                className="nav-item"
                onClick={() => setShowLogoutModal(true)}
                style={{ cursor: 'pointer' }}
              >
                <LogOut size={18} />
                <span>Logout</span>
              </div>
            )}
          </div>
        </div>
      </aside>

      {showLogoutModal && (
        <div className="modal-overlay" onClick={() => setShowLogoutModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-icon-wrapper">
              <LogOut size={24} className="modal-icon" />
            </div>

            <h3 className="modal-title">Are you sure you want to log out?</h3>
            <p className="modal-description">
              Your current session will end.<br />
              Hope to see you back soon!
            </p>

            <div className="modal-actions">
              <button
                className="modal-btn btn-cancel"
                onClick={() => setShowLogoutModal(false)}
              >
                Cancel
              </button>
              <button
                className="modal-btn btn-confirm"
                onClick={handleConfirmLogout}
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;