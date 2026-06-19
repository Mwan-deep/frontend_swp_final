import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import "./sidebar.css";
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
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const menuItems = [
    { id: 'dashboard', path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'documents', path: '/documents', label: 'Documents', icon: Folder },
    { id: 'ai-features', path: '/ai-features', label: 'AI Features', icon: Sparkles },
    { id: 'learning', path: '/learning', label: 'Learning', icon: BookOpen },
    { id: 'community', path: '/community', label: 'Community', icon: Users },
    { id: 'my-quizzes', path: '/my-quizzes', label: 'My Quizzes', icon: HelpCircle }, // Thêm tab My Quizzes ở đây
  ];

  const handleConfirmLogout = () => {
    localStorage.removeItem('isLoggedIn');
    window.location.href = '/';
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
            
            {/* Chỉ hiển thị nút Logout khi đã đăng nhập */}
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

      {/* ==================== LOGOUT MODAL ==================== */}
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