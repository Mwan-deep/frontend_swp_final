import { createBrowserRouter, Navigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import DashboardPage from '../features/dashboard/pages/DashboardPage';
import LandingPage from '../features/landing/pages/LandingPage';

const router = createBrowserRouter([
  // 1. Route cho trang Landing Page (Trang chủ bên ngoài)
  {
    path: "/",
    element: <LandingPage />
  },
  
  // 2. Các routes bên trong ứng dụng (sử dụng MainLayout có Sidebar, Header)
  // Lưu ý: Không dùng path: "/" ở đây nữa để tránh xung đột
  {
    element: <MainLayout />,
    children: [
      {
        path: "/dashboard",
        element: <DashboardPage />
      },
      { 
        path: "/documents", 
        element: <div>Documents Page</div> 
      },
      { 
        path: "/ai-features", 
        element: <div>AI Features Page</div> 
      },
      { 
        path: "/learning", 
        element: <div>Learning Page</div> 
      },
      { 
        path: "/community", 
        element: <div>Community Page</div> 
      },
      { 
        path: "/account", 
        element: <div>Account Page</div> 
      }
    ]
  },
  
  // 3. Catch-all route: Nếu gõ sai link (như /LaningPage) sẽ tự động quay về trang chủ
  {
    path: "*",
    element: <Navigate to="/" replace />
  }
]);

export default router;