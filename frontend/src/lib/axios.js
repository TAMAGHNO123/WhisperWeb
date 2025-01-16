import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: 'http://localhost:5001/api',
    withCredentials: true, // Important for handling cookies
    headers: {
        'Content-Type': 'application/json',
    }
});