import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Edit2 } from 'lucide-react';
import Pagination from '../../../../shared/components/Pagination/Pagination';
import { mockTableUsers } from '../../../../data/mockDocuments';
import './UserTable.css';

const UserTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filterRole, setFilterRole] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const filteredUsers = mockTableUsers.filter(user => {
    const matchRole = filterRole === 'All' || user.role === filterRole;
    const matchStatus = filterStatus === 'All' || user.status === filterStatus;
    const matchSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        user.userId.toLowerCase().includes(searchTerm.toLowerCase());
    return matchRole && matchStatus && matchSearch;
  });

  const itemsPerPage = 10;
  const totalItems = filteredUsers.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
  
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentUsers = filteredUsers.slice(startIndex, endIndex);

  const handleRoleChange = (e) => {
    setFilterRole(e.target.value);
    setCurrentPage(1);
  };

  const handleStatusChange = (e) => {
    setFilterStatus(e.target.value);
    setCurrentPage(1);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const getRoleBadgeClass = (role) => {
    switch (role) {
      case 'Student': return 'badge-role-student';
      case 'Manager': return 'badge-role-faculty';
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
          <input 
            type="text" 
            placeholder="Search users..." 
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        <div className="table-filters">
          <select className="filter-btn" value={filterRole} onChange={handleRoleChange}>
            <option value="All">All Roles</option>
            <option value="Student">Student</option>
            <option value="Manager">Manager</option>
            <option value="Admin">Admin</option>
          </select>
          <select className="filter-btn" value={filterStatus} onChange={handleStatusChange}>
            <option value="All">All States</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Suspended">Suspended</option>
          </select>
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
            {currentUsers.map((user) => (
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
                  <button className="action-btn" onClick={() => navigate('/admin/account-details', { state: { userId: user.id } })}>
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
    </div>
  );
};

export default UserTable;
