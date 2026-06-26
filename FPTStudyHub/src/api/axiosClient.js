import axios from 'axios';

const axiosClient = axios.create({
  // Thay địa chỉ IP và port bằng thông tin thực tế của backend
  baseURL: 'http://172.16.3.23:8080/', 
  headers: {
    'Content-Type': 'application/json',
  },
  // Thời gian chờ tối đa cho 1 request (ví dụ: 10 giây)
  timeout: 10000, 
});

// Thêm interceptor cho request (tùy chọn)
axiosClient.interceptors.request.use(
  function (config) {
    // Làm gì đó trước khi request được gửi đi (ví dụ: gắn token)
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Thêm interceptor cho response (tùy chọn)
axiosClient.interceptors.response.use(
  function (response) {
    // Tự động bóc tách data từ response
    return response.data;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default axiosClient;