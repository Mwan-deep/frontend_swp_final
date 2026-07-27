import axios from 'axios';

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'https://backend-swp-final.onrender.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

const isTokenExpired = (token) => {
  if (!token) return true;
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.exp * 1000 < Date.now();
  } catch (e) {
    return true;
  }
};

axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token') || localStorage.getItem('api_token');
    
    if (token && isTokenExpired(token)) {
      console.log("⏳ Token đã hết hạn! Đang chuyển hướng về trang chủ...");
      localStorage.clear();
      sessionStorage.clear();
      // ĐỔI TẠI ĐÂY: Đá thẳng về '/'
      window.location.replace('/'); 
      return Promise.reject(new axios.Cancel('Token expired'));
    }

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) return response.data;
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      console.log("🚨 Phát hiện Token bị từ chối! Đang chuyển hướng về trang chủ...");
      localStorage.clear();
      sessionStorage.clear();
      // ĐỔI TẠI ĐÂY: Đá thẳng về '/'
      window.location.replace('/');
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
