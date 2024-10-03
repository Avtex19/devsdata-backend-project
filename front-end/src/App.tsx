import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Events from './components/Events';
import Register from './components/Register';
import Reservation from './components/Reservation';

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Events />} />
                <Route path="/register" element={<Register />} />
                <Route path="/reservation" element={<Reservation />} />
\            </Routes>
        </Router>
    );
};

export default App;
