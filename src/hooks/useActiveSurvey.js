import { useEffect, useState } from "react";
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../services/firebase';

export function useActiveSurvey() {
    const [surveyQuestions, setSurveyQuestions] = useState();

    useEffect(() => {
        const surveysRef = collection(db, 'surveys');
        const q = query(surveysRef, where('active', '==', true));

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            querySnapshot.forEach(document => {
                const data = document.data();
                setSurveyQuestions(data.questions);
                console.log("Loaded survey:", data.questions);
            })
        })
        return () => unsubscribe();
    }, []);

    return surveyQuestions;
}