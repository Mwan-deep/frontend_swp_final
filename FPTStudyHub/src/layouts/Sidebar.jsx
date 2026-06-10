import { NavLink } from 'react-router-dom';
import { Home, Folder, Sparkles, BookOpen, Users, User, Upload, Settings, LogOut } from 'lucide-react';

const navItems = [
  { path: '/dashboard', label: 'Dashboard', icon: <Home size={20} /> },
  { path: '/documents', label: 'Documents', icon: <Folder size={20} /> },
  { path: '/ai-features', label: 'AI Features', icon: <Sparkles size={20} /> },
  { path: '/learning', label: 'Learning', icon: <BookOpen size={20} /> },
  { path: '/community', label: 'Community', icon: <Users size={20} /> },
  { path: '/account', label: 'Account', icon: <User size={20} /> },
];

const Sidebar = () => {
  return (
    <aside className="w-64 bg-[#e7e6e6] border-r border-gray-200 flex flex-col justify-between md:flex h-full">
      <div>
        <div className="p-6">
          <h1 className="text-2xl font-bold text-orange-500">FPT Study Hub</h1>
        </div>
        
        <nav className="flex-1 px-4 space-y-2 mt-4">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition-colors font-medium ${
                  isActive 
                    ? 'bg-orange-100/50 text-orange-600 border-l-4 border-orange-500' 
                    : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900'
                }`
              }
            >
              <span className="flex items-center justify-center">{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="p-4 space-y-4">
        <button className="w-full bg-orange-400 hover:bg-orange-500 text-white py-3 rounded-xl flex items-center justify-center gap-2 font-medium transition-colors shadow-sm">
          <Upload size={20} /> Upload Document
        </button>
        <div className="space-y-1">
          <button className="flex items-center gap-3 px-4 py-2 text-gray-500 hover:text-gray-900 w-full rounded-lg hover:bg-gray-100 transition-colors">
            <Settings size={20} /> Settings
          </button>
          <button className="flex items-center gap-3 px-4 py-2 text-gray-500 hover:text-gray-900 w-full rounded-lg hover:bg-gray-100 transition-colors">
            <LogOut size={20} /> Logout
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;