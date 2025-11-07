// AuthProvider.js
import { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile, signInWithPopup, GoogleAuthProvider, sendPasswordResetEmail } from "firebase/auth";
import auth from "../firebase/firebase.config";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Google Provider
    const googleProvider = new GoogleAuthProvider();

    // Create User with Email & Password
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    // Sign In with Email & Password
    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    // Google Sign In
    const googleSignIn = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    };

    // Logout
    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    };

    // Update User Profile
    const updateUserProfile = (name, photo) => {
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photo
        });
    };

    // Password Reset
    const resetPassword = (email) => {
        return sendPasswordResetEmail(auth, email);
    };

    // Observe auth state change
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            setLoading(false);
        });
        return () => {
            unsubscribe();
        };
    }, []);

    const authInfo = {
        user,
        loading,
        createUser,
        signIn,
        googleSignIn,
        logOut,
        updateUserProfile,
        resetPassword
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;