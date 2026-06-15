import React from 'react';
import { NavLink } from 'react-router-dom';
import "./sidebar.css";
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

const Sidebar = () => {
  const menuItems = [
    { id: 'dashboard', path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'documents', path: '/documents', label: 'Documents', icon: Folder },
    { id: 'ai-features', path: '/ai-features', label: 'AI Features', icon: Sparkles },
    { id: 'learning', path: '/learning', label: 'Learning', icon: BookOpen },
    { id: 'community', path: '/community', label: 'Community', icon: Users },
    { id: 'account', path: '/account', label: 'Account', icon: User },
  ];

  return (
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
          onClick={() => alert('Opening document upload portal...')}
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
          <div 
            className="nav-item"
            onClick={() => alert('Logging out...')}
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