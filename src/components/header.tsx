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
    const [linkOpen, setLinkOpen] = useState(false)

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

    const copyUrlWithString = (): Promise<void> => {
        return new Promise((resolve, reject) => {
            try {
                const currentUrl = window.location.origin;
                setLinkOpen(true)
                const newUrl = `${currentUrl}/profile/${user?.uid}`;
                navigator.clipboard.writeText(`Confira minha coleção de camisas aqui: ${newUrl} || Junte-se à plataforma Meu Manto Sagrado e mostre a sua!`)
                    .then(() => resolve())
                    .catch(err => reject(err));
                setTimeout(() => {
                    setLinkOpen(false); // Executa após 5s
                }, 3500);
            } catch (error) {
                reject(error);
            }
        });
    };

    return (
        <div className="h-12 text-custom-dark bg-primary-1
        relative top-0 w-full pl-3
        flex items-center justify-center
        md:pl-30 md:pr-30">
            {linkOpen && (
                <div className='bg-secondary-1 border-1 border-primary-1
                flex justify-center
                absolute top-20 w-[90%] max-w-100 p-5 z-50'>
                    Link copiado para sua área de transferência. Agora é só enviar para quem você quer e compartilhar sua coleção de mantos
                </div>
            )}
            <div className='md:hidden absolute left-[5%]'>
                <MenuButton onClick={toggleMenu}>
                    <MenuIcon width={20} height={20} />
                    {menuOpen && (
                        <div className='absolute w-60 left-[-40%] mt-50 pl-1 bg-primary-1 rounded-md shadow-lg z-10'>
                            {user ? (
                                <>
                                    <MenuButton onClick={copyUrlWithString} label='Compartilhar perfil' className="px-5 py-5" >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" className="size-6">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
                                        </svg>
                                    </MenuButton>
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
                        <MenuButton onClick={copyUrlWithString} label='Compartilhar perfil' >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" className="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
                            </svg>
                        </MenuButton>
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