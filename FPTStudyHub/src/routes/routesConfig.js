
import DocumentLibrary from "../features/pages/DocumentLibrary.jsx";
import Dashboard from "../features/pages/Dashboard.jsx";
import LandingPage from "../features/pages/LandingPage.jsx";
import Login from "../features/auth/login/login.jsx";
import Register from "../features/auth/register/register.jsx";
import AIFeatures from "../features/pages/AIFeatures.jsx";
import Learning from "../features/pages/Learning.jsx";
import Community from "../features/pages/Community.jsx";
import Account from "../features/pages/Account.jsx";
import UploadDocument from "../features/pages/UploadDocument.jsx";
import Notifications from "../features/pages/Notifications.jsx"; 
import Quizzes from "../features/pages/Quizzes.jsx"; 
import CreateQuiz from "../features/pages/CreateQuiz.jsx";

export const publicRoutes = [
  { path: "/dashboard", component: Dashboard },
  { path: "/documents", component: DocumentLibrary },
  { path: "/", component: LandingPage ,noLayout: true  },  
   { path: "/login", component: Login, noLayout: true },
{ path: "/register", component: Register, noLayout: true },
{ path: "/ai-features", component: AIFeatures },
{ path: "/learning", component: Learning },
  { path: "/community", component: Community },
 { path: "/account", component: Account },
  { path: "/settings", component: Account },
  { path: "/updatedocument", component:UploadDocument  },
  { path: "/notifications", component: Notifications },
{ path: "/my-quizzes", component: Quizzes },
 { path: "/create-quiz", component: CreateQuiz },
];