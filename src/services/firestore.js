import { db } from './firebase';
import { doc, setDoc } from "firebase/firestore";

// Get all surveys
function getAllSurveys() {
    // TODO
}


// Create a new document in /songs collections
// Returns true on success, false on failure
const addToSongsCollection = async (songDocumentValues) => {

    // Create a document ID of lowercase title with spaces replaced by -
    let title = songDocumentValues.title.toLowerCase().replace(/ /g, "-").trim();

    // Create new document in /songs collection
    try {
        const docRef = doc(db, "songs", title);
        await setDoc(docRef, songDocumentValues);
        console.log("Success adding document to /songs collection", songDocumentValues);
    } catch (e) {
        console.error("Error adding document to /songs collection", e);
    }
}

export {
    getAllSurveys,
    addToSongsCollection
};