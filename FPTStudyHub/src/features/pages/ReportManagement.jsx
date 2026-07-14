import React, { useState, useEffect } from 'react';
import ReportStats from '../reportManagement/components/ReportStats/ReportStats';
import ReportTable from '../reportManagement/components/ReportTable/ReportTable';
import { Search, Filter } from 'lucide-react';
import axiosClient from '../../utils/axiosClient';
import './ReportManagement.css';

const ReportManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  
  // STATE LƯU DỮ LIỆU BÁO CÁO TỪ BACKEND
  const [reports, setReports] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // GỌI API LẤY TẤT CẢ BÁO CÁO CỦA HỆ THỐNG
  useEffect(() => {
    const fetchReports = async () => {
      try {
        setIsLoading(true);
        const response = await axiosClient.get('/api/reports');
        // Tuỳ thuộc vào cách gói dữ liệu ApiResponse của Backend
        const data = response.result || response; 
        setReports(data || []);
      } catch (error) {
        console.error("Lỗi khi tải danh sách báo cáo:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReports();
  }, []);

  return (
    <>
      <div className="admin-page-header report-page-header">
        <div>
          <h1 className="admin-page-title">Quản lý Báo cáo (Report Management)</h1>
          <p className="admin-page-subtitle">
            Xem xét và xử lý các nội dung vi phạm do người dùng báo cáo.
          </p>
        </div>

        <div className="report-header-actions">
          <div className="report-search-wrapper">
            <Search size={18} className="report-search-icon" />
            <input
              type="text"
              placeholder="Tìm theo ID báo cáo hoặc tên..."
              className="report-search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Truyền dữ liệu báo cáo xuống cho Component Thống kê */}
      <ReportStats reports={reports} isLoading={isLoading} />

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '16px' }}>
        <div className="filter-dropdown-container">
          <Filter size={16} className="filter-dropdown-icon" />
          <select
            className="btn-filter select-filter-with-icon"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">Tất cả trạng thái</option>
            <option value="PENDING">Chờ xử lý (Pending)</option>
            <option value="UNDER_REVIEW">Đang điều tra (Under Review)</option>
            <option value="RESOLVED">Đã giải quyết (Resolved)</option>
          </select>
        </div>
      </div>

      {/* Truyền dữ liệu và bộ lọc xuống cho Component Bảng danh sách */}
      <ReportTable 
        reports={reports} 
        isLoading={isLoading}
        searchTerm={searchTerm} 
        statusFilter={statusFilter} 
      />
    </>
  );
};

export default ReportManagement;