import { db } from '../../services/firebase';
import { collection, query, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Alert, Space, Spin, notification } from "antd";
import SurveyTile from './SurveyTile';
import { removeSurvey, updateSurveyActiveStatus } from 'services/firestore';


export default function AllSurveys() {

    const [surveys, setSurveys] = useState([]);
    const [surveyRefs, setSurveyRefs] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const q = query(collection(db, 'surveys'));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            setLoading(true);
            setSurveys([]);
            setSurveyRefs([]);
            querySnapshot.forEach(document => {
                const data = document.data();
                setSurveys(arr => [...arr, data]);
                setSurveyRefs(arr => [...arr, document.ref.path])
            })
            setLoading(false);
        })
        return () => unsubscribe();
    }, [])

    const handleRemoveSurvey = (surveyIndex) => {
        const surveyPath = surveyRefs[surveyIndex];
        removeSurvey(surveyPath);
    }

    const handleToggleActive = (surveyIndex) => {
        const surveyPath = surveyRefs[surveyIndex];

        // Deactivate
        if (surveys[surveyIndex].active) {
            updateSurveyActiveStatus(surveyPath, false);
            return;
        }

        // Activate
        let noActiveSurveys = true;
        surveys.forEach(survey => {
            if (survey.active) {
                noActiveSurveys = false;
            }
        })
        if (noActiveSurveys) {
            updateSurveyActiveStatus(surveyPath, true);
        } else {
            showNotification("Error", "Only one survey can be active.")
        }
    }

    const showNotification = (message, description) => {
        notification.open({
            message: message,
            description: description,
        });
    };

    if (loading) return <Spin />

    return (
        <Space wrap>
            {
                surveys.length > 0 ? surveys.map((survey, idx) => {
                    return (
                        <SurveyTile
                            key={idx}
                            surveyIndex={idx}
                            surveyData={survey}
                            removeSurvey={handleRemoveSurvey}
                            toggleActive={handleToggleActive} />
                    )
                }) : <Alert
                    message="No surveys created"
                    type="info" />
            }
        </ Space>
    )
}
