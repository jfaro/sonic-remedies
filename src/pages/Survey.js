import { useState, useEffect } from 'react';
import { Form, Input, Button, Space, Typography, Spin, Radio } from 'antd';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../services/firebase';
import { CirclePicker } from 'react-color';
import AudioPlayer from '../components/AudioPlayer';

const { Title } = Typography;

const Question = ({ prompt, type, questionOptions }) => {

    let formItem = null;

    switch (type) {
        case 'text':
            formItem = <Input.TextArea />
            break;

        case 'singleSelect':
            const sOptions = questionOptions.map((option, idx) => {
                console.log(option)
                return <Radio value={idx}>{option.optionText}</Radio>
            });

            formItem = (
                < Radio.Group >
                    <Space direction="vertical">
                        {sOptions}
                    </Space>
                </Radio.Group >
            )
            break;
        case 'multipleSelect':
            const options = questionOptions.map((option, idx) => {
                console.log(option)
                return <Radio value={idx}>{option.optionText}</Radio>
            });

            formItem = (
                < Radio.Group >
                    <Space direction="vertical" size={'small'}>
                        {options}
                    </Space>
                </Radio.Group >
            )
            break;
        case 'color':
            formItem = <CirclePicker />;
    }

    return (
        <Form.Item
            label={prompt}>
            {formItem}
        </Form.Item>
    )
}

export default function Survey() {
    const [form] = Form.useForm();
    const [surveyQuestions, setSurveyQuestions] = useState();

    // Load active survey
    useEffect(() => {
        const surveysRef = collection(db, 'surveys');
        const q = query(surveysRef, where('active', '==', true));

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            querySnapshot.forEach(document => {
                const data = document.data();
                setSurveyQuestions(data.questions);
                console.log("Loaded survey:", data.questions);
            })
        })
        return () => unsubscribe();
    }, [])


    return (
        <div className="flex-col flex-center w-100 h-100">

            <Form
                name='survey'
                layout='vertical'>
                {surveyQuestions?.map(({ prompt, type, questionOptions }, idx) => {
                    return (
                        <Question
                            key={idx}
                            prompt={prompt}
                            type={type}
                            questionOptions={questionOptions}
                        />
                    )
                })}
            </Form>

        </div>
    )
}
