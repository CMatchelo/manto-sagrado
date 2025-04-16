'use client'

import { ChangeEvent, useRef, useState } from "react"


interface ImageSelectorProps {
    onImageChange: (base64: string, label: string) => void;
    label: string;
    text: string;
}

const ImageSelector = ({ onImageChange, label, text }: ImageSelectorProps) => {

    const [selectedImage, setSelectedImage] = useState<string | null>(null)
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            console.log(e.target.files[0]); // Tamanho em MB
            const file = e.target.files[0]
            const base64 = await compressImageViaCanvas(e.target.files[0]);
            console.log(base64);
            if (!file.type.startsWith('image/')) {
                alert("Seleciona um arquivo de imagem")
                return
            }
            const reader = new FileReader()
            reader.onload = (event) => {
                setSelectedImage(event.target?.result as string)
            }
            reader.readAsDataURL(file)
            onImageChange(base64, label)
        }
    }

    const compressImageViaCanvas = (file: File, maxWidth: number = 800): Promise<string> => {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (event) => {
                const img = new Image();
                img.src = event.target?.result as string;
                img.onload = () => {
                    const canvas = document.createElement("canvas");
                    const ctx = canvas.getContext("2d");

                    // Redimensiona proporcionalmente
                    const scaleFactor = maxWidth / img.width;
                    canvas.width = maxWidth;
                    canvas.height = img.height * scaleFactor;

                    // Desenha a imagem redimensionada
                    ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);

                    // Converte para Base64 com qualidade ajustável (0.7 = 70%)
                    const base64 = canvas.toDataURL("image/jpeg", 0.7);
                    resolve(base64);
                };
            };
        });
    };

    const triggerFileInput = () => {
        fileInputRef.current?.click()
    }

    return (
        <div className={`p-4 md:p-8 w-full relative
            transition-all duration-500`}>
            <div className="flex justify-center">
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={(e) => handleImageChange(e)}
                    accept="image/*"
                    className="hidden"
                />
                <button
                    onClick={triggerFileInput}
                    className="bg-terciary-1 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded mb-4 cursor-pointer w-full"
                >
                    Imagem - {text}
                </button>
            </div>
            <div className={`transition-all duration-500  ${selectedImage ? ('-translate-y-0 translate-x-0 opacity-100 w-full') : ('-translate-y-10 translate-x-50 opacity-0 w-0')}`}>
                {selectedImage && (
                    <div className="h-64 lg:h-90 flex justify-center">
                        <img className="h-[100%] w-auto object-cover" src={selectedImage}></img>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ImageSelector