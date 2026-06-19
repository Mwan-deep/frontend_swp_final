import React, { useState } from 'react';
import ReportStats from '../reportManagement/components/ReportStats/ReportStats';
import ReportTable from '../reportManagement/components/ReportTable/ReportTable';
import { Search, Filter } from 'lucide-react';
import './ReportManagement.css';

const ReportManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');

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
          <button className="btn-filter">
            <Filter size={16} />
            Filter
          </button>
        </div>
      </div>

      <ReportStats />
      <ReportTable searchTerm={searchTerm} />
    </>
  );
};

export default ReportManagement;
