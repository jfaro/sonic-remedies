import { useEffect, useState } from "react";
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../services/firebase';

export function useActiveSurvey() {
    const [questions, setQuestions] = useState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const surveysRef = collection(db, 'surveys');
        const q = query(surveysRef, where('active', '==', true));

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            setIsLoading(true);
            querySnapshot.forEach(document => {
                const data = document.data();
                setQuestions(data.questions);
                console.log("Loaded survey:", data.questions);
            });
            setIsLoading(false);
        })
        return () => unsubscribe();
    }, []);

    return [questions, isLoading];
}