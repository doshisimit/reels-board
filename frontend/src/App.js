// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminDashboard from './pages/AdminDashboard';
import UserDashboard from './pages/UserDashboard';
import NonUserPortal from './components/NonUserPortal';

const App = () => (
    <Router>
        <Routes>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/user" element={<UserDashboard />} />
            <Route path="/:username" element={<NonUserPortal />} />
        </Routes>
    </Router>
);

export default App;
