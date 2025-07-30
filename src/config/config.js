// Environment configuration
const config = {
  development: {
    BASE_URL: "http://localhost:8000",
    TIMEOUT: 80000,
  },
  production: {
    BASE_URL: "https://interviewprepare-be-1.onrender.com",
    TIMEOUT: 120000,
  }
};

// Get current environment
const isDevelopment = process.env.NODE_ENV === 'development';
const currentConfig = isDevelopment ? config.development : config.production;

export const API_CONFIG = {
  BASE_URL: currentConfig.BASE_URL,
  TIMEOUT: currentConfig.TIMEOUT,
};

export default API_CONFIG; 