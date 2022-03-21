import { useEffect, useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { Button, Space, Typography } from 'antd';
import { GoogleOutlined } from '@ant-design/icons';
import { login } from '../services/firebase'
import { useAuth } from '../contexts/AuthContext';

const { Title, Text } = Typography;

export default function Login() {
    const [isMounted, setIsMounted] = useState(false);
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setIsMounted(true);
        return () => { setIsMounted(false) }
    })

    async function handleLogin() {
        setLoading(true);
        try {
            await login();
        } catch {
            navigate('/');
        }
        if (isMounted) setLoading(false);
        navigate('/');
    }

    return (
        <>
            {user && <Navigate to='/' replace={true} />}
            <Title>Login</Title>

            <Space direction='vertical' align='center' size='large'>
                <Text>Please sign in before taking the survey!</Text>
                <Button
                    type='primary'
                    loading={loading}
                    onClick={handleLogin}
                    icon={<GoogleOutlined />}>
                    Sign in with Google
                </Button>
            </Space>
        </>
    )
}
