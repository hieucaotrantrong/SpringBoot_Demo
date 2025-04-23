import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const PrivateRoute = ({ children, requiredRole }) => {
    const token = localStorage.getItem('token');

    if (!token) {
        return <Navigate to="/" replace />;
    }

    try {
        const decoded = jwtDecode(token);
        const userRole = decoded.roles;

        if (requiredRole && userRole !== requiredRole) {
            return <Navigate to="/" replace />;
        }

        return children;
    } catch (error) {
        localStorage.removeItem('token');
        return <Navigate to="/" replace />;
    }
};

export default PrivateRoute;
