/* eslint-disable default-case */
import { Form, Input, Button, InputNumber, TimePicker, Cascader, Radio, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useAuth } from "../contexts/AuthContext";
import { db } from '../services/firebase';
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

/**
 * This component, MusicForm, is used as part of the administrative half of the site.
 * It is used to submit new song samples into the database.
 */
export default function MusicForm() {
    const storage = getStorage();
    let fixedLength = "";

    const onFinish = async (values) => {
        // Add time added to the values object
        let current = new Date();
        values.timeAdded = current.getFullYear() + '-'
            + (current.getMonth() + 1) + '-'
            + current.getDate() + ' '
            + current.getHours() + ":"
            + current.getMinutes() + ":"
            + current.getSeconds();
        // Add and cleanup the values object for better readability and usability
        values.admin = user.displayName;
        values.genre = values.genre.split(",").map(s => s.trim());
        values.length = fixedLength;

        // Upload song into Firebase Storage
        values.filename = values.file.file.name;
        const uploadTask = uploadBytesResumable(ref(storage, 'songs/' + values.filename), values.file.file);
        uploadTask.on('state_changed',
            (snapshot) => {
                console.log("Uploading file!");
            },
            (error) => {
                // A full list of error codes is available at
                // https://firebase.google.com/docs/storage/web/handle-errors
                switch (error.code) {
                    case 'storage/unauthorized':
                        console.log("User doesn't have permission to access Storage");
                        break;
                    case 'storage/canceled':
                        console.log("User canceled upload");
                        break;
                    case 'storage/unknown':
                        console.log("User encountered unknown error");
                        break;
                }
            },
            () => {
                // Upload completed successfully, now we can get the download URL
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log('File available at', downloadURL);
                    values.url = downloadURL;
                });
            }
        );
        delete values.file;

        // Create a document ID of lowercase title with spaces replaced by -
        let title = values.title.toLowerCase().replace(/ /g, "-").trim();
        console.log(title);

        try {
            const docRef = doc(db, "songs", title);
            await setDoc(docRef, values);
            console.log("Document written with ID: ", docRef.id);
            console.log("Success:", values);
        } catch (e) {
            console.error("Error adding document: ", e);
            console.log("Failure:", values);

            // Cancel upload to Storage if Firestore fails
            uploadTask.cancel();

        }
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

    const uploadOptions = {
        name: 'file',
        onChange(info) {
            console.log(info.file, info.fileList);
        },
    };

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
                label="File Submission"
                name="file"
                rules={[
                    {
                        required: true,
                        message: "Please submit a file!",
                    },
                ]}
            >
                <Upload {...uploadOptions} beforeUpload={() => false} maxCount={1}>
                    <Button icon={<UploadOutlined />}>Click to Upload</Button>
                </Upload>
            </Form.Item>

            <Form.Item
                label="Track Title"
                name="title"
                rules={[{
                    required: true,
                    message: "Please give the track's title!",
                }]}>
                <Input />
            </Form.Item>

            <Form.Item
                label="Track Length"
                name="length"
                rules={[{
                    required: true,
                    message: "Please give the track's length!",
                }]}>
                <TimePicker format={'HH:mm'} showNow={false} onChange={onTimeChange} />
            </Form.Item>

            <Form.Item
                label="Artist Name"
                name="artist"
                rules={[{
                    required: true,
                    message: "Please give the track's artist!",
                }]}>
                <Input />
            </Form.Item>

            <Form.Item
                label="Album Title"
                name="album"
                rules={[{
                    required: true,
                    message: "Please give the album's name!",
                }]}>
                <Input />
            </Form.Item>

            <Form.Item
                label="Genre"
                name="genre"
                rules={[{
                    required: true,
                    message: "Please give the track's genre!",
                }]}>
                <Input />
            </Form.Item>

            <Form.Item
                label="Track Tempo"
                name="tempo"
                rules={[{
                    required: true,
                    message: "Please give the track's tempo!",
                }]}>
                <InputNumber />
            </Form.Item>

            <Form.Item
                label="Key and Mode"
                name="key"
                rules={[{
                    required: true,
                    message: "Please give the track's key and mode!",
                }]}>
                <Cascader options={keyOptions} placeholder="Please select" />
            </Form.Item>

            <Form.Item
                label="Consistent Texture"
                name="texture"
                rules={[{
                    required: true,
                    message: "Please indicate if the track has a consistent texture!",
                }]}>
                <Radio.Group>
                    <Radio.Button value="y">Yes</Radio.Button>
                    <Radio.Button value="n">No</Radio.Button>
                </Radio.Group>
            </Form.Item>

            <Form.Item
                label="Improvisation"
                name="improv"
                rules={[{
                    required: true,
                    message: "Please indicate if >50% of the song is improvised!",
                }]}>
                <Radio.Group>
                    <Radio.Button value="y">Yes</Radio.Button>
                    <Radio.Button value="n">No</Radio.Button>
                </Radio.Group>
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
}

