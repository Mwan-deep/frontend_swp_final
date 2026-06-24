import { 
  Archive, CheckCircle, Users, Download, 
  Code, Library, Megaphone, Globe, Monitor 
} from 'lucide-react';

export const STAT_DATA = [
  { id: 1, label: 'Total Question Sets', value: '154', subtext: '↗ 12% increase', subtextType: 'success', icon: Archive, iconBg: '#ffedd5', iconColor: '#b45309' },
  { id: 2, label: 'Total Questions', value: '12,400', subtext: 'Across 48 subjects', icon: CheckCircle, iconBg: '#e0f2fe', iconColor: '#0284c7' },
  { id: 3, label: 'Most Active Major', value: 'Info. Technology', subtext: '42 sets this semester', icon: Users, iconBg: '#f3f4f6', iconColor: '#4b5563' },
  { id: 4, label: 'Most Downloaded Set', value: 'SWE301 - Final', subtext: '1.2k downloads', icon: Download, iconBg: '#ffedd5', iconColor: '#b45309' },
];

export const QUESTION_SETS = [
  { id: 1, title: 'Software Architecture Q-Bank', subject: 'SWE301 - Software Engineering', totalQuestions: '120', downloads: '1.2k', status: 'ACTIVE', icon: Code, iconBg: '#eff6ff', iconColor: '#3b82f6' },
  { id: 2, title: 'Corporate Finance Exam Prep', subject: 'FIN201 - Business Administration', totalQuestions: '85', downloads: '940', status: 'ACTIVE', icon: Library, iconBg: '#ffedd5', iconColor: '#ea580c' },
  { id: 3, title: 'Digital Marketing Strategies', subject: 'MKT304 - Marketing', totalQuestions: '150', downloads: '2.1k', status: 'ARCHIVED', icon: Megaphone, iconBg: '#f3e8ff', iconColor: '#9333ea' },
  { id: 4, title: 'IELTS Academic Vocabulary', subject: 'ENG102 - English Language', totalQuestions: '300', downloads: '5.6k', status: 'ACTIVE', icon: Globe, iconBg: '#dcfce7', iconColor: '#16a34a' },
  { id: 5, title: 'Data Structures & Algorithms', subject: 'DSA201 - Information Technology', totalQuestions: '210', downloads: '1.8k', status: 'ACTIVE', icon: Monitor, iconBg: '#eff6ff', iconColor: '#3b82f6' }
];