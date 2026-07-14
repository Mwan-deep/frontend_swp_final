import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Info } from 'lucide-react';
import axiosClient from '../../utils/axiosClient';
import './AdminCreateAccount.css';

const AdminCreateAccount = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    passwordHash: '', 
    dob: '',
    gender: 'FEMALE',
    role: 'MANAGER' 
  });
  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCreate = async () => {
    if (!formData.fullName || !formData.email || !formData.passwordHash || !formData.role) {
      alert('Vui lòng điền đầy đủ các thông tin bắt buộc.');
      return;
    }

    setIsSaving(true);
    try {
      await axiosClient.post('/api/account/createAccountByAdmin', {
        fullName: formData.fullName,
        email: formData.email,
        passwordHash: formData.passwordHash, 
        dob: formData.dob,
        gender: formData.gender,
        role: formData.role 
      });

      alert('Tài khoản đã được tạo thành công!');
      navigate('/admin');
    } catch (error) {
      console.error("Lỗi tạo tài khoản:", error);
      alert(error.response?.data?.message || 'Có lỗi xảy ra khi tạo tài khoản!');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="admin-page-container">
      {/* Breadcrumb Navigation */}
      <div className="breadcrumb">
        <span className="breadcrumb-link" onClick={() => navigate('/admin')}>Dashboard</span>
        <ChevronRight size={14} className="breadcrumb-separator" />
        <span className="breadcrumb-current">Create Account</span>
      </div>

      <div className="create-account-layout">
        {/* Khối Form bên trái */}
        <div className="create-account-main">
          <div className="card-header">
            <h2 className="card-title">Create New Account</h2>
            <p className="card-subtitle">Cấp quyền truy cập hệ thống AI Study Hub cho người dùng mới.</p>
          </div>

          <div className="card-body">
            {/* Full Name */}
            <div className="form-group">
              <label className="form-label">Họ và Tên</label>
              <input type="text" name="fullName" className="form-input" placeholder="Nguyễn Văn A..." value={formData.fullName} onChange={handleChange} />
            </div>

            {/* Email & Password */}
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input type="email" name="email" className="form-input" placeholder="admin@studyhub.com" value={formData.email} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label className="form-label">Password</label>
                <input type="password" name="passwordHash" className="form-input" placeholder="••••••••" value={formData.passwordHash} onChange={handleChange} />
              </div>
            </div>

            {/* Role & Gender */}
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Vai trò (Role)</label>
                <select name="role" className="form-select" value={formData.role} onChange={handleChange}>
                  <option value="USER">User / Student</option>
                  <option value="MANAGER">Manager (Quản lý)</option>
                  <option value="ADMIN">Admin (Quản trị viên)</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Giới tính (Gender)</label>
                <select name="gender" className="form-select" value={formData.gender} onChange={handleChange}>
                  <option value="FEMALE">Nữ (Female)</option>
                  <option value="MALE">Nam (Male)</option>
                  <option value="OTHER">Khác (Other)</option>
                </select>
              </div>
            </div>

            {/* DOB */}
            <div className="form-group">
              <label className="form-label">Ngày sinh (Date of Birth)</label>
              <input type="date" name="dob" className="form-input" value={formData.dob} onChange={handleChange} />
            </div>
          </div>

          <div className="card-footer">
            <button className="btn-cancel" onClick={() => navigate('/admin')} disabled={isSaving}>Hủy bỏ (Cancel)</button>
            <button className="btn-save" onClick={handleCreate} disabled={isSaving}>
              {isSaving ? 'Đang tạo...' : 'Tạo Tài Khoản'}
            </button>
          </div>
        </div>

        {/* Khối Sidebar Thông tin bên phải */}
        <div className="create-account-sidebar">
          <div className="info-card">
            <div className="info-card-header">
              <Info size={18} className="info-icon" />
              <h3 className="info-title">Quyền Hạn Vai Trò</h3>
            </div>
            
            <div className="permission-item">
              <h4 className="permission-name">Admin</h4>
              <p className="permission-desc">Quyền cao nhất. Quản lý toàn bộ tài khoản, phân quyền và giám sát hệ thống.</p>
            </div>
            
            <div className="permission-item">
              <h4 className="permission-name">Manager</h4>
              <p className="permission-desc">Quản lý nội dung, khóa học, tài liệu và các báo cáo hoạt động.</p>
            </div>

            <div className="permission-item">
              <h4 className="permission-name">User / Student</h4>
              <p className="permission-desc">Truy cập tài liệu, tham gia học tập và thảo luận trên nền tảng.</p>
            </div>
          </div>

          <div className="image-card">
            <img 
              src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60" 
              alt="Data Analysis" 
              className="card-image"
            />
            <div className="image-overlay">
              <p>"Bảo mật và hiệu suất là cốt lõi của AI Study Hub."</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminCreateAccount;