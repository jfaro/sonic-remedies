import { db } from '../../services/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Button, Card, Col, Row, Space, Typography } from "antd";
const { Title, Text } = Typography;

const SurveyTile = ({ surveyData }) => {
    const { title, questions, responses } = surveyData;
    return (
        <Card hoverable style={{ width: '100%' }}>
            <Space direction="vertical">
                <Title level={2}>{title}</Title>

                <Title level={3}>Questions</Title>
                show all questions

                {questions.map((question, idx) => {
                    return (
                        <Space direction="vertical">
                            <Text>Prompt: {question.prompt}</Text>
                            <Text>Response Type: {question['response-type']}</Text>
                        </Space>
                    )
                })}

                <Title level={3}>Responses: {responses ? responses.length : 0}</Title>
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

    console.log(surveys);

    return (
        <>
            <Space direction='vertical' align='center'>
                <Title>Surveys</Title>
                <Row>
                    {surveys.length > 0 ? surveys.map((survey, idx) => {
                        return (
                            <Col key={idx} xs={24} sm={12} >
                                <SurveyTile surveyData={survey} />
                            </Col>
                        )
                    }) : "No surveys found!"}
                </Row>
                <Button type='primary' >Create new survey</Button>
            </Space>
        </>
    )
}
