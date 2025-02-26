import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const getScores = async () => {
    try {
        const response = await axiosInstance.get('/scores');
        return response;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
};

export const addScore = async (scoreData) => {
    try {
        const response = await axiosInstance.post('/scores', scoreData);
        return response;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
}; 