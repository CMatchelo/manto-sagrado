'use client'
import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useJerseys } from '@/hooks/useJerseys'
import { JerseyType } from '@/types/jerseyType'

type JerseyContextType = {
    jerseyCollection: JerseyType[]
    setJerseyCollection: React.Dispatch<React.SetStateAction<JerseyType[]>>
}

const JerseyContext = createContext<JerseyContextType | undefined>(undefined)

export const JerseyProvider = ({ children }: { children: ReactNode }) => {
    const { user } = useAuth()
    const { getJerseys } = useJerseys()
    const [jerseyCollection, setJerseyCollection] = useState<JerseyType[]>([])

    useEffect(() => {
        if (!user) return

        const fetchJerseys = async () => {
            const jerseys = await getJerseys(user.uid)
            setJerseyCollection(jerseys)
        }

        fetchJerseys()
    }, [user?.uid])

    return (
        <JerseyContext.Provider value={{ jerseyCollection, setJerseyCollection }}>
            {children}
        </JerseyContext.Provider>
    )
}

export const useJerseyContext = () => {
    const context = useContext(JerseyContext)
    if (!context) {
      throw new Error('useJerseyContext must be used within a JerseyProvider')
    }
    return context
  }
