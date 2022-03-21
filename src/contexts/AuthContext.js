import { collection, getDocs, query } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react';
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

    // Detect active user changes
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setUser(user);
            setAdminStatus(user);
            setLoading(false);
        })
        return unsubscribe;   // Unsubscribe listener on unmount
    }, [])

    async function setAdminStatus(user) {
        if (!user) {
            setIsAdmin(false);
            return;
        }

        // Set admin status
        const querySnapshot = await getDocs(collection(db, 'users'));
        querySnapshot.forEach(doc => {

            // users => admin => uids
            if (doc.id == 'admin') {
                const adminData = doc.data();
                setIsAdmin(adminData && adminData.uids.includes(user.uid))
            }
            console.log("admin status:", isAdmin)
        })
    }

    // Data exposed by context 
    const value = { user, isAdmin }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}