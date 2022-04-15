import { db } from './firebase';
import { addDoc, collection, deleteDoc, doc, setDoc, updateDoc } from "firebase/firestore";
import { ISurvey } from '@interface/ISurvey';
import { ITrack } from '@interface/ITrack';

// Create a new document in /surveys collection
export const addSurvey = async (surveyValues: ISurvey) => {
    try {
        await addDoc(collection(db, 'surveys'), surveyValues);
        console.log("Success adding document to /surveys collection", surveyValues);
    } catch (e) {
        console.error("Error adding document to /surveys collection", e);
    }
}

// Remove a document from /surveys collection
export const removeSurvey = async (surveyPath: string) => {
    const surveyRef = doc(db, surveyPath);
    await deleteDoc(surveyRef);
}

// Update the active status of a survey (sets active field to param: active)
export const updateSurveyActiveStatus = async (surveyPath: string, active: boolean) => {
    const surveyRef = doc(db, surveyPath);
    await updateDoc(surveyRef, {
        active: active
    })
}

// Create a new document in /songs collection
export const addToSongsCollection = async (trackValues: ITrack) => {

    // Create a document ID of lowercase title with spaces replaced by -
    let title = trackValues.title.toLowerCase().replace(/ /g, "-").trim();
    let database = "songs";

    // Create new document in /songs collection
    try {
        const docRef = doc(db, database, title);

        await setDoc(docRef, trackValues);
        console.log(`Success adding document to /${database} collection`, trackValues);
    } catch (e) {
        console.error(`Error adding document to /${database} collection`, e);
    }
}
