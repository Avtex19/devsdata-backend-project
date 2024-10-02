import React, { useState } from 'react';
import { fetchReservation } from '../api/FetchReservation';
import styles from './SearchReservation.module.css'; // Import the CSS module

interface SearchReservationProps {
    onSearchResult: (eventId: number | null) => void;
}

const SearchReservation: React.FC<SearchReservationProps> = ({ onSearchResult }) => {
    const [reservationCode, setReservationCode] = useState<string>('');
    const [error, setError] = useState<string | null>(null);

    const handleSearch = async () => {
        setError(null);
        try {
            const reservation = await fetchReservation(reservationCode);
            onSearchResult(reservation.event);
        } catch (err) {
            setError('Reservation not found');
            onSearchResult(null);
        }
    };

    return (
        <div className={styles.searchContainer}>
            <input
                type="text"
                placeholder="Enter reservation code"
                value={reservationCode}
                onChange={(e) => setReservationCode(e.target.value)}
                className={styles.searchInput}
            />
            <button onClick={handleSearch} className={styles.searchButton}>
                Search
            </button>
            {error && <p className={styles.errorMessage}>{error}</p>}
        </div>
    );
};

export default SearchReservation;
