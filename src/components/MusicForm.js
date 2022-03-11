import { Form, Input, Button, InputNumber, TimePicker, Cascader, Radio } from "antd";
import { useAuth } from "../contexts/AuthContext";
import { getDatabase, ref, set } from "firebase/database";

/**
 * This component, MusicForm, is used as part of the administrative half of the site.
 * It is used to submit new song samples into the database.
 */
export default function MusicForm() {
    const database = getDatabase();
    let fixedLength = "";

    const onFinish = (values) => {
        // Time added to database
        let current = new Date(); 
        let datetime = current.getFullYear() + '-' 
                        + (current.getMonth() + 1) + '-' 
                        + current.getDate() + ' ' 
                        + current.getHours() + ":" 
                        + current.getMinutes() + ":" 
                        + current.getSeconds();
        values.timeAdded = datetime;
        // User adding to database
        values.admin = user.displayName;
        // Cleanup and modification
        values.genre = values.genre.split(",").map(s => s.trim());
        values.length = fixedLength;
        let file = values.filename.split('.')[0];

        set(ref(database, 'pieces/' + file), values);

        console.log("Success:", values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };

    const onTimeChange = (time, timeString) => {
        fixedLength = timeString
    }

    const modeOptions = [
        {
            value: 'major',
            label: 'Major'
        },
        {
            value: 'minor',
            label: 'Minor'
        },
        {
            value: 'dorian',
            label: 'Dorian'
        },
        {
            value: 'phrygian',
            label: 'Phrygian'
        },
        {
            value: 'lydian',
            label: 'Lydian'
        },
        {
            value: 'mixolydian',
            label: 'Mixolydian'
        },
        {
            value: 'aeolian',
            label: 'Aeolian'
        },
        {
            value: 'locrian',
            label: 'Locrian'
        },
    ]

    const keyOptions = [
    {
        value: 'a',
        label: 'A',
        children: modeOptions,
    },
    {
        value: 'aSharp',
        label: 'A♯',
        children: modeOptions,
    },
    {
        value: 'bFlat',
        label: 'B♭',
        children: modeOptions,
    },
    {
        value: 'b',
        label: 'B',
        children: modeOptions,
    },
    {
        value: 'c',
        label: 'C',
        children: modeOptions,
    },
    {
        value: 'cSharp',
        label: 'C♯',
        children: modeOptions,
    },
    {
        value: 'dFlat',
        label: 'D♭',
        children: modeOptions,
    },
    {
        value: 'd',
        label: 'D',
        children: modeOptions,
    },
    {
        value: 'dSharp',
        label: 'D♯',
        children: modeOptions,
    },
    {
        value: 'eFlat',
        label: 'E♭',
        children: modeOptions,
    },
    {
        value: 'e',
        label: 'E',
        children: modeOptions,
    },
    {
        value: 'f',
        label: 'F',
        children: modeOptions,
    },
    {
        value: 'fSharp',
        label: 'F♯',
        children: modeOptions,
    },
    {
        value: 'gFlat',
        label: 'G♭',
        children: modeOptions,
    },
    {
        value: 'g',
        label: 'G',
        children: modeOptions,
    },
    {
        value: 'gSharp',
        label: 'G♯',
        children: modeOptions,
    },
    {
        value: 'aFlat',
        label: 'A♭',
        children: modeOptions,
    },
    ];

    const { user } = useAuth();

    return (
        <Form
        name="musicForm"
        requiredMark={false}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{
            remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        style={{ width: '50%', maxWidth: '35rem' }}
        >
        <Form.Item
            label="File Name"
            name="filename"
            rules={[
            {
                required: true,
                message: "Please give a valid file name!",
            },
            ]}
        >
            {/* TODO: This needs to be changed to a custom Upload component */}
            <Input />
        </Form.Item>

        <Form.Item
            label="Track Title"
            name="title"
            rules={[
            {
                required: true,
                message: "Please give the track's title!",
            },
            ]}
        >
            <Input />
        </Form.Item>

        <Form.Item
            label="Track Length"
            name="length"
            rules={[
            {
                required: true,
                message: "Please give the track's length!",
            },
            ]}
        >
            <TimePicker format={'HH:mm'} showNow={false} onChange={onTimeChange}/>
        </Form.Item>

        <Form.Item
            label="Artist Name"
            name="artist"
            rules={[
            {
                required: true,
                message: "Please give the track's artist!",
            },
            ]}
        >
            <Input />
        </Form.Item>

        <Form.Item
            label="Album Title"
            name="album"
            rules={[
            {
                required: true,
                message: "Please give the album's name!",
            },
            ]}
        >
            <Input />
        </Form.Item>

        <Form.Item
            label="Genre"
            name="genre"
            rules={[
            {
                required: true,
                message: "Please give the track's genre!",
            },
            ]}
        >
            <Input />
        </Form.Item>
            
        <Form.Item
            label="Track Tempo"
            name="tempo"
            rules={[
            {
                required: true,
                message: "Please give the track's tempo!",
            },
            ]}
        >
            <InputNumber />
        </Form.Item>

        <Form.Item
            label="Key and Mode"
            name="key"
            rules={[
            {
                required: true,
                message: "Please give the track's key and mode!",
            },
            ]}
        >
            <Cascader options={keyOptions} placeholder="Please select" />
        </Form.Item>

        <Form.Item
            label="Consistent Texture"
            name="texture"
            rules={[
            {
                required: true,
                message: "Please indicate if the track has a consistent texture!",
            },
            ]}
        >
            <Radio.Group>
                <Radio.Button value="y">Yes</Radio.Button>
                <Radio.Button value="n">No</Radio.Button>
            </Radio.Group>
        </Form.Item>

        <Form.Item
            label="Improvisation"
            name="improv"
            rules={[
            {
                required: true,
                message: "Please indicate if >50% of the song is improvised!",
            },
            ]}
        >
            <Radio.Group>
                <Radio.Button value="y">Yes</Radio.Button>
                <Radio.Button value="n">No</Radio.Button>
            </Radio.Group>
        </Form.Item>

        <Form.Item
            wrapperCol={{
            offset: 8,
            span: 16,
            }}
        >
            <Button type="primary" htmlType="submit">
            Submit
            </Button>
        </Form.Item>
        </Form>
    );
}

