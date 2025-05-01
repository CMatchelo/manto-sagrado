'use client'

import { User } from 'firebase/auth'
import { addDoc, collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import { JerseyType } from '@/types/jerseyType';

export function useJerseys(setLocalCollection?: React.Dispatch<React.SetStateAction<JerseyType[]>>) {
    const saveJersey = async (user: User | null, formData: JerseyType) => {
        let userId = ''
        if (user) userId = user?.uid
        const userJerseysRef = collection(db, "users", userId, "jerseys")
        await addDoc(userJerseysRef, formData)

        if (setLocalCollection) {
            setLocalCollection((prev) => [...prev, formData])
        }
    }

    const getJerseys = async (userId: string) => {
        const jerseysCol = collection(db, "users", userId, "jerseys")
        const jerseysSnapshot = await getDocs(jerseysCol)
        const jerseyList = jerseysSnapshot.docs.map((doc) => ({
            ...doc.data(),
        })) as JerseyType[]
        return jerseyList
    }

    return { saveJersey, getJerseys }
}
