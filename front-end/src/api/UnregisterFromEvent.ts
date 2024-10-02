const API_URL = 'http://localhost:8000/api/reservation/cancel/';

export const unregisterFromEvent = async (reservationCode: string): Promise<void> => {
    try {
        const isConfirmed = window.confirm("Are you sure you want to unregister from this event?");

        if (!isConfirmed) {
            return;
        }

        const response = await fetch(`${API_URL}${reservationCode}/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to unregister from the event');
        }

        return;
    } catch (error) {
        throw new Error(error as string);
    }
};
