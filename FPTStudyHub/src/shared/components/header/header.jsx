import React, { useState, useEffect } from 'react';
import { Bell } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getDirectImageUrl } from '../../../utils/imageHelper';
import axiosClient from '../../../utils/axiosClient';
import "./header.css";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // =========================
  // STATES
  // =========================
  const [unreadCount, setUnreadCount] = useState(0);
  const [userAvatar, setUserAvatar] = useState('');
  const [userName, setUserName] = useState('User');

  // =========================
  // AUTH
  // =========================
  const isLoggedIn = !!(
    localStorage.getItem('token') ||
    localStorage.getItem('api_token')
  );

  const isDocumentsPage = location.pathname === '/documents';

  // =========================
  // LOAD PROFILE
  // =========================
  const loadProfile = async () => {
    try {
      const res = await axiosClient.get('/api/my-profile');

      const data = res.result || res.data || res;

      if (data) {
        setUserAvatar(data.avatarUrl || '');
        setUserName(data.fullName || 'User');
      }

    } catch (err) {
      console.error(
        'Lỗi lấy thông tin profile trong Header:',
        err
      );
    }
  };

  // =========================
  // LOAD UNREAD NOTIFICATIONS
  // =========================
  const fetchUnreadNotifications = async () => {
    if (!isLoggedIn) return;

    try {
      const response = await axiosClient.get('/api/notifications');

      const data = Array.isArray(response)
        ? response
        : (response?.result || []);

      // Đếm số thông báo chưa đọc
      const unread = data.filter(
        (notification) => !notification.isRead
      ).length;

      setUnreadCount(unread);

    } catch (error) {
      console.error(
        'Lỗi lấy notifications:',
        error
      );

      setUnreadCount(0);
    }
  };

  // =========================
  // EFFECT
  // =========================
  useEffect(() => {
    if (!isLoggedIn) return;

    loadProfile();

    // Load unread notifications lần đầu
    fetchUnreadNotifications();

    // Lắng nghe event cập nhật từ Notifications page
    window.addEventListener(
      'notificationsUpdated',
      fetchUnreadNotifications
    );

    return () => {
      window.removeEventListener(
        'notificationsUpdated',
        fetchUnreadNotifications
      );
    };

  }, [isLoggedIn]);

  return (
    <header className="header">

      {/* =========================
          LEFT
      ========================== */}
      <div className="header-left">
        <a
          href="#"
          className="logo"
          onClick={(e) => {
            e.preventDefault();

            navigate(
              isLoggedIn
                ? '/dashboard'
                : '/documents'
            );
          }}
        >
          FPT <span>Study Hub</span>
        </a>
      </div>

      {/* =========================
          RIGHT
      ========================== */}
      <div className="header-right">

        {isLoggedIn ? (
          <>
            {/* =========================
                NOTIFICATION BUTTON
            ========================== */}
            <button
              className="icon-button"
              aria-label="Notifications"
              onClick={() => navigate('/notifications')}
            >
              <Bell size={20} />

              {/* Hiện chấm đỏ nếu còn thông báo chưa đọc */}
              {unreadCount > 0 && (
                <span className="badge"></span>
              )}
            </button>

            {/* =========================
                USER AVATAR
            ========================== */}
            <div
              className="avatar-wrapper"
              onClick={() => navigate('/settings')}
            >
              <img
                src={
                  userAvatar
                    ? getDirectImageUrl(userAvatar)
                    : `https://ui-avatars.com/api/?name=${encodeURIComponent(userName)}&background=random`
                }
                alt="User Profile"
                className="avatar-img"
                referrerPolicy="no-referrer"
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