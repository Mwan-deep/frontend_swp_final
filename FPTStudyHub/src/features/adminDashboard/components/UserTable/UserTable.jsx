import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Edit2, Trash2 } from 'lucide-react'; // ĐÃ THÊM Trash2
import Pagination from '../../../../shared/components/Pagination/Pagination';
import axiosClient from '../../../../utils/axiosClient';
import { getDirectImageUrl } from '../../../../utils/imageHelper';
import './UserTable.css';

const getMainRole = (roles) => {
  if (!roles || roles.length === 0) return 'USER';
  return roles[0].roleId || 'USER'; 
};

const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  return date.toLocaleDateString('vi-VN');
};

const UserTable = ({ users, isLoading, onRefresh }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filterRole, setFilterRole] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  // BỘ LỌC TÌM KIẾM
  const filteredUsers = users.filter(user => {
    const userRole = getMainRole(user.roles);
    const matchRole = filterRole === 'All' || userRole.toUpperCase() === filterRole.toUpperCase();
    const matchStatus = filterStatus === 'All' || (user.accountStatus || '').toUpperCase() === filterStatus.toUpperCase();
    
    const term = searchTerm.toLowerCase();
    const matchSearch = (user.fullName || '').toLowerCase().includes(term) || 
                        (user.email || '').toLowerCase().includes(term) ||
                        (user.userName || '').toLowerCase().includes(term);
    return matchRole && matchStatus && matchSearch;
  });

  const itemsPerPage = 10;
  const totalItems = filteredUsers.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentUsers = filteredUsers.slice(startIndex, endIndex);

  // HÀM XÓA CỨNG (HARD DELETE) 
  const handleDeleteUser = async (user) => {
    if (getMainRole(user.roles) === 'ADMIN') {
      alert("Lỗi: Không thể xóa tài khoản Quản trị viên!");
      return;
    }

    const targetId = user.accountId || user.id;
    if (window.confirm(`⚠️ CẢNH BÁO NGUY HIỂM:\nBạn sắp xóa vĩnh viễn tài khoản [${user.userName}] và TOÀN BỘ dữ liệu liên quan (tài liệu, lịch sử chat, ...).\n\nHành động này KHÔNG THỂ HOÀN TÁC. Bạn chắc chắn chứ?`)) {
      try {
        await axiosClient.delete(`/api/account/${targetId}`);
        alert("Đã xóa vĩnh viễn tài khoản thành công!");
        onRefresh();
      } catch (error) {
        alert(`❌ Lỗi từ Server: ${error.response?.data?.message || 'Không thể xóa tài khoản!'}`);
      }
    }
  };

  // HÀM GỌI API ĐỔI TRẠNG THÁI
  const handleToggleStatus = async (user) => {
    if (getMainRole(user.roles) === 'ADMIN') {
      alert("Lỗi: Không thể khóa tài khoản Quản trị viên!");
      return;
    }

    const targetId = user.accountId || user.id; 
    const action = user.accountStatus === 'ACTIVE' ? 'KHÓA (Inactive)' : 'MỞ KHÓA (Active)';
    if (!window.confirm(`Bạn có chắc chắn muốn ${action} tài khoản [${user.userName}] không?`)) return;

    try {
      await axiosClient.put(`/api/account/${targetId}/status`);
      onRefresh(); 
    } catch (error) {
      alert(`❌ Lỗi từ Server: ${error.response?.data?.message || 'Kiểm tra lại quyền Admin hoặc API endpoint!'}`);
    }
  };

  const getRoleBadgeClass = (role) => {
    switch (role.toUpperCase()) {
      case 'USER': return 'badge-role-student';
      case 'MANAGER': return 'badge-role-faculty';
      case 'ADMIN': return 'badge-role-admin';
      default: return '';
    }
  };

  const getStatusBadgeClass = (status) => {
    switch ((status || '').toUpperCase()) {
      case 'ACTIVE': return 'badge-status-active';
      case 'INACTIVE': return 'badge-status-inactive';
      case 'SUSPENDED': return 'badge-status-suspended';
      default: return '';
    }
  };

  return (
    <div className="user-table-container">
      {/* Toolbar */}
      <div className="table-toolbar">
        <div className="table-search">
          <Search size={18} className="admin-table-search-icon" />
          <input 
            type="text" 
            placeholder="Search Name, Email, Username..." 
            value={searchTerm}
            onChange={(e) => {setSearchTerm(e.target.value); setCurrentPage(1);}}
          />
        </div>
        <div className="table-filters">
          <select className="filter-btn" value={filterRole} onChange={(e) => {setFilterRole(e.target.value); setCurrentPage(1);}}>
            <option value="All">All Roles</option>
            <option value="USER">User/Student</option>
            <option value="MANAGER">Manager</option>
            <option value="ADMIN">Admin</option>
          </select>
          <select className="filter-btn" value={filterStatus} onChange={(e) => {setFilterStatus(e.target.value); setCurrentPage(1);}}>
            <option value="All">All States</option>
            <option value="ACTIVE">Active</option>
            <option value="INACTIVE">Inactive</option>
            <option value="SUSPENDED">Suspended</option>
          </select>
        </div>
      </div>

      {/* Table Content */}
      <div className="table-wrapper">
        {isLoading ? (
          <div style={{ padding: '40px', textAlign: 'center' }}>Đang tải dữ liệu từ server...</div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th className="th-checkbox"><input type="checkbox" /></th>
                <th>User</th>
                <th>Username</th>
                <th>Role</th>
                <th>Status</th>
                <th>Registration Date</th>
                <th className="th-actions">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.map((user) => {
                const isAdmin = getMainRole(user.roles) === 'ADMIN';

                return (
                  <tr key={user.accountId || user.id}>
                    <td className="td-checkbox"><input type="checkbox" /></td>
                    <td>
                      <div className="user-cell">
                        <img 
                          src={user.avatarUrl ? getDirectImageUrl(user.avatarUrl) : "https://ui-avatars.com/api/?name=" + encodeURIComponent(user.fullName || user.userName || 'User') + "&background=random"} 
                          alt={user.fullName || user.userName || 'User'} 
                          className="user-cell-avatar" 
                          referrerPolicy="no-referrer"
                          onError={(e) => {
                            e.target.src = "https://ui-avatars.com/api/?name=" + encodeURIComponent(user.fullName || user.userName || 'User') + "&background=random";
                          }}
                        />
                        <div className="user-cell-info">
                          <p className="user-cell-name">{user.fullName || 'No Name'}</p>
                          <p className="user-cell-email">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="user-id-cell">{user.userName}</td>
                    <td>
                      <span className={`admin-badge ${getRoleBadgeClass(getMainRole(user.roles))}`}>
                        {getMainRole(user.roles)}
                      </span>
                    </td>

                    {/* CỘT STATUS */}
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span className={`admin-badge badge-status ${getStatusBadgeClass(user.accountStatus)}`} style={{ minWidth: '85px', justifyContent: 'center' }}>
                          <span className="status-dot"></span>
                          {user.accountStatus || 'UNKNOWN'}
                        </span>
                        
                        {/* Ẩn công tắc đi nếu là ADMIN để tránh hiểu lầm */}
                        {!isAdmin && (
                          <div 
                            onClick={() => handleToggleStatus(user)}
                            style={{
                              width: '40px',
                              height: '22px',
                              backgroundColor: user.accountStatus === 'ACTIVE' ? '#10b981' : '#e5e7eb',
                              borderRadius: '22px',
                              position: 'relative',
                              cursor: 'pointer',
                              transition: 'background-color 0.3s ease',
                              border: user.accountStatus === 'ACTIVE' ? 'none' : '1px solid #d1d5db',
                              flexShrink: 0
                            }}
                            title="Click để Đóng/Mở tài khoản"
                          >
                            <div 
                              style={{
                                width: '18px',
                                height: '18px',
                                backgroundColor: 'white',
                                borderRadius: '50%',
                                position: 'absolute',
                                top: user.accountStatus === 'ACTIVE' ? '2px' : '1px',
                                left: user.accountStatus === 'ACTIVE' ? '20px' : '1px',
                                transition: 'left 0.3s ease',
                                boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                              }}
                            />
                          </div>
                        )}
                      </div>
                    </td>

                    <td className="date-cell">{formatDate(user.createdAt)}</td>
                    <td className="td-actions">
                      <button className="action-btn" onClick={() => navigate('/admin/account-details', { state: { userId: user.accountId || user.id } })} title="Chỉnh sửa">
                        <Edit2 size={16} />
                      </button>

                      {/* Ẩn nút xóa đi nếu là ADMIN */}
                      {!isAdmin && (
                        <button 
                          className="action-btn delete-btn" 
                          onClick={() => handleDeleteUser(user)} 
                          title="Xóa vĩnh viễn"
                          style={{ color: '#ef4444', marginLeft: '8px' }}
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
              {currentUsers.length === 0 && (
                <tr>
                  <td colSpan="7" style={{ textAlign: 'center', padding: '20px' }}>Không tìm thấy tài khoản nào!</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination Footer */}
      {!isLoading && (
        <div className="table-footer">
          <div className="pagination-info">
            Showing <strong>{totalItems === 0 ? 0 : startIndex + 1}</strong> to <strong>{Math.min(endIndex, totalItems)}</strong> of <strong>{totalItems}</strong> results
          </div>
          <div className="pagination-controls">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default UserTable;