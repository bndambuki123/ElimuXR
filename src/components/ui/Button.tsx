import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

type ButtonProps = {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  icon?: React.ReactNode;
  className?: string;
};

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  children,
  onClick,
  disabled = false,
  type = 'button',
  icon,
  className,
  ...props
}) => {
  // Style variants
  const variantStyles = {
    primary: 'bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500',
    secondary: 'bg-secondary-600 text-white hover:bg-secondary-700 focus:ring-secondary-500',
    outline: 'bg-transparent border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-gray-500',
    ghost: 'bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-gray-500',
    danger: 'bg-error-600 text-white hover:bg-error-700 focus:ring-error-500',
  };

  // Size styles
  const sizeStyles = {
    sm: 'text-xs px-3 py-2',
    md: 'text-sm px-4 py-2',
    lg: 'text-base px-6 py-3',
  };

  // Disabled styles
  const disabledStyles = disabled
    ? 'opacity-60 cursor-not-allowed'
    : 'transform active:scale-95 transition-transform';

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      className={cn(
        'rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 inline-flex items-center justify-center transition-colors duration-200',
        variantStyles[variant],
        sizeStyles[size],
        disabledStyles,
        fullWidth ? 'w-full' : '',
        className
      )}
      {...props}
    >
      {icon && <span className={`${children ? 'mr-2' : ''}`}>{icon}</span>}
      {children}
    </motion.button>
  );
};

export default Button;