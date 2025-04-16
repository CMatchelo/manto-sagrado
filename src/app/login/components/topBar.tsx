'use cliente'

import { LogoIcon } from "@/utils/icon"
import { Bebas_Neue } from 'next/font/google';

const bebasNeue = Bebas_Neue({
    subsets: ['latin'],
    weight: '400', // Bebas Neue normalmente tem apenas weight 400
    variable: '--font-bebas-neue', // Cria uma CSS variable
});

interface ButtomMenuProps {
    label: string
    onClick: () => void;
}

interface TopBarProps {
    onLoginToggle: (hasAcc: boolean) => void;
}

const ButtonMenu = ({ label, onClick }: ButtomMenuProps) => {
    return (
        <div className="h-8 flex items-center px-2 mt-2 md:mx-4 cursor-pointer
             text-custom-dark border-b-2 border-transparent
               hover:border-secondary-1 transition-all duration-400"
            onClick={onClick}
        >
            <h3 className="text-secondary-1 font-medium">{label}</h3>
        </div>
    )
}

const TopBar = ({ onLoginToggle }: TopBarProps) => {

    return (
        <div className="h-12 text-custom-dark bg-primary-1 absolute top-0 w-full flex items-center">
            <div className="ml-3 md:ml-50">
                <LogoIcon width={40} height={40} />
            </div>
            <div className="ml-5">
                <h3 className={`${bebasNeue.className} text-primary-1 text-xl md:text-2xl`}>Manto Sagrado</h3>
            </div>
            <div className="flex h-full ml-auto md:mr-50">
                <ButtonMenu onClick={() => onLoginToggle(true)} label={"Entrar"} />
                <ButtonMenu onClick={() => onLoginToggle(false)} label={"Cadastrar"} />
            </div>
        </div>
    )
}

export default TopBar