import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BASE_API_URL,
    timeout: 5000, // Set a timeout value in milliseconds
    headers: {
        'Content-Type': 'application/json', 
        
    }

});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('access_token');
        
        if (token) {
            config.headers['Authorization'] = 'Bearer ' + token;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error?.response?.status === 403) {
            window.location.href = '/login';
            localStorage.removeItem('access_token');
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;