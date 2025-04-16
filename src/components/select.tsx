import React, { ReactNode } from "react";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    label: string;
    children: ReactNode;
}

const Select = React.memo(({ value, name, label, onChange, children, ...props }: SelectProps) => {
    return (
        <div className="flex-1">
            <label htmlFor={name} className="block text-sm font-medium text-primary-1">
                {label}
            </label>
            <select
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                {...props}
                className="mt-1 block w-full px-3 py-2 border rounded-sm
                    border-gray-300 text-primary-1 shadow-sm
                    focus:outline-none focus:ring-primary-1 focus:border-primary-dark">
                {children}
            </select>
        </div>
    )
})

Select.displayName = "Select";

export default Select