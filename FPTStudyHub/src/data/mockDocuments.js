import { FileText, Upload, Heart, HelpCircle, Database } from 'lucide-react';

export const mockDocuments = [
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
    title: "Database Systems - SQL Practice Exercises",
    author: "Nguyen Thanh Long",
    date: "5 days ago",
    format: "PDF",
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400",
    views: "2.6k",
    downloads: "950"
  },
  {
    id: 6,
    title: "Computer Networks Fundamentals",
    author: "James Walker",
    date: "2 weeks ago",
    format: "PDF",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400",
    views: "1.9k",
    downloads: "640"
  },
  {
    id: 7,
    title: "Java OOP Concepts and Design Patterns",
    author: "FPT Software Academy",
    date: "6 days ago",
    format: "DOCX",
    image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=400",
    views: "4.3k",
    downloads: "1.7k"
  },
  {
    id: 8,
    title: "Machine Learning Fundamentals",
    author: "Dr. Kevin Brooks",
    date: "4 days ago",
    format: "PDF",
    image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400",
    views: "6.8k",
    downloads: "3.2k"
  },
  {
    id: 9,
    title: "Artificial Intelligence Study Guide",
    author: "Sophia Kim",
    date: "1 day ago",
    format: "PDF",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400",
    views: "8.1k",
    downloads: "4.0k"
  },
  {
    id: 10,
    title: "Data Structures and Algorithms Handbook",
    author: "David Johnson",
    date: "3 days ago",
    format: "PDF",
    image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=400",
    views: "7.5k",
    downloads: "2.9k"
  },
  {
    id: 11,
    title: "Software Testing Techniques",
    author: "Lisa Brown",
    date: "2 weeks ago",
    format: "DOCX",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400",
    views: "1.4k",
    downloads: "530"
  },
  {
    id: 12,
    title: "Mobile App Development with Flutter",
    author: "Tran Minh Duc",
    date: "1 week ago",
    format: "PDF",
    image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400",
    views: "5.2k",
    downloads: "2.1k"
  },
  {
    id: 13,
    title: "Cloud Computing Essentials",
    author: "AWS Academy",
    date: "4 weeks ago",
    format: "PDF",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400",
    views: "3.8k",
    downloads: "1.5k"
  },
  {
    id: 14,
    title: "Cybersecurity and Ethical Hacking Notes",
    author: "Michael Carter",
    date: "5 days ago",
    format: "PDF",
    image: "https://images.unsplash.com/photo-1510511459019-5dda7724fd87?w=400",
    views: "6.1k",
    downloads: "2.4k"
  },
  {
    id: 15,
    title: "UI/UX Design Principles",
    author: "Emily Watson",
    date: "2 weeks ago",
    format: "PPTX",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400",
    views: "2.3k",
    downloads: "870"
  },
  {
    id: 16,
    title: "Discrete Mathematics Revision Notes",
    author: "FPT Mathematics Dept",
    date: "3 days ago",
    format: "PDF",
    image: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=400",
    views: "4.7k",
    downloads: "1.8k"
  },
  {
    id: 17,
    title: "Spring Boot REST API Development",
    author: "Tech Learning Hub",
    date: "1 week ago",
    format: "ZIP",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400",
    views: "7.2k",
    downloads: "3.5k"
  },
  {
    id: 18,
    title: "Business Analysis Fundamentals",
    author: "Rachel Green",
    date: "6 days ago",
    format: "PDF",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400",
    views: "1.8k",
    downloads: "620"
  },
  {
    id: 19,
    title: "Project Management Essentials",
    author: "John Peterson",
    date: "10 days ago",
    format: "DOCX",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400",
    views: "2.9k",
    downloads: "1.1k"
  },
  {
    id: 20,
    title: "Big Data Analytics Overview",
    author: "Data Science Center",
    date: "2 days ago",
    format: "PDF",
    image: "https://images.unsplash.com/photo-1518186233392-c232efbf2373?w=400",
    views: "4.9k",
    downloads: "2.0k"
  }
];
export const dashboardStats = [
  { icon: FileText, value: "24", label: "Total Documents", iconBgClass: "bg-light-blue" },
  { icon: Upload, value: "12", label: "Uploaded", iconBgClass: "bg-light-orange" },
  { icon: Heart, value: "5", label: "Favorites", iconBgClass: "bg-light-red" },
  { icon: Database, value: "3GB", label: "Storage Remaining", iconBgClass: "bg-light-blue" },
  { icon: HelpCircle, value: "15", label: "Quizzes Done", iconBgClass: "bg-light-orange" }
];


