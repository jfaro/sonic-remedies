import { useState } from 'react';
import {
    Button,
    Divider,
    Form,
    Input,
    List,
    Modal,
    Typography
} from "antd";
import { useAuth } from '../../services/firebase';
import { addSurvey } from '../../services/firestore';
import CreateSurveyQuestions from './CreateSurveyQuestions';

const { Title } = Typography;

export default function CreateSurvey() {
    const date = new Date();
    const { user } = useAuth();

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [form] = Form.useForm();

    // Create new survey
    const handleSubmit = async () => {
        try {
            // Form validation
            const formValues = await form.validateFields();

            // Format new survey data
            const surveyValues = {
                ...formValues,
                active: false,
                responses: [],
                trackIds: [],   // TODO: Add included track IDs
                admin: user.displayName,
                dateAdded: date.toISOString()
            }

            // // Add survey in Firestore /surveys collection
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

    // Reset modal to how it appears when freshly opened on page load
    const resetModal = () => {
        form.resetFields();
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

                <Form
                    layout='horizontal'
                    form={form}
                    requiredMark={false}
                    style={{ width: '100%' }}>

                    {/* Select songs for this survey */}
                    <Title level={5}>Survey title</Title>
                    <Form.Item
                        name='title'
                        rules={[{ required: true, message: 'A title is required' }]}>
                        <Input placeholder="Enter a title for this survey" />
                    </Form.Item>

                    <Divider />

                    {/* Select songs for this survey */}
                    <Title level={5}>Questions</Title>
                    <CreateSurveyQuestions form={form} />
                </Form>
            </Modal>
        </>
    )
}