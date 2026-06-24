import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from "./layout/layout.jsx";
import AdminLayout from "./layout/AdminLayout.jsx";
import LandingPage from './features/pages/LandingPage';
import { publicRoutes, adminRoutes, managerRoutes } from './routes/routesConfig';
import Login from './features/auth/login/login';
import Register from './features/auth/register/register';
import ManagerLayout from "./layout/ManagerLayout.jsx";

// Hợp phần bảo vệ: Bắt buộc đăng nhập và kiểm tra quyền truy cập (Role)
const RequireAuth = ({ children, allowedRole }) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  // Mặc định là user nếu không có role
  let userRole = (localStorage.getItem('role') || 'user').toLowerCase();
  if (userRole === 'student') userRole = 'user';

  // Nếu chưa đăng nhập -> về trang login
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  // Nếu có yêu cầu về quyền (allowedRole) mà quyền hiện tại không khớp
  if (allowedRole && userRole !== allowedRole) {
    // Điều hướng: Admin về admin, Manager về manager, User về dashboard
    if (userRole === 'admin') return <Navigate to="/admin" replace />;
    if (userRole === 'manager') return <Navigate to="/manager" replace />;
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 1. Vào trang web là thấy ngay Landing Page độc lập */}
        <Route path="/" element={<LandingPage />} />

        {/* 2. Đường dẫn /login độc lập không bọc trong Layout bảo mật */}
        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        {/* 3. Layout bọc các trang dành cho USER */}

        <Route element={<Layout />}>
          {publicRoutes
            .filter((route) => !route.noLayout) // Lọc bỏ các trang độc lập (Landing, Login)
            .map((route, index) => {
              const Page = route.component;


              const isDocumentsRoute = route.path.includes('documents');

              return (
                <Route
                  key={`user-${index}`}
                  path={route.path}
                  element={
                    isDocumentsRoute ? (
                      // Trang tài liệu cho phép truy cập tự do (Freemium)
                      <Page />
                    ) : (
                      // Các trang khác của hệ thống bắt buộc là 'user' mới vào được
                      <RequireAuth allowedRole="user">
                        <Page />
                      </RequireAuth>
                    )
                  }
                />
              );
            })}
        </Route>

        {/* 4. Các trang dành riêng cho ADMIN (Có Layout riêng) */}
        <Route element={<AdminLayout />}>
          {adminRoutes.map((route, index) => {
            const Page = route.component;
            return (
              <Route
                key={`admin-${index}`}
                path={route.path}
                element={
                  <RequireAuth allowedRole="admin">
                    <Page />
                  </RequireAuth>
                }
              />
            );
          })}
        </Route>

        {/* 5. Các trang dành riêng cho MANAGER (Có Layout riêng) */}
        <Route element={<ManagerLayout />}>
          {managerRoutes.map((route, index) => {
            const Page = route.component;
            return (
              <Route
                key={`manager-${index}`}
                path={route.path}
                element={
                  <RequireAuth allowedRole="manager">
                    <Page />
                  </RequireAuth>
                }
              />
            );
          })}
        </Route>

        {/* 6. Chỉ chuyển hướng khi người dùng gõ bừa một đường dẫn hoàn toàn không tồn tại */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

