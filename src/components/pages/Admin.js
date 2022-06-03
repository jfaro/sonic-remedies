import { Divider, Space, Typography, Row, Col } from "antd"
import MusicTable from "../admin/MusicTable";
import CreateSurvey from "../admin/CreateSurvey";
import CreateQuestionSet from "../admin/CreateQuestionSet";
import AllSurveys from "../admin/AllSurveys";
import styles from "./Admin.module.css";

const { Title } = Typography;

export default function Admin() {

    return (
        <div className="card">
            <Row gutter={32}>
                <Col span={12}>
                    <div className={styles.titleRow}>
                        <Title level={3}>Question Sets</Title>
                        <CreateQuestionSet />
                    </div>
                </Col>
                <Col span={12}>
                    <div className={styles.titleRow}>
                        <Title level={3}>Surveys</Title>
                        <CreateSurvey />
                    </div>
                    <AllSurveys />
                </Col>
            </Row>

            <Divider />

            <Title level={3}>Uploaded Tracks</Title>
            <MusicTable />
        </div>
    )
}
