import axios from 'axios';
import API_BASE_URL from '../config/apiConfig';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  withCredentials: true, // include cookies for httpOnly token auth
});

// No Authorization header by default; token is sent via httpOnly cookie

// Response interceptor to catch 401 and act accordingly
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
        console.warn('Unauthorized - please login');
        // Optionally, you can redirect to login here or use refresh logic
      }
    return Promise.reject(error);
  }
);

export default api;
