import { useState } from 'react';
import { Button, Modal } from "antd";

export default function CreateSurvey() {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = () => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            setIsModalVisible(false);
        }, 1000);
    }

    const handleCancel = () => {
        setIsModalVisible(false);
    }

    return (
        <>
            <Button type='primary' onClick={() => setIsModalVisible(true)}>Upload new track</Button>
            <Modal
                title='Create a new survey'
                visible={isModalVisible}
                okText='Create survey'
                onOk={handleSubmit}
                onCancel={handleCancel}
                confirmLoading={isLoading}
                width={800}
            >
                CREATE SURVEY
            </Modal>
        </>
    )
}