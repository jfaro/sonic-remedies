import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { Button } from 'antd';
import { GoogleOutlined } from '@ant-design/icons';
import { useAuth } from '../contexts/AuthContext';

export default function Login() {
    const { user, login } = useAuth();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    async function handleLogin() {
        setLoading(true);
        try {
            await login();
        } catch {
            // TODO: Handle failed login...
        }
        setLoading(false);
        navigate('/');
    }

    return (
        <>
            {user && <Navigate to='/' replace={true} />}
            <h1>Login</h1>
            <p>Please sign in before taking the survey!</p>
            <Button
                type='primary'
                loading={loading}
                onClick={handleLogin}
                icon={<GoogleOutlined />}>
                Sign in with Google
            </Button>
        </>
    )
}
