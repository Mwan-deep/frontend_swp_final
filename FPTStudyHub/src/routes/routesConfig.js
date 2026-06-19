
import DocumentLibrary from "../features/pages/DocumentLibrary.jsx";
import Dashboard from "../features/pages/Dashboard.jsx";
import LandingPage from "../features/pages/LandingPage.jsx";
import Login from "../features/auth/login/login.jsx";
import AdminDashboard from "../features/pages/AdminDashboard.jsx";
import ReportManagement from "../features/pages/ReportManagement.jsx";
import AdminSettings from "../features/pages/AdminSettings.jsx";
import AdminCreateAccount from "../features/pages/AdminCreateAccount.jsx";
import AdminAccountDetails from "../features/pages/AdminAccountDetails.jsx";
import AdminReportDetails from "../features/pages/AdminReportDetails.jsx";
import ManagerDashboard from "../features/pages/ManagerDashboard.jsx";
import ManagerDocumentQueue from "../features/pages/ManagerDocumentQueue.jsx";
import ManagerCommunity from "../features/pages/ManagerCommunity/ManagerCommunity.jsx";

//import AIFeatures from "../features/pages/AIFeatures.jsx";
//import Learning from "./features/auth/pages/Learning.jsx";
//import Community from "./features/auth/pages/Community.jsx";
//import Account from "./features/auth/pages/Account.jsx";
//import Settings from "./features/auth/pages/Settings.jsx";

export const publicRoutes = [
  { path: "dashboard", component: Dashboard },
  { path: "documents", component: DocumentLibrary },
  { path: "/", component: LandingPage, noLayout: true },
  { path: "login", component: Login, noLayout: true },
  // { path: "/register", component: Register, noLayout: true },
  // { path: "/ai-features", component: AIFeatures },
  // { path: "/learning", component: Learning },
  // { path: "/community", component: Community },
  // { path: "/account", component: Account },
  // { path: "/settings", component: Account },
  // { path: "/updatedocument", component: UploadDocument },
  // { path: "/notifications", component: Notifications },
  // { path: "/my-quizzes", component: Quizzes },
  // { path: "/create-quiz", component: CreateQuiz },

];

// Danh sách các route dành riêng cho Admin
export const adminRoutes = [
  { path: "admin", component: AdminDashboard, noLayout: true },
  { path: "admin/reports", component: ReportManagement, noLayout: true },
  { path: "admin/settings", component: AdminSettings, noLayout: true },
  { path: "admin/create-account", component: AdminCreateAccount, noLayout: true },
  { path: "admin/account-details", component: AdminAccountDetails, noLayout: true },
  { path: "admin/report-details", component: AdminReportDetails, noLayout: true },
];

// Danh sách các route dành riêng cho Manager
export const managerRoutes = [
  { path: "manager", component: ManagerDashboard, noLayout: true },
  { path: "manager/documents", component: ManagerDocumentQueue, noLayout: true },
  { path: "manager/community", component: ManagerCommunity, noLayout: true },

];