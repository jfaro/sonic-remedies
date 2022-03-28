import React from 'react';
import { Form, Input, Button, Space, Typography } from 'antd';
import AudioPlayer from '../components/AudioPlayer';

const { Title } = Typography;

export default function Survey() {
    const [form] = Form.useForm();

    const surveyData = [
        {
            songData: {

            },
            questions: [
                {
                    responseType: 'text',
                    label: 'What did the track make you think of?'
                },
                {
                    responseType: 'number',
                    label: 'How would you rate this track?'
                }
            ]
        }
    ]

    return (
        <div className="flex-col flex-center w-100 h-100">
            <Title>Survey</Title>

            <Space direction='vertical' align='center' size='large'>
                <div style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    marginBottom: '2rem'
                }}>
                    <AudioPlayer />
                </div>
                <Form
                    layout='vertical'
                    form={form}>
                    <Form.Item label="What did you hear?" name="q1">
                        <Input placeholder='Enter a response' />
                    </Form.Item>
                    <Form.Item label="Question 2 can go here!" name="q2">
                        <Input placeholder='Enter a response' />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary">Submit</Button>
                    </Form.Item>
                </Form>
            </Space>
        </div>
    )
}
