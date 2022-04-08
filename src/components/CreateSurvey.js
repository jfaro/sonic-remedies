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
    Typography
} from "antd";
import { useAuth } from '../services/firebase';
import { addSurvey } from '../services/firestore';
import Questions from './CreateSurveyQuestions';

const { Option } = Select;
const { Title } = Typography;


export default function CreateSurvey() {
    const date = new Date();
    const { user } = useAuth();

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [questions, setQuestions] = useState([]);
    const [includedSongs, setIncludedSongs] = useState([]);

    const [surveyForm] = Form.useForm();
    const [addQuestionForm] = Form.useForm();

    // Create new survey
    const handleSubmit = async () => {
        try {
            // Form validation
            const formValues = await surveyForm.validateFields();

            // Format new survey data
            const surveyValues = {
                title: formValues.title,
                active: false,
                questions: questions,
                responses: [],
                trackIds: [],   // TODO: Add included track IDs
                createdBy: user.displayName,
                createdOn: date.toISOString()
            }

            // Add survey in Firestore /surveys collection
            addSurvey(surveyValues);

            // Cleanup
            setIsLoading(false);
            resetModal();
            setIsModalVisible(false);
        } catch (error) {
            console.log("Error submitting form:", error);
        }
    }

    // Cancel creation of new survey
    const handleCancel = () => {
        resetModal();
        setIsModalVisible(false);
    }

    // Add a new question to the survey
    const addQuestion = async () => {
        let questionValues;
        try {
            questionValues = await addQuestionForm.validateFields();
        } catch (error) {
            return;
        }

        // Add new question to questions array
        questionValues.idx = questions.length;
        const updatedQuestions = [...questions, questionValues];
        setQuestions(updatedQuestions);

        // Reset form
        addQuestionForm.resetFields();
    }

    // Remove a question from the survey
    const removeQuestion = (questionIdx) => {
        const updatedQuestions = questions.filter(q => q.idx !== questionIdx);

        // Update question indices
        updatedQuestions.forEach((question, idx) => {
            question.idx = idx
        })
        setQuestions(updatedQuestions);
    }

    // Reset modal to how it appears when freshly opened on page load
    const resetModal = () => {
        surveyForm.resetFields();
        addQuestionForm.resetFields();
        setQuestions([]);
    }

    return (
        <>
            <Button type='primary' onClick={() => setIsModalVisible(true)}>
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
                <Form
                    layout='vertical'
                    form={surveyForm}
                    requiredMark={false}>
                    <Form.Item
                        name='title'
                        rules={[{
                            required: true,
                            message: "Provide a title for this survey",
                        }]}>
                        <Input placeholder="Enter a title for this survey" />
                    </Form.Item>
                </Form>

                <Divider />

                {/* Render all questions */}
                <Title level={5}>Questions</Title>
                <Questions questions={questions} removeQuestion={removeQuestion} />
                <Divider />

                {/* Add a question to the survey */}
                <Title level={5}>Add a question</Title>
                <Form
                    layout='vertical'
                    form={addQuestionForm}
                    initialValues={{ type: 'text' }}
                    requiredMark={false}>
                    <Row gutter={24} align='bottom'>
                        <Col span={12}>
                            <Form.Item
                                name='prompt'
                                label="Prompt"
                                rules={[{
                                    required: true,
                                    message: "Provide a prompt for this question",
                                }]}>
                                <Input placeholder="Enter a prompt" />
                            </Form.Item>
                        </Col>
                        <Col flex='auto'>
                            <Form.Item name='type' label='Response type'>
                                <Select style={{ width: '100%' }}>
                                    <Option value='text'>Text</Option>
                                    <Option value='color'>Color</Option>
                                    <Option value='bool'>Yes / No</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col>
                            <Form.Item>
                                <Button onClick={addQuestion}>Add question</Button>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>

                <Divider />

                {/* Select songs for this survey */}
                <Title level={5}>Included tracks</Title>
                <List
                    dataSource={includedSongs}
                    renderItem={({ idx, title, length }) => (
                        <List.Item>
                            {title}
                        </List.Item>
                    )}
                />
            </Modal>
        </>
    )
}