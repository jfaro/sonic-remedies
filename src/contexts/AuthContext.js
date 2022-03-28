import { collection, getDocs } from 'firebase/firestore';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { auth, db } from '../services/firebase';

// Create context
const AuthContext = React.createContext();

// Auth hook
export function useAuth() {
    return useContext(AuthContext);
}

// Provider
export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);

    const setAdminStatus = useCallback(async (user) => {
        if (!user) {
            setIsAdmin(false);
            return;
        }

        // Set admin status
        const querySnapshot = await getDocs(collection(db, 'users'));
        querySnapshot.forEach(doc => {

            // users => admin => uids
            if (doc.id === 'admin') {
                const adminData = doc.data();
                setIsAdmin(adminData && adminData.uids.includes(user.uid))
            }
        })
        console.log("admin status:", isAdmin)
    }, [isAdmin])


    // Detect active user changes
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setUser(user);
            setAdminStatus(user);
            setLoading(false);
        })
        return unsubscribe;   // Unsubscribe listener on unmount
    }, [setAdminStatus])

    // Data exposed by context 
    const value = { user, isAdmin }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}