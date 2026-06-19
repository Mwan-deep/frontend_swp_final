import { FileText, Upload, Heart, MessageSquare, HelpCircle } from 'lucide-react';

export const mockDocuments = [
  {
    id: 1,
    title: "Advanced Calculus Notes - Unit 3: Multiple Integrals",
    author: "Dr. Eleanor Vance",
    date: "2 days ago",
    format: "PDF",
    image: "https://images.unsplash.com/photo-1453733190148-c44698c26578?w=400&auto=format&fit=crop&q=80",
    views: "1.2k",
    downloads: "450"
  },
  {
    id: 2,
    title: "Intro to Python Programming: Basics and Syntax",
    author: "Marcus Chen",
    date: "1 week ago",
    format: "DOCX",
    image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=400&auto=format&fit=crop&q=80",
    views: "3.4k",
    downloads: "1.1k"
  },
  {
    id: 3,
    title: "Macroeconomics Lecture 04: Inflation and Monetary Policy",
    author: "Prof. Sarah Jenkins",
    date: "3 weeks ago",
    format: "DOCX",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&auto=format&fit=crop&q=80",
    views: "890",
    downloads: "120"
  },
  {
    id: 4,
    title: "Web Development Project Boilerplate (React + Node.js)",
    author: "FPT IT Dept",
    date: "1 month ago",
    format: "ZIP",
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&auto=format&fit=crop&q=80",
    views: "5.1k",
    downloads: "2.8k"
  },
  {
    id: 5,
    title: "Web Development Project Boilerplate (React + Node.js)",
    author: "FPT IT Dept",
    date: "1 month ago",
    format: "ZIP",
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&auto=format&fit=crop&q=80",
    views: "5.1k",
    downloads: "2.9k"
  },
  {
    id: 6,
    title: "Macroeconomics Lecture 04: Inflation and Monetary Policy",
    author: "Prof. Sarah Jenkins",
    date: "3 weeks ago",
    format: "DOCX",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&auto=format&fit=crop&q=80",
    views: "1000",
    downloads: "120"
  }
];

export const dashboardStats = [
  { icon: FileText, value: "24", label: "Total Documents", iconBgClass: "bg-light-blue" },
  { icon: Upload, value: "12", label: "Uploaded", iconBgClass: "bg-light-orange" },
  { icon: Heart, value: "5", label: "Favorites", iconBgClass: "bg-light-red" },
  { icon: MessageSquare, value: "42", label: "AI Conversations", iconBgClass: "bg-light-blue" },
  { icon: HelpCircle, value: "15", label: "Quizzes Done", iconBgClass: "bg-light-orange" }
];
export const mockUsers = [
  {
    email: "student@fpt.edu.vn",
    password: "password123",
    role: "Student",
    fullName: "FPT Student",
    bio: "Computer Science student focusing on AI and Machine Learning.",
    avatar: "https://ui-avatars.com/api/?name=FPT+Student&background=random",
    twoFactorEnabled: false,
    notifications: {
      loginAlerts: true,
      passwordChange: true
    }
  },
  {
    email: "son@gmail.com",
    password: "123",
    role: "Student",
    fullName: "Son Quang",
    bio: "Passionate about web development.",
    avatar: "https://ui-avatars.com/api/?name=Son+Quang&background=random",
    twoFactorEnabled: false,
    notifications: {
      loginAlerts: true,
      passwordChange: false
    }
  },
  {
    email: "admin@gmail.com",
    password: "admin",
    role: "Admin",
    fullName: "Alex Johnson",
    bio: "System Administrator. Always learning, always building.",
    avatar: "https://ui-avatars.com/api/?name=Alex+Johnson&background=random",
    twoFactorEnabled: true,
    notifications: {
      loginAlerts: true,
      passwordChange: true
    }
  }
];

