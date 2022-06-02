import { db } from '../../../services/firebase';
import { removeSet } from '../../../services/firestore'
import { collection, query, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Alert, Space, Spin } from "antd";
import SetTile from '../SetTile';

export default function AllQuestionSets() {

    const [questionSets, setQuestionSets] = useState([]);
    const [setRefs, setSetRefs] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const d = query(collection(db, 'questionSets'));
        const unsubscribe = onSnapshot(d, (querySnapshot) => {
            setLoading(true);
            setQuestionSets([]);
            setSetRefs([]);
            querySnapshot.forEach(document => {
                const data = document.data();
                setQuestionSets(arr => [...arr, data]);
                setSetRefs(arr => [...arr, document.ref.path]);
            });
            setLoading(false);
        })
        return () => unsubscribe();
    }, [])

    const handleRemoveSet = (setPath, questionCount) => {
        removeSet(setPath, questionCount);
    }

    if (loading) return <Spin />

    return (
        <Space wrap>
            {
                questionSets.length > 0 ? questionSets.map((set, idx) => {
                    return (
                        <SetTile
                            key={idx}
                            setPath={setRefs[idx]}
                            setData={set} 
                            removeSet={handleRemoveSet} />
                    )
                }) : <Alert
                    message="No question sets created"
                    type="info" />
            }
        </ Space>
    )
}
