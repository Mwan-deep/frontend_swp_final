import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from "./layout/layout.jsx"; 
import LandingPage from './features/pages/LandingPage';
import { publicRoutes } from './routes/routesConfig';
import Login from './features/auth/login/login'; 

// Hợp phần bảo vệ: Bắt buộc đăng nhập với các trang quản trị
const RequireAuth = ({ children }) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  return isLoggedIn ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 1. Vào trang web là thấy ngay Landing Page độc lập */}
        <Route path="/" element={<LandingPage />} />
        
        {/* 2. Đường dẫn /login độc lập không bọc trong Layout bảo mật */}
        <Route path="/login" element={<Login />} />

        {/* 3. Layout bọc các trang quản trị */}
        <Route element={<Layout />}>
          {publicRoutes
            .filter((route) => !route.noLayout) // Lọc bỏ các trang độc lập (Landing, Login)
            .map((route, index) => {
              const Page = route.component;
              
              // 👉 SỬA TẠI ĐÂY: Dùng .includes để nhận diện chính xác kể cả path có dấu '/' hay không
              const isDocumentsRoute = route.path.includes('documents');
              
              return (
                <Route 
                  key={index} 
                  path={route.path} 
                  element={
                    isDocumentsRoute ? (
                      // Trang tài liệu cho phép truy cập tự do (Freemium)
                      <Page />
                    ) : (
                      // Các trang khác (Dashboard, và các trang trắng) bắt buộc đăng nhập
                      <RequireAuth>
                        <Page />
                      </RequireAuth>
                    )
                  } 
                />
              );
            })}
        </Route>

        {/* 4. Chỉ chuyển hướng khi người dùng gõ bừa một đường dẫn hoàn toàn không tồn tại */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;