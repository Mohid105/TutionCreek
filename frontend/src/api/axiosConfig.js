import axios from 'axios';

// 1. Create the Axios instance
const api = axios.create({
    baseURL: 'http://localhost:5176', // Must match your Spring Boot port
    headers: {
        'Content-Type': 'application/json'
    }
});

// 2. Add the Interceptor (The "Bridge")
api.interceptors.request.use(
    (config) => {
        // Check if a token exists in local storage
        const token = localStorage.getItem('jwt_token');

        // If it exists, attach it to the header
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;