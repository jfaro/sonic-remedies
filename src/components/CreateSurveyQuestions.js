import { Button, List, Row, Col } from 'antd';

const Question = ({ idx, prompt, type, removeQuestion }) => {
    return (
        <Row gutter={24} style={{ width: '100%' }}>
            <Col span={12}>
                {prompt}
            </Col>
            <Col flex='auto'>
                {type}
            </Col>
            <Col>
                <Button danger onClick={() => removeQuestion(idx)}>Remove</Button>
            </Col>
        </Row>
    )
}

const Questions = ({ questions, removeQuestion }) => {
    return (
        <List
            dataSource={questions}
            renderItem={({ idx, prompt, type }) => (
                <List.Item>
                    <Question
                        idx={idx}
                        prompt={prompt}
                        type={type}
                        removeQuestion={removeQuestion} />
                </List.Item>
            )}
        />
    )
}

export default Questions;