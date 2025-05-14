'use client';

import Input from "@/components/input";
import { useEffect, useState } from "react";
import { useAuth  } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Header from "@/components/header";
import React from "react";
import { useJerseys } from "@/hooks/useJerseys";
import { createJersey, JerseyType } from "@/types/jerseyType";
import ImageSelector from "./components/imageSelector";
import Select from "@/components/select";
import { useJerseyContext } from "@/contexts/JerseyContext";

const NewJersey = () => {

    const { user, loading } = useAuth();
    const [mounted, setMounted] = useState(false);
    const router = useRouter();

    const [jersey, setJersey] = useState<JerseyType>(createJersey())
    const { setJerseyCollection, jerseyCollection } = useJerseyContext()
    const { saveJersey } = useJerseys(jerseyCollection, setJerseyCollection)
    const [errorImg, setErrorImg] = useState<boolean>(false)

    useEffect(() => {
        if (mounted && !loading && !user) {
            router.push('/login');
        }
    }, [user, loading, router, mounted]);

    useEffect(() => {
        setMounted(true);
        console.log("oi")
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!jersey.photoFront) {
            setErrorImg(true)
            return
        }
        await saveJersey(user, jersey)
        router.push('/profile');
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setJersey(prev => ({
            ...prev,
            [name]: value
        }))
    };

    const handleImageChange = (base64: string, label: string) => {
        setJersey(prev => ({ ...prev, [label]: base64 }));
        setErrorImg(false)
    };

    const FormLine = "flex justify-between space-x-4 md:space-x-6"

    return (
        <div className="w-full">
            <Header />
            <div className="flex flex-col md:flex-row md:w-[75%] justify-center justify-self-center relative m-4 md:my-10 md:mx-40 bg-white shadow-2xl rounded-2xl">
                <div className="w-full md:w-1/2 flex flex-col items-center">
                    {errorImg && (
                        <div className="text-red-600 font-bold mt-10">Selecione uma imagem</div>
                    )}
                    <ImageSelector onImageChange={handleImageChange} label="photoFront" text="Frente" />
                    <ImageSelector onImageChange={handleImageChange} label="photoBack" text="Costas (opcional)" />
                </div>
                <form className={`p-4 md:p-8 space-y-4 w-full 
                md:w-1/2 bg-secondary-1 rounded-2xl z-10 shadow-xl
                `} onSubmit={handleSubmit}>
                    <div className="flex justify-center text-terciary-1 text-4xl font-semibold">
                        <span>Novo manto</span>
                    </div>
                    <div className="flex">
                        <Input
                            value={jersey.team}
                            name="team"
                            onChange={handleChange}
                            label="Time *"
                            required
                        />
                    </div>
                    <div className={`${FormLine}`}>
                        <Input
                            value={jersey.season}
                            name="season"
                            onChange={handleChange}
                            label="Temporada"
                            required
                        />
                        <Input
                            value={jersey.country}
                            name="country"
                            onChange={handleChange}
                            label="País *"
                            required
                        />
                    </div>
                    <div className={`${FormLine}`}>
                        <Input
                            value={jersey.brand}
                            name="brand"
                            onChange={handleChange}
                            label="Marca *"
                            required
                        />
                        <div className="mt-2 flex-1">
                            <Select
                                value={jersey.type}
                                name="type"
                                onChange={handleChange}
                                label="Modelo"
                                required>
                                <option value="Casa">Casa</option>
                                <option value="Visitante">Visitante</option>
                                <option value="Alternativa">Alternativa</option>
                                <option value="Goleiro">Goleiro</option>
                                <option value="Treino">Treino</option>
                                <option value="Outro">Outro</option>
                            </Select>
                        </div>
                    </div>
                    <div className={`${FormLine}`}>
                        <Input
                            value={jersey.jerseyName}
                            name="jerseyName"
                            onChange={handleChange}
                            label="Nome"
                        />
                        <Input
                            value={jersey.jerseyNumber}
                            name="jerseyNumber"
                            onChange={handleChange}
                            label="Número"
                        />
                    </div>
                    <div className={`${FormLine}`}>
                        <Input
                            value={jersey.yearBought}
                            name="yearBought"
                            onChange={handleChange}
                            label="Ano de compra"
                            type="number"
                        />
                        <Input
                            value={jersey.placeBought}
                            name="place"
                            onChange={handleChange}
                            label="Lugar de compra"
                        />
                    </div>
                    <div className={`${FormLine}`}>
                        <Input
                            value={jersey.price}
                            name="price"
                            type="number"
                            onChange={handleChange}
                            label="Preço de compra"
                        />
                        <div className="mt-2 flex-1">
                            <Select
                                value={jersey.sport}
                                name="sport"
                                onChange={handleChange}
                                label="Esporte"
                                required>
                                <option value="Futebol">Futebol</option>
                                <option value="Futsal">Futsal</option>
                                <option value="Basquete">Basquete</option>
                                <option value="Vôlei">Vôlei</option>
                                <option value="Futebol Americano">Futebol Americano</option>
                                <option value="Rugby">Rugby</option>
                                <option value="Baseball">Baseball</option>
                                <option value="Hockey">Hockey</option>
                                <option value="Outro">Outro</option>
                            </Select>
                        </div>
                    </div>
                    <div className={`${FormLine}`}>
                        <Input
                            value={jersey.focus}
                            name="focus"
                            onChange={handleChange}
                            label="Foco"
                        />
                        <Input
                            value={jersey.subfocus}
                            name="subfocus"
                            onChange={handleChange}
                            label="Sub-foco"
                        />
                    </div>
                    <div className={`${FormLine}`}>
                        <Input
                            value={jersey.mainColor}
                            name="mainColor"
                            onChange={handleChange}
                            label="Cor principal *"
                            required
                        />
                        <Input
                            value={jersey.secColor}
                            name="secColor"
                            onChange={handleChange}
                            label="Cor secundária"
                        />
                    </div>
                    <div className={`${FormLine}`}>
                        <div className="mt-2 flex-1">
                            <label className="block text-sm font-medium text-primary-1">
                                Comentários adicionais
                            </label>
                            <textarea className="mt-1 block w-full px-3 py-2 border rounded-sm
                                border-gray-300 text-primary-1 shadow-sm
                                focus:outline-none focus:ring-primary-1 focus:border-primary-dark"
                                onChange={handleChange} value={jersey.details} name="details" id="details">
                            </textarea>
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
                            Salvar
                        </button>
                    </div>
                </form>
            </div>

        </div>
    )
}

export default NewJersey

/*
Time
Pais
Temporada
Marca
Tipo
Personalizaçao (Numero e Nome)
Ano de aquisiçao
Local de aquisição
Foco
Sub foco
Preço*/