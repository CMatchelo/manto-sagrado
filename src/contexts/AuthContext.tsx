'use client'

import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile, User } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../../firebase";
import { doc, setDoc } from "firebase/firestore";
import { getFriendlyErrorMessage } from "@/components/firebaseError";
import { FirebaseError } from "firebase/app";

interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
    signIn: (email: string, password: string, name: string) => Promise<void>;
    signInWithGoogle: () => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    loading: true,
    login: async () => { },
    signIn: async () => { },
    signInWithGoogle: async () => { },
    logout: async () => { },
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {

    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        console.log("Uer change", user)
        const unsub = onAuthStateChanged(auth, (user) => {
            setUser(user)
            setLoading(false)
        })
        return () => unsub()
    }, [user])

    const login = async (email: string, password: string) => {
        try {
            await signInWithEmailAndPassword(auth, email, password)
        } catch (err) {
            console.error("Login error:", err)
            throw err
        }
    }

    const signIn = async (email: string, password: string, name: string | undefined) => {
        try {
            const newUser = await createUserWithEmailAndPassword(auth, email, password)
            const user = newUser.user;
            await updateProfile(user, {
                displayName: name,
            });
            await setDoc(doc(db, "users", user.uid), {
                email,
                name,
                createdAt: new Date(),
            });
        } catch (err: unknown) {
            if (err instanceof FirebaseError) {
                const errString = getFriendlyErrorMessage(err.code)
                console.log("Firebase error:", errString)
            }
            throw err
        }
    }

    const signInWithGoogle = async () => {
        try {
            const provider = new GoogleAuthProvider()
            console.log("Aqui", auth, provider)
            const result = await signInWithPopup(auth, provider)
            console.log(result)
            await updateProfile(result.user, {
                displayName: result.user.displayName,
            });
            await setDoc(doc(db, "users", result.user.uid), {
                email: result.user.email,
                name: result.user.displayName,
                createdAt: new Date(),
            });
        } catch (err: unknown) {
            if (err instanceof FirebaseError) {
                const errString = getFriendlyErrorMessage(err.code)
                console.log("Firebase error:", errString)
            }
            throw err
        }
    }

    const logout = async () => {
        try {
            await signOut(auth)
        } catch (err) {
            console.error("Logout error:", err)
        }
    }

    return (
        <AuthContext.Provider value={{ user, loading, login, signIn, logout, signInWithGoogle}}>
            {children}
        </AuthContext.Provider>
    )

}

export const useAuth = () => useContext(AuthContext);