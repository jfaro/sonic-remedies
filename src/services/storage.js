import { storage } from './firebase';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

// Upload a song to cloud storage
// Returns a Promise that resolves to the download URL, rejects if upload fails
const uploadSong = async (filename, file, songDocument) => {
    console.log("Uploading file " + filename + " to storage")

    // Upload the file and metadata
    const storageRef = ref(storage, `songs/${filename}`);

    const uploadTask = uploadBytesResumable(storageRef, file);

    return new Promise((resolve, reject) => {
        uploadTask.on('state_changed',
            // Observe state change events such as progress, pause, and resume
            // Get task progress including the number of bytes uploaded
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
            },

            // Upload failed
            (error) => {
                console.log("UPLOAD ERROR")
                // A full list of error codes is available at
                // https://firebase.google.com/docs/storage/web/handle-errors
                switch (error.code) {
                    case 'storage/unauthorized':
                        console.log("User doesn't have permission to access Storage");
                        break;
                    case 'storage/canceled':
                        console.log("User canceled upload");
                        break;
                    case 'storage/unknown':
                        console.log("User encountered unknown error");
                        break;
                    default:
                        break;
                }
                reject(error);
            },

            // Upload completed successfully, now we can get the download URL
            () => {
                console.log("UPLOAD COMPLETE")
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log('File available at', downloadURL);
                    resolve(downloadURL);
                });
            }
        )
    })
}

export {
    uploadSong
}