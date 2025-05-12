import { JerseyType } from "@/types/jerseyType"
import { ArrowsIcon } from "@/utils/icon";
import { useEffect, useState } from "react";

interface FilterProps {
    jerseyCollection: JerseyType[];
    filterSearch: (filter: string[]) => void;
}

const Filter = ({ jerseyCollection, filterSearch }: FilterProps) => {

    const [filter, setFilter] = useState<string[]>([])
    const [listFocus, setListFocus] = useState<string[]>([])
    const [listCountry, setListCountry] = useState<string[]>([])
    const [displayFilter, setDisplayFilter] = useState<boolean>(false)

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
        filterSearch(filter)
    }, [filter, filterSearch])

    return (
        <div className="flex flex-col self-start w-full 
        p-2">
            <div className="flex flex-row items-center space-x-3 cursor-pointer"
                onClick={() => setDisplayFilter(!displayFilter)}>
                <span className="font-extrabold">Filtros</span>
                <ArrowsIcon height={15} width={15}
                    classAditional={`transition-all duration-1000 ease-in-out ${displayFilter ? 'rotate-180' : ''}`} />
            </div>
            <div className={`
                flex flex-col items-start space-y-5
                transition-all duration-1000 ease-in-out
                overflow-auto w-full
                ${displayFilter ? 'max-h-[250px] mt-5' : 'max-h-0'}
                `}>
                <div className={`flex flex-row space-x-10 justify-start
                `}>
                    <div>
                        {listFocus.length > 0 && (
                            <>
                                <span>Foco</span>
                                {listFocus.map((focus, index) => (
                                    <div key={index} className="space-x-1">
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
                                    <div key={index} className="space-x-1">
                                        <input type="checkbox" id={country} name={country} onChange={() => handleFilter(`${country}`)}></input>
                                        <label htmlFor={country}>{country}</label>
                                    </div>
                                ))}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Filter