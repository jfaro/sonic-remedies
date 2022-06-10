import { 
    Button, 
    Form, 
    Input, 
    Select, 
    Row, 
    Col 
} from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

const { Option } = Select;

const requirementTypes = [
    { key: 'lengthLonger', label: 'Length Longer Than' },
    { key: 'lengthShorter', label: 'Length Shorter Than' },
    { key: 'require', label: 'Song Qualities' }
]

/**
 * TODO: This array should be used like requirementTypes in a dropdown selector
 * to choose whether or not a number of songs in the generated survey playlist should
 * be required to have Consistent Texture or Improvisation as listed in the track database.
 * 
 * These are currently unimplemented, see below (line 106)
 */
/*
const qualities = [
    { key: 'texture', label: 'Consistent Texture' },
    { key: 'improv', label: 'Improvisation' }
]
*/

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
                                        {/* Choose requirement */}
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
                                                {/**
                                                 * TODO: Figure out a way to use TimePicker here instead of Input, so that users
                                                 * can input using mm:ss format rather than time in seconds. The issue is that TimePicker's
                                                 * value is in moment.js format, and that is unsupported by Firebase.
                                                 * 
                                                 * I had previously overcome this when developing UploadTrack.js, but it relied on updaing a variable
                                                 * using the output of onChange, which in this cause would then need to be sent to the parent component in
                                                 * CreateSurvey.js.
                                                 */}
                                                {/*<TimePicker format={'mm:ss'} placeholder="Song Length" showNow={false}/>*/}
                                                <Input placeholder="Length in Seconds" />
                                            </Form.Item>
                                        </Col>

                                        {/* Option for qualities in track */}
                                        {/**
                                         * TODO: Here is the code to implement the dropdown for requiring certain qualities
                                         * of songs to be represented in the playlist. This is currently commented out since I was unable
                                         * to find a way to cleanly render either this form item or the time form item conditionally
                                         * based on what was selected as the requirement.
                                         * 
                                         * In short, if "Length Longer Than/Shorter Than" is selected as a requirement, than the 
                                         * form item for length of music should show up. If "Song Qualities" is selected, this form item
                                         * should show up instead.
                                         */}
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