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
        if (error instanceof Error) {
            // Rethrow the error with its message
            throw new Error(error.message);
        } else {
            // In case the error is not an instance of Error, throw a generic error
            throw new Error('An unexpected error occurred');
        }
    }
};
