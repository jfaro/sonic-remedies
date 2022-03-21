import { Space, Typography } from "antd"
import MusicForm from "../components/MusicForm";

const { Title } = Typography;

export default function Admin() {
    return (
        <>
            <Title>Admin</Title>
            <Space direction='vertical' align='center' size='large'>
                <MusicForm />
            </Space>
        </>
    )
}
