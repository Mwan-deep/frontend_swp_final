import React from 'react';
import { FileText, Upload, Award } from 'lucide-react';

const ActivityItem = ({ icon: Icon, title, time, iconBgClass }) => {
  return (
    <div className="activity-item">
      <div className={`activity-icon-wrapper ${iconBgClass}`}>
        <Icon size={16} />
      </div>
      <div className="activity-text">
        <h4 className="activity-title">{title}</h4>
        <p className="activity-time">{time}</p>
      </div>
    </div>
  );
};

const ActivityList = () => {
  const activities = [
    { icon: FileText, title: "Viewed Machine Learning Basics.pdf", time: "2 hours ago", iconBgClass: "bg-light-blue" },
    { icon: Upload, title: "Uploaded Chapter 4 Notes.docx", time: "Yesterday", iconBgClass: "bg-light-orange" },
    { icon: Award, title: "Completed Data Structures Quiz", time: "Oct 22", iconBgClass: "bg-light-red" }
  ];

  return (
    <div className="dashboard-card recent-activity-card">
      <div className="card-header">
        <h2>Recent Activity</h2>
        <a href="#view-all" className="view-all-link">View All</a>
      </div>

      <div className="activity-list">
        {activities.map((act, index) => (
          <ActivityItem 
            key={index}
            icon={act.icon}
            title={act.title}
            time={act.time}
            iconBgClass={act.iconBgClass}
          />
        ))}
      </div>

    </div>
  );
};

export default ActivityList;