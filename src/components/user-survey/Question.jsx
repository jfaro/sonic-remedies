import { Input, Radio, Space, Form } from 'antd';
import { CirclePicker } from 'react-color';

const colorOptions = [
    '#B80000',
    '#DB3E00',
    '#FCCB00',
    '#008B02',
    '#006B76',
    '#1273DE',
    '#004DCF',
    '#5300EB',
    '#EB9694',
    '#FAD0C3',
    '#FEF3BD',
    '#C1E1C5',
    '#BEDADC',
    '#C4DEF6',
    '#BED3F3',
    '#D4C4FB'
]

export const Question = ({ prompt, type, questionOptions }) => {

    let formItem = null;

    switch (type) {

        // Text entry
        case 'text':
            formItem = <Input.TextArea />
            break;

        // Single select
        case 'singleSelect':
            const sOptions = questionOptions.map((option, idx) => {
                console.log(option)
                return <Radio value={idx}>{option.optionText}</Radio>
            });

            formItem = (
                < Radio.Group >
                    <Space direction="vertical" size={"small"}>
                        {sOptions}
                    </Space>
                </Radio.Group >
            )
            break;

        // Color entry
        case 'color':
            formItem = (
                <div className="flex-col flex-center w-100">
                    <CirclePicker
                        colors={colorOptions}
                        width={"360px"} />
                </div>
            );
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