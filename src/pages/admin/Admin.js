import { Space, Typography } from "antd"
import MusicTable from "../../components/MusicTable";
import UploadTrack from "../../components/UploadTrack";

const { Title } = Typography;

export default function Admin() {

    return (
        <>
            <Title>Admin</Title>
            <Space direction='vertical' align='start' size='large'>

                <Title level={3}>Uploaded Tracks</Title>
                <UploadTrack />
                <MusicTable />
            </Space>
        </>
    )
}
