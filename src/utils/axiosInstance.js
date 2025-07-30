import axios from "axios";
import { BASE_URL } from "./apiPaths";
import { API_CONFIG } from "../config/config";

const axiosInstance = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

//Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("token");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

//Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    //Handle common error globally
    if (error.response) {
      if (error.response.status === 401) {
        //Redirect to login page
        window.location.href = "/";
      } else if (error.response.status === 500) {
        console.error(`Server error. Please try again later.`);
      } else if (error.code === "ECONNABORTED") {
        console.error(`Request timeout. Please try again.`);
      }
      return Promise.reject(error);
    } else if (error.code === "ERR_NETWORK") {
      console.error("Network error. Please check your connection.");
      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
