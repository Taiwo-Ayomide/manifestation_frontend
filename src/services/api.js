import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Add auth token to requests
api.interceptors.request.use((config) => {
    try {
        const token = localStorage.getItem('accessToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    } catch (error) {
        console.error('Error accessing localStorage:', error);
    }
    return config;
});

export const examApi = {
    getExam: (examId) => api.get(`/exams/${examId}`),
    submitExam: (examId, answers, timeSpent) => api.post(`/exams/${examId}/submit`, { answers, timeSpent })
};

export default api; 