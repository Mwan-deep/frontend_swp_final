import { Search, Bell } from 'lucide-react';

const Header = () => {
  return (
    <header className="h-20 bg-white/50 backdrop-blur-md flex items-center justify-between px-8 z-10 sticky top-0 border-b border-gray-100">
      <div className="flex-1 max-w-2xl">
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
            <Search size={18} />
          </span>
          <input 
            type="text" 
            placeholder="Search documents, subjects, authors..." 
            className="w-full bg-gray-100/80 rounded-full py-3 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-shadow"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-6 ml-4">
        <button className="relative text-gray-500 hover:text-orange-500 transition-colors">
          <Bell size={24} />
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
        </button>
        <div className="flex items-center gap-3 cursor-pointer">
          <img 
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" 
            alt="User Avatar" 
            className="w-10 h-10 rounded-full bg-gray-200 border border-gray-300"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;