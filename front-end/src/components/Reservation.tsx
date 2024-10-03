import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchReservation } from '../api/FetchReservation';
import { unregisterFromEvent } from '../api/UnregisterFromEvent.ts';
import styles from './Reservation.module.css';

interface EventDetails {
    id: number;
    title: string;
    start_date: string;
    end_date: string;
    thumbnail: string;
}

interface Reservation {
    event: EventDetails;
    email: string;
    reservation_code: string;
    created_at: string;
}

const Reservation: React.FC = () => {
    const [reservation, setReservation] = useState<Reservation | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const location = useLocation();
    const navigate = useNavigate();

    const getReservationCode = () => {
        const params = new URLSearchParams(location.search);
        return params.get('reservationCode');
    };

    useEffect(() => {
        const loadReservation = async () => {
            const reservationCode = getReservationCode();
            if (reservationCode) {
                try {
                    setLoading(true);
                    const data = await fetchReservation(reservationCode);
                    setReservation(data);
                    setLoading(false);
                } catch (error) {
                    setError('Reservation not found');
                    setLoading(false);
                }
            }
        };

        loadReservation();
    }, [location.search]);

    const handleBackToEvents = () => {
        navigate('/');
    };

    const handleCancelReservation = async () => {
        const confirmCancel = window.confirm('Do you really want to cancel this reservation?');
        if (confirmCancel && reservation?.reservation_code) {
            try {
                const response = await unregisterFromEvent(reservation.reservation_code);

                if (response.message) {
                    alert(response.message);
                    navigate('/');
                } else if (response.error) {
                    alert(response.error);
                } else {
                    alert('Unknown error occurred.');
                }
            } catch (error) {
                console.error('Error during cancellation:', error);


                if (error instanceof Error) {
                    alert(error.message);
                } else {
                    alert('An unexpected error occurred while trying to cancel the reservation.');
                }
            }
        }
    };




    if (loading) return <p>Loading reservation...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className={styles.container}>
            <h1 className={styles.heading}>Reservation Details</h1>

            {reservation ? (
                <div className={styles.reservationDetails}>
                    <div className={styles.eventDetails}>
                        <h2>Event Details</h2>
                        <p><strong>Title:</strong> {reservation.event.title}</p>
                        <p><strong>Event ID:</strong> {reservation.event.id}</p>
                        <p><strong>Start Date:</strong> {new Date(reservation.event.start_date).toLocaleString()}</p>
                        <p><strong>End Date:</strong> {new Date(reservation.event.end_date).toLocaleString()}</p>
                        <p><strong>Thumbnail:</strong></p>
                        <img src={reservation.event.thumbnail} alt="Event Thumbnail" className={styles.thumbnail} />
                    </div>

                    <div className={styles.reservationInfo}>
                        <h2>Reservation Info</h2>
                        <p><strong>Email:</strong> {reservation.email}</p>
                        <p><strong>Reservation Code:</strong> {reservation.reservation_code}</p>
                        <p><strong>Created At:</strong> {new Date(reservation.created_at).toLocaleString()}</p>
                    </div>
                </div>
            ) : (
                <p>No reservation found.</p>
            )}

            <div className={styles.buttons}>
                <button className={styles.button} onClick={handleBackToEvents}>
                    Back to Events
                </button>

                <button className={styles.button} onClick={handleCancelReservation}>
                    Cancel Reservation
                </button>
            </div>
        </div>
    );
};

export default Reservation;
