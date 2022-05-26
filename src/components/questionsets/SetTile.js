import { Button, Card, Space, Statistic, Popconfirm, Divider } from "antd";
import ViewQuestionSet from "./ViewQuestions";

const SetTile = ({ setPath, setData, removeSet }) => {
    const { title, questionCount } = setData;

    const confirmDelete = () => removeSet(setPath, setData.questionCount);

    return (
        <Card
            title={title}
            hoverable={true}
            style={{ width: '240px' }}>
            <Space>
                <Statistic title="Questions" value={questionCount} />
            </Space>
            <Divider />
            <Space>
                <ViewQuestionSet setData={setData} setPath={setPath}/>
                <Popconfirm
                    title="Are you sure you want to remove this question set?"
                    onConfirm={confirmDelete}
                    okText="Yes"
                    cancelText="No">
                    <Button type='link' danger>Delete</Button>
                </Popconfirm>
            </Space>
            
        </Card>
    )
}

export default SetTile;