import { useState } from 'react';
import { Button } from 'antd';
import { Link, useMatch, useNavigate } from 'react-router-dom';
import { useAuth } from '../services/firebase';
import { getAuth, signOut } from 'firebase/auth';

export default function Navigation() {
    const { user, isAuthenticated, isAdmin } = useAuth();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const loginPathMatch = useMatch('/login');

    async function handleLogout() {
        setLoading(true);
        try {
            await signOut(getAuth());
            console.log("Sign-out successful.")
        } catch (error) {
            console.log("An error happened.")
        }
        setLoading(false);
        navigate('/');
    }

    // Show login button if no user is logged in
    // Don't render login button if on login page
    // Show logout button if a user is logged in
    let loginLogoutButton = null;

    if (!user && !loginPathMatch) {
        loginLogoutButton = (
            <Link to='/login'>
                <Button type='ghost'>Login</Button>
            </Link>);
    } else if (user) {
        loginLogoutButton = (
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
            <Link to="/survey">
                <Button type='text'>Survey</Button>
            </Link>
            {loginLogoutButton}
            {isAuthenticated && isAdmin ?
                <Link to="/admin">
                    <Button type='primary'>Admin Dashboard</Button>
                </Link> : null}
        </nav>
    )
}
