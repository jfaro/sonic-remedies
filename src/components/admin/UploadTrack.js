import { useState } from 'react';
import {
    Form,
    Input,
    Button,
    InputNumber,
    Cascader,
    Modal,
    Radio,
    Upload,
    Row,
    Col,
    Divider
} from "antd";
import { addToSongsCollection } from "../../services/firestore";
import { uploadSong } from '../../services/storage';
import { UploadOutlined } from "@ant-design/icons";
import { useAuth } from '../../services/firebase';
import { keyOptions } from "../../constants/keyOptions";

export default function UploadTrack() {
    const [form] = Form.useForm();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isUploading, setIsUploading] = useState(false);

    const { user } = useAuth();

    // Submit handler
    const handleSubmit = async () => {

        form.validateFields()
            .then(async (formValues) => {
                setIsUploading(true);

                // Upload to cloud storage
                const filename = formValues.file.file.name;
                const file = formValues.file.file;
                let downloadURL;
                try {
                    downloadURL = await uploadSong(filename, file);
                } catch (error) {
                    console.log("Error uploading", error)
                    setIsUploading(false);
                    return; // TODO: handle upload error
                }

                // Add song document to /songs collection in Firestore
                const current = new Date();
                const songDocument = { ...formValues };
                delete songDocument.file;
                const formattedValues = {
                    admin: user.displayName,
                    genre: formValues.genre.split(",").map(s => s.trim()),
                    dateAdded: current.toISOString(),
                    filename: filename,
                    improv: formValues.improv === "y",
                    texture: formValues.texture === "y",
                    url: downloadURL
                }
                Object.assign(songDocument, formattedValues);

                try {
                    await addToSongsCollection(songDocument);
                } catch (error) {
                    console.log("Error adding song to Firestore", error);
                }

                setIsUploading(false);
                setIsModalVisible(false);
            })
            .catch((error) => {
                console.log("Form validation error:", error)
            })
    }

    const handleCancel = () => {
        setIsModalVisible(false);
    }

    const uploadOptions = {
        name: 'file',
        // TODO: This console.log is for testing purposes to see what data is obtained from the uploaded file
        onChange(info) {
            console.log(info.file, info.fileList);
        },
    };

    const formGutter = 24;

    return (
        <>
            <Button type='primary' onClick={() => setIsModalVisible(true)}>Upload new track</Button>
            <Modal
                title='Upload new audio file'
                visible={isModalVisible}
                okText='Upload file'
                onOk={handleSubmit}
                onCancel={handleCancel}
                confirmLoading={isUploading}
                width={800}
            >

                {/* Begin of upload form code */}
                <Form
                    name="musicForm"
                    layout='vertical'
                    requiredMark={false}
                    form={form}>

                    {/* Row 1 - File upload */}
                    <Row gutter={formGutter}>

                        {/* Column 1 */}
                        <Col span={24} >
                            <Form.Item
                                label="File Submission"
                                name="file"
                                rules={[{
                                    required: true,
                                    message: "Please submit a file!",
                                }]}>
                                <Upload {...uploadOptions} beforeUpload={() => false} maxCount={1}>
                                    <Button icon={<UploadOutlined />}>Click to Upload</Button>
                                </Upload>
                            </Form.Item>
                        </Col>
                    </Row>

                    <Divider />

                    {/* Row 2 */}
                    <Row gutter={formGutter}>

                        {/* Column 1 - Name, Artist */}
                        <Col span={12}>
                            <Form.Item
                                label="Track Title"
                                name="title"
                                rules={[{ required: true, message: "Please give the track's title!" }]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                label="Artist Name"
                                name="artist"
                                rules={[{ required: true, message: "Please give the track's artist!" }]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>

                        {/* Column 2 - Album, Genre*/}
                        <Col span={12} >
                            <Form.Item
                                label="Album Title"
                                name="album"
                                rules={[{ required: true, message: "Please give the album's name!" }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="Genre"
                                name="genre"
                                rules={[{ required: true, message: "Please give the track's genre!" }]}>
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>

                    {/* Row 3 */}
                    <Row gutter={formGutter}>

                        {/* Column 1.1 - Track length */}
                        <Col span={6}>
                            <Form.Item
                                label="Track Length (in seconds)"
                                name="length"
                                rules={[{ required: true, message: "Please give the track's length!" }]}>
                                <InputNumber style={{ width: '100%' }} />
                            </Form.Item>
                        </Col>

                        {/* Column 1.2 - Track tempo */}
                        <Col span={6}>
                            <Form.Item
                                label="Track Tempo"
                                name="tempo"
                                rules={[{ required: true, message: "Please give the track's tempo!" }]}>
                                <InputNumber style={{ width: '100%' }} />
                            </Form.Item>
                        </Col>

                        {/* Column 2 - Key Signature and Musical mode */}
                        <Col span={12}>
                            <Form.Item
                                label="Key and Mode"
                                name="keySignature"
                                rules={[{ required: true, message: "Please give the track's key and mode!" }]}>
                                <Cascader options={keyOptions} placeholder="Please select" />
                            </Form.Item>
                        </Col>
                    </Row>

                    {/* Row 4 */}
                    <Row gutter={formGutter}>

                        {/* Column 1.1 - Consistent Texture */}
                        <Col span={6}>
                            <Form.Item
                                label="Consistent Texture"
                                name="texture"
                                rules={[{ required: true, message: "Please indicate if the track has a consistent texture!" }]}
                            >
                                <Radio.Group>
                                    <Radio.Button value="y">Yes</Radio.Button>
                                    <Radio.Button value="n">No</Radio.Button>
                                </Radio.Group>
                            </Form.Item>
                        </Col>

                        {/* Column 1.2 - Improvisation */}
                        <Col span={6}>
                            <Form.Item
                                label="Improvisation"
                                name="improv"
                                rules={[{ required: true, message: "Please indicate if >50% of the song is improvised!" }]}
                            >
                                <Radio.Group>
                                    <Radio.Button value="y">Yes</Radio.Button>
                                    <Radio.Button value="n">No</Radio.Button>
                                </Radio.Group>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form >
            </Modal>
        </>
    )
}
