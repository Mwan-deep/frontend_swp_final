
import DocumentLibrary from "../features/pages/DocumentLibrary.jsx";
import Dashboard from "../features/pages/Dashboard.jsx";
import LandingPage from "../features/pages/LandingPage.jsx";
import Login from "../features/auth/login/login.jsx";
//import AIFeatures from "../features/pages/AIFeatures.jsx";
//import Learning from "./features/auth/pages/Learning.jsx";
//import Community from "./features/auth/pages/Community.jsx";
//import Account from "./features/auth/pages/Account.jsx";
//import Settings from "./features/auth/pages/Settings.jsx";

export const publicRoutes = [
  { path: "dashboard", component: Dashboard },
  { path: "documents", component: DocumentLibrary },
  { path: "/", component: LandingPage ,noLayout: true  },  
   { path: "login", component: Login, noLayout: true },

  //{ path: "ai-features", component: AIFeatures },
  //{ path: "learning", component: Learning },
  //{ path: "community", component: Community },
 // { path: "account", component: Account },
  //{ path: "settings", component: Settings },
];