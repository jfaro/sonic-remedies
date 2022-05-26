import { useState } from 'react';
import {
    Button,
    Divider,
    Form,
    Input,
    Modal,
    Typography
} from "antd";
import { useAuth } from '../../services/firebase';
import { addQuestionSet } from '../../services/firestore';
import CreateQuestions from './CreateQuestions';

const { Title } = Typography;

export default function CreateQuestionSet() {
    const date = new Date();
    const { user } = useAuth();

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [form] = Form.useForm();

    // Create new question set
    const handleSubmit = async () => {
        try {
            // Form validation
            const formValues = await form.validateFields();

            // Format new survey data
            const surveyValues = {
                title: formValues.title,
                questions: modifyQuestions(formValues.questions),
                admin: user.displayName,
                dateAdded: date.toISOString(),
                questionCount: formValues.questions.length,
            }

            // Add survey in Firestore /questionSets collection
            addQuestionSet(surveyValues);

            // Cleanup
            setIsLoading(false);
            resetModal();
            setIsModalVisible(false);
        } catch (error) {
            console.log("Error submitting form:", error);
        }
    }

    // Convert questions from form values into IQuestion or IMultipleChoice format
    // Andrew Note: I'm gonna scream.
    const modifyQuestions = (questions) => {
        let count = 1;

        const modified = questions.map((question) => {
            const modQ = {
                idx: count,
                prompt: question.prompt,
                type: question.type,
            };

            if (question.type === "multipleSelect" || question.type === "singleSelect")
            {
                const qArray = question.questionOptions.map((opt) => {
                    return opt.optionText;
                });

                modQ.options = qArray;
            }

            count += 1;

            return modQ;
        });

        return modified;
    }

    // Cancel creation of new question set
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
                Create question set
            </Button>
            <Modal
                title='Create a question set'
                visible={isModalVisible}
                okText='Create question set'
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
                    <Title level={5}>Question Set Title</Title>
                    <Form.Item
                        name='title'
                        rules={[{ required: true, message: 'A title is required' }]}>
                        <Input placeholder="Enter a title for this question set" />
                    </Form.Item>

                    <Divider />

                    {/* Select songs for this survey */}
                    <Title level={5}>Questions</Title>
                    <CreateQuestions form={form} />
                </Form>
            </Modal>
        </>
    )
}