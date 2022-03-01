import { useState } from 'react';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Navigation() {
    const { user, login, logout } = useAuth();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    async function handleLogin() {
        setLoading(true);
        try {
            await login();
        } catch {
            // TODO: Handle failed login...
        }
        navigate('/');
        setLoading(false);
    }

    async function handleLogout() {
        setLoading(true);
        try {
            await logout();
        } catch {
            // TODO: Handle failed logout...
        }
        navigate('/');
        setLoading(false);
    }

    return (
        <nav className='navigation'>
            <Link to="/">Home</Link>
            <Link to="/survey">Survey</Link>

            {user ?
                <Button
                    type='ghost'
                    loading={loading}
                    onClick={handleLogout}>
                    Logout
                </Button>
                :
                <Button
                    type='ghost'
                    loading={loading}
                    onClick={handleLogin}>
                    Login
                </Button>}
        </nav>
    )
}
