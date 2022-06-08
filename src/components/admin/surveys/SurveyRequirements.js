import { useState, useEffect } from 'react';
import { 
    Button, 
    Form, 
    Input, 
    Select, 
    Row, 
    TimePicker,
    Col 
} from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { formatTitle } from 'services/firestore';

const { Option } = Select;

const requirementTypes = [
    { key: 'lengthLonger', label: 'Length Longer Than' },
    { key: 'lengthShorter', label: 'Length Shorter Than' },
    //{ key: 'require', label: 'Song Qualities' }
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
                                                }]}
                                                shouldUpdate={(prev, curr) =>
                                                    prev !== curr
                                                }>
                                                <Select style={{ width: '150px' }}>
                                                    {(requirementTypes.map((type, idx) => (
                                                        <Option key={idx} value={type.key}>
                                                            {type.label}
                                                        </Option>
                                                    )))}
                                                </Select>
                                            </Form.Item>
                                        </Col>
                                        
                                        {/* Option for number of songs */}
                                        <Col>
                                            <Form.Item
                                                {...req}
                                                name={[reqIndex, 'num']}
                                                style={{ width: '150px' }}
                                                rules={[{
                                                    required: true,
                                                    message: 'Missing response type'
                                                }]}
                                                >
                                                <Input placeholder="Number of Songs" />
                                            </Form.Item>
                                        </Col>

                                        {/* Option for length of music */}
                                        <Col>
                                            <Form.Item
                                                {...req}
                                                name={[reqIndex, 'time']}
                                                style={{ width: '150px' }}
                                                >
                                                {/*<TimePicker format={'mm:ss'} placeholder="Song Length" showNow={false}/>*/}
                                                <Input placeholder="Length in Seconds" />
                                            </Form.Item>
                                        </Col>

                                        {/* Option for qualities in track */}
                                        {/*
                                        <Col>
                                            <Form.Item
                                                {...req}
                                                name={[reqIndex, 'quality']}
                                                >
                                                <Select style={{ width: '150px' }}>
                                                    <Option value="improv">Improvisation</Option>
                                                    <Option value="texture">Texture</Option>
                                                </Select>
                                            </Form.Item>
                                        </Col>*/}

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