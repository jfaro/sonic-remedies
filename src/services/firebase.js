import { initializeApp } from 'firebase/app';
import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
    signOut
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage';

// Firebase configuration
const app = initializeApp({
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID
});

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// Sign in
const provider = new GoogleAuthProvider();

// Sign in with Google - returns a promise
function login() {
    return signInWithPopup(auth, provider)
        .then(res => { console.log('Sign in with Google succeeded.'); })
        .catch(error => { console.log('Sign in with Google failed.', error.message); })
}

// Sign out - returns a promise with success/fail status
function logout() {
    return signOut(auth)
        .then(() => { console.log("Sign-out successful.") })
        .catch(error => { console.log("An error happened.") })
}

// Exports
export {
    auth,
    db,
    storage,
    login,
    logout
}