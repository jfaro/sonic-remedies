import { db } from '../services/firebase';
import { collection, query, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Card, Col, Row, Space, Spin, Statistic, Tag, Typography } from "antd";
const { Title } = Typography;

const SurveyTile = ({ surveyData }) => {
    const { title, questions, responses, active } = surveyData;
    const status = active ? <Tag color="green">Active</Tag> : <Tag color="red">Inactive</Tag>

    return (
        <Card
            title={title}
            extra={status}
            hoverable={true}
            style={{ height: '100%' }}>
            <Space direction='vertical'>
                <Statistic title="Questions" value={questions.length} />
                <Statistic title="Responses" value={responses.length} />
            </Space>
        </Card>
    )
}

export default function Surveys() {

    const [surveys, setSurveys] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const q = query(collection(db, 'surveys'));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            setLoading(true);
            setSurveys([]);
            querySnapshot.forEach(document => {
                const data = document.data();
                setSurveys(arr => [...arr, data]);
            })
            setLoading(false);
        })
        return () => unsubscribe();
    }, [])

    if (loading) return <Spin />

    return (
        < Row gutter={24} >
            {surveys.length > 0 ? surveys.map((survey, idx) => {
                return (
                    <Col key={idx} xs={24} sm={12} md={8} lg={6} >
                        <SurveyTile surveyData={survey} key={idx} />
                    </Col>
                )
            }) : "No surveys found!"
            }
        </Row >
    )
}
