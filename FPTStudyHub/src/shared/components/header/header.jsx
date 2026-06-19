import React, { useState, useEffect } from 'react';
import { Search, Bell } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import "./header.css";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [unreadCount, setUnreadCount] = useState(0);

  // Lấy trạng thái đăng nhập và trang hiện tại
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const isDocumentsPage = location.pathname === '/documents';

  // Đọc số thông báo chưa đọc từ localStorage (chỉ khi đã đăng nhập)
  const updateUnreadCount = () => {
    if (!isLoggedIn) return;
    const stored = localStorage.getItem('study_hub_notifications');
    if (stored) {
      try {
        const list = JSON.parse(stored);
        const unread = list.filter(n => !n.read).length;
        setUnreadCount(unread);
      } catch (e) {
        setUnreadCount(0);
      }
    } else {
      setUnreadCount(2);
    }
  };

  useEffect(() => {
    updateUnreadCount();
    window.addEventListener('notificationsUpdated', updateUnreadCount);
    return () => {
      window.removeEventListener('notificationsUpdated', updateUnreadCount);
    };
  }, [isLoggedIn]);

  return (
    <header className="header">
      <div className="header-left">
        <a 
          href="#" 
          className="logo"
          onClick={(e) => {
            e.preventDefault();
            // Nếu đã đăng nhập về Dashboard, chưa đăng nhập về trang Documents
            navigate(isLoggedIn ? '/dashboard' : '/documents');
          }}
        >
          FPT <span>Study Hub</span>
        </a>
      </div>
      
      <div className="header-center">
        <div className="search-wrapper">
          <Search size={18} className="search-icon" />
          <input 
            type="text" 
            placeholder="Search documents, subjects, authors..." 
            className="search-input"
          />
        </div>
      </div>
      
      <div className="header-right">
        {isLoggedIn ? (
          <>
            <button 
              className="icon-button" 
              aria-label="Notifications"
              onClick={() => navigate('/notifications')}
            >
              <Bell size={20} />
              {unreadCount > 0 && <span className="badge"></span>}
            </button>
            
            <div className="avatar-wrapper" onClick={() => navigate('/account')}>
              <img 
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80" 
                alt="User Profile" 
                className="avatar-img"
              />
            </div>
          </>
        ) : (
          isDocumentsPage && (
            <button 
              type="button"
              className="header-login-btn"
              onClick={() => navigate('/login')}
            >
              Login
            </button>
          )
        )}
      </div>
    </header>
  );
};

export default Header;