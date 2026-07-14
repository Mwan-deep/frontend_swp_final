import React, { useState, useEffect } from 'react';
import axiosClient from '../../../utils/axiosClient';

const SecurityTab = ({ onChangePassword }) => {
  const [sessions, setSessions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        setIsLoading(true);
        // ĐÃ ĐỔI ĐƯỜNG DẪN TẠI ĐÂY
        const response = await axiosClient.get(`/api/my-profile/devices`);
        const data = response.result || response.data || [];
        setSessions(data);
      } catch (error) {
        console.error("Lỗi lấy danh sách thiết bị:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDevices();
  }, []);

  const handleLogoutSession = async (deviceId) => {
    try {
      // ĐÃ ĐỔI ĐƯỜNG DẪN TẠI ĐÂY
      await axiosClient.delete(`/api/my-profile/devices/${deviceId}`);
      setSessions(prev => prev.filter(session => session.id !== deviceId));
      alert('Đã đăng xuất thiết bị thành công!');
    } catch (error) {
      console.error("Lỗi đăng xuất thiết bị:", error);
      alert('Có lỗi xảy ra khi đăng xuất thiết bị.');
    }
  };

  const handleChangePassword = () => {
    if (onChangePassword) {
      onChangePassword();
    }
  };

  return (
    <div className="security-tab-container">
      <div className="security-card-inner">
        <div className="security-section-row">
          <div className="security-section-left">
            <div className="security-icon-box">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="sec-icon">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </div>
            <div className="security-text-details">
              <h4 className="security-item-title">Password</h4>
              <p className="security-item-subtitle">Manage your login password.</p>
            </div>
          </div>
          <button type="button" className="sec-action-btn" onClick={handleChangePassword}>
            Change Password
          </button>
        </div>

        <div className="sec-card-divider"></div>

        <div className="security-activity-section">
          <div className="activity-section-header">
            <div className="security-icon-box plain-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="sec-icon">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            </div>
            <div className="security-text-details">
              <h4 className="security-item-title">Recent Login Activity</h4>
              <p className="security-item-subtitle desc-text">Review devices where your account is currently logged in.</p>
            </div>
          </div>

          <div className="sessions-list-container">
            {isLoading ? (
              <div className="no-sessions-fallback">Đang tải lịch sử đăng nhập...</div>
            ) : sessions.length > 0 ? (
              sessions.map(session => (
                <div className="session-device-row" key={session.id}>
                  <div className="device-info-left">
                    <div className="device-icon-box">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="device-icon">
                        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                        <line x1="8" y1="21" x2="16" y2="21" />
                        <line x1="12" y1="17" x2="12" y2="21" />
                      </svg>
                    </div>
                    <div className="device-details">
                      <span className="device-name">{session.deviceId || 'Unknown Device'}</span>
                      <span className="device-location">
                        Status: <span style={{color: session.trusted ? '#10B981' : '#F59E0B'}}>{session.trusted ? 'Trusted' : 'Untrusted'}</span>
                      </span>
                    </div>
                  </div>
                  <div className="device-info-right">
                    <span className="device-time">
                      {session.lastLogin ? new Date(session.lastLogin).toLocaleString('en-GB') : 'N/A'}
                    </span>
                    <button type="button" className="sec-action-btn logout-device-btn" onClick={() => handleLogoutSession(session.id)}>
                      Logout
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-sessions-fallback">
                No active login sessions found.
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="security-support-footer">
        Need help? Contact support at <a href="mailto:support@fptstudyhub.edu.vn">support@fptstudyhub.edu.vn</a>
      </div>
    </div>
  );
};

export default SecurityTab;