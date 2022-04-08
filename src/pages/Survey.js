import React from 'react';
import { Form, Input, Button, Space, Typography } from 'antd';
import AudioPlayer from '../components/AudioPlayer';

const { Title } = Typography;

export default function Survey() {
    const [form] = Form.useForm();

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
                    <AudioPlayer song={"Test Song"} artist={"Test Artist"} url={"https://firebasestorage.googleapis.com/v0/b/sonic-remedies-dev.appspot.com/o/songs%2F13%20Wolves.mp3?alt=media&token=9a88abc9-df3a-4b16-8f30-30c42e2424ff"} orientation='column'/>
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
