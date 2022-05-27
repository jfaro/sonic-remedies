import { Button, Form, Input, Row, Col } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

const CreateSurveyQuestionOptions = ({ form, questionIndex }) => {

    const questionTypesWithOptions = ['singleSelect', 'multipleSelect'];

    return (
        < Form.Item shouldUpdate noStyle >
            {() => {
                const currentSelection = form.getFieldValue("questions")[questionIndex]?.type;
                if (!questionTypesWithOptions.includes(currentSelection)) {
                    return null;
                }
                return (

                    <Form.List name={[questionIndex, 'questionOptions']} >

                        {(questionOptions, { add, remove }) => {
                            return (
                                <div style={{ paddingLeft: '64px' }}>
                                    {questionOptions.map((questionOption, optionIndex) => {
                                        return (
                                            // Begin render for a single option
                                            <>

                                                <Row gutter={24} align='middle'>

                                                    {/* Question prompt */}
                                                    <Col flex='auto'>
                                                        <Form.Item
                                                            {...questionOption}
                                                            name={[questionOption.name, 'optionText']}
                                                            label={`Option ${optionIndex + 1}`}
                                                            rules={[{ required: true, message: 'Missing option text' }]}
                                                        >
                                                            <Input style={{ width: '100%' }} />
                                                        </Form.Item>
                                                    </Col>

                                                    {/* Remove this option */}
                                                    <Col>
                                                        <Form.Item>
                                                            <MinusCircleOutlined onClick={() => remove(questionOption.name)} />
                                                        </Form.Item>
                                                    </Col>
                                                </Row>
                                            </>
                                        )
                                    })}

                                    {/* Add new option */}
                                    <Form.Item>
                                        <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                            Add option
                                        </Button>
                                    </Form.Item>
                                </div>
                            )
                        }}
                    </Form.List>
                )
            }}
        </Form.Item >
    )
}

export default CreateSurveyQuestionOptions