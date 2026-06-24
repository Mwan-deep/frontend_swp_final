import React from 'react';
import { useNavigate } from 'react-router-dom';
import UserStats from '../adminDashboard/components/UserStats/UserStats';
import UserTable from '../adminDashboard/components/UserTable/UserTable';
import { UserPlus } from 'lucide-react';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const navigate = useNavigate();

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

      <UserStats />
      <UserTable />
    </>
  );
};

export default AdminDashboard;
