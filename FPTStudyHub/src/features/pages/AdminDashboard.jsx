import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserStats from '../adminDashboard/components/UserStats/UserStats';
import UserTable from '../adminDashboard/components/UserTable/UserTable';
import { UserPlus } from 'lucide-react';
import axiosClient from '../../utils/axiosClient'; 
import './AdminDashboard.css';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // TÁCH HÀM RA ĐỂ CÓ THỂ TÁI SỬ DỤNG LẠI SAU KHI ĐỔI TRẠNG THÁI
  const fetchUsers = async () => {
    try {
      const response = await axiosClient.get('/api/account');
      const userList = response.result || [];
      setUsers(userList);
    } catch (error) {
      console.error("Lỗi tải danh sách người dùng:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">User Admin</h1>
          <p className="admin-page-subtitle">
            Manage accounts, roles, and access across the institution.
          </p>
        </div>

        <button className="btn-add-user" onClick={() => navigate('/admin/create-account')}>
          <UserPlus size={18} />
          Add New User
        </button>
      </div>

      <UserStats users={users} isLoading={isLoading} />
      
      {/* THÊM PROP onRefresh TRUYỀN XUỐNG DƯỚI */}
      <UserTable users={users} isLoading={isLoading} onRefresh={fetchUsers} />
    </>
  );
};

export default AdminDashboard;