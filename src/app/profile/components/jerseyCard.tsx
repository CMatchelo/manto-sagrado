import { JerseyType } from "@/types/jerseyType"
import ImageSlide from "./imageSlide";
import { useJerseys } from "@/hooks/useJerseys";
import { useJerseyContext } from "@/contexts/JerseyContext";
import { ReactNode, useState } from "react";

interface JerseyCardProps {
    jersey: JerseyType;
    onJerseyClick: (jersey: JerseyType) => void
}

const JerseyCard = ({ jersey, onJerseyClick }: JerseyCardProps) => {

    const { setJerseyCollection, jerseyCollection } = useJerseyContext()
    const { deleteJersey } = useJerseys(jerseyCollection, setJerseyCollection)
    const [displayDelete, setDisplayDelete] = useState(false)

    interface BtnProps {
        onClick: () => void;
        variant?: 'default' | 'danger'
        children: ReactNode;
    }

    const deleteConfirm = (confirm: boolean, id?: string | undefined) => {
        if (confirm) {
            console.log(id)
            deleteJersey(id)
        }
        setDisplayDelete(false)
    }

    const Btn = ({ onClick, variant = 'default', children }: BtnProps) => {

        const variantColors = {
            default: "bg-terciary-1 hover:bg-terciary-1/80 active:bg-terciary-1/70",
            danger: "bg-red-700 hover:bg-red-700/80 active:bg-red-700/70"
        }

        return (
            <button
                onClick={onClick}
                className={`w-full flex justify-center py-2 md:py-1 px-3 cursor-pointer my-2
                    border border-transparent rounded-md shadow-sm 
                    text-sm font-bold text-secondary-1 
                    ${variantColors[variant]}
                    `}
            >
                {children}
            </button>
        )
    }

    return (
        <div className="flex flex-col items-center relative px-2 pt-2 
            bg-secondary-1 shadow-2xl border-1 border-primary-1 rounded-md">
            {displayDelete && (
                <div className='absolute inset-0 z-20 flex items-center justify-center'>
                    <div
                        className="absolute inset-0 bg-black/80 cursor-pointer z-20"
                    />
                    <div className="absolute bg-secondary-1 text-black top-[30%] z-30 w-full p-2">
                        Excluir este manto?
                        <Btn onClick={() => deleteConfirm(true, jersey.id)}>Sim</Btn>
                        <Btn onClick={() => deleteConfirm(false)}>Não</Btn>
                    </div>
                </div>
            )}

            <h2 className="font-semibold text-lg sm:text-xl lg:text-2xl w-full text-black text-center whitespace-nowrap overflow-hidden text-ellipsis">{jersey.team}</h2>
            <h2 className="text-md sm:text-lg w-full text-black text-center whitespace-nowrap overflow-hidden text-ellipsis">
                {jersey.season ? jersey.season : "\u00A0"}
            </h2>
            <ImageSlide photoFront={jersey.photoFront} photoBack={jersey.photoBack} className="object-cover" />
            <div className="flex flex-row space-x-2 w-full">
                <Btn onClick={() => onJerseyClick(jersey)}>Detalhes</Btn>
                <div className="flex flex-row">
                    <Btn variant="danger" onClick={() => setDisplayDelete(true)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                        </svg>
                    </Btn>
                </div>
            </div>
        </div>
    )
}

export default JerseyCard