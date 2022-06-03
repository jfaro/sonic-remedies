import { useState, useEffect } from 'react';
import { db } from '../../../services/firebase';
import { collection, query, onSnapshot } from 'firebase/firestore';
import {
    Button,
    Divider,
    Form,
    Modal,
    Typography
} from "antd";
import moment from 'moment';

const { Title } = Typography;

export default function ViewQuestionSet({ setData, setPath }) {

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [questions, setQuestions] = useState([]);

    const [form] = Form.useForm();

    // Gets current questions of question set from Firestore
    useEffect(() => {
        const q = query(collection(db, `${setPath}/questions`));
        const getQuestions = onSnapshot(q, (querySnapshot) => {
            setIsLoading(true);
            const questList = [];
            querySnapshot.forEach(document => {
                const data = document.data();
                questList.push(data);
            })
            setQuestions(questList);
            setIsLoading(false);
        })
        return () => getQuestions();
    }, []);

    /**
     * This is a carryover function from CreateSurvey.js,
     * this is where code to submit edits to the questions should go
     * when that gets implemented
     */
    const handleSubmit = async () => {
        setIsLoading(false);
        resetModal();
        setIsModalVisible(false);
    }

    // Cancel edits to question set
    const handleCancel = () => {
        resetModal();
        setIsModalVisible(false);
    }

    // Reset modal to how it appears when freshly opened on page load
    const resetModal = () => {
        form.resetFields();
    }

    // Converts question data into an unordered list
    const printQuestion = (question) => {
        const { prompt, type, options } = question;

        if (options !== undefined)
        {
            return(
                <li>
                    [{type}] {prompt} 
                    <ul>
                        {options.map(o => <li>{o}</li>)}
                    </ul>
                </li>
            )
        }
        return(
            <li>[{type}] {prompt}</li>
        );
    }

    return (
        <>
            <Button onClick={() => setIsModalVisible(true)}>
                View/Edit
            </Button>
            <Modal
                title={setData.title}
                visible={isModalVisible}
                okText='OK'
                onOk={handleSubmit}
                onCancel={handleCancel}
                confirmLoading={isLoading}
                width={800}>
                <Title level={4}>Question Set Details</Title>
                <p>
                    <b>Admin Added:</b> {setData.admin} <br />
                    <b>Date Added:</b> {moment(setData.dateAdded, moment.ISO_8601).format("M/D/YYYY, h:mm:ss a")}
                </p>
                <Divider></Divider>
                <Title level={4}>Questions</Title>
                <ul>{questions.map(item => printQuestion(item))}</ul>
            </Modal>
        </>
    )
}