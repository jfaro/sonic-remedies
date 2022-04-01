import { useState } from 'react';
import {
    Button,
    Col,
    Divider,
    Form,
    Input,
    List,
    Modal,
    Row,
    Select,
    Space,
    Typography
} from "antd";
import { useAuth } from '../services/firebase';

const { Option } = Select;
const { Text, Title } = Typography;

const Question = ({ prompt, type }) => {
    return (
        <Row gutter={24} style={{ width: '100%' }}>
            <Col flex='auto'>
                {prompt}
            </Col>
            <Col span={6}>
                {type}
            </Col>
            <Col>
                <Button danger>Remove</Button>
            </Col>
        </Row>
    )
}

export default function CreateSurvey() {
    const { user } = useAuth();

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [surveyForm] = Form.useForm();
    const [addQuestionForm] = Form.useForm();
    const [questions, setQuestions] = useState([
        {
            prompt: 'What is your name',
            type: 'text'
        },
        {
            prompt: 'How old are you',
            type: 'text'
        },
        {
            prompt: 'What is your name',
            type: 'text'
        },
        {
            prompt: 'How old are you',
            type: 'text'
        }
    ]);

    // Create new survey
    const handleSubmit = async () => {

        try {
            const formValues = await surveyForm.validateFields();
            const survey = {
                title: formValues.title,
                questions: questions,
                createdBy: user.displayName
            }

            console.log("Survey:", survey)
            setIsLoading(false);
            setIsModalVisible(false);
        } catch (error) {
            console.log("Error submitting form:", error);
        }
    }

    const handleCancel = () => {
        setIsModalVisible(false);
    }

    return (
        <>
            <Button
                type='primary'
                onClick={() => setIsModalVisible(true)}>
                Create new survey
            </Button>

            <Modal
                title='Create a new survey'
                visible={isModalVisible}
                okText='Create survey'
                onOk={handleSubmit}
                onCancel={handleCancel}
                confirmLoading={isLoading}
                width={800}>

                {/* Set the survey's title */}
                <Title level={5}>Survey title</Title>
                <Form layout='vertical' form={surveyForm}>
                    <Form.Item name='title'>
                        <Input placeholder="Enter a title for this survey" />
                    </Form.Item>
                </Form>

                <Divider />

                {/* Render all questions */}
                <Title level={5}>Questions</Title>
                <div style={{
                    maxHeight: 160,
                    overflow: 'auto',
                    padding: '0 16px',
                    marginBottom: '16px',
                    borderRadius: '2px',
                    border: '1px solid rgba(140, 140, 140, 0.35'
                }}>
                    <List
                        dataSource={questions}
                        renderItem={question => (
                            <List.Item>
                                <Question
                                    prompt={question.prompt}
                                    questionType={question.type} />
                            </List.Item>
                        )}
                    />
                </div>

                {/* Add a question to the survey */}
                <Title level={5}>Add a question</Title>
                <Form layout='vertical' form={addQuestionForm}>
                    <Row gutter={24}>
                        <Col flex='auto'>
                            <Input placeholder="Enter a prompt" />
                        </Col>
                        <Col span={6}>
                            <Select style={{ width: '100%' }}>
                                <Option value='text'>Text</Option>
                                <Option value='color'>Color</Option>
                                <Option value='bool'>Yes / No</Option>
                            </Select>
                        </Col>
                        <Col>
                            <Button type='secondary'>Add question</Button>
                        </Col>
                    </Row>
                </Form>

                <Divider />

                {/* Select songs for this survey */}
                <Title level={5}>Included tracks</Title>
            </Modal>
        </>
    )
}