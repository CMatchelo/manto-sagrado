import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
}

const Input: React.FC<InputProps> = React.memo(({value, name, label, onChange, ...props}) => {
    return (
        <div className="mt-2 flex-1">
            <label htmlFor={name} className="block text-sm font-medium text-primary-1">
                {label}
            </label>
            <input
                id={name}
                name={name}
                className="mt-1 block w-full px-3 py-2 border rounded-sm
                    border-gray-300 text-primary-1 shadow-sm
                    focus:outline-none focus:ring-primary-1 focus:border-primary-dark"
                value={value}
                onChange={onChange}
                {...props}
            />
        </div>
    )
})

Input.displayName = "Input";

export default Input