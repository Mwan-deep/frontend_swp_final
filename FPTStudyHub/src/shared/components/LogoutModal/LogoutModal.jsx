import React from 'react';
import { LogOut } from 'lucide-react';
import './LogoutModal.css';

const LogoutModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="logout-modal-overlay">
      <div className="logout-modal-content">
        <div className="logout-modal-icon-wrapper">
          <LogOut size={28} className="logout-modal-icon" />
        </div>
        <h2 className="logout-modal-title">Are you sure you want to log out??</h2>
        <p className="logout-modal-subtitle">
          Any current sessions will be terminated.<br/>Don't forget to come back soon!
        </p>
        <div className="logout-modal-actions">
          <button className="btn-cancel" onClick={onClose}>
            Cancel
          </button>
          <button className="btn-confirm" onClick={onConfirm}>
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
