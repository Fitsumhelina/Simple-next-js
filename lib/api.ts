import axios from 'axios';

const API_URL = process.env.API_URL

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Request interceptor to get CSRF token
api.interceptors.request.use(async (config) => {
  // Get CSRF token for state-changing requests
  if (['post'].includes(config.method?.toLowerCase() || '')) {
    try {
      await axios.get(`${API_URL}/sanctum/csrf-cookie`, {
        withCredentials: true,
      });
    } catch (error) {
      console.error('Failed to get CSRF token:', error);
    }
  }
  return config;
});

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Redirect to login on unauthorized
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;