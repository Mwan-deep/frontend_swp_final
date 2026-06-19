import React from 'react';
import { Outlet } from 'react-router-dom';
import ManagerHeader from '../shared/components/headerManager/ManagerHeader';
import ManagerSidebar from '../shared/components/sidebarManager/ManagerSidebar';
import './ManagerLayout.css';

const ManagerLayout = () => {
  return (
    <div className="manager-layout">
      <ManagerSidebar />
      <div className="manager-main-wrapper">
        <ManagerHeader />
        <main className="manager-main-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default ManagerLayout;
