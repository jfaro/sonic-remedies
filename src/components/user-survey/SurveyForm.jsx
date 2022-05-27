import { Form } from "antd";
import { Question } from "./Question";
//import AudioPlayer from "../common/AudioPlayer";
import { useActiveSurvey } from "../../hooks/useActiveSurvey";
import styles from "./SurveyForm.module.css";

export function SurveyForm() {
    const [form] = Form.useForm();
    const surveyQuestions = useActiveSurvey();

    return (
        <Form
            name="survey"
            layout="vertical"
            form={form}
            className={styles.surveyForm}
        >
            {surveyQuestions?.map(({ prompt, type, questionOptions }, idx) => {
                return (
                    <Question
                        key={idx}
                        prompt={prompt}
                        type={type}
                        questionOptions={questionOptions}
                    />
                )
            })}
        </Form>
    )
}