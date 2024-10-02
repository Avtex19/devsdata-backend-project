import axios from 'axios';

const API_URL = 'http://localhost:8000/api/reservation/create';
export const registerForEvent = async (eventId: number, email: string) => {
    try {
        const response = await axios.post(API_URL, {
            event: eventId,
            email: email,
        });

        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            throw new Error(`Failed to register: ${error.response.data.detail || 'Unknown error'}`);
        } else {
            throw new Error('Failed to register for the event');
        }
    }
};
