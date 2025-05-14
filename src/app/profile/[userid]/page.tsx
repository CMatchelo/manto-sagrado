'use client'

import { useEffect, useState } from "react";
import JerseyTable from "../components/jerseyTable";
import { JerseyType } from "@/types/jerseyType";
import { useJerseys } from '@/hooks/useJerseys'
import Header from "@/components/header";
import { useParams } from "next/navigation";

const ProfilePage = () => {

    const params = useParams();
    const [jerseyCollection, setJerseyCollection] = useState<JerseyType[]>([])
    const userid = params?.userid as string;
    const { getJerseys  } = useJerseys();

    useEffect(() => {
        const fetchJerseys = async () => {
            const jerseys = await getJerseys(userid)
            setJerseyCollection(jerseys)
        }
        fetchJerseys()
    }, [userid])


    return (
        <div className="min-h-screen flex flex-col items-center">
            <Header />
            <JerseyTable collection={jerseyCollection} />
        </div>
    );
}

export default ProfilePage