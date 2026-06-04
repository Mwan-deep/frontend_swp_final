import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from "./layout/layout.jsx"; 
import { publicRoutes } from "./routes/routesConfig.js"; // Import mảng cấu hình

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Trang mặc định khi vào app */}
        <Route index element={<Navigate to="/documents" replace />} />
        
        {/* Vòng lặp này sẽ lấy dữ liệu bên routesConfif đọc và tạo routes tự động cho các page */}
        {publicRoutes.map((route, index) => {
          const Page = route.component;
          return (
            <Route 
              key={index} 
              path={route.path} 
              element={<Page />} 
            />
          );
        })}
        
        {/* Đường dẫn bậy bạ tự động đá về trang chủ */}
        <Route path="*" element={<Navigate to="/documents" replace />} />
      </Route>
    </Routes>
  );
}

export default App;