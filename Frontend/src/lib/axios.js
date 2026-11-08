import axios from "axios";
import { toast } from "react-hot-toast";

export const axiosInstance = axios.create({
    baseURL: import.meta.env.MODE === "development" 
        ? "http://localhost:5001/api" 
        : "https://aura-chat-main.onrender.com/api",
    withCredentials: true,
    maxContentLength: 50 * 1024 * 1024, // 50MB
    maxBodyLength: 50 * 1024 * 1024, // 50MB
    headers: {
        'Content-Type': 'application/json',
    }
});

// Add request interceptor to include token in every request
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add response interceptor for better error handling
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.code === 'ERR_NETWORK') {
            toast.error('Network error. Please check your connection.');
        } else if (error.response?.status === 413) {
            toast.error('File size too large. Please try a smaller file.');
        } else if (error.response?.status === 401) {
            // Token expired or invalid - clear it
            localStorage.removeItem('token');
            delete axiosInstance.defaults.headers.common['Authorization'];
        }
        return Promise.reject(error);
    }
);
