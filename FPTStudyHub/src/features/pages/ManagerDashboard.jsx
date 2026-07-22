import React, { useState, useEffect } from 'react';
import { User, FileText, Eye, Star, Trash2, Search, Filter } from 'lucide-react';
import Pagination from '../../shared/components/Pagination/Pagination';
import { useNavigate } from 'react-router-dom';
import axiosClient from '../../utils/axiosClient';
import { getDirectImageUrl } from '../../utils/imageHelper'; // Đảm bảo ảnh Manager cũng hiển thị tốt
import './ManagerDashboard.css';

const ManagerDashboard = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const navigate = useNavigate();

  // STATES LƯU DỮ LIỆU
  const [users, setUsers] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]); // Chứa dữ liệu bảng xếp hạng có điểm số
  const [isLoading, setIsLoading] = useState(true);

  // STATES TÌM KIẾM & BỘ LỌC
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUploader, setSelectedUploader] = useState('');

  // GỌI CÁC API ĐỒNG THỜI KHI VÀO TRANG
  const fetchDashboardData = async () => {
    try {
      setIsLoading(true);
      
      // Gọi cả 3 API cùng lúc để tăng tốc độ load
      const [usersRes, docsRes, lbRes] = await Promise.all([
        axiosClient.get('/api/account').catch(() => ({ result: [] })),
        axiosClient.get('/api/v1/documents/all').catch(() => ({ result: [] })),
        axiosClient.get('/api/v1/community/leaderboard?filter=all').catch(() => ({ result: [] }))
      ]);

      // 1. Set Users (Cho bộ lọc và Manager)
      setUsers(usersRes.result || []);

      // 2. Set Documents (Sắp xếp mới nhất lên đầu)
      const docsList = Array.isArray(docsRes) ? docsRes : (docsRes?.result || []);
      setDocuments(docsList.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));

      // 3. Set Leaderboard (Lấy dữ liệu để render Top 5)
      const lbData = lbRes.result || lbRes.data || lbRes || [];
      setLeaderboard(Array.isArray(lbData) ? lbData : []);

    } catch (error) {
      console.error("Lỗi khi tải dữ liệu Manager Dashboard:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  // HÀM XÓA TÀI LIỆU DÀNH CHO MANAGER
  const handleDeleteDocument = async (id, title) => {
    if (window.confirm(`Bạn có chắc chắn muốn XÓA VĨNH VIỄN tài liệu "${title}" không? Hành động này sẽ xóa cả file trên Google Drive.`)) {
      try {
        await axiosClient.delete(`/api/v1/documents/${id}`);
        alert("Đã xóa tài liệu thành công!");
        setDocuments(prevDocs => prevDocs.filter(doc => doc.materialId !== id));
      } catch (error) {
        alert("Lỗi khi xóa tài liệu: " + (error.response?.data || error.message));
      }
    }
  };

  // =========================================================
  // XỬ LÝ LỌC & PHÂN TRANG (SEARCH & FILTER)
  // =========================================================
  const filteredDocuments = documents.filter(doc => {
    const titleMatch = (doc.title || '').toLowerCase().includes(searchTerm.toLowerCase());
    const uploaderMatch = selectedUploader === '' || doc.account?.userName === selectedUploader;
    return titleMatch && uploaderMatch;
  });

  const totalPages = Math.ceil(filteredDocuments.length / itemsPerPage) || 1;
  const currentTableData = filteredDocuments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // =========================================================
  // XỬ LÝ DỮ LIỆU CÁC BẢNG XẾP HẠNG
  // =========================================================
  // Lấy chính xác 5 người cao điểm nhất từ Leaderboard DTO
  const topContributors = leaderboard.slice(0, 5); 
  
  // Lọc ra các Manager
  const topManagers = users.filter(u => u.roles?.some(role => role.name === 'MANAGER' || role.name === 'ADMIN')).slice(0, 3);

  const getVisibilityClass = (visibility) => {
    if (!visibility) return 'status-pending';
    switch (visibility.toUpperCase()) {
      case 'PUBLIC': return 'status-analyzing'; 
      case 'PRIVATE': return 'status-pending'; 
      default: return '';
    }
  };

  if (isLoading) {
    return <div style={{ padding: '50px', textAlign: 'center' }}>Loading management system...</div>;
  }

  return (
    <div className="manager-dashboard">
      <div className="dashboard-left-column">
        <div className="dashboard-header">
          <h1 className="dashboard-title">Welcome back, Manager</h1>
          <p className="dashboard-subtitle">
            Your system is running smoothly. Below is the document library that needs review.
          </p>
        </div>

        <div className="dashboard-top-cards">
          <div className="stat-card">
            <div className="stat-card-header">
              <div className="stat-icon-wrapper user-icon">
                <User size={20} />
              </div>
              <span className="stat-change positive">System</span>
            </div>
            <p className="stat-label">Total Users</p>
            <h2 className="stat-value">{users.length.toLocaleString()}</h2>
          </div>

          <div className="stat-card">
            <div className="stat-card-header">
              <div className="stat-icon-wrapper doc-icon">
                <FileText size={20} />
              </div>
              <span className="stat-change neutral">System</span>
            </div>
            <p className="stat-label">Total Documents</p>
            <h2 className="stat-value">{documents.length.toLocaleString()}</h2>
          </div>
        </div>

        {/* --- KHO TÀI LIỆU HỆ THỐNG --- */}
        <div className="report-queue-section">
          <div className="report-queue-header" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '16px' }}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
              <h3>System Document Library</h3>
              <div className="report-queue-actions">
                <button className="btn-filter" onClick={fetchDashboardData}>Refresh</button>
                <button className="btn-export">Export CSV</button>
              </div>
            </div>

            {/* BỘ LỌC TÌM KIẾM & NGƯỜI ĐĂNG */}
            <div style={{ display: 'flex', gap: '16px', width: '100%', paddingBottom: '8px' }}>
              <div style={{ flex: 1, position: 'relative' }}>
                <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#64748B' }}/>
                <input 
                    type="text" 
                    placeholder="Search by document name..." 
                    value={searchTerm}
                    onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                    style={{ width: '100%', padding: '10px 12px 10px 38px', borderRadius: '8px', border: '1px solid #E2E8F0', outline: 'none' }}
                />
              </div>
              
              <div style={{ width: '280px', position: 'relative' }}>
                <Filter size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#64748B', pointerEvents: 'none' }}/>
                <select 
                    value={selectedUploader} 
                    onChange={(e) => { setSelectedUploader(e.target.value); setCurrentPage(1); }}
                    style={{ width: '100%', padding: '10px 12px 10px 38px', borderRadius: '8px', border: '1px solid #E2E8F0', backgroundColor: 'white', cursor: 'pointer', outline: 'none' }}
                >
                    <option value="">All Uploaders</option>
                    {users.map(u => (
                        <option key={u.accountId} value={u.userName}>
                            {u.fullName ? `${u.fullName} (${u.userName})` : u.userName}
                        </option>
                    ))}
                </select>
              </div>
            </div>

          </div>

          <div className="table-responsive">
            <table className="report-table">
              <thead>
                <tr>
                  <th>Document Name</th>
                  <th>Uploader</th>
                  <th>Views</th>
                  <th>Downloads</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentTableData.length === 0 ? (
                  <tr>
                    <td colSpan="6" style={{ textAlign: 'center', padding: '30px', color: '#64748B' }}>
                      No documents found matching the filter criteria.
                    </td>
                  </tr>
                ) : (
                  currentTableData.map((row) => (
                    <tr key={row.materialId}>
                      <td className="doc-name" title={row.title}>
                        <FileText size={16} className="doc-type-icon" />
                        {row.title?.length > 30 ? row.title.substring(0, 30) + '...' : row.title}
                      </td>
                      <td>{row.account?.userName || 'Unknown'}</td>
                      <td>{row.viewCount || 0}</td>
                      <td>{row.downloadCount || 0}</td>
                      <td>
                        <span className={`status-badge ${getVisibilityClass(row.visibility)}`}>
                          {row.visibility || 'PRIVATE'}
                        </span>
                      </td>
                      <td>
                        <div className="action-buttons">
                          <button 
                            className="action-btn" 
                            title="Xem tài liệu"
                            onClick={() => navigate(`/documents/${row.materialId}`)}
                          >
                            <Eye size={18} />
                          </button>
                          
                          <button 
                            className="action-btn check" 
                            title="Xóa tài liệu"
                            style={{ color: '#ef4444', backgroundColor: '#fef2f2' }}
                            onClick={() => handleDeleteDocument(row.materialId, row.title)}
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="pagination-wrapper">
            <span className="pagination-info">
              Displaying {currentTableData.length} of {filteredDocuments.length} documents
            </span>
            {totalPages > 1 && (
              <Pagination 
                currentPage={currentPage} 
                totalPages={totalPages} 
                onPageChange={setCurrentPage} 
              />
            )}
          </div>
        </div>
      </div>

      <div className="dashboard-right-column">
        {/* --- BẢNG XẾP HẠNG NHANH --- */}
        <div className="leaderboard-section">
          <div className="leaderboard-header">
            <h3>Quick Leaderboard</h3>
            <div className="star-icon-wrapper">
              <Star size={16} />
            </div>
          </div>

          <div className="leaderboard-list">
            <p className="leaderboard-subtitle">Top 5 Contributors</p>
            {topContributors.map((user, index) => (
              <div key={user.accountId} className="leaderboard-item" style={{ alignItems: 'center' }}>
                <div className="user-rank">{index + 1}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1, overflow: 'hidden' }}>
                    <img 
                      src={getDirectImageUrl(user.avatar)} 
                      alt={user.name} 
                      style={{ width: '28px', height: '28px', borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }}
                      onError={(e) => { e.target.src = `https://ui-avatars.com/api/?name=${user.name}&background=random` }} 
                    />
                    <span className="user-name" title={user.name} style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {user.name}
                    </span>
                </div>
                <span className="user-points" style={{ color: '#F97316', fontWeight: 'bold', fontSize: '13px' }}>
                  {user.engagementScore} pts
                </span>
              </div>
            ))}
            {topContributors.length === 0 && <span style={{ fontSize: '13px', color: '#666' }}>Updating leaderboard...</span>}
          </div>

          <div className="leaderboard-managers mt-4">
            <p className="leaderboard-subtitle">Management Team (Managers)</p>
            <div className="manager-avatars">
              {topManagers.map((manager, index) => (
                <div key={manager.accountId} className="manager-avatar-wrapper" title={manager.fullName || manager.userName}>
                  <img 
                    src={manager.avatarUrl ? getDirectImageUrl(manager.avatarUrl) : `https://ui-avatars.com/api/?name=${manager.userName}&background=random`} 
                    alt={manager.userName} 
                    className="manager-avatar" 
                    onError={(e) => { e.target.src = `https://ui-avatars.com/api/?name=${manager.userName}&background=random` }}
                  />
                  <span className="manager-rank-badge">#{index + 1} {manager.userName}</span>
                </div>
              ))}
              {topManagers.length === 0 && <span style={{ fontSize: '13px', color: '#666' }}>No managers found.</span>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagerDashboard;