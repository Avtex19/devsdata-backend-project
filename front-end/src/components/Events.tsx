import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { fetchEvents } from '../api/FetchEvents.ts';
import styles from './Events.module.css';

interface Event {
    id: number;
    title: string;
    start_date: string;
    end_date: string;
    thumbnail: string;
}

const Events: React.FC = () => {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const [reservationCode, setReservationCode] = useState<string>('');
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const limit = 5;

    // Get the current page from the URL
    const page = parseInt(searchParams.get('page') || '1', 10);

    useEffect(() => {
        const loadEvents = async () => {
            try {
                setLoading(true);
                const data = await fetchEvents(limit, (page - 1) * limit); // Offset based on the page number
                setEvents(data.results);
                setHasMore(data.next !== null);
                setLoading(false);
            } catch (error) {
                setError((error as Error).message);
                setLoading(false);
            }
        };

        loadEvents();
    }, [page]); // Fetch events when the page changes

    const handleShowEmailInput = (eventId: number) => {
        navigate(`/register?eventId=${eventId}`);
    };

    const handleSearchReservation = () => {
        if (reservationCode) {
            navigate(`/reservation?reservationCode=${reservationCode}`);
        }
    };

    const handlePageChange = (newPage: number) => {
        setSearchParams({ page: newPage.toString() });
    };

    if (loading) return <p>Loading events...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className={styles.container}>
            <h1 className={styles.heading}>Events</h1>

            <div className={styles.searchSection}>
                <input
                    type="text"
                    placeholder="Enter reservation code"
                    value={reservationCode}
                    onChange={(e) => setReservationCode(e.target.value)}
                    className={styles.inputField}
                />
                <button className={styles.button} onClick={handleSearchReservation}>
                    Search Reservation
                </button>
            </div>

            {events.length === 0 ? (
                <p>No events found</p>
            ) : (
                <div className={styles.eventGrid}>
                    {events.map((event) => (
                        <div key={event.id} className={styles.eventCard}>
                            <h2 className={styles.eventTitle}>{event.title}</h2>
                            <p className={styles.eventDate}>
                                <span className={styles.startDate}>
                                    Start Date: {new Date(event.start_date).toLocaleDateString()}
                                </span>
                                <span className={styles.endDate}>
                                    End Date: {new Date(event.end_date).toLocaleDateString()}
                                </span>
                            </p>
                            {event.thumbnail && (
                                <img
                                    src={event.thumbnail}
                                    alt={`${event.title} thumbnail`}
                                    className={styles.eventThumbnail}
                                />
                            )}
                            <div className={styles.registerSection}>
                                <button
                                    className={styles.button}
                                    onClick={() => handleShowEmailInput(event.id)}
                                >
                                    Register
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <div className={styles.pagination}>
                {page > 1 && (
                    <button
                        className={styles.button}
                        onClick={() => handlePageChange(page - 1)}
                    >
                        Previous
                    </button>
                )}
                {hasMore && (
                    <button
                        className={styles.button}
                        onClick={() => handlePageChange(page + 1)}
                    >
                        Next
                    </button>
                )}
            </div>
        </div>
    );
};

export default Events;
