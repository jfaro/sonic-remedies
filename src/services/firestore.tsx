import { db } from './firebase';
import { addDoc, collection, deleteDoc, doc, setDoc, updateDoc } from "firebase/firestore";
import { ISurvey, IQuestionSet, IQuestion } from '../interfaces/ISurvey';
import { ITrack } from '../interfaces/ITrack';

/**
 * HELPER FUNCTIONS
 */

// Takes string input and formats it into a form acceptable as a Firebase document name
export const formatTitle = (inputString: string) => {
    return inputString.toLowerCase().replace(/ /g, "-").trim();
}

/**
 * SURVEY FUNCTIONS
 */

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

/**
 * QUESTION SET FUNCTIONS
 */

// Create a new document in /questionSets collection
export const addQuestionSet = async (surveyValues: IQuestionSet) => {
    // Separate and clean up questions
    const questions = surveyValues.questions;
    let title = formatTitle(surveyValues.title);
    let docRef = doc(db, 'questionSets', title);
    delete surveyValues.questions;
    
    // Submit questionSet document to /questionSets
    try {
        await setDoc(docRef, surveyValues);
        console.log(`Success adding document to /questionSets/${title}`, surveyValues);
    } catch (e) {
        console.error(`Error adding document to /questionSets/${title}`, e);
    }

    // Submit individual questions to /questionSet/{title}/questions
    try{
        questions?.forEach(async function (q: IQuestion)
        {
            // Each question's document title is it's question number in order: q1, q2, q3, etc.
            // If you update the naming scheme here, update removeSet() accordingly
            docRef = doc(db, `questionSets/${title}/questions`, `q${q.idx}`);
            await setDoc(docRef, q);
        });
        console.log(`Success adding document to /questionSets/${title}/questions`, questions);
    } catch (e) {
        console.error(`Error adding document to /questionSets//${title}/questions`, e);
    }
}

// Remove a document from /questionSets collection
export const removeSet = async (setPath: string, questionCount: number) => {
    /**
     * Remove all questions in /questionSets/{name}/questions subcollection
     * 
     * NOTE: This is required since Firebase does not automatically remove
     * subcollections when deleting a parent collection
     * 
     * ADDITIONAL NOTE: This is based on the assumption the "q1, q2, q3" naming 
     * scheme is kept from addQuestionSet(), if that scheme changes, update this one accordingly
     */
    for (let i = 1; i < questionCount + 1; i++) { 
        const docName = `q${i}`;
        const questionRef = doc(db, `${setPath}/questions/${docName}`);
        console.log(`deleting ${setPath}/questions/${docName}`);
        await deleteDoc(questionRef);
    }

    // Remove question set from /questionSets
    const setRef = doc(db, setPath);
    console.log(`deleting ${setPath}`);
    await deleteDoc(setRef);
}

/**
 * SONG FUNCTIONS
 */

// Create a new document in /songs collection
export const addToSongsCollection = async (trackValues: ITrack) => {

    // Create a document ID of lowercase title with spaces replaced by -
    let title = formatTitle(trackValues.title);
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
