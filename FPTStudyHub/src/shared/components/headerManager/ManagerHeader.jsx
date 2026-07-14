import React from 'react';
import './ManagerHeader.css';

const ManagerHeader = () => {
  return (
    <header className="manager-header">
      <div className="manager-header-left">
        <h2 className="manager-header-title">
          Manager Dashboard
        </h2>

        <p className="manager-header-subtitle">
          Quản lý hệ thống AI Study Hub
        </p>
      </div>
    </header>
  );
};

export default ManagerHeader;