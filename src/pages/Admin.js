import { Divider, Space, Typography } from "antd"
import MusicTable from "../components/MusicTable";
import AllSurveys from '../components/survey/AllSurveys';
import CreateSurvey from "../components/survey/CreateSurvey";

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
