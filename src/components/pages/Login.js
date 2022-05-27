import { useCallback, useEffect, useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { Button, Space, Typography } from 'antd';
import { GoogleOutlined } from '@ant-design/icons';
import { db, useAuth } from '../../services/firebase';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { collection, doc, getDocs, setDoc, query, where } from 'firebase/firestore';

const { Title, Text } = Typography;

export default function Login() {
    const [isMounted, setIsMounted] = useState(false);
    const [loading, setLoading] = useState(false);
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        setIsMounted(true);
        return () => { setIsMounted(false) }
    }, [])

    const handleLogin = useCallback(async () => {
        setLoading(true);
        try {
            const usersRef = collection(db, 'users');
            const res = await signInWithPopup(getAuth(), new GoogleAuthProvider())
            const user = res.user;
            const userQuery = query(usersRef, where('uid', '==', user.uid));
            const querySnapshot = await getDocs(userQuery);

            // Add user to db if they don't exist
            if (querySnapshot.empty) {
                console.log("Adding user")
                await setDoc(doc(db, 'users', user.uid), {
                    uid: user.uid,
                    name: user.displayName,
                    authProvider: "google",
                    email: user.email,
                    admin: false
                });
            }
            console.log('Sign in with Google succeeded.');
        } catch (error) {
            console.log('Sign in with Google failed.', error.message);
        }

        if (isMounted) setLoading(false);
        navigate('/');
    }, [isMounted, navigate])

    return (
        <div className='flex-col flex-center w-100 h-100'>
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
        </div>
    )
}
