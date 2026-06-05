import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from "./layout/layout.jsx"; 
import { publicRoutes } from "./routes/routesConfig.js"; // Import mảng cấu hình

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Trang chủ mặc định khi mới vào - ĐỂ TRỐNG không ép chuyển hướng */}
        <Route index element={<div />} />
        
        {/* Vòng lặp tự động tạo các Routes từ routesConfig */}
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
        
        {/* Đường dẫn lạ hoặc trang chưa khai báo - ĐỂ TRỐNG nội dung chính */}
        <Route path="*" element={<div />} />
      </Route>
    </Routes>
  );
}

export default App;