import axios from 'axios';

export async function unregisterFromEvent(reservationCode: string) {
    try {
        const response = await axios.delete(`http://localhost:8000/api/reservation/cancel/${reservationCode}/`, {
            headers: {
                'Content-Type': 'application/json',
            }
        });

        return response.data;
    } catch (error) {
        console.error('Error canceling reservation:', error);

        if (axios.isAxiosError(error) && error.response) {
            const errorMessage = error.response.data.error || 'Unknown error occurred';
            throw new Error(errorMessage);
        } else {
            throw new Error('An unexpected error occurred.');
        }
    }
}
