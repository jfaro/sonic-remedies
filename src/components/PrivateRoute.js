import { Navigate, Route } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function PrivateRoute({ children }) {
    const { user, login } = useAuth();
    return user ? children : <Navigate to='/login' />;
}
