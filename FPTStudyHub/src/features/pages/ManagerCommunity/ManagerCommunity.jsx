import React, { useState } from 'react';
import { Search, Bell, Filter, Award, Download, Eye, TrendingUp, TrendingDown, Calendar } from 'lucide-react';
import { topDownloads, topViews, hallOfFame } from '../../../data/mockDocuments';
import './ManagerCommunity.css';

const ManagerCommunity = () => {
  return (
    <div className="manager-community">
      <div className="community-content">
        <div className="community-top-section">
          <div className="community-intro">
            <h1 className="community-title">
              <Award size={28} className="title-icon" /> Bảng Vinh Danh Người Đóng Góp
            </h1>
            <p className="community-subtitle">
              Tôn vinh những cá nhân xuất sắc đã có những đóng góp tích cực cho cộng đồng học thuật FPT Study Hub trong tháng qua.
            </p>
            <button className="btn-export-history">Xuất Lịch sử</button>
          </div>

          <div className="champion-card">
            <div className="champion-badge-bg"></div>
            <div className="champion-content">
              <img src="https://ui-avatars.com/api/?name=Le+Minh+Tuan&background=random" alt="Champion" className="champion-avatar" />
              <div className="champion-info">
                <span className="champion-label">CHAMPION OF DEC</span>
                <h3 className="champion-name">Lê Minh Tuấn</h3>
                <div className="champion-stats">
                  <div>
                    <strong>124</strong>
                    <span>DOCUMENTS</span>
                  </div>
                  <div>
                    <strong>45.2K</strong>
                    <span>TOTAL VIEWS</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="section-title">
          <Download size={18} /> Top Downloads theo tháng
        </div>

        <div className="top-downloads-podium">
          <div className="podium-card silver">
            <img src={topDownloads[1].avatar} alt={topDownloads[1].name} className="podium-avatar" />
            <div className="podium-rank">2</div>
            <h4>{topDownloads[1].name}</h4>
            <p>{topDownloads[1].downloads.toLocaleString()} Downloads</p>
            <span className="badge-silver">{topDownloads[1].badge}</span>
          </div>

          <div className="podium-card gold">
            <img src={topDownloads[0].avatar} alt={topDownloads[0].name} className="podium-avatar" />
            <div className="podium-rank">1</div>
            <h4>{topDownloads[0].name}</h4>
            <p>{topDownloads[0].downloads.toLocaleString()} Downloads</p>
            <span className="badge-gold">{topDownloads[0].badge}</span>
          </div>

          <div className="podium-card bronze">
            <img src={topDownloads[2].avatar} alt={topDownloads[2].name} className="podium-avatar" />
            <div className="podium-rank">3</div>
            <h4>{topDownloads[2].name}</h4>
            <p>{topDownloads[2].downloads.toLocaleString()} Downloads</p>
            <span className="badge-bronze">{topDownloads[2].badge}</span>
          </div>
        </div>

        <table className="community-table">
          <thead>
            <tr>
              <th>HẠNG</th>
              <th>CÁ NHÂN</th>
              <th>TÀI LIỆU</th>
              <th>LƯỢT TẢI</th>
              <th>HUY HIỆU</th>
            </tr>
          </thead>
          <tbody>
            {topDownloads.slice(3).map(user => (
              <tr key={user.id}>
                <td className="rank-cell">#{user.id}</td>
                <td className="user-cell">
                  <img src={user.avatar} alt={user.name} />
                  <span>{user.name}</span>
                </td>
                <td>{user.docs}</td>
                <td><strong>{user.downloads.toLocaleString()}</strong></td>
                <td><span className="table-badge">{user.badge}</span></td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="section-title-row">
          <div className="section-title">
            <TrendingUp size={18} /> Top lượt xem cộng đồng
          </div>
          <span className="view-all">Xem tất cả</span>
        </div>

        <table className="community-table">
          <thead>
            <tr>
              <th>RANK</th>
              <th>CONTRIBUTOR</th>
              <th>TÀI LIỆU</th>
              <th>TỔNG VIEW</th>
              <th>XU HƯỚNG</th>
              <th>BADGES</th>
            </tr>
          </thead>
          <tbody>
            {topViews.map(user => (
              <tr key={user.id}>
                <td className="rank-cell bold">{user.id}</td>
                <td className="user-cell">
                  <img src={user.avatar} alt={user.name} />
                  <span>{user.name}</span>
                </td>
                <td>{user.docs}</td>
                <td className="view-cell"><Eye size={16} /> <strong>{user.views.toLocaleString()}</strong></td>
                <td className={user.trendUp ? "trend-up" : "trend-down"}>
                  {user.trendUp ? <TrendingUp size={14} /> : <TrendingDown size={14} />} {user.trend}
                </td>
                <td><span className="table-badge highlight">{user.badge}</span></td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="hall-of-fame-section">
          <div className="hall-of-fame-header">
            <div className="section-title">
              <Award size={18} /> Hall of Fame
            </div>
            <div className="hall-of-fame-filters">
              <select><option>Năm 2024</option></select>
              <select><option>Tháng 12</option></select>
              <select><option>Tất cả hạng mục</option></select>
              <div className="search-mini">
                <Search size={14} />
                <input type="text" placeholder="Tìm tên vinh danh..." />
              </div>
            </div>
          </div>

          <table className="community-table">
            <thead>
              <tr>
                <th>Tháng</th>
                <th>Người đạt giải</th>
                <th>Hạng mục</th>
                <th>Giá trị</th>
                <th>Huy hiệu</th>
              </tr>
            </thead>
            <tbody>
              {hallOfFame.map(item => (
                <tr key={item.id}>
                  <td className="bold">{item.month}</td>
                  <td className="user-cell">
                    <img src={item.avatar} alt={item.name} />
                    <span>{item.name}</span>
                  </td>
                  <td>{item.category}</td>
                  <td className="bold">{item.value}</td>
                  <td>
                    <span className="gold-medal"><Award size={16} /> {item.badge}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManagerCommunity;
