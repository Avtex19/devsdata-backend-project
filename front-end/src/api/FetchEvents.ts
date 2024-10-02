import axios from 'axios';

const API_URL = 'http://localhost:8000/api/events/';

export const fetchEvents = async (limit: number, offset: number) => {
    try {
        const response = await axios.get(API_URL, {
            params: {
                limit: limit,
                offset: offset,
            },
        });
        return response.data;
    } catch (error) {
        console.error(error);
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data?.detail || 'Failed to fetch events');
        } else {
            throw new Error('An unexpected error occurred');
        }
    }
};
