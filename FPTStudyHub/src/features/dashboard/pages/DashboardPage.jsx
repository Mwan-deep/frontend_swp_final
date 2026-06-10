import StatCard from "../components/StatCard.jsx";
import ProgressCard from "../components/ProgressCard.jsx";
import ActivityList from '../components/ActivityList.jsx';
import AiSuggestions from '../components/AiSuggestions.jsx';
import Card from '../../../shared/components/Card.jsx';
import { FolderOpen, Upload, Heart, MessageSquare, ClipboardEdit } from 'lucide-react';

const DashboardPage = () => {
  return (
    <div className="max-w-7xl mx-auto xl:pr-8">
      {/* Header Section */}
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-4xl font-bold text-gray-800">
            Welcome back, <span className="text-orange-500">Alex!</span>
          </h1>
          <p className="text-gray-500 mt-2 text-lg">Ready to study and make progress today?</p>
        </div>
        <div className="text-gray-500 font-medium flex items-center gap-2">
          📅 October 24, 2023
        </div>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column (Stats & Charts) */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          
          {/* Stats Row */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            <StatCard count="24" label="Total Documents" icon={<FolderOpen size={20} />} />
            <StatCard count="12" label="Uploaded" icon={<Upload size={20} />} />
            <StatCard count="5" label="Favorites" icon={<Heart size={20} />} />
            <StatCard count="42" label="AI Conversations" icon={<MessageSquare size={20} />} />
            <StatCard count="15" label="Quizzes Done" icon={<ClipboardEdit size={20} />} />
            <ProgressCard progress="75%" label="Learning Progress" />
          </div>

          {/* Weekly Chart Area */}
          <Card className="p-6 h-[85] flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold">Weekly Study Activity</h3>
              <button className="text-gray-400 hover:text-gray-600">•••</button>
            </div>
            {/* SVG Mock of the line chart */}
            <div className="flex-1 relative border-l border-b border-gray-100 pl-4 pb-4 mt-4">
               {/* Y-Axis labels */}
               <div className="absolute -left-5 h-full flex flex-col justify-between text-xs text-gray-400 py-2">
                  <span>4h</span><span>3h</span><span>2h</span><span>1h</span><span>0</span>
               </div>
               <svg viewBox="0 0 500 200" preserveAspectRatio="none" className="w-full h-full stroke-orange-400 stroke-4 fill-none">
                  <path d="M0,150 C50,130 100,70 150,70 C200,70 250,150 300,100 C350,10 400,200 450,150 C480,100 500,50 500,50" />
                  <path d="M0,150 C50,130 100,70 150,70 C200,70 250,150 300,100 C350,10 400,200 450,150 C480,100 500,50 500,50 L500,200 L0,200 Z" className="fill-orange-50 stroke-none" />
               </svg>
               {/* X-Axis labels */}
               <div className="absolute -bottom-6.25 w-full flex justify-between text-sm text-gray-500 px-2 font-medium">
                  <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
               </div>
            </div>
          </Card>

          {/* Bottom Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold">Monthly Uploads</h3>
                <span className="bg-orange-100 text-orange-600 text-xs font-bold px-2 py-1 rounded-md">+12%</span>
              </div>
              <div className="h-40 flex items-end gap-2 justify-around pt-4">
                {/* Mock Bar Chart */}
                <div className="w-12 bg-[#dcedff] h-12 rounded-t-sm relative group"><span className="absolute -bottom-6 text-xs text-gray-400 w-full text-center">W 1</span></div>
                <div className="w-12 bg-[#dcedff] h-24 rounded-t-sm relative group"><span className="absolute -bottom-6 text-xs text-gray-400 w-full text-center">W 2</span></div>
                <div className="w-12 bg-[#dcedff] h-16 rounded-t-sm relative group"><span className="absolute -bottom-6 text-xs text-gray-400 w-full text-center">W 3</span></div>
                <div className="w-12 bg-orange-400 h-32 rounded-t-sm relative group shadow-sm"><span className="absolute -bottom-6 text-xs text-gray-400 w-full text-center">W 4</span></div>
              </div>
            </Card>
            
            <Card className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold">Recent Activity</h3>
                <a href="#" className="text-orange-500 text-sm font-medium hover:underline">View All</a>
              </div>
              <ActivityList />
            </Card>
          </div>
        </div>

        {/* Right Column (AI Suggestions) */}
        <div className="lg:col-span-4">
          <AiSuggestions />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;