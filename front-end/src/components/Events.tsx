import React, { useEffect, useState } from 'react';
import { fetchEvents } from '../api/FetchEvents.ts';
import styles from './Events.module.css';
import { registerForEvent } from '../api/RegisterForEvent.ts';

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
    const [offset, setOffset] = useState<number>(0);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const [email, setEmail] = useState<string>('');
    const [registrationMessages, setRegistrationMessages] = useState<{ [key: number]: { message: string | null; type: 'success' | 'error' } }>({});
    const [registeringEventId, setRegisteringEventId] = useState<number | null>(null);

    const limit = 5;

    useEffect(() => {
        const loadEvents = async () => {
            try {
                setLoading(true);
                const data = await fetchEvents(limit, offset);
                setEvents(data.results);
                setHasMore(data.next !== null);
                setLoading(false);
            } catch (error) {
                setError((error as Error).message);
                setLoading(false);
            }
        };

        loadEvents();
    }, [offset]);

    const handleShowEmailInput = (eventId: number) => {
        setRegisteringEventId(eventId);
    };

    const handleRegister = async (eventId: number) => {
        if (!email) {
            setRegistrationMessages({
                ...registrationMessages,
                [eventId]: { message: 'Please enter your email.', type: 'error' }
            });
            return;
        }

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) {
            setRegistrationMessages({
                ...registrationMessages,
                [eventId]: { message: 'Please enter a valid email.', type: 'error' }
            });
            return;
        }

        try {
            const response = await registerForEvent(eventId, email);
            setRegistrationMessages({
                ...registrationMessages,
                [eventId]: { message: `Successfully registered for event with code: ${response.reservation_code}`, type: 'success' }
            });
            setRegisteringEventId(null);
            setEmail('');
        } catch (error) {
            setRegistrationMessages({
                ...registrationMessages,
                [eventId]: { message: (error as Error).message, type: 'error' }
            });
        }
    };

    const handleDismissMessage = (eventId: number) => {
        setRegistrationMessages({
            ...registrationMessages,
            [eventId]: { message: null, type: 'error' }
        });
    };

    if (loading) return <p>Loading events...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className={styles.container}>
            <h1 className={styles.heading}>Events</h1>
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
                                {registeringEventId === event.id ? (
                                    <>
                                        <input
                                            type="email"
                                            placeholder="Enter your email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className={styles.emailInput}
                                        />
                                        <button
                                            className={styles.button}
                                            onClick={() => handleRegister(event.id)}
                                        >
                                            Register
                                        </button>
                                    </>
                                ) : (
                                    <button
                                        className={styles.button}
                                        onClick={() => handleShowEmailInput(event.id)}
                                    >
                                        Register
                                    </button>
                                )}
                            </div>

                            {registrationMessages[event.id]?.message && (
                                <div
                                    className={
                                        registrationMessages[event.id]?.type === 'error'
                                            ? styles.errorMessage
                                            : styles.successMessage
                                    }
                                >
                                    <p>{registrationMessages[event.id]?.message}</p>
                                    <span className={styles.dismissButton} onClick={() => handleDismissMessage(event.id)}>
                                        &times;
                                    </span>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}

            <div className={styles.pagination}>
                {offset > 0 && (
                    <button
                        className={styles.button}
                        onClick={() => setOffset((prev) => Math.max(prev - limit, 0))}
                    >
                        Previous
                    </button>
                )}
                {hasMore && (
                    <button
                        className={styles.button}
                        onClick={() => setOffset((prev) => prev + limit)}
                    >
                        Next
                    </button>
                )}
            </div>
        </div>
    );
};

export default Events;
