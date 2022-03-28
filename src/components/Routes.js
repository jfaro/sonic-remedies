import { Navigate } from 'react-router-dom';
import { useAuth } from '../services/firebase';

export const AuthenticatedRoute = ({ children }) => {
    const { isAuthenticated } = useAuth();
    console.log(isAuthenticated ? "User is authenticated!" : "Please sign in")
    return isAuthenticated ? children : <Navigate to='/login' />;
}

export const UnauthenticatedRoute = ({ children }) => {
    const { isAuthenticated } = useAuth();
    return !isAuthenticated ? children : <Navigate to='/' />
}