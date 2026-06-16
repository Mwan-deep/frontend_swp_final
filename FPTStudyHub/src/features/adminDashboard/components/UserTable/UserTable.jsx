import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ChevronDown, Download, Edit2 } from 'lucide-react';
import Pagination from '../../../../shared/components/Pagination/Pagination';
import './UserTable.css';

const MOCK_USERS = [
  {
    id: 1,
    name: 'Sarah Jenkins',
    email: 's.jenkins@fpt.edu.vn',
    userId: 'SE140293',
    role: 'Student',
    status: 'Active',
    date: 'Oct 12, 2023',
    avatar: 'https://ui-avatars.com/api/?name=Sarah+Jenkins&background=random'
  },
  {
    id: 2,
    name: 'Dr. Minh Tran',
    email: 'minhtran@fpt.edu.vn',
    userId: 'FA00214',
    role: 'Faculty',
    status: 'Active',
    date: 'Jan 05, 2021',
    avatar: 'https://ui-avatars.com/api/?name=Minh+Tran&background=random'
  },
  {
    id: 3,
    name: 'Alex Rivera',
    email: 'a.rivera@fpt.edu.vn',
    userId: 'SE130988',
    role: 'Student',
    status: 'Inactive',
    date: 'Sep 10, 2022',
    avatar: 'https://ui-avatars.com/api/?name=Alex+Rivera&background=random'
  },
  {
    id: 4,
    name: 'Jordan Lee',
    email: 'jlee.admin@fpt.edu.vn',
    userId: 'AD00042',
    role: 'Admin',
    status: 'Suspended',
    date: 'Nov 22, 2019',
    avatar: 'https://ui-avatars.com/api/?name=Jordan+Lee&background=random'
  }
];

const UserTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  const getRoleBadgeClass = (role) => {
    switch (role) {
      case 'Student': return 'badge-role-student';
      case 'Faculty': return 'badge-role-faculty';
      case 'Admin': return 'badge-role-admin';
      default: return '';
    }
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'Active': return 'badge-status-active';
      case 'Inactive': return 'badge-status-inactive';
      case 'Suspended': return 'badge-status-suspended';
      default: return '';
    }
  };

  return (
    <div className="user-table-container">
      {/* Table Toolbar */}
      <div className="table-toolbar">
        <div className="table-search">
          <Search size={18} className="admin-table-search-icon" />
          <input type="text" placeholder="Search users..." />
        </div>
        <div className="table-filters">
          <button className="filter-btn">
            All Roles <ChevronDown size={16} />
          </button>
          <button className="filter-btn">
            All States <ChevronDown size={16} />
          </button>
          <button className="download-btn">
            <Download size={18} />
          </button>
        </div>
      </div>

      {/* Table Content */}
      <div className="table-wrapper">
        <table className="admin-table">
          <thead>
            <tr>
              <th className="th-checkbox">
                <input type="checkbox" />
              </th>
              <th>User</th>
              <th>User ID</th>
              <th>Role</th>
              <th>Status</th>
              <th>Registration Date</th>
              <th className="th-actions">Actions</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_USERS.map((user) => (
              <tr key={user.id}>
                <td className="td-checkbox">
                  <input type="checkbox" />
                </td>
                <td>
                  <div className="user-cell">
                    <img src={user.avatar} alt={user.name} className="user-cell-avatar" />
                    <div className="user-cell-info">
                      <p className="user-cell-name">{user.name}</p>
                      <p className="user-cell-email">{user.email}</p>
                    </div>
                  </div>
                </td>
                <td className="user-id-cell">{user.userId}</td>
                <td>
                  <span className={`admin-badge ${getRoleBadgeClass(user.role)}`}>
                    {user.role}
                  </span>
                </td>
                <td>
                  <span className={`admin-badge badge-status ${getStatusBadgeClass(user.status)}`}>
                    <span className="status-dot"></span>
                    {user.status}
                  </span>
                </td>
                <td className="date-cell">{user.date}</td>
                <td className="td-actions">
                  <button className="action-btn" onClick={() => navigate('/admin/account-details')}>
                    <Edit2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="table-footer">
        <div className="pagination-info">
          Showing <strong>1</strong> to <strong>10</strong> of <strong>12,482</strong> results
        </div>
        <div className="pagination-controls">
          <Pagination
            currentPage={currentPage}
            totalPages={1248}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
};

export default UserTable;
