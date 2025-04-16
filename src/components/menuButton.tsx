import { HTMLAttributes, ReactNode } from "react";

interface ButtomMenuProps extends HTMLAttributes<HTMLDivElement>{
    label?: string
    onClick?: () => void;
    children?: ReactNode;
}

const MenuButton = ({ label, onClick, children, className }: ButtomMenuProps) => {

    return (
        <div className={`${className} h-8 flex items-center px-2 md:mx-4 cursor-pointer
             text-custom-dark border-b-2 border-transparent font-medium
               hover:border-secondary-1 transition-all duration-400`}
            onClick={onClick}
        >
            {children}
            <h3 className="ml-2 text-secondary-1">{label}</h3>
        </div>
    )
}

export default MenuButton