export const mockTableUsers = [
  {
    id: 1,
    name: "Sarah Jenkins",
    email: "sarah.jenkins@fpt.edu.vn",
    userId: "SE100001",
    role: "Student",
    status: "Active",
    date: "Oct 15, 2023",
    avatar: "https://ui-avatars.com/api/?name=Sarah+Jenkins&background=random"
  },
  {
    id: 2,
    name: "Minh Tran",
    email: "minh.tran@fpt.edu.vn",
    userId: "SE100002",
    role: "Student",
    status: "Active",
    date: "Sep 12, 2023",
    avatar: "https://ui-avatars.com/api/?name=Minh+Tran&background=random"
  },
  {
    id: 3,
    name: "Alex Rivera",
    email: "alex.rivera@fpt.edu.vn",
    userId: "SE100003",
    role: "Student",
    status: "Suspended",
    date: "Aug 05, 2023",
    avatar: "https://ui-avatars.com/api/?name=Alex+Rivera&background=random"
  },
  {
    id: 4,
    name: "Jordan Lee",
    email: "jordan.lee@fpt.edu.vn",
    userId: "MA200001",
    role: "Manager",
    status: "Active",
    date: "Jul 22, 2023",
    avatar: "https://ui-avatars.com/api/?name=Jordan+Lee&background=random"
  },
  {
    id: 5,
    name: "Emma Smith",
    email: "emma.smith@fpt.edu.vn",
    userId: "MA200002",
    role: "Manager",
    status: "Inactive",
    date: "Jun 18, 2023",
    avatar: "https://ui-avatars.com/api/?name=Emma+Smith&background=random"
  },
  {
    id: 6,
    name: "Liam Johnson",
    email: "liam.johnson@fpt.edu.vn",
    userId: "MA200003",
    role: "Manager",
    status: "Active",
    date: "May 30, 2023",
    avatar: "https://ui-avatars.com/api/?name=Liam+Johnson&background=random"
  },
  {
    id: 7,
    name: "Noah Williams",
    email: "noah.williams@fpt.edu.vn",
    userId: "AD300001",
    role: "Admin",
    status: "Active",
    date: "Apr 14, 2023",
    avatar: "https://ui-avatars.com/api/?name=Noah+Williams&background=random"
  },
  {
    id: 8,
    name: "Olivia Brown",
    email: "olivia.brown@fpt.edu.vn",
    userId: "AD300002",
    role: "Admin",
    status: "Active",
    date: "Mar 10, 2023",
    avatar: "https://ui-avatars.com/api/?name=Olivia+Brown&background=random"
  },
  {
    id: 9,
    name: "William Jones",
    email: "william.jones@fpt.edu.vn",
    userId: "AD300003",
    role: "Admin",
    status: "Inactive",
    date: "Feb 05, 2023",
    avatar: "https://ui-avatars.com/api/?name=William+Jones&background=random"
  }
];

export const mockReports = Array.from({ length: 50 }, (_, i) => {
  const reasons = ['Spam', 'Harassment', 'Inappropriate Content'];
  const statuses = ['Pending', 'Under Review', 'Resolved'];
  const types = ['user', 'document'];
  const status = statuses[i % statuses.length];
  
  const reporterUser = mockTableUsers[i % mockTableUsers.length];
  const reportedUser = mockTableUsers[(i + 13) % mockTableUsers.length];
  const type = types[i % types.length];
  
  return {
    id: `#REP-${9000 - i}`,
    reporter: { 
      name: reporterUser.name, 
      handle: `@${reporterUser.name.split(' ')[0].toLowerCase()}`, 
      email: reporterUser.email,
      userId: reporterUser.userId,
      avatar: reporterUser.avatar 
    },
    reported: { 
      name: type === 'user' ? reportedUser.name : `Doc Share #${100 + i}`, 
      handle: type === 'user' ? `@${reportedUser.name.split(' ')[0].toLowerCase()}` : `DOC-${8000+i}`, 
      email: type === 'user' ? reportedUser.email : '',
      userId: type === 'user' ? reportedUser.userId : `DOC-${8000+i}`,
      type: type, 
      avatar: type === 'user' ? reportedUser.avatar : `https://ui-avatars.com/api/?name=Document&background=random` 
    },
    reason: reasons[i % reasons.length],
    date: `Oct ${24 - (i % 10)}, 2023\n10:45 AM`,
    status: status,
    details: `This is an auto-generated report for ${reasons[i % reasons.length]}. Please review the attached evidence and take appropriate moderation action.`
  };
});

export const adminSettings = {
  get profile() {
    const admin = mockUsers.find(u => u.role === 'Admin') || mockUsers[2];
    return {
      fullName: admin.fullName,
      email: admin.email,
      bio: admin.bio,
      role: admin.role,
      avatar: admin.avatar
    };
  },
  set profile(newProfile) {
    const admin = mockUsers.find(u => u.role === 'Admin') || mockUsers[2];
    Object.assign(admin, newProfile);
  },
  get security() {
    const admin = mockUsers.find(u => u.role === 'Admin') || mockUsers[2];
    return {
      twoFactorEnabled: admin.twoFactorEnabled,
      notifications: admin.notifications
    };
  },
  set security(newSecurity) {
    const admin = mockUsers.find(u => u.role === 'Admin') || mockUsers[2];
    admin.twoFactorEnabled = newSecurity.twoFactorEnabled;
    admin.notifications = { ...newSecurity.notifications };
  }
};
