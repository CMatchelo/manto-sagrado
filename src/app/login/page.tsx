'use client';

import Image from 'next/image';
import { useAuth  } from '@/contexts/AuthContext';
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import { GoogleIcon } from "../../utils/icon";
import RegisterForm from "./components/registerForm";
import LoginForm from "./components/loginForm";
import WelcomeArea from './components/welcomeText';
import TopBar from './components/topBar';

interface FormAreaProps {
    strDisplay: string;
    children: ReactNode;
}

const Login = () => {

    const [hasAcc, setHasAcc] = useState(true)
    const { user, loading, signInWithGoogle } = useAuth()
    const router = useRouter()
    const [openLogin, setOpenLogin] = useState(false)

    useEffect(() => {
        if (!loading && user) {
            router.push('/profile');
        }
    }, [user, loading, router]);

    const toggleLogin = (oppType: boolean) => {
        setHasAcc(oppType)
        setOpenLogin(true);
    };

    const GoogleLogin = () => {
        return (
            <div>
                <button
                    onClick={signInWithGoogle}
                    type="submit"
                    className="w-full flex justify-center space-x-2 py-2 px-4 border border-transparent 
                    rounded-md shadow-sm text-sm font-medium text-white cursor-pointer
                    bg-red-600 hover:bg-red-800 
                    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    <span>Entrar com Google</span> <GoogleIcon width={20} height={20} />
                </button>
            </div>
        )
    }

    const FormArea = ({ strDisplay, children }: FormAreaProps) => {
        return (
            <div className="max-w-md mx-10 w-3xl space-y-8 p-8 bg-white rounded-lg shadow-2xs">
                <h2 className="text-2xl font-bold text-primary-1 text-center">
                    {hasAcc ? (
                        <>
                            Entre com a sua conta
                        </>
                    ) : (
                        <>
                            Cadastre-se na plataforma
                        </>
                    )}
                </h2>
                {children}
                <GoogleLogin />
                <div className="text-center">
                    <button onClick={() => setHasAcc(!hasAcc)} className="text-sm text-primary-1 hover:text-primary-dark cursor-pointer">
                        {strDisplay}
                    </button>
                </div>
            </div>
        )
    }

    if (loading) return <div>Carregando página...</div>

    return (
        <div className="min-h-screen flex items-center justify-center relative h-screen w-full">
            <TopBar onLoginToggle={toggleLogin} />
            <Image
                src="/images/bg_main.jpg"  // Path to your image in public folder
                alt="Background"
                fill
                quality={100}
                priority
                className="object-cover filter blur-sm grayscale"  // Ensures the image covers the div
                style={{
                    zIndex: -1,  // Places the image behind other content
                }}
            />
            {openLogin ? (
                <>
                    {hasAcc ? (
                        <FormArea strDisplay="Novo por aqui? Cria uma conta">
                            <LoginForm />
                        </FormArea>
                    ) : (
                        <FormArea strDisplay="Já tem uma conta? Entre aqui">
                            <RegisterForm />
                        </FormArea>
                    )}
                </>
            ) : (
                <WelcomeArea />
            )}


        </div>
    )
}

export default Login