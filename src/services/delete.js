import { db } from './firebase';
import { doc, deleteDoc } from "firebase/firestore";
import { ref, getStorage, deleteObject } from "firebase/storage";

/**
 * Deletes song data from Firestore and Storage
 * @param {Object} songValues taken from MusicTable.js
 */
const deleteData = async (songValues) => {
    const storage = getStorage();
    
    // Remove song from Firebase Storage
    const songRef = ref(storage, `songs/${songValues.filename}`)

    deleteObject(songRef).then(() => {
        console.log(songValues.filename + " deleted successfully");
    }).catch((error) => {
        console.log("Song file not deleted successfully, please remove manually in Firebase Storage admin.");
    });

    // Remove song from Cloud Firestore
    let title = songValues.title.toLowerCase().replace(/ /g, "-").trim();
    await deleteDoc(doc(db, "songs", title));
}

export {
    deleteData
};