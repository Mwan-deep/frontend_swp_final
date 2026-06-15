import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from "../shared/components/header/header";
import Sidebar from "../shared/components/sidebar/sidebar";
import "./layout.css";

const Layout = () => {
  return (
    <div className="app-container">
      <Header />
      <div className="main-wrapper">
        <Sidebar />
        <main className="content-area">
          <Outlet /> {/* <-- Nơi nội dung của từng trang con sẽ hiển thị ở đây */}
        </main>
      </div>
    </div>
  );
};
export default Layout;