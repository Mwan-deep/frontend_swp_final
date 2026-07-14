import React, { useState, useEffect } from 'react';
import { Info, FileText, Sparkles, MessageSquare, Check, Settings } from 'lucide-react';
import axiosClient from '../../utils/axiosClient'; // Đảm bảo đường dẫn này đúng
import './Notifications.css';

// Hàm tính thời gian trôi qua
const calculateTimeAgo = (dateString) => {
  if (!dateString) return 'Vừa xong';
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now - date) / 1000);
  
  if (seconds < 60) return 'Vừa xong';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} phút trước`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} giờ trước`;
  const days = Math.floor(hours / 24);
  return `${days} ngày trước`;
};

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [activeTab, setActiveTab] = useState('All');
  const [isLoading, setIsLoading] = useState(true);

  // 1. LẤY DỮ LIỆU TỪ BACKEND
  const fetchNotifications = async () => {
    try {
      setIsLoading(true);
      const response = await axiosClient.get('/api/notifications');
      const data = Array.isArray(response) ? response : (response?.result || []);
      
      const mappedData = data.map(n => ({
        id: n.id,
        title: n.title,
        description: n.message, // Map biến message từ backend sang description của UI
        type: n.type || 'system',
        read: n.isRead,
        timeAgo: calculateTimeAgo(n.createdAt)
      }));
      
      setNotifications(mappedData);
      
      // Bắn event để cái Chuông Header cập nhật lại số chấm đỏ
      window.dispatchEvent(new Event('notificationsUpdated'));
    } catch (error) {
      console.error("Lỗi khi tải thông báo:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  // 2. ĐÁNH DẤU ĐỌC 1 THÔNG BÁO
  const handleMarkAsRead = async (id) => {
    // Tối ưu UI: Đổi trạng thái hiển thị ngay lập tức (Optimistic UI)
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
    window.dispatchEvent(new Event('notificationsUpdated'));

    try {
      await axiosClient.put(`/api/notifications/${id}/read`);
    } catch (error) {
      // Nếu lỗi thì gọi lại API để load lại dữ liệu chuẩn
      fetchNotifications();
    }
  };

  // 3. ĐÁNH DẤU ĐỌC TẤT CẢ
  const handleMarkAllRead = async () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    window.dispatchEvent(new Event('notificationsUpdated'));

    try {
      await axiosClient.put('/api/notifications/read-all');
    } catch (error) {
      fetchNotifications();
    }
  };

  // Lọc thông báo theo Tab đang chọn
  const getFilteredNotifications = () => {
    if (activeTab === 'All') return notifications;
    if (activeTab === 'System') return notifications.filter(n => n.type === 'system');
    if (activeTab === 'Documents') return notifications.filter(n => n.type === 'documents');
    if (activeTab === 'AI Updates') return notifications.filter(n => n.type === 'ai');
    if (activeTab === 'Community') return notifications.filter(n => n.type === 'community');
    return notifications;
  };

  const getIcon = (type) => {
    switch (type) {
      case 'system': return { element: <Info size={20} />, bgClass: 'notif-icon-system' };
      case 'documents': return { element: <FileText size={20} />, bgClass: 'notif-icon-docs' };
      case 'ai': return { element: <Sparkles size={20} />, bgClass: 'notif-icon-ai' };
      case 'community': return { element: <MessageSquare size={20} />, bgClass: 'notif-icon-comm' };
      default: return { element: <Info size={20} />, bgClass: 'notif-icon-system' };
    }
  };

  const filteredNotifs = getFilteredNotifications();

  return (
    <div className="notifications-container">
      <div className="notifications-header">
        <div className="header-title-section">
          <h1>Thông báo (Notifications)</h1>
          <p>Cập nhật những hoạt động mới nhất trên tài khoản của bạn.</p>
        </div>
        <div className="header-actions">
          <button 
            type="button" 
            className="action-btn-secondary"
            onClick={handleMarkAllRead}
            disabled={notifications.every(n => n.read) || notifications.length === 0}
          >
            <Check size={16} />
            <span>Đánh dấu đã đọc tất cả</span>
          </button>
          
          <button type="button" className="action-btn-primary">
            <Settings size={16} />
            <span>Cài đặt thông báo</span>
          </button>
        </div>
      </div>

      <div className="notifications-tabs-container">
        <div className="notifications-tabs">
          {['All', 'System', 'Documents', 'AI Updates', 'Community'].map((tab) => (
            <button
              key={tab}
              type="button"
              className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab === 'AI Updates' ? 'AI Updates' : tab}
            </button>
          ))}
        </div>
      </div>

      <div className="notifications-list">
        {isLoading ? (
          <div style={{ padding: '40px', textAlign: 'center', color: '#6b7280' }}>Đang tải thông báo...</div>
        ) : filteredNotifs.length > 0 ? (
          filteredNotifs.map((notif) => {
            const iconInfo = getIcon(notif.type);
            return (
              <div 
                key={notif.id} 
                className={`notification-item ${notif.read ? 'read' : 'unread'}`}
                onClick={() => handleMarkAsRead(notif.id)}
                style={{ cursor: notif.read ? 'default' : 'pointer' }}
              >
                {!notif.read && <div className="unread-dot"></div>}
                
                <div className={`notification-icon-wrapper ${iconInfo.bgClass}`}>
                  {iconInfo.element}
                </div>

                <div className="notification-content">
                  <h4 className="notification-title">{notif.title}</h4>
                  <p className="notification-description">{notif.description}</p>
                </div>

                <div className="notification-time">
                  {notif.timeAgo}
                </div>
              </div>
            );
          })
        ) : (
          <div className="notifications-empty-state">
            <h3>Không có thông báo nào</h3>
            <p>Bạn đã xem hết tất cả các thông báo rồi!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;