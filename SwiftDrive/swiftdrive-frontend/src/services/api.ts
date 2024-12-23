import axios from 'axios';
import { Platform } from 'react-native';

// Development configuration
const DEV_CONFIG = {
  web: 'https://localhost:3001/api',
  android: 'https://10.0.2.2:3001/api',
  ios: 'https://localhost:3001/api'
};

const getBaseUrl = () => {
  const platform: keyof typeof DEV_CONFIG = Platform.OS as keyof typeof DEV_CONFIG;
  return DEV_CONFIG[platform] || DEV_CONFIG.web;
};

const api = axios.create({
  baseURL: getBaseUrl(),
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  }
});

api.interceptors.request.use(
  (config) => {
    console.group('🚀 API Request');
    console.log('URL:', `${config.baseURL}${config.url}`);
    console.log('Method:', config.method?.toUpperCase());
    console.log('Data:', config.data);
    console.groupEnd();
    return config;
  },
  (error) => {
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.group('❌ API Error',error);
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
    } else if (error.request) {
      console.error('Network Error:', error.message);
      // Add retry logic for network errors
      if (!error.config._retry) {
        error.config._retry = true;
        return api(error.config);
      }
    }
    console.groupEnd();
    return Promise.reject(error);
  }
);

export default api;