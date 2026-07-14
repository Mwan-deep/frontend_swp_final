import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ChevronRight, User, Shield, CheckCircle } from 'lucide-react';
import axiosClient from '../../utils/axiosClient'; // Đảm bảo đường dẫn này trỏ đúng tới axiosClient
import { getDirectImageUrl } from '../../utils/imageHelper'; // ĐÃ THÊM IMPORT HÀM XỬ LÝ ẢNH
import './AdminAccountDetails.css';

const AdminAccountDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Lấy ID từ trang Dashboard truyền sang, nếu không có thì đá về Admin
  const userId = location.state?.userId;

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  
  // State lưu thông tin gốc từ Backend
  const [userData, setUserData] = useState(null);

  // State quản lý form (dùng để Edit)
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    dob: '',
    gender: 'Other',
    bio: '',
    accountStatus: 'ACTIVE',
    reason: ''
  });

  // 1. GỌI API LẤY THÔNG TIN CHI TIẾT KHI VỪA VÀO TRANG
  useEffect(() => {
    if (!userId) {
      navigate('/admin'); // Nếu không có ID thì quay về Dashboard
      return;
    }

    const fetchUserDetails = async () => {
      try {
        const response = await axiosClient.get(`/api/account/infor/${userId}`);
        const user = response.result;
        
        setUserData(user);
        
        // Đổ dữ liệu thật vào Form
        setFormData({
          fullName: user.fullName || '',
          email: user.email || '',
          dob: user.dob ? user.dob.split('T')[0] : '', // Chuyển format ngày cho thẻ <input type="date">
          gender: user.gender || 'Other',
          bio: user.bio || '',
          accountStatus: user.accountStatus || 'ACTIVE',
          reason: ''
        });
      } catch (error) {
        console.error("Lỗi khi lấy thông tin chi tiết:", error);
        alert("Không thể tải thông tin người dùng này!");
        navigate('/admin');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserDetails();
  }, [userId, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // 2. GỌI API LƯU THAY ĐỔI
  const handleSave = async () => {
    if (formData.accountStatus !== 'ACTIVE' && !formData.reason.trim()) {
      alert('Vui lòng nhập lý do nếu bạn muốn khóa tài khoản này.');
      return;
    }
    
    setIsSaving(true);
    try {
      // ĐÃ BỔ SUNG TRƯỜNG EMAIL VÀO ĐÂY ĐỂ BACKEND KHÔNG BỊ LỖI NULL
      await axiosClient.put(`/api/account/${userId}`, {
        fullName: formData.fullName,
        email: formData.email, // 👈 BỔ SUNG DÒNG NÀY
        dob: formData.dob,
        gender: formData.gender,
        bio: formData.bio
      });

      // Nếu trạng thái trong Form khác với trạng thái gốc của Database, gọi thêm API đổi trạng thái
      if (formData.accountStatus !== userData.accountStatus) {
         await axiosClient.put(`/api/account/${userId}/status`);
      }

      alert('Cập nhật thông tin thành công!');
      navigate('/admin');
    } catch (error) {
      console.error("Lỗi khi lưu thông tin:", error);
      alert(error.response?.data?.message || 'Có lỗi xảy ra khi lưu thay đổi!');
    } finally {
      setIsSaving(false);
    }
  };

  // Hàm fomat thời gian
  const formatDateTime = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleString('vi-VN');
  };

  if (isLoading) {
    return <div style={{ padding: '40px', textAlign: 'center' }}>Đang tải thông tin...</div>;
  }

  return (
    <div className="admin-page-container">
      {/* Breadcrumb */}
      <div className="breadcrumb-wrapper">
        <div className="breadcrumb">
          <span className="breadcrumb-link" onClick={() => navigate('/admin')}>Dashboard</span>
          <ChevronRight size={14} className="breadcrumb-separator" />
          <span className="breadcrumb-current">Account Details</span>
        </div>
        <div className="sync-status">
          <span className="sync-dot"></span> Đã đồng bộ với Database
        </div>
      </div>

      {/* Top Profile Card */}
      <div className="details-header-card">
        <div className="details-header-profile">
          {/* ĐÃ CẬP NHẬT CẤU TRÚC ẢNH AVATAR */}
          <img 
            src={userData.avatarUrl ? getDirectImageUrl(userData.avatarUrl) : "https://ui-avatars.com/api/?name=" + encodeURIComponent(userData.fullName || userData.userName || 'User') + "&background=random"} 
            alt={formData.fullName || userData.userName} 
            className="details-avatar"
            referrerPolicy="no-referrer"
            onError={(e) => {
              e.target.src = "https://ui-avatars.com/api/?name=" + encodeURIComponent(userData.fullName || userData.userName || 'User') + "&background=random";
            }}
          />
          <div className="details-header-info">
            <h2 className="details-name">{formData.fullName || userData.userName}</h2>
            <div className="details-badges">
              <span className="badge-id">ID: {userData.accountId}</span>
              <span className={formData.accountStatus === 'ACTIVE' ? "badge-status-green" : "badge-status-red"}>
                <span className="status-dot"></span> {formData.accountStatus}
              </span>
            </div>
          </div>
        </div>
        <div className="details-header-actions">
          <button className="btn-cancel" onClick={() => navigate('/admin')} disabled={isSaving}>Hủy</button>
          <button className="btn-save" onClick={handleSave} disabled={isSaving}>
            {isSaving ? 'Đang lưu...' : 'Lưu Thay Đổi'}
          </button>
        </div>
      </div>

      <div className="details-layout">
        {/* Left Column: Personal Information */}
        <div className="details-main">
          <div className="section-card">
            <div className="section-header">
              <div className="section-title-wrapper">
                <User size={18} className="section-icon" />
                <h3 className="section-title">Personal Information</h3>
              </div>
              <span className="section-meta">Editable Fields</span>
            </div>

            <div className="section-body">
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Họ và Tên</label>
                  <input type="text" name="fullName" className="form-input" value={formData.fullName} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label className="form-label d-flex-between">
                    Địa chỉ Email
                    <span className="verified-badge"><CheckCircle size={12} /> Đã xác thực</span>
                  </label>
                  {/* Khóa trường Email, không cho edit vì nó là định danh đăng nhập */}
                  <input type="email" name="email" className="form-input disabled-dashed" value={formData.email} readOnly title="Không thể đổi Email hệ thống" />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Ngày sinh (DOB)</label>
                  <input type="date" name="dob" className="form-input" value={formData.dob} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label className="form-label">Giới tính</label>
                  <select name="gender" className="form-select" value={formData.gender} onChange={handleChange}>
                    <option value="MALE">Nam (Male)</option>
                    <option value="FEMALE">Nữ (Female)</option>
                    <option value="OTHER">Khác (Other)</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Tiểu sử / Ghi chú (Bio)</label>
                <textarea 
                  name="bio"
                  className="form-textarea" 
                  rows="4" 
                  value={formData.bio}
                  onChange={handleChange}
                ></textarea>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Security & Control */}
        <div className="details-sidebar">
          {/* Security & Metadata Card */}
          <div className="section-card bg-light">
            <div className="section-header border-bottom-0 pb-0">
              <div className="section-title-wrapper">
                <Shield size={18} className="section-icon" />
                <h3 className="section-title">Bảo mật & Hệ thống</h3>
              </div>
            </div>
            <div className="section-body pt-16">
              <div className="form-group">
                <label className="form-label">Tên đăng nhập (Username)</label>
                <input type="text" className="form-input disabled-dashed" value={userData.userName} readOnly />
              </div>
              <div className="form-group">
                <label className="form-label">Chuỗi xác thực</label>
                <input type="password" className="form-input disabled-dashed" value="••••••••••••••••••••" readOnly />
              </div>
              
              <div className="metadata-list">
                <div className="metadata-row">
                  <span className="metadata-label">Ngày tạo tài khoản</span>
                  <span className="metadata-value">{formatDateTime(userData.createdAt)}</span>
                </div>
                <div className="metadata-row">
                  <span className="metadata-label">Cập nhật lần cuối</span>
                  <span className="metadata-value">{formatDateTime(userData.updatedAt) || 'Chưa cập nhật'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Status Control Card */}
          <div className="section-card border-warning">
            <div className="section-body">
              <div className="section-title-wrapper text-warning mb-16">
                <User size={18} className="section-icon" />
                <h3 className="section-title">Kiểm soát Trạng thái</h3>
              </div>
              <p className="status-desc">Thay đổi trạng thái sẽ lập tức tước quyền đăng nhập của người dùng vào hệ thống AI Study Hub.</p>
              
              <div className="form-group">
                <label className="form-label">Trạng thái đích</label>
                <select name="accountStatus" className="form-select" value={formData.accountStatus} onChange={handleChange}>
                  <option value="ACTIVE">🟢 Mở khóa (Active)</option>
                  <option value="INACTIVE">🔴 Khóa tài khoản (Inactive)</option>
                </select>
              </div>
              
              <div className="form-group mb-0">
                <label className="form-label">Lý do thay đổi <span className="text-danger">*</span></label>
                <textarea 
                  name="reason"
                  className="form-textarea" 
                  rows="3" 
                  placeholder="Bắt buộc nhập nếu bạn muốn chuyển sang Inactive..."
                  value={formData.reason}
                  onChange={handleChange}
                ></textarea>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAccountDetails;