import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import AdminPage from './pages/AdminPage';
import UserPage from './pages/UserPage';
import PrivateRoute from './components/PrivateRoute';

function App() {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route 
                path="/admin" 
                element={
                    <PrivateRoute requiredRole="ROLE_ADMIN">
                        <AdminPage />
                    </PrivateRoute>
                } 
            />
            <Route 
                path="/user" 
                element={
                    <PrivateRoute requiredRole="ROLE_USER">
                        <UserPage />
                    </PrivateRoute>
                } 
            />
            {/* Redirect any unknown routes to home */}
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
}

export default App;

