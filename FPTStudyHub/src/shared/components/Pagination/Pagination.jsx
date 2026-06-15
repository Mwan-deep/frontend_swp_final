import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './Pagination.css'; 

const Pagination = ({ currentPage, totalPages = 20, onPageChange }) => {
  const getPageRange = () => {
    {/* Nếu nhỏ hơn 7 trang thì hiện ra hết 
      Mảng array.from là để hiện ra tất cả trang dưới 7 */}
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    {/* nếu người dùng đang ở 1 trong 4 trang đầu tiên thì sẽ 1 2 3 4 .... trang cuối */}
    if (currentPage <= 4) {
      return [1, 2, 3, 4, 5, '...', totalPages];
    }
{/*Nếu tổng là 20 trang và bạn đang đứng ở trang 17, 18, 19, 20. Hệ thống biết bạn đang quan tâm phần đuôi dữ liệu. 
  Lúc này, nó giữ lại số 1 ở đầu, tiếp theo là dấu '...' để ẩn đi khúc giữa,
   và hiện rõ 5 trang cuối cùng ra. [1, '...', 16, 17, 18, 19, 20] */}
    if (currentPage >= totalPages - 3) {
      return [
        1, 
        '...', 
        totalPages - 4, 
        totalPages - 3, 
        totalPages - 2, 
        totalPages - 1, 
        totalPages
      ];
    }
{/* Nếu mà cái trang ở chính giữa thì nó sẽ hiện trang hiên tại, trang trước và sau của trang hiện tại
   trang đầu và trang cuối [1, '...', 9, 10, 11, '...', 20] */}
    return [
      1, 
      '...', 
      currentPage - 1, 
      currentPage, 
      currentPage + 1, 
      '...', 
      totalPages
    ];
  };

  const pages = getPageRange();

  return (
    <div className="library-pagination">
      <button
        className="page-btn nav-arrow"
        disabled={currentPage === 1} // đang ở trang 1 lùi ko dc nữa 
        onClick={() => onPageChange(currentPage - 1)} // khi bấm nút lùi thì trang hiện tại trừ 1
      >
        <ChevronLeft size={16} />
      </button>
      
      {pages.map((page, index) => {
        if (page === '...') {
          return (
            <span key={`ellipsis-${index}`} className="page-ellipsis">
              ...
            </span>
          );
        }
{/* Nếu người dùng đang đứng ở trang số 1 thì nút số 1 sẽ sáng lên */}
        return (
          <button
            key={page}
            className={`page-btn ${currentPage === page ? 'active' : ''}`}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        );
      })}
{/* nút mũi tên phải */}
      <button
        className="page-btn nav-arrow"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        <ChevronRight size={16} />
      </button>
    </div>
  );
};

export default Pagination;