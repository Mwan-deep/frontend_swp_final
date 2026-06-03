
import './sidebar.css';
import React from 'react';
import { 
  LayoutDashboard, 
  Folder, 
  Sparkles, 
  BookOpen, 
  Users, 
  User, 
  Upload, 
  Settings, 
  LogOut 
} from 'lucide-react';


const Sidebar = ({ activeTab = 'documents', setActiveTab }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'documents', label: 'Documents', icon: Folder },
    { id: 'ai-features', label: 'AI Features', icon: Sparkles },
    { id: 'learning', label: 'Learning', icon: BookOpen },
    { id: 'community', label: 'Community', icon: Users },
    { id: 'account', label: 'Account', icon: User },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-nav">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
              onClick={() => setActiveTab && setActiveTab(item.id)}
            >
              <Icon size={18} />
              <span>{item.label}</span>
            </div>
          );
        })}
      </div>

      <div className="sidebar-footer">
        <button 
          className="upload-btn"
          onClick={() => alert('Đang mở cổng tải lên tài liệu...')}
        >
          <Upload size={16} />
          <span>Upload Document</span>
        </button>

        <div className="sidebar-bottom-links">
          <div 
            className={`nav-item ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => setActiveTab && setActiveTab('settings')}
          >
            <Settings size={18} />
            <span>Settings</span>
          </div>
          <div 
            className="nav-item"
            onClick={() => alert('Đang đăng xuất...')}
          >
            <LogOut size={18} />
            <span>Logout</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;