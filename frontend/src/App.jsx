import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import AdminPage from './pages/AdminPage';
import UserPage from './pages/UserPage';

function App() {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/user" element={<UserPage />} />
        </Routes>
    );
}

export default App;
