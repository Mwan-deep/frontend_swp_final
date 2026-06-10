import { TrendingUp } from 'lucide-react';

const ProgressCard = ({ progress, label }) => {
  return (
    <div className="bg-linear-to-br from-orange-400 to-[#d87c3a] text-white p-4 rounded-2xl flex flex-col justify-between aspect-square shadow-lg shadow-orange-500/20">
      <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center mb-2">
        <TrendingUp size={20} strokeWidth={2.5} />
      </div>
      <div>
        <h4 className="text-2xl font-bold">{progress}</h4>
        <p className="text-xs text-orange-100 mt-1 font-medium leading-tight">{label}</p>
      </div>
    </div>
  );
};

export default ProgressCard;