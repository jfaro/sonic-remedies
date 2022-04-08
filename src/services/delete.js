import { db } from './firebase';
import { doc, deleteDoc } from "firebase/firestore";
import { ref, getStorage, deleteObject } from "firebase/storage";
import { message } from 'antd';
import { testSongData } from '../toggle';

/**
 * Deletes song data from Firestore and Storage
 * @param {Object} songValues taken from MusicTable.js
 */
const deleteData = async (songValues) => {
    const storage = getStorage();
    let database = "songs"

    if (testSongData) {
        database = "testSongs";
    }
    
    // Remove song from Firebase Storage
    const songRef = ref(storage, `${database}/${songValues.filename}`)

    deleteObject(songRef).then(() => {
        console.log(songValues.filename + " deleted successfully");
        message.success('Song successfully deleted');
    }).catch((error) => {
        console.log("Song file not deleted successfully, please remove manually in Firebase Storage admin.");
        message.error('Error when deleting song');
    });

    // Remove song from Cloud Firestore
    let title = songValues.title.toLowerCase().replace(/ /g, "-").trim();
    await deleteDoc(doc(db, `${database}`, title));
}

export {
    deleteData
};