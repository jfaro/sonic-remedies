import { Divider, Space, Typography } from "antd"
import MusicTable from "../../components/MusicTable";
import UploadTrack from "../../components/UploadTrack";

const { Title } = Typography;

export default function Admin() {

    return (
        <div className="flex-col w-100 h-100">
            <Title>Admin Dashboard</Title>
            <Divider />
            <Space direction='vertical' align='start' size='large'>
                <Title level={3}>Uploaded Tracks</Title>
                <UploadTrack />
                <MusicTable />
            </Space>
        </div>
    )
}
