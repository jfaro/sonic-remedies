import { useState, useEffect } from 'react';
import { 
    Button, 
    Form, 
    Checkbox, 
    Select, 
    Row, 
    Col 
} from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { formatTitle } from 'services/firestore';

const { Option } = Select;

const AddSetsToSurvey = ({ form, allSets }) => {
    const [setList, setSetList] = useState([]);

    useEffect(() => {
        setSetList([]);
        allSets.forEach(set => {
            const setData = {key: formatTitle(set.title), label: set.title};
            setSetList(arr => [...arr, setData]);
        });
    }, []);

    return (
        <Form.List name='questionSets'>

            {/* For each added set, do the following... */}
            {(sets, { add, remove }) => {
                return (
                    <div>
                        {sets.map((set, setIndex) => {
                            return (
                                <>
                                    {/* Begin render for a single set */}
                                    <Row gutter={24} align='bottom'>
                                        {/* Choose question set */}
                                        <Col>
                                            <Form.Item
                                                {...set}
                                                name={[setIndex, 'set']}
                                                rules={[{
                                                    required: true,
                                                    message: 'Missing response type'
                                                }]}>
                                                <Select style={{ width: '550px' }}>
                                                    {(setList.map((type, idx) => (
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
                                                {...set}
                                                name={[setIndex, 'playSong']}
                                                valuePropName="checked">
                                                <Checkbox>Play Song</Checkbox>
                                            </Form.Item>
                                        </Col>

                                        {/* Remove this question */}
                                        <Col>
                                            <Form.Item>
                                                <MinusCircleOutlined onClick={() => remove(setIndex)} />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </>
                            )
                        })}
                        {/* Add new question */}
                        <Form.Item>
                            <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                Add question set
                            </Button>
                        </Form.Item>
                    </div>

                )
            }}

        </Form.List>
    )
}

export default AddSetsToSurvey;