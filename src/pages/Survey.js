import { useState } from 'react';
import { Form, Input, Button } from 'antd';

export default function Survey() {
    const [form] = Form.useForm();
    return (
        <>
            <h1>Survey</h1>

            <div style={{ width: '100%', maxWidth: '400px' }}>
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

            </div>
        </>
    )
}
