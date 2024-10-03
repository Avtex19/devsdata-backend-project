import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { registerForEvent } from '../api/RegisterForEvent.ts';
import styles from './Register.module.css';

const Register: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [message, setMessage] = useState<string | null>(null);
    const [messageType, setMessageType] = useState<'success' | 'error'>('error');

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const eventId = queryParams.get('eventId');
    const navigate = useNavigate();

    const handleRegister = async () => {
        if (!eventId) return;
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) {
            setMessage('Please enter a valid email.');
            setMessageType('error');
            return;
        }

        try {
            const response = await registerForEvent(Number(eventId), email);
            setMessage(`Successfully registered for event with code: ${response.reservation_code}`);
            setMessageType('success');
            setEmail('');
        } catch (error) {
            setMessage((error as Error).message);
            setMessageType('error');
        }
    };

    const handleBackToEvents = () => {
        navigate('/');
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.heading}>Register for Event</h1>
            <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={styles.emailInput}
            />
            <button className={styles.button} onClick={handleRegister}>
                Register
            </button>
            {message && (
                <div className={messageType === 'error' ? styles.errorMessage : styles.successMessage}>
                    {message}
                </div>
            )}

            <button className={styles.button} onClick={handleBackToEvents}>
                Back to Events
            </button>
        </div>
    );
};

export default Register;
