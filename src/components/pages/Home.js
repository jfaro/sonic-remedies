import { Link } from "react-router-dom";
import { Button, Space, Typography } from "antd";
import { useAuth } from '../../services/firebase';

const { Title, Text } = Typography;

/**
 * Code for the home front page.
 */
export default function Home() {
    const { user } = useAuth();

    return (
        <div className="flex-col flex-center w-100 h-100">
            <Title>Sonic Remedies</Title>

            <Space direction='vertical' align='center' size='large'>
                {user && <Text>Hello, {user.displayName}!</Text>}

                <Text>Sonic remedies is a data collection tool that aims to learn how to create personalized therapeutic audio.</Text>
                <Link to="/survey">
                    <Button type="primary">Take the survey!</Button>
                </Link>
            </Space>
        </div>
    )
}
