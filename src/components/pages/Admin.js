import { Divider, Space, Typography } from "antd"
import MusicTable from "../admin/MusicTable";
import AllSurveys from '../admin/AllSurveys';
import CreateSurvey from "../admin/CreateSurvey";

const { Title } = Typography;

export default function Admin() {

    return (
        <div className="flex-col w-100">

            <Title level={3}>Surveys</Title>
            <Space direction='vertical' size='large'>
                <CreateSurvey />
                <AllSurveys />
            </Space>

            <Divider />

            <Title level={3}>Uploaded Tracks</Title>
            <MusicTable />
        </div>
    )
}
