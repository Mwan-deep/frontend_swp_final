import React from 'react';
import UserStats from '../adminDashboard/components/UserStats/UserStats';
import UserTable from '../adminDashboard/components/UserTable/UserTable';
import { UserPlus } from 'lucide-react';
import './AdminDashboard.css';

const AdminDashboard = () => {
  return (
    <>
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">User Admin</h1>
          <p className="admin-page-subtitle">
            Manage accounts, roles, and access across the institution.
          </p>
        </div>

        <button className="btn-add-user">
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
