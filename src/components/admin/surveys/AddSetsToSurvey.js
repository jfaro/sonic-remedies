import { useState, useEffect } from 'react';
import { 
    Button, 
    Form, 
    Select, 
    Row, 
    Col 
} from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { formatTitle } from 'services/firestore';

const { Option } = Select;

const AddSetsToSurvey = ({ form, allSets, section }) => {
    const [setList, setSetList] = useState([]);

    /**
     * Get a list of all existing question sets and format them for AntDesign <Select>
     * TODO: Currently, to avoid sets appearing multiple times, the setList is cleared and refilled every
     * rerender. If there's a way to have this run *only* at the start, then that line can be removed.
     */
    useEffect(() => {
        setSetList([]);
        allSets.forEach(set => {
            const setData = {key: formatTitle(set.title), label: set.title};
            setSetList(arr => [...arr, setData]);
        });
    }, []);

    return (
        <Form.List name={section}>

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
                                                name={setIndex}
                                                rules={[{
                                                    required: true,
                                                    message: 'Missing response type'
                                                }]}>
                                                <Select style={{ width: '700px' }}>
                                                    {(setList.map((type, idx) => (
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