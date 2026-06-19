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
        <h2 className="logout-modal-title">Bạn có chắc chắn muốn đăng xuất?</h2>
        <p className="logout-modal-subtitle">
          Mọi phiên làm việc hiện tại của bạn sẽ kết thúc.<br/>Đừng quên quay lại sớm nhé!
        </p>
        <div className="logout-modal-actions">
          <button className="btn-cancel" onClick={onClose}>
            Hủy
          </button>
          <button className="btn-confirm" onClick={onConfirm}>
            Đăng xuất
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
