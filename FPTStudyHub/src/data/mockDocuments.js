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

export const mockUsers = [
  {
    email: "student@fpt.edu.vn",
    password: "password123"
  },
  {
    email: "abc@gmail.com",
    password: "abc@123"
  }
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