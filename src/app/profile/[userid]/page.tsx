'use client'

import { useEffect, useState } from "react";
import JerseyTable from "../components/jerseyTable";
import { JerseyType } from "@/types/jerseyType";
import { useJerseys } from '@/hooks/useJerseys'
import Header from "@/components/header";
import { useParams } from "next/navigation";

const ProfilePage = () => {

    const params = useParams();
    console.log("params:", params);
    const [jerseyCollection, setJerseyCollection] = useState<JerseyType[]>([])
    const userid = params?.userid as string;
    const { getJerseys  } = useJerseys();
    console.log("Getting:", userid)

    useEffect(() => {
        console.log("Getting:", userid)
        const fetchJerseys = async () => {
            const jerseys = await getJerseys(userid)
            setJerseyCollection(jerseys)
        }
        fetchJerseys()
    }, [])


    return (
        <>
            <Header />
            <JerseyTable collection={jerseyCollection} />
        </>
    );
}

export default ProfilePage