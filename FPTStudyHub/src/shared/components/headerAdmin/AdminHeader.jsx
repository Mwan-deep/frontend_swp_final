import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDirectImageUrl } from '../../../utils/imageHelper';
import axiosClient from '../../../utils/axiosClient';
import './AdminHeader.css';

const AdminHeader = () => {
  const navigate = useNavigate();

  // =========================
  // STATES
  // =========================
  const [avatarUrl, setAvatarUrl] = useState('');
  const [fullName, setFullName] = useState('Admin');

  // =========================
  // LOAD PROFILE
  // =========================
  const loadProfile = async () => {
    try {
      const res = await axiosClient.get('/api/my-profile');

      const data = res.result || res.data || res;

      if (data) {
        setAvatarUrl(data.avatarUrl || '');
        setFullName(data.fullName || 'Admin');
      }

    } catch (err) {
      console.error(
        'Lỗi lấy profile admin:',
        err
      );
    }
  };

  // =========================
  // EFFECT
  // =========================
  useEffect(() => {
    loadProfile();

    // Event cập nhật avatar realtime
    window.addEventListener(
      'avatarUpdated',
      loadProfile
    );

    return () => {
      window.removeEventListener(
        'avatarUpdated',
        loadProfile
      );
    };
  }, []);

  return (
    <header className="admin-header">

      {/* =========================
          LEFT
      ========================== */}
      <div className="admin-header-left">

        <h2 className="admin-header-title">
          Admin Dashboard
        </h2>

        <p className="admin-header-subtitle">
          Administer and monitor the entire system
        </p>

      </div>

      {/* =========================
          RIGHT
      ========================== */}
      <div
        className="header-profile"
        onClick={() => navigate('/admin/settings')}
      >

        <img
          src={
            avatarUrl
              ? getDirectImageUrl(avatarUrl)
              : `https://ui-avatars.com/api/?name=${encodeURIComponent(fullName)}&background=random`
          }
          alt="Profile"
          className="header-avatar"
          referrerPolicy="no-referrer"
          onError={(e) => {
            e.target.src =
              `https://ui-avatars.com/api/?name=${encodeURIComponent(fullName)}&background=random`;
          }}
        />

      </div>

    </header>
  );
};

export default AdminHeader;