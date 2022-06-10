import { useState, useEffect } from 'react';
import { db } from '../../../services/firebase';
import { collection, query, onSnapshot } from 'firebase/firestore';
import {
    Button,
    Divider,
    Form,
    Input,
    Modal,
    InputNumber,
    Typography
} from "antd";
import AddSetsToSurvey from './AddSetsToSurvey'
import SurveyRequirements from './SurveyRequirements'
import { useAuth } from '../../../services/firebase';
import { addSurvey } from '../../../services/firestore';
import { PlusOutlined } from '@ant-design/icons';

const { Title } = Typography;

export default function CreateSurvey() {
    const date = new Date();
    const { user } = useAuth();

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [allSets, setAllSets] = useState([]);
    /**
     * TODO:
     * I want to be able to get the list of questionSets from
     * AddSetsToSurvey while the list in that component is being
     * updated so that I can get the number of questions
     * that the whole survey has
     */
    //const [setList, setSetList] = useState([]);  

    const [form] = Form.useForm();

    useEffect(() => {
        const q = query(collection(db, 'questionSets'));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            setIsLoading(true);
            setAllSets([]);
            querySnapshot.forEach(document => {
                const data = document.data();
                setAllSets(arr => [...arr, data]);
            })
            setIsLoading(false);
        })
        return () => unsubscribe();
    }, []);

    // Create new survey
    const handleSubmit = async () => {
        try {
            // Form validation
            const formValues = await form.validateFields();

            // Format new survey data
            const surveyValues = {
                ...formValues,
                active: false,
                admin: user.displayName,
                dateAdded: date.toISOString(),
                responses: 0
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
            <Button
                icon={<PlusOutlined />}
                onClick={() => setIsModalVisible(true)}>
                Create survey
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

                    {/* Create Survey Metadata */}
                    <Title level={5}>Survey Data</Title>
                    <Form.Item
                        label="Survey Title"
                        name='title'
                        rules={[{ required: true, message: 'A title is required' }]}>
                        <Input placeholder="Enter a title for this survey" />
                    </Form.Item>
                    <Form.Item
                        label="Number of Tracks"
                        name='numTracks'
                        rules={[{ required: true, message: 'How many songs are in the survey?' }]}>
                        <InputNumber min={0} />
                    </Form.Item>
                    <Divider />

                    {/* Select Question Sets for Survey */}
                    <Title level={5}>Add Question Sets</Title>
                    <Title level={5} type="secondary">Pre-Music Section</Title>
                    <AddSetsToSurvey form={form} allSets={allSets} section="setsPre"/>
                    <Title level={5} type="secondary">Music Section</Title>
                    <AddSetsToSurvey form={form} allSets={allSets} section="setsMusic"/>
                    <Title level={5} type="secondary">Post-Music Section</Title>
                    <AddSetsToSurvey form={form} allSets={allSets} section="setsPost"/>
                    
                    <Divider />
                    
                    {/* Select Survey Criteria */}
                    <Title level={5}>Add Playlist Criteria</Title>
                    <SurveyRequirements form={form} />
                    {/* here should be a button to add a search criteria - set formats for each */}
                    {/* here should be a list of created criteria */}
                    {/* here should be a button to generate test playlists */}
                </Form>
            </Modal>
        </>
    )
}