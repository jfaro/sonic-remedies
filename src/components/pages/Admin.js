import { Divider, Space, Typography, Row, Col } from "antd"
import MusicTable from "../admin/MusicTable";
import CreateSurvey from "../admin/CreateSurvey";
import CreateQuestionSet from "../admin/CreateQuestionSet";

const { Title } = Typography;

export default function Admin() {

    return (
        <div className="flex-col w-100">
            <Row>
                <Col span={12}>
                    <Title level={3}>Question Sets</Title>
                    <Space direction='vertical' size='large'>
                        <CreateQuestionSet />
                    </Space>
                </Col>
                <Col span={12}>
                    <Title level={3}>Surveys</Title>
                    <Space direction='vertical' size='large'>
                        <CreateSurvey />
                    </Space>
                </Col>
            </Row>


            <Divider />

            <Title level={3}>Uploaded Tracks</Title>
            <MusicTable />
        </div>
    )
}
