import axios from 'axios';
import authHeader from './auth/auth-header';

const api = axios.create({
  baseURL: '/api', // your base URL
});

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    // Do something before request is sent
    const token = authHeader() // token retrieval logic
    if (token) {
      config.headers['X-Access-Token'] = token;
    }
    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);

export default api;
export const fetcher = (url: string) => api.get(url).then(res => res.data);