'use client';

import { AddIcon, ExitIcon, HangerIcon, LogoIcon, MenuIcon } from '@/utils/icon';
import { Bebas_Neue } from 'next/font/google';
import MenuButton from './menuButton';
import { useAuth } from '@/contexts/AuthContext';
import { redirect } from 'next/navigation';
import { useState } from 'react';

const bebasNeue = Bebas_Neue({
    subsets: ['latin'],
    weight: '400', // Bebas Neue normalmente tem apenas weight 400
    variable: '--font-bebas-neue', // Cria uma CSS variable
});

const Header = () => {

    const { logout, user } = useAuth();
    const [menuOpen, setMenuOpen] = useState(false)

    console.log("USUARIO AQUAL", user)

    const goToRegister = () => {
        redirect('/newjersey');
    }

    const goToProfile = () => {
        redirect('/profile');
    }

    const goToLogin = () => {
        redirect('/login');
    }

    const toggleMenu = () => {
        setMenuOpen(!menuOpen)
    }

    return (
        <div className="h-12 text-custom-dark bg-primary-1
        relative top-0 w-full pl-3
        flex items-center justify-center
        md:pl-30 md:pr-30">
            <div className='md:hidden absolute left-[5%]'>
                <MenuButton onClick={toggleMenu}>
                    <MenuIcon width={20} height={20} />
                    {menuOpen && (
                        <div className='absolute w-50 left-[-40%] mt-43 pl-1 bg-primary-1 rounded-md shadow-lg z-10'>
                            {user ? (
                                <>
                                    <MenuButton onClick={goToProfile} label='Minha coleção' className="px-5 py-5">
                                        <HangerIcon width={20} height={20} />
                                    </MenuButton>
                                    <MenuButton onClick={goToRegister} label='Registrar nova' className="px-5 py-5 border-t border-gray-200">
                                        <AddIcon width={20} height={20} />
                                    </MenuButton>
                                    <MenuButton onClick={logout} label='Sair' className="px-5 py-5">
                                        <ExitIcon width={20} height={20} />
                                    </MenuButton>
                                </>
                            ) : (
                                <MenuButton onClick={goToLogin} label='Entrar' >
                                </MenuButton>
                            )}

                        </div>
                    )}
                </MenuButton>
            </div>
            <div className='flex items-center'>
                <LogoIcon width={40} height={40} />
                <h3 className={`${bebasNeue.className} text-terciary-1 text-xl ml-2 md:text-2xl`}>Manto Sagrado</h3>
            </div>
            <div className="ml-5">

            </div>
            <div className="hidden md:flex items-center h-full ml-auto ">
                {user ? (
                    <>
                        <MenuButton onClick={goToProfile} label='Minha coleção' >
                            <HangerIcon width={20} height={20} />
                        </MenuButton>
                        <MenuButton onClick={goToRegister} label='Registrar nova'>
                            <AddIcon width={20} height={20} />
                        </MenuButton>
                        <MenuButton onClick={logout} label='Sair' >
                            <ExitIcon width={20} height={20} />
                        </MenuButton>
                    </>
                ) : (
                    <MenuButton onClick={goToLogin} label='Entrar' >
                    </MenuButton>
                )}
            </div>
        </div>
    )
}

export default Header