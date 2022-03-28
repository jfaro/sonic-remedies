import { Divider, Space, Typography } from "antd"
import MusicTable from "../components/MusicTable";
import UploadTrack from "../components/UploadTrack";
import Surveys from '../components/Surveys';
import CreateSurvey from "../components/CreateSurvey";

const { Title } = Typography;

export default function Admin() {

    return (
        <div className="flex-col w-100">

            <Title level={3}>Surveys</Title>
            <Space direction='vertical' size='large'>
                <CreateSurvey />
                <Surveys />
            </Space>

            <Divider />

            <Title level={3}>Uploaded Tracks</Title>
            <Space direction='vertical' size='large'>
                <UploadTrack />
                <MusicTable />
            </Space>
        </div>
    )
}
