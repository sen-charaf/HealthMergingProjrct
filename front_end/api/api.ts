import axios from 'axios';

const api = axios.create({
  baseURL: process.env.BACKEND_URL || 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  withCredentials: true, // Enable sending cookies with requests
});

api.interceptors.request.use(
  (config) => {
    // No need to manually set the token as it will be sent automatically via cookies
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
