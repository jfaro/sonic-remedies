import { useEffect, useState } from "react";
import { collection, query, onSnapshot, QuerySnapshot, DocumentData, FirestoreError } from 'firebase/firestore';
import { db } from '../services/firebase';
import { CollectionNames } from "constants/firebase";

export function useAllDocuments(collectionName: CollectionNames) {
    const [documents, setDocuments] = useState<DocumentData[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    // onSnapshot onNext handler
    const onNext = (snapshot: QuerySnapshot<DocumentData>) => {
        setIsLoading(true);
        snapshot.forEach(document => {
            const data = document.data();
            setDocuments(docs => [...docs, data]);
        });
        setIsLoading(false);
    }

    // onSnapshot error handler
    const onError = (error: FirestoreError) => {
        console.log(error);
    }

    // Get data and listen for updates
    useEffect(() => {
        const q = query(collection(db, collectionName));
        const unsubscribe = onSnapshot(q, onNext, onError);
        return () => unsubscribe();
    }, [collectionName]);

    return { documents, isLoading };
}