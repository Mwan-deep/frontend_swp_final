/* Notifications.jsx */
import React, { useState, useEffect } from 'react';
import { Info, FileText, Sparkles, MessageSquare, Check, Settings } from 'lucide-react';
import './Notifications.css';
import { mockNotifications as initialNotifications } from '../../data/mockNotifications';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [activeTab, setActiveTab] = useState('All');

  
  useEffect(() => {
    const stored = localStorage.getItem('study_hub_notifications');
    if (stored) {
      try {
        setNotifications(JSON.parse(stored));
      } catch (e) {
        setNotifications(initialNotifications);
      }
    } else {
      localStorage.setItem('study_hub_notifications', JSON.stringify(initialNotifications));
      setNotifications(initialNotifications);
    }
  }, []);

  // Lưu thay đổi vào localStorage và phát sự kiện đồng bộ
  const saveNotifications = (updatedList) => {
    setNotifications(updatedList);
    localStorage.setItem('study_hub_notifications', JSON.stringify(updatedList));
    // Kích hoạt sự kiện để Header tự cập nhật chấm đỏ
    window.dispatchEvent(new Event('notificationsUpdated'));
  };

  const handleMarkAllRead = () => {
    const updated = notifications.map(notif => ({ ...notif, read: true }));
    saveNotifications(updated);
  };

  const handleMarkAsRead = (id) => {
    const updated = notifications.map(notif => {
      if (notif.id === id) {
        return { ...notif, read: true };
      }
      return notif;
    });
    saveNotifications(updated);
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
      case 'system':
        return { element: <Info size={20} />, bgClass: 'notif-icon-system' };
      case 'documents':
        return { element: <FileText size={20} />, bgClass: 'notif-icon-docs' };
      case 'ai':
        return { element: <Sparkles size={20} />, bgClass: 'notif-icon-ai' };
      case 'community':
        return { element: <MessageSquare size={20} />, bgClass: 'notif-icon-comm' };
      default:
        return { element: <Info size={20} />, bgClass: 'notif-icon-system' };
    }
  };

  const filteredNotifs = getFilteredNotifications();

  return (
    <div className="notifications-container">
      {/* 1. Header */}
      <div className="notifications-header">
        <div className="header-title-section">
          <h1>Notifications</h1>
          <p>Stay updated with your latest study activities.</p>
        </div>
        <div className="header-actions">
          <button 
            type="button" 
            className="action-btn-secondary"
            onClick={handleMarkAllRead}
            disabled={notifications.every(n => n.read)}
          >
            <Check size={16} />
            <span>Mark all as read</span>
          </button>
          
          <button 
            type="button" 
            className="action-btn-primary"
            onClick={() => alert('Notification settings clicked')}
          >
            <Settings size={16} />
            <span>Notification Settings</span>
          </button>
        </div>
      </div>

      {/* 2. Tabs */}
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

      {/* 3. Notifications List */}
      <div className="notifications-list">
        {filteredNotifs.length > 0 ? (
          filteredNotifs.map((notif) => {
            const iconInfo = getIcon(notif.type);
            return (
              <div 
                key={notif.id} 
                className={`notification-item ${notif.read ? 'read' : 'unread'}`}
                onClick={() => handleMarkAsRead(notif.id)}
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
            <h3>No notifications found</h3>
            <p>You are all caught up!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;