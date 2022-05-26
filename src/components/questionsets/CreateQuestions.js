import { Button, Form, Input, Select, Row, Col } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import CreateQuestionsOptions from './CreateQuestionsOptions';

const { Option } = Select;

const questionTypes = [
    { key: 'text', label: 'Text' },
    { key: 'color', label: 'Color' },
    { key: 'multipleSelect', label: 'Multiple select' },
    { key: 'singleSelect', label: 'Single select' }
]

const CreateQuestions = ({ form }) => {
    return (
        <Form.List name='questions'>

            {/* For each added question, do the following... */}
            {(questions, { add, remove }) => {
                return (
                    <div>
                        {questions.map((question, questionIndex) => {
                            return (
                                <>
                                    {/* Begin render for a single question */}
                                    <Row gutter={24} align='bottom'>

                                        {/* Question prompt */}
                                        <Col flex='auto'>
                                            <Form.Item
                                                {...question}
                                                label={`Question ${questionIndex + 1}`}
                                                name={[questionIndex, 'prompt']}
                                                rules={[{
                                                    required: true,
                                                    message: 'Missing prompt'
                                                }]}>
                                                <Input style={{ width: '100%' }} />
                                            </Form.Item>
                                        </Col>


                                        {/* Question type */}
                                        <Col>
                                            <Form.Item
                                                {...question}
                                                label="Response type"
                                                name={[questionIndex, 'type']}
                                                rules={[{
                                                    required: true,
                                                    message: 'Missing response type'
                                                }]}>
                                                <Select style={{ width: '200px' }}>
                                                    {(questionTypes.map((type, idx) => (
                                                        <Option key={idx} value={type.key}>
                                                            {type.label}
                                                        </Option>
                                                    )))}
                                                </Select>
                                            </Form.Item>
                                        </Col>

                                        {/* Remove this question */}
                                        <Col>
                                            <Form.Item>
                                                <MinusCircleOutlined onClick={() => remove(questionIndex)} />
                                            </Form.Item>
                                        </Col>
                                    </Row>

                                    {/* Question Options */}
                                    <CreateQuestionsOptions
                                        form={form}
                                        question={question}
                                        questionIndex={questionIndex} />
                                </>
                            )
                        })}
                        {/* Add new question */}
                        <Form.Item>
                            <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                Add question
                            </Button>
                        </Form.Item>
                    </div>

                )
            }}

        </Form.List>
    )
}

export default CreateQuestions;