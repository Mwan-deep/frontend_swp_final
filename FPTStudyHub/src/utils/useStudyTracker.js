import { useEffect, useRef } from 'react';
import axiosClient from './axiosClient';

const useStudyTracker = () => {
  // Biến cờ: Đánh dấu xem người dùng có đang thức/hoạt động không
  const isActive = useRef(false);

  useEffect(() => {
    // Hàm đánh dấu người dùng ĐANG HOẠT ĐỘNG
    const markActive = () => { 
        isActive.current = true; 
    };

    // Lắng nghe các sự kiện chứng tỏ sinh viên đang học bài
    window.addEventListener('mousemove', markActive);
    window.addEventListener('keydown', markActive);
    window.addEventListener('click', markActive);
    window.addEventListener('scroll', markActive);

    // VÒNG LẶP TIM MẠCH (MỖI 60 GIÂY CHẠY 1 LẦN)
    const intervalId = setInterval(() => {
      // Nếu trong 60 giây qua có hoạt động (chuột/phím)
      if (isActive.current) {
        // Bắn tín hiệu lên Server để cộng 1 phút
        axiosClient.post('/api/v1/dashboard/ping')
          .catch(err => console.log("Ping failed (Token might be expired)"));
        
        // Reset lại cờ thành false, chờ xem 60 giây tiếp theo có cử động gì không
        isActive.current = false; 
      }
    }, 60000); // 60000 ms = 1 phút

    // Dọn dẹp rác khi rời trang
    return () => {
      window.removeEventListener('mousemove', markActive);
      window.removeEventListener('keydown', markActive);
      window.removeEventListener('click', markActive);
      window.removeEventListener('scroll', markActive);
      clearInterval(intervalId);
    };
  }, []);
};

export default useStudyTracker;