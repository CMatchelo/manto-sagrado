'use client';

import { Bebas_Neue } from 'next/font/google';

const bebasNeue = Bebas_Neue({
    subsets: ['latin'],
    weight: '400', // Bebas Neue normalmente tem apenas weight 400
    variable: '--font-bebas-neue', // Cria uma CSS variable
});


const WelcomeArea = () => {

    return (
        <div className="bg-primary-1/90 p-10 mt-10 mr-auto">
            <h1 style={{
                WebkitTextStroke: '1px #044389'
            }} className={`${bebasNeue.className} text-terciary-1 text-stroke text-4xl lg:text-6xl xl:text-6xl 2xl:text-6xl`}>
                Do gramado à quadra: <br></br>seu universo de camisas esportivas
            </h1>
        </div>
    )
}

export default WelcomeArea