export const Community_data = {
  weekly: [
    { rank: 1, name: "Nguyễn Minh Anh", major: "Quản trị Kinh doanh", points: "3,450", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150", badges: ['bronze'] },
    { rank: 2, name: "Trần Thu Hà", major: "Công nghệ Thông tin", points: "3,120", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150", badges: ['gold', 'cap', 'fire'] },
    { rank: 3, name: "Lê Hoàng Nam", major: "Kỹ thuật Phần mềm", points: "2,980", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150", badges: ['silver', 'cap'] },
    { rank: 4, name: "Phạm Ngọc Linh", major: "Thiết kế Đồ họa", points: "2,450", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150", badges: ['fire'] },
    { rank: 5, name: "Võ Quốc Bảo", major: "Công nghệ Thông tin", points: "2,100", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150", badges: ['cap'] },
    { rank: 42, name: "Nguyễn Minh Phương", major: "Công nghệ Thông tin", points: "820 điểm", avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150", badges: [], currentUser: true, rankTrend: "Tăng 2 bậc tuần này", percentile: "Top 20%" }
  ],
  monthly: [
    { rank: 1, name: "Trần Thu Hà", major: "Công nghệ Thông tin", points: "12,450", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150", badges: ['gold', 'cap', 'fire'] },
    { rank: 2, name: "Lê Hoàng Nam", major: "Kỹ thuật Phần mềm", points: "11,200", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150", badges: ['silver', 'cap'] },
    { rank: 3, name: "Nguyễn Minh Anh", major: "Quản trị Kinh doanh", points: "10,850", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150", badges: ['bronze'] },
    { rank: 4, name: "Võ Quốc Bảo", major: "Công nghệ Thông tin", points: "9,420", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150", badges: ['cap'] },
    { rank: 5, name: "Phạm Ngọc Linh", major: "Thiết kế Đồ họa", points: "8,900", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150", badges: ['fire'] },
    { rank: 42, name: "Nguyễn Minh Phương", major: "Công nghệ Thông tin", points: "3,240 điểm", avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150", badges: [], currentUser: true, rankTrend: "Tăng 5 bậc tháng này", percentile: "Top 15%" }
  ],
  allTime: [
    { rank: 1, name: "Lê Hoàng Nam", major: "Kỹ thuật Phần mềm", points: "94,500", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150", badges: ['silver', 'cap'] },
    { rank: 2, name: "Trần Thu Hà", major: "Công nghệ Thông tin", points: "91,200", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150", badges: ['gold', 'cap', 'fire'] },
    { rank: 3, name: "Võ Quốc Bảo", major: "Công nghệ Thông tin", points: "85,600", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150", badges: ['cap'] },
    { rank: 4, name: "Nguyễn Minh Anh", major: "Quản trị Kinh doanh", points: "82,100", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150", badges: ['bronze'] },
    { rank: 5, name: "Phạm Ngọc Linh", major: "Thiết kế Đồ họa", points: "78,900", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150", badges: ['fire'] },
    { rank: 42, name: "Nguyễn Minh Phương", major: "Công nghệ Thông tin", points: "24,850 điểm", avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150", badges: [], currentUser: true, rankTrend: "Tăng 1 bậc tuần này", percentile: "Top 12%" }
  ]
};

export const Profile_data = {
  fullName: 'Nguyễn Minh Phương',
  email: 'minhphuong@example.com',
  bio: 'Sinh viên Công nghệ Thông tin, yêu thích lập trình web và phát triển các ứng dụng hỗ trợ học tập.',
  role: 'Sinh viên',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150'
};
export const accounts = [
  {
    account_id: 1, id: 1,
    user_name: "sarahj", userId: "SE100001",
    password_hash: "123", password: "123",
    full_name: "Sarah Jenkins", name: "Sarah Jenkins", fullName: "Sarah Jenkins",
    email: "sarah.jenkins@fpt.edu.vn",
    dob: "2001-05-14",
    gender: "Female",
    avatar_url: "https://ui-avatars.com/api/?name=Sarah+Jenkins&background=random", avatar: "https://ui-avatars.com/api/?name=Sarah+Jenkins&background=random",
    bio: "Computer Science student.",
    account_status: "Active", status: "Active",
    created_at: "2023-10-15T10:45:00Z", date: "Oct 15, 2023",
    updated_at: "2023-10-15T10:45:00Z",
    role: "Student",
    twoFactorEnabled: false,
    notifications: { loginAlerts: true, passwordChange: true }
  },
  {
    account_id: 2, id: 2,
    user_name: "minhtran", userId: "SE100002",
    password_hash: "123", password: "123",
    full_name: "Minh Tran", name: "Minh Tran", fullName: "Minh Tran",
    email: "minh.tran@fpt.edu.vn",
    dob: "2000-08-22",
    gender: "Male",
    avatar_url: "https://ui-avatars.com/api/?name=Minh+Tran&background=random", avatar: "https://ui-avatars.com/api/?name=Minh+Tran&background=random",
    bio: "Passionate about algorithms.",
    account_status: "Active", status: "Active",
    created_at: "2023-09-12T09:00:00Z", date: "Sep 12, 2023",
    updated_at: "2023-09-12T09:00:00Z",
    role: "Student",
    twoFactorEnabled: false,
    notifications: { loginAlerts: true, passwordChange: true }
  },
  {
    account_id: 3, id: 3,
    user_name: "alexr", userId: "SE100003",
    password_hash: "123", password: "123",
    full_name: "Alex Rivera", name: "Alex Rivera", fullName: "Alex Rivera",
    email: "alex.rivera@fpt.edu.vn",
    dob: "1999-11-05",
    gender: "Male",
    avatar_url: "https://ui-avatars.com/api/?name=Alex+Rivera&background=random", avatar: "https://ui-avatars.com/api/?name=Alex+Rivera&background=random",
    bio: "Focusing on embedded systems.",
    account_status: "Suspended", status: "Suspended",
    created_at: "2023-08-05T14:30:00Z", date: "Aug 05, 2023",
    updated_at: "2023-08-05T14:30:00Z",
    role: "Student",
    twoFactorEnabled: false,
    notifications: { loginAlerts: true, passwordChange: false }
  },
  {
    account_id: 4, id: 4,
    user_name: "jordanl", userId: "MA200001",
    password_hash: "123", password: "123",
    full_name: "Jordan Lee", name: "Jordan Lee", fullName: "Jordan Lee",
    email: "jordan.lee@fpt.edu.vn",
    dob: "1985-03-12",
    gender: "Male",
    avatar_url: "https://ui-avatars.com/api/?name=Jordan+Lee&background=random", avatar: "https://ui-avatars.com/api/?name=Jordan+Lee&background=random",
    bio: "Senior Content Manager.",
    account_status: "Active", status: "Active",
    created_at: "2023-07-22T08:15:00Z", date: "Jul 22, 2023",
    updated_at: "2023-07-22T08:15:00Z",
    role: "Manager",
    twoFactorEnabled: true,
    notifications: { loginAlerts: true, passwordChange: true }
  },
  {
    account_id: 5, id: 5,
    user_name: "emmas", userId: "MA200002",
    password_hash: "123", password: "123",
    full_name: "Emma Smith", name: "Emma Smith", fullName: "Emma Smith",
    email: "emma.smith@fpt.edu.vn",
    dob: "1990-07-19",
    gender: "Female",
    avatar_url: "https://ui-avatars.com/api/?name=Emma+Smith&background=random", avatar: "https://ui-avatars.com/api/?name=Emma+Smith&background=random",
    bio: "Reviewer and moderator.",
    account_status: "Inactive", status: "Inactive",
    created_at: "2023-06-18T16:45:00Z", date: "Jun 18, 2023",
    updated_at: "2023-06-18T16:45:00Z",
    role: "Manager",
    twoFactorEnabled: false,
    notifications: { loginAlerts: true, passwordChange: false }
  },
  {
    account_id: 7, id: 7,
    user_name: "noahw", userId: "AD300001",
    password_hash: "123", password: "123",
    full_name: "Noah Williams", name: "Noah Williams", fullName: "Noah Williams",
    email: "noah.williams@fpt.edu.vn",
    dob: "1982-12-01",
    gender: "Male",
    avatar_url: "https://ui-avatars.com/api/?name=Noah+Williams&background=random", avatar: "https://ui-avatars.com/api/?name=Noah+Williams&background=random",
    bio: "System Administrator.",
    account_status: "Active", status: "Active",
    created_at: "2023-04-14T11:20:00Z", date: "Apr 14, 2023",
    updated_at: "2023-04-14T11:20:00Z",
    role: "Admin",
    twoFactorEnabled: true,
    notifications: { loginAlerts: true, passwordChange: true }
  },
  // Default test users
  {
    account_id: 10, id: 10,
    user_name: "fptstudent", userId: "fptstudent",
    password_hash: "password123", password: "password123",
    full_name: "FPT Student", name: "FPT Student", fullName: "FPT Student",
    email: "student@fpt.edu.vn",
    dob: "2002-01-01",
    gender: "Other",
    avatar_url: "https://ui-avatars.com/api/?name=FPT+Student&background=random", avatar: "https://ui-avatars.com/api/?name=FPT+Student&background=random",
    bio: "Computer Science student focusing on AI and Machine Learning.",
    account_status: "Active", status: "Active",
    created_at: "2023-01-01T00:00:00Z", date: "Jan 01, 2023",
    updated_at: "2023-01-01T00:00:00Z",
    role: "Student",
    twoFactorEnabled: false,
    notifications: { loginAlerts: true, passwordChange: true }
  },
  {
    account_id: 11, id: 11,
    user_name: "sonquang", userId: "sonquang",
    password_hash: "123", password: "123",
    full_name: "Son Quang", name: "Son Quang", fullName: "Son Quang",
    email: "son@gmail.com",
    dob: "2000-05-15",
    gender: "Male",
    avatar_url: "https://ui-avatars.com/api/?name=Son+Quang&background=random", avatar: "https://ui-avatars.com/api/?name=Son+Quang&background=random",
    bio: "Passionate about web development.",
    account_status: "Active", status: "Active",
    created_at: "2023-02-10T00:00:00Z", date: "Feb 10, 2023",
    updated_at: "2023-02-10T00:00:00Z",
    role: "Student",
    twoFactorEnabled: false,
    notifications: { loginAlerts: true, passwordChange: false }
  },
  {
    account_id: 12, id: 12,
    user_name: "admin", userId: "admin",
    password_hash: "admin", password: "admin",
    full_name: "Alex Johnson", name: "Alex Johnson", fullName: "Alex Johnson",
    email: "admin@gmail.com",
    dob: "1988-08-08",
    gender: "Male",
    avatar_url: "https://ui-avatars.com/api/?name=Alex+Johnson&background=random", avatar: "https://ui-avatars.com/api/?name=Alex+Johnson&background=random",
    bio: "System Administrator. Always learning, always building.",
    account_status: "Active", status: "Active",
    created_at: "2022-05-20T00:00:00Z", date: "May 20, 2022",
    updated_at: "2022-05-20T00:00:00Z",
    role: "Admin",
    twoFactorEnabled: true,
    notifications: { loginAlerts: true, passwordChange: true }
  },
  {
    account_id: 13, id: 13,
    user_name: "manager", userId: "manager",
    password_hash: "manager", password: "manager",
    full_name: "Nguyen Van A", name: "Nguyen Van A", fullName: "Nguyen Van A",
    email: "manager@gmail.com",
    dob: "1992-04-04",
    gender: "Male",
    avatar_url: "https://ui-avatars.com/api/?name=Manager&background=random", avatar: "https://ui-avatars.com/api/?name=Manager&background=random",
    bio: "Manager. Always learning, always building.",
    account_status: "Active", status: "Active",
    created_at: "2022-11-11T00:00:00Z", date: "Nov 11, 2022",
    updated_at: "2022-11-11T00:00:00Z",
    role: "Manager",
    twoFactorEnabled: true,
    notifications: { loginAlerts: true, passwordChange: true }
  },
  {
    account_id: 14, id: 14,
    user_name: "abctest", userId: "abctest",
    password_hash: "abc@123", password: "abc@123",
    full_name: "ABC Test User", name: "ABC Test", fullName: "ABC Test",
    email: "abc@gmail.com",
    dob: "2000-01-01",
    gender: "Other",
    avatar_url: "https://ui-avatars.com/api/?name=ABC+Test&background=random", avatar: "https://ui-avatars.com/api/?name=ABC+Test&background=random",
    bio: "Test account",
    account_status: "Active", status: "Active",
    created_at: "2023-01-01T00:00:00Z", date: "Jan 01, 2023",
    updated_at: "2023-01-01T00:00:00Z",
    role: "Student",
    twoFactorEnabled: false,
    notifications: { loginAlerts: true, passwordChange: true }

  }
];
export const mockTableUsers = accounts;

export const mockReports = [
  {
    report_id: 1, id: "#REP-9001",
    material_id: 1,
    account_id: 1,
    description: "Tài liệu này vi phạm bản quyền nội dung của trường.",
    reason: "Copyright Violation", details: "Tài liệu này vi phạm bản quyền nội dung của trường.",
    report_token: "TOK-1001",
    expired_at: "2023-12-01T00:00:00Z",
    created_at: "2023-10-20T10:45:00Z", date: "Oct 20, 2023\n10:45 AM",
    status: "Pending",
    reporter: {
      name: "Sarah Jenkins", handle: "@sarahj", email: "sarah.jenkins@fpt.edu.vn",
      userId: "SE100001", avatar: "https://ui-avatars.com/api/?name=Sarah+Jenkins&background=random"
    },
    reported: {
      name: "Advanced Calculus Notes", handle: "DOC-1001", email: "",
      userId: "DOC-1001", type: "document", avatar: "https://ui-avatars.com/api/?name=Document&background=random"
    }
  },
  {
    report_id: 11, id: "#REP-9011",
    material_id: 1,
    account_id: 2,
    description: "Nội dung này vi phạm nghiêm trọng.",
    reason: "Inappropriate Content", details: "Có chứa thông tin không phù hợp với chuẩn mực giáo dục.",
    report_token: "TOK-1011",
    expired_at: "2023-12-05T00:00:00Z",
    created_at: "2023-10-21T09:30:00Z", date: "Oct 21, 2023\n09:30 AM",
    status: "Pending",
    reporter: {
      name: "Minh Tran", handle: "@minhtran", email: "minh.tran@fpt.edu.vn",
      userId: "SE100002", avatar: "https://ui-avatars.com/api/?name=Minh+Tran&background=random"
    },
    reported: {
      name: "Advanced Calculus Notes", handle: "DOC-1001", email: "",
      userId: "DOC-1001", type: "document", avatar: "https://ui-avatars.com/api/?name=Document&background=random"
    }
  },
  {
    report_id: 12, id: "#REP-9012",
    material_id: 1,
    account_id: 3,
    description: "Tôi thấy tài liệu này copy từ một nguồn khác trên mạng.",
    reason: "Plagiarism", details: "Tôi thấy tài liệu này copy từ một nguồn khác trên mạng.",
    report_token: "TOK-1012",
    expired_at: "2023-12-06T00:00:00Z",
    created_at: "2023-10-22T14:15:00Z", date: "Oct 22, 2023\n02:15 PM",
    status: "Under Review",
    reporter: {
      name: "Alex Rivera", handle: "@alexr", email: "alex.rivera@fpt.edu.vn",
      userId: "SE100003", avatar: "https://ui-avatars.com/api/?name=Alex+Rivera&background=random"
    },
    reported: {
      name: "Advanced Calculus Notes", handle: "DOC-1001", email: "",
      userId: "DOC-1001", type: "document", avatar: "https://ui-avatars.com/api/?name=Document&background=random"
    }
  },
  {
    report_id: 13, id: "#REP-9013",
    material_id: 1,
    account_id: 4,
    description: "Một số công thức trong tài liệu bị sai.",
    reason: "Inaccurate Information", details: "Một số công thức trong tài liệu bị sai.",
    report_token: "TOK-1013",
    expired_at: "2023-12-07T00:00:00Z",
    created_at: "2023-10-23T11:00:00Z", date: "Oct 23, 2023\n11:00 AM",
    status: "Pending",
    reporter: {
      name: "Jordan Lee", handle: "@jordanl", email: "jordan.lee@fpt.edu.vn",
      userId: "MA200001", avatar: "https://ui-avatars.com/api/?name=Jordan+Lee&background=random"
    },
    reported: {
      name: "Advanced Calculus Notes", handle: "DOC-1001", email: "",
      userId: "DOC-1001", type: "document", avatar: "https://ui-avatars.com/api/?name=Document&background=random"
    }
  },
  {
    report_id: 14, id: "#REP-9014",
    material_id: 1,
    account_id: 5,
    description: "Tài liệu này không thuộc nội dung môn học.",
    reason: "Spam", details: "Tài liệu này không thuộc nội dung môn học.",
    report_token: "TOK-1014",
    expired_at: "2023-12-08T00:00:00Z",
    created_at: "2023-10-24T16:20:00Z", date: "Oct 24, 2023\n04:20 PM",
    status: "Resolved",
    reporter: {
      name: "Emma Smith", handle: "@emmas", email: "emma.smith@fpt.edu.vn",
      userId: "MA200002", avatar: "https://ui-avatars.com/api/?name=Emma+Smith&background=random"
    },
    reported: {
      name: "Advanced Calculus Notes", handle: "DOC-1001", email: "",
      userId: "DOC-1001", type: "document", avatar: "https://ui-avatars.com/api/?name=Document&background=random"
    }
  },
  {
    report_id: 15, id: "#REP-9015",
    material_id: 1,
    account_id: 10,
    description: "Tác giả cố tình đưa thông tin lừa đảo vào tài liệu.",
    reason: "Harassment", details: "Tác giả cố tình đưa thông tin lừa đảo vào tài liệu.",
    report_token: "TOK-1015",
    expired_at: "2023-12-09T00:00:00Z",
    created_at: "2023-10-25T08:45:00Z", date: "Oct 25, 2023\n08:45 AM",
    status: "Pending",
    reporter: {
      name: "FPT Student", handle: "@fptstudent", email: "student@fpt.edu.vn",
      userId: "fptstudent", avatar: "https://ui-avatars.com/api/?name=FPT+Student&background=random"
    },
    reported: {
      name: "Advanced Calculus Notes", handle: "DOC-1001", email: "",
      userId: "DOC-1001", type: "document", avatar: "https://ui-avatars.com/api/?name=Document&background=random"
    }
  },
  {
    report_id: 2, id: "#REP-9002",
    material_id: 2,
    account_id: 2,
    description: "Chứa thông tin không chính xác về Python gây hiểu lầm.",
    reason: "Inaccurate Information", details: "Chứa thông tin không chính xác về Python gây hiểu lầm.",
    report_token: "TOK-1002",
    expired_at: "2023-12-05T00:00:00Z",
    created_at: "2023-10-21T09:30:00Z", date: "Oct 21, 2023\n09:30 AM",
    status: "Under Review",
    reporter: {
      name: "Minh Tran", handle: "@minhtran", email: "minh.tran@fpt.edu.vn",
      userId: "SE100002", avatar: "https://ui-avatars.com/api/?name=Minh+Tran&background=random"
    },
    reported: {
      name: "Intro to Python Programming", handle: "DOC-1002", email: "",
      userId: "DOC-1002", type: "document", avatar: "https://ui-avatars.com/api/?name=Document&background=random"
    }
  },
  {
    report_id: 3, id: "#REP-9003",
    material_id: 3,
    account_id: 11,
    description: "Nội dung spam, không liên quan đến bài học kinh tế vĩ mô.",
    reason: "Spam", details: "Nội dung spam, không liên quan đến bài học kinh tế vĩ mô.",
    report_token: "TOK-1003",
    expired_at: "2023-12-10T00:00:00Z",
    created_at: "2023-10-22T14:15:00Z", date: "Oct 22, 2023\n02:15 PM",
    status: "Resolved",
    reporter: {
      name: "Son Quang", handle: "@sonquang", email: "son@gmail.com",
      userId: "sonquang", avatar: "https://ui-avatars.com/api/?name=Son+Quang&background=random"
    },
    reported: {
      name: "Macroeconomics Lecture 04", handle: "DOC-1003", email: "",
      userId: "DOC-1003", type: "document", avatar: "https://ui-avatars.com/api/?name=Document&background=random"
    }
  },
  {
    report_id: 4, id: "#REP-9004",
    material_id: 4,
    account_id: 3,
    description: "File zip bị lỗi không thể giải nén được sau khi tải về.",
    reason: "Broken File", details: "File zip bị lỗi không thể giải nén được sau khi tải về.",
    report_token: "TOK-1004",
    expired_at: "2023-12-15T00:00:00Z",
    created_at: "2023-10-23T08:00:00Z", date: "Oct 23, 2023\n08:00 AM",
    status: "Pending",
    reporter: {
      name: "Alex Rivera", handle: "@alexr", email: "alex.rivera@fpt.edu.vn",
      userId: "SE100003", avatar: "https://ui-avatars.com/api/?name=Alex+Rivera&background=random"
    },
    reported: {
      name: "Web Development Boilerplate", handle: "DOC-1004", email: "",
      userId: "DOC-1004", type: "document", avatar: "https://ui-avatars.com/api/?name=Document&background=random"
    }
  },
  {
    report_id: 5, id: "#REP-9005",
    material_id: 5,
    account_id: 10,
    description: "Ngôn từ thù ghét và xúc phạm trong phần bình luận của tài liệu.",
    reason: "Harassment", details: "Ngôn từ thù ghét và xúc phạm trong phần bình luận của tài liệu.",
    report_token: "TOK-1005",
    expired_at: "2023-12-20T00:00:00Z",
    created_at: "2023-10-24T16:20:00Z", date: "Oct 24, 2023\n04:20 PM",
    status: "Under Review",
    reporter: {
      name: "FPT Student", handle: "@fptstudent", email: "student@fpt.edu.vn",
      userId: "fptstudent", avatar: "https://ui-avatars.com/api/?name=FPT+Student&background=random"
    },
    reported: {
      name: "Web Development Boilerplate 2", handle: "DOC-1005", email: "",
      userId: "DOC-1005", type: "document", avatar: "https://ui-avatars.com/api/?name=Document&background=random"
    }
  }
];


export const INITIAL_SESSIONS = [
  {
    id: 1,
    title: 'Software Eng. Methodologies...',
    category: 'today',
    messages: [
      {
        id: 101,
        sender: 'user',
        text: 'Can you summarize the main differences between waterfall and Agile methodologies based on chapter 3 of this document?'
      },
      {
        id: 102,
        sender: 'ai',
        text: 'Based on Chapter 3 of the attached document, the primary differences lie in flexibility and phase progression:\n\nwaterfall is linear and sequential. Progress flows largely in one direction downwards (like a waterfall) through phases of Conception, Initiation, Analysis, Design, Construction, Testing, Production/Implementation, and Maintenance.\n\nAgile emphasizes iterative and incremental development. It values individuals and interactions, working software, customer collaboration, and responding to change over following a rigid plan.'
      }
    ]
  },
  {
    id: 2,
    title: 'Agile Framework Summary',
    category: 'today',
    messages: [
      {
        id: 201,
        sender: 'user',
        text: 'Summarize Agile framework briefly'
      },
      {
        id: 202,
        sender: 'ai',
        text: 'The Agile framework is centered on iterative development, where requirements and solutions evolve through collaboration between self-organizing cross-functional teams. Popular frameworks include Scrum and Kanban.'
      }
    ]
  },
  {
    id: 3,
    title: 'Database Normalization rules',
    category: 'past',
    messages: [
      {
        id: 301,
        sender: 'user',
        text: 'What is 3NF?'
      },
      {
        id: 302,
        sender: 'ai',
        text: 'A relation is in third normal form (3NF) if it is in second normal form (2NF) and contains no transitive dependencies (no non-prime attribute depends on another non-prime attribute).'
      }
    ]
  },
  {
    id: 4,
    title: 'Help with Java Collections',
    category: 'past',
    messages: []
  }
];
export const INITIAL_NOTES = [
  {
    id: 1,
    text: 'Cần review kỹ lại chương 3 sách Software Engineering về mô hình V-model.',
    time: 'Hôm nay, 10:30 AM'
  },
  {
    id: 2,
    text: 'Nhớ làm quiz trắc nghiệm về Methodologies trước PE.',
    time: 'Hôm qua, 3:15 PM'
  },
  {
    id: 3,
    text: 'Nhớ làm quiz nghiệm về Software Testing.',
    time: 'Hôm kia, 9:00 AM'
  }
];

export const adminSettings = {
  get profile() {
    const admin = accounts.find(u => u.role === 'Admin') || accounts[2];
    return {
      fullName: admin.fullName,
      email: admin.email,
      bio: admin.bio,
      role: admin.role,
      avatar: admin.avatar
    };
  },
  set profile(newProfile) {
    const admin = accounts.find(u => u.role === 'Admin') || accounts[2];
    Object.assign(admin, newProfile);
  },
  get security() {
    const admin = accounts.find(u => u.role === 'Admin') || accounts[2];
    return {
      twoFactorEnabled: admin.twoFactorEnabled,
      notifications: admin.notifications
    };
  },
  set security(newSecurity) {
    const admin = accounts.find(u => u.role === 'Admin') || accounts[2];
    admin.twoFactorEnabled = newSecurity.twoFactorEnabled;
    admin.notifications = { ...newSecurity.notifications };
  }
};

export const topDownloads = [
  { id: 1, name: "Trần Thế Anh", downloads: 12503, docs: 124, badge: "Gold Contributor", avatar: "https://ui-avatars.com/api/?name=Tran+The+Anh&background=random" },
  { id: 2, name: "Phạm Hồng Nhung", downloads: 8421, docs: 85, badge: "Silver Contributor", avatar: "https://ui-avatars.com/api/?name=Pham+Hong+Nhung&background=random" },
  { id: 3, name: "Nguyễn Gia Huy", downloads: 5190, docs: 56, badge: "Bronze Contributor", avatar: "https://ui-avatars.com/api/?name=Nguyen+Gia+Huy&background=random" },
  { id: 4, name: "Lâm Hoàng My", downloads: 4821, docs: 42, badge: "RISING STAR", avatar: "https://ui-avatars.com/api/?name=Lam+Hoang+My&background=random" },
  { id: 5, name: "Vũ Quốc Bảo", downloads: 4110, docs: 38, badge: "DEDICATED", avatar: "https://ui-avatars.com/api/?name=Vu+Quoc+Bao&background=random" }
];

export const topViews = [
  { id: 1, name: "Nguyễn Tuấn Kiệt", views: 92400, docs: 156, trend: "+12%", trendUp: true, badge: "POPULAR CONTENT", avatar: "https://ui-avatars.com/api/?name=Nguyen+Tuan+Kiet&background=random" },
  { id: 2, name: "Đặng Ngọc Linh", views: 78120, docs: 89, trend: "-2%", trendUp: false, badge: "HIGH IMPACT", avatar: "https://ui-avatars.com/api/?name=Dang+Ngoc+Linh&background=random" }
];

export const hallOfFame = [
  { id: 1, month: "12/2024", name: "Trần Thế Anh", category: "Top Downloads", value: "12,503", badge: "GOLD", avatar: "https://ui-avatars.com/api/?name=Tran+The+Anh&background=random" },
  { id: 2, month: "12/2024", name: "Nguyễn Tuấn Kiệt", category: "Top Views", value: "92,400", badge: "GOLD", avatar: "https://ui-avatars.com/api/?name=Nguyen+Tuan+Kiet&background=random" },
  { id: 3, month: "11/2024", name: "Nguyễn Anh Kiệt", category: "Top Views", value: "11,400", badge: "GOLD", avatar: "https://ui-avatars.com/api/?name=Nguyen+Anh+Kiet&background=random" },
  { id: 4, month: "11/2024", name: "Nguyễn Tuấn Anh", category: "Top Views", value: "82,400", badge: "GOLD", avatar: "https://ui-avatars.com/api/?name=Nguyen+Tuan+Anh&background=random" }
];

export const mockDocumentQueue = Object.values(mockReports.reduce((acc, report) => {
  const docId = report.reported.userId;
  if (!acc[docId]) {
    acc[docId] = {
      id: docId,
      name: report.reported.name,
      department: "Software Engineering",
      reports: [],
      status: "REPORTED",
      tags: [".NET Core", "API Design", "FPT Coursework"],
      size: "2.4 MB",
      pages: "18 Pages",
      format: "PDF",
      author: (() => {
        const uploader = mockTableUsers[Math.max(0, parseInt(docId.replace('DOC-', '')) - 1000) % mockTableUsers.length];
        return { name: uploader.name, handle: `@${uploader.user_name}`, avatar: uploader.avatar, userId: uploader.userId };
      })(),
      creationTime: "Oct 24, 2023 14:32",
      views: "1.2k",
      downloads: "450"
    };
  }
  acc[docId].reports.push(report);
  return acc;
}, {}));
