
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false, 
  className = '', 
  ...props 
}) => {
  const baseStyles = "px-6 py-3 rounded font-semibold transition-all duration-300 focus:outline-none disabled:opacity-50 uppercase tracking-widest text-sm";
  const variants = {
    primary: "bg-[#d4af37] text-black hover:bg-[#b8962d]",
    secondary: "bg-white text-black hover:bg-gray-200",
    outline: "border-2 border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37] hover:text-black"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
