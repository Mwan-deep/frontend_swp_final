import React, { useState } from 'react';
import { LayoutGrid, FileText, LogOut, Settings } from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';
import LogoutModal from '../LogoutModal/LogoutModal';
import './AdminSidebar.css';

const AdminSidebar = () => {
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('role');
    navigate('/login');
  };

  return (
    <aside className="admin-sidebar">
      <div className="admin-sidebar-header">
        <h1 className="admin-sidebar-title">FPT Study Hub</h1>
        <p className="admin-sidebar-subtitle">Admin Control Panel</p>
      </div>

      <nav className="admin-sidebar-nav">
        <ul className="admin-sidebar-menu">
          <li>
            <NavLink to="/admin" end className={({ isActive }) => `admin-sidebar-item ${isActive ? 'active' : ''}`}>
              <LayoutGrid size={20} />
              <span>Dashboard</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/reports" className={({ isActive }) => `admin-sidebar-item ${isActive ? 'active' : ''}`}>
              <FileText size={20} />
              <span>Report Management</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/settings" className={({ isActive }) => `admin-sidebar-item ${isActive ? 'active' : ''}`}>
              <Settings size={20} />
              <span>Settings</span>
            </NavLink>
          </li>
        </ul>
      </nav>

      <div className="admin-sidebar-footer">
        <button className="admin-sidebar-logout" onClick={() => setIsLogoutModalOpen(true)}>
          <LogOut size={20} />
          <span>Logout</span>
        </button>
        <div className="admin-sidebar-profile">
          <img
            src="https://ui-avatars.com/api/?name=Admin+Admin&background=random"
            alt="Admin Profile"
            className="admin-profile-img"
          />
          <div className="admin-profile-info">
            <p className="admin-profile-name">Admin Admin</p>
            <p className="admin-profile-role">Superuser Access</p>
          </div>
        </div>
      </div>

      <LogoutModal 
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={handleLogout}
      />
    </aside>
  );
};

export default AdminSidebar;
