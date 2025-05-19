'use client';

import { JerseyType } from "@/types/jerseyType";
import ImageSlide from "./imageSlide";

interface JerseyPopupProps {
    jersey: JerseyType | undefined
    setPopup: (status: boolean) => void
}

interface PopupLineProps {
    label?: string;
    text?: string | number;
}

const PopupLine = ({ label, text }: PopupLineProps) => {
    return (
        <>
            {text && (
                <div className="text-lg font-medium">
                    {label && (
                        <span>
                            {label}:
                        </span>
                    )}
                    <span className="font-bold"> {text} </span>
                </div>
            )}
        </>
    )
}

const JerseyPopup = ({ jersey, setPopup }: JerseyPopupProps) => {

    return (
        <div className="z-30 w-[95%] md:w-[90%] flex justify-center max-w-4xl">
            {jersey && (
                <div className="flex flex-col md:flex-row w-[90%] md:w-full
                    bg-white rounded-lg h-[90vh] md:max-h-[500px] relative">
                    <div className="text-black bg-secondary-1 border-1 border-black 
                    w-8 h-8 p-2 rounded-full absolute -right-2 -top-3
                    flex items-center justify-center cursor-pointer z-100"
                    onClick={() => setPopup(false)}>
                        X
                    </div>
                    <div className="flex flex-col w-full md:w-1/2 overflow-hidden p-5 relative h-[80%] md:h-[100%] ">
                        <ImageSlide photoFront={jersey.photoFront} photoBack={jersey.photoBack} className="object-contain" />
                    </div>
                    <div className="flex flex-col w-full md:w-1/2 bg-secondary-1 
                        rounded-ls shadow-xl p-5 pb-5 text-terciary-1
                        h-[50%] md:h-[100%] overflow-y-auto">
                        <div className="flex justify-center
                         text-2xl font-bold">
                            {jersey.team}
                        </div>
                        <div className="flex justify-center
                        text-md mb-5">
                            {jersey.season}
                        </div>
                        <PopupLine label="Marca" text={jersey?.brand} />
                        <PopupLine label="País" text={jersey?.country} />
                        <PopupLine label="Modelo" text={jersey?.type} />
                        <PopupLine label="Nome" text={jersey?.jerseyName} />
                        <PopupLine label="Número" text={jersey?.jerseyNumber} />
                        <PopupLine label="Ano de compra" text={jersey?.yearBought} />
                        <PopupLine label="Local de compra" text={jersey?.placeBought} />
                        <PopupLine label="Preço de compra" text={`R$: ${jersey?.price}`} />
                        <PopupLine label="Esporte" text={jersey?.sport} />
                        <PopupLine label="Foco" text={jersey?.focus} />
                        <PopupLine label="Sub-foco" text={jersey?.subfocus} />
                        <PopupLine label="Detalhes" text={jersey?.details} />

                    </div>
                </div>
            )}
        </div>
    )
}

export default JerseyPopup