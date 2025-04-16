'use client';

import { useAuth  } from '@/contexts/AuthContext';
import { useState } from "react";
import { useRouter } from "next/navigation";
import Input from "@/components/input";
import { createUser, UserType } from "@/types/userType";

const LoginForm = () => {

    const [loginUser, setLoginUser] = useState<UserType>(createUser())
    const [error, setError] = useState('')
    const { login } = useAuth()
    const router = useRouter()

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")
        try {
            await login(loginUser.useremail, loginUser.userpassword)
            router.push('/profile');
        } catch (err) {
            setError("Falha no login. Verifique suas credenciais")
            console.error("Falha de login:", err)
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(loginUser)
        const { name, value } = e.target
        setLoginUser(prev => ({
            ...prev,
            [name]: value
        }))
    };

    return (
        <>
            {error && <div className="text-red-500 text-center">{error}</div>}
            <form className="mt-8 space-y-6" onSubmit={handleLogin}>
                <div>
                    <div>
                        <Input
                            value={loginUser.useremail}
                            name="useremail"
                            onChange={handleChange}
                            label="Email"
                        />
                    </div>
                    <div>
                        <Input
                            value={loginUser.userpassword}
                            name="userpassword"
                            type="password"
                            onChange={handleChange}
                            label="Senha"
                        />
                    </div>
                </div>
                <div>
                    <button
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 cursor-pointer
                            border border-transparent rounded-md shadow-sm 
                            text-sm font-medium text-white bg-primary-1
                            hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-dark"
                    >
                        Entrar
                    </button>
                </div>
            </form>
        </>
    )
}

export default LoginForm