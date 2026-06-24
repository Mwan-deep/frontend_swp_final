import React, { useState } from 'react';
import ReportStats from '../reportManagement/components/ReportStats/ReportStats';
import ReportTable from '../reportManagement/components/ReportTable/ReportTable';
import { Search, Filter } from 'lucide-react';
import './ReportManagement.css';

const ReportManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  return (
    <>
      <div className="admin-page-header report-page-header">
        <div>
          <h1 className="admin-page-title">Report Management</h1>
          <p className="admin-page-subtitle">
            Review and resolve user-submitted content flags.
          </p>
        </div>

        <div className="report-header-actions">
          <div className="report-search-wrapper">
            <Search size={18} className="report-search-icon" />
            <input 
              type="text" 
              placeholder="Search by Report ID or User..." 
              className="report-search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      <ReportStats />
      
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '16px' }}>
        <div className="filter-dropdown-container">
          <Filter size={16} className="filter-dropdown-icon" />
          <select 
            className="btn-filter select-filter-with-icon"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">Filter</option>
            <option value="Pending">Pending</option>
            <option value="Under Review">Under Review</option>
            <option value="Resolved">Resolved</option>
          </select>
        </div>
      </div>

      <ReportTable searchTerm={searchTerm} statusFilter={statusFilter} />
    </>
  );
};

export default ReportManagement;
