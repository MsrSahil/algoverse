import axios from 'axios'
import { API_BASE_URL } from './env.js'

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 60000 // 60 seconds timeout to allow Render free tier to wake up
})

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      // Network error or timeout
      error.message = 'Server is unreachable or waking up. Please try again in a minute.';
    } else if (error.response.status >= 500) {
      // Server error
      error.message = 'Server error. Please try again later.';
    }
    return Promise.reject(error);
  }
);

export default apiClient
