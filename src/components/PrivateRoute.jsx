import { Navigate } from 'react-router-dom';
import { useAuth } from '../auth/useAuth';

export const PrivateRoute = ({ children }) => {
    const { admin } = useAuth();
    return admin ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;