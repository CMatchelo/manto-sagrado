'use client'

import { User } from 'firebase/auth'
import { addDoc, deleteDoc, collection, getDocs, doc } from 'firebase/firestore';
import { db } from '../../firebase';
import { JerseyType } from '@/types/jerseyType';
import { useAuth } from '@/contexts/AuthContext';

export function useJerseys(localCollection?: JerseyType[], setLocalCollection?: React.Dispatch<React.SetStateAction<JerseyType[]>>) {

    const { user } = useAuth();

    const saveJersey = async (user: User | null, newJersey: JerseyType) => {
        let userId = ''
        if (user) userId = user?.uid
        const userJerseysRef = collection(db, "users", userId, "jerseys")
        await addDoc(userJerseysRef, newJersey)

        if (setLocalCollection) {
            setLocalCollection((prev) => [...prev, newJersey])
        }
    }

    const deleteJersey = async (id: string | undefined) => {
        console.log(localCollection)
        const newArray = localCollection?.filter(item => item.id !== id) || [];
        if (setLocalCollection) {
            setLocalCollection(newArray)
        }
        /* let userId = ''
        if (user) userId = user?.uid
        if (!id) return
        const jerseyDoc = doc(db, "users", userId, "jerseys", id);
        await deleteDoc(jerseyDoc) */
    }

    const getJerseys = async (userId: string) => {
        const jerseysCol = collection(db, "users", userId, "jerseys")
        const jerseysSnapshot = await getDocs(jerseysCol)
        const jerseyList = jerseysSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        })) as JerseyType[]
        return jerseyList
    }

    return { saveJersey, getJerseys, deleteJersey }
}
