import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminHeader from '../shared/components/headerAdmin/AdminHeader';
import AdminSidebar from '../shared/components/sidebarAdmin/AdminSidebar';
import './AdminLayout.css';

const AdminLayout = () => {
  return (
    <div className="admin-layout">
      <AdminSidebar />
      <div className="admin-main-wrapper">
        <AdminHeader />
        <main className="admin-main-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
