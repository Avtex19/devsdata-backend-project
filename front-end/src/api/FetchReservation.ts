import axios from 'axios';

const API_URL = 'http://localhost:8000/api/reservation/';

export const fetchReservation = async (reservationCode: string) => {
    try {
        const response = await axios.get(`${API_URL}${reservationCode}/`);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            throw new Error('Reservation not found');
        }
        throw new Error('An error occurred while fetching the reservation');
    }
};
