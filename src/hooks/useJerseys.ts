'use client'

import { User } from 'firebase/auth'
import { addDoc, deleteDoc, collection, getDocs, doc, runTransaction, increment } from 'firebase/firestore';
import { db } from '../../firebase';
import { JerseyType } from '@/types/jerseyType';
import { useAuth } from '@/contexts/AuthContext';

export function useJerseys(localCollection?: JerseyType[], setLocalCollection?: React.Dispatch<React.SetStateAction<JerseyType[]>>) {

    const { user } = useAuth();

    const saveJersey = async (user: User | null, newJersey: JerseyType) => {
        if (!user) throw new Error("Usuário não autenticado!");

        const userId = user.uid;
        const userJerseysRef = collection(db, "users", userId, "jerseys");
        const userDocRef = doc(db, "users", userId);

        try {
            const jerseyRef = await runTransaction(db, async (transaction) => {
                const jerseyDocRef = await addDoc(userJerseysRef, newJersey);
                transaction.update(userDocRef, {
                    jerseyCount: increment(1),
                });
                return jerseyDocRef;
            });
            const jerseyWithId = { ...newJersey, id: jerseyRef.id };
            if (setLocalCollection) {
                setLocalCollection((prev) => [...prev, jerseyWithId]);
            }
        } catch (error) {
            console.error("Erro ao salvar jersey:", error);
            throw error;
        }
    };

    const deleteJersey = async (id: string | undefined) => {
        if (!user) throw new Error("Usuário não autenticado!");
        const userId = user?.uid
        if (!id) return
        const jerseyDoc = doc(db, "users", userId, "jerseys", id);
        const userDocRef = doc(db, "users", userId);
        /* Atualiza coleçao local */
        const newArray = localCollection?.filter(item => item.id !== id) || [];
        if (setLocalCollection) {
            setLocalCollection(newArray)
        }
        /* Atualiza coleçao firebase */
        try {
            await runTransaction(db, async (transaction) => {
                await deleteDoc(jerseyDoc)
                transaction.update(userDocRef, {
                    jerseyCount: increment(-1)
                })
            })
        } catch (err) {
            console.error("Erro ao salvar jersey:", err);
            throw err;
        }
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
