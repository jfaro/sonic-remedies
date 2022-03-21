import { Button, Space, Typography } from "antd";
const { Title, Text } = Typography;

export default function CreateSurvey() {
    return (
        <>
            <Space direction='vertical'>
                <Title>Create Survey</Title>

                <Title level={4}>Select songs</Title>
                <Text>TODO</Text>

                <Title level={4}>Add a question</Title>
                <Text>TODO</Text>

                <Button type='primary' >Create survey</Button>
            </Space>

        </>
    )
}