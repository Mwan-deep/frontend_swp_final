import { FileText, UploadCloud, Award } from 'lucide-react';

const activities = [
  { id: 1, title: 'Viewed Machine Learning Basics.pdf', time: '2 hours ago', type: 'view', icon: <FileText size={20} />, color: 'bg-blue-50 text-blue-500' },
  { id: 2, title: 'Uploaded Chapter 4 Notes.docx', time: 'Yesterday', type: 'upload', icon: <UploadCloud size={20} />, color: 'bg-orange-50 text-orange-500' },
  { id: 3, title: 'Completed Data Structures Quiz', time: 'Oct 22', type: 'quiz', icon: <Award size={20} />, color: 'bg-red-50 text-red-500' },
];

const ActivityList = () => {
  return (
    <div className="space-y-5">
      {activities.map((activity) => (
        <div key={activity.id} className="flex items-start gap-4 group cursor-pointer">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${activity.color} group-hover:scale-105 transition-transform`}>
            {activity.icon}
          </div>
          <div>
            <p className="text-sm font-medium text-gray-800 group-hover:text-orange-500 transition-colors">{activity.title}</p>
            <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ActivityList;