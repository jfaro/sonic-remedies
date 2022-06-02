import { useState, useEffect } from 'react';
import { 
    Button, 
    Form, 
    Input, 
    Select, 
    Row, 
    Col 
} from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { formatTitle } from 'services/firestore';

const { Option } = Select;

const requirementTypes = [
    { key: 'lengthMax', label: 'Song Length (Max)' },
    { key: 'lengthMin', label: 'Song Length (Min)' },
    { key: 'require', label: 'Song Qualities' }
]

const qualities = [
    { key: 'texture', label: 'Consistent Texture' },
    { key: 'improv', label: 'Improvisation' }
]

const SurveyRequirements = () => {


    return (
        <Form.List name='requirements'>

            {/* For each added set, do the following... */}
            {(reqs, { add, remove }) => {
                return (
                    <div>
                        {reqs.map((req, reqIndex) => {
                            return (
                                <>
                                    {/* Begin render for a single set */}
                                    <Row gutter={24} align='bottom'>
                                        {/* Choose question set */}
                                        <Col>
                                            <Form.Item
                                                {...req}
                                                name={[reqIndex, 'type']}
                                                rules={[{
                                                    required: true,
                                                    message: 'Missing response type'
                                                }]}>
                                                <Select style={{ width: '200px' }}>
                                                    {(requirementTypes.map((type, idx) => (
                                                        <Option key={idx} value={type.key}>
                                                            {type.label}
                                                        </Option>
                                                    )))}
                                                </Select>
                                            </Form.Item>
                                        </Col>

                                        {/* Should the question set have music with it */}
                                        <Col>
                                            <Form.Item
                                                {...req}
                                                name={'max'}
                                                >
                                                <Input placeholder="Length in Seconds" />
                                            </Form.Item>
                                        </Col>

                                        {/* Remove this question */}
                                        <Col>
                                            <Form.Item>
                                                <MinusCircleOutlined onClick={() => remove(reqIndex)} />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </>
                            )
                        })}
                        {/* Add new question */}
                        <Form.Item>
                            <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                Add survey requirement
                            </Button>
                        </Form.Item>
                    </div>

                )
            }}

        </Form.List>
    )
}

export default SurveyRequirements;