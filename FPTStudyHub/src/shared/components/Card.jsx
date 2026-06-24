// Component bọc dùng chung để tạo style card đồng nhất
const Card = ({ children, className = '' }) => {
  return (
    <div className={`bg-white rounded-2xl shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] border border-gray-100 ${className}`}>
      {children}
    </div>
  );
};

export default Card;