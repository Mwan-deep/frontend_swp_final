import Card from '../../../shared/components/Card';

const StatCard = ({ count, label, icon }) => {
  return (
    <Card className="p-4 flex flex-col justify-between aspect-square hover:shadow-md transition-shadow cursor-pointer group">
      <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-500 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <div>
        <h4 className="text-2xl font-bold text-gray-800">{count}</h4>
        <p className="text-xs text-gray-500 mt-1 font-medium leading-tight">{label}</p>
      </div>
    </Card>
  );
};

export default StatCard;