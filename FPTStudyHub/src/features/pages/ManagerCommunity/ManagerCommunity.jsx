import React, { useState, useEffect } from 'react';
import { Award, Download, Eye, TrendingUp, CheckCircle, X, Trash2, BookOpen } from 'lucide-react';
import axiosClient from '../../../utils/axiosClient';
import { getDirectImageUrl } from '../../../utils/imageHelper'; // ĐÃ THÊM IMPORT
import './ManagerCommunity.css';

const ManagerCommunity = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [contributors, setContributors] = useState([]);
  const [hallOfFame, setHallOfFame] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  
  const [awardForm, setAwardForm] = useState({
    badgeName: 'Trạng Nguyên Lượt Xem',
    message: 'Tôn vinh thành tích xuất sắc',
    month: `Tháng ${new Date().getMonth() + 1}/${new Date().getFullYear()}`
  });

  const badgeOptions = [
    { name: 'Trạng Nguyên Lượt Xem', icon: '👁️', desc: 'Có lượt xem ấn tượng' },
    { name: 'Thần Toán Bài làm', icon: '📝', desc: 'Chăm chỉ làm Quiz' },
    { name: 'Siêu phẩm hữu ích', icon: '📥', desc: 'Lượt tải cực khủng' }
  ];

  useEffect(() => {
    fetchCommunityData();
  }, []);

  const fetchCommunityData = async () => {
    try {
      setIsLoading(true);
      const [statsRes, hofRes] = await Promise.all([
        axiosClient.get('/api/v1/community/stats'),
        axiosClient.get('/api/v1/community/hall-of-fame')
      ]);
      setContributors(statsRes.result || []);
      setHallOfFame(hofRes.result || []);
    } catch (error) {
      console.error("Lỗi tải dữ liệu Community:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenAwardModal = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleSubmitAward = async (e) => {
    e.preventDefault();
    if (!selectedUser) return;
    try {
      const payload = {
        accountId: selectedUser.accountId,
        category: awardForm.message,
        badgeName: awardForm.badgeName,
        month: awardForm.month
      };
      
      await axiosClient.post('/api/v1/community/hall-of-fame', payload);
      alert(`Đã cấp danh hiệu "${awardForm.badgeName}" cho ${selectedUser.fullName || selectedUser.userName}!`);
      
      fetchCommunityData();
      setIsModalOpen(false);
    } catch (error) {
      alert("Lỗi khi cấp biểu dương: " + (error.response?.data?.message || error.message));
    }
  };

  const handleDeleteAward = async (awardId, userName) => {
    if(window.confirm(`Bạn có chắc chắn muốn THU HỒI danh hiệu của sinh viên ${userName}?`)) {
      try {
        await axiosClient.delete(`/api/v1/community/hall-of-fame/${awardId}`);
        alert("Đã thu hồi danh hiệu thành công!");
        setHallOfFame(prev => prev.filter(item => item.id !== awardId));
      } catch (error) {
        alert("Lỗi khi xóa danh hiệu: " + (error.response?.data?.message || error.message));
      }
    }
  };

  if (isLoading) {
    return <div style={{ padding: '50px', textAlign: 'center' }}>Đang tổng hợp dữ liệu cộng đồng...</div>;
  }

  return (
    <div className="manager-community">
      <div className="community-content">
        <div className="community-top-section">
          <div className="community-intro">
            <h1 className="community-title"><TrendingUp size={28} className="title-icon" /> Thống Kê & Biểu Dương</h1>
            <p className="community-subtitle">Xem chi tiết tương tác và cấp phát danh hiệu lên Bảng Vàng.</p>
          </div>
        </div>

        <div className="section-title-row">
          <div className="section-title"><BookOpen size={18} /> Bảng xếp hạng Tương tác Cộng đồng</div>
        </div>
        <table className="community-table">
          <thead>
            <tr>
              <th>TÀI KHOẢN</th>
              <th>TỔNG VIEW</th>
              <th>TỔNG TẢI XUỐNG</th>
              <th>SỐ LẦN LÀM QUIZ</th>
              <th>HÀNH ĐỘNG</th>
            </tr>
          </thead>
          <tbody>
            {contributors.map((user) => (
              <tr key={user.accountId}>
                <td className="user-cell">
                  {/* ĐÃ CẬP NHẬT CẤU TRÚC ẢNH AVATAR */}
                  <img 
                    src={user.avatarUrl ? getDirectImageUrl(user.avatarUrl) : `https://ui-avatars.com/api/?name=${user.userName || 'U'}&background=random`} 
                    alt={user.userName}
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      e.target.src = `https://ui-avatars.com/api/?name=${user.userName || 'U'}&background=random`;
                    }}
                  />
                  <div>
                    <strong>{user.fullName || user.userName}</strong>
                    <div style={{ fontSize: '12px', color: '#64748b' }}>@{user.userName}</div>
                  </div>
                </td>
                <td><Eye size={16} style={{ display: 'inline', color: '#3b82f6', marginRight: '4px' }} /> <strong>{user.totalViews?.toLocaleString() || 0}</strong></td>
                <td><Download size={16} style={{ display: 'inline', color: '#10b981', marginRight: '4px' }} /> <strong>{user.totalDownloads?.toLocaleString() || 0}</strong></td>
                <td><CheckCircle size={16} style={{ display: 'inline', color: '#f59e0b', marginRight: '4px' }} /> <strong>{user.totalQuizzes?.toLocaleString() || 0}</strong></td>
                <td>
                  <button className="btn-award-action" onClick={() => handleOpenAwardModal(user)}>
                    <Award size={16} /> Biểu dương
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="hall-of-fame-section" style={{ marginTop: '50px' }}>
          <div className="hall-of-fame-header">
            <div className="section-title" style={{ color: '#d97706', fontSize: '20px' }}>
              <Award size={24} /> Hall of Fame (Bảng Vàng Biểu Dương)
            </div>
          </div>
          <table className="community-table hall-of-fame-table">
            <thead>
              <tr>
                <th>KỲ BIỂU DƯƠNG</th>
                <th>NGƯỜI ĐẠT GIẢI</th>
                <th>LỜI NHẮN</th>
                <th>DANH VỌNG</th>
                <th>THU HỒI</th>
              </tr>
            </thead>
            <tbody>
              {hallOfFame.length === 0 ? (
                <tr><td colSpan="5" style={{ textAlign: 'center', padding: '30px', color: '#94a3b8' }}>Chưa có cá nhân nào được biểu dương.</td></tr>
              ) : (
                hallOfFame.map((item) => (
                  <tr key={item.id}>
                    <td className="bold">{item.month}</td>
                    <td className="user-cell">
                      {/* ĐÃ CẬP NHẬT CẤU TRÚC ẢNH AVATAR */}
                      <img 
                        src={item.account?.avatarUrl ? getDirectImageUrl(item.account.avatarUrl) : `https://ui-avatars.com/api/?name=${item.account?.userName || 'U'}&background=random`} 
                        alt="Avatar"
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          e.target.src = `https://ui-avatars.com/api/?name=${item.account?.userName || 'U'}&background=random`;
                        }}
                      />
                      <strong>{item.account?.fullName || item.account?.userName}</strong>
                    </td>
                    <td style={{ maxWidth: '200px' }}>{item.category}</td>
                    <td>
                      <span className="gold-medal-badge">
                        {badgeOptions.find(b => b.name === item.badgeName)?.icon || '🏅'} {item.badgeName}
                      </span>
                    </td>
                    <td>
                      <button 
                        onClick={() => handleDeleteAward(item.id, item.account?.userName)}
                        style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '8px' }}
                        title="Thu hồi danh hiệu"
                      >
                        <Trash2 size={20} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && selectedUser && (
        <div className="award-modal-overlay">
          <div className="award-modal-content">
            <div className="modal-header">
              <h3>Cấp phát Danh Vọng</h3>
              <X className="close-icon" onClick={() => setIsModalOpen(false)} />
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmitAward}>
                <div className="form-group">
                  <label>Kỳ biểu dương (Tháng/Năm):</label>
                  <input type="text" value={awardForm.month} onChange={(e) => setAwardForm({...awardForm, month: e.target.value})} required />
                </div>
                <div className="form-group">
                  <label>Lời nhắn / Ghi chú (Sẽ lưu vào hệ thống):</label>
                  <input type="text" value={awardForm.message} onChange={(e) => setAwardForm({...awardForm, message: e.target.value})} required />
                </div>
                <div className="form-group">
                  <label>Chọn Danh Vọng trao tặng:</label>
                  <div className="badge-selection" style={{ gridTemplateColumns: '1fr' }}>
                    {badgeOptions.map(badge => (
                      <div 
                        key={badge.name} 
                        className={`badge-option ${awardForm.badgeName === badge.name ? 'selected' : ''}`}
                        onClick={() => setAwardForm({...awardForm, badgeName: badge.name})}
                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                      >
                        <span>{badge.icon} <strong>{badge.name}</strong></span>
                        <span style={{ fontSize: '12px', fontWeight: 'normal' }}>({badge.desc})</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn-cancel" onClick={() => setIsModalOpen(false)}>Hủy</button>
                  <button type="submit" className="btn-submit-award">Vinh Danh Sinh Viên</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManagerCommunity;