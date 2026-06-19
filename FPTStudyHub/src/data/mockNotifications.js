export const mockNotifications = [
  {
    id: 1,
    type: 'system',
    title: 'System Maintenance Scheduled',
    description: 'The platform will be down for scheduled maintenance on Sunday from 2 AM to 4 AM EST. We apologize for any inconvenience.',
    timeAgo: '2h ago',
    read: false,
  },
  {
    id: 2,
    type: 'documents',
    title: 'New Lecture Notes Uploaded',
    description: 'Prof. Smith has uploaded the \'Introduction to Machine Learning\' slides for Week 3.',
    timeAgo: 'Yesterday',
    read: true,
  },
  {
    id: 3,
    type: 'ai',
    title: 'AI Summary Ready',
    description: 'Your requested AI summary for \'Advanced Calculus Chapter 4\' is ready to review. Click here to view key insights.',
    timeAgo: 'Yesterday',
    read: false,
  },
  {
    id: 4,
    type: 'community',
    title: 'New Reply in Study Group',
    description: 'Alex replied to your question in the \'Physics 101 Midterm Prep\' thread: "I think the formula you\'re looking for is..."',
    timeAgo: 'Oct 24',
    read: true,
  }
];
