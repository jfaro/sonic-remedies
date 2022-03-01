import { Link } from "react-router-dom";
import { Button } from 'antd';
import { useAuth } from "../contexts/AuthContext";

export default function Home() {
    const { user } = useAuth();

    return (
        <>
            <h1>Sonic Remedies</h1>

            {/* User greeting */}
            {user && <p>Hello, {user.displayName}!</p>}

            <p style={{ maxWidth: '400px', textAlign: 'center' }}>
                Sonic remedies is a data collection tool that aims to learn how to create personalized therapeutic audio.
            </p>
            <Link to="/survey">
                <Button type="primary">Take the survey!</Button>
            </Link>
        </>
    )
}
