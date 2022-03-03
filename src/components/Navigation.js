import { useState } from 'react';
import { Button } from 'antd';
import { Link, useLocation, matchPath, useMatch } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Navigation() {
    const { user, logout } = useAuth();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const loginPathMatch = useMatch('/login');

    async function handleLogout() {
        setLoading(true);
        try {
            await logout();
        } catch {
            // TODO: Handle failed login...
        }
        navigate('/');
        setLoading(false);
    }

    // Show login button if no user is logged in
    // Don't render login button if on login page
    // Show logout button if a user is logged in
    let loginLogout = null;

    if (!user && !loginPathMatch) {
        loginLogout = (
            <Link to='/login'>
                <Button type='ghost'>Login</Button>
            </Link>);
    } else if (user) {
        loginLogout = (
            <Button
                type='ghost'
                onClick={handleLogout}
                loading={loading}>
                Logout
            </Button>
        )
    }

    return (
        <nav className='navigation'>
            <Link to="/">Home</Link>
            <Link to="/survey">Survey</Link>
            {/* This is for testing purposes. Remove before production */}
            <Link to="/admin">Admin</Link> 
            {loginLogout}
        </nav>
    )
}
