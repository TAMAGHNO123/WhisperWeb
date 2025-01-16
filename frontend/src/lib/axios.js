import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: import.meta.env.MODE === "development" ? 'http://localhost:5001/api' : '/api',
    withCredentials: true, // Important for handling cookies
    headers: {
        'Content-Type': 'application/json',
    }
});