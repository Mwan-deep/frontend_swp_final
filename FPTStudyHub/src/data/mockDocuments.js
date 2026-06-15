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
    role: "user"
  },
  {
    email: "son@gmail.com",
    password: "123",
    role: "user"
  },
  {
    email: "admin@fpt.edu.vn",
    password: "admin",
    role: "admin"
  }
];