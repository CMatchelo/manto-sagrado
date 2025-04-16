/* 'use client';

import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, User, updateProfile, signInWithPopup } from 'firebase/auth'
import { useEffect, useState } from 'react'
import { auth, db } from '../../firebase'
import { doc, setDoc } from 'firebase/firestore';
import { getFriendlyErrorMessage } from '@/components/firebaseError';
import { GoogleAuthProvider } from 'firebase/auth';

export function useAuth() {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        console.log("USe effect", auth)
        const unsub = onAuthStateChanged(auth, (user) => {
            setUser(user)
            setLoading(false)
        })

        return () => unsub()
    }, [auth])

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
        } catch (err: any) {
            const errString = getFriendlyErrorMessage(err.code)
            console.log("Sign in error:", errString)
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
        } catch (err: any) {
            console.log("Sign in error:", err)
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

    return { user, loading, login, signIn, logout, signInWithGoogle }
} */