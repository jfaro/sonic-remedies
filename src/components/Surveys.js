import { db } from '../services/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Card, Col, Row, Space, Typography } from "antd";
const { Title } = Typography;

const SurveyTile = ({ surveyData }) => {
    const { title, questions, responses } = surveyData;
    return (
        <Card title={title} hoverable={true} style={{ height: '100%' }}>
            <Space direction='vertical'>
                <Title level={5}>Questions: {questions ? questions.length : 0}</Title>
                <Title level={5}>Responses: {responses ? responses.length : 0}</Title>
            </Space>
        </Card>
    )
}

export default function Surveys() {

    const [surveys, setSurveys] = useState([]);

    useEffect(() => {
        fetchSurveys();
    }, [])

    async function fetchSurveys() {
        setSurveys([])
        const querySnapshot = await getDocs(collection(db, 'surveys'));
        querySnapshot.forEach(document => {
            const data = document.data();
            setSurveys(arr => [...arr, data]);
        })
    }

    return (
        <Row gutter={24}>
            {surveys.length > 0 ? surveys.map((survey, idx) => {
                return (
                    <Col key={idx} xs={24} sm={12} md={8} lg={6} >
                        <SurveyTile surveyData={survey} key={idx} />
                    </Col>
                )
            }) : "No surveys found!"}
        </Row>
    )
}
