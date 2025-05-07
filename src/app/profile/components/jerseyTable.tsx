'use client';

import { JSX, useEffect, useState } from 'react';
import { useJerseyContext } from '@/contexts/JerseyContext';
import JerseyCard from './jerseyCard';
import JerseyPopup from './jerseyPopup';
import { JerseyType } from '@/types/jerseyType';
import Filter from './filter';

interface JerseyTableProps {
  collection: JerseyType[];
}

const JerseyTable = ({ collection }: JerseyTableProps) => {

  const { jerseyCollection } = useJerseyContext()
  const [filtederCollection, setFilteredCollection] = useState<JerseyType[]>([])
  const [currentJersey, setCurrentJersey] = useState<JerseyType>()
  const [openPopup, setOpenPopup] = useState<boolean>(false)

  useEffect(() => {
    setFilteredCollection(collection)
  }, [collection])

  if (!jerseyCollection) return <div>Carregando...</div>;


  const handleCurrentJersey = (jersey: JerseyType) => {
    setCurrentJersey(jersey)
    setOpenPopup(true)
  };

  const termSearch = (term: string) => {
    term = term.toLowerCase()
    const arr = jerseyCollection.filter((jersey) => {
      const matchTeam = jersey.team.toLowerCase().includes(term)
      const matchSeason = jersey.season?.includes(term)
      const matchColor = jersey.mainColor?.toLowerCase().includes(term)
      const matchFocus = jersey.focus?.toLowerCase().includes(term)
      const matchSub = jersey.subfocus?.toLowerCase().includes(term)
      const matchBrand = jersey.brand?.toLowerCase().includes(term)
      const matchCountry = jersey.country?.toLowerCase().includes(term)
      return matchTeam || matchSeason || matchSub || matchColor || matchFocus || matchBrand || matchCountry
    })
    setFilteredCollection(arr)
  }

  const filterSearch = (filterArr: string[]) => {
    if (filterArr.length === 0) {
      setFilteredCollection(collection)
      return
    }
    const arr = jerseyCollection.filter((jersey) => {
      return filterArr.some((term) => jersey.focus?.includes(term) || jersey.country?.includes(term))
    })
    setFilteredCollection(arr)
  }

  return (
    <div className="min-h-screen flex flex-col items-center w-[90%] md:w-[75%]">
      <div className='flex flex-col space-y-5 items-center justify-center mt-10 w-full'>
        <input
          className='bg-secondary-1 p-2 w-full rounded-sm border-1 border-terciary-1 shadow-md
          text-2xl text-terciary-1 placeholder:text-gray-400'
          placeholder='Buscar...' onChange={(e) => termSearch(e.target.value)}></input>
        <Filter jerseyCollection={jerseyCollection} filterSearch={filterSearch} />
        <div className='bg-transparent mb-10
        grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
          {filtederCollection?.map((jersey: JerseyType, index: number): JSX.Element => (
            <JerseyCard jersey={jersey} key={index} onJerseyClick={handleCurrentJersey} />
          ))}
        </div>
      </div>
      {openPopup && (
        <div className='fixed inset-0 z-20 flex items-center justify-center'>
          <div
            className="absolute inset-0 bg-black/80 cursor-pointer z-20"
            onClick={() => setOpenPopup(false)}
          />
          <JerseyPopup jersey={currentJersey} setPopup={setOpenPopup} />
        </div>
      )}
    </div>
  );
}

export default JerseyTable