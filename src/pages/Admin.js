import { Space, Typography } from "antd"
import MusicForm from "../components/MusicForm";
import MusicTable from "../components/MusicTable";

const { Title } = Typography;

export default function Admin() {
    return (
        <>
            <Title>Admin</Title>
            <Space direction='vertical' align='center' size='large'>
                <MusicForm />
                <MusicTable />
            </Space>
        </>
    )
}
