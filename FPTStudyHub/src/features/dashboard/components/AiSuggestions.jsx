import Card from '../../../shared/components/Card';
import { Sparkles, Bookmark, RefreshCw } from 'lucide-react';

const AiSuggestions = () => {
  return (
    <div className="bg-linear-to-b from-[#f8ecec] to-white rounded-3xl p-6 h-full border border-gray-100/50 shadow-sm flex flex-col">
      <div className="flex items-start gap-4 mb-6">
        <div className="w-12 h-12 bg-orange-500 text-white rounded-xl flex items-center justify-center shadow-md shadow-orange-500/20">
          <Sparkles size={24} />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-800">AI Suggested</h2>
          <p className="text-sm text-gray-500">Based on your recent activity</p>
        </div>
      </div>

      <div className="space-y-4 flex-1">
        {/* Suggestion 1 */}
        <Card className="p-5 hover:border-orange-200 transition-colors group cursor-pointer">
          <div className="flex justify-between items-start mb-2">
            <span className="bg-[#eaf4ff] text-blue-600 text-xs font-bold px-3 py-1 rounded-md">Document</span>
            <button className="text-gray-300 hover:text-gray-600 transition-colors">
              <Bookmark size={18} />
            </button>
          </div>
          <h4 className="font-bold text-gray-800 mt-3 group-hover:text-orange-500 transition-colors">Advanced Neural Networks Guide</h4>
          <p className="text-xs text-gray-500 mt-2 leading-relaxed">
            A comprehensive overview of deep learning architectures...
          </p>
        </Card>

        {/* Suggestion 2 */}
        <Card className="p-5 hover:border-orange-200 transition-colors group cursor-pointer">
          <div className="flex justify-between items-start mb-2">
            <span className="bg-orange-50 text-orange-600 text-xs font-bold px-3 py-1 rounded-md">Quiz Prep</span>
            <button className="text-gray-300 hover:text-gray-600 transition-colors">
              <Bookmark size={18} />
            </button>
          </div>
          <h4 className="font-bold text-gray-800 mt-3 group-hover:text-orange-500 transition-colors">Practice: Binary Trees</h4>
          <p className="text-xs text-gray-500 mt-2 leading-relaxed">
            Generate a quick 10-question quiz based on the Data Structures...
          </p>
        </Card>
      </div>

      <button className="w-full mt-6 py-3 rounded-xl border border-orange-200 text-orange-500 font-medium hover:bg-orange-50 flex items-center justify-center gap-2 transition-colors">
        <RefreshCw size={18} />
        <span>Refresh Suggestions</span>
      </button>
    </div>
  );
};

export default AiSuggestions;