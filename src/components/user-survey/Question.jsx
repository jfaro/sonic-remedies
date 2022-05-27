import { Input, Radio, Space, Form } from 'antd';
import { CirclePicker } from 'react-color';

export const Question = ({ prompt, type, questionOptions }) => {

    let formItem = null;

    switch (type) {
        case 'text':
            formItem = <Input.TextArea />
            break;

        case 'singleSelect':
            const sOptions = questionOptions.map((option, idx) => {
                console.log(option)
                return <Radio value={idx}>{option.optionText}</Radio>
            });

            formItem = (
                < Radio.Group >
                    <Space direction="vertical">
                        {sOptions}
                    </Space>
                </Radio.Group >
            )
            break;

        case 'multipleSelect':
            const options = questionOptions.map((option, idx) => {
                console.log(option)
                return <Radio value={idx}>{option.optionText}</Radio>
            });

            formItem = (
                < Radio.Group >
                    <Space direction="vertical" size={'small'}>
                        {options}
                    </Space>
                </Radio.Group >
            );
            break;

        case 'color':
            formItem = <CirclePicker />;
            break;
        default:
            return null;
    }

    return (
        <Form.Item label={prompt}>
            {formItem}
        </Form.Item>
    )
}