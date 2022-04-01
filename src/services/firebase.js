import { createContext, useContext, useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, getFirestore } from 'firebase/firestore'
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
export const db = getFirestore(app);
export const storage = getStorage(app);

// Create context
const AuthContext = createContext();

export const AuthContextProvider = props => {
    const [user, setUser] = useState();
    const [isAdmin, setIsAdmin] = useState(false);
    const [error, setError] = useState();

    useEffect(() => {
        const setAdminStatus = async () => {
            setIsAdmin(false);
            if (!user) return;

            try {
                const docSnap = await getDoc(doc(db, 'users', user.uid));
                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setIsAdmin(data.admin);
                }
            } catch (error) {
                console.log("Error accessing users collection.")
            }
        }
        setAdminStatus();
    }, [user])

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, setUser, setError);
        return () => unsubscribe();
    }, []);


    const value = {
        user: user,
        error: error,
        isAdmin: isAdmin,
        isAuthenticated: user != null
    }

    return <AuthContext.Provider value={value} {...props} />
}

export const useAuth = () => {
    return useContext(AuthContext);
}
