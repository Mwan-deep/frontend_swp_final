import React from 'react';
import { FileText, Activity } from 'lucide-react';

const ActivityItem = ({ icon: Icon, title, time, iconBgClass }) => {
  return (
    <div className="activity-item">
      <div className={`activity-icon-wrapper ${iconBgClass}`}>
        <Icon size={16} />
      </div>
      <div className="activity-text">
        <h4 className="activity-title">{title}</h4>
        {time && <p className="activity-time">{time}</p>}
      </div>
    </div>
  );
};

// Đã thêm props { activities } để nhận dữ liệu thật từ Backend
const ActivityList = ({ activities }) => {
  return (
    <div className="dashboard-card recent-activity-card">
      <div className="card-header">
        <h2>Recent Activity</h2>
        <a href="#view-all" className="view-all-link">View All</a>
      </div>

      <div className="activity-list">
        {/* Xử lý Empty State: Khi mảng rỗng hoặc undefined */}
        {!activities || activities.length === 0 ? (
          <div className="empty-state" style={{ textAlign: 'center', padding: '2rem 0', color: '#888' }}>
            <Activity size={32} style={{ opacity: 0.5, marginBottom: '10px' }} />
            <p>Bạn chưa có hoạt động nào gần đây.<br/>Hãy bắt đầu học tập để hệ thống ghi nhận!</p>
          </div>
        ) : (
          /* Render dữ liệu thật từ Backend */
          activities.map((actText, index) => (
            <ActivityItem 
              key={index}
              icon={FileText} // Dùng icon mặc định vì Backend đang trả về String
              title={actText} // Chuỗi mô tả hoạt động
              time="Gần đây" // Tạm thời để tĩnh, sau này Backend có thể trả về DateTime
              iconBgClass="bg-light-blue"
            />
          ))
        )}
      </div>

    </div>
  );
};

export default ActivityList;