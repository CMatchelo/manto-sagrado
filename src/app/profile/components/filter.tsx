import { JerseyType } from "@/types/jerseyType"
import { useEffect, useState } from "react";

interface FilterProps {
    jerseyCollection: JerseyType[];
    filterSearch: (filter: string[]) => void;
}

const Filter = ({ jerseyCollection, filterSearch }: FilterProps) => {

    const [filter, setFilter] = useState<string[]>([])
    const [listFocus, setListFocus] = useState<string[]>([])
    const [listCountry, setListCountry] = useState<string[]>([])

    useEffect(() => {
        const arrFocus: string[] = []
        const arrCountry: string[] = []
        jerseyCollection.map((jersey) => {
            if (jersey.focus && !arrFocus.includes(jersey.focus)) arrFocus.push(jersey.focus)
            if (jersey.country && !arrCountry.includes(jersey.country)) arrCountry.push(jersey.country)
        })
        setListFocus(arrFocus)
        setListCountry(arrCountry)
    }, [jerseyCollection])

    const handleFilter = (value: string) => {
        setFilter((prevFilter) => {
            if (prevFilter.includes(value)) {
                return prevFilter.filter((item) => item !== value)
            } else {
                return [...prevFilter, value]
            }
        })
    }

    useEffect(() => {
        console.log(filter)
    }, [filter])

    return (
        <div className="flex flex-col self-start">
            <span>Filtros</span>
            <div className="flex self-start space-x-10">
                <div>
                    {listFocus.length > 0 && (
                        <>
                            <span>Foco</span>
                            {listFocus.map((focus, index) => (
                                <div key={index}>
                                    <input type="checkbox" id={focus} name={focus} onChange={() => handleFilter(`${focus}`)}></input>
                                    <label htmlFor={focus}>{focus}</label>
                                </div>
                            ))}
                        </>
                    )}
                </div>
                <div>
                    {listCountry.length > 0 && (
                        <>
                            <span>País</span>
                            {listCountry.map((country, index) => (
                                <div key={index}>
                                    <input type="checkbox" id={country} name={country}></input>
                                    <label htmlFor={country}>{country}</label>
                                </div>
                            ))}
                        </>
                    )}
                </div>
            </div>
            <button onClick={() => filterSearch(filter)}>
                Aplicar
            </button>
            <h1 className="text-2xl">Qualquer coisa</h1>
        </div>
    )
}

export default Filter