import { db } from './firebase';
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { testSongData } from '../toggle';

// Create a new document in /surveys collection
export const addSurvey = async (surveyValues) => {
    try {
        await addDoc(collection(db, 'surveys'), surveyValues);
        console.log("Success adding document to /surveys collection", surveyValues);
    } catch (e) {
        console.error("Error adding document to /surveys collection", e);
    }
}

// Create a new document in /songs collection
export const addToSongsCollection = async (songDocumentValues) => {

    // Create a document ID of lowercase title with spaces replaced by -
    let title = songDocumentValues.title.toLowerCase().replace(/ /g, "-").trim();
    let database = "songs";

    if (testSongData) {
        database = "testSongs";
    }

    // Create new document in /songs collection
    try {
        const docRef = doc(db, database, title);

        await setDoc(docRef, songDocumentValues);
        console.log(`Success adding document to /${database} collection`, songDocumentValues);
    } catch (e) {
        console.error(`Error adding document to /${database} collection`, e);
    }
}
