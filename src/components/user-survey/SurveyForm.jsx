import { Button, Form, Spin } from "antd";
import { Question } from "./Question";
import { isEmpty } from "lodash";
import { useActiveSurvey } from "../../hooks/useActiveSurvey";

export function SurveyForm() {
    const [form] = Form.useForm();
    const [questions, loading] = useActiveSurvey();

    if (loading) {
        return <Spin />
    }

    if (!questions || isEmpty(questions)) {
        return "Sorry, there is active survey.";
    }

    return (
        <Form
            name="survey"
            layout="vertical"
            form={form}
            style={{ width: "100%" }}
        >
            {questions?.map(({ prompt, type, questionOptions }, idx) => {
                return (
                    <Question
                        key={idx}
                        prompt={`${idx + 1}. ${prompt}`}
                        type={type}
                        questionOptions={questionOptions}
                    />
                )
            })}

            <Button type="primary">Submit</Button>
        </Form>
    )
}