import { Button, Card, Space, Statistic, Tag, Popconfirm, Divider } from "antd";

const SurveyTile = ({ surveyIndex, surveyData, removeSurvey, toggleActive }) => {
    const { title, questions, responses, active } = surveyData;
    const status = active ? <Tag color="green">Active</Tag> : null;

    const confirmDelete = () => removeSurvey(surveyIndex);
    const confirmToggle = () => toggleActive(surveyIndex);

    return (
        <Card
            title={title}
            extra={status}
            hoverable={true}
            style={{ width: '240px' }}>
            <Space>
                <Statistic title="Questions" value={questions.length} />
                <Statistic title="Responses" value={responses.length} />
            </Space>
            <Divider />
            <Space>
                <Popconfirm
                    title="Are you sure change the visibility of this survey?"
                    onConfirm={confirmToggle}
                    okText="Yes"
                    cancelText="No"
                >
                    {active ?
                        <Button danger>Deactivate</Button> :
                        <Button>Set active</Button>}

                </Popconfirm>
                <Popconfirm
                    title="Are you sure to delete this survey?"
                    onConfirm={confirmDelete}
                    okText="Yes"
                    cancelText="No">
                    <Button type='link' danger>Delete</Button>
                </Popconfirm>
            </Space>
        </Card>
    )
}

export default SurveyTile;