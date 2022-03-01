import React, { useContext, useEffect, useState } from 'react';
import { auth, signInWithGoogle, signOut } from '../services/firebase';

// Create context
const AuthContext = React.createContext();

// Auth hook
export function useAuth() {
    return useContext(AuthContext);
}

// Provider
export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Detect active user changes
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setUser(user);
            setLoading(false);
        })
        return unsubscribe;   // Unsubscribe listener on unmount
    }, [])

    // Sign in with Google - returns a promise
    function login() {
        return signInWithGoogle()
    }

    // Sign out - returns a promise with success/fail status
    function logout() {
        return signOut(auth)
            .then(() => { console.log("Sign-out successful.") })
            .catch(error => { console.log("An error happened.") })
    }

    // Data exposed by context 
    const value = { user, login, logout }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}