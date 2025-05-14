'use client';

import { BackIcon, NextIcon } from "@/utils/icon";
import { useState } from "react";

interface ImageSlideProps {
    photoFront: string | undefined;
    photoBack?: string;
    className?: string
}

const ImageSlide = ({ photoFront, photoBack, className }: ImageSlideProps) => {

    const [showFirst, setShowFirst] = useState<boolean>(true)

    return (
        <>
            <div className="overflow-hidden w-full aspect-[3/4]">
                <div
                    className={`flex w-[200%] h-full transition-transform duration-500 ease-in-out 
                    ${showFirst ? 'translate-x-0' : '-translate-x-1/2'}`}
                >
                    <div className="w-1/2 h-full">
                        <img src={photoFront} alt="Camisa Frente" className={`w-full h-full ${className}`} />
                    </div>
                    {photoBack && (
                        <div className="w-1/2 h-full">
                            <img src={photoBack} alt="Camisa Costas" className={`w-full h-full ${className}`} />
                        </div>
                    )}
                </div>
            </div>
            {photoBack && (
                <>
                    {showFirst ? (
                        <button onClick={() => setShowFirst(false)}
                            className="absolute top-[50%] right-4 cursor-pointer bg-secondary-1/40 p-2 rounded-3xl flex justify-center items-center active:bg-secondary-1/60"
                        >
                            <NextIcon width={15} height={15} />
                        </button>
                    ) : (
                        <button onClick={() => setShowFirst(true)}
                            className="absolute top-[50%] left-4 cursor-pointer bg-secondary-1/40 p-2 rounded-3xl flex justify-center items-center active:bg-secondary-1/60"
                        >
                            <BackIcon width={15} height={15} />
                        </button>
                    )}
                </>
            )}
        </>
    )
}

export default ImageSlide