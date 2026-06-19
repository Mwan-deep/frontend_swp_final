import React, { useState } from 'react';
import { LayoutGrid, FileText, BarChart2, LogOut, Settings } from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';
import LogoutModal from '../LogoutModal/LogoutModal';
import './ManagerSidebar.css';

const ManagerSidebar = () => {
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('role');
    navigate('/login');
  };

  return (
    <aside className="manager-sidebar">
      <div className="manager-sidebar-header">
        <h1 className="manager-sidebar-title">FPT Study Hub</h1>
        <p className="manager-sidebar-subtitle">Manager Control Panel</p>
      </div>

      <nav className="manager-sidebar-nav">
        <ul className="manager-sidebar-menu">
          <li>
            <NavLink to="/manager" end className={({ isActive }) => `manager-sidebar-item ${isActive ? 'active' : ''}`}>
              <LayoutGrid size={20} />
              <span>Dashboard</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/manager/documents" className={({ isActive }) => `manager-sidebar-item ${isActive ? 'active' : ''}`}>
              <FileText size={20} />
              <span>Documents</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/manager/community" className={({ isActive }) => `manager-sidebar-item ${isActive ? 'active' : ''}`}>
              <BarChart2 size={20} />
              <span>Community</span>
            </NavLink>
          </li>
        </ul>
      </nav>

      <div className="manager-sidebar-footer">
        <NavLink to="/manager/settings" className="manager-sidebar-bottom-item">
          <Settings size={20} />
          <span>Settings</span>
        </NavLink>
        <button className="manager-sidebar-logout" onClick={() => setIsLogoutModalOpen(true)}>
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>

      <LogoutModal 
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={handleLogout}
      />
    </aside>
  );
};

export default ManagerSidebar;
