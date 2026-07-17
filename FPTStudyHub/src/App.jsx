import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from "./layout/layout.jsx";
import AdminLayout from "./layout/AdminLayout.jsx";
import LandingPage from './features/pages/LandingPage';
import { publicRoutes, adminRoutes, managerRoutes } from './routes/routesConfig';
import Login from './features/auth/login/login';
import Register from './features/auth/register/register';
import ForgotPassword from './features/auth/login/components/ForgotPassword';
import ManagerLayout from "./layout/ManagerLayout.jsx";
import DocumentDetail from './features/pages/DocumentDetail.jsx';
import QuestionSetDetail from './features/pages/QuestionSetDetail.jsx';
import useStudyTracker from './utils/useStudyTracker'

const isTokenExpired = (token) => {
  if (!token) return true;
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.exp * 1000 < Date.now();
  } catch (e) {
    return true; 
  }
};

const RequireAuth = ({ children, allowedRole }) => {
  const token = localStorage.getItem('token');
  const isValidLogin = token && !isTokenExpired(token); 
  let userRole = (localStorage.getItem('role') || 'user').toLowerCase();

  if (!isValidLogin) {
    localStorage.clear();
    sessionStorage.clear();
    // ĐỔI TẠI ĐÂY: Navigate về '/'
    return <Navigate to="/" replace />;
  }

  if (allowedRole && userRole !== allowedRole) {
    if (userRole === 'admin') return <Navigate to="/admin" replace />;
    if (userRole === 'manager') return <Navigate to="/manager" replace />;
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

function App() {
  useStudyTracker();
  
  useEffect(() => {
    const checkSecurity = () => {
      const token = localStorage.getItem('token') || localStorage.getItem('api_token');
      const path = window.location.pathname;
      const isPublic = path === '/' || path.startsWith('/login') || path.startsWith('/register') || path.startsWith('/forgot-password');

      if ((!token || isTokenExpired(token)) && !isPublic) {
        localStorage.clear();
        sessionStorage.clear();
        // ĐỔI TẠI ĐÂY: Đá thẳng về '/'
        window.location.replace('/');
      }
    };

    checkSecurity();
    window.addEventListener('popstate', checkSecurity);
    window.addEventListener('pageshow', (e) => { if (e.persisted) checkSecurity(); });
    window.addEventListener('focus', checkSecurity);

    return () => {
      window.removeEventListener('popstate', checkSecurity);
      window.removeEventListener('pageshow', checkSecurity);
      window.removeEventListener('focus', checkSecurity);
    };
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/documents/:id" element={<DocumentDetail />} />
        <Route path="/question-sets/:id" element={<QuestionSetDetail />} />

        {/* Các trang dành cho USER */}
        <Route element={<Layout />}>
          {publicRoutes
            .filter((route) => !route.noLayout)
            .map((route, index) => {
              const Page = route.component;
              const isDocumentsRoute = route.path.includes('documents');
              return (
                <Route
                  key={`user-${index}`}
                  path={route.path}
                  element={
                    isDocumentsRoute ? (
                      <Page />
                    ) : (
                      <RequireAuth allowedRole="user">
                        <Page />
                      </RequireAuth>
                    )
                  }
                />
              );
            })}
        </Route>

        {/* Các trang dành cho ADMIN */}
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

        {/* Các trang dành cho MANAGER */}
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

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;