import React, { useState, useEffect } from 'react';
import { Info, FileText, Sparkles, MessageSquare, Check, Trash2 } from 'lucide-react'; // Removed Settings
import axiosClient from '../../utils/axiosClient'; 
import './Notifications.css';

// Function to calculate time passed
const calculateTimeAgo = (dateString) => {
  if (!dateString) return 'Just now';
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now - date) / 1000);
  
  if (seconds < 60) return 'Just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
  const days = Math.floor(hours / 24);
  return `${days} day${days !== 1 ? 's' : ''} ago`;
};

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [activeTab, setActiveTab] = useState('All');
  const [isLoading, setIsLoading] = useState(true);

  // 1. FETCH DATA FROM BACKEND
  const fetchNotifications = async () => {
    try {
      setIsLoading(true);
      const response = await axiosClient.get('/api/notifications');
      const data = Array.isArray(response) ? response : (response?.result || []);
      
      const mappedData = data.map(n => ({
        id: n.id,
        title: n.title,
        description: n.message,
        type: n.type || 'system',
        read: n.isRead,
        timeAgo: calculateTimeAgo(n.createdAt)
      }));
      
      setNotifications(mappedData);
      window.dispatchEvent(new Event('notificationsUpdated'));
    } catch (error) {
      console.error("Error fetching notifications:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  // 2. MARK 1 NOTIFICATION AS READ
  const handleMarkAsRead = async (id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
    window.dispatchEvent(new Event('notificationsUpdated'));

    try {
      await axiosClient.put(`/api/notifications/${id}/read`);
    } catch (error) {
      fetchNotifications();
    }
  };

  // 3. MARK ALL AS READ
  const handleMarkAllRead = async () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    window.dispatchEvent(new Event('notificationsUpdated'));

    try {
      await axiosClient.put('/api/notifications/read-all');
    } catch (error) {
      fetchNotifications();
    }
  };

  // ADDED: 4. DELETE NOTIFICATION
  const handleDelete = async (id, e) => {
    e.stopPropagation(); // Very important: Prevent click from triggering handleMarkAsRead on the parent element
    
    if (!window.confirm("Are you sure you want to delete this notification?")) return;

    // Optimistic UI: Delete immediately on the interface for a smooth experience
    setNotifications(prev => prev.filter(n => n.id !== id));
    window.dispatchEvent(new Event('notificationsUpdated'));

    try {
      await axiosClient.delete(`/api/notifications/${id}`);
    } catch (error) {
      console.error("Error deleting notification:", error);
      fetchNotifications(); // If error, reload original data
    }
  };

  // Filter notifications by selected Tab
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
          <h1>Notifications</h1>
          <p>Stay updated with the latest activities on your account.</p>
        </div>
        <div className="header-actions">
          <button 
            type="button" 
            className="action-btn-secondary"
            onClick={handleMarkAllRead}
            disabled={notifications.every(n => n.read) || notifications.length === 0}
          >
            <Check size={16} />
            <span>Mark all as read</span>
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
          <div style={{ padding: '40px', textAlign: 'center', color: '#6b7280' }}>Loading notifications...</div>
        ) : filteredNotifs.length > 0 ? (
          filteredNotifs.map((notif) => {
            const iconInfo = getIcon(notif.type);
            return (
              <div 
                key={notif.id} 
                className={`notification-item ${notif.read ? 'read' : 'unread'}`}
                onClick={() => handleMarkAsRead(notif.id)}
                style={{ cursor: notif.read ? 'default' : 'pointer', position: 'relative' }}
              >
                {!notif.read && <div className="unread-dot"></div>}
                
                <div className={`notification-icon-wrapper ${iconInfo.bgClass}`}>
                  {iconInfo.element}
                </div>

                <div className="notification-content">
                  <h4 className="notification-title">{notif.title}</h4>
                  <p className="notification-description">{notif.description}</p>
                </div>

                <div className="notification-time-actions" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <div className="notification-time">{notif.timeAgo}</div>
                  
                  {/* ADDED: Delete notification button */}
                  <button 
                    className="delete-notif-btn" 
                    onClick={(e) => handleDelete(notif.id, e)}
                    title="Delete notification"
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#9ca3af',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '4px',
                      borderRadius: '4px',
                      transition: 'color 0.2s, background-color 0.2s'
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = '#ef4444'; e.currentTarget.style.backgroundColor = '#fee2e2'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = '#9ca3af'; e.currentTarget.style.backgroundColor = 'transparent'; }}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div className="notifications-empty-state">
            <h3>No notifications yet</h3>
            <p>You're all caught up!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;
