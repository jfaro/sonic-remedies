import { useEffect, useState } from "react";
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../services/firebase';

export function useAllSongs() {
    const [songs, setSongs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const songsQuery = query(collection(db, 'songs'));

        const unsubscribe = onSnapshot(songsQuery, (snapshot) => {
            setIsLoading(true);
            snapshot.forEach(document => {
                const data = document.data();
                setSongs([...songs, data]);
            });
            setIsLoading(false);
        })
        return () => unsubscribe();
    }, []);

    return [songs, isLoading];
}