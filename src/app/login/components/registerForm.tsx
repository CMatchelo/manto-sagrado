'use client';

import { useAuth  } from '@/contexts/AuthContext';
import { useState } from "react";
import { useRouter } from "next/navigation";
import Input from "@/components/input";
import { createUser, UserType } from "@/types/userType";

const RegisterForm = () => {

    const [newEmail, setNewEmail] = useState('123')
    const [newUser, setNewUser] = useState<UserType>(createUser())
    const [error, setError] = useState('')
    const { signIn } = useAuth()
    const router = useRouter()

    const handleSignin = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")
        if (newUser.useremail != newUser.cemail) {
            setError("Verifique se os emails são iguais")
            return
        }
        if (newUser.userpassword != newUser.cpassword) {
            setError("Verifique se as senhas são iguais")
            return
        }
        if (!newUser.username) {
            setError("Digite um nome de usuário")
            return
        }
        try {
            await signIn(newUser.useremail, newUser.userpassword, newUser.username)
            router.push('/profile');
        } catch (err) {
            setError("Falha no cadastro. Verifique suas credenciais")
            console.error("Falha de cadastro:", err)
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setNewUser(prev => ({
            ...prev,
            [name]: value
        }))
    };

    return (
        <>
            {error && <div className="text-red-500 text-center">{error}</div>}
            <form className="mt-8 space-y-6" onSubmit={handleSignin}>
                <div>
                    <div>
                        <input value={newEmail} onChange={(e) => setNewEmail(e.target.value)}></input>
                        <Input
                            value={newUser.username}
                            name="username"
                            onChange={handleChange}
                            label="Nome"
                        />
                    </div>
                    <div>
                        <Input
                            value={newUser.useremail}
                            name="useremail"
                            type="email"
                            label="Email"
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <Input
                            value={newUser.cemail}
                            name="cemail"
                            type="email"
                            onChange={handleChange}
                            label="Confirmar email"
                        />
                    </div>
                    <div>
                        <Input
                            value={newUser.userpassword}
                            name="userpassword"
                            type="password"
                            onChange={handleChange}
                            label="Senha"
                        />
                    </div>
                    <div>
                        <Input
                            value={newUser.cpassword}
                            name="cpassword"
                            type="password"
                            onChange={handleChange}
                            label="Confirmar Senha"
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
                        Criar conta
                    </button>
                </div>
            </form>
        </>
    )
}

export default RegisterForm