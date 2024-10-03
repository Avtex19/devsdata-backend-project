import axios from 'axios';

const API_URL = 'http://localhost:8000/api/reservation/create';

export async function registerForEvent(eventId: number, email: string) {
    try {
        const response = await axios.post(API_URL, {
            event: eventId,
            email: email,
        }, {
            headers: {
                'Content-Type': 'application/json',
            }
        });

        return response.data;
    } catch (error) {
        console.error('Error registering for event:');

        if (axios.isAxiosError(error)) {
            if (error.response) {
                const errorMessages = error.response.data.non_field_errors;
                if (errorMessages && Array.isArray(errorMessages)) {
                    const errorMessage = errorMessages.join(', ');
                    console.error('Error Message:', errorMessage);

                    throw new Error(errorMessage);
                } else {
                    const errorMessage = error.response.data.detail || 'Unknown error occurred';
                    console.error('Error Message:', errorMessage);
                    throw new Error(errorMessage);
                }
            } else if (error.request) {
                console.error('Error Request:', error.request);
                throw new Error('No response received from the server');
            } else {
                console.error('Error Message:', error.message);
                throw new Error('Error setting up the request');
            }
        } else {
            console.error('Unknown Error:', error);
            throw new Error('An unexpected error occurred');
        }
    }
}
