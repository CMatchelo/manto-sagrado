import { JerseyType } from "@/types/jerseyType"
import ImageSlide from "./imageSlide";

interface JerseyCardProps {
    jersey: JerseyType;
    onJerseyClick: (jersey: JerseyType) => void
}

const JerseyCard = ({ jersey, onJerseyClick }: JerseyCardProps) => {

    return (
        <div className="flex flex-col items-center relative px-2 pt-2 
            bg-secondary-1 shadow-2xl border-1 border-primary-1 rounded-md">
            <h2 className="font-semibold text-lg sm:text-xl lg:text-2xl w-full text-black text-center whitespace-nowrap overflow-hidden text-ellipsis">{jersey.team}</h2>
            <h2 className="text-md sm:text-lg w-full text-black text-center whitespace-nowrap overflow-hidden text-ellipsis">
                {jersey.season ? jersey.season : "\u00A0"}
            </h2>
            <ImageSlide photoFront={jersey.photoFront} photoBack={jersey.photoBack} />
            <button
                onClick={() => onJerseyClick(jersey)}
                className="w-full flex justify-center py-2 px-4 cursor-pointer my-2
                            border border-transparent rounded-md shadow-sm 
                            text-sm md:text-lg font-bold text-secondary-1 
                            bg-terciary-1 hover:bg-terciary-1/80 active:bg-terciary-1/70"
            >
                Ver detalhes
            </button>

        </div>
    )
}

export default JerseyCard